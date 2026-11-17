import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Car, Users, Briefcase, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Orbit } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './VehicleShowcase3D.css';

gsap.registerPlugin(ScrollTrigger);

const defaultAngleLabels = ['Toàn cảnh ngoại thất', 'Góc nghiêng thân xe', 'Khoang nội thất da'];
const koAngleLabels = ['외관 전면', '측면 프로필', '인테리어'];

const VehicleShowcase3D = ({ transportData }) => {
  const isKorean = transportData?.badgeMaintenance?.includes('점검') || transportData?.seatsLabel?.includes('정원');
  const angleLabels = isKorean ? koAngleLabels : defaultAngleLabels;
  const containerRef = useRef(null);
  const vehicleStageRef = useRef(null);
  const specsHudRef = useRef(null);

  const vehicles = transportData?.vehicles || [];
  const [activeVehicleId, setActiveVehicleId] = useState(vehicles[0]?.id || 'suv-7');
  const [viewAngle, setViewAngle] = useState(0); // 0: front-exterior, 1: side-profile, 2: luxury-interior
  const { tripState, preselectService } = useTripBuilder();

  const activeVehicle = vehicles.find((v) => v.id === activeVehicleId) || vehicles[0];

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

      // Showroom turntable rotation effect on scroll
      tl.fromTo(
        vehicleStageRef.current,
        { rotateY: -10, scale: 0.95, opacity: 0.8 },
        { rotateY: 5, scale: 1.0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(
        specsHudRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, ease: 'power2.out' },
        0.15
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSelectVehicle = (vehicle) => {
    preselectService('transportation', vehicle, true);
  };

  const isSelected = tripState.transportType === activeVehicle.id;

  // Resolve angle-specific image
  const angleImages = activeVehicle.angles || [activeVehicle.image];
  const displayImage = angleImages[viewAngle] || activeVehicle.image;

  return (
    <section className="vehicle-3d-scene" ref={containerRef} id="transportation">
      {/* Studio Lighting & Ambient Floor Glow */}
      <div className="showroom-lighting" aria-hidden="true">
        <div className="showroom-overhead-light" />
        <div className="showroom-turntable-grid" />
      </div>

      <div className="dest-container vehicle-3d-container">
        {/* Header */}
        <header className="vehicle-3d-header">
          <span className="dest-kicker vehicle-3d-kicker">
            <Car size={14} className="vehicle-kicker-icon" />
            <span>AUTOMOTIVE LUXURY SHOWROOM</span>
          </span>
          <h2 className="vehicle-3d-title">Every Mile. Your Style.</h2>
          <p className="vehicle-3d-subtitle">
            Showroom phương tiện riêng tư cao cấp · 100% xe đời mới 2022+, nội thất da êm ái, wifi và tài xế chuyên tuyến điềm đạm.
          </p>
        </header>

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
              <Car size={14} />
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
                key={`${activeVehicle.id}-${viewAngle}`}
                src={displayImage}
                alt={`${activeVehicle.name} - ${angleLabels[viewAngle]}`}
                className="vehicle-3d-image"
                loading="lazy"
              />
              <div className="vehicle-stage-glow-floor" aria-hidden="true" />

              {/* View Angle Switcher Pill */}
              <div className="vehicle-angle-pill">
                <Orbit size={13} className="angle-icon" aria-hidden="true" />
                <span>{angleLabels[viewAngle]}</span>
                <div className="angle-dots">
                  {angleLabels.map((label, a) => (
                    <button
                      key={a}
                      type="button"
                      className={`angle-dot ${viewAngle === a ? 'angle-dot-active' : ''}`}
                      onClick={() => setViewAngle(a)}
                      title={label}
                      aria-label={label}
                    />
                  ))}
                </div>
              </div>

              <div className="vehicle-stage-badge">
                <ShieldCheck size={13} aria-hidden="true" />
                <span>{transportData?.badgeMaintenance || 'Bảo dưỡng tiêu chuẩn hãng'}</span>
              </div>
            </div>
          </div>

          {/* Interactive Specs HUD Column */}
          <aside className="vehicle-specs-hud-col" ref={specsHudRef}>
            <div className="hud-top-meta">
              <span className="hud-model-code">
                {transportData?.modelCodeLabel || 'DÒNG XE TIÊU BIỂU'}: {activeVehicle.modelExample}
              </span>
              <h3 className="hud-vehicle-title">{activeVehicle.name}</h3>
            </div>

            <div className="hud-capacity-grid">
              <div className="hud-capacity-card">
                <Users size={17} className="hud-icon-orange" aria-hidden="true" />
                <div>
                  <span className="hud-cap-label">{transportData?.seatsLabel || 'Sức chứa khách'}</span>
                  <strong className="hud-cap-val">{activeVehicle.seats}</strong>
                </div>
              </div>

              <div className="hud-capacity-card">
                <Briefcase size={17} className="hud-icon-gold" aria-hidden="true" />
                <div>
                  <span className="hud-cap-label">{transportData?.luggageLabel || 'Khoang hành lý'}</span>
                  <strong className="hud-cap-val">{activeVehicle.luggage}</strong>
                </div>
              </div>
            </div>

            <div className="hud-features-block">
              <h4 className="hud-feat-heading">{transportData?.featuresHeading || 'Trang bị tiện nghi tiêu chuẩn:'}</h4>
              <div className="hud-feat-list">
                {activeVehicle.features.map((f, i) => (
                  <div key={i} className="hud-feat-item">
                    <CheckCircle2 size={13} className="hud-check" aria-hidden="true" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hud-ideal-card">
              <span className="hud-ideal-badge">{transportData?.idealBadge || 'Khuyến nghị:'}</span>
              <span className="hud-ideal-text">{activeVehicle.idealFor}</span>
            </div>

            <button
              type="button"
              className={`dest-btn-primary hud-choose-btn ${isSelected ? 'hud-btn-selected' : ''}`}
              onClick={() => handleSelectVehicle(activeVehicle)}
            >
              <span>
                {isSelected
                  ? (transportData?.btnSelected || '✓ Đã chọn loại xe này')
                  : (transportData?.btnSelect || 'Lựa chọn xe này cho hành trình')}
              </span>
              <ArrowRight size={15} />
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase3D;
