'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Star, Quote, MessageCircle, Heart, Play, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Award, Users, Zap, Calendar, Gift, TrendingUp, Camera } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Parent of two",
    text: "The 'Gold-Foil' wrapping was so beautiful my daughter didn't even want to open the box! WOW Lifestyle truly understands the magic of gifting.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=sarah",
    category: "Gifting",
    tags: ["Premium Packaging", "Unboxing Experience"],
    date: "2 weeks ago",
    verified: true
  },
  {
    id: 2,
    name: "David Chen",
    role: "Tech Enthusiast",
    text: "Their drone repair lab saved my custom FPV drone. Fast, professional, and they even calibrated it for me. 10/10 service.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=david",
    category: "Repairs",
    tags: ["Quick Service", "Expert Technicians"],
    date: "1 month ago",
    verified: true
  },
  {
    id: 3,
    name: "The Miller Family",
    role: "Collectors",
    text: "We've been collecting vintage RC cars for years. The restoration team at WOW is the only group we trust with our heirlooms.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=miller",
    category: "Restoration",
    tags: ["Vintage Care", "Trusted Service"],
    date: "3 months ago",
    verified: true
  },
  {
    id: 4,
    name: "Amanda Ross",
    role: "Event Planner",
    text: "We hired WOW for a corporate family day. The LEGO workshop was the highlight of the entire event. Pure joy!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=amanda",
    category: "Events",
    tags: ["Corporate Events", "Workshops"],
    date: "2 weeks ago",
    verified: true
  },
  {
    id: 5,
    name: "Marcus Thorne",
    role: "Professional Hobbyist",
    text: "The selection of STEM toys is unmatched. My son isn't just playing; he's learning engineering principles through play.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=marcus",
    category: "Education",
    tags: ["STEM Learning", "Educational Toys"],
    date: "1 week ago",
    verified: true
  },
  {
    id: 6,
    name: "Elena Rodriguez",
    role: "Grandmother",
    text: "The Personal Shopper service was a godsend. They helped me find the perfect age-appropriate gift for my grandson's 5th birthday.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=elena",
    category: "Personal Shopping",
    tags: ["Personalized Service", "Age-Appropriate"],
    date: "2 days ago",
    verified: true
  },
  {
    id: 7,
    name: "James Wilson",
    role: "Toy Collector",
    text: "The limited edition toy drops are incredible. Finally a company that understands collector culture!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=james",
    category: "Collectibles",
    tags: ["Limited Editions", "Exclusive Drops"],
    date: "1 week ago",
    verified: true
  },
  {
    id: 8,
    name: "Sophie Kim",
    role: "Elementary Teacher",
    text: "Our classroom transformation with WOW's educational toys has improved engagement by 300%. Students can't wait for playtime!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=sophie",
    category: "Education",
    tags: ["Classroom Tools", "Engagement"],
    date: "3 weeks ago",
    verified: true
  }
];

const stats = [
  { value: "2,500+", label: "Happy Families", icon: Users, color: "from-blue-500 to-cyan-500" },
  { value: "98%", label: "Satisfaction Rate", icon: Heart, color: "from-pink-500 to-rose-500" },
  { value: "4.9/5", label: "Average Rating", icon: Star, color: "from-amber-500 to-yellow-500" },
  { value: "24h", label: "Avg. Response Time", icon: Zap, color: "from-purple-500 to-pink-500" },
];

const categories = ["All", "Gifting", "Repairs", "Restoration", "Events", "Education", "Personal Shopping", "Collectibles"];

