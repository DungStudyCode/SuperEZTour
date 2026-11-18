import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Sparkles, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { VIETNAM_DESTINATIONS, searchVietnamDestinations } from '../../../data/vietnamDestinations';
import { useLanguage } from '../../../context/LanguageContext';
import './DestinationSearchModal.css';

const DestinationSearchModal = ({ isOpen, onClose, onOpenQuoteModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComingSoon, setSelectedComingSoon] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t, isKorean } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedComingSoon(null);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = searchVietnamDestinations(searchTerm);

  const handleSelectDestination = (dest) => {
    if (dest.isAvailable) {
      onClose();
      navigate(dest.route);
    } else {
      setSelectedComingSoon(dest);
    }
  };

  const handleAdvanceInquiry = (dest) => {
    onClose();
    if (onOpenQuoteModal) {
      onOpenQuoteModal({ source: 'search', destinationId: dest.id });
    }
  };

  return (
    <div className="search-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="search-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Header Search Input */}
        <div className="search-modal-header">
          <Search size={22} className="search-modal-icon text-orange" />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder={t('home.hero.searchPlaceholder', '어디로 떠나고 싶으신가요? (다낭, 하노이, 푸꾸옥...)')}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedComingSoon(null);
            }}
          />
          {searchTerm && (
            <button
              type="button"
              className="search-modal-clear"
              onClick={() => {
                setSearchTerm('');
                if (inputRef.current) inputRef.current.focus();
              }}
              aria-label="Clear Search"
            >
              <X size={18} />
            </button>
          )}
          <button type="button" className="search-modal-close" onClick={onClose} aria-label="Close">
            <span className="esc-badge">ESC</span>
          </button>
        </div>

        {/* Coming Soon Notice if clicked */}
        {selectedComingSoon && (
          <div className="search-modal-notice animate-fade-in">
            <div className="notice-content">
              <AlertCircle size={20} className="notice-icon text-orange" />
              <div className="notice-text">
                <strong>
                  {isKorean ? selectedComingSoon.nameKr : (selectedComingSoon.nameVi || selectedComingSoon.name)} ({selectedComingSoon.name})
                </strong>{' '}
                {isKorean
                  ? '상품은 현재 더 완벽한 3D 가상 투어와 단독 코스로 준비 중 (Coming Soon) 입니다.'
                  : 'hiện đang được chuẩn bị thêm hình ảnh 3D và lịch trình độc quyền (Sắp ra mắt).'}
                <br />
                <span className="notice-sub">
                  {isKorean
                    ? '사전 맞춤 상담 및 프라이빗 일정 설계는 지금 바로 1:1 전담 매니저를 통해 가능합니다.'
                    : 'Quý khách hoàn toàn có thể yêu cầu tư vấn 1:1 và báo giá ưu đãi sớm ngay hôm nay.'}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="notice-cta-btn"
              onClick={() => handleAdvanceInquiry(selectedComingSoon)}
            >
              <span>
                {isKorean
                  ? `${selectedComingSoon.nameKr} 1:1 맞춤 견적 요청`
                  : `Tư vấn tour riêng ${selectedComingSoon.nameVi || selectedComingSoon.name}`}
              </span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Search Results / Destination List */}
        <div className="search-modal-body">
          <div className="search-section-label">
            {searchTerm
              ? `${isKorean ? '검색 결과' : 'Kết quả tìm kiếm'} (${results.length})`
              : (isKorean ? '베트남 10대 명품 여행지' : '10 Điểm đến hàng đầu Việt Nam')}
          </div>

          <div className="search-results-grid">
            {results.map((dest) => {
              const isPublished = dest.experienceStatus === 'published' || (dest.id === 'da-nang' && dest.isAvailable);
              const destTitle = isKorean ? dest.nameKr : (dest.nameVi || dest.name);
              const destTagline = isKorean ? dest.tagline : (dest.taglineVi || dest.tagline);
              const destRegion = isKorean ? dest.regionKr : (dest.regionVi || dest.region);

              return (
                <div
                  key={dest.id}
                  className="search-dest-card"
                  onClick={() => handleSelectDestination(dest)}
                >
                  <div className="card-thumb-wrap">
                    <img src={dest.image} alt={destTitle} className="card-thumb" />
                  </div>

                  <div className="card-info">
                    <div className="card-name-row">
                      <span className="card-name-main">{destTitle}</span>
                      <span className="card-name-en">{dest.name}</span>
                      <span className="card-region-pill">{destRegion}</span>
                    </div>
                    <p className="card-tagline">{destTagline}</p>
                    <div className="card-action-row">
                      <span className="card-link-action">
                        <span>{t('home.destinationStrip.ctaExplore', isKorean ? '여행 둘러보기' : 'Khám phá')}</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {results.length === 0 && (
              <div className="search-no-results">
                <MapPin size={32} className="no-res-icon" />
                <p>
                  {isKorean
                    ? `'${searchTerm}'에 해당하는 베트남 여행지를 찾을 수 없습니다.`
                    : `Không tìm thấy điểm đến phù hợp với '${searchTerm}'.`}
                </p>
                <span>
                  {isKorean
                    ? '다낭, 하노이, 하롱베이, 나트랑, 호찌민, 푸꾸옥 등으로 검색해보세요.'
                    : 'Hãy thử tìm kiếm với Đà Nẵng, Hà Nội, Hạ Long, Nha Trang, Phú Quốc...'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Quick Shortcuts */}
        <div className="search-modal-footer">
          <div className="quick-tags-wrap">
            <span className="quick-tag-label">{isKorean ? '추천 검색:' : 'Gợi ý:'}</span>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => setSearchTerm(isKorean ? '다낭' : 'Đà Nẵng')}
            >
              {isKorean ? '다낭' : 'Đà Nẵng'}
            </button>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => setSearchTerm(isKorean ? '하노이' : 'Hà Nội')}
            >
              {isKorean ? '하노이' : 'Hà Nội'}
            </button>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => setSearchTerm(isKorean ? '하롱베이' : 'Hạ Long')}
            >
              {isKorean ? '하롱베이' : 'Hạ Long'}
            </button>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => setSearchTerm(isKorean ? '푸꾸옥' : 'Phú Quốc')}
            >
              {isKorean ? '푸꾸옥' : 'Phú Quốc'}
            </button>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => setSearchTerm(isKorean ? '사파' : 'Sa Pa')}
            >
              {isKorean ? '사파' : 'Sa Pa'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mini Chevron Helper
function ChevronRightIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default DestinationSearchModal;
