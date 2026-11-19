import fs from 'fs';
import { DA_NANG_CONFIG } from '../src/features/destinations/data/da-nang.config.js';

const auditResults = [];

function extractStrings(obj, path = 'destinations.daNang') {
  for (const [key, value] of Object.entries(obj)) {
    const curPath = `${path}.${key}`;
    if (typeof value === 'string') {
      // Ignore URLs, IDs, slugs, technical tokens
      if (
        key === 'id' || key === 'slug' || key === 'countryCode' || key === 'locale' ||
        key === 'icon' || key === 'category' || key === 'type' || key === 'image' ||
        key === 'posterImage' || key === 'modelCode' || key === 'avatar' ||
        key === 'flightNumber' || key === 'coords' || key === 'lat' || key === 'lng' ||
        value.startsWith('http') || value.startsWith('/') || value.startsWith('#') ||
        /^[0-9.+°C\s%-]+$/.test(value)
      ) {
        continue;
      }

      auditResults.push({
        path: curPath,
        key,
        ko: value,
        isHangul: /[\uac00-\ud7af]/.test(value)
      });
    } else if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        if (typeof item === 'string') {
          if (!item.startsWith('http') && !item.startsWith('/') && !item.startsWith('#')) {
            auditResults.push({
              path: `${curPath}[${idx}]`,
              key: `${key}_${idx}`,
              ko: item,
              isHangul: /[\uac00-\ud7af]/.test(item)
            });
          }
        } else if (typeof item === 'object' && item !== null) {
          extractStrings(item, `${curPath}[${idx}]`);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      extractStrings(value, curPath);
    }
  }
}

extractStrings(DA_NANG_CONFIG);

console.log(`Total text entries extracted: ${auditResults.length}`);
console.log(`Hangul entries: ${auditResults.filter(r => r.isHangul).length}`);
console.log(`Non-Hangul entries (English/brands): ${auditResults.filter(r => !r.isHangul).length}`);

// Group by top-level section
const groups = {};
auditResults.forEach(r => {
  const section = r.path.split('.')[2] || 'general';
  if (!groups[section]) groups[section] = [];
  groups[section].push(r);
});

console.log('\n--- Sections breakdown ---');
for (const [sec, items] of Object.entries(groups)) {
  console.log(`  * ${sec.padEnd(25)}: ${items.length} strings`);
}

fs.writeFileSync('scratch/audit_extracted_strings.json', JSON.stringify(auditResults, null, 2));
console.log('\nSaved full audit to scratch/audit_extracted_strings.json');
