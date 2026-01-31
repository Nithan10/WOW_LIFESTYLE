'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Star, Quote, MessageCircle, Heart, Play, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Award, Users, Zap, Calendar, Gift, TrendingUp, Camera } from 'lucide-react';

// --- Data remains the same ---
const reviews = [
  { id: 1, name: "Sarah Jenkins", role: "Parent", text: "The 'Gold-Foil' wrapping was beautiful. WOW Lifestyle understands the magic of gifting.", rating: 5, image: "https://i.pravatar.cc/150?u=sarah", category: "Gifting", tags: ["Premium Packaging"], date: "2w ago", verified: true },
  { id: 2, name: "David Chen", role: "Enthusiast", text: "Their drone repair lab saved my custom FPV drone. Expert technicians.", rating: 5, image: "https://i.pravatar.cc/150?u=david", category: "Repairs", tags: ["Quick Service"], date: "1m ago", verified: true },
  { id: 3, name: "Marcus Thorne", role: "Professional Hobbyist", text: "The selection of STEM toys is unmatched. Engineering principles through play.", rating: 5, image: "https://i.pravatar.cc/150?u=marcus", category: "Education", tags: ["STEM Learning"], date: "1w ago", verified: true },
  { id: 4, name: "Elena Rodriguez", role: "Grandmother", text: "Personal Shopper service was a godsend. Found the perfect age-appropriate gift.", rating: 5, image: "https://i.pravatar.cc/150?u=elena", category: "Personal Shopping", tags: ["Bespoke"], date: "2d ago", verified: true },
];

const stats = [
  { value: "2.5K+", label: "Families", icon: Users, color: "from-blue-500 to-cyan-500" },
  { value: "98%", label: "Satisfaction", icon: Heart, color: "from-pink-500 to-rose-500" },
  { value: "4.9/5", label: "Rating", icon: Star, color: "from-amber-500 to-yellow-500" },
  { value: "24h", label: "Response", icon: Zap, color: "from-purple-500 to-pink-500" },
];

const categories = ["All", "Gifting", "Repairs", "Education", "Personal Shopping"];

export default function TestimonialsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  useEffect(() => { setMounted(true); }, []);

  const filteredReviews = activeCategory === "All" 
    ? reviews 
    : reviews.filter(review => review.category === activeCategory);

  if (!mounted) return <div className="min-h-screen bg-[#FCFBFA] dark:bg-gray-950" />;

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#FCFBFA] via-amber-50/20 to-cyan-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-10 md:py-16 px-4 overflow-hidden"
      onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
    >
      {/* Dynamic Cursor Glow - Only on Desktop */}
      <motion.div
        className="fixed hidden lg:block w-96 h-96 pointer-events-none rounded-full blur-3xl bg-gradient-to-r from-[#D4AF37]/10 to-transparent z-0"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      />

      {/* Header Section */}
      <header className="max-w-7xl mx-auto text-center mb-12 md:mb-20 relative z-10 pt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white dark:bg-gray-900 text-[#D4AF37] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-8 border border-amber-200 dark:border-amber-800 shadow-sm"
        >
          <Sparkles size={14} className="fill-current" />
          500+ VERIFIED STORIES
        </motion.div>
        
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[10rem] lg:text-[12rem] font-black text-gray-900 dark:text-white leading-[0.8] tracking-tighter"
          >
            <span className="bg-gradient-to-r from-[#D4AF37] via-amber-400 to-yellow-500 bg-clip-text text-transparent">WOW</span>
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-7xl font-black mt-2 dark:text-white"
          >
            Experience
          </motion.h2>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto mt-8 text-sm md:text-xl text-gray-600 dark:text-gray-400 px-4"
        >
          Where every toy tells a story. Join the community and discover the <span className="text-[#D4AF37] font-bold">magic of play</span>.
        </motion.p>
      </header>

      {/* Stats - Grid optimized for mobile (2x2) */}
      <section className="max-w-6xl mx-auto mb-16 md:mb-24 grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-lg"
          >
            <div className={`inline-flex p-2 md:p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-3`}>
              <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="text-xl md:text-3xl font-black dark:text-white">{stat.value}</div>
            <div className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Categories - Horizontal Scroll on Mobile */}
      <div className="max-w-7xl mx-auto mb-10 overflow-x-auto no-scrollbar flex md:flex-wrap md:justify-center gap-2 pb-4 px-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-6 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat 
              ? 'bg-[#D4AF37] text-white shadow-lg' 
              : 'bg-white/80 dark:bg-gray-900/80 text-gray-600 dark:text-gray-400'
            } border border-gray-100 dark:border-gray-800`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Testimonials Grid - Dynamic Layout */}
      <section className="max-w-7xl mx-auto mb-20 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review, i) => (
              <motion.div
                layout
                key={review.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl relative"
              >
                <Quote className="absolute top-6 right-6 text-[#D4AF37]/10" size={40} />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img src={review.image} className="w-12 h-12 rounded-full border-2 border-amber-200" alt={review.name} />
                    {review.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#D4AF37] rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle2 size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-base dark:text-white">{review.name}</h4>
                    <p className="text-[10px] md:text-xs text-[#D4AF37] font-black uppercase">{review.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} size={14} className="fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base italic leading-relaxed mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-50 dark:border-gray-800">
                  {review.tags.map(t => (
                    <span key={t} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Story - Responsive Stack */}
      <section className="max-w-6xl mx-auto mb-20 px-2">
        <div className="bg-gray-900 rounded-[2.5rem] overflow-hidden grid md:grid-cols-2">
          <div className="p-8 md:p-16 flex flex-col justify-center">
            <div className="text-[#D4AF37] text-xs font-black tracking-widest uppercase mb-4">Featured Success Story</div>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6">
              From <span className="text-[#D4AF37]">Broken</span> to Beautiful
            </h3>
            <p className="text-gray-400 text-sm md:text-lg mb-8">
              Watch how we restored a 1970s vintage train set, turning a childhood memory into a new family legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-[#D4AF37] text-white font-bold rounded-xl text-sm">Watch Video</button>
              <button className="px-8 py-3 border border-gray-700 text-white font-bold rounded-xl text-sm">Read Story</button>
            </div>
          </div>
          <div className="relative aspect-video md:aspect-auto bg-[url('https://images.unsplash.com/photo-1587654780298-8c6d6b2c8b2a?auto=format&fit=crop&w=1200')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <motion.button whileHover={{ scale: 1.1 }} className="w-16 h-16 bg-white rounded-full flex items-center justify-center pl-1 shadow-2xl">
                <Play fill="#D4AF37" className="text-[#D4AF37]" size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-6 dark:text-white">Your Story <span className="text-[#D4AF37]">Awaits</span></h2>
        <p className="text-gray-500 mb-10 max-w-lg mx-auto text-sm md:text-base">
          Join 10,000+ families sharing the joy of play. Tag us to be featured in our gallery.
        </p>
        <button className="w-full sm:w-auto px-12 py-5 bg-black dark:bg-white text-white dark:text-black font-black rounded-2xl text-lg shadow-2xl transition-transform hover:scale-105">
          Share Your Experience
        </button>
      </footer>

      {/* Floating Action for Mobile Accessibility */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#D4AF37] text-white rounded-full shadow-2xl flex items-center justify-center z-50 md:hidden"
      >
        <MessageCircle size={24} />
      </motion.button>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}