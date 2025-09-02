import React from 'react';
import { UserPlus, Users, Calendar, TrendingUp, Clock } from 'lucide-react';

const UserTracker = ({ userData }) => {
  const {
    newUsersToday,
    newUsersYesterday,
    totalUsers,
    bookingsToday,
    bookingsYesterday,
    totalBookings,
    activeUsers
  } = userData;

  const userGrowthPercentage = newUsersYesterday ? 
    ((newUsersToday - newUsersYesterday) / newUsersYesterday * 100).toFixed(1) : 0;
  const bookingGrowthPercentage = bookingsYesterday ? 
    ((bookingsToday - bookingsYesterday) / bookingsYesterday * 100).toFixed(1) : 0;

  const isUserGrowthPositive = userGrowthPercentage >= 0;
  const isBookingGrowthPositive = bookingGrowthPercentage >= 0;

  const stats = [
    {
      title: 'New Users Today',
      value: newUsersToday,
      previousValue: newUsersYesterday,
      icon: UserPlus,
      color: 'blue',
      trend: userGrowthPercentage,
      isPositive: isUserGrowthPositive
    },
    {
      title: 'Bookings Today',
      value: bookingsToday,
      previousValue: bookingsYesterday,
      icon: Calendar,
      color: 'green',
      trend: bookingGrowthPercentage,
      isPositive: isBookingGrowthPositive
    },
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'purple',
      description: 'All registered users'
    },
    {
      title: 'Active Users',
      value: activeUsers,
      icon: Clock,
      color: 'orange',
      description: 'Users active this week'
    }
  ];

  return (
    <div className="chart-container animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">User Analytics</h3>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-blue-600">{((activeUsers / totalUsers) * 100).toFixed(1)}%</span> engagement rate
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                stat.color === 'green' ? 'bg-green-50 text-green-600' :
                stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                'bg-orange-50 text-orange-600'
              }`}>
                <stat.icon size={16} />
              </div>
              {stat.trend !== undefined && (
                <span className={`text-xs font-medium ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isPositive ? '↗' : '↘'} {Math.abs(stat.trend)}%
                </span>
              )}
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 font-medium">{stat.title}</p>
              {stat.description && (
                <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
              )}
              {stat.previousValue && (
                <p className="text-xs text-gray-400 mt-1">
                  Yesterday: {stat.previousValue}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* User Activity Timeline */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700">Recent Activity</h4>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <UserPlus className="text-blue-600 mr-3" size={16} />
              <div>
                <p className="text-sm font-medium text-blue-900">New Registrations</p>
                <p className="text-xs text-blue-600">Last hour: 3 users</p>
              </div>
            </div>
            <span className="text-sm font-bold text-blue-600">{newUsersToday}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <Calendar className="text-green-600 mr-3" size={16} />
              <div>
                <p className="text-sm font-medium text-green-900">Bookings Made</p>
                <p className="text-xs text-green-600">Last hour: {Math.floor(bookingsToday / 8)} bookings</p>
              </div>
            </div>
            <span className="text-sm font-bold text-green-600">{bookingsToday}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="text-purple-600 mr-3" size={16} />
              <div>
                <p className="text-sm font-medium text-purple-900">Conversion Rate</p>
                <p className="text-xs text-purple-600">Users to bookings</p>
              </div>
            </div>
            <span className="text-sm font-bold text-purple-600">
              {((bookingsToday / newUsersToday) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="mt-4 space-y-2">
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Daily User Target</span>
            <span>{newUsersToday}/50</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((newUsersToday / 50) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Daily Booking Target</span>
            <span>{bookingsToday}/30</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((bookingsToday / 30) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTracker;
