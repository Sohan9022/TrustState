import React, { useState } from 'react';
import { Zap, AlertOctagon, RotateCcw, RotateCw, ChevronUp, ChevronDown, Terminal } from 'lucide-react';

export default function SimulationBar({ onSimulateAction, onSimulateAttack, onRollback, onReset, isAttacked }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all">
      <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 rounded-xl shadow-2xl p-2 flex items-center space-x-2 text-xs">
        {/* Label */}
        <div className="flex items-center space-x-2 px-2.5 py-1 text-zinc-400 font-mono text-[11px] border-r border-zinc-800">
          <Terminal className="w-3.5 h-3.5 text-zinc-400" />
          <span className="font-semibold text-zinc-200">Interactive Demo</span>
        </div>

        {/* Action 1: Legitimate Action */}
        <button
          onClick={onSimulateAction}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700/80 text-zinc-200 font-medium border border-zinc-700 transition-all active:scale-95"
          title="Agent calls privileged tool. Hash matches, lease token issued in ~11ms."
        >
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Test Normal Call</span>
        </button>

        {/* Action 2: Prompt Injection Attack */}
        <button
          onClick={onSimulateAttack}
          disabled={isAttacked}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all active:scale-95 ${
            isAttacked
              ? 'bg-zinc-800/40 text-zinc-600 border border-zinc-800 cursor-not-allowed'
              : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30'
          }`}
          title="Simulate indirect prompt injection: agent attempts unauthorized mutation, hash mismatch trips circuit breaker."
        >
          <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
          <span>{isAttacked ? 'Agent Quarantined' : 'Simulate Injection Attack'}</span>
        </button>

        {/* Action 3: Rollback */}
        {isAttacked && (
          <button
            onClick={onRollback}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium transition-all active:scale-95 animate-pulse"
            title="Roll back to previous safe checkpoint S101"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            <span>1-Click Rollback</span>
          </button>
        )}

        {/* Reset */}
        <button
          onClick={onReset}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          title="Reset Demo Data"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
