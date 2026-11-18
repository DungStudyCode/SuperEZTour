import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../../context/LanguageContext';
import {
  Compass,
  Clock,
  ArrowRight,
  MapPin,
  Car,
  Plane,
  Building2,
  Utensils,
  Camera,
  Sun,
  Ship,
  Sparkles,
  Mountain,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import { getLenis } from '../../motion/LenisManager';
import './ItineraryStickyTimeline.css';

gsap.registerPlugin(ScrollTrigger);

// Chapter timing constants for unified scroll & visual synchronization
const CHAPTER_HOLD = 1.0;
const CHAPTER_TRANSITION = 0.55;

// Helper to determine contextual luxury icon for each itinerary highlight
const getActivityIcon = (text) => {
  const lower = (text || '').toLowerCase();
  if (
    lower.includes('sân bay') ||
    lower.includes('đón') ||
    lower.includes('tiễn') ||
    lower.includes('xe riêng') ||
    lower.includes('chở') ||
    lower.includes('di chuyển') ||
    lower.includes('공항') ||
    lower.includes('픽업') ||
    lower.includes('샌딩') ||
    lower.includes('전용차량') ||
    lower.includes('이동')
  ) {
    return Car;
  }
  if (
    lower.includes('bay') ||
    lower.includes('hạ cánh') ||
    lower.includes('cất cánh') ||
    lower.includes('항공') ||
    lower.includes('비행') ||
    lower.includes('도착') ||
    lower.includes('출발')
  ) {
    return Plane;
  }
  if (
    lower.includes('resort') ||
    lower.includes('khách sạn') ||
    lower.includes('check-in') ||
    lower.includes('nghỉ dưỡng') ||
    lower.includes('spa') ||
    lower.includes('리조트') ||
    lower.includes('호텔') ||
    lower.includes('체크인') ||
    lower.includes('휴양') ||
    lower.includes('스파')
  ) {
    return Building2;
  }
  if (
    lower.includes('tiệc tối') ||
    lower.includes('ẩm thực') ||
    lower.includes('hải sản') ||
    lower.includes('buffet') ||
    lower.includes('cơm') ||
    lower.includes('cao lầu') ||
    lower.includes('cà phê') ||
    lower.includes('bữa') ||
    lower.includes('만찬') ||
    lower.includes('미식') ||
    lower.includes('해산물') ||
    lower.includes('뷔페') ||
    lower.includes('식사') ||
    lower.includes('디너') ||
    lower.includes('커피') ||
    lower.includes('카페')
  ) {
    return Utensils;
  }
  if (
    lower.includes('sông hoài') ||
    lower.includes('thuyền') ||
    lower.includes('hoa đăng') ||
    lower.includes('du thuyền') ||
    lower.includes('rừng dừa') ||
    lower.includes('소원배') ||
    lower.includes('소원등') ||
    lower.includes('바구니배') ||
    lower.includes('투본강') ||
    lower.includes('유람선')
  ) {
    return Ship;
  }
  if (
    lower.includes('bà nà') ||
    lower.includes('ngũ hành sơn') ||
    lower.includes('núi') ||
    lower.includes('đỉnh') ||
    lower.includes('đèo hải vân') ||
    lower.includes('바나힐') ||
    lower.includes('오행산') ||
    lower.includes('하이반') ||
    lower.includes('산')
  ) {
    return Mountain;
  }
  if (
    lower.includes('biển') ||
    lower.includes('bình minh') ||
    lower.includes('hoàng hôn') ||
    lower.includes('mỹ khê') ||
    lower.includes('tắm') ||
    lower.includes('미케비치') ||
    lower.includes('일출') ||
    lower.includes('일몰') ||
    lower.includes('해변') ||
    lower.includes('바다') ||
    lower.includes('선셋')
  ) {
    return Sun;
  }
  if (
    lower.includes('cầu vàng') ||
    lower.includes('chùa') ||
    lower.includes('hội an') ||
    lower.includes('cầu rồng') ||
    lower.includes('đại nội') ||
    lower.includes('làng pháp') ||
    lower.includes('di tích') ||
    lower.includes('골든브릿지') ||
    lower.includes('골든 브릿지') ||
    lower.includes('린응사') ||
    lower.includes('사원') ||
    lower.includes('호이안') ||
    lower.includes('용다리') ||
    lower.includes('황궁') ||
    lower.includes('유네스코')
  ) {
    return Camera;
  }
  return Sparkles;
};

// Helper to extract clean location tag for day badge
const extractLocationTag = (dayObj) => {
  if (!dayObj) return 'Đà Nẵng';
  if (typeof dayObj === 'object' && dayObj.locationTag) return dayObj.locationTag;
  const title = typeof dayObj === 'string' ? dayObj : dayObj.title || '';
  const parts = title.split('–').map((s) => s.trim());
  if (parts.length >= 3) return parts[2];
  if (parts.length >= 2) return parts[1];
  return parts[0] || 'Đà Nẵng';
};

const ItineraryStickyTimeline = ({ itinerariesData }) => {
  const itineraries = useMemo(() => itinerariesData || [], [itinerariesData]);
  const [activeItineraryId, setActiveItineraryId] = useState(itineraries[0]?.id || '4d3n');
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const containerRef = useRef(null);
  const visualSlidesRef = useRef([]);
  const editorialSlidesRef = useRef([]);
  const pathSvgRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  const { applyItinerary } = useTripBuilder();

  const activeItinerary = useMemo(() => {
    return itineraries.find((it) => it.id === activeItineraryId) || itineraries[0] || { days: [] };
  }, [itineraries, activeItineraryId]);

  const days = useMemo(() => activeItinerary?.days || [], [activeItinerary]);
  const { isKorean } = useLanguage();

  // Handle manual day selection via click with scroll sync
  const handleDayClick = useCallback(
    (idx) => {
      setActiveDayIndex(idx);

      const totalDays = days.length;
      if (totalDays <= 1) return;

      const targetRatio = idx / (totalDays - 1);

      if (scrollTriggerRef.current) {
        const st = scrollTriggerRef.current;
        const totalDur = totalDays * CHAPTER_HOLD + (totalDays - 1) * CHAPTER_TRANSITION;
        let targetP;
        if (idx === 0) {
          targetP = 0;
        } else if (idx === totalDays - 1) {
          targetP = Math.min(1.0, (idx * (CHAPTER_HOLD + CHAPTER_TRANSITION) + CHAPTER_HOLD * 0.5) / totalDur);
        } else {
          targetP = (idx * (CHAPTER_HOLD + CHAPTER_TRANSITION) + CHAPTER_HOLD * 0.5) / totalDur;
        }

        const targetY = st.start + (st.end - st.start) * targetP;

        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(targetY, { duration: 0.55, immediate: false });
        } else {
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
        }
      } else {
        // Fallback for Mobile / Low Viewport (Unpinned mode)
        if (pathSvgRef.current) {
          if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            pathSvgRef.current.style.strokeDashoffset = `${1 - targetRatio}`;
          } else {
            gsap.to(pathSvgRef.current, {
              strokeDashoffset: 1 - targetRatio,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        }
      }
    },
    [days.length]
  );

  // Switch package: reset active day index to 0
  const handlePackageChange = useCallback((pkgId) => {
    setActiveItineraryId(pkgId);
    setActiveDayIndex(0);
    if (pathSvgRef.current) {
      pathSvgRef.current.style.strokeDashoffset = '1';
    }
    if (scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(st.start, { immediate: true });
      } else {
        window.scrollTo({ top: st.start, behavior: 'instant' });
      }
    }
  }, []);

  // =========================================================================
  // CINEMATIC DWELL-AND-CROSSFADE SCROLL TIMELINE (DYNAMIC FOR 3, 4, 5 DAYS)
  // =========================================================================
  useEffect(() => {
    if (!containerRef.current || days.length === 0) return;

    const totalDays = days.length;
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 993px) and (min-height: 561px)',
        isTablet: '(min-width: 769px) and (max-width: 992px) and (min-height: 561px)',
        isMobile: '(max-width: 768px)',
        isShortHeight: '(max-height: 560px)',
        reduceMotion: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { isDesktop, isTablet, reduceMotion, isShortHeight } = context.conditions;

        // In reduced motion or non-pinned layouts, sync SVG offset to activeDayIndex
        const initialRatio = totalDays > 1 ? activeDayIndex / (totalDays - 1) : 0;
        if (pathSvgRef.current) {
          pathSvgRef.current.style.strokeDashoffset = `${1 - initialRatio}`;
        }

        if (reduceMotion) return;

        const pinDistance =
          isDesktop && !isShortHeight
            ? `+=${totalDays * 85}%`
            : isTablet && !isShortHeight
            ? `+=${totalDays * 65}%`
            : null;

        if (!pinDistance) return; // Natural flowing layout on mobile or constrained viewport height

        const progressObj = { visualProgress: initialRatio };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: pinDistance,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1
          },
          onUpdate: function () {
            const v = progressObj.visualProgress;
            if (pathSvgRef.current) {
              const clamped = Math.max(0, Math.min(1, v));
              pathSvgRef.current.style.strokeDashoffset = `${1 - clamped}`;
            }

            const curTime = this.time();
            let activeIdx = totalDays - 1;
            for (let k = 0; k < totalDays - 1; k++) {
              const mid = (k + 1) * CHAPTER_HOLD + k * CHAPTER_TRANSITION + CHAPTER_TRANSITION / 2;
              if (curTime < mid) {
                activeIdx = k;
                break;
              }
            }
            setActiveDayIndex((prev) => (prev !== activeIdx ? activeIdx : prev));
          }
        });

        scrollTriggerRef.current = tl.scrollTrigger;

        // Day 0 enters immediately
        const v0 = visualSlidesRef.current[0];
        const e0 = editorialSlidesRef.current[0];
        if (v0) {
          tl.set(v0, { opacity: 1, scale: 1.0, pointerEvents: 'auto' }, 0);
        }
        if (e0) {
          tl.set(e0, { opacity: 1, y: 0, pointerEvents: 'auto' }, 0);
        }

        // Hide subsequent slides at timeline start
        for (let j = 1; j < totalDays; j++) {
          const vj = visualSlidesRef.current[j];
          const ej = editorialSlidesRef.current[j];
          if (vj) tl.set(vj, { opacity: 0, scale: 1.04, pointerEvents: 'none' }, 0);
          if (ej) tl.set(ej, { opacity: 0, y: 25, pointerEvents: 'none' }, 0);
        }

        // Sequential Transitions for all remaining days
        for (let i = 0; i < totalDays - 1; i++) {
          const tStart = CHAPTER_HOLD + i * (CHAPTER_HOLD + CHAPTER_TRANSITION);
          const prevRatio = totalDays > 1 ? i / (totalDays - 1) : 0;
          const nextRatio = totalDays > 1 ? (i + 1) / (totalDays - 1) : 1;

          const currentV = visualSlidesRef.current[i];
          const currentE = editorialSlidesRef.current[i];
          const nextV = visualSlidesRef.current[i + 1];
          const nextE = editorialSlidesRef.current[i + 1];

          // 1. Line Progress between nodes
          tl.fromTo(
            progressObj,
            { visualProgress: prevRatio },
            { visualProgress: nextRatio, duration: CHAPTER_TRANSITION, ease: 'power1.inOut' },
            tStart
          );

          // 2. Visual Photography Slide Crossfade
          if (currentV && nextV) {
            tl.to(
              currentV,
              { opacity: 0, scale: 0.96, duration: CHAPTER_TRANSITION, ease: 'power2.inOut' },
              tStart
            );
            tl.set(currentV, { pointerEvents: 'none' }, tStart + CHAPTER_TRANSITION);
            tl.set(nextV, { pointerEvents: 'auto' }, tStart + CHAPTER_TRANSITION * 0.25);
            tl.fromTo(
              nextV,
              { opacity: 0, scale: 1.04 },
              { opacity: 1, scale: 1.0, duration: CHAPTER_TRANSITION, ease: 'power2.out' },
              tStart + CHAPTER_TRANSITION * 0.15
            );
          }

          // 3. Editorial Story Slide Crossfade
          if (currentE && nextE) {
            tl.to(
              currentE,
              { opacity: 0, y: -20, duration: CHAPTER_TRANSITION * 0.8, ease: 'power2.in' },
              tStart
            );
            tl.set(currentE, { pointerEvents: 'none' }, tStart + CHAPTER_TRANSITION);
            tl.set(nextE, { pointerEvents: 'auto' }, tStart + CHAPTER_TRANSITION * 0.25);
            tl.fromTo(
              nextE,
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: CHAPTER_TRANSITION, ease: 'power2.out' },
              tStart + CHAPTER_TRANSITION * 0.2
            );
          }
        }
      },
      containerRef
    );

    return () => mm.revert();
  }, [days, activeItineraryId]);

  return (
    <section className="itinerary-sticky-timeline" ref={containerRef} id="itinerary">
      {/* Background Ambient Glow & Vignette */}
      <div className="journal-ambient-vignette" aria-hidden="true">
        <div className="journal-glow-orb" />
        <div className="journal-warm-haze" />
      </div>

      <div className="dest-container journal-content-wrapper">
        {/* Header Strip & Package Selector */}
        <header className="journal-header">
          <div className="journal-header-left">
            <span className="dest-kicker journal-kicker">
              <Compass size={14} className="journal-kicker-icon" aria-hidden="true" />
              <span>THE SIGNATURE JOURNEY</span>
            </span>
            <h2 className="journal-title">A Journey Worth Remembering.</h2>
            {activeItinerary?.overview && (
              <p className="journal-overview-text">{activeItinerary.overview}</p>
            )}
          </div>

          {/* Segmented Package Control */}
          <div
            className="journal-package-segmented"
            role="tablist"
            aria-label="Chọn gói lịch trình Đà Nẵng"
          >
            {itineraries.map((it) => {
              const isSelected = activeItineraryId === it.id;
              const rawLabel = it.label || it.durationLabel || it.badge || it.id || '';
              const shortLabel = rawLabel.includes(' (') ? rawLabel.split(' (')[0] : rawLabel;
              const isFavorite = it.id === '4d3n' || it.id === '3d2n';

              return (
                <button
                  key={it.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`journal-package-btn ${isSelected ? 'package-btn-active' : ''}`}
                  onClick={() => handlePackageChange(it.id)}
                >
                  <Clock size={13} className="pkg-clock-icon" aria-hidden="true" />
                  <span>{shortLabel}</span>
                  {isFavorite && <span className="pkg-popular-badge">{isKorean ? '인기 추천' : 'Ưa chuộng nhất'}</span>}
                </button>
              );
            })}
          </div>
        </header>

        {/* Main Journal Stage: 58% Visual Showcase / 42% Editorial Narrative */}
        <div className="journal-stage-grid">
          {/* Left: Stacked Cinematic Photography Slides */}
          <div className="journal-visual-showcase">
            {days.map((d, idx) => (
              <div
                key={d.day}
                ref={(el) => (visualSlidesRef.current[idx] = el)}
                className={`journal-visual-slide ${idx === activeDayIndex ? 'slide-active-day' : ''}`}
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  pointerEvents: idx === 0 ? 'auto' : 'none'
                }}
              >
                <div className="journal-img-wrap">
                  <img
                    src={d.image}
                    alt={d.title}
                    className="journal-hero-img"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="journal-img-gradient" />

                  {/* Top Floating Badge */}
                  <div className="journal-floating-top">
                    <span className="journal-chapter-tag">
                      {isKorean ? `CHAPTER 0${d.day} / 0${days.length}` : `CHƯƠNG 0${d.day} / 0${days.length}`}
                    </span>
                    <span className="journal-location-tag">
                      <MapPin size={12} className="loc-pin-icon" aria-hidden="true" />
                      <span>{extractLocationTag(d)}</span>
                    </span>
                  </div>

                  {/* Bottom Day Title Strip */}
                  <div className="journal-bottom-strip">
                    <span className="journal-day-subhead">{isKorean ? `${d.day}일차 여정` : `Hành trình ngày ${d.day}`}</span>
                    <h4 className="journal-strip-title">{d.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Stacked Editorial Narrative Slides */}
          <aside className="journal-editorial-aside">
            {days.map((d, idx) => (
              <div
                key={d.day}
                ref={(el) => (editorialSlidesRef.current[idx] = el)}
                className={`journal-editorial-slide ${idx === activeDayIndex ? 'slide-active-day' : ''}`}
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  pointerEvents: idx === 0 ? 'auto' : 'none'
                }}
              >
                <div className="journal-story-header">
                  <div className="journal-day-number-row">
                    <span className="journal-pretitle-roman">DAY 0{d.day}</span>
                    <span className="pretitle-dot" aria-hidden="true">·</span>
                    <span className="journal-pretitle-highlight">
                      {isKorean ? '시그니처 프라이빗 혜택' : 'ĐẶC QUYỀN HÀNH TRÌNH'}
                    </span>
                  </div>

                  <h3 className="journal-narrative-title">{d.title}</h3>
                </div>

                {/* Curated Activity Highlights with Contextual Icons */}
                <div className="journal-activities-block">
                  <span className="activities-kicker">
                    {isKorean ? '오늘의 주요 하이라이트:' : 'Trải nghiệm nổi bật trong ngày:'}
                  </span>
                  <div className="journal-activities-list">
                    {(d.highlights || d.activities || []).map((hl, hIdx) => {
                      const text = typeof hl === 'string' ? hl : (hl.title || hl.text || '');
                      const IconComponent = getActivityIcon(text);
                      return (
                        <div key={hIdx} className="journal-activity-item">
                          <span className="activity-icon-wrap" aria-hidden="true">
                            <IconComponent size={14} />
                          </span>
                          <span className="activity-text">{text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action CTA: Apply Itinerary Button */}
                <div className="journal-cta-footer">
                  <button
                    type="button"
                    className="journal-action-cta"
                    onClick={() => applyItinerary(activeItinerary)}
                  >
                    <span>
                      {isKorean
                        ? `${activeItinerary.daysCount - 1}박 ${activeItinerary.daysCount}일 맞춤 일정 만들기`
                        : `Tùy chỉnh lịch trình ${activeItinerary.daysCount}N${activeItinerary.daysCount - 1}Đ này`}
                    </span>
                    <ArrowRight size={16} className="cta-arrow-icon" aria-hidden="true" />
                    <span className="btn-sweep-shine" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </aside>
        </div>

        {/* Bottom Interactive Signature Timeline */}
        <nav
          className="journal-signature-timeline"
          style={{ '--timeline-days-count': days.length }}
          aria-label="Thanh tiến trình lịch trình các ngày"
        >
          {/* SVG Animated Connector Line */}
          <div className="journal-svg-track-container" aria-hidden="true">
            <svg
              className="journal-svg-track"
              viewBox="0 0 1000 4"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="2"
                x2="1000"
                y2="2"
                className="track-bg-line"
              />
              <line
                ref={pathSvgRef}
                x1="0"
                y1="2"
                x2="1000"
                y2="2"
                pathLength="1"
                strokeLinecap="round"
                className="track-progress-line"
                style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              />
            </svg>
          </div>

          {/* Day Milestone Nodes */}
          <div className="journal-milestones-row">
            {days.map((d, idx) => {
              const isActive = idx === activeDayIndex;
              const isPast = idx < activeDayIndex;

              return (
                <button
                  key={d.day}
                  type="button"
                  className={`milestone-node-btn ${isActive ? 'node-active' : ''} ${isPast ? 'node-past' : ''}`}
                  onClick={() => handleDayClick(idx)}
                >
                  <div className="node-circle-wrap">
                    <span className="node-number">0{d.day}</span>
                    {isActive && <span className="node-pulse-ring" aria-hidden="true" />}
                  </div>

                  <div className="node-label-wrap">
                    <span className="node-day-lbl">{isKorean ? `0${d.day}일차` : `NGÀY 0${d.day}`}</span>
                    <span className="node-dest-lbl">{extractLocationTag(d)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default ItineraryStickyTimeline;
