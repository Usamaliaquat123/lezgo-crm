import React, { useState } from 'react';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  AlertTriangle, 
  Settings, 
  Clock, 
  Check, 
  X, 
  Filter,
  Search,
  Eye,
  CheckCircle,
  Info,
  Users,
  Car
} from 'lucide-react';

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'New Booking Request',
      message: 'Customer Ahmed Al-Rashid has requested a booking for Toyota RAV4',
      time: '2 minutes ago',
      read: false,
      priority: 'high',
      icon: Car,
      color: 'blue'
    },
    {
      id: 2,
      type: 'system',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled maintenance will occur tonight at 2:00 AM EST',
      time: '15 minutes ago',
      read: false,
      priority: 'medium',
      icon: Settings,
      color: 'orange'
    },
    {
      id: 3,
      type: 'user',
      title: 'New User Registration',
      message: 'Sarah Johnson has registered as a new customer',
      time: '1 hour ago',
      read: true,
      priority: 'low',
      icon: Users,
      color: 'green'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Vehicle Issue Reported',
      message: 'Mercedes C-Class (U47455) has reported a low fuel warning',
      time: '2 hours ago',
      read: false,
      priority: 'high',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: 5,
      type: 'email',
      title: 'Email Campaign Sent',
      message: 'Monthly newsletter sent to 1,247 subscribers successfully',
      time: '3 hours ago',
      read: true,
      priority: 'low',
      icon: Mail,
      color: 'purple'
    },
    {
      id: 6,
      type: 'booking',
      title: 'Booking Completed',
      message: 'Customer Emma Wilson has completed their booking successfully',
      time: '5 hours ago',
      read: true,
      priority: 'low',
      icon: CheckCircle,
      color: 'green'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsAlerts: true,
    pushNotifications: true,
    emergencyAlerts: true,
    bookingAlerts: true,
    systemAlerts: false
  });

  const notificationStats = [
    { label: 'Total Notifications', value: notifications.length, color: 'blue' },
    { label: 'Unread', value: notifications.filter(n => !n.read).length, color: 'red' },
    { label: 'High Priority', value: notifications.filter(n => n.priority === 'high').length, color: 'orange' },
    { label: 'Today', value: notifications.filter(n => n.time.includes('hour') || n.time.includes('minute')).length, color: 'green' }
  ];

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleSettingToggle = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIconColor = (color) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-blue-100';
      case 'red': return 'text-red-600 bg-red-100';
      case 'green': return 'text-green-600 bg-green-100';
      case 'orange': return 'text-orange-600 bg-orange-100';
      case 'purple': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bell className="text-gray-600" size={32} />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            <p className="text-gray-600">Manage alerts and communication preferences</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleMarkAllAsRead}
            className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Check size={16} />
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      {/* Notification Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {notificationStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'red' ? 'bg-red-100' :
                stat.color === 'orange' ? 'bg-orange-100' :
                'bg-green-100'
              }`}>
                <Bell className={`${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'red' ? 'text-red-600' :
                  stat.color === 'orange' ? 'text-orange-600' :
                  'text-green-600'
                }`} size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex space-x-8 px-6 py-3">
                {[
                  { id: 'all', label: 'All', count: notifications.length },
                  { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
                  { id: 'booking', label: 'Bookings', count: notifications.filter(n => n.type === 'booking').length },
                  { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length },
                  { id: 'alert', label: 'Alerts', count: notifications.filter(n => n.type === 'alert').length }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-gray-900 border-b-2 border-gray-900 pb-2'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        activeTab === tab.id ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="divide-y divide-gray-200">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-500">You're all caught up! No new notifications to show.</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div key={notification.id} className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}>
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${getIconColor(notification.color)}`}>
                          <IconComponent size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(notification.priority)}`}>
                                  {notification.priority}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock size={12} className="mr-1" />
                                {notification.time}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              {!notification.read && (
                                <button
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
                                  title="Mark as read"
                                >
                                  <Eye size={14} />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteNotification(notification.id)}
                                className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                                title="Delete"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="text-gray-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                { key: 'smsAlerts', label: 'SMS Alerts', description: 'Receive SMS for urgent notifications' },
                { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications' },
                { key: 'emergencyAlerts', label: 'Emergency Alerts', description: 'Critical system alerts' },
                { key: 'bookingAlerts', label: 'Booking Alerts', description: 'New booking notifications' },
                { key: 'systemAlerts', label: 'System Alerts', description: 'System maintenance notifications' }
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{setting.label}</h4>
                    <p className="text-xs text-gray-500">{setting.description}</p>
                  </div>
                  <button
                    onClick={() => handleSettingToggle(setting.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notificationSettings[setting.key] ? 'bg-gray-900' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notificationSettings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Bell className="text-gray-600" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Test Notifications</p>
                    <p className="text-xs text-gray-500">Send a test notification</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Settings className="text-gray-600" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Configure Templates</p>
                    <p className="text-xs text-gray-500">Manage notification templates</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="text-gray-600" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Bulk Messages</p>
                    <p className="text-xs text-gray-500">Send messages to all users</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
