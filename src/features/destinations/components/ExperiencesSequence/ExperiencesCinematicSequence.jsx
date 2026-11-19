import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, ArrowRight, ArrowUpRight, Compass } from 'lucide-react';
import './ExperiencesCinematicSequence.css';

gsap.registerPlugin(ScrollTrigger);

const ExperiencesCinematicSequence = ({ ecosystemData }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const services = ecosystemData?.services || [];

  useEffect(() => {
    const totalCards = services.length;
    if (totalCards === 0) return;

    const mm = gsap.matchMedia();

    mm.add({
      isPinReady: '(min-width: 769px) and (min-height: 561px)',
      isMobileOrShort: '(max-width: 768px), (max-height: 560px)',
    }, (context) => {
      const { isPinReady } = context.conditions;
      if (!isPinReady) return;

      const track = trackRef.current;
      if (!track || !containerRef.current) return;

      const scrollDistance = (totalCards - 1) * window.innerWidth * 0.75;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              totalCards - 1,
              Math.floor(self.progress * totalCards)
            );
            setActiveIndex(index);
          },
        },
      });

      // Horizontal scrub transition between 6 scenes
      tl.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 80),
        ease: 'none',
      });
    }, containerRef);

    return () => mm.revert();
  }, [services.length]);

  const scrollToTarget = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="exp-seq-section" ref={containerRef} id="services">
      {/* Background Ambience */}
      <div className="exp-seq-ambient-bg">
        <div className="exp-seq-glow" />
      </div>

      {/* Persistent Header */}
      <div className="dest-container exp-seq-header">
        <div className="exp-seq-header-left">
          <span className="dest-kicker exp-seq-kicker">
            <Layers size={14} />
            <span>CORE ECOSYSTEM</span>
          </span>
          <h2 className="exp-seq-title">
            Everything You Need. Nothing You Don’t.
          </h2>
        </div>

        <div className="exp-seq-header-right">
          <span className="exp-seq-counter">
            0{activeIndex + 1} <i>/</i> 0{services.length}
          </span>
          <span className="exp-seq-scroll-hint">
            {ecosystemData?.scrollHint || 'Cuộn chuột để trải nghiệm 6 phân cảnh →'}
          </span>
        </div>
      </div>

      {/* Kinetic Cinematic Scenes Horizontal Track */}
      <div className="exp-seq-track-wrapper">
        <div className="exp-seq-track" ref={trackRef}>
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className={`exp-seq-card ${activeIndex === idx ? 'exp-seq-card-active' : ''}`}
              onClick={() => scrollToTarget(srv.targetId)}
            >
              {/* Media Plane with Scale Depth */}
              <div className="exp-seq-img-wrap">
                <img src={srv.image} alt={srv.title} loading="lazy" />
                <div className="exp-seq-img-gradient" />
                <span className="exp-seq-num-badge">{srv.number}</span>
              </div>

              {/* Foreground Typography */}
              <div className="exp-seq-card-info">
                <span className="exp-seq-en-label">{srv.titleEn}</span>
                <h3 className="exp-seq-card-title">{srv.title}</h3>
                <p className="exp-seq-card-desc">{srv.desc}</p>

                <div className="exp-seq-btn-link">
                  <span>{ecosystemData?.ctaDetail || 'Khám phá phân cảnh chi tiết'}</span>
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesCinematicSequence;