/**
 * SUPER EZ TOUR — HANOI SCREEN 5 V1
 * HANOI THROUGH THE SEASONS — DATA-DRIVEN SEASONAL STORYBOARD (KO / VI)
 *
 * Official Titles:
 *  - VI: Hà Nội qua bốn mùa
 *  - KO: 하노이의 사계절
 *
 * Separates editorial content, travel recommendations, practical tips,
 * layout positioning, and camera motion profiles from presentation & GSAP lifecycle.
 */

export const SEASON_SECTION_HEADER = {
  eyebrowVi: 'BỐN MÙA TRÀNG AN',
  eyebrowKo: '사계절의 기록',
  titleVi: 'Hà Nội qua bốn mùa',
  titleKo: '하노이의 사계절',
  subtitleVi:
    'Bốn sắc thái thời gian lặng lẽ chuyển mình qua từng vòm cây, mặt hồ và nhịp sống phố phường.',
  subtitleKo:
    '호수와 가로수, 골목의 일상을 따라 천천히 흐르는 하노이의 네 가지 계절.'
};

export const SEASON_UI_LABELS = {
  experiencesHeadingVi: 'Trải nghiệm gợi ý',
  experiencesHeadingKo: '추천 경험',
  travelTipHeadingVi: 'Lưu ý du lịch',
  travelTipHeadingKo: '여행 팁',
  photoCreditLabelVi: 'Ảnh tư liệu',
  photoCreditLabelKo: '사진 출처'
};

