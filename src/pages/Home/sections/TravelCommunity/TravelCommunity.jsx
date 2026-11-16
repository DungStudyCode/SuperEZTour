import React, { useState } from 'react';
import { COMMUNITY_CATEGORIES, COMMUNITY_POSTS } from '../../../../data/community';
import SectionHeading from '../../../../components/common/SectionHeading/SectionHeading';
import Container from '../../../../components/common/Container/Container';
import { MessageSquare, Eye, Calendar, ArrowRight, Flame, Bookmark, PenTool } from 'lucide-react';
import Button from '../../../../components/common/Button/Button';
import './TravelCommunity.css';

const TravelCommunity = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <section id="community" className="section travel-community-section section-bg-alt">
      <Container>
        <div className="community-header-row">
          <SectionHeading
            tagline="CỘNG ĐỒNG DU LỊCH SUPER EZ TOUR"
            title="Cẩm nang & Kinh nghiệm bỏ túi"
            subtitle="Chia sẻ thực tế từ cộng đồng hơn 85,000 thành viên yêu thích du lịch tour riêng Châu Á."
            align="left"
          />

          <Button
            variant="outline"
            size="md"
            rightIcon={ArrowRight}
            onClick={() => alert('Chuyển hướng đến diễn đàn Super EZ Tour Community.')}
          >
            Đến Diễn Đàn Thảo Luận
          </Button>
        </div>

        {/* 3 Columns Layout for 3 Categories */}
        <div className="community-categories-grid">
          {COMMUNITY_CATEGORIES.map((cat) => {
            const posts = COMMUNITY_POSTS[cat.id] || [];

            return (
              <div key={cat.id} className="community-category-box">
                {/* Category Header */}
                <div className="category-box-header">
                  <div className="cat-title-group">
                    <h3 className="cat-title">{cat.name}</h3>
                  </div>
                  <button
                    type="button"
                    className="cat-more-btn"
                    onClick={() => alert(`Xem thêm danh mục ${cat.name}`)}
                  >
                    <span>Xem thêm</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <p className="category-box-desc">{cat.description}</p>

                {/* Posts List */}
                <div className="category-posts-list">
                  {posts.map((post) => (
                    <article key={post.id} className="community-post-item">
                      <div className="post-header-line">
                        <span className="post-tag">{post.tag}</span>
                        {post.isHot && (
                          <span className="post-hot-badge">
                            <Flame size={12} />
                            <span>HOT</span>
                          </span>
                        )}
                      </div>

                      <a
                        href="#community"
                        className="post-title line-clamp-2"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Đang mở bài viết: "${post.title}"`);
                        }}
                      >
                        {post.title}
                      </a>

                      <div className="post-meta-line">
                        <span className="post-author">{post.author}</span>
                        <span className="post-meta-dot">·</span>
                        <div className="post-meta-stat">
                          <Eye size={13} />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <span className="post-meta-dot">·</span>
                        <div className="post-meta-stat">
                          <MessageSquare size={13} />
                          <span>{post.commentsCount}</span>
                        </div>
                        <span className="post-meta-dot">·</span>
                        <span className="post-date">{post.date}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TravelCommunity;
