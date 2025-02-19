import React, { useState, useEffect } from 'react';
import { Target, AlertTriangle, TrendingUp, Save, X, Edit2, DollarSign } from 'lucide-react';
import { Toggle } from './';

interface TradingPreference {
  id: number;
  script: string;
  quantity: number;
  target: number;
  stopLoss: number;
  isActive: boolean;
}

interface TradingPreferenceCardProps {
  preference: TradingPreference;
  onUpdate: (id: number, updates: Partial<TradingPreference>) => void;
  onDelete: (id: number) => void;
  isNew?: boolean;
}

const TradingPreferenceCard: React.FC<TradingPreferenceCardProps> = ({
  preference,
  onUpdate,
  onDelete,
  isNew = false
}) => {
  const [isEditing, setIsEditing] = useState(isNew);
  const [editedValues, setEditedValues] = useState(preference);

  useEffect(() => {
    if (isNew) {
      setIsEditing(true);
    }
  }, [isNew]);

  const handleSave = () => {
    if (!editedValues.script) return;
    onUpdate(preference.id, editedValues);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (isNew) {
      onDelete(preference.id);
    } else {
      setEditedValues(preference);
      setIsEditing(false);
    }
  };

  const handleToggleActive = (active: boolean) => {
    onUpdate(preference.id, { isActive: active });
  };

  const InputField = ({ 
    label, 
    value, 
    onChange, 
    icon: Icon, 
    textColor = 'text-gray-200',
    gradientFrom,
    gradientTo,
    type = 'text',
    placeholder
  }: { 
    label: string;
    value: number | string;
    onChange: (value: string) => void;
    icon: React.ElementType;
    textColor?: string;
    gradientFrom?: string;
    gradientTo?: string;
    type?: string;
    placeholder?: string;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className={`
          p-1.5
          rounded-lg
          bg-[#1a1b1e]
          shadow-[2px_2px_4px_#151617,_-2px_-2px_4px_#1f2025]
          ${textColor}
          transition-all
          duration-300
          group-hover:scale-110
        `}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium text-gray-400">{label}</span>
      </div>
      <div className={`
        relative
        overflow-hidden
        rounded-xl
        bg-[#1a1b1e]
        ${isEditing 
          ? 'shadow-[inset_3px_3px_6px_#151617,_inset_-3px_-3px_6px_#1f2025]'
          : 'shadow-[inset_2px_2px_4px_#151617,_inset_-2px_-2px_4px_#1f2025]'
        }
        transition-all
        duration-300
        hover:scale-[1.02]
        group/input
      `}>
        {/* Gradient Background */}
        <div className={`
          absolute 
          inset-0 
          bg-gradient-to-br 
          ${gradientFrom || 'from-gray-400/5'} 
          ${gradientTo || 'to-gray-500/5'} 
          opacity-0 
          group-hover/input:opacity-100 
          transition-opacity 
          duration-300
        `} />

        {/* Input Container */}
        <div className="relative py-3 px-4">
          {isEditing ? (
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`
                w-full
                bg-transparent
                text-lg
                font-medium
                ${textColor}
                focus:outline-none
                transition-all
                duration-300
                placeholder-gray-500
                [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none
              `}
              placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            />
          ) : (
            <span className={`
              block
              text-xl
              font-semibold
              ${textColor}
              transition-transform
              duration-300
              group-hover/input:scale-105
              ${!preference.isActive && 'opacity-50'}
            `}>
              {value}
            </span>
          )}
        </div>

        {/* Bottom Gradient Line */}
        {isEditing && (
          <div className={`
            absolute
            bottom-0
            left-0
            h-0.5
            w-full
            bg-gradient-to-r
            ${gradientFrom || 'from-gray-400/20'}
            ${gradientTo || 'to-gray-500/20'}
          `} />
        )}
      </div>
    </div>
  );

  return (
    <div className={`
      relative
      transition-all
      duration-300
      transform
      hover:scale-[1.01]
      group
    `}>
      {/* Card Background */}
      <div className={`
        absolute
        inset-0
        rounded-2xl
        bg-[#1a1b1e]
        shadow-[8px_8px_16px_#0d0e0f,_-8px_-8px_16px_#27282d]
        transition-all
        duration-300
        group-hover:shadow-[12px_12px_24px_#0d0e0f,_-12px_-12px_24px_#27282d]
        ${!preference.isActive && !isEditing && 'opacity-75'}
      `} />

      {/* Gradient Overlay */}
      <div className={`
        absolute
        inset-0
        rounded-2xl
        bg-gradient-to-br
        ${preference.isActive 
          ? 'from-gray-400/5 via-transparent to-gray-600/5'
          : 'from-red-400/5 via-transparent to-red-600/5'
        }
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-300
      `} />

      {/* Inactive State Overlay */}
      {!preference.isActive && !isEditing && (
        <>
          <div className="absolute inset-0 bg-[#1a1b1e]/60 rounded-2xl backdrop-blur-[1px]" />
          <div className="absolute inset-[1px] rounded-2xl shadow-[inset_3px_3px_6px_#0d0e0f,_inset_-3px_-3px_6px_#27282d]" />
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 via-transparent to-red-600/5 opacity-30" />
        </>
      )}

      {/* Content */}
      <div className="relative p-5 sm:p-6 rounded-2xl">
        {/* Top Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={!editedValues.script}
                className="
                  relative
                  p-2
                  rounded-xl
                  bg-[#1a1b1e]
                  shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025]
                  hover:shadow-[inset_4px_4px_8px_#151617,_inset_-4px_-4px_8px_#1f2025]
                  active:scale-95
                  transition-all
                  duration-300
                  text-green-400
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  disabled:hover:shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025]
                  disabled:active:scale-100
                  overflow-hidden
                  group/btn
                "
              >
                <div className="
                  absolute
                  inset-0
                  rounded-xl
                  bg-gradient-to-br
                  from-green-400/10
                  to-green-600/5
                  opacity-0
                  group-hover/btn:opacity-100
                  transition-opacity
                  duration-300
                " />
                <div className="relative z-10 transition-transform duration-300 group-hover/btn:scale-110">
                  <Save className="h-5 w-5" />
                </div>
              </button>
              <button
                onClick={handleCancel}
                className="
                  relative
                  p-2
                  rounded-xl
                  bg-[#1a1b1e]
                  shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025]
                  hover:shadow-[inset_4px_4px_8px_#151617,_inset_-4px_-4px_8px_#1f2025]
                  active:scale-95
                  transition-all
                  duration-300
                  text-red-400
                  overflow-hidden
                  group/btn
                "
              >
                <div className="
                  absolute
                  inset-0
                  rounded-xl
                  bg-gradient-to-br
                  from-red-400/10
                  to-red-600/5
                  opacity-0
                  group-hover/btn:opacity-100
                  transition-opacity
                  duration-300
                " />
                <div className="relative z-10 transition-transform duration-300 group-hover/btn:scale-110">
                  <X className="h-5 w-5" />
                </div>
              </button>
            </>
          ) : (
            <>
              <Toggle
                checked={preference.isActive}
                onChange={handleToggleActive}
                activeText="Active"
                inactiveText="Inactive"
                size="sm"
              />
              <button
                onClick={() => setIsEditing(true)}
                disabled={!preference.isActive}
                className={`
                  relative
                  p-2
                  rounded-xl
                  bg-[#1a1b1e]
                  transition-all
                  duration-300
                  overflow-hidden
                  group/btn
                  ${preference.isActive ? `
                    shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025]
                    hover:shadow-[inset_4px_4px_8px_#151617,_inset_-4px_-4px_8px_#1f2025]
                    active:scale-95
                    text-blue-400
                  ` : `
                    shadow-[2px_2px_4px_#151617,_-2px_-2px_4px_#1f2025]
                    cursor-not-allowed
                    text-gray-500
                    opacity-50
                  `}
                `}
              >
                <div className={`
                  absolute
                  inset-0
                  rounded-xl
                  bg-gradient-to-br
                  from-blue-400/10
                  to-blue-600/5
                  opacity-0
                  transition-opacity
                  duration-300
                  ${preference.isActive && 'group-hover/btn:opacity-100'}
                `} />
                <div className={`
                  relative
                  z-10
                  transition-transform
                  duration-300
                  ${preference.isActive && 'group-hover/btn:scale-110'}
                `}>
                  <Edit2 className="h-5 w-5" />
                </div>
              </button>
            </>
          )}
        </div>

        {/* Script Info */}
        <div className="flex items-center gap-4 mb-8 mt-4">
          <div className="
            relative
            h-12
            w-12
            rounded-xl
            bg-[#1a1b1e]
            shadow-[4px_4px_8px_#151617,_-4px_-4px_8px_#1f2025]
            transition-all
            duration-300
            group-hover:shadow-[6px_6px_12px_#151617,_-6px_-6px_12px_#1f2025]
            overflow-hidden
          ">
            <div className="
              absolute
              inset-0
              bg-gradient-to-br
              from-blue-400/10
              to-purple-400/10
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-300
            " />
            <div className={`
              relative
              h-full
              w-full
              flex
              items-center
              justify-center
              ${preference.isActive ? 'text-blue-400' : 'text-gray-500'}
              transition-all
              duration-300
              group-hover:scale-110
            `}>
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <div className="flex-1">
            {isNew ? (
              <div>
                <input
                  type="text"
                  value={editedValues.script}
                  onChange={(e) => setEditedValues(prev => ({ ...prev, script: e.target.value }))}
                  placeholder="Enter script name"
                  className="
                    w-full
                    bg-transparent
                    text-xl
                    font-bold
                    text-gray-200
                    placeholder-gray-500
                    focus:outline-none
                    border-b-2
                    border-blue-400/20
                    focus:border-blue-400
                    pb-1
                    transition-all
                    duration-300
                  "
                />
                <p className="text-sm text-gray-400 mt-2">Add a new trading script</p>
              </div>
            ) : (
              <>
                <h3 className={`
                  text-xl
                  font-bold
                  transition-all
                  duration-300
                  group-hover:text-gray-100
                  ${preference.isActive ? 'text-gray-200' : 'text-gray-400'}
                `}>
                  {preference.script}
                </h3>
                <p className="text-sm text-gray-400 mt-1">Trading Script</p>
              </>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <InputField
            label="Quantity"
            value={editedValues.quantity}
            onChange={(value) => setEditedValues(prev => ({ ...prev, quantity: parseFloat(value) || 0 }))}
            icon={DollarSign}
            gradientFrom="from-blue-400/20"
            gradientTo="to-blue-600/10"
            type="number"
          />

          <InputField
            label="Target"
            value={editedValues.target}
            onChange={(value) => setEditedValues(prev => ({ ...prev, target: parseFloat(value) || 0 }))}
            icon={Target}
            textColor="text-green-400"
            gradientFrom="from-green-400/20"
            gradientTo="to-green-600/10"
            type="number"
          />

          <InputField
            label="Stop Loss"
            value={editedValues.stopLoss}
            onChange={(value) => setEditedValues(prev => ({ ...prev, stopLoss: parseFloat(value) || 0 }))}
            icon={AlertTriangle}
            textColor="text-red-400"
            gradientFrom="from-red-400/20"
            gradientTo="to-red-600/10"
            type="number"
          />
        </div>
      </div>
    </div>
  );
};

export default TradingPreferenceCard;