# HANOI SCREEN 7 V1 — CINEMATIC TRAVEL JOURNAL
## SOURCE AUDIT & PREMIUM SERVICES ARCHITECTURE PLANNING

- **Project Root:** `D:\workplace\SuperEZTour`
- **Target Route:** `/destinations/ha-noi`
- **Target Section:** Screen 7 — Signature Journey (`#itinerary`, currently rendered by `ItineraryStickyTimeline`)
- **Target Version:** Screen 7 V1 — Cinematic Travel Journal
- **Mode:** STRICT READ-ONLY SOURCE AUDIT & ARCHITECTURE PLANNING (Zero source modifications)
- **Audit Date:** 2026-11-25

---

## 1. Executive Summary

- **Current Architecture (`VERIFIED`):**
  - On `/destinations/ha-noi`, `DestinationPage.jsx` (`lines 183–185`) renders `HanoiExperiencePage.jsx`, which currently mounts **11 content sections** plus `DestinationHeader` and `DestinationFooter`.
  - Logical Screen 7 in the current DOM is `HanoiYourStory.jsx` (`lines 57–60` of `HanoiExperiencePage.jsx`, 6 static pillar cards without a section `id`), followed at position 8 by `ItineraryStickyTimeline.jsx` (`lines 62–65`, `<section id="itinerary">`), which is a **shared component** also consumed by `/destinations/da-nang` (`DestinationPage.jsx` `line 221`).
- **Main Confirmed Issues (`CONFIRMED_ISSUE`):**
  1. **Đà Nẵng Content Leakage:** `ItineraryStickyTimeline.jsx` (`line 425`) hardcodes `{isKorean ? '기억에 남을 단 하나의 다낭 여정.' : 'Hành Trình Đáng Nhớ Tại Đà Nẵng.'}`, `line 436` hardcodes `aria-label="Chọn gói lịch trình Đà Nẵng"`, and `lines 161, 167` fallback to `'Đà Nẵng'`.
  2. **Broken VI Localization:** `getLocalizedHaNoiConfig(language)` in `ha-noi.config.js` (`lines 1074–1112`) only localizes `attractions` when `language === 'vi'`, leaving `itineraries`, `hotels`, `localGuide`, `flights`, `transportation`, `customerStories`, and `finalCta` unmapped. Moreover, `ha-noi.config.js` (`lines 956–1015`) is missing Vietnamese fields (`locationTagVi`, `summaryVi`, `activities[].titleVi`, `activities[].descVi`) for all 3 days, and `ItineraryStickyTimeline.jsx` (`line 441`) splits `durationLabel` (`'2박 3일 (3 Ngày 2 Đêm)'`) on `' ('`, stripping the Vietnamese text and displaying `'2박 3일'` in both languages.
  3. **Incorrect Day 2 Imagery:** `ha-noi.config.js` (`line 990`) assigns external Unsplash URL `photo-1596401057633-54a8fe8ef647` (Hội An silk lanterns) to Day 2 (Văn Miếu, Hoàng thành Thăng Long & French Quarter). All 3 itinerary days currently use external Unsplash URLs rather than verified local WebP assets.
  4. **Dashboard Card Presentation & Long Pin Conflict:** `ItineraryStickyTimeline.jsx` renders 5 bordered `.journal-activity-item` boxes per day and pins `#itinerary` for `+=${totalDays * 85}%` (`+=255%` on desktop, `line 290`) immediately after Screen 6's `340vh` pin, creating back-to-back long pins.
- **Recommended Direction (`PROPOSED`):**
  - Adopt **Option B — Configuration-Driven Shared Component** (`ItineraryStickyTimeline` upgraded with `presentation.variant: 'cinematic-journal'` opt-in for Hanoi while preserving legacy behavior 100% for Đà Nẵng).
  - Use **Scroll Option S1 (Natural Scroll + Click/Interactive Timeline + One-Time Editorial Entrance)** or **Option S2 (Short Adaptive Hold)** so Screen 7 provides immediate, unhurried reading and day switching right after Screen 6's `340vh` pin without back-to-back pin fatigue.
  - Reposition `ItineraryStickyTimeline` (`#itinerary`) directly after Screen 6 (`#attractions`) as **Screen 07**, preparing clean insertion slots for **Screen 08 (Private Chauffeur Experience)** and **Screen 09 (Curated Hotel Collection)** ahead of **Screen 10 (`TripBuilderMorph`, `#trip-builder`)**.
- **Implementation Readiness:** Ready for Screen 7 V1 implementation upon user approval of this audit plan.

---

## 2. Git Baseline

- **Command Executed:** `git status --short; git branch --show-current; git rev-parse HEAD; git diff --stat; git diff --cached --stat; git diff --check`
- **Current Branch (`VERIFIED`):** `main`
- **Current HEAD (`VERIFIED`):** `63a77efc0b8e237d72aef15af7b519c6b817a924`
- **Modified Files (Unstaged, Pre-existing Screen 6 V1.3 refinements):**
  - `M HANOI_SCREEN6_ATLAS_V1_3_REPORT.md`
  - `M src/features/destinations/components/Interactive3DMap/Interactive3DMap.css`
  - `M src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx`
  - `M src/features/destinations/components/Interactive3DMap/hooks/useAtlasScrollDiscovery.js`
  - `M src/features/destinations/data/ha-noi.config.js`
- **Staged Files (`git diff --cached --stat`):** None (`0` files).
- **Whitespace / Conflict Check (`git diff --check`):** `PASS` (exit code `0`).

---

## 3. Actual Hanoi Component Tree

### 3.1 Current Component Tree (`src/features/destinations/DestinationPage.jsx` -> `HanoiExperiencePage.jsx`)

```text
DestinationPage (src/features/destinations/DestinationPage.jsx#L34-L238)
└── TripBuilderProvider (src/features/destinations/context/TripBuilderContext.jsx#L149-L373)
    └── HanoiExperiencePage (src/features/destinations/components/Hanoi/HanoiExperiencePage.jsx#L21-L86)
        ├── DestinationHeader (components/DestinationHeader/DestinationHeader.jsx)
        ├── [01] HanoiAwakeningHero (#hanoi-awakening-hero)
        ├── [02] HanoiOldQuarterWalk (#scene-old-quarter)
        ├── [03] HanoiHeritageChamber (#hanoi-heritage)
        ├── [04] HanoiTaste3D (#hanoi-taste)
        ├── [05] HanoiSeasons3D (#hanoi-seasons)
        ├── [06] Interactive3DMap (#attractions)
        ├── [07-current] HanoiYourStory (no section id; class .hanoi-your-story-section)
        ├── [08-current] ItineraryStickyTimeline (#itinerary)
        ├── [09-current] TripBuilderMorph (#trip-builder)
        ├── [10-current] CustomerStories (#reviews)
        ├── [11-current] CinematicEndingScene (no section id; class .cinematic-ending-scene)
        └── DestinationFooter (components/DestinationFooter/DestinationFooter.jsx)
```

### 3.2 Section Inventory Table (`VERIFIED`)

| Current Order | Actual Component | File Path | Section ID | Config / Data Source | Shared? | Consumers |
|---|---|---|---|---|---|---|
| Header | `DestinationHeader` | `src/features/destinations/components/DestinationHeader/DestinationHeader.jsx` | none (`<header>`) | `destinationNav.config.js` + `destination` | Shared | Đà Nẵng, Hà Nội |
| 01 | `HanoiAwakeningHero` | `src/features/destinations/components/Hanoi/HanoiAwakeningHero/HanoiAwakeningHero.jsx` | `hanoi-awakening-hero` | `destination.hero` + `hanoiHeroManifest.js` | Hanoi-only | `HanoiExperiencePage` |
| 02 | `HanoiOldQuarterWalk` | `src/features/destinations/components/Hanoi/HanoiOldQuarterWalk/HanoiOldQuarterWalk.jsx` | `scene-old-quarter` | `oldQuarterScenes.js` | Hanoi-only | `HanoiExperiencePage` |
| 03 | `HanoiHeritageChamber` | `src/features/destinations/components/Hanoi/HanoiHeritageChamber/HanoiHeritageChamber.jsx` | `hanoi-heritage` | `heritageScenes.js` + `heritageAssets.js` | Hanoi-only | `HanoiExperiencePage` |
| 04 | `HanoiTaste3D` | `src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.jsx` | `hanoi-taste` | `phoScenes.js`, `bunChaScenes.js`, `chaCaScenes.js` | Hanoi-only | `HanoiExperiencePage` |
| 05 | `HanoiSeasons3D` | `src/features/destinations/components/Hanoi/HanoiSeasons3D/HanoiSeasons3D.jsx` | `hanoi-seasons` | `seasonScenes.js` + `seasonAssets.js` | Hanoi-only | `HanoiExperiencePage` |
| 06 | `Interactive3DMap` | `src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx` | `attractions` | `destination.attractions` + `hanoiAttractionAssets.js` | **Shared** | Đà Nẵng (`Scene 08`), Hà Nội (`Scene 06`) |
| 07 (current) | `HanoiYourStory` | `src/features/destinations/components/Hanoi/HanoiYourStory/HanoiYourStory.jsx` | *none* | Internal `HANOI_STORY_PILLARS` constant (`lines 19–106`) | Hanoi-only | `HanoiExperiencePage` |
| 08 (current) | `ItineraryStickyTimeline` | `src/features/destinations/components/ItinerarySticky/ItineraryStickyTimeline.jsx` | `itinerary` | `destination.itineraries` | **Shared** | Đà Nẵng (`Scene 11`), Hà Nội (`Scene 08`) |
| 09 (current) | `TripBuilderMorph` | `src/features/destinations/components/TripBuilderMorph/TripBuilderMorph.jsx` | `trip-builder` | `TripBuilderContext` + `destinationConfig` | **Shared** | Đà Nẵng (`Scene 12`), Hà Nội (`Scene 09`) |
| 10 (current) | `CustomerStories` | `src/features/destinations/components/CustomerStories/CustomerStories.jsx` | `reviews` | `destination.customerStories` | **Shared** | Đà Nẵng (`Scene 13`), Hà Nội (`Scene 10`) |
| 11 (current) | `CinematicEndingScene` | `src/features/destinations/components/CinematicEnding/CinematicEndingScene.jsx` | *none* | `destination.finalCta` | **Shared** | Đà Nẵng (`Scene 14`), Hà Nội (`Scene 11`) |

> **Unused Shared Components Already Present in Repository (`VERIFIED`):**
> - `Accommodation3DScene` (`src/features/destinations/components/Accommodation3D/Accommodation3DScene.jsx`, `<section id="accommodation">`) — mounted on Đà Nẵng (`DestinationPage.jsx#L200`), **not** currently mounted on `HanoiExperiencePage.jsx`, even though `ha-noi.config.js` (`lines 215–317`) defines `hotels` data!
> - `VehicleShowcase3D` (`src/features/destinations/components/VehicleShowcase3D/VehicleShowcase3D.jsx`, `<section id="transportation">`) — mounted on Đà Nẵng (`DestinationPage.jsx#L209`), **not** currently mounted on `HanoiExperiencePage.jsx`, even though `ha-noi.config.js` (`lines 392–432`) defines `transportation` data!

---

## 4. Current Screen 7 (`ItineraryStickyTimeline`) Architecture

- **Component File:** `src/features/destinations/components/ItinerarySticky/ItineraryStickyTimeline.jsx` (`630 lines`)
- **Stylesheet:** `src/features/destinations/components/ItinerarySticky/ItineraryStickyTimeline.css` (`1000 lines`, scoped under `.itinerary-sticky-timeline`)
- **Props Received (`line 170`):** `{ itinerariesData }` (an array of itinerary package objects, or `itinerariesConfig`).
- **Internal State (`lines 172–173`):**
  - `activeItineraryId`: defaults to `itineraries[0]?.id || '4d3n'`.
  - `activeDayIndex`: `0 .. days.length - 1`.
- **Context & Motion Dependencies:**
  - `useLanguage()` (`line 188`) -> `{ isKorean }`.
  - `useTripBuilder()` (`line 181`) -> `{ applyItinerary }`.
  - `getLenis()` (`line 23`) -> smooth scroll to day progress offset on `handleDayClick`.
  - `gsap.matchMedia()` (`lines 263–406`) -> pins `containerRef.current` (`<section id="itinerary">`) with `start: 'top top'`, `end: '+=${totalDays * 85}%'` on desktop (`+=255%` for 3 days, `+=340%` for 4 days) and `scrub: 1.2`.
- **Shared Consumers Matrix (`VERIFIED`):**

| Destination | Component | Data Source | Packages | Presentation | Animation | CTA Handler |
|---|---|---|---|---|---|---|
| **Đà Nẵng** (`/destinations/da-nang`) | `ItineraryStickyTimeline` | `da-nang.config.js` (`lines 651–795`) + `getLocalizedDaNangConfig` (`lines 1008–1018`) | 3 packages (`4d3n`, `3d2n`, `5d4n`) | Stacked visual + 4 highlight cards + segmented package switcher | Pinned `+=340%` (4d), `+=255%` (3d), `+=425%` (5d) | `applyItinerary(activeItinerary)` |
| **Hà Nội** (`/destinations/ha-noi`) | `ItineraryStickyTimeline` | `ha-noi.config.js` (`lines 956–1015`, unmapped in `getLocalizedHaNoiConfig`) | 1 package (`3d2n`) | Same legacy layout (shows 1-tab package switcher!) | Pinned `+=255%` (3d) | `applyItinerary(activeItinerary)` |

---

## 5. Confirmed UI Issues & Root Causes

### Issue A — Đà Nẵng Content Leakage (`CONFIRMED_ISSUE`)
- **Root Cause 1 (`ItineraryStickyTimeline.jsx#L424-L426`):**
  ```jsx
  <h2 className="journal-title">
    {isKorean ? '기억에 남을 단 하나의 다낭 여정.' : 'Hành Trình Đáng Nhớ Tại Đà Nẵng.'}
  </h2>
  ```
  The section title is hardcoded to Đà Nẵng in both Korean (`다낭`) and Vietnamese (`Đà Nẵng`) instead of reading destination-provided header metadata or `activeItinerary.title` / `activeItinerary.titleVi`.
- **Root Cause 2 (`ItineraryStickyTimeline.jsx#L436`):**
  `aria-label="Chọn gói lịch trình Đà Nẵng"` is hardcoded to Đà Nẵng.
- **Root Cause 3 (`ItineraryStickyTimeline.jsx#L160-L168`):**
  `extractLocationTag(dayObj)` falls back to `'Đà Nẵng'` at lines 161 and 167.

### Issue B — KO/VI Localization Breakdown (`CONFIRMED_ISSUE`)
- **Root Cause 1 (`ha-noi.config.js#L1074-L1112`):**
  `getLocalizedHaNoiConfig(language)` returns `HA_NOI_CONFIG` untouched for `itineraries` when `language === 'vi'`. Unlike `getLocalizedDaNangConfig` (`da-nang.config.js#L1008-L1018`), which maps `vi.itineraries` over `base.itineraries`, `getLocalizedHaNoiConfig` only maps `attractions`.
- **Root Cause 2 (`ha-noi.config.js#L956-L1015`):**
  Inside `HA_NOI_CONFIG.itineraries[0]`:
  - `overviewVi` (`line 967`) and `days[].titleVi` (`lines 973, 988, 1003`) exist in the raw object, **but** `ItineraryStickyTimeline.jsx` reads `activeItinerary.overview` (`line 428`) and `d.title` (`lines 495, 519`), which remain Korean because `getLocalizedHaNoiConfig('vi')` never mapped `overview: it.overviewVi` or `title: d.titleVi`.
  - `days[].locationTag` (`lines 971, 986, 1001`) has **no** `locationTagVi` field at all (`'호안끼엠 & 구시가지'`, `'문묘 & 탕롱 황성'`, `'서호 & 바트랑'`).
  - `days[].summary` (`lines 974, 989, 1004`) has **no** `summaryVi` field at all.
  - `days[].activities` (`lines 976–982, 991–997, 1006–1011`) has **no** `titleVi` or `descVi` fields at all — every activity `title` and `desc` is Korean-only.
- **Root Cause 3 (`ItineraryStickyTimeline.jsx#L440-L441`):**
  `durationLabel` in `ha-noi.config.js` (`line 963`) is `'2박 3일 (3 Ngày 2 Đêm)'`. Line 441 executes:
  ```js
  const shortLabel = rawLabel.includes(' (') ? rawLabel.split(' (')[0] : rawLabel;
  ```
  This strips `' (3 Ngày 2 Đêm)'` and renders `'2박 3일'` even when Vietnamese is active.

### Issue C — Incorrect Day 2 Imagery (`CONFIRMED_ISSUE`)
- **Root Cause (`ha-noi.config.js#L990`):**
  Day 2 (`Day 02 · Chiều Sâu Văn Hiến & Dấu Ấn Kiến Trúc Pháp` — Văn Miếu, Hoàng thành Thăng Long, St. Joseph's Cathedral) uses `https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80`, which is an external Unsplash photo of **silk lanterns**, not Văn Miếu or Hoàng thành Thăng Long.

### Issue D — Dashboard-Like Presentation (`CONFIRMED_ISSUE`)
- **Root Cause (`ItineraryStickyTimeline.jsx#L433-L459, #L523-L541` & `ItineraryStickyTimeline.css#L426-L461`):**
  - Renders a segmented tab switcher (`.journal-package-segmented`) even when a destination only has 1 signature itinerary (`itineraries.length === 1` on Hanoi).
  - Renders only `hl.title` inside 5 separate bordered boxes (`.journal-activity-item` with `border: 1px solid rgba(212, 180, 120, 0.14)` and icon boxes), discarding `hl.time` (`11:30`, `13:00`, `15:00`, etc.) and `hl.desc` (`ItineraryStickyTimeline.jsx#L529` only extracts `hl.title || hl.text`, ignoring `hl.time` and `hl.desc`!).

### Issue E — Missing Travel Service Framing (`CONFIRMED_ISSUE`)
- Although `ha-noi.config.js` activities mention Noi Bai pickup (`11:30`), Metropole check-in (`13:00`), and airport drop-off (`15:30`), `ItineraryStickyTimeline.jsx` strips `time` and `desc`, lacks a journey summary ribbon (`3 Ngày 2 Đêm · Tour riêng · Xe riêng · Khách sạn · Đón tiễn sân bay`), and uses fixed clock timestamps (`11:30`, `13:00`, `15:30`) instead of flight-flexible time blocks (`Đón sân bay & Nhận phòng`, `Buổi chiều`, `Buổi tối & Nghỉ đêm`).

---

## 6. Existing Itinerary Data Inventory (`ha-noi.config.js#L956-L1015`)

- **Itinerary ID:** `'3d2n'` (`daysCount: 3`, `nightsCount: 2`)

| Day | Field | Current VI in `ha-noi.config.js` | Current KO in `ha-noi.config.js` | Rendered in VI Mode Today | Status / Issue |
|---|---|---|---|---|---|
| Package | `title` / `titleVi` | `Hà Nội — Ngàn Năm Di Sản & Tinh Hoa Nghệ Thuật` | `하노이 천년의 유산과 감성 미식 여정` | `'Hành Trình Đáng Nhớ Tại Đà Nẵng.'` | `CONFIRMED_ISSUE` (Hardcoded Đà Nẵng in JSX `line 425`) |
| Package | `overview` / `overviewVi` | `Lịch trình được thiết kế tinh tế kết hợp giữa khách sạn di sản 5 sao...` | `노이바이 공항 VIP 영접부터 호안끼엠...` | Korean `overview` | `CONFIRMED_ISSUE` (`getLocalizedHaNoiConfig` ignores `itineraries`) |
| Package | `durationLabel` | Combined string `'2박 3일 (3 Ngày 2 Đêm)'` | Combined string `'2박 3일 (3 Ngày 2 Đêm)'` | `'2박 3일'` | `CONFIRMED_ISSUE` (`split(' (')[0]` strips VI) |
| Day 01 | `locationTag` | *Missing (`NOT_FOUND`)* | `'호안끼엠 & 구시가지'` | `'호안끼엠 & 구시가지'` | `CONFIRMED_ISSUE` (Missing `locationTagVi`) |
| Day 01 | `title` / `titleVi` | `'Ngày 01 · Chào Hà Nội, Khách Sạn Di Sản & Phố Cổ'` | `'Day 01 · 하노이 도착 & 헤리티지 구시가지 산책'` | Korean `title` | `CONFIRMED_ISSUE` (Unmapped in `getLocalizedHaNoiConfig`) |
| Day 01 | `summary` | *Missing (`NOT_FOUND`)* | `'노이바이 공항 전용 차량 픽업 후 메트로폴 체크인...'` | *Not rendered by component* | `CONFIRMED_ISSUE` (Missing `summaryVi` & not rendered) |
| Day 01 | `activities[0..4]` | *Missing (`NOT_FOUND`)* | 5 items (`11:30` HAN pickup, `13:00` Metropole check-in, `15:00` Hoan Kiem walk, `17:00` Egg coffee, `19:00` Beef Pho dinner) | Korean `title` only (`time` and `desc` ignored by JSX `line 529`) | `CONFIRMED_ISSUE` (Missing `titleVi`/`descVi`; `time` & `desc` dropped) |
| Day 02 | `locationTag` | *Missing (`NOT_FOUND`)* | `'문묘 & 탕롱 황성'` | `'문묘 & 탕롱 황성'` | `CONFIRMED_ISSUE` (Missing `locationTagVi`) |
| Day 02 | `title` / `titleVi` | `'Ngày 02 · Chiều Sâu Văn Hiến & Dấu Ấn Kiến Trúc Pháp'` | `'Day 02 · 천년 역사 탐방 & 프렌치 쿼터의 낭만'` | Korean `title` | `CONFIRMED_ISSUE` (Unmapped in `getLocalizedHaNoiConfig`) |
| Day 02 | `image` | External Unsplash lantern image | External Unsplash lantern image | Lantern image | `CONFIRMED_ISSUE` (Subject mismatch; not local WebP) |
| Day 02 | `activities[0..4]` | *Missing (`NOT_FOUND`)* | 5 items (`09:00` Văn Miếu, `11:30` Bún chả lunch, `14:00` Thăng Long Citadel, `16:30` St. Joseph's Cathedral & French Quarter, `19:00` Indochine French dining) | Korean `title` only | `CONFIRMED_ISSUE` (Missing `titleVi`/`descVi`) |
| Day 03 | `locationTag` | *Missing (`NOT_FOUND`)* | `'서호 & 바트랑'` | `'서호 & 바트랑'` | `CONFIRMED_ISSUE` (Missing `locationTagVi`) |
| Day 03 | `title` / `titleVi` | `'Ngày 03 · Bình Yên Hồ Tây & Tạm Biệt Hà Nội'` | `'Day 03 · 서호의 평화로운 아침 & 장인 마을 배웅'` | Korean `title` | `CONFIRMED_ISSUE` (Unmapped in `getLocalizedHaNoiConfig`) |
| Day 03 | `activities[0..3]` | *Missing (`NOT_FOUND`)* | 4 items (`08:30` West Lake & Trấn Quốc Pagoda, `10:30` Bát Tràng pottery workshop, `13:00` Bánh cuốn farewell lunch, `15:30` HAN airport drop-off) | Korean `title` only | `CONFIRMED_ISSUE` (Missing `titleVi`/`descVi`) |

---

## 7. Proposed Three-Chapter Content — Cinematic Travel Journal (`PROPOSED`)

### 7.1 Section Header & Journey Summary Ribbon
- **Eyebrow:** `THE HANOI SIGNATURE JOURNEY`
- **Main Title (VI):** `Ba ngày, một Hà Nội đáng nhớ.`
- **Main Title (KO):** `사흘간의 기록, 오래도록 기억될 하노이.` *(Editorial Korean phrasing matching Screen 4–6 documentary tone)*
- **Subtitle (VI):** `Khám phá di sản, hương vị và nhịp sống thủ đô trong một hành trình 3 ngày 2 đêm được thiết kế riêng theo nhịp điệu của bạn.`
- **Subtitle (KO):** `천년의 유산과 깊은 미식, 고즈넉한 일상이 어우러진 2박 3일 프라이빗 여정을 만나보세요.`
- **Compact Journey Summary Pills (Contextual overview, non-binding):**
  - **VI:** `3 Ngày 2 Đêm` · `Tour riêng linh hoạt` · `Đón tiễn sân bay Nội Bài` · `Xe riêng suốt tuyến` · `Lưu trú trung tâm / Hồ Tây`
  - **KO:** `2박 3일` · `100% 프라이빗 투어` · `노이바이 공항 픽업·샌딩` · `전용 차량 이동` · `엄선된 숙소 스테이`

### 7.2 Three Chapters with Time-Block Daily Schedule (`PROPOSED`)

> **Important Business Rule:** Uses flexible time-of-day blocks (`Đón sân bay & Nhận phòng` / `Buổi chiều` / `Buổi tối & Nghỉ đêm`) instead of rigid clock hours (`11:30`, `13:00`), because actual arrival/departure and check-in times depend on the traveler's flight schedule and hotel policy (`NEEDS_BUSINESS_CONFIRMATION` for specific hotel/meal inclusions).

#### Chapter 01 — Chạm vào trái tim Hà Nội / 하노이의 심장에 닿다
- **Location Tag:** `Hồ Hoàn Kiếm & Phố cổ` / `호안끼엠 & 구시가지`
- **Chapter Summary (VI):** `Đón riêng tại sân bay Nội Bài, về nhận phòng khách sạn nghỉ ngơi trước khi thong thả dạo bước quanh Hồ Hoàn Kiếm, 36 phố phường và thưởng thức hương vị Hà Nội đầu tiên.`
- **Chapter Summary (KO):** `노이바이 공항에서 전용 차량으로 편안하게 이동해 호텔 체크인 후, 호안끼엠 호수와 36거리 구시가지를 거닐며 하노이의 첫 풍미를 만납니다.`
- **Time Blocks:**
  1. **`Đón sân bay & Nhận phòng` / `공항 영접 & 호텔 체크인`** (`activityType: 'arrival'`, `serviceRef: 'airport-transfer'`)
     - **VI:** Xe riêng đón tại sân bay Nội Bài (HAN), di chuyển êm ái về trung tâm Hà Nội và nhận phòng khách sạn nghỉ ngơi (linh hoạt theo giờ hạ cánh thực tế).
     - **KO:** 노이바이 국제공항(HAN) 도착 후 전용 차량으로 시내 호텔로 이동해 체크인 및 여독을 풉니다 (실제 항공편 도착 시간에 맞춰 유연하게 조율).
  2. **`Buổi chiều` / `오후 여정`** (`activityType: 'heritage'`, `attractionIds: ['hoan-kiem-lake', 'old-quarter']`)
     - **VI:** Dạo bước Hồ Hoàn Kiếm, cầu Thê Húc – đền Ngọc Sơn, khám phá nhịp sống 36 phố phường và thưởng thức cà phê trứng phố cổ.
     - **KO:** 호안끼엠 호수와 붉은 테훅 다리, 응옥선 사당을 산책하고 36거리 구시가지 골목에서 전통 에그커피를 음미합니다.
  3. **`Buổi tối & Nghỉ đêm` / `저녁 만찬 & 숙소 휴식`** (`activityType: 'culinary'`, `culinaryId: 'pho-bo-hanoi'`)
     - **VI:** Thưởng thức bữa tối Phở bò Hà Nội truyền thống, tản bộ ngắm phố đêm và nghỉ đêm tại khách sạn ở Hà Nội.
     - **KO:** 깊고 맑은 육수의 정통 하노이 소고기 쌀국수로 저녁 식사를 즐긴 뒤 호텔에서 편안한 밤을 보냅니다.

#### Chapter 02 — Dấu ấn ngàn năm / 천년의 시간과 마주하다
- **Location Tag:** `Văn Miếu · Hoàng thành · Khu phố Pháp` / `문묘 · 탕롱 황성 · 프렌치 쿼터`
- **Chapter Summary (VI):** `Hành trình đi sâu vào chiều dài lịch sử Thăng Long tại Văn Miếu – Quốc Tử Giám và Hoàng thành Thăng Long, kết hợp bữa trưa Bún chả than hoa và chiều lãng mạn giữa Khu phố Pháp.`
- **Chapter Summary (KO):** `문묘 국자감과 유네스코 세계유산 탕롱 황성에서 천년 고도의 역사를 마주하고, 숯불 분짜 오찬과 프렌치 쿼터의 고풍스러운 거리를 경험합니다.`
- **Time Blocks:**
  1. **`Buổi sáng` / `오전 여정`** (`activityType: 'heritage'`, `attractionIds: ['van-mieu']`)
     - **VI:** Khởi hành bằng xe riêng từ khách sạn, tham quan Văn Miếu – Quốc Tử Giám và Khuê Văn Các – biểu tượng văn hiến ngàn năm của Hà Nội.
     - **KO:** 호텔에서 전용 차량으로 출발해 베트남 최초의 대학인 문묘 국자감과 규문각 정원을 여유롭게 탐방합니다.
  2. **`Buổi trưa` / `점심 미식`** (`activityType: 'culinary'`, `culinaryId: 'bun-cha-hanoi'`)
     - **VI:** Thưởng thức Bún chả than hoa Hà Nội truyền thống cùng nem cua bể giòn rụm.
     - **KO:** 참숯 향이 배어든 정통 하노이 분짜와 바삭한 게살 넴(Nem)으로 현지 오찬을 즐깁니다.
  3. **`Buổi chiều` / `오후 여정`** (`activityType: 'heritage'`, `attractionIds: ['thang-long-citadel', 'st-joseph-cathedral', 'opera-house']`)
     - **VI:** Khám phá Hoàng thành Thăng Long, tiếp nối bằng hành trình qua Nhà thờ Lớn và những đại lộ kiến trúc Pháp quanh Nhà hát Lớn Hà Nội.
     - **KO:** 유네스코 유산 탕롱 황성을 둘러본 뒤, 성 요셉 대성당과 하노이 오페라 하우스가 이어지는 프렌치 쿼터 거리를 산책합니다.
  4. **`Buổi tối & Nghỉ đêm` / `저녁 미식 & 숙소 휴식`** (`activityType: 'culinary'`, `culinaryId: 'cha-ca-la-vong'`)
     - **VI:** Thưởng thức Chả cá Lã Vọng hoặc ẩm thực Đông Dương tinh tế, xe riêng đưa về khách sạn nghỉ đêm.
     - **KO:** 하노이 명물 짜까 라봉 또는 인도차이나 다이닝으로 저녁을 즐긴 후 전용 차량으로 호텔에 복귀해 휴식합니다.

#### Chapter 03 — Nhịp sống bình yên / 고요한 호수와 장인의 손길
- **Location Tag:** `Hồ Tây · Chùa Trấn Quốc · Bát Tràng` / `서호 · 진국사 · 바트랑`
- **Chapter Summary (VI):** `Đón buổi sáng thanh bình bên mặt nước Hồ Tây và chùa cổ Trấn Quốc, trả phòng khách sạn, ghé thăm làng gốm Bát Tràng 500 năm tuổi trước khi xe riêng tiễn ra sân bay Nội Bài.`
- **Chapter Summary (KO):** `잔잔한 서호와 고찰 진국사에서 평화로운 아침을 맞이하고, 호텔 체크아웃 후 바트랑 도예 마을을 거쳐 항공편 시간에 맞춰 노이바이 공항으로 이동합니다.`
- **Time Blocks:**
  1. **`Buổi sáng & Trả phòng` / `오전 산책 & 체크아웃`** (`activityType: 'heritage'`, `attractionIds: ['tran-quoc-pagoda']`)
     - **VI:** Dạo mát bên Hồ Tây, viếng chùa Trấn Quốc nghìn năm tuổi và hoàn tất thủ tục trả phòng khách sạn.
     - **KO:** 서호 수변과 천년 고찰 진국사를 산책한 후 호텔 체크아웃을 진행합니다.
  2. **`Trải nghiệm làng nghề` / `장인 마을 체험`** (`activityType: 'culture'`, `attractionIds: ['bat-trang-village']`)
     - **VI:** Xe riêng đưa sang làng gốm Bát Tràng bên bờ sông Hồng, tìm hiểu nghệ thuật gốm thủ công và thưởng thức bữa trưa nhẹ (điều chỉnh linh hoạt theo giờ bay).
     - **KO:** 홍강 건너 500년 전통의 바트랑 도자기 마을을 방문해 도예 공방을 둘러보고 오찬을 즐깁니다 (출국 항공편 시간에 맞춰 동선 유연 조율).
  3. **`Tiễn sân bay` / `공항 샌딩 & 출국`** (`activityType: 'departure'`, `serviceRef: 'airport-transfer'`)
     - **VI:** Xe riêng đưa đoàn ra sân bay quốc tế Nội Bài (HAN) theo giờ bay thực tế, khép lại hành trình Hà Nội 3 ngày 2 đêm.
     - **KO:** 항공편 출발 스케줄에 맞춰 전용 차량으로 노이바이 국제공항(HAN)까지 안전하게 이동하며 여정을 마무리합니다.

---

## 8. Localization Audit — KO / VI (`VERIFIED` & `PROPOSED`)

| UI Element | Current Value Rendered in VI | Source Location | Issue | Proposed VI | Proposed KO |
|---|---|---|---|---|---|
| Eyebrow / Kicker | `HÀNH TRÌNH ĐỀ XUẤT · SIGNATURE JOURNEY` | `ItineraryStickyTimeline.jsx#L422` | Generic hardcoded | `THE HANOI SIGNATURE JOURNEY` | `THE HANOI SIGNATURE JOURNEY` |
| Main Heading (`<h2>`) | `'Hành Trình Đáng Nhớ Tại Đà Nẵng.'` | `ItineraryStickyTimeline.jsx#L425` | `CONFIRMED_ISSUE`: Hardcoded Đà Nẵng | `Ba ngày, một Hà Nội đáng nhớ.` | `사흘간의 기록, 오래도록 기억될 하노이.` |
| Section Subtitle | `'노이바이 공항 VIP 영접부터...'` (KO) | `ha-noi.config.js#L966` + `getLocalizedHaNoiConfig` | `CONFIRMED_ISSUE`: Shows KO in VI mode | `Khám phá di sản, hương vị và nhịp sống thủ đô trong một hành trình dành riêng cho bạn.` | `천년의 유산과 깊은 미식, 고즈넉한 일상이 어우러진 2박 3일 프라이빗 여정을 만나보세요.` |
| Duration Badge | `'2박 3일'` | `ItineraryStickyTimeline.jsx#L441` | `CONFIRMED_ISSUE`: `split(' (')[0]` strips VI | `3 Ngày 2 Đêm` | `2박 3일` |
| Chapter Badge | `CHƯƠNG 01 / 03` | `ItineraryStickyTimeline.jsx#L484` | Works, can refine | `CHƯƠNG 01 / 03` | `CHAPTER 01 / 03` |
| Day 1 Title | `'Day 01 · 하노이 도착...'` (KO) | `ha-noi.config.js#L972` | `CONFIRMED_ISSUE`: Unmapped `titleVi` | `Chương 01 · Chạm vào trái tim Hà Nội` | `Chapter 01 · 하노이의 심장에 닿다` |
| Day 2 Title | `'Day 02 · 천년 역사 탐방...'` (KO) | `ha-noi.config.js#L987` | `CONFIRMED_ISSUE`: Unmapped `titleVi` | `Chương 02 · Dấu ấn ngàn năm` | `Chapter 02 · 천년의 시간과 마주하다` |
| Day 3 Title | `'Day 03 · 서호의 평화로운...'` (KO) | `ha-noi.config.js#L1002` | `CONFIRMED_ISSUE`: Unmapped `titleVi` | `Chương 03 · Nhịp sống bình yên` | `Chapter 03 · 고요한 호수와 장인의 손길` |
| Location Tags (Days 1–3) | `'호안끼엠 & 구시가지'`, etc. (KO) | `ha-noi.config.js#L971,986,1001` | `CONFIRMED_ISSUE`: Missing `locationTagVi` | `Hồ Hoàn Kiếm & Phố cổ` / `Văn Miếu · Hoàng thành · Khu phố Pháp` / `Hồ Tây · Chùa Trấn Quốc · Bát Tràng` | `호안끼엠 & 구시가지` / `문묘 · 탕롱 황성 · 프렌치 쿼터` / `서호 · 진국사 · 바트랑` |
| Time Block & Activity Copy | Korean strings only | `ha-noi.config.js#L976-1011` | `CONFIRMED_ISSUE`: Missing `titleVi`/`descVi` | Full VI time-block schedule (Section 7.2) | Full KO time-block schedule (Section 7.2) |
| Primary CTA Button | `'Tùy chỉnh lịch trình 3N2Đ này'` | `ItineraryStickyTimeline.jsx#L553` | Calls `applyItinerary` | `Cá nhân hóa hành trình này` | `이 여정을 나만의 일정으로 맞춤 설계하기` |

---

## 9. Image Asset Audit (`VERIFIED`)

### 9.1 Current Screen 7 Images in `ha-noi.config.js`

| Chapter | Current URL in `ha-noi.config.js` | Line | Format / Host | Subject Accuracy | License / Attribution Status | Issue |
|---|---|---|---|---|---|---|
| Day 01 | `https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80` | `975` | External JPEG (Unsplash CDN) | Generic coffee cup closeup (also duplicated in `HanoiYourStory.jsx#L81` and `ha-noi.config.js#L927`) | External hotlink, no local attribution | `CONFIRMED_ISSUE`: Not local WebP; generic coffee photo instead of Hồ Hoàn Kiếm / Old Quarter |
| Day 02 | `https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80` | `990` | External JPEG (Unsplash CDN) | **Hội An silk lanterns** (also duplicated in `HanoiYourStory.jsx#L29`) | External hotlink, no local attribution | `CONFIRMED_ISSUE`: Wrong city/subject for Văn Miếu & Hoàng thành Thăng Long |
| Day 03 | `https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80` | `1005` | External JPEG (Unsplash CDN) | Sunset water view (also duplicated in `ha-noi.config.js#L916`) | External hotlink, no local attribution | `CONFIRMED_ISSUE`: Not local WebP |

### 9.2 Verified Local WebP Assets Already Available in Repository (`VERIFIED`)

In `public/assets/destinations/hanoi/attractions/` and `src/features/destinations/data/hanoiAttractionAssets.js` (`lines 9–217`), the repository **already contains 16 verified local WebP assets** (`1200x800` desktop + `800x600` mobile) with complete Wikimedia Commons open-license provenance (`photographer`, `sourceUrl`, `license`, `licenseUrl`):

| Chapter | Recommended Local WebP Asset (Primary & Secondary/Gallery) | File Size (Desktop / Mobile) | Photographer & License (`hanoiAttractionAssets.js`) | Subject Match |
|---|---|---|---|---|
| **Chapter 01** (Hồ Hoàn Kiếm & Phố cổ) | `/assets/destinations/hanoi/attractions/hoan-kiem-lake-desktop.webp` (`-mobile.webp`) + `old-quarter-desktop.webp` | `109.1 KB` / `65.0 KB` | `JakobHosp` (`CC BY 4.0`, Wikimedia Commons) | `VERIFIED`: Red Thê Húc Bridge over Hồ Hoàn Kiếm leading to Ngọc Sơn Temple |
| **Chapter 02** (Văn Miếu · Hoàng thành · Khu phố Pháp) | `/assets/destinations/hanoi/attractions/van-mieu-desktop.webp` (`-mobile.webp`) + `thang-long-citadel-desktop.webp` / `st-joseph-cathedral-desktop.webp` | `108.3 KB` / `65.3 KB` | `Christophe95` (`CC BY-SA 4.0`, Wikimedia Commons) | `VERIFIED`: Khuê Văn Các pavilion at Văn Miếu – Quốc Tử Giám |
| **Chapter 03** (Hồ Tây · Chùa Trấn Quốc · Bát Tràng) | `/assets/destinations/hanoi/attractions/tran-quoc-pagoda-desktop.webp` (`-mobile.webp`) + `bat-trang-village-desktop.webp` | `108.3 KB` / `64.8 KB` | `Jakub Hałun` (`CC BY 4.0`, Wikimedia Commons) | `VERIFIED`: 11-story red stupa of Chùa Trấn Quốc reflecting on West Lake (Hồ Tây) |

> **Asset Budget Advantage:** Reusing `HANOI_ATTRACTION_ASSETS` (`hoan-kiem-lake`, `van-mieu`, `tran-quoc-pagoda`) adds **0 KB** of new network payload (already cached from Screen 6!) while providing 100% verified local WebP files and complete open-license attribution.

---

## 10. Architecture Options Comparison

| Criteria | Option A: Hanoi-Specific Component (`HanoiTravelJournal.jsx`) | Option B: Configuration-Driven Shared Component (`ItineraryStickyTimeline`) | Option C: Shared Data/Hook Layer + Presentation Sub-Renderers |
|---|---|---|---|
| **Shared Architecture** | Breaks shared pattern by fork-duplicating itinerary section | Preserves single `<ItineraryStickyTimeline />` entry point across all routes | Keeps `<ItineraryStickyTimeline />` shell + delegates to `CinematicJournalView` vs `LegacyStickyView` |
| **Hanoi Customization** | Full freedom | Full freedom via `itineraryConfig.presentation = 'cinematic-journal'` | Full freedom via sub-component |
| **Đà Nẵng Isolation** | 100% isolated | High (when gated by `isCinematicJournal` flag + scoped `.is-cinematic-journal` CSS) | 100% isolated in legacy sub-renderer |
| **Maintenance & Duplication** | Duplicates timeline/CTA/TripBuilder wiring | Minimal duplication; single shared component | Very clean separation of JSX if `ItineraryStickyTimeline.jsx` (`630 lines`) grows large |
| **Regression Risk** | Low | Low (with strict config opt-in) | Lowest |
| **Future Expansion (16 destinations)** | Poor (requires new component per city) | Excellent (any destination can opt into `cinematic-journal` via config) | Excellent |

- **Recommendation (`PROPOSED`):** **Option B (implemented with internal modular sub-components like Screen 6)** — keep `ItineraryStickyTimeline.jsx` as the single shared component receiving `itinerariesData` (and optional `itineraryMeta` / presentation config), while extracting the Hanoi `cinematic-journal` card/schedule markup into a clean internal sub-component (e.g., `ItinerarySticky/components/JournalChapterSchedule.jsx`) and scoping all new styles under `.itinerary-sticky-timeline.is-cinematic-journal`. This satisfies Option B's configuration-driven shared architecture while keeping `ItineraryStickyTimeline.jsx` modular and protecting Đà Nẵng 100%.

---

## 11. Visual Layout Proposal — Cinematic Travel Journal (`PROPOSED`)

### 11.1 Desktop Wireframe (`>= 1024px`, Target Height fits within 1 Usable Viewport)

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│ THE HANOI SIGNATURE JOURNEY                                                      │
│ Ba ngày, một Hà Nội đáng nhớ.             [3 Ngày 2 Đêm] [Xe riêng] [Đón tiễn SB]│
│ Khám phá di sản, hương vị và nhịp sống thủ đô trong hành trình dành riêng cho bạn│
├───────────────────────────────────────┬──────────────────────────────────────────┤
│  CHAPTER 02 / 03   📍 Văn Miếu · Pháp │  CHƯƠNG 02 · NGÀY 02                     │
│                                       │  Dấu ấn ngàn năm                         │
│                                       │  Hành trình đi sâu vào chiều dài lịch sử │
│     [ 16:10 Editorial Photograph ]    │  ──────────────────────────────────────  │
│     (2-Layer Decoded Reveal +         │  01 BUỔI SÁNG                            │
│      Subtle Ken Burns 1.0 -> 1.035)   │     Văn Miếu – Quốc Tử Giám & Khuê Văn Các│
│                                       │  02 BUỔI TRƯA                            │
│                                       │     Thưởng thức Bún chả than hoa Hà Nội  │
│                                       │  03 BUỔI CHIỀU                           │
│                                       │     Hoàng thành Thăng Long & Khu phố Pháp│
│  Ảnh: Christophe95 (CC BY-SA 4.0)     │  04 BUỔI TỐI & NGHỈ ĐÊM                  │
│  Chương 02 · Dấu ấn ngàn năm          │     Chả cá Lã Vọng & Nghỉ đêm khách sạn  │
│                                       │  ──────────────────────────────────────  │
│  [Đã chọn 2 địa điểm thuộc ngày này]  │  [ Cá nhân hóa hành trình này → ]        │
├───────────────────────────────────────┴──────────────────────────────────────────┤
│  (01) NGÀY 01: Chạm vào trái tim Hà Nội ━━━ (02) NGÀY 02: Dấu ấn ngàn năm ━━━ (03)│
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 11.2 Tablet (`769px–992px`) & Mobile (`<= 768px`) Wireframe
- **Tablet:** Compact 3-day chapter selector pill bar at top of stage -> `16:9` Chapter Photograph -> Time-block editorial schedule -> Full-width personalization CTA.
- **Mobile:** Natural document flow; sticky/horizontal 3-day chapter tabs (`Ngày 01` | `Ngày 02` | `Ngày 03`) right above the chapter photograph (`16:10`) so users can tap between chapters without scrolling down to a bottom timeline, followed by the clean vertical time-block schedule (no nested boxed cards) and a 44px+ CTA button.

---

## 12. Scroll Experience Comparison (`S1` vs `S2` vs `S3`)

| Criteria | Option S1: Natural Scroll + Interactive Click Timeline (Unpinned) | Option S2: Short Adaptive Pin (`~130–160vh`) + Manual Click | Option S3: Long Scroll-Driven 3 Chapters (`+=255%` / `255vh+`) |
|---|---|---|---|
| **Cinematic Quality** | High (one-time entrance + smooth click-driven 2-layer photo reveal & Ken Burns) | High | High in isolation, but heavy after Screen 1–6 |
| **Readability** | Best (user reads 4 time blocks at their own pace without scroll shifting the day) | Good | Risk of scroll inertia skipping Day 2 while reading |
| **Interaction Clarity** | Crystal clear (click Day 01 / 02 / 03 tabs or Prev/Next) | Moderate (requires Scroll vs Manual mode like Screen 6) | Complex (currently `handleDayClick` calls `lenis.scrollTo`, fighting manual scroll) |
| **Runtime Complexity** | Minimal (zero pin spacer, zero resize eligibility oscillation) | Moderate | High |
| **Screen 6 → 7 Continuity** | **Best** — Screen 6 already pins for `340vh`. Entering an unpinned editorial journal gives immediate relief from scroll pinning | Acceptable if adaptive | **Poor** — back-to-back `340vh` (Screen 6) + `255vh` (Screen 7) = `595vh` of consecutive pinning |
| **Laptop (`1366x768`, `1280x720`)** | 100% safe, zero clipping | Requires height-eligibility fallback | Currently hides 4th+ activities via `display: none` (`ItineraryStickyTimeline.css#L949-L951`!) |

- **Critical Finding in Current CSS (`CONFIRMED_ISSUE`):**
  Look at `ItineraryStickyTimeline.css` `lines 949–951` inside `@media (min-width: 769px) and (max-height: 700px)`:
  ```css
  .itinerary-sticky-timeline .journal-activity-item:nth-child(n+4) {
    display: none;
  }
  ```
  Because the current component forces a `+=255%` pin on `max-height: 700px`, it literally hides the 4th and 5th activities of the day with `display: none`!
- **Recommendation (`PROPOSED`):** **Option S1 (Natural Document Scroll + Interactive 3-Day Timeline + One-Time GSAP Entrance + 2-Layer Photo Reveal / Subtle Ken Burns on Day Switch)** for Hanoi's `cinematic-journal` variant (while keeping Đà Nẵng's legacy `+=totalDays * 85%` pinned timeline untouched).
  - **Why S1 is the strongest choice after Screen 6:**
    1. Screen 4 (`HanoiTaste3D`), Screen 5 (`HanoiSeasons3D` `320vh`), and Screen 6 (`Interactive3DMap` `340vh`) are three consecutive pinned scroll experiences.
    2. Making Screen 7 (`Cinematic Travel Journal`) a compact, unpinned ~1-viewport interactive editorial spread eliminates back-to-back pin fatigue, never hides activities on `1280x720` / `1366x768`, never creates pin-spacer handoff jumps after Screen 6, and lets the traveler read and compare Day 01 / Day 02 / Day 03 effortlessly.

---

## 13. Motion Architecture (`PROPOSED`)

1. **One-Time Viewport Entrance (`ScrollTrigger` `once: true`):**
   - When `#itinerary` enters (`start: 'top 82%'`), stagger-fade Header -> Summary Ribbon -> Journal Stage -> 3-Day Timeline (`y: 16 -> 0`, `opacity: 0 -> 1`, `duration: 0.55s`, `stagger: 0.07s`, `clearProps: 'transform,opacity'`).
2. **2-Layer Decoded Image Reveal + Subtle Ken Burns (`activeDayIndex` change):**
   - Same proven pattern as Screen 6 V1.3 (`AttractionDetailPanel.jsx`): preload & `img.decode()` incoming chapter WebP with monotonic `loadTokenRef` cancellation on rapid day clicks, crossfade incoming layer (`opacity: 0 -> 1`, `duration: 0.42s`) with subtle Ken Burns settle (`scale: 1.04 -> 1.0`, `duration: 1.1s`, `ease: 'power2.out'`, zero infinite loop).
3. **Editorial Text Stagger (`activeDayIndex` change only, skipped on KO <-> VI toggle):**
   - Stagger chapter header + time-block rows (`y: 8 -> 0`, `opacity: 0 -> 1`, `duration: 0.26s`, `stagger: 0.04s`, `overwrite: true`).
4. **Reduced Motion (`prefers-reduced-motion: reduce`):**
   - Instant day swap, zero Ken Burns scale, zero text stagger, zero pulse rings.

---

## 14. Screen 6 → Screen 7 Integration Audit (`VERIFIED`)

- **Current Order in `HanoiExperiencePage.jsx` (`lines 52–65`):**
  - Line 54: `<Interactive3DMap attractionsData={destination.attractions} />` (`#attractions`, Screen 6)
  - Line 59: `<HanoiYourStory />` (currently sits between Screen 6 and `ItineraryStickyTimeline`!)
  - Line 64: `<ItineraryStickyTimeline itinerariesData={destination.itineraries} />` (`#itinerary`)
- **Handoff Findings:**
  - Screen 6 V1.3 pins `.atlas-pin-stage` for `340vh` (`65vh` entry + `190vh` discovery + `85vh` exit hold) and includes a `clamp(4.5rem, 9vh, 7.25rem)` bottom transition buffer ending in `#172026`.
  - When `ItineraryStickyTimeline` (`#itinerary`) is placed as Screen 7 directly after Screen 6, starting its background gradient at `#172026 -> #101A20 -> #0D1828` creates a seamless visual transition from Screen 6's `#172026` bottom edge.
  - Because Screen 7 will use scoped selectors and its own `containerRef`, it will never touch Screen 6's `ScrollTrigger`, MapLibre instance, or `TripBuilderContext` selections.

---

## 15. TripBuilder Data Flow Audit (`TripBuilderContext.jsx`)

### 15.1 State Inventory (`TripBuilderContext.jsx#L108-L173`, `VERIFIED`)

| Field | Type | Default (Đà Nẵng) | Initial Value (Hà Nội, `lines 163–173`) | Writer APIs | Readers | Persistence |
|---|---|---|---|---|---|---|
| `currentStep` | `number` (`1..7`) | `1` | `1` | `setStep`, `nextStep`, `prevStep`, `preselectService`, `applyItinerary` | `TripBuilderMorph` | In-memory React state (resets on reload/route switch) |
| `destination` | `string` | `'Đà Nẵng'` / `'다낭'` | `'Hà Nội'` / `'하노이'` | `useEffect` on language/config | `TripBuilderMorph`, `submitTrip` | In-memory |
| `destinationSlug` | `string` | `'da-nang'` | `'ha-noi'` | `useEffect` on config | `TripBuilderContext`, `submitTrip` | In-memory |
| `durationDays` | `number` | `4` | `4` *(Note: Hanoi default is still `4` from `DEFAULT_TRIP_STATE` until updated!)* | `updateField('durationDays', n)`, `applyItinerary` | `TripBuilderMorph` Step 1 & Summary | In-memory |
| `adultsCount` / `childrenCount` | `number` | `2` / `0` | `2` / `0` | `updateField` | `TripBuilderMorph` Step 1 & Summary | In-memory |
| `accommodationType` | `string` | `'resort'` | `'heritage'` (`line 167`) | `updateField`, `preselectService('accommodation', ...)` | `TripBuilderMorph` Step 2 & Summary | In-memory |
| `accommodationName` | `string` | `'Hyatt Regency...'` | `''` (`line 168`) | `updateField`, `preselectService('accommodation', ...)` | `TripBuilderMorph` Step 2 & Summary | In-memory |
| `transportType` | `string` | `'suv-7'` | `'suv-7'` | `updateField`, `preselectService('transportation', ...)` | `TripBuilderMorph` Step 3, `VehicleShowcase3D` | In-memory |
| `guideOption` / `guideLanguage` | `string` | `'dedicated'` / `'Tiếng Việt'` | `'dedicated'` / `'한국어 (전담)'` or `'Tiếng Việt'` | `updateField`, `preselectService('guide', ...)` | `TripBuilderMorph` Step 4 & Summary | In-memory |
| `flightOption` / `departureCity` | `string` | `'need_support'` / `'Hà Nội'` | `'need_support'` / `'인천 (ICN)'` or `'Hà Nội'` | `updateField`, `preselectService('flights', ...)` | `TripBuilderMorph` Step 5 | In-memory |
| `selectedAttractions` | `string[]` | `['ba-na-hills', 'hoi-an-ancient-town', 'my-khe-beach']` | `[]` (Empty array via `defaultSelectedAttractions: []`, `lines 154–159`) | `toggleAttraction(id)`, `preselectService('attraction', id)` | `HanoiHeritageChamber`, `Interactive3DMap`, `TripBuilderMorph` Step 6 | In-memory |
| `culinaryPreferences` | `string[]` | `['Đặc sản địa phương', 'Hải sản tươi sống']` | `[]` (`line 170`) | `toggleCulinary(pref)` (with `CULINARY_ALIAS_GROUPS` deduplication) | `HanoiTaste3D`, `CulinaryFilmScene`, `TripBuilderMorph` Step 6 | In-memory |
| `specialRequests` | `string` | `''` | `''` | `updateField`, `applyItinerary` | `TripBuilderMorph` Step 6 | In-memory |

### 15.2 Stable ID Mapping Between Screen 3, Screen 4, Screen 6, and Screen 7 (`VERIFIED`)

| Screen 7 Chapter & Time Block | Screen 6 Attraction ID (`ha-noi.config.js#L492-L775`) | Screen 4 Culinary ID (`TripBuilderContext.jsx#L10-L57`) | Match Status |
|---|---|---|---|
| **Chapter 01 · Afternoon:** Hồ Hoàn Kiếm & Ngọc Sơn | `'hoan-kiem-lake'` | — | `VERIFIED` exact ID match |
| **Chapter 01 · Afternoon:** Phố cổ 36 phố phường & Cà phê trứng | `'old-quarter'` | `'egg-coffee'` | `VERIFIED` exact ID match |
| **Chapter 01 · Evening:** Phở bò Hà Nội | — | `'pho-bo-hanoi'` (`CULINARY_ALIAS_GROUPS[0]`) | `VERIFIED` exact alias group match |
| **Chapter 02 · Morning:** Văn Miếu – Quốc Tử Giám (also Screen 3) | `'van-mieu'` | — | `VERIFIED` exact ID match (shared with Screen 3 & Screen 6) |
| **Chapter 02 · Lunch:** Bún chả than hoa Hà Nội | — | `'bun-cha-hanoi'` (`CULINARY_ALIAS_GROUPS[1]`) | `VERIFIED` exact alias group match |
| **Chapter 02 · Afternoon:** Hoàng thành Thăng Long | `'thang-long-citadel'` | — | `VERIFIED` exact ID match |
| **Chapter 02 · Afternoon:** Nhà thờ Lớn & Nhà hát Lớn (Khu phố Pháp) | `'st-joseph-cathedral'`, `'opera-house'` | — | `VERIFIED` exact ID match |
| **Chapter 02 · Evening:** Chả cá Lã Vọng | — | `'cha-ca-la-vong'` (`CULINARY_ALIAS_GROUPS[3]`) | `VERIFIED` exact alias group match |
| **Chapter 03 · Morning:** Hồ Tây & Chùa Trấn Quốc | `'tran-quoc-pagoda'` | — | `VERIFIED` exact ID match |
| **Chapter 03 · Late Morning:** Làng gốm Bát Tràng | `'bat-trang-village'` | — | `VERIFIED` exact ID match |

> **100% Coverage (`VERIFIED`):** All 8 attractions from Screen 6 (`hoan-kiem-lake`, `old-quarter`, `van-mieu`, `thang-long-citadel`, `st-joseph-cathedral`, `opera-house`, `tran-quoc-pagoda`, `bat-trang-village`) and all 3 signature dishes from Screen 4 (`pho-bo-hanoi`, `bun-cha-hanoi`, `cha-ca-la-vong`) map 1:1 to the 3 chapters of Screen 7!
> - When a traveler selects attractions in Screen 6 (or dishes in Screen 4), Screen 7 can display a subtle badge (`✓ Có trong lựa chọn của bạn` / `✓ 내 선택에 포함됨`) next to matching time blocks **read-only**, without mutating `selectedAttractions` or altering the suggested schedule!

---

## 16. Personalization CTA Audit & Plan

- **Current Behavior (`TripBuilderContext.jsx#L294-L307` & `ItineraryStickyTimeline.jsx#L548`):**
  Clicking `.journal-action-cta` calls `applyItinerary(activeItinerary)`, which mutates:
  1. `durationDays: itinerary.daysCount || 4` (sets `durationDays = 3` for Hanoi 3D2N)
  2. `specialRequests`: overwrites `prev.specialRequests` with ``Yêu cầu theo khung lịch trình đề xuất: ${itinerary.title}``!
  3. `currentStep: 1`
  4. Scrolls to `#trip-builder` via `scrollIntoView({ behavior: 'smooth' })`.
- **Confirmed Risk (`CONFIRMED_ISSUE`):**
  - Overwriting `specialRequests` erases any custom note the user already typed in Step 6.
  - Using native `scrollIntoView` instead of `lenis.scrollTo` bypasses Lenis smooth scroll offset (`-76px` navbar height).
- **Proposed Safe CTA Behavior for Screen 7 V1 (`PROPOSED`):**
  - Primary CTA label: **VI:** `Cá nhân hóa hành trình này` / **KO:** `이 여정을 나만의 일정으로 맞춤 설계하기`
  - Scrolls smoothly to `#trip-builder` using `getLenis()?.scrollTo(builderEl, { offset: -76, duration: 1.1 })` (with `scrollIntoView` fallback).
  - Preserves 100% of existing `selectedAttractions`, `culinaryPreferences`, `accommodationType`, `transportType`, `adultsCount`, `childrenCount`, and user-typed `specialRequests`!

---

## 17. Future Screen 8 Architecture — Private Chauffeur Experience (`PROPOSED`)

### 17.1 Existing Transportation Data Inventory (`ha-noi.config.js#L367-L432`)

| Vehicle Field | Exists in `ha-noi.config.js`? | Source Location | Verified Business Fact? | Missing / Issues |
|---|---|---|---|---|
| Section Header (`kicker`, `title`, `titleVi`, `subtitle`, `subtitleVi`) | Yes | `lines 392–399` | Marketing copy (`NEEDS_BUSINESS_CONFIRMATION` for `"100% 2022+"` claim) | Not mapped in `getLocalizedHaNoiConfig('vi')` |
| Airport Transfer (`flights` block) | Yes | `lines 367–390` | Marketing copy (`HAN` pickup) | Not mapped in `getLocalizedHaNoiConfig('vi')` |
| `vehicles` array (`suv-7`, `van-16`, `limousine-vip`) | Yes (3 categories) | `lines 400–431` | Generic vehicle categories (`NEEDS_BUSINESS_CONFIRMATION` for exact models Kia Carnival / Everest / Solati / DCar) | Missing `descVi`, `seatsVi`, `luggageVi`, `featuresVi`, `modelExample`, `idealFor` (expected by `VehicleShowcase3D.jsx#L153,190`!) |
| Vehicle Images | External Unsplash URLs | `lines 409, 419, 429` | Illustrative stock photos (`NEEDS_LICENSE_VERIFICATION`) | Need verified local WebP assets (exterior + interior) |
| TripBuilder IDs (`'suv-7'`, `'van-16'`, `'limousine-vip'`) | Yes | Matches `TripBuilderContext.jsx#L122` & `TripBuilderMorph.jsx#L416-L426` | `VERIFIED` ID alignment | `TripBuilderMorph` also lists `'coach-35'`, `'coach-45'`, `'consultant'` |

### 17.2 Shared Component Readiness (`VehicleShowcase3D.jsx`)
- `src/features/destinations/components/VehicleShowcase3D/VehicleShowcase3D.jsx` (`212 lines`, `<section id="transportation">`) **already exists** and connects to `TripBuilderContext` via `preselectService('transportation', vehicle, true)` (`line 60`).
- **Issues to Fix When Implementing Future Screen 8:**
  1. `VehicleShowcase3D.jsx` currently pins `#transportation` for `+=120%` (`lines 31–38`) with a pseudo-3D `rotateY` turntable effect; for Hanoi Screen 8, it should support an **unpinned editorial presentation variant** (`presentation: 'editorial-chauffeur'`) per our Pin Budget strategy.
  2. `ha-noi.config.js` `transportation.vehicles` is missing `descVi`, `seatsVi`, `luggageVi`, `featuresVi`, `modelExample`, and `idealFor` (which `VehicleShowcase3D.jsx` renders at `lines 153, 190`).

---

## 18. Future Screen 9 Architecture — Curated Hotel Collection (`PROPOSED`)

### 18.1 Existing Accommodation Data Inventory (`ha-noi.config.js#L215-L317`)

| Accommodation Field | Exists in `ha-noi.config.js`? | Source Location | Verified Business Fact? | Missing / Issues |
|---|---|---|---|---|
| Config Key Name | Named `hotels` in `ha-noi.config.js` (`line 214`), whereas `da-nang.config.js` (`line 116`) & `DestinationPage.jsx` (`line 200`) use `accommodation`! | `ha-noi.config.js#L214` | `CONFIRMED_ISSUE` (Key mismatch: `hotels` vs `accommodation`) | Must alias or normalize `hotels` / `accommodation` |
| Categories (`heritage`, `boutique`, `lakeside`) | Yes (3 categories) | `lines 222–226` | Category taxonomy | Note: `TripBuilderMorph.jsx#L346-L357` uses `'heritage'`, `'westlake'`, `'boutique'`, `'city5star'`, `'self'` (`'lakeside'` vs `'westlake'` ID mismatch!) |
| Hotel Items (`sofitel-metropole`, `capella-hanoi`, `intercon-westlake`, `oriental-jade`) | Yes (4 named 5-star hotels) | `lines 227–316` | Public landmark hotels, **NOT** verified contract partners (`NEEDS_BUSINESS_CONFIRMATION`) | Missing `highlightsVi` (`highlights` is Korean-only at `lines 242, 264, 286, 308`) and `quoteVi` |
| Hotel Images | External Unsplash URLs | `lines 248, 270, 292, 314` | Illustrative stock photos (`NEEDS_LICENSE_VERIFICATION`) | Need verified local WebP assets |

### 18.2 Shared Component Readiness (`Accommodation3DScene.jsx`)
- `src/features/destinations/components/Accommodation3D/Accommodation3DScene.jsx` (`593 lines`, `<section id="accommodation">`) **already exists** and connects to `TripBuilderContext` via `preselectService('accommodation', item, true)`.
- **Issues to Fix When Implementing Future Screen 9:**
  1. `Accommodation3DScene.jsx` runs a **permanent `requestAnimationFrame` canvas loop** (`renderRipples` on `canvasRef`, `lines 71–117`) and pins `#accommodation` for `+=240%` (`line 160`). For Hanoi Screen 9, it should use an **unpinned, calm hospitality editorial variant** (`presentation: 'curated-collection'`) with the water-ripple canvas loop disabled.
  2. Reconcile category ID `'lakeside'` (`ha-noi.config.js#L225`) with `'westlake'` (`TripBuilderMorph.jsx#L347`) so clicking `preselectService('accommodation', item)` selects the matching radio option in Step 2 of `TripBuilderMorph`.

---

## 19. Future TripBuilder Extension Planning (`VERIFIED`)

- **Existing Capabilities (`TripBuilderContext.jsx#L117-L123, #L261-L291`):**
  - `TripBuilderContext` **already supports** vehicle and accommodation preferences without any schema migration:
    - `tripState.accommodationType` (`'heritage' | 'westlake' | 'boutique' | 'city5star' | 'self'`)
    - `tripState.accommodationName` (`string`)
    - `tripState.transportType` (`'suv-7' | 'van-16' | 'limousine-vip' | 'coach-35' | 'coach-45' | 'consultant'`)
    - `preselectService('accommodation', { category, id, name }, autoScroll)`
    - `preselectService('transportation', { id }, autoScroll)`
- **Recommended Enhancement for Future Screen 8 & 9:**
  - `preselectService` already accepts `autoScroll = true` (default) or `autoScroll = false` (`line 261`)! Passing `autoScroll = false` (or offering a non-jumping "Chọn ưu tiên cho chuyến đi" toggle) lets users pick their preferred vehicle in Screen 8 and preferred hotel style in Screen 9 while continuing to scroll naturally into Screen 10 (`TripBuilderMorph`).

---

## 20. Current-to-Target 12-Screen Roadmap Mapping

| Current Position in `HanoiExperiencePage.jsx` | Actual Component | Current Section ID | Target 12-Screen Roadmap Position | Recommended Future Action |
|---|---|---|---|---|
| 01 (`line 29`) | `HanoiAwakeningHero` | `hanoi-awakening-hero` | **Screen 01** — Hà Nội thức giấc | Keep as-is (`VERIFIED`) |
| 02 (`line 34`) | `HanoiOldQuarterWalk` | `scene-old-quarter` | **Screen 02** — Phố cổ 36 phố phường | Keep as-is (`VERIFIED`) |
| 03 (`line 39`) | `HanoiHeritageChamber` | `hanoi-heritage` | **Screen 03** — Không gian di sản | Keep as-is (`VERIFIED`) |
| 04 (`line 44`) | `HanoiTaste3D` | `hanoi-taste` | **Screen 04** — Mỹ vị Hà Nội | Keep as-is (`VERIFIED`) |
| 05 (`line 49`) | `HanoiSeasons3D` | `hanoi-seasons` | **Screen 05** — Hà Nội qua bốn mùa | Keep as-is (`VERIFIED`) |
| 06 (`line 54`) | `Interactive3DMap` | `attractions` | **Screen 06** — Interactive Travel Atlas | Keep as-is (`VERIFIED`) |
| 07 (`line 59`) | `HanoiYourStory` | *none* | *(Not in 12-Screen Roadmap — redundant 6-pillar card section)* | **Decision Required:** Demote/remove or merge into Screen 7/10 when reordering (`NEEDS_BUSINESS_CONFIRMATION`) |
| 08 (`line 64`) | `ItineraryStickyTimeline` | `itinerary` | **Screen 07** — Cinematic Travel Journal (3N2Đ) | Upgrade to Cinematic Travel Journal V1 & place directly after Screen 06 |
| *(Not mounted on Hanoi)* | `VehicleShowcase3D` (shared component exists) | `transportation` | **Screen 08** — Private Chauffeur Experience | Future Phase 5: Mount shared component with unpinned Hanoi editorial variant |
| *(Not mounted on Hanoi)* | `Accommodation3DScene` (shared component exists) | `accommodation` | **Screen 09** — Curated Hotel Collection | Future Phase 6: Mount shared component with unpinned Hanoi hospitality variant |
| 09 (`line 69`) | `TripBuilderMorph` | `trip-builder` | **Screen 10** — Thiết kế chuyến đi | Keep as-is (`#trip-builder`) |
| 10 (`line 74`) | `CustomerStories` | `reviews` | **Screen 11** — Câu chuyện khách hàng | Keep as-is (`#reviews`, localize `customerStories` in `getLocalizedHaNoiConfig`) |
| 11 (`line 79`) | `CinematicEndingScene` | *none* | **Screen 12** — Cinematic Ending | Keep as-is (`finalCta`) |

---

## 21. Navigation & Anchor Audit (`destinationNav.config.js` & `DestinationHeader.jsx`)

- **Current Hanoi Navbar Items (`destinationNav.config.js#L56-L100`, `VERIFIED`):**
  1. `scene-old-quarter` (`Phố cổ 36 phố` / `36거리 골목`)
  2. `hanoi-heritage` (`Không gian di sản` / `천년 유산`)
  3. `hanoi-taste` (`Mỹ vị Hà Nội` / `미식 큐레이션`)
  4. `attractions` (`Bản đồ 3D` / `3D 지도`)
  5. `itinerary` (`Lịch trình` / `추천 여정`)
  6. `trip-builder` (`Thiết kế tour` / `맞춤 여행 만들기` — `isHighlight: true`)
- **Comparison of Navigation Options for Future Screens 8 & 9:**

| Criteria | Option N1: Keep Current 6 Navbar Items | Option N2: Add 1 Combined "Dịch vụ" Item (`#transportation`) | Option N3: Add 2 Items ("Xe riêng" + "Khách sạn") |
|---|---|---|---|
| **Navbar Density** | **Optimal** (6 items fit `1280px–1440px` without wrapping alongside Logo, Flag badge, KO/VI switcher, Hotline, and Quote CTA) | Tight (7 items risk wrapping at `1280px–1366px`) | **Overcrowded** (8 items will overflow `.dest-header-container` on `1280px–1440px` laptops) |
| **Discoverability** | High (Screens 8 & 9 sit naturally between `#itinerary` and `#trip-builder`) | High | High |
| **Mobile Usability** | Clean 6-item drawer | 7-item drawer | 8-item drawer |
| **Compatibility** | 100% compatible today (no dead links while Screen 8 & 9 are not yet mounted) | Cannot add before Screen 8 is mounted | Cannot add before Screen 8 & 9 are mounted |

- **Recommendation (`PROPOSED`):** **Option N1** during Screen 7 V1 implementation (keep existing 6 anchor IDs, preserving `#itinerary` and `#trip-builder`), and optionally evaluate **Option N2** only after Screen 8 & 9 are mounted. Also recommend updating `'attractions'` `labelVi` from `'Bản đồ 3D'` to `'Bản đồ khám phá'` (`labelKo: '여행 지도'`) in a future navigation pass if desired.

---

## 22. Responsive & Compact Desktop Layout Audit

### 22.1 Current CSS Measurements (`ItineraryStickyTimeline.css`, Static Estimates)
- `.itinerary-sticky-timeline`: `min-height: 100vh; padding: clamp(3rem, 6vh, 4.5rem) 0;` (`line 9, 20`)
- `.journal-visual-showcase` & `.journal-editorial-aside`: `min-height: clamp(500px, 60vh, 590px)` (`lines 198, 337`), reduced to `clamp(330px, 46vh, 410px)` at `max-height: 850px` (`line 834`) and `clamp(270px, 42vh, 320px)` at `max-height: 700px` (`line 930`, where `.journal-activity-item:nth-child(n+4)` is hidden with `display: none`!).

### 22.2 Target V1 Compact Desktop & Laptop Budget (`PROPOSED`)

| Viewport | Usable Height (`vh - 76px`) | Target Header + Summary | Target Main Stage (Photo + Schedule) | Target 3-Day Timeline | Target Total Content Height | Fits Without Clipping? |
|---|---|---|---|---|---|---|
| `1920 × 1080` | `~1004px` | `~105px` | `~440px` | `~68px` | `~660px` | Yes (100% visible) |
| `1440 × 900` | `~824px` | `~98px` | `~420px` | `~64px` | `~625px` | Yes (100% visible) |
| `1366 × 768` | `~692px` | `~88px` | `~380px` | `~58px` | `~565px` | Yes (100% visible, 0 items hidden) |
| `1280 × 720` | `~644px` | `~84px` | `~365px` | `~56px` | `~540px` | Yes (100% visible, 0 items hidden) |
| `1024 × 768` | `~692px` | `~88px` | `~380px` | `~58px` | `~565px` | Yes |

---

## 23. Accessibility & Reduced Motion Audit

- **Confirmed Accessibility Issues in Current `ItineraryStickyTimeline.jsx` (`CONFIRMED_ISSUE`):**
  1. `line 436`: `aria-label="Chọn gói lịch trình Đà Nẵng"` is hardcoded in Vietnamese and hardcoded to Đà Nẵng.
  2. `line 568`: `aria-label="Thanh tiến trình lịch trình các ngày"` is hardcoded in Vietnamese even when Korean is active.
  3. `lines 605–620`: Day milestone buttons (`.milestone-node-btn`) lack `aria-current={isActive ? 'step' : undefined}` (or `role="tab"` + `aria-selected`).
  4. `lines 340–346`: Inactive slides only toggle `opacity: 0; pointerEvents: 'none'` on desktop without `aria-hidden={!isActive}`, allowing screen readers and keyboard Tab focus to reach hidden CTA buttons on inactive days!
- **Proposed Fixes for Screen 7 V1 (`PROPOSED`):**
  - Render only the active chapter's schedule in the DOM (like Screen 6's `AttractionDetailPanel`) while using a 2-layer image frame for the photograph, completely eliminating hidden duplicate CTA buttons from the tab order!
  - Localize all `aria-label` attributes (`isKorean`) and add `aria-current="step"` on the active day button.

