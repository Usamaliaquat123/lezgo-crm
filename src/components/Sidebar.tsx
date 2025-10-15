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
  Camera,
  LucideIcon,
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  pendingProofsCount?: number;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  isMobileOpen,
  setIsMobileOpen,
  pendingProofsCount = 0,
  onLogout,
}) => {
  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      color: 'text-blue-600',
    },
    {
      id: 'car-controls',
      label: 'Car Controls',
      icon: Car,
      color: 'text-green-600',
    },
    {
      id: 'fleet-management',
      label: 'Fleet',
      icon: MapPin,
      color: 'text-purple-600',
    },
    {
      id: 'vehicle-management',
      label: 'Vehicles',
      icon: Car,
      color: 'text-blue-600',
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: Calendar,
      color: 'text-orange-600',
    },
    {
      id: 'parking-proofs',
      label: 'Parking Proofs',
      icon: Camera,
      color: 'text-teal-600',
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      color: 'text-indigo-600',
    },
    {
      id: 'user-management',
      label: 'Staffs',
      icon: Users,
      color: 'text-cyan-600',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      color: 'text-pink-600',
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      color: 'text-emerald-600',
    },
    {
      id: 'push-notifications',
      label: 'Push Notifications',
      icon: Bell,
      color: 'text-yellow-600',
    },
  ];

  const bottomMenuItems: MenuItem[] = [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'text-gray-600',
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      color: 'text-gray-600',
    },
  ];

  const handleMenuClick = (id: string): void => {
    setActiveSection(id);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out lg:transform-none ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Car size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">LezGo</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Car Rental CRM</p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsMobileOpen(false)}>
            <X size={18} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon size={18} className={activeSection === item.id ? item.color : ''} />
                <span>{item.label}</span>
                {item.id === 'parking-proofs' && pendingProofsCount > 0 && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">
                    {pendingProofsCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Bottom Menu */}
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
            {bottomMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            © 2024 LezGo CRM v1.0.0
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

