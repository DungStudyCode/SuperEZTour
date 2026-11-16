import React, { useState } from 'react';
import { COUNTRIES, DESTINATIONS } from '../../../../data/destinations';
import SectionHeading from '../../../../components/common/SectionHeading/SectionHeading';
import Container from '../../../../components/common/Container/Container';
import { MapPin, Star, ShieldCheck, ArrowRight, Compass, Sparkles } from 'lucide-react';
import Button from '../../../../components/common/Button/Button';
import './DestinationNavigation.css';

const DestinationNavigation = ({ onOpenQuoteModal, onSelectDestination }) => {
  const [selectedCountry, setSelectedCountry] = useState('all');

  const filteredDestinations = selectedCountry === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.countryId === selectedCountry);

  const handleDestinationClick = (destId) => {
    onSelectDestination && onSelectDestination(destId);
    onOpenQuoteModal && onOpenQuoteModal(destId);
  };

  return (
    <section id="destinations" className="section destination-nav-section">
      <Container>
        {/* Section Heading */}
        <SectionHeading
          tagline="16 ĐIỂM ĐẾN HÀNG ĐẦU · 6 QUỐC GIA CHÂU Á"
          title="Chọn điểm đến cho hành trình của bạn"
          subtitle="Tất cả các điểm đến đều do Super EZ Tour trực tiếp tổ chức và điều hành, sở hữu xe riêng và đội ngũ hướng dẫn viên tận tâm, cam kết không ghép khách lạ."
          align="center"
        />

        {/* Country Filter Tabs */}
        <div className="country-tabs-scroll">
          <div className="country-tabs-wrapper">
            {COUNTRIES.map((country) => (
              <button
                key={country.id}
                type="button"
                className={`country-tab-btn ${selectedCountry === country.id ? 'is-active' : ''}`}
                onClick={() => setSelectedCountry(country.id)}
              >
                {country.flag && <span className="tab-flag">{country.flag}</span>}
                <span className="tab-name">{country.name}</span>
                <span className="tab-count">{country.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="destinations-grid">
          {filteredDestinations.map((dest) => (
            <div key={dest.id} id={`dest-${dest.id}`} className="destination-card">
              {/* Card Image Wrap */}
              <div className="destination-image-wrap hover-zoom-container">
                <img
                  src={dest.image}
                  alt={`${dest.name} - ${dest.country}`}
                  loading="lazy"
                  className="destination-img hover-zoom-image"
                />
                <div className="dest-badge-top">
                  {dest.badge && <span className="dest-badge-label">{dest.badge}</span>}
                  {dest.tag && <span className="dest-tag-label">{dest.tag}</span>}
                </div>
                <div className="dest-country-pill">
                  <MapPin size={13} />
                  <span>{dest.country}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="destination-card-body">
                <div className="dest-title-row">
                  <div className="dest-name-group">
                    <h3 className="dest-name">{dest.name}</h3>
                  </div>
                  <div className="dest-rating">
                    <Star size={15} className="star-icon" />
                    <span className="rating-score">{dest.rating}</span>
                    <span className="reviews-count">({dest.reviewsCount.toLocaleString()})</span>
                  </div>
                </div>

                <p className="dest-description line-clamp-2">
                  {dest.description}
                </p>

                {/* Popular Tour Packs Pills */}
                <div className="dest-packs-container">
                  <span className="packs-label">Các gói tour nổi bật:</span>
                  <div className="packs-list">
                    {dest.popularPacks.map((pack, idx) => (
                      <span key={idx} className="pack-chip">
                        {pack}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Operation Info */}
                <div className="dest-branch-banner">
                  <ShieldCheck size={16} className="branch-shield" />
                  <span className="branch-text">{dest.branchInfo}</span>
                </div>

                {/* Card Footer with Price & CTA */}
                <div className="dest-card-footer">
                  <div className="dest-price-box">
                    <span className="price-label">Giá chỉ từ</span>
                    <span className="price-value">{dest.priceFrom}</span>
                    <span className="price-unit">/ người</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {dest.id === 'danang' && (
                      <a
                        href="/destinations/da-nang"
                        className="btn btn-outline btn-sm"
                        style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
                      >
                        Khám phá Đà Nẵng →
                      </a>
                    )}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleDestinationClick(dest.id)}
                      rightIcon={ArrowRight}
                    >
                      Tư vấn tour
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default DestinationNavigation;
