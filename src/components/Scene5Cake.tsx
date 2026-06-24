/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ParticleBackground from './ParticleBackground';
import { Sparkles, Flame, Check, ChevronRight, ChevronLeft, Heart } from 'lucide-react';

interface Scene5CakeProps {
  onNext: () => void;
  onBack: () => void;
}

interface Candle {
  id: number;
  isLit: boolean;
  xOffset: string; // positioning percentage
  height: string;
}

export default function Scene5Cake({ onNext, onBack }: Scene5CakeProps) {
  const [candles, setCandles] = useState<Candle[]>([
    { id: 1, isLit: false, xOffset: '30%', height: 'h-14' },
    { id: 2, isLit: true, xOffset: '50%', height: 'h-16' }, // Middle one is already lit or we can light all
    { id: 3, isLit: false, xOffset: '70%', height: 'h-14' },
  ]);
  const [wishMade, setWishMade] = useState(false);
  const [isCut, setIsCut] = useState(false);
  const [celebrationMode, setCelebrationMode] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; size: number; rotate: number }[]>([]);

  // Function to light/snuff specific candle
  const handleToggleCandle = (id: number) => {
    if (isCut) return; // Can't light after cutting
    setCandles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isLit: !c.isLit } : c))
    );
  };

  const handleMakeWish = () => {
    setWishMade(true);
    // Create a cute alert/bubble of wishes rising up
  };

  const handleCutCake = () => {
    setIsCut(true);
    setCelebrationMode(true);
    
    // Extinguish candles
    setCandles((prev) => prev.map((c) => ({ ...c, isLit: false })));

    // Generate confetti objects for local explosion
    const newConfetti = [...Array(120)].map((_, i) => {
      const colors = ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#eab308', '#3b82f6', '#10b981'];
      return {
        id: i,
        x: 35 + Math.random() * 30, // center it near cake
        y: 40 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 6,
        rotate: Math.random() * 360,
      };
    });
    setConfetti(newConfetti);
  };

  const allCandlesLit = candles.every((c) => c.isLit);
  const anyCandleLit = candles.some((c) => c.isLit);

  return (
    <div id="scene-cake" className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between text-white py-12 px-4">
      {/* Background with party mood gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#210924] to-[#070110]" />
      
      {/* Dynamic Background Particles */}
      <ParticleBackground mode={celebrationMode ? 'fireworks' : 'cake'} interactive={true} />

      {/* Header */}
      <header id="cake-header" className="relative z-10 w-full max-w-4xl mx-auto text-center mt-4">
        <motion.div
          id="cake-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-pink-300 font-mono text-xs uppercase tracking-widest mb-2"
        >
          <Sparkles size={14} className="text-yellow-300 animate-spin-slow" />
          Interactive Celebration
        </motion.div>
        
        <motion.h2
          id="cake-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-rose-200 via-pink-200 to-indigo-100 bg-clip-text text-transparent"
        >
          Make a Wish, Disha 🎂
        </motion.h2>
        
        <motion.p
          id="cake-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 text-xs md:text-sm mt-3 max-w-md mx-auto leading-relaxed"
        >
          {!anyCandleLit && !isCut
            ? 'Tap the candles to light them up and spark the magic.'
            : !wishMade && !isCut
            ? 'Close your eyes, hold a beautiful dream in your heart, and tap Make a Wish!'
            : !isCut
            ? 'Ready? Click Cut the Cake to unleash the ultimate celebration!'
            : 'Happy Cake Day! The sky is celebrating your special day! 🎉'}
        </motion.p>
      </header>

      {/* Main Cake Area */}
      <main id="cake-main" className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center justify-center my-6 flex-1 perspective-1000">
        
        {/* Wish Bubbles Animating upwards */}
        {wishMade && !isCut && (
          <div className="absolute inset-x-0 top-0 h-40 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`wish-bubble-${i}`}
                initial={{ y: 200, x: 150 + Math.sin(i) * 60, opacity: 0, scale: 0.5 }}
                animate={{ y: -50, opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.7 }}
                className="absolute text-pink-300/40 font-mono text-xs flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
              >
                <Heart size={10} className="fill-current text-rose-400" />
                <span>Happy Dream ✨</span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Local Confetti Explosion Particles */}
        <AnimatePresence>
          {celebrationMode && confetti.length > 0 && (
            <div className="absolute inset-0 pointer-events-none">
              {confetti.map((c) => {
                const angle = (Math.random() - 0.5) * Math.PI * 2;
                const distance = 150 + Math.random() * 200;
                return (
                  <motion.div
                    key={`confetti-${c.id}`}
                    initial={{ x: `${c.x}%`, y: `${c.y}%`, opacity: 1, scale: 0.5, rotate: c.rotate }}
                    animate={{
                      x: `${c.x + Math.cos(angle) * (distance / 5)}%`,
                      y: `${c.y + Math.sin(angle) * (distance / 5) + 30}%`, // gravity pull
                      opacity: 0,
                      scale: [1, 1.2, 0.3],
                      rotate: c.rotate + 360,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.2, ease: 'easeOut' }}
                    className="absolute rounded-sm"
                    style={{
                      width: `${c.size}px`,
                      height: `${c.size * 1.5}px`,
                      backgroundColor: c.color,
                      boxShadow: `0 0 10px ${c.color}60`,
                    }}
                  />
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Visual Cake Representation */}
        <div id="visual-cake" className="relative w-72 md:w-80 flex flex-col items-center">
          
          {/* Animated Slicing Knife */}
          <AnimatePresence>
            {isCut && (
              <motion.div
                initial={{ opacity: 0, rotate: -45, x: 100, y: -100 }}
                animate={{ opacity: [0, 1, 1, 0], rotate: [-45, 0, 10, -45], x: [100, 10, 0, 100], y: [-100, -50, 0, -100] }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
                className="absolute z-30 pointer-events-none text-gray-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                style={{ top: '-40px' }}
              >
                {/* Custom knife SVG */}
                <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor">
                  <path d="M10,20 L80,20 L100,35 L10,35 Z" fill="url(#silver-grad)" stroke="#ffffff" strokeWidth="1" />
                  <rect x="0" y="22" width="12" height="10" rx="3" fill="#8B4513" />
                  <defs>
                    <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#b0b0b0" />
                      <stop offset="100%" stopColor="#707070" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Candles Container */}
          <div className="absolute top-[-50px] w-full h-16 flex justify-center items-end pointer-events-auto z-20">
            {candles.map((candle) => (
              <div
                key={candle.id}
                id={`candle-${candle.id}`}
                onClick={() => handleToggleCandle(candle.id)}
                className="absolute flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
                style={{ left: candle.xOffset, transform: 'translateX(-50%)' }}
              >
                {/* Flickering Candle Flame */}
                <AnimatePresence>
                  {candle.isLit && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [1, 1.15, 0.95, 1],
                        opacity: 1,
                        y: [0, -2, 1, 0],
                        skewX: [0, 3, -3, 0]
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.8,
                        ease: 'easeInOut'
                      }}
                      className="absolute top-[-30px] flex flex-col items-center"
                    >
                      {/* Outer flame glow */}
                      <div className="w-5 h-7 rounded-full bg-orange-500/30 filter blur-sm absolute top-[-5px]" />
                      {/* Mid flame */}
                      <div className="w-3.5 h-5.5 rounded-full bg-amber-500 absolute top-0 shadow-[0_0_8px_#f59e0b]" />
                      {/* Core hot flame */}
                      <div className="w-2 h-3.5 rounded-full bg-yellow-200 absolute top-1.5" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Candle Wick */}
                <div className="w-0.5 h-2.5 bg-gray-600" />

                {/* Candle Body */}
                <div className={`w-3.5 ${candle.height} rounded-t-sm bg-gradient-to-b from-pink-400 via-purple-400 to-rose-400 border border-white/20 shadow-lg relative overflow-hidden`}>
                  {/* Decorative stripes */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff33_25%,transparent_25%,transparent_50%,#ffffff33_50%,#ffffff33_75%,transparent_75%,transparent)] bg-[size:10px_10px]" />
                </div>
              </div>
            ))}
          </div>

          {/* Cake Layers */}
          <div className="relative w-full flex flex-col items-center">
            
            {/* Top Tier (Smallest) */}
            <motion.div
              id="cake-tier-1"
              animate={isCut ? { y: 2, scaleX: 1.02 } : {}}
              className="w-40 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg relative flex flex-col justify-between overflow-hidden z-10"
            >
              {/* Frosting Swirl Trim */}
              <div className="w-full h-4 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 rounded-t-2xl relative flex justify-around items-center px-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                ))}
              </div>
              {/* Inside detail decoration (Strawberry pieces) */}
              <div className="flex justify-around px-4 pb-2 text-[10px]">🍓 🌸 🍓</div>
            </motion.div>

            {/* Middle Tier */}
            <motion.div
              id="cake-tier-2"
              animate={isCut ? { y: 1, scaleX: 1.03 } : {}}
              className="w-56 h-18 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg relative flex flex-col justify-between overflow-hidden mt-[-8px] z-5"
            >
              {/* Frosting Swirl Trim */}
              <div className="w-full h-4 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 rounded-t-2xl relative flex justify-around items-center px-4">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                ))}
              </div>
              <div className="flex justify-around px-8 pb-3 text-xs">✨ 🍫 ✨ 🍫 ✨</div>
            </motion.div>

            {/* Bottom Tier (Largest) */}
            <motion.div
              id="cake-tier-3"
              animate={isCut ? { scaleX: 1.05 } : {}}
              className="w-72 h-22 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg relative flex flex-col justify-between overflow-hidden mt-[-8px]"
            >
              {/* Frosting Trim */}
              <div className="w-full h-5 bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300 rounded-t-2xl relative flex justify-around items-center px-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-white shadow-md" />
                ))}
              </div>
              {/* Glowing birthday greeting printed on cake */}
              <div className="text-center font-mono text-[9px] uppercase tracking-widest text-pink-300 pb-4 flex items-center justify-center gap-1.5 font-bold">
                <Heart size={10} className="text-rose-500 fill-current" />
                Disha's Birthday Cake
                <Heart size={10} className="text-rose-500 fill-current" />
              </div>
            </motion.div>

            {/* Cake Stand / Tray */}
            <div className="w-80 h-3 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 rounded-full border border-yellow-300/30 shadow-[0_10px_25px_rgba(234,179,8,0.2)] mt-[-4px]" />
            <div className="w-36 h-6 bg-gradient-to-b from-yellow-100 to-amber-300/40 rounded-b-xl border-x border-yellow-300/20" />
          </div>
        </div>

        {/* Dynamic Buttons depending on lit status */}
        <div id="cake-interactive-buttons" className="mt-8 flex flex-wrap gap-4 justify-center items-center">
          
          {/* Light Candle Hint */}
          {!anyCandleLit && !isCut && (
            <motion.div
              id="candle-hint-alert"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-400/20 text-yellow-200 text-xs tracking-wider font-mono flex items-center gap-2"
            >
              <Flame size={14} className="text-yellow-400 animate-pulse" />
              Tap the candles to light them up!
            </motion.div>
          )}

          {/* Make a Wish Button */}
          {anyCandleLit && !wishMade && !isCut && (
            <motion.button
              id="make-wish-btn"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMakeWish}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold tracking-wider text-xs uppercase cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.3)] border border-yellow-300/30 flex items-center gap-2"
            >
              Make a Wish ✨
            </motion.button>
          )}

          {/* Cut Cake Button */}
          {anyCandleLit && wishMade && !isCut && (
            <motion.button
              id="cut-cake-btn"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(244,63,94,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCutCake}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold tracking-wider text-xs uppercase cursor-pointer border border-pink-300/30 flex items-center gap-2"
            >
              Cut the Cake 🎂
            </motion.button>
          )}

          {/* Finished Confirmation */}
          {isCut && (
            <motion.div
              id="celebration-ready-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 py-2.5 rounded-full bg-green-500/10 border border-green-400/20 text-green-300 text-xs tracking-wider font-mono flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
            >
              <Check size={16} />
              Beautiful Dream Released!
            </motion.div>
          )}

        </div>
      </main>

      {/* Footer Navigation */}
      <footer id="cake-footer" className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between px-4 mt-2">
        <motion.button
          id="cake-back-btn"
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition bg-white/5 border border-white/10 px-4 py-2.5 rounded-full backdrop-blur-md cursor-pointer"
        >
          <ChevronLeft size={16} />
          The Message
        </motion.button>

        <span className="text-xs font-mono text-pink-400/50 tracking-widest uppercase">
          Birthday Feast 🍓
        </span>

        <motion.button
          id="cake-next-btn"
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="flex items-center gap-2 text-xs font-mono text-pink-300 hover:text-white transition bg-pink-500/10 border border-pink-400/20 px-5 py-2.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.15)] cursor-pointer"
        >
          Dream Sky Celebration
          <ChevronRight size={16} />
        </motion.button>
      </footer>
    </div>
  );
}
