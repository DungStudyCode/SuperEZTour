import React, { Component } from 'react';
import { AlertCircle, RefreshCw, Home, Phone } from 'lucide-react';
import { BRAND_CONFIG } from '../../../constants/brand.config';
import './ErrorBoundary.css';

/**
 * Super EZ Tour — Luxury Error Boundary
 * Prevents blank white screen crashes across the platform.
 * Catches render errors gracefully and offers quick recovery actions.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Super EZ Tour caught unhandled render error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isSubtree = this.props.isolated;
      const isKorean = document.documentElement.lang === 'ko';

      if (isSubtree) {
        return (
          <div className="error-boundary-isolated">
            <AlertCircle size={24} className="text-orange" />
            <div style={{ flex: 1 }}>
              <p className="error-isolated-text">
                {isKorean
                  ? '일시적인 오류가 발생했습니다. 다시 시도해 주세요.'
                  : 'Đã xảy ra sự cố hiển thị nhỏ. Vui lòng tải lại.'}
              </p>
              {this.state.error && (
                <small style={{ color: '#dc2626', display: 'block', fontSize: '11px', marginTop: '4px' }}>
                  {this.state.error.name}: {this.state.error.message}
                </small>
              )}
            </div>
            <button
              type="button"
              className="error-btn-retry"
              onClick={this.handleReset}
            >
              <RefreshCw size={14} />
              <span>{isKorean ? '다시 시도' : 'Thử lại'}</span>
            </button>
          </div>
        );
      }

      return (
        <div className="error-boundary-screen" role="alert">
          <div className="error-boundary-card">
            <div className="error-icon-box">
              <AlertCircle size={40} className="error-icon" />
            </div>

            <span className="error-brand-eyebrow">SUPER EZ TOUR</span>
            <h2 className="error-title">
              {isKorean
                ? '페이지를 불러오는 중 문제가 발생했습니다'
                : 'Hệ thống đang được làm mới'}
            </h2>
            <p className="error-subtitle">
              {isKorean
                ? '일시적인 네트워크 지연 또는 브라우저 캐시 문제일 수 있습니다. 새로고침을 진행해 주세요.'
                : 'Đã có sự cố hiển thị tạm thời. Quý khách vui lòng tải lại trang hoặc liên hệ hotline để được hỗ trợ tức thì.'}
            </p>

            {/* Technical Diagnostics for Debugging & Rapid Triage */}
            {this.state.error && (
              <div
                style={{
                  margin: '16px 0',
                  padding: '12px 14px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  textAlign: 'left',
                  fontSize: '12px',
                  color: '#b91c1c',
                  maxWidth: '100%',
                  overflowX: 'auto',
                }}
              >
                <strong style={{ display: 'block', marginBottom: '4px', color: '#991b1b' }}>
                  Lỗi kỹ thuật (Debug Exception):
                </strong>
                <code style={{ fontFamily: 'Consolas, monospace', fontSize: '12px', wordBreak: 'break-all' }}>
                  {this.state.error.name}: {this.state.error.message}
                </code>
                {this.state.error.stack && (
                  <pre
                    style={{
                      marginTop: '8px',
                      padding: '8px',
                      background: 'rgba(0,0,0,0.04)',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontFamily: 'Consolas, monospace',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      maxHeight: '180px',
                      overflowY: 'auto',
                    }}
                  >
                    {this.state.error.stack}
                  </pre>
                )}
                {this.state.errorInfo?.componentStack && (
                  <details style={{ marginTop: '8px', fontSize: '11px' }}>
                    <summary style={{ cursor: 'pointer', color: '#7f1d1d' }}>Component Stack Trace</summary>
                    <pre
                      style={{
                        marginTop: '4px',
                        padding: '6px',
                        background: 'rgba(0,0,0,0.04)',
                        borderRadius: '4px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                      }}
                    >
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="error-actions">
              <button
                type="button"
                className="error-btn-primary"
                onClick={this.handleReload}
              >
                <RefreshCw size={16} />
                <span>{isKorean ? '페이지 새로고침' : 'Tải lại trang'}</span>
              </button>

              <a
                href="/"
                className="error-btn-secondary"
                onClick={() => this.setState({ hasError: false })}
              >
                <Home size={16} />
                <span>{isKorean ? '홈으로 돌아가기' : 'Về trang chủ'}</span>
              </a>
            </div>

            <div className="error-hotline-footer">
              <Phone size={14} />
              <span>
                {isKorean ? '24시간 고객 케어:' : 'Hotline hỗ trợ 24/7:'}{' '}
                <strong>{BRAND_CONFIG?.contact?.hotline || '1900 8899'}</strong>
              </span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
