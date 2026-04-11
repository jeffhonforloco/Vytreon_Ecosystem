import React, { useState, useEffect } from 'react';
import { Brain, Search, FileText, TrendingUp, Cpu, Users } from 'lucide-react';

interface AgentDeploymentProps {
  onComplete: () => void;
}

const agents = [
  { name: 'Strategic Agent', icon: Brain, role: 'Decision & Planning', delay: 0 },
  { name: 'Operations Agent', icon: Search, role: 'Task Orchestration', delay: 400 },
  { name: 'Marketing Agent', icon: FileText, role: 'Content & Growth', delay: 800 },
  { name: 'Growth Agent', icon: TrendingUp, role: 'Revenue & Scale', delay: 1200 },
  { name: 'Execution Workers', icon: Cpu, role: 'Autonomous Tasks', delay: 1600 },
];

const AgentDeployment: React.FC<AgentDeploymentProps> = ({ onComplete }) => {
  const [visibleAgents, setVisibleAgents] = useState(0);
  const [connections, setConnections] = useState(0);

  useEffect(() => {
    const timers = agents.map((a, i) =>
      setTimeout(() => { setVisibleAgents(i + 1); if (i > 0) setConnections(i); }, a.delay)
    );
    timers.push(setTimeout(onComplete, 3000));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[140px] bg-accent/[0.03]" />

      <div className="relative z-10 w-full max-w-3xl px-8">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Users size={14} className="text-accent" />
          <span className="text-[10px] font-mono text-accent/60 uppercase tracking-widest">Agent Deployment</span>
        </div>

        <div className="flex flex-col items-center gap-4">
          {visibleAgents > 0 && (
            <div className="animate-scale-luxury">
              <AgentNode agent={agents[0]} isMain />
            </div>
          )}

          {connections > 0 && (
            <div className="w-px h-8 bg-gradient-to-b from-accent/30 to-accent/5 animate-fade-in" />
          )}

          {visibleAgents > 1 && (
            <div className="flex items-start gap-4 flex-wrap justify-center">
              {agents.slice(1).map((agent, i) => (
                i + 1 < visibleAgents && (
                  <div key={agent.name} className="animate-scale-luxury flex flex-col items-center gap-2">
                    <div className="w-px h-4 bg-gradient-to-b from-accent/15 to-transparent" />
                    <AgentNode agent={agent} />
                  </div>
                )
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <span className="text-[10px] font-mono text-muted-foreground/30">
            {visibleAgents}/{agents.length} agents deployed
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

const AgentNode: React.FC<{ agent: typeof agents[0]; isMain?: boolean }> = ({ agent, isMain }) => {
  const Icon = agent.icon;
  return (
    <div className={`relative flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border transition-all duration-500 ${
      isMain ? 'border-accent/25 bg-accent/[0.06] shadow-lg shadow-accent/5' : 'border-border bg-secondary/10'
    }`}>
      <div className="p-2 rounded-xl bg-accent/10">
        <Icon size={isMain ? 20 : 16} className="text-accent" />
      </div>
      <span className="text-xs font-semibold text-foreground">{agent.name}</span>
      <span className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-wider">{agent.role}</span>
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/20" />
    </div>
  );
};

export default AgentDeployment;
