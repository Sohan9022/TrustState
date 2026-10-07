import React from 'react';
import { ShieldCheck, ShieldAlert, Lock, ArrowRight, Database, Server, Key, Terminal, Cpu, CheckCircle2 } from 'lucide-react';

export default function ArchitectureDiagram({ onOpenConsole }) {
  return (
    <section id="architecture" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0B1120]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
            Systems Architecture & Threat Boundary
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How TrustState Secures Privileged Execution
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Treating the autonomous agent runtime as untrusted user space, and the TrustState gateway as a hardened zero-trust control plane.
          </p>
        </div>

        {/* The 3-Zone Architecture Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {/* Zone 1: Untrusted Agent Domain */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-slate-500" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Zone 1: Agent Runtime
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                  UNTRUSTED (User-Space)
                </span>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">LLM Reasoning & Scratchpad</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Ingests untrusted external documents, emails, and web RAG chunks. Subject to prompt injection.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">Autonomous Tool Selection</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Proposes actions and state updates via Model Context Protocol (MCP).
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 font-mono flex items-center justify-between">
              <span>Proposes Action / State</span>
              <ArrowRight className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          {/* Zone 2: TrustState Control Plane (The Core Wedge) */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-[#131C31] border-2 border-emerald-500/40 shadow-md flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Zero-Trust Enforcement Layer
            </div>

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100 dark:border-emerald-900/40">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-white">
                    Zone 2: TrustState Gateway
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold">
                  TRUSTED KERNEL
                </span>
              </div>

              <div className="mt-4 space-y-2.5 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300">RFC 8785 Canonicalizer</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">Deterministic</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300">SHA-256 State Commitment</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">H101 Anchor</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300">Redis Local Cache Sidecar</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">&lt; 15ms P95</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300">Signed State Lease Issuer</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">T_lease Token</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-100 dark:border-emerald-900/40 text-[11px] text-emerald-700 dark:text-emerald-300 font-mono flex items-center justify-between">
              <span>Mints Short-Lived Lease</span>
              <ArrowRight className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          {/* Zone 3: Privileged Enterprise Tools */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-slate-500" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Zone 3: Privileged Systems
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                  PROTECTED APIS
                </span>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">Financial & Wire Gateways</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Stripe, SAP, ACH transfers. Rejects requests lacking a verified TrustState cryptographic lease.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">Production Databases & ERP</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    PostgreSQL, Snowflake, Salesforce. Protected against unauthorized write operations.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center justify-between">
              <span>Verified Execution</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        </div>

        {/* CTA to jump into Console */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenConsole}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition-all shadow-sm"
          >
            <span>Test This Architecture Live in the Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
