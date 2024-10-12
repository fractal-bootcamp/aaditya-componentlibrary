import React from 'react';

interface SkeletonProps {
  shape?: 'rectangle' | 'circle' | 'line';
  width?: string;
  height?: string;
  animationSpeed?: number;
}

const SkeletonScreen: React.FC<SkeletonProps> = ({
  shape = 'rectangle',
  width = '100%',
  height = '16px',
  animationSpeed = 2, // in seconds
}) => {
  const skeletonStyles = {
    base: {
      backgroundColor: '#e5e7eb',
      overflow: 'hidden',
      position: 'relative',
      borderRadius: shape === 'circle' ? '50%' : '4px',
      width,
      height,
      margin: '0.5rem 0',
    } as React.CSSProperties,
    shimmer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `linear-gradient(
        90deg,
        rgba(229, 231, 235, 0.2) 0%,
        rgba(229, 231, 235, 0.6) 50%,
        rgba(229, 231, 235, 0.2) 100%
      )`,
      backgroundSize: '200% 100%',
      animation: `shimmer ${animationSpeed}s infinite`,
    } as React.CSSProperties,
  };

  return (
    <div style={skeletonStyles.base}>
      <div style={skeletonStyles.shimmer}></div>
    </div>
  );
};

export default SkeletonScreen;

// CSS Keyframes defined in the component file
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;
document.head.appendChild(styleSheet);
