import React, { useEffect, useState } from 'react';
import { 
  Brain, Zap, TrendingUp, CheckCircle2, XCircle, Clock, 
  Play, RefreshCw, Bot, Workflow, MessageSquare, Wrench, 
  Server, ChevronDown, Sparkles, ArrowUpRight, Loader2
} from 'lucide-react';
import { useEvolution, EvolutionRecommendation, EvolutionMetric } from '@/hooks/useEvolution';

const categoryConfig = {
  agent: { icon: Bot, color: '#6C5CE7', label: 'Agent' },
  workflow: { icon: Workflow, color: '#54A0FF', label: 'Workflow' },
  prompt: { icon: MessageSquare, color: '#FECA57', label: 'Prompt' },
  tool: { icon: Wrench, color: '#FF6B6B', label: 'Tool' },
  architecture: { icon: Server, color: '#00F5D4', label: 'Architecture' },
};

const statusConfig = {
  pending: { icon: Clock, color: '#FECA57' },
  accepted: { icon: CheckCircle2, color: '#54A0FF' },
  rejected: { icon: XCircle, color: '#FF6B6B' },
  applied: { icon: CheckCircle2, color: '#00F5D4' },
};

const metricLabels: Record<string, string> = {
  success_rate: 'Success Rate',
  completion_time: 'Completion Time',
  quality_score: 'Quality Score',
  efficiency: 'Efficiency',
  error_rate: 'Error Rate',
};

