import React, { useState } from 'react';

interface TextInputProps {
  type?: 'text' | 'password';
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  type = 'text',
  placeholder,
  disabled = false,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const inputStyles = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #e5e7eb',
    borderRadius: '0.375rem',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
  };

  const focusStyles = {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.4)',
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={inputValue}
      disabled={disabled}
      onChange={handleChange}
      style={{
        ...inputStyles,
        ...(inputValue ? focusStyles : {}),
      }}
    />
  );
};

export default TextInput;
