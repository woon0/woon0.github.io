import React, { useEffect } from 'react';
import { X, Download, BookOpen, GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    sound.playCosmicWarp();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sound.playGlassClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => {
          sound.playGlassClick();
          onClose();
        }}
        className="fixed inset-0 bg-[#0a0512]/85 backdrop-blur-2xl transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-[#120a22]/90 border border-white/[0.1] backdrop-blur-3xl shadow-2xl p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-300 text-left overflow-hidden">
        {/* Specular Highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent" />

        {/* Top Header */}
        <div className="flex items-start justify-between pb-5 border-b border-white/[0.08] mb-6">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-white">
                Ludvig Berglie — Engineering Record
              </h2>
              <span className="text-xs font-mono text-purple-300/80">
                Game & Application Developer • KTH Royal Institute of Technology
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playGlassClick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-mauve-muted hover:text-white border border-white/[0.08] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-sm text-mauve-muted max-h-[65vh] overflow-y-auto pr-2">
          {/* Commercial Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06]">
              <span className="text-[10px] font-mono text-purple-300/60 block uppercase">Commercial Games</span>
              <span className="text-base font-bold text-white font-mono">200K+ Sold</span>
            </div>
            <div className="bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06]">
              <span className="text-[10px] font-mono text-purple-300/60 block uppercase">App Installs</span>
              <span className="text-base font-bold text-purple-200 font-mono">2M+ Global</span>
            </div>
            <div className="bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06]">
              <span className="text-[10px] font-mono text-purple-300/60 block uppercase">University</span>
              <span className="text-base font-bold text-violet-300 font-mono">KTH Stockholm</span>
            </div>
            <div className="bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06]">
              <span className="text-[10px] font-mono text-purple-300/60 block uppercase">User Rating</span>
              <span className="text-base font-bold text-emerald-300 font-mono">4.8★ / 94%</span>
            </div>
          </div>

          {/* Profile Statement */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-purple-300/90 mb-2">
              Engineering Profile & Commercial Track Record
            </h3>
            <p className="text-xs sm:text-sm text-mauve-muted leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05] font-sans">
              Computer Science & Engineering student at <strong className="text-white">KTH Royal Institute of Technology</strong> with a rare track record of shipping commercial breakout hits: 2 commercial games with over <strong className="text-white">100,000+ sold copies each</strong> and 2 consumer applications exceeding <strong className="text-white">1,000,000+ downloads each</strong> (including Feathercut). Specializes in custom C++ game engines, Vulkan/DirectX graphics pipelines, compute shaders, deterministic rollback netcode, and low-latency audio DSP.
            </p>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-purple-300/90 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Academic Foundations
            </h3>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-medium text-white text-xs sm:text-sm">
                  KTH Royal Institute of Technology (Stockholm, Sweden)
                </span>
                <span className="text-[11px] font-mono text-purple-300">2021 — Present</span>
              </div>
              <div className="text-xs text-purple-200/80">
                Degree Programme in Computer Science & Engineering (Civilingenjör)
              </div>
              <p className="text-xs text-mauve-muted leading-relaxed">
                Core coursework & research: Advanced Computer Graphics, Real-Time Hardware Ray Tracing, Algorithms & Complexity, Numerical Analysis & Differential Equations, Operating Systems, Compilers.
              </p>
            </div>
          </div>

          {/* Core Technical Capabilities */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-purple-300/90 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
                <strong className="text-white block font-mono mb-1">Game Engines & Low-Level</strong>
                <span className="text-mauve-muted">C++20, Vulkan API, DirectX 12, HLSL/GLSL Compute Shaders, Custom ECS, Unity (C#), Unreal Engine</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
                <strong className="text-white block font-mono mb-1">Application Architecture</strong>
                <span className="text-mauve-muted">Rust, Swift (macOS/iOS), Kotlin, TypeScript, Electron/Tauri, High-scale crash telemetry</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
                <strong className="text-white block font-mono mb-1">Audio DSP & Synthetic Physics</strong>
                <span className="text-mauve-muted">C++ (JUCE), Web Audio API, AudioWorklets, Inharmonic glass resonance physics, FFT analysis</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
                <strong className="text-white block font-mono mb-1">Netcode & Concurrency</strong>
                <span className="text-mauve-muted">Deterministic rollback netcode, UDP sockets, lock-free ring buffers, SIMD state hashing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/[0.08] mt-6">
          <span className="text-xs font-mono text-purple-300/60">
            Stockholm, Sweden • KTH Engineering
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playGlassPing(2800, 0.4);
                window.print();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/40 border border-violet-400/40 text-xs font-mono text-purple-200 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
