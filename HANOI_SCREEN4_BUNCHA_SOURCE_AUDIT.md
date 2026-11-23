# SUPER EZ TOUR — HANOI SCREEN 4 V2 SOURCE AUDIT
## BÚN CHẢ HÀ NỘI — SOURCE AUDIT & MULTI-DISH EXPANSION READINESS

**Project Root:** `D:\workplace\SuperEZTour`  
**Production Route:** `/destinations/ha-noi`  
**Audit Target:** `src/features/destinations/components/Hanoi/HanoiTaste3D/` (Screen 4 — Phở Hà Nội V1 & Expansion Readiness for Bún Chả Hà Nội V2)  
**Date:** 2026-11-23  
**Mode:** READ-ONLY SOURCE AUDIT (Zero code modifications, zero Git mutations, zero asset downloads, zero deployments)

---

## 1. GIT BASELINE & WORKTREE STATUS

### 1.1. Branch & HEAD
- **Branch:** `main`
- **HEAD Commit:** `5a3c0c6a9cf9f78aeb9f32c36b89253658a3ada9`

### 1.2. Uncommitted Worktree Status (`git status --short`)
```text
 M src/features/destinations/components/Hanoi/HanoiAwakeningHero/HanoiAwakeningHero.css
 M src/features/destinations/components/Hanoi/HanoiAwakeningHero/HanoiAwakeningHero.jsx
 D src/features/destinations/components/Hanoi/HanoiAwakeningHero/hanoiTextureGenerator.js
 M src/features/destinations/components/Hanoi/HanoiHeritageChamber/HanoiHeritageChamber.css
 M src/features/destinations/components/Hanoi/HanoiHeritageChamber/HanoiHeritageChamber.jsx
 M src/features/destinations/components/Hanoi/HanoiOldQuarterWalk/HanoiOldQuarterWalk.css
 M src/features/destinations/components/Hanoi/HanoiOldQuarterWalk/HanoiOldQuarterWalk.jsx
 M src/features/destinations/components/Hanoi/HanoiOldQuarterWalk/oldQuarterScenes.js
 M src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.css
 M src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.jsx
?? HANOI_SCREEN1_V4_0_REPORT.md
?? HANOI_SCREEN1_V4_1_REPORT.md
?? HANOI_SCREEN2_V3_2_IMPLEMENTATION_REPORT.md
?? HANOI_SCREEN2_V3_2_QA.md
?? HANOI_SCREEN2_V3_3_REPORT.md
?? HANOI_SCREEN2_V3_4_1_REPORT.md
?? HANOI_SCREEN2_V3_4_REPORT.md
?? HANOI_SCREEN3_SOURCE_AUDIT.md
?? HANOI_SCREEN3_V4_1_REPORT.md
?? HANOI_SCREEN3_V4_IMPLEMENTATION_REPORT.md
?? HANOI_SCREEN4_PHO_SOURCE_AUDIT.md
?? HANOI_SCREEN4_PHO_V1_REPORT.md
?? HANOI_STORY_BEAT_ASSETS.md
?? public/assets/destinations/hanoi/heritage/
?? public/assets/destinations/hanoi/hero/
?? public/assets/destinations/hanoi/old-quarter/story-beats/
?? public/assets/destinations/hanoi/pho/
?? src/features/destinations/components/Hanoi/HanoiAwakeningHero/buildHanoiHeroTimeline.js
?? src/features/destinations/components/Hanoi/HanoiAwakeningHero/hanoiHeroManifest.js
?? src/features/destinations/components/Hanoi/HanoiHeritageChamber/HeritageDetailModal.jsx
?? src/features/destinations/components/Hanoi/HanoiHeritageChamber/buildHeritageDocumentaryTimeline.js
?? src/features/destinations/components/Hanoi/HanoiHeritageChamber/heritageAssets.js
?? src/features/destinations/components/Hanoi/HanoiHeritageChamber/heritageScenes.js
?? src/features/destinations/components/Hanoi/HanoiOldQuarterWalk/OldQuarterDetailModal.jsx
?? src/features/destinations/components/Hanoi/HanoiOldQuarterWalk/buildOldQuarterTimeline.js
?? src/features/destinations/components/Hanoi/HanoiOldQuarterWalk/editorialLayouts.js
?? src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.css.v0.bak
?? src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.jsx.v0.bak
?? src/features/destinations/components/Hanoi/HanoiTaste3D/PhoDetailModal.jsx
?? src/features/destinations/components/Hanoi/HanoiTaste3D/buildPhoTimeline.js
?? src/features/destinations/components/Hanoi/HanoiTaste3D/phoAssets.js
?? src/features/destinations/components/Hanoi/HanoiTaste3D/phoScenes.js
```

### 1.3. Summary of Screen 4 Files in Working Tree
- **Refactored Existing Files:**
  - `src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.jsx` (9,595 bytes)
  - `src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.css` (15,791 bytes)
- **Newly Created Phở V1 Files:**
  - `src/features/destinations/components/Hanoi/HanoiTaste3D/phoScenes.js` (6,943 bytes)
  - `src/features/destinations/components/Hanoi/HanoiTaste3D/phoAssets.js` (6,906 bytes)
  - `src/features/destinations/components/Hanoi/HanoiTaste3D/buildPhoTimeline.js` (7,181 bytes)
  - `src/features/destinations/components/Hanoi/HanoiTaste3D/PhoDetailModal.jsx` (13,298 bytes)
  - `public/assets/destinations/hanoi/pho/` (10 responsive WebP files, 1,552,858 bytes total)
