import React, { useState } from 'react';
import { Gamepad2, Smartphone, Orbit, Cpu, GraduationCap, Sparkles } from 'lucide-react';
import GlassCard from './GlassCard';
import { sound } from '../utils/sound';

const SKILL_CLUSTERS = [
  {
    title: 'Game Engines & Graphics',
    icon: Gamepad2,
    color: 'text-purple-300',
    description: 'Low-level hardware graphics rendering, memory-pooled ECS architectures, compute shaders, and lockstep physics.',
    items: [
      { name: 'C++20 / C++17', note: 'Memory allocators, cache-friendly data layouts, SIMD' },
      { name: 'Vulkan & DirectX 12', note: 'Explicit synchronization, pipelines, descriptor sets' },
      { name: 'HLSL / GLSL Shaders', note: 'GPU compute particles, volumetric lighting, post-processing' },
      { name: 'Unity (C#)', note: 'DOTS/Jobs, native C++ plugins, custom render pipelines' },
      { name: 'Physics Simulation', note: 'Symplectic integrators, rigid-body contact solvers' },
    ],
  },
  {
    title: 'Application Architecture & Scale',
    icon: Smartphone,
    color: 'text-purple-300',
    description: 'Engineering desktop and mobile applications that hold up at scale across millions of installs.',
    items: [
      { name: 'Desktop Native Shells', note: 'Windows Acrylic/Mica & macOS frosted glass window chrome' },
      { name: 'C++ & FFmpeg Pipeline', note: 'Lossless video stream-copying, custom video decoders' },
      { name: 'Rust', note: 'Safe concurrency, native desktop cores, WebGPU bindings' },
      { name: 'Swift (iOS) & Kotlin', note: 'Metal compute shaders, background services, native audio units' },
      { name: 'TypeScript & React 19', note: 'Responsive spatial UI and clean design systems' },
    ],
  },
  {
    title: 'Audio DSP & Physical Acoustics',
    icon: Orbit,
    color: 'text-purple-300',
    description: 'Real-time procedural sound synthesis, inharmonic glass vibration math, and low-latency audio pipelines.',
    items: [
      { name: 'JUCE Framework (C++)', note: 'Cross-platform audio plugins & real-time audio threads' },
      { name: 'Web Audio API', note: 'Pure procedural synthesis, zero-dependency acoustic graphs' },
      { name: 'Inharmonic Glass Acoustics', note: 'Plate resonance math, circular overtone decay formulas' },
      { name: 'FFT Spectral Analysis', note: 'Real-time GPU frequency domain visualization' },
    ],
  },
  {
    title: 'Low-Latency Systems & Netcode',
    icon: Cpu,
    color: 'text-purple-300',
    description: 'Zero-drift lockstep simulation, sub-frame rollback reconciliation, and memory-constrained performance.',
    items: [
      { name: 'Rollback Netcode', note: 'GGPO-style predictive state rewind, delta hashing' },
      { name: 'Deterministic Fixed-Point', note: 'Cross-architecture deterministic simulation math' },
      { name: 'Multithreading & Concurrency', note: 'Lock-free ring buffers, thread pools, atomics' },
      { name: 'UDP Sockets & NAT', note: 'Custom binary protocols, encrypted relay fallbacks' },
    ],
  },
  {
    title: 'Academic Foundations at KTH',
    icon: GraduationCap,
    color: 'text-purple-300',
    description: 'Rigorous engineering and computer science studies at Sweden’s premier technical university.',
    items: [
      { name: 'Computer Graphics & Ray Tracing', note: 'Hardware ray tracing (VK_KHR), BVH trees, SVGF denoising' },
      { name: 'Algorithms & Complexity', note: 'Graph algorithms, dynamic programming, mathematical proofs' },
      { name: 'Advanced 3D Mathematics', note: 'Quaternions, geometric algebra, numerical integration' },
      { name: 'Computer Architecture & Compilers', note: 'CPU cache hierarchies, branch prediction, ASTs' },
    ],
  },
];

export default function Skills() {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    sound.playGlassPing(2200 + Math.random() * 600, 0.35);
    setActiveItem(activeItem?.name === item.name ? null : item);
  };

  return (
    <section id="skills" className="relative pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-28">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-4">
          Technical Focus
        </h2>
        <p className="max-w-2xl mx-auto text-mauve-text text-sm sm:text-base leading-relaxed">
          The engineering disciplines that power my commercial releases and research at KTH Stockholm.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CLUSTERS.map((cluster, idx) => {
          const IconComp = cluster.icon;
          return (
            <GlassCard
              key={idx}
              enableTilt={true}
              soundPitch={idx}
              className="p-6 flex flex-col justify-between border-white/[0.08] hover:border-purple-400/35 bg-obsidian-850/50"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-plum-800/40 border border-white/10 text-purple-300">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-serif font-normal text-white">
                    {cluster.title}
                  </h3>
                </div>

                <p className="text-xs text-mauve-text leading-relaxed mb-5">
                  {cluster.description}
                </p>

                {/* Items */}
                <div className="space-y-2">
                  {cluster.items.map((item, iIdx) => {
                    const isSelected = activeItem?.name === item.name;
                    return (
                      <div
                        key={iIdx}
                        onClick={() => handleItemClick(item)}
                        className={`cursor-pointer p-2.5 rounded-xl transition-all duration-200 border flex flex-col text-left ${
                          isSelected
                            ? 'bg-plum-800/50 border-purple-400/40 text-white'
                            : 'bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.05] hover:border-white/10 text-slate-300'
                        }`}
                      >
                        <span className="text-xs font-mono font-medium text-slate-200">
                          {item.name}
                        </span>
                        {isSelected && (
                          <span className="text-[11px] font-sans text-purple-200/90 mt-1 leading-snug">
                            {item.note}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-[10px] font-mono text-mauve-subtle pt-4 mt-4 border-t border-white/[0.04]">
                Click item to inspect context
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
