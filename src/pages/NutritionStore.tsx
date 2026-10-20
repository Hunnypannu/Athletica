import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { 
  Search, SlidersHorizontal, Star, ShoppingCart, 
  CheckCircle2, ArrowRight, RefreshCw, Lock, ShieldCheck, 
  Zap, Plus, Minus, X, Sparkles, Check 
} from 'lucide-react';

interface NutritionStoreProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product, flavor?: string) => void;
  onUpdateCartQty: (productId: string, flavor: string, delta: number) => void;
  onRemoveFromCart: (productId: string, flavor: string) => void;
  onCheckout: () => void;
}

export const NutritionStore: React.FC<NutritionStoreProps> = ({
  products,
  cart,
  onAddToCart,
  onUpdateCartQty,
  onRemoveFromCart,
  onCheckout,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedFlavors, setSelectedFlavors] = useState<Record<string, string>>({
    'nitro-isolate': 'Choc Hazelnut',
    'glyco-matrix': 'Lemon Lime',
    'pre-ignite-v2': 'Sour Apple',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'hypertrophy', label: 'Muscle Hypertrophy' },
    { id: 'endurance', label: 'Endurance & Hydration' },
    { id: 'recovery', label: 'Recovery & Sleep' },
    { id: 'energy', label: 'Pre-Workout Energy' },
    { id: 'vitamins', label: 'Micronutrients & Vitamins' },
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const targetThreshold = 120.0;
  const amountAway = Math.max(0, targetThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / targetThreshold) * 100);

  const handleFlavorSelect = (productId: string, flavor: string) => {
    setSelectedFlavors(prev => ({ ...prev, [productId]: flavor }));
  };

  const handleAdd = (product: Product) => {
    const flavor = selectedFlavors[product.id] || product.selectedFlavor || (product.flavors ? product.flavors[0] : 'Standard');
    onAddToCart(product, flavor);
    setToastMessage(`Added ${product.name} (${flavor}) to roster`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#caf300] text-[#171e00] font-mono text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-[#caf300]">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dynamic Notification / Telemetry Pill Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#181c22] rounded-xl border border-white/5 shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#caf300] animate-pulse" />
          <span className="font-mono text-xs text-[#caf300] uppercase tracking-wider font-bold">
            LAB DISPATCH // BATCH 2548 VERIFIED
          </span>
          <span className="text-white/20 text-xs hidden md:inline">|</span>
          <span className="font-sans text-xs text-[#c5c9ac] truncate hidden md:inline">
            Informed-Sport WADA compliant inventory available for dispatch in 04h 12m
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#00dbe9] flex items-center gap-1.5 font-semibold">
            <ShieldCheck size={15} />
            100% TRANSPARENT FORMULAS
          </span>
        </div>
      </div>

      {/* Hero Telemetry Showcase Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-[#0a0e14] border border-white/10 shadow-2xl">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[460px] bg-gradient-to-r from-[#0a0e14] via-[#181c22] to-[#1c2026]">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-[#caf300]/10 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-[#00dbe9]/10 blur-[100px] pointer-events-none" />

          {/* Hero Copy */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#caf300]/20 text-[#caf300] font-sans text-[11px] font-bold uppercase rounded border border-[#caf300]/30 tracking-wider">
                  CLINICAL ATHLETE GRADE
                </span>
                <span className="px-2.5 py-0.5 bg-[#262a31] text-[#c5c9ac] font-mono text-[11px] uppercase rounded">
                  SERIES 04
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase font-extrabold leading-none mt-2">
                APEX HYDRO-FUEL <br />
                <span className="text-[#caf300]">&amp; ISOLATE WHEY</span>
              </h1>
              <p className="font-sans text-base text-[#c5c9ac] max-w-lg mt-2 leading-relaxed">
                Engineered for pure cellular absorption. Zero banned substances, zero filler matrices, and clinical macro bio-availability for immediate muscle protein synthesis.
              </p>
            </div>

            {/* Telemetry Stats Strip */}
            <div className="grid grid-cols-3 gap-4 my-6 py-3 px-4 bg-[#0a0e14]/80 backdrop-blur-md rounded-xl max-w-lg border border-white/10">
              <div>
                <div className="font-mono text-[11px] text-[#c5c9ac] uppercase">Bio-Availability</div>
                <div className="font-mono text-2xl font-bold text-white">
                  99.4<span className="text-[#caf300] text-sm">%</span>
                </div>
              </div>
              <div>
                <div className="font-mono text-[11px] text-[#c5c9ac] uppercase">BCAA Per Scoop</div>
                <div className="font-mono text-2xl font-bold text-[#00dbe9]">
                  6.8<span className="text-sm">g</span>
                </div>
              </div>
              <div>
                <div className="font-mono text-[11px] text-[#c5c9ac] uppercase">Heavy Metals</div>
                <div className="font-mono text-2xl font-bold text-white">
                  0.00<span className="text-[10px] text-[#c5c9ac] ml-0.5">ppm</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const p = products.find(prod => prod.id === 'nitro-isolate');
                  if (p) handleAdd(p);
                }}
                className="h-12 px-6 bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] font-display text-sm uppercase font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-[#caf300]/25 transition-all active:scale-95"
              >
                <span>Shop New Arrivals</span>
                <Zap size={18} />
              </button>
              <button
                onClick={() => {
                  const p = products.find(prod => prod.id === 'glyco-matrix');
                  if (p) handleAdd(p);
                }}
                className="h-12 px-6 bg-[#262a31] hover:bg-[#31353c] text-white font-display text-sm uppercase font-bold rounded-xl flex items-center gap-2 border border-white/10 transition-all shadow-md"
              >
                <span>Subscribe &amp; Save 20%</span>
                <RefreshCw size={16} className="text-[#caf300]" />
              </button>
            </div>
          </div>

          {/* Hero Visual Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center p-6 lg:p-8 overflow-hidden">
            <div className="relative w-full h-[320px] lg:h-full flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd4d9TdrSrhmYtiRW9--M38NXQNCQ2akf0QfTFH3SFt57MT4UEzF3jpaENORIGkwgXoBWjs8tfyFOqGW8i-3IynymCcy4npzaWnXA1R8tejCuc3UsXqiqkL9ynVMjlR6gLXeCCCkbJibOSGiN0MVS-vmUd0m-h_H0fHYKTa1jespcCOHkEm_JOFR9Am-NkveaSa9WwC-Khb6BaiPJIqs44Nd8rHAC6PhmjuWiY5jXhexfXeYIS7bFw"
                alt="Apex Hydro-Fuel canister on carbon slate"
                className="w-full h-full object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute bottom-4 right-4 bg-[#0a0e14]/90 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10">
                <CheckCircle2 size={16} className="text-[#caf300]" />
                <span className="font-mono text-[11px] text-white">LGC Informed-Sport Tested #IS-99214</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Rail & Catalogue Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-[#caf300] uppercase tracking-wider font-bold">
              FUEL CATALOGUE
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
              Biochemical Formulation Units
            </h2>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            <div className="relative flex items-center">
              <Search size={18} className="absolute left-3 text-[#c5c9ac]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search amino profile, carbs, creatine..."
                className="h-11 pl-10 pr-4 bg-[#181c22] rounded-xl text-white placeholder:text-[#c5c9ac]/60 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#00dbe9] w-64 sm:w-72 border border-white/5 shadow-sm"
              />
            </div>

            <div className="relative">
              <select
                aria-label="Sort products"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="h-11 px-4 bg-[#181c22] hover:bg-[#262a31] text-white rounded-xl font-mono text-xs uppercase border border-white/5 cursor-pointer outline-none transition-colors"
              >
                <option value="featured">Sort By: Bio-Strain</option>
                <option value="rating">Top Rated (Stars)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Goal Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 font-display text-xs uppercase rounded-xl whitespace-nowrap transition-all font-bold ${
                  isActive
                    ? 'bg-[#caf300] text-[#171e00] shadow-md shadow-[#caf300]/20'
                    : 'bg-[#181c22] hover:bg-[#262a31] text-[#c5c9ac] hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split: Products Grid & Roster Cart Rail */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Products Grid (8 cols) */}
        <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.map(product => {
            const currentFlavor = selectedFlavors[product.id] || (product.flavors ? product.flavors[0] : '');

            return (
              <article
                key={product.id}
                className="flex flex-col justify-between bg-[#0a0e14] rounded-xl p-4 border border-white/10 shadow-lg hover:border-[#caf300]/40 transition-all duration-300 group"
              >
                <div>
                  {/* Thumbnail Frame */}
                  <div className="relative w-full h-56 rounded-lg overflow-hidden bg-[#181c22]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.badgeTop && (
                        <span className="px-2 py-0.5 bg-[#caf300] text-[#171e00] font-sans text-[10px] uppercase font-bold rounded">
                          {product.badgeTop}
                        </span>
                      )}
                      {product.badgeSecondary && (
                        <span className="px-2 py-0.5 bg-[#181c22]/90 backdrop-blur text-white font-sans text-[10px] uppercase rounded border border-white/10">
                          {product.badgeSecondary}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2 right-2 bg-[#0a0e14]/90 backdrop-blur px-2 py-0.5 rounded flex items-center gap-1 font-mono text-xs text-[#caf300] border border-white/10">
                      <Star size={12} fill="#caf300" />
                      <span>{product.rating}</span>
                      <span className="text-[#c5c9ac]">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Product Details Header */}
                  <div className="mt-4 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#caf300] uppercase tracking-wider font-semibold">
                        {product.subtitle}
                      </span>
                      <span className="font-mono text-xs text-[#00dbe9]">
                        {product.stockStatus}
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-white uppercase font-bold group-hover:text-[#caf300] transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-[#c5c9ac] line-clamp-2 mt-0.5">
                      {product.description}
                    </p>
                  </div>

                  {/* Nutrient Stats Pill Row */}
                  <div className="grid grid-cols-3 gap-2 my-3 p-2 bg-[#181c22] rounded-lg text-center border border-white/5">
                    <div>
                      <span className="font-sans text-[10px] text-[#c5c9ac] uppercase block font-medium">
                        {product.macros.label1}
                      </span>
                      <span className="font-mono text-sm font-bold text-[#caf300]">
                        {product.macros.val1}
                      </span>
                    </div>
                    <div>
                      <span className="font-sans text-[10px] text-[#c5c9ac] uppercase block font-medium">
                        {product.macros.label2}
                      </span>
                      <span className="font-mono text-sm font-bold text-white">
                        {product.macros.val2}
                      </span>
                    </div>
                    <div>
                      <span className="font-sans text-[10px] text-[#c5c9ac] uppercase block font-medium">
                        {product.macros.label3}
                      </span>
                      <span className="font-mono text-sm font-bold text-[#00dbe9]">
                        {product.macros.val3}
                      </span>
                    </div>
                  </div>

                  {/* Flavor Selector or Delivery notes */}
                  {product.flavors && product.flavors.length > 0 && (
                    <div className="flex flex-col gap-1 mb-3">
                      <span className="font-mono text-[11px] text-[#c5c9ac]">
                        FLAVOR: <strong className="text-white">{currentFlavor}</strong>
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {product.flavors.map(flavor => (
                          <button
                            key={flavor}
                            onClick={() => handleFlavorSelect(product.id, flavor)}
                            className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-colors ${
                              currentFlavor === flavor
                                ? 'bg-[#caf300] text-[#171e00] font-bold shadow-sm'
                                : 'bg-[#181c22] text-[#c5c9ac] hover:bg-[#262a31] border border-white/5'
                            }`}
                          >
                            {flavor}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.deliveryNote && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#c5c9ac] mb-3">
                      <span className="text-white font-medium">{product.deliveryNote}</span>
                    </div>
                  )}
                </div>

                {/* Footer / Pricing & Cart */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-2">
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] text-[#c5c9ac] uppercase font-bold">Single Purchase</span>
                    <div className="font-mono text-2xl font-bold text-white">
                      ${Math.floor(product.price)}
                      <span className="text-sm text-[#caf300]">
                        .{(product.price % 1).toFixed(2).slice(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdd(product)}
                    className="h-10 px-4 bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] font-display text-xs uppercase font-bold rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <ShoppingCart size={15} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Right Rail: Floating Telemetry Cart & Stacking Drawer (4 cols) */}
        <aside className="xl:col-span-4 flex flex-col gap-4 xl:sticky xl:top-24">
          <div className="bg-[#0a0e14] rounded-2xl p-5 border border-white/10 shadow-xl flex flex-col gap-4">
            {/* Cart Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-[#caf300]" />
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">
                  Athlete Roster
                </h3>
              </div>
              <span className="px-2 py-0.5 bg-[#caf300] text-[#171e00] font-mono text-xs font-bold rounded">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} ITEMS ACTIVE
              </span>
            </div>

            {/* Tiered Free Shipping Progress Tracker */}
            <div className="flex flex-col gap-2 p-3 bg-[#181c22] rounded-xl border border-white/5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[#caf300] text-[16px]">local_shipping</span>
                  FREE APEX SHAKER UNLOCK
                </span>
                <span className="text-[#caf300] font-bold">
                  {amountAway > 0 ? `$${amountAway.toFixed(2)} AWAY` : 'UNLOCKED!'}
                </span>
              </div>
              <div className="w-full h-2 bg-[#262a31] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00dbe9] to-[#caf300] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="font-mono text-[11px] text-[#c5c9ac]">
                {amountAway > 0
                  ? 'Add 1 more supplement unit to claim carbon insulated bottle + free freight.'
                  : 'Congratulations! Carbon insulated shaker + cold logistics freight activated.'}
              </p>
            </div>

            {/* Active Cart Items */}
            <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="py-8 text-center text-[#c5c9ac] font-mono text-xs">
                  Your roster is currently empty. Add formulas from the catalogue.
                </div>
              ) : (
                cart.map(item => (
                  <div
                    key={`${item.product.id}-${item.selectedFlavor}`}
                    className="p-3 bg-[#181c22] rounded-xl flex items-center gap-3 border border-white/5"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#262a31] flex-shrink-0 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-sm font-bold text-white truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromCart(item.product.id, item.selectedFlavor)}
                          className="text-[#c5c9ac] hover:text-[#ffb4ab] transition-colors"
                        >
                          <X size={15} />
                        </button>
                      </div>
                      <div className="font-mono text-[11px] text-[#c5c9ac]">
                        {item.selectedFlavor} // {item.product.macros.val1} {item.product.macros.label1}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2 bg-[#262a31] px-2 py-0.5 rounded font-mono text-xs text-white">
                          <button
                            onClick={() => onUpdateCartQty(item.product.id, item.selectedFlavor, -1)}
                            className="hover:text-[#caf300] font-bold"
                          >
                            <Minus size={12} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => onUpdateCartQty(item.product.id, item.selectedFlavor, 1)}
                            className="hover:text-[#caf300] font-bold"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-mono text-sm font-bold text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Macro Summary Telemetry Breakdown for Order */}
            <div className="p-3 bg-[#1c2026] rounded-xl flex flex-col gap-2 border border-white/5">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] font-bold uppercase text-[#c5c9ac] tracking-wider">
                  Order Bio-Load Contribution
                </span>
                <span className="font-mono text-xs text-[#caf300] font-semibold">Active Stacking</span>
              </div>
              <div className="flex h-2 w-full rounded-full overflow-hidden bg-[#0a0e14]">
                <div className="bg-[#caf300] h-full" style={{ width: '58%' }} title="Protein 58%" />
                <div className="bg-[#00dbe9] h-full" style={{ width: '38%' }} title="Carbs 38%" />
                <div className="bg-[#ffb599] h-full" style={{ width: '4%' }} title="Fat 4%" />
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] text-[#c5c9ac]">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#caf300]" /> 56g Protein
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#00dbe9]" /> 30g Carbs
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#ffb599]" /> 0.5g Lipids
                </span>
              </div>
            </div>

            {/* Order Total Matrix */}
            <div className="flex flex-col gap-1.5 pt-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[#c5c9ac]">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-[#c5c9ac]">
                <span>Pro Athlete VIP Subs</span>
                <span className="text-[#caf300]">- $0.00</span>
              </div>
              <div className="flex items-center justify-between text-[#c5c9ac]">
                <span>Priority Cold Logistics</span>
                <span className="text-[#00dbe9]">FREE</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-1">
                <span className="font-display text-sm uppercase text-white font-bold">Order Total</span>
                <span className="font-mono text-2xl font-bold text-[#caf300]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout CTAs */}
            <div className="flex flex-col gap-2 mt-1">
              <button
                onClick={onCheckout}
                disabled={cart.length === 0}
                className="w-full h-12 bg-[#caf300] hover:bg-[#b0d500] disabled:opacity-40 text-[#171e00] font-display text-sm font-bold uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#caf300]/25 transition-all active:scale-95"
              >
                <span>Initiate Checkout</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => {
                  setToastMessage('Auto-replenish 20% discount applied to your squad account!');
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="w-full h-10 bg-[#181c22] hover:bg-[#262a31] text-white font-mono text-xs uppercase rounded-xl border border-white/5 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={14} className="text-[#caf300]" />
                <span>Switch to Auto-Replenish (Save 20%)</span>
              </button>
            </div>

            {/* Security Badges */}
            <div className="flex items-center justify-center gap-3 py-1 font-mono text-[11px] text-[#c5c9ac]">
              <span className="flex items-center gap-1">
                <Lock size={13} className="text-[#caf300]" /> 256-Bit SSL
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-[#00dbe9]" /> WADA Safe
              </span>
            </div>
          </div>

          {/* Quick Coach Stacking Recommendation Module */}
          <div className="bg-[#181c22] rounded-xl p-4 flex flex-col gap-2 border border-white/5 shadow-md">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#caf300]" />
              <span className="font-display text-sm text-white uppercase font-bold">Apex Bio-Stack AI</span>
            </div>
            <p className="font-sans text-xs text-[#c5c9ac] leading-relaxed">
              Based on your squad training volume (14.2 hrs this cycle), adding <strong className="text-white">Micronized Creapure</strong> maximizes phosphocreatine resynthesis between intervals.
            </p>
            <button
              onClick={() => {
                const creapure = products.find(p => p.id === 'creapure-creatine');
                if (creapure) handleAdd(creapure);
              }}
              className="h-9 px-3 bg-[#262a31] hover:bg-[#31353c] text-[#caf300] font-mono text-xs uppercase rounded-lg flex items-center justify-between transition-colors border border-[#caf300]/20 font-bold"
            >
              <span>+ Add Creapure ($29.99)</span>
              <Plus size={15} />
            </button>
          </div>
        </aside>
      </div>

      {/* Clinical Quality Guarantee Banner */}
      <section className="p-6 lg:p-8 bg-[#181c22] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/5 shadow-lg">
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#caf300]/20 text-[#caf300] font-mono text-xs rounded uppercase font-bold">
              QUALITY TELEMETRY
            </span>
            <span className="font-mono text-xs text-[#c5c9ac] uppercase">ZERO COMPROMISE STANDARDS</span>
          </div>
          <h3 className="font-display text-2xl text-white uppercase font-bold tracking-tight">
            The Athletica Supplement Store Clean Guarantee
          </h3>
          <p className="font-sans text-sm text-[#c5c9ac] leading-relaxed">
            Every single manufactured batch undergoes stringent blind ISO/IEC 17025 testing for over 280 banned compounds. Designed for professional athletes, olympians, and high-performance tacticians.
          </p>
        </div>

        {/* 4 Certification Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
          {[
            { icon: 'verified', label: 'INFORMED SPORT', color: 'text-[#caf300]' },
            { icon: 'biotech', label: 'HPLC PURITY', color: 'text-[#00dbe9]' },
            { icon: 'eco', label: '100% NON-GMO', color: 'text-[#caf300]' },
            { icon: 'health_and_safety', label: 'GMP CERTIFIED', color: 'text-[#00dbe9]' },
          ].map(badge => (
            <div
              key={badge.label}
              className="px-4 py-3 bg-[#1c2026] rounded-xl flex flex-col items-center justify-center text-center gap-1 border border-white/5"
            >
              <span className={`material-symbols-outlined text-[28px] ${badge.color}`}>
                {badge.icon}
              </span>
              <span className="font-sans text-[10px] font-bold text-white uppercase tracking-wider">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
