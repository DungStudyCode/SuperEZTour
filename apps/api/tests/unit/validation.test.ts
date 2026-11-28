import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildApp } from '../../src/app.ts';
import { loadConfig } from '../../src/config/env.ts';
import { canonicalize, normalizeKoreanMobile, payloadDigest, publicReference, validDeparture } from '../../src/modules/leads/validation.ts';
import { attempt, synthetic, testConfig } from '../fixtures/setup.ts';

const config = testConfig();
const normalize = (value = synthetic()) => canonicalize(value, config);

test('Korean phone normalization and invalid prefixes', () => {
  for (const value of ['01000000000', '010-0000-0000', '+82 10 0000 0000', '+821000000000']) {
    assert.equal(normalizeKoreanMobile(value), '+821000000000');
  }
  for (const value of ['+82 01000000000', '+82+821000000000', '+841000000000', '010abc00000000', '0100000000', '010000000000']) {
    assert.equal(normalizeKoreanMobile(value), null);
  }
});

test('name is trimmed and NFC normalized; controls and blank rejected', () => {
  const body = synthetic();
  assert.equal(normalize(body).traveler.name, body.traveler.name);
  body.traveler.name = ' Jose\u0301 ';
  assert.equal(normalize(body).traveler.name, 'José');
  for (const name of ['', '  ', 'Synthetic\nInput', 'x'.repeat(101)]) {
    body.traveler.name = name;
    assert.throws(() => normalize(body), /VALIDATION_FAILED/);
  }
});

test('Seoul midnight, UTC midnight, leap day and impossible dates', () => {
  assert.equal(validDeparture('2032-02-29', new Date('2032-02-28T14:59:59Z')), true);
  assert.equal(validDeparture('2032-02-29', new Date('2032-02-29T14:59:59Z')), true);
  assert.equal(validDeparture('2032-02-29', new Date('2032-02-29T15:00:00Z')), false);
  assert.equal(validDeparture('2032-03-01', new Date('2032-03-01T00:00:00Z')), true);
  for (const date of ['2031-02-29', '2032-13-01', '2032-04-31', '0000-01-01']) assert.equal(validDeparture(date), false);
});

test('departure/duration consistency and guest limits', () => {
  const a = synthetic();
  assert.equal(normalize(a).trip.departure.date, null);
  a.trip.departure.date = '2032-01-01';
  assert.throws(() => normalize(a), /VALIDATION_FAILED/);
  const b = synthetic();
  for (const days of [0, -1, 1.25, 1000, null]) {
    b.trip.duration = { status: 'fixed', days };
    assert.throws(() => normalize(b), /VALIDATION_FAILED/);
  }
  const c = synthetic();
  c.trip.guests = { adults: 0, children: -1 };
  assert.throws(() => normalize(c), /VALIDATION_FAILED/);
});

test('email, Kakao policy and unknown IDs', () => {
  const body = synthetic();
  body.traveler.contact = { method: 'email', value: ' synthetic@example.test ' };
  assert.equal(normalize(body).traveler.contact.value, 'synthetic@example.test');
  body.traveler.contact.value = 'invalid';
  assert.throws(() => normalize(body), /VALIDATION_FAILED/);
  body.traveler.contact = { method: 'kakao', value: 'synthetic' };
  assert.throws(() => normalize(body), /VALIDATION_FAILED/);
  const unknown = synthetic();
  unknown.trip.preferences.attractionIds.push('unknown');
  assert.throws(() => normalize(unknown), /VALIDATION_FAILED/);
});

test('digest ignores draft ID, ordering of sets and equivalent formatting', () => {
  const a = synthetic();
  const b = synthetic();
  a.trip.preferences.attractionIds = ['old-quarter', 'hoan-kiem-lake'];
  b.trip.preferences.attractionIds = ['hoan-kiem-lake', 'old-quarter', 'old-quarter'];
  b.requestId = 'another-draft';
  b.traveler.contact.value = '+821000000000';
  assert.equal(payloadDigest(normalize(a), config.digestKey), payloadDigest(normalize(b), config.digestKey));
  b.trip.guests.adults = 3;
  assert.notEqual(payloadDigest(normalize(a), config.digestKey), payloadDigest(normalize(b), config.digestKey));
});

test('opaque reference and isolation guards', () => {
  const refs = Array.from({ length: 100 }, publicReference);
  assert.equal(new Set(refs).size, 100);
  assert.ok(refs.every((reference) => /^SEZ-[A-F0-9]{32}$/.test(reference)));
  assert.throws(() => testConfig('postgresql://synthetic@remote.invalid/superez_lead_test'));
  assert.throws(() => testConfig('postgresql://synthetic@localhost/superez_lead_dev'));
  assert.throws(() => testConfig(undefined, { HOST: '0.0.0.0' }));
  assert.throws(() => testConfig(undefined, { HOST: '127.0.0.1 bad' }));
  assert.deepEqual([...testConfig(undefined, { ALLOWED_ORIGINS: 'http://127.0.0.1:3000, https://superez.site' }).allowedOrigins], ['http://127.0.0.1:3000', 'https://superez.site']);
  assert.throws(() => testConfig(undefined, { ALLOWED_ORIGINS: 'https://superez.site/path' }));
  assert.throws(() => loadConfig({
    NODE_ENV: 'production',
    DATABASE_URL: 'postgresql://synthetic@127.0.0.1:1/superez_production_placeholder',
    ALLOWED_ORIGINS: 'http://superez.site',
  }));
  assert.throws(() => loadConfig({ NODE_ENV: 'production', LEAD_INTAKE_ENABLED: 'true' }));
  assert.throws(() => loadConfig({ NODE_ENV: 'production', LEAD_POLICY_VERSION: 'synthetic-v1' }));
});

