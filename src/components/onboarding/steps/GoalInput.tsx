import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const suggestions = [
  'Increase SEO traffic by 30%',
  'Generate viral content',
  'Build a SaaS product',
  'Grow my brand online',
];

interface GoalInputProps {
  onSubmit: (goal: string) => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ onSubmit }) => {
  const [visible, setVisible] = useState(false);
  const [goal, setGoal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => inputRef.current?.focus(), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (value?: string) => {
    const finalGoal = value || goal;
    if (finalGoal.trim()) onSubmit(finalGoal.trim());
  };

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[140px] bg-[#6C5CE7]/8" />

      <div className={`relative z-10 w-full max-w-2xl px-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {/* System status */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-pulse" />
          <span className="text-[10px] font-mono text-[#00F5D4]/60 uppercase tracking-widest">System Online — Awaiting Directive</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-3 font-heading tracking-tight">
          What do you want Vytreon to achieve?
        </h2>
        <p className="text-white/30 text-center mb-10 text-lg">
          Give your AI company a mission
        </p>

        {/* Input */}
        <div className="relative group mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6C5CE7]/30 to-[#00F5D4]/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center bg-[#121826] border border-white/[0.08] rounded-2xl overflow-hidden group-focus-within:border-[#6C5CE7]/40 transition-colors">
            <input
              ref={inputRef}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="e.g. Grow my traffic, build a product, increase revenue..."
              className="flex-1 bg-transparent text-white text-lg px-6 py-5 placeholder:text-white/15 focus:outline-none font-mono"
            />
            <button
              onClick={() => handleSubmit()}
              disabled={!goal.trim()}
              className="mr-3 p-3 rounded-xl bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 disabled:opacity-20 disabled:hover:bg-[#6C5CE7] text-white transition-all duration-300 hover:scale-105"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="flex flex-wrap gap-2.5 justify-center">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSubmit(s)}
              className={`group/chip flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-[#6C5CE7]/10 hover:border-[#6C5CE7]/30 text-white/40 hover:text-white/70 text-sm font-mono transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${800 + i * 100}ms` }}
            >
              <Sparkles size={12} className="text-[#6C5CE7]/50 group-hover/chip:text-[#6C5CE7]" />
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalInput;
