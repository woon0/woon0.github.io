import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, X, Menu, Copy, Check } from 'lucide-react';
import { PROJECTS } from './data/projects';
import ProjectArt from './components/ProjectArt';
import ThemeToggle from './components/ThemeToggle';
import CuriosityForm from './components/CuriosityForm';
import ParticleField from './components/ParticleField';

const currentYear = new Date().getFullYear();
const groups = ['All work', 'Applications', 'Games', 'Engineering'];
const category = p => p.category === 'Applications' ? 'Applications' : p.category === 'Commercial Games' ? 'Games' : 'Engineering';
const descriptions = [
  'A lightweight video trimmer. Less waiting, fewer clicks, no re-encoding.',
  'A physics rogue-lite built on a custom C++ engine and Vulkan renderer.',
  'An orbital mechanics game about gravity, timing, and finding your trajectory.',
  'A spatial audio workstation built around a low-latency C++ audio engine.',
  'Hardware-accelerated ray tracing, physically based materials, and real-time denoising.',
  'A Rust networking framework for responsive, deterministic multiplayer games.',
];
function Modal({ item, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; dialog.close(); previous?.focus(); };
  }, []);
  const resume = item === 'resume';
  return <dialog ref={ref} className="detail-dialog" aria-labelledby="dialog-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}><div className="dialog-content">
    <div className="dialog-top"><span className="eyebrow">{resume ? 'PROFILE / LUDVIG BERGLIE' : `PROJECT NOTES / ${category(item)}`}</span><button onClick={onClose} className="icon-button" aria-label="Close dialog"><X size={23} /></button></div>
    <h2 id="dialog-title">{resume ? 'A little background.' : item.title}</h2>
    {resume ? <><p className="dialog-intro">Game & application developer. Engineering student at KTH Royal Institute of Technology, Stockholm.</p><h3>Experience</h3>{[['2024 — Present', 'Independent development & engineering', 'Building commercial games and applications alongside engineering studies at KTH.'], ['2023 — 2024', 'Game engine & graphics programming', 'Custom rendering pipelines, GPU particles, and deterministic physics for commercial games.'], ['2022 — 2023', 'Desktop & mobile applications', 'Video processing with FFmpeg and audio tools built with C++ and JUCE.']].map(([date, title, text]) => <div className="resume-row" key={date}><span>{date}</span><div><h4>{title}</h4><p>{text}</p></div></div>)}<h3>Technical focus</h3><p>C++ · Vulkan · GLSL · Rust · C# · FFmpeg · JUCE · Real-time graphics</p><h3>LLMs & agents</h3><p>Extensive hands-on experience working with LLMs and agents in software development, with a focus on effective workflows and careful verification.</p><a className="primary-button" href="mailto:ludvig@berglie.dev">Get in touch <ArrowUpRight size={18} /></a></> : <><p className="dialog-intro">{descriptions[PROJECTS.findIndex(p => p.id === item.id)]}</p><div className={`dialog-art cover-${item.previewType}`}><ProjectArt type={item.previewType} /></div>{item.previewType === 'feathercut' && <figure className="product-screenshot"><img src="/images/feathercut-desktop.png" alt="Feathercut desktop application with a purple cloud video, trim selection, playback controls, and export action" loading="lazy" /><figcaption>Feathercut — the desktop application</figcaption></figure>}<h3>Under the hood</h3><ul className="project-highlights">{item.highlights.map(h => <li key={h}>{h}</li>)}</ul><div className="stack-list">{item.stack.map(t => <span key={t}>{t}</span>)}</div>{item.github && <a href={item.github} className="text-link" target="_blank" rel="noreferrer">View source on GitHub <ArrowUpRight size={18} /></a>}</>}
  </div></dialog>;
}
export default function App() {
  const [filter, setFilter] = useState('All work');
  const [modal, setModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyEmail() {
    try { await navigator.clipboard.writeText('ludvig@berglie.dev'); setCopied(true); setCopyError(false); clearTimeout(timer.current); timer.current = setTimeout(() => setCopied(false), 2500); }
    catch { setCopyError(true); }
  }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a className="wordmark" href="#home" aria-label="Ludvig Berglie home">lb<span>.</span></a><span className="header-role">INDEPENDENT DEVELOPER<br />STOCKHOLM, SWEDEN</span><button className="mobile-menu icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button><nav id="navigation" className={menuOpen ? 'is-open' : ''} aria-label="Main navigation"><a href="#work" onClick={() => setMenuOpen(false)}>Work <span>01</span></a><a href="#about" onClick={() => setMenuOpen(false)}>About <span>02</span></a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact <ArrowUpRight size={15} /></a></nav><ThemeToggle /></header>
    <main id="main">
      <section className="hero page-width" id="home"><div className="hero-topline"><span className="eyebrow"><i className="status-dot" /> GAMES, TOOLS & THE SYSTEMS BEHIND THEM</span><span className="tiny-label">PORTFOLIO — SELECTED WORK</span></div><div className="hero-layout"><div className="hero-copy"><h1>Curious by nature.<br /><span className="serif">Engineer by practice.</span></h1><div className="hero-description"><span className="small-cross">+</span><p>I’m Ludvig Berglie. I build games, applications, and the engines that make them run. Currently studying engineering at KTH in Stockholm.</p></div><div className="hero-actions"><a href="#work" className="primary-button">Discover my work <ArrowDown size={17} /></a><button className="text-link" onClick={() => setModal('resume')}>View profile <ArrowUpRight size={17} /></button></div></div><div className="hero-visual"><div className="hero-wire"><CuriosityForm /></div><span className="visual-note">FIG. 01 — FORM FOLLOWS CURIOSITY<span className="interaction-hint">MOVE, TAP, OR EXPLORE WITH ARROW KEYS</span></span><span className="visual-coordinates">59°20′ N<br />18°04′ E</span></div></div><div className="hero-bottom"><span>C++ / GRAPHICS / LLMs & AGENTS</span><a href="#work">SCROLL TO EXPLORE <ArrowDown size={14} /></a></div></section>
      <section id="work" className="work-section"><div className="page-width"><div className="section-heading"><div><span className="eyebrow section-index">01 / SELECTED WORK</span><h2>Made to be <span className="serif">used.</span></h2></div><p>From the first prototype to the final frame.<br />A selection of games, tools, and technical explorations.</p></div><div className="work-toolbar"><div className="filters" aria-label="Filter projects">{groups.map(g => <button key={g} className={filter === g ? 'selected' : ''} aria-pressed={filter === g} onClick={() => setFilter(g)}>{g}<span>{g === 'All work' ? PROJECTS.length : PROJECTS.filter(p => category(p) === g).length}</span></button>)}</div><span className="tiny-label">DESIGN → BUILD → SHIP</span></div><div className="project-grid">{PROJECTS.filter(p => filter === 'All work' || category(p) === filter).map(p => <article className="project" key={p.id}><button className={`project-cover cover-${p.previewType}`} onClick={() => setModal(p)} aria-label={`View ${p.title} project notes`}><div className="cover-top"><span>{category(p)} / {String(PROJECTS.indexOf(p) + 1).padStart(2, '0')}</span><span className="cover-arrow"><ArrowUpRight size={20} /></span></div><ProjectArt type={p.previewType} /><span className="cover-bottom">{p.stack.slice(0, 2).join(' / ')}</span></button><div className="project-info"><div><button onClick={() => setModal(p)} className="project-title">{p.title.replace(': Kinetic Orbit', '').replace(': Rollback Netcode Engine', '')}</button><p>{descriptions[PROJECTS.indexOf(p)]}</p></div><span className="project-kind">{category(p)}</span></div></article>)}</div></div></section>
      <section id="about" className="about-section page-width"><div className="about-copy"><span className="eyebrow section-index">02 / THE PERSON BEHIND THE CODE</span><h2>How I <span className="serif">work.</span></h2><p>I like knowing how things work. That curiosity takes me from rendering pipelines and physics simulations to the small details that make an application feel right.</p><p>At KTH, I’m developing the foundations behind that work. Outside the classroom, I put them to use building games and applications.</p><p>I also have extensive hands-on experience working with LLMs and agents in software development. I bring the same attention to architecture, debugging, and code quality to those workflows.</p><button className="text-link" onClick={() => setModal('resume')}>More about my background <ArrowUpRight size={18} /></button><div className="focus-list">{[['01', 'Games & engines', 'C++ · C# · Vulkan · Physics'], ['02', 'Useful applications', 'FFmpeg · JUCE · Native tools'], ['03', 'Graphics & systems', 'Ray tracing · GLSL · Rust'], ['04', 'LLMs & agents', 'Development workflows · Context · Verification']].map(([n, title, tools]) => <div key={n}><span>{n}</span><h3>{title}</h3><p>{tools}</p></div>)}</div></div><div className="about-aside"><ParticleField /></div></section>
      <section id="contact" className="contact-section"><div className="page-width"><div className="contact-top"><span className="eyebrow section-index">03 / WHAT’S NEXT?</span><span className="tiny-label">BASED IN STOCKHOLM · OPEN TO CONVERSATION</span></div><h2>Let’s build<br />something <span className="serif">good.</span><a href="mailto:ludvig@berglie.dev" className="contact-arrow" aria-label="Email Ludvig"><ArrowUpRight /></a></h2><div className="contact-bottom"><p>A project, an opportunity, or a shared curiosity.<br />I’d like to hear about it.</p><div className="email-group"><a href="mailto:ludvig@berglie.dev">ludvig@berglie.dev</a><button onClick={copyEmail} className="icon-button" aria-label="Copy email address">{copied ? <Check size={19} /> : <Copy size={19} />}</button><span role="status" className="copy-status">{copied ? 'Email copied' : copyError ? 'Please use the email link' : ''}</span></div></div></div></section>
    </main>
    <footer className="site-footer page-width"><a className="wordmark" href="#home">lb<span>.</span></a><p>© {currentYear} Ludvig Berglie</p><a href="https://github.com/ludvigberglie" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a><a href="#home" className="back-top">Back to top <ArrowUpRight size={15} /></a></footer>
    {modal && <Modal item={modal} onClose={() => setModal(null)} />}
  </>;
}




