# Task 03.3A requirement traceability

| ID | Requirement | Preflight result |
|---|---|---|
| A1 | Accept Source Audit COMPLETE_WITH_LIMITATIONS. | Reviewed in preflight |
| A2 | Inspect the four modified frontend files and twelve removed paths without restoring them. | Reviewed in preflight |
| A3 | Generate a new SHA-256 baseline for tracked and untracked source. | Reviewed in preflight |
| A4 | Reconcile the canonical 58 parent requirements. | Reviewed in preflight |
| A5 | Restore isolated local PostgreSQL testing capability before implementation. | Blocked by unavailable verified isolate |
| A6 | Work email as login identifier. | Not started. Stage A0 prerequisites are unmet. |
| A7 | Argon2id with configuration benchmarking. | Not started. Stage A0 prerequisites are unmet. |
| A8 | Prefer the `argon2` package if compatible. | Not started. Stage A0 prerequisites are unmet. |
| A9 | Secure CLI bootstrap for the first ADMIN. | Not started. Stage A0 prerequisites are unmet. |
| A10 | No default accounts or passwords. | Not started. Stage A0 prerequisites are unmet. |
| A11 | ADMIN provisions employee accounts. | Not started. Stage A0 prerequisites are unmet. |
| A12 | Single-use temporary passwords with 24-hour validity. | Not started. Stage A0 prerequisites are unmet. |
| A13 | Mandatory first-login password change. | Not started. Stage A0 prerequisites are unmet. |
| A14 | ADMIN-assisted password reset without automatic email. | Not started. Stage A0 prerequisites are unmet. |
| A15 | Protect the last active ADMIN from disablement or demotion. | Not started. Stage A0 prerequisites are unmet. |
| A16 | Cryptographically random 32-byte opaque session tokens. | Not started. Stage A0 prerequisites are unmet. |
| A17 | Persist only session token digests in PostgreSQL. | Not started. Stage A0 prerequisites are unmet. |
| A18 | Thirty-minute idle session timeout. | Not started. Stage A0 prerequisites are unmet. |
| A19 | Eight-hour absolute session timeout. | Not started. Stage A0 prerequisites are unmet. |
| A20 | HttpOnly, Secure production and SameSite Strict cookies. | Not started. Stage A0 prerequisites are unmet. |
| A21 | Cookie Path `/api/v1/admin/`. | Not started. Stage A0 prerequisites are unmet. |
| A22 | Production cookie name `__Secure-sez_admin`. | Not started. Stage A0 prerequisites are unmet. |
| A23 | Synchronizer CSRF tokens and Origin validation. | Not started. Stage A0 prerequisites are unmet. |
| A24 | Anonymous login CSRF challenge. | Not started. Stage A0 prerequisites are unmet. |
| A25 | Session rotation and revocation. | Not started. Stage A0 prerequisites are unmet. |
| A26 | Revoke sessions on disablement, password reset and role changes. | Not started. Stage A0 prerequisites are unmet. |
| A27 | Login rate limiting and bounded Argon2 concurrency. | Not started. Stage A0 prerequisites are unmet. |
| A28 | ADMIN and CONSULTANT roles only. | Not started. Stage A0 prerequisites are unmet. |
| A29 | Deny-by-default Fastify authorization. | Not started. Stage A0 prerequisites are unmet. |
| A30 | Current employee status and role verification on protected requests. | Not started. Stage A0 prerequisites are unmet. |
| A31 | Additive employees, employee sessions and security audit migrations. | Not started. Stage A0 prerequisites are unmet. |
| A32 | Preserve migration 001 unchanged. | Not started. Stage A0 prerequisites are unmet. |
| A33 | Shared Admin contracts under `contracts/admin/v1/`. | Not started. Stage A0 prerequisites are unmet. |
| A34 | Admin availability independent of public intake. | Not started. Stage A0 prerequisites are unmet. |
| A35 | Employee management API included. | Not started. Stage A0 prerequisites are unmet. |
| A36 | No Lead Management API. | Not started. Stage A0 prerequisites are unmet. |
| A37 | Authentication tests against real PostgreSQL. | Not started. Stage A0 prerequisites are unmet. |
| A38 | Session fixation, rotation, expiration and revocation tests. | Not started. Stage A0 prerequisites are unmet. |
| A39 | CSRF and unauthorized access tests. | Not started. Stage A0 prerequisites are unmet. |
| A40 | Concurrent last-ADMIN protection tests. | Not started. Stage A0 prerequisites are unmet. |
| A41 | Password reset and employee disablement tests. | Not started. Stage A0 prerequisites are unmet. |
| A42 | Database outage and fail-closed tests. | Not started. Stage A0 prerequisites are unmet. |
| A43 | Task 03.1 and Task 03.2 regression. | 49 unit/injection/model tests and contract validation passed. PostgreSQL integration pending. |
| A44 | No Admin UI. | Boundary observed |
| A45 | No customer frontend changes. | Boundary observed |
| A46 | No production Supabase connection or real PII. | Boundary observed |
| A47 | No Task 03.3B, 03.3C, 03.4, 04 or 05. | Boundary observed |
| A48 | No commit, push, deployment or ViVu impact. | Boundary observed |
| A49 | Implementation report, test evidence and final hash verification. | Preflight report, evidence and final hashes recorded |
