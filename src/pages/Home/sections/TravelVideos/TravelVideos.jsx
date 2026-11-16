import React, { useState } from 'react';
import { TRAVEL_VIDEOS } from '../../../../data/videos';
import SectionHeading from '../../../../components/common/SectionHeading/SectionHeading';
import Container from '../../../../components/common/Container/Container';
import { Play, X, Eye, Clock, ArrowRight, Video } from 'lucide-react';
import Button from '../../../../components/common/Button/Button';
import './TravelVideos.css';

const TravelVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleOpenVideo = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="videos" className="section travel-videos-section">
      <Container>
        <div className="videos-header-row">
          <SectionHeading
            tagline="THƯ VIỆN VIDEO DU LỊCH SUPER EZ TOUR"
            title="Video trải nghiệm thực tế từ du khách"
            subtitle="Góc nhìn sống động, chân thực về các tour riêng, bãi biển hoang sơ và hoạt động đặc sắc do chính khách hàng ghi lại."
            align="left"
          />

          <Button
            variant="outline"
            size="md"
            rightIcon={ArrowRight}
            onClick={() => alert('Chuyển hướng đến kênh YouTube chính thức của Super EZ Tour.')}
          >
            Xem Kênh Super EZ Tour TV
          </Button>
        </div>

        {/* Video Cards Grid */}
        <div className="videos-grid">
          {TRAVEL_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="video-card"
              onClick={() => handleOpenVideo(video)}
            >
              {/* Thumbnail Container */}
              <div className="video-thumb-wrap hover-zoom-container">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  className="video-thumb-img hover-zoom-image"
                />
                <div className="video-overlay" />

                {/* Big Center Play Button */}
                <div className="video-play-btn" aria-label="Phát video">
                  <Play size={24} className="play-icon" />
                </div>

                <div className="video-duration-badge">
                  <Clock size={12} />
                  <span>{video.duration}</span>
                </div>

                <div className="video-destination-tag">
                  {video.destination}
                </div>
              </div>

              {/* Video Info */}
              <div className="video-info-box">
                <div className="video-tags-row">
                  {video.tags.map((t, idx) => (
                    <span key={idx} className="v-tag-chip">#{t}</span>
                  ))}
                  <span className="v-views-stat">
                    <Eye size={12} />
                    <span>{video.views} lượt xem</span>
                  </span>
                </div>

                <h3 className="video-card-title line-clamp-2">
                  {video.title}
                </h3>

                <p className="video-card-desc line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Video Modal Popup */}
      {selectedVideo && (
        <div className="video-modal-overlay" onClick={handleCloseVideo}>
          <div className="video-modal-box animate-slide-down" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="video-modal-close-btn"
              onClick={handleCloseVideo}
              aria-label="Đóng video"
            >
              <X size={24} />
            </button>

            <div className="video-player-container">
              <iframe
                title={selectedVideo.title}
                src={`${selectedVideo.videoUrl}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              />
            </div>

            <div className="video-modal-details">
              <div className="modal-video-meta">
                <span className="modal-video-dest">{selectedVideo.destination}</span>
                <span className="modal-video-views">{selectedVideo.views} lượt xem</span>
              </div>
              <h3 className="modal-video-title">{selectedVideo.title}</h3>
              <p className="modal-video-desc">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TravelVideos;
