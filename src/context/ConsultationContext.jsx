import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { VIETNAM_DESTINATIONS, TRAVEL_THEMES, SIGNATURE_JOURNEYS } from '../data/vietnamDestinations';
import { useLanguage } from './LanguageContext';

/**
 * Super EZ Tour — Unified Consultation System
 * Single Source of Truth for all consultation entry points.
 * Manages consultation draft lifecycle:
 * - OPEN_NEW_CONSULTATION: Start clean session with specific source context
 * - OPEN_EXPERIENCE_DRAWER: Open theme discovery drawer with clean theme draft
 * - UPDATE_CONSULTATION: Update draft fields in-flight
 * - CONTINUE_FROM_DRAWER: Seamlessly carry theme & customizations into QuoteModal
 * - CLOSE_CONSULTATION: Dismiss modal/drawer cleanly without stale state leakage
 * - SUBMIT_CONSULTATION: Validate, construct backend-ready payload & add quote
 */

const ConsultationContext = createContext(null);

/**
 * Canonical helper to resolve destination ID to a valid destination in VIETNAM_DESTINATIONS.
 * Returns empty string if not resolvable or not provided, allowing proper "Select Destination" prompt.
 */
export const resolveCanonicalDestinationId = (input) => {
  if (!input) return '';
  if (typeof input === 'object' && input !== null) {
    if ('nativeEvent' in input || '_reactName' in input || 'preventDefault' in input) {
      return '';
    }
    const raw = input.destinationId || input.destinationSlug || input.id || input.destination;
    return resolveCanonicalDestinationId(raw);
  }
  const norm = String(input).toLowerCase().trim();
  if (norm === 'kakao') return '';
  const matched = VIETNAM_DESTINATIONS.find(
    (d) =>
      d.id === norm ||
      d.slug === norm ||
      (d.aliases && d.aliases.some((a) => a.toLowerCase() === norm))
  );
  return matched ? matched.id : '';
};

/**
 * Creates a blank, pristine consultation draft.
 */
const createInitialDraft = (isKorean = false) => ({
  sessionId: '',
  source: 'direct', // 'travel-theme' | 'signature-journey' | 'destination-card' | 'hero' | 'navbar' | 'floating' | 'quick-quote' | 'direct'
  
  // Selection Context
  themeId: null,
  themeTitle: '',
  themeCategory: '',
  destinationId: '',
  destinationName: '',
  journeyId: null,
  journeyTitle: '',
  
  // Customization Options
  duration: '4d3n',
  customDuration: '',
  travelers: '2',
  departureDate: '',
  
  // Customer Contact Details
  customerName: '',
  contactMethod: 'phone', // 'phone' | 'kakao' | 'zalo'
  countryCode: isKorean ? '+82' : '+84',
  phone: '',
  kakaoId: '',
  zaloAccount: '',
  
  // User Notes (Strictly user-typed content only)
  specialRequests: '',
  consent: false,
});

