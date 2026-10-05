import { PlacementRule, DocTemplate, OwnerContact } from '../types/docs';

export const placementRules: PlacementRule[] = [
  {
    category: 'applications',
    categoryName: 'Applications',
    icon: 'Monitor',
    primaryPurpose: 'Technical application architecture, specifications, integrations, access models, and support contacts.',
    whatBelongs: [
      'Application technical overview & tier classification (Tier 1/2/3)',
      'Architecture diagrams & network topology',
      'Integration endpoints (SAML, OIDC, SCIM, REST APIs, Webhooks)',
      'Data flows & upstream/downstream system dependencies',
      'Access models (Okta/Active Directory group mappings, approval hierarchy)',
      'Platform support contacts and vendor support tier escalation links'
    ],
    whatDoesNotBelong: [
      'Step-by-step incident handling procedures (Belongs in SOPs)',
      'Specific one-off error codes with symptom fixes (Belongs in KB)',
      'Daily operational batch job schedules or cron configs (Belongs in Operations)',
      'End-user tutorials or user guides (Belongs in User Guides)'
    ],
    singleSourceOfTruthPrinciple:
      'The Applications folder is the definitive architectural registry. When SOPs or KB articles need to reference system architecture or access groups, they MUST link back to the Application page.',
    recommendedNaming: 'docs/applications/<application-name>/index.md or <application-name>/<topic>.md',
    examplePaths: [
      'docs/applications/okta-sso/index.md',
      'docs/applications/servicenow/architecture.md',
      'docs/applications/m365/exchange-online.md',
      'docs/applications/snowflake/access-model.md'
    ]
  },
  {
    category: 'sops',
    categoryName: 'Standard Operating Procedures (SOPs)',
    icon: 'ClipboardList',
    primaryPurpose: 'Step-by-step operational workflows with explicit role ownership, prerequisites, SLAs, and verification checklists.',
    whatBelongs: [
      'Sequential, numbered procedural workflows with checkboxes',
      'Incident management protocols (P1/P2 Major Incident response)',
      'User administration workflows (Provisioning, Offboarding, VIP support)',
      'Access grant & privileged permission elevation procedures',
      'Escalation paths with explicit handover triggers and SLAs',
      'Compliance and audit evidence collection procedures'
    ],
    whatDoesNotBelong: [
      'Deep architectural theory or code repository structures (Belongs in Applications/Architecture)',
      'Single symptom/error code lookups without standard end-to-end process (Belongs in KB)',
      'Server health synthetic probe configurations (Belongs in Operations)'
    ],
    singleSourceOfTruthPrinciple:
      'SOPs define the exact standard method to execute a task. Never embed operational procedure steps inside application overviews.',
    recommendedNaming: 'docs/sops/<domain>/sop-<procedure-name>.md',
    examplePaths: [
      'docs/sops/incident-management/sop-major-incident-p1-p2.md',
      'docs/sops/user-administration/sop-employee-onboarding.md',
      'docs/sops/access-management/sop-privileged-access-request.md',
      'docs/sops/escalations/sop-vip-support.md'
    ]
  },
  {
    category: 'operations',
    categoryName: 'Operations Docs & Runbooks',
    icon: 'Cpu',
    primaryPurpose: 'Daily operations support, batch jobs, monitoring telemetry, runbooks, and platform maintenance.',
    whatBelongs: [
      'Operational runbooks for restarts, failovers, and backup validation',
      'Batch job execution schedules, cron syntax, and dependency chains',
      'Synthetic probe definitions and Datadog/Splunk alert thresholds',
      'Service health dashboards and SLA/SLO metric configurations',
      'Maintenance window schedules and change freeze procedures'
    ],
    whatDoesNotBelong: [
      'Standard end-user access approval workflows (Belongs in SOPs)',
      'One-off error fixes and troubleshooting articles (Belongs in KB)',
      'General documentation authoring guidelines (Belongs in Architecture)'
    ],
    singleSourceOfTruthPrinciple:
      'Operations documentation tracks live platform maintenance and telemetry. Runbooks should focus purely on system execution commands.',
    recommendedNaming: 'docs/operations/<type>/<system>-runbook.md',
    examplePaths: [
      'docs/operations/batch-jobs/nightly-identity-sync.md',
      'docs/operations/monitoring/service-health-dashboards.md',
      'docs/operations/runbooks/okta-ad-agent-restart.md',
      'docs/operations/schedules/quarterly-patch-cycle.md'
    ]
  },
  {
    category: 'kb',
    categoryName: 'Knowledge Base (KB) & Troubleshooting',
    icon: 'Search',
    primaryPurpose: 'Rapid symptom-to-solution diagnostic lookups, error codes, common fixes, FAQs, and diagnostic tools.',
    whatBelongs: [
      'Specific error messages (e.g. HTTP 502, SAML Error 400, Posture Stale)',
      'Diagnostic flowcharts and CLI verification commands',
      'Common symptoms with rapid 3-step remediations',
      'Diagnostic scripts and tool usage guides',
      'Frequently Asked Questions (FAQs) for technicians'
    ],
    whatDoesNotBelong: [
      'End-to-end formal operational procedures with audit requirements (Belongs in SOPs)',
      'Complete application architecture specifications (Belongs in Applications)'
    ],
    singleSourceOfTruthPrinciple:
      'KB articles are atomic, fast-lookup solution cards. When an error resolution requires executing a full SOP, link directly to that SOP.',
    recommendedNaming: 'docs/kb/troubleshooting/kb-<error-code-or-symptom>.md',
    examplePaths: [
      'docs/kb/troubleshooting/kb-502-bad-gateway.md',
      'docs/kb/troubleshooting/kb-vpn-handshake-error.md',
      'docs/kb/common-errors/kb-outlook-disconnected.md',
      'docs/kb/faq/faq-passwordless-fido2.md'
    ]
  },
  {
    category: 'user-guides',
    categoryName: 'User Guides & Training',
    icon: 'BookOpen',
    primaryPurpose: 'Self-service materials, how-to articles, and quick-start guides written in non-technical language for company employees.',
    whatBelongs: [
      'Quick-start guides for standard employee tools (Zoom, Slack, M365)',
      'Step-by-step self-service how-to articles with UI screenshots',
      'Hardware setup instructions (macOS / Windows initial setup)',
      'Video walkthrough transcripts and reference cheat sheets'
    ],
    whatDoesNotBelong: [
      'Internal IT technician escalation commands (Belongs in SOPs/KB)',
      'Backend infrastructure topology diagrams (Belongs in Applications)'
    ],
    singleSourceOfTruthPrinciple:
      'User Guides are customer-facing (read-only for all employees). They contain zero administrative credentials or internal ITSD escalation notes.',
    recommendedNaming: 'docs/user-guides/<topic>/guide-<subject>.md',
    examplePaths: [
      'docs/user-guides/workplace/guide-setting-up-okta-fastpass.md',
      'docs/user-guides/hardware/guide-dual-monitor-dock-setup.md',
      'docs/user-guides/communication/guide-slack-enterprise-basics.md'
    ]
  },
  {
    category: 'architecture',
    categoryName: 'Architecture, Standards & ADRs',
    icon: 'Layers',
    primaryPurpose: 'Governance, documentation standards, Architectural Decision Records (ADRs), naming conventions, and templates.',
    whatBelongs: [
      'Architectural Decision Records (ADRs) with context, options, and rationale',
      'Documentation quality standards and Markdown authoring conventions',
      'Tagging taxonomy and metadata frontmatter specifications',
      'Standard document templates (Applications, SOPs, Runbooks, KB)',
      'Security baseline standards and diagramming notation rules'
    ],
    whatDoesNotBelong: [
      'Specific application runtime configurations (Belongs in Applications)',
      'Routine ticket triage steps (Belongs in SOPs)'
    ],
    singleSourceOfTruthPrinciple:
      'Architecture & Standards govern the documentation portal itself and set enterprise-wide technical policies.',
    recommendedNaming: 'docs/architecture/<type>/adr-###-<slug>.md or standards/<topic>.md',
    examplePaths: [
      'docs/architecture/standards/content-placement-rules.md',
      'docs/architecture/adr/adr-004-material-for-mkdocs.md',
      'docs/architecture/standards/tagging-taxonomy.md',
      'docs/architecture/templates/sop-template.md'
    ]
  },
  {
    category: 'onboarding',
    categoryName: 'New Hire Hub',
    icon: 'GraduationCap',
    primaryPurpose: 'Accelerate onboarding for incoming IT Service Desk technicians, apprentices, and engineers.',
    whatBelongs: [
      'First 30 Days onboarding learning roadmap',
      'Core tool access checklist and sandbox account setup',
      'Curated list of Essential SOPs every new hire must master',
      'Mentorship pairing guides, shadow schedules, and glossary of terms'
    ],
    whatDoesNotBelong: [
      'Full technical specs duplicated from the Applications directory (Link to them instead)'
    ],
    singleSourceOfTruthPrinciple:
      'The New Hire Hub acts as a curated gateway that links directly into the canonical SOPs and Application docs, preventing duplicate training text.',
    recommendedNaming: 'docs/onboarding/<track>/<phase>.md',
    examplePaths: [
      'docs/onboarding/first-30-days.md',
      'docs/onboarding/essential-sops.md',
      'docs/onboarding/sandbox-environments.md',
      'docs/onboarding/glossary.md'
    ]
  }
];

