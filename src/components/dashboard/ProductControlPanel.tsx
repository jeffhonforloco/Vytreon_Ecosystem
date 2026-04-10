import React from 'react';
import { Bot, Search, Palette, Video, MessageSquare, Hash, ExternalLink, MoreHorizontal } from 'lucide-react';

interface Product {
  name: string;
  description: string;
  status: 'active' | 'running' | 'idle' | 'processing';
  icon: React.ReactNode;
  tasks: number;
  uptime: string;
  color: string;
}

const products: Product[] = [
  { name: 'SireIQ', description: 'AI Assistant (ChatGPT-like)', status: 'active', icon: <Bot size={20} />, tasks: 5, uptime: '99.9%', color: '#6C5CE7' },
  { name: 'SEOAgentPro', description: 'Autonomous SEO engine', status: 'running', icon: <Search size={20} />, tasks: 8, uptime: '99.7%', color: '#FF6B6B' },
  { name: 'Fycra', description: 'AI coding & vibe platform', status: 'idle', icon: <Palette size={20} />, tasks: 0, uptime: '99.8%', color: '#00F5D4' },
  { name: 'Fycera', description: 'AI video generation', status: 'processing', icon: <Video size={20} />, tasks: 3, uptime: '98.5%', color: '#54A0FF' },
  { name: 'CumnIQ', description: 'Intelligent social platform', status: 'active', icon: <MessageSquare size={20} />, tasks: 2, uptime: '99.6%', color: '#FECA57' },
  { name: 'CaptionIQ', description: 'Social growth + captions', status: 'active', icon: <Hash size={20} />, tasks: 4, uptime: '99.9%', color: '#FF9FF3' },
];

const statusStyles: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  active: { bg: 'bg-[#00F5D4]/10', text: 'text-[#00F5D4]', dot: 'bg-[#00F5D4]', label: 'Active' },
  running: { bg: 'bg-[#6C5CE7]/10', text: 'text-[#6C5CE7]', dot: 'bg-[#6C5CE7] animate-pulse', label: 'Running' },
  idle: { bg: 'bg-white/5', text: 'text-white/40', dot: 'bg-white/30', label: 'Idle' },
  processing: { bg: 'bg-[#54A0FF]/10', text: 'text-[#54A0FF]', dot: 'bg-[#54A0FF] animate-pulse', label: 'Processing' },
};

const ProductControlPanel: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <h2 className="text-sm font-semibold text-white">Product Control Panel</h2>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6C5CE7]/15 text-[#6C5CE7] font-medium">6 products</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {products.map((product) => {
            const status = statusStyles[product.status];
            return (
              <div key={product.name} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${product.color}15` }}>
                    <span style={{ color: product.color }}>{product.icon}</span>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-white/60">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <h3 className="text-sm font-semibold text-white mb-0.5">{product.name}</h3>
                <p className="text-[11px] text-white/40 mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium ${status.bg} ${status.text}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/30">
                    <span>{product.tasks} tasks</span>
                    <span>{product.uptime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductControlPanel;
