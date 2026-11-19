import fs from 'fs';

const ko = JSON.parse(fs.readFileSync('src/locales/destinations/da-nang/ko.json', 'utf8'));
const vi = JSON.parse(fs.readFileSync('src/locales/destinations/da-nang/vi.json', 'utf8'));

let missingInVi = [];
let missingInKo = [];
let emptyInVi = [];
let emptyInKo = [];
let totalKeys = 0;

function compareObjects(koObj, viObj, path = '') {
  const koKeys = Object.keys(koObj);
  const viKeys = Object.keys(viObj);

  for (const k of koKeys) {
    const curPath = path ? `${path}.${k}` : k;
    totalKeys++;

    if (!(k in viObj)) {
      missingInVi.push(curPath);
      continue;
    }

    const koVal = koObj[k];
    const viVal = viObj[k];

    if (typeof koVal === 'string') {
      if (!koVal.trim()) emptyInKo.push(curPath);
      if (typeof viVal !== 'string' || !viVal.trim()) emptyInVi.push(curPath);
    } else if (Array.isArray(koVal)) {
      if (!Array.isArray(viVal)) {
        missingInVi.push(`${curPath} (type mismatch: expected Array)`);
      } else if (koVal.length !== viVal.length) {
        missingInVi.push(`${curPath} (length mismatch: KO has ${koVal.length}, VI has ${viVal.length})`);
      } else {
        koVal.forEach((item, idx) => {
          if (typeof item === 'object' && item !== null) {
            compareObjects(item, viVal[idx], `${curPath}[${idx}]`);
          } else if (typeof item === 'string') {
            if (!item.trim()) emptyInKo.push(`${curPath}[${idx}]`);
            if (typeof viVal[idx] !== 'string' || !viVal[idx].trim()) emptyInVi.push(`${curPath}[${idx}]`);
          }
        });
      }
    } else if (typeof koVal === 'object' && koVal !== null) {
      if (typeof viVal !== 'object' || viVal === null) {
        missingInVi.push(`${curPath} (type mismatch: expected Object)`);
      } else {
        compareObjects(koVal, viVal, curPath);
      }
    }
  }

  for (const k of viKeys) {
    const curPath = path ? `${path}.${k}` : k;
    if (!(k in koObj)) {
      missingInKo.push(curPath);
    }
  }
}

compareObjects(ko, vi);

console.log('================ DICTIONARY PARITY VALIDATION ================');
console.log(`Total Keys Inspected: ${totalKeys}`);
console.log(`Missing in VI: ${missingInVi.length}`);
if (missingInVi.length > 0) {
  console.log('  Samples missing in VI:', missingInVi.slice(0, 10));
}
console.log(`Missing in KO: ${missingInKo.length}`);
if (missingInKo.length > 0) {
  console.log('  Samples missing in KO:', missingInKo.slice(0, 10));
}
console.log(`Empty strings in VI: ${emptyInVi.length}`);
console.log(`Empty strings in KO: ${emptyInKo.length}`);

if (missingInVi.length === 0 && missingInKo.length === 0 && emptyInVi.length === 0 && emptyInKo.length === 0) {
  console.log('\n🎉 PERFECT 100% DICTIONARY PARITY! ZERO MISSING KEYS, ZERO EMPTY VALUES.');
} else {
  process.exit(1);
}
