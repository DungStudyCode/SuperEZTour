# SUPER EZ TOUR — HANOI SCREEN 4 V3 IMPLEMENTATION REPORT
## CHẢ CÁ LÃ VỌNG — THE ART OF TABLESIDE DINING

**Project Root:** `D:\workplace\SuperEZTour`  
**Production Route:** `/destinations/ha-noi`  
**Component:** `HanoiTaste3D` (`Chapter 01: Phở V1` → `Chapter 02: Bún Chả V2` → `Chapter 03: Chả Cá Lã Vọng V3`)  
**Date:** 2026-11-25  
**Build Status:** PASS (`npm run build`, exit code `0`, 1,752 modules transformed in 9.83s)  
**Deployment Status:** NO DEPLOYMENT EXECUTED  

---

## 1. Git Baseline

- **Branch:** `main`
- **HEAD Commit:** `f00feae64b4db6bd69ce49e236b9490e2980fbb0`
- **Pre-existing Working Tree Changes (Preserved Untouched):**
  - `M deploy.ps1` (UTF-8 with BOM fix)
  - `M rollback.ps1` (UTF-8 with BOM fix)
  - `D HANOI_SCREEN2_SOURCE_AUDIT.md`
  - `D HANOI_SCREEN4_BUNCHA_V2_REPORT.md`
- **Git Safety:** Zero destructive Git commands (`reset`, `clean`, `restore`, `checkout`, `stash`, `commit`) were executed.

---

## 2. Files Changed

### Newly Created Files
1. `src/features/destinations/components/Hanoi/HanoiTaste3D/chaCaAssets.js` — `CHA_CA_ASSET_MANIFEST` & `CHA_CA_SCRIM_GRADIENTS`.
2. `src/features/destinations/components/Hanoi/HanoiTaste3D/chaCaScenes.js` — `CHA_CA_DOCUMENTARY_ACTS` (5 acts, bilingual KO/VI, custom `motionProfile`).
3. `src/features/destinations/components/Hanoi/HanoiTaste3D/ChaCaDetailModal.jsx` — Accessible bilingual monograph modal with Tab/Shift+Tab focus trap and safe Lenis pause/resume.
4. `public/assets/destinations/hanoi/cha-ca/` — 10 optimized local WebP files (5 desktop + 5 mobile, 1,371.9 KB / 1.34 MB total).
5. `HANOI_SCREEN4_CHACA_V3_REPORT.md` — This implementation report.

