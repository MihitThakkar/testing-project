import React, { InputHTMLAttributes, useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  hint?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  icon: Icon,
  error,
  hint,
  className = '',
  onFocus,
  onBlur,
  onChange,
  disabled = false,
  value,
  defaultValue,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState(value || defaultValue || '');

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  const hasValue = inputValue.length > 0;

  const getContainerClasses = () => {
    if (disabled) return 'shadow-[2px_2px_4px_#0d0e0f,_-2px_-2px_4px_#27282d] opacity-50';
    if (error) return 'shadow-[6px_6px_12px_#160d0d,_-6px_-6px_12px_#1e0f0f]';
    if (isFocused) return 'shadow-[8px_8px_16px_#0d0e0f,_-8px_-8px_16px_#27282d] scale-[1.02]';
    if (hasValue) return 'shadow-[7px_7px_14px_#0d0e0f,_-7px_-7px_14px_#27282d] bg-[#1b1c1f]';
    if (isHovered) return 'shadow-[7px_7px_14px_#0d0e0f,_-7px_-7px_14px_#27282d] scale-[1.01]';
    return 'shadow-[6px_6px_12px_#0d0e0f,_-6px_-6px_12px_#27282d]';
  };

  const getInnerShadowClasses = () => {
    if (disabled) return 'shadow-[inset_2px_2px_4px_#151617,_inset_-2px_-2px_4px_#1f2025]';
    if (error) return 'shadow-[inset_4px_4px_8px_#160d0d,_inset_-4px_-4px_8px_#1e0f0f]';
    if (isFocused) return 'shadow-[inset_5px_5px_10px_#131415,_inset_-5px_-5px_10px_#212227]';
    if (hasValue) return 'shadow-[inset_3px_3px_6px_#151617,_inset_-3px_-3px_6px_#1f2025]';
    return 'shadow-[inset_4px_4px_8px_#151617,_inset_-4px_-4px_8px_#1f2025]';
  };

  const getLabelClasses = () => {
    if (error) return 'text-red-400';
    if (hasValue) return 'text-gray-200';
    return 'text-gray-300';
  };

  const getIconClasses = () => {
    if (error) return 'text-red-400';
    if (isFocused) return 'text-gray-200 scale-110';
    if (hasValue) return 'text-gray-200 scale-105';
    if (isHovered) return 'text-gray-300';
    return 'text-gray-400';
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className={`
          block 
          text-sm 
          font-medium 
          ${getLabelClasses()}
          transition-colors 
          duration-200
          ${disabled ? 'opacity-50' : ''}
          ${hasValue ? 'font-semibold' : ''}
        `}>
          {label}
        </label>
      )}
      <div 
        className={`
          relative
          rounded-xl
          bg-[#1a1b1e]
          transition-all
          duration-200
          ease-in-out
          ${getContainerClasses()}
          ${disabled ? 'cursor-not-allowed' : ''}
          ${hasValue ? 'bg-opacity-90' : ''}
        `}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
      >
        <div
          className={`
            absolute
            inset-0
            rounded-xl
            transition-all
            duration-200
            ${getInnerShadowClasses()}
            ${hasValue ? 'bg-gradient-to-br from-gray-800/5 to-gray-900/5' : ''}
          `}
        />
        {Icon && (
          <div 
            className={`
              absolute 
              inset-y-0 
              left-4
              flex 
              items-center 
              pointer-events-none
              z-10
            `}
          >
            <Icon 
              className={`
                h-5 
                w-5 
                transition-all
                duration-200
                ${getIconClasses()}
                ${disabled ? 'opacity-50' : ''}
              `}
            />
          </div>
        )}
        <input
          className={`
            relative
            w-full
            bg-transparent
            py-3.5
            ${Icon ? 'pl-12' : 'pl-4'}
            pr-4
            text-gray-200
            placeholder-gray-500
            rounded-xl
            outline-none
            z-10
            transition-all
            duration-200
            disabled:cursor-not-allowed
            disabled:opacity-50
            ${hasValue ? 'font-medium tracking-wide' : ''}
            ${className}
          `}
          value={value}
          defaultValue={defaultValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1 ml-1">{error}</p>
      )}
      {!error && hint && (
        <p className="text-gray-500 text-sm mt-1 ml-1">{hint}</p>
      )}
    </div>
  );
};

export default Input;