import React, { useState, useEffect } from 'react';
import { Phone, Clock, Globe, User, ChevronDown, Menu, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';
import MegaMenu from '../MegaMenu/MegaMenu';
import MobileMenu from '../MobileMenu/MobileMenu';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import './Header.css';

const Header = ({ onOpenQuoteModal }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${isSticky ? 'header-sticky' : ''}`}>
        {/* Top Utility Bar (Hidden when sticky for compact clean view) */}
        <div className="header-top-bar">
          <div className="container header-top-container">
            <div className="header-top-left">
              <div className="top-item">
                <Phone size={14} className="text-primary" />
                <span className="font-semibold">Hotline CSKH:</span>
                <a href={`tel:${BRAND_CONFIG.contact.hotline.replace(/\s+/g, '')}`} className="hotline-number">
                  {BRAND_CONFIG.contact.hotline}
                </a>
              </div>
              <span className="top-divider">|</span>
              <div className="top-item">
                <Clock size={14} />
                <span>{BRAND_CONFIG.contact.workingHours}</span>
              </div>
              <span className="top-divider">|</span>
              <div className="top-item top-badge-trust">
                <ShieldCheck size={14} className="text-primary" />
                <span>Tour riêng 100% · Xe & HDV riêng</span>
              </div>
            </div>

            <div className="header-top-right">
              <div className="top-item lang-selector">
                <Globe size={14} />
                <span>Tiếng Việt (VND)</span>
                <ChevronDown size={12} />
              </div>
              <span className="top-divider">|</span>
              <a href="#quote" className="top-link">
                <span>Tra cứu báo giá</span>
              </a>
              <span className="top-divider">|</span>
              <button
                type="button"
                className="top-link auth-link"
                onClick={() => alert(`Cổng thành viên ${BRAND_CONFIG.brandName} đang được nâng cấp. Quý khách vui lòng liên hệ hotline ${BRAND_CONFIG.contact.hotline} để được hỗ trợ nhanh nhất.`)}
              >
                <User size={14} />
                <span>Đăng nhập / Đăng ký</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="header-main-bar">
          <div className="container header-main-container">
            {/* Official Brand Logo */}
            <a href="/" className="brand-logo-container" aria-label={BRAND_CONFIG.brandName}>
              <img
                src={BRAND_CONFIG.logo}
                alt={BRAND_CONFIG.brandName}
                className="brand-logo-img"
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="header-nav" aria-label="Main Navigation">
              <ul className="nav-list">
                {/* Destination Dropdown / MegaMenu Trigger */}
                <li
                  className={`nav-item has-megamenu ${isMegaMenuOpen ? 'is-active' : ''}`}
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                >
                  <button
                    type="button"
                    className="nav-link destination-trigger"
                    onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  >
                    <span>Điểm đến du lịch</span>
                    <span className="nav-badge-count">16 Điểm đến</span>
                    <ChevronDown size={14} className={`nav-chevron ${isMegaMenuOpen ? 'rotate' : ''}`} />
                  </button>
                </li>

                <li className="nav-item">
                  <a href="#themes" className="nav-link">
                    <span>Tour theo chủ đề</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#reviews" className="nav-link">
                    <span>Đánh giá du khách</span>
                    <span className="nav-pill-hot">HOT</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#community" className="nav-link">
                    <span>Cộng đồng & Mẹo hay</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#map" className="nav-link">
                    <span>Bản đồ hành trình</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#why-us" className="nav-link">
                    <span>Vì sao chọn EZ Tour</span>
                  </a>
                </li>
              </ul>
            </nav>

            {/* Right Action CTAs */}
            <div className="header-actions">
              <button
                type="button"
                className="header-consult-btn"
                onClick={onOpenQuoteModal}
                title="Tư vấn trực tuyến 1:1"
              >
                <MessageCircle size={18} />
                <span>Tư vấn 1:1</span>
              </button>

              <button
                type="button"
                className="header-quote-btn"
                onClick={onOpenQuoteModal}
              >
                <Sparkles size={16} className="btn-sparkle" />
                <span>Báo giá nhanh 30'</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                className="mobile-hamburger-btn"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Mở menu di động"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop MegaMenu */}
      <div
        onMouseEnter={() => setIsMegaMenuOpen(true)}
        onMouseLeave={() => setIsMegaMenuOpen(false)}
      >
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </div>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </>
  );
};

export default Header;
