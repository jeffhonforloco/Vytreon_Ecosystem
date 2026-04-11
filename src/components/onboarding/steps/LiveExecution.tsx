import React, { useState, useEffect } from 'react';
import { Search, FileText, Video, Code, Activity } from 'lucide-react';

const executionItems = [
  { product: 'SEOAgentPro', icon: Search, text: 'Auditing website structure and meta tags...', delay: 0 },
  { product: 'CaptionIQ', icon: FileText, text: 'Generating 15 social media posts...', delay: 800 },
  { product: 'Fycera', icon: Video, text: 'Creating promotional video content...', delay: 1600 },
  { product: 'Fycra', icon: Code, text: 'Building automation workflows...', delay: 2400 },
  { product: 'SireIQ', icon: Activity, text: 'Synthesizing competitive analysis report...', delay: 3200 },
];

interface LiveExecutionProps {
  onComplete: () => void;
}

const LiveExecution: React.FC<LiveExecutionProps> = ({ onComplete }) => {
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    const timers = executionItems.map((item, i) =>
      setTimeout(() => setVisibleItems(i + 1), item.delay)
    );
    timers.push(setTimeout(onComplete, 4800));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] bg-accent/[0.03]" />

      <div className="relative z-10 w-full max-w-2xl px-8">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-mono text-accent/60 uppercase tracking-widest">Live Execution</span>
        </div>
        <p className="text-center text-muted-foreground/30 text-xs font-mono mb-8">Vytreon OS agents are working across the product ecosystem</p>

        <div className="space-y-2">
          {executionItems.slice(0, visibleItems).map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-4 px-5 py-4 rounded-xl border border-border/40 bg-secondary/10 animate-fade-in">
                <div className="relative">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2">
                    <div className="w-full h-full rounded-full border border-accent/40 border-t-transparent animate-spin" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-accent">{item.product}</span>
                  <p className="text-sm text-muted-foreground font-mono truncate">{item.text}</p>
                </div>
                <div className="text-[9px] font-mono text-muted-foreground/20">now</div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-1">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className="w-1 rounded-full bg-accent animate-pulse" style={{ height: `${12 + Math.random() * 16}px`, animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveExecution;
