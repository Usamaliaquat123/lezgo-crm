import React, { useState } from 'react';
import { 
  Camera, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  MessageCircle, 
  Filter,
  Search,
  Upload,
  Phone,
  Car
} from 'lucide-react';

const ParkingProofsPage = () => {
  const [selectedProof, setSelectedProof] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for parking proofs
  const parkingProofs = [
    {
      id: 'PP001',
      bookingId: 'BK001',
      customer: 'Ahmed Al-Rashid',
      car: 'Mitsubishi ASX (U47449)',
      submittedAt: '2024-01-15 14:30',
      status: 'pending',
      photos: {
        front: '/api/placeholder/300/200',
        back: '/api/placeholder/300/200',
        left: '/api/placeholder/300/200',
        right: '/api/placeholder/300/200'
      },
      location: 'Dubai Marina Mall',
      notes: 'Returned after 3-day rental. Car appears clean.',
      phone: '+971 50 123 4567'
    },
    {
      id: 'PP002',
      bookingId: 'BK002',
      customer: 'Sarah Johnson',
      car: 'Tesla Model 3 (U47452)',
      submittedAt: '2024-01-15 16:45',
      status: 'approved',
      photos: {
        front: '/api/placeholder/300/200',
        back: '/api/placeholder/300/200',
        left: '/api/placeholder/300/200',
        right: '/api/placeholder/300/200'
      },
      location: 'Downtown Dubai',
      notes: 'Perfect condition, very clean.',
      phone: '+971 55 987 6543',
      reviewedBy: 'Admin',
      reviewedAt: '2024-01-15 17:00'
    },
    {
      id: 'PP003',
      bookingId: 'BK003',
      customer: 'Mohammed Hassan',
      car: 'BMW X3 (U47453)',
      submittedAt: '2024-01-15 18:20',
      status: 'not_clean',
      photos: {
        front: '/api/placeholder/300/200',
        back: '/api/placeholder/300/200',
        left: '/api/placeholder/300/200',
        right: '/api/placeholder/300/200'
      },
      location: 'Business Bay',
      notes: 'Interior needs cleaning, exterior dusty.',
      phone: '+971 52 456 7890',
      reviewedBy: 'Admin',
      reviewedAt: '2024-01-15 18:45',
      cleaningFee: 50
    },
    {
      id: 'PP004',
      bookingId: 'BK004',
      customer: 'Emma Wilson',
      car: 'Toyota RAV4 (U47450)',
      submittedAt: '2024-01-15 19:10',
      status: 'damage_reported',
      photos: {
        front: '/api/placeholder/300/200',
        back: '/api/placeholder/300/200',
        left: '/api/placeholder/300/200',
        right: '/api/placeholder/300/200'
      },
      location: 'Jumeirah Beach',
      notes: 'Scratch on left door, needs inspection.',
      phone: '+971 56 789 0123',
      reviewedBy: 'Admin',
      reviewedAt: '2024-01-15 19:30',
      damageDescription: 'Small scratch on driver side door'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'not_clean':
        return 'bg-orange-100 text-orange-800';
      case 'damage_reported':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AlertTriangle size={16} className="text-yellow-600" />;
      case 'approved':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'not_clean':
        return <XCircle size={16} className="text-orange-600" />;
      case 'damage_reported':
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <AlertTriangle size={16} className="text-gray-600" />;
    }
  };

  const handleApproval = (proofId, newStatus, notes = '') => {
    console.log(`Updating proof ${proofId} to status: ${newStatus}`);
    if (notes) {
      console.log(`Notes: ${notes}`);
    }
    // Here you would typically make an API call to update the status
  };

  const filteredProofs = filterStatus === 'all' 
    ? parkingProofs 
    : parkingProofs.filter(proof => proof.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Parking Proofs</h2>
          <p className="text-gray-600">Review and verify end-of-ride car condition photos</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-600">
                {parkingProofs.filter(p => p.status === 'pending').length}
              </p>
            </div>
            <AlertTriangle className="text-yellow-600" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {parkingProofs.filter(p => p.status === 'approved').length}
              </p>
            </div>
            <CheckCircle className="text-green-600" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Needs Cleaning</p>
              <p className="text-2xl font-bold text-orange-600">
                {parkingProofs.filter(p => p.status === 'not_clean').length}
              </p>
            </div>
            <XCircle className="text-orange-600" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Damage Reported</p>
              <p className="text-2xl font-bold text-red-600">
                {parkingProofs.filter(p => p.status === 'damage_reported').length}
              </p>
            </div>
            <XCircle className="text-red-600" size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Search className="text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by customer or booking ID..." 
              className="border-0 outline-none text-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={16} />
            <select 
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="not_clean">Not Clean</option>
              <option value="damage_reported">Damage Reported</option>
            </select>
          </div>
        </div>
      </div>

      {/* Parking Proofs List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredProofs.map((proof) => (
          <div key={proof.id} className="bg-white rounded-lg border border-gray-200 p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-base font-semibold text-gray-900 truncate">{proof.customer}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center ${getStatusColor(proof.status)}`}>
                    {getStatusIcon(proof.status)}
                    <span className="ml-1">{proof.status.replace('_', ' ').toUpperCase()}</span>
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-0.5">
                  <div className="flex items-center space-x-4">
                    <span><strong>ID:</strong> {proof.bookingId}</span>
                    <span><strong>Car:</strong> {proof.car.split('(')[0].trim()}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span><strong>Location:</strong> {proof.location}</span>
                    <span><strong>Time:</strong> {proof.submittedAt.split(' ')[1]}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 ml-2">
                <button 
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  onClick={() => setSelectedProof(proof)}
                  title="View Photos"
                >
                  <Eye size={14} />
                </button>
                <a 
                  href={`tel:${proof.phone}`}
                  className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                  title="Call Customer"
                >
                  <Phone size={14} />
                </a>
              </div>
            </div>

            {/* Compact Photo Grid */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {Object.entries(proof.photos).map(([side, url]) => (
                <div key={side} className="relative">
                  <div className="aspect-square bg-gray-100 rounded overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                       onClick={() => setSelectedProof(proof)}>
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                      <Camera className="text-gray-400" size={16} />
                    </div>
                  </div>
                  <span className="absolute top-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 py-0.5 rounded text-[10px] capitalize">
                    {side[0]}
                  </span>
                </div>
              ))}
            </div>

            {/* Notes - Compact */}
            <div className="mb-3">
              <p className="text-xs text-gray-700 line-clamp-2">{proof.notes}</p>
            </div>

            {/* Compact Action Buttons */}
            {proof.status === 'pending' && (
              <div className="flex gap-2">
                <button 
                  onClick={() => handleApproval(proof.id, 'approved')}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
                >
                  <CheckCircle size={12} />
                  <span>Approve</span>
                </button>
                
                <button 
                  onClick={() => handleApproval(proof.id, 'not_clean', 'Car needs cleaning')}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-orange-600 text-white rounded text-xs hover:bg-orange-700 transition-colors"
                >
                  <XCircle size={12} />
                  <span>Not Clean</span>
                </button>
                
                <button 
                  onClick={() => handleApproval(proof.id, 'damage_reported', 'Damage found - contact customer')}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                >
                  <AlertTriangle size={12} />
                  <span>Damage</span>
                </button>
              </div>
            )}

            {/* Compact Review Info */}
            {proof.status !== 'pending' && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Reviewed by {proof.reviewedBy}</span>
                    <span>{proof.reviewedAt.split(' ')[1]}</span>
                  </div>
                  {proof.cleaningFee && (
                    <div className="text-orange-600 font-medium">Cleaning Fee: ${proof.cleaningFee}</div>
                  )}
                  {proof.damageDescription && (
                    <div className="text-red-600 font-medium">Damage: {proof.damageDescription}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Photo Modal */}
      {selectedProof && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Photo Review - {selectedProof.customer}</h3>
                <button 
                  onClick={() => setSelectedProof(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Object.entries(selectedProof.photos).map(([side, url]) => (
                  <div key={side} className="relative">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                        <div className="text-center">
                          <Camera className="mx-auto text-gray-400 mb-2" size={48} />
                          <p className="text-sm text-gray-500 capitalize">{side} View</p>
                        </div>
                      </div>
                    </div>
                    <span className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded capitalize">
                      {side}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingProofsPage;
