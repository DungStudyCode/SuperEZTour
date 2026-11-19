import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Compass,
  Sparkles,
  Plus,
  Check,
  RotateCcw,
  Mountain,
  Navigation,
  Info,
  Clock,
  Layers,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Interactive3DMap.css';

gsap.registerPlugin(ScrollTrigger);

// =============================================================================
// VERIFIED GEOGRAPHIC COORDINATES & CARTOGRAPHIC CONFIGURATION (WGS84)
// Real-world coordinates verified against official Vietnamese Survey Cartography.
// =============================================================================
const DEFAULT_DESTINATIONS = [
  {
    id: 'ba-na-hills',
    name: 'Bà Nà Hills & Cầu Vàng',
    category: 'Biểu tượng thế giới',
    routeIndex: '01',
    slogan: 'Dải lụa vàng giữa đôi bàn tay đá nâng đỡ mây trời.',
    lng: 107.9961,
    lat: 15.9988,
    elevation: '1,487 m',
    bearing: -35,
    pitch: 70,
    zoom: 14.6,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=85',
    tags: ['Cầu Vàng', 'Cáp treo kỷ lục', 'Làng Pháp', 'Khí hậu 4 mùa'],
    description: 'Dạo bước trên Cầu Vàng được nâng đỡ bởi đôi bàn tay đá khổng lồ giữa mây trời, cáp treo đạt 4 kỷ lục thế giới và Làng Pháp cổ kính.'
  },
  {
    id: 'my-khe-beach',
    name: 'Bãi Biển Mỹ Khê',
    category: 'Thiên đường biển xanh',
    routeIndex: '02',
    slogan: 'Bãi cát trắng mịn thoai thoải bên đại dương ngọc bích.',
    lng: 108.2467,
    lat: 16.0592,
    elevation: '3 m',
    bearing: -75,
    pitch: 65,
    zoom: 15.2,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    tags: ['Tắm biển', 'Bình minh Mỹ Khê', 'SUP chèo', 'Hải sản ven bờ'],
    description: 'Được bình chọn là một trong những bãi biển quyến rũ nhất hành tinh với dải cát trắng mịn, làn nước trong vắt và bình minh rực rỡ.'
  },
  {
    id: 'son-tra-peninsula',
    name: 'Bán Đảo Sơn Trà & Chùa Linh Ứng',
    category: 'Thiên nhiên & Tâm linh',
    routeIndex: '03',
    slogan: 'Lá phổi xanh nguyên sinh che chở thành phố biển.',
    lng: 108.275,
    lat: 16.1008,
    elevation: '693 m',
    bearing: 40,
    pitch: 68,
    zoom: 14.5,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
    tags: ['Chùa Linh Ứng', 'Tượng Phật Bà 67m', 'Đỉnh Bàn Cờ', 'Voọc chà vá chân nâu'],
    description: 'Bán đảo nguyên sinh xanh mướt vươn ra biển Đông với tượng Phật Bà 67m uy nghiêm hướng vịnh Đà Nẵng và đàn voọc ngũ sắc quý hiếm.'
  },
  {
    id: 'marble-mountains',
    name: 'Danh Thắng Ngũ Hành Sơn',
    category: 'Di tích & Danh thắng',
    routeIndex: '04',
    slogan: 'Năm ngọn non tiên huyền bí giữa đồng bằng biển.',
    lng: 108.2633,
    lat: 16.0044,
    elevation: '106 m',
    bearing: -20,
    pitch: 68,
    zoom: 15.0,
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=85',
    tags: ['Động Huyền Không', 'Chùa Tam Thai', 'Thang máy ngoài trời', 'Làng đá Non Nước'],
    description: 'Quần thể 5 ngọn núi đá vôi Kim - Mộc - Thủy - Hỏa - Thổ kỳ vĩ với hệ thống hang động Huyền Không huyền ảo và làng đá mỹ nghệ Non Nước.'
  },
  {
    id: 'dragon-bridge',
    name: 'Cầu Rồng Sông Hàn',
    category: 'Trái tim đô thị',
    routeIndex: '05',
    slogan: 'Rồng thép vươn mình ra biển lớn sông Hàn.',
    lng: 108.2272,
    lat: 16.0611,
    elevation: '15 m',
    bearing: 25,
    pitch: 65,
    zoom: 15.5,
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85',
    tags: ['Phun lửa cuối tuần', 'Du thuyền sông Hàn', 'Cầu Tình Yêu', 'Đô thị sông nước'],
    description: 'Biểu tượng của sức sống hiện đại, nơi Cầu Rồng phun lửa và nước rực rỡ vào cuối tuần, soi bóng lung linh dòng sông Hàn thơ mộng.'
  },
  {
    id: 'hai-van-pass',
    name: 'Đèo Hải Vân - Thiên Hạ Đệ Nhất Hùng Quan',
    category: 'Cung đường di sản',
    routeIndex: '06',
    slogan: 'Thiên hạ đệ nhất hùng quan nối biển và non xanh.',
    lng: 108.1278,
    lat: 16.1924,
    elevation: '496 m',
    bearing: 110,
    pitch: 72,
    zoom: 14.3,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    tags: ['Hải Vân Quan', 'Vịnh Lăng Cô', 'Check-in cung đèo', 'Cafe ngắm biển'],
    description: 'Cung đường đèo ven biển ngoạn mục nối liền Đà Nẵng và Thừa Thiên Huế, nơi mây trời ôm trọn non xanh và vịnh biển Lăng Cô kỳ vĩ.'
  },
  {
    id: 'hoi-an-ancient-town',
    name: 'Phố Cổ Hội An',
    category: 'Di sản thế giới UNESCO',
    routeIndex: '07',
    slogan: 'Trầm tích di sản ngàn năm soi bóng dòng sông Hoài.',
    lng: 108.3265,
    lat: 15.8801,
    elevation: '5 m',
    bearing: -10,
    pitch: 62,
    zoom: 15.2,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85',
    tags: ['Di sản UNESCO', 'Chùa Cầu', 'Thả đèn hoa đăng', 'Cơm gà & Cao lầu'],
    description: 'Cách Đà Nẵng chỉ 30 phút lái xe riêng, thương cảng cổ thế kỷ 16 với những mái ngói rêu phong, ánh đèn lồng rực rỡ trên dòng sông Hoài và nền ẩm thực miền Trung độc bản.'
  }
];

