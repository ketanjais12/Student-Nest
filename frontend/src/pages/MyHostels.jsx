import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { MapPin, Edit, Trash2, Plus, Users, IndianRupee } from 'lucide-react';

const MyHostels = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyHostels();
  }, []);

  const fetchMyHostels = async () => {
    try {
      const { data } = await api.get('/hostels/my-hostels');
      setHostels(data);
    } catch (error) {
      toast.error("Failed to load your hostels");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hostel? This action cannot be undone.")) return;

    try {
      await api.delete(`/hostels/${id}`);
      toast.success("Hostel deleted successfully");
      setHostels(hostels.filter(hostel => hostel._id !== id));
    } catch (error) {
      toast.error("Failed to delete hostel");
    }
  };

  if (loading) return <div className="pt-32 text-center text-xl font-bold text-gray-500">Loading your properties...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">My Hostels</h1>
            <p className="text-gray-500 mt-1">Manage your listed properties</p>
          </div>
          <Link 
            to="/add-hostel" 
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" /> Add New Hostel
          </Link>
        </div>

        {hostels.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-gray-100 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Hostels Listed Yet</h3>
            <p className="text-gray-500 mb-6">You haven't added any properties to your portfolio.</p>
            <Link to="/add-hostel" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
              List Your First Hostel
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {hostels.map((hostel) => (
              <div key={hostel._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                
                <div className="w-full md:w-48 h-32 bg-gray-200 rounded-xl overflow-hidden shrink-0">
                  {hostel.images && hostel.images.length > 0 ? (
                    <img 
                      src={`http://localhost:5000/${hostel.images[0].replace(/\\/g, "/")}`} 
                      alt={hostel.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Image</div>
                  )}
                </div>

                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{hostel.name}</h2>
                      <p className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                        <MapPin className="w-4 h-4" /> {hostel.address}, {hostel.city}
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {hostel.gender}
                    </span>
                  </div>

                  <div className="flex gap-6 mt-4">
                    <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                      <IndianRupee className="w-4 h-4 text-gray-400" /> {hostel.rent}/mo
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                      <Users className="w-4 h-4 text-gray-400" /> {hostel.availableRooms} Rooms left
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col gap-3 w-full md:w-auto shrink-0">
                  <Link 
                    to={`/edit-hostel/${hostel._id}`} 
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(hostel._id)} 
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyHostels;