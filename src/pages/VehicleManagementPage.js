import React, { useState } from 'react';
import { 
  Car, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  Battery, 
  Calendar, 
  DollarSign,
  X,
  Save,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Fuel
} from 'lucide-react';

const VehicleManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [isEditingVehicle, setIsEditingVehicle] = useState(false);
  const [notification, setNotification] = useState(null);

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      model: 'Mitsubishi ASX',
      plate: 'U47449',
      status: 'available',
      battery: 85,
      location: 'Dubai Marina',
      year: '2022',
      color: 'Silver',
      type: 'SUV',
      dailyRate: 150,
      mileage: 25000,
      lastService: '2024-01-15',
      insurance: '2024-12-31',
      registration: '2025-06-30',
      features: ['GPS', 'AC', 'Bluetooth', 'Backup Camera'],
      fuelType: 'Petrol',
      transmission: 'Automatic',
      seats: 5,
      addedDate: '2023-01-15',
      totalTrips: 124,
      totalRevenue: 18600
    },
    {
      id: 2,
      model: 'Toyota RAV4',
      plate: 'U47450',
      status: 'available',
      battery: 92,
      location: 'Downtown Dubai',
      year: '2023',
      color: 'White',
      type: 'SUV',
      dailyRate: 180,
      mileage: 15000,
      lastService: '2024-02-01',
      insurance: '2024-11-30',
      registration: '2025-05-15',
      features: ['GPS', 'AC', 'Bluetooth', 'Lane Assist', 'Cruise Control'],
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      seats: 5,
      addedDate: '2023-03-10',
      totalTrips: 156,
      totalRevenue: 28080
    },
    {
      id: 3,
      model: 'Honda Civic',
      plate: 'U47451',
      status: 'rented',
      battery: 25,
      location: 'Jumeirah',
      year: '2021',
      color: 'Black',
      type: 'Sedan',
      dailyRate: 120,
      mileage: 45000,
      lastService: '2024-01-20',
      insurance: '2024-10-31',
      registration: '2025-04-20',
      features: ['GPS', 'AC', 'Bluetooth'],
      fuelType: 'Petrol',
      transmission: 'Manual',
      seats: 5,
      addedDate: '2022-08-05',
      totalTrips: 203,
      totalRevenue: 24360
    },
    {
      id: 4,
      model: 'Tesla Model 3',
      plate: 'U47452',
      status: 'available',
      battery: 78,
      location: 'Deira',
      year: '2023',
      color: 'Blue',
      type: 'Sedan',
      dailyRate: 220,
      mileage: 8000,
      lastService: '2024-02-10',
      insurance: '2024-12-15',
      registration: '2025-07-10',
      features: ['GPS', 'AC', 'Bluetooth', 'Autopilot', 'Premium Audio'],
      fuelType: 'Electric',
      transmission: 'Automatic',
      seats: 5,
      addedDate: '2023-05-20',
      totalTrips: 89,
      totalRevenue: 19580
    },
    {
      id: 5,
      model: 'BMW X3',
      plate: 'U47453',
      status: 'maintenance',
      battery: 45,
      location: 'Bur Dubai',
      year: '2022',
      color: 'Gray',
      type: 'SUV',
      dailyRate: 200,
      mileage: 32000,
      lastService: '2024-02-15',
      insurance: '2024-11-20',
      registration: '2025-03-25',
      features: ['GPS', 'AC', 'Bluetooth', 'Panoramic Roof', 'Heated Seats'],
      fuelType: 'Petrol',
      transmission: 'Automatic',
      seats: 5,
      addedDate: '2022-12-08',
      totalTrips: 167,
      totalRevenue: 33400
    },
    {
      id: 6,
      model: 'Nissan Leaf',
      plate: 'U47454',
      status: 'available',
      battery: 67,
      location: 'Al Barsha',
      year: '2023',
      color: 'Green',
      type: 'Hatchback',
      dailyRate: 160,
      mileage: 12000,
      lastService: '2024-01-30',
      insurance: '2024-12-10',
      registration: '2025-08-15',
      features: ['GPS', 'AC', 'Bluetooth', 'Eco Mode'],
      fuelType: 'Electric',
      transmission: 'Automatic',
      seats: 5,
      addedDate: '2023-04-12',
      totalTrips: 98,
      totalRevenue: 15680
    },
    {
      id: 7,
      model: 'Mercedes C-Class',
      plate: 'U47455',
      status: 'rented',
      battery: 15,
      location: 'Business Bay',
      year: '2022',
      color: 'Red',
      type: 'Sedan',
      dailyRate: 250,
      mileage: 28000,
      lastService: '2024-02-05',
      insurance: '2024-12-25',
      registration: '2025-09-10',
      features: ['GPS', 'AC', 'Bluetooth', 'Premium Audio', 'Massage Seats'],
      fuelType: 'Petrol',
      transmission: 'Automatic',
      seats: 5,
      addedDate: '2022-11-15',
      totalTrips: 142,
      totalRevenue: 35500
    },
    {
      id: 8,
      model: 'Audi Q5',
      plate: 'U47456',
      status: 'discharged',
      battery: 9,
      location: 'JLT',
      year: '2023',
      color: 'Black',
      type: 'SUV',
      dailyRate: 210,
      mileage: 18000,
      lastService: '2024-01-25',
      insurance: '2024-11-15',
      registration: '2025-05-30',
      features: ['GPS', 'AC', 'Bluetooth', 'Quattro AWD', 'Virtual Cockpit'],
      fuelType: 'Petrol',
      transmission: 'Automatic',
      seats: 5,
      addedDate: '2023-02-28',
      totalTrips: 76,
      totalRevenue: 15960
    }
  ]);

  // Filter vehicles based on search and filters
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.color.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || vehicle.location === locationFilter;
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Get status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'rented':
        return 'bg-orange-100 text-orange-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'discharged':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return <CheckCircle size={14} className="text-green-600" />;
      case 'rented':
        return <Clock size={14} className="text-orange-600" />;
      case 'maintenance':
        return <AlertCircle size={14} className="text-yellow-600" />;
      case 'discharged':
        return <Battery size={14} className="text-red-600" />;
      default:
        return <Clock size={14} className="text-gray-600" />;
    }
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Handle add vehicle
  const handleAddVehicle = (vehicleData) => {
    const newVehicle = {
      ...vehicleData,
      id: vehicles.length + 1,
      addedDate: new Date().toISOString().split('T')[0],
      totalTrips: 0,
      totalRevenue: 0
    };
    setVehicles([...vehicles, newVehicle]);
    setIsAddingVehicle(false);
    showNotification(`${newVehicle.model} (${newVehicle.plate}) has been added to the fleet`, 'success');
  };

  // Handle edit vehicle
  const handleEditVehicle = (vehicleData) => {
    setVehicles(vehicles.map(v => v.id === vehicleData.id ? vehicleData : v));
    setIsEditingVehicle(false);
    setSelectedVehicle(null);
    showNotification(`${vehicleData.model} (${vehicleData.plate}) has been updated`, 'success');
  };

  // Handle remove vehicle
  const handleRemoveVehicle = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    setVehicles(vehicles.filter(v => v.id !== vehicleId));
    setSelectedVehicle(null);
    showNotification(`${vehicle.model} (${vehicle.plate}) has been removed from the fleet`, 'error');
  };

  // Get unique locations for filter
  const uniqueLocations = [...new Set(vehicles.map(v => v.location))];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Vehicle Management</h2>
          <p className="text-sm text-gray-600">Manage fleet vehicles and track performance</p>
        </div>
        <button 
          onClick={() => setIsAddingVehicle(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus size={14} />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Total Vehicles</p>
              <p className="text-xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Car className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Available</p>
              <p className="text-xl font-bold text-green-600">
                {vehicles.filter(v => v.status === 'available').length}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Rented</p>
              <p className="text-xl font-bold text-orange-600">
                {vehicles.filter(v => v.status === 'rented').length}
              </p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="text-orange-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Revenue</p>
              <p className="text-xl font-bold text-gray-900">
                ${Math.round(vehicles.reduce((sum, v) => sum + v.totalRevenue, 0) / 1000)}k
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter size={14} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
              <option value="discharged">Discharged</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-2 px-3 font-medium text-gray-900 text-sm">Vehicle</th>
                <th className="text-left py-2 px-3 font-medium text-gray-900 text-sm">Status</th>
                <th className="text-left py-2 px-3 font-medium text-gray-900 text-sm">Location</th>
                <th className="text-left py-2 px-3 font-medium text-gray-900 text-sm">Fuel</th>
                <th className="text-left py-2 px-3 font-medium text-gray-900 text-sm">Rate</th>
                <th className="text-left py-2 px-3 font-medium text-gray-900 text-sm">Revenue</th>
                <th className="text-left py-2 px-3 font-medium text-gray-900 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-blue-100 rounded">
                        <Car className="text-blue-600" size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm line-clamp-1">{vehicle.model}</p>
                        <p className="text-xs text-gray-500">{vehicle.plate} • {vehicle.year}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(vehicle.status)}
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusStyle(vehicle.status)}`}>
                        {vehicle.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center space-x-1">
                      <MapPin size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-900 line-clamp-1">{vehicle.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center space-x-1">
                      {vehicle.fuelType === 'Electric' ? (
                        <Battery size={12} className={`${
                          vehicle.battery < 12 ? 'text-red-600' :
                          vehicle.battery > 50 ? 'text-green-500' : 
                          vehicle.battery > 25 ? 'text-yellow-500' : 'text-red-500'
                        }`} />
                      ) : (
                        <Fuel size={12} className={`${
                          vehicle.battery < 12 ? 'text-red-600' :
                          vehicle.battery > 50 ? 'text-green-500' : 
                          vehicle.battery > 25 ? 'text-yellow-500' : 'text-red-500'
                        }`} />
                      )}
                      <span className="text-xs text-gray-900">{vehicle.battery}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs font-medium text-gray-900">${vehicle.dailyRate}</span>
                  </td>
                  <td className="py-3 px-3">
                    <div>
                      <p className="text-xs font-medium text-gray-900">${Math.round(vehicle.totalRevenue / 1000)}k</p>
                      <p className="text-xs text-gray-500">{vehicle.totalTrips} trips</p>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setIsEditingVehicle(true);
                        }}
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleRemoveVehicle(vehicle.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-8">
            <Car className="mx-auto text-gray-400 mb-3" size={32} />
            <p className="text-gray-500 text-sm">No vehicles found</p>
          </div>
        )}
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && !isEditingVehicle && (
        <VehicleDetailModal 
          vehicle={selectedVehicle} 
          onClose={() => setSelectedVehicle(null)}
          onEdit={() => setIsEditingVehicle(true)}
          onRemove={() => handleRemoveVehicle(selectedVehicle.id)}
        />
      )}

      {/* Add Vehicle Modal */}
      {isAddingVehicle && (
        <VehicleFormModal
          title="Add New Vehicle"
          onSave={handleAddVehicle}
          onCancel={() => setIsAddingVehicle(false)}
        />
      )}

      {/* Edit Vehicle Modal */}
      {isEditingVehicle && selectedVehicle && (
        <VehicleFormModal
          title="Edit Vehicle"
          vehicle={selectedVehicle}
          onSave={handleEditVehicle}
          onCancel={() => {
            setIsEditingVehicle(false);
            setSelectedVehicle(null);
          }}
        />
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`rounded-lg shadow-xl border p-3 max-w-sm ${
            notification.type === 'success' ? 'bg-green-50 border-green-200' :
            notification.type === 'error' ? 'bg-red-50 border-red-200' :
            'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0">
                {notification.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                {notification.type === 'error' && <X className="h-4 w-4 text-red-600" />}
              </div>
              <p className={`text-xs ${
                notification.type === 'success' ? 'text-green-700' :
                notification.type === 'error' ? 'text-red-700' :
                'text-blue-700'
              }`}>
                {notification.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Vehicle Detail Modal Component
const VehicleDetailModal = ({ vehicle, onClose, onEdit, onRemove }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Car className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{vehicle.model}</h3>
                <p className="text-sm text-gray-600">{vehicle.plate} • {vehicle.year} • {vehicle.color}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={onEdit}
                className="flex items-center space-x-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
              >
                <Edit size={14} />
                <span>Edit</span>
              </button>
              <button
                onClick={onRemove}
                className="flex items-center space-x-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
              >
                <Trash2 size={14} />
                <span>Remove</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Basic Info */}
            <div className="lg:col-span-2 space-y-4">
              {/* Status and Performance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <CheckCircle size={14} className="text-blue-600" />
                    <p className="text-xs font-medium text-gray-700">Status</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 capitalize">{vehicle.status}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <DollarSign size={14} className="text-green-600" />
                    <p className="text-xs font-medium text-gray-700">Daily Rate</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">${vehicle.dailyRate}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Battery size={14} className="text-orange-600" />
                    <p className="text-xs font-medium text-gray-700">Fuel/Battery</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{vehicle.battery}%</p>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Vehicle Details</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-600">Type</p>
                    <p className="text-sm font-medium text-gray-900">{vehicle.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Transmission</p>
                    <p className="text-sm font-medium text-gray-900">{vehicle.transmission}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Fuel Type</p>
                    <p className="text-sm font-medium text-gray-900">{vehicle.fuelType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Seats</p>
                    <p className="text-sm font-medium text-gray-900">{vehicle.seats}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Mileage</p>
                    <p className="text-sm font-medium text-gray-900">{Math.round(vehicle.mileage / 1000)}k km</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="text-sm font-medium text-gray-900">{vehicle.location}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Features</h4>
                <div className="flex flex-wrap gap-1">
                  {vehicle.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service History */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Service & Documents</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-gray-600">Last Service</p>
                    <p className="text-sm font-medium text-gray-900">{vehicle.lastService}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Insurance Expiry</p>
                    <p className="text-sm font-medium text-gray-900">{vehicle.insurance}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Registration Expiry</p>
                    <p className="text-sm font-medium text-gray-900">{vehicle.registration}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Performance</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600">Total Trips</p>
                    <p className="text-lg font-bold text-blue-600">{vehicle.totalTrips}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Total Revenue</p>
                    <p className="text-lg font-bold text-green-600">${Math.round(vehicle.totalRevenue / 1000)}k</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Avg Revenue/Trip</p>
                    <p className="text-sm font-semibold text-gray-900">
                      ${vehicle.totalTrips > 0 ? Math.round(vehicle.totalRevenue / vehicle.totalTrips) : 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Added to Fleet</p>
                    <p className="text-xs font-medium text-gray-900">{vehicle.addedDate}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <MapPin size={14} />
                    <span>Track Location</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    <Calendar size={14} />
                    <span>Schedule Service</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    <Upload size={14} />
                    <span>Upload Documents</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Vehicle Form Modal Component
const VehicleFormModal = ({ title, vehicle, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    model: vehicle?.model || '',
    plate: vehicle?.plate || '',
    year: vehicle?.year || new Date().getFullYear().toString(),
    color: vehicle?.color || 'White',
    type: vehicle?.type || 'Sedan',
    dailyRate: vehicle?.dailyRate || 150,
    location: vehicle?.location || 'Dubai Marina',
    battery: vehicle?.battery || 100,
    status: vehicle?.status || 'available',
    mileage: vehicle?.mileage || 0,
    lastService: vehicle?.lastService || new Date().toISOString().split('T')[0],
    insurance: vehicle?.insurance || '',
    registration: vehicle?.registration || '',
    fuelType: vehicle?.fuelType || 'Petrol',
    transmission: vehicle?.transmission || 'Automatic',
    seats: vehicle?.seats || 5,
    features: vehicle?.features || ['GPS', 'AC', 'Bluetooth']
  });

  const [featuresInput, setFeaturesInput] = useState(formData.features.join(', '));

  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicleData = {
      ...formData,
      features: featuresInput.split(',').map(f => f.trim()).filter(f => f),
      dailyRate: Number(formData.dailyRate),
      battery: Number(formData.battery),
      mileage: Number(formData.mileage),
      seats: Number(formData.seats)
    };

    if (vehicle) {
      vehicleData.id = vehicle.id;
      vehicleData.addedDate = vehicle.addedDate;
      vehicleData.totalTrips = vehicle.totalTrips;
      vehicleData.totalRevenue = vehicle.totalRevenue;
    }

    onSave(vehicleData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <button
              onClick={onCancel}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Car Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Plate Number</label>
                <input
                  type="text"
                  name="plate"
                  value={formData.plate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  name="year"
                  min="2000"
                  max="2030"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="White">White</option>
                  <option value="Black">Black</option>
                  <option value="Silver">Silver</option>
                  <option value="Gray">Gray</option>
                  <option value="Blue">Blue</option>
                  <option value="Red">Red</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Pickup">Pickup</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Daily Rate ($)</label>
                <input
                  type="number"
                  name="dailyRate"
                  min="50"
                  max="1000"
                  value={formData.dailyRate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
              </div>
            </div>

            {/* Technical Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Fuel Type</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Transmission</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Seats</label>
                <select
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
            </div>

            {/* Status and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="Dubai Marina">Dubai Marina</option>
                  <option value="Downtown Dubai">Downtown Dubai</option>
                  <option value="Jumeirah">Jumeirah</option>
                  <option value="Deira">Deira</option>
                  <option value="Bur Dubai">Bur Dubai</option>
                  <option value="Al Barsha">Al Barsha</option>
                  <option value="Business Bay">Business Bay</option>
                  <option value="JLT">JLT</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            {/* Maintenance and Documents */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Mileage (km)</label>
                <input
                  type="number"
                  name="mileage"
                  min="0"
                  value={formData.mileage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Insurance Expiry</label>
                <input
                  type="date"
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Registration Expiry</label>
                <input
                  type="date"
                  name="registration"
                  value={formData.registration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Battery/Fuel Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.fuelType === 'Electric' ? 'Battery' : 'Fuel'} Level: {formData.battery}%
              </label>
              <input
                type="range"
                name="battery"
                min="0"
                max="100"
                value={formData.battery}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma-separated)</label>
              <input
                type="text"
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="GPS, AC, Bluetooth, Cruise Control"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Enter features separated by commas</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Save size={14} />
                <span>{vehicle ? 'Update' : 'Add Vehicle'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleManagementPage;
