'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Star, SlidersHorizontal, Heart } from 'lucide-react';

const MOCK_PRODUCTS = [
  {
    id: 'rc-monster-truck',
    title: "ZUNBELLA 4x4 Remote Control Stunt Car",
    price: 915,
    originalPrice: 2999,
    rating: 4.3,
    reviews: 489,
    img: "/chars/car3.png",
    category: 'vehicles',
    tags: ['Best Seller', 'Trending']
  },
  {
    id: 'drift-racer-x',
    title: "Speed Demon Drift Racer X",
    price: 1250,
    originalPrice: 3500,
    rating: 4.8,
    reviews: 124,
    img: "/pngcar2.png",
    category: 'vehicles',
    tags: ['New Arrival']
  },
  {
    id: 'rock-crawler-pro',
    title: "Rock Crawler Pro 1:18 Scale",
    price: 735,
    originalPrice: 1999,
    rating: 3.6,
    reviews: 72,
    img: "/chars/car3.png",
    category: 'vehicles',
    tags: []
  },
];

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.categoryId; 

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    return product.price <= priceRange[1];
  });

  return (
    // The bg-gray-50 is for LIGHT mode. The dark:bg-gray-950 is for DARK mode.
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white capitalize">
              {categoryId} Collection
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Showing {filteredProducts.length} results
            </p>
          </div>
          
          <button 
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm text-gray-900 dark:text-white"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`
            w-64 flex-shrink-0 space-y-8
            ${isMobileFilterOpen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-950 p-6' : 'hidden md:block'}
          `}>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Price Range</h3>
              <input 
                type="range" min="0" max="5000" step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-[#D4AF37]"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>₹0</span><span>₹{priceRange[1]}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Ratings</h3>
              {[4, 3, 2, 1].map((r) => (
                <label key={r} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input type="checkbox" className="accent-[#D4AF37]" />
                  {r}<Star size={14} className="fill-yellow-400 text-yellow-400" /> & above
                </label>
              ))}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 p-4">
                    <img src={product.img} alt={product.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                       {product.tags.map(t => <span key={t} className="bg-black/80 text-white text-[10px] px-2 py-1 rounded uppercase font-bold">{t}</span>)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">{product.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}