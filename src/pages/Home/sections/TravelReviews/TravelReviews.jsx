import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { REVIEWS } from '../../../../data/reviews';
import Container from '../../../../components/common/Container/Container';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, ThumbsUp, MapPin, Quote, Sparkles } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import './TravelReviews.css';

const TravelReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { t, isKorean } = useLanguage();

  const filterOptions = [
    { id: 'all', label: isKorean ? '전체 후기' : 'Tất cả đánh giá' },
    { id: 'da-nang', label: isKorean ? '다낭' : 'Đà Nẵng' },
    { id: 'ha-noi', label: isKorean ? '하노이' : 'Hà Nội' },
    { id: 'ha-long', label: isKorean ? '하롱베이' : 'Hạ Long' },
    { id: 'phu-quoc', label: isKorean ? '푸꾸옥' : 'Phú Quốc' },
    { id: 'sa-pa', label: isKorean ? '사파' : 'Sa Pa' },
  ];

  const filteredReviews = selectedFilter === 'all'
    ? REVIEWS
    : REVIEWS.filter((r) => r.destinationId === selectedFilter);

  return (
    <section id="reviews" className="section travel-reviews-section" aria-label="Customer Reviews">
      <Container>
        {/* Section Header */}
        <div className="reviews-header-wrap">
          <div className="reviews-heading-left">
            <div className="reviews-eyebrow">
              <Sparkles size={14} className="text-orange" />
              <span>
                {isKorean ? '85,000+ 고객이 직접 경험한 신뢰' : '85,000+ KHÁCH HÀNG ĐÃ TRẢI NGHIỆM'}
              </span>
            </div>
            <h2 className="reviews-main-title">
              {isKorean ? '실제 여행객의 생생한 프라이빗 투어 후기' : 'Đánh giá thực tế từ du khách'}
            </h2>
            <p className="reviews-sub-desc">
              {isKorean
                ? 'Super EZ Tour 100% 단독 프라이빗 투어를 직접 이용하신 고객님들의 솔직한 이용 후기입니다.'
                : '100% cảm nhận chân thực của khách hàng đã sử dụng dịch vụ tour riêng không ghép đoàn của Super EZ Tour.'}
            </p>
          </div>

          {/* Overall Rating Score Widget */}
          <div className="overall-rating-card">
            <div className="rating-score-large">
              <span className="score-num">4.98</span>
              <span className="score-max">/5.0</span>
            </div>
            <div className="rating-stars-group">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="star-fill" />
                ))}
              </div>
              <span className="rating-desc">
                {isKorean ? '82,400+ 건 이상의 5점 만점 평가' : 'Hơn 82,400+ đánh giá 5 sao'}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Chips & Arrows */}
        <div className="review-filters-bar">
          <div className="review-filters-scroll">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`review-filter-chip ${selectedFilter === opt.id ? 'is-active' : ''}`}
                onClick={() => setSelectedFilter(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="reviews-carousel-arrows">
            <button type="button" className="rev-arrow-btn rev-prev" aria-label="Previous Reviews">
              <ChevronLeft size={18} />
            </button>
            <button type="button" className="rev-arrow-btn rev-next" aria-label="Next Reviews">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Reviews Swiper Carousel */}
        <div className="reviews-swiper-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: '.rev-arrow-btn.rev-prev',
              nextEl: '.rev-arrow-btn.rev-next',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="reviews-swiper"
          >
            {filteredReviews.map((rev) => {
              const reviewerName = isKorean ? rev.reviewerMasked : rev.reviewerMaskedVi;
              const destName = isKorean ? rev.destination : rev.destinationVi;
              const packName = isKorean ? rev.packName : rev.packNameVi;
              const reviewTitle = isKorean ? rev.title : rev.titleVi;
              const reviewContent = isKorean ? rev.content : rev.contentVi;

              return (
                <SwiperSlide key={rev.id}>
                  <div className="review-card-lux">
                    {/* Header */}
                    <div className="rev-card-header">
                      <div className="rev-user-profile">
                        <img
                          src={rev.avatar}
                          alt={reviewerName}
                          className="rev-user-avatar"
                          loading="lazy"
                        />
                        <div className="rev-user-info">
                          <strong className="rev-user-name">{reviewerName} 고객님</strong>
                          <span className="rev-pack-name">{packName}</span>
                        </div>
                      </div>
                      <div className="rev-badge-tag">
                        <MapPin size={11} className="text-orange" />
                        <span>{destName}</span>
                      </div>
                    </div>

                    {/* Stars & Verified */}
                    <div className="rev-stars-row">
                      <div className="rev-stars-list">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} className="star-fill" />
                        ))}
                      </div>
                      {rev.verified && (
                        <span className="rev-verified-pill">
                          <CheckCircle2 size={12} />
                          <span>{isKorean ? '실제 이용 검증' : 'Đã xác thực'}</span>
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <h3 className="rev-body-title">{reviewTitle}</h3>
                    <p className="rev-body-desc">{reviewContent}</p>

                    {/* Trip Photo Preview */}
                    {rev.tripImage && (
                      <div className="rev-photo-wrap">
                        <img
                          src={rev.tripImage}
                          alt={reviewTitle}
                          className="rev-photo-img"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Footer */}
                    <div className="rev-card-footer">
                      <span className="rev-date">{rev.date}</span>
                      <div className="rev-helpful">
                        <ThumbsUp size={13} />
                        <span>{rev.likes}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default TravelReviews;
