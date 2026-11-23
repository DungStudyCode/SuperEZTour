import gsap from 'gsap';
import { getLayoutGeometry } from './editorialLayouts';

/**
 * SUPER EZ TOUR — HANOI SCREEN 2 V3.4.1
 * Master GSAP Editorial Choreography Builder
 *
 * V3.4.1 Readability & Sharpness Upgrades:
 *  - Per-beat localized directional scrim opacity controlled cleanly via beatScrimRefs.
 *  - Establishing title localized scrim fades out completely once Beat 01 enters.
 *  - Typography containers never scale, never blur, and rest at exact integer y: 0
 *    with clearProps on transform after reveal so subpixel font antialiasing stays razor-sharp.
 */
export function buildOldQuarterTimeline(tl, chapters, refs, isMobile) {
  const totalChapters = chapters.length;
  const mobileFactor = isMobile ? 0.5 : 1;

  chapters.forEach((ch, i) => {
    const stage = refs.stageRefs.current[i];
    const photoFrame = refs.photoFrameRefs.current[i];
    const establishingScrim = refs.establishingScrimRefs.current[i];
    const immersiveTitle = refs.immersiveTitleRefs.current[i];
    const editorialSurface = refs.editorialSurfaceRefs.current[i];
    const ctaBar = refs.ctaBarRefs.current[i];

    const photoLayers = refs.beatPhotoLayerRefs.current[i] || [];
    const photoInners = refs.beatPhotoInnerRefs.current[i] || [];
    const beatScrims = refs.beatScrimRefs.current[i] || [];
    const beatCaptions = refs.beatCaptionRefs.current[i] || [];
    const beats = refs.beatRefs.current[i] || [];
    const beatRailItems = refs.beatRailItemRefs.current[i] || [];
    const beatRailFills = refs.beatRailFillRefs.current[i] || [];

    if (!stage || !photoFrame || !immersiveTitle || !editorialSurface) return;

    const baseTime = i * 1.0;
    const align = ch.layoutAlign;

    const geo0 = getLayoutGeometry(ch.beats[0].layout, align, isMobile);
    const geo1 = getLayoutGeometry(ch.beats[1].layout, align, isMobile);
    const geo2 = getLayoutGeometry(ch.beats[2].layout, align, isMobile);

    const targetScrim0 = isMobile ? 0.25 : (ch.beats[0].image?.scrimOpacity ?? 0.85);
    const targetScrim1 = isMobile ? 0.25 : (ch.beats[1].image?.scrimOpacity ?? 0.35);
    const targetScrim2 = isMobile ? 0.25 : (ch.beats[2].image?.scrimOpacity ?? 0.45);

    // Deterministic timeline labels for chapter & beat navigation
    tl.addLabel(`chapter-${i}-start`, baseTime);
    tl.addLabel(`chapter-${i}-beat-0`, baseTime + 0.185);
    tl.addLabel(`chapter-${i}-beat-1`, baseTime + 0.425);
    tl.addLabel(`chapter-${i}-beat-2`, baseTime + 0.665);

    // -----------------------------------------------------------------------
    // INITIAL STATES
    // -----------------------------------------------------------------------
    gsap.set(stage, {
      opacity: i === 0 ? 1 : 0,
      zIndex: i === 0 ? 2 : 1,
      pointerEvents: i === 0 ? 'auto' : 'none'
    });

    gsap.set(photoFrame, {
      top: '0%',
      left: '0%',
      width: '100%',
      height: '100%',
      borderRadius: '0px'
    });

    if (establishingScrim) {
      gsap.set(establishingScrim, { opacity: 1 });
    }

    gsap.set(immersiveTitle, { opacity: 1, y: 0 });

    if (isMobile) {
      gsap.set(editorialSurface, { opacity: 0, y: 14, pointerEvents: 'none' });
    } else {
      gsap.set(editorialSurface, {
        ...geo0.panel,
        opacity: 0,
        y: 12,
        pointerEvents: 'none'
      });
    }

    if (ctaBar) {
      gsap.set(ctaBar, { opacity: 0, y: 8, pointerEvents: 'none' });
    }

    photoLayers.forEach((layerEl, bIdx) => {
      if (layerEl) {
        gsap.set(layerEl, {
          opacity: bIdx === 0 ? 1 : 0,
          zIndex: bIdx + 1,
          pointerEvents: bIdx === 0 ? 'auto' : 'none'
        });
      }
    });

    // Localized beat scrim starts at 0 during establishing shot, then fades to its beat target
    beatScrims.forEach((scrimEl, bIdx) => {
      if (scrimEl) {
        gsap.set(scrimEl, { opacity: bIdx === 0 ? 0 : [targetScrim0, targetScrim1, targetScrim2][bIdx] });
      }
    });

    photoInners.forEach((innerEl, bIdx) => {
      if (innerEl) {
        const m = ch.beats[bIdx]?.motion || { scaleStart: 1.01 };
        gsap.set(innerEl, {
          scale: 1 + (m.scaleStart - 1) * mobileFactor,
          x: 0,
          y: 0
        });
      }
    });

    beatCaptions.forEach((capEl) => {
      if (capEl) gsap.set(capEl, { opacity: 0, y: 6 });
    });

    beats.forEach((bEl) => {
      if (bEl) gsap.set(bEl, { opacity: 0, y: 10, pointerEvents: 'none' });
    });

    beatRailItems.forEach((rEl, rIdx) => {
      if (rEl) gsap.set(rEl, { opacity: rIdx === 0 ? 1 : 0.62 });
    });

    beatRailFills.forEach((fEl) => {
      if (fEl) gsap.set(fEl, { scaleX: 0, transformOrigin: 'left center' });
    });

    // -----------------------------------------------------------------------
    // CHAPTER INCOMING CROSSFADE
    // -----------------------------------------------------------------------
    if (i > 0) {
      tl.to(
        stage,
        {
          opacity: 1,
          duration: 0.065,
          ease: 'power2.inOut',
          onStart: () => gsap.set(stage, { pointerEvents: 'auto', zIndex: 3 })
        },
        baseTime - 0.065
      );
    }

    const m0 = ch.beats[0].motion;
    const m1 = ch.beats[1].motion;
    const m2 = ch.beats[2].motion;

    // -----------------------------------------------------------------------
    // STATE A — ESTABLISHING SHOT (0.000 to 0.085)
    // -----------------------------------------------------------------------
    if (photoInners[0]) {
      tl.to(
        photoInners[0],
        {
          scale: 1 + (m0.scaleStart - 1 + 0.015) * mobileFactor,
          duration: 0.085,
          ease: 'none'
        },
        baseTime
      );
    }

    tl.to(
      immersiveTitle,
      {
        opacity: 0,
        y: -12,
        duration: 0.04,
        ease: 'power2.in'
      },
      baseTime + 0.055
    );

    if (establishingScrim) {
      tl.to(
        establishingScrim,
        {
          opacity: 0,
          duration: 0.05,
          ease: 'power2.inOut'
        },
        baseTime + 0.065
      );
    }

    // -----------------------------------------------------------------------
    // MORPH INTO BEAT 01 EDITORIAL LAYOUT (0.085 to 0.145)
    // -----------------------------------------------------------------------
    tl.to(
      photoFrame,
      {
        ...geo0.frame,
        duration: 0.06,
        ease: 'power2.inOut'
      },
      baseTime + 0.085
    );

    if (beatScrims[0]) {
      tl.to(
        beatScrims[0],
        {
          opacity: targetScrim0,
          duration: 0.055,
          ease: 'power2.out'
        },
        baseTime + 0.085
      );
    }

    tl.to(
      editorialSurface,
      {
        opacity: 1,
        y: 0,
        duration: 0.05,
        ease: 'power2.out',
        onStart: () => gsap.set(editorialSurface, { pointerEvents: 'auto' })
      },
      baseTime + 0.095
    );

    // =======================================================================
    // BEAT 01 (0.135 to 0.375 | Reveal 15% · Reading Hold 71% · Exit 15%)
    // =======================================================================
    if (beats[0]) {
      tl.to(
        beats[0],
        {
          opacity: 1,
          y: 0,
          duration: 0.035,
          ease: 'power2.out',
          onStart: () => gsap.set(beats[0], { pointerEvents: 'auto' })
        },
        baseTime + 0.135
      );
    }
    if (beatCaptions[0] && geo0.captionVisible) {
      tl.to(beatCaptions[0], { opacity: 1, y: 0, duration: 0.035 }, baseTime + 0.145);
    }
    if (photoInners[0]) {
      tl.to(
        photoInners[0],
        {
          scale: 1 + (m0.scaleEnd - 1) * mobileFactor,
          x: m0.panX * mobileFactor,
          y: m0.panY * mobileFactor,
          duration: 0.24,
          ease: 'none'
        },
        baseTime + 0.135
      );
    }
    if (beatRailFills[0]) {
      tl.to(beatRailFills[0], { scaleX: 1, duration: 0.205, ease: 'none' }, baseTime + 0.135);
    }

    // -----------------------------------------------------------------------
    // TRANSITION BEAT 01 -> BEAT 02 (0.340 to 0.400)
    // -----------------------------------------------------------------------
    if (beats[0]) {
      tl.to(
        beats[0],
        {
          opacity: 0,
          y: -8,
          duration: 0.032,
          ease: 'power2.in',
          onComplete: () => gsap.set(beats[0], { pointerEvents: 'none' })
        },
        baseTime + 0.340
      );
    }
    if (beatCaptions[0]) {
      tl.to(beatCaptions[0], { opacity: 0, duration: 0.025 }, baseTime + 0.340);
    }
    if (beatRailItems[0] && beatRailItems[1]) {
      tl.to(beatRailItems[0], { opacity: 0.68, duration: 0.035 }, baseTime + 0.345);
      tl.to(beatRailItems[1], { opacity: 1, duration: 0.035 }, baseTime + 0.345);
    }
    if (photoLayers[1]) {
      tl.to(
        photoLayers[1],
        {
          opacity: 1,
          duration: 0.055,
          ease: 'power2.inOut',
          onStart: () => gsap.set(photoLayers[1], { pointerEvents: 'auto' })
        },
        baseTime + 0.345
      );
    }
    tl.to(
      photoFrame,
      {
        ...geo1.frame,
        duration: 0.06,
        ease: 'power2.inOut'
      },
      baseTime + 0.345
    );
    if (!isMobile) {
      tl.to(
        editorialSurface,
        {
          ...geo1.panel,
          duration: 0.06,
          ease: 'power2.inOut'
        },
        baseTime + 0.345
      );
    }

    // =======================================================================
    // BEAT 02 (0.375 to 0.615 | Reveal 15% · Reading Hold 71% · Exit 15%)
    // =======================================================================
    if (beats[1]) {
      tl.to(
        beats[1],
        {
          opacity: 1,
          y: 0,
          duration: 0.035,
          ease: 'power2.out',
          onStart: () => gsap.set(beats[1], { pointerEvents: 'auto' })
        },
        baseTime + 0.380
      );
    }
    if (beatCaptions[1] && geo1.captionVisible) {
      tl.to(beatCaptions[1], { opacity: 1, y: 0, duration: 0.035 }, baseTime + 0.390);
    }
    if (photoInners[1]) {
      tl.to(
        photoInners[1],
        {
          scale: 1 + (m1.scaleEnd - 1) * mobileFactor,
          x: m1.panX * mobileFactor,
          y: m1.panY * mobileFactor,
          duration: 0.24,
          ease: 'none'
        },
        baseTime + 0.375
      );
    }
    if (beatRailFills[1]) {
      tl.to(beatRailFills[1], { scaleX: 1, duration: 0.205, ease: 'none' }, baseTime + 0.375);
    }

    // -----------------------------------------------------------------------
    // TRANSITION BEAT 02 -> BEAT 03 (0.580 to 0.640)
    // -----------------------------------------------------------------------
    if (beats[1]) {
      tl.to(
        beats[1],
        {
          opacity: 0,
          y: -8,
          duration: 0.032,
          ease: 'power2.in',
          onComplete: () => gsap.set(beats[1], { pointerEvents: 'none' })
        },
        baseTime + 0.580
      );
    }
    if (beatCaptions[1]) {
      tl.to(beatCaptions[1], { opacity: 0, duration: 0.025 }, baseTime + 0.580);
    }
    if (beatRailItems[1] && beatRailItems[2]) {
      tl.to(beatRailItems[1], { opacity: 0.68, duration: 0.035 }, baseTime + 0.585);
      tl.to(beatRailItems[2], { opacity: 1, duration: 0.035 }, baseTime + 0.585);
    }
    if (photoLayers[2]) {
      tl.to(
        photoLayers[2],
        {
          opacity: 1,
          duration: 0.055,
          ease: 'power2.inOut',
          onStart: () => gsap.set(photoLayers[2], { pointerEvents: 'auto' })
        },
        baseTime + 0.585
      );
    }
    tl.to(
      photoFrame,
      {
        ...geo2.frame,
        duration: 0.06,
        ease: 'power2.inOut'
      },
      baseTime + 0.585
    );
    if (!isMobile) {
      tl.to(
        editorialSurface,
        {
          ...geo2.panel,
          duration: 0.06,
          ease: 'power2.inOut'
        },
        baseTime + 0.585
      );
    }

    // =======================================================================
    // BEAT 03 (0.615 to 0.855 | Reveal 15% · Reading Hold 71% · Exit 15%)
    // =======================================================================
    if (beats[2]) {
      tl.to(
        beats[2],
        {
          opacity: 1,
          y: 0,
          duration: 0.035,
          ease: 'power2.out',
          onStart: () => gsap.set(beats[2], { pointerEvents: 'auto' })
        },
        baseTime + 0.620
      );
    }
    if (ctaBar) {
      tl.to(
        ctaBar,
        {
          opacity: 1,
          y: 0,
          duration: 0.035,
          ease: 'power2.out',
          onStart: () => gsap.set(ctaBar, { pointerEvents: 'auto' })
        },
        baseTime + 0.648
      );
    }
    if (beatCaptions[2] && geo2.captionVisible) {
      tl.to(beatCaptions[2], { opacity: 1, y: 0, duration: 0.035 }, baseTime + 0.630);
    }
    if (photoInners[2]) {
      tl.to(
        photoInners[2],
        {
          scale: 1 + (m2.scaleEnd - 1) * mobileFactor,
          x: m2.panX * mobileFactor,
          y: m2.panY * mobileFactor,
          duration: 0.24,
          ease: 'none'
        },
        baseTime + 0.615
      );
    }
    if (beatRailFills[2]) {
      tl.to(beatRailFills[2], { scaleX: 1, duration: 0.205, ease: 'none' }, baseTime + 0.615);
    }

    // -----------------------------------------------------------------------
    // STATE C — EDITORIAL EXIT & FULL-SCREEN EXPANSION (0.820 to 0.935)
    // -----------------------------------------------------------------------
    if (ctaBar) {
      tl.to(
        ctaBar,
        {
          opacity: 0,
          y: 6,
          duration: 0.03,
          ease: 'power2.in',
          onComplete: () => gsap.set(ctaBar, { pointerEvents: 'none' })
        },
        baseTime + 0.815
      );
    }
    if (beats[2]) {
      tl.to(
        beats[2],
        {
          opacity: 0,
          y: -8,
          duration: 0.032,
          ease: 'power2.in',
          onComplete: () => gsap.set(beats[2], { pointerEvents: 'none' })
        },
        baseTime + 0.825
      );
    }
    if (beatCaptions[2]) {
      tl.to(beatCaptions[2], { opacity: 0, duration: 0.025 }, baseTime + 0.825);
    }
    tl.to(
      editorialSurface,
      {
        opacity: 0,
        y: isMobile ? 12 : -8,
        duration: 0.04,
        ease: 'power2.in',
        onComplete: () => gsap.set(editorialSurface, { pointerEvents: 'none' })
      },
      baseTime + 0.850
    );

    if (beatScrims[2]) {
      tl.to(beatScrims[2], { opacity: 0.2, duration: 0.055 }, baseTime + 0.855);
    }

    tl.to(
      photoFrame,
      {
        top: '0%',
        left: '0%',
        width: '100%',
        height: '100%',
        borderRadius: '0px',
        duration: 0.065,
        ease: 'power2.inOut'
      },
      baseTime + 0.865
    );

    // -----------------------------------------------------------------------
    // CHAPTER CROSSFADE (0.935 to 1.000)
    // -----------------------------------------------------------------------
    if (i < totalChapters - 1) {
      tl.to(
        stage,
        {
          opacity: 0,
          duration: 0.065,
          ease: 'power2.inOut',
          onComplete: () => gsap.set(stage, { pointerEvents: 'none', zIndex: 1 })
        },
        baseTime + 0.935
      );
    } else if (photoInners[2]) {
      tl.to(
        photoInners[2],
        {
          scale: 1 + (m2.scaleEnd - 1 + 0.01) * mobileFactor,
          duration: 0.065,
          ease: 'none'
        },
        baseTime + 0.935
      );
    }
  });
}
