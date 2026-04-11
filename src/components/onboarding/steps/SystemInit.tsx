import React, { useState, useEffect } from 'react';

const initMessages = [
  { text: 'Booting Vytreon OS Core...', delay: 0, type: 'system' },
  { text: 'Loading agentic intelligence modules...', delay: 600, type: 'system' },
  { text: 'Connecting to Vytreon Brain [████████████] OK', delay: 1200, type: 'success' },
  { text: '', delay: 1500, type: 'blank' },
  { text: 'Deploying AI workforce...', delay: 1700, type: 'system' },
  { text: '  ├─ Strategic Agent ........... ✓', delay: 2000, type: 'agent' },
  { text: '  ├─ Operations Agent ......... ✓', delay: 2200, type: 'agent' },
  { text: '  ├─ Marketing Agent .......... ✓', delay: 2400, type: 'agent' },
  { text: '  ├─ Engineering Agent ........ ✓', delay: 2600, type: 'agent' },
  { text: '  └─ Growth Agent ............. ✓', delay: 2800, type: 'agent' },
  { text: '', delay: 2900, type: 'blank' },
  { text: 'Linking product ecosystem...', delay: 3000, type: 'system' },
  { text: '  SireIQ · SEOAgentPro · Fycra · Fycera · CaptionIQ · Escazo', delay: 3300, type: 'product' },
  { text: '', delay: 3500, type: 'blank' },
  { text: 'Initializing autonomous decision engine...', delay: 3600, type: 'system' },
  { text: 'Calibrating multi-agent orchestration layer... OK', delay: 4000, type: 'success' },
  { text: '', delay: 4200, type: 'blank' },
  { text: '▸ Vytreon OS ready', delay: 4400, type: 'final' },
];

interface SystemInitProps {
  onComplete: () => void;
}

const SystemInit: React.FC<SystemInitProps> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = initMessages.map((msg, i) =>
      setTimeout(() => setVisibleLines(i + 1), msg.delay)
    );
    const progressInterval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 100 : prev + 2));
    }, 100);
    const completeTimer = setTimeout(onComplete, 5200);
    return () => { timers.forEach(clearTimeout); clearInterval(progressInterval); clearTimeout(completeTimer); };
  }, [onComplete]);

  const getColor = (type: string) => {
    switch (type) {
      case 'system': return 'text-muted-foreground/70';
      case 'success': return 'text-accent';
      case 'agent': return 'text-accent/80';
      case 'product': return 'text-accent-secondary';
      case 'final': return 'text-accent font-bold text-sm';
      default: return '';
    }
  };

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsla(43,55%,54%,0.03) 2px, hsla(43,55%,54%,0.03) 4px)',
      }} />

      <div className="w-full max-w-2xl px-8">
        <div className="rounded-2xl border border-border bg-card/95 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-background/80">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground/40 ml-2">vytreon-os — system initialization</span>
          </div>

          <div className="p-6 font-mono text-xs leading-loose min-h-[350px]">
            {initMessages.slice(0, visibleLines).map((msg, i) => (
              <div key={i} className={`${getColor(msg.type)} animate-fade-in`}>
                {msg.text || '\u00A0'}
              </div>
            ))}
            {visibleLines < initMessages.length && (
              <span className="inline-block w-1.5 h-3 bg-accent animate-pulse ml-0.5" />
            )}
          </div>

          <div className="px-6 pb-5">
            <div className="flex justify-between mb-2">
              <span className="text-[9px] font-mono text-muted-foreground/30 uppercase tracking-widest">Initialization</span>
              <span className="text-[9px] font-mono text-accent">{Math.min(progress, 100)}%</span>
            </div>
            <div className="h-0.5 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full transition-all duration-150" style={{ width: `${Math.min(progress, 100)}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemInit;
