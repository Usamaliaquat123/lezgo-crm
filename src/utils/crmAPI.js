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

// Vehicles API
export const vehiclesAPI = {
  // Get all vehicles with pagination and filtering
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

  // Get single vehicle by ID
  getVehicleById: async (id) => {
    return apiClient.get(`/vehicles/${id}`);
  },

  // Create new vehicle
  createVehicle: async (vehicleData) => {
    return apiClient.post('/vehicles', vehicleData);
  },

  // Update vehicle
  updateVehicle: async (id, vehicleData) => {
    return apiClient.put(`/vehicles/${id}`, vehicleData);
  },

  // Delete vehicle
  deleteVehicle: async (id) => {
    return apiClient.delete(`/vehicles/${id}`);
  },

  // Get vehicle statistics
  getVehicleStats: async () => {
    return apiClient.get('/vehicles/stats');
  },

  // Search vehicles
  searchVehicles: async (query, limit = 10) => {
    return apiClient.get(`/vehicles/search?query=${encodeURIComponent(query)}&limit=${limit}`);
  },

  // Update vehicle status
  updateVehicleStatus: async (id, status) => {
    return apiClient.patch(`/vehicles/${id}/status`, { status });
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

// Parking Proofs API
export const parkingProofsAPI = {
  // Get all parking proofs with pagination and filtering
  getParkingProofs: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? `/parking-proofs?${queryString}` : '/parking-proofs';
    
    return apiClient.get(url);
  },

  // Get single parking proof by ID
  getParkingProofById: async (id) => {
    return apiClient.get(`/parking-proofs/${id}`);
  },

  // Create new parking proof
  createParkingProof: async (proofData) => {
    return apiClient.post('/parking-proofs', proofData);
  },

  // Update parking proof
  updateParkingProof: async (id, proofData) => {
    return apiClient.put(`/parking-proofs/${id}`, proofData);
  },

  // Delete parking proof
  deleteParkingProof: async (id) => {
    return apiClient.delete(`/parking-proofs/${id}`);
  },

  // Get parking proof statistics
  getParkingProofStats: async () => {
    return apiClient.get('/parking-proofs/stats');
  },

  // Search parking proofs
  searchParkingProofs: async (query, limit = 10) => {
    return apiClient.get(`/parking-proofs/search?query=${encodeURIComponent(query)}&limit=${limit}`);
  },

  // Approve parking proof
  approveParkingProof: async (id, notes = '') => {
    return apiClient.post(`/parking-proofs/${id}/approve`, { notes });
  },

  // Reject parking proof
  rejectParkingProof: async (id, reason, charges = {}) => {
    return apiClient.post(`/parking-proofs/${id}/reject`, { reason, charges });
  },

  // Report damage
  reportDamage: async (id, damageDetails, estimatedCost = 0) => {
    return apiClient.post(`/parking-proofs/${id}/report-damage`, { 
      damageDetails, 
      estimatedCost 
    });
  },

  // Mark as needs cleaning
  markNeedsCleaning: async (id, cleaningFee = 50, notes = 'Vehicle needs cleaning') => {
    return apiClient.post(`/parking-proofs/${id}/needs-cleaning`, { 
      cleaningFee, 
      notes 
    });
  }
};

// Combined CRM API
export const crmAPI = {
  customers: customersAPI,
  bookings: bookingsAPI,
  vehicles: vehiclesAPI,
  parkingProofs: parkingProofsAPI
};

export default crmAPI;
