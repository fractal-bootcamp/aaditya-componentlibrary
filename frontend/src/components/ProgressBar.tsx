import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  type?: 'linear' | 'circular';
  progress: number; // Progress percentage (0-100)
  color?: string; // Color of the progress bar
  striped?: boolean; // Striped design for linear progress
  animated?: boolean; // Animated stripes for linear progress
  size?: number; // Diameter for circular progress bar
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  type = 'linear',
  progress,
  color = '#4caf50', // Default to green
  striped = false,
  animated = false,
  size = 100, // Default diameter for circular progress
}) => {
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setInternalProgress(progress), 100);
    return () => clearTimeout(timeout);
  }, [progress]);

  const linearBarStyles = {
    container: {
      width: '100%',
      height: '20px',
      backgroundColor: '#e0e0e0',
      borderRadius: '10px',
      overflow: 'hidden',
      position: 'relative',
    } as React.CSSProperties,
    progress: {
      width: `${internalProgress}%`,
      height: '100%',
      backgroundColor: color,
      transition: 'width 0.5s ease',
      ...(striped
        ? {
            backgroundImage: `repeating-linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.15) 0px,
              rgba(255, 255, 255, 0.15) 10px,
              transparent 10px,
              transparent 20px
            )`,
          }
        : {}),
      ...(animated
        ? {
            animation: 'stripe-animation 1s linear infinite',
          }
        : {}),
    } as React.CSSProperties,
  };

  const circularStyles = {
    svg: {
      width: `${size}px`,
      height: `${size}px`,
      transform: 'rotate(-90deg)',
    } as React.CSSProperties,
    circle: {
      fill: 'none',
      stroke: '#e0e0e0',
      strokeWidth: '8',
    } as React.CSSProperties,
    progressCircle: {
      fill: 'none',
      stroke: color,
      strokeWidth: '8',
      strokeDasharray: `${Math.PI * (size - 8)}`,
      strokeDashoffset: `${
        Math.PI * (size - 8) - (Math.PI * (size - 8) * internalProgress) / 100
      }`,
      transition: 'stroke-dashoffset 0.5s ease',
    } as React.CSSProperties,
  };

  return type === 'linear' ? (
    <div style={linearBarStyles.container}>
      <div style={linearBarStyles.progress}></div>
    </div>
  ) : (
    <svg style={circularStyles.svg}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={(size - 8) / 2}
        style={circularStyles.circle}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={(size - 8) / 2}
        style={circularStyles.progressCircle}
      />
    </svg>
  );
};

// Add keyframe animation for striped progress
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
  @keyframes stripe-animation {
    0% { background-position: 0 0; }
    100% { background-position: 40px 0; }
  }
`;
document.head.appendChild(styleSheet);

export default ProgressBar;
