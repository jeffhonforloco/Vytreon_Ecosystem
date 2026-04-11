import React, { useState, useEffect } from 'react';

interface DashboardTransitionProps {
  onComplete: () => void;
}

const DashboardTransition: React.FC<DashboardTransitionProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0: text, 1: zoom

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(onComplete, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div className={`h-full flex items-center justify-center relative overflow-hidden transition-all duration-1000 ${
      phase === 1 ? 'scale-[2] opacity-0' : 'scale-100 opacity-100'
    }`}>
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] bg-[#6C5CE7]/10 animate-pulse" />

      <div className="relative z-10 text-center">
        <div className="flex items-center gap-2 justify-center mb-4">
          <div className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
          <span className="text-[10px] font-mono text-[#00F5D4] uppercase tracking-widest">All Systems Go</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-heading animate-fade-in">
          Launching Vytreon OS Dashboard...
        </h2>
        
        {/* Loading dots */}
        <div className="flex gap-1 justify-center mt-6">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTransition;
