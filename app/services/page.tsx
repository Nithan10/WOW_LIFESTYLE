'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Building2, 
  Tag, 
  Percent, 
  CheckCircle,
  ArrowRight,
  Package,
  TrendingUp,
  Sparkles,
  Gift,
  Crown,
  Truck,
  Target,
  Users,
  Clock,
  Zap,
  Phone // Added Phone icon
} from 'lucide-react';
import ContactPage from './ContactPage'; // Import ContactPage component

// --- PRODUCT DATA FOR RETAIL ---
const retailProducts = [
  {
    id: 1,
    name: "Ferrari F1 Ultimate Collector",
    category: "Diecast Models",
    price: "₹12,499",
    originalPrice: "₹16,999",
    discount: "26%",
    stock: "In Stock",
    rating: "4.8",
    sales: "1.2k",
    icon: "🚗"
  },
  {
    id: 2,
    name: "AI Smart Companion Bot",
    category: "Educational Tech",
    price: "₹8,999",
    originalPrice: "₹11,499",
    discount: "22%",
    stock: "Limited",
    rating: "4.9",
    sales: "845",
    icon: "🤖"
  },
  {
    id: 3,
    name: "Magic Artist Studio Pro",
    category: "Arts & Crafts",
    price: "₹5,499",
    originalPrice: "₹7,999",
    discount: "31%",
    stock: "In Stock",
    rating: "4.7",
    sales: "2.3k",
    icon: "🎨"
  },
  {
    id: 4,
    name: "Premium LEGO Architecture Set",
    category: "Building Blocks",
    price: "₹9,999",
    originalPrice: "₹14,999",
    discount: "33%",
    stock: "In Stock",
    rating: "4.8",
    sales: "3.1k",
    icon: "🧱"
  },
  {
    id: 5,
    name: "Interactive Globe Explorer",
    category: "Educational",
    price: "₹6,499",
    originalPrice: "₹8,999",
    discount: "28%",
    stock: "Limited",
    rating: "4.6",
    sales: "1.7k",
    icon: "🌍"
  },
  {
    id: 6,
    name: "Robotic Coding Kit Pro",
    category: "STEM Toys",
    price: "₹11,999",
    originalPrice: "₹15,999",
    discount: "25%",
    stock: "In Stock",
    rating: "4.9",
    sales: "956",
    icon: "⚙️"
  }
];

// --- PRODUCT DATA FOR WHOLESALE ---
const wholesaleProducts = [
  {
    id: 1,
    name: "Speed Champions Bulk Pack",
    category: "Vehicles (100 units)",
    price: "₹2,49,999",
    moq: "50 units",
    margin: "45% margin",
    delivery: "7 days",
    rating: "4.9",
    orders: "45",
    icon: "📦"
  },
  {
    id: 2,
    name: "Educational STEM Kit Pallet",
    category: "Learning Toys (200 units)",
    price: "₹3,75,000",
    moq: "100 units",
    margin: "52% margin",
    delivery: "10 days",
    rating: "4.8",
    orders: "32",
    icon: "🧠"
  },
  {
    id: 3,
    name: "Seasonal Festival Collection",
    category: "Gift Sets (150 units)",
    price: "₹1,89,999",
    moq: "75 units",
    margin: "48% margin",
    delivery: "5 days",
    rating: "4.9",
    orders: "67",
    icon: "🎁"
  },
  {
    id: 4,
    name: "Plush Toys Variety Pack",
    category: "Soft Toys (300 units)",
    price: "₹4,25,000",
    moq: "150 units",
    margin: "55% margin",
    delivery: "14 days",
    rating: "4.7",
    orders: "28",
    icon: "🧸"
  },
  {
    id: 5,
    name: "Electronic Learning Games",
    category: "Digital Toys (100 units)",
    price: "₹3,15,000",
    moq: "50 units",
    margin: "50% margin",
    delivery: "7 days",
    rating: "4.8",
    orders: "39",
    icon: "🎮"
  },
  {
    id: 6,
    name: "Outdoor Play Equipment Set",
    category: "Sports Toys (50 units)",
    price: "₹5,75,000",
    moq: "25 units",
    margin: "60% margin",
    delivery: "21 days",
    rating: "4.9",
    orders: "18",
    icon: "⚽"
  }
];

