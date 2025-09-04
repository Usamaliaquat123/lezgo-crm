import React from 'react';
import { Calendar, DollarSign, Car, TrendingUp, Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import StatCard from '../components/StatCard';
import SalesChart from '../components/SalesChart';
import CarsOverview from '../components/CarsOverview';
import CarMap from '../components/CarMap';
import UserTracker from '../components/UserTracker';

const DashboardPage = ({ data }) => {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="New Users Today"
          value={data.users.newUsersToday}
          previousValue={data.users.newUsersYesterday}
          icon={Users}
          trend={true}
          color="blue"
        />
        <StatCard
          title="Bookings Today"
          value={data.users.bookingsToday}
          previousValue={data.users.bookingsYesterday}
          icon={Calendar}
          trend={true}
          color="green"
        />
        <StatCard
          title="Fleet Utilization"
          value={`${Math.round((data.cars.rented / data.cars.total) * 100)}%`}
          icon={Car}
          color="orange"
        />
        <StatCard
          title="Average per Ride"
          value={`$${Math.round(data.earnings.today / data.rides.today)}`}
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Sales Chart and Fleet Map Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Rides Chart */}
        <div>
          <SalesChart 
            data={data.ridesData} 
            title="Rides Comparison (Today vs Yesterday)"
            type="line"
            dataType="rides"
          />
        </div>
        
        {/* Car Map */}
        <div>
          <CarMap />
        </div>
      </div>

      {/* Fleet Overview and User Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Cars Overview */}
        <div>
          <CarsOverview carsData={data.cars} />
        </div>
        
        {/* User Tracker */}
        <div>
          <UserTracker userData={data.users} />
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1">
        <SalesChart 
          data={data.salesData.filter((_, index) => index % 2 === 0)} 
          title="Hourly Revenue Distribution"
          type="bar"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Fleet Status Overview */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Status Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="text-green-600 mr-3" size={20} />
                <span className="font-medium text-green-900">Available Cars</span>
              </div>
              <span className="text-xl font-bold text-green-600">{data.cars.available}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center">
                <Clock className="text-orange-600 mr-3" size={20} />
                <span className="font-medium text-orange-900">Active Rentals</span>
              </div>
              <span className="text-xl font-bold text-orange-600">{data.cars.rented}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="text-red-600 mr-3" size={20} />
                <span className="font-medium text-red-900">Under Maintenance</span>
              </div>
              <span className="text-xl font-bold text-red-600">{data.cars.maintenance}</span>
            </div>
          </div>
        </div>
        
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
    </div>
  );
};

export default DashboardPage;
