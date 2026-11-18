import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import { useLanguage } from '../../../context/LanguageContext';
import './Footer.css';

const Footer = ({ onOpenQuoteModal }) => {
  const { t, isKorean } = useLanguage();

  return (
    <footer className="site-footer">
      {/* Upper CTA Banner */}
      <div className="footer-top-banner">
        <div className="container footer-banner-container">
          <div className="banner-text-group">
            <span className="banner-badge">
              {t('footer.badge', '24/7 무료 1:1 상담 지원')}
            </span>
            <h3 className="banner-heading">
              {t('footer.heading', '베트남 프라이빗 여행을 계획 중이신가요?')}
            </h3>
            <p className="banner-desc">
              {t('footer.desc', '1분 만에 문의를 남겨주시면, 전담 매니저가 30분 이내에 맞춤 단독 일정과 최적의 견적서를 제안해 드립니다.')}
            </p>
          </div>
          <div className="banner-actions">
            <button
              type="button"
              className="banner-quote-btn"
              onClick={onOpenQuoteModal}
            >
              {t('footer.requestQuote', '30분 빠른 견적 요청')}
            </button>
            <a href={`tel:${BRAND_CONFIG.contact.hotline.replace(/\s+/g, '')}`} className="banner-phone-btn">
              <Phone size={17} />
              <span>{BRAND_CONFIG.contact.hotline}</span>
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
                <Link to="/" className="footer-brand-logo-link" aria-label={BRAND_CONFIG.brandName}>
                  <img
                    src={BRAND_CONFIG.logo}
                    alt={BRAND_CONFIG.brandName}
                    className="footer-logo-img"
                  />
                </Link>
              </div>
              <p className="footer-brand-desc">
                {isKorean
                  ? '베트남 10대 명품 여행지 100% 단독 프라이빗 투어 전문. 타인과의 합승 없이, 오직 우리 일행만을 위한 최신 전용 차량과 1:1 전담 가이드로 완성되는 프리미엄 여정을 약속합니다.'
                  : 'Chuyên tổ chức tour riêng cao cấp 100% không ghép đoàn tại 10 điểm đến hàng đầu Việt Nam. Xe riêng đời mới, hướng dẫn viên tận tâm, an tâm tuyệt đối chuẩn quốc tế.'}
              </p>

              <div className="footer-hotline-card">
                <div className="hotline-icon-wrap">
                  <Phone size={20} />
                </div>
                <div className="hotline-details">
                  <span className="hotline-label">
                    {isKorean ? '고객센터 & 24시간 실시간 상담' : 'TRUNG TÂM CSKH / TƯ VẤN ĐẶT TOUR'}
                  </span>
                  <a href={`tel:${BRAND_CONFIG.contact.hotline.replace(/\s+/g, '')}`} className="hotline-number">
                    {BRAND_CONFIG.contact.hotline}
                  </a>
                  <span className="hotline-hours">
                    {isKorean ? '연중무휴 24시간 긴급 케어 상시 운영' : BRAND_CONFIG.contact.workingHours}
                  </span>
                </div>
              </div>

              <div className="footer-safety-badge">
                <ShieldCheck size={20} className="safety-icon" />
                <div className="safety-text">
                  <strong>{isKorean ? '해외 여행자 보험 풀 커버리지' : 'Bảo hiểm du lịch toàn diện'}</strong>
                  <span>{isKorean ? '정식 인가 여행사 안심 보증 시스템 완비' : 'Bảo chứng bởi các đối tác bảo hiểm uy tín hàng đầu'}</span>
                </div>
              </div>
            </div>

            {/* Column 2: 10 Vietnam Destinations */}
            <div className="footer-col">
              <h4 className="footer-col-title">
                {isKorean ? '베트남 10대 명품 여행지' : '10 Điểm Đến Hàng Đầu'}
              </h4>
              <ul className="footer-branch-list">
                <li>
                  <strong>{isKorean ? '북부:' : 'Miền Bắc:'}</strong>{' '}
                  {isKorean ? '하노이 · 사파 · 하롱베이 · 닌빈' : 'Hà Nội · Sa Pa · Hạ Long · Ninh Bình'}
                </li>
                <li>
                  <strong>{isKorean ? '중부:' : 'Miền Trung:'}</strong>{' '}
                  <Link to="/destinations/da-nang" className="footer-danang-highlight">
                    {isKorean ? '다낭 (3D 투어 오픈)' : 'Đà Nẵng (Tour 3D)'}
                  </Link>{' '}
                  · {isKorean ? '후에 · 나트랑 · 달랏' : 'Huế · Nha Trang · Đà Lạt'}
                </li>
                <li>
                  <strong>{isKorean ? '남부:' : 'Miền Nam:'}</strong>{' '}
                  {isKorean ? '호찌민 · 푸꾸옥' : 'Hồ Chí Minh · Phú Quốc'}
                </li>
              </ul>
              <div className="footer-danang-cta-box">
                <Sparkles size={14} className="text-orange" />
                <span>
                  {isKorean
                    ? '다낭 3D 인터랙티브 가상투어 상시 운영 중'
                    : 'Tour 3D tương tác Đà Nẵng đang mở trải nghiệm'}
                </span>
              </div>
            </div>

            {/* Column 3: Quick Links & Services */}
            <div className="footer-col">
              <h4 className="footer-col-title">
                {isKorean ? '서비스 & 테마 여행' : 'Dịch vụ & Tiện ích'}
              </h4>
              <ul className="footer-links-list">
                <li>
                  <a href="#destinations">
                    {isKorean ? '10대 명품 여행지 갤러리' : 'Danh mục 10 điểm đến'}
                  </a>
                </li>
                <li>
                  <a href="#signature-journeys">
                    {isKorean ? '시그니처 프라이빗 투어' : 'Hành trình Private Signature'}
                  </a>
                </li>
                <li>
                  <a href="#travel-services">
                    {isKorean ? '8대 프리미엄 여행 서비스' : '8 Dịch vụ du lịch cao cấp'}
                  </a>
                </li>
                <li>
                  <a href="#travel-themes">
                    {isKorean ? '8대 시그니처 테마 여행' : 'Tour theo chủ đề'}
                  </a>
                </li>
                <li>
                  <a href="#reviews">
                    {isKorean ? '85,000+ 실제 고객 후기' : 'Đánh giá từ khách hàng'}
                  </a>
                </li>
                <li>
                  <a href="#why-us">
                    {isKorean ? 'Super EZ Tour만의 특권 비교' : 'Cam kết không ghép đoàn'}
                  </a>
                </li>
                <li>
                  <a href="#quick-quote">
                    {isKorean ? '실시간 견적 & 상담 신청' : 'Tra cứu báo giá nhanh'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Official Social Channels */}
            <div className="footer-col">
              <h4 className="footer-col-title">
                {isKorean ? '실시간 상담 채널' : `Kết nối với ${BRAND_CONFIG.brandName}`}
              </h4>
              <p className="footer-text-sm">
                {isKorean
                  ? '카카오톡 및 고객센터를 통해 1:1 전담 매니저의 실시간 상담을 받아보실 수 있습니다:'
                  : 'Theo dõi các chương trình ưu đãi, hình ảnh thực tế và cẩm nang du lịch mới nhất mỗi ngày:'}
              </p>
              <div className="footer-social-grid">
                <button
                  type="button"
                  className="social-btn kakao-channel"
                  onClick={() => onOpenQuoteModal && onOpenQuoteModal('kakao')}
                >
                  <span className="social-badge">K</span>
                  <span>{isKorean ? '카카오톡 1:1 상담 (@superez)' : 'KakaoTalk 1:1'}</span>
                </button>
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
                  <span>Instagram @supereztour</span>
                </a>
                <a
                  href={BRAND_CONFIG.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn youtube"
                >
                  <span>YouTube Super EZ Tour</span>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-divider" />

          {/* Legal Business Information */}
          <div className="footer-legal-info">
            <div className="legal-links">
              <a href="#intro" className="legal-link bold">
                {isKorean ? '회사 소개' : `Giới thiệu ${BRAND_CONFIG.brandName}`}
              </a>
              <span className="dot">·</span>
              <a href="#terms" className="legal-link">
                {isKorean ? '이용 약관' : 'Điều khoản dịch vụ'}
              </a>
              <span className="dot">·</span>
              <a href="#privacy" className="legal-link bold privacy">
                {isKorean ? '개인정보 처리방침' : 'Chính sách bảo mật'}
              </a>
              <span className="dot">·</span>
              <a href="#insurance" className="legal-link">
                {isKorean ? '여행자 보험 규정' : 'Quy định bảo hiểm du lịch'}
              </a>
              <span className="dot">·</span>
              <a href="#partnership" className="legal-link">
                {isKorean ? '제휴 및 B2B 문의' : 'Hợp tác đại lý & B2B'}
              </a>
            </div>

            <div className="business-details">
              <p>
                <strong>{isKorean ? '상호명:' : 'Tên công ty:'}</strong> {BRAND_CONFIG.legal.companyName} ({BRAND_CONFIG.legal.companyNameEn}) |{' '}
                <strong>{isKorean ? '대표자:' : 'Đại diện:'}</strong> {BRAND_CONFIG.legal.representative}
              </p>
              <p>
                <strong>{isKorean ? '사업자등록번호:' : 'Mã số doanh nghiệp:'}</strong> {BRAND_CONFIG.legal.businessLicense} |{' '}
                <strong>{isKorean ? '관광사업등록번호:' : 'Giấy phép lữ hành quốc tế:'}</strong> {BRAND_CONFIG.legal.travelLicense}
              </p>
              <p>
                <strong>{isKorean ? '본사 주소:' : 'Trụ sở chính:'}</strong> {BRAND_CONFIG.legal.headquarters}
              </p>
              <p>
                <strong>{isKorean ? '하노이 지사:' : 'Văn phòng Hà Nội:'}</strong> {BRAND_CONFIG.legal.hanoiOffice}
              </p>
              <p>
                <strong>Email:</strong> <a href={`mailto:${BRAND_CONFIG.contact.email}`}>{BRAND_CONFIG.contact.email}</a> |{' '}
                <strong>Hotline:</strong> {BRAND_CONFIG.contact.hotline}
              </p>
            </div>

            <p className="footer-copyright">
              Copyright © 2026 {BRAND_CONFIG.brandName} Travel Corporation. All Rights Reserved. {BRAND_CONFIG.slogan}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
