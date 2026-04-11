import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Layers, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VytreonHeroProps {
  onLaunch?: () => void;
}

const VytreonHero: React.FC<VytreonHeroProps> = ({ onLaunch }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const products = [
    'SireIQ', 'Fycra', 'Fycera', 'SEOAgentPro', 'CaptionIQ', 'Escazo', 'Oowo', 'Didit360', 'VoxSaga'
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Subtle gold radial */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-accent/[0.06] via-transparent to-transparent" />
      
      {/* Fine grid */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(hsla(43,55%,54%,0.4) 1px, transparent 1px), linear-gradient(90deg, hsla(43,55%,54%,0.4) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <div className="container mx-auto px-6 relative z-10 py-20">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-accent/20 bg-accent/[0.05] mb-10">
            <Building2 size={14} className="text-accent" />
            <span className="text-xs font-medium text-accent tracking-wider uppercase">Parent Company · Technology Conglomerate</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-foreground mb-8 leading-[1.02] font-heading">
            We build the companies{' '}
            <span className="text-gradient-primary">
              of tomorrow
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
            Vytreon is a technology holding company powering the next generation of AI products, 
            automation tools, and digital platforms for businesses worldwide.
          </p>

          <p className="text-sm text-muted-foreground/60 mb-10 max-w-xl mx-auto">
            Our flagship platform — <span className="text-accent font-medium">Vytreon OS</span> — is the agentic AI brain that powers autonomous operations 
            across our ecosystem and yours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={() => onLaunch ? onLaunch() : navigate('/dashboard')}
              size="lg"
              className="relative bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-7 text-lg font-semibold rounded-xl h-auto group transition-all duration-300 hover:scale-105 hover:shadow-glow overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Layers size={20} />
                Launch Vytreon OS
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Button>
            <Button 
              onClick={() => {
                const el = document.getElementById('products');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="outline" 
              size="lg"
              className="px-10 py-7 text-lg font-semibold rounded-xl h-auto border-border bg-secondary/30 hover:bg-secondary/60 text-foreground/70 hover:text-foreground transition-all duration-300"
            >
              Explore Our Portfolio
            </Button>
          </div>

          {/* Product ticker */}
          <div className={`transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em] mb-4">Our Portfolio Companies</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {products.map((name, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-lg border border-border/60 bg-secondary/20 text-xs font-medium text-muted-foreground/60 hover:text-accent hover:border-accent/20 transition-colors cursor-default">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VytreonHero;
