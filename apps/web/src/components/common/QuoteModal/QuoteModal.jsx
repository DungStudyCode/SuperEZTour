import React, { useState, useEffect, useRef, useMemo, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import {
  X,
  Phone,
  MessageCircle,
  MessageSquare,
  Users,
  Clock,
  Calendar,
  Sparkles,
  MapPin,
  User,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { VIETNAM_DESTINATIONS } from '../../../data/vietnamDestinations';
import { useLanguage } from '../../../context/LanguageContext';
import { useConsultation, resolveCanonicalDestinationId } from '../../../context/ConsultationContext';
import { getLenis } from '../../../utils/lenisManager';
import { submitConsultation, unavailableCopy } from './consultationModel';
import './QuoteModal.css';

/**
 * Super EZ Tour — Unified QuoteModal
 * Single form component for submitting private travel consultation requests.
 * Fully synchronized with ConsultationContext and ExperienceDetailDrawer.
 */
const LegacyQuoteForm = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  defaultDestination = '',
}) => {
  const { t, isKorean } = useLanguage();
  const {
    draft,
    modalOpen: contextModalOpen,
    updateConsultation,
    closeConsultation,
  } = useConsultation();

  // Resolve effective open status and close handler
  const isOpen = propIsOpen !== undefined ? propIsOpen : contextModalOpen;
  const handleClose = propOnClose || closeConsultation;

  const modalRef = useRef(null);

  // Form State initialized strictly from ConsultationContext draft
  const [formData, setFormData] = useState({
    destinationId: draft.destinationId || resolveCanonicalDestinationId(defaultDestination) || '',
    name: draft.customerName || '',
    contactMethod: draft.contactMethod || (defaultDestination === 'kakao' ? 'kakao' : 'phone'),
    countryCode: draft.countryCode || (isKorean ? '+82' : '+84'),
    phone: draft.phone || '',
    kakaoId: draft.kakaoId || '',
    zaloAccount: draft.zaloAccount || '',
    travelGroup: draft.travelers || '2',
    travelDuration: draft.duration || '4d3n',
    customDuration: draft.customDuration || '',
    travelDate: draft.departureDate || '',
    notes: draft.specialRequests || '',
    agreePrivacy: draft.consent || false,
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  // Re-sync form state whenever a new consultation session starts or modal opens
  useEffect(() => {
    if (isOpen) {

      setSubmitError(null);
      setErrors({});

      const resolvedDest = draft.destinationId || resolveCanonicalDestinationId(defaultDestination) || '';

      setFormData((prev) => ({
        ...prev,
        destinationId: resolvedDest,
        name: draft.customerName || prev.name || '',
        contactMethod: draft.contactMethod || (defaultDestination === 'kakao' ? 'kakao' : prev.contactMethod),
        countryCode: draft.countryCode || prev.countryCode || (isKorean ? '+82' : '+84'),
        phone: draft.phone || prev.phone || '',
        kakaoId: draft.kakaoId || prev.kakaoId || '',
        zaloAccount: draft.zaloAccount || prev.zaloAccount || '',
        travelGroup: draft.travelers || prev.travelGroup || '2',
        travelDuration: draft.duration || prev.travelDuration || '4d3n',
        customDuration: draft.customDuration || prev.customDuration || '',
        travelDate: draft.departureDate || prev.travelDate || '',
        // STRICTLY preserve user's typed notes only — no stale tour descriptions!
        notes: draft.specialRequests || '',
        agreePrivacy: draft.consent || false,
      }));
    }
  }, [isOpen, draft.sessionId, defaultDestination]);

  // Keep country code synced with language toggle if phone is empty
  useEffect(() => {
    setFormData((prev) => {
      if (!prev.phone) {
        return {
          ...prev,
          countryCode: isKorean ? '+82' : '+84',
        };
      }
      return prev;
    });
  }, [isKorean]);

  const todayString = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    // Keep ConsultationContext synchronized in real-time
    if (name === 'destinationId') {
      updateConsultation({ destinationId: val });
    } else if (name === 'travelDuration') {
      updateConsultation({ duration: val });
    } else if (name === 'travelGroup') {
      updateConsultation({ travelers: val });
    } else if (name === 'notes') {
      updateConsultation({ specialRequests: val });
    } else if (name === 'name') {
      updateConsultation({ customerName: val });
    }

    // Clear inline error when user interacts with field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (name === 'phone' || name === 'kakaoId' || name === 'zaloAccount') {
      if (errors.contact) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.contact;
          return next;
        });
      }
    }
  };

  const handleMethodChange = (method) => {
    setFormData((prev) => ({ ...prev, contactMethod: method }));
    updateConsultation({ contactMethod: method });
    if (errors.contact) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.contact;
        return next;
      });
    }
  };

  const isDirty = Boolean(
    (formData.name && formData.name.trim()) ||
    (formData.phone && formData.phone.trim()) ||
    (formData.kakaoId && formData.kakaoId.trim()) ||
    (formData.zaloAccount && formData.zaloAccount.trim()) ||
    (formData.notes && formData.notes.trim())
  );

  const handleBackdropClick = (e) => {
    if (e.target !== e.currentTarget) return;
    // Prevent accidental dismissal if user typed personal data
    if (isDirty) {
      return;
    }
    handleResetAndClose();
  };

  const handleResetAndClose = () => {

    setSubmitError(null);
    setErrors({});
    handleClose();
  };

  // Resolve current active destination
  const effectiveDestId = formData.destinationId || draft.destinationId;
  const selectedDest = VIETNAM_DESTINATIONS.find((d) => d.id === effectiveDestId);
  const destDisplayName = selectedDest
    ? (isKorean ? selectedDest.nameKr : selectedDest.nameVi || selectedDest.name)
    : (effectiveDestId ? effectiveDestId : '');

  // Resolve smart placeholder based on theme or tour
  const contextualPlaceholder = useMemo(() => {
    if (draft.themeId) {
      const themeSpecific = t(`modal.notesPlaceholders.${draft.themeId}`);
      if (themeSpecific && !themeSpecific.startsWith('modal.')) {
        return themeSpecific;
      }
    }
    return t(
      'modal.notesPlaceholder',
      isKorean
        ? '예: 5성급 호텔, 전용 차량, 전담 가이드, 현지 미식 체험 등'
        : 'Ví dụ: Khách sạn 5 sao, xe riêng, hướng dẫn viên chuyên tuyến, trải nghiệm ẩm thực...'
    );
  }, [draft.themeId, isKorean, t]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (import.meta.env.PROD) return;

    const newErrors = {};

    // 0. Validate Destination selection if none chosen
    if (!formData.destinationId) {
      newErrors.destinationId = t(
        'modal.destRequired',
        isKorean ? '희망 여행지를 선택해 주세요' : 'Vui lòng chọn điểm đến du lịch'
      );
    }

    // 1. Validate Name
    if (!formData.name.trim()) {
      newErrors.name = t(
        'modal.nameRequired',
        isKorean ? '성함을 입력해 주세요' : 'Vui lòng nhập họ và tên của bạn'
      );
    }

    // 2. Validate Contact
    if (formData.contactMethod === 'phone') {
      const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
      if (!cleanPhone || cleanPhone.length < 8) {
        newErrors.contact = t(
          'modal.phoneRequired',
          isKorean
            ? '올바른 전화번호를 입력해 주세요'
            : 'Vui lòng nhập số điện thoại liên hệ hợp lệ'
        );
      }
    } else if (formData.contactMethod === 'kakao') {
      if (!formData.kakaoId.trim() || formData.kakaoId.trim().length < 2) {
        newErrors.contact = t(
          'modal.kakaoRequired',
          isKorean
            ? '카카오톡 ID를 입력해 주세요'
            : 'Vui lòng nhập ID KakaoTalk của bạn'
        );
      }
    } else if (formData.contactMethod === 'zalo') {
      if (!formData.zaloAccount.trim() || formData.zaloAccount.trim().length < 3) {
        newErrors.contact = t(
          'modal.zaloRequired',
          isKorean
            ? 'Zalo 번호를 입력해 주세요'
            : 'Vui lòng nhập số điện thoại Zalo của bạn'
        );
      }
    }

    // 3. Validate Date (Cannot be past date)
    if (formData.travelDate && formData.travelDate < todayString) {
      newErrors.date = t(
        'modal.datePastError',
        isKorean
          ? '출발일은 오늘 이후 날짜를 선택해 주세요'
          : 'Ngày khởi hành không thể ở trong quá khứ'
      );
    }

    // 4. Validate Privacy Consent
    if (!formData.agreePrivacy) {
      newErrors.privacy = t(
        'modal.privacyRequired',
        isKorean
          ? '상담 진행을 위해 개인정보 수집 및 이용에 동의해 주세요'
          : 'Vui lòng xác nhận đồng ý để chúng tôi có thể liên hệ tư vấn cho bạn'
      );
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (modalRef.current) {
        const firstErrField = modalRef.current.querySelector('.is-invalid, .privacy-checkbox');
        if (firstErrField && firstErrField.focus) {
          firstErrField.focus();
        }
      }
      return;
    }

    setSubmitError(submitConsultation().status);
  };

  if (!isOpen) return null;

  return (
    <div
      className="quote-modal-overlay"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="quote-modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        aria-describedby="quote-modal-desc"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="quote-modal-close"
          onClick={handleResetAndClose}
          aria-label={t('modal.closeAria', isKorean ? '상담 창 닫기' : 'Đóng cửa sổ tư vấn')}
        >
          <X size={20} />
        </button>

          <form className="quote-modal-form" onSubmit={handleSubmit} noValidate>
            <p className="submit-error-banner" role="status">{unavailableCopy[isKorean ? 'ko' : 'vi']}</p>
            {/* Header */}
            <div className="quote-modal-header">
              <span className="modal-eyebrow">
                {t('modal.eyebrow', 'SUPER EZ TOUR · PRIVATE JOURNEYS')}
              </span>
              <h2 id="quote-modal-title" className="modal-title">
                {t(
                  'modal.title',
                  isKorean ? '나만을 위한 여행 상담' : 'Thiết kế hành trình riêng của bạn'
                )}
              </h2>
              <p id="quote-modal-desc" className="modal-subtitle">
                {t(
                  'modal.subtitle',
                  isKorean
                    ? '원하시는 여행 계획을 알려주시면 취향에 맞는 여행을 안내해 드립니다.'
                    : 'Chia sẻ kế hoạch du lịch, chúng tôi sẽ tư vấn trải nghiệm phù hợp với bạn.'
                )}
              </p>
            </div>

            {/* Compact Consultation Context Summary Card (if context is present) */}
            {Boolean(draft.themeTitle || draft.journeyTitle || destDisplayName) && (
              <div className="consultation-context-summary">
                <div className="summary-badge-row">
                  <span className="summary-eyebrow">
                    <Sparkles size={12} className="text-gold" />
                    <span>{t('modal.interestedTripTitle', isKorean ? '관심 있는 여행' : 'CHUYẾN ĐI BẠN ĐANG QUAN TÂM')}</span>
                  </span>
                  <span className="summary-guarantee-tag">
                    <ShieldCheck size={12} />
                    <span>{t('modal.summaryGuarantee', isKorean ? '100% 단독 투어' : '100% Tour riêng')}</span>
                  </span>
                </div>
                <div className="summary-details-row">
                  {draft.themeTitle && (
                    <div className="summary-chip">
                      <span className="chip-key">{t('modal.summaryTheme', isKorean ? '테마:' : 'Chủ đề:')}</span>
                      <strong className="chip-val">{draft.themeTitle}</strong>
                    </div>
                  )}
                  {draft.journeyTitle && (
                    <div className="summary-chip">
                      <span className="chip-key">{t('modal.summaryJourney', isKorean ? '여정:' : 'Hành trình:')}</span>
                      <strong className="chip-val">{draft.journeyTitle}</strong>
                    </div>
                  )}
                  {destDisplayName && (
                    <div className="summary-chip">
                      <span className="chip-key">{t('modal.summaryDestination', isKorean ? '희망 여행지:' : 'Điểm đến:')}</span>
                      <strong className="chip-val">{destDisplayName}</strong>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="form-fields-grid">
              {/* FIELD 01 — DESTINATION */}
              <div className="form-group full-width">
                <label htmlFor="quote-dest-select" className="form-label">
                  <MapPin size={15} className="label-icon text-gold" />
                  <span>{t('modal.destLabel', isKorean ? '희망 여행지' : 'Điểm đến mong muốn')}</span>
                  <span className="required-mark" aria-hidden="true">*</span>
                </label>
                <div className="select-input-wrapper">
                  <select
                    id="quote-dest-select"
                    name="destinationId"
                    className={`form-select ${errors.destinationId ? 'is-invalid' : ''}`}
                    value={formData.destinationId}
                    onChange={handleChange}
                  >
                    {!formData.destinationId && (
                      <option value="">
                        {t('modal.selectDestinationPrompt', isKorean ? '— 여행하실 목적지를 선택해 주세요 —' : '— Chọn điểm đến bạn muốn khám phá —')}
                      </option>
                    )}
                    {VIETNAM_DESTINATIONS.map((d) => {
                      const destName = isKorean ? d.nameKr : d.nameVi || d.name;
                      const regionLabel = isKorean ? d.regionKr : d.regionVi;
                      return (
                        <option key={d.id} value={d.id}>
                          {destName} ({d.name}) — [{regionLabel}]
                        </option>
                      );
                    })}
                  </select>
                </div>
                {errors.destinationId && (
                  <span className="field-error-msg" role="alert">
                    {errors.destinationId}
                  </span>
                )}
              </div>

              {/* FIELD 02 — FULL NAME */}
              <div className="form-group">
                <label htmlFor="quote-name-input" className="form-label">
                  <User size={15} className="label-icon text-gold" />
                  <span>{t('modal.nameLabel', isKorean ? '성함' : 'Họ và tên')}</span>
                  <span className="required-mark" aria-hidden="true">*</span>
                </label>
                <input
                  id="quote-name-input"
                  type="text"
                  disabled={import.meta.env.PROD}
                  name="name"
                  autoComplete="name"
                  placeholder={t(
                    'modal.namePlaceholder',
                    isKorean ? '성함을 입력해 주세요' : 'Nhập họ và tên'
                  )}
                  className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'quote-name-error' : undefined}
                />
                {errors.name && (
                  <span id="quote-name-error" className="field-error-msg" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* FIELD 03 — CONTACT METHOD & VALUE */}
              <div className="form-group">
                <label className="form-label">
                  <Phone size={15} className="label-icon text-gold" />
                  <span>{t('modal.contactMethodLabel', isKorean ? '연락 방법' : 'Phương thức liên hệ')}</span>
                  <span className="required-mark" aria-hidden="true">*</span>
                </label>

                {/* Segmented Radio Tabs */}
                <div
                  className="contact-method-tabs"
                  role="radiogroup"
                  aria-label={t('modal.contactMethodLabel', 'Contact method')}
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={formData.contactMethod === 'phone'}
                    className={`method-tab-btn ${formData.contactMethod === 'phone' ? 'is-active' : ''}`}
                    onClick={() => handleMethodChange('phone')}
                  >
                    <Phone size={12} />
                    <span>{t('modal.methodPhone', isKorean ? '전화번호' : 'Số điện thoại')}</span>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={formData.contactMethod === 'kakao'}
                    className={`method-tab-btn ${formData.contactMethod === 'kakao' ? 'is-active' : ''}`}
                    onClick={() => handleMethodChange('kakao')}
                  >
                    <MessageCircle size={12} />
                    <span>{t('modal.methodKakao', 'KakaoTalk')}</span>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={formData.contactMethod === 'zalo'}
                    className={`method-tab-btn ${formData.contactMethod === 'zalo' ? 'is-active' : ''}`}
                    onClick={() => handleMethodChange('zalo')}
                  >
                    <MessageSquare size={12} />
                    <span>{t('modal.methodZalo', 'Zalo')}</span>
                  </button>
                </div>

                {/* Method-specific Input */}
                {formData.contactMethod === 'phone' && (
                  <div className="phone-input-group">
                    <select
                      name="countryCode"
                      className="form-select country-code-select"
                      value={formData.countryCode}
                      onChange={handleChange}
                      aria-label={t('modal.countryCodeLabel', isKorean ? '국가번호' : 'Mã quốc gia')}
                    >
                      <option value="+82">🇰🇷 +82</option>
                      <option value="+84">🇻🇳 +84</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+">🌐 +</option>
                    </select>
                    <input
                      type="tel"
                      disabled={import.meta.env.PROD}
                  name="phone"
                      autoComplete="tel"
                      placeholder={t(
                        'modal.phonePlaceholder',
                        isKorean ? '예: 010-1234-5678' : 'Ví dụ: 0912 345 678'
                      )}
                      className={`form-input phone-number-input ${errors.contact ? 'is-invalid' : ''}`}
                      value={formData.phone}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={errors.contact ? 'quote-contact-error' : undefined}
                    />
                  </div>
                )}

                {formData.contactMethod === 'kakao' && (
                  <input
                    type="text"
                    disabled={import.meta.env.PROD}
                  name="kakaoId"
                    placeholder={t(
                      'modal.kakaoPlaceholder',
                      isKorean ? '카카오톡 ID를 입력해 주세요' : 'Nhập ID KakaoTalk của bạn'
                    )}
                    className={`form-input ${errors.contact ? 'is-invalid' : ''}`}
                    value={formData.kakaoId}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={errors.contact ? 'quote-contact-error' : undefined}
                  />
                )}

                {formData.contactMethod === 'zalo' && (
                  <input
                    type="text"
                    disabled={import.meta.env.PROD}
                  name="zaloAccount"
                    placeholder={t(
                      'modal.zaloPlaceholder',
                      isKorean
                        ? 'Zalo 번호 또는 계정을 입력해 주세요'
                        : 'Nhập số điện thoại Zalo của bạn'
                    )}
                    className={`form-input ${errors.contact ? 'is-invalid' : ''}`}
                    value={formData.zaloAccount}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={errors.contact ? 'quote-contact-error' : undefined}
                  />
                )}

                {errors.contact && (
                  <span id="quote-contact-error" className="field-error-msg" role="alert">
                    {errors.contact}
                  </span>
                )}
              </div>

              {/* FIELD 04 — TRAVELERS */}
              <div className="form-group">
                <label htmlFor="quote-group-select" className="form-label">
                  <Users size={15} className="label-icon text-gold" />
                  <span>{t('modal.groupLabel', isKorean ? '여행 인원' : 'Số lượng khách')}</span>
                </label>
                <div className="select-input-wrapper">
                  <select
                    id="quote-group-select"
                    name="travelGroup"
                    className="form-select"
                    value={formData.travelGroup}
                    onChange={handleChange}
                  >
                    <option value="1">
                      {t('modal.groupOptions.1', isKorean ? '1명' : '1 người')}
                    </option>
                    <option value="2">
                      {t('modal.groupOptions.2', isKorean ? '2명' : '2 người')}
                    </option>
                    <option value="3-5">
                      {t('modal.groupOptions.3-5', isKorean ? '3~5명' : '3–5 người')}
                    </option>
                    <option value="6-10">
                      {t('modal.groupOptions.6-10', isKorean ? '6~10명' : '6–10 người')}
                    </option>
                    <option value="10+">
                      {t('modal.groupOptions.10+', isKorean ? '10명 초과' : 'Trên 10 người')}
                    </option>
                  </select>
                </div>
              </div>

              {/* FIELD 05 — TRAVEL DURATION */}
              <div className="form-group">
                <label htmlFor="quote-duration-select" className="form-label">
                  <Clock size={15} className="label-icon text-gold" />
                  <span>{t('modal.durationLabel', isKorean ? '여행 기간' : 'Thời gian du lịch')}</span>
                </label>
                <div className="select-input-wrapper">
                  <select
                    id="quote-duration-select"
                    name="travelDuration"
                    className="form-select"
                    value={formData.travelDuration}
                    onChange={handleChange}
                  >
                    <option value="flexible">
                      {t('modal.durationOptions.flexible', isKorean ? '미정' : 'Chưa xác định')}
                    </option>
                    <option value="3d2n">
                      {t('modal.durationOptions.3d2n', isKorean ? '2박 3일' : '3 ngày 2 đêm')}
                    </option>
                    <option value="4d3n">
                      {t('modal.durationOptions.4d3n', isKorean ? '3박 4일' : '4 ngày 3 đêm')}
                    </option>
                    <option value="5d4n">
                      {t('modal.durationOptions.5d4n', isKorean ? '4박 5일' : '5 ngày 4 đêm')}
                    </option>
                    <option value="6d5n">
                      {t('modal.durationOptions.6d5n', isKorean ? '5박 6일' : '6 ngày 5 đêm')}
                    </option>
                    <option value="custom">
                      {t('modal.durationOptions.custom', isKorean ? '기타' : 'Khác')}
                    </option>
                  </select>
                </div>
              </div>

              {/* Optional Custom Duration Input */}
              {formData.travelDuration === 'custom' && (
                <div className="form-group full-width custom-duration-field">
                  <input
                    type="text"
                    name="customDuration"
                    placeholder={t(
                      'modal.durationCustomPlaceholder',
                      isKorean
                        ? '예: 6박 7일 또는 자유 일정...'
                        : 'Ví dụ: 7 ngày 6 đêm hoặc thời gian tự do...'
                    )}
                    className="form-input"
                    value={formData.customDuration}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* FIELD 06 — DEPARTURE DATE */}
              <div className="form-group full-width">
                <label htmlFor="quote-date-input" className="form-label">
                  <Calendar size={15} className="label-icon text-gold" />
                  <span>{t('modal.dateLabel', isKorean ? '출발 예정일' : 'Ngày khởi hành dự kiến')}</span>
                  <span className="optional-tag">
                    {t('modal.dateOptional', isKorean ? '(선택사항)' : '(Không bắt buộc)')}
                  </span>
                </label>
                <input
                  id="quote-date-input"
                  type="date"
                  name="travelDate"
                  min={todayString}
                  className={`form-input ${errors.date ? 'is-invalid' : ''}`}
                  value={formData.travelDate}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? 'quote-date-error' : undefined}
                />
                {errors.date && (
                  <span id="quote-date-error" className="field-error-msg" role="alert">
                    {errors.date}
                  </span>
                )}
              </div>

              {/* FIELD 07 — SPECIAL REQUESTS (User Input Only) */}
              <div className="form-group full-width">
                <label htmlFor="quote-notes-input" className="form-label">
                  <Sparkles size={15} className="label-icon text-gold" />
                  <span>{t('modal.notesLabel', isKorean ? '추가 요청사항' : 'Mong muốn đặc biệt')}</span>
                  <span className="optional-tag">
                    {t('modal.dateOptional', isKorean ? '(선택사항)' : '(Không bắt buộc)')}
                  </span>
                </label>
                <textarea
                  id="quote-notes-input"
                  disabled={import.meta.env.PROD}
                  name="notes"
                  rows={3}
                  placeholder={contextualPlaceholder}
                  className="form-textarea"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              {/* FIELD 08 — PRIVACY CONSENT & NOTICE */}
              <div className="form-group full-width privacy-consent-group">
                <label className="privacy-checkbox-label">
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onChange={handleChange}
                    className="privacy-checkbox"
                    aria-invalid={Boolean(errors.privacy)}
                    aria-describedby={errors.privacy ? 'quote-privacy-error' : undefined}
                  />
                  <span className="privacy-label-text">
                    {t(
                        'modal.previewPrivacy',
                        isKorean ? '입력 내용이 전송되지 않음을 확인했습니다.' : 'Tôi hiểu nội dung nhập sẽ chưa được gửi.'
                    )}
                  </span>
                </label>
                {errors.privacy && (
                  <span id="quote-privacy-error" className="field-error-msg" role="alert">
                    {errors.privacy}
                  </span>
                )}
                <p className="privacy-disclaimer">
                  {t(
                    'modal.privacyPending',
                    isKorean
                      ? '개인정보 수집 및 이용 안내를 준비하고 있습니다.'
                      : 'Thông tin về thu thập và sử dụng dữ liệu đang được chuẩn bị.'
                  )}
                </p>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="modal-actions">
              {submitError && (
                <div className="submit-error-banner" role="alert">
                  <span>{unavailableCopy[isKorean ? 'ko' : 'vi']}</span>
                </div>
              )}

              <button
                type="submit"
                className="quote-submit-btn"
                disabled={import.meta.env.PROD}
              >
                {t('modal.submitBtn', isKorean ? '상담 신청하기' : 'Gửi yêu cầu tư vấn')}
                <ArrowRight size={17} className="quote-submit-arrow" />
              </button>
            </div>
          </form>
      </div>
    </div>
  );
};

const QuickConsultationForm = lazy(() => import('./QuickConsultationForm'));

export default function QuoteModal({ isOpen, onClose, defaultDestination }) {
  const { modalOpen, closeConsultation, triggerRef, draft, quickDraft, showQuickReceipt } = useConsultation();
  const { isKorean } = useLanguage();
  const host = useRef(null);
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  const open = isOpen ?? modalOpen;
  const close = onClose || closeConsultation;

  useEffect(() => {
    if (previousPath.current !== pathname && open) close();
    previousPath.current = pathname;
  }, [pathname, open, close]);

  useEffect(() => {
    if (!open) return;
    const node = host.current;
    const trigger = triggerRef.current || document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const siblings = [...node.parentElement.children].filter((el) => el !== node && !el.inert);
    siblings.forEach((el) => { el.inert = true; });
    document.body.style.overflow = 'hidden';
    const lenis = getLenis();
    const wasRunning = lenis && !lenis.isStopped;
    if (wasRunning) lenis.stop();
    node.querySelector('[data-initial-focus], .quote-modal-close')?.focus({ preventScroll: true });

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
      if (event.key !== 'Tab') return;
      const focusable = [...node.querySelectorAll('button, a[href], input, select, textarea, [tabindex]')]
        .filter((el) => el.tabIndex >= 0 && !el.disabled && el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const index = focusable.indexOf(document.activeElement);
      if (index === -1 || (event.shiftKey ? index === 0 : index === focusable.length - 1)) {
        event.preventDefault();
        (event.shiftKey ? focusable.at(-1) : focusable[0]).focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      siblings.forEach((el) => { el.inert = false; });
      document.body.style.overflow = previousOverflow;
      if (wasRunning && getLenis() === lenis) lenis.start();
      const hiddenDrawer = trigger?.closest('.dest-mobile-drawer, .mobile-menu-overlay, .exp-drawer-portal');
      const usable = trigger?.isConnected && !hiddenDrawer && trigger.getClientRects().length && getComputedStyle(trigger).visibility !== 'hidden';
      const visible = (el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
      const fallback = [...document.querySelectorAll('.dest-mobile-toggle, .mobile-menu-toggle')].find(visible)
        || [...document.querySelectorAll('.dest-header-btn-quote, header a, header button')].find(visible);
      (usable ? trigger : fallback)?.focus({ preventScroll: true });
    };
  }, [open, close, triggerRef]);

  if (!open) return null;
  return (
    <div ref={host} className="consultation-host" data-lenis-prevent>
      {quickDraft || showQuickReceipt ? (
        <Suspense fallback={<div className="quote-modal-overlay">
          <div className="quote-modal-content" role="dialog" aria-modal="true" aria-label={isKorean ? '프라이빗 투어 상담' : 'Tư vấn tour riêng'}>
            <button type="button" className="quote-modal-close" onClick={close} aria-label={isKorean ? '닫기' : 'Đóng'}><X /></button>
          </div>
        </div>}>
          <QuickConsultationForm onClose={close} />
        </Suspense>
      ) : (
        <LegacyQuoteForm key={draft.sessionId} isOpen onClose={close} defaultDestination={defaultDestination} />
      )}
    </div>
  );
}
