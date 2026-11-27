import React from 'react';
import { Phone, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';
import { BRAND_CONFIG, companyInfo } from '../../../../constants/brand.config';
import { useLanguage } from '../../../../context/LanguageContext';
import './DestinationFooter.css';

const DestinationFooter = ({ destination }) => {
  const { isKorean } = useLanguage();
  const destName = isKorean
    ? destination?.nameKr || destination?.name || '베트남'
    : destination?.name || 'Việt Nam';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="dest-footer" id="footer">
      <div className="dest-container">
        {/* Top Strip */}
        <div className="dest-footer-top">
          <div className="dest-footer-brand-col">
            <a href="/" className="dest-footer-logo-link" title={isKorean ? 'Super EZ Tour 홈으로' : 'Về trang chủ Super EZ Tour'}>
              <img src={BRAND_CONFIG.logo} alt={BRAND_CONFIG.brandName} className="dest-footer-logo-img" />
            </a>
            <p className="dest-footer-slogan">
              {isKorean
                ? 'Super EZ Tour · 아시아 최고의 100% 프라이빗 맞춤 여행 플랫폼'
                : `${BRAND_CONFIG.slogan} · Nền tảng tour riêng cao cấp hàng đầu Châu Á`}
            </p>
          </div>

          <div className="dest-footer-nav-col">
            <h4 className="dest-footer-col-title">
              {isKorean ? '6대 프리미엄 서비스' : 'Hệ Sinh Thái Dịch Vụ'}
            </h4>
            <ul className="dest-footer-links">
              <li>
                <a href={destination?.id === 'ha-noi' ? '#trip-builder' : '#accommodation'}>
                  {isKorean ? '01. 4~5성급 특급 호텔 & 럭셔리 리조트' : '01. Lưu trú 4-5 sao & Resort'}
                </a>
              </li>
              <li>
                <a href={destination?.id === 'ha-noi' ? '#trip-builder' : '#guide'}>
                  {isKorean ? '02. 1:1 전담 현지 한국어 가이드' : '02. Hướng dẫn viên bản địa 1:1'}
                </a>
              </li>
              <li>
                <a href={destination?.id === 'ha-noi' ? '#trip-builder' : '#flights'}>
                  {isKorean
                    ? `03. 최적 항공권 & ${destination?.airportCode || 'DAD'} 공항 픽업 연결`
                    : `03. Vé máy bay & Đón tiễn sân bay ${destination?.airportCode || 'DAD'}`}
                </a>
              </li>
              <li>
                <a href={destination?.id === 'ha-noi' ? '#trip-builder' : '#transportation'}>
                  {isKorean ? '04. 전용 단독 차량 & VIP 리무진' : '04. Xe riêng & Limousine VIP'}
                </a>
              </li>
              <li>
                <a href="#attractions">
                  {isKorean ? `05. ${destName} 시그니처 명소 & 프라이빗 투어` : `05. Tọa độ tham quan độc bản ${destName}`}
                </a>
              </li>
              <li>
                <a href={destination?.id === 'ha-noi' ? '#hanoi-taste' : '#culinary'}>
                  {isKorean ? `06. ${destName} 미식 큐레이션 & 파인다이닝` : `06. Ẩm thực đặc sản ${destName}`}
                </a>
              </li>
            </ul>
          </div>

          <div className="dest-footer-nav-col">
            <h4 className="dest-footer-col-title">
              {isKorean ? '아시아 6개국 프라이빗 네트워크' : 'Mạng Lưới 6 Quốc Gia'}
            </h4>
            <ul className="dest-footer-links">
              <li>
                <a href="/destinations/da-nang">
                  {isKorean ? '🇻🇳 베트남 (다낭, 나트랑, 푸꾸옥, 하노이)' : '🇻🇳 Việt Nam (Đà Nẵng, Nha Trang, Phú Quốc, Hà Nội)'}
                </a>
              </li>
              <li>
                <a href="/">
                  {isKorean ? '🇵🇭 필리핀 (세부, 보라카이, 보홀, 클락)' : '🇵🇭 Philippines (Cebu, Boracay, Bohol, Clark)'}
                </a>
              </li>
              <li>
                <a href="/">
                  {isKorean ? '🇹🇭 태국 (방콕, 치앙마이, 푸켓)' : '🇹🇭 Thái Lan (Bangkok, Chiang Mai, Phuket)'}
                </a>
              </li>
              <li>
                <a href="/">
                  {isKorean ? '🇲🇾 말레이시아 (코타키나발루)' : '🇲🇾 Malaysia (Kota Kinabalu)'}
                </a>
              </li>
              <li>
                <a href="/">
                  {isKorean ? '🇹🇼 대만 (타이베이, 가오슝)' : '🇹🇼 Đài Loan (Đài Bắc, Cao Hùng)'}
                </a>
              </li>
              <li>
                <a href="/">
                  {isKorean ? '🇮🇩 인도네시아 (발리)' : '🇮🇩 Indonesia (Bali)'}
                </a>
              </li>
            </ul>
          </div>

          <div className="dest-footer-nav-col">
            <h4 className="dest-footer-col-title">
              {isKorean ? '프라이빗 컨시어지' : 'Dịch Vụ Concierge'}
            </h4>
            <div className="dest-footer-addresses">
              <div className="dest-footer-addr-item">
                <MapPin size={14} className="dest-footer-pin" />
                <span>
                  <strong>{isKorean ? '맞춤 상담:' : 'Tư vấn riêng:'}</strong> {isKorean ? '100% 프라이빗 1:1 일정 설계' : 'Thiết kế hành trình riêng 100%'}
                </span>
              </div>
              <div className="dest-footer-addr-item">
                <ShieldCheck size={14} className="dest-footer-pin" />
                <span>
                  <strong>{isKorean ? '케어 서비스:' : 'Tiêu chuẩn:'}</strong> {isKorean ? '현지 한국어 전담 가이드' : 'HDV bản địa tận tâm & xe riêng VIP'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Compliance Strip (Rendered only when verified) */}
        {companyInfo.legal?.isVerified && (
          <div className="dest-footer-middle">
            <div className="dest-footer-legal-box">
              <div className="dest-legal-badge">
                <ShieldCheck size={16} />
                <span>
                  {isKorean
                    ? '베트남 국가관광국 공인 국제여행업 정식 면허 보유 법인'
                    : 'Pháp nhân được cấp phép lữ hành quốc tế'}
                </span>
              </div>
              <p>
                <strong>{companyInfo.legal.legalName}</strong>
                {companyInfo.legal.travelLicense ? ` · GP LHQT: ${companyInfo.legal.travelLicense}` : ''}
              </p>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="dest-footer-bottom">
          <p className="dest-footer-copy">
            © {new Date().getFullYear()} {BRAND_CONFIG.brandName}. All Rights Reserved.
          </p>

          <button type="button" className="dest-footer-backtotop" onClick={scrollToTop}>
            <span>{isKorean ? '맨 위로 이동' : 'Về đầu trang'}</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default DestinationFooter;
