import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const bootLines = [
  { text: 'VYTREON OS v2.1.0', delay: 0, type: 'header' },
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 200, type: 'divider' },
  { text: 'Initializing kernel...', delay: 400, type: 'system' },
  { text: 'Loading neural network modules...', delay: 700, type: 'system' },
  { text: 'Connecting to Vytreon Brain [████████████] OK', delay: 1200, type: 'success' },
  { text: '', delay: 1400, type: 'blank' },
  { text: 'Booting AI Agents:', delay: 1500, type: 'header' },
  { text: '  ├─ CEO Agent ............... ONLINE', delay: 1800, type: 'agent' },
  { text: '  ├─ SEO Manager ............ ONLINE', delay: 2000, type: 'agent' },
  { text: '  ├─ Content Manager ........ ONLINE', delay: 2200, type: 'agent' },
  { text: '  ├─ Product Manager ........ ONLINE', delay: 2400, type: 'agent' },
  { text: '  └─ Growth Manager ......... ONLINE', delay: 2600, type: 'agent' },
  { text: '', delay: 2700, type: 'blank' },
  { text: 'Activating Products:', delay: 2800, type: 'header' },
  { text: '  ├─ SireIQ .............. ✓ ACTIVE', delay: 3000, type: 'product' },
  { text: '  ├─ SEOAgentPro ......... ✓ ACTIVE', delay: 3150, type: 'product' },
  { text: '  ├─ Fycra ............... ✓ ACTIVE', delay: 3300, type: 'product' },
  { text: '  ├─ Fycera .............. ✓ ACTIVE', delay: 3450, type: 'product' },
  { text: '  ├─ CaptionIQ ........... ✓ ACTIVE', delay: 3600, type: 'product' },
  { text: '  └─ CumnIQ .............. ✓ ACTIVE', delay: 3750, type: 'product' },
  { text: '', delay: 3850, type: 'blank' },
  { text: 'All systems operational. Welcome to Vytreon OS.', delay: 4000, type: 'final' },
];

const TOTAL_DURATION = 4600;

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Line timers
    const lineTimers = bootLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, TOTAL_DURATION / 50);

    // Complete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, TOTAL_DURATION);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'header': return 'text-white font-bold';
      case 'divider': return 'text-white/20';
      case 'system': return 'text-white/50';
      case 'success': return 'text-[#00F5D4]';
      case 'agent': return 'text-[#6C5CE7]';
      case 'product': return 'text-[#00F5D4]';
      case 'final': return 'text-[#00F5D4] font-bold text-base';
      case 'blank': return '';
      default: return 'text-white/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F1A] flex items-center justify-center">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
      }} />

      <div className="w-full max-w-2xl px-8">
        {/* Terminal window */}
        <div className="rounded-xl border border-white/[0.08] bg-[#121826]/90 overflow-hidden shadow-2xl">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0B0F1A]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[11px] font-mono text-white/30 ml-2">vytreon-os — boot</span>
          </div>

          {/* Boot log */}
          <div className="p-6 font-mono text-xs leading-relaxed min-h-[400px] max-h-[60vh] overflow-y-auto">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <div 
                key={i} 
                className={`${getLineColor(line.type)} animate-fade-in`}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {line.text || '\u00A0'}
              </div>
            ))}
            {visibleLines < bootLines.length && (
              <span className="inline-block w-2 h-3.5 bg-[#6C5CE7] animate-pulse ml-0.5" />
            )}
          </div>

          {/* Progress bar */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-white/30">BOOT PROGRESS</span>
              <span className="text-[10px] font-mono text-[#6C5CE7]">{Math.min(progress, 100)}%</span>
            </div>
            <div className="h-1 w-full bg-white/[0.06] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] transition-all duration-100 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
