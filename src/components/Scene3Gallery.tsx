/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DEVKANTO_IMAGES, DevkantoImage } from '../images';
import ParticleBackground from './ParticleBackground';
import { Sparkles, Maximize2, X, ChevronRight, ChevronLeft, Heart } from 'lucide-react';

interface Scene3GalleryProps {
  onNext: () => void;
  onBack: () => void;
}

export default function Scene3Gallery({ onNext, onBack }: Scene3GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<DevkantoImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const openLightbox = (image: DevkantoImage, index: number) => {
    setSelectedImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    let nextIndex = lightboxIndex;
    if (direction === 'next') {
      nextIndex = (lightboxIndex + 1) % DEVKANTO_IMAGES.length;
    } else {
      nextIndex = (lightboxIndex - 1 + DEVKANTO_IMAGES.length) % DEVKANTO_IMAGES.length;
    }
    setSelectedImage(DEVKANTO_IMAGES[nextIndex]);
    setLightboxIndex(nextIndex);
  };

  return (
    <div id="scene-gallery" className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between text-white py-12 px-4 md:px-8">
      {/* Background with deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#150a21] to-[#070110]" />
      
      {/* Sparkles / Bokeh particle system */}
      <ParticleBackground mode="gallery" interactive={true} />

      {/* Header */}
      <header id="gallery-header" className="relative z-10 w-full max-w-4xl mx-auto text-center mt-4">
        <motion.div
          id="gallery-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-pink-300 font-mono text-xs uppercase tracking-widest mb-2"
        >
          <Sparkles size={14} className="text-yellow-300" />
          The Premium Gallery
        </motion.div>
        
        <motion.h2
          id="gallery-heading"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-rose-200 via-pink-200 to-indigo-100 bg-clip-text text-transparent leading-tight"
        >
          Capturing Your Sparkle ✨
        </motion.h2>
        
        <motion.p
          id="gallery-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 text-xs md:text-sm mt-3 max-w-md mx-auto leading-relaxed"
        >
          Click on any memory to explore it in full detail inside our high-end luxury frame.
        </motion.p>
      </header>

      {/* Grid of Devkanto's Images */}
      <main id="gallery-grid-container" className="relative z-10 w-full max-w-5xl mx-auto my-10 flex-1 flex items-center justify-center">
        <div id="gallery-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-2">
          {DEVKANTO_IMAGES.map((image, index) => (
            <motion.div
              key={image.id}
              id={`gallery-item-${image.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: 'easeOut' }}
              whileHover={{ 
                y: -8, 
                boxShadow: '0 15px 35px rgba(255, 182, 197, 0.2)',
                borderColor: 'rgba(244, 143, 177, 0.4)'
              }}
              onClick={() => openLightbox(image, index)}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden group cursor-pointer shadow-lg transition-all aspect-[4/5] flex flex-col justify-between p-3"
            >
              {/* Image Frame */}
              <div className="relative w-full h-[82%] rounded-xl overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                
                {/* Dark Hover Mask */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
                  >
                    <Maximize2 size={18} />
                  </motion.div>
                </div>

                {/* Vibe Badge */}
                <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] uppercase font-mono tracking-wider text-pink-300">
                  {image.vibe}
                </span>
              </div>

              {/* Text label */}
              <div className="pt-2 px-1 text-left">
                <h3 className="text-sm font-medium text-pink-100 group-hover:text-pink-300 transition-colors truncate">
                  {image.title}
                </h3>
                <p className="text-[10px] text-gray-400 font-light truncate mt-0.5">
                  {image.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Navigation Footer */}
      <footer id="gallery-footer" className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between px-4 mt-2">
        <motion.button
          id="gallery-back-btn"
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition bg-white/5 border border-white/10 px-4 py-2.5 rounded-full backdrop-blur-md cursor-pointer"
        >
          <ChevronLeft size={16} />
          The Tunnel
        </motion.button>

        <span className="text-xs font-mono text-pink-400/50 tracking-widest uppercase">
          Devkanto's Gallery ✨
        </span>

        <motion.button
          id="gallery-next-btn"
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="flex items-center gap-2 text-xs font-mono text-pink-300 hover:text-white transition bg-pink-500/10 border border-pink-400/20 px-5 py-2.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.15)] cursor-pointer"
        >
          Birthday Wishes
          <ChevronRight size={16} />
        </motion.button>
      </footer>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            id="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4"
          >
            {/* Close Button */}
            <motion.button
              id="lightbox-close-btn"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition cursor-pointer z-50"
            >
              <X size={20} />
            </motion.button>

            {/* Left Nav Button */}
            <motion.button
              id="lightbox-prev-btn"
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition cursor-pointer z-50 hidden md:flex"
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Right Nav Button */}
            <motion.button
              id="lightbox-next-btn"
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition cursor-pointer z-50 hidden md:flex"
            >
              <ChevronRight size={24} />
            </motion.button>

            {/* Lightbox Content Card */}
            <motion.div
              id="lightbox-content"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg md:max-w-xl aspect-[3/4] max-h-[80vh] rounded-3xl border border-white/15 bg-white/5 overflow-hidden flex flex-col justify-between p-4 shadow-[0_0_60px_rgba(255,183,197,0.15)]"
            >
              {/* Fullscreen Image Frame */}
              <div className="relative w-full h-[82%] rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Vibe badge on top */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase font-mono tracking-widest text-pink-300">
                  {selectedImage.vibe}
                </span>

                {/* Sparkling particles container inside image */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={`sparkle-${i}`}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.5, 1, 0.5],
                        y: [-20, -100]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                      className="absolute text-yellow-300/40"
                      style={{
                        left: `${Math.random() * 100}%`,
                        bottom: '5%'
                      }}
                    >
                      ✦
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Text / Captions details */}
              <div className="text-center pt-4 pb-2 px-2 flex flex-col items-center">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-pink-100 flex items-center gap-2">
                  <Heart size={16} className="text-rose-400 fill-current animate-pulse" />
                  {selectedImage.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-300 font-light mt-2 max-w-md leading-relaxed">
                  {selectedImage.description}
                </p>
                <span className="text-[10px] font-mono text-gray-500 mt-3 uppercase tracking-widest">
                  Photo {lightboxIndex + 1} of {DEVKANTO_IMAGES.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
