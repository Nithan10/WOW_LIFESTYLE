'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Maximize2, User } from 'lucide-react';

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

// Optimized Review Section Component
const ReviewSection = memo(({ theme }: { theme: 'dark' | 'light' }) => {
  return (
    <section className={`py-12 md:py-32 relative overflow-hidden ${theme === 'light' ? 'bg-gray-50' : 'bg-[#080808]'} border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-bl from-[#D4AF37]/10 to-transparent blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-20">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-4">
              <MessageSquare size={14} className="md:size-[16px] text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase">Community Voices</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-4 md:mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Loved By <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEEAC]">Collectors</span>
            </motion.h2>
            <p className={`text-sm md:text-lg max-w-md ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Join thousands of happy customers discovering the rarest collectibles.
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
                        viewport={{ once: true }}
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
              transition={{ duration: 60, ease: "linear", repeat: Infinity }}
              className="flex gap-4 md:gap-6 flex-shrink-0 will-change-transform"
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
                  <Maximize2 className="text-white md:size-[24px]" size={18} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

ReviewSection.displayName = 'ReviewSection';

interface ReviewSectionProps {
  theme: 'dark' | 'light';
}

export default function ReviewSectionComponent({ theme }: ReviewSectionProps) {
  return <ReviewSection theme={theme} />;
}