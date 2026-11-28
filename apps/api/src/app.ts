import { randomUUID } from 'node:crypto';
import Fastify, { LogController } from 'fastify';
import type { FastifyError } from 'fastify';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import type { Pool } from 'pg';
import type { Config } from './config/env.ts';
import { createPool } from './database/pool.ts';
import { registerHealthRoutes } from './modules/health/routes.ts';
import { registerLeadRoutes } from './modules/leads/routes.ts';
import { ApiError, databaseError } from './shared/errors.ts';

export async function buildApp(config: Config, options: { pool?: Pool; now?: () => Date; logStream?: { write(line: string): unknown } } = {}) {
  const app = Fastify({
    logger: options.logStream ? { stream: options.logStream } : true,
    logController: new LogController({ disableRequestLogging: true }),
    trustProxy: false,
    requestIdHeader: false,
    genReqId: () => randomUUID(),
    bodyLimit: config.bodyLimit,
    ajv: { customOptions: { removeAdditional: false, coerceTypes: false, useDefaults: false, allErrors: false } },
  });
  const pool = options.pool ?? createPool(config, () => app.log.warn({ code: 'DB_IDLE_ERROR' }, 'Database connection interrupted'));
  if (!options.pool) app.addHook('onClose', async () => { await pool.end(); });
  const now = options.now ?? (() => new Date());

  app.addHook('onRequest', async (request, reply) => {
    reply.header('X-Request-Id', request.id).header('Cache-Control', 'no-store');
  });
  app.addHook('onResponse', async (request, reply) => {
    app.log.info({
      requestId: request.id, route: request.routeOptions.url ?? 'unmatched',
      method: request.method, status: reply.statusCode, elapsedMs: Math.round(reply.elapsedTime),
    }, 'Request finished');
  });

  app.setErrorHandler<FastifyError>((error, request, reply) => {
    let issue: ApiError;
    if (error instanceof ApiError) issue = error;
    else if (error.code === 'FST_ERR_CTP_BODY_TOO_LARGE') issue = new ApiError(413, 'BODY_TOO_LARGE');
    else if (error.code === 'FST_ERR_CTP_INVALID_MEDIA_TYPE') issue = new ApiError(415, 'UNSUPPORTED_CONTENT_TYPE');
    else if (error.statusCode === 429) issue = new ApiError(429, 'RATE_LIMITED');
    else if (error.validation) {
      const version = error.validation.some((item) => item.instancePath === '/schemaVersion');
      issue = new ApiError(version || error.validationContext === 'headers' ? 400 : 422,
        version ? 'UNSUPPORTED_SCHEMA_VERSION' : error.validationContext === 'headers' ? 'INVALID_IDEMPOTENCY_KEY' : 'VALIDATION_FAILED',
        error.validation.map((item) => ({
          path: item.instancePath.replace(/^\//, '').replace(/\//g, '.') || 'request',
          code: 'SCHEMA_MISMATCH',
        })));
    } else if (error.statusCode === 400) issue = new ApiError(400, 'MALFORMED_REQUEST');
    else if (databaseError(error)) issue = new ApiError(503, 'DATABASE_UNAVAILABLE');
    else issue = new ApiError(500, 'INTERNAL_ERROR');
    if (issue.status === 503) reply.header('Retry-After', '5');
    if (issue.status >= 500) app.log.warn({ requestId: request.id, code: issue.code }, 'Request failed');
    return reply.code(issue.status).send({ error: { code: issue.code, requestId: request.id, fields: issue.fields } });
  });
  app.setNotFoundHandler((request, reply) => reply.code(404).send({ error: { code: 'NOT_FOUND', requestId: request.id, fields: [] } }));

  if (config.docs && config.mode !== 'production') {
    await app.register(swagger, { openapi: { info: { title: 'Super EZ Tour Lead API', version: '1.0.0' } } });
    await app.register(swaggerUI, { routePrefix: '/docs' });
  }
  await app.register(rateLimit, { global: false });

  registerHealthRoutes(app, pool);
  registerLeadRoutes(app, pool, config, now);

  return app;
}
