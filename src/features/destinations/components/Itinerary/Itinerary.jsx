import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './Itinerary.css';

const Itinerary = ({ itinerariesData }) => {
  const itineraries = itinerariesData || [];
  const [activeItineraryId, setActiveItineraryId] = useState(itineraries[0]?.id || '4d3n');
  const { applyItinerary } = useTripBuilder();

  const activeItinerary = itineraries.find((it) => it.id === activeItineraryId) || itineraries[0];

  return (
    <section className="dest-section dest-section-ivory itinerary-section" id="itinerary">
      <div className="dest-container">
        {/* Header */}
        <div className="itinerary-header">
          <span className="dest-kicker">
            <Calendar size={14} />
            <span>SUGGESTED ITINERARIES</span>
          </span>

          <h2 className="dest-title-editorial itinerary-title">
            Hành Trình Gợi Ý Dành Riêng Cho Bạn
          </h2>

          <p className="dest-subtitle itinerary-sub">
            Lịch trình mẫu được tối ưu theo cung đường thực tế tại Đà Nẵng. Bạn hoàn toàn có thể thêm bớt ngày và đổi điểm đến theo sở thích.
          </p>
        </div>

        {/* Itinerary Length Filter Tabs */}
        <div className="itinerary-tabs">
          {itineraries.map((it) => (
            <button
              key={it.id}
              type="button"
              className={`itinerary-tab-btn ${activeItineraryId === it.id ? 'itinerary-tab-btn-active' : ''}`}
              onClick={() => setActiveItineraryId(it.id)}
            >
              <Clock size={16} />
              <span>{it.label}</span>
            </button>
          ))}
        </div>

        {/* Active Itinerary Overview Banner */}
        {activeItinerary && (
          <div className="itinerary-overview-box">
            <div className="itinerary-overview-info">
              <span className="dest-badge dest-badge-orange">Lịch trình đề xuất 100% riêng tư</span>
              <h3 className="itinerary-overview-title">{activeItinerary.title}</h3>
              <p className="itinerary-overview-desc">{activeItinerary.overview}</p>
            </div>

            <button
              type="button"
              className="dest-btn-primary itinerary-customize-btn"
              onClick={() => applyItinerary(activeItinerary)}
            >
              <span>Tùy chỉnh lịch trình này</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Sticky Timeline Day-by-Day */}
        <div className="itinerary-timeline">
          {(activeItinerary?.days || []).map((dayItem) => (
            <div key={dayItem.day} className="itinerary-day-row">
              {/* Day Badge & Line Marker */}
              <div className="itinerary-marker-col">
                <div className="itinerary-day-badge">
                  <span className="itinerary-day-lbl">NGÀY</span>
                  <span className="itinerary-day-num">{String(dayItem.day).padStart(2, '0')}</span>
                </div>
                <div className="itinerary-timeline-line" />
              </div>

              {/* Day Content Card */}
              <div className="itinerary-day-card">
                <div className="itinerary-day-img-wrap">
                  <img src={dayItem.image} alt={dayItem.title} loading="lazy" />
                  <div className="itinerary-day-gradient" />
                </div>

                <div className="itinerary-day-body">
                  <h4 className="itinerary-day-title">{dayItem.title}</h4>
                  <div className="itinerary-day-highlights">
                    {dayItem.highlights.map((hl, idx) => (
                      <div key={idx} className="itinerary-day-hl-row">
                        <CheckCircle2 size={15} className="itinerary-check-icon" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Itinerary;