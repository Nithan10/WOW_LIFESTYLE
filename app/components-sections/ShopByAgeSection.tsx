'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Star, Baby, Zap, Trophy, Sparkles, Building2, Wand2, Gauge } from 'lucide-react';

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
  return (
    <section className={`py-12 md:py-24 relative overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-black'} border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-3">
            <Star size={12} className="text-[#D4AF37]" fill="#D4AF37" />
            <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase">Find Perfect Gift</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`text-3xl md:text-5xl font-black uppercase tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Shop By <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC]">Age</span>
          </motion.h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 pb-8">
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
      </div>
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