import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Users,
  Bed,
  Car,
  UserCheck,
  Plane,
  MapPin,
  Utensils,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Phone,
  MessageCircle,
  FileCheck
} from 'lucide-react';
import { useTripBuilder } from '../../context/TripBuilderContext';
import './TripBuilderMorph.css';

const STEPS = [
  { id: 1, label: 'Thông tin' },
  { id: 2, label: 'Lưu trú' },
  { id: 3, label: 'Phương tiện' },
  { id: 4, label: 'HDV riêng' },
  { id: 5, label: 'Vé máy bay' },
  { id: 6, label: 'Tọa độ & Món' },
  { id: 7, label: 'Gửi yêu cầu' }
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

  const [formErrors, setFormErrors] = useState({});

  const validateCurrentStep = () => {
    const errors = {};
    if (tripState.currentStep === 1) {
      if (tripState.adultsCount < 1) errors.adultsCount = 'Vui lòng chọn ít nhất 1 người lớn';
    } else if (tripState.currentStep === 7) {
      if (!tripState.contactName.trim()) errors.contactName = 'Vui lòng nhập họ và tên của bạn';
      if (!tripState.contactPhone.trim()) errors.contactPhone = 'Vui lòng nhập số điện thoại hoặc Zalo';
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
              <span>HỒ SƠ HÀNH TRÌNH ĐÃ TIẾP NHẬN</span>
            </span>

            <h2 className="dest-title-editorial morph-success-heading">
              Cảm ơn {tripState.contactName || 'Quý khách'}!
            </h2>

            <p className="morph-success-code-line">
              Mã hồ sơ hành trình cá nhân hóa của bạn:{' '}
              <strong className="morph-code-pill">{tripState.submittedQuoteCode}</strong>
            </p>

            <div className="morph-success-summary-box">
              <h4>Chi tiết cấu hình tour riêng {tripState.destination}:</h4>
              <ul>
                <li><strong>Thời gian:</strong> {tripState.departureDate || 'Linh hoạt'} ({tripState.durationDays} Ngày {tripState.durationDays - 1} Đêm)</li>
                <li><strong>Quy mô đoàn:</strong> {tripState.adultsCount} Người lớn {tripState.childrenCount > 0 ? `, ${tripState.childrenCount} Trẻ em` : ''}</li>
                <li><strong>Lưu trú:</strong> {tripState.accommodationName || tripState.accommodationType}</li>
                <li><strong>Phương tiện:</strong> {tripState.transportType}</li>
                <li><strong>Tọa độ tham quan:</strong> {tripState.selectedAttractions.length} điểm đã chọn</li>
              </ul>
            </div>

            <p className="morph-success-promise">
              Chuyên viên điều hành Super EZ Tour chuyên trách Đà Nẵng sẽ liên hệ qua{' '}
              <strong>{tripState.preferredChannel === 'zalo' ? 'Zalo' : 'Điện thoại'} ({tripState.contactPhone})</strong>{' '}
              trong vòng <strong>30 phút</strong> để gửi bản dự toán minh bạch và phác thảo lịch trình chi tiết.
            </p>

            <div className="morph-success-buttons">
              <a href="tel:19008899" className="dest-btn-primary">
                <Phone size={16} />
                <span>Hotline ưu tiên: 1900 8899</span>
              </a>
              <button type="button" className="dest-btn-ghost" onClick={resetTrip}>
                <span>Thiết kế hành trình mới</span>
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
            Trình Thiết Kế Chuyến Đi Cá Nhân Hóa
          </h2>
          <p className="dest-subtitle trip-morph-sub">
            Chủ động lựa chọn từng dịch vụ theo sở thích · Đội ngũ chuyên gia Super EZ Tour sẽ hoàn thiện bản kế hoạch độc bản dành riêng cho bạn.
          </p>
        </div>

        {/* Morphing Progress Navigation */}
        <div className="morph-progress-tracker">
          <div className="morph-steps-nav">
            {STEPS.map((s) => (
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
            style={{ width: `${((tripState.currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
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
                  <span className="morph-pane-badge">Bước 01 / 07</span>
                  <h3 className="morph-pane-title">Thông Tin Chuyến Đi Cơ Bản</h3>
                  <p className="morph-pane-desc">Chọn thời gian và quy mô đoàn của gia đình bạn.</p>
                </div>

                <div className="morph-inputs-grid">
                  <div className="morph-field">
                    <label className="morph-label">Điểm đến</label>
                    <input type="text" className="morph-input" value={tripState.destination} readOnly />
                  </div>

                  <div className="morph-field">
                    <label className="morph-label">Số ngày hành trình</label>
                    <div className="morph-pills-row">
                      {[3, 4, 5, 6, 7].map((days) => (
                        <button
                          key={days}
                          type="button"
                          className={`morph-pill-opt ${tripState.durationDays === days ? 'morph-pill-active' : ''}`}
                          onClick={() => updateField('durationDays', days)}
                        >
                          {days} Ngày {days - 1} Đêm
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="morph-field">
                    <label className="morph-label">Ngày khởi hành dự kiến</label>
                    <input
                      type="date"
                      className="morph-input"
                      value={tripState.departureDate}
                      onChange={(e) => updateField('departureDate', e.target.value)}
                    />
                  </div>

                  <div className="morph-field-duo">
                    <div className="morph-field">
                      <label className="morph-label">Người lớn (từ 12 tuổi)</label>
                      <div className="morph-counter">
                        <button type="button" onClick={() => updateField('adultsCount', Math.max(1, tripState.adultsCount - 1))}>-</button>
                        <span>{tripState.adultsCount}</span>
                        <button type="button" onClick={() => updateField('adultsCount', tripState.adultsCount + 1)}>+</button>
                      </div>
                    </div>

                    <div className="morph-field">
                      <label className="morph-label">Trẻ em (dưới 12 tuổi)</label>
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
                  <span className="morph-pane-badge">Bước 02 / 07</span>
                  <h3 className="morph-pane-title">Phong Cách Lưu Trú Bạn Ưa Thích</h3>
                  <p className="morph-pane-desc">Lựa chọn tiêu chuẩn nghỉ dưỡng phù hợp với mong muốn.</p>
                </div>

                <div className="morph-options-stack">
                  {[
                    { id: 'resort', title: 'Luxury Resort 5 Sao Ven Biển', desc: 'Resort có bãi biển riêng, hồ bơi vô cực ngắm vịnh (Hyatt, InterCon, Pullman)' },
                    { id: 'villa', title: 'Private Villa Có Hồ Bơi Riêng', desc: 'Biệt thự riêng tư 2-4 phòng ngủ, có bếp và BBQ cho gia đình (Premier Village, Naman)' },
                    { id: '5star', title: 'Khách Sạn 5 Sao Trung Tâm / Ven Sông', desc: 'Tiện nghi quốc tế, ngắm toàn cảnh sông Hàn và các cây cầu (Novotel, Hilton)' },
                    { id: '4star', title: 'Khách Sạn 4 Sao Sát Biển Mỹ Khê', desc: 'Vị trí đắc địa, chi phí tối ưu, phòng hướng biển (TMS, Sala, Belle Maison)' },
                    { id: 'self', title: 'Khách Tự Đặt Phòng', desc: 'Bạn đã có phòng hoặc muốn tự book khách sạn, Super EZ Tour lo các dịch vụ còn lại' }
                  ].map((opt) => (
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
                  <span className="morph-pane-badge">Bước 03 / 07</span>
                  <h3 className="morph-pane-title">Xe Riêng Phục Vụ Suốt Tuyến</h3>
                  <p className="morph-pane-desc">100% xe đời mới, không ghép khách lạ, đưa đón tận nơi.</p>
                </div>

                <div className="morph-options-stack">
                  {[
                    { id: 'suv-7', title: 'Xe 7 Chỗ SUV / MPV Cao Cấp', desc: 'Fortuner, Kia Carnival đời mới. Phù hợp 3 - 5 người lớn + hành lý' },
                    { id: 'van-16', title: 'Xe 16 Chỗ Du Lịch Hiện Đại', desc: 'Ford Transit Premium / Solati. Phù hợp đoàn gia đình 6 - 12 người' },
                    { id: 'limousine-vip', title: 'Limousine VIP Hạng Thương Gia', desc: 'Ghế massage cơ trưởng, trần sao, tủ lạnh mini. Phù hợp 7 - 9 khách VIP' },
                    { id: 'coach-35', title: 'Xe Du Lịch Universe 35 Chỗ', desc: 'Giảm xóc bầu hơi êm ái. Phù hợp đoàn công ty 15 - 28 người' },
                    { id: 'coach-45', title: 'Xe Du Lịch Universe 45 Chỗ', desc: 'Khoang siêu rộng. Phù hợp đoàn doanh nghiệp lớn 30 - 42 người' },
                    { id: 'consultant', title: 'Để chuyên viên Super EZ Tour đề xuất loại xe phù hợp nhất', desc: 'Chúng tôi sẽ căn cứ vào số lượng người và hành lý thực tế' }
                  ].map((v) => (
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
                  <span className="morph-pane-badge">Bước 04 / 07</span>
                  <h3 className="morph-pane-title">Hướng Dẫn Viên Bản Địa</h3>
                  <p className="morph-pane-desc">Đồng hành độc quyền cùng gia đình, chu đáo và tôn trọng sự riêng tư.</p>
                </div>

                <div className="morph-options-stack">
                  {[
                    { id: 'dedicated', title: 'Cần Hướng Dẫn Viên Riêng Chuyên Tuyến (Khuyến khích)', desc: 'HDV bản địa thuyết minh sâu sắc văn hóa, hỗ trợ chụp ảnh, sắp xếp vé ưu tiên' },
                    { id: 'none', title: 'Không Cần HDV (Chỉ cần xe riêng & tài xế điềm đạm)', desc: 'Gia đình muốn hoàn toàn tự do khám phá theo cách riêng' }
                  ].map((g) => (
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
                    <label className="morph-label">Ngôn ngữ mong muốn:</label>
                    <div className="morph-pills-row">
                      {['Tiếng Việt', 'Tiếng Anh', 'Tiếng Hàn', 'Tiếng Trung', 'Tiếng Nhật'].map((lang) => (
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
                  <span className="morph-pane-badge">Bước 05 / 07</span>
                  <h3 className="morph-pane-title">Hỗ Trợ Vé Máy Bay Đến Đà Nẵng</h3>
                  <p className="morph-pane-desc">Tư vấn giờ bay đẹp và kết nối đưa đón sân bay DAD.</p>
                </div>

                <div className="morph-options-stack">
                  {[
                    { id: 'need_support', title: 'Cần Hỗ Trợ Đặt Vé Máy Bay Khứ Hồi', desc: 'Tư vấn giờ bay đẹp, kết hợp đón sân bay bằng xe riêng liền mạch' },
                    { id: 'have_ticket', title: 'Đã Tự Đặt Vé Máy Bay', desc: 'Chỉ cần xe riêng đón tại sân bay Quốc tế Đà Nẵng DAD theo giờ hạ cánh' },
                    { id: 'undecided', title: 'Chưa Quyết Định (Tư vấn sau)', desc: 'Cần xem lịch trình tour trước rồi mới quyết định mua vé' }
                  ].map((f) => (
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
                    <label className="morph-label">Thành phố cất cánh dự kiến:</label>
                    <div className="morph-pills-row">
                      {['Hà Nội (HAN)', 'TP. Hồ Chí Minh (SGN)', 'Hải Phòng (HPH)', 'Quốc tế'].map((city) => (
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
                  <span className="morph-pane-badge">Bước 06 / 07</span>
                  <h3 className="morph-pane-title">Tọa Độ Tham Quan & Ẩm Thực</h3>
                  <p className="morph-pane-desc">Chọn những điểm bạn muốn ghé thăm tại Đà Nẵng & Hội An.</p>
                </div>

                <div className="morph-field">
                  <label className="morph-label">Tọa độ muốn ghé thăm ({tripState.selectedAttractions.length} đã chọn):</label>
                  <div className="morph-check-grid">
                    {[
                      { id: 'ba-na-hills', name: 'Bà Nà Hills & Cầu Vàng' },
                      { id: 'my-khe-beach', name: 'Bãi biển Mỹ Khê' },
                      { id: 'son-tra-peninsula', name: 'Bán đảo Sơn Trà & Chùa Linh Ứng' },
                      { id: 'marble-mountains', name: 'Ngũ Hành Sơn & Động Huyền Không' },
                      { id: 'dragon-bridge', name: 'Cầu Rồng & Du thuyền sông Hàn' },
                      { id: 'hai-van-pass', name: 'Đèo Hải Vân & Vịnh Lăng Cô' },
                      { id: 'hoi-an-ancient-town', name: 'Phố cổ Hội An (Thả hoa đăng sông Hoài)' }
                    ].map((spot) => {
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
                  <label className="morph-label">Phong cách ẩm thực ưa thích:</label>
                  <div className="morph-check-grid">
                    {[
                      'Đặc sản địa phương (Mì Quảng, Bánh tráng thịt heo)',
                      'Hải sản tươi sống bắt tại bể',
                      'Nhà hàng Fine Dining / Tiệc tối lãng mạn bên biển',
                      'Ẩm thực gia đình đa thế hệ'
                    ].map((food) => {
                      const isChecked = tripState.culinaryPreferences.includes(food);
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
                  <label className="morph-label">Yêu cầu riêng (nếu có)</label>
                  <textarea
                    rows={3}
                    className="morph-textarea"
                    placeholder="Ghi chú thêm: cần ghế trẻ em, chuyến đi kỷ niệm ngày cưới, khẩu vị ăn nhạt..."
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
                  <span className="morph-pane-badge">Bước 07 / 07</span>
                  <h3 className="morph-pane-title">Xác Nhận & Nhận Báo Giá Độc Bản</h3>
                  <p className="morph-pane-desc">Để lại thông tin để chuyên gia Super EZ Tour gửi bản phác thảo chi tiết.</p>
                </div>

                <div className="morph-inputs-grid">
                  <div className="morph-field">
                    <label className="morph-label">Họ và tên của bạn *</label>
                    <input
                      type="text"
                      className={`morph-input ${formErrors.contactName ? 'morph-input-err' : ''}`}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={tripState.contactName}
                      onChange={(e) => updateField('contactName', e.target.value)}
                    />
                    {formErrors.contactName && <span className="morph-err-msg">{formErrors.contactName}</span>}
                  </div>

                  <div className="morph-field">
                    <label className="morph-label">Số điện thoại / Zalo *</label>
                    <input
                      type="tel"
                      className={`morph-input ${formErrors.contactPhone ? 'morph-input-err' : ''}`}
                      placeholder="Ví dụ: 0912 345 678"
                      value={tripState.contactPhone}
                      onChange={(e) => updateField('contactPhone', e.target.value)}
                    />
                    {formErrors.contactPhone && <span className="morph-err-msg">{formErrors.contactPhone}</span>}
                  </div>

                  <div className="morph-field">
                    <label className="morph-label">Email nhận lịch trình (tùy chọn)</label>
                    <input
                      type="email"
                      className="morph-input"
                      placeholder="email@example.com"
                      value={tripState.contactEmail}
                      onChange={(e) => updateField('contactEmail', e.target.value)}
                    />
                  </div>

                  <div className="morph-field">
                    <label className="morph-label">Kênh tư vấn bạn ưu tiên:</label>
                    <div className="morph-pills-row">
                      {[
                        { id: 'zalo', label: 'Tư vấn qua Zalo' },
                        { id: 'phone', label: 'Gọi điện thoại' },
                        { id: 'whatsapp', label: 'WhatsApp' }
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
                      <span>Tôi đồng ý nhận tư vấn lịch trình riêng theo chính sách bảo mật của Super EZ Tour.</span>
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
                  <span>Quay lại</span>
                </button>
              )}

              {tripState.currentStep < 7 ? (
                <button type="button" className="dest-btn-primary morph-next-btn" onClick={handleNext}>
                  <span>Tiếp tục bước kế tiếp</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button type="button" className="dest-btn-primary morph-submit-btn" onClick={handleSubmit}>
                  <span>Gửi yêu cầu & Lên lịch trình ngay</span>
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
                  <span>Tour Riêng 100%</span>
                </span>
                <h4 className="morph-sum-title">Hành Trình Của Bạn</h4>
                <span className="morph-sum-dest">{tripState.destination}</span>
              </div>

              <div className="morph-sum-items">
                <div className="morph-sum-row">
                  <Calendar size={15} className="morph-sum-icon" />
                  <div>
                    <span className="morph-sum-lbl">Thời gian</span>
                    <strong>{tripState.durationDays} Ngày {tripState.durationDays - 1} Đêm</strong>
                  </div>
                </div>

                <div className="morph-sum-row">
                  <Users size={15} className="morph-sum-icon" />
                  <div>
                    <span className="morph-sum-lbl">Quy mô đoàn</span>
                    <strong>{tripState.adultsCount} Người lớn {tripState.childrenCount > 0 ? `, ${tripState.childrenCount} Trẻ` : ''}</strong>
                  </div>
                </div>

                <div className="morph-sum-row">
                  <Bed size={15} className="morph-sum-icon" />
                  <div>
                    <span className="morph-sum-lbl">Lưu trú</span>
                    <strong>{tripState.accommodationName || tripState.accommodationType}</strong>
                  </div>
                </div>

                <div className="morph-sum-row">
                  <Car size={15} className="morph-sum-icon" />
                  <div>
                    <span className="morph-sum-lbl">Xe phục vụ</span>
                    <strong>{tripState.transportType}</strong>
                  </div>
                </div>

                <div className="morph-sum-row">
                  <UserCheck size={15} className="morph-sum-icon" />
                  <div>
                    <span className="morph-sum-lbl">Hướng dẫn viên</span>
                    <strong>{tripState.guideOption === 'dedicated' ? `HDV Riêng (${tripState.guideLanguage})` : 'Không yêu cầu'}</strong>
                  </div>
                </div>

                <div className="morph-sum-row">
                  <MapPin size={15} className="morph-sum-icon" />
                  <div>
                    <span className="morph-sum-lbl">Tọa độ đã chọn ({tripState.selectedAttractions.length})</span>
                    <span className="morph-sum-spots-text">{tripState.selectedAttractions.join(', ') || 'Chưa chọn'}</span>
                  </div>
                </div>
              </div>

              <div className="morph-sum-guarantee">
                <Check size={14} className="morph-guar-check" />
                <span>Cam kết 0% Shopping · Không phụ phí ẩn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripBuilderMorph;