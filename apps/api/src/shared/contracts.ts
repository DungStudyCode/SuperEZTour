import { readFileSync } from 'node:fs';

export function contract(name: 'error.schema' | 'receipt.schema' | 'request.schema' | 'synthetic') {
  const resolved = import.meta.resolve(`@superez/contracts/consultation/v1/${name}.json`);
  return JSON.parse(readFileSync(new URL(resolved), 'utf8')) as Record<string, unknown>;
}

export const errorSchema = contract('error.schema');
