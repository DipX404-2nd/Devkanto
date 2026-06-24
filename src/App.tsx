/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Scene1Opening from './components/Scene1Opening';
import Scene2Tunnel from './components/Scene2Tunnel';
import Scene3Gallery from './components/Scene3Gallery';
import Scene4Message from './components/Scene4Message';
import Scene5Cake from './components/Scene5Cake';
import Scene6DreamSky from './components/Scene6DreamSky';
import Scene7Ending from './components/Scene7Ending';
import { ambientMusic } from './utils/audio';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function App() {
  const [scene, setScene] = useState(1);
  const [isMuted, setIsMuted] = useState(true);

  // Toggle ambient synthesizer chimes
  const handleToggleMute = () => {
    if (isMuted) {
      ambientMusic.play();
      setIsMuted(false);
    } else {
      ambientMusic.stop();
      setIsMuted(true);
    }
  };

  // Ensure music stops if component unmounts
  useEffect(() => {
    return () => {
      ambientMusic.stop();
    };
  }, []);

  // Slide & Fade page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      transition: {
        duration: 0.6,
        ease: 'easeIn',
      },
    },
  };

  return (
    <div id="birthday-app-root" className="relative w-full min-h-screen bg-[#05050f] font-sans overflow-x-hidden selection:bg-pink-500/30 selection:text-white">
      
      {/* Floating Audio Sound controller Widget (Top Right) */}
      <motion.div
        id="audio-widget-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed top-5 right-5 z-50 flex items-center gap-2.5"
      >
        {/* Pulsing "Tap for Music" indicator */}
        {isMuted && scene === 1 && (
          <motion.span
            id="music-hint"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: [0, 1, 1, 0], x: 0 }}
            transition={{ repeat: Infinity, duration: 3, delay: 2 }}
            className="text-[10px] font-mono uppercase tracking-widest text-pink-300 bg-[#0d0a1b]/80 border border-pink-500/20 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg"
          >
            Tap for Music 🎵
          </motion.span>
        )}

        <motion.button
          id="audio-toggle-btn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleMute}
          className={`flex items-center justify-center p-3 rounded-full border backdrop-blur-md shadow-lg cursor-pointer transition-all duration-300 ${
            isMuted
              ? 'bg-white/5 border-white/10 text-gray-400'
              : 'bg-pink-500/20 border-pink-400/40 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
          }`}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-bounce-slow" />}
        </motion.button>
      </motion.div>

      {/* Floating Sparkly Music Note (Visual Only) when unmuted */}
      {!isMuted && (
        <div className="fixed top-6 right-20 z-50 pointer-events-none hidden sm:flex items-center gap-1.5 text-pink-300/60 font-mono text-[10px] uppercase tracking-widest">
          <Music size={11} className="animate-spin-slow" />
          Playing Magic Chimes
        </div>
      )}

      {/* Orchestrating Scenes with smooth transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`scene-wrapper-${scene}`}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full min-h-screen"
        >
          {scene === 1 && (
            <Scene1Opening onStart={() => setScene(2)} />
          )}

          {scene === 2 && (
            <Scene2Tunnel 
              onNext={() => setScene(3)} 
              onBack={() => setScene(1)} 
            />
          )}

          {scene === 3 && (
            <Scene3Gallery 
              onNext={() => setScene(4)} 
              onBack={() => setScene(2)} 
            />
          )}

          {scene === 4 && (
            <Scene4Message 
              onNext={() => setScene(5)} 
              onBack={() => setScene(3)} 
            />
          )}

          {scene === 5 && (
            <Scene5Cake 
              onNext={() => setScene(6)} 
              onBack={() => setScene(4)} 
            />
          )}

          {scene === 6 && (
            <Scene6DreamSky 
              onNext={() => setScene(7)} 
              onBack={() => setScene(5)} 
            />
          )}

          {scene === 7 && (
            <Scene7Ending 
              onRestart={() => setScene(1)} 
              onBack={() => setScene(6)} 
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
