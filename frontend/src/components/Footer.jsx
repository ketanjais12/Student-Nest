import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, GraduationCap, ArrowRight 
} from 'lucide-react';

// Manual SVG components to fix the "export not found" error
const Facebook = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Instagram = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => {
  // Define routes for your navigation links
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Hostels', path: '/hostels' }, // Adjust path if different
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const ownerLinks = [
    { name: 'List Property', path: '/add-hostel' },
    { name: 'Owner Login', path: '/login' },
    { name: 'Guidelines', path: '/guidelines' }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-extrabold text-gray-900 flex items-center gap-2 mb-4 tracking-tight">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                <GraduationCap size={24} />
              </div>
              Student<span className="text-blue-600">Nest</span>
            </Link>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Making student living simple, secure, and stylish. Your trusted partner in finding the perfect home away from home.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium">
                    <ArrowRight size={14} /> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Property Owners */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">For Owners</h3>
            <ul className="space-y-4">
              {ownerLinks.map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium">
                    <ArrowRight size={14} /> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-500">
                <MapPin className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                <span>123 University Road, <br />Lucknow, India</span>
              </li>
              <li className="flex items-center text-gray-500">
                <Phone className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <span>+91 7839845004  </span>
              </li>
              <li className="flex items-center text-gray-500">
                <Mail className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <span>hello@studentnest.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} StudentNest. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;