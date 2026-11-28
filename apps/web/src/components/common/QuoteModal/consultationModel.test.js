import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  buildConsultationPayload, consultationConfig, enabledMethods, normalizeKoreanMobile,
  quickSeed, resolveCanonicalDestinationId, resumeQuickDraft, seoulToday, submitConsultation,
  validateConsultation,
} from './consultationModel.js';

const today = '2026-11-27';
const config = consultationConfig['ha-noi'];
const fixturePolicy = { ...config, policyVersion: 'test-only', verified: { phone: true, email: true, kakao: false } };
const draft = quickSeed({ sessionId: 'opaque-test', destinationId: 'ha-noi', source: 'hero', route: '/destinations/ha-noi', travelers: '2' });
const valid = { ...draft, name: '김민수', phone: '010-1234-5678', acceptedPolicy: 'test-only' };
const errors = (patch = {}) => validateConsultation({ ...valid, ...patch }, config, today);
const build = (patch = {}, policy = fixturePolicy) => buildConsultationPayload({ ...valid, ...patch }, { config: policy, locale: 'ko', today });
const cases = {
  'M01 canonical ID': () => assert.equal(resolveCanonicalDestinationId('ha-noi'), 'ha-noi'),
  'M02 alias and event guard': () => {
    assert.equal(resolveCanonicalDestinationId({ destinationSlug: 'hanoi' }), 'ha-noi');
    assert.equal(resolveCanonicalDestinationId({ nativeEvent: {}, destinationId: 'ha-noi' }), '');
  },
  'M03 empty name': () => assert.equal(errors({ name: ' ' }).name, 'name'),
  'M04 Hangul name': () => assert.deepEqual(errors(), {}),
  'M05 Latin name': () => assert.deepEqual(errors({ name: "Lee Min-su O’Neil" }), {}),
  'M06 NFC and controls': () => {
    assert.equal(build({ name: '  Jose\u0301  ' }).payload.traveler.name, 'José');
    assert.equal(errors({ name: 'Kim\u0000' }).name, 'name');
  },
  'M07 domestic phone': () => {
    for (const value of ['01012345678', ' 010-1234-5678 ']) assert.equal(normalizeKoreanMobile(value), '+821012345678');
  },
  'M08 international phone': () => {
    for (const value of ['+821012345678', '+82 10 1234 5678']) assert.equal(normalizeKoreanMobile(value), '+821012345678');
  },
  'M09 duplicate/trunk/conflicting prefix': () => {
    for (const value of ['+82+821012345678', '+8201012345678', '+841012345678']) assert.equal(normalizeKoreanMobile(value), null);
  },
  'M10 invalid phone characters': () => assert.equal(normalizeKoreanMobile('010abc-1234-5678'), null),
  'M11 invalid phone length': () => {
    for (const value of ['01012345', '010123456789']) assert.equal(normalizeKoreanMobile(value), null);
  },
  'M12 email': () => {
    assert.equal(errors({ method: 'email', email: 'missing-at' }).contact, 'email');
    assert.deepEqual(errors({ method: 'email', email: ' a+b@example.test ' }), {});
  },
  'M13 selected contact only': () => assert.deepEqual(build({ method: 'email', email: ' a@example.test ' }).payload.traveler.contact,
    { method: 'email', value: 'a@example.test' }),
  'M14 no Zalo': () => assert.equal(errors({ method: 'zalo' }).contact, 'method'),
  'M15 Kakao gate and ordering': () => {
    assert.deepEqual(enabledMethods(config), ['phone', 'email']);
    assert.equal(enabledMethods({ verified: { kakao: true } })[0], 'kakao');
  },
  'M16 undecided ignores stale date': () => assert.deepEqual(build({ departure: { status: 'undecided', date: today } }).payload.trip.departure,
    { status: 'undecided', date: null }),
  'M17 exact date': () => assert.equal(build({ departure: { status: 'exact', date: today } }).payload.trip.departure.date, today),
  'M18 past and impossible dates': () => {
    for (const date of ['2026-11-26', '2027-02-29']) assert.equal(errors({ departure: { status: 'exact', date } }).date, 'date');
  },
  'M19 Seoul day rollover': () => assert.equal(seoulToday(new Date('2026-11-26T15:00:00Z')), today),
  'M20 undecided duration': () => assert.deepEqual(build().payload.trip.duration, { status: 'undecided', days: null }),
  'M21 invalid duration': () => assert.equal(errors({ duration: { status: 'fixed', days: 3.5 } }).duration, 'duration'),
  'M22 adult minimum': () => assert.equal(errors({ guests: { adults: 0, children: 0 } }).guests, 'guests'),
  'M23 child minimum': () => assert.equal(errors({ guests: { adults: 2, children: -1 } }).guests, 'guests'),
  'M24 invalid counts': () => {
    for (const adults of [NaN, 1.25, 1000, '2']) assert.equal(errors({ guests: { adults, children: 0 } }).guests, 'guests');
  },
  'M25 edited prefill and conflict': () => {
    const previous = { ...valid, duration: { status: 'fixed', days: 5 }, edited: { duration: true } };
    const options = { itinerary: { id: 'sample', days: 3 } };
    const next = quickSeed({ ...draft, sessionId: 'second', source: 'destination-header' }, options);
    assert.equal(resumeQuickDraft(previous, next).duration.days, 5);
    assert.equal(resumeQuickDraft(previous, next, options).pending.duration.days, 3);
  },
  'M26 independent seeds / reject foreign snapshot': () => {
    const seed = quickSeed({ ...draft, sessionId: 'second', source: 'destination-header', travelers: '3-5' }, {
      tripSnapshot: { destinationId: 'da-nang', duration: { days: 9 }, guests: { adults: 7, children: 2 } },
    });
    assert.equal(seed.name, '');
    assert.equal(seed.duration.days, null);
    assert.equal(seed.legacyGroup, '3-5');
    assert.deepEqual(seed.guests, { adults: 2, children: 0 });
  },
  'M27 versioned payload': () => assert.equal(build().payload.schemaVersion, 1),
  'M28 source stable across resume': () => {
    const resumed = resumeQuickDraft(valid, { ...draft, latestSource: 'destination-header' });
    assert.equal(resumed.entry.source, 'hero');
    assert.equal(resumed.latestSource, 'destination-header');
    assert.equal(build(resumed).payload.entry.route, '/destinations/ha-noi');
  },
  'M29 policy and verification guards': () => {
    assert.equal(build({}, config).status, 'unavailable');
    assert.equal(build({ acceptedPolicy: 'old' }).status, 'unavailable');
    assert.equal(build({}, { ...fixturePolicy, verified: config.verified }).status, 'unavailable');
  },
  'M30 unavailable boundary': () => assert.deepEqual(submitConsultation(build().payload), { status: 'unavailable' }),
};

Object.entries(cases).forEach(([name, run]) => test(name, run));
