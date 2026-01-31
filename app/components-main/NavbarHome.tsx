'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, User, Heart, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Our Services', path: '/services' },
  { name: 'About Us', path: '/about' },
  { name: 'Testimonials', path: '/testimonials' },
];

export default function NavbarHome({ theme, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Auto-close menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const getNavbarBackground = () => {
    if (theme === 'light') {
      return isScrolled 
        ? 'bg-white/90 border-gray-200 shadow-sm' 
        : 'bg-white/95 border-transparent';
    } else {
      return isScrolled 
        ? 'bg-black/90 border-white/10 shadow-sm' 
        : 'bg-black/95 border-transparent';
    }
  };

  const linkColor = theme === 'light' ? 'text-gray-800 hover:text-[#D4AF37]' : 'text-gray-300 hover:text-white';
  const logoColor = theme === 'light' ? 'text-gray-900' : 'text-white';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b backdrop-blur-md ${getNavbarBackground()} ${isScrolled ? 'py-3' : 'py-4'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* 1. Mobile Menu Toggle - LEFT SIDE */}
            <div className="flex lg:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className={`p-2 rounded-md ${linkColor}`}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

            {/* 2. Logo - CENTERED ON MOBILE/LEFT ON DESKTOP */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D4AF37]">
                <Image src="/wow-logo.png" alt="Logo" fill className="object-cover" />
              </div>
              <span className={`text-lg sm:text-xl font-bold tracking-wider ${logoColor}`}>
                WOW <span className="text-[#D4AF37]">LIFESTYLE</span>
              </span>
            </Link>

            {/* 3. Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path} 
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.path ? 'text-[#D4AF37]' : linkColor
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* 4. Action Icons - RIGHT SIDE */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${
                  theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-600" />}
              </button>

              <NavIcon icon={<Search size={20} />} theme={theme} className="hidden xs:block" />
              <NavIcon icon={<User size={20} />} theme={theme} className="hidden sm:block" />
              <div className="relative">
                <ShoppingBag size={22} className={linkColor} />
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Mobile Menu Overlay - DROPDOWN */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`lg:hidden overflow-hidden border-t ${
                theme === 'light' ? 'bg-white border-gray-100' : 'bg-black border-white/10'
              }`}
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`block px-4 py-3 text-lg font-semibold rounded-lg transition-all ${
                      pathname === link.path 
                        ? 'text-[#D4AF37] bg-[#D4AF37]/10' 
                        : theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Extra Mobile-only icons if needed */}
                <div className="pt-4 mt-4 border-t border-gray-100/10 flex gap-6 px-4">
                   <Heart size={22} className={linkColor} />
                   <User size={22} className={linkColor} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

const NavIcon = ({ icon, theme, className }: any) => (
  <button className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} hover:text-[#D4AF37] transition-colors ${className}`}>
    {icon}
  </button>
);