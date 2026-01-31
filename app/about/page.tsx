'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimation, AnimatePresence } from 'framer-motion';
import { Heart, Rocket, Users, Globe, Target, Sparkles, Star, Gift, Zap, Crown, Play, ChevronRight, ChevronLeft, ShoppingBag, Package, Award, TrendingUp, Compass, Layers, Palette, Wind, Atom } from 'lucide-react';

const values = [
  {
    icon: <Heart className="text-rose-500" size={28} />,
    title: "Curated with Love",
    text: "We don't just stock shelves; we hand-pick every item to ensure it meets our 'WOW' standard of quality and joy.",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500/10",
    delay: 0.1
  },
  {
    icon: <Rocket className="text-blue-500" size={28} />,
    title: "Future-Forward Play",
    text: "From STEM kits to AI-driven drones, we bridge the gap between traditional play and the technology of tomorrow.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    delay: 0.2
  },
  {
    icon: <Users className="text-amber-500" size={28} />,
    title: "Community First",
    text: "WOW Lifestyle is a hub for families. We host workshops and events that turn customers into a community.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    delay: 0.3
  },
  {
    icon: <Globe className="text-emerald-500" size={28} />,
    title: "Global Inspiration",
    text: "We source toys and ideas from every corner of the world, bringing international magic to your doorstep.",
    color: "from-emerald-500 to-green-500",
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
    name: "Vintage Car Restoration Kit",
    category: "Collectible",
    price: "$129.99",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w-800",
    rating: 4.7,
    color: "from-amber-500 to-orange-500"
  }
];

