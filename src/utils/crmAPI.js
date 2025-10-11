import apiClient from './apiClient';

// Customers API
export const customersAPI = {
  // Get all customers with pagination and filtering
  getCustomers: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? `/customers?${queryString}` : '/customers';
    
    return apiClient.get(url);
  },

  // Get single customer by ID
  getCustomerById: async (id) => {
    return apiClient.get(`/customers/${id}`);
  },

  // Create new customer
  createCustomer: async (customerData) => {
    return apiClient.post('/customers', customerData);
  },

  // Update customer
  updateCustomer: async (id, customerData) => {
    return apiClient.put(`/customers/${id}`, customerData);
  },

  // Delete customer
  deleteCustomer: async (id) => {
    return apiClient.delete(`/customers/${id}`);
  },

  // Get customer statistics
  getCustomerStats: async () => {
    return apiClient.get('/customers/stats');
  },

  // Search customers
  searchCustomers: async (query, limit = 10) => {
    return apiClient.get(`/customers/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  }
};

// Bookings API
export const bookingsAPI = {
  // Get all bookings with pagination and filtering
  getBookings: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? `/bookings?${queryString}` : '/bookings';
    
    return apiClient.get(url);
  },

  // Get single booking by ID
  getBookingById: async (id) => {
    return apiClient.get(`/bookings/${id}`);
  },

  // Create new booking
  createBooking: async (bookingData) => {
    return apiClient.post('/bookings', bookingData);
  },

  // Update booking
  updateBooking: async (id, bookingData) => {
    return apiClient.put(`/bookings/${id}`, bookingData);
  },

  // Cancel booking
  cancelBooking: async (id, reason = '') => {
    return apiClient.post(`/bookings/${id}/cancel`, { reason });
  },

  // Get booking statistics
  getBookingStats: async () => {
    return apiClient.get('/bookings/stats');
  }
};

// Vehicles API (for reference in bookings)
export const vehiclesAPI = {
  // Get all vehicles
  getVehicles: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? `/vehicles?${queryString}` : '/vehicles';
    
    return apiClient.get(url);
  },

  // Get available vehicles for booking
  getAvailableVehicles: async (startDate, endDate) => {
    const params = new URLSearchParams({
      status: 'Available',
      startDate,
      endDate
    });
    
    return apiClient.get(`/vehicles?${params.toString()}`);
  }
};

// Combined CRM API
export const crmAPI = {
  customers: customersAPI,
  bookings: bookingsAPI,
  vehicles: vehiclesAPI
};

export default crmAPI;
