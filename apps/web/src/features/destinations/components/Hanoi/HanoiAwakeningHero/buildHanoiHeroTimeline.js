import gsap from 'gsap';
import { HANOI_HERO_ACTS } from './hanoiHeroManifest';

/**
 * SUPER EZ TOUR — HANOI SCREEN 1 V4.1
 * GRAND CINEMATIC OPENING — 4-ACT GSAP TIMELINE CHOREOGRAPHY
 *
 * Timeline Labels (Phase 8.1 & 8.2):
 *  - act-awakening  (0.00 -> 0.20 | 20%): Act 01 — The Awakening (Silence)
 *  - act-reveal     (0.20 -> 0.45 | 25%): Act 02 — The Reveal (Wonder)
 *  - act-journey    (0.45 -> 0.75 | 30%): Act 03 — The Journey (Discovery)
 *  - act-enter-hanoi(0.75 -> 0.93 | 18%): Act 04 — Enter Hanoi (Invitation)
 *  - handoff-screen2(0.93 -> 1.00 |  7%): Seamless Handoff into Screen 2 Old Quarter
 *
 * Implements all 6 Signature Cinematic Effects with deterministic bidirectional scrubbing.
 */
export function buildHanoiHeroTimeline(tl, refs, isMobile) {
  const {
    apertureFrameRef,
    photoLayerRefs,
    photoInnerRefs,
    willowFgRef,
    mistMidRef,
    actBlockRefs,
    actLineRefs,
    actBodyRefs,
    actRailItemRefs,
    actRailFillRefs,
    scrollCueRef,
    transitionFogRef
  } = refs;

  const layers = photoLayerRefs.current || [];
  const inners = photoInnerRefs.current || [];
  const actBlocks = actBlockRefs.current || [];
  const actLines = actLineRefs.current || [];
  const actBodies = actBodyRefs.current || [];
  const railItems = actRailItemRefs.current || [];
  const railFills = actRailFillRefs.current || [];

  const mobileFactor = isMobile ? 0.5 : 1;

  // Register explicit Phase 8.1 timeline labels
  tl.addLabel('act-awakening', 0.0);
  tl.addLabel('act-reveal', 0.20);
  tl.addLabel('act-journey', 0.45);
  tl.addLabel('act-enter-hanoi', 0.75);
  tl.addLabel('handoff-screen2', 0.93);

  // -------------------------------------------------------------------------
  // INITIAL STATES
  // -------------------------------------------------------------------------
  if (apertureFrameRef.current) {
    gsap.set(apertureFrameRef.current, {
      clipPath: isMobile ? 'inset(0% 0% round 0px)' : 'inset(1.2% 1.6% round 4px)'
    });
  }

  layers.forEach((layerEl, idx) => {
    if (!layerEl) return;
    if (idx === 0) {
      gsap.set(layerEl, { opacity: 1, zIndex: 1, clipPath: 'inset(0% 0% 0% 0%)' });
    } else if (idx === 3) {
      // Act 04 uses signature directional wipe + opacity blend
      gsap.set(layerEl, {
        opacity: 0,
        zIndex: 4,
        clipPath: isMobile ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 35%)'
      });
    } else {
      gsap.set(layerEl, { opacity: 0, zIndex: idx + 1 });
    }
  });

  inners.forEach((innerEl, idx) => {
    if (innerEl) {
      const m = HANOI_HERO_ACTS[idx]?.motion || { scaleStart: 1.0 };
      gsap.set(innerEl, {
        scale: 1 + (m.scaleStart - 1) * mobileFactor,
        x: 0,
        y: 0
      });
    }
  });

  if (willowFgRef.current) {
    gsap.set(willowFgRef.current, { opacity: 0.78, y: 0, scale: 1.0 });
  }
  if (mistMidRef.current) {
    gsap.set(mistMidRef.current, { opacity: 0.42, xPercent: -2, y: 0 });
  }

  // Act 01 starts visible & crisp at t=0; Acts 02–04 start hidden & non-focusable
  const setActAccessibility = (blockEl, isInteractive) => {
    if (!blockEl) return;
    blockEl.setAttribute('aria-hidden', isInteractive ? 'false' : 'true');
    if ('inert' in blockEl) {
      blockEl.inert = !isInteractive;
    }
  };

  actBlocks.forEach((blockEl, idx) => {
    if (!blockEl) return;
    const isFirst = idx === 0;
    gsap.set(blockEl, {
      autoAlpha: isFirst ? 1 : 0,
      y: 0,
      pointerEvents: isFirst ? 'auto' : 'none'
    });
    setActAccessibility(blockEl, isFirst);

    const lines = actLines[idx] || [];
    lines.forEach((lineEl) => {
      if (lineEl) {
        gsap.set(lineEl, {
          y: 0,
          yPercent: isFirst ? 0 : 102,
          opacity: 1,
          visibility: 'visible'
        });
      }
    });

    if (actBodies[idx]) {
      gsap.set(actBodies[idx], {
        autoAlpha: isFirst ? 1 : 0,
        y: isFirst ? 0 : 10
      });
    }
  });

  railItems.forEach((itemEl, idx) => {
    if (itemEl) gsap.set(itemEl, { opacity: idx === 0 ? 1 : 0.52 });
  });
  railFills.forEach((fillEl) => {
    if (fillEl) gsap.set(fillEl, { scaleX: 0, transformOrigin: 'left center' });
  });

  if (scrollCueRef.current) {
    gsap.set(scrollCueRef.current, { opacity: 0.9, y: 0 });
  }
  if (transitionFogRef.current) {
    gsap.set(transitionFogRef.current, { opacity: 0 });
  }

  const m0 = HANOI_HERO_ACTS[0].motion;
  const m1 = HANOI_HERO_ACTS[1].motion;
  const m2 = HANOI_HERO_ACTS[2].motion;
  const m3 = HANOI_HERO_ACTS[3].motion;

  // =========================================================================
  // ACT 01 — THE AWAKENING (0.00 to 0.20 | 20%)
  // Signature Effect 1: Aperture frame opens to full-bleed
  // Signature Effect 2: Willow & Mist multi-plane depth parallax
  // =========================================================================
  if (apertureFrameRef.current) {
    tl.to(
      apertureFrameRef.current,
      {
        clipPath: 'inset(0% 0% round 0px)',
        duration: 0.14,
        ease: 'power2.out'
      },
      'act-awakening'
    );
  }

  if (inners[0]) {
    tl.to(
      inners[0],
      {
        scale: 1 + (m0.scaleEnd - 1) * mobileFactor,
        x: m0.panX * mobileFactor,
        y: m0.panY * mobileFactor,
        duration: 0.28,
        ease: 'none'
      },
      'act-awakening'
    );
  }

  if (willowFgRef.current) {
    tl.to(
      willowFgRef.current,
      {
        y: -36 * mobileFactor,
        scale: 1 + 0.05 * mobileFactor,
        opacity: 0,
        duration: 0.26,
        ease: 'power1.inOut'
      },
      'act-awakening'
    );
  }

  if (mistMidRef.current) {
    tl.to(
      mistMidRef.current,
      {
        xPercent: 4 * mobileFactor,
        y: -16 * mobileFactor,
        opacity: 0,
        duration: 0.28,
        ease: 'none'
      },
      'act-awakening'
    );
  }

  if (railFills[0]) {
    tl.to(railFills[0], { scaleX: 1, duration: 0.18, ease: 'none' }, 0.0);
  }

  if (scrollCueRef.current) {
    tl.to(scrollCueRef.current, { opacity: 0, y: 6, duration: 0.07, ease: 'power2.in' }, 0.07);
  }

  // Act 01 Kinetic Typography Exit (0.14 -> 0.20)
  if ((actLines[0] || []).length > 0) {
    tl.to(
      actLines[0],
      {
        y: 0,
        yPercent: -105,
        duration: 0.05,
        stagger: 0.008,
        ease: 'power2.in'
      },
      0.145
    );
  }
  if (actBodies[0]) {
    tl.to(actBodies[0], { autoAlpha: 0, y: -8, duration: 0.045, ease: 'power2.in' }, 0.145);
  }
  if (actBlocks[0]) {
    tl.to(
      actBlocks[0],
      {
        autoAlpha: 0,
        duration: 0.04,
        onComplete: () => {
          gsap.set(actBlocks[0], { pointerEvents: 'none' });
          setActAccessibility(actBlocks[0], false);
        },
        onReverseComplete: () => {
          gsap.set(actBlocks[0], { pointerEvents: 'auto' });
          setActAccessibility(actBlocks[0], true);
        }
      },
      0.165
    );
  }

  // =========================================================================
  // ACT 02 — THE REVEAL (0.20 to 0.45 | 25%)
  // Signature Effect 3 & 4: Match-cut dissolve into Tower Detail + Kinetic Reveal
  // =========================================================================
  if (railItems[0] && railItems[1]) {
    tl.to(railItems[0], { opacity: 0.62, duration: 0.03 }, 'act-reveal');
    tl.to(railItems[1], { opacity: 1, duration: 0.03 }, 'act-reveal');
  }

  if (layers[1]) {
    tl.to(
      layers[1],
      {
        opacity: 1,
        duration: 0.09,
        ease: 'power2.inOut'
      },
      'act-reveal'
    );
  }

  if (inners[1]) {
    tl.to(
      inners[1],
      {
        scale: 1 + (m1.scaleEnd - 1) * mobileFactor,
        x: m1.panX * mobileFactor,
        y: m1.panY * mobileFactor,
        duration: 0.32,
        ease: 'none'
      },
      'act-reveal'
    );
  }

  // Act 02 Kinetic Typography Enter (0.23 -> 0.28)
  if (actBlocks[1]) {
    tl.to(
      actBlocks[1],
      {
        autoAlpha: 1,
        duration: 0.03,
        onStart: () => {
          gsap.set(actBlocks[1], { pointerEvents: 'auto' });
          setActAccessibility(actBlocks[1], true);
        },
        onReverseComplete: () => {
          gsap.set(actBlocks[1], { pointerEvents: 'none' });
          setActAccessibility(actBlocks[1], false);
        }
      },
      0.23
    );
  }
  if ((actLines[1] || []).length > 0) {
    tl.to(
      actLines[1],
      {
        y: 0,
        yPercent: 0,
        duration: 0.05,
        stagger: 0.01,
        ease: 'power3.out'
      },
      0.235
    );
  }
  if (actBodies[1]) {
    tl.to(actBodies[1], { autoAlpha: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.25);
  }
  if (railFills[1]) {
    tl.to(railFills[1], { scaleX: 1, duration: 0.21, ease: 'none' }, 0.21);
  }

  // Reading Hold on Tháp Rùa: 0.28 -> 0.40 (Stationary, zero text motion)
  // Act 02 Exit (0.40 -> 0.45)
  if ((actLines[1] || []).length > 0) {
    tl.to(actLines[1], { y: 0, yPercent: -105, duration: 0.045, ease: 'power2.in' }, 0.405);
  }
  if (actBodies[1]) {
    tl.to(actBodies[1], { autoAlpha: 0, y: -8, duration: 0.04, ease: 'power2.in' }, 0.405);
  }
  if (actBlocks[1]) {
    tl.to(
      actBlocks[1],
      {
        autoAlpha: 0,
        duration: 0.04,
        onComplete: () => {
          gsap.set(actBlocks[1], { pointerEvents: 'none' });
          setActAccessibility(actBlocks[1], false);
        },
        onReverseComplete: () => {
          gsap.set(actBlocks[1], { pointerEvents: 'auto' });
          setActAccessibility(actBlocks[1], true);
        }
      },
      0.415
    );
  }

  // =========================================================================
  // ACT 03 — THE JOURNEY (0.45 to 0.75 | 30%)
  // Lakeside canopy & foreground willow bough depth parallax
  // =========================================================================
  if (railItems[1] && railItems[2]) {
    tl.to(railItems[1], { opacity: 0.62, duration: 0.03 }, 'act-journey');
    tl.to(railItems[2], { opacity: 1, duration: 0.03 }, 'act-journey');
  }

  if (layers[2]) {
    tl.to(
      layers[2],
      {
        opacity: 1,
        duration: 0.09,
        ease: 'power2.inOut'
      },
      'act-journey'
    );
  }

  // Re-introduce subtle foreground willow canopy parallax in Act 03
  if (willowFgRef.current) {
    tl.fromTo(
      willowFgRef.current,
      { opacity: 0, y: 14 * mobileFactor, scale: 1.02 },
      {
        opacity: 0.55,
        y: -22 * mobileFactor,
        scale: 1 + 0.05 * mobileFactor,
        duration: 0.26,
        ease: 'none'
      },
      'act-journey+=0.02'
    );
    tl.to(willowFgRef.current, { opacity: 0, duration: 0.06 }, 0.71);
  }

  if (inners[2]) {
    tl.to(
      inners[2],
      {
        scale: 1 + (m2.scaleEnd - 1) * mobileFactor,
        x: m2.panX * mobileFactor,
        y: m2.panY * mobileFactor,
        duration: 0.34,
        ease: 'none'
      },
      'act-journey'
    );
  }

  // Act 03 Kinetic Typography Enter (0.48 -> 0.53)
  if (actBlocks[2]) {
    tl.to(
      actBlocks[2],
      {
        autoAlpha: 1,
        duration: 0.03,
        onStart: () => {
          gsap.set(actBlocks[2], { pointerEvents: 'auto' });
          setActAccessibility(actBlocks[2], true);
        },
        onReverseComplete: () => {
          gsap.set(actBlocks[2], { pointerEvents: 'none' });
          setActAccessibility(actBlocks[2], false);
        }
      },
      0.48
    );
  }
  if ((actLines[2] || []).length > 0) {
    tl.to(
      actLines[2],
      {
        y: 0,
        yPercent: 0,
        duration: 0.05,
        stagger: 0.01,
        ease: 'power3.out'
      },
      0.485
    );
  }
  if (actBodies[2]) {
    tl.to(actBodies[2], { autoAlpha: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.50);
  }
  if (railFills[2]) {
    tl.to(railFills[2], { scaleX: 1, duration: 0.24, ease: 'none' }, 0.46);
  }

  // Reading Hold in Act 03: 0.53 -> 0.69 (Stationary, zero text motion)
  // Act 03 Exit (0.69 -> 0.74)
  if ((actLines[2] || []).length > 0) {
    tl.to(actLines[2], { y: 0, yPercent: -105, duration: 0.045, ease: 'power2.in' }, 0.695);
  }
  if (actBodies[2]) {
    tl.to(actBodies[2], { autoAlpha: 0, y: -8, duration: 0.04, ease: 'power2.in' }, 0.695);
  }
  if (actBlocks[2]) {
    tl.to(
      actBlocks[2],
      {
        autoAlpha: 0,
        duration: 0.04,
        onComplete: () => {
          gsap.set(actBlocks[2], { pointerEvents: 'none' });
          setActAccessibility(actBlocks[2], false);
        },
        onReverseComplete: () => {
          gsap.set(actBlocks[2], { pointerEvents: 'auto' });
          setActAccessibility(actBlocks[2], true);
        }
      },
      0.705
    );
  }

  // =========================================================================
  // ACT 04 — ENTER HANOI (0.75 to 0.93) & HANDOFF TO SCREEN 2 (0.93 to 1.00)
  // Signature Effect 5: Directional Editorial Wipe + Decelerating Camera Handoff
  // =========================================================================
  if (railItems[2] && railItems[3]) {
    tl.to(railItems[2], { opacity: 0.62, duration: 0.03 }, 'act-enter-hanoi');
    tl.to(railItems[3], { opacity: 1, duration: 0.03 }, 'act-enter-hanoi');
  }

  if (layers[3]) {
    tl.to(
      layers[3],
      {
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.095,
        ease: 'power2.inOut'
      },
      'act-enter-hanoi'
    );
  }

  if (inners[3]) {
    tl.to(
      inners[3],
      {
        scale: 1 + (m3.scaleEnd - 1) * mobileFactor,
        x: m3.panX * mobileFactor,
        y: m3.panY * mobileFactor,
        duration: 0.25,
        ease: 'power1.out'
      },
      'act-enter-hanoi'
    );
  }

  // Act 04 Kinetic Typography Enter (0.77 -> 0.82)
  if (actBlocks[3]) {
    tl.to(
      actBlocks[3],
      {
        autoAlpha: 1,
        duration: 0.03,
        onStart: () => {
          gsap.set(actBlocks[3], { pointerEvents: 'auto' });
          setActAccessibility(actBlocks[3], true);
        },
        onReverseComplete: () => {
          gsap.set(actBlocks[3], { pointerEvents: 'none' });
          setActAccessibility(actBlocks[3], false);
        }
      },
      0.77
    );
  }
  if ((actLines[3] || []).length > 0) {
    tl.to(
      actLines[3],
      {
        y: 0,
        yPercent: 0,
        duration: 0.05,
        stagger: 0.01,
        ease: 'power3.out'
      },
      0.775
    );
  }
  if (actBodies[3]) {
    tl.to(actBodies[3], { autoAlpha: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.79);
  }
  if (railFills[3]) {
    tl.to(railFills[3], { scaleX: 1, duration: 0.18, ease: 'none' }, 0.76);
  }

  // Reading Hold in Act 04: 0.82 -> 0.92
  // Handoff to Screen 2 (0.93 -> 1.00)
  if ((actLines[3] || []).length > 0) {
    tl.to(actLines[3], { y: 0, yPercent: -105, duration: 0.045, ease: 'power2.in' }, 'handoff-screen2');
  }
  if (actBodies[3]) {
    tl.to(actBodies[3], { autoAlpha: 0, y: -8, duration: 0.04, ease: 'power2.in' }, 'handoff-screen2');
  }
  if (actBlocks[3]) {
    tl.to(
      actBlocks[3],
      {
        autoAlpha: 0,
        duration: 0.04,
        onComplete: () => {
          gsap.set(actBlocks[3], { pointerEvents: 'none' });
          setActAccessibility(actBlocks[3], false);
        },
        onReverseComplete: () => {
          gsap.set(actBlocks[3], { pointerEvents: 'auto' });
          setActAccessibility(actBlocks[3], true);
        }
      },
      0.94
    );
  }

  if (transitionFogRef.current) {
    tl.to(
      transitionFogRef.current,
      {
        opacity: 0.15,
        duration: 0.08,
        ease: 'power1.inOut'
      },
      0.92
    );
  }
}
