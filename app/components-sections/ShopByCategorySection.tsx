'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  CarFront, Trophy, Gift, Brain, Palette, Gamepad2, 
  ArrowRight, ChevronLeft, ChevronRight, Sparkles, Zap 
} from 'lucide-react';

// --- Data & Types ---
interface ShopByCategorySectionProps {
  theme: 'dark' | 'light';
}

const CATEGORIES = [
  { 
    id: 'vehicles', 
    title: "Vehicles & Tracksets", 
    img: "/chars/car3.png", 
    color: "from-red-600 to-rose-900", 
    accent: "text-red-500",
    icon: <CarFront />,
    count: 42,
    description: "Remote control & diecast models",
    badge: "Trending"
  },
  { 
    id: 'art', 
    title: "Art & Craft", 
    img: "/chars/barbie.avif", 
    color: "from-purple-600 to-indigo-900", 
    accent: "text-purple-500",
    icon: <Palette />,
    count: 36,
    description: "Creative kits & painting sets",
    badge: "Creative"
  },
  { 
    id: 'collectors', 
    title: "Collectors Edition", 
    img: "/pngcar2.png", 
    color: "from-amber-500 to-orange-800", 
    accent: "text-amber-500",
    icon: <Trophy />,
    count: 18,
    description: "Limited edition premium models",
    badge: "Exclusive"
  },
  { 
    id: 'puzzles', 
    title: "Games & Puzzles", 
    img: "/chars/pokemon.avif", 
    color: "from-emerald-500 to-green-800", 
    accent: "text-emerald-500",
    icon: <Gamepad2 />,
    count: 27,
    description: "Strategy games & brain teasers",
    badge: "Fun"
  },
  { 
    id: 'dolls', 
    title: "Premium Dolls", 
    img: "/chars/princess.avif", 
    color: "from-pink-500 to-rose-700", 
    accent: "text-pink-500",
    icon: <Gift />,
    count: 31,
    description: "Fashion dolls & playsets",
    badge: "Popular"
  },
  { 
    id: 'educational', 
    title: "STEM & Learning", 
    img: "/chars/avengers.avif", 
    color: "from-blue-500 to-cyan-700", 
    accent: "text-blue-500",
    icon: <Brain />,
    count: 24,
    description: "Science kits & educational toys",
    badge: "Smart"
  },
];

