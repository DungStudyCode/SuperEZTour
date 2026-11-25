/**
 * SUPER EZ TOUR — HANOI SCREEN 4 V1
 * PHỞ HÀ NỘI — GRAND CINEMATIC FOOD DOCUMENTARY
 *
 * Five-Act Documentary Script & Editorial Storytelling (Bilingual KO / VI)
 * Extensible Architecture: Supports adding Bun Cha, Cha Ca, Egg Coffee in future versions
 */

export const PHO_DOCUMENTARY_ACTS = [
  {
    actId: 'act-01',
    actNumber: '01',
    kickerVi: 'HỒI 01 / 05 · KHỞI NGUỒN VỊ GIÁC',
    kickerKo: '제1막 / 5막 · 하노이의 아침',
    themeVi: 'Phở Hà Nội — Một buổi sáng bắt đầu từ hương vị',
    themeKo: '하노이 쌀국수 — 따뜻한 국물로 깨어나는 하루',
    titleVi: 'PHỞ HÀ NỘI',
    titleKo: '하노이 쌀국수',
    subtitleVi: 'Một buổi sáng, một bát phở nóng.',
    subtitleKo: '따뜻한 쌀국수 한 그릇으로 시작하는 아침.',
    storyVi:
      'Giữa nhịp sống của phố phường, bát phở nóng từ lâu đã trở thành một hình ảnh quen thuộc trong những buổi sáng Hà Nội. Nước dùng thơm, bánh phở mềm và hành hoa tươi tạo nên một hương vị giản dị mà khó quên.',
    storyKo:
      '하노이의 아침 풍경에는 따뜻한 쌀국수 한 그릇이 자연스럽게 어우러집니다. 향긋한 육수와 부드러운 쌀면, 신선한 파가 만나 소박하지만 오래 기억에 남는 맛을 완성합니다.',
    assetId: 'pho-hero',
    layoutVariant: 'fullscreen-hero',
    scrimGradient: 'fullscreen-hero'
  },
  {
    actId: 'act-02',
    actNumber: '02',
    kickerVi: 'HỒI 02 / 05 · LINH HỒN NƯỚC DÙNG',
    kickerKo: '제2막 / 5막 · 육수에 담긴 정성',
    themeVi: 'Tinh túy nằm trong nước dùng',
    themeKo: '시간과 정성이 빚어낸 맑은 육수',
    titleVi: 'Tinh túy của nước dùng',
    titleKo: '육수에 담긴 정성',
    subtitleVi: 'Sự cân bằng giữa vị thanh khiết và độ ngọt sâu từ xương bò.',
    subtitleKo: '자극 없이 깊고 담백한 베트남 북부 정통 육수의 정수.',
    storyVi:
      'Điều làm nên sức hấp dẫn của phở bò Hà Nội nằm ở nước dùng được ninh từ xương bò, kết hợp với gừng, hành nướng và các loại gia vị. Người nấu chú trọng sự cân bằng để nước dùng thơm, đậm đà mà vẫn giữ được vị thanh.',
    storyKo:
      '하노이 소고기 쌀국수의 깊은 맛은 소뼈를 우려낸 육수에서 시작됩니다. 구운 생강과 양파, 여러 향신료가 어우러져 진하면서도 깔끔한 풍미를 만들어 냅니다.',
    assetId: 'pho-broth',
    layoutVariant: 'left-editorial',
    scrimGradient: 'left-editorial'
  },
  {
    actId: 'act-03',
    actNumber: '03',
    kickerVi: 'HỒI 03 / 05 · NGHỆ THUẬT BÁNH PHỞ',
    kickerKo: '제3막 / 5막 · 수제 쌀면의 미학',
    themeVi: 'Nghệ thuật bánh phở trắng mịn',
    themeKo: '쌀가루로 빚어낸 부드러운 식감',
    titleVi: 'Bánh phở — Sự tinh tế từ hạt gạo',
    titleKo: '쌀로 빚어낸 섬세한 면',
    subtitleVi: 'Tráng mỏng như cánh lụa, thấm đượm từng giọt nước dùng nóng hổi.',
    subtitleKo: '갓 뽑아낸 얇고 부드러운 쌀면이 국물과 이루는 조화.',
    storyVi:
      'Từ gạo được xay thành bột, bánh phở được tráng thành những lớp mỏng rồi cắt thành sợi. Khi đưa vào bát, sợi bánh mềm mại, thấm nước dùng và góp phần tạo nên kết cấu đặc trưng của phở.',
    storyKo:
      '쌀가루 반죽을 얇게 펼쳐 익힌 뒤 가늘게 썰어 만든 쌀면은 부드러운 식감이 특징입니다. 따뜻한 육수와 어우러지며 하노이 쌀국수만의 매력을 완성합니다.',
    assetId: 'pho-noodles',
    layoutVariant: 'right-editorial',
    scrimGradient: 'right-editorial'
  },
  {
    actId: 'act-04',
    actNumber: '04',
    kickerVi: 'HỒI 04 / 05 · KỸ NGHỆ HOÀN THIỆN',
    kickerKo: '제4막 / 5막 · 한 그릇에 담긴 조화',
    themeVi: 'Hoàn thiện một bát phở',
    themeKo: '재료들의 섬세한 만남과 조화',
    titleVi: 'Một bát phở, nhiều lớp hương vị',
    titleKo: '한 그릇에 담긴 맛의 조화',
    subtitleVi: 'Thịt bò thái lát, hành hoa chẻ ngọn và làn khói ấm bốc lên nghi ngút.',
    subtitleKo: '취향대로 얹은 소고기와 송송 썬 파, 갓 부어낸 뜨거운 국물.',
    storyVi:
      'Bánh phở mềm, thịt bò được chuẩn bị theo cách gọi món của thực khách, hành hoa và nước dùng nóng hòa quyện trong cùng một bát. Mỗi thành phần có vai trò riêng, tạo nên tổng thể hài hòa.',
    storyKo:
      '부드러운 쌀면과 취향에 맞게 준비한 소고기, 신선한 파, 뜨거운 육수가 한 그릇에서 조화를 이룹니다. 각 재료의 풍미가 어우러져 균형 잡힌 맛을 선사합니다.',
    assetId: 'pho-assembly',
    layoutVariant: 'layered-editorial',
    scrimGradient: 'layered-editorial'
  },
  {
    actId: 'act-05',
    actNumber: '05',
    kickerVi: 'HỒI 05 / 05 · NGHI THỨC TRÀNG AN',
    kickerKo: '제5막 / 5막 · 아침 미식의 일상',
    themeVi: 'Thưởng thức Phở như một trải nghiệm Hà Nội',
    themeKo: '하노이 사람들의 소박하고 깊은 아침 풍경',
    titleVi: 'Thưởng thức một buổi sáng Hà Nội',
    titleKo: '하노이의 아침을 맛보는 시간',
    subtitleVi: 'Giọt giấm tỏi Bắc, chiếc quẩy giòn tan và nhịp sống phố thị êm đềm.',
    subtitleKo: '마늘 식초와 바삭한 꽈이를 곁들여 즐기는 진정한 현지 미식.',
    storyVi:
      'Ngồi trong một quán phở, thưởng thức thìa nước dùng đầu tiên rồi thêm chút giấm tỏi hoặc ăn kèm quẩy theo sở thích — đó là một cách giản dị để cảm nhận nhịp sống của Hà Nội.',
    storyKo:
      '현지 쌀국수집에 앉아 먼저 따뜻한 육수를 맛보고, 취향에 따라 마늘 식초나 바삭한 꽈이를 곁들여 보세요. 하노이의 일상을 가까이에서 느낄 수 있는 소박한 경험입니다.',
    ctaVi: 'Thêm trải nghiệm Phở Hà Nội',
    ctaKo: '하노이 쌀국수 체험 일정에 추가',
    ctaAddedVi: 'Đã thêm vào hành trình ẩm thực',
    ctaAddedKo: '미식 일정에 담김',
    secondaryCtaVi: 'Khám phá Tứ đại Phở Hà Nội',
    secondaryCtaKo: '하노이 4대 쌀국수 노포 탐구',
    assetId: 'pho-breakfast',
    layoutVariant: 'wide-ending',
    scrimGradient: 'wide-ending'
  }
];

