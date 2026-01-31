'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  Gift, Wrench, Truck, Sparkles, PartyPopper, 
  ShieldCheck, ArrowRight, Star, Zap, Crown, 
  Rocket, Palette, Heart, Globe, Clock, 
  Play, Target, Award, TrendingUp, Package, 
  Users, ChevronRight
} from 'lucide-react';

// --- Data ---
const services = [
  {
    icon: <Gift className="w-6 h-6 md:w-9 md:h-9" />,
    title: "Signature Gold-Foil Wrapping",
    description: "Our legendary 'Gold Standard' packaging. Hand-wrapped in premium metallic foil with custom wax seals.",
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-gradient-to-br from-amber-500/10 to-yellow-500/10",
    tag: "Most Popular",
    price: "$29+",
    features: ["24K Gold Leaf", "Custom Wax Seals", "Handwritten Notes"],
    delay: 0
  },
  {
    icon: <Wrench className="w-6 h-6 md:w-9 md:h-9" />,
    title: "Toy Restoration Lab",
    description: "A specialized clinic for beloved playthings. From micro-soldering circuits to restoring vintage heirlooms.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
    tag: "Expert Care",
    price: "$99+",
    features: ["Vintage Restoration", "Circuit Repair", "3D Part Printing"],
    delay: 0.1
  },
  {
    icon: <Truck className="w-6 h-6 md:w-9 md:h-9" />,
    title: "Sky-Drop Drone Delivery",
    description: "Why wait? For local enthusiasts, we deploy our proprietary fleet to drop gadgets directly to your garden.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    tag: "Future Tech",
    price: "$49+",
    features: ["1-Hour Delivery", "GPS Tracking", "Weather Proof"],
    delay: 0.2
  },
  {
    icon: <Sparkles className="w-6 h-6 md:w-9 md:h-9" />,
    title: "Curated Joy Concierge",
    description: "Personal shoppers use 'Play-Profiles' to build the perfect developmental toy chest for your child.",
    color: "from-rose-500 to-red-500",
    bgColor: "bg-gradient-to-br from-rose-500/10 to-red-500/10",
    tag: "Bespoke",
    price: "$199+",
    features: ["Personal Shopper", "Age Profiling", "Monthly Curation"],
    delay: 0.3
  }
];

const stats = [
  { label: "Smiles", value: "50K+", icon: Heart, color: "from-rose-500 to-pink-500" },
  { label: "Restored", value: "1.2K+", icon: Wrench, color: "from-blue-500 to-cyan-500" },
  { label: "Drops", value: "850+", icon: Rocket, color: "from-purple-500 to-violet-500" },
  { label: "Gifts", value: "15K+", icon: Gift, color: "from-amber-500 to-yellow-500" },
  { label: "Families", value: "10K+", icon: Users, color: "from-emerald-500 to-green-500" },
  { label: "Countries", value: "50+", icon: Globe, color: "from-indigo-500 to-blue-500" },
];

// --- Sub-components ---
interface FloatingProps {
  icon: React.ReactNode;
  delay?: number;
  color?: string;
  className?: string;
}

