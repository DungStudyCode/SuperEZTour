import logoImg from '../assets/logo.png';

/**
 * Super EZ Tour — Brand & Company Configuration
 * Config-driven architecture for brand identity, verified business info, and social channels.
 *
 * Security & Accuracy Directive:
 * - Fields with `null` or unverified status must NEVER be rendered on the public website.
 * - Zero fabricated addresses, registration numbers, licenses, or phone numbers.
 * - Designed for seamless future connection to Admin Settings or CMS API.
 */

export const companyInfo = {
  brandName: 'Super EZ Tour',
  brandShortName: 'EZ Tour',
  logo: logoImg,
  tagline: 'Your Vietnam. Your Journey.',

  // Legal & Registration Information (Strictly unverified fields remain null)
  legal: {
    isVerified: false,
    legalName: null,
    registrationNumber: null,
    travelLicense: null,
    representative: null,
    headquarters: null,
    officeAddress: null,
  },

  // Contact Information (Only verified channels are published)
  contact: {
    isVerified: false,
    hotline: null,
    email: null,
    supportHours: null,
  },

  // Social Media Channels (Only verified official channels are published)
  social: {
    isVerified: false,
    kakaoTalk: null,
    facebook: null,
    instagram: null,
    youtube: null,
    zalo: null,
  },
};

export const BRAND_CONFIG = {
  brandName: 'Super EZ Tour',
  brandShortName: 'EZ Tour',
  logo: logoImg,
  logoDark: logoImg,
  tagline: 'Tour riêng 100% · Không ghép đoàn',
  taglineLong: 'Nền tảng đặt tour riêng tư, lịch trình linh hoạt hàng đầu Châu Á',
  slogan: 'Tour riêng 100% · Không ghép đoàn',

  // Contact Information (Used internally or in consultation forms if required)
  contact: {
    hotline: '1900 8899',
    hotlineDisplay: '1900 8899',
    email: 'booking@supereztour.com',
  },

  // Legal & Company Info
  companyInfo,

  // Brand Colors
  colors: {
    primary: '#E96A36',
    primaryHover: '#D45722',
    charcoal: '#19252B',
    charcoalSurface: '#223139',
    champagne: '#C5A477',
    cream: '#F7F5F1',
    muted: '#B7C4C8',
  },
};

export default BRAND_CONFIG;
