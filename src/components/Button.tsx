import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-6 py-4 text-lg'
  };

  const variantClasses = {
    primary: `
      text-gray-200 
      shadow-[5px_5px_10px_#0d0e0f,_-5px_-5px_10px_#27282d]
      hover:shadow-[8px_8px_16px_#0d0e0f,_-8px_-8px_16px_#27282d]
      hover:scale-[1.02]
      active:shadow-[inset_6px_6px_12px_#0d0e0f,_inset_-6px_-6px_12px_#27282d]
      active:scale-[0.98]
      disabled:shadow-[2px_2px_4px_#0d0e0f,_-2px_-2px_4px_#27282d]
      disabled:opacity-50
      disabled:cursor-not-allowed
      disabled:hover:scale-100
      disabled:active:scale-100
    `,
    secondary: `
      text-gray-400
      shadow-[3px_3px_6px_#0d0e0f,_-3px_-3px_6px_#27282d]
      hover:shadow-[5px_5px_10px_#0d0e0f,_-5px_-5px_10px_#27282d]
      hover:scale-[1.01]
      active:shadow-[inset_4px_4px_8px_#0d0e0f,_inset_-4px_-4px_8px_#27282d]
      active:scale-[0.99]
      disabled:shadow-[1px_1px_2px_#0d0e0f,_-1px_-1px_2px_#27282d]
      disabled:opacity-50
      disabled:cursor-not-allowed
      disabled:hover:scale-100
      disabled:active:scale-100
    `
  };

  return (
    <button
      className={`
        relative
        bg-[#1a1b1e]
        rounded-xl
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        font-medium
        transition-all
        duration-200
        flex
        items-center
        justify-center
        gap-2
        before:absolute
        before:inset-0
        before:rounded-xl
        before:bg-gradient-to-br
        before:from-gray-800/5
        before:to-gray-900/5
        before:opacity-0
        hover:before:opacity-100
        before:transition-opacity
        disabled:before:opacity-0
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;