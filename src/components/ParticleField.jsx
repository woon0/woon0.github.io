import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';

const COUNT = 100;

export default function ParticleField() {
  const canvasRef = useRef(null);
  const surfaceRef = useRef(null);
  const engine = useRef(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const [playing, setPlaying] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [mode, setMode] = useState('attract');
  const settings = useRef({ playing, mode });

  useEffect(() => {
    const canvas = canvasRef.current;
    const surface = surfaceRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = 1, height = 1, particles = [], frame = 0, lastTime = 0;
    let visible = false, ripple = null;
    let background = '#ece7f0', ink = '#7952b3', faint = '#a98ac9';

    function palette() {
      const styles = getComputedStyle(surface);
      background = styles.getPropertyValue('--field-background').trim();
      ink = styles.getPropertyValue('--accent').trim();
      faint = document.documentElement.dataset.theme === 'dark' ? '#d4b8f0' : '#8d60ba';
      render(true);
    }
    function reset() {
      particles = Array.from({ length: COUNT }, (_, i) => {
        const angle = i * 2.39996;
        const radius = Math.sqrt((i + 1) / COUNT) * Math.min(width, height) * .36;
        return {
          x: width / 2 + Math.cos(angle) * radius,
          y: height / 2 + Math.sin(angle) * radius,
          vx: -Math.sin(angle) * 1.6, vy: Math.cos(angle) * 1.6,
        };
      });
      ripple = null;
      render(true);
      wake();
    }
    function scatter() {
      const origin = pointer.current.active ? pointer.current : { x: width / 2, y: height / 2 };
      particles.forEach(p => {
        const dx = p.x - origin.x, dy = p.y - origin.y;
        const distance = Math.hypot(dx, dy) || 1;
        const strength = Math.max(0, 1 - distance / (Math.max(width, height) * .7)) * 12;
        p.vx += dx / distance * strength;
        p.vy += dy / distance * strength;
        if (!settings.current.playing) { p.x += dx / distance * strength * 2; p.y += dy / distance * strength * 2; }
      });
      ripple = { x: origin.x, y: origin.y, radius: 4, alpha: .65 };
      render(!settings.current.playing);
      wake();
    }
    function update(dt) {
      // Read the same snapshot for every particle before applying the next step.
      const forces = particles.map(p => {
        let sx = 0, sy = 0, ax = 0, ay = 0, cx = 0, cy = 0, neighbors = 0;
        for (const other of particles) {
          if (other === p) continue;
          const dx = other.x - p.x, dy = other.y - p.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < 3800 && distanceSquared > 0) {
            neighbors++;
            ax += other.vx; ay += other.vy; cx += dx; cy += dy;
            if (distanceSquared < 280) { sx -= dx / Math.max(distanceSquared, 9); sy -= dy / Math.max(distanceSquared, 9); }
          }
        }
        let fx = sx * 1.1, fy = sy * 1.1;
        if (neighbors) {
          fx += (ax / neighbors - p.vx) * .026 + cx / neighbors * .0008;
          fy += (ay / neighbors - p.vy) * .026 + cy / neighbors * .0008;
        }
        const dx = width / 2 - p.x, dy = height / 2 - p.y;
        const distance = Math.hypot(dx, dy) || 1;
        fx += dx * .00022 - dy / distance * .018;
        fy += dy * .00022 + dx / distance * .018;
        if (pointer.current.active) {
          const mx = pointer.current.x - p.x, my = pointer.current.y - p.y;
          const md = Math.hypot(mx, my) || 1;
          const falloff = Math.max(0, 1 - md / 240);
          const direction = settings.current.mode === 'attract' ? 1 : -1;
          fx += mx / md * falloff * .22 * direction;
          fy += my / md * falloff * .22 * direction;
        }
        return { x: fx, y: fy };
      });
      particles.forEach((p, i) => {
        const previousSpeed = Math.hypot(p.vx, p.vy);
        p.vx += forces[i].x * dt; p.vy += forces[i].y * dt;
        const speed = Math.hypot(p.vx, p.vy) || 1;
        const limit = Math.max(2.3, previousSpeed * Math.pow(.975, dt));
        if (speed > limit) { p.vx *= limit / speed; p.vy *= limit / speed; }
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;
        if (p.y < -8) p.y = height + 8;
        if (p.y > height + 8) p.y = -8;
      });
      if (ripple) { ripple.radius += 3.5 * dt; ripple.alpha *= Math.pow(.94, dt); if (ripple.alpha < .015) ripple = null; }
    }
    function render(clear = false) {
      ctx.globalAlpha = clear ? 1 : .18;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = ink; ctx.lineWidth = 1.15;
      for (const p of particles) {
        const speed = Math.hypot(p.vx, p.vy) || 1;
        ctx.beginPath();
        ctx.moveTo(p.x - p.vx / speed * 6, p.y - p.vy / speed * 6);
        ctx.lineTo(p.x, p.y); ctx.stroke();
        ctx.fillStyle = faint;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.25, 0, Math.PI * 2); ctx.fill();
      }
      if (pointer.current.active) {
        ctx.globalAlpha = .5; ctx.strokeStyle = ink; ctx.lineWidth = .7;
        ctx.beginPath(); ctx.arc(pointer.current.x, pointer.current.y, 16, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(pointer.current.x - 4, pointer.current.y); ctx.lineTo(pointer.current.x + 4, pointer.current.y);
        if (settings.current.mode === 'attract') { ctx.moveTo(pointer.current.x, pointer.current.y - 4); ctx.lineTo(pointer.current.x, pointer.current.y + 4); }
        ctx.stroke(); ctx.globalAlpha = 1;
      }
      if (ripple) {
        ctx.globalAlpha = ripple.alpha; ctx.strokeStyle = faint; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2); ctx.stroke(); ctx.globalAlpha = 1;
      }
    }
    function tick(time) {
      frame = 0;
      if (!visible || document.hidden || !settings.current.playing) return;
      const dt = Math.min(2, Math.max(.2, (time - lastTime) / 16.667));
      lastTime = time;
      update(dt); render();
      frame = requestAnimationFrame(tick);
    }
    function wake() {
      if (!frame && visible && !document.hidden && settings.current.playing) { lastTime = performance.now(); frame = requestAnimationFrame(tick); }
    }
    function refresh() {
      if (!settings.current.playing) { cancelAnimationFrame(frame); frame = 0; render(true); }
      else wake();
    }
    function resize() {
      const bounds = surface.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      palette(); reset();
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(surface);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    intersection.observe(surface);
    const themeObserver = new MutationObserver(palette);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    function visibility() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else wake(); }
    document.addEventListener('visibilitychange', visibility);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const motionChanged = event => { if (event.matches) setPlaying(false); };
    reduced.addEventListener('change', motionChanged);
    engine.current = { scatter, reset, refresh, render: () => render(true) };
    return () => {
      cancelAnimationFrame(frame); resizeObserver.disconnect(); intersection.disconnect(); themeObserver.disconnect();
      document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', motionChanged); engine.current = null;
    };
  }, []);

  useEffect(() => { settings.current = { playing, mode }; engine.current?.refresh(); }, [playing, mode]);
  function move(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top, active: true };
    if (!playing) engine.current?.render();
  }
  function leave() { pointer.current.active = false; if (!playing) engine.current?.render(); }
  function keyboard(event) {
    const shift = { ArrowLeft: [-20, 0], ArrowRight: [20, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] }[event.key];
    if (shift) {
      event.preventDefault();
      const bounds = event.currentTarget.getBoundingClientRect();
      const start = pointer.current.active ? pointer.current : { x: bounds.width / 2, y: bounds.height / 2 };
      pointer.current = { x: Math.max(0, Math.min(bounds.width, start.x + shift[0])), y: Math.max(0, Math.min(bounds.height, start.y + shift[1])), active: true };
      if (!playing) engine.current?.render();
    }
    if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); engine.current?.scatter(); }
    if (event.key === 'Escape') leave();
  }

  return <div className="particle-field">
    <div className="field-heading"><span className="eyebrow">PARTICLE FIELD</span><span className="tiny-label">100 PARTICLES · {playing ? 'LIVE' : 'PAUSED'}</span></div>
    <div ref={surfaceRef} className="field-surface" tabIndex={0} role="group"
      aria-label="Interactive particle field. Move or drag to steer. Click, tap, Enter or Space to scatter. Arrow keys move the attractor."
      onPointerMove={move} onPointerDown={move} onPointerLeave={leave} onPointerCancel={leave} onBlur={leave}
      onClick={() => engine.current?.scatter()} onKeyDown={keyboard}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
    <div className="field-controls"><div className="field-modes" aria-label="Particle interaction">{['attract', 'repel'].map(value => <button key={value} aria-pressed={mode === value} onClick={() => setMode(value)}>{value === 'attract' ? 'Attract' : 'Repel'}</button>)}</div><button className="icon-button" onClick={() => engine.current?.reset()} aria-label="Reset particle field" title="Reset"><RotateCcw size={16} /></button><button className="icon-button" onClick={() => setPlaying(value => !value)} aria-label={playing ? 'Pause particle field' : 'Play particle field'} title={playing ? 'Pause' : 'Play'}>{playing ? <Pause size={16} /> : <Play size={16} />}</button></div>
    <p className="field-instruction">Move to steer. Click or tap to scatter.</p>
  </div>;
}
