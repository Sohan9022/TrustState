import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, ArrowRight, UserCheck, Key, FileDiff } from 'lucide-react';

export default function TransitionReview({ proposals, onApproveProposal, onRejectProposal }) {
  if (proposals.length === 0) {
    return (
      <div className="p-12 text-center rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
        <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
        <h3 className="text-sm font-semibold text-white">No Pending State Change Proposals</h3>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
          All autonomous agent state mutations have been processed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-lg font-semibold text-white tracking-tight">State Transition Authorizations</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Human-in-the-Loop review for elevated capabilities and protected state modifications.
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono w-fit">
          {proposals.length} Pending Approval
        </span>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {proposals.map((prop) => (
          <div key={prop.id} className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 shadow-sm space-y-4">
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/60 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-semibold text-zinc-200">{prop.id}</span>
                <span className="text-zinc-500">for</span>
                <span className="font-mono text-white font-medium">{prop.agentName}</span>
                <span className="text-zinc-500 text-[11px]">({prop.submittedAt})</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {prop.currentStateId}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                <span className="font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                  {prop.proposedStateId}
                </span>
              </div>
            </div>

            {/* Risk Callout */}
            <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start space-x-3 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-amber-300">
                  Risk Tier: {prop.riskLevel} — Proposer: {prop.proposer}
                </div>
                <p className="text-[11px] text-amber-200/80 mt-0.5">{prop.riskReason}</p>
                <p className="text-[11px] text-amber-400 mt-1 font-mono">
                  {prop.policyAssessment.flaggedInvariant}
                </p>
              </div>
            </div>

            {/* Diff View */}
            <div className="space-y-2">
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 block">
                Proposed State Modifications
              </span>

              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-[11px] space-y-2">
                {prop.diff.addedTools.map((tool) => (
                  <div key={tool} className="text-amber-300 flex items-center space-x-1.5">
                    <span className="font-bold">+ Tool Binding:</span>
                    <span className="bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">{tool}</span>
                  </div>
                ))}
                <div className="text-zinc-300 pt-2 border-t border-zinc-800/60 leading-relaxed">
                  <span className="text-zinc-500 block text-[10px]">Instruction Diff:</span>
                  <div className="p-2 rounded bg-zinc-900/80 text-zinc-200 mt-1">
                    {prop.diff.instructionsChange}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 text-xs">
              <button
                onClick={() => onRejectProposal(prop.id)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
              >
                Reject & Rollback
              </button>

              <button
                onClick={() => onApproveProposal(prop.id)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg font-medium bg-zinc-100 hover:bg-white text-zinc-900 shadow-sm transition-colors flex items-center justify-center space-x-1.5"
              >
                <Key className="w-3.5 h-3.5 text-zinc-900" />
                <span>Approve & Commit ({prop.proposedStateId})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
