export declare const CONSULTATION_SCHEMA_VERSION = 1;
export type ContactMethod = 'phone' | 'email' | 'kakao';
export declare const CONTACT_METHODS: readonly ContactMethod[];
export declare const KNOWN_DESTINATIONS: readonly string[];
export declare const ENTRY_SOURCES: readonly string[];
export declare const HANOI_ATTRACTIONS: readonly string[];
export declare const HANOI_CULINARY: readonly string[];
export declare const HANOI_ITINERARIES: readonly string[];

export declare function normalizeKoreanMobile(raw: string): string | null;
export declare function seoulToday(now?: Date): string;
export declare function isValidCalendarDate(date: string): boolean;
