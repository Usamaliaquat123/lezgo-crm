import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Bell, 
  Users, 
  MessageSquare, 
  Calendar, 
  Target, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  TrendingUp,
  Filter,
  Plus,
  Edit,
  Trash2,
  Search,
} from 'lucide-react';
import NotificationTemplates from '../components/NotificationTemplates';
import apiClient, { handleApiError } from '../utils/apiClient';
import { useAuth } from '../contexts/AuthContext';

const PushNotificationPage = () => {
  const { user, hasAnyRole } = useAuth();
  const [activeTab, setActiveTab] = useState('send');
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    targetAudience: 'all',
    scheduleType: 'now',
    scheduleDate: '',
    scheduleTime: '',
    priority: 'normal',
    category: 'general',
    actionUrl: '',
    imageUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [historyLoading, setHistoryLoading] = useState(false);
  const [templatesLoading, setTemplatesLoading] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchStats();
    if (activeTab === 'history') {
      fetchNotificationHistory();
    } else if (activeTab === 'templates') {
      fetchTemplates();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const response = await apiClient.getNotificationStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchNotificationHistory = async () => {
    setHistoryLoading(true);
    try {
      const response = await apiClient.getNotifications({
        page: 1,
        limit: 20,
        sortBy: 'sentAt',
        sortOrder: 'desc'
      });
      if (response.success) {
        setNotificationHistory(response.data.notifications);
      }
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchTemplates = async () => {
    setTemplatesLoading(true);
    try {
      const response = await apiClient.getNotificationTemplates();
      if (response.success) {
        setTemplates(response.data.templates);
      }
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setTemplatesLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNotificationForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await apiClient.sendNotification(notificationForm);
      
      if (response.success) {
        setSuccess(response.message);
        // Reset form
        setNotificationForm({
          title: '',
          message: '',
          targetAudience: 'all',
          scheduleType: 'now',
          scheduleDate: '',
          scheduleTime: '',
          priority: 'normal',
          category: 'general',
          actionUrl: '',
          imageUrl: ''
        });
        // Refresh stats and history
        fetchStats();
        if (activeTab === 'history') {
          fetchNotificationHistory();
        }
      }
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTemplate = (template) => {
    setNotificationForm(prev => ({
      ...prev,
      title: template.title,
      message: template.message,
      category: template.category,
      priority: template.priority || 'normal'
    }));
    setActiveTab('send');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={16} />;
      case 'failed':
        return <AlertCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'promotion':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300';
      case 'reminder':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
      case 'announcement':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'alert':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  // Check permissions
  if (!hasAnyRole(['Admin', 'Manager'])) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            You don't have permission to access push notifications.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Bell className="text-gray-600 dark:text-gray-400" size={32} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Push Notifications</h2>
          <p className="text-gray-600 dark:text-gray-400">Send notifications to your mobile app users</p>
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" size={16} />
            <p className="ml-3 text-red-800 dark:text-red-200 text-sm">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-start">
            <CheckCircle className="text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" size={16} />
            <p className="ml-3 text-green-800 dark:text-green-200 text-sm">{success}</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats ? stats.totalSent.toLocaleString() : '...'}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Send className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="text-green-500 mr-1" size={14} />
            <span className="text-green-600 dark:text-green-400">
              +{stats ? stats.growth?.totalSent : 0}%
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats ? `${stats.openRate}%` : '...'}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Eye className="text-green-600 dark:text-green-400" size={20} />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="text-green-500 mr-1" size={14} />
            <span className="text-green-600 dark:text-green-400">
              +{stats ? stats.growth?.openRate : 0}%
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Click Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats ? `${stats.clickRate}%` : '...'}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Target className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="text-green-500 mr-1" size={14} />
            <span className="text-green-600 dark:text-green-400">
              +{stats ? stats.growth?.clickRate : 0}%
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats ? stats.activeUsers.toLocaleString() : '...'}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Users className="text-orange-600 dark:text-orange-400" size={20} />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="text-green-500 mr-1" size={14} />
            <span className="text-green-600 dark:text-green-400">
              +{stats ? stats.growth?.activeUsers : 0}%
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('send')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'send'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Send className="inline mr-2" size={16} />
              Send Notification
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Search className="inline mr-2" size={16} />
              Templates
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Clock className="inline mr-2" size={16} />
              History
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'send' && (
            <form onSubmit={handleSendNotification} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Notification Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={notificationForm.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter notification title"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={notificationForm.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter notification message"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Category
                        </label>
                        <select
                          name="category"
                          value={notificationForm.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="general">General</option>
                          <option value="promotion">Promotion</option>
                          <option value="reminder">Reminder</option>
                          <option value="announcement">Announcement</option>
                          <option value="alert">Alert</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Priority
                        </label>
                        <select
                          name="priority"
                          value={notificationForm.priority}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="low">Low</option>
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Targeting */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Targeting & Scheduling</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Target Audience
                        </label>
                        <select
                          name="targetAudience"
                          value={notificationForm.targetAudience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="all">All Users</option>
                          <option value="active">Active Users</option>
                          <option value="new">New Users</option>
                          <option value="premium">Premium Users</option>
                          <option value="inactive">Inactive Users</option>
                          <option value="custom">Custom Segment</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Schedule Type
                        </label>
                        <select
                          name="scheduleType"
                          value={notificationForm.scheduleType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="now">Send Now</option>
                          <option value="scheduled">Schedule for Later</option>
                        </select>
                      </div>

                      {notificationForm.scheduleType === 'scheduled' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Schedule Date
                            </label>
                            <input
                              type="date"
                              name="scheduleDate"
                              value={notificationForm.scheduleDate}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Schedule Time
                            </label>
                            <input
                              type="time"
                              name="scheduleTime"
                              value={notificationForm.scheduleTime}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Action URL (Optional)
                        </label>
                        <input
                          type="url"
                          name="actionUrl"
                          value={notificationForm.actionUrl}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://example.com/action"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Image URL (Optional)
                        </label>
                        <input
                          type="url"
                          name="imageUrl"
                          value={notificationForm.imageUrl}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-w-sm">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bell className="text-white" size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {notificationForm.title || 'Notification Title'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {notificationForm.message || 'Notification message will appear here...'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">LezGo Car Rental • now</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !notificationForm.title || !notificationForm.message}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>{notificationForm.scheduleType === 'now' ? 'Send Now' : 'Schedule'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'templates' && (
            <div>
              {templatesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">Loading templates...</span>
                </div>
              ) : (
                <NotificationTemplates 
                  templates={templates}
                  onSelectTemplate={handleSelectTemplate} 
                />
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search notifications..."
                      className="pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Filter size={16} />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              {historyLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">Loading notifications...</span>
                </div>
              ) : notificationHistory.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No notifications yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Start by sending your first notification to your users.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notificationHistory.map((notification) => (
                    <div key={notification.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {notification.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(notification.category)}`}>
                              {notification.category}
                            </span>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(notification.status)}
                              <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                {notification.status}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                            <span>Target: {notification.targetAudience}</span>
                            <span>Sent: {new Date(notification.sentAt).toLocaleString()}</span>
                            <span>Recipients: {notification.recipients?.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Analytics */}
                      {notification.opened !== undefined && (
                        <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {notification.opened?.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Opened</div>
                            <div className="text-xs text-green-600 dark:text-green-400">
                              {notification.recipients ? ((notification.opened / notification.recipients) * 100).toFixed(1) : 0}%
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {notification.clicked?.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Clicked</div>
                            <div className="text-xs text-blue-600 dark:text-blue-400">
                              {notification.recipients ? ((notification.clicked / notification.recipients) * 100).toFixed(1) : 0}%
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {notification.opened && notification.clicked ? ((notification.clicked / notification.opened) * 100).toFixed(1) : 0}%
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">CTR</div>
                            <div className="text-xs text-purple-600 dark:text-purple-400">
                              Click-through rate
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PushNotificationPage;
