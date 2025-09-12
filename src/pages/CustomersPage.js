import React, { useState } from 'react';
import { Users, Phone, Mail, MapPin, Plus, Search, Filter, Eye, Edit, X, Calendar, CreditCard, Car, Clock } from 'lucide-react';

const CustomersPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    {
      id: 'CU001',
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.rashid@email.com',
      phone: '+971 50 123 4567',
      location: 'Dubai Marina',
      totalBookings: 12,
      totalSpent: '$2,840',
      status: 'active',
      joinDate: '2023-08-15',
      lastBooking: '2024-01-15',
      preferredPayment: 'Credit Card',
      emergencyContact: '+971 50 123 4568',
      drivingLicense: 'UAE-123456789',
      nationality: 'UAE',
      age: 32,
      favoriteCarType: 'SUV',
      totalDistance: '2,450 km',
      averageRating: 4.8
    },
    {
      id: 'CU002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+971 55 987 6543',
      location: 'Downtown Dubai',
      totalBookings: 8,
      totalSpent: '$1,920',
      status: 'active',
      joinDate: '2023-09-22',
      lastBooking: '2024-01-12',
      preferredPayment: 'Debit Card',
      emergencyContact: '+971 55 987 6544',
      drivingLicense: 'UAE-987654321',
      nationality: 'UK',
      age: 28,
      favoriteCarType: 'Sedan',
      totalDistance: '1,890 km',
      averageRating: 4.6
    },
    {
      id: 'CU003',
      name: 'Mohammed Hassan',
      email: 'mohammed.hassan@email.com',
      phone: '+971 52 456 7890',
      location: 'Jumeirah',
      totalBookings: 15,
      totalSpent: '$3,600',
      status: 'premium',
      joinDate: '2023-07-10',
      lastBooking: '2024-01-18',
      preferredPayment: 'Apple Pay',
      emergencyContact: '+971 52 456 7891',
      drivingLicense: 'UAE-456789123',
      nationality: 'UAE',
      age: 35,
      favoriteCarType: 'Luxury',
      totalDistance: '3,200 km',
      averageRating: 4.9
    },
    {
      id: 'CU004',
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '+971 56 789 0123',
      location: 'Business Bay',
      totalBookings: 5,
      totalSpent: '$1,200',
      status: 'active',
      joinDate: '2023-11-05',
      lastBooking: '2024-01-08',
      preferredPayment: 'PayPal',
      emergencyContact: '+971 56 789 0124',
      drivingLicense: 'UAE-789012345',
      nationality: 'Canada',
      age: 26,
      favoriteCarType: 'Hatchback',
      totalDistance: '980 km',
      averageRating: 4.7
    },
    {
      id: 'CU005',
      name: 'Omar Abdullah',
      email: 'omar.abdullah@email.com',
      phone: '+971 54 234 5678',
      location: 'Al Barsha',
      totalBookings: 20,
      totalSpent: '$4,800',
      status: 'premium',
      joinDate: '2023-06-18',
      lastBooking: '2024-01-20',
      preferredPayment: 'Cash',
      emergencyContact: '+971 54 234 5679',
      drivingLicense: 'UAE-234567890',
      nationality: 'UAE',
      age: 29,
      favoriteCarType: 'Sports',
      totalDistance: '4,100 km',
      averageRating: 4.9
    }
  ];

  const customerStats = [
    { label: 'Total Customers', value: 1247, color: 'blue' },
    { label: 'Active This Month', value: 892, color: 'green' },
    { label: 'New This Week', value: 23, color: 'orange' },
    { label: 'Premium Members', value: 156, color: 'purple' }
  ];

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
        {customerStats.map((stat, index) => (
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
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={16} />
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="premium">Premium</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option value="all">All Locations</option>
            <option value="dubai-marina">Dubai Marina</option>
            <option value="downtown">Downtown Dubai</option>
            <option value="jumeirah">Jumeirah</option>
            <option value="business-bay">Business Bay</option>
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
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="text-blue-600" size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900 truncate">{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-900">{customer.location}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">{customer.totalBookings}</p>
                      <p className="text-xs text-gray-500">bookings</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-lg font-semibold text-green-600">{customer.totalSpent}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">
                      {new Date(customer.joinDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedCustomer(customer)}
                        className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
