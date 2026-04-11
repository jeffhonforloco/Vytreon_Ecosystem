import React from 'react';
import { ExternalLink, Brain, Search, Code, Video, MessageSquare, FileText, Plane, CreditCard, Music, Headphones } from 'lucide-react';

const products = [
  { 
    name: 'SireIQ', 
    description: 'All-in-one AI creative platform — chat, code, content & collaboration',
    icon: <Brain size={22} />, 
    url: 'https://sireiq.com',
    category: 'AI Platform',
    flagship: true,
  },
  { 
    name: 'SEOAgentPro', 
    description: 'Autonomous SEO optimization powered by AI agents',
    icon: <Search size={22} />, 
    url: 'https://seoagentpro.com',
    category: 'AI Automation',
  },
  { 
    name: 'Fycra', 
    description: 'AI coding & vibe platform — build production apps by chatting',
    icon: <Code size={22} />, 
    url: 'https://www.fycra.com',
    category: 'Development',
    flagship: true,
  },
  { 
    name: 'Fycera', 
    description: 'Advanced AI video generation & editing platform',
    icon: <Video size={22} />, 
    url: 'https://fycera.com',
    category: 'AI Creative',
  },
  { 
    name: 'CaptionIQ', 
    description: 'AI captions, analytics & social media growth automation',
    icon: <FileText size={22} />, 
    url: 'https://www.captioniq.io',
    category: 'Social Growth',
  },
  { 
    name: 'Escazo', 
    description: 'AI-powered travel companion for flights, hotels & insights',
    icon: <Plane size={22} />, 
    url: 'https://www.escazo.com',
    category: 'Travel',
  },
  { 
    name: 'Oowo', 
    description: 'AI-enhanced global payment and trade platform',
    icon: <CreditCard size={22} />, 
    url: '#',
    category: 'Finance',
  },
  { 
    name: 'VoxSaga', 
    description: 'AI-powered podcast creation, hosting & monetization',
    icon: <Headphones size={22} />, 
    url: 'https://www.voxsaga.com',
    category: 'Media',
  },
  { 
    name: 'CumnIQ', 
    description: 'IQ-focused social platform with gamification & AI',
    icon: <MessageSquare size={22} />, 
    url: '#',
    category: 'Social',
  },
  { 
    name: 'Didit360', 
    description: 'Music streaming and MusicNFT platform',
    icon: <Music size={22} />, 
    url: '#',
    category: 'Entertainment',
  },
];

const ProductsShowcase = () => {
  return (
    <section id="products" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] font-mono text-accent/60 uppercase tracking-[0.2em] mb-4">Our Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading tracking-tight">
            Products & Companies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A diversified portfolio of AI-powered products, software platforms, and digital services — each built to lead its category.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {products.map((product, i) => (
            <button
              key={i}
              onClick={() => product.url !== '#' && window.open(product.url, '_blank')}
              className={`group text-left rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/30 ${
                product.flagship 
                  ? 'border-accent/20 bg-accent/[0.03] hover:border-accent/40 lg:col-span-1' 
                  : 'border-border/60 bg-secondary/10 hover:border-border hover:bg-secondary/20'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    product.flagship ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                  }`}>
                    {product.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">{product.name}</h3>
                      {product.url !== '#' && (
                        <ExternalLink size={11} className="text-muted-foreground/30 group-hover:text-accent/50 transition-colors" />
                      )}
                    </div>
                    <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">{product.category}</p>
                  </div>
                </div>
                {product.flagship && (
                  <span className="text-[9px] font-mono text-accent/70 uppercase tracking-wider px-2 py-0.5 rounded-full border border-accent/20 bg-accent/[0.05]">Flagship</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{product.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;
