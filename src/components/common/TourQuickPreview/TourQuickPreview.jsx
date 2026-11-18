import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Building,
  Car,
  Compass,
  Utensils,
  ArrowRight,
  MessageSquare,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import './TourQuickPreview.css';

/**
 * Super EZ Tour — Tour Quick Preview Modal
 * Concept: Luxury Travel Editorial — Curated Journey Preview
 * 2-Column Desktop Grid | Gallery Carousel | 2x2 Compact Services | Pricing & Direct Action
 */
const TourQuickPreview = ({
  tour,
  isOpen,
  onClose,
  onConsult,
  onViewDetails,
}) => {
  const { t, isKorean } = useLanguage();

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const prevActiveElementRef = useRef(null);

  // Fallback images if tour.images is missing or single
  const galleryImages =
    tour?.images && tour.images.length > 0
      ? tour.images
      : tour?.image
      ? [tour.image]
      : [];

  // Reset image index when tour changes
  useEffect(() => {
    setCurrentImgIndex(0);
  }, [tour?.id]);

  const handlePrevImage = useCallback((e) => {
    e?.stopPropagation();
    setCurrentImgIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, [galleryImages.length]);

  const handleNextImage = useCallback((e) => {
    e?.stopPropagation();
    setCurrentImgIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  }, [galleryImages.length]);

  // Accessibility: Focus trap, Body scroll lock, Escape key & Arrow navigation
  useEffect(() => {
    if (!isOpen) return;

    prevActiveElementRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    const timer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 60);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowLeft') {
        handlePrevImage();
        return;
      }

      if (e.key === 'ArrowRight') {
        handleNextImage();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusable = Array.from(
          modalRef.current.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (prevActiveElementRef.current && prevActiveElementRef.current.focus) {
        prevActiveElementRef.current.focus();
      }
    };
  }, [isOpen, onClose, handlePrevImage, handleNextImage]);

  if (!isOpen || !tour) return null;

  // Localized Tour Content
  const title = isKorean
    ? tour.titleKr || tour.title
    : tour.titleVi || tour.title;
  const description = isKorean
    ? tour.descKr || tour.pacing
    : tour.descVi || tour.pacingVi;
  const destination = isKorean
    ? tour.destinationKr || tour.destination
    : tour.destinationVi || tour.destination;
  const duration = isKorean
    ? tour.durationKr || tour.duration
    : tour.durationVi || tour.duration;

  // Highlights (prioritize previewHighlights, fallback to highlights)
  const rawHighlights = isKorean
    ? tour.previewHighlightsKr || tour.highlightsKr || tour.highlights
    : tour.previewHighlightsVi || tour.highlightsVi || tour.highlights;
  // Maximum 3 concise highlights as specified
  const highlights = (rawHighlights || []).slice(0, 3);

  // Services
  const services = tour.services || [
    {
      type: 'stay',
      titleVi: 'Lưu trú',
      titleKr: '숙박',
      descVi: 'Resort cao cấp',
      descKr: '프리미엄 리조트',
    },
    {
      type: 'vehicle',
      titleVi: 'Di chuyển',
      titleKr: '이동',
      descVi: 'Xe riêng theo hành trình',
      descKr: '전용 차량',
    },
    {
      type: 'guide',
      titleVi: 'Hướng dẫn viên',
      titleKr: '가이드',
      descVi: 'Hỗ trợ tiếng Hàn',
      descKr: '한국어 안내',
    },
    {
      type: 'dining',
      titleVi: 'Ẩm thực',
      titleKr: '미식',
      descVi: 'Trải nghiệm địa phương',
      descKr: '현지 음식 체험',
    },
  ];

  const getServiceIcon = (type) => {
    switch (type) {
      case 'stay':
        return <Building size={18} className="service-icon" />;
      case 'vehicle':
        return <Car size={18} className="service-icon" />;
      case 'guide':
        return <Compass size={18} className="service-icon" />;
      case 'dining':
        return <Utensils size={18} className="service-icon" />;
      default:
        return <Sparkles size={18} className="service-icon" />;
    }
  };

  // Itinerary Route
  const routeStops = isKorean
    ? tour.itineraryRouteKr || tour.itineraryRouteVi || []
    : tour.itineraryRouteVi || tour.itineraryRouteKr || [];

  // Price
  const priceFrom = isKorean ? tour.priceFromKr : tour.priceFromVi;
  const priceSubtext = isKorean
    ? tour.priceSubtextKr ||
      t('tourPreview.priceSubtext', '출발일, 인원 및 선택 서비스에 따라 요금이 달라질 수 있습니다.')
    : tour.priceSubtextVi ||
      t('tourPreview.priceSubtext', 'Giá có thể thay đổi theo ngày đi, số khách và dịch vụ lựa chọn.');

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="tour-preview-overlay"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="tour-preview-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-preview-title"
        aria-describedby="quick-preview-desc"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================================
            MODAL MAIN BODY: 2 Columns on Desktop (45% Gallery / 55% Info)
        ========================================================= */}
        <div className="tour-preview-main">
          {/* =========================================================
              LEFT COLUMN: Curated Image Gallery
          ========================================================= */}
          <div className="tour-preview-gallery-col">
            <div className="preview-hero-media">
              {galleryImages.length > 0 && (
                <img
                  key={currentImgIndex}
                  src={galleryImages[currentImgIndex]}
                  alt={`${title} - ${isKorean ? '사진' : 'ảnh'} ${currentImgIndex + 1}`}
                  className="preview-hero-img animate-crossfade"
                  loading={currentImgIndex === 0 ? 'eager' : 'lazy'}
                />
              )}

              {/* Signature Badge */}
              <div className="preview-badge-signature">
                <span className="badge-crown-icon" aria-hidden="true">♛</span>
                <span>{t('tourPreview.badgeSignature', isKorean ? '시그니처 단독 투어' : 'Tour riêng Signature')}</span>
              </div>

              {/* Gallery Navigation Controls (if > 1 image) */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    className="gallery-nav-btn prev"
                    onClick={handlePrevImage}
                    aria-label={t('tourPreview.prevImage', isKorean ? '이전 사진' : 'Ảnh trước')}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="gallery-nav-btn next"
                    onClick={handleNextImage}
                    aria-label={t('tourPreview.nextImage', isKorean ? '다음 사진' : 'Ảnh sau')}
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Counter Pill with Leading Zero (01 / 04) */}
                  <div className="gallery-counter-pill">
                    <span>{String(currentImgIndex + 1).padStart(2, '0')}</span>
                    <span className="counter-slash">/</span>
                    <span>{String(galleryImages.length).padStart(2, '0')}</span>
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Row */}
            {galleryImages.length > 1 && (
              <div
                className="preview-thumbnails-scroll"
                role="tablist"
                aria-label={isKorean ? '여행 사진 미리보기' : 'Ảnh thu nhỏ hành trình'}
              >
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === currentImgIndex}
                    aria-label={`${title} - ${isKorean ? '사진' : 'Ảnh'} ${idx + 1}`}
                    className={`preview-thumbnail-item ${idx === currentImgIndex ? 'is-active' : ''}`}
                    onClick={() => setCurrentImgIndex(idx)}
                  >
                    <img src={img} alt="" className="thumbnail-img" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =========================================================
              RIGHT COLUMN: Journey Information & Specifications
          ========================================================= */}
          <div className="tour-preview-info-col">
            {/* Header Row: Eyebrow Meta & Close Button (No dummy heart) */}
            <div className="preview-info-header">
              <div className="preview-meta-pill">
                <span className="meta-dest-label">{destination}</span>
                <span className="meta-dot">/</span>
                <span className="meta-duration-label">{duration}</span>
              </div>

              {/* Close Button */}
              <button
                ref={closeBtnRef}
                type="button"
                className="preview-close-btn"
                onClick={onClose}
                aria-label={t('tourPreview.closeAria', isKorean ? '여행 미리보기 창 닫기' : 'Đóng xem nhanh hành trình')}
              >
                <X size={18} />
              </button>
            </div>

            {/* Title & Short Editorial Description */}
            <div className="preview-title-block">
              <h2 id="quick-preview-title" className="preview-main-title">
                {title}
              </h2>
              <p id="quick-preview-desc" className="preview-main-desc">
                {description}
              </p>
            </div>

            {/* 4 Premium Services (Compact 2x2 Utility Grid — No Dashboard Style) */}
            <div className="preview-services-panel">
              <h3 className="preview-panel-heading">
                {t('tourPreview.servicesTitle', isKorean ? '포함 서비스' : 'Dịch vụ hành trình')}
              </h3>
              <div className="preview-services-compact-grid">
                {services.map((srv, idx) => {
                  const srvTitle = isKorean
                    ? (srv.titleKr || srv.titleVi)
                    : (srv.titleVi || srv.titleKr);
                  const srvDesc = isKorean
                    ? (srv.descKr || srv.descVi)
                    : (srv.descVi || srv.descKr);
                  return (
                    <div key={idx} className="preview-service-compact-item">
                      <div className="service-icon-wrap" aria-hidden="true">
                        {getServiceIcon(srv.type)}
                      </div>
                      <div className="service-text-group">
                        <span className="service-label">{srvTitle}</span>
                        <span className="service-desc">{srvDesc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tour Highlights (Max 3 Concise Points) */}
            {highlights && highlights.length > 0 && (
              <div className="preview-highlights-panel">
                <h3 className="preview-panel-heading">
                  <Sparkles size={14} className="heading-icon text-gold" />
                  <span>{t('tourPreview.highlightsTitle', isKorean ? '여정 하이라이트' : 'Điểm nổi bật')}</span>
                </h3>
                <ul className="preview-highlights-list">
                  {highlights.map((item, idx) => (
                    <li key={idx} className="preview-highlight-item">
                      <CheckCircle2 size={16} className="highlight-check-icon text-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Minimalist Route Timeline */}
            {routeStops && routeStops.length > 1 && (
              <div className="preview-route-panel">
                <h3 className="preview-panel-heading">
                  <MapPin size={14} className="heading-icon text-gold" />
                  <span>{t('tourPreview.routeTitle', isKorean ? '주요 경유지' : 'Lịch trình tóm tắt')}</span>
                </h3>
                <div className="preview-route-steps">
                  {routeStops.map((stop, idx) => (
                    <React.Fragment key={idx}>
                      <div className="route-stop-node">
                        <span className="route-node-dot">{idx + 1}</span>
                        <span className="route-node-label">{stop}</span>
                      </div>
                      {idx < routeStops.length - 1 && (
                        <div className="route-step-connector" aria-hidden="true" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================
            MODAL STICKY FOOTER: Reference Pricing & Action Buttons
        ========================================================= */}
        <div className="tour-preview-footer">
          {/* Left: Reference Pricing */}
          <div className="preview-footer-price">
            <span className="price-label">
              {t('tourPreview.priceFromLabel', isKorean ? '맞춤 견적 기준' : 'Giá tham khảo từ')}
            </span>
            {priceFrom ? (
              <div className="price-main-line">
                <span className="price-amount">{priceFrom}</span>
                <span className="price-unit">
                  {t('tourPreview.priceUnit', isKorean ? '/ 1인' : '/ khách')}
                </span>
              </div>
            ) : (
              <div className="price-main-line">
                <span className="price-on-request">
                  {t('tourPreview.priceOnRequest', isKorean ? '맞춤 견적 문의' : 'Liên hệ để nhận báo giá riêng')}
                </span>
              </div>
            )}
            <span className="price-sub-note">{priceSubtext}</span>
          </div>

          {/* Right: Actions */}
          <div className="preview-footer-actions">
            {/* Button 1: Tư vấn riêng */}
            <button
              type="button"
              className="preview-btn consult-btn"
              onClick={() => onConsult && onConsult(tour)}
            >
              <MessageSquare size={16} className="btn-icon" />
              <span>{t('tourPreview.btnConsult', isKorean ? '맞춤 여행 상담' : 'Tư vấn riêng')}</span>
            </button>

            {/* Button 2: Xem hành trình */}
            <button
              type="button"
              className="preview-btn details-btn"
              onClick={() => onViewDetails && onViewDetails(tour)}
            >
              <span>{t('tourPreview.btnDetails', isKorean ? '여행 자세히 보기' : 'Xem hành trình')}</span>
              <ArrowRight size={16} className="btn-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourQuickPreview;