- **Preserved Checkpoints:**
  - `src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.jsx.v0.bak` (20,060 bytes — contains legacy 6-dish metadata including Bún Chả)
  - `src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.css.v0.bak` (6,380 bytes)
- **Git Safety Confirmation:** Zero Git mutations were performed during this audit.

---

## 2. CURRENT SCREEN 4 ARCHITECTURE & PHỞ V1 IMPLEMENTATION STATUS

### 2.1. Component Tree
```text
HanoiExperiencePage.jsx (/destinations/ha-noi)
 ├── DestinationHeader
 ├── ErrorBoundary > HanoiAwakeningHero (Screen 1 — V4.1)
 ├── ErrorBoundary > HanoiOldQuarterWalk (Screen 2 — V3.4.1)
 ├── ErrorBoundary > HanoiHeritageChamber (Screen 3 — V4.1)
 ├── ErrorBoundary > HanoiTaste3D (Screen 4 — Phở V1 Documentary)
 │    └── section#hanoi-taste.hanoi-taste-scene.pho-documentary-scene
 │         ├── div.pho-acts-stage
 │         │    ├── article.pho-act-slide.act-variant-fullscreen-hero   (Act 01: The First Morning)
 │         │    ├── article.pho-act-slide.act-variant-left-editorial    (Act 02: The Soul of the Broth)
 │         │    ├── article.pho-act-slide.act-variant-right-editorial   (Act 03: The Craft of Rice Noodles)
 │         │    ├── article.pho-act-slide.act-variant-layered-editorial (Act 04: The Art of Assembly)
 │         │    └── article.pho-act-slide.act-variant-wide-ending       (Act 05: The Hanoi Breakfast Ritual + CTAs)
 │         ├── div.pho-scroll-hint (Shown on Act 01 only)
 │         └── PhoDetailModal (Portaled/Fixed Monograph Modal for Phở Hà Nội)
 └── ErrorBoundary > HanoiSeasons3D (Screen 5 — 3D Four Seasons)
```

### 2.2. Phở V1 Implementation Status
1. **WebGL Removed:** Three.js canvas, procedural coffee cup geometry, particle loop, and zoom controls have been 100% removed from Screen 4.
2. **Floating HUD Removed:** Following user feedback, the right-side `01 — 05` floating pill box (`.pho-progress-hud`) was removed from `HanoiTaste3D.jsx` so the photography remains unobstructed.
3. **Bidirectional Scroll Fixed:** `HanoiTaste3D.jsx` no longer passes inline `style={{ opacity, visibility }}` in JSX; `HanoiTaste3D.css` no longer uses `transition: opacity, visibility` on `.pho-act-slide`; and `buildPhoTimeline.js` uses deterministic `gsap.set()` + non-overlapping `tl.to(..., { autoAlpha })` tweens with ascending `zIndex: idx + 1`. Both forward and reverse scrolling restore every act, image, and text block cleanly.
4. **Data Flow:**
   - `HanoiExperiencePage.jsx` renders `<HanoiTaste3D />` with no props.
   - `HanoiTaste3D.jsx` imports `PHO_DOCUMENTARY_ACTS` from `./phoScenes.js` and `PHO_ASSET_MANIFEST` / `PHO_SCRIM_GRADIENTS` from `./phoAssets.js`.
   - Language state (`isKorean`) comes from `useLanguage()` (`src/context/LanguageContext.jsx`).
   - Trip cart state (`tripState.culinaryPreferences`, `toggleCulinary`) comes from `useTripBuilder()` (`src/features/destinations/context/TripBuilderContext.jsx`).

---

## 3. EXISTING FILE PATHS

| File | Absolute Path | Role |
| :--- | :--- | :--- |
| `HanoiExperiencePage.jsx` | `D:\workplace\SuperEZTour\src\features\destinations\components\Hanoi\HanoiExperiencePage.jsx` | Parent page mounting Screen 3, Screen 4 (`HanoiTaste3D`), and Screen 5 |
| `HanoiTaste3D.jsx` | `D:\workplace\SuperEZTour\src\features\destinations\components\Hanoi\HanoiTaste3D\HanoiTaste3D.jsx` | Screen 4 root component & ScrollTrigger lifecycle owner |
| `HanoiTaste3D.css` | `D:\workplace\SuperEZTour\src\features\destinations\components\Hanoi\HanoiTaste3D\HanoiTaste3D.css` | Screen 4 editorial layouts, scrims, modal, and responsive styles |
| `phoScenes.js` | `D:\workplace\SuperEZTour\src\features\destinations\components\Hanoi\HanoiTaste3D\phoScenes.js` | 5-act bilingual data for Phở + `CULINARY_STORIES` registry object |
| `phoAssets.js` | `D:\workplace\SuperEZTour\src\features\destinations\components\Hanoi\HanoiTaste3D\phoAssets.js` | Phở WebP manifest, license metadata, focal points, scrim gradients |
| `buildPhoTimeline.js` | `D:\workplace\SuperEZTour\src\features\destinations\components\Hanoi\HanoiTaste3D\buildPhoTimeline.js` | GSAP `matchMedia` + `ScrollTrigger` timeline builder |
| `PhoDetailModal.jsx` | `D:\workplace\SuperEZTour\src\features\destinations\components\Hanoi\HanoiTaste3D\PhoDetailModal.jsx` | Deep monograph modal for Phở Hà Nội & 4 legendary pho institutions |
| `ha-noi.config.js` | `D:\workplace\SuperEZTour\src\features\destinations\data\ha-noi.config.js` | Destination config containing `culinary.dishes` consumed by `TripBuilderMorph` |
| `TripBuilderContext.jsx` | `D:\workplace\SuperEZTour\src\features\destinations\context\TripBuilderContext.jsx` | Global trip state & `toggleCulinary(preference)` provider |
| `TripBuilderMorph.jsx` | `D:\workplace\SuperEZTour\src\features\destinations\components\TripBuilderMorph\TripBuilderMorph.jsx` | Step 6 checkbox consumer of `tripState.culinaryPreferences` |

