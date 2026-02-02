'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Play, Pause, Volume2, VolumeX, ChevronRight } from 'lucide-react';

const TRENDING_VIDEOS = [
  { id: 1, title: "F1 Racing Collection", category: "Premium", views: "2.4M", duration: "0:45", src: `https://res.cloudinary.com/duh5z2zjr/video/upload/v1769314436/f1_tn2jwq.mp4` },
  { id: 2, title: "Kei Swap", category: "Limited", views: "1.8M", duration: "1:10", src: `https://res.cloudinary.com/duh5z2zjr/video/upload/v1769314438/hotwheels_wdsfha.mp4` },
  { id: 3, title: "JRC Heavy Duty", category: "Exclusive", views: "3.2M", duration: "0:38", src: `https://res.cloudinary.com/duh5z2zjr/video/upload/v1769314438/jcb_qbokn9.mp4` },
  { id: 4, title: "RC Speedsters", category: "Elite", views: "4.1M", duration: "1:25", src: `https://res.cloudinary.com/duh5z2zjr/video/upload/v1769314440/rc_zxsclo.mp4` },
  { id: 5, title: "Micro Racers", category: "Collector's", views: "1.2M", duration: "0:52", src: `https://res.cloudinary.com/duh5z2zjr/video/upload/v1769314439/minirc_ssoyay.mp4` },
  { id: 6, title: "Aero Drones", category: "Tech", views: "5.3M", duration: "1:30", src: `https://res.cloudinary.com/duh5z2zjr/video/upload/v1769314437/drone_fogxvc.mp4` },
  { id: 7, title: "Moto RC Pro", category: "Sport", views: "2.9M", duration: "1:05", src: `https://res.cloudinary.com/duh5z2zjr/video/upload/v1769314442/rcbike_qf4k6a.mp4` },
  { id: 8, title: "BMW Series", category: "Luxury", views: "3.7M", duration: "1:18", src: `https://res.cloudinary.com/duh5z2zjr/video/upload/v1769314434/bmw_dv8u5j.mp4` },
];

interface TrendingSectionProps {
  theme: 'dark' | 'light';
}

const VideoCard = memo(({ video, index, theme }: { video: typeof TRENDING_VIDEOS[0], index: number, theme: 'dark' | 'light' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const isInView = useInView(containerRef, { margin: "0px 0px -100px 0px" });
  const isDark = theme === 'dark';

  useEffect(() => {
    if (videoRef.current) {
      if (isInView && isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isInView) {
      interval = setInterval(() => {
        if (videoRef.current) {
          const current = videoRef.current.currentTime;
          const duration = videoRef.current.duration || 1;
          setProgress((current / duration) * 100);
        }
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isInView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={togglePlay}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg md:shadow-2xl border transition-all duration-500 will-change-transform
        ${isDark ? 'bg-neutral-900 border-white/10' : 'bg-white border-gray-200'}
        ${isHovered ? (isDark ? 'border-[#D4AF37]/50 scale-[1.02]' : 'border-[#B8860B]/50 scale-[1.02]') : ''}
      `}
    >
      <div className="relative w-full aspect-[9/16] overflow-hidden">
        <video 
          ref={videoRef} 
          muted={isMuted} 
          loop 
          playsInline 
          preload="none"
          crossOrigin="anonymous"
          src={video.src} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform" 
        />
        
        {/* Adaptive Overlays for Text Legibility */}
        <div className={`absolute inset-0 transition-opacity duration-500 
          ${isDark 
            ? 'bg-gradient-to-t from-black via-black/40 to-transparent opacity-80' 
            : 'bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-40'}
        `} />
      </div>

      <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between z-20">
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2"
          >
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC] text-black text-[10px] md:text-xs font-black px-3 py-1 rounded-full w-fit shadow-lg uppercase tracking-wider">
              {video.category}
            </span>
          </motion.div>
          
          <button 
            className={`p-2 rounded-full backdrop-blur-md transition-all hover:scale-110
              ${isDark ? 'bg-black/50 text-white border-white/10' : 'bg-white/80 text-gray-900 border-gray-200 shadow-sm'}
              border
            `} 
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>

        <div className="space-y-2">
          <h3 className={`text-sm md:text-lg font-black leading-tight drop-shadow-md transition-colors
            ${isDark ? 'text-white' : 'text-white md:text-gray-900 group-hover:text-[#B8860B]'}
          `}>
            {video.title}
          </h3>
          
          <div className={`h-1 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
            <motion.div 
              animate={{ width: `${progress}%` }} 
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC]" 
            />
          </div>
        </div>

        <motion.div 
          animate={{ 
            scale: isPlaying ? (isHovered ? 1 : 0) : 1, 
            opacity: isPlaying ? (isHovered ? 1 : 0) : 1 
          }} 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className={`p-4 backdrop-blur-md rounded-full border transition-transform
            ${isDark ? 'bg-black/40 border-white/20 text-white' : 'bg-white/60 border-gray-300 text-gray-900'}
          `}>
            {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

VideoCard.displayName = 'VideoCard';

export default function TrendingSection({ theme }: TrendingSectionProps) {
  const isDark = theme === 'dark';

  return (
    <section className={`relative py-16 md:py-24 transition-colors duration-500 border-t
      ${isDark ? 'bg-black border-white/10' : 'bg-gray-50 border-gray-200'}
    `}>
      {/* Decorative radial gradient */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] blur-[100px] pointer-events-none opacity-30
        ${isDark ? 'bg-[#D4AF37]/20' : 'bg-[#D4AF37]/10'}
      `} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
          <div className="space-y-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border transition-colors
              ${isDark ? 'bg-white/5 border-white/10 text-[#D4AF37]' : 'bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#B8860B]'}
            `}>
              <Zap size={14} fill="currentColor" />
              <span className="text-xs font-black tracking-[0.2em] uppercase">Trending Now</span>
            </div>
            
            <h2 className={`text-4xl md:text-6xl font-black tracking-tighter transition-colors
              ${isDark ? 'text-white' : 'text-gray-900'}
            `}>
              Hot <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC]">Drops</span>
            </h2>
            
            <p className={`text-sm md:text-lg max-w-lg font-medium transition-colors
              ${isDark ? 'text-gray-400' : 'text-gray-600'}
            `}>
              Discover the most coveted R/C and scale models dominating the community this week.
            </p>
          </div>

          <button className={`group flex items-center gap-3 font-black text-sm px-6 py-3 rounded-full border transition-all
            ${isDark 
              ? 'text-white border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5' 
              : 'text-gray-900 border-gray-300 hover:border-[#B8860B] hover:bg-gray-100'}
          `}>
            EXPLORE ALL <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {TRENDING_VIDEOS.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}