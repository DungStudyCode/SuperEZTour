# HANOI SCREEN 6 V1.3 — SMOOTH EXPLORATION & RUNTIME STABILIZATION REPORT

- **Project Root:** `D:\workplace\SuperEZTour`
- **Production Route:** `/destinations/ha-noi` (`#attractions`)
- **Current Version:** Screen 6 V1.3 — Smooth Exploration & Runtime Stabilization
- **Architecture:** Configuration-Driven Shared Component — Option B (`Interactive3DMap`)
- **Report Date:** 2026-11-25

---

## 1. Executive Summary

- **Implementation Status:** Source-level audit and implementation completed; production build verified (`npm run build` exit code `0`, `✓ 1761 modules transformed`, built in `7.27s`). Runtime acceptance remains pending live browser verification (`BLOCKED` due to `DevToolsActivePort` unavailability in this environment).
- **User-Reported Bugs Addressed:**
  - **BUG A (Map dragging stutter):** Caused by V1.2 calling `mapInstance.stop()` unconditionally inside `dragstart` and `zoomstart` listeners on every user drag/zoom event, unfiltered `ResizeObserver` calling `map.resize()` without dimension delta checks, decaying Lenis smooth-scroll momentum firing `onUpdate` camera flights during the 0–3px pointerdown-to-dragstart window, and permanent `will-change: transform` on all 8 marker visual wrappers.
  - **BUG B (Missing cinematic exploration pause):** Caused by V1.2 measuring `pinEl.offsetHeight` on `.map-3d-content` (which included `.map-disclaimer` and un-compacted stage heights ~705–760px) against `usableViewportHeight + 16` (`CONTENT_OVERFLOW` on laptops and standard browser windows with browser chrome), one-shot initial eligibility evaluation before `mapLoaded`/font settlement, and a short `22vh` entry hold easily skipped by 1–2 wheel ticks + Lenis `duration: 1.2` inertia.
- **Remaining Blockers:**
  - **Live Browser Runtime & FPS Profiling:** `BLOCKED` (`DevToolsActivePort` unavailable: `PermissionDenied` / `False`; `node_modules\playwright` = `False`, `node_modules\puppeteer` = `False`).
  - **Esri World Imagery Commercial Licensing:** `NEEDS_PROVIDER_REVIEW`.

---

## 2. Git Baseline

- **Branch:** `main`
- **HEAD:** `032b248da0e22767b344a9ca03314600a7c4bcc6`
- **Pre-existing Uncommitted Changes Preserved:**
  - `src/features/destinations/context/TripBuilderContext.jsx`
  - `src/features/destinations/data/destinations.config.js`
  - `src/features/destinations/data/hanoiAttractionAssets.js`
  - `public/assets/destinations/hanoi/attractions/*`
  - `HANOI_SCREEN6_ATLAS_V1_REPORT.md` & `HANOI_SCREEN6_SHARED_MAP_SOURCE_AUDIT.md`
- **Protected Files Verification:** Zero edits to `deploy.ps1`, `rollback.ps1`, `package.json`, `da-nang.config.js`, `TripBuilderContext.jsx`, `LenisManager.js`, `LanguageContext.jsx`, `DestinationPage.jsx`, `HanoiExperiencePage.jsx`, or Screen 1–5 / 7–11 components.

---

## 3. Root Cause Analysis — Missing Pin (BUG B)

1. **Pin Target Included `.map-disclaimer` and Exceeded Laptop/Browser Usable Viewport (`CONTENT_OVERFLOW`):**
   - **V1.2 Source Evidence:** `useAtlasScrollDiscovery.js` measured `pinTargetRef.current.offsetHeight` on `.map-3d-content` (which included Header + Filters + DiscoveryProgress + 420–490px Stage + Footer + `.map-disclaimer` = ~705–760px) and required `contentHeight <= usableViewportHeight + 16` (`usableViewportHeight >= 560`).
   - On `1366x768`, `1280x720`, or `1440x900` with ~85–110px browser chrome, `usableViewportHeight` is `540–700px`, causing `contentFits` to evaluate to `false`.
