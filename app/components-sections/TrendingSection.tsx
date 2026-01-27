'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, easeInOut, useInView } from 'framer-motion';
import { ArrowRight, Zap, Play, Pause, Volume2, VolumeX, Search, ZoomIn } from 'lucide-react';

const TRENDING_VIDEOS = [
  { id: 1, title: "F1 Racing Collection", category: "Premium", views: "2.4M", duration: "0:45", src: `https://res.cloudinary.com/duh5z2zjr/video/upload/v1769314436/f1_tn2jwq.mp4` },
  { id: 2, title: "Hot Wheels Ultimate", category: "Limited", views: "1.8M", duration: "1:10", src: `https://res.cloudinary.com/duh5z2zjr/video/upload/v1769314438/hotwheels_wdsfha.mp4` },
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

// Optimized Video Card Component
const VideoCard = memo(({ video, index, theme }: { video: typeof TRENDING_VIDEOS[0], index: number, theme: 'dark' | 'light' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const isInView = useInView(containerRef, { margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView && isPlaying) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
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

  const getCardGradient = () => theme === 'light' ? 'bg-gradient-to-br from-gray-50 to-gray-100' : 'bg-gradient-to-br from-neutral-900 to-black';
  const getBorderColor = () => theme === 'light' ? (isHovered ? 'border-[#B8860B]/50' : 'border-gray-200') : (isHovered ? 'border-[#D4AF37]/50' : 'border-white/10');

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
      className={`group relative ${getCardGradient()} rounded-2xl overflow-hidden cursor-pointer shadow-lg md:shadow-2xl border ${getBorderColor()} transition-all duration-500 will-change-transform`}
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
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <motion.div animate={{ opacity: isHovered ? 0.3 : 0.1 }} className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 via-transparent to-[#D4AF37]/10" />
      </div>
      <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between z-20">
        <div className="flex justify-between items-start">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={isHovered ? { x: 0, opacity: 1 } : {}} className="flex flex-col gap-2">
            <span className={`bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC] text-black text-xs font-bold px-3 py-1.5 rounded-full w-fit ${theme === 'light' ? 'shadow-md' : ''}`}>{video.category}</span>
          </motion.div>
          <motion.div initial={{ x: 20, opacity: 0 }} animate={isHovered ? { x: 0, opacity: 1 } : {}} className="flex gap-2">
            <button className={`p-2 md:p-2.5 backdrop-blur-md rounded-full hover:bg-[#D4AF37] transition-colors ${theme === 'light' ? 'bg-white/80' : 'bg-black/50'}`} onClick={(e) => { e.stopPropagation(); toggleMute(); }}>{isMuted ? <VolumeX size={14} className="md:size-[16px]" /> : <Volume2 size={14} className="md:size-[16px]" />}</button>
          </motion.div>
        </div>
        <div className="space-y-2 md:space-y-3">
          <motion.h3 animate={isHovered ? { y: 0 } : { y: 10 }} className={`text-base md:text-xl font-bold leading-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{video.title}</motion.h3>
          <div className={`h-1 rounded-full overflow-hidden ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'}`}>
            <motion.div animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC]" />
          </div>
        </div>
        <motion.div animate={{ scale: isPlaying ? (isHovered ? 1.1 : 0) : 1, opacity: isPlaying ? (isHovered ? 1 : 0) : 1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`p-4 md:p-6 backdrop-blur-md rounded-xl md:rounded-2xl border ${theme === 'light' ? 'bg-white/80 border-gray-300' : 'bg-black/50 border-white/20'}`}>{isPlaying ? <Pause size={24} className="md:size-[32px]" /> : <Play size={24} className="md:size-[32px]" />}</div>
        </motion.div>
      </div>
    </motion.div>
  );
});

VideoCard.displayName = 'VideoCard';

export default function TrendingSection({ theme }: TrendingSectionProps) {
  const getTextColor = () => theme === 'light' ? 'text-gray-900' : 'text-white';
  const getSecondaryTextColor = () => theme === 'light' ? 'text-gray-600' : 'text-gray-300';
  const getBorderColor = () => theme === 'light' ? 'border-gray-200' : 'border-white/10';
  const getSectionBackground = () => theme === 'light' ? 'bg-gradient-to-b from-gray-50 to-white' : 'bg-gradient-to-b from-[#0a0a0a] to-black';

  return (
    <section className={`relative py-12 md:py-24 ${getSectionBackground()} border-t ${getBorderColor()}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] md:h-[500px] bg-gradient-to-b from-[#D4AF37]/10 to-transparent blur-[60px] md:blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 mb-3 md:mb-4">
              <Zap size={14} className="md:size-[16px] text-[#D4AF37]" />
              <span className="text-xs md:text-sm font-bold text-[#D4AF37] tracking-wider">TRENDING NOW</span>
            </div>
            <h2 className={`text-2xl md:text-4xl lg:text-6xl font-black ${getTextColor()} mb-3 md:mb-4`}>
              Hot <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC]">Drops</span>
            </h2>
            <p className={`${getSecondaryTextColor()} text-sm md:text-lg max-w-xl`}>
              See what's hot in the collector's world this week.
            </p>
          </div>
          <button className={`group flex items-center gap-2 md:gap-3 ${getTextColor()} font-bold hover:text-[#D4AF37] transition-colors px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl border ${getBorderColor()} hover:border-[#D4AF37]/50 text-sm md:text-base`}>
            View All <ArrowRight size={16} className="md:size-[20px] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {TRENDING_VIDEOS.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}