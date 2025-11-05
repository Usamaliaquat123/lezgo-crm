import React, { useState, useEffect } from 'react';
import { Car, Plus, Search, Edit, Trash2, Eye, MapPin, Gauge, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { vehiclesAPI } from '../utils/crmAPI';

interface Vehicle {
  _id?: string;
  id?: string;
  vehicleNumber?: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: string;
  currentMileage?: number;
  mileage?: number;
  pricing?: {
    dailyRate: number;
  };
  dailyRate?: number;
  location: string;
  fuelLevel: number;
  category?: string;
  color?: string;
  doors?: number;
  seats?: number;
  fuelType?: string;
  fuelCapacity?: number;
  transmission?: string;
}

const VehicleManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<string>('');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Form state for new vehicle
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    category: 'Economy',
    color: '',
    doors: 4,
    seats: 5,
    status: 'Available',
    location: '',
    currentMileage: 0,
    fuelType: 'Gasoline',
    fuelCapacity: 50,
    fuelLevel: 100,
    transmission: 'Automatic',
    pricing: {
      dailyRate: 0
    }
  });

  // Check if current user is admin
  const isAdmin = user?.role === 'Super Admin' || user?.role === 'manager';

  // Mock admin users list
  const adminUsers = [
    { id: '1', name: 'Saood', role: 'admin' },
    { id: '2', name: 'Ahmed', role: 'admin' },
    { id: '3', name: 'Mohammed', role: 'admin' },
    { id: '4', name: 'Ali', role: 'manager' },
  ];

  // Fetch vehicles from API
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await vehiclesAPI.getVehicles({ limit: 100 });
      if (response.success && response.data) {
        // Transform backend data to match frontend interface
        const vehiclesData = (response.data as any).vehicles || [];
        const transformedVehicles = vehiclesData.map((vehicle: any) => ({
          id: vehicle._id || vehicle.id,
          vehicleNumber: vehicle.vehicleNumber,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          licensePlate: vehicle.licensePlate,
          status: vehicle.status?.toLowerCase() || 'available',
          mileage: vehicle.currentMileage || 0,
          dailyRate: vehicle.pricing?.dailyRate || 0,
          location: vehicle.location,
          fuelLevel: vehicle.fuelLevel || 100,
          category: vehicle.category,
          color: vehicle.color,
          transmission: vehicle.transmission,
          fuelType: vehicle.fuelType
        }));
        setVehicles(transformedVehicles);
      }
      setError('');
    } catch (err: any) {
      console.error('Error fetching vehicles:', err);
      setError(err.message || 'Failed to fetch vehicles');
      // Use mock data if API fails
      setVehicles([
        { id: 'V001', make: 'Toyota', model: 'Camry', year: 2023, licensePlate: 'U47449', status: 'rented', mileage: 15000, dailyRate: 75, location: 'Dubai Marina', fuelLevel: 85 },
        { id: 'V002', make: 'BMW', model: 'X5', year: 2024, licensePlate: 'U47450', status: 'available', mileage: 8000, dailyRate: 120, location: 'Downtown Dubai', fuelLevel: 100 },
        { id: 'V003', make: 'Honda', model: 'Civic', year: 2022, licensePlate: 'U47451', status: 'available', mileage: 25000, dailyRate: 60, location: 'Jumeirah', fuelLevel: 70 },
        { id: 'V004', make: 'Mercedes', model: 'C-Class', year: 2023, licensePlate: 'U47452', status: 'maintenance', mileage: 12000, dailyRate: 150, location: 'Service Center', fuelLevel: 45 },
        { id: 'V005', make: 'Tesla', model: 'Model 3', year: 2024, licensePlate: 'U47453', status: 'rented', mileage: 5000, dailyRate: 100, location: 'Business Bay', fuelLevel: 90 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested pricing object
    if (name === 'dailyRate') {
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          dailyRate: parseFloat(value) || 0
        }
      }));
    } else if (name === 'year' || name === 'doors' || name === 'seats' || name === 'currentMileage' || name === 'fuelCapacity' || name === 'fuelLevel') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Prepare data for backend
      const vehicleData = {
        make: formData.make,
        model: formData.model,
        year: formData.year,
        licensePlate: formData.licensePlate,
        category: formData.category,
        color: formData.color,
        doors: formData.doors,
        seats: formData.seats,
        status: formData.status,
        location: formData.location,
        currentMileage: formData.currentMileage,
        fuelType: formData.fuelType,
        fuelCapacity: formData.fuelCapacity,
        fuelLevel: formData.fuelLevel,
        transmission: formData.transmission,
        pricing: {
          dailyRate: formData.pricing?.dailyRate || 0,
          weeklyRate: (formData.pricing?.dailyRate || 0) * 6,
          monthlyRate: (formData.pricing?.dailyRate || 0) * 25,
          deposit: (formData.pricing?.dailyRate || 0) * 3,
          currency: 'AED'
        },
        maintenance: {
          insuranceExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
          registrationExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        }
      };

      const response = await vehiclesAPI.createVehicle(vehicleData as any);
      
      if (response.success) {
        alert('Vehicle added successfully!');
        setIsModalOpen(false);
        // Reset form
        setFormData({
          make: '',
          model: '',
          year: new Date().getFullYear(),
          licensePlate: '',
          category: 'Economy',
          color: '',
          doors: 4,
          seats: 5,
          status: 'Available',
          location: '',
          currentMileage: 0,
          fuelType: 'Gasoline',
          fuelCapacity: 50,
          fuelLevel: 100,
          transmission: 'Automatic',
          pricing: {
            dailyRate: 0
          }
        });
        // Refresh vehicles list
        fetchVehicles();
      }
    } catch (err: any) {
      console.error('Error creating vehicle:', err);
      alert(err.message || 'Failed to create vehicle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rented': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'maintenance': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || vehicle.status?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vehicle Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your fleet inventory</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-400 p-4 rounded-r-lg">
          <p className="text-sm text-orange-700 dark:text-orange-300">
            ⚠️ {error} - Showing mock data instead.
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Fleet</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{vehicles.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
          <p className="text-2xl font-bold text-green-600">{vehicles.filter(v => v.status.toLowerCase() === 'available').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Rented</p>
          <p className="text-2xl font-bold text-orange-600">{vehicles.filter(v => v.status.toLowerCase() === 'rented').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Maintenance</p>
          <p className="text-2xl font-bold text-red-600">{vehicles.filter(v => v.status.toLowerCase() === 'maintenance').length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by make, model, or plate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading && vehicles.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500 dark:text-gray-400">Loading vehicles...</div>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Car size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No vehicles found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    License Plate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Mileage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Fuel Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Daily Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Car size={20} className="text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {vehicle.vehicleNumber || vehicle.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <div className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded font-mono font-semibold">
                          {vehicle.licensePlate}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <MapPin size={14} className="mr-1.5 text-gray-400" />
                        {vehicle.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Gauge size={14} className="mr-1.5 text-gray-400" />
                        {(vehicle.mileage || 0).toLocaleString()} km
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              vehicle.fuelLevel > 50 
                                ? 'bg-green-500' 
                                : vehicle.fuelLevel > 20 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${vehicle.fuelLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          {vehicle.fuelLevel}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        AED {vehicle.dailyRate || 0}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">per day</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                      <button 
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        title="Edit Vehicle"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                        title="Delete Vehicle"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] overflow-hidden border border-gray-200 dark:border-gray-700 animate-slideUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-5 py-3 flex items-center justify-between shadow-lg z-10">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Car className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Add New Vehicle</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/90 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-5 space-y-5 overflow-y-auto max-h-[calc(92vh-60px)]">
              {/* Admin Name - Role-Based Selector */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700/50 dark:to-gray-700/30 p-4 rounded-xl border border-blue-100 dark:border-gray-600">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide flex items-center justify-between">
                  <span>Admin Name</span>
                  {!isAdmin && (
                    <span className="text-[10px] px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full font-medium">
                      View Only
                    </span>
                  )}
                </label>
                <select
                  value={selectedAdmin}
                  onChange={(e) => setSelectedAdmin(e.target.value)}
                  disabled={!isAdmin}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    !isAdmin ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-700/50' : 'cursor-pointer'
                  }`}
                >
                  <option value="">Select Admin</option>
                  {adminUsers.map((admin) => (
                    <option key={admin.id} value={admin.id}>
                      {admin.name} {admin.role === 'manager' ? '(Manager)' : admin.role === 'admin' ? '(Admin)' : ''}
                    </option>
                  ))}
                </select>
                {!isAdmin && (
                  <p className="mt-1.5 text-[10px] text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                    <span>🔒</span>
                    <span>Only admin users can change this field</span>
                  </p>
                )}
              </div>

              {/* Basic Information */}
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b-2 border-blue-500">
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Make<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      name="make"
                      value={formData.make}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Toyota"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Model<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Camry"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Year<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      License Plate<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., U47449"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Category<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="Economy">Economy</option>
                      <option value="Compact">Compact</option>
                      <option value="Mid-size">Mid-size</option>
                      <option value="Full-size">Full-size</option>
                      <option value="Premium">Premium</option>
                      <option value="Luxury">Luxury</option>
                      <option value="SUV">SUV</option>
                      <option value="Van">Van</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Color<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., White"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Doors<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="number"
                      name="doors"
                      value={formData.doors}
                      onChange={handleInputChange}
                      required
                      min="2"
                      max="8"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Seats<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="number"
                      name="seats"
                      value={formData.seats}
                      onChange={handleInputChange}
                      required
                      min="2"
                      max="15"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Status<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="Available">Available</option>
                      <option value="Rented">Rented</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Out of Service">Out of Service</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Location & Mileage */}
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b-2 border-green-500">
                  Location & Mileage
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Location<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Dubai Marina"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Current Mileage (km)<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="number"
                      name="currentMileage"
                      value={formData.currentMileage}
                      onChange={handleInputChange}
                      required
                      min="0"
                      placeholder="e.g., 15000"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Fuel & Transmission */}
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b-2 border-purple-500">
                  Fuel & Transmission
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Fuel Type<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="Gasoline">Gasoline</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Fuel Capacity (L)<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="number"
                      name="fuelCapacity"
                      value={formData.fuelCapacity}
                      onChange={handleInputChange}
                      required
                      min="1"
                      placeholder="e.g., 50"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Fuel Level (%)<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="number"
                      name="fuelLevel"
                      value={formData.fuelLevel}
                      onChange={handleInputChange}
                      required
                      min="0"
                      max="100"
                      placeholder="e.g., 100"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                      Transmission<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                      <option value="CVT">CVT</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700/50 dark:to-gray-700/30 p-4 rounded-xl border border-green-100 dark:border-gray-600">
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b-2 border-green-500">
                  Pricing
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Daily Rate (AED)<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    type="number"
                    name="dailyRate"
                    value={formData.pricing?.dailyRate || 0}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="e.g., 75.00"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                    Weekly and monthly rates will be calculated automatically (6x and 25x daily rate)
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end space-x-2 pt-3 border-t-2 border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 pb-2 -mx-5 px-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                  className="px-5 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span>⏳</span>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      <span>Add Vehicle</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleManagementPage;
