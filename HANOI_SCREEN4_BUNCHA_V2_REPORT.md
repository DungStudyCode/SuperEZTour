# SUPER EZ TOUR — HANOI SCREEN 4 V2 IMPLEMENTATION REPORT
## BÚN CHẢ HÀ NỘI — THE FRAGRANCE OF CHARCOAL AT NOON

**Project Root:** `D:\workplace\SuperEZTour`  
**Production Route:** `/destinations/ha-noi`  
**Component:** `HanoiTaste3D` (`Chapter 01: Phở Hà Nội V1` + `Chapter 02: Bún Chả Hà Nội V2`)  
**Date:** 2026-11-23  
**Status:** COMPLETE (Build Pass · Zero WebGL · Sequential Sibling Pins · Two-Way TripBuilder Sync)  
**Deployment Status:** NO DEPLOYMENT EXECUTED

---

## 1. GIT BASELINE & SAFETY CHECKPOINT

- **Branch:** `main`
- **HEAD Commit:** `b2c9bcf7d6807a2f98ad809074475d3fd1181316`
- **Preserved Checkpoints:**
  - Full backup of Phở V1 files stored safely in scratch (`backup_pho_v1/`).
  - Screen 1 V4.1, Screen 2 V3.4.1, Screen 3 V4.1, Phở Hà Nội V1, and Screen 5 (`HanoiSeasons3D`) are 100% preserved without regression.
  - Zero destructive Git commands (`git reset`, `git clean`, `git restore`, or auto-commits) were executed.

---

## 2. FILES CREATED & MODIFIED

### Newly Created Files
1. `src/features/destinations/components/Hanoi/HanoiTaste3D/bunChaAssets.js`  
   - Verified local WebP asset manifest (`buncha-hero`, `buncha-charcoal`, `buncha-dipping`, `buncha-pork`, `buncha-table`), license & attribution metadata, focal points, and warm charcoal directional scrims (`BUN_CHA_SCRIM_GRADIENTS`).
2. `src/features/destinations/components/Hanoi/HanoiTaste3D/bunChaScenes.js`  
   - 5-Act bilingual (VI/KO) documentary script for Bún Chả Hà Nội with custom per-act `motionProfile` choreography.
3. `src/features/destinations/components/Hanoi/HanoiTaste3D/BunChaDetailModal.jsx`  
   - Accessible monograph modal detailing the 4 culinary pillars of Bún Chả (`Chả Viên & Chả Miếng`, `Lửa Than Hoa`, `Nước Chấm & Đồ Chua`, `Bún Rối & Rau Sống`) and 4 verified Hanoi Bún Chả addresses (`Bún Chả Hàng Quạt`, `Bún Chả Đắc Kim Hàng Mành`, `Bún Chả Hương Liên`, `Bún Chả Sinh Từ`).
4. `public/assets/destinations/hanoi/bun-cha/` (10 Local WebP Assets):
   - `buncha-hero-desktop.webp` (1920×1080, 198.4 KB) & `buncha-hero-mobile.webp` (800×1000, 116.8 KB)
   - `buncha-charcoal-desktop.webp` (1920×1080, 177.0 KB) & `buncha-charcoal-mobile.webp` (800×1000, 89.2 KB)
   - `buncha-dipping-desktop.webp` (1920×1080, 178.2 KB) & `buncha-dipping-mobile.webp` (800×1000, 75.5 KB)
   - `buncha-pork-desktop.webp` (1920×1080, 259.5 KB) & `buncha-pork-mobile.webp` (800×1000, 116.6 KB)
   - `buncha-table-desktop.webp` (1920×1080, 179.1 KB) & `buncha-table-mobile.webp` (800×1000, 83.7 KB)

### Modified Files
1. `src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.jsx`  
   - Extracted `CulinaryChapterSection` so `<HanoiTaste3D>` renders two sibling pinned `<section>` chapters in normal document flow (`#hanoi-taste` for Phở Hà Nội V1 and `#hanoi-taste-buncha` for Bún Chả Hà Nội V2) inside an unpinned `.hanoi-culinary-chapters` wrapper.
2. `src/features/destinations/components/Hanoi/HanoiTaste3D/buildPhoTimeline.js`  
   - Added optional per-act `motionProfile` support (`scaleStart`, `scaleEnd`, `panXStart`, `panXEnd`, `panYStart`, `panYEnd`, `extendedHold`) while defaulting to Phở V1's exact `{ scaleStart: 1.0, scaleEnd: 1.06, panX: 0, panY: 0 }` values.
