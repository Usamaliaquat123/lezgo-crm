import React, { useState } from 'react';
import { Car, Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
  forgotEmail?: string;
}

const LoginPage: React.FC = () => {
  const { login, forgotPassword, loading, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false); 
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrors({});
    clearError();

    // Basic validation
    const newErrors: FormErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login(formData);
    
    if (!result.success) {
      if (result.attemptsRemaining !== undefined) {
        setErrors({ 
          general: `${result.message} (${result.attemptsRemaining} attempts remaining)` 
        });
      } else {
        setErrors({ general: result.message });
      }
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!forgotPasswordEmail) {
      setErrors({ forgotEmail: 'Email is required' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
      setErrors({ forgotEmail: 'Email is invalid' });
      return;
    }

    try {
      const result = await forgotPassword(forgotPasswordEmail);
      
      if (result.success) {
        setForgotPasswordMessage('If an account with that email exists, we have sent a password reset link.');
        setErrors({});
      } else {
        setErrors({ forgotEmail: result.message || 'Failed to send reset email. Please try again.' });
      }
    } catch (error) {
      setErrors({ forgotEmail: 'Failed to send reset email. Please try again.' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (errors.general) {
      setErrors(prev => ({
        ...prev,
        general: ''
      }));
    }
  };

  const handleForgotEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForgotPasswordEmail(e.target.value);
    if (errors.forgotEmail) {
      setErrors(prev => ({
        ...prev,
        forgotEmail: ''
      }));
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 flex items-center justify-center p-8 transition-colors duration-200">
          <div className="max-w-md w-full">
            {/* Logo and Brand */}
            <div className="mb-8">
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
                  <Car className="text-white" size={20} />
                </div>
                <span className="text-gray-900 dark:text-white text-xl font-bold">LezGo</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            {forgotPasswordMessage ? (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-800 dark:text-green-200 text-sm">{forgotPasswordMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label htmlFor="forgotEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="forgotEmail"
                    name="forgotEmail"
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={handleForgotEmailChange}
                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.forgotEmail ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.forgotEmail && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.forgotEmail}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotPasswordEmail('');
                  setForgotPasswordMessage('');
                  setErrors({});
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Branding/Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur rounded-full mb-6">
                <Car size={48} className="text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Reset Your Password</h2>
            <p className="text-blue-100 text-lg">
              Enter your email and we'll help you recover your account
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 flex items-center justify-center p-8 transition-colors duration-200">
        <div className="max-w-md w-full">
          {/* Logo and Brand */}
          <div className="mb-8">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
                <Car className="text-white" size={20} />
              </div>
              <span className="text-gray-900 dark:text-white text-xl font-bold">LezGo</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to access your Car Rental CRM Dashboard
            </p>
          </div>

          {/* Error Banner */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-sm flex items-center">
                <AlertCircle size={16} className="mr-2" />
                {errors.general}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              © 2024 LezGo Car Rental CRM. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Branding/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur rounded-full mb-6">
              <Car size={48} className="text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Manage Your Fleet</h2>
          <p className="text-blue-100 text-lg">
            Access powerful tools to manage your car rental business efficiently
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 text-left">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-white font-medium">Real-time Tracking</p>
              <p className="text-blue-100 text-sm mt-1">Monitor your fleet 24/7</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-white font-medium">Easy Booking</p>
              <p className="text-blue-100 text-sm mt-1">Manage reservations</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-white font-medium">Analytics</p>
              <p className="text-blue-100 text-sm mt-1">Business insights</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <p className="text-white font-medium">Customer Management</p>
              <p className="text-blue-100 text-sm mt-1">Handle clients easily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

