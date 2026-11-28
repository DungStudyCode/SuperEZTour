import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Sunset, Moon, Sunrise, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import './TimeTransformationScene.css';

gsap.registerPlugin(ScrollTrigger);

const TIME_PHASES = [
  {
    id: 'dawn',
    time: '05:30 AM',
    title: 'Bình Minh Trên Biển Mỹ Khê',
    titleKr: '미케 비치 해변의 황홀한 여명',
    desc: 'Ánh dương hồng cam rạng rỡ trải dài trên bờ cát mịn nguyên sơ.',
    descKr: '끝없이 펼쳐진 새하얀 백사장 위로 떠오르는 찬란한 아침 햇살과 바다의 숨결.',
    bg: 'linear-gradient(180deg, #2D1436 0%, #7C3A4D 40%, #E87A5D 80%, #FFB52B 100%)',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80',
    icon: Sunrise
  },
  {
    id: 'noon',
    time: '12:00 PM',
    title: 'Đại Dương Ngọc Bích Bán Đảo Sơn Trà',
    titleKr: '손짜 반도 에메랄드빛 바다와 열대 자연',
    desc: 'Bầu trời xanh thẳm, làn nước trong vắt và thiên nhiên trác tuyệt nhiệt đới.',
    descKr: '눈부신 코발트빛 하늘, 투명한 바닷물, 원시림이 빚어내는 경이로운 대자연의 파노라마.',
    bg: 'linear-gradient(180deg, #0284C7 0%, #0369A1 50%, #082F49 100%)',
    img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=80',
    icon: Sun
  },
  {
    id: 'dusk',
    time: '05:45 PM',
    title: 'Hoàng Hôn Trên Đỉnh Đèo Hải Vân',
    titleKr: '하이반 고개 정상에서 마주하는 붉은 일몰',
    desc: 'Sắc vàng óng ánh ôm trọn vịnh Lăng Cô và non xanh kỳ vĩ.',
    descKr: '황금빛 노을이 랑코만의 웅장한 곡선과 푸른 산마루를 포근하게 감싸 안는 시간.',
    bg: 'linear-gradient(180deg, #1E1B4B 0%, #831843 45%, #C2410C 75%, #F59E0B 100%)',
    img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1800&q=80',
    icon: Sunset
  },
  {
    id: 'night',
    time: '09:00 PM',
    title: 'Đêm Huyền Ảo Cầu Rồng & Phố Cổ Hội An',
    titleKr: '한강 용다리 야경과 호이안 천년의 등불',
    desc: 'Cầu Rồng phun lửa rực rỡ và muôn ngàn ngọn hoa đăng lấp lánh trên sông Hoài.',
    descKr: '밤하늘을 수놓는 황금빛 불꽃 쇼와 투본강 물결을 따라 은은하게 흐르는 소원등.',
    bg: 'linear-gradient(180deg, #020617 0%, #061426 50%, #081D42 100%)',
    img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80',
    icon: Moon
  }
];

const PHASE_ICONS = { Sunrise, Sun, Sunset, Moon };

const resolvePhaseIcon = (iconVal) => {
  if (typeof iconVal === 'string') return PHASE_ICONS[iconVal] || Sun;
  return iconVal || Sun;
};

const TimeTransformationScene = ({ privateValuesData }) => {
  const containerRef = useRef(null);
  const skyBgRef = useRef(null);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const phases = privateValuesData?.timePhases || TIME_PHASES;
  const { isKorean } = useLanguage();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isPinReady: '(min-width: 769px) and (min-height: 561px)',
      isMobileOrShort: '(max-width: 768px), (max-height: 560px)',
    }, (context) => {
      const { isPinReady } = context.conditions;
      if (!isPinReady) return;

      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              phases.length - 1,
              Math.floor(self.progress * phases.length)
            );
            setActivePhaseIndex(idx);
          },
        },
      });

      // Background lighting interpolation
      tl.to(skyBgRef.current, {
        filter: 'hue-rotate(60deg) brightness(0.9)',
        ease: 'none',
      });
    }, containerRef);

    return () => mm.revert();
  }, [phases.length]);

  const currentPhase = phases[activePhaseIndex] || phases[0];
  const IconComponent = resolvePhaseIcon(currentPhase.icon);

  return (
    <section className="time-trans-scene" ref={containerRef} id="why-private">
      {/* Sky Gradient & Landscape Plane */}
      <div
        className="time-sky-plane"
        ref={skyBgRef}
        style={{ background: currentPhase.bg }}
      >
        <img
          key={currentPhase.id}
          src={currentPhase.img}
          alt={currentPhase.title}
          className="time-trans-img"
        />
        <div className="time-trans-overlay" />
      </div>

      <div className="dest-container time-trans-content">
        {/* Top 24-Hour Slider Bar */}
        <div className="time-phases-nav">
          {phases.map((phase, idx) => {
            const PhaseIcon = resolvePhaseIcon(phase.icon);
            return (
              <div
                key={phase.id}
                className={`time-phase-pill ${activePhaseIndex === idx ? 'time-phase-pill-active' : ''}`}
                onClick={() => setActivePhaseIndex(idx)}
              >
                <PhaseIcon size={14} />
                <span>{phase.time}</span>
              </div>
            );
          })}
        </div>

        {/* Phase Narrative Card */}
        <div className="time-narrative-card">
          <div className="time-stamp-badge">
            <IconComponent size={16} />
            <span>{currentPhase.time} · {privateValuesData?.kicker || 'ONE CITY, MANY MOODS'}</span>
          </div>

          <h2 className="time-phase-title">
            {isKorean ? currentPhase.titleKr : currentPhase.title}
          </h2>
          <p className="time-phase-desc">
            {isKorean ? currentPhase.descKr : currentPhase.desc}
          </p>
        </div>

        {/* Private Philosophy Pillars */}
        <div className="time-philosophy-strip">
          {(privateValuesData?.items || [
            { number: '100%', title: 'Tour Riêng Biệt', desc: 'Toàn bộ hành trình chỉ dành riêng cho bạn và gia đình.' },
            { number: '0%', title: 'Không Ép Mua Sắm', desc: 'Cam kết hợp đồng: Tuyệt đối không chở khách vào điểm bán hàng trích hoa hồng.' },
            { number: '24/7', title: 'Đội Ngũ Điều Hành Tại Đà Nẵng', desc: 'Giải quyết phát sinh tức thì trong 15 phút tại chỗ.' },
            { number: 'Flex', title: 'Lịch Trình Tự Do', desc: 'Xuất phát lúc mấy giờ, ở lại bao lâu đều hoàn toàn theo ý muốn của bạn.' }
          ]).map((item, idx) => (
            <div key={idx} className="time-phil-col">
              <span className="time-phil-stat">{item.number}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimeTransformationScene;