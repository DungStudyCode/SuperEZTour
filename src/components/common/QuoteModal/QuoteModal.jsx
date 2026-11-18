import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X,
  Send,
  Phone,
  MessageCircle,
  MessageSquare,
  Users,
  Clock,
  Calendar,
  Sparkles,
  CheckCircle,
  MapPin,
  User,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { VIETNAM_DESTINATIONS } from '../../../data/vietnamDestinations';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import { useLanguage } from '../../../context/LanguageContext';
import { useConsultation, resolveCanonicalDestinationId } from '../../../context/ConsultationContext';
import './QuoteModal.css';

const DURATION_LABELS = {
  flexible: { vi: 'Chưa xác định', ko: '미정' },
  '3d2n': { vi: '3 ngày 2 đêm', ko: '2박 3일' },
  '4d3n': { vi: '4 ngày 3 đêm', ko: '3박 4일' },
  '5d4n': { vi: '5 ngày 4 đêm', ko: '4박 5일' },
  '6d5n': { vi: '6 ngày 5 đêm', ko: '5박 6일' },
  custom: { vi: 'Khác', ko: '기타' },
};

const GROUP_LABELS = {
  '1': { vi: '1 người', ko: '1명' },
  '2': { vi: '2 người', ko: '2명' },
  '3-5': { vi: '3–5 người', ko: '3~5명' },
  '6-10': { vi: '6–10 người', ko: '6~10명' },
  '10+': { vi: 'Trên 10 người', ko: '10명 초과' },
};

/**
 * Super EZ Tour — Unified QuoteModal
 * Single form component for submitting private travel consultation requests.
 * Fully synchronized with ConsultationContext and ExperienceDetailDrawer.
 */
