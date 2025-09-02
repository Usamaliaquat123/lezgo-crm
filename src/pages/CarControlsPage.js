import React from 'react';
import { Car, Power, Lock, Unlock, MapPin, Battery, Fuel, Settings } from 'lucide-react';

const CarControlsPage = () => {
  const cars = [
    { id: 1, model: 'Mitsubishi ASX', plate: 'U47449', status: 'available', battery: 85, location: 'Dubai Marina' },
    { id: 2, model: 'Toyota RAV4', plate: 'U47450', status: 'available', battery: 92, location: 'Downtown Dubai' },
    { id: 3, model: 'Honda Civic', plate: 'U47451', status: 'rented', battery: 25, location: 'Jumeirah' },
    { id: 4, model: 'Tesla Model 3', plate: 'U47452', status: 'available', battery: 78, location: 'Deira' },
    { id: 5, model: 'BMW X3', plate: 'U47453', status: 'available', battery: 45, location: 'Bur Dubai' },
    { id: 6, model: 'Nissan Leaf', plate: 'U47454', status: 'available', battery: 67, location: 'Al Barsha' },
    { id: 7, model: 'Mercedes C-Class', plate: 'U47455', status: 'rented', battery: 15, location: 'Business Bay' },
    { id: 8, model: 'Audi Q5', plate: 'U47456', status: 'available', battery: 89, location: 'JLT' }
  ];

  const handleCarAction = (carId, action) => {
    console.log(`Performing ${action} on car ${carId}`);
    // Here you would typically make an API call to perform the action
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Car Controls</h2>
          <p className="text-gray-600">Remote control and monitoring of your fleet</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Settings size={16} />
          <span>Refresh All</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option value="all">All Cars</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Location:</label>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option value="all">All Locations</option>
              <option value="dubai-marina">Dubai Marina</option>
              <option value="downtown">Downtown Dubai</option>
              <option value="jumeirah">Jumeirah</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
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

            {/* Car Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Battery size={16} className={`${
                    car.battery > 50 ? 'text-green-500' : 
                    car.battery > 25 ? 'text-yellow-500' : 'text-red-500'
                  }`} />
                  <span className="text-sm text-gray-600">Battery/Fuel</span>
                </div>
                <span className="text-sm font-medium">{car.battery}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    car.battery > 50 ? 'bg-green-500' : 
                    car.battery > 25 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${car.battery}%` }}
                ></div>
              </div>

              <div className="flex items-center space-x-2 mt-3">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">{car.location}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleCarAction(car.id, 'unlock')}
                className="flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                disabled={car.status === 'rented'}
              >
                <Unlock size={16} />
                <span className="text-sm font-medium">Unlock</span>
              </button>
              
              <button 
                onClick={() => handleCarAction(car.id, 'lock')}
                className="flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Lock size={16} />
                <span className="text-sm font-medium">Lock</span>
              </button>
              
              <button 
                onClick={() => handleCarAction(car.id, 'start')}
                className="flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                disabled={car.status === 'rented'}
              >
                <Power size={16} />
                <span className="text-sm font-medium">Start</span>
              </button>
              
              <button 
                onClick={() => handleCarAction(car.id, 'configure')}
                className="flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Settings size={16} />
                <span className="text-sm font-medium">Config</span>
              </button>
            </div>

            {/* Last Activity */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Last activity: {new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarControlsPage;
