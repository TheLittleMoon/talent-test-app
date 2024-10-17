// components/Select.tsx
import React from 'react';

interface SelectProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;  // Adding required support
  children: React.ReactNode;
  className?: string;
}

const Select: React.FC<SelectProps> = ({ id, value, onChange, required, children, className }) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}  // Apply required attribute
      className={`bg-input text-foreground rounded-md p-2 border border-border focus:outline-none focus:ring-2 focus:ring-ring ${className}`}
    >
      {children}
    </select>
  );
};

export default Select;