import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import './Dropdown.css';

const Dropdown = ({
  options = [],
  value = null,
  onChange,
  placeholder = 'Chọn một mục...',
  label = '',
  icon: Icon = null,
  className = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value || opt.id === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    if (disabled) return;
    onChange && onChange(option.value || option.id);
    setIsOpen(false);
  };

  return (
    <div className={`custom-dropdown-wrapper ${className}`.trim()} ref={dropdownRef}>
      {label && <label className="custom-dropdown-label">{label}</label>}
      <button
        type="button"
        className={`custom-dropdown-trigger ${isOpen ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="dropdown-trigger-content">
          {Icon && <Icon size={18} className="dropdown-trigger-icon" />}
          <span className={`dropdown-trigger-text ${!selectedOption ? 'is-placeholder' : ''}`}>
            {selectedOption ? selectedOption.label || selectedOption.name : placeholder}
          </span>
        </span>
        <ChevronDown size={18} className={`dropdown-chevron ${isOpen ? 'rotate' : ''}`} />
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu animate-slide-down">
          {options.map((option) => {
            const optVal = option.value || option.id;
            const isSelected = selectedOption && (selectedOption.value === optVal || selectedOption.id === optVal);
            return (
              <div
                key={optVal}
                className={`custom-dropdown-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                <div className="dropdown-item-text">
                  <span className="dropdown-item-primary">{option.label || option.name}</span>
                  {option.sublabel && <span className="dropdown-item-sub">{option.sublabel}</span>}
                </div>
                {isSelected && <Check size={16} className="dropdown-check-icon" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
