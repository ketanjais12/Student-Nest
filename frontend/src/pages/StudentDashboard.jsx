import { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { CreditCard, Phone, Mail, User, MapPin, IndianRupee, Clock } from 'lucide-react';

const StudentDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(null); 

  useEffect(() => {
    fetchStudentBookings();
  }, []);

  const fetchStudentBookings = async () => {
    try {
      const { data } = await api.get('/bookings/student');
      setBookings(data);
    } catch (error) {
      toast.error("Failed to fetch your bookings");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (bookingId) => {
    setPaymentLoading(bookingId);
    try {
      
     
const token = localStorage.getItem('token'); 

const { data } = await api.post(
  `/bookings/${bookingId}/create-order`,
  {}, 
  {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  }
);
      
      if (!data.success) {
        throw new Error("Could not initiate order transaction setup.");
      }

      
      const options = {
        key: "rzp_test_T4nZ7QKW5KEuj5", 
        amount: data.amount,
        currency: data.currency,
        name: "StudentNest",
        description: "Hostel Secure Booking Fee",
        order_id: data.order_id, 
        handler: async function (response) {
          
          try {
            const verificationPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            
            const verifyRes = await api.post(`/bookings/${bookingId}/verify-payment`, verificationPayload);
            
            if (verifyRes.data.success) {
              toast.success("Payment secured! Owner contact details are unlocked.");
              fetchStudentBookings(); 
            }
          } catch (err) {
            toast.error("Internal application validation failed.");
          }
        },
        prefill: {
          name: "Student Name", 
          email: "student@example.com",
        },
        theme: {
          color: "#2563EB", 
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open(); 

    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not link to payment gateways.");
    } finally {
      setPaymentLoading(null);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-6 pt-28 text-center text-gray-500 font-medium">Loading your dashboard...</div>;
  }

  return (
    <div className="container mx-auto p-6 pt-28 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900 tracking-tight">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
          You haven't made any booking requests yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
              
              {}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {booking.hostel?.name || <span className="text-red-500 italic">Hostel Unavailable</span>}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Requested: {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  booking.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                  booking.status === 'accepted' ? 'bg-amber-100 text-amber-700 animate-pulse' :
                  booking.status === 'paid' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {booking.status === 'accepted' ? 'Approved' : booking.status}
                </span>
              </div>

              {}
              <div className="text-sm space-y-2 text-gray-600 mb-4 border-b border-gray-100 pb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{booking.hostel?.city || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span>Duration: {booking.duration} Months</span>
                </div>
                <div className="flex items-center font-semibold text-gray-800">
                  <IndianRupee className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{booking.hostel?.rent}/month</span>
                </div>
              </div>

              {}
              <div className="mt-auto pt-2">
                
                {}
                {booking.status === 'pending' && (
                  <div className="text-center text-sm font-medium text-blue-600 bg-blue-50 py-3 rounded-xl border border-blue-100">
                    Awaiting Owner Approval...
                  </div>
                )}

                {}
                {booking.status === 'rejected' && (
                  <div className="text-center text-sm font-medium text-red-600 bg-red-50 py-3 rounded-xl border border-red-100">
                    This request was declined by the owner.
                  </div>
                )}

                {}
                {booking.status === 'accepted' && (
                  <div className="space-y-3">
                    <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-100 font-medium">
                      🎉 Great news! The owner approved your request. Complete payment to secure your room and view owner contact information.
                    </p>
                    <button
                      onClick={() => handlePayment(booking._id)}
                      disabled={paymentLoading === booking._id}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center transition-all shadow-md shadow-blue-600/15 disabled:opacity-50"
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      {paymentLoading === booking._id ? 'Processing Payment...' : 'Pay Securely'}
                    </button>
                  </div>
                )}

                {}
                {booking.status === 'paid' && (
                  <div className="bg-green-50/60 rounded-xl p-4 border border-green-100 space-y-2">
                    <div className="text-xs font-bold text-green-800 uppercase tracking-wider mb-2 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 inline-block"></span>
                      Owner Contact Unlocked
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-700 font-medium">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{booking.hostel?.owner?.name || 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-700">
                      <Phone className="h-4 w-4 mr-2 text-green-600" />
                      <a href={`tel:${booking.hostel?.owner?.phone}`} className="hover:underline font-semibold text-gray-900">
                        {booking.hostel?.owner?.phone || 'No phone number provided'}
                      </a>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="truncate">{booking.hostel?.owner?.email || 'N/A'}</span>
                    </div>
                  </div>
                )}

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;