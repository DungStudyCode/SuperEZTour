import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../../../../constants/brand.config';
import './CinematicEndingScene.css';

gsap.registerPlugin(ScrollTrigger);

const CinematicEndingScene = ({ ctaData }) => {
  const containerRef = useRef(null);
  const sunsetBgRef = useRef(null);
  const typographyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Camera pulls back slowly from city
      tl.fromTo(
        sunsetBgRef.current,
        { scale: 1.25, filter: 'brightness(0.9)' },
        { scale: 1.0, filter: 'brightness(1.05)', ease: 'none' },
        0
      )
      .fromTo(
        typographyRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: 'power2.out' },
        0.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToBuilder = () => {
    const el = document.getElementById('trip-builder');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cinematic-ending-scene" ref={containerRef} id="final-cta">
      {/* Sunset Background Image with Slow Pullback */}
      <div className="ending-sunset-plane" ref={sunsetBgRef}>
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
          alt="Hoàng hôn trên biển Đà Nẵng"
          className="ending-sunset-img"
        />
        <div className="ending-sunset-vignette" />
      </div>

      <div className="dest-container ending-content-container" ref={typographyRef}>
        {/* Brand Seal */}
        <div className="ending-brand-seal">
          <img src={BRAND_CONFIG.logo} alt={BRAND_CONFIG.brandName} className="ending-logo-img" />
        </div>

        <span className="dest-kicker ending-kicker">
          <Sparkles size={14} />
          <span>CINEMATIC FINALE</span>
        </span>

        <h2 className="ending-title">
          DA NANG IS CALLING.
        </h2>

        <p className="ending-philosophy-quote">
          Your Destination. Your Experience. Your Schedule. Your Way.
        </p>

        <p className="ending-desc">
          {ctaData?.description || 'Không có hai chuyến đi nào giống nhau · Hãy để Super EZ Tour cùng bạn kiến tạo một hành trình độc bản chỉ thuộc về gia đình bạn.'}
        </p>

        <div className="ending-action-row">
          <button
            type="button"
            className="dest-btn-primary ending-cta-main"
            onClick={scrollToBuilder}
          >
            <span>{ctaData?.actions?.primary || 'Bắt đầu thiết kế chuyến đi'}</span>
            <Compass size={18} />
          </button>

          <a href="tel:19008899" className="dest-btn-ghost ending-cta-hotline">
            <Phone size={16} />
            <span>{ctaData?.actions?.secondary || 'Hotline 24/7: 1900 8899'}</span>
          </a>

          <a
            href="https://zalo.me"
            target="_blank"
            rel="noopener noreferrer"
            className="ending-cta-zalo"
          >
            <MessageCircle size={16} />
            <span>{ctaData?.actions?.kakao || ctaData?.actions?.zalo || 'Tư vấn qua Zalo'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CinematicEndingScene;