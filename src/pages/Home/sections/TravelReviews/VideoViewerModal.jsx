import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  ArrowRight,
  User,
  Info,
} from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import './VideoViewerModal.css';

/**
 * Super EZ Tour — VideoViewer Modal (9:16 Portrait Lightbox)
 *
 * Requirements:
 * - 9:16 portrait viewport centered
 * - Deep charcoal backdrop with blur
 * - Play/pause & Mute/unmute (default MUTED)
 * - Next/Previous story cycle
 * - Caption, Destination, Author handle, Travel Date
 * - Transparent demo indicator
 * - Direct Consultation CTA
 * - Focus trap, ESC key listener, Space play/pause, Arrow Left/Right
 * - Clean teardown of media listeners & body scroll restoration
 */
const VideoViewerModal = ({
  stories = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onOpenQuoteModal,
  triggerRef,
}) => {
  const { t, isKorean } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(currentIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Sync index when prop changes
  useEffect(() => {
    setActiveIdx(currentIndex);
    setVideoError(false);
    setProgress(0);
    setIsPlaying(true);
  }, [currentIndex, isOpen]);

  const currentStory = stories[activeIdx] || null;

  // Next / Previous cycle handlers
  const handlePrev = useCallback(() => {
    if (stories.length <= 1) return;
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : stories.length - 1));
    setVideoError(false);
    setProgress(0);
    setIsPlaying(true);
  }, [stories.length]);

  const handleNext = useCallback(() => {
    if (stories.length <= 1) return;
    setActiveIdx((prev) => (prev < stories.length - 1 ? prev + 1 : 0));
    setVideoError(false);
    setProgress(0);
    setIsPlaying(true);
  }, [stories.length]);

  // Video playback controls
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  }, []);

  // Time update progress bar
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleVideoEnded = () => {
    // Smoothly advance to next story or loop
    handleNext();
  };

  // Keyboard navigation & Accessibility Focus
  useEffect(() => {
    if (!isOpen) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    const focusTimer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 60);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;

      // Restore focus to trigger element
      if (triggerRef?.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose, handlePrev, handleNext, togglePlay, toggleMute, triggerRef]);

  // Handle consultation CTA click
  const handleConsult = () => {
    if (onOpenQuoteModal && currentStory) {
      onOpenQuoteModal({
        source: 'traveler-story',
        destinationId: currentStory.destinationSlug,
      });
      onClose();
    }
  };

  if (!isOpen || !currentStory) return null;

  const destTitle = isKorean
    ? currentStory.destinationName?.ko
    : currentStory.destinationName?.vi;

  const storyTitle = isKorean ? currentStory.title?.ko : currentStory.title?.vi;
  const storyCaption = isKorean ? currentStory.caption?.ko : currentStory.caption?.vi;
  const authorType = isKorean
    ? currentStory.author?.travelType?.ko
    : currentStory.author?.travelType?.vi;

  const hasRealVideo = Boolean(currentStory.videoUrl) && !videoError;

  return (
    <div
      className="video-viewer-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={storyTitle || 'Traveler Story Video'}
    >
      {/* Background Dim Backdrop */}
      <div className="viewer-backdrop" />

      {/* Main Container */}
      <div
        ref={modalRef}
        className="video-viewer-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          className="viewer-close-btn"
          onClick={onClose}
          aria-label={t('common.close', isKorean ? '닫기' : 'Đóng')}
        >
          <X size={22} />
        </button>

        {/* Previous Navigation Arrow */}
        {stories.length > 1 && (
          <button
            type="button"
            className="viewer-nav-btn prev-btn"
            onClick={handlePrev}
            aria-label={t('common.previous', isKorean ? '이전 스토리' : 'Khoảnh khắc trước')}
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* 9:16 Portrait Card Viewport */}
        <div className="viewer-portrait-frame">
          {/* Top Progress Segment */}
          <div className="viewer-progress-bar-wrap">
            {stories.map((st, i) => (
              <div key={st.id} className="progress-track-item">
                <div
                  className="progress-fill-item"
                  style={{
                    width:
                      i < activeIdx
                        ? '100%'
                        : i === activeIdx
                        ? `${hasRealVideo ? progress : 100}%`
                        : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Top Meta Header */}
          <div className="viewer-top-meta">
            <div className="viewer-author-badge">
              <img
                src={currentStory.author?.avatar}
                alt={currentStory.author?.displayName}
                className="viewer-avatar"
                loading="lazy"
              />
              <div className="viewer-author-names">
                <span className="author-name">{currentStory.author?.displayName}</span>
                <span className="author-handle">{currentStory.author?.handle}</span>
              </div>
            </div>

            <div className="viewer-meta-tags">
              <span className="viewer-dest-tag">
                <MapPin size={11} />
                <span>{destTitle}</span>
              </span>
              {currentStory.isDemo && (
                <span className="viewer-demo-badge" title="Demo preview content">
                  DEMO PREVIEW
                </span>
              )}
            </div>
          </div>

          {/* Video or Ambient Photo Media */}
          <div className="viewer-media-viewport">
            {hasRealVideo ? (
              <video
                ref={videoRef}
                src={currentStory.videoUrl}
                poster={currentStory.thumbnailUrl}
                playsInline
                autoPlay
                muted={isMuted}
                loop={false}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                onError={() => setVideoError(true)}
                className="viewer-html5-video"
              />
            ) : (
              <div className="viewer-photo-story-mode">
                <img
                  src={currentStory.thumbnailUrl}
                  alt={storyTitle}
                  className="viewer-photo-story-img"
                />
                <div className="viewer-photo-notice-chip">
                  <Info size={12} />
                  <span>
                    {isKorean
                      ? '영상 준비 중 · 실제 여행 사진 미리보기'
                      : 'Video preview đang cập nhật · Hình ảnh trải nghiệm thực tế'}
                  </span>
                </div>
              </div>
            )}

            {/* Click to Toggle Play Overlay */}
            <div
              className="viewer-tap-area"
              onClick={togglePlay}
              role="button"
              tabIndex={-1}
              aria-label="Toggle Play"
            />

            {/* In-Video Controls (Mute / Pause) */}
            <div className="viewer-media-controls">
              {hasRealVideo && (
                <button
                  type="button"
                  className="viewer-ctrl-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
              )}

              {hasRealVideo && (
                <button
                  type="button"
                  className="viewer-ctrl-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              )}
            </div>
          </div>

          {/* Bottom Story Information & Consultation CTA */}
          <div className="viewer-bottom-overlay">
            {authorType && <span className="story-party-pill">{authorType}</span>}

            <h3 className="viewer-story-title">{storyTitle}</h3>
            <p className="viewer-story-caption">{storyCaption}</p>

            <div className="viewer-cta-row">
              <button
                type="button"
                className="viewer-consult-btn"
                onClick={handleConsult}
              >
                <span>
                  {isKorean
                    ? `${destTitle} 맞춤 상담 신청`
                    : `Tư vấn hành trình tại ${destTitle}`}
                </span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Next Navigation Arrow */}
        {stories.length > 1 && (
          <button
            type="button"
            className="viewer-nav-btn next-btn"
            onClick={handleNext}
            aria-label={t('common.next', isKorean ? '다음 스토리' : 'Khoảnh khắc kế tiếp')}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoViewerModal;
