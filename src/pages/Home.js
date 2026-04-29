import React from 'react';
import { CATALOG } from '../data/catalog';
import { Star, ShieldCheck, Zap, ArrowRight, ArrowUpRight, Lock, Fingerprint, Eye } from 'lucide-react';

export default function Home() {
  return (
    <div className="cyber-grid min-h-screen">
      {/* Luxury Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4A843]/10 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#D4A843]/20 text-[#D4A843] text-xs font-bold tracking-widest mb-8 uppercase">
            <Zap className="w-3 h-3 fill-current" />
            The Wayfinder Engine v1.0
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            <span className="text-white">ELITE</span><br/>
            <span className="gold-gradient italic">PROVISIONS</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            A hyper-curated marketplace for digital defense and high-performance lifestyle assets. 
            Vetted by the squad. Built for the seafarers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-10 py-5 bg-[#D4A843] text-black font-black rounded-full hover:scale-105 hover:bg-white transition-all shadow-[0_0_30px_-5px_rgba(212,168,67,0.5)]">
              BROWSE CATALOG
            </button>
            <button className="px-10 py-5 glass text-white font-bold rounded-full border border-white/10 hover:bg-white/5 transition-all">
              CYBER SERVICES
            </button>
          </div>
        </div>
      </section>

      {/* Security-First Pillars */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center mb-6 border-[#D4A843]/20 shadow-[0_0_20px_rgba(212,168,67,0.1)]">
              <Lock className="w-8 h-8 text-[#D4A843]" />
            </div>
            <h3 className="text-xl font-bold mb-4 tracking-tight">ENCRYPTED COMMERCE</h3>
            <p className="text-gray-500 text-sm">Every transaction is handled through end-to-end encrypted tunnels, ensuring your data never hits the public web.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center mb-6 border-[#D4A843]/20 shadow-[0_0_20px_rgba(212,168,67,0.1)]">
              <Fingerprint className="w-8 h-8 text-[#D4A843]" />
            </div>
            <h3 className="text-xl font-bold mb-4 tracking-tight">SQUAD-VETTED ASSETS</h3>
            <p className="text-gray-500 text-sm">We don't just sell. We verify. Every product in the EIGOO Market has been internally audited for security and quality.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center mb-6 border-[#D4A843]/20 shadow-[0_0_20px_rgba(212,168,67,0.1)]">
              <Eye className="w-8 h-8 text-[#D4A843]" />
            </div>
            <h3 className="text-xl font-bold mb-4 tracking-tight">ZERO-TRUST LOGISTICS</h3>
            <p className="text-gray-500 text-sm">Total transparency in the supply chain. From the lab to your door, we track every waypoint in real-time.</p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
          {['All Collections', 'Cyber Defense', 'High-End Apparel', 'Gourmet Provisions', 'Hardware'].map((cat, i) => (
            <button key={i} className={`whitespace-nowrap px-6 py-3 rounded-xl border text-sm font-bold transition-all ${i === 0 ? 'border-[#D4A843] bg-[#D4A843]/5 text-[#D4A843]' : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATALOG.map((product) => (
            <div key={product.id} className="product-card group relative bg-[#0D0D0F] border border-white/5 rounded-[32px] overflow-hidden">
              {/* Image Container */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Floating Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="glass px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">
                    {product.category}
                  </span>
                  {product.price > 100 && (
                    <span className="bg-[#D4A843] text-black px-2 py-1 rounded-lg text-[9px] font-black flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> VETTED
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{product.name}</h3>
                  <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-[#D4A843] transition-colors" />
                </div>
                
                <p className="text-gray-500 text-sm mb-8 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block">Price</span>
                    <span className="text-2xl font-black text-white">
                      {product.price === 0 ? 'FREE' : `$${product.price.toLocaleString()}`}
                    </span>
                  </div>
                  <button className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#D4A843] group-hover:text-black transition-all duration-300">
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Status Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-500 text-xs font-mono tracking-widest uppercase">Wayfinder Inventory Sync: Online</span>
          </div>
          <div className="text-gray-600 text-xs font-mono uppercase">
            © 2026 EIGOO Inc // Design v2.05
          </div>
        </div>
      </footer>
    </div>
  );
}

function Plus({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
    </svg>
  );
}