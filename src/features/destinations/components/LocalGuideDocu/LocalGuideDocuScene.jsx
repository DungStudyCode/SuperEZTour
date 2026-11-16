import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, BookOpen, Clock, Languages, ArrowRight, CheckCircle2, UserCheck } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './LocalGuideDocuScene.css';

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  Compass,
  BookOpen,
  Clock,
  Languages
};

const LocalGuideDocuScene = ({ guideData }) => {
  const sceneRef = useRef(null);
  const photoMainRef = useRef(null);
  const photoSubRef = useRef(null);
  const contentColRef = useRef(null);
  const quotePlateRef = useRef(null);

  const { preselectService } = useTripBuilder();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Camera parallax tracking
      tl.fromTo(
        photoMainRef.current,
        { y: 80, scale: 0.95 },
        { y: -40, scale: 1.05, ease: 'none' },
        0
      )
      .fromTo(
        photoSubRef.current,
        { y: -60, rotate: -4 },
        { y: 40, rotate: 2, ease: 'none' },
        0
      )
      .fromTo(
        quotePlateRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, ease: 'power2.out' },
        0.2
      )
      .fromTo(
        contentColRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.1
      );
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  const handleRequestGuide = () => {
    preselectService('guide', { id: 'dedicated' }, true);
  };

  return (
    <section className="guide-docu-scene" ref={sceneRef} id="guide">
      {/* Tailored Background: Topographic Travel Journal & Ambient Sunbeam */}
      <div className="guide-docu-ambient-bg" aria-hidden="true">
        <div className="guide-docu-sunbeam" />
        <div className="guide-docu-topo-overlay" />
        <div className="guide-docu-coords-stamp">
          <span className="guide-stamp-coords">16°04'N · 108°13'E</span>
          <span className="guide-stamp-sep">✦</span>
          <span className="guide-stamp-text">LOCAL HERITAGE & DOCUMENTARY ARCHIVE · DA NANG</span>
        </div>
      </div>

      <div className="dest-container guide-docu-container">
        {/* Documentary Visual Composition */}
        <div className="guide-docu-visual-col">
          <div className="guide-docu-photo-main" ref={photoMainRef}>
            <img
              src={guideData?.image || 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=80'}
              alt="Hướng dẫn viên bản địa Super EZ Tour"
              loading="lazy"
            />
            <div className="guide-docu-badge">
              <UserCheck size={14} />
              <span>Chuyên viên bản địa miền Trung</span>
            </div>
          </div>

          <div className="guide-docu-photo-sub" ref={photoSubRef}>
            <img
              src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=700&q=80"
              alt="Hành trình khám phá văn hóa"
              loading="lazy"
            />
          </div>

          <div className="guide-docu-quote-plate" ref={quotePlateRef}>
            <p className="guide-docu-quote-text">
              {guideData?.quote || '“Một chuyến đi hoàn hảo không đến từ việc bạn đi qua bao nhiêu điểm, mà ở việc bạn đã cảm nhận nơi đó sâu sắc đến nhường nào.”'}
            </p>
            <div className="guide-docu-quote-meta">
              <CheckCircle2 size={15} className="guide-check-gold" />
              <span>Cam kết người bạn đồng hành 1:1 tận tâm</span>
            </div>
          </div>
        </div>

        {/* Narrative & Pillars Column */}
        <div className="guide-docu-content-col" ref={contentColRef}>
          <span className="dest-kicker guide-docu-kicker">
            <Compass size={14} />
            <span>TRAVEL DOCUMENTARY · LOCAL EXPERT</span>
          </span>

          <h2 className="guide-docu-title">
            Explore Like a Local.
          </h2>

          <p className="guide-docu-subtitle">
            Không chỉ tham quan, mà thực sự hiểu điểm đến.
          </p>

          <p className="guide-docu-lead">
            {guideData?.lead}
          </p>

          <div className="guide-docu-pillars-grid">
            {(guideData?.pillars || []).map((p, i) => {
              const IconComp = ICONS[p.icon] || Compass;
              return (
                <div key={i} className="guide-docu-pillar-card">
                  <div className="guide-docu-icon-box">
                    <IconComp size={18} className="guide-docu-icon" />
                  </div>
                  <div>
                    <h4 className="guide-docu-pillar-title">{p.title}</h4>
                    <p className="guide-docu-pillar-desc">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="guide-docu-action-row">
            <button
              type="button"
              className="dest-btn-primary guide-docu-cta-btn"
              onClick={handleRequestGuide}
            >
              <span>Yêu cầu hướng dẫn viên riêng</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalGuideDocuScene;