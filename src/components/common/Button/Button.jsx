import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon = null,
  rightIcon: RightIcon = null,
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full-width' : '',
    loading ? 'btn-loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {Icon && <Icon className="btn-icon btn-icon-left" size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />}
          <span className="btn-text">{children}</span>
          {RightIcon && <RightIcon className="btn-icon btn-icon-right" size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} />}
        </>
      )}
    </button>
  );
};

export default Button;