---

## 4. EXISTING GSAP TIMELINE & PIN/SCRUB CONFIGURATION

### 4.1. Timeline Ownership & Cleanup
- `HanoiTaste3D.jsx` calls `buildPhoTimeline({ containerEl, actSlideEls, actImageEls, actTextEls, onProgressUpdate })` inside `useEffect([], [])`.
- `buildPhoTimeline.js` creates a scoped `const mm = gsap.matchMedia();` bound to `containerEl`.
- On unmount, `HanoiTaste3D.jsx` calls `timelineCtxRef.current.revert()`, which cleanly kills only Screen 4's ScrollTrigger and removes its pin-spacer without touching Screen 1, 2, 3, or 5.

### 4.2. Pin, Scrub & Scroll Distance
- **Trigger:** `containerEl` (`section#hanoi-taste`, `height: 100vh`, `min-height: 680px` desktop / `600px` mobile)
- **Pin Configuration:**
  - `start: 'top top'`
  - `end: pinDistance` (`+=520%` on Desktop `>=993px`; `+=380%` on Tablet `769px–992px`; `+=290%` on Mobile `<=768px`)
  - `pin: true`
  - `pinSpacing: true`
  - `scrub: 0.9`
  - `anticipatePin: 1`
  - `fastScrollEnd: true`
  - `invalidateOnRefresh: true`
- **Reduced Motion (`prefers-reduced-motion: reduce`):**
  - Does not create a pinned ScrollTrigger.
  - Calls `gsap.set(slide, { autoAlpha: 1, clearProps: 'zIndex' })` while CSS switches `.pho-act-slide` to `position: relative !important; height: 90vh !important;` so all 5 acts flow vertically as a static document.

### 4.3. Act Pacing & Choreography (`buildPhoTimeline.js`)
- Total timeline length: `100` units (`5` acts × `20` units per act).
- Progress windows (`PHO_ACT_WINDOWS`):
  - Act 01: `0.00 – 0.20` (`0 – 20` units)
  - Act 02: `0.20 – 0.40` (`20 – 40` units)
  - Act 03: `0.40 – 0.60` (`40 – 60` units)
  - Act 04: `0.60 – 0.80` (`60 – 80` units)
  - Act 05: `0.80 – 1.00` (`80 – 100` units)
- Within each 20-unit act window `[actStart, actEnd]`:
  - `actStart -> actStart + 3.2`: Slide fades in (`autoAlpha: 1`, layered over `prevSlide` via `zIndex: idx + 1`).
  - `actStart + 3.25 -> actStart + 3.65`: Underneath `prevSlide` sets `autoAlpha: 0` after the top slide is 100% opaque (eliminating dark background bleed).
  - `actStart + 1.8 -> actStart + 6.4`: Staged reveal of `.pho-kicker`, `.pho-title`, `.pho-subtitle`, `.pho-story-para`, and `.pho-act-actions`.
  - `actStart -> actEnd`: Continuous slow Ken Burns scale drift (`scale: 1.0 -> 1.06`, `ease: 'none'`).
  - `actStart + 6.4 -> actEnd - 2.0`: Steady reading hold (~11.6 units = **58% of each act window**).
  - `actEnd - 2.0 -> actEnd - 0.2`: `.pho-editorial-content` exits cleanly (`autoAlpha: 0, y: -14`) before the next act's slide enters.

---

## 5. CULINARY DATA STRUCTURE (`phoScenes.js` & `ha-noi.config.js`)

### 5.1. Current `phoScenes.js` Structure
`phoScenes.js` already exports an extensible dictionary `CULINARY_STORIES`:
```javascript
export const CULINARY_STORIES = {
  'pho-bo': {
    id: 'pho-bo',
    slug: 'pho-bo-hanoi',
    nameVi: 'Phở Bò Gia Truyền Hà Nội',
    nameKo: '하노이 정통 소고기 쌀국수 (Phở Bò)',
    nameEn: 'Heirloom Hanoi Beef Pho',
    acts: PHO_DOCUMENTARY_ACTS
  }
};
```
Each item in `acts` has the schema:
```javascript
{
  actId: 'act-01',
  actNumber: '01',
  kickerVi: '...',
  kickerKo: '...',
  themeVi: '...',
  themeKo: '...',
  titleVi: '...',
  titleKo: '...',
  subtitleVi: '...',
  subtitleKo: '...',
  storyVi: '...',
  storyKo: '...',
  ctaVi: '...',       // On final act
  ctaKo: '...',       // On final act
  ctaAddedVi: '...',  // On final act
  ctaAddedKo: '...',  // On final act
  assetId: 'pho-hero',
  layoutVariant: 'fullscreen-hero' | 'left-editorial' | 'right-editorial' | 'layered-editorial' | 'wide-ending',
  scrimGradient: 'fullscreen-hero' | 'left-editorial' | 'right-editorial' | 'layered-editorial' | 'wide-ending'
}
```

