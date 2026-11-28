# Task 03.3 · Admin Authentication & Lead Management
## A. Executive summary
**TASK03_3_AUDIT_COMPLETE_WITH_LIMITATIONS · READY_FOR_OWNER_REVIEW**

The lead foundation supplies a transaction boundary, a public contract and a separate private-data table. Admin identities, sessions, authorization and audited disclosure are new security boundaries. Build those before exposing a lead portal. Existing unit and injection checks passed (10 backend and 37 frontend). PostgreSQL findings are from migration source and historical evidence.

## B. Audit scope
Phase 0 reviewed repository source, existing reports, test design, contracts, migration, runtime capabilities and deployment documentation. Test execution was limited to local backend unit/injection and frontend model/integration tests. No database connection, migration execution, production access, deployment, package installation or implementation occurred.

## C. Git baseline
Branch `refactor/enterprise-monorepo`, HEAD `96e4788f7d1e951eba40a35a519f315d2c3e2dd3`. The initial manifest contains 326 entries. The working tree changed independently during the audit, so the initial and final trees are different. See [baseline](audit-evidence/task03.3-source-architecture/git-baseline.txt) and [hash comparison](audit-evidence/task03.3-source-architecture/hash-comparison.txt).

## D. Historical report review
- [Task 03.0](TASK03_REAL_LEAD_RECEPTION_SOURCE_INFRASTRUCTURE_AUDIT.md) establishes intake context. Re-read it as historical discovery because 03.1 added persistence.
- [Task 03.1](TASK03_1_BACKEND_PERSISTENT_LEAD_FOUNDATION_IMPLEMENTATION_REPORT.md) documents the PostgreSQL foundation and prior isolated validation. [Task 03.2](TASK03_2_QUICK_CONSULTATION_API_INTEGRATION_IMPLEMENTATION_REPORT.md) documents the browser-to-API connection and prior disposable PG run. Those reports establish historical outcomes only.
- [Hanoi 02 V1.1](HANOI_TASK02_KOREAN_FIRST_CONSULTATION_V1_1_UX_POLISH_REPORT.md) documents the customer experience. The similarly named original V1 report visible in the IDE context is absent from the file inventory.
- [Architecture audit](SUPER_EZ_FULL_ARCHITECTURE_AUDIT.md), [deployment notes](DEPLOYMENT.md), [backend ADR](backend/docs/ADR.md) and [Supabase preparation](backend/docs/SUPABASE_PRODUCTION_PREPARATION.md) inform repository and future infrastructure assumptions.

## E. Current repository architecture
Root Vite/React serves public destinations. Consultation UI, draft model and transport are under `src/components/common/QuoteModal` and `src/services`. The standalone Fastify/TypeScript package under `backend` contains app composition, health and lead modules, PostgreSQL, migrations and tests. `contracts/consultation/v1` is the shared public contract. There is no `admin/` application. See [inventory](audit-evidence/task03.3-source-architecture/source-inventory.txt).

## F. Backend foundation
Reuse the [Fastify app](backend/src/app.ts), sensitive-data-safe error handling, schema validation, route-specific limits, health model, [pool transaction helper](backend/src/database/pool.ts) and [checksum migration runner](backend/src/database/migrate.ts). Trust proxy is currently off. Swagger is gated. Add an encapsulated Admin plugin, explicit role and scope checks, independent rate limits and Admin response schemas. Admin must re-evaluate its own database availability and fail closed. Public app boot and health must continue to function with Admin disabled.

## G. Task 03.2 compatibility
[Public route](backend/src/modules/leads/routes.ts) accepts the shared V1 shape through `POST /api/v1/leads`, returns the minimal 201 receipt or 200 replay, and checks intake enablement before parsing. Production intake remains blocked by source. [Repository](backend/src/modules/leads/repository.ts) serializes a scoped attempt with an advisory transaction lock and writes the lead, private data, consent, idempotency receipt, activity and outbox together. Frontend requires Hanoi, approved source/policy and build gates. It preserves exact bytes and key for explicit retry following an uncertain outcome. Preserve those behaviors, policy enforcement, local drafts, other destinations and receipt confidentiality. An Admin route and cookie must never activate intake.

## H. Current database schema
[Migration 001](backend/migrations/001_lead_foundation.sql) defines `superez_leads`. The runner maintains migration history separately from business records.

