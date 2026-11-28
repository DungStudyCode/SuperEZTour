import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Utensils, Check, Sparkles, Flame, Plus, Award } from 'lucide-react';
import { useTripBuilder, isCulinarySelected } from '../../context/TripBuilderContext';
import { useLanguage } from '../../../../context/LanguageContext';
import './CulinaryFilmScene.css';

gsap.registerPlugin(ScrollTrigger);

// Exact dwell progress targets for each dish on the timeline (center of stationary plateau)
const DWELL_POINTS = [0.15, 0.32, 0.49, 0.66, 0.88];

const CulinaryFilmScene = ({ culinaryData }) => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const kickerRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const navBarRef = useRef(null);

  const visualSlidesRef = useRef([]);
  const editorialSlidesRef = useRef([]);
  const scrollTriggerRef = useRef(null);

  // Raw items from culinaryData or fallback to empty array
  const dishes = useMemo(() => {
    return culinaryData?.items || [];
  }, [culinaryData]);

  // Active navigation index indicator
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  const { tripState, toggleCulinary } = useTripBuilder();
  const { isKorean } = useLanguage();

  // Navigation tab click: smoothly glides scroll position to that dish's dwell plateau
  const handleNavClick = useCallback((idx) => {
    setActiveNavIndex(idx);

    if (scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const progress = DWELL_POINTS[idx] !== undefined ? DWELL_POINTS[idx] : 0.15;
      const targetY = st.start + (st.end - st.start) * progress;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
  }, []);

  // =========================================================================
  // CINEMATIC DWELL-AND-TRANSITION SCROLL CHOREOGRAPHY
  // Each dish: Full Reveal (20%) -> Dwell Plateau / Delay (60%) -> Transition Out (20%)
  // =========================================================================
  useEffect(() => {
    if (!containerRef.current || dishes.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 993px) and (min-height: 561px)',
        isTablet: '(min-width: 769px) and (max-width: 992px) and (min-height: 561px)',
        isMobile: '(max-width: 768px)',
        isShortHeight: '(max-height: 560px)',
        reduceMotion: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { isDesktop, isTablet, reduceMotion, isShortHeight } = context.conditions;
        if (reduceMotion) return;

        // Long travel distance so each dish has an extended reading dwell plateau
        const pinDistance =
          isDesktop && !isShortHeight
            ? '+=360%'
            : isTablet && !isShortHeight
            ? '+=260%'
            : null;

        if (!pinDistance) return; // Allow natural flowing layout on mobile or constrained viewports

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: pinDistance,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1
          },
          // Evaluated on every animation frame of the tweened timeline,
          // perfectly synchronized 1:1 with visible slide opacities and zero scrub lag
          onUpdate: function () {
            const p = this.progress();
            let currentIdx = 0;
            if (p < 0.235) currentIdx = 0;
            else if (p < 0.405) currentIdx = 1;
            else if (p < 0.575) currentIdx = 2;
            else if (p < 0.745) currentIdx = 3;
            else currentIdx = 4;

            setActiveNavIndex((prev) => (prev !== currentIdx ? currentIdx : prev));
          }
        });

        scrollTriggerRef.current = tl.scrollTrigger;

        // ---------------------------------------------------------------------
        // 0.00 – 0.08: Scene 01 Intro Reveal (Header & Navigation)
        // ---------------------------------------------------------------------
        if (kickerRef.current) {
          tl.fromTo(kickerRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.06 }, 0);
        }
        if (titleRef.current) {
          tl.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.07 }, 0.02);
        }
        if (badgeRef.current) {
          tl.fromTo(badgeRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.06 }, 0.03);
        }
        if (navBarRef.current) {
          tl.fromTo(navBarRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.07 }, 0.04);
        }

        // Initialize all slides cleanly via GSAP (never inline JSX styles) so React re-renders don't reset scrubbed state
        for (let idx = 0; idx < dishes.length; idx++) {
          const vSlide = visualSlidesRef.current[idx];
          const eSlide = editorialSlidesRef.current[idx];
          if (vSlide) {
            tl.set(vSlide, { opacity: idx === 0 ? 1 : 0, pointerEvents: idx === 0 ? 'auto' : 'none' }, 0);
          }
          if (eSlide) {
            tl.set(eSlide, { opacity: idx === 0 ? 1 : 0, pointerEvents: idx === 0 ? 'auto' : 'none' }, 0);
          }
        }

        // Dish 0 enters smoothly into 100% full reveal
        const v0 = visualSlidesRef.current[0];
        const e0 = editorialSlidesRef.current[0];
        if (v0) {
          tl.fromTo(
            v0,
            { clipPath: 'inset(10% 8% 10% 8% round 24px)', scale: 1.05, opacity: 0.5 },
            { clipPath: 'inset(0% 0% 0% 0% round 20px)', scale: 1.0, opacity: 1, ease: 'power2.out', duration: 0.08 },
            0.02
          );
        }
        if (e0) {
          tl.fromTo(
            e0,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, ease: 'power2.out', duration: 0.07 },
            0.04
          );
        }

        // ---------------------------------------------------------------------
        // DWELL PLATEAU 0 (0.08 -> 0.22): ~50vh of completely stationary hold!
        // Dish 0 (Mì Quảng) stays 100% visible, perfectly still, fully readable.
        // ---------------------------------------------------------------------

        // ---------------------------------------------------------------------
        // 0.22 -> 0.25: Transition Dish 0 -> Dish 1
        // ---------------------------------------------------------------------
        const v1 = visualSlidesRef.current[1];
        const e1 = editorialSlidesRef.current[1];
        if (v0 && v1) {
          tl.to(v0, { opacity: 0, scale: 0.96, duration: 0.03, ease: 'power2.inOut' }, 0.22);
          tl.set(v0, { pointerEvents: 'none' }, 0.25);
          tl.set(v1, { pointerEvents: 'auto' }, 0.23);
          tl.fromTo(v1, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1.0, duration: 0.035, ease: 'power2.out' }, 0.23);
        }
        if (e0 && e1) {
          tl.to(e0, { opacity: 0, y: -20, duration: 0.025, ease: 'power2.in' }, 0.22);
          tl.set(e0, { pointerEvents: 'none' }, 0.25);
          tl.set(e1, { pointerEvents: 'auto' }, 0.235);
          tl.fromTo(e1, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.035, ease: 'power2.out' }, 0.235);
        }

        // ---------------------------------------------------------------------
        // DWELL PLATEAU 1 (0.25 -> 0.39): ~50vh of completely stationary hold!
        // Dish 1 (Bánh tráng cuốn thịt heo) stays 100% visible and static.
        // ---------------------------------------------------------------------

        // ---------------------------------------------------------------------
        // 0.39 -> 0.42: Transition Dish 1 -> Dish 2
        // ---------------------------------------------------------------------
        const v2 = visualSlidesRef.current[2];
        const e2 = editorialSlidesRef.current[2];
        if (v1 && v2) {
          tl.to(v1, { opacity: 0, scale: 0.96, duration: 0.03, ease: 'power2.inOut' }, 0.39);
          tl.set(v1, { pointerEvents: 'none' }, 0.42);
          tl.set(v2, { pointerEvents: 'auto' }, 0.40);
          tl.fromTo(v2, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1.0, duration: 0.035, ease: 'power2.out' }, 0.40);
        }
        if (e1 && e2) {
          tl.to(e1, { opacity: 0, y: -20, duration: 0.025, ease: 'power2.in' }, 0.39);
          tl.set(e1, { pointerEvents: 'none' }, 0.42);
          tl.set(e2, { pointerEvents: 'auto' }, 0.405);
          tl.fromTo(e2, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.035, ease: 'power2.out' }, 0.405);
        }

        // ---------------------------------------------------------------------
        // DWELL PLATEAU 2 (0.42 -> 0.56): ~50vh of completely stationary hold!
        // Dish 2 (Hải sản tươi sống) stays 100% visible and static.
        // ---------------------------------------------------------------------

        // ---------------------------------------------------------------------
        // 0.56 -> 0.59: Transition Dish 2 -> Dish 3
        // ---------------------------------------------------------------------
        const v3 = visualSlidesRef.current[3];
        const e3 = editorialSlidesRef.current[3];
        if (v2 && v3) {
          tl.to(v2, { opacity: 0, scale: 0.96, duration: 0.03, ease: 'power2.inOut' }, 0.56);
          tl.set(v2, { pointerEvents: 'none' }, 0.59);
          tl.set(v3, { pointerEvents: 'auto' }, 0.57);
          tl.fromTo(v3, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1.0, duration: 0.035, ease: 'power2.out' }, 0.57);
        }
        if (e2 && e3) {
          tl.to(e2, { opacity: 0, y: -20, duration: 0.025, ease: 'power2.in' }, 0.56);
          tl.set(e2, { pointerEvents: 'none' }, 0.59);
          tl.set(e3, { pointerEvents: 'auto' }, 0.575);
          tl.fromTo(e3, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.035, ease: 'power2.out' }, 0.575);
        }

        // ---------------------------------------------------------------------
        // DWELL PLATEAU 3 (0.59 -> 0.73): ~50vh of completely stationary hold!
        // Dish 3 (Bún chả cá) stays 100% visible and static.
        // ---------------------------------------------------------------------

        // ---------------------------------------------------------------------
        // 0.73 -> 0.76: Transition Dish 3 -> Dish 4
        // ---------------------------------------------------------------------
        const v4 = visualSlidesRef.current[4];
        const e4 = editorialSlidesRef.current[4];
        if (v3 && v4) {
          tl.to(v3, { opacity: 0, scale: 0.96, duration: 0.03, ease: 'power2.inOut' }, 0.73);
          tl.set(v3, { pointerEvents: 'none' }, 0.76);
          tl.set(v4, { pointerEvents: 'auto' }, 0.74);
          tl.fromTo(v4, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1.0, duration: 0.035, ease: 'power2.out' }, 0.74);
        }
        if (e3 && e4) {
          tl.to(e3, { opacity: 0, y: -20, duration: 0.025, ease: 'power2.in' }, 0.73);
          tl.set(e3, { pointerEvents: 'none' }, 0.76);
          tl.set(e4, { pointerEvents: 'auto' }, 0.745);
          tl.fromTo(e4, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.035, ease: 'power2.out' }, 0.745);
        }

        // ---------------------------------------------------------------------
        // DWELL PLATEAU 4 & FINAL INTERACTION HOLD (0.76 -> 1.00):
        // Over 85vh of solid hold! Dish 4 (Fine Dining) fully visible,
        // and visitor has unlimited time to customize their menu.
        // ---------------------------------------------------------------------
      },
      containerRef
    );

    return () => mm.revert();
  }, [dishes.length]);

  const chosenCount = tripState.culinaryPreferences.length;

  return (
    <section className="culinary-film-scene" ref={containerRef} id="culinary">
      {/* Warm Ambient Gastronomy Lighting Vignette */}
      <div className="culinary-ambient-vignette" aria-hidden="true">
        <div className="culinary-glow-spotlight" />
        <div className="culinary-warm-haze" />
      </div>

      <div className="dest-container culinary-film-content">
        {/* Header Region */}
        <header className="culinary-editorial-header" ref={headerRef}>
          <div>
            <span className="dest-kicker culinary-kicker" ref={kickerRef}>
              <Utensils size={14} className="culinary-kicker-icon" aria-hidden="true" />
              <span>{culinaryData?.kicker || 'THE ART OF DA NANG CUISINE'}</span>
            </span>
            <h2 className="culinary-film-title" ref={titleRef}>
              {culinaryData?.title || 'Hành Trình Đánh Thức Vị Giác'}
            </h2>
          </div>

          <div className="culinary-menu-badge" ref={badgeRef}>
            <Sparkles size={14} className="culinary-badge-icon" aria-hidden="true" />
            <span>
              {culinaryData?.badgeText
                ? `${chosenCount} ${culinaryData.badgeText}`
                : `Đã lưu: ${chosenCount} món vào sở thích ẩm thực`}
            </span>
          </div>
        </header>

        {/* Featured Dish Stage: Multi-Slide Stack (Zero Layout Shift & Zero Render Lag) */}
        <div className="culinary-featured-stage">
          {/* Left / Center: Stacked Visual Showcase Slides */}
          <div className="culinary-visual-showcase">
            {dishes.map((dish, i) => (
              <div
                key={dish.id}
                ref={(el) => (visualSlidesRef.current[i] = el)}
                className={`culinary-visual-slide ${i === activeNavIndex ? 'slide-active-nav' : ''}`}
              >
                <div className="culinary-img-wrap">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="culinary-hero-img"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      if (dish.fallbackImage && e.target.src !== dish.fallbackImage) {
                        e.target.src = dish.fallbackImage;
                      }
                    }}
                  />
                  <div className="culinary-img-overlay-gradient" />

                  {/* Top Floating Badge */}
                  <div className="culinary-floating-top-meta">
                    <span className="culinary-chapter-pill">
                      CHAPTER {dish.chapter || `0${i + 1}`}
                    </span>
                    <span className="culinary-category-pill">
                      {dish.categoryLabel || 'ĐẶC SẢN ĐÀ NẴNG'}
                    </span>
                  </div>

                  {/* Bottom Floating Flavor Notes */}
                  {dish.flavorNotes && (
                    <div className="culinary-floating-flavor-notes">
                      <Flame size={13} className="flame-pill-icon" aria-hidden="true" />
                      <span>{dish.flavorNotes}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Stacked Editorial Aside Slides */}
          <aside className="culinary-editorial-aside">
            {dishes.map((dish, i) => {
              const isChosen = isCulinarySelected(tripState.culinaryPreferences, dish.name);
              return (
                <div
                  key={dish.id}
                  ref={(el) => (editorialSlidesRef.current[i] = el)}
                  className={`culinary-editorial-slide ${i === activeNavIndex ? 'slide-active-nav' : ''}`}
                >
                  <div className="culinary-story-body">
                    <div className="culinary-chapter-pretitle">
                      <span>{`CHAPTER ${dish.chapter || `0${i + 1}`} / 0${dishes.length}`}</span>
                      <span className="pretitle-separator" aria-hidden="true">·</span>
                      <span>DA NANG GASTRONOMY</span>
                    </div>

                    <h3 className="culinary-dish-title">{isKorean ? (dish.nameKr || dish.name) : (dish.name || dish.nameKr)}</h3>

                    {dish.slogan && (
                      <p className="culinary-dish-slogan">{dish.slogan}</p>
                    )}

                    <p className="culinary-dish-desc">{dish.desc}</p>

                    {dish.highlights && dish.highlights.length > 0 && (
                      <div className="culinary-highlights-block">
                        <span className="highlights-label">{culinaryData?.highlightsLabel || 'Đặc trưng tinh hoa:'}</span>
                        <div className="culinary-tags-wrap">
                          {dish.highlights.map((h, hIdx) => (
                            <span key={hIdx} className="culinary-tag-badge">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {dish.spot && (
                      <div className="culinary-spot-card">
                        <Award size={14} className="spot-icon" aria-hidden="true" />
                        <span className="spot-text">{dish.spot}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Footer Button */}
                  <div className="culinary-action-footer">
                    <button
                      type="button"
                      className={`culinary-cta-btn ${isChosen ? 'btn-chosen' : ''}`}
                      onClick={() => toggleCulinary(dish.name)}
                      aria-pressed={isChosen}
                    >
                      {isChosen ? (
                        <>
                          <Check size={16} className="btn-icon-check" />
                          <span>✓ {culinaryData?.btnChosen || 'Đã thêm vào thực đơn'}</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} className="btn-icon-plus" />
                          <span>+ {culinaryData?.btnAdd || 'Thêm món này vào thực đơn'}</span>
                        </>
                      )}
                      <span className="btn-sweep-shine" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </aside>
        </div>

        {/* Bottom Culinary Chapter Navigation Bar (ALL DISHES ACCESSIBLE) */}
        <nav
          className="culinary-chapter-nav"
          ref={navBarRef}
          aria-label="Điều hướng các chương ẩm thực Đà Nẵng"
        >
          {dishes.map((dish, idx) => {
            const isActive = idx === activeNavIndex;
            const isChosen = isCulinarySelected(tripState.culinaryPreferences, dish.name);

            return (
              <button
                key={dish.id}
                type="button"
                className={`chapter-nav-item ${isActive ? 'nav-item-active' : ''} ${isChosen ? 'nav-item-chosen' : ''}`}
                onClick={() => handleNavClick(idx)}
              >
                <div className="nav-thumb-wrap">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="nav-thumb-img"
                    loading="lazy"
                    onError={(e) => {
                      if (dish.fallbackImage && e.target.src !== dish.fallbackImage) {
                        e.target.src = dish.fallbackImage;
                      }
                    }}
                  />
                  {isChosen && (
                    <span className="nav-chosen-check" title="Đã có trong thực đơn">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}
                </div>

                <div className="nav-item-info">
                  <span className="nav-chapter-idx">{`CH.${dish.chapter || `0${idx + 1}`}`}</span>
                  <span className="nav-dish-name">{isKorean ? (dish.nameKr || dish.name) : (dish.name || dish.nameKr)}</span>
                </div>

                <span className="nav-active-bar" aria-hidden="true" />
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
};

export default CulinaryFilmScene;
