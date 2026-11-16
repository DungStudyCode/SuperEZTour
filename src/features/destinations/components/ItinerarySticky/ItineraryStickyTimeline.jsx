import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, CheckCircle2, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './ItineraryStickyTimeline.css';

gsap.registerPlugin(ScrollTrigger);

const ItineraryStickyTimeline = ({ itinerariesData }) => {
  const itineraries = itinerariesData || [];
  const [activeItineraryId, setActiveItineraryId] = useState(itineraries[0]?.id || '4d3n');
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const containerRef = useRef(null);
  const pathSvgRef = useRef(null);
  const dayPhotoRef = useRef(null);

  const { applyItinerary } = useTripBuilder();
  const activeItinerary = itineraries.find((it) => it.id === activeItineraryId) || itineraries[0];
  const days = activeItinerary?.days || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalDays = days.length;
      if (totalDays === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalDays * 80}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              totalDays - 1,
              Math.floor(self.progress * totalDays)
            );
            setActiveDayIndex(idx);
          },
        },
      });

      // SVG path progress
      tl.fromTo(
        pathSvgRef.current,
        { strokeDashoffset: 600 },
        { strokeDashoffset: 0, ease: 'none' },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, [days]);

  const currentDay = days[activeDayIndex] || days[0];

  return (
    <section className="itinerary-sticky-scene" ref={containerRef} id="itinerary">
      {/* Background Day Crossfade Ambience */}
      <div className="itinerary-bg-ambience">
        <img
          key={currentDay?.day}
          src={currentDay?.image}
          alt={currentDay?.title}
          className="itinerary-bg-crossfade-img"
        />
        <div className="itinerary-bg-vignette" />
      </div>

      <div className="dest-container itinerary-sticky-content">
        {/* Header Strip */}
        <div className="itinerary-sticky-header">
          <div>
            <span className="dest-kicker itinerary-kicker">
              <Calendar size={14} />
              <span>INTERACTIVE CHAPTER TIMELINE</span>
            </span>
            <h2 className="itinerary-sticky-title">Hành Trình Gợi Ý Độc Bản</h2>
          </div>

          {/* Option Length Switcher */}
          <div className="itinerary-length-tabs">
            {itineraries.map((it) => (
              <button
                key={it.id}
                type="button"
                className={`itinerary-len-btn ${activeItineraryId === it.id ? 'itinerary-len-btn-active' : ''}`}
                onClick={() => {
                  setActiveItineraryId(it.id);
                  setActiveDayIndex(0);
                }}
              >
                <Clock size={14} />
                <span>{it.label.split(' (')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Chapter Timeline Layout */}
        <div className="itinerary-chapters-grid">
          {/* Left Column: Interactive Chapter Day Indicator & SVG Timeline */}
          <div className="itinerary-timeline-col">
            <div className="itinerary-day-counter-badge">
              <span className="itinerary-chapter-lbl">CHƯƠNG</span>
              <strong className="itinerary-chapter-num">
                0{currentDay?.day} <i>/</i> 0{days.length}
              </strong>
            </div>

            {/* Day Dots Selector */}
            <div className="itinerary-day-pills-list">
              {days.map((d, idx) => (
                <div
                  key={d.day}
                  className={`itinerary-day-pill ${activeDayIndex === idx ? 'itinerary-day-pill-active' : ''}`}
                  onClick={() => setActiveDayIndex(idx)}
                >
                  <span className="itinerary-pill-circle">0{d.day}</span>
                  <div className="itinerary-pill-text">
                    <strong>Ngày {d.day}</strong>
                    <span>{d.title.split('–')[0].trim()}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="dest-btn-primary itinerary-apply-cta"
              onClick={() => applyItinerary(activeItinerary)}
            >
              <span>Tùy chỉnh lịch trình {activeItinerary.daysCount}N{activeItinerary.daysCount - 1}Đ này</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Column: Active Day Cinematic Presentation Card */}
          <div className="itinerary-chapter-card">
            <div className="itinerary-chapter-img-box" ref={dayPhotoRef}>
              <img src={currentDay?.image} alt={currentDay?.title} loading="lazy" />
              <div className="itinerary-chapter-gradient" />
              <span className="itinerary-chapter-tag">
                <MapPin size={13} />
                <span>Đà Nẵng · Ngày 0{currentDay?.day}</span>
              </span>
            </div>

            <div className="itinerary-chapter-body">
              <h3 className="itinerary-chapter-title">{currentDay?.title}</h3>

              <div className="itinerary-chapter-highlights">
                {(currentDay?.highlights || []).map((hl, i) => (
                  <div key={i} className="itinerary-hl-item">
                    <CheckCircle2 size={15} className="itinerary-hl-icon" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItineraryStickyTimeline;