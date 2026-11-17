/**
 * Super EZ Tour - Unified Vietnam Destinations Registry & Content Data
 * Single Source of Truth for Homepage, MegaMenu, MobileDrawer, Search & Regional Filters.
 *
 * CRITICAL RULE:
 * Only 'da-nang' currently has a fully developed interactive 3D landing page (/destinations/da-nang).
 * Other 9 destinations are clearly flagged with status: 'coming_soon' to prevent 404s or broken navigation.
 */

export const VIETNAM_REGIONS = [
  { id: 'all', nameKr: '전체', nameEn: 'All Vietnam', subtitle: '베트남 전역 10대 명소' },
  { id: 'north', nameKr: '북부', nameEn: 'North Vietnam', subtitle: '천년의 역사와 비경의 산수' },
  { id: 'central', nameKr: '중부', nameEn: 'Central Vietnam', subtitle: '황금빛 해변과 유네스코 세계유산' },
  { id: 'south', nameKr: '남부', nameEn: 'South Vietnam', subtitle: '역동적인 메트로폴리스와 에메랄드 섬' },
];

export const VIETNAM_DESTINATIONS = [
  // ================= NORTH VIETNAM =================
  {
    id: 'ha-noi',
    slug: 'ha-noi',
    name: 'Hanoi',
    nameKr: '하노이',
    nameVi: 'Hà Nội',
    region: 'north',
    regionKr: '북부 베트남',
    route: '/destinations/ha-noi',
    status: 'coming_soon',
    isAvailable: false,
    badge: 'COMING SOON',
    tagline: '천년 고도의 우아함과 프랑스 식민지 건축미의 조화',
    taglineEn: 'Millennium of Dynasty Heritage & French Colonial Elegance',
    category: 'Heritage & Colonial Culture',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85',
    rating: 4.96,
    reviewsCount: '3,840+',
    highlights: ['호안끼엠 호수 & 구시가지 36거리', '문묘 & 오페라 하우스 프라이빗 투어', '정통 하노이 에그커피 & 미식 살롱'],
    aliases: ['하노이', 'hanoi', 'ha noi', 'hà nội', 'hn'],
  },
  {
    id: 'sa-pa',
    slug: 'sa-pa',
    name: 'Sa Pa',
    nameKr: '사파',
    nameVi: 'Sa Pa',
    region: 'north',
    regionKr: '북부 베트남',
    route: '/destinations/sa-pa',
    status: 'coming_soon',
    isAvailable: false,
    badge: 'COMING SOON',
    tagline: '구름 위의 라이스테라스와 소수민족의 순수한 영혼',
    taglineEn: 'Cascading Cloud Terraces & Mystical Highland Retreats',
    category: 'Highland Nature & Trekking',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
    rating: 4.94,
    reviewsCount: '2,150+',
    highlights: ['판시판 산 케이블카 프라이빗 트레킹', '깟깟 마을 몽족 전통 문화 체험', '인도차이나 최고봉 럭셔리 산악 리조트'],
    aliases: ['사파', 'sapa', 'sa pa', 'fansipan'],
  },
  {
    id: 'ha-long',
    slug: 'ha-long',
    name: 'Ha Long Bay',
    nameKr: '하롱베이',
    nameVi: 'Hạ Long',
    region: 'north',
    regionKr: '북부 베트남',
    route: '/destinations/ha-long',
    status: 'coming_soon',
    isAvailable: false,
    badge: 'COMING SOON',
    tagline: '용이 내려앉은 바다, 2천 개의 석회암 카르스트 비경',
    taglineEn: 'Dragon Descents & 2,000 Limestone Karst Marvels',
    category: 'Private Luxury Cruise',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85',
    rating: 4.97,
    reviewsCount: '4,620+',
    highlights: ['초호화 6성급 프라이빗 부티크 크루즈', '란하 베이 비밀 카약 & 석양 샴페인', '송솟 동굴 VIP 익스클루시브 투어'],
    aliases: ['하롱베i', '하롱', 'halong', 'ha long', 'hạ long', 'ha long bay'],
  },
  {
    id: 'ninh-binh',
    slug: 'ninh-binh',
    name: 'Ninh Binh',
    nameKr: '닌빈',
    nameVi: 'Ninh Bình',
    region: 'north',
    regionKr: '북부 베트남',
    route: '/destinations/ninh-binh',
    status: 'coming_soon',
    isAvailable: false,
    badge: 'COMING SOON',
    tagline: '육지의 하롱베이, 고요한 강물 위로 솟아오른 기암괴석',
    taglineEn: 'Inland Ha Long & Ancient Capital Sanctuary',
    category: 'Ancient Landscape & Sanctuary',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85',
    rating: 4.93,
    reviewsCount: '1,890+',
    highlights: ['짱안 유네스코 나룻배 프라이빗 유람', '항무아 500계단 파노라마 전망', '호아루 고대 왕조 사원 산책'],
    aliases: ['닌빈', 'ninhbinh', 'ninh binh', 'ninh bình', 'trang an'],
  },

  // ================= CENTRAL VIETNAM =================
  {
    id: 'da-nang',
    slug: 'da-nang',
    name: 'Da Nang',
    nameKr: '다낭',
    nameVi: 'Đà Nẵng',
    region: 'central',
    regionKr: '중부 베트남',
    route: '/destinations/da-nang',
    status: 'available', // <<--- LIVE & AVAILABLE
    isAvailable: true,
    badge: 'AVAILABLE NOW',
    featured: true,
    tagline: '황금빛 미케 비치와 바나힐 골든 브릿지의 웅장한 감동',
    taglineEn: 'Golden Sands, Marble Mountains & Sunset Wonder',
    category: 'Luxury Beach & Modern Wonder',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=85',
    rating: 4.98,
    reviewsCount: '5,210+',
    highlights: ['100% 단독 전용 리무진 & 바나힐 VIP 패스트트랙', '미케 해변 5성급 럭셔리 풀빌라 단독 수배', '호이안 등불 올드타운 & 미식 로드 트립'],
    aliases: ['다낭', 'danang', 'da nang', 'đà nẵng', '다낭여행', '바나힐'],
  },
  {
    id: 'hue',
    slug: 'hue',
    name: 'Hue',
    nameKr: '후에',
    nameVi: 'Huế',
    region: 'central',
    regionKr: '중부 베트남',
    route: '/destinations/hue',
    status: 'coming_soon',
    isAvailable: false,
    badge: 'COMING SOON',
    tagline: '응우옌 왕조의 143년 숨결이 깃든 황실의 수도',
    taglineEn: 'Imperial Citadel & Poetic Perfume River',
    category: 'Imperial Dynasty Heritage',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=85',
    rating: 4.95,
    reviewsCount: '2,430+',
    highlights: ['후에 황성 & 카이딘 황제릉 프라이빗 도슨트', '향강(Perfume River) 목선 로열 티 타임', '응우옌 황실 궁중 정찬 연회'],
    aliases: ['후에', 'hue', 'huế', 'imperial city'],
  },
  {
    id: 'nha-trang',
    slug: 'nha-trang',
    name: 'Nha Trang',
    nameKr: '나트랑',
    nameVi: 'Nha Trang',
    region: 'central',
    regionKr: '중부 베트남',
    route: '/destinations/nha-trang',
    status: 'coming_soon',
    isAvailable: false,
    badge: 'COMING SOON',
    tagline: '연중 300일의 찬란한 태양과 청정 산호초의 휴양 낙원',
    taglineEn: 'Tropical Riviera & Sun-Drenched Coral Escapes',
    category: 'Ocean Riviera & Wellness',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    rating: 4.96,
    reviewsCount: '4,120+',
    highlights: ['포나가르 첨탑 참파 문화 유적', '문섬 & 혼땀섬 단독 요트 호핑 투어', '천연 머드 온천 & 럭셔리 스파 힐링'],
    aliases: ['나트랑', '냐짱', 'nhatrang', 'nha trang', 'nha-trang'],
  },
  {
    id: 'da-lat',
    slug: 'da-lat',
    name: 'Da Lat',
    nameKr: '달랏',
    nameVi: 'Đà Lạt',
    region: 'central',
    regionKr: '중부 베트남',
    route: '/destinations/da-lat',
    status: 'coming_soon',
    isAvailable: false,
    badge: 'COMING SOON',
    tagline: '영원한 봄의 도시, 소나무 숲과 안개 자욱한 호수의 낭만',
    taglineEn: 'City of Eternal Spring & French Alpine Romance',
    category: 'Romantic Highland & Florals',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    rating: 4.94,
    reviewsCount: '3,110+',
    highlights: ['쓰엉흐엉 호수 마차 투어 & 랑비앙 마운틴', '프랑스풍 클래식 기차역 & 아티초크 티 세션', '고산지대 스페셜티 커피 농장 테이스팅'],
    aliases: ['달랏', 'dalat', 'da lat', 'đà lạt'],
  },

  // ================= SOUTH VIETNAM =================
  {
    id: 'ho-chi-minh',
    slug: 'ho-chi-minh',
    name: 'Ho Chi Minh City',
    nameKr: '호찌민',
    nameVi: 'Hồ Chí Minh',
    region: 'south',
    regionKr: '남부 베트남',
    route: '/destinations/ho-chi-minh',
    status: 'coming_soon',
    isAvailable: false,
    badge: 'COMING SOON',
    tagline: '사이공의 역사적 낭만과 21세기 메가시티의 역동적인 에너지',
    taglineEn: 'The Pulse of Saigon & Modern Metropolitan Energy',
    category: 'Metropolitan Luxury & Lifestyle',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=85',
    rating: 4.93,
    reviewsCount: '3,950+',
    highlights: ['사이공 노트르담 대성당 & 중앙 우체국', '사이공 강 럭셔리 디너 크루즈 & 루프탑 바', '메콩 델타 수로 프라이빗 스피드보트 투어'],
    aliases: ['호찌민', '호치민', 'saigon', '사이공', 'hochiminh', 'ho chi minh', 'hồ chí minh', 'hcm'],
  },
  {
    id: 'phu-quoc',
    slug: 'phu-quoc',
    name: 'Phu Quoc',
    nameKr: '푸꾸옥',
    nameVi: 'Phú Quốc',
    region: 'south',
    regionKr: '남부 베트남',
    route: '/destinations/phu-quoc',
    status: 'coming_soon',
    isAvailable: false,
    badge: 'COMING SOON',
    tagline: '베트남의 숨은 진주, 유네스코 생물권 보전 해양 국립공원',
    taglineEn: 'The Pearl Island & Pristine Sunset Sanctuary',
    category: 'Island Villa Retreat & Marine Life',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=85',
    rating: 4.97,
    reviewsCount: '4,580+',
    highlights: ['사오 비치 에메랄드 프라이빗 비치 클럽', '혼똔 섬 세계 최장 해상 케이블카', '선셋 사파리 & 남부 4개 섬 단독 스피드보트'],
    aliases: ['푸꾸옥', '푸꿕', 'phuquoc', 'phu quoc', 'phú quốc'],
  },
];

