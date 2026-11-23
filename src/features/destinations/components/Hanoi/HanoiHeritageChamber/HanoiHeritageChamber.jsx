import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Plus, Check } from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useTripBuilder } from '../../../context/TripBuilderContext';
import { getLenis } from '../../../motion/LenisManager';
import { HERITAGE_SCRIM_GRADIENTS } from './heritageAssets';
import {
  HERITAGE_OPENING_ACT,
  HERITAGE_DOCUMENTARY_ACTS,
  HERITAGE_DOCUMENTARY_ENDING
} from './heritageScenes';
import {
  buildHeritageDocumentaryTimeline,
  resolveHeritageProgressState,
  HERITAGE_CHAPTER_WINDOWS
} from './buildHeritageDocumentaryTimeline';
import HeritageDetailModal from './HeritageDetailModal';
import './HanoiHeritageChamber.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * SUPER EZ TOUR — HANOI SCREEN 3 V4.1
 * GRAND HERITAGE DOCUMENTARY (VĂN MIẾU – QUỐC TỬ GIÁM)
 *
 * V4.1 Cinematic Refinement & Visual Quality Upgrade:
 *  - Staged 5-Beat Scroll Rhythm per Chapter:
 *    Visual Establish -> Headline Reveal -> Story Reveal -> Reading Hold -> Transition
 *  - Verified monument-specific photography (Chapter 03 uses only real Doctor Stelae & stone tortoises)
 *  - Natural heritage color grading with localized text-zone scrims
 *  - Single discreet secondary CTA per chapter (zero duplicated buttons in DOM)
 *  - Compact 01 ━━━ 02 ━━━ 03 progress indicator reading directly from timeline labels
 *  - Dedicated Documentary Ending ("Một nghìn năm, một truyền thống hiếu học.") + TripBuilder CTA
 */
