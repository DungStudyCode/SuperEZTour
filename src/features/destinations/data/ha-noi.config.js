/**
 * Super EZ Tour - Destination Configuration: HÀ NỘI (HANOI)
 * The Soul of Vietnam — Cinematic 3D Storytelling & Luxury Editorial Experience
 * Korean / Vietnamese Bilingual Localization Edition
 */

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
  // SCENE 07: INTERACTIVE HANOI MAP ("The Hanoi Discovery Atlas")
  // =========================================================================
  attractions: {
    kicker: 'THE HANOI DISCOVERY ATLAS',
    title: '하노이의 정수를 담은 핵심 랜드마크',
    titleVi: 'Bản Đồ Khám Phá Hà Nội 3D Độc Bản',
    subtitle: '호안끼엠 호수 중심에서부터 천년 문묘, 유네스코 탕롱 황성, 서호와 도예 마을까지.',
    mapCenter: [105.8525, 21.0285],
    defaultZoom: 12.8,
    overviewCamera: {
      center: [105.8525, 21.0285],
      zoom: 12.6,
      pitch: 52,
      bearing: -18
    },
    resetViewText: '하노이 전경 복원',
    atlasName: 'THE HANOI ATLAS',
    cartPrefix: '일정 담기',
    cartSuffix: '곳 선택됨',
    categories: ['전체', '역사유산', '건축명소', '호수·자연', '문화예술'],
    items: [
      {
        id: 'hoan-kiem-lake',
        name: '호안끼엠 호수 & 응옥선 사당',
        nameVi: 'Hồ Hoàn Kiếm & Đền Ngọc Sơn',
        category: '호수·자연',
        elevation: '해발 15m · 도심 중심',
        lng: 105.8525,
        lat: 21.0285,
        zoom: 15.2,
        pitch: 45,
        bearing: 0,
        routeIndex: '01',
        slogan: '하노이의 푸른 심장이자 천년의 영혼',
        description: '붉은 테훅 다리를 건너 응옥선 사당으로 이어지는 평온한 산책길. 아침에는 현지인들의 태극권 수련, 저녁에는 낭만적인 조명이 호수를 비춥니다.',
        tags: ['거북탑', '테훅 다리', '호수 산책로', '야경 명소'],
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'old-quarter',
        name: '하노이 36 구시가지',
        nameVi: 'Phố Cổ Hà Nội 36 Phố Phường',
        category: '역사유산',
        elevation: '해발 14m · 보행 중심',
        lng: 105.8510,
        lat: 21.0345,
        zoom: 15.5,
        pitch: 40,
        bearing: -15,
        routeIndex: '02',
        slogan: '백 년의 가업과 삶의 온기가 흐르는 미로',
        description: '은세공의 항박, 전통 실크의 항가이 등 골목마다 특화된 장인 거리. 골목길 깊숙한 곳에서 발견하는 숨겨진 카페와 현지인들의 일상.',
        tags: ['항박 거리', '동쑤언 시장', '에그커피', '골목 산책'],
        image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'van-mieu',
        name: '문묘 국자감',
        nameVi: 'Văn Miếu – Quốc Tử Giám',
        category: '역사유산',
        elevation: '해발 16m · 유교 정원',
        lng: 105.8360,
        lat: 21.0293,
        zoom: 15.8,
        pitch: 50,
        bearing: 25,
        routeIndex: '03',
        slogan: '1070년 베트남 학문의 전당이자 최초의 대학',
        description: '규문각을 지나 마주하는 82개 거북이 비석. 과거에 급제한 진사들의 이름이 새겨진 석비가 고요한 정원과 완벽한 조화를 이룹니다.',
        tags: ['규문각', '진사제명비', '유교 건축', '정원 산책'],
        image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'thang-long-citadel',
        name: '탕롱 황성',
        nameVi: 'Hoàng Thành Thăng Long',
        category: '역사유산',
        elevation: '해발 18m · UNESCO 세계유산',
        lng: 105.8406,
        lat: 21.0342,
        zoom: 15.4,
        pitch: 48,
        bearing: -10,
        routeIndex: '04',
        slogan: '13세기부터 이어진 천년 베트남 왕권의 중심',
        description: '유네스코 세계문화유산으로 지정된 웅장한 황성. 킨티엔 궁전의 용 계단과 도안몬 정문, 현대 역사 유적인 D67 지하 벙커까지 포괄하는 탐방.',
        tags: ['유네스코 유산', '도안몬', '용 계단', '역사 박물관'],
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'st-joseph-cathedral',
        name: '성 요셉 대성당',
        nameVi: 'Nhà Thờ Lớn Hà Nội',
        category: '건축명소',
        elevation: '해발 15m · 광장 중심',
        lng: 105.8494,
        lat: 21.0288,
        zoom: 16.0,
        pitch: 42,
        bearing: 15,
        routeIndex: '05',
        slogan: '1886년 파리 노트르담을 오마주한 네오고딕 성당',
        description: '세월의 흔적이 깃든 고딕 스테인드글라스와 쌍둥이 종탑. 성당 앞 카페 거리에서 노천 좌석에 앉아 즐기는 하노이 특유의 레몬티(짜짠) 문화.',
        tags: ['네오고딕', '스테인드글라스', '성당 광장', '카페 거리'],
        image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'opera-house',
        name: '하노이 오페라 하우스',
        nameVi: 'Nhà Hát Lớn Hà Nội',
        category: '건축명소',
        elevation: '해발 14m · 프랑스 구역',
        lng: 105.8576,
        lat: 21.0245,
        zoom: 15.6,
        pitch: 46,
        bearing: -30,
        routeIndex: '06',
        slogan: '1911년 파리 가르니에 극장의 낭만을 재현한 건축',
        description: '노란 파사드와 웅장한 코린트식 기둥이 아름다운 랜드마크. 프랑스 대사관과 명품 부티크, 클래식 카페가 밀집한 하노이에서 가장 세련된 거리.',
        tags: ['프렌치 건축', '야경 조명', '광장 산책', '클래식 포토존'],
        image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'tran-quoc-pagoda',
        name: '진국사 & 서호',
        nameVi: 'Chùa Trấn Quốc & Hồ Tây',
        category: '호수·자연',
        elevation: '해발 16m · 서호 반도',
        lng: 105.8369,
        lat: 21.0478,
        zoom: 15.2,
        pitch: 44,
        bearing: 20,
        routeIndex: '07',
        slogan: '6세기 창건된 하노이에서 가장 오래된 고찰',
        description: '서호의 작은 섬 위에 우뚝 솟은 붉은 11층 석탑. 인도에서 기증받은 성스러운 보리수나무 아래에서 마주하는 서호의 평화로운 일몰.',
        tags: ['11층 불탑', '서호 일몰', '보리수', '선셋 명소'],
        image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'bat-trang-village',
        name: '바트랑 도예 마을',
        nameVi: 'Làng Gốm Bát Tràng',
        category: '문화예술',
        elevation: '해발 12m · 홍강변',
        lng: 105.9125,
        lat: 20.9790,
        zoom: 14.5,
        pitch: 35,
        bearing: -10,
        routeIndex: '08',
        slogan: '500년을 이어온 베트남 도자기 장인의 요람',
        description: '홍강 유역의 붉은 흙과 가마 터를 따라 펼쳐지는 도예 골목. 장인의 가르침 아래 도자기를 직접 빚고 채색하는 프라이빗 아틀리에 체험.',
        tags: ['도자기 박물관', '물레 체험', '도예 공방', '전통 공예'],
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80'
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
        name: '짜까 라봉 틸라피아 솥 요리 (Chả Cá)',
        nameVi: 'Chả Cá Lã Vọng',
        nameKr: '짜까 라봉 (Chả Cá Lã Vọng)',
        chapter: '04',
        slogan: '강황에 재운 생선을 딜과 파와 함께 무쇠 팬에 볶아내는 별미',
        desc: '1871년부터 전해 내려온 하노이 전통의 무쇠 냄비 요리. 강황과 갈랑갈로 마리네이드한 생선살을 딜(Dill)과 대파와 함께 기름에 지글지글 볶아 맘똠(새우젓)에 곁들여 먹습니다.',
        highlights: ['강황 마리네이드 생선', '향긋한 딜 허브 풍미', '전통 무쇠 팬 테이블 조리'],
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80'
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
  // SCENE 10: SIGNATURE HANOI ITINERARY ("A Journey Through Heritage")
  // =========================================================================
  itineraries: [
    {
      id: '3d2n',
      badge: '시그니처 하노이 헤리티지 3일',
      badgeVi: 'Hành trình di sản 3 ngày 2 đêm',
      daysCount: 3,
      nightsCount: 2,
      durationLabel: '2박 3일 (3 Ngày 2 Đêm)',
      title: '하노이 천년의 유산과 감성 미식 여정',
      titleVi: 'Hà Nội — Ngàn Năm Di Sản & Tinh Hoa Nghệ Thuật',
      overview: '노이바이 공항 VIP 영접부터 호안끼엠, 메트로폴 헤리티지, 문묘, 탕롱 황성, 서호와 전통 에그커피까지 하노이의 핵심을 가장 품격 있게 완성하는 클래식 일정.',
      overviewVi: 'Lịch trình được thiết kế tinh tế kết hợp giữa khách sạn di sản 5 sao, các danh thắng văn hóa tiêu biểu và phong vị ẩm thực Tràng An đích thực.',
      days: [
        {
          day: 1,
          locationTag: '호안끼엠 & 구시가지',
          title: 'Day 01 · 하노이 도착 & 헤리티지 구시가지 산책',
          titleVi: 'Ngày 01 · Chào Hà Nội, Khách Sạn Di Sản & Phố Cổ',
          summary: '노이바이 공항 전용 차량 픽업 후 메트로폴 체크인. 호안끼엠 호수 산책과 정통 하노이 소고기 쌀국수, 원조 에그커피 시음.',
          image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
          activities: [
            { time: '11:30', title: '노이바이 국제공항(HAN) VIP 전용 차량 영접', desc: '입국장 피켓 미팅 후 시원한 생수가 구비된 전용 차량 탑승' },
            { time: '13:00', title: '소피텔 메트로폴 하노이 체크인 & 휴식', desc: '100년 역사의 럭셔리 헤리티지 호텔 객실 안내 및 웰컴 드링크' },
            { time: '15:00', title: '호안끼엠 호수 & 응옥선 사당 도보 산책', desc: '전담 가이드와 함께 테훅 붉은 다리를 건너며 듣는 호수의 설화' },
            { time: '17:00', title: '원조 3대 카페에서 즐기는 전통 에그커피', desc: '부드러운 달걀 크림이 얹어진 하노이 고유의 커피 문화 체험' },
            { time: '19:00', title: '백 년 전통 하노이 정통 쌀국수 만찬', desc: '깊고 맑은 양지 육수가 일품인 현지 최고 명가의 프라이빗 디너' }
          ]
        },
        {
          day: 2,
          locationTag: '문묘 & 탕롱 황성',
          title: 'Day 02 · 천년 역사 탐방 & 프렌치 쿼터의 낭만',
          titleVi: 'Ngày 02 · Chiều Sâu Văn Hiến & Dấu Ấn Kiến Trúc Pháp',
          summary: '베트남 최초의 국립대학 문묘와 유네스코 탕롱 황성 탐방. 성 요셉 성당과 오페라 하우스 앞 프렌치 파인다이닝.',
          image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
          activities: [
            { time: '09:00', title: '문묘 국자감(Văn Miếu) 프라이빗 역사 해설', desc: '규문각 정원과 82개 진사제명비를 둘러보는 깊이 있는 학문 탐방' },
            { time: '11:30', title: '점심 만찬: 숯불 향 가득한 정통 분짜', desc: '참숯 직화 돼지고기와 신선한 허브를 곁들인 하노이 소울푸드' },
            { time: '14:00', title: '유네스코 세계유산 탕롱 황성 단독 순회', desc: '도안몬 정문, 용의 계단, 지하 군사벙커까지 아우르는 왕조의 역사' },
            { time: '16:30', title: '성 요셉 대성당 & 프랑스 구역 가로수길', desc: '노란 관저 건물들과 고딕 성당 앞 노천카페에서 즐기는 티타임' },
            { time: '19:00', title: '인도차이나 프렌치 파인다이닝 디너', desc: '프랑스 요리 기법과 베트남 제철 식재료가 만나는 미식의 정점' }
          ]
        },
        {
          day: 3,
          locationTag: '서호 & 바트랑',
          title: 'Day 03 · 서호의 평화로운 아침 & 장인 마을 배웅',
          titleVi: 'Ngày 03 · Bình Yên Hồ Tây & Tạm Biệt Hà Nội',
          summary: '서호 진국사 아침 참배 후 바트랑 도예 공방 체험 또는 구시가지 자유 쇼핑. 전용 차량으로 노이바이 공항 안전 샌딩.',
          image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
          activities: [
            { time: '08:30', title: '서호(West Lake) 수변 산책 & 진국사 탐방', desc: '하노이에서 가장 오래된 고찰 진국사의 붉은 불탑과 호수 바람' },
            { time: '10:30', title: '바트랑 500년 도자기 마을 아틀리에 체험', desc: '도예 장인의 지도로 나만의 찻잔을 빚고 구시가지 실크 쇼핑' },
            { time: '13:00', title: '작별 오찬: 바삭한 샬롯 얹은 탄찌 반꾸온', desc: '가볍고 담백한 쌀전병과 따뜻한 디핑 소스로 마무리하는 미식' },
            { time: '15:30', title: '노이바이 국제공항(HAN) 전용 차량 센딩', desc: '항공 스케줄에 맞춘 편안한 이동 및 출국 수속 지원' }
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
      authorType: '30대 부부 헤리티지 여행',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      destination: 'Hanoi Heritage 3D2N',
      rating: 5,
      date: '2026년 가을',
      quote: '“메트로폴 호텔에서 머물며 전담 가이드님과 호안끼엠 골목을 천천히 걸었던 시간이 평생 잊지 못할 추억이 되었습니다. 패키지와는 차원이 다른 깊이입니다.”',
      highlightTag: '100% 프라이빗 도보 해설'
    },
    {
      id: 'hanoi-story-2',
      author: '이성민 가족 (부모님 동반 5인)',
      authorType: '칠순 기념 효도 가족여행',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      destination: 'Hanoi & West Lake Private',
      rating: 5,
      date: '2026년 봄',
      quote: '“부모님을 모시고 가는 여행이라 걱정이 많았는데, 쏠라티 전용 차량이 언제나 대기하고 가이드님이 부모님 걸음걸이에 맞춰 배려해주셔서 정말 감동했습니다.”',
      highlightTag: '전용 차량 & 편안한 동선'
    },
    {
      id: 'hanoi-story-3',
      author: '최유진 & 친구들',
      authorType: '미식 살롱 탐방 여행',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      destination: 'Hanoi Culinary Tour',
      rating: 5,
      date: '2026년 겨울',
      quote: '“원조 에그커피 집부터 강황 생선구이 짜까라봉까지, 현지 찐 맛집들만 골라 예약해주셔서 친구들 모두 인생 여행이라고 입을 모았습니다.”',
      highlightTag: '시그니처 미식 큐레이션'
    }
  ],

  // =========================================================================
  // SCENE 12: CINEMATIC FINALE ("Hanoi Stays With You")
  // =========================================================================
  finalCta: {
    kicker: 'CINEMATIC FINALE · HANOI STAYS WITH YOU',
    title: 'HANOI STAYS WITH YOU.',
    titleVi: 'HANOI STAYS WITH YOU.',
    subtitle: '여행은 끝나도, 하노이의 기억은 오래 남습니다.',
    subtitleVi: 'Có những hành trình khép lại, nhưng ký ức còn ở lại.',
    description: '100% 프라이빗 맞춤 여행 · 지금 하노이 전담 컨시어지와 나만의 특별한 일정을 상담해 보세요.',
    descriptionVi: 'Hành trình 100% riêng tư không ghép đoàn · Kết nối ngay cùng chuyên viên Super EZ Tour để thiết kế lịch trình dành riêng cho bạn.',
    ctaText: '프라이빗 여행 상담하기',
    ctaTextVi: 'Bắt đầu hành trình riêng'
  }
};

export default HA_NOI_CONFIG;