---

## 24. Performance Audit

- **Image Payload:** Replacing the 3 external Unsplash JPEGs (`w=1200&q=80`) with the already-cached local WebP assets from `hanoiAttractionAssets.js` (`hoan-kiem-lake`, `van-mieu`, `tran-quoc-pagoda`, ~108 KB desktop / ~65 KB mobile each) saves **~300+ KB** of duplicate network downloads.
- **Compositing & Animation Cost:**
  - `ItineraryStickyTimeline.css` currently applies `filter: blur(60px)` on `.journal-glow-orb` (`line 40`), `backdrop-filter: blur(16px)` on `.journal-editorial-aside` (`line 341`), permanent `will-change: opacity, transform, clip-path` on all stacked `.journal-visual-slide` elements (`line 215`), and an infinite `@keyframes journalRingPulse` animation (`line 627`).
  - **Proposed V1 Optimization:** For `.is-cinematic-journal`, replace blurred glassmorphism with solid editorial surface `#17242B`, remove permanent `will-change` and infinite `@keyframes journalRingPulse`, and use a max-2-layer decoded image reveal.
- **Runtime FPS / LCP / CLS Measurements:** `BLOCKED` / `NOT_TESTED` (live browser `DevToolsActivePort` unavailable in sandbox).

---

## 25. Đà Nẵng Regression Protection Plan

