import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const TripBuilderContext = createContext(null);

/**
 * Canonical bilingual culinary alias groups
 * Ensures selecting a dish in KO or VI synchronizes across Screen 4 / Scene 09 and TripBuilderMorph
 * without duplicates or lost state on language switches.
 */
export const CULINARY_ALIAS_GROUPS = [
  [
    'pho-bo',
    'pho-bo-hanoi',
    'Phở Bò Gia Truyền Hà Nội',
    'Phở Bò Gia Truyền Bát Đàn',
    '정통 하노이 소고기 쌀국수 (Phở Bò)',
    '하노이 정통 소고기 쌀국수 (퍼보)',
    '하노이 정통 소고기 쌀국수 (Phở Bò)',
    'Heirloom Hanoi Beef Pho'
  ],
  [
    'bun-cha',
    'bun-cha-hanoi',
    'Bún Chả Than Hoa Hà Nội',
    'Bún Chả Nướng Than Hoa Hàng Quạt',
    '하노이 숯불 분짜 (Bún Chả)',
    '참숯 직화 하노이 분짜',
    'Charcoal Grilled Pork Bun Cha'
  ],
  [
    'egg-coffee',
    'Cà Phê Trứng Phố Cổ',
    'Cà Phê Trứng Nguyên Bản Giảng',
    '하노이 원조 에그커피 (Cà Phê Trứng)',
    '원조 에그커피 (카페 쯩)'
  ],
  [
    'cha-ca',
    'cha-ca-la-vong',
    'Chả Cá Lã Vọng',
    'Chả Cá Lã Vọng Gia Truyền',
    '짜까 라봉 (Chả Cá Lã Vọng)',
    '짜까 라봉 (가물치 딜 볶음)',
    '짜까 라봉 틸라피아 솥 요리 (Chả Cá)'
  ],
  [
    'banh-cuon',
    'Bánh Cuốn Thanh Trì',
    '탄찌 전통 쌀전병 (Bánh Cuốn)'
  ],
  [
    'bun-thang',
    'Bún Thang Hà Nội',
    'Bún Thang Thanh Tao Hà Thành',
    '하노이 궁중 오색 국수 (Bún Thang)',
    '분탕 (궁중 스타일 맑은 닭국수)'
  ],
  // Da Nang Culinary Aliases
  [
    'mi-quang',
    'Mì Quảng Xứ Quảng',
    'Mì Quảng Phú Chiêm & Tôm Thịt Trứng Cút',
    '미꽝 (Mì Quảng · 다낭 황금 강황 비빔국수)',
    'Đặc sản địa phương',
    '다낭 로컬 명물 미식'
  ],
  [
    'banh-trang-thit-heo',
    'Bánh Tráng Cuốn Thịt Heo Hai Đầu Da',
    'Bánh Tráng Cuốn Thịt Heo Đại Lộc',
    '반짱 꾸온 팃헤오 (삼겹살 라이스페이퍼 쌈)'
  ],
  [
    'hai-san-tuoi',
    'Hải sản tươi sống',
    'Hải Sản Tươi Sống Biển Đông',
    'Hải Sản Tươi Sống Đánh Bắt Trong Ngày',
    '다낭 미케비치 활어 해산물 만찬',
    '미케비치 활어 씨푸드'
  ],
  [
    'bun-cha-ca',
    'Bún Chả Cá Đà Nẵng',
    'Bún Chả Cá Thu Gia Truyền Đà Nẵng',
    '다낭 어묵 쌀국수 (분짜까 · Bún Chả Cá)'
  ],
  [
    'fine-dining-danang',
    'Fine Dining & Ẩm Thực Đương Đại',
    'La Maison 1888 & Tuyệt Tác Fine Dining',
    '라 메종 1888 미쉐린 파인다이닝 & 선셋 다이닝',
    '미쉐린 파인다이닝'
  ]
];

export const getCulinaryAliasGroup = (preference) => {
  if (!preference) return [];
  const found = CULINARY_ALIAS_GROUPS.find((group) => group.includes(preference));
  return found || [preference];
};

