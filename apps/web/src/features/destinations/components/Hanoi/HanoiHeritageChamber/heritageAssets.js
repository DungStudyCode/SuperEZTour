/**
 * SUPER EZ TOUR — HANOI SCREEN 3 V4.1
 * GRAND HERITAGE DOCUMENTARY — VERIFIED PHOTOGRAPHIC ASSET MANIFEST & COLOR GRADING
 *
 * V4.1 Upgrades:
 *  - Every chapter asset directly depicts the exact monument being narrated.
 *  - Chapter 03 (82 Bia Tiến Sĩ) exclusively uses verified photographs of the
 *    doctoral stelae and stone tortoises (no generic temple roofs or censers).
 *  - Dedicated wide heritage courtyard asset for the Documentary Ending.
 *  - Localized directional scrims preserve natural terracotta, stone, wood, and foliage
 *    colors without heavy full-screen black darkening.
 */

export const HERITAGE_SCRIM_GRADIENTS = {
  'right-editorial':
    'linear-gradient(270deg, rgba(14, 20, 22, 0.82) 0%, rgba(14, 20, 22, 0.62) 24%, rgba(14, 20, 22, 0.22) 44%, rgba(14, 20, 22, 0.0) 62%)',
  'left-editorial':
    'linear-gradient(90deg, rgba(14, 20, 22, 0.82) 0%, rgba(14, 20, 22, 0.62) 24%, rgba(14, 20, 22, 0.22) 44%, rgba(14, 20, 22, 0.0) 62%)',
  'opening-gateway':
    'linear-gradient(180deg, rgba(14, 20, 22, 0.20) 0%, rgba(14, 20, 22, 0.06) 38%, rgba(14, 20, 22, 0.62) 74%, rgba(14, 20, 22, 0.86) 100%)',
  'ending-legacy':
    'linear-gradient(180deg, rgba(14, 20, 22, 0.16) 0%, rgba(14, 20, 22, 0.08) 46%, rgba(14, 20, 22, 0.68) 78%, rgba(14, 20, 22, 0.88) 100%)'
};

