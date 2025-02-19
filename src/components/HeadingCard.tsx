import React from 'react';
import { Card, Toggle } from '.';

interface HeadingCardProps {
  userName: string;
  isActive: boolean;
  onToggleActive: (active: boolean) => void;
}

const HeadingCard: React.FC<HeadingCardProps> = ({
  userName,
  isActive,
  onToggleActive
}) => {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  return (
    <Card className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200 mb-2">
            Good {getTimeOfDay()}, {userName}!
          </h1>
          <p className="text-gray-400">
            Welcome back to your trading dashboard
          </p>
        </div>
        <Toggle
          checked={isActive}
          onChange={onToggleActive}
          activeText="Trading Active"
          inactiveText="Trading Inactive"
          size="md"
        />
      </div>
    </Card>
  );
};

export default HeadingCard;