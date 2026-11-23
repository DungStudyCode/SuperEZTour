import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useTripBuilder } from '../../../context/TripBuilderContext';
import { getLenis } from '../../../motion/LenisManager';
import { OLD_QUARTER_CHAPTERS, TOTAL_CHAPTERS } from './oldQuarterScenes';
import { SCRIM_GRADIENTS } from './editorialLayouts';
import { buildOldQuarterTimeline } from './buildOldQuarterTimeline';
import OldQuarterDetailModal from './OldQuarterDetailModal';
import './HanoiOldQuarterWalk.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * SUPER EZ TOUR — HANOI SCREEN 2: LIVING OLD QUARTER (36 PHỐ PHƯỜNG)
 *
 * Version 3.4.1 — Typography Clarity & Cinematic Readability
 *  - Per-beat localized directional gradient scrims (left-to-right, right-to-left, minimal-caption)
 *  - Standardized High-Clarity Palette (#F8F5EF Headline, #F1F0EC Body, #D9D3C8 Metadata)
 *  - Text-safe focal points (Chapter 04 flower vendor preserved on left, text shaded on right)
 *  - Subpixel-sharp GSAP typography layer separated from image transforms
 */
const HanoiOldQuarterWalk = () => {
  const containerRef = useRef(null);
  const mistRef = useRef(null);
  const timelineRef = useRef(null);

  const stageRefs = useRef([]);
  const photoFrameRefs = useRef([]);
  const establishingScrimRefs = useRef([]);
  const immersiveTitleRefs = useRef([]);
  const editorialSurfaceRefs = useRef([]);
  const ctaBarRefs = useRef([]);

  const beatPhotoLayerRefs = useRef([[], [], [], []]);
  const beatPhotoInnerRefs = useRef([[], [], [], []]);
  const beatScrimRefs = useRef([[], [], [], []]);
  const beatCaptionRefs = useRef([[], [], [], []]);
  const beatRefs = useRef([[], [], [], []]);
  const beatRailItemRefs = useRef([[], [], [], []]);
  const beatRailFillRefs = useRef([[], [], [], []]);

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeModalChapter, setActiveModalChapter] = useState(null);

  const { isKorean } = useLanguage();
  const { tripState, toggleAttraction } = useTripBuilder();

  const activeChapter = OLD_QUARTER_CHAPTERS[activeChapterIndex] || OLD_QUARTER_CHAPTERS[0];

  const isSaved = useCallback(
    (chapterId) => Boolean(tripState?.selectedAttractions?.includes(chapterId)),
    [tripState?.selectedAttractions]
  );

  // =========================================================================
  // 1. PROGRESSIVE ASSET PRELOAD (Previous, Current & Next Chapter)
  // =========================================================================
  useEffect(() => {
    const chaptersToPreload = Array.from(
      new Set([
        Math.max(0, activeChapterIndex - 1),
        activeChapterIndex,
        Math.min(TOTAL_CHAPTERS - 1, activeChapterIndex + 1)
      ])
    );
    chaptersToPreload.forEach((chIdx) => {
      const ch = OLD_QUARTER_CHAPTERS[chIdx];
      if (!ch) return;
      ch.beats.forEach((b) => {
        if (b.image?.src) {
          const img = new Image();
          img.src = b.image.src;
        }
      });
    });
  }, [activeChapterIndex]);

  // =========================================================================
  // 2. MASTER GSAP SCROLLTRIGGER & MODULAR EDITORIAL TIMELINE
  // =========================================================================
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const refs = {
      stageRefs,
      photoFrameRefs,
      establishingScrimRefs,
      immersiveTitleRefs,
      editorialSurfaceRefs,
      ctaBarRefs,
      beatPhotoLayerRefs,
      beatPhotoInnerRefs,
      beatScrimRefs,
      beatCaptionRefs,
      beatRefs,
      beatRailItemRefs,
      beatRailFillRefs
    };

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const handleProgressUpdate = (self) => {
        const p = Number.isFinite(self.progress) ? self.progress : 0;
        const chIdx = Math.min(TOTAL_CHAPTERS - 1, Math.floor(p * TOTAL_CHAPTERS));
        setActiveChapterIndex((prev) => (prev !== chIdx ? chIdx : prev));

        if (mistRef.current) {
          if (p <= 0.05) {
            gsap.set(mistRef.current, { opacity: Math.max(0, (1 - p / 0.05) * 0.14) });
          } else {
            gsap.set(mistRef.current, { opacity: 0 });
          }
        }
      };

      // DESKTOP & TABLET LANDSCAPE (min-width: 769px)
      mm.add('(min-width: 769px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'hanoiOldQuarterMasterTrigger',
            trigger: container,
            start: 'top top',
            end: '+=754%',
            pin: true,
            scrub: 1.25,
            anticipatePin: 1,
            onUpdate: handleProgressUpdate
          }
        });
        timelineRef.current = tl;
        buildOldQuarterTimeline(tl, OLD_QUARTER_CHAPTERS, refs, false);
      });

      // MOBILE PORTRAIT (max-width: 768px)
      mm.add('(max-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'hanoiOldQuarterMasterTrigger',
            trigger: container,
            start: 'top top',
            end: '+=638%',
            pin: true,
            scrub: 1.05,
            anticipatePin: 1,
            onUpdate: handleProgressUpdate
          }
        });
        timelineRef.current = tl;
        buildOldQuarterTimeline(tl, OLD_QUARTER_CHAPTERS, refs, true);
      });
    }, container);

    return () => {
      timelineRef.current = null;
      mm.revert();
      ctx.revert();
    };
  }, []);

  // =========================================================================
  // 3. DYNAMIC GSAP LABEL-BASED NAVIGATION
  // =========================================================================
  const scrollToLabel = useCallback((labelName, fallbackProgress) => {
    const st = ScrollTrigger.getById('hanoiOldQuarterMasterTrigger');
    const tl = timelineRef.current;
    if (!st) return;

    let targetP = fallbackProgress;
    if (tl && tl.duration() > 0) {
      const labelTime = tl.labels[labelName];
      if (typeof labelTime === 'number') {
        targetP = labelTime / tl.duration();
      }
    }

    const targetScrollY = st.start + targetP * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetScrollY, { duration: 1.15 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  }, []);

  const handleJumpToChapter = useCallback(
    (chapterIdx) => {
      scrollToLabel(`chapter-${chapterIdx}-beat-0`, (chapterIdx + 0.185) / TOTAL_CHAPTERS);
    },
    [scrollToLabel]
  );

  const handleJumpToBeat = useCallback(
    (chapterIdx, beatIdx) => {
      const offsets = [0.185, 0.425, 0.665];
      scrollToLabel(
        `chapter-${chapterIdx}-beat-${beatIdx}`,
        (chapterIdx + (offsets[beatIdx] || 0.185)) / TOTAL_CHAPTERS
      );
    },
    [scrollToLabel]
  );

  const handlePrevChapter = () => {
    if (activeChapterIndex > 0) handleJumpToChapter(activeChapterIndex - 1);
  };

  const handleNextChapter = () => {
    if (activeChapterIndex < TOTAL_CHAPTERS - 1) handleJumpToChapter(activeChapterIndex + 1);
  };

  return (
    <section
      ref={containerRef}
      className="hanoi-old-quarter-scene"
      id="scene-old-quarter"
      aria-label={isKorean ? '하노이 구시가지 시네마틱 포토 에디토리얼' : 'Phóng sự ảnh Điện ảnh Phố Cổ Hà Nội'}
    >
      {/* 1. SUBTLE MORNING MIST BRIDGE FROM SCREEN 1 */}
      <div ref={mistRef} className="old-quarter-transition-fog" aria-hidden="true" />

      {/* 2. MASTER EDITORIAL VIEWPORT */}
      <div className="old-quarter-chapters-viewport">
        {OLD_QUARTER_CHAPTERS.map((chapter, idx) => {
          const isItemSaved = isSaved(chapter.id);

          return (
            <article
              key={chapter.id}
              className={`chapter-stage chapter-stage-${idx}`}
              data-chapter-id={chapter.id}
              ref={(el) => (stageRefs.current[idx] = el)}
            >
              {/* =============================================================
                  A. PHOTOGRAPHIC STAGE (Separated from Typography Transforms)
                  ============================================================= */}
              <div
                className="chapter-photo-frame"
                ref={(el) => (photoFrameRefs.current[idx] = el)}
              >
                {chapter.beats.map((beat, bIdx) => {
                  const scrimGradient =
                    SCRIM_GRADIENTS[beat.image.scrimDirection] || SCRIM_GRADIENTS['minimal-caption'];

                  return (
                    <div
                      key={beat.id}
                      className={`beat-photo-layer beat-layer-${bIdx}`}
                      ref={(el) => {
                        if (!beatPhotoLayerRefs.current[idx]) beatPhotoLayerRefs.current[idx] = [];
                        beatPhotoLayerRefs.current[idx][bIdx] = el;
                      }}
                    >
                      <div
                        className="beat-photo-inner"
                        ref={(el) => {
                          if (!beatPhotoInnerRefs.current[idx]) beatPhotoInnerRefs.current[idx] = [];
                          beatPhotoInnerRefs.current[idx][bIdx] = el;
                        }}
                      >
                        <img
                          src={beat.image.src}
                          alt={isKorean ? `${chapter.title.ko} — ${beat.title.ko}` : `${chapter.title.vi} — ${beat.title.vi}`}
                          className="beat-photo-img"
                          loading={idx === 0 && bIdx === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          style={{
                            '--focal-desktop': beat.image.focalPointDesktop || '50% 45%',
                            '--focal-mobile': beat.image.focalPointMobile || '50% 45%'
                          }}
                          onError={(e) => {
                            if (beat.image.fallback && e.currentTarget.src !== beat.image.fallback) {
                              e.currentTarget.src = beat.image.fallback;
                            }
                          }}
                        />
                      </div>

                      {/* Localized Directional Gradient Scrim (Per-Beat Configured) */}
                      <div
                        className={`beat-localized-scrim scrim-${beat.image.scrimDirection || 'minimal-caption'}`}
                        style={{ background: scrimGradient }}
                        ref={(el) => {
                          if (!beatScrimRefs.current[idx]) beatScrimRefs.current[idx] = [];
                          beatScrimRefs.current[idx][bIdx] = el;
                        }}
                        aria-hidden="true"
                      />

                      {/* Minimal Discreet Credit Line */}
                      <span className="photo-credit-line">{beat.image.credits}</span>
                    </div>
                  );
                })}

                {/* Localized Center-Bottom Scrim strictly for State A Opening Title */}
                <div
                  className="chapter-establishing-scrim"
                  ref={(el) => (establishingScrimRefs.current[idx] = el)}
                  aria-hidden="true"
                />

                {/* Museum Caption Plate (Visible in Framed & Detail Layouts) */}
                {chapter.beats.map((beat, bIdx) => (
                  <p
                    key={`cap-${beat.id}`}
                    className="framed-photo-caption"
                    ref={(el) => {
                      if (!beatCaptionRefs.current[idx]) beatCaptionRefs.current[idx] = [];
                      beatCaptionRefs.current[idx][bIdx] = el;
                    }}
                  >
                    {isKorean ? beat.image.caption.ko : beat.image.caption.vi}
                  </p>
                ))}

                {/* STATE A: Clean Opening Establishing Title */}
                <div
                  className="chapter-immersive-title"
                  ref={(el) => (immersiveTitleRefs.current[idx] = el)}
                >
                  <span className="immersive-index">
                    {chapter.chapterNumber} / 0{TOTAL_CHAPTERS} — HANOI OLD QUARTER
                  </span>
                  <h2 className="immersive-heading">
                    {isKorean ? chapter.title.ko : chapter.title.vi}
                  </h2>
                  <p className="immersive-lead">
                    {isKorean ? chapter.lead.ko : chapter.lead.vi}
                  </p>
                </div>
              </div>

              {/* =============================================================
                  B. EDITORIAL STORY SURFACE (Crisp Subpixel Typography Layer)
                  ============================================================= */}
              <div
                className="chapter-editorial-surface"
                ref={(el) => (editorialSurfaceRefs.current[idx] = el)}
              >
                <div className="editorial-column-inner">
                  {/* Minimal Chapter Identifier */}
                  <p className="editorial-chapter-index">
                    {chapter.chapterNumber} / 0{TOTAL_CHAPTERS} — HANOI OLD QUARTER
                  </p>

                  {/* Level 1: Location Title */}
                  <h3 className="editorial-place-title">
                    {isKorean ? chapter.title.ko : chapter.title.vi}
                  </h3>

                  {/* Minimal Editorial Beat Index Rail */}
                  <div className="editorial-beat-rail" role="navigation" aria-label="Story beats">
                    {chapter.beats.map((b, bIdx) => (
                      <button
                        key={b.id}
                        type="button"
                        className="beat-rail-item"
                        onClick={() => handleJumpToBeat(idx, bIdx)}
                        ref={(el) => {
                          if (!beatRailItemRefs.current[idx]) beatRailItemRefs.current[idx] = [];
                          beatRailItemRefs.current[idx][bIdx] = el;
                        }}
                      >
                        <span className="beat-rail-label">
                          0{bIdx + 1} — {isKorean ? b.beatLabel.ko : b.beatLabel.vi}
                        </span>
                        <span className="beat-rail-track" aria-hidden="true">
                          <span
                            className="beat-rail-fill"
                            ref={(el) => {
                              if (!beatRailFillRefs.current[idx]) beatRailFillRefs.current[idx] = [];
                              beatRailFillRefs.current[idx][bIdx] = el;
                            }}
                          />
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Three-Beat Overlapping Editorial Stage */}
                  <div className="editorial-beat-stage">
                    {chapter.beats.map((beat, bIdx) => (
                      <div
                        key={beat.id}
                        className={`editorial-beat beat-layout-${beat.layout}`}
                        ref={(el) => {
                          if (!beatRefs.current[idx]) beatRefs.current[idx] = [];
                          beatRefs.current[idx][bIdx] = el;
                        }}
                      >
                        {/* Level 2: Story Headline */}
                        <h4 className="beat-story-title">
                          {isKorean ? beat.title.ko : beat.title.vi}
                        </h4>

                        {/* Level 3: Grounded Editorial Body */}
                        <p className="beat-story-body">
                          {isKorean ? beat.body.ko : beat.body.vi}
                        </p>

                        {/* Optional Factual Detail Note */}
                        {beat.detail && (
                          <p className="beat-story-detail">
                            {isKorean ? beat.detail.ko : beat.detail.vi}
                          </p>
                        )}

                        {/* Selective Editorial Note */}
                        {beat.editorialNote && (
                          <blockquote className="beat-editorial-note">
                            <p>{isKorean ? beat.editorialNote.text.ko : beat.editorialNote.text.vi}</p>
                            <cite>{isKorean ? beat.editorialNote.label.ko : beat.editorialNote.label.vi}</cite>
                          </blockquote>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Contextual CTAs — Revealed in Beat 03 Reading Hold */}
                  <div
                    className="editorial-cta-bar"
                    ref={(el) => (ctaBarRefs.current[idx] = el)}
                  >
                    <button
                      type="button"
                      className="cta-editorial-link"
                      onClick={() => setActiveModalChapter(chapter)}
                    >
                      {isKorean ? '상세 보기' : 'Khám phá chi tiết'}
                    </button>

                    <button
                      type="button"
                      className={`cta-editorial-trip ${isItemSaved ? 'is-saved' : ''}`}
                      onClick={() => toggleAttraction(chapter.id)}
                    >
                      {isItemSaved ? (
                        <>
                          <Check size={13} aria-hidden="true" />
                          <span>{isKorean ? '일정에 추가됨' : 'Đã trong lịch trình'}</span>
                        </>
                      ) : (
                        <span>{isKorean ? '일정에 추가' : 'Thêm vào lịch trình'}</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ===================================================================
          3. ULTRA-DISCREET EDITORIAL NAVIGATION
          =================================================================== */}
      <nav className="old-quarter-minimal-nav" aria-label="Chapter navigation">
        <div className="min-nav-counter" aria-live="polite">
          <span className="counter-current">{activeChapter.chapterNumber}</span>
          <span className="counter-sep">/</span>
          <span className="counter-total">0{TOTAL_CHAPTERS}</span>
        </div>

        <div className="min-nav-pips">
          {OLD_QUARTER_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              className={`min-nav-pip ${idx === activeChapterIndex ? 'pip-active' : idx < activeChapterIndex ? 'pip-passed' : ''}`}
              onClick={() => handleJumpToChapter(idx)}
              aria-label={`Chapter ${ch.chapterNumber}`}
              aria-current={idx === activeChapterIndex ? 'step' : undefined}
            />
          ))}
        </div>

        <div className="min-nav-arrows">
          <button
            type="button"
            className="min-nav-arrow-btn"
            onClick={handlePrevChapter}
            disabled={activeChapterIndex === 0}
            aria-label={isKorean ? '이전 챕터' : 'Chương trước'}
          >
            <ChevronLeft size={13} />
          </button>
          <button
            type="button"
            className="min-nav-arrow-btn"
            onClick={handleNextChapter}
            disabled={activeChapterIndex === TOTAL_CHAPTERS - 1}
            aria-label={isKorean ? '다음 챕터' : 'Chương tiếp theo'}
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </nav>

      {/* ===================================================================
          4. CULTURAL DETAIL MODAL
          =================================================================== */}
      <OldQuarterDetailModal
        chapter={activeModalChapter}
        isKorean={isKorean}
        isSaved={activeModalChapter ? isSaved(activeModalChapter.id) : false}
        onClose={() => setActiveModalChapter(null)}
        onToggleTrip={toggleAttraction}
      />
    </section>
  );
};

export default HanoiOldQuarterWalk;
