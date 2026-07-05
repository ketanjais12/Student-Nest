import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import { 
  Menu, X, Building2, Home as HomeIcon, Compass, 
  Lightbulb, Key, LayoutDashboard, LogOut, LogIn, UserPlus 
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  
  const isLoggedIn = !!user;
  const dashboardPath = user?.role === 'owner' ? '/owner-dashboard' : '/student-dashboard';
  const userName = user?.name || user?.firstName || "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
    window.location.href = "/login"; 
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---> UPDATED FILTER LOGIC <---
  // Hide "Browse" for owners, and hide "For Owners" for students
  const navLinks = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Browse", path: "/hostels", icon: Compass },
    { name: "How it Works", path: "/how-it-works", icon: Lightbulb },
    { name: "For Owners", path: "/owners", icon: Key },
  ].filter(link => 
    !(link.name === "Browse" && user?.role === "owner") &&
    !(link.name === "For Owners" && user?.role === "student")
  );

  const handleHowItWorksClick = (e) => {
    e.preventDefault();
    setIsOpen(false); 

    if (window.location.pathname === '/') {
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-700 transition-colors">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900">
            Student<span className="text-blue-600">Nest</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path === "/how-it-works" ? "/" : link.path}
                onClick={link.path === "/how-it-works" ? handleHowItWorksClick : undefined}
                className={`flex items-center gap-1.5 font-semibold transition-colors ${
                  location.pathname === link.path ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </div>
          <div className="h-6 w-px bg-gray-200"></div>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="hidden lg:flex items-center text-sm font-semibold text-blue-800 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                  Welcome, {userName || "back"}! 👋
                </span>
                
                <Link to={dashboardPath} className="flex items-center gap-1.5 font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-1.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 px-5 py-2.5 rounded-xl font-bold transition-colors">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-1.5 font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link to="/signup" className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-transform active:scale-95 shadow-md shadow-blue-600/20">
                  <UserPlus className="w-4 h-4" /> Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl flex flex-col py-4 px-6 gap-4 animate-in fade-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path === "/how-it-works" ? "/" : link.path}
              onClick={link.path === "/how-it-works" ? handleHowItWorksClick : () => setIsOpen(false)}
              className={`flex items-center gap-3 text-lg font-semibold ${location.pathname === link.path ? "text-blue-600" : "text-gray-700"}`}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          ))}
          
          <div className="h-px w-full bg-gray-100 my-1"></div>

          <div className="flex flex-col gap-3 pb-2">
            {isLoggedIn ? (
              <>
                <div className="text-center py-2 text-sm font-semibold text-blue-800 bg-blue-50 rounded-lg mb-1 border border-blue-100">
                  Welcome, {userName || "back"}! 👋
                </div>

                <Link 
                  to={dashboardPath} 
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2"
                >
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </Link>
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }} 
                  className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 py-3 rounded-xl font-bold transition-colors"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2"
                >
                  <LogIn className="w-5 h-5" /> Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md shadow-blue-600/10"
                >
                  <UserPlus className="w-5 h-5" /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;