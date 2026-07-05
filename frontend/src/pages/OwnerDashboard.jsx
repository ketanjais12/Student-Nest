import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Phone, Clock, FileText, Building, PlusCircle } from 'lucide-react';

const OwnerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // Tracks which booking is being updated

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await api.get('/bookings/owner');
      setBookings(data);
    } catch (error) {
      toast.error("Failed to fetch booking requests");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    setActionLoading(bookingId);
    try {
      await api.put(`/bookings/${bookingId}/status`, { status: newStatus });
      toast.success(`Booking ${newStatus} successfully!`);
      
      // Update the local state so the UI reflects the change instantly
      setBookings((prevBookings) => 
        prevBookings.map((b) => 
          b._id === bookingId ? { ...b, status: newStatus } : b
        )
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-6 pt-28 text-center text-gray-500 font-medium">Loading your requests...</div>;
  }

  return (
    <div className="container mx-auto p-6 pt-28 min-h-screen bg-gray-50">
      
      {/* Dashboard Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Owner Dashboard</h1>
      <p className="text-gray-500 mb-8 mt-1">Manage your properties and review incoming student bookings.</p>
      
      {/* ---> NEW: QUICK ACTIONS HUB <--- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link 
          to="/add-hostel" 
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-5 group"
        >
          <div className="bg-blue-50 p-4 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <PlusCircle className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">List a New Hostel</h2>
            <p className="text-gray-500 text-sm mt-0.5">Add a new property to start accepting students.</p>
          </div>
        </Link>

        <Link 
          to="/my-hostels" 
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-5 group"
        >
          <div className="bg-green-50 p-4 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <Building className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Manage My Hostels</h2>
            <p className="text-gray-500 text-sm mt-0.5">View, edit details, or remove your listed properties.</p>
          </div>
        </Link>
      </div>

      {/* Bookings Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight">Booking Requests</h2>
      
      {bookings.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
          You don't have any booking requests yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
              
              {/* Header: Hostel & Status */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {booking.hostel?.name || <span className="text-red-500 italic">Deleted Hostel</span>}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Requested on: {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  booking.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                  booking.status === 'accepted' ? 'bg-amber-100 text-amber-700' :
                  booking.status === 'paid' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {booking.status}
                </span>
              </div>

              {/* Student Details */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3 flex-grow">
                <div className="font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-2">
                  {booking.student?.name || "Unknown Student"}
                </div>
                
                <div className="flex items-start text-sm text-gray-600">
                  <FileText className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                  <span><strong className="text-gray-700">Purpose:</strong> {booking.purpose}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span><strong className="text-gray-700">Duration:</strong> {booking.duration} months</span>
                </div>

                {/* Secure Contact Logic */}
                <div className="flex items-center text-sm">
                  <Phone className={`h-4 w-4 mr-2 ${booking.status === 'paid' ? 'text-green-500' : 'text-gray-400'}`} />
                  {booking.status === 'paid' ? (
                    <span className="font-bold text-green-700">{booking.phoneNumber}</span>
                  ) : (
                    <span className="text-gray-400 italic">Hidden until payment</span>
                  )}
                </div>
              </div>

              {/* Action Buttons (Only show if pending) */}
              {booking.status === 'pending' && (
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handleStatusUpdate(booking._id, 'accepted')}
                    disabled={actionLoading === booking._id}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50"
                  >
                    <CheckCircle className="h-5 w-5 mr-1" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                    disabled={actionLoading === booking._id}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2.5 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50"
                  >
                    <XCircle className="h-5 w-5 mr-1" />
                    Reject
                  </button>
                </div>
              )}

              {/* Messages for other statuses */}
              {booking.status === 'accepted' && (
                <div className="text-center text-sm font-medium text-amber-600 bg-amber-50 py-3 rounded-xl">
                  Waiting for student to pay...
                </div>
              )}
              
              {booking.status === 'paid' && (
                <div className="text-center text-sm font-medium text-green-700 bg-green-50 py-3 rounded-xl border border-green-100">
                  Payment secured. You can now contact the student!
                </div>
              )}
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;