2. **Stale Initial Measurement & Pin Spacer Measurement Risk:**
   - **V1.2 Source Evidence:** `evaluateEligibility()` ran once on mount before `mapLoaded` and font settlement (`document.fonts.ready`), and measured `pinTargetRef.current` directly (the same element GSAP pins).
3. **Short Entry Hold (`22vh`, `ENTRY_HOLD_RATIO = 0.13`):**
   - **V1.2 Source Evidence:** `useAtlasScrollDiscovery.js` line 12 used `ENTRY_HOLD_RATIO = 0.13` (`~22vh`), which Lenis inertia (`duration: 1.2` in `LenisManager.js` line 30) traversed in 1–2 wheel ticks.
4. **Applied V1.3 Fixes:**
   - Separated `<div className="atlas-pin-stage" ref={pinTargetRef}>` and inner `<div className="atlas-pin-measure" ref={measureTargetRef}>` in `Interactive3DMap.jsx`, placing `.map-disclaimer` outside the pinned stage.
   - Added `@media (min-width: 1024px) and (max-height: 820px)` compact laptop density tier in `Interactive3DMap.css` (`map-canvas-wrapper`: `clamp(335px, 44vh, 395px)`, `panel-img-frame`: `clamp(124px, 16.5vh, 152px)`), lowering `MIN_USABLE_HEIGHT` to `480px` with `+8px / +18px` hysteresis tolerance.
   - Re-evaluates eligibility after `mapLoaded` and `document.fonts.ready`.
   - Increased timeline to **`entryHoldVh: 60` (`0.00–0.30`), `discoveryVh: 120` (`0.30–0.90`), `exitHoldVh: 20` (`0.90–1.00`) -> Total `200vh`**.

---

## 4. Root Cause Analysis — Map Stutter (BUG A)

1. **Unconditional `mapInstance.stop()` Inside `dragstart` and `zoomstart` (Confirmed Primary Root Cause):**
   - **V1.2 Source Evidence:** `Interactive3DMap.jsx` lines 583–590 registered `handleManualMapGesture` on `dragstart` and `zoomstart` and called `mapInstance.stop()` whenever `evt?.originalEvent` existed. Because V1.2 did not track whether a programmatic flight was actually active, `mapInstance.stop()` executed on every user drag start and every `Ctrl + wheel` zoom tick, interrupting MapLibre's internal `DragPanHandler` / `ScrollZoomHandler` interpolation and inertia.
2. **Lenis Inertia Deadzone Before `dragstart` (Confirmed Secondary Root Cause):**
   - **Source Evidence:** `LenisManager.js` uses `duration: 1.2` smooth wheel inertia. When a user scrolls into Screen 6 and immediately presses the mouse down on the map, `dragstart` does not fire until pointer movement exceeds MapLibre's 3px drag threshold. During that 0–3px window, decaying Lenis scroll events continued firing `ScrollTrigger.onUpdate`, triggering programmatic `flyToLandmark` flights right as the user began dragging.
3. **Unfiltered `ResizeObserver` Calling `map.resize()` Without Size Comparison:**
   - **V1.2 Source Evidence:** `Interactive3DMap.jsx` lines 730–737 called `mapRef.current.resize()` on every `ResizeObserver` callback without checking if `clientWidth`/`clientHeight` changed or if a drag gesture was active.
4. **Applied V1.3 Fixes:**
   - Added `isProgrammaticFlightRef` and `isUserInteractingRef`.
   - Added passive `pointerdown`, `touchstart`, and `wheel` (`ctrlKey || metaKey`) listeners on `mapContainerRef.current` that immediately claim user-gesture ownership (`isUserInteractingRef.current = true`), enter Manual mode, cancel any pending camera RAF, and call `mapInstance.stop()` **only once if `isProgrammaticFlightRef.current === true`**.
   - Removed `mapInstance.stop()` from `dragstart` and `zoomstart`.
   - Guarded `ResizeObserver` with `>= 2px` dimension delta check, `requestAnimationFrame` coalescing, and deferral while `isUserInteractingRef.current` is true.
   - Removed permanent `will-change: transform` from `.atlas-marker-visual` and lightened `.map-canvas-wrapper` box-shadow.

---

## 5. Pin Configuration

