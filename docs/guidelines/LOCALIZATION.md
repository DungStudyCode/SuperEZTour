# Bilingual Localization (`KO`/`VI`) & 3D Lifecycle Engineering Standards

## 1. Core Localization Architecture

- **Primary Customer Baseline:** Korean (`ko`) is the default customer-facing language (`localStorage['superez_language']`, fallback `'ko'`).
- **Editorial Review Language:** Vietnamese (`vi`) maintains 100% functional parity using a **Luxury Travel & Lifestyle Editorial** register (never literal machine translation).
- **Single Source of Truth:** `apps/web/src/context/LanguageContext.jsx` manages `language` (`'ko' | 'vi'`), `isKorean`, `setLanguage()`, `toggleLanguage()`, and `t(keyPath, fallback)`, keeping `document.documentElement.lang` synchronized.

### Dictionary Layout & Loading Strategy
```text
apps/web/src/locales/
├── ko.json                         # Global UI dictionary (Navbar, Home, Common UI, Legacy Modal)
├── vi.json                         # Global UI dictionary (100% key & type parity with ko.json)
└── destinations/
    └── da-nang/
        ├── ko.json                 # Canonical Da Nang Korean reference dictionary (472 keys)
        └── vi.json                 # Da Nang Vietnamese dictionary merged lazily inside da-nang.config.js
```
> **Bundle Rule:** Global `LanguageContext.jsx` loads only global `ko.json` and `vi.json`. Destination-specific dictionaries (`destinations/da-nang/vi.json`, `ha-noi.config.js`, and Hanoi scene manifests) load lazily inside their respective destination chunks so Homepage visitors never download destination copy.

---

## 2. Content & Data Contract Rules

1. **Preserve Korean Baseline:** Never rewrite, truncate, or paraphrase approved Korean strings solely to fit layout boxes. Adjust CSS (`min-height`, `clamp()`, flex wrapping) instead.
2. **Immutable Technical Identifiers:** Never translate or localize technical keys (`id`, `slug`, `coordinates`, `route`, `sceneKey`, `attractionIds`, `culinaryIds`).
3. **100% JSON Key & Type Parity:** Every key in `ko.json` must exist in `vi.json` with identical nesting and value type (`string`, `array`, `object`). Verified automatically via `npm run validate:locales`.
4. **Cultural Formatting Conventions:**
   - **Duration:** Korean `2박 3일` (nights first) ↔ Vietnamese `3 ngày 2 đêm` (days first).
   - **Dates:** Korean `YYYY년 M월 D일` ↔ Vietnamese `YYYY/MM/DD` or `DD/MM/YYYY` (canonical API wire format is always ISO `YYYY-MM-DD` in `Asia/Seoul`).
   - **Typography:** Enforce `word-break: keep-all; overflow-wrap: break-word;` on `:lang(ko)` and `line-height >= 1.5` on `:lang(vi)` so Vietnamese diacritics never clip.

---

## 3. React, GSAP ScrollTrigger, Lenis & WebGL Lifecycle Rules

Switching languages (`KO ↔ VI`) must preserve exact scroll position (`window.scrollY`) and 60fps canvas continuity:

1. **Never place `key={language}`** on `DestinationPage`, `HanoiExperiencePage`, `DaNangExperiencePage`, or any Three.js / MapLibre container.
2. **Separate the Three Lifecycles (`DestinationPage.jsx`):**
   - Route mount/unmount effect depends **only on `[slug]`** (`window.scrollTo(0, 0)`, `initSmoothScroll()`, `destroySmoothScroll()`).
   - Metadata effect depends on `[destination, isKorean, slug]` (`document.title`, `document.documentElement.lang`).
   - Layout reflow effect depends on `[language, destination]`, awaiting `document.fonts.ready` + double `requestAnimationFrame` before calling `ScrollTrigger.refresh()`.
3. **Prevent Pin-Spacer Collapse:** Effects creating `pin: true` `ScrollTrigger` timelines must **never** include localized text objects in their dependency arrays. Render localized strings through JSX so React updates text nodes in place while GSAP `pin-spacer` heights remain intact.
4. **Scoped GSAP & Lenis Cleanup:**
   - Use `gsap.context()` / `gsap.matchMedia()` per component and call `ctx.revert()` on unmount. Never call `ScrollTrigger.killAll()`.
   - `apps/web/src/utils/lenisManager.js` (`initSmoothScroll`, `destroySmoothScroll`, `getLenis`) binds a named `gsap.ticker` callback and removes that exact reference on teardown.
5. **Persistent Three.js & MapLibre Instances:**
   - Do not recreate `THREE.WebGLRenderer` or `maplibregl.Map` on language toggle. Update MapLibre HTML marker labels in place via `textContent`.
   - On route unmount, dispose geometries, materials, textures, and call `renderer.forceContextLoss()` / `map.remove()`.
