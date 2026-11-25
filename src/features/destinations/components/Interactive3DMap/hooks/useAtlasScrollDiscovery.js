import { useState, useEffect, useRef, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  PIN_FALLBACK_REASON,
  incrementAtlasCounter,
  publishAtlasPinDiagnostics
} from '../utils/atlasRuntimeDiagnostics';

export const EXPLORATION_MODE = {
  SCROLL: 'scroll-discovery',
  MANUAL: 'manual-exploration'
};

const HYSTERESIS_BAND = 0.01;
const MIN_DESKTOP_WIDTH = 1024;
const MIN_USABLE_HEIGHT = 480;

/**
 * Measures actual fixed/sticky DestinationHeader overlap without hardcoding or double-counting.
 */
function measureNavbarOverlap() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return 64;
  const headerEl = document.querySelector('.dest-header');
  if (!headerEl) return 0;
  const style = window.getComputedStyle(headerEl);
  if (style.position !== 'fixed' && style.position !== 'sticky') {
    return 0;
  }
  const rect = headerEl.getBoundingClientRect();
  return rect.height > 0 ? Math.round(rect.height) : 64;
}

/**
 * Maps ScrollTrigger progress [0..1] to discrete landmark step index:
 *  -1 = Entry / Overview hold (0.00 -> entryEnd, e.g. 0.00 -> 0.30 for 60vh/200vh)
 *   0..count-1 = Landmark discovery steps (entryEnd -> discoveryEnd, e.g. 0.30 -> 0.90)
 *   count = Exit hold (discoveryEnd -> 1.00, e.g. 0.90 -> 1.00 for 20vh/200vh)
 */
function resolveStepFromProgress(progress, count, currentStep, entryEnd, discoveryEnd) {
  if (count <= 0) return -1;

  if (progress < entryEnd - (currentStep >= 0 ? HYSTERESIS_BAND : 0)) {
    return -1;
  }
  if (progress >= discoveryEnd + (currentStep < count ? HYSTERESIS_BAND : 0)) {
    return count;
  }

  const span = Math.max(0.05, discoveryEnd - entryEnd);
  const normalized = Math.max(0, Math.min(0.9999, (progress - entryEnd) / span));
  const rawStep = Math.floor(normalized * count);

  // Hysteresis against trackpad inertia jitter at step boundaries
  if (currentStep >= 0 && currentStep < count && rawStep !== currentStep) {
    const stepSize = span / count;
    const halfStep = stepSize * 0.35;
    const effectiveHysteresis = Math.min(HYSTERESIS_BAND, halfStep);
    const boundary =
      rawStep > currentStep
        ? entryEnd + (currentStep + 1) * stepSize + effectiveHysteresis
        : entryEnd + currentStep * stepSize - effectiveHysteresis;

    if (rawStep > currentStep && progress < boundary) return currentStep;
    if (rawStep < currentStep && progress > boundary) return currentStep;
  }

  return rawStep;
}

/**
 * Configuration-driven Scroll Discovery lifecycle for Travel Atlas (Hanoi V1.3).
 * Inactive when scrollExperience.enabled is false (preserving Da Nang 100%).
 */
