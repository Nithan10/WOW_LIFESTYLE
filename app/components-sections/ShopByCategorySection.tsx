'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  CarFront, Trophy, Star, Gift, 
  Brain, Palette, Gamepad2, ArrowRight
} from 'lucide-react';

interface ShopByCategorySectionProps {
  theme: 'dark' | 'light';
}

const CATEGORIES = [
  { 
    id: 'vehicles', 
    title: "Vehicles & Tracksets", 
    img: "/chars/car3.png", 
    color: "from-red-600 to-rose-900", 
    icon: <CarFront />,
    count: 42,
    description: "Remote control cars, tracksets, and diecast models"
  },
  { 
    id: 'art', 
    title: "Art & Craft", 
    img: "/chars/barbie.avif", 
    color: "from-purple-600 to-indigo-900", 
    icon: <Palette />,
    count: 36,
    description: "Creative kits, painting sets, and craft supplies"
  },
  { 
    id: 'collectors', 
    title: "Collectors", 
    img: "/pngcar2.png", 
    color: "from-amber-500 to-orange-800", 
    icon: <Trophy />,
    count: 18,
    description: "Limited edition collectibles and premium models"
  },
  { 
    id: 'puzzles', 
    title: "Games & Puzzles", 
    img: "/chars/pokemon.avif", 
    color: "from-green-500 to-emerald-800", 
    icon: <Gamepad2 />,
    count: 27,
    description: "Board games, puzzles, and strategy games"
  },
  { 
    id: 'dolls', 
    title: "Premium Dolls", 
    img: "/chars/princess.avif", 
    color: "from-pink-500 to-rose-700", 
    icon: <Gift />,
    count: 31,
    description: "Fashion dolls, action figures, and playsets"
  },
  { 
    id: 'educational', 
    title: "Educational", 
    img: "/chars/avengers.avif", 
    color: "from-blue-500 to-cyan-700", 
    icon: <Brain />,
    count: 24,
    description: "STEM kits, learning toys, and educational games"
  },
];

export default function ShopByCategorySection({ theme }: ShopByCategorySectionProps) {
  const router = useRouter();

  const getTextColor = () => theme === 'light' ? 'text-gray-900' : 'text-white';
  const getSecondaryTextColor = () => theme === 'light' ? 'text-gray-600' : 'text-gray-400';
  const getCardBg = () => theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const getCardBorder = () => theme === 'light' ? 'border-gray-200' : 'border-gray-800';

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to the category page
    router.push(`/category/${categoryId}`);
  };

  const handleViewAllCategories = () => {
    // Navigate to a page showing all categories (you can create this later)
    // For now, redirect to the first category or a "all" page
    router.push('/category/vehicles');
  };

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl lg:text-5xl font-black ${getTextColor()} mb-4`}
          >
            Shop By Category
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-lg md:text-xl ${getSecondaryTextColor()} max-w-2xl mx-auto`}
          >
            Explore our wide range of premium toys and collectibles, handpicked for every age and interest
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category.id)}
              className={`relative group rounded-2xl overflow-hidden border ${getCardBorder()} ${getCardBg()} cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl md:text-2xl font-bold ${getTextColor()} mb-1`}>
                        {category.title}
                      </h3>
                      <p className={`text-sm ${getSecondaryTextColor()}`}>
                        {category.count} products
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`${getSecondaryTextColor()} group-hover:text-[#D4AF37] transition-colors duration-300`} />
                </div>
                
                {/* Product Image */}
                <div className="relative h-48 md:h-56 rounded-xl overflow-hidden">
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Click to View Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                    <span className="text-white font-bold text-sm px-4 py-2 bg-[#D4AF37] rounded-lg">
                      View Products →
                    </span>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/10 group-hover:to-[#FCEEAC]/10 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <button
            onClick={handleViewAllCategories}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC] text-black font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105"
          >
            View All Categories
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}