const stats = [
  { value: "10K+", label: "Happy Kids", icon: Heart, color: "text-rose-500" },
  { value: "500+", label: "Unique Toys", icon: Gift, color: "text-emerald-500" },
  { value: "50+", label: "Countries", icon: Globe, color: "text-blue-500" },
  { value: "4.9★", label: "Avg Rating", icon: Star, color: "text-amber-500" }
];

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  const [activeToy, setActiveToy] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  
  const containerRef = useRef(null);
  const controls = useAnimation();
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveToy((prev) => (prev + 1) % featuredToys.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    });
  }, [controls]);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50/20 to-cyan-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 overflow-hidden relative"
      ref={containerRef}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating shapes */}
        {[...Array(15)].map((_, i) => (
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
              delay: i * 0.5,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <div className={`w-${Math.floor(Math.random() * 4) + 2} h-${Math.floor(Math.random() * 4) + 2} rounded-full bg-gradient-to-r ${
              i % 3 === 0 ? 'from-[#D4AF37]/20 to-amber-500/20' :
              i % 3 === 1 ? 'from-blue-500/20 to-cyan-500/20' :
              'from-rose-500/20 to-pink-500/20'
            } blur-sm`} />
          </motion.div>
        ))}
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gradient-to-r from-[#D4AF37]/10 to-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Interactive Cursor Effect */}
      <motion.div
        className="fixed w-96 h-96 pointer-events-none rounded-full blur-3xl z-0"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 50%, transparent 70%)"
        }}
      />

      {/* 1. Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: smoothY, scale: smoothScale, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?auto=format&fit=crop&w=2070')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-white/80 dark:via-gray-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-cyan-500/10" />
        </motion.div>

        {/* Animated WOW Logo */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            animate={controls}
            className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37] via-amber-300 to-[#D4AF37] opacity-20 blur-xl rounded-full"
          />
          
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-sm mb-6 block"
          >
            Welcome to the World of
          </motion.span>
          
          <div className="relative mb-8">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-7xl md:text-[10rem] lg:text-[12rem] font-black text-gray-900 dark:text-white leading-[0.9] tracking-tighter"
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
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4"
            />
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8"
          >
            LIFESTYLE <span className="text-[#D4AF37]">TOYS</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Where imagination meets innovation, creating moments of pure joy for families worldwide.
          </motion.p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-4 bg-gradient-to-r from-[#D4AF37] to-amber-400 text-white font-bold rounded-full text-lg shadow-2xl shadow-amber-500/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-3">
              <ShoppingBag size={24} />
              Explore Magic Collection
              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.button>
        </div>

        {/* Animated floating toys */}
        <div className="absolute inset-0 pointer-events-none z-5">
          <FloatingToy icon={<Rocket />} delay={0} />
          <FloatingToy icon={<Gift />} delay={1} />
          <FloatingToy icon={<Star />} delay={2} />
          <FloatingToy icon={<Heart />} delay={3} />
        </div>
      </section>

      {/* 2. Animated Stats Bar */}
      <section className="relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-800/50 shadow-xl"
              >
                <div className={`inline-flex p-3 rounded-xl ${stat.color} bg-opacity-10 mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive Featured Toys Carousel */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-amber-500/20 text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-6"
            >
              <Sparkles size={16} />
              Featured Magic
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-[#D4AF37]">Signature</span> Collection
            </h2>
          </div>

          <div className="relative">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left side - Toy showcase */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeToy}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="relative"
                  >
                    <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                      <div className={`absolute inset-0 bg-gradient-to-br ${featuredToys[activeToy].color} opacity-20`} />
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${featuredToys[activeToy].image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Floating info card */}
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {featuredToys[activeToy].name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">{featuredToys[activeToy].category}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-[#D4AF37]">
                              {featuredToys[activeToy].price}
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={i < Math.floor(featuredToys[activeToy].rating) 
                                    ? "fill-amber-400 text-amber-400" 
                                    : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <button className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-amber-400 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                          Add to Magic Cart
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right side - Toy selector */}
              <div className="lg:w-1/3">
                <div className="space-y-6">
                  {featuredToys.map((toy, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ x: 10 }}
                      onClick={() => setActiveToy(index)}
                      className={`w-full p-6 rounded-2xl text-left transition-all ${
                        activeToy === index
                          ? 'bg-gradient-to-r from-[#D4AF37]/10 to-amber-500/10 border-2 border-[#D4AF37]'
                          : 'bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-xl ${toy.color} p-1`}>
                          <div className="w-full h-full rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center">
                            {index === 0 ? <Layers size={24} className="text-blue-500" /> :
                             index === 1 ? <Wind size={24} className="text-purple-500" /> :
                             <Package size={24} className="text-amber-500" />}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{toy.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{toy.category}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Star size={14} className="fill-amber-400 text-amber-400" />
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{toy.rating}</span>
                            <span className="text-sm text-gray-500">|</span>
                            <span className="text-sm font-bold text-[#D4AF37]">{toy.price}</span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values with 3D Effect */}
      <section className="py-32 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-amber-500/20 text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-6"
            >
              <Crown size={16} />
              Our Magic Formula
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Makes Us <span className="text-[#D4AF37]">WOW</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: value.delay, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -20,
                  rotateY: 10,
                  transition: { type: "spring", stiffness: 400, damping: 20 }
                }}
                className="group relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37] to-amber-400 opacity-0 group-hover:opacity-20 blur-xl rounded-3xl transition-opacity duration-300" />
                
                <div className={`relative h-full ${value.bgColor} backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-2xl`}>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center mb-6 text-3xl shadow-lg"
                  >
                    {value.icon}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#D4AF37] transition-colors">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.text}
                  </p>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: value.delay + 0.3, duration: 0.8 }}
                    className="h-1 bg-gradient-to-r from-transparent via-current to-transparent mt-6 opacity-50"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive Timeline */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="text-[#D4AF37]">Journey</span> Through Time
            </h2>
          </div>

          <div className="relative">
            {/* Animated timeline line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4AF37] via-amber-400 to-[#D4AF37] origin-top"
            />

            {[
              { 
                year: "2024", 
                event: "The Spark of Magic", 
                desc: "First WOW boutique opens with a mission to redefine 'play' for modern families.",
                icon: <Sparkles />,
                milestone: true 
              },
              { 
                year: "2025", 
                event: "The Tech Leap", 
                desc: "Launch of our exclusive Drone & RC customization lab and STEM innovation center.",
                icon: <Rocket />,
                milestone: true 
              },
              { 
                year: "2026", 
                event: "Global WOW Expansion", 
                desc: "Expanding our digital footprint to bring joy worldwide with 24/7 online experiences.",
                icon: <Globe />,
                milestone: true 
              },
              { 
                year: "2027", 
                event: "Sustainable Futures", 
                desc: "Achieved carbon-neutral operations and launched eco-friendly toy lines.",
                icon: <Target />,
                milestone: false 
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`relative flex items-center mb-20 ${
                  i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-1/2 px-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`p-8 rounded-3xl backdrop-blur-sm border ${
                      item.milestone
                        ? 'bg-gradient-to-br from-[#D4AF37]/10 to-amber-500/10 border-[#D4AF37]/30'
                        : 'bg-white/50 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${
                        item.milestone
                          ? 'bg-gradient-to-r from-[#D4AF37] to-amber-400'
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        <div className={item.milestone ? 'text-white' : 'text-gray-600'}>
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#D4AF37]">{item.year}</div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{item.event}</h4>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </motion.div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`w-12 h-12 rounded-full border-4 ${
                      item.milestone
                        ? 'bg-gradient-to-r from-[#D4AF37] to-amber-400 border-white dark:border-gray-900'
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                    } flex items-center justify-center shadow-xl`}
                  >
                    {item.milestone ? (
                      <Sparkles size={16} className="text-white" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-gray-400" />
                    )}
                  </motion.div>
                </div>

                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final CTA with Particle Effect */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="inline-block mb-12"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border-8 border-dashed border-[#D4AF37]/30 rounded-full"
              />
              <div className="w-32 h-32 bg-gradient-to-r from-[#D4AF37] to-amber-400 rounded-full flex items-center justify-center shadow-2xl">
                <Gift size={48} className="text-white" />
              </div>
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Ready for Your <span className="text-[#D4AF37]">WOW</span> Moment?
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience a new era of play. Whether you're a parent, collector, or just a kid at heart, 
            there's a place for you in the WOW Lifestyle family.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-5 bg-gradient-to-r from-[#D4AF37] to-amber-400 text-white font-bold rounded-full text-lg shadow-2xl shadow-amber-500/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-3">
                <ShoppingBag size={24} />
                Start Your Journey
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-12 py-5 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-full text-lg hover:bg-[#D4AF37] hover:text-white transition-all"
            >
              <span className="flex items-center gap-3">
                <Play size={24} />
                Virtual Tour
              </span>
            </motion.button>
          </div>
        </div>

        {/* Particle effect */}
        <ParticleEffect />
      </section>
    </div>
  );
}

// Floating Toy Component
function FloatingToy({ icon, delay }: { icon: React.ReactNode, delay: number }) {
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
      <div className="w-12 h-12 bg-gradient-to-r from-[#D4AF37] to-amber-400 rounded-2xl flex items-center justify-center shadow-xl">
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