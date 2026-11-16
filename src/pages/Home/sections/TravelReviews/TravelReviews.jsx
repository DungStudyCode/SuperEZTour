import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { REVIEWS } from '../../../../data/reviews';
import SectionHeading from '../../../../components/common/SectionHeading/SectionHeading';
import Container from '../../../../components/common/Container/Container';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, ThumbsUp, MapPin, Quote } from 'lucide-react';
import './TravelReviews.css';

const TravelReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'Tất cả đánh giá' },
    { id: 'Cebu', label: 'Cebu' },
    { id: 'Đà Nẵng', label: 'Đà Nẵng' },
    { id: 'Bali', label: 'Bali' },
    { id: 'Kota Kinabalu', label: 'Kota Kinabalu' },
    { id: 'Boracay', label: 'Boracay' }
  ];

  const filteredReviews = selectedFilter === 'all'
    ? REVIEWS
    : REVIEWS.filter((r) => r.destination === selectedFilter);

  return (
    <section id="reviews" className="section travel-reviews-section">
      <Container>
        {/* Section Header */}
        <div className="reviews-header-wrap">
          <SectionHeading
            tagline="85,000+ KHÁCH HÀNG ĐÃ TRẢI NGHIỆM"
            title="Đánh giá thực tế từ du khách"
            subtitle="100% cảm nhận chân thực của khách hàng đã sử dụng dịch vụ tour riêng không ghép đoàn của Super EZ Tour tại các điểm đến Châu Á."
            align="left"
          />

          {/* Overall Rating Score Widget */}
          <div className="overall-rating-card">
            <div className="rating-score-large">
              <span className="score-num">4.95</span>
              <span className="score-max">/5.0</span>
            </div>
            <div className="rating-stars-group">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="star-fill" />
                ))}
              </div>
              <span className="rating-desc">Hơn 82,400+ đánh giá 5 sao</span>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
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
            <button type="button" className="rev-arrow-btn rev-prev" aria-label="Đánh giá trước">
              <ChevronLeft size={20} />
            </button>
            <button type="button" className="rev-arrow-btn rev-next" aria-label="Đánh giá tiếp theo">
              <ChevronRight size={20} />
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
              nextEl: '.rev-arrow-btn.rev-next'
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24
              }
            }}
            className="reviews-swiper"
          >
            {filteredReviews.map((review) => (
              <SwiperSlide key={review.id} className="review-slide">
                <div className="review-card">
                  {/* Card Image */}
                  {review.tripImage && (
                    <div className="review-card-media hover-zoom-container">
                      <img
                        src={review.tripImage}
                        alt={review.title}
                        loading="lazy"
                        className="review-img hover-zoom-image"
                      />
                      <div className="review-dest-pill">
                        <MapPin size={12} />
                        <span>{review.destination}, {review.country}</span>
                      </div>
                      <div className="review-pack-pill">
                        {review.packName}
                      </div>
                    </div>
                  )}

                  <div className="review-card-body">
                    {/* Rating & Verified */}
                    <div className="review-meta-row">
                      <div className="review-stars">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={15} className="star-fill" />
                        ))}
                      </div>
                      {review.verified && (
                        <div className="verified-badge">
                          <CheckCircle2 size={13} className="text-success" />
                          <span>Khách hàng xác thực</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="review-title">
                      {review.title}
                    </h3>

                    {/* Content (Line clamped) */}
                    <p className="review-content line-clamp-3">
                      "{review.content}"
                    </p>

                    {/* Reviewer Details */}
                    <div className="review-author-row">
                      <div className="author-info">
                        <img
                          src={review.avatar}
                          alt={review.reviewer}
                          className="author-avatar"
                        />
                        <div className="author-names">
                          <span className="author-name">{review.reviewerMasked}</span>
                          <span className="review-date">{review.date}</span>
                        </div>
                      </div>

                      <div className="review-likes">
                        <ThumbsUp size={14} />
                        <span>{review.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default TravelReviews;
