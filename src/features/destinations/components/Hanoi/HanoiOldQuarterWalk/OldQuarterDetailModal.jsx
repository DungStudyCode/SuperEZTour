import React, { useEffect } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { getLenis } from '../../../motion/LenisManager';

/**
 * SUPER EZ TOUR — HANOI SCREEN 2 V3.4
 * Focused Cultural Archive Modal with Full Wikimedia Attribution & TripBuilder Sync
 */
const OldQuarterDetailModal = ({
  chapter,
  isKorean,
  isSaved,
  onClose,
  onToggleTrip
}) => {
  useEffect(() => {
    if (!chapter) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const lenis = getLenis();
    if (lenis) {
      try { lenis.stop(); } catch (_) {}
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (lenis) {
        try { lenis.start(); } catch (_) {}
      }
      document.body.style.overflow = prevOverflow;
    };
  }, [chapter, onClose]);

  if (!chapter) return null;

  return (
    <div
      className="old-quarter-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="old-quarter-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-chapter-heading"
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label={isKorean ? '닫기' : 'Đóng'}
        >
          <X size={18} />
        </button>

        {/* Modal Hero Photograph */}
        <div className="modal-hero-visual">
          <img
            src={chapter.beats?.[0]?.image?.src || chapter.image}
            alt={isKorean ? chapter.title.ko : chapter.title.vi}
            className="modal-hero-img"
            onError={(e) => {
              if (chapter.image) e.currentTarget.src = chapter.image;
            }}
          />
          <div className="modal-visual-gradient" />
          <div className="modal-visual-index">
            {chapter.chapterNumber} / 04 — HANOI OLD QUARTER
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body-wrapper">
          <div className="modal-header-meta">
            <h3 id="modal-chapter-heading" className="modal-chapter-title">
              {isKorean ? chapter.title.ko : chapter.title.vi}
            </h3>
            <p className="modal-chapter-lead">
              {isKorean ? chapter.lead.ko : chapter.lead.vi}
            </p>
          </div>

          {/* Three-Beat Photographic Archive */}
          <div className="modal-chapter-narrative">
            {chapter.beats.map((b, idx) => (
              <div key={b.id} className="modal-beat-entry">
                <div className="modal-beat-thumb-frame">
                  <img
                    src={b.image?.src || chapter.image}
                    alt={isKorean ? b.title.ko : b.title.vi}
                    className="modal-beat-thumb-img"
                    onError={(e) => {
                      if (b.image?.fallback) e.currentTarget.src = b.image.fallback;
                    }}
                  />
                </div>
                <div className="modal-beat-content">
                  <span className="modal-beat-tag">
                    0{idx + 1} — {isKorean ? b.beatLabel.ko : b.beatLabel.vi}
                  </span>
                  <h4 className="modal-beat-subtitle">
                    {isKorean ? b.title.ko : b.title.vi}
                  </h4>
                  <p>{isKorean ? b.body.ko : b.body.vi}</p>
                  <span className="modal-beat-credit">
                    {b.image?.author} ·{' '}
                    {b.image?.licenseUrl ? (
                      <a href={b.image.licenseUrl} target="_blank" rel="noopener noreferrer">
                        {b.image.license}
                      </a>
                    ) : (
                      b.image?.license
                    )}
                    {b.image?.sourceUrl && (
                      <>
                        {' · '}
                        <a href={b.image.sourceUrl} target="_blank" rel="noopener noreferrer">
                          Wikimedia Commons
                        </a>
                      </>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Editorial Highlights */}
          <div className="modal-highlights-box">
            <span className="highlights-box-title">
              {isKorean ? '주요 관람 포인트' : 'Điểm nhấn quan sát'}
            </span>
            <ul className="highlights-list">
              {(isKorean ? chapter.modalHighlightsKr : chapter.modalHighlights).map((item, i) => (
                <li key={i} className="highlight-item">
                  <span className="highlight-dash">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="modal-actions-container">
            <button
              type="button"
              className={`modal-trip-action-btn ${isSaved ? 'btn-saved' : 'btn-add'}`}
              onClick={() => onToggleTrip(chapter.id)}
            >
              {isSaved ? (
                <>
                  <Check size={15} />
                  <span>{isKorean ? '맞춤 일정에 추가됨 (삭제)' : 'Đã có trong Lịch Trình (Xóa)'}</span>
                </>
              ) : (
                <span>{isKorean ? '내 맞춤 일정에 추가하기' : 'Thêm vào Lịch Trình'}</span>
              )}
            </button>

            <button
              type="button"
              className="modal-continue-walk-btn"
              onClick={onClose}
            >
              <span>{isKorean ? '계속 탐험하기' : 'Tiếp tục hành trình'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* License Footer */}
          <div className="modal-footer-attribution">
            <small>
              {isKorean
                ? '사진 출처: Wikimedia Commons (크리에이티브 커먼즈 및 퍼블릭 도메인 라이선스 준수, WebP 최적화)'
                : 'Nguồn ảnh: Wikimedia Commons (tuân thủ giấy phép Creative Commons / Public Domain, tối ưu WebP)'}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldQuarterDetailModal;
