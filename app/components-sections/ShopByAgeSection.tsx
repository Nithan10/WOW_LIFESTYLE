'use client';

import React, { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Baby, Zap, Trophy, Sparkles, Building2, Wand2, Gauge, ChevronLeft, ChevronRight } from 'lucide-react';

const AGE_GROUPS = [
  { id: 1, label: "0-18 Months", sub: "Infant Care", img: "/chars/Masha.avif", gradient: "from-pink-500 to-rose-600", icon: <Baby /> },
  { id: 2, label: "18-36 Months", sub: "Toddler Fun", img: "/chars/mickey.avif", gradient: "from-cyan-500 to-blue-600", icon: <Star /> },
  { id: 3, label: "3-5 Years", sub: "Preschool", img: "/chars/pokemon.avif", gradient: "from-amber-400 to-orange-600", icon: <Building2 /> },
  { id: 4, label: "5-7 Years", sub: "Action Hero", img: "/chars/spiderman.avif", gradient: "from-red-600 to-red-800", icon: <Zap /> },
  { id: 5, label: "7-9 Years", sub: "Dreamers", img: "/chars/barbie.avif", gradient: "from-fuchsia-500 to-purple-600", icon: <Sparkles /> },
  { id: 6, label: "9-12 Years", sub: "Racers", img: "/chars/car3.png", gradient: "from-orange-500 to-red-600", icon: <Gauge /> },
  { id: 7, label: "12-14 Years", sub: "Speed Freak", img: "/pngcar.png", gradient: "from-slate-800 to-black", icon: <Trophy /> },
  { id: 8, label: "14-16 Years", sub: "Wizardry", img: "/chars/harrypotter.avif", gradient: "from-purple-800 to-indigo-900", icon: <Wand2 /> },
];

// Optimized Shop By Age Component
const ShopByAge = memo(({ theme }: { theme: 'dark' | 'light' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Check mobile screen on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerView = isMobile ? 2.2 : 4;
  const maxIndex = Math.ceil(AGE_GROUPS.length / itemsPerView) - 1;

  const nextSlide = () => {
    setCurrentIndex(prev => prev === maxIndex ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => prev === 0 ? maxIndex : prev - 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Calculate visible items based on current index
  const visibleItems = isMobile 
    ? AGE_GROUPS.slice(currentIndex * 2, currentIndex * 2 + 3) // Show 2-3 items on mobile
    : AGE_GROUPS;

  return (
    <section className={`py-8 md:py-24 relative overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-black'} border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 px-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-3"
          >
            <Star size={12} className="text-[#D4AF37]" fill="#D4AF37" />
            <span className="text-[#D4AF37] text-xs md:text-[10px] font-bold tracking-widest uppercase">Find Perfect Gift</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className={`text-2xl md:text-5xl font-black uppercase tracking-tight px-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
          >
            Shop By <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC]">Age</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className={`mt-3 text-sm md:text-base ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-2xl mx-auto px-4`}
          >
            Find the perfect toy for every age group and developmental stage
          </motion.p>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:flex flex-wrap justify-center gap-6 md:gap-8 pb-8">
          {AGE_GROUPS.map((age, i) => (
            <motion.div
              key={age.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -10 }}
              className="relative flex-shrink-0 w-[160px] md:w-[220px] aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer group shadow-xl will-change-transform"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${age.gradient} opacity-90 transition-opacity duration-300`} />
              
              <div className="absolute inset-0 flex flex-col p-4">
                <div className="relative w-full aspect-square bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center overflow-hidden mb-4 shadow-inner border border-white/10 group-hover:bg-white/30 transition-colors">
                  <motion.img 
                    src={age.img} 
                    alt={age.label} 
                    loading="lazy"
                    className="w-4/5 h-4/5 object-contain drop-shadow-md" 
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  />
                </div>
                <div className="flex-1 flex flex-col items-center justify-end pb-2">
                  <div className="text-white mb-2 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    {React.cloneElement(age.icon as React.ReactElement, { size: 20 } as any)}
                  </div>
                  <h3 className="text-white font-black text-lg md:text-xl uppercase leading-tight text-center drop-shadow-sm tracking-wide">{age.label}</h3>
                  <p className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 text-center">{age.sub}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative px-2">
          <div 
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {AGE_GROUPS.map((age, i) => (
              <motion.div
                key={age.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 w-[calc(50%-0.5rem)] snap-center"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg cursor-pointer group active:scale-95 transition-transform">
                  <div className={`absolute inset-0 bg-gradient-to-b ${age.gradient} opacity-90`} />
                  
                  <div className="absolute inset-0 flex flex-col p-3">
                    <div className="relative w-full aspect-square bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden mb-3 border border-white/10">
                      <img 
                        src={age.img} 
                        alt={age.label} 
                        loading="lazy"
                        className="w-3/4 h-3/4 object-contain drop-shadow-sm" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-end">
                      <div className="text-white mb-1 opacity-80">
                        {React.cloneElement(age.icon as React.ReactElement, { size: 16 } as any)}
                      </div>
                      <h3 className="text-white font-bold text-sm uppercase leading-tight text-center drop-shadow-sm tracking-wide line-clamp-1">
                        {age.label}
                      </h3>
                      <p className="text-white/80 text-[9px] font-bold uppercase tracking-widest mt-0.5 text-center line-clamp-1">
                        {age.sub}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: Math.ceil(AGE_GROUPS.length / 2) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i 
                    ? 'bg-[#D4AF37] w-6' 
                    : theme === 'light' 
                      ? 'bg-gray-300' 
                      : 'bg-gray-600'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center z-20 active:scale-95 transition-transform"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center z-20 active:scale-95 transition-transform"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="text-gray-800" />
          </button>
        </div>

        {/* Age Progress Bar (Mobile Only) */}
        <div className="md:hidden mt-8 px-4">
          <div className="relative h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC] transition-all duration-500"
              style={{ 
                width: `${((currentIndex + 1) / Math.ceil(AGE_GROUPS.length / 2)) * 100}%` 
              }}
            />
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
            {currentIndex + 1} of {Math.ceil(AGE_GROUPS.length / 2)}
          </p>
        </div>

        {/* View All Button (Mobile Only) */}
        <div className="md:hidden text-center mt-8">
          <button
            className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${
              theme === 'light'
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            View All Age Groups
          </button>
        </div>
      </div>

      {/* Custom scrollbar hide for mobile */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
});

ShopByAge.displayName = 'ShopByAge';

interface ShopByAgeSectionProps {
  theme: 'dark' | 'light';
}

export default function ShopByAgeSection({ theme }: ShopByAgeSectionProps) {
  return <ShopByAge theme={theme} />;
}