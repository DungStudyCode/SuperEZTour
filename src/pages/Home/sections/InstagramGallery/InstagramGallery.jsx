import React, { useState } from 'react';
import { INSTAGRAM_PHOTOS } from '../../../../data/instagram';
import SectionHeading from '../../../../components/common/SectionHeading/SectionHeading';
import Container from '../../../../components/common/Container/Container';
import { Instagram, Heart, MessageCircle, X, ExternalLink, MapPin } from 'lucide-react';
import './InstagramGallery.css';

const InstagramGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section className="section instagram-gallery-section">
      <Container>
        <SectionHeading
          tagline="INSTAGRAM GALLERY @SUPEREZTOUR.VN"
          title="#SuperEZTour - Du lịch Châu Á theo cách riêng của bạn"
          subtitle="Cùng ngắm nhìn những khoảnh khắc tuyệt đẹp và trải nghiệm khó quên của du khách tại 16 điểm đến nổi tiếng."
          align="center"
        />

        {/* 8-Photo Grid */}
        <div className="instagram-grid">
          {INSTAGRAM_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className="insta-grid-item hover-zoom-container"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.image}
                alt={photo.caption}
                loading="lazy"
                className="insta-img hover-zoom-image"
              />

              {/* Hover Overlay */}
              <div className="insta-hover-overlay">
                <Instagram size={28} className="insta-icon" />
                <div className="insta-stats">
                  <span className="insta-stat">
                    <Heart size={16} fill="white" />
                    <span>{photo.likes.toLocaleString()}</span>
                  </span>
                  <span className="insta-stat">
                    <MessageCircle size={16} fill="white" />
                    <span>{photo.comments}</span>
                  </span>
                </div>
                <span className="insta-dest-label">{photo.destination}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View on Instagram Button */}
        <div className="insta-bottom-cta">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="insta-follow-btn"
          >
            <Instagram size={20} />
            <span>Theo dõi @supereztour.vn trên Instagram</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </Container>

      {/* Image Lightbox Modal */}
      {selectedPhoto && (
        <div className="lightbox-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="lightbox-modal animate-slide-down" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Đóng ảnh"
            >
              <X size={24} />
            </button>

            <div className="lightbox-image-wrap">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.caption}
                className="lightbox-img"
              />
            </div>

            <div className="lightbox-details">
              <div className="lightbox-user-row">
                <div className="lightbox-user-badge">
                  <Instagram size={18} className="text-primary" />
                  <strong>{selectedPhoto.author}</strong>
                </div>
                <div className="lightbox-dest-badge">
                  <MapPin size={14} />
                  <span>{selectedPhoto.destination}</span>
                </div>
              </div>

              <p className="lightbox-caption">{selectedPhoto.caption}</p>

              <div className="lightbox-stats-row">
                <span className="stat-item">
                  <Heart size={16} fill="#ED2028" color="#ED2028" />
                  <span>{selectedPhoto.likes.toLocaleString()} lượt thích</span>
                </span>
                <span className="stat-item">
                  <MessageCircle size={16} />
                  <span>{selectedPhoto.comments} bình luận</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InstagramGallery;
