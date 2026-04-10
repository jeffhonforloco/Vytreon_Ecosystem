import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import CommandCenter from '@/components/dashboard/CommandCenter';
import AgentExecution from '@/components/dashboard/AgentExecution';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import ProductControlPanel from '@/components/dashboard/ProductControlPanel';
import RightPanel from '@/components/dashboard/RightPanel';
import { Terminal, LayoutGrid, Activity, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

const views = [
  { id: 'command', label: 'Command Center', icon: Terminal },
  { id: 'agents', label: 'Agent Execution', icon: LayoutGrid },
  { id: 'activity', label: 'Activity Feed', icon: Activity },
  { id: 'products', label: 'Products', icon: Package },
];

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('command');
  const [activeTab, setActiveTab] = useState('command');

  useEffect(() => {
    document.title = 'Vytreon OS — The AI Operating System';
  }, []);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    if (['command', 'agents', 'tasks', 'dashboard'].includes(view)) {
      setActiveTab(view === 'tasks' ? 'agents' : view === 'dashboard' ? 'command' : view);
    }
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'command': return <CommandCenter />;
      case 'agents': return <AgentExecution />;
      case 'activity': return <ActivityFeed />;
      case 'products': return <ProductControlPanel />;
      default: return <CommandCenter />;
    }
  };

  return (
    <div className="h-screen flex bg-[#0B0F1A] overflow-hidden">
      <DashboardSidebar activeView={activeView} onViewChange={handleViewChange} />
      
      {/* Main workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top tabs */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-white/[0.06] bg-[#0B0F1A]">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveTab(v.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                activeTab === v.id
                  ? "bg-[#6C5CE7]/15 text-[#6C5CE7]"
                  : "text-white/35 hover:text-white/60 hover:bg-white/[0.04]"
              )}
            >
              <v.icon size={13} />
              {v.label}
            </button>
          ))}
          
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-pulse" />
              <span className="text-[10px] text-[#00F5D4] font-medium">All systems operational</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0">
          {renderMainContent()}
        </div>
      </div>

      <RightPanel />
    </div>
  );
};

export default Dashboard;
