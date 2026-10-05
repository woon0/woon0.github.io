import React from 'react';
import { ArrowDown, FileText, Gamepad2, Smartphone, Terminal, ArrowUpRight } from 'lucide-react';
import GlassCard from './GlassCard';
import { sound } from '../utils/sound';

export default function Hero({ onOpenResume }) {
  const handleScrollTo = (id) => {
    sound.playGlassChime([1760, 2217, 2637]);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -85;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-28 pb-16 overflow-hidden scroll-mt-28"
    >
      {/* Ambient background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-purple-900/10 blur-3xl pointer-events-none -z-10" />

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Subtle Swedish Engineering pill */}
        <div
          onClick={() => sound.playGlassPing(2600, 0.25)}
          className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-plum-900/40 border border-white/[0.08] backdrop-blur-md mb-8 hover:border-purple-400/30 transition-all duration-300"
        >
          {/* Feathercut feather icon */}
          <svg className="w-3.5 h-3.5 text-purple-300 transform -rotate-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM7 17v-4.5l5.5-5.5a4 4 0 0 1 5.66 5.66L12.66 18H7v-1z" />
          </svg>
          <span className="text-xs font-mono text-mauve-text">
            KTH Royal Institute of Technology • Stockholm
          </span>
        </div>

        {/* Primary Name */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-normal tracking-tight text-white mb-6 select-none">
          Ludvig Berglie
        </h1>

        {/* Human, confident subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-purple-200/90 font-light mb-6 tracking-wide">
          Crafting games and applications with weight and precision.
        </p>

        <p className="max-w-2xl text-sm sm:text-base text-mauve-text leading-relaxed mb-10 font-normal">
          Engineering student at <span className="text-white font-medium">KTH in Stockholm</span>. I design custom C++ game engines, real-time GPU shaders, and native desktop & mobile tools. Across two commercial indie titles, over <span className="text-purple-300 font-medium">100,000 players</span> have purchased my games—and two of my software applications have crossed <span className="text-purple-300 font-medium">1,000,000 downloads</span> each.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
          <button
            onClick={() => handleScrollTo('projects')}
            className="group px-6 py-3 rounded-full bg-violet-btn hover:bg-violet-hover text-white font-medium text-sm transition-all duration-200 shadow-purple-glow hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-3.5 h-3.5 text-purple-200 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              sound.playGlassPing(2400, 0.3);
              onOpenResume();
            }}
            className="px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.09] hover:border-white/20 text-slate-200 font-medium text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
          >
            <FileText className="w-3.5 h-3.5 text-mauve-text" />
            <span>KTH Dossier</span>
          </button>
        </div>

        {/* Real Proof-of-Work: 4 Bento Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-4xl text-left">
          <GlassCard
            enableTilt={true}
            soundPitch={0}
            className="p-5 border-white/[0.08] hover:border-purple-400/30"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono text-mauve-text uppercase tracking-wider">
                Commercial Game
              </span>
              <Gamepad2 className="w-3.5 h-3.5 text-purple-300" />
            </div>
            <div className="text-2xl font-serif font-normal text-white mb-1">
              100,000+
            </div>
            <p className="text-xs text-mauve-text leading-snug">
              Copies sold on Steam. Custom C++20 engine, Vulkan compute particles, 94% positive rating.
            </p>
          </GlassCard>

          <GlassCard
            enableTilt={true}
            soundPitch={1}
            className="p-5 border-white/[0.08] hover:border-purple-400/30"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono text-mauve-text uppercase tracking-wider">
                Commercial Game
              </span>
              <Gamepad2 className="w-3.5 h-3.5 text-purple-300" />
            </div>
            <div className="text-2xl font-serif font-normal text-white mb-1">
              100,000+
            </div>
            <p className="text-xs text-mauve-text leading-snug">
              Copies sold across multi-platform. Real N-body orbital dynamics and custom shaders.
            </p>
          </GlassCard>

          <GlassCard
            enableTilt={true}
            soundPitch={2}
            className="p-5 border-white/[0.08] hover:border-purple-400/30"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono text-mauve-text uppercase tracking-wider">
                Desktop App
              </span>
              <Smartphone className="w-3.5 h-3.5 text-purple-300" />
            </div>
            <div className="text-2xl font-serif font-normal text-white mb-1">
              1,000,000+
            </div>
            <p className="text-xs text-mauve-text leading-snug">
              Downloads worldwide. Minimalist video trimming utility with C++ and FFmpeg core.
            </p>
          </GlassCard>

          <GlassCard
            enableTilt={true}
            soundPitch={3}
            className="p-5 border-white/[0.08] hover:border-purple-400/30"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono text-mauve-text uppercase tracking-wider">
                Audio Application
              </span>
              <Smartphone className="w-3.5 h-3.5 text-purple-300" />
            </div>
            <div className="text-2xl font-serif font-normal text-white mb-1">
              1,000,000+
            </div>
            <p className="text-xs text-mauve-text leading-snug">
              Installs with 4.8★ store rating. Low-latency spatial audio DSP and physical acoustics.
            </p>
          </GlassCard>
        </div>

      </div>

      {/* Subtle scroll cue */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none opacity-50">
        <span className="text-[10px] font-mono tracking-widest text-mauve-subtle uppercase">
          Scroll to explore
        </span>
      </div>
    </section>
  );
}
