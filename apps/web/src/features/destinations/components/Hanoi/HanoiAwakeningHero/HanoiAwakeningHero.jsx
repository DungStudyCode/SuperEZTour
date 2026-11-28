import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useConsultation } from '../../../../../context/ConsultationContext';
import { getLenis } from '../../../../../utils/lenisManager';
import { HANOI_HERO_ACTS, HANOI_HERO_UI } from './hanoiHeroManifest';
import { buildHanoiHeroTimeline } from './buildHanoiHeroTimeline';
import './HanoiAwakeningHero.css';

gsap.registerPlugin(ScrollTrigger);

const TRANSPARENT_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/**
 * SUPER EZ TOUR — HANOI SCREEN 1 V4.2
 * CONVERSION-FIRST CINEMATIC HERO — "YOUR JOURNEY. YOUR HANOI."
 *
 * Four-Act Scroll-Driven Photographic Journey:
 *  - Act 01 (0–20%  | act-awakening):   Conversion-First Private Tour Proposition & Dawn over Hoàn Kiếm
 *  - Act 02 (20–45% | act-reveal):      Wonder — Tháp Rùa Architectural Clarity
 *  - Act 03 (45–75% | act-journey):     Discovery — Lakeside Canopy & Morning Rhythm
 *  - Act 04 (75–100%| act-enter-hanoi): Invitation — Directional Wipe into Old Quarter (#scene-old-quarter)
 */
