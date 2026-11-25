/**
 * SUPER EZ TOUR — HANOI SCREEN 5 V1.1
 * HANOI THROUGH THE SEASONS — VERIFIED PHOTOGRAPHIC ASSET MANIFEST
 *
 * All 4 seasonal photographs are authentic Hanoi scenes from Wikimedia Commons
 * with verified open licenses (Public Domain / CC BY 2.0 / CC BY-SA 2.0 / CC BY-SA 4.0),
 * locally stored as optimized Desktop (1920x1080) & Mobile (800x1000) WebP files.
 */

export const SEASON_SCRIM_GRADIENTS = {
  // Spring: Top handoff from Screen 4 Chả Cá (#171B17) + Left editorial contrast scrim preserving Nhật Tân peach blossoms on center-right
  spring:
    'linear-gradient(180deg, rgba(23, 27, 23, 0.64) 0%, rgba(18, 22, 20, 0.14) 28%, rgba(18, 22, 20, 0.24) 68%, rgba(18, 22, 20, 0.74) 100%), linear-gradient(90deg, rgba(18, 22, 20, 0.88) 0%, rgba(18, 22, 20, 0.68) 38%, rgba(18, 22, 20, 0.20) 58%, rgba(18, 22, 20, 0.0) 76%)',

  // Summer: Right editorial contrast scrim preserving pink West Lake lotus on the left/center
  summer:
    'linear-gradient(180deg, rgba(16, 26, 20, 0.34) 0%, rgba(16, 26, 20, 0.10) 35%, rgba(16, 26, 20, 0.64) 100%), linear-gradient(270deg, rgba(14, 24, 18, 0.88) 0%, rgba(14, 24, 18, 0.66) 36%, rgba(14, 24, 18, 0.20) 58%, rgba(14, 24, 18, 0.0) 76%)',

  // Autumn (Hero Season): Left editorial contrast scrim over left tree trunks preserving ancient tree canopy & sunlit Hanoi street perspective
  autumn:
    'linear-gradient(180deg, rgba(24, 20, 15, 0.38) 0%, rgba(24, 20, 15, 0.08) 38%, rgba(24, 20, 15, 0.68) 100%), linear-gradient(90deg, rgba(24, 20, 15, 0.88) 0%, rgba(24, 20, 15, 0.66) 37%, rgba(24, 20, 15, 0.18) 58%, rgba(24, 20, 15, 0.0) 76%)',

  // Winter: Right editorial contrast scrim + bottom transition handoff to Screen 6 (#080F1C)
  winter:
    'linear-gradient(180deg, rgba(18, 25, 32, 0.34) 0%, rgba(18, 25, 32, 0.14) 42%, rgba(10, 18, 28, 0.68) 78%, #080F1C 100%), linear-gradient(270deg, rgba(14, 21, 29, 0.88) 0%, rgba(14, 21, 29, 0.66) 36%, rgba(14, 21, 29, 0.20) 58%, rgba(14, 21, 29, 0.0) 76%)'
};

