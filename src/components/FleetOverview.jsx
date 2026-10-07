import React from 'react';
import { ShieldCheck, ShieldAlert, Activity, Clock, Cpu, ArrowUpRight, CheckCircle2, Lock, FlaskConical, Database, Server } from 'lucide-react';

export default function FleetOverview({ agents, actionsStream, onSelectAgent, onNavigateTab }) {
  const trustedAgents = agents.filter(a => a.status === 'TRUSTED');
  const quarantinedAgents = agents.filter(a => a.status === 'QUARANTINED');
  const sandboxAgents = agents.filter(a => a.executionMode === 'SANDBOX');
  const totalConsequentialActions = agents.reduce((acc, a) => acc + a.consequentialActions24h, 0);

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner if quarantine exists */}
      {quarantinedAgents.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-rose-900 dark:text-rose-200">
                Circuit Breaker Engaged: {quarantinedAgents[0].name}
              </div>
              <p className="text-[11px] text-rose-700 dark:text-rose-300/80">
                Cryptographic state hash mismatch detected. Privileged execution quarantined.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('incident')}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500/20 dark:hover:bg-rose-500/30 dark:text-rose-200 border border-transparent dark:border-rose-500/40 transition-colors"
          >
            <span>Investigate Incident</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Fleet Integrity Overview</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time state attestation, lease tokens, and tool gateway telemetry for autonomous agents.
          </p>
        </div>

        {/* Dual Mode Counter */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
            {trustedAgents.length} Production
          </span>
          <span className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
            {sandboxAgents.length} Sandbox (§11)
          </span>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Monitored Agents */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Monitored Agents</div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{agents.length}</span>
            <span className="text-xs text-slate-500">active processes</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% PES Enforced</span>
          </div>
        </div>

        {/* Card 2: Cryptographically Verified */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verified Trusted</div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">{trustedAgents.length}</span>
            <span className="text-xs text-slate-500">/ {agents.length} valid</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Valid SHA-256 lease active
          </div>
        </div>

        {/* Card 3: Quarantined */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Quarantined</div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className={`text-2xl font-bold font-mono ${quarantinedAgents.length > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}`}>
              {quarantinedAgents.length}
            </span>
            <span className="text-xs text-slate-500">isolated</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Circuit breaker protection
          </div>
        </div>

        {/* Card 4: Verification Latency */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">P95 Verification Latency</div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">12.4 ms</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">(&lt;25ms SLA)</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Local Redis cache verification
          </div>
        </div>
      </div>

      {/* Main Grid: Fleet Table (Left) & Audit Stream (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Monitored Agent Cards */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-1">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Monitored Agent Fleet</span>
            <span>Click any agent to inspect state & toggle sandbox</span>
          </div>

          <div className="bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800/80 shadow-sm">
            {agents.map((agent) => {
              const isQuarantined = agent.status === 'QUARANTINED';
              const isSandbox = agent.executionMode === 'SANDBOX';
              return (
                <div
                  key={agent.id}
                  onClick={() => onSelectAgent(agent.id)}
                  className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-lg border ${
                      isQuarantined
                        ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400'
                        : isSandbox
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {isQuarantined ? <ShieldAlert className="w-5 h-5" /> : isSandbox ? <FlaskConical className="w-5 h-5" /> : <Lock className="w-5 h-5 text-emerald-500" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white font-mono">{agent.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                          {agent.framework}
                        </span>
                        {isSandbox && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full font-mono font-semibold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                            SANDBOX MODE (§11)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{agent.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 self-end sm:self-auto text-xs">
                    <div className="text-right">
                      <div className="font-mono text-slate-700 dark:text-slate-300 text-xs">
                        State <span className="font-semibold text-slate-900 dark:text-white">{agent.activeStateId}</span>
                      </div>
                      <div className="font-mono text-[11px] text-slate-400">
                        {agent.expectedHash.substring(0, 10)}...
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold ${
                      isQuarantined
                        ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30'
                        : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Infrastructure Health Note (Section 10 PRD) */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#131C31]/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
              <Server className="w-4 h-4 text-emerald-500" />
              <span><strong>TrustStore Telemetry:</strong> Local Redis Cache Hit: <code className="text-emerald-600 dark:text-emerald-400 font-semibold">99.4%</code> | Central Vault Sync: <code className="text-slate-700 dark:text-slate-300 font-semibold">Healthy</code></span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">PRD §10 SLA</span>
          </div>
        </div>

        {/* Right Column (1 col): Live Consequential Action Stream */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-1">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Gateway Audit Stream</span>
            <span className="font-mono text-[10px] text-slate-400">MCP Proxy</span>
          </div>

          <div className="bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 rounded-xl p-3 divide-y divide-slate-100 dark:divide-slate-800/80 max-h-[490px] overflow-y-auto shadow-sm">
            {actionsStream.map((item) => {
              const isAllowed = item.status === 'ALLOWED';
              return (
                <div key={item.id} className="py-2.5 first:pt-1 last:pb-1 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-slate-600 dark:text-slate-400 font-medium">{item.agent}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isAllowed
                        ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20'
                        : 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-1 font-mono text-[11px] text-slate-800 dark:text-slate-200 truncate bg-slate-50 dark:bg-slate-900/80 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
                    {item.action}
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    <span>{item.timestamp}</span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">{item.latency}</span>
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
