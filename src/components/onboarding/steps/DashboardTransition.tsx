import React, { useState, useEffect } from 'react';

interface DashboardTransitionProps {
  onComplete: () => void;
}

const DashboardTransition: React.FC<DashboardTransitionProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(onComplete, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div className={`h-full flex items-center justify-center relative overflow-hidden transition-all duration-1000 ${
      phase === 1 ? 'scale-[2] opacity-0' : 'scale-100 opacity-100'
    }`}>
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] bg-accent/[0.06] animate-pulse" />

      <div className="relative z-10 text-center">
        <div className="flex items-center gap-2 justify-center mb-4">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">All Systems Operational</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading animate-fade-in">
          Launching AWOS Command Center...
        </h2>
        
        <div className="flex gap-1 justify-center mt-6">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTransition;
