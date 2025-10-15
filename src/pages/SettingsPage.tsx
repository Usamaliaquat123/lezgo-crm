import React from 'react';
import { Settings, User, Bell, Shield, Globe, Palette, Database, LucideIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SettingItem {
  label: string;
  description: string;
}

interface SettingSection {
  title: string;
  icon: LucideIcon;
  items: SettingItem[];
}

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const settingSections: SettingSection[] = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Personal Information', description: 'Update your profile details' },
        { label: 'Change Password', description: 'Update your account password' },
        { label: 'Two-Factor Authentication', description: 'Add an extra layer of security' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', description: 'Manage email alert preferences' },
        { label: 'SMS Alerts', description: 'Configure SMS notification settings' },
        { label: 'Push Notifications', description: 'Control browser notifications' }
      ]
    },
    {
      title: 'System Settings',
      icon: Settings,
      items: [
        { label: 'General Preferences', description: 'Configure system defaults' },
        { label: 'Data Backup', description: 'Manage automatic backups' },
        { label: 'API Configuration', description: 'Set up third-party integrations' }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Access Control', description: 'Manage user permissions' },
        { label: 'Session Management', description: 'Control active sessions' },
        { label: 'Audit Logs', description: 'View system activity logs' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="text-gray-600 dark:text-gray-400" size={32} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your system preferences and configurations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Icon className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h3>
              </div>
              
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white">{item.label}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Globe size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-gray-900 dark:text-white">Language</span>
            </div>
            <select className="bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm text-gray-900 dark:text-white">
              <option>English</option>
              <option>Arabic</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Palette size={20} className="text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-gray-900 dark:text-white">Theme</span>
            </div>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
              className="bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm text-gray-900 dark:text-white"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Database size={20} className="text-green-600 dark:text-green-400" />
              <span className="font-medium text-gray-900 dark:text-white">Auto Backup</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

