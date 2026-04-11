import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Loader2, MessageSquare, Slack, MessageCircle } from 'lucide-react';
import { useMessages, ChatMessage } from '@/hooks/useMessages';
import { useAgentEvents } from '@/hooks/useAgentEvents';

const agentColors: Record<string, string> = {
  'Vytreon Brain': '#6C5CE7',
  'CEO Agent': '#00F5D4',
  'SEOAgentPro': '#FF6B6B',
  'CaptionIQ': '#FECA57',
  'Fycera': '#54A0FF',
  'SireIQ': '#FF9FF3',
  'System': '#00F5D4',
};

const channelIcons: Record<string, React.ReactNode> = {
  in_app: <MessageSquare size={10} />,
  slack: <Slack size={10} />,
  telegram: <MessageCircle size={10} />,
};

const CommandCenter: React.FC = () => {
  const { messages, loading, sendMessage } = useMessages('in_app');
  const { createEvent } = useAgentEvents();
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasSeeded, setHasSeeded] = useState(false);

  // Seed initial welcome message if no messages exist
  useEffect(() => {
    if (!loading && messages.length === 0 && !hasSeeded) {
      setHasSeeded(true);
      sendMessage(
        'Good morning. All systems operational. 6 products active, 18 tasks running. What would you like to accomplish today?',
        'agent',
        'Vytreon Brain',
        { auto: true }
      );
    }
  }, [loading, messages.length, hasSeeded, sendMessage]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;
    const userInput = input;
    setInput('');
    
    // Send user message to DB
    await sendMessage(userInput, 'user');
    setIsProcessing(true);

    // Create agent event for the task
    await createEvent('Vytreon Brain', 'CEO Agent', 'task_handoff', {
      goal: userInput,
      priority: 'high',
    });

    // Simulate multi-agent response chain
    setTimeout(async () => {
      await sendMessage(
        `Analyzing your request: "${userInput}". Deploying multi-agent strategy across all departments...`,
        'agent',
        'Vytreon Brain',
        { goal: userInput }
      );

      setTimeout(async () => {
        await sendMessage(
          '✅ Strategy created. Delegating to specialized agents. You\'ll receive approval requests for high-impact actions.',
          'agent',
          'CEO Agent'
        );
        setIsProcessing(false);
      }, 2000);
    }, 1500);
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
        <h2 className="text-sm font-semibold text-white">Command Center</h2>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6C5CE7]/15 text-[#6C5CE7] font-medium">Live</span>
        <div className="ml-auto flex items-center gap-1.5">
          {Object.entries(channelIcons).map(([ch, icon]) => (
            <div key={ch} className={`w-5 h-5 rounded flex items-center justify-center ${ch === 'in_app' ? 'bg-[#6C5CE7]/20 text-[#6C5CE7]' : 'bg-white/[0.04] text-white/20'}`}>
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 size={20} className="text-[#6C5CE7] animate-spin" />
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender_type === 'user' ? 'justify-end' : ''}`}>
                {msg.sender_type !== 'user' && (
                  <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${agentColors[msg.sender_name] || '#6C5CE7'}20` }}
                  >
                    <Bot size={14} style={{ color: agentColors[msg.sender_name] || '#6C5CE7' }} />
                  </div>
                )}
                <div className={`max-w-[75%] ${msg.sender_type === 'user' ? 'order-first' : ''}`}>
                  {msg.sender_type !== 'user' && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-semibold" style={{ color: agentColors[msg.sender_name] || '#6C5CE7' }}>
                        {msg.sender_name}
                      </span>
                      {msg.channel !== 'in_app' && (
                        <span className="text-[8px] px-1 py-0.5 rounded bg-white/[0.06] text-white/30 uppercase">{msg.channel}</span>
                      )}
                    </div>
                  )}
                  <div className={`rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender_type === 'user' 
                      ? 'bg-[#6C5CE7] text-white ml-auto' 
                      : 'bg-white/[0.04] text-white/80 border border-white/[0.06]'
                  }`}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-white/20 mt-1 block">{formatTime(msg.created_at)}</span>
                </div>
                {msg.sender_type === 'user' && (
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
          </>
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
            disabled={isProcessing}
          />
          <button 
            onClick={handleSend}
            disabled={isProcessing || !input.trim()}
            className="w-8 h-8 rounded-lg bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 flex items-center justify-center transition-colors disabled:opacity-40"
          >
            <Send size={14} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
