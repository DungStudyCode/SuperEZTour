# SUPER EZ TOUR — HANOI SCREEN 6 V1 REPORT
## INTERACTIVE TRAVEL ATLAS (`Interactive3DMap` — Option B Configuration-Driven)

- **Date:** `2026-11-25`
- **Project Root:** `D:\workplace\SuperEZTour`
- **Production Route:** `/destinations/ha-noi` (`section#attractions`)
- **Shared Target Component:** `src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx`
- **Architecture:** Option B — Configuration-Driven Shared Component (`presentation.layoutVariant: 'travel-atlas'` for Hanoi; legacy 3D defaults preserved 1:1 for Da Nang)
- **Production Build Status:** **PASS** (`npm run build`, exit code `0`, `1,758` modules transformed in `7.38s`)
- **Live Browser QA Status:** **BLOCKED** (Host Chrome `DevToolsActivePort` unavailable — `PermissionDenied` / `ENOENT`)
- **Deployment Status:** **NO DEPLOYMENT EXECUTED**

---

## 1. Executive Summary

- **Objective:** Upgrade Hanoi Screen 6 (`#attractions`) from a GIS-style 3D satellite dashboard with mismatched photography, broken KO/VI switching, Da Nang DEM text leakage, colliding marker labels, `3 / 8` ghost Da Nang selections, and a `0.42`-delayed right panel into a cohesive **Interactive Travel Atlas** (`Khám phá Hà Nội` / `하노이를 발견하다`) while preserving 100% of Da Nang's existing 3D terrain experience.
- **Outcome:** Implemented all 15 approved scope items cleanly using **one shared `Interactive3DMap` component** and **zero changes** to `HanoiExperiencePage.jsx`, `DestinationPage.jsx`, `da-nang.config.js`, or any protected Screen 1–5 / 7–11 files.
- **Runtime Verification & Remaining Blockers:** Static build (`vite build`), `dist/` asset output, `git diff --check`, and direct visual inspection of all 8 Wikimedia Commons WebP pairs **PASS**. Live interactive browser verification (`BLOCKED` by missing host Chrome `DevToolsActivePort`) and commercial map-tile provider licensing review (`NEEDS_PROVIDER_REVIEW` for Esri World Imagery) remain open before production deployment.

---

## 2. Git Baseline

- **Branch:** `main`
- **HEAD Commit:** `032b248da0e22767b344a9ca03314600a7c4bcc6`
- **Initial Working Tree (`git status --short`):** Clean (`0` modified, `0` staged, `0` untracked, `0` deleted files).
- **Protected Files Preserved Untouched:** `deploy.ps1`, `rollback.ps1`, `README.md`, `DEPLOYMENT.md`, `LOCALIZATION_GUIDELINES.md`, `HANOI_SCREEN4_CHACA_V3_REPORT.md`, `HANOI_SCREEN5_SEASONS_V1_1_REPORT.md`, `HANOI_SCREEN6_SHARED_MAP_SOURCE_AUDIT.md`, `package.json`, `da-nang.config.js`, `DestinationPage.jsx`, `HanoiExperiencePage.jsx`, `LenisManager.js`, `LanguageContext.jsx`, `destinationNav.config.js`, and all Screen 1–5 / 7–11 components.

---

## 3. Shared Component Architecture

- **Single Shared Component:** `src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx`
  - **Subcomponents:**
    - `components/AttractionFilters.jsx` — Data-driven category filter pills (`aria-pressed`).
    - `components/AttractionDetailPanel.jsx` — Editorial landmark card with responsive `<picture>` (`1200×800` desktop / `800×600` mobile), `onError` neutral placeholder, open-license attribution, unclamped description, visit duration, highlights, 3-state CTA, and Previous/Next navigation.
- **Public Props Contract Preserved:** `<Interactive3DMap attractionsData={destination.attractions} />` — zero parent edits required.
- **Configuration Schema (`attractionsData`):**
  - `overviewCamera`: `{ center, zoom, pitch, bearing, fitBounds, fitBoundsPadding, maxFitZoom }`
  - `terrain`: `{ enabled, exaggeration }` *(defaults to `{ enabled: true, exaggeration: 1.42 }` for Da Nang; `{ enabled: false, exaggeration: 0 }` for Hanoi)*
  - `presentation`: `{ layoutVariant }` *(`'legacy-3d'` default; `'travel-atlas'` for Hanoi)*
  - `features`: `{ pinSection, showElevation, showLiveBadge, showAmbientGrid, showFilters, showPreviousNext, showSelectionSummary, showDuration, showPhotoAttribution, enableStyleSwitching, markerVariant, cooperativeGestures, lazyInit }`
  - `defaultSelectedAttractions`: `[]` on Hanoi

