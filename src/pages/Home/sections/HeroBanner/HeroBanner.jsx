import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Sparkles, Search, MapPin, Compass } from 'lucide-react';
import { searchVietnamDestinations, VIETNAM_DESTINATIONS } from '../../../../data/vietnamDestinations';
import DestinationSearchModal from '../../../../components/common/DestinationSearch/DestinationSearchModal';
import './HeroBanner.css';

const HERO_SLIDES = [
  {
    id: 'da-nang-golden-bridge',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1920&q=85',
    destination: 'DA NANG · CENTRAL VIETNAM',
    tag: '3D INTERACTIVE TOUR AVAILABLE',
    badge: '100% PRIVATE ESCAPE',
    title: 'VIETNAM, CURATED FOR YOU.',
    titleKr: '당신만을 위한 특별한 베트남 여행.',
    description: '구름 위의 골든 브릿지와 황금빛 미케 비치. 100% 단독 전용 차량과 전담 한국어 가이드로 완성되는 하이엔드 저니.',
    route: '/destinations/da-nang',
    isAvailable: true,
  },
  {
    id: 'ha-long-cruise',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=85',
    destination: 'HA LONG BAY · NORTH VIETNAM',
    tag: 'ULTRA-LUXURY CRUISE',
    badge: 'COMING SOON — PRE-INQUIRY',
    title: 'THE DRAGON’S EMERALD HARBOR.',
    titleKr: '에메랄드 만 위에 펼쳐지는 6성급 수상 쉼터.',
    description: '2천 개의 카르스트 석회암 봉우리 사이로 흐르는 고요한 시간. 프라이빗 발코니에서 맞이하는 황홀한 선셋.',
    isAvailable: false,
    destId: 'ha-long',
  },
  {
    id: 'sapa-cloud-terraces',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=85',
    destination: 'SA PA · NORTH HIGHLANDS',
    tag: 'HIGHLAND RETREAT & TREKKING',
    badge: 'COMING SOON — PRE-INQUIRY',
    title: 'SANCTUARY ABOVE THE CLOUDS.',
    titleKr: '인도차이나의 지붕 판시판과 계단식 논의 비경.',
    description: '안개 자욱한 고산지대의 순수한 영혼과 럭셔리 산악 리조트. 둘만의 여유로운 산책과 힐링 스파.',
    isAvailable: false,
    destId: 'sa-pa',
  },
];

const HeroBanner = ({ onOpenQuoteModal }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [heroSearchInput, setHeroSearchInput] = useState('');
  const navigate = useNavigate();

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchModalOpen(true);
  };

  const handleQuickChip = (destId) => {
    if (destId === 'da-nang') {
      navigate('/destinations/da-nang');
    } else {
      setIsSearchModalOpen(true);
    }
  };

  const scrollToDestinations = (e) => {
    e.preventDefault();
    const el = document.getElementById('destinations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-banner-section" aria-label="Cinematic Hero">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1200}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={{
          prevEl: '.hero-nav-arrow.prev',
          nextEl: '.hero-nav-arrow.next',
        }}
        pagination={{
          el: '.hero-custom-pagination',
          clickable: true,
        }}
        className="hero-swiper-lux"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="hero-slide-lux">
            {/* Background Image with Cinematic Overlay */}
            <div
              className="hero-bg-layer"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-vignette-overlay" />
            </div>

            {/* Slide Foreground Content */}
            <div className="container hero-container-lux">
              <div className="hero-editorial-card">
                <div className="hero-eyebrow-row">
                  <span className="hero-dest-pill">
                    <MapPin size={12} className="text-gold" />
                    {slide.destination}
                  </span>
                  <span className="hero-badge-pill">
                    <Sparkles size={11} className="badge-sparkle" />
                    {slide.tag}
                  </span>
                </div>

                <h1 className="hero-main-title">
                  {slide.title}
                  <span className="hero-sub-title-kr">{slide.titleKr}</span>
                </h1>

                <p className="hero-lead-desc">{slide.description}</p>

                {/* Integrated Quick Search Bar (BOBTOUR Inspired) */}
                <form className="hero-search-bar" onSubmit={handleHeroSearchSubmit}>
                  <div className="search-input-wrap">
                    <Search size={18} className="search-input-icon text-gold" />
                    <input
                      type="text"
                      className="hero-search-input"
                      placeholder="어디로 떠나고 싶으신가요? (다낭, 하노이, 푸꾸옥...)"
                      value={heroSearchInput}
                      onChange={(e) => setHeroSearchInput(e.target.value)}
                      onFocus={() => setIsSearchModalOpen(true)}
                      readOnly
                    />
                  </div>
                  <button type="button" className="hero-search-btn" onClick={() => setIsSearchModalOpen(true)}>
                    <span>여행지 찾기</span>
                    <ArrowRight size={14} />
                  </button>
                </form>

                {/* Quick Destination Chips */}
                <div className="hero-quick-chips">
                  <span className="chips-label">인기 추천:</span>
                  <button
                    type="button"
                    className="chip-btn active"
                    onClick={() => handleQuickChip('da-nang')}
                  >
                    ★ 다낭 (3D 가상투어)
                  </button>
                  <button
                    type="button"
                    className="chip-btn"
                    onClick={() => handleQuickChip('ha-noi')}
                  >
                    하노이
                  </button>
                  <button
                    type="button"
                    className="chip-btn"
                    onClick={() => handleQuickChip('ha-long')}
                  >
                    하롱베이
                  </button>
                  <button
                    type="button"
                    className="chip-btn"
                    onClick={() => handleQuickChip('phu-quoc')}
                  >
                    푸꾸옥
                  </button>
                </div>

                {/* Main Action CTAs */}
                <div className="hero-actions-row">
                  <a
                    href="#destinations"
                    onClick={scrollToDestinations}
                    className="hero-cta-btn primary-gold"
                  >
                    <Compass size={16} />
                    <span>시그니처 여행지 둘러보기</span>
                    <ArrowRight size={14} />
                  </a>

                  <button
                    type="button"
                    className="hero-cta-btn secondary-glass"
                    onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
                  >
                    <Sparkles size={16} className="text-gold" />
                    <span>1:1 맞춤 견적 요청</span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Controls */}
        <div className="hero-controls-bar">
          <div className="container hero-controls-container">
            <div className="hero-nav-arrow-group">
              <button type="button" className="hero-nav-arrow prev" aria-label="이전 슬라이드">
                <ChevronLeft size={20} />
              </button>
              <button type="button" className="hero-nav-arrow next" aria-label="다음 슬라이드">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="hero-custom-pagination" />
          </div>
        </div>
      </Swiper>

      {/* Embedded Search Modal */}
      <DestinationSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </section>
  );
};

export default HeroBanner;
