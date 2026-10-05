import { useEffect, useId, useRef } from 'react';

const TAU = Math.PI * 2;
const curves = [
  ...Array.from({ length: 48 }, (_, i) => Array.from({ length: 65 }, (_, j) => [i / 48 * TAU, j / 64 * TAU])),
  ...Array.from({ length: 16 }, (_, i) => Array.from({ length: 97 }, (_, j) => [j / 96 * TAU, i / 16 * TAU])),
].map(curve => curve.map(([u, v]) => ({
  cu: Math.cos(u), su: Math.sin(u), cv: Math.cos(v), sv: Math.sin(v),
  wave: Math.sin(u * 3), twist: Math.cos(u * 2),
})));

// Deform the surface itself rather than scaling a static illustration.
function surfacePath(curve, state) {
  const tilt = .9 + state.y * .26;
  const spin = -.45 + state.x * .3;
  const ct = Math.cos(tilt), st = Math.sin(tilt);
  const cs = Math.cos(spin), ss = Math.sin(spin);
  return curve.map((p, i) => {
    const tube = 40 + state.energy * (10 + p.wave * 10);
    const ring = 108 + state.energy * p.twist * 12;
    const radius = ring + tube * p.cv;
    const x = radius * p.cu;
    const y = radius * p.su;
    const z = tube * p.sv + state.energy * p.wave * 19;
    const yy = y * ct - z * st;
    const scale = 1 + state.energy * .06;
    return `${i ? 'L' : 'M'}${(200 + (x * cs - yy * ss) * scale).toFixed(1)},${(200 + (x * ss + yy * cs) * scale).toFixed(1)}`;
  }).join(' ');
}

const initial = { x: 0, y: 0, energy: 0 };
const initialPaths = curves.map(curve => surfacePath(curve, initial));

export default function CuriosityForm() {
  const gradientId = useId();
  const root = useRef(null);
  const target = useRef({ ...initial });
  const wake = useRef(() => {});
  const explored = useRef(false);

  useEffect(() => {
    const element = root.current;
    const paths = [...element.querySelectorAll('.surface-curve')];
    const stops = [...element.querySelectorAll('stop')];
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const current = { ...initial };
    let frame = 0, visible = true, lastTime = 0;

    function draw() {
      paths.forEach((path, i) => path.setAttribute('d', surfacePath(curves[i], current)));
      stops[0].setAttribute('stop-color', `hsl(${267 + current.x * 10} 65% ${61 + current.energy * 8}%)`);
      stops[1].setAttribute('stop-color', `hsl(${270 - current.y * 12} ${40 + current.energy * 30}% ${51 + current.energy * 9}%)`);
      element.dataset.evolved = current.energy > .5 ? 'true' : 'false';
    }
    function tick(time) {
      frame = 0;
      if (!visible || document.hidden) return;
      if (time - lastTime < 32) { frame = requestAnimationFrame(tick); return; }
      const factor = reduced.matches ? 1 : Math.min(.3, Math.max(.08, (time - lastTime) / 160));
      lastTime = time;
      let remaining = 0;
      for (const key of ['x', 'y', 'energy']) {
        const difference = target.current[key] - current[key];
        current[key] += difference * factor;
        remaining += Math.abs(difference);
      }
      draw();
      if (remaining > .004) frame = requestAnimationFrame(tick);
    }
    wake.current = () => {
      if (!frame && visible && !document.hidden) {
        lastTime = performance.now() - 33;
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake.current();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else wake.current();
    };
    observer.observe(element);
    document.addEventListener('visibilitychange', visibility);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener('visibilitychange', visibility); wake.current = () => {}; };
  }, []);

  function explore(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    target.current = {
      x: Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1)),
      y: Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1)),
      energy: 1,
    };
    explored.current = true;
    wake.current();
  }
  function settle() {
    target.current = { x: 0, y: 0, energy: explored.current ? .2 : 0 };
    wake.current();
  }
  function keyboard(event) {
    const delta = { ArrowLeft: [-.25, 0], ArrowRight: [.25, 0], ArrowUp: [0, -.25], ArrowDown: [0, .25] }[event.key];
    if (!delta) return;
    event.preventDefault();
    explored.current = true;
    target.current = { x: Math.max(-1, Math.min(1, target.current.x + delta[0])), y: Math.max(-1, Math.min(1, target.current.y + delta[1])), energy: 1 };
    wake.current();
  }
  return <button ref={root} className="curiosity-form" type="button"
    aria-label="Explore the geometric sculpture. Move your pointer, tap, or use arrow keys to change its form."
    onPointerMove={explore} onPointerEnter={explore} onPointerDown={explore} onPointerLeave={settle}
    onFocus={() => { target.current.energy = .65; wake.current(); }} onBlur={settle}
    onKeyDown={keyboard} onClick={() => { explored.current = true; target.current.energy = 1; target.current.y = -.25; wake.current(); }}>
    <svg viewBox="0 0 400 400" fill="none" aria-hidden="true">
      <defs><linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ad82df" /><stop offset="1" stopColor="#8554b6" /></linearGradient></defs>
      <g stroke={`url(#${gradientId})`} strokeWidth=".75">{initialPaths.map((path, i) => <path className="surface-curve" key={i} d={path} opacity={i < 48 ? '.72' : '.45'} />)}</g>
    </svg>
  </button>;
}

