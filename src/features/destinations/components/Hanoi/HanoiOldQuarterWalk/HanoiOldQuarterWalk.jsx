import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  X,
  ArrowRight,
  Check,
  Compass,
  Clock,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useTripBuilder } from '../../../context/TripBuilderContext';
import { getLenis } from '../../../motion/LenisManager';
import { OLD_QUARTER_SCENES, TOTAL_SCENES } from './oldQuarterScenes';
import './HanoiOldQuarterWalk.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * SUPER EZ TOUR — HANOI SCREEN 2: LIVING OLD QUARTER (36 PHỐ PHƯỜNG)
 * 
 * Cinematic 2.5D Photographic Parallax & Cultural Storytelling Experience.
 * Replaces procedural low-poly 3D street with authentic high-resolution
 * heritage photography, camera dolly depth, and editorial HUD.
 */
const HanoiOldQuarterWalk = () => {
  const containerRef = useRef(null);
  const transitionFogRef = useRef(null);
  const scenesTrackRef = useRef(null);

  // Active scene milestone index (0..3)
  const [activeIndex, setActiveIndex] = useState(0);
  // Modal state
  const [activeModalSpot, setActiveModalSpot] = useState(null);

  const { isKorean } = useLanguage();
  const { tripState, toggleAttraction } = useTripBuilder();

  const currentScene = OLD_QUARTER_SCENES[activeIndex] || OLD_QUARTER_SCENES[0];
  const isAttractionSaved = Boolean(
    activeModalSpot && tripState?.selectedAttractions?.includes(activeModalSpot.id)
  );

  // =========================================================================
  // 1. GSAP SCROLLTRIGGER PINNING & 2.5D PARALLAX TIMELINE
  // =========================================================================
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const sceneEls = container.querySelectorAll('.photographic-scene-layer');
    const imageEls = container.querySelectorAll('.photographic-image-wrap');

    const ctx = gsap.context(() => {
      // Create master scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'oldQuarterPinTrigger',
          trigger: container,
          start: 'top top',
          end: '+=280%',
          pin: true,
          scrub: prefersReducedMotion ? false : 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = Number.isFinite(self.progress) ? self.progress : 0;

            // Map progress to active milestone
            // 0.00 .. 0.25 -> 0 (Hàng Bạc)
            // 0.25 .. 0.50 -> 1 (Café Giảng)
            // 0.50 .. 0.75 -> 2 (87 Mã Mây)
            // 0.75 .. 1.00 -> 3 (Xe Hoa & Hàng Rong)
            const newIndex = progress < 0.25 ? 0 : progress < 0.5 ? 1 : progress < 0.75 ? 2 : 3;
            setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));

            // Morning Mist Bridge: dissolves gracefully from 0.18 to 0 in first 15%
            if (transitionFogRef.current) {
              if (progress <= 0.15) {
                const mistOpacity = (1 - progress / 0.15) * 0.18;
                gsap.set(transitionFogRef.current, { opacity: Math.max(0, mistOpacity) });
              } else {
                gsap.set(transitionFogRef.current, { opacity: 0 });
              }
            }
          },
        },
      });

      if (!prefersReducedMotion && sceneEls.length >= 4 && imageEls.length >= 4) {
        // SCENE 0: Hàng Bạc — slow push / zoom into the artisan street
        gsap.set(sceneEls[0], { opacity: 1, zIndex: 1 });
        gsap.set(imageEls[0], { scale: 1.0, y: 0 });

        tl.to(imageEls[0], {
          scale: 1.09,
          y: -25,
          ease: 'none',
          duration: 0.28,
        }, 0);

        // Transition 0 -> 1 (at 0.20 - 0.28)
        tl.to(sceneEls[0], {
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.08,
        }, 0.20);

        // SCENE 1: Café Giảng — warm dolly-in
        gsap.set(sceneEls[1], { opacity: 0, zIndex: 2 });
        gsap.set(imageEls[1], { scale: 1.04, y: 15 });

        tl.to(sceneEls[1], {
          opacity: 1,
          ease: 'power2.inOut',
          duration: 0.08,
        }, 0.20);

        tl.to(imageEls[1], {
          scale: 1.14,
          y: -15,
          ease: 'none',
          duration: 0.28,
        }, 0.22);

        // Transition 1 -> 2 (at 0.45 - 0.53)
        tl.to(sceneEls[1], {
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.08,
        }, 0.45);

        // SCENE 2: 87 Mã Mây — horizontal tracking shot
        gsap.set(sceneEls[2], { opacity: 0, zIndex: 3 });
        gsap.set(imageEls[2], { scale: 1.06, x: 25 });

        tl.to(sceneEls[2], {
          opacity: 1,
          ease: 'power2.inOut',
          duration: 0.08,
        }, 0.45);

        tl.to(imageEls[2], {
          scale: 1.09,
          x: -25,
          ease: 'none',
          duration: 0.28,
        }, 0.47);

        // Transition 2 -> 3 (at 0.70 - 0.78)
        tl.to(sceneEls[2], {
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.08,
        }, 0.70);

        // SCENE 3: Xe Hoa & Gánh Hàng Rong — lateral glide
        gsap.set(sceneEls[3], { opacity: 0, zIndex: 4 });
        gsap.set(imageEls[3], { scale: 1.02, x: -20, y: 10 });

        tl.to(sceneEls[3], {
          opacity: 1,
          ease: 'power2.inOut',
          duration: 0.08,
        }, 0.70);

        tl.to(imageEls[3], {
          scale: 1.11,
          x: 20,
          y: -10,
          ease: 'none',
          duration: 0.28,
        }, 0.72);
      } else {
        // Fallback for reduced motion: show scenes directly based on activeIndex
        sceneEls.forEach((el, idx) => {
          gsap.set(el, { opacity: idx === activeIndex ? 1 : 0 });
        });
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  // =========================================================================
  // 2. MODAL ACCESSIBILITY & BODY SCROLL LOCK
  // =========================================================================
  useEffect(() => {
    if (!activeModalSpot) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalSpot(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Pause Lenis smooth scroll while modal is active
    const lenis = getLenis();
    if (lenis) {
      try { lenis.stop(); } catch (_) {}
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (lenis) {
        try { lenis.start(); } catch (_) {}
      }
      document.body.style.overflow = originalOverflow;
    };
  }, [activeModalSpot]);

  // =========================================================================
  // 3. NAVIGATION HANDLERS
  // =========================================================================
  const handleScrollToMilestone = useCallback((index) => {
    const progressTargets = [0.05, 0.35, 0.62, 0.88];
    const targetP = progressTargets[index] ?? 0;
    const st = ScrollTrigger.getById('oldQuarterPinTrigger');

    if (st) {
      const targetScroll = st.start + targetP * (st.end - st.start);
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(targetScroll, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  }, []);

  const handleOpenSpotModal = (spot) => {
    setActiveModalSpot(spot);
  };

  const handleCloseSpotModal = () => {
    setActiveModalSpot(null);
  };

  const handleToggleTripAttraction = (spotId) => {
    toggleAttraction(spotId);
  };

  return (
    <section
      ref={containerRef}
      className="hanoi-old-quarter-scene"
      id="scene-old-quarter"
      aria-label={isKorean ? '하노이 36 구시가지 포토그래픽 2.5D 산책' : 'Hành trình 2.5D Phố Cổ Hà Nội'}
    >
      {/* ===================================================================
          1. PHOTOGRAPHIC 2.5D VIEWPORT LAYERS
          =================================================================== */}
      <div ref={scenesTrackRef} className="photographic-scenes-track" aria-hidden="true">
        {OLD_QUARTER_SCENES.map((scene, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={scene.id}
              className={`photographic-scene-layer ${isActive ? 'scene-current' : ''}`}
              data-scene-id={scene.id}
            >
              <div className="photographic-image-wrap">
                <img
                  src={scene.image}
                  alt={scene.name}
                  className="photographic-hero-image"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>

              {/* Natural Lighting & Atmospheric Overlays */}
              <div className="scene-lighting-ray" />
              <div className="scene-cinematic-vignette" />

              {/* Interactive In-Scene Hotspot Beacon */}
              <button
                type="button"
                className={`scene-interactive-beacon ${isActive ? 'beacon-pulse' : ''}`}
                style={{
                  top: `${scene.hotspotPos.y}%`,
                  left: `${scene.hotspotPos.x}%`,
                }}
                onClick={() => handleOpenSpotModal(scene)}
                aria-label={`${isKorean ? scene.nameKr : scene.name} - ${isKorean ? '상세 스토리 보기' : 'Khám phá câu chuyện'}`}
              >
                <span className="beacon-core">
                  <Sparkles size={14} className="beacon-icon" />
                </span>
                <span className="beacon-wave-1" />
                <span className="beacon-wave-2" />
                <span className="beacon-tag">
                  <span className="beacon-tag-num">0{scene.index}</span>
                  <span className="beacon-tag-label">{isKorean ? scene.nameKr : scene.name}</span>
                </span>
              </button>

              {/* Subtle Photo Attribution Badge */}
              <div className="scene-credit-pill">
                <span>{scene.credits}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===================================================================
          2. INCOMING MORNING MIST TRANSITION (Bridge from Screen 1)
          =================================================================== */}
      <div ref={transitionFogRef} className="old-quarter-transition-fog" aria-hidden="true" />

      {/* ===================================================================
          3. MINIMAL EDITORIAL HUD (Top Floating)
          =================================================================== */}
      <div className="old-quarter-hud-header">
        <div className="hud-meta-row">
          <div className="hud-scene-badge">
            <Compass size={13} className="hud-badge-icon" />
            <span>SCENE 02 · PHOTOGRAPHIC 2.5D JOURNEY</span>
          </div>
          <span className="hud-divider">/</span>
          <span className="hud-dest-tag">
            {isKorean ? '하노이 36 구시가지' : '36 Phố Phường Thăng Long'}
          </span>
        </div>

        {/* Dynamic Scene Title with Smooth Typography */}
        <div className="hud-content-block">
          <div className="hud-indicator-strip">
            <span className="hud-counter-num">0{activeIndex + 1}</span>
            <div className="hud-progress-track">
              {OLD_QUARTER_SCENES.map((_, i) => (
                <span
                  key={i}
                  className={`hud-progress-seg ${i === activeIndex ? 'seg-active' : i < activeIndex ? 'seg-passed' : ''}`}
                />
              ))}
            </div>
            <span className="hud-counter-total">0{TOTAL_SCENES}</span>
          </div>

          <h2 className="hud-scene-title">
            {isKorean ? currentScene.nameKr : currentScene.name}
          </h2>

          <p className="hud-scene-subtitle">
            <span className="hud-era-tag">
              <Clock size={12} />
              {isKorean ? currentScene.eraKr : currentScene.era}
            </span>
            <span className="hud-sub-text">
              {isKorean ? currentScene.subtitleKr : currentScene.subtitle}
            </span>
          </p>
        </div>

        {/* Quick Trigger to Read Story */}
        <button
          type="button"
          className="hud-explore-btn"
          onClick={() => handleOpenSpotModal(currentScene)}
        >
          <Info size={14} />
          <span>{isKorean ? '스토리 & 프라이빗 하이라이트' : 'Khám phá Điểm Nhấn Di Sản'}</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* ===================================================================
          4. BOTTOM LANDMARKS DOCK (Milestone Navigation)
          =================================================================== */}
      <nav className="old-quarter-milestones-dock" aria-label="Landmark milestones">
        <span className="dock-guide-hint">
          {isKorean ? '하노이 4대 문화 랜드마크' : '4 Tọa độ Di sản Phố Cổ'}
        </span>
        <div className="dock-buttons-group">
          {OLD_QUARTER_SCENES.map((scene, idx) => {
            const Icon = scene.icon;
            const isActive = idx === activeIndex;
            return (
              <button
                key={scene.id}
                type="button"
                className={`dock-milestone-item ${isActive ? 'milestone-active' : ''}`}
                onClick={() => handleScrollToMilestone(idx)}
                aria-current={isActive ? 'step' : undefined}
                title={isKorean ? scene.nameKr : scene.name}
              >
                <span className="milestone-num">0{scene.index}</span>
                <span className="milestone-icon-wrap">
                  <Icon size={14} />
                </span>
                <span className="milestone-name">
                  {isKorean ? scene.nameKr : scene.name}
                </span>
                {isActive && <span className="milestone-glow-dot" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ===================================================================
          5. CULTURAL DETAIL MODAL (Accessible, Bilingual, TripBuilder Sync)
          =================================================================== */}
      {activeModalSpot && (
        <div
          className="old-quarter-modal-overlay"
          onClick={handleCloseSpotModal}
          role="presentation"
        >
          <div
            className="old-quarter-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="old-quarter-modal-title"
            aria-describedby="old-quarter-modal-summary"
          >
            {/* Modal Close Button */}
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleCloseSpotModal}
              aria-label={isKorean ? '닫기' : 'Đóng'}
            >
              <X size={18} />
            </button>

            {/* Modal Hero Visual */}
            <div className="modal-hero-visual">
              <img
                src={activeModalSpot.image}
                alt={activeModalSpot.name}
                className="modal-hero-img"
              />
              <div className="modal-visual-gradient" />
              <div className="modal-visual-badges">
                <span className="modal-category-badge">
                  <Layers size={12} />
                  <span>{isKorean ? activeModalSpot.categoryKr : activeModalSpot.category}</span>
                </span>
                <span className="modal-era-badge">
                  <Clock size={12} />
                  <span>{isKorean ? activeModalSpot.eraKr : activeModalSpot.era}</span>
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="modal-body-wrapper">
              <div className="modal-header-meta">
                <span className="modal-index-label">
                  MILESTONE 0{activeModalSpot.index} / 0{TOTAL_SCENES}
                </span>
                <h3 id="old-quarter-modal-title" className="modal-spot-title">
                  {isKorean ? activeModalSpot.nameKr : activeModalSpot.name}
                </h3>
                <span className="modal-spot-english">
                  {activeModalSpot.nameEn}
                </span>
              </div>

              <p id="old-quarter-modal-summary" className="modal-spot-summary">
                {isKorean ? activeModalSpot.summaryKr : activeModalSpot.summary}
              </p>

              {/* Private Tour Highlights */}
              <div className="modal-highlights-box">
                <span className="highlights-box-title">
                  <Sparkles size={13} />
                  <span>
                    {isKorean ? 'Super EZ Tour 프라이빗 독점 하이라이트' : 'Điểm nhấn Trải nghiệm Độc quyền trong Tour'}
                  </span>
                </span>
                <ul className="highlights-list">
                  {(isKorean ? activeModalSpot.detailsKr : activeModalSpot.details).map((item, i) => (
                    <li key={i} className="highlight-item">
                      <span className="highlight-bullet">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons with TripBuilder Sync */}
              <div className="modal-actions-container">
                <button
                  type="button"
                  className={`modal-trip-action-btn ${isAttractionSaved ? 'btn-saved' : 'btn-add'}`}
                  onClick={() => handleToggleTripAttraction(activeModalSpot.id)}
                >
                  {isAttractionSaved ? (
                    <>
                      <Check size={16} />
                      <span>
                        {isKorean ? '맞춤 일정에 추가됨 (삭제하려면 클릭)' : 'Đã có trong Lịch Trình (Nhấp để xóa)'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>
                        {isKorean ? '내 맞춤 일정에 추가하기' : 'Thêm vào Lịch Trình Riêng'}
                      </span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="modal-continue-walk-btn"
                  onClick={handleCloseSpotModal}
                >
                  <span>{isKorean ? '계속 산책하기' : 'Tiếp tục dạo bước'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Modal Photo Attribution */}
              <div className="modal-footer-attribution">
                <small>{activeModalSpot.credits}</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HanoiOldQuarterWalk;
