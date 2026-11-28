/**
 * SUPER EZ TOUR — HANOI SCREEN 4 V2
 * BÚN CHẢ HÀ NỘI — THE FRAGRANCE OF CHARCOAL AT NOON
 *
 * Five-Act Documentary Script, Distinct Motion Profiles & Bilingual Storytelling (KO / VI)
 */

export const BUN_CHA_DOCUMENTARY_ACTS = [
  {
    actId: 'buncha-act-01',
    actNumber: '01',
    kickerVi: 'HỒI 01 / 05 · HƯƠNG KHÓI GIỮA TRƯA',
    kickerKo: '제1막 / 5막 · 정오의 숯불 향기',
    themeVi: 'Hương thơm từ bếp than',
    themeKo: '하노이 골목을 채우는 숯불의 온기',
    titleVi: 'BÚN CHẢ HÀ NỘI',
    titleKo: '하노이 분짜',
    subtitleVi: 'Hương thơm từ bếp than.',
    subtitleKo: '숯불 향이 피어오르는 하노이의 점심.',
    storyVi:
      'Giữa nhịp sống buổi trưa, mùi thịt nướng trên than hoa len qua những con phố Hà Nội. Những miếng thịt vàng thơm, bát nước chấm ấm và phần bún trắng tạo nên một bữa ăn gần gũi, đậm nét địa phương.',
    storyKo:
      '점심 무렵 하노이 골목에는 숯불에 구운 돼지고기의 고소한 향이 퍼집니다. 노릇하게 구운 고기와 따뜻한 새콤달콤한 소스, 부드러운 쌀국수가 어우러져 하노이의 일상을 담은 한 끼를 완성합니다.',
    assetId: 'buncha-hero',
    layoutVariant: 'fullscreen-hero',
    scrimGradient: 'fullscreen-hero',
    motionProfile: {
      scaleStart: 1.04,
      scaleEnd: 1.08,
      panXStart: -16,
      panXEnd: 16,
      panYStart: 0,
      panYEnd: 0
    }
  },
  {
    actId: 'buncha-act-02',
    actNumber: '02',
    kickerVi: 'HỒI 02 / 05 · NGHỆ THUẬT NƯỚNG CHẢ',
    kickerKo: '제2막 / 5막 · 숯불 직화의 기술',
    themeVi: 'Nghệ thuật nướng chả',
    themeKo: '참숯 위에서 깨어나는 두 가지 식감',
    titleVi: 'Nghệ thuật của bếp than',
    titleKo: '숯불이 완성하는 풍미',
    subtitleVi: 'Chả viên mềm mọng và chả miếng vàng cạnh trên than hoa.',
    subtitleKo: '촉촉한 완자와 노릇한 삼겹살이 빚어내는 조화.',
    storyVi:
      'Thịt được tẩm ướp rồi nướng trên than hoa cho đến khi dậy mùi thơm. Chả viên mềm mọng và chả miếng vàng cạnh mang đến hai kết cấu khác nhau, tạo nên nét đặc trưng của bún chả Hà Nội.',
    storyKo:
      '양념한 돼지고기를 숯불에 구워 향긋한 풍미를 더합니다. 촉촉한 돼지고기 완자와 노릇하게 구운 고기 조각은 서로 다른 식감을 선사하며 하노이 분짜의 매력을 완성합니다.',
    assetId: 'buncha-charcoal',
    layoutVariant: 'left-editorial',
    scrimGradient: 'left-editorial',
    motionProfile: {
      scaleStart: 1.02,
      scaleEnd: 1.07,
      panXStart: 14,
      panXEnd: -14,
      panYStart: 4,
      panYEnd: -4
    }
  },
  {
    actId: 'buncha-act-03',
    actNumber: '03',
    kickerVi: 'HỒI 03 / 05 · LINH HỒN NƯỚC CHẤM',
    kickerKo: '제3막 / 5막 · 새콤달콤한 소스의 조화',
    themeVi: 'Linh hồn nước chấm',
    themeKo: '풍미를 감싸 안는 따뜻한 느억맘',
    titleVi: 'Sự cân bằng trong bát nước chấm',
    titleKo: '새콤달콤한 소스의 균형',
    subtitleVi: 'Vị chua thanh, ngọt dịu hòa cùng đu đủ xanh và su hào ngâm giòn.',
    subtitleKo: '따뜻한 피시소스와 아삭한 절임 채소가 이루는 깔끔한 균형.',
    storyVi:
      'Nước mắm được pha cùng vị chua, ngọt và các gia vị để tạo nên bát nước chấm hài hòa. Thịt nướng, đu đủ xanh hoặc su hào ngâm kết hợp với nước chấm, giúp cân bằng vị đậm đà của món ăn.',
    storyKo:
      '피시소스에 새콤함과 단맛을 조화롭게 더해 분짜 특유의 소스를 만듭니다. 숯불에 구운 고기와 절인 채소가 어우러져 풍부하면서도 균형 잡힌 맛을 선사합니다.',
    assetId: 'buncha-dipping',
    layoutVariant: 'right-editorial',
    scrimGradient: 'right-editorial',
    motionProfile: {
      scaleStart: 1.0,
      scaleEnd: 1.05,
      panXStart: 0,
      panXEnd: 0,
      panYStart: 6,
      panYEnd: -4,
      extendedHold: true
    }
  },
  {
    actId: 'buncha-act-04',
    actNumber: '04',
    kickerVi: 'HỒI 04 / 05 · MÂM BÚN CHẢ HÀ THÀNH',
    kickerKo: '제4막 / 5막 · 한 상의 풍요로움',
    themeVi: 'Một mâm bún chả Hà Nội',
    themeKo: '각기 다른 재료가 한데 어우러지는 미학',
    titleVi: 'Một mâm bún chả, trọn vẹn hương vị',
    titleKo: '한 상에 담긴 하노이의 맛',
    subtitleVi: 'Bún trắng mềm, rau sống tươi mát và bát chả nướng ấm nóng.',
    subtitleKo: '부드러운 쌀면과 싱그러운 허브, 숯불 고기의 조화로운 구성.',
    storyVi:
      'Phần bún trắng, rau sống tươi, thịt nướng và nước chấm được dọn riêng để thực khách tự kết hợp theo sở thích. Chính sự giản dị và cân bằng ấy khiến bún chả trở thành món ăn quen thuộc của Hà Nội.',
    storyKo:
      '쌀국수 면과 신선한 채소, 숯불 돼지고기, 소스를 각각 곁들여 취향에 맞게 즐깁니다. 소박하지만 조화로운 구성은 하노이 분짜만의 특별한 매력입니다.',
    assetId: 'buncha-pork',
    layoutVariant: 'layered-editorial',
    scrimGradient: 'layered-editorial',
    motionProfile: {
      scaleStart: 1.08,
      scaleEnd: 1.0,
      panXStart: 0,
      panXEnd: 0,
      panYStart: -6,
      panYEnd: 0
    }
  },
  {
    actId: 'buncha-act-05',
    actNumber: '05',
    kickerVi: 'HỒI 05 / 05 · NHỊP SỐNG BỮA TRƯA',
    kickerKo: '제5막 / 5막 · 하노이 점심의 미학',
    themeVi: 'Bữa trưa giữa lòng Hà Nội',
    themeKo: '하노이 사람들의 일상 속으로 들어가는 점심',
    titleVi: 'Một bữa trưa rất Hà Nội',
    titleKo: '하노이의 일상을 맛보는 점심',
    subtitleVi: 'Gắp một đũa bún, thưởng thức cùng thịt nướng và nước chấm ấm giữa phố phường.',
    subtitleKo: '골목의 정취 속에서 천천히 음미하는 가장 하노이다운 점심 시간.',
    storyVi:
      'Ngồi trong một quán ăn địa phương, gắp bún và rau sống, rồi thưởng thức cùng thịt nướng và nước chấm — bún chả mang đến một cách gần gũi để khám phá nhịp sống thường ngày của Hà Nội.',
    storyKo:
      '현지 식당에 앉아 쌀국수 면과 신선한 채소를 집어 숯불 돼지고기와 소스에 곁들여 보세요. 하노이 사람들의 일상을 가까이에서 느낄 수 있는 특별한 점심 경험입니다.',
    ctaVi: 'Thêm trải nghiệm Bún chả Hà Nội',
    ctaKo: '하노이 분짜 체험 일정에 추가',
    ctaAddedVi: 'Đã thêm Bún chả vào hành trình',
    ctaAddedKo: '분짜 미식 일정에 담김',
    secondaryCtaVi: 'Khám phá Bún chả Hà Nội',
    secondaryCtaKo: '하노이 분짜 더 알아보기',
    assetId: 'buncha-table',
    layoutVariant: 'wide-ending',
    scrimGradient: 'wide-ending',
    motionProfile: {
      scaleStart: 1.06,
      scaleEnd: 1.0,
      panXStart: -8,
      panXEnd: 0,
      panYStart: 0,
      panYEnd: 0
    }
  }
];
