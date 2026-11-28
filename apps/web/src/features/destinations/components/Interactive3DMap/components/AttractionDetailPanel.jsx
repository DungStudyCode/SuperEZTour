import React, { useState, useEffect, useLayoutEffect, useRef, useId } from 'react';
import gsap from 'gsap';
import {
  Plus,
  Check,
  Mountain,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ImageOff,
  Compass
} from 'lucide-react';

/**
 * Shared Attraction Detail Panel supporting both:
 *  - Legacy 3D Map mode (Da Nang default)
 *  - Travel Atlas mode (Hanoi V1.1: compact editorial card, 2-layer decoded image reveal,
 *    editorial text stagger, collapsible experiences, solid gold CTA)
 */
const AttractionDetailPanel = ({
  panelRef,
  activeLandmark,
  attractionsData,
  visibleDestinations = [],
  isTravelAtlas = false,
  isKorean = true,
  isCurrentInCart = false,
  showElevation = true,
  showDuration = false,
  showPreviousNext = false,
  showPhotoAttribution = false,
  prefersReducedMotion = false,
  onToggleAttraction,
  onSelectLandmark,
  onExperiencesToggle
}) => {
  const [imgError, setImgError] = useState(false);
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const [displayedLandmark, setDisplayedLandmark] = useState(activeLandmark || null);
  const [outgoingLandmark, setOutgoingLandmark] = useState(null);

  const incomingFrameRef = useRef(null);
  const textGroupRef = useRef(null);
  const loadTokenRef = useRef(0);
  const revealTweenRef = useRef(null);
  const textTweenRef = useRef(null);
  const prevDisplayedIdRef = useRef(activeLandmark?.id || null);
  const prevTextLandmarkIdRef = useRef(activeLandmark?.id || null);

  const experiencesPanelId = useId();

  // Collapse experiences on landmark switch, preserve open/close state on KO <-> VI toggle
  useEffect(() => {
    setIsExperiencesOpen(false);
  }, [activeLandmark?.id]);

  // Cinematic 2-layer image preload + decode before reveal (prevents flash & stale async race)
  useEffect(() => {
    if (!activeLandmark) {
      setDisplayedLandmark(null);
      setOutgoingLandmark(null);
      return;
    }

    // Same landmark (e.g., KO <-> VI toggle): keep current image, update localized metadata in-place
    if (displayedLandmark?.id === activeLandmark.id) {
      setDisplayedLandmark(activeLandmark);
      return;
    }

    // Legacy mode or reduced motion: swap immediately without cinematic transition
    if (!isTravelAtlas || prefersReducedMotion) {
      loadTokenRef.current += 1;
      if (revealTweenRef.current) {
        revealTweenRef.current.kill();
        revealTweenRef.current = null;
      }
      setImgError(false);
      setOutgoingLandmark(null);
      setDisplayedLandmark(activeLandmark);
      return;
    }

    const token = ++loadTokenRef.current;
    const assetMeta = activeLandmark.assetMeta;
    const desktopSrc = assetMeta?.desktopSrc || activeLandmark.image;
    const mobileSrc = assetMeta?.mobileSrc || activeLandmark.mobileImage || desktopSrc;
    const isMobileViewport =
      typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const targetSrc = isMobileViewport && mobileSrc ? mobileSrc : desktopSrc;

    const commitSwap = (hasLoadError = false) => {
      if (loadTokenRef.current !== token) return;
      if (revealTweenRef.current) {
        revealTweenRef.current.kill();
        revealTweenRef.current = null;
      }
      setImgError(hasLoadError);
      setOutgoingLandmark((prevOut) => displayedLandmark || prevOut || null);
      setDisplayedLandmark(activeLandmark);
    };

    if (!targetSrc) {
      commitSwap(true);
      return;
    }

    let cancelled = false;
    const preloader = new Image();
    preloader.decoding = 'async';
    preloader.src = targetSrc;

    const finalizeReady = () => {
      if (cancelled || loadTokenRef.current !== token) return;
      if (typeof preloader.decode === 'function') {
        preloader
          .decode()
          .catch(() => {})
          .finally(() => {
            if (!cancelled && loadTokenRef.current === token) {
              commitSwap(false);
            }
          });
      } else {
        commitSwap(false);
      }
    };

    if (preloader.complete && preloader.naturalWidth > 0) {
      finalizeReady();
    } else {
      preloader.onload = finalizeReady;
      preloader.onerror = () => {
        if (!cancelled && loadTokenRef.current === token) {
          commitSwap(true);
        }
      };
    }

    return () => {
      cancelled = true;
    };
  }, [activeLandmark, displayedLandmark, isTravelAtlas, prefersReducedMotion]);

  // Run GSAP incoming image reveal once displayedLandmark updates
  useLayoutEffect(() => {
    const currentId = displayedLandmark?.id || null;
    if (!isTravelAtlas || prefersReducedMotion || !currentId) {
      prevDisplayedIdRef.current = currentId;
      return;
    }

    if (prevDisplayedIdRef.current === currentId) {
      return;
    }
    prevDisplayedIdRef.current = currentId;

    const incomingEl = incomingFrameRef.current;
    if (!incomingEl) {
      setOutgoingLandmark(null);
      return;
    }

    if (revealTweenRef.current) {
      revealTweenRef.current.kill();
    }

    revealTweenRef.current = gsap.fromTo(
      incomingEl,
      { opacity: 0, scale: 1.035 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.42,
        ease: 'power2.out',
        overwrite: 'auto',
        clearProps: 'transform,opacity',
        onComplete: () => {
          setOutgoingLandmark(null);
          revealTweenRef.current = null;
        }
      }
    );

    return () => {
      if (revealTweenRef.current) {
        revealTweenRef.current.kill();
        revealTweenRef.current = null;
      }
    };
  }, [displayedLandmark?.id, isTravelAtlas, prefersReducedMotion]);

  // Editorial Text Stagger on landmark change ONLY (skipped on KO <-> VI toggle & reduced motion)
  useLayoutEffect(() => {
    const currentId = activeLandmark?.id || null;
    if (!isTravelAtlas || prefersReducedMotion || !currentId) {
      prevTextLandmarkIdRef.current = currentId;
      return;
    }

    if (prevTextLandmarkIdRef.current === currentId) {
      return;
    }
    prevTextLandmarkIdRef.current = currentId;

    const groupEl = textGroupRef.current;
    if (!groupEl) return;

    const staggerTargets = groupEl.querySelectorAll('[data-atlas-stagger]');
    if (!staggerTargets.length) return;

    if (textTweenRef.current) {
      textTweenRef.current.kill();
    }

    textTweenRef.current = gsap.fromTo(
      staggerTargets,
      { y: 8, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.28,
        stagger: 0.045,
        ease: 'power2.out',
        overwrite: true,
        clearProps: 'transform,opacity',
        onComplete: () => {
          textTweenRef.current = null;
        }
      }
    );

    return () => {
      if (textTweenRef.current) {
        textTweenRef.current.kill();
        textTweenRef.current = null;
      }
    };
  }, [activeLandmark?.id, isTravelAtlas, prefersReducedMotion]);

  if (!activeLandmark) {
    return (
      <aside className="map-editorial-panel atlas-empty-panel" ref={panelRef}>
        <div className="atlas-empty-state">
          <Compass size={24} aria-hidden="true" />
          <p>
            {isKorean
              ? '선택한 조건에 맞는 명소가 없습니다.'
              : 'Không có địa điểm phù hợp với bộ lọc hiện tại.'}
          </p>
        </div>
      </aside>
    );
  }

  const currentIdx = Math.max(
    0,
    visibleDestinations.findIndex((d) => d.id === activeLandmark.id)
  );
  const totalVisible = visibleDestinations.length || 1;
  const canNavigate = totalVisible > 1;

  const handlePrev = () => {
    if (!canNavigate || !onSelectLandmark) return;
    const prevIdx = (currentIdx - 1 + totalVisible) % totalVisible;
    onSelectLandmark(visibleDestinations[prevIdx].id);
  };

  const handleNext = () => {
    if (!canNavigate || !onSelectLandmark) return;
    const nextIdx = (currentIdx + 1) % totalVisible;
    onSelectLandmark(visibleDestinations[nextIdx].id);
  };

  const getMediaMeta = (landmark) => {
    const assetMeta = landmark?.assetMeta;
    const desktopSrc = assetMeta?.desktopSrc || landmark?.image;
    const mobileSrc = assetMeta?.mobileSrc || landmark?.mobileImage || desktopSrc;
    const altText = isKorean
      ? assetMeta?.altKo || landmark?.name || ''
      : assetMeta?.altVi || landmark?.name || '';
    const focalDesktop = assetMeta?.focalPointDesktop || '50% 50%';
    const focalMobile = assetMeta?.focalPointMobile || focalDesktop;
    return { assetMeta, desktopSrc, mobileSrc, altText, focalDesktop, focalMobile };
  };

  const activeMedia = getMediaMeta(displayedLandmark || activeLandmark);
  const outgoingMedia =
    outgoingLandmark && outgoingLandmark.id !== (displayedLandmark?.id || activeLandmark.id)
      ? getMediaMeta(outgoingLandmark)
      : null;

  const experiences = isKorean
    ? activeLandmark.experiencesKo || activeLandmark.experiences || activeLandmark.tags || []
    : activeLandmark.experiencesVi || activeLandmark.experiences || activeLandmark.tags || [];

  const durationText = isKorean
    ? activeLandmark.durationKo || activeLandmark.duration
    : activeLandmark.durationVi || activeLandmark.duration;

  const addLabel = isKorean
    ? attractionsData?.btnAdd || '여행에 추가하기'
    : attractionsData?.btnAdd || 'Thêm vào chuyến đi';

  const inCartLabel = isKorean
    ? attractionsData?.btnInCart || '여행에 추가됨'
    : attractionsData?.btnInCart || 'Đã thêm vào chuyến đi';

  const removeHintLabel = isKorean
    ? attractionsData?.btnRemove || '여행에서 제거하기'
    : attractionsData?.btnRemove || 'Bỏ khỏi chuyến đi';

  const experiencesHeading = isKorean ? '추천 체험' : 'Trải nghiệm nổi bật';

  return (
    <aside className="map-editorial-panel" ref={panelRef} aria-live="polite">
      {/* Landmark Photography (max 2 layers during transition) */}
      <div className="panel-img-frame">
        {outgoingMedia?.desktopSrc && (
          <div className="panel-img-layer panel-img-layer-outgoing" aria-hidden="true">
            <picture>
              {outgoingMedia.mobileSrc && (
                <source
                  media="(max-width: 768px)"
                  srcSet={outgoingMedia.mobileSrc}
                  type="image/webp"
                />
              )}
              <img
                src={outgoingMedia.desktopSrc}
                alt=""
                className="panel-img"
                style={{
                  '--atlas-focal-desktop': outgoingMedia.focalDesktop,
                  '--atlas-focal-mobile': outgoingMedia.focalMobile
                }}
              />
            </picture>
          </div>
        )}

        <div
          key={displayedLandmark?.id || activeLandmark.id}
          ref={incomingFrameRef}
          className="panel-img-layer panel-img-layer-incoming"
        >
          {!imgError && activeMedia.desktopSrc ? (
            <picture>
              {activeMedia.mobileSrc && (
                <source
                  media="(max-width: 768px)"
                  srcSet={activeMedia.mobileSrc}
                  type="image/webp"
                />
              )}
              <img
                src={activeMedia.desktopSrc}
                alt={activeMedia.altText}
                className="panel-img"
                style={{
                  '--atlas-focal-desktop': activeMedia.focalDesktop,
                  '--atlas-focal-mobile': activeMedia.focalMobile
                }}
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
              />
            </picture>
          ) : (
            <div className="panel-img-fallback" role="img" aria-label={activeMedia.altText}>
              <ImageOff size={24} aria-hidden="true" />
              <span>
                {isKorean
                  ? '이미지를 불러올 수 없습니다.'
                  : 'Không thể tải hình ảnh địa điểm.'}
              </span>
            </div>
          )}
        </div>

        <div className="panel-img-overlay" />

        {/* Legacy Top Badges (Da Nang keeps category + elevation; Travel Atlas keeps photo clean) */}
        {!isTravelAtlas && (
          <div className="panel-img-top-meta">
            <span className="panel-badge-category">{activeLandmark.category}</span>
            {showElevation && activeLandmark.elevation && (
              <span className="panel-badge-elevation">
                <Mountain size={11} aria-hidden="true" />
                <span>{activeLandmark.elevation}</span>
              </span>
            )}
          </div>
        )}

        {/* Subtle Open-License Photo Attribution */}
        {showPhotoAttribution && activeMedia.assetMeta?.attributionRequired && (
          <div className="panel-photo-credit">
            <span>{isKorean ? '사진' : 'Ảnh'}: </span>
            <a
              href={activeMedia.assetMeta.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activeMedia.assetMeta.photographer} ({activeMedia.assetMeta.license})
            </a>
          </div>
        )}
      </div>

      {/* Editorial Body */}
      <div className="panel-content-body">
        <div className="panel-text-group" ref={textGroupRef}>
          {isTravelAtlas ? (
            <div className="atlas-panel-meta-row" data-atlas-stagger>
              <span className="atlas-panel-category">{activeLandmark.category}</span>
            </div>
          ) : (
            <span className="panel-route-index">
              {activeLandmark.routeIndex} / {attractionsData?.atlasName || 'THE ATLAS'}
            </span>
          )}

          <h3 className="panel-title" data-atlas-stagger>
            {activeLandmark.name}
          </h3>

          {!isTravelAtlas && activeLandmark.slogan && (
            <p className="panel-slogan">{activeLandmark.slogan}</p>
          )}

          <p className="panel-desc" data-atlas-stagger>
            {activeLandmark.description}
          </p>

          {/* Suggested Visit Duration (Travel Atlas) */}
          {showDuration && durationText && (
            <div className="atlas-duration-row" data-atlas-stagger>
              <Clock size={14} aria-hidden="true" />
              <span>{durationText}</span>
            </div>
          )}

          {/* Curated Highlights — Expandable in Travel Atlas (collapsed by default) */}
          {isTravelAtlas ? (
            experiences.length > 0 && (
              <div className="atlas-experiences-section" data-atlas-stagger>
                <button
                  type="button"
                  className={`atlas-experiences-toggle ${isExperiencesOpen ? 'is-open' : ''}`}
                  aria-expanded={isExperiencesOpen}
                  aria-controls={experiencesPanelId}
                  onClick={() => {
                    setIsExperiencesOpen((prev) => {
                      const next = !prev;
                      onExperiencesToggle?.(next);
                      return next;
                    });
                  }}
                >
                  <span className="atlas-experiences-heading">{experiencesHeading}</span>
                  <ChevronDown
                    size={15}
                    className="atlas-experiences-chevron"
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={experiencesPanelId}
                  className={`atlas-experiences-collapse ${isExperiencesOpen ? 'is-open' : ''}`}
                >
                  <div className="atlas-experiences-inner">
                    <ul className="atlas-highlights-list">
                      {experiences.slice(0, 3).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="panel-tags-row">
              {(activeLandmark.tags || []).map((tag, idx) => (
                <span key={idx} className="panel-tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="panel-actions-footer">
          <button
            type="button"
            className={`panel-add-btn ${isCurrentInCart ? 'btn-in-cart' : ''}`}
            onClick={() => onToggleAttraction(activeLandmark.id)}
            aria-pressed={isCurrentInCart}
          >
            <span className="panel-btn-icon" aria-hidden="true">
              {isCurrentInCart ? <Check size={15} /> : <Plus size={15} />}
            </span>
            {isCurrentInCart ? (
              <>
                <span className="btn-label-default">{inCartLabel}</span>
                {isTravelAtlas && (
                  <span className="btn-label-hover">{removeHintLabel}</span>
                )}
              </>
            ) : (
              <span>{addLabel}</span>
            )}
          </button>

          {/* Legacy non-Atlas prev/next (Travel Atlas places a single nav bar in the Atlas Footer) */}
          {!isTravelAtlas && showPreviousNext && (
            <div className="atlas-prev-next-bar">
              <button
                type="button"
                className="atlas-nav-btn"
                onClick={handlePrev}
                disabled={!canNavigate}
                aria-label={isKorean ? '이전 명소' : 'Địa điểm trước'}
              >
                <ChevronLeft size={16} aria-hidden="true" />
                <span>{isKorean ? '이전' : 'Trước'}</span>
              </button>

              <span className="atlas-nav-counter" aria-live="off">
                {String(currentIdx + 1).padStart(2, '0')} / {String(totalVisible).padStart(2, '0')}
              </span>

              <button
                type="button"
                className="atlas-nav-btn"
                onClick={handleNext}
                disabled={!canNavigate}
                aria-label={isKorean ? '다음 명소' : 'Địa điểm tiếp'}
              >
                <span>{isKorean ? '다음' : 'Tiếp'}</span>
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AttractionDetailPanel;
