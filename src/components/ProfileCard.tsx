import React from 'react';
import { User } from 'lucide-react';
import { Toggle } from './';

interface ProfileCardProps {
  name: string;
  code: string;
  isActive: boolean;
  onToggleActive: (active: boolean) => void;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  code,
  isActive,
  onToggleActive,
  className = ''
}) => {
  return (
    <div className={`
      relative
      neu-card
      p-6
      transition-all
      duration-300
      ${!isActive && 'opacity-75'}
      ${className}
    `}>
      {/* Disabled Overlay */}
      {!isActive && (
        <div className="absolute inset-0 bg-[#1a1b1e]/50 rounded-2xl backdrop-blur-[1px]" />
      )}

      {/* Inner Shadow when disabled */}
      {!isActive && (
        <div className="absolute inset-[1px] rounded-2xl shadow-[inset_2px_2px_4px_#0d0e0f,_inset_-2px_-2px_4px_#27282d]" />
      )}

      <div className="relative flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Profile Logo */}
          <div className={`
            neu-convex
            p-4
            rounded-xl
            transition-all
            duration-300
            ${!isActive && 'shadow-[2px_2px_4px_#0d0e0f,_-2px_-2px_4px_#27282d]'}
          `}>
            <div className={`
              w-12
              h-12
              neu-concave
              rounded-lg
              flex
              items-center
              justify-center
              transition-all
              duration-300
              ${!isActive && 'shadow-[inset_2px_2px_4px_#0d0e0f,_inset_-2px_-2px_4px_#27282d]'}
            `}>
              <User className={`
                w-6
                h-6
                transition-all
                duration-300
                ${isActive ? 'text-gray-400' : 'text-gray-500'}
              `} />
            </div>
          </div>

          {/* Name and Code */}
          <div className="space-y-1">
            <h3 className={`
              text-xl
              font-bold
              transition-colors
              duration-300
              ${isActive ? 'text-gray-200' : 'text-gray-400'}
            `}>
              {name}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`
                text-sm
                transition-colors
                duration-300
                ${isActive ? 'text-gray-400' : 'text-gray-500'}
              `}>
                Code:
              </span>
              <span className={`
                text-sm
                font-medium
                transition-colors
                duration-300
                ${isActive ? 'text-blue-400' : 'text-blue-400/50'}
              `}>
                {code}
              </span>
            </div>
          </div>
        </div>

        {/* Active/Inactive Toggle */}
        <Toggle
          checked={isActive}
          onChange={onToggleActive}
          activeText="Active"
          inactiveText="Inactive"
          size="sm"
        />
      </div>
    </div>
  );
};

export default ProfileCard;