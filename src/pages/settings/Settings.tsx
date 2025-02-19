import React, { useState } from 'react';
import { Bell, Shield, Smartphone, Mail } from 'lucide-react';
import { Card, Toggle } from '../../components';

interface Setting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: React.ElementType;
}

const Settings = () => {
  const [settings, setSettings] = useState<Setting[]>([
    {
      id: 'notifications',
      title: 'Push Notifications',
      description: 'Receive notifications for trades and alerts',
      enabled: true,
      icon: Bell
    },
    {
      id: '2fa',
      title: 'Two-Factor Auth',
      description: 'Add an extra layer of security to your account',
      enabled: true,
      icon: Shield
    },
    {
      id: 'mobile',
      title: 'Mobile Access',
      description: 'Allow trading from mobile devices',
      enabled: false,
      icon: Smartphone
    },
    {
      id: 'email',
      title: 'Email Updates',
      description: 'Receive daily summaries and reports',
      enabled: true,
      icon: Mail
    }
  ]);

  const handleToggle = (id: string) => {
    setSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  return (
    <div className="h-full">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-200 mb-6">Settings</h1>
        
        <Card className="p-6">
          <div className="space-y-6">
            {settings.map(setting => (
              <div
                key={setting.id}
                className="neu-convex p-4 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="neu-button p-2 text-blue-400">
                      <setting.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-gray-200 font-medium">{setting.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{setting.description}</p>
                    </div>
                  </div>
                  <Toggle
                    checked={setting.enabled}
                    onChange={() => handleToggle(setting.id)}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;