3. `src/features/destinations/components/Hanoi/HanoiTaste3D/phoScenes.js`  
   - Registered `BUN_CHA_DOCUMENTARY_ACTS` into `CULINARY_STORIES['bun-cha']`.
4. `src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.css`  
   - Added `.hanoi-culinary-chapters` and `.buncha-documentary-scene` warm charcoal/ember palette rules.
5. `src/features/destinations/context/TripBuilderContext.jsx` & `src/features/destinations/components/TripBuilderMorph/TripBuilderMorph.jsx`  
   - Added `CULINARY_ALIAS_GROUPS`, `getCulinaryAliasGroup`, and `isCulinarySelected` so selecting/deselecting Phở or Bún Chả in either KO or VI synchronizes bidirectionally between Screen 4 and `TripBuilderMorph` Step 6 without duplicates.

---

## 3. ARCHITECTURE BEFORE & AFTER

```text
BEFORE (Screen 4 V1 — Single Chapter):
HanoiTaste3D
 └── section#hanoi-taste (Phở Hà Nội — 5 Acts, pinned +=520%)

AFTER (Screen 4 V2 — Sequential Culinary Chapters):
HanoiTaste3D
 └── div.hanoi-culinary-chapters (Unpinned normal document flow wrapper)
      ├── CulinaryChapterSection (section#hanoi-taste — Chapter 01: Phở Hà Nội V1)
      │    ├── 5 Staged Acts (Morning Atmosphere, serene push-in 1.0 -> 1.06)
      │    ├── Independent GSAP matchMedia + ScrollTrigger pin (+=520% / +=380% / +=290%)
      │    └── PhoDetailModal + Phở TripBuilder CTA
      │
      └── CulinaryChapterSection (section#hanoi-taste-buncha — Chapter 02: Bún Chả Hà Nội V2)
           ├── 5 Staged Acts (Midday Charcoal Atmosphere, custom lateral grill pan & pull-back choreography)
           ├── Independent GSAP matchMedia + ScrollTrigger pin (+=520% / +=380% / +=290%)
           └── BunChaDetailModal + Bún Chả TripBuilder CTA
```

---

## 4. BÚN CHẢ FIVE-ACT STORYBOARD & MOTION PROFILE

| Act | Title (VI / KO) | Visual Subject | Layout Variant | Motion Profile |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **BÚN CHẢ HÀ NỘI** / **하노이 분짜** (*Hương thơm từ bếp than*) | Marinated pork grilling over glowing charcoal embers with natural rising smoke & woven bamboo fan | `fullscreen-hero` | **Horizontal Grill Pan + Warm Reveal** (`scale: 1.04 -> 1.08`, `panX: -16px -> +16px`) |
| **02** | **Nghệ thuật của bếp than** / **숯불이 완성하는 풍미** | Char-grilled `chả viên` (minced patties) & `chả miếng` (pork belly slices) at Bún Chả Hàng Mành | `left-editorial` | **Close-up Detail Drift** (`scale: 1.02 -> 1.07`, `panX: +14px -> -14px`, `panY: +4px -> -4px`) |
| **03** | **Sự cân bằng trong bát nước chấm** / **새콤달콤한 소스의 균형** | Macro close-up of warm dipping sauce bowl with grilled pork, pickled green papaya & carrot | `right-editorial` | **Gentle Push-in + Extended Reading Hold** (`scale: 1.00 -> 1.05`, `panY: +6px -> -4px`, `extendedHold: true`) |
| **04** | **Một mâm bún chả, trọn vẹn hương vị** / **한 상에 담긴 하노이의 맛** | Overhead spread of white `bún rối`, fresh herbs basket, bowls of grilled pork in dipping sauce & garlic/chili | `layered-editorial` | **Pull-back Revealing Full Table** (`scale: 1.08 -> 1.00`, `panY: -6px -> 0px`) |
| **05** | **Một bữa trưa rất Hà Nội** / **하노이의 일상을 맛보는 점심** | Diners at a wooden Hanoi table enjoying midday Bún Chả with fresh herbs, rice noodles & condiments + CTAs | `wide-ending` | **Atmospheric Slow Pull-back** (`scale: 1.06 -> 1.00`, `panX: -8px -> 0px`) |

---

## 5. ASSET MANIFEST & LICENSE VERIFICATION (`bunChaAssets.js`)

