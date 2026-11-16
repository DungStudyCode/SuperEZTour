# Super EZ Tour - Nền Tảng Tour Riêng 100% Không Ghép Đoàn Hàng Đầu Châu Á
> Slogan: **"Tour riêng 100% · Không ghép đoàn"** | Hotline: **1900 8899** | Website: [supereztour.com](https://supereztour.com)

---

## 1. Giới thiệu thương hiệu Super EZ Tour

**Super EZ Tour** (`super-ez-tour`) là nền tảng thương mại và đặt tour du lịch cao cấp hàng đầu Châu Á, tiên phong mô hình **Tour riêng tư 100% không ghép đoàn** (Private Customized Tour).

### Giá trị cốt lõi:
- **Tour riêng 100% - Không ghép đoàn**: Toàn bộ hành trình dành riêng cho bạn và gia đình, không ghép khách lạ.
- **Tự do tùy biến lịch trình**: Làm chủ thời gian xuất phát, điểm tham quan, ẩm thực và tốc độ trải nghiệm.
- **Dịch vụ chuẩn cao cấp**: Xe riêng đời mới (Sedan/SUV/Limousine), hướng dẫn viên chuyên tuyến tận tâm và bảo hiểm du lịch quốc tế toàn diện.
- **Cam kết không ép mua sắm (0% Shopping)**: Tuyệt đối không ép khách vào điểm bán hàng, không phụ phí ẩn.
- **Mạng lưới 16 điểm đến tại 6 quốc gia Châu Á**: Tổ chức và điều hành trực tiếp, đảm bảo hỗ trợ tức thì 24/7.

---

## 2. Hệ thống nhận diện thương hiệu

- **Tên thương hiệu**: Super EZ Tour (Tên rút gọn: EZ Tour)
- **Logo Wordmark**: Logo hiện đại với chữ `SUPER` khỏe khoắn, điểm nhấn `EZ` trên nền badge đỏ bo góc, và chữ `TOUR` tinh tế, tối giản.
- **Màu sắc chủ đạo**:
  - Đỏ thương hiệu: `#ED2028` (Primary Red)
  - Trắng tinh khiết: `#FFFFFF` (Pure White)
  - Đen than hiện đại: `#111827` (Dark Slate)
  - Xám nền trung tính: `#F8F9FA` (Neutral Light)
- **Typography**: Phông chữ hiện đại, cao cấp **Plus Jakarta Sans** kết hợp cùng **Inter**.
- **Quản lý tập trung**: Toàn bộ nhận diện thương hiệu được quản lý tập trung trong file `src/constants/brand.config.js`.

---

## 3. Công nghệ sử dụng

- **ReactJS (v18.3.1)**: Kiến trúc component phân tầng, Clean Architecture.
- **Vite (v6.0.1)**: Trình đóng gói hiện đại, thời gian build siêu tốc.
- **CSS3 thuần & CSS Variables**: Hệ thống Design System chuẩn mực, nhất quán, không dùng Tailwind CSS, Bootstrap hay UI templates bên thứ ba.
- **SwiperJS (v11.1.15)**: Băng chuyền Hero Banner và Reviews trượt mượt mà trên mọi kích thước màn hình.
- **Lucide React (v0.460.0)**: Bộ icon phong cách đường nét tối giản, hiện đại.
- **Flexbox & CSS Grid**: Bố cục linh hoạt đáp ứng hoàn hảo từ thiết bị di động (375px) đến màn hình lớn (1920px).

---

## 4. Cấu trúc thư mục dự án

```
travel-platform/
├── public/
│   ├── favicon.svg                  # Favicon thương hiệu Super EZ Tour
│   ├── images/                      # Thư mục hình ảnh
│   └── fonts/                       # Phông chữ nội bộ
├── src/
│   ├── assets/                      # Tài nguyên tĩnh
│   ├── constants/
│   │   └── brand.config.js          # Cấu hình thương hiệu Super EZ Tour tập trung
│   ├── components/
│   │   ├── common/                  # Component dùng chung
│   │   │   ├── Button/              # Nút bấm đa biến thể (primary, outline, dark, pill, loading)
│   │   │   ├── Container/           # Khung chứa chuẩn 1240px & container-fluid
│   │   │   ├── SectionHeading/      # Tiêu đề section chuẩn typography
│   │   │   ├── Dropdown/            # Dropdown tùy biến với animation
│   │   │   ├── Loading/             # Trạng thái tải trang
│   │   │   └── QuoteModal/          # Modal nhập form yêu cầu báo giá nhanh tương tác trực tiếp
│   │   └── layout/                  # Bố cục giao diện
│   │       ├── Header/              # Wordmark Super EZ Tour, Topbar, Main Nav, Sticky Header
│   │       ├── Footer/              # Footer hoàn chỉnh với pháp nhân độc lập, hotline 1900 8899
│   │       ├── MegaMenu/            # Mega Menu đa cấp 6 quốc gia & 16 điểm đến
│   │       ├── MobileMenu/          # Drawer menu di động chuẩn UX
│   │       └── FloatingActions/     # Cụm nút nổi: Chat 1:1, Báo giá, Hotline, Back to top
│   ├── pages/
│   │   └── Home/
│   │       ├── Home.jsx             # Trang chủ tổng hợp
│   │       ├── Home.css             # Style bổ trợ cho trang chủ
│   │       └── sections/            # 10 Phân khu chính của trang chủ
│   │           ├── HeroBanner/            # 5.2 Banner trượt lớn + bộ đếm slide
│   │           ├── DestinationNavigation/ # 5.3 Danh mục 6 quốc gia & 16 điểm đến
│   │           ├── WhyChooseUs/           # 5.10 Ba giá trị cốt lõi & số liệu minh họa
│   │           ├── DestinationMap/        # 5.6 Bản đồ tương tác mạng lưới 16 điểm đến Châu Á
│   │           ├── TravelThemes/          # 5.9 Năm chủ đề tour may đo độc quyền
│   │           ├── TravelReviews/         # 5.4 Hơn 85,000+ đánh giá xác thực & điểm số 4.95
│   │           ├── QuickQuote/            # 5.7 Tư vấn & Bảng trạng thái báo giá thời gian thực
│   │           ├── TravelVideos/          # 5.8 Video trải nghiệm thực tế + Video Modal
│   │           ├── TravelCommunity/       # 5.5 Diễn đàn 3 danh mục (Chuẩn bị, Hỏi đáp, Mẹo)
│   │           └── InstagramGallery/      # 5.11 Bộ sưu tập Instagram + Lightbox xem ảnh lớn
│   ├── data/                        # Mock data động mô phỏng hệ thống
│   │   ├── destinations.js          # Dữ liệu 6 quốc gia, 16 điểm đến, tọa độ bản đồ
│   │   ├── banners.js               # Dữ liệu 5 slide phong cảnh chất lượng cao
│   │   ├── reviews.js               # Dữ liệu đánh giá du khách
│   │   ├── community.js             # Dữ liệu bài viết cẩm nang du lịch
│   │   ├── quotes.js                # Dữ liệu trạng thái báo giá thời gian thực
│   │   ├── videos.js                # Dữ liệu video trải nghiệm du khách
│   │   ├── themes.js                # Dữ liệu 5 chủ đề tour
│   │   └── instagram.js             # Dữ liệu ảnh Instagram & tương tác
│   ├── styles/                      # Hệ thống Design System thuần CSS3
│   │   ├── variables.css            # Biến màu sắc, khoảng cách, font, shadow, z-index
│   │   ├── reset.css                # Reset chuẩn hiện đại
│   │   ├── typography.css           # Cỡ chữ, độ đậm, line-height chuẩn Plus Jakarta Sans
│   │   ├── animations.css           # Keyframes, fade, slide, pulseGlow, hover-zoom
│   │   └── global.css               # Lớp tiện ích chung & cấu hình Swiper
│   ├── App.jsx                      # Root Component quản lý state Modal & Live Quotes
│   └── main.jsx                     # Điểm khởi chạy ứng dụng
├── index.html                       # HTML gốc với SEO metadata Super EZ Tour
├── vite.config.js                   # Cấu hình Vite & Alias `@/`
└── package.json                     # Thông tin gói (super-ez-tour) và dependencies
```

---

## 5. Mạng lưới 6 Quốc Gia & 16 Điểm Đến Châu Á

1. **Philippines (🇵🇭):**
   - **Cebu:** Tour lặn ngắm cá mập voi Oslob & thám hiểm thác Kawasan.
   - **Boracay:** Bãi biển White Beach, ngắm hoàng hôn trên thuyền buồm Paraw riêng biệt.
   - **Bohol:** Đồi Socola kỳ vĩ, ngắm khỉ lùn Tarsier, lặn ngắm rùa biển Balicasag.
   - **Clark:** Tour golf chuyên biệt, thư giãn suối nước nóng Puning.
2. **Malaysia (🇲🇾):**
   - **Kota Kinabalu:** Ngắm hoàng hôn top 3 thế giới, tour du thuyền đom đóm thần tiên.
3. **Việt Nam (🇻🇳):**
   - **Đà Nẵng:** Cầu Vàng Bà Nà Hills, phố cổ Hội An thả hoa đăng, biển Mỹ Khê.
   - **Nha Trang:** Cano 4 đảo riêng biệt, tắm bùn khoáng nóng thư giãn.
   - **Hồ Chí Minh:** Đô thị sôi động, du thuyền ngắm hoàng hôn sông Sài Gòn, địa đạo Củ Chi.
   - **Phú Quốc:** Cáp treo Hòn Thơm, safari hoang dã, ngắm hoàng hôn Sunset Town.
   - **Hà Nội:** 36 phố phường nghìn năm văn hiến, du thuyền Vịnh Hạ Long, danh thắng Tràng An.
4. **Thái Lan (🇹🇭):**
   - **Bangkok:** Cung điện Hoàng Gia, du thuyền sông Chao Phraya, ẩm thực Michelin bản địa.
   - **Chiang Mai:** Du lịch chữa lành, cafe thiên nhiên, chùa Wat Phra That Doi Suthep.
   - **Phuket:** Quần đảo Phi Phi ngọc bích, cano khám phá vịnh Phang Nga.
5. **Đài Loan (🇹🇼):**
   - **Đài Bắc:** Dã Liễu, Cửu Phần Jiufen, thả đèn trời Thập Phần, chợ đêm Shilin.
   - **Cao Hùng:** Phật Quang Sơn tráng lệ, trung tâm nghệ thuật Pier-2, biển Khẩn Đinh.
6. **Indonesia (🇮🇩):**
   - **Bali:** Đón bình minh Cổng trời Lempuyang, ruộng bậc thang Ubud, đảo khủng long Nusa Penida.

---

## 6. Hướng dẫn cài đặt và khởi chạy

### Yêu cầu môi trường
- **Node.js**: Phiên bản 18+ trở lên.
- **Trình duyệt**: Chrome, Edge, Safari, Firefox phiên bản hiện đại.

### Các bước khởi chạy:

1. **Di chuyển vào thư mục dự án**:
   ```bash
   cd travel-platform
   ```

2. **Cài đặt các gói phụ thuộc (nếu chưa có `node_modules`)**:
   ```bash
   npm install
   ```

3. **Chạy máy chủ phát triển (Development Server)**:
   ```bash
   npm run dev
   ```
   Trình duyệt sẽ mở tại `http://localhost:3000` (hoặc cổng hiển thị trên terminal).

4. **Biên dịch bản sản xuất (Production Build)**:
   ```bash
   npm run build
   ```
   Bản dựng tối ưu hóa sẽ được xuất ra thư mục `dist/`.

5. **Xem thử bản sản xuất (Preview Build)**:
   ```bash
   npm run preview
   ```

---

## 7. Thông tin doanh nghiệp & Pháp nhân độc lập

- **Tên doanh nghiệp**: Công ty Cổ phần Du lịch Super EZ Tour (Super EZ Tour Travel JSC)
- **Đại diện pháp luật**: Trần Nhật Nam
- **Mã số doanh nghiệp**: 0318992288 (Sở KH&ĐT TP.HCM)
- **Giấy phép kinh doanh lữ hành quốc tế**: 79-1988/2024/TCDL-GP LHQT (Cục Du lịch Quốc gia Việt Nam)
- **Trụ sở chính**: Tầng 18, Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Q. Bình Thạnh, TP. Hồ Chí Minh
- **Văn phòng Hà Nội**: Tầng 9, Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội
- **Hotline CSKH**: 1900 8899 | **Điện thoại**: 028 7777 8899
- **Email**: booking@supereztour.com | support@supereztour.com
- **Website**: https://supereztour.com
- **Bản quyền**: Copyright © 2024 Super EZ Tour Corporation. All Rights Reserved.
