import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Key, Lock, Database, Terminal, CheckCircle2, FlaskConical, ArrowRight, Sparkles } from 'lucide-react';

export default function AgentDetail({ agent, onSelectAgent, allAgents, onToggleSandbox, onPromoteSandbox }) {
  const [activeTierTab, setActiveTierTab] = useState('tier1');
  const isQuarantined = agent.status === 'QUARANTINED';
  const isSandbox = agent.executionMode === 'SANDBOX';

  return (
    <div className="space-y-6 pb-20">
      {/* Agent Selector & Header */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-lg border ${
              isQuarantined
                ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400'
                : isSandbox
                ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400'
                : 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
            }`}>
              {isQuarantined ? <ShieldAlert className="w-6 h-6" /> : isSandbox ? <FlaskConical className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-mono">{agent.name}</h2>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  isQuarantined
                    ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30'
                    : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20'
                }`}>
                  {agent.status}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                  {agent.framework}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{agent.role}</p>
            </div>
          </div>

          {/* Controls: Execution Mode Switcher + Agent Selector */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Mode Switcher (§11 of Concept: Sandbox vs Committed) */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              <button
                onClick={() => onToggleSandbox(agent.id, 'COMMITTED')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  !isSandbox
                    ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Committed (Prod)
              </button>
              <button
                onClick={() => onToggleSandbox(agent.id, 'SANDBOX')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  isSandbox
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Sandbox (§11)
              </button>
            </div>

            {/* Agent Dropdown */}
            <select
              value={agent.id}
              onChange={(e) => onSelectAgent(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none font-mono"
            >
              {allAgents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.executionMode === 'SANDBOX' ? 'Sandbox' : a.status})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 11 Sandbox Mode Callout if active */}
        {isSandbox && (
          <div className="mt-4 p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start space-x-2.5">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-indigo-900 dark:text-indigo-200">
                  Legitimate Self-Learning Sandbox Active (§11)
                </span>
                <p className="text-[11px] text-indigo-700 dark:text-indigo-300/80 mt-0.5">
                  The agent is experimenting with modified prompts & memory. Privileged actions (financial/DB writes) are restricted. <em>"Experiment freely, commit carefully."</em>
                </p>
              </div>
            </div>

            <button
              onClick={() => onPromoteSandbox(agent.id)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-sm transition-colors flex items-center space-x-1 shrink-0"
            >
              <span>Promote to Review Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* State Attributes Row */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Active State ID</span>
            <span className="font-mono text-slate-900 dark:text-white font-semibold">{agent.activeStateId}</span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-[11px]">SHA-256 State Commitment</span>
            <span className="font-mono text-slate-600 dark:text-slate-300 text-[11px] truncate block" title={agent.expectedHash}>
              {agent.expectedHash.substring(0, 24)}...
            </span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Capability Lease Token</span>
            <span className={`font-mono text-[11px] font-semibold ${
              isQuarantined ? 'text-rose-600 dark:text-rose-400' : isSandbox ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-400'
            }`}>
              {isQuarantined ? 'REVOKED (Circuit Breaker)' : isSandbox ? 'SANDBOX TOKEN (Restricted Tools)' : `Active (${agent.leaseTokenExpiry})`}
            </span>
          </div>
        </div>
      </div>

      {/* 3-Tier State Breakdown */}
      <div className="bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {/* Tier Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs">
          <button
            onClick={() => setActiveTierTab('tier1')}
            className={`flex-1 py-3 px-4 font-semibold border-b-2 transition-all flex items-center justify-center space-x-2 ${
              activeTierTab === 'tier1'
                ? 'border-emerald-600 dark:border-emerald-500 text-slate-900 dark:text-white bg-white dark:bg-[#131C31]'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Tier 1: Protected State (PES)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
              HASHED
            </span>
          </button>

          <button
            onClick={() => setActiveTierTab('tier2')}
            className={`flex-1 py-3 px-4 font-semibold border-b-2 transition-all flex items-center justify-center space-x-2 ${
              activeTierTab === 'tier2'
                ? 'border-amber-600 dark:border-amber-500 text-slate-900 dark:text-white bg-white dark:bg-[#131C31]'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Tier 2: Long-Term Memory (LTM)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
              GATED
            </span>
          </button>

          <button
            onClick={() => setActiveTierTab('tier3')}
            className={`flex-1 py-3 px-4 font-semibold border-b-2 transition-all flex items-center justify-center space-x-2 ${
              activeTierTab === 'tier3'
                ? 'border-indigo-600 dark:border-indigo-500 text-slate-900 dark:text-white bg-white dark:bg-[#131C31]'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Tier 3: Working Context</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
              RUNTIME
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5">
          {activeTierTab === 'tier1' && (
            <div className="space-y-5 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                  System Instructions & Policy Invariants
                </label>
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-slate-800 dark:text-slate-200 leading-relaxed text-[11px]">
                  {agent.pes.tier1_durable.systemInstructions}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                    Authorized Tool Bindings ({agent.pes.tier1_durable.toolPermissions.length})
                  </label>
                  <div className="space-y-1.5">
                    {agent.pes.tier1_durable.toolPermissions.map((tool) => (
                      <div key={tool} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-[11px]">
                        <span className="text-slate-800 dark:text-slate-200">{tool}</span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>BINDING_ACTIVE</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                    Model & Orchestration DAG
                  </label>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500">Model:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">{agent.pes.tier1_durable.modelConfiguration.model}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500">Temperature:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">{agent.pes.tier1_durable.modelConfiguration.temperature}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Routing Graph:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">{agent.pes.tier1_durable.routingGraph}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTierTab === 'tier2' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                  Memory Partition Binding
                </label>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-slate-800 dark:text-slate-200 text-[11px]">
                  {agent.pes.tier2_curated_ltm.memoryPartition}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                  Curated Persona Rules & Guidelines
                </label>
                <div className="space-y-2">
                  {agent.pes.tier2_curated_ltm.personaRules.map((rule, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                      <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">#{idx + 1}</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTierTab === 'tier3' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                  Current LLM Scratchpad / Reasoning Trace
                </label>
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-800 dark:text-slate-200 leading-relaxed">
                  {agent.pes.tier3_ephemeral.workingScratchpad}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Active RAG Chunks:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">{agent.pes.tier3_ephemeral.activeRAGContextCount} documents loaded</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Last Tool Invocation:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">{agent.pes.tier3_ephemeral.lastToolExecuted}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
