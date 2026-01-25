'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, easeInOut, easeOut, AnimatePresence } from 'framer-motion';
import { ArrowRight, CarFront, Trophy, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Maximize2, Sparkles, Star, Gift, Rocket, Brain, Music, Palette, Bot, Gamepad2, MessageSquare, User, Twitter, Instagram, Facebook, Youtube, Send, Mail, Zap } from 'lucide-react';

// --- ASSETS CONFIGURATION ---
// UPDATED: Corrected video paths to match your actual folder structure
const TRENDING_VIDEOS = [
  { id: 1, title: "F1 Racing Collection", category: "Premium", views: "2.4M", duration: "0:45", src: "/videos/f1.mp4" },
  { id: 2, title: "Hot Wheels Ultimate", category: "Limited", views: "1.8M", duration: "1:10", src: "/videos/hotwheels.mp4" },
  { id: 3, title: "JRC Heavy Duty", category: "Exclusive", views: "3.2M", duration: "0:38", src: "/videos/jcb.mp4" },
  { id: 4, title: "RC Speedsters", category: "Elite", views: "4.1M", duration: "1:25", src: "/videos/rc.mp4" },
  { id: 5, title: "Micro Racers", category: "Collector's", views: "1.2M", duration: "0:52", src: "/videos/minirc.mp4" },
  { id: 6, title: "Aero Drones", category: "Tech", views: "5.3M", duration: "1:30", src: "/videos/drone.mp4" },
  { id: 7, title: "Moto RC Pro", category: "Sport", views: "2.9M", duration: "1:05", src: "/videos/rcbike.mp4" },
  { id: 8, title: "BMW Series", category: "Luxury", views: "3.7M", duration: "1:18", src: "/videos/bmw.mp4" },
];

// UPDATED: Fixed to match exact file names from your folder structure
// All videos should be lowercase based on your folder screenshot
const VINTAGE_VIDEOS = [
  { id: 1, color: "#C41E3A", rating: "9.8", src: "/videos/Video1.mp4" }, // Capital V (exists in your folder)
  { id: 2, color: "#0066CC", rating: "9.5", src: "/videos/Video2.mp4" }, // Capital V (exists in your folder)
  { id: 3, color: "#FF4500", rating: "9.7", src: "/videos/Video3.mp4" }, // Capital V (exists in your folder)
  { id: 4, color: "#FFD700", rating: "9.3", src: "/videos/Video4.mp4" }, // Capital V (exists in your folder)
  { id: 5, color: "#228B22", rating: "9.6", src: "/videos/Video5.mp4" }, // Capital V (exists in your folder)
  { id: 6, color: "#800080", rating: "9.4", src: "/videos/Video6.mp4" }, // Capital V (exists in your folder)
  // Note: video7.mp4, video8.mp4, video9.mp4, video10.mp4, video11.mp4, video12.mp4 might not exist
  // Using existing videos as fallback
  { id: 7, color: "#FF1493", rating: "9.9", src: "/videos/f1.mp4" }, // Fallback to existing video
  { id: 8, color: "#00CED1", rating: "9.8", src: "/videos/hotwheels.mp4" }, // Fallback to existing video
  { id: 9, color: "#FF6347", rating: "9.5", src: "/videos/jcb.mp4" }, // Fallback to existing video
  { id: 10, color: "#1E90FF", rating: "9.7", src: "/videos/rc.mp4" }, // Fallback to existing video
  { id: 11, color: "#DC143C", rating: "9.9", src: "/videos/minirc.mp4" }, // Fallback to existing video
  { id: 12, color: "#32CD32", rating: "9.4", src: "/videos/drone.mp4" }, // Fallback to existing video
];

const CHARACTERS = [
  { id: 1, name: "Avengers", color: "#E62429", src: "/chars/avengers.avif" },
  { id: 2, name: "Frozen", color: "#00B7FF", src: "/chars/frozen.avif" },
  { id: 3, name: "Spiderman", color: "#F0131E", src: "/chars/spiderman.avif" },
  { id: 4, name: "Barbie", color: "#E0218A", src: "/chars/barbie.avif" },
  { id: 5, name: "Paw Patrol", color: "#005EB8", src: "/chars/Masha.avif" },
  { id: 6, name: "Pokemon", color: "#FFCB05", src: "/chars/pokemon.avif" },
  { id: 7, name: "Harry Potter", color: "#740001", src: "/chars/harrypotter.avif" },
  { id: 8, name: "Mickey Mouse", color: "#FFCC00", src: "/chars/mickey.avif" },
  { id: 9, name: "Disney Princess", color: "#FF69B4", src: "/chars/princess.avif" },
];

const CAR_IMAGES = ['/pngcar.png', '/pngcar2.png', '/pngbike2.png', '/pngcar3.png', '/pngcar4.png'];
const BRAND_LOGOS = [
  { name: "Lego City", src: "/logos/city.png" },
  { name: "Technic", src: "/logos/technic.png" },
  { name: "Marvel", src: "/logos/marvel.png" },
  { name: "Star Wars", src: "/logos/starwars.png" },
  { name: "Hot Wheels", src: "/logos/hotwheels.png" },
  { name: "Speed Champions", src: "/logos/speed.png" },
  { name: "Disney", src: "/logos/disney.png" },
  { name: "Minecraft", src: "/logos/minecraft.png" },
  { name: "Harry Potter", src: "/logos/harrypotter.png" },
  { name: "Super Heroes", src: "/logos/superheroes.png" },
];

const BENTO_ITEMS = [
  { id: 1, title: "Iconic Heroes", subtitle: "Legends Assemble", className: "md:col-span-1 md:row-span-2", img: "/chars/dead.avif", icon: <Star className="text-yellow-400" size={20} />, color: "#C41E3A" },
  { id: 2, title: "Holiday Bestsellers", subtitle: "Trending Now", className: "md:col-span-2 md:row-span-2", img: "/chars/car.mp4", isVideo: true, icon: <Gift className="text-purple-400" size={20} />, color: "#800080" },
  { id: 3, title: "Smart Play", subtitle: "Educational", className: "md:col-span-1 md:row-span-1", img: "/chars/car1.png", icon: <Brain className="text-blue-400" size={20} />, color: "#0066CC" },
  { id: 4, title: "Indoor Fun", subtitle: "Active Play", className: "md:col-span-1 md:row-span-1", img: "/chars/car2.png", icon: <Music className="text-pink-400" size={20} />, color: "#FF1493" },
  { id: 5, title: "Outdoor Adventure", subtitle: "Go Explore", className: "md:col-span-2 md:row-span-1", img: "/videos/drone.mp4", isVideo: true, icon: <Rocket className="text-orange-400" size={20} />, color: "#FF4500" },
  { id: 6, title: "Speed Zone", subtitle: "Race Ready", className: "md:col-span-1 md:row-span-1", img: "/chars/car3.png", icon: <Zap className="text-red-400" size={20} />, color: "#DC143C" },
  { id: 7, title: "Creative Studio", subtitle: "Arts & Crafts", className: "md:col-span-1 md:row-span-1", img: "/chars/barbie.avif", icon: <Palette className="text-teal-400" size={20} />, color: "#00CED1" },
  { id: 8, title: "Future Tech", subtitle: "Robotics & Coding", className: "md:col-span-2 md:row-span-1", img: "/videos/rc.mp4", isVideo: true, icon: <Bot className="text-cyan-400" size={20} />, color: "#00B7FF" },
  { id: 9, title: "Family Games", subtitle: "Board Games", className: "md:col-span-2 md:row-span-1", img: "/chars/pokemon.avif", icon: <Gamepad2 className="text-green-400" size={20} />, color: "#32CD32" }
];

const REVIEWS = [
  { id: 1, name: "Alex Chen", rating: 5, text: "The detail on the F1 model is absolutely insane! Worth every penny.", date: "2 days ago", avatar: "/avatars/1.jpg" },
  { id: 2, name: "Sarah J.", rating: 5, text: "My son hasn't stopped playing with the drone. Battery life is surprising!", date: "1 week ago", avatar: "/avatars/2.jpg" },
  { id: 3, name: "Mike Ross", rating: 4, text: "Fast shipping, great packaging. The vintage car collection is a must-have.", date: "3 days ago", avatar: "/avatars/3.jpg" },
  { id: 4, name: "Emily D.", rating: 5, text: "Best customer service I've experienced. They replaced a missing part instantly.", date: "Yesterday", avatar: "/avatars/4.jpg" },
  { id: 5, name: "Chris P.", rating: 5, text: "The 3D view on the website really helped me choose. Product looks exactly like the video.", date: "2 weeks ago", avatar: "/avatars/5.jpg" },
];

const CUSTOMER_PHOTOS = [
  '/chars/dead.avif', '/chars/car1.png', '/chars/car2.png', '/chars/car3.png', '/chars/spiderman.avif'
];

