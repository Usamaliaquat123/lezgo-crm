import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, Car, TrendingUp, Users, MapPin, CheckCircle, Clock, AlertTriangle, Menu, Bell, Settings, LogOut, User, ChevronDown } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import CarControlsPage from './pages/CarControlsPage';
import FleetManagementPage from './pages/FleetManagementPage';
import VehicleManagementPage from './pages/VehicleManagementPage';
import BookingsPage from './pages/BookingsPage';
import CustomersPage from './pages/CustomersPage';
import UserManagementPage from './pages/UserManagementPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PaymentsPage from './pages/PaymentsPage';
import NotificationsPage from './pages/NotificationsPage';
import PushNotificationPage from './pages/PushNotificationPage';
import ParkingProofsPage from './pages/ParkingProofsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

// Mock data - replace with real API calls
const generateMockData = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Generate hourly sales data
  const salesData = [];
  for (let i = 0; i < 24; i++) {
    salesData.push({
      time: `${i.toString().padStart(2, '0')}:00`,
      today: Math.floor(Math.random() * 1000) + 200,
      yesterday: Math.floor(Math.random() * 800) + 150,
    });
  }

  // Generate hourly rides data
  const ridesData = [];
  for (let i = 0; i < 24; i++) {
    ridesData.push({
      time: `${i.toString().padStart(2, '0')}:00`,
      today: Math.floor(Math.random() * 8) + 1, // 1-8 rides per hour
      yesterday: Math.floor(Math.random() * 6) + 1, // 1-6 rides per hour
    });
  }

  return {
    rides: {
      today: 47,
      yesterday: 42
    },
    earnings: {
      today: 2840,
      yesterday: 2650
    },
    cars: {
      total: 25,
      available: 18,
      rented: 5,
      maintenance: 2
    },
    salesData,
    ridesData,
    customers: {
      today: 23,
      yesterday: 19
    },
    locations: {
      active: 8,
      total: 10
    },
    users: {
      newUsersToday: 15,
      newUsersYesterday: 12,
      totalUsers: 1247,
      bookingsToday: 23,
      bookingsYesterday: 19,
      totalBookings: 3456,
      activeUsers: 892
    },
    pendingProofsCount: Math.floor(Math.random() * 8) + 1 // 1-8 pending proofs
  };
};



// Main App Component that uses authentication
const AppContent = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const [data, setData] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New booking received', time: '2 min ago', unread: true },
    { id: 2, message: 'Vehicle maintenance due', time: '1 hour ago', unread: true },
    { id: 3, message: 'Payment processed successfully', time: '3 hours ago', unread: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Fetch dashboard data when authenticated
    if (isAuthenticated) {
      const fetchData = async () => {
        // Simulate API call - replace with real API calls
        // Reduced delay for better user experience
        await new Promise(resolve => setTimeout(resolve, 100));
        setData(generateMockData());
      };

      fetchData();
      
      // Auto-refresh disabled for now
      // const interval = setInterval(fetchData, 30000);
      // return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setUserDropdownOpen(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setActiveSection('dashboard');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardPage data={data} />;
      case 'car-controls':
        return <CarControlsPage />;
      case 'fleet-management':
        return <FleetManagementPage />;
      case 'vehicle-management':
        return <VehicleManagementPage />;
      case 'bookings':
        return <BookingsPage />;
      case 'parking-proofs':
        return <ParkingProofsPage />;
      case 'customers':
        return <CustomersPage />;
      case 'user-management':
        return <UserManagementPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'push-notifications':
        return <PushNotificationPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {activeSection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h3>
              <p className="text-gray-500">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        pendingProofsCount={data?.pendingProofsCount || 0}
        onLogout={handleLogout}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-200">
          <div className="px-4 sm:px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileOpen(true)}
                >
                  <Menu size={18} className="text-gray-600" />
                </button>
                
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    {activeSection === 'dashboard' ? 'Dashboard' : 
                     activeSection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">
                    {activeSection === 'dashboard' ? 'Car Rental Management' : 
                     `Manage ${activeSection.replace('-', ' ')}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <div className="relative dropdown-container">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Bell size={18} />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications.filter(n => n.unread).length}
                      </span>
                    )}
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-l-2 ${notification.unread ? 'border-l-blue-500 bg-blue-50/30 dark:bg-blue-900/20' : 'border-l-transparent'}`}>
                            <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
                        <button
                          onClick={() => setActiveSection('notifications')}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                        >
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Dropdown */}
                <div className="relative dropdown-container">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User size={14} className="text-white" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.profile?.firstName ? `${user.profile.firstName} ${user.profile.lastName}` : user?.email || 'User'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || 'User'}</p>
                    </div>
                    <ChevronDown size={14} className={`transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User size={18} className="text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.profile?.firstName ? `${user.profile.firstName} ${user.profile.lastName}` : user?.email || 'User'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setActiveSection('user-management');
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <User size={16} className="text-gray-400 dark:text-gray-500" />
                          <span>Profile Settings</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setActiveSection('settings');
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Settings size={16} className="text-gray-400 dark:text-gray-500" />
                          <span>Settings</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-1">
                        <button
                          onClick={() => {
                            handleLogout();
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <LogOut size={16} className="text-red-500 dark:text-red-400" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Date/Time - Compact */}
                <div className="hidden lg:block text-right">
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    {new Date().toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date().toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-12">
          <div className="px-4 sm:px-6 py-4">
            <div className="text-center text-sm text-gray-500">
              <p>&copy; 2024 LezGo Car Rental. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Root App Component with Providers
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
