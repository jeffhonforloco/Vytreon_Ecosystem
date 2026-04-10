import React from 'react';
import { 
  Home, Terminal, Users, CheckSquare, Cpu, Database, BarChart3, 
  Settings, CreditCard, Code, HelpCircle, ChevronDown, Zap,
  Bot, Search, Palette, Video, MessageSquare, Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  collapsed?: boolean;
}

const osItems = [
  { name: 'Dashboard', icon: Home, id: 'dashboard' },
  { name: 'Command Center', icon: Terminal, id: 'command' },
  { name: 'Agents', icon: Users, id: 'agents' },
  { name: 'Tasks', icon: CheckSquare, id: 'tasks' },
  { name: 'Autonomous Mode', icon: Cpu, id: 'autonomous' },
  { name: 'Memory', icon: Database, id: 'memory' },
  { name: 'Analytics', icon: BarChart3, id: 'analytics' },
];

const products = [
  { name: 'SireIQ', description: 'AI Assistant', icon: Bot },
  { name: 'SEOAgentPro', description: 'Autonomous SEO', icon: Search },
  { name: 'Fycra', description: 'AI coding platform', icon: Palette },
  { name: 'Fycera', description: 'AI video generation', icon: Video },
  { name: 'CumnIQ', description: 'Social platform', icon: MessageSquare },
  { name: 'CaptionIQ', description: 'Social growth', icon: Hash },
];

const systemItems = [
  { name: 'Settings', icon: Settings, id: 'settings' },
  { name: 'Billing', icon: CreditCard, id: 'billing' },
  { name: 'API', icon: Code, id: 'api' },
  { name: 'Support', icon: HelpCircle, id: 'support' },
];

const DashboardSidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const [productsOpen, setProductsOpen] = React.useState(true);

  return (
    <aside className="w-64 h-screen flex flex-col border-r border-white/[0.06] bg-[#0a0e1a] overflow-y-auto shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-3 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#00F5D4] flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <div>
          <span className="text-sm font-bold text-white tracking-tight">Vytreon OS</span>
          <span className="block text-[10px] text-white/40 leading-none">v2.0 — Autonomous</span>
        </div>
      </div>

      {/* OS Navigation */}
      <div className="px-3 pt-4 pb-2">
        <span className="px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Vytreon OS</span>
      </div>
      <nav className="px-2 space-y-0.5">
        {osItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              activeView === item.id
                ? "bg-[#6C5CE7]/15 text-[#6C5CE7] shadow-[inset_0_0_0_1px_rgba(108,92,231,0.2)]"
                : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
            )}
          >
            <item.icon size={16} className={activeView === item.id ? "text-[#6C5CE7]" : ""} />
            {item.name}
            {item.id === 'autonomous' && (
              <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-[#00F5D4]/15 text-[#00F5D4] font-semibold">ON</span>
            )}
          </button>
        ))}
      </nav>

      {/* Products */}
      <div className="px-3 pt-5 pb-2">
        <button 
          onClick={() => setProductsOpen(!productsOpen)}
          className="w-full flex items-center justify-between px-2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Products</span>
          <ChevronDown size={12} className={cn("text-white/30 transition-transform", productsOpen && "rotate-180")} />
        </button>
      </div>
      {productsOpen && (
        <nav className="px-2 space-y-0.5">
          {products.map((item) => (
            <button
              key={item.name}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-all duration-200"
            >
              <item.icon size={14} />
              <div className="text-left">
                <span className="block text-xs font-medium">{item.name}</span>
                <span className="block text-[10px] text-white/30">{item.description}</span>
              </div>
            </button>
          ))}
        </nav>
      )}

      {/* System */}
      <div className="mt-auto border-t border-white/[0.06] pt-3 px-2 pb-4 space-y-0.5">
        {systemItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all duration-200"
            )}
          >
            <item.icon size={15} />
            {item.name}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
