import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Utensils, Flame, BookOpen, Plus, Check, ArrowDown } from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useTripBuilder, isCulinarySelected } from '../../../context/TripBuilderContext';
import { PHO_ASSET_MANIFEST, PHO_SCRIM_GRADIENTS } from './phoAssets';
import { PHO_DOCUMENTARY_ACTS } from './phoScenes';
import { BUN_CHA_ASSET_MANIFEST, BUN_CHA_SCRIM_GRADIENTS } from './bunChaAssets';
import { BUN_CHA_DOCUMENTARY_ACTS } from './bunChaScenes';
import { buildPhoTimeline, resolvePhoProgressState } from './buildPhoTimeline';
import PhoDetailModal from './PhoDetailModal';
import BunChaDetailModal from './BunChaDetailModal';
import './HanoiTaste3D.css';

/**
 * Canonical identification keys for Phở Bò & Bún Chả in TripBuilder
 * Synchronized with ha-noi.config.js & TripBuilderMorph Step 6 checkboxes
 */
export const PHO_KEYS = [
  'pho-bo',
  'pho-bo-hanoi',
  'Phở Bò Gia Truyền Hà Nội',
  'Phở Bò Gia Truyền Bát Đàn',
  '정통 하노이 소고기 쌀국수 (Phở Bò)',
  '하노이 정통 소고기 쌀국수 (퍼보)',
  '하노이 정통 소고기 쌀국수 (Phở Bò)',
  'Heirloom Hanoi Beef Pho'
];

export const BUN_CHA_KEYS = [
  'bun-cha',
  'bun-cha-hanoi',
  'Bún Chả Than Hoa Hà Nội',
  'Bún Chả Nướng Than Hoa Hàng Quạt',
  '하노이 숯불 분짜 (Bún Chả)',
  '참숯 직화 하노이 분짜',
  'Charcoal Grilled Pork Bun Cha'
];

/**
 * Independent 5-Act Culinary Documentary Chapter Section
 * Each chapter owns its own DOM refs, ScrollTrigger pin instance, modal state, and cleanup.
 */