export const isCulinarySelected = (culinaryPreferences = [], targetPreference) => {
  if (!Array.isArray(culinaryPreferences) || !targetPreference) return false;
  const group = getCulinaryAliasGroup(targetPreference);
  return culinaryPreferences.some((item) => group.includes(item));
};

export const DEFAULT_TRIP_STATE = {
  currentStep: 1,
  destination: 'Đà Nẵng',
  destinationSlug: 'da-nang',
  departureDate: '',
  durationDays: 4,
  adultsCount: 2,
  childrenCount: 0,
  
  // Step 2: Accommodation
  accommodationType: 'resort', // '4star' | '5star' | 'resort' | 'villa' | 'self'
  accommodationName: 'Hyatt Regency Danang Resort & Spa',
  
  // Step 3: Transportation
  transportType: 'suv-7', // 'suv-7' | 'van-16' | 'limousine-vip' | 'coach-35' | 'coach-45' | 'consultant'
  
  // Step 4: Guide
  guideOption: 'dedicated', // 'dedicated' | 'none'
  guideLanguage: 'Tiếng Việt', // 'Tiếng Việt' | 'Tiếng Anh' | 'Tiếng Hàn' | 'Tiếng Trung'
  
  // Step 5: Flights
  flightOption: 'need_support', // 'need_support' | 'have_ticket' | 'undecided'
  departureCity: 'Hà Nội',
  
  // Step 6: Attractions & Culinary
  selectedAttractions: ['ba-na-hills', 'hoi-an-ancient-town', 'my-khe-beach'],
  culinaryPreferences: ['Đặc sản địa phương', 'Hải sản tươi sống'],
  specialRequests: '',
  
  // Step 7: Contact Info
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  preferredChannel: 'zalo', // 'zalo' | 'phone' | 'whatsapp'
  agreePrivacy: true,
  
  // Status
  isSubmitted: false,
  submittedQuoteCode: null
};