| Table | Relation to lead and constraints |
|---|---|
| leads | UUID PK, unique opaque public reference, positive version, nullable assignee UUID without FK. Checked state/closure pairing, KR market, locale, dates/duration and guest count. Status, assignee and destination indexes. |
| lead_private | PK/FK one-to-one. Name, exactly one contact channel/value and optional special requests. |
| consent_receipts | PK/FK one-to-one. Accepted policy version, time and locale. |
| lead_idempotency | Scope + attempt key PK and unique lead FK. SHA-256 payload digest. |
| lead_activity | One-to-many. Event, nullable UUID actor without employee FK, status transition and indexed chronology. |
| notification_outbox | One-to-many. Unique event key, bounded status, retry scheduling and partial ready index. |

Current ERD is `leads 1 → 0..1 {lead_private, consent_receipts, lead_idempotency}` and `leads 1 → 0..* {lead_activity, notification_outbox}`. The public repository inserts all six records transactionally. Constraints and grants above reflect SQL, with no live catalog verification.

## I. Proposed Admin architecture
Independent React/Vite package at `admin/`, built for `/admin/`, standard relative API requests, same Fastify process with Admin route prefix `/api/v1/admin/`. Admin modules should own auth/session, employee, lead operations, dashboard and audit repositories. Shared database and shared primitives, separate Admin DTOs and policy. In Nginx define API prefix precedence over SPA fallbacks, scoped Admin history fallback, and existing public fallback separately. Local Vite proxies both Admin app and API through its single origin for browser tests. Deliver configuration only in the authorized implementation phase.

