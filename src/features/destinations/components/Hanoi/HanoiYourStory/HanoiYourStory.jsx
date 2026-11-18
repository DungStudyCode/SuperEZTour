import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Landmark,
  Utensils,
  Hotel,
  Users,
  Camera,
  HeartHandshake,
  Check,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useConsultation } from '../../../../../context/ConsultationContext';
import './HanoiYourStory.css';

const HANOI_STORY_PILLARS = [
  {
    id: 'heritage',
    icon: Landmark,
    title: 'Văn Hóa & Ngàn Năm Di Sản',
    titleKr: '천년의 역사와 유네스코 유산',
    subtitle: 'Văn Miếu · Hoàng Thành · Phố Cổ 36 Phường',
    subtitleKr: '문묘 국자감 · 탕롱 황성 · 구시가지',
    desc: 'Dành cho những tâm hồn trân quý giá trị lịch sử. Lắng nghe những câu chuyện thâm sâu từ chuyên gia văn hóa Hà Nội, không vội vã, không ồn ào.',
    descKr: '하노이의 깊은 역사를 사랑하는 여행자를 위한 코스. 전문 역사 해설사와 함께 천년 고도의 깊이를 온전히 마주합니다.',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    perks: ['Vé VIP không phải xếp hàng', 'Chuyên gia văn hóa tháp tùng', 'Tìm hiểu thư tịch & bia đá cổ'],
    perksKr: ['대기 없는 VIP 우선 입장', '역사 전문 한국어 가이드', '왕실 유물 및 고비문 프라이빗 해설']
  },
  {
    id: 'culinary',
    icon: Utensils,
    title: 'Tinh Hoa Ẩm Thực Tràng An',
    titleKr: '미식 살롱 & 원조 맛집 탐방',
    subtitle: 'Phở Bát Đàn · Cà Phê Trứng · Chả Cá Lã Vọng',
    subtitleKr: '정통 쌀국수 · 에그커피 · 짜까 라봉',
    desc: 'Hành trình đánh thức mọi giác quan qua những quán ăn gia truyền 3 thế hệ và các buổi thưởng trà sen, cà phê trứng độc quyền.',
    descKr: '3대째 내려오는 숨은 골목 노포부터 최고급 헤리티지 다이닝까지. 하노이의 풍미를 프라이빗하게 음미합니다.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    perks: ['Bàn đặt trước giờ cao điểm', 'Thưởng thức cà phê trứng nguyên bản', 'Thực đơn tùy biến theo khẩu vị'],
    perksKr: ['웨이팅 없는 VIP 예약석', '원조 에그커피 하우스 방문', '개인 맞춤형 식단 및 알레르기 케어']
  },
  {
    id: 'luxury',
    icon: Hotel,
    title: 'Nghỉ Dưỡng Di Sản 5 Sao',
    titleKr: '프렌치 헤리티지 5성급 호캉스',
    subtitle: 'Metropole Hanoi · Capella · InterCon Westlake',
    subtitleKr: '소피텔 메트로폴 · 카펠라 · 인터컨티넨탈',
    desc: 'Lưu trú trong những khách sạn huyền thoại từ năm 1901. Trải nghiệm không gian Indochine tinh tế và dịch vụ quản gia cao cấp.',
    descKr: '1901년부터 세계적인 명사들이 머물렀던 역사적인 호텔. 품격 있는 프랑스 건축미와 최상의 환대를 누려보세요.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    perks: ['Ưu đãi hạng phòng Heritage Suite', 'Xe Limousine đưa đón sân bay HAN', 'Check-in linh hoạt tại phòng'],
    perksKr: ['헤리티지 스위트 룸 업그레이드', '노이바이 공항 전용 리무진 의전', '객실 내 프라이빗 얼리 체크인']
  },
  {
    id: 'local-craft',
    icon: Compass,
    title: 'Làng Nghề & Đời Sống Bản Địa',
    titleKr: '500년 전통 도예 & 장인 마을',
    subtitle: 'Làng gốm Bát Tràng · Nghề đúc đồng · Trà sen',
    subtitleKr: '바트랑 도자기 마을 · 동공예 · 서호 연꽃차',
    desc: 'Rời xa chốn đông người để về với những làng nghề cổ kính ven sông Hồng, tự tay nặn gốm cùng nghệ nhân ưu tú.',
    descKr: '홍강 유역의 고즈넉한 옛 마을에서 도예 명장과 함께 나만의 도자기를 빚고, 장인 가업의 숨결을 체험합니다.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    perks: ['Xưởng gốm nghệ nhân riêng biệt', 'Thành phẩm đóng gói gửi tận nơi', 'Khám phá kiến trúc nhà thờ tổ'],
    perksKr: ['도예 명장 1:1 프라이빗 워크숍', '완성작 무료 안전 포장 배송', '마을 고택 및 전통 가마 단독 투어']
  },
  {
    id: 'family',
    icon: Users,
    title: 'Kỳ Nghỉ Gia Đình Thư Thái',
    titleKr: '온 가족이 편안한 패밀리 힐링',
    subtitle: 'Nhịp sống chậm · Xe riêng đưa đón · An tâm trọn vẹn',
    subtitleKr: '여유로운 동선 · 전용 차량 · 전담 케어',
    desc: 'Không vội vã chạy theo giờ giấc. Xe Limousine rộng rãi chăm sóc trẻ nhỏ và ông bà với lịch trình linh hoạt 100%.',
    descKr: '어르신과 아이가 함께하는 여행에 최적화된 느긋한 일정. 최고급 전용 차량으로 문앞까지 편안하게 모십니다.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    perks: ['Lịch trình không ép buộc giờ giấc', 'Xe 7–16 chỗ cao cấp êm ái', 'Hỗ trợ 24/7 tức thì'],
    perksKr: ['무리 없는 맞춤 휴식 일정', '최신형 패밀리 밴 & 카시트 구비', '현지 24시간 한국어 케어 전담']
  },
  {
    id: 'photo-art',
    icon: Camera,
    title: 'Nhiếp Ảnh & Kiến Trúc Cổ',
    titleKr: '포토제닉 스냅 & 클래식 건축',
    subtitle: 'Cầu Long Biên · Nhà Thờ Lớn · Góc phố rêu phong',
    subtitleKr: '롱비엔 다리 · 성 요셉 성당 · 감성 골목',
    desc: 'Săn những khoảnh khắc ánh sáng vàng đẹp nhất tại cầu Long Biên lúc hoàng hôn và những khung cửa sổ Indochine đầy thi vị.',
    descKr: '석양빛 롱비엔 철교와 감성적인 프렌치 쿼터의 명소들. 전문 스냅 포토그래퍼가 가장 빛나는 순간을 담아드립니다.',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
    perks: ['Gợi ý góc chụp hoàng hôn độc bản', 'Hỗ trợ thuê áo dài truyền thống', 'Thời gian chụp ảnh tự do'],
    perksKr: ['황금빛 골든아워 시크릿 스팟 안내', '프리미엄 전통 아오자이 대여 연계', '충분한 자유 촬영 시간 보장']
  }
];

