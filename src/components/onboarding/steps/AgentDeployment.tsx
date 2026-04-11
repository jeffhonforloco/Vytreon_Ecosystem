import React, { useState, useEffect } from 'react';
import { Brain, Cpu, TrendingUp, Code, Megaphone, Shield, Users } from 'lucide-react';

interface AgentDeploymentProps {
  onComplete: () => void;
}

const agents = [
  { name: 'AI CEO', icon: Brain, role: 'Strategic Direction', layer: 'EXECUTIVE', delay: 0 },
  { name: 'AI CTO', icon: Cpu, role: 'Technical Architecture', layer: 'EXECUTIVE', delay: 400 },
  { name: 'AI CMO', icon: TrendingUp, role: 'Growth & Marketing', layer: 'EXECUTIVE', delay: 800 },
  { name: 'Engineering Manager', icon: Code, role: 'Backend · Frontend · Infra', layer: 'DEPARTMENT', delay: 1200 },
  { name: 'Marketing Manager', icon: Megaphone, role: 'Content · SEO · Campaigns', layer: 'DEPARTMENT', delay: 1600 },
  { name: 'Security Manager', icon: Shield, role: 'Audits · Compliance', layer: 'DEPARTMENT', delay: 2000 },
  { name: 'Worker Pool', icon: Users, role: '12 autonomous workers spawned', layer: 'WORKERS', delay: 2400 },
];

const AgentDeployment: React.FC<AgentDeploymentProps> = ({ onComplete }) => {
  const [visibleAgents, setVisibleAgents] = useState(0);

  useEffect(() => {
    const timers = agents.map((a, i) =>
      setTimeout(() => setVisibleAgents(i + 1), a.delay)
    );
    timers.push(setTimeout(onComplete, 3600));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const getLayerStyle = (layer: string) => {
    switch (layer) {
      case 'EXECUTIVE': return 'border-accent/25 bg-accent/[0.06]';
      case 'DEPARTMENT': return 'border-border bg-secondary/10';
      case 'WORKERS': return 'border-accent/10 bg-accent/[0.03]';
      default: return 'border-border bg-secondary/10';
    }
  };

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[140px] bg-accent/[0.03]" />

      <div className="relative z-10 w-full max-w-lg px-8">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Users size={14} className="text-accent" />
          <span className="text-[10px] font-mono text-accent/60 uppercase tracking-widest">AWOS — Deploying AI Workforce</span>
        </div>

        <div className="space-y-2">
          {agents.slice(0, visibleAgents).map((agent, i) => {
            const Icon = agent.icon;
            const prevLayer = i > 0 ? agents[i - 1].layer : null;
            const showDivider = prevLayer && prevLayer !== agent.layer;
            return (
              <React.Fragment key={agent.name}>
                {showDivider && (
                  <div className="flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-border/30" />
                    <span className="text-[8px] font-mono text-muted-foreground/20 uppercase tracking-widest">{agent.layer}</span>
                    <div className="flex-1 h-px bg-border/30" />
                  </div>
                )}
                <div className={`flex items-center gap-4 px-4 py-3 rounded-xl border animate-fade-in ${getLayerStyle(agent.layer)}`}>
                  <div className="p-2 rounded-xl bg-accent/10">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-foreground">{agent.name}</span>
                    <p className="text-[10px] font-mono text-muted-foreground/50">{agent.role}</p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/20" />
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <span className="text-[10px] font-mono text-muted-foreground/30">
            {visibleAgents}/{agents.length} deployed
          </span>
          <div className="flex gap-1 justify-center mt-2">
            {agents.map((_, i) => (
              <div key={i} className={`w-6 h-1 rounded-full transition-all duration-500 ${i < visibleAgents ? 'bg-accent' : 'bg-muted'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDeployment;
