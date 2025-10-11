// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.refreshPromise = null;
  }

  // Get stored tokens
  getTokens() {
    return {
      accessToken: localStorage.getItem('lezgo_access_token'),
      refreshToken: localStorage.getItem('lezgo_refresh_token')
    };
  }

  // Set new access token
  setAccessToken(token) {
    localStorage.setItem('lezgo_access_token', token);
  }

  // Clear all auth data
  clearAuth() {
    localStorage.removeItem('lezgo_access_token');
    localStorage.removeItem('lezgo_refresh_token');
    localStorage.removeItem('lezgo_user');
  }

  // Refresh access token
  async refreshToken() {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const { refreshToken } = this.getTokens();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    this.refreshPromise = this.makeRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      skipAuth: true
    });

    try {
      const result = await this.refreshPromise;
      if (result.success) {
        this.setAccessToken(result.data.accessToken);
        return result.data.accessToken;
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      this.clearAuth();
      window.location.href = '/login';
      throw error;
    } finally {
      this.refreshPromise = null;
    }
  }

  // Make HTTP request with automatic token handling
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const { accessToken } = this.getTokens();

    // Default headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    // Add authorization header if token exists and not skipped
    if (accessToken && !options.skipAuth) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const config = {
      ...options,
      headers
    };

    try {
      const response = await fetch(url, config);
      
      // Handle token expiration
      if (response.status === 403 && !options.skipAuth) {
        try {
          // Try to refresh token
          await this.refreshToken();
          
          // Retry request with new token
          const { accessToken: newToken } = this.getTokens();
          config.headers.Authorization = `Bearer ${newToken}`;
          
          const retryResponse = await fetch(url, config);
          return await this.handleResponse(retryResponse);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          this.clearAuth();
          window.location.href = '/login';
          throw refreshError;
        }
      }

      return await this.handleResponse(response);
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection.');
      }
      throw error;
    }
  }

  // Handle response and parse JSON
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        const error = new Error(data.message || `HTTP ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
      }
      
      return data;
    } else {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response;
    }
  }

  // Convenience methods
  async get(endpoint, options = {}) {
    return this.makeRequest(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data = null, options = {}) {
    return this.makeRequest(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async put(endpoint, data = null, options = {}) {
    return this.makeRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async patch(endpoint, data = null, options = {}) {
    return this.makeRequest(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async delete(endpoint, options = {}) {
    return this.makeRequest(endpoint, { ...options, method: 'DELETE' });
  }

  // Authentication specific methods
  async login(credentials) {
    return this.post('/auth/login', credentials, { skipAuth: true });
  }

  async register(userData) {
    return this.post('/auth/register', userData, { skipAuth: true });
  }

  async logout() {
    const { refreshToken } = this.getTokens();
    try {
      await this.post('/auth/logout', { refreshToken });
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      this.clearAuth();
    }
  }

  async forgotPassword(email) {
    return this.post('/auth/forgot-password', { email }, { skipAuth: true });
  }

  async resetPassword(token, password) {
    return this.post('/auth/reset-password', { token, password }, { skipAuth: true });
  }

  async changePassword(currentPassword, newPassword) {
    return this.post('/auth/change-password', { currentPassword, newPassword });
  }

  async getProfile() {
    return this.get('/auth/profile');
  }

  async updateProfile(profileData) {
    return this.put('/auth/profile', profileData);
  }

  async getSessions() {
    return this.get('/auth/sessions');
  }

  async getAuthConfig() {
    return this.get('/auth/config', { skipAuth: true });
  }

  // Notification API methods
  async getNotificationStats() {
    return this.get('/notifications/stats');
  }

  async sendNotification(notificationData) {
    return this.post('/notifications/send', notificationData);
  }

  async getNotifications(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/notifications?${queryString}` : '/notifications';
    return this.get(endpoint);
  }

  async getScheduledNotifications() {
    return this.get('/notifications/scheduled');
  }

  async getNotificationTemplates(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/notifications/templates?${queryString}` : '/notifications/templates';
    return this.get(endpoint);
  }

  async createNotificationTemplate(templateData) {
    return this.post('/notifications/templates', templateData);
  }

  async updateNotificationTemplate(id, templateData) {
    return this.put(`/notifications/templates/${id}`, templateData);
  }

  async deleteNotificationTemplate(id) {
    return this.delete(`/notifications/templates/${id}`);
  }

  async getNotification(id) {
    return this.get(`/notifications/${id}`);
  }

  async deleteNotification(id) {
    return this.delete(`/notifications/${id}`);
  }

  async getNotificationConfig() {
    return this.get('/notifications/config/options');
  }

  // File upload helper
  async uploadFile(endpoint, file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add additional form data
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    const { accessToken } = this.getTokens();
    const headers = {};
    
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return this.makeRequest(endpoint, {
      method: 'POST',
      body: formData,
      headers,
      skipAuth: false
    });
  }

  // Utility method to check if user is authenticated
  isAuthenticated() {
    const { accessToken } = this.getTokens();
    return !!accessToken;
  }

  // Utility method to get user data from storage
  getCurrentUser() {
    const userData = localStorage.getItem('lezgo_user');
    return userData ? JSON.parse(userData) : null;
  }

  // Utility method to check user role
  hasRole(role) {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Utility method to check if user has any of the specified roles
  hasAnyRole(roles) {
    const user = this.getCurrentUser();
    return roles.includes(user?.role);
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();

// Error handler for API responses
export const handleApiError = (error) => {
  if (error.status) {
    switch (error.status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Authentication required. Please log in.';
      case 403:
        return 'Access denied. You don\'t have permission for this action.';
      case 404:
        return 'Resource not found.';
      case 409:
        return 'Conflict. The resource already exists.';
      case 423:
        return 'Account is temporarily locked. Please try again later.';
      case 429:
        return 'Too many requests. Please wait and try again.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }
  return error.message || 'Network error. Please check your connection.';
};

// Utility function to format validation errors
export const formatValidationErrors = (errors) => {
  if (!errors || !Array.isArray(errors)) {
    return {};
  }

  return errors.reduce((acc, error) => {
    acc[error.path] = error.msg;
    return acc;
  }, {});
};

export default apiClient;
