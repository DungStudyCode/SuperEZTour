import logoImg from '../assets/logo.png';

/**
 * Super EZ Tour - Brand Configuration
 * Quản lý tập trung toàn bộ nhận diện và thông tin thương hiệu Super EZ Tour
 */

export const BRAND_CONFIG = {
  // Brand Identity
  brandName: 'Super EZ Tour',
  brandShortName: 'EZ Tour',
  logo: logoImg,
  logoDark: logoImg,
  tagline: 'Tour riêng 100% · Không ghép đoàn',
  taglineLong: 'Nền tảng đặt tour riêng tư, lịch trình linh hoạt hàng đầu Châu Á',
  slogan: 'Tour riêng 100% · Không ghép đoàn',
  
  // Value Propositions
  keyPillars: [
    {
      title: 'Tour riêng 100%',
      desc: 'Toàn bộ hành trình dành riêng cho bạn và gia đình, không ghép khách lạ.',
    },
    {
      title: 'Lịch trình linh hoạt',
      desc: 'Tự do tùy chỉnh điểm đến, thời gian xuất phát và tốc độ trải nghiệm theo ý muốn.',
    },
    {
      title: 'Dịch vụ chuyên nghiệp',
      desc: 'Xe riêng đời mới, hướng dẫn viên chuyên tuyến tận tâm và bảo hiểm du lịch quốc tế.',
    },
  ],

  // Contact Information (Độc lập, không dùng thông tin cũ)
  contact: {
    hotline: '1900 8899',
    hotlineDisplay: '1900 8899',
    tel: '028 7777 8899',
    emergencyPhone: '0909 888 999',
    email: 'booking@supereztour.com',
    supportEmail: 'support@supereztour.com',
    website: 'https://supereztour.com',
    workingHours: 'Thứ 2 - Thứ 7: 08:30 ~ 18:00 (Hỗ trợ khẩn cấp 24/7)',
  },

  // Legal & Registration Information
  legal: {
    companyName: 'Công ty Cổ phần Du lịch Super EZ Tour',
    companyNameEn: 'Super EZ Tour Travel Joint Stock Company',
    representative: 'Trần Nhật Nam',
    businessLicense: '0318992288 do Sở KH&ĐT TP.HCM cấp ngày 15/03/2021',
    travelLicense: '79-1988/2024/TCDL-GP LHQT (Cục Du lịch Quốc gia Việt Nam)',
    headquarters: 'Tầng 18, Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Q. Bình Thạnh, TP. Hồ Chí Minh',
    hanoiOffice: 'Tầng 9, Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội',
    daNangOffice: 'Tầng 6, Indochina Riverside Towers, 74 Bạch Đằng, Hải Châu, Đà Nẵng',
  },

  // Social Media & Community Links
  social: {
    facebook: 'https://facebook.com/supereztour.official',
    youtube: 'https://youtube.com/@supereztour',
    instagram: 'https://instagram.com/supereztour.vn',
    tiktok: 'https://tiktok.com/@supereztour',
    zalo: 'https://zalo.me/supereztour',
  },

  // Brand Colors
  colors: {
    primary: '#ED2028',
    primaryHover: '#D0161D',
    primaryLight: '#FFF0F0',
    dark: '#111827',
    darkSecondary: '#374151',
    light: '#FFFFFF',
    border: '#E5E7EB',
  },

  // Brand Stats
  stats: {
    experienceYears: '8+',
    countriesCount: 6,
    destinationsCount: 16,
    customersServed: '85,000+',
    satisfactionRate: '99.2%',
  },
};

export default BRAND_CONFIG;
