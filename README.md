# TrustState — Zero-Trust Runtime Integrity for Autonomous AI Agents

> **"The agent can propose a state change, but it cannot unilaterally make that state trusted."**

TrustState is a runtime security control plane that cryptographically verifies the integrity and authorization of an AI agent's **Protected Execution State (PES)** before allowing consequential actions (financial transactions, database mutations, external API calls).

---

## 🚀 Live Interactive Prototype

This repository contains both the comprehensive **[PRD Specification (v2.0)](./PRD.md)** and a **fully functional, interactive React UI Prototype** demonstrating enterprise runtime integrity, prompt injection prevention, circuit breakers, and automated recovery.

### Quick Start

```bash
# 1. Start the Vite development server
npm run dev

# 2. Or preview the production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎯 What You Can Test in the Prototype

The interactive prototype includes a persistent **Interactive Control Sandbox** bar at the top:

1. **⚡ Simulate Verified Action:**
   * Agent calls a privileged API (`payment_gateway.verify_balance`).
   * The TrustState gateway verifies the cryptographic SHA-256 state hash against the authoritative record in `< 12ms`.
   * A signed, short-lived **State Lease Token** is minted and the request succeeds.

2. **🚨 Simulate Prompt Injection Attack:**
   * An adversary injects malicious instructions inside an unverified retrieved document attempting to escalate permissions to execute a wire transfer.
   * TrustState calculates the runtime SHA-256 state hash and detects a **cryptographic mismatch** (`x938e21a... != e3b0c442...`).
   * The **Zero-Trust Circuit Breaker** instantly trips: the state lease is revoked, privileged execution is frozen, and the agent is quarantined.
   * An alert notification appears directing you to the **Incident Forensics** screen.

3. **🔄 1-Click Rollback & Recover:**
   * Restores the agent to the last known safe state checkpoint ($S101$).
   * Re-certifies the SHA-256 state hash and lifts the quarantine.

4. **👥 State Transition Review (Human-in-the-Loop):**
   * Review pending candidate state mutations ($S101 \rightarrow S102$).
   * Inspect visual diffs and risk scores.
   * Approve and cryptographically sign the new state or reject and roll back.

---

## 📂 Project Structure

```text
TrustState/
├── PRD.md                  # Comprehensive Product Requirements Document (v2.0)
├── index.html              # Single Page Application entry
├── src/
│   ├── App.jsx             # Main interactive application state & simulator
│   ├── main.jsx            # React root
│   ├── index.css           # Tailwind styles & theme
│   ├── data/
│   │   └── initialState.js # Fleet agents, live action stream, & proposal specs
│   └── components/
│       ├── Navbar.jsx          # Gateway health indicators & screen tabs
│       ├── SimulationBar.jsx   # Interactive Attack & Verification Sandbox
│       ├── FleetOverview.jsx   # Screen 1: Monitored agents & live action stream
│       ├── AgentDetail.jsx     # Screen 2: 3-Tier State Taxonomy inspector (PES/LTM)
│       ├── StateTimeline.jsx   # Screen 3: Interactive DAG & visual state diff
│       ├── TransitionReview.jsx# Screen 4: Human-in-the-Loop approval console
│       └── IncidentResponse.jsx# Screen 5: Forensic hash comparison & rollback
├── tailwind.config.js      # Cybersecurity dark theme palette
└── vite.config.js          # Vite bundler configuration
```

---

## 📜 Full PRD Documentation

For complete technical architecture, sequence diagrams, the 3-Tier State Taxonomy, threat models, and PM trade-off analyses, read **[PRD.md](./PRD.md)**.
"# TrustState" 
