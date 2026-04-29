import React from 'react';
import { ShoppingBag, Shield, Menu, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-[24px] px-8 h-20 flex justify-between items-center border border-white/10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4A843] rounded-xl flex items-center justify-center shadow-[0_0_20px_-5px_#D4A843]">
              <Shield className="w-5 h-5 text-black" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-white leading-none">EIGOO</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4A843] uppercase">Market</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {['Collections', 'Services', 'Lab', 'About'].map((item) => (
              <a key={item} href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-3 text-gray-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            <button className="flex items-center gap-3 bg-[#D4A843] hover:bg-white text-black px-6 py-3 rounded-xl transition-all duration-300 font-bold">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs">0 ITEMS</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}