'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import NavbarHome from "./components-main/NavbarHome";
import Hero from "./components-main/Hero";
import Preloader from "./components-main/Preloader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optimize scroll performance
    const optimizeScroll = () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      
      // Disable smooth scroll during loading
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Re-enable after load
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 100);
    };

    optimizeScroll();

    // Wait for 2.8 seconds before revealing the site
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Restore smooth scroll after loading
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 2800);

    // Cleanup
    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = 'smooth';
    };
  }, []);

  // Handle scroll optimization after load
  useEffect(() => {
    if (!isLoading && mainRef.current) {
      // Force reflow to ensure smooth animations
      void mainRef.current.offsetHeight;
    }
  }, [isLoading]);

  return (
    <main ref={mainRef} className="min-h-screen w-full transition-colors duration-300 scroll-smooth">
      {/* 1. Preloader Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 2. Main Content (Revealed after loading) */}
      {!isLoading && (
        <>
          <NavbarHome />
          <Hero />
        </>
      )}
    </main>
  );
}