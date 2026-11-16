import React, { useState } from 'react';
import { INITIAL_QUOTES, QUOTE_STATUSES } from '../../../../data/quotes';
import { DESTINATIONS } from '../../../../data/destinations';
import SectionHeading from '../../../../components/common/SectionHeading/SectionHeading';
import Container from '../../../../components/common/Container/Container';
import Button from '../../../../components/common/Button/Button';
import { Clock, MessageSquare, Send, CheckCircle2, AlertCircle, RefreshCw, Filter, Sparkles, MapPin, Users } from 'lucide-react';
import './QuickQuote.css';

const QuickQuote = ({ quotes = INITIAL_QUOTES, onOpenQuoteModal }) => {
  const [selectedDestId, setSelectedDestId] = useState('cebu');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredQuotes = statusFilter === 'all'
    ? quotes
    : quotes.filter((q) => q.status === statusFilter);

  const selectedDestination = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  return (
    <section id="quote" className="section quick-quote-section section-bg-alt">
      <Container>
        {/* Section Heading */}
        <SectionHeading
          tagline="DỊCH VỤ NHANH CHÓNG · MIỄN PHÍ 100%"
          title="Tư vấn & Nhận báo giá tour riêng trong 30 phút"
          subtitle="Tự do lựa chọn điểm đến và điều chỉnh lịch trình theo ý thích. Chuyên viên Super EZ Tour luôn sẵn sàng hỗ trợ bạn 24/7."
          align="center"
        />

        {/* Quick Consultation CTA Card */}
        <div className="quote-fast-card">
          <div className="quote-fast-content">
            <div className="quote-badge-row">
              <span className="fast-badge">
                <Sparkles size={14} />
                BÁO GIÁ NHANH TRỰC TUYẾN
              </span>
              <span className="fast-subtext">Hơn 120+ yêu cầu đã được xử lý hôm nay</span>
            </div>

            <h3 className="quote-fast-title">
              Bạn muốn đi đâu? Chọn ngay điểm đến yêu thích:
            </h3>

            <div className="quote-fast-form">
              <div className="fast-select-wrap">
                <MapPin size={18} className="fast-pin-icon" />
                <select
                  className="fast-dest-select"
                  value={selectedDestId}
                  onChange={(e) => setSelectedDestId(e.target.value)}
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} - {d.country} · Giá từ {d.priceFrom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="fast-buttons-row">
                <Button
                  variant="primary"
                  size="md"
                  icon={Send}
                  onClick={() => onOpenQuoteModal && onOpenQuoteModal(selectedDestId)}
                >
                  Yêu cầu báo giá {selectedDestination.name}
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  icon={MessageSquare}
                  onClick={() => onOpenQuoteModal && onOpenQuoteModal(selectedDestId)}
                >
                  Tư vấn trực tuyến 1:1
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Quote Status Board */}
        <div className="quote-status-board">
          <div className="board-header">
            <div className="board-title-group">
              <div className="live-indicator">
                <span className="live-dot" />
                <span className="live-text">REAL-TIME STATUS</span>
              </div>
              <h4 className="board-title">Bảng trạng thái yêu cầu báo giá hôm nay</h4>
            </div>

            {/* Filter Status Tabs */}
            <div className="board-filters">
              <button
                type="button"
                className={`board-filter-btn ${statusFilter === 'all' ? 'is-active' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                Tất cả ({quotes.length})
              </button>
              {Object.entries(QUOTE_STATUSES).map(([key, item]) => {
                const count = quotes.filter((q) => q.status === key).length;
                return (
                  <button
                    key={key}
                    type="button"
                    className={`board-filter-btn ${statusFilter === key ? 'is-active' : ''}`}
                    onClick={() => setStatusFilter(key)}
                  >
                    {item.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time Table */}
          <div className="board-table-responsive">
            <table className="quote-status-table">
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Thời gian</th>
                  <th style={{ width: '18%' }}>Trạng thái</th>
                  <th style={{ width: '22%' }}>Điểm đến</th>
                  <th style={{ width: '18%' }}>Khách hàng</th>
                  <th style={{ width: '27%' }}>Quy mô & Lịch trình</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((q) => {
                  const statusConf = QUOTE_STATUSES[q.status] || QUOTE_STATUSES.waiting;

                  return (
                    <tr key={q.id} className="quote-row">
                      <td className="time-cell">
                        <Clock size={13} className="time-icon" />
                        <span>{q.timeAgo}</span>
                      </td>

                      <td className="status-cell">
                        <span
                          className={`status-chip chip-${statusConf.variant}`}
                          style={{
                            color: statusConf.color,
                            backgroundColor: statusConf.bg,
                            borderColor: `${statusConf.color}33`
                          }}
                        >
                          <span
                            className="status-dot"
                            style={{ backgroundColor: statusConf.color }}
                          />
                          {statusConf.label}
                        </span>
                      </td>

                      <td className="dest-cell">
                        <strong className="dest-name-bold">{q.destination}</strong>
                      </td>

                      <td className="customer-cell">
                        <span className="customer-name">{q.customerName}</span>
                      </td>

                      <td className="group-cell">
                        <div className="group-info-wrap">
                          <span className="group-size">{q.travelGroup}</span>
                          <span className="travel-dates"> · {q.travelDates}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="board-footer">
            <p className="board-notice">
              * Tên khách hàng và thông tin cá nhân đã được ẩn danh để bảo vệ quyền riêng tư theo tiêu chuẩn bảo mật Super EZ Tour.
            </p>
            <button
              type="button"
              className="board-action-link"
              onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
            >
              + Gửi yêu cầu của bạn ngay bây giờ
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default QuickQuote;