- **Shared Path Analysis (`VERIFIED`):**
  - `/destinations/da-nang` renders `<ItineraryStickyTimeline itinerariesData={destination.itineraries} />` (`DestinationPage.jsx#L221`) with 3 packages (`4d3n`, `3d2n`, `5d4n`).
- **Isolation Strategy (`PROPOSED`):**
  1. Opt-in via configuration: `presentationVariant = activeItinerary?.presentation?.variant || 'legacy-sticky'`.
  2. When `presentationVariant !== 'cinematic-journal'` (i.e. Đà Nẵng):
     - Keep the legacy `gsap.matchMedia()` pinned timeline (`+=${totalDays * 85}%`), legacy package segmented tabs (`4d3n` / `3d2n` / `5d4n`), legacy `.journal-activity-item` cards, and legacy Đà Nẵng title fallback 100% unchanged.
  3. Scope all new CSS strictly under `.itinerary-sticky-timeline.is-cinematic-journal`.

---

## 26. Proposed Implementation File Scope

### A. Existing Files Requiring Modification in Screen 7 V1 Implementation
1. `src/features/destinations/data/ha-noi.config.js`
   - Update `itineraries[0]` with `presentation: { variant: 'cinematic-journal', scrollMode: 'natural-interactive' }`, bilingual header copy (`Ba ngày, một Hà Nội đáng nhớ.` / `사흘간의 기록, 오래도록 기억될 하노이.`), journey summary pills, verified local WebP asset references (`hoan-kiem-lake`, `van-mieu`, `tran-quoc-pagoda`), and complete bilingual KO/VI time-block schedules for Chapters 01–03 with stable `attractionIds` and `culinaryId` references.
   - Update `getLocalizedHaNoiConfig(language)` (`lines 1074–1112`) to localize `itineraries` (as well as `customerStories` and `finalCta`).
