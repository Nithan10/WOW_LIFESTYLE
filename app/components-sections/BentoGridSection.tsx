'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Gift, Rocket, Brain, Music, Palette, Bot, Gamepad2, Zap } from 'lucide-react';
import { useInView } from 'framer-motion';

const BENTO_ITEMS = [
  { id: 1, title: "Iconic Heroes", subtitle: "Legends Assemble", className: "md:col-span-1 md:row-span-2", img: "/chars/dead.avif", icon: <Star className="text-yellow-400" size={20} />, color: "#C41E3A" },
  { id: 2, title: "Holiday Bestsellers", subtitle: "Trending Now", className: "md:col-span-2 md:row-span-2", img: `https://res.cloudinary.com/duh5z2zjr/video/upload/v1769314414/car_x8lshu.mp4`, isVideo: true, icon: <Gift className="text-purple-400" size={20} />, color: "#800080" },
  { id: 3, title: "Smart Play", subtitle: "Educational", className: "md:col-span-1 md:row-span-1", img: "/chars/car1.png", icon: <Brain className="text-blue-400" size={20} />, color: "#0066CC" },
  { id: 4, title: "Indoor Fun", subtitle: "Active Play", className: "md:col-span-1 md:row-span-1", img: "/chars/car2.png", icon: <Music className="text-pink-400" size={20} />, color: "#FF1493" },
  { id: 5, title: "Outdoor Adventure", subtitle: "Go Explore", className: "md:col-span-2 md:row-span-1", img: `https://res.cloudinary.com/duh5z2zjr/video/upload/v1769314437/drone_fogxvc.mp4`, isVideo: true, icon: <Rocket className="text-orange-400" size={20} />, color: "#FF4500" },
  { id: 6, title: "Speed Zone", subtitle: "Race Ready", className: "md:col-span-1 md:row-span-1", img: "/chars/car3.png", icon: <Zap className="text-red-400" size={20} />, color: "#DC143C" },
  { id: 7, title: "Creative Studio", subtitle: "Arts & Crafts", className: "md:col-span-1 md:row-span-1", img: "/chars/barbie.avif", icon: <Palette className="text-teal-400" size={20} />, color: "#00CED1" },
  { id: 8, title: "Future Tech", subtitle: "Robotics & Coding", className: "md:col-span-2 md:row-span-1", img: `https://res.cloudinary.com/duh5z2zjr/video/upload/v1769314440/rc_zxsclo.mp4`, isVideo: true, icon: <Bot className="text-cyan-400" size={20} />, color: "#00B7FF" },
  { id: 9, title: "Family Games", subtitle: "Board Games", className: "md:col-span-2 md:row-span-1", img: "/chars/pokemon.avif", icon: <Gamepad2 className="text-green-400" size={20} />, color: "#32CD32" }
];

// Optimized Bento Item
const BentoItem = memo(({ item, theme, index }: { item: any, theme: string, index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (item.isVideo && videoRef.current) {
      if (isInView) videoRef.current.play().catch(() => {});
      else videoRef.current.pause();
    }
  }, [isInView, item.isVideo]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`group relative rounded-2xl md:rounded-[2.5rem] overflow-hidden cursor-pointer ${item.className} ${theme === 'light' ? 'bg-gray-100' : 'bg-[#0f0f0f]'} border ${theme === 'light' ? 'border-gray-200' : 'border-white/10'} will-change-transform`}
    >
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        {item.isVideo ? (
          <video 
            ref={videoRef}
            src={item.img} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
            muted 
            loop 
            playsInline
            preload="none"
            crossOrigin="anonymous" 
          />
        ) : (
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }} />
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay" style={{ backgroundColor: item.color }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className={`p-2 md:p-3 rounded-full backdrop-blur-md ${theme === 'light' ? 'bg-white/90 text-black' : 'bg-black/40 text-white border border-white/20'}`}>
            {React.cloneElement(item.icon, { size: 14, className: `md:size-[20px] ${item.icon.props.className}` })}
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <ArrowRight size={16} className="md:size-[20px] text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>
        <div>
          <span className="text-[#D4AF37] font-bold tracking-widest text-[8px] md:text-[10px] uppercase mb-1 md:mb-2 block opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">{item.subtitle}</span>
          <h3 className="text-white text-lg md:text-2xl lg:text-3xl font-black uppercase leading-tight tracking-tight drop-shadow-lg">{item.title}</h3>
        </div>
      </div>
    </motion.div>
  );
});

BentoItem.displayName = 'BentoItem';

// Bento Grid Component
const BentoGrid = memo(({ theme }: { theme: 'dark' | 'light' }) => {
  return (
    <section className={`py-12 md:py-24 relative ${theme === 'light' ? 'bg-white' : 'bg-black'} border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="md:size-[16px] text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase">Curated Collections</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Best of <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC]">WOW Lifestyle</span>
            </motion.h2>
          </div>
          <motion.button initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className={`px-6 py-3 md:px-8 md:py-4 rounded-full border ${theme === 'light' ? 'border-gray-200 hover:bg-gray-100 text-black' : 'border-white/20 hover:bg-white/10 text-white'} font-bold tracking-wide transition-all flex items-center gap-2 group`}>
            Explore All Categories <ArrowRight size={16} className="md:size-[18px] group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[280px]">
          {BENTO_ITEMS.map((item, i) => (
            <BentoItem key={item.id} item={item} theme={theme} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
});

BentoGrid.displayName = 'BentoGrid';

interface BentoGridSectionProps {
  theme: 'dark' | 'light';
}

export default function BentoGridSection({ theme }: BentoGridSectionProps) {
  return <BentoGrid theme={theme} />;
}