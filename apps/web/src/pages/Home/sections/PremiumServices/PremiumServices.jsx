import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import './PremiumServices.css';

/**
 * Super EZ Tour — The Art of Private Travel
 * Complete Editorial Redesign for Premium Services
 * Replacing the obsolete 8-card grid with a high-end luxury hospitality storytelling experience.
 *
 * Architecture:
 * - Left (45%): Large Visual Storytelling with natural grade & subtle caption
 * - Right (55%): Editorial Header + 3-Stage Orchestration Sequence + Subtle Trust Note + Consultation CTA
 */

const PRIMARY_IMAGE = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85';

const PremiumServices = ({ onOpenQuoteModal }) => {
  const { t, isKorean } = useLanguage();
  const [imgSrc, setImgSrc] = useState(PRIMARY_IMAGE);

  const handleImageError = () => {
    if (imgSrc !== FALLBACK_IMAGE) {
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  const handleCtaClick = () => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal({ source: 'premium-services' });
    }
  };

  return (
    <section
      id="travel-services"
      className="editorial-services-section"
      aria-label="The Art of Private Travel"
    >
      <div className="editorial-services-container">
        <div className="editorial-services-grid">
          {/* =========================================================
              LEFT COLUMN: High-End Visual Storytelling (Hospitality & Care)
          ========================================================= */}
          <div className="editorial-services-media">
            <div className="editorial-media-wrapper">
              <img
                src={imgSrc}
                alt={t(
                  'home.services.imageAlt',
                  isKorean
                    ? 'Super EZ Tour 프라이빗 맞춤 여행 및 럭셔리 호스피탈리티 케어'
                    : 'Dịch vụ du lịch riêng và chăm sóc kỳ nghỉ cao cấp của Super EZ Tour'
                )}
                className="editorial-services-img"
                loading="lazy"
                onError={handleImageError}
              />
              <div className="editorial-media-scrim" />
              <div className="editorial-media-caption">
                <span className="caption-dot" aria-hidden="true" />
                <span className="caption-text">
                  {t(
                    'home.services.imageCaption',
                    isKorean
                      ? '100% 단독 프라이빗 투어 · 당신만을 위한 베트남 여정'
                      : '100% Chuyến đi riêng tư · Đồng hành cùng bạn tại Việt Nam'
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: Editorial Header + 3 Stages + Trust + CTA
          ========================================================= */}
          <div className="editorial-services-content">
            {/* Editorial Header */}
            <header className="editorial-services-header">
              <span className="editorial-eyebrow">
                <Sparkles size={12} className="eyebrow-icon" />
                <span>{t('home.services.editorialEyebrow', 'THE SUPER EZ TOUR DIFFERENCE')}</span>
              </span>

              <h2 className={`editorial-main-heading ${isKorean ? 'is-korean' : ''}`}>
                {t(
                  'home.services.editorialHeading',
                  isKorean
                    ? '오직 당신을 위한 여행, 모든 순간을 세심하게.'
                    : 'Một hành trình riêng. Mọi chi tiết được chăm chút.'
                )}
              </h2>

              <p className="editorial-lead-desc">
                {t(
                  'home.services.editorialDesc',
                  isKorean
                    ? '여행 계획부터 마지막 순간까지, Super EZ Tour는 고객의 취향과 필요에 맞춰 여행의 모든 요소를 세심하게 연결합니다.'
                    : 'Từ lúc lên kế hoạch đến khi kết thúc chuyến đi, Super EZ Tour kết nối các dịch vụ cần thiết thành một hành trình được thiết kế theo nhu cầu của bạn.'
                )}
              </p>
            </header>

            {/* 3-Stage Orchestration Sequence (No Cards, Pure Editorial Rhythm) */}
            <div className="editorial-stages-list" role="list">
              {/* Stage 01: Personal Discovery */}
              <div className="editorial-stage-item" role="listitem">
                <div className="stage-num-col">
                  <span className="stage-num">01</span>
                </div>
                <div className="stage-info-col">
                  <h3 className="stage-title">
                    {t(
                      'home.services.stage01Title',
                      isKorean ? '여행 취향을 이해하는 첫걸음' : 'Lắng nghe nhu cầu của bạn'
                    )}
                  </h3>
                  <p className="stage-desc">
                    {t(
                      'home.services.stage01Desc',
                      isKorean
                        ? '여행지와 여행 스타일, 인원, 특별한 요청 사항을 파악하여 고객에게 어울리는 여행을 설계합니다.'
                        : 'Tìm hiểu điểm đến, phong cách du lịch, số lượng khách và những mong muốn riêng để định hình hành trình phù hợp.'
                    )}
                  </p>
                </div>
              </div>

              {/* Stage 02: Curated Arrangements */}
              <div className="editorial-stage-item" role="listitem">
                <div className="stage-num-col">
                  <span className="stage-num">02</span>
                </div>
                <div className="stage-info-col">
                  <h3 className="stage-title">
                    {t(
                      'home.services.stage02Title',
                      isKorean ? '여행의 모든 요소를 맞춤 설계' : 'Thiết kế và kết nối dịch vụ'
                    )}
                  </h3>
                  <p className="stage-desc">
                    {t(
                      'home.services.stage02Desc',
                      isKorean
                        ? '숙박, 전용 차량, 가이드, 미식과 선택한 체험을 하나의 일정으로 세심하게 구성합니다.'
                        : 'Phối hợp lưu trú, xe riêng, hướng dẫn viên, ẩm thực và các trải nghiệm đã lựa chọn thành một lịch trình thống nhất.'
                    )}
                  </p>
                </div>
              </div>

              {/* Stage 03: Seamless Journey */}
              <div className="editorial-stage-item" role="listitem">
                <div className="stage-num-col">
                  <span className="stage-num">03</span>
                </div>
                <div className="stage-info-col">
                  <h3 className="stage-title">
                    {t(
                      'home.services.stage03Title',
                      isKorean ? '여행의 모든 순간을 함께' : 'Đồng hành trong suốt chuyến đi'
                    )}
                  </h3>
                  <p className="stage-desc">
                    {t(
                      'home.services.stage03Desc',
                      isKorean
                        ? '여행 중 일정과 서비스 이용을 원활하게 조율하고 필요한 변경 사항을 지원합니다.'
                        : 'Hỗ trợ điều phối lịch trình, kết nối các bên cung cấp dịch vụ và tiếp nhận những thay đổi phát sinh trong hành trình.'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Subtle Trust Statement */}
            <div className="editorial-trust-note">
              <span className="trust-accent-dot" aria-hidden="true" />
              <p className="trust-note-text">
                {t(
                  'home.services.trustStatement',
                  isKorean
                    ? '고객별 취향과 일정에 맞춰 세심하게 설계하는 프라이빗 여행.'
                    : 'Hành trình được thiết kế riêng, với dịch vụ và lịch trình thống nhất theo nhu cầu của từng nhóm khách.'
                )}
              </p>
            </div>

            {/* Consultation CTA */}
            <div className="editorial-cta-wrap">
              <button
                type="button"
                className="editorial-services-cta"
                onClick={handleCtaClick}
                aria-label={t(
                  'home.services.ctaBtn',
                  isKorean ? '나만의 여행 상담하기' : 'Thiết kế chuyến đi của tôi'
                )}
              >
                <span>
                  {t(
                    'home.services.ctaBtn',
                    isKorean ? '나만의 여행 상담하기' : 'Thiết kế chuyến đi của tôi'
                  )}
                </span>
                <ArrowRight size={16} className="cta-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumServices;
