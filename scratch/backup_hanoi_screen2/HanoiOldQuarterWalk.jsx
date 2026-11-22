import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, X, ArrowRight, ShoppingBag, Coffee, Home, Camera } from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useTripBuilder } from '../../../context/TripBuilderContext';
import {
  createCobblestoneTexture,
  createColonialYellowWallTexture,
  createRoofTileTexture,
  createWoodLouverTexture,
  createModularOldQuarterStreet,
} from './hanoiStreetAssets';
import './HanoiOldQuarterWalk.css';

gsap.registerPlugin(ScrollTrigger);

// 4 Curated Cultural Hotspots in Hanoi Old Quarter
const OLD_QUARTER_HOTSPOTS = [
  {
    id: 'hang-bac',
    index: 1,
    icon: ShoppingBag,
    name: 'Phố Nghề Kim Hoàn Hàng Bạc',
    nameKr: '항박 은세공 장인 거리',
    nameEn: 'Hang Bac Silversmiths Guild',
    category: 'VĂN HÓA PHỐ NGHỀ',
    categoryKr: '500년 전통 장인 가업',
    depthZ: -3.5,
    side: 'left',
    summary: 'Con phố kim hoàn cổ kính hơn 500 năm tuổi, nơi các bậc nghệ nhân kim hoàn làng Định Công quy tụ đúc bạc nén cho triều đình Thăng Long.',
    summaryKr: '15세기 탕롱 황실에 은괴를 납품하던 장인들이 모여 형성된 500년 역사의 은세공 거리.',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Đình Kim Ngân thờ tổ nghề kim hoàn lập từ thời Hậu Lê',
      'Kỹ thuật chạm khắc bạc thủ công tinh xảo bậc nhất kinh kỳ',
      'Trải nghiệm ghé thăm xưởng chế tác gia truyền cùng nghệ nhân'
    ],
    detailsKr: [
      '후 레 왕조 때 건립된 은세공 시조를 모시는 낌응안 사당',
      '망치와 정만으로 빚어내는 극상의 전통 은세공 기법',
      '전담 가이드와 함께 장인의 옛 공방을 직접 방문하는 프라이빗 탐방'
    ]
  },
  {
    id: 'cafe-giang',
    index: 2,
    icon: Coffee,
    name: 'Cà Phê Trứng Gia Truyền Giảng',
    nameKr: '원조 에그커피 지앙 살롱',
    nameEn: 'Heirloom Egg Coffee Salon',
    category: 'TINH HOA ẨM THỰC',
    categoryKr: '1946년부터 이어진 전설의 미식',
    depthZ: -9.5,
    side: 'right',
    summary: 'Khởi nguồn từ năm 1946 do cụ Nguyễn Văn Giảng sáng tạo, lớp kem trứng vàng óng sánh mịn hòa quyện cùng cà phê Robusta đậm đà.',
    summaryKr: '1946년 소피텔 메트로폴 바텐더 출신 응우옌 반 지앙이 창안한 진한 로부스타와 달걀 크림의 궁극의 조화.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Công thức đánh kem trứng bí truyền không hề có vị tanh',
      'Không gian giếng trời nhuốm màu thời gian với bàn gỗ xưa',
      'Bao gồm trong mọi hành trình Private Tour của Super EZ Tour'
    ],
    detailsKr: [
      '달걀 비린내 없이 벨벳처럼 부드러운 3대째 비밀 휘핑 비법',
      '세월이 깃든 나무 테이블과 안뜰 햇살이 머무는 고택 공간',
      'Super EZ Tour 하노이 전용 투어 고객 전원 VIP 좌석 제공'
    ]
  },
  {
    id: 'ma-may-87',
    index: 3,
    icon: Home,
    name: 'Nhà Cổ Di Sản 87 Mã Mây',
    nameKr: '87 마메이 전통 고택',
    nameEn: 'Ancient Heritage House 87 Ma May',
    category: 'KIẾN TRÚC NHÀ ỐNG',
    categoryKr: '19세기 후반 상인 전통 목조 가옥',
    depthZ: -15.5,
    side: 'left',
    summary: 'Ngôi nhà ống hai tầng điển hình xây dựng từ cuối thế kỷ 19, với kết cấu gỗ lim, giếng trời đón gió và không gian thờ tự trang nghiêm.',
    summaryKr: '19세기 말에 지어진 좁고 깊은 전형적인 튜브형 상가 주택. 통풍과 채광을 돕는 중정과 묵직한 림 목재 구조.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Kiến trúc nhà ống độc đáo vừa buôn bán vừa sinh hoạt',
      'Giếng trời trung tâm điều hòa vi khí hậu mát mẻ tự nhiên',
      'Bảo tồn nguyên vẹn đồ gỗ, trường kỷ và gốm cổ Thăng Long'
    ],
    detailsKr: [
      '1층 상점, 2층 주거 및 제단을 갖춘 상인 가옥의 전형',
      '도심 속에서 자연 바람과 빛을 끌어들이는 지혜로운 중정',
      '백 년 전 고가구와 다기 세트가 그대로 보존된 유산'
    ]
  },
  {
    id: 'ganh-hang-rong',
    index: 4,
    icon: Camera,
    name: 'Gánh Hàng Rong & Xe Hoa Phố Cổ',
    nameKr: '골목 행상과 계절을 실은 꽃 자전거',
    nameEn: 'Flower Bicycles & Street Vendors',
    category: 'NHỊP SỐNG KÝ ỨC',
    categoryKr: '하노이 골목길의 서정적 일상',
    depthZ: -21.5,
    side: 'right',
    summary: 'Hình ảnh những chiếc xe đạp chở đầy hoa cúc họa mi hay sen ngát hương, cùng tiếng rao êm đềm đã trở thành linh hồn thơ mộng của Hà Nội.',
    summaryKr: '계절마다 바뀌는 꽃을 가득 실은 자전거와 대나무 광주리를 멘 행상들이 만들어내는 하노이만의 서정시.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Cúc họa mi đầu đông, hoa loa kèn tháng tư, sen mùa hạ',
      'Nghệ nhân gánh hoa quả rong bước đi nhẹ tênh qua phố cổ',
      'Điểm chụp ảnh nghệ thuật được chuyên gia gợi ý góc máy đẹp'
    ],
    detailsKr: [
      '초겨울의 하얀 국화, 4월의 나팔꽃, 한여름 서호의 연꽃',
      '아침 햇살 속 골목을 지나는 꽃 자전거의 그림 같은 실루엣',
      '전문 사진작가가 추천하는 하노이 최고의 스냅 촬영 명소'
    ]
  }
];

