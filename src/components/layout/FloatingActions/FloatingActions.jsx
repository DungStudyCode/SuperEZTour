import React, { useState, useEffect } from 'react';
import { MessageSquare, FileText, Phone, ArrowUp } from 'lucide-react';
import './FloatingActions.css';

const FloatingActions = ({ onOpenQuoteModal }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

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
      behavior: 'smooth'
    });
  };

  return (
    <div className="floating-actions-container">
      {/* 1:1 Chat Consultation */}
      <button
        type="button"
        className="floating-btn chat-btn"
        onClick={onOpenQuoteModal}
        aria-label="Tư vấn trực tuyến 1:1"
        title="Tư vấn trực tuyến 1:1"
      >
        <span className="floating-btn-icon">
          <MessageSquare size={20} />
        </span>
        <span className="floating-btn-label">Tư vấn 1:1</span>
      </button>

      {/* Quick Quote Request */}
      <button
        type="button"
        className="floating-btn quote-btn"
        onClick={onOpenQuoteModal}
        aria-label="Yêu cầu báo giá nhanh 30 phút"
        title="Yêu cầu báo giá nhanh"
      >
        <span className="floating-btn-icon">
          <FileText size={20} />
        </span>
        <span className="floating-btn-label">Báo giá 30'</span>
        <span className="floating-pulse-ring" />
      </button>

      {/* Direct Phone Call */}
      <a
        href="tel:16440435"
        className="floating-btn phone-btn"
        aria-label="Gọi hotline 1644-0435"
        title="Gọi tổng đài 1644-0435"
      >
        <span className="floating-btn-icon">
          <Phone size={20} />
        </span>
        <span className="floating-btn-label">1644-0435</span>
      </a>

      {/* Scroll to Top */}
      {showBackToTop && (
        <button
          type="button"
          className="floating-btn top-btn animate-fade-in"
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          title="Lên đầu trang"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default FloatingActions;
