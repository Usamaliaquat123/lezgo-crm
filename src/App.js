import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, Car, TrendingUp, Users, MapPin, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import CarControlsPage from './pages/CarControlsPage';
import FleetManagementPage from './pages/FleetManagementPage';
import BookingsPage from './pages/BookingsPage';
import CustomersPage from './pages/CustomersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PaymentsPage from './pages/PaymentsPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';

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
    }
  };
};



function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(generateMockData());
      setLoading(false);
    };

    fetchData();
    
    // Update data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardPage data={data} />;
      case 'car-controls':
        return <CarControlsPage />;
      case 'fleet-management':
        return <FleetManagementPage />;
      case 'bookings':
        return <BookingsPage />;
      case 'customers':
        return <CustomersPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'notifications':
        return <NotificationsPage />;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeSection === 'dashboard' ? 'Dashboard Overview' : 
                   activeSection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {activeSection === 'dashboard' ? 'Car Rental Management System' : 
                   `Manage your ${activeSection.replace('-', ' ')}`}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="px-6 py-4">
            <div className="text-center text-sm text-gray-500">
              <p>&copy; 2024 LezGo Car Rental. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
