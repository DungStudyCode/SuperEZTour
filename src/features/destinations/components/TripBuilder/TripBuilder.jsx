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
import './TripBuilder.css';

const STEPS = [
  { id: 1, label: 'Thông tin' },
  { id: 2, label: 'Lưu trú' },
  { id: 3, label: 'Phương tiện' },
  { id: 4, label: 'HDV riêng' },
  { id: 5, label: 'Vé máy bay' },
  { id: 6, label: 'Tọa độ & Món' },
  { id: 7, label: 'Gửi yêu cầu' }
];

const TripBuilder = ({ onAddQuote, destinationConfig }) => {
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

  // If already submitted, display luxury success modal card
  if (tripState.isSubmitted) {
    return (
      <section className="dest-section dest-section-white trip-builder-section" id="trip-builder">
        <div className="dest-container">
          <div className="builder-success-box">
            <div className="builder-success-icon-wrap">
              <FileCheck size={48} className="builder-success-icon" />
            </div>

            <span className="dest-badge dest-badge-gold">
              <Sparkles size={13} />
              <span>YÊU CẦU ĐÃ ĐƯỢC TIẾP NHẬN</span>
            </span>

            <h2 className="dest-title-editorial builder-success-title">
              Cảm ơn {tripState.contactName || 'Quý khách'}!
            </h2>

            <p className="builder-success-sub">
              Mã hồ sơ hành trình của bạn là:{' '}
              <strong className="builder-code-pill">{tripState.submittedQuoteCode}</strong>
            </p>

            <div className="builder-success-summary-card">
              <h4>Chi tiết yêu cầu tour riêng {tripState.destination}:</h4>
              <ul>
                <li>
                  <strong>Khởi hành:</strong> {tripState.departureDate || 'Linh hoạt theo yêu cầu'} ({tripState.durationDays} Ngày)
                </li>
                <li>
                  <strong>Số lượng khách:</strong> {tripState.adultsCount} Người lớn
                  {tripState.childrenCount > 0 ? `, ${tripState.childrenCount} Trẻ em` : ''}
                </li>
                <li>
                  <strong>Lưu trú dự kiến:</strong> {tripState.accommodationName || tripState.accommodationType}
                </li>
                <li>
                  <strong>Phương tiện:</strong> {tripState.transportType}
                </li>
                <li>
                  <strong>Điểm tham quan đã chọn:</strong> {tripState.selectedAttractions.length} địa điểm
                </li>
              </ul>
            </div>

            <p className="builder-success-note">
              Chuyên viên điều hành Super EZ Tour chuyên trách Đà Nẵng sẽ liên hệ qua{' '}
              <strong>{tripState.preferredChannel === 'zalo' ? 'Zalo' : 'Điện thoại'} ({tripState.contactPhone})</strong>{' '}
              trong vòng <strong>30 phút</strong> để gửi bản phác thảo lịch trình chi tiết và bảng dự toán minh bạch.
            </p>

            <div className="builder-success-actions">
              <a href="tel:19008899" className="dest-btn-primary">
                <Phone size={16} />
                <span>Cần tư vấn gấp: 1900 8899</span>
              </a>
              <button type="button" className="dest-btn-ghost" onClick={resetTrip}>
                <span>Thiết kế hành trình khác</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="dest-section dest-section-white trip-builder-section" id="trip-builder">
      <div className="dest-container">
        {/* Header */}
        <div className="trip-builder-header">
          <span className="dest-kicker">
            <Compass size={14} />
            <span>BUILD YOUR OWN TRIP</span>
          </span>

          <h2 className="dest-title-editorial trip-builder-title">
            Trình Thiết Kế Chuyến Đi Cá Nhân Hóa
          </h2>

          <p className="dest-subtitle trip-builder-sub">
            Chủ động lựa chọn từng dịch vụ theo sở thích. Đội ngũ chuyên gia Super EZ Tour sẽ kết nối và hoàn thiện hành trình độc bản dành riêng cho bạn.
          </p>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="builder-progress-wrap">
          <div className="builder-steps-nav">
            {STEPS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`builder-step-tab ${tripState.currentStep === s.id ? 'builder-step-tab-active' : ''} ${tripState.currentStep > s.id ? 'builder-step-tab-done' : ''}`}
                onClick={() => setStep(s.id)}
              >
                <span className="builder-step-circle">
                  {tripState.currentStep > s.id ? <Check size={14} /> : s.id}
                </span>
                <span className="builder-step-label">{s.label}</span>
              </button>
            ))}
          </div>
          <div
            className="builder-progress-line"
            style={{ width: `${((tripState.currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {/* Main 2-Column Layout (Form Wizard + Desktop Sticky Sidebar Summary) */}
        <div className="builder-main-layout">
          {/* Left Column: Multi-Step Interactive Form */}
          <div className="builder-form-col">
            {/* STEP 1: General Info */}
            {tripState.currentStep === 1 && (
              <div className="builder-step-pane">
                <div className="builder-pane-head">
                  <span className="builder-pane-num">Bước 01 / 07</span>
                  <h3 className="builder-pane-title">Thông Tin Chuyến Đi Cơ Bản</h3>
                  <p className="builder-pane-desc">Chọn thời gian và quy mô đoàn của gia đình bạn.</p>
                </div>

                <div className="builder-form-grid">
                  <div className="builder-field">
                    <label className="builder-label">Điểm đến chính</label>
                    <input
                      type="text"
                      className="builder-input"
                      value={tripState.destination}
                      readOnly
                    />
                  </div>

                  <div className="builder-field">
                    <label className="builder-label">Số ngày dự kiến</label>
                    <div className="builder-pills-select">
                      {[3, 4, 5, 6, 7].map((days) => (
                        <button
                          key={days}
                          type="button"
                          className={`builder-pill-btn ${tripState.durationDays === days ? 'builder-pill-active' : ''}`}
                          onClick={() => updateField('durationDays', days)}
                        >
                          {days} Ngày {days - 1} Đêm
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="builder-field">
                    <label className="builder-label">Ngày khởi hành dự kiến (tùy chọn)</label>
                    <input
                      type="date"
                      className="builder-input"
                      value={tripState.departureDate}
                      onChange={(e) => updateField('departureDate', e.target.value)}
                    />
                  </div>

                  <div className="builder-field-row">
                    <div className="builder-field">
                      <label className="builder-label">Người lớn (từ 12 tuổi)</label>
                      <div className="builder-counter-box">
                        <button
                          type="button"
                          className="builder-counter-btn"
                          onClick={() => updateField('adultsCount', Math.max(1, tripState.adultsCount - 1))}
                        >
                          -
                        </button>
                        <span className="builder-counter-val">{tripState.adultsCount}</span>
                        <button
                          type="button"
                          className="builder-counter-btn"
                          onClick={() => updateField('adultsCount', tripState.adultsCount + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="builder-field">
                      <label className="builder-label">Trẻ em (dưới 12 tuổi)</label>
                      <div className="builder-counter-box">
                        <button
                          type="button"
                          className="builder-counter-btn"
                          onClick={() => updateField('childrenCount', Math.max(0, tripState.childrenCount - 1))}
                        >
                          -
                        </button>
                        <span className="builder-counter-val">{tripState.childrenCount}</span>
                        <button
                          type="button"
                          className="builder-counter-btn"
                          onClick={() => updateField('childrenCount', tripState.childrenCount + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Accommodation */}
            {tripState.currentStep === 2 && (
              <div className="builder-step-pane">
                <div className="builder-pane-head">
                  <span className="builder-pane-num">Bước 02 / 07</span>
                  <h3 className="builder-pane-title">Phong Cách Lưu Trú Bạn Ưa Thích</h3>
                  <p className="builder-pane-desc">Lựa chọn tiêu chuẩn nghỉ dưỡng phù hợp với ngân sách và mong muốn.</p>
                </div>

                <div className="builder-options-cards">
                  {[
                    { id: 'resort', title: 'Luxury Resort 5 Sao Ven Biển', desc: 'Resort có bãi biển riêng, hồ bơi vô cực ngắm vịnh (Hyatt, InterCon, Pullman)' },
                    { id: 'villa', title: 'Private Villa Có Hồ Bơi Riêng', desc: 'Biệt thự riêng tư 2-4 phòng ngủ, có bếp và BBQ cho gia đình (Premier Village, Naman)' },
                    { id: '5star', title: 'Khách Sạn 5 Sao Trung Tâm / Ven Sông', desc: 'Tiện nghi quốc tế, ngắm toàn cảnh sông Hàn và các cây cầu (Novotel, Hilton)' },
                    { id: '4star', title: 'Khách Sạn 4 Sao Sát Biển Mỹ Khê', desc: 'Vị trí đắc địa, chi phí tối ưu, phòng hướng biển (TMS, Sala, Belle Maison)' },
                    { id: 'self', title: 'Khách Tự Đặt Phòng', desc: 'Bạn đã có phòng hoặc muốn tự book khách sạn, Super EZ Tour lo các dịch vụ còn lại' }
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      className={`builder-option-card ${tripState.accommodationType === opt.id ? 'builder-option-card-active' : ''}`}
                      onClick={() => {
                        updateField('accommodationType', opt.id);
                        updateField('accommodationName', opt.title);
                      }}
                    >
                      <div className="builder-option-radio">
                        {tripState.accommodationType === opt.id && <div className="builder-radio-dot" />}
                      </div>
                      <div className="builder-option-info">
                        <strong className="builder-option-title">{opt.title}</strong>
                        <p className="builder-option-sub">{opt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Transportation */}
            {tripState.currentStep === 3 && (
              <div className="builder-step-pane">
                <div className="builder-pane-head">
                  <span className="builder-pane-num">Bước 03 / 07</span>
                  <h3 className="builder-pane-title">Xe Riêng Phục Vụ Suốt Tuyến</h3>
                  <p className="builder-pane-desc">100% xe riêng đời mới, không ghép người lạ, đón trả tận nơi.</p>
                </div>

                <div className="builder-options-cards">
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
                      className={`builder-option-card ${tripState.transportType === v.id ? 'builder-option-card-active' : ''}`}
                      onClick={() => updateField('transportType', v.id)}
                    >
                      <div className="builder-option-radio">
                        {tripState.transportType === v.id && <div className="builder-radio-dot" />}
                      </div>
                      <div className="builder-option-info">
                        <strong className="builder-option-title">{v.title}</strong>
                        <p className="builder-option-sub">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Guide */}
            {tripState.currentStep === 4 && (
              <div className="builder-step-pane">
                <div className="builder-pane-head">
                  <span className="builder-pane-num">Bước 04 / 07</span>
                  <h3 className="builder-pane-title">Hướng Dẫn Viên Bản Địa</h3>
                  <p className="builder-pane-desc">Đồng hành độc quyền cùng gia đình, chu đáo và tôn trọng sự riêng tư.</p>
                </div>

                <div className="builder-options-cards">
                  {[
                    { id: 'dedicated', title: 'Cần Hướng Dẫn Viên Riêng Chuyên Tuyến (Khuyến khích)', desc: 'HDV bản địa thuyết minh sâu sắc văn hóa, hỗ trợ chụp ảnh, sắp xếp vé ưu tiên' },
                    { id: 'none', title: 'Không Cần HDV (Chỉ cần xe riêng & tài xế điềm đạm)', desc: 'Gia đình muốn hoàn toàn tự do khám phá theo cách riêng' }
                  ].map((g) => (
                    <div
                      key={g.id}
                      className={`builder-option-card ${tripState.guideOption === g.id ? 'builder-option-card-active' : ''}`}
                      onClick={() => updateField('guideOption', g.id)}
                    >
                      <div className="builder-option-radio">
                        {tripState.guideOption === g.id && <div className="builder-radio-dot" />}
                      </div>
                      <div className="builder-option-info">
                        <strong className="builder-option-title">{g.title}</strong>
                        <p className="builder-option-sub">{g.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {tripState.guideOption === 'dedicated' && (
                  <div className="builder-guide-lang-box">
                    <label className="builder-label">Ngôn ngữ mong muốn:</label>
                    <div className="builder-pills-select">
                      {['Tiếng Việt', 'Tiếng Anh', 'Tiếng Hàn', 'Tiếng Trung', 'Tiếng Nhật'].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          className={`builder-pill-btn ${tripState.guideLanguage === lang ? 'builder-pill-active' : ''}`}
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

            {/* STEP 5: Flights */}
            {tripState.currentStep === 5 && (
              <div className="builder-step-pane">
                <div className="builder-pane-head">
                  <span className="builder-pane-num">Bước 05 / 07</span>
                  <h3 className="builder-pane-title">Hỗ Trợ Vé Máy Bay Đến Đà Nẵng</h3>
                  <p className="builder-pane-desc">Tư vấn giờ bay tối ưu lịch trình và kết nối đón tiễn sân bay DAD.</p>
                </div>

                <div className="builder-options-cards">
                  {[
                    { id: 'need_support', title: 'Cần Hỗ Trợ Đặt Vé Máy Bay Khứ Hồi', desc: 'Tư vấn giờ bay đẹp, kết hợp đón sân bay bằng xe riêng liền mạch' },
                    { id: 'have_ticket', title: 'Đã Tự Đặt Vé Máy Bay', desc: 'Chỉ cần xe riêng đón tại sân bay Quốc tế Đà Nẵng DAD theo giờ hạ cánh' },
                    { id: 'undecided', title: 'Chưa Quyết Định (Tư vấn sau)', desc: 'Cần xem lịch trình tour trước rồi mới quyết định mua vé' }
                  ].map((f) => (
                    <div
                      key={f.id}
                      className={`builder-option-card ${tripState.flightOption === f.id ? 'builder-option-card-active' : ''}`}
                      onClick={() => updateField('flightOption', f.id)}
                    >
                      <div className="builder-option-radio">
                        {tripState.flightOption === f.id && <div className="builder-radio-dot" />}
                      </div>
                      <div className="builder-option-info">
                        <strong className="builder-option-title">{f.title}</strong>
                        <p className="builder-option-sub">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {tripState.flightOption === 'need_support' && (
                  <div className="builder-guide-lang-box">
                    <label className="builder-label">Thành phố cất cánh dự kiến:</label>
                    <div className="builder-pills-select">
                      {['Hà Nội (HAN)', 'TP. Hồ Chí Minh (SGN)', 'Hải Phòng (HPH)', 'Quốc tế (Incheon/Singapore/Khác)'].map((city) => (
                        <button
                          key={city}
                          type="button"
                          className={`builder-pill-btn ${tripState.departureCity === city ? 'builder-pill-active' : ''}`}
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

            {/* STEP 6: Attractions & Culinary */}
            {tripState.currentStep === 6 && (
              <div className="builder-step-pane">
                <div className="builder-pane-head">
                  <span className="builder-pane-num">Bước 06 / 07</span>
                  <h3 className="builder-pane-title">Tọa Độ Tham Quan & Ẩm Thực</h3>
                  <p className="builder-pane-desc">Chọn những điểm bạn muốn ghé thăm tại Đà Nẵng & Hội An.</p>
                </div>

                {/* Attractions Checklist */}
                <div className="builder-attractions-checklist">
                  <label className="builder-label">Tọa độ muốn ghé thăm:</label>
                  <div className="builder-check-grid">
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
                          className={`builder-check-item ${isChecked ? 'builder-check-item-active' : ''}`}
                          onClick={() => toggleAttraction(spot.id)}
                        >
                          <div className="builder-checkbox">
                            {isChecked && <Check size={14} />}
                          </div>
                          <span>{spot.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Culinary Preferences */}
                <div className="builder-attractions-checklist">
                  <label className="builder-label">Phong cách ẩm thực ưa thích:</label>
                  <div className="builder-check-grid">
                    {[
                      'Đặc sản địa phương (Mì Quảng, Bánh tráng cuốn thịt heo)',
                      'Hải sản tươi sống bắt tại bể',
                      'Nhà hàng Fine Dining / Tiệc tối lãng mạn bên biển',
                      'Ẩm thực chay / Thanh đạm',
                      'Thực đơn phù hợp người lớn tuổi & trẻ nhỏ'
                    ].map((food) => {
                      const isChecked = tripState.culinaryPreferences.includes(food);
                      return (
                        <div
                          key={food}
                          className={`builder-check-item ${isChecked ? 'builder-check-item-active' : ''}`}
                          onClick={() => toggleCulinary(food)}
                        >
                          <div className="builder-checkbox">
                            {isChecked && <Check size={14} />}
                          </div>
                          <span>{food}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Special Requests */}
                <div className="builder-field">
                  <label className="builder-label">Yêu cầu đặc biệt khác (nếu có)</label>
                  <textarea
                    rows={3}
                    className="builder-textarea"
                    placeholder="Ví dụ: Cần ghế trẻ em trên xe, tổ chức sinh nhật bất ngờ, kỷ niệm ngày cưới..."
                    value={tripState.specialRequests}
                    onChange={(e) => updateField('specialRequests', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* STEP 7: Summary & Contact Submission */}
            {tripState.currentStep === 7 && (
              <div className="builder-step-pane">
                <div className="builder-pane-head">
                  <span className="builder-pane-num">Bước 07 / 07</span>
                  <h3 className="builder-pane-title">Xác Nhận & Nhận Báo Giá Độc Bản</h3>
                  <p className="builder-pane-desc">Vui lòng để lại thông tin để chuyên viên Super EZ Tour gửi bản thiết kế hành trình.</p>
                </div>

                <div className="builder-form-grid">
                  <div className="builder-field">
                    <label className="builder-label">Họ và tên của bạn *</label>
                    <input
                      type="text"
                      className={`builder-input ${formErrors.contactName ? 'builder-input-error' : ''}`}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={tripState.contactName}
                      onChange={(e) => updateField('contactName', e.target.value)}
                    />
                    {formErrors.contactName && <span className="builder-error-text">{formErrors.contactName}</span>}
                  </div>

                  <div className="builder-field">
                    <label className="builder-label">Số điện thoại / Zalo *</label>
                    <input
                      type="tel"
                      className={`builder-input ${formErrors.contactPhone ? 'builder-input-error' : ''}`}
                      placeholder="Ví dụ: 0912 345 678"
                      value={tripState.contactPhone}
                      onChange={(e) => updateField('contactPhone', e.target.value)}
                    />
                    {formErrors.contactPhone && <span className="builder-error-text">{formErrors.contactPhone}</span>}
                  </div>

                  <div className="builder-field">
                    <label className="builder-label">Email nhận lịch trình (tùy chọn)</label>
                    <input
                      type="email"
                      className="builder-input"
                      placeholder="email@example.com"
                      value={tripState.contactEmail}
                      onChange={(e) => updateField('contactEmail', e.target.value)}
                    />
                  </div>

                  <div className="builder-field">
                    <label className="builder-label">Kênh tư vấn bạn ưu tiên:</label>
                    <div className="builder-pills-select">
                      {[
                        { id: 'zalo', label: 'Tư vấn qua Zalo' },
                        { id: 'phone', label: 'Gọi điện trực tiếp' },
                        { id: 'whatsapp', label: 'WhatsApp' }
                      ].map((ch) => (
                        <button
                          key={ch.id}
                          type="button"
                          className={`builder-pill-btn ${tripState.preferredChannel === ch.id ? 'builder-pill-active' : ''}`}
                          onClick={() => updateField('preferredChannel', ch.id)}
                        >
                          {ch.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="builder-privacy-check">
                    <label className="builder-checkbox-label">
                      <input
                        type="checkbox"
                        checked={tripState.agreePrivacy}
                        onChange={(e) => updateField('agreePrivacy', e.target.checked)}
                      />
                      <span>
                        Tôi đồng ý để Super EZ Tour liên hệ tư vấn lịch trình riêng theo chính sách bảo mật thông tin.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Wizard Navigation Action Controls */}
            <div className="builder-nav-actions">
              {tripState.currentStep > 1 && (
                <button
                  type="button"
                  className="dest-btn-ghost builder-prev-btn"
                  onClick={prevStep}
                >
                  <ChevronLeft size={16} />
                  <span>Quay lại</span>
                </button>
              )}

              {tripState.currentStep < 7 ? (
                <button
                  type="button"
                  className="dest-btn-primary builder-next-btn"
                  onClick={handleNext}
                >
                  <span>Tiếp tục bước kế tiếp</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="dest-btn-primary builder-submit-btn"
                  onClick={handleSubmit}
                >
                  <span>Gửi yêu cầu & Lên lịch trình riêng ngay</span>
                  <Sparkles size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Sidebar Trip Summary */}
          <div className="builder-summary-col">
            <div className="builder-summary-sticky-card">
              <div className="builder-summary-head">
                <span className="dest-badge dest-badge-gold">
                  <ShieldCheck size={12} />
                  <span>Tour Riêng 100%</span>
                </span>
                <h4 className="builder-summary-title">Tóm Tắt Hành Trình Của Bạn</h4>
                <span className="builder-summary-dest">{tripState.destination}</span>
              </div>

              <div className="builder-summary-items">
                <div className="builder-sum-row">
                  <Calendar size={15} className="builder-sum-icon" />
                  <div className="builder-sum-content">
                    <span className="builder-sum-label">Thời lượng & Ngày đi</span>
                    <strong>{tripState.durationDays} Ngày {tripState.durationDays - 1} Đêm</strong>
                    {tripState.departureDate && <span>Khởi hành: {tripState.departureDate}</span>}
                  </div>
                </div>

                <div className="builder-sum-row">
                  <Users size={15} className="builder-sum-icon" />
                  <div className="builder-sum-content">
                    <span className="builder-sum-label">Quy mô đoàn</span>
                    <strong>{tripState.adultsCount} Người lớn {tripState.childrenCount > 0 ? `, ${tripState.childrenCount} Trẻ em` : ''}</strong>
                  </div>
                </div>

                <div className="builder-sum-row">
                  <Bed size={15} className="builder-sum-icon" />
                  <div className="builder-sum-content">
                    <span className="builder-sum-label">Lưu trú</span>
                    <strong>{tripState.accommodationName || tripState.accommodationType}</strong>
                  </div>
                </div>

                <div className="builder-sum-row">
                  <Car size={15} className="builder-sum-icon" />
                  <div className="builder-sum-content">
                    <span className="builder-sum-label">Phương tiện riêng</span>
                    <strong>{tripState.transportType}</strong>
                  </div>
                </div>

                <div className="builder-sum-row">
                  <UserCheck size={15} className="builder-sum-icon" />
                  <div className="builder-sum-content">
                    <span className="builder-sum-label">Hướng dẫn viên</span>
                    <strong>
                      {tripState.guideOption === 'dedicated'
                        ? `HDV Riêng (${tripState.guideLanguage})`
                        : 'Không yêu cầu'}
                    </strong>
                  </div>
                </div>

                <div className="builder-sum-row">
                  <MapPin size={15} className="builder-sum-icon" />
                  <div className="builder-sum-content">
                    <span className="builder-sum-label">Tọa độ đã chọn ({tripState.selectedAttractions.length})</span>
                    <span className="builder-sum-spots-preview">
                      {tripState.selectedAttractions.join(', ') || 'Chưa chọn'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="builder-summary-guarantee">
                <Check size={14} className="builder-guar-icon" />
                <span>Cam kết 0% Shopping · Báo giá minh bạch không phụ phí</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripBuilder;