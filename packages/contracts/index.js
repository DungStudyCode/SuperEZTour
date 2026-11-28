export const CONSULTATION_SCHEMA_VERSION = 1;

export const CONTACT_METHODS = Object.freeze(['phone', 'email', 'kakao']);

export const KNOWN_DESTINATIONS = Object.freeze([
  'ha-noi',
  'da-nang',
  'sa-pa',
  'ha-long',
  'ninh-binh',
  'hue',
  'nha-trang',
  'da-lat',
  'ho-chi-minh',
  'phu-quoc',
]);

export const ENTRY_SOURCES = Object.freeze([
  'hero',
  'destination-header',
  'cinematic-ending',
  'ending-cta-quote',
  'navbar',
  'footer',
  'floating',
  'mobile-menu',
  'megamenu',
  'search',
  'destination-card',
  'signature-journey',
  'travel-theme',
  'premium-services',
  'why-choose-us',
  'traveler-story',
  'destination-page',
  'direct',
]);

export const HANOI_ATTRACTIONS = Object.freeze([
  'hoan-kiem-lake',
  'old-quarter',
  'van-mieu',
  'thang-long-citadel',
  'st-joseph-cathedral',
  'opera-house',
  'tran-quoc-pagoda',
  'bat-trang-village',
]);

export const HANOI_CULINARY = Object.freeze([
  'pho-bo-hanoi',
  'bun-cha-hanoi',
  'egg-coffee',
  'cha-ca-la-vong',
  'banh-cuon',
  'bun-thang',
]);

export const HANOI_ITINERARIES = Object.freeze([
  '3d2n',
  'hanoi-halong-5d4n',
]);

const seoulDatePartsFormatter = new Intl.DateTimeFormat('en', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function normalizeKoreanMobile(raw) {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!/^\+?[0-9 -]+$/.test(trimmed)) return null;
  const digits = trimmed.replace(/[ -]/g, '');
  if (/^010[0-9]{8}$/.test(digits)) return `+82${digits.slice(1)}`;
  return /^\+8210[0-9]{8}$/.test(digits) ? digits : null;
}

export function seoulToday(now = new Date()) {
  const parts = seoulDatePartsFormatter.formatToParts(now);
  const part = (type) => parts.find((entry) => entry.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function isValidCalendarDate(date) {
  if (typeof date !== 'string' || !/^[1-9]\d{3}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isFinite(+parsed) && parsed.toISOString().slice(0, 10) === date;
}
