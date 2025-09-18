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
  LogOut,
  X,
  Camera
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, isMobileOpen, setIsMobileOpen, pendingProofsCount = 0, onLogout }) => {
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
      label: 'Fleet',
      icon: MapPin,
      color: 'text-purple-600'
    },
    {
      id: 'vehicle-management',
      label: 'Vehicles',
      icon: Car,
      color: 'text-blue-600'
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: Calendar,
      color: 'text-orange-600'
    },
    {
      id: 'parking-proofs',
      label: 'Parking Proofs',
      icon: Camera,
      color: 'text-teal-600'
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      color: 'text-indigo-600'
    },
    {
      id: 'user-management',
      label: 'Staffs',
      icon: Users,
      color: 'text-cyan-600'
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
       id: 'push-notifications',
       label: 'Push Notifications',
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
    if (itemId === 'logout') {
      onLogout();
    } else {
      setActiveSection(itemId);
    }
    // Close mobile sidebar after selection
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() =>  (false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-50 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-900 dark:bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">LezGo</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Car Rental CRM</p>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            <X size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
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
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-500 text-blue-700 dark:text-blue-400' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`mr-3 ${isActive ? 'text-blue-600 dark:text-blue-400' : item.color + ' dark:text-gray-400'} group-hover:scale-110 transition-transform`} 
                />
                <span className="font-medium">{item.label}</span>
                
                {/* Notification badge for parking proofs */}
                {item.id === 'parking-proofs' && pendingProofsCount > 0 && (
                  <div className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                    {pendingProofsCount}
                  </div>
                )}
                
                {isActive && item.id !== 'parking-proofs' && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
                
                {isActive && item.id === 'parking-proofs' && pendingProofsCount === 0 && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {/* <nav className="space-y-2">
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
        </nav> */}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-900 dark:bg-blue-600 rounded-lg flex items-center justify-center">
            <Users size={16} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@lezgo.com</p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Sidebar;
