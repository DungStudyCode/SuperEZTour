/**
 * Development-only runtime diagnostics & performance counters for Hanoi Screen 6 V1.3.
 * Activated in dev when ?atlasDebug=1 is in the URL or window.__HANOI_ATLAS_DEBUG__ === true.
 * Zero production UI footprint and zero per-frame console logging.
 */

export const PIN_FALLBACK_REASON = {
  DISABLED_BY_CONFIG: 'DISABLED_BY_CONFIG',
  REDUCED_MOTION: 'REDUCED_MOTION',
  VIEWPORT_TOO_NARROW: 'VIEWPORT_TOO_NARROW',
  VIEWPORT_TOO_SHORT: 'VIEWPORT_TOO_SHORT',
  CONTENT_OVERFLOW: 'CONTENT_OVERFLOW',
  MAP_NOT_READY: 'MAP_NOT_READY',
  LAYOUT_NOT_STABLE: 'LAYOUT_NOT_STABLE',
  EXPANDED_CONTENT: 'EXPANDED_CONTENT',
  PIN_TARGET_UNAVAILABLE: 'PIN_TARGET_UNAVAILABLE',
  TRIGGER_CREATION_FAILED: 'TRIGGER_CREATION_FAILED',
  ELIGIBLE: 'ELIGIBLE'
};

const INITIAL_COUNTERS = {
  mapInitCount: 0,
  mapRemoveCount: 0,
  scrollTriggerCreateCount: 0,
  scrollTriggerCleanupCount: 0,
  cameraRequestCount: 0,
  cameraExecutionCount: 0,
  cameraCancelCount: 0,
  redundantCameraRequestCount: 0,
  mapStopCallCount: 0,
  mapResizeCallCount: 0,
  scrollTriggerRefreshCallCount: 0,
  markerRecreationCount: 0,
  pinEligibilityTransitionCount: 0
};

let counters = { ...INITIAL_COUNTERS };
let lastLoggedSignature = '';

export function isAtlasDebugEnabled() {
  if (typeof window === 'undefined') return false;
  if (!import.meta.env?.DEV) return false;
  if (window.__HANOI_ATLAS_DEBUG__ === true) return true;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('atlasDebug') === '1';
  } catch {
    return false;
  }
}

export function incrementAtlasCounter(key, amount = 1) {
  if (!import.meta.env?.DEV) return;
  if (Object.prototype.hasOwnProperty.call(counters, key)) {
    counters[key] += amount;
  }
  if (typeof window !== 'undefined') {
    window.__HANOI_ATLAS_DIAGNOSTICS__ = {
      ...(window.__HANOI_ATLAS_DIAGNOSTICS__ || {}),
      counters: { ...counters }
    };
  }
}

export function getAtlasCounters() {
  return { ...counters };
}

export function publishAtlasPinDiagnostics(snapshot) {
  if (!import.meta.env?.DEV || typeof window === 'undefined') return;

  window.__HANOI_ATLAS_DIAGNOSTICS__ = {
    ...(window.__HANOI_ATLAS_DIAGNOSTICS__ || {}),
    counters: { ...counters },
    pin: snapshot
  };

  if (!isAtlasDebugEnabled()) return;

  // Log only on meaningful state transitions (never on every scroll frame)
  const signature = [
    snapshot.pinEligible,
    snapshot.fallbackReason,
    snapshot.pinActive,
    snapshot.explorationMode,
    snapshot.viewportWidth,
    snapshot.viewportHeight,
    snapshot.usableViewportHeight,
    snapshot.pinTargetHeight
  ].join('|');

  if (signature !== lastLoggedSignature) {
    lastLoggedSignature = signature;
    // eslint-disable-next-line no-console
    console.info('[HanoiAtlas V1.3 Diagnostics]', {
      pinEligible: snapshot.pinEligible,
      fallbackReason: snapshot.fallbackReason,
      pinActive: snapshot.pinActive,
      explorationMode: snapshot.explorationMode,
      viewport: `${snapshot.viewportWidth}x${snapshot.viewportHeight}`,
      usableViewportHeight: snapshot.usableViewportHeight,
      pinTargetHeight: snapshot.pinTargetHeight,
      pinDistance: snapshot.pinDistance,
      counters: { ...counters }
    });
  }
}
