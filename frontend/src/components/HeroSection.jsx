import { Search, MapPin } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative bg-slate-900 pt-24 pb-32 overflow-hidden mb-16 rounded-b-[3rem] shadow-2xl">
      
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-blue-500/20 rounded-full blur-3xl mix-blend-screen"></div>
      </div>

      <div className="relative container mx-auto px-4 z-10 flex flex-col items-center text-center">
        
        {/* Badge */}
        <span className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-semibold tracking-wide uppercase">
          ✨ The #1 Student Accommodation Platform
        </span>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight max-w-4xl">
          Find Your Perfect <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
             Home Away From Home
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl">
          Discover verified hostels and student accommodations with zero hidden fees. Safe, affordable, and just steps away from your campus.
        </p>

        {/* Floating Search Bar */}
        <div className="w-full max-w-3xl bg-white p-2 rounded-full shadow-xl shadow-indigo-900/50 flex items-center border border-slate-100">
          <div className="flex-1 flex items-center pl-4 pr-2">
            <MapPin className="h-6 w-6 text-indigo-500 mr-3 hidden sm:block" />
            <input 
              type="text" 
              placeholder="Search by city, college, or hostel name..." 
              className="w-full py-3 bg-transparent text-slate-800 placeholder-slate-400 outline-none font-medium"
            />
          </div>
          <button className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center cursor-pointer">
            <Search className="h-5 w-5 sm:mr-2" />
            <span className="hidden sm:block">Search</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 flex items-center justify-center space-x-8 md:space-x-16 text-slate-300">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-extrabold text-white">500+</span>
            <span className="text-sm mt-1">Verified Hostels</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-extrabold text-white">10k+</span>
            <span className="text-sm mt-1">Happy Students</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-extrabold text-white">24/7</span>
            <span className="text-sm mt-1">Support</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;