const AutoEvolutionPanel: React.FC = () => {
  const { 
    recommendations, metrics, loading, analyzing, error, 
    runAnalysis, updateRecommendation, seedMetrics, pendingCount 
  } = useEvolution();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [seeded, setSeeded] = useState(false);

  // Seed metrics on first visit if empty
  useEffect(() => {
    if (!loading && metrics.length === 0 && !seeded) {
      setSeeded(true);
      seedMetrics();
    }
  }, [loading, metrics.length, seeded, seedMetrics]);

  // Group metrics by agent
  const agentMetrics = metrics.reduce<Record<string, EvolutionMetric[]>>((acc, m) => {
    if (!acc[m.agent_name]) acc[m.agent_name] = [];
    acc[m.agent_name].push(m);
    return acc;
  }, {});

  // Overall stats
  const avgImprovement = metrics.length > 0
    ? (metrics.reduce((sum, m) => sum + (m.improvement_pct || 0), 0) / metrics.length).toFixed(1)
    : '0';

  const avgQuality = metrics.filter(m => m.metric_type === 'quality_score').length > 0
    ? (metrics.filter(m => m.metric_type === 'quality_score').reduce((sum, m) => sum + m.metric_value, 0) / metrics.filter(m => m.metric_type === 'quality_score').length).toFixed(0)
    : '--';

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <Brain size={14} className="text-[#6C5CE7]" />
        <h2 className="text-sm font-semibold text-white">Auto-Evolution System</h2>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6C5CE7]/15 text-[#6C5CE7] font-medium">AES</span>
        {pendingCount > 0 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FECA57]/15 text-[#FECA57] font-medium">
            {pendingCount} pending
          </span>
        )}
        <button
          onClick={runAnalysis}
          disabled={analyzing}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6C5CE7]/15 text-[#6C5CE7] text-[10px] font-semibold hover:bg-[#6C5CE7]/25 transition-colors disabled:opacity-40"
        >
          {analyzing ? <Loader2 size={11} className="animate-spin" /> : <Sparkles size={11} />}
          {analyzing ? 'Analyzing...' : 'Run AI Analysis'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {error && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-[#FF6B6B]/10 border border-[#FF6B6B]/20 text-xs text-[#FF6B6B]">
            {error}
          </div>
        )}

        {/* Evolution Overview */}
        <div className="px-6 py-4 border-b border-white/[0.06]">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-3">Evolution Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <TrendingUp size={11} className="text-[#00F5D4]" />
                <span className="text-[9px] text-white/30 uppercase tracking-wider">Avg Improvement</span>
              </div>
              <span className="text-lg font-bold text-white">{avgImprovement}%</span>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Zap size={11} className="text-[#6C5CE7]" />
                <span className="text-[9px] text-white/30 uppercase tracking-wider">Quality Score</span>
              </div>
              <span className="text-lg font-bold text-white">{avgQuality}</span>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Bot size={11} className="text-[#54A0FF]" />
                <span className="text-[9px] text-white/30 uppercase tracking-wider">Agents Tracked</span>
              </div>
              <span className="text-lg font-bold text-white">{Object.keys(agentMetrics).length}</span>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles size={11} className="text-[#FECA57]" />
                <span className="text-[9px] text-white/30 uppercase tracking-wider">Evolutions</span>
              </div>
              <span className="text-lg font-bold text-white">{recommendations.filter(r => r.status === 'applied').length}</span>
            </div>
          </div>
        </div>

        {/* Agent Performance Grid */}
        <div className="px-6 py-4 border-b border-white/[0.06]">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-3">Agent Performance</h3>
          <div className="space-y-2">
            {Object.entries(agentMetrics).map(([agent, agentMs]) => {
              const successRate = agentMs.find(m => m.metric_type === 'success_rate');
              const quality = agentMs.find(m => m.metric_type === 'quality_score');
              const efficiency = agentMs.find(m => m.metric_type === 'efficiency');

              return (
                <div key={agent} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot size={12} className="text-[#6C5CE7]" />
                    <span className="text-xs font-semibold text-white/80">{agent}</span>
                    {successRate && successRate.improvement_pct > 0 && (
                      <span className="ml-auto flex items-center gap-0.5 text-[9px] text-[#00F5D4] font-medium">
                        <ArrowUpRight size={9} />
                        +{successRate.improvement_pct}%
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Success', value: successRate?.metric_value, suffix: '%', color: '#00F5D4' },
                      { label: 'Quality', value: quality?.metric_value, suffix: '', color: '#6C5CE7' },
                      { label: 'Efficiency', value: efficiency?.metric_value, suffix: '%', color: '#54A0FF' },
                    ].map(({ label, value, suffix, color }) => (
                      <div key={label}>
                        <span className="text-[8px] text-white/25 uppercase">{label}</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{ width: `${Math.min(value || 0, 100)}%`, backgroundColor: color }}
                            />
                          </div>
                          <span className="text-[9px] text-white/50 font-medium w-8 text-right">
                            {value ? `${Math.round(value)}${suffix}` : '--'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">AI Recommendations</h3>
            {analyzing && (
              <div className="flex items-center gap-1.5 text-[10px] text-[#6C5CE7]">
                <Loader2 size={10} className="animate-spin" />
                <span>Generating...</span>
              </div>
            )}
          </div>

          {recommendations.length === 0 && !analyzing ? (
            <div className="flex flex-col items-center justify-center py-8 text-white/20 text-xs">
              <Sparkles size={24} className="mb-2" />
              <span>Click "Run AI Analysis" to generate recommendations</span>
            </div>
          ) : (
            <div className="space-y-1">
              {recommendations.map((rec) => {
                const cat = categoryConfig[rec.category];
                const stat = statusConfig[rec.status];
                const CatIcon = cat.icon;
                const StatIcon = stat.icon;
                const isExpanded = expandedId === rec.id;

                return (
                  <div key={rec.id} className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : rec.id)}
                      className="w-full px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}15` }}>
                          <CatIcon size={12} style={{ color: cat.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[8px] px-1.5 py-0.5 rounded font-medium uppercase" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                              {cat.label}
                            </span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/40">
                              Impact: {rec.impact_score}/100
                            </span>
                          </div>
                          <p className="text-xs text-white/70 truncate">{rec.title}</p>
                        </div>
                        <StatIcon size={14} style={{ color: stat.color }} className="shrink-0" />
                        <ChevronDown size={12} className={`text-white/20 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-3 space-y-2">
                        {rec.description && (
                          <p className="text-[11px] text-white/50 leading-relaxed pl-8">{rec.description}</p>
                        )}
                        {rec.ai_reasoning && (
                          <div className="pl-8 flex items-start gap-1.5">
                            <Brain size={10} className="text-[#6C5CE7] mt-0.5 shrink-0" />
                            <p className="text-[10px] text-[#6C5CE7]/60 italic">{rec.ai_reasoning}</p>
                          </div>
                        )}

                        {rec.status === 'pending' && (
                          <div className="pl-8 flex gap-2 pt-1">
                            <button
                              onClick={() => updateRecommendation(rec.id, 'applied')}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00F5D4]/15 text-[#00F5D4] text-[10px] font-medium hover:bg-[#00F5D4]/25 transition-colors"
                            >
                              <Play size={9} /> Apply
                            </button>
                            <button
                              onClick={() => updateRecommendation(rec.id, 'accepted')}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#54A0FF]/15 text-[#54A0FF] text-[10px] font-medium hover:bg-[#54A0FF]/25 transition-colors"
                            >
                              <CheckCircle2 size={9} /> Accept
                            </button>
                            <button
                              onClick={() => updateRecommendation(rec.id, 'rejected')}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FF6B6B]/15 text-[#FF6B6B] text-[10px] font-medium hover:bg-[#FF6B6B]/25 transition-colors"
                            >
                              <XCircle size={9} /> Reject
                            </button>
                          </div>
                        )}

                        {rec.status === 'applied' && (
                          <div className="pl-8">
                            <span className="text-[9px] text-[#00F5D4] font-medium">✅ Applied to system</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoEvolutionPanel;