const QuoteModal = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  onAddQuote,
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
  const closeBtnRef = useRef(null);
  const prevActiveElementRef = useRef(null);

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Re-sync form state whenever a new consultation session starts or modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
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

  // Accessibility: Focus trap & Escape key listener & Body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    prevActiveElementRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleResetAndClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusable = Array.from(
          modalRef.current.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      if (document.body) {
        document.body.style.overflow = '';
      }
      try {
        if (prevActiveElementRef.current && typeof prevActiveElementRef.current.focus === 'function') {
          prevActiveElementRef.current.focus();
        }
      } catch (err) {
        // Safe fallback if target element unmounted
      }
    };
  }, [isOpen]);

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
    if (isSuccess) {
      handleResetAndClose();
      return;
    }
    // Prevent accidental dismissal if user typed personal data
    if (isDirty) {
      return;
    }
    handleResetAndClose();
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
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

    setIsSubmitting(true);
    setSubmitError(null);

    // Prepare standard backend-ready payload
    const rawName = formData.name.trim();
    const maskedName =
      rawName.length > 2
        ? `${rawName[0]}*${rawName.slice(-1)}`
        : `${rawName}*`;

    let contactDisplay = '';
    let legacyPhone = '';
    if (formData.contactMethod === 'phone') {
      contactDisplay = `${formData.countryCode} ${formData.phone.trim()}`;
      legacyPhone = contactDisplay;
    } else if (formData.contactMethod === 'kakao') {
      contactDisplay = `KakaoTalk: ${formData.kakaoId.trim()}`;
      legacyPhone = formData.kakaoId.trim();
    } else if (formData.contactMethod === 'zalo') {
      contactDisplay = `Zalo: ${formData.zaloAccount.trim()}`;
      legacyPhone = formData.zaloAccount.trim();
    }

    const durationDisplayVi =
      formData.travelDuration === 'custom' && formData.customDuration.trim()
        ? formData.customDuration.trim()
        : DURATION_LABELS[formData.travelDuration]?.vi || 'Linh hoạt';

    const durationDisplayKr =
      formData.travelDuration === 'custom' && formData.customDuration.trim()
        ? formData.customDuration.trim()
        : DURATION_LABELS[formData.travelDuration]?.ko || '일정 협의';

    const groupLabelVi = GROUP_LABELS[formData.travelGroup]?.vi || `${formData.travelGroup} người`;
    const groupLabelKr = GROUP_LABELS[formData.travelGroup]?.ko || `${formData.travelGroup}명`;

    const dateDisplayVi = formData.travelDate
      ? `${formData.travelDate.split('-').reverse().join('/')} (${durationDisplayVi})`
      : `${durationDisplayVi} (Linh hoạt)`;

    const dateDisplayKr = formData.travelDate
      ? `${formData.travelDate} (${durationDisplayKr})`
      : `${durationDisplayKr} (일정 협의)`;

    // Standardized quote object for live status boards and future Admin API
    const newQuote = {
      id: `Q-${Date.now().toString().slice(-8)}`,
      sessionId: draft.sessionId || `CS-${Date.now()}`,
      source: draft.source || 'direct',
      customerName: `${maskedName} (${rawName.slice(0, 3)})`,
      customerNameVi: maskedName,
      destination: isKorean ? selectedDest?.nameKr : (selectedDest?.nameVi || selectedDest?.name),
      destinationVi: selectedDest?.nameVi || selectedDest?.name,
      destinationId: formData.destinationId,
      themeId: draft.themeId || null,
      journeyId: draft.journeyId || null,
      travelGroup: isKorean ? `${groupLabelKr} (단독 투어)` : `${groupLabelVi} (Tour riêng)`,
      travelGroupVi: `${groupLabelVi} (Tour riêng)`,
      travelDates: isKorean ? dateDisplayKr : dateDisplayVi,
      travelDatesVi: dateDisplayVi,
      status: 'waiting',
      timeAgo: isKorean ? '방금 전' : 'Vừa xong',
      timeAgoVi: 'Vừa xong',
      createdAt: new Date().toISOString(),
      notes: formData.notes.trim(),
      contactMethod: formData.contactMethod,
      contactValue: contactDisplay,
      phone: legacyPhone,
      travelDuration: formData.travelDuration,
    };

    // Realistic submit processing
    setTimeout(() => {
      try {
        if (onAddQuote) {
          onAddQuote(newQuote);
        }

        setSubmittedData({
          name: rawName,
          destName: destDisplayName,
          contactDisplay,
          groupDisplay: isKorean ? groupLabelKr : groupLabelVi,
          durationDisplay: isKorean ? durationDisplayKr : durationDisplayVi,
          travelDate: formData.travelDate
            ? (isKorean ? formData.travelDate : formData.travelDate.split('-').reverse().join('/'))
            : null,
        });

        setIsSubmitting(false);
        setIsSuccess(true);
      } catch (err) {
        console.error('Submission error:', err);
        setIsSubmitting(false);
        setSubmitError(
          t(
            'modal.submitError',
            isKorean
              ? '요청을 보내지 못했습니다. 다시 시도해 주세요.'
              : 'Chưa thể gửi yêu cầu. Vui lòng kiểm tra lại thông tin và thử lại.'
          )
        );
      }
    }, 550);
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
          ref={closeBtnRef}
          type="button"
          className="quote-modal-close"
          onClick={handleResetAndClose}
          aria-label={t('modal.closeAria', isKorean ? '상담 창 닫기' : 'Đóng cửa sổ tư vấn')}
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          /* =========================================================
             SUCCESS VIEW
          ========================================================= */
          <div className="quote-success-view">
            <div className="success-icon-wrap">
              <CheckCircle size={52} className="text-orange" />
            </div>

            <h3 className="success-title">
              {t(
                'modal.successTitle',
                isKorean
                  ? '상담 요청이 접수되었습니다!'
                  : 'Yêu cầu đã được gửi thành công!'
              )}
            </h3>

            <p className="success-desc">
              {t(
                'modal.successDesc',
                isKorean
                  ? '선택하신 연락 방법으로 빠르고 친절하게 맞춤 일정을 안내해 드리겠습니다.'
                  : 'Chúng tôi sẽ liên hệ qua phương thức bạn đã chọn để đồng hành thiết kế hành trình riêng.'
              )}
            </p>

            {/* Summary Box */}
            <div className="success-summary-box">
              <h4 className="summary-box-title">
                {t('modal.summaryTitle', isKorean ? '접수된 상담 내용' : 'Thông tin đã đăng ký')}
              </h4>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-key">
                    {t('modal.summaryDest', isKorean ? '희망 여행지:' : 'Điểm đến:')}
                  </span>
                  <span className="summary-val">{submittedData?.destName}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-key">
                    {t('modal.summaryName', isKorean ? '신청 고객명:' : 'Khách hàng:')}
                  </span>
                  <span className="summary-val">{submittedData?.name}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-key">
                    {t('modal.summaryContact', isKorean ? '연락 방법:' : 'Phương thức liên hệ:')}
                  </span>
                  <span className="summary-val">{submittedData?.contactDisplay}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-key">
                    {t('modal.summaryGroup', isKorean ? '여행 인원:' : 'Số lượng khách:')}
                  </span>
                  <span className="summary-val">{submittedData?.groupDisplay}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-key">
                    {t('modal.summaryDuration', isKorean ? '여행 기간:' : 'Thời gian du lịch:')}
                  </span>
                  <span className="summary-val">{submittedData?.durationDisplay}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-key">
                    {t('modal.summaryDate', isKorean ? '출발 예정일:' : 'Ngày khởi hành:')}
                  </span>
                  <span className="summary-val">
                    {submittedData?.travelDate ||
                      t('modal.summaryDateFlexible', isKorean ? '미정 (일정 협의)' : 'Chưa xác định (Linh hoạt)')}
                  </span>
                </div>
              </div>
            </div>

            <div className="success-hotline-row">
              <span className="hotline-title">
                {t('modal.hotlineLabel', isKorean ? '고객센터 직통 번호:' : 'Hotline hỗ trợ:')}
              </span>
              <a
                href={`tel:${BRAND_CONFIG.contact.hotline.replace(/\s+/g, '')}`}
                className="hotline-link"
              >
                {BRAND_CONFIG.contact.hotline}
              </a>
            </div>

            <button
              type="button"
              className="quote-submit-btn is-close-btn"
              onClick={handleResetAndClose}
            >
              {t('modal.confirmBtn', isKorean ? '확인' : 'Đóng')}
            </button>
          </div>
        ) : (
          /* =========================================================
             FORM VIEW
          ========================================================= */
          <form className="quote-modal-form" onSubmit={handleSubmit} noValidate>
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
                      'modal.privacyConsent',
                      isKorean
                        ? '맞춤 여행 상담을 위한 정보 제공 및 안내에 동의합니다.'
                        : 'Tôi đồng ý cung cấp thông tin để Super EZ Tour liên hệ tư vấn hành trình riêng.'
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
                    'modal.privacy',
                    isKorean
                      ? '입력하신 정보는 개인정보 처리방침에 따라 여행 상담 목적으로 사용됩니다.'
                      : 'Thông tin của bạn chỉ được sử dụng để xử lý yêu cầu tư vấn theo chính sách bảo mật.'
                  )}
                </p>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="modal-actions">
              {submitError && (
                <div className="submit-error-banner" role="alert">
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                className="quote-submit-btn"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="submit-spinner" aria-hidden="true" />
                    <span>
                      {t('modal.submitBtnLoading', isKorean ? '요청을 보내는 중...' : 'Đang gửi yêu cầu...')}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      {t('modal.submitBtn', isKorean ? '여행 상담 요청하기' : 'Gửi yêu cầu tư vấn')}
                    </span>
                    <ArrowRight size={17} className="submit-arrow-icon" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuoteModal;
