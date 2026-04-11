import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle2, XCircle, Clock, AlertTriangle, ChevronDown, Bell } from 'lucide-react';
import { useApprovals, ApprovalRequest } from '@/hooks/useApprovals';

const priorityColors: Record<string, string> = {
  critical: '#FF6B6B',
  high: '#FECA57',
  normal: '#6C5CE7',
  low: '#54A0FF',
};

const statusIcons = {
  pending: Clock,
  approved: CheckCircle2,
  rejected: XCircle,
  expired: AlertTriangle,
};

const statusColors = {
  pending: '#FECA57',
  approved: '#00F5D4',
  rejected: '#FF6B6B',
  expired: '#ffffff40',
};

const ApprovalPanel: React.FC = () => {
  const { approvals, loading, respond, createApproval, pendingCount } = useApprovals();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [responseNote, setResponseNote] = useState('');
  const [seeded, setSeeded] = useState(false);

  // Seed demo approvals on first load
  useEffect(() => {
    if (!loading && approvals.length === 0 && !seeded) {
      setSeeded(true);
      const seedApprovals = async () => {
        await createApproval('SEOAgentPro', 'Deploy site-wide schema markup', 'Adding JSON-LD structured data to all 47 pages. Estimated impact: +15% search visibility. Requires production deployment.', 'high');
        await createApproval('Fycera', 'Publish promotional video campaign', 'Batch publish 5 videos to YouTube, TikTok, and Instagram. Budget allocation: $0 (organic). Content approved by CaptionIQ.', 'normal');
        await createApproval('CEO Agent', 'Allocate $500 to paid advertising', 'Based on A/B test results, Variant B shows +23% conversion. Recommend $500 initial spend on Google Ads targeting high-intent keywords.', 'critical');
      };
      seedApprovals();
    }
  }, [loading, approvals.length, seeded, createApproval]);

  const handleRespond = async (id: string, status: 'approved' | 'rejected') => {
    await respond(id, status, responseNote || undefined);
    setExpandedId(null);
    setResponseNote('');
  };

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <Shield size={14} className="text-[#FECA57]" />
        <h2 className="text-sm font-semibold text-white">Approval Requests</h2>
        {pendingCount > 0 && (
          <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#FECA57]/15 text-[#FECA57] font-medium">
            <Bell size={9} />
            {pendingCount} pending
          </span>
        )}
      </div>

      {/* Approval list */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-5 h-5 border-2 border-[#6C5CE7] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : approvals.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-white/20 text-xs">
            <Shield size={24} className="mb-2" />
            <span>No approval requests yet</span>
          </div>
        ) : (
          approvals.map((approval) => {
            const StatusIcon = statusIcons[approval.status];
            const color = statusColors[approval.status];
            const isExpanded = expandedId === approval.id;

            return (
              <div key={approval.id} className="border-b border-white/[0.03]">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : approval.id)}
                  className="w-full px-6 py-3.5 hover:bg-white/[0.02] transition-colors text-left"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <StatusIcon size={12} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-semibold" style={{ color: priorityColors[approval.priority] || '#6C5CE7' }}>
                          [{approval.agent_name}]
                        </span>
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full font-medium uppercase"
                          style={{ backgroundColor: `${priorityColors[approval.priority]}15`, color: priorityColors[approval.priority] }}
                        >
                          {approval.priority}
                        </span>
                        <span className="text-[10px] text-white/20 ml-auto shrink-0">{formatTime(approval.created_at)}</span>
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed truncate">{approval.title}</p>
                    </div>
                    <ChevronDown size={12} className={`text-white/20 transition-transform shrink-0 mt-1 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-6 pb-4 space-y-3">
                    {approval.description && (
                      <p className="text-xs text-white/50 leading-relaxed pl-9">{approval.description}</p>
                    )}

                    {approval.status === 'pending' ? (
                      <div className="pl-9 space-y-2">
                        <input
                          value={responseNote}
                          onChange={(e) => setResponseNote(e.target.value)}
                          placeholder="Add a note (optional)..."
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 outline-none focus:border-[#6C5CE7]/40"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRespond(approval.id, 'approved')}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00F5D4]/15 text-[#00F5D4] text-xs font-medium hover:bg-[#00F5D4]/25 transition-colors"
                          >
                            <CheckCircle2 size={12} /> Approve
                          </button>
                          <button
                            onClick={() => handleRespond(approval.id, 'rejected')}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF6B6B]/15 text-[#FF6B6B] text-xs font-medium hover:bg-[#FF6B6B]/25 transition-colors"
                          >
                            <XCircle size={12} /> Reject
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="pl-9">
                        <span className="text-[10px] font-medium" style={{ color }}>
                          {approval.status === 'approved' ? '✅ Approved' : approval.status === 'rejected' ? '❌ Rejected' : '⏰ Expired'}
                        </span>
                        {approval.response_note && (
                          <p className="text-[10px] text-white/30 mt-1">Note: {approval.response_note}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ApprovalPanel;
