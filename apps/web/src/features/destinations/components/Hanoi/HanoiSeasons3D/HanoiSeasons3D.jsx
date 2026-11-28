import React, { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../../../context/LanguageContext';
import { SEASON_ASSET_MANIFEST, SEASON_SCRIM_GRADIENTS } from './seasonAssets';
import {
  SEASON_SECTION_HEADER,
  SEASON_UI_LABELS,
  HANOI_SEASON_SCENES
} from './seasonScenes';
import { buildSeasonsTimeline } from './buildSeasonsTimeline';
import './HanoiSeasons3D.css';


/**
 * SUPER EZ TOUR — HANOI SCREEN 5 V1
 * HANOI THROUGH THE SEASONS — CINEMATIC PHOTOGRAPHIC EXPERIENCE
 * Replaces legacy Three.js low-poly tree & particles with a 4-season
 * full-bleed photographic documentary (Spring -> Summer -> Autumn -> Winter).
 * Preserves component name `HanoiSeasons3D` and section ID `hanoi-seasons`.
 */
const HanoiSeasons3D = () => {
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
  const timelineCtxRef = useRef(null);

  const [activeSeasonIdx, setActiveSeasonIdx] = useState(0);
  const [isNearViewport, setIsNearViewport] = useState(false);

  const { isKorean } = useLanguage();

  // 1. Near-Viewport IntersectionObserver (prevents competing with Screen 1 Hero LCP)
  useEffect(() => {
    if (isNearViewport) return;
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '900px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isNearViewport]);

  // 2. Bounded Lookahead Image Decoding (decodes current + next season ahead of transition)
  useEffect(() => {
    if (!isNearViewport) return;
    let isCancelled = false;

    const indicesToDecode = [activeSeasonIdx, activeSeasonIdx + 1].filter(
      (i) => i >= 0 && i < HANOI_SEASON_SCENES.length
    );

    indicesToDecode.forEach((idx) => {
      const imgEl = imageRefs.current[idx];
      if (imgEl && typeof imgEl.decode === 'function' && imgEl.complete && !isCancelled) {
        imgEl.decode().catch(() => { });
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [isNearViewport, activeSeasonIdx]);

  // 3. Scoped GSAP Master Timeline (Language-independent so KO/VI toggle never resets scroll/pin)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = buildSeasonsTimeline({
      containerEl: container,
      slideEls: slideRefs.current,
      imageEls: imageRefs.current,
      textEls: textRefs.current,
      seasonsData: HANOI_SEASON_SCENES,
      onSeasonChange: (nextIdx) => {
        setActiveSeasonIdx((prev) => (prev !== nextIdx ? nextIdx : prev));
      }
    });

    timelineCtxRef.current = mm;

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (timelineCtxRef.current?.revert) {
        timelineCtxRef.current.revert();
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="hanoi-seasons-scene"
      id="hanoi-seasons"
      aria-labelledby="hanoi-seasons-main-title"
    >
      <div className="seasons-cinematic-stage">
        {HANOI_SEASON_SCENES.map((season, idx) => {
          const asset = SEASON_ASSET_MANIFEST[season.assetId];
          const isActive = activeSeasonIdx === idx;
          const isNext = activeSeasonIdx + 1 === idx;
          const shouldEagerLoad = isNearViewport && idx <= activeSeasonIdx + 1;
          const experiences = isKorean ? season.experiencesKo : season.experiencesVi;

          return (
            <article
              key={season.id}
              ref={(el) => (slideRefs.current[idx] = el)}
              className={`season-cinematic-slide season-theme-${season.id} season-layout-${season.layoutVariant
                } ${isActive ? 'is-season-active' : ''} ${isNext ? 'is-season-next' : ''
                } ${season.isHeroSeason ? 'is-hero-season' : ''}`}
              aria-label={isKorean ? `${season.kickerKo} — ${season.titleKo}` : `${season.kickerVi} — ${season.titleVi}`}
            >
              {/* Full-Bleed Responsive Photographic Layer */}
              <div className="season-photo-viewport">
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
                    ref={(el) => (imageRefs.current[idx] = el)}
                    src={asset.src}
                    alt={isKorean ? asset.altKo : asset.altVi}
                    className="season-photo-img"
                    style={{
                      '--focal-desktop': asset.focalPointDesktop || '50% 50%',
                      '--focal-mobile':
                        asset.focalPointMobile || asset.focalPointDesktop || '50% 50%'
                    }}
                    loading={shouldEagerLoad ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={(e) => {
                      if (asset.fallbackSrc && e.target.src !== asset.fallbackSrc) {
                        e.target.src = asset.fallbackSrc;
                      }
                    }}
                  />
                </picture>

                {/* Directional Atmospheric Scrim */}
                <div
                  className={`season-scrim-overlay scrim-${asset.scrimDirection}`}
                  style={{
                    background: SEASON_SCRIM_GRADIENTS[asset.scrimDirection]
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Editorial Typography & Seasonal Travel Guidance (No Card Wrapper) */}
              <div
                ref={(el) => (textRefs.current[idx] = el)}
                className="season-editorial-container"
              >
                <div className="season-editorial-column">
                  {/* Main Section Title integrated into Season 01 (Spring) opening composition */}
                  {idx === 0 && (
                    <header className="seasons-master-header season-anim-item">
                      <span className="seasons-master-eyebrow">
                        {isKorean
                          ? SEASON_SECTION_HEADER.eyebrowKo
                          : SEASON_SECTION_HEADER.eyebrowVi}
                      </span>
                      <h2 id="hanoi-seasons-main-title" className="seasons-master-title">
                        {isKorean
                          ? SEASON_SECTION_HEADER.titleKo
                          : SEASON_SECTION_HEADER.titleVi}
                      </h2>
                      <p className="seasons-master-subtitle">
                        {isKorean
                          ? SEASON_SECTION_HEADER.subtitleKo
                          : SEASON_SECTION_HEADER.subtitleVi}
                      </p>
                    </header>
                  )}

                  {/* Small Editorial Season Index & Month Reference */}
                  <div className="season-index-row season-anim-item">
                    <span className="season-kicker-index">
                      {isKorean ? season.kickerKo : season.kickerVi}
                    </span>
                    <span className="season-index-divider" aria-hidden="true">
                      —
                    </span>
                    <span className="season-month-range">
                      {isKorean ? season.monthRangeKo : season.monthRangeVi}
                    </span>
                  </div>

                  {/* Seasonal Headline */}
                  <h3 className="season-headline season-anim-item">
                    {isKorean ? season.titleKo : season.titleVi}
                  </h3>

                  {/* Descriptive Narrative Paragraph */}
                  <p className="season-description season-anim-item">
                    {isKorean ? season.descriptionKo : season.descriptionVi}
                  </p>

                  {/* Recommended Experiences (Editorial List, No Pills/Chips) */}
                  <div className="season-guidance-block season-anim-item">
                    <span className="season-guidance-label">
                      {isKorean
                        ? SEASON_UI_LABELS.experiencesHeadingKo
                        : SEASON_UI_LABELS.experiencesHeadingVi}
                    </span>
                    <ul className="season-experiences-list">
                      {experiences.map((exp, expIdx) => (
                        <li key={expIdx} className="season-experience-item">
                          {exp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practical Travel Tip */}
                  <div className="season-tip-block season-anim-item">
                    <span className="season-guidance-label">
                      {isKorean
                        ? SEASON_UI_LABELS.travelTipHeadingKo
                        : SEASON_UI_LABELS.travelTipHeadingVi}
                    </span>
                    <p className="season-tip-text">
                      {isKorean ? season.travelTipKo : season.travelTipVi}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subtle License Attribution (Accessible only when slide is active) */}
              {asset.attributionRequired && (
                <div className="season-photo-credit">
                  <span>
                    {isKorean
                      ? SEASON_UI_LABELS.photoCreditLabelKo
                      : SEASON_UI_LABELS.photoCreditLabelVi}
                    :{' '}
                  </span>
                  <a
                    href={asset.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isActive ? 0 : -1}
                  >
                    {asset.photographer} ({asset.license})
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default HanoiSeasons3D;