### 5.2. Existing Bún Chả Data in Codebase
1. **In `src/features/destinations/data/ha-noi.config.js` (Lines 616–625):**
   ```javascript
   {
     id: 'bun-cha-hanoi',
     name: '하노이 숯불 분짜 (Bún Chả)',
     nameVi: 'Bún Chả Than Hoa Hà Nội',
     nameKr: '하노이 숯불 분짜 (Bún Chả)',
     chapter: '02',
     slogan: '참숯에 직화로 구워낸 돼지고기 완자와 새콤달콤한 느억맘',
     desc: '오바마 대통령도 반한 하NOI의 대표 소울푸드. 숯불 향이 진하게 밴 돼지고기 패티와 삼겹살을 따뜻한 피시소스 육수에 신선한 허브, 쌀국수 면과 함께 적셔 즐깁니다.',
     highlights: ['참숯 직화 패티', '새콤달콤 특제 육수', '바삭한 넴(Nem) 튀김 곁들임'],
     image: 'https://images.unsplash.com/photo-1503764654157-729106a23077?auto=format&fit=crop&w=1200&q=80'
   }
   ```
2. **In `HanoiTaste3D.jsx.v0.bak` (Lines 40–54):**
   ```javascript
   {
     id: 'bun-cha',
     number: '03',
     name: 'Bún Chả Nướng Than Hoa Hàng Quạt',
     nameKr: '참숯 직화 하노이 분짜',
     nameEn: 'Charcoal Grilled Pork Bun Cha',
     tagline: 'Chả miếng bọc lá xương xông nướng xèo xèo trên than hồng rực',
     taglineKr: '참숯에 직화로 구워낸 돼지고기 완자와 새콤달콤한 느억맘',
     desc: 'Thịt ba chỉ ướp mật mía kẹp vỉ tre nướng than củi, thả vào bát nước mắm chua ngọt ấm nóng, ăn kèm bún sợi mảnh và rổ rau ghém xanh mướt.',
     descKr: '대나무 집게에 끼워 숯불에 구운 육즙 가득한 돼지고기. 파파야와 당근을 띄운 따뜻한 느억맘 소스에 면과 허브를 적셔 먹는 별미.',
     image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
     location: '74 Hàng Quạt, Hoàn Kiếm, Hà Nội',
     locationKr: '하노이 항꿧 74번지 골목',
     pairing: 'Nem cua bể giòn tan & Tía tô kinh giới'
   }
   ```

---

## 6. ASSET STRUCTURE & PROPOSED BÚN CHẢ ASSET PIPELINE

### 6.1. Existing Phở V1 Assets (`public/assets/destinations/hanoi/pho/`)
| File Name | Resolution | File Size | Purpose |
| :--- | :--- | :--- | :--- |
| `pho-hero-desktop.webp` | 1920×1080 | 273,938 B (267.5 KB) | Act 01 Desktop |
| `pho-hero-mobile.webp` | 800×1000 | 131,500 B (128.4 KB) | Act 01 Mobile |
| `pho-broth-desktop.webp` | 1920×1080 | 202,628 B (197.9 KB) | Act 02 Desktop |
| `pho-broth-mobile.webp` | 800×1000 | 115,062 B (112.4 KB) | Act 02 Mobile |
| `pho-noodles-desktop.webp` | 1920×1080 | 188,396 B (184.0 KB) | Act 03 Desktop |
| `pho-noodles-mobile.webp` | 800×1000 | 112,820 B (110.2 KB) | Act 03 Mobile |
| `pho-assembly-desktop.webp` | 1920×1080 | 250,788 B (244.9 KB) | Act 04 Desktop |
| `pho-assembly-mobile.webp` | 800×1000 | 129,802 B (126.8 KB) | Act 04 Mobile |
| `pho-breakfast-desktop.webp` | 1920×1080 | 102,810 B (100.4 KB) | Act 05 Desktop |
| `pho-breakfast-mobile.webp` | 800×1000 | 45,114 B (44.1 KB) | Act 05 Mobile |

### 6.2. Manifest Schema (`phoAssets.js`)
Each entry in `PHO_ASSET_MANIFEST` contains:
- `id`, `actId`, `src`, `mobileSrc`, `fallbackSrc`
- `altVi`, `altKo`
- `photographer`, `sourceUrl`, `license`, `licenseUrl`, `attributionRequired`
- `focalPointDesktop`, `focalPointMobile`, `subject`, `verified`

### 6.3. Proposed Bún Chả V2 Asset Directory & Naming Convention
Target directory: `public/assets/destinations/hanoi/bun-cha/` (Not yet created or downloaded, per audit rules):
```text
public/assets/destinations/hanoi/bun-cha/
  buncha-hero-desktop.webp        (1920×1080 — Full Hanoi Bún Chả midday set: smoky grilled pork bowl, rice vermicelli, herbs)
  buncha-hero-mobile.webp         (800×1000)
  buncha-charcoal-desktop.webp    (1920×1080 — Bamboo clamps / wire grill over glowing hoa charcoal embers & rising smoke)
  buncha-charcoal-mobile.webp     (800×1000)
  buncha-pork-desktop.webp        (1920×1080 — Caramelized chả viên patties & chả miếng pork belly slices sizzling)
  buncha-pork-mobile.webp         (800×1000)
  buncha-dipping-desktop.webp     (1920×1080 — Warm sweet-sour nước chấm bowl with green papaya, carrot & garlic chili)
  buncha-dipping-mobile.webp      (800×1000)
  buncha-table-desktop.webp       (1920×1080 — Complete table ritual: bún rối, fresh perilla/lettuce basket, nem cua bể, dipping)
  buncha-table-mobile.webp        (800×1000)
```

---

## 7. MODAL, TRIPBUILDER & KO/VI INTEGRATION AUDIT

