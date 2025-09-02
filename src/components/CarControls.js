import React from 'react';
import { Car, Power, Lock, Unlock, MapPin, Battery, Fuel, Settings } from 'lucide-react';

const CarControls = () => {
  const cars = [
    { id: 1, model: 'Mitsubishi ASX', plate: 'U47449', status: 'available', battery: 85 },
    { id: 2, model: 'Toyota RAV4', plate: 'U47450', status: 'available', battery: 92 },
    { id: 3, model: 'Honda Civic', plate: 'U47451', status: 'rented', battery: 25 },
    { id: 4, model: 'Tesla Model 3', plate: 'U47452', status: 'available', battery: 78 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Car Controls</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Refresh All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Car className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{car.model}</h3>
                  <p className="text-sm text-gray-500">{car.plate}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                car.status === 'available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {car.status}
              </span>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <Battery size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">{car.battery}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">Dubai Marina</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                <Unlock size={16} />
                <span className="text-sm font-medium">Unlock</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                <Lock size={16} />
                <span className="text-sm font-medium">Lock</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                <Power size={16} />
                <span className="text-sm font-medium">Start</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Settings size={16} />
                <span className="text-sm font-medium">Config</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarControls;