import { BUN_CHA_DOCUMENTARY_ACTS } from './bunChaScenes';
import { CHA_CA_DOCUMENTARY_ACTS } from './chaCaScenes';

/**
 * Extensible culinary library for Hanoi dishes
 */
export const CULINARY_STORIES = {
  'pho-bo': {
    id: 'pho-bo',
    slug: 'pho-bo-hanoi',
    nameVi: 'Phở Bò Gia Truyền Hà Nội',
    nameKo: '정통 하노이 소고기 쌀국수 (Phở Bò)',
    nameEn: 'Heirloom Hanoi Beef Pho',
    acts: PHO_DOCUMENTARY_ACTS
  },
  'bun-cha': {
    id: 'bun-cha-hanoi',
    slug: 'bun-cha-hanoi',
    nameVi: 'Bún Chả Than Hoa Hà Nội',
    nameKo: '하노이 숯불 분짜 (Bún Chả)',
    nameEn: 'Charcoal Grilled Pork Bun Cha',
    acts: BUN_CHA_DOCUMENTARY_ACTS
  },
  'cha-ca': {
    id: 'cha-ca',
    slug: 'cha-ca-la-vong',
    nameVi: 'Chả Cá Lã Vọng',
    nameKo: '짜까 라봉 (Chả Cá Lã Vọng)',
    nameEn: 'Hanoi Turmeric Fish with Dill',
    acts: CHA_CA_DOCUMENTARY_ACTS
  }
};
