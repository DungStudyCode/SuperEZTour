import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { getLenis } from '../../../motion/LenisManager';
import { HANOI_HERO_ACTS, HANOI_HERO_UI } from './hanoiHeroManifest';
import { buildHanoiHeroTimeline } from './buildHanoiHeroTimeline';
import './HanoiAwakeningHero.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * SUPER EZ TOUR — HANOI SCREEN 1 V4.1
 * GRAND CINEMATIC OPENING — "HANOI — THE CITY AWAKENS"
 *
 * Four-Act Scroll-Driven Photographic Journey:
 *  - Act 01 (0–20%  | act-awakening):   Silence — Dawn Mist & Aperture Opening Reveal
 *  - Act 02 (20–45% | act-reveal):      Wonder — Tháp Rùa Architectural Clarity
 *  - Act 03 (45–75% | act-journey):     Discovery — Lakeside Canopy & Morning Rhythm
 *  - Act 04 (75–100%| act-enter-hanoi): Invitation — Directional Wipe into Old Quarter
 *
 * Six Signature Cinematic Effects:
 *  1. Cinematic Opening Aperture & Layered Line Reveal
 *  2. Real Multi-Plane Depth Parallax (Willow Canopy + Morning Lake Mist + Lake Photos)
 *  3. Controlled Camera Push & Matched Framing
 *  4. Kinetic Masked Editorial Typography (Zero blur, stationary reading holds)
 *  5. Signature Directional Wipe & Morning Mist Handoff to Screen 2
 *  6. Zero WebGL Overhead & Progressive Responsive Image Loading
 */
const HanoiAwakeningHero = ({ onExploreClick }) => {
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

  const { isKorean } = useLanguage();

  // =========================================================================
  // 1. LAYERED ENTRANCE ANIMATION ON INITIAL MOUNT (Effect 1 & Effect 4)
  // Displays image immediately without fake loading screen, expands aperture
  // gently and reveals Act 01 headline lines with crisp kinetic masking.
  // =========================================================================
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const openingLines = (actLineRefs.current[0] || []).filter(Boolean);
      const openingBody = actBodyRefs.current[0];

      if (openingLines.length > 0) {
        gsap.fromTo(
          openingLines,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.95, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
        );
      }
      if (openingBody) {
        gsap.fromTo(
          openingBody,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', delay: 0.32 }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // =========================================================================
  // 2. PROGRESSIVE ASSET PRELOADING (Phase 11)
  // Asset A loads eagerly with fetchPriority="high"; Asset B preloads at 160ms;
  // Assets C & D preload at 450ms so scroll transitions never block LCP.
  // =========================================================================
  useEffect(() => {
    const isSmallViewport =
      typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

    const timerB = setTimeout(() => {
      const actB = HANOI_HERO_ACTS[1];
      if (actB) {
        const img = new Image();
        img.src = isSmallViewport ? actB.mobileSrc : actB.desktopSrc;
      }
    }, 160);

    const timerCD = setTimeout(() => {
      HANOI_HERO_ACTS.slice(2).forEach((item) => {
        const img = new Image();
        img.src = isSmallViewport ? item.mobileSrc : item.desktopSrc;
      });
    }, 450);

    return () => {
      clearTimeout(timerB);
      clearTimeout(timerCD);
    };
  }, []);

  // =========================================================================
  // 3. MASTER GSAP SCROLLTRIGGER & 4-ACT TIMELINE
  // =========================================================================
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
      // DESKTOP & TABLET LANDSCAPE (min-width: 769px)
      mm.add('(min-width: 769px)', () => {
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

      // MOBILE PORTRAIT (max-width: 768px)
      mm.add('(max-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'hanoiAwakeningHeroTrigger',
            trigger: container,
            start: 'top top',
            end: '+=260%',
            pin: true,
            scrub: 1.0,
            anticipatePin: 1
          }
        });

        timelineRef.current = tl;
        buildHanoiHeroTimeline(tl, refs, true);
      });
    }, container);

    return () => {
      timelineRef.current = null;
      mm.revert();
      ctx.revert();
    };
  }, []);

  // =========================================================================
  // 4. NAVIGATION HANDLERS (Jump to Act or Enter Screen 2 Old Quarter)
  // =========================================================================
  const handleJumpToAct = useCallback((actIndex) => {
    const st = ScrollTrigger.getById('hanoiAwakeningHeroTrigger');
    const act = HANOI_HERO_ACTS[actIndex];
    if (!st || !act) return;

    const targetY = st.start + act.scrollTarget * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.1 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, []);

  const handleScrollToOldQuarter = useCallback(() => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const lenis = getLenis();
    const nextSection = document.getElementById('scene-old-quarter');
    if (lenis && nextSection) {
      lenis.scrollTo(nextSection, { offset: 0, duration: 1.35 });
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
          {HANOI_HERO_ACTS.map((act, idx) => (
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
                  <source
                    media="(max-width: 768px)"
                    srcSet={act.mobileSrc}
                    type="image/webp"
                  />
                  <img
                    src={act.desktopSrc}
                    alt={isKorean ? act.alt.ko : act.alt.vi}
                    className="hero-photo-img"
                    width="2560"
                    height="1706"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                    decoding={idx === 0 ? 'sync' : 'async'}
                    style={{
                      '--hero-focal-desktop': act.focalPointDesktop,
                      '--hero-focal-mobile': act.focalPointMobile
                    }}
                    onError={(e) => {
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
          ))}

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

                  {/* Contextual CTAs only in Act 01 (Opening) and Act 04 (Invitation) */}
                  {(idx === 0 || idx === 3) && (
                    <div className="hero-actions-row">
                      <button
                        type="button"
                        className="hero-btn-primary"
                        onClick={handleScrollToOldQuarter}
                      >
                        <span>
                          {isKorean ? HANOI_HERO_UI.primaryCta.ko : HANOI_HERO_UI.primaryCta.vi}
                        </span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>

                      {idx === 0 && (
                        <button
                          type="button"
                          className="hero-btn-secondary"
                          onClick={() => handleJumpToAct(1)}
                        >
                          {isKorean ? HANOI_HERO_UI.secondaryCta.ko : HANOI_HERO_UI.secondaryCta.vi}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Act Editorial Progress Rail */}
        <nav className="hero-act-rail" aria-label="Opening narrative acts">
          {HANOI_HERO_ACTS.map((act, idx) => (
            <button
              key={act.id}
              type="button"
              className="hero-rail-item"
              onClick={() => handleJumpToAct(idx)}
              ref={(el) => {
                actRailItemRefs.current[idx] = el;
              }}
            >
              <span className="hero-rail-label">
                {act.actNumber} — {isKorean ? act.actTitle.ko : act.actTitle.vi}
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
          ))}
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
