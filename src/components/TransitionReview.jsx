import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, ArrowRight, UserCheck, Key, Plus, FileDiff, Sparkles } from 'lucide-react';

export default function TransitionReview({ proposals, onApproveProposal, onRejectProposal, onSimulateNewProposal }) {
  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">State Transition Authorizations</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Human-in-the-Loop review for elevated capabilities and protected state modifications.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Button to simulate agent self-proposing a new state change */}
          <button
            onClick={onSimulateNewProposal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white shadow-sm transition-colors border border-slate-700"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate Agent Proposal</span>
          </button>

          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/20 font-mono font-semibold">
            {proposals.length} Pending Approval
          </span>
        </div>
      </div>

      {proposals.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">No Pending State Change Proposals</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            All autonomous agent state mutations have been processed. Click <strong>"Simulate Agent Proposal"</strong> above or promote a Sandbox agent to test the review pipeline.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((prop) => (
            <div key={prop.id} className="p-5 rounded-xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">{prop.id}</span>
                  <span className="text-slate-400">for</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">{prop.agentName}</span>
                  <span className="text-slate-400 text-[11px]">({prop.submittedAt})</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {prop.currentStateId}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 font-bold">
                    {prop.proposedStateId}
                  </span>
                </div>
              </div>

              {/* Risk Callout */}
              <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-start space-x-3 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-900 dark:text-amber-300">
                    Risk Assessment: {prop.riskLevel} — Proposer: {prop.proposer}
                  </div>
                  <p className="text-[11px] text-amber-800 dark:text-amber-200/90 mt-0.5">{prop.riskReason}</p>
                  <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-1 font-mono">
                    ⚠️ {prop.policyAssessment.flaggedInvariant}
                  </p>
                </div>
              </div>

              {/* Diff View */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                  Proposed Protected State Modifications
                </span>

                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-[11px] space-y-2">
                  {prop.diff.addedTools.map((tool) => (
                    <div key={tool} className="text-amber-700 dark:text-amber-300 flex items-center space-x-1.5 font-medium">
                      <span className="font-bold">+ Tool Binding:</span>
                      <span className="bg-amber-100 dark:bg-amber-500/20 px-1.5 py-0.2 rounded border border-amber-300 dark:border-amber-500/30">{tool}</span>
                    </div>
                  ))}
                  <div className="text-slate-800 dark:text-slate-200 pt-2 border-t border-slate-200 dark:border-slate-800 leading-relaxed">
                    <span className="text-slate-500 block text-[10px]">Instruction Diff:</span>
                    <div className="p-2 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 mt-1 border border-slate-200 dark:border-slate-800">
                      {prop.diff.instructionsChange}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 text-xs">
                <button
                  onClick={() => onRejectProposal(prop.id)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span>Reject & Discard</span>
                </button>

                <button
                  onClick={() => onApproveProposal(prop.id)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Key className="w-4 h-4" />
                  <span>Approve & Commit ({prop.proposedStateId})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
