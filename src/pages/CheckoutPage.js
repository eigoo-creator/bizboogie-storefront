import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, ArrowLeft, Heart } from 'lucide-react';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY'
];

export default function CheckoutPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('product');
  const variantId = params.get('variant');
  const productName = params.get('name') || 'EIGOO Product';
  const productPrice = parseFloat(params.get('price') || '0');
  const productImage = params.get('image') || '';
  const isPod = params.get('pod') === 'true';
  const provider = params.get('provider') || 'printify';
  const isApparel = params.get('apparel') === 'true';

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    address1: '', address2: '', city: '', region: '', zip: '', country: 'US',
  });
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [scholarshipActive, setScholarshipActive] = useState(true);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isPod) {
        const podApi = (await import('../lib/podApi')).default;
        const result = await podApi.createOrder({
          ...form,
          provider,
          scholarship: scholarshipActive,
          line_items: [{
            product_id: productId,
            variant_id: provider === 'printful' ? parseInt(variantId) : parseInt(variantId),
            quantity: 1,
            price: productPrice,
          }],
        });
        setOrderResult({
          success: true,
          orderId: result.order_id,
          provider: result.provider,
          scholarship: scholarshipActive,
          philanthropy: result.philanthropy,
        });
      } else {
        setOrderResult({
          success: true,
          orderId: `eigoo-${Date.now()}`,
          provider: 'static',
          scholarship: scholarshipActive,
        });
      }
    } catch (err) {
      setOrderResult({ success: false, error: err.message || 'Order failed' });
    } finally {
      setSubmitting(false);
    }
  };

  const providerBadge = () => {
    if (!isPod) return null;
    const label = provider === 'printful' ? 'Printful' : 'Printify';
    return (
      <span className="inline-block bg-white/5 text-gray-400 text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-widest mb-2">
        Fulfilled by {label}
      </span>
    );
  };

  if (orderResult?.success) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-black mb-4">Order Confirmed</h1>
          <p className="text-gray-400 mb-2">Order ID: <span className="text-[#D4A843] font-mono">{orderResult.orderId}</span></p>
          {orderResult.provider && orderResult.provider !== 'static' && (
            <p className="text-gray-500 text-xs mb-2 uppercase tracking-widest">
              Fulfilled via {orderResult.provider === 'printful' ? 'Printful' : 'Printify'}
            </p>
          )}
          <p className="text-gray-500 text-sm mb-6">Your order has been submitted for fulfillment. You will receive a shipping notification once it ships.</p>
          {orderResult.scholarship && (
            <div className="flex items-center justify-center gap-2 bg-[#D4A843]/10 border border-[#D4A843]/20 rounded-xl px-5 py-3 mb-4">
              <Heart className="w-4 h-4 text-[#D4A843] fill-[#D4A843]" />
              <span className="text-[#D4A843] text-sm font-bold">You&apos;ve helped fund a CyberKids scholarship!</span>
            </div>
          )}
          {orderResult.philanthropy?.amount > 0 && (
            <p className="text-emerald-400/70 text-xs mb-8">
              ${orderResult.philanthropy.amount.toFixed(2)} earmarked for {orderResult.philanthropy.beneficiary}
            </p>
          )}
          <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4A843] text-black font-bold rounded-xl hover:bg-white transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Market
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </a>
        <h1 className="text-4xl font-black tracking-tighter mb-12">Secure Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <div className="bg-[#0D0D0F] border border-white/5 rounded-2xl p-8 space-y-5">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#D4A843]" /> Shipping Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input name="first_name" value={form.first_name} onChange={handleChange} required placeholder="First Name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A843] focus:outline-none transition-colors" />
                <input name="last_name" value={form.last_name} onChange={handleChange} required placeholder="Last Name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A843] focus:outline-none transition-colors" />
              </div>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A843] focus:outline-none transition-colors" />
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone (Optional)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A843] focus:outline-none transition-colors" />
              <input name="address1" value={form.address1} onChange={handleChange} required placeholder="Address Line 1" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A843] focus:outline-none transition-colors" />
              <input name="address2" value={form.address2} onChange={handleChange} placeholder="Apt / Suite (Optional)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A843] focus:outline-none transition-colors" />
              <div className="grid grid-cols-3 gap-4">
                <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A843] focus:outline-none transition-colors" />
                <select name="region" value={form.region} onChange={handleChange} required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A843] focus:outline-none transition-colors">
                  <option value="">State</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <input name="zip" value={form.zip} onChange={handleChange} required placeholder="ZIP" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A843] focus:outline-none transition-colors" />
              </div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={scholarshipActive}
                    onChange={(e) => setScholarshipActive(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border transition-all ${scholarshipActive ? 'bg-[#D4A843] border-[#D4A843]' : 'bg-white/5 border-white/20 group-hover:border-[#D4A843]/50'}`}>
                    {scholarshipActive && (
                      <svg className="w-3 h-3 text-black absolute top-1 left-1" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <span className="flex items-center gap-1.5 text-sm font-bold text-[#D4A843]">
                    <Heart className="w-4 h-4 fill-[#D4A843]" /> CyberKids Philanthropy
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Check this box to donate 10% of this purchase to the CyberKids Academy for neurodivergent and autistic youth development. At no extra cost to you.
                  </p>
                </div>
              </label>
            </div>
            <button type="submit" disabled={submitting} className="w-full py-5 bg-[#D4A843] text-black font-black text-lg rounded-2xl hover:bg-white transition-all shadow-[0_0_30px_-5px_rgba(212,168,67,0.5)] disabled:opacity-50 flex items-center justify-center gap-3">
              <CreditCard className="w-5 h-5" />
              {submitting ? 'PROCESSING...' : `COMPLETE ORDER — $${productPrice.toFixed(2)}`}
            </button>
            {orderResult?.success === false && (
              <p className="text-red-400 text-sm text-center">{orderResult.error}</p>
            )}
          </form>
          <div className="lg:col-span-2">
            <div className="bg-[#0D0D0F] border border-white/5 rounded-2xl p-8 sticky top-32">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>
              {productImage && (
                <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-white/5">
                  <img src={decodeURIComponent(productImage)} alt={productName} className="w-full h-full object-cover" />
                </div>
              )}
              <h3 className="font-bold text-white mb-2">{decodeURIComponent(productName)}</h3>
              {isPod && (
                <span className="inline-block bg-[#D4A843]/10 text-[#D4A843] text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest mb-2">
                  {isApparel ? 'Apparel' : 'Print on Demand'}
                </span>
              )}
              {providerBadge()}
              <div className="border-t border-white/5 pt-4 mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-white font-bold">${productPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-400">Calculated at fulfillment</span>
                </div>
                {scholarshipActive && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-400/70 flex items-center gap-1">
                      <Heart className="w-3 h-3" /> CyberKids Donation
                    </span>
                    <span className="text-emerald-400/70">${(productPrice * 0.10).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-white/5 pt-3 flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-black text-[#D4A843]">${productPrice.toFixed(2)}</span>
                </div>
                {scholarshipActive && (
                  <p className="text-gray-600 text-[10px] italic">Donation comes from our margin — not added to your total.</p>
                )}
              </div>
              <div className="mt-6 flex items-center gap-2 text-gray-500 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Secured by EIGOO Encrypted Commerce
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
