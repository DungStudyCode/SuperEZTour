import React from 'react';
import { Link } from 'react-router-dom';
import { SIGNATURE_JOURNEYS } from '../../../../data/vietnamDestinations';
import Container from '../../../../components/common/Container/Container';
import { ShieldCheck, Sparkles, ArrowRight, Clock, CheckCircle2, UserCheck, Car } from 'lucide-react';
import './SignatureJourneys.css';

const SignatureJourneys = ({ onOpenQuoteModal }) => {
  return (
    <section id="signature-journeys" className="section signature-journeys-section" aria-label="Signature Private Journeys">
      <Container>
        {/* Header */}
        <div className="signature-header">
          <div className="signature-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>100% PRIVATE CURATED ITINERARIES</span>
          </div>
          <h2 className="signature-title">시그니처 프라이빗 여정 컬렉션</h2>
          <p className="signature-subtitle">
            다른 일행과의 불편한 합승 없이, 오직 우리 일행만을 위해 맞춤 설계된 프리미엄 단독 투어.
            <br />
            정해진 시간에 쫓기지 않고 원하는 순간 머무는 진정한 럭셔리 여행을 경험하세요.
          </p>

          <div className="signature-guarantees-bar">
            <div className="guarantee-chip">
              <ShieldCheck size={16} className="text-gold" />
              <span>100% 단독 전용 차량</span>
            </div>
            <div className="guarantee-chip">
              <UserCheck size={16} className="text-gold" />
              <span>1:1 전담 한국어 가이드</span>
            </div>
            <div className="guarantee-chip">
              <Car size={16} className="text-gold" />
              <span>쇼핑 0회 · 옵션 강요 0%</span>
            </div>
          </div>
        </div>

        {/* Journeys Cards Grid */}
        <div className="signature-grid">
          {SIGNATURE_JOURNEYS.map((journey) => {
            const isDaNang = journey.isAvailable;
            return (
              <div
                key={journey.id}
                className={`signature-card ${isDaNang ? 'is-available-tour' : 'is-coming-soon-tour'}`}
              >
                {/* Image */}
                <div className="signature-img-wrap">
                  <img src={journey.image} alt={journey.title} className="signature-card-img" />
                  <div className="signature-badge-top">
                    <span className={`tour-badge ${isDaNang ? 'gold-badge' : 'coming-soon-badge'}`}>
                      {journey.badge}
                    </span>
                    <span className="duration-pill">
                      <Clock size={12} />
                      {journey.duration}
                    </span>
                  </div>
                  <div className="destination-location-tag">
                    <span>{journey.destination}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="signature-content">
                  <div className="signature-title-group">
                    <h3 className="journey-title-kr">{journey.title}</h3>
                    <span className="journey-title-en">{journey.titleEn}</span>
                  </div>

                  <div className="pacing-row">
                    <span className="pacing-label">여정 스타일:</span>
                    <span className="pacing-val">{journey.pacing}</span>
                  </div>

                  {/* Highlights checklist */}
                  <ul className="signature-highlights">
                    {journey.highlights.map((item, idx) => (
                      <li key={idx} className="highlight-row">
                        <CheckCircle2 size={15} className="check-icon text-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="signature-card-cta">
                    {isDaNang ? (
                      <Link to={`/destinations/${journey.destinationSlug}`} className="journey-btn available">
                        <span>다낭 3D 인터랙티브 투어 & 일정 상세</span>
                        <ArrowRight size={15} />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="journey-btn quote"
                        onClick={() => onOpenQuoteModal && onOpenQuoteModal(journey.destinationSlug)}
                      >
                        <Sparkles size={14} />
                        <span>사전 맞춤 견적 및 1:1 일정 상담</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default SignatureJourneys;
