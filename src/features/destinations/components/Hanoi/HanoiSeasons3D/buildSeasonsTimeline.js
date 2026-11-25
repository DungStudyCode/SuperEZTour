/**
 * SUPER EZ TOUR — HANOI SCREEN 5 V1
 * HANOI THROUGH THE SEASONS — SCOPED 4-SEASON GSAP TIMELINE BUILDER
 *
 * Timeline Allocation (100 relative units):
 *  - 00–22 : Spring  (00–05 opening, 05–10 headline reveal, 10–19 reading hold, 19–22 transition to Summer)
 *  - 22–45 : Summer  (22–27 establishing, 27–32 headline reveal, 32–42 reading hold, 42–45 transition to Autumn)
 *  - 45–75 : Autumn  (45–51 establishing, 51–57 headline reveal, 57–72 extended reading hold, 72–75 transition to Winter)
 *  - 75–100: Winter  (75–80 establishing, 80–85 headline reveal, 85–96 reading hold, 96–100 ending & handoff)
 *
 * Responsive & Accessibility Strategy:
 *  - Desktop (>=993px, height >=580px): Pinned +=320%
 *  - Tablet (769–992px, height >=580px): Pinned +=250%
 *  - Mobile (<=768px) or Short Viewports (<580px): Unpinned natural document flow
 *  - Reduced Motion: Unpinned natural document flow, zero camera transforms
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SEASON_TIMELINE_WINDOWS = [
  { id: 'spring', index: 0, start: 0, hold: 10, transitionStart: 19, end: 22 },
  { id: 'summer', index: 1, start: 22, hold: 32, transitionStart: 42, end: 45 },
  { id: 'autumn', index: 2, start: 45, hold: 57, transitionStart: 72, end: 75 },
  { id: 'winter', index: 3, start: 75, hold: 85, transitionStart: 96, end: 100 }
];

export const resolveSeasonProgressIndex = (progress) => {
  const p = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
  if (p < 0.22) return 0;
  if (p < 0.45) return 1;
  if (p < 0.75) return 2;
  return 3;
};

export const buildSeasonsTimeline = ({
  containerEl,
  slideEls,
  imageEls,
  textEls,
  seasonsData,
  onSeasonChange
}) => {
  if (!containerEl || !slideEls || slideEls.length === 0) {
    return null;
  }

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: '(min-width: 993px) and (min-height: 580px)',
      isTablet: '(min-width: 769px) and (max-width: 992px) and (min-height: 580px)',
      isMobileOrShort: '(max-width: 768px), (max-height: 579px)',
      reduceMotion: '(prefers-reduced-motion: reduce)'
    },
    (context) => {
      const { isDesktop, isTablet, isMobileOrShort, reduceMotion } = context.conditions;

      // Mobile, Short Viewports, or Reduced Motion: Natural Document Flow (No Pinning)
      if (reduceMotion || isMobileOrShort || (!isDesktop && !isTablet)) {
        slideEls.forEach((slide, idx) => {
          if (slide) {
            gsap.set(slide, { autoAlpha: 1, clearProps: 'zIndex,visibility,opacity' });
          }
          const img = imageEls?.[idx];
          if (img) {
            gsap.set(img, { clearProps: 'transform,scale,x,y' });
          }
          const textBlock = textEls?.[idx];
          if (textBlock) {
            gsap.set(textBlock, { autoAlpha: 1, y: 0, clearProps: 'opacity,visibility,transform' });
            const children = textBlock.querySelectorAll('.season-anim-item');
            if (children.length) {
              gsap.set(children, { autoAlpha: 1, y: 0, clearProps: 'opacity,visibility,transform' });
            }
          }
        });
        return;
      }

      const pinDistance = isDesktop ? '+=320%' : '+=250%';

      let lastReportedIdx = 0;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl,
          start: 'top top',
          end: pinDistance,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (onSeasonChange) {
              const nextIdx = resolveSeasonProgressIndex(self.progress);
              if (nextIdx !== lastReportedIdx) {
                lastReportedIdx = nextIdx;
                onSeasonChange(nextIdx);
              }
            }
          }
        }
      });

      const getMotion = (idx) => {
        const mp = seasonsData?.[idx]?.motionProfile;
        return {
          scaleStart: mp?.scaleStart ?? 1.0,
          scaleEnd: mp?.scaleEnd ?? 1.05,
          panXStart: mp?.panXStart ?? 0,
          panXEnd: mp?.panXEnd ?? 0,
          panYStart: mp?.panYStart ?? 0,
          panYEnd: mp?.panYEnd ?? 0
        };
      };

      // 1. Deterministic Initial States at timeline position 0
      slideEls.forEach((slide, idx) => {
        if (!slide) return;
        gsap.set(slide, {
          autoAlpha: idx === 0 ? 1 : 0,
          zIndex: idx + 1
        });

        const img = imageEls?.[idx];
        const m = getMotion(idx);
        if (img) {
          gsap.set(img, {
            scale: m.scaleStart,
            x: m.panXStart,
            y: m.panYStart,
            transformOrigin: '50% 50%'
          });
        }

        const textBlock = textEls?.[idx];
        if (textBlock) {
          gsap.set(textBlock, { autoAlpha: 1, y: 0 });
          const items = textBlock.querySelectorAll('.season-anim-item');
          if (idx === 0) {
            gsap.set(items, { autoAlpha: 1, y: 0 });
          } else {
            gsap.set(items, { autoAlpha: 0, y: 16 });
          }
        }
      });

      // 2. Build 100-unit Master Timeline Across All 4 Seasons
      SEASON_TIMELINE_WINDOWS.forEach((win, i) => {
        const slide = slideEls[i];
        const img = imageEls?.[i];
        const textBlock = textEls?.[i];
        const m = getMotion(i);
        const winDuration = win.end - win.start;
        const transitionDuration = win.end - win.transitionStart; // 3 units

        tl.addLabel(`season-${win.id}-start`, win.start);

        // A. Continuous Camera Motion Profile over the season's active window
        if (img) {
          tl.to(
            img,
            {
              scale: m.scaleEnd,
              x: m.panXEnd,
              y: m.panYEnd,
              ease: 'none',
              duration: winDuration
            },
            win.start
          );
        }

        // B. Reveal Incoming Slide & Editorial Typography (for Summer, Autumn, Winter)
        if (i > 0 && slide) {
          const prevWin = SEASON_TIMELINE_WINDOWS[i - 1];
          const prevSlide = slideEls[i - 1];
          const crossfadeStart = prevWin.transitionStart; // 19, 42, 72
          const crossfadeDur = prevWin.end - prevWin.transitionStart; // 3 units

          // Incoming slide fades in over previous slide (zIndex: i + 1 > i)
          tl.to(
            slide,
            {
              autoAlpha: 1,
              duration: crossfadeDur,
              ease: 'power2.inOut'
            },
            crossfadeStart
          );

          // Outgoing slide hides only AFTER incoming slide reaches full opacity (zero black frame)
          if (prevSlide) {
            tl.to(
              prevSlide,
              {
                autoAlpha: 0,
                duration: 0.25,
                ease: 'none'
              },
              prevWin.end + 0.05
            );
          }

          // Staggered typography reveal during establishing/headline window
          if (textBlock) {
            const items = textBlock.querySelectorAll('.season-anim-item');
            items.forEach((item, itemIdx) => {
              tl.to(
                item,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 2.4,
                  ease: 'power2.out'
                },
                win.start + 0.8 + itemIdx * 0.75
              );
            });
          }
        }

        // C. Reading Hold Label
        tl.addLabel(`season-${win.id}-hold`, win.hold);

        // D. Outgoing Typography Clean Exit before Next Season Crossfades In
        if (i < SEASON_TIMELINE_WINDOWS.length - 1 && textBlock) {
          tl.to(
            textBlock,
            {
              autoAlpha: 0,
              y: -12,
              duration: Math.max(1.8, transitionDuration - 0.6),
              ease: 'power2.inOut'
            },
            win.transitionStart
          );
        }
      });

      // Hold Winter composition cleanly through 96..100 for natural handoff to Screen 6
      tl.to({}, { duration: 0.1 }, 100);
      tl.addLabel('seasons-ending', 100);
    },
    containerEl
  );

  return mm;
};
