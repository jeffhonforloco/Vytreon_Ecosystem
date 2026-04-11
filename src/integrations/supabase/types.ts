export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      agent_events: {
        Row: {
          created_at: string
          event_type: Database["public"]["Enums"]["agent_event_type"]
          id: string
          payload: Json
          processed_at: string | null
          source_agent: string
          status: Database["public"]["Enums"]["agent_event_status"]
          target_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_type: Database["public"]["Enums"]["agent_event_type"]
          id?: string
          payload?: Json
          processed_at?: string | null
          source_agent: string
          status?: Database["public"]["Enums"]["agent_event_status"]
          target_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_type?: Database["public"]["Enums"]["agent_event_type"]
          id?: string
          payload?: Json
          processed_at?: string | null
          source_agent?: string
          status?: Database["public"]["Enums"]["agent_event_status"]
          target_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      approval_requests: {
        Row: {
          agent_name: string
          channel_sent: Database["public"]["Enums"]["message_channel"]
          created_at: string
          description: string | null
          expires_at: string | null
          id: string
          priority: string
          responded_at: string | null
          response_note: string | null
          status: Database["public"]["Enums"]["approval_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          agent_name: string
          channel_sent?: Database["public"]["Enums"]["message_channel"]
          created_at?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          priority?: string
          responded_at?: string | null
          response_note?: string | null
          status?: Database["public"]["Enums"]["approval_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          agent_name?: string
          channel_sent?: Database["public"]["Enums"]["message_channel"]
          created_at?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          priority?: string
          responded_at?: string | null
          response_note?: string | null
          status?: Database["public"]["Enums"]["approval_status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      evolution_metrics: {
        Row: {
          agent_name: string
          created_at: string
          id: string
          improvement_pct: number | null
          metadata: Json | null
          metric_type: string
          metric_value: number
          period_end: string | null
          period_start: string
          user_id: string
        }
        Insert: {
          agent_name: string
          created_at?: string
          id?: string
          improvement_pct?: number | null
          metadata?: Json | null
          metric_type?: string
          metric_value?: number
          period_end?: string | null
          period_start?: string
          user_id: string
        }
        Update: {
          agent_name?: string
          created_at?: string
          id?: string
          improvement_pct?: number | null
          metadata?: Json | null
          metric_type?: string
          metric_value?: number
          period_end?: string | null
          period_start?: string
          user_id?: string
        }
        Relationships: []
      }
      evolution_recommendations: {
        Row: {
          ai_reasoning: string | null
          applied_at: string | null
          category: Database["public"]["Enums"]["evolution_category"]
          created_at: string
          description: string | null
          id: string
          impact_score: number
          status: Database["public"]["Enums"]["recommendation_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_reasoning?: string | null
          applied_at?: string | null
          category: Database["public"]["Enums"]["evolution_category"]
          created_at?: string
          description?: string | null
          id?: string
          impact_score?: number
          status?: Database["public"]["Enums"]["recommendation_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_reasoning?: string | null
          applied_at?: string | null
          category?: Database["public"]["Enums"]["evolution_category"]
          created_at?: string
          description?: string | null
          id?: string
          impact_score?: number
          status?: Database["public"]["Enums"]["recommendation_status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          channel: Database["public"]["Enums"]["message_channel"]
          content: string
          created_at: string
          direction: Database["public"]["Enums"]["message_direction"]
          id: string
          metadata: Json | null
          sender_name: string
          sender_type: Database["public"]["Enums"]["sender_type"]
          thread_id: string | null
          user_id: string
        }
        Insert: {
          channel?: Database["public"]["Enums"]["message_channel"]
          content: string
          created_at?: string
          direction?: Database["public"]["Enums"]["message_direction"]
          id?: string
          metadata?: Json | null
          sender_name?: string
          sender_type?: Database["public"]["Enums"]["sender_type"]
          thread_id?: string | null
          user_id: string
        }
        Update: {
          channel?: Database["public"]["Enums"]["message_channel"]
          content?: string
          created_at?: string
          direction?: Database["public"]["Enums"]["message_direction"]
          id?: string
          metadata?: Json | null
          sender_name?: string
          sender_type?: Database["public"]["Enums"]["sender_type"]
          thread_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          channel_type: Database["public"]["Enums"]["message_channel"]
          config: Json | null
          created_at: string
          enabled: boolean
          id: string
          preference_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          channel_type: Database["public"]["Enums"]["message_channel"]
          config?: Json | null
          created_at?: string
          enabled?: boolean
          id?: string
          preference_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          channel_type?: Database["public"]["Enums"]["message_channel"]
          config?: Json | null
          created_at?: string
          enabled?: boolean
          id?: string
          preference_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company_name: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prompt_versions: {
        Row: {
          agent_name: string
          change_summary: string | null
          created_at: string
          id: string
          is_active: boolean
          parent_version_id: string | null
          performance_score: number | null
          prompt_text: string
          user_id: string
          version: number
        }
        Insert: {
          agent_name: string
          change_summary?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          parent_version_id?: string | null
          performance_score?: number | null
          prompt_text: string
          user_id: string
          version?: number
        }
        Update: {
          agent_name?: string
          change_summary?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          parent_version_id?: string | null
          performance_score?: number | null
          prompt_text?: string
          user_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "prompt_versions_parent_version_id_fkey"
            columns: ["parent_version_id"]
            isOneToOne: false
            referencedRelation: "prompt_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      agent_event_status: "pending" | "processing" | "completed" | "failed"
      agent_event_type:
        | "task_handoff"
        | "status_update"
        | "context_share"
        | "escalation"
        | "completion"
      app_role: "admin" | "moderator" | "user"
      approval_status: "pending" | "approved" | "rejected" | "expired"
      evolution_category:
        | "agent"
        | "workflow"
        | "prompt"
        | "tool"
        | "architecture"
      message_channel: "in_app" | "slack" | "telegram" | "whatsapp"
      message_direction: "inbound" | "outbound"
      recommendation_status: "pending" | "accepted" | "rejected" | "applied"
      sender_type: "user" | "agent" | "system"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agent_event_status: ["pending", "processing", "completed", "failed"],
      agent_event_type: [
        "task_handoff",
        "status_update",
        "context_share",
        "escalation",
        "completion",
      ],
      app_role: ["admin", "moderator", "user"],
      approval_status: ["pending", "approved", "rejected", "expired"],
      evolution_category: [
        "agent",
        "workflow",
        "prompt",
        "tool",
        "architecture",
      ],
      message_channel: ["in_app", "slack", "telegram", "whatsapp"],
      message_direction: ["inbound", "outbound"],
      recommendation_status: ["pending", "accepted", "rejected", "applied"],
      sender_type: ["user", "agent", "system"],
    },
  },
} as const
