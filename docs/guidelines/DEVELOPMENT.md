# Development & Repository Hygiene Guidelines

## 1. Monorepo Workflow & Commands

All dependency installation and verification run from the repository root (`D:\workplace\SuperEZTour`) using **Node.js 24 LTS (`>=24 <25`)** and **npm Workspaces**:

| Command | Description |
|---|---|
| `npm ci` | Clean, deterministic install of all workspace dependencies from root `package-lock.json` |
| `npm run dev:web` | Start `@superez/web` Vite dev server on `http://127.0.0.1:3000` |
| `npm run dev:api` | Start `@superez/api` Fastify server in watch mode on `http://127.0.0.1:3103` |
| `npm run build` | Build shared checks, `@superez/web` (`apps/web/dist`), and `@superez/api` (`apps/api/dist`) |
| `npm run build:web` | Build `@superez/web` production SPA bundle |
| `npm run build:api` | Compile `@superez/api` TypeScript to `apps/api/dist` |
| `npm test` | Run all unit, contract, localization, and HTTP-injection tests across workspaces |
| `npm run typecheck` | Run strict TypeScript typechecking across `@superez/api` (`src` + `tests`) and `@superez/contracts` |
| `npm run validate:contracts` | Validate JSON schemas and frontend/backend consultation contract conformance |
| `npm run validate:locales` | Verify 100% KO/VI dictionary key & type parity and empty-string cleanliness |

---

## 2. Workspace & Code Ownership Rules

1. **Declare Direct Dependencies Explicitly:** Every workspace (`apps/web`, `apps/api`, `packages/contracts`) must list every package it imports in its own `package.json`. Never rely on accidental npm root hoisting.
2. **Use Workspace Imports, Never Cross-App Relative Paths:** Import shared schemas and domain constants from `@superez/contracts` (e.g., `import receiptSchema from '@superez/contracts/consultation/v1/receipt.schema.json' with { type: 'json' }`), never via `../../../packages/...`.
3. **Frontend Internal Alias:** Inside `apps/web/src`, `@/` resolves to `apps/web/src/`. Keep `common/` components free of upward imports into `features/destinations/`.
4. **CSS & Design Token Ownership:**
   - `apps/web/src/styles/variables.css`: Global layout & Homepage tokens.
   - `apps/web/src/constants/brand.config.js`: Brand identity & verified company metadata (`null` fields must never render publicly).
   - `apps/web/src/features/destinations/styles/destination-theme.css` + scene CSS files: Scoped destination editorial palettes (preserving distinct Da Nang coastal navy/gold and Hanoi archival charcoal/ivory/bronze identities).

---

## 3. Permanent Repository Hygiene Rules (Mandatory)

All engineers and AI coding agents working in this repository **must** enforce the following 15 permanent hygiene rules:

1. **Do not generate a new Markdown report for every task.** Summarize task outcomes in pull requests / agent responses and update canonical files under `docs/` when architecture or behavior changes.
2. **Do not store temporary screenshots in the repository root.**
3. **Do not retain obsolete audit evidence indefinitely.** Keep temporary browser captures and logs outside Git or in ignored scratch directories.
4. **Do not create `backup/`, `old/`, `temp/` or `archive/` folders for dead source code.** Git history is the recovery mechanism for tracked files.
5. **Do not commit generated build output** (`dist/`, `.vite/`, `coverage/`, compiled artifacts).
6. **Do not commit `node_modules`.**
7. **Do not commit real environment files** (`.env`, `.env.local`, `.env.production`). Only sanitized `.env.example` templates with safe placeholders may be tracked.
8. **Do not introduce dependencies without clear architectural justification.**
9. **Remove obsolete imports, props, and styles immediately when removing or refactoring features.**
10. **Remove confirmed unused static assets** and verify SHA-256 hashes to prevent duplicate binary files.
11. **Reuse existing modules and shared contracts** (`@superez/contracts`) instead of duplicating validation regexes, canonical IDs, or schema definitions.
12. **Keep architecture documentation (`docs/`) synchronized with actual code implementation.**
13. **Keep database migrations (`apps/api/migrations/`) and contracts (`packages/contracts/`) strictly versioned and forward-compatible.**
14. **Prefer clear code ownership over premature abstraction.** Do not extract shared packages (`ui`, `config`, `i18n`) until at least two active applications genuinely share the exact code.
15. **Do not create empty scaffolding or placeholder directories for unimplemented features** (such as `apps/admin` before Task 03.3).
