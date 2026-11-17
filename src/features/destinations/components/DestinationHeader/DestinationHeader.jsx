import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Menu, X, Phone, ArrowUpRight, ChevronRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../../../constants/brand.config';
import './DestinationHeader.css';

const DestinationHeader = ({ destination, onOpenConsultModal }) => {
  const isKorean = destination?.locale === 'ko' || destination?.id === 'da-nang';
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
            <Link to="/" className="dest-logo-link" title={isKorean ? 'Super EZ Tour 홈으로' : 'Về trang chủ Super EZ Tour'}>
              <img src={BRAND_CONFIG.logo} alt={BRAND_CONFIG.brandName} className="dest-logo-img" />
            </Link>
            <div className="dest-header-divider" />
            <div className="dest-header-cur-dest">
              <span className="dest-header-flag">🇻🇳</span>
              <span className="dest-header-dest-name">
                {isKorean ? (destination?.nameKr || destination?.name || '다낭') : (destination?.name || 'Đà Nẵng')}
              </span>
              <span className="dest-header-tag">{isKorean ? '100% 프라이빗 투어' : 'Private Tour'}</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="dest-header-nav">
            <button type="button" onClick={() => scrollToSection('discover')} className="dest-nav-link">
              {isKorean ? '도시 탐방' : 'Khám phá'}
            </button>
            <button type="button" onClick={() => scrollToSection('services')} className="dest-nav-link">
              {isKorean ? '서비스 생태계' : 'Hệ sinh thái'}
            </button>
            <button type="button" onClick={() => scrollToSection('attractions')} className="dest-nav-link">
              {isKorean ? '주요 명소' : 'Tọa độ'}
            </button>
            <button type="button" onClick={() => scrollToSection('itinerary')} className="dest-nav-link">
              {isKorean ? '추천 일정' : 'Lịch trình'}
            </button>
            <button type="button" onClick={() => scrollToSection('why-private')} className="dest-nav-link">
              {isKorean ? '프라이빗 가치' : 'Tour riêng'}
            </button>
            <button type="button" onClick={() => scrollToSection('trip-builder')} className="dest-nav-link dest-nav-link-highlight">
              {isKorean ? '맞춤 여행 만들기' : 'Thiết kế tour'}
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="dest-header-actions">
            <a href="tel:19008899" className="dest-header-hotline" title={isKorean ? '24시간 한국어 케어 1900 8899' : 'Gọi hotline 1900 8899'}>
              <Phone size={14} className="dest-hotline-icon" />
              <span>1900 8899</span>
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('trip-builder')}
              className="dest-header-btn-quote"
            >
              <span>{isKorean ? '나만의 여행 만들기' : 'Thiết kế chuyến đi'}</span>
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
            <a href="/" className="dest-logo-link" title={isKorean ? 'Super EZ Tour 홈으로' : 'Về trang chủ Super EZ Tour'}>
              <img src="/images/logo.png" alt="Super EZ Tour" className="dest-logo-img" />
            </a>
            <button type="button" className="dest-mobile-close" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <div className="dest-mobile-dest-info">
            <span className="dest-mobile-dest-label">{isKorean ? '현재 여행지' : 'Điểm đến đang xem'}</span>
            <h3 className="dest-mobile-dest-title">
              {isKorean
                ? `${destination?.nameKr || destination?.name || '다낭'} — 100% 프라이빗 투어`
                : `${destination?.name || 'Đà Nẵng'} — Private Tour 100%`}
            </h3>
          </div>

          <nav className="dest-mobile-nav">
            <button type="button" onClick={() => scrollToSection('discover')}>
              <span>{isKorean ? '01. 도시 탐방' : '01. Khám phá thành phố'}</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('services')}>
              <span>{isKorean ? '02. 6대 프리미엄 서비스' : '02. Hệ sinh thái 6 dịch vụ'}</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('accommodation')}>
              <span>{isKorean ? '03. 최고급 호텔 & 리조트' : '03. Lưu trú cao cấp'}</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('transportation')}>
              <span>{isKorean ? '04. 프라이빗 전용 차량' : '04. Xe dịch vụ riêng'}</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('attractions')}>
              <span>{isKorean ? '05. 시그니처 명소 탐방' : '05. Tọa độ tham quan'}</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('culinary')}>
              <span>{isKorean ? '06. 다낭 미식 큐레이션' : '06. Ẩm thực đặc sản'}</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('itinerary')}>
              <span>{isKorean ? '07. 추천 맞춤 일정' : '07. Lịch trình đề xuất'}</span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => scrollToSection('trip-builder')} className="dest-mobile-nav-featured">
              <span>{isKorean ? '08. 나만의 여행 플래너' : '08. Trình thiết kế chuyến đi'}</span>
              <ArrowUpRight size={18} />
            </button>
          </nav>

          <div className="dest-mobile-footer">
            <a href="tel:19008899" className="dest-mobile-hotline-btn">
              <Phone size={16} />
              <span>{isKorean ? '24시간 한국어 케어: 1900 8899' : 'Hotline 24/7: 1900 8899'}</span>
            </a>
            <Link to="/" className="dest-mobile-back-home">
              {isKorean ? '← Super EZ Tour 홈으로 이동' : '← Quay lại trang chủ Super EZ Tour'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationHeader;