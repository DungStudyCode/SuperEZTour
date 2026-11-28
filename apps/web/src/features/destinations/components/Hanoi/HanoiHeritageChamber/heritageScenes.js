import { HERITAGE_ASSET_MANIFEST } from './heritageAssets';

/**
 * SUPER EZ TOUR — HANOI SCREEN 3 V4.1
 * GRAND HERITAGE DOCUMENTARY — STAGED SCROLL NARRATIVE CONFIGURATION
 *
 * V4.1 Storytelling Architecture:
 *  - Opening: Visual Establish -> Headline Reveal -> Historical Context (1070 / 1076)
 *  - 3 Heritage Chapters (01 Khuê Văn Các, 02 Thiên Quang Tỉnh, 03 82 Bia Tiến Sĩ):
 *    Each chapter progresses through 5 distinct scroll stages:
 *      1. Beat A — Visual Establish (Image dominates, minimal marker only)
 *      2. Beat B — Headline Reveal (Monument name + emotional subtitle)
 *      3. Beat C — Story Reveal (Focused historical & architectural narrative + detail photo)
 *      4. Beat D — Reading Hold (Steady frame + single discreet 'Khám phá chi tiết' trigger)
 *      5. Beat E — Visual Transition (Clean text exit before next image wipe/dissolve)
 *  - Documentary Ending: The Legacy of Knowledge (Wide courtyard view + closing line + TripBuilder CTA)
 */

export const HERITAGE_OPENING_ACT = {
  id: 'heritage-opening',
  asset: HERITAGE_ASSET_MANIFEST['van-mieu-opening-gateway'],
  motion: {
    scaleStart: 1.06,
    scaleEnd: 1.0,
    panX: 0,
    panY: -6
  },
  content: {
    vi: {
      locationTag: 'VĂN MIẾU – QUỐC TỬ GIÁM · HÀ NỘI',
      title: 'Văn Miếu – Quốc Tử Giám',
      subtitle: 'Dấu ấn nghìn năm của đạo học Thăng Long.',
      intro:
        'Được xây dựng từ năm 1070 dưới triều Lý, Văn Miếu là nơi thờ Khổng Tử và các bậc hiền triết. Năm 1076, Quốc Tử Giám được thành lập kế bên, trở thành trung tâm giáo dục cao nhất của quốc gia trong thời kỳ phong kiến.'
    },
    ko: {
      locationTag: '문묘와 국자감 · 하노이',
      title: '문묘와 국자감',
      subtitle: '천년의 세월을 품은 하노이의 학문 유산.',
      intro:
        '1070년 리(Lý) 왕조 시대에 건립된 문묘는 공자와 선현들을 모신 사당입니다. 이어 1076년 인재를 양성하는 국자감이 세워지면서 베트남 봉건 시대 최고의 국립 교육 기관으로 자리 잡았습니다.'
    }
  }
};