export const docTemplates: DocTemplate[] = [
  {
    id: 'tpl-app-spec',
    title: 'Application Technical Spec Template',
    category: 'applications',
    description: 'Standard template for documenting enterprise applications, architecture, data flows, and support contacts.',
    targetFileName: 'docs/applications/{app-name}/index.md',
    markdownContent: `---
title: "{Application Name} Technical Specification"
description: "Architecture, integrations, data flows, access models, and support escalation paths for {Application Name}."
category: "applications"
subcategory: "{Subcategory, e.g., Identity, ERP, Collaboration}"
owner: "{Team Name, e.g., Identity & SecOps Team}"
owner_role: "{Role Name, e.g., Principal System Architect}"
last_updated: "2026-10-05"
review_cadence: "Quarterly"
estimated_read_time: "6 min read"
tier: "Tier 1"
tags:
  - {app-name}
  - Architecture
  - Tier1
  - SAML
  - Integration
---

# {Application Name} Technical Specification

!!! info "Single Source of Truth"
    This document is the authoritative reference for {Application Name} system architecture, integrations, and access models. For standard operational procedures, refer to [SOP: {Related SOP}](../../sops/{domain}/index.md).

## 1. System Overview & Purpose
Brief description (1-2 paragraphs) detailing what {Application Name} does, the primary business value, total active user base, and critical uptime tier.

## 2. Architecture & Data Flow Diagram

\`\`\`
+------------------+         Sync Protocol         +----------------------+
|  Upstream System | ----------------------------> |  {Application Name}  |
| (e.g. Workday)   |                               |     (Cloud / SaaS)   |
+------------------+                               +----------------------+
                                                              |
                                                              v
                                                   +----------------------+
                                                   |   Downstream System  |
                                                   | (e.g. Active Direct) |
                                                   +----------------------+
\`\`\`

## 3. Integration Endpoints & Protocols

| Integration Name | Protocol | Endpoint URL / Path | Auth Method |
| :--- | :--- | :--- | :--- |
| **SSO Authentication** | SAML 2.0 / OIDC | \`https://{app}.corp.com/saml/sso\` | Okta IdP Cert |
| **User Provisioning** | SCIM 2.0 REST | \`https://{app}.corp.com/scim/v2\` | OAuth 2.0 Bearer |
| **Audit Log Stream** | Webhook / Syslog | \`https://splunk-hec.corp.internal:8088\` | Token Auth |

## 4. Access Model & Group Governance

| Group Name | Purpose | Provisioning Type | Approval Required |
| :--- | :--- | :--- | :--- |
| \`grp_app_{name}_users\` | Standard user access | Automated (Workday) | None (Role-Based) |
| \`grp_app_{name}_admins\` | Administrative console | SailPoint Request | Manager + App Owner |

## 5. Key Dependencies & Resiliency
- **Upstream Dependencies**: Okta SSO, Cloudflare ZTNA, AWS VPC.
- **RPO / RTO**: RPO = 15 minutes, RTO = 1 hour.
- **Backup Verification**: Automated daily snapshots verified every 7 days.

## 6. Support Contacts & Escalation
- **Primary Support Team**: {Team Name} (\`#{slack-channel}\`)
- **Secondary On-Call**: PagerDuty Schedule \`{schedule-name}\`
- **Vendor Support Tier**: {Vendor Platinum Tier / Account #}
`
  },
  {
    id: 'tpl-sop',
    title: 'Standard Operating Procedure (SOP) Template',
    category: 'sops',
    description: 'Numbered procedural template with prerequisites, execution steps, verification checklist, and escalation triggers.',
    targetFileName: 'docs/sops/{domain}/sop-{procedure-name}.md',
    markdownContent: `---
title: "SOP: {Procedure Name}"
description: "Step-by-step operational standard procedure for {action}."
category: "sops"
subcategory: "{Incident Management | Access | User Admin | Escalations}"
owner: "{Team Name}"
owner_role: "{Role Title}"
last_updated: "2026-10-05"
review_cadence: "Quarterly"
estimated_read_time: "5 min read"
tier: "Tier 2"
tags:
  - SOP
  - {domain}
  - Procedure
prerequisites:
  - "Valid ITSD Technician credentials"
  - "Access to {Required Tool / Admin Console}"
---

# SOP: {Procedure Name}

!!! note "Operational Objective"
    This SOP provides the mandatory standard procedure for executing {task}. Adherence ensures audit compliance and consistent resolution quality.

## Prerequisites & Access Requirements
Before executing this SOP, confirm you have:
1. Active administrative access to **{Console Name}**.
2. Ticket approval in ServiceNow from the designated approver.

## Role Responsibilities

| Role | Assigned Individual | Responsibility |
| :--- | :--- | :--- |
| **Primary Executor** | On-Duty ITSD Technician | Executes steps 1 through 4 |
| **Peer Reviewer** | Shift Lead / Mentor | Validates verification checklist |

## Step-by-Step Execution Protocol

### Step 1: Verification & Pre-Checks
- [ ] Verify requester identity and ticket authorization.
- [ ] Confirm target user / asset state using:
\`\`\`bash
# Run pre-check diagnostic
itsd-tool verify --target "{target_id}"
\`\`\`

### Step 2: Main Action Execution
1. Navigate to **{Console Name} > {Section}**.
2. Locate the record for \`{target_id}\`.
3. Apply the required configuration parameter:
\`\`\`bash
# Command execution snippet if applicable
itsd-tool apply --config "{config_name}" --target "{target_id}"
\`\`\`

### Step 3: Post-Execution Verification
- [ ] Test connectivity or account status.
- [ ] Confirm logs show \`STATUS_OK: 200\`.
- [ ] Verify audit trail entry was generated.

### Step 4: Ticket Closure & Customer Notification
Close ticket in ServiceNow with resolution code **Solved (Permanently)** and notify the requester.

## Escalation Triggers
If any of the following occur, escalate immediately to **{Escalation Team}**:
- Command fails with error \`ERR_AUTH_REVOKED\`.
- Target system unresponsive for $> 5$ minutes.
`
  },
  {
    id: 'tpl-runbook',
    title: 'Operations Runbook Template',
    category: 'operations',
    description: 'System maintenance, restart procedures, cron batch job triggers, and telemetry alerts.',
    targetFileName: 'docs/operations/{type}/{system}-runbook.md',
    markdownContent: `---
title: "Runbook: {System / Service Name}"
description: "Operational runbook for maintenance, restarts, batch monitoring, and incident triage for {System Name}."
category: "operations"
subcategory: "Runbooks"
owner: "Platform Operations (PlatOps)"
owner_role: "Site Reliability Engineer"
last_updated: "2026-10-05"
review_cadence: "Monthly"
estimated_read_time: "5 min read"
tags:
  - Runbook
  - Operations
  - Maintenance
---

# Runbook: {System / Service Name}

## 1. System Vital Signs & Telemetry Dashboards
- **Datadog Dashboard**: \`https://app.datadoghq.com/dashboard/{dash-id}\`
- **Synthetic Health Endpoint**: \`https://{system}.corp.internal/healthz\`
- **Log Aggregator**: Splunk Index \`idx_{system}_prod\`

## 2. Common Operations & Commands

### Graceful Service Restart
\`\`\`bash
# 1. Drain active traffic from worker nodes
itsd-ops drain --service {system-name} --cluster prod-us-east-1

# 2. Execute rolling restart
kubectl rollout restart deployment/{system-name} -n core-services

# 3. Watch rollout status
kubectl rollout status deployment/{system-name} -n core-services --timeout=120s
\`\`\`

## 3. Failure Signatures & Triage
| Symptom / Alert | Likely Cause | Immediate Action |
| :--- | :--- | :--- |
| **High Memory OOMKilled** | Leaked cache buffer | Scale replicas to $N+2$ and flush Redis cache |
| **DB Connection Starvation** | Stuck transaction | Kill idle queries $> 60\\text{s}$ |
`
  },
  {
    id: 'tpl-kb',
    title: 'Knowledge Base (KB) Incident / Error Fix Template',
    category: 'kb',
    description: 'Fast symptom-to-solution diagnostic card for specific error codes, symptoms, and diagnostic scripts.',
    targetFileName: 'docs/kb/troubleshooting/kb-{error-code-or-symptom}.md',
    markdownContent: `---
title: "KB: Resolving {Error Code or Symptom}"
description: "Diagnosis and step-by-step fix for {Error Code or Symptom}."
category: "kb"
subcategory: "Troubleshooting"
owner: "Tier 2 ITSD Escalations"
owner_role: "Senior Support Specialist"
last_updated: "2026-10-05"
review_cadence: "Quarterly"
estimated_read_time: "3 min read"
tags:
  - KB
  - Troubleshooting
  - {ErrorCode}
---

# KB: Resolving {Error Code or Symptom}

## Symptoms
Describe what the user sees, including verbatim error messages, pop-up text, or system behavior.

\`\`\`
Error Text: "{Exact Error Message String}"
Error Code: {ERR_CODE_EXAMPLE}
\`\`\`

## Diagnostic Verification
Run this command to confirm whether the root cause matches this KB:
\`\`\`bash
# Diagnostic command
itsd-diagnose --test {test-name}
\`\`\`

## Resolution Steps
1. Perform action item 1.
2. Update local client cache or flush DNS:
\`\`\`bash
ipconfig /flushdns
\`\`\`
3. Verify the user is able to reconnect.

## Related Articles
- [SOP: User Administration](../../sops/user-administration/index.md)
- [Application: Okta SSO](../../applications/okta-sso/index.md)
`
  },
  {
    id: 'tpl-adr',
    title: 'Architecture Decision Record (ADR) Template',
    category: 'architecture',
    description: 'Record architectural and technical decisions, tradeoffs, context, and consequences.',
    targetFileName: 'docs/architecture/adr/adr-{number}-{decision-title}.md',
    markdownContent: `---
title: "ADR-{Number}: {Decision Title}"
description: "Architectural Decision Record regarding {topic}."
category: "architecture"
subcategory: "Architecture Decision Records (ADRs)"
owner: "Enterprise Architecture Board"
owner_role: "Principal Architect"
last_updated: "2026-10-05"
review_cadence: "Permanent"
tags:
  - ADR
  - Architecture
  - Governance
---

# ADR-{Number}: {Decision Title}

## Status
**Accepted** | Proposed | Deprecated | Superseded by [ADR-XXX]

## Context & Problem Statement
Describe the technical context, challenges, user pain points, and why a formal architectural decision is required.

## Considered Options
1. **Option 1**: {Description of Option 1} (Pros / Cons)
2. **Option 2**: {Description of Option 2} (Pros / Cons)
3. **Option 3**: {Description of Option 3} (Pros / Cons)

## Decision Outcome
Chosen Option: **{Option Name}**, because {reasons}.

### Positive Consequences
- Benefit 1
- Benefit 2

### Negative Consequences / Trade-offs
- Trade-off 1 (mitigation strategy)
`
  }
];

