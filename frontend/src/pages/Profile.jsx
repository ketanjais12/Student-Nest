import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../services/api';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/auth/profile', formData);
      
      const updatedUser = { ...user, name: data.name, email: data.email };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully! Please re-login to see changes globally.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">My Profile</h2>
        <div className="mb-6 flex items-center justify-center">
          <div className="h-24 w-24 bg-primary text-white rounded-full flex items-center justify-center text-4xl font-bold uppercase shadow-inner">
            {user?.name.charAt(0)}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input 
              type="text" disabled value={user?.role.toUpperCase()} 
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed font-semibold text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" name="name" value={formData.name} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary outline-none"
            />
          </div>
          
          <button 
            type="submit" disabled={loading}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition disabled:opacity-50 mt-4"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;