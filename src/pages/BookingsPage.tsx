import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Car, User, MapPin, CheckCircle, XCircle, Clock, X, ArrowLeftRight, Calculator } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Booking {
  id: string;
  customer: string;
  vehicle: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  totalAmount: number;
  pickupLocation: string;
  dropoffLocation: string;
}

interface VehiclePPM {
  id: string;
  name: string;
  ratePerMinute: number;
}

const BookingsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<string>('');
  const [bookingModel, setBookingModel] = useState<'standard' | 'ppm'>('standard');
  const [ppmMinutes, setPpmMinutes] = useState<number>(0);
  const [ppmHours, setPpmHours] = useState<number>(0);
  const [selectedVehiclePPM, setSelectedVehiclePPM] = useState<string>('');
  const [sameAsRenter, setSameAsRenter] = useState<boolean>(false);

  // Check if current user is admin
  const isAdmin = user?.role === 'Super Admin' || user?.role === 'manager';

  // Mock admin users list
  const adminUsers = [
    { id: '1', name: 'Saood', role: 'admin' },
    { id: '2', name: 'Ahmed', role: 'admin' },
    { id: '3', name: 'Mohammed', role: 'admin' },
    { id: '4', name: 'Ali', role: 'manager' },
  ];

  // Mock vehicles with PPM rates
  const vehiclesPPM: VehiclePPM[] = [
    { id: '1', name: 'Toyota Camry - AED 2.5/min', ratePerMinute: 2.5 },
    { id: '2', name: 'BMW X5 - AED 5.0/min', ratePerMinute: 5.0 },
    { id: '3', name: 'Honda Civic - AED 2.0/min', ratePerMinute: 2.0 },
    { id: '4', name: 'Mercedes C-Class - AED 6.0/min', ratePerMinute: 6.0 },
    { id: '5', name: 'Tesla Model 3 - AED 4.5/min', ratePerMinute: 4.5 },
  ];

  // Calculate PPM total
  const calculatePPMTotal = (): number => {
    const totalMinutes = (ppmHours * 60) + ppmMinutes;
    const vehicle = vehiclesPPM.find(v => v.id === selectedVehiclePPM);
    if (!vehicle) return 0;
    return totalMinutes * vehicle.ratePerMinute;
  };

  const bookings: Booking[] = [
    { id: 'BK001', customer: 'Ahmed Al-Rashid', vehicle: 'Toyota Camry', startDate: '2024-10-20', endDate: '2024-10-25', status: 'active', totalAmount: 320, pickupLocation: 'Dubai Marina', dropoffLocation: 'Downtown Dubai' },
    { id: 'BK002', customer: 'Sarah Johnson', vehicle: 'BMW X5', startDate: '2024-10-22', endDate: '2024-10-27', status: 'confirmed', totalAmount: 450, pickupLocation: 'Abu Dhabi', dropoffLocation: 'Sharjah' },
    { id: 'BK003', customer: 'Mohammed Hassan', vehicle: 'Honda Civic', startDate: '2024-10-15', endDate: '2024-10-18', status: 'completed', totalAmount: 180, pickupLocation: 'Deira', dropoffLocation: 'Bur Dubai' },
    { id: 'BK004', customer: 'Emma Wilson', vehicle: 'Mercedes C-Class', startDate: '2024-10-25', endDate: '2024-10-30', status: 'pending', totalAmount: 550, pickupLocation: 'Jumeirah', dropoffLocation: 'Al Barsha' },
    { id: 'BK005', customer: 'Omar Abdullah', vehicle: 'Tesla Model 3', startDate: '2024-10-10', endDate: '2024-10-12', status: 'cancelled', totalAmount: 200, pickupLocation: 'Business Bay', dropoffLocation: 'JLT' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={14} />;
      case 'confirmed': return <Clock size={14} />;
      case 'completed': return <CheckCircle size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bookings</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage all vehicle reservations</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>New Booking</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{bookings.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
          <p className="text-2xl font-bold text-green-600">{bookings.filter(b => b.status === 'active').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-orange-600">{bookings.filter(b => b.status === 'pending').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-bold text-gray-600">{bookings.filter(b => b.status === 'completed').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
          <p className="text-2xl font-bold text-blue-600">${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search bookings..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Locations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">{booking.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Car size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">{booking.vehicle}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{booking.startDate}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">to {booking.endDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white flex items-center">
                      <MapPin size={12} className="text-gray-400 mr-1" />
                      {booking.pickupLocation}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                      <MapPin size={12} className="text-gray-400 mr-1" />
                      {booking.dropoffLocation}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">${booking.totalAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="capitalize">{booking.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      <Eye size={16} />
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Booking Modal - Contract Details */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[92vh] overflow-hidden border border-gray-200 dark:border-gray-700 animate-slideUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-5 py-3 flex items-center justify-between shadow-lg z-10">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Car className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Contract List - New Booking</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/90 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(92vh-60px)]">
              {/* Top Section - Admin & Client Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                {/* Old Client Passport */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700/50 dark:to-gray-700/30 p-4 rounded-xl border border-purple-100 dark:border-gray-600">
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                    Old Client Passport
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Passport No"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Get Old Client Data Button */}
                <div className="flex items-end">
                  <button className="w-full px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2">
                    <span>📥</span>
                    <span>Get Old Client Data</span>
                  </button>
                </div>
              </div>

              {/* Booking Model Selector */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700/50 dark:to-gray-700/30 p-4 rounded-xl border border-amber-100 dark:border-gray-600">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  Booking Model
                </label>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setBookingModel('standard')}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      bookingModel === 'standard'
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-400'
                    }`}
                  >
                    📋 Standard Booking
                  </button>
                  <button
                    onClick={() => setBookingModel('ppm')}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      bookingModel === 'ppm'
                        ? 'bg-green-600 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-green-400'
                    }`}
                  >
                    ⏱️ Pay Per Minute (PPM)
                  </button>
                </div>
              </div>

              {/* PPM Section - Only show if PPM is selected */}
              {bookingModel === 'ppm' && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700/50 dark:to-gray-700/30 p-5 rounded-xl border-2 border-green-200 dark:border-gray-600">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-green-500 flex items-center space-x-2">
                    <Calculator className="text-green-600" size={20} />
                    <span>Pay Per Minute Calculation</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Hours Input */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Hours
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={ppmHours}
                        onChange={(e) => setPpmHours(parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      />
                    </div>

                    {/* Minutes Input */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Minutes
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={ppmMinutes}
                        onChange={(e) => setPpmMinutes(parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      />
                    </div>

                    {/* Vehicle Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Select Vehicle<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <select
                        value={selectedVehiclePPM}
                        onChange={(e) => setSelectedVehiclePPM(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      >
                        <option value="">Select Vehicle</option>
                        {vehiclesPPM.map((vehicle) => (
                          <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Total Calculation Display */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Total Amount
                      </label>
                      <div className="px-3 py-2 border-2 border-green-500 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-bold flex items-center justify-center h-[42px]">
                        AED {calculatePPMTotal().toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <span className="block">⏱️ Total Time: <strong>{ppmHours}h {ppmMinutes}m</strong> = <strong>{(ppmHours * 60) + ppmMinutes} minutes</strong></span>
                      <span className="block">💰 Rate: <strong>{vehiclesPPM.find(v => v.id === selectedVehiclePPM)?.ratePerMinute || 0} AED/minute</strong></span>
                      <span className="block">📊 Calculation: <strong>{(ppmHours * 60) + ppmMinutes} × {vehiclesPPM.find(v => v.id === selectedVehiclePPM)?.ratePerMinute || 0} = {calculatePPMTotal().toFixed(2)} AED</strong></span>
                    </p>
                  </div>
                </div>
              )}

              {/* Renter's & Driver's Details Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Renter's Details */}
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b-2 border-blue-500 flex items-center space-x-2">
                    <User className="text-blue-600" size={18} />
                    <span>Renter's Details</span>
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Renter's Name<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="text" placeholder="Name" className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Renter's Nationality<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <select className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                        <option>Select</option>
                        <option>UAE</option>
                        <option>Indian</option>
                        <option>Pakistani</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Renter's Pass No<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="text" placeholder="Pass No." className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Renter's Pass Issue Date<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="date" className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Renter's Pass Expiry Date<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="date" className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Renter's D.Licence No.<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="text" placeholder="D.Licence No" className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Renter's DOB<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="date" className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Place Of Work<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="text" placeholder="Place Of Work" className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Email<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="email" placeholder="Email" className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Renter's EID No.<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="text" placeholder="EID No" className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Renter's EID Issue Date<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="date" className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Renter's EID Expiry Date<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="date" className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Address<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <textarea placeholder="Address" rows={2} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Renter's Documents<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="file" accept="*" className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400" />
                    </div>
                  </div>
                </div>

                {/* Driver's Details */}
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-emerald-500">
                    <h4 className="text-base font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                      <User className="text-emerald-600" size={18} />
                      <span>Driver's Details</span>
                    </h4>
                    <button
                      onClick={() => setSameAsRenter(!sameAsRenter)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                        sameAsRenter
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                      }`}
                    >
                      <ArrowLeftRight size={12} className="inline mr-1" />
                      Same as Renter
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Driver's Name<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="text" placeholder="Name" disabled={sameAsRenter} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Driver's Nationality<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <select disabled={sameAsRenter} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50">
                        <option>Select</option>
                        <option>UAE</option>
                        <option>Indian</option>
                        <option>Pakistani</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Driver's Pass No<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="text" placeholder="Pass No" disabled={sameAsRenter} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Driver's Pass Issue Date<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="date" disabled={sameAsRenter} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Driver's Pass Expiry Date<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="date" disabled={sameAsRenter} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Driver's D.Licence No.<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="text" placeholder="D.Licence No" disabled={sameAsRenter} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Issue Date<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="date" disabled={sameAsRenter} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Expiry Date<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="date" disabled={sameAsRenter} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Tel.Off/Mob<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="tel" placeholder="9715XXXXXXXX" disabled={sameAsRenter} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Driver's EID No.<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="text" placeholder="EID No" disabled={sameAsRenter} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Driver's EID Issue Date<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="date" disabled={sameAsRenter} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Driver's EID Expiry Date<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="date" disabled={sameAsRenter} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                        Driver's Documents<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="file" accept="*" disabled={sameAsRenter} className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400 disabled:opacity-50" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end space-x-2 pt-3 border-t-2 border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 pb-2 -mx-5 px-5">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center space-x-2"
                >
                  <span>💾</span>
                  <span>Save Booking</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;

