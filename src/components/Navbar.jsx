import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Navbar({ activeSection = 'hero' }) {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = sound.subscribe((muted) => setIsMuted(muted));
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { label: 'Overview', href: '#hero', id: 'hero' },
    { label: 'Work', href: '#projects', id: 'projects' },
    { label: 'Skills & KTH', href: '#skills', id: 'skills' },
    { label: 'Journey', href: '#timeline', id: 'timeline' },
    { label: 'Acoustics', href: '#playground', id: 'playground' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    sound.playGlassPing(2200, 0.3);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const yOffset = -85;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <nav
        className={`pointer-events-auto w-full max-w-4xl rounded-full transition-all duration-500 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border ${
          scrolled
            ? 'bg-obsidian-900/80 backdrop-blur-2xl border-white/[0.12] shadow-feather-glass'
            : 'bg-obsidian-850/50 backdrop-blur-xl border-white/[0.08]'
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-2.5 focus:outline-none"
        >
          {/* Feathercut-inspired feather monogram */}
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-plum-800/50 border border-white/10 group-hover:border-purple-400/50 transition-all duration-300">
            <svg
              className="w-4 h-4 text-purple-300 transform -rotate-12 group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM7 17v-4.5l5.5-5.5a4 4 0 0 1 5.66 5.66L12.66 18H7v-1z" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium tracking-tight text-white group-hover:text-purple-200 transition-colors">
              Ludvig Berglie
            </span>
            <span className="text-[10px] text-mauve-text font-mono">
              KTH • Stockholm
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={() => sound.playGlassHover()}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-white/[0.09] shadow-inner'
                    : 'text-mauve-text hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right Actions: Sound Toggle + Contact Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Subtle Glass Audio Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute glass audio' : 'Mute glass audio'}
            title={isMuted ? 'Sound muted (Click to enable)' : 'Glass sound active (Click to mute)'}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono border transition-all duration-300 ${
              !isMuted
                ? 'bg-plum-800/40 border-purple-500/30 text-purple-200 hover:bg-plum-800/60'
                : 'bg-white/[0.03] border-white/10 text-mauve-subtle hover:text-white'
            }`}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-purple-300" />
                <span className="hidden sm:inline text-[11px] text-purple-200">Audio</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Muted</span>
              </>
            )}
          </button>

          {/* Feathercut-inspired Violet Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-violet-btn hover:bg-violet-hover text-white text-xs font-medium transition-all duration-200 shadow-purple-glow hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get in touch</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              sound.playGlassClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-xl text-mauve-text hover:text-white bg-white/[0.04] border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto fixed inset-x-4 top-20 rounded-2xl bg-obsidian-900/95 backdrop-blur-2xl border border-white/12 p-5 shadow-feather-glass space-y-2 z-50">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <span>{item.label}</span>
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-mauve-text">Glass acoustics</span>
            <button
              onClick={handleToggleSound}
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.05] border border-white/10 text-purple-300"
            >
              {isMuted ? 'Sound Off' : 'Sound On'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