export default function ShopByCategorySection({ theme }: ShopByCategorySectionProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0); 

  // --- Helper: Circular Index Logic ---
  const getCircularIndex = (index: number, length: number) => {
    return ((index % length) + length) % length;
  };

  const visibleItems = [
    CATEGORIES[getCircularIndex(activeIndex - 1, CATEGORIES.length)],
    CATEGORIES[getCircularIndex(activeIndex, CATEGORIES.length)],
    CATEGORIES[getCircularIndex(activeIndex + 1, CATEGORIES.length)],
  ];

  // --- Navigation Handlers ---
  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => getCircularIndex(prev + newDirection, CATEGORIES.length));
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => paginate(1), 3500); // Slightly faster auto-play interval
    return () => clearInterval(interval);
  }, [isAutoPlaying, paginate]);

  // --- Styles ---
  const isLight = theme === 'light';
  const bgColor = isLight ? 'bg-gray-50' : 'bg-[#0a0a0a]';
  const textColor = isLight ? 'text-gray-900' : 'text-white';
  const subTextColor = isLight ? 'text-gray-600' : 'text-gray-400';
  const cardBg = isLight ? 'bg-white' : 'bg-[#111]';
  const borderColor = isLight ? 'border-gray-200' : 'border-white/10';

  return (
    <section className={`relative py-24 ${bgColor} overflow-hidden min-h-[900px] flex flex-col justify-center`}>
      
      {/* --- Ambient Background Effects --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] mix-blend-screen animate-pulse`} />
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        
        {/* --- Header --- */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">Our Collections</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-5xl md:text-7xl font-black ${textColor} tracking-tight mb-6`}
          >
            Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FCEEAC] to-[#D4AF37]">Category</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-lg md:text-xl ${subTextColor} max-w-2xl mx-auto`}
          >
            Explore our signature categories designed to spark joy and imagination.
          </motion.p>
        </div>

        {/* --- 3D Carousel Stage --- */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center perspective-1000">
          
          {/* Navigation Buttons */}
          <button 
            onClick={() => { paginate(-1); setIsAutoPlaying(false); }}
            className={`absolute left-0 lg:left-8 z-40 p-4 rounded-full ${isLight ? 'bg-white shadow-lg' : 'bg-black/50 backdrop-blur-md border border-white/10'} hover:scale-110 transition-transform group`}
          >
            <ChevronLeft className={`w-8 h-8 ${textColor} group-hover:text-[#D4AF37] transition-colors`} />
          </button>
          
          <button 
            onClick={() => { paginate(1); setIsAutoPlaying(false); }}
            className={`absolute right-0 lg:right-8 z-40 p-4 rounded-full ${isLight ? 'bg-white shadow-lg' : 'bg-black/50 backdrop-blur-md border border-white/10'} hover:scale-110 transition-transform group`}
          >
            <ChevronRight className={`w-8 h-8 ${textColor} group-hover:text-[#D4AF37] transition-colors`} />
          </button>

          {/* Cards Container */}
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            <AnimatePresence mode='popLayout' custom={direction}>
              {visibleItems.map((category, index) => {
                const isCenter = index === 1;
                const isLeft = index === 0;

                return (
                  <motion.div
                    key={category.id} 
                    layout 
                    initial={{ 
                      scale: 0.8, 
                      x: direction > 0 ? 150 : -150, 
                      opacity: 0,
                    }}
                    animate={{ 
                      scale: isCenter ? 1 : 0.85, 
                      x: isCenter ? 0 : isLeft ? '-65%' : '65%', 
                      zIndex: isCenter ? 20 : 10,
                      opacity: isCenter ? 1 : 0.4,
                      rotateY: isCenter ? 0 : isLeft ? 15 : -15, 
                      filter: isCenter ? 'blur(0px)' : 'blur(4px)' 
                    }}
                    exit={{ 
                      scale: 0.8, 
                      x: direction > 0 ? -150 : 150, 
                      opacity: 0 
                    }}
                    // --- UPDATED PHYSICS FOR FASTER MOVEMENT ---
                    transition={{ 
                      type: "spring", 
                      stiffness: 300,  // Higher stiffness = Faster snap
                      damping: 30,     // Damping keeps it stable
                      mass: 1          // Lower mass = Quicker acceleration
                    }}
                    className={`absolute w-full max-w-sm md:max-w-md cursor-pointer group`}
                    onClick={() => {
                      if (isCenter) router.push(`/category/${category.id}`);
                      else paginate(isLeft ? -1 : 1);
                    }}
                  >
                    {/* --- Card Design --- */}
                    <div className={`
                      relative h-[450px] md:h-[520px] rounded-[2.5rem] overflow-hidden 
                      ${cardBg} border ${borderColor} shadow-2xl transition-all duration-500
                      ${isCenter ? 'shadow-[#D4AF37]/30 ring-1 ring-[#D4AF37]/50' : ''}
                    `}>
                      
                      {/* Image Half */}
                      <div className="h-[55%] relative overflow-hidden bg-gray-900">
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20`} />
                        <img 
                          src={category.img} 
                          alt={category.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        {/* Overlay Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? 'from-white' : 'from-[#111]'} to-transparent`} />
                        
                        {/* Floating Badge */}
                        <div className="absolute top-6 right-6 z-10">
                           <span className="px-4 py-2 text-xs font-bold bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-[#D4AF37] shadow-lg border border-[#D4AF37]/20">
                             {category.badge}
                           </span>
                        </div>
                      </div>

                      {/* Content Half */}
                      <div className="h-[45%] p-8 flex flex-col justify-between relative">
                        {/* Background Icon Watermark */}
                        <div className={`absolute bottom-4 right-4 opacity-5 transform scale-[3] -rotate-12 pointer-events-none ${category.accent}`}>
                          {category.icon}
                        </div>

                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                              {category.icon}
                            </div>
                            <div className={`text-sm font-semibold ${category.accent} uppercase tracking-wider`}>
                              {category.count} Items
                            </div>
                          </div>

                          <h3 className={`text-3xl font-black ${textColor} leading-tight mb-2 line-clamp-2`}>
                            {category.title}
                          </h3>
                          
                          <p className={`text-sm ${subTextColor} line-clamp-2`}>
                            {category.description}
                          </p>
                        </div>

                        {/* Action Area */}
                        <div className="flex items-center justify-between mt-4">
                          <span className={`text-sm font-medium ${subTextColor} group-hover:text-[#D4AF37] transition-colors`}>
                            View Collection
                          </span>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${isLight ? 'border-gray-200' : 'border-gray-800'} group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300`}>
                            <ArrowRight className={`w-5 h-5 ${textColor} group-hover:text-black`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* --- Bottom Controls --- */}
        <div className="flex flex-col items-center mt-12 gap-8">
          {/* Indicators */}
          <div className="flex gap-3">
            {CATEGORIES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsAutoPlaying(false);
                }}
                className={`transition-all duration-500 rounded-full ${
                  idx === activeIndex 
                    ? 'w-10 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC]' 
                    : `w-1.5 h-1.5 ${isLight ? 'bg-gray-300' : 'bg-gray-700'}`
                }`}
              />
            ))}
          </div>

          <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => router.push('/category/vehicles')}
             className="relative px-12 py-5 bg-transparent overflow-hidden group rounded-full"
          >
            <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-full group-hover:border-[#D4AF37] transition-colors duration-300" />
            <div className="absolute inset-0 bg-[#D4AF37]/5 group-hover:bg-[#D4AF37]/10 transition-colors duration-300" />
            
            <div className="flex items-center gap-3 relative z-10">
              <span className={`text-lg font-bold ${textColor} uppercase tracking-widest`}>View All Categories</span>
              <Zap className="w-5 h-5 text-[#D4AF37] group-hover:animate-bounce" />
            </div>
          </motion.button>
        </div>

      </div>
    </section>
  );
}
