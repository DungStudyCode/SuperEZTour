import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { HERO_BANNERS } from '../../../../data/banners';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '../../../../components/common/Button/Button';
import './HeroBanner.css';

const HeroBanner = ({ onOpenQuoteModal }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = HERO_BANNERS.length;

  return (
    <section className="hero-banner-section" aria-label="Hero Banners">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        loop={true}
        navigation={{
          prevEl: '.hero-nav-btn.prev',
          nextEl: '.hero-nav-btn.next'
        }}
        pagination={{
          el: '.hero-pagination-bullets',
          clickable: true
        }}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex + 1);
        }}
        className="hero-swiper"
      >
        {HERO_BANNERS.map((banner) => (
          <SwiperSlide key={banner.id} className="hero-slide">
            {/* Background Image with Overlay */}
            <div
              className="hero-slide-bg"
              style={{
                backgroundImage: `url(${banner.image})`
              }}
            >
              <div
                className="hero-slide-overlay"
                style={{
                  backgroundColor: `rgba(15, 23, 42, ${banner.overlayOpacity || 0.45})`
                }}
              />
            </div>

            {/* Slide Content */}
            <div className="container hero-slide-container">
              <div className="hero-content-box animate-fade-in-up">
                <div className="hero-tag-badge">
                  <Sparkles size={14} className="badge-icon" />
                  <span>{banner.tag}</span>
                </div>

                <h1 className="hero-title">
                  {banner.title}
                </h1>

                <p className="hero-subtitle">
                  {banner.subtitle}
                </p>

                <div className="hero-feature-bar">
                  <div className="feature-pill">
                    <ShieldCheck size={16} />
                    <span>{banner.badge}</span>
                  </div>
                  <div className="feature-pill">
                    <span>100% Xe riêng & HDV bản địa</span>
                  </div>
                </div>

                <div className="hero-cta-group">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={onOpenQuoteModal}
                    icon={ArrowRight}
                  >
                    {banner.ctaText}
                  </Button>
                  <Button
                    variant="dark"
                    size="lg"
                    onClick={onOpenQuoteModal}
                  >
                    {banner.secondaryCtaText}
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Controls Bar */}
      <div className="container hero-controls-container">
        <div className="hero-controls-bar">
          <div className="hero-slide-counter">
            <span className="current-idx">{String(currentSlide).padStart(2, '0')}</span>
            <span className="divider">/</span>
            <span className="total-idx">{String(totalSlides).padStart(2, '0')}</span>
          </div>

          <div className="hero-pagination-bullets" />

          <div className="hero-nav-arrows">
            <button type="button" className="hero-nav-btn prev" aria-label="Slide trước">
              <ChevronLeft size={20} />
            </button>
            <button type="button" className="hero-nav-btn next" aria-label="Slide tiếp theo">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