/**
 * Filter destinations by region
 * @param {'all' | 'north' | 'central' | 'south'} regionId
 */
export function getDestinationsByRegion(regionId) {
  if (!regionId || regionId === 'all') {
    return VIETNAM_DESTINATIONS;
  }
  return VIETNAM_DESTINATIONS.filter((d) => d.region === regionId);
}

/**
 * Search destinations by keyword (Korean, English, Vietnamese, or aliases)
 * @param {string} rawQuery
 */
export function searchVietnamDestinations(rawQuery) {
  const query = (rawQuery || '').toLowerCase().trim();
  if (!query) return VIETNAM_DESTINATIONS;

  return VIETNAM_DESTINATIONS.filter((d) => {
    if (d.nameKr.toLowerCase().includes(query)) return true;
    if (d.name.toLowerCase().includes(query)) return true;
    if (d.nameVi.toLowerCase().includes(query)) return true;
    if (d.slug.toLowerCase().includes(query)) return true;
    if (d.regionKr.toLowerCase().includes(query)) return true;
    if (d.tagline.toLowerCase().includes(query)) return true;
    if (d.aliases && d.aliases.some((a) => a.toLowerCase().includes(query))) return true;
    return false;
  });
}

/**
 * Curated Signature Private Journeys (BOBTOUR & Guideman inspired)
 */
