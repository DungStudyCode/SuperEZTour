import { ShoppingBag, Coffee, Home, Camera } from 'lucide-react';

/**
 * SUPER EZ TOUR — HANOI OLD QUARTER CINEMATIC 2.5D SCENES
 * 
 * Curated cultural storytelling data for Hanoi Screen 2.
 * Real Photography + 2.5D Parallax + Bilingual KO/VI Content.
 */
export const OLD_QUARTER_SCENES = [
  {
    id: 'hang-bac',
    index: 1,
    sceneNumber: '01',
    icon: ShoppingBag,
    name: 'Phố Nghề Kim Hoàn Hàng Bạc',
    nameKr: '항박 은세공 장인 거리',
    nameEn: 'Hang Bac Silversmiths Guild',
    category: 'VĂN HÓA PHỐ NGHỀ',
    categoryKr: '500년 전통 장인 가업',
    era: 'Thế kỷ 13 – Nay (Thời Hậu Lê)',
    eraKr: '13세기 후 레 왕조 – 현재',
    subtitle: 'Nơi lưu giữ hồn cốt bạc nén và nghệ thuật chạm khắc thủ công Thăng Long',
    subtitleKr: '500년 세월 동안 황실 은괴를 빚어낸 장인들의 숨결',
    summary: 'Con phố kim hoàn cổ kính hơn 500 năm tuổi, nơi các bậc nghệ nhân kim hoàn làng Định Công và Châu Khê quy tụ đúc bạc nén cho triều đình Thăng Long xưa. Từng nhát búa, vết chạm trổ vẫn ngân vang qua các ngõ hẹp.',
    summaryKr: '15세기 탕롱 황실에 은괴를 납품하던 정예 장인들이 모여 형성된 500년 역사의 은세공 거리. 지금도 좁은 골목마다 망치질 소리와 세공 장인들의 가업이 이어지고 있습니다.',
    image: '/assets/destinations/hanoi/old-quarter/hang_bac.webp',
    credits: 'Photo: Benjamin Smith / Wikimedia Commons (CC BY-SA 4.0)',
    hotspotPos: { x: 48, y: 52 },
    motion: {
      type: 'zoom-push',
      scaleStart: 1.0,
      scaleEnd: 1.09,
      yStart: 0,
      yEnd: -25,
    },
    details: [
      'Đình Kim Ngân thờ tổ nghề kim hoàn lập từ thời Hậu Lê (số 42-44 Hàng Bạc)',
      'Kỹ thuật chạm khắc bạc thủ công chạm - đậu - trổ tinh xảo bậc nhất kinh kỳ',
      'Đặc quyền ghé thăm xưởng chế tác gia truyền cùng nghệ nhân trong Private Tour'
    ],
    detailsKr: [
      '후 레 왕조 때 건립된 은세공 시조를 모시는 낌응안 사당 (항박 42-44번지)',
      '망치와 정만으로 정교한 문양을 빚어내는 극상의 전통 은세공 기법',
      'Super EZ Tour 전담 가이드와 함께 장인의 옛 공방을 직접 방문하는 프라이빗 탐방'
    ]
  },
  {
    id: 'cafe-giang',
    index: 2,
    sceneNumber: '02',
    icon: Coffee,
    name: 'Cà Phê Trứng Gia Truyền Giảng',
    nameKr: '원조 에그커피 지앙 살롱',
    nameEn: 'Giang Heirloom Egg Coffee 1946',
    category: 'TINH HOA ẨM THỰC',
    categoryKr: '1946년부터 이어진 전설의 미식',
    era: '1946 – Nay (Khởi xướng tại Sofitel Metropole)',
    eraKr: '1946년 – 현재 (소피텔 메트로폴 바텐더 창안)',
    subtitle: 'Bí mật tách cà phê trứng sánh mịn ngạt ngào từ những năm kháng chiến',
    subtitleKr: '달걀 크림과 진한 로부스타의 벨벳 같은 하모니',
    summary: 'Khởi nguồn từ năm 1946 do cụ Nguyễn Văn Giảng — nguyên bartender khách sạn Sofitel Legend Metropole sáng tạo. Trong hoàn cảnh thiếu sữa tươi, cụ đã dùng lòng đỏ trứng gà đánh bông thành lớp kem sánh mịn quyện cùng cà phê Robusta đậm đặc.',
    summaryKr: '1946년 프랑스 식민지 시절 소피텔 메트로폴 바텐더 출신 응우옌 반 지앙이 창안한 베트남 커피의 정점. 우유가 귀하던 시절, 달걀 노른자를 휘핑하여 만든 벨벳 크림과 진한 로부스타 원두의 황홀한 만남.',
    image: '/assets/destinations/hanoi/old-quarter/cafe_giang.webp',
    credits: 'Photo: travel oriented / Wikimedia Commons (CC BY-SA 2.0)',
    hotspotPos: { x: 50, y: 56 },
    motion: {
      type: 'dolly-glow',
      scaleStart: 1.03,
      scaleEnd: 1.13,
      yStart: 10,
      yEnd: -15,
    },
    details: [
      'Công thức đánh kem trứng bí truyền trong bát nước nóng giữ nhiệt hoàn hảo',
      'Không gian giếng trời nhuốm màu thời gian với bàn gỗ thấp và tranh ký họa xưa',
      'Được chuẩn bị bàn VIP riêng cho khách Super EZ Tour thưởng thức chậm rãi'
    ],
    detailsKr: [
      '달걀 비린내 없이 끝까지 온기를 유지하는 따뜻한 온수 그릇 서빙 전통',
      '세월이 깃든 나무 테이블과 안뜰 햇살이 머무는 고택 감성의 공간',
      'Super EZ Tour 고객을 위한 사전 예약 VIP 좌석 및 바리스타 시연 관람'
    ]
  },
  {
    id: 'ma-may-87',
    index: 3,
    sceneNumber: '03',
    icon: Home,
    name: 'Ngôi Nhà Di Sản 87 Mã Mây',
    nameKr: '87 마메이 전통 고택',
    nameEn: 'Ancient Heritage House 87 Ma May',
    category: 'KIẾN TRÚC NHÀ ỐNG',
    categoryKr: '19세기 후반 상인 전통 목조 가옥',
    era: 'Cuối thế kỷ 19 (Thời Nguyễn)',
    eraKr: '19세기 말 (응우옌 왕조)',
    subtitle: 'Kiến trúc nhà ống gỗ lim hai tầng đón gió trời đặc trưng đất kinh kỳ',
    subtitleKr: '도심 속 빛과 바람을 품은 전통 상가 가옥의 지혜',
    summary: 'Ngôi nhà ống hai tầng điển hình xây dựng từ cuối thế kỷ 19, mặt tiền hẹp nhưng chiều sâu hun hút. Toàn bộ khung nhà bằng gỗ lim quý, các giếng trời giữa nhà giúp luân chuyển gió và ánh sáng tự nhiên tuyệt diệu.',
    summaryKr: '19세기 말에 지어진 좁고 깊은 전형적인 튜브형 상가 주택(Tube House). 묵직한 림(Ironwood) 목재 구조와 안뜰 중정을 통해 자연 바람과 햇빛을 끌어들이는 지혜로운 전통 생태 건축.',
    image: '/assets/destinations/hanoi/old-quarter/ma_may_87.webp',
    credits: 'Photo: Maison longue traditionnelle / Wikimedia Commons (CC BY-SA 3.0)',
    hotspotPos: { x: 44, y: 48 },
    motion: {
      type: 'horizontal-track',
      scaleStart: 1.05,
      scaleEnd: 1.08,
      xStart: 25,
      xEnd: -25,
    },
    details: [
      'Kiến trúc nhà ống "tiền chế hậu cư" vừa buôn bán vừa sinh hoạt gia tộc',
      'Giếng trời trung tâm điều hòa vi khí hậu mát mẻ quanh năm không cần điều hòa',
      'Bảo tồn nguyên vẹn đồ gỗ, trường kỷ, bộ ấm chén và gốm cổ Thăng Long trăm năm'
    ],
    detailsKr: [
      '1층 상점, 2층 주거 및 제단을 갖춘 상인 가옥의 전형적인 공간 분할',
      '도심 속에서 사계절 내내 서늘한 기운을 유지하는 중앙 안뜰의 마법',
      '백 년 전 고가구와 다기 세트, 전통 공예품이 원형 그대로 보존된 유산'
    ]
  },
  {
    id: 'ganh-hang-rong',
    index: 4,
    sceneNumber: '04',
    icon: Camera,
    name: 'Gánh Hàng Rong & Xe Hoa Phố Cổ',
    nameKr: '골목 행상과 계절 꽃 자전거',
    nameEn: 'Flower Bicycles & Old Quarter Vendors',
    category: 'NHỊP SỐNG KÝ ỨC',
    categoryKr: '하노이 골목길의 서정적 일상',
    era: 'Nét duyên Thăng Long trường tồn',
    eraKr: '천년 수도 탕롱의 살아있는 서정시',
    subtitle: 'Bốn mùa hoa Hà Nội chở trên những vòng xe đạp thong dong qua phố cũ',
    subtitleKr: '계절마다 피어나는 꽃향기를 싣고 달리는 하노이의 낭만',
    summary: 'Hình ảnh những chiếc xe đạp chở đầy hoa cúc họa mi chớm đông, hoa loa kèn tháng tư hay sen hồng mùa hạ, cùng tiếng rao êm đềm đã trở thành biểu tượng thi vị nhất của nhịp sống phố cổ Hà Nội.',
    summaryKr: '계절의 변화를 가장 먼저 알리는 꽃을 가득 실은 자전거와 대나무 광주리를 멘 행상들이 만들어내는 하노이만의 서정적인 거리 풍경. 아침 햇살 속에 만나는 가장 따스한 도시의 기억.',
    image: '/assets/destinations/hanoi/old-quarter/xe_hoa.webp',
    credits: 'Photo: Daily life in Vietnam Street Vendor / Wikimedia Commons (CC BY-SA 2.0)',
    hotspotPos: { x: 55, y: 52 },
    motion: {
      type: 'lateral-glide',
      scaleStart: 1.02,
      scaleEnd: 1.11,
      xStart: -20,
      xEnd: 20,
      yStart: 10,
      yEnd: -10,
    },
    details: [
      'Mười hai mùa hoa Hà Nội: Cúc họa mi đầu đông, hoa loa kèn tháng 4, sen Tây Hồ',
      'Những đôi gánh tre uốn cong nhịp bước khoan thai giữa lòng phố thị náo nhiệt',
      'Điểm chụp ảnh nghệ thuật được nhiếp ảnh gia Super EZ Tour tư vấn góc máy độc quyền'
    ],
    detailsKr: [
      '초겨울의 순백 국화, 4월의 나팔꽃, 한여름 서호의 연꽃 등 12개 계절 꽃의 향연',
      '아침 햇살 속 골목을 지나는 꽃 자전거의 그림 같은 실루엣과 감성',
      '전문 포토그래퍼가 안내하는 프라이빗 스냅 촬영 최적 포인트 제공'
    ]
  }
];

export const TOTAL_SCENES = OLD_QUARTER_SCENES.length;
