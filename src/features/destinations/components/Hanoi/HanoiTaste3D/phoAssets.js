/**
 * SUPER EZ TOUR — HANOI SCREEN 4 V1
 * PHỞ HÀ NỘI — GRAND CINEMATIC FOOD DOCUMENTARY
 *
 * Photographic Asset Manifest, Focal Points & Localized Directional Scrims
 * Every photograph is locally stored as optimized WebP (desktop & mobile)
 * with verified open-license sources (Wikimedia Commons / CC0 / CC BY / CC BY-SA).
 */

export const PHO_SCRIM_GRADIENTS = {
  // Localized directional scrims preserving natural food colors without flat dark covers
  'fullscreen-hero':
    'linear-gradient(180deg, rgba(16, 20, 24, 0.45) 0%, rgba(16, 20, 24, 0.15) 30%, rgba(16, 20, 24, 0.55) 70%, rgba(16, 20, 24, 0.88) 100%)',
  'left-editorial':
    'linear-gradient(90deg, rgba(16, 20, 24, 0.88) 0%, rgba(16, 20, 24, 0.68) 32%, rgba(16, 20, 24, 0.25) 55%, rgba(16, 20, 24, 0.0) 75%)',
  'right-editorial':
    'linear-gradient(270deg, rgba(16, 20, 24, 0.88) 0%, rgba(16, 20, 24, 0.68) 32%, rgba(16, 20, 24, 0.25) 55%, rgba(16, 20, 24, 0.0) 75%)',
  'layered-editorial':
    'linear-gradient(180deg, rgba(16, 20, 24, 0.70) 0%, rgba(16, 20, 24, 0.20) 35%, rgba(16, 20, 24, 0.60) 68%, rgba(16, 20, 24, 0.90) 100%)',
  'wide-ending':
    'linear-gradient(180deg, rgba(16, 20, 24, 0.40) 0%, rgba(16, 20, 24, 0.15) 35%, rgba(16, 20, 24, 0.70) 72%, rgba(16, 20, 24, 0.92) 100%)'
};

