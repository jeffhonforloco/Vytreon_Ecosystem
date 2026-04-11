import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

const executionLog = [
  { dept: 'ENGINEERING', task: 'Scaffolding project architecture', worker: 'Worker-01' },
  { dept: 'ENGINEERING', task: 'Setting up CI/CD pipeline', worker: 'Worker-02' },
  { dept: 'MARKETING', task: 'Creating brand positioning document', worker: 'Worker-05' },
  { dept: 'ENGINEERING', task: 'Building core API endpoints', worker: 'Worker-03' },
  { dept: 'SALES', task: 'Generating outbound prospect list', worker: 'Worker-08' },
  { dept: 'MARKETING', task: 'Writing launch campaign copy', worker: 'Worker-06' },
  { dept: 'SECURITY', task: 'Running vulnerability assessment', worker: 'Worker-10' },
  { dept: 'ENGINEERING', task: 'Deploying to staging environment', worker: 'Worker-04' },
  { dept: 'OPERATIONS', task: 'Monitoring system health metrics', worker: 'Worker-11' },
];

interface LiveExecutionProps {
  onComplete: () => void;
}

const LiveExecution: React.FC<LiveExecutionProps> = ({ onComplete }) => {
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    const timers = executionLog.map((_, i) =>
      setTimeout(() => setCompletedTasks(i + 1), 400 + i * 450)
    );
    const done = setTimeout(onComplete, 400 + executionLog.length * 450 + 600);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onComplete]);

  const getDeptColor = (dept: string) => {
    switch (dept) {
      case 'ENGINEERING': return 'text-blue-400/80';
      case 'MARKETING': return 'text-purple-400/80';
      case 'SALES': return 'text-emerald-400/80';
      case 'SECURITY': return 'text-red-400/80';
      case 'OPERATIONS': return 'text-accent/80';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] bg-accent/[0.03]" />

      <div className="relative z-10 w-full max-w-2xl px-8">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-mono text-accent/60 uppercase tracking-widest">AWOS Worker Pool — Live Execution</span>
        </div>
        <p className="text-center text-muted-foreground/30 text-xs font-mono mb-8">Tasks flowing through department queues into the worker pool</p>

        <div className="rounded-2xl border border-border bg-card/95 overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-background/80">
            <span className="text-[10px] font-mono text-muted-foreground/40">awos — task execution log</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] font-mono text-accent/60">{completedTasks} tasks complete</span>
            </div>
          </div>

          <div className="p-4 space-y-1 font-mono text-xs max-h-[320px] overflow-y-auto">
            {executionLog.slice(0, completedTasks).map((log, i) => (
              <div key={i} className="flex items-center gap-3 py-1.5 animate-fade-in">
                <CheckCircle2 size={12} className="text-accent flex-shrink-0" />
                <span className={`text-[9px] uppercase tracking-wider w-20 flex-shrink-0 ${getDeptColor(log.dept)}`}>{log.dept}</span>
                <span className="text-muted-foreground/70 flex-1 truncate">{log.task}</span>
                <span className="text-muted-foreground/30 text-[9px]">{log.worker}</span>
              </div>
            ))}
            {completedTasks < executionLog.length && (
              <div className="flex items-center gap-2 py-1.5">
                <span className="inline-block w-1.5 h-3 bg-accent animate-pulse" />
                <span className="text-muted-foreground/30 text-[10px]">executing...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveExecution;
