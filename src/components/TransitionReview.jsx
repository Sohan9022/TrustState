import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle, XCircle, ArrowRight, UserCheck, Key, FileDiff } from 'lucide-react';

export default function TransitionReview({ proposals, onApproveProposal, onRejectProposal }) {
  if (proposals.length === 0) {
    return (
      <div className="p-12 text-center rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
        <h3 className="text-base font-semibold text-white">No Pending State Change Proposals</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          All autonomous agent state mutations have been processed. When an agent proposes a high-risk capability change or instruction update, it will appear here for verification.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white font-mono">
              State Transition Review (Human-in-the-Loop)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enforcing the Core Product Principle: <strong className="text-slate-200">The agent can propose a state change, but it cannot unilaterally make that state trusted.</strong>
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          {proposals.length} Pending Approval
        </span>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {proposals.map((prop) => (
          <div key={prop.id} className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-6">
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <span className="font-mono font-bold text-cyan-400 text-sm">{prop.id}</span>
                <span className="text-xs text-slate-400">for</span>
                <span className="font-mono text-sm text-white font-semibold">{prop.agentName}</span>
                <span className="text-xs text-slate-500">({prop.submittedAt})</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Proposed Transition:</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {prop.currentStateId}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  {prop.proposedStateId}
                </span>
              </div>
            </div>

            {/* Risk Assessment Box */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                      Risk Tier: {prop.riskLevel}
                    </span>
                    <span className="text-slate-400 text-xs">| Proposer: {prop.proposer}</span>
                  </div>
                  <p className="text-xs text-amber-200/90 mt-1">{prop.riskReason}</p>
                  <p className="text-[11px] text-amber-400/80 mt-1 font-mono">
                    ⚠️ {prop.policyAssessment.flaggedInvariant}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded bg-amber-900/60 border border-amber-700 text-amber-200 text-xs font-mono shrink-0">
                HITL GATED
              </span>
            </div>

            {/* Diff breakdown */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <FileDiff className="w-4 h-4 text-cyan-400" />
                <span>Proposed Protected State Alterations</span>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                {prop.diff.addedTools.map((tool) => (
                  <div key={tool} className="text-amber-400 flex items-center space-x-2">
                    <span className="font-bold">+ Tool Binding:</span>
                    <span className="bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800">{tool}</span>
                  </div>
                ))}
                <div className="text-slate-300 pt-2 border-t border-slate-800/80">
                  <span className="text-slate-500 block mb-1">Instruction Mutation:</span>
                  <div className="p-2 rounded bg-slate-900 text-cyan-300 leading-relaxed">
                    {prop.diff.instructionsChange}
                  </div>
                </div>
                <div className="text-slate-400 pt-1 text-[11px]">
                  Workflow routing graph updated to: <code className="text-slate-200">{prop.diff.workflowChange}</code>
                </div>
              </div>
            </div>

            {/* Approval Controls */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => onRejectProposal(prop.id)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all flex items-center justify-center space-x-1.5"
              >
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Reject & Rollback Proposal</span>
              </button>

              <button
                onClick={() => onApproveProposal(prop.id)}
                className="w-full sm:w-auto px-5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-600/20 border border-cyan-400/40 transition-all flex items-center justify-center space-x-1.5"
              >
                <Key className="w-4 h-4 text-cyan-200" />
                <span>Approve & Sign Commitment (Commit S102)</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
