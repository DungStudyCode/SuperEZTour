import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plane, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './Flight3DScene.css';

gsap.registerPlugin(ScrollTrigger);

const Flight3DScene = ({ flightData }) => {
  const containerRef = useRef(null);
  const airplaneGliderRef = useRef(null);
  const routePathRef = useRef(null);
  const flightCardsRef = useRef(null);
  const airportHubRef = useRef(null);

  const { preselectService } = useTripBuilder();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isPinReady: '(min-width: 769px) and (min-height: 561px)',
      isMobileOrShort: '(max-width: 768px), (max-height: 560px)',
    }, (context) => {
      const { isPinReady } = context.conditions;
      if (!isPinReady) return;

      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 3D Airplane gliding along trajectory
      tl.fromTo(
        airplaneGliderRef.current,
        { x: '-20vw', y: '10vh', rotate: -15, scale: 0.7, opacity: 0 },
        { x: '25vw', y: '30vh', rotate: 25, scale: 1.15, opacity: 1, ease: 'power1.inOut' },
        0
      )
      .to(
        airplaneGliderRef.current,
        { x: '65vw', y: '50vh', rotate: 45, scale: 0.85, opacity: 0.9, ease: 'power1.in' },
        0.5
      )
      // Animated SVG Route stroke dashoffset
      .fromTo(
        routePathRef.current,
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, ease: 'none' },
        0
      )
      // Reveal DAD Hub Airport
      .fromTo(
        airportHubRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.5)' },
        0.4
      )
      // Reveal Flight Routes Cards
      .fromTo(
        flightCardsRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.3
      );
    }, containerRef);

    return () => mm.revert();
  }, []);

  const handleFlightConsult = () => {
    preselectService('flights', { id: 'need_support' }, true);
  };

  return (
    <section className="flight-3d-scene" ref={containerRef} id="flights">
      {/* Sky Space Background with Animated Flight Path */}
      <div className="flight-3d-sky">
        <svg className="flight-path-svg" viewBox="0 0 1440 800" fill="none">
          <path
            ref={routePathRef}
            d="M 100 200 C 400 150, 700 450, 1050 550"
            stroke="url(#flightGrad)"
            strokeWidth="3"
            strokeDasharray="8 8"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="flightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF681E" />
              <stop offset="100%" stopColor="#FFB52B" />
            </linearGradient>
          </defs>
        </svg>

        {/* 3D Airplane Glider Element */}
        <div className="airplane-glider" ref={airplaneGliderRef}>
          <div className="airplane-body-mesh">
            <Plane size={54} className="airplane-icon-3d" />
            <div className="airplane-jet-trail" />
          </div>
        </div>

        {/* Destination DAD Airport Hub Beacon */}
        <div className="airport-hub-beacon" ref={airportHubRef}>
          <div className="beacon-pulse" />
          <div className="beacon-pin">
            <span>DAD</span>
          </div>
          <span className="beacon-name">{flightData?.hubName || 'Sân bay Quốc tế Đà Nẵng'}</span>
        </div>
      </div>

      {/* Foreground Content & Routes */}
      <div className="dest-container flight-3d-content">
        <div className="flight-3d-header">
          <span className="dest-kicker flight-3d-kicker">
            <Plane size={14} />
            <span>{flightData?.kicker || 'AVIATION PREMIUM TRANSIT'}</span>
          </span>
          <h2 className="flight-3d-title">{flightData?.title || 'Your Journey Begins Here.'}</h2>
          <p className="flight-3d-subtitle">
            {flightData?.subtitle || 'Hành trình bắt đầu từ bầu trời · Đồng bộ đón tiễn sân bay bằng xe riêng không phải chờ đợi.'}
          </p>
        </div>

        {/* Routes Cards Grid */}
        <div className="flight-3d-cards-grid" ref={flightCardsRef}>
          {/* Domestic */}
          <div className="flight-3d-card">
            <div className="flight-3d-card-head">
              <span className="flight-3d-tag">{flightData?.domesticTag || 'Đường bay nội địa'}</span>
              <h3>{flightData?.domesticTitle || 'Kết Nối Toàn Quốc Đến DAD'}</h3>
            </div>
            <div className="flight-3d-routes-list">
              {(flightData?.domesticRoutes || []).map((r, i) => (
                <div key={i} className="flight-3d-route-row">
                  <span className="flight-3d-city">{r.from}</span>
                  <div className="flight-3d-arrow">
                    <div className="flight-3d-line" />
                    <Plane size={12} className="flight-3d-plane-micro" />
                  </div>
                  <span className="flight-3d-city flight-3d-dest">{r.to}</span>
                  <span className="flight-3d-time">
                    <Clock size={11} /> {r.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* International */}
          <div className="flight-3d-card">
            <div className="flight-3d-card-head">
              <span className="flight-3d-tag flight-tag-intl">{flightData?.intlTag || 'Đường bay quốc tế'}</span>
              <h3>{flightData?.intlTitle || 'Chuyến Bay Thẳng Quốc Tế'}</h3>
            </div>
            <div className="flight-3d-routes-list">
              {(flightData?.intlRoutes || []).map((r, i) => (
                <div key={i} className="flight-3d-route-row">
                  <span className="flight-3d-city">{r.from}</span>
                  <div className="flight-3d-arrow">
                    <div className="flight-3d-line" />
                    <Plane size={12} className="flight-3d-plane-micro" />
                  </div>
                  <span className="flight-3d-city flight-3d-dest">{r.to}</span>
                  <span className="flight-3d-direct-badge">{flightData?.directBadge || 'Bay thẳng'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="flight-3d-bottom-strip">
          <div className="flight-3d-perks-left">
            <CheckCircle2 size={16} className="flight-check-gold" />
            <span>{flightData?.perkBar || 'Tài xế cầm bảng tên đón ngay sảnh đến DAD · Xe riêng máy lạnh 100%'}</span>
          </div>
          <button
            type="button"
            className="dest-btn-primary flight-3d-btn"
            onClick={handleFlightConsult}
          >
            <span>{flightData?.ctaConsult || 'Tư vấn chuyến bay & xe đón DAD'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Flight3DScene;