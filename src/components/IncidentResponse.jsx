import React from 'react';
import { ShieldAlert, RotateCcw, Download, CheckCircle2, CheckCircle, Terminal } from 'lucide-react';

export default function IncidentResponse({ incidents, onRollbackAgent }) {
  if (incidents.length === 0) {
    return (
      <div className="p-12 text-center rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
        <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
        <h3 className="text-sm font-semibold text-white">No Active Security Incidents</h3>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
          All autonomous agents are operating within verified cryptographic boundaries.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-lg font-semibold text-white tracking-tight">Active Incident Forensics</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Circuit breaker containment and root-cause analysis for quarantined agents.
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono w-fit">
          SEV-1 Critical Incident
        </span>
      </div>

      {/* Incident Cards */}
      <div className="space-y-4">
        {incidents.map((incident) => (
          <div key={incident.id} className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 shadow-sm space-y-5">
            {/* Top metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800/60 text-xs gap-1">
              <div>
                <span className="font-mono text-rose-400 font-semibold">{incident.id}</span>
                <span className="text-zinc-500 mx-2">|</span>
                <span className="font-mono text-white font-medium">{incident.agentName}</span>
              </div>
              <span className="text-zinc-500 text-[11px] font-mono">Detected: {incident.detectedAt}</span>
            </div>

            {/* Forensic Hash Comparison */}
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 block mb-2">
                Cryptographic State Attestation Mismatch
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Expected */}
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">Expected Hash ({incident.expectedStateId})</span>
                    <span className="text-emerald-400 font-mono text-[10px]">AUTHORITATIVE</span>
                  </div>
                  <div className="font-mono text-[11px] text-emerald-400 break-all bg-zinc-900/60 p-2 rounded border border-zinc-800">
                    {incident.expectedHash}
                  </div>
                </div>

                {/* Observed */}
                <div className="p-3 rounded-lg bg-zinc-950 border border-rose-900/40 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-rose-300">Observed Hash (Runtime)</span>
                    <span className="text-rose-400 font-mono text-[10px]">MISMATCH</span>
                  </div>
                  <div className="font-mono text-[11px] text-rose-300 break-all bg-rose-500/10 p-2 rounded border border-rose-900/60">
                    {incident.observedHash}
                  </div>
                </div>
              </div>
            </div>

            {/* Threat Vector Analysis */}
            <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1.5 text-xs">
              <span className="text-zinc-400 font-medium text-[11px] block">Threat Vector Analysis</span>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                {incident.threatAnalysis}
              </p>
              <div className="text-zinc-400 text-[11px] font-mono pt-1">
                Blocked Tool: <code className="text-rose-400">{incident.blockedTool}</code>
              </div>
            </div>

            {/* Automated Containment Protocol */}
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 block mb-2">
                Automated Containment Protocol Executed
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-zinc-950 border border-zinc-800 flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Tool Gateway: FROZEN</span>
                </div>
                <div className="p-2 rounded bg-zinc-950 border border-zinc-800 flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>State Lease: REVOKED</span>
                </div>
                <div className="p-2 rounded bg-zinc-950 border border-zinc-800 flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Process: QUARANTINED</span>
                </div>
                <div className="p-2 rounded bg-zinc-950 border border-zinc-800 flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Audit Event: PERSISTED</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
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
                className="w-full sm:w-auto px-3.5 py-2 rounded-lg font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Forensic Evidence (JSON)</span>
              </button>

              <button
                onClick={() => onRollbackAgent(incident.agentId)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rollback to {incident.expectedStateId} & Restore</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
