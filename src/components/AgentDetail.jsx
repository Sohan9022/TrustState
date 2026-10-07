import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Cpu, Key, FileCode, Database, Terminal, CheckCircle2, Lock, AlertTriangle, Layers } from 'lucide-react';

export default function AgentDetail({ agent, onSelectAgent, allAgents }) {
  const [activeTierTab, setActiveTierTab] = useState('tier1');
  const isQuarantined = agent.status === 'QUARANTINED';

  return (
    <div className="space-y-6">
      {/* Agent Selector & Header */}
      <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-xl ${isQuarantined ? 'bg-rose-950 text-rose-400 border border-rose-800' : 'bg-slate-800 text-cyan-400 border border-slate-700'}`}>
              {isQuarantined ? <ShieldAlert className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8 text-emerald-400" />}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold text-white font-mono">{agent.name}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                  isQuarantined
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {agent.status}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  {agent.framework}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{agent.role}</p>
            </div>
          </div>

          {/* Quick Agent Switcher Dropdown */}
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-400">Switch Agent:</span>
            <select
              value={agent.id}
              onChange={(e) => onSelectAgent(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              {allAgents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.status})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cryptographic State Identity Banner */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-slate-950/80 border border-slate-800/80">
          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Active State ID</div>
            <div className="text-sm font-bold font-mono text-cyan-400 mt-0.5 flex items-center space-x-1.5">
              <span>{agent.activeStateId}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-normal">
                Canonical RFC-8785
              </span>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">SHA-256 State Commitment</div>
            <div className="text-xs font-mono text-slate-300 mt-0.5 truncate" title={agent.expectedHash}>
              {agent.expectedHash.substring(0, 24)}...
            </div>
          </div>

          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Active Lease Token</div>
            <div className="text-xs font-mono text-emerald-400 mt-0.5 flex items-center space-x-1">
              <Key className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isQuarantined ? 'REVOKED (Circuit Breaker)' : `Valid (${agent.leaseTokenExpiry})`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Tier Protected State Inspector */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              3-Tier State Taxonomy Inspector
            </h3>
          </div>
          <span className="text-xs text-slate-400">PRD §6 State Model</span>
        </div>

        {/* Tier Tabs */}
        <div className="flex border-b border-slate-800/80 bg-slate-950/40">
          <button
            onClick={() => setActiveTierTab('tier1')}
            className={`flex-1 py-3 px-4 text-xs font-medium border-b-2 transition-all flex items-center justify-center space-x-2 ${
              activeTierTab === 'tier1'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tier 1: Protected Execution State (PES)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 font-mono">
              HASHED
            </span>
          </button>

          <button
            onClick={() => setActiveTierTab('tier2')}
            className={`flex-1 py-3 px-4 text-xs font-medium border-b-2 transition-all flex items-center justify-center space-x-2 ${
              activeTierTab === 'tier2'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Tier 2: Curated Long-Term Memory (LTM)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 font-mono">
              GATED
            </span>
          </button>

          <button
            onClick={() => setActiveTierTab('tier3')}
            className={`flex-1 py-3 px-4 text-xs font-medium border-b-2 transition-all flex items-center justify-center space-x-2 ${
              activeTierTab === 'tier3'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            <span>Tier 3: Ephemeral Context</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
              RUNTIME
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTierTab === 'tier1' && (
            <div className="space-y-6">
              <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 flex items-center justify-between">
                <span>
                  <strong>Cryptographic Anchor:</strong> Any modification to Tier 1 constitutes a state transition. Unauthorized mutations trigger immediate quarantine.
                </span>
                <span className="font-mono text-cyan-300 font-semibold">{agent.activeStateId}</span>
              </div>

              {/* System Instructions */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  System Instructions & Policy Invariants
                </label>
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {agent.pes.tier1_durable.systemInstructions}
                </div>
              </div>

              {/* Tool Whitelist & Model Config */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Authorized Tool Bindings ({agent.pes.tier1_durable.toolPermissions.length})
                  </label>
                  <div className="space-y-1.5">
                    {agent.pes.tier1_durable.toolPermissions.map((tool) => (
                      <div key={tool} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs font-mono">
                        <span className="text-slate-300">{tool}</span>
                        <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>BINDING_ACTIVE</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Model & Orchestration DAG
                  </label>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Target Model:</span>
                      <span className="text-cyan-300">{agent.pes.tier1_durable.modelConfiguration.model}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Temperature:</span>
                      <span className="text-cyan-300">{agent.pes.tier1_durable.modelConfiguration.temperature}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Routing DAG:</span>
                      <span className="text-cyan-300">{agent.pes.tier1_durable.routingGraph}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTierTab === 'tier2' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90">
                <strong>Curated Memory Boundary:</strong> Learned memory updates are evaluated via the Sandbox → Commit pipeline to prevent memory poisoning attacks.
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Memory Partition Binding
                </label>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-400">
                  {agent.pes.tier2_curated_ltm.memoryPartition}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Curated Persona Rules & Guidelines
                </label>
                <div className="space-y-2">
                  {agent.pes.tier2_curated_ltm.personaRules.map((rule, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-start space-x-2">
                      <span className="text-amber-400 font-mono">#{idx + 1}</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTierTab === 'tier3' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300">
                <strong>Ephemeral Context (Working Scratchpad):</strong> Conversational turns and retrieved RAG snippets do NOT invalidate the Tier 1 cryptographic hash. Policy is enforced at the MCP Gateway.
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Current LLM Scratchpad / Reasoning Trace
                </label>
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed">
                  {agent.pes.tier3_ephemeral.workingScratchpad}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Active RAG Chunks:</span>
                  <span className="text-cyan-400 font-semibold">{agent.pes.tier3_ephemeral.activeRAGContextCount} documents loaded</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Last Executed Tool:</span>
                  <span className="text-cyan-400 font-semibold">{agent.pes.tier3_ephemeral.lastToolExecuted}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
