import apiClient from './apiClient';
import { ApiResponse, PaginatedResponse, Customer, Booking, Vehicle, ParkingProof } from '../types';

// Customers API
export const customersAPI = {
  // Get all customers with pagination and filtering
  getCustomers: async (params: Record<string, any> = {}): Promise<ApiResponse<PaginatedResponse<Customer>>> => {
    const queryParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/customers?${queryString}` : '/customers';

    return apiClient.get<PaginatedResponse<Customer>>(url);
  },

  // Get single customer by ID
  getCustomerById: async (id: string): Promise<ApiResponse<Customer>> => {
    return apiClient.get<Customer>(`/customers/${id}`);
  },

  // Create new customer
  createCustomer: async (customerData: Partial<Customer>): Promise<ApiResponse<Customer>> => {
    return apiClient.post<Customer>('/customers', customerData);
  },

  // Update customer
  updateCustomer: async (id: string, customerData: Partial<Customer>): Promise<ApiResponse<Customer>> => {
    return apiClient.put<Customer>(`/customers/${id}`, customerData);
  },

  // Delete customer
  deleteCustomer: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/customers/${id}`);
  },

  // Get customer statistics
  getCustomerStats: async (): Promise<ApiResponse<any>> => {
    return apiClient.get('/customers/stats');
  },

  // Search customers
  searchCustomers: async (query: string, limit: number = 10): Promise<ApiResponse<Customer[]>> => {
    return apiClient.get<Customer[]>(`/customers/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  },
};

// Bookings API
export const bookingsAPI = {
  // Get all bookings with pagination and filtering
  getBookings: async (params: Record<string, any> = {}): Promise<ApiResponse<PaginatedResponse<Booking>>> => {
    const queryParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/bookings?${queryString}` : '/bookings';

    return apiClient.get<PaginatedResponse<Booking>>(url);
  },

  // Get single booking by ID
  getBookingById: async (id: string): Promise<ApiResponse<Booking>> => {
    return apiClient.get<Booking>(`/bookings/${id}`);
  },

  // Create new booking
  createBooking: async (bookingData: Partial<Booking>): Promise<ApiResponse<Booking>> => {
    return apiClient.post<Booking>('/bookings', bookingData);
  },

  // Update booking
  updateBooking: async (id: string, bookingData: Partial<Booking>): Promise<ApiResponse<Booking>> => {
    return apiClient.put<Booking>(`/bookings/${id}`, bookingData);
  },

  // Cancel booking
  cancelBooking: async (id: string, reason: string = ''): Promise<ApiResponse<Booking>> => {
    return apiClient.post<Booking>(`/bookings/${id}/cancel`, { reason });
  },

  // Get booking statistics
  getBookingStats: async (): Promise<ApiResponse<any>> => {
    return apiClient.get('/bookings/stats');
  },
};

// Vehicles API
export const vehiclesAPI = {
  // Get all vehicles with pagination and filtering
  getVehicles: async (params: Record<string, any> = {}): Promise<ApiResponse<PaginatedResponse<Vehicle>>> => {
    const queryParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/vehicles?${queryString}` : '/vehicles';

    return apiClient.get<PaginatedResponse<Vehicle>>(url);
  },

  // Get single vehicle by ID
  getVehicleById: async (id: string): Promise<ApiResponse<Vehicle>> => {
    return apiClient.get<Vehicle>(`/vehicles/${id}`);
  },

  // Create new vehicle
  createVehicle: async (vehicleData: Partial<Vehicle>): Promise<ApiResponse<Vehicle>> => {
    return apiClient.post<Vehicle>('/vehicles', vehicleData);
  },

  // Update vehicle
  updateVehicle: async (id: string, vehicleData: Partial<Vehicle>): Promise<ApiResponse<Vehicle>> => {
    return apiClient.put<Vehicle>(`/vehicles/${id}`, vehicleData);
  },

  // Delete vehicle
  deleteVehicle: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/vehicles/${id}`);
  },

  // Get vehicle statistics
  getVehicleStats: async (): Promise<ApiResponse<any>> => {
    return apiClient.get('/vehicles/stats');
  },

  // Search vehicles
  searchVehicles: async (query: string, limit: number = 10): Promise<ApiResponse<Vehicle[]>> => {
    return apiClient.get<Vehicle[]>(`/vehicles/search?query=${encodeURIComponent(query)}&limit=${limit}`);
  },

  // Update vehicle status
  updateVehicleStatus: async (id: string, status: string): Promise<ApiResponse<Vehicle>> => {
    return apiClient.patch<Vehicle>(`/vehicles/${id}/status`, { status });
  },

  // Get available vehicles for booking
  getAvailableVehicles: async (startDate: string, endDate: string): Promise<ApiResponse<Vehicle[]>> => {
    const params = new URLSearchParams({
      status: 'Available',
      startDate,
      endDate,
    });

    return apiClient.get<Vehicle[]>(`/vehicles?${params.toString()}`);
  },
};