// --- VIDEO CARD COMPONENT (WITH FALLBACK) ---
const VideoCard = ({ video, index, theme }: { video: typeof TRENDING_VIDEOS[0], index: number, theme: 'dark' | 'light' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoError = () => {
    console.error(`Failed to load video: ${video.src}`);
    setHasError(true);
  };

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current && !isNaN(videoRef.current.duration) && videoRef.current.duration > 0) {
        const current = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        setProgress((current / duration) * 100);
      }
    };
    const interval = setInterval(updateProgress, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Preload video
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video.src]);

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
      className={`group relative ${getCardGradient()} rounded-2xl overflow-hidden cursor-pointer shadow-lg md:shadow-2xl border ${getBorderColor()} transition-all duration-500`}
    >
      <div className="relative w-full aspect-[9/16] overflow-hidden">
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
            <div className="text-center p-4">
              <div className="text-white/50 mb-2">Video not available</div>
              <div className="text-white/30 text-xs">{video.title}</div>
            </div>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              muted={isMuted} 
              loop 
              playsInline 
              src={video.src} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={handleVideoError}
              onLoadedData={() => setHasError(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <motion.div animate={{ opacity: isHovered ? 0.3 : 0.1 }} className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 via-transparent to-[#D4AF37]/10" />
          </>
        )}
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
        <motion.div animate={{ scale: isPlaying ? (isHovered ? 1.1 : 0) : 1, opacity: isPlaying ? (isHovered ? 1 : 0) : 1 }} className="absolute inset-0 flex items-center justify-center">
           <div className={`p-4 md:p-6 backdrop-blur-md rounded-xl md:rounded-2xl border ${theme === 'light' ? 'bg-white/80 border-gray-300' : 'bg-black/50 border-white/20'}`}>{isPlaying ? <Pause size={24} className="md:size-[32px]" /> : <Play size={24} className="md:size-[32px]" />}</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- CHARACTER SLIDER COMPONENT ---
const CharacterSlider = ({ theme }: { theme: 'dark' | 'light' }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className={`w-full py-12 md:py-20 border-t ${theme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-white/5 bg-[#080808]'}`}>
      <div className="max-w-7xl mx-auto px-4 mb-8 md:mb-12 text-center">
         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="inline-block mb-3">
           <span className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase">Find Your Hero</span>
         </motion.div>
         <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Shop By Character</motion.h2>
      </div>
      <div className="relative w-full overflow-hidden group">
        <div className={`absolute left-0 top-0 bottom-0 w-8 md:w-12 lg:w-24 z-20 bg-gradient-to-r ${theme === 'light' ? 'from-gray-50' : 'from-[#080808]'} to-transparent pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-8 md:w-12 lg:w-24 z-20 bg-gradient-to-l ${theme === 'light' ? 'from-gray-50' : 'from-[#080808]'} to-transparent pointer-events-none`} />
        <motion.div ref={sliderRef} className="flex gap-4 md:gap-6 px-4 md:px-12 cursor-grab active:cursor-grabbing pb-8 md:pb-12 overflow-x-auto scrollbar-hide snap-x">
           {CHARACTERS.map((char, i) => (
             <motion.div key={char.id} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.5 }} className="relative flex-shrink-0 snap-center">
                <div className="group/card relative w-36 h-48 md:w-48 md:h-64 lg:w-56 lg:h-72 rounded-2xl md:rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3">
                   <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-xl" style={{ backgroundColor: char.color }} />
                   <div className={`relative w-full h-full bg-gray-900 rounded-2xl md:rounded-[2rem] overflow-hidden border ${theme === 'light' ? 'border-gray-200' : 'border-white/10'} group-hover/card:border-white/30 transition-colors`}>
                      <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110" style={{ backgroundImage: `url(${char.src})`, backgroundColor: '#1a1a1a' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col items-center">
                         <h3 className="text-white font-bold text-sm md:text-lg uppercase tracking-wider text-center drop-shadow-md translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">{char.name}</h3>
                         <div className="h-1 w-6 md:w-8 rounded-full mt-2 md:mt-3 transition-all duration-300 transform scale-x-0 group-hover/card:scale-x-100" style={{ backgroundColor: char.color }} />
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- BENTO GRID COMPONENT ---
const BentoGrid = ({ theme }: { theme: 'dark' | 'light' }) => {
  return (
    <section className={`py-12 md:py-24 relative ${theme === 'light' ? 'bg-white' : 'bg-black'} border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
             <div className="max-w-2xl">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-3">
                   <Sparkles size={14} className="md:size-[16px] text-[#D4AF37]" />
                   <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase">Curated Collections</span>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className={`text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                   Best of <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC]">WOW Lifestyle</span>
                </motion.h2>
             </div>
             <motion.button initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={`px-6 py-3 md:px-8 md:py-4 rounded-full border ${theme === 'light' ? 'border-gray-200 hover:bg-gray-100 text-black' : 'border-white/20 hover:bg-white/10 text-white'} font-bold tracking-wide transition-all flex items-center gap-2 group`}>
                Explore All Categories <ArrowRight size={16} className="md:size-[18px] group-hover:translate-x-1 transition-transform" />
             </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[280px]">
             {BENTO_ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`group relative rounded-2xl md:rounded-[2.5rem] overflow-hidden cursor-pointer ${item.className} ${theme === 'light' ? 'bg-gray-100' : 'bg-[#0f0f0f]'} border ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}
                >
                   <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      {item.isVideo ? (
                         <video src={item.img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" autoPlay muted loop playsInline />
                      ) : (
                         <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }} />
                      )}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay" style={{ backgroundColor: item.color }} />
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                   <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                         <div className={`p-2 md:p-3 rounded-full backdrop-blur-md ${theme === 'light' ? 'bg-white/90 text-black' : 'bg-black/40 text-white border border-white/20'}`}>
                           {React.cloneElement(item.icon, { size: 14, className: `md:size-[20px] ${item.icon.props.className}` })}
                         </div>
                         <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                             <ArrowRight size={16} className="md:size-[20px] text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                         </div>
                      </div>
                      <div>
                         <span className="text-[#D4AF37] font-bold tracking-widest text-[8px] md:text-[10px] uppercase mb-1 md:mb-2 block opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">{item.subtitle}</span>
                         <h3 className="text-white text-lg md:text-2xl lg:text-3xl font-black uppercase leading-tight tracking-tight drop-shadow-lg">{item.title}</h3>
                      </div>
                   </div>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
};

// --- REVIEWS SECTION ---
const ReviewSection = ({ theme }: { theme: 'dark' | 'light' }) => {
  return (
    <section className={`py-12 md:py-32 relative overflow-hidden ${theme === 'light' ? 'bg-gray-50' : 'bg-[#080808]'} border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-bl from-[#D4AF37]/10 to-transparent blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-20">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-4">
               <MessageSquare size={14} className="md:size-[16px] text-[#D4AF37]" />
               <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase">Community Voices</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className={`text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-4 md:mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Loved By <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC]">Collectors</span>
            </motion.h2>
            <p className={`text-sm md:text-lg max-w-md ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Join thousands of happy customers discovering the rarest collectibles.
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className={`p-6 md:p-8 rounded-2xl md:rounded-[2rem] border backdrop-blur-xl ${theme === 'light' ? 'bg-white/80 border-gray-200 shadow-lg md:shadow-xl' : 'bg-white/5 border-white/10 shadow-lg md:shadow-2xl'}`}
          >
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="flex flex-col text-center md:text-left">
                 <span className={`text-5xl md:text-6xl font-black ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>4.94</span>
                 <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
                   {[1,2,3,4,5].map(i => <Star key={i} size={14} className="md:size-[16px] text-[#D4AF37]" fill="#D4AF37" />)}
                 </div>
                 <span className={`text-xs md:text-sm mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Based on 1,208 reviews</span>
              </div>
              <div className="hidden md:block h-16 w-px bg-current opacity-10" />
              <div className="flex-1 w-full md:w-auto space-y-2">
                 {[5,4,3,2,1].map((num, i) => (
                   <div key={num} className="flex items-center gap-3 text-xs font-bold">
                     <span className={`w-3 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>{num}</span>
                     <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${theme === 'light' ? 'bg-gray-100' : 'bg-white/10'}`}>
                        <motion.div 
                          initial={{ width: 0 }} 
                          whileInView={{ width: i === 0 ? '85%' : i === 1 ? '10%' : '2%' }} 
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-[#D4AF37]" 
                        />
                     </div>
                   </div>
                 ))}
              </div>
            </div>
            <button className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-bold tracking-wide transition-all transform hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base ${theme === 'light' ? 'bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/30' : 'bg-[#D4AF37] text-black shadow-[0_0_20px_#D4AF37]'}`}>
               Write a Review
            </button>
          </motion.div>
        </div>
        <div className="relative mb-12 md:mb-20">
           <div className={`absolute left-0 top-0 bottom-0 w-8 md:w-16 lg:w-32 z-10 bg-gradient-to-r ${theme === 'light' ? 'from-gray-50' : 'from-[#080808]'} to-transparent`} />
           <div className={`absolute right-0 top-0 bottom-0 w-8 md:w-16 lg:w-32 z-10 bg-gradient-to-l ${theme === 'light' ? 'from-gray-50' : 'from-[#080808]'} to-transparent`} />
           <div className="flex gap-4 md:gap-6 overflow-hidden mask-linear-fade pb-6 md:pb-8">
              <motion.div 
                animate={{ x: "-50%" }} 
                transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                className="flex gap-4 md:gap-6 flex-shrink-0"
              >
                 {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, i) => (
                    <div key={`${review.id}-${i}`} className={`w-64 md:w-80 p-4 md:p-6 rounded-xl md:rounded-2xl flex-shrink-0 border ${theme === 'light' ? 'bg-white border-gray-100 shadow-sm' : 'bg-[#111] border-white/5'}`}>
                       <div className="flex items-center gap-3 mb-3 md:mb-4">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 overflow-hidden">
                             <User className="w-full h-full p-2 text-gray-500" /> 
                          </div>
                          <div className="flex-1">
                             <h4 className={`font-bold text-xs md:text-sm ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{review.name}</h4>
                             <div className="flex items-center gap-1">
                               {[...Array(review.rating)].map((_, r) => <Star key={r} size={10} className="md:size-[10px] text-[#D4AF37]" fill="#D4AF37" />)}
                             </div>
                          </div>
                          <span className={`text-[8px] md:text-[10px] ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`}>{review.date}</span>
                       </div>
                       <p className={`text-xs md:text-sm leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>"{review.text}"</p>
                    </div>
                 ))}
              </motion.div>
           </div>
        </div>
        <div>
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-3">
              <h3 className={`text-xl md:text-2xl font-bold uppercase tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Customer Gallery</h3>
              <a href="#" className={`text-xs md:text-sm font-bold border-b hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors ${theme === 'light' ? 'text-gray-900 border-gray-300' : 'text-white border-white/30'}`}>View All Photos</a>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {CUSTOMER_PHOTOS.map((photo, i) => (
                 <motion.div 
                   key={i} 
                   whileHover={{ y: -5 }}
                   className={`aspect-square rounded-xl md:rounded-2xl overflow-hidden cursor-pointer relative group ${theme === 'light' ? 'bg-gray-200' : 'bg-[#111]'}`}
                 >
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${photo})` }} />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Maximize2 className="text-white" size={18} className="md:size-[24px]" />
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

// --- NEW 3D FOOTER COMPONENT ---
const Footer = ({ theme }: { theme: 'dark' | 'light' }) => {
  return (
    <footer className={`relative pt-24 md:pt-32 pb-8 md:pb-12 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-[#050505] text-white'}`}>
       
       {/* Background Grid Pattern (Clipped inside absolute div) */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className={`absolute inset-0 opacity-[0.03] ${theme === 'light' ? 'bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]'} bg-[size:20px_20px] md:bg-[size:40px_40px]`} />
       </div>

       {/* 3D HANGING CAR ELEMENT - Breaking the Grid */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[600px] pointer-events-none z-30 block">
          <motion.div 
             initial={{ y: -50, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             transition={{ duration: 1, type: "spring" }}
             // @ts-ignore
             animate={{ y: [0, 15, 0] }}
             // @ts-ignore
             transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
             className="relative"
          >
             {/* Main Car Image */}
             <img 
               src="/pngcar.png" 
               alt="F1 Car" 
               className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] md:drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]" 
             />
             
             {/* Optional: Glow/Spotlight effect behind the car to emphasize depth */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-[#D4AF37]/20 blur-[40px] md:blur-[60px] rounded-full -z-10" />
          </motion.div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20">
             
             {/* Brand Column */}
             <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                   {/* Replaced Icon with Logo Image */}
                   <div className="w-10 h-10 md:w-12 md:h-12 relative rounded-full overflow-hidden border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.3)] md:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                      <img 
                        src="/wow-logo.png" 
                        alt="WOW Lifestyle Logo" 
                        className="w-full h-full object-cover"
                      />
                   </div>
                   <span className="text-xl md:text-2xl font-black tracking-tighter">WOW <span className="text-[#D4AF37]">LIFESTYLE</span></span>
                </div>
                <p className={`text-xs md:text-sm leading-relaxed mb-4 md:mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                   Engineers of the future. We build robust, scalable, and revolutionary toy solutions that propel play forward into the digital age.
                </p>
                <div className="flex gap-3 md:gap-4">
                   {[Twitter, Instagram, Facebook, Youtube].map((Icon, i) => (
                      <a key={i} href="#" className={`p-2.5 md:p-3 rounded-full transition-all ${theme === 'light' ? 'bg-gray-100 hover:bg-[#D4AF37] hover:text-white' : 'bg-white/5 hover:bg-[#D4AF37] hover:text-black'}`}>
                         <Icon size={16} className="md:size-[18px]" />
                      </a>
                   ))}
                </div>
             </div>

             {/* Links Columns */}
             <div>
                <h4 className="font-bold mb-4 md:mb-6 text-[#D4AF37] uppercase tracking-wider text-xs">Company</h4>
                <ul className={`space-y-3 md:space-y-4 text-xs md:text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                   {['About Us', 'Careers', 'Blog & News', 'Sustainability', 'Partners'].map(item => (
                      <li key={item}><a href="#" className="hover:text-[#D4AF37] transition-colors">{item}</a></li>
                   ))}
                </ul>
             </div>

             <div>
                <h4 className="font-bold mb-4 md:mb-6 text-[#D4AF37] uppercase tracking-wider text-xs">Support</h4>
                <ul className={`space-y-3 md:space-y-4 text-xs md:text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                   {['Help Center', 'Terms of Service', 'Legal', 'Privacy Policy', 'Status'].map(item => (
                      <li key={item}><a href="#" className="hover:text-[#D4AF37] transition-colors">{item}</a></li>
                   ))}
                </ul>
             </div>

             {/* Newsletter Column */}
             <div>
                <h4 className="font-bold mb-4 md:mb-6 text-[#D4AF37] uppercase tracking-wider text-xs">Stay in the Lead</h4>
                <p className={`text-xs md:text-sm mb-3 md:mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                   Subscribe to our pit stop newsletter for the latest drops.
                </p>
                <div className={`flex items-center p-1 rounded-lg md:rounded-xl border ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/10'}`}>
                   <div className="pl-2 md:pl-3 text-gray-400"><Mail size={16} className="md:size-[18px]" /></div>
                   <input 
                     type="email" 
                     placeholder="Enter your email" 
                     className="w-full bg-transparent border-none focus:ring-0 text-xs md:text-sm p-2 md:p-3 outline-none placeholder-gray-500"
                   />
                   <button className="p-2 md:p-3 rounded-lg bg-[#D4AF37] text-black font-bold hover:bg-[#FCEEAC] transition-colors text-xs md:text-sm">
                      <Send size={16} className="md:size-[18px]" />
                   </button>
                </div>
             </div>
          </div>

          <div className={`pt-6 md:pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 ${theme === 'light' ? 'border-gray-200 text-gray-500' : 'border-white/10 text-gray-500'}`}>
             <p className="text-[10px] md:text-xs text-center md:text-left">© 2024 WOW Lifestyle. All rights reserved.</p>
             <div className="flex gap-4 md:gap-6 text-[10px] md:text-xs">
                <a href="#" className="hover:text-[#D4AF37]">Privacy Policy</a>
                <a href="#" className="hover:text-[#D4AF37]">Terms of Use</a>
                <a href="#" className="hover:text-[#D4AF37]">Cookie Policy</a>
             </div>
          </div>
       </div>
    </footer>
  );
};

// --- STUDIO SHOWCASE COMPONENT (Clean Professional) ---
const StudioShowcase = ({ videos, theme }: { videos: typeof VINTAGE_VIDEOS, theme: 'dark' | 'light' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [hasError, setHasError] = useState(false);
  const activeVideo = videos[activeIndex];
  const CYCLE_DURATION = 5000;

  const handleNext = () => { setActiveIndex((prev) => (prev + 1) % videos.length); setTimer(0); setHasError(false); };
  const handlePrev = () => { setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length); setTimer(0); setHasError(false); };

  const handleVideoError = () => {
    console.error(`Failed to load video: ${activeVideo.src}`);
    setHasError(true);
    // Auto-advance to next video on error
    setTimeout(handleNext, 1000);
  };

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= CYCLE_DURATION) handleNext();
      else setTimer((elapsed / CYCLE_DURATION) * 100);
    }, 50);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="w-full max-w-7xl mx-auto perspective-[800px] md:perspective-[1200px] py-8 md:py-10 group">
      <div className={`relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2.35/1] rounded-xl md:rounded-2xl lg:rounded-[2rem] shadow-lg md:shadow-2xl overflow-hidden ${theme === 'light' ? 'bg-gray-100 shadow-gray-300' : 'bg-[#0a0a0a] shadow-black'} border border-white/5`}>
        <div className="absolute -inset-2 md:-inset-4 blur-[40px] md:blur-[80px] opacity-20 transition-colors duration-1000 -z-10" style={{ backgroundColor: activeVideo.color }} />
        <div className="absolute inset-0 bg-black">
           <AnimatePresence mode='wait'>
            <motion.div key={activeVideo.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="w-full h-full">
              {hasError ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                  <div className="text-center p-8">
                    <div className="text-white/50 text-lg mb-2">Video Loading</div>
                    <div className="text-white/30 text-sm">Next video in {Math.round((CYCLE_DURATION - (timer/100 * CYCLE_DURATION))/1000)}s</div>
                  </div>
                </div>
              ) : (
                <video 
                  src={activeVideo.src} 
                  className="w-full h-full object-cover" 
                  autoPlay 
                  muted 
                  playsInline 
                  loop 
                  onError={handleVideoError}
                  onLoadedData={() => setHasError(false)}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none opacity-80" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute top-4 md:top-8 left-4 md:left-8 z-20">
           <div className="flex items-center gap-2 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[8px] md:text-[10px] font-medium text-white uppercase tracking-widest">Live Exhibit</span>
           </div>
        </div>
        <div className="absolute bottom-0 left-0 p-4 md:p-8 z-20 flex flex-col gap-1 transition-transform duration-500 group-hover:translate-x-2">
            <h3 className="text-white text-lg md:text-3xl font-light tracking-wide flex items-center gap-2 md:gap-4">
              <span className="font-bold">No. {activeVideo.id.toString().padStart(2, '0')}</span>
              <span className="text-white/30 text-sm md:text-xl font-thin">|</span>
              <span className="text-white/80 text-sm md:text-xl font-light tracking-widest uppercase">Vintage Collection</span>
            </h3>
            <p className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase mt-1">Auto-cycling • {activeVideo.color} Series</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
            <button onClick={handlePrev} className="pointer-events-auto p-2 md:p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all transform hover:scale-110"><ChevronLeft size={18} className="md:size-[24px]" /></button>
            <button onClick={handleNext} className="pointer-events-auto p-2 md:p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all transform hover:scale-110"><ChevronRight size={18} className="md:size-[24px]" /></button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-30">
           <motion.div className="h-full bg-[#D4AF37] shadow-[0_0_5px_#D4AF37] md:shadow-[0_0_10px_#D4AF37]" style={{ width: `${timer}%` }} />
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleThemeChange = (e: CustomEvent) => setTheme(e.detail);
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) setTheme(savedTheme);
    else { const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light'; if (currentTheme) setTheme(currentTheme); }
    window.addEventListener('themechange', handleThemeChange as EventListener);
    const observer = new MutationObserver(() => { const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light'; if (currentTheme) setTheme(currentTheme); });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => { window.removeEventListener('themechange', handleThemeChange as EventListener); observer.disconnect(); };
  }, []);

  // Responsive Check Effect
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => { const interval = setInterval(() => { setCurrentIndex((prev) => (prev + 1) % CAR_IMAGES.length); }, 3500); return () => clearInterval(interval); }, []);

  const getBackgroundColor = () => theme === 'light' ? 'bg-white' : 'bg-black';
  const getTextColor = () => theme === 'light' ? 'text-gray-900' : 'text-white';
  const getSecondaryTextColor = () => theme === 'light' ? 'text-gray-600' : 'text-gray-300';
  const getBorderColor = () => theme === 'light' ? 'border-gray-200' : 'border-white/10';
  const getGridColor = () => theme === 'light' ? 'bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]';
  const getSectionBackground = () => theme === 'light' ? 'bg-gradient-to-b from-gray-50 to-white' : 'bg-gradient-to-b from-[#0a0a0a] to-black';

  const textVariants = { hidden: { opacity: 0, y: 30 }, visible: (delay: number) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: easeOut } }) };
  
  const getCarVariant = (index: number) => { const total = CAR_IMAGES.length; if (index === currentIndex) return 'active'; if (index === (currentIndex + 1) % total) return 'next'; if (index === (currentIndex - 1 + total) % total) return 'prev'; return 'hidden'; };
  
  // UPDATED CAR VARIANTS FOR MOBILE
  const carVariants = {
    next: { 
        x: isMobile ? 0 : 240, // Mobile: Stack behind instead of offset
        y: isMobile ? -20 : -180, 
        scale: isMobile ? 0.7 : 0.55, 
        opacity: 0.5, 
        zIndex: 5, 
        filter: 'blur(2px) grayscale(100%)', 
        transition: { duration: 0.8, ease: easeInOut } 
    },
    active: { 
        x: 0, 
        y: isMobile ? 10 : 0, // Slight push down on mobile
        scale: isMobile ? 0.85 : 1.15, // Mobile: Scaled down slightly more (0.9 -> 0.85) to fit width
        opacity: 1, 
        zIndex: 20, 
        filter: 'blur(0px) grayscale(0%)', 
        transition: { type: "spring" as const, stiffness: 180, damping: 14 } 
    },
    prev: { 
        x: isMobile ? 0 : 240, // Mobile: Stack behind
        y: isMobile ? 20 : 180, 
        scale: isMobile ? 0.7 : 0.55, 
        opacity: 0.5, 
        zIndex: 4, 
        filter: 'blur(2px) grayscale(100%)', 
        transition: { duration: 0.8, ease: easeInOut } 
    },
    hidden: { 
        x: isMobile ? 0 : 350, // Mobile: Zero offset to prevent overflow
        y: 0, 
        scale: 0, 
        opacity: 0 
    }
  } as const;

  return (
    <div className={`w-full ${getBackgroundColor()} ${getTextColor()} transition-colors duration-300`}>
      {/* HERO SECTION */}
      {/* FIX: Increased top padding for mobile (pt-32) to prevent Navbar overlap */}
      <section className={`relative min-h-screen overflow-hidden flex flex-col justify-center pt-32 md:pt-24 lg:pt-32 pb-12 md:pb-20`}>
        <div className="absolute right-[-20%] md:right-[-10%] top-[20%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-[#D4AF37]/20 to-transparent blur-[80px] md:blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className={`absolute inset-0 ${getGridColor()} bg-[size:16px_16px] md:bg-[size:24px_24px] -z-20`}></div>
        <div className="flex-grow flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              
              {/* FIX: Removed order-2 for mobile. Text comes first in code, so it will now appear FIRST on mobile naturally. */}
              <div className="flex flex-col justify-center text-center lg:text-left z-10 lg:order-1">
                <motion.div custom={0} initial="hidden" animate="visible" variants={textVariants} className="flex justify-center lg:justify-start mb-4 md:mb-6">
                  <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37]/10 to-transparent text-[#D4AF37] text-xs md:text-sm font-bold tracking-wide flex items-center gap-2"><Trophy size={14} className="md:size-[16px]" /> OFFICIAL F1 COLLECTOR SERIES</span>
                </motion.div>
                <motion.h1 custom={0.2} initial="hidden" animate="visible" variants={textVariants} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black ${getTextColor()} leading-tight mb-4 md:mb-6`}>Race Ready. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FCEEAC] to-[#D4AF37] animate-gradient">Miniature Speed.</span></motion.h1>
                <motion.p custom={0.4} initial="hidden" animate="visible" variants={textVariants} className={`${getSecondaryTextColor()} text-sm md:text-lg max-w-lg mx-auto lg:mx-0 mb-6 md:mb-10 leading-relaxed`}>Experience the thrill of the track with our ultra-realistic, precision-engineered diecast Formula 1 collection.</motion.p>
                <motion.div custom={0.6} initial="hidden" animate="visible" variants={textVariants} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                  <button className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC] text-black font-bold text-base md:text-lg rounded-lg md:rounded-xl hover:shadow-lg md:hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 group">Shop Collection <ArrowRight size={18} className="md:size-[20px] group-hover:translate-x-1 transition-transform" /></button>
                  <button className={`px-6 py-3 md:px-8 md:py-4 ${theme === 'light' ? 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'} border font-bold text-base md:text-lg rounded-lg md:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 md:gap-3`}>View Gallery <CarFront size={18} className="md:size-[20px]" /></button>
                </motion.div>
              </div>

              {/* FIX: Removed order-1 for mobile. Images are second in code, so they will now appear SECOND on mobile naturally. */}
              <div className="relative h-[250px] md:h-[400px] lg:h-[600px] w-full flex items-center justify-center perspective-[800px] md:perspective-[1200px] lg:order-2">
                 <div className="absolute z-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full blur-2xl md:blur-3xl" />
                 {CAR_IMAGES.map((imgSrc, index) => { const variant = getCarVariant(index); if (variant === 'hidden') return null; return ( <motion.div key={index} variants={carVariants} initial="next" animate={variant} className="absolute w-full flex items-center justify-center origin-center" style={{ transformStyle: "preserve-3d" }}><motion.div className="relative" animate={variant === 'active' ? { y: [-8, 8, -8], transition: { duration: 5, repeat: Infinity, ease: easeInOut } } : {}}><img src={imgSrc} alt={`Vehicle ${index}`} className="w-full max-w-[240px] md:max-w-[320px] lg:max-w-[500px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] md:drop-shadow-[0_35px_60px_rgba(0,0,0,0.9)]" /></motion.div></motion.div> ); })}
              </div>
            </div>
          </div>
        </div>
        <div className={`relative w-full border-t ${getBorderColor()} ${theme === 'light' ? 'bg-white/60' : 'bg-black/60'} backdrop-blur-lg mt-8 md:mt-12 py-4 md:py-6`}>
           <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r ${theme === 'light' ? 'from-white' : 'from-black'} to-transparent z-10 pointer-events-none`} />
           <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l ${theme === 'light' ? 'from-white' : 'from-black'} to-transparent z-10 pointer-events-none`} />
           <div className="flex overflow-hidden">
              <motion.div className="flex items-center gap-8 md:gap-16 lg:gap-24 px-6 md:px-12" animate={{ x: "-50%" }} transition={{ duration: 30, ease: "linear", repeat: Infinity }}>
                 {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => ( <div key={`${brand.name}-${i}`} className="group relative flex-shrink-0 cursor-pointer"><img src={brand.src} alt={brand.name} className={`h-8 md:h-10 lg:h-12 w-auto object-contain transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 md:group-hover:scale-125 ${theme === 'light' ? 'grayscale opacity-50' : 'grayscale opacity-40'}`} /></div> ))}
              </motion.div>
           </div>
        </div>
      </section>

      {/* TRENDING NOW */}
      <section className={`relative py-12 md:py-24 ${getSectionBackground()} border-t ${getBorderColor()}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] md:h-[500px] bg-gradient-to-b from-[#D4AF37]/10 to-transparent blur-[60px] md:blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 mb-3 md:mb-4">
                <Zap size={14} className="md:size-[16px] text-[#D4AF37]" /><span className="text-xs md:text-sm font-bold text-[#D4AF37] tracking-wider">TRENDING NOW</span>
              </div>
              <h2 className={`text-2xl md:text-4xl lg:text-6xl font-black ${getTextColor()} mb-3 md:mb-4`}>Hot <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC]">Drops</span></h2>
              <p className={`${getSecondaryTextColor()} text-sm md:text-lg max-w-xl`}>See what's hot in the collector's world this week.</p>
            </div>
            <button className={`group flex items-center gap-2 md:gap-3 ${getTextColor()} font-bold hover:text-[#D4AF37] transition-colors px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl border ${getBorderColor()} hover:border-[#D4AF37]/50 text-sm md:text-base`}>View All <ArrowRight size={16} className="md:size-[20px] group-hover:translate-x-1 transition-transform" /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
             {TRENDING_VIDEOS.map((video, index) => ( <VideoCard key={video.id} video={video} index={index} theme={theme} /> ))}
          </div>
        </div>
      </section>

      {/* 3D STUDIO VIEWER & CHARACTERS */}
      <section className={`relative py-12 md:py-32 ${theme === 'light' ? 'bg-gray-50' : 'bg-black'} overflow-hidden border-t ${getBorderColor()}`}>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"><div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] md:h-[500px] ${theme === 'light' ? 'bg-gradient-to-b from-white to-transparent' : 'bg-gradient-to-b from-[#111] to-transparent'}`} /></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center mb-8 md:mb-16">
            <h2 className={`text-2xl md:text-4xl lg:text-5xl xl:text-7xl font-black tracking-tighter leading-none mb-3 md:mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>STUDIO <span className="text-[#D4AF37]">SHOWCASE</span></h2>
            <p className={`max-w-2xl mx-auto text-sm md:text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Watch our premium vintage models in action. <br className="hidden md:block"/>Fast-paced automotive exhibition.</p>
          </div>
          
          <StudioShowcase videos={VINTAGE_VIDEOS} theme={theme} />
          
          <CharacterSlider theme={theme} />

          <BentoGrid theme={theme} />
          
          <ReviewSection theme={theme} />
          
        </div>
      </section>

      {/* NEW FOOTER SECTION */}
      <Footer theme={theme} />
    </div>
  );
}