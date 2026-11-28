import React from 'react';
import { TRAVEL_THEMES } from '../../../../data/vietnamDestinations';
import Container from '../../../../components/common/Container/Container';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import { useConsultation } from '../../../../context/ConsultationContext';
import './TravelThemes.css';

/**
 * Super EZ Tour — Travel Themes (8 Travel Styles)
 * Concept: Editorial Experience Discovery
 * 4x2 Grid of light luxury cards -> Triggers Global Unified ExperienceDrawer
 */
const TravelThemes = () => {
  const { t, isKorean } = useLanguage();
  const { openExperienceDrawer } = useConsultation();

  const handleOpenDrawer = (theme) => {
    openExperienceDrawer(theme);
  };

  return (
    <section id="travel-themes" className="section travel-themes-section" aria-label="Travel Themes">
      <Container>
        {/* Editorial Section Header */}
        <div className="themes-editorial-header">
          <span className="themes-eyebrow-label">
            {t('home.themes.kicker', 'TRAVEL YOUR WAY')}
          </span>
          <h2 className="themes-main-heading">
            {t('home.themes.title', isKorean ? '나만의 스타일로 떠나는 여행' : 'Mỗi hành trình, một phong cách riêng')}
          </h2>
          <p className="themes-header-desc">
            {t(
              'home.themes.subtitle',
              isKorean
                ? '프리미엄 휴양과 가족 여행부터 골프와 크루즈까지, 취향에 맞는 특별한 여행을 만나보세요.'
                : 'Từ nghỉ dưỡng cao cấp, du lịch gia đình đến golf và du thuyền, khám phá những trải nghiệm có thể thiết kế riêng cho bạn.'
            )}
          </p>
        </div>

        {/* 8 Experience Cards Grid (4x2 on Desktop) */}
        <div className="themes-editorial-grid">
          {TRAVEL_THEMES.map((theme) => {
            const themeTitle = isKorean ? theme.titleKr : theme.titleVi;
            const themeDesc = isKorean ? theme.descKr : theme.descVi;
            const highlights = (isKorean ? theme.highlightsKr : theme.highlightsVi) || theme.highlights || [];

            return (
              <div
                key={theme.id}
                className="theme-editorial-card"
                role="button"
                tabIndex={0}
                aria-label={`${themeTitle} - ${t('home.themes.cta', isKorean ? '여행 스타일 자세히 보기' : 'Khám phá trải nghiệm')}`}
                onClick={() => handleOpenDrawer(theme)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenDrawer(theme);
                  }
                }}
              >
                {/* 16:10 Aspect Ratio Top Image */}
                <div className="theme-card-media">
                  <img
                    src={theme.image}
                    alt={themeTitle}
                    loading="lazy"
                    className="theme-card-img"
                  />
                  <div className="theme-card-img-scrim" />
                </div>

                {/* Card Editorial Body */}
                <div className="theme-card-body">
                  <div className="theme-card-meta">
                    <span className="theme-card-category">
                      {theme.categoryEn || 'EXCLUSIVE STYLE'}
                    </span>
                    <h3 className="theme-card-title">{themeTitle}</h3>
                    <p className="theme-card-desc">{themeDesc}</p>
                  </div>

                  {/* Clean Text Chips (NO hashtags) */}
                  {highlights.length > 0 && (
                    <div className="theme-card-chips">
                      {highlights.slice(0, 3).map((chip, idx) => (
                        <span key={idx} className="theme-text-chip">
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Card Subtle CTA */}
                  <div className="theme-card-action">
                    <span className="theme-action-label">
                      {t('home.themes.cta', isKorean ? '여행 스타일 자세히 보기' : 'Khám phá trải nghiệm')}
                    </span>
                    <ArrowRight size={15} className="theme-action-arrow" />
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
