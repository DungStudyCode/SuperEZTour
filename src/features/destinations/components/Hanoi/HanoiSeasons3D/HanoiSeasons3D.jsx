import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { CloudSun, Sparkles, Wind, Sun, Snowflake, Flower2, Leaf } from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import './HanoiSeasons3D.css';

const SEASONS_DATA = [
  {
    id: 'spring',
    key: 'SPRING',
    name: 'Mùa Xuân · Tháng 2 — Tháng 4',
    nameKr: '봄 · 2월 ~ 4월 (새로운 숨결)',
    icon: Flower2,
    skyColor: 0x1e2830,
    fogColor: 0x1e2830,
    sunColor: 0xffd8c4,
    sunIntensity: 2.2,
    treeColor: 0x5b9468, // Fresh spring lime
    particleType: 'petal',
    particleColor: 0xffb3c1,
    quote: 'Mưa phùn giăng mắc, hoa đào phai hé nụ và lộc non mơn mởn trên những cành bàng cổ thụ.',
    quoteKr: '안개비 내리는 고요한 호숫가, 분홍빛 복숭아꽃과 연둣빛 새싹이 돋아나는 시작의 계절.',
    highlight: 'Hội Lim, Làng gốm Bát Tràng & Hương trà sen ướp sớm'
  },
  {
    id: 'summer',
    key: 'SUMMER',
    name: 'Mùa Hạ · Tháng 5 — Tháng 7',
    nameKr: '여름 · 5월 ~ 7월 (찬란한 태양과 연꽃)',
    icon: Sun,
    skyColor: 0x162636,
    fogColor: 0x162636,
    sunColor: 0xffe8a0,
    sunIntensity: 3.4,
    treeColor: 0x27663d, // Deep emerald
    particleType: 'sunbeam',
    particleColor: 0xffe082,
    quote: 'Nắng vàng rực rỡ, hoa sen Tây Hồ ngát hương và tiếng ve râm ran dưới những vòm xà cừ cổ kính.',
    quoteKr: '푸른 하늘 아래 서호의 연꽃이 만개하고, 시원한 나무 그늘 아래에서 맛보는 하노이 맥주 한 잔.',
    highlight: 'Chèo thuyền ngắm sen Tây Hồ & Cà phê kem Tràng Tiền'
  },
  {
    id: 'autumn',
    key: 'AUTUMN',
    name: 'Mùa Thu · Tháng 8 — Tháng 10',
    nameKr: '가을 · 8월 ~ 10월 (하노이의 영혼)',
    icon: Leaf,
    skyColor: 0x2c221b,
    fogColor: 0x2c221b,
    sunColor: 0xffad54,
    sunIntensity: 2.6,
    treeColor: 0xc8772a, // Golden amber
    particleType: 'leaf',
    particleColor: 0xe09b3d,
    quote: 'Mùa đẹp nhất trong năm — Nắng hanh vàng như rót mật, gió heo may se lạnh và hương hoa sữa nồng nàn.',
    quoteKr: '하노이 여행의 황금기. 황금빛 낙엽이 흩날리는 호숫가, 달콤한 밀크플라워 꽃향기와 선선한 바람.',
    highlight: 'Cốm Vòng thơm lúa non, Trà sen & Đi bộ ngắm lá vàng rơi'
  },
  {
    id: 'winter',
    key: 'WINTER',
    name: 'Mùa Đông · Tháng 11 — Tháng 1',
    nameKr: '겨울 · 11월 ~ 1월 (고즈넉한 낭만)',
    icon: Snowflake,
    skyColor: 0x151c22,
    fogColor: 0x151c22,
    sunColor: 0xcfe0ec,
    sunIntensity: 1.6,
    treeColor: 0x54443c, // Bare winter branches
    particleType: 'frost',
    particleColor: 0xd9e5ed,
    quote: 'Không gian tĩnh lặng trầm mặc, sương lạnh mờ ảo mặt hồ và hơi nóng nghi ngút từ những gánh phở đêm.',
    quoteKr: '차분한 안갯속 서정적인 매력. 따뜻한 울 코트를 입고 골목길에서 호호 불며 먹는 뜨거운 쌀국수.',
    highlight: 'Cúc họa mi trắng tinh khôi & Thưởng thức lẩu nóng phố cổ'
  }
];

