# Super EZ Tour — Enterprise Monorepo

**Super EZ Tour** is a Korean-first inbound private travel platform (`market = 'KR'`) crafting 100% bespoke journeys across Vietnam, with full bilingual support in **Korean (`ko`)** and **Vietnamese (`vi`)**.

---

## 1. Architecture & Repository Structure

Managed via native **npm Workspaces** on **Node.js 24 LTS**:

```text
SuperEZTour/
├── apps/
│   ├── web/                # @superez/web — React 18 + Vite 6 + GSAP + Three.js + MapLibre SPA
│   └── api/                # @superez/api — Fastify 5 + TypeScript + PostgreSQL 17 Lead API
├── packages/
│   └── contracts/          # @superez/contracts — Consultation v1 JSON Schemas & canonical rules
├── infrastructure/
│   ├── docker/             # Isolated local PostgreSQL 17 dev & integration test Compose stacks
│   └── nginx/              # Reference Nginx static SPA + /api/v1 reverse-proxy template
├── scripts/
│   ├── deployment/         # Zero-downtime atomic symlink PowerShell deploy & rollback scripts
│   └── validation/         # Automated contract & KO/VI localization parity validators
└── docs/                   # Canonical architecture, feature, localization & operations docs
```

---

## 2. Technology Stack & System Requirements

- **Runtime:** Node.js `>=24 <25` (v24 LTS), npm `>=10`
- **Frontend (`@superez/web`):** React 18.3, Vite 6, React Router 6, GSAP 3.15 + ScrollTrigger, Lenis, Three.js, MapLibre GL JS, Swiper, Vanilla CSS Custom Properties
- **Backend (`@superez/api`):** Fastify 5, TypeScript 5.9 (`strict: true`), `pg` (`node-postgres`), `@fastify/rate-limit`, `@fastify/swagger`
- **Database:** PostgreSQL 17 locally (`infrastructure/docker/`); **Supabase Managed PostgreSQL** for production (Fastify owns all business logic, auth, and DB access)

---

## 3. Installation & Environment Setup

1. **Install all workspace dependencies from root:**
   ```bash
   npm ci
   ```
2. **Configure local environment files (never committed to Git):**
   ```powershell
   Copy-Item apps/web/.env.example apps/web/.env
   Copy-Item apps/api/.env.example apps/api/.env
   ```
   - `apps/web/.env` holds only public/dev `VITE_*` flags.
   - `apps/api/.env` holds server-only database URLs, TLS settings, and HMAC digest secrets.

---

## 4. Development, Build & Verification Commands

Run all commands from the repository root:

| Command | Action |
|---|---|
| `npm run dev:web` | Start customer SPA dev server (`http://127.0.0.1:3000`) |
| `npm run dev:api` | Start Fastify Lead API in watch mode (`http://127.0.0.1:3103`) |
| `npm run build` | Build both `@superez/web` (`apps/web/dist`) and `@superez/api` (`apps/api/dist`) |
| `npm run build:web` | Build `@superez/web` production bundle |
| `npm run build:api` | Compile `@superez/api` TypeScript to JavaScript |
| `npm test` | Run all unit, HTTP-injection, contract, and localization tests |
| `npm run typecheck` | Run strict TypeScript checking across API (`src` + `tests`) |
| `npm run validate:contracts` | Validate Consultation v1 JSON Schemas and payload contracts |
| `npm run validate:locales` | Validate 100% KO/VI dictionary key & type parity |
| `npm run migrate:api` | Apply checksummed SQL migrations to configured local PostgreSQL |
| `npm run deploy:dry-run` | Run local-only frontend deployment & build verification (zero network calls) |

### Local Database & Integration Testing
```powershell
$env:SUPEREZ_TEST_POSTGRES_PASSWORD = 'your-local-test-password'
docker compose -f infrastructure/docker/compose.test.yml up -d --wait
$env:INTEGRATION_DATABASE_URL = 'postgresql://superez_test:<url-encoded-password>@127.0.0.1:55432/superez_lead_test'
npm --workspace @superez/api run test:integration
docker compose -f infrastructure/docker/compose.test.yml stop
```

---

## 5. Documentation Index

- **Architecture:** [System Architecture](docs/architecture/SYSTEM_ARCHITECTURE.md) · [Database Architecture](docs/architecture/DATABASE_ARCHITECTURE.md) · [ADRs](docs/decisions/ADR.md)
- **Features:** [Hanoi Experience](docs/features/HANOI.md) · [Da Nang Experience](docs/features/DA_NANG.md) · [Consultation & Lead Intake](docs/features/CONSULTATION.md)
- **Guidelines:** [Development & Hygiene Rules](docs/guidelines/DEVELOPMENT.md) · [KO/VI Localization & 3D Lifecycle](docs/guidelines/LOCALIZATION.md)
- **Operations:** [VPS Deployment & Rollback](docs/operations/DEPLOYMENT.md) · [Supabase Production Preparation](docs/operations/SUPABASE.md)
- **History:** [Changelog](docs/CHANGELOG.md) · [Pre-Migration Architecture Audit](docs/audits/SUPER_EZ_FULL_ARCHITECTURE_AUDIT.md)

---

## 6. Contribution & Hygiene Summary

Follow [docs/guidelines/DEVELOPMENT.md](docs/guidelines/DEVELOPMENT.md): keep `.env` files untracked, never generate standalone root Markdown reports per task, avoid cross-app relative imports (use `@superez/contracts`), preserve Korean baseline copy and 100% KO/VI key parity, and never touch live VPS/ViVu services without explicit deployment authorization.
