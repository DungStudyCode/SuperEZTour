import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Utensils, BookOpen, Plus, Check, ArrowDown } from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useTripBuilder } from '../../../context/TripBuilderContext';
import { PHO_ASSET_MANIFEST, PHO_SCRIM_GRADIENTS } from './phoAssets';
import { PHO_DOCUMENTARY_ACTS } from './phoScenes';
import { buildPhoTimeline, resolvePhoProgressState } from './buildPhoTimeline';
import PhoDetailModal from './PhoDetailModal';
import './HanoiTaste3D.css';

/**
 * Canonical identification keys for Phở Bò in TripBuilder
 * Prevents language toggle duplication while ensuring full backward compatibility
 */
const PHO_KEYS = [
  'pho-bo',
  'Phở Bò Gia Truyền Hà Nội',
  'Phở Bò Gia Truyền Bát Đàn',
  '하노이 정통 소고기 쌀국수 (퍼보)',
  '하노이 정통 소고기 쌀국수 (Phở Bò)',
  'Heirloom Hanoi Beef Pho'
];

/**
 * SUPER EZ TOUR — HANOI SCREEN 4 V1
 * PHỞ HÀ NỘI — GRAND CINEMATIC FOOD DOCUMENTARY
 *
 * Refactored from procedural WebGL Three.js to photographic scroll-driven documentary:
 *  - 5 Staged Editorial Acts with Reading Holds
 *  - High-resolution local WebP photography (desktop & mobile)
 *  - Localized directional scrims
 *  - Monograph Detail Modal with authentic Hanoi Pho institutions
 *  - Full TripBuilder integration & Korean cultural localization
 *  - Zero WebGL overhead
 */
