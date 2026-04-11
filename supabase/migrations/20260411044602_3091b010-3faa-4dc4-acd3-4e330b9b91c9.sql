
-- =====================
-- EVOLUTION METRICS TABLE
-- =====================
CREATE TABLE public.evolution_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  agent_name TEXT NOT NULL,
  metric_type TEXT NOT NULL DEFAULT 'success_rate',
  metric_value NUMERIC NOT NULL DEFAULT 0,
  period_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  period_end TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  improvement_pct NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_evolution_metrics_user ON public.evolution_metrics(user_id);
CREATE INDEX idx_evolution_metrics_agent ON public.evolution_metrics(agent_name);
CREATE INDEX idx_evolution_metrics_type ON public.evolution_metrics(metric_type);
CREATE INDEX idx_evolution_metrics_period ON public.evolution_metrics(period_start DESC);

ALTER TABLE public.evolution_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own metrics"
  ON public.evolution_metrics FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own metrics"
  ON public.evolution_metrics FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- =====================
-- PROMPT VERSIONS TABLE
-- =====================
CREATE TABLE public.prompt_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  agent_name TEXT NOT NULL,
  version INT NOT NULL DEFAULT 1,
  prompt_text TEXT NOT NULL,
  performance_score NUMERIC DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT false,
  parent_version_id UUID REFERENCES public.prompt_versions(id),
  change_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_prompt_versions_user ON public.prompt_versions(user_id);
CREATE INDEX idx_prompt_versions_agent ON public.prompt_versions(agent_name);
CREATE INDEX idx_prompt_versions_active ON public.prompt_versions(is_active) WHERE is_active = true;

ALTER TABLE public.prompt_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own prompts"
  ON public.prompt_versions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own prompts"
  ON public.prompt_versions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prompts"
  ON public.prompt_versions FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- =====================
-- EVOLUTION RECOMMENDATIONS TABLE
-- =====================
CREATE TYPE public.evolution_category AS ENUM ('agent', 'workflow', 'prompt', 'tool', 'architecture');
CREATE TYPE public.recommendation_status AS ENUM ('pending', 'accepted', 'rejected', 'applied');

CREATE TABLE public.evolution_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category evolution_category NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  impact_score NUMERIC NOT NULL DEFAULT 0,
  status recommendation_status NOT NULL DEFAULT 'pending',
  ai_reasoning TEXT,
  applied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_recommendations_user ON public.evolution_recommendations(user_id);
CREATE INDEX idx_recommendations_status ON public.evolution_recommendations(status);
CREATE INDEX idx_recommendations_category ON public.evolution_recommendations(category);

ALTER TABLE public.evolution_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own recommendations"
  ON public.evolution_recommendations FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own recommendations"
  ON public.evolution_recommendations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recommendations"
  ON public.evolution_recommendations FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.evolution_metrics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.evolution_recommendations;

-- Timestamp trigger
CREATE TRIGGER update_recommendations_updated_at
  BEFORE UPDATE ON public.evolution_recommendations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
