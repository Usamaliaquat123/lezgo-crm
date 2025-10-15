import { ApiResponse } from '../types';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

interface ApiError extends Error {
  status?: number;
  data?: any;
}

class ApiClient {
  private baseURL: string;
  private refreshPromise: Promise<string> | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get stored tokens
  getTokens(): Tokens {
    return {
      accessToken: localStorage.getItem('lezgo_access_token'),
      refreshToken: localStorage.getItem('lezgo_refresh_token'),
    };
  }

  // Set new access token
  setAccessToken(token: string): void {
    localStorage.setItem('lezgo_access_token', token);
  }

  // Clear all auth data
  clearAuth(): void {
    localStorage.removeItem('lezgo_access_token');
    localStorage.removeItem('lezgo_refresh_token');
    localStorage.removeItem('lezgo_user');
  }

  // Refresh access token
  async refreshToken(): Promise<string> {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const { refreshToken } = this.getTokens();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    this.refreshPromise = (async () => {
      const result = await this.makeRequest('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        skipAuth: true,
      });

      if (result.success) {
        this.setAccessToken(result.data.accessToken);
        return result.data.accessToken;
      } else {
        throw new Error('Token refresh failed');
      }
    })();

    try {
      return await this.refreshPromise;
    } catch (error) {
      this.clearAuth();
      window.location.href = '/login';
      throw error;
    } finally {
      this.refreshPromise = null;
    }
  }

  // Make HTTP request with automatic token handling
  async makeRequest<T = any>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const { accessToken } = this.getTokens();

    // Default headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add authorization header if token exists and not skipped
    if (accessToken && !options.skipAuth) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Merge with options headers
    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    const config: RequestInit = {
      ...options,
      headers,
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
          headers['Authorization'] = `Bearer ${newToken}`;

          const retryResponse = await fetch(url, { ...config, headers });
          return await this.handleResponse<T>(retryResponse);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          this.clearAuth();
          window.location.href = '/login';
          throw refreshError;
        }
      }

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection.');
      }
      throw error;
    }
  }

  // Handle response and parse JSON
  async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || `HTTP ${response.status}`) as ApiError;
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } else {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response as any;
    }
  }

  // Convenience methods
  async get<T = any>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T = any>(endpoint: string, data: any = null, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T = any>(endpoint: string, data: any = null, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T = any>(endpoint: string, data: any = null, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T = any>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // Authentication specific methods
  async login(credentials: { email: string; password: string }): Promise<ApiResponse> {
    return this.post('/auth/login', credentials, { skipAuth: true });
  }

  async register(userData: any): Promise<ApiResponse> {
    return this.post('/auth/register', userData, { skipAuth: true });
  }

  async logout(): Promise<void> {
    const { refreshToken } = this.getTokens();
    try {
      await this.post('/auth/logout', { refreshToken });
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      this.clearAuth();
    }
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    return this.post('/auth/forgot-password', { email }, { skipAuth: true });
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse> {
    return this.post('/auth/reset-password', { token, password }, { skipAuth: true });
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
    return this.post('/auth/change-password', { currentPassword, newPassword });
  }

  async getProfile(): Promise<ApiResponse> {
    return this.get('/auth/profile');
  }

  async updateProfile(profileData: any): Promise<ApiResponse> {
    return this.put('/auth/profile', profileData);
  }

  async getSessions(): Promise<ApiResponse> {
    return this.get('/auth/sessions');
  }

  async getAuthConfig(): Promise<ApiResponse> {
    return this.get('/auth/config', { skipAuth: true });
  }

  // Notification API methods
  async getNotificationStats(): Promise<ApiResponse> {
    return this.get('/notifications/stats');
  }

  async sendNotification(notificationData: any): Promise<ApiResponse> {
    return this.post('/notifications/send', notificationData);
  }

  async getNotifications(params: Record<string, any> = {}): Promise<ApiResponse> {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/notifications?${queryString}` : '/notifications';
    return this.get(endpoint);
  }

  async getScheduledNotifications(): Promise<ApiResponse> {
    return this.get('/notifications/scheduled');
  }

  async getNotificationTemplates(params: Record<string, any> = {}): Promise<ApiResponse> {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/notifications/templates?${queryString}` : '/notifications/templates';
    return this.get(endpoint);
  }

  async createNotificationTemplate(templateData: any): Promise<ApiResponse> {
    return this.post('/notifications/templates', templateData);
  }

  async updateNotificationTemplate(id: string, templateData: any): Promise<ApiResponse> {
    return this.put(`/notifications/templates/${id}`, templateData);
  }

  async deleteNotificationTemplate(id: string): Promise<ApiResponse> {
    return this.delete(`/notifications/templates/${id}`);
  }

  async getNotification(id: string): Promise<ApiResponse> {
    return this.get(`/notifications/${id}`);
  }

  async deleteNotification(id: string): Promise<ApiResponse> {
    return this.delete(`/notifications/${id}`);
  }

  async getNotificationConfig(): Promise<ApiResponse> {
    return this.get('/notifications/config/options');
  }

  // File upload helper
  async uploadFile(endpoint: string, file: File, additionalData: Record<string, any> = {}): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('file', file);

    // Add additional form data
    Object.keys(additionalData).forEach((key) => {
      formData.append(key, additionalData[key]);
    });

    const { accessToken } = this.getTokens();
    const headers: Record<string, string> = {};

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return this.makeRequest(endpoint, {
      method: 'POST',
      body: formData,
      headers,
      skipAuth: false,
    });
  }

  // Utility method to check if user is authenticated
  isAuthenticated(): boolean {
    const { accessToken } = this.getTokens();
    return !!accessToken;
  }

  // Utility method to get user data from storage
  getCurrentUser(): any {
    const userData = localStorage.getItem('lezgo_user');
    return userData ? JSON.parse(userData) : null;
  }

  // Utility method to check user role
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Utility method to check if user has any of the specified roles
  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return roles.includes(user?.role);
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();

// Error handler for API responses
export const handleApiError = (error: ApiError): string => {
  if (error.status) {
    switch (error.status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Authentication required. Please log in.';
      case 403:
        return "Access denied. You don't have permission for this action.";
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
export const formatValidationErrors = (errors: any[]): Record<string, string> => {
  if (!errors || !Array.isArray(errors)) {
    return {};
  }

  return errors.reduce((acc, error) => {
    acc[error.path] = error.msg;
    return acc;
  }, {} as Record<string, string>);
};

export default apiClient;

