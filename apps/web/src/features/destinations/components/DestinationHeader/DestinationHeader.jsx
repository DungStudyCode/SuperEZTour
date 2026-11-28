import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Phone, ArrowUpRight, ChevronRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../../../constants/brand.config';
import { useLanguage } from '../../../../context/LanguageContext';
import { useConsultation } from '../../../../context/ConsultationContext';
import { getDestinationNav } from '../../data/destinationNav.config';
import { getLenis } from '../../../../utils/lenisManager';
import './DestinationHeader.css';

/**
 * Super EZ Tour — Destination Smart Navigation Header
 * Standardized across all 3D Interactive Destination pages (Da Nang, Hanoi, etc.)
 * Architectural Principle: "ONE SHARED HEADER — MULTIPLE DESTINATION IDENTITIES"
 */
const DestinationHeader = ({ destination, onOpenConsultModal }) => {
  const { language, setLanguage, t, isKorean } = useLanguage();
  const { openNewConsultation } = useConsultation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  // Destination-specific navigation items from centralized registry
  const navItems = useMemo(() => {
    return getDestinationNav(destination?.id || destination?.slug);
  }, [destination?.id, destination?.slug]);

  // Destination identity & Hanoi-scoped editorial variant
  const destId = destination?.id || destination?.slug || 'da-nang';
  const isHanoi = destId === 'ha-noi';

  // Destination dynamic localized name
  const destDisplayName = isKorean
    ? destination?.nameKr || destination?.name || '베트남'
    : destination?.name || destination?.nameVi || 'Việt Nam';

  // Scroll Progress & Hide/Show behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (totalScroll > 0) {
        setScrollProgress((currentY / totalScroll) * 100);
      }

      // Background switch
      setIsScrolled(currentY > 80);

      // Auto hide on scroll down, show on scroll up
      if (currentY > 300 && currentY > lastScrollY && !isMobileMenuOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      // Clear activeSection when back at top hero
      if (currentY < 150) {
        setActiveSection('');
      }

      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // Active Section Observer via IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const sectionIds = navItems.map((item) => item.sectionId);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          // Pick the section closest to the top offset
          intersecting.sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );
          setActiveSection(intersecting[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -55% 0px',
        threshold: [0, 0.2, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [navItems]);

  // Prevent background scroll & support Escape key when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll handler with Lenis support & ScrollTrigger sort/refresh before target calculation
  const scrollToSection = useCallback((id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (!element) return;

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    const headerOffset = 76;
    const lenis = getLenis();
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.resize();
      lenis.scrollTo(element, { offset: -headerOffset, duration: 1.2 });
    } else {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    setActiveSection(id);
  }, []);

  // CTA Click: Opens consultation context with destination or scrolls to TripBuilder
  const handleCtaClick = useCallback(() => {
    setIsMobileMenuOpen(false);
    if (typeof onOpenConsultModal === 'function') {
      onOpenConsultModal({
        destinationId: destination?.id || 'da-nang',
        source: 'destination-header',
      });
      return;
    }
    const tripBuilderEl = document.getElementById('trip-builder');
    if (tripBuilderEl) {
      scrollToSection('trip-builder');
    } else if (openNewConsultation) {
      openNewConsultation({
        destinationId: destination?.id || 'da-nang',
        source: 'destination-header',
      });
    }
  }, [destination?.id, onOpenConsultModal, openNewConsultation, scrollToSection]);

  return (
    <>
      <header
        className={`dest-header ${isScrolled ? 'dest-header-scrolled' : ''} ${
          isHidden ? 'dest-header-hidden' : ''
        }`}
        data-destination={destId}
      >
        {/* Scroll Progress Bar */}
        <div
          className="dest-header-progress"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        <div className="dest-header-container">
          {/* Logo & Destination Badge */}
          <div className="dest-header-brand">
            <Link
              to="/"
              className="dest-logo-link"
              title={
                isKorean
                  ? t('destinationNav.backHome', 'Super EZ Tour 홈으로')
                  : t('destinationNav.backHome', 'Về trang chủ Super EZ Tour')
              }
            >
              <img
                src={BRAND_CONFIG.logo}
                alt={BRAND_CONFIG.brandName}
                className="dest-logo-img"
              />
            </Link>
            <div className="dest-header-divider" aria-hidden="true" />
            <div className="dest-header-cur-dest">
              <span className="dest-header-flag" aria-hidden="true">🇻🇳</span>
              <span className="dest-header-dest-name">{destDisplayName}</span>
              <span className="dest-header-tag">
                {t('destinationNav.privateBadge', isKorean ? '100% 프라이빗 투어' : 'Tour Riêng 100%')}
              </span>
            </div>
          </div>

          {/* Dynamic Desktop Navigation Links */}
          <nav
            className="dest-header-nav"
            aria-label={t('destinationNav.menuAria', 'Destination navigation')}
          >
            {navItems.map((item) => {
              const label = t(item.labelKey, isKorean ? item.labelKo : item.labelVi);
              const isActive = activeSection === item.sectionId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`dest-nav-link ${isActive ? 'is-active' : ''} ${
                    item.isHighlight ? 'dest-nav-link-highlight' : ''
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="dest-header-actions">
            {/* Desktop Language Switcher */}
            <div
              className="dest-header-lang-switcher"
              role="group"
              aria-label={t('common.switchLangAria', 'Language selection')}
            >
              <button
                type="button"
                className={`dest-lang-btn ${isKorean ? 'is-active' : ''}`}
                onClick={() => setLanguage('ko')}
                title={t('common.langKorean', '한국어')}
                aria-pressed={isKorean}
                aria-label="한국어 (Korean)"
              >
                KO
              </button>
              <span className="dest-lang-divider" aria-hidden="true">/</span>
              <button
                type="button"
                className={`dest-lang-btn ${!isKorean ? 'is-active' : ''}`}
                onClick={() => setLanguage('vi')}
                title={t('common.langVietnamese', 'Tiếng Việt')}
                aria-pressed={!isKorean}
                aria-label="Tiếng Việt (Vietnamese)"
              >
                VI
              </button>
            </div>

            {/* Hotline Link (Hidden on Hanoi until business hotline is verified) */}
            {!isHanoi && (
              <a
                href="tel:19008899"
                className="dest-header-hotline"
                title={
                  isKorean
                    ? t('destinationNav.hotlineLabel', '24시간 한국어 케어 1900 8899')
                    : t('destinationNav.hotlineLabel', 'Hotline 24/7: 1900 8899')
                }
              >
                <Phone size={14} className="dest-hotline-icon" />
                <span>1900 8899</span>
              </a>
            )}

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleCtaClick}
              className="dest-header-btn-quote"
            >
              <span>
                {t(
                  'destinationNav.primaryCta',
                  isKorean ? '나만의 여행 만들기' : 'Thiết kế chuyến đi'
                )}
              </span>
              <ArrowUpRight size={16} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="dest-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t('destinationNav.menuToggle', 'Toggle navigation menu')}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`dest-mobile-drawer ${
          isMobileMenuOpen ? 'dest-mobile-drawer-open' : ''
        }`}
        data-destination={destId}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className="dest-mobile-drawer-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <div className="dest-mobile-drawer-content" role="dialog" aria-modal="true">
          <div className="dest-mobile-drawer-header">
            <Link
              to="/"
              className="dest-logo-link"
              onClick={() => setIsMobileMenuOpen(false)}
              title={
                isKorean
                  ? t('destinationNav.backHome', 'Super EZ Tour 홈으로')
                  : t('destinationNav.backHome', 'Về trang chủ Super EZ Tour')
              }
            >
              <img
                src={BRAND_CONFIG.logo}
                alt={BRAND_CONFIG.brandName}
                className="dest-logo-img"
              />
            </Link>
            <button
              type="button"
              className="dest-mobile-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation"
            >
              <X size={22} />
            </button>
          </div>

          {/* Current Destination Context Banner */}
          <div className="dest-mobile-dest-info">
            <span className="dest-mobile-dest-label">
              {t('destinationNav.currentViewing', isKorean ? '현재 여행지' : 'Điểm đến đang xem')}
            </span>
            <h3 className="dest-mobile-dest-title">
              {isHanoi
                ? destDisplayName
                : `${destDisplayName} — ${t('destinationNav.privateBadge', isKorean ? '100% 프라이빗 투어' : 'Tour Riêng 100%')}`}
            </h3>
          </div>

          {/* Mobile Language Switcher Row */}
          <div className="dest-mobile-lang-wrap">
            <span className="dest-mobile-lang-label">
              {isKorean ? '언어 선택 (Language)' : 'Ngôn ngữ hiển thị'}:
            </span>
            <div className="dest-mobile-lang-pills">
              <button
                type="button"
                className={`dest-mobile-lang-btn ${isKorean ? 'is-active' : ''}`}
                onClick={() => setLanguage('ko')}
                aria-pressed={isKorean}
              >
                한국어
              </button>
              <button
                type="button"
                className={`dest-mobile-lang-btn ${!isKorean ? 'is-active' : ''}`}
                onClick={() => setLanguage('vi')}
                aria-pressed={!isKorean}
              >
                Tiếng Việt
              </button>
            </div>
          </div>

          {/* Dynamic Mobile Navigation Links */}
          <nav
            className="dest-mobile-nav"
            aria-label={t('destinationNav.menuAria', 'Mobile destination navigation')}
          >
            {navItems.map((item, index) => {
              const numStr = String(index + 1).padStart(2, '0') + '. ';
              const label = t(item.labelKey, isKorean ? item.labelKo : item.labelVi);
              const isActive = activeSection === item.sectionId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`${isActive ? 'dest-mobile-nav-active' : ''} ${
                    item.isHighlight ? 'dest-mobile-nav-featured' : ''
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span>
                    {numStr}
                    {label}
                  </span>
                  {item.isHighlight ? <ArrowUpRight size={18} /> : <ChevronRight size={18} />}
                </button>
              );
            })}
          </nav>

          {/* Mobile Footer CTAs */}
          <div className="dest-mobile-footer">
            <button
              type="button"
              className="dest-mobile-consult-btn"
              onClick={handleCtaClick}
            >
              <span>
                {t(
                  'destinationNav.mobileConsultCta',
                  isKorean ? '프라이빗 투어 상담받기' : 'Nhận tư vấn tour riêng'
                )}
              </span>
              <ArrowUpRight size={17} />
            </button>
            {!isHanoi && (
              <a href="tel:19008899" className="dest-mobile-hotline-btn">
                <Phone size={16} />
                <span>
                  {isKorean
                    ? t('destinationNav.hotlineLabel', '24시간 한국어 케어: 1900 8899')
                    : t('destinationNav.hotlineLabel', 'Hotline 24/7: 1900 8899')}
                </span>
              </a>
            )}
            <Link
              to="/"
              className="dest-mobile-back-home"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {isKorean
                ? t('destinationNav.backHome', '← Super EZ Tour 홈으로 이동')
                : t('destinationNav.backHome', '← Quay lại trang chủ Super EZ Tour')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationHeader;
