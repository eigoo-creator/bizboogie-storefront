import React, { useState, useEffect } from 'react';
import { CATALOG } from '../data/catalog';
import { ShieldCheck, Zap, ArrowUpRight, Lock, Fingerprint, Eye, ShoppingCart, Shirt } from 'lucide-react';

export default function Home() {
  const [podProducts, setPodProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Collections');
  const [podStatus, setPodStatus] = useState('loading');
  const [activeProviders, setActiveProviders] = useState([]);

  useEffect(() => {
    const fetchPod = async () => {
      try {
        const podApi = (await import('../lib/podApi')).default;
        const data = await podApi.getProducts();
        setPodProducts(data.products || []);
        setActiveProviders(data.providers_active || []);
        setPodStatus('connected');
      } catch (err) {
        console.warn('POD products unavailable, using static catalog:', err.message);
        setPodStatus('offline');
      }
    };
    fetchPod();
  }, []);

  const allProducts = [
    ...CATALOG.map(p => ({
      ...p,
      is_pod: !!p.isPod,
      is_apparel: false,
      min_price: p.price,
      max_price: p.price,
      image: p.image,
      variants: [],
      provider: 'static',
      philanthropy_eligible: false,
    })),
    ...podProducts.map(p => ({
      id: p.id,
      name: p.title,
      description: p.description,
      category: p.category || 'Print on Demand',
      image: p.image,
      price: p.min_price,
      min_price: p.min_price,
      max_price: p.max_price,
      is_pod: true,
      isPod: true,
      is_apparel: p.is_apparel || false,
      variants: p.variants || [],
      route: null,
      provider: p.provider || 'printify',
      philanthropy_eligible: p.philanthropy_eligible !== false,
    })),
  ];

  const categories = ['All Collections', ...new Set(allProducts.map(p => p.category))];

  const filteredProducts = activeCategory === 'All Collections'
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  const handleAction = (product) => {
    if (product.route) {
      window.location.href = product.route;
    } else if (product.is_pod || product.isPod) {
      const variant = product.variants?.[0];
      const price = variant?.price || product.min_price || product.price || 0;
      const qs = new URLSearchParams({
        product: product.id,
        variant: variant?.id || '',
        name: product.name,
        price: price.toString(),
        image: encodeURIComponent(product.image || ''),
        pod: 'true',
        provider: product.provider || 'printify',
        apparel: product.is_apparel ? 'true' : 'false',
      });
      window.location.href = `/checkout?${qs.toString()}`;
    } else {
      const qs = new URLSearchParams({
        product: product.id,
        name: product.name,
        price: (product.price || 0).toString(),
        image: encodeURIComponent(product.image || ''),
        pod: 'false',
        provider: 'static',
        apparel: 'false',
      });
      window.location.href = `/checkout?${qs.toString()}`;
    }
  };

  const providerLabel = (p) => {
    if (p === 'printful') return 'Printful';
    if (p === 'printify') return 'Printify';
    return null;
  };

  return (
    <div className="cyber-grid min-h-screen">
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
              onClick={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })}
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

      <section id="about-section" className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center mb-6 border-[#D4A843]/20 shadow-[0_0_20px_rgba(212,168,67,0.1)]"><Lock className="w-8 h-8 text-[#D4A843]" /></div>
            <h3 className="text-xl font-bold mb-4 tracking-tight">ENCRYPTED COMMERCE</h3>
            <p className="text-gray-500 text-sm">Every transaction is handled through end-to-end encrypted tunnels.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center mb-6 border-[#D4A843]/20 shadow-[0_0_20px_rgba(212,168,67,0.1)]"><Fingerprint className="w-8 h-8 text-[#D4A843]" /></div>
            <h3 className="text-xl font-bold mb-4 tracking-tight">SQUAD-VETTED ASSETS</h3>
            <p className="text-gray-500 text-sm">Every product has been internally audited for security and quality.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center mb-6 border-[#D4A843]/20 shadow-[0_0_20px_rgba(212,168,67,0.1)]"><Eye className="w-8 h-8 text-[#D4A843]" /></div>
            <h3 className="text-xl font-bold mb-4 tracking-tight">ZERO-TRUST LOGISTICS</h3>
            <p className="text-gray-500 text-sm">Total transparency in the supply chain from the lab to your door.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-6 py-3 rounded-xl border text-sm font-bold transition-all ${activeCategory === cat ? 'border-[#D4A843] bg-[#D4A843]/5 text-[#D4A843]' : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section id="catalog-section" className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card group relative bg-[#0D0D0F] border border-white/5 rounded-[32px] overflow-hidden">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="glass px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">{product.category}</span>
                  {product.is_pod && (
                    <span className="bg-[#D4A843] text-black px-2 py-1 rounded-lg text-[9px] font-black flex items-center gap-1">
                      {product.is_apparel ? <Shirt className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                      {product.is_apparel ? 'APPAREL' : 'POD'}
                    </span>
                  )}
                  {product.is_pod && providerLabel(product.provider) && (
                    <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-lg text-[8px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      via {providerLabel(product.provider)}
                    </span>
                  )}
                  {product.philanthropy_eligible && (
                    <span className="bg-emerald-500/80 text-white px-2 py-1 rounded-lg text-[9px] font-black">
                      GIVES BACK
                    </span>
                  )}
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
                    <span className="text-2xl font-black text-white">
                      {(product.price || product.min_price) === 0
                        ? 'FREE'
                        : product.min_price !== product.max_price
                          ? `$${product.min_price.toFixed(2)}+`
                          : `$${(product.price || product.min_price).toFixed(2)}`
                      }
                    </span>
                  </div>
                  <button onClick={() => handleAction(product)} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-[#D4A843] group-hover:text-black transition-all duration-300">
                    {product.route ? <ArrowUpRight className="w-6 h-6" /> : <ShoppingCart className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${podStatus === 'connected' ? 'bg-green-500' : podStatus === 'loading' ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse`} />
            <span className="text-gray-500 text-xs font-mono tracking-widest uppercase">
              {podStatus === 'connected'
                ? `Apparel Bridge: ${activeProviders.length} Provider${activeProviders.length !== 1 ? 's' : ''} Online`
                : podStatus === 'loading'
                  ? 'Syncing Providers...'
                  : 'Apparel Bridge: Offline'
              }
            </span>
          </div>
          <div className="text-gray-600 text-xs font-mono uppercase">
            © 2026 EIGOO Inc // Design v2.06
          </div>
        </div>
      </footer>
    </div>
  );
}
