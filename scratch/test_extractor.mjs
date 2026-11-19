import fs from 'fs';
import { DA_NANG_CONFIG } from '../src/features/destinations/data/da-nang.config.js';

const TECHNICAL_KEYS = new Set([
  'id', 'slug', 'countryCode', 'locale', 'stars', 'targetId',
  'image', 'posterImage', 'overlayOpacity', 'fallbackImage', 'photos', 'avatar',
  'lng', 'lat', 'elevation', 'bearing', 'pitch', 'zoom', 'coords',
  'mapCenter', 'defaultZoom', 'overviewCamera', 'flightNumber', 'modelCode',
  'rating', 'daysCount', 'direct'
]);

function extractText(val, keyName = '') {
  if (typeof val === 'string') {
    // If it's a URL or technical path, skip
    if (val.startsWith('http') || val.startsWith('/') || val.startsWith('#')) return null;
    return val;
  }
  if (Array.isArray(val)) {
    const arr = [];
    val.forEach((item, idx) => {
      if (typeof item === 'string') {
        if (!item.startsWith('http') && !item.startsWith('/') && !item.startsWith('#')) {
          arr.push(item);
        }
      } else if (typeof item === 'object' && item !== null) {
        const extracted = extractText(item);
        if (extracted && Object.keys(extracted).length > 0) {
          // If item has an id, keep the id so we can associate it!
          if (item.id) extracted.id = item.id;
          arr.push(extracted);
        }
      }
    });
    return arr;
  }
  if (typeof val === 'object' && val !== null) {
    const res = {};
    for (const [k, v] of Object.entries(val)) {
      if (TECHNICAL_KEYS.has(k)) {
        // Keep ID for correlation
        if (k === 'id') res.id = v;
        continue;
      }
      const extracted = extractText(v, k);
      if (extracted !== null) {
        res[k] = extracted;
      }
    }
    return res;
  }
  return null;
}

const koDict = extractText(DA_NANG_CONFIG);
fs.writeFileSync('src/locales/destinations/da-nang/ko.json', JSON.stringify(koDict, null, 2), 'utf8');
console.log('ko.json regenerated cleanly! Size:', fs.statSync('src/locales/destinations/da-nang/ko.json').size);
