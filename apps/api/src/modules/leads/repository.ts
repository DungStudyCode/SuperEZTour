import { randomUUID } from 'node:crypto';
import type { Pool } from 'pg';
import { transaction } from '../../database/pool.ts';
import { publicReference, validDeparture } from './validation.ts';
import type { LeadRequest } from './validation.ts';

interface ReceiptRow { reference: string; received_at: Date }
const scope = 'public-consultation-v1';
const receipt = (row: ReceiptRow) => ({
  reference: row.reference, receivedAt: row.received_at.toISOString(), status: 'received' as const,
});

export async function persistLead(pool: Pool, input: LeadRequest, attempt: string, digest: string, now: Date) {
  return transaction(pool, async (db) => {
    // Serialize only equal attempt keys across processes. The unique constraint is the final invariant.
    await db.query('SELECT pg_advisory_xact_lock(hashtextextended($1, 0))', [`${scope}:${attempt}`]);
    const replay = await db.query<ReceiptRow & { payload_digest: string }>(`
      SELECT l.public_reference AS reference, l.received_at, i.payload_digest
      FROM superez_leads.lead_idempotency i JOIN superez_leads.leads l ON l.id = i.lead_id
      WHERE i.scope = $1 AND i.attempt_key = $2
    `, [scope, attempt]);
    const previous = replay.rows[0];
    if (previous) {
      if (previous.payload_digest !== digest) return { kind: 'conflict' } as const;
      return { kind: 'replayed', receipt: receipt(previous) } as const;
    }

    const id = randomUUID();
    const { trip, traveler, entry } = input;
    if (trip.departure.date && !validDeparture(trip.departure.date, now)) {
      return { kind: 'past-departure' } as const;
    }
    let row: ReceiptRow | undefined;
    for (let i = 0; i < 3 && !row; i += 1) {
      const result = await db.query<ReceiptRow>(`
        INSERT INTO superez_leads.leads
          (id, public_reference, schema_version, locale, destination_id, source, entry_route,
           departure_status, departure_date, duration_status, duration_days, adults, children, itinerary_id, preferences)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
        ON CONFLICT ON CONSTRAINT leads_reference_unique DO NOTHING
        RETURNING public_reference AS reference, received_at
      `, [id, publicReference(), input.schemaVersion, entry.locale, input.destinationId, entry.source, entry.route,
        trip.departure.status, trip.departure.date, trip.duration.status, trip.duration.days,
        trip.guests.adults, trip.guests.children, trip.itineraryId, JSON.stringify(trip.preferences)]);
      row = result.rows[0];
    }
    if (!row) throw new Error('Reference allocation failed');
    await db.query('INSERT INTO superez_leads.lead_private (lead_id,customer_name,contact_method,contact_value,special_requests) VALUES ($1,$2,$3,$4,$5)',
      [id, traveler.name, traveler.contact.method, traveler.contact.value, trip.specialRequests]);
    await db.query('INSERT INTO superez_leads.consent_receipts (lead_id,policy_version,accepted,accepted_at,locale) VALUES ($1,$2,true,$3,$4)',
      [id, input.privacy.policyVersion, row.received_at, entry.locale]);
    await db.query('INSERT INTO superez_leads.lead_idempotency (scope,attempt_key,payload_digest,lead_id) VALUES ($1,$2,$3,$4)',
      [scope, attempt, digest, id]);
    await db.query("INSERT INTO superez_leads.lead_activity (lead_id,event_type,to_status) VALUES ($1,'lead.created','NEW')", [id]);
    await db.query("INSERT INTO superez_leads.notification_outbox (lead_id,event_type,event_version,event_key) VALUES ($1,'lead.created.v1',1,$2)",
      [id, `lead.created.v1:${id}`]);
    return { kind: 'created', receipt: receipt(row) } as const;
  });
}
