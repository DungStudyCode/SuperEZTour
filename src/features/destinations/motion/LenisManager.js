import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

/**
 * Initialize Lenis Smooth Scroll and synchronize with GSAP ScrollTrigger
 * @returns {Lenis}
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  if (lenisInstance) {
    lenisInstance.destroy();
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

  // Synchronize Lenis with ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function getLenis() {
  return lenisInstance;
}