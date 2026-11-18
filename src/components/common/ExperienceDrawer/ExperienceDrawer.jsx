import React, { useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { VIETNAM_DESTINATIONS } from '../../../data/vietnamDestinations';
import { useLanguage } from '../../../context/LanguageContext';
import { useConsultation } from '../../../context/ConsultationContext';
import './ExperienceDrawer.css';

/**
 * Super EZ Tour — Experience Detail Drawer
 * Concept: Light Luxury Travel Editorial — Personalized Journey Discovery
 * Slide-in Right Drawer (Desktop) / Bottom Sheet (Mobile)
 * Single Source of Truth connected directly to ConsultationContext.
 */
const ExperienceDrawer = ({
  theme: propTheme,
  isOpen: propIsOpen,
  onClose: propOnClose,
  onRequestQuote: propOnRequestQuote,
}) => {
  const { t, isKorean } = useLanguage();
  const {
    draft,
    activeTheme: contextTheme,
    drawerOpen: contextDrawerOpen,
    updateConsultation,
    continueFromDrawer,
    closeDrawerOnly,
  } = useConsultation();

  // Resolve effective values (supporting both context-driven and prop-driven modes)
  const theme = propTheme || contextTheme;
  const isOpen = propIsOpen !== undefined ? propIsOpen : contextDrawerOpen;
  const handleClose = propOnClose || closeDrawerOnly;

  const drawerRef = useRef(null);
  const closeBtnRef = useRef(null);
  const prevActiveElementRef = useRef(null);

  // Accessibility: Focus Trap, Body Scroll Lock, Escape Key
  useEffect(() => {
    if (!isOpen) return;

    prevActiveElementRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 60);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      // Simple focus trap inside drawer
      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (prevActiveElementRef.current && typeof prevActiveElementRef.current.focus === 'function') {
        prevActiveElementRef.current.focus();
      }
    };
  }, [isOpen, handleClose]);

  if (!isOpen || !theme) return null;

  const themeTitle = isKorean ? theme.titleKr : theme.titleVi;
  const themeDesc = isKorean ? theme.descKr : theme.descVi;
  const experiences = (isKorean ? theme.experiencesKr : theme.experiencesVi) || [];
  const placeholderText =
    (isKorean ? theme.placeholderKr : theme.placeholderVi) ||
    t(`modal.notesPlaceholders.${theme.id}`, t('modal.notesPlaceholder', 'Nhập yêu cầu đặc biệt...'));

  // Suggested destinations from theme registry
  const suggestedDestinations = (theme.suggestedDestinationIds || [])
    .map((id) => VIETNAM_DESTINATIONS.find((d) => d.id === id))
    .filter(Boolean);

  const durationOptions = [
    { id: '3d2n', label: t('experienceDrawer.durations.3d2n', isKorean ? '3박 4일 (3D2N)' : '3 Ngày 2 Đêm') },
    { id: '4d3n', label: t('experienceDrawer.durations.4d3n', isKorean ? '4박 5일 (4D3N)' : '4 Ngày 3 Đêm') },
    { id: '5d4n', label: t('experienceDrawer.durations.5d4n', isKorean ? '5박 6일 (5D4N)' : '5 Ngày 4 Đêm') },
    { id: 'custom', label: t('experienceDrawer.durations.custom', isKorean ? '맞춤 / 조율' : 'Khác / Tùy chỉnh') },
  ];

  const groupOptions = [
    { id: '2', label: t('experienceDrawer.groups.pair', isKorean ? '2인 (커플/친구)' : '2 khách (Cặp đôi)') },
    { id: '3-5', label: t('experienceDrawer.groups.family', isKorean ? '3~5인 (가족)' : '3 - 5 khách (Gia đình)') },
    { id: '6-10', label: t('experienceDrawer.groups.group', isKorean ? '6인 이상 (단체)' : '6+ khách (Đoàn riêng)') },
  ];

  const selectedDestId = draft.destinationId || theme.suggestedDestinationIds?.[0] || 'da-nang';
  const selectedDuration = draft.duration || '4d3n';
  const selectedGroup = draft.travelers || '3-5';
  const specialRequests = draft.specialRequests || '';

  const handleSelectDestination = (destId) => {
    updateConsultation({ destinationId: destId });
  };

  const handleSelectDuration = (durationId) => {
    updateConsultation({ duration: durationId });
  };

  const handleSelectGroup = (groupId) => {
    updateConsultation({ travelers: groupId });
  };

  const handleNotesChange = (e) => {
    updateConsultation({ specialRequests: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDestObj = VIETNAM_DESTINATIONS.find((d) => d.id === selectedDestId);
    const destName = selectedDestObj ? (isKorean ? selectedDestObj.nameKr : selectedDestObj.nameVi) : selectedDestId;

    // Continue directly in unified consultation state
    continueFromDrawer({
      destinationId: selectedDestId,
      duration: selectedDuration,
      travelers: selectedGroup,
      specialRequests: specialRequests.trim(),
    });

    // Backward-compatibility hook if consumer provided onRequestQuote prop
    if (propOnRequestQuote) {
      propOnRequestQuote({
        destinationId: selectedDestId,
        destinationName: destName,
        themeId: theme.id,
        themeTitle,
        duration: selectedDuration,
        groupSize: selectedGroup,
        notes: specialRequests.trim(),
      });
    }
  };

  return (
    <div
      className="exp-drawer-portal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exp-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="exp-drawer-backdrop"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        ref={drawerRef}
        className="exp-drawer-content"
      >
        {/* Header */}
        <div className="exp-drawer-header">
          <div className="exp-drawer-header-meta">
            <span className="exp-drawer-category">
              {theme.categoryEn || 'EXCLUSIVE TRAVEL THEME'}
            </span>
            <h2 id="exp-drawer-title" className="exp-drawer-title">
              {themeTitle}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="exp-drawer-close-btn"
            onClick={handleClose}
            aria-label={t('experienceDrawer.closeAria', 'Đóng chi tiết trải nghiệm')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="exp-drawer-scrollable">
          {/* Hero Image */}
          <div className="exp-drawer-hero">
            <img
              src={theme.image}
              alt={themeTitle}
              className="exp-drawer-hero-img"
              loading="lazy"
            />
            <div className="exp-drawer-hero-badge">
              <Sparkles size={13} className="text-gold" />
              <span>{isKorean ? '100% 단독 맞춤 여정' : '100% Private Customization'}</span>
            </div>
          </div>

          {/* Introduction */}
          <div className="exp-drawer-intro">
            <p className="exp-drawer-desc">{themeDesc}</p>
          </div>

          {/* Section: Customizable Experiences */}
          {experiences.length > 0 && (
            <div className="exp-drawer-section">
              <div className="exp-section-header">
                <div className="exp-section-title-wrap">
                  <Compass size={16} className="exp-section-icon" />
                  <h3 className="exp-section-title">
                    {t('experienceDrawer.experiencesTitle', 'Trải nghiệm có thể tùy chỉnh')}
                  </h3>
                </div>
                <p className="exp-section-subtitle">
                  {t(
                    'experienceDrawer.experiencesSubtitle',
                    'Tất cả trải nghiệm đều được điều chỉnh linh hoạt theo nhịp sinh hoạt và sở thích của bạn.'
                  )}
                </p>
              </div>

              <div className="exp-list">
                {experiences.map((item, idx) => (
                  <div key={idx} className="exp-list-item">
                    <span className="exp-item-bullet">
                      <CheckCircle2 size={15} />
                    </span>
                    <span className="exp-item-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Suggested Destinations */}
          {suggestedDestinations.length > 0 && (
            <div className="exp-drawer-section">
              <div className="exp-section-header">
                <div className="exp-section-title-wrap">
                  <MapPin size={16} className="exp-section-icon" />
                  <h3 className="exp-section-title">
                    {t('experienceDrawer.destinationsTitle', 'Điểm đến gợi ý')}
                  </h3>
                </div>
                <p className="exp-section-subtitle">
                  {t(
                    'experienceDrawer.destinationsSubtitle',
                    'Chọn điểm đến bạn muốn bắt đầu hành trình:'
                  )}
                </p>
              </div>

              <div className="exp-dest-chips" role="radiogroup" aria-label="Suggested destinations">
                {suggestedDestinations.map((dest) => {
                  const isSelected = selectedDestId === dest.id;
                  const destLabel = isKorean ? dest.nameKr : dest.nameVi;

                  return (
                    <button
                      key={dest.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`exp-dest-chip ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSelectDestination(dest.id)}
                    >
                      <MapPin size={13} className="exp-chip-pin" />
                      <span className="exp-chip-name">{destLabel}</span>
                      {isSelected && (
                        <span className="exp-chip-active-dot" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section: Customization Configurator */}
          <div className="exp-drawer-section exp-config-section">
            <div className="exp-section-header">
              <div className="exp-section-title-wrap">
                <Sparkles size={16} className="exp-section-icon" />
                <h3 className="exp-section-title">
                  {t('experienceDrawer.customizationTitle', 'Tùy chỉnh hành trình sơ bộ')}
                </h3>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="exp-form-group">
              <label className="exp-form-label">
                <Calendar size={14} />
                <span>{t('experienceDrawer.durationLabel', 'Thời gian dự kiến')}</span>
              </label>
              <div className="exp-pill-selector">
                {durationOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`exp-pill-opt ${selectedDuration === opt.id ? 'is-active' : ''}`}
                    onClick={() => handleSelectDuration(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Group Size Selector */}
            <div className="exp-form-group">
              <label className="exp-form-label">
                <Users size={14} />
                <span>{t('experienceDrawer.groupLabel', 'Số lượng thành viên')}</span>
              </label>
              <div className="exp-pill-selector">
                {groupOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`exp-pill-opt ${selectedGroup === opt.id ? 'is-active' : ''}`}
                    onClick={() => handleSelectGroup(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Notes / Smart Placeholder */}
            <div className="exp-form-group">
              <label htmlFor="exp-custom-notes" className="exp-form-label">
                <MessageSquare size={14} />
                <span>{t('experienceDrawer.notesLabel', 'Yêu cầu đặc biệt cho chuyến đi')}</span>
              </label>
              <textarea
                id="exp-custom-notes"
                className="exp-form-textarea"
                rows={3}
                placeholder={placeholderText}
                value={specialRequests}
                onChange={handleNotesChange}
              />
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="exp-drawer-footer">
          <button
            type="button"
            className="exp-drawer-submit-btn"
            onClick={handleSubmit}
          >
            <span>{t('experienceDrawer.btnSubmit', 'Yêu cầu thiết kế hành trình riêng')}</span>
            <ArrowRight size={16} />
          </button>
          <div className="exp-drawer-trust">
            <ShieldCheck size={14} className="text-gold" />
            <span>
              {t(
                'experienceDrawer.trustSubtext',
                '100% Tour riêng · Xe riêng & HDV chuyên tuyến · Báo giá trong 30 phút'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDrawer;
