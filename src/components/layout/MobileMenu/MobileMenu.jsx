import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, Phone, MessageSquare, MapPin, Globe, Search, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { VIETNAM_DESTINATIONS, VIETNAM_REGIONS } from '../../../data/vietnamDestinations';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import { useLanguage } from '../../../context/LanguageContext';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose, onOpenQuoteModal, onOpenSearch }) => {
  const [expandedRegion, setExpandedRegion] = useState('central'); // Default open central for Da Nang
  const { language, setLanguage, t, isKorean } = useLanguage();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleRegion = (id) => {
    setExpandedRegion(expandedRegion === id ? null : id);
  };

  const regions = VIETNAM_REGIONS.filter((r) => r.id !== 'all');

  const handleComingSoonClick = (dest) => {
    onClose();
    if (onOpenQuoteModal) {
      onOpenQuoteModal(dest.id);
    }
  };

  return (
    <div className="mobile-menu-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="mobile-menu-drawer animate-slide-right" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="mobile-menu-top">
          <Link to="/" className="mobile-logo" onClick={onClose} aria-label={BRAND_CONFIG.brandName}>
            <img
              src={BRAND_CONFIG.logo}
              alt={BRAND_CONFIG.brandName}
              className="mobile-logo-img"
            />
          </Link>
          <button
            type="button"
            className="mobile-menu-close"
            onClick={onClose}
            aria-label={t('nav.closeMenu', '메뉴 닫기')}
          >
            <X size={22} />
          </button>
        </div>

        {/* Language Switcher in Mobile Drawer */}
        <div className="mobile-lang-switcher-row">
          <div className="lang-title-group">
            <Globe size={15} className="lang-icon text-orange" />
            <span className="lang-label">{isKorean ? '언어 선택' : 'Ngôn ngữ'}</span>
          </div>
          <div className="mobile-lang-pills">
            <button
              type="button"
              className={`mobile-lang-pill ${isKorean ? 'is-active' : ''}`}
              onClick={() => setLanguage('ko')}
            >
              한국어
            </button>
            <button
              type="button"
              className={`mobile-lang-pill ${!isKorean ? 'is-active' : ''}`}
              onClick={() => setLanguage('vi')}
            >
              Tiếng Việt
            </button>
          </div>
        </div>

        {/* Quick Search Bar inside Mobile Drawer */}
        <div className="mobile-search-trigger-wrap">
          <button
            type="button"
            className="mobile-search-trigger-btn"
            onClick={() => {
              onClose();
              onOpenSearch && onOpenSearch();
            }}
          >
            <Search size={16} className="text-orange" />
            <span>{t('nav.searchPlaceholder', '어디로 떠나고 싶으신가요?')}</span>
          </button>
        </div>

        {/* Primary CTA in Drawer */}
        <div className="mobile-primary-cta-wrap">
          <button
            type="button"
            className="mobile-primary-cta-btn"
            onClick={() => {
              onClose();
              onOpenQuoteModal && onOpenQuoteModal();
            }}
          >
            <span>{t('nav.primaryCta', '맞춤 여행 상담')}</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="mobile-menu-body">
          {/* 10 Vietnam Destinations by Region */}
          <div className="mobile-nav-group">
            <div className="mobile-nav-group-title">
              <MapPin size={16} className="text-orange" />
              <span>{isKorean ? '베트남 10대 명소 (지역별)' : '10 Điểm đến hàng đầu (Theo vùng)'}</span>
            </div>

            <div className="mobile-region-list">
              {regions.map((region) => {
                const isExpanded = expandedRegion === region.id;
                const dests = VIETNAM_DESTINATIONS.filter((d) => d.region === region.id);

                return (
                  <div key={region.id} className="mobile-region-item">
                    <button
                      type="button"
                      className={`mobile-region-toggle ${isExpanded ? 'is-active' : ''}`}
                      onClick={() => toggleRegion(region.id)}
                    >
                      <div className="region-toggle-left">
                        <span className="region-name-main">
                          {isKorean ? `${region.nameKr} 베트남` : region.nameVi}
                        </span>
                        <span className="region-name-sub">({region.nameEn})</span>
                      </div>
                      <ChevronDown size={18} className={`chevron-icon ${isExpanded ? 'rotate' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="mobile-dest-sublist animate-slide-down">
                        {dests.map((dest) => {
                          const isAvailable = dest.isAvailable;
                          return isAvailable ? (
                            <Link
                              key={dest.id}
                              to={dest.route}
                              className="mobile-dest-link is-available"
                              onClick={onClose}
                            >
                              <div className="dest-link-titles">
                                <span className="dest-link-main orange-text">
                                  {isKorean ? dest.nameKr : dest.nameVi}
                                </span>
                                <span className="dest-link-sub">{dest.name}</span>
                              </div>
                              <span className="dest-link-tag available">
                                <Sparkles size={11} />
                                {t('common.availableNow', '3D 투어')}
                              </span>
                            </Link>
                          ) : (
                            <button
                              key={dest.id}
                              type="button"
                              className="mobile-dest-link coming-soon"
                              onClick={() => handleComingSoonClick(dest)}
                            >
                              <div className="dest-link-titles">
                                <span className="dest-link-main">
                                  {isKorean ? dest.nameKr : dest.nameVi}
                                </span>
                                <span className="dest-link-sub">{dest.name}</span>
                              </div>
                              <span className="dest-link-tag coming-soon">
                                <Clock size={10} />
                                {t('common.comingSoon', '준비 중')}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mobile-nav-divider" />

          {/* 4 Main Navigation Links (Clean & Aligned with Desktop) */}
          <div className="mobile-nav-group">
            <a href="#destinations" className="mobile-main-link" onClick={onClose}>
              <span>{t('nav.destinations', '여행지')}</span>
            </a>
            <a href="#signature-journeys" className="mobile-main-link" onClick={onClose}>
              <span>{t('nav.privateTours', '프라이빗 투어')}</span>
            </a>
            <a href="#travel-services" className="mobile-main-link" onClick={onClose}>
              <span>{t('nav.services', '여행 서비스')}</span>
            </a>
            <a href="#why-us" className="mobile-main-link" onClick={onClose}>
              <span>{t('nav.aboutUs', '회사 소개')}</span>
            </a>
          </div>

          <div className="mobile-nav-divider" />

          {/* Direct Contact Options */}
          <div className="mobile-contact-bar">
            <button
              type="button"
              className="mobile-contact-btn kakao"
              onClick={() => {
                onClose();
                onOpenQuoteModal && onOpenQuoteModal('kakao');
              }}
            >
              <span>KakaoTalk @superez</span>
            </button>
            <a
              href={`tel:${BRAND_CONFIG.contact.hotline.replace(/\s+/g, '')}`}
              className="mobile-contact-btn hotline"
            >
              <Phone size={14} />
              <span>{BRAND_CONFIG.contact.hotline}</span>
            </a>
          </div>

          {/* Legal / Copyright */}
          <div className="mobile-user-section">
            <p className="mobile-footer-text">
              © Super EZ Tour Travel Joint Stock Company<br />
              100% {isKorean ? '단독 프라이빗 투어' : 'Tour riêng cao cấp'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
