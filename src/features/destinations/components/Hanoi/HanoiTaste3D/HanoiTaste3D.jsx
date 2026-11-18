import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Utensils, Sparkles, Coffee, ArrowRight, Check, Plus, Flame } from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useTripBuilder } from '../../../context/TripBuilderContext';
import './HanoiTaste3D.css';

const HANOI_DISHES = [
  {
    id: 'pho-bo',
    number: '01',
    name: 'Phở Bò Gia Truyền Bát Đàn',
    nameKr: '하노이 정통 소고기 쌀국수 (퍼보)',
    nameEn: 'Heirloom Hanoi Beef Pho',
    tagline: 'Linh hồn ẩm thực thủ đô từ nước dùng ninh xương tủy 24 giờ',
    taglineKr: '24시간 맑게 우려낸 우골 육수의 깊고 담백한 정수',
    desc: 'Không hoa hồi quế nồng gắt như phương Nam, Phở Hà Nội thuần khiết vị ngọt thanh của xương bò, bánh phở mềm mướt và gầu bò giòn rụm thái mỏng.',
    descKr: '향신료의 자극 없이 맑고 깊은 쇠고기 본연의 감칠맛. 갓 뽑은 얇고 부드러운 쌀면과 신선한 파 향이 어우러진 베트남 최고의 힐링 푸드.',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80',
    location: '49 Bát Đàn, Hoàn Kiếm, Hà Nội',
    locationKr: '하노이 호안끼엠 밧단 49번지',
    pairing: 'Quẩy giòn rụm & Giấm tỏi ớt Bắc'
  },
  {
    id: 'egg-coffee',
    number: '02',
    name: 'Cà Phê Trứng Nguyên Bản Giảng',
    nameKr: '원조 에그커피 (카페 쯩)',
    nameEn: 'Authentic Hanoi Egg Coffee',
    tagline: 'Kiệt tác hòa quyện giữa lòng đỏ trứng gà tươi và cà phê Robusta',
    taglineKr: '신선한 달걀노른자 크림과 진한 로부스타 원두의 만남',
    desc: 'Sáng tạo năm 1946 tại khách sạn Metropole. Lớp kem trứng đánh bông xốp béo ngậy như zabaglione phương Tây, quyện vị đắng nồng của cà phê Việt.',
    descKr: '1946년 창안된 전설의 커피. 갓 내린 뜨거운 커피 위에 벨벳처럼 부드럽고 달콤한 커스터드 달걀 크림을 얹어 떠먹는 예술적 풍미.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    location: '39 Nguyễn Hữu Huân, Hoàn Kiếm, Hà Nội',
    locationKr: '하노이 호안끼엠 응우옌흐우후안 39번지',
    pairing: 'Thưởng thức nóng cùng thìa nhỏ'
  },
  {
    id: 'bun-cha',
    number: '03',
    name: 'Bún Chả Nướng Than Hoa Hàng Quạt',
    nameKr: '참숯 직화 하노이 분짜',
    nameEn: 'Charcoal Grilled Pork Bun Cha',
    tagline: 'Chả miếng bọc lá xương xông nướng xèo xèo trên than hồng rực',
    taglineKr: '참숯에 직화로 구워낸 돼지고기 완자와 새콤달콤한 느억맘',
    desc: 'Thịt ba chỉ ướp mật mía kẹp vỉ tre nướng than củi, thả vào bát nước mắm chua ngọt ấm nóng, ăn kèm bún sợi mảnh và rổ rau ghém xanh mướt.',
    descKr: '대나무 집게에 끼워 숯불에 구운 육즙 가득한 돼지고기. 파파야와 당근을 띄운 따뜻한 느억맘 소스에 면과 허브를 적셔 먹는 별미.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
    location: '74 Hàng Quạt, Hoàn Kiếm, Hà Nội',
    locationKr: '하노이 항꿧 74번지 골목',
    pairing: 'Nem cua bể giòn tan & Tía tô kinh giới'
  },
  {
    id: 'cha-ca',
    number: '04',
    name: 'Chả Cá Lã Vọng Gia Truyền',
    nameKr: '짜까 라봉 (가물치 딜 볶음)',
    nameEn: 'Cha Ca La Vong Pan-Fried Fish',
    tagline: 'Món ăn danh giá có cả một con phố mang tên tại thủ đô',
    taglineKr: '거리 이름까지 바꾼 150년 역사의 가물치 요리',
    desc: 'Cá lăng lọc thịt ướp riềng nghệ vàng óng, xào sôi sùng sục trên chảo gang cùng thì là và hành hoa bốc khói ngạt ngào, chấm mắm tôm đánh sủi bọt.',
    descKr: '강황과 갈랑갈에 재운 메기 살을 테이블 위 무쇠 팬에서 딜(허브)과 파를 듬뿍 넣어 볶아내는 시그니처 미식.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    location: '14 Chả Cá, Hoàn Kiếm, Hà Nội',
    locationKr: '하노이 짜까 14번지',
    pairing: 'Mắm tôm bọt rượu & Lạc rang giòn'
  },
  {
    id: 'bun-thang',
    number: '05',
    name: 'Bún Thang Thanh Tao Hà Thành',
    nameKr: '분탕 (궁중 스타일 맑은 닭국수)',
    nameEn: 'Delicate Bun Thang Noodle Soup',
    tagline: 'Bức tranh ngũ sắc cầu kỳ hội tụ gần 20 nguyên liệu tinh vi',
    taglineKr: '달걀지단, 닭고기, 표고버섯이 꽃처럼 수놓인 예술 국수',
    desc: 'Được mệnh danh là "Thăng Long đệ nhất thang", gồm giò lụa, trứng tráng mỏng, thịt gà xé, củ cải khô và tinh dầu cà cuống điểm xuyết trong veo.',
    descKr: '모든 재료를 실처럼 가늘게 채 썰어 올린 하노이 양반 가문의 정갈한 국수. 맑고 투명한 닭 육수의 극치.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    location: '48 Cầu Gỗ, Hoàn Kiếm, Hà Nội',
    locationKr: '하노이 꺼우고 48번지',
    pairing: 'Một giọt tinh dầu cà cuống truyền thống'
  },
  {
    id: 'com-vong',
    number: '06',
    name: 'Cốm Làng Vòng Mùa Thu',
    nameKr: '보 마을 햇 햅쌀 콤 (가을 별미)',
    nameEn: 'Vong Village Young Green Rice',
    tagline: 'Hương vị mùa thu nồng nàn gói trong lá sen Tây Hồ thanh khiết',
    taglineKr: '서호 연잎에 싼 가을의 은은한 단맛과 풀 향기',
    desc: 'Hạt lúa nếp non rang đảo khéo léo, giã đều tay cho dẹt mịn, thoảng hương sữa lúa ngọt ngào, ăn nhấm nháp cùng chuối tiêu trứng cuốc và trà sen.',
    descKr: '아직 여물지 않은 어린 벼를 볶고 찧어 만든 초록빛 쌀알. 연잎에 싸여 향기가 스며든 하노이 가을의 대표 간식.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    location: 'Làng Vòng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
    locationKr: '하노이 보 마을 전통 지구',
    pairing: 'Chuối tiêu trứng cuốc & Trà sen Tây Hồ'
  }
];

