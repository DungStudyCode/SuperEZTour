import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { BRAND_CONFIG } from '../../../../constants/brand.config';
import './DestinationFooter.css';

const DestinationFooter = ({ destination }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="dest-footer" id="footer">
      <div className="dest-container">
        {/* Top Strip */}
        <div className="dest-footer-top">
          <div className="dest-footer-brand-col">
            <a href="/" className="dest-footer-logo-link" title="Về trang chủ Super EZ Tour">
              <img src={BRAND_CONFIG.logo} alt={BRAND_CONFIG.brandName} className="dest-footer-logo-img" />
            </a>
            <p className="dest-footer-slogan">
              {BRAND_CONFIG.slogan} · Nền tảng tour riêng cao cấp hàng đầu Châu Á
            </p>
            <div className="dest-footer-hotline-box">
              <span className="dest-footer-hotline-lbl">Tổng đài tư vấn 24/7</span>
              <a href="tel:19008899" className="dest-footer-hotline-val">
                <Phone size={18} />
                <span>1900 8899</span>
              </a>
            </div>
          </div>

          <div className="dest-footer-nav-col">
            <h4 className="dest-footer-col-title">Hệ Sinh Thái Dịch Vụ</h4>
            <ul className="dest-footer-links">
              <li><a href="#accommodation">01. Lưu trú 4-5 sao & Resort</a></li>
              <li><a href="#guide">02. Hướng dẫn viên bản địa 1:1</a></li>
              <li><a href="#flights">03. Vé máy bay & Giờ bay đẹp</a></li>
              <li><a href="#transportation">04. Xe riêng & Limousine VIP</a></li>
              <li><a href="#attractions">05. Tọa độ tham quan độc bản</a></li>
              <li><a href="#culinary">06. Ẩm thực đặc sản miền Trung</a></li>
            </ul>
          </div>

          <div className="dest-footer-nav-col">
            <h4 className="dest-footer-col-title">Mạng Lưới 6 Quốc Gia</h4>
            <ul className="dest-footer-links">
              <li><a href="/destinations/da-nang">🇻🇳 Việt Nam (Đà Nẵng, Nha Trang, Phú Quốc, Hà Nội)</a></li>
              <li><a href="/">🇵🇭 Philippines (Cebu, Boracay, Bohol, Clark)</a></li>
              <li><a href="/">🇹🇭 Thái Lan (Bangkok, Chiang Mai, Phuket)</a></li>
              <li><a href="/">🇲🇾 Malaysia (Kota Kinabalu)</a></li>
              <li><a href="/">🇹🇼 Đài Loan (Đài Bắc, Cao Hùng)</a></li>
              <li><a href="/">🇮🇩 Indonesia (Bali)</a></li>
            </ul>
          </div>

          <div className="dest-footer-nav-col">
            <h4 className="dest-footer-col-title">Văn Phòng Điều Hành</h4>
            <div className="dest-footer-addresses">
              <div className="dest-footer-addr-item">
                <MapPin size={14} className="dest-footer-pin" />
                <span><strong>Đà Nẵng:</strong> {BRAND_CONFIG.legal.daNangOffice}</span>
              </div>
              <div className="dest-footer-addr-item">
                <MapPin size={14} className="dest-footer-pin" />
                <span><strong>TP. HCM:</strong> {BRAND_CONFIG.legal.headquarters}</span>
              </div>
              <div className="dest-footer-addr-item">
                <MapPin size={14} className="dest-footer-pin" />
                <span><strong>Hà Nội:</strong> {BRAND_CONFIG.legal.hanoiOffice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Compliance Strip */}
        <div className="dest-footer-middle">
          <div className="dest-footer-legal-box">
            <div className="dest-legal-badge">
              <ShieldCheck size={16} />
              <span>Pháp nhân được cấp phép lữ hành quốc tế</span>
            </div>
            <p>
              <strong>{BRAND_CONFIG.legal.companyName}</strong> · GP LHQT: {BRAND_CONFIG.legal.travelLicense} do Cục Du lịch Quốc gia Việt Nam cấp.
            </p>
            <p>
              Mã số doanh nghiệp: {BRAND_CONFIG.legal.businessLicense}. Đại diện pháp luật: {BRAND_CONFIG.legal.representative}.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="dest-footer-bottom">
          <p className="dest-footer-copy">
            {BRAND_CONFIG.legal.companyName}. All Rights Reserved. Slogan: {BRAND_CONFIG.slogan}.
          </p>

          <button type="button" className="dest-footer-backtotop" onClick={scrollToTop}>
            <span>Về đầu trang</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default DestinationFooter;