import React from 'react';
import { Button } from '@/components/ui/button';
import { Layers, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FinalCTAOSProps {
  onLaunch?: () => void;
}

const FinalCTAOS: React.FC<FinalCTAOSProps> = ({ onLaunch }) => {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.04] rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-heading tracking-tight">
            The future of business is autonomous.
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Deploy AI agents that run your operations on autopilot. 
            Vytreon OS is the brain — your company is the body.
          </p>
          
          <Button 
            onClick={() => onLaunch ? onLaunch() : navigate('/dashboard')}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-7 text-lg font-semibold rounded-xl h-auto group transition-all duration-300 hover:scale-105 hover:shadow-glow overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Layers size={20} />
              Launch Vytreon OS
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Button>

          <p className="text-sm text-muted-foreground/30 mt-6 font-mono">
            Available for businesses of all sizes
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTAOS;
