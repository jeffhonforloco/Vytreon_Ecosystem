import React, { useState, useEffect } from 'react';
import { Brain, Search, FileText, TrendingUp, Cpu, Users } from 'lucide-react';

interface AgentDeploymentProps {
  onComplete: () => void;
}

const agents = [
  { name: 'CEO Agent', icon: Brain, color: '#6C5CE7', role: 'Strategic Command', delay: 0 },
  { name: 'SEO Manager', icon: Search, color: '#00F5D4', role: 'Search Optimization', delay: 400 },
  { name: 'Content Manager', icon: FileText, color: '#FF6B6B', role: 'Content Pipeline', delay: 800 },
  { name: 'Growth Manager', icon: TrendingUp, color: '#FECA57', role: 'Growth & Revenue', delay: 1200 },
  { name: 'Execution Workers', icon: Cpu, color: '#74B9FF', role: 'Task Execution', delay: 1600 },
];

const AgentDeployment: React.FC<AgentDeploymentProps> = ({ onComplete }) => {
  const [visibleAgents, setVisibleAgents] = useState(0);
  const [connections, setConnections] = useState(0);

  useEffect(() => {
    const timers = agents.map((a, i) =>
      setTimeout(() => {
        setVisibleAgents(i + 1);
        if (i > 0) setConnections(i);
      }, a.delay)
    );
    timers.push(setTimeout(onComplete, 3000));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[140px] bg-[#6C5CE7]/5" />

      <div className="relative z-10 w-full max-w-3xl px-8">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Users size={14} className="text-[#00F5D4]" />
          <span className="text-[10px] font-mono text-[#00F5D4]/60 uppercase tracking-widest">Agent Deployment</span>
        </div>

        {/* Org chart */}
        <div className="flex flex-col items-center gap-4">
          {/* CEO at top */}
          {visibleAgents > 0 && (
            <div className="animate-scale-luxury">
              <AgentNode agent={agents[0]} isMain />
            </div>
          )}

          {/* Connection line */}
          {connections > 0 && (
            <div className="w-px h-8 bg-gradient-to-b from-[#6C5CE7]/40 to-[#6C5CE7]/10 animate-fade-in" />
          )}

          {/* Managers row */}
          {visibleAgents > 1 && (
            <div className="flex items-start gap-4 flex-wrap justify-center">
              {agents.slice(1).map((agent, i) => (
                i + 1 < visibleAgents && (
                  <div key={agent.name} className="animate-scale-luxury flex flex-col items-center gap-2">
                    {/* Vertical line from top */}
                    <div className="w-px h-4 bg-gradient-to-b from-[#6C5CE7]/20 to-transparent" />
                    <AgentNode agent={agent} />
                  </div>
                )
              ))}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="mt-10 text-center">
          <span className="text-[10px] font-mono text-white/20">
            {visibleAgents}/{agents.length} agents deployed
          </span>
          <div className="flex gap-1 justify-center mt-2">
            {agents.map((_, i) => (
              <div
                key={i}
                className={`w-6 h-1 rounded-full transition-all duration-500 ${
                  i < visibleAgents ? 'bg-[#6C5CE7]' : 'bg-white/[0.06]'
                }`}
              />
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
      isMain 
        ? 'border-[#6C5CE7]/30 bg-[#6C5CE7]/10 shadow-lg shadow-[#6C5CE7]/10' 
        : 'border-white/[0.06] bg-white/[0.02]'
    }`}>
      <div className="p-2 rounded-xl" style={{ backgroundColor: `${agent.color}15` }}>
        <Icon size={isMain ? 20 : 16} style={{ color: agent.color }} />
      </div>
      <span className="text-xs font-semibold text-white">{agent.name}</span>
      <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider">{agent.role}</span>
      {/* Status dot */}
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00F5D4] animate-pulse shadow-lg shadow-[#00F5D4]/30" />
    </div>
  );
};

export default AgentDeployment;