### 7.1. TripBuilder Consumer Audit (`TripBuilderMorph.jsx` & `TripBuilderContext.jsx`)
Let's examine how `TripBuilderMorph.jsx` (lines 658–689) renders and checks culinary preferences in Step 6:
```jsx
{(destinationConfig?.culinary?.dishes
  ? destinationConfig.culinary.dishes.map((dish) =>
      isKorean ? (dish.nameKr || dish.name) : (dish.nameVi || dish.name)
    )
  : ...
).map((food) => {
  const isChecked = tripState.culinaryPreferences.includes(food);
  return (
    <div
      key={food}
      className={`morph-check-box ${isChecked ? 'morph-check-active' : ''}`}
      onClick={() => toggleCulinary(food)}
    >
      ...
      <span>{food}</span>
    </div>
  );
})}
```
**Crucial Discovery:**
1. `TripBuilderMorph.jsx` derives its checkbox strings directly from `destinationConfig.culinary.dishes` (`ha-noi.config.js` lines 604–670):
   - Dish 01 (Phở):
     - `dish.nameVi`: `'Phở Bò Gia Truyền Hà Nội'`
     - `dish.nameKr`: `'정통 하노이 소고기 쌀국수 (Phở Bò)'`
   - Dish 02 (Bún Chả):
     - `dish.nameVi`: `'Bún Chả Than Hoa Hà Nội'`
     - `dish.nameKr`: `'하노이 숯불 분짜 (Bún Chả)'`
2. In `HanoiTaste3D.jsx` (Phở V1):
   - `PHO_KEYS` currently includes `['pho-bo', 'Phở Bò Gia Truyền Hà Nội', 'Phở Bò Gia Truyền Bát Đàn', '하노이 정통 소고기 쌀국수 (퍼보)', '하노이 정통 소고기 쌀국수 (Phở Bò)', 'Heirloom Hanoi Beef Pho']`.
   - Note that in `ha-noi.config.js`, `nameKr` is `'정통 하노이 소고기 쌀국수 (Phở Bò)'`. Adding `'정통 하노이 소고기 쌀국수 (Phở Bò)'` to `PHO_KEYS` and using it as the Korean target label ensures that clicking the CTA in Screen 4 also checks the exact Korean checkbox in `TripBuilderMorph.jsx` Step 6!
3. For **Bún Chả V2**:
   - We should define `BUN_CHA_KEYS`:
     ```javascript
     export const BUN_CHA_KEYS = [
       'bun-cha',
       'bun-cha-hanoi',
       'Bún Chả Than Hoa Hà Nội',
       'Bún Chả Nướng Than Hoa Hàng Quạt',
       '하노이 숯불 분짜 (Bún Chả)',
       '참숯 직화 하노이 분짜',
       'Charcoal Grilled Pork Bun Cha'
     ];
     ```
   - When toggling Bún Chả on in Screen 4, pass:
     - `isKorean ? '하노이 숯불 분짜 (Bún Chả)' : 'Bún Chả Than Hoa Hà Nội'`
   - When checking `isBunChaAddedToTrip`, check `tripState.culinaryPreferences.some((item) => BUN_CHA_KEYS.includes(item))`.
   - This requires **zero breaking changes** to `TripBuilderContext.jsx` or `TripBuilderMorph.jsx`, prevents duplicate entries when toggling KO ↔ VI, and keeps Screen 4 and Step 6 of TripBuilderMorph 100% synchronized.

### 7.2. Language Switching (KO / VI) Behavior
- `HanoiTaste3D.jsx` reads `const { isKorean } = useLanguage();`.
- `useEffect` that builds the GSAP ScrollTrigger timeline has dependency array `[]` (runs once on mount).
- Switching language re-renders only the text strings (`isKorean ? act.titleKo : act.titleVi`) inside the already-mounted DOM nodes without recreating or resetting the ScrollTrigger timeline or losing scroll position.

---

## 8. MULTI-DISH EXPANSION STRATEGY (PHỞ V1 ➔ BÚN CHẢ V2)

### 8.1. Architectural Analysis of Current Phở V1 Code
1. **Can we add a new `culinaryStory`?**  
   Yes — `phoScenes.js` already defines `CULINARY_STORIES['pho-bo']`.
2. **Is `buildPhoTimeline.js` hardcoded to Phở or reusable?**  
   Look at `buildPhoTimeline.js`:
   - It accepts `{ containerEl, actSlideEls, actImageEls, actTextEls, onProgressUpdate }`.
   - It queries `.pho-kicker`, `.pho-title`, `.pho-subtitle`, `.pho-story-para`, `.pho-act-actions` inside `textBlock`.
   - **It has zero hardcoded Phở text or asset IDs!** It is already a generic 5-act documentary timeline builder that works for any 5-act culinary chapter sharing those editorial DOM classes, and can accept an optional `motionProfile` parameter if Bún Chả needs custom image drift/wipe vectors.
3. **How should we transition from Phở → Bún Chả on scroll without nested ScrollTriggers or duplicate pins?**  
   Let's compare the two architectural patterns:

