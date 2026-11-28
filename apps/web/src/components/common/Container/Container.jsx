import React from 'react';
import './Container.css';

const Container = ({ children, className = '', fluid = false, ...props }) => {
  return (
    <div
      className={`${fluid ? 'container-fluid' : 'container'} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
