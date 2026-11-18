import React from 'react';
import Container from '../../../../components/common/Container/Container';
import { CORE_TRAVEL_SERVICES, VALUE_COMPARISON } from '../../../../data/vietnamDestinations';
import {
  Car,
  UserCheck,
  Building,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
  Compass,
  Award,
  Clock,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import './WhyChooseUs.css';

const ICON_MAP = {
  Car,
  UserCheck,
  Building,
  ShieldCheck,
  Compass,
  Sparkles,
  Award,
  Clock,
};

const WhyChooseUs = ({ onOpenQuoteModal }) => {
  const { t, isKorean } = useLanguage();

  return (
    <>
      {/* 01. Premium Travel Services */}
      <section id="travel-services" className="section travel-services-section" aria-label="Premium Travel Services">
        <Container>
          <div className="services-header">
            <div className="services-eyebrow">
              <Sparkles size={14} className="text-orange" />
              <span>{t('home.services.eyebrow', 'SUPER EZ TOUR HOSPITALITY PILLARS')}</span>
            </div>
            <h2 className="services-title">
              {t('home.services.title', '8대 프리미엄 여행 서비스')}
            </h2>
            <p className="services-subtitle">
              {t('home.services.subtitle', '단순한 관광을 넘어선 품격 있는 여정. 출국하는 순간부터 귀국까지 모든 순간을 세심하게 책임집니다.')}
            </p>
          </div>

          <div className="services-grid-lux">
            {CORE_TRAVEL_SERVICES.map((srv) => {
              const Icon = ICON_MAP[srv.iconName] || ShieldCheck;
              const srvTitle = isKorean ? srv.titleKr : (srv.titleVi || srv.titleKr);
              const srvDesc = isKorean ? srv.descKr : (srv.descVi || srv.descKr);
              const srvPerks = (isKorean || !srv.perksVi) ? srv.perks : srv.perksVi;

              return (
                <div key={srv.id} className="service-card-lux">
                  <div className="service-icon-box">
                    <Icon size={24} className="service-icon text-orange" />
                  </div>
                  <div className="service-header-group">
                    <span className="service-en-title">{srv.titleEn}</span>
                    <h3 className="service-main-title">{srvTitle}</h3>
                  </div>
                  <p className="service-desc">{srvDesc}</p>
                  <ul className="service-perks-list">
                    {srvPerks.map((perk, idx) => (
                      <li key={idx} className="perk-item">
                        <CheckCircle2 size={14} className="text-orange flex-shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 02. Why Super EZ Tour (BOBTOUR & Guideman Value Comparison Matrix) */}
      <section id="why-us" className="section why-us-section" aria-label="Why Super EZ Tour">
        <Container>
          <div className="why-header">
            <div className="why-eyebrow">
              <ShieldCheck size={14} className="text-orange" />
              <span>{t('home.whyUs.eyebrow', 'THE SUPER EZ TOUR ADVANTAGE')}</span>
            </div>
            <h2 className="why-title">
              {t('home.whyUs.title', '왜 Super EZ Tour인가?')}
            </h2>
            <p className="why-subtitle">
              {t('home.whyUs.subtitle', '기존 단체 패키지의 모든 불편함과 강요를 없앤 100% 프라이빗 여행. 직접 비교해보시면 차이를 아실 수 있습니다.')}
            </p>
          </div>

          {/* Value Comparison Matrix */}
          <div className="comparison-table-wrap">
            <div className="comparison-table-header">
              <div className="col-category">
                {t('home.whyUs.category', '비교 항목')}
              </div>
              <div className="col-superez">
                <span className="badge-exclusive">100% PRIVATE</span>
                <strong>{t('home.whyUs.superEz', 'Super EZ Tour (단독 투어)')}</strong>
              </div>
              <div className="col-general">
                <span>{t('home.whyUs.general', '일반 단체 패키지')}</span>
              </div>
            </div>

            <div className="comparison-table-body">
              {VALUE_COMPARISON.map((row, idx) => {
                const rowCategory = isKorean ? row.category : (row.categoryVi || row.category);
                const rowSuperEz = isKorean ? row.superEz : (row.superEzVi || row.superEz);
                const rowGeneral = isKorean ? row.generalTour : (row.generalTourVi || row.generalTour);

                return (
                  <div key={idx} className="comparison-row">
                    <div className="col-category">
                      <span className="category-tag">{rowCategory}</span>
                    </div>
                    <div className="col-superez">
                      <div className="cell-content win">
                        <CheckCircle2 size={18} className="win-icon text-orange" />
                        <span className="cell-text bold">{rowSuperEz}</span>
                      </div>
                    </div>
                    <div className="col-general">
                      <div className="cell-content lose">
                        <XCircle size={18} className="lose-icon" />
                        <span className="cell-text muted">{rowGeneral}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="comparison-table-footer">
              <div className="footer-callout">
                <Sparkles size={16} className="text-orange" />
                <span>
                  {isKorean
                    ? 'Super EZ Tour는 숨겨진 옵션비, 가이드 팁 강요, 의무 쇼핑센터 방문이 일체 없는 투명한 가격 정찰제를 약속합니다.'
                    : 'Super EZ Tour cam kết giá minh bạch trọn gói, tuyệt đối không phụ phí ngầm hay chèo kéo mua sắm.'}
                </span>
              </div>
              <button
                type="button"
                className="comparison-quote-btn"
                onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
              >
                <span>{t('home.whyUs.quoteBtn', '우리 일행 맞춤 견적 받아보기')}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default WhyChooseUs;
