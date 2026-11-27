import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Check,
  ImageOff
} from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useTripBuilder, isCulinarySelected } from '../../../context/TripBuilderContext';
import { getLenis } from '../../../motion/LenisManager';

gsap.registerPlugin(ScrollTrigger);

const checkPrefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V'];

/**
 * Measures fixed/sticky DestinationHeader height dynamically for accurate scroll offset.
 */
function getDestinationHeaderOffset() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return 76;
  const headerEl = document.querySelector('.dest-header');
  if (!headerEl) return 76;
  const rect = headerEl.getBoundingClientRect();
  return rect.height > 0 ? Math.round(rect.height + 8) : 76;
}

/**
 * Computes read-only preference match indicator for a time block against TripBuilderContext.
 * Accurately distinguishes complete vs partial matches for grouped attraction blocks.
 */
function resolveTimeBlockSelectionMatch(
  timeBlock,
  selectedAttractions,
  culinaryPreferences,
  baseBadgeText
) {
  const attractionIds = Array.isArray(timeBlock?.attractionIds) ? timeBlock.attractionIds : [];
  const matchedAttractionsCount = attractionIds.filter((id) =>
    selectedAttractions.includes(id)
  ).length;
  const totalAttractionsInBlock = attractionIds.length;

  const hasCulinaryMatch = Boolean(
    timeBlock?.culinaryId && isCulinarySelected(culinaryPreferences, timeBlock.culinaryId)
  );

  if (matchedAttractionsCount === 0 && !hasCulinaryMatch) {
    return null;
  }

  if (
    totalAttractionsInBlock > 1 &&
    matchedAttractionsCount > 0 &&
    matchedAttractionsCount < totalAttractionsInBlock
  ) {
    return `${baseBadgeText} (${matchedAttractionsCount}/${totalAttractionsInBlock})`;
  }

  return baseBadgeText;
}

/**
 * SUPER EZ TOUR — HANOI SCREEN 7 V1: CINEMATIC TRAVEL JOURNAL
 * Editorial Print / Monograph Aesthetic (Kinfolk / Aman / Condé Nast Traveler direction)
 *
 * Key Art Direction:
 *  - Warm archival charcoal & silk-paper ink palette (zero cold cyan-slate, zero dashboard card boxes).
 *  - Clean, unencumbered documentary photograph with book-style caption & attribution below the frame.
 *  - Open-canvas right column with 2-column typographic time-grid (Time Period | Narrative).
 *  - S1 Natural Document Scroll (ZERO scroll pinning).
 */
const CinematicJournalStage = ({ itinerariesData = [] }) => {
  const activeItinerary = itinerariesData[0] || { days: [] };
  const days = activeItinerary.days || [];

  const { isKorean } = useLanguage();
  const { tripState, updateField } = useTripBuilder();

  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [displayedDay, setDisplayedDay] = useState(days[0] || null);
  const [outgoingDay, setOutgoingDay] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [showDurationConfirm, setShowDurationConfirm] = useState(false);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);
  const stageRef = useRef(null);
  const incomingLayerRef = useRef(null);
  const scheduleContentRef = useRef(null);
  const confirmFirstBtnRef = useRef(null);

  const loadTokenRef = useRef(0);
  const imageTweenRef = useRef(null);
  const textTweenRef = useRef(null);
  const prevDisplayedDayNumRef = useRef(days[0]?.day ?? 1);
  const prevTextDayNumRef = useRef(days[0]?.day ?? 1);
  const dayBtnRefs = useRef([]);

  const activeDay = days[activeDayIndex] || days[0] || null;
  const targetDaysCount = activeItinerary.daysCount || 3;

  // 1. One-time editorial viewport entrance (non-pinning ScrollTrigger)
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || checkPrefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const targets = [
        headerRef.current,
        timelineRef.current,
        stageRef.current
      ].filter(Boolean);

      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 84%',
            once: true
          }
        }
      );
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, []);

  // 2. 2-Layer Decoded Image Preload before crossfade (latest-request-wins, max 2 layers)
  useEffect(() => {
    if (!activeDay) {
      setDisplayedDay(null);
      setOutgoingDay(null);
      return undefined;
    }

    if (displayedDay?.day === activeDay.day) {
      setDisplayedDay(activeDay);
      return undefined;
    }

    if (checkPrefersReducedMotion()) {
      loadTokenRef.current += 1;
      if (imageTweenRef.current) {
        imageTweenRef.current.kill();
        imageTweenRef.current = null;
      }
      setImgError(false);
      setOutgoingDay(null);
      setDisplayedDay(activeDay);
      return undefined;
    }

    const token = ++loadTokenRef.current;
    const assetMeta = activeDay.assetMeta;
    const desktopSrc = assetMeta?.desktopSrc || activeDay.image;
    const mobileSrc = assetMeta?.mobileSrc || activeDay.mobileImage || desktopSrc;
    const isMobileViewport =
      typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const targetSrc = isMobileViewport && mobileSrc ? mobileSrc : desktopSrc;

    const commitImageSwap = (hasError = false) => {
      if (loadTokenRef.current !== token) return;
      if (imageTweenRef.current) {
        imageTweenRef.current.kill();
        imageTweenRef.current = null;
      }
      setImgError(hasError);
      setOutgoingDay((prevOut) => displayedDay || prevOut || null);
      setDisplayedDay(activeDay);
    };

    if (!targetSrc) {
      commitImageSwap(true);
      return undefined;
    }

    let cancelled = false;
    const preloader = new Image();
    preloader.decoding = 'async';
    preloader.src = targetSrc;

    const finalizeDecode = () => {
      if (cancelled || loadTokenRef.current !== token) return;
      if (typeof preloader.decode === 'function') {
        preloader
          .decode()
          .catch(() => {})
          .finally(() => {
            if (!cancelled && loadTokenRef.current === token) {
              commitImageSwap(false);
            }
          });
      } else {
        commitImageSwap(false);
      }
    };

    if (preloader.complete && preloader.naturalWidth > 0) {
      finalizeDecode();
    } else {
      preloader.onload = finalizeDecode;
      preloader.onerror = () => {
        if (!cancelled && loadTokenRef.current === token) {
          commitImageSwap(true);
        }
      };
    }

    return () => {
      cancelled = true;
    };
  }, [activeDay, displayedDay]);

  // 3. GSAP Crossfade + Subtle Ken Burns (1.035 -> 1.0) once displayedDay updates
  useLayoutEffect(() => {
    const currentDayNum = displayedDay?.day ?? null;
    if (checkPrefersReducedMotion() || !currentDayNum) {
      prevDisplayedDayNumRef.current = currentDayNum;
      return undefined;
    }

    if (prevDisplayedDayNumRef.current === currentDayNum) {
      return undefined;
    }
    prevDisplayedDayNumRef.current = currentDayNum;

    const incomingEl = incomingLayerRef.current;
    if (!incomingEl) {
      setOutgoingDay(null);
      return undefined;
    }

    if (imageTweenRef.current) {
      imageTweenRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setOutgoingDay(null);
        imageTweenRef.current = null;
      }
    });

    tl.fromTo(
      incomingEl,
      { opacity: 0, scale: 1.035 },
      {
        opacity: 1,
        duration: 0.44,
        ease: 'power2.out',
        overwrite: 'auto'
      },
      0
    ).to(
      incomingEl,
      {
        scale: 1.0,
        duration: 1.1,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      },
      0
    );

    imageTweenRef.current = tl;

    return () => {
      if (imageTweenRef.current) {
        imageTweenRef.current.kill();
        imageTweenRef.current = null;
      }
    };
  }, [displayedDay?.day]);

  // 4. Editorial Text Stagger on activeDay.day change ONLY
  useLayoutEffect(() => {
    const currentDayNum = activeDay?.day ?? null;
    if (checkPrefersReducedMotion() || !currentDayNum) {
      prevTextDayNumRef.current = currentDayNum;
      return undefined;
    }

    if (prevTextDayNumRef.current === currentDayNum) {
      return undefined;
    }
    prevTextDayNumRef.current = currentDayNum;

    const scheduleEl = scheduleContentRef.current;
    if (!scheduleEl) return undefined;

    const targets = scheduleEl.querySelectorAll('[data-journal-stagger]');
    if (!targets.length) return undefined;

    if (textTweenRef.current) {
      textTweenRef.current.kill();
    }

    textTweenRef.current = gsap.fromTo(
      targets,
      { y: 7, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.28,
        stagger: 0.04,
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
  }, [activeDay?.day]);

  // Refresh downstream ScrollTrigger offsets whenever active chapter or confirmation banner height changes
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(rafId);
  }, [activeDayIndex, showDurationConfirm, isKorean]);

  useEffect(() => {
    if (showDurationConfirm && confirmFirstBtnRef.current) {
      confirmFirstBtnRef.current.focus();
    }
  }, [showDurationConfirm]);

  const handleSelectDay = useCallback((idx) => {
    setActiveDayIndex(idx);
  }, []);

  const handleTimelineKeyDown = useCallback(
    (e, idx) => {
      if (days.length <= 1) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = (idx + 1) % days.length;
        setActiveDayIndex(nextIdx);
        dayBtnRefs.current[nextIdx]?.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = (idx - 1 + days.length) % days.length;
        setActiveDayIndex(prevIdx);
        dayBtnRefs.current[prevIdx]?.focus();
      }
    },
    [days.length]
  );

  const navigateToTripBuilder = useCallback(() => {
    if (typeof document === 'undefined') return;
    const builderEl = document.getElementById('trip-builder');
    if (!builderEl) return;

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    const headerOffset = getDestinationHeaderOffset();
    const reduced = checkPrefersReducedMotion();
    const lenis = getLenis();

    if (!reduced && lenis && typeof lenis.scrollTo === 'function') {
      lenis.resize();
      lenis.scrollTo(builderEl, { offset: -headerOffset, duration: 1.05 });
    } else {
      const top =
        builderEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({
        top,
        behavior: reduced ? 'auto' : 'smooth'
      });
    }
  }, []);

  const handlePersonalizeClick = useCallback(() => {
    if (tripState.durationDays === targetDaysCount) {
      setShowDurationConfirm(false);
      navigateToTripBuilder();
      return;
    }
    setShowDurationConfirm(true);
  }, [tripState.durationDays, targetDaysCount, navigateToTripBuilder]);

  const handleConfirmApplyThreeDays = useCallback(() => {
    updateField('durationDays', targetDaysCount);
    setShowDurationConfirm(false);
    navigateToTripBuilder();
  }, [updateField, targetDaysCount, navigateToTripBuilder]);

  const handleConfirmKeepDuration = useCallback(() => {
    setShowDurationConfirm(false);
    navigateToTripBuilder();
  }, [navigateToTripBuilder]);

  if (!activeDay) return null;

  const resolveMedia = (dayObj) => {
    if (!dayObj) return null;
    const assetMeta = dayObj.assetMeta;
    const desktopSrc = assetMeta?.desktopSrc || dayObj.image;
    const mobileSrc = assetMeta?.mobileSrc || dayObj.mobileImage || desktopSrc;
    const altText = isKorean
      ? assetMeta?.altKo || dayObj.title || ''
      : assetMeta?.altVi || dayObj.title || '';
    const focalDesktop = assetMeta?.focalPointDesktop || '50% 45%';
    const focalMobile = assetMeta?.focalPointMobile || focalDesktop;
    return { assetMeta, desktopSrc, mobileSrc, altText, focalDesktop, focalMobile };
  };

  const activeMedia = resolveMedia(displayedDay || activeDay);
  const outgoingMedia =
    outgoingDay && outgoingDay.day !== (displayedDay?.day || activeDay.day)
      ? resolveMedia(outgoingDay)
      : null;

  const headerData = activeItinerary.sectionHeader || {};
  const eyebrowText = headerData.eyebrow || 'THE HANOI SIGNATURE JOURNEY';
  const headingText =
    headerData.title ||
    activeItinerary.title ||
    (isKorean
      ? '사흘간의 기록, 오래도록 기억될 하노이.'
      : 'Ba ngày, một Hà Nội đáng nhớ.');
  const subtitleText =
    headerData.subtitle ||
    activeItinerary.overview ||
    (isKorean
      ? '천년의 유산과 깊은 미식, 고즈넉한 일상이 어우러진 2박 3일 맞춤 프라이빗 여정을 만나보세요.'
      : 'Khám phá di sản, hương vị và nhịp sống thủ đô trong một hành trình 3 ngày 2 đêm được thiết kế theo nhịp điệu của bạn.');

  const summaryItems = activeItinerary.journeySummary || [];
  const ctaConfig = activeItinerary.cta || {};
  const ctaLabel =
    ctaConfig.label ||
    (isKorean
      ? '이 여정을 나만의 일정으로 맞춤 설계하기'
      : 'Cá nhân hóa hành trình này');
  const selectionBadgeBase =
    ctaConfig.selectionBadge ||
    (isKorean ? '내 선택에 포함됨' : 'Có trong lựa chọn của bạn');

  const selectedAttractions = tripState.selectedAttractions || [];
  const culinaryPreferences = tripState.culinaryPreferences || [];
  const timeBlocks = activeDay.timeBlocks || [];
  const romanNum = ROMAN_NUMERALS[(activeDay.day || 1) - 1] || `0${activeDay.day}`;

  return (
    <section
      className="itinerary-sticky-timeline is-cinematic-journal"
      ref={sectionRef}
      id="itinerary"
    >
      <div className="dest-container cj-container">
        {/* 1. Editorial Print Masthead */}
        <header className="cj-masthead" ref={headerRef}>
          <div className="cj-masthead-top">
            <span className="cj-eyebrow">{eyebrowText}</span>
            {summaryItems.length > 0 && (
              <div
                className="cj-summary-inline"
                aria-label={
                  isKorean ? '추천 여정 요약 정보' : 'Thông tin tóm tắt hành trình gợi ý'
                }
              >
                {summaryItems.map((item, idx) => (
                  <React.Fragment key={item.id || idx}>
                    {idx > 0 && (
                      <span className="cj-summary-sep" aria-hidden="true">
                        /
                      </span>
                    )}
                    <span className="cj-summary-text">{item.label}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          <div className="cj-masthead-main">
            <h2 className="cj-title">{headingText}</h2>
            <p className="cj-subtitle">{subtitleText}</p>
          </div>
        </header>

        {/* 2. Interactive Three-Day Editorial Index Bar (Accessible before content on all viewports) */}
        <nav
          className="cj-chapter-index"
          ref={timelineRef}
          aria-label={isKorean ? '3일 여정 타임라인' : 'Dòng thời gian hành trình 3 ngày'}
        >
          {days.map((d, idx) => {
            const isActive = idx === activeDayIndex;
            const dayNum = String(d.day).padStart(2, '0');
            return (
              <button
                key={d.id || d.day}
                ref={(el) => {
                  dayBtnRefs.current[idx] = el;
                }}
                type="button"
                className={`cj-index-tab ${isActive ? 'is-active' : ''}`}
                onClick={() => handleSelectDay(idx)}
                onKeyDown={(e) => handleTimelineKeyDown(e, idx)}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="cj-index-day-meta">
                  <span className="cj-index-num">{dayNum}</span>
                  <span className="cj-index-loc">{d.locationTag}</span>
                </span>
                <span className="cj-index-title">{d.title}</span>
              </button>
            );
          })}
        </nav>

        {/* 3. Open-Canvas Two-Column Monograph Spread */}
        <div className="cj-monograph-grid" ref={stageRef}>
          {/* Left Column: Unencumbered Documentary Photograph + Book Caption Below */}
          <figure className="cj-figure-column">
            <div className="cj-photo-frame">
              {outgoingMedia?.desktopSrc && (
                <div className="cj-photo-layer cj-photo-layer-outgoing" aria-hidden="true">
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
                      className="cj-photo-img"
                      style={{
                        '--cj-focal-desktop': outgoingMedia.focalDesktop,
                        '--cj-focal-mobile': outgoingMedia.focalMobile
                      }}
                    />
                  </picture>
                </div>
              )}

              <div
                key={displayedDay?.id || displayedDay?.day || activeDay.day}
                ref={incomingLayerRef}
                className="cj-photo-layer cj-photo-layer-incoming"
              >
                {!imgError && activeMedia?.desktopSrc ? (
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
                      className="cj-photo-img"
                      style={{
                        '--cj-focal-desktop': activeMedia.focalDesktop,
                        '--cj-focal-mobile': activeMedia.focalMobile
                      }}
                      loading="lazy"
                      decoding="async"
                      onError={() => setImgError(true)}
                    />
                  </picture>
                ) : (
                  <div
                    className="cj-photo-fallback"
                    role="img"
                    aria-label={activeMedia?.altText || activeDay.title}
                  >
                    <ImageOff size={22} aria-hidden="true" />
                    <span>
                      {isKorean
                        ? '이미지를 불러올 수 없습니다.'
                        : 'Không thể tải hình ảnh chương hành trình.'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Book-Style Figcaption Below Photograph (No floating pills covering the image) */}
            <figcaption className="cj-figcaption">
              <span className="cj-figcaption-place">
                <em>{romanNum}.</em> {activeDay.locationTag}
              </span>
              {activeMedia?.assetMeta?.attributionRequired && (
                <span className="cj-figcaption-credit">
                  {isKorean ? '사진' : 'Ảnh'}:{' '}
                  <a
                    href={activeMedia.assetMeta.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {activeMedia.assetMeta.photographer} ({activeMedia.assetMeta.license})
                  </a>
                </span>
              )}
            </figcaption>
          </figure>

          {/* Right Column: Open Editorial Narrative & 2-Column Time Schedule */}
          <div className="cj-narrative-column" ref={scheduleContentRef}>
            <div className="cj-chapter-heading-group" data-journal-stagger>
              <div className="cj-chapter-meta-line">
                <span className="cj-chapter-roman">
                  {isKorean ? `Chapter 0${activeDay.day}` : `Chương 0${activeDay.day}`}
                </span>
                <span className="cj-chapter-sep" aria-hidden="true">
                  —
                </span>
                <span className="cj-chapter-location">{activeDay.locationTag}</span>
              </div>

              <h3 className="cj-chapter-title">{activeDay.title}</h3>

              {activeDay.summary && (
                <p className="cj-chapter-lead">{activeDay.summary}</p>
              )}
            </div>

            {/* 2-Column Editorial Time Grid (Left: Time Period | Right: Narrative) */}
            <div className="cj-schedule-ledger" role="list">
              {timeBlocks.map((block) => {
                const matchLabel = resolveTimeBlockSelectionMatch(
                  block,
                  selectedAttractions,
                  culinaryPreferences,
                  selectionBadgeBase
                );

                return (
                  <div
                    key={block.id}
                    className="cj-ledger-row"
                    role="listitem"
                    data-journal-stagger
                  >
                    <div className="cj-ledger-time">
                      <span className="cj-period-label">{block.period}</span>
                    </div>

                    <div className="cj-ledger-body">
                      <p className="cj-period-desc">{block.desc}</p>
                      {matchLabel && (
                        <span className="cj-match-note">
                          <Check size={12} aria-hidden="true" />
                          <span>{matchLabel}</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Editorial Inline CTA & Safe Duration Confirmation */}
            <div className="cj-cta-footer" data-journal-stagger>
              {!showDurationConfirm ? (
                <button
                  type="button"
                  className="cj-editorial-cta"
                  onClick={handlePersonalizeClick}
                >
                  <span className="cj-cta-text">{ctaLabel}</span>
                  <ArrowUpRight size={16} className="cj-cta-icon" aria-hidden="true" />
                </button>
              ) : (
                <div
                  className="cj-duration-confirm"
                  role="region"
                  aria-label={
                    isKorean ? '여행 기간 확인' : 'Xác nhận thời lượng hành trình'
                  }
                >
                  <p className="cj-confirm-title">
                    {ctaConfig.confirmTitle ||
                      (isKorean
                        ? '이 추천 여정은 2박 3일 일정입니다.'
                        : 'Lịch trình gợi ý này kéo dài 3 ngày 2 đêm.')}
                  </p>
                  <p className="cj-confirm-desc">
                    {ctaConfig.confirmDesc ||
                      (isKorean
                        ? '3일 일정으로 변경하시겠습니까, 아니면 현재 선택한 기간을 유지하시겠습니까?'
                        : 'Bạn muốn sử dụng thời lượng 3 ngày hay giữ nguyên thời lượng đã chọn?')}
                  </p>
                  <div className="cj-confirm-actions">
                    <button
                      ref={confirmFirstBtnRef}
                      type="button"
                      className="cj-confirm-btn cj-confirm-btn-primary"
                      onClick={handleConfirmApplyThreeDays}
                    >
                      {ctaConfig.confirmApply ||
                        (isKorean ? '3일 일정 사용' : 'Sử dụng 3 ngày')}
                    </button>
                    <button
                      type="button"
                      className="cj-confirm-btn cj-confirm-btn-secondary"
                      onClick={handleConfirmKeepDuration}
                    >
                      {ctaConfig.confirmKeep ||
                        (isKorean ? '기존 기간 유지' : 'Giữ nguyên thời lượng')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicJournalStage;
