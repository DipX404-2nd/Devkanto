/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

export type BackgroundMode = 'dreamy' | 'tunnel' | 'gallery' | 'cake' | 'sky' | 'fireworks';

interface ParticleBackgroundProps {
  mode: BackgroundMode;
  interactive?: boolean;
}

export default function ParticleBackground({ mode, interactive = true }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle, Lantern, Star, and Firework classes
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      color: string = '';
      alpha: number = 1;
      decay: number = 0;

      constructor(x?: number, y?: number, customMode?: BackgroundMode) {
        this.reset(x, y, customMode);
      }

      reset(startX?: number, startY?: number, customMode?: BackgroundMode) {
        const m = customMode || mode;
        this.x = startX ?? Math.random() * width;
        this.y = startY ?? (m === 'cake' ? height + 10 : Math.random() * height);
        this.size = Math.random() * 3 + 1;
        
        if (m === 'tunnel') {
          // Tunnel radiating outward
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2 + 0.5;
          this.speedX = Math.cos(angle) * speed;
          this.speedY = Math.sin(angle) * speed;
          this.x = width / 2;
          this.y = height / 2;
          this.size = 0.5;
        } else if (m === 'sky' || m === 'cake') {
          // Slow rise
          this.speedX = (Math.random() - 0.5) * 0.4;
          this.speedY = -(Math.random() * 0.8 + 0.2);
        } else {
          // Floating drift
          this.speedX = (Math.random() - 0.5) * 0.5;
          this.speedY = (Math.random() - 0.5) * 0.5;
        }

        // Color palette based on luxurious theme (Rose Gold, Pink, Lavender, Golden Glow)
        const colors = [
          'rgba(255, 183, 197, ', // Rose Pink
          'rgba(235, 156, 180, ', // Deep Rose
          'rgba(211, 184, 255, ', // Lavender
          'rgba(255, 220, 150, ', // Golden Glow
          'rgba(244, 143, 177, ', // Hot Pink
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.3;
        this.decay = Math.random() * 0.002 + 0.0005;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (mode === 'tunnel') {
          this.size += 0.02; // Grow as they approach
          // Reset if outside viewport
          if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.reset();
          }
        } else {
          // Fade out slightly
          this.alpha -= this.decay;
          if (this.alpha <= 0 || this.y < -20 || this.x < -20 || this.x > width + 20) {
            this.reset(undefined, height + 5);
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        // Add subtle shadow for glow
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = this.color.replace(', ', ')');
        ctx.fill();
        ctx.restore();
      }
    }

    class Star {
      x: number;
      y: number;
      size: number;
      alpha: number;
      flickerSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.8; // mostly upper sky
        this.size = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random();
        this.flickerSpeed = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.alpha += this.flickerSpeed;
        if (this.alpha > 1 || this.alpha < 0.2) {
          this.flickerSpeed = -this.flickerSpeed;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class ShootingStar {
      x: number = 0;
      y: number = 0;
      length: number = 0;
      speed: number = 0;
      angle: number = 0;
      alpha: number = 0;
      active: boolean = false;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width * 0.8;
        this.y = Math.random() * height * 0.3;
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 8 + 6;
        this.angle = Math.PI / 6 + Math.random() * (Math.PI / 12); // around 30 degrees
        this.alpha = 1;
        this.active = Math.random() < 0.05; // active rarely
      }

      update() {
        if (!this.active) {
          if (Math.random() < 0.002) {
            this.reset();
            this.active = true;
          }
          return;
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.015;

        if (this.alpha <= 0 || this.x > width || this.y > height) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active || !ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = 'rgba(255, 230, 200, 1)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length);
        ctx.stroke();
        ctx.restore();
      }
    }

    class Lantern {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      sway: number = 0;
      swaySpeed: number = 0;
      alpha: number = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 200 + 50;
        this.size = Math.random() * 10 + 6;
        this.speedY = -(Math.random() * 0.4 + 0.3);
        this.sway = Math.random() * 100;
        this.swaySpeed = Math.random() * 0.01 + 0.005;
        this.alpha = Math.random() * 0.4 + 0.5;
      }

      update() {
        this.sway += this.swaySpeed;
        this.x += Math.sin(this.sway) * 0.25;
        this.y += this.speedY;

        if (this.y < -50) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // Draw elegant lantern shape (soft glowing rounded trapezoid)
        ctx.shadowBlur = this.size * 1.5;
        ctx.shadowColor = 'rgba(255, 140, 50, 0.8)';
        ctx.fillStyle = 'rgba(255, 140, 50, 0.95)';

        ctx.beginPath();
        const r = this.size;
        ctx.moveTo(this.x - r * 0.6, this.y + r);
        ctx.lineTo(this.x + r * 0.6, this.y + r);
        ctx.lineTo(this.x + r, this.y - r * 0.8);
        ctx.lineTo(this.x - r, this.y - r * 0.8);
        ctx.closePath();
        ctx.fill();

        // Draw smaller inner hot core
        ctx.fillStyle = 'rgba(255, 220, 150, 1)';
        ctx.beginPath();
        ctx.moveTo(this.x - r * 0.3, this.y + r * 0.7);
        ctx.lineTo(this.x + r * 0.3, this.y + r * 0.7);
        ctx.lineTo(this.x + r * 0.6, this.y - r * 0.4);
        ctx.lineTo(this.x - r * 0.6, this.y - r * 0.4);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    }

    class Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      decay: number;
      size: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.color = color;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.vx *= 0.98; // friction
        this.vy *= 0.98;
        this.vy += 0.08; // gravity
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    class FireworkShow {
      x: number = 0;
      y: number = 0;
      targetY: number = 0;
      color: string = '';
      sparks: Spark[] = [];
      state: 'launching' | 'exploded' = 'launching';
      speedY: number = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width * 0.8 + width * 0.1;
        this.y = height + 10;
        this.targetY = Math.random() * height * 0.5 + height * 0.15;
        this.speedY = -(Math.random() * 4 + 7);
        this.state = 'launching';
        this.sparks = [];

        const hue = Math.random() * 360;
        this.color = `hsl(${hue}, 100%, 75%)`;
      }

      update() {
        if (this.state === 'launching') {
          this.y += this.speedY;
          if (this.y <= this.targetY) {
            this.state = 'exploded';
            this.explode();
          }
        } else {
          this.sparks.forEach((s) => s.update());
          this.sparks = this.sparks.filter((s) => s.alpha > 0);
          if (this.sparks.length === 0) {
            this.reset();
          }
        }
      }

      explode() {
        for (let i = 0; i < 60; i++) {
          this.sparks.push(new Spark(this.x, this.y, this.color));
        }
      }

      draw() {
        if (!ctx) return;
        if (this.state === 'launching') {
          ctx.save();
          ctx.beginPath();
          ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.color;
          ctx.fill();
          ctx.restore();
        } else {
          this.sparks.forEach((s) => s.draw());
        }
      }
    }

    // Initialize arrays
    const particles: Particle[] = [];
    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    const lanterns: Lantern[] = [];
    const fireworks: FireworkShow[] = [];

    // Base densities
    const particleCount = mode === 'tunnel' ? 250 : mode === 'cake' ? 60 : 100;
    const starCount = mode === 'sky' || mode === 'fireworks' ? 120 : 60;
    const lanternCount = mode === 'sky' ? 15 : mode === 'fireworks' ? 10 : 0;
    const fireworkCount = mode === 'fireworks' ? 3 : 0;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    if (mode === 'sky' || mode === 'fireworks' || mode === 'dreamy') {
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
      for (let i = 0; i < 3; i++) {
        shootingStars.push(new ShootingStar());
      }
    }

    for (let i = 0; i < lanternCount; i++) {
      lanterns.push(new Lantern());
    }

    for (let i = 0; i < fireworkCount; i++) {
      fireworks.push(new FireworkShow());
    }

    // Handles window resizing properly
    const resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeHandler);

    // Mouse interactive listener
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || mode === 'tunnel') return;
      // Add a couple of particles at mouse position
      if (Math.random() < 0.4) {
        particles.push(new Particle(e.clientX, e.clientY));
        if (particles.length > particleCount + 50) {
          particles.shift();
        }
      }
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation Loop
    const animate = () => {
      // Clear with trail effect for fireworks, solid clear otherwise
      if (mode === 'fireworks') {
        ctx.fillStyle = 'rgba(10, 10, 26, 0.15)'; // Midnight Blue with opacity
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      // Draw and update stars
      if (stars.length > 0) {
        stars.forEach((s) => {
          s.update();
          s.draw();
        });
      }

      // Draw and update shooting stars
      if (shootingStars.length > 0) {
        shootingStars.forEach((ss) => {
          ss.update();
          ss.draw();
        });
      }

      // Draw and update lanterns
      if (lanterns.length > 0) {
        lanterns.forEach((l) => {
          l.update();
          l.draw();
        });
      }

      // Draw and update fireworks
      if (fireworks.length > 0) {
        fireworks.forEach((fw) => {
          fw.update();
          fw.draw();
        });
      }

      // Draw and update standard floating particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeHandler);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mode, interactive]);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
