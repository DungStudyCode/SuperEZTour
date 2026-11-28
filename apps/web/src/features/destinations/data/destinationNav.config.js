/**
 * Super EZ Tour — Destination Navigation Registry
 * Architecture: "ONE SHARED HEADER — MULTIPLE DESTINATION IDENTITIES"
 * 
 * Provides destination-specific navigation configurations mapped to real DOM section IDs.
 * Used by DestinationHeader for both Desktop and Mobile views.
 */

export const DESTINATION_NAV_CONFIG = {
  'da-nang': [
    {
      id: 'discover',
      sectionId: 'discover',
      labelKey: 'destinationNav.daNang.discover',
      labelVi: 'Khám phá',
      labelKo: '다낭 탐방',
    },
    {
      id: 'services',
      sectionId: 'services',
      labelKey: 'destinationNav.daNang.services',
      labelVi: 'Dịch vụ riêng',
      labelKo: '여행 서비스',
    },
    {
      id: 'accommodation',
      sectionId: 'accommodation',
      labelKey: 'destinationNav.daNang.accommodation',
      labelVi: 'Lưu trú cao cấp',
      labelKo: '최고급 숙소',
    },
    {
      id: 'attractions',
      sectionId: 'attractions',
      labelKey: 'destinationNav.daNang.attractions',
      labelVi: 'Tọa độ',
      labelKo: '주요 명소',
    },
    {
      id: 'itinerary',
      sectionId: 'itinerary',
      labelKey: 'destinationNav.daNang.itinerary',
      labelVi: 'Lịch trình',
      labelKo: '추천 일정',
    },
    {
      id: 'trip-builder',
      sectionId: 'trip-builder',
      labelKey: 'destinationNav.daNang.tripBuilder',
      labelVi: 'Thiết kế tour',
      labelKo: '맞춤 여행 만들기',
      isHighlight: true,
    },
  ],

  'ha-noi': [
    {
      id: 'scene-old-quarter',
      sectionId: 'scene-old-quarter',
      labelKey: 'destinationNav.haNoi.oldQuarter',
      labelVi: 'Phố cổ 36 phố',
      labelKo: '36거리 골목',
    },
    {
      id: 'hanoi-heritage',
      sectionId: 'hanoi-heritage',
      labelKey: 'destinationNav.haNoi.heritage',
      labelVi: 'Không gian di sản',
      labelKo: '천년 유산',
    },
    {
      id: 'hanoi-taste',
      sectionId: 'hanoi-taste',
      labelKey: 'destinationNav.haNoi.taste',
      labelVi: 'Mỹ vị Hà Nội',
      labelKo: '미식 큐레이션',
    },
    {
      id: 'attractions',
      sectionId: 'attractions',
      labelKey: 'destinationNav.haNoi.attractions',
      labelVi: 'Bản đồ 3D',
      labelKo: '3D 지도',
    },
    {
      id: 'itinerary',
      sectionId: 'itinerary',
      labelKey: 'destinationNav.haNoi.itinerary',
      labelVi: 'Lịch trình',
      labelKo: '추천 여정',
    },
    {
      id: 'trip-builder',
      sectionId: 'trip-builder',
      labelKey: 'destinationNav.haNoi.tripBuilder',
      labelVi: 'Thiết kế tour',
      labelKo: '맞춤 여행 만들기',
      isHighlight: true,
    },
  ],

  'default': [
    {
      id: 'discover',
      sectionId: 'discover',
      labelKey: 'destinationNav.default.discover',
      labelVi: 'Khám phá',
      labelKo: '도시 탐방',
    },
    {
      id: 'attractions',
      sectionId: 'attractions',
      labelKey: 'destinationNav.default.attractions',
      labelVi: 'Điểm tham quan',
      labelKo: '주요 명소',
    },
    {
      id: 'itinerary',
      sectionId: 'itinerary',
      labelKey: 'destinationNav.default.itinerary',
      labelVi: 'Lịch trình',
      labelKo: '추천 일정',
    },
    {
      id: 'trip-builder',
      sectionId: 'trip-builder',
      labelKey: 'destinationNav.default.tripBuilder',
      labelVi: 'Thiết kế tour',
      labelKo: '맞춤 여행',
      isHighlight: true,
    },
  ],
};

/**
 * Get navigation items for a destination by id or slug
 * @param {string} destinationId
 * @returns {Array} Navigation items
 */
export function getDestinationNav(destinationId) {
  const normalized = (destinationId || '').toLowerCase().trim();
  if (DESTINATION_NAV_CONFIG[normalized]) {
    return DESTINATION_NAV_CONFIG[normalized];
  }
  if (normalized.includes('danang') || normalized.includes('da-nang')) {
    return DESTINATION_NAV_CONFIG['da-nang'];
  }
  if (normalized.includes('hanoi') || normalized.includes('ha-noi')) {
    return DESTINATION_NAV_CONFIG['ha-noi'];
  }
  return DESTINATION_NAV_CONFIG['default'];
}

export default DESTINATION_NAV_CONFIG;
