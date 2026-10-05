import React, { useRef, useEffect, useState } from 'react';
import { sound } from '../utils/sound';
import { Folder, Settings, Video } from 'lucide-react';

/**
 * Preview: Feathercut Video App (The user's real app with 1M+ downloads!)
 */
export function FeathercutPreview() {
  const [isHovered, setIsHovered] = useState(false);
  const [dropped, setDropped] = useState(false);

  const handleClickChoose = (e) => {
    e.stopPropagation();
    sound.playGlassClick();
    setDropped(true);
    setTimeout(() => setDropped(false), 2200);
  };

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        sound.playGlassHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-44 rounded-xl overflow-hidden bg-obsidian-900/90 border border-white/[0.09] p-3 flex flex-col justify-between select-none shadow-feather-card"
    >
      {/* App window top bar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-purple-300 transform -rotate-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM7 17v-4.5l5.5-5.5a4 4 0 0 1 5.66 5.66L12.66 18H7v-1z" />
          </svg>
          <span className="text-[11px] font-sans font-medium text-slate-200">Feathercut</span>
        </div>
        <div className="flex items-center gap-1.5 text-mauve-subtle text-[9px] font-mono">
          <span>—</span>
          <span>□</span>
          <span>✕</span>
        </div>
      </div>

      {/* Main Drop Area */}
      <div className="flex flex-col items-center justify-center my-auto text-center py-1">
        <svg
          className={`w-6 h-6 text-purple-400 mb-1.5 transform -rotate-12 transition-transform duration-300 ${
            isHovered ? 'scale-110 drop-shadow-[0_0_12px_rgba(192,132,252,0.8)]' : ''
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM7 17v-4.5l5.5-5.5a4 4 0 0 1 5.66 5.66L12.66 18H7v-1z" />
        </svg>

        <h4 className="text-sm font-serif font-normal text-white">
          {dropped ? 'Ready to Trim' : 'Light as a feather'}
        </h4>
        <p className="text-[10px] text-mauve-text mt-0.5">
          {dropped ? 'video_clip_4k_60fps.mp4 loaded' : 'Drop a video here. Keep the part that matters.'}
        </p>

        <button
          onClick={handleClickChoose}
          className="mt-2.5 px-3 py-1 rounded-lg bg-violet-btn hover:bg-violet-hover text-white text-[10px] font-medium transition-all shadow-purple-glow flex items-center gap-1.5"
        >
          <Folder className="w-3 h-3 text-purple-200" />
          <span>{dropped ? 'Replace video' : 'Choose video'}</span>
        </button>
      </div>

      {/* Bottom status */}
      <div className="flex items-center justify-between text-[8px] font-mono text-mauve-subtle pt-1.5 border-t border-white/[0.04]">
        <span>MP4 · MOV · MKV · WebM</span>
        <Settings className="w-3 h-3 text-mauve-subtle" />
      </div>
    </div>
  );
}

/**
 * Preview: Particle Gravity Vortex (Game 1: Echoes of the Void)
 */
export function ParticleVortexPreview() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.offsetWidth || 340);
    let height = (canvas.height = canvas.offsetHeight || 176);

    const particles = [];
    const count = 75;
    const center = { x: width / 2, y: height / 2 };
    let mouse = { x: width / 2, y: height / 2, active: false };

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (height * 0.42) + 12;
      particles.push({
        angle,
        dist,
        speed: (Math.random() * 0.025 + 0.012) * (Math.random() > 0.5 ? 1 : -1),
        radius: Math.random() * 1.5 + 0.7,
        color: Math.random() > 0.4 ? '#c084fc' : '#e9d5ff',
      });
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = width / 2;
      mouse.y = height / 2;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      ctx.fillStyle = 'rgba(10, 5, 18, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const targetX = mouse.active ? mouse.x : width / 2;
      const targetY = mouse.active ? mouse.y : height / 2;

      center.x += (targetX - center.x) * 0.08;
      center.y += (targetY - center.y) * 0.08;

      // Singularity core
      ctx.beginPath();
      ctx.arc(center.x, center.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#c084fc';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#c084fc';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Orbiting particles
      particles.forEach((p) => {
        p.angle += p.speed;
        const x = center.x + Math.cos(p.angle) * p.dist;
        const y = center.y + Math.sin(p.angle) * p.dist * 0.65;

        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-obsidian-900/90 border border-white/[0.08]">
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
      <div className="absolute top-2.5 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-obsidian-950/80 border border-white/10 text-[9px] font-mono text-purple-200">
        <span>Vulkan Compute Particles</span>
      </div>
      <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-mauve-subtle">
        [Move to warp gravity]
      </div>
    </div>
  );
}

/**
 * Preview: N-Body Gravity Orbit (Game 2: Celestial Drift)
 */
export function OrbitalGravityPreview() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.offsetWidth || 340);
    let height = (canvas.height = canvas.offsetHeight || 176);

    const sun = { x: width / 2, y: height / 2, mass: 550 };
    const bodies = [
      { x: width / 2 + 55, y: height / 2, vx: 0, vy: 3.0, trail: [], color: '#c084fc' },
      { x: width / 2 - 80, y: height / 2, vx: 0, vy: -2.3, trail: [], color: '#a78bfa' },
    ];

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      bodies.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2.8,
        vy: (Math.random() - 0.5) * 2.8,
        trail: [],
        color: '#fcd34d',
      });
      sound.playGlassPing(2600, 0.3);
      if (bodies.length > 5) bodies.shift();
    };
    canvas.addEventListener('click', onClick);

    const render = () => {
      ctx.fillStyle = 'rgba(10, 5, 18, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Sun
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fde68a';
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#f59e0b';
      ctx.fill();
      ctx.shadowBlur = 0;

      bodies.forEach((b) => {
        const dx = sun.x - b.x;
        const dy = sun.y - b.y;
        const distSq = dx * dx + dy * dy + 100;
        const force = sun.mass / distSq;
        const dist = Math.sqrt(distSq);

        b.vx += (dx / dist) * force;
        b.vy += (dy / dist) * force;
        b.x += b.vx;
        b.y += b.vy;

        b.trail.push({ x: b.x, y: b.y });
        if (b.trail.length > 22) b.trail.shift();

        // Trail
        ctx.beginPath();
        for (let i = 0; i < b.trail.length; i++) {
          const pt = b.trail[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.45;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Body
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-obsidian-900/90 border border-white/[0.08]">
      <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />
      <div className="absolute top-2.5 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-obsidian-950/80 border border-white/10 text-[9px] font-mono text-purple-200">
        <span>Symplectic N-Body Orbit</span>
      </div>
      <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-mauve-subtle">
        [Click to launch satellite]
      </div>
    </div>
  );
}

/**
 * Preview: Playable Glass Audio Synthesizer (App: Aether Audio)
 */
export function AudioHarpPreview() {
  const [activeBar, setActiveBar] = useState(null);

  const chords = [
    { freq: 1046.5, note: 'C6' },
    { freq: 1318.5, note: 'E6' },
    { freq: 1567.9, note: 'G6' },
    { freq: 1975.5, note: 'B6' },
    { freq: 2349.3, note: 'D7' },
    { freq: 2637.0, note: 'E7' },
    { freq: 3135.9, note: 'G7' },
  ];

  const handleTrigger = (idx) => {
    setActiveBar(idx);
    sound.playNote(chords[idx].freq, 0.9, 'glass');
    setTimeout(() => setActiveBar(null), 250);
  };

  return (
    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-obsidian-900/90 border border-white/[0.08] p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono text-purple-200">C++ JUCE Core // 32-bit DSP</span>
        <span className="text-[9px] font-mono text-mauve-subtle">[Hover to chime]</span>
      </div>

      <div className="flex items-end justify-center gap-2 h-20 pb-1">
        {chords.map((chord, idx) => {
          const isActive = activeBar === idx;
          const heights = [45, 60, 75, 90, 80, 95, 70];
          return (
            <button
              key={idx}
              onMouseEnter={() => handleTrigger(idx)}
              onClick={() => handleTrigger(idx)}
              style={{ height: `${heights[idx]}%` }}
              className={`w-6 rounded-t-md transition-all duration-150 flex flex-col justify-end items-center pb-1 ${
                isActive
                  ? 'bg-purple-300 shadow-[0_0_15px_rgba(192,132,252,0.8)] scale-y-110'
                  : 'bg-gradient-to-t from-plum-900 to-purple-600/50 hover:to-purple-400'
              }`}
            >
              <span className="text-[8px] font-mono font-medium text-white/80 select-none">
                {chord.note}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[9px] font-mono text-mauve-subtle pt-1 border-t border-white/5">
        <span>Low-latency audio buffers</span>
        <span className="text-purple-300">&lt; 1.8ms buffer</span>
      </div>
    </div>
  );
}

/**
 * Preview: KTH RTX Vulkan Path Tracer Sphere
 */
export function PathTracerSpherePreview() {
  const [roughness, setRoughness] = useState(0.12);

  return (
    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-obsidian-900/90 border border-white/[0.08] p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono text-purple-200">KTH Hardware Ray Tracing</span>
        <span className="text-[9px] font-mono text-mauve-subtle">Vulkan VK_KHR</span>
      </div>

      <div className="flex items-center justify-center my-auto">
        <div
          className="relative w-18 h-18 rounded-full transition-all duration-300 flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 35% 35%, rgba(255, 255, 255, ${0.9 - roughness * 0.4}), rgba(192, 132, 252, 0.7) 40%, rgba(59, 7, 100, 0.95) 75%, #0f081c 100%)`,
            filter: `blur(${roughness * 1.5}px)`,
            boxShadow: `0 0 ${24 - roughness * 12}px rgba(192, 132, 252, ${0.5 - roughness * 0.25})`,
            width: '72px',
            height: '72px',
          }}
        >
          <div
            className="absolute top-2.5 left-3.5 w-4 h-2.5 rounded-full bg-white transform -rotate-30 opacity-80"
            style={{ filter: `blur(${roughness * 2}px)` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-1 border-t border-white/5 text-[9px] font-mono text-mauve-subtle">
        <span>Dielectric Glass IOR: 1.52</span>
        <div className="flex items-center gap-1.5">
          <span>Roughness: {roughness.toFixed(2)}</span>
          <input
            type="range"
            min="0.0"
            max="0.8"
            step="0.05"
            value={roughness}
            onChange={(e) => setRoughness(parseFloat(e.target.value))}
            className="w-16 accent-purple-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Preview: NovaNet Rollback Netcode Scrubber
 */
export function NetcodeScrubberPreview() {
  const [frame, setFrame] = useState(128);

  return (
    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-obsidian-900/90 border border-white/[0.08] p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono text-purple-200">Deterministic Netcode</span>
        <span className="text-[9px] font-mono text-mauve-subtle">0ms Desync</span>
      </div>

      <div className="my-auto space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
          <span>Rollback Window</span>
          <span className="text-purple-300 font-medium">Tick #{frame}</span>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 16 }).map((_, i) => {
            const isConfirmed = i <= 11;
            const isRollback = i > 11 && i <= 13;
            return (
              <div
                key={i}
                className={`flex-1 h-5 rounded-sm transition-all duration-200 ${
                  isConfirmed
                    ? 'bg-purple-600/70'
                    : isRollback
                    ? 'bg-purple-300 animate-pulse'
                    : 'bg-white/10'
                }`}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-[8px] font-mono text-mauve-subtle">
          <span>12 Confirmed</span>
          <span className="text-purple-300">2 Rollback Predicted</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] font-mono text-mauve-subtle pt-1 border-t border-white/5">
        <span>Deterministic state hash</span>
        <button
          onClick={() => {
            setFrame((f) => f + 1);
            sound.playGlassPing(3000, 0.3);
          }}
          className="text-purple-200 hover:text-white px-2 py-0.5 rounded bg-white/5 border border-white/10"
        >
          Step Next Tick ❯
        </button>
      </div>
    </div>
  );
}