---

## 4. Modified and Created Files

| File Path | Action | Summary & Impact |
| :--- | :---: | :--- |
| `src/features/destinations/data/hanoiAttractionAssets.js` | **Created** | Verified Wikimedia Commons WebP manifest + license metadata + focal points for all 8 Hanoi landmarks. |
| `public/assets/destinations/hanoi/attractions/*.webp` | **Created (16 files)** | 8 desktop (`1200×800`) + 8 mobile (`800×600`) optimized WebP photographs (`1,397.5 KB` / `1.36 MB` total). |
| `src/features/destinations/data/ha-noi.config.js` | **Modified** | Updated `attractions` with 8 verified Hanoi landmarks, KO/VI copy, `categoryIds`, durations, experiences, `terrain: { enabled: false }`, gentle `pitch: 28°`, `travel-atlas` features, refined Văn Miếu coord (`[105.8355, 21.0278]`), and exported `getLocalizedHaNoiConfig(language)`. |
| `src/features/destinations/data/destinations.config.js` | **Modified** | Wired `getLocalizedHaNoiConfig(language)` for `'ha-noi'`, `'hanoi'`, and `'vietnam-hanoi'`. |
| `src/features/destinations/context/TripBuilderContext.jsx` | **Modified** | Minimal initialization fix: Hanoi starts with `selectedAttractions: []` (no 3 ghost Da Nang IDs) and preserves selections across KO ↔ VI toggles; Da Nang keeps its exact defaults. |
| `src/features/destinations/components/Interactive3DMap/components/AttractionFilters.jsx` | **Created** | Accessible data-driven category filter bar. |
| `src/features/destinations/components/Interactive3DMap/components/AttractionDetailPanel.jsx` | **Created** | Editorial detail panel with `<picture>`, attribution, duration, highlights, CTA, and Prev/Next controls. |
| `src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx` | **Modified** | Configuration-driven shared map engine, lazy `IntersectionObserver`, `ResizeObserver`, `cooperativeGestures`, `NavigationControl`, 3-state `<button>` numbered markers, scoped selection counter, WebGL/error fallback, reduced-motion `jumpTo`, and unpinned entrance for `travel-atlas`. |
| `src/features/destinations/components/Interactive3DMap/Interactive3DMap.css` | **Modified** | Fixed `.panel-content-body`/`.panel-title` responsive typo and appended scoped `.is-travel-atlas` editorial styles (`#101A20` / `#17242B` / `#C5A675` / `#D58C48` / `#819879`), preserving 100% of Da Nang's styles. |
| `HANOI_SCREEN6_ATLAS_V1_REPORT.md` | **Created** | This V1 implementation report. |

---

## 5. Visual Design Summary

- **Palette (`.is-travel-atlas` only):** Section `#101A20` (blending `#080F1C` from Screen 5 Winter → `#172026` into Screen 7 `HanoiYourStory`), Panel `#17242B`, Text `#F3EEE5` / `#AAB5B8`, Gold `#C5A675`, Active `#D58C48`, Selected `#819879`, Border `rgba(255,255,255,0.10)`.
- **Removed from Hanoi:** Ambient coordinate grid, `REAL 3D TERRAIN & SATELLITE` badge, elevation labels (`14m–18m`), Da Nang DEM disclaimer, heavy glassmorphism, `line-clamp` truncation, and the `+=200%` pin that delayed the right panel until `0.42` scroll progress.
- **Responsive:** Desktop `1.62fr 1fr` (~62% map / ~38% panel); Tablet (`<=992px`) horizontal-scrollable filter pills + `380px` map + stacked inline panel; Mobile (`<=768px`) `340px` map + `44px` touch targets + inline editorial detail panel + selection summary chips.

---

## 6. Hanoi Attraction Data Matrix

