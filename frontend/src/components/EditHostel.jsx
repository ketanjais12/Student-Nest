import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const EditHostel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', roomType: 'Single', foodIncluded: false, colleges: [], 
    description: '', city: '', address: '', rent: '', availableRooms: '', 
    gender: 'boys', facilities: ''
  });

  
  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const { data } = await api.get(`/hostels/${id}`);
        setFormData({
          ...data,
          facilities: Array.isArray(data.facilities) ? data.facilities.join(', ') : data.facilities
        });
      } catch (error) {
        toast.error("Error loading hostel data");
      }
    };
    fetchHostel();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      
      await api.put(`/hostels/${id}`, formData);
      toast.success("Hostel updated successfully!");
      navigate('/owner-dashboard');
    } catch (error) {
      toast.error("Failed to update hostel");
    } finally {
      setLoading(false);
    }
  };

  
};