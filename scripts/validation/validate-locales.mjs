import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const localesBase = fs.existsSync(path.join(rootDir, 'apps/web/src/locales'))
  ? path.join(rootDir, 'apps/web/src/locales')
  : path.join(rootDir, 'src/locales');

const pairs = [
  {
    label: 'Global UI (ko.json <-> vi.json)',
    koPath: path.join(localesBase, 'ko.json'),
    viPath: path.join(localesBase, 'vi.json'),
  },
  {
    label: 'Da Nang Destination (da-nang/ko.json <-> da-nang/vi.json)',
    koPath: path.join(localesBase, 'destinations/da-nang/ko.json'),
    viPath: path.join(localesBase, 'destinations/da-nang/vi.json'),
  },
];

function compareObjects(koObj, viObj, curPath = '', state) {
  for (const key of Object.keys(koObj)) {
    const nextPath = curPath ? `${curPath}.${key}` : key;
    state.totalKeys += 1;
    if (!(key in viObj)) {
      state.missingInVi.push(nextPath);
      continue;
    }
    const koVal = koObj[key];
    const viVal = viObj[key];

    if (typeof koVal === 'string') {
      if (!koVal.trim()) state.emptyInKo.push(nextPath);
      if (typeof viVal !== 'string') state.typeMismatches.push(`${nextPath} (expected string)`);
      else if (!viVal.trim()) state.emptyInVi.push(nextPath);
    } else if (Array.isArray(koVal)) {
      if (!Array.isArray(viVal)) {
        state.typeMismatches.push(`${nextPath} (expected Array)`);
      } else if (koVal.length !== viVal.length) {
        state.typeMismatches.push(`${nextPath} (Array length KO=${koVal.length} vs VI=${viVal.length})`);
      } else {
        koVal.forEach((item, idx) => {
          if (item && typeof item === 'object') {
            compareObjects(item, viVal[idx], `${nextPath}[${idx}]`, state);
          } else if (typeof item === 'string') {
            if (!item.trim()) state.emptyInKo.push(`${nextPath}[${idx}]`);
            if (typeof viVal[idx] !== 'string' || !viVal[idx].trim()) state.emptyInVi.push(`${nextPath}[${idx}]`);
          }
        });
      }
    } else if (koVal && typeof koVal === 'object') {
      if (!viVal || typeof viVal !== 'object' || Array.isArray(viVal)) {
        state.typeMismatches.push(`${nextPath} (expected Object)`);
      } else {
        compareObjects(koVal, viVal, nextPath, state);
      }
    }
  }

  for (const key of Object.keys(viObj)) {
    const nextPath = curPath ? `${curPath}.${key}` : key;
    if (!(key in koObj)) state.missingInKo.push(nextPath);
  }
}

let hasFailure = false;
for (const pair of pairs) {
  const ko = JSON.parse(fs.readFileSync(pair.koPath, 'utf8'));
  const vi = JSON.parse(fs.readFileSync(pair.viPath, 'utf8'));
  const state = { totalKeys: 0, missingInVi: [], missingInKo: [], emptyInKo: [], emptyInVi: [], typeMismatches: [] };
  compareObjects(ko, vi, '', state);

  const ok =
    state.missingInVi.length === 0 &&
    state.missingInKo.length === 0 &&
    state.emptyInKo.length === 0 &&
    state.emptyInVi.length === 0 &&
    state.typeMismatches.length === 0;

  console.log(`[Locale Parity] ${pair.label}: ${state.totalKeys} keys -> ${ok ? 'PASS' : 'FAIL'}`);
  if (!ok) {
    hasFailure = true;
    console.error({
      missingInVi: state.missingInVi.slice(0, 10),
      missingInKo: state.missingInKo.slice(0, 10),
      emptyInKo: state.emptyInKo.slice(0, 10),
      emptyInVi: state.emptyInVi.slice(0, 10),
      typeMismatches: state.typeMismatches.slice(0, 10),
    });
  }
}

if (hasFailure) process.exit(1);
