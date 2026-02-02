'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';

interface ContactPageProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function ContactPage({ isOpen, onClose, isDarkMode }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Add ESC key support
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Higher z-index and positioned above navbar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200]"
          />
          
          {/* Contact Modal - Added top margin and higher z-index */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl z-[250] overflow-hidden mt-10 ${
              isDarkMode 
                ? 'bg-slate-900 border border-yellow-500/20' 
                : 'bg-white border border-amber-200'
            }`}
            style={{ marginTop: '40px' }} // Added extra margin from navbar
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className={`absolute right-4 top-4 p-2 rounded-full z-10 ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' 
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
              }`}
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row h-full">
              {/* Left side - Contact Info */}
              <div className="md:w-2/5 p-6 md:p-8 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 text-black overflow-y-auto">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black mb-2">Get in Touch</h2>
                    <p className="text-black/80 text-sm md:text-base">We'd love to hear from you. Contact us for any queries.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-black/10 rounded-xl">
                      <Mail size={20} />
                      <div>
                        <p className="font-bold text-sm md:text-base">Email</p>
                        <p className="text-sm">contact@wowlifestyle.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-black/10 rounded-xl">
                      <Phone size={20} />
                      <div>
                        <p className="font-bold text-sm md:text-base">Phone</p>
                        <p className="text-sm">+91 98765 43210</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-black/10 rounded-xl">
                      <MapPin size={20} />
                      <div>
                        <p className="font-bold text-sm md:text-base">Address</p>
                        <p className="text-sm">123 Lifestyle Street, Mumbai, India 400001</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-black text-lg md:text-xl mb-4">Business Hours</h3>
                    <div className="space-y-2 text-sm">
                      <p className="flex justify-between">
                        <span>Mon - Fri:</span>
                        <span className="font-bold">9:00 AM - 8:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Saturday:</span>
                        <span className="font-bold">10:00 AM - 6:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="font-bold">Closed</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Contact Form */}
              <div className="md:w-3/5 p-6 md:p-8 overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${
                      isDarkMode ? 'text-yellow-400' : 'text-amber-700'
                    }`}>
                      Your Name
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-3.5 ${
                        isDarkMode ? 'text-yellow-500/50' : 'text-amber-500/50'
                      }`} size={18} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm md:text-base ${
                          isDarkMode 
                            ? 'bg-slate-800 border-yellow-500/30 text-white' 
                            : 'bg-amber-50 border-amber-300 text-slate-900'
                        } border focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${
                        isDarkMode ? 'text-yellow-400' : 'text-amber-700'
                      }`}>
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-3.5 ${
                          isDarkMode ? 'text-yellow-500/50' : 'text-amber-500/50'
                        }`} size={18} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm md:text-base ${
                            isDarkMode 
                              ? 'bg-slate-800 border-yellow-500/30 text-white' 
                              : 'bg-amber-50 border-amber-300 text-slate-900'
                          } border focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-bold mb-2 ${
                        isDarkMode ? 'text-yellow-400' : 'text-amber-700'
                      }`}>
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className={`absolute left-3 top-3.5 ${
                          isDarkMode ? 'text-yellow-500/50' : 'text-amber-500/50'
                        }`} size={18} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm md:text-base ${
                            isDarkMode 
                              ? 'bg-slate-800 border-yellow-500/30 text-white' 
                              : 'bg-amber-50 border-amber-300 text-slate-900'
                          } border focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-bold mb-2 ${
                      isDarkMode ? 'text-yellow-400' : 'text-amber-700'
                    }`}>
                      Your Message
                    </label>
                    <div className="relative">
                      <MessageSquare className={`absolute left-3 top-3.5 ${
                        isDarkMode ? 'text-yellow-500/50' : 'text-amber-500/50'
                      }`} size={18} />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm md:text-base ${
                          isDarkMode 
                            ? 'bg-slate-800 border-yellow-500/30 text-white' 
                            : 'bg-amber-50 border-amber-300 text-slate-900'
                        } border focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none`}
                        placeholder="Tell us about your requirements..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 md:py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <Send size={18} />
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}