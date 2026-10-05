import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import GlassCard from './GlassCard';
import ProjectModal from './ProjectModal';
import {
  FeathercutPreview,
  ParticleVortexPreview,
  OrbitalGravityPreview,
  AudioHarpPreview,
  PathTracerSpherePreview,
  NetcodeScrubberPreview,
} from './InteractivePreviews';
import { sound } from '../utils/sound';

const PROJECTS = [
  {
    id: 'feathercut',
    slug: 'feathercut',
    title: 'Feathercut',
    tagline: 'Lightweight, Distraction-Free Video Trimming Application',
    category: 'Applications',
    badge: '1,000,000+ Downloads',
    year: 'Commercial Desktop App',
    description:
      'A featherweight desktop utility designed for lightning-fast video clipping without quality loss or re-encoding. Features a custom acrylic glassmorphic interface, native C++ FFmpeg stream-copy pipeline, and drag-and-drop workflow that surpassed 1,000,000 downloads worldwide.',
    metrics: [
      { label: 'Downloads', value: '1,000,000+' },
      { label: 'Export Time', value: '< 200 ms stream-copy' },
      { label: 'Formats', value: 'MP4, MOV, MKV, WebM' },
      { label: 'UI Shell', value: 'Custom Acrylic Glass' },
    ],
    highlights: [
      'Engineered lossless stream-slicing engine avoiding costly multi-minute video re-renders',
      'Custom Windows Acrylic & macOS vibrancy frosted glass window chrome',
      'Zero-dependency single executable footprint under 18 MB with embedded codecs',
      'Viral creator adoption on YouTube, Twitch, and TikTok video editing communities',
    ],
    stack: ['C++', 'FFmpeg Core', 'Desktop Acrylic Shell', 'Custom Shaders'],
    github: 'https://github.com/ludvigberglie/feathercut',
    demo: 'https://feathercut.app',
    previewType: 'feathercut',
  },
  {
    id: 'echoes-of-the-void',
    slug: 'echoes',
    title: 'Echoes of the Void',
    tagline: 'High-Paced Spatial Physics Rogue-Lite & Custom C++ Engine',
    category: 'Commercial Games',
    badge: '100,000+ Sold on Steam',
    year: 'Commercial Steam Release',
    description:
      'A breakout commercial indie physics rogue-lite built from scratch with a custom C++ Vulkan engine. Features GPU compute particle simulations, lockstep deterministic physics, and spatial audio that captured a global audience of over 100,000 players on Steam.',
    metrics: [
      { label: 'Units Sold', value: '100,000+' },
      { label: 'Steam Rating', value: '94% Positive' },
      { label: 'Engine', value: 'Custom C++20' },
      { label: 'Framerate', value: 'Vulkan 60+ FPS' },
    ],
    highlights: [
      'Engineered custom memory-pooled ECS (Entity Component System) in C++ with zero-allocation game loops',
      'Wrote custom Vulkan compute shaders managing 50,000+ interactive gravitational particles simultaneously',
      'Implemented custom low-latency audio DSP mixing engine with dynamic crystalline reverb',
      'Supported cross-platform gamepad, ultra-wide monitors, and automated crash telemetry',
    ],
    stack: ['C++20', 'Vulkan API', 'HLSL / GLSL', 'Custom ECS', 'DirectX 12', 'Steamworks SDK'],
    github: 'https://github.com/ludvigberglie/echoes-of-the-void',
    demo: 'https://store.steampowered.com',
    previewType: 'particle-vortex',
  },
  {
    id: 'celestial-drift',
    slug: 'celestial',
    title: 'Celestial Drift: Kinetic Orbit',
    tagline: 'Zero-G Precision Gravity Simulator & Physics Game',
    category: 'Commercial Games',
    badge: '100,000+ Copies Sold',
    year: 'Multi-Platform Release',
    description:
      'A physics-based orbital mechanics simulator and puzzle-strategy game. Simulates relativistic gravitational N-body orbital dynamics in real time with custom trajectory shaders and tactile celestial acoustics.',
    metrics: [
      { label: 'Copies Sold', value: '100,000+' },
      { label: 'Physics Solver', value: 'Symplectic RK4' },
      { label: 'Platforms', value: 'PC, Mac, Switch' },
      { label: 'Frame Budget', value: '< 11.2 ms' },
    ],
    highlights: [
      'Custom Symplectic Runge-Kutta 4th Order integrator for zero-drift long-horizon orbital trajectories',
      'Custom shader pipeline rendering gravitational lensing and atmospheric rim refractions',
      'Integrated deterministic replay system for community speedrunning and global leaderboards',
      'Engineered adaptive haptics and crystalline chime feedback for precision orbital insertions',
    ],
    stack: ['Unity / C#', 'N-Body Physics', 'Compute Shaders', 'FMOD Studio', 'Steamworks'],
    github: 'https://github.com/ludvigberglie/celestial-drift',
    demo: 'https://celestialdrift.berglie.dev',
    previewType: 'orbital-gravity',
  },
  {
    id: 'aether-pulse',
    slug: 'aetherpulse',
    title: 'Aether Audio',
    tagline: 'Low-Latency Mobile & Desktop Crystalline Audio Synthesizer',
    category: 'Applications',
    badge: '1,000,000+ Installs • 4.8★',
    year: 'Commercial App',
    description:
      'An ultra-low latency spatial audio workstation and procedural sound synthesizer used by sound designers, musicians, and game developers worldwide. Surpassed 1,000,000+ downloads with a 4.8-star rating.',
    metrics: [
      { label: 'Downloads', value: '1,000,000+' },
      { label: 'Store Rating', value: '4.8 ★' },
      { label: 'Audio Buffer', value: '< 1.8 ms' },
      { label: 'Precision', value: '32-bit Float' },
    ],
    highlights: [
      'Core audio engine written in C++ (JUCE) running on dedicated high-priority audio threads',
      'Custom additive synthesis physical model replicating inharmonic crystalline resonance',
      'Cross-platform UI in modern reactive frameworks with 60fps GPU-accelerated spectrum analyzer',
      'Export support for lossless WAV, FLAC, and real-time MIDI controller input',
    ],
    stack: ['C++ / JUCE', 'Web Audio API', 'Swift / Kotlin', 'AudioWorklets', 'DSP Math'],
    github: 'https://github.com/ludvigberglie/aether-audio',
    demo: 'https://aetherpulse.berglie.dev',
    previewType: 'audio-harp',
  },
  {
    id: 'kth-rtx',
    slug: 'kthrtx',
    title: 'KTH RTX: Vulkan Hardware Path Tracer',
    tagline: 'Hardware Ray Tracing Engine with BVH & SVGF Denoising',
    category: 'KTH Engineering',
    badge: 'KTH Research',
    year: 'KTH Stockholm',
    description:
      'Academic and engineering research in real-time hardware ray tracing at KTH Royal Institute of Technology. Features Vulkan ray tracing pipelines (VK_KHR_ray_tracing), two-level bounding volume hierarchies (BVH), and spatio-temporal variance-guided filtering (SVGF).',
    metrics: [
      { label: 'Institution', value: 'KTH Stockholm' },
      { label: 'Pipeline', value: 'VK_KHR_ray_tracing' },
      { label: 'Denoising', value: 'SVGF Spatio-Temporal' },
      { label: 'Glass Optics', value: 'Dielectric Fresnel' },
    ],
    highlights: [
      'Top-level and bottom-level acceleration structure (TLAS/BLAS) construction on GPU',
      'Dielectric Fresnel glass refraction and multiple in-medium internal reflections',
      'Monte Carlo importance sampling for Disney BRDF materials and HDR environment maps',
      'Engineered as part of master research at KTH Royal Institute of Technology',
    ],
    stack: ['C++20', 'Vulkan Ray Tracing', 'GLSL', 'BVH Trees', 'SVGF', 'CMake'],
    github: 'https://github.com/ludvigberglie/kth-vulkan-pathtracer',
    demo: 'https://kth-graphics.berglie.dev',
    previewType: 'pathtracer-sphere',
  },
  {
    id: 'novanet-engine',
    slug: 'novanet',
    title: 'NovaNet: Rollback Netcode Engine',
    tagline: 'Deterministic Lockstep & Sub-Frame Predictive Multiplayer',
    category: 'Game Engine Tech',
    badge: 'Core Engine Tech',
    year: 'Engine Framework',
    description:
      'A low-latency deterministic game networking framework built in Rust for competitive fast-paced action games. Features sub-frame client-side prediction, delta state compression, and rollback reconciliation.',
    metrics: [
      { label: 'Desync Rate', value: '0.00% Zero' },
      { label: 'Tick Rate', value: '128 Hz Fixed' },
      { label: 'Rollback Window', value: 'Up to 7 frames' },
      { label: 'Bandwidth', value: '< 24 bytes/tick' },
    ],
    highlights: [
      'Deterministic lockstep simulation with fixed-point arithmetic preventing floating-point cross-platform drift',
      'Ring-buffer state snapshotting with instantaneous memory rollback in < 0.15ms',
      'UDP hole punching and encrypted relay server failover for strict NAT environments',
      'Visual debugging profiler graph showing real-time jitter, packet loss, and rollback ticks',
    ],
    stack: ['Rust', 'UDP Sockets', 'Fixed-Point Math', 'SIMD Compression', 'Tokio'],
    github: 'https://github.com/ludvigberglie/novanet-engine',
    demo: 'https://novanet.berglie.dev',
    previewType: 'netcode-scrubber',
  },
];

