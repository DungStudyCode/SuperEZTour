import React, { useState } from 'react';
import { INITIAL_QUOTES } from '../../../../data/quotes';
import { VIETNAM_DESTINATIONS } from '../../../../data/vietnamDestinations';
import Container from '../../../../components/common/Container/Container';
import { Clock, MessageSquare, Send, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import './QuickQuote.css';

const STATUS_MAP = {
  waiting: {
    labelKr: '상담 접수 대기',
    labelVi: 'Chờ tư vấn',
    color: '#E66B37',
    bg: 'rgba(230, 107, 55, 0.1)',
  },
  processing: {
    labelKr: '1:1 매니저 배정',
    labelVi: 'Đang thiết kế tour',
    color: '#0284C7',
    bg: 'rgba(2, 132, 199, 0.1)',
  },
  completed: {
    labelKr: '맞춤 견적서 발송 완료',
    labelVi: 'Đã gửi báo giá',
    color: '#059669',
    bg: 'rgba(5, 150, 105, 0.1)',
  },
};

const QuickQuote = ({ quotes = INITIAL_QUOTES, onOpenQuoteModal }) => {
  const [selectedDestId, setSelectedDestId] = useState('da-nang');
  const [statusFilter, setStatusFilter] = useState('all');
  const { t, isKorean } = useLanguage();

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
            <Sparkles size={14} className="text-orange" />
            <span>{t('home.quote.eyebrow', 'REAL-TIME 1:1 CONSULTATION & RAPID QUOTE')}</span>
          </div>
          <h2 className="quote-sec-title">
            {t('home.quote.title', '실시간 여행 상담 & 30분 맞춤 견적')}
          </h2>
          <p className="quote-sec-subtitle">
            {t('home.quote.subtitle', '원하는 일정, 인원, 여행 스타일만 알려주세요. 베트남 전담 전문 매니저가 30분 이내에 최적의 단독 프라이빗 일정을 제안해 드립니다.')}
          </p>
        </div>

        {/* Quick Consultation CTA Card */}
        <div className="quote-fast-card">
          <div className="quote-fast-content">
            <div className="quote-badge-row">
              <span className="fast-badge">
                <Sparkles size={14} />
                {isKorean ? '실시간 1:1 빠른 견적 신청' : 'Đăng ký tư vấn báo giá 1:1'}
              </span>
              <span className="fast-subtext">
                {isKorean ? '오늘 하루 120건 이상의 맞춤 일정이 상담되었습니다' : 'Hôm nay hơn 120 lịch trình tour riêng đã được tư vấn'}
              </span>
            </div>

            <h3 className="quote-fast-title">
              {isKorean
                ? '어디로 떠나시나요? 목적지를 선택하고 맞춤 견적을 받아보세요:'
                : 'Bạn muốn du lịch đến đâu? Chọn điểm đến để nhận tư vấn lịch trình:'}
            </h3>

            <div className="quote-fast-form">
              <div className="fast-select-wrap">
                <MapPin size={18} className="fast-pin-icon text-orange" />
                <select
                  className="fast-dest-select"
                  value={selectedDestId}
                  onChange={(e) => setSelectedDestId(e.target.value)}
                >
                  {VIETNAM_DESTINATIONS.map((d) => {
                    const destLabel = isKorean ? d.nameKr : (d.nameVi || d.name);
                    const availabilityLabel = d.isAvailable
                      ? (isKorean ? '3D 가상투어 오픈' : 'Tour 3D đã mở')
                      : (isKorean ? '사전 맞춤 상담 가능' : 'Tư vấn lịch trình riêng');
                    return (
                      <option key={d.id} value={d.id}>
                        {destLabel} ({d.name}) · {availabilityLabel}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="fast-buttons-row">
                <button
                  type="button"
                  className="fast-btn-primary"
                  onClick={() =>
                    onOpenQuoteModal &&
                    onOpenQuoteModal({
                      source: 'quick-quote',
                      destinationId: selectedDestId,
                    })
                  }
                >
                  <Send size={16} />
                  <span>
                    {isKorean ? selectedDestination.nameKr : (selectedDestination.nameVi || selectedDestination.name)}{' '}
                    {t('home.quote.requestBtn', '30분 빠른 견적 요청')}
                  </span>
                </button>

                <button
                  type="button"
                  className="fast-btn-kakao"
                  onClick={() =>
                    onOpenQuoteModal &&
                    onOpenQuoteModal({
                      source: 'quick-quote',
                      destinationId: selectedDestId,
                      contactMethod: 'kakao',
                    })
                  }
                >
                  <MessageSquare size={16} />
                  <span>{t('home.quote.kakaoBtn', '카카오톡 1:1 실시간 상담')}</span>
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
              <h4 className="board-title">
                {t('home.quote.boardTitle', '실시간 맞춤 견적 & 상담 접수 현황')}
              </h4>
            </div>

            {/* Filter Status Tabs */}
            <div className="board-filters">
              <button
                type="button"
                className={`board-filter-btn ${statusFilter === 'all' ? 'is-active' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                {t('common.all', '전체')} ({quotes.length})
              </button>
              {Object.entries(STATUS_MAP).map(([key, item]) => {
                const count = quotes.filter((q) => q.status === key).length;
                const statusLabel = isKorean ? item.labelKr : item.labelVi;
                return (
                  <button
                    key={key}
                    type="button"
                    className={`board-filter-btn ${statusFilter === key ? 'is-active' : ''}`}
                    onClick={() => setStatusFilter(key)}
                  >
                    {statusLabel} ({count})
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
                  <th style={{ width: '15%' }}>{t('home.quote.tableTime', '접수 시간')}</th>
                  <th style={{ width: '22%' }}>{t('home.quote.tableStatus', '진행 상태')}</th>
                  <th style={{ width: '20%' }}>{t('home.quote.tableDest', '여행 목적지')}</th>
                  <th style={{ width: '18%' }}>{t('home.quote.tableCustomer', '고객명')}</th>
                  <th style={{ width: '25%' }}>{t('home.quote.tableGroup', '인원 구성 & 희망 일정')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((q) => {
                  const statusConf = STATUS_MAP[q.status] || STATUS_MAP.waiting;
                  const statusLabel = isKorean ? statusConf.labelKr : statusConf.labelVi;
                  const timeText = isKorean ? q.timeAgo : (q.timeAgoVi || q.timeAgo);
                  const destText = isKorean ? q.destination : (q.destinationVi || q.destination);
                  const customerText = isKorean
                    ? `${q.customerName} 고객님`
                    : `Khách hàng ${q.customerNameVi || q.customerName}`;
                  const groupText = isKorean ? q.travelGroup : (q.travelGroupVi || q.travelGroup);
                  const datesText = isKorean ? q.travelDates : (q.travelDatesVi || q.travelDates);

                  return (
                    <tr key={q.id} className="quote-row">
                      <td className="time-cell">
                        <Clock size={13} className="time-icon" />
                        <span>{timeText}</span>
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
                          {statusLabel}
                        </span>
                      </td>

                      <td className="dest-cell">
                        <strong className="dest-name-bold">{destText}</strong>
                      </td>

                      <td className="customer-cell">
                        <span className="customer-name">{customerText}</span>
                      </td>

                      <td className="group-cell">
                        <div className="group-info-wrap">
                          <span className="group-size">{groupText}</span>
                          <span className="travel-dates"> · {datesText}</span>
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
              {t('home.quote.privacyNotice', '* 개인정보 보호를 위해 고객명 일부는 마스킹 처리되어 표시됩니다. (정보보호 인증 완료)')}
            </p>
            <button
              type="button"
              className="board-action-link"
              onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
            >
              {t('home.quote.bottomCta', '+ 지금 바로 우리 가족 맞춤 견적 신청하기')}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default QuickQuote;
