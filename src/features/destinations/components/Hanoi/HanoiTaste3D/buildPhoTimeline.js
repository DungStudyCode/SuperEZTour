/**
 * SUPER EZ TOUR — HANOI SCREEN 4 V1 & V2
 * GRAND CINEMATIC FOOD DOCUMENTARY — REUSABLE 5-ACT TIMELINE BUILDER
 *
 * Architecture:
 *  - Scoped to a single chapter containerEl (supports sequential independent chapters: Phở V1 -> Bún Chả V2)
 *  - Pinned full-viewport container per chapter (no nested pins, no mega-timeline)
 *  - 5 Staged Acts with Dwell Holds (Reveal -> Camera Motion Profile -> Editorial Typography Reveal -> Reading Dwell -> Transition Out)
 *  - Supports per-act motionProfile ({ scaleStart, scaleEnd, panXStart, panXEnd, panYStart, panYEnd, extendedHold })
 *    while defaulting to Phở V1's exact serene push-in ({ scaleStart: 1.0, scaleEnd: 1.06, panX: 0, panY: 0 })
 *  - 100% bidirectional / reverse-scroll deterministic tracking (gsap.set + non-overlapping tl.to tweens)
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PHO_ACT_WINDOWS = [
  { actIndex: 0, start: 0.00, end: 0.20, center: 0.10 },
  { actIndex: 1, start: 0.20, end: 0.40, center: 0.30 },
  { actIndex: 2, start: 0.40, end: 0.60, center: 0.50 },
  { actIndex: 3, start: 0.60, end: 0.80, center: 0.70 },
  { actIndex: 4, start: 0.80, end: 1.00, center: 0.90 }
];

export const resolvePhoProgressState = (progress) => {
  const p = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
  if (p < 0.20) return 0;
  if (p < 0.40) return 1;
  if (p < 0.60) return 2;
  if (p < 0.80) return 3;
  return 4;
};

/**
 * Builds the GSAP Master Timeline for a 5-Act Culinary Documentary Chapter
 */
