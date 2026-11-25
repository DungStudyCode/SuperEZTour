import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Compass,
  Sparkles,
  RotateCcw,
  Info,
  AlertTriangle,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import { useLanguage } from '../../../../context/LanguageContext';
import AttractionFilters from './components/AttractionFilters';
import AttractionDetailPanel from './components/AttractionDetailPanel';
import DiscoveryProgress from './components/DiscoveryProgress';
import { useAtlasScrollDiscovery } from './hooks/useAtlasScrollDiscovery';
import { incrementAtlasCounter } from './utils/atlasRuntimeDiagnostics';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Interactive3DMap.css';

gsap.registerPlugin(ScrollTrigger);

// =============================================================================
// LEGACY DEFAULT CONFIGURATION (Preserved 1:1 for Da Nang & unconfigured routes)
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

const OVERVIEW_CAMERA = {
  center: [108.175, 16.055],
  zoom: 10.65,
  pitch: 58,
  bearing: -15
};

function haversineKm(aLng, aLat, bLng, bLat) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const lat1 = toRad(aLat);
  const lat2 = toRad(bLat);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function buildMapStyle({ terrainEnabled, terrainExaggeration, isTravelAtlas = false }) {
  const sources = {
    'esri-satellite': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution:
        'Tiles &copy; Esri, Maxar, Earthstar Geographics, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
    }
  };

  if (terrainEnabled) {
    sources['terrain-dem'] = {
      type: 'raster-dem',
      tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
      encoding: 'terrarium',
      tileSize: 256,
      maxzoom: 14,
      attribution: 'Elevation &copy; Mapzen / Tilezen AWS Open Data'
    };
  }

  const style = {
    version: 8,
    sources,
    layers: [
      {
        id: 'esri-satellite-layer',
        type: 'raster',
        source: 'esri-satellite',
        minzoom: 0,
        maxzoom: 19,
        ...(isTravelAtlas
          ? {
              paint: {
                'raster-saturation': -0.18,
                'raster-contrast': 0.06,
                'raster-brightness-max': 0.94
              }
            }
          : {})
      }
    ]
  };

  if (terrainEnabled) {
    style.terrain = {
      source: 'terrain-dem',
      exaggeration: terrainExaggeration
    };
    style.sky = {
      'sky-color': '#061426',
      'sky-horizon-blend': 0.15,
      'horizon-color': '#0a1628',
      'horizon-fog-blend': 0.2,
      'fog-color': '#061426',
      'fog-ground-blend': 0.35
    };
  }

  return style;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function getAtlasCooperativeLocale(isKorean) {
  if (isKorean) {
    return {
      'CooperativeGesturesHandler.WindowsHelpText':
        'Ctrl 키를 누른 상태에서 스크롤하여 지도를 확대하거나 축소하세요.',
      'CooperativeGesturesHandler.MacHelpText':
        '⌘ 키를 누른 상태에서 스크롤하여 지도를 확대하거나 축소하세요.',
      'CooperativeGesturesHandler.MobileHelpText': '두 손가락으로 지도를 이동하세요.'
    };
  }
  return {
    'CooperativeGesturesHandler.WindowsHelpText': 'Giữ Ctrl và cuộn để thu phóng bản đồ.',
    'CooperativeGesturesHandler.MacHelpText': 'Giữ ⌘ và cuộn để thu phóng bản đồ.',
    'CooperativeGesturesHandler.MobileHelpText': 'Dùng hai ngón tay để di chuyển bản đồ.'
  };
}

