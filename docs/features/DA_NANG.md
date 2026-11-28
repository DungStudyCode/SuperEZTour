# Da Nang Destination Experience — Architecture & Specification

- **Canonical Route:** `/destinations/da-nang` (aliases: `danang`, `vietnam-danang`)
- **Orchestrator:** `apps/web/src/features/destinations/components/DaNang/DaNangExperiencePage.jsx` (invoked by `DestinationPage.jsx`)
- **Data Config & Localization:**
  - Korean Baseline: `apps/web/src/features/destinations/data/da-nang.config.js` (`DA_NANG_CONFIG`)
  - Vietnamese Luxury Editorial Dictionary: `apps/web/src/locales/destinations/da-nang/vi.json` (472 keys, 100% parity with `ko.json`)

---

## 1. Fourteen-Scene Immersive Pipeline

1. **Header:** `DestinationHeader` (`discover`, `services`, `accommodation`, `attractions`, `itinerary`, `trip-builder`)
2. **Scene 01 — `AirplanePortalScene`:** Cabin oval window portal scrub sequence into Da Nang coastline & Golden Bridge.
3. **Scene 02 — `FlyThroughScene` *(Lazy-Loaded Three.js WebGL)*:** Procedural 3D architectural exhibition hall with ACES Filmic tone mapping, champagne-gold monolith frames, and scroll-driven camera spline. Isolated into an async chunk so `three` is loaded only when visiting Da Nang.
4. **Scene 03 — `ExperiencesCinematicSequence` (`#services`):** Horizontal/pinned 6-pillar private tour ecosystem showcase.
5. **Scene 04 — `Accommodation3DScene` (`#accommodation`):** Curated 5-star beach resorts & private pool villas with category filtering and `TripBuilderContext` preselection.
6. **Scene 05 — `LocalGuideDocuScene` (`#guide`):** Dedicated Korean-speaking local guide documentary showcase.
7. **Scene 06 — `Flight3DScene` (`#flights`):** Direct Korean air routes (`ICN`, `PUS`, `DAE`, `CJJ` → `DAD`) & VIP airport pickup trajectory.
8. **Scene 07 — `VehicleShowcase3D` (`#transportation`):** Private SUV, 16-seat van, and VIP DCar Limousine showcase.
9. **Scene 08 — `Interactive3DMap` (`#attractions`, `legacy-3d` variant):** MapLibre 3D terrain & satellite view across 7 Central Vietnam landmarks (`ba-na-hills`, `my-khe-beach`, `son-tra-peninsula`, `marble-mountains`, `dragon-bridge`, `hai-van-pass`, `hoi-an-ancient-town`).
10. **Scene 09 — `CulinaryFilmScene` (`#culinary`):** 5 Central Vietnam culinary highlights synchronized with `TripBuilderContext`.
11. **Scene 10 — `TimeTransformationScene`:** 24-hour dawn-to-night visual transition & private tour philosophy (`0% Forced Shopping`).
12. **Scene 11 — `ItineraryStickyTimeline` (`#itinerary`, `legacy-sticky` variant):** Multi-track curated itineraries (`3박 4일`, `4박 5일`, Golf/Family).
13. **Scene 12 — `TripBuilderMorph` (`#trip-builder`):** 7-step interactive customizer.
14. **Scene 13–14 & Footer:** `CustomerStories`, `CinematicEndingScene`, and `DestinationFooter`.

---

## 2. Known Risks & Future Improvements

1. **External Unsplash Imagery Dependency:** Unlike Hanoi (which migrated 100% to locally hosted, license-verified Wikimedia WebP assets), `da-nang.config.js`, `FlyThroughScene.jsx`, and `vietnamDestinations.js` still reference external `https://images.unsplash.com/...` URLs. Before commercial campaign scaling on Da Nang, replace external URLs with locally hosted, license-documented WebP plates.
2. **Consultation Form Unification:** Da Nang currently opens `LegacyQuoteForm` (`unavailable` stub). Adopting `QuickConsultationForm` and enabling `'da-nang'` in `@superez/api` domain validation is planned as a dedicated post-Hanoi rollout milestone.
3. **Map Tile Provider Review:** `Interactive3DMap` uses Esri `World_Imagery` raster tiles and AWS Mapzen Terrarium elevation tiles; commercial production traffic terms should be confirmed with the chosen tile provider prior to high-volume launch.
