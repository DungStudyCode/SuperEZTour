import React, { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import './CinematicHero.css';

const CinematicHero = ({ heroData, onExploreClick, onBuildClick }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const kickerRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2 },
          '-=0.5'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cinematic-hero" ref={heroRef} id="hero">
      {/* Background Media with Parallax/Zoom effect */}
      <div className="cinematic-hero-bg">
        <img
          src={heroData?.posterImage || 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2000&q=85'}
          alt={heroData?.title || 'Đà Nẵng'}
          className="cinematic-hero-img"
        />
        <div className="cinematic-hero-gradient" />
        <div className="cinematic-hero-noise" />
      </div>

      {/* Main Content Area */}
      <div className="cinematic-hero-content dest-container">
        {/* Kicker badge */}
        <div className="cinematic-hero-kicker" ref={kickerRef}>
          <span className="cinematic-hero-badge">
            <Sparkles size={14} className="cinematic-icon-gold" />
            <span>{heroData?.badge || 'SUPER EZ TOUR — VIETNAM'}</span>
          </span>
          <span className="cinematic-hero-pill-private">
            <ShieldCheck size={14} />
            <span>Tour riêng 100% · Không ghép đoàn</span>
          </span>
        </div>

        {/* Editorial Big Title */}
        <h1 className="cinematic-hero-title" ref={titleRef}>
          {heroData?.title || 'ĐÀ NẴNG'}
        </h1>

        {/* Subtitle & Tagline */}
        <div className="cinematic-hero-sub-block" ref={subtitleRef}>
          <p className="cinematic-hero-tagline">{heroData?.subtitle || 'Beyond the Ordinary.'}</p>
          <p className="cinematic-hero-desc">
            {heroData?.headline || 'Khám phá Đà Nẵng theo cách của riêng bạn.'}
          </p>
        </div>

        {/* Dual CTAs */}
        <div className="cinematic-hero-ctas" ref={ctaRef}>
          <button
            type="button"
            onClick={() => scrollToSection('trip-builder')}
            className="dest-btn-primary cinematic-cta-main"
          >
            <span>Thiết kế chuyến đi riêng</span>
            <Compass size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('discover')}
            className="dest-btn-ghost cinematic-cta-secondary"
          >
            <span>Khám phá Đà Nẵng</span>
          </button>
        </div>

        {/* Bottom Quick Stats Strip */}
        <div className="cinematic-hero-stats" ref={statsRef}>
          {(heroData?.quickStats || []).map((stat, idx) => (
            <div key={idx} className="cinematic-stat-item">
              <span className="cinematic-stat-val">{stat.value}</span>
              <span className="cinematic-stat-lbl">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="cinematic-scroll-indicator" onClick={() => scrollToSection('discover')}>
        <span className="cinematic-scroll-text">Cuộn để khám phá</span>
        <div className="cinematic-scroll-mouse">
          <div className="cinematic-scroll-wheel" />
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;