import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Clock, Globe, Search, ChevronDown, Menu, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';
import MegaMenu from '../MegaMenu/MegaMenu';
import MobileMenu from '../MobileMenu/MobileMenu';
import DestinationSearchModal from '../../common/DestinationSearch/DestinationSearchModal';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import './Header.css';

const Header = ({ onOpenQuoteModal }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
        {/* Top Utility Bar */}
        <div className="header-top-bar">
          <div className="container header-top-container">
            <div className="header-top-left">
              <div className="top-item">
                <span className="kakao-pill-badge">KakaoTalk</span>
                <span className="font-semibold">실시간 카톡 상담:</span>
                <button
                  type="button"
                  className="top-text-btn font-semibold"
                  onClick={() => onOpenQuoteModal && onOpenQuoteModal('kakao')}
                >
                  @supereztour
                </button>
              </div>
              <span className="top-divider">|</span>
              <div className="top-item">
                <Phone size={13} className="text-gold" />
                <span className="font-semibold">전용 핫라인:</span>
                <a href={`tel:${BRAND_CONFIG.contact.hotline.replace(/\s+/g, '')}`} className="hotline-number">
                  {BRAND_CONFIG.contact.hotline}
                </a>
              </div>
              <span className="top-divider">|</span>
              <div className="top-item top-badge-trust">
                <ShieldCheck size={14} className="text-gold" />
                <span>100% 단독 프라이빗 투어 · 전용 리무진 & 한국어 가이드</span>
              </div>
            </div>

            <div className="header-top-right">
              <div className="top-item lang-selector">
                <Globe size={13} />
                <span>한국어 (KRW)</span>
                <ChevronDown size={11} />
              </div>
              <span className="top-divider">|</span>
              <button
                type="button"
                className="top-link btn-unstyled"
                onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
              >
                <span>실시간 견적 조회</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="header-main-bar">
          <div className="container header-main-container">
            {/* Official Brand Logo */}
            <Link to="/" className="brand-logo-container" aria-label={BRAND_CONFIG.brandName}>
              <img
                src={BRAND_CONFIG.logo}
                alt={BRAND_CONFIG.brandName}
                className="brand-logo-img"
              />
            </Link>

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
                    aria-expanded={isMegaMenuOpen}
                  >
                    <span>여행지</span>
                    <span className="nav-badge-count">10대 명소</span>
                    <ChevronDown size={14} className={`nav-chevron ${isMegaMenuOpen ? 'rotate' : ''}`} />
                  </button>
                </li>

                <li className="nav-item">
                  <a href="#signature-journeys" className="nav-link">
                    <span>프라이빗 투어</span>
                    <span className="nav-pill-hot">HOT</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#travel-services" className="nav-link">
                    <span>여행 서비스</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#travel-themes" className="nav-link">
                    <span>여행 테마</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#why-us" className="nav-link">
                    <span>왜 Super EZ Tour인가</span>
                  </a>
                </li>
              </ul>
            </nav>

            {/* Right Action CTAs */}
            <div className="header-actions">
              {/* Destination Search Button */}
              <button
                type="button"
                className="header-search-btn"
                onClick={() => setIsSearchOpen(true)}
                title="베트남 여행지 검색 (어디로 떠나고 싶으신가요?)"
                aria-label="여행지 검색"
              >
                <Search size={16} />
                <span className="search-btn-text">여행지 검색</span>
              </button>

              {/* 1:1 Kakao Consultation CTA */}
              <button
                type="button"
                className="header-consult-btn"
                onClick={() => onOpenQuoteModal && onOpenQuoteModal('kakao')}
                title="카카오톡 1:1 전담 매니저 상담"
              >
                <MessageCircle size={17} />
                <span>카카오톡 상담</span>
              </button>

              {/* Quick Custom Quote Button */}
              <button
                type="button"
                className="header-quote-btn"
                onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
              >
                <Sparkles size={15} className="btn-sparkle" />
                <span>맞춤 견적 요청</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                className="mobile-hamburger-btn"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="모바일 메뉴 열기"
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
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
          onOpenQuoteModal={onOpenQuoteModal}
        />
      </div>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenQuoteModal={onOpenQuoteModal}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Global Destination Search Modal */}
      <DestinationSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </>
  );
};

export default Header;
