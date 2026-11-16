import React, { createContext, useContext, useState, useCallback } from 'react';

const TripBuilderContext = createContext(null);

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
  const [tripState, setTripState] = useState(() => ({
    ...DEFAULT_TRIP_STATE,
    destination: destinationConfig?.name || 'Đà Nẵng',
    destinationSlug: destinationConfig?.slug || 'da-nang'
  }));

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
      const exists = prev.culinaryPreferences.includes(preference);
      const updated = exists
        ? prev.culinaryPreferences.filter((p) => p !== preference)
        : [...prev.culinaryPreferences, preference];
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
      specialRequests: `Yêu cầu theo khung lịch trình đề xuất: ${itinerary.title}`,
      currentStep: 1
    }));
    const builderElement = document.getElementById('trip-builder');
    if (builderElement) {
      builderElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

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