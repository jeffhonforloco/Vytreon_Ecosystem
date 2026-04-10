import React from 'react';
import { ChevronRight, Bot, Users, TrendingUp, Zap, Activity, Target } from 'lucide-react';

const agentHierarchy = {
  name: 'CEO Agent',
  color: '#6C5CE7',
  managers: [
    { name: 'SEO Manager', agents: 3, active: true },
    { name: 'Content Manager', agents: 2, active: true },
    { name: 'Product Manager', agents: 4, active: false },
    { name: 'Growth Manager', agents: 2, active: true },
  ],
};

const metrics = [
  { label: 'Active Tasks', value: '18', icon: Target, color: '#6C5CE7', change: '+3' },
  { label: 'Success Rate', value: '96%', icon: TrendingUp, color: '#00F5D4', change: '+2.1%' },
  { label: 'Autonomous Actions', value: '52', icon: Zap, color: '#FECA57', change: '+12' },
  { label: 'Agents Online', value: '14', icon: Users, color: '#54A0FF', change: '' },
];

const systemStatus = [
  { label: 'CPU Usage', value: 42, color: '#6C5CE7' },
  { label: 'Memory', value: 67, color: '#00F5D4' },
  { label: 'API Calls/min', value: 89, color: '#FECA57' },
];

const RightPanel: React.FC = () => {
  return (
    <aside className="w-72 h-screen border-l border-white/[0.06] bg-[#0a0e1a] overflow-y-auto shrink-0 flex flex-col">
      {/* Agent Hierarchy */}
      <div className="p-4 border-b border-white/[0.06]">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-3">Agent Hierarchy</h3>
        
        <div className="space-y-1">
          {/* CEO */}
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#6C5CE7]/10 border border-[#6C5CE7]/20">
            <Bot size={14} className="text-[#6C5CE7]" />
            <span className="text-xs font-semibold text-[#6C5CE7]">{agentHierarchy.name}</span>
            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00F5D4]" />
          </div>
          
          {/* Managers */}
          <div className="pl-4 space-y-0.5">
            {agentHierarchy.managers.map((mgr) => (
              <div key={mgr.name} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer group">
                <div className="w-px h-4 bg-white/10 mr-1" />
                <ChevronRight size={10} className="text-white/20 group-hover:text-white/40" />
                <span className="text-[11px] text-white/50 group-hover:text-white/70 transition-colors">{mgr.name}</span>
                <span className="ml-auto text-[9px] text-white/20">{mgr.agents} agents</span>
                <div className={`w-1.5 h-1.5 rounded-full ${mgr.active ? 'bg-[#00F5D4]' : 'bg-white/20'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="p-4 border-b border-white/[0.06]">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-3">System Metrics</h3>
        <div className="grid grid-cols-2 gap-2">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <m.icon size={11} style={{ color: m.color }} />
                <span className="text-[9px] text-white/30 uppercase tracking-wider">{m.label}</span>
              </div>
              <div className="flex items-end gap-1.5">
                <span className="text-lg font-bold text-white leading-none">{m.value}</span>
                {m.change && (
                  <span className="text-[9px] text-[#00F5D4] font-medium mb-0.5">{m.change}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="p-4">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-3">System Health</h3>
        <div className="space-y-3">
          {systemStatus.map((s) => (
            <div key={s.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-white/40">{s.label}</span>
                <span className="text-[10px] font-medium text-white/60">{s.value}%</span>
              </div>
              <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${s.value}%`, backgroundColor: s.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Autonomous Mode Toggle */}
      <div className="mt-auto p-4 border-t border-white/[0.06]">
        <div className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#00F5D4]/10 border border-[#6C5CE7]/20 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-white/80">Autonomous Mode</span>
            <div className="w-8 h-4 bg-[#00F5D4]/30 rounded-full relative cursor-pointer">
              <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-[#00F5D4] rounded-full shadow-[0_0_8px_rgba(0,245,212,0.5)]" />
            </div>
          </div>
          <span className="text-[9px] text-[#00F5D4] font-medium">● Fully Autonomous</span>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
