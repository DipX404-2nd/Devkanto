/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { DEVKANTO_IMAGES } from '../images';
import ParticleBackground from './ParticleBackground';
import { Sparkles, Heart } from 'lucide-react';

interface Scene1OpeningProps {
  onStart: () => void;
}

export default function Scene1Opening({ onStart }: Scene1OpeningProps) {
  // Use Devkanto's blue saree photo as the main background
  const mainPhoto = DEVKANTO_IMAGES[0]?.src || '';

  return (
    <div id="scene-opening" className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center text-white px-4">
      {/* Background image with soft blur and luxury gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-105"
        style={{ 
          backgroundImage: `url(${mainPhoto})`,
          filter: 'blur(8px) brightness(0.35)'
        }}
      />
      
      {/* Luxury Color Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a]/80 via-[#1e102f]/70 to-[#0d0415]/90" />

      {/* Responsive Canvas Particles */}
      <ParticleBackground mode="dreamy" interactive={true} />

      {/* Floating Animated Balloons & Hearts in the background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`balloon-${i}`}
            id={`balloon-${i}`}
            className="absolute text-pink-400/20"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100, 
              scale: Math.random() * 0.8 + 0.6 
            }}
            animate={{
              y: -200,
              x: `calc(10% + ${Math.sin(i) * 50}px)`,
              rotate: [0, i % 2 === 0 ? 15 : -15, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2
            }}
          >
            <Heart size={48} className="fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Main Content Card Container */}
      <motion.div
        id="opening-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl text-center px-6 py-12 md:px-12 md:py-16 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(255,183,197,0.15)] flex flex-col items-center"
      >
        {/* Soft floating golden portrait thumbnail of Devkanto */}
        <motion.div
          id="opening-avatar-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1, type: 'spring' }}
          className="relative w-32 h-40 md:w-40 md:h-52 mb-8 rounded-2xl overflow-hidden border-2 border-pink-300/30 shadow-[0_0_30px_rgba(255,183,197,0.3)] group"
        >
          <img
            src={mainPhoto}
            alt="Devkanto Portrait"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e102f]/50 to-transparent" />
          <motion.div
            id="opening-avatar-heart"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute bottom-2 right-2 text-pink-400 drop-shadow-[0_0_5px_rgba(255,100,150,1)]"
          >
            <Heart size={20} className="fill-current" />
          </motion.div>
        </motion.div>

        {/* Cinematic Sparkly Sub-badge */}
        <motion.div
          id="opening-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-xs uppercase tracking-widest font-mono mb-6"
        >
          <Sparkles size={14} className="animate-pulse" />
          26th June — A Magical Day
        </motion.div>

        {/* Beautiful luxury title */}
        <motion.h1
          id="opening-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-4xl md:text-6xl font-bold font-sans tracking-tight bg-gradient-to-r from-rose-200 via-pink-300 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] mb-6 leading-tight"
        >
          Happy Birthday <br className="hidden md:inline" />
          <span className="text-pink-300 drop-shadow-[0_0_20px_rgba(244,143,177,0.5)]">Devkanto</span> ✨
        </motion.h1>

        {/* Emotionally descriptive caption */}
        <motion.p
          id="opening-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-gray-300/90 text-sm md:text-base font-light tracking-wide leading-relaxed max-w-md mb-10"
        >
          "Today is all about celebrating your smile, your happiness, and the beautiful person you are."
        </motion.p>

        {/* Luxury glowing CTA button */}
        <motion.button
          id="begin-journey-btn"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(236, 72, 153, 0.5)' }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          onClick={onStart}
          className="relative px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 font-medium tracking-wider text-sm uppercase shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all cursor-pointer border border-pink-300/30 flex items-center gap-3"
        >
          Begin the Journey
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            ✨
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}
