import React from 'react';
import { ShieldCheck, ShieldAlert, Activity, Clock, CheckCircle2, XCircle, ArrowUpRight, Cpu, AlertTriangle, Layers } from 'lucide-react';

export default function FleetOverview({ agents, actionsStream, onSelectAgent, onNavigateTab }) {
  const trustedAgents = agents.filter(a => a.status === 'TRUSTED');
  const quarantinedAgents = agents.filter(a => a.status === 'QUARANTINED');
  const totalConsequentialActions = agents.reduce((acc, a) => acc + a.consequentialActions24h, 0);
  const totalBlockedActions = agents.reduce((acc, a) => acc + a.blockedActions24h, 0) + (quarantinedAgents.length > 0 ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Top Banner if quarantine exists */}
      {quarantinedAgents.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-rose-900/60 text-rose-300 mt-0.5">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-rose-200">
                ACTIVE SECURITY INCIDENT: Circuit Breaker Tripped on {quarantinedAgents[0].name}
              </h4>
              <p className="text-xs text-rose-300/80 mt-1">
                A cryptographic state hash mismatch was detected during runtime verification. Privileged tool execution has been frozen and the agent is quarantined.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('incident')}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-900/80 hover:bg-rose-800 text-rose-100 border border-rose-700 transition-all shrink-0 ml-4"
          >
            <span>Investigate Incident</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Fleet Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Agents */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-medium uppercase tracking-wider">Monitored Fleet</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-white">{agents.length}</span>
            <span className="text-xs text-slate-400">active autonomous agents</span>
          </div>
          <div className="mt-3 flex items-center space-x-1.5 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span>100% PES Policy Enforced</span>
          </div>
        </div>

        {/* Card 2: Cryptographically Trusted */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-medium uppercase tracking-wider">Verified Trusted</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-emerald-400">{trustedAgents.length}</span>
            <span className="text-xs text-slate-400">/ {agents.length} agents</span>
          </div>
          <div className="mt-3 flex items-center space-x-1.5 text-xs text-slate-400">
            <span>Valid SHA-256 lease active</span>
          </div>
        </div>

        {/* Card 3: Quarantined / Blocked */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-medium uppercase tracking-wider">Quarantined</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className={`text-3xl font-bold font-mono ${quarantinedAgents.length > 0 ? 'text-rose-400' : 'text-slate-200'}`}>
              {quarantinedAgents.length}
            </span>
            <span className="text-xs text-slate-400">agents quarantined</span>
          </div>
          <div className="mt-3 flex items-center space-x-1.5 text-xs text-slate-400">
            <span>{totalBlockedActions} high-risk actions blocked</span>
          </div>
        </div>

        {/* Card 4: Verification Latency */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-medium uppercase tracking-wider">P95 Verification Latency</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-cyan-300">12.4 ms</span>
            <span className="text-xs text-slate-400">target &lt; 25ms</span>
          </div>
          <div className="mt-3 flex items-center space-x-1.5 text-xs text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Sub-millisecond Redis cache</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Agent Fleet Table & Live Action Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Monitored Agent Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                Active Agent Fleet Status
              </h3>
            </div>
            <span className="text-xs text-slate-400">Click any agent for state breakdown</span>
          </div>

          <div className="space-y-3">
            {agents.map((agent) => {
              const isQuarantined = agent.status === 'QUARANTINED';
              return (
                <div
                  key={agent.id}
                  onClick={() => onSelectAgent(agent.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isQuarantined
                      ? 'bg-rose-950/20 border-rose-800/80 hover:border-rose-600'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isQuarantined ? 'bg-rose-900/40 text-rose-300' : 'bg-slate-800 text-cyan-400'}`}>
                        {isQuarantined ? <ShieldAlert className="w-5 h-5 text-rose-400" /> : <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-semibold text-white font-mono">{agent.name}</h4>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                            {agent.framework}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{agent.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 self-end sm:self-auto">
                      <div className="text-right">
                        <div className="text-xs font-mono text-slate-300">
                          State: <span className="text-cyan-400 font-semibold">{agent.activeStateId}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {agent.consequentialActions24h} actions (24h)
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider ${
                        isQuarantined
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                  </div>

                  {/* Cryptographic hash snippet */}
                  <div className="mt-3 pt-3 border-t border-slate-800/70 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500">Hash:</span>
                      <code className="text-[11px] text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono">
                        {agent.expectedHash.substring(0, 16)}...{agent.expectedHash.substring(agent.expectedHash.length - 8)}
                      </code>
                    </div>
                    <div className="flex items-center space-x-4 text-[11px]">
                      <span>Verified: {agent.lastVerified}</span>
                      <span className="text-cyan-400 font-mono">Lease: {agent.leaseTokenExpiry}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (1 col): Live Consequential Action Stream */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                Live Consequential Actions
              </h3>
            </div>
            <span className="text-[11px] font-mono text-cyan-400">MCP Proxy Stream</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 divide-y divide-slate-800/60 max-h-[500px] overflow-y-auto">
            {actionsStream.map((item) => {
              const isAllowed = item.status === 'ALLOWED';
              return (
                <div key={item.id} className="py-2.5 first:pt-1 last:pb-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400 text-[11px]">{item.timestamp}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      isAllowed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200 font-mono">{item.agent}</span>
                    <span className="text-[11px] font-mono text-cyan-300">{item.latency}</span>
                  </div>

                  <div className="mt-1 text-xs font-mono text-slate-300 bg-slate-950/80 px-2 py-1 rounded border border-slate-800/80 truncate">
                    {item.action}
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span>State: <code className="text-slate-300">{item.stateId}</code></span>
                    <span className="truncate max-w-[150px]">{item.policyRule}</span>
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
