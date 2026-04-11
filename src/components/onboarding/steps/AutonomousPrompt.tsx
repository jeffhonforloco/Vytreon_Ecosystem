import React, { useState, useEffect } from 'react';
import { Cpu, Shield } from 'lucide-react';

interface AutonomousPromptProps {
  onChoice: (autonomous: boolean) => void;
}

const AutonomousPrompt: React.FC<AutonomousPromptProps> = ({ onChoice }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[700px] h-[700px] rounded-full blur-[160px] bg-[#6C5CE7]/6" />

      <div className={`relative z-10 w-full max-w-lg px-8 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Icon */}
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 flex items-center justify-center">
          <Cpu size={28} className="text-[#6C5CE7]" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-heading tracking-tight">
          Enable Autonomous Mode?
        </h2>
        <p className="text-white/30 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
          Vytreon can run your entire digital operation automatically — 
          planning, executing, and optimizing 24/7.
        </p>

        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <button
            onClick={() => onChoice(true)}
            className="group relative px-8 py-4 rounded-xl text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4]/80 rounded-xl" />
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
            <span className="relative z-10 flex items-center justify-center gap-2 font-mono text-sm">
              <Cpu size={16} />
              Yes, run automatically
            </span>
          </button>

          <button
            onClick={() => onChoice(false)}
            className="group px-8 py-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] text-white/40 hover:text-white/60 font-mono text-sm transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              <Shield size={16} />
              No, I want to control it
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutonomousPrompt;
