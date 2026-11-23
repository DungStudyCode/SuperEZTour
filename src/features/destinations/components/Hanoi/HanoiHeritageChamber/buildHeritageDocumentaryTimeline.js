import gsap from 'gsap';
import {
  HERITAGE_OPENING_ACT,
  HERITAGE_DOCUMENTARY_ACTS,
  HERITAGE_DOCUMENTARY_ENDING
} from './heritageScenes';

/**
 * SUPER EZ TOUR — HANOI SCREEN 3 V4.1
 * GRAND HERITAGE DOCUMENTARY — STAGED 5-BEAT SCROLL TIMELINE BUILDER
 *
 * Implements Phase 1, Phase 3, Phase 7 & Phase 8 requirements:
 *  - Each chapter follows the 5-stage documentary rhythm:
 *      Beat A — Visual Establish (18%): Photo dominates, light scrim, minimal marker only
 *      Beat B — Headline Reveal  (14%): Monument name + subtitle reveals
 *      Beat C — Story Reveal     (18%): Focused story reveals; shifts to detail photo at midpoint
 *      Beat D — Reading Hold     (35%): Steady frame + single discreet 'Khám phá chi tiết' CTA
 *      Beat E — Transition       (15%): Clean text exit before next image wipe/dissolve
 *  - Dedicated Documentary Ending ('heritage-ending'):
 *      Wide complex view + "Một nghìn năm, một truyền thống hiếu học." + TripBuilder CTA
 */

export const HERITAGE_CHAPTER_WINDOWS = [
  {
    chapterNumber: 1,
    id: 'khue-van-cac',
    labelPrefix: 'heritage-khue-van',
    start: 0.14,
    end: 0.38
  },
  {
    chapterNumber: 2,
    id: 'thien-quang-tinh',
    labelPrefix: 'heritage-thien-quang',
    start: 0.38,
    end: 0.62
  },
  {
    chapterNumber: 3,
    id: 'bia-tien-si',
    labelPrefix: 'heritage-stelae',
    start: 0.62,
    end: 0.86
  }
];

export const HERITAGE_OPENING_WINDOW = { start: 0.0, end: 0.14 };
export const HERITAGE_ENDING_WINDOW = { start: 0.86, end: 1.0 };

/**
 * Deterministically resolve active phase & chapter (1..3) from scroll progress (0..1)
 */
export function resolveHeritageProgressState(progress) {
  const p = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));

  if (p < HERITAGE_OPENING_WINDOW.end) {
    return {
      phase: 'opening',
      activeChapterIndex: 0, // 0 = opening
      chapterProgress: p / HERITAGE_OPENING_WINDOW.end
    };
  }

  if (p >= HERITAGE_ENDING_WINDOW.start) {
    return {
      phase: 'ending',
      activeChapterIndex: 4, // 4 = documentary ending
      chapterProgress:
        (p - HERITAGE_ENDING_WINDOW.start) /
        (HERITAGE_ENDING_WINDOW.end - HERITAGE_ENDING_WINDOW.start)
    };
  }

  for (let i = 0; i < HERITAGE_CHAPTER_WINDOWS.length; i++) {
    const win = HERITAGE_CHAPTER_WINDOWS[i];
    if (p < win.end || i === HERITAGE_CHAPTER_WINDOWS.length - 1) {
      const localP = Math.max(
        0,
        Math.min(1, (p - win.start) / (win.end - win.start))
      );
      return {
        phase: 'chapter',
        activeChapterIndex: win.chapterNumber, // 1, 2, or 3
        chapterProgress: localP
      };
    }
  }

  return { phase: 'ending', activeChapterIndex: 4, chapterProgress: 1 };
}

