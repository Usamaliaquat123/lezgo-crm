import React, { useState, useEffect } from 'react';
import { Users, Phone, Mail, MapPin, Plus, Search, Filter, Eye, Edit, X, Calendar, CreditCard, Car, Clock } from 'lucide-react';
import { customersAPI } from '../utils/crmAPI';

const CustomersPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [customerStats, setCustomerStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    newThisWeek: 0,
    premiumMembers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    search: '',
    status: '',
    location: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Fetch customers data
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await customersAPI.getCustomers(filters);
      
      if (response.success) {
        setCustomers(response.data.customers);
        setPagination(response.data.pagination);
      } else {
        setError(response.message || 'Failed to fetch customers');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Failed to fetch customers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch customer statistics
  const fetchCustomerStats = async () => {
    try {
      const response = await customersAPI.getCustomerStats();
      
      if (response.success) {
        const { summary } = response.data;
        setCustomerStats({
          totalCustomers: summary.totalCustomers,
          activeCustomers: summary.activeCustomers,
          newThisWeek: summary.newThisMonth, // Using monthly as proxy for weekly
          premiumMembers: summary.premiumCustomers
        });
      }
    } catch (error) {
      console.error('Error fetching customer stats:', error);
    }
  };

  // Load data on component mount and when filters change
  useEffect(() => {
    fetchCustomers();
  }, [filters]);

  useEffect(() => {
    fetchCustomerStats();
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

  // Format customer data for display
  const formatCustomerForDisplay = (customer) => ({
    id: customer._id,
    name: `${customer.name.first} ${customer.name.last}`,
    email: customer.email,
    phone: customer.phone,
    location: customer.address?.city || 'N/A',
    totalBookings: customer.bookingHistory?.length || 0,
    totalSpent: `$${customer.totalSpent || 0}`,
    status: customer.status.toLowerCase(),
    joinDate: customer.createdAt,
    lastBooking: customer.lastBookingDate || customer.createdAt,
    preferredPayment: customer.preferences?.paymentMethod || 'N/A',
    emergencyContact: customer.emergencyContact?.phone || 'N/A',
    drivingLicense: customer.licenseNumber || 'N/A',
    nationality: customer.nationality || 'N/A',
    age: customer.dateOfBirth ? 
      Math.floor((new Date() - new Date(customer.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000)) : 
      'N/A',
    favoriteCarType: customer.preferences?.vehicleType || 'N/A',
    totalDistance: `${customer.totalDistance || 0} km`,
    averageRating: customer.rating || 4.5
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatsForDisplay = () => [
    { label: 'Total Customers', value: customerStats.totalCustomers, color: 'blue' },
    { label: 'Active This Month', value: customerStats.activeCustomers, color: 'green' },
    { label: 'New This Week', value: customerStats.newThisWeek, color: 'orange' },
    { label: 'Premium Members', value: customerStats.premiumMembers, color: 'purple' }
  ];

  if (loading && customers.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading customers...</p>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Customers</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => {
                setError(null);
                fetchCustomers();
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
          <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
          <p className="text-gray-600">Manage your customer base and relationships</p>
        </div>
   
      </div>

      {/* Customer Statistics */}
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
                <Users className={`${
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

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2 flex-1 min-w-64">
            <Search className="text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search customers by name, email, or phone..." 
              className="border-0 outline-none text-sm flex-1"
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <select 
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="dubai">Dubai</option>
            <option value="abu-dhabi">Abu Dhabi</option>
            <option value="sharjah">Sharjah</option>
            <option value="ajman">Ajman</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Bookings</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total Spent</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Join Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => {
                const displayCustomer = formatCustomerForDisplay(customer);
                return (
                  <tr key={displayCustomer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="text-blue-600" size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900">{displayCustomer.name}</p>
                          <p className="text-sm text-gray-500">{customer.customerNumber || displayCustomer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail size={14} className="text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-900 truncate">{displayCustomer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone size={14} className="text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{displayCustomer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-900">{displayCustomer.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{displayCustomer.totalBookings}</p>
                        <p className="text-xs text-gray-500">bookings</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-lg font-semibold text-green-600">{displayCustomer.totalSpent}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(displayCustomer.status)}`}>
                        {displayCustomer.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900">
                        {new Date(displayCustomer.joinDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedCustomer(displayCustomer)}
                          className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
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
              Showing {((pagination.currentPage - 1) * filters.limit) + 1} to {Math.min(pagination.currentPage * filters.limit, pagination.totalItems)} of {pagination.totalItems} customers
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

      {/* Customer Detail Modal - Compact Design */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
            {/* Compact Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Users className="text-white" size={16} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{selectedCustomer.name}</h2>
                    <p className="text-blue-100 text-sm">{selectedCustomer.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    selectedCustomer.status === 'premium' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {selectedCustomer.status.toUpperCase()}
                  </span>
                  <button 
                    onClick={() => setSelectedCustomer(null)}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Compact Stats Grid */}
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-blue-50 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-blue-600">{selectedCustomer.totalBookings}</p>
                  <p className="text-xs text-blue-700">Bookings</p>
                </div>
                <div className="bg-green-50 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-green-600">{selectedCustomer.totalSpent}</p>
                  <p className="text-xs text-green-700">Spent</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-purple-600">{selectedCustomer.averageRating}</p>
                  <p className="text-xs text-purple-700">Rating</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-2 text-center">
                  <p className="text-sm font-bold text-orange-600">{selectedCustomer.totalDistance}</p>
                  <p className="text-xs text-orange-700">Distance</p>
                </div>
              </div>

              {/* Compact Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Contact Column */}
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 text-sm mb-2 flex items-center">
                      <Phone className="mr-1" size={14} />
                      Contact
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{selectedCustomer.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-900">{selectedCustomer.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-900">{selectedCustomer.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 text-sm mb-2 flex items-center">
                      <Calendar className="mr-1" size={14} />
                      Dates
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500">Joined</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Last Booking</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(selectedCustomer.lastBooking).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Column */}
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 text-sm mb-2 flex items-center">
                      <Users className="mr-1" size={14} />
                      Personal
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="text-sm font-medium text-gray-900">{selectedCustomer.age} years</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Nationality</p>
                        <p className="text-sm font-medium text-gray-900">{selectedCustomer.nationality}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">License</p>
                        <p className="text-sm font-medium text-gray-900">{selectedCustomer.drivingLicense}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 text-sm mb-2 flex items-center">
                      <CreditCard className="mr-1" size={14} />
                      Preferences
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500">Payment</p>
                        <p className="text-sm font-medium text-gray-900">{selectedCustomer.preferredPayment}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Car Type</p>
                        <p className="text-sm font-medium text-gray-900">{selectedCustomer.favoriteCarType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Emergency</p>
                        <p className="text-sm font-medium text-gray-900">{selectedCustomer.emergencyContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compact Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-200">
                <button className="flex items-center justify-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <Phone size={14} />
                  <span>Call</span>
                </button>
                <button className="flex items-center justify-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  <Mail size={14} />
                  <span>Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
