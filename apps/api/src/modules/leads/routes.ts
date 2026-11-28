import type { FastifyInstance } from 'fastify';
import type { Pool } from 'pg';
import type { Config } from '../../config/env.ts';
import { contract, errorSchema } from '../../shared/contracts.ts';
import { ApiError } from '../../shared/errors.ts';
import { createLead } from './service.ts';
import type { LeadRequest } from './validation.ts';

const receiptSchema = contract('receipt.schema');
const requestSchema = { ...contract('request.schema'), examples: [contract('synthetic')] };

export function registerLeadRoutes(app: FastifyInstance, pool: Pool, config: Config, now: () => Date) {
  app.post<{ Body: LeadRequest; Headers: { 'idempotency-key': string } }>('/api/v1/leads', {
    config: { rateLimit: { max: config.rateMax, timeWindow: config.rateWindow } },
    schema: {
      description: 'Accept a synthetic consultation in an isolated environment. A replay returns the original receipt.',
      headers: {
        type: 'object', required: ['idempotency-key'],
        properties: { 'idempotency-key': { type: 'string', pattern: '^[A-Za-z0-9_-]{16,128}$' } },
      },
      body: requestSchema,
      response: {
        201: receiptSchema, 200: receiptSchema,
        400: errorSchema, 409: errorSchema, 413: errorSchema, 415: errorSchema,
        422: errorSchema, 429: errorSchema, 500: errorSchema, 503: errorSchema,
      },
    },
    onRequest: async (request) => {
      if (!config.intake || config.mode === 'production') throw new ApiError(503, 'INTAKE_UNAVAILABLE');
      if (request.headers['content-type']?.split(';')[0]?.trim().toLowerCase() !== 'application/json') {
        throw new ApiError(415, 'UNSUPPORTED_CONTENT_TYPE');
      }
    },
  }, async (request, reply) => {
    const result = await createLead(pool, config, request.body, request.headers['idempotency-key'], now());
    return reply.code(result.kind === 'created' ? 201 : 200).send(result.receipt);
  });
}