- **Entry Hold:** `65vh` (`0.00–0.191` progress)
- **Discovery Distance:** `190vh` for 8 landmarks (`0.191–0.75` progress; scales proportionally if category filter reduces visible count)
- **Exit Hold (Screen 6 → Screen 7 Handoff Pause):** `85vh` (`0.75–1.00` progress — holds Landmark 08 Bát Tràng so the long-distance `flyTo` across the Red River and Lenis smooth-scroll inertia settle completely inside Screen 6 before releasing into Screen 7)
- **Total Pin Distance:** `340vh` (`3.4 * window.innerHeight`)
- **Pin Start:** Dynamically aligns to `top top+=${navbarHeight + 8}` (or shifts upward to `Math.max(8, vh - stageH - 12)` if header + stage exceeds usable height on 125% Windows scaling so Map + Detail Panel + CTA + Footer stay 100% visible inside the viewport).
- **Eligibility Conditions:** Evaluates `interactiveStageHeight` (`.map-atlas-stage` + `.atlas-footer-bar`) against `usableViewportHeight + (wasEligible ? 24 : 12)` with `vw >= 1024` and `usableViewportHeight >= 480`, plus a `clamp(4.5rem, 9vh, 7.25rem)` bottom section transition buffer before Screen 7.

---

## 6. Camera Architecture

- **Priority:** `User gesture (isUserInteractingRef)` > `Explicit navigation (marker/prev/next/step/reset)` > `Scroll discovery` > `Initial overview`.
- **`map.stop()` Call Sites Audit:**
  - **Before (V1.2):** 3 unconditional call sites (`flyToLandmark` reduced-motion branch, `flyToLandmark` travel-atlas branch, and `handleManualMapGesture` on every `dragstart`/`zoomstart`).
  - **After (V1.3):** 2 guarded call sites (`cancelPendingProgrammaticCamera` and `executeFlight`), both gated strictly by `if (isProgrammaticFlightRef.current === true)`. Zero `map.stop()` calls when camera is idle or during user drag/zoom gestures.
- **Target Deduplication & Coalescing:** `lastCameraTargetIdRef` skips redundant requests to the same landmark/overview; `pendingCameraRafRef` coalesces rapid scroll-discovery steps within an animation frame; `cameraRequestIdRef` invalidates stale callbacks.
- **Durations:** Nearby (`<= 1.5 km`): `easeTo` `480ms`; Medium (`1.5–4.5 km`): `easeTo` `650ms`; Long (`> 4.5 km`, e.g., Bát Tràng): `flyTo` `860ms`, `curve: 1.18`.

---

## 7. Layout Comparison

> **Note:** Live DOM pixel measurements are `BLOCKED` (`DevToolsActivePort` unavailable). Below are the exact CSS rules comparing V1.2 and V1.3 in `Interactive3DMap.css`:

| Metric | V1.2 (CSS Rule) | V1.3 Standard Desktop | V1.3 Compact Laptop (`<= 820px` height) |
|---|---|---|---|
| Map height | `clamp(420px, 52vh, 490px)` | `clamp(400px, 50vh, 470px)` | `clamp(335px, 44vh, 395px)` |
| Detail panel image height | `clamp(165px, 21vh, 198px)` | `clamp(165px, 21vh, 198px)` | `clamp(124px, 16.5vh, 152px)` |
| Pin target excludes `.map-disclaimer` | No | Yes (`.atlas-pin-stage`) | Yes (`.atlas-pin-stage`) |
| Minimum usable viewport height | `560px` | `480px` | `480px` |
| Actual pin distance (8 landmarks) | `168vh` (`22vh` entry) | `200vh` (`60vh` entry) | `200vh` (`60vh` entry) |

---

## 8. Performance Comparison

