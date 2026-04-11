import React, { useState, useEffect } from 'react';

const initMessages = [
  { text: 'Booting AWOS Kernel...', delay: 0, type: 'system' },
  { text: 'Loading Agent Runtime Engine...', delay: 400, type: 'system' },
  { text: 'Connecting to AWOS Core [████████████] OK', delay: 800, type: 'success' },
  { text: '', delay: 950, type: 'blank' },
  { text: 'Initializing Autonomous Strategy Engine (ASE)...', delay: 1100, type: 'system' },
  { text: '  ├─ Market Intelligence Module ..... ✓', delay: 1350, type: 'agent' },
  { text: '  ├─ Product Opportunity Engine ..... ✓', delay: 1500, type: 'agent' },
  { text: '  ├─ Growth Strategy Generator ...... ✓', delay: 1650, type: 'agent' },
  { text: '  └─ Experiment Planner ............. ✓', delay: 1800, type: 'agent' },
  { text: '', delay: 1900, type: 'blank' },
  { text: 'Initializing Executive Layer...', delay: 2000, type: 'system' },
  { text: '  ├─ AI CEO .................... ✓', delay: 2150, type: 'agent' },
  { text: '  ├─ AI CPO .................... ✓', delay: 2300, type: 'agent' },
  { text: '  ├─ AI CTO .................... ✓', delay: 2450, type: 'agent' },
  { text: '  └─ AI CMO .................... ✓', delay: 2600, type: 'agent' },
  { text: '', delay: 2700, type: 'blank' },
  { text: 'Mounting Department Coordination Layer...', delay: 2800, type: 'system' },
  { text: '  ├─ Engineering Dept .......... ✓', delay: 2950, type: 'agent' },
  { text: '  ├─ Marketing Dept ............ ✓', delay: 3100, type: 'agent' },
  { text: '  ├─ Sales Dept ................ ✓', delay: 3200, type: 'agent' },
  { text: '  └─ Security Dept ............. ✓', delay: 3300, type: 'agent' },
  { text: '', delay: 3400, type: 'blank' },
  { text: 'Starting Task Queue System... OK', delay: 3500, type: 'success' },
  { text: 'Spawning Worker Pool... OK', delay: 3700, type: 'success' },
  { text: 'Loading Memory Access Layer (shared knowledge)... OK', delay: 3900, type: 'success' },
  { text: 'Enabling Approval & Governance System... OK', delay: 4100, type: 'success' },
  { text: 'Activating Monitoring System... OK', delay: 4300, type: 'success' },
  { text: '', delay: 4400, type: 'blank' },
  { text: '▸ AWOS + ASE ready — your AI workforce awaits command', delay: 4600, type: 'final' },
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
      setProgress(prev => (prev >= 100 ? 100 : prev + 1.9));
    }, 100);
    const completeTimer = setTimeout(onComplete, 5400);
    return () => { timers.forEach(clearTimeout); clearInterval(progressInterval); clearTimeout(completeTimer); };
  }, [onComplete]);

  const getColor = (type: string) => {
    switch (type) {
      case 'system': return 'text-muted-foreground/70';
      case 'success': return 'text-accent';
      case 'agent': return 'text-accent/80';
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
            <span className="text-[10px] font-mono text-muted-foreground/40 ml-2">awos — system initialization</span>
          </div>

          <div className="p-6 font-mono text-xs leading-loose min-h-[400px] max-h-[450px] overflow-y-auto">
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
              <span className="text-[9px] font-mono text-muted-foreground/30 uppercase tracking-widest">AWOS Boot Sequence</span>
              <span className="text-[9px] font-mono text-accent">{Math.min(Math.round(progress), 100)}%</span>
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