| Criterion | Pattern A (RECOMMENDED): Sequential Chapter Pin Sections inside `HanoiTaste3D` | Pattern B: Single 10-Act Mega-Pin Container (`+=1040%`) |
| :--- | :--- | :--- |
| **DOM Structure** | `<div className="hanoi-culinary-chapters">` wrapping two sequential `<section className="hanoi-taste-scene">` blocks: Chapter 01 (`#hanoi-taste` — Phở Hà Nội, 5 acts) followed by Chapter 02 (`#hanoi-taste-buncha` — Bún Chả Hà Nội, 5 acts) | Single `<section>` containing 10 stacked `<article>` slides |
| **ScrollTrigger Pinning** | Two independent, sequential top-level `ScrollTrigger` instances in normal document flow (`pin: true, pinSpacing: true, end: '+=520%'` each). Zero nesting! | One giant `ScrollTrigger` (`end: '+=1040%'`) |
| **Risk to Phở V1** | **ZERO.** Phở V1's 5-act timeline (`0.00 -> 1.00`), DOM, and pacing remain 100% untouched. | High — requires recalculating all Phở act windows (`0.00–0.20` becomes `0.00–0.10`) and mixing 2 modals into 1 pin. |
| **Visual Transition (Phở → Bún Chả)** | Natural cinematic chapter handoff: as Phở Act 05 unpins after its breakfast CTA, the viewport scrolls naturally into Bún Chả Act 01 (Midday Charcoal Smoke opening bridge), just like Screen 2 → Screen 3 → Screen 4. | Cross-fade inside the same fixed box for 10 acts straight (causes viewer pin fatigue). |
| **Reduced Motion & Mobile** | Each 5-act chapter stacks cleanly in document flow. | 10 absolute slides in one container increases DOM layer memory on mobile. |
| **Future Scalability (Chả Cá, Cà Phê Trứng)** | Adding a 3rd or 4th dish is as simple as appending another chapter config to the array. | A 20-act single pin (`+=2000%`) would be unmaintainable. |

### 8.2. Recommended Minimal-Change Expansion Architecture (Pattern A)
1. **Keep `HanoiExperiencePage.jsx` untouched:** It continues to mount `<HanoiTaste3D />` inside `<ErrorBoundary isolated>`.
2. **Inside `HanoiTaste3D.jsx`:**
   - Extract the 5-act stage renderer into a clean internal or sibling component `CulinaryChapterSection` (or render Phở section + Bún Chả section sequentially).
   - **Chapter I — Phở Hà Nội (`id="hanoi-taste"`):** Morning Dawn Atmosphere (5 acts, `PhoDetailModal`, `PHO_KEYS`).
   - **Chapter II — Bún Chả Hà Nội (`id="hanoi-taste-buncha"`):** Midday Charcoal & Bamboo Grill Atmosphere (5 acts, `BunChaDetailModal`, `BUN_CHA_KEYS`).
3. **Distinct Motion Choreography for Bún Chả vs. Phở:**
   - While Phở uses a serene morning slow push-in (`scale: 1.0 -> 1.06`), Bún Chả represents midday charcoal fire, sizzling pork fat, and dipping ritual.
   - `buildPhoTimeline.js` (or an extended `motionVariant` option in it) can support per-act motion vectors (`scaleStart`, `scaleEnd`, `panX`, `panY`) defined in `bunChaScenes.js`, giving Bún Chả a dynamic lateral grill pan and warm ember cross-dissolve without duplicating timeline code.

---

## 9. SCREEN BOUNDARIES & TRANSITION STRATEGY

### 9.1. Current Boundaries
1. **Screen 3 (`HanoiHeritageChamber`) → Screen 4 (`HanoiTaste3D` — Phở V1):**
   - Screen 3 ends at `HERITAGE_DOCUMENTARY_ENDING` (`background-color: #0d1217`), unpins, and scrolls directly into `section#hanoi-taste` (`background-color: #0e1317`).
   - Phở Act 01 (`pho-hero`) is immediately visible at `autoAlpha: 1` with the `.pho-scroll-hint` indicator at the bottom.
2. **Phở V1 Ending (Act 05) → Screen 5 (`HanoiSeasons3D`):**
   - Phở Act 05 (`act-variant-wide-ending`) holds from timeline units `84.6` to `100`, displaying the primary CTA (`Thêm trải nghiệm Phở Hà Nội`) and the monograph button (`Khám phá Tứ đại Phở Hà Nội`).
   - At progress `1.0`, `section#hanoi-taste` unpins and scrolls into `section#hanoi-seasons` (`HanoiSeasons3D`, `height: 100vh`, `background: #1e2830`).

### 9.2. Target Flow with Bún Chả V2
```text
Screen 3 (Văn Miếu — Heritage Ending #0d1217)
   │  [ScrollTrigger unpins Screen 3]
   ▼
Screen 4 · Chapter I: PHỞ HÀ NỘI — THE SOUL OF A MORNING (section#hanoi-taste, pinned +=520%)
   ├── Act 01: The First Morning (Bát phở bò Hà Nội sớm mai)
   ├── Act 02: The Soul of the Broth (Tinh túy nước dùng xương bò)
   ├── Act 03: The Craft of Rice Noodles (Nghệ thuật bánh phở)
   ├── Act 04: The Art of Assembly (Hoàn thiện bát phở)
   └── Act 05: The Hanoi Breakfast Ritual (Thưởng thức + Phở TripBuilder CTA + Phở Monograph Modal)
   │  [ScrollTrigger unpins Chapter I — Morning transitions to Midday]
   ▼
Screen 4 · Chapter II: BÚN CHẢ HÀ NỘI — THE FRAGRANCE OF CHARCOAL AT NOON (section#hanoi-taste-buncha, pinned +=520%)
   ├── Act 01: Midday Smoke in the Old Quarter (Hương khói than hoa giữa trưa phố cổ)
   ├── Act 02: Charcoal & Bamboo Clamps (Than hoa & vỉ nướng — chả viên, chả miếng)
   ├── Act 03: The Balance of Warm Nước Chấm (Bát nước chấm chua thanh ấm nóng & đu đủ xanh)
   ├── Act 04: Vermicelli, Fresh Herbs & Crispy Nem (Bún rối, rau sống & nem cua bể)
   └── Act 05: The Hanoi Midday Ritual (Nghi thức thưởng thức bữa trưa + Bún Chả TripBuilder CTA + Bún Chả Monograph Modal)
   │  [ScrollTrigger unpins Chapter II]
   ▼
Screen 5 (HanoiSeasons3D — Four Seasons #1e2830)
```
- **Why this transition works seamlessly:**
  - It creates a natural chronological arc of a day in Hanoi's culinary life: **Morning (Phở Hà Nội)** → **Midday (Bún Chả Hà Nội)** → **Four Seasons (Screen 5)**.
  - Neither Screen 3 nor Screen 5 requires any modification.

