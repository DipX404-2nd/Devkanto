/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ParticleBackground from './ParticleBackground';
import { Sparkles, MailOpen, Mail, ChevronRight, ChevronLeft, Heart } from 'lucide-react';

interface Scene4MessageProps {
  onNext: () => void;
  onBack: () => void;
}

export default function Scene4Message({ onNext, onBack }: Scene4MessageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="scene-message" className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between text-white py-12 px-4">
      {/* Background with warm violet/midnight gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1c0c24] to-[#0a0314]" />
      
      {/* Particle Background */}
      <ParticleBackground mode="dreamy" interactive={true} />

      {/* Header */}
      <header id="message-header" className="relative z-10 w-full max-w-4xl mx-auto text-center mt-4">
        <motion.div
          id="message-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-pink-300 font-mono text-xs uppercase tracking-widest mb-2"
        >
          <Sparkles size={14} className="text-yellow-300 animate-pulse" />
          A Special Letter
        </motion.div>
        
        <motion.h2
          id="message-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-rose-200 via-pink-200 to-indigo-100 bg-clip-text text-transparent"
        >
          Wishes Wrapped In Love
        </motion.h2>
      </header>

      {/* Main Interactive Envelope / Letter Area */}
      <main id="message-container" className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center justify-center my-6 flex-1 perspective-1000">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Envelope Card */
            <motion.div
              key="closed-envelope"
              initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotateX: 15 }}
              transition={{ duration: 0.8, type: 'spring' }}
              onClick={() => setIsOpen(true)}
              className="w-full max-w-sm aspect-[4/3] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer group shadow-[0_0_35px_rgba(236,72,153,0.1)] hover:shadow-[0_0_50px_rgba(236,72,153,0.25)] hover:border-pink-300/40 transition-all duration-500"
            >
              {/* Pulsing seal */}
              <motion.div
                id="envelope-seal"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,143,177,0.4)] border border-pink-300/20 mb-6 group-hover:rotate-12 transition-transform"
              >
                <Mail size={32} className="text-white" />
              </motion.div>

              <h3 className="text-xl font-medium tracking-tight bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
                To Disha ❤️
              </h3>
              <p className="text-gray-400 text-xs mt-3 leading-relaxed max-w-xs font-light">
                Click on the golden seal to unlock the heartfelt birthday message written just for you.
              </p>

              <motion.button
                id="open-letter-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 px-5 py-2 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs uppercase tracking-widest font-mono flex items-center gap-2"
              >
                Open Letter
                <MailOpen size={14} />
              </motion.button>
            </motion.div>
          ) : (
            /* Opened Letter Card */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, y: 100, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, y: -100, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 120, duration: 0.8 }}
              className="w-full max-w-md rounded-3xl border-2 border-pink-300/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(255,182,197,0.2)] flex flex-col justify-between"
            >
              {/* Elegant borders and gold sparkles */}
              <div className="absolute top-4 left-4 text-pink-300/40">✨</div>
              <div className="absolute top-4 right-4 text-pink-300/40">✨</div>
              <div className="absolute bottom-4 left-4 text-pink-300/40">❤️</div>
              <div className="absolute bottom-4 right-4 text-pink-300/40">✨</div>

              {/* Heart Seal Indicator at Top of Letter */}
              <div className="flex justify-center mb-4">
                <motion.div
                  id="letter-heart"
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-400/20 flex items-center justify-center text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                >
                  <Heart size={20} className="fill-current" />
                </motion.div>
              </div>

              {/* Letter Body Text */}
              <div id="letter-body" className="flex-1 flex flex-col justify-center text-center space-y-6 my-4 px-2">
                <p className="font-serif italic text-rose-300 text-lg md:text-xl font-medium tracking-wide">
                  Dearest Disha,
                </p>
                
                {/* Main emotional wish text */}
                <p className="font-sans text-sm md:text-base text-gray-200 font-light leading-relaxed tracking-wide">
                  "May this year bring endless happiness, beautiful memories, success, laughter, and everything that makes you smile."
                </p>

                <p className="font-sans text-sm md:text-base text-gray-200 font-light leading-relaxed tracking-wide">
                  "You deserve all the joy, the peace, and the magic in the world. May your days be as glowing and spectacular as you are."
                </p>

                {/* Big birthday greeting */}
                <h3 className="text-xl md:text-2xl font-bold tracking-wide bg-gradient-to-r from-pink-300 via-rose-300 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(244,143,177,0.3)] mt-2">
                  Happy Birthday, Disha ❤️
                </h3>
              </div>

              {/* Reset Letter Button */}
              <div className="flex justify-center mt-6">
                <button
                  id="close-letter-btn"
                  onClick={() => setIsOpen(false)}
                  className="text-[10px] font-mono text-gray-400 hover:text-white uppercase tracking-widest cursor-pointer transition"
                >
                  Close & Fold Envelope
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <footer id="message-footer" className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between px-4 mt-2">
        <motion.button
          id="message-back-btn"
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition bg-white/5 border border-white/10 px-4 py-2.5 rounded-full backdrop-blur-md cursor-pointer"
        >
          <ChevronLeft size={16} />
          The Gallery
        </motion.button>

        <span className="text-xs font-mono text-pink-400/50 tracking-widest uppercase">
          Birthday Wish 🌸
        </span>

        <motion.button
          id="message-next-btn"
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="flex items-center gap-2 text-xs font-mono text-pink-300 hover:text-white transition bg-pink-500/10 border border-pink-400/20 px-5 py-2.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.15)] cursor-pointer"
        >
          The Birthday Cake
          <ChevronRight size={16} />
        </motion.button>
      </footer>
    </div>
  );
}
