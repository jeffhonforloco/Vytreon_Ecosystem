import React, { useState, useEffect } from 'react';

const initMessages = [
  { text: 'Booting Vytreon Core...', delay: 0, type: 'system' },
  { text: 'Loading neural network modules...', delay: 600, type: 'system' },
  { text: 'Connecting to Vytreon Brain [████████████] OK', delay: 1200, type: 'success' },
  { text: '', delay: 1500, type: 'blank' },
  { text: 'Loading AI agents...', delay: 1700, type: 'system' },
  { text: '  ├─ CEO Agent ............... ✓', delay: 2000, type: 'agent' },
  { text: '  ├─ SEO Manager ............ ✓', delay: 2200, type: 'agent' },
  { text: '  ├─ Content Manager ........ ✓', delay: 2400, type: 'agent' },
  { text: '  ├─ Product Manager ........ ✓', delay: 2600, type: 'agent' },
  { text: '  └─ Growth Manager ......... ✓', delay: 2800, type: 'agent' },
  { text: '', delay: 2900, type: 'blank' },
  { text: 'Connecting product ecosystem...', delay: 3000, type: 'system' },
  { text: '  SireIQ · SEOAgentPro · Fycra · Fycera · CumnIQ · CaptionIQ', delay: 3300, type: 'product' },
  { text: '', delay: 3500, type: 'blank' },
  { text: 'Initializing intelligence layer...', delay: 3600, type: 'system' },
  { text: 'Calibrating autonomous decision engine... OK', delay: 4000, type: 'success' },
  { text: '', delay: 4200, type: 'blank' },
  { text: '▸ System ready', delay: 4400, type: 'final' },
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

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const getColor = (type: string) => {
    switch (type) {
      case 'system': return 'text-white/50';
      case 'success': return 'text-[#00F5D4]';
      case 'agent': return 'text-[#6C5CE7]';
      case 'product': return 'text-[#00F5D4]/80';
      case 'final': return 'text-[#00F5D4] font-bold text-sm';
      default: return '';
    }
  };

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      {/* Scanline */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)',
      }} />

      <div className="w-full max-w-2xl px-8">
        <div className="rounded-2xl border border-white/[0.06] bg-[#121826]/95 overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-[#0B0F1A]/80">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
            </div>
            <span className="text-[10px] font-mono text-white/20 ml-2">vytreon-os — system initialization</span>
          </div>

          {/* Log */}
          <div className="p-6 font-mono text-xs leading-loose min-h-[350px]">
            {initMessages.slice(0, visibleLines).map((msg, i) => (
              <div key={i} className={`${getColor(msg.type)} animate-fade-in`}>
                {msg.text || '\u00A0'}
              </div>
            ))}
            {visibleLines < initMessages.length && (
              <span className="inline-block w-1.5 h-3 bg-[#6C5CE7] animate-pulse ml-0.5" />
            )}
          </div>

          {/* Progress */}
          <div className="px-6 pb-5">
            <div className="flex justify-between mb-2">
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Initialization</span>
              <span className="text-[9px] font-mono text-[#6C5CE7]">{Math.min(progress, 100)}%</span>
            </div>
            <div className="h-0.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] rounded-full transition-all duration-150"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemInit;
