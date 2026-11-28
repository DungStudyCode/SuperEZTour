import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import { VIETNAM_DESTINATIONS, TRAVEL_THEMES, SIGNATURE_JOURNEYS } from '../data/vietnamDestinations';
import { useLanguage } from './LanguageContext';
import { consultationConfig, buildConsultationPayload, quickSeed, resumeQuickDraft, resolveCanonicalDestinationId } from '../components/common/QuoteModal/consultationModel';
import { createConsultationAttempts } from '../services/consultationAttempts';
import { syntheticPolicy } from '../services/consultationIntake';

/**
 * Super EZ Tour — Unified Consultation System
 * Single Source of Truth for all consultation entry points.
 * Manages consultation draft lifecycle:
 * - OPEN_NEW_CONSULTATION: Start clean session with specific source context
 * - OPEN_EXPERIENCE_DRAWER: Open theme discovery drawer with clean theme draft
 * - UPDATE_CONSULTATION: Update draft fields in-flight
 * - CONTINUE_FROM_DRAWER: Seamlessly carry theme & customizations into QuoteModal
 * - CLOSE_CONSULTATION: Dismiss modal/drawer cleanly without stale state leakage
 * - QUICK_DRAFT: Resume or discard a destination-scoped draft in memory
 */

const ConsultationContext = createContext(null);

export { resolveCanonicalDestinationId };

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

export const ConsultationProvider = ({ children }) => {
  const { isKorean } = useLanguage();

  // Consultation UI status
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(null);

  // Single Source of Truth: The current consultation draft
  const [draft, setDraft] = useState(() => createInitialDraft(isKorean));
  const [quickDrafts, setQuickDrafts] = useState({});
  const [quickId, setQuickId] = useState(null);
  const [quickEntry, setQuickEntry] = useState(null);
  const [submissions, setSubmissions] = useState({});
  const [attempts] = useState(() => createConsultationAttempts({
    publish: (id, submission) => setSubmissions((previous) => ({ ...previous, [id]: submission })),
    accepted: (id, draftId) => setQuickDrafts((previous) => {
      if (previous[id]?.requestId !== draftId) return previous;
      const next = { ...previous };
      delete next[id];
      return next;
    }),
  }));
  const triggerRef = useRef(null);

  const startQuick = useCallback((legacy, options = {}) => {
    const id = legacy.destinationId;
    if (!consultationConfig[id]?.quick) {
      setQuickId(null);
      setQuickEntry(null);
      return;
    }
    const seed = quickSeed({ ...legacy, route: window.location.pathname }, options);
    setQuickEntry({ destinationId: id, ...seed.entry });
    if (attempts.canEdit(id)) {
      setQuickDrafts((previous) => ({ ...previous, [id]: resumeQuickDraft(previous[id], seed, options) }));
    }
    setQuickId(id);
  }, [attempts]);

  const editQuick = useCallback((key, value) => {
    if (!attempts.canEdit(quickId)) return;
    setQuickDrafts((previous) => {
      const current = previous[quickId];
      if (!current) return previous;
      return { ...previous, [quickId]: { ...current, [key]: value, edited: { ...current.edited, [key]: true } } };
    });
  }, [quickId, attempts]);

  const resolveQuickConflict = useCallback((apply) => {
    if (!attempts.canEdit(quickId)) return;
    setQuickDrafts((previous) => {
      const current = previous[quickId];
      if (!current?.pending) return previous;
      return { ...previous, [quickId]: { ...current, ...(apply ? current.pending : {}), pending: null } };
    });
  }, [quickId, attempts]);

  const discardQuick = useCallback(() => {
    if (!attempts.reset(quickId)) return;
    setQuickDrafts(({ [quickId]: discarded, ...remaining }) => remaining);
    setModalOpen(false);
  }, [quickId, attempts]);

  const newQuickInquiry = useCallback(() => {
    if (!quickEntry || quickEntry.route !== window.location.pathname || !attempts.reset(quickId)) return;
    const seed = quickSeed({ ...draft, ...quickEntry, specialRequests: '', sessionId: crypto.randomUUID() });
    setQuickDrafts((previous) => ({ ...previous, [quickId]: seed }));
  }, [quickId, quickEntry, draft, attempts]);

  const quickDraft = quickDrafts[quickId];
  const submission = submissions[quickId];
  const quickPolicy = syntheticPolicy(quickDraft, quickEntry);
  const showQuickReceipt = submission?.state === 'success' && quickEntry?.route === window.location.pathname && !!syntheticPolicy({
    destinationId: quickId, entry: quickEntry,
  }, quickEntry);
  const canSendHere = !!quickPolicy && quickEntry.route === window.location.pathname;

  const submitQuick = useCallback((locale) => {
    if (!canSendHere || !attempts.canEdit(quickId) || quickDraft.pending) return { status: 'unavailable' };
    const result = buildConsultationPayload(quickDraft, { config: quickPolicy, locale });
    if (result.status === 'valid') {
      attempts.submit(quickId, result.payload);
      return { status: 'pending' };
    }
    return result;
  }, [canSendHere, attempts, quickId, quickDraft, quickPolicy]);

  const retryQuick = useCallback(() => {
    if (canSendHere) attempts.retry(quickId);
  }, [attempts, canSendHere, quickId]);

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

    triggerRef.current = document.activeElement;
    startQuick(newDraft, options);
    setDraft(newDraft);
    setActiveTheme(null);
    setDrawerOpen(false);
    setModalOpen(true);
  }, [isKorean, getDestinationName, startQuick]);

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
    triggerRef.current = document.activeElement;
    const destId = resolveCanonicalDestinationId(customizations.destinationId || draft.destinationId);
    const nextDraft = {
      ...draft,
      destinationId: destId,
      destinationName: getDestinationName(destId),
      duration: customizations.duration || draft.duration,
      travelers: customizations.travelers || customizations.groupSize || draft.travelers,
      specialRequests: customizations.specialRequests ?? draft.specialRequests,
    };
    setDraft(nextDraft);
    startQuick(nextDraft, { duration: nextDraft.duration });

    // Close drawer and immediately open QuoteModal
    setDrawerOpen(false);
    setModalOpen(true);
  }, [draft, getDestinationName, startQuick]);

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
    quickDraft,
    quickPolicy,
    submission,
    showQuickReceipt,
    submitQuick,
    retryQuick,
    newQuickInquiry,
    editQuick,
    resolveQuickConflict,
    discardQuick,
    triggerRef,
    
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
    quickDraft,
    quickPolicy,
    submission,
    showQuickReceipt,
    submitQuick,
    retryQuick,
    newQuickInquiry,
    editQuick,
    resolveQuickConflict,
    discardQuick,
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

