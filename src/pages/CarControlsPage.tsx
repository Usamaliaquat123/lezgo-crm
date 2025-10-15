import React, { useState } from 'react';
import { Car, MapPin } from 'lucide-react';

const CarControlsPage: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<string | null>('car1');

  const cars = [
    { id: 'car1', name: 'Mitsubishi ASX', plate: 'U47449', status: 'rented', location: 'Dubai Marina', fuel: 85, battery: 100, locked: false },
    { id: 'car2', name: 'Toyota RAV4', plate: 'U47450', status: 'rented', location: 'Downtown Dubai', fuel: 60, battery: 100, locked: true },
    { id: 'car3', name: 'Honda Civic', plate: 'U47451', status: 'available', location: 'Jumeirah', fuel: 100, battery: 100, locked: true },
    { id: 'car4', name: 'Tesla Model 3', plate: 'U47452', status: 'rented', location: 'Deira', fuel: 45, battery: 75, locked: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Car className="text-gray-600 dark:text-gray-400" size={32} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Car Controls</h2>
          <p className="text-gray-600 dark:text-gray-400">Remote control and monitoring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Car List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Vehicles</h3>
            <div className="space-y-2">
              {cars.map((car) => (
                <button
                  key={car.id}
                  onClick={() => setSelectedCar(car.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedCar === car.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{car.name}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      car.status === 'rented'
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {car.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin size={14} className="mr-1" />
                    {car.location}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Car Controls */}
        <div className="lg:col-span-2">
          {selectedCar ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
              <Car className="mx-auto text-blue-600 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Vehicle Controls</h3>
              <p className="text-gray-600 dark:text-gray-400">Car ID: {selectedCar}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">Remote control features coming soon</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
              <Car className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400">Select a vehicle to control</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarControlsPage;

