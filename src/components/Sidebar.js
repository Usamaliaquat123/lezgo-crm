import React from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Settings, 
  Users, 
  BarChart3, 
  MapPin, 
  Calendar,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      color: 'text-blue-600'
    },
    {
      id: 'car-controls',
      label: 'Car Controls',
      icon: Car,
      color: 'text-green-600'
    },
    {
      id: 'fleet-management',
      label: 'Fleet Management',
      icon: MapPin,
      color: 'text-purple-600'
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: Calendar,
      color: 'text-orange-600'
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      color: 'text-indigo-600'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      color: 'text-pink-600'
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      color: 'text-emerald-600'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      color: 'text-yellow-600'
    }
  ];

  const bottomMenuItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'text-gray-600'
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      color: 'text-gray-600'
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: LogOut,
      color: 'text-red-600'
    }
  ];

  const handleMenuClick = (itemId) => {
    setActiveSection(itemId);
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-50 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Car className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">LezGo</h1>
            <p className="text-sm text-gray-500">Car Rental CRM</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-700' 
                    : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`mr-3 ${isActive ? 'text-blue-600' : item.color} group-hover:scale-110 transition-transform`} 
                />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200">
        <nav className="space-y-2">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon 
                  size={18} 
                  className={`mr-3 ${item.color} group-hover:scale-110 transition-transform`} 
                />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <Users size={20} className="text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@lezgo.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