export const buildPhoTimeline = ({
  containerEl,
  actSlideEls,
  actImageEls,
  actTextEls,
  actsData,
  onProgressUpdate
}) => {
  if (!containerEl || !actSlideEls || actSlideEls.length === 0) {
    return null;
  }

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: '(min-width: 993px)',
      isTablet: '(min-width: 769px) and (max-width: 992px)',
      isMobile: '(max-width: 768px)',
      reduceMotion: '(prefers-reduced-motion: reduce)'
    },
    (context) => {
      const { isDesktop, isTablet, isMobile, reduceMotion } = context.conditions;

      if (reduceMotion) {
        actSlideEls.forEach((slide) => {
          if (slide) {
            gsap.set(slide, { autoAlpha: 1, clearProps: 'zIndex' });
          }
        });
        return;
      }

      const pinDistance = isDesktop ? '+=520%' : isTablet ? '+=380%' : '+=290%';
      const mobileFactor = isMobile ? 0.5 : 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl,
          start: 'top top',
          end: pinDistance,
          pin: true,
          pinSpacing: true,
          scrub: 0.9,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (onProgressUpdate) {
              onProgressUpdate(self.progress);
            }
          }
        }
      });

      const numActs = actSlideEls.length;
      const actDuration = 20;

      // Helper to resolve per-act motion profile (defaults to Phở V1 exact values)
      const getMotion = (idx) => {
        const mp = actsData?.[idx]?.motionProfile;
        return {
          scaleStart: mp?.scaleStart ?? 1.0,
          scaleEnd: mp?.scaleEnd ?? 1.06,
          panXStart: (mp?.panXStart ?? 0) * mobileFactor,
          panXEnd: (mp?.panXEnd ?? 0) * mobileFactor,
          panYStart: (mp?.panYStart ?? 0) * mobileFactor,
          panYEnd: (mp?.panYEnd ?? 0) * mobileFactor,
          extendedHold: Boolean(mp?.extendedHold)
        };
      };

      // 1. Deterministic Initial States at t = 0
      actSlideEls.forEach((slide, idx) => {
        if (!slide) return;
        gsap.set(slide, {
          autoAlpha: idx === 0 ? 1 : 0,
          zIndex: idx + 1
        });

        const img = actImageEls[idx];
        const m = getMotion(idx);
        if (img) {
          gsap.set(img, {
            scale: m.scaleStart,
            x: m.panXStart,
            y: m.panYStart,
            transformOrigin: '50% 50%'
          });
        }

        const textBlock = actTextEls[idx];
        if (textBlock) {
          gsap.set(textBlock, { autoAlpha: 1, y: 0 });
          const kicker = textBlock.querySelector('.pho-kicker');
          const title = textBlock.querySelector('.pho-title');
          const subtitle = textBlock.querySelector('.pho-subtitle');
          const story = textBlock.querySelector('.pho-story-para');
          const actions = textBlock.querySelector('.pho-act-actions');
          const items = [kicker, title, subtitle, story, actions].filter(Boolean);

          if (idx === 0) {
            gsap.set(items, { autoAlpha: 1, y: 0 });
          } else {
            gsap.set(items, { autoAlpha: 0, y: 18 });
          }
        }
      });

      // 2. Chronological Non-Overlapping Tweens Across All 5 Acts
      for (let i = 0; i < numActs; i++) {
        const slide = actSlideEls[i];
        const img = actImageEls[i];
        const textBlock = actTextEls[i];
        const m = getMotion(i);
        const actStart = i * actDuration;
        const actEnd = (i + 1) * actDuration;

        tl.addLabel(`pho-act-${i + 1}-start`, actStart);

        // A. Enter current slide & reveal typography (for Acts 2..5)
        if (i > 0 && slide) {
          const prevSlide = actSlideEls[i - 1];
          const fadeDur = m.extendedHold ? 2.6 : 3.2;

          // Fade in current slide over previous slide (zIndex: i + 1 > i)
          tl.to(
            slide,
            { autoAlpha: 1, duration: fadeDur, ease: 'power2.inOut' },
            actStart
          );

          // Once current slide is fully opaque, hide previous slide underneath so it doesn't intercept clicks
          if (prevSlide) {
            tl.to(
              prevSlide,
              { autoAlpha: 0, duration: 0.4, ease: 'none' },
              actStart + fadeDur + 0.05
            );
          }

          if (textBlock) {
            const kicker = textBlock.querySelector('.pho-kicker');
            const title = textBlock.querySelector('.pho-title');
            const subtitle = textBlock.querySelector('.pho-subtitle');
            const story = textBlock.querySelector('.pho-story-para');
            const actions = textBlock.querySelector('.pho-act-actions');
            const tOffset = m.extendedHold ? 1.4 : 1.8;

            if (kicker) {
              tl.to(
                kicker,
                { autoAlpha: 1, y: 0, duration: 1.8, ease: 'power2.out' },
                actStart + tOffset
              );
            }
            if (title) {
              tl.to(
                title,
                { autoAlpha: 1, y: 0, duration: 2.0, ease: 'power2.out' },
                actStart + tOffset + 0.6
              );
            }
            if (subtitle) {
              tl.to(
                subtitle,
                { autoAlpha: 1, y: 0, duration: 2.0, ease: 'power2.out' },
                actStart + tOffset + 1.2
              );
            }
            if (story) {
              tl.to(
                story,
                { autoAlpha: 1, y: 0, duration: 2.2, ease: 'power2.out' },
                actStart + tOffset + 1.8
              );
            }
            if (actions) {
              tl.to(
                actions,
                { autoAlpha: 1, y: 0, duration: 2.2, ease: 'power2.out' },
                actStart + (i === numActs - 1 ? 4.6 : tOffset + 2.4)
              );
            }
          }
        }

        // B. Continuous Camera Motion Profile during this act's active window
        if (img) {
          tl.to(
            img,
            {
              scale: m.scaleEnd,
              x: m.panXEnd,
              y: m.panYEnd,
              ease: 'none',
              duration: actDuration
            },
            actStart
          );
        }

        // C. Reading Dwell Plateau Label
        tl.addLabel(`pho-act-${i + 1}-hold`, actStart + 8);

        // D. Clean exit of current act's text block before next act enters
        if (i < numActs - 1 && textBlock) {
          tl.to(
            textBlock,
            { autoAlpha: 0, y: -14, duration: 1.8, ease: 'power2.inOut' },
            actEnd - 2.0
          );
        }
      }

      // Hold final act until timeline end (100 units)
      tl.to({}, { duration: 0.1 }, 100);
      tl.addLabel('pho-ending', 100);
    },
    containerEl
  );

  return mm;
};
