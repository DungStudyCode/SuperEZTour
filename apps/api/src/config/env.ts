import { readFileSync } from 'node:fs';

const local = new Set(['localhost', '127.0.0.1', '[::1]', '::1']);
export const contactMethods = ['phone', 'email', 'kakao'] as const;
export type ContactMethod = typeof contactMethods[number];

export function loadConfig(env: NodeJS.ProcessEnv, migration = false) {
  const mode = env.NODE_ENV ?? 'development';
  if (!['development', 'test', 'production'].includes(mode)) throw new Error('Invalid NODE_ENV');
  const prod = mode === 'production';
  function flag(name: string) {
    const value = env[name] || 'false';
    if (!['true', 'false'].includes(value)) throw new Error(`Invalid ${name}`);
    return value === 'true';
  }
  function number(name: string, fallback: number, maximum: number) {
    const raw = env[name] || String(fallback);
    const value = Number(raw);
    if (!/^\d+$/.test(raw) || !Number.isInteger(value) || value < 1 || value > maximum) throw new Error(`Invalid ${name}`);
    return value;
  }
  const host = (env.HOST || '127.0.0.1').trim();
  if (!host || /\s|\p{Cc}/u.test(host)) throw new Error('Invalid HOST');
  const allowedOrigins = new Set(
    (env.ALLOWED_ORIGINS || '').split(',').map((item) => item.trim()).filter(Boolean),
  );
  for (const origin of allowedOrigins) {
    let parsedOrigin: URL;
    try { parsedOrigin = new URL(origin); } catch { throw new Error('Invalid ALLOWED_ORIGINS'); }
    if (!['http:', 'https:'].includes(parsedOrigin.protocol) || parsedOrigin.origin !== origin || (prod && parsedOrigin.protocol !== 'https:')) {
      throw new Error('Invalid ALLOWED_ORIGINS');
    }
  }
  const intake = flag('LEAD_INTAKE_ENABLED');
  const docs = flag('OPENAPI_ENABLED');
  const policy = env.LEAD_POLICY_VERSION || '';
  const digestKey = env.LEAD_DIGEST_KEY || '';
  const methods = new Set((env.LEAD_ALLOWED_CONTACT_METHODS || '').split(',').filter(Boolean));
  if ([...methods].some((method) => !contactMethods.includes(method as ContactMethod))) throw new Error('Invalid LEAD_ALLOWED_CONTACT_METHODS');
  if ((prod && (intake || docs || policy.startsWith('synthetic-'))) || ((intake || docs) && !local.has(host))) {
    throw new Error('Intake/docs mode is prohibited for this environment or binding');
  }
  if (intake && (!/^synthetic-[a-z0-9-]{1,60}$/.test(policy) || !methods.size || digestKey.length < 32 || methods.has('kakao'))) {
    throw new Error('Enabled synthetic intake requires policy, phone/email and a digest key of at least 32 characters');
  }
  const urlKey = migration ? 'MIGRATION_DATABASE_URL' : 'DATABASE_URL';
  const connectionString = env[urlKey];
  let url: URL;
  try {
    url = new URL(connectionString ?? '');
  } catch {
    throw new Error(`Invalid or missing ${urlKey}`);
  }
  if (!['postgres:', 'postgresql:'].includes(url.protocol) || !url.hostname || !url.username || !url.pathname.slice(1) || url.search || url.hash) {
    throw new Error(`Invalid ${urlKey}; use an explicit connection URL without query options`);
  }
  if (!prod && (!local.has(url.hostname) || url.pathname !== (mode === 'test' ? '/superez_lead_test' : '/superez_lead_dev'))) {
    throw new Error('Development and test require isolated local Super EZ Tour databases');
  }
  if (prod && (url.pathname === '/superez_lead_dev' || url.pathname === '/superez_lead_test')) throw new Error('Production cannot use a local synthetic database');
  const sslMode = env.DATABASE_SSL_MODE || (prod ? 'verify-full' : 'disable');
  if (!['disable', 'verify-full'].includes(sslMode) || (prod && sslMode !== 'verify-full')) throw new Error('Invalid DATABASE_SSL_MODE');
  const caFile = env.DATABASE_CA_FILE;
  let ca: string | undefined;
  if (caFile && sslMode === 'verify-full') {
    try { ca = readFileSync(caFile, 'utf8'); } catch { throw new Error('Cannot read DATABASE_CA_FILE'); }
  }
  return {
    mode, host, port: number('PORT', 3103, 65535), allowedOrigins, intake, docs, policy, methods, digestKey,
    rateMax: number('LEAD_RATE_MAX', 20, 1000),
    rateWindow: number('LEAD_RATE_WINDOW_MS', 60000, 3600000),
    bodyLimit: number('LEAD_BODY_LIMIT', 16384, 65536),
    database: {
      connectionString,
      ssl: sslMode === 'verify-full' ? { rejectUnauthorized: true, ca } : false as const,
      max: number('DATABASE_POOL_MAX', 5, 30),
      connectionTimeoutMillis: number('DATABASE_CONNECTION_TIMEOUT_MS', 2000, 15000),
      idleTimeoutMillis: 10000,
      statement_timeout: 5000,
      query_timeout: 6500,
    },
  };
}

export type Config = ReturnType<typeof loadConfig>;
