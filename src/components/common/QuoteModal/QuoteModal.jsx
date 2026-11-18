import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  CheckCircle,
  MapPin,
  User,
  Phone,
  MessageCircle,
  MessageSquare,
  Users,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { VIETNAM_DESTINATIONS } from '../../../data/vietnamDestinations';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import { useLanguage } from '../../../context/LanguageContext';
import './QuoteModal.css';

/**
 * Robust helper to resolve destination input (ID, slug, or alias)
 * to a canonical destination ID in VIETNAM_DESTINATIONS.
 */
const resolveDestinationId = (input) => {
  if (!input) return 'da-nang';
  if (typeof input === 'object' && input !== null) {
    const raw = input.destinationId || input.destinationSlug || input.id || input.destination;
    return resolveDestinationId(raw);
  }
  const norm = String(input).toLowerCase().trim();
  if (norm === 'kakao') return 'da-nang';
  const matched = VIETNAM_DESTINATIONS.find(
    (d) =>
      d.id === norm ||
      d.slug === norm ||
      (d.aliases && d.aliases.some((a) => a.toLowerCase() === norm))
  );
  return matched ? matched.id : 'da-nang';
};

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

const QuoteModal = ({
  isOpen,
  onClose,
  onAddQuote,
  defaultDestination = '',
}) => {
  const { t, isKorean } = useLanguage();

  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const prevActiveElementRef = useRef(null);

  const [formData, setFormData] = useState({
    destinationId: resolveDestinationId(defaultDestination),
    name: '',
    contactMethod: defaultDestination === 'kakao' ? 'kakao' : 'phone',
    countryCode: isKorean ? '+82' : '+84',
    phone: '',
    kakaoId: '',
    zaloAccount: '',
    travelGroup: '2',
    travelDuration: '4d3n',
    customDuration: '',
    travelDate: '',
    notes: '',
    agreePrivacy: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Sync default destination, tour context, or kakao trigger when prop changes
  useEffect(() => {
    if (defaultDestination) {
      if (typeof defaultDestination === 'object' && defaultDestination !== null) {
        const resolved = resolveDestinationId(defaultDestination);
        setFormData((prev) => ({
          ...prev,
          destinationId: resolved,
          ...(defaultDestination.duration ? { travelDuration: defaultDestination.duration } : {}),
          ...(defaultDestination.tourTitle ? {
            notes: prev.notes
              ? prev.notes
              : (isKorean
                  ? `[${defaultDestination.tourTitle}] 일정 맞춤 상담 요청`
                  : `Tư vấn hành trình: ${defaultDestination.tourTitle}`),
          } : {}),
        }));
      } else if (defaultDestination === 'kakao') {
        setFormData((prev) => ({
          ...prev,
          contactMethod: 'kakao',
        }));
      } else {
        const resolved = resolveDestinationId(defaultDestination);
        setFormData((prev) => ({
          ...prev,
          destinationId: resolved,
        }));
      }
    }
  }, [defaultDestination, isKorean]);

  // Sync country code with language change if phone input is empty
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
          // Focus the close button or first interactive element
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
      document.body.style.overflow = '';
      if (prevActiveElementRef.current && prevActiveElementRef.current.focus) {
        prevActiveElementRef.current.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const todayString = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

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
    if (errors.contact) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.contact;
        return next;
      });
    }
  };

  const isDirty = Boolean(
    formData.name.trim() ||
      formData.phone.trim() ||
      formData.kakaoId.trim() ||
      formData.zaloAccount.trim() ||
      formData.notes.trim()
  );

  const handleBackdropClick = (e) => {
    // Only trigger if click was directly on the overlay background
    if (e.target !== e.currentTarget) return;

    if (isSuccess) {
      handleResetAndClose();
      return;
    }

    // If user has entered data, avoid accidental close on backdrop click
    if (isDirty) {
      return;
    }

    handleResetAndClose();
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setSubmitError(null);
    setErrors({});
    onClose();
  };

  const selectedDest =
    VIETNAM_DESTINATIONS.find((d) => d.id === formData.destinationId) ||
    VIETNAM_DESTINATIONS.find((d) => d.id === 'da-nang');

  const destDisplayName = isKorean
    ? selectedDest?.nameKr
    : selectedDest?.nameVi || selectedDest?.name;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

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
      // Focus first error field
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

    // Prepare payload
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

    const newQuote = {
      id: `Q-${Date.now().toString().slice(-8)}`,
      customerName: `${maskedName} (${rawName.slice(0, 3)})`,
      customerNameVi: maskedName,
      destination: isKorean ? selectedDest?.nameKr : (selectedDest?.nameVi || selectedDest?.name),
      destinationVi: selectedDest?.nameVi || selectedDest?.name,
      destinationId: formData.destinationId,
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

            <div className="form-fields-grid">
              {/* FIELD 01 — DESTINATION */}
              <div className="form-group full-width">
                <label htmlFor="quote-dest-select" className="form-label">
                  <MapPin size={15} className="label-icon text-gold" />
                  <span>{t('modal.destLabel', isKorean ? '희망 여행지' : 'Điểm đến mong muốn')}</span>
                </label>
                <div className="select-input-wrapper">
                  <select
                    id="quote-dest-select"
                    name="destinationId"
                    className="form-select"
                    value={formData.destinationId}
                    onChange={handleChange}
                  >
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

              {/* FIELD 07 — SPECIAL REQUESTS */}
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
                  placeholder={t(
                    'modal.notesPlaceholder',
                    isKorean
                      ? '예: 5성급 호텔, 전용 차량, 한국어 가이드, 현지 미식 체험 등'
                      : 'Ví dụ: Khách sạn 5 sao, xe riêng, hướng dẫn viên tiếng Hàn, trải nghiệm ẩm thực...'
                  )}
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