2. `src/features/destinations/components/ItinerarySticky/ItineraryStickyTimeline.jsx`
   - Add configuration-driven `isCinematicJournal` mode supporting natural interactive flow, 2-layer decoded image reveal with subtle Ken Burns, editorial text stagger, time-block daily schedule, read-only Screen 6 selection match badges, and safe `#trip-builder` CTA scroll without overwriting `specialRequests`.
3. `src/features/destinations/components/ItinerarySticky/ItineraryStickyTimeline.css`
   - Add scoped `.itinerary-sticky-timeline.is-cinematic-journal` styles (compact 1-viewport desktop layout, editorial time-block rows without dashboard boxes, responsive tablet/mobile tabs, `prefers-reduced-motion`).
4. `src/features/destinations/components/Hanoi/HanoiExperiencePage.jsx` *(if approved by user)*
   - Place `ItineraryStickyTimeline` (`#itinerary`) directly after `Interactive3DMap` (`#attractions`) as Screen 07.

### B. Potential New Modular File (Optional)
- `src/features/destinations/components/ItinerarySticky/components/CinematicJournalStage.jsx` — cleanly encapsulates the Hanoi `cinematic-journal` stage, 2-layer image reveal, time-block schedule, and 3-day timeline so `ItineraryStickyTimeline.jsx` stays concise and Đà Nẵng's legacy render tree stays untouched.

