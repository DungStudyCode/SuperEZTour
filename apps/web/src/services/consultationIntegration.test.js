import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isReceipt, retryAt, submitConsultationAttempt } from './consultationApiService.js';
import { createConsultationAttempts } from './consultationAttempts.js';
import { syntheticPolicy } from './consultationIntake.js';

const valid = { reference: `SEZ-${'A'.repeat(32)}`, receivedAt: '2026-11-28T04:00:00.000Z', status: 'received' };
const snapshot = { key: 'synthetic-test-attempt', body: '{"requestId":"draft"}' };
const response = (body, status, headers = {}) => new Response(JSON.stringify(body), {
  status, headers: { 'Content-Type': 'application/json', ...headers },
});
const issue = (code, fields = []) => ({ error: { code, requestId: 'synthetic-correlation', fields } });

test('receipt requires the exact v1 shape, reference and calendar timestamp', () => {
  assert.ok(isReceipt(valid));
  for (const body of [null, {}, { ...valid, reference: 'SEZ-123' }, { ...valid, status: 'ok' },
    { ...valid, receivedAt: '2026-02-29T04:00:00Z' }, { ...valid, receivedAt: '2026-01-01T24:00:00Z' },
    { ...valid, contact: 'extra' }]) assert.equal(isReceipt(body), false);
});

test('same-origin POST sends the opaque header and exact bytes, accepts only 201/200', async () => {
  for (const status of [200, 201]) {
    const result = await submitConsultationAttempt(snapshot, { fetcher: async (url, options) => {
      assert.equal(url, '/api/v1/leads');
      assert.equal(options.method, 'POST');
      assert.equal(options.headers['Idempotency-Key'], snapshot.key);
      assert.equal(options.body, snapshot.body);
      return response(valid, status);
    } });
    assert.deepEqual(result, { state: 'success', receipt: valid });
  }
  const other = await submitConsultationAttempt(snapshot, { fetcher: async () => response(valid, 202) });
  assert.equal(other.state, 'unknown');
});

test('backend error classes require the actual status/code pair and safe JSON', async () => {
  const cases = [
    [400, 'MALFORMED_REQUEST', 'rejected'], [409, 'IDEMPOTENCY_CONFLICT', 'conflict'],
    [413, 'BODY_TOO_LARGE', 'rejected'], [415, 'UNSUPPORTED_CONTENT_TYPE', 'rejected'],
    [422, 'VALIDATION_FAILED', 'validation'], [429, 'RATE_LIMITED', 'limited'],
    [503, 'DATABASE_UNAVAILABLE', 'unavailable'], [500, 'INTERNAL_ERROR', 'unknown'],
    [422, 'INTERNAL_ERROR', 'unknown'],
  ];
  for (const [status, code, state] of cases) {
    const result = await submitConsultationAttempt(snapshot, {
      fetcher: async () => response(issue(code), status, { 'Retry-After': '3' }), now: () => 1000,
    });
    assert.equal(result.state, state);
    if (state === 'limited') assert.equal(result.retryAt, 4000);
  }
  const html = await submitConsultationAttempt(snapshot, { fetcher: async () => new Response('<html/>', { status: 503 }) });
  assert.equal(html.state, 'unknown');
  const malformed = await submitConsultationAttempt(snapshot, {
    fetcher: async () => new Response('{', { status: 200, headers: { 'Content-Type': 'application/json' } }),
  });
  assert.equal(malformed.state, 'unknown');
});

test('network errors and timeout may have committed; no automatic transport retry', async () => {
  let calls = 0;
  const result = await submitConsultationAttempt(snapshot, {
    timeoutMs: 5,
    fetcher: async (_url, { signal }) => {
      calls++;
      return new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true }));
    },
  });
  assert.equal(result.state, 'unknown');
  assert.equal(calls, 1);
  const offline = await submitConsultationAttempt(snapshot, { fetcher: async () => { throw Error('offline'); } });
  assert.equal(offline.state, 'unknown');
  assert.equal(retryAt('Thu, 01 Jan 1970 00:00:05 GMT', 1000), 5000);
  assert.equal(retryAt('invalid', 1000), 1000);
});

