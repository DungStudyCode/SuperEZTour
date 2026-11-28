import React from 'react';
import { Star, Quote, CheckCircle2, Heart } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import './CustomerStories.css';

const CustomerStories = ({ storiesData }) => {
  const stories = storiesData || [];
  const { isKorean } = useLanguage();

  if (!stories.length) return null;

  return (
    <section className="dest-section stories-section" id="stories">
      {/* Tailored Editorial Journal Background */}
      <div className="stories-ambient-bg" aria-hidden="true">
        <div className="stories-bg-glow-warm" />
        <div className="stories-bg-grain" />
        <div className="stories-watermark-text">
          SUPER EZ TOUR · VERIFIED TRAVEL MEMORIES · 100% PRIVATE EXPERIENCES
        </div>
      </div>
      <div className="dest-container">
        {/* Header */}
        <div className="stories-header">
          <span className="dest-kicker">
            <Quote size={14} />
            <span>TRAVEL JOURNAL & STORIES</span>
          </span>

          <h2 className="dest-title-editorial stories-title">
            {isKorean
              ? '고객들이 직접 전하는 생생한 여행 이야기'
              : 'Những Kỷ Niệm Thật Cùng Super EZ Tour'}
          </h2>

          <p className="dest-subtitle stories-sub">
            {isKorean
              ? 'Super EZ Tour와 함께 특별한 여정을 경험한 실제 고객님들의 솔직한 후기.'
              : 'Lắng nghe cảm nhận chân thực từ những du khách đã đồng hành cùng chuyến đi riêng của Super EZ Tour.'}
          </p>
        </div>

        {/* Journal Stories Grid */}
        <div className="stories-grid">
          {stories.map((story) => (
            <div key={story.id} className="story-journal-card">
              <div className="story-card-top">
                <div className="story-author-info">
                  <img
                    src={story.avatar}
                    alt={story.author}
                    className="story-avatar"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="story-author-name">{story.author}</h4>
                    <span className="story-author-origin">{story.origin} · {story.tripDate}</span>
                  </div>
                </div>

                <div className="story-stars-box">
                  {[...Array(story.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="#FFB52B" color="#FFB52B" />
                  ))}
                </div>
              </div>

              <div className="story-style-tag">
                <CheckCircle2 size={13} className="story-tag-icon" />
                <span>{story.groupStyle}</span>
              </div>

              <blockquote className="story-quote">
                “{story.quote}”
              </blockquote>

              {/* Photos Grid */}
              {story.photos && story.photos.length > 0 && (
                <div className="story-photos-strip">
                  {story.photos.map((photo, pIdx) => (
                    <div key={pIdx} className="dest-img-mask story-photo-item">
                      <img src={photo} alt={isKorean ? `${story.author} 여행 사진` : `Kỷ niệm ${story.author}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;