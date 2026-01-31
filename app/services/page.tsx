'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  Gift, Wrench, Truck, Sparkles, PartyPopper, 
  ShieldCheck, ArrowRight, Star, Zap, Crown, 
  Rocket, Palette, Heart, Globe, Clock, 
  Camera, Music, Compass, Layers, Brain,
  ChevronRight, ChevronLeft, Play, Target,
  Award, TrendingUp, Package, Users, Wifi
} from 'lucide-react';

const services = [
  {
    icon: <Gift size={36} />,
    title: "Signature Gold-Foil Wrapping",
    description: "Our legendary 'Gold Standard' packaging. Hand-wrapped in premium metallic foil with custom wax seals and calligraphy notes.",
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-gradient-to-br from-amber-500/10 to-yellow-500/10",
    tag: "Most Popular",
    price: "$29+",
    features: ["24K Gold Leaf", "Custom Wax Seals", "Handwritten Notes", "Reusable Box"],
    delay: 0
  },
  {
    icon: <Wrench size={36} />,
    title: "Toy Restoration Lab",
    description: "A specialized clinic for beloved playthings. From micro-soldering drone circuits to restoring vintage wooden heirlooms.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
    tag: "Expert Care",
    price: "$99+",
    features: ["Vintage Restoration", "Circuit Repair", "3D Part Printing", "Quality Testing"],
    delay: 0.1
  },
  {
    icon: <Truck size={36} />,
    title: "Sky-Drop Drone Delivery",
    description: "Why wait for a van? For local enthusiasts, we deploy our proprietary fleet to drop your gadgets directly to your garden.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    tag: "Future Tech",
    price: "$49+",
    features: ["1-Hour Delivery", "GPS Tracking", "Weather Proof", "Video Recording"],
    delay: 0.2
  },
  {
    icon: <Sparkles size={36} />,
    title: "Curated Joy Concierge",
    description: "Skip the scrolling. Our personal shoppers use 'Play-Profiles' to build the perfect developmental toy chest for your child.",
    color: "from-rose-500 to-red-500",
    bgColor: "bg-gradient-to-br from-rose-500/10 to-red-500/10",
    tag: "Bespoke",
    price: "$199+",
    features: ["Personal Shopper", "Age Profiling", "Monthly Curation", "Gift Planning"],
    delay: 0.3
  },
  {
    icon: <PartyPopper size={36} />,
    title: "WOW Workshop Events",
    description: "We bring the 'WOW'. In-store STEM workshops, RC racing leagues, and high-tech birthday party experiences.",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-gradient-to-br from-emerald-500/10 to-green-500/10",
    tag: "Community",
    price: "$299+",
    features: ["STEM Workshops", "Birthday Parties", "Team Building", "Live Demos"],
    delay: 0.4
  },
  {
    icon: <ShieldCheck size={36} />,
    title: "Lifetime Play Guarantee",
    description: "Our 'Forever Play' protection goes beyond standard warranties, covering accidental 'oopsies' and technical glitches.",
    color: "from-indigo-500 to-violet-500",
    bgColor: "bg-gradient-to-br from-indigo-500/10 to-violet-500/10",
    tag: "Safety First",
    price: "Included",
    features: ["Accident Coverage", "Free Repairs", "Priority Support", "Parts Replacement"],
    delay: 0.5
  },
  {
    icon: <Rocket size={36} />,
    title: "STEM Innovation Hub",
    description: "Interactive learning sessions with robotics, coding kits, and augmented reality educational tools.",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
    tag: "Education",
    price: "$159+",
    features: ["Coding Classes", "Robot Building", "AR Learning", "Science Kits"],
    delay: 0.6
  },
  {
    icon: <Palette size={36} />,
    title: "Custom Toy Design",
    description: "Bring your imagination to life. Our designers create one-of-a-kind toys based on your child's drawings and ideas.",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-gradient-to-br from-pink-500/10 to-rose-500/10",
    tag: "Exclusive",
    price: "$499+",
    features: ["3D Modeling", "Custom Artwork", "Personalization", "Prototype Testing"],
    delay: 0.7
  }
];

const stats = [
  { label: "Smiles Created", value: "50K+", icon: Heart, color: "from-rose-500 to-pink-500" },
  { label: "Toys Restored", value: "1,200+", icon: Wrench, color: "from-blue-500 to-cyan-500" },
  { label: "Drone Drops", value: "850+", icon: Rocket, color: "from-purple-500 to-violet-500" },
  { label: "Custom Gifts", value: "15K+", icon: Gift, color: "from-amber-500 to-yellow-500" },
  { label: "Happy Families", value: "10K+", icon: Users, color: "from-emerald-500 to-green-500" },
  { label: "Global Reach", value: "50+", icon: Globe, color: "from-indigo-500 to-blue-500" },
];

