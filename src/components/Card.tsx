import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'convex' | 'concave';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'neu-card',
    convex: 'neu-convex',
    concave: 'neu-concave'
  };

  return (
    <div className={`${variantClasses[variant]} p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;