const Interactive3DMap = ({ attractionsData }) => {
  const containerRef = useRef(null);
  const pinTargetRef = useRef(null);
  const measureTargetRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const navControlRef = useRef(null);

  const isUserInteractingRef = useRef(false);
  const isProgrammaticFlightRef = useRef(false);
  const cameraRequestIdRef = useRef(0);
  const pendingCameraRafRef = useRef(null);
  const lastCameraTargetIdRef = useRef('__overview__');
  const lastMapSizeRef = useRef({ width: 0, height: 0 });
  const pendingResizeRafRef = useRef(null);

  const headerRef = useRef(null);
  const kickerRef = useRef(null);
  const titleRef = useRef(null);
  const panelRef = useRef(null);
  const cartBadgeRef = useRef(null);

  const { isKorean } = useLanguage();
  const { tripState, toggleAttraction } = useTripBuilder();

  // Configuration-driven flags (100% backward-compatible defaults for Da Nang)
  const layoutVariant = attractionsData?.presentation?.layoutVariant || 'legacy-3d';
  const isTravelAtlas = layoutVariant === 'travel-atlas';
  const scrollExperienceConfig = attractionsData?.presentation?.scrollExperience || {};
  const scrollExperienceEnabled = Boolean(isTravelAtlas && scrollExperienceConfig.enabled);
  const features = attractionsData?.features || {};

  const pinSection = features.pinSection !== undefined ? features.pinSection : true;
  const showElevation = features.showElevation !== undefined ? features.showElevation : true;
  const showLiveBadge = features.showLiveBadge !== undefined ? features.showLiveBadge : true;
  const showAmbientGrid = features.showAmbientGrid !== undefined ? features.showAmbientGrid : true;
  const showFilters = Boolean(features.showFilters && attractionsData?.categories?.length);
  const showPreviousNext = Boolean(features.showPreviousNext);
  const showSelectionSummary = Boolean(features.showSelectionSummary);
  const showDuration = Boolean(features.showDuration);
  const showPhotoAttribution = Boolean(features.showPhotoAttribution);
  const markerVariant = features.markerVariant || 'legacy';
  const useLazyInit = Boolean(features.lazyInit);
  const useCooperativeGestures = Boolean(features.cooperativeGestures);

  const terrainEnabled = attractionsData?.terrain?.enabled !== false;
  const terrainExaggeration = attractionsData?.terrain?.exaggeration ?? 1.42;

  const initialLandmarkId = attractionsData?.items?.[0]?.id || 'ba-na-hills';
  const [selectedLandmarkId, setSelectedLandmarkId] = useState(initialLandmarkId);
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [isOverviewMode, setIsOverviewMode] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [retryToken, setRetryToken] = useState(0);
  const [shouldInitMap, setShouldInitMap] = useState(!useLazyInit);
  const [showAllSelectedChips, setShowAllSelectedChips] = useState(false);
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const arrivalTimerRef = useRef(null);
  const prevActiveMarkerIdRef = useRef(initialLandmarkId);

  // Active overview camera configuration based on destination
  const activeOverviewCamera = useMemo(() => {
    return (
      attractionsData?.overviewCamera || {
        center: attractionsData?.mapCenter || OVERVIEW_CAMERA.center,
        zoom: attractionsData?.defaultZoom || OVERVIEW_CAMERA.zoom,
        pitch: OVERVIEW_CAMERA.pitch,
        bearing: OVERVIEW_CAMERA.bearing
      }
    );
  }, [attractionsData]);

  // Normalize destinations array
  const destinations = useMemo(() => {
    const rawItems = attractionsData?.items || [];
    if (rawItems.length > 0) {
      return rawItems.map((item, index) => ({
        ...item,
        routeIndex: item.routeIndex || (index < 9 ? `0${index + 1}` : `${index + 1}`),
        bearing: item.bearing !== undefined ? item.bearing : -20,
        pitch: item.pitch !== undefined ? item.pitch : 50,
        zoom: item.zoom !== undefined ? item.zoom : 15,
        elevation: item.elevation || (showElevation ? 'Đồng bằng' : ''),
        tags: item.tags || []
      }));
    }
    return DEFAULT_DESTINATIONS;
  }, [attractionsData, showElevation]);

  // Filtered destinations (when category filter is active)
  const visibleDestinations = useMemo(() => {
    if (!showFilters || activeCategoryId === 'all') {
      return destinations;
    }
    return destinations.filter((dest) => {
      if (Array.isArray(dest.categoryIds)) {
        return dest.categoryIds.includes(activeCategoryId);
      }
      return dest.categoryId === activeCategoryId;
    });
  }, [destinations, showFilters, activeCategoryId]);

  // Ensure selectedLandmarkId remains valid when destination or filter changes
  useEffect(() => {
    if (visibleDestinations.length === 0) return;
    const validIds = visibleDestinations.map((it) => it.id);
    if (!selectedLandmarkId || !validIds.includes(selectedLandmarkId)) {
      setSelectedLandmarkId(validIds[0]);
    }
  }, [visibleDestinations, selectedLandmarkId]);

  const activeLandmark = useMemo(() => {
    if (visibleDestinations.length === 0) return null;
    return visibleDestinations.find((d) => d.id === selectedLandmarkId) || visibleDestinations[0];
  }, [visibleDestinations, selectedLandmarkId]);

  // Scoped selection count (counts ONLY attractions belonging to this Atlas)
  const selectedIds = tripState.selectedAttractions || [];
  const atlasIdSet = useMemo(() => new Set(destinations.map((d) => d.id)), [destinations]);
  const selectedInAtlas = useMemo(
    () => destinations.filter((d) => selectedIds.includes(d.id)),
    [destinations, selectedIds]
  );
  const selectedInAtlasCount = selectedInAtlas.length;

  // =========================================================================
  // 1. CAMERA HELPERS (Camera ownership, deduplication, latest-request-wins)
  // =========================================================================
  const cancelPendingProgrammaticCamera = useCallback((map) => {
    if (pendingCameraRafRef.current) {
      cancelAnimationFrame(pendingCameraRafRef.current);
      pendingCameraRafRef.current = null;
      incrementAtlasCounter('cameraCancelCount');
    }
    cameraRequestIdRef.current += 1;
    if (map && isProgrammaticFlightRef.current) {
      isProgrammaticFlightRef.current = false;
      incrementAtlasCounter('mapStopCallCount');
      incrementAtlasCounter('cameraCancelCount');
      map.stop();
    }
  }, []);

  const fitOverviewBounds = useCallback(
    (map, maplibreglModule, immediate = false) => {
      if (!map) return;
      incrementAtlasCounter('cameraRequestCount');

      if (!immediate && lastCameraTargetIdRef.current === '__overview__') {
        incrementAtlasCounter('redundantCameraRequestCount');
        return;
      }

      cancelPendingProgrammaticCamera(map);
      lastCameraTargetIdRef.current = '__overview__';
      incrementAtlasCounter('cameraExecutionCount');

      const isInstant = immediate || prefersReducedMotion();
      if (!isInstant) {
        isProgrammaticFlightRef.current = true;
      }

      if (activeOverviewCamera.fitBounds && destinations.length > 1 && maplibreglModule?.LngLatBounds) {
        const bounds = new maplibreglModule.LngLatBounds();
        destinations.forEach((d) => bounds.extend([d.lng, d.lat]));
        map.fitBounds(bounds, {
          padding: activeOverviewCamera.fitBoundsPadding || { top: 44, bottom: 44, left: 44, right: 44 },
          maxZoom: activeOverviewCamera.maxFitZoom || 12.6,
          pitch: activeOverviewCamera.pitch ?? 28,
          bearing: activeOverviewCamera.bearing ?? 0,
          duration: isInstant ? 0 : 720
        });
        return;
      }

      const targetOpts = {
        center: activeOverviewCamera.center,
        zoom: activeOverviewCamera.zoom,
        pitch: activeOverviewCamera.pitch,
        bearing: activeOverviewCamera.bearing
      };

      if (isInstant) {
        map.jumpTo(targetOpts);
      } else {
        map.flyTo({
          ...targetOpts,
          speed: 0.85,
          curve: 1.4,
          essential: true
        });
      }
    },
    [activeOverviewCamera, destinations, cancelPendingProgrammaticCamera]
  );

  const maplibreglModuleRef = useRef(null);

  const flyToLandmark = useCallback(
    (landmarkId, source = 'explicit') => {
      incrementAtlasCounter('cameraRequestCount');

      // Manual gesture priority: never let scroll discovery overwrite an active user drag/zoom
      if (source === 'scroll-discovery' && isUserInteractingRef.current) {
        incrementAtlasCounter('cameraCancelCount');
        return;
      }

      setSelectedLandmarkId(landmarkId);
      setIsOverviewMode(false);

      const dest = destinations.find((d) => d.id === landmarkId);
      const map = mapRef.current;
      if (!dest || !map) return;

      // Deduplicate repeated requests for the same landmark target
      if (lastCameraTargetIdRef.current === landmarkId) {
        incrementAtlasCounter('redundantCameraRequestCount');
        return;
      }

      if (pendingCameraRafRef.current) {
        cancelAnimationFrame(pendingCameraRafRef.current);
        pendingCameraRafRef.current = null;
        incrementAtlasCounter('cameraCancelCount');
      }

      const reqId = ++cameraRequestIdRef.current;

      const executeFlight = () => {
        pendingCameraRafRef.current = null;
        if (reqId !== cameraRequestIdRef.current) return;
        if (source === 'scroll-discovery' && isUserInteractingRef.current) return;

        const activeMap = mapRef.current;
        if (!activeMap) return;

        // Only call map.stop() if a previous programmatic flight is still in flight
        if (isProgrammaticFlightRef.current) {
          isProgrammaticFlightRef.current = false;
          incrementAtlasCounter('mapStopCallCount');
          incrementAtlasCounter('cameraCancelCount');
          activeMap.stop();
        }

        lastCameraTargetIdRef.current = landmarkId;
        incrementAtlasCounter('cameraExecutionCount');

        const targetOpts = {
          center: [dest.lng, dest.lat],
          zoom: dest.zoom || 14.5,
          pitch: dest.pitch !== undefined ? dest.pitch : isTravelAtlas ? 32 : 68,
          bearing: dest.bearing || 0
        };

        if (prefersReducedMotion()) {
          activeMap.jumpTo(targetOpts);
        } else if (isTravelAtlas) {
          isProgrammaticFlightRef.current = true;
          const currentCenter = activeMap.getCenter();
          const distKm = haversineKm(currentCenter.lng, currentCenter.lat, dest.lng, dest.lat);

          if (distKm <= 1.5) {
            activeMap.easeTo({
              ...targetOpts,
              duration: 480,
              easing: (t) => 1 - Math.pow(1 - t, 3),
              essential: true
            });
          } else if (distKm <= 4.5) {
            activeMap.easeTo({
              ...targetOpts,
              duration: 650,
              easing: (t) => 1 - Math.pow(1 - t, 3),
              essential: true
            });
          } else {
            activeMap.flyTo({
              ...targetOpts,
              duration: 860,
              curve: 1.18,
              essential: true
            });
          }
        } else {
          isProgrammaticFlightRef.current = true;
          activeMap.flyTo({
            ...targetOpts,
            speed: 0.95,
            curve: 1.35,
            essential: true
          });
        }
      };

      // Coalesce rapid scroll-discovery steps within a single animation frame
      if (source === 'scroll-discovery' && typeof requestAnimationFrame === 'function') {
        pendingCameraRafRef.current = requestAnimationFrame(executeFlight);
      } else {
        executeFlight();
      }
    },
    [destinations, isTravelAtlas]
  );

  const handleScrollStepLandmark = useCallback(
    (landmarkId) => {
      flyToLandmark(landmarkId, 'scroll-discovery');
    },
    [flyToLandmark]
  );

  const handleScrollOverview = useCallback(() => {
    if (isUserInteractingRef.current) return;
    setIsOverviewMode(true);
    fitOverviewBounds(mapRef.current, maplibreglModuleRef.current, false);
  }, [fitOverviewBounds]);

  const {
    isManualMode,
    scrollStepIndex,
    isPinEligible,
    isPinActive,
    enterManualMode,
    resumeScrollDiscovery
  } = useAtlasScrollDiscovery({
    enabled: scrollExperienceEnabled,
    desktopOnly: scrollExperienceConfig.desktopOnly !== false,
    adaptivePin: scrollExperienceConfig.adaptivePin !== false,
    allowManualOverride: scrollExperienceConfig.allowManualOverride !== false,
    entryHoldVh: scrollExperienceConfig.entryHoldVh ?? 60,
    discoveryVh: scrollExperienceConfig.discoveryVh ?? 120,
    exitHoldVh: scrollExperienceConfig.exitHoldVh ?? 20,
    layoutVariant,
    prefersReducedMotion: prefersReducedMotion(),
    mapLoaded,
    isExperiencesOpen,
    isUserInteractingRef,
    containerRef,
    pinTargetRef,
    measureTargetRef,
    visibleDestinations,
    totalDestinationsCount: destinations.length,
    onScrollStepLandmark: handleScrollStepLandmark,
    onScrollOverview: handleScrollOverview
  });

  const enterManualModeRef = useRef(enterManualMode);
  useEffect(() => {
    enterManualModeRef.current = enterManualMode;
  }, [enterManualMode]);

  const handleSelectLandmark = useCallback(
    (landmarkId) => {
      isUserInteractingRef.current = false;
      enterManualMode();
      flyToLandmark(landmarkId, 'explicit');
    },
    [enterManualMode, flyToLandmark]
  );

  const handleSelectLandmarkRef = useRef(handleSelectLandmark);
  useEffect(() => {
    handleSelectLandmarkRef.current = handleSelectLandmark;
  }, [handleSelectLandmark]);

  const resetToOverview = useCallback(() => {
    isUserInteractingRef.current = false;
    enterManualMode();
    setIsOverviewMode(true);
    fitOverviewBounds(mapRef.current, maplibreglModuleRef.current, false);
  }, [enterManualMode, fitOverviewBounds]);

  // =========================================================================
  // 2. LAZY NEAR-VIEWPORT OBSERVER (When features.lazyInit is enabled)
  // =========================================================================
  useEffect(() => {
    if (!useLazyInit || shouldInitMap) return;
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') {
      setShouldInitMap(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldInitMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '800px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [useLazyInit, shouldInitMap]);

  // =========================================================================
  // 3. MAPLIBRE GL INITIALIZATION & LIFECYCLE
  // =========================================================================
  useEffect(() => {
    if (!shouldInitMap || !mapContainerRef.current) return;

    let isCancelled = false;
    let mapInstance = null;
    let resizeObserver = null;
    let cleanupPointerListeners = null;
    setMapError(false);

    const styleObj = buildMapStyle({ terrainEnabled, terrainExaggeration, isTravelAtlas });

    import('maplibre-gl')
      .then((maplibregl) => {
        if (isCancelled || !mapContainerRef.current) return;
        maplibreglModuleRef.current = maplibregl;

        try {
          const mapOptions = {
            container: mapContainerRef.current,
            style: styleObj,
            center: activeOverviewCamera.center,
            zoom: activeOverviewCamera.zoom,
            pitch: activeOverviewCamera.pitch,
            bearing: activeOverviewCamera.bearing,
            maxPitch: terrainEnabled ? 85 : 60,
            antialias: true,
            attributionControl: true
          };

          if (useCooperativeGestures) {
            mapOptions.cooperativeGestures = true;
            if (isTravelAtlas) {
              mapOptions.locale = getAtlasCooperativeLocale(isKorean);
            }
          }

          mapInstance = new maplibregl.Map(mapOptions);
          mapRef.current = mapInstance;
          incrementAtlasCounter('mapInitCount');

          if (isTravelAtlas) {
            const containerEl = mapContainerRef.current;

            // Claim user-gesture ownership immediately on pointer/touch/ctrl-wheel before 3px drag threshold
            const claimUserGesture = () => {
              isUserInteractingRef.current = true;
              lastCameraTargetIdRef.current = null;
              enterManualModeRef.current?.();
              cancelPendingProgrammaticCamera(mapInstance);
            };

            const onPointerDown = (e) => {
              // Ignore clicks on marker buttons so marker click can run its explicit flight cleanly
              if (e.target?.closest?.('.atlas-numbered-marker, .maplibregl-ctrl')) return;
              claimUserGesture();
            };

            const onWheel = (e) => {
              if (e.ctrlKey || e.metaKey) {
                claimUserGesture();
              }
            };

            const onPointerUp = () => {
              // Allow MapLibre native drag inertia to finish without immediately re-enabling scroll flights
              isUserInteractingRef.current = false;
            };

            if (containerEl) {
              containerEl.addEventListener('pointerdown', onPointerDown, { passive: true });
              containerEl.addEventListener('touchstart', onPointerDown, { passive: true });
              containerEl.addEventListener('wheel', onWheel, { passive: true });
              window.addEventListener('pointerup', onPointerUp, { passive: true });
              cleanupPointerListeners = () => {
                containerEl.removeEventListener('pointerdown', onPointerDown);
                containerEl.removeEventListener('touchstart', onPointerDown);
                containerEl.removeEventListener('wheel', onWheel);
                window.removeEventListener('pointerup', onPointerUp);
              };
            }

            // Never call mapInstance.stop() inside dragstart/zoomstart when user gesture is already driving MapLibre
            mapInstance.on('dragstart', (evt) => {
              if (evt?.originalEvent) {
                isUserInteractingRef.current = true;
                lastCameraTargetIdRef.current = null;
                enterManualModeRef.current?.();
              }
            });

            mapInstance.on('zoomstart', (evt) => {
              if (evt?.originalEvent) {
                isUserInteractingRef.current = true;
                lastCameraTargetIdRef.current = null;
                enterManualModeRef.current?.();
              }
            });

            mapInstance.on('dragend', () => {
              isUserInteractingRef.current = false;
            });

            mapInstance.on('moveend', () => {
              isProgrammaticFlightRef.current = false;
              isUserInteractingRef.current = false;
            });
          }

          if (isTravelAtlas && maplibregl.NavigationControl) {
            const nav = new maplibregl.NavigationControl({
              showCompass: false,
              showZoom: true
            });
            mapInstance.addControl(nav, 'bottom-left');
            navControlRef.current = nav;
          }

          mapInstance.on('error', (evt) => {
            // Only flag fatal WebGL/style errors, avoid failing on single transient tile misses
            if (!mapLoaded && evt?.error?.message?.toLowerCase().includes('webgl')) {
              setMapError(true);
            }
          });

          mapInstance.on('load', () => {
            if (isCancelled) return;

            if (terrainEnabled) {
              try {
                if (!mapInstance.getTerrain()) {
                  mapInstance.setTerrain({
                    source: 'terrain-dem',
                    exaggeration: terrainExaggeration
                  });
                }
              } catch (err) {
                console.warn('[MapLibre Terrain Note]', err);
              }
            }

            if (activeOverviewCamera.fitBounds) {
              fitOverviewBounds(mapInstance, maplibregl, true);
            }

            // Add Itinerary Route GeoJSON Source & Layers
            mapInstance.addSource('itinerary-route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: { type: 'LineString', coordinates: [] }
              }
            });

            mapInstance.addLayer({
              id: 'itinerary-route-glow',
              type: 'line',
              source: 'itinerary-route',
              layout: { 'line-join': 'round', 'line-cap': 'round' },
              paint: {
                'line-color': isTravelAtlas ? '#D58C48' : '#ffb52b',
                'line-width': isTravelAtlas ? 6 : 7,
                'line-opacity': isTravelAtlas ? 0.35 : 0.45,
                'line-blur': 4
              }
            });

            mapInstance.addLayer({
              id: 'itinerary-route-core',
              type: 'line',
              source: 'itinerary-route',
              layout: { 'line-join': 'round', 'line-cap': 'round' },
              paint: {
                'line-color': isTravelAtlas ? '#C5A675' : '#d4b478',
                'line-width': isTravelAtlas ? 2.5 : 3.5,
                'line-opacity': 0.92
              }
            });

            // Create Markers
            markersRef.current.forEach((m) => m.remove());
            markersRef.current = [];
            incrementAtlasCounter('markerRecreationCount');

            destinations.forEach((dest) => {
              const isNumbered = markerVariant === 'numbered';
              const el = document.createElement(isNumbered ? 'button' : 'div');
              if (isNumbered) {
                el.type = 'button';
              }
              el.className = `${isNumbered ? 'atlas-numbered-marker' : 'atlas-mapbox-marker'} ${
                dest.id === selectedLandmarkId ? 'marker-active' : ''
              }`;
              el.dataset.id = dest.id;

              if (isNumbered) {
                el.setAttribute('aria-label', `${dest.routeIndex}. ${dest.name}`);
                el.innerHTML = `
                  <span class="atlas-marker-visual">
                    <span class="atlas-marker-ring" aria-hidden="true"></span>
                    <span class="atlas-marker-badge">
                      <span class="atlas-marker-num"></span>
                    </span>
                    <span class="atlas-marker-check" aria-hidden="true">✓</span>
                  </span>
                  <span class="atlas-marker-tooltip"></span>
                `;
                const numEl = el.querySelector('.atlas-marker-num');
                if (numEl) numEl.textContent = dest.routeIndex || '';
                const tipEl = el.querySelector('.atlas-marker-tooltip');
                if (tipEl) tipEl.textContent = dest.name || '';
              } else {
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
              }

              el.addEventListener('click', (e) => {
                e.stopPropagation();
                handleSelectLandmarkRef.current(dest.id);
              });

              const marker = new maplibregl.Marker({
                element: el,
                anchor: isNumbered ? 'center' : 'bottom'
              })
                .setLngLat([dest.lng, dest.lat])
                .addTo(mapInstance);

              markersRef.current.push(marker);
            });

            setMapLoaded(true);
          });

          if (typeof ResizeObserver !== 'undefined' && mapContainerRef.current) {
            const initEl = mapContainerRef.current;
            lastMapSizeRef.current = {
              width: Math.round(initEl.clientWidth || 0),
              height: Math.round(initEl.clientHeight || 0)
            };

            resizeObserver = new ResizeObserver(() => {
              const el = mapContainerRef.current;
              if (!el || !mapRef.current) return;
              const nextW = Math.round(el.clientWidth || 0);
              const nextH = Math.round(el.clientHeight || 0);
              const prev = lastMapSizeRef.current;

              // Skip redundant subpixel notifications
              if (Math.abs(nextW - prev.width) < 2 && Math.abs(nextH - prev.height) < 2) {
                return;
              }
              lastMapSizeRef.current = { width: nextW, height: nextH };

              if (pendingResizeRafRef.current) {
                cancelAnimationFrame(pendingResizeRafRef.current);
              }
              pendingResizeRafRef.current = requestAnimationFrame(() => {
                pendingResizeRafRef.current = null;
                if (mapRef.current && !isUserInteractingRef.current) {
                  incrementAtlasCounter('mapResizeCallCount');
                  mapRef.current.resize();
                }
              });
            });
            resizeObserver.observe(mapContainerRef.current);
          }
        } catch (err) {
          console.error('Failed to initialize MapLibre GL:', err);
          setMapError(true);
        }
      })
      .catch((err) => {
        console.error('Failed to load MapLibre GL module:', err);
        if (!isCancelled) setMapError(true);
      });

    return () => {
      isCancelled = true;
      if (cleanupPointerListeners) {
        cleanupPointerListeners();
      }
      if (pendingCameraRafRef.current) {
        cancelAnimationFrame(pendingCameraRafRef.current);
        pendingCameraRafRef.current = null;
      }
      if (pendingResizeRafRef.current) {
        cancelAnimationFrame(pendingResizeRafRef.current);
        pendingResizeRafRef.current = null;
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      if (mapRef.current) {
        incrementAtlasCounter('mapRemoveCount');
        mapRef.current.remove();
        mapRef.current = null;
      }
      setMapLoaded(false);
    };
  }, [shouldInitMap, retryToken]);

  // Sync MapLibre cooperative gesture locale on KO <-> VI switch without recreating map
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded || !isTravelAtlas || !useCooperativeGestures) return;
    if (map._locale && typeof map._locale === 'object') {
      Object.assign(map._locale, getAtlasCooperativeLocale(isKorean));
    }
  }, [isKorean, isTravelAtlas, useCooperativeGestures, mapLoaded]);

  // =========================================================================
  // 4. REACTIVE MARKER LOCALIZATION & FILTER VISIBILITY (Zero Map Recreation)
  // =========================================================================
  useEffect(() => {
    if (!markersRef.current.length || !destinations.length) return;
    const visibleIds = new Set(visibleDestinations.map((d) => d.id));

    markersRef.current.forEach((marker) => {
      const el = marker.getElement();
      if (!el) return;
      const id = el.dataset.id;
      const dest = destinations.find((d) => d.id === id);
      if (!dest) return;

      const isVisible = visibleIds.has(id);
      el.style.display = isVisible ? '' : 'none';

      if (markerVariant === 'numbered') {
        const tipEl = el.querySelector('.atlas-marker-tooltip');
        if (tipEl && tipEl.textContent !== dest.name) {
          tipEl.textContent = dest.name;
        }
        el.setAttribute('aria-label', `${dest.routeIndex}. ${dest.name}`);
      } else {
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
  }, [destinations, visibleDestinations, markerVariant]);

  // =========================================================================
  // 5. UPDATE ROUTE CURVE WHEN SELECTIONS CHANGE
  // =========================================================================
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const source = map.getSource('itinerary-route');
    if (!source) return;

    const selectedDests = destinations.filter((d) => selectedIds.includes(d.id));

    source.setData({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: selectedDests.length >= 2 ? selectedDests.map((d) => [d.lng, d.lat]) : []
      }
    });
  }, [selectedIds, destinations, mapLoaded]);

  // =========================================================================
  // 6. SYNCHRONIZE MARKER ACTIVE & SELECTED STATES
  // =========================================================================
  useEffect(() => {
    const landmarkChanged = prevActiveMarkerIdRef.current !== selectedLandmarkId;
    prevActiveMarkerIdRef.current = selectedLandmarkId;
    if (landmarkChanged) {
      setIsExperiencesOpen(false);
    }

    if (arrivalTimerRef.current) {
      clearTimeout(arrivalTimerRef.current);
      arrivalTimerRef.current = null;
    }

    markersRef.current.forEach((marker) => {
      const el = marker.getElement();
      if (!el) return;
      const id = el.dataset.id;
      const isActive = id === selectedLandmarkId;
      const isSelected = selectedIds.includes(id);

      el.classList.toggle('marker-active', isActive);
      el.classList.toggle('marker-in-trip', isSelected);
      el.classList.remove('marker-arriving');

      if (isActive && landmarkChanged && isTravelAtlas && !prefersReducedMotion()) {
        // Reflow to restart single arrival ring without continuous pulse
        void el.offsetWidth;
        el.classList.add('marker-arriving');
      }

      if (markerVariant === 'numbered') {
        el.setAttribute('aria-current', isActive ? 'true' : 'false');
        el.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      }
    });

    if (landmarkChanged && isTravelAtlas && !prefersReducedMotion()) {
      arrivalTimerRef.current = setTimeout(() => {
        markersRef.current.forEach((marker) => {
          marker.getElement()?.classList.remove('marker-arriving');
        });
        arrivalTimerRef.current = null;
      }, 480);
    }

    return () => {
      if (arrivalTimerRef.current) {
        clearTimeout(arrivalTimerRef.current);
        arrivalTimerRef.current = null;
      }
    };
  }, [selectedLandmarkId, selectedIds, markerVariant, isTravelAtlas]);

  // =========================================================================
  // 7. GSAP LIFECYCLE (Travel Atlas: Unpinned Natural Flow; Legacy: Pinned)
  // =========================================================================
  useEffect(() => {
    if (!containerRef.current) return;
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

        // Travel Atlas mode: NO long pinning, staggered entrance once on first entry
        if (!pinSection) {
          const filterBarEl = containerRef.current.querySelector('.atlas-filters-bar');
          const footerBarEl = containerRef.current.querySelector('.atlas-footer-bar');
          gsap.fromTo(
            [
              headerRef.current,
              filterBarEl,
              mapContainerRef.current,
              panelRef.current,
              footerBarEl
            ].filter(Boolean),
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.065,
              ease: 'power2.out',
              clearProps: 'opacity,transform',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 84%',
                once: true
              }
            }
          );
          return;
        }

        // Legacy Da Nang pinned timeline (100% preserved)
        const pinDistance =
          isDesktop && !isShortHeight
            ? '+=200%'
            : !isShortHeight
            ? '+=130%'
            : null;

        if (!pinDistance) return;

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

        if (kickerRef.current) {
          tl.fromTo(kickerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.18 }, 0);
        }
        if (titleRef.current) {
          tl.fromTo(titleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.22 }, 0.05);
        }
        if (cartBadgeRef.current) {
          tl.fromTo(cartBadgeRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.18 }, 0.08);
        }
        if (mapContainerRef.current) {
          tl.fromTo(
            mapContainerRef.current,
            { opacity: 0.75, scale: 0.96 },
            { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.25 },
            0.18
          );
        }
        if (panelRef.current) {
          tl.fromTo(
            panelRef.current,
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, ease: 'power2.out', duration: 0.28 },
            0.42
          );
        }
      },
      containerRef
    );

    return () => mm.revert();
  }, [pinSection]);

  const handleFilterSelect = useCallback(
    (catId) => {
      enterManualMode();
      setActiveCategoryId(catId);
    },
    [enterManualMode]
  );

  const handleToggleAttractionManual = useCallback(
    (id) => {
      enterManualMode();
      toggleAttraction(id);
    },
    [enterManualMode, toggleAttraction]
  );

  const isCurrentInCart = activeLandmark ? atlasIdSet.has(activeLandmark.id) && selectedIds.includes(activeLandmark.id) : false;

  return (
    <section
      className={`interactive-3d-map-scene ${isTravelAtlas ? 'is-travel-atlas' : ''} ${
        scrollExperienceEnabled ? 'is-scroll-discovery' : ''
      } ${isPinActive ? 'is-atlas-pinned' : ''}`}
      ref={containerRef}
      id="attractions"
    >
      {/* Ambient Cartographic Grid Background (Legacy only) */}
      {showAmbientGrid && <div className="map-ambient-grid" aria-hidden="true" />}

      <div className="dest-container map-3d-content">
        <div className="atlas-pin-stage" ref={pinTargetRef}>
          <div className="atlas-pin-measure" ref={measureTargetRef}>
            {/* Header Region */}
        <header className="map-3d-header" ref={headerRef}>
          <div>
            <span className="dest-kicker map-kicker" ref={kickerRef}>
              <Compass size={14} className="map-kicker-icon" aria-hidden="true" />
              <span>{attractionsData?.kicker || 'THE DISCOVERY ATLAS'}</span>
            </span>
            <h2 className="map-3d-title" ref={titleRef}>
              {attractionsData?.title ||
                (isKorean ? '주요 명소 탐색' : 'Những Điểm Đến Nổi Bật')}
            </h2>
            {isTravelAtlas && attractionsData?.subtitle && (
              <p className="atlas-header-subtitle">{attractionsData.subtitle}</p>
            )}
          </div>

          <div className="map-cart-badge" ref={cartBadgeRef} aria-live="polite">
            <Sparkles size={14} className="map-cart-icon" aria-hidden="true" />
            {isTravelAtlas ? (
              <span key={selectedInAtlasCount} className="atlas-badge-count-text">
                <strong>
                  {String(selectedInAtlasCount).padStart(2, '0')} /{' '}
                  {String(destinations.length).padStart(2, '0')}
                </strong>{' '}
                <span>{isKorean ? '개 명소 선택됨' : 'địa điểm đã chọn'}</span>
              </span>
            ) : (
              <span>
                {attractionsData?.cartPrefix || (isKorean ? '선택한 명소' : 'Đã chọn')}:{' '}
                <strong>{selectedInAtlasCount}</strong> / {destinations.length}{' '}
                {attractionsData?.cartSuffix || (isKorean ? '곳' : 'địa điểm')}
              </span>
            )}
          </div>
        </header>

        {/* Data-Driven Category Filter Bar (Travel Atlas) */}
        {showFilters && (
          <AttractionFilters
            categories={attractionsData.categories}
            activeCategoryId={activeCategoryId}
            onSelectCategory={handleFilterSelect}
            isKorean={isKorean}
          />
        )}

        {/* Editorial Discovery Progress & Interaction Guidance (Hanoi V1.2) */}
        {scrollExperienceEnabled && (
          <DiscoveryProgress
            visibleDestinations={visibleDestinations}
            activeLandmarkId={activeLandmark?.id}
            scrollStepIndex={scrollStepIndex}
            isPinEligible={isPinEligible}
            isManualMode={isManualMode}
            isKorean={isKorean}
            onSelectStep={handleSelectLandmark}
            onResumeDiscovery={resumeScrollDiscovery}
          />
        )}

        {/* Atlas Stage: Map + Editorial Detail Panel */}
        <div className="map-atlas-stage">
          {/* Map Canvas Wrapper */}
          <div
            className="map-canvas-wrapper"
            role="region"
            aria-label={isKorean ? '인터랙티브 명소 지도' : 'Bản đồ khám phá địa điểm'}
          >
            <div className="map-mapbox-container" ref={mapContainerRef} />

            {/* Loading Shell before Lazy Init / Map Load */}
            {!mapLoaded && !mapError && (
              <div className="atlas-map-loading-shell" aria-hidden="true">
                <span>{isKorean ? '지도 불러오는 중...' : 'Đang tải bản đồ...'}</span>
              </div>
            )}

            {/* Map Error Fallback (Keeps attraction discovery & TripBuilder 100% functional) */}
            {mapError && (
              <div className="atlas-map-error-fallback" role="alert">
                <AlertTriangle size={24} aria-hidden="true" />
                <p>
                  {isKorean
                    ? '지도를 불러오는 중 문제가 발생했습니다. 아래 명소 목록에서 계속 탐색하실 수 있습니다.'
                    : 'Không thể tải bản đồ tương tác lúc này. Bạn vẫn có thể khám phá và chọn các địa điểm bên cạnh.'}
                </p>
                <div className="atlas-error-quick-list">
                  {visibleDestinations.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      className={`atlas-error-spot-btn ${d.id === activeLandmark?.id ? 'is-active' : ''}`}
                      onClick={() => handleSelectLandmark(d.id)}
                    >
                      {d.routeIndex}. {d.name}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="atlas-retry-btn"
                  onClick={() => setRetryToken((prev) => prev + 1)}
                >
                  <RotateCcw size={13} aria-hidden="true" />
                  <span>{isKorean ? '지도 다시 시도' : 'Thử tải lại bản đồ'}</span>
                </button>
              </div>
            )}

            {/* Reset Overview Button */}
            <button
              type="button"
              className={`map-reset-view-btn ${!isOverviewMode ? 'active' : ''}`}
              onClick={resetToOverview}
              title={
                attractionsData?.resetViewText ||
                (isKorean ? '전체 지도 보기' : 'Toàn cảnh')
              }
              aria-label={
                attractionsData?.resetViewText ||
                (isKorean ? '전체 지도 보기' : 'Khôi phục góc nhìn toàn cảnh')
              }
            >
              <RotateCcw size={13} aria-hidden="true" />
              <span>
                {attractionsData?.resetViewText ||
                  (isKorean ? '전체 보기' : 'Toàn cảnh')}
              </span>
            </button>

            {/* Satellite Live Badge (Legacy Da Nang only) */}
            {showLiveBadge && (
              <div className="map-live-badge">
                <span className="live-pulse-dot" />
                <span>REAL 3D TERRAIN &amp; SATELLITE</span>
              </div>
            )}
          </div>

          {/* Right / Inline Detail Panel */}
          <AttractionDetailPanel
            panelRef={panelRef}
            activeLandmark={activeLandmark}
            attractionsData={attractionsData}
            visibleDestinations={visibleDestinations}
            isTravelAtlas={isTravelAtlas}
            isKorean={isKorean}
            isCurrentInCart={isCurrentInCart}
            showElevation={showElevation}
            showDuration={showDuration}
            showPreviousNext={showPreviousNext}
            showPhotoAttribution={showPhotoAttribution}
            prefersReducedMotion={prefersReducedMotion()}
            onToggleAttraction={handleToggleAttractionManual}
            onSelectLandmark={handleSelectLandmark}
            onExperiencesToggle={(nextOpen) => {
              setIsExperiencesOpen(Boolean(nextOpen));
              enterManualMode();
            }}
          />
        </div>

        {/* Unified Compact Atlas Footer: Selection Summary + Single Navigation Bar */}
        {(showSelectionSummary || (isTravelAtlas && showPreviousNext)) && (() => {
          const currentVisibleIdx = Math.max(
            0,
            visibleDestinations.findIndex((d) => d.id === activeLandmark?.id)
          );
          const totalVisible = visibleDestinations.length || 1;
          const canNavigate = totalVisible > 1;
          const maxInlineChips = 3;
          const visibleChips = showAllSelectedChips
            ? selectedInAtlas
            : selectedInAtlas.slice(0, maxInlineChips);
          const hiddenChipsCount = Math.max(0, selectedInAtlasCount - maxInlineChips);

          const handleFooterPrev = () => {
            if (!canNavigate) return;
            const prevIdx = (currentVisibleIdx - 1 + totalVisible) % totalVisible;
            handleSelectLandmark(visibleDestinations[prevIdx].id);
          };

          const handleFooterNext = () => {
            if (!canNavigate) return;
            const nextIdx = (currentVisibleIdx + 1) % totalVisible;
            handleSelectLandmark(visibleDestinations[nextIdx].id);
          };

          return (
            <div className="atlas-footer-bar">
              {showSelectionSummary && (
                <div className="atlas-selection-summary" aria-live="polite">
                  {selectedInAtlasCount > 0 ? (
                    <div className="atlas-summary-chips">
                      {visibleChips.map((item) => (
                        <span key={item.id} className="atlas-summary-chip">
                          <button
                            type="button"
                            className="atlas-chip-focus"
                            onClick={() => handleSelectLandmark(item.id)}
                          >
                            {item.name}
                          </button>
                          <button
                            type="button"
                            className="atlas-chip-remove"
                            onClick={() => handleToggleAttractionManual(item.id)}
                            aria-label={
                              isKorean
                                ? `${item.name} 선택 해제`
                                : `Bỏ chọn ${item.name}`
                            }
                          >
                            <X size={12} aria-hidden="true" />
                          </button>
                        </span>
                      ))}
                      {hiddenChipsCount > 0 && (
                        <button
                          type="button"
                          className="atlas-chips-more-btn"
                          aria-expanded={showAllSelectedChips}
                          onClick={() => setShowAllSelectedChips((prev) => !prev)}
                        >
                          {showAllSelectedChips
                            ? isKorean
                              ? '접기'
                              : 'Thu gọn'
                            : `+${hiddenChipsCount}`}
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="atlas-summary-empty">
                      {isKorean
                        ? '지도에서 명소를 선택해 나만의 일정에 담아보세요.'
                        : 'Chọn địa điểm trên bản đồ để thêm vào hành trình của bạn.'}
                    </span>
                  )}
                </div>
              )}

              {isTravelAtlas && showPreviousNext && (
                <div className="atlas-footer-right">
                  {scrollExperienceEnabled && isPinEligible && (
                    <span className="atlas-scroll-continue-hint">
                      {isKorean
                        ? '스크롤하여 다음 여정을 이어가세요.'
                        : 'Cuộn tiếp để tiếp tục hành trình.'}
                    </span>
                  )}
                  <nav
                    className="atlas-prev-next-bar"
                    aria-label={isKorean ? '명소 탐색' : 'Điều hướng địa điểm'}
                  >
                    <button
                      type="button"
                      className="atlas-nav-btn"
                      onClick={handleFooterPrev}
                      disabled={!canNavigate}
                      aria-label={isKorean ? '이전 명소' : 'Địa điểm trước'}
                    >
                      <ChevronLeft size={15} aria-hidden="true" />
                      <span>{isKorean ? '이전' : 'Trước'}</span>
                    </button>

                    <span className="atlas-nav-counter">
                      {String(currentVisibleIdx + 1).padStart(2, '0')} /{' '}
                      {String(totalVisible).padStart(2, '0')}
                    </span>

                    <button
                      type="button"
                      className="atlas-nav-btn"
                      onClick={handleFooterNext}
                      disabled={!canNavigate}
                      aria-label={isKorean ? '다음 명소' : 'Địa điểm tiếp'}
                    >
                      <span>{isKorean ? '다음' : 'Tiếp'}</span>
                      <ChevronRight size={15} aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              )}
            </div>
          );
        })()}
          </div>
        </div>

        {/* Travel Note / Geo Disclaimer Bar (kept outside pinned stage to preserve compact pin height) */}
        <div className="map-disclaimer">
          <Info size={13} className="disclaimer-icon" aria-hidden="true" />
          <span>
            {attractionsData?.disclaimer ||
              (isKorean
                ? '지도 상의 위치는 이해를 돕기 위한 안내이며, 실제 일정과 이동 동선은 여행 스타일에 맞춰 유연하게 조율됩니다.'
                : 'Vị trí trên bản đồ mang tính tham khảo trực quan; lộ trình tham quan thực tế được Super EZ Tour điều chỉnh linh hoạt theo nhu cầu của quý khách.')}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Interactive3DMap;
