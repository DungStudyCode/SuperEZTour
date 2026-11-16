import React from 'react';
import './SectionHeading.css';

const SectionHeading = ({
  tagline = '',
  title = '',
  subtitle = '',
  align = 'center',
  theme = 'light',
  className = '',
  action = null
}) => {
  return (
    <div className={`section-heading align-${align} theme-${theme} ${className}`.trim()}>
      <div className="section-heading-content">
        {tagline && <span className="section-heading-tagline">{tagline}</span>}
        {title && <h2 className="section-heading-title">{title}</h2>}
        {subtitle && <p className="section-heading-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="section-heading-action">{action}</div>}
    </div>
  );
};

export default SectionHeading;