export const HERITAGE_ASSET_MANIFEST = {
  'van-mieu-opening-gateway': {
    id: 'van-mieu-opening-gateway',
    chapterId: 'opening',
    src: '/assets/destinations/hanoi/heritage/van-mieu-opening-gateway.webp',
    mobileSrc: '/assets/destinations/hanoi/heritage/van-mieu-opening-gateway-mobile.webp',
    altVi: 'Cổng chính Văn Miếu Môn tại Văn Miếu – Quốc Tử Giám, Hà Nội',
    altKo: '하노이 문묘-국자감의 정문인 문묘문(文廟門) 전경',
    photographer: 'Daderot',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Main_gate_-_Temple_of_Literature,_Hanoi_-_DSC04529.JPG',
    license: 'CC0 1.0 Public Domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
    attributionRequired: false,
    focalPointDesktop: '50% 42%',
    focalPointMobile: '50% 40%',
    subject: 'Main gate (Văn Miếu Môn) of the Temple of Literature, Hanoi',
    verified: true
  },

  'khue-van-cac-establish': {
    id: 'khue-van-cac-establish',
    chapterId: 'khue-van-cac',
    src: '/assets/destinations/hanoi/heritage/khue-van-cac-establish.webp',
    mobileSrc: '/assets/destinations/hanoi/heritage/khue-van-cac-establish-mobile.webp',
    altVi: 'Toàn cảnh Khuê Văn Các với kiến trúc hai tầng tám mái nhìn từ sân thứ hai',
    altKo: '문묘 두 번째 정원에서 바라본 2층 8지붕 구조의 규문각(Khuê Văn Các) 전경',
    photographer: 'Daderot',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Constellation_of_Literature_pavilion_-_Temple_of_Literature,_Hanoi_-_DSC04557.JPG',
    license: 'CC0 1.0 Public Domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
    attributionRequired: false,
    focalPointDesktop: '30% 46%',
    focalPointMobile: '34% 44%',
    subject: 'Full exterior view of Khuê Văn Các two-tier pavilion on four brick pillars',
    verified: true
  },

  'khue-van-cac-detail': {
    id: 'khue-van-cac-detail',
    chapterId: 'khue-van-cac',
    src: '/assets/destinations/hanoi/heritage/khue-van-cac-detail.webp',
    mobileSrc: '/assets/destinations/hanoi/heritage/khue-van-cac-detail-mobile.webp',
    altVi: 'Cận cảnh tầng gác gỗ và cửa sổ tròn hình sao Khuê của Khuê Văn Các (1805)',
    altKo: '1805년 건립된 규문각 상층 목조 누각과 규수 별자리 모양의 원형 창문 디테일',
    photographer: 'Daderot',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Constellation_of_Literature_pavilion_-_Temple_of_Literature,_Hanoi_-_DSC04688.JPG',
    license: 'CC0 1.0 Public Domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
    attributionRequired: false,
    focalPointDesktop: '54% 44%',
    focalPointMobile: '50% 42%',
    subject: 'Close-up architectural detail of Khuê Văn Các circular sunburst window and roof eaves',
    verified: true
  },

  'khue-van-cac-cultural': {
    id: 'khue-van-cac-cultural',
    chapterId: 'khue-van-cac',
    src: '/assets/destinations/hanoi/heritage/khue-van-cac-cultural.webp',
    mobileSrc: '/assets/destinations/hanoi/heritage/khue-van-cac-cultural-mobile.webp',
    altVi: 'Khuê Văn Các nhìn từ phía bờ giếng Thiên Quang giữa tán cây cổ thụ',
    altKo: '천광정 난간 쪽에서 바라본 규문각과 고목의 조화',
    photographer: 'Daderot',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Constellation_of_Literature_pavilion_-_Temple_of_Literature,_Hanoi_-_DSC04693.JPG',
    license: 'CC0 1.0 Public Domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
    attributionRequired: false,
    focalPointDesktop: '62% 46%',
    focalPointMobile: '58% 46%',
    subject: 'Khuê Văn Các pavilion viewed from the Well of Heavenly Clarity balustrade',
    verified: true
  },

  'thien-quang-tinh-reflection': {
    id: 'thien-quang-tinh-reflection',
    chapterId: 'thien-quang-tinh',
    src: '/assets/destinations/hanoi/heritage/thien-quang-tinh-reflection.webp',
    mobileSrc: '/assets/destinations/hanoi/heritage/thien-quang-tinh-reflection-mobile.webp',
    altVi: 'Hồ nước vuông Thiên Quang Tỉnh phản chiếu bóng Khuê Văn Các và nhà bia',
    altKo: '규문각과 비각이 수면에 투영된 정방형 연못 천광정(Thiên Quang Tỉnh)',
    photographer: 'Christophe95',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Well_of_Heavenly_Clarity_1.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    attributionRequired: true,
    focalPointDesktop: '42% 46%',
    focalPointMobile: '44% 44%',
    subject: 'Square reflecting pool of Thiên Quang Tỉnh with Khuê Văn Các and stelae pavilion',
    verified: true
  },

  'thien-quang-tinh-stillness': {
    id: 'thien-quang-tinh-stillness',
    chapterId: 'thien-quang-tinh',
    src: '/assets/destinations/hanoi/heritage/thien-quang-tinh-stillness.webp',
    mobileSrc: '/assets/destinations/hanoi/heritage/thien-quang-tinh-stillness-mobile.webp',
    altVi: 'Mặt nước phẳng lặng và lan can gạch cổ bao quanh Thiên Quang Tỉnh',
    altKo: '천광정의 잔잔한 수면과 옛 벽돌 난간, 고목이 어우러진 풍경',
    photographer: 'Jakub Hałun',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:%C5%9Awi%C4%85tynia_Literatury,_Hanoi,_Wietnam,_20240123_0937_3097.jpg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attributionRequired: true,
    focalPointDesktop: '52% 52%',
    focalPointMobile: '48% 52%',
    subject: 'Still water reflection and ceramic-inlaid balustrade of Thiên Quang Tỉnh',
    verified: true
  },

  'thien-quang-tinh-spatial': {
    id: 'thien-quang-tinh-spatial',
    chapterId: 'thien-quang-tinh',
    src: '/assets/destinations/hanoi/heritage/thien-quang-tinh-spatial.webp',
    mobileSrc: '/assets/destinations/hanoi/heritage/thien-quang-tinh-spatial-mobile.webp',
    altVi: 'Tổng thể không gian sân thứ ba Văn Miếu kết nối Khuê Văn Các, Thiên Quang Tỉnh và vườn bia',
    altKo: '규문각과 천광정, 진사비원이 하나로 이어지는 문묘 제3정원 전경',
    photographer: 'Jakub Hałun',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Third_Courtyard,_Temple_of_Literature,_Hanoi,_Vietnam,_20240123_0947_3141.jpg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attributionRequired: true,
    focalPointDesktop: '46% 50%',
    focalPointMobile: '46% 50%',
    subject: 'Wide architectural view of the Third Courtyard showing the square pool and surrounding pavilions',
    verified: true
  },

  'bia-tien-si-rows': {
    id: 'bia-tien-si-rows',
    chapterId: 'bia-tien-si',
    src: '/assets/destinations/hanoi/heritage/bia-tien-si-rows.webp',
    mobileSrc: '/assets/destinations/hanoi/heritage/bia-tien-si-rows-mobile.webp',
    altVi: 'Hàng bia Tiến sĩ đặt trên lưng rùa đá dưới mái nhà bia Văn Miếu – Quốc Tử Giám',
    altKo: '문묘 비각 아래 돌거북 등 위에 나란히 세워진 82기 진사제명비 행렬',
    photographer: 'Daderot',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Stelae_of_Doctors_-_Temple_of_Literature,_Hanoi_-_DSC04571.JPG',
    license: 'CC0 1.0 Public Domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
    attributionRequired: false,
    focalPointDesktop: '34% 48%',
    focalPointMobile: '36% 48%',
    subject: 'Rows of stone doctoral stelae mounted on stone tortoises inside the stelae pavilion',
    verified: true
  },

  'bia-tien-si-inscription': {
    id: 'bia-tien-si-inscription',
    chapterId: 'bia-tien-si',
    src: '/assets/destinations/hanoi/heritage/bia-tien-si-inscription.webp',
    mobileSrc: '/assets/destinations/hanoi/heritage/bia-tien-si-inscription-mobile.webp',
    altVi: 'Cận cảnh chữ Hán khắc tên các vị Tiến sĩ trên mặt bia đá và tượng rùa đá cổ',
    altKo: '과거 급제자의 이름과 비문이 정교하게 새겨진 진사제명비와 돌거북 클로즈업',
    photographer: 'Richard Mortel',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tortoise_stelae,_Temple_of_Literature,_Hanoi,_15th-18th_centuries_(38465702492).jpg',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    attributionRequired: true,
    focalPointDesktop: '66% 48%',
    focalPointMobile: '64% 48%',
    subject: 'Close-up of carved Chinese inscriptions on a doctoral stele resting on a stone tortoise pedestal',
    verified: true
  },

  'bia-tien-si-turtles': {
    id: 'bia-tien-si-turtles',
    chapterId: 'bia-tien-si',
    src: '/assets/destinations/hanoi/heritage/bia-tien-si-turtles.webp',
    mobileSrc: '/assets/destinations/hanoi/heritage/bia-tien-si-turtles-mobile.webp',
    altVi: 'Bốn tấm bia Tiến sĩ đặt trên lưng rùa đá nguyên khối tại vườn bia Văn Miếu',
    altKo: '문묘 비원 안에서 나란히 자리한 네 기의 돌거북과 진사제명비',
    photographer: 'Daderot',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Stelae_of_Doctors_-_Temple_of_Literature,_Hanoi_-_DSC04574.JPG',
    license: 'CC0 1.0 Public Domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
    attributionRequired: false,
    focalPointDesktop: '50% 52%',
    focalPointMobile: '52% 52%',
    subject: 'Four stone tortoises carrying carved doctoral stelae on brick paving',
    verified: true
  },

  'van-mieu-courtyard-legacy': {
    id: 'van-mieu-courtyard-legacy',
    chapterId: 'ending',
    src: '/assets/destinations/hanoi/heritage/van-mieu-courtyard-legacy.webp',
    mobileSrc: '/assets/destinations/hanoi/heritage/van-mieu-courtyard-legacy-mobile.webp',
    altVi: 'Không gian tĩnh mặc của cổng Đại Trung Môn và đường gạch cổ dưới tán cây cổ thụ Văn Miếu',
    altKo: '고목 그늘 아래 붉은 벽돌 산책로와 대중문(Đại Trung Môn)이 어우러진 문묘의 고즈넉한 풍경',
    photographer: 'Jakub Hałun',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dai_Trung_gate,_Temple_of_Literature,_Hanoi,_Vietnam,_20240123_0928_3065.jpg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attributionRequired: true,
    focalPointDesktop: '52% 48%',
    focalPointMobile: '54% 48%',
    subject: 'Wide documentary view of Đại Trung gate and ancient banyan courtyard in Văn Miếu',
    verified: true
  }
};
