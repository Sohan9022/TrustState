import React from 'react';
import { Shield, ArrowRight, Lock, Zap, CheckCircle2, Terminal, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export default function HeroSection({ onOpenConsole, onSimulateAttack }) {
  return (
    <div className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none -z-10 blur-3xl opacity-60 dark:opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] tracking-wide uppercase">TrustState 2.0 Control Plane</span>
            <span className="text-emerald-300 dark:text-emerald-600">|</span>
            <span>Zero-Trust Runtime Integrity</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Stop Runtime Agent Hijacking. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
              Cryptographically Verify State
            </span> Before Privileged Actions.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Traditional IAM checks <em>if</em> an agent has permission. <strong>TrustState</strong> verifies that the agent is still operating under the authorized, untampered execution state under which that permission was granted.
          </p>

          {/* Core Principle Callout */}
          <div className="p-3.5 max-w-xl mx-auto rounded-xl bg-slate-100 dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 shadow-sm">
            <strong className="text-emerald-700 dark:text-emerald-400">Core Product Insight:</strong> The agent can propose a state change, but it cannot unilaterally make that state trusted.
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenConsole}
              className="px-6 py-3 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center space-x-2 active:scale-95"
            >
              <span>Launch Interactive SecOps Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#architecture"
              className="px-5 py-3 rounded-xl font-semibold text-sm bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all flex items-center space-x-2 shadow-sm"
            >
              <span>Explore Zero-Trust Architecture</span>
            </a>
          </div>

          {/* Trust Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">&lt; 15 ms</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Enforcement Latency (P95)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">100%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Observable State Binding</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">3-Tier</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">PES State Taxonomy</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400">RFC 8785</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Canonical State Commitments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
