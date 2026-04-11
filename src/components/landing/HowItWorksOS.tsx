import React from 'react';
import { Building2, Cpu, Users, GitBranch, Database, Shield, BarChart3, Lightbulb, Monitor } from 'lucide-react';

const architecture = [
  {
    icon: <Building2 size={22} />,
    title: 'You — The Founder',
    description: 'Set high-level goals. Approve or reject strategic proposals. You remain the final decision-maker at all times.',
    tag: 'COMMAND',
  },
  {
    icon: <Monitor size={22} />,
    title: 'Command Center Dashboard',
    description: 'Your single interface to the entire AI organization — view proposals, monitor agents, approve actions, track performance.',
    tag: 'INTERFACE',
  },
  {
    icon: <Lightbulb size={22} />,
    title: 'Autonomous Strategy Engine',
    description: 'The intelligence layer. Continuously scans market trends, product performance, competitor movements, and user feedback — then generates strategic proposals for founder approval.',
    tag: 'STRATEGY',
  },
  {
    icon: <Cpu size={22} />,
    title: 'AWOS Kernel',
    description: 'The coordination layer connecting executives, departments, workers, and memory into one structured organization. Turns approved strategies into executable plans.',
    tag: 'KERNEL',
  },
  {
    icon: <Users size={22} />,
    title: 'Executive AI Layer',
    description: 'AI CEO, CPO, CTO, CMO — translate approved strategies into departmental objectives and delegate to managers.',
    tag: 'LEADERSHIP',
  },
  {
    icon: <GitBranch size={22} />,
    title: 'Department Managers',
    description: 'Engineering, Marketing, Sales, Security — each manager routes tasks to the right workers with full context.',
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
    description: 'Critical operations require human approval. Strategy proposals, deployments, pricing changes, financial transactions — you stay in control.',
    tag: 'GOVERNANCE',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Monitoring & Memory',
    description: 'Shared memory across all agents. Strategy history, experiment results, and real-time metrics create a continuous improvement cycle.',
    tag: 'OBSERVABILITY',
  },
];

const HowItWorksOS = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] font-mono text-accent/60 uppercase tracking-[0.2em] mb-4">Complete System Architecture</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading tracking-tight">
            How <span className="text-gradient-primary">AWOS</span> works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From strategic intelligence to autonomous execution — a complete AI-native 
            company infrastructure with the Autonomous Strategy Engine at its core.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-0">
          {architecture.map((step, i) => (
            <div key={i} className="relative flex gap-6 group">
              {i < architecture.length - 1 && (
                <div className="absolute left-[23px] top-[56px] w-px h-full bg-gradient-to-b from-accent/20 to-transparent" />
              )}
              
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border bg-accent/[0.05] text-accent group-hover:scale-110 transition-all duration-300 ${
                  step.tag === 'STRATEGY' ? 'border-accent/30 bg-accent/[0.08] shadow-[0_0_20px_hsla(43,55%,54%,0.1)]' : 'border-accent/15 group-hover:border-accent/30'
                }`}>
                  {step.icon}
                </div>
              </div>
              
              <div className="pb-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${
                    step.tag === 'STRATEGY' ? 'text-accent border-accent/25 bg-accent/[0.08]' : 'text-accent/50 border-accent/10 bg-accent/[0.03]'
                  }`}>{step.tag}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Strategic Loop */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="rounded-2xl border border-accent/10 bg-accent/[0.02] p-8">
            <p className="text-[10px] font-mono text-accent/40 uppercase tracking-[0.2em] mb-4">Continuous Strategic Loop</p>
            <div className="flex flex-wrap justify-center gap-2 text-[10px] font-mono text-muted-foreground/60">
              {[
                'Collect Market Data',
                'Analyze Performance',
                'Generate Strategies',
                'Submit Proposals',
                'Founder Approval',
                'Execute via Workforce',
                'Measure Results',
                'Improve Future Strategies',
              ].map((step, i) => (
                <React.Fragment key={i}>
                  <span className="px-2.5 py-1 rounded-lg border border-border/50 bg-secondary/20 text-muted-foreground/70">{step}</span>
                  {i < 7 && <span className="text-accent/30 self-center">→</span>}
                </React.Fragment>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 text-left mt-6 pt-6 border-t border-accent/10">
              <div>
                <p className="text-xs font-semibold text-destructive/70 mb-2 font-mono">Without AWOS</p>
                <ul className="space-y-1 text-xs text-muted-foreground/60">
                  <li>• No strategic intelligence</li>
                  <li>• Agents operate independently</li>
                  <li>• Tasks conflict and duplicate</li>
                  <li>• System becomes unstable</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-accent mb-2 font-mono">With AWOS + ASE</p>
                <ul className="space-y-1 text-xs text-muted-foreground/80">
                  <li>• AI discovers opportunities</li>
                  <li>• Coordinated delegation</li>
                  <li>• Continuous improvement</li>
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
