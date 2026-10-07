import React from 'react';
import { ShieldAlert, RotateCcw, Download, CheckCircle2, AlertOctagon, Terminal, FileCode, CheckCircle } from 'lucide-react';

export default function IncidentResponse({ incidents, onRollbackAgent }) {
  if (incidents.length === 0) {
    return (
      <div className="p-12 text-center rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
        <h3 className="text-base font-semibold text-white">No Active Security Incidents</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          All autonomous agents are operating within verified cryptographic boundaries. You can use the top control bar to simulate a prompt injection attack and observe runtime quarantine.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-rose-950/40 border border-rose-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-xl bg-rose-900/80 text-rose-200 border border-rose-700">
            <ShieldAlert className="w-6 h-6 text-rose-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white font-mono">
                Active Incident Forensics & Quarantine
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-600 text-white uppercase tracking-wider">
                SEV-1 CRITICAL
              </span>
            </div>
            <p className="text-xs text-rose-200/80 mt-1">
              Zero-Trust Circuit Breaker engaged. Consequential tool execution halted for affected agents.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-rose-900/60 text-rose-300 border border-rose-700/60 shrink-0">
          {incidents.length} Quarantined Agent(s)
        </span>
      </div>

      {/* Incident Cards */}
      <div className="space-y-6">
        {incidents.map((incident) => (
          <div key={incident.id} className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-lg">
            {/* Incident Title & Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
              <div>
                <span className="text-xs font-mono text-rose-400 font-semibold">{incident.id}</span>
                <h3 className="text-base font-bold text-white font-mono mt-0.5">
                  Target: {incident.agentName}
                </h3>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Detected: <span className="text-slate-200">{incident.detectedAt}</span>
              </div>
            </div>

            {/* Forensic Hash Comparison */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Cryptographic State Attestation Failure</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Expected Hash */}
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 uppercase font-mono">Expected State Hash (H101)</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                      AUTHORITATIVE
                    </span>
                  </div>
                  <div className="font-mono text-xs text-emerald-400 break-all bg-slate-900/60 p-2 rounded border border-slate-800">
                    {incident.expectedHash}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Baseline: State <span className="font-mono text-slate-200">{incident.expectedStateId}</span>
                  </div>
                </div>

                {/* Observed Hash */}
                <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-900/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-rose-300 uppercase font-mono">Observed State Hash (Tampered)</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-900 text-rose-200 border border-rose-700 font-mono animate-pulse">
                      INTEGRITY VIOLATION
                    </span>
                  </div>
                  <div className="font-mono text-xs text-rose-300 break-all bg-rose-950/60 p-2 rounded border border-rose-900">
                    {incident.observedHash}
                  </div>
                  <div className="text-[11px] text-rose-300/80">
                    Computed from runtime environment prior to tool call
                  </div>
                </div>
              </div>
            </div>

            {/* Attack Vector & Analysis */}
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Threat Vector Analysis
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {incident.threatAnalysis}
              </p>
              <div className="mt-2 text-xs font-mono text-amber-400 bg-amber-950/30 p-2 rounded border border-amber-900/50">
                Blocked Tool Call: <code>{incident.blockedTool}</code>
              </div>
            </div>

            {/* Automated Containment Protocol */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Automated Containment Protocol Executed
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Privileged Tool Gate: FROZEN</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>State Lease Token: REVOKED</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Agent Process: QUARANTINED</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Immutable Audit Log: WRITTEN</span>
                </div>
              </div>
            </div>

            {/* Remediation Action Controls */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
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
                className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all flex items-center justify-center space-x-1.5"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Export Forensic Evidence Bundle (JSON)</span>
              </button>

              <button
                onClick={() => onRollbackAgent(incident.agentId)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 border border-emerald-400/40 transition-all flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-4 h-4 text-emerald-100" />
                <span>Rollback to Last Safe Checkpoint ({incident.expectedStateId}) & Restore</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
