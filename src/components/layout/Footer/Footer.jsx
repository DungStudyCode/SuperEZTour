import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BRAND_CONFIG, companyInfo } from '../../../constants/brand.config';
import { useLanguage } from '../../../context/LanguageContext';
import './Footer.css';

/**
 * Super EZ Tour — Luxury Editorial Footer
 *
 * Three-Layer Structure:
 * - Layer 1: Brand Statement (Eyebrow + "Your Vietnam. Your Journey." + "Khám phá điểm đến" CTA)
 * - Layer 2: Compact Navigation & Verified Contact (Explore, Super EZ Tour, Verified Social if any)
 * - Layer 3: Minimal Copyright & Expandable Legal (Dynamic year, zero unverified credentials)
 *
 * Config-driven, production-safe, bilingual KO/VI.
 */
const Footer = ({ onOpenQuoteModal }) => {
  const { t, isKorean } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  // Smooth scroll or cross-page navigation to specific sections
  const handleScrollToSection = (sectionId, e) => {
    if (e) e.preventDefault();

    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const handleOpenConsultation = () => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal({ source: 'footer' });
    }
  };

  // Check if any verified social or contact channels exist
  const hasVerifiedSocial = Boolean(
    companyInfo.social?.isVerified &&
      (companyInfo.social.kakaoTalk ||
        companyInfo.social.facebook ||
        companyInfo.social.instagram ||
        companyInfo.social.youtube ||
        companyInfo.social.zalo)
  );

  const hasVerifiedContact = Boolean(
    companyInfo.contact?.isVerified &&
      (companyInfo.contact.hotline || companyInfo.contact.email)
  );

  const showGroupC = hasVerifiedSocial || hasVerifiedContact;

  // Check if any verified legal business credentials exist
  const hasVerifiedLegal = Boolean(
    companyInfo.legal?.isVerified &&
      (companyInfo.legal.legalName ||
        companyInfo.legal.registrationNumber ||
        companyInfo.legal.travelLicense ||
        companyInfo.legal.headquarters)
  );

  return (
    <footer className="luxury-editorial-footer" role="contentinfo" aria-label="Site Footer">
      <div className="footer-container">
        {/* =========================================================
            LAYER 1 — BRAND STATEMENT & DISCOVERY CTA
        ========================================================= */}
        <div className="footer-layer-statement">
          <div className="statement-content-left">
            <span className="statement-eyebrow">
              <Sparkles size={12} className="statement-sparkle" />
              <span>{t('footer.brandEyebrow', 'SUPER EZ TOUR · PRIVATE JOURNEYS')}</span>
            </span>

            <h2 className="statement-headline">
              {t('footer.brandHeadline', 'Your Vietnam. Your Journey.')}
            </h2>

            <p className="statement-desc">
              {t(
                'footer.brandDesc',
                isKorean
                  ? '취향과 여행 스타일에 맞춰 설계하는 나만의 베트남 프라이빗 여행.'
                  : 'Khám phá Việt Nam theo cách riêng của bạn, với những hành trình được thiết kế linh hoạt theo sở thích và nhu cầu.'
              )}
            </p>
          </div>

          <div className="statement-action-right">
            <button
              type="button"
              className="statement-explore-cta"
              onClick={(e) => handleScrollToSection('destinations', e)}
              aria-label={t('footer.brandCta', isKorean ? '여행지 둘러보기' : 'Khám phá điểm đến')}
            >
              <span>{t('footer.brandCta', isKorean ? '여행지 둘러보기' : 'Khám phá điểm đến')}</span>
              <ArrowRight size={16} className="cta-arrow" />
            </button>
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="footer-hairline" aria-hidden="true" />

        {/* =========================================================
            LAYER 2 — NAVIGATION & CONTACT CHANNELS
        ========================================================= */}
        <div className={`footer-layer-navigation ${showGroupC ? 'has-four-cols' : 'has-three-cols'}`}>
          {/* Brand Identity Block */}
          <div className="footer-nav-col brand-identity-col">
            <Link
              to="/"
              className="footer-brand-logo-link"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label={BRAND_CONFIG.brandName}
            >
              <div className="footer-brand-plate">
                <img
                  src={BRAND_CONFIG.logo}
                  alt={BRAND_CONFIG.brandName}
                  className="footer-brand-logo-img"
                  width="147"
                  height="32"
                  loading="lazy"
                />
              </div>
            </Link>
            <p className="footer-brand-essence">
              {isKorean ? '베트남 100% 단독 맞춤 여행' : 'Du lịch riêng 100% không ghép đoàn'}
            </p>
          </div>

          {/* Group A — Explore */}
          <div className="footer-nav-col">
            <h3 className="footer-col-title">
              {t('footer.groupExplore', isKorean ? '여행 탐색' : 'Khám phá')}
            </h3>
            <ul className="footer-link-list">
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={(e) => handleScrollToSection('destinations', e)}
                >
                  {t('footer.linkDestinations', isKorean ? '베트남 여행지' : 'Điểm đến Việt Nam')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={(e) => handleScrollToSection('signature-journeys', e)}
                >
                  {t('footer.linkJourneys', isKorean ? '프라이빗 여행' : 'Hành trình tour riêng')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={(e) => handleScrollToSection('travel-themes', e)}
                >
                  {t('footer.linkThemes', isKorean ? '테마 여행' : 'Chủ đề du lịch')}
                </button>
              </li>
            </ul>
          </div>

          {/* Group B — Super EZ Tour */}
          <div className="footer-nav-col">
            <h3 className="footer-col-title">
              {t('footer.groupSuperEz', 'Super EZ Tour')}
            </h3>
            <ul className="footer-link-list">
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={(e) => handleScrollToSection('travel-services', e)}
                >
                  {t('footer.linkServices', isKorean ? '여행 서비스' : 'Dịch vụ du lịch')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={(e) => handleScrollToSection('why-us', e)}
                >
                  {t('footer.linkWhyUs', isKorean ? 'Super EZ Tour 소개' : 'Vì sao chọn chúng tôi')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn is-highlight"
                  onClick={handleOpenConsultation}
                >
                  {t('footer.linkConsult', isKorean ? '여행 상담' : 'Tư vấn hành trình')}
                </button>
              </li>
            </ul>
          </div>

          {/* Group C — Verified Contact & Social (Only rendered when verified data exists) */}
          {showGroupC && (
            <div className="footer-nav-col contact-col">
              <h3 className="footer-col-title">
                {t('footer.groupConnect', isKorean ? '문의 및 소셜' : 'Kết nối')}
              </h3>
              <ul className="footer-link-list">
                {companyInfo.contact?.hotline && (
                  <li>
                    <a
                      href={`tel:${companyInfo.contact.hotline.replace(/\s+/g, '')}`}
                      className="footer-link-anchor"
                    >
                      <span>Hotline: {companyInfo.contact.hotline}</span>
                    </a>
                  </li>
                )}
                {companyInfo.contact?.email && (
                  <li>
                    <a
                      href={`mailto:${companyInfo.contact.email}`}
                      className="footer-link-anchor"
                    >
                      <span>{companyInfo.contact.email}</span>
                    </a>
                  </li>
                )}
                {companyInfo.social?.kakaoTalk && (
                  <li>
                    <a
                      href={companyInfo.social.kakaoTalk}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link-anchor"
                    >
                      <span>KakaoTalk 1:1</span>
                    </a>
                  </li>
                )}
                {companyInfo.social?.facebook && (
                  <li>
                    <a
                      href={companyInfo.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link-anchor"
                    >
                      <span>Facebook</span>
                    </a>
                  </li>
                )}
                {companyInfo.social?.instagram && (
                  <li>
                    <a
                      href={companyInfo.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link-anchor"
                    >
                      <span>Instagram</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Hairline Divider */}
        <div className="footer-hairline" aria-hidden="true" />

        {/* =========================================================
            LAYER 3 — LEGAL INFORMATION & COPYRIGHT
        ========================================================= */}
        {hasVerifiedLegal && (
          <div className="footer-verified-legal-block">
            {companyInfo.legal.legalName && (
              <span className="legal-field">{companyInfo.legal.legalName}</span>
            )}
            {companyInfo.legal.registrationNumber && (
              <span className="legal-field">
                {isKorean ? '사업자등록번호: ' : 'Số ĐKDN: '}
                {companyInfo.legal.registrationNumber}
              </span>
            )}
            {companyInfo.legal.travelLicense && (
              <span className="legal-field">
                {isKorean ? '여행업 등록: ' : 'Giấy phép: '}
                {companyInfo.legal.travelLicense}
              </span>
            )}
            {companyInfo.legal.headquarters && (
              <span className="legal-field">{companyInfo.legal.headquarters}</span>
            )}
          </div>
        )}

        <div className="footer-layer-copyright">
          <p className="copyright-text">
            © {currentYear} Super EZ Tour. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
