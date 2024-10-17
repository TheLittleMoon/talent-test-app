// components/Card.tsx

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-card text-card-foreground rounded-lg shadow-md p-6 hover:scale-105 transition-all ${className}`}>
      {children}
    </div>
  );
};

export default Card;