### Modified Files
1. `src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.jsx` — Added `CHA_CA_KEYS`, `IntersectionObserver` offscreen proximity loading + bounded `img.decode()` lookahead, CSS custom-property responsive focal points, and appended 3rd sibling `<CulinaryChapterSection chapterId="hanoi-taste-chaca" ... />`.
2. `src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.css` — Added `.chaca-documentary-scene` cast-iron charcoal (`#171B17`), turmeric gold (`#D5A340`), dill green (`#53734B`), warm ivory (`#F2E8D5`) theme styles, `.chaca-modal-panel`, `.chaca-tasting-note`, responsive `--focal-desktop` / `--focal-mobile` rules, and flexible reduced-motion height for Chả Cá.
3. `src/features/destinations/components/Hanoi/HanoiTaste3D/buildPhoTimeline.js` — Added optional `pinDistances` (defaulting to V1/V2's `+=520% / +=380% / +=290%`) and optional `chapterPrefix` (defaulting to `'pho'`).
4. `src/features/destinations/components/Hanoi/HanoiTaste3D/phoScenes.js` — Registered `'cha-ca'` inside `CULINARY_STORIES` metadata registry without circular imports.
5. `src/features/destinations/data/ha-noi.config.js` — Corrected `cha-ca-la-vong` entry (`name` changed from inaccurate `틸라피아` to `'짜까 라봉 (Chả Cá Lã Vọng)'`, removed unverified `1871년부터` claim, pointed `image` to verified local WebP `/assets/destinations/hanoi/cha-ca/chaca-hero-desktop.webp`).

---

## 3. Existing Architecture Reuse

- **Shared Renderer:** Reused `CulinaryChapterSection` directly inside `HanoiTaste3D.jsx` without creating a new renderer.
- **Sequential Sibling Chapters:** `#hanoi-taste` (Phở) → `#hanoi-taste-buncha` (Bún Chả) → `#hanoi-taste-chaca` (Chả Cá) inside unpinned `.hanoi-culinary-chapters`. Zero nested pins, zero mega-timeline, zero floating HUD, zero dish switcher.
- **Timeline Builder:** Reused `buildPhoTimeline.js` directly.
- **Icon Verification:** Confirmed `Fish` is exported by `lucide-react` (`v0.460.0`) before importing.
- **Preserved Screens:** Screen 1–3, Phở V1, Bún Chả V2, Screen 5 (`HanoiSeasons3D`), Screens 6–11, Navbar, Footer, and global Lenis remain untouched.

---

## 4. Five-Act Storyboard (`chaCaScenes.js`)

| Act | ID | Title (VI / KO) | Layout Variant | Asset |
|---|---|---|---|---|
| **01** | `chaca-act-01` | **CHẢ CÁ LÃ VỌNG** / **짜까 라봉** | `fullscreen-hero` | `chaca-hero` |
| **02** | `chaca-act-02` | **Sắc vàng từ nghệ, hương thơm từ riềng** / **강황과 갈랑갈이 더하는 풍미** | `left-editorial` | `chaca-ingredients` |
| **03** | `chaca-act-03` | **Khi món ăn được hoàn thiện ngay tại bàn** / **식탁 위에서 완성되는 요리** *(Hero Act)* | `right-editorial` | `chaca-tableside` |
| **04** | `chaca-act-04` | **Một bàn ăn, nhiều tầng hương vị** / **한 상에 어우러지는 다채로운 풍미** | `layered-editorial` | `chaca-table` |
| **05** | `chaca-act-05` | **Thưởng thức Hà Nội theo cách riêng** / **하노이의 식문화를 경험하는 시간** | `wide-ending` | `chaca-dining` |

---

## 5. Asset Manifest (`chaCaAssets.js`)

| Asset ID | Desktop WebP (`1920×1080`) | Mobile WebP (`800×1000`) | Focal Point (Desktop / Mobile) |
|---|---:|---:|---|
| `chaca-hero` | 136.2 KB | 62.0 KB | `52% 56%` / `50% 54%` |
| `chaca-ingredients` | 231.2 KB | 122.2 KB | `56% 58%` / `54% 62%` |
| `chaca-tableside` | 136.9 KB | 57.0 KB | `50% 54%` / `48% 55%` |
| `chaca-table` | 294.5 KB | 128.2 KB | `54% 48%` / `56% 46%` |
| `chaca-dining` | 146.0 KB | 57.7 KB | `52% 48%` / `50% 48%` |
| **Subtotal** | **944.8 KB** | **427.1 KB** | **Total on Disk: 1,371.9 KB (1.34 MB)** |

---

## 6. Source & License Verification

All 5 photographs were visually inspected via thumbnail and final WebP checks prior to inclusion; zero AI-generated or generic fried-fish substitutes were used:

| Asset ID | Wikimedia Commons File | Photographer | License | Verified |
|---|---|---|---|---|
| `chaca-hero` | `File:Fish_and_dill_for_2_-_Cha_Ca_La_Vong_VND120000_each.jpg` | avlxyz | CC BY-SA 2.0 Generic | `true` |
| `chaca-ingredients` | `File:Gia_vi_Cha_Ca.JPG` | Khương Việt Hà (`Viethavvh`) | Public Domain | `true` |
| `chaca-tableside` | `File:Fish_and_dill_for_2_-_close-up_-_Cha_Ca_La_Vong_VND120000_each.jpg` | avlxyz | CC BY-SA 2.0 Generic | `true` |
| `chaca-table` | `File:MyPlate_gov_Cultural_Food_(20241025-USDA-FNS-UNK-0093).jpg` *(MyPlate badge cleanly cropped out in WebP)* | USDA | Public Domain | `true` |
| `chaca-dining` | `File:Chả_cá_Lã_Vọng_và_bia_Hà_Nội_tháng_2_năm_2018_(3).jpg` | Phương Huy | CC BY-SA 4.0 International | `true` |

---

## 7. Motion Profiles (`chaCaScenes.js`)

| Act | Motion Style | `scaleStart → scaleEnd` | `panXStart → panXEnd` | `panYStart → panYEnd` | `extendedHold` |
|---|---|---|---|---|---|
| **01** | Slow cinematic push-in + subtle upward warmth | `1.02 → 1.07` | `0 → 0` | `+4 → -4` | `false` |
| **02** | Macro ingredient reveal + diagonal drift | `1.09 → 1.03` | `-10 → +8` | `+6 → -4` | `false` |
| **03** | **Tableside lateral camera drift (Hero Act)** | `1.07 → 1.09` | `-20 → +20` | `0 → 0` | **`true`** |
| **04** | Top-down composition pull-out reveal | `1.10 → 1.02` | `0 → 0` | `-8 → 0` | `false` |
| **05** | Atmospheric pull-back to dining scene | `1.07 → 1.01` | `+10 → 0` | `0 → 0` | `false` |

- `scaleStart >= 1.07` on lateral-drift Act 03 prevents exposed edges on all desktop/mobile aspect ratios (mobile pan amplitude is scaled by `mobileFactor = 0.5`).
- Zero WebGL, zero fake 3D rotation, zero fake smoke/oil particles; 100% deterministic reverse scroll.

---

## 8. Actual Pin Distances

| Chapter | Desktop (`>=993px`) | Tablet (`769–992px`) | Mobile (`<=768px`) |
|---|---|---|---|
| Chapter 01 — Phở V1 (unchanged) | `+=520%` | `+=380%` | `+=290%` |
| Chapter 02 — Bún Chả V2 (unchanged) | `+=520%` | `+=380%` | `+=290%` |
| Chapter 03 — Chả Cá V3 (tuned) | `+=450%` | `+=340%` | `+=260%` |

---

## 9. Total Culinary Scroll Distance (Screen 4)

- **Desktop:** `520% + 520% + 450% = 1,490%` pinned travel (+ `300vh` base section heights)
- **Tablet:** `380% + 380% + 340% = 1,100%` pinned travel (+ `300vh` base section heights)
- **Mobile:** `290% + 290% + 260% = 840%` pinned travel (+ `300vh` base section heights)

---

## 10. TripBuilder Integration

- Uses existing shared normalization in `TripBuilderContext.jsx` (`CULINARY_ALIAS_GROUPS` lines 38–45) and `TripBuilderMorph.jsx` Step 6 (`isCulinarySelected` line 677).
- Exact target labels passed to Chapter 03:
  - `targetLabelVi = "Chả Cá Lã Vọng"`
  - `targetLabelKo = "짜까 라봉 (Chả Cá Lã Vọng)"`
- Both labels belong to the existing Chả Cá alias group; zero duplicate normalization systems created; `TripBuilderContext.jsx` and `TripBuilderMorph.jsx` required zero modifications.

---

## 11. KO/VI QA

- All 5 acts in `chaCaScenes.js`, alt texts in `chaCaAssets.js`, modal content in `ChaCaDetailModal.jsx`, and CTA/added-state labels are fully authored in both Vietnamese and Korean.
- `ha-noi.config.js` `cha-ca-la-vong` entry updated so Korean `name` matches `nameKr` (`짜까 라봉 (Chả Cá Lã Vọng)`) without inaccurate `틸라피아` wording.

---

## 12. Modal Accessibility (`ChaCaDetailModal.jsx`)

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby="chaca-modal-title"`.
- Moves initial focus to the close button (`closeBtnRef`) inside the modal on open.
- Enforces full keyboard `Tab` and `Shift+Tab` focus trapping within the dialog.
- Closes on `Escape` and overlay click, restoring focus to `previouslyFocusedElement.current`.
- Safely pauses global Lenis via `getLenis()` **only if `!lenis.isStopped`**, and resumes it on close **only if this modal paused it** (preserving exact prior Lenis state without resetting scroll).
- Includes tasting guidance, allergen notice (fish, peanuts, shrimp paste/seafood), and 3 verified Hanoi addresses (`14 Phố Chả Cá`, `6B Đường Thành`, `120K1 Giảng Võ`).

---

## 13. Mobile Focal Point Implementation

- Replaced hardcoded inline `objectPosition: asset.focalPointDesktop` in `HanoiTaste3D.jsx` with CSS custom properties `--focal-desktop` and `--focal-mobile`.
- Wired `.pho-photo-img` in `HanoiTaste3D.css` to use `var(--focal-desktop, 50% 50%)` on desktop and `var(--focal-mobile, var(--focal-desktop, 50% 50%))` under `@media (max-width: 768px)`.

---

## 14. Image Loading Improvements

- Added `IntersectionObserver` (`rootMargin: '900px 0px'`) and `eagerFirstAct` prop to `CulinaryChapterSection`:
  - Chapter 01 (Phở) keeps `eagerFirstAct={true}` for Act 01.
  - Chapters 02 (Bún Chả) & 03 (Chả Cá) use `eagerFirstAct={false}` so they stay `loading="lazy"` on initial route load and do not compete with Screen 1 Hero.
  - Once the user approaches within `900px`, Act 01 + lookahead Act (`activeActIndex + 1`) transition to eager and invoke bounded `img.decode()` to avoid blank frames during fast scroll.

---

## 15. Performance Observations (Measured Disk Facts)

- **Screen 4 Disk Footprint:**
  - Phở V1: 10 WebP files = 1,516.5 KB (1.48 MB)
  - Bún Chả V2: 10 WebP files = 1,474.0 KB (1.44 MB)
  - Chả Cá V3: 10 WebP files = 1,371.9 KB (1.34 MB)
  - **Combined Screen 4 (30 WebP files):** 4,362.4 KB (4.26 MB) on disk (~2.93 MB desktop transfer across all 15 acts; ~1.43 MB mobile transfer across all 15 acts).
- **Pinned ScrollTriggers on `/destinations/ha-noi`:** 8 total across the page (3 inside Screen 4).
- **Runtime Metrics (Long Tasks / Memory / Network Transfer):** Not measured in live Chrome because Chrome remote debugging was unavailable (see Section 16).

---

## 16. Browser Screenshots & Live Browser QA Status

- **Status:** **BLOCKED BY LOCAL CHROME DEVTOOLS CONNECTION.**
- Local Vite preview server (`http://localhost:4173/destinations/ha-noi`) was started and the browser QA subagent attempted connection, returning:
  `Could not find DevToolsActivePort for chrome at C:\Users\DUNG\AppData\Local\Google\Chrome\User Data\DevToolsActivePort (ENOENT)`.
- **Action Needed for Live Visual Screenshots:** Enable Chrome remote debugging (`chrome://inspect/#remote-debugging`) or open `npm run preview` locally in Chrome to visually verify the 12 desktop/mobile/reduced-motion checkpoints and capture screenshots.

---

## 17. Regression Results

- **Static & Build Verification:** PASS. Phở V1 (`phoAssets.js`, `PhoDetailModal.jsx`), Bún Chả V2 (`bunChaAssets.js`, `bunChaScenes.js`, `BunChaDetailModal.jsx`), Screen 1–3, Screen 5 (`HanoiSeasons3D`), and `TripBuilderContext.jsx` / `TripBuilderMorph.jsx` were not modified.
- **Interactive Runtime Regression:** Pending live browser session once Chrome DevTools is enabled.

---

## 18. Build Results

- Command: `npm run build` (`vite build`, Vite v6.4.6)
- Result: **PASS** (Exit code `0`, `✓ 1752 modules transformed`, built in `9.83s`).
- Verified all 10 Chả Cá WebP files copied into `dist/assets/destinations/hanoi/cha-ca/`.

---

## 19. Remaining Technical Debt

- `PhoDetailModal.jsx` and `BunChaDetailModal.jsx` still lack `Tab`/`Shift+Tab` focus trap and global Lenis pause/resume (preserved untouched per V3 scope).
- Unused `.pho-progress-hud` CSS (~80 lines) remains in `HanoiTaste3D.css` (preserved untouched per V3 scope).
- Permanent `will-change: transform` on `.pho-photo-img` across 15 slides was left unchanged until runtime mobile profiling indicates memory pressure.

---

## 20. Unresolved Asset / Content Issues

- None for photography or copy: all 5 Chả Cá photographs are authentic, visually inspected, license-verified, and stored locally as Desktop + Mobile WebP.
- Live browser visual QA screenshots remain pending Chrome remote debugging availability.

---

## 21. Confirmation: `deploy.ps1` and `rollback.ps1` Untouched

Confirmed via `git diff --stat`: neither `deploy.ps1` nor `rollback.ps1` was edited, overwritten, or reverted during V3 implementation.

---

## 22. Confirmation: NO DEPLOYMENT

Confirmed: **NO DEPLOYMENT** (`deploy.ps1` or `rollback.ps1`) was executed.
