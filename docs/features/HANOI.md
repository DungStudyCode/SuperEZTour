# Hanoi Destination Experience — Architecture & Asset Specification

- **Canonical Route:** `/destinations/ha-noi` (supports legacy alias `/destinations/hanoi`)
- **Orchestrator:** `apps/web/src/features/destinations/components/Hanoi/HanoiExperiencePage.jsx`
- **Data Config:** `apps/web/src/features/destinations/data/ha-noi.config.js` & `hanoiAttractionAssets.js`

---

## 1. Active Screen Sequence

Every screen on `/destinations/ha-noi` is wrapped in an `<ErrorBoundary isolated>` boundary so a runtime failure in one scene never crashes the entire page:

| Order | Screen / Section ID | Component | Scroll / Motion Strategy |
|---:|---|---|---|
| Header | Persistent Navigation | `DestinationHeader` | Smart hide-on-scroll-down, IntersectionObserver active section highlight, mobile drawer |
| 01 | `#hanoi-awakening-hero` | `HanoiAwakeningHero` (V4.2.1) | 4-act pinned photographic sequence over Hoàn Kiếm & Tháp Rùa (`+=320%` desktop / `+=260%` mobile), conversion-first H1 + Primary Consultation CTA + 3D2N Journal CTA |
| 02 | `#scene-old-quarter` | `HanoiOldQuarterWalk` (V3.4.1) | 4 guild/cultural chapters × 3 editorial beats (`full-bleed`, `editorial-split`, `framed-photo`, `detail-reflection`) + detail modal |
| 03 | `#hanoi-heritage` | `HanoiHeritageChamber` | 3 documentary chapters of Văn Miếu – Quốc Tử Giám (Khuê Văn Các, Thiên Quang Tỉnh, 82 Bia Tiến Sĩ) + monograph modal |
| 04 | `#hanoi-taste` | `HanoiTaste3D` (V3) | 3 sequential sibling chapters (`#hanoi-taste` Phở, `#hanoi-taste-buncha` Bún Chả, `#hanoi-taste-chaca` Chả Cá Lã Vọng), 5 acts each, proximity `IntersectionObserver` (`900px`) lazy decoding + detail modals |
| 05 | `#hanoi-seasons` | `HanoiSeasons3D` (V1.1) | 4 seasonal chapters (Nhật Tân Peach Spring, West Lake Lotus Summer, Shady Boulevard Autumn Hero `1.35x` hold, Misty Tháp Rùa Winter) |
| 06 | `#attractions` | `Interactive3DMap` (V1.3 `travel-atlas`) | MapLibre GL 3D terrain + Esri satellite, 8 curated landmarks, `340vh` desktop pin (`65vh` entry / `190vh` discovery / `85vh` Bát Tràng exit hold), compact laptop tier (`<=820px` height), gesture-priority camera lock |
| 07 | `#itinerary` | `ItineraryStickyTimeline` → `CinematicJournalStage` (V1) | **Zero pinning** natural document scroll, 3-day (`2박 3일` / `3 ngày 2 đêm`) monograph spread, 2-layer decoded WebP crossfade, read-only `TripBuilderContext` preference matching, non-destructive duration confirmation |
| *(08–09)* | *Reserved slots* | *Future `#transportation` & `#accommodation`* | *Documented insertion slots prior to `#trip-builder`* |
| 10 | `#trip-builder` | `TripBuilderMorph` | 7-step bespoke private tour customizer synchronized with Screen 4 & Screen 6 selections |
| 11 | `#reviews` | `CustomerStories` | Verified bilingual traveler journals (`origin`, `tripDate`, `groupStyle`, `quote`) |
| 12 | Finale & `#footer` | `CinematicEndingScene` + `DestinationFooter` | Chùa Trấn Quốc sunset finale CTA + Hanoi-aware (`HAN`) footer anchors |

---

## 2. Verified Wikimedia Commons Asset & License Governance

All Hanoi photography stored under `apps/web/public/assets/destinations/hanoi/` uses verified Wikimedia Commons open-licensed or Public Domain imagery with explicit author and license attribution rendered in UI captions/modals:
- **Hero (`hero/`):** 4 desktop (`2560px`) + 4 mobile (`1280px`) WebP plates (`Velvet` CC BY-SA 4.0, `P. Hughes` CC BY 4.0, `Vyacheslav Argenberg` CC BY 4.0, `cloud.shepherd` CC BY 2.0). Act 01 loads eagerly; Act 02 unlocks after `260ms`; Acts 03–04 defer until scroll/rail interaction.
- **Old Quarter (`old-quarter/` & `old-quarter/story-beats/`):** 14 deduplicated WebP plates covering Hàng Bạc, Cà Phê Giảng, Nhà cổ 87 Mã Mây, and Flower Bicycles (`Benjamin Smith`, `Martin Lewison`, `Phương Huy`, `Amenoc`, `travel oriented`, `Christophe95`, `Guerinf`, `Célestine M.C. Leroy`, `Richard Mortel`, `dronepicr`).
- **Heritage (`heritage/`):** 24 desktop/mobile WebP plates + `manifest.json` for Văn Miếu – Quốc Tử Giám.
- **Culinary (`pho/`, `bun-cha/`, `cha-ca/`):** 30 desktop/mobile WebP plates (`4.26 MB` total across 15 acts).
- **Seasons (`seasons/`):** 8 desktop (`1920×1080`) + mobile (`800×1000`) WebP plates (`1.22 MB` total: `Viethavvh` Public Domain, `Phương Huy` CC BY-SA 4.0, `udono` CC BY 2.0, `Mig Gilbert` CC BY-SA 2.0).
- **Attractions (`attractions/`):** 16 desktop/mobile WebP plates for the 8 canonical Hanoi landmarks (`hoan-kiem-lake`, `old-quarter`, `van-mieu`, `thang-long-citadel`, `st-joseph-cathedral`, `opera-house`, `tran-quoc-pagoda`, `bat-trang-village`).

---

## 3. Key Invariants & Regression Rules

1. **Map Camera Ownership (`Interactive3DMap.jsx`):** `pointerdown`, `touchstart`, and `Ctrl/⌘ + wheel` on the map container immediately set `isUserInteractingRef.current = true` and call `map.stop()` **only** if `isProgrammaticFlightRef.current === true`. Never re-introduce unconditional `map.stop()` inside `dragstart`/`zoomstart`.
2. **Pin Eligibility Measurement (`useAtlasScrollDiscovery.js`):** Measure the unpinned inner `.atlas-pin-measure` element (excluding `.map-disclaimer`) after `mapLoaded` and `document.fonts.ready`.
3. **Non-Destructive Journal CTA (`CinematicJournalStage.jsx`):** Personalizing the 3D2N itinerary must never overwrite user-typed `specialRequests` or existing attraction/culinary selections, and must prompt before changing `durationDays` when `durationDays !== 3`.
4. **Canonical Culinary Synchronization:** Screen 4 chapters toggle preferences matching `CULINARY_ALIAS_GROUPS` in `TripBuilderContext.jsx` so selections persist seamlessly across `KO ↔ VI` switches.
