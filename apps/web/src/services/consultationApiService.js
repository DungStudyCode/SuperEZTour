import receiptSchema from '@superez/contracts/consultation/v1/receipt.schema.json' with { type: 'json' };
import errorSchema from '@superez/contracts/consultation/v1/error.schema.json' with { type: 'json' };

const receiptPattern = new RegExp(receiptSchema.properties.reference.pattern);
const timestampPattern = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
const rejectedCodes = new Map([
  [400, ['MALFORMED_REQUEST', 'UNSUPPORTED_SCHEMA_VERSION', 'INVALID_IDEMPOTENCY_KEY']],
  [413, ['BODY_TOO_LARGE']], [415, ['UNSUPPORTED_CONTENT_TYPE']],
]);

function exactKeys(value, schema) {
  return value && typeof value === 'object' && !Array.isArray(value)
    && schema.required.every((key) => Object.hasOwn(value, key))
    && Object.keys(value).every((key) => Object.hasOwn(schema.properties, key));
}

export function isReceipt(body) {
  if (!exactKeys(body, receiptSchema) || typeof body.reference !== 'string' || !receiptPattern.test(body.reference)
    || !receiptSchema.properties.status.enum.includes(body.status) || typeof body.receivedAt !== 'string') return false;
  const match = timestampPattern.exec(body.receivedAt);
  if (!match || Number(match[2]) > 23 || Number(match[3]) > 59 || Number(match[4]) > 59
    || !Number.isFinite(Date.parse(body.receivedAt))) return false;
  const date = new Date(`${match[1]}T00:00:00Z`);
  return Number.isFinite(+date) && date.toISOString().slice(0, 10) === match[1];
}

export function retryAt(value, now) {
  if (!value) return now;
  const target = /^\d+$/.test(value) ? now + Number(value) * 1000 : Date.parse(value);
  return Number.isFinite(target) ? Math.max(now, target) : now;
}

function knownError(body) {
  const schema = errorSchema.properties.error;
  if (!exactKeys(body, errorSchema) || !exactKeys(body.error, schema)) return null;
  const { code, requestId, fields } = body.error;
  if (typeof code !== 'string' || !/^[A-Z0-9_]{1,64}$/.test(code)
      || typeof requestId !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(requestId)
      || !Array.isArray(fields) || fields.length > 32
      || !fields.every((field) => exactKeys(field, schema.properties.fields.items)
        && typeof field.path === 'string' && typeof field.code === 'string')) return null;
  return body.error;
}

// The caller owns attempts and retries. This function sends exactly one request.
export async function submitConsultationAttempt(attempt, { fetcher = fetch, timeoutMs = 15000, now = Date.now } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetcher('/api/v1/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': attempt.key },
      body: attempt.body,
      credentials: 'same-origin',
      cache: 'no-store',
      redirect: 'error',
      signal: controller.signal,
    });
    if (response.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return { state: 'unknown' };
    const body = await response.json();
    if (response.status === 201 || response.status === 200) {
      return isReceipt(body) ? { state: 'success', receipt: body } : { state: 'unknown' };
    }
    const error = knownError(body);
    if (!error) return { state: 'unknown' };
    const { code, requestId, fields } = error;
    if (response.status === 422 && code === 'VALIDATION_FAILED') return { state: 'validation', fields, requestId };
    if (response.status === 409 && code === 'IDEMPOTENCY_CONFLICT') return { state: 'conflict', requestId };
    if (response.status === 429 && code === 'RATE_LIMITED') {
      return { state: 'limited', retryAt: retryAt(response.headers.get('retry-after'), now()), requestId };
    }
    if (response.status === 503 && ['INTAKE_UNAVAILABLE', 'DATABASE_UNAVAILABLE'].includes(code)) {
      return { state: 'unavailable', requestId };
    }
    if (rejectedCodes.get(response.status)?.includes(code)) return { state: 'rejected', requestId };
    return { state: 'unknown', requestId };
  } catch {
    return { state: 'unknown' };
  } finally {
    clearTimeout(timer);
  }
}
