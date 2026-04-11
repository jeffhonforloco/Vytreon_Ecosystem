
-- Create channel enum
CREATE TYPE public.message_channel AS ENUM ('in_app', 'slack', 'telegram', 'whatsapp');

-- Create message direction enum
CREATE TYPE public.message_direction AS ENUM ('inbound', 'outbound');

-- Create sender type enum
CREATE TYPE public.sender_type AS ENUM ('user', 'agent', 'system');

-- Create approval status enum
CREATE TYPE public.approval_status AS ENUM ('pending', 'approved', 'rejected', 'expired');

-- Create agent event type enum
CREATE TYPE public.agent_event_type AS ENUM ('task_handoff', 'status_update', 'context_share', 'escalation', 'completion');

-- Create agent event status enum
CREATE TYPE public.agent_event_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- =====================
-- MESSAGES TABLE
-- =====================
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  channel message_channel NOT NULL DEFAULT 'in_app',
  direction message_direction NOT NULL DEFAULT 'outbound',
  sender_type sender_type NOT NULL DEFAULT 'user',
  sender_name TEXT NOT NULL DEFAULT 'User',
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  thread_id UUID REFERENCES public.messages(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_messages_user_id ON public.messages(user_id);
CREATE INDEX idx_messages_thread_id ON public.messages(thread_id);
CREATE INDEX idx_messages_channel ON public.messages(channel);
CREATE INDEX idx_messages_created_at ON public.messages(created_at DESC);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own messages"
  ON public.messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- =====================
-- APPROVAL REQUESTS TABLE
-- =====================
CREATE TABLE public.approval_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  agent_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status approval_status NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'normal',
  channel_sent message_channel NOT NULL DEFAULT 'in_app',
  response_note TEXT,
  responded_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_approval_requests_user_id ON public.approval_requests(user_id);
CREATE INDEX idx_approval_requests_status ON public.approval_requests(status);

ALTER TABLE public.approval_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own approvals"
  ON public.approval_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can respond to their own approvals"
  ON public.approval_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can create approval requests"
  ON public.approval_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- =====================
-- AGENT EVENTS TABLE
-- =====================
CREATE TABLE public.agent_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  source_agent TEXT NOT NULL,
  target_agent TEXT,
  event_type agent_event_type NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  status agent_event_status NOT NULL DEFAULT 'pending',
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_agent_events_user_id ON public.agent_events(user_id);
CREATE INDEX idx_agent_events_status ON public.agent_events(status);
CREATE INDEX idx_agent_events_target ON public.agent_events(target_agent);

ALTER TABLE public.agent_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their agent events"
  ON public.agent_events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create agent events"
  ON public.agent_events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update agent events"
  ON public.agent_events FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================
-- NOTIFICATION PREFERENCES TABLE
-- =====================
CREATE TABLE public.notification_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  channel_type message_channel NOT NULL,
  preference_type TEXT NOT NULL DEFAULT 'all',
  enabled BOOLEAN NOT NULL DEFAULT true,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, channel_type, preference_type)
);

CREATE INDEX idx_notification_prefs_user_id ON public.notification_preferences(user_id);

ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own preferences"
  ON public.notification_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own preferences"
  ON public.notification_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON public.notification_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================
-- ENABLE REALTIME
-- =====================
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.approval_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_events;

-- =====================
-- UPDATE TRIGGERS
-- =====================
CREATE TRIGGER update_approval_requests_updated_at
  BEFORE UPDATE ON public.approval_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at
  BEFORE UPDATE ON public.notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
