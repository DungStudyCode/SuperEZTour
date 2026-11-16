import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Sunset, Moon, Sunrise, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import './TimeTransformationScene.css';

gsap.registerPlugin(ScrollTrigger);

const TIME_PHASES = [
  {
    id: 'dawn',
    time: '05:30 AM',
    title: 'Bình Minh Trên Biển Mỹ Khê',
    desc: 'Ánh dương hồng cam rạng rỡ trải dài trên bờ cát mịn nguyên sơ.',
    bg: 'linear-gradient(180deg, #2D1436 0%, #7C3A4D 40%, #E87A5D 80%, #FFB52B 100%)',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80',
    icon: Sunrise
  },
  {
    id: 'noon',
    time: '12:00 PM',
    title: 'Đại Dương Ngọc Bích Bán Đảo Sơn Trà',
    desc: 'Bầu trời xanh thẳm, làn nước trong vắt và thiên nhiên trác tuyệt nhiệt đới.',
    bg: 'linear-gradient(180deg, #0284C7 0%, #0369A1 50%, #082F49 100%)',
    img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=80',
    icon: Sun
  },
  {
    id: 'dusk',
    time: '05:45 PM',
    title: 'Hoàng Hôn Trên Đỉnh Đèo Hải Vân',
    desc: 'Sắc vàng óng ánh ôm trọn vịnh Lăng Cô và non xanh kỳ vĩ.',
    bg: 'linear-gradient(180deg, #1E1B4B 0%, #831843 45%, #C2410C 75%, #F59E0B 100%)',
    img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1800&q=80',
    icon: Sunset
  },
  {
    id: 'night',
    time: '09:00 PM',
    title: 'Đêm Huyền Ảo Cầu Rồng & Phố Cổ Hội An',
    desc: 'Cầu Rồng phun lửa rực rỡ và muôn ngàn ngọn hoa đăng lấp lánh trên sông Hoài.',
    bg: 'linear-gradient(180deg, #020617 0%, #061426 50%, #081D42 100%)',
    img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80',
    icon: Moon
  }
];

const TimeTransformationScene = ({ privateValuesData }) => {
  const containerRef = useRef(null);
  const skyBgRef = useRef(null);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
              TIME_PHASES.length - 1,
              Math.floor(self.progress * TIME_PHASES.length)
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

    return () => ctx.revert();
  }, []);

  const currentPhase = TIME_PHASES[activePhaseIndex] || TIME_PHASES[0];
  const IconComponent = currentPhase.icon;

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
          {TIME_PHASES.map((phase, idx) => {
            const PhaseIcon = phase.icon;
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
            <span>{currentPhase.time} · 24H DA NANG CINEMATIC</span>
          </div>

          <h2 className="time-phase-title">{currentPhase.title}</h2>
          <p className="time-phase-desc">{currentPhase.desc}</p>
        </div>

        {/* Private Philosophy Pillars */}
        <div className="time-philosophy-strip">
          <div className="time-phil-col">
            <span className="time-phil-stat">100%</span>
            <h4>Tour Riêng Biệt</h4>
            <p>Toàn bộ hành trình chỉ dành riêng cho bạn và gia đình.</p>
          </div>

          <div className="time-phil-col">
            <span className="time-phil-stat">0%</span>
            <h4>Không Ép Mua Sắm</h4>
            <p>Cam kết hợp đồng: Tuyệt đối không chở khách vào điểm bán hàng trích hoa hồng.</p>
          </div>

          <div className="time-phil-col">
            <span className="time-phil-stat">24/7</span>
            <h4>Đội Ngũ Điều Hành Tại Đà Nẵng</h4>
            <p>Giải quyết phát sinh tức thì trong 15 phút tại chỗ.</p>
          </div>

          <div className="time-phil-col">
            <span className="time-phil-stat">Flex</span>
            <h4>Lịch Trình Tự Do</h4>
            <p>Xuất phát lúc mấy giờ, ở lại bao lâu đều hoàn toàn theo ý muốn của bạn.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeTransformationScene;