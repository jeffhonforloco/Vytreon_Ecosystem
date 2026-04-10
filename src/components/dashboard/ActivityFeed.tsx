import React, { useEffect, useState } from 'react';
import { Activity, Bot, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';

interface FeedItem {
  id: number;
  agent: string;
  action: string;
  status: 'success' | 'running' | 'warning';
  timestamp: string;
}

const feedData: FeedItem[] = [
  { id: 1, agent: 'CEO Agent', action: 'Creating growth strategy for Q2...', status: 'running', timestamp: '2s ago' },
  { id: 2, agent: 'SEOAgentPro', action: 'Fixed 12 technical SEO issues across 3 domains', status: 'success', timestamp: '1m ago' },
  { id: 3, agent: 'CaptionIQ', action: 'Generated 30 social posts for the week', status: 'success', timestamp: '3m ago' },
  { id: 4, agent: 'Fycera', action: 'Rendering marketing video — 78% complete', status: 'running', timestamp: '5m ago' },
  { id: 5, agent: 'SireIQ', action: 'Processed 142 customer queries autonomously', status: 'success', timestamp: '12m ago' },
  { id: 6, agent: 'Content Manager', action: 'Published blog: "AI Trends 2025"', status: 'success', timestamp: '18m ago' },
  { id: 7, agent: 'SEOAgentPro', action: 'Backlink quality dropped on 2 pages — investigating', status: 'warning', timestamp: '25m ago' },
  { id: 8, agent: 'Growth Manager', action: 'A/B test concluded: Variant B +23% conversion', status: 'success', timestamp: '32m ago' },
  { id: 9, agent: 'Fycra', action: 'Deployed hotfix to production', status: 'success', timestamp: '45m ago' },
  { id: 10, agent: 'CumnIQ', action: 'Engagement rate up 18% this week', status: 'success', timestamp: '1h ago' },
];

const statusConfig = {
  success: { icon: CheckCircle2, color: '#00F5D4' },
  running: { icon: Zap, color: '#6C5CE7' },
  warning: { icon: AlertTriangle, color: '#FECA57' },
};

const ActivityFeed: React.FC = () => {
  const [items, setItems] = useState<FeedItem[]>(feedData);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <Activity size={14} className={`text-[#00F5D4] transition-transform ${pulse ? 'scale-125' : 'scale-100'}`} />
        <h2 className="text-sm font-semibold text-white">Company Activity Feed</h2>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00F5D4]/15 text-[#00F5D4] font-medium">Real-time</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {items.map((item) => {
          const StatusIcon = statusConfig[item.status].icon;
          const color = statusConfig[item.status].color;
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