| # | Stable ID | VI Name | KO Name | Categories (`categoryIds`) | Coordinates `[lng, lat]` | Duration (VI / KO) | Desktop / Mobile WebP |
| :---: | :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| **01** | `hoan-kiem-lake` | Hồ Hoàn Kiếm & Đền Ngọc Sơn | 호안끼엠 호수 & 응옥선 사당 | `heritage`, `culture`, `nature` | `[105.8525, 21.0285]` | 45–90 phút / 45–90분 | `/assets/destinations/hanoi/attractions/hoan-kiem-lake-{desktop,mobile}.webp` |
| **02** | `old-quarter` | Phố cổ Hà Nội | 하노이 구시가지 | `culture`, `architecture`, `experience` | `[105.8510, 21.0345]` | 90–150 phút / 90–150분 | `/assets/destinations/hanoi/attractions/old-quarter-{desktop,mobile}.webp` |
| **03** | `van-mieu` | Văn Miếu – Quốc Tử Giám | 문묘 – 국자감 | `heritage`, `culture`, `architecture` | `[105.8355, 21.0278]` | 45–90 phút / 45–90분 | `/assets/destinations/hanoi/attractions/van-mieu-{desktop,mobile}.webp` |
| **04** | `thang-long-citadel` | Hoàng thành Thăng Long | 탕롱 황성 | `heritage`, `culture` | `[105.8406, 21.0342]` | 90–120 phút / 90–120분 | `/assets/destinations/hanoi/attractions/thang-long-citadel-{desktop,mobile}.webp` |
| **05** | `st-joseph-cathedral` | Nhà thờ Lớn Hà Nội | 하노이 성 요셉 대성당 | `architecture`, `culture` | `[105.8494, 21.0288]` | 30–45 phút / 30–45분 | `/assets/destinations/hanoi/attractions/st-joseph-cathedral-{desktop,mobile}.webp` |
| **06** | `opera-house` | Nhà hát Lớn Hà Nội | 하노이 오페라 하우스 | `architecture`, `culture` | `[105.8576, 21.0245]` | 20–45 phút (bên ngoài) / 20–45분 (외관) | `/assets/destinations/hanoi/attractions/opera-house-{desktop,mobile}.webp` |
| **07** | `tran-quoc-pagoda` | Chùa Trấn Quốc & Hồ Tây | 진국사 & 서호 | `heritage`, `culture`, `nature` | `[105.8369, 21.0478]` | 45–90 phút / 45–90분 | `/assets/destinations/hanoi/attractions/tran-quoc-pagoda-{desktop,mobile}.webp` |
| **08** | `bat-trang-village` | Làng gốm Bát Tràng | 바트랑 도자기 마을 | `culture`, `experience` | `[105.9125, 20.9790]` | 120–180 phút / 120–180분 | `/assets/destinations/hanoi/attractions/bat-trang-village-{desktop,mobile}.webp` |

---

## 7. Photography & Licensing Verification

All 8 wrong Unsplash URLs were removed and replaced with Wikimedia Commons photographs visually verified at thumbnail and final WebP stages (`1200×800` desktop, `800×600` mobile):

