import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles, ChevronDown, Volume2, VolumeX, Eye } from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import './HanoiAwakeningHero.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * SCENE 01 — THE AWAKENING OF HANOI (Hồ Gươm 3D Cinematic Opening)
 * Concept: "HANOI — A LIVING MEMORY. Walk Through Time. Feel Every Moment."
 * Three.js WebGL: Hoan Kiem Lake at sunrise, Turtle Tower landmark, gentle mist, water reflections, sunbeams, drifting leaves.
 */
const HanoiAwakeningHero = ({ heroData, onExploreClick }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const headlineRef = useRef(null);
  const kickerRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const statsRef = useRef(null);
  const animationFrameRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneContextRef = useRef(null);

  const { isKorean } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const tagline = isKorean
    ? '하노이는 서두르지 않을 때 더욱 아름답습니다.'
    : 'Hà Nội không dành cho những bước chân vội vã.';

  const ctaText = isKorean ? '하노이 속으로 들어가기' : 'Bước vào Hà Nội';

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Warm morning lake fog
    scene.background = new THREE.Color(0x1a242c);
    scene.fog = new THREE.FogExp2(0x1a242c, 0.022);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 12);

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

    // 2. Lighting System: Dawn over Hoan Kiem
    const ambientLight = new THREE.AmbientLight(0x425666, 1.4);
    scene.add(ambientLight);

    // Warm golden sunrise sun
    const sunLight = new THREE.DirectionalLight(0xffdfa8, 2.8);
    sunLight.position.set(8, 14, -18);
    scene.add(sunLight);

    // Soft sky fill
    const skyFill = new THREE.HemisphereLight(0xffeedd, 0x1a252e, 1.2);
    scene.add(skyFill);

    // 3. Lake Water Surface Plane with Custom Ripple Shader/Animation
    const waterGeo = new THREE.PlaneGeometry(60, 60, 48, 48);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x1f343d,
      roughness: 0.12,
      metalness: 0.85,
      flatShading: false,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -0.6;
    scene.add(waterMesh);

    // Record original water vertex heights for gentle harmonic wave motion
    const posAttr = waterGeo.attributes.position;
    const initialZ = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      initialZ[i] = posAttr.getZ(i);
    }

    // 4. Turtle Tower (Tháp Rùa) Landmark 3D Group
    const towerGroup = new THREE.Group();
    towerGroup.position.set(0, -0.6, -14);

    // Islet Mound (Mound of earth and green moss)
    const moundGeo = new THREE.CylinderGeometry(4.2, 5.6, 0.9, 32);
    const moundMat = new THREE.MeshStandardMaterial({
      color: 0x243329,
      roughness: 0.85,
      metalness: 0.1,
    });
    const moundMesh = new THREE.Mesh(moundGeo, moundMat);
    moundMesh.position.y = 0.45;
    towerGroup.add(moundMesh);

    // Tower Level 1 (Base tier with arches)
    const tier1Geo = new THREE.BoxGeometry(3.6, 2.0, 2.6);
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xc4b79b, // Weathered ancient Hanoi limestone
      roughness: 0.75,
      metalness: 0.15,
    });
    const tier1Mesh = new THREE.Mesh(tier1Geo, stoneMat);
    tier1Mesh.position.y = 1.9;
    towerGroup.add(tier1Mesh);

    // Tier 1 Arches (carved negative depth)
    const archMat = new THREE.MeshBasicMaterial({ color: 0x151f24 });
    const arch1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.2, 2.65), archMat);
    arch1.position.set(0, 1.8, 0);
    towerGroup.add(arch1);

    // Tower Level 2 (Middle tier with columns and windows)
    const tier2Geo = new THREE.BoxGeometry(2.8, 1.6, 2.0);
    const tier2Mesh = new THREE.Mesh(tier2Geo, stoneMat);
    tier2Mesh.position.y = 3.7;
    towerGroup.add(tier2Mesh);

    // Tower Level 3 (Top pavilion tier)
    const tier3Geo = new THREE.BoxGeometry(1.8, 1.2, 1.4);
    const tier3Mesh = new THREE.Mesh(tier3Geo, stoneMat);
    tier3Mesh.position.y = 5.1;
    towerGroup.add(tier3Mesh);

    // Pointed Curved Roof Top
    const roofGeo = new THREE.ConeGeometry(1.5, 1.1, 4);
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x8a4b38, // Terracotta red clay ancient tile
      roughness: 0.6,
      metalness: 0.1,
    });
    const roofMesh = new THREE.Mesh(roofGeo, roofMat);
    roofMesh.rotation.y = Math.PI / 4;
    roofMesh.position.y = 6.2;
    towerGroup.add(roofMesh);

    // Soft warm lantern glow inside Turtle Tower
    const lanternLight = new THREE.PointLight(0xffaa44, 2.5, 9, 2);
    lanternLight.position.set(0, 3.5, 0);
    towerGroup.add(lanternLight);

    scene.add(towerGroup);

    // 5. Surrounding Ancient Willow Trees (Cây liễu rủ ven hồ Hoàn Kiếm)
    const willowGroup = new THREE.Group();
    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x2d4838,
      roughness: 0.8,
      metalness: 0.05,
    });

    const createWillowBranch = (x, y, z, scale) => {
      const branch = new THREE.Group();
      branch.position.set(x, y, z);
      branch.scale.setScalar(scale);

      // Drooping foliage clusters
      for (let j = 0; j < 5; j++) {
        const cluster = new THREE.Mesh(
          new THREE.SphereGeometry(1.2 + j * 0.2, 8, 8),
          foliageMat
        );
        cluster.position.set((j - 2) * 0.8, -j * 0.7, (Math.random() - 0.5) * 0.8);
        cluster.scale.set(1, 1.6, 1);
        branch.add(cluster);
      }
      return branch;
    };

    // Left willow silhouette
    willowGroup.add(createWillowBranch(-8, 2.5, -4, 1.2));
    willowGroup.add(createWillowBranch(-6.5, 3.2, -6, 0.9));
    // Right willow silhouette
    willowGroup.add(createWillowBranch(7.5, 2.8, -5, 1.1));
    willowGroup.add(createWillowBranch(9.0, 3.4, -7, 1.0));
    scene.add(willowGroup);

    // 6. Atmospheric Mist Layers (Layered textured planes drifting across the lake)
    const mistGroup = new THREE.Group();
    const createMistCanvas = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 256;
      cvs.height = 128;
      const ctx = cvs.getContext('2d');
      const grad = ctx.createRadialGradient(128, 64, 10, 128, 64, 120);
      grad.addColorStop(0, 'rgba(235, 225, 210, 0.5)');
      grad.addColorStop(0.5, 'rgba(210, 220, 225, 0.25)');
      grad.addColorStop(1, 'rgba(30, 45, 55, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 128);
      return new THREE.CanvasTexture(cvs);
    };

    const mistTex = createMistCanvas();
    const mistMat = new THREE.MeshBasicMaterial({
      map: mistTex,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const mistPlanes = [];
    for (let m = 0; m < 7; m++) {
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(16 + m * 3, 4 + m), mistMat);
      plane.position.set((Math.random() - 0.5) * 14, 0.1 + m * 0.25, -4 - m * 1.8);
      plane.rotation.y = (Math.random() - 0.5) * 0.2;
      mistGroup.add(plane);
      mistPlanes.push({ mesh: plane, speed: 0.0015 + m * 0.0008, baseZ: plane.position.z });
    }
    scene.add(mistGroup);

    // 7. Drifting Willow Leaf Particles (Lá liễu rơi khẽ)
    const leafCount = 80;
    const leafGeo = new THREE.BufferGeometry();
    const leafPositions = new Float32Array(leafCount * 3);
    const leafVelocities = [];

    for (let i = 0; i < leafCount; i++) {
      leafPositions[i * 3] = (Math.random() - 0.5) * 20;
      leafPositions[i * 3 + 1] = Math.random() * 8 + 0.5;
      leafPositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
      leafVelocities.push({
        vx: (Math.random() - 0.5) * 0.008,
        vy: -0.004 - Math.random() * 0.006,
        vz: (Math.random() - 0.5) * 0.006,
        swaySpeed: 1 + Math.random() * 2,
        swayAmp: 0.01 + Math.random() * 0.02,
      });
    }
    leafGeo.setAttribute('position', new THREE.BufferAttribute(leafPositions, 3));

    const leafMat = new THREE.PointsMaterial({
      color: 0xd4a359,
      size: 0.14,
      transparent: true,
      opacity: 0.75,
    });
    const leafPoints = new THREE.Points(leafGeo, leafMat);
    scene.add(leafPoints);

    sceneContextRef.current = {
      scene,
      camera,
      renderer,
      waterGeo,
      initialZ,
      mistPlanes,
      leafPoints,
      leafPositions,
      leafVelocities,
      willowGroup,
      towerGroup,
    };

    // 8. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Water Ripple wave displacement
      const pos = waterGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const z =
          Math.sin(u * 0.35 + elapsed * 1.2) * 0.08 +
          Math.cos(v * 0.3 + elapsed * 0.9) * 0.06;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;

      // Mist Drift
      mistPlanes.forEach((p, idx) => {
        p.mesh.position.x += p.speed;
        if (p.mesh.position.x > 14) p.mesh.position.x = -14;
      });

      // Willow tree sway
      willowGroup.children.forEach((b, i) => {
        b.rotation.z = Math.sin(elapsed * 0.8 + i) * 0.025;
      });

      // Leaves falling
      const leafPos = leafPoints.geometry.attributes.position.array;
      for (let i = 0; i < leafCount; i++) {
        const v = leafVelocities[i];
        leafPos[i * 3 + 1] += v.vy;
        leafPos[i * 3] += Math.sin(elapsed * v.swaySpeed + i) * v.swayAmp + v.vx;

        if (leafPos[i * 3 + 1] < -0.4) {
          leafPos[i * 3 + 1] = 7.5;
          leafPos[i * 3] = (Math.random() - 0.5) * 18;
        }
      }
      leafPoints.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // 9. GSAP Cinematic Scroll Progression (Dolly Camera Forward into Hoan Kiem)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=160%',
        pin: true,
        scrub: 1.2,
      },
    });

    // Camera pushes smoothly from z=12 down towards the water at z=1.5
    tl.to(
      camera.position,
      {
        z: 3.5,
        y: 1.1,
        ease: 'none',
      },
      0
    );

    // Fade out initial text overlay as user enters the lake
    tl.to(
      [kickerRef.current, headlineRef.current, subtitleRef.current, ctaGroupRef.current, statsRef.current],
      {
        opacity: 0,
        y: -30,
        stagger: 0.04,
        ease: 'power2.in',
      },
      0.15
    );

    // Resize Handler
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
      // Dispose WebGL
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

  const handleScrollToNext = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const nextSection = document.getElementById('scene-old-quarter');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="hanoi-awakening-hero" id="hanoi-hero">
      {/* Three.js WebGL Canvas */}
      <canvas ref={canvasRef} className="hanoi-hero-canvas" />

      {/* Atmospheric Vignette & Color Film Grade */}
      <div className="hanoi-hero-vignette" aria-hidden="true" />
      <div className="hanoi-hero-amber-glow" aria-hidden="true" />

      {/* Hero Editorial Narrative Overlay */}
      <div className="hanoi-hero-content-wrapper">
        <div className="hanoi-hero-header">
          <div ref={kickerRef} className="hanoi-hero-kicker">
            <span className="hanoi-kicker-badge">
              <Sparkles size={13} className="kicker-sparkle-icon" />
              <span>SUPER EZ TOUR · HANOI</span>
            </span>
            <span className="hanoi-kicker-dot">·</span>
            <span className="hanoi-kicker-sub">
              {isKorean ? '100% 단독 프라이빗 컬렉션' : 'Tour Riêng 100% · Không Ghép Đoàn'}
            </span>
          </div>

          <h1 ref={headlineRef} className="hanoi-hero-title">
            <span className="hanoi-title-en">HANOI</span>
            <span className="hanoi-title-divider" aria-hidden="true">—</span>
            <span className="hanoi-title-sub">A LIVING MEMORY</span>
          </h1>

          <p ref={subtitleRef} className="hanoi-hero-tagline">
            “{tagline}”
          </p>

          <div ref={ctaGroupRef} className="hanoi-hero-cta-row">
            <button
              type="button"
              className="hanoi-hero-primary-btn"
              onClick={handleScrollToNext}
            >
              <span>{ctaText}</span>
              <Compass size={17} className="btn-compass-icon" />
              <span className="btn-glow-pulse" aria-hidden="true" />
            </button>

            <a
              href="#hanoi-heritage"
              className="hanoi-hero-ghost-btn"
            >
              <Eye size={15} />
              <span>{isKorean ? '천년 유산 둘러보기' : 'Khám phá di sản Thăng Long'}</span>
            </a>
          </div>
        </div>

        {/* Quick Cultural Stats Bar */}
        <div ref={statsRef} className="hanoi-hero-stats-bar">
          <div className="hanoi-stat-item">
            <span className="stat-num">1010~</span>
            <span className="stat-label">
              {isKorean ? '천년의 수도 역사' : 'Năm lịch sử Thăng Long'}
            </span>
          </div>
          <div className="hanoi-stat-sep" aria-hidden="true" />
          <div className="hanoi-stat-item">
            <span className="stat-num">36</span>
            <span className="stat-label">
              {isKorean ? '옛 장인 골목거리' : 'Phố nghề cổ truyền'}
            </span>
          </div>
          <div className="hanoi-stat-sep" aria-hidden="true" />
          <div className="hanoi-stat-item">
            <span className="stat-num">100%</span>
            <span className="stat-label">
              {isKorean ? '단독 프라이빗 투어' : 'Hành trình riêng biệt'}
            </span>
          </div>
          <div className="hanoi-stat-sep" aria-hidden="true" />
          <div className="hanoi-stat-item">
            <span className="stat-num">0%</span>
            <span className="stat-label">
              {isKorean ? '쇼핑 강요 일절 없음' : 'Shopping ép buộc'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="hanoi-hero-scroll-cue" onClick={handleScrollToNext}>
        <span className="scroll-cue-text">
          {isKorean ? '아래로 스크롤하여 시간의 거리를 걷기' : 'Cuộn xuống để dạo bước qua miền ký ức'}
        </span>
        <div className="scroll-cue-icon-wrap">
          <ChevronDown size={18} className="scroll-arrow-anim" />
        </div>
      </div>
    </section>
  );
};

export default HanoiAwakeningHero;
