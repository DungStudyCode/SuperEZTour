import React from 'react';
import './Loading.css';

const Loading = ({ text = 'Đang tải dữ liệu...', fullPage = false }) => {
  return (
    <div className={`loading-container ${fullPage ? 'full-page' : ''}`}>
      <div className="loading-spinner-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;
