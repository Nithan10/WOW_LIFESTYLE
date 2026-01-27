'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components-main/NavbarHome";
import FooterComponent from "./components-sections/Footer";
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let activeTheme: 'dark' | 'light' = 'dark';
    
    if (savedTheme) {
      activeTheme = savedTheme;
    } else if (!systemPrefersDark) {
      activeTheme = 'light';
    }

    setTheme(activeTheme);
    applyThemeToDocument(activeTheme);
    setMounted(true);
  }, []);

  // Helper to apply theme classes
  const applyThemeToDocument = (newTheme: 'dark' | 'light') => {
    const root = document.documentElement;
    
    // 1. Set Data Attribute
    root.setAttribute('data-theme', newTheme);
    
    // 2. Set CSS Class (Crucial for Tailwind dark: modifiers)
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // The Toggle Function passed to Navbar
  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyThemeToDocument(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Dispatch event for other components if needed
    window.dispatchEvent(new CustomEvent('theme-change', { detail: newTheme }));
  };

  if (!mounted) {
    return (
      <html lang="en" className="dark">
        <body className={inter.className} style={{ opacity: 0 }}>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={theme} data-theme={theme}>
      <body className={`${inter.className} bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300`}>
        {/* Pass the state and function to Navbar */}
        <Navbar theme={theme} toggleTheme={handleThemeToggle} />
        {children}
        <FooterComponent theme={theme} />
      </body>
    </html>
  );
}