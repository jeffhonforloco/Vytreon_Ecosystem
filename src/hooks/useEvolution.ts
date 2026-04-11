import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface EvolutionRecommendation {
  id: string;
  category: 'agent' | 'workflow' | 'prompt' | 'tool' | 'architecture';
  title: string;
  description: string | null;
  impact_score: number;
  status: 'pending' | 'accepted' | 'rejected' | 'applied';
  ai_reasoning: string | null;
  applied_at: string | null;
  created_at: string;
}

export interface EvolutionMetric {
  id: string;
  agent_name: string;
  metric_type: string;
  metric_value: number;
  improvement_pct: number;
  period_start: string;
  created_at: string;
}

export function useEvolution() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<EvolutionRecommendation[]>([]);
  const [metrics, setMetrics] = useState<EvolutionMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const [recsRes, metricsRes] = await Promise.all([
        supabase.from('evolution_recommendations').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('evolution_metrics').select('*').order('created_at', { ascending: false }).limit(50),
      ]);

      if (recsRes.data) setRecommendations(recsRes.data as unknown as EvolutionRecommendation[]);
      if (metricsRes.data) setMetrics(metricsRes.data as unknown as EvolutionMetric[]);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  // Real-time for recommendations
  useEffect(() => {
    if (!user) return;
    const sub = supabase
      .channel('evolution-recs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'evolution_recommendations', filter: `user_id=eq.${user.id}` }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setRecommendations(prev => [payload.new as unknown as EvolutionRecommendation, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setRecommendations(prev => prev.map(r => r.id === (payload.new as any).id ? payload.new as unknown as EvolutionRecommendation : r));
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(sub); };
  }, [user]);

  const runAnalysis = useCallback(async () => {
    if (!user) return;
    setAnalyzing(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('aes-analyze', {
        body: {},
      });

      if (fnError) {
        setError(fnError.message || 'Analysis failed');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  }, [user]);

  const updateRecommendation = useCallback(async (id: string, status: 'accepted' | 'rejected' | 'applied') => {
    if (!user) return;
    const updatePayload: { status: string; applied_at?: string } = { status };
    if (status === 'applied') updatePayload.applied_at = new Date().toISOString();

    await supabase.from('evolution_recommendations').update(updatePayload).eq('id', id);
  }, [user]);

  const seedMetrics = useCallback(async () => {
    if (!user) return;
    
    const agents = ['CEO Agent', 'SEOAgentPro', 'CaptionIQ', 'Fycera', 'SireIQ'];
    const metricTypes = ['success_rate', 'completion_time', 'quality_score', 'efficiency'];
    const rows: any[] = [];

    agents.forEach(agent => {
      metricTypes.forEach(type => {
        const baseValue = type === 'success_rate' ? 85 + Math.random() * 15 :
                          type === 'completion_time' ? 30 + Math.random() * 60 :
                          type === 'quality_score' ? 70 + Math.random() * 30 :
                          60 + Math.random() * 40;
        const improvement = (Math.random() * 20) - 5;

        rows.push({
          user_id: user.id,
          agent_name: agent,
          metric_type: type,
          metric_value: Math.round(baseValue * 10) / 10,
          improvement_pct: Math.round(improvement * 10) / 10,
        });
      });
    });

    await supabase.from('evolution_metrics').insert(rows);
    
    // Refresh
    const { data } = await supabase.from('evolution_metrics').select('*').order('created_at', { ascending: false }).limit(50);
    if (data) setMetrics(data as unknown as EvolutionMetric[]);
  }, [user]);

  const pendingCount = recommendations.filter(r => r.status === 'pending').length;

  return { recommendations, metrics, loading, analyzing, error, runAnalysis, updateRecommendation, seedMetrics, pendingCount };
}