export const SEASON_ASSET_MANIFEST = {
  'season-spring': {
    id: 'season-spring',
    season: 'spring',
    src: '/assets/destinations/hanoi/seasons/spring-desktop.webp',
    mobileSrc: '/assets/destinations/hanoi/seasons/spring-mobile.webp',
    fallbackSrc:
      'https://upload.wikimedia.org/wikipedia/commons/3/3c/Prunus_persica_%28Nhat_Tan%29_3.jpg',

    altVi:
      'Hoa đào Nhật Tân Hà Nội nở rộ sắc hồng tươi thắm cùng chồi lộc non trong vườn đào mùa xuân',
    altKo:
      '하노이 녓떤(Nhật Tân) 복숭아꽃 마을에서 봄을 맞아 화사하게 만개한 분홍빛 복숭아꽃과 푸른 새순',

    photographer: 'Khương Việt Hà (Viethavvh)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Prunus_persica_(Nhat_Tan)_3.jpg',
    license: 'Public Domain (Released by author)',
    licenseUrl: 'https://commons.wikimedia.org/wiki/File:Prunus_persica_(Nhat_Tan)_3.jpg#Licensing',
    attributionRequired: false,
    modificationNotice:
      'Cropped to 16:9 desktop (1920x1080) and 4:5 mobile (800x1000) and encoded to WebP',

    focalPointDesktop: '54% 45%',
    focalPointMobile: '55% 45%',
    textSafeArea: 'left',
    scrimDirection: 'spring',

    origDimensions: { width: 2848, height: 2136 },
    dimensions: {
      desktop: { width: 1920, height: 1080 },
      mobile: { width: 800, height: 1000 }
    },
    fileSizeKb: {
      desktop: 202.1,
      mobile: 102.8
    },

    verified: true
  },

  'season-summer': {
    id: 'season-summer',
    season: 'summer',
    src: '/assets/destinations/hanoi/seasons/summer-desktop.webp',
    mobileSrc: '/assets/destinations/hanoi/seasons/summer-mobile.webp',
    fallbackSrc:
      'https://upload.wikimedia.org/wikipedia/commons/7/75/Sen_b%C3%A1ch_di%E1%BB%87p_T%C3%A2y_H%E1%BB%93.JPG',

    altVi:
      'Đầm sen bách diệp Hồ Tây Hà Nội với đóa sen hồng bung nở và nụ sen non giữa tầng lá xanh mướt',
    altKo:
      '하노이 서호(Hồ Tây) 연못의 푸른 연잎 사이로 탐스럽게 피어난 분홍빛 백엽련(Sen bách diệp)',

    photographer: 'Phương Huy (Wikimedia Commons)',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Sen_b%C3%A1ch_di%E1%BB%87p_T%C3%A2y_H%E1%BB%93.JPG',
    license: 'CC BY-SA 4.0 International',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    attributionRequired: true,
    modificationNotice:
      'Cropped to 16:9 desktop (1920x1080) and 4:5 mobile (800x1000) and encoded to WebP',

    focalPointDesktop: '38% 56%',
    focalPointMobile: '42% 58%',
    textSafeArea: 'right',
    scrimDirection: 'summer',

    origDimensions: { width: 5520, height: 4140 },
    dimensions: {
      desktop: { width: 1920, height: 1080 },
      mobile: { width: 800, height: 1000 }
    },
    fileSizeKb: {
      desktop: 207.7,
      mobile: 103.9
    },

    verified: true
  },

  'season-autumn': {
    id: 'season-autumn',
    season: 'autumn',
    src: '/assets/destinations/hanoi/seasons/autumn-desktop.webp',
    mobileSrc: '/assets/destinations/hanoi/seasons/autumn-mobile.webp',
    fallbackSrc:
      'https://upload.wikimedia.org/wikipedia/commons/b/b2/Hanoi_shady_street.jpg',

    altVi:
      'Con phố Hà Nội rợp bóng hàng cây cổ thụ vươn cao đón nắng thu dịu nhẹ chảy qua vỉa hè lát gạch',
    altKo:
      '울창한 고목 가로수가 아치형 그늘을 드리우고 부드러운 가을 햇살이 스며드는 하노이의 고즈넉한 거리',

    photographer: 'udono',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Hanoi_shady_street.jpg',
    license: 'CC BY 2.0 Generic',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    attributionRequired: true,
    modificationNotice:
      'Cropped to 16:9 desktop (1920x1080) and 4:5 mobile (800x1000) and encoded to WebP',

    focalPointDesktop: '52% 48%',
    focalPointMobile: '50% 50%',
    textSafeArea: 'left',
    scrimDirection: 'autumn',

    origDimensions: { width: 3456, height: 3456 },
    dimensions: {
      desktop: { width: 1920, height: 1080 },
      mobile: { width: 800, height: 1000 }
    },
    fileSizeKb: {
      desktop: 225.1,
      mobile: 103.3
    },

    verified: true
  },

  'season-winter': {
    id: 'season-winter',
    season: 'winter',
    src: '/assets/destinations/hanoi/seasons/winter-desktop.webp',
    mobileSrc: '/assets/destinations/hanoi/seasons/winter-mobile.webp',
    fallbackSrc:
      'https://upload.wikimedia.org/wikipedia/commons/0/01/The_Turtle_Tower_%2839558150274%29.jpg',

    altVi:
      'Tháp Rùa trầm mặc giữa làn sương sớm mùa đông trên mặt hồ Hoàn Kiếm tĩnh lặng nhìn qua tán cây ven hồ',
    altKo:
      '호숫가 나뭇가지 너머 고요한 겨울 아침 안개 속에 잠긴 호안끼엠 호수와 거북탑(Tháp Rùa)',

    photographer: 'Mig Gilbert',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:The_Turtle_Tower_(39558150274).jpg',
    license: 'CC BY-SA 2.0 Generic',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    attributionRequired: true,
    modificationNotice:
      'Cropped to 16:9 desktop (1920x1080) and 4:5 mobile (800x1000) and encoded to WebP',

    focalPointDesktop: '48% 48%',
    focalPointMobile: '52% 48%',
    textSafeArea: 'right',
    scrimDirection: 'winter',

    origDimensions: { width: 6000, height: 4000 },
    dimensions: {
      desktop: { width: 1920, height: 1080 },
      mobile: { width: 800, height: 1000 }
    },
    fileSizeKb: {
      desktop: 202.2,
      mobile: 103.1
    },

    verified: true
  }
};
