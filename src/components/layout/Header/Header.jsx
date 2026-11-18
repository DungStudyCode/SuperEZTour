import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ChevronDown, Menu, ArrowRight } from 'lucide-react';
import MegaMenu from '../MegaMenu/MegaMenu';
import MobileMenu from '../MobileMenu/MobileMenu';
import DestinationSearchModal from '../../common/DestinationSearch/DestinationSearchModal';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import { useLanguage } from '../../../context/LanguageContext';
import './Header.css';

const Header = ({ onOpenQuoteModal }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const closeTimeoutRef = useRef(null);
  const location = useLocation();
  const { language, setLanguage, t, isKorean } = useLanguage();

  // Scroll listener for sticky header elevation shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto close all menus and modals on route change
  useEffect(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Hover grace bridge for MegaMenu
  const handleMenuMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMegaMenuOpen(true);
  };

  const handleMenuMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 220);
  };

  const handleMenuToggle = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMegaMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div className={`site-header-wrapper ${isSticky ? 'is-sticky' : ''}`}>
        <header className={`site-header ${isSticky ? 'header-sticky' : ''}`}>
          {/* Single-Layer Main Navbar: Background #FFFFFF, Height 76px */}
          <div className="header-main-bar">
            <div className="container header-main-container">
              {/* LEFT: Super EZ Tour Brand Logo */}
              <Link to="/" className="brand-logo-container" aria-label={BRAND_CONFIG.brandName}>
                <img
                  src={BRAND_CONFIG.logo}
                  alt={BRAND_CONFIG.brandName}
                  className="brand-logo-img"
                  width="126"
                  height="42"
                />
              </Link>

              {/* CENTER: Clean 4 Navigation Items (No badges, No text wrapping) */}
              <nav className="header-nav" aria-label="Main Navigation">
                <ul className="nav-list">
                  {/* 1. Destinations (Opens MegaMenu) */}
                  <li
                    className={`nav-item has-megamenu ${isMegaMenuOpen ? 'is-active' : ''}`}
                    onMouseEnter={handleMenuMouseEnter}
                    onMouseLeave={handleMenuMouseLeave}
                  >
                    <button
                      type="button"
                      className="nav-link destination-trigger"
                      onClick={handleMenuToggle}
                      aria-expanded={isMegaMenuOpen}
                      aria-haspopup="true"
                    >
                      <span>{t('nav.destinations', '여행지')}</span>
                      <ChevronDown size={14} className={`nav-chevron ${isMegaMenuOpen ? 'rotate' : ''}`} />
                    </button>
                  </li>

                  {/* 2. Private Tours */}
                  <li className="nav-item">
                    <a href="#signature-journeys" className="nav-link">
                      <span>{t('nav.privateTours', '프라이빗 투어')}</span>
                    </a>
                  </li>

                  {/* 3. Travel Services */}
                  <li className="nav-item">
                    <a href="#travel-services" className="nav-link">
                      <span>{t('nav.services', '여행 서비스')}</span>
                    </a>
                  </li>

                  {/* 4. About Us */}
                  <li className="nav-item">
                    <a href="#why-us" className="nav-link">
                      <span>{t('nav.aboutUs', '회사 소개')}</span>
                    </a>
                  </li>
                </ul>
              </nav>

              {/* RIGHT: Search | Language Switcher (KO/VI) | Consultation CTA | Mobile Menu */}
              <div className="header-actions">
                {/* 1. Search Icon Button */}
                <button
                  type="button"
                  className="header-search-icon-btn"
                  onClick={() => setIsSearchOpen(true)}
                  title={t('nav.search', isKorean ? '여행지 검색' : 'Tìm kiếm')}
                  aria-label={t('nav.search', isKorean ? '여행지 검색' : 'Tìm kiếm')}
                >
                  <Search size={18} />
                </button>

                {/* 2. Compact Bilingual Switcher (KO / VI) */}
                <div
                  className="navbar-lang-switcher"
                  role="group"
                  aria-label={t('common.switchLangAria', 'Language selection')}
                >
                  <button
                    type="button"
                    className={`nav-lang-btn ${isKorean ? 'is-active' : ''}`}
                    onClick={() => setLanguage('ko')}
                    title={t('common.langKorean', '한국어')}
                    aria-pressed={isKorean}
                  >
                    KO
                  </button>
                  <span className="nav-lang-divider" aria-hidden="true">/</span>
                  <button
                    type="button"
                    className={`nav-lang-btn ${!isKorean ? 'is-active' : ''}`}
                    onClick={() => setLanguage('vi')}
                    title={t('common.langVietnamese', 'Tiếng Việt')}
                    aria-pressed={!isKorean}
                  >
                    VI
                  </button>
                </div>

                {/* 3. Primary CTA: 맞춤 여행 상담 / Tư vấn chuyến đi */}
                <button
                  type="button"
                  className="header-primary-cta"
                  onClick={() => onOpenQuoteModal && onOpenQuoteModal({ source: 'navbar' })}
                >
                  <span>{t('nav.primaryCta', '맞춤 여행 상담')}</span>
                  <ArrowRight size={14} className="cta-arrow" />
                </button>

                {/* 4. Mobile Hamburger Menu Button */}
                <button
                  type="button"
                  className="mobile-hamburger-btn"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label={t('nav.menu', '메뉴 열기')}
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Desktop MegaMenu with Hover Bridge */}
      <div
        className="megamenu-portal-wrap"
        onMouseEnter={handleMenuMouseEnter}
        onMouseLeave={handleMenuMouseLeave}
      >
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => {
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
            setIsMegaMenuOpen(false);
          }}
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
