# HANOI SCREEN 7 V1 — CINEMATIC TRAVEL JOURNAL IMPLEMENTATION REPORT

- **Project Root:** `D:\workplace\SuperEZTour`
- **Target Route:** `/destinations/ha-noi` (`#itinerary`)
- **Target Version:** Screen 7 V1 — Cinematic Travel Journal
- **Architecture:** Option B — Configuration-Driven Shared Component (`ItineraryStickyTimeline`)
- **Scroll Strategy:** S1 — Natural Document Scroll + Interactive 3-Day Timeline (Zero Pinning)
- **Report Date:** 2026-11-25

---

## A. Executive Summary

- **Implementation Status:** Implemented in source code on `/destinations/ha-noi` and verified via production build (`npm run build` exit code `0`, `✓ 1760 modules transformed`, built in `6.13s`) and `git diff --check` (`exit code 0`).
- **Main Improvements:**
  1. Eliminated all hardcoded Đà Nẵng content (`Hành Trình Đáng Nhớ Tại Đà Nẵng.`, `aria-label="Chọn gói lịch trình Đà Nẵng"`, and `'Đà Nẵng'` location fallback) from the Hanoi route by introducing a configuration-driven `presentation.variant: 'cinematic-journal'` delegation in `ItineraryStickyTimeline.jsx` and modular `CinematicJournalStage.jsx`.
  2. Completed 100% bilingual KO/VI localization in `ha-noi.config.js` and `getLocalizedHaNoiConfig(language)` across section header (`Ba ngày, một Hà Nội đáng nhớ.` / `사흘간의 기록, 오래도록 기억될 하노이.`), 5-pill journey summary ribbon, 3 chapters, flexible time blocks, timeline labels, CTA, duration confirmation prompt, and ARIA attributes.
  3. Replaced external Unsplash URLs (including Day 2's erroneous Hội An lantern photo) with verified local WebP assets from `HANOI_ATTRACTION_ASSETS` (`hoan-kiem-lake`, `van-mieu`, `tran-quoc-pagoda`) with Wikimedia Commons photographer and license attribution.
  4. Replaced dashboard-style bordered activity cards and back-to-back scroll pinning (`+=255%`) with **S1 Natural Document Scroll** (zero pinning), an editorial time-block layout with thin champagne-gold hairlines, a 2-layer decoded image reveal + subtle Ken Burns (`1.035 -> 1.0`), editorial text stagger on chapter switch, read-only Screen 6 & Screen 4 preference matching indicators, and a non-destructive personalization CTA with explicit 3-day duration confirmation.
  5. Unmounted `HanoiYourStory` from `HanoiExperiencePage.jsx` (preserving its component directory and files untouched on disk) and positioned `ItineraryStickyTimeline` (`#itinerary`) directly after `Interactive3DMap` (`#attractions`) as **Screen 07**.
- **Remaining Blockers:**
  - Live Browser Runtime & Visual Viewport QA remains `BLOCKED` in this sandbox environment due to `DevToolsActivePort` unavailability (`PermissionDenied` / `False`).

---

## B. Architecture

- **Shared Component Strategy (Option B):**
  - `src/features/destinations/components/ItinerarySticky/ItineraryStickyTimeline.jsx` acts as the shared entry point. It inspects `itinerariesData?.[0]?.presentation?.variant || 'legacy-sticky'`.
  - When `variant === 'cinematic-journal'` (Hanoi), it renders `<CinematicJournalStage itinerariesData={itinerariesData} />`.
  - Otherwise (Đà Nẵng), it renders `<LegacyItineraryStickyTimeline itinerariesData={itinerariesData} />` with independent React hook lifecycles (zero conditional hook execution).
- **`CinematicJournalStage` Responsibilities (`src/features/destinations/components/ItinerarySticky/components/CinematicJournalStage.jsx`):**
  - Active chapter state (`activeDayIndex`), 2-layer decoded image transitions (`displayedDay`, `outgoingDay`, monotonic `loadTokenRef`), one-time non-pinning entrance `ScrollTrigger`, editorial text stagger on chapter switch, keyboard-accessible 3-day timeline (`ArrowLeft`/`ArrowRight`), read-only `TripBuilderContext` matching (`resolveTimeBlockSelectionMatch`), and safe personalization CTA (`handlePersonalizeClick` + explicit duration confirmation when `tripState.durationDays !== 3`).
- **Legacy Isolation Mechanism:**
  - `LegacyItineraryStickyTimeline` never mounts on Hanoi, so its `gsap.matchMedia()` pinned `ScrollTrigger` (`+=${totalDays * 85}%`) is never initialized on Hanoi.
  - All new CSS is strictly scoped under `.itinerary-sticky-timeline.is-cinematic-journal`.
- **Actual Mounted Hanoi Section Order (`HanoiExperiencePage.jsx`):**
  1. `HanoiAwakeningHero` (`#hanoi-awakening-hero`)
  2. `HanoiOldQuarterWalk` (`#scene-old-quarter`)
  3. `HanoiHeritageChamber` (`#hanoi-heritage`)
  4. `HanoiTaste3D` (`#hanoi-taste`)
  5. `HanoiSeasons3D` (`#hanoi-seasons`)
  6. `Interactive3DMap` (`#attractions`)
  7. `ItineraryStickyTimeline` -> `CinematicJournalStage` (`#itinerary`)
  - *[Future Screen 08 insertion slot: `VehicleShowcase3D` (`#transportation`)]*
  - *[Future Screen 09 insertion slot: `Accommodation3DScene` (`#accommodation`)]*
  8. (Target Screen 10) `TripBuilderMorph` (`#trip-builder`)
  9. (Target Screen 11) `CustomerStories` (`#reviews`)
  10. (Target Screen 12) `CinematicEndingScene`

---

## C. Visual Implementation (Warm Editorial Print / Monograph Aesthetic)

- **Root Cause of Previous "AI Dashboard" Look & Editorial Redesign:**
  - Removed the cold cyan-slate dark backgrounds (`#101A20` / `#17242B`), heavy bordered card containers (`border-radius: 14px–16px`), floating pill badges covering photography, 7–8 stacked ALL-CAPS gold headers, and full-width SaaS pill CTA.
  - Adopted a **Warm Editorial Print / Monograph** aesthetic (*Kinfolk / Aman Resorts / Condé Nast Traveler* style) anchored in warm archival charcoal/espresso (`--journal-bg: #13110F`, `--journal-bg-deep: #171412`), silk-paper ivory (`--journal-text-primary: #F4EFE6`), warm stone (`--journal-text-secondary: #A39B8E`), muted antique bronze (`--journal-accent: #C4A474`), and ultra-fine `1px` paper hairlines (`rgba(244, 239, 230, 0.12)`).
- **Desktop Composition (`>= 993px`):**
  - **Editorial Masthead (`.cj-masthead`):** Top hairline rule with left-aligned publication kicker (`THE HANOI SIGNATURE JOURNEY`) and right-aligned slash-separated metadata (`3 ngày 2 đêm / Tour riêng linh hoạt / Đón tiễn sân bay / Xe riêng tùy chọn / Lưu trú tùy chọn`), followed by a 2-column typographic spread (`1.15fr | 0.85fr`) pairing the large serif headline (`Ba ngày, một Hà Nội đáng nhớ.`) with the editorial deck paragraph.
  - **Interactive 3-Chapter Index Bar (`.cj-chapter-index`):** Positioned directly beneath the masthead with large italic serif numerals (`01`, `02`, `03`), location tags, chapter titles, and an animated bottom bronze rule (`::after`) on the active chapter.
  - **Open-Canvas 2-Column Spread (`.cj-spread-grid`, `0.92fr | 1.08fr`):**
    - **Left Column (`.cj-figure`):** Unencumbered `4:3` documentary photograph (`border-radius: 3px`, zero floating pills over the image!) with 2-layer decoded WebP crossfade + subtle Ken Burns (`1.035 -> 1.0`), paired with a book-style `<figcaption className="cj-figcaption">` below the frame displaying the Roman numeral (`I.`, `II.`, `III.`), location tag, and Wikimedia Commons photographer/license link.
    - **Right Column (`.cj-narrative-column`):** Open-canvas editorial layout (zero card boxes!) with italic serif chapter label (`Chương 01 · Hồ Hoàn Kiếm · Phố cổ`), serif chapter title, lead summary, a 2-column typographic time ledger (`.cj-ledger-row`: `148px` italic serif time period on the left | narrative description + subtle read-only `TripBuilderContext` match note on the right), and a left-aligned inline rectangular editorial CTA (`.cj-editorial-cta`, `border-radius: 2px`).
- **Tablet & Mobile Composition (`<= 992px` / `<= 768px`):**
  - `.cj-chapter-index` sits above the photograph and collapses into a 3-tab horizontal chapter selector (`min-height: 44px` touch targets) so users can switch chapters immediately before viewing the photo and ledger.
  - Natural vertical flow (`16:10` photo on mobile with `--cj-focal-mobile`), single-column ledger rows on mobile, zero nested scrollbars, zero hidden time blocks.

---

## D. Content and Localization

- **Three-Chapter Schedule (`ha-noi.config.js`):**
  - **Chapter 01 (`Chạm vào trái tim Hà Nội` / `하노이의 심장에 닿다` — `Hồ Hoàn Kiếm · Phố cổ`):**
    1. `Đón sân bay & Nhận phòng` / `공항 픽업 & 호텔 체크인`
    2. `Buổi chiều` / `오후` (`['hoan-kiem-lake', 'old-quarter']`)
    3. `Buổi tối & Nghỉ đêm` / `저녁 & 숙소 휴식` (`'pho-bo-hanoi'`)
  - **Chapter 02 (`Dấu ấn ngàn năm` / `천년의 시간과 마주하다` — `Văn Miếu · Hoàng thành · Khu phố Pháp`):**
    1. `Buổi sáng` / `오전` (`['van-mieu']`)
    2. `Buổi trưa` / `점심` (`'bun-cha-hanoi'`)
    3. `Buổi chiều` / `오후` (`['thang-long-citadel', 'st-joseph-cathedral', 'opera-house']`)
    4. `Buổi tối & Nghỉ đêm` / `저녁 & 숙소 휴식` (`'cha-ca-la-vong'`)
  - **Chapter 03 (`Nhịp sống bình yên` / `고요한 호수와 장인의 손길` — `Hồ Tây · Chùa Trấn Quốc · Bát Tràng`):**
    1. `Buổi sáng & Trả phòng` / `오전 & 체크아웃` (`['tran-quoc-pagoda']`)
    2. `Trải nghiệm làng nghề` / `장인 마을 체험` (`['bat-trang-village']`)
    3. `Tiễn sân bay` / `공항 샌딩`
- **Business Wording Safeguards:** All airport transfers, hotel check-in/luggage drop-off, private vehicle transfers, meals, and Day 3 Bát Tràng sightseeing are framed as flexible, customizable suggestions adjusted to actual flight schedules and hotel policies — zero unverified hotel/vehicle/meal/ticket guarantees.

---

## E. Asset Inventory (`hanoiAttractionAssets.js`)

| Chapter | Asset ID | Desktop File | Mobile File | File Size (Desktop / Mobile) | Photographer | Source URL | License | Attribution Location |
|---|---|---|---|---|---|---|---|---|
| **Chapter 01** | `hoan-kiem-lake` | `/assets/destinations/hanoi/attractions/hoan-kiem-lake-desktop.webp` | `/assets/destinations/hanoi/attractions/hoan-kiem-lake-mobile.webp` | `109.1 KB` / `65.0 KB` | `JakobHosp` | `https://commons.wikimedia.org/wiki/File:Th%C3%AA_H%C3%BAc_Bridge_to_Ng%E1%BB%8Dc_S%C6%A1n_Temple_10-03-2025.jpg` | `CC BY 4.0` (`https://creativecommons.org/licenses/by/4.0/`) | Bottom-right overlay `.cj-photo-attribution` inside `.cj-photo-frame` |
| **Chapter 02** | `van-mieu` | `/assets/destinations/hanoi/attractions/van-mieu-desktop.webp` | `/assets/destinations/hanoi/attractions/van-mieu-mobile.webp` | `108.3 KB` / `65.3 KB` | `Christophe95` | `https://commons.wikimedia.org/wiki/File:Constellation_of_Literature_pavilion_(Temple_of_Literature,_Hanoi).jpg` | `CC BY-SA 4.0` (`https://creativecommons.org/licenses/by-sa/4.0/`) | Bottom-right overlay `.cj-photo-attribution` inside `.cj-photo-frame` |
| **Chapter 03** | `tran-quoc-pagoda` | `/assets/destinations/hanoi/attractions/tran-quoc-pagoda-desktop.webp` | `/assets/destinations/hanoi/attractions/tran-quoc-pagoda-mobile.webp` | `108.3 KB` / `64.8 KB` | `Jakub Hałun` | `https://commons.wikimedia.org/wiki/File:Tran_Quoc_Pagoda,_Hanoi,_Vietnam,_20240123_1212_3307.jpg` | `CC BY 4.0` (`https://creativecommons.org/licenses/by/4.0/`) | Bottom-right overlay `.cj-photo-attribution` inside `.cj-photo-frame` |

---

## F. Motion Architecture

- **Confirmation of Zero Pinning:** `CinematicJournalStage.jsx` does **not** use `pin: true` anywhere.
- **One-Time Viewport Entrance:** Scoped `gsap.context` on `sectionRef` with `scrollTrigger: { trigger: sectionEl, start: 'top 84%', once: true }`, animating `[headerRef, summaryRef, stageRef, timelineRef]` (`opacity: 0 -> 1`, `y: 14 -> 0`, `duration: 0.52s`, `stagger: 0.065s`, `clearProps: 'opacity,transform'`).
- **2-Layer Decoded Image Reveal & Subtle Ken Burns:** Preloads target WebP via `new Image()` + `preloader.decode()`, cancels stale loads via monotonic `loadTokenRef`, crossfades incoming layer (`opacity: 0 -> 1`, `duration: 0.42s`) while settling scale (`1.035 -> 1.0`, `duration: 1.05s`), and clears `outgoingDay` on completion.
- **Editorial Text Stagger:** Animates `[data-journal-stagger]` targets (`y: 7 -> 0`, `opacity: 0 -> 1`, `duration: 0.26s`, `stagger: 0.04s`, `overwrite: true`) strictly when `activeDay.day` changes (skipped on language toggle and TripBuilder changes).
- **Reduced Motion:** `checkPrefersReducedMotion()` and `@media (prefers-reduced-motion: reduce)` disable all GSAP animations, Ken Burns scaling, and CSS transitions.
- **Cleanup:** Reverts scoped `gsap.context` and kills active `imageTweenRef` / `textTweenRef` on unmount without touching any external `ScrollTrigger`.

---

## G. TripBuilder Integration

- **Read-Only Preference Matching (`resolveTimeBlockSelectionMatch`):**
  - Reads `tripState.selectedAttractions` and `tripState.culinaryPreferences` via `useTripBuilder()` and `isCulinarySelected`.
  - For single-attraction or culinary matches, displays `Có trong lựa chọn của bạn` / `내 선택에 포함됨`.
  - For grouped multi-attraction blocks (`['hoan-kiem-lake', 'old-quarter']` or `['thang-long-citadel', 'st-joseph-cathedral', 'opera-house']`), displays accurate partial ratios (`Có trong lựa chọn của bạn (1/2)`, `(1/3)`, `(2/3)`) when only a subset is selected.
- **Safe Personalization CTA & Duration Confirmation:**
  - Does **not** call `applyItinerary()` (which would overwrite `specialRequests`).
  - If `tripState.durationDays === 3`: scrolls directly to `#trip-builder` via `getLenis()?.scrollTo` (or native `window.scrollTo`) using dynamic `.dest-header` offset, preserving all state.
  - If `tripState.durationDays !== 3`: opens `.cj-duration-confirm` allowing the customer to explicitly choose `Sử dụng 3 ngày` / `3일 일정 사용` (updates only `durationDays` to `3`) or `Giữ nguyên thời lượng` / `기존 기간 유지` (leaves `durationDays` untouched) before scrolling to `#trip-builder`.

---

## H. Runtime QA Matrix

| Check Category | Static / Build Verification | Live Browser Runtime Verification | Notes |
|---|---|---|---|
| Production Build (`npm run build`) | `PASS` | N/A | `✓ 1760 modules transformed`, `✓ built in 6.13s`, exit `0` |
| Git Hygiene (`git diff --check`) | `PASS` | N/A | Exit `0`, zero whitespace/conflict errors |
| Hanoi KO/VI Content & Zero Đà Nẵng Leakage | `PASS` | `BLOCKED` | Verified in `ha-noi.config.js` & `CinematicJournalStage.jsx`; browser `DevToolsActivePort` blocked |
| Local WebP Assets & Wikimedia Attribution | `PASS` | `BLOCKED` | All 3 chapters reference verified local WebPs in `public/assets/destinations/hanoi/attractions/` |
| S1 Natural Scroll (Zero Pinning) | `PASS` | `BLOCKED` | Zero `pin: true` in `CinematicJournalStage.jsx` |
| Read-Only TripBuilder Matching & Safe CTA | `PASS` | `BLOCKED` | `specialRequests` and existing selections preserved |
| Đà Nẵng Legacy Isolation | `PASS` | `BLOCKED` | `LegacyItineraryStickyTimeline` preserved 1:1 when `variant !== 'cinematic-journal'` |
| Multi-Viewport Visual QA (`1920x1080`–`360x800`) | `PASS` (CSS rules) | `BLOCKED` | `DevToolsActivePort` unavailable in sandbox |

---

## I. Regression Verification & Full Hanoi Page UI Audit Fixes

- **Screen 6 → Screen 7 Warm Palette Continuity (`Interactive3DMap.css`):**
  - Harmonized Screen 6 (`.interactive-3d-map-scene.is-travel-atlas`) from cold cyan-slate (`#080F1C` / `#101A20` / `#17242B`) to warm archival charcoal (`#0D1013 -> #141210 -> #13110F`, detail panel `#1C1916`, canvas `#100E0C`, warm stone `#A39B8E`, antique bronze `#C4A474`), eliminating the cold-to-warm color clash between Screen 5 (`HanoiSeasons3D`), Screen 6 (`Interactive3DMap`), and Screen 7 (`CinematicJournalStage`).
- **Full Hanoi Page (`/destinations/ha-noi`) UI & Localization Bug Fixes:**
  1. **Screen 11 (`CustomerStories`) Missing Fields & VI Localization Fixed (`ha-noi.config.js`):** `CustomerStories.jsx` renders `{story.origin} · {story.tripDate}` and `{story.groupStyle}`, which were previously missing in `HA_NOI_CONFIG.customerStories` (causing an orphaned `" · "` and an empty green badge on all 3 cards) and lacked Vietnamese translations. Added `origin`, `originVi`, `tripDate`, `tripDateVi`, `groupStyle`, `groupStyleVi`, `authorVi`, and `quoteVi` to all 3 Hanoi stories and mapped them in `getLocalizedHaNoiConfig('vi')`.
  2. **Screen 12 (`CinematicEndingScene`) Đà Nẵng Beach Photo Fallback & VI Localization Fixed (`ha-noi.config.js`):** Added `destinationId: 'ha-noi'` and `image: HANOI_ATTRACTION_ASSETS['tran-quoc-pagoda'].desktopSrc` to `HA_NOI_CONFIG.finalCta` (preventing fallback to Đà Nẵng's My Khe palm beach photo) and mapped `finalCta` (`title`, `subtitle`, `description`, `ctaText`) in `getLocalizedHaNoiConfig('vi')`.
  3. **Footer (`DestinationFooter.jsx`) Hardcoded `DAD` Airport Code & Dead Anchors Fixed:** Replaced hardcoded `'03. 최적 항공권 & DAD 공항 픽업 연결'` with dynamic `${destination?.airportCode || 'DAD'}` (`HAN` on Hanoi) and pointed Hanoi service links to mounted section anchors (`#trip-builder`, `#attractions`, `#hanoi-taste`).
- **Navigation:** `<section id="itinerary">` and all 6 Hanoi navbar items in `destinationNav.config.js` are preserved unchanged.

---

## J. Git Verification

- **Initial Pre-Implementation Baseline:** Branch `main`, `HEAD` `63a77efc0b8e237d72aef15af7b519c6b817a924`, 5 pre-existing modified files (`HANOI_SCREEN6_ATLAS_V1_3_REPORT.md`, `Interactive3DMap.css`, `Interactive3DMap.jsx`, `useAtlasScrollDiscovery.js`, `ha-noi.config.js`) + untracked `HANOI_SCREEN7_JOURNAL_SOURCE_AUDIT.md`.
- **Files Modified in Screen 7 V1 & Hanoi UI Audit:**
  1. `src/features/destinations/data/ha-noi.config.js`
  2. `src/features/destinations/components/ItinerarySticky/ItineraryStickyTimeline.jsx`
  3. `src/features/destinations/components/ItinerarySticky/ItineraryStickyTimeline.css`
  4. `src/features/destinations/components/Hanoi/HanoiExperiencePage.jsx`
  5. `src/features/destinations/components/Interactive3DMap/Interactive3DMap.css`
  6. `src/features/destinations/components/DestinationFooter/DestinationFooter.jsx`
- **New Files Created in Screen 7 V1:**
  1. `src/features/destinations/components/ItinerarySticky/components/CinematicJournalStage.jsx`
  2. `HANOI_SCREEN7_JOURNAL_V1_REPORT.md`
- **Deleted Files:** `0` files deleted (`HanoiYourStory/*` and all historical reports retained).

---

## K. Future Screen 8 and 9 Readiness

- `HanoiExperiencePage.jsx` now orders Screen 07 (`ItineraryStickyTimeline`, `#itinerary`) directly after Screen 06 (`Interactive3DMap`, `#attractions`), with documented insertion comments between Screen 07 and Screen 10 (`TripBuilderMorph`, `#trip-builder`) ready for:
  - **Future Screen 08:** `VehicleShowcase3D` (`#transportation`) — requires bilingual `transportation` localization, business confirmation of fleet models, local WebP vehicle assets, and an unpinned presentation variant.
  - **Future Screen 09:** `Accommodation3DScene` (`#accommodation`) — requires normalizing `hotels` vs `accommodation` config key, reconciling `'lakeside'` vs `'westlake'` category IDs, local WebP hotel assets, and an unpinned hospitality presentation variant with the continuous water-ripple canvas loop disabled.

---

## L. Known Limitations

1. **Live Browser Runtime Verification (`BLOCKED`):** Because Chrome remote debugging (`DevToolsActivePort`) is unavailable in this sandbox environment, live browser rendering, multi-viewport DOM pixel measurements, and interactive screenshots could not be captured automatically and should be verified in a local browser session on `/destinations/ha-noi` and `/destinations/da-nang`.
