import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildApp } from '../../src/app.ts';
import { createPool } from '../../src/database/pool.ts';
import { migrate } from '../../src/database/migrate.ts';
import { attempt, synthetic, testConfig } from '../fixtures/setup.ts';

const tableNames = ['leads', 'lead_private', 'consent_receipts', 'lead_idempotency', 'lead_activity', 'notification_outbox'];

test('PostgreSQL HTTP intake, integrity and durable replay', { timeout: 60000 }, async (t) => {
  const url = process.env.INTEGRATION_DATABASE_URL;
  assert.ok(url, 'INTEGRATION_DATABASE_URL must point to a disposable loopback superez_lead_test database');
  const config = testConfig(url);
  const testOwner = testConfig(process.env.INTEGRATION_MIGRATION_URL || url);
  const admin = createPool(testOwner, () => {});
  t.after(() => admin.end());
  const { rows: server } = await admin.query<{ version: string }>("SELECT current_setting('server_version') AS version");
  t.diagnostic(`PostgreSQL ${server[0].version}, actual TCP connection`);
  const firstMigration = await migrate(admin);
  assert.deepEqual(await migrate(admin), []);
  const history = (await admin.query<{ name: string; checksum: string }>('SELECT name, checksum FROM superez_leads.migration_history ORDER BY name LIMIT 1')).rows[0];
  await admin.query('UPDATE superez_leads.migration_history SET checksum=$1 WHERE name=$2', ['synthetic-checksum-mismatch', history.name]);
  try { await assert.rejects(migrate(admin), /checksum mismatch/); }
  finally { await admin.query('UPDATE superez_leads.migration_history SET checksum=$1 WHERE name=$2', [history.checksum, history.name]); }
  t.diagnostic(`Migration first run: ${firstMigration.join(', ') || 'already applied'}; repeat: none`);

  const counts = async () => (await Promise.all(tableNames.map(async (table) => {
    const { rows } = await admin.query<{ count: number }>(`SELECT count(*)::int AS count FROM superez_leads.${table}`);
    return rows[0].count;
  })));
  const difference = (before: number[], after: number[]) => after.map((n, i) => n - before[i]);
  const logs: string[] = [];
  let now = new Date('2032-02-29T14:59:00Z');
  const start = async () => {
    const app = await buildApp(config, { now: () => now, logStream: { write(line) { logs.push(line); } } });
    const origin = await app.listen({ host: '127.0.0.1', port: 0 });
    return { app, origin };
  };
  let backend = await start();
  t.after(() => backend.app.close());
  const send = async (key: string, body = synthetic()) => fetch(`${backend.origin}/api/v1/leads`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify(body),
  });

  const originalKey = attempt();
  const originalBody = synthetic();
  originalBody.trip.departure = { status: 'exact', date: '2032-02-29' };
  const before = await counts();
  const same = await Promise.all(Array.from({ length: 10 }, () => send(originalKey, originalBody)));
  assert.equal(same.filter((r) => r.status === 201).length, 1, same.map((r) => r.status).join(','));
  assert.equal(same.filter((r) => r.status === 200).length, 9);
  const receipts = await Promise.all(same.map((r) => r.json()));
  const originalReceipt = receipts[0];
  assert.deepEqual(Object.keys(originalReceipt).sort(), ['receivedAt', 'reference', 'status']);
  assert.ok(receipts.every((r) => JSON.stringify(r) === JSON.stringify(originalReceipt)));
  assert.deepEqual(difference(before, await counts()), [1, 1, 1, 1, 1, 1]);
  const saved = (await admin.query(`
    SELECT l.status, l.market, l.locale, l.destination_id, l.source, l.entry_route, l.departure_date::text,
      l.duration_status, l.duration_days, l.preferences, p.customer_name, p.contact_value, c.policy_version,
      c.accepted, a.event_type AS activity, n.event_type AS event, n.status AS outbox_status
    FROM superez_leads.leads l JOIN superez_leads.lead_private p ON p.lead_id=l.id
      JOIN superez_leads.consent_receipts c ON c.lead_id=l.id JOIN superez_leads.lead_activity a ON a.lead_id=l.id
      JOIN superez_leads.notification_outbox n ON n.lead_id=l.id
    WHERE l.public_reference=$1
  `, [originalReceipt.reference])).rows[0];
  assert.deepEqual(saved, {
    status: 'NEW', market: 'KR', locale: 'ko', destination_id: 'ha-noi', source: 'hero',
    entry_route: '/destinations/ha-noi', departure_date: '2032-02-29', duration_status: 'undecided', duration_days: null,
    preferences: originalBody.trip.preferences, customer_name: originalBody.traveler.name,
    contact_value: '+821000000000', policy_version: 'synthetic-v1', accepted: true,
    activity: 'lead.created', event: 'lead.created.v1', outbox_status: 'PENDING',
  });
  t.diagnostic('Parallel 10 requests: 1 creation, 9 replays; all six table deltas equal one');

  now = new Date('2032-02-29T15:00:00Z');
  const equivalent = structuredClone(originalBody);
  equivalent.traveler.contact.value = '+82 10 0000 0000';
  const replay = await send(originalKey, equivalent);
  assert.equal(replay.status, 200);
  assert.deepEqual(await replay.json(), originalReceipt);
  assert.equal((await send(attempt(), originalBody)).status, 422);
  const modified = structuredClone(originalBody);
  modified.trip.guests.children = 1;
  const conflict = await send(originalKey, modified);
  assert.equal(conflict.status, 409);
  assert.equal((await conflict.json()).error.code, 'IDEMPOTENCY_CONFLICT');
  const raceKey = attempt();
  const other = synthetic();
  other.trip.guests.adults = 3;
  const race = await Promise.all([send(raceKey), send(raceKey, other)]);
  assert.deepEqual(race.map((r) => r.status).sort(), [201, 409]);
  assert.deepEqual(difference(before, await counts()), [2, 2, 2, 2, 2, 2]);
  t.diagnostic('Normalization replay and 201/409 conflicting race verified, including same contact with different key');

  const email = synthetic();
  email.entry.locale = 'vi';
  email.traveler.name = "O'Neil — 합성";
  email.traveler.contact = { method: 'email', value: 'synthetic@example.test' };
  email.trip.specialRequests = "Synthetic note with apostrophe, semicolon; and brackets [ ]";
  const emailKey = attempt();
  const lost = await send(emailKey, email);
  assert.equal(lost.status, 201);
  await lost.body?.cancel();
  const record = (await admin.query<{ reference: string; received_at: Date }>(`
    SELECT l.public_reference AS reference,l.received_at FROM superez_leads.leads l
    JOIN superez_leads.lead_idempotency i ON l.id=i.lead_id WHERE i.attempt_key=$1
  `, [emailKey])).rows[0];
  await backend.app.close();
  backend = await start();
  const recovered = await send(emailKey, email);
  assert.equal(recovered.status, 200);
  assert.deepEqual(await recovered.json(), {
    status: 'received', reference: record.reference, receivedAt: record.received_at.toISOString(),
  });
  assert.deepEqual(difference(before, await counts()), [3, 3, 3, 3, 3, 3]);
  const emailRecord = (await admin.query(`
    SELECT l.departure_status, l.departure_date, l.duration_status, p.customer_name, p.contact_method, p.contact_value, p.special_requests
    FROM superez_leads.leads l JOIN superez_leads.lead_private p ON p.lead_id=l.id WHERE l.public_reference=$1
  `, [record.reference])).rows[0];
  assert.deepEqual(emailRecord, {
    departure_status: 'undecided', departure_date: null, duration_status: 'undecided',
    customer_name: email.traveler.name, contact_method: 'email', contact_value: 'synthetic@example.test',
    special_requests: email.trip.specialRequests,
  });
  t.diagnostic('Discarded committed HTTP response body; restarted listener and DB pool; replay returned persisted receipt');

  const failKey = attempt();
  const failBody = synthetic();
  failBody.trip.specialRequests = `rollback-fixture-${failKey}`;
  const rollbackBefore = await counts();
  // Only the created synthetic fixture can trip this disposable database trigger.
  const trigger = `audit_${failKey.replace(/-/g, '')}`;
  await admin.query(`
    CREATE FUNCTION superez_leads.${trigger}() RETURNS trigger LANGUAGE plpgsql AS $audit$
    BEGIN
      IF EXISTS (SELECT 1 FROM superez_leads.lead_private WHERE lead_id=NEW.lead_id AND special_requests='rollback-fixture-${failKey}') THEN
        RAISE EXCEPTION 'synthetic outbox failure';
      END IF;
      RETURN NEW;
    END $audit$;
    CREATE TRIGGER ${trigger} BEFORE INSERT ON superez_leads.notification_outbox FOR EACH ROW
    EXECUTE FUNCTION superez_leads.${trigger}();
  `);
  try {
    const failed = await send(failKey, failBody);
    assert.equal(failed.status, 500);
    assert.equal((await failed.json()).error.code, 'INTERNAL_ERROR');
    assert.deepEqual(await counts(), rollbackBefore);
  } finally {
    await admin.query(`DROP TRIGGER ${trigger} ON superez_leads.notification_outbox; DROP FUNCTION superez_leads.${trigger}();`);
  }
  assert.equal((await send(failKey, failBody)).status, 201);
  assert.deepEqual(difference(rollbackBefore, await counts()), [1, 1, 1, 1, 1, 1]);
  assert.equal((await fetch(`${backend.origin}/health/ready`)).status, 200);
  const log = logs.join('\n');
  for (const hidden of [originalBody.traveler.name, originalBody.traveler.contact.value, '+821000000000', email.traveler.name, 'synthetic@example.test', email.trip.specialRequests, failBody.trip.specialRequests, url]) {
    assert.ok(!log.includes(hidden), 'Sensitive fixture leaked in logs');
  }
  t.diagnostic('Outbox trigger induced rollback of all rows, retry succeeded, synthetic PII absent from captured logs');
});
