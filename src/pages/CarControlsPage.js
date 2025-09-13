import React, { useState, useEffect } from 'react';
import { Car, Power, Lock, Unlock, MapPin, Battery, Fuel, Settings, CheckCircle, X, MoreVertical, Edit, Trash2, ChevronDown } from 'lucide-react';

const CarControlsPage = () => {
  const [notification, setNotification] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Function to determine car status based on battery level
  const getCarStatus = (car) => {
    if (car.battery < 12) {
      return 'discharged';
    }
    return car.status;
  };

  // Function to get status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'rented':
        return 'bg-orange-100 text-orange-800';
      case 'discharged':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to check if car controls should be disabled
  const isCarDisabled = (car) => {
    const status = getCarStatus(car);
    return status === 'rented' || status === 'discharged';
  };
  const [cars, setCars] = useState([
    { id: 1, model: 'Mitsubishi ASX', plate: 'U47449', status: 'available', battery: 85, location: 'Dubai Marina', year: '2022', color: 'Silver' },
    { id: 2, model: 'Toyota RAV4', plate: 'U47450', status: 'available', battery: 92, location: 'Downtown Dubai', year: '2023', color: 'White' },
    { id: 3, model: 'Honda Civic', plate: 'U47451', status: 'rented', battery: 25, location: 'Jumeirah', year: '2021', color: 'Black' },
    { id: 4, model: 'Tesla Model 3', plate: 'U47452', status: 'available', battery: 78, location: 'Deira', year: '2023', color: 'Blue' },
    { id: 5, model: 'BMW X3', plate: 'U47453', status: 'available', battery: 45, location: 'Bur Dubai', year: '2022', color: 'Gray' },
    { id: 6, model: 'Nissan Leaf', plate: 'U47454', status: 'available', battery: 67, location: 'Al Barsha', year: '2023', color: 'Green' },
    { id: 7, model: 'Mercedes C-Class', plate: 'U47455', status: 'rented', battery: 15, location: 'Business Bay', year: '2022', color: 'Red' },
    { id: 8, model: 'Audi Q5', plate: 'U47456', status: 'available', battery: 9, location: 'JLT', year: '2023', color: 'Black' }
  ]);

  const handleCarAction = (carId, action) => {
    const car = cars.find(c => c.id === carId);
    const carStatus = getCarStatus(car);
    
    // Check if action is allowed
    if (carStatus === 'discharged') {
      setNotification({
        message: `${car.model} (${car.plate}) is discharged and cannot be operated`,
        type: 'error'
      });
      return;
    }
    
    if (carStatus === 'rented') {
      setNotification({
        message: `${car.model} (${car.plate}) is currently rented and cannot be controlled`,
        type: 'error'
      });
      return;
    }

    const actionMessages = {
      unlock: `${car.model} (${car.plate}) has been unlocked successfully`,
      lock: `${car.model} (${car.plate}) has been locked successfully`, 
      start: `${car.model} (${car.plate}) engine has been started`,
      configure: `${car.model} (${car.plate}) configuration updated`
    };

    const actionTypes = {
      unlock: 'success', // Green theme
      lock: 'error',     // Red theme
      start: 'info',     // Blue theme
      configure: 'neutral' // Gray theme
    };

    // Show notification
    setNotification({
      message: actionMessages[action] || `Action ${action} completed`,
      type: actionTypes[action] || 'success'
    });

    console.log(`Performing ${action} on car ${carId}`);
    // Here you would typically make an API call to perform the action
  };

  // Auto-hide notification after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleEditCar = (car) => {
    setSelectedCar(car);
    setDropdownOpen(null);
  };

  const handleRemoveCar = (carId) => {
    setCars(cars.filter(car => car.id !== carId));
    setNotification({
      message: `Car has been removed from the fleet`,
      type: 'error'
    });
    setDropdownOpen(null);
  };

  const handleSaveCar = (updatedCar) => {
    setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car));
    setNotification({
      message: `${updatedCar.model} (${updatedCar.plate}) has been updated successfully`,
      type: 'success'
    });
    setSelectedCar(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Car Controls</h2>
          <p className="text-gray-600">Remote control and monitoring of your fleet</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Settings size={16} />
          <span>Refresh All</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option value="all">All Cars</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="discharged">Discharged</option>
              <option value="rebalancing">Rebalancing</option>
              <option value="under-investigation">Under Investigation</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Location:</label>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option value="all">All Locations</option>
              <option value="dubai-marina">Dubai Marina</option>
              <option value="downtown">Downtown Dubai</option>
              <option value="jumeirah">Jumeirah</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Car className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{car.model}</h3>
                  <p className="text-sm text-gray-500">{car.plate}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(getCarStatus(car))}`}>
                {getCarStatus(car)}
              </span>
            </div>

            {/* Car Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Battery size={16} className={`${
                    car.battery < 12 ? 'text-red-600' :
                    car.battery > 50 ? 'text-green-500' : 
                    car.battery > 25 ? 'text-yellow-500' : 'text-red-500'
                  }`} />
                  <span className="text-sm text-gray-600">Battery/Fuel</span>
                </div>
                <span className="text-sm font-medium">{car.battery}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    car.battery < 12 ? 'bg-red-600' :
                    car.battery > 50 ? 'bg-green-500' : 
                    car.battery > 25 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${car.battery}%` }}
                ></div>
              </div>

              <div className="flex items-center space-x-2 mt-3">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">{car.location}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleCarAction(car.id, 'unlock')}
                className="flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                disabled={isCarDisabled(car)}
              >
                <Unlock size={16} />
                <span className="text-sm font-medium">Unlock</span>
              </button>
              
              <button 
                onClick={() => handleCarAction(car.id, 'lock')}
                className="flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Lock size={16} />
                <span className="text-sm font-medium">Lock</span>
              </button>
              
              <button 
                onClick={() => handleCarAction(car.id, 'start')}
                className="flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                disabled={isCarDisabled(car)}
              >
                <Power size={16} />
                <span className="text-sm font-medium">Start</span>
              </button>
              
              {/* Config Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(dropdownOpen === car.id ? null : car.id)}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors w-full"
                >
                  <Settings size={16} />
                  <span className="text-sm font-medium">Config</span>
                  <ChevronDown size={14} className={`transition-transform ${dropdownOpen === car.id ? 'rotate-180' : ''}`} />
                </button>
                
                {dropdownOpen === car.id && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={() => handleEditCar(car)}
                      className="flex items-center space-x-2 px-3 py-2 text-blue-700 hover:bg-blue-50 transition-colors w-full text-left rounded-t-lg"
                    >
                      <Edit size={14} />
                      <span className="text-sm">Edit Info</span>
                    </button>
                    <button
                      onClick={() => handleRemoveCar(car.id)}
                      className="flex items-center space-x-2 px-3 py-2 text-red-700 hover:bg-red-50 transition-colors w-full text-left rounded-b-lg"
                    >
                      <Trash2 size={14} />
                      <span className="text-sm">Remove Car</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Last Activity */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Last activity: {new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Notification Popup */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className={`rounded-lg shadow-xl border p-4 max-w-sm ${
            notification.type === 'success' ? 'bg-green-50 border-green-200' :
            notification.type === 'error' ? 'bg-red-50 border-red-200' :
            notification.type === 'info' ? 'bg-blue-50 border-blue-200' :
            'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {notification.type === 'success' && <Unlock className="h-6 w-6 text-green-600" />}
                {notification.type === 'error' && <Lock className="h-6 w-6 text-red-600" />}
                {notification.type === 'info' && <Power className="h-6 w-6 text-blue-600" />}
                {notification.type === 'neutral' && <Settings className="h-6 w-6 text-gray-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  notification.type === 'success' ? 'text-green-900' :
                  notification.type === 'error' ? 'text-red-900' :
                  notification.type === 'info' ? 'text-blue-900' :
                  'text-gray-900'
                }`}>
                  {notification.type === 'success' && 'Car Unlocked'}
                  {notification.type === 'error' && 'Car Locked'}
                  {notification.type === 'info' && 'Engine Started'}
                  {notification.type === 'neutral' && 'Configuration Updated'}
                </p>
                <p className={`text-sm mt-1 ${
                  notification.type === 'success' ? 'text-green-700' :
                  notification.type === 'error' ? 'text-red-700' :
                  notification.type === 'info' ? 'text-blue-700' :
                  'text-gray-700'
                }`}>
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className={`flex-shrink-0 p-1 rounded-md transition-colors ${
                  notification.type === 'success' ? 'text-green-400 hover:text-green-600' :
                  notification.type === 'error' ? 'text-red-400 hover:text-red-600' :
                  notification.type === 'info' ? 'text-blue-400 hover:text-blue-600' :
                  'text-gray-400 hover:text-gray-600'
                }`}
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="mt-3">
              <div className={`w-full rounded-full h-1 ${
                notification.type === 'success' ? 'bg-green-200' :
                notification.type === 'error' ? 'bg-red-200' :
                notification.type === 'info' ? 'bg-blue-200' :
                'bg-gray-200'
              }`}>
                <div 
                  className={`h-1 rounded-full animate-progress ${
                    notification.type === 'success' ? 'bg-green-600' :
                    notification.type === 'error' ? 'bg-red-600' :
                    notification.type === 'info' ? 'bg-blue-600' :
                    'bg-gray-600'
                  }`}
                  style={{
                    animation: 'progress 4s linear forwards'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Car Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Edit Car Information</h3>
                  <p className="text-blue-100 text-sm">{selectedCar.model} ({selectedCar.plate})</p>
                </div>
                <button
                  onClick={() => setSelectedCar(null)}
                  className="p-1.5 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <EditCarForm 
                car={selectedCar} 
                onSave={handleSaveCar} 
                onCancel={() => setSelectedCar(null)} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        
        .animate-progress {
          animation: progress 4s linear forwards;
        }
        
        @keyframes slide-in-from-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .slide-in-from-right {
          animation-name: slide-in-from-right;
        }
        
        .duration-300 {
          animation-duration: 300ms;
        }
      `}</style>
    </div>
  );
};

// Edit Car Form Component
const EditCarForm = ({ car, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    model: car.model,
    plate: car.plate,
    year: car.year,
    color: car.color,
    location: car.location,
    battery: car.battery,
    status: car.status
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...car, ...formData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Model and Plate */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Car Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Plate Number</label>
          <input
            type="text"
            name="plate"
            value={formData.plate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      {/* Year and Color */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
          <select
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Silver">Silver</option>
            <option value="Gray">Gray</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
            <option value="Green">Green</option>
          </select>
        </div>
      </div>

      {/* Location and Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Dubai Marina">Dubai Marina</option>
            <option value="Downtown Dubai">Downtown Dubai</option>
            <option value="Jumeirah">Jumeirah</option>
            <option value="Deira">Deira</option>
            <option value="Bur Dubai">Bur Dubai</option>
            <option value="Al Barsha">Al Barsha</option>
            <option value="Business Bay">Business Bay</option>
            <option value="JLT">JLT</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Battery Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Battery/Fuel Level: {formData.battery}%
        </label>
        <input
          type="range"
          name="battery"
          min="0"
          max="100"
          value={formData.battery}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CarControlsPage;
