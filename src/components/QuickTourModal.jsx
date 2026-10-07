import React from 'react';
import { X, Sparkles, ShieldCheck, Zap, FlaskConical, AlertOctagon, ArrowRight, ExternalLink, BookOpen, Terminal } from 'lucide-react';
import { TrustStateMark } from './TrustStateLogo';

export default function QuickTourModal({ isOpen, onClose, onLaunchConsole, onRunNormal, onRunSandbox, onRunAttack }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                Recruiter & Executive Walkthrough
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs text-slate-500 font-mono">30-Second PM Tour</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <TrustStateMark size={24} />
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Evaluating TrustState in 3 Clicks
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600 dark:text-slate-300">
          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>The 0→1 Problem & Product Thesis</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              Autonomous AI agents can dynamically rewrite their own instructions and memory. Traditional IAM checks <em>if</em> an agent has permission, but cannot verify <em>whether the agent was hijacked mid-session</em>.
            </p>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              TrustState solves this by treating the agent runtime as untrusted user-space: <strong>The agent proposes a state change, but only TrustState cryptographically authorizes it.</strong>
            </p>
          </div>

          {/* 3 Step Interactive Walkthrough */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Try the 3-Click Interactive Demo (Controls Dock)
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {/* Step 1 */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">
                      1. "Test Normal Call" (Verified Execution)
                    </span>
                    <button
                      onClick={() => {
                        onLaunchConsole();
                        onRunNormal();
                        onClose();
                      }}
                      className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2"
                    >
                      Run Now →
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Demonstrates the sub-15ms inline tool gateway. The cryptographic hash matches authoritative state, minting a short-lived signed lease token that permits tool execution.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 mt-0.5">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">
                      2. "Test Sandbox (§11)" (Safe Agent Self-Learning)
                    </span>
                    <button
                      onClick={() => {
                        onLaunchConsole();
                        onRunSandbox();
                        onClose();
                      }}
                      className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 underline underline-offset-2"
                    >
                      Run Now →
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Proves how agents can self-tune (e.g. DSPy prompt optimization) in an uncommitted sandbox. When attempting privileged actions, execution is safely gated until committed.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 mt-0.5">
                  <AlertOctagon className="w-4 h-4" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">
                      3. "Simulate Attack" (Detection & Circuit Breaker)
                    </span>
                    <button
                      onClick={() => {
                        onRunAttack();
                        onClose();
                      }}
                      className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 underline underline-offset-2"
                    >
                      Trigger Attack →
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Simulates an indirect prompt injection that tampers with the agent's instructions. TrustState detects the hash mismatch, instantly freezes privileged APIs, and enables 1-click rollback.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PM Documents Links */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3 font-medium">
              <a
                href="https://github.com/Sohan9022/TrustState/blob/main/PRD.md"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                <span>Full PRD (17 Eng Sections)</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <a
                href="https://github.com/Sohan9022/TrustState/blob/main/INTERVIEW_PLAYBOOK.md"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors"
              >
                <span>Interview Playbook</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>

            <button
              onClick={() => {
                onLaunchConsole();
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-600/20"
            >
              <span>Explore Live SecOps Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
