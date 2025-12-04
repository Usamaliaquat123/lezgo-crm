/**
 * Core Type Definitions for LezGo CRM
 * Centralized type system for full type safety and customization
 */

// ============= User & Authentication =============
export interface User {
  id: string;
  email: string;
  role: 'Super Admin' | 'manager' | 'staff' | 'user';
  profile?: UserProfile;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  phone?: string;
}

// ============= Vehicle Types =============
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  vin?: string;
  status: VehicleStatus;
  category: VehicleCategory;
  transmission: 'automatic' | 'manual';
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  dailyRate: number;
  mileage: number;
  location?: VehicleLocation;
  features?: string[];
  images?: string[];
  availability: boolean;
  maintenanceStatus?: MaintenanceStatus;
  createdAt: string;
  updatedAt: string;
}

export type VehicleStatus = 'available' | 'rented' | 'maintenance' | 'reserved' | 'retired';
export type VehicleCategory = 'economy' | 'compact' | 'midsize' | 'fullsize' | 'suv' | 'luxury' | 'van';
export type MaintenanceStatus = 'good' | 'needs_service' | 'in_service' | 'critical';

export interface VehicleLocation {
  lat: number;
  lng: number;
  address?: string;
  city?: string;
  state?: string;
}

// ============= Booking Types =============
export interface Booking {
  id: string;
  customerId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  totalAmount: number;
  paidAmount: number;
  pickupLocation: string;
  dropoffLocation: string;
  customer?: Customer;
  vehicle?: Vehicle;
  payment?: Payment;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'active' 
  | 'completed' 
  | 'cancelled' 
  | 'no_show';

export interface BookingFormData {
  customerId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  notes?: string;
}

// ============= Customer Types =============
export interface Customer {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  licenseNumber: string;
  licenseExpiry?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  status: CustomerStatus;
  totalBookings?: number;
  totalSpent?: number;
  rating?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type CustomerStatus = 'active' | 'inactive' | 'blocked' | 'pending_verification';

// ============= Payment Types =============
export interface Payment {
  id: string;
  bookingId: string;
  customerId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethod = 'credit_card' | 'debit_card' | 'cash' | 'bank_transfer' | 'paypal' | 'stripe';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';

// ============= Parking Proof Types =============
export interface ParkingProof {
  id: string;
  bookingId: string;
  customerId: string;
  vehicleId: string;
  imageUrl: string;
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  status: ParkingProofStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ParkingProofStatus = 'pending' | 'approved' | 'rejected';

// ============= Notification Types =============
export interface Notification {
  id: string | number;
  userId?: string;
  type: NotificationType;
  title: string;
  message: string;
  time?: string;
  unread: boolean;
  priority?: NotificationPriority;
  actionUrl?: string;
  metadata?: Record<string, any>;
  createdAt?: string;
  readAt?: string;
}

export type NotificationType = 
  | 'booking' 
  | 'payment' 
  | 'maintenance' 
  | 'system' 
  | 'alert' 
  | 'reminder';

export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface NotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  subject: string;
  body: string;
  variables: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============= Analytics & Dashboard Types =============
export interface DashboardData {
  rides: {
    today: number;
    yesterday: number;
  };
  earnings: {
    today: number;
    yesterday: number;
  };
  cars: {
    total: number;
    available: number;
    rented: number;
    maintenance: number;
  };
  salesData: ChartDataPoint[];
  ridesData: ChartDataPoint[];
  customers: {
    today: number;
    yesterday: number;
  };
  locations: {
    active: number;
    total: number;
  };
  users: {
    newUsersToday: number;
    newUsersYesterday: number;
    totalUsers: number;
    bookingsToday: number;
    bookingsYesterday: number;
    totalBookings: number;
    activeUsers: number;
  };
  pendingProofsCount: number;
}

export interface ChartDataPoint {
  time: string;
  today: number;
  yesterday: number;
}

export interface AnalyticsMetric {
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
}

// ============= API Response Types =============
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ============= UI Component Types =============
export interface StatCardProps {
  icon: React.ComponentType<any>;
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  color?: string;
}

export interface SidebarSection {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  badge?: number;
  submenu?: SidebarSection[];
  hidden?: boolean;
}

export interface TableColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

// ============= Theme Types =============
export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// ============= Form Types =============
export interface FormFieldError {
  field: string;
  message: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

// ============= Map Types =============
export interface MapMarker {
  id: string;
  position: [number, number];
  popup?: string;
  icon?: string;
  color?: string;
}

export interface MapProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  onMarkerClick?: (marker: MapMarker) => void;
}

// ============= Utility Types =============
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncData<T> = {
  data: Nullable<T>;
  loading: boolean;
  error: Nullable<string>;
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ============= Action Types =============
export interface Action<T = any> {
  type: string;
  payload?: T;
}

export type Dispatch<T = any> = (action: Action<T>) => void;

// ============= Error Types =============
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// ============= Export all types =============
export type {
  // Add any additional exports here
};