export const TripBuilderProvider = ({ children, destinationConfig }) => {
  const isKorean = destinationConfig?.locale ? destinationConfig.locale === 'ko' : true;

  const [tripState, setTripState] = useState(() => ({
    ...DEFAULT_TRIP_STATE,
    destination: isKorean ? (destinationConfig?.nameKr || '다낭') : (destinationConfig?.name || 'Đà Nẵng'),
    destinationSlug: destinationConfig?.slug || 'da-nang',
    guideLanguage: isKorean ? '한국어 (전담)' : 'Tiếng Việt',
    departureCity: isKorean ? '인천 (ICN)' : 'Hà Nội'
  }));

  useEffect(() => {
    setTripState((prev) => ({
      ...prev,
      destination: isKorean ? (destinationConfig?.nameKr || '다낭') : (destinationConfig?.name || 'Đà Nẵng'),
      destinationSlug: destinationConfig?.slug || prev.destinationSlug || 'da-nang',
      guideLanguage:
        prev.guideLanguage === '한국어 (전담)' || prev.guideLanguage === 'Tiếng Việt'
          ? isKorean
            ? '한국어 (전담)'
            : 'Tiếng Việt'
          : prev.guideLanguage,
      departureCity:
        prev.departureCity === '인천 (ICN)' || prev.departureCity === 'Hà Nội'
          ? isKorean
            ? '인천 (ICN)'
            : 'Hà Nội'
          : prev.departureCity
    }));
  }, [isKorean, destinationConfig?.nameKr, destinationConfig?.name, destinationConfig?.slug]);

  const setStep = useCallback((step) => {
    setTripState((prev) => ({
      ...prev,
      currentStep: Math.min(Math.max(step, 1), 7)
    }));
  }, []);

  const nextStep = useCallback(() => {
    setTripState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 7)
    }));
  }, []);

  const prevStep = useCallback(() => {
    setTripState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1)
    }));
  }, []);

  const updateField = useCallback((field, value) => {
    setTripState((prev) => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const toggleAttraction = useCallback((attractionId) => {
    setTripState((prev) => {
      const exists = prev.selectedAttractions.includes(attractionId);
      const updated = exists
        ? prev.selectedAttractions.filter((id) => id !== attractionId)
        : [...prev.selectedAttractions, attractionId];
      return { ...prev, selectedAttractions: updated };
    });
  }, []);

  const toggleCulinary = useCallback((preference) => {
    setTripState((prev) => {
      const group = getCulinaryAliasGroup(preference);
      const exists = prev.culinaryPreferences.some((p) => group.includes(p));
      const cleaned = prev.culinaryPreferences.filter((p) => !group.includes(p));
      const updated = exists ? cleaned : [...cleaned, preference];
      return { ...prev, culinaryPreferences: updated };
    });
  }, []);

  // Pre-select service from external section (e.g. clicking hotel card, vehicle card) and scroll to builder
  const preselectService = useCallback((serviceType, value, autoScroll = true) => {
    setTripState((prev) => {
      const update = { ...prev };
      if (serviceType === 'accommodation') {
        update.accommodationType = value.category || value.id || 'resort';
        if (value.name) update.accommodationName = value.name;
        update.currentStep = 2;
      } else if (serviceType === 'transportation') {
        update.transportType = value.id || 'suv-7';
        update.currentStep = 3;
      } else if (serviceType === 'guide') {
        update.guideOption = 'dedicated';
        update.currentStep = 4;
      } else if (serviceType === 'flights') {
        update.flightOption = 'need_support';
        update.currentStep = 5;
      } else if (serviceType === 'attraction') {
        if (!update.selectedAttractions.includes(value)) {
          update.selectedAttractions = [...update.selectedAttractions, value];
        }
      }
      return update;
    });

    if (autoScroll) {
      const builderElement = document.getElementById('trip-builder');
      if (builderElement) {
        builderElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  // Apply suggested itinerary to trip builder
  const applyItinerary = useCallback((itinerary) => {
    setTripState((prev) => ({
      ...prev,
      durationDays: itinerary.daysCount || 4,
      specialRequests: isKorean
        ? `추천 맞춤 일정 기준 문의: ${itinerary.title}`
        : `Yêu cầu theo khung lịch trình đề xuất: ${itinerary.title}`,
      currentStep: 1
    }));
    const builderElement = document.getElementById('trip-builder');
    if (builderElement) {
      builderElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isKorean]);

  // Submit form handler
  const submitTrip = useCallback((onAddQuoteCallback) => {
    const code = `EZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setTripState((prev) => ({
      ...prev,
      isSubmitted: true,
      submittedQuoteCode: code
    }));

    if (typeof onAddQuoteCallback === 'function') {
      const newQuote = {
        id: `quote-${Date.now()}`,
        code,
        customerName: tripState.contactName || 'Quý khách VIP',
        phone: tripState.contactPhone ? tripState.contactPhone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2') : '090****888',
        destination: tripState.destination,
        destinationId: tripState.destinationSlug,
        pax: `${tripState.adultsCount} Lớn${tripState.childrenCount > 0 ? `, ${tripState.childrenCount} Trẻ` : ''}`,
        duration: `${tripState.durationDays}N${tripState.durationDays - 1}Đ`,
        status: 'processing',
        statusText: 'Đang lên lịch trình riêng',
        timeAgo: 'Vừa xong',
        type: 'Tour riêng 100%',
        specialNotes: `Lưu trú: ${tripState.accommodationType} | Xe: ${tripState.transportType} | HDV: ${tripState.guideOption}`
      };
      onAddQuoteCallback(newQuote);
    }

    return code;
  }, [tripState]);

  const resetTrip = useCallback(() => {
    setTripState({
      ...DEFAULT_TRIP_STATE,
      destination: destinationConfig?.name || 'Đà Nẵng',
      destinationSlug: destinationConfig?.slug || 'da-nang'
    });
  }, [destinationConfig]);

  return (
    <TripBuilderContext.Provider
      value={{
        tripState,
        setStep,
        nextStep,
        prevStep,
        updateField,
        toggleAttraction,
        toggleCulinary,
        preselectService,
        applyItinerary,
        submitTrip,
        resetTrip
      }}
    >
      {children}
    </TripBuilderContext.Provider>
  );
};

export const useTripBuilder = () => {
  const context = useContext(TripBuilderContext);
  if (!context) {
    throw new Error('useTripBuilder must be used within a TripBuilderProvider');
  }
  return context;
};

export default TripBuilderContext;