import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ShieldCheck, Star, Sparkles, Clock, Compass } from 'lucide-react';
import { VIETNAM_DESTINATIONS } from '../../../data/vietnamDestinations';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import './MegaMenu.css';

const MegaMenu = ({ isOpen, onClose, onOpenQuoteModal }) => {
  const menuRef = useRef(null);

  // Escape key to close
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

  // Group destinations by region
  const northDestinations = VIETNAM_DESTINATIONS.filter((d) => d.region === 'north');
  const centralDestinations = VIETNAM_DESTINATIONS.filter((d) => d.region === 'central');
  const southDestinations = VIETNAM_DESTINATIONS.filter((d) => d.region === 'south');

  const daNangDest = VIETNAM_DESTINATIONS.find((d) => d.id === 'da-nang');

  const handleComingSoonClick = (e, dest) => {
    e.preventDefault();
    onClose();
    if (onOpenQuoteModal) {
      onOpenQuoteModal(dest.id);
    }
  };

  return (
    <div className="megamenu-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        ref={menuRef}
        className="megamenu-panel animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="megamenu-container">
          {/* Header */}
          <div className="megamenu-header">
            <div className="megamenu-title-group">
              <span className="megamenu-badge">100% PRIVATE VIETNAM LUXURY ESCAPES</span>
              <h3 className="megamenu-title">베트남 10대 명품 여행지 큐레이션</h3>
              <p className="megamenu-subtitle">
                {BRAND_CONFIG.brandName} · 북부·중부·남부 전역 단독 전용 차량 및 1:1 전담 한국어 가이드
              </p>
            </div>
            <a href="#destinations" className="megamenu-all-link" onClick={onClose}>
              <Compass size={16} />
              <span>전체 10개 여행지 갤러리</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* 3 Region Columns + 1 Spotlight Showcase Card */}
          <div className="megamenu-grid-lux">
            {/* Column 1: North Vietnam */}
            <div className="megamenu-region-col">
              <div className="region-col-header">
                <span className="region-badge-pill north">NORTH</span>
                <div className="region-titles">
                  <h4 className="region-name-kr">북부 베트남</h4>
                  <span className="region-name-en">천년 고도 & 신비의 산수</span>
                </div>
              </div>

              <ul className="megamenu-dest-list">
                {northDestinations.map((dest) => (
                  <li key={dest.id} className="megamenu-dest-item">
                    <button
                      type="button"
                      className="megamenu-dest-btn coming-soon-btn"
                      onClick={(e) => handleComingSoonClick(e, dest)}
                      title={`${dest.nameKr} — 준비 중 (클릭 시 1:1 맞춤 견적 문의)`}
                    >
                      <div className="dest-btn-left">
                        <span className="dest-bullet" />
                        <div className="dest-text-group">
                          <span className="dest-kr">{dest.nameKr}</span>
                          <span className="dest-en">{dest.name}</span>
                        </div>
                      </div>
                      <span className="dest-status-badge coming-soon">
                        <Clock size={10} />
                        준비 중
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Central Vietnam (Highlights Da Nang!) */}
            <div className="megamenu-region-col central-featured-col">
              <div className="region-col-header">
                <span className="region-badge-pill central">CENTRAL</span>
                <div className="region-titles">
                  <h4 className="region-name-kr">중부 베트남</h4>
                  <span className="region-name-en">황금빛 해변 & 유네스코 유산</span>
                </div>
              </div>

              <ul className="megamenu-dest-list">
                {centralDestinations.map((dest) => {
                  const isAvailable = dest.isAvailable;
                  return (
                    <li key={dest.id} className={`megamenu-dest-item ${isAvailable ? 'is-available-item' : ''}`}>
                      {isAvailable ? (
                        <Link
                          to={dest.route}
                          className="megamenu-dest-btn available-link"
                          onClick={onClose}
                        >
                          <div className="dest-btn-left">
                            <span className="dest-bullet gold-pulse" />
                            <div className="dest-text-group">
                              <span className="dest-kr gold-text">{dest.nameKr}</span>
                              <span className="dest-en">{dest.name}</span>
                            </div>
                          </div>
                          <span className="dest-status-badge available-badge">
                            <Sparkles size={11} />
                            3D 투어 오픈
                          </span>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="megamenu-dest-btn coming-soon-btn"
                          onClick={(e) => handleComingSoonClick(e, dest)}
                          title={`${dest.nameKr} — 준비 중 (클릭 시 1:1 맞춤 견적 문의)`}
                        >
                          <div className="dest-btn-left">
                            <span className="dest-bullet" />
                            <div className="dest-text-group">
                              <span className="dest-kr">{dest.nameKr}</span>
                              <span className="dest-en">{dest.name}</span>
                            </div>
                          </div>
                          <span className="dest-status-badge coming-soon">
                            <Clock size={10} />
                            준비 중
                          </span>
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: South Vietnam */}
            <div className="megamenu-region-col">
              <div className="region-col-header">
                <span className="region-badge-pill south">SOUTH</span>
                <div className="region-titles">
                  <h4 className="region-name-kr">남부 베트남</h4>
                  <span className="region-name-en">사이공 메가시티 & 청정 휴양섬</span>
                </div>
              </div>

              <ul className="megamenu-dest-list">
                {southDestinations.map((dest) => (
                  <li key={dest.id} className="megamenu-dest-item">
                    <button
                      type="button"
                      className="megamenu-dest-btn coming-soon-btn"
                      onClick={(e) => handleComingSoonClick(e, dest)}
                      title={`${dest.nameKr} — 준비 중 (클릭 시 1:1 맞춤 견적 문의)`}
                    >
                      <div className="dest-btn-left">
                        <span className="dest-bullet" />
                        <div className="dest-text-group">
                          <span className="dest-kr">{dest.nameKr}</span>
                          <span className="dest-en">{dest.name}</span>
                        </div>
                      </div>
                      <span className="dest-status-badge coming-soon">
                        <Clock size={10} />
                        준비 중
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Da Nang Spotlight Showcase Box */}
            {daNangDest && (
              <div className="megamenu-spotlight-box">
                <div className="spotlight-badge">FEATURED EXPERIENCE</div>
                <div className="spotlight-image-wrap">
                  <img src={daNangDest.image} alt={daNangDest.nameKr} className="spotlight-img" />
                  <div className="spotlight-overlay">
                    <span className="spotlight-dest-tag">{daNangDest.nameKr} · {daNangDest.name}</span>
                    <h5 className="spotlight-headline">3D 인터랙티브 가상 투어</h5>
                    <p className="spotlight-desc">항공기 오벌 윈도우, 바나힐 3D 플라이스루, 5성급 빌라 & 미식 다큐멘터리</p>
                    <Link
                      to="/destinations/da-nang"
                      className="spotlight-cta-btn"
                      onClick={onClose}
                    >
                      <span>다낭 3D 여정 시작하기</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Trust Banner */}
          <div className="megamenu-footer-banner">
            <div className="megamenu-feature-item">
              <ShieldCheck size={18} className="feature-icon" />
              <span>100% 단독 프라이빗 투어 · 모르는 일행 합승 0% · 원치 않는 쇼핑 0회</span>
            </div>
            <div className="megamenu-feature-item">
              <Star size={18} className="feature-icon star" />
              <span>만족도 4.98/5 · 베트남 현지 직영 지사 24시간 한국어 케어</span>
            </div>
            <div className="megamenu-feature-item">
              <MapPin size={18} className="feature-icon" />
              <span>전 일정 최신형 전용 리무진 & 베테랑 한국어 전문 가이드</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
