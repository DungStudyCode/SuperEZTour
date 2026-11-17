import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VIETNAM_DESTINATIONS, VIETNAM_REGIONS, getDestinationsByRegion } from '../../../../data/vietnamDestinations';
import SectionHeading from '../../../../components/common/SectionHeading/SectionHeading';
import Container from '../../../../components/common/Container/Container';
import { MapPin, Star, Sparkles, ArrowRight, Clock, ShieldCheck, Compass, Info } from 'lucide-react';
import './DestinationNavigation.css';

const DestinationNavigation = ({ onOpenQuoteModal, onSelectDestination }) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [comingSoonToast, setComingSoonToast] = useState(null);
  const navigate = useNavigate();

  const filteredDestinations = getDestinationsByRegion(selectedRegion);

  const handleDestinationAction = (dest) => {
    if (dest.isAvailable) {
      navigate(dest.route);
    } else {
      setComingSoonToast(dest);
    }
  };

  const handleInquiryFromToast = (dest) => {
    setComingSoonToast(null);
    onSelectDestination && onSelectDestination(dest.id);
    onOpenQuoteModal && onOpenQuoteModal(dest.id);
  };

  return (
    <section id="destinations" className="section destination-nav-section" aria-label="Vietnam Destinations">
      <Container>
        {/* Section Heading */}
        <div className="dest-gallery-header">
          <div className="dest-gallery-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>VIETNAM DESTINATION COLLECTION</span>
          </div>
          <h2 className="dest-gallery-title">
            베트남 10대 명품 여행지 갤러리
          </h2>
          <p className="dest-gallery-subtitle">
            북부 고도(古都)의 역사부터 중부의 황금빛 해변, 남부의 에메랄드 섬까지.
            <br />
            모든 여정은 100% 단독 전용 리무진과 1:1 전담 한국어 가이드로 진행됩니다.
          </p>
        </div>

        {/* Region Filter Tabs */}
        <div className="region-tabs-scroll">
          <div className="region-tabs-wrapper">
            {VIETNAM_REGIONS.map((region) => {
              const count = region.id === 'all'
                ? VIETNAM_DESTINATIONS.length
                : VIETNAM_DESTINATIONS.filter((d) => d.region === region.id).length;

              return (
                <button
                  key={region.id}
                  type="button"
                  className={`region-tab-btn ${selectedRegion === region.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedRegion(region.id)}
                >
                  <span className="tab-name-kr">{region.nameKr}</span>
                  <span className="tab-name-en">{region.nameEn}</span>
                  <span className="tab-count-badge">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Coming Soon Alert Banner if selected */}
        {comingSoonToast && (
          <div className="dest-toast-banner animate-fade-in">
            <div className="toast-left">
              <Info size={20} className="toast-icon text-gold" />
              <div className="toast-msg">
                <strong>{comingSoonToast.nameKr} ({comingSoonToast.name})</strong> 인터랙티브 3D 투어는 현재 제작 준비 중(Coming Soon)입니다.
                <span>맞춤 프라이빗 일정 설계 및 항공·리조트 수배는 전담 매니저를 통해 즉시 상담 가능합니다.</span>
              </div>
            </div>
            <div className="toast-actions">
              <button
                type="button"
                className="toast-inquiry-btn"
                onClick={() => handleInquiryFromToast(comingSoonToast)}
              >
                <span>{comingSoonToast.nameKr} 1:1 맞춤 견적 문의</span>
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                className="toast-close-btn"
                onClick={() => setComingSoonToast(null)}
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {/* Destinations Grid (10 Vietnam Destinations) */}
        <div className="destinations-grid-lux">
          {filteredDestinations.map((dest) => {
            const isDaNang = dest.isAvailable;
            return (
              <div
                key={dest.id}
                id={`dest-${dest.id}`}
                className={`destination-card-lux ${isDaNang ? 'is-available-card' : 'is-coming-soon-card'}`}
              >
                {/* Card Image Wrap */}
                <div className="dest-img-wrap">
                  <img
                    src={dest.image}
                    alt={`${dest.nameKr} (${dest.name}) - Super EZ Tour`}
                    loading="lazy"
                    className="dest-card-img"
                  />
                  <div className="dest-card-badges">
                    {isDaNang ? (
                      <span className="status-pill available">
                        <Sparkles size={11} />
                        AVAILABLE NOW
                      </span>
                    ) : (
                      <span className="status-pill coming-soon">
                        <Clock size={11} />
                        준비 중 (Coming Soon)
                      </span>
                    )}
                    <span className="region-pill">{dest.regionKr}</span>
                  </div>

                  <div className="dest-category-pill">
                    <span>{dest.category}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="dest-card-body">
                  <div className="dest-name-row">
                    <div className="name-group">
                      <h3 className="name-kr">{dest.nameKr}</h3>
                      <span className="name-en">{dest.name}</span>
                    </div>
                    <div className="rating-wrap">
                      <Star size={14} className="star-icon" />
                      <span className="rating-val">{dest.rating}</span>
                      <span className="rating-cnt">({dest.reviewsCount})</span>
                    </div>
                  </div>

                  <p className="dest-tagline-text">{dest.tagline}</p>

                  {/* Highlights list */}
                  <div className="dest-highlights-list">
                    {dest.highlights.map((item, idx) => (
                      <div key={idx} className="highlight-item">
                        <span className="highlight-bullet">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Card Action Footer */}
                  <div className="dest-footer-action">
                    {isDaNang ? (
                      <Link to={dest.route} className="dest-action-btn available">
                        <span>3D 인터랙티브 여정 체험하기</span>
                        <ArrowRight size={15} />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="dest-action-btn coming-soon"
                        onClick={() => handleDestinationAction(dest)}
                      >
                        <Clock size={14} />
                        <span>준비 중 — 1:1 사전 맞춤 상담</span>
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

export default DestinationNavigation;
