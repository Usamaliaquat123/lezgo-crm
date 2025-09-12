import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Filter,
  Search,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const PaymentsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Generate daily revenue data for the last 30 days
  const generateDailyRevenue = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const baseRevenue = 2000 + Math.random() * 3000; // $2000-$5000 base
      const weekendMultiplier = date.getDay() === 0 || date.getDay() === 6 ? 1.3 : 1; // Higher on weekends
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date.toISOString().split('T')[0],
        revenue: Math.round(baseRevenue * weekendMultiplier),
        transactions: Math.round((baseRevenue * weekendMultiplier) / 120), // Avg $120 per transaction
        bookings: Math.round((baseRevenue * weekendMultiplier) / 180) // Avg $180 per booking
      });
    }
    return data;
  };

  const dailyRevenueData = generateDailyRevenue();
  
  // Calculate totals and trends
  const todayRevenue = dailyRevenueData[dailyRevenueData.length - 1]?.revenue || 0;
  const yesterdayRevenue = dailyRevenueData[dailyRevenueData.length - 2]?.revenue || 0;
  const totalMonthRevenue = dailyRevenueData.reduce((sum, day) => sum + day.revenue, 0);
  const avgDailyRevenue = Math.round(totalMonthRevenue / 30);
  const revenueGrowth = yesterdayRevenue > 0 ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue * 100) : 0;

  const recentTransactions = [
    {
      id: 'TXN001',
      customer: 'Ahmed Al-Rashid',
      amount: 320,
      method: 'Credit Card',
      status: 'completed',
      time: '2 minutes ago',
      type: 'booking'
    },
    {
      id: 'TXN002',
      customer: 'Sarah Johnson',
      amount: 150,
      method: 'PayPal',
      status: 'completed',
      time: '15 minutes ago',
      type: 'booking'
    },
    {
      id: 'TXN003',
      customer: 'Mohammed Hassan',
      amount: 480,
      method: 'Apple Pay',
      status: 'pending',
      time: '1 hour ago',
      type: 'booking'
    },
    {
      id: 'TXN004',
      customer: 'Emma Wilson',
      amount: 220,
      method: 'Credit Card',
      status: 'completed',
      time: '2 hours ago',
      type: 'booking'
    },
    {
      id: 'TXN005',
      customer: 'Omar Abdullah',
      amount: 75,
      method: 'Cash',
      status: 'failed',
      time: '3 hours ago',
      type: 'refund'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={14} className="text-green-600" />;
      case 'pending': return <Clock size={14} className="text-yellow-600" />;
      case 'failed': return <XCircle size={14} className="text-red-600" />;
      default: return <Clock size={14} className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <DollarSign className="text-gray-600" size={32} />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Finance & Payments</h2>
            <p className="text-gray-600">Revenue analytics and payment management</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Revenue Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${todayRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                {revenueGrowth >= 0 ? (
                  <ArrowUpRight className="text-green-600" size={16} />
                ) : (
                  <ArrowDownRight className="text-red-600" size={16} />
                )}
                <span className={`text-sm ml-1 ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(revenueGrowth).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalMonthRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Daily</p>
              <p className="text-2xl font-bold text-gray-900">${avgDailyRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">Per day</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{dailyRevenueData.reduce((sum, day) => sum + day.transactions, 0)}</p>
              <p className="text-sm text-gray-500 mt-2">This month</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <CreditCard className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Daily Revenue Trend</h3>
          <div className="flex items-center space-x-2">
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option value="30">Last 30 days</option>
              <option value="7">Last 7 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                labelStyle={{ color: '#374151' }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#1f2937" 
                strokeWidth={3}
                dot={{ fill: '#1f2937', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#1f2937', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                <Eye size={14} />
                <span>View All</span>
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(transaction.status)}
                    <div>
                      <p className="font-medium text-gray-900">{transaction.customer}</p>
                      <p className="text-sm text-gray-500">{transaction.id} • {transaction.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${transaction.amount}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">{transaction.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods Distribution</h3>
          <div className="space-y-4">
            {[
              { method: 'Credit Card', percentage: 45, amount: '$12,450', color: 'bg-blue-500' },
              { method: 'PayPal', percentage: 25, amount: '$6,890', color: 'bg-green-500' },
              { method: 'Apple Pay', percentage: 15, amount: '$4,120', color: 'bg-gray-900' },
              { method: 'Cash', percentage: 10, amount: '$2,780', color: 'bg-orange-500' },
              { method: 'Bank Transfer', percentage: 5, amount: '$1,390', color: 'bg-purple-500' }
            ].map((item) => (
              <div key={item.method} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm font-medium text-gray-900">{item.method}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-16 text-right">{item.percentage}%</span>
                  <span className="text-sm font-medium text-gray-900 w-20 text-right">{item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
