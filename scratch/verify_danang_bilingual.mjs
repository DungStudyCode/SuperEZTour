import { DA_NANG_CONFIG, getLocalizedDaNangConfig } from '../src/features/destinations/data/da-nang.config.js';
import { getDestinationConfig } from '../src/features/destinations/data/destinations.config.js';
import koDict from '../src/locales/destinations/da-nang/ko.json' with { type: 'json' };
import viDict from '../src/locales/destinations/da-nang/vi.json' with { type: 'json' };

console.log('========================================================================');
console.log('       SUPER EZ TOUR — DA NANG KO/VI UPGRADE AUDIT & VERIFICATION       ');
console.log('========================================================================\n');

let passCount = 0;
let failCount = 0;

function assert(description, condition, details = '') {
  if (condition) {
    console.log(`  ✅ PASS: ${description}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${description}`);
    if (details) console.error(`     Details: ${details}`);
    failCount++;
  }
}

// -------------------------------------------------------------
// TEST 1: Korean Baseline Preservation
// -------------------------------------------------------------
console.log('--- 1. Korean Baseline Preservation (100% Fidelity) ---');
const koConfig = getLocalizedDaNangConfig('ko');
assert('koConfig returns object', typeof koConfig === 'object' && koConfig !== null);
assert('koConfig locale is "ko"', koConfig.locale === 'ko');
assert('koConfig hero.headline matches baseline', koConfig.hero.headline === DA_NANG_CONFIG.hero.headline);
assert('koConfig flights.perkBar is exact Korean string', koConfig.flights.perkBar === 'DAD 공항 입국장 전용 네임피켓 영접 · 100% 프라이빗 에어컨 전용차량');
assert('koConfig vehicle 0 name is Korean', koConfig.transportation.vehicles[0].name === '프리미엄 7인승 (SUV / MPV)');
assert('koConfig itinerary 0 title is Korean', koConfig.itineraries[0].title === '다낭·바나힐·호이안 유네스코 핵심 일주');
assert('koConfig itinerary 2 day 0 highlight 0 is Korean', koConfig.itineraries[2].days[0].highlights[0] === '공항 VIP 영접 및 전용 리무진으로 럭셔리 리조트 이동');
assert('koConfig finalCta.title is baseline', koConfig.finalCta.title === 'DA NANG IS CALLING.');
assert('koConfig finalCta.lead is baseline', koConfig.finalCta.lead === '세상에 완전히 똑같은 두 개의 여행은 없습니다.');

// -------------------------------------------------------------
// TEST 2: Vietnamese Luxury Editorial Localization
// -------------------------------------------------------------
console.log('\n--- 2. Vietnamese Luxury Editorial Localization ---');
const viConfig = getLocalizedDaNangConfig('vi');
assert('viConfig returns object', typeof viConfig === 'object' && viConfig !== null);
assert('viConfig locale is "vi"', viConfig.locale === 'vi');
assert('viConfig hero.headline is luxury Vietnamese', viConfig.hero.headline === 'Hành trình Đà Nẵng độc bản dành riêng cho bạn và gia đình.');
assert('viConfig hero.quickStats 0 is localized', viConfig.hero.quickStats[0].label === 'Đường bờ biển ngọc');
assert('viConfig ecosystem service 0 is localized', viConfig.ecosystem.services[0].title === 'Khách Sạn & Resort 5 Sao Thượng Lưu');
assert('viConfig accommodation item 0 name is localized', viConfig.accommodation.items[0].name === 'InterContinental Danang Sun Peninsula Resort');
assert('viConfig localGuide pillar 0 is localized', viConfig.localGuide.pillars[0].title === 'Thông Thạo Ngôn Ngữ & Lịch Sử');
assert('viConfig flights.perkBar is Vietnamese string', viConfig.flights.perkBar === 'Đón tiễn VIP với bảng tên tại sảnh đến DAD · 100% xe riêng máy lạnh cao cấp');
assert('viConfig vehicle 0 name is Vietnamese', viConfig.transportation.vehicles[0].name === 'Xe Riêng 7 Chỗ Cao Cấp (SUV / MPV)');
assert('viConfig attractions item 0 is localized', viConfig.attractions.items[0].name === 'Cầu Vàng & Sun World Bà Nà Hills');
assert('viConfig culinary item 0 is localized', viConfig.culinary.items[0].name === 'Mì Quảng Ếch Niêu Đất Trứ Danh');
assert('viConfig privateValues item 0 is localized', viConfig.privateValues.items[0].title === '100% Tour Riêng Tư — Không Ghép Khách Lạ');
assert('viConfig itinerary 0 title is localized', viConfig.itineraries[0].title === 'Đà Nẵng · Bà Nà Hills · Phố Cổ Hội An Di Sản');
assert('viConfig itinerary 2 day 0 highlight 0 is localized', viConfig.itineraries[2].days[0].highlights[0] === 'Xe riêng VIP đón đoàn tại sân bay DAD, nhận phòng nghỉ dưỡng bên bờ biển');
assert('viConfig customerStories 0 quote is localized', viConfig.customerStories[0].quote.includes('Gia đình có bố mẹ lớn tuổi'));
assert('viConfig finalCta.kicker is localized', viConfig.finalCta.kicker === 'HÀNH TRÌNH ĐANG CHỜ ĐÓN BẠN');
assert('viConfig finalCta.lead is localized', viConfig.finalCta.lead === 'Không có hai chuyến đi nào hoàn toàn giống nhau.');

// -------------------------------------------------------------
// TEST 3: Technical Integrity & Contract Stability
// -------------------------------------------------------------
console.log('\n--- 3. Technical Integrity & Contract Stability ---');
assert('Destination id remains "da-nang"', viConfig.id === koConfig.id && viConfig.id === 'da-nang');
assert('Destination slug remains "da-nang"', viConfig.slug === koConfig.slug && viConfig.slug === 'da-nang');
assert('Hero poster image URL preserved identically', viConfig.hero.posterImage === koConfig.hero.posterImage);
assert('Ecosystem services count preserved (6)', viConfig.ecosystem.services.length === 6 && viConfig.ecosystem.services.length === koConfig.ecosystem.services.length);
assert('Ecosystem service IDs preserved', viConfig.ecosystem.services.every((s, i) => s.id === koConfig.ecosystem.services[i].id));
assert('Accommodation items count preserved (6)', viConfig.accommodation.items.length === 6 && viConfig.accommodation.items.length === koConfig.accommodation.items.length);
assert('Accommodation item IDs preserved', viConfig.accommodation.items.every((item, i) => item.id === koConfig.accommodation.items[i].id));
assert('Accommodation item images preserved', viConfig.accommodation.items.every((item, i) => item.image === koConfig.accommodation.items[i].image));
assert('Transportation vehicle count preserved (5)', viConfig.transportation.vehicles.length === 5 && viConfig.transportation.vehicles.length === koConfig.transportation.vehicles.length);
assert('Transportation vehicle IDs preserved', viConfig.transportation.vehicles.every((v, i) => v.id === koConfig.transportation.vehicles[i].id));
assert('Attractions items count preserved (7)', viConfig.attractions.items.length === 7 && viConfig.attractions.items.length === koConfig.attractions.items.length);
assert('Attractions item IDs preserved', viConfig.attractions.items.every((a, i) => a.id === koConfig.attractions.items[i].id));
assert('Attractions coordinates preserved (lng, lat, elevation, bearing, pitch, zoom)', viConfig.attractions.items.every((a, i) => {
  const k = koConfig.attractions.items[i];
  return a.lng === k.lng && a.lat === k.lat && a.elevation === k.elevation && a.bearing === k.bearing && a.pitch === k.pitch && a.zoom === k.zoom;
}));
assert('Culinary items count preserved (5)', viConfig.culinary.items.length === 5 && viConfig.culinary.items.length === koConfig.culinary.items.length);
assert('Culinary item IDs preserved', viConfig.culinary.items.every((c, i) => c.id === koConfig.culinary.items[i].id));
assert('Itineraries track count preserved (3)', viConfig.itineraries.length === 3 && viConfig.itineraries.length === koConfig.itineraries.length);
assert('Itinerary day counts preserved identically', viConfig.itineraries.every((it, i) => it.days.length === koConfig.itineraries[i].days.length));
assert('Itinerary highlight counts per day preserved identically', viConfig.itineraries.every((it, i) => 
  it.days.every((d, di) => d.highlights.length === koConfig.itineraries[i].days[di].highlights.length)
));

// -------------------------------------------------------------
// TEST 4: getDestinationConfig Gateway Resolution
// -------------------------------------------------------------
console.log('\n--- 4. getDestinationConfig Resolution Gateway ---');
const koResolved = getDestinationConfig('da-nang', 'ko');
const viResolved = getDestinationConfig('da-nang', 'vi');
const aliasResolved = getDestinationConfig('vietnam-danang', 'vi');
assert('getDestinationConfig("da-nang", "ko") returns Korean baseline', koResolved.hero.headline === DA_NANG_CONFIG.hero.headline);
assert('getDestinationConfig("da-nang", "vi") returns Vietnamese localization', viResolved.hero.headline === viDict.hero.headline);
assert('getDestinationConfig alias "vietnam-danang" resolves to Vietnamese', aliasResolved.hero.headline === viDict.hero.headline);

// -------------------------------------------------------------
// TEST 5: Dictionary Deep Cleanliness Check
// -------------------------------------------------------------
console.log('\n--- 5. Dictionary Parity & Cleanliness ---');
function scanCleanliness(obj, path = '') {
  let issues = [];
  for (const [k, v] of Object.entries(obj)) {
    const curPath = path ? `${path}.${k}` : k;
    if (typeof v === 'string') {
      if (v.trim() === '') {
        issues.push(`Empty string at ${curPath}`);
      }
      if (v.includes('{{') || v.includes('__MISSING__') || v.startsWith('destinations.daNang.')) {
        issues.push(`Raw translation template at ${curPath}: ${v}`);
      }
    } else if (Array.isArray(v)) {
      v.forEach((item, idx) => {
        if (typeof item === 'string') {
          if (item.trim() === '') issues.push(`Empty string at ${curPath}[${idx}]`);
          if (item.includes('{{') || item.includes('__MISSING__')) issues.push(`Raw key at ${curPath}[${idx}]`);
        } else if (item && typeof item === 'object') {
          issues.push(...scanCleanliness(item, `${curPath}[${idx}]`));
        }
      });
    } else if (v && typeof v === 'object') {
      issues.push(...scanCleanliness(v, curPath));
    }
  }
  return issues;
}

const koIssues = scanCleanliness(koDict);
const viIssues = scanCleanliness(viDict);
assert('Zero empty or unrendered keys in ko.json', koIssues.length === 0, koIssues.join(', '));
assert('Zero empty or unrendered keys in vi.json', viIssues.length === 0, viIssues.join(', '));

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n========================================================================');
console.log(`TOTAL TESTS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
if (failCount === 0) {
  console.log('🎉 100% PERFECT LOCALIZATION & CONTRACT COMPLIANCE CONFIRMED!');
} else {
  console.error('❌ ISSUES DETECTED. PLEASE FIX.');
  process.exit(1);
}
console.log('========================================================================\n');
