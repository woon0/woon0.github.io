import React, { useEffect } from 'react';
import { X, ExternalLink, Cpu, Layers, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { sound } from '../utils/sound';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    sound.playCosmicWarp();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sound.playGlassClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => {
          sound.playGlassClick();
          onClose();
        }}
        className="fixed inset-0 bg-obsidian-950/85 backdrop-blur-2xl transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-obsidian-900/95 border border-white/12 backdrop-blur-3xl shadow-feather-glass p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-300 overflow-hidden text-left">
        {/* Top ambient highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-mono text-purple-300 uppercase px-2.5 py-0.5 rounded-full bg-plum-800/40 border border-purple-500/25">
                {project.category}
              </span>
              {project.badge && (
                <span className="text-[11px] font-mono text-mauve-text px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10">
                  {project.badge}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white">
              {project.title}
            </h2>
            <div className="text-xs sm:text-sm font-sans text-purple-200/80 mt-1">
              {project.tagline}
            </div>
          </div>

          <button
            onClick={() => {
              sound.playGlassClick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-mauve-text hover:text-white border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Box */}
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-obsidian-950/70 p-5 mb-6">
          <p className="text-slate-300 text-sm leading-relaxed mb-5 font-normal">
            {project.description}
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/[0.06]">
            {project.metrics?.map((metric, idx) => (
              <div key={idx} className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] font-mono text-mauve-subtle uppercase block mb-0.5">
                  {metric.label}
                </span>
                <span className="text-sm font-serif font-medium text-white">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture & Engineering Decisions */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-mauve-text flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            Engineering Decisions & Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.highlights?.map((hl, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-xs text-mauve-text leading-snug">{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-mauve-text mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            Core Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack?.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.03] text-mauve-text border border-white/[0.08]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="text-xs font-mono text-mauve-subtle">
            Ludvig Berglie • KTH Stockholm
          </div>
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playGlassPing(2600, 0.3)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-xs font-sans text-slate-200 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playGlassChime([2200, 2800])}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-btn hover:bg-violet-hover text-xs font-sans text-white transition-all shadow-purple-glow"
              >
                <span>Visit project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
