/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DISHA_IMAGES } from '../images';
import ParticleBackground from './ParticleBackground';
import { ChevronRight, ChevronLeft, Sparkles, Heart } from 'lucide-react';

interface Scene2TunnelProps {
  onNext: () => void;
  onBack: () => void;
}

export default function Scene2Tunnel({ onNext, onBack }: Scene2TunnelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for back, 1 for forward
  const [progress, setProgress] = useState(0);

  // Auto-advance memories every 6 seconds
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextImage();
          return 0;
        }
        return prev + 1.67; // approx 100% over 6 seconds (100 / 60 iterations per sec)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNextImage = () => {
    setDirection(1);
    if (currentIndex < DISHA_IMAGES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished all memories, proceed to next scene (Gallery)
      onNext();
    }
  };

  const handlePrevImage = () => {
    setDirection(-1);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  const currentImage = DISHA_IMAGES[currentIndex];

  // Framer Motion variants for sliding tunnel transition
  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 0.8,
      x: dir > 0 ? 300 : -300,
      rotateY: dir > 0 ? 45 : -45,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 1.2,
      x: dir > 0 ? -300 : 300,
      rotateY: dir > 0 ? -45 : 45,
      transition: {
        duration: 0.8,
        ease: 'easeIn',
      },
    }),
  };

  return (
    <div id="scene-tunnel" className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-between text-white py-12 px-4 select-none">
      {/* Background of current image with high blur and heavy dark violet overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
        style={{ 
          backgroundImage: `url(${currentImage?.src})`,
          filter: 'blur(15px) brightness(0.2)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a]/95 via-[#140b24]/90 to-[#07020d]/95" />

      {/* Particle background with specialized 'tunnel' radiating star effect */}
      <ParticleBackground mode="tunnel" interactive={false} />

      {/* Scene Header */}
      <header id="tunnel-header" className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center mt-4">
        <motion.div
          id="tunnel-title-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 text-pink-300 font-mono text-xs uppercase tracking-widest mb-2"
        >
          <Sparkles size={14} className="text-yellow-300 animate-spin-slow" />
          The Memory Tunnel
          <Heart size={12} className="text-pink-400 fill-current" />
        </motion.div>
        
        <motion.h2
          id="tunnel-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-2xl md:text-3xl font-sans tracking-tight bg-gradient-to-r from-rose-200 via-pink-100 to-indigo-200 bg-clip-text text-transparent mb-6"
        >
          A Journey Through Your Smiles
        </motion.h2>

        {/* Top Memory Segment Indicators */}
        <div id="tunnel-indicators" className="flex justify-center gap-2 w-full max-w-xs md:max-w-md">
          {DISHA_IMAGES.map((_, index) => (
            <div
              key={`indicator-${index}`}
              id={`indicator-${index}`}
              className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-100`}
                style={{
                  width:
                    index < currentIndex
                      ? '100%'
                      : index === currentIndex
                      ? `${progress}%`
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>
      </header>

      {/* Center Cinematic Card */}
      <main id="tunnel-main" className="relative z-10 w-full max-w-lg flex items-center justify-center my-8 perspective-1000">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            id={`memory-card-${currentIndex}`}
            className="w-full max-w-[340px] md:max-w-[380px] aspect-[3/4] rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(255,183,197,0.1)] p-4 md:p-5 flex flex-col justify-between group cursor-grab active:cursor-grabbing"
          >
            {/* The Image inside Glass Frame */}
            <div className="relative w-full h-[78%] rounded-2xl overflow-hidden border border-white/10 shadow-inner">
              <img
                src={currentImage?.src}
                alt={currentImage?.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Image Vibe Stamp */}
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] uppercase font-mono tracking-wider text-pink-300">
                {currentImage?.vibe}
              </span>
            </div>

            {/* Description & Poetry */}
            <div className="flex flex-col text-center pt-3 md:pt-4">
              <h3 className="text-lg md:text-xl font-medium tracking-tight bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
                {currentImage?.title}
              </h3>
              <p className="text-gray-300 text-xs mt-1 md:mt-2 px-1 font-light leading-relaxed">
                {currentImage?.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <footer id="tunnel-footer" className="relative z-10 w-full max-w-xl flex items-center justify-between px-6">
        <motion.button
          id="tunnel-prev-btn"
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevImage}
          className="flex items-center gap-2 text-xs md:text-sm font-mono text-gray-400 hover:text-white transition bg-white/5 border border-white/10 px-4 py-2.5 rounded-full backdrop-blur-md cursor-pointer"
        >
          <ChevronLeft size={16} />
          {currentIndex === 0 ? 'Home' : 'Back'}
        </motion.button>

        <span className="text-xs font-mono text-pink-300/60 tracking-widest">
          MEMORY {currentIndex + 1} OF {DISHA_IMAGES.length}
        </span>

        <motion.button
          id="tunnel-next-btn"
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextImage}
          className="flex items-center gap-2 text-xs md:text-sm font-mono text-pink-300 hover:text-white transition bg-pink-500/10 border border-pink-400/20 px-5 py-2.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.15)] cursor-pointer"
        >
          {currentIndex === DISHA_IMAGES.length - 1 ? 'Gallery' : 'Next'}
          <ChevronRight size={16} />
        </motion.button>
      </footer>
    </div>
  );
}
