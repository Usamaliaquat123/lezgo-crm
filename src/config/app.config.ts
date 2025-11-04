/**
 * Application Configuration
 * Centralized configuration for customization
 */

export interface AppConfig {
  app: {
    name: string;
    version: string;
    description: string;
  };
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
  features: {
    dashboard: boolean;
    carControls: boolean;
    fleetManagement: boolean;
    vehicleManagement: boolean;
    bookings: boolean;
    parkingProofs: boolean;
    customers: boolean;
    userManagement: boolean;
    analytics: boolean;
    payments: boolean;
    notifications: boolean;
    pushNotifications: boolean;
    settings: boolean;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    darkMode: boolean;
  };
  dashboard: {
    refreshInterval: number;
    showMockData: boolean;
  };
  pagination: {
    defaultPageSize: number;
    pageSizeOptions: number[];
  };
  maps: {
    defaultCenter: [number, number];
    defaultZoom: number;
  };
}

// Default configuration - easily customizable
export const defaultConfig: AppConfig = {
  app: {
    name: 'LezGo CRM Dashboard',
    version: '1.0.0',
    description: 'Car Rental Management System',
  },
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
    timeout: 30000,
    retryAttempts: 3,
  },
  features: {
    dashboard: true,
    carControls: true,
    fleetManagement: true,
    vehicleManagement: true,
    bookings: true,
    parkingProofs: true,
    customers: true,
    userManagement: true,
    analytics: true,
    payments: true,
    notifications: true,
    pushNotifications: true,
    settings: true,
  },
  theme: {
    primaryColor: '#3B82F6', // blue-500
    secondaryColor: '#8B5CF6', // purple-600
    accentColor: '#10B981', // green-500
    darkMode: false,
  },
  dashboard: {
    refreshInterval: 30000, // 30 seconds
    showMockData: false,
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50, 100],
  },
  maps: {
    defaultCenter: [51.505, -0.09],
    defaultZoom: 13,
  },
};

// Allow runtime configuration override
let currentConfig: AppConfig = { ...defaultConfig };

export const getConfig = (): AppConfig => currentConfig;

export const updateConfig = (newConfig: Partial<AppConfig>): void => {
  currentConfig = {
    ...currentConfig,
    ...newConfig,
    app: { ...currentConfig.app, ...newConfig.app },
    api: { ...currentConfig.api, ...newConfig.api },
    features: { ...currentConfig.features, ...newConfig.features },
    theme: { ...currentConfig.theme, ...newConfig.theme },
    dashboard: { ...currentConfig.dashboard, ...newConfig.dashboard },
    pagination: { ...currentConfig.pagination, ...newConfig.pagination },
    maps: { ...currentConfig.maps, ...newConfig.maps },
  };
};

export const resetConfig = (): void => {
  currentConfig = { ...defaultConfig };
};




