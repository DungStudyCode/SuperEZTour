import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Landmark, Sparkles, Plus, Check, Eye, Compass, RotateCw } from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useTripBuilder } from '../../../context/TripBuilderContext';
import './HanoiHeritageChamber.css';

gsap.registerPlugin(ScrollTrigger);

const HERITAGE_ANGLES = [
  {
    id: 'khue-van-cac',
    title: 'Khuê Văn Các · Mặt Trời Văn Hiến',
    titleKr: '규문각 · 지혜와 학문의 상징',
    cameraPos: { x: 0, y: 3.2, z: 9.5 },
    target: { x: 0, y: 2.2, z: 0 },
    desc: 'Biểu tượng chính thức của thủ đô Hà Nội, dựng năm 1805. Bốn cửa sổ tròn tượng trưng cho sao Khuê chủ về văn chương tỏa sáng rực rỡ.',
    descKr: '1805년 건립된 하노이 수도의 상징. 원형 창문은 하늘에서 학문과 문학을 관장하는 규수(奎宿) 별자리가 빛나는 모습을 형상화.'
  },
  {
    id: 'thien-quang-tinh',
    title: 'Thiên Quang Tỉnh · Giếng Soi Bóng Trời',
    titleKr: '천광정 · 하늘의 빛을 담은 못',
    cameraPos: { x: -6.5, y: 4.8, z: 7.2 },
    target: { x: 0, y: 1.0, z: 0 },
    desc: 'Hồ nước vuông vức soi bóng Khuê Văn Các tròn, thể hiện triết lý Trời tròn Đất vuông của văn hóa phương Đông nghìn năm.',
    descKr: '네모난 연못 위에 둥근 규문각이 비치는 조화. 동양 철학의 천원지방(하늘은 둥글고 땅은 네모남) 우주관을 시각화.'
  },
  {
    id: 'bia-tien-si',
    title: '82 Bia Tiến Sĩ · Di Sản UNESCO',
    titleKr: '82개 진사제명비 · 유네스코 세계기록유산',
    cameraPos: { x: 5.5, y: 1.8, z: 4.5 },
    target: { x: 2.5, y: 0.8, z: 0 },
    desc: 'Di sản tư liệu thế giới vinh danh 1,304 vị đỗ đại khoa từ 1442–1779. Lời răn bất hủ: "Hiền tài là nguyên khí của quốc gia".',
    descKr: '1442년부터 1779년까지 과거 급제자 1,304명의 이름을 거북 등에 새긴 석비. "현재(賢才)는 국가의 원기"라는 유교 철학의 정수.'
  }
];

