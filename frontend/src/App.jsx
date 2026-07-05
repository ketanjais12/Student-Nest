import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Added import for Redux
import { Toaster } from 'react-hot-toast';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ForOwners from './pages/ForOwners'; 

// Public Pages
import Home from './pages/Home';
import OwnerHome from './pages/OwnerHome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Hostels from './pages/Hostels';
import HostelDetails from './pages/HostelDetails';
import AboutUs from './pages/AboutUs'; // Fixed import path
import Guidelines from './pages/Guidelines'; // Fixed import path

// Protected Pages
import StudentDashboard from './pages/StudentDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AddHostel from './pages/AddHostel';
import EditHostel from './pages/EditHostel';
import Profile from './pages/Profile';
import MyHostels from './pages/MyHostels';

function App() {
  // Fetch user from Redux state so user?.role works
  const { user } = useSelector((state) => state.auth); 

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Conditional Root Route: Redirects owners, shows Home to students/guests */}
            <Route 
              path="/" 
              element={user?.role === 'owner' ? <Navigate to="/owner/dashboard" /> : <Home />} 
            />
            
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/hostels" element={<Hostels />} />
            <Route path="/hostels/:id" element={<HostelDetails />} />
            <Route path="/owners" element={<ForOwners />} />
            
            {/* Added About and Guidelines routes here */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/guidelines" element={<Guidelines />} />
            
            {/* Protected Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/student-dashboard" element={<StudentDashboard />} />
            </Route>

            {/* Protected Owner Routes */}
            <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
              {/* Note: In your previous code you had /owner/dashboard mapped to OwnerHome 
                  and /owner-dashboard mapped to OwnerDashboard. I've consolidated them here. 
                  Make sure this maps to the exact dashboard component you want! */}
              <Route path="/owner/dashboard" element={<OwnerHome />} />
              <Route path="/owner-dashboard" element={<OwnerDashboard />} />
              
              <Route path="/add-hostel" element={<AddHostel />} />
              <Route path="/edit-hostel/:id" element={<EditHostel />} />
              <Route path="/my-hostels" element={<MyHostels />} />
            </Route>

            {/* Shared Protected Routes (Both Student and Owner) */}
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