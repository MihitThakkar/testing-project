import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  className?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = value 
    ? format(parseISO(value), 'MMM dd, yyyy')
    : 'Select date';

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`
          p-2
          rounded-lg
          bg-[#1a1b1e]
          transition-all
          duration-300
          ${isHovered 
            ? 'shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025] scale-110' 
            : 'shadow-[2px_2px_4px_#151617,_-2px_-2px_4px_#1f2025]'
          }
        `}>
          <Calendar className={`
            h-4 
            w-4 
            transition-all 
            duration-300
            ${isFocused ? 'text-blue-400' : 'text-gray-400'}
          `} />
        </div>
        <label className={`
          text-sm 
          font-medium 
          transition-colors 
          duration-300
          ${isFocused ? 'text-gray-200' : 'text-gray-400'}
        `}>
          {label}
        </label>
      </div>

      {/* Input Container */}
      <label className={`
        block
        relative
        rounded-xl
        bg-[#1a1b1e]
        transition-all
        duration-300
        cursor-pointer
        ${isFocused 
          ? 'shadow-[8px_8px_16px_#0d0e0f,_-8px_-8px_16px_#27282d] scale-[1.02]'
          : isHovered
            ? 'shadow-[6px_6px_12px_#0d0e0f,_-6px_-6px_12px_#27282d] scale-[1.01]'
            : 'shadow-[4px_4px_8px_#0d0e0f,_-4px_-4px_8px_#27282d]'
        }
      `}>
        {/* Gradient Overlay */}
        <div className={`
          absolute
          inset-0
          rounded-xl
          bg-gradient-to-br
          from-blue-400/5
          via-purple-400/5
          to-blue-400/5
          opacity-0
          transition-opacity
          duration-300
          ${isFocused || isHovered ? 'opacity-100' : 'opacity-0'}
          pointer-events-none
        `}/>

        {/* Inner Shadow */}
        <div className={`
          absolute
          inset-[1px]
          rounded-xl
          bg-[#1a1b1e]
          transition-shadow
          duration-300
          pointer-events-none
          ${isFocused 
            ? 'shadow-[inset_4px_4px_8px_#151617,_inset_-4px_-4px_8px_#1f2025]'
            : 'shadow-[inset_2px_2px_4px_#151617,_inset_-2px_-2px_4px_#1f2025]'
          }
        `}/>

        {/* Custom Display */}
        <div className="
          relative
          py-3.5
          px-4
          text-base
          font-medium
          flex
          items-center
          justify-between
          gap-3
          pointer-events-none
        ">
          <span className={`
            transition-all
            duration-300
            ${value 
              ? 'text-gray-200 font-semibold tracking-wide' 
              : 'text-gray-500'
            }
            ${isFocused && 'scale-105 origin-left'}
          `}>
            {formattedDate}
          </span>
          <ChevronDown className={`
            h-4 
            w-4 
            transition-all
            duration-300
            ${isFocused 
              ? 'text-blue-400 rotate-180 scale-110' 
              : 'text-gray-400 rotate-0'
            }
          `}/>
        </div>

        {/* Actual Input */}
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          min={min}
          max={max}
          className="
            absolute
            inset-0
            w-full
            h-full
            opacity-0
            cursor-pointer
            [color-scheme:dark]
          "
        />

        {/* Bottom Gradient Line */}
        <div className={`
          absolute
          bottom-0
          left-0
          h-0.5
          bg-gradient-to-r
          from-blue-400/80
          via-purple-400/80
          to-blue-400/80
          transition-all
          duration-500
          pointer-events-none
          ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}
        `}/>

        {/* Focus Ring */}
        <div className={`
          absolute
          -inset-px
          rounded-xl
          transition-all
          duration-300
          pointer-events-none
          ${isFocused 
            ? 'bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-100' 
            : 'opacity-0'
          }
        `}/>
      </label>

      {/* Date Picker Styles */}
      <style>{`
        input[type="date"] {
          color-scheme: dark;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          color: transparent;
          background: transparent;
          cursor: pointer;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default DateInput;