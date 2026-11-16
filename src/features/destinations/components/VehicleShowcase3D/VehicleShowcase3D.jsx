import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Car, Users, Briefcase, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Orbit } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './VehicleShowcase3D.css';

gsap.registerPlugin(ScrollTrigger);

const VehicleShowcase3D = ({ transportData }) => {
  const containerRef = useRef(null);
  const vehicleStageRef = useRef(null);
  const specsHudRef = useRef(null);

  const vehicles = transportData?.vehicles || [];
  const [activeVehicleId, setActiveVehicleId] = useState(vehicles[0]?.id || 'suv-7');
  const [viewAngle, setViewAngle] = useState(0); // 0: front-side, 1: side, 2: interior-vibe
  const { tripState, preselectService } = useTripBuilder();

  const activeVehicle = vehicles.find((v) => v.id === activeVehicleId) || vehicles[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Showroom turntable rotation effect on scroll
      tl.fromTo(
        vehicleStageRef.current,
        { rotateY: -15, scale: 0.9, opacity: 0.7 },
        { rotateY: 10, scale: 1.02, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(
        specsHudRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, ease: 'power2.out' },
        0.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSelectVehicle = (vehicle) => {
    preselectService('transportation', vehicle, true);
  };

  return (
    <section className="vehicle-3d-scene" ref={containerRef} id="transportation">
      {/* Studio Lighting & Ambient Floor Glow */}
      <div className="showroom-lighting">
        <div className="showroom-overhead-light" />
        <div className="showroom-turntable-grid" />
      </div>

      <div className="dest-container vehicle-3d-container">
        {/* Header */}
        <div className="vehicle-3d-header">
          <span className="dest-kicker vehicle-3d-kicker">
            <Car size={14} />
            <span>AUTOMOTIVE LUXURY SHOWROOM</span>
          </span>
          <h2 className="vehicle-3d-title">Every Mile. Your Style.</h2>
          <p className="vehicle-3d-subtitle">
            Showroom phương tiện riêng tư cao cấp · 100% xe đời mới 2022+, nội thất da êm ái, wifi và tài xế chuyên tuyến điềm đạm.
          </p>
        </div>

        {/* Vehicle Tabs Navigation */}
        <div className="vehicle-3d-tabs">
          {vehicles.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`vehicle-tab-btn ${activeVehicleId === v.id ? 'vehicle-tab-btn-active' : ''}`}
              onClick={() => {
                setActiveVehicleId(v.id);
                setViewAngle(0);
              }}
            >
              <Car size={15} />
              <span>{v.name.split(' (')[0]}</span>
            </button>
          ))}
        </div>

        {/* Main Stage Grid */}
        <div className="vehicle-3d-stage-grid">
          {/* Turntable 3D Vehicle Presentation */}
          <div className="vehicle-turntable-col" ref={vehicleStageRef}>
            <div className="vehicle-card-3d-stage">
              <img
                src={activeVehicle.image}
                alt={activeVehicle.name}
                className="vehicle-3d-image"
                loading="lazy"
              />
              <div className="vehicle-stage-glow-floor" />

              {/* View Angle Switcher Pill */}
              <div className="vehicle-angle-pill">
                <Orbit size={14} className="angle-icon" />
                <span>Góc nhìn 3D Studio</span>
                <div className="angle-dots">
                  {[0, 1, 2].map((a) => (
                    <button
                      key={a}
                      type="button"
                      className={`angle-dot ${viewAngle === a ? 'angle-dot-active' : ''}`}
                      onClick={() => setViewAngle(a)}
                      title={`Chuyển góc nhìn ${a + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="vehicle-stage-badge">
                <ShieldCheck size={14} />
                <span>Bảo dưỡng tiêu chuẩn hãng</span>
              </div>
            </div>
          </div>

          {/* Interactive Specs HUD Column */}
          <div className="vehicle-specs-hud-col" ref={specsHudRef}>
            <span className="hud-model-code">
              DÒNG XE TIÊU BIỂU: {activeVehicle.modelExample}
            </span>

            <h3 className="hud-vehicle-title">{activeVehicle.name}</h3>

            <div className="hud-capacity-grid">
              <div className="hud-capacity-card">
                <Users size={18} className="hud-icon-orange" />
                <div>
                  <span className="hud-cap-label">Sức chứa khách</span>
                  <strong className="hud-cap-val">{activeVehicle.seats}</strong>
                </div>
              </div>

              <div className="hud-capacity-card">
                <Briefcase size={18} className="hud-icon-gold" />
                <div>
                  <span className="hud-cap-label">Khoang hành lý</span>
                  <strong className="hud-cap-val">{activeVehicle.luggage}</strong>
                </div>
              </div>
            </div>

            <div className="hud-features-block">
              <h4 className="hud-feat-heading">Trang bị tiện nghi tiêu chuẩn:</h4>
              <div className="hud-feat-list">
                {activeVehicle.features.map((f, i) => (
                  <div key={i} className="hud-feat-item">
                    <CheckCircle2 size={14} className="hud-check" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hud-ideal-card">
              <span className="hud-ideal-badge">Khuyến nghị:</span>
              <span className="hud-ideal-text">{activeVehicle.idealFor}</span>
            </div>

            <button
              type="button"
              className={`dest-btn-primary hud-choose-btn ${tripState.transportType === activeVehicle.id ? 'hud-btn-selected' : ''}`}
              onClick={() => handleSelectVehicle(activeVehicle)}
            >
              <span>
                {tripState.transportType === activeVehicle.id
                  ? '✓ Đã chọn loại xe này'
                  : 'Lựa chọn xe này cho hành trình'}
              </span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase3D;