export const SIGNATURE_JOURNEYS = [
  {
    id: 'da-nang-4d3n',
    title: '다낭 & 호이안 헤리티지 4박 5일',
    titleEn: 'Da Nang & Hoi An Timeless Heritage 4D3N',
    destination: 'Đà Nẵng · Hội An',
    destinationSlug: 'da-nang',
    isAvailable: true,
    duration: '3박 4일 / 4박 5일',
    badge: '100% PRIVATE SIGNATURE',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=900&q=85',
    highlights: [
      '전 일정 100% 단독 전용 리무진 & 전담 한국어 가이드',
      '바나힐 골든브릿지 VIP 패스트트랙 & 케이블카 직통',
      '호이안 구시가지 전통 소원배 & 미쉐린 셀렉트 만찬',
      '쇼핑 0회 · 원치 않는 옵션 강요 0%',
    ],
    pacing: '여유로운 힐링 & 프라이빗 문화 산책',
  },
  {
    id: 'hanoi-halong-5d4n',
    title: '하노이 & 하롱베이 럭셔리 크루즈 5일',
    titleEn: 'Hanoi Heritage & Ha Long 6-Star Cruise 5D4N',
    destination: 'Hà Nội · Hạ Long',
    destinationSlug: 'ha-long',
    isAvailable: false,
    duration: '4박 5일',
    badge: 'COMING SOON — PRE-INQUIRY',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=85',
    highlights: [
      '6성급 부티크 크루즈 발코니 스위트룸 숙박',
      '하노이 올드쿼터 36거리 시클로 & 프랑스 오페라하우스 투어',
      '란하 베이 비밀 동굴 카약 & 선상 파인다이닝',
      '노이바이 국제공항 VIP 의전 패스트트랙',
    ],
    pacing: '품격 높은 자연 크루즈 & 고도 역사 탐방',
  },
  {
    id: 'phu-quoc-escape-4d3n',
    title: '푸꾸옥 프라이빗 아일랜드 리트리트 4일',
    titleEn: 'Phu Quoc Island Ultra-Luxury Escape 4D3N',
    destination: 'Phú Quốc',
    destinationSlug: 'phu-quoc',
    isAvailable: false,
    badge: 'COMING SOON — PRE-INQUIRY',
    duration: '3박 4일',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=900&q=85',
    highlights: [
      '전 일정 인터컨티넨탈 / JW메리어트 오션뷰 풀빌라',
      '남부 청정 4개 산호섬 단독 스피드보트 호핑 투어',
      '선셋 타운 지중해 마을 & 분수 레이저쇼 VIP 좌석',
      '단독 해산물 바비큐 & 1일 1회 프라이빗 스파',
    ],
    pacing: '완벽한 프라이빗 휴양 & 에메랄드 해양 스포츠',
  },
  {
    id: 'sapa-mist-valley-3d2n',
    title: '사파 판시판 구름위의 힐링 3일',
    titleEn: 'Sapa Cloud Terraces & Fansipan Expedition 3D2N',
    destination: 'Sa Pa',
    destinationSlug: 'sa-pa',
    isAvailable: false,
    badge: 'COMING SOON — PRE-INQUIRY',
    duration: '2박 3일',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85',
    highlights: [
      '인도차이나 최고봉 판시판 정상 케이블카 & 산악열차',
      '토파스 에콜로지 / 호텔 드 라 쿠폴 프라이빗 발코니',
      '몽족 & 자오족 소수민족 마을 문화 산책 & 허브 온천',
      '하노이-사파 전용 리무진 픽업 & 샌딩',
    ],
    pacing: '대자연 힐링 & 신비로운 고산 문화 체험',
  },
];

/**
 * 8 Core Travel Themes
 */
export const TRAVEL_THEMES = [
  {
    id: 'luxury-retreat',
    titleKr: '럭셔리 휴양 & 풀빌라',
    titleEn: 'Luxury Retreat',
    descKr: '5성급 비치프론트 풀빌라와 프라이빗 스파에서 누리는 완벽한 안식.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    tags: ['오션뷰 풀빌라', '단독 스파 케어', '프라이빗 버틀러'],
  },
  {
    id: 'family-journey',
    titleKr: '프리미엄 가족여행',
    titleEn: 'Family Journey',
    descKr: '어린이부터 부모님까지 모두 편안한 단독 전용 차량과 유연한 맞춤 일정.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    tags: ['맞춤형 완만한 코스', '한국어 전담 가이드', '가족 전용 차량'],
  },
  {
    id: 'honeymoon-couples',
    titleKr: '로맨틱 허니문 & 커플',
    titleEn: 'Honeymoon & Couples',
    descKr: '황홀한 선셋 디너와 둘만의 오붓한 순간을 위한 영화 같은 여정.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
    tags: ['선셋 샴페인', '캔들라이트 디너', '커플 스파 테라피'],
  },
  {
    id: 'cultural-heritage',
    titleKr: '유네스코 문화유산 탐방',
    titleEn: 'Cultural Heritage',
    descKr: '천년의 역사를 품은 고대 궁궐과 고요한 사찰을 전문 도슨트와 함께 깊이 있게 탐방.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    tags: ['세계문화유산', '전문 역사 가이드', '전통 공예 체험'],
  },
  {
    id: 'gastronomy',
    titleKr: '미식 퀴진 & 로컬 테이스팅',
    titleEn: 'Gastronomy',
    descKr: '미쉐린 셀렉트 레스토랑부터 숨겨진 현지 로컬 셰프의 시크릿 맛집까지.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    tags: ['미쉐린 가이드', '쿠킹 클래스', '스트리트 푸드 프라이빗 사파리'],
  },
  {
    id: 'nature-adventure',
    titleKr: '자연 & 하이랜드 어드벤처',
    titleEn: 'Nature & Adventure',
    descKr: '웅장한 석회암 동굴과 고산지대 라이스테라스를 넘나드는 짜릿한 대자연.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    tags: ['판시판 산악 트레킹', '카르스트 동굴 탐험', '비밀 계곡 카약'],
  },
  {
    id: 'private-cruise',
    titleKr: '프라이빗 럭셔리 크루즈',
    titleEn: 'Private Cruise',
    descKr: '잔잔한 에메랄드 만 위에 떠 있는 초호화 수상 호텔에서 맞이하는 일출과 밤하늘.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    tags: ['6성급 크루즈', '선상 발코니 스위트', '프라이빗 요트 대절'],
  },
  {
    id: 'golf-leisure',
    titleKr: '명문 골프 & 레저',
    titleEn: 'Golf & Leisure',
    descKr: '그렉 노먼 등 세계적 거장이 설계한 챔피언십 오션 코스에서의 단독 라운딩.',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=800&q=80',
    tags: ['18홀 챔피언십 코스', 'VIP 티타임 보장', '클럽하우스 픽업'],
  },
];

