import React from 'react';
import { Compass, BookOpen, Clock, Languages, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './LocalGuide.css';

const ICONS = {
  Compass: Compass,
  BookOpen: BookOpen,
  Clock: Clock,
  Languages: Languages
};

const LocalGuide = ({ guideData }) => {
  const { preselectService } = useTripBuilder();

  const handleRequestGuide = () => {
    preselectService('guide', { id: 'dedicated' }, true);
  };

  return (
    <section className="dest-section dest-section-white guide-section" id="guide">
      <div className="dest-container">
        <div className="guide-layout">
          {/* Left Text & Pillars Column */}
          <div className="guide-content-col">
            <span className="dest-kicker">
              <Compass size={14} />
              <span>{guideData?.kicker || 'LOCAL EXPERTISE'}</span>
            </span>

            <h2 className="dest-title-editorial guide-title">
              {guideData?.title || 'Explore Like a Local.'}
            </h2>

            <p className="guide-subtitle-editorial">
              {guideData?.subtitle || 'Không chỉ tham quan, mà thực sự hiểu điểm đến.'}
            </p>

            <p className="guide-lead-text">
              {guideData?.lead}
            </p>

            <div className="guide-pillars-list">
              {(guideData?.pillars || []).map((p, idx) => {
                const IconComponent = ICONS[p.icon] || Compass;
                return (
                  <div key={idx} className="guide-pillar-row">
                    <div className="guide-pillar-icon-wrap">
                      <IconComponent size={20} className="guide-pillar-icon" />
                    </div>
                    <div className="guide-pillar-text">
                      <h4 className="guide-pillar-heading">{p.title}</h4>
                      <p className="guide-pillar-sub">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="guide-action-box">
              <button
                type="button"
                className="dest-btn-primary guide-request-btn"
                onClick={handleRequestGuide}
              >
                <span>Yêu cầu hướng dẫn viên riêng</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="guide-visual-col">
            <div className="dest-img-mask guide-main-img-box">
              <img
                src={guideData?.image || 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=80'}
                alt="Hướng dẫn viên Super EZ Tour đồng hành cùng du khách"
                loading="lazy"
              />
              <div className="guide-img-quote-box">
                <p className="guide-quote-text">{guideData?.quote}</p>
                <div className="guide-quote-author">
                  <CheckCircle2 size={16} className="guide-quote-check" />
                  <span>Cam kết dịch vụ 1:1 tận tâm từ Super EZ Tour</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalGuide;