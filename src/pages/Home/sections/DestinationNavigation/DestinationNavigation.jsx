import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import {
  VIETNAM_DESTINATIONS,
  VIETNAM_REGIONS,
  getDestinationsByRegion,
} from '../../../../data/vietnamDestinations';
import { useLanguage } from '../../../../context/LanguageContext';
import './DestinationNavigation.css';

/**
 * Editorial Destination Strip — 5-Column Discovery Grid
 * Light Luxury Korean Travel Editorial Experience
 * 10 Verified Authentic Vietnam Destinations | Equal Visual Priority
 */
const DestinationNavigation = ({ onOpenQuoteModal, onSelectDestination }) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [failedImages, setFailedImages] = useState(() => new Set());
  const navigate = useNavigate();
  const { t, isKorean } = useLanguage();

  const filteredDestinations = getDestinationsByRegion(selectedRegion);

  const handleImageError = (destId) => {
    setFailedImages((prev) => {
      if (prev.has(destId)) return prev;
      const next = new Set(prev);
      next.add(destId);
      return next;
    });
  };

  const handleCardClick = (dest) => {
    const isPublished = dest.experienceStatus === 'published' || (dest.id === 'da-nang' && dest.isAvailable);
    if (isPublished && dest.route) {
      navigate(dest.route);
    } else {
      if (onOpenQuoteModal) {
        onOpenQuoteModal({
          source: 'destination-card',
          destinationId: dest.id,
        });
      }
    }
  };

  const handleViewAll = () => {
    setSelectedRegion('all');
    const el = document.getElementById('destinations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="destinations"
      className="editorial-dest-strip-section"
      aria-label="Explore Vietnam Destinations"
    >
      <div className="dest-strip-container">
        {/* =========================================================
            01. SECTION HEADER: Editorial Left & Right Actions
        ========================================================= */}
        <div className="dest-strip-header">
          <div className="dest-strip-header-left">
            <span className="dest-strip-eyebrow">EXPLORE VIETNAM</span>
            <h2 className="dest-strip-title">
              {t(
                'home.destinationStrip.title',
                isKorean ? '베트남 여행지 둘러보기' : 'Khám phá điểm đến'
              )}
            </h2>
            <p className="dest-strip-subtitle">
              {t(
                'home.destinationStrip.subtitle',
                isKorean
                  ? '베트남 곳곳의 매력적인 여행지를 만나보세요.'
                  : 'Những hành trình được tuyển chọn trên khắp Việt Nam.'
              )}
            </p>
          </div>

          <div className="dest-strip-header-right">
            <button
              type="button"
              className="dest-strip-viewall-btn"
              onClick={handleViewAll}
            >
              <span>
                {t(
                  'home.destinationStrip.viewAll',
                  isKorean ? '전체 여행지 10곳 보기' : 'Xem tất cả 10 điểm đến'
                )}
              </span>
              <ArrowRight size={15} className="viewall-arrow" />
            </button>
          </div>
        </div>

        {/* =========================================================
            02. REGION FILTER TABS: Clean Horizontal Text Tabs
        ========================================================= */}
        <div
          className="dest-region-tabs-nav"
          role="tablist"
          aria-label="Filter destinations by region"
        >
          {VIETNAM_REGIONS.map((region) => {
            const isActive = selectedRegion === region.id;
            const regionLabel = isKorean ? region.nameKr : region.nameVi;

            return (
              <button
                key={region.id}
                type="button"
                role="tab"
                id={`region-tab-${region.id}`}
                aria-selected={isActive}
                aria-controls="destinations-grid"
                className={`region-tab-item ${isActive ? 'is-active' : ''}`}
                onClick={() => setSelectedRegion(region.id)}
              >
                <span className="tab-label">{regionLabel}</span>
                {isActive && <span className="tab-active-indicator" />}
              </button>
            );
          })}
        </div>

        {/* =========================================================
            03. DESTINATION CARDS GRID: 5-Column Desktop Layout
        ========================================================= */}
        <div
          id="destinations-grid"
          className="dest-strip-grid"
          role="region"
          aria-live="polite"
        >
          {filteredDestinations.map((dest) => {
            const displayName = isKorean ? dest.nameKr : (dest.nameVi || dest.name);
            const subName = isKorean ? (dest.nameVi || dest.name) : (dest.nameEn || dest.name);
            const description = isKorean
              ? (dest.stripDescKr || dest.tagline)
              : (dest.stripDescVi || dest.taglineVi || dest.tagline);
            const hasError = failedImages.has(dest.id);

            return (
              <article
                key={dest.id}
                className="dest-strip-card"
                onClick={() => handleCardClick(dest)}
                tabIndex={0}
                role="button"
                aria-label={`${displayName} (${subName})`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(dest);
                  }
                }}
              >
                {/* Media Container with 4:3 Ratio */}
                <div className="card-media-wrap">
                  {!hasError ? (
                    <img
                      src={dest.image}
                      alt={`${displayName} - Super EZ Tour`}
                      loading="lazy"
                      className="card-media-img"
                      onError={() => handleImageError(dest.id)}
                      style={{
                        objectPosition: dest.objectPosition || 'center center',
                      }}
                    />
                  ) : (
                    <div className="card-media-fallback" aria-label={displayName}>
                      <div className="fallback-inner">
                        <MapPin size={22} className="fallback-icon" />
                        <span className="fallback-title">{displayName}</span>
                        <span className="fallback-sub">{subName}</span>
                      </div>
                    </div>
                  )}

                  <div className="card-media-overlay" />
                </div>

                {/* Editorial Card Body */}
                <div className="card-content-body">
                  <div className="card-title-row">
                    <h3 className="card-primary-name">{displayName}</h3>
                    <span className="card-sub-name">{subName}</span>
                  </div>

                  <p className="card-tagline-text">{description}</p>

                  <div className="card-footer-action">
                    <span className="card-action-label">
                      {t('home.destinationStrip.ctaExplore', isKorean ? '여행 둘러보기' : 'Khám phá hành trình')}
                    </span>
                    <ArrowRight size={13} className="card-action-arrow" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DestinationNavigation;
