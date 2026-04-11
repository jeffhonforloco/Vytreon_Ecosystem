import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
          <p className="text-[10px] font-mono text-accent/50 uppercase tracking-[0.25em] mb-6">The Future of Work</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-heading tracking-tight">
            Your AI company is{' '}
            <span className="text-gradient-primary">ready to deploy.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
            Launch AWOS and deploy an autonomous AI workforce — executive agents, 
            department managers, and workers that run your operations 24/7.
          </p>
          
          <Button 
            onClick={() => onLaunch ? onLaunch() : navigate('/dashboard')}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-7 text-lg font-semibold rounded-xl h-auto group transition-all duration-300 hover:scale-105 hover:shadow-glow overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Launch AWOS
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Button>

          <p className="text-sm text-muted-foreground/30 mt-6 font-mono">
            Deploy your AI workforce in under 60 seconds
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTAOS;
