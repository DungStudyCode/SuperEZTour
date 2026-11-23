import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles, Waves, Landmark, Eye, MapPin } from 'lucide-react';
import './FlyThroughScene.css';

gsap.registerPlugin(ScrollTrigger);

const featureIcons = [Waves, Sparkles, Landmark];

const FlyThroughScene = ({ introData }) => {
  const sceneRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const editorialColRef = useRef(null);
  const hudColRef = useRef(null);
  const kickerRef = useRef(null);
  const dividerRef = useRef(null);
  const titleLinesRef = useRef([]);
  const leadRef = useRef(null);
  const paragraphsRef = useRef(null);
  const featuresRef = useRef(null);
  const stageTrackerRef = useRef(null);

  const [activeStage, setActiveStage] = useState('01');
  const [stageName, setStageName] = useState('OPENING VIEW');

  // Fallback data mapping
  const kickerText = introData?.kicker || 'DISCOVER DA NANG';
  const rawTitle = introData?.title || 'Một thành phố.\nNgàn cách để khám phá.';
  const titleLines = typeof rawTitle === 'string' ? rawTitle.split('\n') : [rawTitle];

  const leadText =
    introData?.lead ||
    'Nơi đại dương ngọc bích chạm vào núi non kỳ vĩ, nơi nhịp sống hiện đại giao thoa cùng chiều sâu văn hóa di sản nghìn năm.';

  const paragraphs =
    Array.isArray(introData?.paragraphs) && introData.paragraphs.length > 0
      ? introData.paragraphs
      : [
          'Đà Nẵng không đơn thuần là một điểm đến trên bản đồ. Đó là cảm giác đón ánh bình minh rạng rỡ trên bờ cát mịn Mỹ Khê, ngắm hoàng hôn buông đỏ rực nơi đỉnh Sơn Trà với đàn voọc chà vá chân nâu quý hiếm, và thả hồn cùng hàng ngàn chiếc đèn hoa đăng lung linh trên dòng sông Hoài phố cổ.',
          'Với Super EZ Tour, bạn không bị bó buộc trong những đoàn khách 40 người hay lịch trình rập khuôn. Mỗi bước chân là một trải nghiệm độc bản do chính bạn làm chủ.',
        ];

  const DEFAULT_GALLERY_URLS = [
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
  ];

  const galleryItems = (introData?.gallery || [
    {
      url: DEFAULT_GALLERY_URLS[0],
      caption: 'Cầu Vàng Bà Nà Hills — Biểu tượng kiến trúc thế giới vươn giữa mây trời',
    },
    {
      url: DEFAULT_GALLERY_URLS[1],
      caption: 'Bờ biển Mỹ Khê — Tuyệt tác đường chân trời đại dương miền nhiệt đới',
    },
    {
      url: DEFAULT_GALLERY_URLS[2],
      caption: 'Phố cổ Hội An — Trầm tích di sản ngàn năm soi bóng sông Hoài',
    },
  ]).map((item, idx) => ({
    ...item,
    url: item?.url || DEFAULT_GALLERY_URLS[idx] || DEFAULT_GALLERY_URLS[0],
  }));

  const features =
    Array.isArray(introData?.features) && introData.features.length > 0
      ? introData.features
      : [
          {
            title: 'Biển & Núi hội tụ',
            desc: 'Sự hòa quyện tuyệt mỹ giữa bán đảo Sơn Trà, Ngũ Hành Sơn và đại dương.',
          },
          {
            title: 'Ẩm thực phong vị miền Trung',
            desc: 'Từ Mì Quảng dân dã đến yến tiệc hải sản tươi sống cao cấp.',
          },
          {
            title: 'Cửa ngõ di sản thế giới',
            desc: 'Dễ dàng kết nối Phố cổ Hội An, Cố đô Huế và Thánh địa Mỹ Sơn.',
          },
        ];

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // =========================================================================
    // 1. THREE.JS SCENE, CAMERA, RENDERER INITIALIZATION
    // =========================================================================
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x061426);
    scene.fog = new THREE.FogExp2(0x061426, 0.032);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // =========================================================================
    // 2. CINEMATIC LIGHTING RIG
    // Key Light, Fill Light, Rim Light & Champagne Gold Reflections
    // =========================================================================
    // Ambient Light: Soft oceanic navy keeping deep shadows luminous
    const ambientLight = new THREE.AmbientLight(0x132742, 1.25);
    scene.add(ambientLight);

    // Key Light: Warm champagne directional light from upper-left
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    keyLight.position.set(-6, 8, 9);
    scene.add(keyLight);

    // Fill Light: Soft cool navy fill from opposite low angle
    const fillLight = new THREE.DirectionalLight(0x284e78, 1.05);
    fillLight.position.set(7, -2, 6);
    scene.add(fillLight);

    // Rim Light: Champagne gold back-light grazing frame edges and bevels
    const rimLight = new THREE.DirectionalLight(0xffbe42, 2.8);
    rimLight.position.set(5.5, 4.5, -6.5);
    scene.add(rimLight);

    // Accent Light: Delicate PointLight near Golden Bridge frame to illuminate gold trim
    const accentLight = new THREE.PointLight(0xffb52b, 1.6, 12, 1.6);
    accentLight.position.set(3.8, 1.8, 1.2);
    scene.add(accentLight);

    // =========================================================================
    // 3. ARCHITECTURAL EXHIBITION FLOOR & ATMOSPHERIC HORIZON
    // =========================================================================
    // Ground Plane with subtle dark matte reflectance
    const floorGeo = new THREE.PlaneGeometry(80, 80);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x040d1c,
      roughness: 0.45,
      metalness: 0.45,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -3.2;
    scene.add(floorMesh);

    // Background Panorama: Sơn Trà & Twilight Mountain Silhouette
    const bgGeo = new THREE.PlaneGeometry(48, 24);
    const bgMat = new THREE.MeshBasicMaterial({
      color: 0x223f66,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    });
    const bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.position.set(0, 2.0, -18);
    scene.add(bgMesh);

    // =========================================================================
    // 4. SPATIAL COMPOSITION: THREE CURATED ARTWORK MONOLITHS
    // Architectural frames with champagne gold bevels & photographic canvases
    // =========================================================================
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    // Helper: Create high-aesthetic canvas placeholder texture
    const createPlaceholderTexture = (label) => {
      const cvs = document.createElement('canvas');
      cvs.width = 512;
      cvs.height = 384;
      const ctx = cvs.getContext('2d');
      const grad = ctx.createLinearGradient(0, 0, 512, 384);
      grad.addColorStop(0, '#0a1d38');
      grad.addColorStop(1, '#051122');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 384);

      ctx.strokeStyle = 'rgba(255, 181, 43, 0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(256, 172);
      ctx.lineTo(256, 212);
      ctx.moveTo(236, 192);
      ctx.lineTo(276, 192);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.font = '600 13px "Manrope", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label || 'SUPER EZ TOUR · DA NANG', 256, 230);

      const tex = new THREE.CanvasTexture(cvs);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // Helper: Create gallery monolith with frame body, champagne gold trim, and artwork canvas
    const createGalleryMonolith = ({
      width,
      height,
      depth = 0.16,
      imageUrl,
      title,
      isFocal = false,
    }) => {
      const group = new THREE.Group();

      // 1. Frame Body: Obsidian navy architectural frame
      const border = isFocal ? 0.16 : 0.12;
      const frameGeo = new THREE.BoxGeometry(width + border * 2, height + border * 2, depth);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x09182d,
        roughness: 0.32,
        metalness: 0.55,
      });
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      group.add(frameMesh);

      // 2. Champagne Gold Inner Bevel / Rim (catches Rim Light specular sheen)
      const trimGeo = new THREE.BoxGeometry(
        width + border * 0.4,
        height + border * 0.4,
        depth + 0.015
      );
      const trimMat = new THREE.MeshStandardMaterial({
        color: 0xdec68b,
        roughness: 0.24,
        metalness: 0.9,
        emissive: 0x2b1e06,
        emissiveIntensity: 0.35,
      });
      const trimMesh = new THREE.Mesh(trimGeo, trimMat);
      group.add(trimMesh);

      // 3. Artwork Canvas: Genuine photographic print
      const canvasGeo = new THREE.PlaneGeometry(width, height);
      const placeholderTex = createPlaceholderTexture(title);
      const canvasMat = new THREE.MeshStandardMaterial({
        map: placeholderTex,
        roughness: 0.82,
        metalness: 0.04,
      });
      const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat);
      canvasMesh.position.z = depth / 2 + 0.012;
      group.add(canvasMesh);

      // Async texture loading with sRGB colorSpace
      if (imageUrl) {
        textureLoader.load(
          imageUrl,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.generateMipmaps = true;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            canvasMat.map = tex;
            canvasMat.needsUpdate = true;
          },
          undefined,
          (err) => console.warn('Texture load fallback:', imageUrl, err)
        );
      }

      return { group, canvasMat, canvasMesh, frameMesh, trimMesh };
    };

    // Load Background Panorama Texture
    textureLoader.load(
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80',
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        bgMat.map = tex;
        bgMat.needsUpdate = true;
      }
    );

    // Frame 01: Focal Point — Cầu Vàng Bà Nà Hills (Midground Right)
    const focalMonolith = createGalleryMonolith({
      width: 4.4,
      height: 3.2,
      depth: 0.18,
      imageUrl: galleryItems[0]?.url,
      title: galleryItems[0]?.title || 'CẦU VÀNG BÀ NÀ HILLS',
      isFocal: true,
    });
    focalMonolith.group.position.set(2.4, 0.25, 0.0);
    focalMonolith.group.rotation.set(0.02, -0.07, 0.0);
    scene.add(focalMonolith.group);

    // Frame 02: Midground Left — Bờ biển Mỹ Khê
    const coastalMonolith = createGalleryMonolith({
      width: 3.4,
      height: 2.3,
      depth: 0.14,
      imageUrl: galleryItems[1]?.url,
      title: galleryItems[1]?.title || 'BỜ BIỂN MỸ KHÊ',
      isFocal: false,
    });
    coastalMonolith.group.position.set(-4.6, 1.1, -3.8);
    coastalMonolith.group.rotation.set(-0.04, 0.26, -0.02);
    scene.add(coastalMonolith.group);

    // Frame 03: Foreground Left — Phố cổ Hội An (Drifts past in foreground)
    const heritageMonolith = createGalleryMonolith({
      width: 2.5,
      height: 3.1,
      depth: 0.15,
      imageUrl: galleryItems[2]?.url,
      title: galleryItems[2]?.title || 'PHỐ CỔ HỘI AN',
      isFocal: false,
    });
    heritageMonolith.group.position.set(-2.8, -1.0, 4.4);
    heritageMonolith.group.rotation.set(0.05, 0.4, 0.03);
    scene.add(heritageMonolith.group);

    // =========================================================================
    // 5. PREMIUM CAMERA MOVEMENT: CATMULL-ROM SPLINE TRAJECTORY
    // Independent camera position and lookAt target curves
    // =========================================================================
    const cameraSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.9, 1.9, 10.8), // 0.00: Wide opening viewpoint
      new THREE.Vector3(-0.7, 1.6, 9.2),  // 0.15: Opening hold concludes
      new THREE.Vector3(-0.2, 1.1, 7.0),  // 0.30: Dolly-in & truck, gliding past foreground
      new THREE.Vector3(0.7, 0.65, 5.0),  // 0.45: Camera journey continues
      new THREE.Vector3(1.4, 0.38, 3.8),  // 0.60: Perspective transition aligns with focal artwork
      new THREE.Vector3(1.72, 0.24, 3.35),// 0.80: Editorial reveal stable viewpoint
      new THREE.Vector3(1.75, 0.22, 3.3), // 1.00: Final hold
    ]);
    cameraSpline.curveType = 'centripetal';

    const targetSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.2, 0.5, 0.0),  // 0.00: Looking broadly into the gallery space
      new THREE.Vector3(0.0, 0.45, 0.0),  // 0.15
      new THREE.Vector3(0.9, 0.35, 0.0),  // 0.30: Steering gaze smoothly
      new THREE.Vector3(1.9, 0.28, 0.0),  // 0.45
      new THREE.Vector3(2.42, 0.2, 0.0),  // 0.60: Locked on Golden Bridge center
      new THREE.Vector3(2.45, 0.2, 0.0),  // 0.80: Rock solid
      new THREE.Vector3(2.45, 0.2, 0.0),  // 1.00: Rock solid
    ]);
    targetSpline.curveType = 'centripetal';

    // Position camera at initial frame
    camera.position.copy(cameraSpline.getPointAt(0));
    camera.lookAt(targetSpline.getPointAt(0));

    // =========================================================================
    // 6. SCROLLTRIGGER & CINEMATIC PACING (0-15%, 15-45%, 45-60%, 60-80%, 80-100%)
    // =========================================================================
    const scrollTargetProgress = { value: 0 };
    let currentSplineT = 0;
    let time = 0;
    let animFrameId;

    // Helper: Map scroll progress [0, 1] into cinematic stages
    const mapProgressToSplineT = (progress) => {
      if (progress <= 0.15) {
        // Stage 1: Opening Hold (0-15%) -> Minimal micro-movement
        return (progress / 0.15) * 0.06;
      } else if (progress <= 0.45) {
        // Stage 2: Camera Journey (15-45%) -> Glides past foreground
        const sub = (progress - 0.15) / 0.3;
        return 0.06 + sub * 0.48;
      } else if (progress <= 0.6) {
        // Stage 3: Perspective Transition (45-60%) -> Aligns with Golden Bridge
        const sub = (progress - 0.45) / 0.15;
        return 0.54 + sub * 0.3;
      } else if (progress <= 0.8) {
        // Stage 4: Editorial Reveal (60-80%) -> Approaches settled viewpoint
        const sub = (progress - 0.6) / 0.2;
        return 0.84 + sub * 0.16;
      } else {
        // Stage 5: Final Cinematic Hold (80-100%) -> Completely settled
        return 1.0;
      }
    };

    // Update Stage Indicator & Editorial Opacities on Scroll
    const updateUIForProgress = (progress) => {
      // 1. Stage Tracker Text
      if (progress < 0.15) {
        setActiveStage('01');
        setStageName('OPENING HOLD · 3D SPACE');
      } else if (progress < 0.45) {
        setActiveStage('02');
        setStageName('CAMERA JOURNEY · SPATIAL DEPTH');
      } else if (progress < 0.6) {
        setActiveStage('03');
        setStageName('PERSPECTIVE TRANSITION');
      } else if (progress < 0.8) {
        setActiveStage('04');
        setStageName('EDITORIAL REVEAL');
      } else {
        setActiveStage('05');
        setStageName('FINAL CINEMATIC HOLD');
      }

      // 2. Editorial Column Opacity & Transform Choreography
      if (editorialColRef.current) {
        if (progress < 0.52) {
          editorialColRef.current.style.opacity = '0';
          editorialColRef.current.style.pointerEvents = 'none';
          editorialColRef.current.style.transform = 'translateY(24px)';
        } else if (progress >= 0.52 && progress < 0.78) {
          const ratio = (progress - 0.52) / 0.26;
          editorialColRef.current.style.opacity = `${Math.min(ratio * 1.15, 1)}`;
          editorialColRef.current.style.pointerEvents = ratio > 0.6 ? 'auto' : 'none';
          editorialColRef.current.style.transform = `translateY(${Math.max(24 * (1 - ratio), 0)}px)`;
        } else {
          editorialColRef.current.style.opacity = '1';
          editorialColRef.current.style.pointerEvents = 'auto';
          editorialColRef.current.style.transform = 'translateY(0px)';
        }
      }

      // 3. Floating Artwork HUD Opacity (Focal Point Badge on Right)
      if (hudColRef.current) {
        if (progress < 0.6) {
          hudColRef.current.style.opacity = '0';
          hudColRef.current.style.pointerEvents = 'none';
          hudColRef.current.style.transform = 'translateY(20px)';
        } else if (progress >= 0.6 && progress < 0.82) {
          const ratio = (progress - 0.6) / 0.22;
          hudColRef.current.style.opacity = `${Math.min(ratio * 1.2, 1)}`;
          hudColRef.current.style.pointerEvents = 'auto';
          hudColRef.current.style.transform = `translateY(${Math.max(20 * (1 - ratio), 0)}px)`;
        } else {
          hudColRef.current.style.opacity = '1';
          hudColRef.current.style.pointerEvents = 'auto';
          hudColRef.current.style.transform = 'translateY(0px)';
        }
      }

      // 4. Title Mask Line Stagger
      if (titleLinesRef.current.length > 0) {
        titleLinesRef.current.forEach((el, idx) => {
          if (!el) return;
          if (progress < 0.58) {
            el.style.transform = 'translateY(115%)';
          } else {
            const delayOffset = idx * 0.04;
            const lineProgress = Math.min(Math.max((progress - 0.58 - delayOffset) / 0.16, 0), 1);
            el.style.transform = `translateY(${115 * (1 - lineProgress)}%)`;
          }
        });
      }

      // 5. Golden Line Divider scaleX
      if (dividerRef.current) {
        if (progress < 0.55) {
          dividerRef.current.style.transform = 'scaleX(0)';
        } else {
          const divProgress = Math.min((progress - 0.55) / 0.12, 1);
          dividerRef.current.style.transform = `scaleX(${divProgress})`;
        }
      }
    };

    // ScrollTrigger creation with pinning
    const isDesktop = window.innerWidth > 768;
    const pinDistance = isDesktop ? '+=320%' : '+=220%';

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: sceneRef.current,
      start: 'top top',
      end: pinDistance,
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        scrollTargetProgress.value = mapProgressToSplineT(p);
        updateUIForProgress(p);
      },
    });

    // =========================================================================
    // 7. RENDER LOOP WITH ORGANIC BREATHING INERTIA
    // =========================================================================
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      time += 0.016;

      if (!reduceMotion) {
        // Inertia interpolation toward target spline progress
        currentSplineT += (scrollTargetProgress.value - currentSplineT) * 0.075;
        const clampedT = Math.min(Math.max(currentSplineT, 0), 1);

        // Organic breathing micro-drift (museum studio atmosphere)
        const breathingX = Math.sin(time * 0.45) * 0.014;
        const breathingY = Math.cos(time * 0.35) * 0.012;

        const camPos = cameraSpline.getPointAt(clampedT);
        camera.position.set(camPos.x + breathingX, camPos.y + breathingY, camPos.z);

        const lookTarget = targetSpline.getPointAt(clampedT);
        camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z);

        // Subtle champagne pulse on focal frame trim
        accentLight.intensity = 1.6 + Math.sin(time * 0.7) * 0.25;
      } else {
        // Reduced motion: static camera at final heroic framing
        const camPos = cameraSpline.getPointAt(1.0);
        camera.position.copy(camPos);
        const lookTarget = targetSpline.getPointAt(1.0);
        camera.lookAt(lookTarget);
      }

      renderer.render(scene, camera);
    };

    animate();

    // =========================================================================
    // 8. RESIZE OBSERVER & CLEANUP
    // =========================================================================
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      scrollTriggerInstance.kill();

      // Dispose Three.js resources cleanly
      scene.traverse((obj) => {
        if (obj.isMesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((mat) => {
                if (mat.map) mat.map.dispose();
                mat.dispose();
              });
            } else {
              if (obj.material.map) obj.material.map.dispose();
              obj.material.dispose();
            }
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="fly-through-scene" ref={sceneRef} id="discover">
      {/* 3D WebGL Exhibition Canvas */}
      <div className="fly-canvas-container" ref={canvasContainerRef} aria-hidden="true" />

      {/* Atmospheric Depth Vignette & Navy Gradients */}
      <div className="fly-ambient-vignette" aria-hidden="true" />

      {/* Persistent Stage Pagination Tracker (Creative Studio Quality) */}
      <div className="fly-stage-tracker" ref={stageTrackerRef} aria-hidden="true">
        <span className="fly-tracker-pill">
          <span className="fly-tracker-dot" />
          <span className="fly-tracker-stage">PHASE {activeStage}</span>
        </span>
        <span className="fly-tracker-divider" />
        <span className="fly-tracker-name">{stageName}</span>
      </div>

      {/* Editorial Content Layer pinned over 3D Exhibition */}
      <div className="dest-container fly-container" ref={contentWrapperRef}>
        <div className="fly-editorial-layout">
          {/* Left Column: Magazine Narrative & Sensory Highlights */}
          <div className="fly-editorial-column" ref={editorialColRef}>
            <header className="fly-header">
              <div className="fly-kicker-wrap" ref={kickerRef}>
                <Compass size={14} className="fly-kicker-icon" aria-hidden="true" />
                <span className="fly-kicker">{kickerText}</span>
              </div>

              <div className="fly-title-divider" ref={dividerRef} aria-hidden="true" />

              <h2
                className="fly-title"
                aria-label={typeof rawTitle === 'string' ? rawTitle.replace(/\n/g, ' ') : rawTitle}
              >
                {titleLines.map((line, idx) => (
                  <span key={idx} className="fly-title-line-mask">
                    <span
                      className="fly-title-line"
                      ref={(el) => (titleLinesRef.current[idx] = el)}
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </h2>
            </header>

            {leadText && (
              <p className="fly-lead-text" ref={leadRef}>
                {leadText}
              </p>
            )}

            <div className="fly-paragraphs" ref={paragraphsRef}>
              {paragraphs.map((p, idx) => (
                <p key={idx} className="fly-paragraph">
                  {p}
                </p>
              ))}
            </div>

            {/* 3 Sensory Pillars / Highlights Row */}
            <div className="fly-features-row" ref={featuresRef}>
              {features.map((feat, idx) => {
                const IconComponent = featureIcons[idx % featureIcons.length] || Sparkles;
                return (
                  <div key={idx} className="fly-feature-card">
                    <div className="fly-feature-icon-wrap" aria-hidden="true">
                      <IconComponent size={18} className="fly-feature-icon" />
                    </div>
                    <div className="fly-feature-content">
                      <h3 className="fly-feature-title">{feat.title}</h3>
                      <p className="fly-feature-desc">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Architectural HUD Plaque for Focal Point */}
          <div className="fly-hud-column" ref={hudColRef}>
            <aside className="fly-artwork-hud">
              <div className="fly-hud-top">
                <span className="fly-hud-badge">
                  <span className="fly-hud-pulse" aria-hidden="true" />
                  {introData?.hudBadge || 'FOCAL POINT · TỌA ĐỘ ĐỘC BẢN'}
                </span>
                <span className="fly-hud-coords">15°59′54″N 107°59′42″E</span>
              </div>

              <h3 className="fly-hud-title">{introData?.hudTitle || 'Cầu Vàng Bà Nà Hills'}</h3>
              <p className="fly-hud-caption">
                {introData?.hudCaption || 'Biểu tượng kiến trúc thế giới vươn giữa mây trời, nơi đôi bàn tay đá khổng lồ nâng đỡ dải lụa vàng giữa đại ngàn nguyên sinh.'}
              </p>

              <div className="fly-hud-specs">
                <div className="fly-hud-spec-item">
                  <span className="fly-spec-label">{introData?.hudAltitudeLabel || 'Cao độ'}</span>
                  <span className="fly-spec-val">1,414 m</span>
                </div>
                <div className="fly-hud-spec-item">
                  <span className="fly-spec-label">{introData?.hudLengthLabel || 'Chiều dài'}</span>
                  <span className="fly-spec-val">150 m</span>
                </div>
                <div className="fly-hud-spec-item">
                  <span className="fly-spec-label">{introData?.hudArchLabel || 'Kiến trúc'}</span>
                  <span className="fly-spec-val">Champagne Gold</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlyThroughScene;
