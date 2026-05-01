import React from 'react';
import { CATALOG } from '../data/catalog';
import { Star, ShieldCheck, Zap, ArrowUpRight, Lock, Fingerprint, Eye, ShoppingCart } from 'lucide-react';

export default function Home() {
  const handleAction = (product) => {
    if (product.route) {
      // Redirect directly to the service hosting page on the subdomain
      window.location.href = product.route;
    } else {
      // Normal checkout flow for physical/POD products
      window.location.href = `/checkout?product=${product.id}`;
    }
  };

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
            <button 
              onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth' })}
              className="px-10 py-5 bg-[#D4A843] text-black font-black rounded-full hover:scale-105 hover:bg-white transition-all shadow-[0_0_30px_-5px_rgba(212,168,67,0.5)]"
            >
              BROWSE CATALOG
            </button>
            <button 
              onClick={() => window.location.href = 'https://cyberops.bizboogie.com/services'}
              className="px-10 py-5 glass text-white font-bold rounded-full border border-white/10 hover:bg-white/5 transition-all"
            >
              CYBER SERVICES
            </button>
          </div>
        </div>
      </section>

      {/* Security Pillars Integrated... */}
      {/* (Rest of the previous UI remains the same, updated button logic below) */}

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATALOG.map((product) => (
            <div key={product.id} className="product-card group relative bg-[#0D0D0F] border border-white/5 rounded-[32px] overflow-hidden">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="glass px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">{product.category}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{product.name}</h3>
                  <button onClick={() => handleAction(product)}><ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-[#D4A843] transition-colors" /></button>
                </div>
                <p className="text-gray-500 text-sm mb-8 line-clamp-2 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block">Price</span>
                    <span className="text-2xl font-black text-white">{product.price === 0 ? 'FREE' : `$${product.price.toLocaleString()}`}</span>
                  </div>
                  <button 
                    onClick={() => handleAction(product)}
                    className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#D4A843] group-hover:text-black transition-all duration-300"
                  >
                    {product.route ? <ArrowUpRight className="w-6 h-6" /> : <ShoppingCart className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer... */}
    </div>
  );
}