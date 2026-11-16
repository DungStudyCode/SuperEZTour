import React from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import './ServiceCollection.css';

const ServiceCollection = ({ ecosystemData }) => {
  const scrollToTarget = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="dest-section dest-section-dark service-col-section" id="services">
      <div className="dest-container">
        {/* Section Header */}
        <div className="service-col-header">
          <span className="dest-kicker">
            <Layers size={14} />
            <span>{ecosystemData?.kicker || 'CORE ECOSYSTEM'}</span>
          </span>
          <h2 className="dest-title-editorial service-col-title">
            {ecosystemData?.title || 'Everything You Need.\nNothing You Don’t.'}
          </h2>
          <p className="dest-subtitle service-col-sub">
            {ecosystemData?.subtitle || 'Một hành trình. Trọn vẹn 6 nhóm trải nghiệm được cá nhân hóa tuyệt đối.'}
          </p>
        </div>

        {/* 6 High-end Service Cards Grid */}
        <div className="service-col-grid">
          {(ecosystemData?.services || []).map((srv) => (
            <div
              key={srv.id}
              className="service-card"
              onClick={() => scrollToTarget(srv.targetId)}
              role="button"
              tabIndex={0}
            >
              <div className="service-card-img-wrap">
                <img src={srv.image} alt={srv.title} loading="lazy" />
                <div className="service-card-gradient" />
                <span className="service-card-num">{srv.number}</span>
              </div>

              <div className="service-card-body">
                <div className="service-card-meta">
                  <span className="service-card-en">{srv.titleEn}</span>
                  <div className="service-card-arrow">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                <h3 className="service-card-title">{srv.title}</h3>
                <p className="service-card-desc">{srv.desc}</p>
                <span className="service-card-explore-btn">
                  Khám phá chi tiết →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCollection;