import {
  CONSULTATION_SCHEMA_VERSION,
  isValidCalendarDate,
  normalizeKoreanMobile,
  seoulToday,
} from '@superez/contracts';
import { VIETNAM_DESTINATIONS } from '../../../data/vietnamDestinations.js';

export { normalizeKoreanMobile, seoulToday };

/**
 * Canonical helper to resolve destination ID to a valid destination in VIETNAM_DESTINATIONS.
 * Returns empty string if not resolvable or not provided, allowing proper "Select Destination" prompt.
 */
export const resolveCanonicalDestinationId = (input) => {
  if (!input) return '';
  if (typeof input === 'object' && input !== null) {
    if ('nativeEvent' in input || '_reactName' in input || 'preventDefault' in input) {
      return '';
    }
    const raw = input.destinationId || input.destinationSlug || input.id || input.destination;
    return resolveCanonicalDestinationId(raw);
  }
  const norm = String(input).toLowerCase().trim();
  if (norm === 'kakao') return '';
  const matched = VIETNAM_DESTINATIONS.find(
    (d) =>
      d.id === norm ||
      d.slug === norm ||
      (d.aliases && d.aliases.some((a) => a.toLowerCase() === norm))
  );
  return matched ? matched.id : '';
};

export const consultationConfig = {
  'ha-noi': {
    quick: true,
    verified: { phone: false, email: false, kakao: false },
    policyVersion: null,
    heroMedia: {
      mobileSrc: '/assets/destinations/hanoi/hero/hoan-kiem-hero-b-mobile.webp',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hanoi_-_Turtle_Tower_(Th%C3%A1p_R%C3%B9a),_Ho%C3%A0n_Ki%E1%BA%BFm_Lake.jpg',
      author: 'P. Hughes',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      alt: {
        vi: 'Cận cảnh kiến trúc Tháp Rùa giữa làn nước xanh Hồ Hoàn Kiếm',
        ko: '에메랄드빛 호안끼엠 호수 위 거북탑의 고전 건축 디테일',
      },
    },
  },
};

export const unavailableCopy = {
  ko: '현재 온라인 상담 신청을 준비 중입니다. 아직 상담 요청이 접수되지 않았습니다.',
  vi: 'Hệ thống tiếp nhận tư vấn trực tuyến đang được chuẩn bị. Yêu cầu của bạn chưa được tiếp nhận.',
};

// Task 03 replaces this boundary with a receiver that returns an acknowledgement.
export function submitConsultation() {
  return { status: 'unavailable' };
}

export const technicalLimit = 999;
export const notesLimit = 1000;
export const enabledMethods = (config) => [
  ...(config.verified.kakao ? ['kakao'] : []), 'phone', 'email',
];

const integer = (value, min) => Number.isInteger(value) && value >= min && value <= technicalLimit;
const validDate = (date, today) => Boolean(date && date >= today && isValidCalendarDate(date));

function contactValue(draft) {
  if (draft.method === 'phone') return normalizeKoreanMobile(draft.phone);
  return draft[draft.method]?.trim() || '';
}

export function validateConsultation(draft, config, today = seoulToday()) {
  const errors = {};
  if (draft.departure.status !== 'undecided' &&
      (draft.departure.status !== 'exact' || !validDate(draft.departure.date, today))) errors.date = 'date';
  if (draft.duration.status !== 'undecided' &&
      (draft.duration.status !== 'fixed' || !integer(draft.duration.days, 1))) errors.duration = 'duration';
  if (!integer(draft.guests.adults, 1) || !integer(draft.guests.children, 0)) errors.guests = 'guests';
  if (!draft.name.trim() || draft.name.trim().length > 100 || /\p{Cc}/u.test(draft.name)) errors.name = 'name';
  const value = contactValue(draft);
  if (!enabledMethods(config).includes(draft.method)) errors.contact = 'method';
  else if (draft.method === 'phone' && !value) errors.contact = 'phone';
  else if (draft.method === 'email' && (!/^[^\s@]+@[^\s@]+$/.test(value) || value.length > 254)) errors.contact = 'email';
  else if (draft.method === 'kakao' && (!value || value.length > 100 || /\p{Cc}/u.test(value))) errors.contact = 'kakao';
  if (draft.notes.length > notesLimit) errors.notes = 'notes';
  return errors;
}

