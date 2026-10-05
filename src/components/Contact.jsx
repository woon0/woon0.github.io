import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import GlassCard from './GlassCard';
import { sound } from '../utils/sound';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const emailAddress = 'ludvig@berglie.dev';

  const handleCopyEmail = () => {
    sound.playGlassPing(3200, 0.4);
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    sound.playCosmicWarp();
    setSending(true);

    setTimeout(() => {
      sound.playGlassChime([1760, 2217, 2637, 3520]);
      setSending(false);
      setSent(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-28">
      {/* Subtle background ambient violet bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-violet-600/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono mb-4">
          <Mail className="w-3.5 h-3.5 text-violet-400" />
          <span>Get in touch</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-white mb-4">
          Start a conversation
        </h2>
        <p className="max-w-xl mx-auto text-mauve-muted text-sm sm:text-base leading-relaxed">
          Whether you want to discuss game engine architecture, high-performance desktop tools, commercial collaborations, or engineering roles at KTH—my inbox is open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column: Direct Links & Direct Copy */}
        <div className="lg:col-span-5 space-y-5 text-left">
          {/* Email Quick-Copy Card */}
          <GlassCard
            enableTilt={true}
            soundPitch={1}
            className="p-6 border-white/[0.08] hover:border-violet-500/30"
          >
            <div className="text-[11px] font-mono text-purple-300/70 mb-1.5 uppercase tracking-wider">
              Direct Inquiries
            </div>
            <div className="text-base sm:text-lg font-mono text-white font-medium mb-4 select-all">
              {emailAddress}
            </div>

            <button
              onClick={handleCopyEmail}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium transition-all duration-300 flex items-center justify-center gap-2 border ${
                copied
                  ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200 shadow-md shadow-emerald-950/40'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] hover:border-violet-400/30 text-slate-200 hover:text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-purple-300/70" />
                  <span>Copy email address</span>
                </>
              )}
            </button>
          </GlassCard>

          {/* Social Profiles */}
          <GlassCard
            enableTilt={true}
            soundPitch={2}
            className="p-6 border-white/[0.08] space-y-2.5"
          >
            <div className="text-[11px] font-mono text-purple-300/70 mb-3 uppercase tracking-wider">
              Profiles & Code
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playGlassPing(2400, 0.25)}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-violet-500/30 text-slate-300 hover:text-white transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <GithubIcon className="w-4 h-4 text-purple-300/80 group-hover:text-purple-200" />
                <span className="text-xs font-mono">github.com/ludvigberglie</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-violet-300 transition-colors" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playGlassPing(2600, 0.25)}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-violet-500/30 text-slate-300 hover:text-white transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon className="w-4 h-4 text-violet-400 group-hover:text-violet-300" />
                <span className="text-xs font-mono">linkedin.com/in/ludvigberglie</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-violet-300 transition-colors" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playGlassPing(2800, 0.25)}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-violet-500/30 text-slate-300 hover:text-white transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <TwitterIcon className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                <span className="text-xs font-mono">x.com/ludvigberglie</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-violet-300 transition-colors" />
            </a>
          </GlassCard>
        </div>

        {/* Right Column: Clean Message Form */}
        <div className="lg:col-span-7 text-left">
          <GlassCard
            enableTilt={false}
            className="p-6 sm:p-8 border-white/[0.08]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-medium text-white">Send a direct message</h3>
              </div>
              <span className="text-[11px] font-mono text-purple-300/60">Stockholm (CET)</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-purple-200/70 mb-1.5 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  onFocus={() => sound.playGlassHover()}
                  placeholder="e.g. Maria Lindqvist"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-400/60 focus:bg-white/[0.06] transition-all duration-200 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-purple-200/70 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  onFocus={() => sound.playGlassHover()}
                  placeholder="maria@studio.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-400/60 focus:bg-white/[0.06] transition-all duration-200 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-purple-200/70 mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => sound.playGlassHover()}
                  placeholder="What would you like to discuss or collaborate on?"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-400/60 focus:bg-white/[0.06] transition-all duration-200 font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className={`w-full py-3 px-6 rounded-xl font-medium text-xs font-mono tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 border ${
                  sent
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-950/40'
                    : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 border-violet-400/40 text-white shadow-lg shadow-violet-950/40 active:scale-[0.99]'
                }`}
              >
                {sending ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-violet-300 border-t-transparent animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : sent ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Message sent! Thank you.</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send message</span>
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
