import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, Phone, ArrowUpRight, ChevronRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../../../constants/brand.config';
import './DestinationHeader.css';

const DestinationHeader = ({ destination, onOpenConsultModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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

      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`dest-header ${isScrolled ? 'dest-header-scrolled' : ''} ${isHidden ? 'dest-header-hidden' : ''}`}>
        {/* Scroll Progress Bar */}
        <div className="dest-header-progress" style={{ width: `${scrollProgress}%` }} />

        <div className="dest-header-container">
          {/* Logo & Destination Badge */}
          <div className="dest-header-brand">
            <a href="/" className="dest-logo-link" title="Về trang chủ Super EZ Tour">
              <img src={BRAND_CONFIG.logo} alt={BRAND_CONFIG.brandName} className="dest-logo-img" />
            </a>
            <div className="dest-header-divider" />
            <div className="dest-header-cur-dest">
              <span className="dest-header-flag">🇻🇳</span>
              <span className="dest-header-dest-name">{destination?.name || 'Đà Nẵng'}</span>
              <span className="dest-header-tag">Private Tour</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="dest-header-nav">
            <button type="button" onClick={() => scrollToSection('discover')} className="dest-nav-link">
              Khám phá
            </button>
            <button type="button" onClick={() => scrollToSection('services')} className="dest-nav-link">
              Hệ sinh thái
            </button>
            <button type="button" onClick={() => scrollToSection('attractions')} className="dest-nav-link">
              Tọa độ
            </button>
            <button type="button" onClick={() => scrollToSection('itinerary')} className="dest-nav-link">
              Lịch trình
            </button>
            <button type="button" onClick={() => scrollToSection('why-private')} className="dest-nav-link">
              Tour riêng
            </button>
            <button type="button" onClick={() => scrollToSection('trip-builder')} className="dest-nav-link dest-nav-link-highlight">
              Thiết kế tour
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="dest-header-actions">
            <a href="tel:19008899" className="dest-header-hotline" title="Gọi hotline 1900 8899">
              <Phone size={14} className="dest-hotline-icon" />
              <span>1900 8899</span>
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('trip-builder')}
              className="dest-header-btn-quote"
            >
              <span>Thiết kế chuyến đi</span>
              <ArrowUpRight size={16} />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="dest-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`dest-mobile-drawer ${isMobileMenuOpen ? 'dest-mobile-drawer-open' : ''}`}>
        <div className="dest-mobile-drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="dest-mobile-drawer-content">
          <div className="dest-mobile-drawer-header">
            <a href="/" className="dest-logo-link" title="Về trang chủ Super EZ Tour">
              <img src="/images/logo.png" alt="Super EZ Tour" className="dest-logo-img" />
            </a>
            <button type="button" className="dest-mobile-close" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <div className="dest-mobile-dest-info">
            <span className="dest-mobile-dest-label">Điểm đến đang xem</span>
            <h3 className="dest-mobile-dest-title">{destination?.name || 'Đà Nẵng'} — Private Tour 100%</h3>
          </div>

          <nav className="dest-mobile-nav">
            <button type="button" onClick={() => scrollToSection('discover')}>
              <span>01. Khám phá thành phố</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('services')}>
              <span>02. Hệ sinh thái 6 dịch vụ</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('accommodation')}>
              <span>03. Lưu trú cao cấp</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('transportation')}>
              <span>04. Xe dịch vụ riêng</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('attractions')}>
              <span>05. Tọa độ tham quan</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('culinary')}>
              <span>06. Ẩm thực đặc sản</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('itinerary')}>
              <span>07. Lịch trình đề xuất</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('trip-builder')} className="dest-mobile-nav-featured">
              <span>08. Trình thiết kế chuyến đi</span>
              <ArrowUpRight size={18} />
            </button>
          </nav>

          <div className="dest-mobile-footer">
            <a href="tel:19008899" className="dest-mobile-hotline-btn">
              <Phone size={16} />
              <span>Hotline 24/7: 1900 8899</span>
            </a>
            <a href="/" className="dest-mobile-back-home">
              ← Quay lại trang chủ Super EZ Tour
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationHeader;