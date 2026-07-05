import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ChevronRight, BedDouble, MapPin, ShieldCheck, CalendarCheck, CreditCard, Star, CheckCircle, Search } from "lucide-react";

const slides = [
  "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2000",
  "https://images.unsplash.com/photo-1709805619372-40de3f158e83?w=2000&q=80",
  "https://images.unsplash.com/photo-1623625434462-e5e42318ae49?q=80&w=2000"
];

const stats = [
  { value: '5000+', label: 'Students Trusted' },
  { value: '100+', label: 'Verified Hostels' },
  { value: '20+', label: 'Cities Covered' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const Home = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Banner with Slider */}
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-8">
          {slides.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
            >
              <img src={img} alt="Hostel" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}

          <div className="absolute inset-0 z-10 flex flex-col justify-center px-12 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md w-fit rounded-full font-semibold text-sm mb-6">
              <Zap className="w-4 h-4 fill-white" /> Trusted by 5,000+ Students
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight max-w-2xl">
              Find your perfect <span className="text-blue-400">hostel</span> near your college.
            </h1>
            
            {/* Explore Hostels Button */}
            <div className="mt-10">
              <button
                onClick={() => navigate("/hostels")}
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Explore Hostels
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-6 left-12 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-blue-500" : "w-4 bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* Statistics Row */}
        <div className="w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-xl shadow-gray-100/50 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x divide-gray-100">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center text-center px-4 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="text-3xl md:text-4xl font-extrabold text-blue-600 tracking-tight mb-1">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Grid Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: BedDouble, title: "Modern Amenities", desc: "High-speed Wi-Fi, laundry, and study desks included." },
            { icon: MapPin, title: "Best Locations", desc: "Located within walking distance from your college." },
            { icon: ShieldCheck, title: "Verified Owners", desc: "Connect only with verified hostel owners for a trusted and transparent booking experience." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl border border-gray-100 transition-all duration-300 group">
              <item.icon className="w-10 h-10 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* --- How it Works Section --- */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div id="how-it-works" className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                How StudentNest Works
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Finding your home away from home has never been this simple. Just follow these three easy steps.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-12 relative">
              {[
                { icon: Search, step: "01", title: "Search & Discover", desc: "Browse through verified hostels near your college and compare prices, facilities, and locations." },
                { icon: CalendarCheck, step: "02", title: "Send Booking Request", desc: "Found the right hostel? Send a booking request directly to the owner and express your interest." },
                { icon: CheckCircle, step: "03", title: "Get Owner Approval", desc: "The hostel owner reviews your booking request and confirms room availability." },
                { icon: CreditCard, step: "04", title: "Complete Payment", desc: "Once approved, make the payment securely through StudentNest to confirm your booking." }
              ].map((item, i, arr) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  {i !== arr.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gray-200 -z-0" />
                  )}
                  <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-blue-600/30 mb-8 z-10 transition-transform hover:scale-105">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wider">
                    Step {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Testimonials Section --- */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                Trusted by Students
              </h2>
              <p className="text-gray-500 text-lg">
                Don't just take our word for it. Here is what others have to say.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: "I found my hostel near LU in 2 days. StudentNest made everything easy.", name: "Aman Singh", role: "B.Tech, LU" },
                { quote: "Sending a booking request was quick, and I received confirmation from the hostel owner without any confusion.", name: "Priya Sharma", role: "B.Com, St. Stephens" },
                { quote: "Verified listings and easy booking. I didn't have to worry about safety at all.", name: "Rahul Verma", role: "B.Sc, Delhi University" },
              ].map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Home;