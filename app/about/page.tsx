'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimation, AnimatePresence } from 'framer-motion';
import { Heart, Rocket, Users, Globe, Target, Sparkles, Star, Gift, Zap, Crown, Play, ChevronRight, ShoppingBag, Package, Award, Layers, Wind, Clock } from 'lucide-react';

// --- Data ---
const values = [
  {
    icon: <Heart className="text-rose-500" size={24} />,
    title: "Curated with Love",
    text: "We hand-pick every item to ensure it meets our 'WOW' standard of joy.",
    bgColor: "bg-rose-500/10",
    delay: 0.1
  },
  {
    icon: <Rocket className="text-blue-500" size={24} />,
    title: "Future Play",
    text: "STEM kits and AI drones bridging traditional play with tomorrow's tech.",
    bgColor: "bg-blue-500/10",
    delay: 0.2
  },
  {
    icon: <Users className="text-amber-500" size={24} />,
    title: "Community",
    text: "Workshops and events that turn customers into a global family.",
    bgColor: "bg-amber-500/10",
    delay: 0.3
  },
  {
    icon: <Globe className="text-emerald-500" size={24} />,
    title: "Inspiration",
    text: "Bringing international magic from every corner of the world to you.",
    bgColor: "bg-emerald-500/10",
    delay: 0.4
  }
];

const featuredToys = [
  {
    name: "Quantum Builder Set",
    category: "STEM",
    price: "$89.99",
    image: "https://images.unsplash.com/photo-1594787318281-bc0e1b5d0a0d?auto=format&fit=crop&w=800",
    rating: 4.9,
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Galaxy Explorer Drone",
    category: "Tech",
    price: "$149.99",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800",
    rating: 4.8,
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Vintage Restoration",
    category: "Collectible",
    price: "$129.99",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800",
    rating: 4.7,
    color: "from-amber-500 to-orange-500"
  }
];

const stats = [
  { value: "10K+", label: "Happy Kids", icon: Heart, color: "text-rose-500" },
  { value: "500+", label: "Unique Toys", icon: Gift, color: "text-emerald-500" },
  { value: "50+", label: "Countries", icon: Globe, color: "text-blue-500" },
  { value: "4.9★", label: "Rating", icon: Star, color: "text-amber-500" }
];

