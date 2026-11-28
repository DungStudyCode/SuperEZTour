import type { FastifyInstance } from 'fastify';
import type { Pool } from 'pg';
import { databaseReady } from '../../database/pool.ts';
import { ApiError } from '../../shared/errors.ts';
import { errorSchema } from '../../shared/contracts.ts';

const statusSchema = (status: string) => ({
  type: 'object', additionalProperties: false, required: ['status'],
  properties: { status: { type: 'string', const: status } },
});

export function registerHealthRoutes(app: FastifyInstance, pool: Pool) {
  app.get('/health/live', { schema: { response: { 200: statusSchema('live') } } }, async () => ({ status: 'live' }));
  app.get('/health/ready', { schema: { response: { 200: statusSchema('ready'), 503: errorSchema } } }, async () => {
    if (!await databaseReady(pool)) throw new ApiError(503, 'DATABASE_UNAVAILABLE');
    return { status: 'ready' };
  });
}
