import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles, ChevronDown, Eye, Layers } from 'lucide-react';
import { useLanguage } from '../../../../../context/LanguageContext';
import { getLenis } from '../../../motion/LenisManager';
import {
  createWeatheredStuccoTexture,
  createWeatheredStuccoBumpMap,
  createTerracottaBrickTexture,
  createGlazedRoofTileTexture,
  createLimestoneTexture,
  createIsletBarkTexture,
  createIsletFoliageTexture,
  createDawnSky360Texture,
} from './hanoiTextureGenerator';
import './HanoiAwakeningHero.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * SUPER EZ TOUR — HANOI HERO: 360° CINEMATIC ORBIT
 * Production Implementation · Hoan Kiem Lake Dawn · Turtle Tower Landmark
 *
 * Storyboard Architecture:
 * - STAGE A (0% - 15%): Establishing Shot — Dawn Hoàn Kiếm panorama, Turtle Tower framed with willow.
 * - STAGE B (15% - 85%): Full 360° Cinematic Camera Orbit around Turtle Tower in real 3D world space.
 *                        Returns exactly to initial azimuth at 85% (0° -> 360°).
 * - STAGE C (85% - 92%): Orbit Completion & Steady Lakeside Framing — calm dawn lake, natural lighting.
 * - STAGE D (92% - 100%): Seamless Handoff into Screen 2 (#scene-old-quarter) — gentle golden mist, zero black veil.
 */
const HanoiAwakeningHero = ({ heroData, onExploreClick }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const kickerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const statsRef = useRef(null);
  const scrollCueRef = useRef(null);
  const transitionFogRef = useRef(null);

  // WebGL & Animation References
  const animationFrameRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const waterMeshRef = useRef(null);
  const initialWaterZRef = useRef(null);
  const willowGroupRef = useRef(null);
  const willowMaterialRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const isLoadedRef = useRef(false);

  const { isKorean } = useLanguage();
  const [is3DReady, setIs3DReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Real-time Flight Telemetry State for HUD verification
  const [hudData, setHudData] = useState({
    stage: 'Stage A: Establishing Shot (0-15%)',
    pct: 0,
    angleDeg: '0.0°',
    camX: '0.00',
    camY: '8.20',
    camZ: '25.00',
  });

  const tagline = isKorean
    ? '하노이는 서두르지 않을 때 더욱 아름답습니다.'
    : 'Hà Nội không dành cho những bước chân vội vã.';

  const ctaText = isKorean ? '하노이 속으로 들어가기' : 'Bước vào Hà Nội';

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
    // 1. THREE.JS SCENE, CAMERA & ACES FILMIC PBR RENDERER
    // =========================================================================
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Soft, airy lake dawn mist (never dense black gloom)
    scene.background = new THREE.Color(0x162736);
    scene.fog = new THREE.FogExp2(0x182834, 0.0075);

    const isMobile = width < 768;
    const camera = new THREE.PerspectiveCamera(isMobile ? 52 : 46, width / (height || 1), 0.1, 450);
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
      console.warn('[HanoiAwakeningHero] WebGL fallback to photography:', e);
      setIs3DReady(true);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min((typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.20;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // =========================================================================
    // 2. NATURAL DAWN LIGHTING (Hoan Kiem Golden Sunrise Vector)
    // =========================================================================
    // Ambient dawn skylight (lifts shadow contrast on opposite side of tower)
    const ambientLight = new THREE.AmbientLight(0x557385, 1.4);
    scene.add(ambientLight);

    // Warm golden sunrise sun (matches physical solar azimuth ~110° over lake)
    const sunLight = new THREE.DirectionalLight(0xffdf9a, 3.4);
    sunLight.position.set(32, 26, -34);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 5;
    sunLight.shadow.camera.far = 130;
    sunLight.shadow.camera.left = -24;
    sunLight.shadow.camera.right = 24;
    sunLight.shadow.camera.top = 24;
    sunLight.shadow.camera.bottom = -24;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    // Secondary sunrise horizon bounce (ensures north & west architectural faces remain lit)
    const horizonFill = new THREE.DirectionalLight(0xffb870, 1.5);
    horizonFill.position.set(-24, 14, 26);
    scene.add(horizonFill);

    // Soft sky-to-ground hemisphere light
    const hemiLight = new THREE.HemisphereLight(0xffeedd, 0x223842, 1.2);
    scene.add(hemiLight);

    // =========================================================================
    // 3. 360° SEAMLESS DAWN SKY DOME & ENVIRONMENT (Phase 4 Solution)
    // Procedural 360° sky dome cylinder guarantees zero black voids or seams,
    // overlaid with authentic Hoan Kiem photo on the iconic front sector.
    // =========================================================================
    const sky360Texture = createDawnSky360Texture(1024, 512);
    const skyDomeGeo = new THREE.CylinderGeometry(180, 180, 110, 48, 1, true);
    const skyDomeMat = new THREE.MeshBasicMaterial({
      map: sky360Texture,
      side: THREE.BackSide,
      fog: true,
      depthWrite: false,
    });
    const skyDomeMesh = new THREE.Mesh(skyDomeGeo, skyDomeMat);
    skyDomeMesh.position.set(0, 24, 0);
    scene.add(skyDomeMesh);

    // Primary Sector Photo Backdrop Arc (Preserves real photography for front establishing shot)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/assets/destinations/hanoi/hoan_kiem_dawn_desktop.webp',
      (photoTexture) => {
        if (!sceneRef.current) return;
        photoTexture.colorSpace = THREE.SRGBColorSpace;
        photoTexture.wrapS = THREE.ClampToEdgeWrapping;
        photoTexture.wrapT = THREE.ClampToEdgeWrapping;
        photoTexture.repeat.set(1, 1);

        const photoArcGeo = new THREE.CylinderGeometry(165, 165, 75, 48, 1, true, Math.PI * 0.60, Math.PI * 0.80);
        const photoArcMat = new THREE.MeshBasicMaterial({
          map: photoTexture,
          side: THREE.BackSide,
          fog: true,
          depthWrite: false,
        });
        const photoArcMesh = new THREE.Mesh(photoArcGeo, photoArcMat);
        photoArcMesh.position.set(0, 20, -5);
        scene.add(photoArcMesh);
      },
      undefined,
      (err) => console.warn('[HanoiAwakeningHero] Front photo arc fallback:', err)
    );

    // =========================================================================
    // 4. DYNAMIC SPECTRAL EMERALD LAKE (Hồ Lục Thủy) WITH 3-PHASE WAVE DYNAMICS
    // =========================================================================
    const waterGeo = new THREE.PlaneGeometry(200, 200, 80, 80);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x183e36, // Signature jade emerald of Hoan Kiem Lake
      roughness: 0.14,
      metalness: 0.45,
      flatShading: false,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = 1.05; // Physical waterline of the islet
    waterMesh.receiveShadow = true;
    scene.add(waterMesh);
    waterMeshRef.current = waterMesh;

    // Record initial vertex offsets for harmonic ripples
    const posAttr = waterGeo.attributes.position;
    const initialWaterZ = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      initialWaterZ[i] = posAttr.getZ(i);
    }
    initialWaterZRef.current = initialWaterZ;

    // =========================================================================
    // 5. 3D WEEPING WILLOW FOREGROUND FRAMING (Liễu Rủ Hồ Gươm)
    // =========================================================================
    const willowGroup = new THREE.Group();
    scene.add(willowGroup);
    willowGroupRef.current = willowGroup;

    textureLoader.load(
      '/assets/destinations/hanoi/hoan_kiem_willow_fg.webp',
      (willowTex) => {
        if (!sceneRef.current) return;
        willowTex.colorSpace = THREE.SRGBColorSpace;

        const willowMat = new THREE.MeshStandardMaterial({
          map: willowTex,
          transparent: true,
          alphaTest: 0.05,
          roughness: 0.75,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        willowMaterialRef.current = willowMat;

        // Left willow branch
        const willowLeft = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), willowMat);
        willowLeft.position.set(-4.5, 7.8, 18.0);
        willowLeft.rotation.z = -0.08;
        willowGroup.add(willowLeft);

        // Right willow framing
        const willowRight = new THREE.Mesh(new THREE.PlaneGeometry(12, 7), willowMat);
        willowRight.position.set(5.2, 8.2, 16.5);
        willowRight.scale.x = -1;
        willowRight.rotation.z = 0.05;
        willowGroup.add(willowRight);
      },
      undefined,
      (err) => console.warn('[HanoiAwakeningHero] Willow fallback:', err)
    );

    // =========================================================================
    // 6. PROCEDURAL PBR ARCHITECTURAL MATERIALS FOR TURTLE TOWER (1886)
    // =========================================================================
    const pbrMaterials = {
      stucco: new THREE.MeshStandardMaterial({
        map: createWeatheredStuccoTexture(512),
        bumpMap: createWeatheredStuccoBumpMap(256),
        bumpScale: 0.04,
        roughness: 0.82,
        metalness: 0.04,
      }),
      brick: new THREE.MeshStandardMaterial({
        map: createTerracottaBrickTexture(512),
        roughness: 0.88,
        metalness: 0.05,
      }),
      roofTile: new THREE.MeshStandardMaterial({
        map: createGlazedRoofTileTexture(512),
        roughness: 0.45,
        metalness: 0.22,
        envMapIntensity: 1.4,
      }),
      limestone: new THREE.MeshStandardMaterial({
        map: createLimestoneTexture(512),
        roughness: 0.78,
        metalness: 0.08,
      }),
      bark: new THREE.MeshStandardMaterial({
        map: createIsletBarkTexture(256),
        roughness: 0.86,
        metalness: 0.04,
      }),
      foliage: new THREE.MeshStandardMaterial({
        map: createIsletFoliageTexture(256),
        roughness: 0.74,
        metalness: 0.02,
      }),
    };

    // Load Turtle Tower GLB & inject authentic historical materials
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/assets/destinations/hanoi/thap_rua_pbr.glb',
      (gltf) => {
        if (!sceneRef.current) return;
        const model = gltf.scene;
        model.position.set(0, 0, 0);

        // Strip diorama plinth, lake disk and ripple rings
        model.traverse((child) => {
          if (
            child.name === 'thaprua.plinth' ||
            child.name === 'thaprua.lake' ||
            (child.name && child.name.startsWith('thaprua.ripples'))
          ) {
            child.visible = false;
            return;
          }

          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const mat = child.material;
            const matName = mat ? (Array.isArray(mat) ? mat[0]?.name : mat.name) : '';

            // Inject high-res procedural architectural PBR textures
            if (matName === 'weathered plaster' || child.name?.includes('tower')) {
              child.material = pbrMaterials.stucco;
            } else if (matName === 'aged brick') {
              child.material = pbrMaterials.brick;
            } else if (matName === 'glazed roof tile') {
              child.material = pbrMaterials.roofTile;
            } else if (matName === 'ridge stone' || child.name?.includes('finial') || child.name?.includes('sweep')) {
              child.material = pbrMaterials.limestone;
            } else if (matName === 'bark' || child.name?.includes('taper')) {
              child.material = pbrMaterials.bark;
            } else if (matName === 'foliage' || matName === 'grass') {
              child.material = pbrMaterials.foliage;
            } else if (mat) {
              if (typeof mat.roughness === 'number') {
                mat.roughness = Math.max(mat.roughness, 0.55);
              }
              if ('envMapIntensity' in mat) {
                mat.envMapIntensity = 1.25;
              }
            }
          }
        });

        scene.add(model);
        isLoadedRef.current = true;
        setIs3DReady(true);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(pct);
        }
      },
      (err) => {
        console.warn('[HanoiAwakeningHero] GLB Model fallback:', err);
        setIs3DReady(true);
      }
    );

    // =========================================================================
    // 7. REAL-TIME 60FPS RENDER & 360° ORBIT CAMERA EVALUATOR
    // =========================================================================
    let isDisposed = false;
    let isSceneActive = true;
    const clock = new THREE.Clock();

    // Tower Focal Center (Architectural centroid)
    const focalCenter = new THREE.Vector3(0.0, 4.6, 0.0);
    const orbitRadius = isMobile ? 24.0 : 21.0;

    // Initial Camera Pose
    const initialCamPos = new THREE.Vector3(0.0, 8.2, isMobile ? 29.0 : 25.0);
    const initialTarget = new THREE.Vector3(0.0, 4.8, 0.0);
    camera.position.copy(initialCamPos);
    camera.lookAt(initialTarget);

    const currentCamPos = new THREE.Vector3().copy(initialCamPos);
    const currentTarget = new THREE.Vector3().copy(initialTarget);

    const animate = () => {
      if (isDisposed) return;
      if (!isSceneActive) {
        animationFrameRef.current = null;
        return;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Animate harmonic lake water ripples
      if (waterMeshRef.current && initialWaterZRef.current) {
        const pos = waterMeshRef.current.geometry?.attributes?.position;
        const initZ = initialWaterZRef.current;
        if (pos && pos.count) {
          for (let i = 0; i < pos.count; i++) {
            const u = pos.getX(i);
            const v = pos.getY(i);
            const wave =
              Math.sin(u * 0.35 + elapsed * 1.2) * 0.045 +
              Math.cos(v * 0.28 + elapsed * 0.95) * 0.035 +
              Math.sin((u + v) * 0.55 + elapsed * 1.6) * 0.016;
            pos.setZ(i, initZ[i] + wave);
          }
          pos.needsUpdate = true;
        }
      }

      // Gentle breeze sway on foreground weeping willow boughs
      if (willowGroupRef.current) {
        willowGroupRef.current.children.forEach((branch, idx) => {
          branch.rotation.z = Math.sin(elapsed * 0.9 + idx * 1.2) * 0.018;
        });
      }

      // -----------------------------------------------------------------------
      // REAL 360° CAMERA ORBIT MATHEMATICS (Phase 2 & Phase 3)
      // Clamped deterministic mapping directly driven by scroll progress
      // -----------------------------------------------------------------------
      if (!prefersReducedMotion) {
        const rawProgress = scrollProgressRef.current;
        const progress = Number.isFinite(rawProgress) ? rawProgress : 0;
        const p = Math.max(0, Math.min(1, progress));

        const targetCamPos = new THREE.Vector3();
        const targetLookAt = new THREE.Vector3().copy(focalCenter);

        let stageName = 'Stage A: Establishing Shot (0-15%)';
        let angleDeg = 0.0;

        if (p <= 0.15) {
          // STAGE A — ESTABLISHING SHOT (0% - 15%)
          // Wide framing of Turtle Tower at sunrise with willow boughs
          stageName = 'Stage A: Establishing Shot (0-15%)';
          angleDeg = 0.0;

          const tA = p / 0.15;
          const startZ = isMobile ? 29.0 : 25.0;
          const endZ = orbitRadius;
          const curZ = startZ + (endZ - startZ) * tA;
          const curY = 8.2 + (7.5 - 8.2) * tA;
          targetCamPos.set(0.0, curY, curZ);
          targetLookAt.set(0.0, 4.8 + (4.6 - 4.8) * tA, 0.0);

          // Willow foliage fully visible
          if (willowMaterialRef.current) {
            willowMaterialRef.current.opacity = 1.0;
          }
        } else if (p <= 0.85) {
          // STAGE B — FULL CINEMATIC ORBIT 360° (15% - 85%)
          // Completes exactly one 360° orbit in 3D world space (0° -> 360°)
          const u = (p - 0.15) / 0.70; // 0.0 to 1.0
          const angle = u * Math.PI * 2; // 0 to 2*PI radians
          angleDeg = u * 360.0;

          stageName = `Stage B: 360° Orbit (${angleDeg.toFixed(1)}°)`;

          // Subtle harmonic height modulation (rises gently over east sunrise side)
          const heightMod = Math.sin(angle) * 0.8;
          const curY = 7.5 + heightMod;

          // Orbit position: angle=0 is South (+Z), angle=PI/2 is East (+X), angle=PI is North (-Z), angle=3PI/2 is West (-X)
          const curX = Math.sin(angle) * orbitRadius;
          const curZ = Math.cos(angle) * orbitRadius;

          targetCamPos.set(curX, curY, curZ);
          targetLookAt.copy(focalCenter);

          // Willow gently fades out during orbit so it does not obstruct opposite views
          if (willowMaterialRef.current) {
            const fadeT = Math.min(1, (p - 0.15) / 0.08);
            willowMaterialRef.current.opacity = Math.max(0, 1 - fadeT);
          }
        } else if (p <= 0.92) {
          // STAGE C — ORBIT COMPLETION & STEADY FRAMING (85% - 92%)
          // Returned exactly to 360°/0° azimuth. Settles smoothly into lakeside composition.
          stageName = 'Stage C: Orbit Completed (360.0°)';
          angleDeg = 360.0;

          const tC = (p - 0.85) / 0.07;
          const curY = 7.5 + (6.2 - 7.5) * tC;
          const curZ = orbitRadius + (19.0 - orbitRadius) * tC;
          targetCamPos.set(0.0, curY, curZ);

          const lookY = 4.6 + (3.8 - 4.6) * tC;
          const lookZ = 0.0 + (-12.0 - 0.0) * tC;
          targetLookAt.set(0.0, lookY, lookZ);

          if (willowMaterialRef.current) {
            willowMaterialRef.current.opacity = 0;
          }
        } else {
          // STAGE D — OLD QUARTER TRANSITION (92% - 100%)
          // Camera glides smoothly forward towards lakeside shoreline
          stageName = 'Stage D: Transition to Old Quarter';
          angleDeg = 360.0;

          const tD = (p - 0.92) / 0.08;
          const curY = 6.2 + (5.0 - 6.2) * tD;
          const curZ = 19.0 + (16.5 - 19.0) * tD;
          targetCamPos.set(0.0, curY, curZ);

          const lookY = 3.8 + (3.5 - 3.8) * tD;
          const lookZ = -12.0 + (-16.0 - (-12.0)) * tD;
          targetLookAt.set(0.0, lookY, lookZ);
        }

        // Smooth damping for cinematic camera glide
        currentCamPos.lerp(targetCamPos, 0.08);
        currentTarget.lerp(targetLookAt, 0.08);

        camera.position.copy(currentCamPos);
        camera.lookAt(currentTarget);

        // Update dev inspection HUD state
        setHudData({
          stage: stageName,
          pct: Math.round(p * 100),
          angleDeg: `${angleDeg.toFixed(1)}°`,
          camX: currentCamPos.x.toFixed(2),
          camY: currentCamPos.y.toFixed(2),
          camZ: currentCamPos.z.toFixed(2),
        });
      }

      if (renderer && scene && camera) {
        try {
          renderer.render(scene, camera);
        } catch (renderErr) {
          console.warn('[HanoiAwakeningHero] Render error:', renderErr);
        }
      }
    };

    animate();

    // IntersectionObserver to pause WebGL loop when scrolled out of view (>150px)
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
    // 8. GSAP SCROLLTRIGGER (Pinning & Synchronized Scrubbing)
    // =========================================================================
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = Number.isFinite(self.progress) ? self.progress : 0;
          scrollProgressRef.current = progress;

          // [0% -> 15%]: Editorial typography dissolves and floats up
          if (contentWrapperRef.current) {
            const textOpacity = Math.max(0, 1 - progress * 6.5);
            const textY = -progress * 160;
            gsap.set(contentWrapperRef.current, {
              opacity: textOpacity,
              y: textY,
            });
          }

          if (scrollCueRef.current) {
            const cueOpacity = Math.max(0, 0.85 - progress * 10);
            gsap.set(scrollCueRef.current, { opacity: cueOpacity });
          }

          // [90% -> 100%]: Subtle warm sunrise mist for seamless match cut into Old Quarter
          if (transitionFogRef.current) {
            if (progress > 0.90) {
              const fogT = (progress - 0.90) / 0.10;
              gsap.set(transitionFogRef.current, { opacity: Math.min(0.20, fogT * 0.20) });
            } else {
              gsap.set(transitionFogRef.current, { opacity: 0 });
            }
          }
        },
      });

      // Initial Entrance Animation
      const introTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      const textNodes = [
        kickerRef.current,
        headlineRef.current,
        subtitleRef.current,
        ctaGroupRef.current,
        statsRef.current,
      ].filter(Boolean);

      if (canvasRef.current) {
        introTl.fromTo(
          canvasRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 2.0, ease: 'power2.inOut' },
          0
        );
      }

      if (textNodes.length > 0) {
        introTl.fromTo(
          textNodes,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out' },
          1.2
        );
      }

      if (scrollCueRef.current) {
        introTl.fromTo(
          scrollCueRef.current,
          { opacity: 0 },
          { opacity: 0.85, duration: 1.0 },
          2.4
        );
      }
    }, container);

    // =========================================================================
    // 9. RESIZE LISTENER
    // =========================================================================
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || window.innerWidth || 1;
      const h = container.clientHeight || window.innerHeight || 1;
      cameraRef.current.aspect = w / h;
      cameraRef.current.fov = w < 768 ? 52 : 46;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // =========================================================================
    // 10. CLEANUP (Strict Zero-Leak Lifecycle)
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
      waterMeshRef.current = null;
      willowGroupRef.current = null;
      willowMaterialRef.current = null;
    };
  }, []);

  const handleScrollToNext = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const lenis = getLenis();
    const nextSection = document.getElementById('scene-old-quarter');
    if (lenis && nextSection) {
      lenis.scrollTo(nextSection, { offset: 0, duration: 1.4 });
    } else if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="hanoi-awakening-hero" id="hanoi-hero">
      {/* Real-Time Three.js WebGL Canvas */}
      <canvas ref={canvasRef} className="hanoi-hero-canvas" />

      {/* Fallback Background & Preload HUD */}
      {!is3DReady && (
        <div className="hanoi-hero-loading-overlay">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/assets/destinations/hanoi/hoan_kiem_dawn_mobile.webp"
              type="image/webp"
            />
            <img
              src="/assets/destinations/hanoi/hoan_kiem_dawn_desktop.webp"
              alt="Hoan Kiem Lake Dawn"
              className="hanoi-hero-static-fallback"
            />
          </picture>
          <div className="hanoi-hero-loader-hud">
            <span className="loader-hud-spinner" />
            <span className="loader-hud-text">
              {isKorean ? '하노이 360° 시네마틱 공간을 준비하는 중...' : 'Đang khởi tạo không gian 360° Hồ Gươm...'}
            </span>
            <span className="loader-hud-pct">{loadProgress}%</span>
          </div>
        </div>
      )}

      {/* Atmospheric Vignette & Contrast Scrim */}
      <div className="hanoi-hero-vignette" aria-hidden="true" />
      <div className="hanoi-hero-scrim" aria-hidden="true" />

      {/* Seamless Golden Morning Mist Transition into Old Quarter */}
      <div ref={transitionFogRef} className="hanoi-hero-transition-fog" aria-hidden="true" />

      {/* Telemetry HUD (Shows 360° orbit angle & coordinates during scroll) */}
      <div className="hanoi-orbit-telemetry-hud" role="region" aria-label="360 Orbit Telemetry">
        <div className="hud-orbit-badge">
          <Sparkles size={11} />
          <span>CINEMATIC 360° ORBIT</span>
        </div>
        <div className="hud-orbit-row">
          <span className="hud-stage-name">{hudData.stage}</span>
          <span className="hud-angle-val">{hudData.angleDeg}</span>
        </div>
        <div className="hud-coords-row">
          <span>Scroll: {hudData.pct}% | Pos: ({hudData.camX}, {hudData.camY}, {hudData.camZ})</span>
        </div>
      </div>

      {/* Preserved Editorial Typography & Interactive CTA */}
      <div ref={contentWrapperRef} className="hanoi-hero-content-wrapper">
        <div className="hanoi-hero-header">
          {/* Top Kicker Badge */}
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

          {/* Main Title */}
          <h1 ref={headlineRef} className="hanoi-hero-title">
            <span className="hanoi-title-en">HANOI</span>
            <span className="hanoi-title-divider" aria-hidden="true">—</span>
            <span className="hanoi-title-sub">A LIVING MEMORY</span>
          </h1>

          {/* Editorial Tagline */}
          <p ref={subtitleRef} className="hanoi-hero-tagline">
            “{tagline}”
          </p>

          {/* Interactive CTA Row */}
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
      <div
        ref={scrollCueRef}
        className="hanoi-hero-scroll-cue"
        onClick={handleScrollToNext}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleScrollToNext();
          }
        }}
      >
        <span className="scroll-cue-text">
          {isKorean ? '아래로 스크롤하여 360° 탑을 감상하고 시간의 거리를 걷기' : 'Cuộn xuống để chiêm ngưỡng 360° Tháp Rùa và dạo bước phố cổ'}
        </span>
        <div className="scroll-cue-icon-wrap">
          <ChevronDown size={18} className="scroll-arrow-anim" />
        </div>
      </div>
    </section>
  );
};

export default HanoiAwakeningHero;