export const PHO_ASSET_MANIFEST = {
  'pho-hero': {
    id: 'pho-hero',
    actId: 'act-01',
    src: '/assets/destinations/hanoi/pho/pho-hero-desktop.webp',
    mobileSrc: '/assets/destinations/hanoi/pho/pho-hero-mobile.webp',
    fallbackSrc: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Beef_noodle_soup_%28Ph%E1%BB%9F_b%C3%B2%29_-_Pho_Hanoi_Authentic_2024-12-01.jpg',
    altVi: 'Bát Phở Bò Hà Nội truyền thống bốc khói với nước dùng trong, thịt bò mềm và hành hoa tươi',
    altKo: '맑은 우골 육수와 부드러운 소고기, 신선한 파가 어우러진 하노이 정통 소고기 쌀국수 한 그릇',
    photographer: 'Andy Li (Onthewings)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Beef_noodle_soup_(Ph%E1%BB%9F_b%C3%B2)_-_Pho_Hanoi_Authentic_2024-12-01.jpg',
    license: 'CC0 1.0 Universal (Public Domain Dedication)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
    attributionRequired: false,
    focalPointDesktop: '50% 50%',
    focalPointMobile: '50% 50%',
    subject: 'Steaming bowl of authentic Hanoi beef pho with clear aromatic broth and herbs',
    verified: true
  },

  'pho-broth': {
    id: 'pho-broth',
    actId: 'act-02',
    src: '/assets/destinations/hanoi/pho/pho-broth-desktop.webp',
    mobileSrc: '/assets/destinations/hanoi/pho/pho-broth-mobile.webp',
    fallbackSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Making_pho_bo.jpg',
    altVi: 'Nồi ninh nước dùng phở bò với xương ống, gừng nướng, hoa hồi và các loại gia vị truyền thống',
    altKo: '소 사골과 구운 생강, 팔각 등 향신료를 정성껏 우려내는 쌀국수 육수 조리 과정',
    photographer: 'Blue Lotus',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Making_pho_bo.jpg',
    license: 'CC BY 2.0 Generic',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    attributionRequired: true,
    focalPointDesktop: '50% 55%',
    focalPointMobile: '50% 55%',
    subject: 'Simmering beef bone broth pot with traditional aromatic spices',
    verified: true
  },

  'pho-noodles': {
    id: 'pho-noodles',
    actId: 'act-03',
    src: '/assets/destinations/hanoi/pho/pho-noodles-desktop.webp',
    mobileSrc: '/assets/destinations/hanoi/pho/pho-noodles-mobile.webp',
    fallbackSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Vietnamsk%C3%A9_%C5%A1irok%C3%A9_r%C3%BD%C5%BEov%C3%A9_nudle_b%C3%A1nh_ph%E1%BB%9F_01.JPG',
    altVi: 'Những sợi bánh phở trắng mịn màng được làm từ bột gạo, mềm mướt và dẻo dai',
    altKo: '쌀가루로 얇게 쪄내어 가늘게 썬 부드럽고 쫄깃한 수제 쌀국수 면(Bánh Phở)',
    photographer: 'Horakvlado',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Vietnamsk%C3%A9_%C5%A1irok%C3%A9_r%C3%BD%C5%BEov%C3%A9_nudle_b%C3%A1nh_ph%E1%BB%9F_01.JPG',
    license: 'CC BY-SA 4.0 International',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    attributionRequired: true,
    focalPointDesktop: '50% 50%',
    focalPointMobile: '50% 50%',
    subject: 'Authentic flat rice noodles (bánh phở) before assembly',
    verified: true
  },

  'pho-assembly': {
    id: 'pho-assembly',
    actId: 'act-04',
    src: '/assets/destinations/hanoi/pho/pho-assembly-desktop.webp',
    mobileSrc: '/assets/destinations/hanoi/pho/pho-assembly-mobile.webp',
    fallbackSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/54/DZ6_1821_An_experienced_street-food_vendor_carefully_assembles_a_bowl_of_noodles_surrounded_by_colorful_bowls_fresh_toppings_and_simmering_broth.jpg',
    altVi: 'Đầu bếp tỉ mỉ sắp xếp bánh phở, lát thịt bò và chan nước dùng sôi sùng sục vào từng bát',
    altKo: '숙련된 장인이 쌀면에 얇게 썬 소고기와 신선한 고명을 얹고 뜨거운 육수를 붓는 조리 장면',
    photographer: 'PattayaPatrol',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:DZ6_1821_An_experienced_street-food_vendor_carefully_assembles_a_bowl_of_noodles_surrounded_by_colorful_bowls_fresh_toppings_and_simmering_broth.jpg',
    license: 'CC BY-SA 4.0 International',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    attributionRequired: true,
    focalPointDesktop: '48% 45%',
    focalPointMobile: '48% 45%',
    subject: 'Artisan chef assembling noodle bowls surrounded by fresh toppings and boiling broth',
    verified: true
  },

  'pho-breakfast': {
    id: 'pho-breakfast',
    actId: 'act-05',
    src: '/assets/destinations/hanoi/pho/pho-breakfast-desktop.webp',
    mobileSrc: '/assets/destinations/hanoi/pho/pho-breakfast-mobile.webp',
    fallbackSrc: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Ph%E1%BB%9F_b%C3%B2%2C_C%E1%BA%A7u_Gi%E1%BA%A5y%2C_H%C3%A0_N%E1%BB%99i.jpg',
    altVi: 'Không gian bàn ăn quán phở Hà Nội buổi sáng với bát phở bốc khói, đĩa quẩy giòn và giấm tỏi ớt',
    altKo: '바삭한 꽈이와 마늘 식초, 고추가 놓인 정겨운 하노이 쌀국수집의 아침 식탁 풍경',
    photographer: 'Codename5281',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ph%E1%BB%9F_b%C3%B2%2C_C%E1%BA%A7u_Gi%E1%BA%A5y%2C_H%C3%A0_N%E1%BB%99i.jpg',
    license: 'CC BY-SA 3.0 Unported',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    attributionRequired: true,
    focalPointDesktop: '50% 45%',
    focalPointMobile: '50% 45%',
    subject: 'Traditional Hanoi morning dining table with pho bowl, condiments, and accompaniments',
    verified: true
  }
};