export const mockOwnerContacts: OwnerContact[] = [
  {
    name: 'Sarah Chen',
    role: 'Principal IAM Architect',
    team: 'Identity & SecOps',
    email: 'sarah.chen@company.internal',
    slackChannel: '#team-iam-escalations',
    ownedCategories: ['Applications (Okta, Azure AD, SailPoint)', 'SOPs (Access Management)'],
    docCount: 38,
    lastReviewDate: '2026-09-28'
  },
  {
    name: 'Marcus Vance',
    role: 'ServiceNow Platform Lead',
    team: 'ITSM Engineering',
    email: 'marcus.vance@company.internal',
    slackChannel: '#itsm-platform',
    ownedCategories: ['Applications (ServiceNow, Jira)', 'SOPs (Incident Management)'],
    docCount: 52,
    lastReviewDate: '2026-10-01'
  },
  {
    name: 'Elena Rostova',
    role: 'Lead Observability & SRE',
    team: 'Platform Operations',
    email: 'elena.rostova@company.internal',
    slackChannel: '#alerts-platops',
    ownedCategories: ['Operations (Monitoring, Batch Jobs, Runbooks)'],
    docCount: 44,
    lastReviewDate: '2026-10-03'
  },
  {
    name: 'David K. O’Connor',
    role: 'ITSD Operations Supervisor',
    team: 'IT Client Services',
    email: 'david.oconnor@company.internal',
    slackChannel: '#itsd-team',
    ownedCategories: ['SOPs (User Admin, Escalations)', 'KB (Troubleshooting)'],
    docCount: 67,
    lastReviewDate: '2026-09-25'
  },
  {
    name: 'Amina Al-Mansoor',
    role: 'IT Training & Enablement Lead',
    team: 'Talent & Enablement',
    email: 'amina.almansoor@company.internal',
    slackChannel: '#itsd-training',
    ownedCategories: ['New Hire Hub', 'User Guides'],
    docCount: 29,
    lastReviewDate: '2026-10-04'
  }
];

