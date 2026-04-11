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
      {/* Background glow */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[160px] transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle, rgba(108,92,231,${0.15 * glowIntensity}) 0%, rgba(0,245,212,${0.08 * glowIntensity}) 50%, transparent 70%)`,
          opacity: glowIntensity,
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(108,92,231,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108,92,231,0.5) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Content */}
      <div className={`relative z-10 text-center transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo mark */}
        <div className="mx-auto mb-8 w-20 h-20 rounded-2xl border border-[#6C5CE7]/30 bg-[#6C5CE7]/10 flex items-center justify-center backdrop-blur-sm">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#00F5D4]" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 font-heading">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-[#6C5CE7] via-[#00F5D4] to-[#6C5CE7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
            Vytreon OS
          </span>
        </h1>

        <p className={`text-xl text-white/40 mb-12 max-w-md mx-auto transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Your AI company is about to go live
        </p>

        <button
          onClick={onNext}
          className={`group relative px-10 py-4 rounded-xl text-lg font-semibold text-white overflow-hidden transition-all duration-500 delay-700 hover:scale-105 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {/* Button background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#6C5CE7] to-[#6C5CE7]/80 rounded-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#6C5CE7] via-[#00F5D4]/50 to-[#6C5CE7] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          {/* Glow */}
          <div className="absolute -inset-1 bg-[#6C5CE7]/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <span className="relative z-10 flex items-center gap-3 font-mono tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
            Initialize System
          </span>
        </button>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#6C5CE7]/30 animate-float-luxury"
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
