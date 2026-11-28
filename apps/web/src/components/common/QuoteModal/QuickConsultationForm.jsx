import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Baby, Mail, MapPin, MessageCircle, Minus, Phone, Plus, UserRound, X } from 'lucide-react';
import { useConsultation } from '../../../context/ConsultationContext';
import { useLanguage } from '../../../context/LanguageContext';
import { VIETNAM_DESTINATIONS } from '../../../data/vietnamDestinations';
import {
  consultationConfig, normalizeKoreanMobile, notesLimit, seoulToday,
  technicalLimit, unavailableCopy, validateConsultation,
} from './consultationModel';
import { locksDraft, retryable } from '../../../services/consultationAttempts';
import QuickConsultationReceipt from './QuickConsultationReceipt';
import { mapSubmissionFields, submissionCopy } from './quickSubmissionCopy';
import './QuickConsultationForm.css';

const photo = consultationConfig['ha-noi'].heroMedia;
const durationPresets = [3, 4, 5, 6];
const contactIcons = { phone: Phone, email: Mail, kakao: MessageCircle };
const guestIcons = { adults: UserRound, children: Baby };

function displayDate(date, language) {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return language === 'ko' ? `${year}년 ${Number(month)}월 ${Number(day)}일` : `${year}/${month}/${day}`;
}

function displayDuration(days, language) {
  return language === 'ko' ? `${days - 1}박 ${days}일` : `${days} ngày ${days - 1} đêm`;
}

const copy = {
  ko: {
    title: '프라이빗 투어 상담', intro: '일정이 정해지지 않아도 괜찮아요. 원하시는 여행을 알려 주세요.',
    country: '베트남', destinationLabel: '여행 목적지', plan: '여행 계획',
    date: '출발 예정일', unsure: '아직 미정', exact: '날짜 선택', duration: '여행 기간',
    custom: '직접 입력', customDays: '여행 일수', dateHint: '연 · 월 · 일',
    undecided: '미정', guests: '여행 인원', adults: '성인', children: '아동', add: '추가', remove: '줄이기',
    contact: '연락 정보', name: '성함', methods: '연락 방법', phone: '휴대전화', email: '이메일', kakao: '카카오톡',
    phoneHint: '한국 휴대전화 번호', phoneFormats: '010 또는 +82 형식으로 입력할 수 있습니다.',
    notes: '추가 요청사항', optional: '선택', availability: '온라인 상담 신청을 준비 중입니다.',
    notesHint: '예: 한국어 가이드, 가족 여행, 전용 차량', privacy: '개인정보 수집 및 이용 안내',
    privacyText: '개인정보 안내가 준비 중입니다. 입력 내용은 이 브라우저 세션의 메모리에만 남으며 전송되지 않습니다.',
    sensitive: '여권, 결제 정보 등 민감한 정보는 입력하지 마세요.', submit: '상담 신청하기', close: '상담 창 닫기',
    discard: '작성 내용 지우기', discardQuestion: '작성 중인 내용을 지울까요?', keep: '기존 내용 유지',
    conflict: '선택한 일정이 작성 중인 내용과 달라요.', apply: '선택한 일정 적용', crop: '세로 크롭',
    errors: {
      date: '오늘 이후의 출발 예정일을 선택해 주세요.', duration: '여행 기간을 일 단위로 입력해 주세요.',
      guests: '성인 1명 이상과 올바른 아동 인원을 입력해 주세요.', name: '올바른 성함을 입력해 주세요.',
      phone: '010으로 시작하는 한국 휴대전화 번호를 입력해 주세요.', email: '올바른 이메일 주소를 입력해 주세요.',
      kakao: '카카오톡 ID를 확인해 주세요.', method: '연락 방법을 선택해 주세요.', notes: '추가 요청사항을 줄여 주세요.',
    },
  },
  vi: {
    title: 'Tư vấn tour riêng', intro: 'Bạn có thể chưa chốt lịch. Hãy cho chúng tôi biết chuyến đi bạn mong muốn.',
    country: 'Việt Nam', destinationLabel: 'Điểm đến', plan: 'Kế hoạch chuyến đi',
    date: 'Ngày khởi hành dự kiến', unsure: 'Chưa chốt ngày', exact: 'Chọn ngày cụ thể', duration: 'Thời lượng',
    custom: 'Tùy chỉnh', customDays: 'Số ngày đi', dateHint: 'Năm / tháng / ngày',
    undecided: 'Chưa chốt', guests: 'Số khách', adults: 'Người lớn', children: 'Trẻ em', add: 'Tăng', remove: 'Giảm',
    contact: 'Thông tin liên hệ', name: 'Họ và tên', methods: 'Cách liên hệ', phone: 'Điện thoại', email: 'Email', kakao: 'KakaoTalk',
    phoneHint: 'Số di động Hàn Quốc', phoneFormats: 'Có thể nhập số điện thoại Hàn Quốc theo định dạng 010 hoặc +82.',
    notes: 'Yêu cầu thêm', optional: 'tùy chọn', availability: 'Tính năng gửi yêu cầu tư vấn đang được chuẩn bị.',
    notesHint: 'Ví dụ: Hướng dẫn tiếng Hàn, đi cùng gia đình, xe riêng', privacy: 'Thông tin về thu thập và sử dụng dữ liệu',
    privacyText: 'Thông tin quyền riêng tư đang được chuẩn bị. Dữ liệu nhập chỉ nằm trong bộ nhớ phiên trình duyệt và chưa được gửi đi.',
    sensitive: 'Vui lòng tránh nhập thông tin hộ chiếu, thanh toán hoặc dữ liệu nhạy cảm.',
    submit: 'Gửi yêu cầu tư vấn', close: 'Đóng form tư vấn', discard: 'Bỏ bản nháp',
    discardQuestion: 'Bạn muốn xóa nội dung đang nhập?', keep: 'Giữ nội dung',
    conflict: 'Lịch trình vừa chọn khác với bản nháp.', apply: 'Áp dụng lịch trình mới', crop: 'Cắt khung dọc',
    errors: {
      date: 'Chọn ngày khởi hành từ hôm nay trở đi.', duration: 'Nhập số ngày đi hợp lệ.',
      guests: 'Chọn ít nhất một người lớn và số trẻ em hợp lệ.', name: 'Nhập họ và tên hợp lệ.',
      phone: 'Nhập số di động Hàn Quốc đầu 010.', email: 'Nhập địa chỉ email hợp lệ.',
      kakao: 'Kiểm tra lại ID KakaoTalk.', method: 'Chọn một cách liên hệ.', notes: 'Rút ngắn yêu cầu thêm.',
    },
  },
};