export const mkdocsYmlContent = `site_name: ITSD DocPortal
site_description: Single Source of Truth for Enterprise IT Service Desk Documentation
site_author: Enterprise IT Service Desk Guild
site_url: https://docs.itsd.company.internal/

repo_name: itsd/documentation-portal
repo_url: https://gitlab.company.internal/itsd/documentation-portal
edit_uri: edit/main/docs/

theme:
  name: material
  custom_dir: overrides
  language: en
  palette:
    # Scheme mode: Progressive Blue & White default
    - scheme: default
      primary: blue
      accent: light blue
      toggle:
        icon: material/weather-sunny
        name: Switch to dark mode
    - scheme: slate
      primary: blue
      accent: light blue
      toggle:
        icon: material/weather-night
        name: Switch to light mode
  font:
    text: Plus Jakarta Sans
    code: JetBrains Mono
  features:
    - navigation.instant           # SPA instant loading
    - navigation.instant.prefetch  # Link prefetching for zero latency
    - navigation.tracking          # URL anchor updates on scroll
    - navigation.tabs              # Top navigation tabs for 5 primary pillars
    - navigation.tabs.sticky       # Keep tabs visible when scrolling
    - navigation.sections          # Clean sidebar grouping
    - navigation.expand            # Auto-expand active tree
    - navigation.top               # Back to top button
    - navigation.indexes           # Index page support for directory links
    - search.suggest               # Instant search query suggestions
    - search.highlight             # Highlight query keywords in body
    - search.share                 # Shareable deep-linked search URLs
    - content.code.copy            # 1-click clipboard copy on code blocks
    - content.code.annotate        # Line number annotations and callouts
    - content.tabs.link            # Synchronize language/OS tab selectors
    - content.tooltips             # Admonition tooltips
    - header.autohide              # Hide header on downward mobile scroll

plugins:
  - search:
      lang: en
      separator: '[\\s\\-\\.]+'
      min_search_length: 2
  - tags:
      tags_file: architecture/standards/tags-index.md
  - git-revision-date-localized:
      type: timeago
      fallback_to_build_date: false
  - git-authors:
      show_email: false
      show_contribution: true
  - minify:
      minify_html: true

markdown_extensions:
  - abbr
  - admonition
  - attr_list
  - def_list
  - footnotes
  - md_in_html
  - toc:
      permalink: true
      toc_depth: 3
  - pymdownx.arithmatex:
      generic: true
  - pymdownx.betterem:
      smart_enable: all
  - pymdownx.caret
  - pymdownx.details
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
  - pymdownx.highlight:
      anchor_linenums: true
      line_nums: true
      use_pygments: true
      pygments_lang_class: true
  - pymdownx.inlinehilite
  - pymdownx.keys
  - pymdownx.magiclink:
      repo_url_shorthand: true
  - pymdownx.mark
  - pymdownx.smartsymbols
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.tasklists:
      custom_checkbox: true
  - pymdownx.tilde

# Top-Level Navigation Hierarchy (5 Primary Pillars + Standards)
nav:
  - Home: index.md
  - Applications:
      - Overview: applications/index.md
      - Identity & Access:
          - Okta SSO & Federation: applications/okta-sso/index.md
          - Active Directory & GPO: applications/active-directory/index.md
          - SailPoint IdentityNow: applications/sailpoint/index.md
      - Core ITSM & Infrastructure:
          - ServiceNow Core: applications/servicenow/index.md
          - Jira & Confluence: applications/atlassian/index.md
          - AWS IAM Identity Center: applications/aws-iam/index.md
      - Productivity:
          - Microsoft 365 & Exchange: applications/m365/exchange-teams.md
          - Google Workspace: applications/google-workspace/index.md
      - Application Templates: applications/templates/app-spec-template.md
  - SOPs:
      - SOP Overview: sops/index.md
      - Incident Management:
          - P1/P2 Major Incident Response: sops/incident-management/sop-major-incident-p1-p2.md
          - Security Incident Escalation: sops/incident-management/sop-security-incident.md
      - User Administration:
          - Employee Lifecycle (Joiner/Mover/Leaver): sops/user-administration/sop-employee-lifecycle.md
          - VIP & Executive Support: sops/escalations/sop-vip-support.md
      - Access Requests:
          - Privileged Access & PAM: sops/access-management/sop-privileged-access.md
      - SOP Template: sops/templates/sop-template.md
  - Operations:
      - Operations Overview: operations/index.md
      - Runbooks:
          - Nightly Identity & Asset Batch Jobs: operations/batch-jobs/nightly-identity-sync.md
          - Okta AD Agent Failover: operations/runbooks/okta-agent-failover.md
      - Monitoring & Health:
          - Service Health & Synthetic Telemetry: operations/monitoring/service-health-dashboards.md
      - Schedules & Freezes: operations/schedules/change-freeze-windows.md
  - Knowledge Base:
      - KB Overview: kb/index.md
      - Troubleshooting:
          - HTTP 502 Bad Gateway: kb/troubleshooting/kb-502-bad-gateway.md
          - Zero-Trust VPN Handshake Failure: kb/troubleshooting/kb-vpn-handshake-error.md
          - Outlook Disconnected & Auth Loops: kb/troubleshooting/kb-outlook-auth-loop.md
      - Common Errors Dictionary: kb/common-errors/error-code-directory.md
      - Diagnostic Tools: kb/tools/cli-diagnostic-toolkit.md
  - New Hire Hub:
      - Overview: onboarding/index.md
      - First 30 Days Pathway: onboarding/first-30-days.md
      - Essential SOPs for New Techs: onboarding/essential-sops.md
      - Sandbox Environments & Tooling: onboarding/sandbox-environments.md
      - ITSD Glossary: onboarding/glossary.md
  - Architecture & Standards:
      - Overview: architecture/index.md
      - Standards & Governance:
          - Content Placement Rules: architecture/standards/content-placement-rules.md
          - Tagging & Metadata Taxonomy: architecture/standards/tagging-taxonomy.md
          - Document Review & RACI Cadence: architecture/standards/review-cadence.md
      - Architecture Decision Records (ADRs):
          - ADR-004: Material for MkDocs Portal: architecture/adr/adr-004-material-for-mkdocs.md
          - ADR-003: Passwordless FIDO2 Rollout: architecture/adr/adr-003-passwordless-fido2.md
      - Template Library: architecture/templates/index.md

extra:
  social:
    - icon: fontawesome/brands/gitlab
      link: https://gitlab.company.internal/itsd
    - icon: fontawesome/brands/slack
      link: https://company.slack.com/archives/C0123456789
  version:
    provider: mike
  analytics:
    provider: custom
`;
