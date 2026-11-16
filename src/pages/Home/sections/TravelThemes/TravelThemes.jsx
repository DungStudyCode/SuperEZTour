import React from 'react';
import { TRAVEL_THEMES } from '../../../../data/themes';
import SectionHeading from '../../../../components/common/SectionHeading/SectionHeading';
import Container from '../../../../components/common/Container/Container';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import Button from '../../../../components/common/Button/Button';
import './TravelThemes.css';

const TravelThemes = ({ onOpenQuoteModal }) => {
  return (
    <section id="themes" className="section travel-themes-section section-bg-alt">
      <Container>
        <SectionHeading
          tagline="THIẾT KẾ TOUR THEO NHU CẦU"
          title="Du lịch theo chủ đề & Phong cách riêng"
          subtitle="Dù bạn đi cùng người thương, đại gia đình 3 thế hệ hay nhóm bạn đam mê ẩm thực, Super EZ Tour luôn có gói tour độc quyền hoàn hảo nhất."
          align="center"
        />

        {/* Themes Grid */}
        <div className="themes-cards-grid">
          {TRAVEL_THEMES.map((theme, index) => {
            // First 2 themes take wider 1.5 col, remaining 3 take 1 col in a 2-row layout, or clean 5-card layout
            const isFeatured = index < 2;

            return (
              <div
                key={theme.id}
                className={`theme-card ${isFeatured ? 'is-featured' : ''} hover-zoom-container`}
              >
                {/* Background Image */}
                <img
                  src={theme.image}
                  alt={theme.title}
                  loading="lazy"
                  className="theme-bg-img hover-zoom-image"
                />

                {/* Dark Gradient Overlay */}
                <div className="theme-card-overlay" />

                {/* Theme Content */}
                <div className="theme-card-content">
                  <div className="theme-top-meta">
                    <span className="theme-badge">{theme.tag}</span>
                  </div>

                  <h3 className="theme-title">{theme.title}</h3>
                  <p className="theme-subtitle">{theme.subtitle}</p>

                  <p className="theme-desc line-clamp-2">{theme.description}</p>

                  {/* Highlights checklist */}
                  <ul className="theme-highlights-list">
                    {theme.highlights.map((h, i) => (
                      <li key={i} className="theme-highlight-item">
                        <Check size={14} className="highlight-check" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Recommended destinations */}
                  <div className="theme-dest-recommend">
                    <span className="dest-recommend-label">Điểm đến đề xuất:</span>
                    <div className="dest-recommend-pills">
                      {theme.recommendedDestinations.map((d, i) => (
                        <span key={i} className="theme-dest-chip">{d}</span>
                      ))}
                    </div>
                  </div>

                  <div className="theme-cta-wrap">
                    <button
                      type="button"
                      className="theme-link-btn"
                      onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
                    >
                      <span>Xem lịch trình gói này</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TravelThemes;
