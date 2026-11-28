# Changelog — Super EZ Tour

## [2.0.0] — 2026-11-28 · Enterprise Monorepo Migration, Cleanup & Optimization

### Added
- **Enterprise Monorepo (`npm Workspaces`):** Restructured repository into `apps/web` (`@superez/web`), `apps/api` (`@superez/api`), and `packages/contracts` (`@superez/contracts`) under a single authoritative root `package-lock.json` (`node >=24 <25`).
- **Shared Contracts Package (`@superez/contracts`):** Packaged Consultation API v1 JSON Schemas (`request`, `receipt`, `error`), `synthetic.json`, canonical destination/attraction/culinary/source allowlists, and shared Korean phone (`+8210...`) & `Asia/Seoul` date normalizers.
- **Automated Validation & Localization Regression Suites:** Added `scripts/validation/validate-contracts.mjs`, `scripts/validation/validate-locales.mjs`, and `apps/web/src/features/destinations/data/destinations.localization.test.js`.
- **Infrastructure & Deployment Modernization:** Added `infrastructure/docker/compose.{dev,test}.yml`, reference `infrastructure/nginx/superez.site.conf.example`, workspace-aware multi-stage `apps/api/Dockerfile` with compiled production migration entrypoint (`dist/database/migrate.js`), and local-only `-DryRun` mode in `scripts/deployment/deploy.ps1`.
- **Canonical Documentation (`docs/`):** Consolidated scattered root reports into structured `docs/{architecture,features,guidelines,operations,decisions,audits}/`.

### Changed
- **Bundle & Code-Splitting Optimization (`@superez/web`):** Implemented route-level lazy loading (`Home`, `DestinationPage`, `HanoiExperiencePage`, `DaNangExperiencePage`) and isolated Three.js (`FlyThroughScene`), `maplibre-gl`, vendor libraries, and destination configs into dedicated chunks; eliminated duplicate `da-nang/{ko,vi}.json` loading from `LanguageContext.jsx`.
- **Security Hardening:** Untracked root `.env` from Git index, scrubbed obsolete `VITE_MAPBOX_ACCESS_TOKEN`, separated `apps/web/.env.example` and `apps/api/.env.example`, and gated stack trace rendering in `ErrorBoundary.jsx` strictly behind `import.meta.env.DEV`.

### Removed
- **Dead Code & Redundant Assets:** Removed unused components/files (`Button`, `SectionHeading`, `HanoiYourStory`, `src/data/quotes.js`, `src/data/reviews.js`), unused `onAddQuote` props, unreferenced `thap_rua_pbr.glb` (`9.41 MB`), duplicate `src/assets/logo.png` (`759 KB`), duplicate Old Quarter WebP files (`cafe_giang.webp`, `xe_hoa.webp` — `1.06 MB`), obsolete task reports, temporary `scratch/` scripts, and redundant `audit-evidence/` screenshots.

---

## [1.3.0] — 2026-11-27 to 2026-11-28 · Conversion-First Hanoi & Lead Reception Foundation
- **Task 03.2:** Integrated dev-only opt-in Hanoi `QuickConsultationForm` transport adapter, idempotent attempt coordinator, and `QuickConsultationReceipt` (`SEZ-*`).
- **Task 03.1:** Implemented Fastify 5 + PostgreSQL 17 Lead API foundation (`POST /api/v1/leads`, `/health/live`, `/health/ready`, `001_lead_foundation.sql` atomic 6-table intake, checksummed migrator).
- **Task 02 V1.1:** Delivered Korean-first `QuickConsultationForm` UX polish (`1440×900` zero-scroll CTA, `+82` normalization preview, `Asia/Seoul` date rules).
- **Task 01 V4.2.1:** Recomposed `HanoiAwakeningHero` with conversion-first H1, dual CTAs, and responsive `DestinationHeader`.

## [1.2.0] — 2026-11-25 · Hanoi Immersive Cultural Journey (Screens 2–7)
- **Screen 7 V1:** Added `CinematicJournalStage` 3D2N natural-scroll monograph itinerary.
- **Screen 6 V1.3:** Stabilized `Interactive3DMap` (`travel-atlas` variant) camera ownership, laptop density tier, and `340vh` discovery pin.
- **Screen 5 V1.1 & Screen 4 V3:** Completed `HanoiSeasons3D` 4-season WebP curation and `HanoiTaste3D` 3-chapter culinary documentary (Phở, Bún Chả, Chả Cá Lã Vọng).

## [1.0.0] — 2026-11-19 · Initial Platform & Da Nang 3D Launch
- Launched bilingual (`KO`/`VI`) Homepage, 14-scene Da Nang experience, `TripBuilderMorph`, and atomic symlink VPS deployment scripts (`deploy.ps1`, `rollback.ps1`).
