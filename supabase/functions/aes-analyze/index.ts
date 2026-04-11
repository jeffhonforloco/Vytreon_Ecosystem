import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUser = createClient(supabaseUrl, Deno.env.get("SUPABASE_PUBLISHABLE_KEY") || supabaseServiceKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch current metrics, agent events, and approval data for analysis
    const [metricsRes, eventsRes, approvalsRes] = await Promise.all([
      supabase.from("evolution_metrics").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(50),
      supabase.from("agent_events").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(30),
      supabase.from("approval_requests").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
    ]);

    const metrics = metricsRes.data || [];
    const events = eventsRes.data || [];
    const approvals = approvalsRes.data || [];

    // Build context for AI analysis
    const analysisContext = {
      totalMetrics: metrics.length,
      agentNames: [...new Set(metrics.map(m => m.agent_name))],
      eventTypes: events.reduce((acc: Record<string, number>, e) => {
        acc[e.event_type] = (acc[e.event_type] || 0) + 1;
        return acc;
      }, {}),
      approvalStats: {
        total: approvals.length,
        approved: approvals.filter(a => a.status === "approved").length,
        rejected: approvals.filter(a => a.status === "rejected").length,
        pending: approvals.filter(a => a.status === "pending").length,
      },
      recentMetrics: metrics.slice(0, 10),
    };

    // Call Lovable AI for analysis
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are the Vytreon Auto-Evolution System (AES) — an AI analyst that evaluates AI workforce performance and generates improvement recommendations.

Analyze the provided metrics and generate exactly 3-5 actionable recommendations. Each recommendation must include:
- category: one of "agent", "workflow", "prompt", "tool", "architecture"
- title: concise action item (max 80 chars)
- description: detailed explanation (2-3 sentences)
- impact_score: estimated improvement impact 1-100
- ai_reasoning: your reasoning for this recommendation (1-2 sentences)

Respond ONLY with valid JSON array of recommendation objects. No markdown, no explanation outside the JSON.`,
          },
          {
            role: "user",
            content: `Analyze this AWOS system data and generate improvement recommendations:\n\n${JSON.stringify(analysisContext, null, 2)}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_recommendations",
              description: "Generate evolution recommendations for the AI workforce",
              parameters: {
                type: "object",
                properties: {
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        category: { type: "string", enum: ["agent", "workflow", "prompt", "tool", "architecture"] },
                        title: { type: "string" },
                        description: { type: "string" },
                        impact_score: { type: "number" },
                        ai_reasoning: { type: "string" },
                      },
                      required: ["category", "title", "description", "impact_score", "ai_reasoning"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["recommendations"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_recommendations" } },
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings > Workspace > Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      throw new Error(`AI analysis failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    
    // Extract recommendations from tool call
    let recommendations: any[] = [];
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      try {
        const parsed = JSON.parse(toolCall.function.arguments);
        recommendations = parsed.recommendations || [];
      } catch {
        console.error("Failed to parse AI recommendations");
      }
    }

    // Store recommendations in DB
    if (recommendations.length > 0) {
      const rows = recommendations.map((r: any) => ({
        user_id: user.id,
        category: r.category,
        title: r.title,
        description: r.description,
        impact_score: r.impact_score,
        ai_reasoning: r.ai_reasoning,
      }));

      const { error: insertErr } = await supabase
        .from("evolution_recommendations")
        .insert(rows);

      if (insertErr) {
        console.error("Failed to store recommendations:", insertErr);
      }
    }

    return new Response(JSON.stringify({ recommendations, context: analysisContext }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("AES analysis error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
