import React, { useState } from 'react';
import { Calendar, Clock, User, Car, Plus, Filter, Search, Eye, X, Phone, Mail, MapPin, CreditCard, AlertCircle } from 'lucide-react';

const BookingsPage = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
    {
      id: 'BK001',
      customer: 'Ahmed Al-Rashid',
      customerPhone: '+971 50 123 4567',
      customerEmail: 'ahmed.rashid@email.com',
      car: 'Mitsubishi ASX (U47449)',
      carModel: 'Mitsubishi ASX',
      carPlate: 'U47449',
      carColor: 'Silver',
      carYear: '2022',
      startDate: '2024-01-15',
      endDate: '2024-01-17',
      startTime: '10:00 AM',
      endTime: '6:00 PM',
      pickupLocation: 'Dubai Marina Mall',
      dropoffLocation: 'Dubai Marina Mall',
      status: 'active',
      amount: '$240',
      dailyRate: '$80',
      duration: '3 days',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      bookingDate: '2024-01-10',
      notes: 'Customer requested GPS navigation system',
      insurance: 'Full Coverage',
      mileageLimit: '300 km/day'
    },
    {
      id: 'BK002',
      customer: 'Sarah Johnson',
      customerPhone: '+971 55 987 6543',
      customerEmail: 'sarah.j@email.com',
      car: 'Tesla Model 3 (U47452)',
      carModel: 'Tesla Model 3',
      carPlate: 'U47452',
      carColor: 'White',
      carYear: '2023',
      startDate: '2024-01-16',
      endDate: '2024-01-18',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      pickupLocation: 'Dubai International Airport',
      dropoffLocation: 'Dubai International Airport',
      status: 'confirmed',
      amount: '$320',
      dailyRate: '$160',
      duration: '2 days',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      bookingDate: '2024-01-12',
      notes: 'Airport pickup required',
      insurance: 'Full Coverage',
      mileageLimit: 'Unlimited'
    },
    {
      id: 'BK003',
      customer: 'Mohammed Hassan',
      customerPhone: '+971 50 234 5678',
      customerEmail: 'mohammed.h@email.com',
      car: 'BMW X3 (U47453)',
      carModel: 'BMW X3',
      carPlate: 'U47453',
      carColor: 'Black',
      carYear: '2022',
      startDate: '2024-01-14',
      endDate: '2024-01-16',
      startTime: '2:00 PM',
      endTime: '2:00 PM',
      pickupLocation: 'Business Bay',
      dropoffLocation: 'Business Bay',
      status: 'completed',
      amount: '$180',
      dailyRate: '$90',
      duration: '2 days',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      bookingDate: '2024-01-08',
      notes: 'Business client - VIP treatment',
      insurance: 'Basic Coverage',
      mileageLimit: '200 km/day'
    },
    {
      id: 'BK004',
      customer: 'Emma Wilson',
      customerPhone: '+971 52 345 6789',
      customerEmail: 'emma.w@email.com',
      car: 'Toyota RAV4 (U47450)',
      carModel: 'Toyota RAV4',
      carPlate: 'U47450',
      carColor: 'Red',
      carYear: '2023',
      startDate: '2024-01-18',
      endDate: '2024-01-20',
      startTime: '11:00 AM',
      endTime: '11:00 AM',
      pickupLocation: 'Dubai Mall',
      dropoffLocation: 'Dubai Mall',
      status: 'pending',
      amount: '$200',
      dailyRate: '$100',
      duration: '2 days',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Pending',
      bookingDate: '2024-01-15',
      notes: 'First-time customer',
      insurance: 'Full Coverage',
      mileageLimit: '250 km/day'
    },
    {
      id: 'BK005',
      customer: 'Omar Abdullah',
      customerPhone: '+971 50 456 7890',
      customerEmail: 'omar.a@email.com',
      car: 'Audi Q5 (U47456)',
      carModel: 'Audi Q5',
      carPlate: 'U47456',
      carColor: 'Blue',
      carYear: '2023',
      startDate: '2024-01-17',
      endDate: '2024-01-19',
      startTime: '8:00 AM',
      endTime: '8:00 AM',
      pickupLocation: 'JBR Beach',
      dropoffLocation: 'JBR Beach',
      status: 'confirmed',
      amount: '$280',
      dailyRate: '$140',
      duration: '2 days',
      paymentMethod: 'Bank Transfer',
      paymentStatus: 'Paid',
      bookingDate: '2024-01-13',
      notes: 'Luxury package requested',
      insurance: 'Premium Coverage',
      mileageLimit: 'Unlimited'
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <button 
                      onClick={() => setSelectedBooking(booking)}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
