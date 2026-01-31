'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, User, Heart, Sun, Moon } from 'lucide-react';

// Define the Props we expect from Layout
interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

// Navigation Links Configuration
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

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Dynamic Styles
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

  const linkColor = theme === 'light' ? 'text-gray-800 hover:text-[#D4AF37]' : 'text-gray-300 hover:text-white';
  const logoColor = theme === 'light' ? 'text-gray-900' : 'text-white';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${getNavbarBackground()} ${isScrolled ? 'py-3' : 'py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={linkColor}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]">
                <Image src="/wow-logo.png" alt="Logo" fill className="object-cover" />
              </div>
              <span className={`text-xl font-bold tracking-wider ${logoColor}`}>
                WOW <span className="text-[#D4AF37]">LIFESTYLE</span>
              </span>
            </Link>

            {/* Desktop Links - UPDATED TO NAVIGATE TO /services */}
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

            {/* Right Icons */}
            <div className="flex items-center space-x-5">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${
                  theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-600" />}
              </button>

              <NavIcon icon={<Search size={20} />} theme={theme} />
              <NavIcon icon={<Heart size={20} />} theme={theme} className="hidden sm:block" />
              <NavIcon icon={<User size={20} />} theme={theme} className="hidden sm:block" />
              <ShoppingBag size={22} className={linkColor} />
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-t ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-black border-white/10'}`}
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`block px-3 py-4 text-base font-medium rounded-md ${
                      pathname === link.path ? 'text-[#D4AF37] bg-[#D4AF37]/5' : linkColor
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

const NavIcon = ({ icon, theme, className }: any) => (
  <button className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} hover:text-[#D4AF37] ${className}`}>
    {icon}
  </button>
);