const HanoiSeasons3D = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeSeasonIndex, setActiveSeasonIndex] = useState(2); // Default to Autumn (Mùa Thu - Iconic)
  const animationFrameRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneStateRef = useRef(null);

  const { isKorean } = useLanguage();
  const currentSeason = SEASONS_DATA[activeSeasonIndex];

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(currentSeason.skyColor);
    scene.fog = new THREE.FogExp2(currentSeason.fogColor, 0.032);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 80);
    camera.position.set(0, 2.2, 9.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffedd4, 1.3);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(currentSeason.sunColor, currentSeason.sunIntensity);
    sunLight.position.set(7, 12, 6);
    scene.add(sunLight);

    // 3. Lakeside Promenade & Lake Water
    const waterGeo = new THREE.PlaneGeometry(50, 50, 32, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x1f323a,
      roughness: 0.15,
      metalness: 0.8,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -0.4;
    scene.add(waterMesh);

    // Stone Shore Promenade Balustrade
    const shoreGeo = new THREE.PlaneGeometry(32, 8);
    const shoreMat = new THREE.MeshStandardMaterial({ color: 0x333d45, roughness: 0.8 });
    const shoreMesh = new THREE.Mesh(shoreGeo, shoreMat);
    shoreMesh.rotation.x = -Math.PI / 2;
    shoreMesh.position.set(0, 0, 4);
    scene.add(shoreMesh);

    // Stone rail
    const railMat = new THREE.MeshStandardMaterial({ color: 0xbdb39f, roughness: 0.7 });
    const rail = new THREE.Mesh(new THREE.BoxGeometry(18, 0.7, 0.25), railMat);
    rail.position.set(0, 0.35, 0.2);
    scene.add(rail);

    // 4. Large Ancient Heritage Tree (Cây lộc vừng / bàng cổ thụ đổi màu theo mùa)
    const treeGroup = new THREE.Group();
    treeGroup.position.set(-3.5, 0, 1.2);

    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3d2a1f, roughness: 0.85 });
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.55, 4.2, 16), trunkMat);
    trunk.position.y = 2.1;
    trunk.rotation.z = -0.06;
    treeGroup.add(trunk);

    // Main canopy clusters that change color across 4 seasons
    const canopyMat = new THREE.MeshStandardMaterial({
      color: currentSeason.treeColor,
      roughness: 0.75,
      metalness: 0.05,
    });

    const canopyClusters = [];
    const canopyOffsets = [
      [0, 3.8, 0, 1.6],
      [-0.8, 4.4, 0.4, 1.3],
      [1.1, 4.1, -0.3, 1.4],
      [0.3, 5.0, 0, 1.2],
      [-1.4, 3.2, 0.2, 1.0],
      [1.8, 3.5, 0.3, 1.1],
    ];

    canopyOffsets.forEach(([cx, cy, cz, scale]) => {
      const cluster = new THREE.Mesh(new THREE.SphereGeometry(scale, 10, 10), canopyMat);
      cluster.position.set(cx, cy, cz);
      cluster.scale.set(1.2, 0.9, 1.1);
      treeGroup.add(cluster);
      canopyClusters.push(cluster);
    });
    scene.add(treeGroup);

    // 5. Dynamic Seasonal Particle System (Petals, Sun motes, Autumn Leaves, Frost)
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 1] = Math.random() * 7 + 0.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
      particleVelocities.push({
        vy: -0.006 - Math.random() * 0.008,
        swaySpeed: 1.2 + Math.random() * 2,
        swayAmp: 0.015 + Math.random() * 0.02,
        vx: 0.003 + Math.random() * 0.005,
      });
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: currentSeason.particleColor,
      size: 0.16,
      transparent: true,
      opacity: 0.8,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    sceneStateRef.current = {
      scene,
      camera,
      renderer,
      sunLight,
      canopyMat,
      particlePoints,
      particlePositions,
      particleVelocities,
      particleMat,
      treeGroup,
    };

    // 6. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Tree gentle wind sway
      treeGroup.rotation.z = Math.sin(elapsed * 0.7) * 0.018;

      // Particle update (leaves/petals falling & swaying)
      const pPos = particlePoints.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const vel = particleVelocities[i];
        pPos[i * 3 + 1] += vel.vy;
        pPos[i * 3] += Math.sin(elapsed * vel.swaySpeed + i) * vel.swayAmp + vel.vx;

        if (pPos[i * 3 + 1] < -0.3) {
          pPos[i * 3 + 1] = 7.2;
          pPos[i * 3] = (Math.random() - 0.5) * 20;
        }
      }
      particlePoints.geometry.attributes.position.needsUpdate = true;

      camera.lookAt(0, 1.8, 0);
      renderer.render(scene, camera);
    };
    animate();

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
      scene.traverse((obj) => {
        if (obj.isMesh || obj.isPoints) {
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

  // Smooth Seasonal Transformation
  const handleSelectSeason = (idx) => {
    setActiveSeasonIndex(idx);
    const season = SEASONS_DATA[idx];
    const state = sceneStateRef.current;
    if (!state) return;

    // Smoothly interpolate sky background and fog
    const targetSky = new THREE.Color(season.skyColor);
    const targetFog = new THREE.Color(season.fogColor);
    const targetTree = new THREE.Color(season.treeColor);
    const targetSun = new THREE.Color(season.sunColor);
    const targetPart = new THREE.Color(season.particleColor);

    gsap.to(state.scene.background, {
      r: targetSky.r,
      g: targetSky.g,
      b: targetSky.b,
      duration: 1.0,
      ease: 'power2.inOut',
    });

    gsap.to(state.scene.fog.color, {
      r: targetFog.r,
      g: targetFog.g,
      b: targetFog.b,
      duration: 1.0,
      ease: 'power2.inOut',
    });

    gsap.to(state.canopyMat.color, {
      r: targetTree.r,
      g: targetTree.g,
      b: targetTree.b,
      duration: 1.2,
      ease: 'power2.inOut',
    });

    gsap.to(state.sunLight.color, {
      r: targetSun.r,
      g: targetSun.g,
      b: targetSun.b,
      duration: 1.0,
      ease: 'power2.inOut',
    });

    gsap.to(state.sunLight, {
      intensity: season.sunIntensity,
      duration: 1.0,
      ease: 'power2.inOut',
    });

    gsap.to(state.particleMat.color, {
      r: targetPart.r,
      g: targetPart.g,
      b: targetPart.b,
      duration: 0.8,
      ease: 'power2.inOut',
    });
  };

  return (
    <section ref={containerRef} className="hanoi-seasons-scene" id="hanoi-seasons">
      {/* 3D WebGL Seasonal Canvas */}
      <canvas ref={canvasRef} className="seasons-3d-canvas" />

      <div className="seasons-vignette" aria-hidden="true" />

      {/* Top Floating Header */}
      <div className="seasons-header-hud">
        <div className="seasons-pill-badge">
          <CloudSun size={14} />
          <span>SCENE 05 · HANOI THROUGH THE SEASONS</span>
        </div>

        <h2 className="seasons-title">
          {isKorean ? '하노이 사계 · 계절이 빚어낸 서정' : 'Hà Nội Mười Hai Mùa Hoa'}
        </h2>

        <p className="seasons-subtitle">
          {isKorean
            ? '봄의 연둣빛 설렘부터 가을의 낭만적인 금빛 낙엽까지. 버튼을 클릭하여 하노이의 사계절을 느껴보세요.'
            : 'Mỗi mùa một sắc thái, một phong vị và một vẻ đẹp trầm mặc riêng có của thủ đô ngàn năm văn hiến.'}
        </p>

        {/* Seasonal Selector Tabs (Spring, Summer, Autumn, Winter) */}
        <div className="seasons-tabs-dock">
          {SEASONS_DATA.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeSeasonIndex === idx;
            return (
              <button
                key={s.id}
                type="button"
                className={`season-tab-btn ${isSelected ? 'season-tab-active' : ''}`}
                onClick={() => handleSelectSeason(idx)}
              >
                <Icon size={15} />
                <span>{s.key}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Season Narrative Spotlight Card */}
      <div className="seasons-spotlight-card">
        <div className="spotlight-badge-row">
          <span className="spotlight-kicker">
            {isKorean ? '계절별 맞춤 여행 가이드' : 'GỢI Ý DU LỊCH THEO MÙA'}
          </span>
          <span className="spotlight-season-name">
            {isKorean ? currentSeason.nameKr : currentSeason.name}
          </span>
        </div>

        <p className="spotlight-quote">
          “{isKorean ? currentSeason.quoteKr : currentSeason.quote}”
        </p>

        <div className="spotlight-highlight-box">
          <span className="highlight-tag">
            {isKorean ? '시그니처 체험:' : 'Trải nghiệm đặc trưng:'}
          </span>
          <strong className="highlight-text">
            {currentSeason.highlight}
          </strong>
        </div>
      </div>
    </section>
  );
};

export default HanoiSeasons3D;
