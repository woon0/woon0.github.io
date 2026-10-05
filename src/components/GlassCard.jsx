import React, { useRef, useState } from 'react';
import { sound } from '../utils/sound';

/**
 * GlassCard
 * Feathercut-inspired acrylic frosted glass container with subtle 3D tilt,
 * soft purple specular glare, and tactile audio feedback.
 */
export default function GlassCard({
  children,
  className = '',
  enableTilt = true,
  glare = true,
  onClick,
  soundPitch = 0,
  hoverSound = true,
  ...props
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5.5;
    const rotateY = ((x - centerX) / centerX) * 5.5;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseEnter = () => {
    if (hoverSound) {
      sound.playGlassHover(soundPitch);
    }
  };

  const handleMouseLeave = () => {
    if (!enableTilt) return;
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleClick = (e) => {
    sound.playGlassClick();
    if (onClick) onClick(e);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: transform,
        transition: transform ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
      }}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-850/60 backdrop-blur-2xl shadow-feather-card transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Specular Glare */}
      {glare && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(400px circle at ${glarePos.x}% ${glarePos.y}%, rgba(216, 180, 254, 0.12), transparent 75%)`,
          }}
        />
      )}

      {/* Top subtle highlight edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent" />

      {children}
    </div>
  );
}
