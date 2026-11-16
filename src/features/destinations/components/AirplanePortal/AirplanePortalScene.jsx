import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Compass, ShieldCheck, ArrowDown } from 'lucide-react';
import './AirplanePortalScene.css';

gsap.registerPlugin(ScrollTrigger);

const AirplanePortalScene = ({ heroData }) => {
  const containerRef = useRef(null);
  const cabinFrameRef = useRef(null);
  const portalMaskRef = useRef(null);
  const cloudLayer1Ref = useRef(null);
  const cloudLayer2Ref = useRef(null);
  const oceanCityRef = useRef(null);
  const typographyRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const quickStatsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline pinned for scrubbing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 0% -> 35%: Dolly towards airplane window
      tl.to(
        cabinFrameRef.current,
        {
          scale: 3.5,
          opacity: 0,
          transformOrigin: 'center center',
          ease: 'power2.inOut',
        },
        0
      )
      // Clouds parallax
      .to(
        cloudLayer1Ref.current,
        {
          scale: 1.8,
          x: '-15%',
          opacity: 0.2,
          ease: 'power1.out',
        },
        0
      )
      .to(
        cloudLayer2Ref.current,
        {
          scale: 1.4,
          x: '15%',
          opacity: 0.1,
          ease: 'power1.out',
        },
        0
      )
      // Reveal the aerial landscape to full bleed
      .to(
        portalMaskRef.current,
        {
          clipPath: 'circle(150% at 50% 50%)',
          borderRadius: '0px',
          ease: 'power2.inOut',
        },
        0.1
      )
      // Ocean & city zoom
      .fromTo(
        oceanCityRef.current,
        { scale: 1.25, filter: 'brightness(0.85)' },
        { scale: 1.0, filter: 'brightness(1)', ease: 'power2.out' },
        0
      )
      // Typography layers entrance
      .fromTo(
        typographyRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, ease: 'power3.out' },
        0.45
      )
      // CTAs & Stats entrance
      .fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.65
      )
      .fromTo(
        quickStatsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.75
      )
      // Hide initial scroll indicator as user scrolls
      .to(
        scrollIndicatorRef.current,
        { opacity: 0, ease: 'power1.out' },
        0.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextEl = document.getElementById('discover');
    if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="portal-scene" ref={containerRef} id="hero-portal">
      {/* 3D Depth View (Seen through airplane window, expanding to fullscreen) */}
      <div className="portal-viewport" ref={portalMaskRef}>
        {/* City Landscape Background */}
        <div className="portal-landscape" ref={oceanCityRef}>
          <img
            src={heroData?.posterImage || 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2000&q=85'}
            alt="Đà Nẵng từ trên cao"
            className="portal-bg-img"
          />
          <div className="portal-vignette" />
        </div>

        {/* Cloud Parallax Layer 1 */}
        <div className="portal-clouds portal-clouds-1" ref={cloudLayer1Ref} />

        {/* Cloud Parallax Layer 2 */}
        <div className="portal-clouds portal-clouds-2" ref={cloudLayer2Ref} />

        {/* Cinematic Content (Revealed inside/after the portal) */}
        <div className="portal-content-layer">
          <div className="dest-container portal-inner-container">
            <div className="portal-typography-box" ref={typographyRef}>
              <div className="portal-badges-row">
                <span className="dest-badge dest-badge-gold">
                  <Sparkles size={13} />
                  <span>{heroData?.badge || 'SUPER EZ TOUR — VIETNAM'}</span>
                </span>
                <span className="dest-badge dest-badge-white">
                  <ShieldCheck size={13} />
                  <span>Tour Riêng 100% · Không Ghép Đoàn</span>
                </span>
              </div>

              <h1 className="portal-hero-title">
                {heroData?.title || 'ĐÀ NẴNG'}
              </h1>

              <p className="portal-hero-tagline">
                {heroData?.subtitle || 'Beyond the Ordinary.'}
              </p>

              <p className="portal-hero-lead">
                {heroData?.headline || 'Khám phá Đà Nẵng theo cách của riêng bạn.'}
              </p>
            </div>

            {/* CTAs */}
            <div className="portal-ctas-row" ref={ctaGroupRef}>
              <button
                type="button"
                className="dest-btn-primary portal-cta-btn"
                onClick={() => {
                  const el = document.getElementById('trip-builder');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Thiết kế chuyến đi riêng</span>
                <Compass size={18} />
              </button>

              <button
                type="button"
                className="dest-btn-ghost portal-cta-ghost"
                onClick={scrollToNext}
              >
                <span>Khám phá Đà Nẵng</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="portal-stats-strip" ref={quickStatsRef}>
              {(heroData?.quickStats || []).map((st, i) => (
                <div key={i} className="portal-stat-col">
                  <span className="portal-stat-num">{st.value}</span>
                  <span className="portal-stat-name">{st.label}</span>
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
        <div className="cabin-caption-badge">
          <span>Chuyến bay đang tiếp cận Đà Nẵng · Cuộn để bước vào thành phố</span>
        </div>
      </div>

      {/* Interactive Scroll Mouse */}
      <div className="portal-scroll-indicator" ref={scrollIndicatorRef} onClick={scrollToNext}>
        <span className="portal-scroll-label">Cuộn chuột để xuyên qua mây trời</span>
        <div className="portal-mouse-icon">
          <div className="portal-mouse-wheel" />
        </div>
        <ArrowDown size={14} className="portal-arrow-pulse" />
      </div>
    </section>
  );
};

export default AirplanePortalScene;