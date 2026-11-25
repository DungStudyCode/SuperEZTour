# SUPER EZ TOUR — HANOI SCREEN 6 V1
## INTERACTIVE TRAVEL ATLAS — SHARED COMPONENT SOURCE AUDIT, IMPACT ANALYSIS & REPOSITORY CLEANUP

- **Project Root:** `D:\workplace\SuperEZTour`
- **Primary Target Route:** `/destinations/ha-noi`
- **Shared Target Component:** `Interactive3DMap` (`src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx`)
- **Audit Phase:** **READ-ONLY SOURCE AUDIT & OBSOLETE REPORT CLEANUP** (Zero source code edits · Zero asset downloads into repo · Zero commits · Zero deployment)
- **Audit Date:** `2026-11-25`

---

## 1. Executive Summary

`Interactive3DMap` is a **shared destination cartography component** mounted directly by **two active production parent trees**:
1. **`HanoiExperiencePage.jsx` (`Screen 06`)** on `/destinations/ha-noi` (and aliases `/destinations/hanoi`, `/destinations/vietnam-hanoi`).
2. **`DestinationPage.jsx` (`Scene 08`)** on `/destinations/da-nang` (and aliases `/destinations/danang`, `/destinations/vietnam-danang`), as well as any future destination published into `DESTINATION_REGISTRY`.

All 9 UI defects observed on the Hanoi route have been **100% traced to exact root causes in the source code**:

| Issue | Observed Symptom on `/destinations/ha-noi` | Verified Root Cause in Source |
| :--- | :--- | :--- |
| **Issue 01 — Incorrect Photography (Latte Art on Hoàn Kiếm — & ALL 8 Hanoi spots wrong!)** | Selecting `Hồ Hoàn Kiếm` displays coffee cups; other spots show wrong photos. | **CRITICAL FINDING:** Direct visual inspection of all 8 Unsplash URLs in `ha-noi.config.js` (`L454–590`) proved **0 out of 8 depict the actual Hanoi attraction**: `#01` = 3 latte art cups, `#02` = wooden world map wall, `#03` = Hội An lanterns, `#04` = Dutch still-life flower painting, `#05` = James Bond Island (Phang Nga, Thailand), `#06` = Mount Bromo volcano (Indonesia), `#07` = literal `"404"` hotel room door, `#08` = minimalist studio ceramic bottles! |
| **Issue 02 — Mixed / Broken KO–VI Language** | Navbar is set to `VI`, yet heading, markers, panel, counter, and reset button stay in Korean while CTA button is Vietnamese. | Three-part chain failure: (1) `destinations.config.js` (`L27–33`) calls `getLocalizedDaNangConfig(language)` for Da Nang, **but returns raw unlocalized `HA_NOI_CONFIG` (`locale: 'ko'`) for Hanoi** regardless of `language`; (2) `HA_NOI_CONFIG.attractions` (`L435–591`) has Korean strings in `title`, `name`, `category`, `slogan`, `description`, `tags`, `elevation`, `cartPrefix`, `cartSuffix`, `resetViewText` with **no `btnAdd`/`btnInCart` keys** (so CTA falls back to hardcoded Vietnamese in `Interactive3DMap.jsx` `L698/L703`); (3) `Interactive3DMap.jsx` never calls `useLanguage()`. |
| **Issue 03 — Da Nang Content Leakage** | Disclaimer below the Hanoi map explicitly says *"mô hình số độ cao (DEM) thực tế của Đà Nẵng"*. | `HA_NOI_CONFIG.attractions` omits `disclaimer`, causing `Interactive3DMap.jsx` (`L715`) to render its hardcoded Da Nang fallback string. |
| **Issue 04 — Marker Label Overlap** | Long Korean/Vietnamese place names + elevation pills collide across central Hanoi. | `Interactive3DMap.css` (`L284–314`) forces `.marker-floating-label` (`white-space: nowrap`, name + elevation) permanently visible on all 8 HTML DOM markers simultaneously. Six of Hanoi's 8 landmarks sit within a ~2 km cluster around Hoàn Kiếm / Ba Đình (`zoom: 12.6`, `pitch: 52°`). |
| **Issue 05 — Technical GIS Overload** | Markers and panel show `해발 15m`, `해발 16m`, `해발 18m` and `REAL 3D TERRAIN & SATELLITE` pulse badge. | `Interactive3DMap.jsx` (`L648–651`, `L361`, `L667–670`) unconditionally renders `.map-live-badge` (`REAL 3D TERRAIN & SATELLITE`) and `elevation` on both markers and detail panel — useful for Bà Nà Hills (`1,487m`) / Sơn Trà (`693m`) in Da Nang, but meaningless noise on Hanoi's flat `12m–18m` delta plain. |
| **Issue 06 — Truncated Description** | Attraction description cuts off mid-sentence with `...`. | `Interactive3DMap.css` (`L486`, `L603–607`, `L816–819`) locks `.map-editorial-panel` to `height: clamp(520px, 66vh, 620px)` (`360–440px` on `max-height: 850px`) and applies `-webkit-line-clamp: 3` (`2` on `<=850px` height) to `.panel-desc`. |
| **Issue 07 — Verbose / Unlocalized CTA** | CTA reads `Thêm tọa độ này vào chuyến đi` even in KO mode on Hanoi. | `HA_NOI_CONFIG.attractions` lacks `btnAdd` and `btnInCart`, falling back to `Interactive3DMap.jsx` (`L698–704`) hardcoded Vietnamese strings. |
| **Issue 08 — GIS Dashboard Visual Language** | Grid lines, neon green pulse dot, and dense pill badges feel like a GIS HUD. | `.map-ambient-grid` (`54px × 54px` coordinate grid), `.map-live-badge` (`#10B981` neon dot), and 4 competing pill styles on the panel create a technical dashboard aesthetic. |
| **Issue 09 — Delayed Right Panel & `3 / 8` Pre-Selected Da Nang IDs** | Right panel is invisible (`opacity: 0`) when map first appears; counter already says `3 / 8` on Hanoi! | (a) GSAP pinned timeline (`+=200%`, `Interactive3DMap.jsx` `L552–592`) holds `panelRef` at `opacity: 0, x: 40` from scroll progress `0.00` until `0.42` (~84vh of pinned scroll after map is already visible!); (b) **CRITICAL BUG:** `DEFAULT_TRIP_STATE.selectedAttractions` in `TripBuilderContext.jsx` (`L133`) hardcodes `['ba-na-hills', 'hoi-an-ancient-town', 'my-khe-beach']` for **ALL** destinations, so Hanoi starts with `tripState.selectedAttractions.length === 3` Da Nang IDs! |

---

## 2. Git Baseline (Before Audit & Cleanup)

Executed mandatory baseline checks in `D:\workplace\SuperEZTour`:
- **Current Branch:** `main`
- **Current HEAD:** `f00feae64b4db6bd69ce49e236b9490e2980fbb0`
- **Pre-Audit `git status --short`:**
  ```text
  D  HANOI_SCREEN2_SOURCE_AUDIT.md
  D  HANOI_SCREEN4_BUNCHA_V2_REPORT.md
  A  HANOI_SCREEN4_CHACA_SOURCE_AUDIT.md
  A  HANOI_SCREEN4_CHACA_V3_REPORT.md
  A  HANOI_SCREEN5_SEASONS_SOURCE_AUDIT.md
  A  HANOI_SCREEN5_SEASONS_V1_REPORT.md
  M  deploy.ps1
  A  public/assets/destinations/hanoi/cha-ca/{10 WebP files}
  AM public/assets/destinations/hanoi/seasons/{8 WebP files}
  M  rollback.ps1
  M  src/features/destinations/components/Hanoi/HanoiSeasons3D/HanoiSeasons3D.css
  M  src/features/destinations/components/Hanoi/HanoiSeasons3D/HanoiSeasons3D.jsx
  A  src/features/destinations/components/Hanoi/HanoiSeasons3D/buildSeasonsTimeline.js
  AM src/features/destinations/components/Hanoi/HanoiSeasons3D/seasonAssets.js
  AM src/features/destinations/components/Hanoi/HanoiSeasons3D/seasonScenes.js
  A  src/features/destinations/components/Hanoi/HanoiTaste3D/ChaCaDetailModal.jsx
  M  src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.css
  M  src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.jsx
  M  src/features/destinations/components/Hanoi/HanoiTaste3D/buildPhoTimeline.js
  A  src/features/destinations/components/Hanoi/HanoiTaste3D/chaCaAssets.js
  A  src/features/destinations/components/Hanoi/HanoiTaste3D/chaCaScenes.js
  M  src/features/destinations/components/Hanoi/HanoiTaste3D/phoScenes.js
  M  src/features/destinations/data/ha-noi.config.js
  ?? HANOI_SCREEN5_SEASONS_V1_1_REPORT.md
  ```
- **Protected Work Verified:**
  - `deploy.ps1` & `rollback.ps1`: UTF-8 with BOM PowerShell 5.1 compatibility fixes (untouched).
  - Screen 4 V3 (`HanoiTaste3D` Chả Cá Lã Vọng) & Screen 5 V1/V1.1 (`HanoiSeasons3D` Four Seasons): staged/unstaged work in progress (untouched).
  - Previously deleted `HANOI_SCREEN2_SOURCE_AUDIT.md` and `HANOI_SCREEN4_BUNCHA_V2_REPORT.md`: preserved in their deleted state (not restored).

---

## 3–5. Repository Cleanup — Obsolete Audit & Report Files

### 3.1. Complete Inventory & Classification of All Non-`node_modules` Markdown Files

Every `.md` file in the repository was read in full and cross-checked with `git grep` across `src/` before taking any action:

| File Path | Classification | Action | Reason | Replacement |
| :--- | :--- | :--- | :--- | :--- |
| `README.md` | `ARCHITECTURE_DOCUMENTATION` | **RETAINED** | Core project overview, setup, and architecture documentation (protected). | N/A |
| `DEPLOYMENT.md` | `DEPLOYMENT_DOCUMENTATION` | **RETAINED** | Official deployment & rollback guide for Super EZ Tour (protected). | N/A |
| `LOCALIZATION_GUIDELINES.md` | `ARCHITECTURE_DOCUMENTATION` | **RETAINED** | Official KO/VI bilingual localization standards across the platform (protected). | N/A |
| `HANOI_SCREEN4_CHACA_SOURCE_AUDIT.md` | `OBSOLETE` | **DELETED** | Pre-implementation read-only source audit for Screen 4 V3 (Chả Cá Lã Vọng). Task is 100% completed; zero `src/` references. | `HANOI_SCREEN4_CHACA_V3_REPORT.md` |
| `HANOI_SCREEN4_CHACA_V3_REPORT.md` | `LICENSE_DOCUMENTATION` / `ACTIVE_REFERENCE` | **RETAINED** | Latest Screen 4 V3 implementation & Wikimedia license/attribution record for the 10 Chả Cá WebP files. | N/A |
| `HANOI_SCREEN5_SEASONS_SOURCE_AUDIT.md` | `OBSOLETE` | **DELETED** | Pre-implementation source audit of the removed legacy Three.js low-poly tree Screen 5. Completely obsolete after V1 & V1.1; zero `src/` references. | `HANOI_SCREEN5_SEASONS_V1_1_REPORT.md` |
| `HANOI_SCREEN5_SEASONS_V1_REPORT.md` | `SUPERSEDED` | **DELETED** | Superseded V1 implementation report that still listed the replaced V1 Spring (`Trees_near_Hoan_Kiem_lake.jpg`) and V1 Autumn (`Hoan_Kiem_lake_Hanoi`) photos and old file sizes. Fully superseded by V1.1 report; zero `src/` references. | `HANOI_SCREEN5_SEASONS_V1_1_REPORT.md` |
| `HANOI_SCREEN5_SEASONS_V1_1_REPORT.md` | `LICENSE_DOCUMENTATION` / `ACTIVE_REFERENCE` | **RETAINED** | Latest Screen 5 V1.1 report containing final 100-point photo curation, license attribution, V1.1 WebP sizes, and pending Chrome `DevToolsActivePort` QA checklist. | N/A |
| `HANOI_SCREEN2_SOURCE_AUDIT.md` *(already `D` in Git)* | `OBSOLETE` (Previously deleted) | **LEFT DELETED** | Already deleted prior to this audit; not restored per Section 3 rules. | Git history / `oldQuarterScenes.js` |
| `HANOI_SCREEN4_BUNCHA_V2_REPORT.md` *(already `D` in Git)* | `SUPERSEDED` (Previously deleted) | **LEFT DELETED** | Already deleted prior to this audit; license metadata lives in `bunChaAssets.js`. | `bunChaAssets.js` |
| `HANOI_SCREEN6_SHARED_MAP_SOURCE_AUDIT.md` | `ACTIVE_REFERENCE` | **CREATED** | This Screen 6 V1 shared component audit & implementation readiness report. | N/A |

### 3.2. Cleanup Summary
- **Total Obsolete/Superseded Files Deleted in This Phase:** **3 files** (`HANOI_SCREEN4_CHACA_SOURCE_AUDIT.md`, `HANOI_SCREEN5_SEASONS_SOURCE_AUDIT.md`, `HANOI_SCREEN5_SEASONS_V1_REPORT.md`), removed individually via verified literal paths (`Remove-Item -LiteralPath`).
- **Retained Root Documentation Files (Before Creating Screen 6 Audit):** **5 files** (`README.md`, `DEPLOYMENT.md`, `LOCALIZATION_GUIDELINES.md`, `HANOI_SCREEN4_CHACA_V3_REPORT.md`, `HANOI_SCREEN5_SEASONS_V1_1_REPORT.md`).
- **Uncertain Files Skipped:** `0`.

---

## 6–7. Shared Component Discovery & Complete Consumer Matrix

### 6.1. Global Reference Search (`Interactive3DMap` & `#attractions`)
Searched the entire repository (`src/`, `public/`, configs, locales) for direct imports, barrel exports, lazy imports, CSS imports, and anchor targets:

