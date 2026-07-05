import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../features/authSlice'; 
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate(user.role === 'owner' ? '/owner-dashboard' : '/student-dashboard');
    }
    if (error) toast.error(error);
  }, [user, error, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }
    dispatch(register(formData));
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Create an Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" name="name" value={formData.name} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:outline-none"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:outline-none"
              placeholder="student@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" name="password" value={formData.password} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
            <select 
              name="role" value={formData.role} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:outline-none bg-white"
            >
              <option value="student">Student looking for a hostel</option>
              <option value="owner">Hostel Owner</option>
            </select>
          </div>
          
          <button 
            type="submit" disabled={isLoading}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition disabled:opacity-50 mt-4"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;