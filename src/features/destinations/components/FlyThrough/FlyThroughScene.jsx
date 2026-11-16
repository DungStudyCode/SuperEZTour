import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles, Waves, Mountain, Landmark } from 'lucide-react';
import './FlyThroughScene.css';

gsap.registerPlugin(ScrollTrigger);

const FlyThroughScene = ({ introData }) => {
  const sceneRef = useRef(null);
  const mountainLayerRef = useRef(null);
  const oceanLayerRef = useRef(null);
  const bridgeLayerRef = useRef(null);
  const headlineMaskRef = useRef(null);
  const storyColRef = useRef(null);
  const pillarsStripRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Fly-through camera motion:
      // Mountain moves slower (background)
      tl.to(
        mountainLayerRef.current,
        {
          y: '-12%',
          scale: 1.12,
          ease: 'none',
        },
        0
      )
      // Ocean & Coastline moves medium speed (midground)
      .to(
        oceanLayerRef.current,
        {
          y: '-25%',
          scale: 1.2,
          ease: 'none',
        },
        0
      )
      // Floating bridge landmark advances towards camera
      .fromTo(
        bridgeLayerRef.current,
        { y: '30%', scale: 0.9, opacity: 0.6 },
        { y: '-10%', scale: 1.1, opacity: 1, ease: 'none' },
        0
      )
      // Headline between landscape layers
      .fromTo(
        headlineMaskRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      )
      // Story content sliding in
      .fromTo(
        storyColRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, ease: 'power2.out' },
        0.35
      )
      // Pillars strip reveal
      .fromTo(
        pillarsStripRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.6
      );
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="fly-through-scene" ref={sceneRef} id="discover">
      {/* Parallax Depth Planes Container */}
      <div className="fly-depth-container">
        {/* Plane 1: Sky & Mountains (Deep Background) */}
        <div className="fly-plane fly-plane-bg" ref={mountainLayerRef}>
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80"
            alt="Sơn Trà & Ngũ Hành Sơn"
            className="fly-img"
          />
          <div className="fly-plane-sky-tint" />
        </div>

        {/* Plane 2: Floating Typography behind middle layer */}
        <div className="fly-plane-typography" ref={headlineMaskRef}>
          <span className="dest-kicker fly-kicker">
            <Compass size={14} />
            <span>DISCOVER DA NANG</span>
          </span>
          <h2 className="fly-giant-title">
            MỘT THÀNH PHỐ.<br />NGÀN CÁCH ĐỂ KHÁM PHÁ.
          </h2>
        </div>

        {/* Plane 3: Ocean & Coastline (Midground) */}
        <div className="fly-plane fly-plane-mid" ref={oceanLayerRef}>
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80"
            alt="Bờ biển Mỹ Khê"
            className="fly-img fly-img-mask-bottom"
          />
        </div>

        {/* Plane 4: Landmark Visual Accent (Cầu Vàng Bà Nà Hills - Foreground) */}
        <div className="fly-plane-landmark" ref={bridgeLayerRef}>
          <div className="fly-landmark-card">
            <img
              src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=900&q=80"
              alt="Cầu Vàng Bà Nà"
              className="fly-card-img"
            />
            <div className="fly-landmark-caption">
              <span className="fly-badge-live">Tọa độ độc bản</span>
              <h4>Cầu Vàng giữa ngàn mây</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Front Editorial Overlay Panel */}
      <div className="fly-editorial-overlay dest-container">
        <div className="fly-editorial-box" ref={storyColRef}>
          <p className="fly-lead-quote">
            {introData?.lead || 'Nơi đại dương ngọc bích chạm vào núi non kỳ vĩ, nơi nhịp sống hiện đại giao thoa cùng chiều sâu di sản nghìn năm.'}
          </p>
          <p className="fly-body-copy">
            {introData?.paragraphs?.[0] || 'Đà Nẵng không đơn thuần là một điểm đến trên bản đồ. Đó là cảm giác đón ánh bình minh rạng rỡ trên bãi cát mịn Mỹ Khê, ngắm hoàng hôn buông đỏ rực nơi đỉnh Sơn Trà và thả hồn cùng hàng ngàn chiếc đèn hoa đăng lung linh phố cổ.'}
          </p>
        </div>

        {/* 3 Sensory Pillars Bar */}
        <div className="fly-pillars-row" ref={pillarsStripRef}>
          <div className="fly-pillar-mini">
            <Waves size={20} className="fly-pillar-icon" />
            <div>
              <strong>Biển & Núi hội tụ</strong>
              <span>Sơn Trà, Ngũ Hành Sơn & Mỹ Khê</span>
            </div>
          </div>

          <div className="fly-pillar-mini">
            <Sparkles size={20} className="fly-pillar-icon" />
            <div>
              <strong>Ẩm thực miền Trung</strong>
              <span>Mì Quảng & hải sản tươi sống</span>
            </div>
          </div>

          <div className="fly-pillar-mini">
            <Landmark size={20} className="fly-pillar-icon" />
            <div>
              <strong>Cửa ngõ di sản</strong>
              <span>Hội An, Mỹ Sơn & Cố đô Huế</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlyThroughScene;