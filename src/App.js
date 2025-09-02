import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, Car, TrendingUp, Users, MapPin } from 'lucide-react';
import StatCard from './components/StatCard';
import SalesChart from './components/SalesChart';
import CarsOverview from './components/CarsOverview';

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
    }
  };
};

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LezGo Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Car Rental Management System</p>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Today's Rides"
            value={data.rides.today}
            previousValue={data.rides.yesterday}
            icon={Car}
            trend={true}
            color="blue"
          />
          <StatCard
            title="Yesterday's Rides"
            value={data.rides.yesterday}
            icon={Calendar}
            color="gray"
          />
          <StatCard
            title="Today's Earnings"
            value={`$${data.earnings.today.toLocaleString()}`}
            previousValue={data.earnings.yesterday}
            icon={DollarSign}
            trend={true}
            color="green"
          />
          <StatCard
            title="Yesterday's Earnings"
            value={`$${data.earnings.yesterday.toLocaleString()}`}
            icon={TrendingUp}
            color="purple"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Today's Customers"
            value={data.customers.today}
            previousValue={data.customers.yesterday}
            icon={Users}
            trend={true}
            color="orange"
          />
          <StatCard
            title="Active Locations"
            value={`${data.locations.active}/${data.locations.total}`}
            icon={MapPin}
            color="red"
          />
          <StatCard
            title="Fleet Utilization"
            value={`${Math.round((data.cars.rented / data.cars.total) * 100)}%`}
            icon={Car}
            color="blue"
          />
          <StatCard
            title="Average per Ride"
            value={`$${Math.round(data.earnings.today / data.rides.today)}`}
            icon={DollarSign}
            color="green"
          />
        </div>

        {/* Charts and Fleet Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2">
            <SalesChart 
              data={data.salesData} 
              title="Sales Comparison (Today vs Yesterday)"
              type="line"
            />
          </div>
          
          {/* Cars Overview */}
          <div>
            <CarsOverview carsData={data.cars} />
          </div>
        </div>

        {/* Additional Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesChart 
            data={data.salesData.filter((_, index) => index % 2 === 0)} 
            title="Hourly Revenue Distribution"
            type="bar"
          />
          
          {/* Quick Actions */}
          <div className="chart-container">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <div className="flex items-center">
                  <Car className="text-blue-600 mr-3 group-hover:scale-110 transition-transform" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Add New Booking</p>
                    <p className="text-sm text-gray-500">Create a new car rental booking</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group">
                <div className="flex items-center">
                  <Users className="text-green-600 mr-3 group-hover:scale-110 transition-transform" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Manage Customers</p>
                    <p className="text-sm text-gray-500">View and edit customer information</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
                <div className="flex items-center">
                  <TrendingUp className="text-purple-600 mr-3 group-hover:scale-110 transition-transform" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">View Reports</p>
                    <p className="text-sm text-gray-500">Generate detailed analytics reports</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; 2024 LezGo Car Rental. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
