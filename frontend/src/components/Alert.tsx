import React, { useEffect, useState } from 'react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number; // Duration in milliseconds
  onDismiss?: () => void;
  position?: 'top' | 'bottom';
}

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  duration = 3000,
  onDismiss,
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  const alertStyles = {
    container: {
      position: 'fixed',
      [position]: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      minWidth: '300px',
      padding: '16px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'white',
      backgroundColor: getBackgroundColor(type),
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      transform: isVisible ? 'translateY(0)' : `translateY(${position === 'top' ? '-20px' : '20px'})`,
    } as React.CSSProperties,
    closeButton: {
      marginLeft: '12px',
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '16px',
    } as React.CSSProperties,
  };

  function getBackgroundColor(type: string) {
    switch (type) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      case 'info':
      default:
        return '#2196f3';
    }
  }

  return (
    isVisible && (
      <div style={alertStyles.container}>
        <span>{message}</span>
        <button style={alertStyles.closeButton} onClick={handleClose}>
          ✕
        </button>
      </div>
    )
  );
};

export default Alert;
