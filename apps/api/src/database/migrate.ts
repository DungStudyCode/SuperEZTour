import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import type { Pool } from 'pg';
import { loadConfig } from '../config/env.ts';
import { createPool, transaction } from './pool.ts';

export async function migrate(pool: Pool) {
  const folder = new URL('../../migrations/', import.meta.url);
  const names = (await readdir(folder)).filter((name) => /^\d{3}_[a-z0-9_]+\.sql$/.test(name)).sort();
  if (!names.length || new Set(names.map((name) => name.slice(0, 3))).size !== names.length) {
    throw new Error('Missing or duplicated migration version');
  }
  return transaction(pool, async (client) => {
    await client.query("SELECT pg_advisory_xact_lock(hashtextextended('superez-leads-migrations', 0))");
    await client.query(`
      CREATE SCHEMA IF NOT EXISTS superez_leads;
      REVOKE ALL ON SCHEMA superez_leads FROM PUBLIC;
      CREATE TABLE IF NOT EXISTS superez_leads.migration_history (
        name text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT clock_timestamp()
      );
    `);
    const { rows } = await client.query<{ name: string; checksum: string }>(
      'SELECT name, checksum FROM superez_leads.migration_history ORDER BY name',
    );
    if (rows.some((row, index) => names[index] !== row.name)) throw new Error('Applied migrations must be an unchanged prefix');
    const applied = new Map(rows.map((row) => [row.name, row.checksum]));
    const executed: string[] = [];
    for (const name of names) {
      const sql = await readFile(new URL(name, folder), 'utf8');
      const checksum = createHash('sha256').update(sql.replace(/\r\n/g, '\n')).digest('hex');
      if (applied.has(name)) {
        if (applied.get(name) !== checksum) throw new Error('Applied migration checksum mismatch');
        continue;
      }
      await client.query(sql);
      await client.query('INSERT INTO superez_leads.migration_history (name, checksum) VALUES ($1,$2)', [name, checksum]);
      executed.push(name);
    }
    return executed;
  });
}

if (import.meta.main) {
  let pool: Pool | undefined;
  try {
    pool = createPool(loadConfig(process.env, true), () => process.stderr.write('Migration connection error\n'));
    const applied = await migrate(pool);
    process.stdout.write(`Applied migrations: ${applied.join(', ') || 'none'}\n`);
  } catch {
    process.stderr.write('Migration failed. Check isolated database access, migration order and checksums.\n');
    process.exitCode = 1;
  } finally {
    await pool?.end();
  }
}