export default function ServicesPage() {
  const [viewMode, setViewMode] = useState<'retail' | 'wholesale'>('retail');
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showContact, setShowContact] = useState(false); // State for contact modal

  const currentProducts = viewMode === 'retail' ? retailProducts : wholesaleProducts;

  // Listen for theme changes from localStorage or navbar
  useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }

    // Listen for custom theme change events
    const handleThemeChange = (e: CustomEvent) => {
      setIsDarkMode(e.detail.theme === 'dark');
    };

    window.addEventListener('themeChange' as any, handleThemeChange);

    return () => {
      window.removeEventListener('themeChange' as any, handleThemeChange);
    };
  }, []);

  // Prevent body scroll when contact modal is open
  useEffect(() => {
    if (showContact) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showContact]);

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden pt-20 pb-12 px-4 md:px-8 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white' 
        : 'bg-gradient-to-br from-amber-50 via-white to-yellow-50 text-slate-900'
    }`}>
      
      {/* Header with spacing from navbar */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-4">
            {/* WOW Logo Style Heading */}
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2 relative">
                <span className="relative z-10">
                  <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>WOW</span>
                  <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent animate-gradient ml-3">LIFESTYLE</span>
                </span>
              </h1>
              {/* Tagline */}
              <div className="flex items-center gap-2 mt-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 animate-pulse" />
                <p className={`text-lg md:text-xl font-medium italic ${
                  isDarkMode ? 'text-yellow-400' : 'text-amber-600'
                }`}>
                  Just Looking Like a "WOW"
                </p>
              </div>
            </div>

            <p className={`text-lg max-w-2xl ${
              isDarkMode ? 'text-yellow-400/80' : 'text-amber-700/80'
            }`}>
              {viewMode === 'retail' 
                ? "Premium toys for families and collectors" 
                : "Bulk products for businesses and resellers"}
            </p>
          </div>

          {/* Contact Us Button and Mode Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Contact Us Button - Only shown on retail view */}
            {viewMode === 'retail' && (
              <button 
                onClick={() => setShowContact(true)}
                className={`px-6 py-3.5 rounded-lg font-bold transition-all flex items-center gap-3 shadow-lg hover:scale-105 group ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600 shadow-yellow-500/30' 
                    : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 shadow-amber-500/30'
                }`}
              >
                <Phone size={18} className="group-hover:animate-pulse" /> 
                <span>CONTACT US</span>
              </button>
            )}

            {/* Mode Toggle */}
            <div className={`inline-flex p-1 backdrop-blur-sm rounded-xl shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800/90 border border-yellow-500/30 shadow-yellow-500/20' 
                : 'bg-white/90 border border-amber-300 shadow-amber-500/20'
            }`}>
              <button 
                onClick={() => { setViewMode('retail'); setSelectedProduct(0); }}
                className={`relative px-8 py-3.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-3 ${viewMode === 'retail' 
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/50' 
                  : isDarkMode 
                    ? 'text-yellow-400 hover:text-yellow-300' 
                    : 'text-amber-700 hover:text-amber-900'
                }`}
              >
                <ShoppingBag size={18} /> 
                <span className="font-black tracking-wide">RETAIL</span>
              </button>
              <button 
                onClick={() => { setViewMode('wholesale'); setSelectedProduct(0); }}
                className={`relative px-8 py-3.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-3 ${viewMode === 'wholesale' 
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/50' 
                  : isDarkMode 
                    ? 'text-yellow-400 hover:text-yellow-300' 
                    : 'text-amber-700 hover:text-amber-900'
                }`}
              >
                <Building2 size={18} />
                <span className="font-black tracking-wide">WHOLESALE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products Table - 2/3 width */}
          <div className="lg:col-span-2">
            <div className={`backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden ${
              isDarkMode 
                ? 'bg-slate-900/95 shadow-yellow-500/10 border border-yellow-500/20' 
                : 'bg-white/95 shadow-amber-500/10 border border-amber-200'
            }`}>
              {/* Table Header */}
              <div className={`p-8 border-b ${
                isDarkMode
                  ? viewMode === 'retail' 
                    ? 'bg-gradient-to-r from-slate-800 to-slate-900 border-yellow-500/20' 
                    : 'bg-gradient-to-r from-slate-900 to-slate-800 border-yellow-500/20'
                  : viewMode === 'retail'
                    ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200'
                    : 'bg-gradient-to-r from-yellow-50 to-amber-50 border-amber-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-8 rounded-full ${
                        viewMode === 'retail' 
                          ? 'bg-yellow-400' 
                          : 'bg-amber-500'
                      }`} />
                      <h2 className={`text-2xl font-black ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {viewMode === 'retail' ? 'RETAIL PRODUCTS' : 'WHOLESALE PRODUCTS'}
                      </h2>
                    </div>
                    <p className={`text-sm pl-6 ${
                      isDarkMode ? 'text-yellow-400/80' : 'text-amber-700/80'
                    }`}>
                      {viewMode === 'retail' 
                        ? 'List of available products with exclusive pricing' 
                        : 'Bulk products with maximum profit margins'}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    isDarkMode 
                      ? 'bg-slate-800 border border-yellow-500/30' 
                      : 'bg-white border border-amber-300'
                  }`}>
                    <span className={`text-sm font-bold ${
                      isDarkMode ? 'text-yellow-400' : 'text-amber-700'
                    }`}>
                      {currentProducts.length} PRODUCTS
                    </span>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={isDarkMode ? 'bg-slate-800/50' : 'bg-amber-50/50'}>
                    <tr>
                      <th className={`text-left p-5 text-sm font-black uppercase tracking-wider ${
                        isDarkMode ? 'text-yellow-400' : 'text-amber-800'
                      }`}>PRODUCT</th>
                      <th className={`text-left p-5 text-sm font-black uppercase tracking-wider ${
                        isDarkMode ? 'text-yellow-400' : 'text-amber-800'
                      }`}>CATEGORY</th>
                      <th className={`text-left p-5 text-sm font-black uppercase tracking-wider ${
                        isDarkMode ? 'text-yellow-400' : 'text-amber-800'
                      }`}>PRICE</th>
                      {viewMode === 'retail' ? (
                        <>
                          <th className={`text-left p-5 text-sm font-black uppercase tracking-wider ${
                            isDarkMode ? 'text-yellow-400' : 'text-amber-800'
                          }`}>DISCOUNT</th>
                          <th className={`text-left p-5 text-sm font-black uppercase tracking-wider ${
                            isDarkMode ? 'text-yellow-400' : 'text-amber-800'
                          }`}>STOCK</th>
                        </>
                      ) : (
                        <>
                          <th className={`text-left p-5 text-sm font-black uppercase tracking-wider ${
                            isDarkMode ? 'text-yellow-400' : 'text-amber-800'
                          }`}>MOQ</th>
                          <th className={`text-left p-5 text-sm font-black uppercase tracking-wider ${
                            isDarkMode ? 'text-yellow-400' : 'text-amber-800'
                          }`}>MARGIN</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${
                    isDarkMode ? 'divide-yellow-500/10' : 'divide-amber-100'
                  }`}>
                    {currentProducts.map((product) => (
                      <tr 
                        key={product.id} 
                        className={`cursor-pointer transition-all duration-300 ${
                          isDarkMode
                            ? `hover:bg-yellow-500/5 ${selectedProduct === product.id - 1 ? 'bg-gradient-to-r from-yellow-500/10 to-amber-500/5 ring-1 ring-yellow-500/30' : ''}`
                            : `hover:bg-amber-50/30 ${selectedProduct === product.id - 1 ? 'bg-gradient-to-r from-amber-50/60 to-yellow-50/40 ring-1 ring-amber-300' : ''}`
                        }`}
                        onClick={() => setSelectedProduct(product.id - 1)}
                      >
                        <td className="p-5">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg ${
                              viewMode === 'retail' 
                                ? 'bg-gradient-to-br from-yellow-400 to-amber-500' 
                                : 'bg-gradient-to-br from-amber-500 to-yellow-600'
                            }`}>
                              {product.icon}
                            </div>
                            <div>
                              <div className={`font-bold text-lg ${
                                isDarkMode ? 'text-white' : 'text-slate-900'
                              }`}>
                                {product.name}
                              </div>
                              <div className="flex items-center gap-3 mt-1">
                                <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                                  isDarkMode 
                                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  ⭐ {product.rating}
                                </span>
                                <span className={`text-xs font-medium ${
                                  isDarkMode ? 'text-yellow-400/80' : 'text-amber-700/80'
                                }`}>
                                  {viewMode === 'retail' ? `${'sales' in product ? product.sales : ''} sold` : `${'orders' in product ? product.orders : ''} orders`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-5">
                          <span className={`text-sm font-medium px-3 py-1.5 rounded-lg ${
                            isDarkMode 
                              ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' 
                              : 'text-amber-800 bg-amber-50'
                          }`}>
                            {product.category}
                          </span>
                        </td>
                        <td className="p-5">
                          <div className="flex flex-col">
                            <span className={`font-black text-xl ${
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}>
                              {product.price}
                            </span>
                            {viewMode === 'retail' && 'originalPrice' in product && (
                              <span className={`text-sm line-through font-medium ${
                                isDarkMode ? 'text-yellow-400/50' : 'text-amber-600/70'
                              }`}>
                                {product.originalPrice}
                              </span>
                            )}
                          </div>
                        </td>
                        {viewMode === 'retail' ? (
                          <>
                            <td className="p-5">
                              <span className={`text-lg font-black ${
                                isDarkMode ? 'text-yellow-400' : 'text-red-600'
                              }`}>
                                {'discount' in product ? product.discount : ''}
                              </span>
                            </td>
                            <td className="p-5">
                              <span className={`text-sm font-bold ${
                                'stock' in product && product.stock === 'In Stock' 
                                  ? 'text-green-400' 
                                  : isDarkMode ? 'text-yellow-400' : 'text-amber-700'
                              }`}>
                                {'stock' in product ? product.stock : ''}
                              </span>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="p-5">
                              <span className={`text-sm font-bold ${
                                isDarkMode ? 'text-white' : 'text-slate-800'
                              }`}>
                                {'moq' in product ? product.moq : ''}
                              </span>
                            </td>
                            <td className="p-5">
                              <span className="text-sm font-bold text-green-400">
                                {'margin' in product ? product.margin : ''}
                              </span>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className={`p-6 border-t ${
                isDarkMode 
                  ? 'border-yellow-500/10 bg-gradient-to-r from-slate-800/50 to-slate-900/30' 
                  : 'border-amber-100 bg-gradient-to-r from-amber-50/50 to-yellow-50/30'
              }`}>
                <div className="flex items-center justify-between">
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-yellow-400/80' : 'text-amber-700'
                  }`}>
                    Showing {currentProducts.length} of {currentProducts.length} premium products
                  </div>
                  <button className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                    isDarkMode 
                      ? 'border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10' 
                      : 'border border-amber-400 text-amber-700 hover:bg-amber-50'
                  }`}>
                    VIEW ALL PRODUCTS
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Offer Card - 1/3 width */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === 'retail' ? (
                  // Retail Offer Card
                  <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-2xl p-8 shadow-2xl shadow-yellow-500/30 text-black h-full border border-yellow-300">
                    <div className="flex flex-col h-full">
                      {/* Badge */}
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center">
                          <Crown className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-[0.3em] opacity-90">
                          EXCLUSIVE OFFER
                        </span>
                      </div>

                      {/* Main Offer */}
                      <div className="mb-8 text-center">
                        <div className="relative">
                          <div className="text-8xl font-black mb-2 leading-none">
                            25<span className="text-5xl">%</span>
                          </div>
                          <div className="absolute -top-2 -right-2">
                            <Sparkles className="w-8 h-8 text-black/30" />
                          </div>
                        </div>
                        <div className="text-2xl font-black mb-2 tracking-tight">
                          OFF FOR RETAIL CUSTOMERS
                        </div>
                        <p className="text-black/80 text-sm font-medium opacity-90">
                          Special discount on all retail purchases
                        </p>
                      </div>

                      {/* Details */}
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-4 p-4 bg-black/10 rounded-xl backdrop-blur-sm">
                          <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold">Minimum Purchase</div>
                            <div className="text-sm opacity-90">₹5,000</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-black/10 rounded-xl backdrop-blur-sm">
                          <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold">Valid Until</div>
                            <div className="text-sm opacity-90">Dec 31, 2024</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-black/10 rounded-xl backdrop-blur-sm">
                          <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                            <Gift className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold">Free Gift</div>
                            <div className="text-sm opacity-90">Premium Wrapping Included</div>
                          </div>
                        </div>
                      </div>

                      {/* Selected Product Info */}
                      {currentProducts[selectedProduct] && (
                        <div className="mt-6 p-4 bg-black/15 rounded-xl backdrop-blur-sm border border-black/20">
                          <div className="text-xs font-black uppercase tracking-widest mb-3 opacity-80">SELECTED PRODUCT</div>
                          <div className="flex items-center justify-between">
                            <div className="max-w-[60%]">
                              <div className="font-bold text-lg truncate">{currentProducts[selectedProduct].name}</div>
                              <div className="text-sm opacity-90">{currentProducts[selectedProduct].category}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-black">{currentProducts[selectedProduct].price}</div>
                              {viewMode === 'retail' && 'originalPrice' in currentProducts[selectedProduct] && (
                                <div className="text-sm line-through opacity-80">
                                  {(currentProducts[selectedProduct] as typeof retailProducts[0]).originalPrice}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CTA Button */}
                      <button className="mt-auto w-full py-4 bg-black text-yellow-400 font-black rounded-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 group shadow-lg hover:scale-[1.02]">
                        <Sparkles className="w-5 h-5" />
                        APPLY 25% DISCOUNT
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </button>

                      {/* Terms */}
                      <div className="text-xs text-center opacity-75 mt-4 font-medium">
                        *Terms & Conditions apply. Valid on select products.
                      </div>
                    </div>
                  </div>
                ) : (
                  // Wholesale Offer Card
                  <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 rounded-2xl p-8 shadow-2xl shadow-amber-500/30 text-black h-full border border-amber-400">
                    <div className="flex flex-col h-full">
                      {/* Badge */}
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-[0.3em] opacity-90">
                          VOLUME DISCOUNT
                        </span>
                      </div>

                      {/* Main Offer */}
                      <div className="mb-8 text-center">
                        <div className="relative">
                          <div className="text-8xl font-black mb-2 leading-none">
                            50<span className="text-5xl">%</span>
                          </div>
                          <div className="absolute -top-2 -right-2">
                            <Zap className="w-8 h-8 text-black/30" />
                          </div>
                        </div>
                        <div className="text-2xl font-black mb-2 tracking-tight">
                          OFF FOR BUSINESS PARTNERS
                        </div>
                        <p className="text-black/80 text-sm font-medium opacity-90">
                          Maximum discount on bulk purchases
                        </p>
                      </div>

                      {/* Details */}
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-4 p-4 bg-black/10 rounded-xl backdrop-blur-sm">
                          <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold">Minimum Order</div>
                            <div className="text-sm opacity-90">200+ Units</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-black/10 rounded-xl backdrop-blur-sm">
                          <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                            <Package className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold">Free Shipping</div>
                            <div className="text-sm opacity-90">Pan India Delivery</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-black/10 rounded-xl backdrop-blur-sm">
                          <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                            <Users className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold">Dedicated Support</div>
                            <div className="text-sm opacity-90">Account Manager Included</div>
                          </div>
                        </div>
                      </div>

                      {/* Selected Product Info */}
                      {currentProducts[selectedProduct] && (
                        <div className="mt-6 p-4 bg-black/15 rounded-xl backdrop-blur-sm border border-black/20">
                          <div className="text-xs font-black uppercase tracking-widest mb-3 opacity-80">SELECTED PRODUCT</div>
                          <div className="flex items-center justify-between">
                            <div className="max-w-[60%]">
                              <div className="font-bold text-lg truncate">{currentProducts[selectedProduct].name}</div>
                              <div className="text-sm opacity-90">{currentProducts[selectedProduct].category}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-black">{currentProducts[selectedProduct].price}</div>
                              <div className="text-sm opacity-80 font-medium">
                                MOQ: {'moq' in currentProducts[selectedProduct] ? (currentProducts[selectedProduct] as typeof wholesaleProducts[0]).moq : 'N/A'}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CTA Button */}
                      <button className="mt-auto w-full py-4 bg-black text-yellow-400 font-black rounded-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 group shadow-lg hover:scale-[1.02]">
                        <Zap className="w-5 h-5" />
                        APPLY 50% DISCOUNT
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </button>

                      {/* Terms */}
                      <div className="text-xs text-center opacity-75 mt-4 font-medium">
                        *Valid on orders above ₹5,00,000. Limited time offer.
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Stats Cards */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className={`rounded-xl p-5 shadow-lg ${
                isDarkMode 
                  ? 'bg-slate-900 border border-yellow-500/30 shadow-yellow-500/10' 
                  : 'bg-white border border-amber-300 shadow-amber-500/10'
              }`}>
                <div className={`text-3xl font-black mb-1 ${
                  isDarkMode ? 'text-yellow-400' : 'text-amber-700'
                }`}>
                  {viewMode === 'retail' ? '1.2M+' : '25K+'}
                </div>
                <div className={`text-sm font-medium ${
                  isDarkMode ? 'text-yellow-400/70' : 'text-amber-600'
                }`}>
                  {viewMode === 'retail' ? 'Happy Customers' : 'Business Partners'}
                </div>
              </div>
              <div className={`rounded-xl p-5 shadow-lg ${
                isDarkMode 
                  ? 'bg-slate-900 border border-yellow-500/30 shadow-yellow-500/10' 
                  : 'bg-white border border-amber-300 shadow-amber-500/10'
              }`}>
                <div className={`text-3xl font-black mb-1 ${
                  isDarkMode ? 'text-yellow-400' : 'text-amber-700'
                }`}>
                  {viewMode === 'retail' ? '98%' : '99.5%'}
                </div>
                <div className={`text-sm font-medium ${
                  isDarkMode ? 'text-yellow-400/70' : 'text-amber-600'
                }`}>
                  {viewMode === 'retail' ? 'Satisfaction Rate' : 'On-time Delivery'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className={`p-8 rounded-2xl shadow-lg transition-all ${
            isDarkMode 
              ? 'bg-gradient-to-br from-slate-900 to-slate-800 border border-yellow-500/30 shadow-yellow-500/10 hover:shadow-yellow-500/20' 
              : 'bg-gradient-to-br from-white to-amber-50 border border-amber-300 shadow-amber-500/10 hover:shadow-amber-300/30'
          }`}>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/30">
              <Truck className="w-7 h-7 text-black" />
            </div>
            <h3 className={`font-black text-xl mb-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Fast Delivery
            </h3>
            <p className={`text-sm leading-relaxed ${
              isDarkMode ? 'text-yellow-400/80' : 'text-amber-700/80'
            }`}>
              {viewMode === 'retail' 
                ? 'Same-day delivery in major cities with real-time tracking'
                : 'Bulk shipping with dedicated logistics support'}
            </p>
          </div>
          <div className={`p-8 rounded-2xl shadow-lg transition-all ${
            isDarkMode 
              ? 'bg-gradient-to-br from-slate-900 to-slate-800 border border-yellow-500/30 shadow-yellow-500/10 hover:shadow-yellow-500/20' 
              : 'bg-gradient-to-br from-white to-amber-50 border border-amber-300 shadow-amber-500/10 hover:shadow-amber-300/30'
          }`}>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/30">
              <Shield className="w-7 h-7 text-black" />
            </div>
            <h3 className={`font-black text-xl mb-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Quality Guarantee
            </h3>
            <p className={`text-sm leading-relaxed ${
              isDarkMode ? 'text-yellow-400/80' : 'text-amber-700/80'
            }`}>
              {viewMode === 'retail' 
                ? '100% authentic products with certification and warranty'
                : 'Manufacturer direct quality with bulk testing'}
            </p>
          </div>
          <div className={`p-8 rounded-2xl shadow-lg transition-all ${
            isDarkMode 
              ? 'bg-gradient-to-br from-slate-900 to-slate-800 border border-yellow-500/30 shadow-yellow-500/10 hover:shadow-yellow-500/20' 
              : 'bg-gradient-to-br from-white to-amber-50 border border-amber-300 shadow-amber-500/10 hover:shadow-amber-300/30'
          }`}>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/30">
              <Headphones className="w-7 h-7 text-black" />
            </div>
            <h3 className={`font-black text-xl mb-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              24/7 Support
            </h3>
            <p className={`text-sm leading-relaxed ${
              isDarkMode ? 'text-yellow-400/80' : 'text-amber-700/80'
            }`}>
              {viewMode === 'retail' 
                ? 'Dedicated customer care with instant resolution'
                : 'Business account manager for personalized service'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className={`max-w-7xl mx-auto mt-12 text-center pt-8 border-t ${
        isDarkMode ? 'border-yellow-500/20' : 'border-amber-200'
      }`}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 animate-pulse" />
          <p className={`text-lg font-medium ${
            isDarkMode ? 'text-yellow-400' : 'text-amber-700'
          }`}>
            Just Looking Like a "WOW"
          </p>
        </div>
        <p className={`text-sm font-medium ${
          isDarkMode ? 'text-yellow-400/70' : 'text-amber-600'
        }`}>
          {viewMode === 'retail' 
            ? 'All retail prices include GST. Free shipping on orders above ₹2,499.'
            : 'Wholesale pricing excludes GST. Contact for custom bulk orders.'}
        </p>
      </div>

      {/* Contact Page Modal - Now properly positioned with space from navbar */}
      <ContactPage 
        isOpen={showContact} 
        onClose={() => setShowContact(false)} 
        isDarkMode={isDarkMode}
      />

      {/* Global Styles for Animation */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

// Missing icon components
const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Headphones = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);