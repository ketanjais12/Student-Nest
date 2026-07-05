import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const EditHostel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', description: '', city: '', address: '', rent: '', availableRooms: '', gender: '', facilities: ''
  });

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const { data } = await api.get(`/hostels/${id}`);
        setFormData({
          name: data.name,
          description: data.description,
          city: data.city,
          address: data.address,
          rent: data.rent,
          availableRooms: data.availableRooms,
          gender: data.gender,
          facilities: data.facilities.join(', ')
        });
      } catch (error) {
        toast.error("Error fetching hostel details");
        navigate('/owner-dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchHostel();
  }, [id, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Convert comma separated facilities back to array format for backend
    const payload = {
      ...formData,
      facilities: formData.facilities.split(',').map(item => item.trim())
    };

    try {
      await api.put(`/hostels/${id}`, payload);
      toast.success("Hostel updated successfully!");
      navigate('/owner-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update hostel");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading hostel data...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-3xl font-bold mb-6">Edit Hostel</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Hostel Name</label>
            <input type="text" name="name" value={formData.name} required onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input type="text" name="city" value={formData.city} required onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" rows="3" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Full Address</label>
          <input type="text" name="address" value={formData.address} required onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Rent (₹)</label>
            <input type="number" name="rent" value={formData.rent} required onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Available Rooms</label>
            <input type="number" name="availableRooms" value={formData.availableRooms} required onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender Focus</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded bg-white">
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Facilities (Comma separated)</label>
          <input type="text" name="facilities" value={formData.facilities} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <button type="submit" disabled={submitting} className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-secondary mt-6 disabled:opacity-50">
          {submitting ? 'Updating...' : 'Update Hostel'}
        </button>
      </form>
    </div>
  );
};

export default EditHostel;