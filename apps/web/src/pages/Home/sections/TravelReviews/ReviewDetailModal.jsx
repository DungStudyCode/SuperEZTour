import React, { useEffect, useRef } from 'react';
import { X, MapPin, Star, Calendar, Quote, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import './ReviewDetailModal.css';

/**
 * Super EZ Tour — Review Detail Modal
 * Displays the complete authentic traveler review without cluttering the main page grid.
 */
const ReviewDetailModal = ({
  review = null,
  isOpen = false,
  onClose,
  triggerRef,
}) => {
  const { t, isKorean } = useLanguage();
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (triggerRef?.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen || !review) return null;

  const destTitle = isKorean ? review.destinationName?.ko : review.destinationName?.vi;
  const reviewTitle = isKorean ? review.title?.ko : review.title?.vi;
  const reviewFull = isKorean ? review.fullContent?.ko : review.fullContent?.vi;
  const packTitle = isKorean ? review.packName?.ko : review.packName?.vi;
  const partyTitle = isKorean ? review.author?.travelParty?.ko : review.author?.travelParty?.vi;

  return (
    <div
      className="review-detail-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={reviewTitle || 'Traveler Review'}
    >
      <div className="review-detail-backdrop" />

      <div
        className="review-detail-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="review-detail-close"
          onClick={onClose}
          aria-label={t('common.close', isKorean ? '닫기' : 'Đóng')}
        >
          <X size={20} />
        </button>

        {/* Header: Author & Trip Info */}
        <div className="detail-modal-header">
          <div className="detail-author-row">
            <img
              src={review.author?.avatar}
              alt={review.author?.displayName}
              className="detail-avatar"
              loading="lazy"
            />
            <div className="detail-names">
              <strong className="detail-author-name">{review.author?.displayName}</strong>
              <div className="detail-sub-meta">
                <span className="detail-party">{partyTitle}</span>
                <span className="detail-meta-dot" aria-hidden="true">·</span>
                <span className="detail-date">{review.travelDate}</span>
              </div>
            </div>
          </div>

          <div className="detail-tags-row">
            <span className="detail-dest-tag">
              <MapPin size={12} />
              <span>{destTitle}</span>
            </span>
            {review.isDemo && (
              <span className="detail-demo-tag">DEMO PREVIEW</span>
            )}
          </div>
        </div>

        {/* Rating & Package Name */}
        <div className="detail-rating-bar">
          <div className="detail-stars">
            {[...Array(review.rating || 5)].map((_, i) => (
              <Star key={i} size={15} className="star-gold" />
            ))}
          </div>
          {packTitle && <span className="detail-pack-name">{packTitle}</span>}
        </div>

        {/* Trip Photo (if available) */}
        {review.tripPhotoUrl && (
          <div className="detail-photo-frame">
            <img
              src={review.tripPhotoUrl}
              alt={reviewTitle}
              className="detail-photo-img"
              loading="lazy"
            />
          </div>
        )}

        {/* Review Title & Full Body */}
        <div className="detail-body">
          <h3 className="detail-title">{reviewTitle}</h3>
          <div className="detail-quote-mark">
            <Quote size={28} />
          </div>
          <p className="detail-text">{reviewFull}</p>
        </div>

        {/* Footer Note */}
        <div className="detail-modal-footer">
          <span className="detail-disclaimer">
            {isKorean
              ? '※ 본 리뷰는 Super EZ Tour 프라이빗 여정을 기반으로 구성된 데모 프리뷰입니다.'
              : '※ Đánh giá minh họa được xây dựng dựa trên tiêu chuẩn tour riêng 100% của Super EZ Tour.'}
          </span>
          <button
            type="button"
            className="detail-confirm-btn"
            onClick={onClose}
          >
            {t('common.confirm', isKorean ? '확인' : 'Đóng')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailModal;
