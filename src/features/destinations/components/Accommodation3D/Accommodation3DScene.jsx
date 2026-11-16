import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, MapPin, CheckCircle2, Bed, ArrowRight, Sparkles, Waves } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './Accommodation3DScene.css';

gsap.registerPlugin(ScrollTrigger);

const Accommodation3DScene = ({ accommodationData }) => {
  const containerRef = useRef(null);
  const portalHeroCardRef = useRef(null);
  const contentFadeRef = useRef(null);
  const canvasRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('all');
  const { tripState, preselectService } = useTripBuilder();

  const categories = [
    { id: 'all', label: 'Tất cả lựa chọn' },
    ...(accommodationData?.categories || [])
  ];

  const items = accommodationData?.items || [];
  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory);

  // Pool Water Ripple Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const renderRipples = () => {
      time += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, 'rgba(8, 29, 66, 0.2)');
      grad.addColorStop(1, 'rgba(255, 181, 43, 0.05)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle wave lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 15) {
          const y = canvas.height * 0.5 + Math.sin(x * 0.015 + time + i * 2) * (8 + i * 4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(renderRipples);
    };

    renderRipples();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Pinned camera zoom animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Expand card to full architectural viewport
      tl.fromTo(
        portalHeroCardRef.current,
        { scale: 0.88, borderRadius: '36px' },
        { scale: 1.0, borderRadius: '0px', ease: 'power2.inOut' },
        0
      )
      .fromTo(
        contentFadeRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: 'power3.out' },
        0.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSelectAccommodation = (item) => {
    preselectService('accommodation', item, true);
  };

  return (
    <section className="acc-3d-section" ref={containerRef} id="accommodation">
      {/* Pinned Architectural Expanding Hero Scene */}
      <div className="acc-3d-hero-frame" ref={portalHeroCardRef}>
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85"
          alt="InterContinental Danang Sun Peninsula Resort"
          className="acc-3d-bg-img"
        />
        <canvas className="acc-water-canvas" ref={canvasRef} />
        <div className="acc-3d-gradient" />

        <div className="dest-container acc-3d-hero-content" ref={contentFadeRef}>
          <div className="acc-3d-hero-header">
            <span className="dest-kicker acc-kicker">
              <Bed size={14} />
              <span>PREMIUM ACCOMMODATION</span>
            </span>
            <h2 className="acc-3d-title">Stay Somewhere Extraordinary.</h2>
            <p className="acc-3d-sub">
              Nghỉ dưỡng theo phong cách của bạn · Tuyển chọn 100% Resort 5 sao ven biển, Private Villa có hồ bơi riêng và khách sạn boutique danh tiếng.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="acc-3d-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`acc-tab-btn ${activeCategory === cat.id ? 'acc-tab-btn-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Showcase Deck */}
          <div className="acc-3d-cards-deck">
            {filteredItems.slice(0, 3).map((item) => {
              const isChosen = tripState.accommodationName === item.name;
              return (
                <div
                  key={item.id}
                  className={`acc-deck-card ${isChosen ? 'acc-deck-card-chosen' : ''}`}
                >
                  <div className="acc-deck-img-box">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <div className="acc-deck-badges">
                      <span className="dest-badge dest-badge-white">
                        <Star size={11} fill="#FFB52B" color="#FFB52B" />
                        <span>{item.stars} Sao</span>
                      </span>
                      {item.badge && (
                        <span className="dest-badge dest-badge-gold">
                          <Sparkles size={11} />
                          <span>{item.badge}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="acc-deck-body">
                    <div className="acc-deck-loc">
                      <MapPin size={13} className="acc-loc-icon" />
                      <span>{item.location}</span>
                    </div>

                    <h3 className="acc-deck-name">{item.name}</h3>

                    <div className="acc-deck-highlights">
                      {item.highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="acc-deck-hl">
                          <CheckCircle2 size={13} className="acc-check-icon" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      className={`acc-deck-choose-btn ${isChosen ? 'acc-deck-btn-chosen' : ''}`}
                      onClick={() => handleSelectAccommodation(item)}
                    >
                      {isChosen ? '✓ Đã chọn lưu trú này' : 'Chọn vào hành trình →'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accommodation3DScene;