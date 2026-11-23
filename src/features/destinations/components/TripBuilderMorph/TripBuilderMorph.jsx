import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Compass,
  Bed,
  Car,
  UserCheck,
  Plane,
  MapPin,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Send,
  Phone,
  FileCheck
} from 'lucide-react';
import { useTripBuilder, isCulinarySelected } from '../../context/TripBuilderContext';
import { useLanguage } from '../../../../context/LanguageContext';
import './TripBuilderMorph.css';

const STEPS_VI = [
  { id: 1, label: 'Thông tin' },
  { id: 2, label: 'Lưu trú' },
  { id: 3, label: 'Phương tiện' },
  { id: 4, label: 'HDV riêng' },
  { id: 5, label: 'Vé máy bay' },
  { id: 6, label: 'Tọa độ & Món' },
  { id: 7, label: 'Gửi yêu cầu' }
];

const STEPS_KO = [
  { id: 1, label: '기본 정보' },
  { id: 2, label: '숙소 선택' },
  { id: 3, label: '전용 차량' },
  { id: 4, label: '가이드' },
  { id: 5, label: '항공권' },
  { id: 6, label: '명소 & 미식' },
  { id: 7, label: '견적 요청' }
];

const TripBuilderMorph = ({ onAddQuote, destinationConfig }) => {
  const {
    tripState,
    setStep,
    nextStep,
    prevStep,
    updateField,
    toggleAttraction,
    toggleCulinary,
    submitTrip,
    resetTrip
  } = useTripBuilder();

  const { isKorean } = useLanguage();

  const destNameDisplay = isKorean
    ? (destinationConfig ? `${destinationConfig.nameKr} (${destinationConfig.nameEn})` : '다낭 (Da Nang)')
    : (destinationConfig?.name || tripState.destination || 'Đà Nẵng');

  const destShortName = isKorean
    ? (destinationConfig?.nameKr || '다낭')
    : (destinationConfig?.name || 'Đà Nẵng');

  const steps = isKorean ? STEPS_KO : STEPS_VI;
  const [formErrors, setFormErrors] = useState({});

  const validateCurrentStep = () => {
    const errors = {};
    if (tripState.currentStep === 1) {
      if (tripState.adultsCount < 1) {
        errors.adultsCount = isKorean ? '성인 1명 이상을 선택해 주세요' : 'Vui lòng chọn ít nhất 1 người lớn';
      }
    } else if (tripState.currentStep === 7) {
      if (!tripState.contactName.trim()) {
        errors.contactName = isKorean ? '성함을 입력해 주세요' : 'Vui lòng nhập họ và tên của bạn';
      }
      if (!tripState.contactPhone.trim()) {
        errors.contactPhone = isKorean ? '연락처 또는 카카오톡 ID를 입력해 주세요' : 'Vui lòng nhập số điện thoại hoặc Zalo';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      nextStep();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      submitTrip(onAddQuote);
    }
  };

  if (tripState.isSubmitted) {
    return (
      <section className="dest-section trip-morph-section" id="trip-builder">
        <div className="trip-morph-bg-decor" aria-hidden="true">
          <div className="morph-bg-glow-1" />
          <div className="morph-bg-glow-2" />
          <div className="morph-bg-blueprint" />
        </div>
        <div className="dest-container">
          <div className="morph-success-card">
            <div className="morph-success-icon-box">
              <FileCheck size={44} className="morph-success-check" />
            </div>

            <span className="dest-badge dest-badge-gold">
              <Sparkles size={13} />
              <span>{isKorean ? '맞춤 여행 플랜 접수 완료' : 'HỒ SƠ HÀNH TRÌNH ĐÃ TIẾP NHẬN'}</span>
            </span>

            <h2 className="dest-title-editorial morph-success-heading">
              {isKorean
                ? `${tripState.contactName || '고객'}님, 신청이 완료되었습니다!`
                : `Cảm ơn ${tripState.contactName || 'Quý khách'}!`}
            </h2>

            <p className="morph-success-code-line">
              {isKorean ? '고객님 전용 여행 예약 코드: ' : 'Mã hồ sơ hành trình cá nhân hóa của bạn: '}
              <strong className="morph-code-pill">{tripState.submittedQuoteCode}</strong>
            </p>

            <div className="morph-success-summary-box">
              <h4>{isKorean ? `${destShortName} 100% 프라이빗 투어 상세 플랜:` : `Chi tiết cấu hình tour riêng ${destShortName}:`}</h4>
              <ul>
                <li>
                  <strong>{isKorean ? '여행 기간:' : 'Thời gian:'}</strong>{' '}
                  {tripState.departureDate || (isKorean ? '일정 조율 가능' : 'Linh hoạt')}{' '}
                  ({isKorean
                    ? `${tripState.durationDays - 1}박 ${tripState.durationDays}일`
                    : `${tripState.durationDays} Ngày ${tripState.durationDays - 1} Đêm`})
                </li>
                <li>
                  <strong>{isKorean ? '여행 인원:' : 'Quy mô đoàn:'}</strong>{' '}
                  {isKorean
                    ? `성인 ${tripState.adultsCount}명${tripState.childrenCount > 0 ? `, 아동 ${tripState.childrenCount}명` : ''}`
                    : `${tripState.adultsCount} Người lớn ${tripState.childrenCount > 0 ? `, ${tripState.childrenCount} Trẻ em` : ''}`}
                </li>
                <li>
                  <strong>{isKorean ? '선택 숙소:' : 'Lưu trú:'}</strong>{' '}
                  {tripState.accommodationName || tripState.accommodationType}
                </li>
                <li>
                  <strong>{isKorean ? '전용 차량:' : 'Phương tiện:'}</strong>{' '}
                  {tripState.transportType}
                </li>
                <li>
                  <strong>{isKorean ? '선택 명소:' : 'Tọa độ tham quan:'}</strong>{' '}
                  {isKorean
                    ? `${tripState.selectedAttractions.length}개 명소 선택됨`
                    : `${tripState.selectedAttractions.length} điểm đã chọn`}
                </li>
              </ul>
            </div>

            <p className="morph-success-promise">
              {isKorean ? (
                <>
                  Super EZ Tour {destShortName} 전담 매니저가{' '}
                  <strong>
                    {tripState.preferredChannel === 'zalo' ? '카카오톡' : '전화'} ({tripState.contactPhone})
                  </strong>
                  로 <strong>30분 이내</strong>에 투명한 맞춤 견적서와 상세 일정표를 보내드립니다.
                </>
              ) : (
                <>
                  Chuyên viên điều hành Super EZ Tour chuyên trách {destShortName} sẽ liên hệ qua{' '}
                  <strong>
                    {tripState.preferredChannel === 'zalo' ? 'Zalo' : 'Điện thoại'} ({tripState.contactPhone})
                  </strong>{' '}
                  trong vòng <strong>30 phút</strong> để gửi bản dự toán minh bạch và phác thảo lịch trình chi tiết.
                </>
              )}
            </p>

            <div className="morph-success-buttons">
              <a href="tel:19008899" className="dest-btn-primary">
                <Phone size={16} />
                <span>{isKorean ? '24시간 한국어 케어: 1900 8899' : 'Hotline ưu tiên: 1900 8899'}</span>
              </a>
              <button type="button" className="dest-btn-ghost" onClick={resetTrip}>
                <span>{isKorean ? '새로운 여행 플랜 만들기' : 'Thiết kế hành trình mới'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="dest-section trip-morph-section" id="trip-builder">
      <div className="trip-morph-bg-decor" aria-hidden="true">
        <div className="morph-bg-glow-1" />
        <div className="morph-bg-glow-2" />
        <div className="morph-bg-blueprint" />
      </div>
      <div className="dest-container">
        {/* Header */}
        <div className="trip-morph-header">
          <span className="dest-kicker trip-morph-kicker">
            <Compass size={14} />
            <span>INTERACTIVE TRIP DESIGNER</span>
          </span>
          <h2 className="dest-title-editorial trip-morph-title">
            {isKorean ? '나만의 1:1 맞춤 여행 플래너' : 'Trình Thiết Kế Chuyến Đi Cá Nhân Hóa'}
          </h2>
          <p className="dest-subtitle trip-morph-sub">
            {isKorean
              ? `원하시는 여행 스타일을 선택해 보세요 · Super EZ Tour ${destShortName} 전담팀이 30분 이내에 독창적인 맞춤 견적서를 완성해 드립니다.`
              : `Chủ động lựa chọn từng dịch vụ theo sở thích · Đội ngũ chuyên gia Super EZ Tour chuyên trách ${destShortName} sẽ hoàn thiện bản kế hoạch độc bản dành riêng cho bạn.`}
          </p>
        </div>

        {/* Morphing Progress Navigation */}
        <div className="morph-progress-tracker">
          <div className="morph-steps-nav">
            {steps.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`morph-step-item ${tripState.currentStep === s.id ? 'morph-step-active' : ''} ${tripState.currentStep > s.id ? 'morph-step-done' : ''}`}
                onClick={() => setStep(s.id)}
              >
                <div className="morph-step-dot">
                  {tripState.currentStep > s.id ? <Check size={13} /> : s.id}
                </div>
                <span className="morph-step-name">{s.label}</span>
              </button>
            ))}
          </div>
          <div
            className="morph-progress-track-bar"
            style={{ width: `${((tripState.currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* 2-Column Wizard & Sticky Summary */}
        <div className="trip-morph-layout">
          {/* Form Wizard Pane */}
          <div className="trip-morph-form-pane">
            {/* Step 1 */}
            {tripState.currentStep === 1 && (
              <div className="morph-pane-block">
                <div className="morph-pane-top">
                  <span className="morph-pane-badge">
                    {isKorean ? '01 / 07 단계' : 'Bước 01 / 07'}
                  </span>
                  <h3 className="morph-pane-title">
                    {isKorean ? '기본 여행 일정 및 인원' : 'Thông Tin Chuyến Đi Cơ Bản'}
                  </h3>
                  <p className="morph-pane-desc">
                    {isKorean ? '원하시는 여행 기간과 일행 규모를 선택해 주세요.' : 'Chọn thời gian và quy mô đoàn của gia đình bạn.'}
                  </p>
                </div>

                <div className="morph-inputs-grid">
                  <div className="morph-field">
                    <label className="morph-label">{isKorean ? '목적지' : 'Điểm đến'}</label>
                    <input
                      type="text"
                      className="morph-input"
                      value={destNameDisplay}
                      readOnly
                    />
                  </div>

                  <div className="morph-field">
                    <label className="morph-label">{isKorean ? '여행 기간' : 'Số ngày hành trình'}</label>
                    <div className="morph-pills-row">
                      {[3, 4, 5, 6, 7].map((daysCount) => (
                        <button
                          key={daysCount}
                          type="button"
                          className={`morph-pill-opt ${tripState.durationDays === daysCount ? 'morph-pill-active' : ''}`}
                          onClick={() => updateField('durationDays', daysCount)}
                        >
                          {isKorean
                            ? `${daysCount - 1}박 ${daysCount}일`
                            : `${daysCount} Ngày ${daysCount - 1} Đêm`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="morph-field">
                    <label className="morph-label">{isKorean ? '예정 출발일' : 'Ngày khởi hành dự kiến'}</label>
                    <input
                      type="date"
                      className="morph-input"
                      value={tripState.departureDate}
                      onChange={(e) => updateField('departureDate', e.target.value)}
                    />
                  </div>

                  <div className="morph-field-duo">
                    <div className="morph-field">
                      <label className="morph-label">{isKorean ? '성인 (만 12세 이상)' : 'Người lớn (từ 12 tuổi)'}</label>
                      <div className="morph-counter">
                        <button type="button" onClick={() => updateField('adultsCount', Math.max(1, tripState.adultsCount - 1))}>-</button>
                        <span>{tripState.adultsCount}</span>
                        <button type="button" onClick={() => updateField('adultsCount', tripState.adultsCount + 1)}>+</button>
                      </div>
                    </div>

                    <div className="morph-field">
                      <label className="morph-label">{isKorean ? '아동 (만 12세 미만)' : 'Trẻ em (dưới 12 tuổi)'}</label>
                      <div className="morph-counter">
                        <button type="button" onClick={() => updateField('childrenCount', Math.max(0, tripState.childrenCount - 1))}>-</button>
                        <span>{tripState.childrenCount}</span>
                        <button type="button" onClick={() => updateField('childrenCount', tripState.childrenCount + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {tripState.currentStep === 2 && (
              <div className="morph-pane-block">
                <div className="morph-pane-top">
                  <span className="morph-pane-badge">
                    {isKorean ? '02 / 07 단계' : 'Bước 02 / 07'}
                  </span>
                  <h3 className="morph-pane-title">
                    {isKorean ? '선호하는 숙소 스타일' : 'Phong Cách Lưu Trú Bạn Ưa Thích'}
                  </h3>
                  <p className="morph-pane-desc">
                    {isKorean ? '원하시는 휴양 스타일에 맞는 최고급 숙소 등급을 선택하세요.' : 'Lựa chọn tiêu chuẩn nghỉ dưỡng phù hợp với mong muốn.'}
                  </p>
                </div>

                <div className="morph-options-stack">
                  {(destinationConfig?.id === 'ha-noi'
                    ? (isKorean
                        ? [
                            { id: 'heritage', title: '5성급 프렌치 헤리티지 럭셔리 호텔', desc: '소피텔 레전드 메트로폴, 카펠라 하노이 등 역사와 예술의 공간' },
                            { id: 'westlake', title: '서호 레이크뷰 5성급 럭셔리 호텔', desc: '인터컨티넨탈 하노이 웨스트레이크, 롯데호텔 등 탁 트인 호수 전망' },
                            { id: 'boutique', title: '구시가지 최고급 부티크 호텔', desc: '디 오리엔탈 제이드, 라 시에스타 등 올드쿼터 중심의 감성 숙소' },
                            { id: 'city5star', title: '시내 중심가 5성급 비즈니스 호텔', desc: '쇼핑몰 및 주요 명소 인접, 최적의 동선과 가성비' },
                            { id: 'self', title: '숙소 직접 예약 (기타 서비스만 이용)', desc: '이미 호텔을 예약하셨거나 개별 예약 예정이신 경우' }
                          ]
                        : [
                            { id: 'heritage', title: 'Khách Sạn Di Sản 5 Sao Phong Cách Pháp', desc: 'Sofitel Legend Metropole, Capella Hanoi — Đỉnh cao kiến trúc và nghệ thuật' },
                            { id: 'westlake', title: 'Khách Sạn 5 Sao Ven Hồ Tây', desc: 'InterContinental Hanoi Westlake, Lotte Hotel — Không gian khoáng đạt ngắm trọn hồ Tây' },
                            { id: 'boutique', title: 'Khách Sạn Boutique Cao Cấp Phố Cổ', desc: 'The Oriental Jade, La Siesta — Trải nghiệm lưu trú ấm cúng ngay lòng 36 phố phường' },
                            { id: 'city5star', title: 'Khách Sạn 5 Sao Trung Tâm Hiện Đại', desc: 'Tiện nghi quốc tế, tối ưu thời gian di chuyển giữa các điểm đến' },
                            { id: 'self', title: 'Khách Tự Đặt Phòng', desc: 'Bạn đã có phòng hoặc muốn tự book khách sạn, Super EZ Tour lo các dịch vụ còn lại' }
                          ]
                      )
                    : (isKorean
                        ? [
                            { id: 'resort', title: '5성급 럭셔리 비치 리조트', desc: '프라이빗 비치 & 인피니티 풀 보유 (하얏트, 인터컨티넨탈, 풀만)' },
                            { id: 'villa', title: '프라이빗 풀빌라 (개별 수영장)', desc: '2~4베드룸 독채 빌라, 주방 & 프라이빗 바비큐 (프리미어 빌리지, 나만)' },
                            { id: '5star', title: '5성급 시내 / 한강 뷰 호텔', desc: '한강 야경 및 시내 중심가 인접 특급 호텔 (노보텔, 힐튼)' },
                            { id: '4star', title: '미케비치 인근 4성급 호텔', desc: '해변 접근성 우수, 오션뷰 가성비 호텔 (TMS, 살라)' },
                            { id: 'self', title: '숙소 직접 예약 (기타 서비스만 이용)', desc: '이미 호텔을 예약하셨거나 개별 예약 예정이신 경우' }
                          ]
                        : [
                            { id: 'resort', title: 'Luxury Resort 5 Sao Ven Biển', desc: 'Resort có bãi biển riêng, hồ bơi vô cực ngắm vịnh (Hyatt, InterCon, Pullman)' },
                            { id: 'villa', title: 'Private Villa Có Hồ Bơi Riêng', desc: 'Biệt thự riêng tư 2-4 phòng ngủ, có bếp và BBQ cho gia đình (Premier Village, Naman)' },
                            { id: '5star', title: 'Khách Sạn 5 Sao Trung Tâm / Ven Sông', desc: 'Tiện nghi quốc tế, ngắm toàn cảnh sông Hàn và các cây cầu (Novotel, Hilton)' },
                            { id: '4star', title: 'Khách Sạn 4 Sao Sát Biển Mỹ Khê', desc: 'Vị trí đắc địa, chi phí tối ưu, phòng hướng biển (TMS, Sala, Belle Maison)' },
                            { id: 'self', title: 'Khách Tự Đặt Phòng', desc: 'Bạn đã có phòng hoặc muốn tự book khách sạn, Super EZ Tour lo các dịch vụ còn lại' }
                          ]
                      )
                  ).map((opt) => (
                    <div
                      key={opt.id}
                      className={`morph-option-box ${tripState.accommodationType === opt.id ? 'morph-option-active' : ''}`}
                      onClick={() => {
                        updateField('accommodationType', opt.id);
                        updateField('accommodationName', opt.title);
                      }}
                    >
                      <div className="morph-radio-circle">
                        {tripState.accommodationType === opt.id && <div className="morph-radio-inner" />}
                      </div>
                      <div>
                        <strong>{opt.title}</strong>
                        <p>{opt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {tripState.currentStep === 3 && (
              <div className="morph-pane-block">
                <div className="morph-pane-top">
                  <span className="morph-pane-badge">
                    {isKorean ? '03 / 07 단계' : 'Bước 03 / 07'}
                  </span>
                  <h3 className="morph-pane-title">
                    {isKorean ? '전용 프리미엄 차량 선택' : 'Xe Riêng Phục Vụ Suốt Tuyến'}
                  </h3>
                  <p className="morph-pane-desc">
                    {isKorean ? '100% 최신형 단독 전용 차량 · 타인 동승 0% · 맞춤 픽업 & 샌딩.' : '100% xe đời mới, không ghép khách lạ, đưa đón tận nơi.'}
                  </p>
                </div>

                <div className="morph-options-stack">
                  {(isKorean
                    ? [
                        { id: 'suv-7', title: '7인승 최고급 SUV / MPV', desc: '포튜너, 카니발 최신형. 성인 3~5명 + 수하물 최적' },
                        { id: 'van-16', title: '16인승 최신형 투어 밴', desc: '포드 트랜짓 / 쏠라티. 가족 단체 6~12명 최적' },
                        { id: 'limousine-vip', title: 'VIP 비즈니스 리무진 (Dcar VIP)', desc: '최고급 마사지 캡틴 시트, 스타라이트 천장, 냉장고. VIP 7~9명' },
                        { id: 'coach-35', title: '35인승 유니버스 대형 버스', desc: '에어서스펜션 장착. 단체/기업 워크숍 15~28명' },
                        { id: 'coach-45', title: '45인승 하이클래스 대형 버스', desc: '초대형 수하물함 보유. 기업 대규모 단체 30~42명' },
                        { id: 'consultant', title: 'Super EZ Tour 전문 상담원 추천', desc: '실제 인원 및 수하물 수량에 따라 최적 차량 배정' }
                      ]
                    : [
                        { id: 'suv-7', title: 'Xe 7 Chỗ SUV / MPV Cao Cấp', desc: 'Fortuner, Kia Carnival đời mới. Phù hợp 3 - 5 người lớn + hành lý' },
                        { id: 'van-16', title: 'Xe 16 Chỗ Du Lịch Hiện Đại', desc: 'Ford Transit Premium / Solati. Phù hợp đoàn gia đình 6 - 12 người' },
                        { id: 'limousine-vip', title: 'Limousine VIP Hạng Thương Gia', desc: 'Ghế massage cơ trưởng, trần sao, tủ lạnh mini. Phù hợp 7 - 9 khách VIP' },
                        { id: 'coach-35', title: 'Xe Du Lịch Universe 35 Chỗ', desc: 'Giảm xóc bầu hơi êm ái. Phù hợp đoàn công ty 15 - 28 người' },
                        { id: 'coach-45', title: 'Xe Du Lịch Universe 45 Chỗ', desc: 'Khoang siêu rộng. Phù hợp đoàn doanh nghiệp lớn 30 - 42 người' },
                        { id: 'consultant', title: 'Để chuyên viên Super EZ Tour đề xuất loại xe phù hợp nhất', desc: 'Chúng tôi sẽ căn cứ vào số lượng người và hành lý thực tế' }
                      ]
                  ).map((v) => (
                    <div
                      key={v.id}
                      className={`morph-option-box ${tripState.transportType === v.id ? 'morph-option-active' : ''}`}
                      onClick={() => updateField('transportType', v.id)}
                    >
                      <div className="morph-radio-circle">
                        {tripState.transportType === v.id && <div className="morph-radio-inner" />}
                      </div>
                      <div>
                        <strong>{v.title}</strong>
                        <p>{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 */}
            {tripState.currentStep === 4 && (
              <div className="morph-pane-block">
                <div className="morph-pane-top">
                  <span className="morph-pane-badge">
                    {isKorean ? '04 / 07 단계' : 'Bước 04 / 07'}
                  </span>
                  <h3 className="morph-pane-title">
                    {isKorean ? '전담 현지 가이드 동행 여부' : 'Hướng Dẫn Viên Bản Địa'}
                  </h3>
                  <p className="morph-pane-desc">
                    {isKorean ? '우리 가족만을 위한 1:1 전담 케어 · 역사/문화 해설 및 프라이빗 케어.' : 'Đồng hành độc quyền cùng gia đình, chu đáo và tôn trọng sự riêng tư.'}
                  </p>
                </div>

                <div className="morph-options-stack">
                  {(isKorean
                    ? [
                        { id: 'dedicated', title: '1:1 전담 프라이빗 가이드 (적극 권장)', desc: '깊이 있는 역사 문화 해설, 인생샷 촬영, 명소 우선 입장 지원' },
                        { id: 'none', title: '가이드 미포함 (단독 전용차량 & 기사님만 배정)', desc: '우리 일행만의 완벽히 자유로운 독립 일정 선호' }
                      ]
                    : [
                        { id: 'dedicated', title: 'Cần Hướng Dẫn Viên Riêng Chuyên Tuyến (Khuyến khích)', desc: 'HDV bản địa thuyết minh sâu sắc văn hóa, hỗ trợ chụp ảnh, sắp xếp vé ưu tiên' },
                        { id: 'none', title: 'Không Cần HDV (Chỉ cần xe riêng & tài xế điềm đạm)', desc: 'Gia đình muốn hoàn toàn tự do khám phá theo cách riêng' }
                      ]
                  ).map((g) => (
                    <div
                      key={g.id}
                      className={`morph-option-box ${tripState.guideOption === g.id ? 'morph-option-active' : ''}`}
                      onClick={() => updateField('guideOption', g.id)}
                    >
                      <div className="morph-radio-circle">
                        {tripState.guideOption === g.id && <div className="morph-radio-inner" />}
                      </div>
                      <div>
                        <strong>{g.title}</strong>
                        <p>{g.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {tripState.guideOption === 'dedicated' && (
                  <div className="morph-field">
                    <label className="morph-label">{isKorean ? '가이드 언어:' : 'Ngôn ngữ mong muốn:'}</label>
                    <div className="morph-pills-row">
                      {(isKorean
                        ? ['한국어 (전담)', '영어', '베트남어']
                        : ['Tiếng Việt', 'Tiếng Anh', 'Tiếng Hàn', 'Tiếng Trung', 'Tiếng Nhật']
                      ).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          className={`morph-pill-opt ${tripState.guideLanguage === lang ? 'morph-pill-active' : ''}`}
                          onClick={() => updateField('guideLanguage', lang)}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 5 */}
            {tripState.currentStep === 5 && (
              <div className="morph-pane-block">
                <div className="morph-pane-top">
                  <span className="morph-pane-badge">
                    {isKorean ? '05 / 07 단계' : 'Bước 05 / 07'}
                  </span>
                  <h3 className="morph-pane-title">
                    {isKorean ? `${destShortName} 항공권 예약 지원` : `Hỗ Trợ Vé Máy Bay Đến ${destShortName}`}
                  </h3>
                  <p className="morph-pane-desc">
                    {isKorean
                      ? `최적 항공 스케줄 안내 및 ${destinationConfig?.id === 'ha-noi' ? 'HAN' : 'DAD'} 공항 픽업/샌딩 연계.`
                      : `Tư vấn giờ bay đẹp và kết nối đưa đón sân bay ${destinationConfig?.id === 'ha-noi' ? 'Nội Bài (HAN)' : 'Đà Nẵng (DAD)'}.`}
                  </p>
                </div>

                <div className="morph-options-stack">
                  {(isKorean
                    ? [
                        { id: 'need_support', title: '왕복 항공권 예약 지원 요청', desc: '최적 시간대 항공권 추천 및 전용 차량 공항 픽업 연계' },
                        { id: 'have_ticket', title: '항공권 개별 발권 완료', desc: `도착 항공편 시간에 맞춰 ${destinationConfig?.id === 'ha-noi' ? 'HAN' : 'DAD'} 공항 단독 픽업만 연결` },
                        { id: 'undecided', title: '일정 확정 후 추후 결정', desc: '여행 일정 및 견적을 먼저 확인한 후 항공권 결정' }
                      ]
                    : [
                        { id: 'need_support', title: 'Cần Hỗ Trợ Đặt Vé Máy Bay Khứ Hồi', desc: 'Tư vấn giờ bay đẹp, kết hợp đón sân bay bằng xe riêng liền mạch' },
                        { id: 'have_ticket', title: 'Đã Tự Đặt Vé Máy Bay', desc: `Chỉ cần xe riêng đón tại sân bay ${destinationConfig?.id === 'ha-noi' ? 'Nội Bài HAN' : 'Quốc tế Đà Nẵng DAD'} theo giờ hạ cánh` },
                        { id: 'undecided', title: 'Chưa Quyết Định (Tư vấn sau)', desc: 'Cần xem lịch trình tour trước rồi mới quyết định mua vé' }
                      ]
                  ).map((f) => (
                    <div
                      key={f.id}
                      className={`morph-option-box ${tripState.flightOption === f.id ? 'morph-option-active' : ''}`}
                      onClick={() => updateField('flightOption', f.id)}
                    >
                      <div className="morph-radio-circle">
                        {tripState.flightOption === f.id && <div className="morph-radio-inner" />}
                      </div>
                      <div>
                        <strong>{f.title}</strong>
                        <p>{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {tripState.flightOption === 'need_support' && (
                  <div className="morph-field">
                    <label className="morph-label">{isKorean ? '출발 공항:' : 'Thành phố cất cánh dự kiến:'}</label>
                    <div className="morph-pills-row">
                      {(isKorean
                        ? ['인천 (ICN)', '부산 (PUS)', '대구 (TAE)', '기타 / 국내선']
                        : (destinationConfig?.id === 'ha-noi'
                            ? ['TP. Hồ Chí Minh (SGN)', 'Đà Nẵng (DAD)', 'Nha Trang (CXR)', 'Phú Quốc (PQC)', 'Quốc tế']
                            : ['Hà Nội (HAN)', 'TP. Hồ Chí Minh (SGN)', 'Hải Phòng (HPH)', 'Quốc tế'])
                      ).map((city) => (
                        <button
                          key={city}
                          type="button"
                          className={`morph-pill-opt ${tripState.departureCity === city ? 'morph-pill-active' : ''}`}
                          onClick={() => updateField('departureCity', city)}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 6 */}
            {tripState.currentStep === 6 && (
              <div className="morph-pane-block">
                <div className="morph-pane-top">
                  <span className="morph-pane-badge">
                    {isKorean ? '06 / 07 단계' : 'Bước 06 / 07'}
                  </span>
                  <h3 className="morph-pane-title">
                    {isKorean ? '희망 명소 & 미식 큐레이션' : 'Tọa Độ Tham Quan & Ẩm Thực'}
                  </h3>
                  <p className="morph-pane-desc">
                    {isKorean
                      ? `${destShortName}에서 꼭 경험하고 싶은 명소와 미식 스타일을 선택하세요.`
                      : `Chọn những điểm bạn muốn ghé thăm tại ${destShortName}.`}
                  </p>
                </div>

                <div className="morph-field">
                  <label className="morph-label">
                    {isKorean
                      ? `방문 희망 명소 (${tripState.selectedAttractions.length}개 선택됨):`
                      : `Tọa độ muốn ghé thăm (${tripState.selectedAttractions.length} đã chọn):`}
                  </label>
                  <div className="morph-check-grid">
                    {(destinationConfig?.attractions?.items
                      ? destinationConfig.attractions.items.map((spot) => ({
                          id: spot.id,
                          name: isKorean ? (spot.nameKr || spot.name) : (spot.nameVi || spot.name),
                        }))
                      : (isKorean
                          ? [
                              { id: 'ba-na-hills', name: '바나힐 & 골든 브릿지' },
                              { id: 'my-khe-beach', name: '미케 비치 해변' },
                              { id: 'son-tra-peninsula', name: '손짜 반도 & 린응사' },
                              { id: 'marble-mountains', name: '오행산 & 후옌콩 동굴' },
                              { id: 'dragon-bridge', name: '용다리 야경 & 한강 유람선' },
                              { id: 'hai-van-pass', name: '하이반 고개 & 랑코만' },
                              { id: 'hoi-an-ancient-town', name: '호이안 올드타운 (투본강 소원배)' }
                            ]
                          : [
                              { id: 'ba-na-hills', name: 'Bà Nà Hills & Cầu Vàng' },
                              { id: 'my-khe-beach', name: 'Bãi biển Mỹ Khê' },
                              { id: 'son-tra-peninsula', name: 'Bán đảo Sơn Trà & Chùa Linh Ứng' },
                              { id: 'marble-mountains', name: 'Ngũ Hành Sơn & Động Huyền Không' },
                              { id: 'dragon-bridge', name: 'Cầu Rồng & Du thuyền sông Hàn' },
                              { id: 'hai-van-pass', name: 'Đèo Hải Vân & Vịnh Lăng Cô' },
                              { id: 'hoi-an-ancient-town', name: 'Phố cổ Hội An (Thả hoa đăng sông Hoài)' }
                            ]
                        )
                    ).map((spot) => {
                      const isChecked = tripState.selectedAttractions.includes(spot.id);
                      return (
                        <div
                          key={spot.id}
                          className={`morph-check-box ${isChecked ? 'morph-check-active' : ''}`}
                          onClick={() => toggleAttraction(spot.id)}
                        >
                          <div className="morph-check-icon-wrap">
                            {isChecked && <Check size={13} />}
                          </div>
                          <span>{spot.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="morph-field">
                  <label className="morph-label">
                    {isKorean ? '선호하는 미식 스타일:' : 'Phong cách ẩm thực ưa thích:'}
                  </label>
                  <div className="morph-check-grid">
                    {(destinationConfig?.culinary?.dishes
                      ? destinationConfig.culinary.dishes.map((dish) =>
                          isKorean ? (dish.nameKr || dish.name) : (dish.nameVi || dish.name)
                        )
                      : (isKorean
                          ? [
                              '현지 대표 미식 (미꽝, 반짱팃헤오 등)',
                              '당일 조업 활 해산물 만찬',
                              '비치 프론트 파인다이닝 / 로맨틱 캔들라이트 디너',
                              '온 가족이 함께 즐기는 편안한 패밀리 다이닝'
                            ]
                          : [
                              'Đặc sản địa phương (Mì Quảng, Bánh tráng thịt heo)',
                              'Hải sản tươi sống bắt tại bể',
                              'Nhà hàng Fine Dining / Tiệc tối lãng mạn bên biển',
                              'Ẩm thực gia đình đa thế hệ'
                            ]
                        )
                    ).map((food) => {
                      const isChecked = isCulinarySelected(tripState.culinaryPreferences, food);
                      return (
                        <div
                          key={food}
                          className={`morph-check-box ${isChecked ? 'morph-check-active' : ''}`}
                          onClick={() => toggleCulinary(food)}
                        >
                          <div className="morph-check-icon-wrap">
                            {isChecked && <Check size={13} />}
                          </div>
                          <span>{food}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="morph-field">
                  <label className="morph-label">
                    {isKorean ? '추가 요청 사항 (선택)' : 'Yêu cầu riêng (nếu có)'}
                  </label>
                  <textarea
                    rows={3}
                    className="morph-textarea"
                    placeholder={
                      isKorean
                        ? '기타 요청 사항: 유아용 카시트 필요, 부모님 기념 여행, 부드러운 식사 선호 등...'
                        : 'Ghi chú thêm: cần ghế trẻ em, chuyến đi kỷ niệm ngày cưới, khẩu vị ăn nhạt...'
                    }
                    value={tripState.specialRequests}
                    onChange={(e) => updateField('specialRequests', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 7 */}
            {tripState.currentStep === 7 && (
              <div className="morph-pane-block">
                <div className="morph-pane-top">
                  <span className="morph-pane-badge">
                    {isKorean ? '07 / 07 단계' : 'Bước 07 / 07'}
                  </span>
                  <h3 className="morph-pane-title">
                    {isKorean ? '예약자 정보 입력 & 맞춤 견적서 수신' : 'Xác Nhận & Nhận Báo Giá Độc Bản'}
                  </h3>
                  <p className="morph-pane-desc">
                    {isKorean
                      ? '연락처를 남겨주시면 30분 이내에 한국어 전담 매니저가 1:1 맞춤 견적서를 보내드립니다.'
                      : 'Để lại thông tin để chuyên gia Super EZ Tour gửi bản phác thảo chi tiết.'}
                  </p>
                </div>

                <div className="morph-inputs-grid">
                  <div className="morph-field">
                    <label className="morph-label">{isKorean ? '성함 *' : 'Họ và tên của bạn *'}</label>
                    <input
                      type="text"
                      className={`morph-input ${formErrors.contactName ? 'morph-input-err' : ''}`}
                      placeholder={isKorean ? '예: 김민준' : 'Ví dụ: Nguyễn Văn An'}
                      value={tripState.contactName}
                      onChange={(e) => updateField('contactName', e.target.value)}
                    />
                    {formErrors.contactName && <span className="morph-err-msg">{formErrors.contactName}</span>}
                  </div>

                  <div className="morph-field">
                    <label className="morph-label">{isKorean ? '연락처 / 카카오톡 ID *' : 'Số điện thoại / Zalo *'}</label>
                    <input
                      type="tel"
                      className={`morph-input ${formErrors.contactPhone ? 'morph-input-err' : ''}`}
                      placeholder={isKorean ? '예: 010-1234-5678 또는 카톡 ID' : 'Ví dụ: 0912 345 678'}
                      value={tripState.contactPhone}
                      onChange={(e) => updateField('contactPhone', e.target.value)}
                    />
                    {formErrors.contactPhone && <span className="morph-err-msg">{formErrors.contactPhone}</span>}
                  </div>

                  <div className="morph-field">
                    <label className="morph-label">{isKorean ? '이메일 주소 (선택)' : 'Email nhận lịch trình (tùy chọn)'}</label>
                    <input
                      type="email"
                      className="morph-input"
                      placeholder="email@example.com"
                      value={tripState.contactEmail}
                      onChange={(e) => updateField('contactEmail', e.target.value)}
                    />
                  </div>

                  <div className="morph-field">
                    <label className="morph-label">{isKorean ? '선호하는 상담 채널:' : 'Kênh tư vấn bạn ưu tiên:'}</label>
                    <div className="morph-pills-row">
                      {[
                        { id: 'zalo', label: isKorean ? '카카오톡 상담' : 'Tư vấn qua Zalo' },
                        { id: 'phone', label: isKorean ? '전화 통화' : 'Gọi điện thoại' },
                        { id: 'whatsapp', label: 'WhatsApp / Email' }
                      ].map((ch) => (
                        <button
                          key={ch.id}
                          type="button"
                          className={`morph-pill-opt ${tripState.preferredChannel === ch.id ? 'morph-pill-active' : ''}`}
                          onClick={() => updateField('preferredChannel', ch.id)}
                        >
                          {ch.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="morph-privacy">
                    <label className="morph-privacy-label">
                      <input
                        type="checkbox"
                        checked={tripState.agreePrivacy}
                        onChange={(e) => updateField('agreePrivacy', e.target.checked)}
                      />
                      <span>
                        {isKorean
                          ? 'Super EZ Tour의 개인정보 처리방침에 동의하며, 1:1 프라이빗 맞춤 여행 상담을 신청합니다.'
                          : 'Tôi đồng ý nhận tư vấn lịch trình riêng theo chính sách bảo mật của Super EZ Tour.'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Actions */}
            <div className="morph-action-btns">
              {tripState.currentStep > 1 && (
                <button type="button" className="dest-btn-ghost morph-back-btn" onClick={prevStep}>
                  <ChevronLeft size={16} />
                  <span>{isKorean ? '이전 단계' : 'Quay lại'}</span>
                </button>
              )}

              {tripState.currentStep < 7 ? (
                <button type="button" className="dest-btn-primary morph-next-btn" onClick={handleNext}>
                  <span>{isKorean ? '다음 단계' : 'Tiếp tục bước kế tiếp'}</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button type="button" className="dest-btn-primary morph-submit-btn" onClick={handleSubmit}>
                  <span>{isKorean ? '1:1 맞춤 견적서 받기' : 'Gửi yêu cầu & Lên lịch trình ngay'}</span>
                  <Sparkles size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Summary Panel */}
          <div className="trip-morph-summary-pane">
            <div className="morph-summary-card">
              <div className="morph-sum-header">
                <span className="dest-badge dest-badge-gold">
                  <ShieldCheck size={12} />
                  <span>{isKorean ? '100% 프라이빗 투어' : 'Tour Riêng 100%'}</span>
                </span>
                <h4 className="morph-sum-title">{isKorean ? '나의 맞춤 여행 플랜' : 'Hành Trình Của Bạn'}</h4>
                <span className="morph-sum-dest">
                  {destNameDisplay}
                </span>
              </div>

              <div className="morph-sum-items">
                <div className="morph-sum-row">
                  <Calendar size={15} className="morph-sum-icon" />
                  <div>
                    <span className="morph-sum-lbl">{isKorean ? '여행 기간' : 'Thời gian'}</span>
                    <strong>
                      {isKorean
                        ? `${tripState.durationDays - 1}박 ${tripState.durationDays}일`
                        : `${tripState.durationDays} Ngày ${tripState.durationDays - 1} Đêm`}
                    </strong>
                  </div>
                </div>

                <div className="morph-sum-row">
                  <Users size={15} className="morph-sum-icon" />
                  <div>
                    <span className="morph-sum-lbl">{isKorean ? '여행 인원' : 'Quy mô đoàn'}</span>
                    <strong>
                      {isKorean
                        ? `성인 ${tripState.adultsCount}명${tripState.childrenCount > 0 ? `, 아동 ${tripState.childrenCount}명` : ''}`
                        : `${tripState.adultsCount} Người lớn ${tripState.childrenCount > 0 ? `, ${tripState.childrenCount} Trẻ` : ''}`}
                    </strong>
                  </div>
                </div>

                <div className="morph-sum-row">
                  <Bed size={15} className="morph-sum-icon" />
                  <div>
                    <span className="morph-sum-lbl">{isKorean ? '숙소' : 'Lưu trú'}</span>
                    <strong>{tripState.accommodationName || tripState.accommodationType}</strong>
                  </div>
                </div>

                <div className="morph-sum-row">
                  <Car size={15} className="morph-sum-icon" />
                  <div>
                    <span className="morph-sum-lbl">{isKorean ? '전용 차량' : 'Xe phục vụ'}</span>
                    <strong>{tripState.transportType}</strong>
                  </div>
                </div>

                <div className="morph-sum-row">
                  <UserCheck size={15} className="morph-sum-icon" />
                  <div>
                    <span className="morph-sum-lbl">{isKorean ? '가이드' : 'Hướng dẫn viên'}</span>
                    <strong>
                      {tripState.guideOption === 'dedicated'
                        ? (isKorean ? `전담 가이드 (${tripState.guideLanguage})` : `HDV Riêng (${tripState.guideLanguage})`)
                        : (isKorean ? '가이드 미포함' : 'Không yêu cầu')}
                    </strong>
                  </div>
                </div>

                <div className="morph-sum-row">
                  <MapPin size={15} className="morph-sum-icon" />
                  <div>
                    <span className="morph-sum-lbl">
                      {isKorean ? `선택 명소 (${tripState.selectedAttractions.length})` : `Tọa độ đã chọn (${tripState.selectedAttractions.length})`}
                    </span>
                    <span className="morph-sum-spots-text">
                      {tripState.selectedAttractions.join(', ') || (isKorean ? '선택 없음' : 'Chưa chọn')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="morph-sum-guarantee">
                <Check size={14} className="morph-guar-check" />
                <span>{isKorean ? '쇼핑 강요 0% 보장 · 숨은 추가 비용 없음' : 'Cam kết 0% Shopping · Không phụ phí ẩn'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripBuilderMorph;
