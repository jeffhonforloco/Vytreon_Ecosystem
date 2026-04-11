import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ApprovalRequest {
  id: string;
  agent_name: string;
  title: string;
  description: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  priority: string;
  channel_sent: 'in_app' | 'slack' | 'telegram' | 'whatsapp';
  response_note: string | null;
  responded_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export function useApprovals() {
  const { user } = useAuth();
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetch = async () => {
      const { data, error } = await supabase
        .from('approval_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) setApprovals(data as unknown as ApprovalRequest[]);
      setLoading(false);
    };

    fetch();
  }, [user]);

  // Real-time subscription
  useEffect(() => {
    if (!user) return;

    const sub = supabase
      .channel('approvals-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'approval_requests',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setApprovals(prev => [payload.new as unknown as ApprovalRequest, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setApprovals(prev => prev.map(a => a.id === (payload.new as any).id ? payload.new as unknown as ApprovalRequest : a));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(sub); };
  }, [user]);

  const respond = useCallback(async (id: string, status: 'approved' | 'rejected', note?: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('approval_requests')
      .update({
        status,
        response_note: note || null,
        responded_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) console.error('Failed to respond to approval:', error);
  }, [user]);

  const createApproval = useCallback(async (agentName: string, title: string, description?: string, priority: string = 'normal') => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('approval_requests')
      .insert({
        user_id: user.id,
        agent_name: agentName,
        title,
        description,
        priority,
      })
      .select()
      .single();

    if (error) { console.error('Failed to create approval:', error); return null; }
    return data as unknown as ApprovalRequest;
  }, [user]);

  const pendingCount = approvals.filter(a => a.status === 'pending').length;

  return { approvals, loading, respond, createApproval, pendingCount };
}
