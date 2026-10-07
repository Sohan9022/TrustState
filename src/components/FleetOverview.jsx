import React from 'react';
import { ShieldCheck, ShieldAlert, Activity, Clock, Cpu, ArrowUpRight, CheckCircle2, Lock } from 'lucide-react';

export default function FleetOverview({ agents, actionsStream, onSelectAgent, onNavigateTab }) {
  const trustedAgents = agents.filter(a => a.status === 'TRUSTED');
  const quarantinedAgents = agents.filter(a => a.status === 'QUARANTINED');
  const totalConsequentialActions = agents.reduce((acc, a) => acc + a.consequentialActions24h, 0);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner if quarantine exists */}
      {quarantinedAgents.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-rose-200">
                Circuit Breaker Engaged: {quarantinedAgents[0].name}
              </div>
              <p className="text-[11px] text-rose-300/80">
                Cryptographic state hash mismatch detected. Privileged tool gate frozen.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('incident')}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 transition-colors"
          >
            <span>View Forensics</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-white tracking-tight">Fleet Integrity Overview</h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Real-time state attestation, lease tokens, and tool gateway telemetry for autonomous agents.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Agents */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 shadow-sm">
          <div className="text-xs text-zinc-400 font-medium">Monitored Agents</div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-semibold text-white font-mono">{agents.length}</span>
            <span className="text-xs text-zinc-500">active processes</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400 flex items-center space-x-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span>Policy Enforced</span>
          </div>
        </div>

        {/* Card 2: Cryptographically Trusted */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 shadow-sm">
          <div className="text-xs text-zinc-400 font-medium">Verified State</div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-semibold text-emerald-400 font-mono">{trustedAgents.length}</span>
            <span className="text-xs text-zinc-500">/ {agents.length} valid</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-500">
            Active SHA-256 state leases
          </div>
        </div>

        {/* Card 3: Quarantined */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 shadow-sm">
          <div className="text-xs text-zinc-400 font-medium">Quarantined</div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className={`text-2xl font-semibold font-mono ${quarantinedAgents.length > 0 ? 'text-rose-400' : 'text-zinc-200'}`}>
              {quarantinedAgents.length}
            </span>
            <span className="text-xs text-zinc-500">isolated</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-500">
            Circuit breaker protection
          </div>
        </div>

        {/* Card 4: Verification Latency */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 shadow-sm">
          <div className="text-xs text-zinc-400 font-medium">P95 Verification Latency</div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-semibold text-zinc-100 font-mono">12.4 ms</span>
            <span className="text-xs text-emerald-400">(&lt;25ms SLA)</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-500">
            Local Redis cache verification
          </div>
        </div>
      </div>

      {/* Main Grid: Agent Fleet Table & Live Action Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Monitored Agent Cards */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
            <span className="font-medium text-zinc-300">Agent Fleet</span>
            <span>Select row to inspect state</span>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl overflow-hidden divide-y divide-zinc-800/60">
            {agents.map((agent) => {
              const isQuarantined = agent.status === 'QUARANTINED';
              return (
                <div
                  key={agent.id}
                  onClick={() => onSelectAgent(agent.id)}
                  className="p-4 hover:bg-zinc-800/30 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg border ${
                      isQuarantined
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        : 'bg-zinc-800/80 border-zinc-700/60 text-zinc-300'
                    }`}>
                      {isQuarantined ? <ShieldAlert className="w-4 h-4 text-rose-400" /> : <Lock className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold text-white font-mono">{agent.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
                          {agent.framework}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{agent.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 self-end sm:self-auto text-xs">
                    <div className="text-right">
                      <div className="font-mono text-zinc-300 text-[11px]">
                        State <span className="text-zinc-100 font-semibold">{agent.activeStateId}</span>
                      </div>
                      <div className="font-mono text-[10px] text-zinc-500">
                        {agent.expectedHash.substring(0, 10)}...
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium ${
                      isQuarantined
                        ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (1 col): Live Consequential Action Stream */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
            <span className="font-medium text-zinc-300">Gateway Audit Stream</span>
            <span className="font-mono text-[10px] text-zinc-500">MCP Proxy</span>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-3 divide-y divide-zinc-800/60 max-h-[460px] overflow-y-auto">
            {actionsStream.map((item) => {
              const isAllowed = item.status === 'ALLOWED';
              return (
                <div key={item.id} className="py-2.5 first:pt-1 last:pb-1 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-zinc-400">{item.agent}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold ${
                      isAllowed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-1 font-mono text-[11px] text-zinc-300 truncate bg-zinc-950/60 px-2 py-1 rounded border border-zinc-800/60">
                    {item.action}
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                    <span>{item.timestamp}</span>
                    <span className="text-zinc-400">{item.latency}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
