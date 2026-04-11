import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ChatMessage {
  id: string;
  channel: 'in_app' | 'slack' | 'telegram' | 'whatsapp';
  direction: 'inbound' | 'outbound';
  sender_type: 'user' | 'agent' | 'system';
  sender_name: string;
  content: string;
  metadata: Record<string, any>;
  thread_id: string | null;
  created_at: string;
}

export function useMessages(channel: 'in_app' | 'slack' | 'telegram' | 'whatsapp' = 'in_app') {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch existing messages
  useEffect(() => {
    if (!user) return;
    
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('channel', channel)
        .order('created_at', { ascending: true })
        .limit(100);

      if (!error && data) {
        setMessages(data as unknown as ChatMessage[]);
      }
      setLoading(false);
    };

    fetchMessages();
  }, [user, channel]);

  // Real-time subscription
  useEffect(() => {
    if (!user) return;

    const sub = supabase
      .channel(`messages-${channel}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        const newMsg = payload.new as unknown as ChatMessage;
        if (newMsg.channel === channel) {
          setMessages(prev => [...prev, newMsg]);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(sub); };
  }, [user, channel]);

  // Send a message
  const sendMessage = useCallback(async (content: string, senderType: 'user' | 'agent' | 'system' = 'user', senderName?: string, metadata?: Record<string, any>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('messages')
      .insert({
        user_id: user.id,
        channel,
        direction: senderType === 'user' ? 'outbound' : 'inbound',
        sender_type: senderType,
        sender_name: senderName || user.email?.split('@')[0] || 'User',
        content,
        metadata: metadata || {},
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to send message:', error);
      return null;
    }
    return data as unknown as ChatMessage;
  }, [user, channel]);

  return { messages, loading, sendMessage, scrollRef };
}