export function useAtlasScrollDiscovery({
  enabled = false,
  desktopOnly = true,
  adaptivePin = true,
  allowManualOverride = true,
  entryHoldVh = 60,
  discoveryVh = 120,
  exitHoldVh = 20,
  layoutVariant = 'travel-atlas',
  prefersReducedMotion = false,
  mapLoaded = false,
  isExperiencesOpen = false,
  isUserInteractingRef,
  containerRef,
  pinTargetRef,
  measureTargetRef,
  visibleDestinations = [],
  totalDestinationsCount = 8,
  onScrollStepLandmark,
  onScrollOverview
}) {
  const [explorationMode, setExplorationMode] = useState(EXPLORATION_MODE.SCROLL);
  const [scrollStepIndex, setScrollStepIndex] = useState(-1);
  const [isPinEligible, setIsPinEligible] = useState(false);
  const [isPinActive, setIsPinActive] = useState(false);
  const [fallbackReason, setFallbackReason] = useState(
    enabled ? PIN_FALLBACK_REASON.LAYOUT_NOT_STABLE : PIN_FALLBACK_REASON.DISABLED_BY_CONFIG
  );
  const [pinMetrics, setPinMetrics] = useState({
    usableViewportHeight: 0,
    pinTargetHeight: 0,
    pinDistancePx: 0,
    navbarHeight: 64
  });

  const explorationModeRef = useRef(explorationMode);
  explorationModeRef.current = explorationMode;

  const isPinEligibleRef = useRef(isPinEligible);
  isPinEligibleRef.current = isPinEligible;

  const isPinActiveRef = useRef(isPinActive);
  isPinActiveRef.current = isPinActive;

  const currentStepRef = useRef(-1);
  const lastProgressRef = useRef(0);

  const visibleDestinationsRef = useRef(visibleDestinations);
  visibleDestinationsRef.current = visibleDestinations;

  const onScrollStepRef = useRef(onScrollStepLandmark);
  onScrollStepRef.current = onScrollStepLandmark;

  const onScrollOverviewRef = useRef(onScrollOverview);
  onScrollOverviewRef.current = onScrollOverview;

  const triggerRef = useRef(null);

  const computeTimelineDimensions = useCallback(
    (vh, count) => {
      const baseCount = Math.max(1, totalDestinationsCount || 8);
      const activeCount = Math.max(1, count || baseCount);
      const scaledDiscoveryVh =
        activeCount === baseCount
          ? discoveryVh
          : Math.max(45, Math.round((discoveryVh * activeCount) / baseCount));
      const totalVh = entryHoldVh + scaledDiscoveryVh + exitHoldVh;
      const entryEnd = entryHoldVh / totalVh;
      const discoveryEnd = (entryHoldVh + scaledDiscoveryVh) / totalVh;
      const pinDistancePx = Math.round((vh * totalVh) / 100);
      return {
        totalVh,
        entryEnd,
        discoveryEnd,
        pinDistancePx
      };
    },
    [entryHoldVh, discoveryVh, exitHoldVh, totalDestinationsCount]
  );

  const evaluateEligibility = useCallback(() => {
    if (typeof window === 'undefined') return false;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const visualVh = Math.round(window.visualViewport?.height || vh);
    const navbarHeight = measureNavbarOverlap();
    const topClearance = 8;
    const bottomClearance = 10;
    const usableViewportHeight = Math.max(0, vh - navbarHeight - topClearance - bottomClearance);

    const measureEl = measureTargetRef?.current || pinTargetRef?.current;
    const sectionEl = containerRef?.current;
    const pinTargetHeight = measureEl ? Math.round(measureEl.offsetHeight) : 0;
    const sectionHeight = sectionEl ? Math.round(sectionEl.offsetHeight) : 0;

    let reason = PIN_FALLBACK_REASON.ELIGIBLE;
    let eligible = true;

    const desktopEligible = !desktopOnly || vw >= MIN_DESKTOP_WIDTH;
    const heightEligible = usableViewportHeight >= MIN_USABLE_HEIGHT;
    // Hysteresis buffer (+18px when already eligible, +8px when entering) prevents threshold oscillation
    const fitTolerance = isPinEligibleRef.current ? 18 : 8;
    const contentFits =
      !adaptivePin ||
      pinTargetHeight === 0 ||
      pinTargetHeight <= usableViewportHeight + fitTolerance;

    if (!enabled) {
      eligible = false;
      reason = PIN_FALLBACK_REASON.DISABLED_BY_CONFIG;
    } else if (prefersReducedMotion) {
      eligible = false;
      reason = PIN_FALLBACK_REASON.REDUCED_MOTION;
    } else if (!desktopEligible) {
      eligible = false;
      reason = PIN_FALLBACK_REASON.VIEWPORT_TOO_NARROW;
    } else if (!heightEligible) {
      eligible = false;
      reason = PIN_FALLBACK_REASON.VIEWPORT_TOO_SHORT;
    } else if (!measureEl) {
      eligible = false;
      reason = PIN_FALLBACK_REASON.PIN_TARGET_UNAVAILABLE;
    } else if (!contentFits) {
      eligible = false;
      reason = PIN_FALLBACK_REASON.CONTENT_OVERFLOW;
    }

    const { pinDistancePx } = computeTimelineDimensions(
      vh,
      visibleDestinationsRef.current.length
    );
    const effectivePinDistance = eligible ? pinDistancePx : 0;

    if (eligible !== isPinEligibleRef.current) {
      incrementAtlasCounter('pinEligibilityTransitionCount');
      isPinEligibleRef.current = eligible;
      setIsPinEligible(eligible);
    }
    setFallbackReason(reason);
    setPinMetrics({
      usableViewportHeight,
      pinTargetHeight,
      pinDistancePx: effectivePinDistance,
      navbarHeight
    });

    // Gather component sub-heights for dev diagnostics only when in dev mode
    if (import.meta.env?.DEV && sectionEl) {
      const qHeight = (sel) =>
        Math.round(sectionEl.querySelector(sel)?.getBoundingClientRect().height || 0);
      publishAtlasPinDiagnostics({
        destination: 'ha-noi',
        scrollExperienceEnabled: enabled,
        layoutVariant,
        viewportWidth: vw,
        viewportHeight: vh,
        visualViewportHeight: visualVh,
        navbarHeight,
        topClearance,
        bottomClearance,
        usableViewportHeight,
        sectionHeight,
        pinTargetHeight,
        headerHeight: qHeight('.map-3d-header'),
        filterHeight: qHeight('.atlas-filters-bar'),
        mapHeight: qHeight('.map-canvas-wrapper'),
        detailPanelHeight: qHeight('.map-editorial-panel'),
        progressHeight: qHeight('.atlas-discovery-bar'),
        footerHeight: qHeight('.atlas-footer-bar'),
        prefersReducedMotion,
        desktopEligible,
        heightEligible,
        contentFits,
        mapReady: mapLoaded,
        experiencesExpanded: isExperiencesOpen,
        pinEligible: eligible,
        pinActive: isPinActiveRef.current,
        fallbackReason: reason,
        triggerStart: `top top+=${navbarHeight + topClearance}`,
        triggerEnd: `+=${effectivePinDistance}`,
        pinDistance: effectivePinDistance,
        scrollProgress: Number(lastProgressRef.current.toFixed(3)),
        currentStep: currentStepRef.current,
        explorationMode: explorationModeRef.current
      });
    }

    return eligible;
  }, [
    enabled,
    prefersReducedMotion,
    desktopOnly,
    adaptivePin,
    layoutVariant,
    mapLoaded,
    isExperiencesOpen,
    containerRef,
    pinTargetRef,
    measureTargetRef,
    computeTimelineDimensions
  ]);

  // Evaluate on mount, once after mapLoaded / fonts settle, and on real viewport resize
  useEffect(() => {
    evaluateEligibility();

    if (!enabled || typeof window === 'undefined') return undefined;

    let settleRaf = requestAnimationFrame(() => {
      evaluateEligibility();
    });

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        evaluateEligibility();
      }).catch(() => {});
    }

    let resizeTimer = null;
    let lastVw = window.innerWidth;
    let lastVh = window.innerHeight;

    const handleResize = () => {
      const nextVw = window.innerWidth;
      const nextVh = window.innerHeight;
      if (Math.abs(nextVw - lastVw) < 2 && Math.abs(nextVh - lastVh) < 2) {
        return;
      }
      lastVw = nextVw;
      lastVh = nextVh;

      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isUserInteractingRef?.current) return;
        evaluateEligibility();
        incrementAtlasCounter('scrollTriggerRefreshCallCount');
        ScrollTrigger.refresh();
      }, 120);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    return () => {
      if (settleRaf) cancelAnimationFrame(settleRaf);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [enabled, mapLoaded, evaluateEligibility, isUserInteractingRef]);

  // Create scoped ScrollTrigger pin when eligible (never recreated on landmark/mode change)
  useEffect(() => {
    if (!enabled || !isPinEligible || prefersReducedMotion) {
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
        incrementAtlasCounter('scrollTriggerCleanupCount');
      }
      isPinActiveRef.current = false;
      setIsPinActive(false);
      return undefined;
    }

    const triggerEl = pinTargetRef?.current || containerRef?.current;
    if (!triggerEl) return undefined;

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      pin: triggerEl,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      start: () => `top top+=${measureNavbarOverlap() + 8}`,
      end: () => {
        const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
        const { pinDistancePx } = computeTimelineDimensions(
          vh,
          visibleDestinationsRef.current.length
        );
        return `+=${pinDistancePx}`;
      },
      onToggle: (self) => {
        isPinActiveRef.current = self.isActive;
        setIsPinActive(self.isActive);
      },
      onUpdate: (self) => {
        lastProgressRef.current = self.progress;

        // Never overwrite manual exploration or interrupt an active pointer/drag gesture on the map
        if (
          explorationModeRef.current !== EXPLORATION_MODE.SCROLL ||
          isUserInteractingRef?.current
        ) {
          return;
        }

        const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
        const list = visibleDestinationsRef.current;
        const { entryEnd, discoveryEnd } = computeTimelineDimensions(vh, list.length);
        const nextStep = resolveStepFromProgress(
          self.progress,
          list.length,
          currentStepRef.current,
          entryEnd,
          discoveryEnd
        );

        if (nextStep === currentStepRef.current) {
          return;
        }

        currentStepRef.current = nextStep;
        setScrollStepIndex(nextStep);

        if (nextStep === -1) {
          onScrollOverviewRef.current?.();
          return;
        }

        if (nextStep >= 0 && nextStep < list.length) {
          const targetLandmark = list[nextStep];
          if (targetLandmark) {
            onScrollStepRef.current?.(targetLandmark.id);
          }
        }
      }
    });

    triggerRef.current = st;
    incrementAtlasCounter('scrollTriggerCreateCount');

    const refreshRaf = requestAnimationFrame(() => {
      if (!isUserInteractingRef?.current) {
        incrementAtlasCounter('scrollTriggerRefreshCallCount');
        ScrollTrigger.refresh();
      }
    });

    return () => {
      cancelAnimationFrame(refreshRaf);
      st.kill();
      incrementAtlasCounter('scrollTriggerCleanupCount');
      if (triggerRef.current === st) {
        triggerRef.current = null;
      }
      isPinActiveRef.current = false;
      setIsPinActive(false);
    };
  }, [
    enabled,
    isPinEligible,
    prefersReducedMotion,
    containerRef,
    pinTargetRef,
    computeTimelineDimensions,
    isUserInteractingRef
  ]);

  const enterManualMode = useCallback(() => {
    if (!enabled || !allowManualOverride) return;
    if (explorationModeRef.current !== EXPLORATION_MODE.MANUAL) {
      explorationModeRef.current = EXPLORATION_MODE.MANUAL;
      setExplorationMode(EXPLORATION_MODE.MANUAL);
    }
  }, [enabled, allowManualOverride]);

  const resumeScrollDiscovery = useCallback(() => {
    if (!enabled) return;
    explorationModeRef.current = EXPLORATION_MODE.SCROLL;
    setExplorationMode(EXPLORATION_MODE.SCROLL);

    // Sync discovery cursor to current scroll progress without moving window.scrollY
    const st = triggerRef.current;
    if (st) {
      const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
      const list = visibleDestinationsRef.current;
      const { entryEnd, discoveryEnd } = computeTimelineDimensions(vh, list.length);
      const syncedStep = resolveStepFromProgress(
        st.progress,
        list.length,
        -1,
        entryEnd,
        discoveryEnd
      );
      currentStepRef.current = syncedStep;
      setScrollStepIndex(syncedStep);

      if (syncedStep === -1) {
        onScrollOverviewRef.current?.();
      } else if (syncedStep >= 0 && syncedStep < list.length) {
        onScrollStepRef.current?.(list[syncedStep].id);
      } else if (list.length > 0) {
        onScrollStepRef.current?.(list[list.length - 1].id);
      }
    }
  }, [enabled, computeTimelineDimensions]);

  return {
    explorationMode,
    isManualMode: explorationMode === EXPLORATION_MODE.MANUAL,
    scrollStepIndex,
    isPinEligible,
    isPinActive,
    fallbackReason,
    pinMetrics,
    enterManualMode,
    resumeScrollDiscovery,
    reevaluateEligibility: evaluateEligibility
  };
}

export default useAtlasScrollDiscovery;
