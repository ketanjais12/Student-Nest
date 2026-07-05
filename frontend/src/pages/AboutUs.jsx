import React from 'react';
import { Target, Shield, Users, Home, TrendingUp, Heart } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Making Student Living <span className="text-blue-600">Simple & Secure</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Relocating for education shouldn't be stressful. At StudentNest, we bridge the gap between students seeking a comfortable home and property owners looking for verified tenants.
          </p>
        </div>

        {}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { label: 'Verified Hostels', value: '500+' },
            { label: 'Happy Students', value: '10,000+' },
            { label: 'Cities Covered', value: '15+' },
            { label: 'Support Team', value: '24/7' },
          ].map((stat, i) => (
            <div key={i} className="bg-blue-50 rounded-2xl p-6 text-center border border-blue-100">
              <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-700 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6">
              <Target size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To organize the unorganized student housing sector in India. We strive to provide transparent pricing, real photos, and verified reviews so every student can find their perfect nest without the hassle of brokers.
            </p>
          </div>
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6">
              <Home size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the most trusted student accommodation platform globally, empowering property owners with smart management tools while giving students a safe, vibrant community to live and grow in.
            </p>
          </div>
        </div>

        {}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-500">The principles that guide everything we do.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Trust & Safety',
                desc: 'Every listing and student profile is verified. Safety is our top priority.'
              },
              {
                icon: Heart,
                title: 'Empathy',
                desc: 'We understand the anxiety of moving to a new city. We build with students in mind.'
              },
              {
                icon: TrendingUp,
                title: 'Empowering Owners',
                desc: 'We provide local hostel owners with the tech they need to scale their business.'
              }
            ].map((value, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                  <value.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;