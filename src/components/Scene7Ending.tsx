/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DEVKANTO_IMAGES } from '../images';
import ParticleBackground from './ParticleBackground';
import { Sparkles, RotateCcw, ChevronLeft, Heart } from 'lucide-react';

interface Scene7EndingProps {
  onRestart: () => void;
  onBack: () => void;
}

export default function Scene7Ending({ onRestart, onBack }: Scene7EndingProps) {
  const [photoIndex, setPhotoIndex] = useState(0);

  // Auto-rotate the collage/focus photo every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % DEVKANTO_IMAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="scene-ending" className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between text-white py-12 px-4">
      {/* Background with deepest cosmic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04040d] via-[#10061e] to-[#020105]" />
      
      {/* Spectacular non-stop fireworks, lanterns, and shooting stars */}
      <ParticleBackground mode="fireworks" interactive={true} />

      {/* Floating Sparkles and Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`gold-dust-${i}`}
            id={`gold-dust-${i}`}
            className="absolute rounded-full bg-yellow-200/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              width: Math.random() * 80 + 40,
              height: Math.random() * 80 + 40,
            }}
            animate={{
              y: -200,
              x: `calc(10% + ${Math.sin(i) * 100}px)`,
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5
            }}
            style={{
              filter: 'blur(30px)'
            }}
          />
        ))}
      </div>

      {/* Header with Golden Badge */}
      <header id="ending-header" className="relative z-10 w-full max-w-4xl mx-auto text-center mt-4">
        <motion.div
          id="ending-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 text-yellow-300 font-mono text-xs uppercase tracking-widest bg-yellow-500/10 border border-yellow-400/20 px-4 py-1.5 rounded-full mb-4 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
        >
          <Sparkles size={14} className="animate-pulse" />
          The Grand Finale
        </motion.div>
      </header>

      {/* Centerpiece Emotional Card with Slow Photo Rotation */}
      <main id="ending-main" className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center justify-center my-4 flex-1">
        
        {/* The rotating beautiful picture frame */}
        <div id="ending-carousel" className="relative w-56 h-72 md:w-64 md:h-80 mb-8 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={photoIndex}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute w-full h-full rounded-2xl border-2 border-pink-300/30 p-2.5 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(255,183,197,0.2)] overflow-hidden"
            >
              <img
                src={DEVKANTO_IMAGES[photoIndex]?.src}
                alt="Devkanto Collage"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Floating flower/rose petals decoration around frame */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`petal-${i}`}
              animate={{
                y: [0, 10, -10, 0],
                rotate: [0, 360],
                x: [0, Math.sin(i) * 15, 0]
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute text-pink-400/30 text-lg pointer-events-none"
              style={{
                top: `${20 + i * 20}%`,
                left: i % 2 === 0 ? '-15%' : '105%'
              }}
            >
              🌸
            </motion.div>
          ))}
        </div>

        {/* Happy Birthday text with beautiful quotes */}
        <div className="text-center max-w-lg px-4 flex flex-col items-center">
          <motion.h1
            id="ending-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="text-4xl md:text-5xl font-bold font-sans tracking-tight bg-gradient-to-r from-rose-200 via-pink-300 to-indigo-100 bg-clip-text text-transparent mb-5 leading-tight text-center drop-shadow-[0_0_20px_rgba(244,143,177,0.4)]"
          >
            Happy Birthday, Devkanto ❤️
          </motion.h1>

          <motion.p
            id="ending-quote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="font-serif italic text-lg md:text-xl text-rose-200/95 font-medium leading-relaxed tracking-wide text-center"
          >
            "May your smile always shine brighter than the stars."
          </motion.p>
          
          <motion.p
            id="ending-subquote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="font-sans text-xs md:text-sm text-gray-400 font-light mt-3 leading-relaxed text-center max-w-sm"
          >
            Thank you for being such an incredibly special person. Wishing you a year as beautiful, radiant, and happy as your heart!
          </motion.p>
        </div>
      </main>

      {/* Footer Navigation & Replay buttons */}
      <footer id="ending-footer" className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 mt-4">
        
        {/* Back Button */}
        <motion.button
          id="ending-back-btn"
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition bg-white/5 border border-white/10 px-4 py-2.5 rounded-full backdrop-blur-md cursor-pointer self-start md:self-auto"
        >
          <ChevronLeft size={16} />
          The Dream Sky
        </motion.button>

        <span className="text-xs font-mono text-pink-500/40 tracking-widest uppercase text-center hidden md:inline">
          Made With Love ❤️
        </span>

        {/* Replay Button */}
        <motion.button
          id="ending-replay-btn"
          whileHover={{ scale: 1.05, rotate: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="flex items-center gap-2.5 text-xs font-mono text-pink-300 hover:text-white transition bg-pink-500/10 border border-pink-400/20 px-6 py-3 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.15)] cursor-pointer"
        >
          <RotateCcw size={15} />
          Replay the Journey
        </motion.button>
      </footer>
    </div>
  );
}
