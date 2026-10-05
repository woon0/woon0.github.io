import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Footer() {
  const scrollToTop = () => {
    sound.playGlassChime([1760, 2217, 2637, 3520]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#0c0717]/80 backdrop-blur-xl py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand / Copyright */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-serif text-sm font-medium text-white tracking-wide">
              Ludvig Berglie
            </span>
            <span className="text-purple-400/40">•</span>
            <span className="text-xs font-mono text-purple-300/80">KTH Royal Institute of Technology</span>
          </div>
          <p className="text-xs text-mauve-muted font-sans">
            Crafted with obsidian acrylic glass, real-time Web Audio, and precision physics.
          </p>
        </div>

        {/* Back to Top */}
        <div className="flex items-center gap-6">
          <div className="text-xs font-mono text-purple-300/60 hidden sm:block">
            Stockholm, Sweden
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playGlassHover()}
            className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-violet-400/40 text-mauve-muted hover:text-white transition-all duration-300 shadow-sm"
            aria-label="Scroll back to top"
            title="Return to top"
          >
            <ArrowUp className="w-4 h-4 text-purple-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
