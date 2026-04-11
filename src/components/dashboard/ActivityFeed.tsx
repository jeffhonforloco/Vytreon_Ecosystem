import React, { useEffect, useState } from 'react';
import { Activity, Bot, CheckCircle2, AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import { useAgentEvents, AgentEvent } from '@/hooks/useAgentEvents';

const eventTypeConfig = {
  task_handoff: { icon: ArrowRight, color: '#54A0FF', label: 'Handoff' },
  status_update: { icon: Zap, color: '#6C5CE7', label: 'Update' },
  context_share: { icon: Bot, color: '#00F5D4', label: 'Context' },
  escalation: { icon: AlertTriangle, color: '#FECA57', label: 'Escalation' },
  completion: { icon: CheckCircle2, color: '#00F5D4', label: 'Complete' },
};

// Static feed items for demo until real events populate
const staticFeed = [
  { id: 's1', agent: 'CEO Agent', action: 'Creating growth strategy for Q2...', status: 'running' as const, timestamp: '2s ago' },
  { id: 's2', agent: 'SEOAgentPro', action: 'Fixed 12 technical SEO issues across 3 domains', status: 'success' as const, timestamp: '1m ago' },
  { id: 's3', agent: 'CaptionIQ', action: 'Generated 30 social posts for the week', status: 'success' as const, timestamp: '3m ago' },
  { id: 's4', agent: 'Fycera', action: 'Rendering marketing video — 78% complete', status: 'running' as const, timestamp: '5m ago' },
  { id: 's5', agent: 'SireIQ', action: 'Processed 142 customer queries autonomously', status: 'success' as const, timestamp: '12m ago' },
  { id: 's6', agent: 'Content Manager', action: 'Published blog: "AI Trends 2025"', status: 'success' as const, timestamp: '18m ago' },
  { id: 's7', agent: 'SEOAgentPro', action: 'Backlink quality dropped on 2 pages — investigating', status: 'warning' as const, timestamp: '25m ago' },
  { id: 's8', agent: 'Growth Manager', action: 'A/B test concluded: Variant B +23% conversion', status: 'success' as const, timestamp: '32m ago' },
];

const staticStatusConfig = {
  success: { icon: CheckCircle2, color: '#00F5D4' },
  running: { icon: Zap, color: '#6C5CE7' },
  warning: { icon: AlertTriangle, color: '#FECA57' },
};

const ActivityFeed: React.FC = () => {
  const { events, loading } = useAgentEvents();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return `${Math.floor(diff / 3600000)}h ago`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <Activity size={14} className={`text-[#00F5D4] transition-transform ${pulse ? 'scale-125' : 'scale-100'}`} />
        <h2 className="text-sm font-semibold text-white">Company Activity Feed</h2>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00F5D4]/15 text-[#00F5D4] font-medium">Real-time</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Real agent events from DB */}
        {events.length > 0 && (
          <>
            <div className="px-6 py-2 bg-white/[0.02]">
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#6C5CE7]/60">Agent Communications</span>
            </div>
            {events.map((event) => {
              const config = eventTypeConfig[event.event_type];
              const Icon = config.icon;
              return (
                <div key={event.id} className="px-6 py-3.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${config.color}15` }}>
                      <Icon size={12} style={{ color: config.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-semibold" style={{ color: config.color }}>
                          [{event.source_agent}]
                          {event.target_agent && (
                            <span className="text-white/20"> → [{event.target_agent}]</span>
                          )}
                        </span>
                        <span className="text-[8px] px-1 py-0.5 rounded bg-white/[0.06] text-white/30 uppercase">{config.label}</span>
                        <span className="text-[10px] text-white/20 ml-auto shrink-0">{formatTime(event.created_at)}</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {event.payload?.goal || event.payload?.message || `${config.label} event from ${event.source_agent}`}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* Static activity items */}
        {events.length > 0 && (
          <div className="px-6 py-2 bg-white/[0.02]">
            <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/20">System Activity</span>
          </div>
        )}
        {staticFeed.map((item) => {
          const StatusIcon = staticStatusConfig[item.status].icon;
          const color = staticStatusConfig[item.status].color;
          return (
            <div key={item.id} className="px-6 py-3.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${color}15` }}>
                  <StatusIcon size={12} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-semibold" style={{ color }}>[{item.agent}]</span>
                    <span className="text-[10px] text-white/20 ml-auto shrink-0">{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">{item.action}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;
