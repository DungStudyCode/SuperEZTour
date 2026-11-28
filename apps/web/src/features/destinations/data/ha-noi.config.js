/**
 * Super EZ Tour - Destination Configuration: HÀ NỘI (HANOI)
 * The Soul of Vietnam — Cinematic 3D Storytelling & Luxury Editorial Experience
 * Korean / Vietnamese Bilingual Localization Edition
 */

import { HANOI_ATTRACTION_ASSETS } from './hanoiAttractionAssets.js';

export const HA_NOI_CONFIG = {
  id: 'ha-noi',
  slug: 'ha-noi',
  locale: 'ko',
  name: 'Hà Nội',
  nameKr: '하노이',
  nameEn: 'Hanoi',
  country: 'Việt Nam',
  countryKr: '베트남',
  countryCode: 'VN',
  region: 'Miền Bắc',
  regionKr: '북부 수도',
  airportCode: 'HAN',
  tagline: 'The Soul of Vietnam.',
  subTagline: '천년의 유산과 오늘의 삶이 만나는 곳.',
  subTaglineVi: 'Nơi nghìn năm di sản gặp nhịp sống đương đại.',
  description: '호안끼엠 호수의 고즈넉한 물결, 프랑스 식민지 시절의 우아한 건축, 36개 골목 구시가지의 생생한 숨결이 어우러진 베트남의 유서 깊은 심장.',

  // =========================================================================
  // SCENE 01: ARRIVAL PORTAL & OVAL WINDOW ("A City That Awakens Slowly")
  // =========================================================================
  hero: {
    badge: 'SUPER EZ TOUR — VIETNAM',
    badgeSecondary: '100% 프라이빗 투어 · 단독 진행',
    title: 'HANOI',
    subtitle: 'The Soul of Vietnam.',
    headline: '천년의 유산과 오늘의 삶이 만나는 곳.',
    headlineVi: 'Nơi nghìn năm di sản gặp nhịp sống đương đại.',
    description: '100% 단독 프라이빗 투어 · 쇼핑 강요 0% 보장 · 하노이 문화 전문 전담 가이드와 함께하는 독보적인 여정.',
    descriptionVi: '100% tour riêng không ghép đoàn · Cam kết 0% shopping ép buộc · Chuyên viên văn hóa bản địa đồng hành thiết kế riêng.',
    ctaPrimary: '하노이 여행 시작하기',
    ctaPrimaryVi: 'Bắt đầu khám phá Hà Nội',
    ctaGhost: '하노이 탐방 시작하기',
    ctaGhostVi: 'Khám phá Hà Nội',
    posterImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=85',
    overlayOpacity: 0.38,
    quickStats: [
      { label: '천년의 역사', labelVi: 'Lịch sử ngàn năm', value: '1010~' },
      { label: '유네스코 세계유산', labelVi: 'Di sản UNESCO', value: '탕롱 황성' },
      { label: '전통 골목거리', labelVi: 'Phố nghề cổ', value: '36 Phố' },
      { label: '고객 만족도', labelVi: 'Độ hài lòng', value: '99.9%' }
    ],
    // Cinematic Journey Stages inside Airplane Window Portal
    introJourney: {
      stage1: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=2000&q=85', // Approach Hanoi: Hoan Kiem in Morning Mist
      stage2: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=2000&q=85', // Through the Streets of Old Hanoi
      stage3: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=2000&q=85', // St. Joseph Cathedral & Colonial Grandeur
      stage4: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=85'  // Welcome to Hanoi: Panoramic Hero Backdrop
    },
    scrollPrompt: {
      title: '하노이가 당신을 기다립니다.',
      titleVi: 'Hà Nội đang đón chờ bạn.',
      action: '스크롤하여 여정을 시작하세요',
      actionVi: 'Cuộn chuột để bắt đầu hành trình'
    }
  },

  // =========================================================================
  // SCENE 02: FLY THROUGH OLD HANOI ("Through the Streets of Time")
  // =========================================================================
  intro: {
    kicker: 'DISCOVER HANOI · THROUGH THE STREETS OF TIME',
    title: '천년 역사의 골목,\n끝없는 이야기의 시작.',
    titleVi: 'Hành trình qua những tầng không gian ký ức.',
    lead: '붉은 기와와 프랑스식 노란 벽체, 잔잔한 호수와 아침 이슬 머금은 고목들이 빚어내는 아시아에서 가장 우아한 수도.',
    leadVi: 'Nơi mái ngói rêu phong, bờ tường vàng thuộc địa, mặt hồ gợn sóng và những hàng cây cổ thụ hòa quyện tạo nên thủ đô thanh lịch bậc nhất Châu Á.',
    paragraphs: [
      '하노이는 단순한 관광지가 아닙니다. 호안끼엠 호수의 잔잔한 수면에 비치는 거북탑의 새벽 안개, 36개 옛 골목에서 피어오르는 백 년 전통 쌀국수의 그윽한 육수 향기, 그리고 프랑스풍 발코니 너머로 들려오는 정겨운 자전거 벨 소리까지.',
      'Super EZ Tour와 함께라면 대형 버스에 갇힌 단체 관광객의 조급함 없이, 전담 문화 가이드와 함께 시간의 켜를 한 겹씩 천천히 음미할 수 있습니다. 100% 프라이빗 투어만이 선사하는 깊이 있는 교감을 느껴보세요.'
    ],
    paragraphsVi: [
      'Hà Nội không phải nơi để vội vã lướt qua. Đó là khoảnh khắc ngắm Tháp Rùa ẩn hiện trong làn sương sớm Hồ Gươm, hít hà mùi nước dùng phở bò gia truyền phảng phất nơi góc phố cổ, hay lặng nhìn ánh nắng len qua những khung cửa chớp kiểu Pháp.',
      'Đồng hành cùng Super EZ Tour, bạn hoàn toàn tự do khám phá theo nhịp thở của riêng mình. Không đoàn đông ồn ào, không ép buộc mua sắm — từng bước chân đều là trải nghiệm văn hóa sâu lắng được chăm sóc tận tâm.'
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80',
        title: '호안끼엠 호수 & 거북탑',
        titleVi: 'Hồ Hoàn Kiếm & Tháp Rùa',
        caption: 'Hồ Hoàn Kiếm — Trái tim ngàn năm văn hiến và biểu tượng linh thiêng của thủ đô',
        captionKr: '호안끼엠 호수 — 베트남 천년 역사의 고요한 심장이자 영혼의 상징',
        aspect: 'portrait'
      },
      {
        url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80',
        title: '하노이 36 구시가지',
        titleVi: 'Phố Cổ Hà Nội 36 Phố Phường',
        caption: 'Phố Cổ — Những con phố nghề thủ công giàu ký ức và nhịp sống đương đại',
        captionKr: '36 구시가지 — 백 년의 가업과 장인 정신이 살아 숨 쉬는 골목',
        aspect: 'landscape'
      },
      {
        url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1000&q=80',
        title: '성 요셉 성당 & 프랑스 구역',
        titleVi: 'Nhà Thờ Lớn & Khu Phố Pháp',
        caption: 'Nhà Thờ Lớn Hà Nội — Dấu ấn Gothic cổ kính giữa lòng thủ đô',
        captionKr: '성 요셉 대성당 — 19세기 네오고딕 건축과 세련된 카페 문화의 조화',
        aspect: 'square'
      }
    ],
    features: [
      {
        title: '천년 고도의 문화적 깊이',
        titleVi: 'Chiều sâu văn hóa ngàn năm',
        desc: '문묘 국자감, 탕롱 황성, 서호의 고찰 진국사로 이어지는 장엄한 역사 탐방.'
      },
      {
        title: '프렌치 인도차이나 헤리티지',
        titleVi: 'Dấu ấn Indochine cổ điển',
        desc: '오페라 하우스, 메트로폴 호텔, 웅장한 가로수길을 따라 만나는 클래식 건축.'
      },
      {
        title: '세련된 미식과 에그커피 살롱',
        titleVi: 'Ẩm thực tinh hoa & Cà phê trứng',
        desc: '원조 에그커피 하우스부터 100년 전통의 하노이 분짜와 프라이빗 파인다이닝까지.'
      }
    ],
    hudBadge: 'FOCAL POINT · 시그니처 랜드마크',
    hudTitle: '호안끼엠 호수 & 거북탑',
    hudTitleVi: 'Hồ Hoàn Kiếm & Tháp Rùa',
    hudCaption: '푸른 버드나무가 수면을 어루만지고, 잔잔한 물결 위로 떠오르는 거북탑의 고즈넉한 풍경. 하노이의 새벽과 해질녘 가장 아름다운 감성을 선사합니다.',
    hudAltitudeLabel: '호수 둘레',
    hudLengthLabel: '역사적 유래',
    hudArchLabel: '상징성'
  },

  // =========================================================================
  // SCENE 03: HANOI CULTURAL DISCOVERY ("A Living Heritage")
  // =========================================================================
  ecosystem: {
    kicker: 'A LIVING HERITAGE · HANOI CULTURAL DISCOVERY',
    title: '살아 숨 쉬는 천년의 유산,\n깊이 있는 문화 탐방.',
    titleVi: 'Di sản nghìn năm sống động giữa dòng chảy thời gian.',
    subtitle: '단순한 관람을 넘어, 하노이의 예술과 역사, 장인 정신을 1:1로 깊이 교감하는 6대 프라이빗 여정.',
    subtitleVi: 'Khám phá văn hóa đích thực qua 6 trải nghiệm độc bản được cá nhân hóa hoàn toàn.',
    scrollHint: '스크롤하여 6대 문화 여정 살펴보기 →',
    ctaDetail: '문화 여정 선택하기',
    ctaDetailVi: 'Chi tiết trải nghiệm',
    services: [
      {
        id: 'van-mieu',
        number: '01',
        title: '문묘 국자감 (최초의 국립대학)',
        titleVi: 'Văn Miếu – Quốc Tử Giám',
        titleEn: 'Temple of Literature',
        desc: '1070년 창건된 베트남 최초의 대학. 82개 진사제명비와 고요한 규문각 정원을 거닐며 만나는 유교 학문의 숨결.',
        image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=900&q=80',
        targetId: 'attractions'
      },
      {
        id: 'thang-long',
        number: '02',
        title: '탕롱 황성 (유네스코 세계문화유산)',
        titleVi: 'Hoàng Thành Thăng Long',
        titleEn: 'Imperial Citadel of Thang Long',
        desc: '13세기 리 왕조부터 베트남 왕권의 중심이었던 성스러운 황성. 도안몬 정문과 지하 군사작전실을 단독 투어로 탐방.',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80',
        targetId: 'attractions'
      },
      {
        id: 'opera-house',
        number: '03',
        title: '하노이 오페라 하우스 & 프랑스 구역',
        titleVi: 'Nhà Hát Lớn & Khu Phố Pháp',
        titleEn: 'Hanoi Opera House & French Quarter',
        desc: '파리 오페라 가르니에를 본떠 1911년 완성된 네오클래식 걸작. 웅장한 가로수길과 우아한 옐로 팰리스를 전용 차량으로 순회.',
        image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=900&q=80',
        targetId: 'attractions'
      },
      {
        id: 'bat-trang',
        number: '04',
        title: '바트랑 500년 도자기 마을',
        titleVi: 'Làng Gốm Bát Tràng',
        titleEn: 'Bat Trang Ancient Pottery Village',
        desc: '홍강 유역에서 14세기부터 이어져 온 전통 도예 명가. 전담 도예 명장의 지도 아래 나만의 도자기를 빚는 프라이빗 워크숍.',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80',
        targetId: 'attractions'
      },
      {
        id: 'water-puppet',
        number: '05',
        title: '전통 수상인형극 VIP 프라이빗 좌석',
        titleVi: 'Múa Rối Nước Truyền Thống',
        titleEn: 'Traditional Water Puppet Theatre',
        desc: '11세기 홍강 삼각주 농경 문화에서 탄생한 독창적 공연 예술. 탕롱 극장 VIP 좌석에서 생생한 전통 라이브 국악과 함께 감상.',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80',
        targetId: 'attractions'
      },
      {
        id: 'old-quarter-crafts',
        number: '06',
        title: '36 골목길 장인 가업 탐방 & 에그커피',
        titleVi: '36 Phố Nghề & Cà Phê Trứng',
        titleEn: 'Old Quarter Crafts & Egg Coffee Salon',
        desc: '은세공의 항박, 전통 한약의 란옹 등 골목마다 다른 직업의 역사. 숨겨진 3대 전통 에그커피 살롱에서 즐기는 티타임.',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
        targetId: 'culinary'
      }
    ]
  },

  // =========================================================================
  // SCENE 04: LUXURY STAYS IN HANOI ("Heritage Meets Hospitality")
  // =========================================================================
  accommodation: {
    kicker: 'HERITAGE MEETS HOSPITALITY',
    title: 'Stay in Living History.',
    titleVi: 'Nghỉ dưỡng giữa lòng di sản sống.',
    description: '1901년의 프렌치 헤리티지를 간직한 전설적인 메트로폴부터 오페라 하우스 앞 카펠라, 서호의 수상 파빌리온까지 엄선된 럭셔리 숙소.',
    descriptionVi: 'Tuyển chọn các khách sạn di sản 5 sao mang tính biểu tượng lịch sử và nghệ thuật kiến trúc tinh tế nhất Hà Nội.',
    allLabel: '모든 호텔 보기',
    allLabelVi: 'Tất cả khách sạn',
    categories: [
      { id: 'heritage', label: '헤리티지 럭셔리', labelVi: 'Khách sạn Di sản' },
      { id: 'boutique', label: '아트 부티크', labelVi: 'Art Boutique' },
      { id: 'lakeside', label: '서호 레이크사이드', labelVi: 'Ven Hồ Tây' }
    ],
    items: [
      {
        id: 'sofitel-metropole',
        category: 'heritage',
        name: '소피텔 레전드 메트로폴 하노이',
        nameVi: 'Sofitel Legend Metropole Hanoi',
        title: 'Sofitel Legend Metropole Hanoi',
        type: '5성급 럭셔리 헤리티지 호텔',
        typeVi: 'Khách sạn di sản 5 sao huyền thoại (Từ 1901)',
        stars: 5,
        rating: 4.98,
        location: '하노이 오페라 하우스 인근 · 프랑스 구역',
        locationVi: '15 Ngô Quyền, Hoàn Kiếm, Hà Nội',
        desc: '1901년에 문을 연 아시아에서 가장 상징적인 호텔 중 하나. 찰리 채플린, 그레이엄 그린이 머물렀던 프렌치 윙과 현대적 감각의 오페라 윙이 선사하는 궁극의 품격.',
        descVi: 'Khách sạn 5 sao mang tính lịch sử từ năm 1901, nơi lưu giữ tinh hoa kiến trúc Pháp cổ điển và hầm trú ẩn lịch sử huyền thoại.',
        highlights: [
          '프렌치 윙 헤리티지 스위트 룸',
          '지하 방공호 역사 프라이빗 투어',
          '르 보리외 프렌치 파인다이닝'
        ],
        quote: '“100년 전 인도차이나의 우아함이 고스란히 숨 쉬는 살아있는 역사 박물관.”',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80'
      },
      {
        id: 'capella-hanoi',
        category: 'boutique',
        name: '카펠라 하노이',
        nameVi: 'Capella Hanoi',
        title: 'Capella Hanoi (Bill Bensley Design)',
        type: '5성급 울트라 럭셔리 부티크',
        typeVi: 'Khách sạn nghệ thuật 5 sao Bill Bensley',
        stars: 5,
        rating: 4.97,
        location: '오페라 하우스 도보 3분 · 호안끼엠',
        locationVi: '11 Lê Phụng Hiểu, Hoàn Kiếm, Hà Nội',
        desc: '천재 건축가 빌 벤슬리가 1920년대 오페라의 황금기를 오마주하여 완성한 걸작. 객실마다 오페라 무대의 주인공이 된 듯한 환상적인 인테리어와 미쉐린 다이닝.',
        descVi: 'Kiệt tác nghệ thuật của KTS Bill Bensley tái hiện kỷ nguyên hoàng kim của Opera những năm 1920, sở hữu nhà hàng Michelin cao cấp.',
        highlights: [
          '47개 개별 테마의 오페라 스위트',
          '미쉐린 1스타 히바나 바이 코키',
          '오페라 하우스 앞 프라이빗 테라스'
        ],
        quote: '“오페라와 건축 예술이 만나는 가장 화려하고 감각적인 부티크 스테이.”',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80'
      },
      {
        id: 'intercon-westlake',
        category: 'lakeside',
        name: '인터컨티넨탈 하노이 웨스트레이크',
        nameVi: 'InterContinental Hanoi Westlake',
        title: 'InterContinental Hanoi Westlake',
        type: '5성급 레이크사이드 파빌리온 리조트',
        typeVi: 'Resort 5 sao nổi trên mặt nước Hồ Tây',
        stars: 5,
        rating: 4.95,
        location: '서호 수면 위 · 김마 인근',
        locationVi: '05 Từ Hoa, Tây Hồ, Hà Nội',
        desc: '하노이에서 가장 넓은 서호(West Lake) 수면 위에 지어진 평온한 수상 파빌리온. 800년 된 김련사(Kim Lien) 사원 옆에서 만나는 도심 속 물 위의 휴식.',
        descVi: 'Khách sạn độc đáo với các pavilion sang trọng xây nổi hoàn toàn trên mặt nước Hồ Tây thơ mộng, kề bên chùa Kim Liên cổ kính.',
        highlights: [
          '서호 수면 위 수상 파빌리온 객실',
          '선셋 바(Sunset Bar) 프라이빗 칵테일',
          '도심 속 온전한 고요와 호수 뷰'
        ],
        quote: '“서호의 잔잔한 물결 위에서 노을을 바라보며 만나는 완벽한 휴식.”',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80'
      },
      {
        id: 'oriental-jade',
        category: 'heritage',
        name: '디 오리엔탈 제이드 호텔',
        nameVi: 'The Oriental Jade Hotel',
        title: 'The Oriental Jade Hotel & Spa',
        type: '부티크 럭셔리 호텔',
        typeVi: 'Khách sạn boutique sang trọng phố cổ',
        stars: 5,
        rating: 4.96,
        location: '호안끼엠 호수 도보 2분 · 항쫑 거리',
        locationVi: '94 Hàng Trống, Hoàn Kiếm, Hà Nội',
        desc: '호안끼엠 호수 바로 옆 유서 깊은 항쫑 거리에 위치하여 호수 전경과 구시가지의 매력을 동시에 품은 최고급 부티크 호텔. 루프탑 인피니티 풀에서 즐기는 호안끼엠 파노라마.',
        descVi: 'Tọa lạc trên phố Hàng Trống danh tiếng, sở hữu hồ bơi vô cực trên tầng thượng ngắm trọn vẹn toàn cảnh Hồ Gươm.',
        highlights: [
          '호안끼엠 호수 조망 루프탑 풀',
          '구시가지 36골목 도보 접근성 우수',
          '오리엔탈 시그니처 웰니스 스파'
        ],
        quote: '“호안끼엠 호수의 물결과 구시가지의 밤풍경이 한눈에 내려다보이는 위치.”',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80'
      }
    ]
  },

  // =========================================================================
  // SCENE 05: PRIVATE LOCAL GUIDE ("Hanoi Through Local Eyes")
  // =========================================================================
  localGuide: {
    kicker: 'TRAVEL DOCUMENTARY · HANOI THROUGH LOCAL EYES',
    title: 'Explore Like a Local.',
    titleVi: 'Hà Nội qua lăng kính người bản địa.',
    subtitle: '백 년의 역사가 깃든 골목, 예술가의 숨은 아틀리에, 그리고 비밀스러운 전통 찻집까지.',
    subtitleVi: 'Chuyên viên bản địa tận tâm mở ra những góc nhìn văn hóa sâu sắc không có trên cẩm nang du lịch thông thường.',
    quote: '“하노이는 빠르게 지나치는 도시가 아닙니다. 좁은 골목길에 깃든 백 년의 기억을 귀 기울여 들을 때 비로소 그 진정한 아름다움이 보입니다.”',
    quoteVi: '“Hà Nội không phải nơi để đi lướt qua. Khi bạn chậm lại để lắng nghe tiếng chuông nhà thờ, ngắm ánh nắng xiên qua khung cửa chớp cổ, thành phố này mới thực sự mở lòng.”',
    coords: "21°02'N · 105°51'E",
    stampText: 'LOCAL HERITAGE & DOCUMENTARY ARCHIVE · HANOI',
    badgeExpert: '하노이 공인 역사·문화 전담 가이드',
    badgeCommitment: '100% 단독 1:1 일정 조율 · 쇼핑 0% 보장',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    subImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    pillars: [
      {
        icon: 'Compass',
        title: '골목 심층 도보 투어',
        titleVi: 'Walking Tour Phố Cổ Chiều Sâu',
        desc: '36개 구시가지의 숨겨진 장인 공방과 백 년 고택을 현지인의 눈으로 탐방합니다.'
      },
      {
        icon: 'BookOpen',
        title: '프렌치 인도차이나 건축 해설',
        titleVi: 'Thuyết Minh Kiến Trúc Đông Dương',
        desc: '프랑스 식민지 시절 건축 양식과 베트남 전통 양식의 융합을 전문적으로 들려드립니다.'
      },
      {
        icon: 'Languages',
        title: '완벽한 1:1 한국어 의사소통',
        titleVi: 'Đồng Hành Chuyên Nghiệp 1:1',
        desc: '한국어에 능통한 공인 가이드가 가족의 컨디션에 맞춰 유연하게 동선을 리드합니다.'
      },
      {
        icon: 'Clock',
        title: '내 템포에 맞춘 여유로운 시간',
        titleVi: 'Linh Hoạt Tuyệt Đối Theo Ý Bạn',
        desc: '사진 촬영, 카페 휴식, 갤러리 감상 등 원하는 만큼 머물 수 있는 프라이빗 자유.'
      }
    ]
  },

  // =========================================================================
  // SCENE 06: AVIATION & PRIVATE VEHICLE SHOWROOM ("Seamless Arrival")
  // =========================================================================
  flights: {
    kicker: 'NOI BAI INTERNATIONAL AIRPORT (HAN)',
    title: 'Your Journey Begins Here.',
    titleVi: 'Hạ cánh êm ái, kết nối liền mạch.',
    subtitle: '인천, 김해, 대구 등 한국 주요 공항에서 직항으로 노이바이 공항(HAN) 도착. 입국 게이트에서 전용 기사님이 1:1로 영접합니다.',
    subtitleVi: 'Đón tiễn sân bay Nội Bài HAN bằng xe riêng sang trọng, hành trình êm ái về thẳng khách sạn trung tâm không cần chờ đợi.',
    hubName: '노이바이 국제공항 (HAN)',
    hubCode: 'HAN',
    domesticTag: '국내선 연결',
    domesticTitle: '베트남 전역에서 수도 하노이로 직결',
    domesticRoutes: [
      { from: '다낭 (DAD)', time: '1시간 20분' },
      { from: '호치민 (SGN)', time: '2시간 05분' },
      { from: '푸꾸옥 (PQC)', time: '2시간 15분' },
      { from: '나트랑 (CXR)', time: '1시간 50분' }
    ],
    internationalTag: '한국 출발 직항편',
    internationalTitle: '매일 다수의 편리한 직항 스케줄',
    internationalRoutes: [
      { from: '인천 (ICN)', time: '약 4시간 30분 · 대한항공, 아시아나, 베트남항공 직항' },
      { from: '부산 (PUS)', time: '약 4시간 15분 · 베트남항공, 비엣젯 직항' },
      { from: '대구 (TAE)', time: '약 4시간 20분 · 정기 직항편 운항' }
    ]
  },

  transportation: {
    kicker: 'AUTOMOTIVE LUXURY FLEET · HANOI',
    title: 'Every Mile. Your Style.',
    titleVi: 'Mỗi dặm đường, trọn vẹn tiện nghi riêng tư.',
    subtitle: '100% 2022년식 이상 신형 전용 차량 · 노이바이 공항 픽업부터 구시가지 및 근교 바트랑까지 전담 기사님의 정중한 안전 운행.',
    subtitleVi: 'Đội xe riêng đời mới 2022+ sang trọng, ghế da êm ái, điều hòa mát rượi và tài xế chuyên nghiệp am hiểu đường phố thủ đô.',
    badgeMaintenance: '매일 운행 전 청결 소독 & 안전 점검',
    seatsLabel: '탑승 정원',
    vehicles: [
      {
        id: 'suv-7',
        name: '프리미엄 7인승 SUV (카니발 / 포드 에베레스트)',
        nameVi: 'Xe 7 Chỗ VIP (Kia Carnival / Everest)',
        desc: '가족 및 2~4인 소규모 프라이빗 여행에 가장 완벽한 선택. 넓은 레그룸과 독립 리클라이닝 시트.',
        seats: '2~4인 추천 (최대 6인)',
        luggage: '대형 수하물 4개',
        features: ['독립 캡틴 시트', '초고속 와이파이 & 충전 포트', '생수 및 물티슈 상시 구비'],
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'van-16',
        name: '이그제큐티브 16인승 밴 (현대 쏠라티 / 포드 트랜짓)',
        nameVi: 'Xe 16 Chỗ Tiêu Chuẩn Cao Cấp (Solati / Transit)',
        desc: '대가족 또는 5~10인 단체 여정을 위한 넉넉한 공간. 높은 전고로 서서 이동 가능하며 대형 트렁크 완비.',
        seats: '5~10인 추천 (최대 15인)',
        luggage: '대형 수하물 10개',
        features: ['높은 실내 층고', '독립 에어컨 벤트', '넉넉한 골프백 및 수하물 수납'],
        image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'limousine-vip',
        name: 'VIP 프레지던트 리무진 (DCar 9인승)',
        nameVi: 'Limousine VIP DCar 9 Chỗ Hạng Nhất',
        desc: '항공기 퍼스트 클래스를 연상시키는 최고급 가죽 마사지 체어와 앰비언트 무드 라이팅을 갖춘 럭셔리 의전 차량.',
        seats: '4~7인 추천 (초호화)',
        luggage: '대형 수하물 6개',
        features: ['전동 리클라이닝 마사지 체어', '스마트 TV & 프리미엄 사운드', '미니 냉장고 & 프라이빗 커튼'],
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },

  // =========================================================================
  // SCENE 06: INTERACTIVE TRAVEL ATLAS ("Khám phá Hà Nội" / "하노이를 발견하다")
  // =========================================================================
  attractions: {
    kicker: 'THE HANOI DISCOVERY ATLAS',
    title: '나만의 방식으로 만나는 하노이',
    titleVi: 'Hà Nội, theo cách của bạn.',
    subtitle: '하노이의 특별한 매력을 담은 명소를 발견해 보세요.',
    subtitleVi: 'Khám phá những tọa độ mang dấu ấn thủ đô.',
    mapCenter: [105.870, 21.015],
    defaultZoom: 11.8,
    overviewCamera: {
      center: [105.870, 21.015],
      zoom: 11.8,
      pitch: 28,
      bearing: 0,
      fitBounds: true,
      fitBoundsPadding: { top: 40, bottom: 40, left: 40, right: 40 },
      maxFitZoom: 12.6
    },
    terrain: {
      enabled: false,
      exaggeration: 0
    },
    presentation: {
      layoutVariant: 'travel-atlas',
      density: 'compact',
      motionPreset: 'cinematic',
      scrollExperience: {
        enabled: true,
        mode: 'landmark-discovery',
        desktopOnly: true,
        adaptivePin: true,
        allowManualOverride: true,
        reducedMotionFallback: 'natural-scroll',
        entryHoldVh: 65,
        discoveryVh: 190,
        exitHoldVh: 85
      }
    },
    features: {
      pinSection: false,
      showElevation: false,
      showLiveBadge: false,
      showAmbientGrid: false,
      showFilters: true,
      showPreviousNext: true,
      showSelectionSummary: true,
      showDuration: true,
      showPhotoAttribution: true,
      enableStyleSwitching: false,
      markerVariant: 'numbered',
      cooperativeGestures: true,
      lazyInit: true
    },
    defaultSelectedAttractions: [],
    resetViewText: '전체 지도 보기',
    resetViewTextVi: 'Toàn cảnh Hà Nội',
    atlasName: 'THE HANOI ATLAS',
    cartPrefix: '선택한 명소',
    cartPrefixVi: 'Đã chọn',
    cartSuffix: '곳',
    cartSuffixVi: 'địa điểm',
    btnAdd: '여행에 추가하기',
    btnAddVi: 'Thêm vào chuyến đi',
    btnInCart: '여행에 추가됨',
    btnInCartVi: 'Đã thêm vào chuyến đi',
    btnRemove: '여행에서 제거하기',
    btnRemoveVi: 'Bỏ khỏi chuyến đi',
    disclaimer: '지도 상의 위치는 이해를 돕기 위한 안내이며, 실제 일정과 이동 동선은 여행 스타일에 맞춰 유연하게 조율됩니다.',
    disclaimerVi: 'Vị trí trên bản đồ mang tính tham khảo trực quan; lộ trình tham quan thực tế được điều chỉnh linh hoạt theo nhịp độ chuyến đi của bạn.',
    categories: [
      { id: 'all', labelKo: '전체', labelVi: 'Tất cả' },
      { id: 'heritage', labelKo: '유산', labelVi: 'Di sản' },
      { id: 'culture', labelKo: '문화', labelVi: 'Văn hóa' },
      { id: 'nature', labelKo: '자연', labelVi: 'Thiên nhiên' },
      { id: 'architecture', labelKo: '건축', labelVi: 'Kiến trúc' },
      { id: 'experience', labelKo: '체험', labelVi: 'Trải nghiệm' }
    ],
    items: [
      {
        id: 'hoan-kiem-lake',
        name: '호안끼엠 호수 & 응옥선 사당',
        nameKr: '호안끼엠 호수 & 응옥선 사당',
        nameVi: 'Hồ Hoàn Kiếm & Đền Ngọc Sơn',
        categoryId: 'heritage',
        categoryIds: ['heritage', 'culture', 'nature'],
        category: '유산 · 자연',
        categoryVi: 'Di sản · Thiên nhiên',
        lng: 105.8525,
        lat: 21.0285,
        zoom: 15.2,
        pitch: 32,
        bearing: 0,
        routeIndex: '01',
        durationKo: '권장 관람: 45–90분 (참고)',
        durationVi: 'Thời gian gợi ý: 45–90 phút',
        description: '붉은 테훅 다리를 건너 응옥선 사당으로 이어지는 하노이의 중심 호수. 호숫가 산책로를 따라 수도의 평온한 일상을 마주할 수 있습니다.',
        descriptionVi: 'Không gian hồ nước trung tâm gắn với cầu Thê Húc đỏ thắm và đền Ngọc Sơn cổ kính, nơi du khách cảm nhận nhịp sống thư thái giữa lòng thủ đô.',
        experiencesKo: [
          '호안끼엠 호수 둘레길 산책',
          '응옥선 사당 및 테훅 다리 탐방',
          '하노이 도심 고유의 문화 공간 감상'
        ],
        experiencesVi: [
          'Dạo bộ quanh Hồ Gươm',
          'Tham quan đền Ngọc Sơn',
          'Khám phá không gian văn hóa trung tâm Hà Nội'
        ],
        tags: ['호수 산책', '응옥선 사당', '도심 문화'],
        tagsVi: ['Dạo bộ Hồ Gươm', 'Đền Ngọc Sơn', 'Không gian văn hóa'],
        image: HANOI_ATTRACTION_ASSETS['hoan-kiem-lake'].desktopSrc,
        mobileImage: HANOI_ATTRACTION_ASSETS['hoan-kiem-lake'].mobileSrc,
        assetMeta: HANOI_ATTRACTION_ASSETS['hoan-kiem-lake']
      },
      {
        id: 'old-quarter',
        name: '하노이 구시가지',
        nameKr: '하노이 구시가지',
        nameVi: 'Phố cổ Hà Nội',
        categoryId: 'culture',
        categoryIds: ['culture', 'architecture', 'experience'],
        category: '문화 · 체험',
        categoryVi: 'Văn hóa · Trải nghiệm',
        lng: 105.8510,
        lat: 21.0345,
        zoom: 15.4,
        pitch: 30,
        bearing: -8,
        routeIndex: '02',
        durationKo: '권장 관람: 90–150분 (참고)',
        durationVi: 'Thời gian gợi ý: 90–150 phút',
        description: '오랜 상업 역사를 간직한 옛 장인 거리와 좁고 깊은 전통 튜브 하우스 건축, 골목마다 숨은 카페와 현지 미식이 살아 숨 쉬는 공간입니다.',
        descriptionVi: 'Khu phố nghề lâu đời với những dãy nhà ống đặc trưng, góc phố giao thương nhộn nhịp cùng nét văn hóa cà phê và ẩm thực đường phố Hà Nội.',
        experiencesKo: [
          '전통 직업 골목(36거리) 탐방',
          '고유의 튜브 하우스 건축 관찰',
          '현지 커피와 로컬 미식 체험'
        ],
        experiencesVi: [
          'Khám phá các phố nghề',
          'Quan sát kiến trúc nhà ống',
          'Thưởng thức cà phê và ẩm thực địa phương'
        ],
        tags: ['전통 거리', '튜브 하우스', '로컬 카페'],
        tagsVi: ['Phố nghề', 'Nhà ống cổ', 'Cà phê & Ẩm thực'],
        image: HANOI_ATTRACTION_ASSETS['old-quarter'].desktopSrc,
        mobileImage: HANOI_ATTRACTION_ASSETS['old-quarter'].mobileSrc,
        assetMeta: HANOI_ATTRACTION_ASSETS['old-quarter']
      },
      {
        id: 'van-mieu',
        name: '문묘 – 국자감',
        nameKr: '문묘 – 국자감',
        nameVi: 'Văn Miếu – Quốc Tử Giám',
        categoryId: 'heritage',
        categoryIds: ['heritage', 'culture', 'architecture'],
        category: '유산 · 건축',
        categoryVi: 'Di sản · Kiến trúc',
        lng: 105.8355,
        lat: 21.0278,
        zoom: 15.5,
        pitch: 32,
        bearing: 10,
        routeIndex: '03',
        durationKo: '권장 관람: 45–90분 (참고)',
        durationVi: 'Thời gian gợi ý: 45–90 phút',
        description: '고목이 우거진 고요한 정원 안에 규문각과 진사제명비원이 자리한 유서 깊은 학문의 전당으로, 베트남의 학구열과 전통 건축미를 전합니다.',
        descriptionVi: 'Quần thể di tích nho học tiêu biểu với Khuê Văn Các, giếng Thiên Quang và vườn bia Tiến sĩ trầm mặc dưới tán cây cổ thụ.',
        experiencesKo: [
          '규문각(Khuê Văn Các) 건축 감상',
          '베트남 전통 학문·교육 역사 이해',
          '진사제명비원(Bia Tiến sĩ) 관람'
        ],
        experiencesVi: [
          'Khám phá Khuê Văn Các',
          'Tìm hiểu truyền thống hiếu học',
          'Tham quan khu bia Tiến sĩ'
        ],
        tags: ['규문각', '유교 유산', '진사제명비'],
        tagsVi: ['Khuê Văn Các', 'Truyền thống hiếu học', 'Bia Tiến sĩ'],
        image: HANOI_ATTRACTION_ASSETS['van-mieu'].desktopSrc,
        mobileImage: HANOI_ATTRACTION_ASSETS['van-mieu'].mobileSrc,
        assetMeta: HANOI_ATTRACTION_ASSETS['van-mieu']
      },
      {
        id: 'thang-long-citadel',
        name: '탕롱 황성',
        nameKr: '탕롱 황성',
        nameVi: 'Hoàng thành Thăng Long',
        categoryId: 'heritage',
        categoryIds: ['heritage', 'culture'],
        category: '유산 · 역사',
        categoryVi: 'Di sản · Văn hóa',
        lng: 105.8406,
        lat: 21.0342,
        zoom: 15.3,
        pitch: 32,
        bearing: -6,
        routeIndex: '04',
        durationKo: '권장 관람: 90–120분 (참고)',
        durationVi: 'Thời gian gợi ý: 90–120 phút',
        description: '여러 왕조에 걸친 수도의 역사가 겹겹이 보존된 유적지. 웅장한 도안몬 정문과 고고학 유적을 통해 천년 왕도의 위상을 살펴볼 수 있습니다.',
        descriptionVi: 'Quần thể di tích lưu giữ dấu ấn nhiều triều đại kinh thành Thăng Long xưa, nổi bật với cổng Đoan Môn cổ kính và các lớp tích lịch sử.',
        experiencesKo: [
          '도안몬(Đoan Môn) 성문 관람',
          '황성 내 역사·고고학 유적 탐방',
          '탕롱 왕조 문화유산 이해'
        ],
        experiencesVi: [
          'Tham quan Đoan Môn',
          'Khám phá dấu tích lịch sử',
          'Tìm hiểu di sản kinh thành Thăng Long'
        ],
        tags: ['도안몬', '역사 유적', '왕실 유산'],
        tagsVi: ['Đoan Môn', 'Dấu tích lịch sử', 'Di sản Thăng Long'],
        image: HANOI_ATTRACTION_ASSETS['thang-long-citadel'].desktopSrc,
        mobileImage: HANOI_ATTRACTION_ASSETS['thang-long-citadel'].mobileSrc,
        assetMeta: HANOI_ATTRACTION_ASSETS['thang-long-citadel']
      },
      {
        id: 'st-joseph-cathedral',
        name: '하노이 성 요셉 대성당',
        nameKr: '하노이 성 요셉 대성당',
        nameVi: 'Nhà thờ Lớn Hà Nội',
        categoryId: 'architecture',
        categoryIds: ['architecture', 'culture'],
        category: '건축 · 문화',
        categoryVi: 'Kiến trúc · Văn hóa',
        lng: 105.8494,
        lat: 21.0288,
        zoom: 15.6,
        pitch: 32,
        bearing: 8,
        routeIndex: '05',
        durationKo: '권장 관람: 30–45분 (참고)',
        durationVi: 'Thời gian gợi ý: 30–45 phút',
        description: '세월의 흔적이 깃든 네오고딕 양식의 쌍둥이 종탑이 인상적인 성당. 주변 냐쭝(Nhà Chung) 거리의 아늑한 카페 문화가 어우러진 명소입니다.',
        descriptionVi: 'Công trình kiến trúc Gothic cổ kính với hai tháp chuông đặc trưng, nằm giữa khu phố Nhà Chung rợp bóng cây và nhịp sống cà phê thư thái.',
        experiencesKo: [
          '네오고딕 성당 외관 건축 감상',
          '냐쭝(Nhà Chung) 골목 산책',
          '성당 주변 노천 카페에서 휴식'
        ],
        experiencesVi: [
          'Chiêm ngưỡng kiến trúc Gothic',
          'Khám phá khu phố Nhà Chung',
          'Thưởng thức cà phê quanh khu vực'
        ],
        tags: ['고딕 건축', '냐쭝 거리', '카페 문화'],
        tagsVi: ['Kiến trúc Gothic', 'Phố Nhà Chung', 'Cà phê phố cổ'],
        image: HANOI_ATTRACTION_ASSETS['st-joseph-cathedral'].desktopSrc,
        mobileImage: HANOI_ATTRACTION_ASSETS['st-joseph-cathedral'].mobileSrc,
        assetMeta: HANOI_ATTRACTION_ASSETS['st-joseph-cathedral']
      },
      {
        id: 'opera-house',
        name: '하노이 오페라 하우스',
        nameKr: '하노이 오페라 하우스',
        nameVi: 'Nhà hát Lớn Hà Nội',
        categoryId: 'architecture',
        categoryIds: ['architecture', 'culture'],
        category: '건축 · 문화',
        categoryVi: 'Kiến trúc · Văn hóa',
        lng: 105.8576,
        lat: 21.0245,
        zoom: 15.5,
        pitch: 32,
        bearing: -12,
        routeIndex: '06',
        durationKo: '권장 관람(외관 중심): 20–45분 (참고)',
        durationVi: 'Thời gian gợi ý: 20–45 phút (tham quan bên ngoài)',
        description: '우아한 프랑스식 네오클래식 외관과 넓은 광장이 돋보이는 랜드마크. 짱띠엔(Tràng Tiền) 일대의 세련된 문화와 건축 풍경을 만날 수 있습니다.',
        descriptionVi: 'Công trình mang dấu ấn kiến trúc Pháp cổ điển nổi bật bên quảng trường rộng mở, kết nối hài hòa với không gian văn hóa khu Tràng Tiền.',
        experiencesKo: [
          '프렌치 클래식 외관 건축 감상',
          '오페라 하우스 광장 산책',
          '짱띠엔 일대 문화 거리 탐방'
        ],
        experiencesVi: [
          'Chiêm ngưỡng kiến trúc Pháp',
          'Khám phá quảng trường Nhà hát Lớn',
          'Tìm hiểu không gian văn hóa khu Tràng Tiền'
        ],
        tags: ['프렌치 건축', '광장 산책', '짱띠엔 거리'],
        tagsVi: ['Kiến trúc Pháp', 'Quảng trường', 'Khu Tràng Tiền'],
        image: HANOI_ATTRACTION_ASSETS['opera-house'].desktopSrc,
        mobileImage: HANOI_ATTRACTION_ASSETS['opera-house'].mobileSrc,
        assetMeta: HANOI_ATTRACTION_ASSETS['opera-house']
      },
      {
        id: 'tran-quoc-pagoda',
        name: '진국사 & 서호',
        nameKr: '진국사 & 서호',
        nameVi: 'Chùa Trấn Quốc & Hồ Tây',
        categoryId: 'nature',
        categoryIds: ['heritage', 'culture', 'nature'],
        category: '자연 · 유산',
        categoryVi: 'Thiên nhiên · Di sản',
        lng: 105.8369,
        lat: 21.0478,
        zoom: 15.1,
        pitch: 30,
        bearing: 12,
        routeIndex: '07',
        durationKo: '권장 관람: 45–90분 (참고)',
        durationVi: 'Thời gian gợi ý: 45–90 phút',
        description: '서호(Hồ Tây) 반도 위에 고즈넉이 자리한 유서 깊은 사찰과 다층 불탑. 잔잔한 호수 바람을 맞으며 평온한 시간을 보내기 좋은 곳입니다.',
        descriptionVi: 'Ngôi cổ tự thanh tịnh bên bán đảo Hồ Tây với bảo tháp uy nghiêm soi bóng mặt nước, mang lại khoảng lặng bình yên giữa lòng thành phố.',
        experiencesKo: [
          '진국사 사찰 및 붉은 불탑 탐방',
          '서호(Hồ Tây) 호숫가 산책',
          '고요한 호수 풍경과 여유로운 휴식'
        ],
        experiencesVi: [
          'Tham quan chùa Trấn Quốc',
          'Dạo bộ ven Hồ Tây',
          'Ngắm cảnh và tận hưởng không gian yên bình'
        ],
        tags: ['진국사', '서호 산책', '고요한 풍경'],
        tagsVi: ['Chùa Trấn Quốc', 'Ven Hồ Tây', 'Không gian yên bình'],
        image: HANOI_ATTRACTION_ASSETS['tran-quoc-pagoda'].desktopSrc,
        mobileImage: HANOI_ATTRACTION_ASSETS['tran-quoc-pagoda'].mobileSrc,
        assetMeta: HANOI_ATTRACTION_ASSETS['tran-quoc-pagoda']
      },
      {
        id: 'bat-trang-village',
        name: '바트랑 도자기 마을',
        nameKr: '바트랑 도자기 마을',
        nameVi: 'Làng gốm Bát Tràng',
        categoryId: 'experience',
        categoryIds: ['culture', 'experience'],
        category: '문화 · 체험',
        categoryVi: 'Văn hóa · Trải nghiệm',
        lng: 105.9125,
        lat: 20.9790,
        zoom: 14.8,
        pitch: 28,
        bearing: 0,
        routeIndex: '08',
        durationKo: '권장 관람: 120–180분 (참고)',
        durationVi: 'Thời gian gợi ý: 120–180 phút',
        description: '홍강 변에서 오랜 세월 도예 전통을 이어온 공예 마을. 전통 가마와 도자기 공방을 둘러보며 베트남 도예 예술의 매력을 직접 느낄 수 있습니다.',
        descriptionVi: 'Làng nghề gốm truyền thống lâu đời ven sông Hồng, nơi du khách tìm hiểu nghệ thuật chế tác gốm Việt Nam và ghé thăm các xưởng gốm địa phương.',
        experiencesKo: [
          '전통 도예 마을 골목과 공방 탐방',
          '현지 상황에 따른 도자기 빚기 체험',
          '베트남 전통 도예 예술 이해'
        ],
        experiencesVi: [
          'Khám phá làng nghề truyền thống',
          'Trải nghiệm làm gốm nếu dịch vụ có sẵn',
          'Tìm hiểu nghệ thuật gốm Việt Nam'
        ],
        tags: ['전통 도예', '공방 탐방', '물레 체험'],
        tagsVi: ['Làng nghề gốm', 'Trải nghiệm làm gốm', 'Nghệ thuật gốm'],
        image: HANOI_ATTRACTION_ASSETS['bat-trang-village'].desktopSrc,
        mobileImage: HANOI_ATTRACTION_ASSETS['bat-trang-village'].mobileSrc,
        assetMeta: HANOI_ATTRACTION_ASSETS['bat-trang-village']
      }
    ]
  },

  // =========================================================================
  // SCENE 08: HANOI CULINARY CINEMA ("The Taste of Hanoi")
  // =========================================================================
  culinary: {
    kicker: 'THE TASTE OF HANOI · GASTRONOMY CINEMA',
    title: '미식의 도시 하노이, 한 그릇에 담긴 철학',
    titleVi: 'Hương Vị Hà Nội — Nghệ Thuật Ẩm Thực Tinh Hoa',
    subtitle: '100년 전통 소고기 쌀국수의 맑고 깊은 육수부터 숯불 향 가득한 분짜, 부드러운 에그커피까지 미각의 다큐멘터리.',
    badgeText: '가지 미식 컬렉션',
    gastronomyLabel: 'HANOI GASTRONOMY',
    dishes: [
      {
        id: 'pho-bo-hanoi',
        name: '정통 하노이 소고기 쌀국수 (Phở Bò)',
        nameVi: 'Phở Bò Gia Truyền Hà Nội',
        nameKr: '정통 하노이 소고기 쌀국수 (Phở Bò)',
        chapter: '01',
        slogan: '사골과 양지를 12시간 우려낸 맑고 깊은 명품 육수',
        desc: '남부 쌀국수와 달리 숙주나 단맛을 배제하고, 소 사골과 전통 향신료 본연의 깊고 담백한 맛을 살린 하노이 정통 쌀국수. 바삭한 꿔이(Quẩy)를 국물에 적셔 먹는 클래식한 방식.',
        highlights: ['12시간 저온 우림 육수', '부드러운 생면(Bánh Phở)', '파와 라임의 산뜻한 조화'],
        image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'bun-cha-hanoi',
        name: '하노이 숯불 분짜 (Bún Chả)',
        nameVi: 'Bún Chả Than Hoa Hà Nội',
        nameKr: '하노이 숯불 분짜 (Bún Chả)',
        chapter: '02',
        slogan: '참숯에 직화로 구워낸 돼지고기 완자와 새콤달콤한 느억맘',
        desc: '오바마 대통령도 반한 하NOI의 대표 소울푸드. 숯불 향이 진하게 밴 돼지고기 패티와 삼겹살을 따뜻한 피시소스 육수에 신선한 허브, 쌀국수 면과 함께 적셔 즐깁니다.',
        highlights: ['참숯 직화 패티', '새콤달콤 특제 육수', '바삭한 넴(Nem) 튀김 곁들임'],
        image: 'https://images.unsplash.com/photo-1503764654157-729106a23077?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'egg-coffee',
        name: '하노이 원조 에그커피 (Cà Phê Trứng)',
        nameVi: 'Cà Phê Trứng Phố Cổ',
        nameKr: '하노이 원조 에그커피 (Cà Phê Trứng)',
        chapter: '03',
        slogan: '달걀노른자 크림과 진한 로부스타 원두의 황홀한 하모니',
        desc: '1946년 메트로폴 바텐더 출신 응우옌 반 지앙이 우유 부족 시절 달걀을 휘핑해 개발한 전설적인 음료. 티라미수를 마시는 듯한 부드럽고 달콤한 커스터드 크림의 풍미.',
        highlights: ['벨벳 같은 달걀 크림', '진한 베트남 드립 커피', '원조 3대 명가 프라이빗 방문'],
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'cha-ca-la-vong',
        name: '짜까 라봉 (Chả Cá Lã Vọng)',
        nameVi: 'Chả Cá Lã Vọng',
        nameKr: '짜까 라봉 (Chả Cá Lã Vọng)',
        chapter: '04',
        slogan: '강황에 재운 생선을 딜과 파와 함께 팬에 볶아내는 하노이 별미',
        desc: '하노이 짜까 거리의 오랜 전통을 담은 테이블 다이닝 요리. 강황과 갈랑갈로 마리네이드한 생선살을 딜(Dill)과 대파와 함께 식탁 위 팬에서 지글지글 볶아 맘똠(새우젓) 또는 피시소스에 곁들여 먹습니다.',
        highlights: ['강황 마리네이드 생선', '향긋한 딜 허브 풍미', '전통 식탁 위 테이블 조리'],
        image: '/assets/destinations/hanoi/cha-ca/chaca-hero-desktop.webp'
      },
      {
        id: 'banh-cuon',
        name: '탄찌 전통 쌀전병 (Bánh Cuốn)',
        nameVi: 'Bánh Cuốn Thanh Trì',
        nameKr: '탄찌 전통 쌀전병 (Bánh Cuốn)',
        chapter: '05',
        slogan: '한 겹씩 쪄낸 얇은 쌀피에 다진 고기와 버섯의 섬세한 식감',
        desc: '천으로 덮인 찜통에서 종이처럼 얇게 쪄낸 쌀 반죽에 다진 돼지고기와 목이버섯을 넣고 말아낸 아침 별미. 바삭하게 튀긴 샬롯과 찌아(Chả Lụa)를 곁들여 즐깁니다.',
        highlights: ['극도로 얇은 수제 쌀피', '향긋한 바삭 샬롯', '따뜻한 특제 디핑 소스'],
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'bun-thang',
        name: '하노이 궁중 오색 국수 (Bún Thang)',
        nameVi: 'Bún Thang Hà Nội',
        nameKr: '하노이 궁중 오색 국수 (Bún Thang)',
        chapter: '06',
        slogan: '잘게 찢은 닭고기, 지단, 버섯, 무말랭이가 빚어내는 무지개 국수',
        desc: '새해 명절이나 특별한 날 정성껏 준비하던 하노이 양반가의 귀한 국수. 맑은 닭 육수 위에 다섯 가지 고명이 마치 한 폭의 그림처럼 정교하게 얹어집니다.',
        highlights: ['오색 정교한 수작업 고명', '맑고 깔끔한 닭고기 육수', '하노이 귀족 가문의 전통 레시피'],
        image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },

  // =========================================================================
  // SCENE 09: HANOI THROUGH THE DAY ("One City, Many Moods")
  // =========================================================================
  privateValues: {
    kicker: 'ONE CITY, MANY MOODS',
    title: 'Your Time. Your Pace. Your Hanoi.',
    titleVi: 'Hà Nội trong từng khoảnh khắc thời gian.',
    subtitle: '물안개 피어오르는 아침 호수부터 황금빛 오후의 고궁, 그리고 낭만적인 밤의 구시가지까지.',
    timePhases: [
      {
        id: 'dawn',
        time: '05:45 AM',
        title: 'Bình Minh Trên Hồ Hoàn Kiếm',
        titleKr: '호안끼엠 호수의 고요한 새벽 물안개',
        desc: 'Mặt hồ phẳng lặng mờ sương, tiếng chim hót và nhịp sống sớm bình dị của người Tràng An.',
        descKr: '물안개 걷히는 고요한 호수 위로 붉게 떠오르는 아침 해와 현지인들의 평화로운 새벽 일상.',
        bg: 'linear-gradient(180deg, #2D1436 0%, #7C3A4D 40%, #E87A5D 80%, #FFB52B 100%)',
        img: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=1800&q=80',
        icon: 'Sunrise'
      },
      {
        id: 'noon',
        time: '02:00 PM',
        title: 'Nắng Vàng Cổ Kính Văn Miếu & Phố Pháp',
        titleKr: '문묘와 프랑스 구역에 내리쬐는 오후의 황금빛 햇살',
        desc: 'Ánh nắng rọi qua tán cây cổ thụ, đổ dài trên những bức tường vàng thuộc địa trầm mặc.',
        descKr: '수백 년 된 고목 그늘 사이로 쏟아지는 따스한 햇빛과 유서 깊은 프랑스식 건축물의 우아한 자태.',
        bg: 'linear-gradient(180deg, #996B3D 0%, #C99757 50%, #F5E6CC 100%)',
        img: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1800&q=80',
        icon: 'Sun'
      },
      {
        id: 'dusk',
        time: '05:45 PM',
        title: 'Hoàng Hôn Hồ Tây Tĩnh Lặng',
        titleKr: '서호의 수면을 붉게 물들이는 감성적인 일몰',
        desc: 'Khói lam chiều mờ ảo bên chùa Trấn Quốc, gió hồ lộng mát giữa không gian bao la.',
        descKr: '진국사 불탑 너머로 서서히 저무는 붉은 태양과 호숫가 테라스에서 만나는 시원한 저녁 바람.',
        bg: 'linear-gradient(180deg, #1E1B4B 0%, #831843 45%, #C2410C 75%, #F59E0B 100%)',
        img: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1800&q=80',
        icon: 'Sunset'
      },
      {
        id: 'night',
        time: '08:30 PM',
        title: 'Đêm Phố Cổ Lung Linh Ánh Đèn Vàng',
        titleKr: '오페라 하우스와 구시가지의 매혹적인 밤풍경',
        desc: 'Ánh đèn vàng ấm áp thắp sáng những mái ngói rêu phong, tiếng nhạc jazz réo rắt bên quán nhỏ.',
        descKr: '거리마다 따스한 노란 조명이 켜지고, 라이브 재즈 클럽과 활기찬 야시장이 어우러지는 하노이의 밤.',
        bg: 'linear-gradient(180deg, #020617 0%, #061426 50%, #081D42 100%)',
        img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1800&q=80',
        icon: 'Moon'
      }
    ],
    items: [
      {
        id: 'time-freedom',
        title: '100% 프라이빗 일정 조율',
        titleVi: 'Chủ động thời gian 100%',
        desc: '알람에 쫓기는 단체 관광은 없습니다. 원하는 시간에 출발하고 마음에 드는 곳에 여유롭게 머무세요.'
      },
      {
        id: 'deep-culture',
        title: '쇼핑 강요 없는 품격 있는 투어',
        titleVi: 'Không shopping ép buộc',
        desc: '원치 않는 라텍스나 건강식품 쇼핑센터 방문은 0% 보장. 오직 문화와 휴식에만 온전히 집중합니다.'
      },
      {
        id: 'vip-comfort',
        title: '전담 기사와 전용 차량 상시 대기',
        titleVi: 'Xe riêng & Tài xế riêng túc trực',
        desc: '무더운 날씨나 갑작스러운 비에도 에어컨이 시원하게 가동되는 전용 차량이 언제나 대기합니다.'
      }
    ]
  },

  // =========================================================================
  // SCENE 07: SIGNATURE HANOI ITINERARY ("Cinematic Travel Journal")
  // =========================================================================
  itineraries: [
    {
      id: '3d2n',
      badge: '시그니처 하노이 2박 3일',
      badgeVi: 'Hành trình gợi ý 3 ngày 2 đêm',
      daysCount: 3,
      nightsCount: 2,
      durationLabel: '2박 3일',
      durationLabelVi: '3 ngày 2 đêm',
      title: '사흘간의 기록, 오래도록 기억될 하노이.',
      titleVi: 'Ba ngày, một Hà Nội đáng nhớ.',
      overview:
        '천년의 유산과 깊은 미식, 고즈넉한 일상이 어우러진 2박 3일 맞춤 프라이빗 여정을 만나보세요.',
      overviewVi:
        'Khám phá di sản, hương vị và nhịp sống thủ đô trong một hành trình 3 ngày 2 đêm được thiết kế theo nhịp điệu của bạn.',
      presentation: {
        variant: 'cinematic-journal',
        scrollMode: 'natural-interactive'
      },
      sectionHeader: {
        eyebrow: 'THE HANOI SIGNATURE JOURNEY',
        title: '사흘간의 기록, 오래도록 기억될 하노이.',
        titleVi: 'Ba ngày, một Hà Nội đáng nhớ.',
        subtitle:
          '천년의 유산과 깊은 미식, 고즈넉한 일상이 어우러진 2박 3일 맞춤 프라이빗 여정을 만나보세요.',
        subtitleVi:
          'Khám phá di sản, hương vị và nhịp sống thủ đô trong một hành trình 3 ngày 2 đêm được thiết kế theo nhịp điệu của bạn.'
      },
      journeySummary: [
        { id: 'duration', label: '2박 3일', labelVi: '3 ngày 2 đêm' },
        { id: 'private-tour', label: '맞춤 프라이빗 투어', labelVi: 'Tour riêng linh hoạt' },
        { id: 'airport-transfer', label: '공항 픽업·샌딩', labelVi: 'Đón tiễn sân bay' },
        { id: 'private-vehicle', label: '전용 차량 선택', labelVi: 'Xe riêng tùy chọn' },
        { id: 'accommodation', label: '맞춤 숙소 선택', labelVi: 'Lưu trú tùy chọn' }
      ],
      cta: {
        label: '이 여정을 나만의 일정으로 맞춤 설계하기',
        labelVi: 'Cá nhân hóa hành trình này',
        selectionBadge: '내 선택에 포함됨',
        selectionBadgeVi: 'Có trong lựa chọn của bạn',
        confirmTitle: '이 추천 여정은 2박 3일 일정입니다.',
        confirmTitleVi: 'Lịch trình gợi ý này kéo dài 3 ngày 2 đêm.',
        confirmDesc: '3일 일정으로 변경하시겠습니까, 아니면 현재 선택한 기간을 유지하시겠습니까?',
        confirmDescVi: 'Bạn muốn sử dụng thời lượng 3 ngày hay giữ nguyên thời lượng đã chọn?',
        confirmApply: '3일 일정 사용',
        confirmApplyVi: 'Sử dụng 3 ngày',
        confirmKeep: '기존 기간 유지',
        confirmKeepVi: 'Giữ nguyên thời lượng'
      },
      days: [
        {
          id: 'day-01',
          day: 1,
          chapterLabel: 'CHAPTER 01 / 03',
          chapterLabelVi: 'CHƯƠNG 01 / 03',
          dayBadge: '01일차',
          dayBadgeVi: 'NGÀY 01',
          locationTag: '호안끼엠 · 구시가지',
          locationTagVi: 'Hồ Hoàn Kiếm · Phố cổ',
          title: '하노이의 심장에 닿다',
          titleVi: 'Chạm vào trái tim Hà Nội',
          timelineLabel: '01 — 하노이의 심장에 닿다',
          timelineLabelVi: '01 — Chạm vào trái tim Hà Nội',
          summary:
            '하노이에 첫발을 딛고 고즈넉한 구시가지 골목과 호안끼엠 호수의 물결, 그리고 수도의 첫 풍미를 여유롭게 마주합니다.',
          summaryVi:
            'Đặt chân đến Hà Nội, thong thả khám phá nhịp sống phố cổ, mặt nước Hồ Hoàn Kiếm và những hương vị đầu tiên của thủ đô.',
          imageAssetId: 'hoan-kiem-lake',
          assetMeta: HANOI_ATTRACTION_ASSETS['hoan-kiem-lake'],
          image: HANOI_ATTRACTION_ASSETS['hoan-kiem-lake'].desktopSrc,
          mobileImage: HANOI_ATTRACTION_ASSETS['hoan-kiem-lake'].mobileSrc,
          timeBlocks: [
            {
              id: 'day-01-arrival',
              period: '공항 픽업 & 호텔 체크인',
              periodVi: 'Đón sân bay & Nhận phòng',
              desc: '노이바이 공항에서 전용 차량 픽업 후 호텔로 이동해 도착 시간과 호텔 정책에 맞춰 체크인 또는 수하물 보관을 진행합니다.',
              descVi:
                'Gợi ý xe riêng đón tại sân bay Nội Bài, di chuyển về khách sạn và nhận phòng hoặc gửi hành lý tùy theo giờ đến và chính sách khách sạn.',
              attractionIds: [],
              culinaryId: null
            },
            {
              id: 'day-01-afternoon',
              period: '오후',
              periodVi: 'Buổi chiều',
              desc: '호안끼엠 호수와 테훅 다리, 응옥선 사당, 구시가지 골목을 천천히 거닐며 하노이 에그커피를 즐깁니다.',
              descVi:
                'Dạo bước quanh Hồ Hoàn Kiếm, cầu Thê Húc, đền Ngọc Sơn và những con phố cổ. Thưởng thức cà phê trứng Hà Nội.',
              attractionIds: ['hoan-kiem-lake', 'old-quarter'],
              culinaryId: null
            },
            {
              id: 'day-01-evening',
              period: '저녁 & 숙소 휴식',
              periodVi: 'Buổi tối & Nghỉ đêm',
              desc: '하노이 정통 소고기 쌀국수로 저녁을 즐기고 밤거리를 산책한 뒤 호텔에서 편안하게 휴식합니다.',
              descVi:
                'Gợi ý thưởng thức phở bò Hà Nội, khám phá phố đêm và nghỉ ngơi tại khách sạn.',
              attractionIds: [],
              culinaryId: 'pho-bo-hanoi'
            }
          ],
          activities: [
            {
              title: '공항 픽업 & 호텔 체크인',
              titleVi: 'Đón sân bay & Nhận phòng',
              desc: '노이바이 공항에서 전용 차량 픽업 후 호텔로 이동해 도착 시간과 호텔 정책에 맞춰 체크인 또는 수하물 보관을 진행합니다.',
              descVi:
                'Gợi ý xe riêng đón tại sân bay Nội Bài, di chuyển về khách sạn và nhận phòng hoặc gửi hành lý tùy theo giờ đến và chính sách khách sạn.'
            },
            {
              title: '호안끼엠 호수 & 구시가지 산책',
              titleVi: 'Hồ Hoàn Kiếm & Phố cổ',
              desc: '호안끼엠 호수와 테훅 다리, 응옥선 사당, 구시가지 골목을 천천히 거닐며 하노이 에그커피를 즐깁니다.',
              descVi:
                'Dạo bước quanh Hồ Hoàn Kiếm, cầu Thê Húc, đền Ngọc Sơn và những con phố cổ. Thưởng thức cà phê trứng Hà Nội.'
            },
            {
              title: '하노이 쌀국수 만찬 & 숙소 휴식',
              titleVi: 'Phở bò Hà Nội & Nghỉ đêm',
              desc: '하노이 정통 소고기 쌀국수로 저녁을 즐기고 밤거리를 산책한 뒤 호텔에서 편안하게 휴식합니다.',
              descVi:
                'Gợi ý thưởng thức phở bò Hà Nội, khám phá phố đêm và nghỉ ngơi tại khách sạn.'
            }
          ]
        },
        {
          id: 'day-02',
          day: 2,
          chapterLabel: 'CHAPTER 02 / 03',
          chapterLabelVi: 'CHƯƠNG 02 / 03',
          dayBadge: '02일차',
          dayBadgeVi: 'NGÀY 02',
          locationTag: '문묘 · 탕롱 황성 · 프렌치 쿼터',
          locationTagVi: 'Văn Miếu · Hoàng thành · Khu phố Pháp',
          title: '천년의 시간과 마주하다',
          titleVi: 'Dấu ấn ngàn năm',
          timelineLabel: '02 — 천년의 시간과 마주하다',
          timelineLabelVi: '02 — Dấu ấn ngàn năm',
          summary:
            '탕롱의 깊은 역사를 따라 천년의 유산을 탐방하고, 하노이의 미식과 프렌치 건축의 우아함을 함께 경험하는 하루입니다.',
          summaryVi:
            'Một ngày đi sâu vào chiều dài lịch sử Thăng Long, khám phá di sản ngàn năm, thưởng thức mỹ vị Hà Nội và cảm nhận vẻ đẹp kiến trúc Pháp.',
          imageAssetId: 'van-mieu',
          assetMeta: HANOI_ATTRACTION_ASSETS['van-mieu'],
          image: HANOI_ATTRACTION_ASSETS['van-mieu'].desktopSrc,
          mobileImage: HANOI_ATTRACTION_ASSETS['van-mieu'].mobileSrc,
          timeBlocks: [
            {
              id: 'day-02-morning',
              period: '오전',
              periodVi: 'Buổi sáng',
              desc: '문묘 국자감과 규문각을 탐방합니다. 호텔에서 전용 차량을 선택해 편안하게 이동할 수 있습니다.',
              descVi:
                'Tham quan Văn Miếu – Quốc Tử Giám và Khuê Văn Các. Có thể lựa chọn xe riêng để di chuyển từ khách sạn.',
              attractionIds: ['van-mieu'],
              culinaryId: null
            },
            {
              id: 'day-02-lunch',
              period: '점심',
              periodVi: 'Buổi trưa',
              desc: '하노이 숯불 분짜와 현지 별미로 오찬을 즐깁니다.',
              descVi: 'Gợi ý thưởng thức bún chả than hoa Hà Nội và các món ăn địa phương.',
              attractionIds: [],
              culinaryId: 'bun-cha-hanoi'
            },
            {
              id: 'day-02-afternoon',
              period: '오후',
              periodVi: 'Buổi chiều',
              desc: '탕롱 황성과 성 요셉 대성당, 오페라 하우스 일대 프렌치 쿼터를 둘러보며 실제 일정에 맞춰 방문 명소를 유연하게 조절합니다.',
              descVi:
                'Khám phá Hoàng thành Thăng Long, Nhà thờ Lớn và khu phố Pháp quanh Nhà hát Lớn, điều chỉnh số điểm tham quan theo thời gian thực tế.',
              attractionIds: ['thang-long-citadel', 'st-joseph-cathedral', 'opera-house'],
              culinaryId: null
            },
            {
              id: 'day-02-evening',
              period: '저녁 & 숙소 휴식',
              periodVi: 'Buổi tối & Nghỉ đêm',
              desc: '짜까 라봉 또는 취향에 맞는 저녁 미식을 즐긴 후 호텔로 돌아가 휴식합니다.',
              descVi:
                'Gợi ý thưởng thức chả cá Lã Vọng hoặc lựa chọn ẩm thực theo sở thích. Trở về khách sạn nghỉ ngơi.',
              attractionIds: [],
              culinaryId: 'cha-ca-la-vong'
            }
          ],
          activities: [
            {
              title: '문묘 국자감 & 규문각 탐방',
              titleVi: 'Văn Miếu – Quốc Tử Giám',
              desc: '문묘 국자감과 규문각을 탐방합니다. 호텔에서 전용 차량을 선택해 편안하게 이동할 수 있습니다.',
              descVi:
                'Tham quan Văn Miếu – Quốc Tử Giám và Khuê Văn Các. Có thể lựa chọn xe riêng để di chuyển từ khách sạn.'
            },
            {
              title: '하노이 숯불 분짜 오찬',
              titleVi: 'Bún chả than hoa Hà Nội',
              desc: '하노이 숯불 분짜와 현지 별미로 오찬을 즐깁니다.',
              descVi: 'Gợi ý thưởng thức bún chả than hoa Hà Nội và các món ăn địa phương.'
            },
            {
              title: '탕롱 황성 & 프렌치 쿼터',
              titleVi: 'Hoàng thành Thăng Long & Khu phố Pháp',
              desc: '탕롱 황성과 성 요셉 대성당, 오페라 하우스 일대 프렌치 쿼터를 둘러보며 실제 일정에 맞춰 방문 명소를 유연하게 조절합니다.',
              descVi:
                'Khám phá Hoàng thành Thăng Long, Nhà thờ Lớn và khu phố Pháp quanh Nhà hát Lớn, điều chỉnh số điểm tham quan theo thời gian thực tế.'
            },
            {
              title: '짜까 라봉 만찬 & 숙소 휴식',
              titleVi: 'Chả cá Lã Vọng & Nghỉ đêm',
              desc: '짜까 라봉 또는 취향에 맞는 저녁 미식을 즐긴 후 호텔로 돌아가 휴식합니다.',
              descVi:
                'Gợi ý thưởng thức chả cá Lã Vọng hoặc lựa chọn ẩm thực theo sở thích. Trở về khách sạn nghỉ ngơi.'
            }
          ]
        },
        {
          id: 'day-03',
          day: 3,
          chapterLabel: 'CHAPTER 03 / 03',
          chapterLabelVi: 'CHƯƠNG 03 / 03',
          dayBadge: '03일차',
          dayBadgeVi: 'NGÀY 03',
          locationTag: '서호 · 진국사 · 바트랑',
          locationTagVi: 'Hồ Tây · Chùa Trấn Quốc · Bát Tràng',
          title: '고요한 호수와 장인의 손길',
          titleVi: 'Nhịp sống bình yên',
          timelineLabel: '03 — 고요한 호수와 장인의 손길',
          timelineLabelVi: '03 — Nhịp sống bình yên',
          summary:
            '서호의 평화로운 아침을 만끽하고 전통 도예 마을의 아름다움을 둘러본 뒤 하노이 여정을 마무리합니다.',
          summaryVi:
            'Tận hưởng buổi sáng yên bình bên Hồ Tây, khám phá nét đẹp làng nghề truyền thống trước khi khép lại hành trình Hà Nội.',
          imageAssetId: 'tran-quoc-pagoda',
          assetMeta: HANOI_ATTRACTION_ASSETS['tran-quoc-pagoda'],
          image: HANOI_ATTRACTION_ASSETS['tran-quoc-pagoda'].desktopSrc,
          mobileImage: HANOI_ATTRACTION_ASSETS['tran-quoc-pagoda'].mobileSrc,
          timeBlocks: [
            {
              id: 'day-03-morning',
              period: '오전 & 체크아웃',
              periodVi: 'Buổi sáng & Trả phòng',
              desc: '서호 수변을 산책하고 진국사를 둘러본 뒤 일정에 맞춰 호텔 체크아웃을 진행합니다.',
              descVi:
                'Dạo bước bên Hồ Tây, tham quan chùa Trấn Quốc và hoàn tất thủ tục trả phòng khách sạn theo lịch trình phù hợp.',
              attractionIds: ['tran-quoc-pagoda'],
              culinaryId: null
            },
            {
              id: 'day-03-craft',
              period: '장인 마을 체험',
              periodVi: 'Trải nghiệm làng nghề',
              desc: '시간이 허락할 경우 바트랑 도자기 마을을 방문해 전통 수공예 도자기 문화를 살펴보고 도예 체험을 즐깁니다.',
              descVi:
                'Gợi ý khám phá làng gốm Bát Tràng, tìm hiểu nghề gốm thủ công và trải nghiệm làm gốm nếu thời gian cho phép.',
              attractionIds: ['bat-trang-village'],
              culinaryId: null
            },
            {
              id: 'day-03-departure',
              period: '공항 샌딩',
              periodVi: 'Tiễn sân bay',
              desc: '실제 출국 항공편 시간에 맞춰 전용 차량으로 노이바이 공항까지 이동합니다. 이른 항공편의 경우 사전 일정을 단축하거나 생략할 수 있습니다.',
              descVi:
                'Gợi ý xe riêng đưa khách đến sân bay Nội Bài theo giờ bay thực tế. Với các chuyến bay sớm, lịch trình tham quan có thể rút gọn hoặc lược bỏ linh hoạt.',
              attractionIds: [],
              culinaryId: null
            }
          ],
          activities: [
            {
              title: '서호 산책 & 진국사 · 체크아웃',
              titleVi: 'Hồ Tây · Chùa Trấn Quốc & Trả phòng',
              desc: '서호 수변을 산책하고 진국사를 둘러본 뒤 일정에 맞춰 호텔 체크아웃을 진행합니다.',
              descVi:
                'Dạo bước bên Hồ Tây, tham quan chùa Trấn Quốc và hoàn tất thủ tục trả phòng khách sạn theo lịch trình phù hợp.'
            },
            {
              title: '바트랑 도자기 마을 체험',
              titleVi: 'Làng gốm Bát Tràng',
              desc: '시간이 허락할 경우 바트랑 도자기 마을을 방문해 전통 수공예 도자기 문화를 살펴보고 도예 체험을 즐깁니다.',
              descVi:
                'Gợi ý khám phá làng gốm Bát Tràng, tìm hiểu nghề gốm thủ công và trải nghiệm làm gốm nếu thời gian cho phép.'
            },
            {
              title: '노이바이 공항 샌딩',
              titleVi: 'Tiễn sân bay Nội Bài',
              desc: '실제 출국 항공편 시간에 맞춰 전용 차량으로 노이바이 공항까지 이동합니다. 이른 항공편의 경우 사전 일정을 단축하거나 생략할 수 있습니다.',
              descVi:
                'Gợi ý xe riêng đưa khách đến sân bay Nội Bài theo giờ bay thực tế. Với các chuyến bay sớm, lịch trình tham quan có thể rút gọn hoặc lược bỏ linh hoạt.'
            }
          ]
        }
      ]
    }
  ],

  // =========================================================================
  // SCENE 11 & TESTIMONIALS: CUSTOMER STORIES
  // =========================================================================
  customerStoriesTitle: '하노이를 경험한 고객들의 생생한 기억',
  customerStoriesSub: 'Super EZ Tour와 함께 품격 있는 하노이를 여행한 고객님들의 솔직한 여행 저널.',
  customerStories: [
    {
      id: 'hanoi-story-1',
      author: '김현우 & 박지영 부부',
      authorVi: 'Vợ chồng anh Kim Hyun-woo & chị Park Ji-young',
      origin: '서울, 대한민국',
      originVi: 'Seoul, Hàn Quốc',
      tripDate: '2026년 가을',
      tripDateVi: 'Mùa thu 2026',
      groupStyle: '부부 헤리티지 & 도보 해설 투어',
      groupStyleVi: 'Tour riêng cặp đôi · Di sản & Phố cổ',
      authorType: '30대 부부 헤리티지 여행',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      destination: 'Hanoi Heritage 3D2N',
      rating: 5,
      date: '2026년 가을',
      quote: '“전담 가이드님과 호안끼엠 호수와 36거리 골목을 천천히 걸으며 들었던 이야기들이 오래도록 기억에 남습니다. 패키지 여행과는 차원이 다른 여유와 깊이였습니다.”',
      quoteVi: '“Khoảng thời gian thong thả dạo bước quanh Hồ Hoàn Kiếm và 36 phố phường cùng hướng dẫn viên riêng thực sự đáng nhớ. Một chiều sâu văn hóa và sự thư thái khác hẳn các tour ghép đoàn.”',
      highlightTag: '100% 프라이빗 도보 해설'
    },
    {
      id: 'hanoi-story-2',
      author: '이성민 가족 (부모님 동반 5인)',
      authorVi: 'Gia đình anh Lee Sung-min (Đoàn 5 người cùng bố mẹ)',
      origin: '부산, 대한민국',
      originVi: 'Busan, Hàn Quốc',
      tripDate: '2026년 봄',
      tripDateVi: 'Mùa xuân 2026',
      groupStyle: '부모님 동반 5인 가족 프라이빗 투어',
      groupStyleVi: 'Tour riêng gia đình đa thế hệ (5 khách)',
      authorType: '칠순 기념 효도 가족여행',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      destination: 'Hanoi & West Lake Private',
      rating: 5,
      date: '2026년 봄',
      quote: '“부모님을 모시고 가는 여행이라 걱정이 많았는데, 전용 차량이 언제나 대기하고 부모님 걸음걸이에 맞춰 일정을 여유롭게 조율해 주셔서 온 가족이 편안하게 다녀왔습니다.”',
      quoteVi: '“Đi cùng bố mẹ lớn tuổi nên gia đình khá lo lắng, nhưng nhờ có xe riêng luôn túc trực và lịch trình điều chỉnh linh hoạt theo nhịp đi của ông bà nên cả nhà đều vô cùng thoải mái.”',
      highlightTag: '전용 차량 & 편안한 동선'
    },
    {
      id: 'hanoi-story-3',
      author: '최유진 & 친구들',
      authorVi: 'Chị Choi Yu-jin & nhóm bạn',
      origin: '인천, 대한민국',
      originVi: 'Incheon, Hàn Quốc',
      tripDate: '2026년 겨울',
      tripDateVi: 'Mùa đông 2026',
      groupStyle: '하노이 미식 & 문화 살롱 투어',
      groupStyleVi: 'Tour riêng khám phá ẩm thực & văn hóa',
      authorType: '미식 살롱 탐방 여행',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      destination: 'Hanoi Culinary Tour',
      rating: 5,
      date: '2026년 겨울',
      quote: '“구시가지 에그커피부터 숯불 분짜와 짜까라봉까지, 하노이의 진정한 미식과 골목 문화를 우리만의 템포로 깊이 있게 경험할 수 있었던 최고의 여행이었습니다.”',
      quoteVi: '“Từ tách cà phê trứng phố cổ đến bún chả than hoa và chả cá Lã Vọng, cả nhóm đã được thưởng thức trọn vẹn hương vị và nhịp sống Hà Nội theo đúng nhịp điệu riêng của mình.”',
      highlightTag: '시그니처 미식 큐레이션'
    }
  ],

  // =========================================================================
  // SCENE 12: CINEMATIC FINALE ("Hanoi Stays With You")
  // =========================================================================
  finalCta: {
    destinationId: 'ha-noi',
    image: HANOI_ATTRACTION_ASSETS['tran-quoc-pagoda'].desktopSrc,
    kicker: 'CINEMATIC FINALE · HANOI STAYS WITH YOU',
    title: 'HANOI STAYS WITH YOU.',
    titleVi: 'HANOI STAYS WITH YOU.',
    subtitle: '여행은 끝나도, 하노이의 기억은 오래 남습니다.',
    subtitleVi: 'Có những hành trình khép lại, nhưng ký ức còn ở lại.',
    description: '100% 프라이빗 맞춤 여행 · 지금 하노이 전담 컨시어지와 나만의 특별한 일정을 상담해 보세요.',
    descriptionVi: 'Hành trình 100% riêng tư theo nhịp điệu của bạn · Kết nối cùng chuyên viên Super EZ Tour để thiết kế chuyến đi Hà Nội dành riêng cho bạn.',
    ctaText: '프라이빗 여행 상담하기',
    ctaTextVi: 'Bắt đầu hành trình riêng'
  }
};

export function getLocalizedHaNoiConfig(language = 'ko') {
  const isVi = language === 'vi';
  if (!isVi) {
    return HA_NOI_CONFIG;
  }

  const base = HA_NOI_CONFIG;
  const attr = base.attractions;

  return {
    ...base,
    locale: 'vi',
    attractions: {
      ...attr,
      title: attr.titleVi || attr.title,
      subtitle: attr.subtitleVi || attr.subtitle,
      resetViewText: attr.resetViewTextVi || attr.resetViewText,
      cartPrefix: attr.cartPrefixVi || attr.cartPrefix,
      cartSuffix: attr.cartSuffixVi || attr.cartSuffix,
      btnAdd: attr.btnAddVi || attr.btnAdd,
      btnInCart: attr.btnInCartVi || attr.btnInCart,
      btnRemove: attr.btnRemoveVi || attr.btnRemove,
      disclaimer: attr.disclaimerVi || attr.disclaimer,
      categories: (attr.categories || []).map((c) => ({
        ...c,
        label: c.labelVi || c.labelKo
      })),
      items: (attr.items || []).map((item) => ({
        ...item,
        name: item.nameVi || item.name,
        category: item.categoryVi || item.category,
        description: item.descriptionVi || item.description,
        duration: item.durationVi || item.durationKo,
        experiences: item.experiencesVi || item.experiencesKo,
        tags: item.tagsVi || item.tags
      }))
    },
    itineraries: (base.itineraries || []).map((it) => ({
      ...it,
      badge: it.badgeVi || it.badge,
      durationLabel: it.durationLabelVi || it.durationLabel,
      title: it.titleVi || it.title,
      overview: it.overviewVi || it.overview,
      sectionHeader: it.sectionHeader
        ? {
            ...it.sectionHeader,
            title: it.sectionHeader.titleVi || it.sectionHeader.title,
            subtitle: it.sectionHeader.subtitleVi || it.sectionHeader.subtitle
          }
        : undefined,
      journeySummary: (it.journeySummary || []).map((item) => ({
        ...item,
        label: item.labelVi || item.label
      })),
      cta: it.cta
        ? {
            ...it.cta,
            label: it.cta.labelVi || it.cta.label,
            selectionBadge: it.cta.selectionBadgeVi || it.cta.selectionBadge,
            confirmTitle: it.cta.confirmTitleVi || it.cta.confirmTitle,
            confirmDesc: it.cta.confirmDescVi || it.cta.confirmDesc,
            confirmApply: it.cta.confirmApplyVi || it.cta.confirmApply,
            confirmKeep: it.cta.confirmKeepVi || it.cta.confirmKeep
          }
        : undefined,
      days: (it.days || []).map((dayObj) => ({
        ...dayObj,
        chapterLabel: dayObj.chapterLabelVi || dayObj.chapterLabel,
        dayBadge: dayObj.dayBadgeVi || dayObj.dayBadge,
        locationTag: dayObj.locationTagVi || dayObj.locationTag,
        title: dayObj.titleVi || dayObj.title,
        timelineLabel: dayObj.timelineLabelVi || dayObj.timelineLabel,
        summary: dayObj.summaryVi || dayObj.summary,
        timeBlocks: (dayObj.timeBlocks || []).map((tb) => ({
          ...tb,
          period: tb.periodVi || tb.period,
          desc: tb.descVi || tb.desc
        })),
        activities: (dayObj.activities || []).map((act) => ({
          ...act,
          title: act.titleVi || act.title,
          desc: act.descVi || act.desc
        }))
      }))
    })),
    customerStories: (base.customerStories || []).map((story) => ({
      ...story,
      author: story.authorVi || story.author,
      origin: story.originVi || story.origin,
      tripDate: story.tripDateVi || story.tripDate,
      groupStyle: story.groupStyleVi || story.groupStyle,
      quote: story.quoteVi || story.quote
    })),
    finalCta: base.finalCta
      ? {
          ...base.finalCta,
          title: base.finalCta.titleVi || base.finalCta.title,
          subtitle: base.finalCta.subtitleVi || base.finalCta.subtitle,
          description: base.finalCta.descriptionVi || base.finalCta.description,
          ctaText: base.finalCta.ctaTextVi || base.finalCta.ctaText
        }
      : undefined
  };
}

export default HA_NOI_CONFIG;
