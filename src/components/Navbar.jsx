import React from 'react';
import { Shield, Sun, Moon, ShieldAlert, Cpu, Activity } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, agents, pendingCount, incidentCount, theme, onToggleTheme }) {
  const trustedCount = agents.filter(a => a.status === 'TRUSTED').length;
  const quarantinedCount = agents.filter(a => a.status === 'QUARANTINED').length;
  const sandboxCount = agents.filter(a => a.executionMode === 'SANDBOX').length;

  const navItems = [
    { id: 'overview', label: 'Fleet Overview' },
    { id: 'agent', label: 'Agent State & Sandbox' },
    { id: 'timeline', label: 'Timeline & Diff' },
    { id: 'review', label: 'State Approvals', count: pendingCount, countColor: 'amber' },
    { id: 'incident', label: 'Incident Forensics', count: incidentCount, countColor: 'rose' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1120]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-800 border border-slate-700 flex items-center justify-center text-white shadow-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">TrustState</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  v2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">Runtime Security Control Plane</p>
            </div>
          </div>

          {/* Centered Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 p-1 bg-slate-100 dark:bg-[#131C31] rounded-lg border border-slate-200 dark:border-slate-800">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/60 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.count > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-semibold ${
                      item.countColor === 'rose'
                        ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30'
                        : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Telemetry + Theme Toggle */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>12.4ms P95</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span>{trustedCount}/{agents.length} Trusted</span>
              {sandboxCount > 0 && (
                <>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{sandboxCount} Sandbox</span>
                </>
              )}
            </div>

            {quarantinedCount > 0 && (
              <button
                onClick={() => setActiveTab('incident')}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-medium hover:bg-rose-100 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>1 Quarantined</span>
              </button>
            )}

            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-200 dark:border-slate-800">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-slate-800'
                    : 'text-slate-600 dark:text-slate-400'
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
