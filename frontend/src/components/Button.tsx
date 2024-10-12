import React from 'react';

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  onClick,
  children,
}) => {
  const buttonStyles = {
    primary: {
      backgroundColor: '#1d4ed8',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#6b7280',
      color: 'white',
    },
    tertiary: {
      backgroundColor: 'transparent',
      border: '1px solid #6b7280',
      color: '#6b7280',
    },
    common: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
  };

  const spinnerStyles = {
    width: '16px',
    height: '16px',
    border: '2px solid white',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return (
    <button
      style={{ 
        ...buttonStyles[type], 
        ...buttonStyles.common,
        opacity: disabled || loading ? 0.6 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer'
      }}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <span style={spinnerStyles}></span> : icon}
      {children}
    </button>
  );
};

export default Button;
