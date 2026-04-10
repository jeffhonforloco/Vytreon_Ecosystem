import React from 'react';
import { Clock, Play, CheckCircle2, Bot } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  agent: string;
  product?: string;
  priority: 'high' | 'medium' | 'low';
}

const columns: { title: string; status: string; icon: React.ReactNode; color: string; tasks: Task[] }[] = [
  {
    title: 'Planned',
    status: 'planned',
    icon: <Clock size={14} />,
    color: '#FECA57',
    tasks: [
      { id: 1, title: 'Create Q2 content strategy', agent: 'CEO Agent', priority: 'high' },
      { id: 2, title: 'Audit backlink profile', agent: 'SEOAgentPro', product: 'SEOAgentPro', priority: 'medium' },
      { id: 3, title: 'Design onboarding flow', agent: 'Product Manager', product: 'Fycra', priority: 'low' },
    ],
  },
  {
    title: 'Running',
    status: 'running',
    icon: <Play size={14} />,
    color: '#6C5CE7',
    tasks: [
      { id: 4, title: 'Fix technical SEO issues on 12 pages', agent: 'SEOAgentPro', product: 'SEOAgentPro', priority: 'high' },
      { id: 5, title: 'Generate social content batch', agent: 'CaptionIQ', product: 'CaptionIQ', priority: 'high' },
      { id: 6, title: 'Render promotional video #3', agent: 'Fycera', product: 'Fycera', priority: 'medium' },
      { id: 7, title: 'Optimize landing page copy', agent: 'Content Manager', priority: 'medium' },
    ],
  },
  {
    title: 'Completed',
    status: 'completed',
    icon: <CheckCircle2 size={14} />,
    color: '#00F5D4',
    tasks: [
      { id: 8, title: 'Keyword research (47 targets)', agent: 'SEOAgentPro', product: 'SEOAgentPro', priority: 'high' },
      { id: 9, title: 'Published 2 blog articles', agent: 'Content Manager', priority: 'medium' },
      { id: 10, title: 'Social calendar created', agent: 'CaptionIQ', product: 'CaptionIQ', priority: 'low' },
    ],
  },
];

const priorityColors = {
  high: 'bg-red-500/20 text-red-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  low: 'bg-green-500/20 text-green-400',
};

const AgentExecution: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-white">Live Agent Execution</h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00F5D4]/15 text-[#00F5D4] font-medium">18 active</span>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex gap-4 min-w-[700px] h-full">
          {columns.map((col) => (
            <div key={col.status} className="flex-1 flex flex-col min-w-[220px]">
              <div className="flex items-center gap-2 px-3 py-2 mb-3">
                <span style={{ color: col.color }}>{col.icon}</span>
                <span className="text-xs font-semibold text-white/70">{col.title}</span>
                <span className="ml-auto text-[10px] text-white/30 bg-white/[0.05] px-1.5 py-0.5 rounded-full">{col.tasks.length}</span>
              </div>
              <div className="flex-1 space-y-2">
                {col.tasks.map((task) => (
                  <div key={task.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all cursor-pointer group">
                    <p className="text-xs font-medium text-white/80 mb-2 group-hover:text-white transition-colors">{task.title}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Bot size={10} className="text-white/30" />
                        <span className="text-[10px] text-white/30">{task.agent}</span>
                      </div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentExecution;
