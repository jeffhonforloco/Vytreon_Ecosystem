import React from 'react';
import { Building2, Cpu, Users, GitBranch, Database, Shield, BarChart3 } from 'lucide-react';

const architecture = [
  {
    icon: <Building2 size={22} />,
    title: 'You — The Founder',
    description: 'Set high-level goals and strategic direction. AWOS takes it from there.',
    tag: 'COMMAND',
  },
  {
    icon: <Cpu size={22} />,
    title: 'AWOS Engine',
    description: 'The AI Workforce Operating System — the coordination kernel that connects leadership, departments, workers, and memory into one structured organization.',
    tag: 'KERNEL',
  },
  {
    icon: <Users size={22} />,
    title: 'Executive Agents',
    description: 'AI CEO, CPO, CTO, CMO — they translate your vision into departmental strategies and delegate to managers.',
    tag: 'LEADERSHIP',
  },
  {
    icon: <GitBranch size={22} />,
    title: 'Department Managers',
    description: 'Engineering, Marketing, Sales, Security — each manager routes tasks to the right workers with proper context.',
    tag: 'DELEGATION',
  },
  {
    icon: <Database size={22} />,
    title: 'Task Queues & Worker Pool',
    description: 'Tasks flow through queues into a scalable worker pool. Workers execute using local AI models — massively parallel, fault-tolerant.',
    tag: 'EXECUTION',
  },
  {
    icon: <Shield size={22} />,
    title: 'Approval & Governance',
    description: 'Critical operations (deployments, pricing, financial transactions) require human approval. You stay in control.',
    tag: 'GOVERNANCE',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Monitoring & Memory',
    description: 'Shared memory across all agents. Real-time metrics on tasks executed, agents active, queue sizes, and system health.',
    tag: 'OBSERVABILITY',
  },
];

const HowItWorksOS = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] font-mono text-accent/60 uppercase tracking-[0.2em] mb-4">System Architecture</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading tracking-tight">
            How <span className="text-gradient-primary">AWOS</span> works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The AI Workforce Operating System sits between you and a fully autonomous 
            AI organization — structured decision flow, organized delegation, shared memory, 
            and governance built in.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-0">
          {architecture.map((step, i) => (
            <div key={i} className="relative flex gap-6 group">
              {i < architecture.length - 1 && (
                <div className="absolute left-[23px] top-[56px] w-px h-full bg-gradient-to-b from-accent/20 to-transparent" />
              )}
              
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-accent/15 bg-accent/[0.05] text-accent group-hover:scale-110 group-hover:border-accent/30 transition-all duration-300">
                  {step.icon}
                </div>
              </div>
              
              <div className="pb-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-mono text-accent/50 uppercase tracking-widest px-2 py-0.5 rounded border border-accent/10 bg-accent/[0.03]">{step.tag}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom summary */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="rounded-2xl border border-accent/10 bg-accent/[0.02] p-8">
            <p className="text-[10px] font-mono text-accent/40 uppercase tracking-[0.2em] mb-3">Without AWOS vs With AWOS</p>
            <div className="grid grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-xs font-semibold text-destructive/70 mb-2 font-mono">Without AWOS</p>
                <ul className="space-y-1 text-xs text-muted-foreground/60">
                  <li>• Agents operate independently</li>
                  <li>• Tasks conflict and duplicate</li>
                  <li>• Memory becomes fragmented</li>
                  <li>• System becomes unstable</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-accent mb-2 font-mono">With AWOS</p>
                <ul className="space-y-1 text-xs text-muted-foreground/80">
                  <li>• Organizational structure</li>
                  <li>• Coordinated delegation</li>
                  <li>• Full observability</li>
                  <li>• Human governance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksOS;
