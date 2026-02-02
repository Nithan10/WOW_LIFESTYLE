'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowUpRight, Bookmark, Sparkles, 
  ChevronRight, ShieldCheck, Truck, RotateCcw, 
  MapPin, Award, Star, Gift, 
  Smile, Globe2, Shield, Rocket, Headphones, Globe
} from 'lucide-react';

// --- Editorial Content Data ---
const FEATURED_ARTICLE = {
  category: "Heritage & History",
  title: "A Dream Fulfilled: From a Cornish Shop to the World's Finest",
  excerpt: "In 1760, William Hamley set out to create 'the best toy shop in the world'. Nearly three centuries later, that dream continues to spark joy in over 170 locations globally.",
  author: "WOW Lifestyle Publishing",
  date: "Feb 02, 2026",
  readTime: "15 min read",
  image: "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=2000&q=80",
  stats: {
    years: "265+",
    stores: "170+",
    countries: "40+",
    smiles: "5M+"
  }
};

const ARTICLES = [
  {
    id: 1,
    category: "Global Magic",
    title: "Spreading the Joy: How 170 Global Shops Unite Children",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1600&q=80",
    date: "Jan 28, 2026",
    excerpt: "From London to Prague to Mumbai, witness the magical experience of live toy demos and character interactions that define WOW Lifestyle.",
    icon: <Globe2 className="w-5 h-5" />
  },
  {
    id: 2,
    category: "The Experience",
    title: "A Delightful Experience: Why Interactive Play is Our Core",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad55?auto=format&fit=crop&w=1600&q=80",
    date: "Jan 25, 2026",
    excerpt: "Adults get the rare chance to be children again, interacting with favorite characters and watching toys come to life in our live exhibit zones.",
    icon: <Smile className="w-5 h-5" />
  },
  {
    id: 3,
    category: "Safety First",
    title: "The Quality Promise: Certified Materials & Ethical Sourcing",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1600&q=80",
    date: "Jan 20, 2026",
    excerpt: "We don't play around when it comes to quality. Discover our rigorous certification process for every handpicked toy in our collection.",
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 4,
    category: "Toy Innovation",
    title: "The Future of Play: How Technology Meets Tradition",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1600&q=80",
    date: "Jan 15, 2026",
    excerpt: "Exploring how augmented reality and sustainable materials are shaping the next generation of classic toys.",
    icon: <Rocket className="w-5 h-5" />
  }
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Mother & Educator",
    content: "The heritage collection brought back childhood memories while creating new ones for my kids. Truly magical!",
    rating: 5,
    location: "Mumbai"
  },
  {
    name: "Arjun Mehta",
    role: "Toy Collector",
    content: "The authenticity and quality of their limited edition collectibles is unmatched in India. A curator's dream.",
    rating: 5,
    location: "Delhi"
  },
  {
    name: "Sofia Chen",
    role: "Child Psychologist",
    content: "WOW's interactive play zones demonstrate how thoughtfully designed toys support cognitive development.",
    rating: 5,
    location: "Bangalore"
  }
];

const HERITAGE_TIMELINE = [
  { year: "1760", event: "William Hamley opens 'Noah's Ark' in Cornwall", highlight: true },
  { year: "1881", event: "First London store opens on Regent Street" },
  { year: "1955", event: "Royal Warrant granted by Queen Elizabeth II" },
  { year: "2000", event: "Expansion into Asian markets begins" },
  { year: "2023", event: "WOW Lifestyle launches in India with 12 stores" },
  { year: "2026", event: "170+ stores across 40 countries", highlight: true }
];