### C. Protected Files (Will NOT Be Modified in Screen 7 V1)
- `da-nang.config.js`, `TripBuilderContext.jsx`, `LanguageContext.jsx`, `LenisManager.js`, `DestinationPage.jsx`, `DestinationHeader/*`, `DestinationFooter/*`, `Interactive3DMap/*`, `HanoiAwakeningHero/*`, `HanoiOldQuarterWalk/*`, `HanoiHeritageChamber/*`, `HanoiTaste3D/*`, `HanoiSeasons3D/*`, `deploy.ps1`, `rollback.ps1`, `package.json`.

---

## 27. Implementation Phasing Roadmap

- **Phase 1 — Screen 7 Data & Localization Foundation:** Enrich `ha-noi.config.js` `itineraries[0]` with bilingual KO/VI 3-chapter time-block data, local WebP asset references from `HANOI_ATTRACTION_ASSETS`, and `getLocalizedHaNoiConfig('vi')` mapping.
- **Phase 2 — Screen 7 Presentation (`CinematicJournalStage`):** Build editorial header, compact summary pills, 2-layer photo showcase with attribution, borderless time-block schedule with Screen 6 selection badges, 3-day interactive timeline, and safe personalization CTA.
- **Phase 3 — Screen 7 Motion & Accessibility:** Add one-time entrance `ScrollTrigger`, decoded image crossfade + subtle Ken Burns (`1.04 -> 1.0`), editorial text stagger on day change, localized `aria-*` semantics, and `prefers-reduced-motion` compliance.
- **Phase 4 — Screen 7 Verification:** Run `npm run build`, verify Đà Nẵng isolation, verify Screen 6 → Screen 7 handoff, and write `HANOI_SCREEN7_JOURNAL_V1_REPORT.md`.
- **Phase 5 (Future) — Screen 8 Private Chauffeur Experience:** Upgrade `VehicleShowcase3D` + localize `transportation` in `ha-noi.config.js` with verified vehicle data & licensed WebP assets.
- **Phase 6 (Future) — Screen 9 Curated Hotel Collection:** Upgrade `Accommodation3DScene` + localize `hotels`/`accommodation` in `ha-noi.config.js` with verified accommodation tiers & licensed WebP assets.