test('synchronous duplicate blocked; retry keeps original bytes; success releases snapshot', async () => {
  const changes = [], accepted = [], calls = [];
  let release;
  const coordinator = createConsultationAttempts({
    publish: (id, value) => changes.push([id, value]), accepted: (...args) => accepted.push(args),
    key: () => 'attempt-1',
    transport: async (value) => { calls.push(value); return new Promise((resolve) => { release = resolve; }); },
  });
  const payload = { requestId: 'draft-1', entry: { locale: 'ko' } };
  const first = coordinator.submit('ha-noi', payload);
  assert.equal(coordinator.submit('ha-noi', payload), undefined);
  assert.equal(coordinator.reset('ha-noi'), false);
  assert.equal(coordinator.canEdit('ha-noi'), false);
  payload.entry.locale = 'vi';
  release({ state: 'unknown' });
  await first;
  const again = coordinator.retry('ha-noi');
  assert.equal(calls[0].key, calls[1].key);
  assert.equal(calls[0].body, calls[1].body);
  assert.equal(JSON.parse(calls[1].body).entry.locale, 'ko');
  release({ state: 'success', receipt: valid });
  await again;
  assert.deepEqual(changes.at(-1), ['ha-noi', { state: 'success', receipt: valid }]);
  assert.deepEqual(accepted, [['ha-noi', 'draft-1']]);
  assert.equal(coordinator.retry('ha-noi'), undefined);
  assert.equal(coordinator.reset('ha-noi'), true);
});

test('definite validation creates a new key while uncertain retry rejection keeps the original', async () => {
  let index = 0, clock = 100;
  const states = [], calls = [];
  const server = [{ state: 'validation', fields: [] }, { state: 'limited', retryAt: 500 },
    { state: 'unknown' }, { state: 'validation', fields: [] }, { state: 'conflict' }];
  const controller = createConsultationAttempts({
    publish: (_id, value) => states.push(value?.state), accepted: () => assert.fail('Unexpected receipt'),
    key: () => String(++index), now: () => clock,
    transport: async (attempt) => { calls.push(attempt); return server.shift(); },
  });
  await controller.submit('ha-noi', { requestId: 'r', value: 1 });
  assert.equal(controller.canEdit('ha-noi'), true);
  await controller.submit('ha-noi', { requestId: 'r', value: 2 });
  assert.equal(controller.retry('ha-noi'), undefined);
  clock = 500;
  await controller.retry('ha-noi');
  await controller.retry('ha-noi');
  await controller.retry('ha-noi');
  assert.deepEqual(states.filter((state) => state !== 'submitting'), ['validation', 'limited', 'unknown', 'unknown', 'conflict']);
  assert.deepEqual(calls.map(({ key }) => key), ['1', '2', '2', '2', '2']);
  assert.equal(controller.retry('ha-noi'), undefined);
});

test('intake is Hanoi-only and fails closed on build, source, and policy', () => {
  const entry = { destinationId: 'ha-noi', source: 'hero', route: '/destinations/ha-noi' };
  const draft = { destinationId: 'ha-noi', entry };
  const env = { DEV: true, VITE_HANOI_SYNTHETIC_INTAKE: 'true', VITE_HANOI_SYNTHETIC_POLICY: 'synthetic-v1', VITE_HANOI_SYNTHETIC_CONTACT_METHODS: 'phone,email' };
  assert.ok(syntheticPolicy(draft, entry, env));
  assert.equal(syntheticPolicy(draft, entry, { ...env, DEV: false }), null);
  assert.equal(syntheticPolicy(draft, { ...entry, route: '/' }, env), null);
  assert.equal(syntheticPolicy({ ...draft, entry: { ...entry, route: '/' } }, entry, env), null);
  assert.equal(syntheticPolicy(draft, { ...entry, source: 'navbar' }, env), null);
  assert.equal(syntheticPolicy(draft, entry, { ...env, VITE_HANOI_SYNTHETIC_CONTACT_METHODS: 'kakao' }), null);
});
