"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, Quote, CheckCircle2, 
  Crown, Landmark, ArrowRight
} from 'lucide-react';

const reviews = [
  { id: 1, name: "Sarah Jenkins", role: "Parent", text: "The 'Gold-Foil' wrapping was beautiful. WOW Lifestyle understands the magic of gifting.", rating: 5, image: "https://i.pravatar.cc/150?u=sarah", category: "Gifting", tags: ["Premium Packaging"], featured: true },
  { id: 2, name: "David Chen", role: "Enthusiast", text: "Their drone repair lab saved my custom FPV drone. Expert technicians.", rating: 5, image: "https://i.pravatar.cc/150?u=david", category: "Repairs", tags: ["Quick Service"], featured: false },
  { id: 3, name: "Marcus Thorne", role: "Hobbyist", text: "The selection of STEM toys is unmatched. Engineering principles through play.", rating: 5, image: "https://i.pravatar.cc/150?u=marcus", category: "Education", tags: ["STEM Learning"], featured: false },
  { id: 4, name: "Elena Rodriguez", role: "Collector", text: "Personal Shopper service was a godsend. Found the perfect age-appropriate gift.", rating: 5, image: "https://i.pravatar.cc/150?u=elena", category: "Shopping", tags: ["Bespoke"], featured: true },
];

const MarqueeRow = ({ items, duration, reverse = false }: { items: typeof reviews; duration: number; reverse?: boolean }) => (
  <div className="flex overflow-hidden py-6 mask-fade-edges">
    <motion.div 
      className="flex whitespace-nowrap gap-10"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ ease: "linear", duration: duration, repeat: Infinity }}
    >
      {[...items, ...items, ...items].map((review, idx) => (
        <div 
          key={`${review.id}-${idx}`} 
          className="inline-flex items-center gap-6 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 rounded-[2.5rem] shadow-xl min-w-[450px] lg:min-w-[550px]"
        >
          <div className="relative flex-shrink-0">
            <img src={review.image} alt="" className="w-16 h-16 rounded-full border-2 border-[#D4AF37]/40 object-cover" />
            <div className="absolute -bottom-1 -right-1 bg-[#D4AF37] rounded-full p-1 border-2 border-white dark:border-[#0f0f0f]">
              <CheckCircle2 size={12} className="text-white dark:text-black" />
            </div>
          </div>
          <div className="text-left overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-lg font-bold leading-none dark:text-white">{review.name}</p>
                <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-widest mt-1">{review.role}</p>
              </div>
              <div className="flex gap-1 ml-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-[#D4AF37] text-[#D4AF37]" />)}
              </div>
            </div>
            <p className="text-base text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed line-clamp-2">
              "{review.text}"
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
);

export default function EnhancedTestimonials() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true); 
  }, []);

  if (!mounted) return null;

  const row1 = reviews;
  const row2 = [...reviews].reverse();
  const row3 = [reviews[1], reviews[3], reviews[0], reviews[2]];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-white transition-colors duration-500 selection:bg-[#D4AF37]/30">
      
      {/* --- HERO & MARQUEE SECTION --- */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/5 blur-[140px] rounded-full" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* 3-Row Marquee replaces the static grid and filters */}
          <div className="flex flex-col gap-2 mb-20">
            <MarqueeRow items={row1} duration={30} />
            <MarqueeRow items={row2} duration={40} reverse={true} />
            <MarqueeRow items={row3} duration={35} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-10"
          >
            <Crown size={14} /> The Gold Standard of Play
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-serif font-light mb-8 tracking-tighter"
          >
            Voices of <span className="italic text-[#D4AF37]">Wonder</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400 text-xl font-light leading-relaxed"
          >
            At WOW Lifestyle, we don't just sell toys; we curate memories. 
            Experience why collectors and families trust our vision.
          </motion.p>
        </div>
      </section>

      {/* --- OWNER SPOTLIGHT --- */}
      <section className="max-w-6xl mx-auto px-4 mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group rounded-[4rem] overflow-hidden bg-gray-50 dark:bg-gradient-to-b dark:from-[#111] dark:to-black border border-gray-200 dark:border-white/5 p-10 md:p-20 shadow-2xl dark:shadow-none"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
            <Landmark size={250} />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-4 text-[#D4AF37] mb-8">
                <div className="h-[1px] w-12 bg-[#D4AF37]" />
                <span className="text-sm font-bold tracking-widest uppercase">The Visionary</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-[1.1] dark:text-white">
                "Play is the highest form of <span className="italic text-[#D4AF37]">research</span>."
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-xl mb-10 italic font-light leading-relaxed">
                "Every item in our shop is hand-vetted to ensure it sparks curiosity and developmental growth."
              </p>
              <div>
                <h4 className="text-2xl font-bold dark:text-white text-gray-900">Alexander V. Sterling</h4>
                <p className="text-[#D4AF37] text-base font-medium">Founder & CEO, WOW Lifestyle</p>
              </div>
            </div>

            <div className="order-1 md:order-2 relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white dark:border-[#D4AF37]/20 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                  alt="Founder" 
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-[#D4AF37] p-8 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-none">
                <Quote className="text-[#D4AF37] dark:text-black mb-4" size={40} />
                <p className="text-gray-900 dark:text-black font-black text-sm leading-tight uppercase tracking-tighter">
                  Committed to<br/>Quality Since 2012
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- LUXURY CTA --- */}
      <footer className="relative bg-gray-50 dark:bg-transparent py-40 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent dark:hidden" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-6xl md:text-8xl font-serif mb-10 dark:text-white">Your Story <span className="italic text-[#D4AF37]">Awaits</span></h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-12 py-5 bg-[#D4AF37] text-white dark:text-black font-black text-sm rounded-[2rem] hover:translate-y-[-4px] transition-all shadow-2xl shadow-[#D4AF37]/30 flex items-center justify-center gap-3 uppercase tracking-widest">
              Share Your Experience <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </footer>

      <style jsx global>{`
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </div>
  );
}