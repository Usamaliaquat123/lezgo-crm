import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Car, MapPin, Battery, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { FaCar } from 'react-icons/fa';
import { renderToStaticMarkup } from 'react-dom/server';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMzMzIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K',
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMzMzIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K',
  shadowUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGVsbGlwc2UgY3g9IjIwIiBjeT0iMzUiIHJ4PSIxNSIgcnk9IjUiIGZpbGw9InJnYmEoMCwwLDAsMC4yKSIvPgo8L3N2Zz4K',
});

// Custom car icons with React Icons
const createEnhancedCarIcon = (car) => {
  const statusColor = car.status === 'available' ? '#10b981' : '#f59e0b';
  const fuelColor = car.battery > 50 ? '#10b981' : car.battery > 25 ? '#f59e0b' : '#ef4444';
  
  // Get car icon - using FaCar for all car types
  const getCarIcon = () => {
    return <FaCar size={28} color={statusColor} />;
  };

  // Create the marker component
  const MarkerComponent = () => (
    <div className="car-marker-container">
      <div className="car-marker-main">
        <div className="car-icon-wrapper">
          {getCarIcon()}
        </div>
        
        {/* Status badge */}
        <div className={`status-badge ${car.status}`}>
          {car.status === 'available' ? '✓' : '⏱'}
        </div>
        
        {/* Fuel indicator */}
        <div className="fuel-indicator">
          <div className="fuel-bar">
            <div 
              className="fuel-fill" 
              style={{ 
                width: `${car.battery}%`, 
                backgroundColor: fuelColor 
              }}
            ></div>
          </div>
          <span className="fuel-text">{car.battery}%</span>
        </div>
        
        {/* Distance badge */}
        <div className="distance-badge">{car.distance}km</div>
      </div>
      
      {/* Car model label */}
      <div className="car-label">{car.model.split(' ')[0]}</div>
    </div>
  );

  // Convert React component to HTML string
  const htmlString = renderToStaticMarkup(<MarkerComponent />);
  
  return L.divIcon({
    html: htmlString,
    className: 'enhanced-car-marker',
    iconSize: [70, 90],
    iconAnchor: [35, 80],
  });
};

// Car data for Dubai locations
const getCarData = () => {
  const dubaiLocations = [
    "Dubai Marina", "Downtown Dubai", "Jumeirah", "Deira", 
    "Bur Dubai", "Al Barsha", "Business Bay", "JLT"
  ];

  const carsData = [
    { 
      id: 1, 
      latitude: 25.2048, 
      longitude: 55.2708, 
      type: 'sedan', 
      available: true,
      fuelLevel: 85,
      distance: 120,
      model: 'Mitsubishi ASX',
      plateNumber: 'U47449',
      isElectric: false
    },
    { 
      id: 2, 
      latitude: 25.2088, 
      longitude: 55.2788, 
      type: 'suv', 
      available: true,
      fuelLevel: 92,
      distance: 250,
      model: 'Toyota RAV4',
      plateNumber: 'U47450',
      isElectric: false
    },
    { 
      id: 3, 
      latitude: 25.2028, 
      longitude: 55.2648, 
      type: 'hatchback', 
      available: false,
      fuelLevel: 25,
      distance: 180,
      model: 'Honda Civic',
      plateNumber: 'U47451',
      isElectric: false
    },
    { 
      id: 4, 
      latitude: 25.2068, 
      longitude: 55.2668, 
      type: 'sedan', 
      available: true,
      fuelLevel: 78,
      distance: 95,
      model: 'Tesla Model 3',
      plateNumber: 'U47452',
      isElectric: true,
      batteryLevel: 78
    },
    { 
      id: 5, 
      latitude: 25.2018, 
      longitude: 55.2718, 
      type: 'suv', 
      available: true,
      fuelLevel: 45,
      distance: 320,
      model: 'BMW X3',
      plateNumber: 'U47453',
      isElectric: false
    },
    { 
      id: 6, 
      latitude: 25.2078, 
      longitude: 55.2698, 
      type: 'hatchback', 
      available: true,
      fuelLevel: 67,
      distance: 75,
      model: 'Nissan Leaf',
      plateNumber: 'U47454',
      isElectric: true,
      batteryLevel: 67
    },
    { 
      id: 7, 
      latitude: 25.2058, 
      longitude: 55.2728, 
      type: 'sedan', 
      available: false,
      fuelLevel: 15,
      distance: 200,
      model: 'Mercedes C-Class',
      plateNumber: 'U47455',
      isElectric: false
    },
    { 
      id: 8, 
      latitude: 25.2038, 
      longitude: 55.2678, 
      type: 'suv', 
      available: true,
      fuelLevel: 89,
      distance: 140,
      model: 'Audi Q5',
      plateNumber: 'U47456',
      isElectric: false
    }
  ];

  return carsData.map((car, index) => ({
    ...car,
    lat: car.latitude,
    lng: car.longitude,
    status: car.available ? 'available' : 'rented',
    battery: car.isElectric ? (car.batteryLevel || car.fuelLevel) : car.fuelLevel,
    lastUpdate: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
    location: dubaiLocations[index % dubaiLocations.length],
    customer: !car.available ? `Customer ${Math.floor(Math.random() * 100)}` : null,
    estimatedReturn: !car.available ? 
      new Date(Date.now() + Math.random() * 7200000).toLocaleTimeString() : null,
    licensePlate: car.plateNumber
  }));
};