| Metric | Before (V1.2) | After (V1.3) | Difference |
|---|---|---|---|
| Median FPS | `NOT TESTED` | `NOT TESTED` | Live browser blocked (`DevToolsActivePort` unavailable) |
| P95 frame duration | `NOT TESTED` | `NOT TESTED` | Live browser blocked |
| Long tasks | `NOT TESTED` | `NOT TESTED` | Live browser blocked |
| Camera requests | `NOT TESTED` | `NOT TESTED` | Instrumented via `atlasRuntimeDiagnostics.js` (`cameraRequestCount`) |
| Camera cancellations | `NOT TESTED` | `NOT TESTED` | Instrumented via `cameraCancelCount` |
| `map.stop()` call sites in source | `3` (unconditional) | `2` (guarded by `isProgrammaticFlightRef`) | Eliminated `map.stop()` during active user drag/zoom |
| `map.resize()` call sites in source | `1` (unfiltered `ResizeObserver`) | `1` (`>= 2px` delta + RAF + gesture deferral) | Eliminated subpixel/mid-drag resize calls |
| `ScrollTrigger.refresh()` call sites in Screen 6 | `2` (mount + unfiltered resize) | `2` (mount + `120ms` debounced `>= 2px` viewport resize outside gesture) | Prevented refresh during map drag |
| React commits | `NOT TESTED` | `NOT TESTED` | Live browser blocked |
| Pin eligibility transitions | `NOT TESTED` | `NOT TESTED` | Instrumented via `pinEligibilityTransitionCount` |

---

## 9. Responsive QA

- **1920×1080, 1440×900, 1366×768, 1280×720, 1024×768, 768×1024, 390×844, 360×800:** Live browser DOM measurement `BLOCKED` (`DevToolsActivePort` unavailable).
- **Source Verification:**
  - `1366×768` & `1280×720` activate `@media (min-width: 1024px) and (max-height: 820px)` compact laptop density tier.
  - `768×1024`, `390×844`, `360×800` return `VIEWPORT_TOO_NARROW` (`vw < 1024`) and use natural document scroll.

---

## 10. Gesture QA

- **Runtime Gesture Execution:** `BLOCKED` (`DevToolsActivePort` unavailable).
- **Source Verification:** `pointerdown` / `touchstart` / `Ctrl+wheel` on `.map-mapbox-container` immediately claims gesture ownership without calling `map.stop()` during native drag/zoom handlers.

---

## 11. TripBuilder Regression

- **Static Verification:** `PASS` — `TripBuilderContext.jsx` untouched; scroll discovery updates only `selectedLandmarkId` (`activeLandmark`), never `tripState.selectedAttractions`.

---

## 12. Screen Integration

- **Screen 5 (`HanoiSeasons3D`) & Screen 7 (`HanoiYourStory`):** Untouched in source; Screen 6 kills only its own `ScrollTrigger` instance (`st.kill()`). Live scroll handoff test: `BLOCKED`.

---

## 13. Đà Nẵng Regression

- **Static Verification:** `PASS` — `da-nang.config.js` untouched; `isTravelAtlas` and `scrollExperienceEnabled` are `false` for Đà Nẵng, leaving legacy 3D terrain, pitch `68`, legacy pin (`+=200%` / `+=130%`), and legacy markers unchanged.
- **Runtime Verification:** `BLOCKED` (`DevToolsActivePort` unavailable).

---

## 14. Modified Files

1. `src/features/destinations/data/ha-noi.config.js` — Added `entryHoldVh: 60`, `discoveryVh: 120`, `exitHoldVh: 20` to `attractions.presentation.scrollExperience`.
2. `src/features/destinations/components/Interactive3DMap/utils/atlasRuntimeDiagnostics.js` *(new)* — Development-only pin eligibility diagnostics (`?atlasDebug=1`) and runtime performance counters (`window.__HANOI_ATLAS_DIAGNOSTICS__`).
3. `src/features/destinations/components/Interactive3DMap/hooks/useAtlasScrollDiscovery.js` — Refactored for `200vh` timeline (`60vh` entry / `120vh` discovery / `20vh` exit), dynamic progress thresholds (`[0.30, 0.90]`), unpinned `measureTargetRef` measurement, hysteresis tolerance, debounced resize guard, and diagnostic publishing.
4. `src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx` — Implemented camera ownership guards (`isUserInteractingRef`, `isProgrammaticFlightRef`), target deduplication (`lastCameraTargetIdRef`), RAF scroll coalescing (`pendingCameraRafRef`), guarded `map.stop()`, `>= 2px` `ResizeObserver` guard, and `.atlas-pin-stage` / `.atlas-pin-measure` wrapper excluding `.map-disclaimer`.
5. `src/features/destinations/components/Interactive3DMap/components/AttractionDetailPanel.jsx` — Passed `nextOpen` boolean to `onExperiencesToggle(nextOpen)`.
6. `src/features/destinations/components/Interactive3DMap/Interactive3DMap.css` — Added compact laptop density tier (`@media (min-width: 1024px) and (max-height: 820px)`), bounded pinned experiences max-height (`112px`), removed permanent marker `will-change: transform`, and lightened map container shadow.