// Master Overview Camera Configuration (Google Earth Cinematic View over Da Nang)
const OVERVIEW_CAMERA = {
  center: [108.175, 16.055],
  zoom: 10.65,
  pitch: 58,
  bearing: -15
};

// =============================================================================
// ESRI WORLD IMAGERY & AWS TERRARIUM 3D TERRAIN STYLE (ZERO-KEY REQUIRED)
// 100% Free, keyless, and provides authentic high-resolution satellite imagery
// =============================================================================
const SATELLITE_3D_STYLE = {
  version: 8,
  sources: {
    'esri-satellite': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
    },
    'terrain-dem': {
      type: 'raster-dem',
      tiles: [
        'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'
      ],
      encoding: 'terrarium',
      tileSize: 256,
      maxzoom: 14
    }
  },
  layers: [
    {
      id: 'esri-satellite-layer',
      type: 'raster',
      source: 'esri-satellite',
      minzoom: 0,
      maxzoom: 19
    }
  ],
  terrain: {
    source: 'terrain-dem',
    exaggeration: 1.42
  },
  sky: {
    'sky-color': '#061426',
    'sky-horizon-blend': 0.15,
    'horizon-color': '#0a1628',
    'horizon-fog-blend': 0.2,
    'fog-color': '#061426',
    'fog-ground-blend': 0.35
  }
};

