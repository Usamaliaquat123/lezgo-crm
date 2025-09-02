import React from 'react';
import { Calendar, Clock, User, Car, Plus, Filter, Search, Eye } from 'lucide-react';

const BookingsPage = () => {
  const bookings = [
    {
      id: 'BK001',
      customer: 'Ahmed Al-Rashid',
      car: 'Mitsubishi ASX (U47449)',
      startDate: '2024-01-15',
      endDate: '2024-01-17',
      status: 'active',
      amount: '$240',
      duration: '3 days'
    },
    {
      id: 'BK002',
      customer: 'Sarah Johnson',
      car: 'Tesla Model 3 (U47452)',
      startDate: '2024-01-16',
      endDate: '2024-01-18',
      status: 'confirmed',
      amount: '$320',
      duration: '2 days'
    },
    {
      id: 'BK003',
      customer: 'Mohammed Hassan',
      car: 'BMW X3 (U47453)',
      startDate: '2024-01-14',
      endDate: '2024-01-16',
      status: 'completed',
      amount: '$180',
      duration: '2 days'
    },
    {
      id: 'BK004',
      customer: 'Emma Wilson',
      car: 'Toyota RAV4 (U47450)',
      startDate: '2024-01-18',
      endDate: '2024-01-20',
      status: 'pending',
      amount: '$200',
      duration: '2 days'
    },
    {
      id: 'BK005',
      customer: 'Omar Abdullah',
      car: 'Audi Q5 (U47456)',
      startDate: '2024-01-17',
      endDate: '2024-01-19',
      status: 'confirmed',
      amount: '$280',
      duration: '2 days'
    }
  ];

  const bookingStats = [
    { label: 'Total Bookings', value: 156, color: 'blue' },
    { label: 'Active Rentals', value: 8, color: 'green' },
    { label: 'Pending', value: 3, color: 'orange' },
    { label: 'This Month', value: 42, color: 'purple' }
  ];

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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {bookingStats.map((stat, index) => (
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
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={16} />
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
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
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{booking.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <User className="text-gray-400" size={16} />
                      <span className="text-gray-900">{booking.customer}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Car className="text-gray-400" size={16} />
                      <span className="text-gray-900">{booking.car}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-gray-900">{booking.duration}</p>
                      <p className="text-xs text-gray-500">
                        {booking.startDate} - {booking.endDate}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900">{booking.amount}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
