import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Play,
  Sparkles,
  MapPin,
  Star,
  ArrowRight,
  Compass,
  MessageSquarePlus,
  Clock,
  Quote,
  Eye,
  Camera,
} from 'lucide-react';
import Container from '../../../../components/common/Container/Container';
import { useLanguage } from '../../../../context/LanguageContext';
import { travelerStoriesService } from '../../../../services/travelerStoriesService';
import VideoViewerModal from './VideoViewerModal';
import ReviewDetailModal from './ReviewDetailModal';
import StorySubmissionModal from './StorySubmissionModal';
import './TravelReviews.css';

if (typeof window !== 'undefined' && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Super EZ Tour — Traveler Stories 2.0
 * Premium UGC Video Showcase & Authentic Customer Reviews
 *
 * Architecture:
 * - Tầng 1: Travel Moments (9:16 portrait video short-form showcase)
 * - Tầng 2: Traveler Reviews (Compact editorial review cards with full modal view)
 * - Tầng 3: Community UGC Submission Strip
 * - Data-driven via travelerStoriesService adapter
 */
const TravelReviews = ({ onOpenQuoteModal }) => {
  const { t, isKorean } = useLanguage();
  const sectionRef = useRef(null);

  // Filter state
  const [selectedDest, setSelectedDest] = useState('all');
  const [stories, setStories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filterTabs, setFilterTabs] = useState([]);

  // Modals state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerStoryIndex, setViewerStoryIndex] = useState(0);

  const [detailReview, setDetailReview] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [submissionOpen, setSubmissionOpen] = useState(false);

  // Trigger element references for accessibility focus return
  const lastTriggerRef = useRef(null);

  // Load filter options based on canonical destinations with content
  useEffect(() => {
    const tabs = travelerStoriesService.getAvailableFilterDestinations(isKorean);
    setFilterTabs(tabs);
  }, [isKorean]);

  // Load stories and reviews based on destination filter
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const [fetchedStories, fetchedReviews] = await Promise.all([
        travelerStoriesService.getStories({ destination: selectedDest }),
        travelerStoriesService.getReviews({ destination: selectedDest, limit: 3 }),
      ]);

      if (isMounted) {
        setStories(fetchedStories);
        setReviews(fetchedReviews);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [selectedDest]);

  // GSAP Entrance Animations
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    let ctx;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        });

        tl.from('.stories-editorial-header', {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
        })
          .from(
            '.stories-filter-bar',
            {
              opacity: 0,
              y: 14,
              duration: 0.45,
              ease: 'power2.out',
            },
            '-=0.3'
          )
          .from(
            '.travel-moment-card',
            {
              opacity: 0,
              y: 20,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power2.out',
            },
            '-=0.2'
          );
      }, sectionRef);
    } catch (e) {
      console.warn('TravelerStories GSAP animation warning:', e);
    }

    return () => {
      if (ctx && typeof ctx.revert === 'function') {
        ctx.revert();
      }
    };
  }, []);

  // Open Video Viewer
  const handleOpenViewer = (story, index, event) => {
    lastTriggerRef.current = event?.currentTarget || null;
    setViewerStoryIndex(index);
    setViewerOpen(true);
  };

  // Open Review Detail
  const handleOpenReview = (rev, event) => {
    lastTriggerRef.current = event?.currentTarget || null;
    setDetailReview(rev);
    setDetailOpen(true);
  };

  // Open Submission Modal
  const handleOpenSubmission = (event) => {
    lastTriggerRef.current = event?.currentTarget || null;
    setSubmissionOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="traveler-stories"
      className="traveler-stories-section"
      aria-label="Traveler Stories & Reviews"
    >
      {/* Legacy anchor for existing navigation links */}
      <span id="reviews" className="reviews-legacy-anchor" aria-hidden="true" />

      <Container>
        {/* =========================================================
            01. EDITORIAL SECTION HEADER
        ========================================================= */}
        <header className="stories-editorial-header">
          <div className="stories-eyebrow-badge">
            <Sparkles size={12} className="text-orange" />
            <span>{t('home.travelerStories.eyebrow', 'TRAVELER STORIES')}</span>
          </div>

          <h2 className="stories-main-title">
            {t(
              'home.travelerStories.heading',
              isKorean
                ? '여행자의 시선으로 만나는 특별한 순간들'
                : 'Những chuyến đi đáng nhớ, qua góc nhìn du khách.'
            )}
          </h2>

          <p className="stories-main-desc">
            {t(
              'home.travelerStories.description',
              isKorean
                ? '베트남 여행에서 만난 특별한 순간과 여행 이야기를 만나보세요.'
                : 'Những khoảnh khắc, câu chuyện và cảm nhận được chia sẻ từ các hành trình khám phá Việt Nam.'
            )}
          </p>
        </header>

        {/* =========================================================
            02. DESTINATION FILTER BAR & SUBMISSION CTA
        ========================================================= */}
        <div className="stories-filter-bar">
          <div className="filter-chips-track" role="tablist" aria-label="Filter Stories by Destination">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selectedDest === tab.id}
                className={`filter-pill-btn ${selectedDest === tab.id ? 'is-active' : ''}`}
                onClick={() => setSelectedDest(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="filter-actions-right">
            <button
              type="button"
              className="stories-share-btn"
              onClick={handleOpenSubmission}
              aria-label={t(
                'home.travelerStories.shareAction',
                isKorean ? '나의 여행 이야기 공유하기' : 'Chia sẻ khoảnh khắc'
              )}
            >
              <Camera size={14} />
              <span>
                {t(
                  'home.travelerStories.shareAction',
                  isKorean ? '나의 여행 이야기 공유하기' : 'Chia sẻ khoảnh khắc'
                )}
              </span>
            </button>
          </div>
        </div>

        {/* =========================================================
            EMPTY STATE (If filtered destination has no items)
        ========================================================= */}
        {stories.length === 0 && reviews.length === 0 && (
          <div className="stories-empty-state">
            <div className="empty-icon-circle">
              <Compass size={36} className="text-orange" />
            </div>
            <h3 className="empty-title">
              {isKorean
                ? '선택하신 여행지의 스토리가 곧 공개됩니다'
                : 'Chưa có khoảnh khắc nào tại điểm đến này'}
            </h3>
            <p className="empty-desc">
              {isKorean
                ? '새로운 여행자 스토리를 준비 중입니다. 다른 여행지를 선택하시거나 전체 스토리를 확인해 보세요.'
                : 'Chúng tôi đang chuẩn bị thêm nhiều câu chuyện thực tế. Bạn có thể xem toàn bộ hoặc các điểm đến khác.'}
            </p>
            <button
              type="button"
              className="empty-reset-btn"
              onClick={() => setSelectedDest('all')}
            >
              <span>{isKorean ? '전체 스토리 보기' : 'Xem tất cả khoảnh khắc'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* =========================================================
            03. TẦNG 1: TRAVEL MOMENTS (Short-form Video Showcase)
        ========================================================= */}
        {stories.length > 0 && (
          <div className="travel-moments-block">
            <div className="moments-subhead-row">
              <div className="subhead-title-wrap">
                <span className="subhead-kicker">01 / TRAVEL MOMENTS</span>
                <h3 className="subhead-heading">
                  {t(
                    'home.travelerStories.momentsTitle',
                    isKorean ? '생생한 여정의 순간들' : 'Thước phim khoảnh khắc'
                  )}
                </h3>
              </div>
              <span className="moments-note">
                {t(
                  'home.travelerStories.momentsNote',
                  isKorean ? '※ 숏폼 영상으로 만나는 프라이빗 투어 현장' : '※ Video trải nghiệm thực tế tỉ lệ 9:16'
                )}
              </span>
            </div>

            {/* Moments Grid / Horizontal Scroll Track */}
            <div className="travel-moments-scroll-track">
              {stories.map((story, idx) => {
                const title = isKorean ? story.title?.ko : story.title?.vi;
                const dest = isKorean
                  ? story.destinationName?.ko
                  : story.destinationName?.vi;

                return (
                  <div
                    key={story.id}
                    className="travel-moment-card"
                    role="button"
                    tabIndex={0}
                    aria-label={`${title} - ${dest}`}
                    onClick={(e) => handleOpenViewer(story, idx, e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleOpenViewer(story, idx, e);
                      }
                    }}
                  >
                    {/* 9:16 Thumbnail Image */}
                    <div className="moment-card-media">
                      <img
                        src={story.thumbnailUrl}
                        alt={title}
                        className="moment-thumb-img"
                        loading="lazy"
                      />

                      {/* Dark Scrim */}
                      <div className="moment-card-scrim" />

                      {/* Top Badges */}
                      <div className="moment-top-row">
                        <span className="moment-dest-pill">
                          <MapPin size={10} />
                          <span>{dest}</span>
                        </span>
                        {story.isDemo && (
                          <span className="moment-demo-pill">DEMO</span>
                        )}
                      </div>

                      {/* Center Play Button Overlay */}
                      <div className="moment-play-button" aria-hidden="true">
                        <Play size={18} className="play-icon" />
                      </div>

                      {/* Bottom Info Overlay */}
                      <div className="moment-bottom-row">
                        <span className="moment-author-tag">
                          {story.author?.displayName}
                        </span>
                        <h4 className="moment-card-title">{title}</h4>
                        <div className="moment-meta-line">
                          <span className="moment-duration">
                            <Clock size={11} />
                            <span>{story.duration}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================
            04. TẦNG 2: TRAVELER REVIEWS (Compact Editorial Quotes)
        ========================================================= */}
        {reviews.length > 0 && (
          <div className="traveler-reviews-block">
            <div className="reviews-subhead-row">
              <div className="subhead-title-wrap">
                <span className="subhead-kicker">02 / AUTHENTIC REVIEWS</span>
                <h3 className="subhead-heading">
                  {t(
                    'home.travelerStories.reviewsTitle',
                    isKorean ? '여행자들의 진솔한 이야기' : 'Cảm nhận từ khách hàng'
                  )}
                </h3>
              </div>
              <span className="reviews-subhead-badge">
                {isKorean ? '100% 프라이빗 투어 후기' : '100% Chuyến đi riêng tư'}
              </span>
            </div>

            {/* Compact Editorial Cards Grid */}
            <div className="editorial-reviews-grid">
              {reviews.map((rev) => {
                const title = isKorean ? rev.title?.ko : rev.title?.vi;
                const content = isKorean ? rev.content?.ko : rev.content?.vi;
                const dest = isKorean
                  ? rev.destinationName?.ko
                  : rev.destinationName?.vi;
                const party = isKorean
                  ? rev.author?.travelParty?.ko
                  : rev.author?.travelParty?.vi;

                return (
                  <article key={rev.id} className="editorial-review-card">
                    {/* Header: User & Rating */}
                    <div className="rev-compact-header">
                      <div className="rev-compact-user">
                        <img
                          src={rev.author?.avatar}
                          alt={rev.author?.displayName}
                          className="rev-compact-avatar"
                          loading="lazy"
                        />
                        <div className="rev-compact-names">
                          <strong className="rev-compact-name">
                            {rev.author?.displayName}
                          </strong>
                          <span className="rev-compact-party">{party}</span>
                        </div>
                      </div>

                      <div className="rev-compact-dest-tag">
                        <MapPin size={11} />
                        <span>{dest}</span>
                      </div>
                    </div>

                    {/* Stars & Travel Date */}
                    <div className="rev-compact-rating-line">
                      <div className="rev-compact-stars">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} size={13} className="star-gold" />
                        ))}
                      </div>
                      <span className="rev-compact-date">{rev.travelDate}</span>
                      {rev.isDemo && (
                        <span className="rev-compact-demo-badge">DEMO</span>
                      )}
                    </div>

                    {/* Content */}
                    <h4 className="rev-compact-title">{title}</h4>
                    <p className="rev-compact-body">{content}</p>

                    {/* Photo thumbnail & Read more trigger */}
                    <div className="rev-compact-footer">
                      {rev.tripPhotoUrl && (
                        <div
                          className="rev-mini-photo"
                          onClick={(e) => handleOpenReview(rev, e)}
                          role="button"
                          tabIndex={0}
                          aria-label={`View photo from ${title}`}
                        >
                          <img
                            src={rev.tripPhotoUrl}
                            alt={title}
                            className="mini-photo-img"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <button
                        type="button"
                        className="rev-read-more-btn"
                        onClick={(e) => handleOpenReview(rev, e)}
                      >
                        <span>{isKorean ? '전체 후기 보기' : 'Xem toàn bộ cảm nhận'}</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================
            05. TẦNG 3: SUBTLE UGC COMMUNITY BANNER
        ========================================================= */}
        <div className="stories-community-strip">
          <div className="community-strip-content">
            <span className="community-strip-badge">
              <Sparkles size={12} />
              <span>{isKorean ? '여행자 커뮤니티' : 'CỘNG ĐỒNG DU KHÁCH'}</span>
            </span>
            <h3 className="community-strip-title">
              {t(
                'home.travelerStories.communityBannerTitle',
                isKorean
                  ? 'Super EZ Tour와 함께한 특별한 여정이 있으신가요?'
                  : 'Bạn vừa có một chuyến đi tuyệt vời cùng Super EZ Tour?'
              )}
            </h3>
            <p className="community-strip-desc">
              {t(
                'home.travelerStories.communityBannerDesc',
                isKorean
                  ? '소중한 여행 순간을 사진이나 숏폼 영상으로 공유해 보세요. 다른 여행자들에게 따뜻한 영감이 됩니다.'
                  : 'Chia sẻ thước phim ngắn hoặc hình ảnh kỷ niệm của bạn để lan tỏa cảm hứng tới những hành trình sắp tới.'
              )}
            </p>
          </div>

          <div className="community-strip-cta">
            <button
              type="button"
              className="community-cta-btn"
              onClick={handleOpenSubmission}
            >
              <MessageSquarePlus size={16} />
              <span>
                {t(
                  'home.travelerStories.communityBannerBtn',
                  isKorean ? '나의 여행 이야기 공유하기' : 'Chia sẻ khoảnh khắc của bạn'
                )}
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* =========================================================
          INTERACTIVE MODALS
      ========================================================= */}
      {/* 1. 9:16 Video Viewer Modal */}
      <VideoViewerModal
        stories={stories}
        currentIndex={viewerStoryIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onOpenQuoteModal={onOpenQuoteModal}
        triggerRef={lastTriggerRef}
      />

      {/* 2. Review Detail Reading Modal */}
      <ReviewDetailModal
        review={detailReview}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        triggerRef={lastTriggerRef}
      />

      {/* 3. Customer Story Submission Preview Modal */}
      <StorySubmissionModal
        isOpen={submissionOpen}
        onClose={() => setSubmissionOpen(false)}
        triggerRef={lastTriggerRef}
      />
    </section>
  );
};

export default TravelReviews;
