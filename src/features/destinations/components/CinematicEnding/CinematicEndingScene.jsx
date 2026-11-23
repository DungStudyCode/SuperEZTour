import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../../../../constants/brand.config';
import { useConsultation } from '../../../../context/ConsultationContext';
import { useLanguage } from '../../../../context/LanguageContext';
import './CinematicEndingScene.css';

gsap.registerPlugin(ScrollTrigger);

const CinematicEndingScene = ({ ctaData }) => {
  const containerRef = useRef(null);
  const sunsetBgRef = useRef(null);
  const typographyRef = useRef(null);
  const { openNewConsultation } = useConsultation();
  const { isKorean } = useLanguage();

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

  const handleAction = () => {
    if (ctaData?.openConsultation || !document.getElementById('trip-builder')) {
      openNewConsultation({
        source: 'cinematic-ending',
        destinationId: ctaData?.destinationId || 'da-nang'
      });
    } else {
      const el = document.getElementById('trip-builder');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="cinematic-ending-scene" ref={containerRef} id="final-cta">
      {/* Sunset Background Image with Slow Pullback */}
      <div className="ending-sunset-plane" ref={sunsetBgRef}>
        <img
          src={ctaData?.image || ctaData?.bgImage || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"}
          alt={ctaData?.title || "Hoàng hôn phong cảnh"}
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
          <span>{ctaData?.kicker || 'CINEMATIC FINALE'}</span>
        </span>

        <h2 className="ending-title">
          {ctaData?.title || 'DA NANG IS CALLING.'}
        </h2>

        <p className="ending-philosophy-quote">
          {ctaData?.subtitle || ctaData?.lead || 'Your Destination. Your Experience. Your Schedule. Your Way.'}
        </p>

        <p className="ending-desc">
          {ctaData?.description || 'Không có hai chuyến đi nào giống nhau · Hãy để Super EZ Tour cùng bạn kiến tạo một hành trình độc bản chỉ thuộc về gia đình bạn.'}
        </p>

        <div className="ending-action-row">
          <button
            type="button"
            className="dest-btn-primary ending-cta-main"
            onClick={handleAction}
          >
            <span>{ctaData?.ctaText || ctaData?.primaryCta || ctaData?.actions?.primary || 'Bắt đầu thiết kế chuyến đi'}</span>
            <Compass size={18} />
          </button>

          <button
            type="button"
            className="dest-btn-ghost ending-cta-hotline"
            onClick={() => openNewConsultation({ source: 'ending-cta-quote', destinationId: ctaData?.destinationId || 'da-nang' })}
          >
            <span>{ctaData?.ctaSecondaryText || ctaData?.secondaryCta || (isKorean ? '1:1 맞춤 여행 무료 상담' : 'Tư vấn hành trình riêng 1:1')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CinematicEndingScene;