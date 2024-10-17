// components/Input.tsx

import React from 'react';

interface InputProps {
  id: string;
  type?: string;
  value: string | number | undefined;
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ id, type = 'text', value, placeholder, required, onChange, className }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      className={`bg-input text-foreground rounded-md p-2 border border-border focus:outline-none focus:ring-2 focus:ring-ring ${className}`}
    />
  );
};

export default Input;
