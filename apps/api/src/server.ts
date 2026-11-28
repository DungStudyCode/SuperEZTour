import { buildApp } from './app.ts';
import { loadConfig } from './config/env.ts';

try {
  const config = loadConfig(process.env);
  const app = await buildApp(config);
  try { await app.listen({ host: config.host, port: config.port }); }
  catch (error) { await app.close(); throw error; }
  let stopping = false;
  const stop = async () => {
    if (stopping) return;
    stopping = true;
    try { await app.close(); }
    catch { process.stderr.write('Backend shutdown failed\n'); process.exitCode = 1; }
  };
  process.once('SIGTERM', stop);
  process.once('SIGINT', stop);
} catch {
  process.stderr.write('Backend startup failed. Check backend-only environment settings and listener availability.\n');
  process.exitCode = 1;
}