const HanoiHeritageChamber = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [renderMode, setRenderMode] = useState('pbr'); // 'sketch' | 'pbr'
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [isAddedToTrip, setIsAddedToTrip] = useState(false);
  const animationFrameRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsTargetRef = useRef(new THREE.Vector3(0, 2.2, 0));
  const rendererRef = useRef(null);
  const pbrMaterialsRef = useRef([]);
  const sketchMaterialsRef = useRef([]);

  const { isKorean } = useLanguage();
  const { tripState, toggleAttraction } = useTripBuilder();

  const currentAngle = HERITAGE_ANGLES[activeAngleIndex];

  useEffect(() => {
    if (tripState.selectedAttractions.includes('van-mieu')) {
      setIsAddedToTrip(true);
    } else {
      setIsAddedToTrip(false);
    }
  }, [tripState.selectedAttractions]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a2128);
    scene.fog = new THREE.FogExp2(0x1a2128, 0.03);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 9.5);
    cameraRef.current = camera;

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

    // 2. Realistic Heritage Lighting
    const ambientLight = new THREE.AmbientLight(0xffedd4, 1.35);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffdfa8, 2.8);
    sunLight.position.set(7, 14, 8);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x7695a8, 1.1);
    sunLight.position.set(-8, 6, -6);
    scene.add(fillLight);

    // 3. Pavilion Materials (PBR vs Architectural Ink Sketch)
    pbrMaterialsRef.current = [];
    sketchMaterialsRef.current = [];

    const createDualMaterial = (pbrColor, roughness = 0.7, metalness = 0.1) => {
      const pbrMat = new THREE.MeshStandardMaterial({
        color: pbrColor,
        roughness,
        metalness,
      });
      const sketchMat = new THREE.MeshBasicMaterial({
        color: 0xeeeeee,
        wireframe: true,
      });
      pbrMaterialsRef.current.push(pbrMat);
      sketchMaterialsRef.current.push(sketchMat);
      return { pbrMat, sketchMat };
    };

    const redWood = createDualMaterial(0x8a3928, 0.65, 0.1); // Ironwood Lim lacquer red
    const roofClay = createDualMaterial(0xa84a32, 0.7, 0.05); // Ancient terracotta curved tiles
    const stoneBase = createDualMaterial(0xc2b59d, 0.8, 0.1); // Thanh Hoa ancient limestone
    const waterMat = createDualMaterial(0x1b323b, 0.15, 0.85); // Reflecting pool water

    // 4. Ground Courtyard & Thiên Quang Tỉnh Reflecting Pool
    const courtGeo = new THREE.PlaneGeometry(32, 32);
    const courtMesh = new THREE.Mesh(courtGeo, stoneBase.pbrMat);
    courtMesh.rotation.x = -Math.PI / 2;
    courtMesh.position.y = 0;
    scene.add(courtMesh);

    // Reflecting Pool Well (Thiên Quang Tỉnh)
    const poolGeo = new THREE.BoxGeometry(8, 0.25, 8);
    const poolMesh = new THREE.Mesh(poolGeo, waterMat.pbrMat);
    poolMesh.position.set(0, 0.05, 3.5);
    scene.add(poolMesh);

    // 5. 3D Architectural Model of KHUÊ VĂN CÁC
    const khueVanCac = new THREE.Group();
    khueVanCac.position.set(0, 0, -1.2);

    // 4 Square Brick Pillars (Tier 1)
    const pillarGeo = new THREE.BoxGeometry(0.7, 2.8, 0.7);
    const pillarPositions = [
      [-1.4, 1.4, -1.4],
      [1.4, 1.4, -1.4],
      [-1.4, 1.4, 1.4],
      [1.4, 1.4, 1.4],
    ];
    pillarPositions.forEach(([px, py, pz]) => {
      const pillar = new THREE.Mesh(pillarGeo, stoneBase.pbrMat);
      pillar.position.set(px, py, pz);
      khueVanCac.add(pillar);
    });

    // Lower Roof Tier Eaves
    const lowerRoofGeo = new THREE.BoxGeometry(4.8, 0.25, 4.8);
    const lowerRoof = new THREE.Mesh(lowerRoofGeo, roofClay.pbrMat);
    lowerRoof.position.set(0, 2.9, 0);
    khueVanCac.add(lowerRoof);

    // Upper Wooden Pavilion (Tier 2)
    const upperWallGeo = new THREE.BoxGeometry(3.2, 1.8, 3.2);
    const upperWall = new THREE.Mesh(upperWallGeo, redWood.pbrMat);
    upperWall.position.set(0, 3.9, 0);
    khueVanCac.add(upperWall);

    // Circular Sunburst Windows (Cửa tròn tượng trưng sao Khuê)
    const windowRimGeo = new THREE.TorusGeometry(0.65, 0.08, 12, 32);
    const windowRim1 = new THREE.Mesh(windowRimGeo, redWood.pbrMat);
    windowRim1.position.set(0, 3.9, 1.63);
    khueVanCac.add(windowRim1);

    const windowRim2 = new THREE.Mesh(windowRimGeo, redWood.pbrMat);
    windowRim2.position.set(0, 3.9, -1.63);
    khueVanCac.add(windowRim2);

    // Sunburst rays inside circular window
    const rayMat = redWood.pbrMat;
    for (let r = 0; r < 8; r++) {
      const ray = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.2, 0.04), rayMat);
      ray.rotation.z = (r * Math.PI) / 8;
      ray.position.set(0, 3.9, 1.62);
      khueVanCac.add(ray);
    }

    // Top Sweeping Hip Roof (8 mái cong uốn lượn)
    const topRoofGeo = new THREE.ConeGeometry(3.4, 1.4, 4);
    const topRoof = new THREE.Mesh(topRoofGeo, roofClay.pbrMat);
    topRoof.rotation.y = Math.PI / 4;
    topRoof.position.set(0, 5.5, 0);
    topRoof.scale.set(1.15, 0.9, 1.15);
    khueVanCac.add(topRoof);

    // Top Ornamental Finial (Bầu hồ lô)
    const finialGeo = new THREE.SphereGeometry(0.25, 12, 12);
    const finial = new THREE.Mesh(finialGeo, stoneBase.pbrMat);
    finial.position.set(0, 6.35, 0);
    khueVanCac.add(finial);

    // 6. Stone Turtle Doctor Stele (Bia Tiến Sĩ bên hông)
    const steleGroup = new THREE.Group();
    steleGroup.position.set(2.8, 0, 1.5);
    steleGroup.rotation.y = -Math.PI / 5;

    // Turtle carapace
    const turtleGeo = new THREE.CylinderGeometry(0.7, 0.9, 0.35, 16);
    const turtleMesh = new THREE.Mesh(turtleGeo, stoneBase.pbrMat);
    turtleMesh.position.y = 0.18;
    turtleMesh.scale.set(1, 1, 1.4);
    steleGroup.add(turtleMesh);

    // Stone Stele standing on turtle back
    const steleSlabGeo = new THREE.BoxGeometry(0.6, 1.4, 0.12);
    const steleSlab = new THREE.Mesh(steleSlabGeo, stoneBase.pbrMat);
    steleSlab.position.set(0, 0.95, 0);
    steleGroup.add(steleSlab);

    scene.add(khueVanCac);
    scene.add(steleGroup);

    // Subtle gentle orbit camera rotation
    let clock = new THREE.Clock();
    let isInteracting = false;
    let prevMouseX = 0;

    const onMouseDown = (e) => {
      isInteracting = true;
      prevMouseX = e.clientX;
    };
    const onMouseMove = (e) => {
      if (!isInteracting) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      khueVanCac.rotation.y += deltaX * 0.005;
    };
    const onMouseUp = () => {
      isInteracting = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isInteracting = true;
        prevMouseX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e) => {
      if (!isInteracting || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      prevMouseX = e.touches[0].clientX;
      khueVanCac.rotation.y += deltaX * 0.006;
    };
    const onTouchEnd = () => {
      isInteracting = false;
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle idling rotation if not actively dragging
      if (!isInteracting) {
        khueVanCac.rotation.y = Math.sin(elapsed * 0.25) * 0.06;
      }

      camera.lookAt(controlsTargetRef.current);
      renderer.render(scene, camera);
    };
    animate();

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
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      scene.traverse((obj) => {
        if (obj.isMesh) {
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

  // Switch between Sketch & PBR mode
  const handleToggleRenderMode = (mode) => {
    setRenderMode(mode);
    const useSketch = mode === 'sketch';

    pbrMaterialsRef.current.forEach((mat) => {
      if (useSketch) {
        mat.wireframe = true;
        mat.color.setHex(0xd0d0d0);
      } else {
        mat.wireframe = false;
      }
    });
  };

  // Change camera preset angle with GSAP smooth tween
  const handleSelectAngle = (idx) => {
    setActiveAngleIndex(idx);
    const angle = HERITAGE_ANGLES[idx];
    const camera = cameraRef.current;
    if (!camera) return;

    gsap.to(camera.position, {
      x: angle.cameraPos.x,
      y: angle.cameraPos.y,
      z: angle.cameraPos.z,
      duration: 1.2,
      ease: 'power2.inOut',
    });

    gsap.to(controlsTargetRef.current, {
      x: angle.target.x,
      y: angle.target.y,
      z: angle.target.z,
      duration: 1.2,
      ease: 'power2.inOut',
    });
  };

  const handleToggleTripCart = () => {
    toggleAttraction('van-mieu');
  };

  return (
    <section ref={containerRef} className="hanoi-heritage-chamber" id="hanoi-heritage">
      {/* 3D WebGL Architectural Canvas */}
      <canvas ref={canvasRef} className="heritage-3d-canvas" />

      {/* Atmospheric Vignette */}
      <div className="heritage-chamber-vignette" aria-hidden="true" />

      {/* Top Header Floating Narrative */}
      <div className="heritage-chamber-header">
        <div className="heritage-pill-badge">
          <Landmark size={14} />
          <span>SCENE 03 · THE HERITAGE CHAMBER</span>
        </div>

        <h2 className="heritage-chamber-title">
          {isKorean ? '문묘 국자감 · 천년 지혜의 궁전' : 'Văn Miếu – Quốc Tử Giám'}
        </h2>

        <p className="heritage-chamber-subtitle">
          {isKorean
            ? '1070년 창건된 베트남 최초의 국립대학. 3D 모델을 회전하고 시점을 전환하며 감상하세요.'
            : 'Đại học đầu tiên của Việt Nam từ năm 1070. Xoay mô hình 3D và khám phá từng chi tiết kiến trúc ngàn năm.'}
        </p>

        {/* Render Mode Switcher: Architectural Sketch vs PBR Heritage Realism */}
        <div className="heritage-mode-switcher">
          <button
            type="button"
            className={`mode-btn ${renderMode === 'pbr' ? 'mode-btn-active' : ''}`}
            onClick={() => handleToggleRenderMode('pbr')}
          >
            <Sparkles size={14} />
            <span>{isKorean ? '실제 헤리티지 3D' : 'Mô hình Di sản 3D'}</span>
          </button>

          <button
            type="button"
            className={`mode-btn ${renderMode === 'sketch' ? 'mode-btn-active' : ''}`}
            onClick={() => handleToggleRenderMode('sketch')}
          >
            <Compass size={14} />
            <span>{isKorean ? '건축 설계도 & 키호아' : 'Ký họa Kiến trúc'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Architectural Presets & Description Card */}
      <div className="heritage-bottom-card-row">
        {/* Left: 3 Preset Perspective Buttons */}
        <div className="heritage-presets-stack">
          <span className="presets-label">
            {isKorean ? '시점 프리셋 전환:' : 'Góc nhìn kiến trúc:'}
          </span>
          <div className="presets-button-group">
            {HERITAGE_ANGLES.map((angle, idx) => (
              <button
                key={angle.id}
                type="button"
                className={`preset-angle-btn ${activeAngleIndex === idx ? 'preset-btn-active' : ''}`}
                onClick={() => handleSelectAngle(idx)}
              >
                <span className="angle-btn-num">0{idx + 1}</span>
                <span className="angle-btn-title">
                  {isKorean ? angle.titleKr : angle.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Selected Architectural Element Narrative Card */}
        <div className="heritage-info-card">
          <div className="info-card-top">
            <span className="info-card-kicker">
              {isKorean ? '베트남 국보 제1호' : 'DI TÍCH QUỐC GIA ĐẶC BIỆT'}
            </span>
            <h3 className="info-card-heading">
              {isKorean ? currentAngle.titleKr : currentAngle.title}
            </h3>
          </div>

          <p className="info-card-desc">
            {isKorean ? currentAngle.descKr : currentAngle.desc}
          </p>

          <div className="info-card-actions">
            <button
              type="button"
              className={`heritage-add-cart-btn ${isAddedToTrip ? 'btn-already-added' : ''}`}
              onClick={handleToggleTripCart}
            >
              {isAddedToTrip ? (
                <>
                  <Check size={16} />
                  <span>{isKorean ? '일정에 추가 완료' : 'Đã thêm vào hành trình'}</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>{isKorean ? '하노이 여행 일정에 담기' : 'Thêm Văn Miếu vào tour riêng'}</span>
                </>
              )}
            </button>

            <span className="heritage-drag-cue">
              <RotateCw size={13} className="drag-spin-icon" />
              <span>{isKorean ? '드래그하여 360° 회전' : 'Kéo chuột để xoay 360°'}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HanoiHeritageChamber;
