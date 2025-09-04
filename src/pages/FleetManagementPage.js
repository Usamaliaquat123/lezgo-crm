import React from 'react';
import { MapPin, Car, Plus, Filter, Search, MoreVertical } from 'lucide-react';
import CarMap from '../components/CarMap';

const FleetManagementPage = () => {
  const fleetStats = [
    { label: 'Total Vehicles', value: 8, color: 'blue' },
    { label: 'Available', value: 6, color: 'green' },
    { label: 'In Use', value: 2, color: 'orange' },
    { label: 'Maintenance', value: 0, color: 'red' }
  ];

  const vehicles = [
    { id: 1, model: 'Mitsubishi ASX', plate: 'U47449', type: 'Sedan', status: 'available', location: 'Dubai Marina' },
    { id: 2, model: 'Toyota RAV4', plate: 'U47450', type: 'SUV', status: 'available', location: 'Downtown Dubai' },
    { id: 3, model: 'Honda Civic', plate: 'U47451', type: 'Hatchback', status: 'rented', location: 'Jumeirah' },
    { id: 4, model: 'Tesla Model 3', plate: 'U47452', type: 'Sedan', status: 'available', location: 'Deira' },
    { id: 5, model: 'BMW X3', plate: 'U47453', type: 'SUV', status: 'available', location: 'Bur Dubai' },
    { id: 6, model: 'Nissan Leaf', plate: 'U47454', type: 'Hatchback', status: 'available', location: 'Al Barsha' },
    { id: 7, model: 'Mercedes C-Class', plate: 'U47455', type: 'Sedan', status: 'rented', location: 'Business Bay' },
    { id: 8, model: 'Audi Q5', plate: 'U47456', type: 'SUV', status: 'available', location: 'JLT' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fleet Management</h2>
          <p className="text-gray-600">Monitor and manage your entire vehicle fleet</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Fleet Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {fleetStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'green' ? 'bg-green-100' :
                stat.color === 'orange' ? 'bg-orange-100' :
                'bg-red-100'
              }`}>
                <Car className={`${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'orange' ? 'text-orange-600' :
                  'text-red-600'
                }`} size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map and Vehicle List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Fleet Map */}
        <div>
          <CarMap />
        </div>

        {/* Vehicle List */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Vehicle List</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Filter size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Search size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Car className="text-gray-600" size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{vehicle.model}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{vehicle.plate}</span>
                        <span>•</span>
                        <span>{vehicle.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        vehicle.status === 'available' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {vehicle.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{vehicle.location}</p>
                    </div>
                    
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetManagementPage;
