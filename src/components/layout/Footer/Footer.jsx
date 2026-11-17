import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin, ShieldCheck, Award, HeartHandshake, ExternalLink, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import './Footer.css';

const Footer = ({ onOpenQuoteModal }) => {
  return (
    <footer className="site-footer">
      {/* Upper CTA Banner */}
      <div className="footer-top-banner">
        <div className="container footer-banner-container">
          <div className="banner-text-group">
            <span className="banner-badge">HỖ TRỢ TƯ VẤN 24/7 MIỄN PHÍ</span>
            <h3 className="banner-heading">Bạn đang lên kế hoạch du lịch cho gia đình hoặc công ty?</h3>
            <p className="banner-desc">
              Chỉ mất 1 phút gửi yêu cầu, {BRAND_CONFIG.brandName} sẽ gửi lịch trình thiết kế riêng và báo giá tốt nhất trong 30 phút.
            </p>
          </div>
          <div className="banner-actions">
            <button
              type="button"
              className="banner-quote-btn"
              onClick={onOpenQuoteModal}
            >
              Yêu cầu báo giá nhanh
            </button>
            <a href={`tel:${BRAND_CONFIG.contact.hotline.replace(/\s+/g, '')}`} className="banner-phone-btn">
              <Phone size={18} />
              <span>Hotline {BRAND_CONFIG.contact.hotline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Information */}
      <div className="footer-main">
        <div className="container footer-container">
          <div className="footer-grid">
            {/* Column 1: Brand & Hotline */}
            <div className="footer-col brand-col">
              <div className="footer-brand">
                <a href="/" className="footer-brand-logo-link" aria-label={BRAND_CONFIG.brandName}>
                  <img
                    src={BRAND_CONFIG.logo}
                    alt={BRAND_CONFIG.brandName}
                    className="footer-logo-img"
                  />
                </a>
              </div>
              <p className="footer-brand-desc">
                {BRAND_CONFIG.taglineLong}. Cam kết 100% tour riêng không ghép khách lạ, 
                xe đưa đón đời mới, hướng dẫn viên chuyên nghiệp và an tâm tuyệt đối với dịch vụ chuẩn quốc tế.
              </p>

              <div className="footer-hotline-card">
                <div className="hotline-icon-wrap">
                  <Phone size={22} />
                </div>
                <div className="hotline-details">
                  <span className="hotline-label">TRUNG TÂM CSKH / TƯ VẤN ĐẶT TOUR</span>
                  <a href={`tel:${BRAND_CONFIG.contact.hotline.replace(/\s+/g, '')}`} className="hotline-number">
                    {BRAND_CONFIG.contact.hotline}
                  </a>
                  <span className="hotline-hours">{BRAND_CONFIG.contact.workingHours}</span>
                </div>
              </div>

              <div className="footer-safety-badge">
                <ShieldCheck size={20} className="safety-icon" />
                <div className="safety-text">
                  <strong>Bảo hiểm du lịch quốc tế toàn diện</strong>
                  <span>Bảo chứng bởi các đối tác bảo hiểm lữ hành uy tín hàng đầu</span>
                </div>
              </div>
            </div>

            {/* Column 2: 10 Vietnam Destinations */}
            <div className="footer-col">
              <h4 className="footer-col-title">베트남 10대 명품 여행지</h4>
              <ul className="footer-branch-list">
                <li>
                  <strong>북부:</strong> 하노이 · 사파 · 하롱베이 · 닌빈
                </li>
                <li>
                  <strong>중부:</strong>{' '}
                  <Link to="/destinations/da-nang" className="footer-danang-highlight">
                    다낭 (3D 투어 오픈)
                  </Link>{' '}
                  · 후에 · 나트랑 · 달랏
                </li>
                <li>
                  <strong>남부:</strong> 호찌민 · 푸꾸옥
                </li>
              </ul>
              <div className="footer-danang-cta-box">
                <Sparkles size={14} className="text-gold" />
                <span>다낭 3D 인터랙티브 가상투어 상시 운영 중</span>
              </div>
            </div>

            {/* Column 3: Quick Links & Services */}
            <div className="footer-col">
              <h4 className="footer-col-title">Dịch vụ & Tiện ích</h4>
              <ul className="footer-links-list">
                <li><a href="#destinations">Danh mục tour 16 điểm đến</a></li>
                <li><a href="#themes">Tour gia đình 3 thế hệ</a></li>
                <li><a href="#themes">Tour cặp đôi & Trăng mật</a></li>
                <li><a href="#reviews">Đánh giá từ {BRAND_CONFIG.stats.customersServed} du khách</a></li>
                <li><a href="#quote">Tra cứu tiến độ báo giá</a></li>
                <li><a href="#community">Cẩm nang & Mẹo du lịch Châu Á</a></li>
                <li><a href="#why-us">Cam kết tour riêng không ghép đoàn</a></li>
                <li><a href="#map">Bản đồ hành trình mạng lưới</a></li>
              </ul>
            </div>

            {/* Column 4: Official Social Channels */}
            <div className="footer-col">
              <h4 className="footer-col-title">Kết nối với {BRAND_CONFIG.brandName}</h4>
              <p className="footer-text-sm">
                Theo dõi các chương trình ưu đãi, hình ảnh du khách thực tế và cẩm nang du lịch mới nhất mỗi ngày:
              </p>
              <div className="footer-social-grid">
                <a
                  href={BRAND_CONFIG.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn facebook"
                >
                  <span className="social-badge">f</span>
                  <span>Facebook Fanpage</span>
                </a>
                <a
                  href={BRAND_CONFIG.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn instagram"
                >
                  <span>Instagram @supereztour.vn</span>
                </a>
                <a
                  href={BRAND_CONFIG.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn youtube"
                >
                  <span>YouTube Super EZ Tour TV</span>
                </a>
                <a
                  href={BRAND_CONFIG.social.zalo}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn zalo"
                >
                  <span className="social-badge">Z</span>
                  <span>Zalo OA Tư Vấn 1:1</span>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-divider" />

          {/* Legal Business Information */}
          <div className="footer-legal-info">
            <div className="legal-links">
              <a href="#intro" className="legal-link bold">Giới thiệu {BRAND_CONFIG.brandName}</a>
              <span className="dot">·</span>
              <a href="#terms" className="legal-link">Điều khoản dịch vụ</a>
              <span className="dot">·</span>
              <a href="#privacy" className="legal-link bold privacy">Chính sách bảo mật thông tin</a>
              <span className="dot">·</span>
              <a href="#insurance" className="legal-link">Quy định bảo hiểm du lịch</a>
              <span className="dot">·</span>
              <a href="#partnership" className="legal-link">Hợp tác đại lý & B2B</a>
            </div>

            <div className="business-details">
              <p>
                <strong>Tên công ty:</strong> {BRAND_CONFIG.legal.companyName} ({BRAND_CONFIG.legal.companyNameEn}) | <strong>Đại diện pháp luật:</strong> {BRAND_CONFIG.legal.representative}
              </p>
              <p>
                <strong>Mã số doanh nghiệp:</strong> {BRAND_CONFIG.legal.businessLicense} | <strong>Giấy phép kinh doanh lữ hành quốc tế:</strong> {BRAND_CONFIG.legal.travelLicense}
              </p>
              <p>
                <strong>Trụ sở chính:</strong> {BRAND_CONFIG.legal.headquarters}
              </p>
              <p>
                <strong>Văn phòng Hà Nội:</strong> {BRAND_CONFIG.legal.hanoiOffice}
              </p>
              <p>
                <strong>Email hỗ trợ:</strong> <a href={`mailto:${BRAND_CONFIG.contact.email}`}>{BRAND_CONFIG.contact.email}</a> | <strong>Hotline:</strong> {BRAND_CONFIG.contact.hotline} | <strong>Điện thoại:</strong> {BRAND_CONFIG.contact.tel}
              </p>
            </div>

            <p className="footer-copyright">
              Copyright © 2024 {BRAND_CONFIG.brandName} Corporation. All Rights Reserved. {BRAND_CONFIG.slogan}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
