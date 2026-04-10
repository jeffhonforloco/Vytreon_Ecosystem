import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'agent';
  agent?: string;
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  { id: 1, role: 'agent', agent: 'Vytreon Brain', content: 'Good morning. All systems operational. 6 products active, 18 tasks running. What would you like to accomplish today?', timestamp: '9:00 AM' },
  { id: 2, role: 'user', content: 'Increase our organic traffic by 30% this quarter', timestamp: '9:01 AM' },
  { id: 3, role: 'agent', agent: 'CEO Agent', content: 'Analyzing current traffic data across all properties. Creating a multi-product growth strategy...', timestamp: '9:01 AM' },
  { id: 4, role: 'agent', agent: 'SEOAgentPro', content: '✅ Identified 47 high-opportunity keywords. Beginning technical SEO audit on 3 domains. Estimated completion: 2 hours.', timestamp: '9:02 AM' },
  { id: 5, role: 'agent', agent: 'CaptionIQ', content: '📊 Generating 30-day social content calendar aligned with SEO targets. Will distribute across 4 platforms.', timestamp: '9:02 AM' },
  { id: 6, role: 'agent', agent: 'Fycera', content: '🎬 Queued 5 promotional videos based on top-performing keywords. Rendering begins now.', timestamp: '9:03 AM' },
];

const agentColors: Record<string, string> = {
  'Vytreon Brain': '#6C5CE7',
  'CEO Agent': '#00F5D4',
  'SEOAgentPro': '#FF6B6B',
  'CaptionIQ': '#FECA57',
  'Fycera': '#54A0FF',
};

const CommandCenter: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setInput('');
    setIsProcessing(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: 'agent',
        agent: 'Vytreon Brain',
        content: 'Analyzing your request and deploying multi-agent strategy. I\'ll coordinate across all products to execute this goal.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
        <h2 className="text-sm font-semibold text-white">Command Center</h2>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6C5CE7]/15 text-[#6C5CE7] font-medium">Live</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'agent' && (
              <div 
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${agentColors[msg.agent || ''] || '#6C5CE7'}20` }}
              >
                <Bot size={14} style={{ color: agentColors[msg.agent || ''] || '#6C5CE7' }} />
              </div>
            )}
            <div className={`max-w-[75%] ${msg.role === 'user' ? 'order-first' : ''}`}>
              {msg.role === 'agent' && (
                <span className="text-[10px] font-semibold mb-1 block" style={{ color: agentColors[msg.agent || ''] || '#6C5CE7' }}>
                  {msg.agent}
                </span>
              )}
              <div className={`rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-[#6C5CE7] text-white ml-auto' 
                  : 'bg-white/[0.04] text-white/80 border border-white/[0.06]'
              }`}>
                {msg.content}
              </div>
              <span className="text-[10px] text-white/20 mt-1 block">{msg.timestamp}</span>
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <User size={14} className="text-white/60" />
              </div>
            )}
          </div>
        ))}
        {isProcessing && (
          <div className="flex gap-3 items-center">
            <div className="w-7 h-7 rounded-lg bg-[#6C5CE7]/20 flex items-center justify-center">
              <Loader2 size={14} className="text-[#6C5CE7] animate-spin" />
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Sparkles size={12} />
              <span>Deploying multi-agent strategy...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 focus-within:border-[#6C5CE7]/40 transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Give Vytreon a goal (e.g. 'Increase traffic by 30%')"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
          />
          <button 
            onClick={handleSend}
            className="w-8 h-8 rounded-lg bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 flex items-center justify-center transition-colors"
          >
            <Send size={14} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
