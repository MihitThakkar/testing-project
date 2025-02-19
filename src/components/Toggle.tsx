import React from 'react';
import { Power } from 'lucide-react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  activeText?: string;
  inactiveText?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  activeText = 'Active',
  inactiveText = 'Inactive',
  size = 'md',
  disabled = false,
  className = ''
}) => {
  const sizes = {
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-14'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        relative
        ${sizes[size]}
        px-6
        rounded-xl
        transition-all
        duration-300
        outline-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}
        bg-[#1a1b1e]
        shadow-[6px_6px_12px_#151617,_-6px_-6px_12px_#1f2025]
        active:shadow-[inset_6px_6px_12px_#151617,_inset_-6px_-6px_12px_#1f2025]
        active:scale-95
        ${className}
      `}
      disabled={disabled}
    >
      {/* Inner Shadow */}
      <div
        className={`
          absolute
          inset-[2px]
          rounded-xl
          transition-all
          duration-300
          shadow-[inset_2px_2px_4px_#151617,_inset_-2px_-2px_4px_#1f2025]
          bg-[#1c1d20]
        `}
      />

      {/* Content Container */}
      <div className="relative flex items-center justify-center h-full gap-3">
        <Power 
          className={`
            ${iconSizes[size]}
            transition-all
            duration-300
            transform
            ${checked 
              ? 'text-green-400 rotate-0' 
              : 'text-red-400 rotate-180'
            }
          `}
        />
        <span className={`
          font-medium
          whitespace-nowrap
          transition-all
          duration-300
          ${checked 
            ? 'text-green-400' 
            : 'text-red-400'
          }
          ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'}
        `}>
          {checked ? activeText : inactiveText}
        </span>
      </div>
    </button>
  );
};

export default Toggle;