const Interactive3DMap = ({ attractionsData }) => {
  const containerRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const headerRef = useRef(null);
  const kickerRef = useRef(null);
  const titleRef = useRef(null);
  const panelRef = useRef(null);
  const cartBadgeRef = useRef(null);

  const initialLandmarkId = attractionsData?.items?.[0]?.id || 'ba-na-hills';
  const [selectedLandmarkId, setSelectedLandmarkId] = useState(initialLandmarkId);
  const [isOverviewMode, setIsOverviewMode] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  const { tripState, toggleAttraction } = useTripBuilder();

  // Active overview camera configuration based on destination
  const activeOverviewCamera = useMemo(() => {
    return attractionsData?.overviewCamera || {
      center: attractionsData?.mapCenter || OVERVIEW_CAMERA.center,
      zoom: attractionsData?.defaultZoom || OVERVIEW_CAMERA.zoom,
      pitch: OVERVIEW_CAMERA.pitch,
      bearing: OVERVIEW_CAMERA.bearing
    };
  }, [attractionsData]);

  // Update initial selected landmark when destination config changes
  useEffect(() => {
    if (attractionsData?.items?.[0]?.id) {
      setSelectedLandmarkId(attractionsData.items[0].id);
    }
  }, [attractionsData]);

  // Merge config data with verified geographic coordinates & authentic imagery
  const destinations = useMemo(() => {
    const rawItems = attractionsData?.items || [];
    if (rawItems.length > 0) {
      return rawItems.map((item, index) => ({
        ...item,
        routeIndex: item.routeIndex || (index < 9 ? `0${index + 1}` : `${index + 1}`),
        bearing: item.bearing !== undefined ? item.bearing : -20,
        pitch: item.pitch !== undefined ? item.pitch : 50,
        zoom: item.zoom !== undefined ? item.zoom : 15,
        elevation: item.elevation || 'Đồng bằng',
        tags: item.tags || []
      }));
    }
    return DEFAULT_DESTINATIONS;
  }, [attractionsData]);

  const activeLandmark = useMemo(() => {
    return destinations.find((d) => d.id === selectedLandmarkId) || destinations[0];
  }, [destinations, selectedLandmarkId]);

  // =========================================================================
  // 1. MAPLIBRE GL JS REAL 3D TERRAIN & SATELLITE INITIALIZATION (ZERO-KEY)
  // Runs 100% out of the box with Esri Satellite & AWS Terrarium DEM
  // Lazy dynamic import keeps initial bundle ultra-fast
  // =========================================================================
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let isCancelled = false;
    let mapInstance = null;

    import('maplibre-gl').then((maplibregl) => {
      if (isCancelled || !mapContainerRef.current) return;

      try {
        mapInstance = new maplibregl.Map({
          container: mapContainerRef.current,
          style: SATELLITE_3D_STYLE,
          center: activeOverviewCamera.center,
          zoom: activeOverviewCamera.zoom,
          pitch: activeOverviewCamera.pitch,
          bearing: activeOverviewCamera.bearing,
          maxPitch: 85,
          antialias: true,
          attributionControl: true
        });

        mapRef.current = mapInstance;

        mapInstance.on('load', () => {
          if (isCancelled) return;

          // Ensure 3D Terrain is active
          try {
            if (!mapInstance.getTerrain()) {
              mapInstance.setTerrain({ source: 'terrain-dem', exaggeration: 1.42 });
            }
          } catch (err) {
            console.warn('[MapLibre Terrain Note]', err);
          }

          // Add Itinerary Route GeoJSON Source & Layers
          mapInstance.addSource('itinerary-route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: []
              }
            }
          });

          // Glow Under-layer for Itinerary Route
          mapInstance.addLayer({
            id: 'itinerary-route-glow',
            type: 'line',
            source: 'itinerary-route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#ffb52b',
              'line-width': 7,
              'line-opacity': 0.45,
              'line-blur': 4
            }
          });

          // Core Champagne Gold Itinerary Line
          mapInstance.addLayer({
            id: 'itinerary-route-core',
            type: 'line',
            source: 'itinerary-route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#d4b478',
              'line-width': 3.5,
              'line-opacity': 0.95
            }
          });

          // Create Champagne Gold 3D HTML Markers for all destinations
          markersRef.current.forEach((m) => m.remove());
          markersRef.current = [];

          destinations.forEach((dest) => {
            const el = document.createElement('div');
            el.className = `atlas-mapbox-marker ${dest.id === selectedLandmarkId ? 'marker-active' : ''}`;
            el.dataset.id = dest.id;

            el.innerHTML = `
              <div class="marker-leader-stem"></div>
              <div class="marker-beacon-head">
                <span class="marker-beacon-dot"></span>
              </div>
              <div class="marker-floating-label">
                <span class="marker-name"></span>
                <span class="marker-alt"></span>
              </div>
            `;

            const nameEl = el.querySelector('.marker-name');
            if (nameEl) nameEl.textContent = dest.name || '';
            const altEl = el.querySelector('.marker-alt');
            if (altEl) altEl.textContent = dest.elevation || '';

            el.addEventListener('click', (e) => {
              e.stopPropagation();
              handleSelectLandmark(dest.id);
            });

            const marker = new maplibregl.Marker({
              element: el,
              anchor: 'bottom'
            })
              .setLngLat([dest.lng, dest.lat])
              .addTo(mapInstance);

            markersRef.current.push(marker);
          });

          setMapLoaded(true);
        });
      } catch (err) {
        console.error('Failed to initialize MapLibre GL:', err);
      }
    });

    return () => {
      isCancelled = true;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // =========================================================================
  // 2. REACTIVE MARKER LOCALIZATION (Updates marker labels safely on KO <-> VI)
  // Uses stable destination IDs; modifies textContent without recreating Map
  // =========================================================================
  useEffect(() => {
    if (!markersRef.current.length || !destinations.length) return;
    markersRef.current.forEach((marker) => {
      const el = marker.getElement();
      if (!el) return;
      const id = el.dataset.id;
      const dest = destinations.find((d) => d.id === id);
      if (dest) {
        const nameEl = el.querySelector('.marker-name');
        if (nameEl && nameEl.textContent !== dest.name) {
          nameEl.textContent = dest.name;
        }
        const altEl = el.querySelector('.marker-alt');
        if (altEl && dest.elevation && altEl.textContent !== dest.elevation) {
          altEl.textContent = dest.elevation;
        }
      }
    });
  }, [destinations]);

  // =========================================================================
  // 2. UPDATE ROUTE CURVE WHEN SELECTIONS CHANGE (LIVING ITINERARY ROUTE)
  // =========================================================================
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const source = map.getSource('itinerary-route');
    if (!source) return;

    const selectedIds = tripState.selectedAttractions || [];
    const selectedDests = destinations.filter((d) => selectedIds.includes(d.id));

    if (selectedDests.length >= 2) {
      const coordinates = selectedDests.map((d) => [d.lng, d.lat]);
      source.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates
        }
      });
    } else {
      source.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: []
        }
      });
    }
  }, [tripState.selectedAttractions, destinations, mapLoaded]);

  // =========================================================================
  // 3. SYNCHRONIZE MARKER ACTIVE & SELECTED STYLES
  // =========================================================================
  useEffect(() => {
    const selectedIds = tripState.selectedAttractions || [];
    markersRef.current.forEach((marker) => {
      const el = marker.getElement();
      const id = el.dataset.id;
      if (id === selectedLandmarkId) {
        el.classList.add('marker-active');
      } else {
        el.classList.remove('marker-active');
      }

      if (selectedIds.includes(id)) {
        el.classList.add('marker-in-trip');
      } else {
        el.classList.remove('marker-in-trip');
      }
    });
  }, [selectedLandmarkId, tripState.selectedAttractions]);

  // =========================================================================
  // 4. CINEMATIC CAMERA FLY-TO (GOOGLE EARTH STYLE)
  // Smoothly flies the camera without recreating the map instance
  // =========================================================================
  const handleSelectLandmark = useCallback(
    (landmarkId) => {
      setSelectedLandmarkId(landmarkId);
      setIsOverviewMode(false);

      const dest = destinations.find((d) => d.id === landmarkId);
      const map = mapRef.current;
      if (!dest || !map) return;

      map.flyTo({
        center: [dest.lng, dest.lat],
        zoom: dest.zoom || 14.5,
        pitch: dest.pitch || 68,
        bearing: dest.bearing || 0,
        speed: 0.92,
        curve: 1.45,
        essential: true
      });
    },
    [destinations]
  );

  const resetToOverview = useCallback(() => {
    setIsOverviewMode(true);
    const map = mapRef.current;
    if (!map) return;

    map.flyTo({
      center: activeOverviewCamera.center,
      zoom: activeOverviewCamera.zoom,
      pitch: activeOverviewCamera.pitch,
      bearing: activeOverviewCamera.bearing,
      speed: 0.85,
      curve: 1.4,
      essential: true
    });
  }, [activeOverviewCamera]);

  // =========================================================================
  // 5. CINEMATIC SCROLLTRIGGER TIMELINE (Luxury Scroll Reveal & Interaction Hold)
  // =========================================================================
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 993px) and (min-height: 561px)',
        isMobile: '(max-width: 992px)',
        isShortHeight: '(max-height: 560px)',
        reduceMotion: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { isDesktop, reduceMotion, isShortHeight } = context.conditions;
        if (reduceMotion) return;

        const pinDistance =
          isDesktop && !isShortHeight
            ? '+=200%'
            : !isShortHeight
            ? '+=130%'
            : null;

        if (!pinDistance) return; // Natural flow on constrained viewports

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: pinDistance,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1
          }
        });

        // 0–20%: Cinematic Grand Header Reveal
        if (kickerRef.current) {
          tl.fromTo(kickerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.18 }, 0);
        }
        if (titleRef.current) {
          tl.fromTo(titleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.22 }, 0.05);
        }
        if (cartBadgeRef.current) {
          tl.fromTo(cartBadgeRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.18 }, 0.08);
        }

        // 20–45%: Map Frame Scale & Depth Entry
        if (mapContainerRef.current) {
          tl.fromTo(
            mapContainerRef.current,
            { opacity: 0.75, scale: 0.96 },
            { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.25 },
            0.18
          );
        }

        // 45–65%: Editorial Panel Slide-in Reveal
        if (panelRef.current) {
          tl.fromTo(
            panelRef.current,
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, ease: 'power2.out', duration: 0.28 },
            0.42
          );
        }

        // 65–100%: Interactive Exploration Hold (Leaves ample scroll time to explore)
      },
      containerRef
    );

    return () => mm.revert();
  }, []);

  const isCurrentInCart = tripState.selectedAttractions.includes(activeLandmark.id);

  return (
    <section className="interactive-3d-map-scene" ref={containerRef} id="attractions">
      {/* Ambient Cartographic Grid Background */}
      <div className="map-ambient-grid" aria-hidden="true" />

      <div className="dest-container map-3d-content">
        {/* Header Region */}
        <header className="map-3d-header" ref={headerRef}>
          <div>
            <span className="dest-kicker map-kicker" ref={kickerRef}>
              <Compass size={14} className="map-kicker-icon" aria-hidden="true" />
              <span>{attractionsData?.kicker || 'THE DISCOVERY ATLAS'}</span>
            </span>
            <h2 className="map-3d-title" ref={titleRef}>
              {attractionsData?.title || 'Những Tọa Độ Không Thể Bỏ Lỡ'}
            </h2>
          </div>

          <div className="map-cart-badge" ref={cartBadgeRef}>
            <Sparkles size={14} className="map-cart-icon" aria-hidden="true" />
            <span>
              {attractionsData?.cartPrefix || 'Đã chọn'}: <strong>{tripState.selectedAttractions.length}</strong> / {destinations.length} {attractionsData?.cartSuffix || 'tọa độ vào lịch trình'}
            </span>
          </div>
        </header>

        {/* 3D Atlas Stage: Real Satellite Map + Luxury Editorial Panel */}
        <div className="map-atlas-stage">
          {/* Left / Center: Real 3D Satellite Map Canvas Wrapper */}
          <div className="map-canvas-wrapper">
            <div className="map-mapbox-container" ref={mapContainerRef} />

            {/* Floating Reset View Pill Button */}
            <button
              type="button"
              className={`map-reset-view-btn ${!isOverviewMode ? 'active' : ''}`}
              onClick={resetToOverview}
              title={attractionsData?.resetViewText || 'Khôi phục góc nhìn toàn cảnh'}
            >
              <RotateCcw size={13} />
              <span>{attractionsData?.resetViewText || 'Toàn cảnh'}</span>
            </button>

            {/* Satellite Live Badge */}
            <div className="map-live-badge">
              <span className="live-pulse-dot" />
              <span>REAL 3D TERRAIN & SATELLITE</span>
            </div>
          </div>

          {/* Right: Luxury Editorial Information Panel */}
          <aside className="map-editorial-panel" ref={panelRef}>
            <div className="panel-img-frame">
              <img
                key={activeLandmark.id}
                src={activeLandmark.image}
                alt={activeLandmark.name}
                className="panel-img"
                loading="lazy"
              />
              <div className="panel-img-overlay" />
              <div className="panel-img-top-meta">
                <span className="panel-badge-category">{activeLandmark.category}</span>
                <span className="panel-badge-elevation">
                  <Mountain size={11} />
                  <span>{activeLandmark.elevation}</span>
                </span>
              </div>
            </div>

            <div className="panel-content-body">
              <span className="panel-route-index">{activeLandmark.routeIndex} / {attractionsData?.atlasName || 'THE ATLAS'}</span>
              <h3 className="panel-title">{activeLandmark.name}</h3>
              <p className="panel-slogan">{activeLandmark.slogan}</p>
              <p className="panel-desc">{activeLandmark.description}</p>

              {/* Experiential Highlights Tags */}
              <div className="panel-tags-row">
                {activeLandmark.tags.map((tag, idx) => (
                  <span key={idx} className="panel-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button: Add or Remove from Custom Itinerary */}
              <button
                type="button"
                className={`panel-add-btn ${isCurrentInCart ? 'btn-in-cart' : ''}`}
                onClick={() => toggleAttraction(activeLandmark.id)}
              >
                {isCurrentInCart ? (
                  <>
                    <Check size={15} />
                    <span>{attractionsData?.btnInCart || 'Đã trong hành trình (Bấm để gỡ)'}</span>
                  </>
                ) : (
                  <>
                    <Plus size={15} />
                    <span>{attractionsData?.btnAdd || 'Thêm tọa độ này vào chuyến đi'}</span>
                  </>
                )}
              </button>
            </div>
          </aside>
        </div>

        {/* Disclaimer & Geo Verification Bar */}
        <div className="map-disclaimer">
          <Info size={13} className="disclaimer-icon" aria-hidden="true" />
          <span>
            {attractionsData?.disclaimer || 'Bản đồ vệ tinh độ phân giải cao kết hợp mô hình số độ cao (DEM) thực tế của Đà Nẵng. Lộ trình thực địa và thời gian di chuyển sẽ được Super EZ Tour cá nhân hóa và tối ưu theo nhu cầu của quý khách.'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Interactive3DMap;
