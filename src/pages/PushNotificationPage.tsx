import React, { useState } from 'react';
import { Bell, Send, Users, Calendar, Eye, Trash2 } from 'lucide-react';

interface NotificationCampaign {
  id: number;
  title: string;
  message: string;
  audience: string;
  scheduledFor: string;
  status: 'draft' | 'scheduled' | 'sent';
  sentCount?: number;
}

const PushNotificationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('send');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [audience, setAudience] = useState<string>('all');

  const campaigns: NotificationCampaign[] = [
    { id: 1, title: 'Weekend Special Offer', message: 'Get 20% off on all bookings this weekend!', audience: 'All Users', scheduledFor: 'Tomorrow, 9:00 AM', status: 'scheduled' },
    { id: 2, title: 'Booking Confirmation', message: 'Your booking has been confirmed', audience: 'Recent Bookers', scheduledFor: 'Sent 2 hours ago', status: 'sent', sentCount: 234 },
    { id: 3, title: 'New Vehicle Added', message: 'Check out our new Tesla Model Y', audience: 'Premium Users', scheduledFor: 'Draft', status: 'draft' },
  ];

  const handleSend = () => {
    console.log('Sending notification:', { title, message, audience });
    setTitle('');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Push Notifications</h2>
          <p className="text-gray-600 dark:text-gray-400">Send notifications to your users</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-700">
        {['send', 'campaigns', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'send' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compose Notification</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Notification title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Notification message"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Audience</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active Users</option>
                  <option value="inactive">Inactive Users</option>
                  <option value="premium">Premium Users</option>
                </select>
              </div>
              <button
                onClick={handleSend}
                disabled={!title || !message}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <Send size={16} />
                <span>Send Notification</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Bell className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{title || 'Notification Title'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{message || 'Your notification message will appear here'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Just now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(activeTab === 'campaigns' || activeTab === 'history') && (
        <div className="space-y-4">
          {campaigns
            .filter(c => activeTab === 'campaigns' ? c.status !== 'sent' : c.status === 'sent')
            .map((campaign) => (
              <div key={campaign.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{campaign.title}</h4>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'sent' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{campaign.message}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                      <span className="flex items-center">
                        <Users size={14} className="mr-1" />
                        {campaign.audience}
                      </span>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {campaign.scheduledFor}
                      </span>
                      {campaign.sentCount && (
                        <span>Sent to {campaign.sentCount} users</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PushNotificationPage;

