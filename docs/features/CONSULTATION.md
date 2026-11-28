# Korean-First Consultation & Lead Reception Specification

## 1. Product & Market Scope

Super EZ Tour's primary conversion goal is generating qualified **Korean inbound private tour consultation requests**.
- **Primary Customer Market:** South Korea (`market = 'KR'`, server-derived).
- **UI Locales:** Korean (`ko`, default) and Vietnamese (`vi`, internal review parity) sharing **one unified Korean-market flow**.
- **Contact Channels:** Korean mobile (`010` / `+82 10` normalized to E.164 `+8210XXXXXXXX`), Email, and KakaoTalk (gated until verified). Zalo is excluded from the canonical Quick Consultation contract.
- **Flexible Planning Support:** Travelers may submit with `undecided` departure dates and/or `undecided` trip duration, or select an exact date (`Asia/Seoul` calendar rollover) and preset/custom days (`1..999`).

---

## 2. Shared Contract (`@superez/contracts` · Consultation v1)

Canonical schemas reside in `packages/contracts/consultation/v1/`:
- **`request.schema.json` (`POST /api/v1/leads`):**
  - Header: `Idempotency-Key` (`^[A-Za-z0-9_-]{16,128}$`) — cryptographically random UUIDv4 per immutable submission attempt.
  - Body (`schemaVersion: 1`, `additionalProperties: false`): `requestId` (opaque draft session ID), `destinationId`, `entry` (`source`, `route`, `locale`), `traveler` (`name`, `contact: { method, value }`), `trip` (`departure`, `duration`, `guests`, `itineraryId`, `preferences: { attractionIds, culinaryIds }`, `specialRequests`), and `privacy` (`policyVersion`, `accepted: true`).
- **`receipt.schema.json` (`201 Created` / `200 OK` replay):**
  - `{ "reference": "SEZ-<32 uppercase hex>", "receivedAt": "<ISO-8601 UTC>", "status": "received" }`.
  - Contains zero PII and zero internal UUIDs. `Cache-Control: no-store`. No public receipt lookup endpoint exists.
- **`error.schema.json` (`400`, `409`, `413`, `415`, `422`, `429`, `500`, `503`):**
  - `{ "error": { "code": "<STABLE_CODE>", "requestId": "<X-Request-Id>", "fields": [{ "path": "...", "code": "..." }] } }`.

---

## 3. Client State Machine & Idempotency Integrity

Implemented across `ConsultationContext.jsx`, `consultationAttempts.js`, `consultationApiService.js`, and `QuickConsultationForm.jsx`:

1. **Destination-Scoped RAM Drafts:** Opening, closing, or switching `KO ↔ VI` preserves user edits in memory without writing PII to `localStorage` or `sessionStorage`. Prefill conflicts prompt the user before overwriting edited fields.
2. **Attempt State Machine:**
   - `idle → validating → submitting → success | validation (422) | rejected (400/413/415) | limited (429) | unavailable (503) | unknown (network/timeout/500) | conflict (409)`.
   - Serializes the payload once and freezes `{ key, body }` before firing `fetch` (`15s` `AbortController` timeout, `redirect: 'error'`, no automatic transport retries).
   - **Ambiguous Outcome Protection (`possiblyCommitted`):** On timeout, network drop, or `503`, the draft locks and retries reuse the **exact same `Idempotency-Key` and byte-identical JSON body** so a committed-but-unacknowledged request replays `200 OK` with the original `SEZ-*` reference instead of creating a duplicate lead. Starting a fresh inquiry after an uncertain attempt requires explicit duplicate-risk confirmation.
3. **Production Hard Gates (Current Milestone):**
   - **Frontend:** When `import.meta.env.PROD === true`, PII fields and submit buttons are disabled; `syntheticPolicy()` in `consultationIntake.js` requires `import.meta.env.DEV === true` and `VITE_HANOI_SYNTHETIC_INTAKE === 'true'`.
   - **Backend:** `apps/api/src/config/env.ts` throws on startup if `NODE_ENV === 'production'` has `LEAD_INTAKE_ENABLED=true`, `OPENAPI_ENABLED=true`, or a `synthetic-*` policy; `POST /api/v1/leads` rejects with `503 INTAKE_UNAVAILABLE` before body processing when disabled.

---

## 4. Verified Local End-to-End Runbook (Synthetic Testing Only)

> **Warning:** Use synthetic test strings only. Never point local synthetic testing at production Supabase.

1. **Start isolated PostgreSQL 17 & API (`Terminal 1`):**
   ```powershell
   $env:SUPEREZ_TEST_POSTGRES_PASSWORD = 'replace-with-local-random-password'
   docker compose -f infrastructure/docker/compose.test.yml up -d --wait

   $env:NODE_ENV = 'test'
   $env:HOST = '127.0.0.1'
   $env:PORT = '3103'
   $env:DATABASE_URL = 'postgresql://superez_test:<url-encoded-password>@127.0.0.1:55432/superez_lead_test'
   $env:MIGRATION_DATABASE_URL = $env:DATABASE_URL
   $env:LEAD_INTAKE_ENABLED = 'true'
   $env:LEAD_POLICY_VERSION = 'synthetic-v1'
   $env:LEAD_ALLOWED_CONTACT_METHODS = 'phone,email'
   $env:LEAD_DIGEST_KEY = 'synthetic-local-test-only-key-minimum-32-chars'
   npm run migrate:api
   npm run dev:api
   ```
2. **Start Vite Frontend with loopback proxy (`Terminal 2`):**
   ```powershell
   $env:VITE_HANOI_SYNTHETIC_INTAKE = 'true'
   $env:VITE_HANOI_SYNTHETIC_POLICY = 'synthetic-v1'
   $env:VITE_HANOI_SYNTHETIC_CONTACT_METHODS = 'phone,email'
   npm run dev:web
   ```

---

## 5. Upcoming Consultation Milestones

- **Task 03.3 — Authenticated Staff Admin (`apps/admin`):** Server-side sessions, RBAC (`ADMIN` vs `CONSULTANT`), masked PII list views, audited contact reveal, lead assignment, and status transitions.
- **Task 03.4 — Outbox Notification Worker:** Lease-based worker polling `superez_leads.notification_outbox` (`PENDING`/`RETRY`) to send PII-free staff alerts containing only the reference and protected Admin link.
- **Task 03.5 — Staging & Production Launch Gate:** Legal review of KO/VI privacy policy, Supabase TLS & role verification, Nginx proxy rollout, and encrypted off-host backup/restore rehearsal.
