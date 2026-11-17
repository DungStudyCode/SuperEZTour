import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, Phone, MessageSquare, FileText, MapPin, Globe, Search, Sparkles, Clock } from 'lucide-react';
import { VIETNAM_DESTINATIONS, VIETNAM_REGIONS } from '../../../data/vietnamDestinations';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose, onOpenQuoteModal, onOpenSearch }) => {
  const [expandedRegion, setExpandedRegion] = useState('central'); // Default open central for Da Nang

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
          <button type="button" className="mobile-menu-close" onClick={onClose} aria-label="메뉴 닫기">
            <X size={24} />
          </button>
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
            <Search size={16} className="text-gold" />
            <span>어디로 떠나고 싶으신가요?</span>
          </button>
        </div>

        {/* Action quick bar */}
        <div className="mobile-quick-actions">
          <button
            type="button"
            className="mobile-action-btn quote-btn"
            onClick={() => {
              onClose();
              onOpenQuoteModal && onOpenQuoteModal();
            }}
          >
            <FileText size={16} />
            <span>맞춤 견적</span>
          </button>
          <a href={`tel:${BRAND_CONFIG.contact.hotline.replace(/\s+/g, '')}`} className="mobile-action-btn phone-btn">
            <Phone size={16} />
            <span>{BRAND_CONFIG.contact.hotline}</span>
          </a>
          <button
            type="button"
            className="mobile-action-btn chat-btn"
            onClick={() => {
              onClose();
              onOpenQuoteModal && onOpenQuoteModal('kakao');
            }}
          >
            <MessageSquare size={16} />
            <span>카톡 1:1 상담</span>
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="mobile-menu-body">
          {/* 10 Vietnam Destinations by Region */}
          <div className="mobile-nav-group">
            <div className="mobile-nav-group-title">
              <MapPin size={16} className="text-gold" />
              <span>베트남 10대 명소 (지역별)</span>
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
                        <span className="region-name-kr">{region.nameKr} 베트남</span>
                        <span className="region-name-en">({region.nameEn})</span>
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
                                <span className="dest-link-kr gold-text">{dest.nameKr}</span>
                                <span className="dest-link-en">{dest.name}</span>
                              </div>
                              <span className="dest-link-tag available">
                                <Sparkles size={11} />
                                3D 투어
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
                                <span className="dest-link-kr">{dest.nameKr}</span>
                                <span className="dest-link-en">{dest.name}</span>
                              </div>
                              <span className="dest-link-tag coming-soon">
                                <Clock size={10} />
                                준비 중
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

          {/* Other Navigation Links */}
          <div className="mobile-nav-group">
            <a href="#signature-journeys" className="mobile-main-link" onClick={onClose}>
              <span>시그니처 프라이빗 투어</span>
              <span className="link-badge hot">BEST</span>
            </a>
            <a href="#travel-services" className="mobile-main-link" onClick={onClose}>
              <span>4대 핵심 여행 서비스</span>
            </a>
            <a href="#travel-themes" className="mobile-main-link" onClick={onClose}>
              <span>8대 테마별 여행</span>
            </a>
            <a href="#why-us" className="mobile-main-link" onClick={onClose}>
              <span>왜 Super EZ Tour인가 (비교)</span>
            </a>
            <a href="#quick-quote" className="mobile-main-link" onClick={onClose}>
              <span>실시간 상담 & 견적 신청</span>
            </a>
          </div>

          <div className="mobile-nav-divider" />

          {/* User Account / Help */}
          <div className="mobile-user-section">
            <div className="mobile-lang-row">
              <Globe size={16} />
              <span>한국어 (KRW) · English (USD)</span>
            </div>
            <p className="mobile-footer-text">
              © Super EZ Tour Travel Joint Stock Company<br />
              전용 상담: {BRAND_CONFIG.contact.hotline} · 100% 프라이빗 투어
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
