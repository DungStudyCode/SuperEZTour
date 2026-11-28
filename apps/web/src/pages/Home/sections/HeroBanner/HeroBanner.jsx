import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Keyboard, A11y } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Compass, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import './HeroBanner.css';

/**
 * Super EZ Tour — Cinematic Hero 2.0
 * Alternating sequence of 9 slides: Type A (Destination) & Type B (Brand Story)
 * 4.5s Autoplay — 650ms Smooth Cinematic Transition — Synchronized Real-Time Progress Bar
 */
const HERO_SLIDES = [
  // 01. Da Nang — Type A: Destination
  {
    id: 'da-nang',
    key: 'daNang',
    type: 'destination',
    destId: 'da-nang',
    nameEn: 'DA NANG',
    nameKr: '다낭',
    nameVi: 'ĐÀ NẴNG',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1920&q=85',
    objectPosition: 'center 45%',
    route: '/destinations/da-nang',
    isAvailable: true,
  },
  // 02. Private Journeys — Type B: Brand Story
  {
    id: 'private-journeys',
    key: 'privateJourneys',
    type: 'story',
    destId: '',
    nameEn: 'PRIVATE JOURNEYS',
    nameKr: '프라이빗 맞춤 여행',
    nameVi: 'TOUR RIÊNG BIỆT',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1920&q=85',
    objectPosition: 'center 35%',
    actionType: 'quote',
    isAvailable: false,
  },
  // 03. Hanoi — Type A: Destination
  {
    id: 'ha-noi',
    key: 'haNoi',
    type: 'destination',
    destId: 'ha-noi',
    nameEn: 'HANOI',
    nameKr: '하노이',
    nameVi: 'HÀ NỘI',
    image: 'https://images.unsplash.com/photo-1689080492397-820b860a8606?auto=format&fit=crop&w=1920&q=85',
    objectPosition: 'center 40%',
    route: '/destinations/ha-noi',
    isAvailable: true,
  },
  // 04. Signature Stays — Type B: Brand Story
  {
    id: 'signature-stays',
    key: 'signatureStays',
    type: 'story',
    destId: 'signature-stays',
    nameEn: 'SIGNATURE STAYS',
    nameKr: '시그니처 숙소',
    nameVi: 'NGHỈ DƯỠNG TUYỂN CHỌN',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=85',
    objectPosition: 'center 50%',
    scrollTarget: '#travel-services',
    isAvailable: false,
  },
  // 05. Ha Long — Type A: Destination
  {
    id: 'ha-long',
    key: 'haLong',
    type: 'destination',
    destId: 'ha-long',
    nameEn: 'HA LONG BAY',
    nameKr: '하롱베이',
    nameVi: 'HẠ LONG',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=85',
    objectPosition: 'center 45%',
    actionType: 'quote',
    isAvailable: false,
  },
  // 06. Seamless Travel — Type B: Brand Story
  {
    id: 'seamless-travel',
    key: 'seamlessTravel',
    type: 'story',
    destId: 'seamless-travel',
    nameEn: 'SEAMLESS TRAVEL',
    nameKr: '전용 차량 서비스',
    nameVi: 'DỊCH VỤ XE RIÊNG',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1920&q=85',
    objectPosition: 'center 55%',
    scrollTarget: '#travel-services',
    isAvailable: false,
  },
  // 07. Sa Pa — Type A: Destination
  {
    id: 'sa-pa',
    key: 'saPa',
    type: 'destination',
    destId: 'sa-pa',
    nameEn: 'SA PA',
    nameKr: '사파',
    nameVi: 'SA PA',
    image: 'https://images.unsplash.com/photo-1787367897847-830be2c1b9d1?auto=format&fit=crop&w=1920&q=85',
    objectPosition: 'center 45%',
    actionType: 'quote',
    isAvailable: false,
  },
  // 08. Local Experiences — Type B: Brand Story
  {
    id: 'local-experiences',
    key: 'localExperiences',
    type: 'story',
    destId: 'local-experiences',
    nameEn: 'LOCAL EXPERIENCES',
    nameKr: '로컬 미식 & 문화',
    nameVi: 'TRẢI NGHIỆM BẢN ĐỊA',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=85',
    objectPosition: 'center 50%',
    scrollTarget: '#travel-themes',
    isAvailable: false,
  },
  // 09. Phu Quoc — Type A: Destination
  {
    id: 'phu-quoc',
    key: 'phuQuoc',
    type: 'destination',
    destId: 'phu-quoc',
    nameEn: 'PHU QUOC',
    nameKr: '푸꾸옥',
    nameVi: 'PHÚ QUỐC',
    image: 'https://images.unsplash.com/photo-1583402955903-68dd58b0d463?auto=format&fit=crop&w=1920&q=85',
    objectPosition: 'center 55%',
    actionType: 'quote',
    isAvailable: false,
  },
];

