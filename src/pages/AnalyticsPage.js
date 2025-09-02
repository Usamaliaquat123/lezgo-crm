import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <BarChart3 className="text-gray-600" size={32} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-600">Advanced analytics and business insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
          </div>
          <p className="text-gray-500">Detailed revenue analysis and forecasting tools coming soon.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <PieChart className="text-green-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Fleet Performance</h3>
          </div>
          <p className="text-gray-500">Comprehensive fleet utilization and performance metrics.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity className="text-purple-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Customer Insights</h3>
          </div>
          <p className="text-gray-500">Customer behavior analysis and segmentation tools.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="text-orange-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Operational Reports</h3>
          </div>
          <p className="text-gray-500">Detailed operational reports and KPI tracking.</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
