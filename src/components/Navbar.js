import React from 'react';
import { ShoppingCart, Shield, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4A843] rounded flex items-center justify-center">
              <Shield className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">EIGOO MARKET</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-[#D4A843]">Cyber Services</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-[#D4A843]">Apparel</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-[#D4A843]">Gourmet</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-[#D4A843] text-black text-[10px] font-bold px-1.5 rounded-full">0</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}