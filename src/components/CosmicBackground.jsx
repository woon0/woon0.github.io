import React, { useEffect, useRef } from 'react';

/**
 * CosmicBackground
 * Atmospheric obsidian-purple space with subtle ambient twilight nebulas,
 * soft twinkling stars, and faint mouse-reactive lavender stardust.
 */
export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      moved: false,
      lastX: width / 2,
      lastY: height / 2,
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.moved = true;

      const dx = e.clientX - mouse.lastX;
      const dy = e.clientY - mouse.lastY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;

      // Spawn soft, faint stardust particles on movement
      if (stardust.length < 90 && Math.random() < 0.6) {
        stardust.push({
          x: e.clientX + (Math.random() - 0.5) * 14,
          y: e.clientY + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * 0.6 + dx * 0.04,
          vy: (Math.random() - 0.5) * 0.6 + dy * 0.04,
          size: Math.random() * 1.6 + 0.6,
          alpha: Math.random() * 0.35 + 0.2,
          maxAlpha: Math.random() * 0.35 + 0.2,
          life: 0,
          maxLife: Math.random() * 80 + 60,
          color: Math.random() > 0.4 ? '#c084fc' : '#e9d5ff', // Lilac / Soft White
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Static/twinkling background stars
    let stars = [];
    const initStars = () => {
      stars = [];
      const starCount = Math.floor((width * height) / 8000);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.1 + 0.3,
          baseAlpha: Math.random() * 0.5 + 0.1,
          alpha: Math.random() * 0.5 + 0.1,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.6 ? '#ddd6fe' : '#ffffff',
        });
      }
    };
    initStars();

    let stardust = [];
    let meteors = [];

    const maybeSpawnMeteor = () => {
      if (meteors.length === 0 && Math.random() < 0.0025) {
        const startX = Math.random() * width * 1.2;
        const startY = Math.random() * (height * 0.4);
        const length = Math.random() * 100 + 70;
        const speed = Math.random() * 6 + 7;
        const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.2;

        meteors.push({
          x: startX,
          y: startY,
          length,
          speed,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          life: 0,
          maxLife: 45,
        });
      }
    };

    let tick = 0;
    const render = () => {
      tick++;

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Clear with obsidian-purple tone
      ctx.fillStyle = '#0a0512';
      ctx.fillRect(0, 0, width, height);

      // Deep atmospheric violet ambient glows (Feathercut velvet lighting)
      const grad1 = ctx.createRadialGradient(
        width * 0.25 + Math.sin(tick * 0.0015) * 40,
        height * 0.25 + Math.cos(tick * 0.0015) * 30,
        20,
        width * 0.25,
        height * 0.25,
        width * 0.6
      );
      grad1.addColorStop(0, 'rgba(59, 7, 100, 0.12)'); // Deep twilight purple
      grad1.addColorStop(0.6, 'rgba(30, 10, 50, 0.04)');
      grad1.addColorStop(1, 'rgba(10, 5, 18, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.75 + Math.cos(tick * 0.0012) * 50,
        height * 0.65 + Math.sin(tick * 0.0012) * 40,
        20,
        width * 0.75,
        height * 0.65,
        width * 0.55
      );
      grad2.addColorStop(0, 'rgba(88, 28, 135, 0.09)'); // Royal Amethyst
      grad2.addColorStop(0.7, 'rgba(19, 7, 34, 0.03)');
      grad2.addColorStop(1, 'rgba(10, 5, 18, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Subtle mouse purple aura
      if (mouse.moved) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          240
        );
        mouseGlow.addColorStop(0, 'rgba(124, 77, 255, 0.05)');
        mouseGlow.addColorStop(0.6, 'rgba(168, 85, 247, 0.015)');
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw distant stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.twinklePhase += star.twinkleSpeed;
        const currentAlpha =
          star.baseAlpha + Math.sin(star.twinklePhase) * 0.2 * star.baseAlpha;

        let drawX = star.x;
        let drawY = star.y;
        if (mouse.moved) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (1 - dist / 120) * 5;
            drawX -= (dx / dist) * force;
            drawY -= (dy / dist) * force;
          }
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.04, Math.min(0.8, currentAlpha));
        ctx.fill();
      }

      // Update and draw faint stardust particles
      for (let i = stardust.length - 1; i >= 0; i--) {
        const p = stardust[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        const progress = p.life / p.maxLife;
        let curAlpha = p.maxAlpha * (1 - progress);

        if (p.life >= p.maxLife) {
          stardust.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, curAlpha);
        ctx.fill();

        // Delicate constellation links
        for (let j = i - 1; j >= Math.max(0, i - 4); j--) {
          const p2 = stardust[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 55) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = (1 - dist / 55) * curAlpha * 0.25;
            ctx.stroke();
          }
        }
      }

      // Meteors
      maybeSpawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life++;
        m.x += m.vx;
        m.y += m.vy;

        const progress = m.life / m.maxLife;
        const currentAlpha = Math.sin(progress * Math.PI) * 0.6;

        if (m.life >= m.maxLife) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - (m.vx / m.speed) * m.length;
        const tailY = m.y - (m.vy / m.speed) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
        grad.addColorStop(0.3, `rgba(216, 180, 254, ${currentAlpha * 0.6})`);
        grad.addColorStop(1, 'rgba(124, 77, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 1;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#0a0512' }}
      aria-hidden="true"
    />
  );
}
