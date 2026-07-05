import React from 'react';
import { BookOpen, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 flex items-center gap-3">
            <BookOpen className="text-blue-600" size={36} />
            Community Guidelines
          </h1>
          <p className="text-gray-600 text-lg">
            To ensure a safe, respectful, and reliable environment for everyone, we ask all StudentNest users to adhere to the following guidelines.
          </p>
        </div>

        {/* Guidelines for Students */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm uppercase tracking-wide">For Students</span>
          </h2>
          
          <ul className="space-y-6">
            <li className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Accurate Profiles</h3>
                <p className="text-gray-600 text-sm">Always provide real information, including your college ID and emergency contacts. This helps owners verify your request faster.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Respect Hostel Rules</h3>
                <p className="text-gray-600 text-sm">Every property has its own specific rules regarding curfews, visitors, and noise. Review these before booking and strictly follow them during your stay.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Honest Reviews</h3>
                <p className="text-gray-600 text-sm">Leave fair, factual, and constructive feedback after your stay. Abusive language or fake reviews will result in account suspension.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Guidelines for Owners */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg text-sm uppercase tracking-wide">For Property Owners</span>
          </h2>
          
          <ul className="space-y-6">
            <li className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-indigo-500 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Transparent Listings</h3>
                <p className="text-gray-600 text-sm">Upload recent, unedited photos of your property. Clearly state all fees, security deposits, and available amenities. No hidden charges are allowed.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-indigo-500 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Responsive Communication</h3>
                <p className="text-gray-600 text-sm">Aim to accept or reject booking requests within 24 hours. Prompt communication creates a better experience and boosts your ranking on the platform.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-indigo-500 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Fair Treatment</h3>
                <p className="text-gray-600 text-sm">Treat all applicants equally. Discrimination based on race, religion, or background violates our terms of service.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Zero Tolerance Policy */}
        <div className="bg-red-50 rounded-2xl border border-red-100 p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-red-900">Zero Tolerance Policy</h2>
          </div>
          <p className="text-red-800 text-sm leading-relaxed mb-4">
            StudentNest has a strict zero-tolerance policy against fraudulent listings, financial scams, harassment, and discrimination. Any user found violating these terms will be permanently banned from the platform, and appropriate legal action may be taken.
          </p>
          <div className="bg-white/60 p-4 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-900 font-medium">
              If you encounter a listing or user violating these guidelines, please report it immediately to <a href="mailto:support@studentnest.com" className="underline hover:text-red-700">support@studentnest.com</a>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Guidelines;