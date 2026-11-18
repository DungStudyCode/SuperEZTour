import React, { useState, useEffect } from 'react';
import { MessageSquare, FileText, Phone, ArrowUp } from 'lucide-react';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import { useLanguage } from '../../../context/LanguageContext';
import './FloatingActions.css';

const FloatingActions = ({ onOpenQuoteModal }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { t, isKorean } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="floating-actions-container">
      {/* 1:1 Consultation */}
      <button
        type="button"
        className="floating-btn chat-btn"
        onClick={() => onOpenQuoteModal && onOpenQuoteModal('kakao')}
        aria-label={isKorean ? '1:1 상담' : 'Tư vấn 1:1'}
        title={isKorean ? '1:1 실시간 상담' : 'Tư vấn 1:1'}
      >
        <span className="floating-btn-icon">
          <MessageSquare size={19} />
        </span>
        <span className="floating-btn-label">
          {isKorean ? '1:1 상담' : 'Tư vấn 1:1'}
        </span>
      </button>

      {/* Quick Quote Request */}
      <button
        type="button"
        className="floating-btn quote-btn"
        onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
        aria-label={isKorean ? '30분 빠른 견적' : 'Báo giá nhanh 30 phút'}
        title={isKorean ? '30분 빠른 견적' : 'Báo giá nhanh 30 phút'}
      >
        <span className="floating-btn-icon">
          <FileText size={19} />
        </span>
        <span className="floating-btn-label">
          {isKorean ? "30분 견적" : "Báo giá 30'"}
        </span>
        <span className="floating-pulse-ring" />
      </button>

      {/* Direct Phone Call */}
      <a
        href={`tel:${BRAND_CONFIG.contact.hotline.replace(/\s+/g, '')}`}
        className="floating-btn phone-btn"
        aria-label={`Hotline ${BRAND_CONFIG.contact.hotline}`}
        title={`Hotline ${BRAND_CONFIG.contact.hotline}`}
      >
        <span className="floating-btn-icon">
          <Phone size={19} />
        </span>
        <span className="floating-btn-label">{BRAND_CONFIG.contact.hotline}</span>
      </a>

      {/* Scroll to Top */}
      {showBackToTop && (
        <button
          type="button"
          className="floating-btn top-btn animate-fade-in"
          onClick={scrollToTop}
          aria-label="Top"
          title="Scroll to Top"
        >
          <ArrowUp size={19} />
        </button>
      )}
    </div>
  );
};

export default FloatingActions;
