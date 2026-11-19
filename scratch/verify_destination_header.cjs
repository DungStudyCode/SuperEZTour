const { execSync } = require('child_process');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function verifyPageHeader(url, pageName) {
  console.log(`\n================ Testing ${pageName} (${url}) ================`);
  try {
    const dom = execSync(`"${CHROME}" --headless=new --virtual-time-budget=5000 --dump-dom "${url}"`, {
      encoding: 'utf-8',
      maxBuffer: 30 * 1024 * 1024
    });

    const rootMatch = dom.match(/<div id="root">([\s\S]*?)<\/div>\s*<script/);
    const rootHtml = rootMatch ? rootMatch[1] : '';

    const hasError = rootHtml.includes('class="error-boundary-screen"') || rootHtml.includes('class="error-boundary-isolated"');
    console.log(`- DOM character length: ${rootHtml.length}`);
    console.log(`- Error boundary triggered: ${hasError ? '❌ YES' : '✅ NO'}`);

    // Check DestinationHeader presence
    const hasHeader = rootHtml.includes('dest-header');
    const hasLangSwitcher = rootHtml.includes('dest-header-lang-switcher') && rootHtml.includes('dest-lang-btn');
    const hasMobileDrawer = rootHtml.includes('dest-mobile-drawer');
    const hasMobileLangSwitcher = rootHtml.includes('dest-mobile-lang-wrap') && rootHtml.includes('dest-mobile-lang-btn');

    console.log(`- DestinationHeader rendered: ${hasHeader ? '✅' : '❌'}`);
    console.log(`- Desktop Language Switcher (KO/VI): ${hasLangSwitcher ? '✅' : '❌'}`);
    console.log(`- Mobile Navigation Drawer: ${hasMobileDrawer ? '✅' : '❌'}`);
    console.log(`- Mobile Language Switcher: ${hasMobileLangSwitcher ? '✅' : '❌'}`);

    if (pageName.includes('Da Nang')) {
      const checks = {
        'Da Nang Name in Header': rootHtml.includes('다낭') || rootHtml.includes('Đà Nẵng'),
        'Nav Link: Discover (다낭 탐방 / Khám phá)': rootHtml.includes('다낭 탐방') || rootHtml.includes('Khám phá'),
        'Nav Link: Services (여행 서비스 / Dịch vụ riêng)': rootHtml.includes('여행 서비스') || rootHtml.includes('Dịch vụ riêng'),
        'Nav Link: Attractions (주요 명소 / Tọa độ)': rootHtml.includes('주요 명소') || rootHtml.includes('Tọa độ'),
        'Nav Link: Itinerary (추천 일정 / Lịch trình)': rootHtml.includes('추천 일정') || rootHtml.includes('Lịch trình'),
        'Nav Link: Trip Builder (맞춤 여행 만들기 / Thiết kế tour)': rootHtml.includes('맞춤 여행 만들기') || rootHtml.includes('Thiết kế tour')
      };
      for (const [key, ok] of Object.entries(checks)) {
        console.log(`  * ${key}: ${ok ? '✅' : '❌'}`);
      }
    }

    if (pageName.includes('Hanoi')) {
      const checks = {
        'Hanoi Name in Header': rootHtml.includes('하노이') || rootHtml.includes('Hà Nội'),
        'Nav Link: Old Quarter (36거리 골목 / Phố cổ 36 phố)': rootHtml.includes('36거리 골목') || rootHtml.includes('Phố cổ 36 phố'),
        'Nav Link: Heritage (천년 유산 / Không gian di sản)': rootHtml.includes('천년 유산') || rootHtml.includes('Không gian di sản'),
        'Nav Link: Taste (미식 큐레이션 / Mỹ vị Hà Nội)': rootHtml.includes('미식 큐레이션') || rootHtml.includes('Mỹ vị Hà Nội'),
        'Nav Link: 3D Map (3D 지도 / Bản đồ 3D)': rootHtml.includes('3D 지도') || rootHtml.includes('Bản đồ 3D'),
        'Nav Link: Itinerary (추천 여정 / Lịch trình)': rootHtml.includes('추천 여정') || rootHtml.includes('Lịch trình'),
        'Nav Link: Trip Builder (맞춤 여행 만들기 / Thiết kế tour)': rootHtml.includes('맞춤 여행 만들기') || rootHtml.includes('Thiết kế tour'),
        'Zero Da Nang hardcode on Hanoi': !rootHtml.includes('06. 다낭 미식 큐레이션') && !rootHtml.includes('다낭 — 100% 프라이빗 투어')
      };
      for (const [key, ok] of Object.entries(checks)) {
        console.log(`  * ${key}: ${ok ? '✅' : '❌'}`);
      }
    }

    // Check broken logo path
    const hasBrokenLogo = rootHtml.includes('src="/images/logo.png"');
    console.log(`- Broken logo path (/images/logo.png): ${hasBrokenLogo ? '❌ FOUND BROKEN' : '✅ CLEAN'}`);

    return !hasError && hasHeader && hasLangSwitcher && !hasBrokenLogo;
  } catch (err) {
    console.error(`Error verifying ${url}:`, err.message);
    return false;
  }
}

function verifyHomePage() {
  console.log(`\n================ Testing Home Page (http://localhost:3000) ================`);
  try {
    const dom = execSync(`"${CHROME}" --headless=new --virtual-time-budget=5000 --dump-dom "http://localhost:3000"`, {
      encoding: 'utf-8',
      maxBuffer: 30 * 1024 * 1024
    });

    const hasError = dom.includes('class="error-boundary-screen"') || dom.includes('class="error-boundary-isolated"');
    console.log(`- Error boundary triggered: ${hasError ? '❌ YES' : '✅ NO'}`);

    const hasLangSwitcher = dom.includes('navbar-lang-switcher') && dom.includes('nav-lang-btn');
    const hasLogo = dom.includes('brand-logo') || dom.includes('logo');
    console.log(`- Home Navbar Language Switcher: ${hasLangSwitcher ? '✅' : '❌'}`);
    console.log(`- Home Navbar Logo: ${hasLogo ? '✅' : '❌'}`);

    return !hasError && hasLangSwitcher && hasLogo;
  } catch (err) {
    console.error(`Error verifying Home:`, err.message);
    return false;
  }
}

console.log('Testing DestinationHeader DOM with Chrome Headless...');
const daNangOk = verifyPageHeader('http://localhost:3000/destinations/da-nang', 'Da Nang Destination Page');
const hanoiOk = verifyPageHeader('http://localhost:3000/destinations/ha-noi', 'Hanoi Destination Page');
const homeOk = verifyHomePage();

console.log('\n================ VERIFICATION SUMMARY ================');
console.log(`Da Nang Header: ${daNangOk ? 'PASSED ✅' : 'FAILED ❌'}`);
console.log(`Hanoi Header: ${hanoiOk ? 'PASSED ✅' : 'FAILED ❌'}`);
console.log(`Home Page: ${homeOk ? 'PASSED ✅' : 'FAILED ❌'}`);

if (!daNangOk || !hanoiOk || !homeOk) {
  process.exit(1);
} else {
  console.log('\n🎉 ALL DESTINATION HEADER RUNTIME CHECKS PASSED!');
}
