import React, { useState } from 'react';
import { INITIAL_QUOTES, QUOTE_STATUSES } from '../../../../data/quotes';
import { VIETNAM_DESTINATIONS } from '../../../../data/vietnamDestinations';
import Container from '../../../../components/common/Container/Container';
import { Clock, MessageSquare, Send, Sparkles, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import './QuickQuote.css';

const KOREAN_QUOTE_STATUSES = {
  waiting: { label: '상담 접수 대기', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
  processing: { label: '1:1 매니저 배정 완료', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' },
  completed: { label: '맞춤 견적서 발송 완료', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
};

const QuickQuote = ({ quotes = INITIAL_QUOTES, onOpenQuoteModal }) => {
  const [selectedDestId, setSelectedDestId] = useState('da-nang');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredQuotes = statusFilter === 'all'
    ? quotes
    : quotes.filter((q) => q.status === statusFilter);

  const selectedDestination = VIETNAM_DESTINATIONS.find((d) => d.id === selectedDestId) || VIETNAM_DESTINATIONS[4];

  return (
    <section id="quick-quote" className="section quick-quote-section" aria-label="Consultation & Trip Planning">
      <Container>
        {/* Section Heading */}
        <div className="quote-sec-header">
          <div className="quote-sec-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>REAL-TIME 1:1 CONSULTATION & RAPID QUOTE</span>
          </div>
          <h2 className="quote-sec-title">실시간 여행 상담 & 30분 맞춤 견적</h2>
          <p className="quote-sec-subtitle">
            원하는 일정, 인원, 여행 스타일만 알려주세요.
            <br />
            베트남 전담 한국인 & 한국어 전문 매니저가 30분 이내에 최적의 단독 프라이빗 일정을 제안해 드립니다.
          </p>
        </div>

        {/* Quick Consultation CTA Card */}
        <div className="quote-fast-card">
          <div className="quote-fast-content">
            <div className="quote-badge-row">
              <span className="fast-badge">
                <Sparkles size={14} />
                실시간 1:1 빠른 견적 신청
              </span>
              <span className="fast-subtext">오늘 하루 120건 이상의 맞춤 일정이 상담되었습니다</span>
            </div>

            <h3 className="quote-fast-title">
              어디로 떠나시나요? 목적지를 선택하고 맞춤 견적을 받아보세요:
            </h3>

            <div className="quote-fast-form">
              <div className="fast-select-wrap">
                <MapPin size={18} className="fast-pin-icon text-gold" />
                <select
                  className="fast-dest-select"
                  value={selectedDestId}
                  onChange={(e) => setSelectedDestId(e.target.value)}
                >
                  {VIETNAM_DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nameKr} ({d.name}) · {d.isAvailable ? '3D 가상투어 오픈' : '사전 맞춤 상담 가능'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="fast-buttons-row">
                <button
                  type="button"
                  className="fast-btn-primary"
                  onClick={() => onOpenQuoteModal && onOpenQuoteModal(selectedDestId)}
                >
                  <Send size={16} />
                  <span>{selectedDestination.nameKr} 30분 빠른 견적 요청</span>
                </button>

                <button
                  type="button"
                  className="fast-btn-kakao"
                  onClick={() => onOpenQuoteModal && onOpenQuoteModal('kakao')}
                >
                  <MessageSquare size={16} />
                  <span>카카오톡 1:1 실시간 상담</span>
                </button>
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
              <h4 className="board-title">실시간 맞춤 견적 & 상담 접수 현황</h4>
            </div>

            {/* Filter Status Tabs */}
            <div className="board-filters">
              <button
                type="button"
                className={`board-filter-btn ${statusFilter === 'all' ? 'is-active' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                전체 ({quotes.length})
              </button>
              {Object.entries(KOREAN_QUOTE_STATUSES).map(([key, item]) => {
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
                  <th style={{ width: '15%' }}>접수 시간</th>
                  <th style={{ width: '22%' }}>진행 상태</th>
                  <th style={{ width: '20%' }}>여행 목적지</th>
                  <th style={{ width: '18%' }}>고객명</th>
                  <th style={{ width: '25%' }}>인원 구성 & 희망 일정</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((q) => {
                  const statusConf = KOREAN_QUOTE_STATUSES[q.status] || KOREAN_QUOTE_STATUSES.waiting;

                  return (
                    <tr key={q.id} className="quote-row">
                      <td className="time-cell">
                        <Clock size={13} className="time-icon" />
                        <span>{q.timeAgo}</span>
                      </td>

                      <td className="status-cell">
                        <span
                          className="status-chip"
                          style={{
                            color: statusConf.color,
                            backgroundColor: statusConf.bg,
                            borderColor: `${statusConf.color}44`,
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
                        <span className="customer-name">{q.customerName} 고객님</span>
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
              * 개인정보 보호를 위해 고객명 일부는 마스킹 처리되어 표시됩니다. (정보보호 인증 완료)
            </p>
            <button
              type="button"
              className="board-action-link"
              onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
            >
              + 지금 바로 우리 가족 맞춤 견적 신청하기
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default QuickQuote;