/**
 * 4 Core Travel Services (BOBTOUR & Guideman comparison standard)
 */
export const CORE_TRAVEL_SERVICES = [
  {
    id: 'private-transport',
    iconName: 'Car',
    titleKr: '100% 단독 전용 차량',
    titleEn: 'Private Vehicle Service',
    descKr: '다른 일행과의 합승 없는 최신형 고급 리무진 & SUV. 출국부터 귀국까지 편안하고 안전하게 모십니다.',
    perks: ['타인 합승 절대 불가', '생수/와이파이 완비', '현지 베테랑 전담 기사'],
  },
  {
    id: 'dedicated-guide',
    iconName: 'UserCheck',
    titleKr: '1:1 전담 현지 한국어 가이드',
    titleEn: 'Dedicated Korean Guide',
    descKr: '단순 인솔자가 아닌, 엄격한 검증을 거친 정식 라이선스 한국어 전문 가이드가 밀착 케어합니다.',
    perks: ['한국어 능통 전문 가이드', '원하는 속도에 맞춘 일정 조율', '현지 실시간 밀착 통역'],
  },
  {
    id: 'direct-hotel',
    iconName: 'Building',
    titleKr: '5성급 호텔 & 풀빌라 직계약',
    titleEn: 'Luxury Stays & Direct Contract',
    descKr: '글로벌 5성급 체인 호텔 및 최상급 프라이빗 풀빌라를 현지 직계약 특가와 VIP 베네핏으로 제공합니다.',
    perks: ['오션뷰 및 스위트 우선 배정', '웰컴 와인 & 과일 세팅', '레이트 체크아웃 우대'],
  },
  {
    id: 'local-care',
    iconName: 'ShieldCheck',
    titleKr: '24시간 직영 케어 & 공항 VIP 의전',
    titleEn: '24/7 Local Care & Airport VIP',
    descKr: '다낭 현지 직영 지사 상주 운영으로 돌발 상황 100% 즉시 대응. DAD 공항 도착 즉시 VIP 피켓 영접.',
    perks: ['현지 직영 지사 24시간 한국어 비상망', '공항 전용 영접 & 짐 운반', '여행자 보험 풀 커버리지'],
  },
];

/**
 * Guideman & BOBTOUR Inspired Value Comparison Matrix
 */
export const VALUE_COMPARISON = [
  {
    category: '여행 인원 구성',
    superEz: '우리 가족·일행만 100% 단독 진행 (합승 없음)',
    generalTour: '모르는 사람 30~40명과 단체 버스 탑승',
    isWin: true,
  },
  {
    category: '쇼핑 및 옵션 강요',
    superEz: '쇼핑 0회 · 원치 않는 유료 옵션 강요 0%',
    generalTour: '의무 쇼핑센터 3~4곳 방문, 가이드 팁 및 옵션 압박',
    isWin: true,
  },
  {
    category: '일정 및 시간 조율',
    superEz: '원하는 시간 출발, 머물고 싶은 만큼 머무는 자유',
    generalTour: '분 단위 빡빡한 일정, 개인 행동 일체 불가',
    isWin: true,
  },
  {
    category: '차량 & 가이드 배정',
    superEz: '최신형 전용 리무진 + 1:1 전담 한국어 가이드',
    generalTour: '대형 버스 이동 + 깃발 인솔형 현지 가이드',
    isWin: true,
  },
  {
    category: '현지 비상 케어',
    superEz: '현지 직영 지사 상주, 카카오톡 24시간 즉각 응대',
    generalTour: '국내 본사 통화 지연, 현지 비상 대응 한계',
    isWin: true,
  },
];