// --- Main Page Component ---
export default function AboutPage() {
  const [activeToy, setActiveToy] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Parallax effects
  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Mouse Glow logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-[#FCFBFA] dark:bg-gray-950 overflow-x-hidden" ref={containerRef}>
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[120px]" />
      </div>

      {/* Interactive Mouse Glow */}
      <motion.div
        className="fixed w-[600px] h-[600px] pointer-events-none rounded-full blur-[100px] z-0 opacity-40 md:opacity-100"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)"
        }}
      />

      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?auto=format&fit=crop&w=2070')] bg-cover bg-center opacity-10 dark:opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FCFBFA] dark:via-gray-950 to-[#FCFBFA] dark:to-gray-950" />
        </motion.div>

        <div className="relative z-10 text-center w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 mb-6 border border-[#D4AF37]/50 rounded-full text-[#D4AF37] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase bg-white/50 dark:bg-gray-900/50 backdrop-blur-md"
          >
            <Sparkles className="inline-block mr-2" size={14} /> The World of WOW
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-[10rem] lg:text-[12rem] font-black leading-[0.8] tracking-tighter mb-4"
          >
            <span className="bg-gradient-to-r from-[#D4AF37] via-amber-300 to-yellow-500 bg-clip-text text-transparent">WOW</span>
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-800 dark:text-gray-100"
          >
            LIFESTYLE <span className="text-[#D4AF37]">TOYS</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 px-4 leading-relaxed"
          >
            Where imagination meets innovation, creating moments of pure joy for families worldwide.
          </motion.p>

          <motion.button 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             whileHover={{ scale: 1.05 }}
             className="w-full sm:w-auto px-10 py-5 bg-[#D4AF37] text-white font-bold rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 mx-auto"
          >
            <ShoppingBag size={20} /> Start Your Journey <ChevronRight size={20} />
          </motion.button>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="relative z-20 px-4 -mt-10 mb-20 md:mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl text-center"
              >
                <stat.icon className={`w-5 h-5 md:w-8 md:h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl md:text-4xl font-black">{stat.value}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive Collection Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              <span className="text-[#D4AF37]">Signature</span> Collection
            </h2>
            <p className="text-gray-500 text-sm md:text-base">Explore our hand-picked magic</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Active Toy Display */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeToy}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="relative aspect-[4/5] md:aspect-video rounded-[2rem] overflow-hidden shadow-2xl"
                >
                  <img 
                    src={featuredToys[activeToy].image} 
                    alt={featuredToys[activeToy].name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 text-white">
                    <span className="px-3 py-1 bg-[#D4AF37] rounded-full text-[10px] font-bold uppercase mb-4 inline-block tracking-widest">
                      {featuredToys[activeToy].category}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black mb-2">{featuredToys[activeToy].name}</h3>
                    <div className="flex items-center gap-4 text-xl md:text-2xl font-bold text-amber-400">
                      {featuredToys[activeToy].price}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Selection List */}
            <div className="lg:col-span-4 flex md:grid gap-4 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
              {featuredToys.map((toy, i) => (
                <button
                  key={toy.name}
                  onClick={() => setActiveToy(i)}
                  className={`flex-shrink-0 w-64 md:w-full p-4 rounded-2xl transition-all text-left border ${
                    activeToy === i 
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37] ring-4 ring-[#D4AF37]/5' 
                    : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <img src={toy.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                    <div>
                      <div className="font-bold text-sm dark:text-white">{toy.name}</div>
                      <div className="text-xs text-gray-500">{toy.category}</div>
                      <div className="text-[#D4AF37] font-bold mt-1">{toy.price}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: val.delay }}
                className="p-8 bg-white dark:bg-gray-950 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${val.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {val.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 dark:text-white">{val.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{val.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Mobile Responsive Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-16">The Journey <span className="text-[#D4AF37]">So Far</span></h2>
          
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-32 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12">
            {[
              { year: "2024", title: "The Spark", icon: <Sparkles />, side: "left" },
              { year: "2025", title: "Tech Leap", icon: <Rocket />, side: "right" },
              { year: "2026", title: "Global Expansion", icon: <Globe />, side: "left" }
            ].map((milestone, i) => (
              <motion.div 
                key={i}
                className={`flex flex-col sm:flex-row items-center justify-center gap-8 ${milestone.side === 'right' ? 'sm:flex-row-reverse' : ''}`}
              >
                <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-end sm:text-right">
                  <div className={`p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl w-full ${milestone.side === 'right' ? 'sm:items-start sm:text-left' : ''}`}>
                    <div className="text-[#D4AF37] font-black text-2xl mb-2">{milestone.year}</div>
                    <div className="text-xl font-bold mb-2 dark:text-white">{milestone.title}</div>
                    <p className="text-sm text-gray-500 italic">Redefining play for modern families and explorers.</p>
                  </div>
                </div>
                
                {/* Center Icon */}
                <div className="hidden sm:flex w-12 h-12 bg-[#D4AF37] rounded-full items-center justify-center text-white z-10 border-4 border-white dark:border-gray-950">
                  {milestone.icon}
                </div>

                <div className="w-1/2 hidden sm:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-tr from-[#D4AF37] to-amber-200 rounded-full mx-auto mb-10 flex items-center justify-center text-white blur-sm opacity-50 absolute -top-10 left-1/2 -translate-x-1/2"
          />
          <Gift size={64} className="text-[#D4AF37] mx-auto mb-8 relative" />
          <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight dark:text-white">
            Ready for Your <span className="text-[#D4AF37]">WOW</span> Moment?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-[#D4AF37] text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
              <ShoppingBag /> Start Shopping
            </button>
            <button className="px-10 py-5 border-2 border-[#D4AF37] text-[#D4AF37] font-black rounded-2xl hover:bg-[#D4AF37] hover:text-white transition-all">
              Virtual Tour
            </button>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// Particle Component
function ParticleEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-400 rounded-full"
          animate={{
            y: [0, -1000],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: '100%'
          }}
        />
      ))}
    </div>
  );
}