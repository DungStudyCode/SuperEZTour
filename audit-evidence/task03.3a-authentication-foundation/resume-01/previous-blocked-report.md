# Task 03.3A · Admin Authentication Foundation

**TASK03_3A_BLOCKED · IMPLEMENTATION_BLOCKED**

## Executive summary and scope

Stage A0 found two blockers. Section 3 approves the backend in `backend/`, while the active workspace moved the API to `apps/api/` and contracts to `packages/contracts/`. Section 8 directs a stop when unexpected changes directly conflict with the task. Section 10 also requires a verified isolated PostgreSQL target before implementation, and none was found. This run added documentation and evidence only.

## Repository reconciliation

Branch `refactor/enterprise-monorepo`, HEAD `96e4788f7d1e951eba40a35a519f315d2c3e2dd3`. The worktree already contained staged, unstaged and untracked restructuring. No old folders were restored and no index entries were changed by this task. The [repository reconciliation](audit-evidence/task03.3a-authentication-foundation/previous-audit-reconciliation.md) and [Git baseline](audit-evidence/task03.3a-authentication-foundation/git-baseline.txt) record the affected paths. Existing public lead migration 001 and consultation V1 artifacts matched the old HEAD blobs at their relocated paths.

## PostgreSQL and migration verification

No Docker or PostgreSQL CLI binaries were on PATH, and checks found no matching services, reusable project cluster or portable binaries in the scanned locations. One unrelated temp directory could not be read. No database connection was attempted. Catalog, roles, ownership, migration history and live PostgreSQL regression remain unverified. No migration was applied or added.

If the prior portable ZIP is unavailable, the proposed fallback is an EDB Windows x64 PostgreSQL 17-series ZIP at a verified supported patch release, matching the historical major version. Before executing binaries, record the exact vendor release and verify the archive against independently published vendor integrity material. Extract only into a project-owned, ignored disposable location, initialize an isolated cluster on a free high loopback port, and use distinct runtime and migration roles against synthetic data. No download or installation occurred. [PostgreSQL Windows distributions](https://www.postgresql.org/download/windows/).

## Authentication and security deliverables

First-ADMIN bootstrap, employee provisioning/reset and employee management APIs were not started. Argon2id was not configured or benchmarked. The session, cookie, CSRF, RBAC and security audit features have no new implementation or test result. Last-active-ADMIN concurrency and database outage/recovery are pending. No Admin OpenAPI schemas, dependencies, frontend code or deployment changes were introduced.

## Baseline tests and regression

API typecheck passed. Backend unit/injection passed **10/10** and web passed **39/39**, including the consultation model, transport and localization checks. Contract validation passed for all four public V1 artifacts. Task 03.1 real-PG integration remains pending and this test run did not revalidate 03.2 browser-to-database behavior. [Test transcript](audit-evidence/task03.3a-authentication-foundation/baseline-tests.txt).

## Canonical requirements

The prior Phase 0 matrix used the audit sections. The current brief supplies the canonical list and supersedes that mapping. All [58 parent requirements](audit-evidence/task03.3a-authentication-foundation/parent-requirement-traceability.md) and [49 task requirements](audit-evidence/task03.3a-authentication-foundation/task03.3a-requirement-traceability.md) are traced with current dispositions.

## Integrity and handoff

Fresh baseline and final manifests each contain 322 protected paths. The comparison shows one independently edited frontend file, `Interactive3DMap.jsx`, while baseline preflight ran. It is classified as an unexpected modification relative to the fresh baseline and was preserved. No backend or contract drift appeared during that comparison. HEAD was unchanged and the existing index entry was preserved. [Hash comparison](audit-evidence/task03.3a-authentication-foundation/hash-comparison.txt).

Resume Stage A0 after the active backend and contracts paths are confirmed for Task 03.3A and a verified isolated PostgreSQL target is available. Stage A0 must then verify the catalog, role separation, checksums and existing PostgreSQL suite before any application edit. Task 03.3B still depends on verified completion of authentication, CSRF, RBAC, employee concurrency and audit persistence.
