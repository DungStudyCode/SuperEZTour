import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, MapPin, CheckCircle2, Bed, ArrowRight, Sparkles } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './Accommodation3DScene.css';

gsap.registerPlugin(ScrollTrigger);

const Accommodation3DScene = ({ accommodationData }) => {
  const containerRef = useRef(null);
  const heroFrameRef = useRef(null);
  const contentRef = useRef(null);
  const kickerRef = useRef(null);
  const titleLinesRef = useRef([]);
  const subtitleRef = useRef(null);
  const tabsWrapRef = useRef(null);
  const tabsDividerRef = useRef(null);
  const tabButtonsRef = useRef({});
  const indicatorRef = useRef(null);
  const deckStageRef = useRef(null);
  const cardWrapsRef = useRef([]);
  const cardInnersRef = useRef([]);
  const cardImagesRef = useRef([]);
  const cardShinesRef = useRef([]);
  const canvasRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { tripState, preselectService } = useTripBuilder();

  const categories = [
    { id: 'all', label: accommodationData?.allLabel || 'Tất cả lựa chọn' },
    ...(accommodationData?.categories || []),
  ];

  const items = accommodationData?.items || [];
  const filteredItems =
    activeCategory === 'all'
      ? items
      : items.filter((item) => item.category === activeCategory);

  const defaultImage =
    items[0]?.image ||
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85';

  const rawTitle = accommodationData?.title || 'Stay Somewhere Extraordinary.';
  const titleLines = typeof rawTitle === 'string' ? rawTitle.split('\n') : [rawTitle];
  const subtitleText =
    accommodationData?.description ||
    'Tuyển chọn 100% Resort 5 sao ven biển, Private Villa có hồ bơi riêng và khách sạn boutique danh tiếng tại Đà Nẵng.';

  // =========================================================================
  // 1. IMAGE PRELOADING (Prevents flashing during dynamic hover crossfades)
  // =========================================================================
  useEffect(() => {
    items.forEach((item) => {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
      }
    });
  }, [items]);

  // =========================================================================
  // 2. POOL WATER RIPPLE CANVAS EFFECT (Smooth organic mathematical waves)
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const renderRipples = () => {
      time += 0.024;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, 'rgba(6, 20, 38, 0.25)');
      grad.addColorStop(1, 'rgba(255, 181, 43, 0.04)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 18) {
          const y = canvas.height * 0.52 + Math.sin(x * 0.012 + time + i * 2) * (7 + i * 4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(renderRipples);
    };

    renderRipples();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // =========================================================================
  // 3. ANIMATED TAB UNDERLINE INDICATOR
  // =========================================================================
  const updateTabIndicator = useCallback(() => {
    const btn = tabButtonsRef.current[activeCategory];
    const indicator = indicatorRef.current;
    if (btn && indicator) {
      const { offsetLeft, offsetWidth } = btn;
      indicator.style.transform = `translateX(${offsetLeft}px)`;
      indicator.style.width = `${offsetWidth}px`;
    }
  }, [activeCategory]);

  useEffect(() => {
    updateTabIndicator();
    window.addEventListener('resize', updateTabIndicator);
    return () => window.removeEventListener('resize', updateTabIndicator);
  }, [updateTabIndicator]);

  // =========================================================================
  // 4. CINEMATIC SCROLL TIMELINE (0-20%, 20-40%, 40-65%, 65-100% Hold)
  // =========================================================================
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 769px) and (min-height: 561px)',
        isMobile: '(max-width: 768px)',
        isShortHeight: '(max-height: 560px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isDesktop, reduceMotion, isShortHeight } = context.conditions;

        if (reduceMotion) {
          return;
        }

        const pinDistance =
          isDesktop && !isShortHeight
            ? '+=240%'
            : !isShortHeight
            ? '+=150%'
            : null;

        if (!pinDistance) return; // Natural flow on short viewports

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: pinDistance,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        // -------------------------------------------------------------------
        // STAGE 1: 0% – 20% Cinematic Section Entrance
        // -------------------------------------------------------------------
        // Background Hero Mask Reveal (gently expands from rounded framed portal)
        if (heroFrameRef.current) {
          tl.fromTo(
            heroFrameRef.current,
            { clipPath: 'inset(6% 4% 6% 4% round 24px)', scale: 1.08 },
            { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1.0, ease: 'power2.inOut', duration: 0.2 },
            0
          );
        }

        // Kicker fade in
        if (kickerRef.current) {
          tl.fromTo(
            kickerRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.12 },
            0.04
          );
        }

        // Title lines text mask reveal
        const titleEls = titleLinesRef.current.filter(Boolean);
        if (titleEls.length > 0) {
          tl.fromTo(
            titleEls,
            { yPercent: 110 },
            { yPercent: 0, stagger: 0.04, ease: 'power3.out', duration: 0.16 },
            0.06
          );
        }

        // Subtitle description reveal
        if (subtitleRef.current) {
          tl.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.12 },
            0.12
          );
        }

        // Filter bar underline expansion
        if (tabsDividerRef.current) {
          tl.fromTo(
            tabsDividerRef.current,
            { scaleX: 0 },
            { scaleX: 1, ease: 'power2.inOut', duration: 0.15 },
            0.12
          );
        }

        if (tabsWrapRef.current) {
          tl.fromTo(
            tabsWrapRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.12 },
            0.14
          );
        }

        // -------------------------------------------------------------------
        // STAGE 2 & 3: 20% – 40% & 40% – 65% Spatial Hotel Collection Reveal
        // Cards advance along Z-depth and rotateY diminishes to 0
        // -------------------------------------------------------------------
        const wraps = cardWrapsRef.current.filter(Boolean);
        if (wraps.length > 0 && isDesktop) {
          // Card 1 (Left): Starts deeper, slight rotateY to the right
          tl.fromTo(
            wraps[0],
            {
              transform: 'perspective(1400px) translate3d(-15px, 60px, -240px) rotateY(10deg)',
              opacity: 0,
            },
            {
              transform: 'perspective(1400px) translate3d(0px, 0px, 0px) rotateY(0deg)',
              opacity: 1,
              ease: 'power2.out',
              duration: 0.35,
            },
            0.2
          );

          // Card 2 (Center): Enters with proud depth
          if (wraps[1]) {
            tl.fromTo(
              wraps[1],
              {
                transform: 'perspective(1400px) translate3d(0px, 80px, -160px) rotateY(-4deg)',
                opacity: 0,
              },
              {
                transform: 'perspective(1400px) translate3d(0px, 0px, 0px) rotateY(0deg)',
                opacity: 1,
                ease: 'power2.out',
                duration: 0.35,
              },
              0.26
            );
          }

          // Card 3 (Right): Starts deeper, slight rotateY to the left
          if (wraps[2]) {
            tl.fromTo(
              wraps[2],
              {
                transform: 'perspective(1400px) translate3d(15px, 60px, -240px) rotateY(-10deg)',
                opacity: 0,
              },
              {
                transform: 'perspective(1400px) translate3d(0px, 0px, 0px) rotateY(0deg)',
                opacity: 1,
                ease: 'power2.out',
                duration: 0.35,
              },
              0.32
            );
          }
        } else if (wraps.length > 0 && !isDesktop) {
          // Mobile: clean vertical stagger without heavy 3D perspective
          tl.fromTo(
            wraps,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out', duration: 0.3 },
            0.2
          );
        }

        // -------------------------------------------------------------------
        // STAGE 4: 65% – 100% Interactive Cinematic Hold
        // The deck settles completely into catalogue alignment, fully interactive
        // -------------------------------------------------------------------
        // Timeline completes and holds steady, giving user comfortable distance to browse
      },
      containerRef
    );

    return () => mm.revert();
  }, []);

  // =========================================================================
  // 5. PREMIUM 3D CARD INTERACTION (Smooth Perspective Tilt & Specular Shine)
  // Operates strictly on inner card elements, independent of scroll transforms
  // =========================================================================
  const handleCardMouseMove = (e, idx) => {
    const card = cardInnersRef.current[idx];
    const img = cardImagesRef.current[idx];
    const shine = cardShinesRef.current[idx];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max 2.5 degrees
    const rotateX = ((y - centerY) / centerY) * -2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;

    card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;

    // Gentle parallax shift on photo
    if (img) {
      const moveX = ((x - centerX) / centerX) * -4;
      const moveY = ((y - centerY) / centerY) * -4;
      img.style.transform = `scale(1.05) translate(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px)`;
    }

    // Dynamic champagne specular reflection
    if (shine) {
      shine.style.background = `radial-gradient(circle 180px at ${x}px ${y}px, rgba(255, 225, 140, 0.16), transparent 75%)`;
      shine.style.opacity = '1';
    }
  };

  const handleCardMouseLeave = (e, idx) => {
    const card = cardInnersRef.current[idx];
    const img = cardImagesRef.current[idx];
    const shine = cardShinesRef.current[idx];

    if (card) {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }
    if (img) {
      img.style.transform = 'scale(1) translate(0px, 0px)';
    }
    if (shine) {
      shine.style.opacity = '0';
    }
    setHoveredImage(null);
  };

  // =========================================================================
  // 6. CINEMATIC FILTER TRANSITION WITH FLIP STAGGER
  // =========================================================================
  const handleCategoryChange = (catId) => {
    if (catId === activeCategory || isTransitioning) return;
    setIsTransitioning(true);

    const wraps = cardWrapsRef.current.filter(Boolean);

    // Fade out current cards cleanly
    gsap.to(wraps, {
      opacity: 0,
      y: 12,
      duration: 0.18,
      stagger: 0.03,
      ease: 'power2.in',
      onComplete: () => {
        setActiveCategory(catId);
        // After DOM update, fade in new cards with stagger
        setTimeout(() => {
          const newWraps = cardWrapsRef.current.filter(Boolean);
          gsap.fromTo(
            newWraps,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.06,
              ease: 'power2.out',
              onComplete: () => setIsTransitioning(false),
            }
          );
        }, 30);
      },
    });
  };

  // =========================================================================
  // 7. LUXURY SELECTION HANDLER (Trip Builder Integration)
  // =========================================================================
  const handleSelectAccommodation = (item) => {
    preselectService('accommodation', item, true);
  };

  return (
    <section className="acc-3d-section" ref={containerRef} id="accommodation">
      {/* Dynamic Multi-layered Background with Crossfade & Mask Reveal */}
      <div className="acc-hero-bg-frame" ref={heroFrameRef}>
        {/* Base default background layer */}
        <div
          className={`acc-bg-layer ${!hoveredImage || hoveredImage === defaultImage ? 'acc-bg-active' : ''}`}
          style={{ backgroundImage: `url(${defaultImage})` }}
        />

        {/* Dynamic hovered resort crossfade layer */}
        {hoveredImage && hoveredImage !== defaultImage && (
          <div
            className="acc-bg-layer acc-bg-active acc-bg-dynamic"
            style={{ backgroundImage: `url(${hoveredImage})` }}
          />
        )}

        {/* Organic Water Ripple Canvas */}
        <canvas className="acc-water-canvas" ref={canvasRef} />

        {/* Luxury Atmospheric Navy & Champagne Radial Gradient */}
        <div className="acc-3d-gradient" />
        <div className="acc-vignette-overlay" />
      </div>

      {/* Main Section Content Stage */}
      <div className="dest-container acc-3d-hero-content" ref={contentRef}>
        {/* Section Header with Line Mask Reveal */}
        <header className="acc-3d-hero-header">
          <div className="acc-kicker-mask">
            <span className="dest-kicker acc-kicker" ref={kickerRef}>
              <Bed size={14} className="acc-kicker-icon" />
              <span>PREMIUM ACCOMMODATION</span>
            </span>
          </div>

          <h2 className="acc-3d-title">
            {titleLines.map((line, idx) => (
              <span key={idx} className="acc-title-line-mask">
                <span
                  className="acc-title-line"
                  ref={(el) => (titleLinesRef.current[idx] = el)}
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>

          <p className="acc-3d-sub" ref={subtitleRef}>
            {subtitleText}
          </p>
        </header>

        {/* Category Tabs with Animated Underline */}
        <div className="acc-tabs-wrapper" ref={tabsWrapRef}>
          <div className="acc-3d-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                ref={(el) => (tabButtonsRef.current[cat.id] = el)}
                className={`acc-tab-btn ${activeCategory === cat.id ? 'acc-tab-btn-active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
            {/* Animated Tab Underline Pill */}
            <span className="acc-tab-indicator" ref={indicatorRef} />
          </div>
          <div className="acc-tabs-line-divider" ref={tabsDividerRef} />
        </div>

        {/* 3D Spatial Hotel Collection Deck */}
        <div className="acc-3d-deck-stage" ref={deckStageRef}>
          <div className="acc-3d-cards-deck">
            {filteredItems.slice(0, 3).map((item, index) => {
              const isChosen = tripState.accommodationName === item.name;
              return (
                <div
                  key={item.id}
                  className="acc-card-scroll-wrap"
                  ref={(el) => (cardWrapsRef.current[index] = el)}
                >
                  <article
                    className={`acc-deck-card ${isChosen ? 'acc-deck-card-chosen' : ''}`}
                    onMouseEnter={() => setHoveredImage(item.image)}
                    onMouseLeave={(e) => handleCardMouseLeave(e, index)}
                    onMouseMove={(e) => handleCardMouseMove(e, index)}
                    ref={(el) => (cardInnersRef.current[index] = el)}
                  >
                    {/* Champagne Gold Light Sweep Animation for Chosen Card */}
                    {isChosen && <div className="acc-card-light-sweep" aria-hidden="true" />}

                    {/* Interactive Specular Reflection Shine */}
                    <div
                      className="acc-card-specular-shine"
                      ref={(el) => (cardShinesRef.current[index] = el)}
                      aria-hidden="true"
                    />

                    {/* Image Box */}
                    <div className="acc-deck-img-box">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="acc-card-img"
                        ref={(el) => (cardImagesRef.current[index] = el)}
                        loading="lazy"
                      />
                      <div className="acc-deck-img-overlay" />
                      <div className="acc-deck-badges">
                        <span className="dest-badge dest-badge-white">
                          <Star size={11} fill="#FFB52B" color="#FFB52B" />
                          <span>{item.stars} Sao</span>
                        </span>
                        {item.badge && (
                          <span className="dest-badge dest-badge-gold">
                            <Sparkles size={11} />
                            <span>{item.badge}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="acc-deck-body">
                      <div className="acc-deck-loc">
                        <MapPin size={13} className="acc-loc-icon" />
                        <span>{item.location}</span>
                      </div>

                      <h3 className="acc-deck-name">{item.name}</h3>

                      <div className="acc-deck-highlights">
                        {item.highlights.slice(0, 3).map((hl, i) => (
                          <div key={i} className="acc-deck-hl">
                            <CheckCircle2 size={13} className="acc-check-icon" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        className={`acc-deck-choose-btn ${isChosen ? 'acc-deck-btn-chosen' : ''}`}
                        onClick={() => handleSelectAccommodation(item)}
                      >
                        {isChosen ? (
                          <span className="acc-btn-content">
                            <CheckCircle2 size={14} className="acc-btn-check-icon" />
                            <span>{accommodationData?.btnChosen || 'Đã chọn lưu trú này'}</span>
                          </span>
                        ) : (
                          <span className="acc-btn-content">
                            <span>{accommodationData?.btnSelect || 'Chọn vào hành trình'}</span>
                            <ArrowRight size={13} className="acc-btn-arrow-icon" />
                          </span>
                        )}
                      </button>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accommodation3DScene;
