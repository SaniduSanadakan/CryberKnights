import React from 'react';

const Button = ({ 
  type = 'button', 
  children, 
  onClick, 
  disabled = false,
  className = '' 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`submit-button ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;