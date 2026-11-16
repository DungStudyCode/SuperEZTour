import React, { useState } from 'react';
import { X, ChevronDown, Phone, MessageSquare, FileText, MapPin, Globe } from 'lucide-react';
import { COUNTRIES, DESTINATIONS } from '../../../data/destinations';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose, onOpenQuoteModal }) => {
  const [expandedCountry, setExpandedCountry] = useState(null);

  if (!isOpen) return null;

  const toggleCountry = (id) => {
    setExpandedCountry(expandedCountry === id ? null : id);
  };

  const countries = COUNTRIES.filter((c) => c.id !== 'all');

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="mobile-menu-top">
          <a href="/" className="mobile-logo" onClick={onClose} aria-label={BRAND_CONFIG.brandName}>
            <img
              src={BRAND_CONFIG.logo}
              alt={BRAND_CONFIG.brandName}
              className="mobile-logo-img"
            />
          </a>
          <button type="button" className="mobile-menu-close" onClick={onClose} aria-label="Đóng menu">
            <X size={24} />
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
            <span>Báo giá nhanh</span>
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
              onOpenQuoteModal && onOpenQuoteModal();
            }}
          >
            <MessageSquare size={16} />
            <span>Tư vấn 1:1</span>
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="mobile-menu-body">
          <div className="mobile-nav-group">
            <div className="mobile-nav-group-title">
              <MapPin size={16} className="text-primary" />
              <span>16 Điểm Đến Châu Á Cao Cấp</span>
            </div>

            <div className="mobile-country-list">
              {countries.map((country) => {
                const isExpanded = expandedCountry === country.id;
                const dests = DESTINATIONS.filter((d) => d.countryId === country.id);

                return (
                  <div key={country.id} className="mobile-country-item">
                    <button
                      type="button"
                      className={`mobile-country-toggle ${isExpanded ? 'is-active' : ''}`}
                      onClick={() => toggleCountry(country.id)}
                    >
                      <div className="country-toggle-left">
                        <span className="country-flag">{country.flag}</span>
                        <span className="country-name">{country.name}</span>
                        <span className="country-count-tag">({dests.length})</span>
                      </div>
                      <ChevronDown size={18} className={`chevron-icon ${isExpanded ? 'rotate' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="mobile-dest-sublist animate-slide-down">
                        {dests.map((dest) => (
                          <a
                            key={dest.id}
                            href={`#dest-${dest.id}`}
                            className="mobile-dest-link"
                            onClick={onClose}
                          >
                            <span className="dest-link-name">{dest.name}</span>
                            {dest.tag && <span className="dest-link-tag">{dest.tag}</span>}
                          </a>
                        ))}
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
            <a href="#themes" className="mobile-main-link" onClick={onClose}>
              <span>Tour theo chủ đề</span>
              <span className="link-badge">5 Themes</span>
            </a>
            <a href="#reviews" className="mobile-main-link" onClick={onClose}>
              <span>Đánh giá từ du khách</span>
              <span className="link-badge hot">{BRAND_CONFIG.stats.customersServed}</span>
            </a>
            <a href="#community" className="mobile-main-link" onClick={onClose}>
              <span>Cộng đồng & Mẹo hay</span>
            </a>
            <a href="#map" className="mobile-main-link" onClick={onClose}>
              <span>Bản đồ hành trình Châu Á</span>
            </a>
            <a href="#why-us" className="mobile-main-link" onClick={onClose}>
              <span>Vì sao chọn {BRAND_CONFIG.brandShortName}?</span>
            </a>
          </div>

          <div className="mobile-nav-divider" />

          {/* User Account / Help */}
          <div className="mobile-user-section">
            <div className="mobile-lang-row">
              <Globe size={16} />
              <span>Tiếng Việt (VND) · English</span>
            </div>
            <p className="mobile-footer-text">
              © {BRAND_CONFIG.legal.companyName}<br />
              Hotline: {BRAND_CONFIG.contact.hotline} · {BRAND_CONFIG.slogan}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
