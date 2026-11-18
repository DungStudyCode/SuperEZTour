import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import './FloatingActions.css';

/**
 * Super EZ Tour — Luxury Compact Floating Actions V2
 *
 * Requirements:
 * - Single primary consultation action (opens QuoteModal)
 * - Back to top (only visible when scrolled > 400px)
 * - Completely hide unverified hotline (1900 8899)
 * - IntersectionObserver on Footer: automatically tucks away when Footer enters viewport,
 *   guaranteeing zero overlap with Copyright or navigation links.
 * - Mobile-first compact footprint that never obscures page content
 */
const FloatingActions = ({ onOpenQuoteModal }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFooterInView, setIsFooterInView] = useState(false);
  const { isKorean } = useLanguage();

  // Scroll listener for back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to hide FloatingActions when Footer is in view
  useEffect(() => {
    const footerEl =
      document.querySelector('footer.luxury-editorial-footer') ||
      document.querySelector('footer');

    if (!footerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsFooterInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.05,
      }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleConsult = () => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal({ source: 'floating' });
    }
  };

  return (
    <aside
      className={`floating-actions-cluster ${isFooterInView ? 'is-hidden-by-footer' : ''}`}
      aria-label="Floating Quick Actions"
      aria-hidden={isFooterInView}
    >
      {/* Scroll to Top (Appears only when user scrolled down > 400px) */}
      {showBackToTop && (
        <button
          type="button"
          className="floating-sub-btn top-btn"
          onClick={scrollToTop}
          aria-label={isKorean ? '맨 위로 이동' : 'Lên đầu trang'}
          title={isKorean ? '맨 위로' : 'Lên đầu trang'}
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* Primary Consultation Pill Button */}
      <button
        type="button"
        className="floating-primary-btn"
        onClick={handleConsult}
        aria-label={isKorean ? '1:1 프라이빗 여행 상담' : 'Tư vấn hành trình riêng'}
      >
        <MessageSquare size={17} className="btn-icon" />
        <span className="btn-label">
          {isKorean ? '1:1 맞춤 상담' : 'Tư vấn hành trình'}
        </span>
      </button>
    </aside>
  );
};

export default FloatingActions;
