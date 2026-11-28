import { Pool } from 'pg';
import type { PoolClient } from 'pg';
import type { Config } from '../config/env.ts';

export function createPool(config: Config, onIdleError: () => void) {
  const pool = new Pool(config.database);
  pool.on('error', onIdleError);
  return pool;
}

export async function transaction<T>(pool: Pool, execute: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  let discard = false;
  try {
    await client.query('BEGIN ISOLATION LEVEL READ COMMITTED');
    const result = await execute(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    try { await client.query('ROLLBACK'); } catch { discard = true; }
    throw error;
  } finally {
    client.release(discard);
  }
}

export async function databaseReady(pool: Pool) {
  const { rows } = await pool.query<{ ready: boolean }>(
    "SELECT to_regclass('superez_leads.leads') IS NOT NULL AND to_regclass('superez_leads.notification_outbox') IS NOT NULL AS ready",
  );
  return rows[0]?.ready === true;
}
