# Deployment & VPS Operations Guide — Super EZ Tour

## 1. Deployment Architecture Overview

The public customer website (`@superez/web`, `https://superez.site`) deploys as a static Vite SPA from `apps/web/dist` to Ubuntu VPS (`103.75.187.40`, SSH port `24700`) using **Zero-Downtime Atomic Symlink Swaps** served by Nginx:

```text
/var/www/superez/
├── current -> /var/www/superez/releases/<active-release-id>
├── previous -> /var/www/superez/releases/<previous-release-id>
└── releases/
    ├── 20261119-01/
    └── 20261128-163000/
        ├── assets/          # Hashed JS, CSS & destination WebP assets
        ├── index.html
        └── logo.png
```

Nginx serves `/var/www/superez/current`. On release activation, `/opt/superez/scripts/deploy.sh` creates a temporary symlink and executes `mv -Tf` at the Linux kernel level for zero-downtime cutover without reloading Nginx.

---

## 2. Local Verification & Deployment Commands

Scripts are located in `scripts/deployment/` (`deploy.ps1` and `rollback.ps1`), with root wrapper compatibility via `npm run deploy:dry-run`:

### 2.1 Safe Local Dry-Run (Zero Network / Zero Production Impact)
Validates workspace structure (`@superez/web`), builds or inspects `apps/web/dist`, checks bundle/asset integrity, and prints the planned deployment actions **without opening any SSH/SCP connection**:
```powershell
npm run deploy:dry-run
# or directly:
powershell -ExecutionPolicy Bypass -File .\scripts\deployment\deploy.ps1 -DryRun
```

To also run remote SSH preflight checks without uploading or switching releases, pass `-CheckRemote`:
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deployment\deploy.ps1 -DryRun -CheckRemote
```

### 2.2 Production Frontend Deployment (Requires Explicit Authorization)
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deployment\deploy.ps1
```

Seven-step pipeline:
1. **`[1/7] Preflight`:** Verifies monorepo root, `apps/web/package.json` (`@superez/web`), CLI tools (`node`, `npm`, `ssh`, `scp`, `curl.exe`), SSH key, and remote `/opt/superez/scripts/{deploy,rollback}.sh`.
2. **`[2/7] Build`:** Cleans `apps/web/dist`, runs `npm run build:web`, validates `index.html` and all referenced JS/CSS chunks (plus byte sizes of any `.glb` models if present).
3. **`[3/7] Create Release`:** Creates an immutable `/var/www/superez/releases/<ReleaseId>` directory.
4. **`[4/7] Upload`:** Uploads `apps/web/dist/.` over SCP (`chmod 755` directories, `644` files — never `777`).
5. **`[5/7] Validate`:** Verifies remote file count, `index.html`, `assets/`, and exact `.glb` byte parity if applicable.
6. **`[6/7] Activate`:** Calls `/opt/superez/scripts/deploy.sh <ReleaseId>`.
7. **`[7/7] Health Check & Auto-Rollback`:** Verifies HTTPS `200` on `https://superez.site`, live HTML bundle hash match, all referenced JS/CSS assets, SPA fallback on `/destinations/ha-noi`, and `https://api.vivu.site/health` isolation. Automatically triggers `rollback.sh` if `current` points to the new release and any check fails.

### 2.3 Manual Rollback
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deployment\rollback.ps1
```

---

## 3. Future API Deployment & Least-Privilege Migration

- **API Container (`apps/api/Dockerfile`):** Builds from the monorepo root (`docker build -f apps/api/Dockerfile -t superez-lead-api:local .`), bundling `@superez/api` (`dist/`) and `@superez/contracts` under non-root `USER node` on port `3103`. Production migrations execute via `node dist/database/migrate.js`.
- **Nginx Reverse Proxy Template:** See `infrastructure/nginx/superez.site.conf.example` (reference template — verify live `/etc/nginx/sites-available/` before applying).
- **Least-Privilege SSH User Plan:** Current scripts default to `root` for backward compatibility with existing `/opt/superez/scripts/`. Before enabling automated CI/CD, provision a dedicated Linux user `superez_deploy` scoped strictly to `/var/www/superez` and `/opt/superez/scripts`.

---

## 4. Non-Negotiable ViVu Production Isolation Rules

VPS `103.75.187.40` co-hosts the live **ViVu** platform. All engineers must strictly obey:
1. **NEVER** modify `/etc/nginx/sites-available/vivu.conf` or `/etc/nginx/sites-enabled/vivu.conf`.
2. **NEVER** stop, restart, or inspect secrets of the `vivu-backend` Docker container.
3. **NEVER** run global destructive Docker commands (`docker system prune`, `docker volume prune`, `docker stop $(docker ps -q)`).
4. **NEVER** touch ViVu's MongoDB instance.
5. **NEVER** alter `/etc/ssh/sshd_config` or port `24700`.
6. **NEVER** run `certbot --nginx` blindly against live server blocks.
7. **NEVER** delete `/var/www/superez/current` or `/var/www/superez/previous` targets (retain at least the 5 most recent releases).
