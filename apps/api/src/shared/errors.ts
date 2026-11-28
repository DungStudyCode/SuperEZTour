export interface FieldIssue { path: string; code: string }

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fields: FieldIssue[];

  constructor(status: number, code: string, fields: FieldIssue[] = []) {
    super(code);
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

export function databaseError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const code = 'code' in error ? String(error.code) : '';
  return /^(08|53|57P0)/.test(code)
    || ['ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT', 'ENOTFOUND', 'EPIPE', '57014'].includes(code)
    || /timeout|connection terminated/i.test(error.message);
}
