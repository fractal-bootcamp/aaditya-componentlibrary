import React, { useState } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';

interface RatingProps {
  scale?: number; // Total rating scale (e.g., 5 stars)
  icon?: 'star' | 'heart' | 'emoji'; // Icon type
  precise?: boolean; // Allow half or decimal ratings
  readOnly?: boolean; // Disable interactions
  defaultValue?: number; // Default rating value
  onChange?: (value: number) => void; // Callback on rating change
  tooltips?: string[]; // Custom tooltips for each rating level
}

const Rating: React.FC<RatingProps> = ({
  scale = 5,
  icon = 'star',
  precise = false,
  readOnly = false,
  defaultValue = 0,
  onChange,
  tooltips = [],
}) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [ratingValue, setRatingValue] = useState<number>(defaultValue);

  const handleRatingClick = (value: number) => {
    if (readOnly) return;
    setRatingValue(value);
    if (onChange) onChange(value);
  };

  const handleMouseEnter = (value: number) => {
    if (!readOnly) setHoveredValue(value);
  };

  const handleMouseLeave = () => setHoveredValue(null);

  const getIcon = (value: number) => {
    const isFilled = value <= (hoveredValue || ratingValue);
    switch (icon) {
      case 'heart':
        return <FaHeart color={isFilled ? '#f44336' : '#e0e0e0'} />;
      case 'emoji':
        return <span>{isFilled ? '😄' : '😐'}</span>;
      case 'star':
      default:
        return <FaStar color={isFilled ? '#ffc107' : '#e0e0e0'} />;
    }
  };

  const iconStyles = {
    cursor: readOnly ? 'default' : 'pointer',
    transition: 'transform 0.2s ease',
    display: 'inline-block',
    margin: '0 4px',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {Array.from({ length: scale }, (_, index) => {
        const value = precise ? index + 0.5 : index + 1;
        return (
          <div
            key={index}
            style={{
              ...iconStyles,
              transform: hoveredValue === value ? 'scale(1.2)' : 'scale(1)',
            }}
            onClick={() => handleRatingClick(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
          >
            {getIcon(value)}
            {tooltips[index] && hoveredValue === value && (
              <span
                style={{
                  position: 'absolute',
                  backgroundColor: '#000',
                  color: '#fff',
                  padding: '4px',
                  borderRadius: '4px',
                  marginTop: '24px',
                  fontSize: '12px',
                }}
              >
                {tooltips[index]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
