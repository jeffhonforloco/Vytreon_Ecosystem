import React, { useState, useEffect } from 'react';
import { Brain, Search, FileText, TrendingUp, Zap } from 'lucide-react';

interface AIPlanningStreamProps {
  goal: string;
  onComplete: () => void;
}

const AIPlanningStream: React.FC<AIPlanningStreamProps> = ({ goal, onComplete }) => {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [streamingText, setStreamingText] = useState('');
  const [currentStreaming, setCurrentStreaming] = useState(-1);

  const planMessages = [
    { agent: 'CEO Agent', icon: Brain, color: '#6C5CE7', text: `Analyzing goal: "${goal}"...` },
    { agent: 'CEO Agent', icon: Brain, color: '#6C5CE7', text: 'Designing multi-agent strategy...' },
    { agent: 'SEO Manager', icon: Search, color: '#00F5D4', text: 'Planning optimization tasks across 12 ranking factors...' },
    { agent: 'Content Manager', icon: FileText, color: '#FF6B6B', text: 'Preparing content pipeline — blog, social, video...' },
    { agent: 'Growth Manager', icon: TrendingUp, color: '#FECA57', text: 'Allocating resources across 6 product channels...' },
    { agent: 'CEO Agent', icon: Brain, color: '#6C5CE7', text: 'Strategy complete. Deploying agents.' },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    
    planMessages.forEach((msg, i) => {
      // Start streaming for this message
      timers.push(setTimeout(() => {
        setCurrentStreaming(i);
        setStreamingText('');
        
        // Stream characters
        const chars = msg.text.split('');
        chars.forEach((char, ci) => {
          timers.push(setTimeout(() => {
            setStreamingText(prev => prev + char);
            if (ci === chars.length - 1) {
              // Done streaming this message
              setTimeout(() => {
                setVisibleMessages(i + 1);
                setCurrentStreaming(-1);
              }, 200);
            }
          }, ci * 18));
        });
      }, i * 1200));
    });

    timers.push(setTimeout(onComplete, planMessages.length * 1200 + 800));

    return () => timers.forEach(clearTimeout);
  }, [onComplete, goal]);

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] bg-[#6C5CE7]/6" />
      
      <div className="relative z-10 w-full max-w-2xl px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <Zap size={16} className="text-[#6C5CE7]" />
          <span className="text-xs font-mono text-[#6C5CE7] uppercase tracking-widest">AI Planning in Progress</span>
        </div>

        {/* Goal card */}
        <div className="mb-8 px-5 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider">Mission</span>
          <p className="text-white/70 font-mono text-sm mt-1">"{goal}"</p>
        </div>

        {/* Stream */}
        <div className="space-y-1">
          {planMessages.slice(0, visibleMessages).map((msg, i) => {
            const Icon = msg.icon;
            return (
              <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.02] animate-fade-in">
                <div className="mt-0.5 p-1.5 rounded-lg" style={{ backgroundColor: `${msg.color}15` }}>
                  <Icon size={13} style={{ color: msg.color }} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: `${msg.color}99` }}>{msg.agent}</span>
                  <p className="text-white/60 text-sm font-mono">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {/* Currently streaming message */}
          {currentStreaming >= 0 && currentStreaming < planMessages.length && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="mt-0.5 p-1.5 rounded-lg" style={{ backgroundColor: `${planMessages[currentStreaming].color}15` }}>
                {React.createElement(planMessages[currentStreaming].icon, { size: 13, style: { color: planMessages[currentStreaming].color } })}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: `${planMessages[currentStreaming].color}99` }}>
                  {planMessages[currentStreaming].agent}
                </span>
                <p className="text-white/60 text-sm font-mono">
                  {streamingText}
                  <span className="inline-block w-1.5 h-3 bg-[#6C5CE7] animate-pulse ml-0.5 align-middle" />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlanningStream;
