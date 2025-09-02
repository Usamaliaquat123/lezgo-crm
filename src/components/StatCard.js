import React from 'react';

const StatCard = ({ title, value, previousValue, icon: Icon, trend, color = 'blue' }) => {
  const trendPercentage = previousValue ? ((value - previousValue) / previousValue * 100).toFixed(1) : 0;
  const isPositive = trendPercentage >= 0;
  
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    purple: 'text-purple-600 bg-purple-50',
    orange: 'text-orange-600 bg-orange-50',
    red: 'text-red-600 bg-red-50'
  };

  return (
    <div className="stat-card card-hover animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '↗' : '↘'} {Math.abs(trendPercentage)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs yesterday</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
