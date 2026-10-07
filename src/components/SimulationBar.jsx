import React from 'react';
import { Zap, AlertOctagon, RotateCcw, RotateCw, FlaskConical, Terminal, Sparkles } from 'lucide-react';

export default function SimulationBar({
  onSimulateAction,
  onSimulateSandboxAction,
  onSimulateAttack,
  onRollback,
  onReset,
  isAttacked,
  isSandboxMode,
  onOpenTour
}) {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all max-w-[95vw]">
      <div className="bg-white/95 dark:bg-[#131C31]/95 backdrop-blur-md border border-slate-300 dark:border-slate-700/80 rounded-xl shadow-2xl p-2 flex flex-wrap items-center gap-2 text-xs">
        {/* Title & 30s Guide */}
        <div className="flex items-center space-x-1.5 px-2 py-1 text-slate-500 dark:text-slate-400 font-mono text-[11px] border-r border-slate-200 dark:border-slate-800">
          <Terminal className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">Controls</span>
        </div>

        <button
          onClick={onOpenTour}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800 transition-all active:scale-95"
          title="Open 30-Second Evaluator Guide"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>30s Guide</span>
        </button>

        {/* 1. Test Normal Verified Action */}
        <button
          onClick={onSimulateAction}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium border border-slate-300 dark:border-slate-700 transition-all active:scale-95"
          title="Committed State: Hash verified in <15ms, lease token issued, payment permitted."
        >
          <Zap className="w-3.5 h-3.5 text-emerald-500" />
          <span>Test Normal Call</span>
        </button>

        {/* 2. Test Sandbox Experimentation Action (Section 11) */}
        <button
          onClick={onSimulateSandboxAction}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 font-medium border border-indigo-200 dark:border-indigo-800 transition-all active:scale-95"
          title="Sandbox State (§11): Agent experiments freely, but privileged execution is blocked."
        >
          <FlaskConical className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
          <span>Test Sandbox (§11)</span>
        </button>

        {/* 3. Prompt Injection Attack */}
        <button
          onClick={onSimulateAttack}
          disabled={isAttacked}
          className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg font-medium transition-all active:scale-95 ${
            isAttacked
              ? 'bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800 cursor-not-allowed'
              : 'bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30'
          }`}
          title="Simulate prompt injection: agent attempts unauthorized mutation, hash mismatch trips circuit breaker."
        >
          <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
          <span>{isAttacked ? 'Quarantined' : 'Simulate Attack'}</span>
        </button>

        {/* 4. 1-Click Rollback */}
        {isAttacked && (
          <button
            onClick={onRollback}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 font-medium transition-all active:scale-95 animate-pulse"
            title="Roll back to previous safe checkpoint S101"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-500" />
            <span>1-Click Rollback</span>
          </button>
        )}

        {/* 5. Reset */}
        <button
          onClick={onReset}
          className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Reset Demo Data"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
