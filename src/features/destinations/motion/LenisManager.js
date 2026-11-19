import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let tickerCallback = null;
let scrollHandler = null;

/**
 * Initialize Lenis Smooth Scroll and synchronize with GSAP ScrollTrigger
 * @returns {Lenis|null}
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  // If active instance already exists, reuse it without recreation
  if (lenisInstance) {
    return lenisInstance;
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Synchronize Lenis with ScrollTrigger using a named reference
  scrollHandler = () => {
    ScrollTrigger.update();
  };
  lenisInstance.on('scroll', scrollHandler);

  // Single named ticker callback attached to GSAP ticker
  tickerCallback = (time) => {
    if (lenisInstance) {
      lenisInstance.raf(time * 1000);
    }
  };
  gsap.ticker.add(tickerCallback);

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function destroySmoothScroll() {
  // Cleanly remove GSAP ticker callback via exact reference
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }

  // Remove Lenis scroll listener and destroy instance
  if (lenisInstance) {
    if (scrollHandler) {
      lenisInstance.off('scroll', scrollHandler);
      scrollHandler = null;
    }
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function getLenis() {
  return lenisInstance;
}