---

## 10. RECOMMENDED NEW FILES & FILES REQUIRING MODIFICATION

### 10.1. Recommended New Files to Create (in Phase V2 Implementation)
1. `src/features/destinations/components/Hanoi/HanoiTaste3D/bunChaScenes.js`  
   - 5-act bilingual (VI/KO) documentary script for Bún Chả Hà Nội + registration into `CULINARY_STORIES['bun-cha']`.
2. `src/features/destinations/components/Hanoi/HanoiTaste3D/bunChaAssets.js`  
   - Verified local WebP asset manifest (`buncha-hero`, `buncha-charcoal`, `buncha-pork`, `buncha-dipping`, `buncha-table`), license metadata, focal points, and warm ember directional scrims.
3. `src/features/destinations/components/Hanoi/HanoiTaste3D/BunChaDetailModal.jsx`  
   - Dedicated deep monograph modal for Bún Chả Hà Nội (anatomy of chả viên & chả miếng, nước chấm su hào/đu đủ, bún rối, and verified Hanoi institutions such as Bún Chả Hàng Quạt, Bún Chả Đắc Kim Hàng Mành, Bún Chả Hương Liên, Bún Chả Sinh Từ).
4. `public/assets/destinations/hanoi/bun-cha/`  
   - 10 verified local WebP images (5 acts × desktop `1920×1080` + mobile `800×1000`).

### 10.2. Existing Files Requiring Modification (in Phase V2 Implementation)
1. `src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.jsx`  
   - Render Chapter I (Phở Hà Nội V1) and Chapter II (Bún Chả Hà Nội V2) sequentially using a shared chapter sub-component, with independent refs, modal states (`isPhoModalOpen`, `isBunChaModalOpen`), and TripBuilder toggles (`PHO_KEYS`, `BUN_CHA_KEYS`).
2. `src/features/destinations/components/Hanoi/HanoiTaste3D/buildPhoTimeline.js`  
   - Optional minor enhancement: allow per-act motion config (`scaleStart`, `scaleEnd`, `panX`, `panY`) with fallback to Phở's default `{ scaleStart: 1.0, scaleEnd: 1.06, panX: 0, panY: 0 }` so Phở V1 behavior stays 100% identical while Bún Chả V2 can use custom grill/smoke drift vectors.
3. `src/features/destinations/components/Hanoi/HanoiTaste3D/HanoiTaste3D.css`  
   - Add warm charcoal/amber accent modifiers (`.buncha-documentary-scene`) and chapter bridge header styling without altering Phở V1's existing rules.

---

## 11. RISKS & TECHNICAL DEPENDENCIES

1. **Duplicate / Nested Pin Risk:**  
   - *Mitigation:* Never wrap Chapter I and Chapter II inside a pinned parent. Keep `<div className="hanoi-culinary-wrapper">` unpinned (`position: relative; height: auto`), and let `<section id="hanoi-taste">` (Phở) and `<section id="hanoi-taste-buncha">` (Bún Chả) pin sequentially as sibling sections in normal document flow.
2. **React State Overwriting GSAP Inline Styles:**  
   - *Mitigation:* Maintain the fix applied in Phở V1 — never put inline `style={{ opacity, visibility }}` on `.pho-act-slide` in JSX, and never use one-way `onComplete` callbacks to hide slides.
3. **TripBuilder Checkbox Mismatch in Korean Mode:**  
   - *Mitigation:* Ensure `PHO_KEYS` includes `'정통 하노이 소고기 쌀국수 (Phở Bò)'` and `BUN_CHA_KEYS` includes `'하노이 숯불 분짜 (Bún Chả)'` and `'Bún Chả Than Hoa Hà Nội'` to match `ha-noi.config.js` lines 607–619 verbatim.
4. **Asset Authenticity Risk:**  
   - *Mitigation:* Every Bún Chả photograph must depict authentic Vietnamese Bún Chả (grilled pork patties/belly, dipping bowl with green papaya, white rice vermicelli, herbs, or charcoal grilling) from verified open licenses (Wikimedia Commons CC0 / CC BY / CC BY-SA). Do not use Thai/Japanese barbecue, ramen, or unrelated street food.

---

## 12. EXACT RELEVANT SOURCE CODE EXCERPTS

