/**
 * Super EZ Tour - Destination Configuration: ĐÀ NẴNG (DA NANG)
 * Premium Private Customized Travel Landing Engine
 * Korean Luxury Localization Edition
 */

import daNangVi from '../../../locales/destinations/da-nang/vi.json' with { type: 'json' };

export const DA_NANG_CONFIG = {
  id: 'da-nang',
  slug: 'da-nang',
  locale: 'ko',
  name: 'Đà Nẵng',
  nameKr: '다낭',
  nameEn: 'Da Nang',
  country: 'Việt Nam',
  countryKr: '베트남',
  countryCode: 'VN',
  region: 'Miền Trung',
  regionKr: '중부 휴양지',
  tagline: 'Beyond the Ordinary.',
  subTagline: '오직 당신만을 위한 100% 프라이빗 맞춤 여행.',
  description: '세계 6대 해변 미케비치, 거대한 신의 손 골든 브릿지, 태고의 원시림 손짜 반도, 유네스코 세계문화유산 호이안 올드타운을 연결하는 베트남 최고의 럭셔리 휴양지.',

  // Hero Media & Oval Window Portal
  hero: {
    badge: 'SUPER EZ TOUR — VIETNAM',
    badgeSecondary: '100% 프라이빗 투어 · 단독 진행',
    title: 'DA NANG',
    subtitle: 'Beyond the Ordinary.',
    headline: '오직 당신만을 위한 특별한 다낭 프라이빗 여정.',
    description: '100% 단독 프라이빗 투어 · 쇼핑 강요 0% 보장 · 다낭 현지 전문 운영팀의 1:1 맞춤 일정 설계.',
    ctaPrimary: '나만의 여행 만들기',
    ctaGhost: '다낭 탐방 시작하기',
    posterImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2000&q=85',
    overlayOpacity: 0.45,
    quickStats: [
      { label: '에메랄드 해안선', value: '30+ km' },
      { label: '인근 유네스코 유산', value: '3대 유산' },
      { label: '연평균 기온', value: '26°C - 29°C' },
      { label: '고객 만족도', value: '99.8%' }
    ],
    // Cinematic Journey Stages inside Airplane Window Portal
    introJourney: {
      stage1: 'https://images.unsplash.com/photo-1674296067534-0f9769040781?auto=format&fit=crop&w=2000&q=85', // Approach Da Nang: Drone Aerial Coastline & Ocean
      stage2: 'https://images.unsplash.com/photo-1693282815001-0471e68d3bc0?auto=format&fit=crop&w=2000&q=85', // Into the Mountains: Ba Na Hills Rainforest & Mist
      stage3: 'https://images.unsplash.com/photo-1603852452378-a4e8d84324a2?auto=format&fit=crop&w=2000&q=85', // Discover Golden Bridge: Panoramic Architecture
      stage4: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2000&q=85'  // Welcome to Da Nang: Hero Section Backdrop
    },
    scrollPrompt: {
      title: '다낭이 당신을 기다립니다.',
      action: '스크롤하여 여정을 시작하세요'
    }
  },

  // Section 02 - Discover Da Nang (Multi-plane FlyThrough)
  intro: {
    kicker: 'DISCOVER DA NANG',
    title: '하나의 도시,\n수많은 특별한 경험.',
    lead: '비취빛 바다가 웅장한 대자연과 맞닿고, 현대적인 감각과 천년 역사의 고요한 숨결이 공존하는 곳.',
    paragraphs: [
      '다낭은 지도 위의 단순한 여행지가 아닙니다. 미케비치의 부드러운 백사장에 부서지는 찬란한 아침 햇살, 희귀한 붉은정강이두크원숭이가 뛰노는 손짜 반도의 붉은 노을, 그리고 유서 깊은 투본강을 수놓는 수천 개의 전통 소원등까지.',
      'Super EZ Tour와 함께라면 40명씩 몰려다니는 패키지 버스나 틀에 박힌 일정에 얽매이지 않습니다. 발걸음이 닿는 모든 순간이 오직 당신만을 위한 시그니처 경험이 됩니다.'
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1400&q=80',
        title: '바나힐 골든 브릿지',
        caption: '바나힐 골든 브릿지 — 구름을 가르며 우뚝 솟은 세계적인 건축의 걸작',
        aspect: 'portrait'
      },
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
        title: '미케 비치 해변',
        caption: '미케 비치 — 포브스가 선정한 세계에서 가장 매혹적인 6대 해변',
        aspect: 'landscape'
      },
      {
        url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
        title: '호이안 올드타운',
        caption: '호이안 올드타운 — 투본강 물결 위에 은은하게 빛나는 유네스코 천년 등불',
        aspect: 'square'
      }
    ],
    features: [
      { title: '바다와 산의 조화로운 절경', desc: '손짜 반도의 원시림, 영험한 오행산, 끝없이 펼쳐진 에메랄드 동해 바다의 완벽한 앙상블.' },
      { title: '중부 베트남 미식의 진수', desc: '전통의 미꽝 국수부터 신선한 최고급 활 해산물 만찬과 프라이빗 비치 파인다이닝까지.' },
      { title: '세계문화유산으로 통하는 관문', desc: '호이안 고대 도시, 후에 왕실 유적, 미선 유적지까지 단독 전용차량으로 편안한 이동.' }
    ],
    hudBadge: 'FOCAL POINT · 시그니처 랜드마크',
    hudTitle: '바나힐 골든 브릿지',
    hudCaption: '구름 위로 뻗은 거대한 신의 손이 황금빛 다리를 받치고 있는 세계적인 랜드마크. 해발 1,414m 고산의 서늘한 바람과 압도적인 파노라마 절경을 선사합니다.',
    hudAltitudeLabel: '해발 고도',
    hudLengthLabel: '다리 길이',
    hudArchLabel: '건축 디자인'
  },

  // Section 03 - 6 Product Ecosystem
  ecosystem: {
    kicker: 'CORE ECOSYSTEM',
    title: 'Everything You Need.\nNothing You Don’t.',
    subtitle: '단 하나의 완벽한 여정. 100% 개인 맞춤형으로 완성되는 6대 핵심 여행 경험.',
    scrollHint: '스크롤하여 6대 여정 살펴보기 →',
    ctaDetail: '상세 서비스 확인하기',
    services: [
      {
        id: 'accommodation',
        number: '01',
        title: '최고급 호텔 & 리조트',
        titleEn: 'Premium Accommodation',
        desc: '전용 해변을 품은 5성급 럭셔리 비치 리조트, 개별 수영장이 딸린 프라이빗 풀빌라, 부티크 호텔 엄선.',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
        targetId: 'accommodation'
      },
      {
        id: 'guide',
        number: '02',
        title: '전담 현지 한국어 가이드',
        titleEn: 'Local Guide',
        desc: '베트남 역사와 문화에 정통한 공인 전문 가이드가 우리 일행만의 호흡에 맞춰 품격 있고 유연하게 동행합니다.',
        image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=900&q=80',
        targetId: 'guide'
      },
      {
        id: 'flights',
        number: '03',
        title: '항공 스케줄 & 공항 환승',
        titleEn: 'Flight Booking & Transit',
        desc: '최적 출발 시간대의 직항 항공편 큐레이션 및 다낭 국제공항(DAD) 도착 즉시 대기 없는 전용 픽업 연결.',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
        targetId: 'flights'
      },
      {
        id: 'transportation',
        number: '04',
        title: '프라이빗 전용 리무진 & 차량',
        titleEn: 'Private Transportation',
        desc: '최신형 7인승 SUV부터 럭셔리 VIP 리무진까지, 타인 동승 0%의 단독 전용 차량 및 베테랑 전담 기사 배치.',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
        targetId: 'transportation'
      },
      {
        id: 'attractions',
        number: '05',
        title: '시그니처 명소 & 프라이빗 투어',
        titleEn: 'Attractions & Experiences',
        desc: '골든 브릿지 바나힐, 손짜 반도, 오행산, 하이반 고개, 호이안 올드타운을 VIP 패스트트랙으로 여유롭게 탐방.',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=80',
        targetId: 'attractions'
      },
      {
        id: 'culinary',
        number: '06',
        title: '미식 큐레이션 & 파인다이닝',
        titleEn: 'Culinary Experiences',
        desc: '30년 전통 로컬 미식 명가부터 당일 조업 신선 해산물 만찬, 바다 전망의 미쉐린급 캔들라이트 디너까지.',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
        targetId: 'culinary'
      }
    ]
  },

  // Section 04 - Accommodation
  accommodation: {
    kicker: 'PREMIUM ACCOMMODATION',
    title: 'Stay Somewhere Extraordinary.',
    subtitle: '당신의 품격에 걸맞은 단 하나의 휴식 공간.',
    description: 'Super EZ Tour는 다낭 최정상급 국제 5성급 리조트 및 럭셔리 풀빌라와 직계약을 체결하여 완벽한 프라이버시, 파노라마 오션뷰, 그리고 빈틈없는 특급 서비스를 보장합니다.',
    allLabel: '전체',
    btnChosen: '선택 완료',
    btnSelect: '여행 일정에 추가',
    categories: [
      { id: 'resort', label: '럭셔리 리조트' },
      { id: 'villa', label: '프라이빗 풀빌라' },
      { id: '5star', label: '5성급 특급 호텔' },
      { id: '4star', label: '4성급 오션뷰 호텔' }
    ],
    items: [
      {
        id: 'intercon',
        name: 'InterContinental Danang Sun Peninsula Resort',
        category: 'resort',
        stars: 5,
        location: '손짜 반도 북부 해안, 다낭',
        badge: '세계적인 건축가 빌 벤슬리의 전설적인 걸작',
        highlights: ['완벽히 격리된 프라이빗 전용 해변', '미쉐린 스타 라 메종 1888 레스토랑', '절벽을 오르내리는 남트램 케이블카', '손짜 만을 내려다보는 인피니티 풀'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
        idealFor: 'VIP 최고급 휴양, 로맨틱 허니문, 특별한 기념일'
      },
      {
        id: 'hyatt',
        name: 'Hyatt Regency Danang Resort & Spa',
        category: 'resort',
        stars: 5,
        location: '쯔엉사 해변로, 응우한선, 다낭',
        badge: '세계적인 명성의 인터내셔널 비치 리조트',
        highlights: ['논누옥 해변으로 이어지는 5개 대형 수영장', '어린이를 위한 캠프 하얏트 키즈클럽', '천연 아로마 VIE 스파 테라피', '오션뷰 3베드룸 프리미엄 레지던스'],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
        idealFor: '3대 대가족 여행, 품격 있는 친목 모임'
      },
      {
        id: 'premier-village',
        name: 'Premier Village Danang Resort - Managed by Accor',
        category: 'villa',
        stars: 5,
        location: '보응우옌잡 해안대로, 미안, 다낭',
        badge: '전 객실 100% 개별 프라이빗 풀빌라',
        highlights: ['3~4베드룸 넓은 거실과 침실 구성', '각 빌라 전용 개별 프라이빗 수영장', '완비된 현대식 주방 & 전담 셰프 BBQ 서비스', '미케비치 백사장 바로 앞 위치'],
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80',
        idealFor: '완벽한 프라이버시를 원하는 가족 및 단체'
      },
      {
        id: 'naman-retreat',
        name: 'Naman Retreat & Private Pool Villas',
        category: 'villa',
        stars: 5,
        location: '쯔엉사 해안로, 호아하이, 다낭',
        badge: '천연 대나무 건축 & 웰니스 스파 리조트',
        highlights: ['돌담으로 둘러싸인 완벽한 프라이빗 풀빌라', '투숙객 매일 무료 프리미엄 스파 트리트먼트', '친환경 대나무 건축의 하이하이 레스토랑', '때 묻지 않은 청정 에메랄드 해변'],
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
        idealFor: '지친 일상을 치유하는 힐링 웰니스 여행'
      },
      {
        id: 'novotel-han-river',
        name: 'Novotel Danang Premier Han River',
        category: '5star',
        stars: 5,
        location: '36 박당 대로, 하이쩌우, 다낭',
        badge: '다낭 심장부 한강변의 특급 랜드마크',
        highlights: ['한강과 다낭 시내 360도 파노라마 전망', '도심 속 야외 루프탑 수영장', '다낭 최고층 루프탑 바 Sky36', '다낭 시내 유명 맛집 및 명소 도보 이동'],
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
        idealFor: '비즈니스 및 다낭 도심의 화려한 야경을 선호하는 고객'
      },
      {
        id: 'tms-hotel',
        name: 'TMS Hotel Danang Beach',
        category: '4star',
        stars: 4,
        location: '292 보응우옌잡 해변로, 다낭',
        badge: '미케비치 파노라마 오션뷰 호텔',
        highlights: ['25층 최고층 유리 바닥 루프탑 인피니티 풀', '전 객실 전용 발코니 오션뷰', '해변가 맛집 및 카페 밀집 지역 인접', '친절하고 세심한 한국인 친화 서비스'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
        idealFor: '합리적인 가격으로 최고급 해변 전망을 원하는 여행자'
      }
    ]
  },

  // Section 05 - Local Guide
  localGuide: {
    kicker: 'LOCAL EXPERTISE',
    title: 'Explore Like a Local.',
    subtitle: '단순한 명소 방문을 넘어, 도시의 깊은 이야기를 만나다.',
    lead: 'Super EZ Tour의 다낭 전담 가이드는 베트남 문화와 역사에 능통하고 정식 관광 라이선스를 보유한 정예 한국어 전문 인력입니다. VIP 의전에 최적화된 매너와 유연성으로 품격 있는 여행을 완성합니다.',
    badgeExpert: '중부 베트남 공인 전문 가이드',
    badgeCommitment: '1:1 프라이빗 전담 케어 보장',
    ctaRequest: '프라이빗 가이드 배정 요청',
    pillars: [
      {
        icon: 'Compass',
        title: '100% 우리 일행 단독 전담',
        desc: '모르는 타인과 가이드를 공유하지 않으며, 오직 우리 가족과 일행에게만 전담 집중합니다.'
      },
      {
        icon: 'BookOpen',
        title: '깊이 있는 역사 & 문화 스토리텔링',
        desc: '오행산의 숨겨진 전설부터 호이안 백년 고옥의 이야기까지 유창한 한국어로 생생하게 전해드립니다.'
      },
      {
        icon: 'Clock',
        title: '일정과 속도의 완전한 자율성',
        desc: '마음에 드는 장소에서 얼마든지 더 머물 수 있으며, 늦잠을 자고 싶을 땐 출발 시간을 자유롭게 늦출 수 있습니다.'
      },
      {
        icon: 'Languages',
        title: '유창한 한국어 전담 케어',
        desc: '원활한 한국어 소통은 물론 영어, 현지 베트남어까지 즉각적인 통역 및 맞춤 요청을 지원합니다.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=80',
    quote: '“완벽한 여행은 얼마나 많은 곳을 스쳐 지나갔는가가 아니라, 그 도시의 영혼을 얼마나 깊이 가슴에 담았는가로 완성됩니다.”'
  },

  // Section 06 - Flight Booking & Airport Transit
  flights: {
    kicker: 'SEAMLESS TRANSIT',
    title: 'Your Journey Begins Here.',
    subtitle: '하늘에서 시작되는 편안한 여정 · 대기 없는 프라이빗 공항 픽업 연결.',
    lead: '인천·부산 직항 항공편 최적 시간대 안내부터 다낭 국제공항(DAD) 도착 즉시 전담 기사가 네임피켓으로 영접하여 전용 리무진으로 호텔까지 편안하게 모십니다.',
    hubName: '다낭 국제공항 (DAD)',
    domesticTag: '베트남 국내선 연결',
    domesticTitle: '베트남 주요 도시 - 다낭 노선',
    intlTag: '한국 - 다낭 직항 노선',
    intlTitle: '인천 / 부산 / 대구 직항 운항',
    directBadge: '직항 운항',
    perkBar: 'DAD 공항 입국장 전용 네임피켓 영접 · 100% 프라이빗 에어컨 전용차량',
    ctaConsult: '항공편 & DAD 픽업 서비스 상담',
    domesticRoutes: [
      { from: '하노이 (HAN)', to: '다낭 (DAD)', time: '1시간 20분', frequency: '매일 30회 이상' },
      { from: '호치민 (SGN)', to: '다낭 (DAD)', time: '1시간 25분', frequency: '매일 35회 이상' },
      { from: '하이퐁 (HPH)', to: '다낭 (DAD)', time: '1시간 15분', frequency: '매일 6회 이상' }
    ],
    intlRoutes: [
      { from: '서울 / 인천 (ICN)', to: '다낭 (DAD)', time: '4시간 45분', direct: true },
      { from: '부산 / 김해 (PUS)', to: '다낭 (DAD)', time: '4시간 30분', direct: true },
      { from: '대구 (TAE)', to: '다낭 (DAD)', time: '4시간 35분', direct: true },
      { from: '싱가포르 (SIN)', to: '다낭 (DAD)', time: '2시간 50분', direct: true }
    ],
    perks: [
      '피로도를 최소화하는 최적의 출도착 항공 시간대 맞춤 추천.',
      'DAD 공항 입국장 앞에서 고객님 성함 피켓을 든 전담 기사의 VIP 영접.',
      '기업 단체 및 가족 여행객을 위한 공항 VIP 패스트트랙 수속 연계 지원.'
    ]
  },

  // Section 07 - Private Transportation
  transportation: {
    kicker: 'AUTOMOTIVE LUXURY SHOWCASE',
    title: 'Every Mile. Your Style.',
    subtitle: '이동하는 모든 순간조차 프라이빗한 휴식이 됩니다.',
    description: '100% 2022년 이후 출고된 최신형 차량, 고급 가죽 시트, 독립 듀얼 에어컨, 시원한 생수와 물티슈, 차량 내 무료 Wi-Fi가 완비되어 있습니다.',
    badgeMaintenance: '정기 정밀 안전 점검 완료',
    modelCodeLabel: '대표 차종',
    seatsLabel: '탑승 정원',
    luggageLabel: '수하물 공간',
    featuresHeading: '기본 프리미엄 편의사양:',
    idealBadge: '추천 대상:',
    btnSelected: '✓ 선택 완료',
    btnSelect: '이 차량으로 선택하기',
    vehicles: [
      {
        id: 'suv-7',
        name: '프리미엄 7인승 (SUV / MPV)',
        modelExample: '토요타 포튜너 / 기아 카니발 / 포드 에베레스트',
        seats: '4 - 6명 (최적 4~5명)',
        luggage: '표준 수하물 3 - 5개',
        features: ['독립식 듀얼 에어컨 시스템', '깊은 리클라이닝 가죽 시트', '생수 및 시원한 물티슈 제공', '안전 운전 전문 베테랑 기사'],
        idealFor: '가족 또는 4~5인 소그룹 여행에 가장 쾌적한 선택',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
        angles: [
          'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
        ]
      },
      {
        id: 'van-16',
        name: '모던 16인승 투어 밴',
        modelExample: '포드 트랜짓 프리미엄 / 현대 쏠라티',
        seats: '8 - 12명 탑승 최적',
        luggage: '표준 수하물 8 - 10개',
        features: ['높은 실내 층고와 쾌적한 개방감', '안락한 가죽 시트 및 열별 USB 충전 포트', '장거리 주행에 최적화된 서스펜션', '친절하고 신뢰할 수 있는 전담 기사'],
        idealFor: '3대 대가족 여행, 친목 모임, 골프 투어 그룹',
        image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
        angles: [
          'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
        ]
      },
      {
        id: 'limousine-vip',
        name: 'VIP 비즈니스 리무진 (Dcar VIP)',
        modelExample: 'Dcar 프레지던트 / 현대 쏠라티 리무진 VIP',
        seats: '7 - 9명 VIP 고객',
        luggage: '대형 수하물 6 - 7개',
        features: ['다각도 조절 전동 마사지 캡틴 시트', '천장 은하수 스타라이트 무드등 & 엔터테인먼트 TV', '차량 내 미니 냉장고 및 고속 무선 충전기', '완벽한 사생활 보호 전용 커튼'],
        idealFor: 'VIP 귀빈 영접, 럭셔리 프라이빗 여행, 특별한 가족 휴가',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
        angles: [
          'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
        ]
      },
      {
        id: 'coach-35',
        name: '유니버스 35인승 대형 투어버스',
        modelExample: '타코 유니버스 / 삼코 펠릭스',
        seats: '20 - 28명 탑승 최적',
        luggage: '하부 대형 수하물 적재함 완비',
        features: ['부드러운 에어서스펜션 장착', '고출력 마이크 및 전문 음향 시스템', '135도 리클라이닝 벨벳 시트', '자외선 차단 고급 블라인드'],
        idealFor: '중규모 기업 연수, 동호회 및 MICE 그룹',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'coach-45',
        name: '유니버스 45인승 하이클래스 대형버스',
        modelExample: '현대 유니버스 익스프레스 노블',
        seats: '35 - 42명 탑승 최적',
        luggage: '초대형 화물칸 완비',
        features: ['동급 최고 사양의 프리미엄 대형 리무진 버스', '전 좌석 균일한 강력 냉방 공조 시스템', '최고 책임 한도 승객 종합 보험 가입', '10년 이상 무사고 베테랑 기사 배정'],
        idealFor: '대규모 기업 인센티브 투어 및 국제 행사 그룹',
        image: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=1000&q=80'
      }
    ]
  },

  // Section 08 - Attractions & Experiences (3D Map & Cart)
  attractions: {
    kicker: 'THE DA NANG DISCOVERY ATLAS',
    title: '다낭에서 꼭 가봐야 할 명소',
    subtitle: '3D 위성 지도와 실제 지형 모델로 살펴보는 다낭의 핵심 명소.',
    lead: '가고 싶은 명소를 담아보세요. 피로감 없이 가장 여유롭고 최적화된 동선으로 전담 매니저가 일정을 구성해 드립니다.',
    cartPrefix: '선택된 명소',
    cartSuffix: '개 여행지 담김',
    resetViewText: '다낭 전체 뷰',
    btnInCart: '선택됨 (클릭 시 취소)',
    btnAdd: '이 명소 여행 일정에 담기',
    disclaimer: '다낭 실제 3D 위성 지형 모델 기반 안내. 실제 이동 동선과 투어 스케줄은 고객님의 취향과 여행 리듬에 맞춰 100% 최적화 설계됩니다.',
    items: [
      {
        id: 'ba-na-hills',
        name: '바나힐 & 골든 브릿지',
        category: '세계적인 랜드마크',
        duration: '전일 투어 (1일 소요)',
        slogan: '구름 위 거대한 신의 두 손이 황금빛 비단을 받치고 있는 경이로운 명소.',
        lng: 107.9961,
        lat: 15.9988,
        elevation: '1,487 m',
        bearing: -35,
        pitch: 70,
        zoom: 14.6,
        description: '해발 1,487m 고산에 위치한 프랑스 고성 마을, 기네스북 4개 부문 등재 최장 케이블카, 세계 건축의 찬사를 받은 골든 브릿지를 거니는 환상적인 경험.',
        image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=85',
        tags: ['골든 브릿지', '기네스 케이블카', '프렌치 빌리지', '사계절 기후']
      },
      {
        id: 'my-khe-beach',
        name: '미케 비치 해변',
        category: '세계 6대 청정 해변',
        duration: '아침 또는 늦은 오후',
        slogan: '에메랄드빛 바다와 완만한 곡선을 그리며 펼쳐진 새하얀 백사장.',
        lng: 108.2467,
        lat: 16.0592,
        elevation: '3 m',
        bearing: -75,
        pitch: 65,
        zoom: 15.2,
        description: '포브스 선정 세계 6대 해변. 연중 따뜻하고 투명한 바닷물, 부드러운 백사장에서의 일출 산책과 패들보드 등 해양 액티비티를 만끽하세요.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
        tags: ['해수욕', '미케비치 일출', '패들보드 SUP', '오션뷰 씨푸드']
      },
      {
        id: 'son-tra-peninsula',
        name: '손짜 반도 & 린응사',
        category: '대자연 & 불교 성지',
        duration: '반일 투어 (약 3~4시간)',
        slogan: '다낭 바다를 굽어보며 도시를 품어 안는 푸른 원시림의 산소 탱크.',
        lng: 108.2750,
        lat: 16.1008,
        elevation: '693 m',
        bearing: 40,
        pitch: 68,
        zoom: 14.5,
        description: '바다를 향해 우뚝 솟은 67m 동양 최대 해수관음상과 천년 고찰 린응사, 원시림 속 반코 정상에서 바라보는 다낭 전경 및 희귀 두크원숭이 관찰.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
        tags: ['린응사', '67m 해수관음상', '반코 정상', '두크원숭이 보호구역']
      },
      {
        id: 'marble-mountains',
        name: '오행산 (마블 마운틴)',
        category: '신비로운 석회암 명산',
        duration: '반일 투어 (약 2~3시간)',
        slogan: '바닷가 평야 위에 신비롭게 솟아오른 5개의 천연 대리석 봉우리.',
        lng: 108.2633,
        lat: 16.0044,
        elevation: '106 m',
        bearing: -20,
        pitch: 68,
        zoom: 15.0,
        description: '음양오행을 상징하는 금·목·수·화·토 5개 봉우리. 신비로운 천연 동굴 후옌콩 사원과 논누옥 전통 석조각 마을을 탐방하는 문화 순례 코스.',
        image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=85',
        tags: ['후옌콩 동굴', '땀타이사', '야외 전망 엘리베이터', '논누옥 석조각 마을']
      },
      {
        id: 'dragon-bridge',
        name: '한강 용다리 & 사랑의 부두',
        category: '도시 랜드마크 야경',
        duration: '야간 (저녁 시간대)',
        slogan: '한강 물결 위로 힘차게 비상하는 황금빛 용의 위용.',
        lng: 108.2272,
        lat: 16.0611,
        elevation: '15 m',
        bearing: 25,
        pitch: 65,
        zoom: 15.5,
        description: '다낭 현대 발전의 상징. 매주 금·토·일 저녁 펼쳐지는 용다리 불꽃 및 물 분사 쇼, 낭만적인 한강 디너 크루즈와 화려한 야경을 감상하세요.',
        image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85',
        tags: ['주말 불쇼', '한강 디너 크루즈', '사랑의 다리', '다낭 야경 명소']
      },
      {
        id: 'hai-van-pass',
        name: '하이반 고개 - 천하제일 웅관',
        category: '장엄한 해안 드라이브',
        duration: '반일 투어 (약 3~4시간)',
        slogan: '구름이 머무는 산마루와 코발트빛 바다가 빚어내는 장관.',
        lng: 108.1278,
        lat: 16.1924,
        elevation: '496 m',
        bearing: 110,
        pitch: 72,
        zoom: 14.3,
        description: '다낭과 후에를 잇는 베트남에서 가장 아름다운 해안 고갯길. BBC 탑기어가 선정한 최고의 해안 드라이브 코스로 랑코만의 웅장한 곡선을 조망합니다.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
        tags: ['하이반 관문', '랑코만 조망', '해안 드라이브', '오션뷰 루프탑 카페']
      },
      {
        id: 'hoi-an-ancient-town',
        name: '호이안 올드타운',
        category: '유네스코 세계문화유산',
        duration: '오후 & 야간 투어',
        slogan: '천년의 세월이 흐르는 투본강 물결 위로 피어난 등불의 도시.',
        lng: 108.3265,
        lat: 15.8801,
        elevation: '5 m',
        bearing: -10,
        pitch: 62,
        zoom: 15.2,
        description: '다낭에서 단 30분. 16세기 번영했던 무역항의 원형을 고스란히 간직한 노란 벽돌 골목, 유서 깊은 내원교, 밤마다 투본강을 수놓는 소원배와 야시장.',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85',
        tags: ['유네스코 유산', '일본인 다리 내원교', '투본강 소원등 띄우기', '호이안 야시장']
      }
    ]
  },

  // Section 09 - Culinary Experiences
  culinary: {
    kicker: 'THE ART OF DA NANG CUISINE',
    title: '오감을 깨우는 다낭 미식의 여정',
    subtitle: '한 그릇의 요리에 담긴 중부 베트남의 유구한 문화와 정취.',
    lead: '다낭의 미식은 깊은 산세의 소박한 감칠맛과 동해 바다의 순수하고 신선한 단맛이 완벽한 조화를 이루고 있습니다.',
    badgeText: '개 요리 취향 담김',
    highlightsLabel: '미식 하이라이트:',
    btnChosen: '식사 취향에 추가됨',
    btnAdd: '이 요리 식사 취향에 담기',
    categories: [
      { id: 'all', label: '전체 요리' },
      { id: 'specialty', label: '로컬 대표 미식' },
      { id: 'seafood', label: '신선 활 해산물' },
      { id: 'finedining', label: '파인다이닝' }
    ],
    items: [
      {
        id: 'mi-quang',
        chapter: '01',
        name: 'Mì Quảng Truyền Thống',
        nameKr: '전통 미꽝 국수',
        category: 'specialty',
        categoryLabel: '중부 꽝남 대표 미식',
        slogan: '강황을 넣어 뽑아낸 노란 쌀면과 진한 특제 육수, 고소한 참깨 라이스페이퍼의 조화.',
        desc: '쫄깃한 쌀국수 면에 새우, 돼지고기, 메추리알을 조려낸 깊은 특제 소스를 자작하게 붓고, 바삭한 참깨 라이스페이퍼와 9가지 신선한 야채를 곁들여 먹는 다낭 대표 국수.',
        image: 'https://images.unsplash.com/photo-1790955333423-96ea0abb9b89?auto=format&fit=crop&w=1200&q=85',
        fallbackImage: 'https://upload.wikimedia.org/wikipedia/commons/5/57/M%C3%AC_Qu%E1%BA%A3ng%2C_Da_Nang%2C_Vietnam.jpg',
        spot: '30년 전통의 현지인 최애 미꽝 전문점',
        highlights: ['강황으로 반죽한 황금빛 면발', '짜꾸에 허브 마을의 9가지 신선 야채', '바삭한 전통 참깨 쌀과자', '고소하게 볶아낸 햇땅콩 고명'],
        flavorNotes: '깊은 감칠맛 · 고소함 · 은은한 매콤함 · 바삭한 식감'
      },
      {
        id: 'banh-trang-thit-heo',
        chapter: '02',
        name: 'Bánh Tráng Cuốn Thịt Heo',
        nameKr: '양끝 껍질 수육 라이스페이퍼 쌈',
        category: 'specialty',
        categoryLabel: '다낭 전통 쌈 요리',
        slogan: '양끝 껍질의 쫄깃한 식감을 살린 수육과 햇살에 말린 쫀득한 라이스페이퍼, 매콤한 맘넴 소스.',
        desc: '지방과 살코기, 껍질이 절묘한 비율을 이루는 다이록 돼지고기 수육을 야들야들한 라이스페이퍼에 오이, 바나나꽃, 그린 망고와 함께 싸서 특제 맘넴 소스에 찍어 먹는 별미.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/B%C3%A1nh_tr%C3%A1ng_cu%E1%BB%91n_th%E1%BB%8Bt_heo.jpg',
        fallbackImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/B%C3%A1nh_tr%C3%A1ng_cu%E1%BB%91n_th%E1%BB%8Bt_heo.jpg/1280px-B%C3%A1nh_tr%C3%A1ng_cu%E1%BB%91n_th%E1%BB%8Bt_heo.jpg',
        spot: '원조 다이록 돼지 수육 & 디껀 특제 발효 소스',
        highlights: ['양끝 껍질이 완벽히 살아있는 수육', '쫀득하고 얇은 다이록 라이스페이퍼', '마늘과 고추로 맛을 낸 특제 맘넴 장', '새콤한 스타프루트와 아삭한 야채'],
        flavorNotes: '고소한 육즙 · 아삭하고 상큼함 · 깊은 풍미 · 깔끔한 뒷맛'
      },
      {
        id: 'hai-san-tuoi',
        chapter: '03',
        name: 'Hải Sản Tươi Sống Đánh Bắt Trong Ngày',
        nameKr: '당일 조업 산지 직송 활 해산물 만찬',
        category: 'seafood',
        categoryLabel: '청정 동해 바다의 선물',
        slogan: '새벽 바다 전통 바구니배에서 갓 건져 올린 신선한 바다 본연의 맛.',
        desc: '갈릭 버터 랍스터 구이, 타마린드 소스 크랩 볶음, 생강 향을 머금은 총알오징어 찜, 땅콩 파기름 가리비 구이 등 보응우옌잡 해변가 수조에서 직접 고르는 최상급 해산물 성찬.',
        image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=85',
        fallbackImage: 'https://images.unsplash.com/photo-1559737558-245cb351c4a4?auto=format&fit=crop&w=1200&q=85',
        spot: '정찰제 가격 보장 및 최상급 위생 관리 프리미엄 씨푸드 레스토랑',
        highlights: ['그린 칠리 소금 블랙타이거 새우 구이', '생강 향 가득한 부드러운 오징어 찜', '파기름과 고소한 땅콩 가리비 구이', '수조에서 즉석 선택 후 맞춤 조리'],
        flavorNotes: '탱글탱글한 탄력 · 천연의 단맛 · 은은한 숯불 향 · 바다의 풍미'
      },
      {
        id: 'bun-cha-ca',
        chapter: '04',
        name: 'Bún Chả Cá Đà Nẵng',
        nameKr: '다낭 정통 수제 어묵 쌀국수',
        category: 'specialty',
        categoryLabel: '해안 도시의 소울푸드',
        slogan: '신선한 생선 뼈와 달콤한 단호박으로 우려낸 담백한 육수와 황금빛 수제 삼치 어묵.',
        desc: '바다 생선 뼈, 토마토, 파인애플, 양배추, 단호박을 넣고 푹 끓여 천연의 단맛을 낸 맑고 시원한 육수에 수제로 빚어 튀겨낸 쫄깃한 삼치 어묵을 듬뿍 얹은 아침 대표 국수.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Bun_cha_ca.jpg',
        fallbackImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Bun_cha_ca.jpg/1280px-Bun_cha_ca.jpg',
        spot: '응우옌찌탄 거리의 대를 이은 원조 어묵국수 명가',
        highlights: ['손으로 직접 치대어 빚은 쫄깃한 삼치 어묵', '단호박과 토마토의 달큰하고 시원한 육수', '감칠맛을 더하는 순수 맘루옥 양념', '새콤달콤하게 절인 샬롯 피클'],
        flavorNotes: '시원하고 맑은 단맛 · 쫄깃한 어묵 · 따뜻한 온기 · 개운함'
      },
      {
        id: 'la-maison-1888',
        chapter: '05',
        name: 'Fine Dining Ven Biển & Ẩm Thực Tinh Hoa',
        nameKr: '오션뷰 파인다이닝 & 프렌치-베트남 미식',
        category: 'finedining',
        categoryLabel: '미쉐린 큐레이션 하이엔드',
        slogan: '손짜 만의 황홀한 석양과 촛불 아래 펼쳐지는 프렌치-베트남 마스터피스 만찬.',
        desc: '손짜 만이 내려다보이는 특급 호텔에서 석양을 바라보며 즐기는 낭만적인 캔들라이트 디너. 프랑스 정통 요리 기법과 베트남 최상급 로컬 식재료의 매혹적인 만남.',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85',
        fallbackImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
        spot: '미쉐린 스타 가이드 등재 최고급 다이닝 (사전 예약 필수)',
        highlights: ['예술적인 데귀스타시옹 코스 요리', '엄선된 그랑 크뤼 와인 페어링', '파노라마 오션뷰 프라이빗 테이블', '세계 최고 수준의 VIP 버틀러 서비스'],
        flavorNotes: '섬세함 · 우아한 밸런스 · 낭만적인 여운 · 최고급 품격'
      }
    ]
  },

  // Section 10 - Private Customized Travel Philosophy
  privateValues: {
    kicker: 'PRIVATE TOUR PHILOSOPHY',
    title: 'Your Trip. Your Rules.',
    subtitle: 'VIP 여행객들이 일반 패키지 대신 Super EZ Tour를 선택하는 이유.',
    items: [
      {
        number: '100%',
        title: '100% 프라이빗 투어 — 모르는 사람 동승 0%',
        desc: '이동하는 차량, 식사하는 테이블, 머무는 모든 순간이 오직 고객님과 사랑하는 가족만의 것입니다. 낯선 타인의 방해 없는 온전한 자유를 보장합니다.'
      },
      {
        number: '0%',
        title: '쇼핑 강요 0% 완전 보장 (No Shopping)',
        desc: '계약서로 보증합니다: 리베이트 쇼핑센터 의무 방문이나 불필요한 옵션 강요가 전혀 없으며, 숨은 추가 비용 없이 투명하게 진행됩니다.'
      },
      {
        number: '24/7',
        title: '다낭 현지 직영 운영팀 실시간 밀착 케어',
        desc: 'Super EZ Tour 다낭 현지 지사가 상주하여 여행 중 발생하는 어떠한 돌발 상황이나 추가 요청도 15분 이내에 즉각 해결해 드립니다.'
      },
      {
        number: 'Flex',
        title: '내 템포에 맞춘 100% 유연한 일정 운영',
        desc: '아침에 1시간 더 늦잠을 자고 싶으신가요? 아름다운 해변에서 더 오래 머물고 싶으신가요? 전담 가이드와 기사가 고객님의 리듬에 즉시 맞춥니다.'
      }
    ]
  },

  // Section 11 - Suggested Itineraries (Cinematic Timeline)
  itineraries: [
    {
      id: '4d3n',
      label: '3박 4일 (가장 인기 있는 시그니처)',
      daysCount: 4,
      title: '다낭·바나힐·호이안 유네스코 핵심 일주',
      overview: '미케비치 럭셔리 리조트에서의 온전한 휴식, 바나힐 골든 브릿지의 경이로운 풍경, 호이안 천년 고도의 고즈넉한 정취를 완벽한 밸런스로 담아낸 베스트셀러.',
      days: [
        {
          day: 1,
          title: '다낭 도착 – 공항 프라이빗 픽업 – 손짜 린응사 – 용다리 야경 & 해산물 만찬',
          locationTag: '손짜 반도 & 한강',
          highlights: [
            'DAD 국제공항 도착 즉시 전담 기사의 네임피켓 영접 및 전용차량 탑승',
            '미케비치 5성급 오션뷰 리조트 체크인 및 프라이빗 휴식',
            '손짜 반도 린응사 방문 및 67m 해수관음상 관람',
            '신선한 활 해산물 환영 만찬 & 한강 용다리 주말 불쇼 관람'
          ],
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85'
        },
        {
          day: 2,
          title: '구름 위의 세상 바나힐 & 골든 브릿지 프라이빗 탐방',
          locationTag: '바ナ힐 골든브릿지',
          highlights: [
            '기네스북 등재 케이블카 탑승 및 원시림 조망',
            '인파가 붐비기 전 이른 아침 골든 브릿지에서의 인생샷 촬영',
            '프랑스 고성 마을 프렌치 빌리지 & 백년 역사의 드베 와인 셀러',
            '고급 인터내셔널 뷔페 또는 프라이빗 레스토랑 중식'
          ],
          image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=85'
        },
        {
          day: 3,
          title: '신비의 오행산 – 천년 고도 호이안 올드타운 & 투본강 소원배',
          locationTag: '호이안 올드타운',
          highlights: [
            '오행산 후옌콩 천연 동굴 및 땀타이 사원 탐방',
            '전용 리무진으로 호이안 고대 도시 이동',
            '호이안 전통 미식 카오라우 & 화이트로즈 만찬',
            '투본강 전통 나룻배 탑승 및 오색 소원등 띄우기 체험'
          ],
          image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85'
        },
        {
          day: 4,
          title: '미케비치 일출 산책 – 로컬 카페 힐링 – 공항 샌딩',
          locationTag: '미케비치 & 공항',
          highlights: [
            '새하얀 미케비치 백사장 일출 산책 및 여유로운 리조트 조식',
            '베트남 전통 프리미엄 코코넛 커피 티타임',
            '인증된 베트남 프리미엄 특산품 자유 쇼핑 (강요 없음)',
            '항공편 출발 시간에 맞춘 안전하고 품격 있는 공항 전용 샌딩'
          ],
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85'
        }
      ]
    },
    {
      id: '3d2n',
      label: '2박 3일 (알찬 주말 힐링 투어)',
      daysCount: 3,
      title: '주말을 활용한 다낭 특급 힐링 이스케이프',
      overview: '바쁜 일상 속 짧은 휴가로 다낭의 핵심 명소와 최고급 해변 리조트를 여유롭게 즐기는 콤팩트 프라이빗 일정.',
      days: [
        {
          day: 1,
          title: '다낭 입국 – 전용차량 픽업 – 손짜 반도 & 미케비치',
          locationTag: '손짜 반도 & 미케비치',
          highlights: [
            'DAD 공항 전용 리무진 픽업 및 리조트 체크인',
            '손짜 반도 에메랄드 해안 드라이브 및 일몰 감상',
            '해변가 레스토랑에서 즐기는 낭만적인 씨푸드 디너'
          ],
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85'
        },
        {
          day: 2,
          title: '바나힐 골든 브릿지 – 호이안 올드타운 야경',
          locationTag: '바나힐 & 호이안',
          highlights: [
            '구름 위 신비로운 골든 브릿지 산책 및 케이블카 체험',
            '밤이 되면 등불로 물드는 호이안 올드타운 감상',
            '호이안 전통 명물 요리와 소원등 체험'
          ],
          image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85'
        },
        {
          day: 3,
          title: '리조트 스파 휴식 – 오션뷰 카페 – 공항 샌딩',
          locationTag: '미케비치 & 공항',
          highlights: [
            '리조트 내 프리미엄 아로마 스파 & 수영장 힐링',
            '중부 베트남 특선 드립 커피 티타임',
            '비행기 시간에 맞춘 대기 없는 공항 전용 샌딩'
          ],
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85'
        }
      ]
    },
    {
      id: '5d4n',
      label: '4박 5일 (헤리티지 심층 투어)',
      daysCount: 5,
      title: '다낭·호이안·후에 중부 세계유산 그랜드 투어',
      overview: '다낭의 휴양과 호이안의 낭만, 하이반 고개를 넘어 후에 왕조의 웅장한 역사 유적까지 중부 베트남을 가장 깊이 있게 탐방하는 프리미엄 대장정.',
      days: [
        {
          day: 1,
          title: '다낭 도착 – 5성급 리조트 체크인 & 프라이빗 웰컴 디너',
          locationTag: '미케비치 리조트',
          highlights: [
            '공항 VIP 영접 및 전용 리무진으로 럭셔리 리조트 이동',
            '인피니티 풀에서 즐기는 아름다운 오션뷰 선셋',
            '특급 셰프가 준비한 산지 직송 해산물 웰컴 만찬'
          ],
          image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85'
        },
        {
          day: 2,
          title: '바나힐 골든 브릿지 & 판타지 파크 VIP 투어',
          locationTag: '바나힐 국립공원',
          highlights: [
            '이른 아침 안개 속 신비로운 골든 브릿지 독점 조망',
            '프랑스 고성 건축물 및 판타지 파크 체험',
            '산 정상 파노라마 카페에서 즐기는 애프터눈 티'
          ],
          image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=85'
        },
        {
          day: 3,
          title: '하이반 고개 드라이브 – 유네스코 후에 황궁 투어',
          locationTag: '하이반 & 후에 황궁',
          highlights: [
            'BBC 탑기어가 극찬한 하이반 고갯길과 랑코만 조망',
            '베트남 마지막 왕조의 상징 후에 황궁 & 자금성 탐방',
            '흐엉강(향하)변의 유서 깊은 티엔무 사원 관람'
          ],
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85'
        },
        {
          day: 4,
          title: '오행산 – 바구니배 체험 – 호이안 올드타운 & 메모리즈 쇼',
          locationTag: '오행산 & 호이안',
          highlights: [
            '오행산 대리석 동굴 사원 탐방',
            '바야우 코코넛 숲 전통 바구니배 탑승 체험',
            '투본강 소원배 및 대규모 야외 실경 공연 호이안 메모리즈 관람'
          ],
          image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85'
        },
        {
          day: 5,
          title: '손짜 반도 모닝 커피 – 여유로운 마무리 – 공항 귀국',
          locationTag: '손짜 반도 & 공항',
          highlights: [
            '손짜 반도 탁 트인 바다 전망 카페에서의 여유로운 아침',
            '검증된 베트남 프리미엄 특산품 쇼핑',
            'DAD 국제공항 전용 샌딩 및 출국 수속 지원'
          ],
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85'
        }
      ]
    }
  ],

  // Section 13 - Customer Stories
  customerStoriesTitle: '고객들이 직접 전하는 생생한 여행 이야기',
  customerStoriesSub: 'Super EZ Tour와 함께 특별한 다낭을 경험한 실제 고객님들의 솔직한 후기.',
  customerStories: [
    {
      id: 'story-1',
      author: '이정우 & 박서윤 가족',
      origin: '서울 강남구',
      groupStyle: '3대 가족 여행 (성인 6명, 아이 2명)',
      tripDate: '2024년 10월',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote: '연로하신 부모님과 어린 두 아이가 있어서 일반 패키지는 꿈도 못 꿨는데, Super EZ Tour의 단독 16인승 전용 차량과 친절한 한국어 가이드 덕분에 온 가족이 인생에서 가장 편안한 여행을 보냈습니다. 쇼핑센터 방문 강요가 전혀 없어서 부모님께서 특히 만족해하셨습니다!',
      photos: [
        'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80'
      ]
    },
    {
      id: 'story-2',
      author: '김도현 & 정유진 부부',
      origin: '부산 해운대구',
      groupStyle: '로맨틱 허니문 (부부)',
      tripDate: '2024년 09월',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote: '나만 리트리트 풀빌라에 묵으면서 해변가 프라이빗 캔들라이트 디너를 요청드렸는데, 꽃장식부터 와인까지 완벽하게 세팅해주셨어요. 저희 둘만의 페이스로 일정을 마음대로 조율할 수 있어서 진정한 100% 프라이빗 여행의 진가를 느꼈습니다.',
      photos: [
        'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
      ]
    }
  ],

  // Section 14 - Final CTA
  finalCta: {
    kicker: 'YOUR ADVENTURE AWAITS',
    title: 'DA NANG IS CALLING.',
    lead: '세상에 완전히 똑같은 두 개의 여행은 없습니다.',
    description: '원하시는 여행 스타일을 말씀해 주시면, 30분 이내에 고객님과 소중한 가족만을 위한 독창적인 프라이빗 여행 일정을 완성해 드립니다.',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
    actions: {
      primary: '나만의 여행 만들기',
      secondary: '24시간 한국어 케어: 1900 8899',
      zalo: '카카오톡 실시간 상담',
      kakao: '카카오톡 실시간 상담'
    }
  }
};

/**
 * Returns localized Da Nang configuration.
 * When language === 'ko' (or default), returns the untouched baseline DA_NANG_CONFIG.
 * When language === 'vi', merges DA_NANG_CONFIG with Vietnamese translations while preserving all technical
 * IDs, coordinates, image/model URLs, and technical keys.
 */
export function getLocalizedDaNangConfig(language = 'ko') {
  if (language !== 'vi') {
    return DA_NANG_CONFIG;
  }

  const vi = daNangVi;
  const base = DA_NANG_CONFIG;

  return {
    ...base,
    locale: 'vi',
    name: vi.name || base.name,
    nameEn: vi.nameEn || base.nameEn,
    nameKr: vi.nameKr || base.nameKr,
    subtitle: vi.subtitle || base.subtitle,
    hero: {
      ...base.hero,
      ...vi.hero,
      quickStats: base.hero.quickStats.map((s, i) => ({
        ...s,
        ...(vi.hero?.quickStats?.[i] || {})
      })),
      scrollPrompt: {
        ...base.hero.scrollPrompt,
        ...(vi.hero?.scrollPrompt || {})
      }
    },
    intro: {
      ...base.intro,
      ...vi.intro,
      paragraphs: vi.intro?.paragraphs ? [...vi.intro.paragraphs] : base.intro.paragraphs,
      features: base.intro.features.map((f, i) => ({
        ...f,
        ...(vi.intro?.features?.[i] || {})
      }))
    },
    ecosystem: {
      ...base.ecosystem,
      ...vi.ecosystem,
      services: base.ecosystem.services.map((s, i) => ({
        ...s,
        ...(vi.ecosystem?.services?.[i] || {})
      }))
    },
    accommodation: {
      ...base.accommodation,
      ...vi.accommodation,
      categories: (vi.accommodation?.categories || []).map((c, i) => ({
        ...(base.accommodation.categories?.[i] || {}),
        ...c
      })),
      items: base.accommodation.items.map((item, i) => ({
        ...item,
        ...(vi.accommodation?.items?.[i] || {})
      }))
    },
    localGuide: {
      ...base.localGuide,
      ...vi.localGuide,
      pillars: base.localGuide.pillars.map((p, i) => ({
        ...p,
        ...(vi.localGuide?.pillars?.[i] || {})
      }))
    },
    flights: {
      ...base.flights,
      ...vi.flights,
      perks: vi.flights?.perks ? [...vi.flights.perks] : base.flights.perks,
      domesticRoutes: base.flights.domesticRoutes.map((r, i) => ({
        ...r,
        ...(vi.flights?.domesticRoutes?.[i] || {})
      })),
      intlRoutes: base.flights.intlRoutes.map((r, i) => ({
        ...r,
        ...(vi.flights?.intlRoutes?.[i] || {})
      }))
    },
    transportation: {
      ...base.transportation,
      ...vi.transportation,
      vehicles: base.transportation.vehicles.map((v, i) => ({
        ...v,
        ...(vi.transportation?.vehicles?.[i] || {}),
        features: vi.transportation?.vehicles?.[i]?.features
          ? [...vi.transportation.vehicles[i].features]
          : v.features
      }))
    },
    attractions: {
      ...base.attractions,
      ...vi.attractions,
      items: base.attractions.items.map((item, i) => ({
        ...item,
        ...(vi.attractions?.items?.[i] || {}),
        tags: vi.attractions?.items?.[i]?.tags
          ? [...vi.attractions.items[i].tags]
          : item.tags
      }))
    },
    culinary: {
      ...base.culinary,
      ...vi.culinary,
      categories: (vi.culinary?.categories || []).map((c, i) => ({
        ...(base.culinary.categories?.[i] || {}),
        ...c
      })),
      items: base.culinary.items.map((item, i) => ({
        ...item,
        ...(vi.culinary?.items?.[i] || {}),
        highlights: vi.culinary?.items?.[i]?.highlights
          ? [...vi.culinary.items[i].highlights]
          : item.highlights
      }))
    },
    privateValues: {
      ...base.privateValues,
      ...vi.privateValues,
      items: base.privateValues.items.map((item, i) => ({
        ...item,
        ...(vi.privateValues?.items?.[i] || {})
      }))
    },
    itineraries: base.itineraries.map((it, i) => ({
      ...it,
      ...(vi.itineraries?.[i] || {}),
      days: it.days.map((d, di) => ({
        ...d,
        ...(vi.itineraries?.[i]?.days?.[di] || {}),
        highlights: vi.itineraries?.[i]?.days?.[di]?.highlights
          ? [...vi.itineraries[i].days[di].highlights]
          : d.highlights
      }))
    })),
    customerStories: base.customerStories.map((cs, i) => ({
      ...cs,
      ...(vi.customerStories?.[i] || {})
    })),
    finalCta: {
      ...base.finalCta,
      ...vi.finalCta,
      actions: {
        ...base.finalCta.actions,
        ...(vi.finalCta?.actions || {})
      }
    }
  };
}

export default DA_NANG_CONFIG;