export const HANOI_SEASON_SCENES = [
  {
    id: 'spring',
    seasonNumber: '01',

    kickerVi: '01 / 04 — MÙA XUÂN',
    kickerKo: '01 / 04 — 봄',

    titleVi: 'Hà Nội thức giấc',
    titleKo: '깨어나는 하노이',

    descriptionVi:
      'Khi những cành đào khoe sắc và phố phường đón nhịp sống đầu năm, Hà Nội mang một vẻ đẹp dịu dàng, tươi mới và đầy sức sống.',
    descriptionKo:
      '복숭아꽃이 피어나고 거리마다 새해의 활기가 감돌 때, 하노이는 부드럽고 싱그러운 생기로 깨어납니다.',

    monthRangeVi: 'Tháng 2–4 · Tham khảo',
    monthRangeKo: '2월~4월 · 참고 시기',

    experiencesVi: [
      'Khám phá làng hoa Nhật Tân',
      'Dạo phố cổ đầu xuân',
      'Trải nghiệm văn hóa Tết nếu đúng dịp'
    ],
    experiencesKo: [
      '녓떤(Nhật Tân) 꽃마을 탐방',
      '구시가지 봄 산책',
      '설(Tết) 기간 전통 명절 문화 체험'
    ],

    travelTipVi:
      'Hoa đào thường nở đẹp vào thời gian gần Tết Nguyên Đán, phụ thuộc thời tiết và lịch âm từng năm — không nở kéo dài suốt cả tháng 2–4.',
    travelTipKo:
      '복숭아꽃은 매년 음력 일정과 날씨에 따라 설(Tết) 전후에 가장 아름답게 피며, 2~4월 내내 피어 있는 것은 아닙니다.',

    assetId: 'season-spring',
    layoutVariant: 'left-editorial',

    motionProfile: {
      scaleStart: 1.0,
      scaleEnd: 1.05,
      panXStart: 0,
      panXEnd: 0,
      panYStart: 0,
      panYEnd: 0,
      extendedHold: false
    },

    sources: [
      'Wikimedia Commons — File:Prunus_persica_(Nhat_Tan)_3.jpg (Public Domain)'
    ]
  },

  {
    id: 'summer',
    seasonNumber: '02',

    kickerVi: '02 / 04 — MÙA HẠ',
    kickerKo: '02 / 04 — 여름',

    titleVi: 'Rực rỡ những ngày hè',
    titleKo: '싱그러운 하노이의 여름',

    descriptionVi:
      'Những đầm sen, hàng cây xanh và ánh nắng trải dài bên Hồ Tây tạo nên một Hà Nội rực rỡ, giàu sức sống trong những ngày hè.',
    descriptionKo:
      '푸른 연못과 울창한 가로수, 서호(Hồ Tây) 위로 쏟아지는 햇살이 어우러져 생명력 넘치는 하노이의 여름 풍경을 완성합니다.',

    monthRangeVi: 'Tháng 5–7 · Tham khảo',
    monthRangeKo: '5월~7월 · 참고 시기',

    experiencesVi: [
      'Khám phá đầm sen đúng mùa',
      'Thưởng thức trà sen',
      'Ngắm hoàng hôn Hồ Tây'
    ],
    experiencesKo: [
      '개화 시기에 맞춘 서호 연꽃 연못 방문',
      '하노이 전통 연꽃차 음미',
      '서호(Hồ Tây)의 저녁노을 감상'
    ],

    travelTipVi:
      'Sen Hồ Tây thường nở rộ từ cuối tháng 5 đến tháng 6; nên ưu tiên tham quan ngoài trời vào sáng sớm hoặc chiều muộn khi thời tiết dịu mát.',
    travelTipKo:
      '서호 연꽃은 보통 5월 말에서 6월 사이에 절정을 이룹니다. 한낮의 더위를 피해 이른 아침이나 해 질 무렵에 야외 일정을 계획해 보세요.',

    assetId: 'season-summer',
    layoutVariant: 'right-editorial',

    motionProfile: {
      scaleStart: 1.05,
      scaleEnd: 1.07,
      panXStart: -14,
      panXEnd: 14,
      panYStart: 0,
      panYEnd: 0,
      extendedHold: false
    },

    sources: [
      'Wikimedia Commons — File:Sen_bách_diệp_Tây_Hồ.JPG (CC BY-SA 4.0)'
    ]
  },

  {
    id: 'autumn',
    seasonNumber: '03',
    isHeroSeason: true,

    kickerVi: '03 / 04 — MÙA THU',
    kickerKo: '03 / 04 — 가을',

    titleVi: 'Hà Nội mùa thương nhớ',
    titleKo: '마음에 남는 하노이',

    descriptionVi:
      'Nắng hanh dịu nhẹ, những hàng cây cổ thụ và hương cốm mới mang đến một Hà Nội chậm rãi, trầm lắng và đầy chất thơ.',
    descriptionKo:
      '부드러운 가을 햇살과 고목이 늘어선 거리, 풋풋한 햇쌀 꼼(Cốm)의 향기가 어우러져 가장 서정적이고 여유로운 하노이를 선사합니다.',

    monthRangeVi: 'Tháng 8–10 · Tham khảo',
    monthRangeKo: '8월~10월 · 참고 시기',

    experiencesVi: [
      'Dạo phố Phan Đình Phùng',
      'Thưởng thức cốm làng Vòng',
      'Đi bộ quanh Hồ Gươm'
    ],
    experiencesKo: [
      '고목이 이어지는 판딘풍 거리 산책',
      '랑봉(Làng Vòng) 햇쌀 디저트 꼼 맛보기',
      '호안끼엠 호수 둘레길 산책'
    ],

    travelTipVi:
      'Không phải toàn bộ cây cối Hà Nội đều đổi màu lá cùng lúc; tiết trời thu dịu nhẹ là thời điểm lý tưởng để đi bộ và khám phá phố phường.',
    travelTipKo:
      '하노이의 가로수는 모든 나무가 동시에 단풍으로 물들지는 않지만, 선선하고 쾌적한 날씨가 이어져 도보로 도시를 여행하기에 가장 좋은 시기입니다.',

    assetId: 'season-autumn',
    layoutVariant: 'left-editorial',

    motionProfile: {
      scaleStart: 1.0,
      scaleEnd: 1.07,
      panXStart: 0,
      panXEnd: 0,
      panYStart: 4,
      panYEnd: -4,
      extendedHold: true
    },

    sources: [
      'Wikimedia Commons — File:Hanoi_shady_street.jpg (CC BY 2.0)'
    ]
  },

  {
    id: 'winter',
    seasonNumber: '04',

    kickerVi: '04 / 04 — MÙA ĐÔNG',
    kickerKo: '04 / 04 — 겨울',

    titleVi: 'Khoảng lặng của thủ đô',
    titleKo: '고요한 하노이의 겨울',

    descriptionVi:
      'Trong làn sương sớm và không khí se lạnh, Hà Nội trở nên trầm mặc hơn. Những con phố nhỏ, quán cà phê ấm áp và món ăn nóng tạo nên một nét quyến rũ rất riêng.',
    descriptionKo:
      '이른 아침의 물안개와 서늘한 공기 속에서 하노이는 한층 차분해집니다. 골목길의 작은 카페와 따뜻한 음식들이 겨울 하노이만의 깊은 여운을 전합니다.',

    monthRangeVi: 'Tháng 11–1 · Tham khảo',
    monthRangeKo: '11월~1월 · 참고 시기',

    experiencesVi: [
      'Thưởng thức cà phê trứng',
      'Khám phá ẩm thực nóng',
      'Dạo phố cổ những ngày se lạnh'
    ],
    experiencesKo: [
      '구시가지에서 따뜻한 에그커피 즐기기',
      '쌀쌀한 날에 어울리는 따뜻한 현지 음식 탐방',
      '차분한 겨울 분위기의 구시가지 산책'
    ],

    travelTipVi:
      'Hà Nội mùa đông không có tuyết nhưng có những đợt lạnh ẩm; nên chuẩn bị trang phục giữ ấm phù hợp và kiểm tra dự báo thời tiết trước chuyến đi.',
    travelTipKo:
      '하노이의 겨울은 눈이 내리지 않지만 습도가 있어 체감 온도가 쌀쌀할 수 있으므로, 따뜻한 외투를 준비하고 출발 전 일기예보를 확인하세요.',

    assetId: 'season-winter',
    layoutVariant: 'right-editorial',

    motionProfile: {
      scaleStart: 1.07,
      scaleEnd: 1.0,
      panXStart: 0,
      panXEnd: 0,
      panYStart: -3,
      panYEnd: 0,
      extendedHold: false
    },

    sources: [
      'Wikimedia Commons — File:The_Turtle_Tower_(39558150274).jpg (CC BY-SA 2.0)'
    ]
  }
];
