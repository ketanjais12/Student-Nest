import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../services/api';
import toast from 'react-hot-toast';
import { 
  MapPin, Users, IndianRupee, Wifi, Utensils, Snowflake, 
  BookOpen, Shirt, ShieldCheck, Droplets, GraduationCap, Star, Info,
  Bed, Coffee 
} from 'lucide-react';

const BACKEND_URL = "http://localhost:5000"; 

const HostelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [selectedImage, setSelectedImage] = useState(null);

  const [bookingData, setBookingData] = useState({
    phoneNumber: '',
    duration: '', 
    purpose: ''
  });

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800";
    const cleanPath = imagePath.replace(/\\/g, "/");
    return `${BACKEND_URL}/${cleanPath}`;
  };

  const getIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('wifi')) return Wifi;
    if (n.includes('food') || n.includes('ro')) return Utensils;
    if (n.includes('ac')) return Snowflake;
    if (n.includes('study')) return BookOpen;
    if (n.includes('laundry')) return Shirt;
    if (n.includes('cctv') || n.includes('security')) return ShieldCheck;
    if (n.includes('water')) return Droplets;
    return Info;
  };

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const { data } = await api.get(`/hostels/${id}`);
        setHostel(data);
      } catch (error) { 
        toast.error("Error loading details"); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchHostel();
  }, [id]);

  if (loading) return <div className="pt-32 text-center text-xl font-bold text-gray-500">Loading hostel details...</div>;
  if (!hostel) return <div className="pt-32 text-center text-xl font-bold text-red-500">Hostel not found!</div>;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to request a booking.");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post('/bookings', {
        student: user._id,               
        hostelId: id,                      
        phoneNumber: bookingData.phoneNumber,
        duration: Number(bookingData.duration), 
        purpose: bookingData.purpose
      });
      
      toast.success("Booking request sent successfully!");
      setShowModal(false);
      setBookingData({ phoneNumber: '', duration: '', purpose: '' }); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit booking request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-6">
          <h1 className="text-4xl font-black text-gray-900">{hostel.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-600">
            <span className="flex items-center gap-1 font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm">
              <Star className="w-4 h-4 fill-current" /> {hostel.rating || "4.5"} (35 Reviews)
            </span>
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-4 h-4" /> {hostel.address}, {hostel.city}
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold uppercase">
              {hostel.gender}
            </span>
          </div>
        </div>

        <div className={`grid gap-2 mb-10 ${hostel.images?.length === 1 ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'} h-[400px]`}>
          {hostel.images?.length > 0 ? (
            <>
              <div className="col-span-2 row-span-2">
                <img 
                  src={getImageUrl(hostel.images[0])} 
                  className="w-full h-full object-cover rounded-2xl cursor-pointer hover:opacity-90 transition-opacity" 
                  alt="Main" 
                  onClick={() => setSelectedImage(getImageUrl(hostel.images[0]))}
                />
              </div>
              {hostel.images.slice(1, 5).map((img, i) => (
                <img 
                  key={i} 
                  src={getImageUrl(img)} 
                  className="w-full h-full object-cover rounded-2xl hidden md:block cursor-pointer hover:opacity-90 transition-opacity" 
                  alt={`Gallery ${i + 1}`} 
                  onClick={() => setSelectedImage(getImageUrl(img))}
                />
              ))}
            </>
          ) : (
             <div className="col-span-4 h-full bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
               No images available
             </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Availability</div>
                <div className="text-lg font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600"/> {hostel?.availableRooms || 0} Rooms
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Room Sharing</div>
                <div className="text-lg font-bold flex items-center gap-2">
                  <Bed className="w-5 h-5 text-blue-600"/> 
                  {hostel?.roomType || 'Standard'} 
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Food / Meals</div>
                <div className="text-lg font-bold flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-blue-600"/> 
                  {hostel?.foodIncluded ? 'Included' : 'Not Included'}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Monthly Rent</div>
                <div className="text-lg font-bold flex items-center text-gray-900">
                  <IndianRupee className="w-5 h-5 text-blue-600"/> {hostel?.rent || 'N/A'}
                </div>
              </div>
            </div>

            {hostel.description && (
              <section>
                <h2 className="text-2xl font-bold mb-4">About this hostel</h2>
                <p className="text-gray-600 leading-relaxed bg-white p-6 rounded-2xl border border-gray-100">
                  {hostel.description}
                </p>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold mb-6">What this place offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hostel.facilities?.map((fac, i) => {
                  const Icon = getIcon(fac);
                  return (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                      <Icon className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-700">{fac}</span>
                    </div>
                  );
                })}
              </div>
            </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Nearby Colleges</h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              
              {hostel.colleges && hostel.colleges.length > 0 ? (
                hostel.colleges.map((c, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="text-blue-600" /> 
                      <span className="font-medium">{c.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-500">{c.distance}</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">No nearby colleges listed by the owner.</div>
              )}

            </div>
          </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Interested in {hostel.name}?</h3>
              <p className="text-gray-500 text-sm mb-6">Secure your room before it gets fully booked.</p>
              
              <button 
                onClick={() => setShowModal(true)} 
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors active:scale-95"
              >
                Request Booking
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full relative shadow-2xl">
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-100 rounded-full p-2"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-bold mb-2">Request Booking</h2>
            <p className="text-gray-500 mb-6 text-sm">Fill out the details below and the hostel owner will contact you.</p>
            
           <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+91 00000 00000"
                  value={bookingData.phoneNumber}
                  onChange={(e) => setBookingData({...bookingData, phoneNumber: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (in months)</label>
                <input 
                  type="number"
                  min="1"
                  required
                  placeholder="e.g., 6"
                  value={bookingData.duration}
                  onChange={(e) => setBookingData({...bookingData, duration: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Stay</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Agra College Student, IT Job"
                  value={bookingData.purpose}
                  onChange={(e) => setBookingData({...bookingData, purpose: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? 'Submitting...' : 'Confirm Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          
          <button 
            onClick={() => setSelectedImage(null)} 
            className="absolute top-6 right-6 text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
          
          <img 
            src={selectedImage} 
            alt="Full screen preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg cursor-default shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

    </div>
  );
};

export default HostelDetails;