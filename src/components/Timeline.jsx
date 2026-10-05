import React from 'react';
import { Briefcase, MapPin, Gamepad2, Smartphone, GraduationCap } from 'lucide-react';
import GlassCard from './GlassCard';
import { sound } from '../utils/sound';

const MILESTONES = [
  {
    period: '2024 — Present',
    role: 'Lead Game & Application Developer • KTH Engineering',
    company: 'Independent Studio & KTH Stockholm',
    location: 'Stockholm, Sweden',
    icon: Gamepad2,
    badge: '200K+ Games Sold • 2M+ Apps',
    description:
      'Directing full-cycle development for commercial indie game titles and desktop utilities while completing advanced computer science and graphics engineering coursework at KTH Royal Institute of Technology.',
    achievements: [
      'Surpassed 200,000+ cumulative copies sold across 2 flagship commercial game titles',
      'Scaled 2 desktop and mobile applications past 1,000,000+ downloads each with 4.8★ ratings',
      'Conducting graphics engineering research on hardware ray tracing (VK_KHR) and SVGF denoising at KTH',
    ],
    tags: ['C++20', 'Vulkan', 'Unity / C#', 'Rust', 'Audio DSP', 'KTH Stockholm'],
  },
  {
    period: '2023 — 2024',
    role: 'Game Engine & Graphics Programmer',
    company: 'Commercial Releases (Steam & Multiplatform)',
    location: 'Stockholm, Sweden',
    icon: Gamepad2,
    badge: '100K+ Steam Release',
    description:
      'Engineered and launched commercial rogue-lite and orbital gravity physics games. Designed custom rendering pipelines, GPU particle compute systems, and deterministic physics engines.',
    achievements: [
      'Reached 100,000+ paid players with a 94% positive rating on Steam for flagship title',
      'Constructed memory-efficient ECS architecture handling 50,000+ active physics entities simultaneously',
      'Integrated cross-platform gamepad support, custom spatial audio reverbs, and community leaderboards',
    ],
    tags: ['C++', 'HLSL', 'Compute Shaders', 'Vulkan', 'Steamworks'],
  },
  {
    period: '2022 — 2023',
    role: 'Desktop & Mobile Application Architect',
    company: 'Consumer Software Products (Feathercut & Aether)',
    location: 'Stockholm, Sweden',
    icon: Smartphone,
    badge: '1M+ Installs',
    description:
      'Architected cross-platform desktop utilities like Feathercut and low-latency audio DSP workstations. Focused on extreme client responsiveness, acrylic glass UI shells, and zero-crash reliability.',
    achievements: [
      'Built Feathercut video trimming utility crossing 1,000,000+ downloads worldwide with instant stream-copying',
      'Engineered sub-2ms audio DSP pipeline in C++ (JUCE) achieving #1 category rank in 12 countries',
      'Maintained 99.98% crash-free session rate across over 1,000,000+ active installs',
    ],
    tags: ['C++', 'FFmpeg', 'Desktop Acrylic Shell', 'JUCE', 'Swift', 'Kotlin'],
  },
  {
    period: '2021 — Present',
    role: 'Computer Science & Engineering Student',
    company: 'KTH Royal Institute of Technology',
    location: 'Stockholm, Sweden',
    icon: GraduationCap,
    badge: 'KTH Stockholm 🇸🇪',
    description:
      'Pursuing Civilingenjör / Master of Science degree in Computer Science at Sweden’s premier technical university. Specializing in computer graphics, compilers, and high-performance computing.',
    achievements: [
      'Top marks in Algorithms & Complexity, Computer Graphics, and Numerical Analysis',
      'Built custom Vulkan hardware path tracer with SVGF denoising as advanced graphics project',
      'Applied theoretical computer science and lockstep determinism directly to commercial game engines',
    ],
    tags: ['Algorithms', 'Linear Algebra', 'Ray Tracing', 'Computer Architecture', 'Compilers'],
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="relative pt-32 pb-24 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-28">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white mb-4">
          Journey & Milestones
        </h2>
        <p className="max-w-2xl mx-auto text-mauve-text text-sm sm:text-base leading-relaxed">
          How student engineering at KTH Stockholm evolved into commercial game and application releases.
        </p>
      </div>

      {/* Path */}
      <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-10 sm:space-y-12">
        {MILESTONES.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={idx} className="relative group">
              {/* Node */}
              <div
                onClick={() => sound.playGlassPing(2200 + idx * 250, 0.4)}
                className="cursor-pointer absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full bg-obsidian-950 border-2 border-purple-400 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-[0_0_12px_rgba(192,132,252,0.6)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Card */}
              <GlassCard
                enableTilt={true}
                soundPitch={idx}
                className="p-6 sm:p-7 text-left border-white/[0.08] bg-obsidian-850/50 group-hover:border-purple-400/35 transition-all duration-300"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-purple-300 px-3 py-1 rounded-full bg-plum-800/40 border border-purple-500/20">
                    {item.period}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-mauve-text px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/10">
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-mauve-subtle flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-mauve-subtle" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-serif font-normal text-white group-hover:text-purple-200 transition-colors flex items-center gap-2">
                  <IconComp className="w-4 h-4 text-purple-300" />
                  <span>{item.role}</span>
                </h3>
                <div className="text-sm font-sans text-mauve-text mb-4">
                  {item.company}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4 font-normal">
                  {item.description}
                </p>

                {/* Achievements */}
                <div className="space-y-2 mb-5">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2 text-xs text-mauve-text">
                      <span className="text-purple-400 font-mono mt-0.5">✦</span>
                      <span className="leading-snug">{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.05]">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.02] text-mauve-text border border-white/[0.05]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
