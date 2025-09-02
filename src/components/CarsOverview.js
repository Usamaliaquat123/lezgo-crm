import React from 'react';
import { Car, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const CarsOverview = ({ carsData }) => {
  const { total, available, rented, maintenance } = carsData;
  
  const statusCards = [
    {
      label: 'Total Cars',
      value: total,
      icon: Car,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: 'Available',
      value: available,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      label: 'Currently Rented',
      value: rented,
      icon: Clock,
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      label: 'In Maintenance',
      value: maintenance,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  const availabilityPercentage = ((available / total) * 100).toFixed(1);

  return (
    <div className="chart-container animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Fleet Overview</h3>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-green-600">{availabilityPercentage}%</span> availability
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {statusCards.map((card, index) => (
          <div key={index} className="flex items-center p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
            <div className={`p-2 rounded-lg ${card.bgColor} mr-3`}>
              <card.icon size={16} className={card.textColor} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{card.label}</p>
              <p className="text-lg font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bars for visual representation */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Available</span>
            <span>{available}/{total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(available / total) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Rented</span>
            <span>{rented}/{total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(rented / total) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Maintenance</span>
            <span>{maintenance}/{total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(maintenance / total) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsOverview;
