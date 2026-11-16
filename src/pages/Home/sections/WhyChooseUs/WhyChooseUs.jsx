import React, { useState } from 'react';
import SectionHeading from '../../../../components/common/SectionHeading/SectionHeading';
import Container from '../../../../components/common/Container/Container';
import { NETWORK_STATS } from '../../../../data/destinations';
import { BRAND_CONFIG } from '../../../../constants/brand.config';
import { ShieldCheck, UserCheck, CalendarCheck, Car, Award, ThumbsUp, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../../../../components/common/Button/Button';
import './WhyChooseUs.css';

const WhyChooseUs = ({ onOpenQuoteModal }) => {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      id: 'private',
      title: 'Chuyến đi riêng tư 100%',
      subtitle: 'Chỉ riêng nhóm của bạn – Không ghép khách lạ',
      description: 'Khác biệt hoàn toàn với các tour ghép đoàn 30-40 người gò bó, Super EZ Tour bố trí xe riêng đời mới và hướng dẫn viên riêng biệt chỉ phục vụ gia đình hoặc nhóm bạn của bạn. Bạn toàn quyền quyết định thời gian xuất phát, nghỉ ngơi và ăn uống.',
      icon: UserCheck,
      image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Xe Limousine/SUV riêng đưa đón tận sảnh khách sạn',
        'Tàu cano riêng khi đi biển, không phải chen lấn chờ đợi',
        'Không gian riêng tư, thoải mái trò chuyện cùng người thân'
      ]
    },
    {
      id: 'flexible',
      title: 'Lịch trình linh hoạt',
      subtitle: 'Tự do như đi phượt – Tiện nghi như tour cao cấp',
      description: 'Lịch trình được thiết kế may đo dựa trên sở thích, độ tuổi của các thành viên trong đoàn. Trong quá trình đi tour, nếu thời tiết thay đổi hoặc các bé/người lớn tuổi muốn nghỉ ngơi sớm, hướng dẫn viên sẽ linh hoạt điều chỉnh ngay tại chỗ mà không gặp bất kỳ trở ngại nào.',
      icon: CalendarCheck,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Tự do thêm hoặc bớt các điểm tham quan theo ý muốn',
        'Thưởng thức các quán ăn bản địa nổi tiếng theo gu riêng',
        'Không bị hối thúc giờ giấc, chụp ảnh thỏa thích'
      ]
    },
    {
      id: 'quality',
      title: 'Chất lượng cao & An tâm',
      subtitle: '100% Tour riêng không ghép đoàn – Dịch vụ chuẩn cao cấp',
      description: 'Cam kết cốt lõi của Super EZ Tour: Tuyệt đối không đưa khách vào các điểm bán hàng ép mua sắm; không phát sinh bất kỳ phụ phí ẩn nào. Chúng tôi tổ chức và điều hành trực tiếp tại cả 16 điểm đến với đội ngũ nhân sự hỗ trợ khẩn cấp 24/7.',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Bảo hiểm du lịch quốc tế trọn gói bảo vệ toàn diện',
        'Hướng dẫn viên chuyên nghiệp có chứng chỉ hành nghề du lịch',
        'Đội ngũ hỗ trợ khẩn cấp và y tế địa phương sẵn sàng 24/7'
      ]
    }
  ];

  return (
    <section id="why-us" className="section why-choose-us-section">
      <Container>
        <SectionHeading
          tagline="TIÊU CHUẨN DU LỊCH ĐẲNG CẤP MỚI"
          title={`Tại sao hơn ${BRAND_CONFIG.stats.customersServed} du khách chọn ${BRAND_CONFIG.brandName}?`}
          subtitle="Chúng tôi giải quyết toàn bộ nhược điểm của tour ghép truyền thống, mang lại chuyến đi hoàn hảo nhất cho bạn và gia đình."
          align="center"
        />

        {/* 3 Core Pillars Interactive Tabs & Showcase */}
        <div className="why-pillars-container">
          {/* Tabs Selector */}
          <div className="why-tabs-row">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activeTab === idx;

              return (
                <button
                  key={pillar.id}
                  type="button"
                  className={`why-tab-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <div className="tab-btn-icon-wrap">
                    <Icon size={22} />
                  </div>
                  <div className="tab-btn-text">
                    <span className="tab-pill-label">Giá trị {idx + 1}</span>
                    <strong className="tab-pill-title">{pillar.title}</strong>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Card Showcase */}
          <div className="active-pillar-card animate-fade-in">
            <div className="pillar-content-col">
              <span className="pillar-badge">
                <Sparkles size={14} />
                LỢI THẾ CẠNH TRANH ĐỘC QUYỀN
              </span>
              <h3 className="pillar-heading">{pillars[activeTab].title}</h3>
              <p className="pillar-subheading">{pillars[activeTab].subtitle}</p>

              <p className="pillar-paragraph">
                {pillars[activeTab].description}
              </p>

              <ul className="pillar-bullets-list">
                {pillars[activeTab].bullets.map((b, i) => (
                  <li key={i} className="pillar-bullet-item">
                    <CheckCircle2 size={18} className="bullet-check" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="pillar-cta-row">
                <Button
                  variant="primary"
                  size="md"
                  onClick={onOpenQuoteModal}
                >
                  Nhận báo giá tour riêng ngay
                </Button>
                <div className="pillar-guarantee-note">
                  <ShieldCheck size={18} className="guarantee-icon" />
                  <span>Cam kết hoàn tiền nếu phát hiện ép mua sắm</span>
                </div>
              </div>
            </div>

            <div className="pillar-image-col hover-zoom-container">
              <img
                src={pillars[activeTab].image}
                alt={pillars[activeTab].title}
                loading="lazy"
                className="pillar-img hover-zoom-image"
              />
              <div className="pillar-img-badge">
                <strong>100%</strong>
                <span>Khách hàng hài lòng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Illustrated Metrics Counters */}
        <div className="why-metrics-grid">
          <div className="metric-box">
            <div className="metric-icon-wrap">
              <Award size={28} />
            </div>
            <strong className="metric-number">{BRAND_CONFIG.stats.experienceYears} Năm</strong>
            <span className="metric-label">Kinh nghiệm tổ chức tour riêng chuyên nghiệp</span>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap">
              <Car size={28} />
            </div>
            <strong className="metric-number">16 Điểm Đến</strong>
            <span className="metric-label">Điều phối xe riêng & hướng dẫn viên tận nơi</span>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap">
              <ShieldCheck size={28} />
            </div>
            <strong className="metric-number">0% Mua Sắm</strong>
            <span className="metric-label">Tuyệt đối không ép vào điểm bán hàng</span>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap">
              <ThumbsUp size={28} />
            </div>
            <strong className="metric-number">{BRAND_CONFIG.stats.satisfactionRate}</strong>
            <span className="metric-label">Tỷ lệ hài lòng từ {BRAND_CONFIG.stats.customersServed} du khách</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
