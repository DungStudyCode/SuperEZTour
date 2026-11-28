# Canonical parent requirement traceability

This replaces the section-derived Phase 0 mapping for this milestone. Future and deferred work is not verified.

| ID | Requirement | Assignment | Evidence or status |
|---|---|---|---|
| P1 | Separate React + Vite Admin application in `admin/`. | 03.3C | Pending or outside this milestone |
| P2 | Admin uses TypeScript, independent package and build. | 03.3C | Pending or outside this milestone |
| P3 | Reuse the Fastify Modular Monolith. | Existing foundation | Existing unit/contract baseline passed. PostgreSQL integration pending. |
| P4 | Production same-origin `/admin/` and `/api/v1/admin/`. | 03.3C | Pending or outside this milestone |
| P5 | PostgreSQL and SQL migrations. | Existing foundation | Existing unit/contract baseline passed. PostgreSQL integration pending. |
| P6 | No Supabase Auth, Redis or Microservices. | Existing foundation | Existing unit/contract baseline passed. PostgreSQL integration pending. |
| P7 | Employee account authentication. | 03.3A | Pending or outside this milestone |
| P8 | No public registration. | 03.3A | Pending or outside this milestone |
| P9 | Secure local first-ADMIN bootstrap. | 03.3A | Pending or outside this milestone |
| P10 | Argon2id password hashing. | 03.3A | Pending or outside this milestone |
| P11 | PostgreSQL-backed server-side sessions. | 03.3A | Pending or outside this milestone |
| P12 | HttpOnly cookies, Secure in production and appropriate SameSite. | 03.3A | Pending or outside this milestone |
| P13 | CSRF protection for mutations. | 03.3A | Pending or outside this milestone |
| P14 | Session expiration, rotation and revocation. | 03.3A | Pending or outside this milestone |
| P15 | Login rate limiting. | 03.3A | Pending or outside this milestone |
| P16 | ADMIN and CONSULTANT roles. | 03.3A | Pending or outside this milestone |
| P17 | Authorization on every Admin API. | 03.3A | Pending or outside this milestone |
| P18 | Account disablement revokes access and sessions. | 03.3A | Pending or outside this milestone |
| P19 | Server-side lead pagination. | 03.3B | Pending or outside this milestone |
| P20 | Server-side search, filtering and sorting. | 03.3B | Pending or outside this milestone |
| P21 | Authorized lead detail API. | 03.3B | Pending or outside this milestone |
| P22 | Masked personal information in lead lists. | 03.3B | Pending or outside this milestone |
| P23 | Authorized and audited private contact disclosure. | 03.3B | Pending or outside this milestone |
| P24 | Manual employee assignment. | 03.3B | Pending or outside this milestone |
| P25 | CONSULTANT access limited to assigned leads. | 03.3B | Pending or outside this milestone |
| P26 | Validated lead status transitions. | 03.3B | Pending or outside this milestone |
| P27 | Lead closing with reason and reopening. | 03.3B | Pending or outside this milestone |
| P28 | Internal notes. | 03.3B | Pending or outside this milestone |
| P29 | Lead activity history. | 03.3B | Pending or outside this milestone |
| P30 | Optimistic locking. | 03.3B | Pending or outside this milestone |
| P31 | Dashboard backed by actual database data. | 03.3B | Pending or outside this milestone |
| P32 | Professional light-theme CRM design. | 03.3C | Pending or outside this milestone |
| P33 | Admin sidebar and header. | 03.3C | Pending or outside this milestone |
| P34 | Login screen. | 03.3C | Pending or outside this milestone |
| P35 | Dashboard screen. | 03.3C | Pending or outside this milestone |
| P36 | Lead list screen. | 03.3C | Pending or outside this milestone |
| P37 | Lead detail Drawer. | 03.3C | Pending or outside this milestone |
| P38 | Advanced search and filtering. | 03.3C | Pending or outside this milestone |
| P39 | Employee management interface. | 03.3C | Pending or outside this milestone |
| P40 | Notes and activity interface. | 03.3C | Pending or outside this milestone |
| P41 | Vietnamese-first Admin, preserving original Korean customer data. | 03.3C | Pending or outside this milestone |
| P42 | Loading, empty, error and permission-denied states. | 03.3C | Pending or outside this milestone |
| P43 | Desktop, tablet and basic mobile responsiveness. | 03.3C | Pending or outside this milestone |
| P44 | Preserve Task 03.2 Quick Consultation. | Cross-phase verification | Existing unit/contract baseline passed. PostgreSQL integration pending. |
| P45 | Do not change the customer website UI. | Cross-phase verification | Preserved by 03.3A preflight |
| P46 | Keep production intake disabled. | Cross-phase verification | Existing unit/contract baseline passed. PostgreSQL integration pending. |
| P47 | Synthetic data and isolated local PostgreSQL only. | Cross-phase verification | Blocked. No verified target |
| P48 | No production Supabase connection. | Cross-phase verification | Preflight boundary observed |
| P49 | No notification worker or automatic assignment. | Explicitly deferred | Pending or outside this milestone |
| P50 | No booking, payment, Task 04 or Task 05. | Explicitly deferred | Pending or outside this milestone |
| P51 | Authentication, session, CSRF and RBAC tests. | 03.3A | Pending or outside this milestone |
| P52 | Unauthorized lead access and IDOR tests. | 03.3B | Pending or outside this milestone |
| P53 | Concurrency, status and audit tests. | 03.3B | Pending or outside this milestone |
| P54 | Admin UI tests with real database. | 03.3C | Pending or outside this milestone |
| P55 | Task 03.1 and Task 03.2 regression. | Cross-phase verification | Existing unit/contract baseline passed. PostgreSQL integration pending. |
| P56 | Tracked and untracked source baseline hashes. | Cross-phase verification | Preflight evidence captured |
| P57 | Implementation report and test evidence. | Cross-phase verification | Preflight evidence captured |
| P58 | No commit, push, deployment or ViVu impact. | Cross-phase verification | Preflight boundary observed |