export const HERITAGE_DOCUMENTARY_ACTS = [
  // =========================================================================
  // CHAPTER 01 — KHUÊ VĂN CÁC (1805)
  // =========================================================================
  {
    id: 'khue-van-cac',
    chapterNumber: '01',
    order: 1,
    placement: {
      establish: 'right',
      story: 'left'
    },
    images: {
      establishing: HERITAGE_ASSET_MANIFEST['khue-van-cac-establish'],
      detail: HERITAGE_ASSET_MANIFEST['khue-van-cac-detail'],
      archive: HERITAGE_ASSET_MANIFEST['khue-van-cac-cultural']
    },
    motion: {
      establish: { scaleStart: 1.01, scaleEnd: 1.05, panX: -8, panY: -3 },
      detail: { scaleStart: 1.02, scaleEnd: 1.05, panX: 6, panY: -3 }
    },
    content: {
      vi: {
        chapterMarker: '01 / 03 · KHUÊ VĂN CÁC (1805)',
        title: 'Khuê Văn Các',
        subtitle: 'Biểu tượng của văn chương và tinh thần hiếu học.',
        storyEstablish:
          'Được dựng vào năm 1805 trên trục chính của Văn Miếu, Khuê Văn Các mang kết cấu lầu vuông hai tầng tám mái. Bốn trụ gạch vuông tầng dưới nâng đỡ tầng gác gỗ sơn son bên trên, tạo nên dáng vẻ thanh thoát giữa sân cây cổ thụ.',
        storyDetail:
          'Trên bốn mặt gác gỗ là bốn khung cửa tròn với 16 nan gỗ tỏa đều ra xung quanh, mô phỏng hình ảnh sao Khuê — ngôi sao chủ về văn chương và học vấn. Ngày nay, Khuê Văn Các là biểu tượng văn hóa chính thức của Thủ đô Hà Nội.',
        detailCta: 'Khám phá chi tiết'
      },
      ko: {
        chapterMarker: '01 / 03 · 규문각 (1805)',
        title: '규문각',
        subtitle: '문학과 학문을 향한 천년의 상징.',
        storyEstablish:
          '1805년 문묘의 중심축 위에 세워진 규문각은 2층 8지붕 구조의 단아한 비례미를 보여줍니다. 네 개의 방형 벽돌 기둥이 붉은 옻칠을 한 상층 목조 누각을 받치며 고목들 사이에서 절제된 위엄을 드러냅니다.',
        storyDetail:
          '상층 목조 누각의 네 면에는 16개의 나무 살이 사방으로 뻗어 나가는 원형 창문이 자리합니다. 문학과 지성을 관장하는 규수(奎宿) 별자리를 형상화한 이 누각은 오늘날 하노이 수도의 공식 상징으로 자리 잡았습니다.',
        detailCta: '자세히 살펴보기'
      }
    },
    modal: {
      vi: {
        category: 'HỒ SƠ KIẾN TRÚC DI SẢN · CHƯƠNG 01',
        title: 'Khuê Văn Các — Lầu Sao Khuê Giữa Lòng Văn Miếu',
        lead: 'Được kiến tạo vào mùa thu năm Ất Sửu (1805), Khuê Văn Các là điểm nhấn kiến trúc kết nối khu Đại Trung với giếng Thiên Quang và vườn bia Tiến sĩ.',
        specs: [
          { label: 'Năm xây dựng', value: '1805 (Triều Nguyễn · niên hiệu Gia Long thứ 4)' },
          { label: 'Cấu trúc', value: 'Lầu vuông 2 tầng, 8 mái (chồng diêm hai tầng)' },
          { label: 'Chất liệu', value: '4 trụ gạch Bát Tràng tầng trệt · Khung gỗ lim sơn son thếp vàng tầng trên' },
          { label: 'Biểu tượng', value: 'Biểu tượng chính thức của Thủ đô Hà Nội' }
        ],
        plates: [
          {
            asset: HERITAGE_ASSET_MANIFEST['khue-van-cac-establish'],
            tag: 'Toàn cảnh kiến trúc',
            heading: 'Tỷ lệ hài hòa giữa bốn trụ gạch và gác gỗ',
            note: 'Tầng trệt gồm 4 trụ gạch vuông (cạnh 0,85m) để thoáng bốn phía trên nền sân lát gạch Bát Tràng.'
          },
          {
            asset: HERITAGE_ASSET_MANIFEST['khue-van-cac-detail'],
            tag: 'Cửa sổ tròn Sao Khuê',
            heading: '16 nan gỗ tỏa sáng bốn phương',
            note: 'Khung cửa tròn tượng trưng cho bầu trời và ánh sáng của chòm sao Khuê chủ về văn chương.'
          },
          {
            asset: HERITAGE_ASSET_MANIFEST['khue-van-cac-cultural'],
            tag: 'Không gian sân thứ ba',
            heading: 'Khuê Văn Các nhìn từ bờ giếng Thiên Quang',
            note: 'Hệ mái ngói ống hai tầng uốn cong nhẹ, hài hòa với vòm cây cổ thụ bao quanh.'
          }
        ],
        sections: [
          {
            heading: '1. Kiến trúc hai tầng tám mái',
            body: 'Khuê Văn Các dựng trên nền vuông cao ráo, mỗi cạnh dài khoảng 6,8 mét. Tầng dưới không xây tường bao mà dùng bốn trụ gạch vuông nâng đỡ toàn bộ sàn gỗ tầng trên, giúp tầm nhìn xuyên suốt từ cổng Đại Trung Môn ra mặt nước Thiên Quang Tỉnh.'
          },
          {
            heading: '2. Bốn cửa sổ tròn và hình tượng Sao Khuê',
            body: 'Tầng gác gỗ phía trên trổ bốn cửa tròn ở bốn hướng Đông, Tây, Nam, Bắc. Xung quanh vòng tròn là các con tiện gỗ tỏa ra như những tia sáng của sao Khuê, kết hợp với giếng vuông bên cạnh tạo nên bố cục "Trời tròn Đất vuông" hài hòa.'
          }
        ]
      },
      ko: {
        category: '헤리티지 건축 아카이브 · 제1장',
        title: '규문각 (Khuê Văn Các) — 학문의 별자리를 품은 누각',
        lead: '1805년 가을에 건립된 규문각은 문묘의 앞뜰 영역과 천광정·진사비원 영역을 이어주는 핵심 건축물입니다.',
        specs: [
          { label: '건립 연도', value: '1805년 (응우옌 왕조 자롱 황제 4년)' },
          { label: '건축 양식', value: '방형 평면 2층 8지붕 중층 목조·벽돌 복합 누각' },
          { label: '주요 재료', value: '하층 밧짱 벽돌 기둥 4개 · 상층 붉은 옻칠과 금박 마감 철목(Lim) 구조' },
          { label: '문화적 위상', value: '베트남 수도 하노이의 공식 상징 건축물' }
        ],
        plates: [
          {
            asset: HERITAGE_ASSET_MANIFEST['khue-van-cac-establish'],
            tag: '전체 건축 구도',
            heading: '네 개의 벽돌 기둥과 상층 목조 누각의 비례',
            note: '하층은 한 변이 0.85m인 네 개의 방형 벽돌 기둥으로 사방이 트여 있습니다.'
          },
          {
            asset: HERITAGE_ASSET_MANIFEST['khue-van-cac-detail'],
            tag: '규수(奎宿) 원형 창',
            heading: '사방으로 뻗어 나가는 16개의 나무 창살',
            note: '문학과 지성을 관장하는 별자리인 규수가 하늘에서 빛나는 모습을 형상화했습니다.'
          },
          {
            asset: HERITAGE_ASSET_MANIFEST['khue-van-cac-cultural'],
            tag: '제3정원 조망',
            heading: '천광정 난간에서 바라본 규문각',
            note: '겹처마 기와지붕과 주변 고목이 어우러져 고즈넉한 풍경을 완성합니다.'
          }
        ],
        sections: [
          {
            heading: '1. 2층 8지붕의 절제된 구조미',
            body: '규문각은 한 변이 약 6.8m인 정사각형 기단 위에 서 있습니다. 하층은 벽체 없이 네 개의 방형 벽돌 기둥만으로 상층 목조 누각을 지탱하여 대중문에서 천광정 수면까지 시선이 막힘없이 통하도록 설계되었습니다.'
          },
          {
            heading: '2. 네 개의 원형 창과 규수(奎宿) 별자리',
            body: '상층 목조 공간의 동·서·남·북 네 면에는 태양 광선처럼 뻗은 나무 살이 달린 원형 창문이 있습니다. 바로 앞 네모난 천광정 연못과 어우러져 하늘(원)과 땅(방형)의 조화를 완성합니다.'
          }
        ]
      }
    }
  },

  // =========================================================================
  // CHAPTER 02 — THIÊN QUANG TỈNH
  // =========================================================================
  {
    id: 'thien-quang-tinh',
    chapterNumber: '02',
    order: 2,
    placement: {
      establish: 'right',
      story: 'left'
    },
    images: {
      establishing: HERITAGE_ASSET_MANIFEST['thien-quang-tinh-reflection'],
      detail: HERITAGE_ASSET_MANIFEST['thien-quang-tinh-stillness'],
      archive: HERITAGE_ASSET_MANIFEST['thien-quang-tinh-spatial']
    },
    motion: {
      establish: { scaleStart: 1.01, scaleEnd: 1.045, panX: -6, panY: -2 },
      detail: { scaleStart: 1.015, scaleEnd: 1.045, panX: 5, panY: -2 }
    },
    content: {
      vi: {
        chapterMarker: '02 / 03 · THIÊN QUANG TỈNH',
        title: 'Thiên Quang Tỉnh',
        subtitle: 'Một khoảng trời tĩnh lặng giữa lòng di sản.',
        storyEstablish:
          'Nằm ngay sau Khuê Văn Các, Thiên Quang Tỉnh là hồ nước hình vuông ở trung tâm khu sân thứ ba. Tên gọi của hồ mang ý nghĩa "giếng soi ánh sáng bầu trời", nơi mặt nước phẳng lặng phản chiếu dáng gác cổ và vòm cây xanh.',
        storyDetail:
          'Bao quanh mặt hồ là tường lan can gạch thấp điểm gạch thông phong gốm xanh và lối đi lát gạch Bát Tràng. Khuôn hồ vuông đặt cạnh cửa tròn Khuê Văn Các thể hiện quan niệm hài hòa giữa trời và đất, đồng thời dẫn lối sang hai vườn bia Tiến sĩ hai bên.',
        detailCta: 'Khám phá chi tiết'
      },
      ko: {
        chapterMarker: '02 / 03 · 천광정 (天光井)',
        title: '천광정',
        subtitle: '유산의 중심에 열려 있는 고요한 하늘.',
        storyEstablish:
          '규문각 바로 뒤에 자리한 천광정은 세 번째 정원의 중심을 이루는 정사각형 연못입니다. "하늘의 빛을 비추는 우물"이라는 이름처럼 잔잔한 수면 위로 고풍스러운 누각과 고목의 그림자가 고요히 내려앉습니다.',
        storyDetail:
          '연못 둘레에는 푸른 유약 도자 창살을 넣은 낮은 벽돌 난간과 밧짱 벽돌 산책로가 이어집니다. 네모난 연못과 규문각의 둥근 창은 동양 건축의 천원지방(天圓地方) 조화를 보여주며 동서 양옆의 진사비원으로 동선을 안내합니다.',
        detailCta: '자세히 살펴보기'
      }
    },
    modal: {
      vi: {
        category: 'HỒ SƠ KHÔNG GIAN DI SẢN · CHƯƠNG 02',
        title: 'Thiên Quang Tỉnh — Giếng Soi Ánh Sáng Trời Giữa Vườn Bia',
        lead: 'Nằm tại trung tâm khu sân thứ ba của Văn Miếu, Thiên Quang Tỉnh tạo nên khoảng không gian thoáng đãng kết nối Khuê Văn Các với hai khu nhà bia Tiến sĩ và cổng Đại Thành.',
        specs: [
          { label: 'Tên gọi Hán Việt', value: 'Thiên Quang Tỉnh (天光井 — Giếng soi ánh sáng bầu trời)' },
          { label: 'Hình dáng', value: 'Hồ nước hình vuông, bao quanh bởi tường lan can gạch thấp' },
          { label: 'Vị trí', value: 'Trung tâm khu sân thứ ba (giữa Khuê Văn Các và Đại Thành Môn)' },
          { label: 'Ý nghĩa bố cục', value: 'Kết hợp cùng cửa tròn Khuê Văn Các biểu trưng cho Trời tròn Đất vuông' }
        ],
        plates: [
          {
            asset: HERITAGE_ASSET_MANIFEST['thien-quang-tinh-reflection'],
            tag: 'Mặt nước phản chiếu',
            heading: 'Bóng Khuê Văn Các in trên mặt giếng vuông',
            note: 'Góc nhìn từ bờ hồ cho thấy sự giao thoa giữa kiến trúc gỗ, mặt nước và cây xanh.'
          },
          {
            asset: HERITAGE_ASSET_MANIFEST['thien-quang-tinh-stillness'],
            tag: 'Lan can & Tường gạch cổ',
            heading: 'Khoảng lặng tách biệt nhịp phố thị',
            note: 'Hàng lan can gạch gắn gốm thông phong xanh chạy dọc bốn cạnh hồ.'
          },
          {
            asset: HERITAGE_ASSET_MANIFEST['thien-quang-tinh-spatial'],
            tag: 'Bố cục khu sân thứ ba',
            heading: 'Trục kết nối sang hai nhà bia Tiến sĩ Đông – Tây',
            note: 'Lối đi lát gạch quanh hồ mở ra hai khu vườn bia đối xứng hai bên.'
          }
        ],
        sections: [
          {
            heading: '1. Kiến trúc mặt nước trong quy hoạch Văn Miếu',
            body: 'Trong năm khu sân nối tiếp nhau dọc theo trục Bắc – Nam của Văn Miếu, khu sân thứ ba là khu duy nhất có mặt nước lớn chiếm trọn trung tâm. Du khách tách sang hai lối đi lát gạch men theo bờ hồ để chiêm ngưỡng hai vườn bia Tiến sĩ.'
          },
          {
            heading: '2. Biểu tượng của sự trong sáng và tĩnh tâm',
            body: 'Tên gọi Thiên Quang Tỉnh gửi gắm ý niệm thu nhận ánh sáng trong lành của trời đất, tạo nên một khoảng nghỉ thị giác trang nghiêm trước khi bước vào không gian bái đường.'
          }
        ]
      },
      ko: {
        category: '헤리티지 공간 아카이브 · 제2장',
        title: '천광정 (Thiên Quang Tỉnh) — 하늘빛을 비추는 사색의 수공간',
        lead: '문묘의 세 번째 정원 중앙을 차지하는 천광정은 규문각과 동서 진사비원, 그리고 대성문을 하나로 묶어주는 고요한 중심 공간입니다.',
        specs: [
          { label: '한자 명칭', value: '천광정 (天光井 — 하늘의 맑은 빛을 비추는 우물)' },
          { label: '형태 및 구조', value: '정방형 연못 · 도자 창살을 넣은 낮은 벽돌 난간과 보행로' },
          { label: '위치', value: '문묘 제3정원 중앙 (규문각과 대성문 사이)' },
          { label: '공간 철학', value: '규문각의 원형 창과 결합하여 천원지방(天圓地方)을 상징' }
        ],
        plates: [
          {
            asset: HERITAGE_ASSET_MANIFEST['thien-quang-tinh-reflection'],
            tag: '수면의 투영',
            heading: '네모난 수면 위에 비친 규문각',
            note: '연못 모서리에서 바라본 규문각과 비각의 대칭 구도입니다.'
          },
          {
            asset: HERITAGE_ASSET_MANIFEST['thien-quang-tinh-stillness'],
            tag: '옛 담장과 난간',
            heading: '도심의 소음을 가라앉히는 고요한 물결',
            note: '푸른 도자 창살이 박힌 벽돌 난간이 연못 사면을 단정하게 감싸고 있습니다.'
          },
          {
            asset: HERITAGE_ASSET_MANIFEST['thien-quang-tinh-spatial'],
            tag: '제3정원 전체 구도',
            heading: '규문각과 동서 진사비원을 잇는 중심 공간',
            note: '연못 둘레의 산책로를 따라 양옆의 진사제명비 전각으로 이어집니다.'
          }
        ],
        sections: [
          {
            heading: '1. 동선을 바꾸는 수공간의 배치',
            body: '남북 중심축을 따라 이어지는 다섯 개의 정원 중 세 번째 정원은 유일하게 중앙을 넓은 수면으로 비워 두었습니다. 관람객은 연못 가장자리의 벽돌 길을 따라 걸으며 자연스럽게 양옆의 진사제명비 구역을 마주하게 됩니다.'
          },
          {
            heading: '2. 맑은 지성과 성찰의 상징',
            body: '천광정이라는 이름에는 천지의 맑은 빛을 모은다는 뜻과 함께, 학문을 닦는 이들이 거울처럼 맑고 겸허한 마음을 유지하길 바라는 정신이 담겨 있습니다.'
          }
        ]
      }
    }
  },

  // =========================================================================
  // CHAPTER 03 — 82 BIA TIẾN SĨ (1442–1779)
  // =========================================================================
  {
    id: 'bia-tien-si',
    chapterNumber: '03',
    order: 3,
    placement: {
      establish: 'right',
      story: 'left'
    },
    images: {
      establishing: HERITAGE_ASSET_MANIFEST['bia-tien-si-rows'],
      detail: HERITAGE_ASSET_MANIFEST['bia-tien-si-inscription'],
      archive: HERITAGE_ASSET_MANIFEST['bia-tien-si-turtles']
    },
    motion: {
      establish: { scaleStart: 1.01, scaleEnd: 1.05, panX: -7, panY: -3 },
      detail: { scaleStart: 1.02, scaleEnd: 1.055, panX: 6, panY: -3 }
    },
    content: {
      vi: {
        chapterMarker: '03 / 03 · 82 BIA TIẾN SĨ (1442–1779)',
        title: '82 Bia Tiến Sĩ',
        subtitle: 'Những dấu ấn khoa bảng được lưu giữ qua nhiều thế kỷ.',
        storyEstablish:
          'Dọc hai bên Thiên Quang Tỉnh là hai khu nhà bia lưu giữ 82 tấm bia Tiến sĩ của các khoa thi từ năm 1442 đến năm 1779. Mỗi tấm bia đá xanh đều được đặt trang trọng trên lưng rùa đá — linh vật biểu trưng cho sự bền vững qua thời gian.',
        storyDetail:
          'Trên mặt bia khắc chữ Hán ghi rõ niên hiệu khoa thi, bài văn bia ca ngợi đạo học cùng họ tên, quê quán của 1.304 vị đỗ đại khoa. Với giá trị sử liệu độc bản, 82 bia Tiến sĩ đã được UNESCO ghi danh trong Chương trình Ký ức Thế giới.',
        detailCta: 'Khám phá chi tiết'
      },
      ko: {
        chapterMarker: '03 / 03 · 82기 진사제명비 (1442–1779)',
        title: '82기 진사제명비',
        subtitle: '수 세기를 건너 돌 위에 새겨진 학문의 기록.',
        storyEstablish:
          '천광정 양편의 비각 안에는 1442년부터 1779년까지 치러진 과거 시험을 기록한 82기의 진사제명비가 줄지어 서 있습니다. 청석으로 다듬어진 각 석비는 영속성을 상징하는 돌거북 등 위에 엄숙하게 세워져 있습니다.',
        storyDetail:
          '석비 표면에는 과거 시험 연도와 서문, 그리고 1,304명에 달하는 급제자의 성명과 출신지가 한자로 정교하게 새겨져 있습니다. 독보적인 사료적 가치를 인정받아 82기 진사제명비는 유네스코 세계기록유산(Memory of the World)에 등재되었습니다.',
        detailCta: '자세히 살펴보기'
      }
    },
    modal: {
      vi: {
        category: 'HỒ SƠ DI SẢN TƯ LIỆU · CHƯƠNG 03',
        title: '82 Bia Tiến Sĩ — Di Sản Tư Liệu Ký Ức Thế Giới UNESCO',
        lead: 'Bộ sưu tập 82 tấm bia đá tại Văn Miếu – Quốc Tử Giám là nguồn sử liệu nguyên bản quý giá về lịch sử khoa cử và nghệ thuật điêu khắc đá Việt Nam suốt hơn ba thế kỷ (1442–1779).',
        specs: [
          { label: 'Số lượng & Niên đại', value: '82 bia đá · Ghi nhận 82 khoa thi từ năm 1442 đến năm 1779' },
          { label: 'Danh nhân ghi danh', value: '1.304 vị đỗ đại khoa dưới các triều Lê sơ, Mạc và Lê trung hưng' },
          { label: 'Danh hiệu UNESCO', value: 'Di sản Tư liệu thuộc Chương trình Ký ức Thế giới (Memory of the World)' },
          { label: 'Bảo vật Quốc gia', value: 'Được công nhận là Bảo vật Quốc gia Việt Nam (năm 2015)' }
        ],
        plates: [
          {
            asset: HERITAGE_ASSET_MANIFEST['bia-tien-si-rows'],
            tag: 'Khu nhà bia Tiến sĩ',
            heading: 'Những hàng bia đá nối tiếp qua ba thế kỷ',
            note: 'Bia được bố trí trong hai khu nhà bia Đông – Tây đối xứng qua giếng Thiên Quang.'
          },
          {
            asset: HERITAGE_ASSET_MANIFEST['bia-tien-si-inscription'],
            tag: 'Văn bia chữ Hán',
            heading: 'Khắc ghi tên tuổi 1.304 vị đại khoa',
            note: 'Mỗi tấm bia gồm bài ký (Tiến sĩ đề danh ký) và danh sách họ tên, quê quán người đỗ.'
          },
          {
            asset: HERITAGE_ASSET_MANIFEST['bia-tien-si-turtles'],
            tag: 'Điêu khắc rùa đá',
            heading: 'Bia đá đặt trên lưng rùa nguyên khối',
            note: 'Hình dáng rùa đá và hoa văn trán bia phản ánh phong cách mỹ thuật từng triều đại.'
          }
        ],
        sections: [
          {
            heading: '1. Giá trị sử liệu và tư tưởng trọng hiền tài',
            body: 'Mỗi tấm bia Tiến sĩ đều khắc một bài văn bia do các bậc danh nho đương thời biên soạn. Trên bia khoa Nhâm Tuất (1442) do Thân Nhân Trung soạn năm 1484 đã khẳng định tư tưởng cốt lõi: "Hiền tài là nguyên khí của quốc gia".'
          },
          {
            heading: '2. Phân biệt chính xác danh hiệu UNESCO',
            body: '82 bia Tiến sĩ được UNESCO ghi danh là Di sản Tư liệu thuộc Chương trình Ký ức Thế giới (Memory of the World Register), tôn vinh giá trị văn bản và tư liệu lịch sử khắc trên đá — phân biệt rõ với danh hiệu Di sản Văn hóa Thế giới (World Heritage Site).'
          }
        ]
      },
      ko: {
        category: '헤리티지 기록유산 아카이브 · 제3장',
        title: '82기 진사제명비 — 유네스코 세계기록유산',
        lead: '문묘-국자감에 보존된 82기의 진사제명비는 300여 년(1442–1779)에 걸친 베트남의 과거 제도와 교육 철학, 석조 조각 예술을 보여주는 원본 사료입니다.',
        specs: [
          { label: '수량 및 연대', value: '총 82기 석비 · 1442년부터 1779년까지 82회의 과거 시험 기록' },
          { label: '기록된 인물', value: '대과 급제자 총 1,304명의 성명, 위계 및 출신지 각인' },
          { label: '유네스코 등재', value: '유네스코 세계기록유산 (Memory of the World Register)' },
          { label: '국가 지정 위상', value: '베트남 국보(Bảo vật Quốc gia, 2015년 지정)' }
        ],
        plates: [
          {
            asset: HERITAGE_ASSET_MANIFEST['bia-tien-si-rows'],
            tag: '진사제명비 전각',
            heading: '3세기에 걸쳐 세워진 석비의 행렬',
            note: '천광정을 사이에 두고 동서 비각 안에 정연하게 배치되어 있습니다.'
          },
          {
            asset: HERITAGE_ASSET_MANIFEST['bia-tien-si-inscription'],
            tag: '한자 비문 각인',
            heading: '1,304명 급제자의 이름과 과거 시험 기록',
            note: '시험 연도와 서문, 급제자 명단이 돌 표면에 선명하게 남아 있습니다.'
          },
          {
            asset: HERITAGE_ASSET_MANIFEST['bia-tien-si-turtles'],
            tag: '돌거북 받침돌',
            heading: '영속성을 상징하는 거북 조형미',
            note: '시대별 조각 양식에 따라 거북의 형태와 비석 상단 문양이 다채롭게 변화합니다.'
          }
        ],
        sections: [
          {
            heading: '1. 인재 존중의 철학을 담은 사료',
            body: '각 진사제명비에는 당대 석학들이 찬술한 서문이 새겨져 있습니다. 특히 1442년 과거를 기록한 첫 비문(1484년 건립)에는 국가의 근간이 인재에 있음을 강조한 구절이 전해집니다.'
          },
          {
            heading: '2. 유네스코 세계기록유산으로서의 위상',
            body: '82기 진사제명비는 건축군을 대상으로 하는 세계문화유산(World Heritage Site)과 구별되는 유네스코 세계기록유산(Memory of the World)으로 등재되어 문헌적·역사적 독창성을 공인받았습니다.'
          }
        ]
      }
    }
  }
];

export const HERITAGE_DOCUMENTARY_ENDING = {
  id: 'heritage-ending',
  asset: HERITAGE_ASSET_MANIFEST['van-mieu-courtyard-legacy'],
  motion: {
    scaleStart: 1.05,
    scaleEnd: 1.01,
    panX: 0,
    panY: -4
  },
  content: {
    vi: {
      kicker: 'VĂN MIẾU – QUỐC TỬ GIÁM · TỪ NĂM 1070',
      closingLine: 'Một nghìn năm, một truyền thống hiếu học.',
      ctaAdd: 'Thêm Văn Miếu vào hành trình',
      ctaAdded: 'Đã thêm vào hành trình'
    },
    ko: {
      kicker: '문묘와 국자감 · 1070년 창건',
      closingLine: '천 년을 이어온 배움의 정신.',
      ctaAdd: '문묘를 내 일정에 추가',
      ctaAdded: '일정에 추가됨'
    }
  }
};

export const TOTAL_DOCUMENTARY_ACTS = HERITAGE_DOCUMENTARY_ACTS.length;
