import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Star,
  Clock,
  Users,
  MessageSquare,
  Search
} from 'lucide-react';

interface NotificationTemplate {
  id: number;
  name: string;
  category: 'booking' | 'reminder' | 'promotion' | 'payment';
  title: string;
  message: string;
  usage: number;
  lastUsed: string;
  isDefault: boolean;
}

interface NotificationTemplatesProps {
  onSelectTemplate: (template: NotificationTemplate) => void;
}

const NotificationTemplates: React.FC<NotificationTemplatesProps> = ({ onSelectTemplate }) => {
  const [templates] = useState<NotificationTemplate[]>([
    {
      id: 1,
      name: 'Booking Confirmation',
      category: 'booking',
      title: 'Booking Confirmed! 🎉',
      message: 'Your booking for {vehicle_name} has been confirmed. Pickup time: {pickup_time}',
      usage: 245,
      lastUsed: '2024-01-15',
      isDefault: true
    },
    {
      id: 2,
      name: 'Booking Reminder',
      category: 'reminder',
      title: 'Pickup Reminder ⏰',
      message: 'Your rental starts in 1 hour. Please arrive at {pickup_location} by {pickup_time}',
      usage: 189,
      lastUsed: '2024-01-14',
      isDefault: true
    },
    {
      id: 3,
      name: 'New Vehicle Available',
      category: 'promotion',
      title: 'New {vehicle_type} Available! 🚗',
      message: 'Check out our latest {vehicle_name} now available for rent. Book now and get 10% off!',
      usage: 156,
      lastUsed: '2024-01-13',
      isDefault: false
    },
    {
      id: 4,
      name: 'Payment Reminder',
      category: 'payment',
      title: 'Payment Due Soon 💳',
      message: 'Your payment of ${amount} is due in 24 hours. Please complete payment to avoid late fees.',
      usage: 98,
      lastUsed: '2024-01-12',
      isDefault: false
    },
    {
      id: 5,
      name: 'Return Reminder',
      category: 'reminder',
      title: 'Return Reminder 🔄',
      message: 'Please return your {vehicle_name} to {return_location} by {return_time}. Thank you!',
      usage: 234,
      lastUsed: '2024-01-15',
      isDefault: true
    },
    {
      id: 6,
      name: 'Special Offer',
      category: 'promotion',
      title: 'Limited Time Offer! 🎁',
      message: 'Get {discount}% off your next booking. Use code: {promo_code}. Valid until {expiry_date}',
      usage: 67,
      lastUsed: '2024-01-10',
      isDefault: false
    }
  ]);

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'booking':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
      case 'reminder':
        return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300';
      case 'promotion':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300';
      case 'payment':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'booking':
        return '📅';
      case 'reminder':
        return '⏰';
      case 'promotion':
        return '🎁';
      case 'payment':
        return '💳';
      default:
        return '📝';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Search className="text-gray-600 dark:text-gray-400" size={24} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Templates</h3>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={16} />
          <span>New Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getCategoryIcon(template.category)}</span>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                  {template.isDefault && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="text-yellow-500" size={12} />
                      <span className="text-xs text-yellow-600 dark:text-yellow-400">Default</span>
                    </div>
                  )}
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                {template.category}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{template.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{template.message}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-1">
                <Users size={12} />
                <span>{template.usage} uses</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={12} />
                <span>{template.lastUsed}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onSelectTemplate(template)}
                className="flex-1 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium"
              >
                Use Template
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Copy size={14} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Edit size={14} />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <MessageSquare className="text-blue-600 dark:text-blue-400 mt-1" size={20} />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Template Variables</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
              Use these variables in your templates to personalize notifications:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-blue-800 dark:text-blue-200">{'{user_name}'}</code>
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-blue-800 dark:text-blue-200">{'{vehicle_name}'}</code>
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-blue-800 dark:text-blue-200">{'{pickup_time}'}</code>
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-blue-800 dark:text-blue-200">{'{return_time}'}</code>
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-blue-800 dark:text-blue-200">{'{amount}'}</code>
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-blue-800 dark:text-blue-200">{'{promo_code}'}</code>
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-blue-800 dark:text-blue-200">{'{pickup_location}'}</code>
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-blue-800 dark:text-blue-200">{'{return_location}'}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTemplates;


