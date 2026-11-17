import React from 'react';
import { TRAVEL_THEMES } from '../../../../data/vietnamDestinations';
import Container from '../../../../components/common/Container/Container';
import { ArrowRight, Sparkles, Tag } from 'lucide-react';
import './TravelThemes.css';

const TravelThemes = ({ onOpenQuoteModal }) => {
  return (
    <section id="travel-themes" className="section travel-themes-section" aria-label="Travel by Theme">
      <Container>
        <div className="themes-header">
          <div className="themes-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>CURATED THEMATIC COLLECTIONS</span>
          </div>
          <h2 className="themes-title">8대 시그니처 여행 테마</h2>
          <p className="themes-subtitle">
            둘만의 로맨틱 허니문부터 3대 가족 힐링, 미쉐린 미식 탐방과 챔피언십 골프까지.
            <br />
            취향과 라이프스타일에 맞춘 완벽한 프라이빗 맞춤 여정을 제안합니다.
          </p>
        </div>

        {/* 8 Themes Cards Grid */}
        <div className="themes-grid-lux">
          {TRAVEL_THEMES.map((theme) => (
            <div
              key={theme.id}
              className="theme-card-lux"
              onClick={() => onOpenQuoteModal && onOpenQuoteModal(theme.id)}
            >
              {/* Background Image */}
              <div className="theme-bg-wrap">
                <img
                  src={theme.image}
                  alt={theme.titleKr}
                  loading="lazy"
                  className="theme-bg-lux-img"
                />
                <div className="theme-lux-overlay" />
              </div>

              {/* Theme Content */}
              <div className="theme-lux-content">
                <span className="theme-en-badge">{theme.titleEn}</span>
                <h3 className="theme-kr-title">{theme.titleKr}</h3>
                <p className="theme-desc-kr">{theme.descKr}</p>

                {/* Tags */}
                <div className="theme-tags-wrap">
                  {theme.tags.map((tag, idx) => (
                    <span key={idx} className="theme-pill-tag">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="theme-action-row">
                  <span className="theme-cta-text">
                    <span>맞춤 일정 상담하기</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TravelThemes;