function FloatingElement({ icon, delay = 0, color = "from-[#D4AF37] to-amber-400", className }: FloatingProps) {
  return (
    <motion.div
      className={`absolute hidden md:block ${className}`}
      animate={{
        y: [0, -40, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 5 + delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center shadow-xl text-white backdrop-blur-md`}>
        {icon}
      </div>
    </motion.div>
  );
}

function ParticleEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => ( // Reduced for mobile performance
        <motion.div
          key={i}
          className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? '#D4AF37' : '#60A5FA',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -500],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

// --- Main Page ---
export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [videoPlaying, setVideoPlaying] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const categories = ["All", "Delivery", "Gifting", "Repair", "Events", "Custom"];

  const filteredServices = activeCategory === "All" 
    ? services 
    : services.filter(service => service.tag.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#FCFBFA] dark:bg-gray-950 text-gray-900 dark:text-white selection:bg-[#D4AF37]/30 overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] md:h-screen flex items-center justify-center px-4 pt-20">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578775887805-f0d5d1f8b7a2?auto=format&fit=crop&w=2070')] bg-cover bg-center opacity-20 dark:opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FCFBFA] dark:via-gray-950 to-[#FCFBFA] dark:to-gray-950" />
        </motion.div>

        <div className="relative z-10 text-center w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-[#D4AF37]/50 rounded-full text-[#D4AF37] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase bg-white/50 dark:bg-gray-900/50 backdrop-blur-md"
          >
            <Sparkles size={14} /> The Gold Standard of Play <Crown size={14} />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-[10rem] lg:text-[13rem] font-black leading-[0.8] mb-4"
          >
            <span className="bg-gradient-to-r from-[#D4AF37] via-amber-300 to-yellow-500 bg-clip-text text-transparent">WOW</span>
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Premium <span className="italic font-serif text-[#D4AF37]">Services</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 px-4"
          >
            We don't just sell toys; we curate magical experiences. From drone deliveries to restoration labs.
          </motion.p>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6"
          >
            <button className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2">
              <Zap size={20} /> Explore Magic
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border-2 border-gray-200 dark:border-gray-800 hover:border-[#D4AF37] font-bold rounded-2xl transition-all">
              View Pricing
            </button>
          </motion.div>
        </div>

        {/* Floating Icons - Hidden on small mobile for clarity */}
        <FloatingElement icon={<Rocket />} delay={0} className="top-1/4 left-[10%]" />
        <FloatingElement icon={<Gift />} delay={2} color="from-blue-500 to-cyan-500" className="bottom-1/4 right-[10%]" />
      </section>

      {/* 2. Stats Section */}
      <section className="relative z-20 px-4 -mt-10 mb-20 md:mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm text-center"
              >
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-[#D4AF37]" />
                <div className="text-xl md:text-3xl font-black">{stat.value}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Category Filter - Scrollable on Mobile */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap md:justify-center gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all ${
                activeCategory === cat 
                ? 'bg-[#D4AF37] text-white shadow-md' 
                : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Services Grid */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                layout
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative"
              >
                <div className={`h-full ${service.bgColor} p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col`}>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 md:p-4 rounded-2xl bg-gradient-to-r ${service.color} text-white`}>
                      {service.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tighter bg-white dark:bg-gray-800 px-2 py-1 rounded-lg">
                      {service.price}
                    </span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-8">
                    {service.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-[11px] md:text-xs font-medium text-gray-500">
                        <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                    Book Service
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 5. Showcase (Video/Image) */}
      <section className="px-4 py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black">Service in <span className="text-[#D4AF37]">Action</span></h2>
            <p className="text-gray-600 dark:text-gray-400">Experience the meticulous care we put into every restoration and delivery. Our team treats every toy like a masterpiece.</p>
            
            <div className="space-y-4">
              {[
                { i: <Award />, t: "Certified Experts", d: "Master technicians with decades of experience." },
                { i: <Clock />, t: "Real-time Tracking", d: "Follow your drone delivery via our mobile app." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <div className="text-[#D4AF37]">{item.i}</div>
                  <div>
                    <div className="font-bold text-sm md:text-base">{item.t}</div>
                    <div className="text-xs text-gray-500">{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative aspect-video bg-gray-200 dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-2xl">
             <div className="absolute inset-0 flex items-center justify-center">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-white text-[#D4AF37] rounded-full flex items-center justify-center shadow-2xl pl-1"
                >
                  <Play fill="currentColor" size={32} />
                </motion.button>
             </div>
             <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="text-[10px] text-white/70 uppercase font-bold">Now Playing</div>
                <div className="text-xs md:text-sm text-white font-bold tracking-wide">Restore & Re-imagine: The Toy Lab</div>
             </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden text-center">
        <ParticleEffect />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-[#D4AF37] rounded-3xl rotate-12 mx-auto mb-8 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
            <Sparkles size={40} />
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
            Ready for your <span className="text-[#D4AF37]">WOW</span> Moment?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-[#D4AF37] text-white font-bold rounded-2xl text-lg shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2">
              Get Started <ChevronRight />
            </button>
            <button className="px-10 py-5 border-2 border-gray-200 dark:border-gray-800 font-bold rounded-2xl text-lg">
              Contact Concierge
            </button>
          </div>
        </div>
      </section>

      {/* Custom Styles for no-scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}