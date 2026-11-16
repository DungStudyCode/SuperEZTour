import React from 'react';
import { Compass, Sparkles, Waves, Mountain, Landmark } from 'lucide-react';
import './DestinationIntro.css';

const DestinationIntro = ({ introData }) => {
  return (
    <section className="dest-section dest-section-ivory dest-intro-section" id="discover">
      <div className="dest-container">
        {/* Editorial Header */}
        <div className="dest-intro-header">
          <div className="dest-intro-kicker-wrap">
            <span className="dest-kicker">
              <Compass size={14} />
              <span>{introData?.kicker || 'DISCOVER DA NANG'}</span>
            </span>
          </div>

          <div className="dest-intro-headline-grid">
            <h2 className="dest-title-editorial dest-intro-title">
              {introData?.title || 'Một thành phố.\nNgàn cách để khám phá.'}
            </h2>
            <div className="dest-intro-lead-box">
              <p className="dest-intro-lead">{introData?.lead}</p>
              {(introData?.paragraphs || []).map((p, idx) => (
                <p key={idx} className="dest-intro-paragraph">{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial Asymmetrical Visual Composition */}
        <div className="dest-intro-composition">
          {/* Main Visual Column */}
          <div className="dest-intro-col-main">
            <div className="dest-img-mask dest-intro-img-hero">
              <img
                src={introData?.gallery?.[0]?.url || 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80'}
                alt="Cầu Vàng Bà Nà Hills"
                loading="lazy"
              />
              <div className="dest-intro-img-overlay">
                <span className="dest-intro-badge-over">Tuyệt tác kiến trúc</span>
                <p className="dest-intro-caption">{introData?.gallery?.[0]?.caption}</p>
              </div>
            </div>
          </div>

          {/* Secondary Stacked Column */}
          <div className="dest-intro-col-side">
            <div className="dest-img-mask dest-intro-img-sub1">
              <img
                src={introData?.gallery?.[1]?.url || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'}
                alt="Bãi biển Mỹ Khê"
                loading="lazy"
              />
              <div className="dest-intro-sub-caption">
                <span>{introData?.gallery?.[1]?.caption}</span>
              </div>
            </div>

            <div className="dest-img-mask dest-intro-img-sub2">
              <img
                src={introData?.gallery?.[2]?.url || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'}
                alt="Phố cổ Hội An"
                loading="lazy"
              />
              <div className="dest-intro-sub-caption">
                <span>{introData?.gallery?.[2]?.caption}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Sensory Pillars */}
        <div className="dest-intro-pillars">
          <div className="dest-intro-pillar-card">
            <div className="dest-pillar-icon-box">
              <Waves size={24} className="dest-pillar-icon" />
            </div>
            <h3 className="dest-pillar-title">Biển Xanh & Núi Kỳ Vĩ</h3>
            <p className="dest-pillar-desc">
              Sự hòa quyện tuyệt mỹ giữa đỉnh Sơn Trà hoang sơ, Ngũ Hành Sơn thâm nghiêm và bãi cát trắng mịn thoai thoải Mỹ Khê.
            </p>
          </div>

          <div className="dest-intro-pillar-card">
            <div className="dest-pillar-icon-box">
              <Sparkles size={24} className="dest-pillar-icon" />
            </div>
            <h3 className="dest-pillar-title">Ẩm Thực Đậm Phong Vị</h3>
            <p className="dest-pillar-desc">
              Hương thơm mộc mạc của tô Mì Quảng gia truyền, vị tươi giòn của hải sản đánh bắt trong ngày và những bữa tối lãng mạn ven biển.
            </p>
          </div>

          <div className="dest-intro-pillar-card">
            <div className="dest-pillar-icon-box">
              <Landmark size={24} className="dest-pillar-icon" />
            </div>
            <h3 className="dest-pillar-title">Trái Tim Di Sản Thế Giới</h3>
            <p className="dest-pillar-desc">
              Cửa ngõ kết nối dễ dàng trong ngày tới Phố cổ Hội An, Thánh địa Mỹ Sơn và Cố đô Huế bằng xe riêng máy lạnh êm ái.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationIntro;