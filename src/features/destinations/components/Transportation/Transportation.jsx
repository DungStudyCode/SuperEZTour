import React, { useState } from 'react';
import { Car, Users, Briefcase, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './Transportation.css';

const Transportation = ({ transportData }) => {
  const vehicles = transportData?.vehicles || [];
  const [activeVehicleId, setActiveVehicleId] = useState(vehicles[0]?.id || 'suv-7');
  const { tripState, preselectService } = useTripBuilder();

  const activeVehicle = vehicles.find((v) => v.id === activeVehicleId) || vehicles[0];

  const handleSelectVehicle = (vehicle) => {
    preselectService('transportation', vehicle, true);
  };

  return (
    <section className="dest-section dest-section-ivory transport-section" id="transportation">
      <div className="dest-container">
        {/* Section Header */}
        <div className="transport-header">
          <span className="dest-kicker">
            <Car size={14} />
            <span>{transportData?.kicker || 'AUTOMOTIVE LUXURY SHOWCASE'}</span>
          </span>

          <h2 className="dest-title-editorial transport-title">
            {transportData?.title || 'Every Mile. Your Style.'}
          </h2>

          <p className="dest-subtitle transport-sub">
            {transportData?.subtitle || 'Di chuyển riêng tư, thoải mái trên mọi hành trình.'}
          </p>
          <p className="transport-desc">{transportData?.description}</p>
        </div>

        {/* Vehicle Selection Navigation Tabs */}
        <div className="transport-tabs-nav">
          {vehicles.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`transport-tab-btn ${activeVehicleId === v.id ? 'transport-tab-btn-active' : ''}`}
              onClick={() => setActiveVehicleId(v.id)}
            >
              <Car size={16} />
              <span>{v.name.split(' (')[0]}</span>
            </button>
          ))}
        </div>

        {/* Automotive Showcase Box */}
        {activeVehicle && (
          <div className="transport-showcase-box">
            {/* Visual Vehicle Image with Overlay */}
            <div className="transport-showcase-visual">
              <div className="dest-img-mask transport-img-mask">
                <img
                  key={activeVehicle.id}
                  src={activeVehicle.image}
                  alt={activeVehicle.name}
                  className="transport-img-active"
                  loading="lazy"
                />
                <div className="transport-visual-badge">
                  <ShieldCheck size={14} />
                  <span>100% Xe đời mới 2022+</span>
                </div>
              </div>
            </div>

            {/* Vehicle Specs & Details */}
            <div className="transport-showcase-info">
              <span className="transport-model-example">
                Dòng xe tiêu biểu: {activeVehicle.modelExample}
              </span>
              <h3 className="transport-vehicle-name">{activeVehicle.name}</h3>

              {/* Capacity Specs */}
              <div className="transport-specs-row">
                <div className="transport-spec-pill">
                  <Users size={16} className="transport-spec-icon" />
                  <div>
                    <span className="transport-spec-label">Sức chứa</span>
                    <strong className="transport-spec-val">{activeVehicle.seats}</strong>
                  </div>
                </div>

                <div className="transport-spec-pill">
                  <Briefcase size={16} className="transport-spec-icon" />
                  <div>
                    <span className="transport-spec-label">Khoang hành lý</span>
                    <strong className="transport-spec-val">{activeVehicle.luggage}</strong>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="transport-features-block">
                <h4 className="transport-features-title">Trang bị & Tiện ích tiêu chuẩn:</h4>
                <div className="transport-features-list">
                  {activeVehicle.features.map((feat, idx) => (
                    <div key={idx} className="transport-feat-item">
                      <CheckCircle2 size={15} className="transport-check-icon" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal for tag */}
              <div className="transport-ideal-block">
                <span className="transport-ideal-lbl">Khuyến nghị:</span>
                <span className="transport-ideal-desc">{activeVehicle.idealFor}</span>
              </div>

              {/* Action Button */}
              <div className="transport-action-row">
                <button
                  type="button"
                  className={`dest-btn-primary transport-choose-btn ${tripState.transportType === activeVehicle.id ? 'transport-btn-selected' : ''}`}
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
        )}
      </div>
    </section>
  );
};

export default Transportation;