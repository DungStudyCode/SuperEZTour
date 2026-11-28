import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const contractsDir = fs.existsSync(path.join(rootDir, 'packages/contracts/consultation/v1'))
  ? path.join(rootDir, 'packages/contracts/consultation/v1')
  : path.join(rootDir, 'contracts/consultation/v1');

const requiredFiles = ['request.schema.json', 'receipt.schema.json', 'error.schema.json', 'synthetic.json'];
for (const file of requiredFiles) {
  const fullPath = path.join(contractsDir, file);
  assert.ok(fs.existsSync(fullPath), `Missing contract file: ${fullPath}`);
}

const requestSchema = JSON.parse(fs.readFileSync(path.join(contractsDir, 'request.schema.json'), 'utf8'));
const receiptSchema = JSON.parse(fs.readFileSync(path.join(contractsDir, 'receipt.schema.json'), 'utf8'));
const errorSchema = JSON.parse(fs.readFileSync(path.join(contractsDir, 'error.schema.json'), 'utf8'));
const synthetic = JSON.parse(fs.readFileSync(path.join(contractsDir, 'synthetic.json'), 'utf8'));

assert.equal(requestSchema.additionalProperties, false, 'request.schema.json must forbid additionalProperties');
assert.equal(requestSchema.properties.schemaVersion.const, 1, 'schemaVersion const must equal 1');
assert.equal(receiptSchema.additionalProperties, false, 'receipt.schema.json must forbid additionalProperties');
assert.equal(errorSchema.additionalProperties, false, 'error.schema.json must forbid additionalProperties');

// Validate synthetic fixture conforms to request.schema.json required top-level & nested keys
for (const key of requestSchema.required) {
  assert.ok(Object.hasOwn(synthetic, key), `synthetic.json missing required key: ${key}`);
}
for (const key of Object.keys(synthetic)) {
  assert.ok(Object.hasOwn(requestSchema.properties, key), `synthetic.json contains undeclared key: ${key}`);
}
assert.equal(synthetic.schemaVersion, 1);
assert.equal(synthetic.privacy.accepted, true);

console.log(`[Contract Validation] Verified ${requiredFiles.length} v1 contract artifacts in ${path.relative(rootDir, contractsDir)} -> PASS`);
