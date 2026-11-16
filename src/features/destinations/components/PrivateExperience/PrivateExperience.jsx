import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import './PrivateExperience.css';

const PrivateExperience = ({ privateValuesData }) => {
  return (
    <section className="dest-section dest-section-deep private-exp-section" id="why-private">
      <div className="dest-container">
        {/* Header */}
        <div className="private-exp-header">
          <span className="dest-kicker">
            <ShieldCheck size={14} />
            <span>{privateValuesData?.kicker || 'PRIVATE TOUR PHILOSOPHY'}</span>
          </span>

          <h2 className="dest-title-editorial private-exp-title">
            {privateValuesData?.title || 'Your Trip. Your Rules.'}
          </h2>

          <p className="dest-subtitle private-exp-sub">
            {privateValuesData?.subtitle || 'Vì sao hàng ngàn du khách thượng lưu chọn Super EZ Tour thay vì tour ghép truyền thống?'}
          </p>
        </div>

        {/* 4 Big Editorial Stat/Philosophy Cards */}
        <div className="private-exp-grid">
          {(privateValuesData?.items || []).map((item, idx) => (
            <div key={idx} className="private-exp-card">
              <div className="private-exp-num-wrap">
                <span className="private-exp-num">{item.number}</span>
                <div className="private-exp-num-line" />
              </div>

              <h3 className="private-exp-card-title">{item.title}</h3>
              <p className="private-exp-card-desc">{item.desc}</p>

              <div className="private-exp-card-glow" />
            </div>
          ))}
        </div>

        {/* Comparison Banner */}
        <div className="private-compare-strip">
          <div className="private-compare-item private-compare-old">
            <span className="private-compare-tag">Tour Ghép Truyền Thống</span>
            <ul className="private-compare-list">
              <li>✕ Đi chung xe 30 - 45 khách xa lạ</li>
              <li>✕ Dậy sớm từ 6h, giục giã chạy điểm cho kịp giờ</li>
              <li>✕ Ép vào các điểm bán trầm hương, yến sào trích hoa hồng</li>
              <li>✕ Ăn theo suất tập thể rập khuôn, không hợp khẩu vị</li>
            </ul>
          </div>

          <div className="private-compare-vs">
            <span>VS</span>
          </div>

          <div className="private-compare-item private-compare-new">
            <span className="private-compare-tag private-compare-tag-ez">Super EZ Tour — Tour Riêng 100%</span>
            <ul className="private-compare-list">
              <li>✓ Xe riêng đời mới máy lạnh chỉ phục vụ gia đình bạn</li>
              <li>✓ Tự do điều chỉnh giờ xuất phát và tốc độ trải nghiệm</li>
              <li>✓ Cam kết pháp lý 0% Shopping - Không điểm bán hàng hoa hồng</li>
              <li>✓ Thực đơn chọn món theo ý muốn hoặc nhà hàng cao cấp</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateExperience;