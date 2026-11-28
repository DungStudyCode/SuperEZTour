/**
 * SUPER EZ TOUR — HANOI SCREEN 2 V3.4.1
 * Cinematic Travel Editorial — Story Data, Text-Safe Image Composition & Localized Scrims
 *
 * Every beat defines:
 *  - layout ('full-bleed' | 'editorial-split' | 'framed-photo' | 'detail-reflection')
 *  - image.focalPointDesktop & image.focalPointMobile calibrated so subjects are never covered by text
 *  - image.scrimDirection ('left-editorial' | 'right-editorial' | 'minimal-caption')
 *  - image.scrimOpacity (localized max ~0.62–0.65 behind overlay text, 0 over split/framed photos)
 */

export const OLD_QUARTER_CHAPTERS = [
  {
    id: 'hang-bac',
    index: 1,
    chapterNumber: '01',
    layoutAlign: 'right', // Subject weighted right; text sits safely on the left
    title: {
      vi: 'Phố Hàng Bạc',
      ko: '항박 거리',
      en: 'Hang Bac Street'
    },
    lead: {
      vi: 'Tuyến phố nghề kim hoàn hình thành từ thế kỷ 15 giữa lòng 36 phố phường Hà Nội.',
      ko: '15세기부터 하노이 36 구시가지 중심에 자리 잡은 전통 은세공 거리.'
    },
    image: '/assets/destinations/hanoi/old-quarter/hang_bac.webp',
    credits: 'Benjamin Smith · CC BY-SA 4.0',

    beats: [
      {
        id: 'origin',
        beatNumber: '01',
        layout: 'full-bleed',
        beatLabel: {
          vi: 'Khởi nguồn',
          ko: '기원'
        },
        title: {
          vi: 'Dãy phố cổ từ xưởng đúc tràng tiền',
          ko: '왕실 주조소에서 시작된 거리'
        },
        body: {
          vi: 'Trong ánh sáng sớm mai dọc dãy nhà ống san sát, Hàng Bạc lưu giữ dấu tích của phường đúc bạc nén lập từ thế kỷ 15 dưới thời vua Lê Thánh Tông, khi thợ kim hoàn Châu Khê và Định Công quy tụ về kinh thành Thăng Long.',
          ko: '이른 아침 좁은 가옥이 늘어선 항박 거리는 15세기 후 레 왕조 시절, 쩌우케와 딘꽁 마을의 장인들이 수도 탕롱으로 모여 왕실 은괴 주조소를 세운 데서 비롯되었습니다.'
        },
        detail: {
          vi: 'Đình Kim Ngân (42–44 Hàng Bạc) vẫn tọa lạc ngay giữa tuyến phố, thờ tổ nghề kim hoàn.',
          ko: '거리 한가운데 자리한 낌응안 사당(항박 42–44번지)은 지금도 은세공 시조를 기립니다.'
        },
        image: {
          src: '/assets/destinations/hanoi/old-quarter/story-beats/hang-bac-origin.webp',
          fallback: '/assets/destinations/hanoi/old-quarter/hang_bac.webp',
          focalPointDesktop: '58% 42%',
          focalPointMobile: '52% 44%',
          scrimDirection: 'left-editorial',
          scrimOpacity: 0.92,
          caption: {
            vi: 'Phố Hàng Bạc vào buổi sớm — Benjamin Smith',
            ko: '이른 아침의 항박 거리 풍경 — Benjamin Smith'
          },
          status: 'APPROVED',
          author: 'Benjamin Smith',
          license: 'CC BY-SA 4.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hanoi_-_H%C3%A0ng_B%E1%BA%A1c_Street_-_2.jpg',
          modifications: 'Resized to 2560x1709 WebP (q85)',
          credits: 'Benjamin Smith · CC BY-SA 4.0'
        },
        motion: {
          type: 'slow-push',
          scaleStart: 1.01,
          scaleEnd: 1.06,
          panX: 0,
          panY: -8
        }
      },
      {
        id: 'signature',
        beatNumber: '02',
        layout: 'editorial-split',
        beatLabel: {
          vi: 'Nghề kim hoàn',
          ko: '은세공 기법'
        },
        title: {
          vi: 'Ba kỹ nghệ chạm, đậu và trổ',
          ko: '참 · 더우 · 조 세 가지 수공예'
        },
        body: {
          vi: 'Giá trị của bạc Hàng Bạc nằm ở ba kỹ thuật truyền thống: kéo sợi bạc mảnh rồi uốn ghép hoa văn (đậu), chạm nổi họa tiết rồng phượng (chạm) và khoét rỗng tạo độ thoáng cho sản phẩm (trổ).',
          ko: '항박 은세공의 진가는 세 가지 전통 기법에 있습니다. 은을 가늘게 뽑아 엮는 더우(Đậu), 문양을 돋을새김하는 참(Chạm), 정교하게 뚫어 입체감을 살리는 조(Trổ)가 그 핵심입니다.'
        },
        detail: {
          vi: 'Từ đúc bạc nén cho quốc khố xưa, nghề dần chuyển sang chế tác trang sức và đồ thờ tinh xảo.',
          ko: '옛 왕실 은괴 주조에서 출발해 점차 정교한 장신구와 공예품 제작으로 발전했습니다.'
        },
        image: {
          src: '/assets/destinations/hanoi/old-quarter/hang_bac.webp',
          fallback: '/assets/destinations/hanoi/old-quarter/hang_bac.webp',
          focalPointDesktop: '52% 46%',
          focalPointMobile: '50% 48%',
          scrimDirection: 'minimal-caption',
          scrimOpacity: 0.35,
          caption: {
            vi: 'Không gian phố nghề Hàng Bạc (ảnh dự phòng xác minh) — Benjamin Smith',
            ko: '항박 장인 거리 전경 (검증된 대체 이미지) — Benjamin Smith'
          },
          status: 'MISSING / REVIEW REQUIRED',
          author: 'Benjamin Smith (Fallback)',
          license: 'CC BY-SA 4.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hanoi_-_H%C3%A0ng_B%E1%BA%A1c_Street_-_1.jpg',
          modifications: 'Verified chapter fallback pending approved artisan workshop photo',
          credits: 'Benjamin Smith · CC BY-SA 4.0 (Fallback)'
        },
        motion: {
          type: 'lateral-pan',
          scaleStart: 1.02,
          scaleEnd: 1.06,
          panX: -10,
          panY: 0
        }
      },
      {
        id: 'experience',
        beatNumber: '03',
        layout: 'framed-photo',
        beatLabel: {
          vi: 'Trải nghiệm',
          ko: '현장 산책'
        },
        title: {
          vi: 'Tản bộ qua những mặt tiền tiệm bạc',
          ko: '은 장신구 상점이 이어진 거리를 걷다'
        },
        body: {
          vi: 'Đi dọc tuyến phố hôm nay, bạn sẽ quan sát thấy các cửa hàng kim hoàn nối tiếp nhau bên dưới tầng gác cũ, xen kẽ lối ngõ nhỏ dẫn sâu vào khu dân cư — bức tranh sống động về sự tiếp nối của một phố nghề giữa đô thị hiện đại.',
          ko: '오늘날 거리를 천천히 걷다 보면 낡은 2층 목조 처마 아래로 귀금속 상점이 나란히 이어지고, 그 사이로 주민들이 살아가는 좁은 골목이 뻗어 있어 전통과 현재가 공존하는 풍경을 마주할 수 있습니다.'
        },
        image: {
          src: '/assets/destinations/hanoi/old-quarter/story-beats/hang-bac-experience.webp',
          fallback: '/assets/destinations/hanoi/old-quarter/hang_bac.webp',
          focalPointDesktop: '50% 44%',
          focalPointMobile: '50% 46%',
          scrimDirection: 'minimal-caption',
          scrimOpacity: 0.45,
          caption: {
            vi: 'Các cửa hiệu kim hoàn dọc phố Hàng Bạc — Martin Lewison',
            ko: '항박 거리의 귀금속 상점들 — Martin Lewison'
          },
          status: 'APPROVED',
          author: 'Martin Lewison',
          license: 'CC BY 2.0',
          licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:H%C3%A0ng_B%E1%BA%A1c_Street,_Hanoi_(49373512263).jpg',
          modifications: 'EXIF Orientation 3 normalized upright, resized to 2560x1920 WebP (q85)',
          credits: 'Martin Lewison · CC BY 2.0'
        },
        motion: {
          type: 'frame-expand',
          scaleStart: 1.05,
          scaleEnd: 1.01,
          panX: 8,
          panY: -4
        }
      }
    ],

    modalHighlights: [
      'Đình Kim Ngân (42–44 Hàng Bạc) — di tích thờ tổ nghề kim hoàn lập từ thời Hậu Lê',
      'Tìm hiểu lịch sử ba kỹ thuật chạm – đậu – trổ đặc trưng của thợ bạc Thăng Long',
      'Quan sát trực tiếp cấu trúc nhà ống kết hợp cửa hàng kim hoàn dọc tuyến phố cổ'
    ],
    modalHighlightsKr: [
      '후 레 왕조 때 건립된 은세공 시조 사당, 낌응안 사당(항박 42–44번지)',
      '탕롱 은세공 장인들의 전통 세 기법(참·더우·조)의 역사적 배경',
      '전통 튜브 하우스 구조와 귀금속 상점이 이어진 항박 거리 도보 탐방'
    ]
  },
  {
    id: 'cafe-giang',
    index: 2,
    chapterNumber: '02',
    layoutAlign: 'left', // Photo on left; dedicated editorial surface on right
    title: {
      vi: 'Cà Phê Giảng',
      ko: '카페 지앙',
      en: 'Cafe Giang 1946'
    },
    lead: {
      vi: 'Quán cà phê gắn với sự ra đời của món cà phê trứng Hà Nội từ năm 1946.',
      ko: '1946년 하노이 원조 에그커피가 탄생한 유서 깊은 커피 하우스.'
    },
    image: '/assets/destinations/hanoi/old-quarter/story-beats/cafe-giang-experience.webp',
    credits: 'travel oriented · CC BY-SA 2.0',

    beats: [
      {
        id: 'origin',
        beatNumber: '01',
        layout: 'editorial-split',
        beatLabel: {
          vi: 'Khởi nguồn',
          ko: '기원'
        },
        title: {
          vi: 'Từ tấm biển nhỏ số 39 Nguyễn Hữu Huân',
          ko: '응우옌흐우후안 39번지의 작은 간판'
        },
        body: {
          vi: 'Năm 1946, khi sữa đặc trở nên khan hiếm, cụ Nguyễn Văn Giảng — nguyên nhân viên pha chế tại khách sạn Metropole — đã thử đánh bông lòng đỏ trứng gà để thay thế sữa. Công thức ấy vẫn được gia đình giữ lại phía sau lối vào nhỏ trên phố Nguyễn Hữu Huân.',
          ko: '1946년 우유가 귀하던 시절, 메트로폴 호텔 바텐더였던 응우옌 반 지앙은 달걀 노른자를 곱게 휘핑해 우유를 대신했습니다. 그 레시피는 지금도 응우옌흐우후안 거리의 작은 간판 뒤에서 대를 이어 지켜지고 있습니다.'
        },
        detail: {
          vi: 'Lối đi hẹp dẫn từ mặt phố vào khoảng không gian bên trong tách biệt với dòng xe ngoài đường.',
          ko: '도로변 좁은 통로를 지나 안으로 들어서면 거리의 소음과 분리된 아늑한 공간이 나옵니다.'
        },
        image: {
          src: '/assets/destinations/hanoi/old-quarter/story-beats/cafe-giang-origin.webp',
          fallback: '/assets/destinations/hanoi/old-quarter/story-beats/cafe-giang-experience.webp',
          focalPointDesktop: '50% 26%',
          focalPointMobile: '50% 24%',
          scrimDirection: 'minimal-caption',
          scrimOpacity: 0.35,
          caption: {
            vi: 'Mặt tiền quán Cà phê Giảng tại 39 Nguyễn Hữu Huân — Phương Huy',
            ko: '응우옌흐우후안 39번지 카페 지앙 입구 — Phương Huy'
          },
          status: 'APPROVED',
          author: 'Phương Huy',
          license: 'Public Domain',
          licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:C%C3%A0_ph%C3%AA_tr%E1%BB%A9ng_Gi%E1%BA%A3ng_(c%E1%BB%ADa_ti%E1%BB%87m).jpg',
          modifications: 'Resized to 1815x2560 WebP (q85), focal point calibrated to signboard',
          credits: 'Phương Huy · Public Domain'
        },
        motion: {
          type: 'slow-push',
          scaleStart: 1.01,
          scaleEnd: 1.05,
          panX: 0,
          panY: -8
        }
      },
      {
        id: 'signature',
        beatNumber: '02',
        layout: 'detail-reflection',
        beatLabel: {
          vi: 'Hương vị',
          ko: '풍미'
        },
        title: {
          vi: 'Lớp kem trứng sánh mịn trên nền Robusta',
          ko: '로부스타 위를 덮은 황금빛 크림'
        },
        body: {
          vi: 'Nhìn gần trên bề mặt tách là lớp bọt trứng đánh kỹ, mịn và đặc như kem tươi, cân bằng hoàn hảo với vị đắng đậm của cà phê Robusta phin bên dưới.',
          ko: '가까이 들여다보면 곱게 거품을 낸 달걀 크림이 벨벳처럼 촘촘하게 올라가 있어, 아래에 깔린 진한 로부스타 커피의 쌉싸름한 맛을 부드럽게 감싸 줍니다.'
        },
        editorialNote: {
          text: {
            vi: 'Nên khuấy nhẹ từng lớp bằng thìa nhỏ để cảm nhận rõ sự hòa quyện giữa kem nóng và cà phê đậm.',
            ko: '작은 스푼으로 크림과 커피를 가볍게 섞어 맛보면 따뜻한 질감의 조화가 가장 뚜렷합니다.'
          },
          label: {
            vi: 'Gợi ý thưởng thức · Super EZ Tour',
            ko: '테이스팅 노트 · Super EZ Tour'
          }
        },
        image: {
          src: '/assets/destinations/hanoi/old-quarter/story-beats/cafe-giang-signature.webp',
          fallback: '/assets/destinations/hanoi/old-quarter/story-beats/cafe-giang-experience.webp',
          focalPointDesktop: '50% 50%',
          focalPointMobile: '50% 48%',
          scrimDirection: 'minimal-caption',
          scrimOpacity: 0.4,
          caption: {
            vi: 'Cận cảnh lớp kem trứng vàng mịn tại Cà phê Giảng — Amenoc',
            ko: '카페 지앙 에그커피 크림 클로즈업 — Amenoc'
          },
          status: 'APPROVED',
          author: 'Amenoc',
          license: 'CC0 1.0',
          licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Egg_coffee_at_Caf%C3%A9_Giang_closeup.jpg',
          modifications: 'Resized to 2560x1920 WebP (q85)',
          credits: 'Amenoc · CC0'
        },
        motion: {
          type: 'crop-drift',
          scaleStart: 1.02,
          scaleEnd: 1.07,
          panX: -8,
          panY: -4
        }
      },
      {
        id: 'experience',
        beatNumber: '03',
        layout: 'framed-photo',
        beatLabel: {
          vi: 'Trải nghiệm',
          ko: '현장 경험'
        },
        title: {
          vi: 'Tách cà phê ủ trong bát nước nóng',
          ko: '따뜻한 물그릇에 담긴 한 잔의 여유'
        },
        body: {
          vi: 'Ngồi bên chiếc bàn gỗ thấp giữa quán nhỏ, bạn nhận tách cà phê trứng nóng đặt gọn trong một bát nước sôi. Cách phục vụ giản dị này giữ cho lớp kem không bị nguội và giữ trọn mùi thơm suốt buổi trò chuyện.',
          ko: '낮은 나무 테이블에 앉아 받아 든 에그커피 잔은 뜨거운 물이 담긴 작은 그릇에 받쳐 나옵니다. 소박하지만 세심한 이 서빙 방식 덕분에 마지막 한 모금까지 크림의 온기와 향이 그대로 유지됩니다.'
        },
        image: {
          src: '/assets/destinations/hanoi/old-quarter/story-beats/cafe-giang-experience.webp',
          fallback: '/assets/destinations/hanoi/old-quarter/story-beats/cafe-giang-experience.webp',
          focalPointDesktop: '50% 48%',
          focalPointMobile: '48% 50%',
          scrimDirection: 'minimal-caption',
          scrimOpacity: 0.45,
          caption: {
            vi: 'Cà phê trứng phục vụ trong bát nước nóng — travel oriented',
            ko: '따뜻한 물그릇에 서빙된 에그커피 — travel oriented'
          },
          status: 'APPROVED',
          author: 'travel oriented',
          license: 'CC BY-SA 2.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Egg_Coffee_at_Cafe_Gi%E1%BA%A3ng,_H%C3%A0_N%E1%BB%99i,_Vietnam.jpg',
          modifications: 'Resized to 2560x1708 WebP (q85)',
          credits: 'travel oriented · CC BY-SA 2.0'
        },
        motion: {
          type: 'frame-expand',
          scaleStart: 1.02,
          scaleEnd: 1.06,
          panX: 8,
          panY: -4
        }
      }
    ],

    modalHighlights: [
      'Cách phục vụ đặc trưng: đặt tách cà phê nóng trong bát nước sôi để giữ nhiệt lớp kem trứng',
      'Ghé thăm địa chỉ số 39 Nguyễn Hữu Huân gắn với lịch sử món cà phê trứng từ năm 1946',
      'Điểm dừng chân ẩm thực kinh điển trong lộ trình dạo bộ Phố Cổ Hà Nội'
    ],
    modalHighlightsKr: [
      '마지막 한 모금까지 온기를 지켜주는 따뜻한 물그릇 서빙 전통',
      '1946년 원조 레시피가 이어지는 응우옌흐우후안 39번지 골목 본점',
      '하노이 구시가지 도보 여정 중 잠시 쉬어가기 좋은 대표 미식 공간'
    ]
  },
  {
    id: 'ma-may-87',
    index: 3,
    chapterNumber: '03',
    layoutAlign: 'right', // Subject weighted right; text sits safely on the left
    title: {
      vi: 'Nhà Cổ 87 Mã Mây',
      ko: '87 마메이 고택',
      en: '87 Ma May Heritage House'
    },
    lead: {
      vi: 'Ngôi nhà ống gỗ cuối thế kỷ 19 được phục dựng nguyên mẫu giữa Phố Cổ Hà Nội.',
      ko: '19세기 말 하노이 전통 목조 튜브 하우스의 원형을 간직한 문화유산.'
    },
    image: '/assets/destinations/hanoi/old-quarter/ma_may_87.webp',
    credits: 'Christophe95 · CC BY-SA 4.0',

    beats: [
      {
        id: 'origin',
        beatNumber: '01',
        layout: 'full-bleed',
        beatLabel: {
          vi: 'Khởi nguồn',
          ko: '기원'
        },
        title: {
          vi: 'Mặt tiền gỗ hẹp của nếp nhà thương nhân',
          ko: '19세기 상인 가옥의 좁은 목조 정면'
        },
        body: {
          vi: 'Xây dựng vào cuối thế kỷ 19, ngôi nhà số 87 Mã Mây là mẫu hình tiêu biểu của kiến trúc nhà ống cổ Hà Nội: mặt tiền gỗ chỉ rộng khoảng 5m nhưng chiều sâu kéo dài 28m, kết hợp cửa hàng phía trước và nơi ở phía sau.',
          ko: '19세기 말 지어진 마메이 87번지 가옥은 하노이 전통 튜브 하우스의 전형입니다. 도로 쪽 목조 정면은 약 5m로 좁지만 안쪽 깊이는 28m에 달하며, 앞쪽은 상점, 뒤쪽은 가족의 생활 공간으로 나뉘었습니다.'
        },
        detail: {
          vi: 'Hệ cửa bức bàn bằng gỗ tháo lắp linh hoạt và mái ngói truyền thống được bảo tồn gần như nguyên vẹn.',
          ko: '탈부착이 가능한 전통 목조 덧문과 기와지붕이 원형에 가깝게 보존되어 있습니다.'
        },
        image: {
          src: '/assets/destinations/hanoi/old-quarter/story-beats/ma-may-origin.webp',
          fallback: '/assets/destinations/hanoi/old-quarter/ma_may_87.webp',
          focalPointDesktop: '60% 34%',
          focalPointMobile: '50% 30%',
          scrimDirection: 'left-editorial',
          scrimOpacity: 0.96,
          caption: {
            vi: 'Mặt tiền gỗ Ngôi nhà Di sản 87 Mã Mây — Christophe95',
            ko: '87 마메이 전통 고택 정면 — Christophe95'
          },
          status: 'APPROVED',
          author: 'Christophe95',
          license: 'CC BY-SA 4.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Heritage_House_(Hanoi).jpg',
          modifications: 'EXIF Orientation 6 normalized upright, resized to 1920x2560 WebP (q85)',
          credits: 'Christophe95 · CC BY-SA 4.0'
        },
        motion: {
          type: 'slow-push',
          scaleStart: 1.01,
          scaleEnd: 1.05,
          panX: 0,
          panY: -10
        }
      },
      {
        id: 'signature',
        beatNumber: '02',
        layout: 'editorial-split',
        beatLabel: {
          vi: 'Kiến trúc',
          ko: '건축'
        },
        title: {
          vi: 'Khoảng sân trời giữa kết cấu khung gỗ',
          ko: '목조 골조 사이에 열린 중앙 중정'
        },
        body: {
          vi: 'Nằm ở chính giữa chiều sâu ngôi nhà là khoảng sân trời lộ thiên (thiên tỉnh). Nhờ khoảng mở này, ánh sáng tự nhiên và dòng khí đối lưu len qua hệ cột gỗ, cửa lá sách và hành lang tầng hai, giúp nhà ống sâu vẫn sáng và thoáng.',
          ko: '긴 가옥의 정중앙에는 하늘을 향해 트인 안뜰(티엔띤)이 자리합니다. 이 열린 공간을 통해 햇빛과 바람이 목조 기둥과 2층 회랑, 나무 창살 사이로 자연스럽게 흘러듭니다.'
        },
        detail: {
          vi: 'Sự phân chia rõ rệt giữa gian ngoài, sân trong và gian bếp sau thể hiện tư duy tổ chức không gian thích ứng khí hậu nhiệt đới.',
          ko: '바깥 상점, 중앙 안뜰, 안쪽 주거 공간의 배치는 열대 기후에 맞춘 전통 건축의 지혜를 보여줍니다.'
        },
        image: {
          src: '/assets/destinations/hanoi/old-quarter/story-beats/ma-may-architecture.webp',
          fallback: '/assets/destinations/hanoi/old-quarter/ma_may_87.webp',
          focalPointDesktop: '50% 44%',
          focalPointMobile: '50% 42%',
          scrimDirection: 'minimal-caption',
          scrimOpacity: 0.35,
          caption: {
            vi: 'Khoảng sân trời và kết cấu gỗ 87 Mã Mây — Guerinf',
            ko: '87 마메이 고택의 중앙 안뜰과 목조 구조 — Guerinf'
          },
          status: 'APPROVED',
          author: 'Guerinf',
          license: 'CC BY-SA 4.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Maison_longue_traditionnelle_(1).jpg',
          modifications: 'Resized to 2560x1920 WebP (q85)',
          credits: 'Guerinf · CC BY-SA 4.0'
        },
        motion: {
          type: 'vertical-drift',
          scaleStart: 1.02,
          scaleEnd: 1.06,
          panX: 0,
          panY: -10
        }
      },
      {
        id: 'experience',
        beatNumber: '03',
        layout: 'framed-photo',
        beatLabel: {
          vi: 'Trải nghiệm',
          ko: '관람'
        },
        title: {
          vi: 'Quan sát trực tiếp nếp sinh hoạt gia đình xưa',
          ko: '옛 하노이 가정의 생활 공간을 둘러보다'
        },
        body: {
          vi: 'Khi bước qua ngưỡng cửa gỗ vào gian trong, du khách có thể quan sát gần bộ bàn ghế chạm khắc, không gian tiếp khách, bàn thờ và các vật dụng sinh hoạt được bài trí đúng theo nếp nhà Hà Nội cuối thế kỷ 19.',
          ko: '나무 문턱을 넘어 안으로 들어서면 정교하게 조각된 고가구와 응접실, 제단 공간 등 19세기 말 하노이 상인 가족의 실제 생활상을 가까이에서 차분히 관람할 수 있습니다.'
        },
        image: {
          src: '/assets/destinations/hanoi/old-quarter/story-beats/ma-may-experience.webp',
          fallback: '/assets/destinations/hanoi/old-quarter/ma_may_87.webp',
          focalPointDesktop: '50% 46%',
          focalPointMobile: '48% 48%',
          scrimDirection: 'minimal-caption',
          scrimOpacity: 0.45,
          caption: {
            vi: 'Không gian nội thất gỗ cổ bên trong 87 Mã Mây — Guerinf',
            ko: '87 마메이 고택 내부 목조 생활 공간 — Guerinf'
          },
          status: 'APPROVED',
          author: 'Guerinf',
          license: 'CC BY-SA 4.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Maison_longue_traditionnelle_(4).jpg',
          modifications: 'Resized to 2560x1920 WebP (q85)',
          credits: 'Guerinf · CC BY-SA 4.0'
        },
        motion: {
          type: 'frame-expand',
          scaleStart: 1.05,
          scaleEnd: 1.01,
          panX: -8,
          panY: 0
        }
      }
    ],

    modalHighlights: [
      'Kiến trúc nhà ống "tiền chế hậu cư" tiêu biểu cuối thế kỷ 19 (mặt tiền ~5m, sâu ~28m)',
      'Khoảng sân trời trung tâm (thiên tỉnh) đón ánh sáng và thông gió tự nhiên cho hai tầng gỗ',
      'Bảo tồn nguyên vẹn không gian tiếp khách, đồ gỗ chạm khắc và vật dụng gia đình xưa'
    ],
    modalHighlightsKr: [
      '폭 약 5m, 깊이 약 28m의 19세기 상인 튜브 하우스 원형 구조',
      '2층 목조 공간에 자연 채광과 바람길을 여는 중앙 안뜰(티엔띤)',
      '옛 응접실, 전통 목조 가구 및 생활용품이 그대로 보존된 전시 공간'
    ]
  },
  {
    id: 'ganh-hang-rong',
    index: 4,
    chapterNumber: '04',
    // Flower vendor subject is on the LEFT; text is positioned on the RIGHT with right-to-left scrim
    layoutAlign: 'left',
    title: {
      vi: 'Xe Hoa & Hàng Rong',
      ko: '꽃 자전거와 거리 상인',
      en: 'Flower Bicycles & Street Vendors'
    },
    lead: {
      vi: 'Những chiếc xe đạp chở hoa từ làng hoa ven đô di chuyển qua các góc phố Hà Nội mỗi ngày.',
      ko: '매일 아침 외곽 꽃마을에서 출발해 하노이 골목을 누비는 꽃 자전거의 일상.'
    },
    image: '/assets/destinations/hanoi/old-quarter/story-beats/flower-vendors-origin.webp',
    credits: 'Célestine M.C. Leroy · CC BY-SA 2.0',

    beats: [
      {
        id: 'origin',
        beatNumber: '01',
        layout: 'full-bleed',
        beatLabel: {
          vi: 'Nhịp sống',
          ko: '거리 일상'
        },
        title: {
          vi: 'Những vòng xe chở hoa từ sáng sớm',
          ko: '이른 아침 골목으로 들어서는 꽃 자전거'
        },
        body: {
          vi: 'Từ các vùng trồng hoa ven đô như Quảng Bá và Ngọc Hà, người bán hoa xếp gọn những bó hoa tươi sau yên xe đạp rồi len qua các tuyến phố trung tâm. Không cửa hiệu cố định, họ mang sắc hoa tới tận vỉa hè phố cổ.',
          ko: '꽝바와 응옥하 등 외곽 꽃마을에서 출발한 상인들은 자전거 뒤에 갓 수확한 꽃을 가득 싣고 구시가지로 들어옵니다. 고정된 가게 대신 거리 위를 이동하며 일상에 색채를 더합니다.'
        },
        detail: {
          vi: 'Hình ảnh xe đạp chở hoa gắn liền với nhịp giao thương đường phố quen thuộc của người Hà Nội.',
          ko: '꽃을 실은 자전거는 하노이 사람들의 일상과 가장 가까이 맞닿아 있는 거리 풍경입니다.'
        },
        image: {
          src: '/assets/destinations/hanoi/old-quarter/story-beats/flower-vendors-origin.webp',
          fallback: '/assets/destinations/hanoi/old-quarter/story-beats/flower-vendors-origin.webp',
          focalPointDesktop: '36% 42%',
          focalPointMobile: '44% 44%',
          scrimDirection: 'right-editorial',
          scrimOpacity: 1.0,
          caption: {
            vi: 'Xe đạp bán hoa trên phố Hà Nội — Célestine M.C. Leroy',
            ko: '하노이 거리의 꽃 자전거 상인 — Célestine M.C. Leroy'
          },
          status: 'APPROVED',
          author: 'Célestine M.C. Leroy',
          license: 'CC BY-SA 2.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Daily_life_in_Vietnam_Street_Vendor_Flowers.jpg',
          modifications: 'Converted to 1600x1200 WebP (q85)',
          credits: 'Célestine M.C. Leroy · CC BY-SA 2.0'
        },
        motion: {
          type: 'slow-push',
          scaleStart: 1.01,
          scaleEnd: 1.05,
          panX: -6,
          panY: -4
        }
      },
      {
        id: 'signature',
        beatNumber: '02',
        layout: 'editorial-split',
        beatLabel: {
          vi: 'Hoa theo mùa',
          ko: '계절의 꽃'
        },
        title: {
          vi: 'Sắc hoa đổi thay theo từng tháng trong năm',
          ko: '달마다 빛깔을 바꾸는 자전거 짐칸'
        },
        body: {
          vi: 'Nhìn vào màu hoa xếp chặt trên yên xe, người đi đường có thể nhận ra sự chuyển mùa của Hà Nội: sắc trắng thanh khiết đầu hạ, hoa sen giữa hè, sắc cúc cuối thu và những cành hoa rực rỡ khi mùa lễ Tết đến gần.',
          ko: '자전거 뒤에 층층이 묶인 꽃다발의 빛깔만 보아도 하노이의 계절이 읽힙니다. 초여름의 하얀 꽃과 한여름의 연꽃, 늦가을의 국화, 그리고 연말연시의 화사한 꽃들까지 사계절이 거리 위에서 바뀝니다.'
        },
        editorialNote: {
          text: {
            vi: 'Mỗi chiếc xe đạp chở hoa như một lịch mùa tự nhiên di động giữa các tuyến phố rợp bóng cây.',
            ko: '나무 그늘 아래를 지나는 꽃 자전거는 하노이의 계절을 알리는 움직이는 달력과도 같습니다.'
          },
          label: {
            vi: 'Ghi chép biên tập · Super EZ Tour',
            ko: '에디토리얼 노트 · Super EZ Tour'
          }
        },
        image: {
          src: '/assets/destinations/hanoi/old-quarter/story-beats/flower-vendors-signature.webp',
          fallback: '/assets/destinations/hanoi/old-quarter/story-beats/flower-vendors-origin.webp',
          focalPointDesktop: '45% 48%',
          focalPointMobile: '50% 46%',
          scrimDirection: 'minimal-caption',
          scrimOpacity: 0.35,
          caption: {
            vi: 'Những bó hoa theo mùa xếp đầy sau yên xe — Richard Mortel',
            ko: '자전거 뒤에 가득 실린 계절 꽃다발 — Richard Mortel'
          },
          status: 'APPROVED',
          author: 'Richard Mortel',
          license: 'CC BY 2.0',
          licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Flower_vender,_Hanoi_(37608462635).jpg',
          modifications: 'Resized to 2560x1658 WebP (q85)',
          credits: 'Richard Mortel · CC BY 2.0'
        },
        motion: {
          type: 'lateral-pan',
          scaleStart: 1.02,
          scaleEnd: 1.06,
          panX: 8,
          panY: 0
        }
      },
      {
        id: 'experience',
        beatNumber: '03',
        layout: 'full-bleed',
        beatLabel: {
          vi: 'Trải nghiệm',
          ko: '거리 산책'
        },
        title: {
          vi: 'Dạo phố và cảm nhận nhịp sống đời thường',
          ko: '천천히 걸으며 마주하는 하노이의 일상'
        },
        body: {
          vi: 'Khi đi bộ chậm rãi qua các con phố quanh Hồ Gươm và Phố Cổ vào buổi sáng, bạn dễ dàng bắt gặp những chiếc xe hoa dừng bên góc phố, nghe tiếng trò chuyện mộc mạc và cảm nhận trọn vẹn nhịp sống tự nhiên của Hà Nội.',
          ko: '아침 시간 호안끼엠과 구시가지 주변을 천천히 걷다 보면 길모퉁이에 잠시 멈춰 선 꽃 자전거와 소박한 대화를 나누는 주민들을 자연스럽게 마주하며 하노이 본연의 일상을 느낄 수 있습니다.'
        },
        image: {
          src: '/assets/destinations/hanoi/old-quarter/story-beats/flower-vendors-experience.webp',
          fallback: '/assets/destinations/hanoi/old-quarter/story-beats/flower-vendors-origin.webp',
          focalPointDesktop: '34% 44%',
          focalPointMobile: '46% 44%',
          scrimDirection: 'right-editorial',
          scrimOpacity: 1.0,
          caption: {
            vi: 'Xe hoa di chuyển qua góc phố cổ Hà Nội — dronepicr',
            ko: '하노이 구시가지를 지나는 꽃 자전거 — dronepicr'
          },
          status: 'APPROVED',
          author: 'dronepicr',
          license: 'CC BY 2.0',
          licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hanoi_flowers_(39513905132).jpg',
          modifications: 'Resized to 2560x1706 WebP (q85)',
          credits: 'dronepicr · CC BY 2.0'
        },
        motion: {
          type: 'slow-push',
          scaleStart: 1.05,
          scaleEnd: 1.01,
          panX: -8,
          panY: -4
        }
      }
    ],

    modalHighlights: [
      'Quan sát nét văn hóa xe đạp chở hoa đặc trưng của các làng hoa ven đô Hà Nội',
      'Cảm nhận sự thay đổi sắc hoa theo từng mùa dọc các tuyến phố rợp bóng cây',
      'Trải nghiệm dạo bộ buổi sáng tự nhiên quanh Phố Cổ và khu vực Hồ Gươm'
    ],
    modalHighlightsKr: [
      '하노이 외곽 꽃마을에서 시작되는 전통 꽃 자전거 거리 문화 관찰',
      '계절마다 색을 달리하는 하노이 가로수길의 다채로운 꽃 풍경',
      '구시가지와 호안끼엠 주변에서 자연스럽게 즐기는 아침 도보 산책'
    ]
  }
];

export const TOTAL_CHAPTERS = OLD_QUARTER_CHAPTERS.length;
