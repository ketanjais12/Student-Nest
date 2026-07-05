import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Added import for Redux
import { Toaster } from 'react-hot-toast';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ForOwners from './pages/ForOwners'; 

import Home from './pages/Home';
import OwnerHome from './pages/OwnerHome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Hostels from './pages/Hostels';
import HostelDetails from './pages/HostelDetails';
import AboutUs from './pages/AboutUs';
import Guidelines from './pages/Guidelines'; 
import StudentDashboard from './pages/StudentDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AddHostel from './pages/AddHostel';
import EditHostel from './pages/EditHostel';
import Profile from './pages/Profile';
import MyHostels from './pages/MyHostels';

function App() {
  const { user } = useSelector((state) => state.auth); 

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={user?.role === 'owner' ? <Navigate to="/owner/dashboard" /> : <Home />} 
            />
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/hostels" element={<Hostels />} />
            <Route path="/hostels/:id" element={<HostelDetails />} />
            <Route path="/owners" element={<ForOwners />} />
            
            <Route path="/about" element={<AboutUs />} />
            <Route path="/guidelines" element={<Guidelines />} />
            
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/student-dashboard" element={<StudentDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
              <Route path="/owner/dashboard" element={<OwnerHome />} />
              <Route path="/owner-dashboard" element={<OwnerDashboard />} />
              
              <Route path="/add-hostel" element={<AddHostel />} />
              <Route path="/edit-hostel/:id" element={<EditHostel />} />
              <Route path="/my-hostels" element={<MyHostels />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </main>

        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;