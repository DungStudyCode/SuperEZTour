import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Sparkles, X, ArrowRight, Compass, Camera, Coffee, Home, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useTripBuilder } from '../../../context/TripBuilderContext';
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
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [walkMeters, setWalkMeters] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const animationFrameRef = useRef(null);
  const rendererRef = useRef(null);

  const { isKorean } = useLanguage();
  const { toggleAttraction } = useTripBuilder();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x182026);
    scene.fog = new THREE.FogExp2(0x182026, 0.038);

    // Pedestrian eye-level camera (y = 1.65m)
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 80);
    camera.position.set(0, 1.65, 3.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // 2. Warm Morning Street Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.3);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffe8c2, 2.4);
    sunLight.position.set(6, 12, 4);
    scene.add(sunLight);

    // Street ground - wet cobblestone pavement
    const streetGeo = new THREE.PlaneGeometry(10, 36, 32, 32);
    const streetMat = new THREE.MeshStandardMaterial({
      color: 0x242a30,
      roughness: 0.22,
      metalness: 0.45,
    });
    const streetMesh = new THREE.Mesh(streetGeo, streetMat);
    streetMesh.rotation.x = -Math.PI / 2;
    streetMesh.position.set(0, 0, -14);
    scene.add(streetMesh);

    // Sidewalk kerbs
    const kerbMat = new THREE.MeshStandardMaterial({ color: 0x3d434a, roughness: 0.6 });
    const kerbLeft = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 36), kerbMat);
    kerbLeft.position.set(-2.8, 0.09, -14);
    const kerbRight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 36), kerbMat);
    kerbRight.position.set(2.8, 0.09, -14);
    scene.add(kerbLeft);
    scene.add(kerbRight);

    // 3. Ancient Tube Shophouses (Nhà ống cổ kính)
    const wallYellowMat = new THREE.MeshStandardMaterial({
      color: 0xcfb26d, // Signature Hanoi colonial yellow
      roughness: 0.85,
      metalness: 0.05,
    });
    const roofTileMat = new THREE.MeshStandardMaterial({
      color: 0x6e3b2e, // Yin-yang ancient terracotta tile
      roughness: 0.75,
      metalness: 0.1,
    });
    const woodLouverMat = new THREE.MeshStandardMaterial({
      color: 0x2e5248, // Vintage French Indochine green shutters
      roughness: 0.65,
      metalness: 0.1,
    });
    const balconyIronMat = new THREE.MeshStandardMaterial({
      color: 0x1a2126,
      roughness: 0.5,
      metalness: 0.7,
    });

    const streetGroup = new THREE.Group();

    // Helper to build a 2-story Hanoi heritage tube house facade
    const createShophouse = (x, z, rotationY, signText) => {
      const house = new THREE.Group();
      house.position.set(x, 0, z);
      house.rotation.y = rotationY;

      // Base wall
      const wall = new THREE.Mesh(new THREE.BoxGeometry(4.2, 5.2, 1.2), wallYellowMat);
      wall.position.y = 2.6;
      house.add(wall);

      // Sloped Tile Roof
      const roof = new THREE.Mesh(new THREE.ConeGeometry(3.0, 1.2, 4), roofTileMat);
      roof.rotation.y = Math.PI / 4;
      roof.position.set(0, 5.8, 0.2);
      roof.scale.set(1.4, 0.8, 0.8);
      house.add(roof);

      // Floor 1 Entrance arch & wooden doors
      const doorArch = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 0.1), woodLouverMat);
      doorArch.position.set(0, 1.1, 0.62);
      house.add(doorArch);

      // Floor 2 Balcony & Louvered Windows
      const balcony = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.15, 0.6), balconyIronMat);
      balcony.position.set(0, 2.65, 0.8);
      house.add(balcony);

      const balRail = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 0.05), balconyIronMat);
      balRail.position.set(0, 3.0, 1.08);
      house.add(balRail);

      // Two green louvered windows on floor 2
      const win1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.3, 0.08), woodLouverMat);
      win1.position.set(-0.6, 3.8, 0.62);
      const win2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.3, 0.08), woodLouverMat);
      win2.position.set(0.6, 3.8, 0.62);
      house.add(win1);
      house.add(win2);

      // Vintage Wooden Shop Sign
      if (signText) {
        const signMat = new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.7 });
        const sign = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 0.08), signMat);
        sign.position.set(0, 2.35, 0.68);
        house.add(sign);
      }

      // Warm hanging lantern
      const lantern = new THREE.PointLight(0xffb74d, 1.6, 5, 2);
      lantern.position.set(0, 2.2, 0.85);
      house.add(lantern);

      return house;
    };

    // Shophouses on Left Side of Street
    for (let k = 0; k < 6; k++) {
      const zPos = 2 - k * 5.2;
      streetGroup.add(createShophouse(-4.5, zPos, Math.PI / 2, k === 1 ? 'HANG BAC' : null));
    }

    // Shophouses on Right Side of Street
    for (let k = 0; k < 6; k++) {
      const zPos = 2 - k * 5.2;
      streetGroup.add(createShophouse(4.5, zPos, -Math.PI / 2, k === 2 ? 'CA PHE' : null));
    }

    // 4. Street Props: Bicycle with Flower Basket (Xe đạp hoa)
    const bikeGroup = new THREE.Group();
    bikeGroup.position.set(1.9, 0, -5.5);
    bikeGroup.rotation.y = -0.3;

    const bikeFrameMat = new THREE.MeshStandardMaterial({ color: 0x334455, metalness: 0.8, roughness: 0.3 });
    const wheel1 = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.03, 8, 24), bikeFrameMat);
    wheel1.position.set(-0.6, 0.35, 0);
    const wheel2 = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.03, 8, 24), bikeFrameMat);
    wheel2.position.set(0.6, 0.35, 0);
    bikeGroup.add(wheel1);
    bikeGroup.add(wheel2);

    // Frame tubes
    const tube1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.2), bikeFrameMat);
    tube1.rotation.z = Math.PI / 2;
    tube1.position.set(0, 0.65, 0);
    bikeGroup.add(tube1);

    // White Daisy / Lily Flower Basket on rear rack (Cúc họa mi)
    const flowerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const flowerBasket = new THREE.Group();
    flowerBasket.position.set(-0.5, 0.85, 0);
    for (let f = 0; f < 12; f++) {
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 6), flowerMat);
      petal.position.set((Math.random() - 0.5) * 0.45, Math.random() * 0.25, (Math.random() - 0.5) * 0.35);
      flowerBasket.add(petal);
    }
    bikeGroup.add(flowerBasket);
    streetGroup.add(bikeGroup);

    // 5. Vendor Carrying Basket (Gánh hàng rong phố cổ)
    const vendorGroup = new THREE.Group();
    vendorGroup.position.set(-1.8, 0, -18.5);
    const bambooMat = new THREE.MeshStandardMaterial({ color: 0xb58b56, roughness: 0.8 });
    const basket1 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.25, 0.25, 16), bambooMat);
    basket1.position.set(-0.6, 0.15, 0);
    const basket2 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.25, 0.25, 16), bambooMat);
    basket2.position.set(0.6, 0.15, 0);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.4), bambooMat);
    pole.rotation.z = Math.PI / 2;
    pole.position.set(0, 0.65, 0);
    vendorGroup.add(basket1);
    vendorGroup.add(basket2);
    vendorGroup.add(pole);
    streetGroup.add(vendorGroup);

    // 6. Overhead Cables & Street Lanterns
    const cableMat = new THREE.LineBasicMaterial({ color: 0x11161a, linewidth: 1 });
    for (let c = 0; c < 5; c++) {
      const cablePoints = [];
      const zC = 0 - c * 5.5;
      cablePoints.push(new THREE.Vector3(-4.4, 4.8, zC));
      cablePoints.push(new THREE.Vector3(0, 4.1 + Math.sin(c) * 0.2, zC + 0.3));
      cablePoints.push(new THREE.Vector3(4.4, 4.9, zC));
      const cableGeo = new THREE.BufferGeometry().setFromPoints(cablePoints);
      const line = new THREE.Line(cableGeo, cableMat);
      streetGroup.add(line);
    }

    // 7. Interactive 3D Beacon Rings for the 4 Hotspots
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xe2b880,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const beaconMeshes = [];

    OLD_QUARTER_HOTSPOTS.forEach((spot) => {
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.45, 16), beaconMat);
      ring.rotation.x = -Math.PI / 2;
      const xPos = spot.side === 'left' ? -2.2 : 2.2;
      ring.position.set(xPos, 0.05, spot.depthZ);
      streetGroup.add(ring);
      beaconMeshes.push({ mesh: ring, id: spot.id });
    });

    scene.add(streetGroup);

    // 8. Animation & Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Pulsing beacon rings
      beaconMeshes.forEach((b, idx) => {
        const s = 1 + Math.sin(elapsed * 2.5 + idx * 1.5) * 0.18;
        b.mesh.scale.set(s, s, s);
      });

      renderer.render(scene, camera);
    };
    animate();

    // 9. GSAP Scroll Walking Progression Down the Street
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=280%',
        pin: true,
        scrub: 1.4,
        onUpdate: (self) => {
          const progress = self.progress;
          // Walk up to 120 meters through Hanoi Old Quarter
          const meters = Math.round(progress * 120);
          setWalkMeters(meters);

          // Active milestone index
          if (progress < 0.25) setActiveStepIndex(0);
          else if (progress < 0.5) setActiveStepIndex(1);
          else if (progress < 0.75) setActiveStepIndex(2);
          else setActiveStepIndex(3);
        },
      },
    });

    // Camera walks slowly from z=3.5 down to z=-23.5 along the street
    tl.to(
      camera.position,
      {
        z: -23.5,
        // Gentle walking sway
        x: '+=0.25',
        y: 1.62,
        ease: 'none',
      },
      0
    );

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
      scene.traverse((obj) => {
        if (obj.isMesh || obj.isLine) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
            else obj.material.dispose();
          }
        }
      });
      renderer.dispose();
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
            : 'Cuộn trang để bước đi dọc con phố cổ và chạm vào 4 tọa độ văn hóa di sản đặc sắc.'}
        </p>

        {/* Live Walking Distance Meter */}
        <div className="hud-walk-counter">
          <span className="walk-counter-label">
            {isKorean ? '현재 보행 거리:' : 'Khoảng cách dạo bước:'}
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