export function buildHeritageDocumentaryTimeline(tl, refs, isMobile) {
  const {
    apertureFrameRef,
    entryVeilRef,
    exitBridgeRef,
    // Opening refs
    openingStageRef,
    openingPhotoInnerRef,
    openingScrimRef,
    openingTagRef,
    openingHeadlineRef,
    openingIntroRef,
    // Chapters 01..03 refs
    chapterStageRefs,
    establishLayerRefs,
    establishInnerRefs,
    establishScrimRefs,
    detailLayerRefs,
    detailInnerRefs,
    detailScrimRefs,
    editorialContainerRefs,
    chapterMarkerRefs,
    chapterHeadlineRefs,
    storyEstablishRefs,
    storyDetailRefs,
    detailCtaRefs,
    // Compact progress indicator refs
    progressNavRef,
    progressFillRefs,
    // Documentary Ending refs
    endingStageRef,
    endingPhotoInnerRef,
    endingScrimRef,
    endingContentRef,
    endingQuoteRef,
    endingCtaRef
  } = refs;

  const mobileFactor = isMobile ? 0.55 : 1;

  // -------------------------------------------------------------------------
  // 1. REGISTER CANONICAL TIMELINE LABELS (Phase 10.2)
  // -------------------------------------------------------------------------
  tl.addLabel('heritage-opening', 0.0);

  HERITAGE_CHAPTER_WINDOWS.forEach((win) => {
    const D = win.end - win.start;
    tl.addLabel(`${win.labelPrefix}-establish`, win.start + D * 0.03);
    tl.addLabel(`${win.labelPrefix}-story`, win.start + D * 0.18);
    tl.addLabel(`${win.labelPrefix}-hold`, win.start + D * 0.60);
    tl.addLabel(`${win.labelPrefix}-exit`, win.start + D * 0.91);
  });

  tl.addLabel('heritage-ending', 0.89);

  // -------------------------------------------------------------------------
  // 2. INITIAL DETERMINISTIC STATES
  // -------------------------------------------------------------------------
  if (apertureFrameRef.current) {
    gsap.set(apertureFrameRef.current, {
      clipPath: isMobile
        ? 'inset(1.5% 2% round 4px)'
        : 'inset(2.2% 2.8% round 6px)'
    });
  }

  if (entryVeilRef.current) {
    gsap.set(entryVeilRef.current, { opacity: 0.34 });
  }

  if (exitBridgeRef.current) {
    gsap.set(exitBridgeRef.current, { opacity: 0 });
  }

  // Opening initial state: Photo visible, headline & intro hidden for staged reveal
  if (openingStageRef.current) {
    gsap.set(openingStageRef.current, { opacity: 1, zIndex: 2 });
  }
  if (openingPhotoInnerRef.current) {
    const m0 = HERITAGE_OPENING_ACT.motion;
    gsap.set(openingPhotoInnerRef.current, {
      scale: 1 + (m0.scaleStart - 1) * mobileFactor,
      x: 0,
      y: 0
    });
  }
  if (openingScrimRef.current) {
    gsap.set(openingScrimRef.current, { opacity: 0.22 });
  }
  if (openingTagRef.current) {
    gsap.set(openingTagRef.current, { opacity: 1, y: 0 });
  }
  if (openingHeadlineRef.current) {
    gsap.set(openingHeadlineRef.current, { opacity: 0, y: 18 });
  }
  if (openingIntroRef.current) {
    gsap.set(openingIntroRef.current, { opacity: 0, y: 14 });
  }

  // Compact Progress Indicator starts hidden during Opening, fades in at Chapter 01
  if (progressNavRef.current) {
    gsap.set(progressNavRef.current, { opacity: 0, y: 8 });
  }
  (progressFillRefs.current || []).forEach((fillEl) => {
    if (fillEl) {
      gsap.set(fillEl, { scaleX: 0, transformOrigin: 'left center' });
    }
  });

  // Chapters 01..03 initial states
  HERITAGE_DOCUMENTARY_ACTS.forEach((act, idx) => {
    const stageEl = chapterStageRefs.current?.[idx];
    const estLayer = establishLayerRefs.current?.[idx];
    const estInner = establishInnerRefs.current?.[idx];
    const estScrim = establishScrimRefs.current?.[idx];
    const detLayer = detailLayerRefs.current?.[idx];
    const detInner = detailInnerRefs.current?.[idx];
    const detScrim = detailScrimRefs.current?.[idx];
    const edContainer = editorialContainerRefs.current?.[idx];
    const markerEl = chapterMarkerRefs.current?.[idx];
    const headlineEl = chapterHeadlineRefs.current?.[idx];
    const storyEstEl = storyEstablishRefs.current?.[idx];
    const storyDetEl = storyDetailRefs.current?.[idx];
    const ctaEl = detailCtaRefs.current?.[idx];

    if (stageEl) {
      gsap.set(stageEl, {
        opacity: 0,
        zIndex: idx + 3,
        clipPath: 'inset(0% 0% 0% 14%)'
      });
    }
    if (estLayer) {
      gsap.set(estLayer, { opacity: 1, zIndex: 1 });
    }
    if (estInner) {
      gsap.set(estInner, {
        scale: 1 + (act.motion.establish.scaleStart - 1) * mobileFactor,
        x: 0,
        y: 0
      });
    }
    if (estScrim) {
      // Beat A Establish starts with very light scrim (0.14) so photo dominates naturally
      gsap.set(estScrim, { opacity: 0.14 });
    }
    if (detLayer) {
      gsap.set(detLayer, {
        opacity: 0,
        zIndex: 2,
        clipPath: 'inset(10% 0% 0% 0%)'
      });
    }
    if (detInner) {
      gsap.set(detInner, {
        scale: 1 + (act.motion.detail.scaleStart - 1) * mobileFactor,
        x: 0,
        y: 0
      });
    }
    if (detScrim) {
      gsap.set(detScrim, { opacity: 0.85 });
    }
    if (edContainer) {
      gsap.set(edContainer, { opacity: 1, xPercent: 0 });
    }
    if (markerEl) {
      gsap.set(markerEl, { opacity: 0, y: 8 });
    }
    if (headlineEl) {
      gsap.set(headlineEl, { opacity: 0, y: 18 });
    }
    if (storyEstEl) {
      gsap.set(storyEstEl, { opacity: 0, y: 14 });
    }
    if (storyDetEl) {
      gsap.set(storyDetEl, { opacity: 0, y: 14 });
    }
    if (ctaEl) {
      gsap.set(ctaEl, { opacity: 0, y: 10 });
    }
  });

  // Documentary Ending initial state
  if (endingStageRef.current) {
    gsap.set(endingStageRef.current, { opacity: 0, zIndex: 8 });
  }
  if (endingPhotoInnerRef.current) {
    const mEnd = HERITAGE_DOCUMENTARY_ENDING.motion;
    gsap.set(endingPhotoInnerRef.current, {
      scale: 1 + (mEnd.scaleStart - 1) * mobileFactor,
      x: 0,
      y: 0
    });
  }
  if (endingScrimRef.current) {
    gsap.set(endingScrimRef.current, { opacity: 0.25 });
  }
  if (endingContentRef.current) {
    gsap.set(endingContentRef.current, { opacity: 1, y: 0 });
  }
  if (endingQuoteRef.current) {
    gsap.set(endingQuoteRef.current, { opacity: 0, y: 16 });
  }
  if (endingCtaRef.current) {
    gsap.set(endingCtaRef.current, { opacity: 0, y: 12 });
  }

  // -------------------------------------------------------------------------
  // 3. ACT 00 — OPENING CHOREOGRAPHY (0.000 -> 0.140)
  // Establish (0.000–0.014) -> Headline (0.014–0.028) -> Intro Reveal & Long Hold (0.028–0.118) -> Exit (0.118–0.138)
  // -------------------------------------------------------------------------
  if (entryVeilRef.current) {
    tl.to(
      entryVeilRef.current,
      { opacity: 0, duration: 0.035, ease: 'power2.out' },
      0.0
    );
  }

  if (apertureFrameRef.current) {
    tl.to(
      apertureFrameRef.current,
      {
        clipPath: 'inset(0% 0% round 0px)',
        duration: 0.06,
        ease: 'power2.out'
      },
      0.0
    );
  }

  if (openingPhotoInnerRef.current) {
    const m0 = HERITAGE_OPENING_ACT.motion;
    tl.to(
      openingPhotoInnerRef.current,
      {
        scale: 1 + (m0.scaleEnd - 1) * mobileFactor,
        x: m0.panX * mobileFactor,
        y: m0.panY * mobileFactor,
        duration: 0.14,
        ease: 'none'
      },
      0.0
    );
  }

  // Headline reveals early and smoothly (0.012 -> 0.028)
  if (openingScrimRef.current) {
    tl.to(
      openingScrimRef.current,
      { opacity: 0.85, duration: 0.025, ease: 'power2.out' },
      0.01
    );
  }
  if (openingHeadlineRef.current) {
    tl.to(
      openingHeadlineRef.current,
      { opacity: 1, y: 0, duration: 0.02, ease: 'power2.out' },
      0.012
    );
  }

  // Historical intro reveals right after headline (0.026 -> 0.044), then holds steady until 0.118!
  if (openingIntroRef.current) {
    tl.to(
      openingIntroRef.current,
      { opacity: 1, y: 0, duration: 0.02, ease: 'power2.out' },
      0.026
    );
  }

  // Opening text exits cleanly (0.118 -> 0.138)
  if (openingTagRef.current) {
    tl.to(
      openingTagRef.current,
      { opacity: 0, y: -10, duration: 0.02, ease: 'power2.inOut' },
      0.118
    );
  }
  if (openingHeadlineRef.current) {
    tl.to(
      openingHeadlineRef.current,
      { opacity: 0, y: -14, duration: 0.02, ease: 'power2.inOut' },
      0.119
    );
  }
  if (openingIntroRef.current) {
    tl.to(
      openingIntroRef.current,
      { opacity: 0, y: -12, duration: 0.02, ease: 'power2.inOut' },
      0.12
    );
  }

  // Reveal compact 01-02-03 progress indicator as Chapter 01 starts
  if (progressNavRef.current) {
    tl.to(
      progressNavRef.current,
      { opacity: 1, y: 0, duration: 0.025, ease: 'power2.out' },
      0.135
    );
  }

  // -------------------------------------------------------------------------
  // 4. CHAPTERS 01, 02, 03 — EXTENDED READING HOLD & DELIBERATE TEXT TRANSITIONS
  //   - 0% -> 10%: Visual Establish & Headline Reveal
  //   - 10% -> 45%: Paragraph 1 (storyEstablish) Reveal & Long Reading Hold (29% steady hold!)
  //   - 45% -> 57%: Smooth, unhurried cross-transition from Paragraph 1 to Paragraph 2 + Detail Image
  //   - 57% -> 90%: Paragraph 2 (storyDetail) + Detail CTA Long Reading Hold (33% steady hold!)
  //   - 90% -> 100%: Clean exit before next chapter
  // -------------------------------------------------------------------------
  HERITAGE_CHAPTER_WINDOWS.forEach((win, idx) => {
    const act = HERITAGE_DOCUMENTARY_ACTS[idx];
    const cStart = win.start;
    const cEnd = win.end;
    const D = cEnd - cStart; // 0.240

    const stageEl = chapterStageRefs.current?.[idx];
    const estInner = establishInnerRefs.current?.[idx];
    const estScrim = establishScrimRefs.current?.[idx];
    const detLayer = detailLayerRefs.current?.[idx];
    const detInner = detailInnerRefs.current?.[idx];
    const markerEl = chapterMarkerRefs.current?.[idx];
    const headlineEl = chapterHeadlineRefs.current?.[idx];
    const storyEstEl = storyEstablishRefs.current?.[idx];
    const storyDetEl = storyDetailRefs.current?.[idx];
    const ctaEl = detailCtaRefs.current?.[idx];
    const progFillEl = progressFillRefs.current?.[idx];

    const tEstablish = cStart; // 0%
    const tHeadline = cStart + D * 0.05; // 5%
    const tStory1In = cStart + D * 0.11; // 11% (fully visible by 17%, holds steady 17% -> 45%!)
    const tStory1Out = cStart + D * 0.45; // 45% -> 52% (7% smooth fade out)
    const tSwitchDetail = cStart + D * 0.47; // 47% -> 58% (11% smooth photo unmask)
    const tStory2In = cStart + D * 0.52; // 52% -> 59% (7% smooth fade in, holds steady 59% -> 90%!)
    const tExit = cStart + D * 0.90; // 90% -> 98%

    // Progress bar fill across chapter
    if (progFillEl) {
      tl.to(
        progFillEl,
        { scaleX: 1, duration: D, ease: 'none' },
        cStart
      );
    }

    // --- STAGE A: VISUAL ESTABLISH (0% -> 10%) ---
    if (stageEl) {
      tl.to(
        stageEl,
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: D * 0.11,
          ease: 'power2.inOut'
        },
        tEstablish - 0.01
      );
    }

    if (markerEl) {
      tl.to(
        markerEl,
        { opacity: 1, y: 0, duration: D * 0.06, ease: 'power2.out' },
        tEstablish + D * 0.02
      );
    }

    // Establishing photo camera drift (0% -> 55%)
    if (estInner) {
      tl.to(
        estInner,
        {
          scale: 1 + (act.motion.establish.scaleEnd - 1) * mobileFactor,
          x: act.motion.establish.panX * mobileFactor,
          y: act.motion.establish.panY * mobileFactor,
          duration: D * 0.56,
          ease: 'power1.out'
        },
        tEstablish
      );
    }

    // --- STAGE B: HEADLINE REVEAL (5% -> 12%) ---
    if (estScrim) {
      tl.to(
        estScrim,
        { opacity: 0.85, duration: D * 0.08, ease: 'power2.out' },
        tHeadline
      );
    }
    if (headlineEl) {
      tl.to(
        headlineEl,
        { opacity: 1, y: 0, duration: D * 0.07, ease: 'power2.out' },
        tHeadline
      );
    }

    // --- STAGE C: STORY PARAGRAPH 1 & LONG READING HOLD (11% -> 45% hold, 45% -> 52% exit) ---
    if (storyEstEl) {
      tl.to(
        storyEstEl,
        { opacity: 1, y: 0, duration: D * 0.065, ease: 'power2.out' },
        tStory1In
      );
      // Long steady hold from 17.5% to 45% (27.5% of chapter!), then smooth unhurried exit
      tl.to(
        storyEstEl,
        { opacity: 0, y: -12, duration: D * 0.07, ease: 'power2.inOut' },
        tStory1Out
      );
    }

    // Detail Photograph reveals smoothly across the midpoint transition (47% -> 58%)
    if (detLayer) {
      tl.to(
        detLayer,
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: D * 0.11,
          ease: 'power2.inOut'
        },
        tSwitchDetail
      );
    }

    if (detInner) {
      tl.to(
        detInner,
        {
          scale: 1 + (act.motion.detail.scaleEnd - 1) * mobileFactor,
          x: act.motion.detail.panX * mobileFactor,
          y: act.motion.detail.panY * mobileFactor,
          duration: D * 0.48,
          ease: 'power1.out'
        },
        tSwitchDetail
      );
    }

    // --- STAGE D: STORY PARAGRAPH 2 & LONG READING HOLD + DISCREET CTA (52% -> 90%) ---
    if (storyDetEl) {
      tl.to(
        storyDetEl,
        { opacity: 1, y: 0, duration: D * 0.07, ease: 'power2.out' },
        tStory2In
      );
    }
    if (ctaEl) {
      tl.to(
        ctaEl,
        { opacity: 1, y: 0, duration: D * 0.07, ease: 'power2.out' },
        tStory2In + D * 0.025
      );
    }

    // --- STAGE E: TRANSITION OUT (90% -> 100%) ---
    if (markerEl) {
      tl.to(
        markerEl,
        { opacity: 0, y: -8, duration: D * 0.07, ease: 'power2.inOut' },
        tExit
      );
    }
    if (headlineEl) {
      tl.to(
        headlineEl,
        { opacity: 0, y: -12, duration: D * 0.07, ease: 'power2.inOut' },
        tExit + D * 0.01
      );
    }
    if (storyDetEl) {
      tl.to(
        storyDetEl,
        { opacity: 0, y: -10, duration: D * 0.07, ease: 'power2.inOut' },
        tExit + D * 0.015
      );
    }
    if (ctaEl) {
      tl.to(
        ctaEl,
        { opacity: 0, y: -8, duration: D * 0.065, ease: 'power2.inOut' },
        tExit + D * 0.015
      );
    }
  });

  // -------------------------------------------------------------------------
  // 5. DOCUMENTARY ENDING — THE LEGACY OF KNOWLEDGE (0.860 -> 1.000)
  // -------------------------------------------------------------------------
  if (progressNavRef.current) {
    tl.to(
      progressNavRef.current,
      { opacity: 0, y: 8, duration: 0.025, ease: 'power2.in' },
      0.855
    );
  }

  if (endingStageRef.current) {
    tl.to(
      endingStageRef.current,
      { opacity: 1, duration: 0.038, ease: 'power2.inOut' },
      0.858
    );
  }

  if (endingPhotoInnerRef.current) {
    const mEnd = HERITAGE_DOCUMENTARY_ENDING.motion;
    tl.to(
      endingPhotoInnerRef.current,
      {
        scale: 1 + (mEnd.scaleEnd - 1) * mobileFactor,
        x: mEnd.panX * mobileFactor,
        y: mEnd.panY * mobileFactor,
        duration: 0.12,
        ease: 'power1.out'
      },
      0.86
    );
  }

  if (endingScrimRef.current) {
    tl.to(
      endingScrimRef.current,
      { opacity: 0.88, duration: 0.03, ease: 'power2.out' },
      0.878
    );
  }

  if (endingQuoteRef.current) {
    tl.to(
      endingQuoteRef.current,
      { opacity: 1, y: 0, duration: 0.028, ease: 'power2.out' },
      0.885
    );
  }

  if (endingCtaRef.current) {
    tl.to(
      endingCtaRef.current,
      { opacity: 1, y: 0, duration: 0.026, ease: 'power2.out' },
      0.902
    );
  }

  if (exitBridgeRef.current) {
    tl.to(
      exitBridgeRef.current,
      { opacity: 1, duration: 0.04, ease: 'none' },
      0.96
    );
  }
}