## J. Authentication architecture
Use normalized work email (case-insensitive uniqueness, ASCII login policy proposed) and Argon2id with per-password random salt, versioned PHC representation and rehash on successful verified login. Benchmark an RFC 9106 memory-constrained profile on the target host and cap verification concurrency, including dummy verification for unknown accounts. No default credentials or web bootstrap. Operator CLI reads password from a masked prompt, rejects command-line credentials, validates target and obtains an exclusive bootstrap/employee-admin lock before checking and creating the first active ADMIN. Audit creation without credentials. For subsequent accounts use a one-time temporary credential delivered securely offline, short TTL and change-required session. Admin-assisted resets revoke sessions and require new password at next login. Require current password for voluntary changes. No public signup or recovery endpoint. [RFC 9106](https://www.rfc-editor.org/rfc/rfc9106.html) · [Node Crypto API](https://nodejs.org/docs/latest-v24.x/api/crypto.html).

## K. Session and cookie architecture
Generate a 32-byte random opaque token, store only its digest, and rotate on sign-in and credential change. Initial proposal is 30 minutes idle and eight hours absolute, enforced in SQL/server time with bounded touch frequency and an indexed purge job. Check active user, role and session state on each protected request. Revoke all sessions on reset, disable or role change. Logout revokes row and clears cookie using the original attributes. Prefer host-only `__Secure-sez_admin`, Secure, HttpOnly, SameSite=Strict, Path=/api/v1/admin/, no Domain. The `__Host-` alternative requires Path=/ and exposes the cookie to public routes on the same host. Require HTTPS for browser tests that exercise production attributes.

## L. CSRF architecture
Require exact configured Origin on mutations, strict JSON, and a session-bound unpredictable synchronizer token in a dedicated header. Deliver it in the no-store CSRF response and keep it in memory. Login uses a short-lived anonymous challenge issued by the same-origin CSRF route, with Origin and custom-header enforcement and one-time challenge consumption. Reject missing/foreign Origin on writes. SameSite and Fetch Metadata are defense in depth. GET endpoints have no user-initiated mutations. Cross-origin credentialed CORS is disabled. [OWASP CSRF guidance](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

## M. RBAC and object authorization
| Capability | ADMIN | CONSULTANT |
|---|---|---|
| Self, logout, own password | Own session | Own session |
| Employee list, create, edit, disable, reset, revoke | Yes, subject to last-admin invariant | No |
| List, detail, dashboard, notes and activity | All leads | Currently assigned leads |
| Reveal and permitted lifecycle transitions | All leads | Currently assigned leads |
| Assign, unassign and reopen | Yes | No |
| Bootstrap | Operator CLI | No |

Enforce scope in the SQL predicate and under row lock for writes and disclosures. Scope counts, cursors, history and child records through the parent lead. Use uniform 404 for absent or out-of-scope objects and 403 for forbidden capabilities. Change-required sessions may only access own identity, token, logout and password flows.

## N. PII protection
Use server-side masked projections. Lists never join raw contact values into their DTOs. Detail shows a masked summary and absence/presence flags for sensitive fields. Reveal via POST with session, role, object scope, CSRF and recent server-side limits. Lock parent, recheck assignment, read requested field, insert a mandatory minimal audit record and commit before serialization. Audit failure suppresses disclosure. Include customer name and contact in a bounded reveal DTO, with separately selected special requests if approved. No disclosure data in URLs, logs, analytics, durable browser storage or query caches. Clear revealed values on drawer close, selection/assignment changes, timeout, logout and session loss. Disable caching across browser and proxy.

## O. Lead management architecture
Cursor on `received_at DESC,id DESC`, filter fingerprint and role scope bound to the opaque cursor. Proposed 25 per page, hard max 100. Filter by state, assignee, destination and indexed time range. Start with exact public-reference search, no names, contact or notes search. All responses use safe projection. Assignment requires active employee validation, a lock on relevant rows and audit. Use a uniform lock order. Forward lifecycle proposal is NEW → CONTACTED → CONSULTING → QUOTED → CONFIRMED. Closing uses a fixed owner-approved reason and records previous state. ADMIN reopen restores the prior valid state and clears closure reason atomically. No-op writes return current state with no version or audit churn. Use `If-Match` with version for assignment/status/reopen, 428 for missing precondition and 412 for stale version. Lock and check scope before reporting a version conflict.

## P. Notes and audit activity
Internal notes are append-only, bounded plain text with author and timestamp. Treat content as sensitive. Escape rendering, exclude text from logs, and apply parent scope. Notes and safe timeline event commit together, with client-generated note operation IDs for ambiguous retries. Separate operational `lead_activity` from restricted append-only security audit. Audit login outcomes, password/revocation changes, role and employee status, assignment, transitions, reopen and reveals. Store typed identifiers, result, timestamp and sanitized correlation metadata. Never store secrets, raw contact or note content in audit. Runtime receives INSERT for security audit, with narrowly granted exceptional retention operations.

## Q. Proposed database schema
See [additive schema and ERD](audit-evidence/task03.3-source-architecture/proposed-database-erd.md). Add employees, employee sessions, restricted security audit and lead notes in new migration files. Keep lead actor and assignee IDs nullable. Preflight orphan IDs before adding validated FKs and install supporting indexes according to measured query plans. Preserve migration 001 and all public table/receipt behavior.

## R. Proposed REST API
See [endpoint contracts](audit-evidence/task03.3-source-architecture/proposed-api-inventory.md). Version shared Admin schemas separately under `contracts/admin/v1`; schema-validate requests and serialize response allowlists. Use stable error codes with sanitized request identifiers. OpenAPI remains gated, with PII field classifications and synthetic examples.

## S. Admin UI/UX blueprint
Login with generic feedback and accessible password controls. Shell offers Leads, Dashboard, Employees for ADMIN, identity and logout. Dashboard uses scope-filtered totals, recent leads and status breakdown, with an explicit snapshot time. Lead list supports filters, pagination, loading, error, empty and unavailable results. Detail drawer includes masked overview, consent, trip preferences, authorized actions, explicit reveal, notes and history. Focus starts inside, Escape closes, focus restores to the row, and keyboard and mobile use are supported. Route state may store safe filters and lead identifier. Cache masked data in memory only, cancel stale queries when scope changes and drop reveal state on tab/session events. Employee view shows roles and status, with deliberate confirmation for disabling or resetting. Hide unauthorized actions while backend enforces all access.

## T. Threat model
See [security gap matrix](audit-evidence/task03.3-source-architecture/security-gap-matrix.md). Treat same-origin public script compromise as a cross-boundary risk: strict CSP, no untrusted HTML and minimized third-party script authority are essential in both apps. HttpOnly and CSRF controls cannot neutralize a script with origin access.

## U. Supabase compatibility
Use PostgreSQL from Fastify only. Separate migrator and runtime credentials with narrow grants, verify TLS host and CA, and keep private schemas outside Data API and Realtime publication exposure. Prefer direct or session pooling for a persistent backend based on connectivity; migration uses its dedicated connection. Review transaction affinity and driver prepared statement behavior before choosing transaction pooling. Confirm grants and RLS policies with test identities before any production admission. Supabase Auth is outside this design. [Supabase PostgreSQL connections](https://supabase.com/docs/guides/database/connecting-to-postgres).

## V. Environment and infrastructure
Use only isolated disposable or explicitly authorized test PostgreSQL in later phases. Existing sample uses separate runtime and migration URL variables, pool default 5, TLS verification in production, and intake flags. Propose server-only Admin enable flag, exact canonical origin, bounded session settings and limiter config. Validate required values at startup when enabled. Keep passwords, DSNs, signing keys and cookie values out of public Vite variables, build artifacts and logs. Define bounded pool wait, lock and statement timeouts. Benchmark concurrent Argon2 and ensure intake capacity. Emit Admin metrics by route template/status, auth outcomes, reveal audit failure, DB wait, stale versions and latency without raw identifiers or PII. At multiple replicas share auth/reveal limiter state and trust client IP only from configured ingress. Use EXPLAIN on representative synthetic volume for list/dashboard and verify index/filter/cursor consistency.

## W. Test strategy
See [test plan](audit-evidence/task03.3-source-architecture/test-plan.md). This phase ran the existing suites only. No Admin runtime exists and no verified disposable database was available for integration.

## X. Regression strategy
Keep the public consultation V1 fixtures and gating tests. Re-run backend contract and disposable PostgreSQL suite after each migration/API phase. Verify exact receipt shape, transport retry equality, SQL atomicity, duplicate protection, consent, outbox behavior, legacy rows, health and no-store responses. Exercise Hanoi and non-Hanoi in browser with intake disabled and synthetic local intake enabled. Check `/admin/` fallback and asset serving cannot shadow public or API routes.

## Y. Requirement traceability
The brief references 58 approved requirements but supplies 58 numbered **sections** without a separately enumerated owner requirement list. The [58-row audit mapping](audit-evidence/task03.3-source-architecture/requirement-traceability.md) identifies its source sections and proposed acceptance checks. These local IDs require reconciliation if the owner maintains a separate canonical register.

## Z. Implementation roadmap
| Phase | Scope | Exit criteria |
|---|---|---|
| 03.3A | Additive identity/session/audit schema, auth plugin, bootstrap, employee management and safe errors | Isolated DB tests for bootstrap, abuse limits, cookie/CSRF, role/status and last-ADMIN concurrency, revocation and public regression |
| 03.3B | Scoped reads, dashboard, audited reveal and lead operations | Transaction and authorization tests, before/after migration compatibility, safe DTOs, conflict and rollback coverage |
| 03.3C | Separate Admin UI, local proxy and same-origin routing validation | Browser and keyboard coverage, ephemeral reveal clearing, roles, no client persistence, public route regression |

- **03.3A** depends on an isolated PostgreSQL target, approved credential lifecycle and KDF benchmark. Add the identity/session/audit migration first, then Admin plugin, CLI and auth tests under `backend/src/modules/admin` and `backend/tests`. Validate credential race and lockout controls. Recovery disables Admin and preserves the additive tables while correcting credentials with audited operator tooling.
- **03.3B** depends on verified auth and approved lead policy. Add lead-note/FK/index migration and `contracts/admin/v1`, then masked reads, transactional mutations and dashboard under the Admin plugin. Verify legacy rows, reassignment races and audit failure before admitting traffic. Recovery disables affected Admin routes and corrects forward where a migration is already applied.
- **03.3C** depends on the accepted API and real local backend/database. Create `admin/` as a React/Vite/TypeScript package, starting with auth, then shell/detail/dashboard/employees and browser tests. No migration is expected. Revert Admin assets and scoped route config if routing or privacy tests fail.

## AA. Architecture decisions
Approved architecture is the baseline. The remaining decisions are enumerated in the [decision register](audit-evidence/task03.3-source-architecture/architecture-decisions.md), including recommended defaults and explicit owner decisions.

## AB. Blockers and limitations
Local Docker/psql were not on PATH and no PostgreSQL Windows service or previous disposable cluster was found by the recorded checks. Schema inspection is static. Production schema, infrastructure, grants and network were outside scope. No target host capacity benchmark or Admin browser verification was possible. Node v24.11.0 exposes the Argon2 API, with no provider or configuration selected by this audit. Canonical requirements reconciliation is pending if an external owner register exists.

## AC. Final Git verification
See [final Git evidence](audit-evidence/task03.3-source-architecture/git-final.txt) and [hash comparison](audit-evidence/task03.3-source-architecture/hash-comparison.txt). The initial inventory has 326 paths; the final comparison has 314. Four frontend files changed and twelve asset/source paths were removed independently during the audit. Additional untracked docs appeared independently and are excluded from the comparison. Baseline-mapped backend and contract paths match. HEAD is unchanged, staging is empty and Git diff checking passed. The only files written by this audit are its report and evidence.

## AD. Final recommendation
Review the blueprint, resolve the owner decisions, provide a disposable database for later runtime verification and explicitly authorize 03.3A in a separate instruction. Phase 0 ends with this report.
