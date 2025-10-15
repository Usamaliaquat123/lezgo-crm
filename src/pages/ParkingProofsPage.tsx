import React, { useState } from 'react';
import { Camera, CheckCircle, XCircle, Clock, Eye, Filter, Download, MapPin } from 'lucide-react';

interface ParkingProof {
  id: number;
  bookingId: string;
  customer: string;
  vehicle: string;
  imageUrl: string;
  location: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

const ParkingProofsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('pending');
  const [selectedProof, setSelectedProof] = useState<ParkingProof | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const proofs: ParkingProof[] = [
    { id: 1, bookingId: 'BK001', customer: 'Ahmed Al-Rashid', vehicle: 'Toyota Camry', imageUrl: '/api/placeholder/400/300', location: 'Dubai Marina', submittedAt: '2 hours ago', status: 'pending' },
    { id: 2, bookingId: 'BK002', customer: 'Sarah Johnson', vehicle: 'BMW X5', imageUrl: '/api/placeholder/400/300', location: 'Downtown Dubai', submittedAt: '3 hours ago', status: 'pending' },
    { id: 3, bookingId: 'BK003', customer: 'Mohammed Hassan', vehicle: 'Honda Civic', imageUrl: '/api/placeholder/400/300', location: 'Jumeirah', submittedAt: '1 day ago', status: 'approved' },
    { id: 4, bookingId: 'BK004', customer: 'Emma Wilson', vehicle: 'Mercedes C-Class', imageUrl: '/api/placeholder/400/300', location: 'Business Bay', submittedAt: '2 days ago', status: 'approved' },
    { id: 5, bookingId: 'BK005', customer: 'Omar Abdullah', vehicle: 'Nissan Altima', imageUrl: '/api/placeholder/400/300', location: 'Deira', submittedAt: '3 days ago', status: 'rejected', notes: 'Poor image quality' },
  ];

  const filteredProofs = proofs.filter(proof => proof.status === activeTab);
  const pendingCount = proofs.filter(p => p.status === 'pending').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="text-green-500" size={16} />;
      case 'rejected': return <XCircle className="text-red-500" size={16} />;
      case 'pending': return <Clock className="text-orange-500" size={16} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleView = (proof: ParkingProof) => {
    setSelectedProof(proof);
    setShowModal(true);
  };

  const handleApprove = (id: number) => {
    console.log('Approved proof:', id);
    setShowModal(false);
  };

  const handleReject = (id: number) => {
    console.log('Rejected proof:', id);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Parking Proofs</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Review and manage parking location proofs
            {pendingCount > 0 && <span className="ml-2 text-orange-600 font-medium">({pendingCount} pending)</span>}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-700">
        {['pending', 'approved', 'rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'pending' && pendingCount > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Proofs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProofs.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Camera className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 dark:text-gray-400">No {activeTab} proofs found</p>
          </div>
        ) : (
          filteredProofs.map((proof) => (
            <div
              key={proof.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                <img
                  src={proof.imageUrl}
                  alt={`Parking proof for ${proof.vehicle}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proof.status)}`}>
                    {getStatusIcon(proof.status)}
                    <span className="capitalize">{proof.status}</span>
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Booking {proof.bookingId}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{proof.submittedAt}</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{proof.customer}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{proof.vehicle}</p>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin size={14} className="mr-1" />
                  {proof.location}
                </div>
                {proof.notes && (
                  <p className="text-xs text-red-600 dark:text-red-400 mb-3">{proof.notes}</p>
                )}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleView(proof)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye size={14} />
                    <span>View</span>
                  </button>
                  {proof.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(proof.id)}
                        className="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(proof.id)}
                        className="flex-1 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for viewing proof details */}
      {showModal && selectedProof && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Parking Proof Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircle size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <img
                  src={selectedProof.imageUrl}
                  alt={`Parking proof for ${selectedProof.vehicle}`}
                  className="w-full rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Booking ID</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedProof.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProof.status)}`}>
                      {getStatusIcon(selectedProof.status)}
                      <span className="capitalize">{selectedProof.status}</span>
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Customer</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedProof.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Vehicle</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedProof.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedProof.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Submitted</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedProof.submittedAt}</p>
                  </div>
                </div>
                {selectedProof.status === 'pending' && (
                  <div className="flex items-center space-x-3 pt-4">
                    <button
                      onClick={() => handleApprove(selectedProof.id)}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(selectedProof.id)}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingProofsPage;

