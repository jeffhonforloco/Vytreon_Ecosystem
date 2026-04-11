import React, { useState, useEffect, useCallback } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import CommandCenter from '@/components/dashboard/CommandCenter';
import AgentExecution from '@/components/dashboard/AgentExecution';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import ProductControlPanel from '@/components/dashboard/ProductControlPanel';
import RightPanel from '@/components/dashboard/RightPanel';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { Terminal, LayoutGrid, Activity, Package, Menu, X, PanelRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const views = [
  { id: 'command', label: 'Command Center', icon: Terminal, shortLabel: 'Command' },
  { id: 'agents', label: 'Agent Execution', icon: LayoutGrid, shortLabel: 'Agents' },
  { id: 'activity', label: 'Activity Feed', icon: Activity, shortLabel: 'Activity' },
  { id: 'products', label: 'Products', icon: Package, shortLabel: 'Products' },
];

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('command');
  const [activeTab, setActiveTab] = useState('command');
  const [booting, setBooting] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  useEffect(() => {
    document.title = 'Vytreon OS — The AI Operating System';
  }, []);

  const handleBootComplete = useCallback(() => {
    setBooting(false);
  }, []);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    if (['command', 'agents', 'tasks', 'dashboard'].includes(view)) {
      setActiveTab(view === 'tasks' ? 'agents' : view === 'dashboard' ? 'command' : view);
    }
    setSidebarOpen(false);
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

  if (booting) {
    return <OnboardingFlow onComplete={handleBootComplete} />;
  }

  return (
    <div className="h-screen flex bg-[#0B0F1A] overflow-hidden animate-fade-in relative">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar - hidden on mobile, toggleable */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:z-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <DashboardSidebar activeView={activeView} onViewChange={handleViewChange} />
      </div>
      
      {/* Main workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top tabs */}
        <div className="flex items-center gap-1 px-2 sm:px-4 py-2 border-b border-white/[0.06] bg-[#0B0F1A]">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/[0.06] transition-colors mr-1"
          >
            <Menu size={18} />
          </button>

          {/* Tab buttons - hidden on mobile (replaced by bottom nav) */}
          <div className="hidden sm:flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {views.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveTab(v.id)}
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0",
                  activeTab === v.id
                    ? "bg-[#6C5CE7]/15 text-[#6C5CE7]"
                    : "text-white/35 hover:text-white/60 hover:bg-white/[0.04]"
                )}
              >
                <v.icon size={13} />
                {v.label}
              </button>
            ))}
          </div>

          {/* Mobile: show active tab label */}
          <span className="sm:hidden text-xs font-semibold text-white/70 truncate">
            {views.find(v => v.id === activeTab)?.shortLabel}
          </span>
          
          <div className="ml-auto flex items-center gap-2 shrink-0">
            {/* Right panel toggle on tablet/mobile */}
            <button
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className="xl:hidden p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-colors"
            >
              <PanelRight size={16} />
            </button>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/20">
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

      {/* Right panel - hidden on small screens, toggleable */}
      {rightPanelOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 xl:hidden" 
          onClick={() => setRightPanelOpen(false)} 
        />
      )}
      <div className={cn(
        "fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 ease-in-out xl:relative xl:transform-none xl:z-auto",
        rightPanelOpen ? "translate-x-0" : "translate-x-full xl:translate-x-0"
      )}>
        <RightPanel onClose={() => setRightPanelOpen(false)} />
      </div>
    </div>
  );
};

export default Dashboard;