const HanoiHeritageChamber = () => {
  const containerRef = useRef(null);
  const apertureFrameRef = useRef(null);
  const entryVeilRef = useRef(null);
  const exitBridgeRef = useRef(null);
  const timelineRef = useRef(null);

  // Opening refs
  const openingStageRef = useRef(null);
  const openingPhotoInnerRef = useRef(null);
  const openingScrimRef = useRef(null);
  const openingTagRef = useRef(null);
  const openingHeadlineRef = useRef(null);
  const openingIntroRef = useRef(null);

  // Chapters 01..03 refs
  const chapterStageRefs = useRef([]);
  const establishLayerRefs = useRef([]);
  const establishInnerRefs = useRef([]);
  const establishScrimRefs = useRef([]);
  const detailLayerRefs = useRef([]);
  const detailInnerRefs = useRef([]);
  const detailScrimRefs = useRef([]);
  const editorialContainerRefs = useRef([]);
  const chapterMarkerRefs = useRef([]);
  const chapterHeadlineRefs = useRef([]);
  const storyEstablishRefs = useRef([]);
  const storyDetailRefs = useRef([]);
  const detailCtaRefs = useRef([]);

  // Compact Progress Indicator refs
  const progressNavRef = useRef(null);
  const progressFillRefs = useRef([]);

  // Documentary Ending refs
  const endingStageRef = useRef(null);
  const endingPhotoInnerRef = useRef(null);
  const endingScrimRef = useRef(null);
  const endingContentRef = useRef(null);
  const endingQuoteRef = useRef(null);
  const endingCtaRef = useRef(null);

  // Active state: 0 = Opening, 1..3 = Chapters 01..03, 4 = Documentary Ending
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeModalActId, setActiveModalActId] = useState(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const { isKorean } = useLanguage();
  const { tripState, toggleAttraction } = useTripBuilder();

  const isAddedToTrip = Boolean(
    tripState?.selectedAttractions?.includes('van-mieu')
  );

  const handleToggleTripCart = useCallback(() => {
    toggleAttraction('van-mieu');
  }, [toggleAttraction]);

  const activeModalAct =
    HERITAGE_DOCUMENTARY_ACTS.find((a) => a.id === activeModalActId) || null;

  // =========================================================================
  // 1. PROGRESSIVE ASSET PRELOADING & DECODE BEFORE REVEAL
  // =========================================================================
  useEffect(() => {
    const actsToPreload = [];
    if (activeChapterIndex === 0) {
      actsToPreload.push(HERITAGE_DOCUMENTARY_ACTS[0]);
    } else if (activeChapterIndex >= 1 && activeChapterIndex <= 3) {
      const curr = HERITAGE_DOCUMENTARY_ACTS[activeChapterIndex - 1];
      const next = HERITAGE_DOCUMENTARY_ACTS[activeChapterIndex];
      if (curr) actsToPreload.push(curr);
      if (next) actsToPreload.push(next);
    }

    const isMob = typeof window !== 'undefined' && window.innerWidth <= 768;

    actsToPreload.forEach((act) => {
      [act.images?.establishing, act.images?.detail].forEach((asset) => {
        const src = isMob ? asset?.mobileSrc || asset?.src : asset?.src;
        if (src) {
          const img = new Image();
          img.src = src;
          if (typeof img.decode === 'function') {
            img.decode().catch(() => {});
          }
        }
      });
    });

    if (activeChapterIndex >= 2) {
      const endAsset = HERITAGE_DOCUMENTARY_ENDING.asset;
      const endSrc = isMob
        ? endAsset?.mobileSrc || endAsset?.src
        : endAsset?.src;
      if (endSrc) {
        const img = new Image();
        img.src = endSrc;
        if (typeof img.decode === 'function') {
          img.decode().catch(() => {});
        }
      }
    }
  }, [activeChapterIndex]);

  // =========================================================================
  // 2. MASTER GSAP SCROLLTRIGGER & REDUCED MOTION LIFECYCLE
  // =========================================================================
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const refs = {
      apertureFrameRef,
      entryVeilRef,
      exitBridgeRef,
      openingStageRef,
      openingPhotoInnerRef,
      openingScrimRef,
      openingTagRef,
      openingHeadlineRef,
      openingIntroRef,
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
      progressNavRef,
      progressFillRefs,
      endingStageRef,
      endingPhotoInnerRef,
      endingScrimRef,
      endingContentRef,
      endingQuoteRef,
      endingCtaRef
    };

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const handleProgressUpdate = (self) => {
        const resolved = resolveHeritageProgressState(self.progress);
        setActiveChapterIndex((prev) =>
          prev !== resolved.activeChapterIndex
            ? resolved.activeChapterIndex
            : prev
        );
      };

      // A. Desktop & Laptop Documentary Choreography
      mm.add(
        '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
        () => {
          setIsReducedMotion(false);
          setIsMobileViewport(false);
          const tl = gsap.timeline({
            scrollTrigger: {
              id: 'hanoiHeritageMasterTrigger',
              trigger: container,
              start: 'top top',
              end: '+=860%',
              pin: true,
              scrub: 1.35,
              anticipatePin: 1,
              onUpdate: handleProgressUpdate
            }
          });
          timelineRef.current = tl;
          buildHeritageDocumentaryTimeline(tl, refs, false);
        }
      );

      // B. Mobile & Tablet Portrait Documentary Choreography
      mm.add(
        '(max-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          setIsReducedMotion(false);
          setIsMobileViewport(true);
          const tl = gsap.timeline({
            scrollTrigger: {
              id: 'hanoiHeritageMasterTrigger',
              trigger: container,
              start: 'top top',
              end: '+=680%',
              pin: true,
              scrub: 1.15,
              anticipatePin: 1,
              onUpdate: handleProgressUpdate
            }
          });
          timelineRef.current = tl;
          buildHeritageDocumentaryTimeline(tl, refs, true);
        }
      );

      // C. Accessible Reduced-Motion Documentary Flow
      mm.add('(prefers-reduced-motion: reduce)', () => {
        setIsReducedMotion(true);
        setIsMobileViewport(
          typeof window !== 'undefined' && window.innerWidth <= 768
        );
        timelineRef.current = null;
      });
    }, container);

    return () => {
      timelineRef.current = null;
      mm.revert();
      ctx.revert();
    };
  }, []);

  // Controlled ScrollTrigger measurement update after KO/VI toggle without scroll reset
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const st = ScrollTrigger.getById('hanoiHeritageMasterTrigger');
      if (st) {
        st.update();
      }
    });
    return () => cancelAnimationFrame(rafId);
  }, [isKorean]);

  // =========================================================================
  // 3. TIMELINE LABEL-DRIVEN CHAPTER NAVIGATION (01 ━━━ 02 ━━━ 03)
  // =========================================================================
  const handleJumpToChapter = useCallback(
    (chapterNumber) => {
      if (isReducedMotion) {
        const el = document.getElementById(`heritage-chapter-${chapterNumber}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      const st = ScrollTrigger.getById('hanoiHeritageMasterTrigger');
      const tl = timelineRef.current;
      if (!st || !tl) return;

      const win = HERITAGE_CHAPTER_WINDOWS.find(
        (w) => w.chapterNumber === chapterNumber
      );
      if (!win) return;

      // Navigate directly to the chapter's story label read from tl.labels
      const targetLabel = `${win.labelPrefix}-story`;
      const labelTime = tl.labels[targetLabel];
      const totalDur = tl.duration();
      if (typeof labelTime !== 'number' || totalDur <= 0) return;

      const targetProgress = labelTime / totalDur;
      const targetScrollY = st.start + targetProgress * (st.end - st.start);

      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(targetScrollY, { duration: 1.1 });
      } else {
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    },
    [isReducedMotion]
  );

  const openingCopy = isKorean
    ? HERITAGE_OPENING_ACT.content.ko
    : HERITAGE_OPENING_ACT.content.vi;
  const openingAsset = HERITAGE_OPENING_ACT.asset;

  const endingCopy = isKorean
    ? HERITAGE_DOCUMENTARY_ENDING.content.ko
    : HERITAGE_DOCUMENTARY_ENDING.content.vi;
  const endingAsset = HERITAGE_DOCUMENTARY_ENDING.asset;

  return (
    <section
      ref={containerRef}
      id="hanoi-heritage"
      className={`hanoi-heritage-documentary ${
        isReducedMotion ? 'is-reduced-motion' : ''
      }`}
      aria-label={
        isKorean
          ? '문묘와 국자감 헤리티지 다큐멘터리'
          : 'Phim tài liệu Di sản Văn Miếu – Quốc Tử Giám'
      }
    >
      <div ref={apertureFrameRef} className="heritage-documentary-viewport">
        {/* Top Transition Veil from Screen 2 */}
        <div
          ref={entryVeilRef}
          className="heritage-entry-veil"
          aria-hidden="true"
        />

        {/* ===================================================================
            1. DOCUMENTARY OPENING — THE GATEWAY OF KNOWLEDGE (1070 / 1076)
            =================================================================== */}
        <article
          ref={openingStageRef}
          id="heritage-opening-stage"
          className={`heritage-opening-stage ${
            activeChapterIndex === 0 ? 'is-active' : ''
          }`}
        >
          <div className="heritage-photo-canvas">
            <div ref={openingPhotoInnerRef} className="heritage-photo-inner">
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={openingAsset.mobileSrc}
                  type="image/webp"
                />
                <img
                  src={openingAsset.src}
                  alt={isKorean ? openingAsset.altKo : openingAsset.altVi}
                  className="heritage-photo-img"
                  loading="eager"
                  style={{
                    objectPosition: isMobileViewport
                      ? openingAsset.focalPointMobile
                      : openingAsset.focalPointDesktop
                  }}
                />
              </picture>
            </div>
            <div className="heritage-sky-balancer" aria-hidden="true" />
            <div
              ref={openingScrimRef}
              className="heritage-scrim-layer"
              style={{
                background: HERITAGE_SCRIM_GRADIENTS['opening-gateway']
              }}
              aria-hidden="true"
            />
          </div>

          <div className="heritage-opening-editorial">
            <span ref={openingTagRef} className="heritage-location-tag">
              {openingCopy.locationTag}
            </span>

            <div ref={openingHeadlineRef} className="heritage-opening-headline">
              <h2 className="heritage-opening-title">{openingCopy.title}</h2>
              <p className="heritage-opening-subtitle">
                {openingCopy.subtitle}
              </p>
            </div>

            <p ref={openingIntroRef} className="heritage-opening-intro">
              {openingCopy.intro}
            </p>
          </div>
        </article>

        {/* ===================================================================
            2. THREE HERITAGE CHAPTERS (01 KHUÊ VĂN CÁC · 02 THIÊN QUANG TỈNH · 03 82 BIA TIẾN SĨ)
            =================================================================== */}
        {HERITAGE_DOCUMENTARY_ACTS.map((act, idx) => {
          const copy = isKorean ? act.content.ko : act.content.vi;
          const estAsset = act.images.establishing;
          const detAsset = act.images.detail;
          const isChapterActive = activeChapterIndex === idx + 1;

          // Establishing photo has subject on Left -> text on Right
          // Detail photo has subject on Center/Right -> text on Left/Right as configured
          const textSide = act.placement?.establish || 'right';
          const scrimKey =
            textSide === 'left' ? 'left-editorial' : 'right-editorial';

          return (
            <article
              key={act.id}
              id={`heritage-chapter-${idx + 1}`}
              ref={(el) => (chapterStageRefs.current[idx] = el)}
              className={`heritage-chapter-stage heritage-chapter-${idx + 1} ${
                isChapterActive ? 'is-active' : ''
              }`}
              data-chapter-id={act.id}
            >
              {/* A. TWO-BEAT PHOTOGRAPHIC DECK (Establishing -> Detail) */}
              <div className="heritage-act-photo-deck">
                {/* Layer 1: Establishing Photograph */}
                <div
                  ref={(el) => (establishLayerRefs.current[idx] = el)}
                  className="heritage-beat-photo-layer layer-establishing"
                >
                  <div
                    ref={(el) => (establishInnerRefs.current[idx] = el)}
                    className="heritage-photo-inner"
                  >
                    <picture>
                      <source
                        media="(max-width: 768px)"
                        srcSet={estAsset.mobileSrc}
                        type="image/webp"
                      />
                      <img
                        src={estAsset.src}
                        alt={isKorean ? estAsset.altKo : estAsset.altVi}
                        className="heritage-photo-img"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        style={{
                          objectPosition: isMobileViewport
                            ? estAsset.focalPointMobile
                            : estAsset.focalPointDesktop
                        }}
                        onError={(e) => {
                          if (e.currentTarget.src !== openingAsset.src) {
                            e.currentTarget.src = openingAsset.src;
                          }
                        }}
                      />
                    </picture>
                  </div>
                  <div className="heritage-sky-balancer" aria-hidden="true" />
                  <div
                    ref={(el) => (establishScrimRefs.current[idx] = el)}
                    className={`heritage-scrim-layer scrim-${scrimKey}`}
                    style={{
                      background: HERITAGE_SCRIM_GRADIENTS[scrimKey]
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Layer 2: Detail Photograph */}
                <div
                  ref={(el) => (detailLayerRefs.current[idx] = el)}
                  className="heritage-beat-photo-layer layer-detail"
                >
                  <div
                    ref={(el) => (detailInnerRefs.current[idx] = el)}
                    className="heritage-photo-inner"
                  >
                    <picture>
                      <source
                        media="(max-width: 768px)"
                        srcSet={detAsset.mobileSrc}
                        type="image/webp"
                      />
                      <img
                        src={detAsset.src}
                        alt={isKorean ? detAsset.altKo : detAsset.altVi}
                        className="heritage-photo-img"
                        loading="lazy"
                        style={{
                          objectPosition: isMobileViewport
                            ? detAsset.focalPointMobile
                            : detAsset.focalPointDesktop
                        }}
                        onError={(e) => {
                          if (e.currentTarget.src !== estAsset.src) {
                            e.currentTarget.src = estAsset.src;
                          }
                        }}
                      />
                    </picture>
                  </div>
                  <div className="heritage-sky-balancer" aria-hidden="true" />
                  <div
                    ref={(el) => (detailScrimRefs.current[idx] = el)}
                    className={`heritage-scrim-layer scrim-${scrimKey}`}
                    style={{
                      background: HERITAGE_SCRIM_GRADIENTS[scrimKey]
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* B. STAGED DOCUMENTARY TYPOGRAPHY (Marker -> Headline -> Story 1 -> Story 2 + Detail CTA) */}
              <div className="heritage-act-editorial-layer">
                <div
                  ref={(el) => (editorialContainerRefs.current[idx] = el)}
                  className={`heritage-chapter-editorial placement-${textSide} ${
                    isChapterActive || isReducedMotion ? 'is-interactive' : ''
                  }`}
                >
                  {/* Beat A: Quiet Chapter Marker */}
                  <span
                    ref={(el) => (chapterMarkerRefs.current[idx] = el)}
                    className="heritage-chapter-marker"
                  >
                    {copy.chapterMarker}
                  </span>

                  {/* Beat B: Monument Headline & Emotional Subtitle */}
                  <header
                    ref={(el) => (chapterHeadlineRefs.current[idx] = el)}
                    className="heritage-chapter-header"
                  >
                    <h3 className="heritage-chapter-title">{copy.title}</h3>
                    <p className="heritage-chapter-subtitle">{copy.subtitle}</p>
                  </header>

                  {/* Beat C & D: Single-Slot Sequential Story Paragraphs (Never stacked simultaneously in normal scroll) */}
                  <div className="heritage-story-stage">
                    <p
                      ref={(el) => (storyEstablishRefs.current[idx] = el)}
                      className="heritage-story-paragraph story-establish"
                    >
                      {copy.storyEstablish}
                    </p>

                    <p
                      ref={(el) => (storyDetailRefs.current[idx] = el)}
                      className="heritage-story-paragraph story-detail"
                    >
                      {copy.storyDetail}
                    </p>
                  </div>

                  {/* Beat D: Single Discreet Secondary Discovery CTA */}
                  <div
                    ref={(el) => (detailCtaRefs.current[idx] = el)}
                    className="heritage-chapter-cta-wrap"
                  >
                    <button
                      type="button"
                      className="heritage-discovery-link-btn"
                      onClick={() => setActiveModalActId(act.id)}
                    >
                      <BookOpen size={14} />
                      <span>{copy.detailCta}</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {/* ===================================================================
            3. DOCUMENTARY ENDING — THE LEGACY OF KNOWLEDGE
            =================================================================== */}
        <article
          ref={endingStageRef}
          id="heritage-ending-stage"
          className={`heritage-ending-stage ${
            activeChapterIndex === 4 ? 'is-active' : ''
          }`}
        >
          <div className="heritage-photo-canvas">
            <div ref={endingPhotoInnerRef} className="heritage-photo-inner">
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={endingAsset.mobileSrc}
                  type="image/webp"
                />
                <img
                  src={endingAsset.src}
                  alt={isKorean ? endingAsset.altKo : endingAsset.altVi}
                  className="heritage-photo-img"
                  loading="lazy"
                  style={{
                    objectPosition: isMobileViewport
                      ? endingAsset.focalPointMobile
                      : endingAsset.focalPointDesktop
                  }}
                />
              </picture>
            </div>
            <div className="heritage-sky-balancer" aria-hidden="true" />
            <div
              ref={endingScrimRef}
              className="heritage-scrim-layer"
              style={{
                background: HERITAGE_SCRIM_GRADIENTS['ending-legacy']
              }}
              aria-hidden="true"
            />
          </div>

          <div
            ref={endingContentRef}
            className={`heritage-ending-editorial ${
              activeChapterIndex === 4 || isReducedMotion
                ? 'is-interactive'
                : ''
            }`}
          >
            <div ref={endingQuoteRef} className="heritage-ending-quote-wrap">
              <span className="heritage-location-tag">{endingCopy.kicker}</span>
              <blockquote className="heritage-ending-quote">
                “{endingCopy.closingLine}”
              </blockquote>
            </div>

            <div ref={endingCtaRef} className="heritage-ending-cta-wrap">
              <button
                type="button"
                className={`heritage-trip-cta-btn ${
                  isAddedToTrip ? 'is-added' : ''
                }`}
                onClick={handleToggleTripCart}
              >
                {isAddedToTrip ? (
                  <>
                    <Check size={16} />
                    <span>{endingCopy.ctaAdded}</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    <span>{endingCopy.ctaAdd}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </article>

        {/* Bottom Warm Handoff Bridge into Screen 4 (HanoiTaste3D) */}
        <div
          ref={exitBridgeRef}
          className="heritage-exit-bridge"
          aria-hidden="true"
        />

        {/* ===================================================================
            4. COMPACT CHAPTER PROGRESS INDICATOR (01 ━━━ 02 ━━━ 03)
            =================================================================== */}
        <nav
          ref={progressNavRef}
          className={`heritage-compact-progress ${
            activeChapterIndex >= 1 && activeChapterIndex <= 3
              ? 'is-visible'
              : ''
          }`}
          aria-label={
            isKorean
              ? '문묘 다큐멘터리 3장 진행 표시기'
              : 'Chỉ báo tiến trình 3 chương di sản Văn Miếu'
          }
        >
          {HERITAGE_DOCUMENTARY_ACTS.map((act, idx) => {
            const chNum = idx + 1;
            const isCurrent = activeChapterIndex === chNum;
            const isPassed = activeChapterIndex > chNum;
            const chTitle = isKorean
              ? act.content.ko.title
              : act.content.vi.title;

            return (
              <React.Fragment key={act.id}>
                <button
                  type="button"
                  className={`compact-progress-node ${
                    isCurrent ? 'is-active' : isPassed ? 'is-passed' : ''
                  }`}
                  onClick={() => handleJumpToChapter(chNum)}
                  aria-label={`${act.chapterNumber} ${chTitle}`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <span className="progress-node-num">{act.chapterNumber}</span>
                </button>

                <div className="compact-progress-bar" aria-hidden="true">
                  <div
                    ref={(el) => (progressFillRefs.current[idx] = el)}
                    className="compact-progress-fill"
                  />
                </div>
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* =====================================================================
          INTERACTIVE HERITAGE MONOGRAPH MODAL
          ===================================================================== */}
      <HeritageDetailModal
        act={activeModalAct}
        isKorean={isKorean}
        isAddedToTrip={isAddedToTrip}
        onClose={() => setActiveModalActId(null)}
        onToggleTrip={handleToggleTripCart}
      />
    </section>
  );
};

export default HanoiHeritageChamber;