const CulinaryChapterSection = ({
  chapterId,
  sceneClassName,
  ariaLabel,
  acts,
  assetManifest,
  scrimGradients,
  targetLabelVi,
  targetLabelKo,
  intermediateMonographLabelVi,
  intermediateMonographLabelKo,
  KickerIcon = Utensils,
  DetailModalComponent,
  showScrollHint = false
}) => {
  const containerRef = useRef(null);
  const actSlideRefs = useRef([]);
  const actImageRefs = useRef([]);
  const actTextRefs = useRef([]);
  const timelineCtxRef = useRef(null);

  const [activeActIndex, setActiveActIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isKorean } = useLanguage();
  const { toggleCulinary, tripState } = useTripBuilder();

  const targetPreference = isKorean ? targetLabelKo : targetLabelVi;

  const isAddedToTrip = useMemo(() => {
    return isCulinarySelected(tripState.culinaryPreferences, targetPreference);
  }, [tripState.culinaryPreferences, targetPreference]);

  const handleToggleTrip = useCallback(() => {
    toggleCulinary(targetPreference);
  }, [toggleCulinary, targetPreference]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = buildPhoTimeline({
      containerEl: container,
      actSlideEls: actSlideRefs.current,
      actImageEls: actImageRefs.current,
      actTextEls: actTextRefs.current,
      actsData: acts,
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
  }, [acts]);

  return (
    <section
      ref={containerRef}
      className={`hanoi-taste-scene ${sceneClassName}`}
      id={chapterId}
      aria-label={ariaLabel}
    >
      {/* 5-Act Stage */}
      <div className="pho-acts-stage">
        {acts.map((act, idx) => {
          const asset = assetManifest[act.assetId];
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
                    style={{
                      objectPosition: asset.focalPointDesktop || '50% 50%'
                    }}
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
                    background: scrimGradients[act.scrimGradient]
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
                    <KickerIcon size={13} className="pho-kicker-icon" />
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
                    {idx === acts.length - 1 ? (
                      <div className="pho-cta-group">
                        <button
                          type="button"
                          className={`pho-trip-cta-btn ${isAddedToTrip ? 'is-added' : ''}`}
                          onClick={handleToggleTrip}
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
                          <span>
                            {isKorean
                              ? act.secondaryCtaKo || intermediateMonographLabelKo
                              : act.secondaryCtaVi || intermediateMonographLabelVi}
                          </span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="pho-monograph-cue"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <BookOpen size={14} />
                        <span>
                          {isKorean ? intermediateMonographLabelKo : intermediateMonographLabelVi}
                        </span>
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
      {showScrollHint && activeActIndex === 0 && (
        <div className="pho-scroll-hint" aria-hidden="true">
          <span>{isKorean ? '스크롤하여 미식 다큐멘터리 감상' : 'Cuộn để khám phá thước phim tài liệu'}</span>
          <ArrowDown size={14} className="pho-bounce-arrow" />
        </div>
      )}

      {/* Chapter-Specific Monograph Detail Modal */}
      <DetailModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isKorean={isKorean}
        isAddedToTrip={isAddedToTrip}
        onToggleTrip={handleToggleTrip}
      />
    </section>
  );
};

/**
 * SUPER EZ TOUR — HANOI SCREEN 4 V2
 * SEQUENTIAL CULINARY DOCUMENTARY CHAPTERS:
 *  - Chapter I:  PHỞ HÀ NỘI — THE SOUL OF A MORNING (V1 Preserved)
 *  - Chapter II: BÚN CHẢ HÀ NỘI — THE FRAGRANCE OF CHARCOAL AT NOON (V2 Added)
 */
const HanoiTaste3D = () => {
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="hanoi-culinary-chapters">
      {/* CHAPTER 01 — PHỞ HÀ NỘI (V1 MORNING DOCUMENTARY) */}
      <CulinaryChapterSection
        chapterId="hanoi-taste"
        sceneClassName="pho-documentary-scene"
        ariaLabel="Phở Hà Nội — Grand Cinematic Food Documentary"
        acts={PHO_DOCUMENTARY_ACTS}
        assetManifest={PHO_ASSET_MANIFEST}
        scrimGradients={PHO_SCRIM_GRADIENTS}
        targetLabelVi="Phở Bò Gia Truyền Hà Nội"
        targetLabelKo="정통 하노이 소고기 쌀국수 (Phở Bò)"
        intermediateMonographLabelVi="Tìm hiểu chuyên khảo"
        intermediateMonographLabelKo="쌀국수 인문학 탐구"
        KickerIcon={Utensils}
        DetailModalComponent={PhoDetailModal}
        showScrollHint={true}
      />

      {/* CHAPTER 02 — BÚN CHẢ HÀ NỘI (V2 MIDDAY CHARCOAL DOCUMENTARY) */}
      <CulinaryChapterSection
        chapterId="hanoi-taste-buncha"
        sceneClassName="pho-documentary-scene buncha-documentary-scene"
        ariaLabel="Bún chả Hà Nội — The Fragrance of Charcoal at Noon"
        acts={BUN_CHA_DOCUMENTARY_ACTS}
        assetManifest={BUN_CHA_ASSET_MANIFEST}
        scrimGradients={BUN_CHA_SCRIM_GRADIENTS}
        targetLabelVi="Bún Chả Than Hoa Hà Nội"
        targetLabelKo="하노이 숯불 분짜 (Bún Chả)"
        intermediateMonographLabelVi="Khám phá Bún chả Hà Nội"
        intermediateMonographLabelKo="하노이 분짜 더 알아보기"
        KickerIcon={Flame}
        DetailModalComponent={BunChaDetailModal}
        showScrollHint={false}
      />
    </div>
  );
};

export default HanoiTaste3D;
