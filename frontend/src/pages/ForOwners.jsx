import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, ShieldCheck, Headset, TrendingUp, Megaphone, 
  Wallet, Users, Check, ChevronDown, Star, LayoutDashboard,
  Home, IndianRupee, Bell, CreditCard, ArrowRight, UserCheck
} from 'lucide-react';

const ForOwners = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { question: "Is listing my hostel completely free?", answer: "Yes! Creating your profile and listing your hostel on StudentNest is 100% free. There are no subscription fees or hidden registration charges." },
    { question: "When do I pay the commission?", answer: "We only charge a commission when you receive a confirmed booking and the student pays their first month's rent. You pay nothing upfront." },
    { question: "Can I update room availability in real-time?", answer: "Absolutely. Our Owner Dashboard allows you to instantly update room availability, pricing, and upload new photos whenever you need to." },
    { question: "How do I receive payments?", answer: "Payments are processed securely through our gateway and deposited directly into your registered bank account within 48 hours of student check-in." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="pt-28 pb-12 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Bounded Hero Card Container */}
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden min-h-[500px] md:h-[70vh] flex items-center p-8 md:p-16 shadow-2xl shadow-slate-900/10 animate-in fade-in zoom-in-95 duration-700 ease-out">
            
            {/* Background Image (Contained inside the card) */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
              }}
            >
              {/* Premium Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-white max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 font-semibold text-sm mb-6 border border-blue-500/30 backdrop-blur-sm">
                Hostel Owners Portal
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-sm">
                Grow Your Hostel Business with StudentNest
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl font-light">
                Connect with thousands of verified students actively searching for safe and affordable accommodation near their colleges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Changed to Link component pointing to signup */}
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-600/30 flex items-center justify-center w-max">
                  List Your Hostel <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION (Fixed Overlap by removing -mt-20) */}
      <section className="relative z-20 container mx-auto px-6 max-w-6xl pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: CheckCircle2, title: "Easy Listing", desc: "Set up your property in under 10 minutes." },
            { icon: ShieldCheck, title: "Verified Students", desc: "Every student undergoes ID & college verification." },
            { icon: Headset, title: "Dedicated Support", desc: "24/7 account manager for our premium hosts." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-lg border border-white/40 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <item.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE STUDENTNEST */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Why Choose StudentNest?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">We provide the tools and visibility you need to keep your property fully booked year-round.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: TrendingUp, title: "Get More Bookings", desc: "Reach thousands of students actively searching for hostels in your city." },
              { icon: Megaphone, title: "Free Promotion", desc: "We heavily market your hostel through targeted ads and social media." },
              { icon: Wallet, title: "Earn More Revenue", desc: "Increase your overall occupancy rate and reduce vacant room periods." },
              { icon: UserCheck, title: "Verified Students", desc: "Receive highly qualified booking requests from verified college students." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 flex items-start gap-6 group">
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <feature.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (Fixed Timeline Alignment) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-16">How It Works</h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Center Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-blue-100 transform md:-translate-x-1/2 rounded-full"></div>

            {[
              { step: 1, title: "Register as Hostel Owner", desc: "Create your free account." },
              { step: 2, title: "Add Hostel Details", desc: "Upload photos, configure rooms, pricing, and facilities." },
              { step: 3, title: "Students Browse Listings", desc: "Your property goes live to thousands of students." },
              { step: 4, title: "Receive Booking Requests", desc: "Get notified when a student wants to book." },
              { step: 5, title: "Confirm Booking", desc: "Review the student profile and accept the request." },
              { step: 6, title: "Student Moves In", desc: "Welcome your new tenant and get paid." }
            ].map((item, idx) => (
              <div key={idx} className={`relative flex items-center justify-between mb-12 last:mb-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : 'flex-row'}`}>
                
                {/* Content Box */}
                <div className="w-full md:w-5/12 pl-16 md:pl-0">
                  <div className={`bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-blue-600 border-4 border-white shadow-lg flex items-center justify-center text-white font-bold transform -translate-x-1/2 z-10">
                  {item.step}
                </div>

                {/* Empty space for alternating layout on desktop */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURES & 6. COMMISSION MODEL Split */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Features Grid */}
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Everything You Need to Manage</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Booking Management", icon: LayoutDashboard },
                  { name: "Room Availability Tracker", icon: Home },
                  { name: "Student Verification", icon: ShieldCheck },
                  { name: "Secure Payments", icon: CreditCard },
                  { name: "Instant Notifications", icon: Bell },
                  { name: "Easy Dashboard", icon: LayoutDashboard }
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      <feat.icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-slate-700">{feat.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Commission Pricing Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
              
              <div className="relative z-10">
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-6 inline-block">
                  Risk-Free Partnership
                </span>
                <h3 className="text-4xl font-extrabold mb-4">No Upfront Charges</h3>
                <p className="text-slate-300 text-lg mb-8">You pay only after receiving a confirmed booking and the student moves in.</p>
                
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="text-sm text-slate-300 font-medium mb-1">Standard Commission</div>
                  <div className="text-5xl font-black text-white mb-2">10% - 15%</div>
                  <div className="text-slate-300 text-sm">of the <strong className="text-white">first month's rent only</strong>. Zero recurring fees.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. DASHBOARD PREVIEW */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Powerful Owner Dashboard</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16">Get deep insights into your property performance. Manage bookings, track revenue, and monitor availability all from one place.</p>
          
          {/* Mock UI Wrapper */}
          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-[2rem] p-4 shadow-2xl shadow-blue-900/5 relative">
            <div className="absolute top-4 left-6 flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <div className="w-3 h-3 rounded-full bg-amber-400"></div>
               <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            
            <div className="mt-8 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Total Bookings", value: "15", icon: LayoutDashboard, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Available Rooms", value: "8", icon: Home, color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "Total Revenue", value: "₹1,20,000", icon: IndianRupee, color: "text-indigo-600", bg: "bg-indigo-50" },
                  { label: "Pending Requests", value: "4", icon: Users, color: "text-amber-600", bg: "bg-amber-50" }
                ].map((stat, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-slate-50 bg-slate-50/50 flex flex-col items-center text-center">
                    <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-sm text-slate-500 font-medium mb-1">{stat.label}</div>
                    <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-16">Loved by Property Owners</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Verma", role: "Sunrise Hostel", quote: "StudentNest helped us fill our hostel within 2 weeks of listing. The dashboard is incredibly easy to use." },
              { name: "Priya Sharma", role: "Elite Girls PG", quote: "I love the verified student feature. It gives me peace of mind knowing exactly who is moving into my property." },
              { name: "Amit Patel", role: "Patel Residency", quote: "No upfront fees was the reason I joined, but the continuous stream of bookings is why I stay." }
            ].map((test, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex text-amber-400 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-700 text-lg mb-8 italic">"{test.quote}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{test.name}</h4>
                    <p className="text-sm text-slate-500">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === idx ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200 bg-white hover:border-blue-300'}`}
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-lg text-slate-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="p-6 pt-0 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
             {/* Background glow effects */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
               <div className="absolute top-[-50%] left-[-10%] w-[70%] h-[150%] bg-white/10 rotate-12 transform origin-top-left rounded-[100%] blur-3xl"></div>
             </div>

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Fill Your Hostel Faster?</h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Join hundreds of property owners who are already maximizing their revenue with StudentNest.
              </p>
              {/* Changed to Link component pointing to signup */}
              <Link to="/signup" className="inline-block bg-white text-blue-600 hover:bg-slate-50 font-bold py-5 px-10 rounded-2xl text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-white/20">
                List Your Hostel for Free
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ForOwners;