export default function ToyBlogLifestyle() {
  const [activeTopic, setActiveTopic] = useState("History");
  const [bookmarked, setBookmarked] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  // Fixed SVG pattern with proper URL encoding
  const svgPattern = "url(\"data:image/svg+xml,%3Csvg%20width='60'%20height='60'%20viewBox='0%200%2060%2060'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cg%20fill='none'%20fill-rule='evenodd'%3E%3Cg%20fill='%23D4AF37'%20fill-opacity='0.05'%3E%3Cpath%20d='M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] to-white dark:from-[#0A0A0A] dark:to-[#1A1A1A] text-gray-900 dark:text-gray-100 selection:bg-[#D4AF37]/30" ref={containerRef}>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Editorial Progress Tracker */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#D4AF37] via-yellow-500 to-amber-300 z-50 shadow-[0_0_20px_#D4AF37]"
        style={{ width: progressWidth }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* 1. Magazine Branding Header */}
      <motion.header 
        style={{ opacity: headerOpacity }}
        className="sticky top-0 z-40 w-full bg-gradient-to-b from-white/95 to-white/80 dark:from-black/95 dark:to-black/80 backdrop-blur-xl border-b border-gray-100/50 dark:border-white/5 px-6 py-5 shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] text-[#D4AF37] uppercase mb-1">Established 1760</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none">
              <span className="bg-gradient-to-r from-[#D4AF37] via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                WOW Lifestyle
              </span>
            </h1>
          </motion.div>
          
          <nav className="hidden md:flex gap-8 items-center">
            {["History", "Global Shops", "Interactive Play", "Safety", "Collections", "Events"].map(topic => (
              <motion.button 
                key={topic}
                onClick={() => setActiveTopic(topic)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-3 py-2 text-[11px] font-bold uppercase tracking-widest transition-all ${
                  activeTopic === topic 
                    ? 'text-[#D4AF37]' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {topic}
                {activeTopic === topic && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#D4AF37] to-yellow-400"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <button className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-[#D4AF37] to-amber-500 text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all duration-300">
              <MapPin size={14} />
              Store Locator
            </button>
            <button 
              onClick={() => setBookmarked(!bookmarked)}
              className="p-2.5 rounded-full border border-gray-200 dark:border-white/10 hover:border-[#D4AF37] transition-colors"
            >
              <Bookmark size={18} className={bookmarked ? "fill-[#D4AF37] text-[#D4AF37]" : ""} />
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* 2. Hero Section: The History Narrative */}
      <section className="relative w-full pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-12 gap-16 items-start"
          >
            {/* Left Column - Content */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 mb-10"
              >
                <span className="px-5 py-2 bg-gradient-to-r from-black to-gray-800 dark:from-[#D4AF37] dark:to-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full inline-flex items-center gap-2">
                  <Sparkles size={12} />
                  The Heritage Story
                </span>
                <div className="h-px w-16 bg-gradient-to-r from-gray-300 to-transparent" />
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">A Dream Realized</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter mb-10"
              >
                <span className="bg-gradient-to-b from-gray-900 via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                  {FEATURED_ARTICLE.title.split(':')[0]}
                </span>
                <br />
                <span className="text-[#D4AF37] italic">{FEATURED_ARTICLE.title.split(':')[1]}</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl font-light italic pl-6 border-l-4 border-[#D4AF37]/30"
              >
                {FEATURED_ARTICLE.excerpt}
              </motion.p>

              {/* Stats Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
              >
                {Object.entries(FEATURED_ARTICLE.stats).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-white/50 dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-white/5">
                    <div className="text-3xl font-black text-[#D4AF37] mb-2">{value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] hover:text-[#D4AF37] transition-colors"
              >
                <span className="relative">
                  Explore Heritage Timeline
                  <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-[#D4AF37] transition-all duration-300" />
                </span>
                <div className="w-14 h-14 rounded-full border-2 border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-amber-500 group-hover:border-transparent transition-all duration-500 group-hover:rotate-90">
                  <ChevronRight size={20} className="group-hover:text-white" />
                </div>
              </motion.button>
            </div>

            {/* Right Column - Image */}
            <div className="lg:col-span-5">
              <motion.div 
                style={{ scale: heroScale }}
                className="relative aspect-[3/4] overflow-hidden rounded-[3rem] shadow-2xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent z-10" />
                <img 
                  src={FEATURED_ARTICLE.image} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  alt="Vintage Toy Shop"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20">
                  <div className="text-white">
                    <div className="text-6xl font-black italic mb-2">1760</div>
                    <div className="text-sm font-light opacity-90">The year magic began</div>
                  </div>
                </div>
                {/* Floating Elements */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <Sparkles size={20} className="text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Heritage Timeline */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-[#0F0F0F] dark:to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <span className="text-[#D4AF37] text-xs font-black uppercase tracking-widest">Timeline</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            </motion.div>
            <h3 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
                265 Years of 
              </span>
              <span className="text-[#D4AF37] block italic">Joy & Innovation</span>
            </h3>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#D4AF37] via-amber-400 to-transparent" />
            
            {/* Timeline Items */}
            <div className="space-y-24">
              {HERITAGE_TIMELINE.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                    <div className={`inline-block p-6 rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 shadow-lg hover:shadow-xl transition-shadow ${
                      item.highlight ? 'border-l-4 border-l-[#D4AF37]' : ''
                    }`}>
                      <div className="text-3xl font-black text-[#D4AF37] mb-2">{item.year}</div>
                      <p className="text-gray-700 dark:text-gray-300">{item.event}</p>
                    </div>
                  </div>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-400 border-4 border-white dark:border-[#0F0F0F] shadow-lg" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Promise Section - FIXED SVG */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Pattern - Fixed with proper encoding */}
        <div 
          className="absolute inset-0"
          style={{ backgroundImage: svgPattern }}
        />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="w-20 h-20 bg-gradient-to-r from-[#D4AF37] to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg"
            >
              <Award size={32} className="text-white" />
            </motion.div>
            <h3 className="text-5xl font-black uppercase mb-4">
              Our <span className="text-[#D4AF37] italic">Gold Standard</span> Promise
            </h3>
            <p className="text-gray-500 uppercase tracking-widest text-sm font-bold max-w-2xl mx-auto">
              Where centuries of heritage meet modern excellence in every detail
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <RotateCcw />, 
                title: "Hassle-Free Returns", 
                desc: "30-day return policy on all unopened items. Your satisfaction is our priority.",
                color: "from-emerald-500 to-teal-400"
              },
              { 
                icon: <ShieldCheck />, 
                title: "Certified Safety", 
                desc: "All toys meet or exceed international safety standards. Regular third-party testing.",
                color: "from-blue-500 to-cyan-400"
              },
              { 
                icon: <Truck />, 
                title: "Free Express Delivery", 
                desc: "Free shipping above ₹999. Same-day delivery available in metro cities.",
                color: "from-purple-500 to-pink-400"
              },
              { 
                icon: <Headphones />, 
                title: "Dedicated Support", 
                desc: "24/7 customer care with toy experts. We're here to help you choose the perfect gift.",
                color: "from-orange-500 to-red-400"
              }
            ].map((promise, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-3xl" style={{
                  background: `linear-gradient(135deg, ${promise.color.split(' ')[1]}, ${promise.color.split(' ')[3]})`
                }} />
                <div className="relative bg-white dark:bg-[#111] p-8 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm group-hover:shadow-xl transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${promise.color} flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform`}>
                    {promise.icon}
                  </div>
                  <h4 className="text-xl font-black mb-4 group-hover:text-[#D4AF37] transition-colors">{promise.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{promise.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Global Feed */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-[#0A0A0A] dark:to-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <Globe className="text-[#D4AF37]" size={24} />
                <span className="text-[#D4AF37] text-xs font-black uppercase tracking-widest">Global Chronicles</span>
              </div>
              <h3 className="text-5xl font-black uppercase italic tracking-tighter mb-4">
                Worldwide <span className="text-[#D4AF37]">Toy Revolution</span>
              </h3>
              <p className="text-gray-500 text-sm max-w-2xl">
                From London's Regent Street to Mumbai's flagship store - discover how we're redefining play across continents
              </p>
            </div>
            <button className="mt-6 md:mt-0 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border-2 border-gray-200 dark:border-white/10 px-6 py-3 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all group">
              View All Stories
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ARTICLES.map((article) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={article.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                      {article.icon}
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-xs text-gray-400 mb-3 font-medium">{article.date}</div>
                  <h4 className="text-xl font-black mb-4 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <button className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 text-[#D4AF37] group/link">
                    Read Feature
                    <ArrowUpRight size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-amber-500/5" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-4 mb-6">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]" />
              ))}
            </div>
            <h3 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Voices of 
              </span>
              <span className="text-[#D4AF37] block italic">Joy & Trust</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-400 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role} • {testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">
                    Verified Purchase
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="w-24 h-24 bg-gradient-to-r from-[#D4AF37] to-amber-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Gift size={32} className="text-white" />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              Experience the Magic 
            </span>
            <span className="text-[#D4AF37] block italic">of Centuries</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Visit our stores to witness history come alive through interactive exhibits, 
            limited edition collections, and the world's finest toy curation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-white font-black uppercase tracking-widest rounded-full text-sm hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300"
            >
              Find Your Nearest Store
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border-2 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-black uppercase tracking-widest rounded-full text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            >
              Explore Collections
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}