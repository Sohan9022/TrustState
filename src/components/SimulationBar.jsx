import React from 'react';
import { Play, Zap, AlertOctagon, RotateCcw, ShieldCheck, Terminal } from 'lucide-react';

export default function SimulationBar({ onSimulateAction, onSimulateAttack, onRollback, onReset, isAttacked }) {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-cyan-950/70 border border-cyan-800/60 text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
              <span>Interactive Control Sandbox</span>
              <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                0→1 PM Demo Mode
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Test runtime integrity, prompt injection prevention, and automated recovery live:
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Button 1: Legitimate verification */}
          <button
            onClick={onSimulateAction}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-700/60 transition-all shadow-sm active:scale-95"
            title="Agent requests privileged tool. Hash matches, lease token issued in ~11ms."
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Simulate Verified Action</span>
          </button>

          {/* Button 2: Prompt injection attack */}
          <button
            onClick={onSimulateAttack}
            disabled={isAttacked}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm active:scale-95 ${
              isAttacked
                ? 'bg-slate-800/60 text-slate-500 border border-slate-700/40 cursor-not-allowed'
                : 'bg-rose-950/90 hover:bg-rose-900 text-rose-200 border border-rose-700 shadow-rose-900/20 animate-pulse'
            }`}
            title="Inject malicious instruction into agent context. Cryptographic state mismatch trips circuit breaker."
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            <span>{isAttacked ? 'Agent Already Quarantined' : 'Simulate Prompt Injection Attack'}</span>
          </button>

          {/* Button 3: Rollback & Recovery */}
          <button
            onClick={onRollback}
            disabled={!isAttacked}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm active:scale-95 ${
              !isAttacked
                ? 'bg-slate-800/40 text-slate-600 border border-slate-800 cursor-not-allowed'
                : 'bg-cyan-950/90 hover:bg-cyan-900 text-cyan-200 border border-cyan-600 shadow-cyan-900/20'
            }`}
            title="Roll back to previous trusted PES checkpoint S101 and restore execution."
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>1-Click Rollback & Recover</span>
          </button>

          {/* Button 4: Reset */}
          <button
            onClick={onReset}
            className="px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
            title="Reset simulation to initial state"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
