import React, { createContext, useContext, useReducer, useEffect } from 'react';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Authentication Context
const AuthContext = createContext();

// Auth State Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        loading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: null
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    case 'TOKEN_REFRESH':
      return {
        ...state,
        accessToken: action.payload.accessToken
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Initial State
const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: true,
  error: null
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
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
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const result = await response.json();
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user: result.data.user,
                accessToken,
                refreshToken
              }
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
  const clearStoredAuth = () => {
    localStorage.removeItem('lezgo_access_token');
    localStorage.removeItem('lezgo_refresh_token');
    localStorage.removeItem('lezgo_user');
    dispatch({ type: 'LOGOUT' });
  };

  // Helper function to store auth data
  const storeAuthData = (data) => {
    localStorage.setItem('lezgo_access_token', data.accessToken);
    localStorage.setItem('lezgo_refresh_token', data.refreshToken);
    localStorage.setItem('lezgo_user', JSON.stringify(data.user));
  };

  // Refresh Access Token
  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      });

      if (response.ok) {
        const result = await response.json();
        const newAccessToken = result.data.accessToken;
        
        localStorage.setItem('lezgo_access_token', newAccessToken);
        dispatch({
          type: 'TOKEN_REFRESH',
          payload: { accessToken: newAccessToken }
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
  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();

      if (result.success) {
        const authData = result.data;
        storeAuthData(authData);
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: authData
        });
        
        return { success: true, data: authData };
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: result.message || 'Login failed'
        });
        
        return { 
          success: false, 
          message: result.message,
          attemptsRemaining: result.attemptsRemaining
        };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection and try again.';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });
      
      return { success: false, message: errorMessage };
    }
  };

  // Register Function
  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();
      dispatch({ type: 'SET_LOADING', payload: false });

      return {
        success: result.success,
        message: result.message,
        errors: result.errors || null
      };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: null
      };
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      if (state.refreshToken) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.accessToken}`
          },
          body: JSON.stringify({ refreshToken: state.refreshToken })
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearStoredAuth();
    }
  };

  // Forgot Password Function
  const forgotPassword = async (email) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      dispatch({ type: 'SET_LOADING', payload: false });

      return {
        success: result.success,
        message: result.message
      };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  };

  // Reset Password Function
  const resetPassword = async (token, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password })
      });

      const result = await response.json();
      dispatch({ type: 'SET_LOADING', payload: false });

      return {
        success: result.success,
        message: result.message,
        errors: result.errors || null
      };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  };

  // Change Password Function
  const changePassword = async (currentPassword, newPassword) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.accessToken}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const result = await response.json();
      dispatch({ type: 'SET_LOADING', payload: false });

      if (result.success) {
        // Clear tokens to force re-login
        clearStoredAuth();
      }

      return {
        success: result.success,
        message: result.message
      };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  };

  // Update Profile Function
  const updateProfile = async (profileData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.accessToken}`
        },
        body: JSON.stringify(profileData)
      });

      const result = await response.json();
      dispatch({ type: 'SET_LOADING', payload: false });

      if (result.success) {
        dispatch({
          type: 'UPDATE_PROFILE',
          payload: result.data.user
        });
        
        // Update stored user data
        localStorage.setItem('lezgo_user', JSON.stringify(result.data.user));
      }

      return {
        success: result.success,
        message: result.message,
        user: result.data?.user
      };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  };

  // Clear Error Function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Context Value
  const contextValue = {
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
    isAdmin: () => state.user?.role === 'Admin',
    isManager: () => ['Admin', 'Manager'].includes(state.user?.role),
    hasRole: (role) => state.user?.role === role,
    hasAnyRole: (roles) => roles.includes(state.user?.role)
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-Order Component for protected routes
export const withAuth = (Component, requiredRoles = []) => {
  return function AuthenticatedComponent(props) {
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Please log in to access this page.
            </p>
          </div>
        </div>
      );
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(user?.role)) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Insufficient Permissions
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};

export default AuthContext;
