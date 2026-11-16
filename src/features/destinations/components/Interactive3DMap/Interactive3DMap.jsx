import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Sparkles, Plus, Check, Compass, Layers, Info } from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './Interactive3DMap.css';

gsap.registerPlugin(ScrollTrigger);

// Topographic Coordinates Map for Da Nang (relative percentage coordinates)
const MAP_COORDINATES = [
  { id: 'hai-van-pass', name: 'Đèo Hải Vân', x: 20, y: 18, elevation: '496m', desc: 'Thiên hạ đệ nhất hùng quan nối liền biển và non xanh' },
  { id: 'ba-na-hills', name: 'Bà Nà Hills & Cầu Vàng', x: 28, y: 45, elevation: '1487m', desc: 'Cầu Vàng giữa mây trời và Làng Pháp cổ kính' },
  { id: 'son-tra-peninsula', name: 'Bán Đảo Sơn Trà', x: 74, y: 24, elevation: '693m', desc: 'Chùa Linh Ứng, tượng Phật Bà 67m và loài voọc quý hiếm' },
  { id: 'my-khe-beach', name: 'Biển Mỹ Khê', x: 68, y: 46, elevation: '0m', desc: 'Top bãi biển quyến rũ nhất hành tinh' },
  { id: 'dragon-bridge', name: 'Cầu Rồng Sông Hàn', x: 56, y: 42, elevation: '15m', desc: 'Biểu tượng thành phố, phun lửa & nước cuối tuần' },
  { id: 'marble-mountains', name: 'Ngũ Hành Sơn', x: 65, y: 65, elevation: '106m', desc: 'Quần thể 5 ngọn núi đá vôi kỳ vĩ và động Huyền Không' },
  { id: 'hoi-an-ancient-town', name: 'Phố Cổ Hội An', x: 72, y: 88, elevation: '5m', desc: 'Di sản thế giới UNESCO, thả hoa đăng sông Hoài' },
];

const Interactive3DMap = ({ attractionsData }) => {
  const containerRef = useRef(null);
  const mapMeshRef = useRef(null);
  const [selectedPinId, setSelectedPinId] = useState('ba-na-hills');

  const { tripState, toggleAttraction } = useTripBuilder();

  const activeAttraction = (attractionsData?.items || []).find((a) => a.id === selectedPinId) || attractionsData?.items?.[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 3D perspective tilt on scroll
      tl.fromTo(
        mapMeshRef.current,
        { rotateX: 35, rotateZ: -10, scale: 0.9 },
        { rotateX: 20, rotateZ: 5, scale: 1.05, ease: 'none' },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="interactive-3d-map-scene" ref={containerRef} id="attractions">
      {/* Ambient Grid Background */}
      <div className="map-ambient-grid" />

      <div className="dest-container map-3d-content">
        {/* Header */}
        <div className="map-3d-header">
          <div>
            <span className="dest-kicker map-kicker">
              <Compass size={14} />
              <span>3D TOPOGRAPHIC WORLD · ĐÀ NẴNG</span>
            </span>
            <h2 className="map-3d-title">Những Tọa Độ Không Thể Bỏ Lỡ</h2>
          </div>

          <div className="map-cart-badge">
            <Sparkles size={14} />
            <span>Đã chọn: <strong>{tripState.selectedAttractions.length}</strong> tọa độ vào lịch trình riêng</span>
          </div>
        </div>

        {/* 3D Map Visual Canvas & Topography Board */}
        <div className="map-stage-board">
          {/* Topographic 3D Plane */}
          <div className="map-mesh-plane" ref={mapMeshRef}>
            {/* Contour Lines Graphic */}
            <svg className="map-contour-svg" viewBox="0 0 1000 650">
              {/* Coastline shape */}
              <path
                d="M 150 50 Q 300 120 400 200 T 700 250 T 650 450 T 700 600"
                stroke="rgba(255, 104, 30, 0.4)"
                strokeWidth="2"
                fill="none"
              />
              {/* Route connecting line */}
              <path
                d="M 200 120 L 280 290 L 560 270 L 680 300 L 740 160 L 650 420 L 720 570"
                stroke="url(#routeGrad)"
                strokeWidth="3"
                strokeDasharray="6 6"
                fill="none"
              />
              <defs>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF681E" />
                  <stop offset="100%" stopColor="#FFB52B" />
                </linearGradient>
              </defs>
            </svg>

            {/* Interactive Pins */}
            {MAP_COORDINATES.map((pin) => {
              const isSelected = tripState.selectedAttractions.includes(pin.id);
              const isActive = selectedPinId === pin.id;

              return (
                <div
                  key={pin.id}
                  className={`map-3d-pin ${isActive ? 'map-pin-active' : ''} ${isSelected ? 'map-pin-in-cart' : ''}`}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  onClick={() => setSelectedPinId(pin.id)}
                >
                  <div className="map-pin-beacon" />
                  <div className="map-pin-dot">
                    <MapPin size={14} />
                  </div>
                  <span className="map-pin-label">{pin.name}</span>
                  <span className="map-pin-elevation">{pin.elevation}</span>
                </div>
              );
            })}
          </div>

          {/* Active Landmark Preview Card */}
          {activeAttraction && (
            <div className="map-active-card-drawer">
              <div className="map-active-img-wrap">
                <img src={activeAttraction.image} alt={activeAttraction.name} loading="lazy" />
                <span className="map-active-cat">{activeAttraction.category}</span>
              </div>

              <div className="map-active-info">
                <h3 className="map-active-title">{activeAttraction.name}</h3>
                <p className="map-active-desc">{activeAttraction.description}</p>

                <div className="map-active-tags">
                  {(activeAttraction.tags || []).map((t, idx) => (
                    <span key={idx} className="map-tag-chip">#{t}</span>
                  ))}
                </div>

                <button
                  type="button"
                  className={`dest-btn-primary map-active-add-btn ${tripState.selectedAttractions.includes(activeAttraction.id) ? 'map-btn-checked' : ''}`}
                  onClick={() => toggleAttraction(activeAttraction.id)}
                >
                  {tripState.selectedAttractions.includes(activeAttraction.id) ? (
                    <>
                      <Check size={16} />
                      <span>Đã thêm vào hành trình</span>
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      <span>Thêm tọa độ này vào chuyến đi</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="map-disclaimer">
          <Info size={13} />
          <span>* Bản đồ minh họa 3D không gian trải nghiệm Đà Nẵng · Vui lòng tham khảo chuyên viên Super EZ Tour để tối ưu thời gian di chuyển thực tế.</span>
        </div>
      </div>
    </section>
  );
};

export default Interactive3DMap;