const HanoiOldQuarterWalk = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const transitionFogRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [walkMeters, setWalkMeters] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const animationFrameRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  const { isKorean } = useLanguage();
  const { toggleAttraction } = useTripBuilder();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1280);
    let height = container.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 800);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // =========================================================================
    // 1. THREE.JS SCENE, CAMERA & OPTIMIZED RENDERER
    // =========================================================================
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Harmonized dawn street fog matching Screen 1 transition fog tone
    scene.background = new THREE.Color(0x182026);
    scene.fog = new THREE.FogExp2(0x182026, 0.022);

    // Human pedestrian eye-level camera (y = 1.85m, FOV 48° matching Screen 1's 46°)
    const camera = new THREE.PerspectiveCamera(48, width / (height || 1), 0.1, 100);
    camera.position.set(0, 1.85, 4.0);
    cameraRef.current = camera;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      });
    } catch (e) {
      console.warn('[HanoiOldQuarterWalk] WebGL creation fallback:', e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min((typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // =========================================================================
    // 2. SYNCHRONIZED NATURAL DAWN LIGHTING
    // =========================================================================
    // Soft sky-to-ground ambient
    const ambientLight = new THREE.AmbientLight(0x4a5560, 1.15);
    scene.add(ambientLight);

    // Warm morning sun shaft breaking through rooftop canyon
    const sunLight = new THREE.DirectionalLight(0xffe2b0, 2.6);
    sunLight.position.set(14, 20, -10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 2;
    sunLight.shadow.camera.far = 60;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;
    sunLight.shadow.bias = -0.0008;
    scene.add(sunLight);

    // Sky-to-ground bounce fill
    const hemiLight = new THREE.HemisphereLight(0xffeedd, 0x222a30, 1.25);
    scene.add(hemiLight);

    // Selective soft warm accent lights at the 2 signature venues (Replaced 12 expensive PointLights!)
    const hangBacLight = new THREE.PointLight(0xffaa44, 1.8, 6, 2);
    hangBacLight.position.set(-2.8, 2.2, -3.5);
    scene.add(hangBacLight);

    const cafeGiangLight = new THREE.PointLight(0xffa540, 1.8, 6, 2);
    cafeGiangLight.position.set(2.8, 2.2, -9.5);
    scene.add(cafeGiangLight);

    // =========================================================================
    // 3. MODULAR HISTORIC SHOPHOUSE STREETSCAPE (Procedural PBR System)
    // =========================================================================
    const pbrTextures = {
      cobblestone: createCobblestoneTexture(),
      colonialYellow: createColonialYellowWallTexture(),
      roofTile: createRoofTileTexture(),
      woodLouver: createWoodLouverTexture(),
    };

    const streetGroup = createModularOldQuarterStreet(pbrTextures);
    scene.add(streetGroup);

    // =========================================================================
    // 4. INTERACTIVE 3D BEACON MARKERS ON THE STREET
    // =========================================================================
    const beaconMeshes = [];
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xe2b880,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const beaconPillarMat = new THREE.MeshBasicMaterial({
      color: 0xffdfa0,
      transparent: true,
      opacity: 0.35,
    });

    OLD_QUARTER_HOTSPOTS.forEach((spot) => {
      const beaconGroup = new THREE.Group();
      const xPos = spot.side === 'left' ? -2.2 : 2.2;
      beaconGroup.position.set(xPos, 0.06, spot.depthZ);

      // Horizontal pulsing rings
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.35, 0.55, 20), beaconMat);
      ring.rotation.x = -Math.PI / 2;
      beaconGroup.add(ring);

      // Vertical subtle beacon beam
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.15, 2.2, 8, 1, true), beaconPillarMat);
      beam.position.y = 1.1;
      beaconGroup.add(beam);

      streetGroup.add(beaconGroup);
      beaconMeshes.push({ group: beaconGroup, ring, id: spot.id });
    });

    // =========================================================================
    // 5. 60FPS RENDER & DUAL-LOOP ACTIVATION SCHEDULER
    // =========================================================================
    let isDisposed = false;
    let isSceneActive = false;
    let scrollProgress = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      if (!isSceneActive) {
        animationFrameRef.current = null;
        return;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Pulsing beacon rings & subtle beam float
      beaconMeshes.forEach((b, idx) => {
        const pulse = 1 + Math.sin(elapsed * 2.8 + idx * 1.5) * 0.18;
        b.ring.scale.set(pulse, pulse, pulse);
      });

      // Camera walking glide along Z with human pedestrian sway
      if (!prefersReducedMotion && camera) {
        const rawProgress = scrollProgress;
        const progress = Number.isFinite(rawProgress) ? rawProgress : 0;
        const t = Math.max(0, Math.min(1, progress));
        // Linear path from Z = 4.0 (street mouth) to Z = -24.0 (end of guild street)
        const targetZ = 4.0 - t * 28.0;

        // Subtle pedestrian footstep oscillation
        const walkCycle = t * 45; // ~7 walking steps along 120m
        const swayX = Math.sin(walkCycle) * 0.14;
        const bobY = 1.85 + Math.abs(Math.sin(walkCycle * 2)) * 0.035;

        // Subtle gaze orientation toward the active milestone
        let gazeX = 0;
        if (t > 0.1 && t < 0.3) gazeX = -0.4;     // Look slightly left toward Hàng Bạc
        else if (t >= 0.3 && t < 0.55) gazeX = 0.4;  // Look slightly right toward Giảng
        else if (t >= 0.55 && t < 0.78) gazeX = -0.35;// Look slightly left toward 87 Mã Mây
        else if (t >= 0.78) gazeX = 0.35;        // Look right toward Xe Hoa

        camera.position.set(swayX, bobY, targetZ);
        camera.lookAt(gazeX, 1.8, targetZ - 12.0);
      }

      if (renderer && scene && camera) {
        try {
          renderer.render(scene, camera);
        } catch (renderErr) {
          console.warn('[HanoiOldQuarterWalk] Render error:', renderErr);
        }
      }
    };

    // =========================================================================
    // 6. GSAP SCROLLTRIGGER (120m Pedestrian Walk & Incoming Mist Bridge)
    // =========================================================================
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=280%',
        pin: true,
        scrub: 1.4,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = Number.isFinite(self.progress) ? self.progress : 0;
          scrollProgress = progress;

          // 120m Walking Distance Progress (State-throttled to avoid redundant re-renders)
          const meters = Math.round(progress * 120);
          setWalkMeters((prev) => (prev !== meters ? meters : prev));

          // Milestone active indicator (State-throttled)
          const newStep = progress < 0.25 ? 0 : progress < 0.5 ? 1 : progress < 0.75 ? 2 : 3;
          setActiveStepIndex((prev) => (prev !== newStep ? newStep : prev));

          // Incoming Transition Fog (Gentle morning mist bridge, max 0.18, dissipates naturally)
          if (transitionFogRef.current) {
            if (progress <= 0.15) {
              const fogT = (1 - progress / 0.15) * 0.18;
              gsap.set(transitionFogRef.current, { opacity: Math.max(0, fogT) });
            } else {
              gsap.set(transitionFogRef.current, { opacity: 0 });
            }
          }
        },
      });
    }, container);

    // =========================================================================
    // 7. INTERSECTION OBSERVER (Zero GPU waste when outside viewport!)
    // =========================================================================
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisible = entry ? entry.isIntersecting : true;
        isSceneActive = isVisible;

        if (isVisible && !animationFrameRef.current && !isDisposed) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      },
      { rootMargin: '150px' }
    );
    observer.observe(container);

    // =========================================================================
    // 8. RESIZE LISTENER
    // =========================================================================
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || window.innerWidth || 1;
      const h = container.clientHeight || window.innerHeight || 1;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // =========================================================================
    // 9. CLEANUP (Strict Zero-Leak Lifecycle)
    // =========================================================================
    return () => {
      isDisposed = true;
      observer.disconnect();
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (ctx) ctx.revert();

      if (scene) {
        scene.traverse((obj) => {
          if (obj.isMesh || obj.isLine || obj.isPoints) {
            if (obj.geometry && obj.geometry.dispose) {
              try { obj.geometry.dispose(); } catch (_) {}
            }
            if (obj.material) {
              const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
              mats.forEach((m) => {
                if (m && m.dispose) {
                  try { m.dispose(); } catch (_) {}
                }
              });
            }
          }
        });
      }

      if (renderer && renderer.dispose) {
        try { renderer.dispose(); } catch (_) {}
      }

      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
    };
  }, []);

  const handleOpenHotspot = (spot) => {
    setActiveHotspot(spot);
  };

  const handleCloseHotspot = () => {
    setActiveHotspot(null);
  };

  const handleAddSpotToTrip = (spotId) => {
    toggleAttraction(spotId);
    handleCloseHotspot();
  };

  return (
    <section ref={containerRef} className="hanoi-old-quarter-scene" id="scene-old-quarter">
      {/* 3D WebGL Street Canvas */}
      <canvas ref={canvasRef} className="old-quarter-canvas" />

      {/* Incoming Morning Mist Transition Overlay (Seamless Bridge from Screen 1) */}
      <div ref={transitionFogRef} className="old-quarter-transition-fog" aria-hidden="true" />

      {/* Top Street Vignette & Mood Grading */}
      <div className="old-quarter-vignette" aria-hidden="true" />

      {/* Top Editorial Floating HUD */}
      <div className="old-quarter-hud-header">
        <div className="hud-badge-row">
          <span className="hud-pill">
            <Sparkles size={13} />
            <span>SCENE 02 · INTERACTIVE 3D WALK</span>
          </span>
          <span className="hud-dest-tag">
            {isKorean ? '하노이 36 구시가지' : '36 Phố Phường Hà Nội'}
          </span>
        </div>

        <h2 className="hud-scene-title">
          {isKorean ? '천년 역사의 골목길을 거닐다' : 'Dạo Bước Xuyên Miền Ký Ức'}
        </h2>

        <p className="hud-scene-desc">
          {isKorean
            ? '마우스 휠이나 스크롤을 이용해 골목을 따라 천천히 걸으며, 빛나는 4대 문화 지점을 탐험해 보세요.'
            : 'Cuộn trang để dạo bước dọc con phố cổ và chạm vào 4 tọa độ văn hóa di sản đặc sắc.'}
        </p>

        {/* Live Walking Distance Meter */}
        <div className="hud-walk-counter">
          <span className="walk-counter-label">
            {isKorean ? '현재 보행 거리:' : 'Đã bước:'}
          </span>
          <strong className="walk-counter-val">{walkMeters}m</strong>
          <span className="walk-counter-total">/ 120m</span>
        </div>
      </div>

      {/* Hotspots Interactive Floating Dock */}
      <div className="old-quarter-hotspots-dock">
        <span className="dock-title">
          {isKorean ? '거리의 4대 문화 랜드마크:' : 'Tọa độ văn hóa trên đường đi:'}
        </span>
        <div className="dock-buttons-row">
          {OLD_QUARTER_HOTSPOTS.map((spot, idx) => {
            const Icon = spot.icon;
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={spot.id}
                type="button"
                className={`dock-spot-btn ${isActive ? 'dock-btn-active' : ''}`}
                onClick={() => handleOpenHotspot(spot)}
                title={isKorean ? spot.nameKr : spot.name}
              >
                <span className="dock-btn-icon-wrap">
                  <Icon size={14} />
                </span>
                <span className="dock-btn-label">
                  {isKorean ? spot.nameKr : spot.name}
                </span>
                <span className="dock-btn-ping" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Editorial Detail Modal for Active Hotspot */}
      {activeHotspot && (
        <div className="old-quarter-modal-overlay" onClick={handleCloseHotspot}>
          <div
            className="old-quarter-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleCloseHotspot}
              aria-label="Đóng"
            >
              <X size={20} />
            </button>

            <div className="modal-hero-image-wrap">
              <img
                src={activeHotspot.image}
                alt={activeHotspot.name}
                className="modal-hero-img"
              />
              <div className="modal-img-gradient" />
              <div className="modal-badge-group">
                <span className="modal-category-badge">
                  {isKorean ? activeHotspot.categoryKr : activeHotspot.category}
                </span>
                <span className="modal-number-badge">0{activeHotspot.index} / 04</span>
              </div>
            </div>

            <div className="modal-body-content">
              <h3 className="modal-spot-title">
                {isKorean ? activeHotspot.nameKr : activeHotspot.name}
              </h3>
              <span className="modal-spot-sub">
                {activeHotspot.nameEn}
              </span>

              <p className="modal-spot-summary">
                {isKorean ? activeHotspot.summaryKr : activeHotspot.summary}
              </p>

              <div className="modal-details-list">
                <span className="details-list-head">
                  {isKorean ? '프라이빗 투어 핵심 하이라이트:' : 'Điểm nhấn trải nghiệm độc quyền:'}
                </span>
                <ul>
                  {(isKorean ? activeHotspot.detailsKr : activeHotspot.details).map((item, i) => (
                    <li key={i}>
                      <span className="detail-check">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-add-trip-btn"
                  onClick={() => handleAddSpotToTrip(activeHotspot.id)}
                >
                  <Sparkles size={16} />
                  <span>
                    {isKorean ? '내 맞춤 일정에 추가하기' : 'Thêm vào Lịch Trình Riêng'}
                  </span>
                </button>

                <button
                  type="button"
                  className="modal-continue-btn"
                  onClick={handleCloseHotspot}
                >
                  <span>{isKorean ? '계속 산책하기' : 'Tiếp tục dạo bước'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HanoiOldQuarterWalk;
