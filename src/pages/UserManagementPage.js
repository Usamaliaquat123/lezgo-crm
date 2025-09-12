import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  X, 
  Shield, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Calendar,
  Key,
  UserCheck,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const UserManagementPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 'USR001',
      name: 'Ahmed Al-Mansouri',
      email: 'ahmed.admin@lezgo.com',
      phone: '+971 50 123 4567',
      role: 'Admin',
      status: 'active',
      department: 'Management',
      joinDate: '2023-01-15',
      lastLogin: '2024-01-20',
      permissions: ['all'],
      avatar: null
    },
    {
      id: 'USR002',
      name: 'Sarah Johnson',
      email: 'sarah.manager@lezgo.com',
      phone: '+971 55 987 6543',
      role: 'Manager',
      status: 'active',
      department: 'Operations',
      joinDate: '2023-03-22',
      lastLogin: '2024-01-19',
      permissions: ['dashboard', 'bookings', 'customers', 'fleet', 'analytics'],
      avatar: null
    },
    {
      id: 'USR003',
      name: 'Mohammed Hassan',
      email: 'mohammed.agent@lezgo.com',
      phone: '+971 52 456 7890',
      role: 'Agent',
      status: 'active',
      department: 'Customer Service',
      joinDate: '2023-06-10',
      lastLogin: '2024-01-18',
      permissions: ['dashboard', 'bookings', 'customers'],
      avatar: null
    },
    {
      id: 'USR004',
      name: 'Emma Wilson',
      email: 'emma.support@lezgo.com',
      phone: '+971 56 789 0123',
      role: 'Support',
      status: 'active',
      department: 'Customer Service',
      joinDate: '2023-09-05',
      lastLogin: '2024-01-17',
      permissions: ['dashboard', 'customers'],
      avatar: null
    },
    {
      id: 'USR005',
      name: 'Omar Abdullah',
      email: 'omar.tech@lezgo.com',
      phone: '+971 54 234 5678',
      role: 'Technician',
      status: 'inactive',
      department: 'Maintenance',
      joinDate: '2023-11-18',
      lastLogin: '2024-01-10',
      permissions: ['dashboard', 'fleet', 'car-controls'],
      avatar: null
    }
  ]);

  const userStats = [
    { label: 'Total Users', value: users.length, color: 'blue' },
    { label: 'Active Users', value: users.filter(u => u.status === 'active').length, color: 'green' },
    { label: 'Inactive Users', value: users.filter(u => u.status === 'inactive').length, color: 'red' },
    { label: 'Admins', value: users.filter(u => u.role === 'Admin').length, color: 'purple' }
  ];

  const roles = [
    {
      name: 'Admin',
      description: 'Full system access',
      permissions: ['all'],
      color: 'red'
    },
    {
      name: 'Manager',
      description: 'Management level access',
      permissions: ['dashboard', 'bookings', 'customers', 'fleet', 'analytics', 'payments'],
      color: 'blue'
    },
    {
      name: 'Agent',
      description: 'Customer service access',
      permissions: ['dashboard', 'bookings', 'customers'],
      color: 'green'
    },
    {
      name: 'Support',
      description: 'Basic support access',
      permissions: ['dashboard', 'customers'],
      color: 'yellow'
    },
    {
      name: 'Technician',
      description: 'Fleet maintenance access',
      permissions: ['dashboard', 'fleet', 'car-controls'],
      color: 'purple'
    }
  ];

  const allPermissions = [
    { id: 'dashboard', name: 'Dashboard', description: 'View dashboard' },
    { id: 'bookings', name: 'Bookings', description: 'Manage bookings' },
    { id: 'customers', name: 'Customers', description: 'Manage customers' },
    { id: 'fleet', name: 'Fleet Management', description: 'Manage vehicle fleet' },
    { id: 'car-controls', name: 'Car Controls', description: 'Remote car controls' },
    { id: 'analytics', name: 'Analytics', description: 'View analytics' },
    { id: 'payments', name: 'Payments', description: 'Manage payments' },
    { id: 'user-management', name: 'User Management', description: 'Manage users' },
    { id: 'settings', name: 'Settings', description: 'System settings' }
  ];

  const getRoleColor = (role) => {
    const roleConfig = roles.find(r => r.name === role);
    switch (roleConfig?.color) {
      case 'red': return 'bg-red-100 text-red-800';
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'green': return 'bg-green-100 text-green-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'purple': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage users, roles, and permissions</p>
        </div>
        <button 
          onClick={() => setShowAddUser(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          <span>Add User</span>
        </button>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'green' ? 'bg-green-100' :
                stat.color === 'red' ? 'bg-red-100' :
                'bg-purple-100'
              }`}>
                <Users className={`${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'red' ? 'text-red-600' :
                  'text-purple-600'
                }`} size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2 flex-1 min-w-64">
            <Search className="text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search users by name, email, or role..." 
              className="border-0 outline-none text-sm flex-1"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={16} />
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="agent">Agent</option>
              <option value="support">Support</option>
              <option value="technician">Technician</option>
            </select>
          </div>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="text-blue-600" size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900 truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{user.department}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Users className="text-white" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                    <p className="text-cyan-100 text-sm">{selectedUser.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(selectedUser.role)}`}>
                    {selectedUser.role}
                  </span>
                  <button 
                    onClick={() => setSelectedUser(null)}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* User Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Mail className="mr-2" size={16} />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{selectedUser.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium text-gray-900">{selectedUser.department}</p>
                    </div>
                  </div>
                </div>

                {/* Role & Status */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="mr-2" size={16} />
                    Role & Status
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(selectedUser.role)}`}>
                        {selectedUser.role}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Join Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(selectedUser.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Login</p>
                      <p className="font-medium text-gray-900">
                        {new Date(selectedUser.lastLogin).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Key className="mr-2" size={16} />
                  Permissions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {allPermissions.map((permission) => {
                    const hasPermission = selectedUser.permissions.includes('all') || selectedUser.permissions.includes(permission.id);
                    return (
                      <div key={permission.id} className={`flex items-center space-x-2 p-2 rounded-lg ${
                        hasPermission ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {hasPermission ? (
                          <CheckCircle className="text-green-600" size={16} />
                        ) : (
                          <AlertCircle className="text-gray-400" size={16} />
                        )}
                        <span className={`text-sm ${hasPermission ? 'text-green-800' : 'text-gray-600'}`}>
                          {permission.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Edit size={16} />
                  <span>Edit User</span>
                </button>
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Key size={16} />
                  <span>Reset Password</span>
                </button>
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X size={16} />
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUser && (
        <AddUserModal 
          onClose={() => setShowAddUser(false)}
          onAddUser={(newUser) => {
            setUsers([...users, { ...newUser, id: `USR${String(users.length + 1).padStart(3, '0')}` }]);
            setShowAddUser(false);
          }}
          roles={roles}
          allPermissions={allPermissions}
        />
      )}
    </div>
  );
};

// Add User Modal Component
const AddUserModal = ({ onClose, onAddUser, roles, allPermissions }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Agent',
    department: '',
    status: 'active',
    permissions: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedRole = roles.find(r => r.name === formData.role);
    onAddUser({
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0],
      permissions: selectedRole.permissions.includes('all') ? ['all'] : selectedRole.permissions
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Add New User</h2>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Department</option>
                <option value="Management">Management</option>
                <option value="Operations">Operations</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roles.map((role) => (
                  <option key={role.name} value={role.name}>{role.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Role Description */}
          {formData.role && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">
                <strong>{formData.role}:</strong> {roles.find(r => r.name === formData.role)?.description}
              </p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add User
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserManagementPage;
