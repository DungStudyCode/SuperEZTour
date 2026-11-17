import React, { useState } from 'react';
import Container from '../../../../components/common/Container/Container';
import { CORE_TRAVEL_SERVICES, VALUE_COMPARISON } from '../../../../data/vietnamDestinations';
import { Car, UserCheck, Building, ShieldCheck, CheckCircle2, XCircle, Sparkles, ArrowRight, MessageSquare } from 'lucide-react';
import './WhyChooseUs.css';

const ICON_MAP = {
  Car,
  UserCheck,
  Building,
  ShieldCheck,
};

const WhyChooseUs = ({ onOpenQuoteModal }) => {
  return (
    <>
      {/* 07. Premium Travel Services (4 Core Pillars) */}
      <section id="travel-services" className="section travel-services-section" aria-label="Premium Travel Services">
        <Container>
          <div className="services-header">
            <div className="services-eyebrow">
              <Sparkles size={14} className="text-gold" />
              <span>SUPER EZ TOUR HOSPITALITY PILLARS</span>
            </div>
            <h2 className="services-title">4대 프리미엄 여행 서비스</h2>
            <p className="services-subtitle">
              단순한 관광을 넘어선 품격 있는 여정.
              <br />
              출국하는 순간부터 귀국까지 모든 순간을 세심하게 책임집니다.
            </p>
          </div>

          <div className="services-grid-lux">
            {CORE_TRAVEL_SERVICES.map((srv) => {
              const Icon = ICON_MAP[srv.iconName] || ShieldCheck;
              return (
                <div key={srv.id} className="service-card-lux">
                  <div className="service-icon-box">
                    <Icon size={26} className="service-icon text-gold" />
                  </div>
                  <div className="service-header-group">
                    <span className="service-en-title">{srv.titleEn}</span>
                    <h3 className="service-kr-title">{srv.titleKr}</h3>
                  </div>
                  <p className="service-desc">{srv.descKr}</p>
                  <ul className="service-perks-list">
                    {srv.perks.map((perk, idx) => (
                      <li key={idx} className="perk-item">
                        <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
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

      {/* 08. Why Super EZ Tour (BOBTOUR & Guideman Value Comparison Matrix) */}
      <section id="why-us" className="section why-us-section" aria-label="Why Super EZ Tour">
        <Container>
          <div className="why-header">
            <div className="why-eyebrow">
              <ShieldCheck size={14} className="text-gold" />
              <span>THE SUPER EZ TOUR ADVANTAGE</span>
            </div>
            <h2 className="why-title">왜 Super EZ Tour인가?</h2>
            <p className="why-subtitle">
              기존 단체 패키지의 모든 불편함과 강요를 없앤 100% 프라이빗 여행.
              <br />
              직접 비교해보시면 차이를 아실 수 있습니다.
            </p>
          </div>

          {/* Value Comparison Matrix */}
          <div className="comparison-table-wrap">
            <div className="comparison-table-header">
              <div className="col-category">비교 항목</div>
              <div className="col-superez">
                <span className="badge-exclusive">EXCLUSIVE</span>
                <strong>Super EZ Tour (단독 투어)</strong>
              </div>
              <div className="col-general">
                <span>일반 단체 패키지</span>
              </div>
            </div>

            <div className="comparison-table-body">
              {VALUE_COMPARISON.map((row, idx) => (
                <div key={idx} className="comparison-row">
                  <div className="col-category">
                    <span className="category-tag">{row.category}</span>
                  </div>
                  <div className="col-superez">
                    <div className="cell-content win">
                      <CheckCircle2 size={18} className="win-icon text-gold" />
                      <span className="cell-text bold">{row.superEz}</span>
                    </div>
                  </div>
                  <div className="col-general">
                    <div className="cell-content loss">
                      <XCircle size={18} className="loss-icon text-muted" />
                      <span className="cell-text text-muted">{row.generalTour}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Conversion Callout */}
          <div className="why-bottom-callout">
            <div className="callout-text">
              <h4 className="callout-title">우리 일행만의 맞춤 여행 견적을 받아보세요</h4>
              <p className="callout-desc">원하는 출발 일자와 인원만 알려주시면 1:1 전담 매니저가 30분 이내에 맞춤 일정을 제안해 드립니다.</p>
            </div>
            <div className="callout-actions">
              <button
                type="button"
                className="callout-btn primary"
                onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
              >
                <Sparkles size={16} />
                <span>30분 빠른 맞춤 견적 신청</span>
              </button>
              <button
                type="button"
                className="callout-btn kakao"
                onClick={() => onOpenQuoteModal && onOpenQuoteModal('kakao')}
              >
                <MessageSquare size={16} />
                <span>카카오톡 1:1 실시간 상담</span>
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default WhyChooseUs;
