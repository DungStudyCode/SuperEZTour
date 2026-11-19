import fs from 'fs';
import { DA_NANG_CONFIG } from '../src/features/destinations/data/da-nang.config.js';

// Let's create a builder that extracts KO and builds the parallel VI dictionary
// Every property in KO will have an exact counterpart in VI.

const vi_translations = {
  tagline: "Bờ Biển Vàng · Kỳ Quan Nghỉ Dưỡng Riêng Tư Bậc Nhất Việt Nam",
  subTagline: "100% Tour Riêng Biệt · Không Ghép Đoàn · Không Shopping Ép Buộc",
  description: "Super EZ Tour tiên phong kiến tạo trải nghiệm du lịch riêng cao cấp tại Đà Nẵng — Hội An — Huế với xe riêng đời mới, hướng dẫn viên chuyên tuyến tận tâm và dịch vụ chuẩn mực 5 sao.",
  
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
      { label: "Đường bờ biển ngọc", value: "30+ km" },
      { label: "Di sản UNESCO lân cận", value: "3 Di sản" },
      { label: "Nhiệt độ trung bình", value: "26°C - 29°C" },
      { label: "Độ hài lòng du khách", value: "99.8%" }
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
    gallery: [
      {
        title: "Bà Nà Hills — Cầu Vàng",
        caption: "Cầu Vàng Bà Nà Hills — Tuyệt tác kiến trúc nâng đỡ dải lụa vàng giữa ngàn mây"
      },
      {
        title: "Bãi biển Mỹ Khê",
        caption: "Bãi biển Mỹ Khê — 1 trong 6 bãi biển quyến rũ hàng đầu hành tinh do Forbes vinh danh"
      },
      {
        title: "Phố cổ Hội An",
        caption: "Phố cổ Hội An — Ánh đèn lồng hoa đăng soi bóng dòng sông Hoài thơ mộng"
      }
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
    kicker: "THE 6 LUXURY PILLARS",
    title: "Hệ Sinh Thái 6 Dịch Vụ Du Lịch Riêng Thượng Lưu",
    subtitle: "Trải nghiệm kỳ nghỉ hoàn mỹ từ khâu lưu trú, xe riêng, ẩm thực đến những điểm chạm văn hóa độc bản.",
    scrollHint: "Cuộn để khám phá hệ sinh thái dịch vụ",
    ctaDetail: "Xem chi tiết dịch vụ",
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
    ]
  },

  accommodation: {
    kicker: "HOTELS & RESORTS COLLECTION",
    title: "Tuyển Tập Lưu Trú Đẳng Cấp Thượng Lưu",
    subtitle: "Trải nghiệm không gian nghỉ ngơi thanh bình và dịch vụ chuẩn mực 5 sao quốc tế.",
    description: "Những khu nghỉ dưỡng bên bờ biển và khách sạn boutique danh tiếng, nơi không gian sang trọng hòa cùng nét đẹp thiên nhiên thanh bình.",
    allLabel: "Tất cả lưu trú",
    btnChosen: "Đã chọn vào tour",
    btnSelect: "Chọn khách sạn này",
    categories: [
      { id: "all", label: "Tất cả" },
      { id: "resort", label: "Khu nghỉ dưỡng Siêu sang" },
      { id: "beachfront", label: "Resort Biển 5 Sao" },
      { id: "city-luxury", label: "Khách sạn Trung tâm" }
    ],
    items: [
      {
        id: "intercon",
        name: "InterContinental Danang Sun Peninsula Resort",
        location: "Bán đảo Sơn Trà, Đà Nẵng",
        badge: "Kiệt tác nghỉ dưỡng của Bill Bensley giữa bán đảo Sơn Trà",
        highlights: [
          "Bãi biển riêng tư biệt lập hoàn toàn",
          "Nhà hàng ẩm thực Michelin La Maison 1888",
          "Cáp treo Nam Tram đưa đón giữa các tầng thiên đường",
          "Hồ bơi vô cực nhìn trọn vẹn vịnh Sơn Trà"
        ],
        idealFor: "Kỳ nghỉ VIP thượng lưu, tuần trăng mật lãng mạn và kỷ niệm đặc biệt"
      },
      {
        id: "hyatt",
        name: "Hyatt Regency Danang Resort & Spa",
        location: "Bãi biển Non Nước, Ngũ Hành Sơn, Đà Nẵng",
        badge: "Thiên đường nghỉ dưỡng biển gia đình bên bãi Non Nước",
        highlights: [
          "5 hồ bơi liên hoàn và cầu trượt nước cho trẻ em",
          "Bãi cát trắng mịn thoai thoải an toàn cho bé",
          "Câu lạc bộ trẻ em Camp Hyatt hiện đại",
          "Vị trí đắc địa dễ dàng kết nối Hội An và Ngũ Hành Sơn"
        ],
        idealFor: "Gia đình có trẻ nhỏ, nhóm gia đình 2-3 thế hệ nghỉ dưỡng biển"
      },
      {
        id: "premier-village",
        name: "Premier Village Danang Resort - Managed by Accor",
        location: "Đường Võ Nguyên Giáp, Ngũ Hành Sơn, Đà Nẵng",
        badge: "Quần thể villa hồ bơi riêng 5 sao hàng đầu Châu Á",
        highlights: [
          "100% Villa 3-4 phòng ngủ có hồ bơi riêng biệt lập",
          "Bếp ăn tiện nghi và phòng khách sinh hoạt chung rộng rãi",
          "Dịch vụ tiệc nướng BBQ riêng tại sân vườn biệt thự",
          "Vị trí trung tâm thuận tiện di chuyển trong thành phố"
        ],
        idealFor: "Đại gia đình nhiều thế hệ hoặc nhóm bạn thân muốn không gian riêng tư"
      },
      {
        id: "naman-retreat",
        name: "Naman Retreat & Private Pool Villas",
        location: "Bãi biển Non Nước, Ngũ Hành Sơn, Đà Nẵng",
        badge: "Ốc đảo kiến trúc tre thuần Việt và Spa chăm sóc sức khỏe",
        highlights: [
          "Kiến trúc tre độc đáo đoạt nhiều giải thưởng quốc tế của Võ Trọng Nghĩa",
          "Gói trị liệu Spa chăm sóc sức khỏe miễn phí mỗi ngày",
          "Villa hồ bơi riêng tư bao quanh bởi vườn hoa nhiệt đới",
          "Bãi biển nguyên sơ yên tĩnh và hồ bơi vô cực sát biển"
        ],
        idealFor: "Cặp đôi, du khách yêu thích sự thanh tịnh và chăm sóc sức khỏe toàn diện"
      },
      {
        id: "novotel-han-river",
        name: "Novotel Danang Premier Han River",
        location: "Đường Bạch Đằng, Quận Hải Châu, Đà Nẵng",
        badge: "Khách sạn 5 sao ngắm trọn dòng sông Hàn và cầu xoay",
        highlights: [
          "Tầm nhìn 360 độ ngắm trọn sông Hàn và pháo hoa rực rỡ",
          "Quán bar tầng thượng The Splash Bar & Sky36 sôi động",
          "Nằm ngay trung tâm thành phố, thuận tiện đi dạo và ẩm thực",
          "Phòng nghỉ và căn hộ dịch vụ cao cấp chuẩn quốc tế"
        ],
        idealFor: "Khách kết hợp công tác, cặp đôi thích nhịp sống thành phố về đêm"
      },
      {
        id: "tms-hotel",
        name: "TMS Hotel Danang Beach",
        location: "Đường Võ Nguyên Giáp, Quận Sơn Trà, Đà Nẵng",
        badge: "Khách sạn phong cách sống 5 sao đối diện biển Mỹ Khê",
        highlights: [
          "Hồ bơi đáy kính vô cực cao nhất tại bãi biển Mỹ Khê",
          "Chỉ vài bước chân băng qua đường là tới bãi cát vàng",
          "Thiết kế hiện đại, trẻ trung ngập tràn ánh sáng tự nhiên",
          "Nhà hàng Magic Lounge ngắm hoàng hôn biển lãng mạn"
        ],
        idealFor: "Cặp đôi, du khách trẻ trung yêu thích chụp ảnh và khám phá biển"
      }
    ]
  },

  localGuide: {
    kicker: "PERSONAL LOCAL SPECIALIST",
    title: "Người Bạn Bản Địa Đồng Hành Chu Đáo",
    subtitle: "Khám phá Đà Nẵng sâu sắc và chân thực cùng chuyên gia văn hóa bản địa.",
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
    kicker: "AVIATION & FLIGHT LOGISTICS",
    title: "Mạng Lưới Đường Bay Thuận Tiện Tới Đà Nẵng",
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
        time: "4 giờ 45 phút"
      },
      {
        from: "Busan / Gimhae (PUS)",
        to: "Đà Nẵng (DAD)",
        time: "4 giờ 45 phút"
      },
      {
        from: "Daegu (TAE)",
        to: "Đà Nẵng (DAD)",
        time: "4 giờ 35 phút"
      },
      {
        from: "Cheongju (CJJ)",
        to: "Đà Nẵng (DAD)",
        time: "4 giờ 40 phút"
      }
    ]
  },

  transportation: {
    kicker: "PRIVATE LUXURY FLEET",
    title: "Đội Xe Riêng Cao Cấp Đời Mới",
    subtitle: "Không gian di chuyển êm dịu, tiện nghi và hoàn toàn riêng tư cho gia đình bạn.",
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
        name: "Xe Riêng 7 Chỗ Cao Cấp (SUV / MPV)",
        modelExample: "Toyota Fortuner / Kia Carnival / Ford Everest",
        seats: "4 - 6 người (tối ưu 4-5 người)",
        luggage: "3 - 5 kiện hành lý tiêu chuẩn",
        features: [
          "Hệ thống điều hòa đa vùng độc lập mát sâu",
          "Ghế da cao cấp ngả lưng êm ái",
          "Phục vụ sẵn nước suối và khăn lạnh miễn phí",
          "Tài xế chuyên nghiệp chạy điềm đạm, an toàn tuyệt đối"
        ],
        idealFor: "Gia đình hoặc nhóm từ 4 đến 5 thành viên muốn di chuyển êm ái, tiện lợi"
      },
      {
        id: "van-16",
        name: "Xe Riêng 16 Chỗ VIP Hiện Đại (Van)",
        modelExample: "Ford Transit Luxury / Hyundai Solati",
        seats: "8 - 12 người (tối ưu 8-10 người)",
        luggage: "6 - 10 kiện hành lý lớn",
        features: [
          "Trần xe cao ráo, lối đi lại giữa xe rộng rãi thông thoáng",
          "Ghế ngồi có tựa đầu và khoảng để chân thoải mái",
          "Cốp hành lý sau xe siêu rộng rãi",
          "Hệ thống giảm xóc êm dịu cho hành trình đường dài"
        ],
        idealFor: "Đoàn đại gia đình 2-3 thế hệ hoặc nhóm bạn thân đông người"
      },
      {
        id: "limousine-vip",
        name: "DCar VIP Limousine Hạng Thương Gia 9 Chỗ",
        modelExample: "DCar President / Auto Kingdom VIP Lounge",
        seats: "5 - 7 người (tối ưu 6 người)",
        luggage: "5 - 7 kiện hành lý tiêu chuẩn",
        features: [
          "Ghế da thương gia tích hợp chế độ massage đa điểm",
          "Màn hình TV giải trí và dàn âm thanh Sony sống động",
          "Cổng sạc điện thoại USB tại từng vị trí ghế ngồi",
          "Hệ thống trần bầu trời sao Rolls-Royce lộng lẫy"
        ],
        idealFor: "Du khách VIP, kỳ nghỉ dưỡng trăng mật hoặc tiếp đón đối tác ngoại giao"
      },
      {
        id: "coach-35",
        name: "Xe Du Lịch Cao Cấp 29 - 35 Chỗ",
        modelExample: "Thaco Town / Isuzu Samco / Hyundai Universe Mini",
        seats: "15 - 28 người",
        luggage: "Hầm chứa hành lý số lượng lớn",
        features: [
          "Hệ thống giảm chấn bầu hơi êm ái triệt tiêu rung lắc",
          "Ghế đệm ngả lưng bọc nhung cao cấp",
          "Hệ thống âm thanh micro phục vụ thuyết minh chuyên nghiệp",
          "Khoang xe rộng thoáng tạo cảm giác thư thái tối đa"
        ],
        idealFor: "Đoàn công ty, hội nghị gia đình lớn, sự kiện doanh nghiệp vừa"
      },
      {
        id: "coach-45",
        name: "Xe Du Lịch Hạng Sang 45 Chỗ Universe",
        modelExample: "Hyundai Universe Prime 45 Chỗ VIP",
        seats: "30 - 40 người",
        luggage: "Hầm hàng siêu lớn chứa toàn bộ hành lý",
        features: [
          "Không gian khoang hành khách chuẩn quốc tế rộng rãi",
          "Điều hòa làm lạnh nhanh với công nghệ lọc không khí",
          "Màn hình LCD độ nét cao và âm thanh vòm sống động",
          "Tài xế chuyên nghiệp dày dạn kinh nghiệm phục vụ đoàn quốc tế"
        ],
        idealFor: "Đoàn du lịch MICE quy mô lớn, hội nghị khách hàng doanh nghiệp"
      }
    ]
  },

  attractions: {
    kicker: "INTERACTIVE DESTINATION ATLAS",
    title: "Bản Đồ Tọa Độ & Kỳ Quan Biểu Tượng Đà Nẵng",
    subtitle: "Khám phá các thắng cảnh nổi tiếng bằng bản đồ vệ tinh tương tác 3D chân thực.",
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
        duration: "6-7 giờ",
        slogan: "Lạc bước giữa chốn bồng lai tiên cảnh ở độ cao 1,487m",
        description: "Kỳ quan Cầu Vàng với đôi bàn tay đá khổng lồ rêu phong vươn lên từ sườn núi nâng đỡ dải lụa vàng giữa biển mây bồng bềnh, cùng quần thể Làng Pháp cổ kính tráng lệ.",
        tags: ["Cầu Vàng", "Cáp Treo Kỷ Lục", "Làng Pháp", "Khí Hậu Ôn Đới"]
      },
      {
        id: "my-khe-beach",
        name: "Bãi Biển Mỹ Khê",
        duration: "2-3 giờ",
        slogan: "Bãi biển quyến rũ hàng đầu hành tinh do Forbes vinh danh",
        description: "Bờ cát trắng mịn trải dài thoai thoải ôm lấy làn nước biển trong xanh màu ngọc bích, sóng êm dịu và rặng dừa thơ mộng, lý tưởng cho những giây phút thư giãn tuyệt đối.",
        tags: ["Bãi Biển Forbes", "Cát Trắng Mịn", "Thể Thao Biển", "Ngắm Bình Minh"]
      },
      {
        id: "son-tra-peninsula",
        name: "Bán Đảo Sơn Trà & Chùa Linh Ứng",
        duration: "3-4 giờ",
        slogan: "Lá phổi xanh nguyên sơ và chốn tâm linh thanh tịnh hướng biển",
        description: "Khu bảo tồn thiên nhiên rừng nguyên sinh ôm trọn biển cả, nơi ngự trị của tượng Phật Bà Quan Thế Âm cao 67m uy nghiêm và nơi sinh sống của loài Voọc Chà Vá chân nâu quý hiếm.",
        tags: ["Tượng Phật 67m", "Chùa Linh Ứng", "Rừng Nguyên Sinh", "Voọc Chà Vá"]
      },
      {
        id: "marble-mountains",
        name: "Danh Thắng Ngũ Hành Sơn",
        duration: "2-3 giờ",
        slogan: "5 ngọn núi đá vôi kỳ vĩ lưu giữ huyền tích ngàn năm",
        description: "Quần thể 5 ngọn núi Kim - Mộc - Thủy - Hỏa - Thổ ẩn chứa các hang động thạch nhũ huyền bí như Động Huyền Không, chùa Tam Thai cổ kính và làng nghề điêu khắc đá Non Nước trăm tuổi.",
        tags: ["Động Huyền Không", "Chùa Tam Thai", "Núi Ngũ Hành", "Làng Đá Non Nước"]
      },
      {
        id: "dragon-bridge",
        name: "Cầu Rồng & Đêm Sông Hàn",
        duration: "1.5-2 giờ",
        slogan: "Biểu tượng tráng lệ vươn mình của thành phố đáng sống",
        description: "Cây cầu thép hình rồng dài 666m phun lửa và phun nước sống động vào mỗi tối cuối tuần, hòa cùng ánh sáng lung linh của các cây cầu biểu tượng dọc đôi bờ sông Hàn thơ mộng.",
        tags: ["Cầu Rồng Phun Lửa", "Du Thuyền Sông Hàn", "Cầu Tình Yêu", "Cảnh Đêm Rực Rỡ"]
      },
      {
        id: "hai-van-pass",
        name: "Đèo Hải Vân — Thiên Hạ Đệ Nhất Hùng Quan",
        duration: "2-3 giờ",
        slogan: "Cung đường đèo ven biển ngoạn mục bậc nhất Việt Nam",
        description: "Cung đường uốn lượn ngoạn mục giữa một bên là non cao kỳ vĩ, một bên là đại dương bao la, đưa bạn lên đỉnh đèo ngắm trọn vịnh Lăng Cô xanh biếc và đón những làn mây bồng bềnh.",
        tags: ["Hải Vân Quan", "Vịnh Lăng Cô", "Săn Mây Đỉnh Đèo", "Cung Đường Đẹp"]
      },
      {
        id: "hoi-an-ancient-town",
        name: "Phố Cổ Hội An (Di Sản UNESCO)",
        duration: "4-5 giờ",
        slogan: "Thương cảng cổ thế kỷ 16 lung linh ánh đèn lồng rêu phong",
        description: "Quần thể kiến trúc cổ kính được bảo tồn nguyên vẹn với những bức tường vàng hoa giấy, Chùa Cầu trăm tuổi, những xưởng lụa truyền thống và trải nghiệm thả hoa đăng trên sông Hoài.",
        tags: ["UNESCO", "Đèn Lồng Rực Rỡ", "Chùa Cầu Cổ", "Thả Hoa Đăng"]
      }
    ]
  },

  culinary: {
    kicker: "GASTRONOMY CINEMA EXPERIENCE",
    title: "Mỹ Vị Ẩm Thực Bản Địa Đà Nẵng — Hội An",
    subtitle: "Hành trình khám phá những hương vị truyền thống tinh hoa được chắt lọc qua nhiều thế hệ.",
    badgeText: "TINH HOA ẨM THỰC XỨ QUẢNG",
    highlightsLabel: "Đặc trưng hương vị:",
    btnChosen: "Đã chọn món này",
    btnAdd: "Thêm vào thực đơn",
    items: [
      {
        id: "mi-quang",
        chapter: "MÓN 01",
        name: "Mì Quảng Ếch Niêu Đất Trứ Danh",
        nameKr: "미꽝 (Mi Quang)",
        categoryLabel: "Đặc sản dân dã biểu tượng",
        slogan: "Linh hồn ẩm thực xứ Quảng đượm vị mộc mạc quê hương",
        desc: "Sợi mì vàng óng dai mềm làm từ gạo quê, thịt ếch đồng om nghệ tươi đậm đà trong niêu đất sôi lục bục, ăn kèm bánh tráng nướng giòn rụm và rau sống trà quế tươi mát.",
        spot: "Mì Quảng Bà Mua / Bếp Trang Đà Nẵng",
        highlights: [
          "Nước dùng om sánh đậm đà ngậy vị nghệ tươi tự nhiên",
          "Rau sống 9 vị giòn tươi lấy trực tiếp từ làng rau Trà Quế",
          "Đậu phộng rang béo bùi và ớt xanh cay nồng khó quên",
          "Thịt ếch đồng săn chắc ngọt đậm đà gia vị truyền thống"
        ],
        flavorNotes: "Đậm đà · Thơm nồng nghệ tươi · Béo bùi đậu phộng · Giòn rụm bánh tráng"
      },
      {
        id: "banh-trang-thit-heo",
        chapter: "MÓN 02",
        name: "Bánh Tráng Cuốn Thịt Heo Hai Đầu Da Đại Lộc",
        nameKr: "반짱 팃헤오 (Thịt Heo Cuốn)",
        categoryLabel: "Hương vị thanh tao xứ Đà",
        slogan: "Sự kết hợp tinh tế giữa sản vật ruộng đồng và mắm nêm gia truyền",
        desc: "Thịt heo ba chỉ luộc khéo léo để hai đầu mỡ trong veo giòn sần sật, cuốn cùng bánh tráng phơi sương mỏng dai, dưa leo, chuối chát và chấm nước mắm nêm cá cơm nguyên chất.",
        spot: "Quán Trần / Đặc sản Hoàng Tín Đà Nẵng",
        highlights: [
          "Thịt heo Đại Lộc thơm ngọt tự nhiên không ngấy",
          "Mắm nêm pha tỏi ớt, dứa băm dậy mùi thơm nức mũi",
          "Đĩa rau rừng phong phú hơn 12 loại thảo mộc thanh nhiệt",
          "Bánh tráng phơi sương Đại Lộc dẻo dai cuốn không rách"
        ],
        flavorNotes: "Thanh mát · Giòn sần sật · Nồng nàn mắm nêm · Dịu ngọt thịt luộc"
      },
      {
        id: "hai-san-tuoi",
        chapter: "MÓN 03",
        name: "Đại Tiệc Hải Sản Tươi Sống Bên Bờ Biển Mỹ Khê",
        nameKr: "해산물 만찬 (Seafood Feast)",
        categoryLabel: "Hương vị đại dương trác tuyệt",
        slogan: "Hải sản tươi rói đánh bắt trong ngày chế biến tại bàn ăn sát biển",
        desc: "Tôm hùm nướng phô mai béo ngậy, cua biển hấp bia gừng ngọt lịm, mực lá nướng muối ớt cay xè và hàu nướng mỡ hành thơm nức tại bàn ăn sát mép sóng biển.",
        spot: "Nhà hàng Bé Mặn / Cua Đỏ / Mỹ Hạnh Biển Mỹ Khê",
        highlights: [
          "Hải sản còn đang bơi trong bể kính, tự tay lựa chọn theo sở thích",
          "Chế biến ngay tại chỗ giữ trọn độ ngọt và dinh dưỡng tự nhiên",
          "Bàn ăn riêng tư sát biển tận hưởng gió biển Mỹ Khê lãng mạn",
          "Đầy đủ các loại sốt chấm tiêu chanh, muối ớt xanh độc quyền"
        ],
        flavorNotes: "Ngọt đậm vị biển · Thơm lừng nướng than · Cay tê ớt xanh · Tươi rói ngậy béo"
      },
      {
        id: "bun-cha-ca",
        chapter: "MÓN 04",
        name: "Bún Chả Cá Đà Nẵng Nước Dùng Thanh Ngọt",
        nameKr: "분짜까 (Bun Cha Ca)",
        categoryLabel: "Bữa sáng ấm nồng miền biển",
        slogan: "Nước dùng ninh từ xương cá cùng bí đỏ và thơm ngọt thanh khiết",
        desc: "Chả cá thu, cá mối giã tay chiên vàng giòn rụm, nước dùng ninh từ xương cá cùng bí đỏ, bắp cải, cà chua và dứa thanh ngọt tự nhiên, ăn kèm hành ngâm chua giòn.",
        spot: "Bún Chả Cá 109 Nguyễn Chí Thanh / Bà Phiến",
        highlights: [
          "Chả cá tươi nguyên chất dai giòn không pha bột",
          "Nước dùng thanh ngọt thanh đạm không dầu mỡ",
          "Mắm ruốc thơm lừng và ớt rim cay nồng chuẩn phong vị",
          "Hành tím chua ngọt ăn kèm cân bằng hoàn hảo vị giác"
        ],
        flavorNotes: "Thanh ngọt tự nhiên · Dai giòn chả cá · Chua dịu cà chua thơm · Cay nồng ớt rim"
      },
      {
        id: "la-maison-1888",
        chapter: "MÓN 05",
        name: "Fine Dining Tại La Maison 1888 (Michelin Selected)",
        nameKr: "라 메종 1888 (Fine Dining)",
        categoryLabel: "Đỉnh cao ẩm thực thượng lưu",
        slogan: "Tuyệt đỉnh ẩm thực Pháp giao hòa tinh hoa bản địa do đầu bếp Michelin sáng lập",
        desc: "Nhà hàng Pháp danh giá do đầu bếp 3 sao Michelin Pierre Gagnaire sáng lập, tọa lạc trong dinh thự cổ điển giữa bán đảo Sơn Trà nhìn ra biển đêm lấp lánh.",
        spot: "InterContinental Danang Sun Peninsula Resort",
        highlights: [
          "Thực đơn nếm thử (Degustation Menu) đỉnh cao do bếp trưởng Michelin thiết kế",
          "Bộ sưu tập rượu vang quý hiếm hàng đầu Châu Á",
          "Không gian kiến trúc Pháp Đông Dương lộng lẫy và riêng tư tuyệt đối",
          "Dịch vụ ẩm thực chuẩn mực 5 sao quốc tế chăm sóc từng chi tiết"
        ],
        flavorNotes: "Tinh tế thượng hạng · Đậm đà phong vị Pháp · Rượu vang hảo hạng · Trải nghiệm khó quên"
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
            "Bữa tối đặc sản Mì Quảng ếch niêu đất đậm đà phong vị",
            "Thưởng ngoạn cảnh đêm Đà Nẵng lung linh trên du thuyền sông Hàn"
          ]
        },
        {
          day: 2,
          title: "Khám phá trọn vẹn Bà Nà Hills – Cầu Vàng – Làng Pháp – Thư giãn Spa",
          locationTag: "Đỉnh Bà Nà Hills",
          highlights: [
            "Trải nghiệm cáp treo ngắm toàn cảnh thung lũng rừng nguyên sinh",
            "Dạo bước trên Cầu Vàng vào khung giờ vắng khách đẹp nhất",
            "Thưởng thức ẩm thực quốc tế và tham quan Lâu đài Mặt Trăng",
            "Trở về resort thư giãn spa và thưởng thức bữa tối hải sản nướng"
          ]
        },
        {
          day: 3,
          title: "Tắm biển sáng sớm – Thưởng thức Cà phê muối – Tiễn sân bay DAD",
          locationTag: "Bãi biển Mỹ Khê & Sân bay DAD",
          highlights: [
            "Đón bình minh rạng rỡ và tắm biển sớm tại bãi Mỹ Khê",
            "Thưởng thức cà phê muối thơm béo tại quán cà phê view biển",
            "Mua sắm đặc sản chả bò, bánh khô mè Đà Nẵng",
            "Xe riêng tiễn đoàn ra sân bay DAD theo giờ bay của quý khách"
          ]
        }
      ]
    },
    {
      id: "5d4n",
      label: "5 Ngày 4 Đêm (Đại hành trình Di sản Miền Trung chuyên sâu)",
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
            "Ngắm hoàng hôn tuyệt đẹp từ đỉnh Sơn Trà",
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

fs.writeFileSync('src/locales/destinations/da-nang/vi.json', JSON.stringify(vi_translations, null, 2), 'utf8');
console.log('src/locales/destinations/da-nang/vi.json updated successfully!');
