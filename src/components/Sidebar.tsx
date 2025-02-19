import React from 'react';
import { LineChart, Receipt, User, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { removeAuthCode } from '../utils/auth';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { icon: LineChart, label: 'Dashboard', path: '/' },
    { icon: Receipt, label: 'Transactions', path: '/transactions' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose?.();
  };

  const handleLogout = () => {
    removeAuthCode();
    navigate('/login', { replace: true });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-5 left-5 h-[calc(100vh-2.5rem)] w-[100px]
          neu-card
          transform transition-transform duration-300 ease-in-out z-50
          flex flex-col items-center py-8 px-4
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="mb-12">
          <div className="neu-button p-4 text-blue-400">
            <LineChart className="h-6 w-6" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 w-full space-y-5">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full aspect-square
                  neu-button
                  flex items-center justify-center
                  transition-all duration-200
                  group
                  ${isActive ? 'text-blue-400 shadow-[inset_4px_4px_8px_#0d0e0f,_inset_-4px_-4px_8px_#27282d]' : 'text-gray-400'}
                  hover:text-blue-400
                `}
              >
                <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="w-full mt-8">
          <button 
            onClick={handleLogout}
            className="
              w-full aspect-square
              neu-button
              flex items-center justify-center
              text-gray-400
              hover:text-red-400
              transition-all duration-200
              group
            "
          >
            <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;