| Attraction | Visual Subject | Wikimedia Commons Source | Photographer | License | Desktop KB | Mobile KB | Verified |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **01. Hồ Hoàn Kiếm** | Red Thê Húc Bridge & Ngọc Sơn Temple gate over Hoàn Kiếm Lake | [File:Thê Húc Bridge to Ngọc Sơn Temple 10-03-2025.jpg](https://commons.wikimedia.org/wiki/File:Th%C3%AA_H%C3%BAc_Bridge_to_Ng%E1%BB%8Dc_S%C6%A1n_Temple_10-03-2025.jpg) | JakobHosp | CC BY 4.0 | `109.1` | `65.0` | `true` |
| **02. Phố cổ Hà Nội** | Hanoi Old Quarter street with trees, balconies & flower bicycle | [File:2024-11-03 Hanoi's Old Quarter 5.jpg](https://commons.wikimedia.org/wiki/File:2024-11-03_Hanoi's_Old_Quarter_5.jpg) | Alexkom000 | CC BY 4.0 | `110.6` | `65.7` | `true` |
| **03. Văn Miếu** | Khuê Văn Các two-tier red pavilion framed by ancient trees | [File:Constellation of Literature pavilion (Temple of Literature, Hanoi).jpg](https://commons.wikimedia.org/wiki/File:Constellation_of_Literature_pavilion_(Temple_of_Literature,_Hanoi).jpg) | Christophe95 | CC BY-SA 4.0 | `108.3` | `65.3` | `true` |
| **04. Hoàng thành Thăng Long** | Đoan Môn triple-arch stone gate & upper golden pavilion | [File:Central Sector of the Imperial Citadel of Thang Long - Hanoi.jpg](https://commons.wikimedia.org/wiki/File:Central_Sector_of_the_Imperial_Citadel_of_Thang_Long_-_Hanoi.jpg) | katiebordner | CC BY 2.0 | `109.8` | `64.7` | `true` |
| **05. Nhà thờ Lớn** | Twin Neo-Gothic bell towers & rose window facade | [File:St. Joseph's Cathedral Hanoi 2.jpg](https://commons.wikimedia.org/wiki/File:St._Joseph's_Cathedral_Hanoi_2.jpg) | Christophe95 | CC BY-SA 4.0 | `110.3` | `65.0` | `true` |
| **06. Nhà hát Lớn** | Neo-Classical French columns, yellow facade & Vietnamese flag | [File:Hanoi Opera House, 24 December 2016.jpg](https://commons.wikimedia.org/wiki/File:Hanoi_Opera_House,_24_December_2016.jpg) | xiquinhosilva | CC BY 2.0 | `109.5` | `65.7` | `true` |
| **07. Chùa Trấn Quốc** | 11-tier terracotta stupa & temple gate beside West Lake | [File:Tran Quoc Pagoda, Hanoi, Vietnam, 20240123 1212 3307.jpg](https://commons.wikimedia.org/wiki/File:Tran_Quoc_Pagoda,_Hanoi,_Vietnam,_20240123_1212_3307.jpg) | Jakub Hałun | CC BY 4.0 | `108.3` | `64.8` | `true` |
| **08. Bát Tràng** | Craftsman pushing bicycle cart loaded with Bát Tràng ceramic vases | [File:Bat-Trang-Ceramic-Village16.jpg](https://commons.wikimedia.org/wiki/File:Bat-Trang-Ceramic-Village16.jpg) | Steven C. Price | CC BY-SA 4.0 | `111.2` | `64.2` | `true` |
| **Total (16 WebP files)** | **All 8 Hanoi attractions (Desktop + Mobile)** | — | — | **100% Open License** | **877.1 KB** | **520.4 KB** | **1,397.5 KB (1.36 MB)** |

---

## 8. MapLibre Engine & Provider Status

- **Terrain & Camera:** `terrain.enabled: false` on Hanoi (no `'terrain-dem'` requests); `fitBounds` over all 8 attractions (`maxZoom: 12.6`, `pitch: 28°`, `bearing: 0°`) ensures both central landmarks and Bát Tràng / Chùa Trấn Quốc fit cleanly in overview.
- **Markers & Collision:** Numbered `<button type="button">` markers (`01`–`08`) with Default, Selected (`#819879` + `✓` badge), and Active (`#D58C48` + ring + floating name tooltip) states, plus Previous/Next controls and selection chips so overlapping central markers remain 100% reachable via keyboard and UI controls without falsifying coordinates.
- **Map Provider & Commercial Licensing Status:** **`NEEDS_PROVIDER_REVIEW`** — Esri World Imagery (`server.arcgisonline.com`) remains unchanged per V1 scope; Street/Satellite switching remains **`DEFERRED`**. Commercial ArcGIS Online ToS / API key review is required before production deployment.

---

## 9. TripBuilder Integration

- **Initial State:** Hanoi mounts with `selectedAttractions: []` (`0/8 địa điểm đã chọn` / `0/8 개 명소 선택됨`), eliminating the `3 / 8` Da Nang ghost selection bug.
- **Preservation & Sync:** Switching KO ↔ VI preserves `selectedAttractions` (stable ASCII IDs such as `van-mieu`, `hoan-kiem-lake`), Screen 3 `HanoiHeritageChamber` (`van-mieu`) syncs bidirectionally, and `selectedInAtlasCount` intersects `tripState.selectedAttractions` with the current Atlas IDs so Screen 2 (`hang-bac`, etc.) never inflates the Atlas counter.

---

## 10. KO/VI Localization

- Added `getLocalizedHaNoiConfig(language)` in `ha-noi.config.js` and wired it into `destinations.config.js` for `'ha-noi'`, `'hanoi'`, and `'vietnam-hanoi'`.
- Added `useLanguage()` to `Interactive3DMap.jsx`, `AttractionFilters.jsx`, and `AttractionDetailPanel.jsx` so every heading, subtitle, category, landmark name, description, duration, highlight, tooltip, button, counter, empty/loading/error state, attribution prefix, and disclaimer switches cleanly without remounting MapLibre.

---

## 11. Scroll, Lenis & Performance

- Removed `pin: true` and `+=200%` for `pinSection: false` (`travel-atlas`), replacing it with a non-pinned entrance where header, map, and detail panel appear together.
- Enabled `cooperativeGestures: true` + `NavigationControl` (`showZoom: true`) on Hanoi so Lenis wheel/touch page scrolling is never trapped over the map.
- Enabled `IntersectionObserver` (`rootMargin: '800px 0px'`) lazy MapLibre initialization + `ResizeObserver` + full cleanup (`disconnect()`, marker removal, `map.remove()`, `mm.revert()`).

---

## 12–14. QA Results, Da Nang Regression & Screenshots

| Verification Area | Status | Details |
| :--- | :---: | :--- |
| **Production Build (`npm run build`)** | **PASS** | Exit code `0`, `✓ 1758 modules transformed`, built in `7.38s`; all 16 WebPs verified in `dist/assets/destinations/hanoi/attractions/`. |
| **Static Asset & License Verification** | **PASS** | All 8 Wikimedia Commons originals + 8 final desktop WebPs directly inspected visually via `read_file`; `1.36 MB` total (< `2 MB`). |
| **Git Hygiene (`git diff --check`)** | **PASS** | Exit code `0`; zero whitespace errors; zero protected files modified. |
| **Live Browser Functional QA (Hanoi)** | **BLOCKED** | Host Chrome `DevToolsActivePort` unavailable (`PermissionDenied` / `ENOENT`). Manual browser verification needed with `npm run preview` + Chrome. |
| **Da Nang Regression (`/destinations/da-nang`)** | **NOT TESTED** *(Code-Verified Preserved)* | `da-nang.config.js` untouched; all legacy `Interactive3DMap` defaults (`OVERVIEW_CAMERA`, `terrain: 1.42`, `pinSection: true`, `showElevation: true`, `showLiveBadge: true`, legacy markers, legacy CSS) preserved intact; live browser regression pending Chrome availability. |
| **Street/Satellite Switching** | **DEFERRED** | Deferred out of V1 scope pending commercial tile provider review. |
| **Map Tile Licensing** | **NEEDS_PROVIDER_REVIEW** | Esri World Imagery (`server.arcgisonline.com`) commercial ToS review required before deployment. |
| **Live Browser Screenshots** | **NONE CAPTURED** | Zero fake screenshots created (`DevToolsActivePort` blocker). |

---

## 15. Known Limitations

1. Live browser runtime QA, FPS/memory profiling, and Da Nang visual regression screenshots are **`BLOCKED`** on this host until Chrome remote debugging (`--remote-debugging-port=9222`) is enabled.
2. Esri World Imagery (`server.arcgisonline.com`) commercial usage requires review (`NEEDS_PROVIDER_REVIEW`); Street/Satellite switching is **`DEFERRED`**.
3. MapLibre HTML DOM markers do not use WebGL symbol collision detection; overlapping central Hanoi markers are mitigated via compact numbered badges, active-only tooltips, `NavigationControl` zoom, category filters, and Previous/Next navigation without altering true coordinates.

---

## 16. Final Git Verification

- **Screen 6 V1 Modified Files (5):** `Interactive3DMap.jsx`, `Interactive3DMap.css`, `TripBuilderContext.jsx`, `destinations.config.js`, `ha-noi.config.js`.
- **Screen 6 V1 Created Files:** `AttractionFilters.jsx`, `AttractionDetailPanel.jsx`, `hanoiAttractionAssets.js`, `public/assets/destinations/hanoi/attractions/*.webp` (16 files), `HANOI_SCREEN6_ATLAS_V1_REPORT.md`.
- **Protected Files:** 100% untouched. Zero commits, zero pushes, zero dependency changes, zero deployments.
