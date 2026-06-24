/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class AmbientMusicController {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalIds: any[] = [];

  public play() {
    if (this.isPlaying) return;
    try {
      // Initialize AudioContext
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.isPlaying = true;

      // Gentle C major pentatonic scale for a sweet, dreamy music vibe
      const pentatonic = [196.00, 220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
      
      // Twinkling bell synthesizer function
      const playChime = (frequency: number, delay: number, volume = 0.04) => {
        if (!this.ctx || !this.isPlaying) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const delayNode = this.ctx.createDelay();
        const feedback = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        // Echo/Delay effect for spacey dreaminess
        delayNode.delayTime.value = 0.35;
        feedback.gain.value = 0.3;
        gain.connect(delayNode);
        delayNode.connect(feedback);
        feedback.connect(this.ctx.destination);

        osc.frequency.setValueAtTime(frequency, this.ctx.currentTime + delay);
        osc.type = 'sine'; // Pure sweet bell sound

        // Fast attack, slow exponential release
        gain.gain.setValueAtTime(0, this.ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + delay + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + 3.0);

        osc.start(this.ctx.currentTime + delay);
        osc.stop(this.ctx.currentTime + delay + 3.1);
      };

      // Random twinkling bells loop
      const chimeInterval = setInterval(() => {
        if (!this.isPlaying) return;
        const note = pentatonic[Math.floor(Math.random() * pentatonic.length)];
        playChime(note, 0, 0.03);
        
        // Occasional double harmony notes
        if (Math.random() < 0.4) {
          const secondNote = pentatonic[Math.floor(Math.random() * pentatonic.length)];
          playChime(secondNote, 0.15, 0.015);
        }
      }, 1800);

      // Low soothing warm drone pads in background
      const playPad = (frequency: number) => {
        if (!this.ctx || !this.isPlaying) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
        osc.type = 'sine';
        
        // Gentle pulsing drone volume
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.015, this.ctx.currentTime + 2.0);
        
        osc.start();
        
        const pulseInterval = setInterval(() => {
          if (!this.isPlaying || !gain) return;
          const now = this.ctx?.currentTime || 0;
          gain.gain.linearRampToValueAtTime(0.01 + Math.random() * 0.015, now + 1.5);
        }, 3000);
        
        this.intervalIds.push(pulseInterval);
        
        return { osc, gain };
      };

      const pad1 = playPad(130.81); // C3
      const pad2 = playPad(164.81); // E3

      this.intervalIds.push(chimeInterval);

    } catch (e) {
      console.warn('Web Audio Context not supported or interaction blocked:', e);
    }
  }

  public stop() {
    this.isPlaying = false;
    this.intervalIds.forEach((id) => clearInterval(id));
    this.intervalIds = [];
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const ambientMusic = new AmbientMusicController();
