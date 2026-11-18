import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { VIETNAM_DESTINATIONS } from '../../../data/vietnamDestinations';
import { useLanguage } from '../../../context/LanguageContext';
import './MegaMenu.css';

const MegaMenu = ({ isOpen, onClose, onOpenQuoteModal }) => {
  const menuRef = useRef(null);
  const { t, isKorean } = useLanguage();

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Group destinations by region
  const northDestinations = VIETNAM_DESTINATIONS.filter((d) => d.region === 'north');
  const centralDestinations = VIETNAM_DESTINATIONS.filter((d) => d.region === 'central');
  const southDestinations = VIETNAM_DESTINATIONS.filter((d) => d.region === 'south');

  const daNangDest = VIETNAM_DESTINATIONS.find((d) => d.id === 'da-nang');

  const handleComingSoonClick = (e, dest) => {
    e.preventDefault();
    onClose();
    if (onOpenQuoteModal) {
      onOpenQuoteModal(dest.id);
    }
  };

  return (
    <div className="megamenu-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        ref={menuRef}
        className="megamenu-panel animate-fade-slide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="megamenu-container">
          {/* Editorial Header */}
          <div className="megamenu-header">
            <div className="megamenu-header-left">
              <span className="megamenu-kicker">
                {t('megamenu.exploreKicker', 'EXPLORE VIETNAM')}
              </span>
              <h3 className="megamenu-title">
                {t('megamenu.exploreTitle', isKorean ? '여행지 둘러보기' : 'Khám phá điểm đến')}
              </h3>
            </div>
            <a href="#destinations" className="megamenu-view-all" onClick={onClose}>
              <span>{t('megamenu.viewAll', isKorean ? '전체 10개 여행지 보기' : 'Xem tất cả 10 điểm đến')}</span>
              <ArrowRight size={14} className="view-all-arrow" />
            </a>
          </div>

          {/* 3 Editorial Region Columns */}
          <div className="megamenu-columns-grid">
            {/* Column 01: North */}
            <div className="megamenu-column">
              <div className="column-header">
                <span className="column-label">
                  {t('megamenu.region01', isKorean ? '01 / 북부 베트남' : '01 / MIỀN BẮC')}
                </span>
              </div>
              <ul className="column-dest-list">
                {northDestinations.map((dest) => {
                  const destName = isKorean ? dest.nameKr : (dest.nameVi || dest.name);
                  return (
                    <li key={dest.id} className="dest-list-item">
                      <button
                        type="button"
                        className="dest-item-btn is-coming-soon"
                        onClick={(e) => handleComingSoonClick(e, dest)}
                        title={t('megamenu.comingSoonTooltip', isKorean ? '준비 중 (1:1 맞춤 견적 문의)' : 'Sắp ra mắt (Tư vấn tour riêng)')}
                      >
                        <span className="dest-item-name">{destName}</span>
                        <ArrowRight size={13} className="dest-item-arrow" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 02: Central (Highlights Da Nang) */}
            <div className="megamenu-column">
              <div className="column-header">
                <span className="column-label">
                  {t('megamenu.region02', isKorean ? '02 / 중부 베트남' : '02 / MIỀN TRUNG')}
                </span>
              </div>
              <ul className="column-dest-list">
                {centralDestinations.map((dest) => {
                  const isAvailable = dest.isAvailable;
                  const destName = isKorean ? dest.nameKr : (dest.nameVi || dest.name);

                  return (
                    <li key={dest.id} className="dest-list-item">
                      {isAvailable ? (
                        <Link
                          to={dest.route}
                          className="dest-item-btn is-available"
                          onClick={onClose}
                        >
                          <span className="dest-item-name">
                            {destName}
                            <span className="available-indicator" title="3D Virtual Experience Available" />
                          </span>
                          <ArrowRight size={13} className="dest-item-arrow" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="dest-item-btn is-coming-soon"
                          onClick={(e) => handleComingSoonClick(e, dest)}
                          title={t('megamenu.comingSoonTooltip', isKorean ? '준비 중 (1:1 맞춤 견적 문의)' : 'Sắp ra mắt (Tư vấn tour riêng)')}
                        >
                          <span className="dest-item-name">{destName}</span>
                          <ArrowRight size={13} className="dest-item-arrow" />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 03: South */}
            <div className="megamenu-column">
              <div className="column-header">
                <span className="column-label">
                  {t('megamenu.region03', isKorean ? '03 / 남부 베트남' : '03 / MIỀN NAM')}
                </span>
              </div>
              <ul className="column-dest-list">
                {southDestinations.map((dest) => {
                  const destName = isKorean ? dest.nameKr : (dest.nameVi || dest.name);
                  return (
                    <li key={dest.id} className="dest-list-item">
                      <button
                        type="button"
                        className="dest-item-btn is-coming-soon"
                        onClick={(e) => handleComingSoonClick(e, dest)}
                        title={t('megamenu.comingSoonTooltip', isKorean ? '준비 중 (1:1 맞춤 견적 문의)' : 'Sắp ra mắt (Tư vấn tour riêng)')}
                      >
                        <span className="dest-item-name">{destName}</span>
                        <ArrowRight size={13} className="dest-item-arrow" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Featured Destination Horizontal Editorial Strip */}
          {daNangDest && (
            <div className="megamenu-strip-section">
              <Link
                to="/destinations/da-nang"
                className="megamenu-editorial-strip"
                onClick={onClose}
              >
                {/* LEFT: Light natural travel photography */}
                <div className="strip-media-wrap">
                  <img
                    src={daNangDest.image}
                    alt={isKorean ? daNangDest.nameKr : (daNangDest.nameVi || daNangDest.name)}
                    className="strip-media-img"
                    loading="lazy"
                  />
                </div>

                {/* CENTER: Editorial headline & brief */}
                <div className="strip-body">
                  <span className="strip-kicker">
                    {t('megamenu.featuredKicker', isKorean ? '추천 여행지' : 'ĐIỂM ĐẾN TIÊU BIỂU')}
                  </span>
                  <h4 className="strip-title">
                    {t('megamenu.featuredTitle', isKorean ? '다낭 — Beyond the Ordinary' : 'Đà Nẵng — Beyond the Ordinary')}
                  </h4>
                  <p className="strip-desc">
                    {t(
                      'megamenu.featuredDesc',
                      isKorean
                        ? '100% 단독 프라이빗 투어 · 바나힐 & 럭셔리 리조트 맞춤 일정.'
                        : 'Hành trình riêng tư với xe đón tiễn, trải nghiệm Bà Nà Hills và dịch vụ chuẩn 5 sao.'
                    )}
                  </p>
                </div>

                {/* RIGHT: Minimal Arrow */}
                <div className="strip-arrow-wrap">
                  <ArrowRight size={18} className="strip-arrow-icon" />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
