import React from 'react';
import { Layers, Brain, Building2, Zap } from 'lucide-react';

const steps = [
  {
    icon: <Building2 size={24} />,
    title: 'Vytreon — The Parent',
    description: 'A technology holding company building AI products, automation tools, and digital platforms across industries.',
  },
  {
    icon: <Layers size={24} />,
    title: 'Vytreon OS — The Brain',
    description: 'Our agentic AI operating system that powers autonomous operations. Any company can deploy AI employees that plan, execute, and optimize on autopilot.',
  },
  {
    icon: <Brain size={24} />,
    title: 'AI Agents — The Workforce',
    description: 'Deploy autonomous AI agents — CEO, Marketing, SEO, Content, Growth — that coordinate across your entire tech stack.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Products — The Ecosystem',
    description: 'SireIQ, Fycra, SEOAgentPro, and 10+ products — each a standalone business, each supercharged by Vytreon OS when connected.',
  },
];

const HowItWorksOS = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] font-mono text-accent/60 uppercase tracking-[0.2em] mb-4">Our Structure</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading tracking-tight">
            How Vytreon works
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            One parent company. One AI brain. Infinite autonomous possibilities.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-0">
          {steps.map((step, i) => (
            <div key={i} className="relative flex gap-6 group">
              {i < steps.length - 1 && (
                <div className="absolute left-[23px] top-[56px] w-px h-full bg-gradient-to-b from-accent/20 to-transparent" />
              )}
              
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-accent/15 bg-accent/[0.05] text-accent group-hover:scale-110 group-hover:border-accent/30 transition-all duration-300">
                  {step.icon}
                </div>
              </div>
              
              <div className="pb-12">
                <span className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest">Step {i + 1}</span>
                <h3 className="text-xl font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksOS;
