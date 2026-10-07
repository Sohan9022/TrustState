import React from 'react';
import { Shield, ShieldAlert, Cpu, Activity, Clock, Layers, GitBranch, AlertTriangle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, agents, pendingCount, incidentCount }) {
  const trustedCount = agents.filter(a => a.status === 'TRUSTED').length;
  const quarantinedCount = agents.filter(a => a.status === 'QUARANTINED').length;

  return (
    <header className="border-b border-slate-800 bg-[#0c121e]/90 backdrop-blur-md sticky top-0 z-50">
      {/* Top status bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between border-b border-slate-800/60 text-xs">
        <div className="flex items-center space-x-6 text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-slate-200">TrustState Gateway: ACTIVE</span>
          </div>
          <div className="hidden sm:flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>P95 Verification Latency:</span>
            <span className="font-mono text-cyan-300 font-semibold">12.2 ms</span>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Activity className="w-3.5 h-3.5 text-slate-400" />
            <span>MCP Proxy:</span>
            <span className="text-slate-300 font-mono">ENFORCING</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Fleet Trust:</span>
            <span className="px-2 py-0.5 rounded-full font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {trustedCount}/{agents.length} Trusted
            </span>
            {quarantinedCount > 0 && (
              <span className="px-2 py-0.5 rounded-full font-mono font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse">
                {quarantinedCount} Quarantined
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white font-mono">TrustState</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800">
                v2.0 Runtime
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-none">Zero-Trust Runtime Integrity for AI Agents</p>
          </div>
        </div>

        <nav className="flex space-x-1 sm:space-x-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('agent')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'agent'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            Agent Trust Detail
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'timeline'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            State Timeline & Diff
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`relative px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'review'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <span>Transition Review</span>
            {pendingCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('incident')}
            className={`relative px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'incident'
                ? 'bg-rose-950/40 text-rose-300 border border-rose-800/50 shadow-sm'
                : 'text-slate-400 hover:text-rose-300 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Incidents</span>
              {incidentCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/30 text-rose-200 border border-rose-500/40">
                  {incidentCount}
                </span>
              )}
            </div>
          </button>
        </nav>
      </div>
    </header>
  );
}