export default function TestimonialsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const scrollContainerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredReviews = activeCategory === "All" 
    ? reviews 
    : reviews.filter(review => review.category === activeCategory);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-[#FCFBFA] via-amber-50/30 to-cyan-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900" />;
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#FCFBFA] via-amber-50/30 to-cyan-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-200/20 to-yellow-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl" />
      </div>

      {/* Floating cursor effect */}
      <motion.div
        className="fixed w-96 h-96 pointer-events-none rounded-full blur-3xl bg-gradient-to-r from-[#D4AF37]/5 to-amber-500/5 z-0"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Header Section - Updated to match image */}
      <header className="max-w-7xl mx-auto text-center mb-16 relative z-10 pt-12">
        {/* Top badge - VERIFIED JOY • 500+ STORIES */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 text-[#D4AF37] text-sm font-bold tracking-[0.2em] uppercase mb-12 border border-amber-200 dark:border-amber-800/30 shadow-lg"
        >
          <Sparkles size={16} className="fill-current" />
          VERIFIED JOY • 500+ STORIES
          <Award size={16} className="ml-2" />
        </motion.div>
        
        {/* Main WOW Experience text - Stacked layout */}
        <div className="relative mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            {/* WOW centered and large */}
            <h1 className="text-[5.5rem] md:text-[10rem] lg:text-[12rem] font-black text-gray-900 dark:text-white tracking-[-0.02em] leading-[0.9]">
              <span className="relative">
                <span className="bg-gradient-to-r from-[#D4AF37] via-amber-300 to-yellow-300 bg-clip-text text-transparent relative z-10">
                  WOW
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 border-2 border-[#D4AF37]/20 rounded-full"
                />
              </span>
            </h1>
            
            {/* Experience text centered below */}
            <div className="relative mt-4">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight"
              >
                Experience
              </motion.h2>
              
              {/* Decorative line under Experience */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-[#D4AF37] to-amber-300 mx-auto mt-6 rounded-full"
              />
            </div>
          </motion.div>
          
          {/* Floating decorative elements */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-300 opacity-30 blur-sm"
          />
          
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-30 blur-sm"
          />
        </div>
        
        {/* Subtitle with better spacing */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mt-16"
        >
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
            Where every toy tells a story. Join thousands of families who've discovered 
            <span className="text-[#D4AF37] font-semibold"> the magic of play</span> through our curated experiences.
          </p>
          
          {/* Decorative dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {[1, 2, 3].map((dot) => (
              <motion.div
                key={dot}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: dot * 0.2 
                }}
                className={`w-2 h-2 rounded-full ${
                  dot === 2 ? 'bg-[#D4AF37]' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </header>

      {/* Stats Bar */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-6xl mx-auto mb-20 relative z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-800/50 shadow-xl"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
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
      </motion.section>

      {/* Video Showcase */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-24 relative z-10"
      >
        <div className="relative group rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(212,175,55,0.3)] bg-gradient-to-br from-gray-900 to-black">
          {/* Video overlay with particles */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=2070')] bg-cover bg-center opacity-50" />
          
          {/* Floating particles */}
          <div className="absolute inset-0 z-5">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#D4AF37] rounded-full"
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.sin(i) * 50, 0],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                style={{
                  left: `${10 + (i * 4)}%`,
                  top: `${30 + (i * 2)}%`,
                }}
              />
            ))}
          </div>

          <div className="relative z-20 p-12 md:p-20 h-[600px] flex flex-col items-center justify-center">
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
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10px] border-2 border-dashed border-[#D4AF37]/30 rounded-full"
              />
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mt-8"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Behind the <span className="text-[#D4AF37]">Magic</span>
              </h3>
              <p className="text-gray-300 text-lg max-w-xl">
                Take a peek into our workshop where dreams become reality
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-12 relative z-10"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold text-sm tracking-wider transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#D4AF37] to-amber-400 text-white shadow-lg shadow-amber-500/30'
                  : 'bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              } backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50`}
            >
              {category}
              {activeCategory === category && (
                <Sparkles className="inline ml-2 w-4 h-4" />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Interactive Testimonial Grid */}
      <section className="max-w-7xl mx-auto mb-24 relative z-10">
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-gray-900 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform border border-gray-200 dark:border-gray-800"
          >
            <ChevronLeft className="text-gray-700 dark:text-gray-300" />
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-gray-900 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform border border-gray-200 dark:border-gray-800"
          >
            <ChevronRight className="text-gray-700 dark:text-gray-300" />
          </button>

          {/* Scrollable Grid */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence>
              {filteredReviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  onMouseEnter={() => setHoveredCard(review.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative flex-shrink-0 w-[400px] bg-gradient-to-br from-white/90 to-amber-50/30 dark:from-gray-900/90 dark:to-gray-800/30 backdrop-blur-sm rounded-[2.5rem] p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-2xl"
                  style={{
                    transform: hoveredCard === review.id ? 'perspective(1000px) rotateX(2deg) rotateY(2deg)' : 'none',
                    boxShadow: hoveredCard === review.id 
                      ? '0 40px 60px rgba(212, 175, 55, 0.15), 0 0 0 1px rgba(212, 175, 55, 0.1)' 
                      : '0 20px 40px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-[#D4AF37]/10 to-amber-500/10 opacity-0 transition-opacity duration-300 ${
                    hoveredCard === review.id ? 'opacity-100' : ''
                  }`} />
                  
                  <Quote className="absolute top-8 right-8 text-amber-100 dark:text-gray-800/50" size={60} />
                  
                  {/* Profile with verification */}
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="relative">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-200 dark:border-amber-800">
                        <img 
                          src={review.image} 
                          alt={review.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      {review.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#D4AF37] to-amber-400 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                          <CheckCircle2 size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">{review.name}</h4>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-sm text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider mt-1">
                        {review.role}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-xs font-semibold">
                          {review.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {review.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stars with animation */}
                  <div className="flex gap-1 mb-6 relative z-10">
                    {[...Array(review.rating)].map((_, starI) => (
                      <motion.div
                        key={starI}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: starI * 0.1 }}
                      >
                        <Star size={18} className="fill-[#D4AF37] text-[#D4AF37]" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Review text with gradient */}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg italic mb-8 relative z-10">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Interactive actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-800/50 relative z-10">
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#D4AF37] transition-colors group">
                      <Heart size={18} className="group-hover:fill-[#D4AF37] group-hover:scale-110 transition-all" />
                      <span className="text-sm font-medium">Helpful</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#D4AF37] transition-colors group">
                      <MessageCircle size={18} className="group-hover:scale-110 transition-all" />
                      <span className="text-sm font-medium">Reply</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#D4AF37] transition-colors group">
                      <Camera size={18} className="group-hover:scale-110 transition-all" />
                      <span className="text-sm font-medium">Share Photo</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Featured Story Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-24 relative z-10"
      >
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-amber-500/20 text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-6 w-fit">
                <TrendingUp size={16} />
                Featured Success Story
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                From <span className="text-[#D4AF37]">Broken</span> to 
                <span className="text-amber-300"> Beautiful</span>
              </h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Watch how we restored a 1970s vintage train set for the Thompson family, 
                turning a childhood memory into a new legacy.
              </p>
              <div className="flex items-center gap-6">
                <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-amber-400 text-white rounded-full font-bold hover:shadow-xl hover:shadow-amber-500/30 transition-all transform hover:scale-105 active:scale-95">
                  Watch Restoration
                </button>
                <button className="px-8 py-4 border-2 border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all">
                  Read Full Story
                </button>
              </div>
            </div>
            <div className="relative min-h-[400px] bg-gradient-to-br from-amber-500/10 to-rose-500/10">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587654780298-8c6d6b2c8b2a?auto=format&fit=crop&w=1200')] bg-cover bg-center opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-24 h-24 bg-gradient-to-r from-[#D4AF37] to-amber-400 rounded-full flex items-center justify-center shadow-2xl">
                  <Play size={40} className="text-white pl-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.footer 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 max-w-5xl mx-auto relative z-10"
      >
        <div className="relative">
          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-8 left-8 w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-amber-400 rounded-full flex items-center justify-center shadow-xl"
          >
            <Gift size={24} className="text-white" />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="absolute -bottom-8 right-12 w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl"
          >
            <Calendar size={28} className="text-white" />
          </motion.div>

          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-[3rem] p-12 md:p-20 text-center overflow-hidden border border-gray-800">
            {/* Animated gradient border */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: 'linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)',
                backgroundSize: '200% 200%',
              }}
              className="absolute inset-0 rounded-[3rem] opacity-20 blur-xl"
            />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                Your <span className="bg-gradient-to-r from-[#D4AF37] via-amber-300 to-yellow-300 bg-clip-text text-transparent">
                  Story
                </span> Awaits
              </h2>
              
              <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of families who've discovered the magic of play. 
                Share your experience and become part of our growing community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-5 bg-gradient-to-r from-[#D4AF37] to-amber-400 text-white rounded-full font-bold text-lg shadow-2xl shadow-amber-500/30 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-3">
                    <MessageCircle size={22} />
                    Share Your Experience
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-12 py-5 border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 backdrop-blur-sm transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Camera size={22} />
                    View Community Gallery
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </motion.button>
              </div>
              
              <p className="text-gray-400 mt-8 text-sm">
                Tag <span className="text-[#D4AF37] font-bold">@WOW_Lifestyle</span> to be featured
              </p>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Floating action button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-amber-400 rounded-full shadow-2xl shadow-amber-500/30 flex items-center justify-center z-50"
      >
        <MessageCircle size={24} className="text-white" />
      </motion.button>
    </div>
  );
}