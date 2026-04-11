import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface AgentEvent {
  id: string;
  source_agent: string;
  target_agent: string | null;
  event_type: 'task_handoff' | 'status_update' | 'context_share' | 'escalation' | 'completion';
  payload: Record<string, any>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  processed_at: string | null;
  created_at: string;
}

export function useAgentEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState<AgentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('agent_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) setEvents(data as unknown as AgentEvent[]);
      setLoading(false);
    };

    fetchEvents();
  }, [user]);

  // Real-time
  useEffect(() => {
    if (!user) return;

    const sub = supabase
      .channel('agent-events-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'agent_events',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        setEvents(prev => [payload.new as unknown as AgentEvent, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(sub); };
  }, [user]);

  const createEvent = useCallback(async (
    sourceAgent: string,
    targetAgent: string | null,
    eventType: AgentEvent['event_type'],
    payload: Record<string, any> = {}
  ) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('agent_events')
      .insert({
        user_id: user.id,
        source_agent: sourceAgent,
        target_agent: targetAgent,
        event_type: eventType,
        payload,
      })
      .select()
      .single();

    if (error) { console.error('Failed to create agent event:', error); return null; }
    return data as unknown as AgentEvent;
  }, [user]);

  return { events, loading, createEvent };
}
