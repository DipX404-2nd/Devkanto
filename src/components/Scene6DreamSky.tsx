/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DEVKANTO_IMAGES } from '../images';
import ParticleBackground from './ParticleBackground';
import { Sparkles, Star, ChevronRight, ChevronLeft, Heart } from 'lucide-react';

interface Scene6DreamSkyProps {
  onNext: () => void;
  onBack: () => void;
}

interface CustomLantern {
  id: number;
  x: number; // percentage width
  size: number;
  speed: number;
  sway: number;
}

export default function Scene6DreamSky({ onNext, onBack }: Scene6DreamSkyProps) {
  const [releasedLanterns, setReleasedLanterns] = useState<CustomLantern[]>([]);
  const [releasedCount, setReleasedCount] = useState(0);

  // Use the yellow saree image as the blended backdrop constellation
  const constellationPhoto = DEVKANTO_IMAGES[1]?.src || '';

  const handleReleaseLantern = (e: MouseEvent<HTMLDivElement>) => {
    // Release a custom interactive lantern at clicked X coordinate
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;

    const newLantern: CustomLantern = {
      id: releasedCount,
      x: clickX,
      size: Math.random() * 12 + 8,
      speed: Math.random() * 0.4 + 0.3,
      sway: Math.random() * 100
    };

    setReleasedLanterns((prev) => [...prev, newLantern]);
    setReleasedCount((prev) => prev + 1);
  };

  return (
    <div 
      id="scene-sky" 
      onClick={handleReleaseLantern}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between text-white py-12 px-4 cursor-pointer"
    >
      {/* Background Blended Constellation Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-100 opacity-20 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url(${constellationPhoto})`,
          filter: 'contrast(1.2) brightness(0.6) saturate(0.8)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050512] via-[#0e0a25]/90 to-[#03010a] pointer-events-none" />

      {/* Particle System for hundreds of stars and automatic lanterns */}
      <ParticleBackground mode="sky" interactive={false} />

      {/* Interactive Released Lanterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {releasedLanterns.map((l) => (
          <motion.div
            key={`released-lantern-${l.id}`}
            initial={{ y: window.innerHeight + 50, x: `${l.x}%`, opacity: 0.9, scale: 0.8 }}
            animate={{
              y: -100,
              x: [
                `${l.x}%`, 
                `${l.x + Math.sin(l.sway) * 5}%`, 
                `${l.x - Math.sin(l.sway + 1) * 3}%`
              ],
              opacity: [0.9, 0.9, 0]
            }}
            transition={{
              y: { duration: 15 / l.speed, ease: 'linear' },
              x: { duration: 15 / l.speed, ease: 'easeInOut', repeat: Infinity }
            }}
            className="absolute"
            style={{
              width: `${l.size}px`,
              height: `${l.size * 1.3}px`
            }}
          >
            {/* The Lantern Glowing Shape */}
            <div 
              className="w-full h-full rounded-t-xl bg-gradient-to-b from-amber-400 via-orange-500 to-rose-600 shadow-[0_0_20px_rgba(245,158,11,0.6)]"
              style={{
                borderRadius: '50% 50% 30% 30% / 60% 60% 40% 40%'
              }}
            />
            {/* Small fire core inside lantern */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-yellow-200 animate-pulse shadow-[0_0_5px_#f59e0b]" />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header id="sky-header" className="relative z-10 w-full max-w-4xl mx-auto text-center mt-4 pointer-events-none select-none">
        <motion.div
          id="sky-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-pink-300 font-mono text-xs uppercase tracking-widest mb-2"
        >
          <Sparkles size={14} className="text-yellow-300" />
          The Celestial Sky
        </motion.div>
        
        <motion.h2
          id="sky-heading"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-rose-200 via-pink-200 to-indigo-100 bg-clip-text text-transparent leading-tight"
        >
          A Sky Written for You ✨
        </motion.h2>
        
        <motion.p
          id="sky-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 text-xs md:text-sm mt-3 max-w-md mx-auto leading-relaxed"
        >
          Tap anywhere on the celestial sky to release your own glowing paper lantern and send your wishes into the stars.
        </motion.p>
      </header>

      {/* Constellation overlay hint */}
      <main id="sky-main" className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pointer-events-none select-none my-6">
        <motion.div
          id="constellation-star"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="flex flex-col items-center gap-2"
        >
          {/* Subtle connecting constellation lines decoration */}
          <div className="relative w-36 h-36 border border-dashed border-pink-400/20 rounded-full flex items-center justify-center animate-spin-slow">
            <Star size={24} className="text-yellow-200 fill-current absolute top-0" />
            <Star size={20} className="text-pink-300 fill-current absolute bottom-0" />
            <Star size={18} className="text-purple-300 fill-current absolute left-0" />
            <Star size={16} className="text-indigo-300 fill-current absolute right-0" />
          </div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-pink-300/60 mt-4">
            Constellation Devkanto
          </p>
        </motion.div>
      </main>

      {/* Footer Navigation */}
      <footer id="sky-footer" className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between px-4 mt-2">
        <motion.button
          id="sky-back-btn"
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation(); // Avoid triggering lantern release
            onBack();
          }}
          className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition bg-white/5 border border-white/10 px-4 py-2.5 rounded-full backdrop-blur-md cursor-pointer pointer-events-auto"
        >
          <ChevronLeft size={16} />
          The Cake
        </motion.button>

        <span className="text-xs font-mono text-pink-400/50 tracking-widest uppercase">
          Lantern release: {releasedLanterns.length}
        </span>

        <motion.button
          id="sky-next-btn"
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation(); // Avoid triggering lantern release
            onNext();
          }}
          className="flex items-center gap-2 text-xs font-mono text-pink-300 hover:text-white transition bg-pink-500/10 border border-pink-400/20 px-5 py-2.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.15)] cursor-pointer pointer-events-auto"
        >
          Grand Finale
          <ChevronRight size={16} />
        </motion.button>
      </footer>
    </div>
  );
}
