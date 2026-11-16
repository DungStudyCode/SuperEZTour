import React from 'react';
import { COUNTRIES, DESTINATIONS } from '../../../data/destinations';
import { MapPin, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import './MegaMenu.css';

const MegaMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Group destinations by country
  const groupedDestinations = COUNTRIES.filter((c) => c.id !== 'all').map((country) => {
    return {
      ...country,
      destinations: DESTINATIONS.filter((d) => d.countryId === country.id)
    };
  });

  return (
    <div className="megamenu-overlay" onClick={onClose}>
      <div className="megamenu-panel animate-slide-down" onClick={(e) => e.stopPropagation()}>
        <div className="megamenu-container">
          <div className="megamenu-header">
            <div className="megamenu-title-group">
              <span className="megamenu-badge">16 ĐIỂM ĐẾN DU LỊCH CAO CẤP TẠI CHÂU Á</span>
              <h3 className="megamenu-title">Khám phá các điểm đến cùng {BRAND_CONFIG.brandName}</h3>
              <p className="megamenu-subtitle">
                {BRAND_CONFIG.slogan} · Tự do tùy biến lịch trình · Xe riêng đời mới & Hướng dẫn viên tận tâm
              </p>
            </div>
            <a href="#destinations" className="megamenu-all-link" onClick={onClose}>
              <span>Xem tất cả điểm đến</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="megamenu-grid">
            {groupedDestinations.map((group) => (
              <div key={group.id} className="megamenu-column">
                <div className="megamenu-country-header">
                  <span className="megamenu-country-flag">{group.flag}</span>
                  <div className="megamenu-country-info">
                    <h4 className="megamenu-country-name">{group.name}</h4>
                    <span className="megamenu-country-count">{group.destinations.length} điểm đến</span>
                  </div>
                </div>

                <ul className="megamenu-destination-list">
                  {group.destinations.map((dest) => (
                    <li key={dest.id} className="megamenu-destination-item">
                      <a
                        href={dest.id === 'danang' ? '/destinations/da-nang' : `#dest-${dest.id}`}
                        className="megamenu-destination-link"
                        onClick={onClose}
                      >
                        <div className="megamenu-dest-main">
                          <span className="megamenu-dest-name">{dest.name}</span>
                        </div>
                        {dest.tag && (
                          <span className="megamenu-dest-tag">
                            {dest.tag}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="megamenu-footer-banner">
            <div className="megamenu-feature-item">
              <ShieldCheck size={18} className="feature-icon" />
              <span>Cam kết 100% tour riêng không ghép khách lạ & không phụ phí ẩn</span>
            </div>
            <div className="megamenu-feature-item">
              <Star size={18} className="feature-icon star" />
              <span>Đánh giá 4.95/5 từ {BRAND_CONFIG.stats.customersServed} du khách đã trải nghiệm</span>
            </div>
            <div className="megamenu-feature-item">
              <MapPin size={18} className="feature-icon" />
              <span>Hỗ trợ khẩn cấp 24/7 trực tiếp tại từng điểm đến</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
