/**
 * Super EZ Tour — Traveler Stories & Authentic Reviews Data
 * Concept: Premium UGC Video Showcase & Authentic Customer Reviews
 *
 * All demo entries are strictly and transparently flagged with:
 * - isDemo: true
 * - verificationStatus: "UNVERIFIED"
 * - moderationStatus: "APPROVED"
 * - status: "PUBLISHED"
 *
 * Zero fabricated metrics, zero fake verified badges.
 */

export const TRAVELER_STORIES = [
  {
    id: 'story-demo-001',
    type: 'video',
    destinationSlug: 'da-nang',
    destinationName: {
      vi: 'Đà Nẵng & Hội An',
      ko: '다낭 & 호이안',
    },
    title: {
      vi: 'Bình minh Mỹ Khê và phố cổ Hội An đêm rằm',
      ko: '미케비치의 아침 일출과 호이안의 밤',
    },
    caption: {
      vi: 'Khoảnh khắc đón ánh bình minh tĩnh lặng tại bãi biển Mỹ Khê và thả hoa đăng riêng tư trên sông Hoài.',
      ko: '미케비치에서 맞이한 고요한 일출과 투본강에서 즐긴 프라이빗 소원배의 낭만적인 밤.',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=720&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    mediaType: 'video/mp4',
    duration: '0:22',
    aspectRatio: '9:16',
    author: {
      displayName: 'Minh Trang',
      handle: '@trang.stories',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      travelType: {
        vi: 'Hành trình cặp đôi',
        ko: '커플 프라이빗 여행',
      },
    },
    rating: 5,
    travelDate: '2026. 10',
    publishedAt: '2026-10-24',
    isDemo: true,
    verificationStatus: 'UNVERIFIED',
    moderationStatus: 'APPROVED',
    status: 'PUBLISHED',
  },
  {
    id: 'story-demo-002',
    type: 'video',
    destinationSlug: 'ha-long',
    destinationName: {
      vi: 'Vịnh Hạ Long',
      ko: '하롱베이',
    },
    title: {
      vi: 'Hoàng hôn trên du thuyền vịnh di sản',
      ko: '헤리티지 크루즈에서 마주한 하롱베이의 석양',
    },
    caption: {
      vi: 'Tia nắng cuối ngày nhuộm vàng những vách đá vôi kỳ vĩ giữa lòng vịnh ngọc bích.',
      ko: '에메랄드빛 바다와 기암괴석 사이로 쏟아지는 황금빛 노을을 프라이빗 발코니에서 감상했습니다.',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=720&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    mediaType: 'video/mp4',
    duration: '0:18',
    aspectRatio: '9:16',
    author: {
      displayName: 'Jinwoo & Sujin',
      handle: '@jinwoo_kr',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
      travelType: {
        vi: 'Kỳ nghỉ thư giãn',
        ko: '힐링 프라이빗 크루즈',
      },
    },
    rating: 5,
    travelDate: '2026. 10',
    publishedAt: '2026-10-18',
    isDemo: true,
    verificationStatus: 'UNVERIFIED',
    moderationStatus: 'APPROVED',
    status: 'PUBLISHED',
  },
  {
    id: 'story-demo-003',
    type: 'video',
    destinationSlug: 'sa-pa',
    destinationName: {
      vi: 'Sa Pa & Mường Hoa',
      ko: '사파 & 무엉호아',
    },
    title: {
      vi: 'Sương sớm và ruộng bậc thang mùa lúa chín',
      ko: '황금빛 계단식 논과 안개 속 사파의 아침',
    },
    caption: {
      vi: 'Trekking nhẹ nhàng qua thung lũng Mường Hoa, hít hà bầu không khí trong lành của bản làng Tây Bắc.',
      ko: '전담 가이드와 함께 여유롭게 걸은 무엉호아 계곡 트레킹과 신선한 고산지대의 공기.',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=720&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    mediaType: 'video/mp4',
    duration: '0:25',
    aspectRatio: '9:16',
    author: {
      displayName: 'Alexandre & Chloe',
      handle: '@chloe_travels',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
      travelType: {
        vi: 'Khám phá thiên nhiên',
        ko: '자연 & 트레킹 투어',
      },
    },
    rating: 5,
    travelDate: '2026. 09',
    publishedAt: '2026-09-30',
    isDemo: true,
    verificationStatus: 'UNVERIFIED',
    moderationStatus: 'APPROVED',
    status: 'PUBLISHED',
  },
  {
    id: 'story-demo-004',
    type: 'video',
    destinationSlug: 'phu-quoc',
    destinationName: {
      vi: 'Phú Quốc',
      ko: '푸꾸옥',
    },
    title: {
      vi: 'Cano riêng lặn ngắm san hô đảo An Thới',
      ko: '안터이 군도 단독 스피드보트 & 산호초 스노클링',
    },
    caption: {
      vi: 'Làn nước trong vắt màu lam ngọc tại Hòn Mây Rút, hoàn toàn riêng tư không chen chúc.',
      ko: '다른 일행 없이 우리 가족만 즐긴 프라이빗 스피드보트 호핑과 에메랄드빛 바다.',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=720&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    mediaType: 'video/mp4',
    duration: '0:20',
    aspectRatio: '9:16',
    author: {
      displayName: 'Hyeon-woo Family',
      handle: '@hyeonwoo_family',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
      travelType: {
        vi: 'Gia đình nghỉ dưỡng',
        ko: '가족 오션 휴양',
      },
    },
    rating: 5,
    travelDate: '2026. 10',
    publishedAt: '2026-10-05',
    isDemo: true,
    verificationStatus: 'UNVERIFIED',
    moderationStatus: 'APPROVED',
    status: 'PUBLISHED',
  },
  {
    id: 'story-demo-005',
    type: 'video',
    destinationSlug: 'ha-noi',
    destinationName: {
      vi: 'Hà Nội',
      ko: '하노이',
    },
    title: {
      vi: 'Một buổi sáng phố cổ và cà phê trứng nồng nàn',
      ko: '하노이 올드쿼터의 아침과 따뜻한 에그커피',
    },
    caption: {
      vi: 'Dạo quanh hồ Gươm mờ sương và thưởng thức ly cà phê trứng chuẩn vị trong căn nhà cổ thời Pháp.',
      ko: '호안끼엠 호수의 이른 아침 풍경과 가이드가 안내해 준 숨은 전통 에그커피 명소.',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1689080492397-820b860a8606?auto=format&fit=crop&w=720&q=85',
    videoUrl: null,
    mediaType: 'image/jpeg',
    duration: '0:15',
    aspectRatio: '9:16',
    author: {
      displayName: 'Sunghoon K.',
      handle: '@sunghoon_hanoi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
      travelType: {
        vi: 'Văn hóa & Ẩm thực',
        ko: '문화 & 미식 투어',
      },
    },
    rating: 5,
    travelDate: '2026. 11',
    publishedAt: '2026-11-02',
    isDemo: true,
    verificationStatus: 'UNVERIFIED',
    moderationStatus: 'APPROVED',
    status: 'PUBLISHED',
  },
  {
    id: 'story-demo-006',
    type: 'video',
    destinationSlug: 'ninh-binh',
    destinationName: {
      vi: 'Ninh Bình & Tràng An',
      ko: '닌빈 & 짱안',
    },
    title: {
      vi: 'Thuyền nan len lỏi qua hang động Tràng An',
      ko: '짱안 동굴을 따라 흐르는 고요한 전통 나룻배 여정',
    },
    caption: {
      vi: 'Khung cảnh thiên nhiên ngoạn mục như tranh thủy mặc giữa non nước Tràng An hữu tình.',
      ko: '한 폭의 동양화 같은 절경 속에서 즐긴 조용하고 여유로운 단독 짱안 보트 투어.',
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=720&q=85',
    videoUrl: null,
    mediaType: 'image/jpeg',
    duration: '0:19',
    aspectRatio: '9:16',
    author: {
      displayName: 'Yuna & Friends',
      handle: '@yuna_journey',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      travelType: {
        vi: 'Khám phá di sản',
        ko: '유네스코 헤리티지 투어',
      },
    },
    rating: 5,
    travelDate: '2026. 10',
    publishedAt: '2026-10-14',
    isDemo: true,
    verificationStatus: 'UNVERIFIED',
    moderationStatus: 'APPROVED',
    status: 'PUBLISHED',
  },
];

export const TRAVELER_REVIEWS = [
  {
    id: 'rev-demo-001',
    destinationSlug: 'da-nang',
    destinationName: {
      vi: 'Đà Nẵng & Hội An',
      ko: '다낭 & 호이안',
    },
    author: {
      displayName: 'Gia đình anh Tuấn Minh',
      nickname: 'T. Minh (Hà Nội)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80',
      travelParty: {
        vi: 'Gia đình 3 thế hệ (6 người)',
        ko: '3대 가족 여행 (6인)',
      },
    },
    travelDate: '2026. 10',
    packName: {
      vi: 'Hành trình di sản & nghỉ dưỡng biển',
      ko: '헤리티지 & 오션 프라이빗 여정',
    },
    title: {
      vi: 'Kỳ nghỉ nhẹ nhàng, không có áp lực vội vã',
      ko: '부모님과 아이 모두 만족한 여유로운 일정',
    },
    content: {
      vi: 'Đi cùng người lớn tuổi và trẻ nhỏ mới thấy giá trị của xe riêng và lịch trình mở. Tài xế và hướng dẫn viên luôn chờ sẵn ở sảnh khách sạn, nhịp độ di chuyển hoàn toàn do gia đình chủ động.',
      ko: '연로하신 부모님과 어린 아이가 함께해 걱정이 많았으나, 전용 리무진과 여유로운 맞춤 일정 덕분에 서두르지 않고 온전히 힐링했습니다. 가족 모두가 만족한 여행이었습니다.',
    },
    fullContent: {
      vi: 'Đi cùng bố mẹ ngoài 70 và bé 5 tuổi mới thấy giá trị của việc đi tour riêng biệt 100%. Không có bất kỳ cảnh thúc giục hay ghé các điểm mua sắm không mong muốn. Lịch trình tại Hội An và Bà Nà được điều chỉnh linh hoạt theo thời tiết và sức khỏe của cả nhà. Xe Limousine êm ái, nước mát và khăn lạnh luôn sẵn sàng. Một trải nghiệm đáng giá từng chi tiết.',
      ko: '70대 부모님과 5세 아이를 동반한 여행이라 단체 패키지의 빡빡한 일정은 피하고 싶어 선택했습니다. 쇼핑 강요 없이 우리 가족의 컨디션에 맞춰 유연하게 운영되었고, 바나힐과 호이안 일정 모두 편안하게 즐겼습니다. 전용 차량의 청결도와 가이드의 세심한 배려에 깊이 감사드립니다.',
    },
    tripPhotoUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=85',
    rating: 5,
    isDemo: true,
    verificationStatus: 'UNVERIFIED',
    status: 'PUBLISHED',
  },
  {
    id: 'rev-demo-002',
    destinationSlug: 'ha-long',
    destinationName: {
      vi: 'Hạ Long',
      ko: '하롱베이',
    },
    author: {
      displayName: 'Kang Ji-won & Bạn bè',
      nickname: 'J.W. Kang (Seoul)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=140&q=80',
      travelParty: {
        vi: 'Nhóm bạn thân (4 người)',
        ko: '친구 동반 여행 (4인)',
      },
    },
    travelDate: '2026. 10',
    packName: {
      vi: 'Du thuyền riêng & ngắm hoàng hôn vịnh',
      ko: '프라이빗 크루즈 & 선셋 세일링',
    },
    title: {
      vi: 'Dịch vụ chu đáo, trải nghiệm vịnh ngọc tuyệt mỹ',
      ko: '기대 이상의 크루즈 서비스와 프라이빗한 휴식',
    },
    content: {
      vi: 'Du thuyền đưa chúng tôi đến các góc vịnh tĩnh lặng, tách biệt với các tàu ghép đông đúc. Bữa tối ẩm thực hải sản tươi ngon và quản gia riêng chăm sóc chu đáo.',
      ko: '단체 관광선이 몰리지 않는 한적한 코스로 운항되어 하롱베이의 진정한 절경을 감상할 수 있었습니다. 선상 다이닝과 전담 버틀러의 서비스도 훌륭했습니다.',
    },
    fullContent: {
      vi: 'Chúng tôi muốn một chuyến đi thư giãn trọn vẹn không ồn ào. Hành trình Hạ Long được thiết kế riêng giúp nhóm được tận hưởng trọn vẹn cảnh bình minh và hoàng hôn trên vịnh mà không bị làm phiền. Cano đưa đón riêng từ cảng Tuần Châu rất nhanh chóng và chuyên nghiệp.',
      ko: '조용하고 프라이빗한 힐링을 원했던 우리 일행에게 완벽한 선택이었습니다. 붐비는 코스를 피해 한적하게 카약과 일몰을 즐길 수 있었고, 객실 컨디션과 선상 식사도 매우 만족스러웠습니다.',
    },
    tripPhotoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
    rating: 5,
    isDemo: true,
    verificationStatus: 'UNVERIFIED',
    status: 'PUBLISHED',
  },
  {
    id: 'rev-demo-003',
    destinationSlug: 'sa-pa',
    destinationName: {
      vi: 'Sa Pa',
      ko: '사파',
    },
    author: {
      displayName: 'Ngọc Lan & Minh Trí',
      nickname: 'N. Lan (TP. HCM)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=140&q=80',
      travelParty: {
        vi: 'Kỳ nghỉ trăng mật (2 người)',
        ko: '허니문 프라이빗 여행 (2인)',
      },
    },
    travelDate: '2026. 09',
    packName: {
      vi: 'Nghỉ dưỡng mây ngàn & Fansipan cáp treo VIP',
      ko: '사파 럭셔리 에코 리조트 & 판시판 투어',
    },
    title: {
      vi: 'Kỷ niệm khó quên giữa biển mây Fansipan',
      ko: '구름 위 판시판과 한적한 리조트에서의 특별한 시간',
    },
    content: {
      vi: 'Resort view thung lũng Mường Hoa tuyệt đẹp. Hướng dẫn viên địa phương rất hiểu biết, dẫn chúng tôi đi những cung đường mộc mạc và chụp ảnh rất có tâm.',
      ko: '무엉호아 계곡이 내려다보이는 리조트 뷰가 장관이었습니다. 현지 지리에 밝은 가이드가 복잡하지 않은 루트로 안내해 주어 멋진 사진을 많이 남겼습니다.',
    },
    fullContent: {
      vi: 'Chuyến đi trăng mật tại Sa Pa đã để lại ấn tượng sâu sắc. Dịch vụ xe limousine riêng đón từ Hà Nội lên thẳng Sa Pa rất êm ái. Hướng dẫn viên sắp xếp giờ lên đỉnh Fansipan vào lúc vắng khách nhất nên nhóm được ngắm trọn vẹn biển mây bồng bềnh.',
      ko: '하노이 공항에서 사파 리조트까지 이어진 전용 리무진 픽업부터 모든 일정이 순조로웠습니다. 가이드의 배려로 혼잡 시간을 피해 판시판 정상에 올랐고, 구름바다의 웅장함을 여유롭게 만끽했습니다.',
    },
    tripPhotoUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
    rating: 5,
    isDemo: true,
    verificationStatus: 'UNVERIFIED',
    status: 'PUBLISHED',
  },
];

// Backward-compatible alias for any legacy modules referencing REVIEWS
export const REVIEWS = TRAVELER_REVIEWS;