export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [videoPlaying, setVideoPlaying] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 30 });
  const smoothYScroll = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const categories = ["All", "Delivery", "Gifting", "Repair", "Events", "Education", "Custom", "Premium"];

  const filteredServices = activeCategory === "All" 
    ? services 
    : services.filter(service => service.tag.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#FCFBFA] via-amber-50/30 to-cyan-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 overflow-hidden relative selection:bg-[#D4AF37]/30"
      ref={containerRef}
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-40 w-[800px] h-[800px] bg-gradient-to-r from-[#D4AF37]/10 to-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        
        {/* Floating shapes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <div className={`w-${Math.floor(Math.random() * 6) + 2} h-${Math.floor(Math.random() * 6) + 2} rounded-full bg-gradient-to-r ${
              i % 4 === 0 ? 'from-[#D4AF37]/10 to-amber-500/10' :
              i % 4 === 1 ? 'from-blue-500/10 to-cyan-500/10' :
              i % 4 === 2 ? 'from-purple-500/10 to-pink-500/10' :
              'from-emerald-500/10 to-green-500/10'
            } blur-sm`} />
          </motion.div>
        ))}
      </div>

      {/* Interactive Cursor Glow */}
      <motion.div
        className="fixed w-96 h-96 pointer-events-none rounded-full blur-3xl z-0"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 50%, transparent 70%)"
        }}
      />

      {/* 1. Immersive Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: smoothYScroll, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578775887805-f0d5d1f8b7a2?auto=format&fit=crop&w=2070')] bg-cover bg-center scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FCFBFA] dark:from-gray-950 via-[#FCFBFA]/80 dark:via-gray-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 via-transparent to-cyan-500/10" />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="inline-flex items-center gap-2 px-6 py-3 mb-8 border-2 border-[#D4AF37] rounded-full text-[#D4AF37] text-sm font-bold tracking-[0.2em] uppercase backdrop-blur-sm bg-white/10 dark:bg-gray-900/10"
          >
            <Sparkles size={16} />
            The Gold Standard of Play
            <Crown size={16} />
          </motion.div>

          {/* Main heading with gradient animation */}
          <div className="relative mb-8">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-[10rem] lg:text-[12rem] font-black text-gray-900 dark:text-white leading-[0.8] tracking-tighter"
            >
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-[#D4AF37] via-amber-300 to-yellow-300 bg-clip-text text-transparent">
                  WOW
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 border-4 border-dashed border-[#D4AF37]/30 rounded-full"
                />
              </span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 mt-6"
            >
              Premium <span className="text-[#D4AF37]">Services</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            We don't just sell toys; we curate magical experiences. 
            From drone deliveries to restoration labs, discover the art of exceptional service.
          </motion.p>

          {/* Animated CTA button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-5 bg-gradient-to-r from-[#D4AF37] to-amber-400 text-white font-bold rounded-full text-lg shadow-2xl shadow-amber-500/30 overflow-hidden"
          >
            <motion.div
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: 'linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)',
                backgroundSize: '200% 200%',
              }}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative flex items-center gap-3">
              <Zap size={24} />
              Experience the Magic
              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.button>
        </div>

        {/* Floating decorative icons */}
        <div className="absolute inset-0 pointer-events-none z-5">
          <FloatingElement icon={<Rocket />} delay={0} color="from-purple-500 to-pink-500" />
          <FloatingElement icon={<Gift />} delay={1} color="from-amber-500 to-yellow-500" />
          <FloatingElement icon={<Star />} delay={2} color="from-blue-500 to-cyan-500" />
          <FloatingElement icon={<Heart />} delay={3} color="from-rose-500 to-pink-500" />
        </div>
      </section>

      {/* 2. Interactive Stats Bar */}
      <section className="relative z-10 -mt-20 mb-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-800/50 shadow-xl h-full">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-10 mb-4`}>
                    <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider mt-2">
                    {stat.label}
                  </div>
                </div>
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity duration-300 -z-10`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Category Filter */}
      <section className="max-w-7xl mx-auto px-4 mb-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our <span className="text-[#D4AF37]">Signature</span> Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Choose from our curated selection of premium services designed to elevate your play experience
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold text-sm tracking-wider transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#D4AF37] to-amber-400 text-white shadow-lg shadow-amber-500/30'
                  : 'bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 backdrop-blur-sm'
              } border border-gray-200/50 dark:border-gray-800/50`}
            >
              {category}
              {activeCategory === category && (
                <Sparkles className="inline ml-2 w-4 h-4" />
              )}
            </motion.button>
          ))}
        </div>
      </section>

      {/* 4. Interactive Services Grid */}
      <section className="max-w-7xl mx-auto px-4 mb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: service.delay, type: "spring" }}
                whileHover={{ 
                  y: -20,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-4 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 blur-xl rounded-3xl transition-opacity duration-300`} />
                
                <div className={`relative h-full ${service.bgColor} backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-2xl overflow-hidden`}>
                  {/* Price tag */}
                  <div className="absolute top-6 right-6 px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-bold text-gray-900 dark:text-white">
                    {service.price}
                  </div>
                  
                  {/* Service tag */}
                  <div className="absolute top-6 left-6 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    {service.tag}
                  </div>
                  
                  {/* Icon with animation */}
                  <motion.div
                    animate={{ rotate: hoveredService === index ? 360 : 0 }}
                    transition={{ duration: 0.6 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${service.color} p-1 mb-8 mt-6`}
                  >
                    <div className="w-full h-full rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center">
                      <div className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                        {service.icon}
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:shadow-lg transition-all"
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 5. Interactive Service Showcase */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-amber-500/20 text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-6"
            >
              <Target size={16} />
              Service in Action
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              See the <span className="text-[#D4AF37]">Magic</span> Unfold
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Video showcase */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-[3rem] overflow-hidden shadow-2xl"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black">
                  {/* Video placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setVideoPlaying(!videoPlaying)}
                      className="relative group/play"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-amber-300 rounded-full blur-xl opacity-75 group-hover/play:opacity-100 transition-opacity" />
                      <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl pl-2">
                        <Play size={40} fill="#D4AF37" className="text-[#D4AF37]" />
                      </div>
                    </motion.button>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </motion.div>
              
              {/* Floating info cards */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#D4AF37] to-amber-400 rounded-xl flex items-center justify-center">
                    <Clock size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                    <div className="text-sm text-gray-500">Support</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side - Features */}
            <div className="space-y-8">
              {[
                {
                  icon: <Award />,
                  title: "Award-Winning Service",
                  description: "Recognized globally for exceptional customer experience and innovation"
                },
                {
                  icon: <TrendingUp />,
                  title: "Growing Community",
                  description: "Join 10,000+ families who trust us with their magical moments"
                },
                {
                  icon: <Package />,
                  title: "Sustainable Packaging",
                  description: "Eco-friendly materials without compromising on luxury"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-[#D4AF37]/10 to-amber-500/10 rounded-xl flex items-center justify-center">
                    <div className="text-[#D4AF37]">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA with Particle Effect */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 20 }}
            className="inline-block mb-12"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 border-8 border-dashed border-[#D4AF37]/30 rounded-full"
              />
              <div className="w-32 h-32 bg-gradient-to-r from-[#D4AF37] to-amber-400 rounded-full flex items-center justify-center shadow-2xl">
                <Sparkles size={48} className="text-white" />
              </div>
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Ready for Your <span className="text-[#D4AF37]">WOW</span> Moment?
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform ordinary play into extraordinary memories with our premium services. 
            Where imagination meets exceptional service.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-5 bg-gradient-to-r from-[#D4AF37] to-amber-400 text-white font-bold rounded-full text-lg shadow-2xl shadow-amber-500/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-3">
                <Sparkles size={24} />
                Start Your Journey
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
            
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-12 py-5 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-full text-lg hover:bg-[#D4AF37] hover:text-white transition-all"
              >
                <span className="flex items-center gap-3">
                  <Users size={24} />
                  Book Consultation
                </span>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Particle effect */}
        <ParticleEffect />
      </section>
    </div>
  );
}

// Floating Element Component
function FloatingElement({ icon, delay = 0, color = "from-[#D4AF37] to-amber-400" }) {
  return (
    <motion.div
      className="absolute"
      animate={{
        y: [0, -100, 0],
        x: [0, Math.sin(delay) * 50, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      style={{
        left: `${20 + delay * 20}%`,
        top: `${30 + delay * 10}%`,
      }}
    >
      <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center shadow-xl`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

// Particle Effect Component
function ParticleEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#60A5FA' : '#F472B6'
            } 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -1000],
            x: [Math.sin(i) * 100, Math.cos(i) * 100],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "linear"
          }}
          initial={{
            y: 0,
            x: Math.sin(i) * 100,
            scale: 0,
            opacity: 0
          }}
        />
      ))}
    </div>
  );
}