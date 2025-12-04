import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  previousValue?: number;
  icon: LucideIcon;
  trend?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  previousValue, 
  icon: Icon, 
  trend = false, 
  color = 'blue' 
}) => {
  const trendPercentage = previousValue ? ((Number(value) - previousValue) / previousValue * 100).toFixed(1) : 0;
  const isPositive = Number(trendPercentage) >= 0;

  const colorClasses: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
    green: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
    orange: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20',
    red: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  };

  return (
    <div className="stat-card card-hover animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium ${
                  isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {isPositive ? '↗' : '↘'} {Math.abs(Number(trendPercentage))}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs yesterday</span>
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















