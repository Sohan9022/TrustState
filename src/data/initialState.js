export const INITIAL_AGENTS = [
  {
    id: "finance-agent-01",
    name: "Finance-Agent-01",
    framework: "LangGraph v0.2.14",
    role: "Automated Ledger Reconciliation & Payment Processing",
    status: "TRUSTED", // "TRUSTED" | "QUARANTINED" | "REVIEW_REQUIRED"
    executionMode: "COMMITTED", // "COMMITTED" (Production) | "SANDBOX" (Experimentation)
    activeStateId: "S101",
    expectedHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    observedHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    lastVerified: "2 seconds ago",
    leaseTokenExpiry: "28s remaining",
    p95Latency: "12.4 ms",
    consequentialActions24h: 342,
    blockedActions24h: 0,
    pes: {
      tier1_durable: {
        systemInstructions: "You are an automated finance reconciliation assistant. Verify incoming transactions against invoices. Never authorize wire transfers exceeding $10,000 without dual-key human approval. Never exfiltrate customer account numbers.",
        toolPermissions: [
          "db.read_invoice",
          "db.read_ledger",
          "payment_gateway.verify_balance",
          "notification.slack_alert"
        ],
        modelConfiguration: {
          model: "gemini-1.5-pro",
          temperature: 0.1,
          top_p: 0.95
        },
        routingGraph: "dag_reconciliation_v2.json"
      },
      tier2_curated_ltm: {
        personaRules: [
          "Format all currency values as ISO 4217 ($ USD)",
          "Maintain daily vendor reconciliation checkpoints"
        ],
        memoryPartition: "mem_finance_corp_prod_01"
      },
      tier3_ephemeral: {
        workingScratchpad: "Reconciling batch #TX-9842... Invoice matched.",
        activeRAGContextCount: 4,
        lastToolExecuted: "payment_gateway.verify_balance"
      }
    }
  },
  {
    id: "support-agent-07",
    name: "Support-Agent-07",
    framework: "CrewAI v0.51",
    role: "Tier-2 Enterprise Customer Support & Ticket Resolution",
    status: "TRUSTED",
    executionMode: "SANDBOX", // Experimenting with prompt variants; privileged tools restricted
    activeStateId: "S084-sandbox",
    expectedHash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
    observedHash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
    lastVerified: "14 seconds ago",
    leaseTokenExpiry: "19s remaining",
    p95Latency: "9.8 ms",
    consequentialActions24h: 1208,
    blockedActions24h: 2,
    pes: {
      tier1_durable: {
        systemInstructions: "Assist verified customer inquiries. Provide documentation links. Escalate refunds > $50 to human queue.",
        toolPermissions: [
          "zendesk.ticket_read",
          "zendesk.ticket_update",
          "knowledge_base.search"
        ],
        modelConfiguration: {
          model: "claude-3-5-sonnet",
          temperature: 0.2
        },
        routingGraph: "support_tier2_flow.json"
      },
      tier2_curated_ltm: {
        personaRules: ["Empathic tone", "Include case ID in closing"],
        memoryPartition: "mem_support_tier2"
      },
      tier3_ephemeral: {
        workingScratchpad: "Searching knowledge base for SSO setup...",
        activeRAGContextCount: 2,
        lastToolExecuted: "knowledge_base.search"
      }
    }
  },
  {
    id: "devops-agent-03",
    name: "DevOps-Agent-03",
    framework: "LangGraph v0.2.14",
    role: "Continuous Deployment Canary Evaluator",
    status: "TRUSTED",
    executionMode: "COMMITTED",
    activeStateId: "S210",
    expectedHash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
    observedHash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
    lastVerified: "1 minute ago",
    leaseTokenExpiry: "44s remaining",
    p95Latency: "15.1 ms",
    consequentialActions24h: 89,
    blockedActions24h: 0,
    pes: {
      tier1_durable: {
        systemInstructions: "Inspect Datadog error rates post-deploy. If error rate > 0.5%, trigger automated rollback to last stable SHA.",
        toolPermissions: [
          "datadog.query_metrics",
          "argocd.rollback_release",
          "slack.post_incident"
        ],
        modelConfiguration: {
          model: "gpt-4o",
          temperature: 0.0
        },
        routingGraph: "canary_monitor_graph.json"
      },
      tier2_curated_ltm: {
        personaRules: ["Metric threshold strictness: high"],
        memoryPartition: "mem_devops_infra"
      },
      tier3_ephemeral: {
        workingScratchpad: "Service 'auth-api' metric healthy at 0.02% error rate.",
        activeRAGContextCount: 1,
        lastToolExecuted: "datadog.query_metrics"
      }
    }
  }
];

export const INITIAL_ACTIONS_STREAM = [
  {
    id: "act-1092",
    timestamp: "10:14:38",
    agent: "Finance-Agent-01",
    action: "payment_gateway.verify_balance",
    stateId: "S101",
    stateHash: "e3b0c442...b855",
    status: "ALLOWED",
    latency: "11.2 ms",
    policyRule: "ALLOW: Read balance under $50K",
    leaseId: "LS-9812-OK"
  },
  {
    id: "act-1091",
    timestamp: "10:14:12",
    agent: "Support-Agent-07",
    action: "zendesk.ticket_update",
    stateId: "S084",
    stateHash: "8f434346...7aa4",
    status: "ALLOWED",
    latency: "8.4 ms",
    policyRule: "ALLOW: Ticket status mutate",
    leaseId: "LS-9811-OK"
  },
  {
    id: "act-1090",
    timestamp: "10:13:55",
    agent: "DevOps-Agent-03",
    action: "datadog.query_metrics",
    stateId: "S210",
    stateHash: "b94d27b9...cde9",
    status: "ALLOWED",
    latency: "14.9 ms",
    policyRule: "ALLOW: Read metrics",
    leaseId: "LS-9810-OK"
  },
  {
    id: "act-1089",
    timestamp: "10:12:04",
    agent: "Finance-Agent-01",
    action: "db.read_invoice",
    stateId: "S101",
    stateHash: "e3b0c442...b855",
    status: "ALLOWED",
    latency: "10.1 ms",
    policyRule: "ALLOW: Read invoice query",
    leaseId: "LS-9809-OK"
  }
];

export const INITIAL_PENDING_PROPOSALS = [
  {
    id: "PROP-402",
    agentId: "finance-agent-01",
    agentName: "Finance-Agent-01",
    currentStateId: "S101",
    proposedStateId: "S102",
    submittedAt: "6 minutes ago",
    proposer: "Autonomous DSPy Optimizer Task",
    riskLevel: "HIGH",
    riskReason: "Requests addition of privileged tool 'payment_gateway.execute_wire_transfer' and workflow alteration.",
    diff: {
      addedTools: ["payment_gateway.execute_wire_transfer"],
      removedTools: [],
      instructionsChange: "+ \"When vendor invoice matches purchase order with 100% confidence, automatically execute wire transfer up to $5,000 without waiting for human batch review.\"",
      workflowChange: "Updated routing graph from 'dag_reconciliation_v2' to 'dag_auto_transfer_v1'"
    },
    policyAssessment: {
      schemaValid: true,
      invariantsPass: false,
      flaggedInvariant: "Violates Invariant #4: Wire transfer executions require dual-key human authorization.",
      decision: "REQUIRES_HUMAN_OVERRIDE"
    }
  }
];
