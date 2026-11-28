import type { Pool } from 'pg';
import type { Config } from '../../config/env.ts';
import { databaseReady } from '../../database/pool.ts';
import { ApiError } from '../../shared/errors.ts';
import { persistLead } from './repository.ts';
import { canonicalize, payloadDigest } from './validation.ts';
import type { LeadRequest } from './validation.ts';

export async function createLead(pool: Pool, config: Config, body: LeadRequest, attempt: string, now: Date) {
  const input = canonicalize(body, config);
  if (!await databaseReady(pool)) throw new ApiError(503, 'DATABASE_UNAVAILABLE');
  const result = await persistLead(pool, input, attempt, payloadDigest(input, config.digestKey), now);
  if (result.kind === 'conflict') throw new ApiError(409, 'IDEMPOTENCY_CONFLICT');
  if (result.kind === 'past-departure') {
    throw new ApiError(422, 'VALIDATION_FAILED', [{ path: 'trip.departure.date', code: 'INVALID_DEPARTURE' }]);
  }
  return result;
}
