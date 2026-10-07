import React from 'react';
import { ShieldCheck, Layers, Zap, FlaskConical, Lock, GitBranch, CheckCircle2 } from 'lucide-react';

export default function SecurityPillars() {
  const pillars = [
    {
      icon: ShieldCheck,
      color: "emerald",
      title: "Kernel vs. User-Space Decoupling",
      tagline: "The Agent Proposes, TrustState Authorizes",
      description: "Applies the classic operating system security boundary to GenAI. The LLM runtime is treated as untrusted user space. It can suggest new workflows, memories, or tool calls, but only the TrustState control plane can cryptographically commit trusted state.",
      highlight: "Eliminates in-process self-approval backdoors"
    },
    {
      icon: Layers,
      color: "indigo",
      title: "3-Tier State Governance (PES)",
      tagline: "Solving the Context-Poisoning Dilemma",
      description: "Disentangles Tier 1 Protected Execution State (system prompts, tool bindings, DAGs - hashed via SHA-256) from Tier 2 Curated Memory (gated via sandbox) and Tier 3 Ephemeral Working Context (governed at the tool gateway). Ordinary conversational turns never break the hash.",
      highlight: "Zero false-positive tripwires from normal chat"
    },
    {
      icon: Zap,
      color: "cyan",
      title: "Sub-15ms Inline Tool Gateway",
      tagline: "High-Performance Zero-Trust at Runtime",
      description: "Dual-layer verification architecture. An in-memory local Redis sidecar validates state commitments and mints short-lived signed lease tokens (T_lease) in under 15ms (P95 SLA < 25ms), while the central authoritative store asynchronously logs tamper-evident audit trails.",
      highlight: "No slow remote vault bottlenecks on critical tool calls"
    },
    {
      icon: FlaskConical,
      color: "amber",
      title: "Self-Learning Sandbox Pipeline (§11)",
      tagline: "Experiment Freely, Commit Carefully",
      description: "Preserves agent autonomy without creating security risk. Self-improving agents (e.g. DSPy prompt optimizers) can test new prompts in an isolated Sandbox state. When attempting privileged actions, the gateway enforces committed state before allowing execution.",
      highlight: "Safe self-tuning with Human-in-the-Loop review gates"
    }
  ];

  return (
    <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
            Core Product Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for Mission-Critical Autonomy
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Moving beyond brittle input prompt filters to cryptographic execution state integrity.
          </p>
        </div>

        {/* 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-emerald-600 dark:text-emerald-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      PILLAR 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{pillar.title}</h3>
                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {pillar.tagline}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2 text-xs font-medium text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{pillar.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