const HanoiYourStory = () => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const { isKorean } = useLanguage();
  const { openNewConsultation } = useConsultation();

  const currentPillar = HANOI_STORY_PILLARS[activePillarIndex];

  const handleOpenConsultation = () => {
    openNewConsultation({
      source: 'hanoi-your-story',
      destinationId: 'ha-noi',
      themeTitle: isKorean ? currentPillar.titleKr : currentPillar.title,
    });
  };

  return (
    <section className="hanoi-your-story-section" id="hanoi-story">
      <div className="hanoi-story-container">
        {/* Section Header */}
        <div className="story-section-header">
          <div className="story-pill-badge">
            <Sparkles size={14} />
            <span>SCENE 07 · YOUR HANOI, YOUR STORY</span>
          </div>

          <h2 className="story-section-title">
            {isKorean ? '당신만의 하노이, 당신만의 이야기' : 'Hà Nội Của Bạn, Câu Chuyện Của Riêng Bạn'}
          </h2>

          <p className="story-section-desc">
            {isKorean
              ? '정형화된 패키지가 아닌, 당신의 취향과 영감에 따라 맞춤 설계되는 100% 프라이빗 여행.'
              : 'Không có hành trình chung cho tất cả. Hãy chọn phong cách bạn rung động nhất để Super EZ Tour khởi tạo chuyến đi độc bản.'}
          </p>
        </div>

        {/* 6 Theme Pillar Selector Grid */}
        <div className="story-pillars-grid">
          {HANOI_STORY_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = activePillarIndex === idx;
            return (
              <button
                key={pillar.id}
                type="button"
                className={`pillar-select-card ${isSelected ? 'pillar-card-active' : ''}`}
                onClick={() => setActivePillarIndex(idx)}
              >
                <div className="pillar-card-icon-wrap">
                  <Icon size={20} />
                </div>
                <div className="pillar-card-text">
                  <h4 className="pillar-card-title">
                    {isKorean ? pillar.titleKr : pillar.title}
                  </h4>
                  <span className="pillar-card-sub">
                    {isKorean ? pillar.subtitleKr : pillar.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Theme Cinematic Showcase Stage */}
        <div className="story-showcase-stage">
          <div className="stage-image-col">
            <img
              src={currentPillar.image}
              alt={currentPillar.title}
              className="stage-hero-img"
            />
            <div className="stage-img-gradient" />
            <div className="stage-floating-badge">
              <ShieldCheck size={14} />
              <span>{isKorean ? '100% 단독 프라이빗 케어' : 'Cam Kết Tour Riêng 100%'}</span>
            </div>
          </div>

          <div className="stage-content-col">
            <span className="stage-kicker">
              {isKorean ? '맞춤 여행 큐레이션' : 'PHONG CÁCH TRẢI NGHIỆM ĐỘC BẢN'}
            </span>

            <h3 className="stage-title">
              {isKorean ? currentPillar.titleKr : currentPillar.title}
            </h3>

            <p className="stage-desc">
              {isKorean ? currentPillar.descKr : currentPillar.desc}
            </p>

            <div className="stage-perks-box">
              <span className="perks-head">
                {isKorean ? 'Super EZ Tour만의 프라이빗 특전:' : 'Đặc quyền Super EZ Tour dành tặng bạn:'}
              </span>
              <ul className="perks-list">
                {(isKorean ? currentPillar.perksKr : currentPillar.perks).map((perk, pIdx) => (
                  <li key={pIdx}>
                    <span className="perk-check-icon">✓</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="stage-cta-row">
              <button
                type="button"
                className="stage-quote-btn"
                onClick={handleOpenConsultation}
              >
                <span>
                  {isKorean
                    ? `‘${currentPillar.titleKr}’ 맞춤 일정 문의하기`
                    : `Tư vấn hành trình ‘${currentPillar.title}’`}
                </span>
                <ArrowRight size={16} />
              </button>

              <a href="#trip-builder" className="stage-builder-btn">
                <span>{isKorean ? '직접 일정 구성하기' : 'Tự cấu hình tour'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HanoiYourStory;
