import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  delay = 200,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | undefined>();

  const showTooltip = () => {
    const id = window.setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const tooltipStyles = {
    container: {
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
    } as React.CSSProperties,
    tooltip: {
      position: 'absolute',
      padding: '8px',
      backgroundColor: '#333',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: 100,
      whiteSpace: 'nowrap',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(-5px)',
    } as React.CSSProperties,
    arrow: {
      width: 0,
      height: 0,
      borderStyle: 'solid',
      position: 'absolute',
    } as React.CSSProperties,
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return {
          tooltip: { bottom: '100%', left: '50%', transform: 'translateX(-50%)' },
          arrow: {
            top: '100%',
            left: '50%',
            borderWidth: '5px 5px 0 5px',
            borderColor: '#333 transparent transparent transparent',
            transform: 'translateX(-50%)',
          },
        };
      case 'bottom':
        return {
          tooltip: { top: '100%', left: '50%', transform: 'translateX(-50%)' },
          arrow: {
            bottom: '100%',
            left: '50%',
            borderWidth: '0 5px 5px 5px',
            borderColor: 'transparent transparent #333 transparent',
            transform: 'translateX(-50%)',
          },
        };
      case 'left':
        return {
          tooltip: { right: '100%', top: '50%', transform: 'translateY(-50%)' },
          arrow: {
            right: '-5px',
            top: '50%',
            borderWidth: '5px 0 5px 5px',
            borderColor: 'transparent transparent transparent #333',
            transform: 'translateY(-50%)',
          },
        };
      case 'right':
        return {
          tooltip: { left: '100%', top: '50%', transform: 'translateY(-50%)' },
          arrow: {
            left: '-5px',
            top: '50%',
            borderWidth: '5px 5px 5px 0',
            borderColor: 'transparent #333 transparent transparent',
            transform: 'translateY(-50%)',
          },
        };
      default:
        return {};
    }
  };

  const positionStyles = getPositionStyles();

  return (
    <div
      style={tooltipStyles.container}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <div
        style={{
          ...tooltipStyles.tooltip,
          ...positionStyles.tooltip,
        }}
      >
        {content}
        <div style={{ ...tooltipStyles.arrow, ...positionStyles.arrow }} />
      </div>
    </div>
  );
};

export default Tooltip;
