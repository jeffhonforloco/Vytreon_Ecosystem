import React, { useState, useEffect } from 'react';
import { Search, FileText, Video, Code, Activity } from 'lucide-react';

const executionItems = [
  { product: 'SEOAgentPro', icon: Search, text: 'Auditing website structure and meta tags...', color: '#00F5D4', delay: 0 },
  { product: 'CaptionIQ', icon: FileText, text: 'Generating 15 social media posts...', color: '#FF6B6B', delay: 800 },
  { product: 'Fycera', icon: Video, text: 'Creating promotional video content...', color: '#FECA57', delay: 1600 },
  { product: 'Fycra', icon: Code, text: 'Building automation workflows...', color: '#74B9FF', delay: 2400 },
  { product: 'SireIQ', icon: Activity, text: 'Synthesizing competitive analysis report...', color: '#6C5CE7', delay: 3200 },
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
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] bg-[#00F5D4]/5" />

      <div className="relative z-10 w-full max-w-2xl px-8">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
          <span className="text-[10px] font-mono text-[#00F5D4]/60 uppercase tracking-widest">Live Execution</span>
        </div>
        <p className="text-center text-white/20 text-xs font-mono mb-8">Agents are working across your product ecosystem</p>

        {/* Feed */}
        <div className="space-y-2">
          {executionItems.slice(0, visibleItems).map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4 rounded-xl border border-white/[0.04] bg-white/[0.02] animate-fade-in"
              >
                <div className="relative">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${item.color}12` }}>
                    <Icon size={16} style={{ color: item.color }} />
                  </div>
                  {/* Spinning indicator */}
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2">
                    <div className="w-full h-full rounded-full border border-t-transparent animate-spin" style={{ borderColor: `${item.color}60`, borderTopColor: 'transparent' }} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider" style={{ color: item.color }}>
                      {item.product}
                    </span>
                  </div>
                  <p className="text-sm text-white/50 font-mono truncate">{item.text}</p>
                </div>
                <div className="text-[9px] font-mono text-white/15">now</div>
              </div>
            );
          })}
        </div>

        {/* Activity indicator */}
        <div className="mt-6 flex justify-center gap-1">
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="w-1 rounded-full bg-[#6C5CE7] animate-pulse"
              style={{
                height: `${12 + Math.random() * 16}px`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveExecution;
