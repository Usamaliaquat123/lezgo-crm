import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterData } from '../types';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Types
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; accessToken: string; refreshToken: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'TOKEN_REFRESH'; payload: { accessToken: string } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{
    success: boolean;
    data?: any;
    message?: string;
    attemptsRemaining?: number;
  }>;
  register: (userData: RegisterData) => Promise<{
    success: boolean;
    message?: string;
    errors?: any;
  }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (token: string, password: string) => Promise<{
    success: boolean;
    message?: string;
    errors?: any;
  }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{
    success: boolean;
    message?: string;
  }>;
  updateProfile: (profileData: any) => Promise<{
    success: boolean;
    message?: string;
    user?: User;
  }>;
  refreshAccessToken: (refreshToken: string) => Promise<boolean>;
  clearError: () => void;
  isAdmin: () => boolean;
  isManager: () => boolean;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

// Authentication Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth State Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: null,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'TOKEN_REFRESH':
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Initial State
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: true,
  error: null,
};

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for stored authentication on app load
  useEffect(() => {
    const checkStoredAuth = async () => {
      try {
        const accessToken = localStorage.getItem('lezgo_access_token');
        const refreshToken = localStorage.getItem('lezgo_refresh_token');
        const user = localStorage.getItem('lezgo_user');

        if (accessToken && refreshToken && user) {
          // Verify token validity by making a profile request
          const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const result = await response.json();
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user: result.data.user,
                accessToken,
                refreshToken,
              },
            });
          } else if (response.status === 403) {
            // Token expired, try to refresh
            const refreshed = await refreshAccessToken(refreshToken);
            if (!refreshed) {
              clearStoredAuth();
            }
          } else {
            clearStoredAuth();
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        clearStoredAuth();
      }
    };

    checkStoredAuth();
  }, []);

  // Helper function to clear stored auth data
  const clearStoredAuth = (): void => {
    localStorage.removeItem('lezgo_access_token');
    localStorage.removeItem('lezgo_refresh_token');
    localStorage.removeItem('lezgo_user');
    dispatch({ type: 'LOGOUT' });
  };

  // Helper function to store auth data
  const storeAuthData = (data: { user: User; accessToken: string; refreshToken: string }): void => {
    localStorage.setItem('lezgo_access_token', data.accessToken);
    localStorage.setItem('lezgo_refresh_token', data.refreshToken);
    localStorage.setItem('lezgo_user', JSON.stringify(data.user));
  };

  // Refresh Access Token
  const refreshAccessToken = async (refreshToken: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const result = await response.json();
        const newAccessToken = result.data.accessToken;

        localStorage.setItem('lezgo_access_token', newAccessToken);
        dispatch({
          type: 'TOKEN_REFRESH',
          payload: { accessToken: newAccessToken },
        });

        return true;
      } else {
        clearStoredAuth();
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      clearStoredAuth();
      return false;
    }
  };

  // Login Function
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (result.success) {
        const authData = result.data;
        storeAuthData(authData);

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: authData,
        });

        return { success: true, data: authData };
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: result.message || 'Login failed',
        });

        return {
          success: false,
          message: result.message,
          attemptsRemaining: result.attemptsRemaining,
        };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection and try again.';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage,
      });

      return { success: false, message: errorMessage };
    }
  };

  // Register Function
  const register = async (userData: RegisterData) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      dispatch({ type: 'SET_LOADING', payload: false });

      return {
        success: result.success,
        message: result.message,
        errors: result.errors || null,
      };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: null,
      };
    }
  };

  // Logout Function
  const logout = async (): Promise<void> => {
    try {
      if (state.refreshToken) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.accessToken}`,
          },
          body: JSON.stringify({ refreshToken: state.refreshToken }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearStoredAuth();
    }
  };

  // Forgot Password Function
  const forgotPassword = async (email: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      dispatch({ type: 'SET_LOADING', payload: false });

      return {
        success: result.success,
        message: result.message,
      };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  };

  // Reset Password Function
  const resetPassword = async (token: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const result = await response.json();
      dispatch({ type: 'SET_LOADING', payload: false });

      return {
        success: result.success,
        message: result.message,
        errors: result.errors || null,
      };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  };

  // Change Password Function
  const changePassword = async (currentPassword: string, newPassword: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.accessToken}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const result = await response.json();
      dispatch({ type: 'SET_LOADING', payload: false });

      if (result.success) {
        // Clear tokens to force re-login
        clearStoredAuth();
      }

      return {
        success: result.success,
        message: result.message,
      };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  };

  // Update Profile Function
  const updateProfile = async (profileData: any) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.accessToken}`,
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();
      dispatch({ type: 'SET_LOADING', payload: false });

      if (result.success) {
        dispatch({
          type: 'UPDATE_PROFILE',
          payload: result.data.user,
        });

        // Update stored user data
        localStorage.setItem('lezgo_user', JSON.stringify(result.data.user));
      }

      return {
        success: result.success,
        message: result.message,
        user: result.data?.user,
      };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  };

  // Clear Error Function
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Context Value
  const contextValue: AuthContextType = {
    // State
    ...state,

    // Actions
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile,
    refreshAccessToken,
    clearError,

    // Helper functions
    isAdmin: () => state.user?.role === 'admin',
    isManager: () => state.user?.role === 'admin' || state.user?.role === 'manager',
    hasRole: (role: string) => state.user?.role === role,
    hasAnyRole: (roles: string[]) => (state.user?.role ? roles.includes(state.user.role) : false),
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom Hook to use Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-Order Component for protected routes
export const withAuth = (Component: React.ComponentType<any>, requiredRoles: string[] = []) => {
  return function AuthenticatedComponent(props: any) {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h2>
            <p className="text-gray-600 dark:text-gray-300">Please log in to access this page.</p>
          </div>
        </div>
      );
    }

    if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Insufficient Permissions</h2>
            <p className="text-gray-600 dark:text-gray-300">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};

export default AuthContext;

