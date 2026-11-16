import React, { useState } from 'react';
import { Star, MapPin, CheckCircle2, Bed, ArrowRight, Sparkles } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './Accommodation.css';

const Accommodation = ({ accommodationData }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { tripState, preselectService } = useTripBuilder();

  const categories = [
    { id: 'all', label: 'Tất cả lựa chọn' },
    ...(accommodationData?.categories || [])
  ];

  const items = accommodationData?.items || [];
  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory);

  const handleSelectAccommodation = (item) => {
    preselectService('accommodation', item, true);
  };

  return (
    <section className="dest-section dest-section-ivory accommodation-section" id="accommodation">
      <div className="dest-container">
        {/* Section Header */}
        <div className="accommodation-header">
          <div className="accommodation-header-left">
            <span className="dest-kicker">
              <Bed size={14} />
              <span>{accommodationData?.kicker || 'PREMIUM ACCOMMODATION'}</span>
            </span>
            <h2 className="dest-title-editorial accommodation-title">
              {accommodationData?.title || 'Stay Somewhere Extraordinary.'}
            </h2>
            <p className="dest-subtitle accommodation-sub">
              {accommodationData?.description}
            </p>
          </div>

          <div className="accommodation-header-right">
            <button
              type="button"
              className="dest-btn-primary"
              onClick={() => {
                const el = document.getElementById('trip-builder');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Tìm nơi nghỉ dưỡng phù hợp</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="accommodation-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`accommodation-tab ${activeCategory === cat.id ? 'accommodation-tab-active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accommodation Cards Grid */}
        <div className="accommodation-grid">
          {filteredItems.map((item) => {
            const isChosen = tripState.accommodationName === item.name;

            return (
              <div
                key={item.id}
                className={`accommodation-card ${isChosen ? 'accommodation-card-chosen' : ''}`}
              >
                {/* Image Mask */}
                <div className="accommodation-card-img-wrap">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className="accommodation-card-badges">
                    <span className="dest-badge dest-badge-white">
                      <Star size={12} fill="#FFB52B" color="#FFB52B" />
                      <span>{item.stars} Sao Quốc Tế</span>
                    </span>
                    {item.badge && (
                      <span className="dest-badge dest-badge-gold">
                        <Sparkles size={11} />
                        <span>{item.badge}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="accommodation-card-body">
                  <div className="accommodation-card-loc">
                    <MapPin size={14} className="accommodation-loc-icon" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="accommodation-card-name">{item.name}</h3>

                  <div className="accommodation-highlights">
                    {item.highlights.map((hl, idx) => (
                      <div key={idx} className="accommodation-hl-item">
                        <CheckCircle2 size={13} className="accommodation-check-icon" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  <div className="accommodation-card-footer">
                    <div className="accommodation-ideal">
                      <span className="accommodation-ideal-label">Phù hợp:</span>
                      <span className="accommodation-ideal-text">{item.idealFor}</span>
                    </div>

                    <button
                      type="button"
                      className={`accommodation-select-btn ${isChosen ? 'accommodation-select-btn-active' : ''}`}
                      onClick={() => handleSelectAccommodation(item)}
                    >
                      {isChosen ? '✓ Đã chọn lưu trú này' : 'Chọn vào hành trình →'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Accommodation;