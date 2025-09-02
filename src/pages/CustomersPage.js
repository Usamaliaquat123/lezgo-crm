import React from 'react';
import { Users, Phone, Mail, MapPin, Plus, Search, Filter, Eye, Edit } from 'lucide-react';

const CustomersPage = () => {
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
      joinDate: '2023-08-15'
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
      joinDate: '2023-09-22'
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
      joinDate: '2023-07-10'
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
      joinDate: '2023-11-05'
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
      joinDate: '2023-06-18'
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                  <p className="text-sm text-gray-500">{customer.id}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                {customer.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail size={14} />
                <span className="truncate">{customer.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone size={14} />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin size={14} />
                <span>{customer.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 py-3 border-t border-gray-100">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{customer.totalBookings}</p>
                <p className="text-xs text-gray-500">Total Bookings</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-green-600">{customer.totalSpent}</p>
                <p className="text-xs text-gray-500">Total Spent</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Joined: {new Date(customer.joinDate).toLocaleDateString()}
              </p>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  <Eye size={14} />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                  <Edit size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
