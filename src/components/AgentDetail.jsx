import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Key, Lock, Database, Terminal, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

export default function AgentDetail({ agent, onSelectAgent, allAgents }) {
  const [activeTierTab, setActiveTierTab] = useState('tier1');
  const isQuarantined = agent.status === 'QUARANTINED';

  return (
    <div className="space-y-6 pb-16">
      {/* Agent Selector & Header */}
      <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-lg border ${
              isQuarantined
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                : 'bg-zinc-800/80 border-zinc-700/60 text-emerald-400'
            }`}>
              {isQuarantined ? <ShieldAlert className="w-5 h-5 text-rose-400" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-semibold text-white font-mono">{agent.name}</h2>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                  isQuarantined
                    ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {agent.status}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
                  {agent.framework}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">{agent.role}</p>
            </div>
          </div>

          {/* Agent Switcher */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-zinc-400">Agent:</span>
            <select
              value={agent.id}
              onChange={(e) => onSelectAgent(e.target.value)}
              className="bg-zinc-950 border border-zinc-700/80 text-xs rounded-lg px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-zinc-500 font-mono"
            >
              {allAgents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.status})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* State Attributes Row */}
        <div className="mt-4 pt-4 border-t border-zinc-800/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-zinc-500 block text-[11px]">Active State ID</span>
            <span className="font-mono text-zinc-200 font-medium">{agent.activeStateId}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px]">SHA-256 Commitment</span>
            <span className="font-mono text-zinc-400 text-[11px] truncate block" title={agent.expectedHash}>
              {agent.expectedHash.substring(0, 24)}...
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px]">Capability Lease Token</span>
            <span className={`font-mono text-[11px] ${isQuarantined ? 'text-rose-400' : 'text-emerald-400'}`}>
              {isQuarantined ? 'REVOKED (Circuit Breaker)' : `Active (${agent.leaseTokenExpiry})`}
            </span>
          </div>
        </div>
      </div>

      {/* 3-Tier State Breakdown */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm">
        {/* Tier Tabs */}
        <div className="flex border-b border-zinc-800/80 bg-zinc-950/40 text-xs">
          <button
            onClick={() => setActiveTierTab('tier1')}
            className={`flex-1 py-3 px-4 font-medium border-b-2 transition-all flex items-center justify-center space-x-2 ${
              activeTierTab === 'tier1'
                ? 'border-emerald-500 text-white bg-zinc-900/60'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tier 1: Protected State (PES)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
              HASHED
            </span>
          </button>

          <button
            onClick={() => setActiveTierTab('tier2')}
            className={`flex-1 py-3 px-4 font-medium border-b-2 transition-all flex items-center justify-center space-x-2 ${
              activeTierTab === 'tier2'
                ? 'border-emerald-500 text-white bg-zinc-900/60'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Tier 2: Long-Term Memory (LTM)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
              GATED
            </span>
          </button>

          <button
            onClick={() => setActiveTierTab('tier3')}
            className={`flex-1 py-3 px-4 font-medium border-b-2 transition-all flex items-center justify-center space-x-2 ${
              activeTierTab === 'tier3'
                ? 'border-emerald-500 text-white bg-zinc-900/60'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>Tier 3: Working Context</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
              RUNTIME
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5">
          {activeTierTab === 'tier1' && (
            <div className="space-y-5 text-xs">
              <div>
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-2">
                  System Instructions & Policy Invariants
                </label>
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-zinc-300 leading-relaxed text-[11px]">
                  {agent.pes.tier1_durable.systemInstructions}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-2">
                    Authorized Tool Bindings ({agent.pes.tier1_durable.toolPermissions.length})
                  </label>
                  <div className="space-y-1.5">
                    {agent.pes.tier1_durable.toolPermissions.map((tool) => (
                      <div key={tool} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-[11px]">
                        <span className="text-zinc-300">{tool}</span>
                        <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>BINDING_ACTIVE</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-2">
                    Model & Orchestration DAG
                  </label>
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between py-1 border-b border-zinc-800/60">
                      <span className="text-zinc-500">Model:</span>
                      <span className="text-zinc-200">{agent.pes.tier1_durable.modelConfiguration.model}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-800/60">
                      <span className="text-zinc-500">Temperature:</span>
                      <span className="text-zinc-200">{agent.pes.tier1_durable.modelConfiguration.temperature}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-zinc-500">Routing Graph:</span>
                      <span className="text-zinc-200">{agent.pes.tier1_durable.routingGraph}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTierTab === 'tier2' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-2">
                  Memory Partition Binding
                </label>
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-zinc-300 text-[11px]">
                  {agent.pes.tier2_curated_ltm.memoryPartition}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-2">
                  Curated Persona Rules & Guidelines
                </label>
                <div className="space-y-2">
                  {agent.pes.tier2_curated_ltm.personaRules.map((rule, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-300 flex items-start space-x-2">
                      <span className="text-amber-400 font-mono">#{idx + 1}</span>
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
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-2">
                  Current LLM Scratchpad / Reasoning Trace
                </label>
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-300 leading-relaxed">
                  {agent.pes.tier3_ephemeral.workingScratchpad}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px]">Active RAG Chunks:</span>
                  <span className="text-zinc-200">{agent.pes.tier3_ephemeral.activeRAGContextCount} documents loaded</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px]">Last Tool Invocation:</span>
                  <span className="text-zinc-200">{agent.pes.tier3_ephemeral.lastToolExecuted}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
