import React, { useState, useRef, useEffect } from 'react';
import { Play, Volume2, Sparkles } from 'lucide-react';
import GlassCard from './GlassCard';
import { sound } from '../utils/sound';

const GLASS_PADS = [
  { name: 'Crystal E6', note: 'E6', freq: 1318.5, desc: 'High quartz resonance' },
  { name: 'Wine Glass G#6', note: 'G#6', freq: 1661.2, desc: 'Thin rim friction overtone' },
  { name: 'Pure Silica B6', note: 'B6', freq: 1975.5, desc: 'Optical glass dispersion' },
  { name: 'Celestial E7', note: 'E7', freq: 2637.0, desc: 'Upper harmonic shimmer' },
  { name: 'Prism G#7', note: 'G#7', freq: 3322.4, desc: 'Refractive spike tone' },
  { name: 'Void Bell C7', note: 'C7', freq: 2093.0, desc: 'Spherical glass dome' },
];

export default function GlassPlayground() {
  const [activePad, setActivePad] = useState(null);
  const [isPlayingSeq, setIsPlayingSeq] = useState(false);
  const visualizerCanvasRef = useRef(null);
  const ripplesRef = useRef([]);

  const triggerNote = (pad, index) => {
    sound.playNote(pad.freq, 1.2, 'glass');
    setActivePad(index);
    setTimeout(() => setActivePad(null), 300);

    if (ripplesRef.current.length < 15) {
      ripplesRef.current.push({
        x: (index + 0.5) * (1 / GLASS_PADS.length),
        radius: 4,
        maxRadius: 180,
        alpha: 0.75,
        freq: pad.freq,
        color: index % 2 === 0 ? '#c084fc' : '#e879f9',
      });
    }
  };

  const handlePlaySequence = () => {
    if (isPlayingSeq) return;
    setIsPlayingSeq(true);

    const sequence = [0, 2, 3, 1, 4, 2, 5, 3];
    sequence.forEach((padIndex, step) => {
      setTimeout(() => {
        triggerNote(GLASS_PADS[padIndex], padIndex);
        if (step === sequence.length - 1) {
          setIsPlayingSeq(false);
        }
      }, step * 220);
    });
  };

  useEffect(() => {
    const canvas = visualizerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let t = 0;

    const render = () => {
      t += 0.025;
      const w = (canvas.width = canvas.offsetWidth);
      const h = (canvas.height = canvas.offsetHeight);

      ctx.clearRect(0, 0, w, h);

      // Ambient oscillating waveform
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      for (let x = 0; x < w; x += 3) {
        const y =
          h / 2 +
          Math.sin(x * 0.015 + t) * 7 +
          Math.cos(x * 0.03 - t * 0.8) * 3;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Render sound ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += 3;
        r.alpha *= 0.96;

        if (r.alpha < 0.02 || r.radius > r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        const posX = r.x * w;
        ctx.beginPath();
        ctx.arc(posX, h / 2, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = r.alpha;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="playground" className="relative pt-32 pb-24 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-28">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-4">
          Acoustics & Synthesis
        </h2>
        <p className="max-w-2xl mx-auto text-mauve-text text-sm sm:text-base leading-relaxed">
          Physical modeling of inharmonic circular glass resonance, synthesized purely via the Web Audio API without external audio files.
        </p>
      </div>

      {/* Main Glass Workbench */}
      <GlassCard
        enableTilt={false}
        className="p-6 sm:p-8 border-white/[0.08] bg-obsidian-850/60 shadow-feather-glass"
      >
        {/* Oscilloscope Canvas */}
        <div className="relative h-24 w-full rounded-xl bg-obsidian-950/70 border border-white/[0.06] mb-6 overflow-hidden flex items-center justify-center">
          <canvas
            ref={visualizerCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />
          <div className="absolute top-2 left-3 text-[10px] font-mono text-mauve-subtle">
            Inharmonic Resonator Waveform // 32-bit Float
          </div>
          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-purple-300">
            {activePad !== null ? `${GLASS_PADS[activePad].freq} Hz` : '44.1 kHz Audio Thread'}
          </div>
        </div>

        {/* Resonator Touch Pads */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {GLASS_PADS.map((pad, idx) => {
            const isActive = activePad === idx;
            return (
              <button
                key={idx}
                onClick={() => triggerNote(pad, idx)}
                onMouseEnter={() => sound.playGlassHover(idx * 0.4)}
                className={`relative group p-4 rounded-xl border transition-all duration-200 text-left flex flex-col justify-between h-32 overflow-hidden ${
                  isActive
                    ? 'border-purple-400 scale-[0.98] shadow-purple-glow bg-plum-800/60'
                    : 'border-white/[0.06] hover:border-purple-400/30 bg-white/[0.02] hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-white">
                    {pad.note}
                  </span>
                  <span className="text-[10px] font-mono text-purple-300">
                    {pad.freq}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-serif font-normal text-slate-200 mb-0.5">
                    {pad.name}
                  </div>
                  <div className="text-[9px] text-mauve-subtle font-sans leading-tight">
                    {pad.desc}
                  </div>
                </div>

                <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full bg-purple-400 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-1/2'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlaySequence}
              disabled={isPlayingSeq}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-medium transition-all duration-200 border ${
                isPlayingSeq
                  ? 'bg-plum-800 border-purple-400 text-white animate-pulse'
                  : 'bg-violet-btn hover:bg-violet-hover border-transparent text-white shadow-purple-glow'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-white" />
              <span>{isPlayingSeq ? 'Playing Arpeggio...' : 'Play Glass Arpeggio'}</span>
            </button>

            <button
              onClick={() => sound.playMilestoneSound()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-sans bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-mauve-text hover:text-white transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Achievement Chime</span>
            </button>
          </div>

          <div className="text-xs font-mono text-mauve-subtle flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-purple-300" />
            <span>Pure Procedural Audio</span>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
