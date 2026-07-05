import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchHostels } from '../features/hostelSlice';
import HostelCard from '../components/HostelCard';
import { Search, Plus } from 'lucide-react';

const Hostels = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get hostels state and user auth state from Redux
  const { hostels, loading } = useSelector((state) => state.hostels);
  const { user } = useSelector((state) => state.auth); 
  
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    gender: ''
  });

  useEffect(() => {
    dispatch(fetchHostels(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    // Moved the top padding (pt-28) here so the whole page starts below the fixed Navbar
    <div className="container mx-auto px-4 pt-28 pb-12 min-h-screen bg-gray-50">
      
      {/* Page Header & Add Hostel Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900">Available Hostels</h1>
        
        {/* Conditionally render for owners */}
        {user?.role === 'owner' && (
          <button 
            onClick={() => navigate('/add-hostel')}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-md shadow-blue-600/20 active:scale-95"
          >
            <Plus size={20} /> Add Hostel
          </button>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input 
            type="text" 
            name="search"
            placeholder="Search hostels..." 
            // Removed pt-24 from here and replaced with standard padding (py-3)
            className="w-full py-3 pl-12 pr-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            onChange={handleFilterChange}
          />
        </div>
        <input 
          type="text" 
          name="city"
          placeholder="City" 
          className="w-full md:w-48 px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          onChange={handleFilterChange}
        />
        <select 
          name="gender" 
          className="w-full md:w-48 px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-700 cursor-pointer"
          onChange={handleFilterChange}
        >
          <option value="">All Genders</option>
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>

      {/* Loading & Grid Display */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : hostels.length === 0 ? (
        <div className="text-center text-gray-500 py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
          No hostels found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hostels.map(hostel => (
            <HostelCard key={hostel._id} hostel={hostel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hostels;