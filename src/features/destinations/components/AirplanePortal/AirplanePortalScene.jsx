import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Compass, ShieldCheck, ArrowDown, ChevronRight } from 'lucide-react';
import './AirplanePortalScene.css';

gsap.registerPlugin(ScrollTrigger);

const AirplanePortalScene = ({ heroData }) => {
  const containerRef = useRef(null);
  const cabinFrameRef = useRef(null);
  const portalMaskRef = useRef(null);
  const journeyContainerRef = useRef(null);

  // 4 Journey Stages refs
  const stage1Ref = useRef(null);
  const stage2Ref = useRef(null);
  const stage3Ref = useRef(null);
  const stage4Ref = useRef(null);
  const transitFogRef = useRef(null);
  const ambientLightRef = useRef(null);

  // Cloud parallax layers
  const cloudLayer1Ref = useRef(null);
  const cloudLayer2Ref = useRef(null);

  // Hero revealed content
  const contentLayerRef = useRef(null);
  const typographyRef = useRef(null);
  const badgesRef = useRef(null);
  const titleWordsRef = useRef([]);
  const taglineRef = useRef(null);
  const leadRef = useRef(null);

  const ctaGroupRef = useRef(null);
  const ctaPrimaryRef = useRef(null);
  const ctaGhostRef = useRef(null);

  const quickStatsRef = useRef(null);
  const statColsRef = useRef([]);
  const statNumRefs = useRef([]);
  const statDividersRef = useRef([]);
  const scrollIndicatorRef = useRef(null);

  const hasCountedUpRef = useRef(false);

  // Dynamic Title splitting for Vietnamese accent-safe Text Mask Reveal
  const heroTitle = heroData?.title || 'ĐÀ NẴNG';
  const titleWords = heroTitle.split(' ');

  // Images for the 4 cinematic journey stages
  const stageImages = {
    stage1:
      heroData?.introJourney?.stage1 ||
      'https://images.unsplash.com/photo-1674296067534-0f9769040781?auto=format&fit=crop&w=2000&q=85',
    stage2:
      heroData?.introJourney?.stage2 ||
      'https://images.unsplash.com/photo-1693282815001-0471e68d3bc0?auto=format&fit=crop&w=2000&q=85',
    stage3:
      heroData?.introJourney?.stage3 ||
      'https://images.unsplash.com/photo-1603852452378-a4e8d84324a2?auto=format&fit=crop&w=2000&q=85',
    stage4:
      heroData?.introJourney?.stage4 ||
      heroData?.posterImage ||
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2000&q=85',
  };

  // Preload all 4 journey images into browser cache immediately
  useEffect(() => {
    Object.values(stageImages).forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
    });
  }, [stageImages.stage1, stageImages.stage2, stageImages.stage3, stageImages.stage4]);

  // Subtle Mouse Parallax inside Cabin (Desktop only, when near top)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.scrollY > 200) return;
      if (window.innerWidth <= 768) return;

      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2;
      const yNorm = (e.clientY / innerHeight - 0.5) * 2;

      if (journeyContainerRef.current) {
        gsap.to(journeyContainerRef.current, {
          x: xNorm * 10,
          y: yNorm * 7,
          duration: 1.4,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      }
      if (cabinFrameRef.current) {
        gsap.to(cabinFrameRef.current, {
          x: xNorm * -4,
          y: yNorm * -3,
          duration: 1.4,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Magnetic Hover for CTAs (Desktop only)
  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const setupMagnetic = (el) => {
      if (!el) return () => {};

      const handleMove = (e) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);

        gsap.to(el, {
          x: relX * 0.22,
          y: relY * 0.22,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const handleLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: 'elastic.out(1.1, 0.45)',
          overwrite: 'auto',
        });
      };

      el.addEventListener('mousemove', handleMove);
      el.addEventListener('mouseleave', handleLeave);

      return () => {
        el.removeEventListener('mousemove', handleMove);
        el.removeEventListener('mouseleave', handleLeave);
      };
    };

    const cleanup1 = setupMagnetic(ctaPrimaryRef.current);
    const cleanup2 = setupMagnetic(ctaGhostRef.current);

    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);

  // Verified Number Count-up (Runs exactly once per session)
  const triggerCountUp = () => {
    if (hasCountedUpRef.current) return;
    hasCountedUpRef.current = true;

    const stats = heroData?.quickStats || [];
    stats.forEach((st, idx) => {
      const el = statNumRefs.current[idx];
      if (!el) return;

      const raw = st.value || '';
      // Percentage with decimal (e.g. "99.8%")
      if (raw.includes('%')) {
        const num = parseFloat(raw);
        if (!isNaN(num)) {
          const obj = { val: Math.max(0, num - 15) };
          gsap.to(obj, {
            val: num,
            duration: 2.0,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${obj.val.toFixed(1)}%`;
            },
          });
          return;
        }
      }

      // Value with "+" (e.g. "30+ km")
      if (raw.includes('+')) {
        const match = raw.match(/(\d+)\s*\+\s*(.*)/);
        if (match) {
          const num = parseInt(match[1], 10);
          const suffix = match[2] ? `+ ${match[2]}` : '+';
          const obj = { val: 0 };
          gsap.to(obj, {
            val: num,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${Math.round(obj.val)}${suffix}`;
            },
          });
          return;
        }
      }

      // Simple integer followed by text (e.g. "3 Di sản")
      const matchInt = raw.match(/^(\d+)\s*(.*)$/);
      if (matchInt && !raw.includes('-')) {
        const num = parseInt(matchInt[1], 10);
        const suffix = matchInt[2] ? ` ${matchInt[2]}` : '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: num,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${suffix}`;
          },
        });
        return;
      }

      // Static fallback (e.g. "26°C - 29°C")
      el.textContent = raw;
    });
  };

  // Master GSAP ScrollTrigger Scrubbing Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;

      // Responsive ellipse geometries for the window reveal
      const initialClip = isMobile
        ? 'ellipse(125px 185px at 50% 48%)'
        : 'ellipse(170px 240px at 50% 48%)';
      const stage1Clip = isMobile
        ? 'ellipse(135px 200px at 50% 48%)'
        : 'ellipse(180px 255px at 50% 48%)';
      const stage2Clip = isMobile
        ? 'ellipse(240px 340px at 50% 49%)'
        : 'ellipse(360px 480px at 50% 49%)';
      const stage2HoldClip = isMobile
        ? 'ellipse(320px 420px at 50% 49%)'
        : 'ellipse(460px 580px at 50% 49%)';
      const stage3Clip = isMobile
        ? 'ellipse(600px 750px at 50% 50%)'
        : 'ellipse(850px 1000px at 50% 50%)';
      const fullClip = 'ellipse(160% 160% at 50% 50%)';

      // Set initial state
      gsap.set(portalMaskRef.current, { clipPath: initialClip });

      // Master Timeline:
      // Desktop: 550vh Intro + 200vh Hero Pin = +=750%
      // Mobile: 300vh Intro + 120vh Hero Pin = +=420%
      // Total 100 duration units:
      // - 0.0 -> 72.0: Intro Journey to Da Nang (Coast -> Mountains -> Bridge -> Fullscreen)
      // - 72.0 -> 100.0: Dedicated Hero Cinematic Pin (Grand Reveal & >40% Cinematic Hold)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: isMobile ? '+=420%' : '+=750%',
          pin: true,
          scrub: 2,
          anticipatePin: 1,
        },
      });

      // =================================================================
      // PHASE 1: INTRO JOURNEY (t: 0.0 -> 72.0)
      // =================================================================

      // 0.0 -> 18.0: Approach Da Nang Coastline Hold (0% - 25% of Intro)
      tl.to(
        scrollIndicatorRef.current,
        { opacity: 0, y: 18, duration: 3, ease: 'power1.out' },
        0
      )
        .fromTo(
          portalMaskRef.current,
          { clipPath: initialClip },
          { clipPath: stage1Clip, duration: 18, ease: 'none' },
          0
        )
        .to(
          cabinFrameRef.current,
          { scale: 1.10, duration: 18, ease: 'none' },
          0
        )
        .to(
          stage1Ref.current,
          { scale: 1.08, duration: 18, ease: 'none' },
          0
        )
        .to(
          cloudLayer1Ref.current,
          { scale: 1.25, x: '-10%', duration: 18, ease: 'none' },
          0
        )
        .to(
          cloudLayer2Ref.current,
          { scale: 1.20, x: '10%', duration: 18, ease: 'none' },
          0
        )

        // 18.0 -> 29.0: Transit to Mountains (25% - 40% of Intro)
        .to(
          portalMaskRef.current,
          { clipPath: stage2Clip, duration: 11, ease: 'power1.inOut' },
          18
        )
        .to(
          cabinFrameRef.current,
          { scale: 1.9, opacity: 0.5, duration: 11, ease: 'power1.inOut' },
          18
        )
        .to(
          cloudLayer1Ref.current,
          { scale: 1.8, x: '-22%', opacity: 0.3, duration: 11, ease: 'power1.out' },
          18
        )
        .to(
          cloudLayer2Ref.current,
          { scale: 1.7, x: '22%', opacity: 0.3, duration: 11, ease: 'power1.out' },
          18
        )
        .fromTo(
          transitFogRef.current,
          { opacity: 0 },
          { opacity: 0.55, duration: 5, ease: 'power1.inOut' },
          18
        )
        .to(
          transitFogRef.current,
          { opacity: 0.05, duration: 6, ease: 'power1.inOut' },
          23
        )
        .to(
          stage1Ref.current,
          { scale: 1.18, opacity: 0, duration: 8, ease: 'power1.inOut' },
          19
        )
        .fromTo(
          stage2Ref.current,
          { opacity: 0, scale: 1.18 },
          { opacity: 1, scale: 1.08, duration: 8, ease: 'power1.out' },
          21
        )

        // 29.0 -> 47.0: Ba Na Hills Rainforest & Mountains Hold (40% - 65% of Intro)
        .to(
          stage2Ref.current,
          { scale: 1.16, duration: 18, ease: 'none' },
          29
        )
        .to(
          portalMaskRef.current,
          { clipPath: stage2HoldClip, duration: 18, ease: 'none' },
          29
        )
        .to(
          cabinFrameRef.current,
          { scale: 2.5, opacity: 0.35, duration: 18, ease: 'none' },
          29
        )

        // 47.0 -> 65.0: Discover & Approach Golden Bridge (65% - 90% of Intro)
        .to(
          transitFogRef.current,
          { opacity: 0.45, duration: 4, ease: 'power1.inOut' },
          47
        )
        .to(
          transitFogRef.current,
          { opacity: 0.0, duration: 5, ease: 'power1.inOut' },
          51
        )
        .to(
          stage2Ref.current,
          { scale: 1.25, opacity: 0, duration: 7, ease: 'power1.inOut' },
          47
        )
        .fromTo(
          stage3Ref.current,
          { opacity: 0, scale: 1.20 },
          { opacity: 1, scale: 1.08, duration: 7, ease: 'power1.out' },
          47
        )
        .to(
          stage3Ref.current,
          { scale: 1.15, duration: 12, ease: 'none' },
          53
        )
        .to(
          portalMaskRef.current,
          { clipPath: stage3Clip, duration: 18, ease: 'power1.inOut' },
          47
        )
        .to(
          cabinFrameRef.current,
          { scale: 3.8, opacity: 0.08, duration: 18, ease: 'power1.inOut' },
          47
        )
        .to(
          [cloudLayer1Ref.current, cloudLayer2Ref.current],
          { opacity: 0, duration: 8, ease: 'power1.out' },
          47
        )

        // 65.0 -> 72.0: Fullscreen Window Expansion (90% - 100% of Intro)
        .to(
          portalMaskRef.current,
          {
            clipPath: fullClip,
            borderRadius: '0px',
            duration: 6,
            ease: 'power2.inOut',
          },
          65
        )
        .to(
          cabinFrameRef.current,
          {
            scale: 4.4,
            opacity: 0,
            duration: 6,
            ease: 'power2.inOut',
          },
          65
        )
        .to(
          stage3Ref.current,
          {
            scale: 1.18,
            opacity: 0,
            duration: 5,
            ease: 'power1.inOut',
          },
          65
        )
        .fromTo(
          stage4Ref.current,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1.0, duration: 5, ease: 'power2.out' },
          65
        );

      // =================================================================
      // PHASE 2: HERO CINEMATIC GRAND REVEAL & HOLD (t: 72.0 -> 100.0)
      // Dedicated 200vh on Desktop (120vh on Mobile)
      // =================================================================

      // Background Motion: Slow Zoom (1.00 -> 1.075) & Vertical Camera Drift
      tl.to(
        stage4Ref.current,
        {
          scale: 1.075,
          y: '-2.5%',
          duration: 28,
          ease: 'none',
        },
        72
      )
        // Ambient Golden Sunlight Sweep across the Golden Bridge
        .fromTo(
          ambientLightRef.current,
          { opacity: 0 },
          { opacity: 0.65, duration: 10, ease: 'power1.inOut' },
          72
        )

        // 1. Badges Entrance
        .fromTo(
          badgesRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 3.5, ease: 'power2.out' },
          72.5
        )

        // 2. Title "ĐÀ NẴNG" Text Mask Reveal (Staggered clusters, blur-to-clear)
        .fromTo(
          titleWordsRef.current,
          { yPercent: 110, filter: 'blur(10px)', opacity: 0 },
          {
            yPercent: 0,
            filter: 'blur(0px)',
            opacity: 1,
            duration: 5.5,
            stagger: 1.2,
            ease: 'power2.out',
          },
          74.5
        )

        // 3. Slogan "Beyond the Ordinary." (Fade-in with blur-to-clear)
        .fromTo(
          taglineRef.current,
          { opacity: 0, filter: 'blur(8px)', y: 18 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 4.5, ease: 'power2.out' },
          78.5
        )

        // 4. Description Lead
        .fromTo(
          leadRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 3.5, ease: 'power2.out' },
          81.0
        )

        // 5. CTA Buttons Sequential Entrance
        .fromTo(
          ctaPrimaryRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 3.0, ease: 'power2.out' },
          82.5
        )
        .fromTo(
          ctaGhostRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 3.0, ease: 'power2.out' },
          83.5
        )

        // 6. Quick Stats Reveal & Number Count-up Trigger
        .fromTo(
          quickStatsRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 3.5,
            ease: 'power2.out',
            onStart: () => {
              triggerCountUp();
            },
          },
          85.0
        )
        // Staggered Stat Columns & Vertical Dividers
        .fromTo(
          statColsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 2.5, stagger: 0.5, ease: 'power2.out' },
          85.5
        )
        .fromTo(
          statDividersRef.current,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 2.5, stagger: 0.4, ease: 'power2.out' },
          86.0
        );

      // =================================================================
      // 88.0 -> 100.0: PURE CINEMATIC HOLD (>40% of Hero Timeline)
      // All content remains 100% stable, readable, and interactive.
      // Background continues subtle drift until cleanly unpinning at 100.0.
      // =================================================================
    }, containerRef);

    return () => ctx.revert();
  }, [heroData]);

  const scrollToNext = () => {
    const nextEl = document.getElementById('discover');
    if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="portal-scene" ref={containerRef} id="hero-portal">
      {/* 3D Depth View (Seen through airplane window, expanding to fullscreen) */}
      <div className="portal-viewport" ref={portalMaskRef}>
        {/* Layered Cinematic Journey Container */}
        <div className="portal-journey-container" ref={journeyContainerRef}>
          {/* Giai đoạn 01: Approach Da Nang (0% - 25% of Intro) */}
          <div className="portal-journey-layer portal-layer-stage1" ref={stage1Ref}>
            <div className="portal-layer-inner portal-idle-drift">
              <img
                src={stageImages.stage1}
                alt="Toàn cảnh bờ biển Mỹ Khê và thành phố Đà Nẵng từ trên cao"
                className="portal-bg-img portal-img-stage1"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Giai đoạn 02: Into the Mountains (25% - 40% of Intro) */}
          <div className="portal-journey-layer portal-layer-stage2" ref={stage2Ref}>
            <div className="portal-layer-inner">
              <img
                src={stageImages.stage2}
                alt="Núi rừng Bà Nà Hills trong sương mây"
                className="portal-bg-img portal-img-stage2"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Giai đoạn 03: Discover & Approach Golden Bridge (65% - 90% of Intro) */}
          <div className="portal-journey-layer portal-layer-stage3" ref={stage3Ref}>
            <div className="portal-layer-inner">
              <img
                src={stageImages.stage3}
                alt="Toàn cảnh kiến trúc Cầu Vàng Bà Nà Hills"
                className="portal-bg-img portal-img-stage3"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Giai đoạn 04: Welcome to Da Nang - Exact Hero Backdrop (90% - 100% of Intro & Hero Section) */}
          <div className="portal-journey-layer portal-layer-stage4" ref={stage4Ref}>
            <div className="portal-layer-inner">
              <img
                src={stageImages.stage4}
                alt="Cầu Vàng biểu tượng Đà Nẵng"
                className="portal-bg-img portal-img-stage4"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Atmospheric Transit Mist & Fog Overlay */}
          <div className="portal-transit-fog" ref={transitFogRef} />

          {/* Ambient Warm Sunlight Drift for Hero Section */}
          <div className="portal-ambient-light" ref={ambientLightRef} />

          <div className="portal-vignette" />
        </div>

        {/* Floating Clouds Layer 1 */}
        <div className="portal-clouds portal-clouds-1" ref={cloudLayer1Ref} />

        {/* Floating Clouds Layer 2 */}
        <div className="portal-clouds portal-clouds-2" ref={cloudLayer2Ref} />

        {/* Cinematic Content (Revealed inside/after the portal) */}
        <div className="portal-content-layer" ref={contentLayerRef}>
          <div className="dest-container portal-inner-container">
            <div className="portal-typography-box" ref={typographyRef}>
              <div className="portal-badges-row" ref={badgesRef}>
                <span className="dest-badge dest-badge-gold">
                  <Sparkles size={13} />
                  <span>{heroData?.badge || 'SUPER EZ TOUR — VIETNAM'}</span>
                </span>
                <span className="dest-badge dest-badge-white">
                  <ShieldCheck size={13} />
                  <span>{heroData?.badgeSecondary || 'Tour Riêng 100% · Không Ghép Đoàn'}</span>
                </span>
              </div>

              <h1 className="portal-hero-title" aria-label={heroTitle}>
                {titleWords.map((word, idx) => (
                  <span key={idx} className="title-mask-wrapper">
                    <span
                      className="title-mask-word"
                      ref={(el) => (titleWordsRef.current[idx] = el)}
                    >
                      {word}
                    </span>
                    {idx < titleWords.length - 1 && (
                      <span className="title-mask-space">&nbsp;</span>
                    )}
                  </span>
                ))}
              </h1>

              <p className="portal-hero-tagline" ref={taglineRef}>
                {heroData?.subtitle || 'Beyond the Ordinary.'}
              </p>

              <p className="portal-hero-lead" ref={leadRef}>
                {heroData?.headline || 'Khám phá Đà Nẵng theo cách của riêng bạn.'}
              </p>
            </div>

            {/* CTAs with Magnetic Hover & Light Sweep */}
            <div className="portal-ctas-row" ref={ctaGroupRef}>
              <button
                type="button"
                className="dest-btn-primary portal-cta-btn"
                ref={ctaPrimaryRef}
                onClick={() => {
                  const el = document.getElementById('trip-builder');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="cta-light-sweep-beam" aria-hidden="true" />
                <span>{heroData?.ctaPrimary || 'Thiết kế chuyến đi riêng'}</span>
                <Compass size={18} className="cta-icon-rotate" />
              </button>

              <button
                type="button"
                className="dest-btn-ghost portal-cta-ghost"
                ref={ctaGhostRef}
                onClick={scrollToNext}
              >
                <span>{heroData?.ctaGhost || 'Khám phá Đà Nẵng'}</span>
                <ChevronRight size={17} className="cta-icon-slide" />
              </button>
            </div>

            {/* Quick Stats with Number Count-up & Staggered Dividers */}
            <div className="portal-stats-strip" ref={quickStatsRef}>
              {(heroData?.quickStats || []).map((st, i) => (
                <div
                  key={i}
                  className="portal-stat-col"
                  ref={(el) => (statColsRef.current[i] = el)}
                >
                  <span
                    className="portal-stat-num"
                    ref={(el) => (statNumRefs.current[i] = el)}
                  >
                    {st.value}
                  </span>
                  <span className="portal-stat-name">{st.label}</span>
                  {i < (heroData?.quickStats || []).length - 1 && (
                    <span
                      className="portal-stat-divider"
                      ref={(el) => (statDividersRef.current[i] = el)}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Airplane Cabin & Oval Window Overlay Frame */}
      <div className="cabin-frame-overlay" ref={cabinFrameRef}>
        <div className="cabin-wall">
          <div className="cabin-window-oval">
            <div className="cabin-window-inner-bevel" />
            <div className="cabin-window-glass-glare" />
            <div className="cabin-window-shade-handle" />
          </div>
        </div>
      </div>

      {/* Improved Cinematic Interactive Scroll Prompt Widget */}
      <div className="portal-scroll-indicator" ref={scrollIndicatorRef} onClick={scrollToNext}>
        <div className="portal-scroll-card">
          <span className="portal-scroll-title">
            {heroData?.scrollPrompt?.title || 'Đà Nẵng đang chờ bạn.'}
          </span>
          <span className="portal-scroll-sub">
            {heroData?.scrollPrompt?.action || 'Cuộn để bắt đầu hành trình'}
          </span>
        </div>
        <div className="portal-mouse-icon" aria-hidden="true">
          <div className="portal-mouse-wheel" />
        </div>
        <ArrowDown size={14} className="portal-arrow-pulse" />
      </div>
    </section>
  );
};

export default AirplanePortalScene;
