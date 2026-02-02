'use client';

import React, { useState, useEffect, memo, useRef } from 'react';
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
  
  // --- Auto-Play Logic ---
  useEffect(() => {
    const step = 50; // Update every 50ms
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
      className={`w-full min-h-screen py-12 px-4 md:px-8 flex justify-center items-center transition-colors duration-700
        ${isDark ? 'bg-zinc-950' : 'bg-gray-200'}
      `}
    >
      {/* --- Main Unique Container --- */}
      <div className="relative w-full max-w-6xl h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-black/5 group select-none bg-zinc-900">
        
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
                  className="w-full h-full object-cover brightness-[0.75]" 
                />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* 2. Giant Watermark */}
        <div className="absolute top-6 right-8 text-white/10 text-9xl font-black leading-none pointer-events-none z-10 mix-blend-overlay">
           0{activeItem.id}
        </div>

        {/* 3. Text Content */}
        <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 z-30 max-w-sm md:max-w-xl">
           <AnimatePresence mode="wait">
             <motion.div
               key={`content-${active}`}
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               transition={{ duration: 0.5 }}
             >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]" />
                  <span className="text-[#D4AF37] text-sm font-bold tracking-[0.25em] uppercase drop-shadow-md">
                    {activeItem.location}
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] mb-6 tracking-tighter drop-shadow-2xl">
                  {activeItem.title}
                </h1>

                <p className="text-zinc-200 text-base leading-relaxed mb-8 font-light max-w-md drop-shadow-lg border-l-2 border-[#D4AF37]/50 pl-5">
                  {activeItem.description}
                </p>

                <button className="flex items-center gap-4 text-white text-sm font-bold uppercase tracking-widest group/btn hover:text-[#D4AF37] transition-colors">
                  View Specs
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-[#D4AF37] group-hover/btn:border-[#D4AF37] group-hover/btn:text-black transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
             </motion.div>
           </AnimatePresence>
        </div>

        {/* 4. Compact Interactive Carousel */}
        <div className="absolute bottom-8 right-8 z-30 flex gap-3 h-28 md:h-32 items-end">
           {RALLEYZ_ITEMS.map((item, index) => {
             const isActive = index === active;
             return (
               <motion.div
                 key={item.id}
                 onClick={() => handleCardClick(index)}
                 layout
                 className={`relative overflow-hidden rounded-2xl cursor-pointer border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                   ${isActive 
                     ? 'w-40 md:w-52 h-full shadow-2xl border-[#D4AF37]' 
                     : 'w-10 md:w-12 h-20 grayscale opacity-50 hover:opacity-100 hover:h-24 hover:grayscale-0 border-white/20'}
                 `}
               >
                 <img 
                   src={item.bg} 
                   className="absolute inset-0 w-full h-full object-cover" 
                   alt="thumbnail"
                 />
                 <div className="absolute inset-0 bg-black/20" />
                 
                 {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                    >
                      <p className="text-[#D4AF37] text-[10px] uppercase font-bold tracking-wider truncate mb-1">{item.subtitle}</p>
                      <p className="text-white text-sm font-bold leading-none truncate">{item.title}</p>
                      
                      <div className="w-full h-[2px] bg-white/20 mt-2 rounded-full overflow-hidden">
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

// --- Global Theme Wrapper ---
export default function RalleyzSectionComponent() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Function to resolve theme from DOM
    const resolveTheme = () => {
      const docTheme = document.documentElement.getAttribute('data-theme');
      const hasDarkClass = document.documentElement.classList.contains('dark');
      
      if (docTheme === 'light' || (!hasDarkClass && docTheme !== 'dark')) {
        return 'light';
      }
      return 'dark';
    };

    // Initial Set
    setTheme(resolveTheme());

    // 1. Observe attribute changes (e.g., data-theme="light")
    const observer = new MutationObserver(() => {
      setTheme(resolveTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    // 2. Custom Event Listener (backup for specific navbar implementations)
    const handleThemeChange = (e: any) => {
      const newTheme = e.detail?.theme || e.detail;
      if (newTheme === 'light' || newTheme === 'dark') {
        setTheme(newTheme);
      }
    };

    window.addEventListener('themechange', handleThemeChange as EventListener);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('themechange', handleThemeChange as EventListener);
    };
  }, []);

  return <RalleyzSection theme={theme} />;
}