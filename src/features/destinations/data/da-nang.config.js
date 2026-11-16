/**
 * Super EZ Tour - Destination Configuration: ĐÀ NẴNG
 * Premium Private Customized Travel Landing Engine
 */

export const DA_NANG_CONFIG = {
  id: 'da-nang',
  slug: 'da-nang',
  name: 'Đà Nẵng',
  nameEn: 'Da Nang',
  country: 'Việt Nam',
  countryCode: 'VN',
  region: 'Miền Trung',
  tagline: 'Beyond the Ordinary.',
  subTagline: 'Khám phá Đà Nẵng theo cách của riêng bạn.',
  description: 'Thành phố của những cây cầu biểu tượng, bờ biển Mỹ Khê quyến rũ hàng đầu hành tinh, bán đảo Sơn Trà nguyên sơ và cửa ngõ kết nối di sản thế giới Phố cổ Hội An.',

  // Hero Media
  hero: {
    badge: 'SUPER EZ TOUR — VIETNAM',
    title: 'ĐÀ NẴNG',
    subtitle: 'Beyond the Ordinary.',
    headline: 'Khám phá Đà Nẵng theo cách của riêng bạn.',
    description: 'Tour riêng 100% · Không ghép đoàn · Tự do tùy biến lịch trình cùng đội ngũ bản địa am hiểu sâu sắc.',
    posterImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2000&q=85',
    overlayOpacity: 0.45,
    quickStats: [
      { label: 'Bờ biển', value: '30+ km' },
      { label: 'Di sản lân cận', value: '3 Di sản' },
      { label: 'Nhiệt độ TB', value: '26°C - 29°C' },
      { label: 'Hài lòng', value: '99.8%' }
    ],
    // Cinematic Journey Stages inside Airplane Window Portal
    introJourney: {
      stage1: 'https://images.unsplash.com/photo-1674296067534-0f9769040781?auto=format&fit=crop&w=2000&q=85', // Approach Da Nang: Drone Aerial Coastline & Ocean
      stage2: 'https://images.unsplash.com/photo-1693282815001-0471e68d3bc0?auto=format&fit=crop&w=2000&q=85', // Into the Mountains: Ba Na Hills Rainforest & Mist
      stage3: 'https://images.unsplash.com/photo-1603852452378-a4e8d84324a2?auto=format&fit=crop&w=2000&q=85', // Discover Golden Bridge: Panoramic Architecture
      stage4: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2000&q=85'  // Welcome to Da Nang: Hero Section Backdrop
    },
    scrollPrompt: {
      title: 'Đà Nẵng đang chờ bạn.',
      action: 'Cuộn để bắt đầu hành trình'
    }
  },

  // Section 02 - Discover Da Nang
  intro: {
    kicker: 'DISCOVER DA NANG',
    title: 'Một thành phố.\nNgàn cách để khám phá.',
    lead: 'Nơi đại dương ngọc bích chạm vào núi non kỳ vĩ, nơi nhịp sống hiện đại giao thoa cùng chiều sâu văn hóa di sản nghìn năm.',
    paragraphs: [
      'Đà Nẵng không đơn thuần là một điểm đến trên bản đồ. Đó là cảm giác đón ánh bình minh rạng rỡ trên bờ cát mịn Mỹ Khê, ngắm hoàng hôn buông đỏ rực nơi đỉnh Sơn Trà với đàn voọc chà vá chân nâu quý hiếm, và thả hồn cùng hàng ngàn chiếc đèn hoa đăng lung linh trên dòng sông Hoài phố cổ.',
      'Với Super EZ Tour, bạn không bị bó buộc trong những đoàn khách 40 người hay lịch trình rập khuôn. Mỗi bước chân là một trải nghiệm độc bản do chính bạn làm chủ.'
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Cầu Vàng Bà Nà Hills - Biểu tượng kiến trúc thế giới vươn giữa mây trời',
        aspect: 'portrait'
      },
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        caption: 'Bờ biển Mỹ Khê - Top bãi biển quyến rũ nhất hành tinh',
        aspect: 'landscape'
      },
      {
        url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
        caption: 'Phố cổ Hội An - Di sản văn hóa lung linh sắc đèn lồng',
        aspect: 'square'
      }
    ],
    features: [
      { title: 'Biển & Núi hội tụ', desc: 'Sự hòa quyện tuyệt mỹ giữa bán đảo Sơn Trà, Ngũ Hành Sơn và đại dương.' },
      { title: 'Ẩm thực phong vị miền Trung', desc: 'Từ Mì Quảng dân dã đến yến tiệc hải sản tươi sống cao cấp.' },
      { title: 'Cửa ngõ di sản thế giới', desc: 'Dễ dàng kết nối Phố cổ Hội An, Cố đô Huế và Thánh địa Mỹ Sơn.' }
    ]
  },

  // Section 03 - 6 Product Ecosystem
  ecosystem: {
    kicker: 'CORE ECOSYSTEM',
    title: 'Everything You Need.\nNothing You Don’t.',
    subtitle: 'Một hành trình. Trọn vẹn 6 nhóm trải nghiệm được cá nhân hóa tuyệt đối.',
    services: [
      {
        id: 'accommodation',
        number: '01',
        title: 'Lưu Trú Cao Cấp',
        titleEn: 'Premium Accommodation',
        desc: 'Tuyển chọn Resort 5 sao ven biển, Villa riêng tư có hồ bơi và khách sạn boutique đẳng cấp.',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
        targetId: 'accommodation'
      },
      {
        id: 'guide',
        number: '02',
        title: 'Hướng Dẫn Viên Bản Địa',
        titleEn: 'Local Guide',
        desc: 'Người đồng hành am hiểu sâu sắc văn hóa, lịch thiệp, phục vụ tận tâm và linh hoạt theo nhịp độ của bạn.',
        image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=900&q=80',
        targetId: 'guide'
      },
      {
        id: 'flights',
        number: '03',
        title: 'Vé Máy Bay & Giờ Bay Đẹp',
        titleEn: 'Flight Booking',
        desc: 'Tư vấn chuyến bay tối ưu giờ khởi hành và kết hợp liền mạch xe riêng đón tiễn sân bay DAD.',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
        targetId: 'flights'
      },
      {
        id: 'transportation',
        number: '04',
        title: 'Xe Dịch Vụ Riêng Tư',
        titleEn: 'Private Transportation',
        desc: 'Đội xe đời mới từ 7 chỗ, 16 chỗ đến Limousine VIP đón trả tận nơi, 100% không ghép khách.',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
        targetId: 'transportation'
      },
      {
        id: 'attractions',
        number: '05',
        title: 'Tham Quan & Trải Nghiệm',
        titleEn: 'Attractions & Experiences',
        desc: 'Tọa độ độc bản: Cầu Vàng, Bà Nà Hills, Sơn Trà, Đèo Hải Vân, Phố cổ Hội An với vé ưu tiên không chờ đợi.',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=80',
        targetId: 'attractions'
      },
      {
        id: 'culinary',
        number: '06',
        title: 'Trải Nghiệm Ẩm Thực',
        titleEn: 'Culinary Experiences',
        desc: 'Thưởng thức ẩm thực miền Trung đích thực, hải sản bắt tại thuyền và nhà hàng ẩm thực cao cấp ven biển.',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
        targetId: 'culinary'
      }
    ]
  },

  // Section 04 - Accommodation
  accommodation: {
    kicker: 'PREMIUM ACCOMMODATION',
    title: 'Stay Somewhere Extraordinary.',
    subtitle: 'Nghỉ dưỡng theo phong cách của bạn.',
    description: 'Chúng tôi liên kết chặt chẽ với những khu nghỉ dưỡng và khách sạn tiêu chuẩn quốc tế hàng đầu tại Đà Nẵng, đảm bảo không gian riêng tư, tầm nhìn đại dương và dịch vụ hoàn hảo.',
    categories: [
      { id: 'resort', label: 'Luxury Resort' },
      { id: 'villa', label: 'Private Villa' },
      { id: '5star', label: 'Khách sạn 5 sao' },
      { id: '4star', label: 'Khách sạn 4 sao' }
    ],
    items: [
      {
        id: 'intercon',
        name: 'InterContinental Danang Sun Peninsula Resort',
        category: 'resort',
        stars: 5,
        location: 'Bãi Bắc, Bán đảo Sơn Trà, Đà Nẵng',
        badge: 'Huyền thoại kiến trúc Bill Bensley',
        highlights: ['Bãi biển riêng tư biệt lập', 'Nhà hàng La Maison 1888 sao Michelin', 'Cáp treo Nam Tram độc đáo', 'Hồ bơi vô cực ngắm vịnh'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
        idealFor: 'Kỳ nghỉ thượng lưu, trăng mật lãng mạn'
      },
      {
        id: 'hyatt',
        name: 'Hyatt Regency Danang Resort & Spa',
        category: 'resort',
        stars: 5,
        location: 'Đường Trường Sa, Ngũ Hành Sơn, Đà Nẵng',
        badge: 'Khu nghỉ dưỡng biển chuẩn quốc tế',
        highlights: ['5 hồ bơi kết nối bãi biển Non Nước', 'Camp Hyatt cho trẻ em', 'VIE Spa trị liệu tự nhiên', 'Biệt thự 3 phòng ngủ hướng biển'],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
        idealFor: 'Gia đình đa thế hệ, nhóm bạn cao cấp'
      },
      {
        id: 'premier-village',
        name: 'Premier Village Danang Resort - Managed by Accor',
        category: 'villa',
        stars: 5,
        location: 'Đường Võ Nguyên Giáp, Mỹ An, Ngũ Hành Sơn',
        badge: '100% Villa Hồ Bơi Riêng',
        highlights: ['Biệt thự từ 3-4 phòng ngủ sang trọng', 'Hồ bơi riêng từng căn', 'Bếp hiện đại & đầu bếp riêng phục vụ BBQ', 'Sát bờ biển Mỹ Khê'],
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80',
        idealFor: 'Gia đình tìm kiếm sự riêng tư tuyệt đối'
      },
      {
        id: 'naman-retreat',
        name: 'Naman Retreat & Private Pool Villas',
        category: 'villa',
        stars: 5,
        location: 'Đường Trường Sa, Hòa Hải, Ngũ Hành Sơn',
        badge: 'Thiết kế tre mộc tự nhiên & Wellness',
        highlights: ['Villa hồ bơi riêng tư với tường đá kín đáo', 'Gói trị liệu Spa miễn phí mỗi ngày', 'Nhà hàng Hay Hay kiến trúc tre độc đáo', 'Bãi biển nguyên sơ'],
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
        idealFor: 'Kỳ nghỉ chữa lành & tĩnh dưỡng'
      },
      {
        id: 'novotel-han-river',
        name: 'Novotel Danang Premier Han River',
        category: '5star',
        stars: 5,
        location: '36 Bạch Đằng, Hải Châu, Đà Nẵng',
        badge: 'Trái tim thành phố bên sông Hàn',
        highlights: ['Tầm nhìn toàn cảnh sông Hàn & các cây cầu', 'Hồ bơi ngoài trời trên cao', 'Bar tầng thượng Sky36 sôi động', 'Vị trí đắc địa trung tâm'],
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
        idealFor: 'Doanh nhân, du khách thích nhịp sống thành phố'
      },
      {
        id: 'tms-hotel',
        name: 'TMS Hotel Danang Beach',
        category: '4star',
        stars: 4,
        location: '292 Võ Nguyên Giáp, Mỹ An, Ngũ Hành Sơn',
        badge: 'Trực diện bãi biển Mỹ Khê',
        highlights: ['Hồ bơi vô cực đáy kính tầng 25', 'Phòng hướng biển toàn cảnh ban công riêng', 'Vị trí sầm uất ngập tràn ẩm thực', 'Dịch vụ chuyên nghiệp'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
        idealFor: 'Du khách năng động, chi phí hợp lý'
      }
    ]
  },

  // Section 05 - Local Guide
  localGuide: {
    kicker: 'LOCAL EXPERTISE',
    title: 'Explore Like a Local.',
    subtitle: 'Không chỉ tham quan, mà thực sự hiểu điểm đến.',
    lead: 'Hướng dẫn viên của Super EZ Tour tại Đà Nẵng là những người con miền Trung hiếu khách, tốt nghiệp chuyên ngành lữ hành, được đào tạo bài bản về phong cách phục vụ cao cấp.',
    pillars: [
      {
        icon: 'Compass',
        title: 'Hướng Dẫn Viên Riêng 100%',
        desc: 'Đồng hành duy nhất cùng gia đình bạn, không phải chia sẻ sự quan tâm với bất kỳ du khách lạ nào.'
      },
      {
        icon: 'BookOpen',
        title: 'Thấu Hiểu Lịch Sử & Văn Hóa',
        desc: 'Kể những câu chuyện đằng sau từng khối đá Ngũ Hành Sơn, phong vị sông Hoài và nét độc đáo của xứ Quảng.'
      },
      {
        icon: 'Clock',
        title: 'Làm Chủ Thời Gian & Tốc Độ',
        desc: 'Tự do dừng lại ngắm cảnh bao lâu tùy thích, xuất phát muộn hơn nếu cần nghỉ ngơi, hoàn toàn theo ý bạn.'
      },
      {
        icon: 'Languages',
        title: 'Hỗ Trợ Đa Ngôn Ngữ',
        desc: 'Đội ngũ HDV thông thạo Tiếng Việt, Tiếng Anh, Tiếng Hàn, Tiếng Trung và Tiếng Nhật theo yêu cầu.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=80',
    quote: '“Một chuyến đi hoàn hảo không đến từ việc bạn đi qua bao nhiêu điểm, mà ở việc bạn đã cảm nhận nơi đó sâu sắc đến nhường nào.”'
  },

  // Section 06 - Flight Booking
  flights: {
    kicker: 'SEAMLESS TRANSIT',
    title: 'Your Journey Begins Here.',
    subtitle: 'Hành trình bắt đầu từ bầu trời.',
    lead: 'Chúng tôi hỗ trợ tư vấn chọn khung giờ bay đẹp nhất, đặt chỗ và kết nối liền mạch xe riêng đưa đón ngay khi bạn hạ cánh tại Cảng Hàng Không Quốc Tế Đà Nẵng (DAD).',
    domesticRoutes: [
      { from: 'Hà Nội (HAN)', to: 'Đà Nẵng (DAD)', time: '1h 20m', frequency: '30+ chuyến/ngày' },
      { from: 'TP. Hồ Chí Minh (SGN)', to: 'Đà Nẵng (DAD)', time: '1h 25m', frequency: '35+ chuyến/ngày' },
      { from: 'Hải Phòng (HPH)', to: 'Đà Nẵng (DAD)', time: '1h 15m', frequency: '6+ chuyến/ngày' }
    ],
    intlRoutes: [
      { from: 'Seoul (ICN)', to: 'Đà Nẵng (DAD)', time: '4h 45m', direct: true },
      { from: 'Singapore (SIN)', to: 'Đà Nẵng (DAD)', time: '2h 50m', direct: true },
      { from: 'Taipei (TPE)', to: 'Đà Nẵng (DAD)', time: '2h 55m', direct: true },
      { from: 'Bangkok (BKK)', to: 'Đà Nẵng (DAD)', time: '1h 45m', direct: true }
    ],
    perks: [
      'Tư vấn chọn khung giờ cất cánh đẹp, tránh giờ cao điểm mệt mỏi.',
      'Xe riêng biển số đẹp, tài xế cầm bảng tên đón tại sảnh đến DAD.',
      'Hỗ trợ thủ tục check-in ưu tiên đối với khách đoàn doanh nghiệp.'
    ]
  },

  // Section 07 - Private Transportation
  transportation: {
    kicker: 'AUTOMOTIVE LUXURY SHOWCASE',
    title: 'Every Mile. Your Style.',
    subtitle: 'Di chuyển riêng tư, thoải mái trên mọi hành trình.',
    description: '100% phương tiện đời mới từ 2022 trở lên, nội thất bọc da cao cấp, điều hòa hai vùng độc lập, khăn lạnh, nước suối và wifi miễn phí suốt hành trình.',
    vehicles: [
      {
        id: 'suv-7',
        name: 'Xe 7 Chỗ Cao Cấp (SUV / MPV)',
        modelExample: 'Toyota Fortuner / Kia Carnival / Everest',
        seats: '4 - 6 khách (tối đa 6 khách)',
        luggage: '3 - 5 vali tiêu chuẩn',
        features: ['Điều hòa độc lập 2 vùng', 'Ghế da êm ái ngả lưng sâu', 'Nước suối Aquafina & khăn lạnh', 'Tài xế chuyên tuyến điềm đạm'],
        idealFor: 'Gia đình, nhóm bạn 4 - 6 người cần không gian riêng tư rộng rãi',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
        angles: [
          'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
        ]
      },
      {
        id: 'van-16',
        name: 'Xe 16 Chỗ Hiện Đại',
        modelExample: 'Ford Transit Premium / Hyundai Solati',
        seats: '8 - 12 khách lý tưởng',
        luggage: '8 - 10 vali tiêu chuẩn',
        features: ['Khoang hành khách trần cao thoáng đãng', 'Ghế bọc nỉ da êm ái, cổng sạc USB từng hàng ghế', 'Hệ thống treo êm ái đường dài', 'Tài xế bản địa cẩn trọng'],
        idealFor: 'Đại gia đình 2-3 thế hệ, nhóm đồng nghiệp',
        image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
        angles: [
          'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
        ]
      },
      {
        id: 'limousine-vip',
        name: 'Limousine Hạng Thương Gia (Dcar VIP)',
        modelExample: 'Dcar President / Hyundai Solati Limousine VIP',
        seats: '7 - 9 khách VIP',
        luggage: '6 - 7 vali cỡ lớn',
        features: ['Ghế cơ trưởng massage đa điểm cao cấp', 'Màn hình TV giải trí, đèn trần bầu trời sao', 'Tủ lạnh mini, sạc không dây', 'Rèm che nắng riêng tư tuyệt đối'],
        idealFor: 'Đón tiếp đối tác VIP, khách du lịch sang trọng',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
        angles: [
          'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
        ]
      },
      {
        id: 'coach-35',
        name: 'Xe Du Lịch 35 Chỗ Universe',
        modelExample: 'Thaco Universe / Samco Felix',
        seats: '20 - 28 khách',
        luggage: 'Hầm hành lý rộng rãi',
        features: ['Hệ thống giảm xóc bầu hơi êm ái', 'Mic và dàn âm thanh phục vụ thuyết minh', 'Ghế bọc nhung cao cấp ngả 135 độ', 'Rèm chống tia cực tím'],
        idealFor: 'Đoàn công ty, hội thảo MICE quy mô vừa',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 'coach-45',
        name: 'Xe Du Lịch 45 Chỗ Universe Hi-Class',
        modelExample: 'Hyundai Universe Express Noble',
        seats: '35 - 42 khách',
        luggage: 'Khoang hành lý siêu lớn',
        features: ['Dòng xe du lịch cao cấp nhất phân khúc', 'Điều hòa làm mát sâu đều khắp khoang', 'Bảo hiểm hành khách mức trách nhiệm cao nhất', 'Tài xế kỳ cựu trên 10 năm thâm niên'],
        idealFor: 'Đoàn doanh nghiệp lớn, trường học quốc tế',
        image: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=1000&q=80'
      }
    ]
  },

  // Section 08 - Attractions & Experiences
  attractions: {
    kicker: 'THE DA NANG DISCOVERY ATLAS',
    title: 'Những Tọa Độ Không Thể Bỏ Lỡ',
    subtitle: 'Mô hình khám phá vệ tinh 3D và địa hình thực tế của Đà Nẵng.',
    lead: 'Chọn những tọa độ bạn muốn đến, chúng tôi sẽ sắp xếp trình tự hợp lý nhất để bạn tận hưởng trọn vẹn mà không hề mỏi mệt.',
    items: [
      {
        id: 'ba-na-hills',
        name: 'Bà Nà Hills & Cầu Vàng',
        category: 'Biểu tượng thế giới',
        duration: '1 Ngày (Trọn vẹn)',
        slogan: 'Dải lụa vàng giữa đôi bàn tay đá nâng đỡ mây trời.',
        lng: 107.9961,
        lat: 15.9988,
        elevation: '1,487 m',
        bearing: -35,
        pitch: 70,
        zoom: 14.6,
        description: 'Dạo bước trên Cầu Vàng được nâng đỡ bởi bàn tay đá khổng lồ giữa mây trời, cáp treo đạt 4 kỷ lục thế giới và Làng Pháp cổ kính.',
        image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=85',
        tags: ['Cầu Vàng', 'Cáp treo kỷ lục', 'Làng Pháp', 'Khí hậu 4 mùa']
      },
      {
        id: 'my-khe-beach',
        name: 'Bãi Biển Mỹ Khê',
        category: 'Thiên đường biển xanh',
        duration: 'Buổi sáng hoặc chiều tà',
        slogan: 'Bãi cát trắng mịn thoai thoải bên đại dương ngọc bích.',
        lng: 108.2467,
        lat: 16.0592,
        elevation: '3 m',
        bearing: -75,
        pitch: 65,
        zoom: 15.2,
        description: 'Bờ cát trắng thoai thoải, làn nước trong xanh ấm áp quanh năm, nơi lý tưởng cho các môn thể thao nước hoặc dạo bộ thư thái.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
        tags: ['Tắm biển', 'Bình minh Mỹ Khê', 'SUP chèo', 'Hải sản ven bờ']
      },
      {
        id: 'son-tra-peninsula',
        name: 'Bán Đảo Sơn Trà & Chùa Linh Ứng',
        category: 'Thiên nhiên & Tâm linh',
        duration: 'Nửa ngày',
        slogan: 'Lá phổi xanh nguyên sinh che chở thành phố biển.',
        lng: 108.2750,
        lat: 16.1008,
        elevation: '693 m',
        bearing: 40,
        pitch: 68,
        zoom: 14.5,
        description: 'Lá phổi xanh của Đà Nẵng với tượng Phật Bà Quan Âm cao 67m hướng biển, đỉnh Bàn Cờ hùng vĩ và nơi cư trú của loài voọc quý hiếm.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
        tags: ['Chùa Linh Ứng', 'Tượng Phật Bà 67m', 'Đỉnh Bàn Cờ', 'Voọc chà vá chân nâu']
      },
      {
        id: 'marble-mountains',
        name: 'Danh Thắng Ngũ Hành Sơn',
        category: 'Di tích & Danh thắng',
        duration: 'Nửa ngày',
        slogan: 'Năm ngọn non tiên huyền bí giữa đồng bằng biển.',
        lng: 108.2633,
        lat: 16.0044,
        elevation: '106 m',
        bearing: -20,
        pitch: 68,
        zoom: 15.0,
        description: 'Quần thể 5 ngọn núi đá vôi kỳ vĩ mang tên Kim, Mộc, Thủy, Hỏa, Thổ với hệ thống hang động Huyền Không huyền ảo và làng đá mỹ nghệ Non Nước.',
        image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=85',
        tags: ['Động Huyền Không', 'Chùa Tam Thai', 'Thang máy ngoài trời', 'Làng đá Non Nước']
      },
      {
        id: 'dragon-bridge',
        name: 'Cầu Rồng Sông Hàn',
        category: 'Trái tim đô thị',
        duration: 'Buổi tối',
        slogan: 'Rồng thép vươn mình ra biển lớn sông Hàn.',
        lng: 108.2272,
        lat: 16.0611,
        elevation: '15 m',
        bearing: 25,
        pitch: 65,
        zoom: 15.5,
        description: 'Biểu tượng của sức sống hiện đại, nơi Cầu Rồng phun lửa và nước rực rỡ vào cuối tuần, soi bóng lung linh dòng sông Hàn thơ mộng.',
        image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85',
        tags: ['Phun lửa cuối tuần', 'Du thuyền sông Hàn', 'Cầu Tình Yêu', 'Đô thị sông nước']
      },
      {
        id: 'hai-van-pass',
        name: 'Đèo Hải Vân - Thiên Hạ Đệ Nhất Hùng Quan',
        category: 'Cung đường di sản',
        duration: 'Nửa ngày',
        slogan: 'Thiên hạ đệ nhất hùng quan nối biển và non xanh.',
        lng: 108.1278,
        lat: 16.1924,
        elevation: '496 m',
        bearing: 110,
        pitch: 72,
        zoom: 14.3,
        description: 'Cung đường đèo ven biển ngoạn mục nối liền Đà Nẵng và Thừa Thiên Huế, nơi mây trời ôm trọn non xanh và vịnh biển Lăng Cô kỳ vĩ.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
        tags: ['Hải Vân Quan', 'Vịnh Lăng Cô', 'Check-in cung đèo', 'Cafe ngắm biển']
      },
      {
        id: 'hoi-an-ancient-town',
        name: 'Phố Cổ Hội An',
        category: 'Di sản thế giới UNESCO',
        duration: 'Buổi chiều & tối',
        slogan: 'Trầm tích di sản ngàn năm soi bóng dòng sông Hoài.',
        lng: 108.3265,
        lat: 15.8801,
        elevation: '5 m',
        bearing: -10,
        pitch: 62,
        zoom: 15.2,
        description: 'Cách Đà Nẵng chỉ 30 phút lái xe riêng, lạc vào không gian cổ kính thế kỷ 16 với Chùa Cầu, thả hoa đăng sông Hoài và chợ đêm rực rỡ.',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85',
        tags: ['Di sản UNESCO', 'Chùa Cầu', 'Thả đèn hoa đăng', 'Cơm gà & Cao lầu']
      }
    ]
  },

  // Section 09 - Culinary Experiences
  culinary: {
    kicker: 'THE ART OF DA NANG CUISINE',
    title: 'Hành Trình Đánh Thức Vị Giác',
    subtitle: 'Mỗi món ăn là một chương trong câu chuyện văn hóa miền Trung.',
    lead: 'Ẩm thực Đà Nẵng là sự giao hòa tuyệt mỹ giữa nét mộc mạc đậm đà của núi rừng sông nước và vị ngọt thanh nguyên bản từ biển Đông.',
    categories: [
      { id: 'all', label: 'Tất cả phong vị' },
      { id: 'specialty', label: 'Đặc sản địa phương' },
      { id: 'seafood', label: 'Hải sản tươi sống' },
      { id: 'finedining', label: 'Ẩm thực tinh hoa' }
    ],
    items: [
      {
        id: 'mi-quang',
        chapter: '01',
        name: 'Mì Quảng Truyền Thống',
        category: 'specialty',
        categoryLabel: 'Đặc Sản Xứ Quảng',
        slogan: 'Sợi mì vàng óng đậm vị nước nhưn tôm thịt và bánh tráng mè giòn rụm.',
        desc: 'Sợi mì gạo mềm mượt hòa cùng nước dùng đậm đà nấu từ tôm rim, thịt ba chỉ hoặc ếch đồng, ăn kèm bánh tráng mè nướng và 9 loại rau sống xanh non.',
        image: 'https://images.unsplash.com/photo-1790955333423-96ea0abb9b89?auto=format&fit=crop&w=1200&q=85',
        fallbackImage: 'https://upload.wikimedia.org/wikipedia/commons/5/57/M%C3%AC_Qu%E1%BA%A3ng%2C_Da_Nang%2C_Vietnam.jpg',
        spot: 'Quán gia truyền hơn 30 năm người bản địa ưa chuộng',
        highlights: ['Sợi mì nghệ vàng óng', 'Rau sống Trà Quế 9 vị', 'Bánh tráng nướng mè giòn rụm', 'Đậu phộng rang thơm lừng'],
        flavorNotes: 'Đậm đà · Thơm bùi · Cay dịu · Giòn rụm'
      },
      {
        id: 'banh-trang-thit-heo',
        chapter: '02',
        name: 'Bánh Tráng Cuốn Thịt Heo Hai Đầu Da',
        category: 'specialty',
        categoryLabel: 'Đặc Sản Xứ Quảng',
        slogan: 'Thịt luộc hai đầu da giòn ngọt, cuốn bánh tráng phơi sương chấm mắm nêm nồng nàn.',
        desc: 'Thịt heo Đại Lộc luộc khéo léo giữ trọn phần mỡ trong veo hai đầu, cuốn cùng bánh tráng phơi sương, rau ghém và chấm mắm nêm đậm đà thơm cay.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/B%C3%A1nh_tr%C3%A1ng_cu%E1%BB%91n_th%E1%BB%8Bt_heo.jpg',
        fallbackImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/B%C3%A1nh_tr%C3%A1ng_cu%E1%BB%91n_th%E1%BB%8Bt_heo.jpg/1280px-B%C3%A1nh_tr%C3%A1ng_cu%E1%BB%91n_th%E1%BB%8Bt_heo.jpg',
        spot: 'Thịt heo Đại Lộc chính gốc & Mắm nêm Dì Cẩn',
        highlights: ['Thịt heo hai đầu da luộc chuẩn độ', 'Bánh tráng Đại Lộc dẻo dai', 'Mắm nêm pha thơm nồng tỏi ớt', 'Khế chua, chuối chát, dưa leo'],
        flavorNotes: 'Béo ngọt · Thanh mát · Nồng nàn · Đậm vị'
      },
      {
        id: 'hai-san-tuoi',
        chapter: '03',
        name: 'Hải Sản Tươi Sống Đánh Bắt Trong Ngày',
        category: 'seafood',
        categoryLabel: 'Biển Đông Thu Hoạch',
        slogan: 'Hương vị đại dương nguyên bản vừa cập bến từ những chiếc thuyền thúng rạng sáng.',
        desc: 'Tôm hùm nướng bơ tỏi, cua gạch rang me, mực cơm hấp gừng, hàu nướng mỡ hành bắt trực tiếp tại bể nuôi nước biển tự nhiên ven đường Võ Nguyên Giáp.',
        image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=85',
        fallbackImage: 'https://images.unsplash.com/photo-1559737558-245cb351c4a4?auto=format&fit=crop&w=1200&q=85',
        spot: 'Nhà hàng hải sản ven biển chuẩn vị, niêm yết giá minh bạch',
        highlights: ['Tôm sú nướng muối ớt xanh', 'Mực cơm hấp gừng giòn ngọt', 'Hàu nướng mỡ hành đậu phộng', 'Chế biến tươi sống tại chỗ'],
        flavorNotes: 'Tươi giòn · Ngọt thanh · Thơm khói · Đậm đà'
      },
      {
        id: 'bun-cha-ca',
        chapter: '04',
        name: 'Bún Chả Cá Đà Nẵng',
        category: 'specialty',
        categoryLabel: 'Món Ngon Phố Biển',
        slogan: 'Nước lèo thanh ngọt từ xương cá và quả bí đỏ, chả cá thu chiên vàng thơm nức.',
        desc: 'Nước lèo ninh từ xương cá biển, cà chua, thơm, bắp cải và bí đỏ ngọt thanh tự nhiên, chả cá thu thơm lừng dai giòn đặc trưng.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Bun_cha_ca.jpg',
        fallbackImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Bun_cha_ca.jpg/1280px-Bun_cha_ca.jpg',
        spot: 'Quán bún gia truyền trên phố Nguyễn Chí Thanh mở từ sáng sớm',
        highlights: ['Chả cá thu quết tay dai giòn', 'Nước dùng bí đỏ ngọt thanh', 'Mắm ruốc nguyên chất ăn kèm', 'Hành ngâm giấm đường chua ngọt'],
        flavorNotes: 'Ngọt thanh · Thơm lừng · Cay ấm · Tròn vị'
      },
      {
        id: 'la-maison-1888',
        chapter: '05',
        name: 'Fine Dining Ven Biển & Ẩm Thực Tinh Hoa',
        category: 'finedining',
        categoryLabel: 'Ẩm Thực Tinh Hoa',
        slogan: 'Đêm tiệc giao thoa ẩm thực Pháp - Việt đỉnh cao dưới ánh nến lãng mạn ngắm vịnh biển.',
        desc: 'Trải nghiệm tiệc tối lãng mạn dưới ánh nến tại nhà hàng 5 sao với tầm nhìn hoàng hôn vịnh biển, thực đơn giao thoa Pháp - Việt đỉnh cao.',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85',
        fallbackImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
        spot: 'Không gian sang trọng tiêu chuẩn Michelin, cần đặt bàn trước',
        highlights: ['Thực đơn Degustation tinh tế', 'Bộ sưu tập rượu vang Grand Cru', 'Tầm nhìn toàn cảnh vịnh biển', 'Dịch vụ chuẩn thượng lưu'],
        flavorNotes: 'Tinh tế · Thăng hoa · Lãng mạn · Đẳng cấp'
      }
    ]
  },

  // Section 10 - Private Customized Travel
  privateValues: {
    kicker: 'PRIVATE TOUR PHILOSOPHY',
    title: 'Your Trip. Your Rules.',
    subtitle: 'Vì sao hàng ngàn du khách thượng lưu chọn Super EZ Tour thay vì tour truyền thống?',
    items: [
      {
        number: '100%',
        title: 'Tour Riêng 100% — Không Ghép Khách',
        desc: 'Mỗi chuyến xe, mỗi bữa ăn, mỗi khoảnh khắc chỉ thuộc về bạn và những người thân yêu. Không có người lạ, không có sự phiền toái.'
      },
      {
        number: '0%',
        title: 'Tuyệt Đối Không Ép Mua Sắm (0% Shopping)',
        desc: 'Chúng tôi cam kết bằng hợp đồng pháp lý: Tuyệt đối không chở khách vào điểm bán hàng trích hoa hồng, không phụ phí ẩn.'
      },
      {
        number: '24/7',
        title: 'Đội Ngũ Điều Hành Trực Tiếp Tại Đà Nẵng',
        desc: 'Văn phòng miền Trung của Super EZ Tour túc trực giải quyết mọi tình huống phát sinh ngay lập tức trong vòng 15 phút.'
      },
      {
        number: 'Flex',
        title: 'Lịch Trình Động Theo Nhịp Độ Của Bạn',
        desc: 'Muốn ngủ nướng thêm 1 tiếng? Muốn dừng lại chụp ảnh lâu hơn bên bãi biển? Toàn bộ ekip sẵn sàng thích ứng theo mong muốn của bạn.'
      }
    ]
  },

  // Section 11 - Suggested Itinerary
  itineraries: [
    {
      id: '4d3n',
      label: '4 Ngày 3 Đêm (Được yêu thích nhất)',
      daysCount: 4,
      title: 'Hành Trình Khám Phá Tuyệt Tác Miền Di Sản',
      overview: 'Hành trình cân bằng hoàn hảo giữa nghỉ dưỡng biển, trải nghiệm kỳ quan thế giới Bà Nà Hills và lắng đọng cùng vẻ đẹp trầm mặc phố cổ Hội An.',
      days: [
        {
          day: 1,
          title: 'Chào Đà Nẵng – Đón Sân Bay – Bán Đảo Sơn Trà – Cầu Rồng Phun Lửa',
          highlights: ['Xe riêng đón tận cửa sân bay DAD', 'Check-in khách sạn/resort ven biển', 'Viếng Chùa Linh Ứng ngắm vịnh biển', 'Tiệc tối hải sản & chiêm ngưỡng Cầu Rồng'],
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
        },
        {
          day: 2,
          title: 'Chạm Vào Mây Trời Bà Nà Hills & Tuyệt Tác Cầu Vàng',
          highlights: ['Cáp treo ngắm toàn cảnh rừng nguyên sinh', 'Dạo bước trên Cầu Vàng lúc sáng sớm vắng khách', 'Khám phá Làng Pháp & Hầm rượu Debay', 'Buffet quốc tế cao cấp hoặc dùng bữa thực đơn riêng'],
          image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'
        },
        {
          day: 3,
          title: 'Ngũ Hành Sơn Huyền Bí – Phố Cổ Hội An Hoài Niệm',
          highlights: ['Thám hiểm Động Huyền Không & Chùa Tam Thai', 'Di chuyển vào Hội An bằng xe riêng êm ái', 'Thưởng thức ẩm thực cao lầu, bánh hoa hồng trắng', 'Du thuyền thả hoa đăng trên sông Hoài thơ mộng'],
          image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
        },
        {
          day: 4,
          title: 'Bình Minh Biển Mỹ Khê – Mua Sắm Đặc Sản – Tiễn Sân Bay',
          highlights: ['Dạo bước ngắm bình minh trên bãi cát mịn', 'Mua sắm đặc sản chất lượng có bảo hành', 'Thư giãn thưởng thức cà phê ngắm sóng biển', 'Xe riêng tiễn ra sân bay làm thủ tục an tâm'],
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
        }
      ]
    },
    {
      id: '3d2n',
      label: '3 Ngày 2 Đêm (Cuối tuần tinh gọn)',
      daysCount: 3,
      title: 'Kỳ Nghỉ Cuối Tuần Chữa Lành Tại Thành Phố Biển',
      overview: 'Lựa chọn lý tưởng cho các gia đình hoặc cặp đôi bận rộn muốn nạp lại năng lượng nhanh chóng tại những resort biển cao cấp nhất.',
      days: [
        {
          day: 1,
          title: 'Đón Sân Bay – Khám Phá Sơn Trà & Biển Mỹ Khê',
          highlights: ['Xe riêng đón tiễn', 'Thư giãn ngắm hoàng hôn bán đảo', 'Tiệc tối ven biển lãng mạn'],
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
        },
        {
          day: 2,
          title: 'Bà Nà Hills Cầu Vàng – Phố Cổ Hội An Đèn Lồng',
          highlights: ['Trải nghiệm Cầu Vàng', 'Check-in phố Hội lung linh về đêm', 'Thưởng thức ẩm thực địa phương'],
          image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
        },
        {
          day: 3,
          title: 'Thảnh Thơi Tắm Biển – Mua Đặc Sản – Tiễn Sân Bay',
          highlights: ['Spa nghỉ dưỡng tại resort', 'Thưởng thức cà phê đặc sản', 'Xe đưa ra sân bay đúng giờ'],
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
        }
      ]
    },
    {
      id: '5d4n',
      label: '5 Ngày 4 Đêm (Khám phá chuyên sâu)',
      daysCount: 5,
      title: 'Hành Trình Con Đường Di Sản Miền Trung Trọn Vẹn',
      overview: 'Khám phá sâu sắc từ Đà Nẵng, Phố cổ Hội An đến Cung đình Huế mộng mơ qua cung đèo Hải Vân kỳ vĩ.',
      days: [
        {
          day: 1,
          title: 'Đón Sân Bay – Check-in Resort Nghỉ Dưỡng',
          highlights: ['Chào đón nồng hậu với xe riêng', 'Thư giãn hồ bơi vô cực'],
          image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
        },
        {
          day: 2,
          title: 'Bà Nà Hills & Đỉnh Núi Chúa',
          highlights: ['Cầu Vàng', 'Làng Pháp', 'Trò chơi giải trí Fantasy Park'],
          image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'
        },
        {
          day: 3,
          title: 'Chinh Phục Đèo Hải Vân – Cố Đô Huế Di Sản',
          highlights: ['Ngắm vịnh Lăng Cô từ đỉnh đèo', 'Đại Nội Huế', 'Chùa Thiên Mụ'],
          image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
        },
        {
          day: 4,
          title: 'Ngũ Hành Sơn – Rừng Dừa Bảy Mẫu – Phố Cổ Hội An',
          highlights: ['Chèo thuyền thúng Rừng Dừa', 'Thả đèn hoa đăng sông Hoài', 'Show Ký Ức Hội An'],
          image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
        },
        {
          day: 5,
          title: 'Bình Minh Sơn Trà – Tiễn Sân Bay Quốc Tế',
          highlights: ['Cà phê ngắm bình minh trên đỉnh núi', 'Tiễn sân bay ấm áp'],
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
        }
      ]
    }
  ],

  // Section 13 - Customer Stories
  customerStories: [
    {
      id: 'story-1',
      author: 'Gia đình Bác Trần Minh Trí',
      origin: 'Hà Nội',
      groupStyle: 'Gia đình 3 thế hệ (6 người lớn, 2 trẻ em)',
      tripDate: 'Tháng 10/2024',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote: 'Nhà có cả ông bà lớn tuổi và 2 bé nhỏ nên sợ nhất cảnh đi tour ghép đông đúc, vội vàng. Nhờ Super EZ Tour bố trí xe Limousine riêng êm ru và bạn hướng dẫn viên tên Tuấn cực kỳ chu đáo, cả nhà có chuyến đi thoải mái nhất từ trước đến nay. Đặc biệt không hề bị ép vào điểm mua sắm nào!',
      photos: [
        'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80'
      ]
    },
    {
      id: 'story-2',
      author: 'Vợ chồng Tuấn Kiệt & Minh Hằng',
      origin: 'TP. Hồ Chí Minh',
      groupStyle: 'Kỳ nghỉ Trăng Mật (Cặp đôi)',
      tripDate: 'Tháng 09/2024',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote: 'Tụi mình chọn ở Naman Retreat và yêu cầu bữa tối riêng tư bên bãi biển. Đội ngũ Super EZ Tour chuẩn bị chu đáo đến từng chi tiết nhỏ như hoa tươi và nến. Chuyến đi thật sự đáng giá và riêng tư đúng nghĩa 100%. Nhất định sẽ tiếp tục chọn Super EZ Tour cho các chuyến đi Bali hay Đài Loan sắp tới.',
      photos: [
        'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
      ]
    }
  ],

  // Section 14 - Final CTA
  finalCta: {
    kicker: 'YOUR ADVENTURE AWAITS',
    title: 'DA NANG IS CALLING.',
    lead: 'Không có hai chuyến đi nào giống nhau.',
    description: 'Hãy chia sẻ mong muốn của bạn, chúng tôi sẽ thiết kế một hành trình độc bản chỉ dành riêng cho bạn và gia đình trong vòng 30 phút.',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
    actions: {
      primary: 'Bắt đầu thiết kế chuyến đi',
      secondary: 'Gọi hotline 1900 8899',
      zalo: 'Tư vấn trực tiếp qua Zalo'
    }
  }
};

export default DA_NANG_CONFIG;