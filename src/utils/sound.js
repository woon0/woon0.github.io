// Web Audio API procedural sound engine for authentic crystalline & glass sound effects
// Pure synthesized audio - zero external audio asset dependencies, zero 404s, instantaneous latency.

class GlassSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.hasInteracted = false;
    this.listeners = new Set();

    try {
      const saved = localStorage.getItem('ludvig_portfolio_muted');
      if (saved !== null) {
        this.isMuted = JSON.parse(saved);
      }
    } catch {
      this.isMuted = false;
    }
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.65, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  ensureContext() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return !!this.ctx;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('ludvig_portfolio_muted', JSON.stringify(this.isMuted));
    } catch {}

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(
        this.isMuted ? 0 : 0.65,
        this.ctx.currentTime + 0.05
      );
    }

    this.notify();
    if (!this.isMuted) {
      this.playGlassPing(1900, 0.4);
    }
    return this.isMuted;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn(this.isMuted));
  }

  /**
   * Authentic struck glass ping
   * Inharmonic circular glass resonance ratios (f0, 2.756*f0, 5.404*f0, 8.93*f0)
   */
  playGlassPing(baseFreq = 2200, intensity = 0.5) {
    if (this.isMuted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;

    const partials = [
      { ratio: 1.0, gain: 0.7, decay: 0.9 },
      { ratio: 2.756, gain: 0.35, decay: 0.6 },
      { ratio: 5.404, gain: 0.18, decay: 0.35 },
      { ratio: 8.93, gain: 0.08, decay: 0.18 },
    ];

    const voiceGain = this.ctx.createGain();
    voiceGain.gain.setValueAtTime(intensity * 0.45, now);
    voiceGain.connect(this.masterGain);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(800, now);
    filter.connect(voiceGain);

    partials.forEach(({ ratio, gain, decay }) => {
      const osc = this.ctx.createOscillator();
      const pGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * ratio, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * ratio * 0.995, now + decay);

      pGain.gain.setValueAtTime(0, now);
      pGain.gain.linearRampToValueAtTime(gain, now + 0.002);
      pGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(pGain);
      pGain.connect(filter);

      osc.start(now);
      osc.stop(now + decay + 0.05);
    });
  }

  /**
   * Soft glassy hover tick
   */
  playGlassHover(pitchOffset = 0) {
    if (this.isMuted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const freq = 2600 + pitchOffset * 140;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.04, now + 0.05);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq, now);
    filter.Q.setValueAtTime(10, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  /**
   * Tactile glass tap / button press
   */
  playGlassClick() {
    if (this.isMuted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(3200, now);
    osc1.frequency.exponentialRampToValueAtTime(1400, now + 0.04);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1800, now);
    osc2.frequency.exponentialRampToValueAtTime(900, now + 0.08);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.2);
    osc2.stop(now + 0.2);
  }

  /**
   * Multi-note crystalline cascade / glass chime
   */
  playGlassChime(chord = [1760, 2217, 2637, 3520]) {
    if (this.isMuted || !this.ensureContext()) return;

    chord.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted && this.ctx) {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.18, now + 0.005);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(now);
          osc.stop(now + 0.8);
        }
      }, idx * 60);
    });
  }

  /**
   * Cosmic glass warp / modal open transition
   */
  playCosmicWarp() {
    if (this.isMuted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;

    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(110, now);
    subOsc.frequency.exponentialRampToValueAtTime(240, now + 0.35);

    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.22, now + 0.08);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc.start(now);
    subOsc.stop(now + 0.5);

    this.playGlassPing(2800, 0.35);
  }

  /**
   * Game Achievement & Milestone Sound (celebration chime)
   */
  playMilestoneSound() {
    if (this.isMuted || !this.ensureContext()) return;
    const notes = [1318.5, 1661.2, 1975.5, 2637.0, 3135.9];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playGlassPing(freq, 0.45);
      }, idx * 75);
    });
  }

  /**
   * Interactive Glass Harp frequency
   */
  playNote(frequency, duration = 0.8, type = 'glass') {
    if (this.isMuted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type === 'celestial' ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(frequency, now);

    filter.type = 'peaking';
    filter.frequency.setValueAtTime(frequency * 1.5, now);
    filter.Q.setValueAtTime(6, now);
    filter.gain.setValueAtTime(4, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }
}

export const sound = new GlassSoundEngine();
