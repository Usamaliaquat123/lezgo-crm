import React from 'react';
import { CreditCard, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const PaymentsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <CreditCard className="text-gray-600" size={32} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payments</h2>
          <p className="text-gray-600">Payment processing and financial management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="text-green-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Payment Processing</h3>
          </div>
          <p className="text-gray-500">Secure payment gateway integration and transaction management.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Financial Reports</h3>
          </div>
          <p className="text-gray-500">Comprehensive financial reporting and analytics tools.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="text-orange-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Dispute Management</h3>
          </div>
          <p className="text-gray-500">Handle payment disputes and refund requests efficiently.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CreditCard className="text-purple-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
          </div>
          <p className="text-gray-500">Manage accepted payment methods and gateway settings.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
