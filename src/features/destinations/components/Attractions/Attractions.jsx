import React, { useRef } from 'react';
import { Compass, Plus, Check, Clock, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './Attractions.css';

const Attractions = ({ attractionsData }) => {
  const { tripState, toggleAttraction } = useTripBuilder();
  const scrollContainerRef = useRef(null);

  const items = attractionsData?.items || [];
  const selectedCount = tripState.selectedAttractions.length;

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="dest-section dest-section-dark attractions-section" id="attractions">
      <div className="dest-container">
        {/* Header with Navigation Arrows & Live Selected Counter */}
        <div className="attractions-header">
          <div className="attractions-header-left">
            <span className="dest-kicker">
              <Compass size={14} />
              <span>{attractionsData?.kicker || 'ICONIC COORDINATES'}</span>
            </span>

            <h2 className="dest-title-editorial attractions-title">
              {attractionsData?.title || 'Beyond the Ordinary.'}
            </h2>

            <p className="dest-subtitle attractions-sub">
              {attractionsData?.subtitle || 'Những tọa độ không thể bỏ lỡ tại Đà Nẵng.'}
            </p>
          </div>

          <div className="attractions-header-right">
            {/* Selected Counter Pill */}
            <div className="attractions-counter-pill">
              <Sparkles size={14} className="attractions-sparkle" />
              <span>Đã chọn <strong>{selectedCount}</strong> tọa độ vào hành trình</span>
            </div>

            {/* Scroll Navigation Arrows */}
            <div className="attractions-nav-arrows">
              <button
                type="button"
                className="attractions-arrow-btn"
                onClick={() => scroll('left')}
                aria-label="Cuộn sang trái"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="attractions-arrow-btn"
                onClick={() => scroll('right')}
                aria-label="Cuộn sang phải"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Gallery Container */}
      <div className="attractions-scroll-wrapper" ref={scrollContainerRef}>
        <div className="attractions-track">
          {items.map((item) => {
            const isSelected = tripState.selectedAttractions.includes(item.id);

            return (
              <div
                key={item.id}
                className={`attraction-card ${isSelected ? 'attraction-card-selected' : ''}`}
              >
                {/* Visual Image */}
                <div className="attraction-img-box">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className="attraction-gradient" />
                  <span className="attraction-cat-badge">{item.category}</span>
                  <div className="attraction-duration-badge">
                    <Clock size={12} />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="attraction-card-body">
                  <h3 className="attraction-card-name">{item.name}</h3>
                  <p className="attraction-card-desc">{item.description}</p>

                  {/* Tags */}
                  <div className="attraction-tags-list">
                    {(item.tags || []).map((tag, idx) => (
                      <span key={idx} className="attraction-tag-item">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Add To Trip Action Button */}
                  <button
                    type="button"
                    className={`attraction-action-btn ${isSelected ? 'attraction-action-btn-active' : ''}`}
                    onClick={() => toggleAttraction(item.id)}
                  >
                    {isSelected ? (
                      <>
                        <Check size={16} />
                        <span>Đã thêm vào hành trình</span>
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        <span>Thêm vào hành trình</span>
                      </>
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

export default Attractions;