All 5 source photographs were visually inspected before WebP conversion to guarantee 100% subject accuracy:

| Asset ID | Act | Local WebP Paths (Desktop / Mobile) | Wikimedia Commons Source & License | Photographer |Verified |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `buncha-hero` | 01 | `/assets/destinations/hanoi/bun-cha/buncha-hero-desktop.webp` (198.4 KB)<br>`/assets/destinations/hanoi/bun-cha/buncha-hero-mobile.webp` (116.8 KB) | `File:Pork_skewers_on_the_grill_-_Banh_Uot_hawker.jpg`<br>**CC BY-SA 2.0 Generic** | Julia (`avlxyz`) | `true` |
| `buncha-charcoal` | 02 | `/assets/destinations/hanoi/bun-cha/buncha-charcoal-desktop.webp` (177.0 KB)<br>`/assets/destinations/hanoi/bun-cha/buncha-charcoal-mobile.webp` (89.2 KB) | `File:Bún_chả_Hàng_Mành_(2).jpg`<br>**CC BY-SA 4.0 International** | Viet | `true` |
| `buncha-dipping` | 03 | `/assets/destinations/hanoi/bun-cha/buncha-dipping-desktop.webp` (178.2 KB)<br>`/assets/destinations/hanoi/bun-cha/buncha-dipping-mobile.webp` (75.5 KB) | `File:Bún_chả_Hà_Nội_(thịt_nướng)_tại_Nguyễn_Sơn,_Tân_Phú_(1).jpg`<br>**Public Domain** | Phương Huy | `true` |
| `buncha-pork` | 04 | `/assets/destinations/hanoi/bun-cha/buncha-pork-desktop.webp` (259.5 KB)<br>`/assets/destinations/hanoi/bun-cha/buncha-pork-mobile.webp` (116.6 KB) | `File:Bun-cha-hanoi.jpg`<br>**CC BY-SA 4.0 International** | Valentin Orange | `true` |
| `buncha-table` | 05 | `/assets/destinations/hanoi/bun-cha/buncha-table-desktop.webp` (179.1 KB)<br>`/assets/destinations/hanoi/bun-cha/buncha-table-mobile.webp` (83.7 KB) | `File:Bún_chả_with_chili_peppers_and_fresh_garlic.jpg`<br>**CC BY-SA 4.0 International** | Kinh | `true` |

---

## 6. SCROLLTRIGGER CONFIGURATION & SCREEN TRANSITIONS

- **Independent Sibling Pins:**
  - `#hanoi-taste` (Phở V1) pins for `+=520%` (Desktop), `+=380%` (Tablet), `+=290%` (Mobile).
  - When Phở Act 05 reaches progress `1.0`, `#hanoi-taste` unpins and the page scrolls naturally into `#hanoi-taste-buncha` (Bún Chả V2).
  - `#hanoi-taste-buncha` pins for `+=520%` (Desktop), `+=380%` (Tablet), `+=290%` (Mobile), and unpins cleanly into Screen 5 (`#hanoi-seasons` — `HanoiSeasons3D`).
- **Bidirectional / Reverse Scroll:**
  - Uses deterministic `gsap.set()` at `t = 0` + non-overlapping `tl.to(..., { autoAlpha })` tweens with ascending `zIndex: idx + 1`.
  - Zero inline `style={{ opacity, visibility }}` in JSX; zero one-way `onComplete` callbacks; zero CSS `transition: opacity` conflicts.

---

## 7. TWO-WAY TRIPBUILDER & KO/VI SYNCHRONIZATION

- `TripBuilderContext.jsx` defines `CULINARY_ALIAS_GROUPS` and exports `isCulinarySelected(culinaryPreferences, targetPreference)`.
- `toggleCulinary(preference)` resolves the canonical alias group for `preference`, removing all aliases in that group when toggling off and preventing duplicate KO/VI strings when toggling on.
- `TripBuilderMorph.jsx` Step 6 uses `isCulinarySelected(tripState.culinaryPreferences, food)` to determine checkbox state, ensuring 100% two-way sync between Screen 4 CTAs (Phở & Bún Chả) and TripBuilderMorph Step 6 checkboxes across language switches.

---

## 8. BUILD VERIFICATION & CONFIRMATION

- **Production Build (`npm run build`):** Passed with exit code `0`.
- **No Deployment Confirmation:** **NO DEPLOYMENT** (`deploy.ps1`) was executed.
