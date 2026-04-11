import React, { useState, useEffect } from 'react';
import { Cpu, Shield } from 'lucide-react';

interface AutonomousPromptProps {
  onChoice: (autonomous: boolean) => void;
}

const AutonomousPrompt: React.FC<AutonomousPromptProps> = ({ onChoice }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[700px] h-[700px] rounded-full blur-[160px] bg-accent/[0.04]" />

      <div className={`relative z-10 w-full max-w-lg px-8 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-accent/10 border border-accent/15 flex items-center justify-center">
          <Cpu size={28} className="text-accent" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-heading tracking-tight">
          Enable Autonomous Mode?
        </h2>
        <p className="text-muted-foreground text-sm mb-10 max-w-sm mx-auto leading-relaxed">
          AWOS can run your AI workforce fully autonomously — executives delegate, 
          managers route, workers execute — 24/7 with governance guardrails.
        </p>

        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <button
            onClick={() => onChoice(true)}
            className="group relative px-8 py-4 rounded-xl text-accent-foreground font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-accent rounded-xl" />
            <div className="absolute -inset-1 bg-accent/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center justify-center gap-2 font-mono text-sm">
              <Cpu size={16} />
              Yes, run autonomously
            </span>
          </button>

          <button
            onClick={() => onChoice(false)}
            className="group px-8 py-4 rounded-xl border border-border bg-secondary/10 hover:bg-secondary/20 text-muted-foreground hover:text-foreground/70 font-mono text-sm transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              <Shield size={16} />
              No, manual approval mode
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutonomousPrompt;
