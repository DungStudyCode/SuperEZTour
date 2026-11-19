import fs from 'fs';

const vi = {
  name: "Đà Nẵng",
  nameKr: "다낭",
  country: "Việt Nam",
  countryKr: "베트남",
  region: "Miền Trung",
  regionKr: "중부",
  tagline: "Bờ Biển Vàng · Thiên Đường Nghỉ Dưỡng Riêng Tư Đẳng Cấp Châu Á",
  subTagline: "100% Tour Riêng Biệt · Không Ghép Đoàn · Không Shopping Ép Buộc",
  description: "Super EZ Tour tiên phong thiết kế tour riêng cao cấp tại Đà Nẵng — Hội An — Huế với xe riêng đời mới, hướng dẫn viên chuyên tuyến tận tâm và dịch vụ chuẩn mực 5 sao.",
  hero: {
    badge: "SUPER EZ TOUR — VIỆT NAM",
    badgeSecondary: "Tour Riêng 100% · Lịch Trình Độc Bản",
    title: "ĐÀ NẴNG",
    subtitle: "Beyond the Ordinary.",
    headline: "Hành trình Đà Nẵng độc bản dành riêng cho bạn và gia đình.",
    description: "100% tour riêng không ghép đoàn · Cam kết 0% shopping ép buộc · Chuyên viên bản địa Đà Nẵng thiết kế lịch trình 1:1 theo phong cách của bạn.",
    ctaPrimary: "Thiết kế chuyến đi riêng",
    ctaGhost: "Khám phá Đà Nẵng",
    quickStats: [
      {
        label: "Đường bờ biển ngọc",
        value: "30+ km"
      },
      {
        label: "Di sản UNESCO lân cận",
        value: "3 Di sản"
      },
      {
        label: "Nhiệt độ trung bình",
        value: "26°C - 29°C"
      },
      {
        label: "Độ hài lòng du khách",
        value: "99.8%"
      }
    ],
    scrollPrompt: {
      title: "Đà Nẵng đang chờ đón bạn.",
      action: "Cuộn chuột để bắt đầu hành trình"
    }
  },
  intro: {
    kicker: "CINEMATIC EXPEDITION",
    title: "Giao Lộ Giữa Biển Xanh Nhiệt Đới Và Di Sản Nghìn Năm",
    lead: "Đà Nẵng chào đón bạn bằng làn gió biển Mỹ Khê trong lành, đỉnh Bà Nà mây vờn kỳ ảo và những nếp nhà rêu phong trầm mặc bên dòng sông Hoài thơ mộng.",
    paragraphs: [
      "Nằm tại trái tim dải đất miền Trung, Đà Nẵng là điểm chạm hoàn hảo giữa thiên nhiên biển đảo trác tuyệt và 3 quần thể Di sản Văn hóa Thế giới: Phố cổ Hội An, Cố đô Huế và Thánh địa Mỹ Sơn.",
      "Với Super EZ Tour, bạn hoàn toàn làm chủ nhịp điệu của chuyến đi: thức giấc ngắm bình minh trên biển, dạo bước qua Cầu Vàng trong làn sương sớm vắng bóng người, và thưởng thức ẩm thực thượng hạng tại những góc bàn riêng tư nhìn ra đại dương."
    ],
    features: [
      {
        title: "Tuyệt tác giao hòa giữa núi và biển",
        desc: "Bán đảo Sơn Trà nguyên sinh, Ngũ Hành Sơn huyền bí và biển Mỹ Khê trải dài tạo nên bản hòa ca thiên nhiên hoàn mỹ."
      },
      {
        title: "Tinh hoa mỹ vị ẩm thực miền Trung",
        desc: "Từ bát Mì Quảng dân dã đậm đà đến đại tiệc hải sản tươi sống và bữa tối Fine Dining lãng mạn bên bờ biển."
      },
      {
        title: "Cửa ngõ kết nối 3 Di sản Thế giới",
        desc: "Hành trình thuận tiện di chuyển bằng xe riêng tới Phố cổ Hội An, Quần thể di tích Cố đô Huế và Thánh địa Mỹ Sơn."
      }
    ],
    hudBadge: "BÀ NÀ HILLS & SƠN TRÀ",
    hudTitle: "Cầu Vàng — Đỉnh Bà Nà",
    hudCaption: "Tuyệt tác đôi bàn tay đá khổng lồ nâng đỡ dải lụa vàng giữa ngàn mây",
    hudAltitudeLabel: "Độ cao 1,414m",
    hudLengthLabel: "Chiều dài 150m",
    hudArchLabel: "Kỳ quan kiến trúc"
  },
  ecosystem: {
    services: [
      {
        id: "accommodation",
        number: "01",
        title: "Khách Sạn & Resort 5 Sao Thượng Lưu",
        titleEn: "Premium Accommodation",
        desc: "Tuyển chọn khắt khe những khu nghỉ dưỡng biển sang trọng bậc nhất, villa hồ bơi riêng biệt lập và khách sạn boutique danh tiếng."
      },
      {
        id: "guide",
        number: "02",
        title: "Hướng Dẫn Viên Bản Địa Chuyên Tuyến 1:1",
        titleEn: "Private Dedicated Guide",
        desc: "Đồng hành tận tâm cùng chuyên viên bản địa am hiểu sâu sắc lịch sử văn hóa, hỗ trợ chăm sóc chu đáo người lớn tuổi và trẻ nhỏ."
      },
      {
        id: "flights",
        number: "03",
        title: "Tư Vấn Vé Máy Bay & Giờ Bay Đẹp Nhất",
        titleEn: "Flight & Airport Logistics",
        desc: "Tối ưu hóa hành trình với các khung giờ bay thuận tiện nhất tới sân bay quốc tế Đà Nẵng (DAD), kèm dịch vụ đón tiễn VIP tại sân bay."
      },
      {
        id: "transportation",
        number: "04",
        title: "Đội Xe Riêng Đời Mới & Tài Xế Lịch Lãm",
        titleEn: "Private Luxury Fleet",
        desc: "100% xe đời mới từ 2022 trở lên: Kia Carnival 7 chỗ VIP, DCar Limousine 9 chỗ và Transit 16 chỗ êm ái, đầy đủ Wi-Fi và tiện nghi cao cấp."
      },
      {
        id: "attractions",
        number: "05",
        title: "Tọa Độ Tham Quan & Trải Nghiệm Độc Bản",
        titleEn: "Bespoke Attractions",
        desc: "Tự do lựa chọn những thắng cảnh biểu tượng: Cầu Vàng Bà Nà Hills, Phố cổ Hội An, Ngũ Hành Sơn, Đèo Hải Vân theo nhịp sống riêng."
      },
      {
        id: "culinary",
        number: "06",
        title: "Mỹ Vị Ẩm Thực Bản Địa & Fine Dining",
        titleEn: "Curated Gastronomy",
        desc: "Thưởng thức trọn vẹn đặc sản Mì Quảng, bánh tráng cuốn thịt heo Đại Lộc, đại tiệc hải sản tươi sống và bữa tối lãng mạn ven biển."
      }
    ],
    scrollHint: "Cuộn để khám phá hệ sinh thái dịch vụ",
    ctaDetail: "Xem chi tiết dịch vụ"
  },
  accommodation: {
    title: "Tuyển Tập Lưu Trú Đẳng Cấp Thượng Lưu",
    description: "Những khu nghỉ dưỡng bên bờ biển và khách sạn boutique danh tiếng, nơi không gian sang trọng hòa cùng nét đẹp thiên nhiên thanh bình.",
    allLabel: "Tất cả lưu trú",
    btnChosen: "Đã chọn vào tour",
    btnSelect: "Chọn khách sạn này",
    categories: [
      { id: "all", label: "Tất cả" },
      { id: "luxury-resort", label: "Khu nghỉ dưỡng Siêu sang" },
      { id: "beachfront", label: "Resort Biển 5 Sao" },
      { id: "heritage", label: "Boutique & Di sản" }
    ],
    items: [
      {
        id: "danang-intercontinental",
        name: "InterContinental Danang Sun Peninsula Resort",
        subtitle: "Tuyệt tác nghỉ dưỡng của Bill Bensley giữa bán đảo Sơn Trà",
        location: "Bán đảo Sơn Trà, Đà Nẵng",
        badge: "Khu Nghỉ Dưỡng Hàng Đầu Châu Á",
        perks: [
          "Bãi biển riêng tư biệt lập và khu bảo tồn thiên nhiên",
          "Nhà hàng Michelin La Maison 1888 danh giá",
          "Cáp treo Nam Tram đưa đón giữa các tầng thiên đường"
        ],
        description: "Nằm nép mình bên vịnh biển riêng tư trên bán đảo Sơn Trà, đây là biểu tượng nghỉ dưỡng thượng lưu bậc nhất Việt Nam với kiến trúc giao thoa truyền thống và đương đại độc đáo."
      },
      {
        id: "danang-four-seasons",
        name: "Four Seasons Resort The Nam Hai",
        subtitle: "Ốc đảo tĩnh lặng bên bờ biển Hà My nguyên sơ",
        location: "Bãi biển Điện Dương, Hội An",
        badge: "Forbes Travel Guide 5-Star",
        perks: [
          "100% Villa biệt lập với sân vườn và hồ bơi riêng",
          "The Heart of the Earth Spa đoạt giải thưởng toàn cầu",
          "Chỉ cách trung tâm phố cổ Hội An 15 phút lái xe"
        ],
        description: "Khu nghỉ dưỡng biển siêu sang mang đậm phong cách kiến trúc nhà rường truyền thống xứ Quảng, nơi bạn thả lỏng tâm hồn giữa thiên nhiên xanh ngát."
      },
      {
        id: "danang-hyatt-regency",
        name: "Hyatt Regency Danang Resort & Spa",
        subtitle: "Thiên đường nghỉ dưỡng biển gia đình bên bãi Non Nước",
        location: "Bãi biển Non Nước, Ngũ Hành Sơn, Đà Nẵng",
        badge: "Lựa Chọn Số 1 Cho Gia Đình",
        perks: [
          "5 cụm hồ bơi liên hoàn và cầu trượt nước cho trẻ em",
          "Căn hộ nghỉ dưỡng 2-3 phòng ngủ có bếp tiện nghi",
          "Vị trí đắc địa dễ dàng kết nối Hội An và Ngũ Hành Sơn"
        ],
        description: "Điểm đến lý tưởng cho kỳ nghỉ của gia đình với bãi cát thoai thoải, câu lạc bộ trẻ em Camp Hyatt hiện đại và chuỗi nhà hàng ẩm thực phong phú."
      },
      {
        id: "danang-shangrila-tiancang",
        name: "Tia Wellness Resort (Fusion Maia cũ)",
        subtitle: "Hành trình tái tạo năng lượng với liệu trình spa trọn gói",
        location: "Đường Võ Nguyên Giáp, Ngũ Hành Sơn, Đà Nẵng",
        badge: "Nghỉ Dưỡng Chăm Sóc Sức Khỏe",
        perks: [
          "Đã bao gồm 2 liệu trình spa cao cấp mỗi ngày cho mỗi khách",
          "Villa hồ bơi riêng biệt lập hoàn toàn riêng tư",
          "Bữa sáng phục vụ bất kỳ lúc nào, tại bất cứ đâu bạn muốn"
        ],
        description: "Tiên phong phong cách sống chăm sóc sức khỏe toàn diện, mang lại sự thư thái và tái tạo năng lượng tích cực tuyệt đối cho chuyến đi."
      },
      {
        id: "danang-furama-resort",
        name: "Furama Resort Danang",
        subtitle: "Khu nghỉ dưỡng 5 sao biểu tượng đầu tiên của miền Trung",
        location: "Bãi biển Bắc Mỹ An, Ngũ Hành Sơn, Đà Nẵng",
        badge: "Huyền Thoại Ẩm Thực & Văn Hóa",
        perks: [
          "Ốc đảo nhiệt đới với khu vườn sinh thái lâu năm xanh mát",
          "Đại tiệc buffet hải sản tươi sống trứ danh Đà Nẵng",
          "Trung tâm lặn biển và thể thao nước chuyên nghiệp"
        ],
        description: "Sở hữu nét đẹp kiến trúc Đông Dương quyến rũ kết hợp hài hòa cùng phong cách văn hóa Chăm Pa cổ xưa, tọa lạc ngay sát bờ biển Mỹ An xinh đẹp."
      },
      {
        id: "danang-anantara-hoian",
        name: "Anantara Hoi An Resort",
        subtitle: "Resort boutique thanh lịch ôm trọn bờ sông Thu Bồn",
        location: "Đường Phạm Hồng Thái, Cẩm Châu, Hội An",
        badge: "Boutique Di Sản Ven Sông",
        perks: [
          "Chỉ cách trung tâm phố cổ Hội An vài phút đi bộ",
          "Du thuyền gỗ riêng ngắm hoàng hôn lãng mạn trên sông",
          "Lớp học nấu ăn bản địa và pha chế cà phê truyền thống"
        ],
        description: "Khám phá nét duyên dáng của Hội An từ ban công nhìn ra dòng sông Hoài thơ mộng, mang đến trải nghiệm nghỉ dưỡng hoài niệm và sâu lắng."
      }
    ]
  },
  localGuide: {
    badgeExpert: "CHUYÊN VIÊN ĐỒNG HÀNH 1:1",
    badgeCommitment: "CAM KẾT DỊCH VỤ ĐỘC BẢN",
    lead: "Hướng dẫn viên của Super EZ Tour không đơn thuần là người dẫn đường, mà là sứ giả văn hóa bản địa, tận tâm đồng hành và chăm sóc gia đình bạn như chính người thân.",
    quote: "Mỗi hành trình là một tác phẩm nghệ thuật riêng. Chúng tôi lắng nghe nhịp điệu của bạn để kiến tạo những kỷ niệm khó quên nhất.",
    ctaRequest: "Yêu cầu hướng dẫn viên riêng",
    pillars: [
      {
        title: "Thông Thạo Ngôn Ngữ & Lịch Sử",
        desc: "Được đào tạo bài bản với chứng chỉ hành nghề du lịch quốc tế, truyền tải câu chuyện di sản một cách sinh động và cuốn hút."
      },
      {
        title: "Tận Tâm Chăm Sóc Gia Đình",
        desc: "Chu đáo hỗ trợ người lớn tuổi trong việc di chuyển, tinh tế chăm sóc trẻ nhỏ để bố mẹ có trọn vẹn thời gian thư giãn."
      },
      {
        title: "Chụp Hình & Lưu Giữ Kỷ Niệm",
        desc: "Am hiểu các góc máy đẹp tại từng điểm đến, giúp bạn ghi lại những thước ảnh gia đình lung linh nhất."
      },
      {
        title: "Linh Hoạt Ứng Biến Mọi Nhu Cầu",
        desc: "Sẵn sàng điều chỉnh lịch trình ngay trong ngày theo thời tiết hoặc sở thích phát sinh của quý khách."
      }
    ]
  },
  flights: {
    hubName: "Sân Bay Quốc Tế Đà Nẵng (DAD)",
    subtitle: "Cửa ngõ hàng không hiện đại kết nối nhanh chóng với các thành phố lớn trong nước và quốc tế.",
    directBadge: "ĐƯỜNG BAY THẲNG",
    domesticTag: "CHUYẾN BAY NỘI ĐỊA",
    domesticTitle: "Kết nối nhanh từ Hà Nội & TP. Hồ Chí Minh",
    intlTag: "CHUYẾN BAY QUỐC TẾ",
    intlTitle: "Đường bay thẳng trực tiếp từ Hàn Quốc",
    ctaConsult: "Tư vấn chuyến bay & Đón tiễn",
    perkBar: [
      "Chỉ 15-20 phút di chuyển từ sân bay DAD về các resort biển",
      "Tài xế riêng đón tại sảnh ga đến với bảng tên trang trọng",
      "Hỗ trợ thủ tục check-in ưu tiên và xử lý hành lý cẩn thận"
    ],
    domesticRoutes: [
      {
        from: "Hà Nội (HAN)",
        to: "Đà Nẵng (DAD)",
        time: "1 giờ 20 phút",
        frequency: "Hơn 30 chuyến mỗi ngày"
      },
      {
        from: "TP. Hồ Chí Minh (SGN)",
        to: "Đà Nẵng (DAD)",
        time: "1 giờ 25 phút",
        frequency: "Hơn 35 chuyến mỗi ngày"
      },
      {
        from: "Hải Phòng (HPH)",
        to: "Đà Nẵng (DAD)",
        time: "1 giờ 15 phút",
        frequency: "4-6 chuyến mỗi ngày"
      }
    ],
    intlRoutes: [
      {
        from: "Seoul / Incheon (ICN)",
        to: "Đà Nẵng (DAD)",
        time: "4 giờ 45 phút",
        direct: true
      },
      {
        from: "Busan / Gimhae (PUS)",
        to: "Đà Nẵng (DAD)",
        time: "4 giờ 45 phút",
        direct: true
      },
      {
        from: "Daegu (TAE)",
        to: "Đà Nẵng (DAD)",
        time: "4 giờ 35 phút",
        direct: true
      },
      {
        from: "Cheongju (CJJ)",
        to: "Đà Nẵng (DAD)",
        time: "4 giờ 40 phút",
        direct: true
      }
    ]
  },
  transportation: {
    badgeMaintenance: "BẢO DƯỠNG ĐỊNH KỲ CHÍNH HÃNG",
    modelCodeLabel: "Phiên bản xe",
    seatsLabel: "Số chỗ ngồi",
    luggageLabel: "Sức chứa hành lý",
    featuresHeading: "Trang bị & Tiện nghi đẳng cấp",
    idealBadge: "Phù hợp nhất cho",
    btnSelected: "Đã chọn xe này",
    btnSelect: "Chọn dòng xe này",
    vehicles: [
      {
        id: "suv-7",
        name: "Kia Carnival Premium VIP 7 Chỗ",
        subtitle: "Dòng MPV cao cấp thế hệ mới được ưa chuộng nhất",
        tag: "Bestseller Cho Gia Đình",
        description: "Khoang hành khách rộng rãi vượt trội với hàng ghế thương gia chỉnh điện, cửa lùa tự động và điều hòa đa vùng êm dịu, tạo cảm giác thoải mái tối đa cho cả gia đình.",
        features: [
          "Ghế thương gia bọc da cao cấp tích hợp chế độ ngả lưng thư giãn",
          "Cửa trượt điện thông minh thuận tiện lên xuống cho người già và trẻ nhỏ",
          "Trang bị sẵn Wi-Fi tốc độ cao, nước khoáng đóng chai và khăn lạnh",
          "Hệ thống treo êm ái, cách âm vượt trội trên mọi cung đường"
        ],
        idealFor: "Gia đình hoặc nhóm từ 3 đến 5 thành viên có nhiều hành lý"
      },
      {
        id: "van-16",
        name: "Ford Transit VIP Luxury 16 Chỗ",
        subtitle: "Lựa chọn hoàn hảo cho đại gia đình và đoàn riêng",
        tag: "Rộng Rãi & Tiện Lợi",
        description: "Khoang xe cao ráo, lối đi thông thoáng và khoang chứa hành lý siêu rộng, đảm bảo mọi hành khách đều có chỗ ngồi thoải mái không gò bó.",
        features: [
          "Ghế nỉ cao cấp bọc da êm ái, có gối tựa đầu và dây an toàn riêng biệt",
          "Hệ thống điều hòa cửa gió độc lập tới từng hàng ghế ngồi",
          "Cốp sau cực rộng chứa được từ 10 đến 14 vali cỡ lớn",
          "Tài xế chuyên tuyến giàu kinh nghiệm, nắm rõ cung đường an toàn"
        ],
        idealFor: "Đoàn đại gia đình từ 6 đến 12 người hoặc nhóm bạn thân đi cùng nhau"
      },
      {
        id: "limousine-vip",
        name: "DCar VIP Limousine Hạng Thương Gia 9 Chỗ",
        subtitle: "Chuyên cơ mặt đất sang trọng chuẩn phong cách doanh nhân",
        tag: "Đẳng Cấp Thương Gia",
        description: "Nội thất da ốp gỗ thủ công tinh xảo, ghế ngả massage cao cấp cùng trần đèn ngàn sao lộng lẫy, mang lại trải nghiệm di chuyển xứng tầm thượng lưu.",
        features: [
          "Hàng ghế VIP tích hợp tính năng massage đa điểm và cổng sạc USB riêng",
          "Màn hình giải trí TV thông minh và dàn âm thanh Sony sống động",
          "Hệ thống đèn LED trần bầu trời sao Rolls-Royce sang trọng",
          "Tủ lạnh mini trên xe và rèm cửa chống nắng nhập khẩu cao cấp"
        ],
        idealFor: "Đoàn khách VIP, gia đình từ 4 đến 7 khách muốn tận hưởng sự tiện nghi tối thượng"
      },
      {
        id: "coach-35",
        name: "Thaco Town Luxury 29-35 Chỗ",
        subtitle: "Xe du lịch cỡ trung cao cấp dành cho đoàn doanh nghiệp",
        tag: "Đoàn Doanh Nghiệp",
        description: "Hệ thống bầu hơi êm ái, ghế ngả cao cấp cùng hệ thống âm thanh ánh sáng hiện đại phục vụ các đoàn công ty và gia đình đông người.",
        features: [
          "Hệ thống treo bầu hơi êm dịu triệt tiêu rung lắc",
          "Ghế đệm êm ái ngả sâu, khoảng cách để chân rộng rãi",
          "Khoang hành lý hầm sâu chứa toàn bộ hành lý cồng kềnh",
          "Trang bị micro thuyết minh và dàn âm thanh giải trí chất lượng cao"
        ],
        idealFor: "Đoàn công ty, hội nghị gia đình từ 15 đến 28 thành viên"
      },
      {
        id: "coach-45",
        name: "Hyundai Universe 45 Chỗ VIP",
        subtitle: "Dòng xe du lịch cỡ lớn đẳng cấp hàng đầu Việt Nam",
        tag: "Đoàn Quy Mô Lớn",
        description: "Tiêu chuẩn du lịch quốc tế với khoang hành khách sang trọng, tầm nhìn panorama mở rộng và độ an toàn tuyệt đối trên mọi nẻo đường.",
        features: [
          "Không gian khoang lái và hành khách sang trọng, ghế bọc da cao cấp",
          "Hệ thống điều hòa lọc khí ion khử khuẩn tiên tiến",
          "Hầm xe siêu rộng đáp ứng mọi nhu cầu hành lý và thiết bị sự kiện",
          "Đội ngũ tài xế chuyên phục vụ khách đoàn quốc tế cao cấp"
        ],
        idealFor: "Đoàn du lịch MICE, sự kiện công ty từ 30 đến 42 khách"
      }
    ]
  },
  attractions: {
    kicker: "INTERACTIVE DESTINATION ATLAS",
    title: "Bản Đồ Tọa Độ & Kỳ Quan Biểu Tượng Đà Nẵng",
    atlasName: "Bản đồ vệ tinh tương tác 3D",
    cartPrefix: "Hành trình đã chọn",
    cartSuffix: "tọa độ",
    resetViewText: "Đặt lại góc nhìn",
    btnInCart: "Đã thêm vào hành trình",
    btnAdd: "Thêm vào lịch trình",
    disclaimer: "* Tọa độ và thời gian tham quan có thể linh hoạt điều chỉnh theo nhịp sinh hoạt thực tế của bạn.",
    items: [
      {
        id: "ba-na-hills",
        name: "Cầu Vàng & Sun World Bà Nà Hills",
        categoryName: "Kỳ Quan Biểu Tượng",
        badge: "Top Điểm Đến Toàn Cầu",
        desc: "Kỳ quan Cầu Vàng với đôi bàn tay đá rêu phong khổng lồ vươn lên giữa mây trời, cùng quần thể Làng Pháp cổ kính ở độ cao 1,487m.",
        tags: ["Cầu Vàng", "Cáp Treo Kỷ Lục", "Làng Pháp"]
      },
      {
        id: "my-khe-beach",
        name: "Bãi Biển Mỹ Khê",
        categoryName: "Thiên Đường Biển Nhiệt Đới",
        badge: "Top Bãi Biển Đẹp Nhất Hành Tinh",
        desc: "Tạp chí Forbes vinh danh với bờ cát trắng mịn thoai thoải, làn nước trong xanh ấm áp quanh năm và hàng dừa nghiêng bóng thơ mộng.",
        tags: ["Cát Trắng", "Tắm Biển", "Thể Thao Nước"]
      },
      {
        id: "son-tra-peninsula",
        name: "Bán Đảo Sơn Trà & Chùa Linh Ứng",
        categoryName: "Thiên Nhiên & Tâm Linh",
        badge: "Lá Phổi Xanh Đà Nẵng",
        desc: "Khu bảo tồn thiên nhiên biển rừng nguyên sinh, nơi ngự trị của tượng Phật Bà Quan Thế Âm cao 67m hướng mắt chở che cho biển cả và ngư dân.",
        tags: ["Tượng Phật 67m", "Voọc Chà Vá", "Tầm Nhìn Toàn Cảnh"]
      },
      {
        id: "marble-mountains",
        name: "Danh Thắng Ngũ Hành Sơn",
        categoryName: "Di Tích Lịch Sử Danh Thắng",
        badge: "5 Ngọn Núi Ngũ Hành",
        desc: "Quần thể 5 ngọn núi đá vôi mang tên Kim - Mộc - Thủy - Hỏa - Thổ ẩn chứa các hang động huyền bí, chùa Tam Thai cổ kính và làng đá mỹ nghệ Non Nước.",
        tags: ["Động Huyền Không", "Chùa Cổ", "Làng Đá Non Nước"]
      },
      {
        id: "dragon-bridge",
        name: "Cầu Rồng Sông Hàn",
        categoryName: "Kiến Trúc Đương Đại",
        badge: "Biểu Tượng Thành Phố",
        desc: "Chiếc cầu thép hình rồng thép dài 666m phun lửa và phun nước rực rỡ vào mỗi tối cuối tuần, biến đôi bờ sông Hàn thành sân khấu lễ hội lung linh.",
        tags: ["Cầu Rồng Phun Lửa", "Du Thuyền Sông Hàn", "Đêm Đà Nẵng"]
      },
      {
        id: "hai-van-pass",
        name: "Đèo Hải Vân — Thiên Hạ Đệ Nhất Hùng Quan",
        categoryName: "Cung Đường Đèo Ven Biển",
        badge: "Tuyệt Tác Đường Đèo",
        desc: "Cung đường đèo uốn lượn ngoạn mục ven biển đẹp nhất Việt Nam, nơi mây trời ôm trọn non cao và phóng tầm mắt ngắm trọn vịnh Lăng Cô xanh ngọc.",
        tags: ["Hải Vân Quan", "Vịnh Lăng Cô", "Săn Mây"]
      },
      {
        id: "hoi-an-ancient-town",
        name: "Phố Cổ Hội An (Di Sản UNESCO)",
        categoryName: "Di Sản Văn Hóa Thế Giới",
        badge: "Thương Cảng Cổ Thế Kỷ 16",
        desc: "Đô thị cổ được bảo tồn nguyên vẹn với những bức tường vàng hoa giấy, Chùa Cầu trăm tuổi và hàng ngàn ngọn đèn lồng lung linh soi bóng dòng sông Hoài.",
        tags: ["UNESCO", "Đèn Lồng", "Phố Đi Bộ", "Chùa Cầu"]
      }
    ]
  },
  culinary: {
    kicker: "GASTRONOMY CINEMA EXPERIENCE",
    title: "Mỹ Vị Ẩm Thực Bản Địa Đà Nẵng — Hội An",
    badgeText: "TINH HOA ẨM THỰC XỨ QUẢNG",
    highlightsLabel: "Đặc trưng hương vị:",
    btnChosen: "Đã chọn món này",
    btnAdd: "Thêm vào thực đơn",
    items: [
      {
        id: "mi-quang",
        title: "Mì Quảng Ếch Niêu Đất Trứ Danh",
        origin: "Đặc sản dân dã xứ Quảng",
        badge: "Món Ăn Biểu Tượng",
        desc: "Sợi mì vàng óng dai mềm làm từ gạo quê, thịt ếch đồng om nghệ tươi đậm đà trong niêu đất sôi lục bục, ăn kèm bánh tráng nướng giòn rụm và rau sống trà quế tươi mát.",
        highlights: [
          "Nước dùng om sánh đậm đà ngậy vị nghệ tươi tự nhiên",
          "Rau sống 9 vị giòn tươi lấy trực tiếp từ làng rau Trà Quế",
          "Đậu phộng rang béo bùi và ớt xanh cay nồng khó quên"
        ]
      },
      {
        id: "banh-trang-thit-heo",
        title: "Bánh Tráng Cuốn Thịt Heo Hai Đầu Da Đại Lộc",
        origin: "Món ăn thanh tao đất Đà Thành",
        badge: "Hương Vị Tinh Tế",
        desc: "Thịt heo ba chỉ luộc khéo léo để hai đầu mỡ trong veo giòn sần sật, cuốn cùng bánh tráng phơi sương mỏng dai, dưa leo, chuối chát và chấm nước mắm nêm cá cơm nguyên chất.",
        highlights: [
          "Thịt heo Đại Lộc thơm ngọt tự nhiên không ngấy",
          "Mắm nêm pha tỏi ớt, dứa băm dậy mùi thơm nức mũi",
          "Đĩa rau rừng phong phú hơn 12 loại thảo mộc thanh nhiệt"
        ]
      },
      {
        id: "hai-san-tuoi",
        title: "Đại Tiệc Hải Sản Tươi Sống Bên Bờ Biển Mỹ Khê",
        origin: "Hải sản đánh bắt trong ngày",
        badge: "Hương Vị Đại Dương",
        desc: "Tôm hùm nướng phô mai béo ngậy, cua biển hấp bia gừng ngọt lịm, mực lá nướng muối ớt cay xè và hàu nướng mỡ hành thơm nức tại bàn ăn sát mép sóng biển.",
        highlights: [
          "Hải sản còn đang bơi trong bể kính, tự tay lựa chọn theo sở thích",
          "Chế biến ngay tại chỗ giữ trọn độ ngọt và dinh dưỡng tự nhiên",
          "Bàn ăn riêng tư sát biển tận hưởng gió biển Mỹ Khê lãng mạn"
        ]
      },
      {
        id: "bun-cha-ca",
        title: "Bún Chả Cá Đà Nẵng Nước Dùng Thanh Ngọt",
        origin: "Ẩm thực truyền thống Đà Nẵng",
        badge: "Hương Vị Miền Biển",
        desc: "Chả cá thu, cá mối giã tay chiên vàng giòn rụm, nước dùng ninh từ xương cá cùng bí đỏ, bắp cải, cà chua và dứa thanh ngọt tự nhiên, ăn kèm hành ngâm chua giòn.",
        highlights: [
          "Chả cá tươi nguyên chất dai giòn không pha bột",
          "Nước dùng thanh ngọt thanh đạm không dầu mỡ",
          "Mắm ruốc thơm lừng và ớt rim cay nồng chuẩn phong vị"
        ]
      },
      {
        id: "la-maison-1888",
        title: "Fine Dining Tại La Maison 1888 (Michelin Selected)",
        origin: "Ẩm thực Pháp cao cấp giao thoa hương vị Việt",
        badge: "Trải Nghiệm Thượng Lưu",
        desc: "Nhà hàng Pháp danh giá do đầu bếp 3 sao Michelin Pierre Gagnaire sáng lập, tọa lạc trong dinh thự cổ điển giữa bán đảo Sơn Trà nhìn ra biển đêm lấp lánh.",
        highlights: [
          "Thực đơn nếm thử (Degustation Menu) đỉnh cao do bếp trưởng Michelin thiết kế",
          "Bộ sưu tập rượu vang quý hiếm hàng đầu Châu Á",
          "Không gian kiến trúc Pháp Đông Dương lộng lẫy và riêng tư tuyệt đối"
        ]
      }
    ]
  },
  privateValues: {
    kicker: "TRIẾT LÝ TOUR RIÊNG BIỆT 100%",
    title: "Chuyến Đi Của Bạn. Quy Tắc Của Bạn.",
    subtitle: "Lý do du khách thượng lưu luôn tin tưởng lựa chọn Super EZ Tour thay vì các tour ghép đại trà.",
    items: [
      {
        number: "100%",
        title: "100% Tour Riêng Tư — Không Ghép Khách Lạ",
        desc: "Từng chiếc xe riêng, từng bàn ăn, từng khoảnh khắc nghỉ ngơi đều thuộc về riêng gia đình bạn. Tận hưởng sự tự do tuyệt đối mà không bị làm phiền bởi những người xa lạ."
      },
      {
        number: "0%",
        title: "Cam Kết 0% Shopping Ép Buộc (No Shopping)",
        desc: "Cam kết bằng hợp đồng rõ ràng: Tuyệt đối không đưa vào các điểm mua sắm chỉ định, không ép chi tiêu dịch vụ phụ, bảng giá minh bạch không phát sinh phụ phí ẩn."
      },
      {
        number: "24/7",
        title: "Đội Ngũ Chuyên Trách Địa Phương Chăm Sóc Trực Tiếp",
        desc: "Văn phòng điều hành trực tiếp của Super EZ Tour tại Đà Nẵng luôn túc trực, sẵn sàng hỗ trợ và giải quyết mọi yêu cầu phát sinh của bạn chỉ trong vòng 15 phút."
      },
      {
        number: "Flex",
        title: "Hành Trình Linh Hoạt 100% Theo Nhịp Sống Của Bạn",
        desc: "Bạn muốn ngủ thêm 1 tiếng vào buổi sáng hay nán lại ngắm hoàng hôn trên biển lâu hơn? Hướng dẫn viên và tài xế riêng luôn sẵn sàng điều chỉnh theo mong muốn của bạn."
      }
    ]
  },
  itineraries: [
    {
      id: "4d3n",
      label: "4 Ngày 3 Đêm (Hành trình Signature được yêu thích nhất)",
      daysCount: 4,
      title: "Đà Nẵng · Bà Nà Hills · Phố Cổ Hội An Di Sản",
      overview: "Bản hòa ca hoàn hảo kết hợp giữa nghỉ dưỡng biển 5 sao tại Mỹ Khê, chinh phục Cầu Vàng Bà Nà Hills và đắm chìm trong vẻ đẹp hoài niệm của Phố cổ Hội An.",
      days: [
        {
          day: 1,
          title: "Chào đón tại Đà Nẵng – Bán đảo Sơn Trà – Biển Mỹ Khê – Cầu Rồng Phun Lửa",
          locationTag: "Bán đảo Sơn Trà & Sông Hàn",
          highlights: [
            "Hạ cánh tại sân bay quốc tế Đà Nẵng (DAD), tài xế và HDV riêng đón tại sảnh",
            "Nhận phòng resort 5 sao bên biển Mỹ Khê và thư giãn nghỉ ngơi",
            "Tham quan Chùa Linh Ứng Sơn Trà và chiêm bái tượng Phật Bà Quan Âm cao 67m",
            "Tiệc tối hải sản tươi sống chào mừng & ngắm Cầu Rồng phun lửa trên sông Hàn"
          ]
        },
        {
          day: 2,
          title: "Chinh phục Đỉnh Bà Nà Hills – Dạo bước Cầu Vàng – Làng Pháp – Hầm Rượu Debay",
          locationTag: "Kỳ quan Bà Nà Hills",
          highlights: [
            "Lên đỉnh Bà Nà Hills bằng tuyến cáp treo đạt nhiều kỷ lục thế giới",
            "Đón làn sương sớm và chụp hình lưu niệm tại Cầu Vàng biểu tượng",
            "Khám phá Hầm rượu cổ Debay trăm tuổi và Vườn hoa Le Jardin D'Amour",
            "Ăn trưa buffet thượng hạng tại lâu đài Làng Pháp và vui chơi Fantasy Park"
          ]
        },
        {
          day: 3,
          title: "Danh thắng Ngũ Hành Sơn – Khám phá Phố cổ Hội An – Thả Hoa Đăng Sông Hoài",
          locationTag: "Ngũ Hành Sơn & Phố cổ Hội An",
          highlights: [
            "Tham quan Ngũ Hành Sơn huyền bí, khám phá Động Huyền Không kỳ vĩ",
            "Ghé thăm Làng đá mỹ nghệ Non Nước truyền thống lâu đời",
            "Dạo bước phố cổ Hội An, tham quan Chùa Cầu, Nhà cổ Tấn Ký và Hội quán Phúc Kiến",
            "Trải nghiệm đi thuyền gỗ thả hoa đăng ước nguyện trên dòng sông Hoài thơ mộng"
          ]
        },
        {
          day: 4,
          title: "Bình minh biển Mỹ Khê – Mua sắm đặc sản Chợ Hàn – Tiễn sân bay DAD",
          locationTag: "Trung tâm Đà Nẵng & Sân bay DAD",
          highlights: [
            "Thong dong ngắm bình minh trên bãi biển Mỹ Khê và thưởng thức bữa sáng resort",
            "Tự do tắm biển hoặc thư giãn tại spa phục hồi năng lượng",
            "Tham quan Chợ Hàn mua đặc sản miền Trung tuyển chọn làm quà",
            "Xe riêng đưa gia đình ra sân bay DAD, hoàn tất chuyến đi trọn vẹn hạnh phúc"
          ]
        }
      ]
    },
    {
      id: "3d2n",
      label: "3 Ngày 2 Đêm (Nghỉ dưỡng biển & Check-in tinh hoa)",
      daysCount: 3,
      title: "Hành Trình Tinh Gọn: Biển Mỹ Khê & Kỳ Quan Bà Nà Hills",
      overview: "Hành trình cô đọng dành cho những kỳ nghỉ ngắn ngày cuối tuần, tối ưu hóa thời gian để tận hưởng biển xanh và check-in Cầu Vàng ngoạn mục.",
      days: [
        {
          day: 1,
          title: "Đón sân bay DAD – Check-in Resort Mỹ Khê – Sơn Trà – Du thuyền Sông Hàn",
          locationTag: "Bán đảo Sơn Trà & Sông Hàn",
          highlights: [
            "Đón riêng tại sân bay DAD và di chuyển thẳng về resort 5 sao",
            "Thưởng ngoạn cung đường ven biển Sơn Trà và viếng Chùa Linh Ứng",
            "Bữa tối đặc sản Mì Quảng ếch niêu đất đậm đà phong vị"
          ]
        },
        {
          day: 2,
          title: "Khám phá trọn vẹn Bà Nà Hills – Cầu Vàng – Làng Pháp – Thư giãn Spa",
          locationTag: "Đỉnh Bà Nà Hills",
          highlights: [
            "Trải nghiệm cáp treo ngắm toàn cảnh thung lũng rừng nguyên sinh",
            "Dạo bước trên Cầu Vàng vào khung giờ vắng khách đẹp nhất",
            "Thưởng thức ẩm thực quốc tế và tham quan Lâu đài Mặt Trăng"
          ]
        },
        {
          day: 3,
          title: "Tắm biển sáng sớm – Thưởng thức Cà phê muối – Tiễn sân bay DAD",
          locationTag: "Bãi biển Mỹ Khê & Sân bay DAD",
          highlights: [
            "Đón bình minh rạng rỡ và tắm biển sớm tại bãi Mỹ Khê",
            "Thưởng thức cà phê muối thơm béo tại quán cà phê view biển",
            "Xe riêng tiễn đoàn ra sân bay DAD theo giờ bay của quý khách"
          ]
        }
      ]
    },
    {
      id: "5d4n",
      label: "5 Ngày 4 Đêm (Đại hành trình Di sản Miền Trung chuyên sâu)",
      daysCount: 5,
      title: "Đại Hành Trình Di Sản: Đà Nẵng · Hội An · Cố Đô Huế",
      overview: "Chuyến du lịch nghỉ dưỡng chuyên sâu kết nối trọn vẹn 3 di sản văn hóa thế giới, trải nghiệm cung đường đèo Hải Vân kỳ vĩ và khám phá kinh thành Huế trầm mặc.",
      days: [
        {
          day: 1,
          title: "Đón tại Đà Nẵng – Nhận phòng Resort Mỹ Khê – Bán đảo Sơn Trà",
          locationTag: "Đà Nẵng & Sơn Trà",
          highlights: [
            "Xe riêng VIP đón đoàn tại sân bay DAD, bắt đầu kỳ nghỉ dưỡng",
            "Check-in resort biển và thưởng thức đồ uống chào mừng cao cấp",
            "Bữa tối ấm cúng với đặc sản bánh tráng thịt heo Đại Lộc"
          ]
        },
        {
          day: 2,
          title: "Khám phá Kỳ quan Bà Nà Hills – Cầu Vàng – Di chuyển đến Phố Cổ Hội An",
          locationTag: "Bà Nà Hills & Hội An",
          highlights: [
            "Cả ngày khám phá trọn vẹn khu du lịch Sun World Bà Nà Hills",
            "Chụp hình tại Cầu Vàng và ngắm nhìn kiến trúc châu Âu tráng lệ",
            "Chiều di chuyển về Hội An, nhận phòng resort ven sông Hoài",
            "Thưởng thức bữa tối ẩm thực Cao Lầu và dạo ngắm phố đèn lồng lung linh"
          ]
        },
        {
          day: 3,
          title: "Trải nghiệm văn hóa Hội An – Rừng dừa Bảy Mẫu – Chợ đêm phố cổ",
          locationTag: "Phố cổ Hội An & Rừng dừa",
          highlights: [
            "Đi thuyền thúng len lỏi qua rặng dừa nước Bảy Mẫu và xem múa thúng",
            "Dạo phố cổ Hội An, ghé thăm các hội quán người Hoa và xưởng lụa",
            "Thưởng thức trà thảo mộc Mót thanh mát nổi tiếng",
            "Trải nghiệm thả hoa đăng cầu may mắn trên dòng sông Hoài"
          ]
        },
        {
          day: 4,
          title: "Chinh phục Đèo Hải Vân – Cố đô Huế – Đại Nội Hoàng Thành – Chùa Thiên Mụ",
          locationTag: "Đèo Hải Vân & Cố đô Huế",
          highlights: [
            "Băng qua Đèo Hải Vân ngoạn mục, dừng chân ngắm vịnh Lăng Cô",
            "Đến Huế, khám phá Đại Nội Hoàng Thành triều Nguyễn uy nghiêm",
            "Viếng Chùa Thiên Mụ cổ kính soi bóng dòng sông Hương thơ mộng",
            "Thưởng thức bữa tối yến tiệc cung đình Huế và nghe ca trù truyền thống"
          ]
        },
        {
          day: 5,
          title: "Lăng Khải Định kỳ vĩ – Mua đặc sản mè xửng, nón bài thơ – Tiễn sân bay",
          locationTag: "Cố đô Huế / Sân bay DAD",
          highlights: [
            "Chiêm ngưỡng kiến trúc tinh xảo Đông - Tây tại Lăng vua Khải Định",
            "Tham quan Làng hương Thủy Xuân rực rỡ sắc màu",
            "Mua sắm đặc sản trà cung đình, kẹo mè xửng Huế làm quà",
            "Xe riêng đưa đoàn ra sân bay DAD hoặc HUI, chia tay hẹn gặp lại"
          ]
        }
      ]
    }
  ],
  customerStoriesTitle: "Nhật Ký Hành Trình & Cảm Nhận Thật Từ Du Khách",
  customerStoriesSub: "Lắng nghe những chia sẻ chân thành từ các gia đình và du khách thượng lưu đã đồng hành cùng Super EZ Tour tại Đà Nẵng.",
  customerStories: [
    {
      id: "story-1",
      author: "Gia đình anh Lee Jung-woo & chị Park Seo-yoon",
      origin: "Seoul, Gangnam",
      groupStyle: "Gia đình 3 thế hệ (6 người lớn, 2 trẻ em)",
      tripDate: "Tháng 10, 2024",
      quote: "Gia đình có bố mẹ lớn tuổi và hai con nhỏ nên chúng tôi không bao giờ dám đi tour ghép. Nhờ chiếc xe riêng 16 chỗ rộng rãi và bạn hướng dẫn viên chu đáo của Super EZ Tour, cả gia đình đã có một kỳ nghỉ thảnh thơi nhất từ trước đến nay. Tuyệt đối không bị ép mua sắm, bố mẹ tôi đặc biệt hài lòng!"
    },
    {
      id: "story-2",
      author: "Cặp đôi Kim Min-seok & Choi Hye-jin",
      origin: "Busan, Haeundae",
      groupStyle: "Kỳ nghỉ trăng mật riêng tư",
      tripDate: "Tháng 09, 2024",
      quote: "Chuyến trăng mật riêng tư hoàn hảo! Chiếc Kia Carnival đưa đón riêng cực kỳ tiện nghi, các bữa tối bên bờ biển Mỹ Khê và Hội An đều được đặt bàn view đẹp nhất. Chúng tôi thoải mái thay đổi giờ khởi hành mỗi sáng mà không phải chờ đợi ai. Nhất định sẽ quay lại cùng Super EZ Tour!"
    }
  ],
  finalCta: {
    kicker: "DA NANG IS CALLING YOU",
    title: "Đà Nẵng Đang Chờ Đón Bạn",
    subtitle: "Hãy để các chuyên gia bản địa của Super EZ Tour hiện thực hóa kỳ nghỉ dưỡng trong mơ của bạn và gia đình ngay hôm nay.",
    description: "Nhận bản phác thảo lịch trình chi tiết và dự toán chi phí minh bạch chỉ sau 30 phút. 100% dịch vụ riêng tư · Xe riêng đời mới · Hướng dẫn viên chuyên tuyến tận tâm.",
    ctaText: "Thiết kế hành trình riêng ngay",
    ctaSecondaryText: "Gọi hotline tư vấn 24/7"
  }
};

fs.writeFileSync('src/locales/destinations/da-nang/vi.json', JSON.stringify(vi, null, 2), 'utf8');
console.log('Regenerated src/locales/destinations/da-nang/vi.json with exact schema match!');
