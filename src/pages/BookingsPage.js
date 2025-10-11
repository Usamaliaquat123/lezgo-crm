import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Car, Plus, Filter, Search, Eye, X, Phone, Mail, MapPin, CreditCard, AlertCircle } from 'lucide-react';
import { bookingsAPI } from '../utils/crmAPI';

const BookingsPage = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingStats, setBookingStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    pendingBookings: 0,
    thisMonthBookings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    search: '',
    status: '',
    startDate: '',
    endDate: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Fetch bookings data
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingsAPI.getBookings(filters);
      
      if (response.success) {
        setBookings(response.data.bookings);
        setPagination(response.data.pagination);
      } else {
        setError(response.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to fetch bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch booking statistics
  const fetchBookingStats = async () => {
    try {
      const response = await bookingsAPI.getBookingStats();
      
      if (response.success) {
        const { summary } = response.data;
        setBookingStats({
          totalBookings: summary.totalBookings,
          activeBookings: summary.activeBookings,
          pendingBookings: summary.pendingBookings,
          thisMonthBookings: summary.thisMonthBookings
        });
      }
    } catch (error) {
      console.error('Error fetching booking stats:', error);
    }
  };

  // Load data on component mount and when filters change
  useEffect(() => {
    fetchBookings();
  }, [filters]);

  useEffect(() => {
    fetchBookingStats();
  }, []);

  // Handle search
  const handleSearch = (searchTerm) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm,
      page: 1
    }));
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  // Format booking data for display
  const formatBookingForDisplay = (booking) => ({
    id: booking._id,
    bookingNumber: booking.bookingNumber,
    customer: booking.customer?.name ? 
      `${booking.customer.name.first} ${booking.customer.name.last}` : 
      'Unknown Customer',
    customerPhone: booking.customer?.phone || 'N/A',
    customerEmail: booking.customer?.email || 'N/A',
    car: booking.vehicle ? 
      `${booking.vehicle.make} ${booking.vehicle.model} (${booking.vehicle.licensePlate})` : 
      'Unknown Vehicle',
    carModel: booking.vehicle ? `${booking.vehicle.make} ${booking.vehicle.model}` : 'Unknown',
    carPlate: booking.vehicle?.licensePlate || 'N/A',
    carColor: booking.vehicle?.color || 'N/A',
    carYear: booking.vehicle?.year || 'N/A',
    startDate: new Date(booking.pickupDate).toLocaleDateString(),
    endDate: new Date(booking.returnDate).toLocaleDateString(),
    startTime: new Date(booking.pickupDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    endTime: new Date(booking.returnDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    pickupLocation: booking.pickupLocation,
    dropoffLocation: booking.returnLocation,
    status: booking.status.toLowerCase(),
    amount: `$${booking.pricing?.total || 0}`,
    dailyRate: `$${booking.pricing?.baseRate || 0}`,
    duration: `${booking.pricing?.duration?.days || 0} days`,
    paymentMethod: booking.paymentMethod || 'N/A',
    paymentStatus: booking.paymentStatus || 'Pending',
    bookingDate: new Date(booking.createdAt).toLocaleDateString(),
    notes: booking.notes || 'No notes',
    insurance: booking.insurance || 'Basic Coverage',
    mileageLimit: booking.mileageLimit || 'Standard'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatsForDisplay = () => [
    { label: 'Total Bookings', value: bookingStats.totalBookings, color: 'blue' },
    { label: 'Active Rentals', value: bookingStats.activeBookings, color: 'green' },
    { label: 'Pending', value: bookingStats.pendingBookings, color: 'orange' },
    { label: 'This Month', value: bookingStats.thisMonthBookings, color: 'purple' }
  ];

  if (loading && bookings.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <X size={48} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Bookings</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => {
                setError(null);
                fetchBookings();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bookings Management</h2>
          <p className="text-gray-600">Manage car rental bookings and reservations</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>New Booking</span>
        </button>
      </div>

      {/* Booking Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {formatStatsForDisplay().map((stat, index) => (
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
                'bg-purple-100'
              }`}>
                <Calendar className={`${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'orange' ? 'text-orange-600' :
                  'text-purple-600'
                }`} size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Search className="text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              className="border-0 outline-none text-sm"
              value={filters.search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={16} />
            <select 
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <select 
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            onChange={(e) => {
              const value = e.target.value;
              const today = new Date();
              let startDate = '';
              let endDate = '';
              
              if (value === 'today') {
                startDate = today.toISOString().split('T')[0];
                endDate = today.toISOString().split('T')[0];
              } else if (value === 'week') {
                const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
                const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
                startDate = weekStart.toISOString().split('T')[0];
                endDate = weekEnd.toISOString().split('T')[0];
              } else if (value === 'month') {
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                startDate = monthStart.toISOString().split('T')[0];
                endDate = monthEnd.toISOString().split('T')[0];
              }
              
              setFilters(prev => ({
                ...prev,
                startDate,
                endDate,
                page: 1
              }));
            }}
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Booking ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Vehicle</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => {
                const displayBooking = formatBookingForDisplay(booking);
                return (
                  <tr key={displayBooking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{displayBooking.bookingNumber || displayBooking.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <User className="text-gray-400" size={16} />
                        <span className="text-gray-900">{displayBooking.customer}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Car className="text-gray-400" size={16} />
                        <span className="text-gray-900">{displayBooking.car}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-gray-900">{displayBooking.duration}</p>
                        <p className="text-xs text-gray-500">
                          {displayBooking.startDate} - {displayBooking.endDate}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">{displayBooking.amount}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(displayBooking.status)}`}>
                        {displayBooking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button 
                        onClick={() => setSelectedBooking(displayBooking)}
                        className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {((pagination.currentPage - 1) * filters.limit) + 1} to {Math.min(pagination.currentPage * filters.limit, pagination.totalItems)} of {pagination.totalItems} bookings
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Elegant Compact Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden">
            {/* Compact Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">{selectedBooking.id}</h3>
                  <p className="text-blue-100 text-sm">{selectedBooking.customer}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    selectedBooking.status === 'active' ? 'bg-green-500 text-white' :
                    selectedBooking.status === 'confirmed' ? 'bg-blue-500 text-white' :
                    selectedBooking.status === 'pending' ? 'bg-yellow-500 text-black' :
                    'bg-gray-500 text-white'
                  }`}>
                    {selectedBooking.status}
                  </span>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="p-1.5 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Compact Content */}
            <div className="p-4 overflow-y-auto max-h-[calc(85vh-140px)]">
              <div className="space-y-4">
                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Car className="text-blue-600" size={16} />
                      <span className="text-sm font-medium text-gray-700">Vehicle</span>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{selectedBooking.carModel}</p>
                    <p className="text-xs text-gray-600">{selectedBooking.carPlate} • {selectedBooking.carColor}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <CreditCard className="text-green-600" size={16} />
                      <span className="text-sm font-medium text-gray-700">Payment</span>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{selectedBooking.amount}</p>
                    <p className="text-xs text-gray-600">{selectedBooking.paymentMethod} • {selectedBooking.paymentStatus}</p>
                  </div>
                </div>

                {/* Contact & Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="text-blue-600" size={16} />
                        <span className="text-sm font-medium text-gray-700">Contact</span>
                      </div>
                      <div className="flex space-x-1">
                        <a
                          href={`tel:${selectedBooking.customerPhone}`}
                          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        >
                          <Phone size={12} />
                        </a>
                        <a
                          href={`mailto:${selectedBooking.customerEmail}`}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Mail size={12} />
                        </a>
                      </div>
                    </div>
                    <p className="text-sm text-gray-900">{selectedBooking.customerPhone}</p>
                    <p className="text-xs text-gray-600 truncate">{selectedBooking.customerEmail}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="text-blue-600" size={16} />
                      <span className="text-sm font-medium text-gray-700">Duration</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{selectedBooking.duration}</p>
                    <p className="text-xs text-gray-600">{selectedBooking.dailyRate}/day</p>
                  </div>
                </div>

                {/* Rental Timeline */}
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="text-blue-600" size={16} />
                    <span className="text-sm font-medium text-gray-700">Rental Period</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Start</p>
                        <p className="text-xs text-gray-600">{selectedBooking.startDate} at {selectedBooking.startTime}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">End</p>
                        <p className="text-xs text-gray-600">{selectedBooking.endDate} at {selectedBooking.endTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Locations */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="text-green-600" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-600">PICKUP</p>
                      <p className="text-sm text-gray-900">{selectedBooking.pickupLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <MapPin className="text-red-600" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-600">DROP-OFF</p>
                      <p className="text-sm text-gray-900">{selectedBooking.dropoffLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-medium text-gray-600">Insurance</p>
                      <p className="text-gray-900">{selectedBooking.insurance}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Mileage Limit</p>
                      <p className="text-gray-900">{selectedBooking.mileageLimit}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-medium text-gray-600 mb-1">Notes</p>
                      <p className="text-gray-900 text-xs bg-white p-2 rounded border">{selectedBooking.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Booked on {selectedBooking.bookingDate}
                </div>
                <div className="flex space-x-2">
                  <a
                    href={`tel:${selectedBooking.customerPhone}`}
                    className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs flex items-center space-x-1"
                  >
                    <Phone size={12} />
                    <span>Call</span>
                  </a>
                  <a
                    href={`mailto:${selectedBooking.customerEmail}`}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs flex items-center space-x-1"
                  >
                    <Mail size={12} />
                    <span>Email</span>
                  </a>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
