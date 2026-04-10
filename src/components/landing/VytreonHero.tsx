import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Terminal, Cpu, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const typewriterLines = [
  { text: '> Initializing Vytreon Brain...', delay: 0 },
  { text: '> Loading AI agents: CEO, SEO, Content, Growth...', delay: 800 },
  { text: '> Connecting products: SireIQ, Fycra, Fycera, SEOAgentPro...', delay: 1600 },
  { text: '> Autonomous mode: READY', delay: 2400 },
  { text: '> System online. Awaiting your command.', delay: 3200 },
];

const VytreonHero = () => {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = typewriterLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B0F1A]">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(108,92,231,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108,92,231,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#6C5CE7]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00F5D4]/8 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6C5CE7]/30 bg-[#6C5CE7]/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
              <span className="text-xs font-mono font-medium text-[#00F5D4] tracking-wider uppercase">System Online</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
              The AI Operating System for{' '}
              <span className="bg-gradient-to-r from-[#6C5CE7] via-[#00F5D4] to-[#6C5CE7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                Autonomous Companies
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/50 mb-10 leading-relaxed max-w-xl">
              Give Vytreon OS a goal. AI agents plan, execute, and optimize across your 
              entire product ecosystem — SireIQ, Fycra, SEOAgentPro, and more — autonomously.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="relative bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white px-10 py-7 text-lg font-semibold rounded-xl h-auto group transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(108,92,231,0.5)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Terminal size={20} />
                  Launch Vytreon OS
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Button>
              <Button 
                onClick={() => {
                  const el = document.getElementById('products');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline" 
                size="lg"
                className="px-10 py-7 text-lg font-semibold rounded-xl h-auto border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-white/70 hover:text-white transition-all duration-300"
              >
                Explore Ecosystem
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { value: '12+', label: 'Products' },
                { value: '6', label: 'AI Agents' },
                { value: '∞', label: 'Autonomous' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">{stat.value}</div>
                  <div className="text-xs text-white/30 uppercase tracking-wider font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Terminal preview */}
          <div className="relative">
            <div className="rounded-2xl border border-white/[0.08] bg-[#121826] overflow-hidden shadow-2xl shadow-black/50">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0B0F1A]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[11px] font-mono text-white/30 ml-2">vytreon-os@brain ~ $</span>
              </div>
              
              {/* Terminal body */}
              <div className="p-6 font-mono text-sm space-y-3 min-h-[280px]">
                {typewriterLines.map((line, i) => (
                  <div 
                    key={i}
                    className={`transition-all duration-500 ${
                      i < visibleLines 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-2'
                    }`}
                  >
                    <span className={
                      line.text.includes('READY') || line.text.includes('online')
                        ? 'text-[#00F5D4]' 
                        : line.text.includes('Loading') || line.text.includes('Connecting')
                        ? 'text-[#6C5CE7]'
                        : 'text-white/60'
                    }>
                      {line.text}
                    </span>
                  </div>
                ))}
                
                {visibleLines >= typewriterLines.length && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                    <span className="text-[#00F5D4]">▶</span>
                    <span className="text-white/40">|</span>
                    <span className="w-2 h-4 bg-[#6C5CE7] animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Floating agent cards */}
            <div className="absolute -top-4 -right-4 glass-card rounded-xl p-3 border border-white/[0.08] animate-float-luxury" style={{ animationDelay: '0s' }}>
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-[#6C5CE7]" />
                <span className="text-[11px] font-mono text-white/60">CEO Agent</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#00F5D4]" />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 glass-card rounded-xl p-3 border border-white/[0.08] animate-float-luxury" style={{ animationDelay: '2s' }}>
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-[#00F5D4]" />
                <span className="text-[11px] font-mono text-white/60">18 tasks active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VytreonHero;