function QuickConsultationDialog({ onClose, language, dirty, children }) {
  const l = copy[language];
  return (
    <div className="hqc-overlay" onClick={(event) => {
      if (event.target === event.currentTarget && !dirty) onClose();
    }}>
      <section className="hqc-dialog" role="dialog" aria-modal="true" aria-labelledby="hqc-title" aria-describedby="hqc-intro" lang={language}>
        <figure className="hqc-photo">
          <picture>
            <source media="(min-width: 761px)" srcSet={photo.mobileSrc} />
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt={photo.alt[language]} />
          </picture>
          <figcaption>
            <span>Your journey.<br />Your Hanoi.</span>
            <small><a href={photo.sourceUrl} target="_blank" rel="noreferrer">{photo.author}</a> · <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a> · {l.crop}</small>
          </figcaption>
        </figure>
        <div className="hqc-panel">
          <header className="hqc-header">
            <span className="hqc-brand">SUPER EZ TOUR</span>
            <button type="button" className="hqc-close" aria-label={l.close} onClick={onClose}><X size={21} /></button>
          </header>
          {children}
        </div>
      </section>
    </div>
  );
}

export default function QuickConsultationForm({ onClose }) {
  const { language } = useLanguage();
  const { showQuickReceipt, submission, quickDraft, newQuickInquiry } = useConsultation();
  if (!showQuickReceipt) return <QuickConsultationEditor key={quickDraft.requestId} onClose={onClose} />;
  return <QuickConsultationDialog onClose={onClose} language={language} dirty={false}>
    <QuickConsultationReceipt receipt={submission.receipt} language={language} close={onClose} newInquiry={newQuickInquiry} />
  </QuickConsultationDialog>;
}

function QuickConsultationEditor({ onClose }) {
  const { language } = useLanguage();
  const { quickDraft: draft, editQuick, discardQuick, resolveQuickConflict, quickPolicy, submission, submitQuick, retryQuick, newQuickInquiry } = useConsultation();
  const l = copy[language];
  const feedback = submissionCopy[language];
  const methods = quickPolicy ? ['phone', 'email'].filter((method) => quickPolicy.verified[method]) : ['phone', 'email'];
  const destination = VIETNAM_DESTINATIONS.find(({ id }) => id === draft.destinationId);
  const destinationName = language === 'ko' ? destination?.nameKr : destination?.nameVi;
  const [editingCustomDuration, setEditingCustomDuration] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [clock, setClock] = useState(Date.now);
  const heading = useRef(null);
  const form = useRef(null);
  const focusErrors = useRef(false);
  const statusPanel = useRef(null);
  const production = import.meta.env.PROD;
  const state = quickPolicy ? submission?.state : null;
  const locked = locksDraft(submission?.state);
  const retryDeadline = state === 'limited' ? submission.retryAt : 0;
  const remaining = Math.max(0, Math.ceil(((retryDeadline || 0) - clock) / 1000));
  const today = seoulToday();
  const dateExact = draft.departure.status === 'exact';
  const durationFixed = draft.duration.status === 'fixed';
  const durationCustom = durationFixed && (editingCustomDuration || !durationPresets.includes(draft.duration.days));
  const durationValue = durationCustom ? 'custom' : durationFixed ? String(draft.duration.days) : 'undecided';
  const formattedDate = displayDate(draft.departure.date, language);
  const normalizedPhone = draft.method === 'phone' ? normalizeKoreanMobile(draft.phone) : null;

  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => {
    if (!retryDeadline) return;
    const update = () => setClock(Date.now());
    update();
    const timer = setInterval(() => {
      update();
      if (Date.now() >= retryDeadline) clearInterval(timer);
    }, 500);
    return () => clearInterval(timer);
  }, [retryDeadline]);
  useEffect(() => {
    if (state === 'validation') {
      const fields = mapSubmissionFields(submission.fields, draft);
      focusErrors.current = !!Object.keys(fields).length;
      setErrors(fields);
    }
    if (state) {
      statusPanel.current?.focus({ preventScroll: true });
      statusPanel.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [state, submission]); // Submission metadata is stable until another attempt.
  useEffect(() => {
    if (!focusErrors.current) return;
    focusErrors.current = false;
    const field = form.current?.querySelector('[aria-invalid=true]:not(:disabled)');
    field?.focus({ preventScroll: true });
    field?.scrollIntoView({ block: 'nearest' });
  }, [errors]);

  function change(key, value, error = key) {
    editQuick(key, value);
    setStatus(null);
    setErrors(({ [error]: previous, ...remaining }) => remaining);
  }

  function submit(event) {
    event.preventDefault();
    if (production || draft.pending || locked) return;
    if (!quickPolicy) {
      const fields = validateConsultation(draft, consultationConfig[draft.destinationId]);
      focusErrors.current = !!Object.keys(fields).length;
      setErrors(fields);
      if (!focusErrors.current) setStatus('unavailable');
      return;
    }
    const result = submitQuick(language);
    focusErrors.current = result.status === 'invalid';
    setErrors(result.errors || {});
    if (result.status === 'unavailable' && draft.acceptedPolicy !== quickPolicy.policyVersion) {
      focusErrors.current = true;
      setErrors({ consent: 'consentError' });
    } else if (result.status === 'unavailable') {
      focusErrors.current = true;
      setErrors({ contact: 'contactMethod' });
    }
  }

  const invalid = (field) => ({
    'aria-invalid': !!errors[field],
    'aria-describedby': errors[field] ? `hqc-error-${field}` : undefined,
  });
  const error = (field) => errors[field] &&
    <span className="hqc-error" role="alert" id={`hqc-error-${field}`}>{l.errors[errors[field]] || feedback[errors[field]]}</span>;

  return (
    <QuickConsultationDialog onClose={onClose} language={language} dirty={locked || !!Object.keys(draft.edited).length}>
          <div className="hqc-scroll" data-lenis-prevent>
            <h2 id="hqc-title" ref={heading} tabIndex={-1} data-initial-focus>{l.title}</h2>
            <p id="hqc-intro" className="hqc-intro">{l.intro}</p>
            <p className="hqc-destination"><MapPin size={16} aria-hidden="true" /><span>{l.destinationLabel}</span><strong>{destinationName}, {l.country}</strong></p>
            <p className="hqc-availability" role="status">{quickPolicy ? feedback.testing : l.availability}</p>
            {draft.pending && <div className="hqc-notice">
              <p>{l.conflict}</p>
              <button type="button" onClick={() => resolveQuickConflict(false)}>{l.keep}</button>{' '}
              <button type="button" onClick={() => { setEditingCustomDuration(false); resolveQuickConflict(true); }}>{l.apply}</button>
            </div>}
            <form ref={form} onSubmit={submit} noValidate>
              <fieldset className="hqc-attempt-fields" disabled={locked} aria-busy={state === 'submitting'}>
              <fieldset>
                <legend>{l.plan}</legend>
                <div className="hqc-grid hqc-plan-grid">
                  <div className="hqc-field">
                    <span className="hqc-label" id="hqc-date-label">{l.date}</span>
                    <div className="hqc-segments" role="radiogroup" aria-labelledby="hqc-date-label">
                      {['undecided', 'exact'].map((mode) => (
                        <label key={mode}><input type="radio" name="hqc-date-mode" value={mode} checked={draft.departure.status === mode}
                          onChange={() => change('departure', { status: mode, date: null }, 'date')} />
                          <span>{mode === 'exact' ? l.exact : l.unsure}</span>
                        </label>
                      ))}
                    </div>
                    {dateExact && <>
                      <label className="hqc-date-value" htmlFor="hqc-date">{formattedDate || l.dateHint}</label>
                      <input id="hqc-date" type="date" min={today} value={draft.departure.date ?? ''}
                        aria-label={l.date}
                        onChange={(event) => change('departure', { status: 'exact', date: event.target.value || null }, 'date')} {...invalid('date')} />
                      {error('date')}
                    </>}
                  </div>
                  <div className="hqc-field">
                    <label htmlFor="hqc-duration">{l.duration}</label>
                    <select id="hqc-duration" value={durationValue} onChange={(event) => {
                      const value = event.target.value;
                      setEditingCustomDuration(value === 'custom');
                      change('duration', value === 'undecided'
                        ? { status: 'undecided', days: null }
                        : { status: 'fixed', days: value === 'custom' ? null : Number(value) });
                    }}>
                      <option value="undecided">{l.undecided}</option>
                      {durationPresets.map((days) => <option key={days} value={days}>{displayDuration(days, language)}</option>)}
                      <option value="custom">{l.custom}</option>
                    </select>
                    {durationCustom && <>
                      <label htmlFor="hqc-duration-custom">{l.customDays}</label>
                      <input id="hqc-duration-custom" type="number" inputMode="numeric" min="1" max={technicalLimit} step="1"
                        value={draft.duration.days ?? ''} {...invalid('duration')}
                        onChange={(event) => change('duration', { status: 'fixed', days: Number.isFinite(event.target.valueAsNumber) ? event.target.valueAsNumber : null })} />
                      {Number.isInteger(draft.duration.days) && draft.duration.days > 0 && draft.duration.days <= technicalLimit &&
                        <small>{displayDuration(draft.duration.days, language)}</small>}
                    </>}
                    {error('duration')}
                  </div>
                </div>
                <div className="hqc-grid hqc-guests" aria-label={l.guests} role="group">
                  {Object.entries(guestIcons).map(([key, Icon]) => (
                    <div className="hqc-counter" key={key}>
                      <span id={`hqc-${key}-label`}><Icon size={15} aria-hidden="true" />{l[key]}</span>
                      <div role="group" aria-labelledby={`hqc-${key}-label`}>
                        <button type="button" aria-label={`${l[key]} ${l.remove}`} disabled={draft.guests[key] <= (key === 'adults' ? 1 : 0)}
                          onClick={() => change('guests', { ...draft.guests, [key]: draft.guests[key] - 1 })} {...invalid('guests')}><Minus size={16} /></button>
                        <output aria-live="polite">{draft.guests[key]}</output>
                        <button type="button" aria-label={`${l[key]} ${l.add}`} disabled={draft.guests[key] >= technicalLimit}
                          onClick={() => change('guests', { ...draft.guests, [key]: draft.guests[key] + 1 })}><Plus size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
                {error('guests')}
              </fieldset>
              <fieldset disabled={production}>
                <legend>{l.contact}</legend>
                <div className="hqc-grid hqc-contact-grid">
                <div className="hqc-field">
                  <label htmlFor="hqc-name">{l.name} <span aria-hidden="true">*</span></label>
                  <input id="hqc-name" autoComplete="name" required maxLength={100} value={draft.name}
                    onChange={(event) => change('name', event.target.value)} {...invalid('name')} />
                  {error('name')}
                </div>
                <div className="hqc-field">
                  <span className="hqc-label" id="hqc-method-label">{l.methods}</span>
                  <div className="hqc-segments hqc-methods" role="radiogroup" aria-labelledby="hqc-method-label">
                    {methods.map((method) => {
                      const Icon = contactIcons[method];
                      return <label key={method}><input type="radio" name="hqc-method" value={method} checked={draft.method === method}
                        onChange={() => change('method', method, 'contact')} /><span><Icon size={15} aria-hidden="true" />{l[method]}</span></label>;
                    })}
                  </div>
                </div>
                </div>
                <div className="hqc-field">
                  <label className="hqc-contact-label" htmlFor="hqc-contact"><span>{draft.method === 'phone' ? l.phoneHint : l[draft.method]} <span aria-hidden="true">*</span></span>
                    {draft.method === 'phone' && <span className="hqc-country-code">KR +82</span>}
                  </label>
                    <input key={draft.method} id="hqc-contact" type={draft.method === 'phone' ? 'tel' : draft.method === 'email' ? 'email' : 'text'}
                      inputMode={draft.method === 'phone' ? 'tel' : draft.method === 'email' ? 'email' : 'text'}
                      autoComplete={draft.method === 'phone' ? 'tel' : draft.method === 'email' ? 'email' : 'off'}
                      placeholder={draft.method === 'phone' ? '+82 10 1234 5678' : undefined} required
                      maxLength={draft.method === 'email' ? 254 : 100} value={draft[draft.method]}
                      onChange={(event) => change(draft.method, event.target.value, 'contact')} {...invalid('contact')}
                      aria-describedby={[draft.method === 'phone' && 'hqc-phone-formats', errors.contact && 'hqc-error-contact'].filter(Boolean).join(' ') || undefined} />
                  {draft.method === 'phone' && <small id="hqc-phone-formats">{l.phoneFormats}{normalizedPhone && <bdi className="hqc-phone-preview"> · {normalizedPhone}</bdi>}</small>}
                  {error('contact')}
                </div>
              </fieldset>
              <fieldset disabled={production}>
                <legend><label htmlFor="hqc-notes">{l.notes} <small>({l.optional})</small></label></legend>
                <div className="hqc-field">
                  <textarea id="hqc-notes" rows={2} maxLength={notesLimit} placeholder={l.notesHint} value={draft.notes}
                    onChange={(event) => change('notes', event.target.value)} {...invalid('notes')}
                    aria-describedby={errors.notes ? 'hqc-sensitive hqc-error-notes' : 'hqc-sensitive'} />
                  <small id="hqc-sensitive">{l.sensitive}</small>
                  {error('notes')}
                </div>
              </fieldset>
              <div className="hqc-privacy">
                <strong>{l.privacy}</strong>
                <p>{quickPolicy ? feedback.testing : l.privacyText}</p>
                {quickPolicy && <>
                  <label className="hqc-consent">
                    <input type="checkbox" checked={draft.acceptedPolicy === quickPolicy.policyVersion}
                      onChange={(event) => change('acceptedPolicy', event.target.checked ? quickPolicy.policyVersion : null, 'consent')}
                      {...invalid('consent')} />
                    {feedback.consent}
                  </label>
                  {error('consent')}
                </>}
              </div>
              </fieldset>
              <div className="hqc-actions">
                <button className="hqc-submit" type="submit" disabled={production || locked || !!draft.pending}>
                  {state === 'submitting' ? feedback.submitting : l.submit}<ArrowRight size={18} aria-hidden="true" />
                </button>
                {state && <div className="hqc-notice" ref={statusPanel} tabIndex={-1} role={state === 'submitting' ? 'status' : 'alert'}>
                  {feedback[state]}
                  {state === 'limited' && remaining > 0 && <p aria-live="off">{feedback.wait}: {remaining}s</p>}
                  {submission.requestId && ['conflict', 'rejected'].includes(state) && <p><code>{submission.requestId}</code></p>}
                  {retryable.has(state) && <button type="button" onClick={retryQuick} disabled={remaining > 0}>{feedback.retry}</button>}
                </div>}
                {status && <p className="hqc-notice" role="alert">{unavailableCopy[language]}</p>}
                {state !== 'submitting' && (confirmDiscard ? <div className="hqc-notice">
                  <p>{locked ? feedback.duplicate : l.discardQuestion}</p>
                  <button type="button" onClick={locked ? newQuickInquiry : discardQuick}>{locked ? feedback.fresh : l.discard}</button>{' '}
                  <button type="button" onClick={() => setConfirmDiscard(false)}>{l.keep}</button>
                </div> : <button className="hqc-discard" type="button" onClick={() => setConfirmDiscard(true)}>
                  {locked ? feedback.newInquiry : l.discard}
                </button>)}
              </div>
            </form>
          </div>
    </QuickConsultationDialog>
  );
}