const HeroBanner = ({ onOpenQuoteModal }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const swiperRef = useRef(null);
  const sectionRef = useRef(null);
  const progressFillRef = useRef(null);
  const isVisibleRef = useRef(true);
  const isTabActiveRef = useRef(true);

  const navigate = useNavigate();
  const { t, isKorean } = useLanguage();

  const activeSlide = HERO_SLIDES[activeIndex] || HERO_SLIDES[0];

  // Pause autoplay when tab is inactive or out of viewport
  const pauseAutoplay = useCallback(() => {
    if (swiperRef.current?.autoplay && swiperRef.current.autoplay.running && !swiperRef.current.autoplay.paused) {
      swiperRef.current.autoplay.pause();
    }
  }, []);

  // Resume autoplay when returned to viewport / active tab
  const resumeAutoplay = useCallback(() => {
    if (
      swiperRef.current?.autoplay &&
      !prefersReducedMotion &&
      isVisibleRef.current &&
      isTabActiveRef.current
    ) {
      if (swiperRef.current.autoplay.paused) {
        swiperRef.current.autoplay.resume();
      } else if (!swiperRef.current.autoplay.running) {
        swiperRef.current.autoplay.start();
      }
    }
  }, [prefersReducedMotion]);

  // Accessibility: prefers-reduced-motion listener
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        swiperRef.current?.autoplay?.stop();
      } else {
        resumeAutoplay();
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleMotionChange);
      return () => mediaQuery.removeListener(handleMotionChange);
    }
  }, [resumeAutoplay]);

  // Pause when browser tab is inactive / hidden, resume smoothly when active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isTabActiveRef.current = false;
        pauseAutoplay();
      } else {
        isTabActiveRef.current = true;
        resumeAutoplay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pauseAutoplay, resumeAutoplay]);

  // IntersectionObserver: Pause when hero is scrolled out of viewport, resume when visible
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          resumeAutoplay();
        } else {
          pauseAutoplay();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionEl);
    return () => {
      observer.disconnect();
    };
  }, [pauseAutoplay, resumeAutoplay]);

  // CTA Click handler for different slide types
  const handleCtaClick = (slide) => {
    if (slide.route && slide.isAvailable) {
      navigate(slide.route);
    } else if (slide.scrollTarget) {
      const el = document.querySelector(slide.scrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (onOpenQuoteModal) {
        onOpenQuoteModal({
          source: 'hero',
          destinationId: slide.destId || '',
        });
      }
    } else if (onOpenQuoteModal) {
      onOpenQuoteModal({
        source: 'hero',
        destinationId: slide.destId || '',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="hero-banner-section"
      aria-label="Center-Stage Hero Carousel"
    >
      {/* Center-Stage Carousel Container */}
      <div className="hero-carousel-wrapper">
        <Swiper
          modules={[Navigation, Autoplay, Keyboard, A11y]}
          centeredSlides={true}
          loop={true}
          loopAdditionalSlides={2}
          speed={prefersReducedMotion ? 300 : 650}
          initialSlide={0}
          slideToClickedSlide={true}
          slidesPerView={1.15}
          spaceBetween={16}
          autoplay={
            prefersReducedMotion
              ? false
              : {
                  delay: 4500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false, // Autoplay continues on hover as specified
                }
          }
          navigation={{
            prevEl: '.hero-control-btn.prev',
            nextEl: '.hero-control-btn.next',
          }}
          keyboard={{ enabled: true }}
          a11y={{ enabled: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveIndex(swiper.realIndex);
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
            if (progressFillRef.current) {
              progressFillRef.current.style.transform = 'scaleX(0)';
            }
          }}
          onAutoplayTimeLeft={(swiper, timeLeft, progress) => {
            if (progressFillRef.current && !prefersReducedMotion) {
              const scale = Math.min(1, Math.max(0, 1 - progress));
              progressFillRef.current.style.transform = `scaleX(${scale})`;
            }
          }}
          className="hero-center-stage-swiper"
          breakpoints={{
            320: {
              slidesPerView: 1.15,
              spaceBetween: 14,
            },
            640: {
              slidesPerView: 1.22,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 1.3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 1.38,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 1.44,
              spaceBetween: 26,
            },
            1536: {
              slidesPerView: 1.48,
              spaceBetween: 28,
            },
          }}
        >
          {HERO_SLIDES.map((slide, idx) => {
            const slideKey = slide.key;
            const kicker = t(`home.hero.slides.${slideKey}.kicker`, `${String(idx + 1).padStart(2, '0')} / ${slide.nameEn}`);
            const titleEn = t(`home.hero.slides.${slideKey}.titleEn`, 'BEYOND THE ORDINARY.');
            const subtitle = t(`home.hero.slides.${slideKey}.subtitle`, isKorean ? slide.nameKr : slide.nameVi);
            const ctaText = t(`home.hero.slides.${slideKey}.cta`, isKorean ? '맞춤 상담하기' : 'Khám phá ngay');
            const isBrandStory = slide.type === 'story';

            return (
              <SwiperSlide
                key={slide.id}
                className={`hero-stage-slide ${isBrandStory ? 'is-brand-story' : 'is-destination'}`}
              >
                {/* Media Layer with Cinematic Vignette */}
                <div className="slide-media-wrap">
                  <img
                    src={slide.image}
                    alt={`${slide.nameEn} - Super EZ Tour`}
                    className="slide-img"
                    style={{ objectPosition: slide.objectPosition }}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                  <div className={`slide-cinematic-gradient ${isBrandStory ? 'brand-story-gradient' : ''}`} />
                </div>

                {/* Editorial Slide Content */}
                <div className="slide-editorial-content">
                  <div className="slide-kicker-wrap">
                    <span className={`slide-kicker ${isBrandStory ? 'kicker-brand-story' : ''}`}>
                      {isBrandStory ? (
                        <Sparkles size={11} className="kicker-icon text-orange" />
                      ) : (
                        <MapPin size={11} className="kicker-icon text-gold" />
                      )}
                      <span>{kicker}</span>
                    </span>
                  </div>

                  <h2 className="slide-title-en">{titleEn}</h2>
                  <p className="slide-title-loc">{subtitle}</p>

                  {/* Single High-End CTA */}
                  <div className="slide-cta-row">
                    {slide.isAvailable && slide.route ? (
                      <Link
                        to={slide.route}
                        className="slide-primary-cta"
                      >
                        <span>{ctaText}</span>
                        <ArrowRight size={15} className="slide-cta-arrow" />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="slide-primary-cta"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCtaClick(slide);
                        }}
                      >
                        {isBrandStory ? (
                          <Compass size={14} className="text-orange" />
                        ) : (
                          <Sparkles size={14} className="text-orange" />
                        )}
                        <span>{ctaText}</span>
                        <ArrowRight size={15} className="slide-cta-arrow" />
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Navigation Controls Bar (Below Carousel) */}
      <div className="hero-carousel-controls">
        <div className="hero-controls-container">
          {/* Left: Counter & Destination / Story Name */}
          <div className="hero-controls-left">
            <div className="hero-slide-counter">
              <span className="counter-current">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="counter-divider">/</span>
              <span className="counter-total">
                {String(HERO_SLIDES.length).padStart(2, '0')}
              </span>
            </div>
            <span className="hero-active-dest-name">
              {isKorean ? activeSlide.nameKr : activeSlide.nameVi}
            </span>
          </div>

          {/* Center: Sleek Real-Time Autoplay Progress Indicator (4.5s Synchronized) */}
          <div className="hero-controls-center">
            <div
              className="hero-progress-track"
              role="progressbar"
              aria-label="Carousel autoplay progress"
              aria-valuenow={Math.round(((activeIndex + 1) / HERO_SLIDES.length) * 100)}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                ref={progressFillRef}
                className="hero-progress-fill"
              />
            </div>
          </div>

          {/* Right: Prev & Next Navigation Buttons */}
          <div className="hero-controls-right">
            <div className="hero-nav-arrow-group">
              <button
                type="button"
                className="hero-control-btn prev"
                aria-label={t('common.prevSlide', 'Previous slide')}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="hero-control-btn next"
                aria-label={t('common.nextSlide', 'Next slide')}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