export const ConsultationProvider = ({ children, onAddQuote: globalOnAddQuote }) => {
  const { isKorean } = useLanguage();

  // Consultation UI status
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(null);

  // Single Source of Truth: The current consultation draft
  const [draft, setDraft] = useState(() => createInitialDraft(isKorean));

  /**
   * Helper to derive destination display name from ID
   */
  const getDestinationName = useCallback((destId) => {
    if (!destId) return '';
    const dest = VIETNAM_DESTINATIONS.find((d) => d.id === destId);
    if (!dest) return destId;
    return isKorean ? dest.nameKr : (dest.nameVi || dest.name);
  }, [isKorean]);

  /**
   * A. OPEN_NEW_CONSULTATION
   * Starts a brand new consultation session with guaranteed clean data.
   * Completely clears previous session's destination, theme, notes, etc.
   */
  const openNewConsultation = useCallback((rawOptions = {}) => {
    // Generate new unique session ID
    const newSessionId = `CS-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    
    // Guard against React SyntheticEvent or native DOM events
    const isEvent = rawOptions && typeof rawOptions === 'object' && ('nativeEvent' in rawOptions || '_reactName' in rawOptions || 'preventDefault' in rawOptions);
    const options = isEvent ? { source: 'navbar' } : (rawOptions || {});

    // Determine source
    let source = 'direct';
    let destId = '';
    let themeId = null;
    let themeTitle = '';
    let themeCategory = '';
    let journeyId = null;
    let journeyTitle = '';
    let duration = '4d3n';
    let travelers = '2';
    let contactMethod = 'phone';
    let specialRequests = '';

    if (typeof options === 'string') {
      if (options === 'kakao') {
        contactMethod = 'kakao';
        source = 'floating';
      } else {
        destId = resolveCanonicalDestinationId(options);
        source = 'destination-card';
      }
    } else if (typeof options === 'object' && options !== null) {
      source = options.source || (options.themeId ? 'travel-theme' : options.tourId || options.journeyId ? 'signature-journey' : options.destinationId ? 'destination-card' : 'direct');
      
      // Destination
      destId = resolveCanonicalDestinationId(options.destinationId || options.destinationSlug || options.destination || options.id);
      
      // Theme
      if (options.themeId) {
        themeId = options.themeId;
        const themeObj = TRAVEL_THEMES.find((t) => t.id === themeId);
        if (themeObj) {
          themeTitle = isKorean ? themeObj.titleKr : themeObj.titleVi;
          themeCategory = themeObj.categoryEn || '';
          if (!destId && themeObj.suggestedDestinationIds?.length) {
            destId = themeObj.suggestedDestinationIds[0];
          }
        } else {
          themeTitle = options.themeTitle || '';
        }
      }

      // Journey
      if (options.tourId || options.journeyId) {
        journeyId = options.tourId || options.journeyId;
        const journeyObj = SIGNATURE_JOURNEYS.find((j) => j.id === journeyId);
        if (journeyObj) {
          journeyTitle = isKorean ? (journeyObj.titleKr || journeyObj.title) : (journeyObj.titleVi || journeyObj.title);
          if (!destId && journeyObj.destinationSlug) {
            destId = resolveCanonicalDestinationId(journeyObj.destinationSlug);
          }
          if (journeyObj.durationKey) {
            duration = journeyObj.durationKey;
          }
        } else {
          journeyTitle = options.tourTitle || options.journeyTitle || '';
        }
      }

      if (options.duration) duration = options.duration;
      if (options.travelers || options.groupSize) travelers = options.travelers || options.groupSize;
      if (options.contactMethod) contactMethod = options.contactMethod;
      if (options.specialRequests) specialRequests = options.specialRequests;
    }

    const newDraft = {
      sessionId: newSessionId,
      source,
      themeId,
      themeTitle,
      themeCategory,
      destinationId: destId,
      destinationName: getDestinationName(destId),
      journeyId,
      journeyTitle,
      duration,
      customDuration: '',
      travelers,
      departureDate: '',
      customerName: '',
      contactMethod,
      countryCode: isKorean ? '+82' : '+84',
      phone: '',
      kakaoId: '',
      zaloAccount: '',
      specialRequests,
      consent: false,
    };

    setDraft(newDraft);
    setActiveTheme(null);
    setDrawerOpen(false);
    setModalOpen(true);
  }, [isKorean, getDestinationName]);

  /**
   * B. OPEN_EXPERIENCE_DRAWER
   * Opens the Experience Detail Drawer for a specific travel theme.
   * Initializes clean draft for that theme.
   */
  const openExperienceDrawer = useCallback((theme) => {
    if (!theme) return;

    const newSessionId = `CS-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const themeTitle = isKorean ? theme.titleKr : theme.titleVi;
    const defaultDest = theme.suggestedDestinationIds?.[0] || '';

    const newDraft = {
      sessionId: newSessionId,
      source: 'travel-theme',
      themeId: theme.id,
      themeTitle,
      themeCategory: theme.categoryEn || 'EXCLUSIVE STYLE',
      destinationId: defaultDest,
      destinationName: getDestinationName(defaultDest),
      journeyId: null,
      journeyTitle: '',
      duration: '4d3n',
      customDuration: '',
      travelers: '3-5',
      departureDate: '',
      customerName: '',
      contactMethod: 'phone',
      countryCode: isKorean ? '+82' : '+84',
      phone: '',
      kakaoId: '',
      zaloAccount: '',
      specialRequests: '',
      consent: false,
    };

    setDraft(newDraft);
    setActiveTheme(theme);
    setModalOpen(false);
    setDrawerOpen(true);
  }, [isKorean, getDestinationName]);

  /**
   * C. UPDATE_CONSULTATION
   * Updates partial fields in the active consultation draft.
   */
  const updateConsultation = useCallback((updates) => {
    setDraft((prev) => {
      const next = { ...prev, ...updates };
      // If destinationId was updated, also sync destinationName
      if (updates.destinationId !== undefined) {
        next.destinationName = getDestinationName(updates.destinationId);
      }
      return next;
    });
  }, [getDestinationName]);

  /**
   * D. CONTINUE_FROM_DRAWER
   * User finished exploring in ExperienceDrawer and clicks "Yêu cầu thiết kế hành trình riêng".
   * Carries all selected options directly into QuoteModal under the same session.
   * Completely avoids race condition or state reset.
   */
  const continueFromDrawer = useCallback((customizations = {}) => {
    setDraft((prev) => {
      const destId = customizations.destinationId || prev.destinationId || '';
      return {
        ...prev,
        destinationId: destId,
        destinationName: getDestinationName(destId),
        duration: customizations.duration || prev.duration,
        travelers: customizations.travelers || customizations.groupSize || prev.travelers,
        specialRequests: customizations.specialRequests !== undefined
          ? customizations.specialRequests
          : prev.specialRequests,
      };
    });

    // Close drawer and immediately open QuoteModal
    setDrawerOpen(false);
    setModalOpen(true);
  }, [getDestinationName]);

  /**
   * E. CLOSE_CONSULTATION
   * Closes either the Modal or Drawer cleanly.
   */
  const closeConsultation = useCallback(() => {
    setModalOpen(false);
    setDrawerOpen(false);
  }, []);

  const closeDrawerOnly = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const value = useMemo(() => ({
    // State
    draft,
    modalOpen,
    drawerOpen,
    activeTheme,
    
    // Actions
    openNewConsultation,
    openExperienceDrawer,
    updateConsultation,
    continueFromDrawer,
    closeConsultation,
    closeDrawerOnly,
  }), [
    draft,
    modalOpen,
    drawerOpen,
    activeTheme,
    openNewConsultation,
    openExperienceDrawer,
    updateConsultation,
    continueFromDrawer,
    closeConsultation,
    closeDrawerOnly,
  ]);

  return (
    <ConsultationContext.Provider value={value}>
      {children}
    </ConsultationContext.Provider>
  );
};

export const useConsultation = () => {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error('useConsultation must be used within a ConsultationProvider');
  }
  return context;
};

