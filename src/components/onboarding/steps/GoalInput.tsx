import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { z } from 'zod';

const goalSchema = z.string()
  .trim()
  .min(3, 'Goal must be at least 3 characters')
  .max(500, 'Goal must be under 500 characters')
  .refine(val => !/[<>{}]/.test(val), 'Invalid characters detected');

const suggestions = [
  'Launch a new SaaS product from zero to revenue',
  'Build and scale an AI-powered marketing engine',
  'Automate my entire engineering pipeline',
  'Run my company operations autonomously 24/7',
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
    const result = goalSchema.safeParse(finalGoal);
    if (result.success) onSubmit(result.data);
  };

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[140px] bg-accent/[0.04]" />

      <div className={`relative z-10 w-full max-w-2xl px-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-mono text-accent/60 uppercase tracking-widest">AWOS Online — Awaiting Directive</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-3 font-heading tracking-tight">
          What should your AI workforce build?
        </h2>
        <p className="text-muted-foreground text-center mb-10 text-lg">
          Define any mission — AWOS will deploy executives, managers, and workers to execute it
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-accent-secondary/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center bg-card border border-border rounded-2xl overflow-hidden group-focus-within:border-accent/30 transition-colors">
            <input
              ref={inputRef}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="e.g. Hire an AI team to scale my e-commerce business..."
              maxLength={500}
              className="flex-1 bg-transparent text-foreground text-lg px-6 py-5 placeholder:text-muted-foreground/25 focus:outline-none font-mono"
            />
            <button
              onClick={() => handleSubmit()}
              disabled={!goal.trim()}
              className="mr-3 p-3 rounded-xl bg-accent hover:bg-accent/80 disabled:opacity-20 text-accent-foreground transition-all duration-300 hover:scale-105"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 justify-center">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSubmit(s)}
              className={`group/chip flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/10 hover:bg-accent/[0.06] hover:border-accent/20 text-muted-foreground/50 hover:text-muted-foreground text-sm font-mono transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${800 + i * 100}ms` }}
            >
              <Sparkles size={12} className="text-accent/40 group-hover/chip:text-accent" />
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalInput;
