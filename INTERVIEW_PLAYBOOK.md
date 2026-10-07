# TrustState — Technical PM Interview Playbook & Defensibility Guide

This companion guide contains high-impact talking points, elevator pitches, and defense strategies for technical interviews when presenting **TrustState**.

---

## 1. The 30-Second Elevator Pitch

> *"Traditional access control answers: 'Is this agent allowed to call this API?' But in autonomous agents that retain memory, ingest untrusted context, and dynamically select tools, that's not enough. You must also ask: **'Is the agent still operating under the authorized, untampered state under which that permission was granted?'**"*
>
> *"TrustState is a zero-trust runtime control plane that separates state proposal from state authorization. The agent can propose changes, but only TrustState cryptographically commits trusted state and gatekeeps privileged execution."*

---

## 2. Anticipated Interview Probes & Airtight Answers

### Probe 1: *"Why won't traditional API gateways (Kong, Apigee, Cloudflare) just build this?"*
**Answer:**
Traditional API gateways operate at Layer 7 HTTP inspection. They evaluate static headers, route paths, and bearer tokens. They have zero visibility into:
1. The agent's internal system prompt or policy invariants.
2. Conversational context drift or memory poisoning over multi-turn interactions.
3. Dynamic routing state machines (e.g., LangGraph checkpoints).

TrustState is not an HTTP gateway; it is an **agent-aware execution integrity control plane** that binds agent state identity to tool capability leases.

---

### Probe 2: *"Why not just put guardrails inside LangChain or LlamaIndex?"*
**Answer:**
Putting the root of trust inside the agent runtime violates the fundamental security principle of **Separation of Duties**:
* The LLM runtime runs user-space, untrusted code. If an attacker achieves code execution (e.g., via `eval()`, Python tool output, or indirect prompt injection), in-process guardrails can be monkey-patched or bypassed.
* TrustState enforces an isolated network boundary: privileged tools reject any request that does not pass through the TrustState inline proxy with a valid cryptographic lease token.

---

### Probe 3: *"Doesn't hashing state break every time the agent chats or retrieves documents?"*
**Answer:**
We designed a **3-Tier State Taxonomy** to eliminate this exact failure mode:
* **Tier 1 (Protected Execution State):** Durable governance (instructions, model configs, tool bindings, DAG routing). This is hashed via SHA-256. Drift triggers quarantine.
* **Tier 2 (Curated Long-Term Memory):** Gated through the Sandbox $\rightarrow$ Commit pipeline.
* **Tier 3 (Ephemeral Context):** Chat turns and RAG chunks. These do *not* mutate the Tier 1 hash. Gateway-level parameter invariants govern tool calls during runtime execution.

---

### Probe 4: *"Won't this introduce massive latency for interactive agents?"*
**Answer:**
We architected a dual-layer verification model:
* **Local In-Memory Cache (Redis Sidecar):** Validates the state hash and mints ephemeral lease tokens in **< 15ms** (P95 SLA < 25ms).
* **Central Authoritative Store (PostgreSQL):** Asynchronously persists append-only audit ledgers and syncs policy revocations without blocking the critical path.