---

## 28. Business Data Confirmation Matrix

| Business Item | Source Evidence | Status | Required Confirmation |
|---|---|---|---|
| **3N2Đ Hanoi Signature Duration** | `ha-noi.config.js#L958-L963` (`id: '3d2n'`, `daysCount: 3`, `nightsCount: 2`) | `VERIFIED` (in config) | Confirm if 3N2Đ is the sole suggested Hanoi package or if 4N3Đ should also exist |
| **Private Transportation & Airport Pickup/Drop-off (HAN)** | `ha-noi.config.js#L367-L432, #L977, #L1010` | `VERIFIED` (core value proposition) | Confirm flexible wording ("theo giờ bay thực tế") vs any fixed airport transfer conditions |
| **Accommodation & Check-in/Check-out** | `ha-noi.config.js#L215-L317, #L978` (mentions Sofitel Metropole specifically in Day 1) | `NEEDS_BUSINESS_CONFIRMATION` | Confirm whether Day 1 should say generic `"Nhận phòng khách sạn"` (recommended) rather than committing to `"Sofitel Metropole"` in the sample itinerary |
| **Meals & Entrance Tickets** | `ha-noi.config.js#L981,993,996,1009` | `NEEDS_BUSINESS_CONFIRMATION` | Keep culinary items framed as suggested itinerary highlights rather than pre-paid ticket/meal guarantees |
| **Vehicle Models & Fleet Years (`2022+`, `Kia Carnival`, `DCar`)** | `ha-noi.config.js#L396-L430` | `NEEDS_BUSINESS_CONFIRMATION` | Required before implementing Future Screen 8 |
| **Named 5-Star Hotels (`Metropole`, `Capella`, `InterContinental`, `Oriental Jade`)** | `ha-noi.config.js#L228-L315` | `NEEDS_BUSINESS_CONFIRMATION` | Confirm before Future Screen 9 whether these are illustrative reference hotels by category or contracted partners |
| **Fate of `HanoiYourStory.jsx` (current position 07)** | `HanoiExperiencePage.jsx#L58-L60` | `NEEDS_BUSINESS_CONFIRMATION` | Confirm whether to remove/unmount `HanoiYourStory` when moving `ItineraryStickyTimeline` to Screen 07 |

---

## 29. Browser Runtime QA Status

- **Status:** `BLOCKED`
- **Details:** As verified in earlier checks (`Test-Path "$env:LOCALAPPDATA\Google\Chrome\User Data\DevToolsActivePort"` -> `PermissionDenied` / `False`; `node_modules\playwright` -> `False`; `node_modules\puppeteer` -> `False`), live browser automation is blocked in this sandbox environment. All findings in this audit are verified directly from source code with exact file paths and line numbers.

---

## 30. Report Inventory & Safe Cleanup

| File Name | Purpose | Git Status | Current Relevance | Action Taken |
|---|---|---|---|---|
| `DEPLOYMENT.md` | VPS deployment guide | Tracked (`clean`) | Active project doc | **Retained** |
| `LOCALIZATION_GUIDELINES.md` | Bilingual KO/VI guidelines | Tracked (`clean`) | Active project doc | **Retained** |
| `README.md` | Project overview | Tracked (`clean`) | Active project doc | **Retained** |
| `HANOI_SCREEN4_CHACA_V3_REPORT.md` | Screen 4 V3 implementation report | Tracked (`clean`) | Protected Screen 4 record | **Retained** |
| `HANOI_SCREEN5_SEASONS_V1_1_REPORT.md` | Screen 5 V1.1 implementation report | Tracked (`clean`) | Protected Screen 5 record | **Retained** |
| `HANOI_SCREEN6_SHARED_MAP_SOURCE_AUDIT.md` | Screen 6 shared map architecture audit | Tracked (`clean`) | Protected shared architecture record | **Retained** |
| `HANOI_SCREEN6_ATLAS_V1_REPORT.md` | Screen 6 V1 report & 16 WebP Wikimedia Commons licensing table | Tracked (`clean`) | Contains primary open-license provenance for the 16 Hanoi WebP photos | **Retained** |
| `HANOI_SCREEN6_ATLAS_V1_3_REPORT.md` | Latest Screen 6 V1.3 runtime stabilization report | Modified (`M`) | Latest Screen 6 report with unresolved browser QA blocker | **Retained** |
| `HANOI_SCREEN7_JOURNAL_SOURCE_AUDIT.md` | This Screen 7 V1 source audit & architecture plan | New (`??`) | Active deliverable | **Created** |

- **Removed Reports:** `0` files removed (obsolete `HANOI_SCREEN6_ATLAS_V1_1_REPORT.md` and `HANOI_SCREEN6_ATLAS_V1_2_REPORT.md` were already removed in V1.2/V1.3; all remaining reports are either tracked in git or required for Screen 4–6 history and photo licensing).

---

## 31. Final Recommendation

1. **Architecture:** Proceed with **Option B — Configuration-Driven Shared Component** on `ItineraryStickyTimeline` (`presentation.variant: 'cinematic-journal'`), isolating Hanoi's new journal stage in `CinematicJournalStage.jsx` and scoping styles under `.itinerary-sticky-timeline.is-cinematic-journal` so Đà Nẵng remains 100% untouched.
2. **Scroll Behavior:** Use **Option S1 — Unpinned Natural Scroll + Interactive 3-Day Click Timeline + One-Time GSAP Entrance** to prevent back-to-back pin fatigue after Screen 6's `340vh` pin and guarantee zero hidden activities on `1366×768` and `1280×720` laptops.
3. **Photography:** Reuse the verified local WebP assets from `HANOI_ATTRACTION_ASSETS` (`hoan-kiem-lake`, `van-mieu`, `tran-quoc-pagoda`), fixing Day 2's lantern photo bug with zero additional network payload and 100% verified Wikimedia Commons attribution.
4. **Screen Ordering Decision Needed Before Implementation:** Confirm whether `HanoiYourStory.jsx` (currently mounted at line 59 of `HanoiExperiencePage.jsx` between Screen 6 and `ItineraryStickyTimeline`) should be unmounted from `HanoiExperiencePage.jsx` so `ItineraryStickyTimeline` (`#itinerary`) becomes Screen 07 immediately after Screen 06 (`#attractions`).

---

## 32. Final Git Verification

- Executed after creating `HANOI_SCREEN7_JOURNAL_SOURCE_AUDIT.md`:
  - **Zero source code files (`.jsx`, `.js`, `.css`, `.json`) were modified during this audit.**
  - Working tree diff (`50 insertions(+), 27 deletions(-)` across 5 files) is 100% identical to the pre-audit baseline plus the new untracked `?? HANOI_SCREEN7_JOURNAL_SOURCE_AUDIT.md`.
