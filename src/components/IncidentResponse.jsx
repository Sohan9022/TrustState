import React from 'react';
import { ShieldAlert, RotateCcw, Download, CheckCircle2, CheckCircle, Terminal } from 'lucide-react';

export default function IncidentResponse({ incidents, onRollbackAgent }) {
  if (incidents.length === 0) {
    return (
      <div className="p-12 text-center rounded-xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
        <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">No Active Security Incidents</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          All autonomous agents are operating within verified cryptographic boundaries. You can use the bottom control dock to simulate a prompt injection attack and observe runtime quarantine.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Active Incident Forensics</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Circuit breaker containment and root-cause analysis for quarantined agents.
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/20 font-mono font-bold w-fit">
          SEV-1 Critical Incident
        </span>
      </div>

      {/* Incident Cards */}
      <div className="space-y-4">
        {incidents.map((incident) => (
          <div key={incident.id} className="p-5 rounded-xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            {/* Top metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs gap-1">
              <div>
                <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">{incident.id}</span>
                <span className="text-slate-300 dark:text-slate-600 mx-2">|</span>
                <span className="font-mono text-slate-900 dark:text-white font-semibold">{incident.agentName}</span>
              </div>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">Detected: {incident.detectedAt}</span>
            </div>

            {/* Forensic Hash Comparison */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
                Cryptographic State Attestation Mismatch
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Expected */}
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Expected Hash ({incident.expectedStateId})</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">AUTHORITATIVE</span>
                  </div>
                  <div className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 break-all bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded border border-emerald-200 dark:border-emerald-800/60">
                    {incident.expectedHash}
                  </div>
                </div>

                {/* Observed */}
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-rose-200 dark:border-rose-900/40 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-rose-700 dark:text-rose-300 font-medium">Observed Hash (Runtime)</span>
                    <span className="text-rose-600 dark:text-rose-400 font-mono text-[10px] font-bold">MISMATCH</span>
                  </div>
                  <div className="font-mono text-[11px] text-rose-700 dark:text-rose-300 break-all bg-rose-50 dark:bg-rose-500/10 p-2 rounded border border-rose-200 dark:border-rose-900/60 font-semibold">
                    {incident.observedHash}
                  </div>
                </div>
              </div>
            </div>

            {/* Threat Vector Analysis */}
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-bold text-[11px] block">Threat Vector Analysis</span>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                {incident.threatAnalysis}
              </p>
              <div className="text-slate-600 dark:text-slate-400 text-[11px] font-mono pt-1">
                Blocked Tool: <code className="text-rose-600 dark:text-rose-400 font-bold">{incident.blockedTool}</code>
              </div>
            </div>

            {/* Automated Containment Protocol */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
                Automated Containment Protocol Executed
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Tool Gateway: FROZEN</span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>State Lease: REVOKED</span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Process: QUARANTINED</span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Audit Event: PERSISTED</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(incident, null, 2));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", `forensic_incident_${incident.id}.json`);
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors flex items-center justify-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export Forensic Evidence (JSON)</span>
              </button>

              <button
                onClick={() => onRollbackAgent(incident.agentId)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Rollback to {incident.expectedStateId} & Restore</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
