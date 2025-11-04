import React from 'react';
import { UserPlus, Users, Calendar, TrendingUp, Clock } from 'lucide-react';

interface UserData {
  newUsersToday: number;
  newUsersYesterday: number;
  totalUsers: number;
  bookingsToday: number;
  bookingsYesterday: number;
  totalBookings: number;
  activeUsers: number;
}

interface UserTrackerProps {
  userData: UserData;
}

interface Stat {
  title: string;
  value: number;
  previousValue?: number;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'purple' | 'orange';
  trend?: number;
  isPositive?: boolean;
  description?: string;
}

const UserTracker: React.FC<UserTrackerProps> = ({ userData }) => {
  const {
    newUsersToday,
    newUsersYesterday,
    totalUsers,
    bookingsToday,
    bookingsYesterday,
    activeUsers
  } = userData;

  const userGrowthPercentage = newUsersYesterday ? 
    ((newUsersToday - newUsersYesterday) / newUsersYesterday * 100).toFixed(1) : 0;
  const bookingGrowthPercentage = bookingsYesterday ? 
    ((bookingsToday - bookingsYesterday) / bookingsYesterday * 100).toFixed(1) : 0;

  const isUserGrowthPositive = Number(userGrowthPercentage) >= 0;
  const isBookingGrowthPositive = Number(bookingGrowthPercentage) >= 0;

  const stats: Stat[] = [
    {
      title: 'New Users Today',
      value: newUsersToday,
      previousValue: newUsersYesterday,
      icon: UserPlus,
      color: 'blue',
      trend: Number(userGrowthPercentage),
      isPositive: isUserGrowthPositive
    },
    {
      title: 'Bookings Today',
      value: bookingsToday,
      previousValue: bookingsYesterday,
      icon: Calendar,
      color: 'green',
      trend: Number(bookingGrowthPercentage),
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Analytics</h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-blue-600 dark:text-blue-400">{((activeUsers / totalUsers) * 100).toFixed(1)}%</span> engagement rate
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                stat.color === 'green' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                stat.color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' :
                'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
              }`}>
                <stat.icon size={16} />
              </div>
              {stat.trend !== undefined && (
                <span className={`text-xs font-medium ${
                  stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.isPositive ? '↗' : '↘'} {Math.abs(stat.trend)}%
                </span>
              )}
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.title}</p>
              {stat.description && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.description}</p>
              )}
              {stat.previousValue && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Yesterday: {stat.previousValue}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* User Activity Timeline */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recent Activity</h4>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center">
              <UserPlus className="text-blue-600 mr-3" size={16} />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">New Registrations</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Last hour: 3 users</p>
              </div>
            </div>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{newUsersToday}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center">
              <Calendar className="text-green-600 mr-3" size={16} />
              <div>
                <p className="text-sm font-medium text-green-900 dark:text-green-100">Bookings Made</p>
                <p className="text-xs text-green-600 dark:text-green-400">Last hour: {Math.floor(bookingsToday / 8)} bookings</p>
              </div>
            </div>
            <span className="text-sm font-bold text-green-600 dark:text-green-400">{bookingsToday}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="text-purple-600 mr-3" size={16} />
              <div>
                <p className="text-sm font-medium text-purple-900 dark:text-purple-100">Conversion Rate</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">Users to bookings</p>
              </div>
            </div>
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
              {newUsersToday > 0 ? ((bookingsToday / newUsersToday) * 100).toFixed(1) : '0.0'}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="mt-4 space-y-2">
        <div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Daily User Target</span>
            <span>{newUsersToday}/50</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((newUsersToday / 50) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Daily Booking Target</span>
            <span>{bookingsToday}/30</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
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




