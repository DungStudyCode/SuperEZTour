import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIGNATURE_JOURNEYS } from '../../../../data/vietnamDestinations';
import { ArrowRight, Sparkles, MapPin, Eye } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import TourQuickPreview from '../../../../components/common/TourQuickPreview/TourQuickPreview';
import './SignatureJourneys.css';

/**
 * Super EZ Tour — Premium Editorial Signature Journeys
 * Light Luxury Korean Travel Editorial Concept
 * 2-Column Desktop Grid | Quick Preview Modal Integration | Curated Photography
 */
const SignatureJourneys = ({ onOpenQuoteModal }) => {
  const { t, isKorean } = useLanguage();
  const navigate = useNavigate();

  const [selectedTour, setSelectedTour] = useState(null);
  const [failedImages, setFailedImages] = useState(() => new Set());
  const lastTriggerRef = useRef(null);

  const handleImageError = (journeyId) => {
    setFailedImages((prev) => {
      if (prev.has(journeyId)) return prev;
      const next = new Set(prev);
      next.add(journeyId);
      return next;
    });
  };

  const handleCardClick = (journey, event) => {
    lastTriggerRef.current = event?.currentTarget || null;
    setSelectedTour(journey);
  };

  const handleClosePreview = () => {
    setSelectedTour(null);
    if (lastTriggerRef.current && lastTriggerRef.current.focus) {
      lastTriggerRef.current.focus();
    }
  };

  const handleConsultFromPreview = (tour) => {
    handleClosePreview();
    if (onOpenQuoteModal) {
      onOpenQuoteModal({
        destinationId: tour.destinationSlug,
        tourId: tour.id,
        tourTitle: isKorean ? (tour.titleKr || tour.title) : (tour.titleVi || tour.title),
        duration: tour.durationKey || '4d3n',
      });
    }
  };

  const handleViewDetailsFromPreview = (tour) => {
    handleClosePreview();
    if (tour.isAvailable && tour.route) {
      navigate(tour.route);
    } else {
      if (onOpenQuoteModal) {
        onOpenQuoteModal({
          destinationId: tour.destinationSlug,
          tourId: tour.id,
          tourTitle: isKorean ? (tour.titleKr || tour.title) : (tour.titleVi || tour.title),
          duration: tour.durationKey || '4d3n',
        });
      }
    }
  };

  return (
    <section
      id="signature-journeys"
      className="signature-journeys-section"
      aria-label="Signature Journeys"
    >
      <div className="signature-journeys-container">
        {/* =========================================================
            01. SECTION HEADER: Editorial Left-Aligned with Tagline
        ========================================================= */}
        <div className="signature-header">
          <div className="signature-header-main">
            <span className="signature-eyebrow">SIGNATURE JOURNEYS</span>
            <h2 className="signature-title">
              {t(
                'home.journeys.title',
                isKorean ? '당신만을 위한 특별한 여행' : 'Hành trình được thiết kế riêng'
              )}
            </h2>
            <p className="signature-subtitle">
              {t(
                'home.journeys.subtitle',
                isKorean
                  ? '당신의 취향과 여행 스타일에 맞춰 엄선한 베트남의 특별한 여정을 만나보세요.'
                  : 'Khám phá Việt Nam theo nhịp điệu của riêng bạn, với những trải nghiệm được lựa chọn kỹ lưỡng.'
              )}
            </p>
          </div>

          <div className="signature-header-aside">
            <span className="signature-service-tagline">
              {t(
                'home.journeys.serviceTagline',
                isKorean
                  ? '전용 차량 · 전담 가이드 · 유연한 일정'
                  : 'Xe riêng · Hướng dẫn viên đồng hành · Lịch trình linh hoạt'
              )}
            </span>
          </div>
        </div>

        {/* =========================================================
            02. JOURNEY CARDS GRID: 2-Column Desktop
        ========================================================= */}
        <div className="signature-grid">
          {SIGNATURE_JOURNEYS.map((journey) => {
            const isDaNang = journey.isAvailable;
            const title = isKorean
              ? journey.titleKr || journey.title
              : journey.titleVi || journey.title;
            const description = isKorean
              ? journey.descKr || journey.pacing
              : journey.descVi || journey.pacingVi;
            const destination = isKorean
              ? journey.destinationKr || journey.destination
              : journey.destinationVi || journey.destination;
            const duration = isKorean
              ? journey.durationKr || journey.duration
              : journey.durationVi || journey.duration;
            const highlights = (isKorean
              ? journey.highlightsKr || journey.highlights
              : journey.highlightsVi || journey.highlights
            ).slice(0, 3);
            const hasError = failedImages.has(journey.id);

            return (
              <article
                key={journey.id}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label={`${title} - ${t('tourPreview.cardQuickPreviewHint', isKorean ? '여행 빠른 미리보기' : 'Xem nhanh hành trình')}`}
                className={`signature-card ${isDaNang ? 'is-featured' : ''}`}
                onClick={(e) => handleCardClick(journey, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(journey, e);
                  }
                }}
              >
                {/* Card Media Container (~16:9 Aspect Ratio) */}
                <div className="signature-card-media">
                  {!hasError ? (
                    <img
                      src={journey.image}
                      alt={`${title} - Super EZ Tour`}
                      className="signature-card-img"
                      loading="lazy"
                      onError={() => handleImageError(journey.id)}
                    />
                  ) : (
                    <div className="signature-media-fallback" aria-label={destination}>
                      <MapPin size={26} className="fallback-pin-icon" />
                      <span className="fallback-text">{destination}</span>
                    </div>
                  )}

                  <div className="signature-media-overlay" />

                  {/* Subtle Featured Badge for Da Nang */}
                  {isDaNang && (
                    <div className="signature-badge-featured">
                      <Sparkles size={11} className="badge-sparkle-icon" />
                      <span>{t('home.journeys.featuredTag', 'FEATURED')}</span>
                    </div>
                  )}

                  {/* Hover Quick Preview Hint Pill */}
                  <div className="signature-card-hover-hint">
                    <Eye size={13} className="hint-icon" />
                    <span>
                      {t('tourPreview.cardQuickPreviewHint', isKorean ? '여행 빠른 미리보기' : 'Xem nhanh hành trình')}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="signature-card-body">
                  {/* Meta: Destination · Duration */}
                  <div className="signature-meta-row">
                    <span className="signature-meta-dest">{destination}</span>
                    <span className="signature-meta-divider" aria-hidden="true">·</span>
                    <span className="signature-meta-duration">{duration}</span>
                  </div>

                  {/* Journey Title */}
                  <h3 className="signature-card-title">{title}</h3>

                  {/* Short Emotional Description */}
                  <p className="signature-card-desc">{description}</p>

                  {/* 3 Concise Highlights */}
                  <ul className="signature-highlights-list" aria-label="Journey highlights">
                    {highlights.map((item, idx) => (
                      <li key={idx} className="signature-highlight-item">
                        <span className="highlight-bullet" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Unified Bottom CTA */}
                  <div className="signature-card-cta-wrap">
                    <div
                      className={`signature-cta-btn ${isDaNang ? 'is-route' : 'is-quote'}`}
                    >
                      <span>
                        {isDaNang
                          ? t('home.journeys.viewJourney', isKorean ? '여행 자세히 보기' : 'Khám phá hành trình')
                          : t('home.journeys.consultJourney', isKorean ? '여행 상담하기' : 'Tư vấn hành trình')}
                      </span>
                      <ArrowRight size={15} className="cta-arrow-icon" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          GLOBAL QUICK PREVIEW MODAL
      ========================================================= */}
      <TourQuickPreview
        tour={selectedTour}
        isOpen={Boolean(selectedTour)}
        onClose={handleClosePreview}
        onConsult={handleConsultFromPreview}
        onViewDetails={handleViewDetailsFromPreview}
      />
    </section>
  );
};

export default SignatureJourneys;
