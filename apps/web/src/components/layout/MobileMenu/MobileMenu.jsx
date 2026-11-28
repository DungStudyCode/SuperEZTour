import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, MapPin, Globe, Search, ArrowRight, MessageSquare } from 'lucide-react';
import { VIETNAM_DESTINATIONS, VIETNAM_REGIONS } from '../../../data/vietnamDestinations';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import { useLanguage } from '../../../context/LanguageContext';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose, onOpenQuoteModal, onOpenSearch }) => {
  const [expandedRegion, setExpandedRegion] = useState(null);
  const { setLanguage, t, isKorean } = useLanguage();

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

  const handleDestinationClick = (dest) => {
    const isPublished = dest.experienceStatus === 'published' || (dest.id === 'da-nang' && dest.isAvailable);
    if (!isPublished) {
      onClose();
      if (onOpenQuoteModal) {
        onOpenQuoteModal({ source: 'mobile-menu', destinationId: dest.id });
      }
    } else {
      onClose();
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
            aria-label={t('nav.closeMenu', isKorean ? '메뉴 닫기' : 'Đóng menu')}
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
            <span>{t('nav.searchPlaceholder', isKorean ? '어디로 떠나고 싶으신가요?' : 'Bạn muốn du lịch tới đâu?')}</span>
          </button>
        </div>

        {/* Primary CTA in Drawer */}
        <div className="mobile-primary-cta-wrap">
          <button
            type="button"
            className="mobile-primary-cta-btn"
            onClick={() => {
              onClose();
              onOpenQuoteModal && onOpenQuoteModal({ source: 'mobile-menu' });
            }}
          >
            <span>{t('nav.primaryCta', isKorean ? '맞춤 여행 상담' : 'Tư vấn hành trình')}</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="mobile-menu-body">
          {/* 10 Vietnam Destinations by Region — Uniform Design System */}
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
                          const isPublished = dest.experienceStatus === 'published' || (dest.id === 'da-nang' && dest.isAvailable);
                          const destTitle = isKorean ? dest.nameKr : dest.nameVi;

                          return isPublished && dest.route ? (
                            <Link
                              key={dest.id}
                              to={dest.route}
                              className="mobile-dest-link"
                              onClick={onClose}
                            >
                              <div className="dest-link-titles">
                                <span className="dest-link-main">{destTitle}</span>
                                <span className="dest-link-sub">{dest.name}</span>
                              </div>
                              <ArrowRight size={13} className="dest-link-arrow" />
                            </Link>
                          ) : (
                            <button
                              key={dest.id}
                              type="button"
                              className="mobile-dest-link"
                              onClick={() => handleDestinationClick(dest)}
                            >
                              <div className="dest-link-titles">
                                <span className="dest-link-main">{destTitle}</span>
                                <span className="dest-link-sub">{dest.name}</span>
                              </div>
                              <ArrowRight size={13} className="dest-link-arrow" />
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

          {/* 4 Main Navigation Links */}
          <div className="mobile-nav-group">
            <a href="#destinations" className="mobile-main-link" onClick={onClose}>
              <span>{t('nav.destinations', isKorean ? '여행지' : 'Điểm đến')}</span>
            </a>
            <a href="#signature-journeys" className="mobile-main-link" onClick={onClose}>
              <span>{t('nav.privateTours', isKorean ? '프라이빗 투어' : 'Hành trình riêng')}</span>
            </a>
            <a href="#travel-services" className="mobile-main-link" onClick={onClose}>
              <span>{t('nav.services', isKorean ? '여행 서비스' : 'Dịch vụ cao cấp')}</span>
            </a>
            <a href="#why-us" className="mobile-main-link" onClick={onClose}>
              <span>{t('nav.aboutUs', isKorean ? '회사 소개' : 'Vì sao chọn chúng tôi')}</span>
            </a>
          </div>

          <div className="mobile-nav-divider" />

          {/* Direct Consultation Action */}
          <div className="mobile-contact-bar">
            <button
              type="button"
              className="mobile-contact-btn consult"
              onClick={() => {
                onClose();
                onOpenQuoteModal && onOpenQuoteModal({ source: 'mobile-menu' });
              }}
            >
              <MessageSquare size={15} />
              <span>{isKorean ? '1:1 맞춤 여행 상담' : 'Tư vấn hành trình riêng'}</span>
            </button>
          </div>

          {/* Legal / Copyright */}
          <div className="mobile-user-section">
            <p className="mobile-footer-text">
              © Super EZ Tour. All rights reserved.<br />
              100% {isKorean ? '단독 프라이빗 투어' : 'Tour riêng cao cấp'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
