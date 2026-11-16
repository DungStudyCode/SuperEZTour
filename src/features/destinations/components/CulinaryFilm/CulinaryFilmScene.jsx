import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Utensils, Check, Sparkles, Flame } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './CulinaryFilmScene.css';

gsap.registerPlugin(ScrollTrigger);

const CulinaryFilmScene = ({ culinaryData }) => {
  const containerRef = useRef(null);
  const macroHeroImgRef = useRef(null);
  const floatingDishesRef = useRef(null);
  const aromaMistRef = useRef(null);
  const narrativePlateRef = useRef(null);

  const { tripState, toggleCulinary } = useTripBuilder();
  const items = culinaryData?.items || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Macro zoom into food hero
      tl.fromTo(
        macroHeroImgRef.current,
        { scale: 1.25, filter: 'brightness(0.8)' },
        { scale: 1.0, filter: 'brightness(1.05)', ease: 'none' },
        0
      )
      // Floating dishes slide in parallax
      .fromTo(
        floatingDishesRef.current,
        { y: 100, opacity: 0 },
        { y: -20, opacity: 1, ease: 'power2.out' },
        0.1
      )
      // Text narrative plate reveal
      .fromTo(
        narrativePlateRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, ease: 'power2.out' },
        0.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="culinary-film-scene" ref={containerRef} id="culinary">
      {/* Background Macro Imagery with Warm Cinematic Grade */}
      <div className="culinary-macro-bg">
        <img
          ref={macroHeroImgRef}
          src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=2000&q=85"
          alt="Mì Quảng Đà Nẵng thơm nồng"
          className="culinary-macro-img"
        />
        <div className="culinary-film-vignette" />
        <div className="culinary-steam-particles" ref={aromaMistRef} />
      </div>

      <div className="dest-container culinary-film-content">
        {/* Left Narrative Plate */}
        <div className="culinary-narrative-plate" ref={narrativePlateRef}>
          <span className="dest-kicker culinary-kicker">
            <Utensils size={14} />
            <span>CULINARY FILM EXPERIENCE</span>
          </span>

          <h2 className="culinary-film-title">A Taste of Da Nang.</h2>

          <p className="culinary-film-sub">
            Khám phá một thành phố qua từng tầng hương vị · Vị mộc mạc dân dã của dải đất miền Trung hòa quyện cùng vị ngọt thanh của đại dương.
          </p>

          <div className="culinary-flame-note">
            <Flame size={16} className="flame-icon" />
            <span>Thực đơn thưởng thức may đo theo khẩu vị riêng của gia đình bạn</span>
          </div>
        </div>

        {/* Right Floating Macro Dish Cards Deck */}
        <div className="culinary-floating-dishes" ref={floatingDishesRef}>
          {items.slice(0, 3).map((dish) => {
            const isChosen = tripState.culinaryPreferences.includes(dish.name);

            return (
              <div
                key={dish.id}
                className={`culinary-film-card ${isChosen ? 'culinary-card-selected' : ''}`}
              >
                <div className="culinary-card-pic">
                  <img src={dish.image} alt={dish.name} loading="lazy" />
                  <span className="culinary-spot-tag">
                    <Sparkles size={11} />
                    <span>{dish.spot}</span>
                  </span>
                </div>

                <div className="culinary-card-text">
                  <h4 className="culinary-dish-name">{dish.name}</h4>
                  <p className="culinary-dish-desc">{dish.desc}</p>

                  <button
                    type="button"
                    className={`culinary-add-btn ${isChosen ? 'culinary-btn-checked' : ''}`}
                    onClick={() => toggleCulinary(dish.name)}
                  >
                    {isChosen ? (
                      <>
                        <Check size={14} />
                        <span>Đã lưu vào sở thích</span>
                      </>
                    ) : (
                      <span>+ Thêm món này vào thực đơn</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CulinaryFilmScene;