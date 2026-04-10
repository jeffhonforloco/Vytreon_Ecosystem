import React from 'react';
import { Button } from '@/components/ui/button';
import { Terminal, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FinalCTAOS = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32 bg-[#0B0F1A] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#6C5CE7]/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Your company, on autopilot.
          </h2>
          <p className="text-xl text-white/40 mb-10 leading-relaxed">
            Stop switching between tools. Vytreon OS coordinates every product, 
            every agent, every task — from a single command.
          </p>
          
          <Button 
            onClick={() => navigate('/dashboard')}
            size="lg"
            className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white px-12 py-7 text-lg font-semibold rounded-xl h-auto group transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(108,92,231,0.5)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Terminal size={20} />
              Launch Vytreon OS
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Button>

          <p className="text-sm text-white/25 mt-6 font-mono">
            No credit card required • Free to explore
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTAOS;