test('injection validates strict schemas, docs, size, type, rate, and safe failures', async (t) => {
  const app = await buildApp(testConfig(undefined, { LEAD_RATE_MAX: '15' }), { logStream: { write() {} } });
  t.after(() => app.close());
  const send = (payload: unknown, key: string = attempt(), contentType = 'application/json') => app.inject({
    method: 'POST', url: '/api/v1/leads', headers: { 'idempotency-key': key, 'content-type': contentType }, payload: JSON.stringify(payload),
  });
  const invalid = [
    [{ ...synthetic(), schemaVersion: 2 }, 400],
    [{ ...synthetic(), traveler: undefined }, 422],
    [{ ...synthetic(), status: 'CONFIRMED' }, 422],
    [{ ...synthetic(), receivedAt: '2030-01-01T00:00:00Z' }, 422],
    [{ ...synthetic(), assigneeId: 'synthetic-staff' }, 422],
    [{ ...synthetic(), destinationId: 'da-nang' }, 422],
    [{ ...synthetic(), entry: { ...synthetic().entry, locale: 'en' } }, 422],
    [{ ...synthetic(), traveler: { name: 'S', contact: { method: 'zalo', value: 'x' } } }, 422],
    [{ ...synthetic(), privacy: { policyVersion: 'other', accepted: true } }, 422],
    [{ ...synthetic(), privacy: { policyVersion: 'synthetic-v1' } }, 422],
    [{ ...synthetic(), trip: { ...synthetic().trip, duration: { status: 'fixed', days: '3' } } }, 422],
    [{ ...synthetic(), trip: { ...synthetic().trip, guests: { adults: 0, children: 0 } } }, 422],
  ] as const;
  for (const [body, status] of invalid) assert.equal((await send(body)).statusCode, status);
  assert.equal((await send(synthetic(), 'short')).statusCode, 400);
  assert.equal((await send(synthetic(), attempt(), 'text/plain')).statusCode, 415);
  assert.equal((await send({ x: 'x'.repeat(17000) })).statusCode, 413);
  const unavailable = await send(synthetic());
  assert.equal(unavailable.statusCode, 503, unavailable.body);
  assert.equal(unavailable.json().error.code, 'DATABASE_UNAVAILABLE');
  assert.equal(unavailable.headers['cache-control'], 'no-store');
  let limited = unavailable;
  for (let n = 0; n < 16 && limited.statusCode !== 429; n++) limited = await send(synthetic());
  assert.equal(limited.statusCode, 429);
  assert.ok(limited.headers['retry-after']);
  assert.equal((await app.inject('/health/live')).statusCode, 200);
  assert.equal((await app.inject('/health/ready')).statusCode, 503);
  assert.equal((await app.inject('/api/v1/leads')).statusCode, 404);
  assert.equal((await app.inject('/api/v1/leads/synthetic')).statusCode, 404);
  const docs = await app.inject('/docs/json');
  assert.equal(docs.statusCode, 200);
  assert.ok(docs.json().paths['/api/v1/leads'].post.responses['409']);
});

test('forwarded addresses cannot bypass the local rate-limit key', async (t) => {
  const app = await buildApp(testConfig(undefined, { LEAD_RATE_MAX: '1' }), { logStream: { write() {} } });
  t.after(() => app.close());
  const request = (address: string) => app.inject({
    method: 'POST', url: '/api/v1/leads', remoteAddress: '127.0.0.1',
    headers: { 'content-type': 'application/json', 'idempotency-key': attempt(), 'x-forwarded-for': address },
    payload: { ...synthetic(), destinationId: 'unknown' },
  });
  assert.equal((await request('192.0.2.1')).statusCode, 422);
  assert.equal((await request('192.0.2.2')).statusCode, 429);
});

test('disabled intake rejects before JSON parse; production docs stay absent', async (t) => {
  const app = await buildApp(loadConfig({
    NODE_ENV: 'production', DATABASE_URL: 'postgresql://synthetic@127.0.0.1:1/superez_production_placeholder',
  }), { logStream: { write() {} } });
  t.after(() => app.close());
  const result = await app.inject({ method: 'POST', url: '/api/v1/leads', payload: '{', headers: { 'content-type': 'application/json' } });
  assert.equal(result.statusCode, 503);
  assert.equal(result.json().error.code, 'INTAKE_UNAVAILABLE');
  assert.equal((await app.inject('/docs/json')).statusCode, 404);
});
