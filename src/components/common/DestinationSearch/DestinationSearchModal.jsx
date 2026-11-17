import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Sparkles, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { VIETNAM_DESTINATIONS, searchVietnamDestinations } from '../../../data/vietnamDestinations';
import './DestinationSearchModal.css';

const DestinationSearchModal = ({ isOpen, onClose, onOpenQuoteModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComingSoon, setSelectedComingSoon] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

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
      onOpenQuoteModal(dest.id);
    }
  };

  return (
    <div className="search-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="search-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Header Search Input */}
        <div className="search-modal-header">
          <Search size={22} className="search-modal-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="어디로 떠나고 싶으신가요? (다낭, 하노이, 푸꾸옥...)"
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
              aria-label="검색어 지우기"
            >
              <X size={18} />
            </button>
          )}
          <button type="button" className="search-modal-close" onClick={onClose} aria-label="닫기">
            <span className="esc-badge">ESC</span>
          </button>
        </div>

        {/* Coming Soon Notice if clicked */}
        {selectedComingSoon && (
          <div className="search-modal-notice animate-fade-in">
            <div className="notice-content">
              <AlertCircle size={20} className="notice-icon" />
              <div className="notice-text">
                <strong>{selectedComingSoon.nameKr} ({selectedComingSoon.name})</strong> 상품은 현재 더 완벽한 3D 가상 투어와 단독 코스로 <strong>준비 중 (Coming Soon)</strong> 입니다.
                <br />
                <span className="notice-sub">사전 맞춤 상담 및 프라이빗 일정 설계는 지금 바로 1:1 전담 매니저를 통해 가능합니다.</span>
              </div>
            </div>
            <button
              type="button"
              className="notice-cta-btn"
              onClick={() => handleAdvanceInquiry(selectedComingSoon)}
            >
              <span>{selectedComingSoon.nameKr} 1:1 맞춤 견적 요청</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Search Results / Destination List */}
        <div className="search-modal-body">
          <div className="search-section-label">
            {searchTerm ? `검색 결과 (${results.length}개)` : '베트남 10대 명품 여행지'}
          </div>

          <div className="search-results-grid">
            {results.map((dest) => {
              const isDaNang = dest.isAvailable;
              return (
                <div
                  key={dest.id}
                  className={`search-dest-card ${isDaNang ? 'is-available' : 'is-coming-soon'}`}
                  onClick={() => handleSelectDestination(dest)}
                >
                  <div className="card-thumb-wrap">
                    <img src={dest.image} alt={dest.nameKr} className="card-thumb" />
                    {isDaNang ? (
                      <span className="card-status-badge available">
                        <Sparkles size={11} />
                        AVAILABLE
                      </span>
                    ) : (
                      <span className="card-status-badge coming-soon">
                        <Clock size={11} />
                        준비 중
                      </span>
                    )}
                  </div>

                  <div className="card-info">
                    <div className="card-name-row">
                      <span className="card-name-kr">{dest.nameKr}</span>
                      <span className="card-name-en">{dest.name}</span>
                      <span className="card-region-pill">{dest.regionKr}</span>
                    </div>
                    <p className="card-tagline">{dest.tagline}</p>
                    <div className="card-action-row">
                      {isDaNang ? (
                        <span className="card-link-action">
                          <span>3D 인터랙티브 투어 바로가기</span>
                          <ArrowRight size={14} />
                        </span>
                      ) : (
                        <span className="card-link-action muted">
                          <span>맞춤 일정 사전 상담 가능</span>
                          <ChevronRightIcon size={14} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {results.length === 0 && (
              <div className="search-no-results">
                <MapPin size={32} className="no-res-icon" />
                <p>'{searchTerm}'에 해당하는 베트남 여행지를 찾을 수 없습니다.</p>
                <span>다낭, 하노이, 하롱베이, 나트랑, 호찌민, 푸꾸옥 등으로 검색해보세요.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Quick Shortcuts */}
        <div className="search-modal-footer">
          <div className="quick-tags-wrap">
            <span className="quick-tag-label">추천 검색:</span>
            <button
              type="button"
              className="quick-tag-chip active"
              onClick={() => handleSelectDestination(VIETNAM_DESTINATIONS.find((d) => d.id === 'da-nang'))}
            >
              다낭 (Da Nang) ★ 3D 투어
            </button>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => setSearchTerm('하노이')}
            >
              하노이
            </button>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => setSearchTerm('하롱베이')}
            >
              하롱베이
            </button>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => setSearchTerm('푸꾸옥')}
            >
              푸꾸옥
            </button>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => setSearchTerm('나트랑')}
            >
              나트랑
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
