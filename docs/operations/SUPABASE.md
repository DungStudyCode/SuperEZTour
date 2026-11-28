# Supabase Production Preparation Runbook

> **Scope:** Operational preparation for a future separately authorized rollout. No production Supabase connection or migration is executed during local development or monorepo build tasks.

## 1. Project & Network Provisioning
1. Provision dedicated **staging** and **production** Supabase projects for Super EZ Tour after confirming region (e.g., Northeast Asia / Seoul or Singapore latency vs. PIPC cross-border disclosure), compute tier, connection limits, and backup terms.
2. Keep all accounts, credentials, schemas, and recovery storage completely separate from ViVu.
3. **Disable Supabase Data API (PostgREST)** if unused, or restrict exposed schemas so `superez_leads` is never exposed over HTTP. Verify `anon` and `authenticated` roles hold **zero** privileges on `superez_leads` schema, tables, sequences, or functions. Do not use browser database SDKs or Supabase Auth.

## 2. Least-Privilege Database Roles
Provision two distinct PostgreSQL login roles per environment:
- **Migrator Role (`MIGRATION_DATABASE_URL`):** Owns schema `superez_leads` and executes reviewed SQL migrations via `node apps/api/dist/database/migrate.js`.
- **Runtime API Role (`DATABASE_URL`):**
  - `GRANT USAGE ON SCHEMA superez_leads`
  - `GRANT INSERT ON leads, lead_private, consent_receipts, lead_idempotency, lead_activity, notification_outbox`
  - `GRANT SELECT ON leads, lead_idempotency` (for `RETURNING`, `databaseReady`, and idempotency replay)
  - `GRANT USAGE ON SEQUENCE lead_activity_id_seq, notification_outbox_id_seq`
  - **Zero** `DROP`, `ALTER`, `TRUNCATE`, `DELETE`, or `migration_history` write privileges.
  - Future Admin (`SELECT`/`UPDATE` status/notes) and Outbox Worker (`UPDATE notification_outbox`) grants must be reviewed and versioned in dedicated migrations (`002_*.sql`).

## 3. Connection Modes & TLS Verification
1. Prefer **Direct PostgreSQL connection** (IPv6 or approved IPv4 add-on) for migrations, logical backups, and long-lived single-instance Fastify pools.
2. If the host VPS is IPv4-only without direct IPv4 add-on, use **Supavisor Session Mode** after explicit staging verification. **Never run migrations (`pg_advisory_xact_lock`) through Transaction Pooler mode.**
3. Count total `DATABASE_POOL_MAX` across all Fastify processes against the Supabase tier connection cap.
4. Enforce `DATABASE_SSL_MODE=verify-full` and supply the current Supabase Root CA file via `DATABASE_CA_FILE`. Keep `DATABASE_URL` free of query-parameter SSL overrides (`?sslmode=...` is rejected by `apps/api/src/config/env.ts`).

## 4. Backup, Restore & PII Retention
1. Supabase automated backups are only the first layer. Schedule an independent, encrypted, off-host `pg_dump --schema=superez_leads` logical backup using a restricted read-only backup role, ensuring zero connection strings or PII appear in logs.
2. Rehearse full restore into an isolated staging database, verifying `migration_history` checksums, idempotency replay, consent receipts, and outbox integrity before enabling live customer intake.
3. Apply the approved PII retention and anonymization schedule consistently across live tables (`lead_private`), logs, and off-host backups.

## 5. Official References
- [Supabase: Connecting to Postgres & Supavisor Modes](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [Supabase: SSL/TLS Enforcement & Certificates](https://supabase.com/docs/guides/database/psql)
- [Supabase: Backup and Restore](https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore)
