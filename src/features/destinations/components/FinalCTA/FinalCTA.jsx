import React from 'react';
import { Compass, Phone, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import './FinalCTA.css';

const FinalCTA = ({ ctaData }) => {
  const scrollToBuilder = () => {
    const el = document.getElementById('trip-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="dest-section dest-section-deep final-cta-section" id="final-cta">
      {/* Background Cinematic Sunset Image */}
      <div className="final-cta-bg">
        <img
          src={ctaData?.bgImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85'}
          alt="Hoàng hôn biển Đà Nẵng"
          className="final-cta-img"
          loading="lazy"
        />
        <div className="final-cta-gradient" />
      </div>

      <div className="dest-container final-cta-container">
        <span className="dest-kicker final-cta-kicker">
          <Sparkles size={14} />
          <span>{ctaData?.kicker || 'YOUR ADVENTURE AWAITS'}</span>
        </span>

        <h2 className="final-cta-title">
          {ctaData?.title || 'DA NANG IS CALLING.'}
        </h2>

        <p className="final-cta-lead">
          {ctaData?.lead || 'Không có hai chuyến đi nào giống nhau.'}
        </p>

        <p className="final-cta-desc">
          {ctaData?.description || 'Hãy chia sẻ mong muốn của bạn, chúng tôi sẽ thiết kế một hành trình độc bản chỉ dành riêng cho bạn và gia đình trong vòng 30 phút.'}
        </p>

        <div className="final-cta-actions">
          <button
            type="button"
            className="dest-btn-primary final-cta-main-btn"
            onClick={scrollToBuilder}
          >
            <span>{ctaData?.actions?.primary || 'Bắt đầu thiết kế chuyến đi'}</span>
            <Compass size={18} />
          </button>

          <a href="tel:19008899" className="dest-btn-ghost final-cta-hotline-btn">
            <Phone size={16} />
            <span>Hotline 24/7: 1900 8899</span>
          </a>

          <a
            href="https://zalo.me"
            target="_blank"
            rel="noopener noreferrer"
            className="final-cta-zalo-pill"
          >
            <MessageCircle size={16} />
            <span>Tư vấn trực tiếp Zalo</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;