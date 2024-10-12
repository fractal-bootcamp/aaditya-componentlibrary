import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const dropdownStyles = {
    position: 'relative',
    display: 'inline-block',
  };

  const toggleButtonStyles = {
    padding: '0.5rem 1rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
  };

  const menuStyles = {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '0.375rem',
    marginTop: '0.25rem',
    width: '100%',
  };

  const menuItemStyles = {
    padding: '0.5rem',
    cursor: 'pointer',
  };

  const menuItemHoverStyles = {
    backgroundColor: '#f3f4f6',
  };

  return (
    <div style={dropdownStyles}>
      <button style={toggleButtonStyles} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || 'Select an option'}
      </button>
      {isOpen && (
        <ul style={menuStyles}>
          {options.map((option, index) => (
            <li
              key={index}
              style={menuItemStyles}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#f3f4f6')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'white')
              }
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
