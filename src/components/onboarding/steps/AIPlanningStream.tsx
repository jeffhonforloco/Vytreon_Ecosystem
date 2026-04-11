import React, { useState, useEffect } from 'react';
import { Brain, Users, GitBranch, Database, Shield, Zap } from 'lucide-react';

interface AIPlanningStreamProps {
  goal: string;
  onComplete: () => void;
}

const AIPlanningStream: React.FC<AIPlanningStreamProps> = ({ goal, onComplete }) => {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [streamingText, setStreamingText] = useState('');
  const [currentStreaming, setCurrentStreaming] = useState(-1);

  const planMessages = [
    { agent: 'AI CEO', icon: Brain, text: `Analyzing strategic objective: "${goal}"` },
    { agent: 'AI CEO', icon: Brain, text: 'Breaking goal into departmental strategies...' },
    { agent: 'AI CPO', icon: Users, text: 'Designing product roadmap and feature breakdown...' },
    { agent: 'Task Planner', icon: GitBranch, text: 'Decomposing into executable tasks across departments...' },
    { agent: 'Dept Router', icon: Database, text: 'Routing tasks → Engineering, Marketing, Sales, Operations...' },
    { agent: 'Approval System', icon: Shield, text: 'Governance rules applied. Non-critical tasks auto-approved.' },
    { agent: 'AWOS Engine', icon: Brain, text: 'Workforce plan locked. Deploying to task queues now.' },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    planMessages.forEach((msg, i) => {
      timers.push(setTimeout(() => {
        setCurrentStreaming(i);
        setStreamingText('');
        const chars = msg.text.split('');
        chars.forEach((char, ci) => {
          timers.push(setTimeout(() => {
            setStreamingText(prev => prev + char);
            if (ci === chars.length - 1) {
              setTimeout(() => { setVisibleMessages(i + 1); setCurrentStreaming(-1); }, 200);
            }
          }, ci * 15));
        });
      }, i * 1100));
    });
    timers.push(setTimeout(onComplete, planMessages.length * 1100 + 800));
    return () => timers.forEach(clearTimeout);
  }, [onComplete, goal]);

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] bg-accent/[0.04]" />
      
      <div className="relative z-10 w-full max-w-2xl px-8">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <Zap size={16} className="text-accent" />
          <span className="text-xs font-mono text-accent uppercase tracking-widest">AWOS Task Planning Engine</span>
        </div>

        <div className="mb-8 px-5 py-3 rounded-xl border border-border bg-secondary/20 text-center">
          <span className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-wider">Strategic Goal</span>
          <p className="text-foreground/70 font-mono text-sm mt-1">"{goal}"</p>
        </div>

        <div className="space-y-1">
          {planMessages.slice(0, visibleMessages).map((msg, i) => {
            const Icon = msg.icon;
            return (
              <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-secondary/10 animate-fade-in">
                <div className="mt-0.5 p-1.5 rounded-lg bg-accent/10">
                  <Icon size={13} className="text-accent" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent/60">{msg.agent}</span>
                  <p className="text-muted-foreground text-sm font-mono">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {currentStreaming >= 0 && currentStreaming < planMessages.length && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-secondary/10 border border-border/50">
              <div className="mt-0.5 p-1.5 rounded-lg bg-accent/10">
                {React.createElement(planMessages[currentStreaming].icon, { size: 13, className: 'text-accent' })}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent/60">
                  {planMessages[currentStreaming].agent}
                </span>
                <p className="text-muted-foreground text-sm font-mono">
                  {streamingText}
                  <span className="inline-block w-1.5 h-3 bg-accent animate-pulse ml-0.5 align-middle" />
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