const CATEGORIES = ['All', 'Commercial Games', 'Applications', 'KTH Engineering', 'Game Engine Tech'];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleSelectCategory = (cat) => {
    sound.playGlassChime([1900, 2400]);
    setSelectedCategory(cat);
  };

  const renderPreview = (type) => {
    switch (type) {
      case 'feathercut':
        return <FeathercutPreview />;
      case 'particle-vortex':
        return <ParticleVortexPreview />;
      case 'orbital-gravity':
        return <OrbitalGravityPreview />;
      case 'audio-harp':
        return <AudioHarpPreview />;
      case 'pathtracer-sphere':
        return <PathTracerSpherePreview />;
      case 'netcode-scrubber':
        return <NetcodeScrubberPreview />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="relative pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-28">
      {/* Section Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-4">
          Selected Works
        </h2>
        <p className="max-w-2xl mx-auto text-mauve-text text-sm sm:text-base leading-relaxed">
          Commercial games, desktop utilities, and graphics engineering projects developed during my studies at KTH Stockholm.
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleSelectCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium tracking-wide transition-all duration-200 border ${
                  isActive
                    ? 'bg-plum-800/80 border-purple-400/40 text-white shadow-purple-glow'
                    : 'bg-white/[0.03] border-white/10 text-mauve-text hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <GlassCard
            key={project.id}
            enableTilt={true}
            soundPitch={index % 4}
            className="flex flex-col justify-between group hover:border-purple-400/35 hover:shadow-feather-glass text-left border-white/[0.08] bg-obsidian-850/50"
          >
            {/* Visual Card Header */}
            <div className="p-5 pb-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-purple-300 font-medium px-2.5 py-0.5 rounded-full bg-plum-800/40 border border-purple-500/20">
                  {project.badge}
                </span>
                <span className="text-xs text-mauve-subtle font-mono">
                  {project.category}
                </span>
              </div>

              {/* Embedded Interactive Preview */}
              <div className="mb-4">
                {renderPreview(project.previewType)}
              </div>

              {/* Title & Tagline */}
              <div className="mt-2 mb-2">
                <h3 className="text-lg font-serif font-normal text-white group-hover:text-purple-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-mauve-text mt-1 line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5 my-3.5">
                {project.stack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-mauve-text border border-white/[0.06]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-5 pt-3 border-t border-white/[0.06] flex items-center justify-between mt-auto">
              <button
                onClick={() => {
                  sound.playCosmicWarp();
                  setActiveModalProject(project);
                }}
                className="text-xs font-sans font-medium text-purple-300 hover:text-white transition-colors flex items-center gap-1 group/btn"
              >
                <span>Read case study</span>
                <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
              </button>

              <div className="flex items-center gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playGlassPing(2500, 0.25);
                    }}
                    className="p-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.07] text-mauve-text hover:text-white transition-colors"
                    title="Source code"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playGlassPing(2900, 0.3);
                    }}
                    className="p-1.5 rounded-lg bg-plum-800/40 hover:bg-plum-800/70 text-purple-300 transition-colors"
                    title="Visit site"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Project Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