// Parking Proofs API
export const parkingProofsAPI = {
  // Get all parking proofs with pagination and filtering
  getParkingProofs: async (params: Record<string, any> = {}): Promise<ApiResponse<PaginatedResponse<ParkingProof>>> => {
    const queryParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = queryString ? `/parking-proofs?${queryString}` : '/parking-proofs';

    return apiClient.get<PaginatedResponse<ParkingProof>>(url);
  },

  // Get single parking proof by ID
  getParkingProofById: async (id: string): Promise<ApiResponse<ParkingProof>> => {
    return apiClient.get<ParkingProof>(`/parking-proofs/${id}`);
  },

  // Create new parking proof
  createParkingProof: async (proofData: Partial<ParkingProof>): Promise<ApiResponse<ParkingProof>> => {
    return apiClient.post<ParkingProof>('/parking-proofs', proofData);
  },

  // Update parking proof
  updateParkingProof: async (id: string, proofData: Partial<ParkingProof>): Promise<ApiResponse<ParkingProof>> => {
    return apiClient.put<ParkingProof>(`/parking-proofs/${id}`, proofData);
  },

  // Delete parking proof
  deleteParkingProof: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/parking-proofs/${id}`);
  },

  // Get parking proof statistics
  getParkingProofStats: async (): Promise<ApiResponse<any>> => {
    return apiClient.get('/parking-proofs/stats');
  },

  // Search parking proofs
  searchParkingProofs: async (query: string, limit: number = 10): Promise<ApiResponse<ParkingProof[]>> => {
    return apiClient.get<ParkingProof[]>(`/parking-proofs/search?query=${encodeURIComponent(query)}&limit=${limit}`);
  },

  // Approve parking proof
  approveParkingProof: async (id: string, notes: string = ''): Promise<ApiResponse<ParkingProof>> => {
    return apiClient.post<ParkingProof>(`/parking-proofs/${id}/approve`, { notes });
  },

  // Reject parking proof
  rejectParkingProof: async (id: string, reason: string, charges: Record<string, any> = {}): Promise<ApiResponse<ParkingProof>> => {
    return apiClient.post<ParkingProof>(`/parking-proofs/${id}/reject`, { reason, charges });
  },

  // Report damage
  reportDamage: async (id: string, damageDetails: string, estimatedCost: number = 0): Promise<ApiResponse<ParkingProof>> => {
    return apiClient.post<ParkingProof>(`/parking-proofs/${id}/report-damage`, {
      damageDetails,
      estimatedCost,
    });
  },

  // Mark as needs cleaning
  markNeedsCleaning: async (id: string, cleaningFee: number = 50, notes: string = 'Vehicle needs cleaning'): Promise<ApiResponse<ParkingProof>> => {
    return apiClient.post<ParkingProof>(`/parking-proofs/${id}/needs-cleaning`, {
      cleaningFee,
      notes,
    });
  },
};

// Combined CRM API
export const crmAPI = {
  customers: customersAPI,
  bookings: bookingsAPI,
  vehicles: vehiclesAPI,
  parkingProofs: parkingProofsAPI,
};

export default crmAPI;












