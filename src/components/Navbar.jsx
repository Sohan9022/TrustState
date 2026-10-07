import React from 'react';
import { Shield, Activity, Clock, AlertTriangle, Layers, GitBranch, UserCheck, ShieldAlert } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, agents, pendingCount, incidentCount }) {
  const trustedCount = agents.filter(a => a.status === 'TRUSTED').length;
  const quarantinedCount = agents.filter(a => a.status === 'QUARANTINED').length;

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'agent', label: 'Agent State' },
    { id: 'timeline', label: 'Timeline & Diff' },
    { id: 'review', label: 'State Approvals', count: pendingCount, countColor: 'amber' },
    { id: 'incident', label: 'Incidents', count: incidentCount, countColor: 'rose' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-100 shadow-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm tracking-tight text-white">TrustState</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                  v2.0
                </span>
              </div>
            </div>
          </div>

          {/* Centered Minimalist Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 p-1 bg-zinc-900/60 rounded-lg border border-zinc-800/80">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-zinc-800 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.count > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-medium ${
                      item.countColor === 'rose'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* System Telemetry Badges */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-md bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 font-mono text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-zinc-300">P95: 12.4ms</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-300">{trustedCount}/{agents.length} Trusted</span>
            </div>

            {quarantinedCount > 0 && (
              <button
                onClick={() => setActiveTab('incident')}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium hover:bg-rose-500/20 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>1 Quarantined</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-zinc-800/60">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium shrink-0 ${
                  isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
