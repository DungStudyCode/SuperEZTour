const { execSync } = require('child_process');
const fs = require('fs');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3001';

console.log('========================================================================');
console.log('       SUPER EZ TOUR — 3D LIFECYCLE & LANGUAGE RECOVERY TEST SUITE      ');
console.log('========================================================================\n');

function runChrome(url, extraFlags = '') {
  const cmd = `"${CHROME}" --headless=new --virtual-time-budget=5000 ${extraFlags} --dump-dom "${url}"`;
  return execSync(cmd, {
    encoding: 'utf-8',
    maxBuffer: 40 * 1024 * 1024
  });
}

// -------------------------------------------------------------
// TEST 1: Đà Nẵng 3D Page Render & Scene Tree Integrity
// -------------------------------------------------------------
console.log('--- 1. Testing Da Nang Page Initial Render (/destinations/da-nang) ---');
try {
  const dom = runChrome(`${BASE_URL}/destinations/da-nang`);
  const hasRoot = dom.includes('dest-engine') || dom.includes('dest-engine-immersive');
  const hasHero = dom.includes('portal-scene');
  const hasFlyThrough = dom.includes('fly-through-scene');
  const hasVehicle = dom.includes('vehicle-3d-scene');
  const hasFlight = dom.includes('flight-3d-scene');
  const hasMap = dom.includes('interactive-3d-map-scene');
  const hasHeader = dom.includes('dest-header');

  console.log(`  * DOM character length: ${dom.length}`);
  console.log(`  * Destination Engine: ${hasRoot ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  * Scene 01 (AirplanePortal): ${hasHero ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  * Scene 02 (FlyThrough): ${hasFlyThrough ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  * Scene 06 (Flight3D): ${hasFlight ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  * Scene 07 (Vehicle3D): ${hasVehicle ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  * Scene 08 (Interactive3DMap): ${hasMap ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  * Destination Header: ${hasHeader ? '✅ PASS' : '❌ FAIL'}`);
} catch (e) {
  console.error('Test 1 failed:', e.message);
}

// -------------------------------------------------------------
// TEST 2: Hà Nội 3D Page Render & Scene Tree Integrity
// -------------------------------------------------------------
console.log('\n--- 2. Testing Hanoi Page Initial Render (/destinations/ha-noi) ---');
try {
  const dom = runChrome(`${BASE_URL}/destinations/ha-noi`);
  const hasWrapper = dom.includes('hanoi-experience-wrapper');
  const hasAwakening = dom.includes('hanoi-awakening-hero');
  const hasOldQuarter = dom.includes('hanoi-old-quarter');
  const hasHeritage = dom.includes('hanoi-heritage-chamber');
  const hasTaste = dom.includes('hanoi-taste-scene');
  const hasSeasons = dom.includes('hanoi-seasons-scene');

  console.log(`  * DOM character length: ${dom.length}`);
  console.log(`  * Hanoi Experience Wrapper: ${hasWrapper ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  * Scene 01 (Awakening): ${hasAwakening ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  * Scene 02 (OldQuarter): ${hasOldQuarter ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  * Scene 03 (HeritageChamber): ${hasHeritage ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  * Scene 04 (Taste3D): ${hasTaste ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  * Scene 05 (Seasons3D): ${hasSeasons ? '✅ PASS' : '❌ FAIL'}`);
} catch (e) {
  console.error('Test 2 failed:', e.message);
}

// -------------------------------------------------------------
// TEST 3: Static Analysis of DestinationPage, LenisManager, Map
// -------------------------------------------------------------
console.log('\n--- 3. Static Code Analysis of Lifecycle Safety Guarantees ---');
const destPageCode = fs.readFileSync('src/features/destinations/DestinationPage.jsx', 'utf8');
const lenisCode = fs.readFileSync('src/features/destinations/motion/LenisManager.js', 'utf8');
const mapCode = fs.readFileSync('src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx', 'utf8');

const hasGlobalKill = destPageCode.includes('ScrollTrigger.getAll().forEach');
const hasRouteScopedScroll = destPageCode.includes('window.scrollTo(0, 0)') && destPageCode.includes('useEffect(() => {\n    // Scroll to top ONLY upon landing on a new destination\n    window.scrollTo(0, 0);');
const hasTickerRemoval = lenisCode.includes('gsap.ticker.remove(tickerCallback)');
const hasLenisReuse = lenisCode.includes('if (lenisInstance) {\n    return lenisInstance;');
const hasMarkerTextContent = mapCode.includes('nameEl.textContent = dest.name') && mapCode.includes('altEl.textContent = dest.elevation');

console.log(`  * Global ScrollTrigger kill removed from DestinationPage: ${!hasGlobalKill ? '✅ PASS (Eliminated)' : '❌ FAIL (Still present)'}`);
console.log(`  * LenisManager removes ticker callback via exact reference: ${hasTickerRemoval ? '✅ PASS' : '❌ FAIL'}`);
console.log(`  * LenisManager reuses existing instance without duplicate creation: ${hasLenisReuse ? '✅ PASS' : '❌ FAIL'}`);
console.log(`  * Interactive3DMap updates marker labels reactively via textContent: ${hasMarkerTextContent ? '✅ PASS' : '❌ FAIL'}`);

console.log('\n========================================================================');
console.log('                     ALL AUTOMATED CHECKS COMPLETE                      ');
console.log('========================================================================\n');
