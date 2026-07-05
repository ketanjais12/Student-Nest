import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Building, Users, IndianRupee, TrendingUp, 
  PlusCircle, ClipboardList, CheckCircle, XCircle, 
  Clock, ArrowRight, Lightbulb, Bell, Settings
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api'; 

const OwnerHome = () => {
  const { user } = useSelector((state) => state.auth);
  
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalProperties: 0,
      activeTenants: 0,
      monthlyRevenue: 0,
      pendingRequests: 0,
      occupancyRate: 0
    },
    recentRequests: []
  });

  // Fetch real data directly from your database
  const fetchDashboardData = useCallback(async (showLoader = false) => {
    if (showLoader) setLoading(true);
    try {
      const { data } = await api.get('/owner/dashboard');
      
      setDashboardData({
        stats: data?.stats || {
          totalProperties: 0,
          activeTenants: 0,
          monthlyRevenue: 0,
          pendingRequests: 0,
          occupancyRate: 0
        },
        recentRequests: data?.recentRequests || []
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      toast.error(error.response?.data?.message || "Failed to load dashboard data");
    } finally {
      if (showLoader) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData(true);
  }, [fetchDashboardData]);

  const handleRequestAction = async (requestId, action) => {
    // 1. OPTIMISTIC UPDATE: Instantly change the status in the table
    setDashboardData((prev) => ({
      ...prev,
      recentRequests: prev.recentRequests.map((req) => 
        req._id === requestId ? { ...req, status: action } : req
      )
    }));

    try {
      // 2. Send the real update to the database
      await api.patch(`/bookings/${requestId}/status`, { status: action });
      toast.success(`Request ${action} successfully!`);
      
      // 3. Re-fetch in the background to update the top stats (revenue, tenants)
      fetchDashboardData(false);
      
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${action} request`);
      fetchDashboardData(false); // Revert table if it fails
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xl font-bold text-gray-500 animate-pulse">Loading Your Dashboard...</div>
        </div>
      </div>
    );
  }

  const { stats, recentRequests } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Welcome Hero Section */}
        <div className="bg-white rounded-3xl p-8 mb-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              Welcome to Your StudentNest Dashboard 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your properties, review booking requests, and scale your business all from one intuitive platform designed exclusively for hostel owners. Let's fill those rooms.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link 
              to="/add-hostel" 
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
            >
              <PlusCircle className="w-5 h-5" />
              Add New Property
            </Link>
          </div>
        </div>

        {/* 2. Quick Overview & Earnings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Properties</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalProperties}</h3>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Building className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Active listings on platform</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Active Tenants</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.activeTenants}</h3>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-green-600 font-medium mt-4 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {stats.occupancyRate}% Overall Occupancy
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Monthly Revenue</p>
                <h3 className="text-3xl font-bold text-gray-900 flex items-center">
                  <IndianRupee className="w-6 h-6" /> {stats.monthlyRevenue?.toLocaleString() || 0}
                </h3>
              </div>
              <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Income for current billing cycle</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Pending Requests</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.pendingRequests}</h3>
              </div>
              <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                <ClipboardList className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Require your attention</p>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Recent Booking Requests (Database Driven) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-gray-900">Recent Booking Requests</h2>
                  <Link to="/requests" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    View All <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <p className="text-sm text-gray-500">Review incoming applications from prospective tenants. Accept or decline requests to ensure a perfect fit.</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm">
                      <th className="p-4 font-medium">Guest Name</th>
                      <th className="p-4 font-medium">Property</th>
                      <th className="p-4 font-medium">Date Applied</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentRequests.map((req) => (
                      <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-900">{req.student?.name || 'N/A'}</td>
                        <td className="p-4 text-gray-600">{req.hostelId?.name || 'N/A'}</td>
                        <td className="p-4 text-gray-500 text-sm">{new Date(req.createdAt).toLocaleDateString()}</td>
                        <td className="p-4">
                          {req.status === 'pending' && (
                            <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-xs font-bold w-fit">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          )}
                          {req.status === 'approved' && (
                            <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold w-fit">
                              <CheckCircle className="w-3 h-3" /> Approved
                            </span>
                          )}
                          {req.status === 'rejected' && (
                            <span className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-bold w-fit">
                              <XCircle className="w-3 h-3" /> Rejected
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          {req.status === 'pending' ? (
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleRequestAction(req._id, 'approved')}
                                className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors" 
                                title="Approve"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleRequestAction(req._id, 'rejected')}
                                className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" 
                                title="Reject"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </div>
                          ) : (
                             <span className="text-gray-400 text-sm font-medium capitalize">{req.status}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {recentRequests.length === 0 && (
                  <div className="p-12 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <ClipboardList className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-900 font-semibold">You're all caught up!</p>
                    <p className="text-gray-500 text-sm mt-1">There are no pending requests right now in the database.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Quick Actions & Tips */}
          <div className="space-y-6">
            
            {/* Manage Your Hostels */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Manage Your Hostels</h2>
              <p className="text-sm text-gray-600 mb-4">
                Keep your property profiles fresh to attract more bookings. Update availability and highlight new facilities.
              </p>
              <div className="space-y-3">
                <Link to="/my-hostels" className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 text-gray-600 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-600">
                      <Settings className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-gray-700 group-hover:text-blue-700">Go to Properties</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </Link>
              </div>
            </div>

            {/* Tips for Owners */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Tips for Owners</h2>
              </div>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">1.</span>
                  <span><strong>Upload Quality Photos:</strong> Bright, clear images build trust and drastically increase booking rates.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">2.</span>
                  <span><strong>Keep Availability Updated:</strong> Sync your room counts regularly to prevent overbooking.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">3.</span>
                  <span><strong>Respond Quickly:</strong> Owners who respond within 2 hours are 3x more likely to secure a confirmed booking.</span>
                </li>
              </ul>
            </div>

            {/* Recent Notifications (Static Placeholder representing system alerts) */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                  <p className="text-sm text-gray-600">Welcome to StudentNest! Make sure to complete your profile.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0"></div>
                  <p className="text-sm text-gray-600">Tip: Listings with complete facility details get 40% more views.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;