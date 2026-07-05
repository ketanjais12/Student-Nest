import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const AddHostel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', 
    roomType: 'Single',
    foodIncluded: false,
    colleges: [{ name: '', distance: ''}], 
    description: '', 
    city: '', 
    address: '', 
    rent: '', 
    availableRooms: '', 
    gender: 'boys', 
    facilities: ''
  });
  const [images, setImages] = useState(null);

  const handleCollegeChange = (index, field, value) => {
    const newColleges = [...formData.colleges];
    newColleges[index][field] = value;
    setFormData({ ...formData, colleges: newColleges });
  };

  const addCollege = () => {
    setFormData({
      ...formData,
      colleges: [...formData.colleges, { name: '', distance: '' }]
    });
  };

  const removeCollege = (index) => {
    const newColleges = formData.colleges.filter((_, i) => i !== index);
    setFormData({ ...formData, colleges: newColleges });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setImages(e.target.files);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const data = new FormData();
  
    // 1. APPEND ALL BASIC FIELDS
    data.append('name', formData.name);
    data.append('city', formData.city);
    data.append('rent', formData.rent);
    data.append('gender', formData.gender);
    data.append('availableRooms', formData.availableRooms);
    data.append('description', formData.description);
    data.append('address', formData.address);
    
    // --> NEW FIELDS APPENDED HERE <--
    data.append('roomType', formData.roomType);
    data.append('foodIncluded', formData.foodIncluded);
    
    // Since colleges is an array of objects, we send it as a JSON string via FormData
    data.append('colleges', JSON.stringify(formData.colleges)); 
  
    // PROPERLY HANDLE FACILITIES ARRAY
    if (formData.facilities) {
      const facilitiesArray = formData.facilities.split(',').map(item => item.trim());
      facilitiesArray.forEach(facility => {
        if (facility) data.append('facilities', facility);
      });
    }
  
    // 2. APPEND THE IMAGES
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        data.append('images', images[i]);
      }
    }
  
    try {
      await api.post('/hostels', data, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      });
      toast.success("Hostel added successfully!");
      navigate('/owner-dashboard'); 
    } catch (error) {
      console.error("Upload error details:", error.response?.data);
      toast.error("Failed to add hostel: Check required fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="container mx-auto px-4 pt-24 pb-8 max-w-3xl">    
    <h2 className="text-3xl font-bold mb-6">List a New Hostel</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Hostel Name</label>
            <input type="text" name="name" required onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input type="text" name="city" required onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" rows="3" onChange={handleChange} className="w-full border p-2 rounded"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Full Address</label>
          <input type="text" name="address" required onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Rent (₹)</label>
            <input type="number" name="rent" required onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Available Rooms</label>
            <input type="number" name="availableRooms" required onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender Focus</label>
            <select name="gender" onChange={handleChange} className="w-full border p-2 rounded bg-white">
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
        </div>

        {/* --- NEW SECTION: ROOM TYPE & FOOD --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Room Sharing Type</label>
            <select name="roomType" value={formData.roomType} onChange={handleChange} className="w-full border p-2 rounded bg-white">
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
              <option value="Dormitory">Dormitory</option>
              <option value="Multiple Options">Multiple Options</option>
            </select>
          </div>
          <div className="flex items-center md:mt-6">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="foodIncluded"
                checked={formData.foodIncluded}
                onChange={(e) => setFormData({...formData, foodIncluded: e.target.checked})}
                className="w-5 h-5 mr-2"
              />
              <span className="text-sm font-medium">Food / Meals Included in Rent</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Facilities (Comma separated)</label>
          <input type="text" name="facilities" onChange={handleChange} className="w-full border p-2 rounded" placeholder="Wifi, AC, Laundry..." />
        </div>

        {/* --- NEW SECTION: NEARBY COLLEGES --- */}
        <div className="bg-gray-50 p-4 rounded border">
          <label className="block text-sm font-medium mb-2">Nearby Colleges</label>
          {formData.colleges.map((college, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input 
                type="text" 
                placeholder="College Name (e.g., Agra College)" 
                value={college.name}
                onChange={(e) => handleCollegeChange(index, 'name', e.target.value)}
                className="flex-1 border p-2 rounded"
              />
              <input 
                type="text" 
                placeholder="Distance (e.g., 1.2 km)" 
                value={college.distance}
                onChange={(e) => handleCollegeChange(index, 'distance', e.target.value)}
                className="w-1/3 border p-2 rounded"
              />
              {formData.colleges.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeCollege(index)}
                  className="bg-red-500 text-white px-3 rounded hover:bg-red-600 transition-colors"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button 
            type="button" 
            onClick={addCollege}
            className="text-primary font-bold text-sm mt-2 hover:underline"
          >
            + Add Another College
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full border p-2 rounded bg-white" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-secondary mt-6 disabled:opacity-50 transition-colors">
          {loading ? 'Uploading & Saving...' : 'Add Hostel'}
        </button>
      </form>
    </div>
  );
};

export default AddHostel;