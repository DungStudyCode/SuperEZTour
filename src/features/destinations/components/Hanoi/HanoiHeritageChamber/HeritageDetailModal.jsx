import React, { useEffect, useRef } from 'react';
import { X, Check, Plus, ArrowRight, ExternalLink, Landmark } from 'lucide-react';
import { getLenis } from '../../../motion/LenisManager';

/**
 * SUPER EZ TOUR — HANOI SCREEN 3 V4.1
 * GRAND HERITAGE DOCUMENTARY — ACCESSIBLE MONOGRAPH DETAIL MODAL
 */
const HeritageDetailModal = ({
  act,
  isKorean,
  isAddedToTrip,
  onClose,
  onToggleTrip
}) => {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!act) return;

    previousFocusRef.current = document.activeElement;

    const focusTimer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus({ preventScroll: true });
      }
    }, 30);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const lenis = getLenis();
    if (lenis) {
      try {
        lenis.stop();
      } catch (_) {}
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      if (lenis) {
        try {
          lenis.start();
        } catch (_) {}
      }
      if (
        previousFocusRef.current &&
        typeof previousFocusRef.current.focus === 'function'
      ) {
        try {
          previousFocusRef.current.focus({ preventScroll: true });
        } catch (_) {}
      }
    };
  }, [act, onClose]);

  if (!act) return null;

  const modalCopy = isKorean ? act.modal.ko : act.modal.vi;
  const heroAsset = act.images?.establishing;
  const plates = modalCopy.plates || [];

  return (
    <div
      className="heritage-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className="heritage-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="heritage-modal-title"
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="heritage-modal-close"
          onClick={onClose}
          aria-label={isKorean ? '닫기' : 'Đóng'}
        >
          <X size={18} />
        </button>

        {/* Hero Visual Banner */}
        <div className="heritage-modal-hero">
          <img
            src={heroAsset?.src}
            alt={isKorean ? heroAsset?.altKo : heroAsset?.altVi}
            className="heritage-modal-hero-img"
            style={{
              objectPosition: heroAsset?.focalPointDesktop || '50% 45%'
            }}
          />
          <div className="heritage-modal-hero-scrim" />
          <div className="heritage-modal-hero-badge">
            <Landmark size={13} />
            <span>{modalCopy.category}</span>
          </div>
        </div>

        {/* Scrollable Monograph Content */}
        <div className="heritage-modal-body" data-lenis-prevent>
          <header className="heritage-modal-header">
            <h3 id="heritage-modal-title" className="heritage-modal-title">
              {modalCopy.title}
            </h3>
            <p className="heritage-modal-lead">{modalCopy.lead}</p>
          </header>

          {/* Architectural & Historical Specifications Grid */}
          <div className="heritage-modal-specs-grid">
            {modalCopy.specs.map((spec, idx) => (
              <div key={idx} className="heritage-spec-item">
                <span className="heritage-spec-label">{spec.label}</span>
                <span className="heritage-spec-value">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* 3-Plate Verified Photographic Archive */}
          <div className="heritage-modal-plates">
            {plates.map((plate, pIdx) => {
              const asset = plate.asset;
              if (!asset) return null;
              return (
                <figure key={asset.id || pIdx} className="heritage-modal-plate">
                  <div className="heritage-plate-img-wrap">
                    <img
                      src={asset.src}
                      alt={isKorean ? asset.altKo : asset.altVi}
                      className="heritage-plate-img"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="heritage-plate-caption">
                    <span className="heritage-plate-tag">{plate.tag}</span>
                    <strong className="heritage-plate-heading">
                      {plate.heading}
                    </strong>
                    {plate.note && (
                      <p className="heritage-plate-note">{plate.note}</p>
                    )}
                    <span className="heritage-plate-credit">
                      {asset.photographer} ·{' '}
                      <a
                        href={asset.licenseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {asset.license}
                      </a>{' '}
                      ·{' '}
                      <a
                        href={asset.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Wikimedia Commons <ExternalLink size={10} />
                      </a>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* Documentary Essay Sections */}
          <div className="heritage-modal-sections">
            {modalCopy.sections.map((sec, idx) => (
              <div key={idx} className="heritage-modal-section">
                <h4 className="heritage-section-heading">{sec.heading}</h4>
                <p className="heritage-section-body">{sec.body}</p>
              </div>
            ))}
          </div>

          {/* Modal Footer Actions */}
          <footer className="heritage-modal-footer">
            <button
              type="button"
              className={`heritage-trip-cta-btn ${
                isAddedToTrip ? 'is-added' : ''
              }`}
              onClick={onToggleTrip}
            >
              {isAddedToTrip ? (
                <>
                  <Check size={16} />
                  <span>
                    {isKorean ? '일정에 추가됨' : 'Đã thêm vào hành trình'}
                  </span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>
                    {isKorean
                      ? '문묘를 내 일정에 추가'
                      : 'Thêm Văn Miếu vào hành trình'}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              className="heritage-modal-resume-btn"
              onClick={onClose}
            >
              <span>
                {isKorean ? '다큐멘터리 계속 보기' : 'Tiếp tục xem phim tài liệu'}
              </span>
              <ArrowRight size={15} />
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default HeritageDetailModal;
