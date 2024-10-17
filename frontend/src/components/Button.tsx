// components/Button.tsx

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;  // Add this line to support the disabled prop
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className,
  type = 'button',
  disabled = false  // Default value for disabled
}) => {
  const baseStyles = 'font-bold py-2 px-4 rounded transition-all';
  const variantStyles =
    variant === 'primary'
      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
      : 'bg-secondary text-secondary-foreground hover:bg-secondary/90';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
      disabled={disabled}  // Add disabled attribute here
    >
      {children}
    </button>
  );
};

export default Button;