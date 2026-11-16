import React, { useState } from 'react';
import { DESTINATIONS, COUNTRIES, NETWORK_STATS } from '../../../../data/destinations';
import SectionHeading from '../../../../components/common/SectionHeading/SectionHeading';
import Container from '../../../../components/common/Container/Container';
import { MapPin, Building2, Users, Car, Award, ChevronRight, Star, ShieldCheck } from 'lucide-react';
import Button from '../../../../components/common/Button/Button';
import './DestinationMap.css';

const DestinationMap = ({ onOpenQuoteModal, onSelectDestination }) => {
  const [activeDestination, setActiveDestination] = useState(DESTINATIONS[0]); // default to Cebu
  const [activeCountryFilter, setActiveCountryFilter] = useState('all');

  const filteredList = activeCountryFilter === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.countryId === activeCountryFilter);

  const handleMarkerClick = (dest) => {
    setActiveDestination(dest);
  };

  const handleConsult = (destId) => {
    onSelectDestination && onSelectDestination(destId);
    onOpenQuoteModal && onOpenQuoteModal(destId);
  };

  return (
    <section id="map" className="section destination-map-section">
      <Container>
        <SectionHeading
          tagline="MẠNG LƯỚI HÀNH TRÌNH CHÂU Á"
          title="Bản đồ mạng lưới 16 điểm đến Châu Á"
          subtitle="Super EZ Tour tự hào xây dựng mạng lưới vận hành tại 6 quốc gia Châu Á, đem lại trải nghiệm tour riêng 100% không ghép đoàn và hỗ trợ khẩn cấp 24/7."
          align="center"
        />

        {/* Stats Row */}
        <div className="network-stats-row">
          <div className="net-stat-card">
            <span className="net-stat-num">{NETWORK_STATS.yearsOperating}+</span>
            <span className="net-stat-label">Năm phát triển</span>
          </div>
          <div className="net-stat-card">
            <span className="net-stat-num">{NETWORK_STATS.countriesCount}</span>
            <span className="net-stat-label">Quốc gia Châu Á</span>
          </div>
          <div className="net-stat-card">
            <span className="net-stat-num">{NETWORK_STATS.destinationsCount}</span>
            <span className="net-stat-label">Điểm đến hàng đầu</span>
          </div>
          <div className="net-stat-card">
            <span className="net-stat-num">{NETWORK_STATS.privateVehicles}+</span>
            <span className="net-stat-label">Xe du lịch đời mới</span>
          </div>
          <div className="net-stat-card">
            <span className="net-stat-num">{NETWORK_STATS.certifiedGuides}+</span>
            <span className="net-stat-label">HDV chuyên tuyến</span>
          </div>
        </div>

        {/* Interactive Map & Directory Grid */}
        <div className="map-interface-grid">
          {/* Left: Interactive Visual Map */}
          <div className="visual-map-container">
            <div className="map-artboard">
              {/* Stylized SVG Map of East & Southeast Asia */}
              <svg
                viewBox="0 0 1000 800"
                className="asia-svg-map"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#EBF5FF" />
                    <stop offset="100%" stopColor="#D9EDFF" />
                  </radialGradient>
                  <filter id="markerShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* Ocean Background */}
                <rect width="1000" height="800" fill="url(#oceanGrad)" rx="16" />

                {/* Simplified Landmass Outlines for Southeast Asia */}
                {/* Mainland (China, Indochina, Thailand, Malaysia) */}
                <path
                  d="M 380,140 Q 420,130 500,160 Q 560,200 620,240 Q 640,300 610,380 Q 580,440 560,510 Q 520,530 490,480 Q 460,420 480,360 Q 440,300 390,260 Z"
                  fill="#D8E2EC"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                />
                {/* Vietnam Coastline Strip */}
                <path
                  d="M 520,240 Q 560,270 570,330 Q 590,400 600,480 Q 590,540 560,560 Q 530,520 540,460 Q 540,380 520,310 Z"
                  fill="#CBD5E1"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                />
                {/* Taiwan Island */}
                <path
                  d="M 720,280 Q 750,290 740,330 Q 720,350 710,320 Z"
                  fill="#CBD5E1"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                />
                {/* Philippines Archipelago */}
                <path
                  d="M 700,380 Q 740,390 730,440 Q 700,430 690,400 Z"
                  fill="#CBD5E1"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                />
                <path
                  d="M 710,480 Q 760,500 750,560 Q 720,570 700,530 Z"
                  fill="#CBD5E1"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                />
                {/* Borneo / Malaysia Sabah */}
                <path
                  d="M 640,540 Q 720,530 730,600 Q 680,640 630,610 Z"
                  fill="#CBD5E1"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                />
                {/* Indonesia Java & Bali */}
                <path
                  d="M 500,680 Q 660,670 740,690 Q 720,730 600,720 Q 510,710 500,680 Z"
                  fill="#CBD5E1"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                />

                {/* Decorative Flight / Network Connection Lines */}
                <g stroke="#ED2028" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.45">
                  <path d="M 550,260 L 580,420" />
                  <path d="M 580,420 L 740,540" />
                  <path d="M 580,420 L 500,460" />
                  <path d="M 740,540 L 680,700" />
                  <path d="M 730,310 L 710,420" />
                  <path d="M 500,460 L 670,580" />
                </g>
              </svg>

              {/* HTML Pin Markers Positioned Over SVG Artboard */}
              {DESTINATIONS.map((dest) => {
                const isActive = activeDestination?.id === dest.id;

                return (
                  <div
                    key={dest.id}
                    className={`map-pin-marker ${isActive ? 'is-active' : ''}`}
                    style={{
                      left: `${dest.mapCoords.x}%`,
                      top: `${dest.mapCoords.y}%`
                    }}
                    onClick={() => handleMarkerClick(dest)}
                  >
                    <div className="pin-pulse" />
                    <div className="pin-head">
                      <span className="pin-dot" />
                    </div>
                    <span className="pin-label">{dest.name}</span>

                    {/* Hover Tooltip Box */}
                    <div className="pin-tooltip">
                      <div className="tooltip-top">
                        <span className="tooltip-badge">{dest.country}</span>
                        <span className="tooltip-tag">{dest.tag}</span>
                      </div>
                      <h4 className="tooltip-title">{dest.name} ({dest.nameKo})</h4>
                      <p className="tooltip-info">{dest.branchInfo}</p>
                      <div className="tooltip-rating">
                        <Star size={12} className="star-fill" />
                        <span>{dest.rating}</span>
                        <span className="tooltip-price">Giá từ {dest.priceFrom}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="map-legend">
              <div className="legend-item">
                <span className="legend-pin" />
                <span>16 Chi nhánh có trụ sở & xe riêng</span>
              </div>
              <div className="legend-item">
                <span className="legend-line" />
                <span>Mạng lưới kết nối xuyên suốt</span>
              </div>
            </div>
          </div>

          {/* Right: Active Destination Details & Branch Directory */}
          <div className="map-details-container">
            {/* Active Highlight Card */}
            {activeDestination && (
              <div className="active-destination-card animate-fade-in">
                <div className="active-dest-header">
                  <div className="active-dest-img-wrap">
                    <img
                      src={activeDestination.image}
                      alt={activeDestination.name}
                      className="active-dest-img"
                    />
                    <span className="active-dest-badge">{activeDestination.country}</span>
                  </div>

                  <div className="active-dest-info">
                    <div className="active-title-group">
                      <h3 className="active-dest-name">
                        {activeDestination.name}
                      </h3>
                      <div className="active-dest-rating">
                        <Star size={15} className="star-fill" />
                        <span>{activeDestination.rating}</span>
                        <span className="text-muted">({activeDestination.reviewsCount} reviews)</span>
                      </div>
                    </div>
                    <p className="active-dest-desc">{activeDestination.description}</p>
                  </div>
                </div>

                <div className="active-branch-specs">
                  <div className="spec-item">
                    <Building2 size={18} className="spec-icon" />
                    <div>
                      <span className="spec-label">Trung tâm vận hành</span>
                      <strong className="spec-val">Super EZ Tour {activeDestination.name} Hub</strong>
                    </div>
                  </div>
                  <div className="spec-item">
                    <Car size={18} className="spec-icon" />
                    <div>
                      <span className="spec-label">Đội ngũ xe riêng</span>
                      <strong className="spec-val">Xe 7-16 chỗ đời mới 100%</strong>
                    </div>
                  </div>
                  <div className="spec-item">
                    <ShieldCheck size={18} className="spec-icon" />
                    <div>
                      <span className="spec-label">Cam kết dịch vụ</span>
                      <strong className="spec-val">Không ghép khách · Không ép mua</strong>
                    </div>
                  </div>
                </div>

                <div className="active-card-actions">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => handleConsult(activeDestination.id)}
                  >
                    Nhận báo giá tour {activeDestination.name}
                  </Button>
                </div>
              </div>
            )}

            {/* Quick Country Directory Filter */}
            <div className="branch-directory-box">
              <div className="directory-header">
                <h4 className="directory-title">Danh sách 16 điểm đến nổi bật</h4>
                <div className="directory-country-pills">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`dir-pill ${activeCountryFilter === c.id ? 'is-active' : ''}`}
                      onClick={() => setActiveCountryFilter(c.id)}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="directory-list">
                {filteredList.map((dest) => (
                  <div
                    key={dest.id}
                    className={`directory-item ${activeDestination?.id === dest.id ? 'is-selected' : ''}`}
                    onClick={() => setActiveDestination(dest)}
                  >
                    <div className="dir-item-left">
                      <MapPin size={16} className="dir-pin-icon" />
                      <div>
                        <strong className="dir-dest-name">{dest.name}</strong>
                        <span className="dir-country-name"> · {dest.country}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="dir-arrow" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DestinationMap;
