import React from 'react';
import { ExternalLink, Brain, Search, Code, Video, MessageSquare, FileText } from 'lucide-react';

const products = [
  { 
    name: 'SireIQ', 
    role: 'AI Assistant', 
    description: 'ChatGPT-level AI for chat, code, content & creative work',
    icon: <Brain size={20} />, 
    url: 'https://sireiq.com',
    color: '#6C5CE7',
    status: 'active'
  },
  { 
    name: 'SEOAgentPro', 
    role: 'SEO Engine', 
    description: 'Autonomous SEO optimization with AI-driven strategies',
    icon: <Search size={20} />, 
    url: 'https://seoagentpro.com',
    color: '#00F5D4',
    status: 'running'
  },
  { 
    name: 'Fycra', 
    role: 'Code Platform', 
    description: 'AI coding & vibe platform — build apps by chatting',
    icon: <Code size={20} />, 
    url: 'https://www.fycra.com',
    color: '#A855F7',
    status: 'active'
  },
  { 
    name: 'Fycera', 
    role: 'Video AI', 
    description: 'Advanced AI video generation & editing',
    icon: <Video size={20} />, 
    url: 'https://fycera.com',
    color: '#F59E0B',
    status: 'processing'
  },
  { 
    name: 'CaptionIQ', 
    role: 'Social Growth', 
    description: 'AI captions, analytics & social media automation',
    icon: <FileText size={20} />, 
    url: 'https://www.captioniq.io',
    color: '#EC4899',
    status: 'active'
  },
  { 
    name: 'CumnIQ', 
    role: 'Social Platform', 
    description: 'Intelligent social platform with gamification & AI',
    icon: <MessageSquare size={20} />, 
    url: '#',
    color: '#3B82F6',
    status: 'idle'
  },
];

const statusColors: Record<string, string> = {
  active: '#00F5D4',
  running: '#6C5CE7',
  processing: '#F59E0B',
  idle: '#64748B',
};

const ProductsShowcase = () => {
  return (
    <section id="os-products" className="py-24 md:py-32 bg-[#0B0F1A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(108,92,231,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108,92,231,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/5 mb-6">
            <span className="text-xs font-mono text-[#6C5CE7] tracking-wider uppercase">Ecosystem Agents</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Products controlled by <span className="text-[#6C5CE7]">Vytreon Brain</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Each product operates as an autonomous agent within the OS. Give one command — all products coordinate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {products.map((product, i) => (
            <button
              key={i}
              onClick={() => product.url !== '#' && window.open(product.url, '_blank')}
              className="group text-left rounded-xl border border-white/[0.06] bg-[#121826] p-5 hover:border-white/[0.12] hover:bg-[#1a2235] transition-all duration-300 hover:shadow-lg hover:shadow-black/30"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${product.color}15`, color: product.color }}
                  >
                    {product.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white text-sm">{product.name}</h3>
                      {product.url !== '#' && (
                        <ExternalLink size={11} className="text-white/20 group-hover:text-white/50 transition-colors" />
                      )}
                    </div>
                    <p className="text-[11px] font-mono text-white/30">{product.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.03]">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: statusColors[product.status] }} />
                  <span className="text-[10px] font-mono" style={{ color: statusColors[product.status] }}>{product.status}</span>
                </div>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">{product.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;
