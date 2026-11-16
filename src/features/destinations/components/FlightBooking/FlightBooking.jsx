import React from 'react';
import { Plane, ArrowRight, Clock, ShieldCheck, CheckCircle2, Compass } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './FlightBooking.css';

const FlightBooking = ({ flightData }) => {
  const { preselectService } = useTripBuilder();

  const handleFlightConsult = () => {
    preselectService('flights', { id: 'need_support' }, true);
  };

  return (
    <section className="dest-section dest-section-dark flight-section" id="flights">
      <div className="dest-container">
        {/* Section Header */}
        <div className="flight-header">
          <span className="dest-kicker">
            <Plane size={14} />
            <span>{flightData?.kicker || 'SEAMLESS TRANSIT'}</span>
          </span>

          <h2 className="dest-title-editorial flight-title">
            {flightData?.title || 'Your Journey Begins Here.'}
          </h2>

          <p className="dest-subtitle flight-subtitle">
            {flightData?.subtitle || 'Hành trình bắt đầu từ bầu trời.'}
          </p>

          <p className="flight-lead">
            {flightData?.lead}
          </p>
        </div>

        {/* Flight Routes Grid */}
        <div className="flight-grid">
          {/* Domestic Routes */}
          <div className="flight-card">
            <div className="flight-card-head">
              <span className="flight-badge-type">Đường Bay Nội Địa</span>
              <h3 className="flight-card-title">Kết Nối Toàn Quốc Đến DAD</h3>
            </div>

            <div className="flight-routes-list">
              {(flightData?.domesticRoutes || []).map((route, idx) => (
                <div key={idx} className="flight-route-row">
                  <div className="flight-route-cities">
                    <span className="flight-city-name">{route.from}</span>
                    <div className="flight-arrow-graphic">
                      <div className="flight-line" />
                      <Plane size={14} className="flight-plane-icon" />
                    </div>
                    <span className="flight-city-name flight-city-dest">{route.to}</span>
                  </div>
                  <div className="flight-route-meta">
                    <span className="flight-time">
                      <Clock size={12} /> {route.time}
                    </span>
                    <span className="flight-freq">{route.frequency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* International Routes */}
          <div className="flight-card">
            <div className="flight-card-head">
              <span className="flight-badge-type flight-badge-intl">Đường Bay Quốc Tế</span>
              <h3 className="flight-card-title">Chuyến Bay Thẳng Quốc Tế</h3>
            </div>

            <div className="flight-routes-list">
              {(flightData?.intlRoutes || []).map((route, idx) => (
                <div key={idx} className="flight-route-row">
                  <div className="flight-route-cities">
                    <span className="flight-city-name">{route.from}</span>
                    <div className="flight-arrow-graphic">
                      <div className="flight-line" />
                      <Plane size={14} className="flight-plane-icon" />
                    </div>
                    <span className="flight-city-name flight-city-dest">{route.to}</span>
                  </div>
                  <div className="flight-route-meta">
                    <span className="flight-time">
                      <Clock size={12} /> {route.time}
                    </span>
                    <span className="flight-freq flight-badge-direct">Bay thẳng</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Perks Strip & CTA */}
        <div className="flight-perks-strip">
          <div className="flight-perks-left">
            <h4 className="flight-perks-title">Đặc quyền đặt vé máy bay qua Super EZ Tour:</h4>
            <div className="flight-perks-items">
              {(flightData?.perks || []).map((perk, idx) => (
                <div key={idx} className="flight-perk-item">
                  <CheckCircle2 size={16} className="flight-perk-check" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flight-perks-right">
            <button
              type="button"
              className="dest-btn-primary flight-cta-btn"
              onClick={handleFlightConsult}
            >
              <span>Tư vấn chuyến bay & đưa đón DAD</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightBooking;