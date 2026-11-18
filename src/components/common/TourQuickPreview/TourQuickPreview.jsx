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
  Heart,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import './TourQuickPreview.css';

/**
 * Super EZ Tour — Tour Quick Preview Modal
 * Luxury Korean Travel Editorial Experience
 * 2-Column Desktop Grid | Gallery Carousel | Rich Tour Specifications | Pricing & Direct Action
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
  const [isFavorite, setIsFavorite] = useState(false);
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

  // Sync wishlist status from localStorage
  useEffect(() => {
    if (tour?.id && typeof window !== 'undefined') {
      try {
        const savedFavs = JSON.parse(
          localStorage.getItem('super_ez_tour_favorites') || '[]'
        );
        setIsFavorite(savedFavs.includes(tour.id));
      } catch (e) {
        setIsFavorite(false);
      }
    }
  }, [tour?.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (!tour?.id || typeof window === 'undefined') return;

    try {
      const savedFavs = JSON.parse(
        localStorage.getItem('super_ez_tour_favorites') || '[]'
      );
      let nextFavs;
      if (savedFavs.includes(tour.id)) {
        nextFavs = savedFavs.filter((id) => id !== tour.id);
        setIsFavorite(false);
      } else {
        nextFavs = [...savedFavs, tour.id];
        setIsFavorite(true);
      }
      localStorage.setItem(
        'super_ez_tour_favorites',
        JSON.stringify(nextFavs)
      );
    } catch (e) {
      console.warn('Favorite storage error:', e);
    }
  };

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
  const highlights = isKorean
    ? tour.previewHighlightsKr || tour.highlightsKr || tour.highlights
    : tour.previewHighlightsVi || tour.highlightsVi || tour.highlights;

  // Services
  const services = tour.services || [
    {
      type: 'stay',
      titleVi: 'Lưu trú',
      titleKr: '숙소',
      descVi: 'Khách sạn/Resort 5 sao',
      descKr: '5성급 럭셔리 숙소',
    },
    {
      type: 'vehicle',
      titleVi: 'Xe riêng',
      titleKr: '전용 차량',
      descVi: 'Limousine riêng',
      descKr: '단독 전용 리무진',
    },
    {
      type: 'guide',
      titleVi: 'Local Guide',
      titleKr: '전담 가이드',
      descVi: 'HDV chuyên nghiệp',
      descKr: '한국어 전문 가이드',
    },
    {
      type: 'dining',
      titleVi: 'Ẩm thực',
      titleKr: '미식 만찬',
      descVi: 'Đặc sản địa phương',
      descKr: '로컬 미식 특식',
    },
  ];

  const getServiceIcon = (type) => {
    switch (type) {
      case 'stay':
        return <Building size={16} className="service-icon text-gold" />;
      case 'vehicle':
        return <Car size={16} className="service-icon text-gold" />;
      case 'guide':
        return <Compass size={16} className="service-icon text-gold" />;
      case 'dining':
        return <Utensils size={16} className="service-icon text-gold" />;
      default:
        return <Sparkles size={16} className="service-icon text-gold" />;
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
      t('tourPreview.priceSubtext', '출발일 및 인원에 따른 맞춤 견적 기준.')
    : tour.priceSubtextVi ||
      t('tourPreview.priceSubtext', 'Giá tham khảo, tùy ngày đi và số lượng khách.');

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
            MODAL MAIN BODY: 2 Columns on Desktop
        ========================================================= */}
        <div className="tour-preview-main">
          {/* =========================================================
              LEFT COLUMN: Interactive Image Gallery
          ========================================================= */}
          <div className="tour-preview-gallery-col">
            <div className="preview-hero-media">
              {galleryImages.length > 0 && (
                <img
                  key={currentImgIndex}
                  src={galleryImages[currentImgIndex]}
                  alt={`${title} - ảnh ${currentImgIndex + 1}`}
                  className="preview-hero-img animate-crossfade"
                />
              )}

              {/* Signature Badge */}
              <div className="preview-badge-signature">
                <span className="badge-crown-icon" aria-hidden="true">♛</span>
                <span>{t('tourPreview.badgeSignature', 'Tour riêng Signature')}</span>
              </div>

              {/* Gallery Navigation Buttons (if > 1 image) */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    className="gallery-nav-btn prev"
                    onClick={handlePrevImage}
                    aria-label={t('tourPreview.prevImage', 'Ảnh trước')}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="gallery-nav-btn next"
                    onClick={handleNextImage}
                    aria-label={t('tourPreview.nextImage', 'Ảnh sau')}
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Counter Pill */}
                  <div className="gallery-counter-pill">
                    <span>{currentImgIndex + 1}</span>
                    <span className="counter-slash">/</span>
                    <span>{galleryImages.length}</span>
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Row */}
            {galleryImages.length > 1 && (
              <div
                className="preview-thumbnails-scroll"
                role="tablist"
                aria-label="Gallery thumbnails"
              >
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === currentImgIndex}
                    aria-label={`Ảnh ${idx + 1}`}
                    className={`preview-thumbnail-item ${idx === currentImgIndex ? 'is-active' : ''}`}
                    onClick={() => setCurrentImgIndex(idx)}
                  >
                    <img src={img} alt="" className="thumbnail-img" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =========================================================
              RIGHT COLUMN: Tour Information & Highlights
          ========================================================= */}
          <div className="tour-preview-info-col">
            {/* Header Row: Meta, Wishlist & Close */}
            <div className="preview-info-header">
              <div className="preview-meta-pill">
                <span className="meta-dest-label">{destination}</span>
                <span className="meta-dot">·</span>
                <span className="meta-duration-label">{duration}</span>
              </div>

              <div className="preview-header-actions">
                {/* Wishlist Heart */}
                <button
                  type="button"
                  className={`preview-action-icon-btn ${isFavorite ? 'is-active' : ''}`}
                  onClick={toggleFavorite}
                  aria-label={
                    isFavorite
                      ? t('tourPreview.favoriteRemove', 'Bỏ lưu yêu thích')
                      : t('tourPreview.favoriteAdd', 'Lưu vào yêu thích')
                  }
                  title={
                    isFavorite
                      ? t('tourPreview.favoriteRemove', 'Bỏ lưu yêu thích')
                      : t('tourPreview.favoriteAdd', 'Lưu vào yêu thích')
                  }
                >
                  <Heart
                    size={18}
                    className={isFavorite ? 'fill-current text-orange' : ''}
                  />
                </button>

                {/* Close Button */}
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="preview-close-btn"
                  onClick={onClose}
                  aria-label={t('tourPreview.closeAria', 'Đóng xem nhanh hành trình')}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Title & Description */}
            <div className="preview-title-block">
              <h2 id="quick-preview-title" className="preview-main-title">
                {title}
              </h2>
              <p id="quick-preview-desc" className="preview-main-desc">
                {description}
              </p>
            </div>

            {/* 4 Premium Service Highlights */}
            <div className="preview-services-panel">
              <h3 className="preview-panel-heading">
                {t('tourPreview.servicesTitle', 'Dịch vụ đẳng cấp')}
              </h3>
              <div className="preview-services-grid">
                {services.map((srv, idx) => {
                  const srvTitle = isKorean ? srv.titleKr : srv.titleVi;
                  const srvDesc = isKorean ? srv.descKr : srv.descVi;
                  return (
                    <div key={idx} className="preview-service-item">
                      <div className="service-icon-box">
                        {getServiceIcon(srv.type)}
                      </div>
                      <div className="service-text-group">
                        <span className="service-name">{srvTitle}</span>
                        <span className="service-desc">{srvDesc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tour Highlights */}
            {highlights && highlights.length > 0 && (
              <div className="preview-highlights-panel">
                <h3 className="preview-panel-heading">
                  <Sparkles size={14} className="text-gold" />
                  <span>{t('tourPreview.highlightsTitle', 'Điểm nổi bật')}</span>
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

            {/* Minimalist Route Visualization */}
            {routeStops && routeStops.length > 1 && (
              <div className="preview-route-panel">
                <h3 className="preview-panel-heading">
                  <MapPin size={14} className="text-gold" />
                  <span>{t('tourPreview.routeTitle', 'Tuyến hành trình minh họa')}</span>
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
            MODAL FOOTER: Reference Pricing & Action Buttons
        ========================================================= */}
        <div className="tour-preview-footer">
          {/* Left: Reference Pricing */}
          <div className="preview-footer-price">
            {priceFrom ? (
              <>
                <div className="price-main-line">
                  <span className="price-from-label">
                    {t('tourPreview.priceFromLabel', 'Từ')}
                  </span>
                  <span className="price-amount">{priceFrom}</span>
                  <span className="price-unit">
                    {t('tourPreview.priceUnit', '/ khách')}
                  </span>
                </div>
                <span className="price-sub-note">{priceSubtext}</span>
              </>
            ) : (
              <div className="price-main-line">
                <span className="price-amount">
                  {t('tourPreview.priceOnRequest', 'Giá thiết kế theo yêu cầu')}
                </span>
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div className="preview-footer-actions">
            {/* Button 1: Nhận tư vấn riêng */}
            <button
              type="button"
              className="preview-btn consult-btn"
              onClick={() => onConsult && onConsult(tour)}
            >
              <MessageSquare size={16} className="btn-icon" />
              <span>{t('tourPreview.btnConsult', 'Nhận tư vấn riêng')}</span>
            </button>

            {/* Button 2: Xem lịch trình chi tiết */}
            <button
              type="button"
              className="preview-btn details-btn"
              onClick={() => onViewDetails && onViewDetails(tour)}
            >
              <span>{t('tourPreview.btnDetails', 'Xem lịch trình chi tiết')}</span>
              <ArrowRight size={16} className="btn-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourQuickPreview;
