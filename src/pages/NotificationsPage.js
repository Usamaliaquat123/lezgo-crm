import React from 'react';
import { Bell, Mail, MessageSquare, AlertTriangle } from 'lucide-react';

const NotificationsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Bell className="text-gray-600" size={32} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-600">Manage alerts and communication preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="text-blue-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
          </div>
          <p className="text-gray-500">Configure system-wide notifications and alerts.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Mail className="text-green-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
          </div>
          <p className="text-gray-500">Manage email notification templates and settings.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="text-purple-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">SMS Alerts</h3>
          </div>
          <p className="text-gray-500">Configure SMS notification preferences and templates.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Emergency Alerts</h3>
          </div>
          <p className="text-gray-500">Set up critical alerts for emergency situations.</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