const CarMap = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [mapCenter] = useState([25.2048, 55.2708]); // Dubai coordinates

  useEffect(() => {
    setCars(getCarData());
    
    // Update car positions every 30 seconds
    const interval = setInterval(() => {
      setCars(prevCars => 
        prevCars.map(car => ({
          ...car,
          lat: car.lat + (Math.random() - 0.5) * 0.001,
          lng: car.lng + (Math.random() - 0.5) * 0.001,
          lastUpdate: new Date().toLocaleTimeString(),
        }))
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#10b981'; // green
      case 'rented': return '#f59e0b'; // orange
      case 'maintenance': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return CheckCircle;
      case 'rented': return Clock;
      case 'maintenance': return AlertTriangle;
      default: return Car;
    }
  };

  const statusCounts = cars.reduce((acc, car) => {
    acc[car.status] = (acc[car.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="chart-container animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Car Tracking   </h3>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            <span>Available ({statusCounts.available || 0})</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
            <span>Rented ({statusCounts.rented || 0})</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
            <span>Maintenance ({statusCounts.maintenance || 0})</span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div className="h-80 rounded-lg overflow-hidden border border-gray-200">
          <MapContainer
            center={mapCenter}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            className="rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {cars.map((car) => (
              <Marker
                key={car.id}
                position={[car.lat, car.lng]}
                icon={createEnhancedCarIcon(car)}
                eventHandlers={{
                  click: () => setSelectedCar(car),
                }}
              >
                <Popup>
                  <div className="p-2 min-w-48">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{car.model}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        car.status === 'available' ? 'bg-green-100 text-green-800' :
                        car.status === 'rented' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2" />
                        <span>{car.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Car size={14} className="mr-2" />
                        <span>{car.licensePlate}</span>
                      </div>
                      {car.status !== 'maintenance' && (
                        <div className="flex items-center">
                          <Battery size={14} className="mr-2" />
                          <span>{car.battery}% {car.isElectric ? 'Battery' : 'Fuel'}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500">Distance: {car.distance} km</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500">Type: {car.type}</span>
                      </div>
                      {car.customer && (
                        <div className="flex items-center">
                          <Clock size={14} className="mr-2" />
                          <span>Rented by {car.customer}</span>
                        </div>
                      )}
                      {car.estimatedReturn && (
                        <div className="text-xs text-gray-500">
                          Est. return: {car.estimatedReturn}
                        </div>
                      )}
                      <div className="text-xs text-gray-400 mt-2">
                        Last updated: {car.lastUpdate}
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        {/* Car list sidebar */}
        <div className="mt-4 max-h-32 overflow-y-auto">
          <div className="grid grid-cols-1 gap-2">
            {cars.slice(0, 3).map((car) => {
              const StatusIcon = getStatusIcon(car.status);
              return (
                <div
                  key={car.id}
                  className={`flex items-center p-2 rounded-lg border cursor-pointer transition-colors ${
                    selectedCar?.id === car.id 
                      ? 'border-blue-300 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCar(car)}
                >
                  <StatusIcon 
                    size={16} 
                    className={`mr-2 ${
                      car.status === 'available' ? 'text-green-600' :
                      car.status === 'rented' ? 'text-orange-600' :
                      'text-red-600'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {car.model}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {car.location} • {car.licensePlate}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {car.status !== 'maintenance' && `${car.battery}%`}
                  </div>
                </div>
              );
            })}
            {cars.length > 3 && (
              <div className="text-center py-2">
                <span className="text-xs text-gray-500">
                  +{cars.length - 3} more cars
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarMap;
