import React, { useState } from 'react';
import { Car, Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login, forgotPassword, loading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false); 
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    clearError();

    // Basic validation
    const newErrors = {};
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

  const handleForgotPassword = async (e) => {
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
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

  const handleForgotEmailChange = (e) => {
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
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.forgotEmail}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Mail size={16} />
                      <span>Send Reset Link</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotPasswordMessage('');
                  setErrors({});
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
              >
                ← Back to Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Same as login */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800">
          <div className="h-full flex items-center justify-center p-12">
            <div className="max-w-lg text-center">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Secure Access</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                We'll help you get back into your account securely
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Left Panel - Form */}
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
              Sign in to access your LezGo dashboard
            </p>
          </div>

          {/* Error Display */}
          {(error || errors.general) && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3">
              <AlertCircle className="text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" size={16} />
              <p className="text-red-800 dark:text-red-200 text-sm">
                {error || errors.general}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                placeholder="your email here"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  placeholder="your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="ml-2">Google</span>
            </button>

            <button
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="ml-2">Facebook</span>
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Demo Credentials:</p>
            <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <p><strong>Super Admin:</strong> admin@lezgo.com / admin123</p>
              <p><strong>Manager:</strong> manager@lezgo.com / manager123</p>
              <p><strong>Agent:</strong> agent@lezgo.com / agent123</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Features */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800">
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-lg">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Drive Your Dreams</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Experience premium car rental services with our modern fleet
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Premium Fleet</h3>
                  <p className="text-gray-600 dark:text-gray-300">Access to luxury and economy vehicles from top brands worldwide</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">24/7 Support</h3>
                  <p className="text-gray-600 dark:text-gray-300">Round-the-clock customer service and roadside assistance</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Secure & Safe</h3>
                  <p className="text-gray-600 dark:text-gray-300">All vehicles are insured and regularly maintained for your safety</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Best Prices</h3>
                  <p className="text-gray-600 dark:text-gray-300">Competitive rates with no hidden fees and flexible payment options</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Happy Customers</div>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Cars Available</div>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