export function buildConsultationPayload(draft, { config, locale, today }) {
  const errors = validateConsultation(draft, config, today);
  if (Object.keys(errors).length) return { status: 'invalid', errors };
  if (!config.policyVersion || draft.acceptedPolicy !== config.policyVersion || !config.verified[draft.method]) {
    return { status: 'unavailable' };
  }
  return {
    status: 'valid',
    payload: {
      schemaVersion: CONSULTATION_SCHEMA_VERSION,
      requestId: draft.requestId,
      destinationId: draft.destinationId,
      entry: { ...draft.entry, locale },
      traveler: { name: draft.name.trim().normalize('NFC'), contact: { method: draft.method, value: contactValue(draft) } },
      trip: {
        departure: draft.departure.status === 'exact' ? draft.departure : { status: 'undecided', date: null },
        duration: draft.duration.status === 'fixed' ? draft.duration : { status: 'undecided', days: null },
        guests: draft.guests,
        itineraryId: draft.itineraryId,
        preferences: draft.preferences,
        specialRequests: draft.notes.trim() || null,
      },
      privacy: { policyVersion: config.policyVersion, accepted: true },
    },
  };
}

export function quickSeed(legacy, options = {}) {
  const snapshot = options.tripSnapshot?.destinationId === legacy.destinationId ? options.tripSnapshot : null;
  const explicitDays = options.itinerary?.days ?? snapshot?.duration?.days;
  const legacyDays = /^(\d+)d\d+n$/.exec(legacy.duration)?.[1];
  const days = explicitDays ?? ((legacy.journeyId || options.duration) && legacyDays ? Number(legacyDays) : null);
  const snapshotGuests = snapshot?.guests;
  const legacyAdults = /^\d+$/.test(String(legacy.travelers)) ? Number(legacy.travelers) : null;
  const guests = integer(snapshotGuests?.adults, 1) && integer(snapshotGuests?.children, 0)
    ? { adults: snapshotGuests.adults, children: snapshotGuests.children }
    : { adults: legacyAdults && integer(legacyAdults, 1) ? legacyAdults : 2, children: 0 };
  const ids = (values) => Array.isArray(values) ? values.filter((id) => typeof id === 'string' && /^[a-z0-9-]+$/.test(id)) : [];
  return {
    requestId: legacy.sessionId, destinationId: legacy.destinationId,
    entry: { source: legacy.source, route: legacy.route },
    latestSource: legacy.source,
    departure: { status: 'undecided', date: null },
    duration: integer(days, 1) ? { status: 'fixed', days } : { status: 'undecided', days: null },
    guests, name: '', method: consultationConfig[legacy.destinationId]?.verified.kakao ? 'kakao' : 'phone',
    phone: '', email: '', kakao: '', notes: legacy.specialRequests || '', acceptedPolicy: null,
    itineraryId: options.itinerary?.id ?? legacy.journeyId ?? null,
    preferences: { attractionIds: ids(snapshot?.preferences?.attractionIds), culinaryIds: ids(snapshot?.preferences?.culinaryIds) },
    legacyGroup: legacy.travelers, themeId: legacy.themeId, edited: {},
  };
}

export function resumeQuickDraft(previous, seed, options = {}) {
  if (!previous) return seed;
  const resumed = { ...previous, latestSource: seed.latestSource, pending: null };
  const snapshot = options.tripSnapshot?.destinationId === seed.destinationId ? options.tripSnapshot : null;
  if (!options.itinerary && !snapshot) return resumed;
  const updates = {};
  if (options.itinerary?.days != null || snapshot?.duration?.days != null) updates.duration = seed.duration;
  if (options.itinerary?.id) updates.itineraryId = seed.itineraryId;
  if (snapshot?.guests) updates.guests = seed.guests;
  if (snapshot?.preferences) updates.preferences = seed.preferences;
  const conflicts = Object.keys(updates).filter((key) =>
    previous.edited[key] && JSON.stringify(previous[key]) !== JSON.stringify(updates[key]));
  return conflicts.length ? { ...resumed, pending: updates } : { ...resumed, ...updates };
}
