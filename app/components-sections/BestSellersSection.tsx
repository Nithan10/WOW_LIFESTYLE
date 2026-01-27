'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Heart } from 'lucide-react';
import { useInView } from 'framer-motion';

const BEST_SELLERS = [
  { id: 1, name: "Jasco Bear Muffler", price: 1499, original: 1599, discount: "6% OFF", img: "/chars/Masha.avif", color: "bg-pink-900" },
  { id: 2, name: "Hamleys Activity Ball", price: 2699, original: 3599, discount: "25% OFF", img: "/chars/pokemon.avif", color: "bg-yellow-900" },
  { id: 3, name: "Marvel Avengers Set", price: 799, original: 999, discount: "20% OFF", img: "/chars/avengers.avif", color: "bg-red-900" },
  { id: 4, name: "Hot Wheels Monster", price: 1099, original: 1299, discount: "15% OFF", img: "/chars/car3.png", color: "bg-blue-900" },
  { id: 5, name: "Super Rigs Transporter", price: 849, original: 999, discount: "15% OFF", img: "/chars/car2.png", color: "bg-slate-900" },
];

// Optimized Best Sellers Component
const BestSellers = memo(({ theme }: { theme: 'dark' | 'light' }) => {
  const [activeCard, setActiveCard] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "0px 0px -200px 0px" });
  const CYCLE_DURATION = 4000;

  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % BEST_SELLERS.length);
      setProgress(0);
    }, CYCLE_DURATION);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / (CYCLE_DURATION / 100));
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [activeCard, isInView]);

  return (
    <section ref={containerRef} className={`py-12 md:py-24 relative ${theme === 'light' ? 'bg-gray-50' : 'bg-[#0a0a0a]'} border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/5'} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-3">
              <Zap size={14} className="md:size-[16px] text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase">Top Picks</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`text-3xl md:text-5xl font-black uppercase tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC]">Sellers</span>
            </motion.h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 h-[500px] w-full">
          {BEST_SELLERS.map((item, index) => {
            const isActive = index === activeCard;
            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => { setActiveCard(index); setProgress(0); }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'flex-[3] shadow-2xl' : 'flex-[1] grayscale hover:grayscale-0'}`}
              >
                <div className={`absolute inset-0 ${item.color || 'bg-gray-900'}`}>
                  <div className="absolute inset-0 bg-black/40" />
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-110' : 'scale-100'}`}
                  />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                      <h3 className={`text-white font-black uppercase tracking-tighter leading-none ${isActive ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl [writing-mode:vertical-rl] rotate-180 md:[writing-mode:horizontal-tb] md:rotate-0'}`}>
                        {item.name.split(" ")[0]}
                      </h3>
                    </div>
                    <div 
                      className={`p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-[#D4AF37] hover:text-white transition-all text-white ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <Heart size={20} />
                    </div>
                  </div>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-white text-xl md:text-3xl font-bold leading-tight mb-2">{item.name}</h4>
                      </div>
                    </motion.div>
                  )}
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
                    <motion.div 
                      className="h-full bg-[#D4AF37]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

BestSellers.displayName = 'BestSellers';

interface BestSellersSectionProps {
  theme: 'dark' | 'light';
}

export default function BestSellersSection({ theme }: BestSellersSectionProps) {
  return <BestSellers theme={theme} />;
}