import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { loadConfig } from '../../src/config/env.ts';
import type { LeadRequest } from '../../src/modules/leads/validation.ts';

const fixture = readFileSync(new URL(import.meta.resolve('@superez/contracts/consultation/v1/synthetic.json')), 'utf8');
export const synthetic = () => JSON.parse(fixture) as LeadRequest;
export const attempt = () => randomUUID();
export const testConfig = (url = 'postgresql://synthetic@127.0.0.1:1/superez_lead_test', override: NodeJS.ProcessEnv = {}) =>
  loadConfig({
    NODE_ENV: 'test', DATABASE_URL: url, LEAD_INTAKE_ENABLED: 'true',
    LEAD_POLICY_VERSION: 'synthetic-v1', LEAD_ALLOWED_CONTACT_METHODS: 'phone,email',
    LEAD_DIGEST_KEY: 'synthetic-local-test-only-key-000000', LEAD_RATE_MAX: '1000', OPENAPI_ENABLED: 'true',
    ...override,
  });