1. **Component Definition:**
   - [Interactive3DMap.jsx](file:///D:/workplace/SuperEZTour/src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx) (`723 lines`)
   - [Interactive3DMap.css](file:///D:/workplace/SuperEZTour/src/features/destinations/components/Interactive3DMap/Interactive3DMap.css) (`867 lines`)
   - No barrel `index.js`, no lazy/dynamic wrapper around the component itself (note: `maplibre-gl` is dynamically `import('maplibre-gl')` inside `Interactive3DMap.jsx` at `L269`), and no test files.
2. **Direct JSX Consumers (2 Parent Components):**
   - **Consumer A — Hanoi Dedicated Experience Page:** [HanoiExperiencePage.jsx](file:///D:/workplace/SuperEZTour/src/features/destinations/components/Hanoi/HanoiExperiencePage.jsx#L9-L55) (`Screen 06`), rendered by `DestinationPage.jsx` (`L183–184`) whenever `destination.id === 'ha-noi'`.
   - **Consumer B — Shared Immersive Destination Engine:** [DestinationPage.jsx](file:///D:/workplace/SuperEZTour/src/features/destinations/DestinationPage.jsx#L23-L212) (`Scene 08`), rendered whenever `destination` exists and `destination.id !== 'ha-noi'` (currently active for **Đà Nẵng**; future template for **8 `"coming_soon"` destinations** in `vietnamDestinations.js`: `sa-pa`, `ha-long`, `ninh-binh`, `hue`, `nha-trang`, `da-lat`, `ho-chi-minh`, `phu-quoc` once added to `DESTINATION_REGISTRY`).
3. **Anchor & Navigation Consumers Referencing `id="attractions"`:**
   - [destinationNav.config.js](file:///D:/workplace/SuperEZTour/src/features/destinations/data/destinationNav.config.js): `DESTINATION_NAV_CONFIG['da-nang']` (`L33–38`), `DESTINATION_NAV_CONFIG['ha-noi']` (`L79–84`), and `DESTINATION_NAV_CONFIG['default']` (`L111–116`) all target `sectionId: 'attractions'`.
   - [DestinationFooter.jsx](file:///D:/workplace/SuperEZTour/src/features/destinations/components/DestinationFooter/DestinationFooter.jsx#L59): `<a href="#attractions">` in the footer service links on **both** Da Nang and Hanoi.
   - [da-nang.config.js](file:///D:/workplace/SuperEZTour/src/features/destinations/data/da-nang.config.js#L149) & [ha-noi.config.js](file:///D:/workplace/SuperEZTour/src/features/destinations/data/ha-noi.config.js#L154-L194): `ecosystem.services[*].targetId = 'attractions'` (used by `ExperiencesCinematicSequence` on Da Nang).

### 6.2. Complete Consumer Matrix

| Destination | Route(s) (`App.jsx` & `destinations.config.js`) | Parent Component | Props Passed | Data Source | Map & Terrain Configuration | Risk Level |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **Hà Nội** (`id: 'ha-noi'`) | `/destinations/ha-noi`, `/destinations/hanoi`, `/destinations/vietnam-hanoi` | `HanoiExperiencePage.jsx` (`L54`, wrapped in `<ErrorBoundary isolated>`) | `attractionsData={destination.attractions}` | Raw `HA_NOI_CONFIG.attractions` (`ha-noi.config.js` `L435–591`) — **NOT localized by `language`!** | `overviewCamera`: `center: [105.8525, 21.0285]`, `zoom: 12.6`, `pitch: 52`, `bearing: -18`. Hardcoded `SATELLITE_3D_STYLE` + `exaggeration: 1.42`. | **CRITICAL** (Primary upgrade target; currently has 9 active UI/data/KO-VI bugs) |
| **Đà Nẵng** (`id: 'da-nang'`) | `/destinations/da-nang` (explicit route `App.jsx` `L62` + `:slug`), `/destinations/danang`, `/destinations/vietnam-danang` | `DestinationPage.jsx` (`L212`, inside `.dest-engine-immersive.dest-theme-da-nang`) | `attractionsData={destination.attractions}` | `getLocalizedDaNangConfig(language).attractions` (`da-nang.config.js` `L399–524` + `src/locales/destinations/da-nang/vi.json` `L418–520`) | No `overviewCamera` in config → falls back to hardcoded `OVERVIEW_CAMERA` (`center: [108.175, 16.055]`, `zoom: 10.65`, `pitch: 58`, `bearing: -15`) + `SATELLITE_3D_STYLE` (`exaggeration: 1.42`). | **CRITICAL** (Production reference; camera, 3D mountain terrain for Bà Nà/Sơn Trà/Hải Vân, and KO/VI behavior MUST NOT regress) |
| **Fallback / Undefined Props** | Any mount where `attractionsData` is omitted or `items` is empty | `Interactive3DMap.jsx` internal defaults | `{ attractionsData: undefined }` | Hardcoded `DEFAULT_DESTINATIONS` (`L28–141`, 7 Vietnamese Da Nang items) + `OVERVIEW_CAMERA` | Da Nang overview (`[108.175, 16.055]`, `zoom: 10.65`, `pitch: 58`, `bearing: -15`), `exaggeration: 1.42`. | **MEDIUM** (Must remain backward-compatible so empty props never crash) |
| **8 Future Vietnam Destinations** (`sa-pa`, `ha-long`, `ninh-binh`, `hue`, `nha-trang`, `da-lat`, `ho-chi-minh`, `phu-quoc`) | `/destinations/:slug` | Currently short-circuits to `.dest-coming-soon-wrapper` (`DestinationPage.jsx` `L134–179`) because `getDestinationConfig` returns `null`; will auto-mount `DestinationPage.jsx` `L212` once config is added. | Future `attractionsData={destination.attractions}` | Future `<slug>.config.js` + `DESTINATION_NAV_CONFIG['default']` (`sectionId: 'attractions'`) | Will inherit shared defaults unless overridden per destination (`sa-pa` & `ha-long` need 3D terrain; urban cities may prefer flat/street view). | **MEDIUM** (Shared contract must stay destination-agnostic, never hardcoded to Hanoi or Da Nang) |

---

## 8–9. Existing Component Architecture & Exact Source Paths

### 8.1. Exact Source Paths Related to Screen 6
- **Shared Map Component:** `src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx`
- **Shared Map Stylesheet:** `src/features/destinations/components/Interactive3DMap/Interactive3DMap.css`
- **Hanoi Parent Page:** `src/features/destinations/components/Hanoi/HanoiExperiencePage.jsx`
- **Shared Destination Page:** `src/features/destinations/DestinationPage.jsx`
- **Destination Registry:** `src/features/destinations/data/destinations.config.js`
- **Hanoi Config:** `src/features/destinations/data/ha-noi.config.js`
- **Da Nang Config & Localization:** `src/features/destinations/data/da-nang.config.js`, `src/locales/destinations/da-nang/vi.json`, `src/locales/destinations/da-nang/ko.json`
- **Navigation Config & Header:** `src/features/destinations/data/destinationNav.config.js`, `src/features/destinations/components/DestinationHeader/DestinationHeader.jsx`
- **TripBuilder Store & Wizard:** `src/features/destinations/context/TripBuilderContext.jsx`, `src/features/destinations/components/TripBuilderMorph/TripBuilderMorph.jsx`
- **Global Language Context:** `src/context/LanguageContext.jsx`, `src/locales/ko.json`, `src/locales/vi.json`
- **Smooth Scroll Manager:** `src/features/destinations/motion/LenisManager.js`
- **Adjacent Hanoi Screens:** `src/features/destinations/components/Hanoi/HanoiSeasons3D/HanoiSeasons3D.jsx` (Screen 5) & `src/features/destinations/components/Hanoi/HanoiYourStory/HanoiYourStory.jsx` (Screen 7)

### 8.2. Actual Component Tree of `Interactive3DMap`
```text
section#attractions.interactive-3d-map-scene (ref=containerRef)
 ├── div.map-ambient-grid (aria-hidden="true")
 └── div.dest-container.map-3d-content
      ├── header.map-3d-header (ref=headerRef)
      │    ├── div
      │    │    ├── span.dest-kicker.map-kicker (ref=kickerRef) > Compass + kicker text
      │    │    └── h2.map-3d-title (ref=titleRef) > title text
      │    └── div.map-cart-badge (ref=cartBadgeRef) > Sparkles + "{cartPrefix}: {selected.length} / {destinations.length} {cartSuffix}"
      ├── div.map-atlas-stage (CSS Grid: 1.85fr map | 1fr panel on >992px; 1fr stacked on <=992px)
      │    ├── div.map-canvas-wrapper
      │    │    ├── div.map-mapbox-container (ref=mapContainerRef)
      │    │    │    ├── canvas.maplibregl-canvas (WebGL)
      │    │    │    ├── N × div.atlas-mapbox-marker (imperative DOM via new maplibregl.Marker)
      │    │    │    │    ├── div.marker-leader-stem
      │    │    │    │    ├── div.marker-beacon-head > span.marker-beacon-dot
      │    │    │    │    └── div.marker-floating-label > span.marker-name + span.marker-alt
      │    │    │    └── div.maplibregl-control-container (AttributionControl only; NO NavigationControl)
      │    │    ├── button.map-reset-view-btn (onClick=resetToOverview)
      │    │    └── div.map-live-badge ("REAL 3D TERRAIN & SATELLITE")
      │    └── aside.map-editorial-panel (ref=panelRef)
      │         ├── div.panel-img-frame
      │         │    ├── img.panel-img (key=activeLandmark.id, src=activeLandmark.image, NO onError fallback!)
      │         │    ├── div.panel-img-overlay
      │         │    └── div.panel-img-top-meta > span.panel-badge-category + span.panel-badge-elevation
      │         └── div.panel-content-body
      │              ├── span.panel-route-index ("{routeIndex} / {atlasName}")
      │              ├── h3.panel-title
      │              ├── p.panel-slogan
      │              ├── p.panel-desc (-webkit-line-clamp: 3 / 2)
      │              ├── div.panel-tags-row > span.panel-tag-pill[]
      │              └── button.panel-add-btn (onClick={() => toggleAttraction(activeLandmark.id)})
      └── div.map-disclaimer > Info + disclaimer text
```

### 8.3. Separation of Responsibilities Assessment
Inside its 723 lines, `Interactive3DMap.jsx` currently mixes **8 responsibilities** in one file:
1. **Hardcoded Da Nang fallback data** (`DEFAULT_DESTINATIONS`, `OVERVIEW_CAMERA`, Vietnamese Da Nang disclaimer).
2. **MapLibre style & DEM terrain definition** (`SATELLITE_3D_STYLE` with hardcoded `exaggeration: 1.42`).
3. **Imperative MapLibre lifecycle, GeoJSON route layer, and raw `innerHTML` marker creation** (`useEffect` `L263–401`).
4. **Reactive marker DOM text/class syncing** (`useEffect` `L407–425`, `L465–482`) and **GeoJSON route line updates** (`useEffect` `L430–460`).
5. **Camera fly-to & overview reset** (`handleSelectLandmark`, `resetToOverview` `L488–524`).
6. **GSAP pinned ScrollTrigger timeline** (`useEffect` `L529–600`, pinning `+=200%` desktop / `+=130%` mobile).
7. **TripBuilder cart state reading & toggling** (`useTripBuilder()` `L217`, `L602`, `L625`, `L693`).
8. **Detail panel JSX & GIS HUD badges** (`L604–720`).

*Verdict:* The file is cohesive enough that **a full rewrite or multi-city fork is NOT needed**, but extracting pure presentation subcomponents (`AttractionDetailPanel`, `AttractionFilters` / navigation) and making camera, terrain, style, pin behavior, and UI badges **configuration-driven** will cleanly separate shared map mechanics from destination-specific UX.

---

## 10–11. Shared Props Contract & Default Behavior Audit

Currently, `Interactive3DMap` accepts **only a single prop**: `({ attractionsData })`. It does **not** accept `destinationId`, `language`, `mapConfig`, or `variant` directly (though those can be nested inside `attractionsData` or passed as optional props).

| Prop / Sub-field | Current Contract & Default in `Interactive3DMap.jsx` | Current Consumers | Proposed Backward-Compatible Extension | Breaking Risk |
| :--- | :--- | :--- | :--- | :---: |
| `attractionsData` (root prop) | Optional `object`. If omitted, component falls back to Da Nang `DEFAULT_DESTINATIONS` & Vietnamese strings. | `DestinationPage.jsx` (`L212`), `HanoiExperiencePage.jsx` (`L54`) | Keep `attractionsData` as primary prop; optionally accept `destinationId` / `atlasConfig` or read optional fields inside `attractionsData`. | **LOW** |
| `attractionsData.items` | `Array<AttractionItem>`. Normalized in `destinations` `useMemo` (`L238–252`) with defaults: `routeIndex: '01'..'NN'`, `bearing: -20`, `pitch: 50`, `zoom: 15`, `elevation: 'Đồng bằng'`, `tags: []`. | Hanoi (8 items), Da Nang (7 items) | Preserve all existing item fields; support optional `duration` *(already present in Da Nang config `L415`, `vi.json` `L433`, currently unused by JSX!)*, `bestTime`, `categoryId`, `fallbackImage`, `mobileImage`, `photoCredit`. | **LOW** |
| `attractionsData.overviewCamera` | Optional `{ center, zoom, pitch, bearing }`. Falls back to `{ center: mapCenter \|\| [108.175, 16.055], zoom: defaultZoom \|\| 10.65, pitch: 58, bearing: -15 }`. | Hanoi sets `overviewCamera` (`pitch: 52, zoom: 12.6`); Da Nang relies on `OVERVIEW_CAMERA` fallback! | Keep exact `OVERVIEW_CAMERA` fallback when `overviewCamera` is absent so Da Nang camera is 100% unchanged. | **HIGH** if default changed; **LOW** if preserved |
| `attractionsData.kicker` / `title` / `subtitle` / `lead` | `kicker` & `title` rendered (`L615`, `L618`); **`subtitle` and `lead` exist in both Hanoi and Da Nang configs (`da-nang.config.js` `L402–403`, `ha-noi.config.js` `L439`) but are NEVER rendered!** | Hanoi, Da Nang | Optionally render `subtitle` in `travel-atlas` layout when enabled or non-empty. | **LOW** |
| `attractionsData.cartPrefix` / `cartSuffix` / `resetViewText` / `atlasName` / `btnAdd` / `btnInCart` / `disclaimer` | Optional localized UI strings with hardcoded Vietnamese fallbacks (`disclaimer` fallback hardcodes `"Đà Nẵng"` at `L715`). | Da Nang sets all except `atlasName`; Hanoi misses `btnAdd`, `btnInCart`, `disclaimer`, and has KO-only values for the rest. | Localize all strings in `getLocalizedHaNoiConfig(language)` (or bilingual fields) + sanitize generic fallback in `Interactive3DMap.jsx` so `"Đà Nẵng"` never leaks to other cities. | **LOW** |
| *(Missing)* `terrain` config | Hardcoded `exaggeration: 1.42` in `SATELLITE_3D_STYLE` (`L188`) and `mapInstance.setTerrain` (`L293`). | Shared globally | Add optional `attractionsData.terrain` (default `{ enabled: true, exaggeration: 1.42 }` so Da Nang stays untouched; Hanoi sets `{ enabled: false, exaggeration: 0 }`). | **HIGH** if default changed; **LOW** with default `enabled: true, exaggeration: 1.42` |
| *(Missing)* `features` / `presentation` | Hardcoded GIS HUD, pinned ScrollTrigger (`+=200%`), always-on marker labels, elevation badges, no filters, no prev/next. | Shared globally | Add optional `attractionsData.features` & `presentation` flags with defaults matching current Da Nang behavior (`pinSection: true`, `showElevation: true`, `showLiveBadge: true`, `showAmbientGrid: true`, `markerLabelMode: 'always'`). Hanoi opts into `layoutVariant: 'travel-atlas'` (`pinSection: false`, `showElevation: false`, `showLiveBadge: false`, `categoryFilters: true`, `prevNextNav: true`, `markerLabelMode: 'Contextual'`). | **LOW** |

---

## 12–16. Destination Data & Complete Hanoi Attractions Inventory

### 12.1. Da Nang Attractions Architecture (`da-nang.config.js` & `vi.json`)
- **Count:** 7 attractions (`ba-na-hills`, `my-khe-beach`, `son-tra-peninsula`, `marble-mountains`, `dragon-bridge`, `hai-van-pass`, `hoi-an-ancient-town`).
- **Localization Mechanism:** `DA_NANG_CONFIG` (`da-nang.config.js` `L399–524`) holds Korean text + coordinates + camera + Unsplash URLs. When `language === 'vi'`, `getLocalizedDaNangConfig('vi')` (`L974–984`) merges `src/locales/destinations/da-nang/vi.json` (`L418–520`) by array index while preserving `id`, `lng`, `lat`, `elevation`, `bearing`, `pitch`, `zoom`, and `image`.
- **Bonus Unused Field Discovery:** Da Nang items **already define `duration`** in both KO (`전일 투어 (1일 소요)`, `반일 투어 (약 3~4시간)`, etc.) and VI (`6-7 giờ`, `2-3 giờ`, etc.), though `Interactive3DMap.jsx` currently ignores `activeLandmark.duration`!
- **Minor Bug in Da Nang `vi.json` (`L430–520`):** `vi.json` `attractions.items` omits translated `category` strings, so in VI mode on Da Nang, `activeLandmark.category` still displays Korean (`세계적인 랜드마크`, etc.)! (Noted for awareness; we do not touch Da Nang unless approved.)

### 12.2. Complete Hanoi Attractions Data Inventory (`ha-noi.config.js` `L435–591`)

`HA_NOI_CONFIG.attractions` defines **8 attractions** (`categories: ['전체', '역사유산', '건축명소', '호수·자연', '문화예술']`):

| # (`routeIndex`) | Stable `id` | `nameVi` (`ha-noi.config.js`) | `name` (KO in `ha-noi.config.js`) | `category` (KO only!) | Coordinates `[lng, lat]` | Coordinate Audit Status | Camera (`zoom / pitch / bearing`) | `elevation` (KO only!) | VI Text (`slogan`, `description`, `tags`, `category`) | TripBuilder Cross-Ref |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | `hoan-kiem-lake` | `Hồ Hoàn Kiếm & Đền Ngọc Sơn` | `호안끼엠 호수 & 응옥선 사당` | `호수·자연` | `[105.8525, 21.0285]` | **VERIFIED** (Center of Hoàn Kiếm Lake, ~250m SSW of Ngọc Sơn Temple `[105.8525, 21.0307]`) | `15.2 / 45° / 0°` | `해발 15m · 도심 중심` | **MISSING** (KO only) | Selectable in Map & `TripBuilderMorph` Step 6 |
| **02** | `old-quarter` | `Phố Cổ Hà Nội 36 Phố Phường` | `하노이 36 구시가지` | `역사유산` | `[105.8510, 21.0345]` | **VERIFIED** (Heart of Old Quarter — Hàng Đào / Hàng Bạc / Lương Ngọc Quyến intersection) | `15.5 / 40° / -15°` | `해발 14m · 보행 중심` | **MISSING** (KO only) | Selectable in Map & Step 6 *(Note ID mismatch with Screen 2 chapter IDs — see Section 31!)* |
| **03** | `van-mieu` | `Văn Miếu – Quốc Tử Giám` | `문묘 국자감` | `역사유산` | `[105.8360, 21.0293]` | **NEEDS_REFINEMENT** (`21.0293` is ~180m north of the main courtyard; exact Khuê Văn Các / Thiên Quang Tỉnh center is `[105.8355, 21.0278]`) | `15.8 / 50° / 25°` | `해발 16m · 유교 정원` | **MISSING** (KO only) | **SHARED EXACT ID** with Screen 3 `HanoiHeritageChamber` (`toggleAttraction('van-mieu')`) & Step 6! |
| **04** | `thang-long-citadel` | `Hoàng Thành Thăng Long` | `탕롱 황성` | `역사유산` | `[105.8406, 21.0342]` | **VERIFIED** (Exact Đoan Môn / Central Sector of Imperial Citadel of Thăng Long, 19C Hoàng Diệu) | `15.4 / 48° / -10°` | `해발 18m · UNESCO 세계유산` | **MISSING** (KO only) | Selectable in Map & Step 6 *(Note `ecosystem` L157 uses `thang-long`, unused on Hanoi)* |
| **05** | `st-joseph-cathedral` | `Nhà Thờ Lớn Hà Nội` | `성 요셉 대성당` | `건축명소` | `[105.8494, 21.0288]` | **VERIFIED** (Exact St. Joseph's Cathedral, 40 Nhà Chung, Hoàn Kiếm — 320m west of `#01`) | `16.0 / 42° / 15°` | `해발 15m · 광장 중심` | **MISSING** (KO only) | Selectable in Map & Step 6 |
| **06** | `opera-house` | `Nhà Hát Lớn Hà Nội` | `하노이 오페라 하우스` | `건축명소` | `[105.8576, 21.0245]` | **VERIFIED** (Exact Hanoi Opera House, 01 Tràng Tiền, Hoàn Kiếm) | `15.6 / 46° / -30°` | `해발 14m · 프랑스 구역` | **MISSING** (KO only) | Selectable in Map & Step 6 |
| **07** | `tran-quoc-pagoda` | `Chùa Trấn Quốc & Hồ Tây` | `진국사 & 서호` | `호수·자연` | `[105.8369, 21.0478]` | **VERIFIED** (Exact Chùa Trấn Quốc peninsula on Thanh Niên Road, West Lake) | `15.2 / 44° / 20°` | `해발 16m · 서호 반도` | **MISSING** (KO only) | Selectable in Map & Step 6 |
| **08** | `bat-trang-village` | `Làng Gốm Bát Tràng` | `바트랑 도예 마을` | `문화예술` | `[105.9125, 20.9790]` | **VERIFIED** (Bát Tràng Pottery Village / Pottery Museum on Red River bank, Gia Lâm, ~8.5 km SE of Hoàn Kiếm) | `14.5 / 35° / -10°` | `해발 12m · 홍강변` | **MISSING** (KO only) | Selectable in Map & Step 6 |

- **Lng/Lat Order Check:** All 8 entries use `[lng, lat]` (`~105.83–105.91 E`, `~20.97–21.05 N`), matching MapLibre GL's `[lng, lat]` convention. Zero swapped lat/lng pairs, zero duplicate coordinates.
- **Geographic Spread Note:** Items `01–07` all lie inside a tight **`2.6 km × 2.2 km`** central box (`lng 105.836–105.858`, `lat 21.024–21.048`), whereas Item `08` (`bat-trang-village`) is **`8.5 km` southeast** (`[105.9125, 20.9790]`). At `overviewCamera` (`center: [105.8525, 21.0285], zoom: 12.6, pitch: 52, bearing: -18`), Bát Tràng sits near the bottom-right edge while `#01` Hoàn Kiếm (`[105.8525, 21.0285]`) and `#05` Nhà Thờ Lớn (`[105.8494, 21.0288]`) are only **320 meters apart**, causing severe label collision!

---

## 17–18. Photography Asset Audit & Root Cause of Incorrect Images

### 17.1. Root Cause of Issue 01 (Why Hoàn Kiếm Shows Coffee Cups — And What the Other 7 Show)
There is **no index bug, no state desynchronization, and no race condition** in `Interactive3DMap.jsx`. Instead, `HA_NOI_CONFIG.attractions.items` (`ha-noi.config.js` `L469, 486, 503, 520, 537, 554, 571, 588`) contains **hallucinated / mismatched Unsplash hotlink IDs**.

During this audit, all 8 remote URLs were fetched to scratch thumbnails and **visually inspected directly**:

| # | Attraction ID & Name | Current Remote URL in `ha-noi.config.js` | **Actual Visual Subject (Verified by Direct Image Inspection)** | Audit Verdict |
| :---: | :--- | :--- | :--- | :---: |
| **01** | `hoan-kiem-lake` (Hồ Hoàn Kiếm & Đền Ngọc Sơn) | `https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80` | **Three ceramic cups of latte-art cappuccino on a wooden cafe table surrounded by potted houseplants!** *(Also reused in `hero.posterImage` `L41`, `intro.gallery[0]` `L83`, `privateValues.night` `L723`, `itineraries[0].days[0]` `L771`!)* | **INCORRECT (100% Wrong Subject)** |
| **02** | `old-quarter` (Phố Cổ Hà Nội 36 Phố Phường) | `https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80` | **A laser-cut dark wood world map mounted on a pine wall with blue pushpins!** | **INCORRECT (100% Wrong Subject)** |
| **03** | `van-mieu` (Văn Miếu – Quốc Tử Giám) | `https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80` | **Colorful silk lanterns in Hội An night market** (Central Vietnam, NOT Văn Miếu in Hanoi!). | **INCORRECT (Wrong City & Subject)** |
| **04** | `thang-long-citadel` (Hoàng Thành Thăng Long) | `https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80` | **17th-century Dutch Golden Age oil painting of flowers & butterflies in a glass vase** (Jan Davidsz. de Heem, Rijksmuseum)! | **INCORRECT (100% Wrong Subject)** |
| **05** | `st-joseph-cathedral` (Nhà Thờ Lớn Hà Nội) | `https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80` | **Backpacker sitting in front of Khao Phing Kan / James Bond Island limestone stack in Phang Nga Bay, Thailand!** | **INCORRECT (Wrong Country & Subject)** |
| **06** | `opera-house` (Nhà Hát Lớn Hà Nội) | `https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80` | **Sunrise over Mount Bromo volcanic crater in East Java, Indonesia!** | **INCORRECT (Wrong Country & Subject)** |
| **07** | `tran-quoc-pagoda` (Chùa Trấn Quốc & Hồ Tây) | `https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80` | **A gray office/hotel door next to bright pink `"404"` wall numbers!** | **INCORRECT (Literal `"404"` Door Photo!)** |
| **08** | `bat-trang-village` (Làng Gốm Bát Tràng) | `https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80` | **Nordic minimalist studio still-life of three matte white stoneware bottles with dried poppy seed heads** — generic studio pottery, NOT Bát Tràng village. | **INCORRECT (Generic Non-Hanoi Stock)** |

### 17.2. Image Fallback & Existing Local Assets Reusable vs Missing
- **Current `<img>` Error Handling (`Interactive3DMap.jsx` `L657–663`):** Has **NO `onError` fallback** (`<img key={activeLandmark.id} src={activeLandmark.image} alt={activeLandmark.name} className="panel-img" loading="lazy" />`). If any remote URL fails, the browser displays a broken image icon.
- **Reusable Verified Local Assets Already in `public/assets/destinations/hanoi/`:**
  - `old-quarter`: Verified local WebPs already exist in `public/assets/destinations/hanoi/old-quarter/` (`hang_bac.webp`, `ma_may_87.webp` — CC BY-SA 4.0).
  - `van-mieu`: Verified local WebPs already exist in `public/assets/destinations/hanoi/heritage/` (`khue-van-cac-establish.webp`, `van-mieu-opening-gateway.webp` — CC0 1.0 Public Domain, Daderot).
- **Dedicated Local Assets Needed for Screen 6 V1 Implementation (`public/assets/destinations/hanoi/attractions/`):**
  - Sourcing & license-verifying 8 dedicated, consistent aspect-ratio (`1200×800` or `1280×800` desktop / `800×600` mobile WebP, ~80–140 KB each) Wikimedia Commons photographs for all 8 Hanoi landmarks (`hoan-kiem-lake`, `old-quarter`, `van-mieu`, `thang-long-citadel`, `st-joseph-cathedral`, `opera-house`, `tran-quoc-pagoda`, `bat-trang-village`) will guarantee 100% visual accuracy, fast local loading, zero hotlink rot, and full license attribution.

---

## 19–24. MapLibre GL Engine, Providers, Licensing, Camera, Terrain & Style Switching

### 19.1. MapLibre GL Architecture (`Interactive3DMap.jsx` `L155–401`)
- **Installed Version (`package.json` `L15`):** `"maplibre-gl": "^6.18.0"` (bundled in `dist/assets/maplibre-gl-CRaIuO8Z.js` at `1,114.54 kB` / `305.08 kB` gzipped). CSS imported statically at `L19`: `import 'maplibre-gl/dist/maplibre-gl.css'`.
- **Initialization Timing (`L263–285`):** Runs **immediately on route mount** (`useEffect(..., [])`), NOT deferred by `IntersectionObserver` or `ScrollTrigger`. When a user lands on Screen 1 of `/destinations/ha-noi`, `Interactive3DMap` immediately imports `maplibre-gl`, allocates a WebGL context, and fetches Esri satellite + AWS Terrarium DEM tiles 5 screens below the fold!
- **Re-initialization Behavior:** Because the effect dependency array is `[]`, changing language (`KO ↔ VI`), selecting markers, or toggling TripBuilder items **does NOT recreate the map** (good). However:
  - **Stale Closure Bug #1 (`L372`):** Marker click listener `el.addEventListener('click', () => handleSelectLandmark(dest.id))` captures the initial `handleSelectLandmark` closure created on mount! If `attractionsData` changes (e.g., if `destinations` updates on language switch or slug change without unmounting), `handleSelectLandmark` inside the click listener still references the initial `destinations` array (though coordinates/zoom don't change on language toggle, if `DestinationPage` switches from `/destinations/da-nang` to another non-Hanoi slug without unmounting `Interactive3DMap`, **markers are NEVER rebuilt** because `L263` has `[]` deps!).
  - **Controls:** `attributionControl: true` (`L282`), **NO `NavigationControl` (`+ / - / compass`)** is added, leaving desktop mouse/keyboard users without explicit zoom buttons if scroll-zoom is disabled or tricky with Lenis.
  - **Resize Handling:** Relies on MapLibre's internal `ResizeObserver`, except GSAP scales `mapContainerRef.current` from `scale: 0.96` to `1.0` (`L576–581`), which slightly warps CSS-transformed DOM markers during the entrance scrub.
  - **Cleanup (`L392–400`):** Sets `isCancelled = true`, removes all `markersRef.current`, calls `mapRef.current.remove()`, and nulls `mapRef.current`. Cleanly releases the WebGL context on unmount.

### 20–21. Map Providers & Commercial Licensing Audit

| Source ID | Provider & Endpoint | Auth / Key | Attribution in Code | Commercial Usage & Licensing Review | Audit Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `'esri-satellite'` (`L158–166`) | **Esri World Imagery** (`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`) | None (Keyless legacy REST endpoint) | `'Tiles © Esri, Maxar, Earthstar Geographics, USDA, USGS, AeroGRID, IGN, and the GIS User Community'` | **IMPORTANT:** Despite the code comment claiming *"100% Free, keyless"* (`L152–153`), Esri's ArcGIS Online Terms of Use / Master Agreement govern direct tile access to `server.arcgisonline.com`: production commercial applications generally require an ArcGIS Location Platform account/API key and compliance with Esri attribution + transaction limits, without bulk caching/scraping. We do **not** change providers in V1 unless directed, but flag this accurately. | **`NEEDS_LICENSE_REVIEW`** |
| `'terrain-dem'` (`L167–175`) | **AWS Open Data Registry — Mapzen / Tilezen Joerd Terrarium Elevation Tiles** (`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png`) | None (Public AWS Open Data S3 bucket) | **MISSING** (`attribution` field omitted on `'terrain-dem'` source at `L167–175`!) | Hosted on AWS Open Data Registry (derived from SRTM / GMTED / ETOPO1 / NED public datasets; open usage with attribution to Mapzen/Tilezen/USGS/NASA recommended). | **`VERIFIED` (Add attribution string)** |
| Street Map Provider (Future Candidate) | None currently configured in repo (`.env` has no map API keys). | None | N/A | Public community endpoints like `tile.openstreetmap.org` **prohibit heavy commercial production traffic** per OSM Tile Usage Policy; CARTO basemaps (`basemaps.cartocdn.com`) restrict free keyless usage to non-commercial services under CARTO ToS; OpenFreeMap (`tiles.openfreemap.org`) is MIT/ODbL open vector tiles (`© OpenMapTiles © OpenStreetMap contributors`) with no API key, or MapTiler/Stadia/ArcGIS Platform require an API key. | **`NEEDS_PROVIDER_REVIEW`** |

### 22–23. Destination-Specific Camera & Terrain Analysis
- **Why Đà Nẵng Needs 3D Terrain (`exaggeration: 1.42`, `pitch: 58°–72°`):** Bà Nà Hills (`1,487m`), Bán đảo Sơn Trà (`693m`), Đèo Hải Vân (`496m`), and Ngũ Hành Sơn (`106m`) rise dramatically right beside Mỹ Khê Beach (`3m`). High pitch + `1.42x` DEM terrain creates a genuine 3D coastal-mountain relief model. **Must be 100% preserved for Đà Nẵng.**
- **Why Hà Nội Suffers Under Da Nang's Terrain & Pitch:** Central Hanoi sits on the flat Red River alluvial plain (`12m–18m` elevation). Applying `exaggeration: 1.42` + `pitch: 52°` on pure dark-green/gray urban satellite rooftops without street labels makes Hoàn Kiếm, Nhà Thờ Lớn, Hoàng Thành, and Văn Miếu look like an unreadable flat blur of rooftops while compressing vertical screen space and forcing markers onto each other.
- **Recommended Hanoi Camera & Terrain Profile:**
  - `terrain: { enabled: false, exaggeration: 0 }` (eliminates unnecessary `elevation-tiles-prod` DEM network requests & GPU mesh tessellation on Hanoi!).
  - `overviewCamera`: `center: [105.854, 21.026]` (or `fitBounds` covering West Lake to Bát Tràng with padding, plus a quick "Trung tâm Hà Nội" focus), `zoom: 12.4–13.0`, **gentler `pitch: 28°–35°`**, `bearing: 0°` (north-up so West Lake is clearly at top, Red River on right, Hoàn Kiếm in center, Bát Tràng to southeast).
  - Per-landmark `flyTo`: `zoom: 15.4–16.2`, `pitch: 32°–40°`, `bearing: 0°` to `15°`.

### 24. Street / Satellite Map Style Switching Feasibility
- **Technical Mechanism in MapLibre GL:**
  - Calling `map.setStyle(newStyle)` wipes all custom dynamic sources (`'itinerary-route'`) and layers (`'itinerary-route-glow'`, `'itinerary-route-core'`) and resets terrain!
  - **Superior Zero-Reset Architecture (Recommended if Street Basemap Provider Is Approved):** Instead of calling `map.setStyle()`, include **both** raster/vector base layers inside a single MapLibre style object (or add/toggle layer `layout.visibility: 'visible' | 'none'`) beneath `'itinerary-route-glow'`. Toggling layer `visibility` via `map.setLayoutProperty()` is **instantaneous (`0ms` blank frame)**, **never destroys `'itinerary-route'`**, **never disturbs HTML markers**, **never resets camera/active attraction/TripBuilder selections**, and updates attribution cleanly!
- **Provider Readiness Gate:** Because commercial-safe street tiles require either approving an open provider (e.g., self-hosted PMTiles / OpenFreeMap vector style with verified terms) or providing a commercial tile key (`VITE_MAPTILER_KEY` / `VITE_ARCGIS_KEY`), **Map Style Switching is classified as `NEEDS_PROVIDER_REVIEW`** — architecturally trivial via layer visibility, gated only on provider approval.

---

## 25–26. Marker System & Marker Collision Analysis

### 25.1. Current Marker Implementation (`Interactive3DMap.jsx` `L349–383` & `.css` `L236–346`)
- **Type:** Imperative HTML DOM elements mounted via `new maplibregl.Marker({ element: el, anchor: 'bottom' })`.
- **DOM Structure per Marker:**
  - `.marker-leader-stem`: `24px` tall vertical gold line (`1.5px` wide).
  - `.marker-beacon-head`: `18px × 18px` circle (`#09172C` fill, `2px` `#D4B478` border).
  - `.marker-floating-label`: `inline-flex` pill (`white-space: nowrap`) containing `.marker-name` (`Playfair Display 0.78rem`) + `|` + `.marker-alt` (`Manrope 0.64rem` elevation).
- **Accessibility Deficits:** Uses raw `<div>` (`L350`) — **not `<button>`**, no `tabIndex="0"`, no `role="button"`, no `aria-label`, no `aria-pressed` / `aria-current`, and no `Enter` / `Space` keyboard handler!

### 25.2. Exact Root Cause of Marker Collision on Hanoi (Issue 04)
At `overviewCamera` (`zoom: 12.6, pitch: 52°`), each `.marker-floating-label` is **`160px–240px` wide** (`호안끼엠 호수 & 응옥선 사당 | 해발 15m · 도심 중심`). Meanwhile, the screen-space pixel distance between central Hanoi landmarks at `zoom: 12.6` is tiny:
- `#01` Hoàn Kiếm (`105.8525, 21.0285`) ↔ `#05` Nhà Thờ Lớn (`105.8494, 21.0288`): **320m apart = ~26px apart on screen!**
- `#01` Hoàn Kiếm ↔ `#02` Phố Cổ (`105.8510, 21.0345`): **680m apart = ~45px apart!**
- `#03` Văn Miếu (`105.8360, 21.0293`) ↔ `#04` Hoàng Thành (`105.8406, 21.0342`): **720m apart = ~50px apart!**

Because HTML DOM markers bypass MapLibre's WebGL symbol collision engine and all 8 labels are permanently `display: inline-flex` on desktop, `220px`-wide boxes stacked `26px–50px` apart **inevitably collide**.

### 25.3. Proposed Marker Redesign (For Hanoi `travel-atlas` Mode, Preserving Da Nang Default)
- **Semantic `<button type="button">` compact numbered badge (`32px–36px` hit target, `44px` touch area on mobile):**
  1. **Default State:** Crisp navy badge (`#0D1B2A`) with gold/ivory border and route index (`01`..`08`). No floating text label blocking neighbors!
  2. **Added-to-Trip State (`isSelected`):** Warm gold/emerald ring + compact corner check badge (`✓`) so status does not rely on color alone.
  3. **Active Exploring State (`isActive`):** Terracotta/amber accent (`#D96B27` / `#D4B478`), subtle scale-up (`z-index: 60`), **and floating single-line place name tooltip** (without elevation clutter).
  4. **Combined Active + Added-to-Trip State:** Active terracotta/gold fill + visible `✓` check badge + active floating name pill — unmistakably expressing both states simultaneously.
- **Label Behavior:** Show floating name label **only** on the `active` marker (plus `:hover` / `:focus-visible` on desktop). Zero overlap across all 8 Hanoi landmarks without needing marker clustering.

---

## 27–29. Detail Panel, Category Filters & Previous/Next Navigation Feasibility

### 27.1. Detail Panel Audit (`Interactive3DMap.jsx` `L655–708` & `.css` `L474–666`)
- **Current Fixed Height Trap:** `.map-editorial-panel` has `height: clamp(520px, 66vh, 620px)` (`L486`) and `overflow: hidden` (`L478`), while `.panel-desc` has `-webkit-line-clamp: 3` (`L604`) and `-webkit-line-clamp: 2` on `max-height: 850px` (`L817`). Furthermore, `Interactive3DMap.css` `L803` & `L808` reference **dead class names** `.panel-body-content` and `.panel-destination-title` (actual JSX classes at `L674` & `L676` are `.panel-content-body` and `.panel-title`!), causing height-responsive padding overrides on `<=850px` laptops to silently fail!
- **Proposed `travel-atlas` Detail Panel Hierarchy (Hanoi V1):**
  1. **Authentic Landmark Photograph** (`aspect-ratio: 16 / 10`, `onError` fallback, subtle photo credit).
  2. **Category Kicker + Step Counter** (`DI SẢN · 01 / 08`).
  3. **Landmark Title (`<h3>`) + Poetic Tagline**.
  4. **Full Unclamped Editorial Description** (`min-height` layout instead of `overflow: hidden` + `line-clamp`, so full VI & KO descriptions never truncate with `...`).
  5. **Practical Travel Metadata Row:** Suggested visit duration (e.g., *Thời gian gợi ý: 60–90 phút* — phrased as flexible private-tour guidance, never unverified ticket prices or rigid opening hours).
  6. **3–4 Curated Experience Highlights** (clean editorial bullets or refined tags).
  7. **Primary TripBuilder Toggle CTA:**
     - Default: VI `Thêm vào chuyến đi` / KO `여행 일정에 추가`
     - Selected: VI `Đã có trong chuyến đi · Bỏ chọn` / KO `일정에 포함됨 · 선택 해제`
  8. **Previous / Next Landmark Navigation Bar:** `← Địa điểm trước` · `1 / 8` · `Địa điểm tiếp →`.

### 28. Category Filter System Feasibility
- **Current Data:** `HA_NOI_CONFIG.attractions.categories` (`L452`) already exists (`['전체', '역사유산', '건축명소', '호수·자연', '문화예술']`) **but is completely unused in `Interactive3DMap.jsx`**! Da Nang has no `attractions.categories` array.
- **Data-Driven Design:**
  - Define canonical `categoryId` per item (`'heritage'`, `'culture'`, `'nature'`, `'architecture'`, `'craft'`) alongside localized category objects `{ id, labelVi, labelKo }`.
  - Filtering updates only `visibleDestinations` and hides/dims non-matching markers on the map (`el.style.display = isMatch ? '' : 'none'`).
  - **TripBuilder Safety Rule:** Filtering **NEVER** mutates `tripState.selectedAttractions`. If the currently `activeLandmark` is excluded by a newly clicked category pill, automatically advance `selectedLandmarkId` to `filteredDestinations[0].id` and `flyTo` it cleanly without touching TripBuilder selections.

### 29. Previous / Next Attraction Navigation Feasibility
- **Behavior:** Operates over the **currently visible `filteredDestinations` list** in deterministic `routeIndex` order (wrapping around `last → first` and `first → last`).
- **Synchronization:** Clicking Prev/Next calls `handleSelectLandmark(nextDest.id)` — updating `selectedLandmarkId`, highlighting the active marker, updating the detail panel, and smoothly `flyTo`-ing the camera (or `jumpTo` under `prefers-reduced-motion: reduce`), **without** adding/removing anything in `TripBuilderContext` and **without** any auto-play timer.

---

## 30–32. TripBuilder Integration, Identity Risks & Selection Counter Audit — CRITICAL

### 30.1. TripBuilder Schema & Consumers (`TripBuilderContext.jsx`)
- **State Field:** `tripState.selectedAttractions` (`Array<string>`, initialized at `L133`).
- **Toggle Function:** `toggleAttraction(attractionId)` (`L208–216`) performs exact string `includes(attractionId)` toggle.
- **Persistence:** Pure React in-memory state inside `<TripBuilderProvider destinationConfig={destination}>` (`DestinationPage.jsx` `L182`). Not persisted to `localStorage`. Resets when unmounting `DestinationPage`, **but persists if `slug` param changes within `/destinations/:slug` without unmounting `DestinationPage`!**
- **All Consumers of `selectedAttractions` Across Repo:**
  1. `Interactive3DMap.jsx`: Living route GeoJSON line (`L437`), `.marker-in-trip` class (`L466`), `isCurrentInCart` CTA (`L602`), header counter (`L625`).
  2. `HanoiOldQuarterWalk.jsx` (`Screen 2`, `L54`): Calls `toggleAttraction(activeChapter.id)` where `activeChapter.id` is **`'hang-bac'`, `'cafe-giang'`, `'ma-may-87'`, `'ganh-hang-rong'`**.
  3. `HanoiHeritageChamber.jsx` (`Screen 3`, `L89`, `L93`): Calls `toggleAttraction('van-mieu')` — **exact match** with Map item `#03` (`'van-mieu'`)!
  4. `TripBuilderMorph.jsx` (`Screen 9 / Scene 12`):
     - Step 6 (`L610–649`): Renders checkboxes for `destinationConfig.attractions.items` using `spot.id` and `spot.nameKr || spot.name` / `spot.nameVi || spot.name`.
     - Sticky Summary Pane (`L898–902`): Displays count `tripState.selectedAttractions.length` and **raw `tripState.selectedAttractions.join(', ')`** (`L901` — prints raw slug IDs like `ba-na-hills, hoi-an-ancient-town, my-khe-beach`!).
     - Success Screen (`L158–159`): Displays `tripState.selectedAttractions.length`.
     - `submitTrip` (`TripBuilderContext.jsx` `L287–301`): Generates quote summary.

### 31–32. Three Critical TripBuilder Bugs Discovered in Audit

1. **CRITICAL BUG A — Why Hanoi Shows `3 / 8` Selected on Initial Load (`TripBuilderContext.jsx` `L133` & `L152–158`):**
   - `DEFAULT_TRIP_STATE.selectedAttractions` is hardcoded to **3 Da Nang attraction IDs**: `['ba-na-hills', 'hoi-an-ancient-town', 'my-khe-beach']` (`L133`), and `DEFAULT_TRIP_STATE.accommodationName` is `'Hyatt Regency Danang Resort & Spa'` (`L119`), and `culinaryPreferences` is `['Đặc sản địa phương', 'Hải sản tươi sống']` (`L134`)!
   - When `TripBuilderProvider` mounts on `/destinations/ha-noi` (`L152–158`), it overrides `destination`, `destinationSlug`, `guideLanguage`, and `departureCity`, **but NEVER overrides `selectedAttractions`, `accommodationType`, `accommodationName`, or `culinaryPreferences`!**
   - Consequently, on `/destinations/ha-noi`, `tripState.selectedAttractions` starts with `['ba-na-hills', 'hoi-an-ancient-town', 'my-khe-beach']` (`length === 3`)!
   - Even worse: in `Interactive3DMap.jsx` `L625`, the badge renders `{tripState.selectedAttractions.length} / {destinations.length}`, which displays **`3 / 8`**, even though **0 markers on the Hanoi map are highlighted green** (because none of Hanoi's 8 IDs match `'ba-na-hills'`)! And if a user adds 2 Hanoi landmarks, the counter jumps to **`5 / 8`** (3 ghost Da Nang IDs + 2 Hanoi IDs), and if they add 6 Hanoi landmarks it shows **`9 / 8`**!
2. **BUG B — Cross-Screen Hanoi ID Counting (`Screen 2` vs `Screen 6`):**
   - If a user saves `'hang-bac'` or `'ma-may-87'` in Screen 2 (`HanoiOldQuarterWalk`), `tripState.selectedAttractions` gains `'hang-bac'`. In `Interactive3DMap.jsx` (`L625`), `tripState.selectedAttractions.length` counts `'hang-bac'` against `/ 8` map landmarks even though the map's Old Quarter ID is `'old-quarter'`.
   - **Safe Scoped Fix Inside `Interactive3DMap.jsx` (Without Breaking `TripBuilderContext`):** Compute `selectedInAtlasCount = destinations.filter((d) => tripState.selectedAttractions.includes(d.id)).length` inside `Interactive3DMap.jsx`! That immediately fixes `3 / 8` ghost Da Nang IDs AND prevents `9 / 8` overflow inside Screen 6 without even touching `TripBuilderContext.jsx` (though initializing destination-appropriate defaults in `TripBuilderContext.jsx` when `destinationConfig.id === 'ha-noi'` should also be evaluated with explicit approval).
3. **Identity Safety Across KO ↔ VI:**
   - Unlike culinary items (which historically passed display names), **`toggleAttraction` already uses stable lowercase ASCII slug IDs** (`'hoan-kiem-lake'`, `'van-mieu'`, `'ba-na-hills'`, etc.) everywhere (`Screen 2`, `Screen 3`, `Screen 6`, `TripBuilderMorph`). Toggling KO ↔ VI **never duplicates or loses attraction selections** as long as all 8 Hanoi IDs in `ha-noi.config.js` remain unchanged!

---

## 33–34. KO/VI Language Root Cause & Destination Content Leakage Audit

### 33.1. Exact Root Cause of Issue 02 (Navbar = `VI`, Screen 6 = `KO` + Vietnamese CTA)
Tracing the exact execution path when the user clicks **`VI`** in `DestinationHeader`:
1. `LanguageContext.jsx` (`L42–51`) updates `language = 'vi'` and `isKorean = false`.
2. `DestinationHeader.jsx` (`L17`), `HanoiAwakeningHero`, `HanoiOldQuarterWalk`, `HanoiHeritageChamber`, `HanoiTaste3D`, `HanoiSeasons3D`, `HanoiYourStory`, and `TripBuilderMorph` all call `useLanguage()` directly — so Screens 1–5, 7, 9, and the Navbar immediately switch to Vietnamese.
3. `DestinationPage.jsx` (`L38`) calls `const destination = getDestinationConfig(slug, language);`.
4. Look at `src/features/destinations/data/destinations.config.js` (`L24–37`):
   ```javascript
   export function getDestinationConfig(slug, language = 'ko') {
     const normalized = (slug || '').toLowerCase().trim();
     if (normalized === 'da-nang' || normalized === 'vietnam-danang' || normalized === 'danang') {
       return getLocalizedDaNangConfig(language);
     }
     if (DESTINATION_REGISTRY[normalized]) {
       return DESTINATION_REGISTRY[normalized]; // <-- IGNORES `language` FOR HANOI!
     }
     return null;
   }
   ```
5. `HA_NOI_CONFIG` (`ha-noi.config.js` `L10`) has `locale: 'ko'` hardcoded and Korean strings in `attractions.title`, `resetViewText`, `cartPrefix`, `cartSuffix`, and every item's `name`, `category`, `elevation`, `slogan`, `description`, `tags` (`nameVi` and `titleVi` exist on `HA_NOI_CONFIG.attractions`, **but `Interactive3DMap.jsx` only reads `.title` and `.name`, never `.titleVi` or `.nameVi`, and never calls `useLanguage()`!**).
6. Meanwhile, `HA_NOI_CONFIG.attractions` **omits `btnAdd`, `btnInCart`, and `disclaimer`**. Therefore, `Interactive3DMap.jsx` falls back to its hardcoded Vietnamese strings at `L698`, `L703`, and `L715`:
   - In **VI mode**: Heading, markers, panel, counter, and reset button are **Korean**, while CTA and disclaimer are **Vietnamese** (mentioning Đà Nẵng)!
   - In **KO mode**: Heading, markers, panel, counter, and reset button are **Korean**, while CTA (`Thêm tọa độ này vào chuyến đi`) and disclaimer (`...của Đà Nẵng...`) are STILL **Vietnamese**!
7. **Downstream Bonus Finding (`TripBuilderContext.jsx` `L150`):** `const isKorean = destinationConfig?.locale ? destinationConfig.locale === 'ko' : true;` — because `HA_NOI_CONFIG.locale` never switches to `'vi'`, `TripBuilderContext` thinks Hanoi is ALWAYS in Korean even when `LanguageContext` is `'vi'`! Implementing `getLocalizedHaNoiConfig(language)` (or updating `locale: language` in `getDestinationConfig`) fixes both `Interactive3DMap` and `TripBuilderContext` simultaneously!

### 34. Complete Inventory of Hardcoded Destination / Language Leaks in `Interactive3DMap`
| Location | Hardcoded Content | Leakage Type |
| :--- | :--- | :--- |
| `Interactive3DMap.jsx` `L28–141` | `DEFAULT_DESTINATIONS` (7 Da Nang spots in Vietnamese) | Da Nang + VI fallback |
| `Interactive3DMap.jsx` `L144–149` | `OVERVIEW_CAMERA` (`[108.175, 16.055]`, Da Nang coordinates) | Da Nang camera fallback (needed by Da Nang since `da-nang.config.js` omits `overviewCamera`!) |
| `Interactive3DMap.jsx` `L212` | `attractionsData?.items?.[0]?.id \|\| 'ba-na-hills'` | Da Nang ID fallback |
| `Interactive3DMap.jsx` `L247` | `elevation: item.elevation \|\| 'Đồng bằng'` | Hardcoded VI string |
| `Interactive3DMap.jsx` `L615, 618, 625, 641, 644, 675, 698, 703` | `'THE DISCOVERY ATLAS'`, `'Những Tọa Độ Không Thể Bỏ Lỡ'`, `'Đã chọn'`, `'tọa độ vào lịch trình'`, `'Toàn cảnh'`, `'Đã trong hành trình (Bấm để gỡ)'`, `'Thêm tọa độ này vào chuyến đi'` | Hardcoded VI / EN fallbacks |
| `Interactive3DMap.jsx` `L650` | `<span>REAL 3D TERRAIN & SATELLITE</span>` | Hardcoded English technical badge (not customizable via config) |
| `Interactive3DMap.jsx` `L715` | `'Bản đồ vệ tinh độ phân giải cao kết hợp mô hình số độ cao (DEM) thực tế của Đà Nẵng...'` | **Direct Đà Nẵng city name + DEM leak onto Hà Nội!** |
| `Interactive3DMap.css` `L365` | Dead `.fallback-backdrop-image` URL (`photo-1544735716-392fe2489ffa` — Sơn Trà Da Nang) | Unused CSS rule (`L351–469` `.map-fallback-overlay` is never rendered in JSX) |

---

## 35–37. GSAP, ScrollTrigger & Lenis Interaction Audit

### 35–36. GSAP & ScrollTrigger Lifecycle — Root Cause of Issue 09 (Delayed Right Panel)
In `Interactive3DMap.jsx` (`L529–600`):
- On desktop (`>=993px` and `min-height: 561px`), `ScrollTrigger` **pins `#attractions` for `+=200%`** (`scrub: 1.2`), and on mobile/tablet (`<=992px` and `min-height: 561px`) **pins `#attractions` for `+=130%`**!
- Timeline choreography (`total duration = 0.70` seconds):
  - `0.00 – 0.27` (`0% – 39%` of pin): Header reveals.
  - `0.18 – 0.43` (`26% – 61%` of pin): `mapContainerRef` scales `0.96 → 1.0` (`opacity: 0.75 → 1.0`).
  - **`0.42 – 0.70` (`60% – 100%` of pin): `panelRef` animates from `{ opacity: 0, x: 40 }` to `{ opacity: 1, x: 0 }`!**
- **Why Issue 09 Happens:** Because `tl.fromTo(panelRef.current, { opacity: 0, x: 40 }, ..., 0.42)` sets `immediateRender: true` at `opacity: 0`, **for the entire first 60% of the pinned scroll (~120vh of scrolling on desktop!), the map is visible on the left while the right column is a completely invisible blank void!** Furthermore, there is **0% hold time after `0.70`** (`0.42 + 0.28 = 0.70` is the end of the timeline, so as soon as the panel finishes fading in at `100%` progress, the section immediately unpins!).
- **Recommended Direction for Hanoi (`travel-atlas`):** Disable section pinning (`pinSection: false`) on Hanoi so Screen 6 flows naturally as an interactive workspace after 5 pinned storytelling screens (`Screens 1–5`), using a single lightweight non-pinned entrance (`start: 'top 82%'`, `once: true`) that reveals the header, map, and detail panel **together within `0.5s`** (zero empty right-column gap, zero scroll lock). Keep Da Nang's existing pinned behavior (`pinSection: true` default) untouched unless requested.

### 37. Lenis Smooth Scroll & MapLibre Wheel/Touch Conflict Audit
- **Global Lenis (`LenisManager.js` `L29–38`):** Initialized by `DestinationPage.jsx` with `smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1.5` on `window`.
- **Conflict Mechanics:**
  1. **Desktop Wheel Trap / Dual-Scroll Bug:** MapLibre's `scrollZoom` handler is enabled by default (`new maplibregl.Map` without `scrollZoom: false` or `cooperativeGestures: true`). When a user scrolls down the page and their cursor enters the `66vh`-tall map canvas:
     - MapLibre calls `e.preventDefault()` on `wheel` and zooms the map wildly out to outer space or into rooftops instead of scrolling the page; OR if Lenis intercepts on `window` simultaneously, **both** the page scrolls and the map zooms at the same time!
  2. **Mobile Touch Trap:** On `<=768px`, `Interactive3DMap` currently pins for `+=130%` AND mounts a `340px`-tall interactive drag-pan canvas, making vertical swipe-scrolling past the map frustrating on touchscreens.
- **Recommended Fix (Configurable or Safe Improvement):**
  - Enable MapLibre's built-in `cooperativeGestures: true` (requiring `Ctrl + scroll` / `⌘ + scroll` to zoom on desktop and two-finger drag on touch, with localized hint text) **plus** add `new maplibregl.NavigationControl({ showCompass: true, visualizePitch: true })` (`+ / - / compass` buttons) inside the map corner! This lets normal wheel/single-finger swipe scroll the page via Lenis with **zero scroll trap**, while giving travelers crisp `+ / -` zoom buttons and intentional two-finger / `Ctrl+scroll` map zoom.

---

## 38–41. Responsive Layout, Mobile Strategy, Accessibility & Performance Audit

### 38–39. Desktop, Tablet & Mobile UX Analysis
- **Desktop (`1920×1080`, `1440×900`, `1366×768`):**
  - Current grid `1.85fr 1fr` (`~65%` map / `~35%` panel) matches the target `60–65%` / `35–40%` ratio well, **except** fixed `height: clamp(520px, 66vh, 620px)` + `max-height: 850px` (`360–440px`) crushes the panel on `1366×768` and `1440×900` laptops (`panel-tags-row` is even `display: none` at `max-height: 700px`, `L851–853`!).
  - **Fix for `travel-atlas`:** Use `min-height: 540px` on the stage (sticky/matched map height) while allowing the detail panel to size naturally to its content without clipping descriptions or hiding highlights.
- **Tablet (`820×1180`, `768×1024`) & Mobile (`390×844`, `375×667`, `360×740`):**
  - Current CSS (`<=992px`, `L709–754`) stacks the map (`400px` tablet / `340px` mobile) above `.map-editorial-panel` (`height: auto`).
  - **Recommended Mobile Strategy:** Keep the **inline stacked panel directly below the map** (enhanced with compact horizontal category pills above the map and prominent `← Prev / Next →` controls + numbered quick-jump pills between map and panel) rather than a draggable overlay bottom sheet. An inline panel avoids touch-drag conflicts with Lenis and MapLibre pan gestures, never obscures the `340px–380px` map canvas, and requires zero focus-trap complexity.

### 40. Accessibility Audit
| Check | Current State in `Interactive3DMap` | Required Remediation for Hanoi V1 |
| :--- | :--- | :--- |
| **Semantic Headings** | `<h2 className="map-3d-title">` → `<h3 className="panel-title">` (Good) | Keep `<h2>` → `<h3>` hierarchy. |
| **Markers Keyboard / Screen Reader** | `div.atlas-mapbox-marker` — **unreachable via `Tab`**, no `role`, no `aria-label`! | Render `<button type="button">` markers with `aria-label="{index}. {name} ({selected ? added : explore})"` and `aria-current={isActive ? 'true' : undefined}`. |
| **Non-Map Alternative Navigation** | If WebGL fails or user cannot pan map, there is **no keyboard list** to switch landmarks! (`.fallback-quick-selector` exists in CSS `L430`, not in JSX!) | Previous/Next buttons + compact landmark index strip / filterable list allow 100% map-free keyboard & screen-reader discovery of all 8 landmarks. |
| **Color-Only State** | `.marker-in-trip` only changes dot color from gold `#D4B478` to green `#10B981`. | Add explicit `✓` icon badge on selected markers + text label in panel CTA (`aria-pressed={isCurrentInCart}`). |
| **Provider Attribution** | MapLibre `AttributionControl` visible at bottom-right (`10px`). | Keep visible; add Mapzen/Tilezen attribution when DEM is active and Wikimedia photographer credit on panel photos. |
| **Reduced Motion** | Disables ScrollTrigger pin (`L541`) and CSS transitions (`L759`), **but `map.flyTo` (`L497–505`) passes `essential: true`**, forcing full swooping camera motion even when `prefers-reduced-motion: reduce` is enabled! | Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` inside `handleSelectLandmark` & `resetToOverview`: use `map.jumpTo(...)` or gentle `easeTo({ duration: 250 })` when reduced motion is active. |

### 41. Performance Audit
- **Eager Offscreen WebGL & Tile Initialization (Verified Source Fact):** `Interactive3DMap.jsx` (`L263–285`) mounts MapLibre GL and downloads satellite + DEM tiles immediately at `t = 0` when `/destinations/ha-noi` loads, competing with Screen 1 Hero LCP and holding an active WebGL framebuffer while the user scrolls through ~37 viewports of Screens 1–5.
  - **Recommended Strategy:** Gate MapLibre initialization behind an `IntersectionObserver` with a generous `rootMargin: '1200px 0px'` (approx. 1.3–1.5 viewports before Screen 6 enters, i.e., while the user is in Screen 5 Autumn/Winter). Once initialized, **keep the map instance alive** until route unmount (never destroy/recreate on scroll-away, preserving WebGL state, tile cache, and camera position).
- **Unnecessary DEM Tile Requests on Hanoi:** Disabling `'terrain-dem'` when `terrain.enabled === false` eliminates ~12–20 PNG DEM tile fetches and 3D terrain mesh generation on Hanoi.
- **Live Browser Profiling Metrics (FPS / GPU RAM / Network Transfer):** **`NOT MEASURED`** in this audit because host Chrome remote debugging (`DevToolsActivePort`) is inactive (`ENOENT`).

---

## 42–44. Section Transitions & Navbar Compatibility

### 42. Screen 5 (`HanoiSeasons3D`) → Screen 6 (`Interactive3DMap`) Transition
- **Verified Screen 5 Ending (`seasonAssets.js` `L25` & `HanoiSeasons3D.css` `L379–387`):**
  - Component: `HanoiSeasons3D`, section `id="hanoi-seasons"`.
  - Desktop (`>=993px`): Pinned `+=320%` (`pinSpacing: true`). Season 04 (Winter — misty Hoàn Kiếm & Tháp Rùa) holds from timeline `85` to `100` and ends with a bottom scrim gradient fading directly into **`#080F1C` at `100%`**!
  - Mobile (`<=768px`): Unpinned natural flow; Winter slide bottom scrim also fades into **`#080F1C` at `100%`**.
- **Verified Screen 6 Opening (`Interactive3DMap.css` `L14`, `L38–48`):**
  - Background starts at **`#080F1C`** (`linear-gradient(180deg, #080F1C 0%, #0A1628 45%, ...)`), with `::before` `linear-gradient(to bottom, #061426 0%, transparent 100%)`.
- **Transition Assessment:** The color handoff (`#080F1C` → `#080F1C`) was already calibrated in Screen 5 V1! Removing the delayed `0.42` panel fade-in and initializing MapLibre at `rootMargin: '1200px 0px'` (during Screen 5) ensures the map tiles and detail panel are **already rendered and ready** the moment Screen 5 unpins into Screen 6 — zero black frame, zero white flash, zero empty right column.

### 43. Screen 6 (`Interactive3DMap`) → Screen 7 (`HanoiYourStory`) Transition
- **Verified Next Component on Hanoi (`HanoiExperiencePage.jsx` `L57–60`):**
  - Component: **`HanoiYourStory`** (`src/features/destinations/components/Hanoi/HanoiYourStory/HanoiYourStory.jsx`), section `id="hanoi-story"`.
  - Layout & Styling (`HanoiYourStory.css` `L5–12`): Unpinned natural document flow (`padding: clamp(5rem, 8vw, 7.5rem) 0`), solid dark slate-teal background **`#172026`**, zero ScrollTrigger, zero TripBuilder mutation (opens `ConsultationContext` modal or links to `#trip-builder`).
- **Verified Next Component on Da Nang (`DestinationPage.jsx` `L215`):**
  - Component: **`CulinaryFilmScene`** (`id="culinary"`), pinned `+=360%` desktop / `+=260%` tablet.
- **Transition Assessment:** On Hanoi, `Interactive3DMap` currently ends at `#040A14` / `::after` `#061426` into `HanoiYourStory`'s `#172026`. In `travel-atlas` mode on Hanoi, softening the bottom gradient of `#attractions` to `#172026` (scoped to `.dest-theme-ha-noi .interactive-3d-map-scene` or `layoutVariant === 'travel-atlas'`) will create a seamless visual bridge into Screen 7 in both forward and reverse scroll. Also, unpinning Screen 6 on Hanoi requires calling `ScrollTrigger.refresh()` once layout settles so downstream pinned sections (**Screen 8 `ItineraryStickyTimeline` `#itinerary`** and **Screen 11 `CinematicEndingScene`**) compute exact scroll offsets.

### 44. Navbar & Anchor Compatibility (`destinationNav.config.js` & `DestinationHeader.jsx`)
- **Verified Navbar Entry (`destinationNav.config.js` `L79–84` & `src/locales/vi.json` `L464` / `ko.json` `L464`):**
  - `id: 'attractions'`, `sectionId: 'attractions'`, `labelKey: 'destinationNav.haNoi.attractions'`.
  - Current labels: VI `"Bản đồ 3D"` / KO `"3D 지도"`.
  - Note: `DestinationHeader.jsx` (`L207`) calls `t(item.labelKey, isKorean ? item.labelKo : item.labelVi)`, so **the actual displayed text comes from `src/locales/vi.json` (`L464`) and `src/locales/ko.json` (`L464`) first**, falling back to `destinationNav.config.js`!
- **Anchor & Active-Section Compatibility:**
  - **CRITICAL:** `id="attractions"` **MUST be preserved** on `<section id="attractions">` because `DestinationHeader`, `DestinationFooter` (`L59`), and `ecosystem` configs all target `#attractions`.
  - `DestinationHeader.jsx` (`L80–95`) uses `IntersectionObserver` (`rootMargin: '-80px 0px -55% 0px'`, `threshold: [0, 0.2, 0.5]`) and `lenis.scrollTo(element, { offset: -76 })` (`L125`). Whether Screen 6 is `100vh` unpinned (`~850–980px`) or pinned, `threshold: 0` + `0.2` detects `#attractions` cleanly and scrolls to `-76px` header offset accurately!
  - If renaming Hanoi's navbar label from `"Bản đồ 3D"` / `"3D 지도"` to `"Bản đồ khám phá"` / `"탐방 지도"` is desired in V1, both `destinationNav.haNoi.attractions` in `src/locales/vi.json` + `ko.json` AND `destinationNav.config.js` (`ha-noi` entry only — never `da-nang` or `default`) must be updated together.

---

## 45. Shared Component Impact Matrix — MANDATORY

| # | Proposed Change | Scope (`Shared` vs `Destination-Specific`) | Hanoi Impact (`/destinations/ha-noi`) | Da Nang Impact (`/destinations/da-nang`) | Other / Future Consumers | Breaking Risk | Recommended Safe Strategy |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 1 | **Keep MapLibre GL `^6.18.0` engine** | Shared | Preserves interactive WebGL map & `flyTo` | Zero change | Zero change | **LOW** | Retain `maplibre-gl` dynamic import; fix stale closure & cleanup safety. |
| 2 | **Fix KO/VI Localization (`getLocalizedHaNoiConfig` + `useLanguage` fallback)** | Destination-specific (`ha-noi.config.js` + `destinations.config.js`) + Shared safe fallback | Fixes 100% of Issue 02 & Issue 07 (all headings, markers, panel, counter, buttons switch KO ↔ VI live) | Zero change (`getLocalizedDaNangConfig` untouched) | Enables bilingual support pattern for future configs | **MEDIUM** | Add `getLocalizedHaNoiConfig(language)` in `ha-noi.config.js` wired into `destinations.config.js` (`L31`), mirroring Da Nang's proven pattern without altering `LanguageContext.jsx`. |
| 3 | **Fix Da Nang DEM Disclaimer Leakage** | Destination-specific + Shared generic default | Displays accurate Hanoi travel note in KO & VI | Keeps exact Da Nang DEM disclaimer (`da-nang.config.js` `L409` / `vi.json` `L428`) | Prevents `"Đà Nẵng"` leaking onto future cities | **LOW** | Add `disclaimer` (KO/VI) to `ha-noi.config.js` AND replace `"của Đà Nẵng"` in `Interactive3DMap.jsx` `L715` default fallback with destination-neutral wording. |
| 4 | **Replace All 8 Incorrect Hanoi Attraction Photos** | Destination-specific (`public/assets/destinations/hanoi/attractions/` + `ha-noi.config.js`) + Shared `onError` | Replaces coffee/world-map/lantern/painting/Thailand/ volcano/404-door/studio-pots with 8 verified real Hanoi WebPs | Zero change to Da Nang images | Adds safe `onError` image fallback support for all cities | **LOW** | Curate 8 open-license Wikimedia Commons Hanoi photos as local WebPs + add optional `fallbackImage` & `photoCredit` support in panel JSX. |
| 5 | **Compact Accessible Marker Redesign (3 States: Default / In-Trip / Active)** | Shared opt-in via `markerVariant: 'numbered-atlas'` (default `'legacy-beacon'`) | Eliminates label collisions (Issue 04); adds `<button>`, keyboard focus, `✓` badge, hover/active label | Preserves existing Champagne Gold stem+beacon+elevation markers by default (or optional `<button>` a11y upgrade) | Reusable for dense urban destinations (`ho-chi-minh`, `hue`) | **MEDIUM** | Drive marker template & CSS class via `features.markerStyle` (`'beacon'` default for Da Nang, `'atlas-pin'` for Hanoi). |
| 6 | **Editorial Travel Atlas Detail Panel Redesign** | Shared opt-in via `presentation.layoutVariant: 'travel-atlas'` (default `'legacy-3d'`) | Eliminates `line-clamp` truncation (Issue 06) & glassmorphic GIS look (Issue 08); full KO/VI readability | Preserves Da Nang's existing `.map-editorial-panel` layout & height | Reusable for future cultural destinations | **MEDIUM** | Scope new panel layout styles under `.interactive-3d-map-scene.is-travel-atlas` so Da Nang's CSS rules remain 100% intact. |
| 7 | **Hide Redundant Technical Badges (`elevation`, `REAL 3D TERRAIN & SATELLITE`, `.map-ambient-grid`)** | Config-driven (`features.showElevation`, `showLiveBadge`, `showAmbientGrid`) | Removes meaningless `14m–18m` & GIS badge clutter on Hanoi (Issue 05 & 08) | Defaults to `true` so Da Nang keeps `1,487 m` elevation & `REAL 3D TERRAIN & SATELLITE` badge | Configurable per city (e.g. `true` for Sa Pa, `false` for HCMC) | **LOW** | Default all three flags to `true` when omitted; set `false` in `ha-noi.config.js`. |
| 8 | **Add Suggested Visit Duration (`duration`)** | Shared optional field (`activeLandmark.duration`) | Displays practical visit duration (`45–90 phút`, etc.) for each Hanoi landmark | Da Nang config **already has `duration`** — either gate behind `features.showDuration` or display cleanly | Ready for all destinations | **LOW** | Gate display via `features.showDuration && activeLandmark.duration` (`true` on Hanoi, `false` default so Da Nang panel height never overflows). |
| 9 | **Add Curated Experiences List** | Shared optional field (`experiences` or `tags`) | Renders 3–4 scannable experience highlights per Hanoi landmark in KO & VI | Da Nang keeps `.panel-tags-row` pills | Ready for all destinations | **LOW** | Render editorial list in `travel-atlas` variant using `activeLandmark.experiences || activeLandmark.tags`. |
| 10 | **Previous / Next Landmark Navigation (`← 1 / 8 →`)** | Config-driven (`features.previousNextNavigation`) | Lets desktop, mobile & keyboard users step through all 8 Hanoi spots effortlessly | Disabled by default (`false`) on Da Nang unless enabled | Reusable across all destinations | **LOW** | Sync `selectedLandmarkId` + `flyTo` over `filteredDestinations` without mutating `TripBuilderContext`. |
| 11 | **Data-Driven Category Filter Bar** | Config-driven (`features.categoryFilters` + `categories`) | Filters Hanoi's 8 landmarks (`Tất cả`, `Di sản`, `Kiến trúc`, `Hồ & Thiên nhiên`, `Làng nghề`) | Disabled when `features.categoryFilters` is falsy (Da Nang unaffected) | Destination-specific categories supported via config | **MEDIUM** | Filter visible markers & Prev/Next list only; never remove hidden items from `tripState.selectedAttractions`. |
| 12 | **Map Style Switching (Street ↔ Satellite)** | Config-driven (`features.styleSwitcher`) | **Gated on verified commercial-safe street tile provider** (`NEEDS_PROVIDER_REVIEW`) | Disabled (`false`) on Da Nang so 3D satellite + DEM stays primary | Optional per destination | **HIGH** | Do NOT call destructive `setStyle()`; use dual-source layer `visibility` toggle **only if** an approved street tile provider is confirmed; otherwise defer cleanly. |
| 13 | **TripBuilder Scoped Selection Count & Hanoi Initial State** | Shared counter fix in `Interactive3DMap.jsx` + optional `TripBuilderContext` destination init | Fixes **`3 / 8` ghost Da Nang IDs bug** on Hanoi; CTA cleanly toggles stable Hanoi IDs | Da Nang still starts with its 3 default IDs (`3 / 7`) and `TripBuilderMorph` works identically | Prevents cross-destination ID pollution on all future cities | **HIGH** | (1) In `Interactive3DMap.jsx`, count `destinations.filter(d => selectedAttractions.includes(d.id)).length`; (2) In `TripBuilderContext.jsx` (if approved), initialize `selectedAttractions` from `destinationConfig.defaultSelectedAttractions ?? (slug === 'da-nang' ? [...] : [])`. |
| 14 | **Mobile Inline Stacked Presentation** | Shared CSS + `travel-atlas` mobile refinements | Clean unpinned mobile flow: Filters → Map (`360px`) → Quick Prev/Next → Full Panel | Preserves Da Nang mobile layout | Works across `360px–992px` | **LOW** | Keep inline stacked panel (no scroll-trapping bottom sheet). |
| 15 | **Camera Interaction, Reduced Motion & Cooperative Gestures** | Config-driven camera/terrain + Shared `prefers-reduced-motion` safety | Gentler Hanoi overview (`pitch: 32°`, `terrain.enabled: false`), smooth interruptible `flyTo`, `jumpTo` on reduced motion | Preserves Da Nang `OVERVIEW_CAMERA` (`pitch: 58°`) and `terrain: { enabled: true, exaggeration: 1.42 }` | Prevents camera sickness on reduced-motion users | **HIGH** | Keep exact Da Nang camera/terrain defaults when config fields are omitted; add `NavigationControl` + `cooperativeGestures` option. |
| 16 | **GSAP / ScrollTrigger Lifecycle (Fix Issue 09 Delayed Panel)** | Config-driven (`features.pinSection`, default `true`) | `pinSection: false` on Hanoi eliminates `+=200%` pin & `0.42` delayed panel void; map + panel appear together! | `pinSection: true` default preserves Da Nang's `+=200%` pinned reveal | Allows future pages to choose pinned vs natural flow | **MEDIUM** | Branch cleanly inside `gsap.matchMedia()` based on `pinSection`; run `ScrollTrigger.refresh()` after mount. |
| 17 | **Lazy Near-Viewport Map Initialization (`IntersectionObserver`)** | Shared optimization (`rootMargin: '1200px 0px'`) | Stops Screen 6 from competing with Screen 1 Hero LCP while still loading before Screen 5 ends; zero DEM requests on Hanoi | Defers Scene 08 tile burst until approaching Scene 07 on Da Nang, keeping WebGL context alive once mounted | Improves initial load across all destinations | **MEDIUM** | Use `IntersectionObserver` (`1200px` margin) + keep map mounted once initialized (never destroy on scroll-out). |
| 18 | **Screen 5 → Screen 6 → Screen 7 Transitions** | Hanoi-scoped CSS/scrim handoff | Seamless `#080F1C` entry from Screen 5 Winter and smooth `#172026` exit into Screen 7 `HanoiYourStory` | Da Nang `::before`/`::after` `#061426` transitions into `CulinaryFilmScene` remain untouched | Scoped by `.dest-theme-ha-noi` / `layoutVariant` | **LOW** | Scope bottom gradient `#172026` strictly to `.is-travel-atlas` / `.dest-theme-ha-noi`. |

---

## 46–48. Architecture Alternatives, Recommended Architecture & Proposed File Structure

### 46. Comparison of Architectural Alternatives

| Criterion | Option A: Minimal In-Place Patch of `Interactive3DMap.jsx` | **Option B (RECOMMENDED): Configuration-Driven Shared `Interactive3DMap` + Modular Subcomponents** | Option C: Separate `HanoiTravelAtlas.jsx` Fork Copying MapLibre Engine |
| :--- | :--- | :--- | :--- |
| **Complexity** | Low initially, but bloats a 723-line file past 1,100+ lines with `if/else` branches | **Moderate & Clean** — Map engine stays ~320 lines; UI subcomponents are focused & testable | High duplication (~600 lines of duplicated MapLibre, marker, route & TripBuilder code) |
| **Maintainability** | Poor (8 responsibilities tangled in one file) | **High** (Single MapLibre lifecycle, data-driven features & `layoutVariant`) | Poor (bug fixes to MapLibre/TripBuilder must be patched in multiple places) |
| **Da Nang Regression Risk** | Medium (easy to accidentally alter shared JSX/CSS) | **Very Low** (All new behaviors opt-in via config flags; defaults match Da Nang 1:1) | Very Low for Da Nang, High drift risk long-term |
| **Reusability for 8 Future Cities** | Low | **High** (Hue/HCMC can enable `travel-atlas`; Sa Pa/Ha Long can enable `terrain: true` + `travel-atlas`!) | Zero (would encourage 10 city forks) |

### 47. Recommended Architecture: **Option B (Configuration-Driven Shared Component)**
Keep **one shared `Interactive3DMap`** mounted by both `HanoiExperiencePage.jsx` and `DestinationPage.jsx` with `attractionsData={destination.attractions}` (zero parent signature breakage!). Drive Hanoi's **Interactive Travel Atlas** experience entirely through:
1. **`getLocalizedHaNoiConfig(language)`** in `ha-noi.config.js` + `destinations.config.js` (`L31`) supplying full KO/VI data, verified local WebP paths, camera (`pitch: 32°`), `terrain: { enabled: false }`, and `features` / `presentation: { layoutVariant: 'travel-atlas' }`.
2. **Backward-compatible defaults** in `Interactive3DMap` so Da Nang (`da-nang.config.js`) continues to receive `OVERVIEW_CAMERA`, `terrain: { enabled: true, exaggeration: 1.42 }`, `pinSection: true`, `showElevation: true`, and `showLiveBadge: true` without changing a single behavior on `/destinations/da-nang`.

### 48–50. Proposed File Structure, Future Modified Files & Protected Files

#### Proposed Minimal File Structure (For Future V1 Implementation)
```text
src/features/destinations/components/Interactive3DMap/
├── Interactive3DMap.jsx                 (Shared orchestrator, MapLibre lifecycle, GSAP entrance, backward-compatible defaults)
├── Interactive3DMap.css                 (Existing Da Nang styles preserved + scoped .is-travel-atlas editorial styles)
└── components/
    ├── AttractionFilters.jsx            (Optional data-driven category filter bar & selection summary)
    └── AttractionDetailPanel.jsx        (Clean editorial panel with image fallback, duration, highlights, CTA & Prev/Next nav)

public/assets/destinations/hanoi/attractions/
└── {8 verified Hanoi landmark WebP pairs: desktop + mobile}
```
*(Note: Separating `AttractionMarker.jsx` or `useDestinationMap.js` is unnecessary overhead because MapLibre markers are imperative DOM elements managed inside a single `useEffect`; keeping map + marker refs together in `Interactive3DMap.jsx` avoids ref-forwarding complexity.)*

#### Files Requiring Modification in Future V1 Implementation
1. `src/features/destinations/data/destinations.config.js` — Wire `getLocalizedHaNoiConfig(language)` for `'ha-noi' | 'hanoi' | 'vietnam-hanoi'`.
2. `src/features/destinations/data/ha-noi.config.js` — Add full Vietnamese translations + `getLocalizedHaNoiConfig(language)`, verified local WebP paths, `duration`, `categoryId`, `terrain: { enabled: false }`, `overviewCamera` (`pitch: 32`), `features`, `presentation: { layoutVariant: 'travel-atlas' }`, and refined Văn Miếu coordinate.
3. `src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx` (+ `components/AttractionFilters.jsx`, `components/AttractionDetailPanel.jsx`) — Config-driven terrain/pinning/badges/markers, `IntersectionObserver` lazy init, scoped selection counter (`selectedInAtlasCount`), keyboard-accessible markers, reduced-motion `jumpTo`, and neutral fallback strings.
4. `src/features/destinations/components/Interactive3DMap/Interactive3DMap.css` — Fix `.panel-content-body`/`.panel-title` responsive typo + add scoped `.is-travel-atlas` styles.
5. `public/assets/destinations/hanoi/attractions/*` — 8 verified Wikimedia Commons Hanoi landmark WebP assets.
6. *(Optional, only if approved)* `src/features/destinations/context/TripBuilderContext.jsx` — Initialize `selectedAttractions` / `culinaryPreferences` / `accommodationName` cleanly when `destinationConfig.id !== 'da-nang'` so Hanoi `TripBuilderMorph` Step 6 doesn't start with 3 Da Nang IDs.
7. *(Optional, only if approved)* `src/locales/vi.json`, `src/locales/ko.json`, `src/features/destinations/data/destinationNav.config.js` — Update Hanoi navbar label from `"Bản đồ 3D"` / `"3D 지도"` to `"Bản đồ khám phá"` / `"탐방 지도"` while keeping `sectionId: 'attractions'`.

#### Strictly Protected Files (Must NOT Be Modified)
- `deploy.ps1`, `rollback.ps1`, `package.json`, lockfiles, `.env*`
- Hanoi Screen 1 (`HanoiAwakeningHero`), Screen 2 (`HanoiOldQuarterWalk`), Screen 3 (`HanoiHeritageChamber`), Screen 4 (`HanoiTaste3D`), Screen 5 (`HanoiSeasons3D`), Screen 7 (`HanoiYourStory`), Screen 8 (`ItineraryStickyTimeline`), Screen 9 (`TripBuilderMorph`), Screen 10 (`CustomerStories`), Screen 11 (`CinematicEndingScene`)
- `HanoiExperiencePage.jsx`, `DestinationPage.jsx`, `da-nang.config.js`, `src/locales/destinations/da-nang/*`, `LanguageContext.jsx`, `LenisManager.js`, `DestinationHeader.jsx`, `DestinationFooter.jsx`.

---

## 51. Cross-Destination Regression Test Plan

| Target | Test Case | Expected Pass Criteria |
| :--- | :--- | :--- |
| **Hanoi (`/destinations/ha-noi`)** | 1. Initial Load & Lazy Init | Map initializes smoothly before Screen 6 enters viewport; right detail panel is 100% visible immediately alongside map (zero blank column). |
| **Hanoi** | 2. All 8 Landmark Photos & Coordinates | Clicking `01`..`08` displays the exact real Hanoi landmark photo (zero coffee/404/Thailand/Indonesia stock) and flies smoothly to verified Hanoi coordinates with `terrain` disabled (`0` DEM requests). |
| **Hanoi** | 3. KO ↔ VI Live Toggle | Switching `KO` ↔ `VI` in `DestinationHeader` updates section kicker/title, category pills, marker labels, panel title/tagline/description/duration/highlights, counter, reset button, CTA, and disclaimer without remounting MapLibre or losing camera/active/selected state. |
| **Hanoi** | 4. Marker Collision & 3-State Visuals | Compact numbered `<button>` markers (`01`..`08`) have zero overlap at overview zoom; Default, In-Trip (`✓`), Active (name pill), and Active+In-Trip states are visually & programmatically distinct. |
| **Hanoi** | 5. Category Filters & Prev/Next | Filtering hides non-matching markers without removing selected items from `TripBuilderContext`; `← Prev / Next →` cycles visible landmarks cleanly. |
| **Hanoi** | 6. TripBuilder Sync (`Screen 2`, `Screen 3`, `Screen 6`, `Screen 9`) | Counter starts at `0 / 8` (not `3 / 8` Da Nang IDs!); selecting `Văn Miếu` in Screen 3 shows `van-mieu` checked in Screen 6 & Screen 9 `TripBuilderMorph` Step 6; toggling CTA in Screen 6 updates Screen 9 immediately. |
| **Hanoi** | 7. Mobile (`390×844`) & Reduced Motion | Unpinned natural scroll; Lenis wheel/touch scroll never gets trapped inside map; `prefers-reduced-motion: reduce` uses instant `jumpTo`. |
| **Hanoi** | 8. Screen 5 → 6 → 7 & Navbar `#attractions` | Seamless `#080F1C` handoff from Screen 5 Winter and `#172026` handoff into Screen 7 `HanoiYourStory`; clicking Navbar `"Bản đồ..."` scrolls accurately to `#attractions`. |
| **Da Nang (`/destinations/da-nang`)** | 9. Full Production Preservation | `OVERVIEW_CAMERA` (`[108.175, 16.055], zoom 10.65, pitch 58, bearing -15`), `exaggeration: 1.42` 3D mountains, 7 landmarks, gold beacon markers with elevation (`1,487 m`), pinned `+=200%` reveal, `3 / 7` default selection, KO/VI toggle, and transition into `CulinaryFilmScene` behave identically to baseline. |
| **Shared / Route Switching** | 10. `/destinations/da-nang` ↔ `/destinations/ha-noi` ↔ `/destinations/sa-pa` | WebGL context & markers clean up with zero console errors or memory leaks; `sa-pa` renders `Coming Soon` fallback cleanly. |

---

## 52–53. Current Browser Baseline & Screenshot Inventory

- **Live Browser Automation Status:** **`BLOCKED` (Host Environment Limitation)**
- **Exact Error Message:** `Could not find DevToolsActivePort for chrome at C:\Users\DUNG\AppData\Local\Google\Chrome\User Data\DevToolsActivePort (ENOENT)` (confirmed via `Test-Path "$env:LOCALAPPDATA\Google\Chrome\User Data\DevToolsActivePort"` returning `Access is denied / False`).
- **Tests Not Executed Live & Manual Verification Needed:** Live headless/CDP screenshots of Hanoi Desktop VI/KO, Hanoi Mobile, Da Nang Desktop/Mobile terrain, live WebGL console/network inspection, and runtime FPS/RAM profiling could not be captured without Chrome `--remote-debugging-port=9222`. No fabricated screenshots were generated. All 8 current Hanoi remote image URLs were instead fetched via Python and directly inspected visually (Section 17).

---

## 54. Exact Required Source Excerpts (All 34 Checkpoints)

### Excerpt 01–04: Imports, Component Signature, Props Contract & Defaults
- **File:** [Interactive3DMap.jsx](file:///D:/workplace/SuperEZTour/src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx#L1-L256) (`Lines 1–23, 144–149, 200–256`)
```jsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTripBuilder } from '../../context/TripBuilderContext';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Interactive3DMap.css';
...
const OVERVIEW_CAMERA = { center: [108.175, 16.055], zoom: 10.65, pitch: 58, bearing: -15 };
...
const Interactive3DMap = ({ attractionsData }) => {
  const initialLandmarkId = attractionsData?.items?.[0]?.id || 'ba-na-hills';
  const [selectedLandmarkId, setSelectedLandmarkId] = useState(initialLandmarkId);
  const [isOverviewMode, setIsOverviewMode] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { tripState, toggleAttraction } = useTripBuilder();

  const activeOverviewCamera = useMemo(() => {
    return attractionsData?.overviewCamera || {
      center: attractionsData?.mapCenter || OVERVIEW_CAMERA.center,
      zoom: attractionsData?.defaultZoom || OVERVIEW_CAMERA.zoom,
      pitch: OVERVIEW_CAMERA.pitch,
      bearing: OVERVIEW_CAMERA.bearing
    };
  }, [attractionsData]);

  const destinations = useMemo(() => {
    const rawItems = attractionsData?.items || [];
    if (rawItems.length > 0) {
      return rawItems.map((item, index) => ({
        ...item,
        routeIndex: item.routeIndex || (index < 9 ? `0${index + 1}` : `${index + 1}`),
        bearing: item.bearing !== undefined ? item.bearing : -20,
        pitch: item.pitch !== undefined ? item.pitch : 50,
        zoom: item.zoom !== undefined ? item.zoom : 15,
        elevation: item.elevation || 'Đồng bằng',
        tags: item.tags || []
      }));
    }
    return DEFAULT_DESTINATIONS;
  }, [attractionsData]);
```
- *Explanation:* Shows single `{ attractionsData }` prop, absence of `useLanguage()`, and Da Nang `OVERVIEW_CAMERA` / `DEFAULT_DESTINATIONS` fallbacks.
- *Refactor Risk & Affected Consumers:* **HIGH** — Da Nang relies directly on `OVERVIEW_CAMERA` because `da-nang.config.js` does not define `overviewCamera`.

### Excerpt 05–07: Hanoi Parent, Da Nang Parent & Coming-Soon Consumer Mounting
- **Files:** [HanoiExperiencePage.jsx](file:///D:/workplace/SuperEZTour/src/features/destinations/components/Hanoi/HanoiExperiencePage.jsx#L52-L55) (`Lines 52–55`) & [DestinationPage.jsx](file:///D:/workplace/SuperEZTour/src/features/destinations/DestinationPage.jsx#L181-L213) (`Lines 181–213`)
```jsx
// HanoiExperiencePage.jsx (Lines 52-55)
{/* SCENE 06 — HANOI INTERACTIVE ATLAS (MapLibre 3D Discovery Engine) */}
<ErrorBoundary isolated>
  <Interactive3DMap attractionsData={destination.attractions} />
</ErrorBoundary>

// DestinationPage.jsx (Lines 181-189, 211-213)
<TripBuilderProvider destinationConfig={destination}>
  {destination.id === 'ha-noi' ? (
    <HanoiExperiencePage destination={destination} onAddQuote={onAddQuote} onOpenConsultModal={openNewConsultation} />
  ) : (
    <div className={`dest-engine dest-engine-immersive dest-theme-${destination.id}`}>
      ...
      {/* Scene 08: Interactive 3D Destination Map & Cart */}
      <Interactive3DMap attractionsData={destination.attractions} />
```
- *Explanation:* Both active routes pass `attractionsData={destination.attractions}`. Other 8 destinations return `null` from `getDestinationConfig` and render `.dest-coming-soon-wrapper` (`DestinationPage.jsx` `L134–179`).
- *Refactor Risk & Affected Consumers:* **LOW** if `attractionsData` prop signature is kept unchanged (neither parent file needs editing!).

### Excerpt 08–09 & 21: Attraction Data Source Registry, Language Bug & Full Hanoi Attractions Data
- **Files:** [destinations.config.js](file:///D:/workplace/SuperEZTour/src/features/destinations/data/destinations.config.js#L24-L37) (`Lines 24–37`) & [ha-noi.config.js](file:///D:/workplace/SuperEZTour/src/features/destinations/data/ha-noi.config.js#L435-L591) (`Lines 435–591`)
```javascript
// destinations.config.js (Lines 24-37) — ROOT CAUSE OF ISSUE 02 (KO/VI BUG)
export function getDestinationConfig(slug, language = 'ko') {
  const normalized = (slug || '').toLowerCase().trim();
  if (normalized === 'da-nang' || normalized === 'vietnam-danang' || normalized === 'danang') {
    return getLocalizedDaNangConfig(language);
  }
  if (DESTINATION_REGISTRY[normalized]) {
    return DESTINATION_REGISTRY[normalized]; // Returns raw Korean HA_NOI_CONFIG even when language === 'vi'!
  }
  return null;
}

// ha-noi.config.js (Lines 435-470, abbreviated from 8 items in L453-590; full table in Section 12.2)
attractions: {
  kicker: 'THE HANOI DISCOVERY ATLAS',
  title: '하노이의 정수를 담은 핵심 랜드마크',
  titleVi: 'Bản Đồ Khám Phá Hà Nội 3D Độc Bản',
  subtitle: '호안끼엠 호수 중심에서부터 천년 문묘, 유네스코 탕롱 황성, 서호와 도예 마을까지.',
  mapCenter: [105.8525, 21.0285],
  defaultZoom: 12.8,
  overviewCamera: { center: [105.8525, 21.0285], zoom: 12.6, pitch: 52, bearing: -18 },
  resetViewText: '하노이 전경 복원',
  atlasName: 'THE HANOI ATLAS',
  cartPrefix: '일정 담기',
  cartSuffix: '곳 선택됨',
  categories: ['전체', '역사유산', '건축명소', '호수·자연', '문화예술'],
  items: [
    {
      id: 'hoan-kiem-lake',
      name: '호안끼엠 호수 & 응옥선 사당',
      nameVi: 'Hồ Hoàn Kiếm & Đền Ngọc Sơn',
      category: '호수·자연',
      elevation: '해발 15m · 도심 중심',
      lng: 105.8525, lat: 21.0285, zoom: 15.2, pitch: 45, bearing: 0, routeIndex: '01',
      slogan: '하노이의 푸른 심장이자 천년의 영혼',
      description: '붉은 테훅 다리를 건너 응옥선 사당으로 이어지는 평온한 산책길...',
      tags: ['거북탑', '테훅 다리', '호수 산책로', '야경 명소'],
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80' // Latte art coffee photo!
    },
    // + 02 old-quarter, 03 van-mieu, 04 thang-long-citadel, 05 st-joseph-cathedral,
    //   06 opera-house, 07 tran-quoc-pagoda, 08 bat-trang-village (Lines 471-590)
  ]
}
```
- *Explanation:* Confirms `HA_NOI_CONFIG` is never localized on `language === 'vi'`, lacks `btnAdd` / `btnInCart` / `disclaimer` / Vietnamese item fields, and uses mismatched Unsplash URLs.
- *Refactor Risk & Affected Consumers:* **MEDIUM** — Adding `getLocalizedHaNoiConfig(language)` affects `HanoiExperiencePage`, `TripBuilderContext`, `TripBuilderMorph`, `DestinationHeader`, and `Interactive3DMap` (positively fixing VI mode across all of them; verify all existing `HA_NOI_CONFIG` keys remain intact).

### Excerpt 10–17 & 31: Map Constructor, Satellite & DEM Sources, Terrain, Camera, Markers, Labels, Handlers & Cleanup
- **File:** [Interactive3DMap.jsx](file:///D:/workplace/SuperEZTour/src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx#L155-L425) (`Lines 155–198, 263–425, 488–524`)
```jsx
const SATELLITE_3D_STYLE = {
  version: 8,
  sources: {
    'esri-satellite': {
      type: 'raster',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256, maxzoom: 19,
      attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
    },
    'terrain-dem': {
      type: 'raster-dem',
      tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
      encoding: 'terrarium', tileSize: 256, maxzoom: 14
    }
  },
  layers: [{ id: 'esri-satellite-layer', type: 'raster', source: 'esri-satellite', minzoom: 0, maxzoom: 19 }],
  terrain: { source: 'terrain-dem', exaggeration: 1.42 },
  sky: { 'sky-color': '#061426', 'sky-horizon-blend': 0.15, 'horizon-color': '#0a1628', 'horizon-fog-blend': 0.2, 'fog-color': '#061426', 'fog-ground-blend': 0.35 }
};
...
useEffect(() => {
  if (!mapContainerRef.current) return;
  let isCancelled = false;
  let mapInstance = null;

  import('maplibre-gl').then((maplibregl) => {
    if (isCancelled || !mapContainerRef.current) return;
    mapInstance = new maplibregl.Map({
      container: mapContainerRef.current,
      style: SATELLITE_3D_STYLE,
      center: activeOverviewCamera.center,
      zoom: activeOverviewCamera.zoom,
      pitch: activeOverviewCamera.pitch,
      bearing: activeOverviewCamera.bearing,
      maxPitch: 85, antialias: true, attributionControl: true
    });
    mapRef.current = mapInstance;

    mapInstance.on('load', () => {
      if (isCancelled) return;
      if (!mapInstance.getTerrain()) {
        mapInstance.setTerrain({ source: 'terrain-dem', exaggeration: 1.42 });
      }
      ...
      destinations.forEach((dest) => {
        const el = document.createElement('div');
        el.className = `atlas-mapbox-marker ${dest.id === selectedLandmarkId ? 'marker-active' : ''}`;
        el.dataset.id = dest.id;
        el.innerHTML = `
          <div class="marker-leader-stem"></div>
          <div class="marker-beacon-head"><span class="marker-beacon-dot"></span></div>
          <div class="marker-floating-label"><span class="marker-name"></span><span class="marker-alt"></span></div>
        `;
        el.querySelector('.marker-name').textContent = dest.name || '';
        el.querySelector('.marker-alt').textContent = dest.elevation || '';
        el.addEventListener('click', (e) => { e.stopPropagation(); handleSelectLandmark(dest.id); });
        const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' }).setLngLat([dest.lng, dest.lat]).addTo(mapInstance);
        markersRef.current.push(marker);
      });
      setMapLoaded(true);
    });
  });

  return () => {
    isCancelled = true;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
  };
}, []);
```
- *Explanation:* Hardcodes `exaggeration: 1.42`, mounts immediately on route load, creates non-focusable `<div>` markers with always-visible name+elevation labels, and captures initial `handleSelectLandmark` closure.
- *Refactor Risk & Affected Consumers:* **HIGH** — Must preserve `SATELLITE_3D_STYLE` + `exaggeration: 1.42` when `terrain.enabled !== false` for Da Nang.

### Excerpt 18–20 & 22–25: Active State, Selection State, TripBuilder Default Bug, Detail Panel JSX, Image Tag, Counter & Technical Note
- **Files:** [TripBuilderContext.jsx](file:///D:/workplace/SuperEZTour/src/features/destinations/context/TripBuilderContext.jsx#L132-L158) (`Lines 132–158`) & [Interactive3DMap.jsx](file:///D:/workplace/SuperEZTour/src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx#L602-L718) (`Lines 602–718`)
```jsx
// TripBuilderContext.jsx (Lines 132-135, 149-158) — ROOT CAUSE OF "3 / 8" GHOST SELECTION ON HANOI
selectedAttractions: ['ba-na-hills', 'hoi-an-ancient-town', 'my-khe-beach'],
culinaryPreferences: ['Đặc sản địa phương', 'Hải sản tươi sống'],
...
export const TripBuilderProvider = ({ children, destinationConfig }) => {
  const isKorean = destinationConfig?.locale ? destinationConfig.locale === 'ko' : true;
  const [tripState, setTripState] = useState(() => ({
    ...DEFAULT_TRIP_STATE, // <-- Inherits 3 Da Nang attraction IDs even on Hanoi!
    destination: isKorean ? (destinationConfig?.nameKr || '다낭') : (destinationConfig?.name || 'Đà Nẵng'),
    destinationSlug: destinationConfig?.slug || 'da-nang',
    ...
  }));

// Interactive3DMap.jsx (Lines 602, 622-627, 647-717)
const isCurrentInCart = tripState.selectedAttractions.includes(activeLandmark.id);
...
<div className="map-cart-badge" ref={cartBadgeRef}>
  <Sparkles size={14} className="map-cart-icon" aria-hidden="true" />
  <span>
    {attractionsData?.cartPrefix || 'Đã chọn'}: <strong>{tripState.selectedAttractions.length}</strong> / {destinations.length} {attractionsData?.cartSuffix || 'tọa độ vào lịch trình'}
  </span>
</div>
...
<div className="map-live-badge">
  <span className="live-pulse-dot" />
  <span>REAL 3D TERRAIN & SATELLITE</span>
</div>
...
<aside className="map-editorial-panel" ref={panelRef}>
  <div className="panel-img-frame">
    <img key={activeLandmark.id} src={activeLandmark.image} alt={activeLandmark.name} className="panel-img" loading="lazy" />
    ...
  </div>
  <div className="panel-content-body">
    ...
    <button type="button" className={`panel-add-btn ${isCurrentInCart ? 'btn-in-cart' : ''}`} onClick={() => toggleAttraction(activeLandmark.id)}>
      {isCurrentInCart ? (
        <><Check size={15} /><span>{attractionsData?.btnInCart || 'Đã trong hành trình (Bấm để gỡ)'}</span></>
      ) : (
        <><Plus size={15} /><span>{attractionsData?.btnAdd || 'Thêm tọa độ này vào chuyến đi'}</span></>
      )}
    </button>
  </div>
</aside>
...
<div className="map-disclaimer">
  <Info size={13} className="disclaimer-icon" aria-hidden="true" />
  <span>
    {attractionsData?.disclaimer || 'Bản đồ vệ tinh độ phân giải cao kết hợp mô hình số độ cao (DEM) thực tế của Đà Nẵng. Lộ trình thực địa và thời gian di chuyển sẽ được Super EZ Tour cá nhân hóa và tối ưu theo nhu cầu của quý khách.'}
  </span>
</div>
```
- *Explanation:* Demonstrates how `tripState.selectedAttractions.length` (`3` Da Nang IDs) renders `3 / 8` on Hanoi, how `<img>` lacks `onError` fallback, and how missing `btnAdd` / `disclaimer` on Hanoi leaks Vietnamese CTA & Đà Nẵng DEM text.
- *Refactor Risk & Affected Consumers:* **HIGH** for `TripBuilderContext.jsx`; **LOW** for scoping `selectedInAtlasCount` and neutral fallbacks inside `Interactive3DMap.jsx`.

### Excerpt 26–29: Root CSS, Responsive CSS & GSAP Pinned ScrollTrigger Timeline
- **Files:** [Interactive3DMap.css](file:///D:/workplace/SuperEZTour/src/features/destinations/components/Interactive3DMap/Interactive3DMap.css#L6-L21) (`Lines 6–21, 139–158, 486, 597–607, 709–754`) & [Interactive3DMap.jsx](file:///D:/workplace/SuperEZTour/src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx#L529-L600) (`Lines 529–600`)
```css
/* Interactive3DMap.css */
.interactive-3d-map-scene { position: relative; width: 100%; min-height: 100vh; overflow: hidden; background: ..., linear-gradient(180deg, #080F1C 0%, #0A1628 45%, #061426 85%, #040A14 100%); }
.interactive-3d-map-scene .map-atlas-stage { display: grid; grid-template-columns: 1.85fr 1fr; gap: clamp(1.25rem, 2.5vw, 2rem); }
.interactive-3d-map-scene .map-editorial-panel { overflow: hidden; height: clamp(520px, 66vh, 620px); }
.interactive-3d-map-scene .panel-desc { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
@media (max-width: 992px) {
  .interactive-3d-map-scene .map-atlas-stage { grid-template-columns: 1fr; }
  .interactive-3d-map-scene .map-canvas-wrapper { height: 400px; }
  .interactive-3d-map-scene .map-editorial-panel { height: auto; }
}
```
```jsx
// Interactive3DMap.jsx (Lines 543-592) — ROOT CAUSE OF ISSUE 09 (DELAYED PANEL)
const pinDistance = isDesktop && !isShortHeight ? '+=200%' : !isShortHeight ? '+=130%' : null;
const tl = gsap.timeline({
  scrollTrigger: { trigger: containerRef.current, start: 'top top', end: pinDistance, pin: true, scrub: 1.2, anticipatePin: 1 }
});
...
// 45–65%: Editorial Panel Slide-in Reveal (Panel stays opacity: 0 until timeline 0.42!)
if (panelRef.current) {
  tl.fromTo(panelRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, ease: 'power2.out', duration: 0.28 }, 0.42);
}
```
- *Explanation:* Confirms fixed panel height + `line-clamp: 3` truncation and the `0.42` scrubbed delay hiding the right panel while the map is already visible.
- *Refactor Risk & Affected Consumers:* **MEDIUM** — Keep pinned timeline when `pinSection !== false` (Da Nang); bypass pinning when `pinSection === false` (Hanoi).

### Excerpt 30 & 32–34: Lenis Manager, Navbar Anchor, Screen 5 Ending & Screen 7 Opening
- **Files:** [LenisManager.js](file:///D:/workplace/SuperEZTour/src/features/destinations/motion/LenisManager.js#L29-L45) (`L29–45`), [destinationNav.config.js](file:///D:/workplace/SuperEZTour/src/features/destinations/data/destinationNav.config.js#L79-L84) (`L79–84`), [seasonAssets.js](file:///D:/workplace/SuperEZTour/src/features/destinations/components/Hanoi/HanoiSeasons3D/seasonAssets.js#L24-L25) (`L24–25`), & [HanoiYourStory.jsx](file:///D:/workplace/SuperEZTour/src/features/destinations/components/Hanoi/HanoiYourStory/HanoiYourStory.jsx#L116-L127) (`L116–127` + `.css` `L5–12`)
```javascript
// LenisManager.js (Lines 29-45)
lenisInstance = new Lenis({ duration: 1.2, orientation: 'vertical', gestureOrientation: 'vertical', smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1.5 });
lenisInstance.on('scroll', () => { ScrollTrigger.update(); });

// destinationNav.config.js (Lines 79-84)
{ id: 'attractions', sectionId: 'attractions', labelKey: 'destinationNav.haNoi.attractions', labelVi: 'Bản đồ 3D', labelKo: '3D 지도' }

// seasonAssets.js (Screen 5 Winter ending scrim -> #080F1C)
winter: 'linear-gradient(180deg, rgba(18, 25, 32, 0.34) 0%, rgba(18, 25, 32, 0.14) 42%, rgba(10, 18, 28, 0.68) 78%, #080F1C 100%), ...'

// HanoiYourStory.jsx (L116) & HanoiYourStory.css (L5-12) — Screen 7 Opening
<section className="hanoi-your-story-section" id="hanoi-story">
/* .hanoi-your-story-section { padding: clamp(5rem, 8vw, 7.5rem) 0; background-color: #172026; color: #F7F4ED; } */
```
- *Explanation:* Confirms exact section IDs (`#hanoi-seasons` → `#attractions` → `#hanoi-story`), color handoffs (`#080F1C` in, `#172026` out), and global Lenis wheel handling.
- *Refactor Risk & Affected Consumers:* **LOW** — Neither Screen 5 nor Screen 7 needs to be modified.

---

## 55–56. Implementation Readiness Matrix, Risks & Blockers

| Domain / Requirement | Readiness Status | Summary & Action Needed in V1 Implementation |
| :--- | :---: | :--- |
| **Upgrade Hanoi Without Changing Da Nang?** | **`READY`** | **YES.** Optional config flags (`presentation.layoutVariant: 'travel-atlas'`, `terrain`, `features`) with defaults matching Da Nang preserve 100% of Da Nang's camera, terrain, markers, pin, and styling. |
| **Shared Component Props Contract** | **`NEEDS_REFACTOR`** | Keep `({ attractionsData })` signature unchanged for zero parent churn; extend optional sub-fields inside `attractionsData`. |
| **KO/VI Language Lifecycle** | **`READY` (Root Cause Found)** | No global `LanguageContext.jsx` bug! Caused solely by `destinations.config.js` returning unlocalized `HA_NOI_CONFIG`. Add `getLocalizedHaNoiConfig(language)` + `useLanguage()` fallback in `Interactive3DMap`. |
| **TripBuilder Integration & `3 / 8` Bug** | **`NEEDS_ARCHITECTURE_DECISION`** | Stable attraction IDs already work across KO/VI and Screen 3 (`van-mieu`). Scope Screen 6 badge count to `destinations` in `Interactive3DMap.jsx` (`READY`), and confirm whether `TripBuilderContext.jsx` should also initialize empty `selectedAttractions: []` when `destinationConfig.id !== 'da-nang'`. |
| **Hanoi Attraction Photography (8 Landmarks)** | **`MISSING_ASSETS`** | All 8 current Unsplash URLs in `ha-noi.config.js` depict completely wrong subjects (coffee, world map, Hội An lanterns, painting, Thailand, Mount Bromo, `"404"` door, studio pots). Must curate & visually verify 8 Wikimedia Commons Hanoi photos into `public/assets/destinations/hanoi/attractions/` in V1. |
| **Map Provider & Commercial Licensing** | **`NEEDS_PROVIDER_REVIEW`** | Existing Esri World Imagery keyless endpoint (`server.arcgisonline.com`) warrants commercial ToS review; AWS Terrarium DEM needs attribution text added. |
| **Street ↔ Satellite Style Switching** | **`NEEDS_PROVIDER_REVIEW`** | Architecturally clean via dual-layer `visibility` toggle (no `setStyle()` reset), **but blocked/deferred unless an approved commercial-safe street tile provider or API key is chosen**. |
| **Live Browser Baseline & Runtime QA** | **`NOT_TESTED` / `BLOCKED`** | Blocked on host machine until Chrome remote debugging (`--remote-debugging-port=9222` / `DevToolsActivePort`) is active. |

---

## 57. Final Git Status & Safety Verification

Executed post-cleanup `git status --short` and `git diff --stat` verification:
- **Zero source code files modified** (`git diff --stat` shows **exact same 7 Screen 5 V1.1 files** `44 insertions(+), 32 deletions(-)` as the initial baseline).
- **Zero edits** to `Interactive3DMap.jsx`, `Interactive3DMap.css`, `ha-noi.config.js`, `da-nang.config.js`, `DestinationPage.jsx`, `HanoiExperiencePage.jsx`, `TripBuilderContext.jsx`, `TripBuilderMorph.jsx`, `LanguageContext.jsx`, `LenisManager.js`, `DestinationHeader.jsx`, `package.json`, `deploy.ps1`, or `rollback.ps1`.
- **Only changes made in workspace:**
  1. Deleted 3 verified obsolete/superseded Markdown reports (`AD HANOI_SCREEN4_CHACA_SOURCE_AUDIT.md`, `AD HANOI_SCREEN5_SEASONS_SOURCE_AUDIT.md`, `AD HANOI_SCREEN5_SEASONS_V1_REPORT.md`).
  2. Created `?? HANOI_SCREEN6_SHARED_MAP_SOURCE_AUDIT.md`.

**Audit complete. Standing by for implementation approval and architectural confirmation on (1) `TripBuilderContext` Hanoi initial state (`[]` vs keeping Da Nang defaults) and (2) whether Street/Satellite switching should be deferred or paired with a specific tile provider.**
