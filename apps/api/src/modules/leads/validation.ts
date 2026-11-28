import { createHmac, randomBytes } from 'node:crypto';
import {
  ENTRY_SOURCES,
  HANOI_ATTRACTIONS,
  HANOI_CULINARY,
  HANOI_ITINERARIES,
  KNOWN_DESTINATIONS,
  isValidCalendarDate,
  normalizeKoreanMobile,
  seoulToday,
} from '@superez/contracts';
import type { Config, ContactMethod } from '../../config/env.ts';
import { ApiError } from '../../shared/errors.ts';
import type { FieldIssue } from '../../shared/errors.ts';

export { normalizeKoreanMobile };

// Request shape is enforced by the versioned route JSON Schema before domain validation.
export interface LeadRequest {
  schemaVersion: 1;
  requestId: string;
  destinationId: string;
  entry: { source: string; route: string; locale: 'ko' | 'vi' };
  traveler: { name: string; contact: { method: ContactMethod; value: string } };
  trip: {
    departure: { status: 'undecided' | 'exact'; date: string | null };
    duration: { status: 'undecided' | 'fixed'; days: number | null };
    guests: { adults: number; children: number };
    itineraryId: string | null;
    preferences: { attractionIds: string[]; culinaryIds: string[] };
    specialRequests: string | null;
  };
  privacy: { policyVersion: string; accepted: true };
}

const sources = new Set<string>(ENTRY_SOURCES);
const knownDestinations = new Set<string>(KNOWN_DESTINATIONS);
const attractions = new Set<string>(HANOI_ATTRACTIONS);
const culinary = new Set<string>(HANOI_CULINARY);
const itineraries = new Set<string>(HANOI_ITINERARIES);

export function validDeparture(date: string, now?: Date): boolean {
  if (!isValidCalendarDate(date)) return false;
  return !now || date >= seoulToday(now);
}

function boundedInteger(value: number | null, floor: number) {
  return value !== null && Number.isInteger(value) && value >= floor && value <= 999;
}

export function canonicalize(input: LeadRequest, policy: Pick<Config, 'policy' | 'methods'>): LeadRequest {
  const fields: FieldIssue[] = [];
  const add = (path: string, code: string) => fields.push({ path, code });
  if (input.destinationId !== 'ha-noi') add('destinationId', knownDestinations.has(input.destinationId) ? 'DESTINATION_DISABLED' : 'UNKNOWN_DESTINATION');
  if (!sources.has(input.entry.source)) add('entry.source', 'INVALID_SOURCE');
  if (!['/', '/destinations/ha-noi', '/destinations/hanoi'].includes(input.entry.route)) add('entry.route', 'INVALID_ENTRY_ROUTE');
  if (!/^[A-Za-z0-9_-]{1,100}$/.test(input.requestId)) add('requestId', 'INVALID_DRAFT_ID');
  const name = input.traveler.name.trim().normalize('NFC');
  if (!name || name.length > 100 || /\p{Cc}/u.test(input.traveler.name)) add('traveler.name', 'INVALID_NAME');
  const { method } = input.traveler.contact;
  const rawValue = input.traveler.contact.value.trim();
  const value = method === 'phone' ? normalizeKoreanMobile(rawValue) : rawValue;
  if (!policy.methods.has(method) || method === 'kakao') add('traveler.contact.method', 'CONTACT_METHOD_DISABLED');
  if (method === 'phone' && !value) add('traveler.contact.value', 'INVALID_KOREAN_PHONE');
  if (method === 'email' && (!/^[^\s@]+@[^\s@]+$/.test(rawValue) || /\p{Cc}/u.test(rawValue))) add('traveler.contact.value', 'INVALID_EMAIL');
  if (input.privacy.policyVersion !== policy.policy || input.privacy.accepted !== true) add('privacy.policyVersion', 'INVALID_POLICY');
  const { departure, duration, guests, preferences, itineraryId } = input.trip;
  if (departure.status === 'exact' ? !departure.date || !validDeparture(departure.date) : departure.date !== null) {
    add('trip.departure.date', 'INVALID_DEPARTURE');
  }
  if (duration.status === 'fixed' ? !boundedInteger(duration.days, 1) : duration.days !== null) add('trip.duration.days', 'INVALID_DURATION');
  if (!boundedInteger(guests.adults, 1) || !boundedInteger(guests.children, 0)) add('trip.guests', 'INVALID_GUESTS');
  if (itineraryId !== null && !itineraries.has(itineraryId)) add('trip.itineraryId', 'INVALID_ITINERARY');
  if (preferences.attractionIds.some((id) => !attractions.has(id))) add('trip.preferences.attractionIds', 'INVALID_ATTRACTION');
  if (preferences.culinaryIds.some((id) => !culinary.has(id))) add('trip.preferences.culinaryIds', 'INVALID_CULINARY_PREFERENCE');
  if (input.trip.specialRequests?.includes('\0')) add('trip.specialRequests', 'INVALID_NOTES');
  if (fields.length) throw new ApiError(422, 'VALIDATION_FAILED', fields);
  return {
    ...input,
    traveler: { name, contact: { method, value: value! } },
    trip: {
      ...input.trip,
      preferences: {
        attractionIds: [...new Set(preferences.attractionIds)].sort(),
        culinaryIds: [...new Set(preferences.culinaryIds)].sort(),
      },
      specialRequests: input.trip.specialRequests?.trim() || null,
    },
  };
}

export function payloadDigest({ requestId: _draft, ...payload }: LeadRequest, key: string) {
  const canonical = (input: unknown): unknown => {
    if (Array.isArray(input)) return input.map(canonical);
    if (input !== null && typeof input === 'object') {
      const record = input as Record<string, unknown>;
      return Object.fromEntries(Object.keys(record).sort().map((name) => [name, canonical(record[name])]));
    }
    return input;
  };
  return createHmac('sha256', key).update(JSON.stringify(canonical(payload))).digest('hex');
}

export const publicReference = () => `SEZ-${randomBytes(16).toString('hex').toUpperCase()}`;
