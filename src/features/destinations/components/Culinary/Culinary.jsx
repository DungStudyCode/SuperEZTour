import React, { useState } from 'react';
import { Utensils, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './Culinary.css';

const Culinary = ({ culinaryData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const { tripState, toggleCulinary } = useTripBuilder();

  const categories = culinaryData?.categories || [];
  const items = culinaryData?.items || [];

  const filteredItems = activeTab === 'all'
    ? items
    : items.filter((item) => item.category === activeTab);

  return (
    <section className="dest-section dest-section-ivory culinary-section" id="culinary">
      <div className="dest-container">
        {/* Header */}
        <div className="culinary-header">
          <div className="culinary-header-left">
            <span className="dest-kicker">
              <Utensils size={14} />
              <span>{culinaryData?.kicker || 'CULINARY JOURNEY'}</span>
            </span>

            <h2 className="dest-title-editorial culinary-title">
              {culinaryData?.title || 'A Taste of Da Nang.'}
            </h2>

            <p className="dest-subtitle culinary-sub">
              {culinaryData?.subtitle || 'Khám phá một thành phố qua từng tầng hương vị.'}
            </p>
          </div>

          <div className="culinary-header-right">
            <p className="culinary-lead">{culinaryData?.lead}</p>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="culinary-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`culinary-tab ${activeTab === cat.id ? 'culinary-tab-active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Food Editorial Grid */}
        <div className="culinary-grid">
          {filteredItems.map((item, index) => {
            const isPreferred = tripState.culinaryPreferences.includes(item.name);

            return (
              <div
                key={item.id}
                className={`culinary-card ${index === 0 ? 'culinary-card-featured' : ''}`}
              >
                <div className="culinary-img-wrap">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className="culinary-overlay" />
                  <span className="culinary-spot-badge">
                    <Sparkles size={12} />
                    <span>{item.spot}</span>
                  </span>
                </div>

                <div className="culinary-body">
                  <h3 className="culinary-name">{item.name}</h3>
                  <p className="culinary-desc">{item.desc}</p>

                  <button
                    type="button"
                    className={`culinary-pref-btn ${isPreferred ? 'culinary-pref-btn-active' : ''}`}
                    onClick={() => toggleCulinary(item.name)}
                  >
                    {isPreferred ? (
                      <>
                        <Check size={14} />
                        <span>Đã lưu vào sở thích ẩm thực</span>
                      </>
                    ) : (
                      <span>+ Thêm món này vào hành trình</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Culinary;