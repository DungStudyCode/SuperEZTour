import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  MapPin,
  Film,
  Camera,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { VIETNAM_DESTINATIONS } from '../../../../data/vietnamDestinations';
import { useLanguage } from '../../../../context/LanguageContext';
import { travelerStoriesService } from '../../../../services/travelerStoriesService';
import './StorySubmissionModal.css';

/**
 * Super EZ Tour — Story Submission Modal (UGC Future-Ready Component)
 * Prepares the frontend for customer video/photo story submission with moderation flow.
 */
const StorySubmissionModal = ({
  isOpen = false,
  onClose,
  triggerRef,
}) => {
  const { t, isKorean } = useLanguage();
  const [destSlug, setDestSlug] = useState(VIETNAM_DESTINATIONS[0]?.id || '');
  const [authorName, setAuthorName] = useState('');
  const [caption, setCaption] = useState('');
  const [mediaType, setMediaType] = useState('video');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    setIsSubmitted(false);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (triggerRef?.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await travelerStoriesService.submitTravelerStoryDraft({
        destinationSlug: destSlug,
        authorName,
        caption,
        mediaType,
      });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="submission-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Submit Traveler Story"
    >
      <div className="submission-modal-backdrop" />

      <div
        className="submission-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="submission-modal-close"
          onClick={onClose}
          aria-label={t('common.close', isKorean ? '닫기' : 'Đóng')}
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="submission-success-view">
            <div className="success-icon-bubble">
              <CheckCircle2 size={44} className="text-orange" />
            </div>
            <h3 className="submission-title">
              {isKorean ? '스토리가 성공적으로 접수되었습니다!' : 'Câu chuyện đã được gửi thành công!'}
            </h3>
            <p className="submission-desc">
              {isKorean
                ? '소중한 여행 경험을 공유해 주셔서 감사합니다. Super EZ Tour 미디어 검수팀의 검토(24시간 이내)를 거쳐 게시될 예정입니다.'
                : 'Cảm ơn bạn đã chia sẻ khoảnh khắc đẹp. Đội ngũ kiểm duyệt nội dung của Super EZ Tour sẽ xem xét và phản hồi trong vòng 24 giờ.'}
            </p>
            <div className="submission-badge-preview">
              <ShieldCheck size={16} />
              <span>{isKorean ? '상태: 검수 대기 중 (PENDING_MODERATION)' : 'Trạng thái: Chờ duyệt (PENDING_MODERATION)'}</span>
            </div>
            <button
              type="button"
              className="submission-primary-btn is-full"
              onClick={onClose}
            >
              {isKorean ? '확인' : 'Đóng'}
            </button>
          </div>
        ) : (
          <form className="submission-form" onSubmit={handleSubmit}>
            <div className="submission-header">
              <span className="submission-eyebrow">
                <Sparkles size={13} className="text-orange" />
                <span>SUPER EZ TOUR · TRAVELER COMMUNITY</span>
              </span>
              <h3 className="submission-title">
                {isKorean ? '나만의 여행 이야기 공유하기' : 'Chia sẻ khoảnh khắc hành trình của bạn'}
              </h3>
              <p className="submission-desc">
                {isKorean
                  ? '베트남에서 마주한 특별한 순간과 감동을 영상이나 사진으로 공유해 보세요. 선정된 스토리는 공식 웹사이트에 소개됩니다.'
                  : 'Chia sẻ những thước phim ngắn (9:16) hoặc bức ảnh đáng nhớ trong chuyến du lịch riêng tại Việt Nam để truyền cảm hứng tới cộng đồng du khách.'}
              </p>
            </div>

            <div className="submission-body">
              {/* Destination */}
              <div className="form-item">
                <label className="form-item-label">
                  <MapPin size={14} className="text-orange" />
                  <span>{isKorean ? '여행 목적지' : 'Điểm đến đã trải nghiệm'}</span>
                </label>
                <select
                  className="form-select-lux"
                  value={destSlug}
                  onChange={(e) => setDestSlug(e.target.value)}
                >
                  {VIETNAM_DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {isKorean ? d.nameKr : (d.nameVi || d.name)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author name / Handle */}
              <div className="form-item">
                <label className="form-item-label">
                  <span>{isKorean ? '작성자 이름 / 닉네임' : 'Tên hiển thị / Nickname'}</span>
                </label>
                <input
                  type="text"
                  className="form-input-lux"
                  placeholder={isKorean ? '예: 김민준 또는 @minjun.travel' : 'Ví dụ: Tuấn Minh hoặc @minh.travels'}
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  required
                />
              </div>

              {/* Media Type */}
              <div className="form-item">
                <label className="form-item-label">
                  <span>{isKorean ? '공유 유형' : 'Hình thức chia sẻ'}</span>
                </label>
                <div className="media-type-tabs">
                  <button
                    type="button"
                    className={`media-tab-btn ${mediaType === 'video' ? 'is-active' : ''}`}
                    onClick={() => setMediaType('video')}
                  >
                    <Film size={15} />
                    <span>{isKorean ? '세로 숏폼 영상 (9:16)' : 'Video dọc (9:16)'}</span>
                  </button>
                  <button
                    type="button"
                    className={`media-tab-btn ${mediaType === 'photo' ? 'is-active' : ''}`}
                    onClick={() => setMediaType('photo')}
                  >
                    <Camera size={15} />
                    <span>{isKorean ? '사진 스토리' : 'Bộ ảnh câu chuyện'}</span>
                  </button>
                </div>
              </div>

              {/* Upload Dropzone Preview */}
              <div className="upload-dropzone">
                <UploadCloud size={32} className="upload-icon" />
                <span className="upload-main-text">
                  {isKorean
                    ? '미디어 파일을 선택하거나 드래그하세요'
                    : 'Kéo thả tệp video/ảnh hoặc nhấn để chọn'}
                </span>
                <span className="upload-sub-text">
                  {isKorean
                    ? 'MP4, MOV (최대 100MB, 9:16 권장)'
                    : 'Định dạng MP4, MOV, JPG (Tối đa 100MB, tỷ lệ 9:16)'}
                </span>
              </div>

              {/* Caption */}
              <div className="form-item">
                <label className="form-item-label">
                  <span>{isKorean ? '여행 이야기 & 한 줄 소감' : 'Cảm nghĩ hoặc ghi chú khoảnh khắc'}</span>
                </label>
                <textarea
                  className="form-textarea-lux"
                  rows={3}
                  placeholder={
                    isKorean
                      ? '여행 중 가장 기억에 남는 순간이나 추천하고 싶은 팁을 들려주세요...'
                      : 'Chia sẻ ngắn gọn điều làm bạn ấn tượng nhất trong hành trình này...'
                  }
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  required
                />
              </div>

              {/* Privacy Notice */}
              <div className="submission-notice">
                <ShieldCheck size={15} className="text-gold" />
                <span>
                  {isKorean
                    ? '제출하신 미디어는 개인정보 보호 및 저작권 확인 후 검수 승인된 콘텐츠만 게시됩니다.'
                    : 'Nội dung chia sẻ sẽ được bảo vệ quyền riêng tư và chỉ xuất bản sau khi được kiểm duyệt an toàn.'}
                </span>
              </div>
            </div>

            <div className="submission-footer">
              <button
                type="button"
                className="submission-secondary-btn"
                onClick={onClose}
              >
                {isKorean ? '취소' : 'Hủy'}
              </button>
              <button
                type="submit"
                className="submission-primary-btn"
                disabled={isSubmitting}
              >
                <Send size={15} />
                <span>{isSubmitting ? (isKorean ? '접수 중...' : 'Đang gửi...') : (isKorean ? '스토리 제출하기' : 'Gửi câu chuyện')}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default StorySubmissionModal;
