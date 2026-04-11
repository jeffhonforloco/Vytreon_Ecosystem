import React, { useState, useEffect } from 'react';

interface WelcomeScreenProps {
  onNext: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  const [visible, setVisible] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const glowTimer = setInterval(() => {
      setGlowIntensity(prev => (prev >= 1 ? 1 : prev + 0.02));
    }, 30);
    return () => clearInterval(glowTimer);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[160px] transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle, hsla(43,55%,54%,${0.12 * glowIntensity}) 0%, hsla(40,70%,40%,${0.06 * glowIntensity}) 50%, transparent 70%)`,
          opacity: glowIntensity,
        }}
      />

      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(hsla(43,55%,54%,0.3) 1px, transparent 1px), linear-gradient(90deg, hsla(43,55%,54%,0.3) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <div className={`relative z-10 text-center transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mx-auto mb-8 w-20 h-20 rounded-2xl border border-accent/20 bg-accent/[0.08] flex items-center justify-center backdrop-blur-sm">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent/60" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-4 font-heading">
          Welcome to{' '}
          <span className="text-gradient-primary">Vytreon OS</span>
        </h1>

        <p className={`text-xl text-muted-foreground mb-12 max-w-md mx-auto transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          The agentic AI brain for autonomous operations
        </p>

        <button
          onClick={onNext}
          className={`group relative px-10 py-4 rounded-xl text-lg font-semibold text-accent-foreground overflow-hidden transition-all duration-500 delay-700 hover:scale-105 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="absolute inset-0 bg-accent rounded-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-secondary to-accent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <div className="absolute -inset-1 bg-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <span className="relative z-10 flex items-center gap-3 font-mono tracking-wide">
            <span className="w-2 h-2 rounded-full bg-accent-foreground/80 animate-pulse" />
            Initialize System
          </span>
        </button>
      </div>

      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/20 animate-float-luxury"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${6 + i}s`,
          }}
        />
      ))}
    </div>
  );
};

export default WelcomeScreen;