const HanoiTaste3D = () => {
  const containerRef = useRef(null);
  const actSlideRefs = useRef([]);
  const actImageRefs = useRef([]);
  const actTextRefs = useRef([]);
  const timelineCtxRef = useRef(null);

  const [activeActIndex, setActiveActIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isKorean } = useLanguage();
  const { toggleCulinary, tripState } = useTripBuilder();

  // Check if Pho is in tripState.culinaryPreferences across any language key
  const isAddedToTrip = useMemo(() => {
    return tripState.culinaryPreferences.some((item) => PHO_KEYS.includes(item));
  }, [tripState.culinaryPreferences]);

  /**
   * Safe language-resilient toggle for Pho
   */
  const handleTogglePhoTrip = useCallback(() => {
    const existing = tripState.culinaryPreferences.find((item) => PHO_KEYS.includes(item));
    if (existing) {
      toggleCulinary(existing);
    } else {
      const targetLabel = isKorean
        ? '하노이 정통 소고기 쌀국수 (Phở Bò)'
        : 'Phở Bò Gia Truyền Hà Nội';
      toggleCulinary(targetLabel);
    }
  }, [isKorean, toggleCulinary, tripState.culinaryPreferences]);

  /**
   * Initialize GSAP ScrollTrigger Master Timeline
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = buildPhoTimeline({
      containerEl: container,
      actSlideEls: actSlideRefs.current,
      actImageEls: actImageRefs.current,
      actTextEls: actTextRefs.current,
      onProgressUpdate: (progress) => {
        const nextIdx = resolvePhoProgressState(progress);
        setActiveActIndex((prev) => (prev !== nextIdx ? nextIdx : prev));
      }
    });

    timelineCtxRef.current = mm;

    return () => {
      if (timelineCtxRef.current?.revert) {
        timelineCtxRef.current.revert();
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="hanoi-taste-scene pho-documentary-scene"
      id="hanoi-taste"
      aria-label="Phở Hà Nội — Grand Cinematic Food Documentary"
    >
      {/* Acts Container */}
      <div className="pho-acts-stage">
        {PHO_DOCUMENTARY_ACTS.map((act, idx) => {
          const asset = PHO_ASSET_MANIFEST[act.assetId];
          const isCurrent = activeActIndex === idx;

          return (
            <article
              key={act.actId}
              ref={(el) => (actSlideRefs.current[idx] = el)}
              className={`pho-act-slide act-variant-${act.layoutVariant} ${
                isCurrent ? 'pho-act-active' : ''
              }`}
            >
              {/* Responsive Photographic Layer */}
              <div className="pho-photo-viewport">
                <picture>
                  <source
                    media="(max-width: 768px)"
                    srcSet={asset.mobileSrc}
                    type="image/webp"
                  />
                  <source
                    media="(min-width: 769px)"
                    srcSet={asset.src}
                    type="image/webp"
                  />
                  <img
                    ref={(el) => (actImageRefs.current[idx] = el)}
                    src={asset.src}
                    alt={isKorean ? asset.altKo : asset.altVi}
                    className="pho-photo-img"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding={idx === 0 ? 'sync' : 'async'}
                    onError={(e) => {
                      if (asset.fallbackSrc && e.target.src !== asset.fallbackSrc) {
                        e.target.src = asset.fallbackSrc;
                      }
                    }}
                  />
                </picture>

                {/* Localized Directional Scrim Overlay */}
                <div
                  className={`pho-scrim-overlay scrim-${act.scrimGradient}`}
                  style={{
                    background: PHO_SCRIM_GRADIENTS[act.scrimGradient]
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Editorial Typography & Narrative Block */}
              <div
                ref={(el) => (actTextRefs.current[idx] = el)}
                className="pho-editorial-content"
              >
                <div className="pho-content-inner">
                  {/* Act Number & Kicker */}
                  <div className="pho-kicker">
                    <Utensils size={13} className="pho-kicker-icon" />
                    <span>{isKorean ? act.kickerKo : act.kickerVi}</span>
                  </div>

                  {/* Headline */}
                  <h2 className="pho-title">
                    {isKorean ? act.titleKo : act.titleVi}
                  </h2>

                  {/* Subtitle / Theme */}
                  {act.subtitleVi && (
                    <p className="pho-subtitle">
                      {isKorean ? act.subtitleKo : act.subtitleVi}
                    </p>
                  )}

                  {/* Editorial Story Paragraph */}
                  <p className="pho-story-para">
                    {isKorean ? act.storyKo : act.storyVi}
                  </p>

                  {/* Action Elements: Monograph Trigger & Act 05 TripBuilder CTA */}
                  <div className="pho-act-actions">
                    {idx === PHO_DOCUMENTARY_ACTS.length - 1 ? (
                      // Act 05 Final CTA Buttons
                      <div className="pho-cta-group">
                        <button
                          type="button"
                          className={`pho-trip-cta-btn ${isAddedToTrip ? 'is-added' : ''}`}
                          onClick={handleTogglePhoTrip}
                          title={isKorean ? '미식 일정에 담기' : 'Thêm vào hành trình ẩm thực'}
                        >
                          {isAddedToTrip ? <Check size={16} /> : <Plus size={16} />}
                          <span>
                            {isAddedToTrip
                              ? isKorean
                                ? act.ctaAddedKo
                                : act.ctaAddedVi
                              : isKorean
                              ? act.ctaKo
                              : act.ctaVi}
                          </span>
                        </button>

                        <button
                          type="button"
                          className="pho-monograph-btn"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <BookOpen size={15} />
                          <span>{isKorean ? '하노이 4대 쌀국수 노포 탐구' : 'Khám phá Tứ đại Phở Hà Nội'}</span>
                        </button>
                      </div>
                    ) : (
                      // Intermediate Acts: Monograph Cue
                      <button
                        type="button"
                        className="pho-monograph-cue"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <BookOpen size={14} />
                        <span>{isKorean ? '쌀국수 인문학 탐구' : 'Tìm hiểu chuyên khảo'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Scroll Down Hint for Act 01 */}
      {activeActIndex === 0 && (
        <div className="pho-scroll-hint" aria-hidden="true">
          <span>{isKorean ? '스크롤하여 미식 다큐멘터리 감상' : 'Cuộn để khám phá thước phim tài liệu'}</span>
          <ArrowDown size={14} className="pho-bounce-arrow" />
        </div>
      )}

      {/* In-depth Heritage Monograph Detail Modal */}
      <PhoDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isKorean={isKorean}
        isAddedToTrip={isAddedToTrip}
        onToggleTrip={handleTogglePhoTrip}
      />
    </section>
  );
};

export default HanoiTaste3D;