const HanoiAwakeningHero = ({ onExploreClick, onOpenConsultModal }) => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const apertureFrameRef = useRef(null);

  const photoLayerRefs = useRef([]);
  const photoInnerRefs = useRef([]);
  const willowFgRef = useRef(null);
  const mistMidRef = useRef(null);

  const actBlockRefs = useRef([]);
  const actLineRefs = useRef([[], [], [], []]);
  const actBodyRefs = useRef([]);
  const actRailItemRefs = useRef([]);
  const actRailFillRefs = useRef([]);

  const scrollCueRef = useRef(null);
  const transitionFogRef = useRef(null);

  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
  );
  const [act02Unlocked, setAct02Unlocked] = useState(false);
  const [lateActsUnlocked, setLateActsUnlocked] = useState(false);
  const lateActsPreloadedRef = useRef(false);

  const { isKorean, language } = useLanguage();
  const { openNewConsultation } = useConsultation();

  // =========================================================================
  // 1. PROGRESSIVE ASSET PRELOADING (Section 31)
  // Act 01 loads eagerly with fetchpriority="high" (strictly mobile asset on <=768px).
  // Act 02 unlocks & preloads shortly after Act 01 (260ms) so the first transition is ready.
  // Acts 03 & 04 defer until first meaningful scroll interaction or Act Rail click.
  // =========================================================================
  const unlockAndPreloadLateActs = useCallback(() => {
    setAct02Unlocked(true);
    setLateActsUnlocked(true);
    if (lateActsPreloadedRef.current || typeof window === 'undefined') return;
    lateActsPreloadedRef.current = true;

    const isSmallViewport = window.matchMedia('(max-width: 768px)').matches;
    HANOI_HERO_ACTS.slice(1).forEach((item) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = isSmallViewport ? item.mobileSrc : item.desktopSrc;
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mql = window.matchMedia('(max-width: 768px)');
    const handleViewportChange = (e) => {
      setIsMobileViewport(e.matches);
    };
    setIsMobileViewport(mql.matches);
    if (mql.addEventListener) {
      mql.addEventListener('change', handleViewportChange);
    }

    const timerB = setTimeout(() => {
      setAct02Unlocked(true);
      const actB = HANOI_HERO_ACTS[1];
      if (actB) {
        const isSmall = window.matchMedia('(max-width: 768px)').matches;
        const img = new Image();
        img.decoding = 'async';
        img.src = isSmall ? actB.mobileSrc : actB.desktopSrc;
      }
    }, 260);

    const handleFirstScrollIntent = () => {
      unlockAndPreloadLateActs();
    };

    if (window.scrollY > 4) {
      unlockAndPreloadLateActs();
    } else {
      window.addEventListener('scroll', handleFirstScrollIntent, { passive: true, once: true });
      window.addEventListener('wheel', handleFirstScrollIntent, { passive: true, once: true });
      window.addEventListener('touchmove', handleFirstScrollIntent, { passive: true, once: true });
    }

    return () => {
      clearTimeout(timerB);
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleViewportChange);
      }
      window.removeEventListener('scroll', handleFirstScrollIntent);
      window.removeEventListener('wheel', handleFirstScrollIntent);
      window.removeEventListener('touchmove', handleFirstScrollIntent);
    };
  }, [unlockAndPreloadLateActs]);

  // =========================================================================
  // 2. MASTER GSAP SCROLLTRIGGER, 4-ACT TIMELINE & REDUCED-MOTION BRANCH
  // Single animation owner for all transform/opacity properties.
  // =========================================================================
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const refs = {
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
    };

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // DESKTOP & TABLET LANDSCAPE (min-width: 769px, normal motion)
      mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'hanoiAwakeningHeroTrigger',
            trigger: container,
            start: 'top top',
            end: '+=320%',
            pin: true,
            scrub: 1.15,
            anticipatePin: 1
          }
        });

        timelineRef.current = tl;
        buildHanoiHeroTimeline(tl, refs, false);
      });

      // MOBILE PORTRAIT (max-width: 768px, normal motion — target pin +=150%)
      mm.add('(max-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'hanoiAwakeningHeroTrigger',
            trigger: container,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 0.85,
            anticipatePin: 1
          }
        });

        timelineRef.current = tl;
        buildHanoiHeroTimeline(tl, refs, true);
      });

      // REDUCED MOTION BRANCH (prefers-reduced-motion: reduce — unpinned static Hero)
      mm.add('(prefers-reduced-motion: reduce)', () => {
        timelineRef.current = null;

        if (apertureFrameRef.current) {
          gsap.set(apertureFrameRef.current, { clipPath: 'none' });
        }

        (photoLayerRefs.current || []).forEach((layerEl, idx) => {
          if (!layerEl) return;
          gsap.set(layerEl, {
            opacity: idx === 0 ? 1 : 0,
            zIndex: idx + 1,
            clipPath: 'none'
          });
        });

        (photoInnerRefs.current || []).forEach((innerEl) => {
          if (innerEl) {
            gsap.set(innerEl, { scale: 1, x: 0, y: 0 });
          }
        });

        if (willowFgRef.current) {
          gsap.set(willowFgRef.current, { opacity: 0.65, x: 0, y: 0, scale: 1 });
        }
        if (mistMidRef.current) {
          gsap.set(mistMidRef.current, { opacity: 0.32, x: 0, xPercent: 0, y: 0 });
        }

        (actBlockRefs.current || []).forEach((blockEl, idx) => {
          if (!blockEl) return;
          const isFirst = idx === 0;
          gsap.set(blockEl, {
            autoAlpha: isFirst ? 1 : 0,
            y: 0,
            pointerEvents: isFirst ? 'auto' : 'none'
          });
          blockEl.setAttribute('aria-hidden', isFirst ? 'false' : 'true');
          if ('inert' in blockEl) {
            blockEl.inert = !isFirst;
          }

          const lines = actLineRefs.current[idx] || [];
          lines.forEach((lineEl) => {
            if (lineEl) {
              gsap.set(lineEl, { y: 0, yPercent: 0, opacity: 1, visibility: 'visible' });
            }
          });

          if (actBodyRefs.current[idx]) {
            gsap.set(actBodyRefs.current[idx], {
              autoAlpha: isFirst ? 1 : 0,
              y: 0
            });
          }
        });

        (actRailItemRefs.current || []).forEach((itemEl, idx) => {
          if (itemEl) gsap.set(itemEl, { opacity: idx === 0 ? 1 : 0.52 });
        });
        (actRailFillRefs.current || []).forEach((fillEl, idx) => {
          if (fillEl) gsap.set(fillEl, { scaleX: idx === 0 ? 1 : 0, transformOrigin: 'left center' });
        });
      });
    }, container);

    return () => {
      timelineRef.current = null;
      mm.revert();
      ctx.revert();
    };
  }, []);

  // Ensure kinetic lines keep zero pixel offset when language toggles
  useEffect(() => {
    const st = ScrollTrigger.getById('hanoiAwakeningHeroTrigger');
    if (!st || st.progress <= 0.05) {
      const openingLines = (actLineRefs.current[0] || []).filter(Boolean);
      if (openingLines.length > 0) {
        gsap.set(openingLines, { y: 0, yPercent: 0, opacity: 1, visibility: 'visible' });
      }
      if (actBodyRefs.current[0]) {
        gsap.set(actBodyRefs.current[0], { autoAlpha: 1, y: 0 });
      }
      if (actBlockRefs.current[0]) {
        gsap.set(actBlockRefs.current[0], { autoAlpha: 1, y: 0, pointerEvents: 'auto' });
        actBlockRefs.current[0].setAttribute('aria-hidden', 'false');
        if ('inert' in actBlockRefs.current[0]) {
          actBlockRefs.current[0].inert = false;
        }
      }
    }
  }, [language]);

  // =========================================================================
  // 3. CONVERSION & NAVIGATION HANDLERS (Sections 16, 18, 19)
  // =========================================================================

  // Primary CTA -> Opens existing QuoteModal with flexible duration for Hanoi
  const handleRequestConsultation = useCallback(() => {
    const openModal =
      typeof onOpenConsultModal === 'function' ? onOpenConsultModal : openNewConsultation;
    if (typeof openModal === 'function') {
      openModal({
        destinationId: 'ha-noi',
        source: 'hero',
        duration: 'flexible'
      });
    }
  }, [onOpenConsultModal, openNewConsultation]);

  // Secondary CTA -> Direct jump to Screen 7 (#itinerary — 3D2N Sample Tour)
  const handleViewSampleItinerary = useCallback(() => {
    const target = document.getElementById('itinerary');
    if (!target) return;

    const lenis = getLenis();
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.resize();
      lenis.scrollTo(target, {
        offset: 0,
        immediate: true
      });
    } else {
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'auto' });
    }

    ScrollTrigger.update();

    // Verify exact post-pin landing alignment on next animation frame
    requestAnimationFrame(() => {
      const el = document.getElementById('itinerary');
      if (!el) return;
      const delta = el.getBoundingClientRect().top;
      if (Math.abs(delta) > 4) {
        const currentLenis = getLenis();
        if (currentLenis && typeof currentLenis.scrollTo === 'function') {
          currentLenis.scrollTo(el, { offset: 0, immediate: true });
        } else {
          window.scrollTo({
            top: Math.max(0, window.scrollY + delta),
            behavior: 'auto'
          });
        }
        ScrollTrigger.update();
      }
    });
  }, []);

  // Act Rail Jump (supports both pinned ScrollTrigger mode and static reduced-motion mode)
  const handleJumpToAct = useCallback(
    (actIndex) => {
      unlockAndPreloadLateActs();
      const act = HANOI_HERO_ACTS[actIndex];
      if (!act) return;

      const st = ScrollTrigger.getById('hanoiAwakeningHeroTrigger');
      if (!st) {
        // Reduced-motion static act switch fallback
        (photoLayerRefs.current || []).forEach((layerEl, idx) => {
          if (layerEl) {
            gsap.set(layerEl, { opacity: idx === actIndex ? 1 : 0, clipPath: 'none' });
          }
        });
        (actBlockRefs.current || []).forEach((blockEl, idx) => {
          if (!blockEl) return;
          const isActive = idx === actIndex;
          gsap.set(blockEl, {
            autoAlpha: isActive ? 1 : 0,
            y: 0,
            pointerEvents: isActive ? 'auto' : 'none'
          });
          blockEl.setAttribute('aria-hidden', isActive ? 'false' : 'true');
          if ('inert' in blockEl) {
            blockEl.inert = !isActive;
          }
          (actLineRefs.current[idx] || []).forEach((lineEl) => {
            if (lineEl) gsap.set(lineEl, { y: 0, yPercent: 0, opacity: 1, visibility: 'visible' });
          });
          if (actBodyRefs.current[idx]) {
            gsap.set(actBodyRefs.current[idx], { autoAlpha: isActive ? 1 : 0, y: 0 });
          }
        });
        (actRailItemRefs.current || []).forEach((itemEl, idx) => {
          if (itemEl) gsap.set(itemEl, { opacity: idx === actIndex ? 1 : 0.52 });
        });
        (actRailFillRefs.current || []).forEach((fillEl, idx) => {
          if (fillEl) gsap.set(fillEl, { scaleX: idx <= actIndex ? 1 : 0 });
        });
        return;
      }

      const targetY = st.start + act.scrollTarget * (st.end - st.start);
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(targetY, { duration: 1.05 });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    },
    [unlockAndPreloadLateActs]
  );

  // Act 04 Storytelling Handoff CTA -> Screen 2 (#scene-old-quarter)
  const handleScrollToOldQuarter = useCallback(() => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const lenis = getLenis();
    const nextSection = document.getElementById('scene-old-quarter');
    if (lenis && nextSection) {
      lenis.scrollTo(nextSection, { offset: 0, duration: 1.25 });
    } else if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, [onExploreClick]);

  return (
    <section
      ref={containerRef}
      className="hanoi-awakening-hero"
      id="hanoi-hero"
      aria-label={isKorean ? '하노이 호안끼엠 호수 그랜드 시네마틱 오프닝' : 'Mở màn Điện ảnh Hồ Hoàn Kiếm Hà Nội'}
    >
      {/* ===================================================================
          1. CINEMATIC APERTURE & 4-ACT PHOTOGRAPHIC STAGE
          =================================================================== */}
      <div ref={apertureFrameRef} className="hanoi-hero-aperture-frame">
        <div className="hanoi-hero-photo-stage">
          {HANOI_HERO_ACTS.map((act, idx) => {
            const shouldLoadAsset =
              idx === 0 || (idx === 1 && act02Unlocked) || lateActsUnlocked;
            const activeSrc = isMobileViewport ? act.mobileSrc : act.desktopSrc;
            return (
              <div
                key={act.id}
                className={`hero-photo-layer hero-photo-layer-${idx}`}
                ref={(el) => {
                  photoLayerRefs.current[idx] = el;
                }}
              >
                <div
                  className="hero-photo-inner"
                  ref={(el) => {
                    photoInnerRefs.current[idx] = el;
                  }}
                >
                  <picture>
                    {shouldLoadAsset && (
                      <>
                        <source
                          media="(max-width: 768px)"
                          srcSet={act.mobileSrc}
                          type="image/webp"
                        />
                        <source
                          media="(min-width: 769px)"
                          srcSet={act.desktopSrc}
                          type="image/webp"
                        />
                      </>
                    )}
                    <img
                      src={shouldLoadAsset ? activeSrc : TRANSPARENT_PIXEL}
                      alt={isKorean ? act.alt.ko : act.alt.vi}
                      className="hero-photo-img"
                      width="2560"
                      height="1706"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      fetchpriority={idx === 0 ? 'high' : 'auto'}
                      decoding={idx === 0 ? 'sync' : 'async'}
                      style={{
                        '--hero-focal-desktop': act.focalPointDesktop,
                        '--hero-focal-mobile': act.focalPointMobile
                      }}
                      onError={(e) => {
                        if (!shouldLoadAsset) return;
                        const isSmall =
                          typeof window !== 'undefined' && window.innerWidth <= 768;
                        const fb = isSmall ? act.fallbackMobileSrc : act.fallbackDesktopSrc;
                        if (fb && e.currentTarget.src !== fb) {
                          e.currentTarget.src = fb;
                        }
                      }}
                    />
                  </picture>
                </div>

                {/* Localized Directional Scrim — Shades Text Zone While Keeping Tháp Rùa Clear */}
                <div
                  className="hero-localized-scrim"
                  style={{ background: act.scrimGradient }}
                  aria-hidden="true"
                />

                {/* Discreet License Attribution */}
                <span className="hero-photo-credit">{act.credits}</span>
              </div>
            );
          })}

          {/* SIGNATURE EFFECT 2: REAL MULTI-PLANE DEPTH PARALLAX OVERLAYS */}
          <img
            ref={mistMidRef}
            src="/assets/destinations/hanoi/hoan_kiem_mist.webp"
            alt=""
            aria-hidden="true"
            className="hero-parallax-mist"
            loading="eager"
            decoding="async"
          />

          <img
            ref={willowFgRef}
            src="/assets/destinations/hanoi/hoan_kiem_willow_fg.webp"
            alt=""
            aria-hidden="true"
            className="hero-parallax-willow"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* ===================================================================
          2. KINETIC EDITORIAL TYPOGRAPHY STAGE (4 Narrative Acts)
          Separated from image transform layers for subpixel clarity
          =================================================================== */}
      <div className="hanoi-hero-editorial-stage">
        {/* 4-Act Story Stage */}
        <div className="hero-acts-container">
          {HANOI_HERO_ACTS.map((act, idx) => {
            const lines = isKorean ? act.headlineLines.ko : act.headlineLines.vi;
            const HeadingTag = idx === 0 ? 'h1' : 'h2';

            return (
              <div
                key={act.id}
                className={`hero-act-block hero-act-block-${idx}`}
                aria-hidden={idx === 0 ? 'false' : 'true'}
                ref={(el) => {
                  actBlockRefs.current[idx] = el;
                }}
              >
                <p className="hero-eyebrow">
                  {isKorean ? act.eyebrow.ko : act.eyebrow.vi}
                </p>

                <HeadingTag className={`hero-headline ${idx > 0 ? 'hero-headline-act' : ''}`}>
                  {lines.map((lineText, lineIdx) => (
                    <span key={lineIdx} className="hero-kinetic-mask">
                      <span
                        className="hero-kinetic-line"
                        ref={(el) => {
                          if (!actLineRefs.current[idx]) actLineRefs.current[idx] = [];
                          actLineRefs.current[idx][lineIdx] = el;
                        }}
                      >
                        {lineText}
                      </span>
                    </span>
                  ))}
                </HeadingTag>

                <div
                  className="hero-act-body-group"
                  ref={(el) => {
                    actBodyRefs.current[idx] = el;
                  }}
                >
                  <p className="hero-lead">
                    {isKorean ? act.body.ko : act.body.vi}
                  </p>

                  {/* Act 01: Primary Consultation CTA + Secondary 3D2N Sample Itinerary CTA */}
                  {idx === 0 && (
                    <div className="hero-actions-row">
                      <button
                        type="button"
                        className="hero-btn-primary"
                        onClick={handleRequestConsultation}
                      >
                        <span>
                          {isKorean ? HANOI_HERO_UI.primaryCta.ko : HANOI_HERO_UI.primaryCta.vi}
                        </span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        className="hero-btn-secondary"
                        onClick={handleViewSampleItinerary}
                      >
                        <span>
                          {isKorean ? HANOI_HERO_UI.secondaryCta.ko : HANOI_HERO_UI.secondaryCta.vi}
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Act 04: Storytelling Handoff CTA into Screen 2 (#scene-old-quarter) */}
                  {idx === 3 && (
                    <div className="hero-actions-row">
                      <button
                        type="button"
                        className="hero-btn-primary hero-btn-act04"
                        onClick={handleScrollToOldQuarter}
                      >
                        <span>
                          {isKorean
                            ? HANOI_HERO_UI.enterOldQuarterCta.ko
                            : HANOI_HERO_UI.enterOldQuarterCta.vi}
                        </span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Act Editorial Progress Rail */}
        <nav
          className="hero-act-rail"
          aria-label={isKorean ? '오프닝 내러티브 액트' : 'Các chương mở màn Hồ Gươm'}
        >
          {HANOI_HERO_ACTS.map((act, idx) => {
            const actTitleText = isKorean ? act.actTitle.ko : act.actTitle.vi;
            return (
              <button
                key={act.id}
                type="button"
                className="hero-rail-item"
                aria-label={`${act.actNumber} — ${actTitleText}`}
                onClick={() => handleJumpToAct(idx)}
                ref={(el) => {
                  actRailItemRefs.current[idx] = el;
                }}
              >
                <span className="hero-rail-label">
                  <span className="hero-rail-num">{act.actNumber}</span>
                  <span className="hero-rail-sep" aria-hidden="true">
                    {' '}
                    —{' '}
                  </span>
                  <span className="hero-rail-title">{actTitleText}</span>
                </span>
                <span className="hero-rail-track" aria-hidden="true">
                  <span
                    className="hero-rail-fill"
                    ref={(el) => {
                      actRailFillRefs.current[idx] = el;
                    }}
                  />
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ===================================================================
          3. MINIMAL SCROLL INDICATOR
          =================================================================== */}
      <button
        ref={scrollCueRef}
        type="button"
        className="hanoi-hero-scroll-cue"
        onClick={() => handleJumpToAct(1)}
        aria-label={isKorean ? HANOI_HERO_UI.scrollCue.ko : HANOI_HERO_UI.scrollCue.vi}
      >
        <span className="scroll-cue-label">
          {isKorean ? HANOI_HERO_UI.scrollCue.ko : HANOI_HERO_UI.scrollCue.vi}
        </span>
        <ChevronDown size={15} className="scroll-cue-chevron" aria-hidden="true" />
      </button>

      {/* ===================================================================
          4. SUBTLE MORNING MIST HANDOFF BRIDGE INTO SCREEN 2
          =================================================================== */}
      <div
        ref={transitionFogRef}
        className="hanoi-hero-transition-fog"
        aria-hidden="true"
      />
    </section>
  );
};

export default HanoiAwakeningHero;
