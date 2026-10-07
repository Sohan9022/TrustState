import React from 'react';
import { Shield, Sun, Moon, ShieldAlert, Cpu, Activity, Terminal, ArrowRight, ExternalLink } from 'lucide-react';

export default function Navbar({
  viewMode, // 'landing' | 'console'
  setViewMode,
  activeTab,
  setActiveTab,
  agents,
  pendingCount,
  incidentCount,
  theme,
  onToggleTheme
}) {
  const trustedCount = agents.filter(a => a.status === 'TRUSTED').length;
  const quarantinedCount = agents.filter(a => a.status === 'QUARANTINED').length;

  const consoleTabs = [
    { id: 'overview', label: 'Fleet Overview' },
    { id: 'agent', label: 'Agent State & Sandbox' },
    { id: 'timeline', label: 'Timeline & Diff' },
    { id: 'review', label: 'State Approvals', count: pendingCount, countColor: 'amber' },
    { id: 'incident', label: 'Incidents', count: incidentCount, countColor: 'rose' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setViewMode('landing')}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">TrustState</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 font-semibold">
                  CONTROL PLANE
                </span>
              </div>
            </div>
          </div>

          {/* Center Links / Modes */}
          <div className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setViewMode('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'landing'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Overview & Architecture
            </button>

            <button
              onClick={() => setViewMode('console')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                viewMode === 'console'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>SecOps Console</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-mono text-[10px]">
                LIVE
              </span>
            </button>

            <a
              href="https://github.com/Sohan9022/TrustState/blob/main/PRD.md"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all flex items-center space-x-1"
            >
              <span>PRD Docs</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href="https://github.com/Sohan9022/TrustState"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all flex items-center space-x-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          {/* Right Controls: Telemetry + Theme Toggle + CTA */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>12.4ms P95</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span>{trustedCount}/{agents.length} Trusted</span>
            </div>

            {quarantinedCount > 0 && (
              <button
                onClick={() => {
                  setViewMode('console');
                  setActiveTab('incident');
                }}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-semibold hover:bg-rose-200 transition-colors animate-pulse"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>1 Quarantined</span>
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={theme === 'dark' ? 'Switch to Clean Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mode Button */}
            {viewMode === 'landing' ? (
              <button
                onClick={() => setViewMode('console')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all flex items-center space-x-1"
              >
                <span>Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setViewMode('landing')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all"
              >
                <span>Home</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary Console Sub-Nav (When in Console Mode) */}
        {viewMode === 'console' && (
          <div className="flex items-center space-x-1 py-2.5 border-t border-slate-200 dark:border-slate-800 overflow-x-auto">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider pr-2 shrink-0">
              Console Tabs:
            </span>
            {consoleTabs.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all shrink-0 flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.count > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-amber-400 text-slate-900">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
