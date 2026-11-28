/**
 * SUPER EZ TOUR — HANOI SCREEN 2 V3.4.1
 * Editorial Layout Geometry & Localized Directional Scrim Presets
 *
 * Ensures:
 *  1. Consistent top/height coordinates on editorialSurface (no auto <-> % jumps).
 *  2. Localized directional gradient scrims tailored to text side (left-to-right,
 *     right-to-left, center-bottom) with max ~0.65 opacity behind text and 0 over the main subject.
 *  3. Dedicated dark charcoal reading surface on mobile and split/framed desktop layouts.
 */

export const SCRIM_GRADIENTS = {
  // Text on left (0%..44%), main subject on right (48%..100%)
  'left-editorial':
    'linear-gradient(90deg, rgba(10, 13, 16, 0.65) 0%, rgba(10, 13, 16, 0.56) 28%, rgba(10, 13, 16, 0.22) 46%, rgba(10, 13, 16, 0.04) 58%, transparent 68%), linear-gradient(180deg, rgba(10, 13, 16, 0.18) 0%, transparent 24%, transparent 74%, rgba(10, 13, 16, 0.42) 100%)',

  // Text on right (54%..95%), main subject on left (0%..50%) — e.g. Chapter 04 Flower Vendors
  'right-editorial':
    'linear-gradient(270deg, rgba(10, 13, 16, 0.65) 0%, rgba(10, 13, 16, 0.58) 30%, rgba(10, 13, 16, 0.22) 48%, rgba(10, 13, 16, 0.04) 60%, transparent 70%), linear-gradient(180deg, rgba(10, 13, 16, 0.18) 0%, transparent 24%, transparent 74%, rgba(10, 13, 16, 0.42) 100%)',

  // Minimal bottom edge feather for split/framed layouts (keeps 95% of photo completely untouched)
  'minimal-caption':
    'linear-gradient(180deg, transparent 0%, transparent 80%, rgba(10, 13, 16, 0.38) 100%)'
};

export const EDITORIAL_LAYOUTS = {
  desktop: {
    'full-bleed': (align) => ({
      frame: { top: '0%', left: '0%', width: '100%', height: '100%', borderRadius: '0px' },
      // align === 'right' means photo subject is weighted right -> text sits safely on the left
      // align === 'left' means photo subject is weighted left -> text sits safely on the right
      panel: {
        top: '0%',
        height: '100%',
        left: align === 'right' ? '5%' : '55%',
        width: '39%'
      },
      isOverlayText: true,
      captionVisible: false
    }),
    'editorial-split': (align) => ({
      frame: {
        top: '0%',
        left: align === 'right' ? '40%' : '0%',
        width: '60%',
        height: '100%',
        borderRadius: '0px'
      },
      panel: {
        top: '0%',
        height: '100%',
        left: align === 'right' ? '0%' : '60%',
        width: '40%'
      },
      isOverlayText: false,
      captionVisible: false
    }),
    'framed-photo': (align) => ({
      frame: {
        top: '9%',
        left: align === 'right' ? '43%' : '5%',
        width: '52%',
        height: '76%',
        borderRadius: '2px'
      },
      panel: {
        top: '0%',
        height: '100%',
        left: align === 'right' ? '4%' : '60%',
        width: '36%'
      },
      isOverlayText: false,
      captionVisible: true
    }),
    'detail-reflection': (align) => ({
      frame: {
        top: '7%',
        left: align === 'right' ? '34%' : '4%',
        width: '62%',
        height: '81%',
        borderRadius: '2px'
      },
      panel: {
        top: '0%',
        height: '100%',
        left: align === 'right' ? '3%' : '68%',
        width: '29%'
      },
      isOverlayText: false,
      captionVisible: true
    })
  },

  mobile: {
    'full-bleed': () => ({
      frame: { top: '0%', left: '0%', width: '100%', height: '43%', borderRadius: '0px' },
      isOverlayText: false,
      captionVisible: false
    }),
    'editorial-split': () => ({
      frame: { top: '0%', left: '0%', width: '100%', height: '42%', borderRadius: '0px' },
      isOverlayText: false,
      captionVisible: false
    }),
    'framed-photo': () => ({
      frame: { top: '2.5%', left: '4%', width: '92%', height: '38%', borderRadius: '2px' },
      isOverlayText: false,
      captionVisible: false
    }),
    'detail-reflection': () => ({
      frame: { top: '2%', left: '3%', width: '94%', height: '39%', borderRadius: '2px' },
      isOverlayText: false,
      captionVisible: false
    })
  }
};

export function getLayoutGeometry(layoutType, align, isMobile) {
  const group = isMobile ? EDITORIAL_LAYOUTS.mobile : EDITORIAL_LAYOUTS.desktop;
  const resolver = group[layoutType] || group['editorial-split'];
  return resolver(align);
}
