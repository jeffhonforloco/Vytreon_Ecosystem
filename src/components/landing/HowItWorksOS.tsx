import React from 'react';
import { MessageSquare, Brain, Users, Zap } from 'lucide-react';

const steps = [
  {
    icon: <MessageSquare size={24} />,
    title: 'Give a goal',
    description: '"Increase organic traffic by 30% this quarter"',
    color: '#6C5CE7',
  },
  {
    icon: <Brain size={24} />,
    title: 'Brain analyzes',
    description: 'Vytreon Brain breaks the goal into multi-product strategies',
    color: '#00F5D4',
  },
  {
    icon: <Users size={24} />,
    title: 'Agents coordinate',
    description: 'CEO → Managers → Workers execute across SireIQ, SEOAgentPro, Fycera...',
    color: '#A855F7',
  },
  {
    icon: <Zap size={24} />,
    title: 'Results delivered',
    description: 'Watch real-time progress as agents complete tasks autonomously',
    color: '#F59E0B',
  },
];

const HowItWorksOS = () => {
  return (
    <section className="py-24 md:py-32 bg-[#0B0F1A] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] mb-6">
            <span className="text-xs font-mono text-white/50 tracking-wider uppercase">Chat → Execution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            From command to completion
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            One message triggers a cascade of intelligent, autonomous actions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-0">
          {steps.map((step, i) => (
            <div key={i} className="relative flex gap-6 group">
              {/* Vertical line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[23px] top-[56px] w-px h-full bg-gradient-to-b from-white/10 to-transparent" />
              )}
              
              <div className="relative flex-shrink-0">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/[0.08] bg-[#121826] group-hover:scale-110 transition-transform duration-300"
                  style={{ boxShadow: `0 0 20px ${step.color}20` }}
                >
                  <div style={{ color: step.color }}>{step.icon}</div>
                </div>
              </div>
              
              <div className="pb-12">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Step {i + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksOS;
