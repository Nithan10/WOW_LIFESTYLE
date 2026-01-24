'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, User, Heart, Sun, Moon } from 'lucide-react';

// Navigation Links
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Collections', href: '/collections' },
  { name: 'Toys & Gadgets', href: '/toys' },
  { name: 'Sale', href: '/sale' },
];

export default function NavbarHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  // Handle scroll effect with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });
    return () => window.removeEventListener('scroll', optimizedScroll);
  }, [handleScroll]);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
      applyTheme('dark');
    } else {
      setTheme('light');
      applyTheme('light');
    }
  }, []);

  // Apply theme to document
  const applyTheme = (theme: 'dark' | 'light') => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Handle navbar background based on theme and scroll state
  const getNavbarBackground = () => {
    if (theme === 'light') {
      return isScrolled 
        ? 'bg-white/90 backdrop-blur-md border-gray-200 shadow-sm' 
        : 'bg-white/95 backdrop-blur-sm border-transparent';
    } else {
      return isScrolled 
        ? 'bg-black/90 backdrop-blur-md border-white/10 shadow-sm' 
        : 'bg-black/95 backdrop-blur-sm border-transparent';
    }
  };

  // Handle text colors based on theme
  const getTextColor = (baseColor: string) => {
    return theme === 'light' ? 'text-gray-800' : baseColor;
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut"
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${getNavbarBackground()} ${
          isScrolled ? 'py-3' : 'py-5'
        } gpu-accelerated`}
        style={{ willChange: 'transform, background-color, border-color' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* LEFT: Mobile Menu Button (Visible on mobile only) */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${getTextColor('text-white')} hover:text-[#D4AF37] transition-colors duration-200`}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* CENTER (Mobile) / LEFT (Desktop): Logo */}
            <Link 
              href="/" 
              onClick={scrollToTop}
              className="flex-shrink-0 flex items-center gap-2 group gpu-accelerated"
            >
              <div className={`relative w-10 h-10 rounded-full overflow-hidden border ${
                theme === 'light' 
                  ? 'border-[#D4AF37]/70 group-hover:border-[#D4AF37]' 
                  : 'border-[#D4AF37]/50 group-hover:border-[#D4AF37]'
              } transition-colors duration-300`}>
                <Image
                  src="/wow-logo.png" 
                  alt="WOW Lifestyle Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className={`text-xl font-bold tracking-wider ${getTextColor('text-white')} transition-colors duration-300`}>
                WOW <span className="text-[#D4AF37]">LIFESTYLE</span>
              </span>
            </Link>

            {/* CENTER: Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium ${
                    theme === 'light' 
                      ? 'text-gray-700 hover:text-gray-900' 
                      : 'text-gray-300 hover:text-white'
                  } transition-colors duration-200 group gpu-accelerated`}
                  onClick={(e) => {
                    if (link.href === '/') {
                      e.preventDefault();
                      scrollToTop();
                    }
                  }}
                >
                  {link.name}
                  {/* Animated Underline */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* RIGHT: Icons (Theme Toggle, Search, Account, Cart) */}
            <div className="flex items-center space-x-5">
              {/* Theme Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  theme === 'light' 
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' 
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                } transition-colors duration-200 gpu-accelerated`}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun size={18} className="text-yellow-300" />
                ) : (
                  <Moon size={18} className="text-blue-600" />
                )}
              </motion.button>
              
              <NavIcon 
                icon={<Search size={20} />} 
                label="Search" 
                theme={theme}
              />
              <NavIcon 
                icon={<Heart size={20} />} 
                label="Wishlist" 
                className="hidden sm:block"
                theme={theme}
              />
              <NavIcon 
                icon={<User size={20} />} 
                label="Account" 
                className="hidden sm:block"
                theme={theme}
              />
              
              <div className="relative group cursor-pointer gpu-accelerated">
                <ShoppingBag 
                  size={22} 
                  className={`${
                    theme === 'light' 
                      ? 'text-gray-800 group-hover:text-[#D4AF37]' 
                      : 'text-white group-hover:text-[#D4AF37]'
                  } transition-colors duration-200`} 
                />
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                  2
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-[60px] left-0 right-0 ${
              theme === 'light' 
                ? 'bg-white/95 backdrop-blur-xl border-gray-200' 
                : 'bg-black/95 backdrop-blur-xl border-white/10'
            } border-b z-40 lg:hidden overflow-hidden gpu-accelerated`}
            style={{ willChange: 'opacity, height' }}
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (link.href === '/') {
                        scrollToTop();
                      }
                    }}
                    className={`block text-lg font-medium ${
                      theme === 'light' 
                        ? 'text-gray-700 hover:text-[#D4AF37]' 
                        : 'text-gray-300 hover:text-[#D4AF37]'
                    } hover:pl-2 transition-all duration-200`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Icons Row */}
              <div className="pt-4 border-t border-gray-200 flex gap-6 items-center">
                {/* Theme Toggle in Mobile Menu */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full ${
                    theme === 'light' 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-gray-800 text-white'
                  } transition-colors duration-200`}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                
                <div className={`flex gap-6 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  <button className="hover:text-[#D4AF37] transition-colors duration-200">
                    <User size={20} />
                  </button>
                  <button className="hover:text-[#D4AF37] transition-colors duration-200">
                    <Heart size={20} />
                  </button>
                  <button className="hover:text-[#D4AF37] transition-colors duration-200">
                    <Search size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Updated Helper Component for Icons with Theme Support
const NavIcon = ({ 
  icon, 
  label, 
  className, 
  theme = 'dark' 
}: { 
  icon: React.ReactNode; 
  label: string; 
  className?: string;
  theme?: 'dark' | 'light';
}) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`${
      theme === 'light' 
        ? 'text-gray-800 hover:text-[#D4AF37]' 
        : 'text-white hover:text-[#D4AF37]'
    } transition-colors duration-200 ${className} gpu-accelerated`}
    aria-label={label}
  >
    {icon}
  </motion.button>
);