const HanoiTaste3D = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedDishIndex, setSelectedDishIndex] = useState(1); // Default to Egg Coffee
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const animationFrameRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  const { isKorean } = useLanguage();
  const { toggleCulinary, tripState } = useTripBuilder();

  const activeDish = HANOI_DISHES[selectedDishIndex];
  const isAddedToTrip = tripState.culinaryPreferences.includes(
    isKorean ? activeDish.nameKr : activeDish.name
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a2228);
    scene.fog = new THREE.FogExp2(0x1a2228, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 2.5, 4.6);
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
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // 2. Warm Heritage Café Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.4);
    scene.add(ambientLight);

    // Warm morning sunbeam angled from window
    const sunLight = new THREE.DirectionalLight(0xffd599, 3.2);
    sunLight.position.set(4, 6, 2);
    scene.add(sunLight);

    // Tabletop - Aged Teakwood
    const tableGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.35, 32);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x3d2b20,
      roughness: 0.7,
      metalness: 0.1,
    });
    const tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.position.y = -0.18;
    scene.add(tableMesh);

    // 3. 3D Coffee Cup Group (Ceramic Cup, Saucer, Golden Foam & Phin Filter)
    const coffeeGroup = new THREE.Group();
    coffeeGroup.position.set(0, 0, 0.5);

    // Ceramic Saucer (Đĩa sứ trắng)
    const saucerGeo = new THREE.CylinderGeometry(1.2, 0.8, 0.08, 32);
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ee,
      roughness: 0.25,
      metalness: 0.15,
    });
    const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
    saucer.position.y = 0.04;
    coffeeGroup.add(saucer);

    // Ceramic Coffee Cup (Ly sứ trắng)
    const cupGeo = new THREE.CylinderGeometry(0.7, 0.55, 0.95, 32);
    const cup = new THREE.Mesh(cupGeo, ceramicMat);
    cup.position.y = 0.55;
    coffeeGroup.add(cup);

    // Cup handle
    const handleGeo = new THREE.TorusGeometry(0.28, 0.06, 12, 24, Math.PI);
    const handle = new THREE.Mesh(handleGeo, ceramicMat);
    handle.rotation.z = -Math.PI / 2;
    handle.position.set(0.7, 0.55, 0);
    coffeeGroup.add(handle);

    // Dark Robusta Coffee Base Layer inside cup
    const coffeeBaseGeo = new THREE.CylinderGeometry(0.64, 0.64, 0.35, 32);
    const darkCoffeeMat = new THREE.MeshStandardMaterial({
      color: 0x22130c,
      roughness: 0.3,
      metalness: 0.4,
    });
    const coffeeBase = new THREE.Mesh(coffeeBaseGeo, darkCoffeeMat);
    coffeeBase.position.y = 0.5;
    coffeeGroup.add(coffeeBase);

    // Golden Egg Custard Foam Layer on Top (Lớp kem trứng vàng óng)
    const eggFoamGeo = new THREE.CylinderGeometry(0.66, 0.65, 0.3, 32);
    const eggFoamMat = new THREE.MeshStandardMaterial({
      color: 0xf2c45a, // Golden creamy yellow
      roughness: 0.35,
      metalness: 0.2,
    });
    const eggFoam = new THREE.Mesh(eggFoamGeo, eggFoamMat);
    eggFoam.position.y = 0.85;
    coffeeGroup.add(eggFoam);

    // Traditional Metal Spoon (Thìa nhỏ)
    const spoonMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, metalness: 0.9, roughness: 0.2 });
    const spoon = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.02, 1.3), spoonMat);
    spoon.rotation.x = 0.2;
    spoon.rotation.y = 0.4;
    spoon.position.set(0.3, 0.7, 0.4);
    coffeeGroup.add(spoon);

    scene.add(coffeeGroup);

    // 4. Subtle Rising Steam Particles (Hơi nóng bốc lên nhẹ nhàng)
    const steamCount = 35;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamVelocities = [];

    for (let s = 0; s < steamCount; s++) {
      steamPositions[s * 3] = (Math.random() - 0.5) * 0.35;
      steamPositions[s * 3 + 1] = 1.05 + Math.random() * 0.9;
      steamPositions[s * 3 + 2] = 0.5 + (Math.random() - 0.5) * 0.35;
      steamVelocities.push({
        vy: 0.004 + Math.random() * 0.004,
        swaySpeed: 1.5 + Math.random() * 2,
        swayAmp: 0.003 + Math.random() * 0.004,
        initialY: 1.05,
      });
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    const steamMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.09,
      transparent: true,
      opacity: 0.35,
    });
    const steamPoints = new THREE.Points(steamGeo, steamMat);
    scene.add(steamPoints);

    // 5. Background Vintage Window Frame with Sunbeam
    const windowFrameMat = new THREE.MeshStandardMaterial({ color: 0x2e423b, roughness: 0.7 });
    const windowFrame = new THREE.Group();
    windowFrame.position.set(0, 2.8, -4.5);

    const postL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.2, 0.2), windowFrameMat);
    postL.position.x = -2.2;
    const postR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.2, 0.2), windowFrameMat);
    postR.position.x = 2.2;
    const beamT = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.18, 0.2), windowFrameMat);
    beamT.position.y = 2.0;
    const beamM = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.14, 0.15), windowFrameMat);
    beamM.position.y = 0;
    windowFrame.add(postL);
    windowFrame.add(postR);
    windowFrame.add(beamT);
    windowFrame.add(beamM);
    scene.add(windowFrame);

    // 6. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle cup idle rotation
      coffeeGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.08;

      // Rising steam
      const sPos = steamPoints.geometry.attributes.position.array;
      for (let s = 0; s < steamCount; s++) {
        const vel = steamVelocities[s];
        sPos[s * 3 + 1] += vel.vy;
        sPos[s * 3] += Math.sin(elapsed * vel.swaySpeed + s) * vel.swayAmp;

        if (sPos[s * 3 + 1] > 2.2) {
          sPos[s * 3 + 1] = vel.initialY;
          sPos[s * 3] = (Math.random() - 0.5) * 0.3;
        }
      }
      steamPoints.geometry.attributes.position.needsUpdate = true;

      camera.lookAt(0, 0.8, 0);
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

  // Zoom Camera to cup on click
  const handleToggleCupZoom = () => {
    const camera = cameraRef.current;
    if (!camera) return;

    const nextZoom = !isZoomedIn;
    setIsZoomedIn(nextZoom);

    gsap.to(camera.position, {
      x: nextZoom ? 0.4 : 0,
      y: nextZoom ? 1.6 : 2.5,
      z: nextZoom ? 2.4 : 4.6,
      duration: 1.1,
      ease: 'power2.inOut',
    });
  };

  const handleSelectDish = (idx) => {
    setSelectedDishIndex(idx);
  };

  const handleToggleDishTrip = () => {
    toggleCulinary(isKorean ? activeDish.nameKr : activeDish.name);
  };

  return (
    <section ref={containerRef} className="hanoi-taste-scene" id="hanoi-taste">
      {/* 3D WebGL Café Canvas */}
      <canvas
        ref={canvasRef}
        className="taste-3d-canvas"
        onClick={handleToggleCupZoom}
        title="Nhấp để phóng to ly cà phê trứng 3D"
      />

      <div className="taste-vignette" aria-hidden="true" />

      {/* Top Floating Header */}
      <div className="taste-header-hud">
        <div className="taste-pill-badge">
          <Utensils size={14} />
          <span>SCENE 04 · THE TASTE OF HANOI</span>
        </div>

        <h2 className="taste-title">
          {isKorean ? '하노이의 맛 · 시간을 끓여낸 미식' : 'Tinh Hoa Ẩm Thực Hà Nội'}
        </h2>

        <p className="taste-subtitle">
          {isKorean
            ? '1946년의 에그커피부터 백 년 전통 쌀국수까지, 하노이 사람들의 서정적인 미식 철학을 만납니다.'
            : 'Từ ly cà phê trứng năm 1946 đến bát phở bò ninh tủy 24 giờ — mỗi món ăn là một lát cắt văn hóa sâu sắc.'}
        </p>

        {/* 3D Interactive Cup Zoom Cue */}
        <button
          type="button"
          className="taste-cup-zoom-hint"
          onClick={handleToggleCupZoom}
        >
          <Coffee size={15} />
          <span>
            {isZoomedIn
              ? (isKorean ? '시점 원래대로 복원' : 'Thu nhỏ góc nhìn bàn cà phê')
              : (isKorean ? '3D 에그커피 잔 확대 관람' : 'Nhấp để xem cận cảnh 3D ly Cà phê Trứng')}
          </span>
        </button>
      </div>

      {/* Dish Selector Tabs (6 Authentic Hanoi Delicacies) */}
      <div className="taste-dishes-selector">
        <div className="selector-scroll-track">
          {HANOI_DISHES.map((dish, idx) => {
            const isSelected = selectedDishIndex === idx;
            return (
              <button
                key={dish.id}
                type="button"
                className={`dish-tab-btn ${isSelected ? 'dish-tab-active' : ''}`}
                onClick={() => handleSelectDish(idx)}
              >
                <span className="dish-num">0{idx + 1}</span>
                <span className="dish-name">
                  {isKorean ? dish.nameKr : dish.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Dish Editorial Card */}
      <div className="taste-editorial-card">
        <div className="dish-card-img-wrap">
          <img
            src={activeDish.image}
            alt={activeDish.name}
            className="dish-card-img"
          />
          <div className="dish-img-gradient" />
          <span className="dish-num-badge">0{activeDish.number} / 06</span>
        </div>

        <div className="dish-card-info">
          <div className="dish-header-row">
            <div>
              <span className="dish-cat-kicker">
                {isKorean ? '하노이 대표 미식' : 'ẨM THỰC TRÀNG AN'}
              </span>
              <h3 className="dish-title">
                {isKorean ? activeDish.nameKr : activeDish.name}
              </h3>
              <span className="dish-en-name">{activeDish.nameEn}</span>
            </div>

            <button
              type="button"
              className={`dish-add-trip-btn ${isAddedToTrip ? 'dish-added' : ''}`}
              onClick={handleToggleDishTrip}
              title="Thêm vào hành trình ẩm thực riêng"
            >
              {isAddedToTrip ? <Check size={16} /> : <Plus size={16} />}
              <span>{isAddedToTrip ? (isKorean ? '추가됨' : 'Đã chọn') : (isKorean ? '미식 일정에 담기' : 'Thêm món')}</span>
            </button>
          </div>

          <p className="dish-tagline">
            “{isKorean ? activeDish.taglineKr : activeDish.tagline}”
          </p>

          <p className="dish-desc">
            {isKorean ? activeDish.descKr : activeDish.desc}
          </p>

          <div className="dish-meta-row">
            <div className="dish-meta-item">
              <span className="meta-lbl">
                {isKorean ? '추천 전통 원조집:' : 'Địa chỉ gợi ý:'}
              </span>
              <strong className="meta-val">
                {isKorean ? activeDish.locationKr : activeDish.location}
              </strong>
            </div>
            <div className="dish-meta-item">
              <span className="meta-lbl">
                {isKorean ? '어울리는 곁들임:' : 'Chuẩn vị dùng kèm:'}
              </span>
              <strong className="meta-val">{activeDish.pairing}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HanoiTaste3D;