### 12.1. `HanoiTaste3D.jsx` (Current Phở V1 Implementation)
```jsx
const PHO_KEYS = [
  'pho-bo',
  'Phở Bò Gia Truyền Hà Nội',
  'Phở Bò Gia Truyền Bát Đàn',
  '하노이 정통 소고기 쌀국수 (퍼보)',
  '하노이 정통 소고기 쌀국수 (Phở Bò)',
  'Heirloom Hanoi Beef Pho'
];

const HanoiTaste3D = () => {
  const containerRef = useRef(null);
  const actSlideRefs = useRef([]);
  const actImageRefs = useRef([]);
  const actTextRefs = useRef([]);
  const timelineCtxRef = useRef(null);

  const [activeActIndex, setActiveActIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isKorean } = useLanguage();
  const { toggleCulinary, tripState } = useTripBuilder();

  const isAddedToTrip = useMemo(() => {
    return tripState.culinaryPreferences.some((item) => PHO_KEYS.includes(item));
  }, [tripState.culinaryPreferences]);

  const handleTogglePhoTrip = useCallback(() => {
    const existing = tripState.culinaryPreferences.find((item) => PHO_KEYS.includes(item));
    if (existing) {
      toggleCulinary(existing);
    } else {
      const targetLabel = isKorean
        ? '하노이 정통 소고기 쌀국수 (Phở Bò)'
        : 'Phở Bò Gia Truyền Hà Nội';
      toggleCulinary(targetLabel);
    }
  }, [isKorean, toggleCulinary, tripState.culinaryPreferences]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = buildPhoTimeline({
      containerEl: container,
      actSlideEls: actSlideRefs.current,
      actImageEls: actImageRefs.current,
      actTextEls: actTextRefs.current,
      onProgressUpdate: (progress) => {
        const nextIdx = resolvePhoProgressState(progress);
        setActiveActIndex((prev) => (prev !== nextIdx ? nextIdx : prev));
      }
    });

    timelineCtxRef.current = mm;

    return () => {
      if (timelineCtxRef.current?.revert) {
        timelineCtxRef.current.revert();
      }
    };
  }, []);
```

### 12.2. `buildPhoTimeline.js` (Current Bidirectional Timeline Builder)
```javascript
      // 1. Deterministic Initial States at t = 0
      actSlideEls.forEach((slide, idx) => {
        if (!slide) return;
        gsap.set(slide, {
          autoAlpha: idx === 0 ? 1 : 0,
          zIndex: idx + 1
        });

        const img = actImageEls[idx];
        if (img) {
          gsap.set(img, { scale: 1.0, transformOrigin: '50% 50%' });
        }

        const textBlock = actTextEls[idx];
        if (textBlock) {
          gsap.set(textBlock, { autoAlpha: 1, y: 0 });
          const kicker = textBlock.querySelector('.pho-kicker');
          const title = textBlock.querySelector('.pho-title');
          const subtitle = textBlock.querySelector('.pho-subtitle');
          const story = textBlock.querySelector('.pho-story-para');
          const actions = textBlock.querySelector('.pho-act-actions');
          const items = [kicker, title, subtitle, story, actions].filter(Boolean);

          if (idx === 0) {
            gsap.set(items, { autoAlpha: 1, y: 0 });
          } else {
            gsap.set(items, { autoAlpha: 0, y: 18 });
          }
        }
      });
```

### 12.3. `ha-noi.config.js` (Lines 603–625 — Culinary Dishes Consumed by `TripBuilderMorph.jsx`)
```javascript
    dishes: [
      {
        id: 'pho-bo-hanoi',
        name: '정통 하노이 소고기 쌀국수 (Phở Bò)',
        nameVi: 'Phở Bò Gia Truyền Hà Nội',
        nameKr: '정통 하노이 소고기 쌀국수 (Phở Bò)',
        chapter: '01',
        slogan: '사골과 양지를 12시간 우려낸 맑고 깊은 명품 육수',
        desc: '남부 쌀국수와 달리 숙주나 단맛을 배제하고, 소 사골과 전통 향신료 본연의 깊고 담백한 맛을 살린 하노이 정통 쌀국수. 바삭한 꿔이(Quẩy)를 국물에 적셔 먹는 클래식한 방식.',
        highlights: ['12시간 저온 우림 육수', '부드러운 생면(Bánh Phở)', '파와 라임의 산뜻한 조화'],
        image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'bun-cha-hanoi',
        name: '하노이 숯불 분짜 (Bún Chả)',
        nameVi: 'Bún Chả Than Hoa Hà Nội',
        nameKr: '하노이 숯불 분짜 (Bún Chả)',
        chapter: '02',
        slogan: '참숯에 직화로 구워낸 돼지고기 완자와 새콤달콤한 느억맘',
        desc: '오바마 대통령도 반한 하NOI의 대표 소울푸드. 숯불 향이 진하게 밴 돼지고기 패티와 삼겹살을 따뜻한 피시소스 육수에 신선한 허브, 쌀국수 면과 함께 적셔 즐깁니다.',
        highlights: ['참숯 직화 패티', '새콤달콤 특제 육수', '바삭한 넴(Nem) 튀김 곁들임'],
        image: 'https://images.unsplash.com/photo-1503764654157-729106a23077?auto=format&fit=crop&w=1200&q=80'
      },
```

---

## 13. UNRESOLVED QUESTIONS / DECISIONS FOR PHASE V2
1. **Sequential Scroll Flow vs. Quick Chapter Jump Pill:**  
   In Pattern A (`Screen 3 → Phở (5 acts) → Bún Chả (5 acts) → Screen 5`), should the two culinary chapters flow purely via scroll (no floating HUD, matching the clean look you just approved for Phở), or would you like a minimal top/corner dish switcher (`01 Phở Hà Nội · 02 Bún Chả`)? *(Default recommendation: pure scroll documentary flow with no floating HUD box, keeping the screen 100% unobstructed).*
2. **Audit Compliance Confirmation:**  
   - **No source files were modified.**
   - **No assets were downloaded.**
   - **No Git commits, resets, or deployments were executed.**
