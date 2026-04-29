import React from 'react';
import { CATALOG } from '../data/catalog';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">The EIGOO Collection</h1>
          <p className="text-gray-500 max-w-xl">From high-end cybersecurity solutions to curated lifestyle essentials. Vetted by the Wayfinder Engine.</p>
        </div>
        <div className="mt-6 md:mt-0 flex gap-4">
          <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium">
            <option>All Categories</option>
            <option>Cyber Services</option>
            <option>Apparel</option>
            <option>Gourmet</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {CATALOG.map((product) => (
          <div key={product.id} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-900 shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  {product.price === 0 ? 'FREE' : `$${product.price.toFixed(2)}`}
                </span>
                <button className="bg-[#D4A843] hover:bg-black hover:text-white text-black px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}