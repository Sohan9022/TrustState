import React from 'react';
import { Shield, Sun, Moon, ShieldAlert, ExternalLink, Sparkles, Presentation, ArrowRight } from 'lucide-react';

export default function Navbar({
  viewMode, // 'landing' | 'console'
  setViewMode,
  activeTab,
  setActiveTab,
  agents,
  pendingCount,
  incidentCount,
  theme,
  onToggleTheme,
  onOpenTour,
  onOpenPresentation
}) {
  const trustedCount = agents.filter(a => a.status === 'TRUSTED').length;
  const quarantinedCount = agents.filter(a => a.status === 'QUARANTINED').length;

  const consoleTabs = [
    { id: 'overview', label: 'Fleet Overview' },
    { id: 'agent', label: 'Agent State & Sandbox' },
    { id: 'timeline', label: 'Timeline & Diff' },
    { id: 'review', label: 'State Approvals', count: pendingCount },
    { id: 'incident', label: 'Incidents', count: incidentCount },
  ];

  const handleNavClick = (target) => {
    if (target === 'landing') {
      setViewMode('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'architecture') {
      if (viewMode !== 'landing') {
        setViewMode('landing');
        setTimeout(() => {
          const el = document.getElementById('architecture');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById('architecture');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (target === 'console') {
      setViewMode('console');
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand */}
          <div
            className="flex items-center space-x-2.5 cursor-pointer shrink-0"
            onClick={() => handleNavClick('landing')}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">TrustState</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-semibold">
                v2.0
              </span>
            </div>
          </div>

          {/* Center Clean Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 text-xs font-semibold">
            <button
              onClick={() => handleNavClick('landing')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'landing'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Platform
            </button>

            <button
              onClick={() => handleNavClick('architecture')}
              className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Architecture
            </button>

            <button
              onClick={() => handleNavClick('console')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
                viewMode === 'console'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>SecOps Console</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            <a
              href="https://github.com/Sohan9022/TrustState/blob/main/PRD.md"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>PRD</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href="https://github.com/Sohan9022/TrustState"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-2 text-xs">
            {/* 30s Tour Guide CTA */}
            <button
              onClick={onOpenTour}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all flex items-center space-x-1 shadow-sm"
              title="30-Second Evaluator Guide"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">30s Tour</span>
            </button>

            {/* Pitch Deck CTA */}
            <button
              onClick={onOpenPresentation}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-800 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all flex items-center space-x-1 shadow-sm"
              title="Executive Presentation Deck (8 Slides)"
            >
              <Presentation className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">Pitch Deck</span>
            </button>

            {/* Status Telemetry */}
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
                <span className="hidden sm:inline">SEV-1 Incident</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Console Sub-Navigation Bar (Only when inside Console view) */}
        {viewMode === 'console' && (
          <div className="flex items-center space-x-1 py-2 border-t border-slate-200 dark:border-slate-800 overflow-x-auto">
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
