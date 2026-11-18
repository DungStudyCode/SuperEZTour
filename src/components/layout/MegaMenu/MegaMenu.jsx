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

  const handleDestinationClick = (e, dest) => {
    const isPublished = dest.experienceStatus === 'published' || (dest.id === 'da-nang' && dest.isAvailable);
    if (!isPublished) {
      e.preventDefault();
      onClose();
      if (onOpenQuoteModal) {
        onOpenQuoteModal({ source: 'megamenu', destinationId: dest.id });
      }
    } else {
      onClose();
    }
  };

  const renderDestinationItem = (dest) => {
    const isPublished = dest.experienceStatus === 'published' || (dest.id === 'da-nang' && dest.isAvailable);
    const destName = isKorean ? dest.nameKr : (dest.nameVi || dest.name);

    return (
      <li key={dest.id} className="dest-list-item">
        {isPublished && dest.route ? (
          <Link
            to={dest.route}
            className="dest-item-btn"
            onClick={onClose}
          >
            <span className="dest-item-name">{destName}</span>
            <ArrowRight size={13} className="dest-item-arrow" />
          </Link>
        ) : (
          <button
            type="button"
            className="dest-item-btn"
            onClick={(e) => handleDestinationClick(e, dest)}
          >
            <span className="dest-item-name">{destName}</span>
            <ArrowRight size={13} className="dest-item-arrow" />
          </button>
        )}
      </li>
    );
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

          {/* 3 Editorial Region Columns — Clean, Equal Priority across all 10 Destinations */}
          <div className="megamenu-columns-grid">
            {/* Column 01: North */}
            <div className="megamenu-column">
              <div className="column-header">
                <span className="column-label">
                  {t('megamenu.region01', isKorean ? '01 / 북부 베트남' : '01 / MIỀN BẮC')}
                </span>
              </div>
              <ul className="column-dest-list">
                {northDestinations.map(renderDestinationItem)}
              </ul>
            </div>

            {/* Column 02: Central */}
            <div className="megamenu-column">
              <div className="column-header">
                <span className="column-label">
                  {t('megamenu.region02', isKorean ? '02 / 중부 베트남' : '02 / MIỀN TRUNG')}
                </span>
              </div>
              <ul className="column-dest-list">
                {centralDestinations.map(renderDestinationItem)}
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
                {southDestinations.map(renderDestinationItem)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
