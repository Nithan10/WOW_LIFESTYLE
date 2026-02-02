'use client';

import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// --- Data Configuration ---
const RALLEYZ_ITEMS = [
  { 
    id: 1, 
    title: "Big Volt Rover", 
    subtitle: "Remote Control Car",
    location: "Off-Road Series", 
    description: "Tucked away in the Switzerland Alps, Saint Antonien offers an idyllic retreat for those seeking tranquility.",
    bg: "/chars/bg1.avif" 
  },
  { 
    id: 2, 
    title: "Land Rover", 
    subtitle: "Range Rover SUV",
    location: "Luxury Edition",
    description: "A cultural treasure trove with historic shrines and temples, offering a glimpse into the old world.",
    bg: "/chars/bg2.avif" 
  },
  { 
    id: 3, 
    title: "X-Spray Monster", 
    subtitle: "2.4 GHz Racer",
    location: "Speedster",
    description: "The journey from the vibrant souks of Marrakech to the tranquil, starlit sands of Merzouga showcases diversity.",
    bg: "/chars/bg3.avif" 
  },
  { 
    id: 4, 
    title: "Twisted Stunt", 
    subtitle: "Remote Control Car",
    location: "Stunt Zone",
    description: "Yosemite National Park is a sanctuary for those who seek the sublime, featuring towering granite cliffs.",
    bg: "/chars/bg4.avif" 
  },
  { 
    id: 5, 
    title: "Undcad Off Roader", 
    subtitle: "4x4 RC Truck",
    location: "Mountain",
    description: "Famous for its strong winds and sandy shores, widely recognized as a premier destination for kitesurfing.",
    bg: "/chars/bg5.avif" 
  },
];

const AUTO_PLAY_DURATION = 4000;

interface RalleyzSectionProps {
  theme: 'dark' | 'light';
}

const RalleyzSection = memo(({ theme }: RalleyzSectionProps) => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const step = 50; 
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActive((current) => (current + 1) % RALLEYZ_ITEMS.length);
          return 0;
        }
        return prev + (step / AUTO_PLAY_DURATION) * 100;
      });
    }, step);

    return () => clearInterval(interval);
  }, [active]);

  const handleCardClick = (index: number) => {
    setActive(index);
    setProgress(0);
  };

  const activeItem = RALLEYZ_ITEMS[active];
  const isDark = theme === 'dark';

  return (
    <section 
      className={`w-full min-h-screen py-8 px-4 md:py-12 md:px-8 flex justify-center items-center transition-colors duration-700
        ${isDark ? 'bg-zinc-950' : 'bg-gray-200'}
      `}
    >
      <div className="relative w-full max-w-6xl h-[700px] md:h-[600px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-black/5 group select-none bg-zinc-900">
        
        {/* 1. Background Layer */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <div className="w-full h-full transition-transform duration-[2000ms] group-hover:scale-110">
                <img
                  src={activeItem.bg}
                  alt={activeItem.title}
                  className="w-full h-full object-cover brightness-[0.6] md:brightness-[0.75]" 
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* 2. Giant Watermark - Scaled down on mobile */}
        <div className="absolute top-4 right-6 md:top-6 md:right-8 text-white/10 text-7xl md:text-9xl font-black leading-none pointer-events-none z-10 mix-blend-overlay">
           0{activeItem.id}
        </div>

        {/* 3. Text Content - Adjusted for mobile centering/spacing */}
        <div className="absolute inset-x-0 top-12 md:top-1/2 md:-translate-y-1/2 md:left-16 z-30 px-6 md:px-0 max-w-sm md:max-w-xl">
           <AnimatePresence mode="wait">
             <motion.div
               key={`content-${active}`}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.5 }}
             >
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]" />
                  <span className="text-[#D4AF37] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                    {activeItem.location}
                  </span>
                </div>

                <h1 className="text-4xl md:text-7xl font-black text-white uppercase leading-none mb-4 md:mb-6 tracking-tighter drop-shadow-2xl">
                  {activeItem.title}
                </h1>

                <p className="text-zinc-300 md:text-zinc-200 text-sm md:text-base leading-relaxed mb-6 md:mb-8 font-light max-w-md border-l-2 border-[#D4AF37]/50 pl-4 md:pl-5">
                  {activeItem.description}
                </p>

                <button className="flex items-center gap-4 text-white text-xs md:text-sm font-bold uppercase tracking-widest group/btn hover:text-[#D4AF37] transition-colors">
                  View Specs
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-[#D4AF37] group-hover/btn:border-[#D4AF37] group-hover/btn:text-black transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
             </motion.div>
           </AnimatePresence>
        </div>

        {/* 4. Compact Interactive Carousel - Repositioned for Mobile */}
        <div className="absolute bottom-6 left-0 right-0 md:left-auto md:right-8 z-40 flex justify-center md:justify-end gap-2 md:gap-3 h-24 md:h-32 items-end px-4">
           {RALLEYZ_ITEMS.map((item, index) => {
             const isActive = index === active;
             return (
               <motion.div
                 key={item.id}
                 onClick={() => handleCardClick(index)}
                 layout
                 className={`relative overflow-hidden rounded-xl md:rounded-2xl cursor-pointer border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                   ${isActive 
                     ? 'w-32 md:w-52 h-full shadow-2xl border-[#D4AF37]' 
                     : 'w-8 md:w-12 h-16 md:h-20 grayscale opacity-50 border-white/20'}
                 `}
               >
                 <img 
                   src={item.bg} 
                   className="absolute inset-0 w-full h-full object-cover" 
                   alt="thumbnail"
                 />
                 <div className="absolute inset-0 bg-black/30" />
                 
                 {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="absolute bottom-0 left-0 w-full p-2 md:p-3 bg-gradient-to-t from-black/90 to-transparent"
                    >
                      <p className="text-[#D4AF37] text-[8px] md:text-[10px] uppercase font-bold tracking-wider truncate">{item.subtitle}</p>
                      <p className="text-white text-[10px] md:text-sm font-bold leading-none truncate">{item.title}</p>
                      
                      <div className="w-full h-[1.5px] md:h-[2px] bg-white/20 mt-1.5 md:mt-2 rounded-full overflow-hidden">
                        <motion.div 
                           className="h-full bg-[#D4AF37]"
                           style={{ width: `${progress}%` }}
                        />
                      </div>
                    </motion.div>
                 )}
               </motion.div>
             )
           })}
        </div>
      </div>
    </section>
  );
});

RalleyzSection.displayName = 'RalleyzSection';

export default function RalleyzSectionComponent() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const resolveTheme = () => {
      const docTheme = document.documentElement.getAttribute('data-theme');
      const hasDarkClass = document.documentElement.classList.contains('dark');
      return (docTheme === 'light' || (!hasDarkClass && docTheme !== 'dark')) ? 'light' : 'dark';
    };

    setTheme(resolveTheme());
    const observer = new MutationObserver(() => setTheme(resolveTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    
    return () => observer.disconnect();
  }, []);

  return <RalleyzSection theme={theme} />;
}