import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Send, Calendar, Users, MapPin, Phone, User, MessageSquare } from 'lucide-react';
import { DESTINATIONS } from '../../../data/destinations';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import Button from '../Button/Button';
import './QuoteModal.css';

const QuoteModal = ({ isOpen, onClose, onAddQuote, defaultDestination = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destinationId: defaultDestination || 'cebu',
    travelGroup: '4 người (Gia đình)',
    travelDate: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Vui lòng nhập họ tên và số điện thoại liên hệ.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const selectedDest = DESTINATIONS.find((d) => d.id === formData.destinationId);
      const newQuote = {
        id: `Q-${Date.now().toString().slice(-8)}`,
        customerName: formData.name.length > 2 ? `${formData.name[0]}*${formData.name.slice(-1)}` : `${formData.name}*`,
        destination: `${selectedDest?.name || 'Cebu'} (${selectedDest?.country || 'Philippines'})`,
        destinationId: formData.destinationId,
        travelGroup: formData.travelGroup,
        travelDates: formData.travelDate || 'Tháng 12/2026 (Linh hoạt)',
        status: 'waiting',
        timeAgo: 'Vừa xong',
        createdAt: new Date().toISOString(),
        notes: formData.notes
      };

      onAddQuote && onAddQuote(newQuote);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="quote-modal-overlay" onClick={handleResetAndClose}>
      <div className="quote-modal-content animate-slide-down" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="quote-modal-close" onClick={handleResetAndClose} aria-label="Đóng">
          <X size={22} />
        </button>

        {isSuccess ? (
          <div className="quote-success-view">
            <div className="success-icon-wrap">
              <CheckCircle size={56} className="text-success" />
            </div>
            <h3 className="success-title">Gửi yêu cầu báo giá thành công!</h3>
            <p className="success-desc">
              Cảm ơn quý khách <strong>{formData.name}</strong>. Chuyên viên tư vấn của {BRAND_CONFIG.brandName} sẽ liên hệ qua điện thoại/Zalo trong vòng <strong>30 phút</strong> để gửi lịch trình thiết kế riêng và mức giá ưu đãi nhất.
            </p>
            <div className="success-info-box">
              <div className="info-row">
                <span className="info-label">Điểm đến đã chọn:</span>
                <span className="info-val">
                  {DESTINATIONS.find((d) => d.id === formData.destinationId)?.name} (
                  {DESTINATIONS.find((d) => d.id === formData.destinationId)?.country})
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Hotline hỗ trợ tức thì:</span>
                <a href={`tel:${BRAND_CONFIG.contact.hotline.replace(/\s+/g, '')}`} className="info-val hotline">
                  {BRAND_CONFIG.contact.hotline}
                </a>
              </div>
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={handleResetAndClose}>
              Xác nhận & Hoàn tất
            </Button>
          </div>
        ) : (
          <form className="quote-modal-form" onSubmit={handleSubmit}>
            <div className="quote-modal-header">
              <span className="modal-badge">
                <Sparkles size={14} />
                MIỄN PHÍ TƯ VẤN & BÁO GIÁ 30 PHÚT
              </span>
              <h3 className="modal-title">Yêu cầu báo giá {BRAND_CONFIG.slogan}</h3>
              <p className="modal-subtitle">
                Xe riêng & Hướng dẫn viên riêng · Tự do điều chỉnh lịch trình · 100% Không phụ phí ẩn
              </p>
            </div>

            <div className="form-fields-grid">
              {/* Destination */}
              <div className="form-group full-width">
                <label className="form-label">
                  <MapPin size={16} />
                  <span>Điểm đến mong muốn</span>
                </label>
                <select
                  name="destinationId"
                  className="form-select"
                  value={formData.destinationId}
                  onChange={handleChange}
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} - {d.country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Name */}
              <div className="form-group">
                <label className="form-label">
                  <User size={16} />
                  <span>Họ và tên quý khách *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ví dụ: Nguyễn Văn Hoàng"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Phone / Zalo */}
              <div className="form-group">
                <label className="form-label">
                  <Phone size={16} />
                  <span>Số điện thoại / Zalo *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Ví dụ: 0912 345 678"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Group Size */}
              <div className="form-group">
                <label className="form-label">
                  <Users size={16} />
                  <span>Số lượng người tham gia</span>
                </label>
                <select
                  name="travelGroup"
                  className="form-select"
                  value={formData.travelGroup}
                  onChange={handleChange}
                >
                  <option value="2 người (Cặp đôi / Bạn bè)">2 người (Cặp đôi / Bạn bè)</option>
                  <option value="3 - 5 người (Gia đình nhỏ)">3 - 5 người (Gia đình nhỏ)</option>
                  <option value="6 - 10 người (Đại gia đình)">6 - 10 người (Đại gia đình)</option>
                  <option value="Trên 10 người (Đoàn thể / Công ty)">Trên 10 người (Đoàn thể / Công ty)</option>
                </select>
              </div>

              {/* Travel Date */}
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={16} />
                  <span>Dự kiến khởi hành</span>
                </label>
                <input
                  type="date"
                  name="travelDate"
                  className="form-input"
                  value={formData.travelDate}
                  onChange={handleChange}
                />
              </div>

              {/* Special notes */}
              <div className="form-group full-width">
                <label className="form-label">
                  <MessageSquare size={16} />
                  <span>Yêu cầu riêng (Tuổi của trẻ em, người lớn tuổi, món ăn, v.v.)</span>
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Ví dụ: Đoàn có người lớn tuổi muốn xe Limousine êm ái, thích bơi biển và ăn hải sản tươi sống..."
                  className="form-textarea"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-actions">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                icon={Send}
              >
                Gửi yêu cầu báo giá ngay
              </Button>
              <p className="privacy-note">
                🔒 Thông tin của quý khách được bảo mật tuyệt đối theo tiêu chuẩn bảo mật {BRAND_CONFIG.brandName}.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuoteModal;