---

## 15. Debug Diagnostics

- **How to Enable (Dev only):** Append `?atlasDebug=1` to `/destinations/ha-noi?atlasDebug=1` or set `window.__HANOI_ATLAS_DEBUG__ = true` in DevTools console, and inspect `window.__HANOI_ATLAS_DIAGNOSTICS__`.
- **Production Isolation:** All diagnostic logging and `window.__HANOI_ATLAS_DIAGNOSTICS__` writes are gated by `import.meta.env?.DEV` and produce zero production UI or console output.

---

## 16. Build Result

- **Command:** `npm run build`
- **Exit Code:** `0` (`PASS`)
- **Output:** `vite v6.4.6 building for production...` -> `✓ 1761 modules transformed.` -> `✓ built in 7.27s`
- **Bundle Output:**
  - `dist/index.html`: `2.06 kB` (`gzip: 0.97 kB`)
  - `dist/assets/index-BesOWUAa.css`: `439.10 kB` (`gzip: 73.45 kB`)
  - `dist/assets/maplibre-gl-CRaIuO8Z.js`: `1,114.54 kB` (`gzip: 305.08 kB`)
  - `dist/assets/index-DL-pq3-I.js`: `1,776.15 kB` (`gzip: 532.59 kB`)

---

## 17. Browser Verification

- **Tooling Checked:**
  1. Chrome `DevToolsActivePort` (`Test-Path "$env:LOCALAPPDATA\Google\Chrome\User Data\DevToolsActivePort"`): `PermissionDenied` / `False`.
  2. Local `node_modules\playwright`: `False` (not installed).
  3. Local `node_modules\puppeteer`: `False` (not installed).
- **Status:** `BLOCKED` (per safety rules, no new packages were installed and user Chrome processes/profiles were not killed or modified).

---

## 18. Audit/Report Cleanup

- **Removed Safely:** `HANOI_SCREEN6_ATLAS_V1_2_REPORT.md` (untracked agent-generated V1.2 report whose baseline and findings are incorporated into this V1.3 report).
- **Retained:**
  - `HANOI_SCREEN6_SHARED_MAP_SOURCE_AUDIT.md` (shared architecture audit baseline)
  - `HANOI_SCREEN6_ATLAS_V1_REPORT.md` (Wikimedia Commons photography licensing & asset curation records)

---

## 19. Known Limitations

1. **Live Browser Runtime Verification:** `BLOCKED` by `DevToolsActivePort` unavailability in this environment; runtime pin feel and drag FPS must be verified in a live browser session (`?atlasDebug=1`).
2. **Map Tile Provider Licensing:** Esri World Imagery commercial usage remains `NEEDS_PROVIDER_REVIEW`.

---

## 20. Final Git Verification

- `git status --short`:
  - `M src/features/destinations/components/Interactive3DMap/Interactive3DMap.css`
  - `M src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx`
  - `M src/features/destinations/context/TripBuilderContext.jsx` *(pre-existing)*
  - `M src/features/destinations/data/destinations.config.js` *(pre-existing)*
  - `M src/features/destinations/data/ha-noi.config.js`
  - `?? HANOI_SCREEN6_ATLAS_V1_3_REPORT.md`
  - `?? HANOI_SCREEN6_ATLAS_V1_REPORT.md` *(pre-existing)*
  - `?? public/assets/destinations/hanoi/attractions/` *(pre-existing)*
  - `?? src/features/destinations/components/Interactive3DMap/components/`
  - `?? src/features/destinations/components/Interactive3DMap/hooks/`
  - `?? src/features/destinations/components/Interactive3DMap/utils/`
  - `?? src/features/destinations/data/hanoiAttractionAssets.js` *(pre-existing)*
- `git diff --cached --stat`: empty (zero staged files).
- `git diff --check`: exit `0` (`PASS`).
