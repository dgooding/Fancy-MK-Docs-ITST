import { DocItem } from '../types/docs';

export const mockDocs: DocItem[] = [
  // ==========================================
  // APPLICATIONS
  // ==========================================
  {
    id: 'app-okta-sso',
    slug: 'applications/okta-sso/architecture-and-support',
    title: 'Okta SSO & Identity Federation',
    category: 'applications',
    subcategory: 'Identity & Access',
    folderPath: 'docs/applications/okta-sso/index.md',
    description: 'Architecture, SAML 2.0 / OIDC integrations, conditional access policies, user lifecycle management, and troubleshooting playbooks.',
    owner: 'Identity & SecOps Team',
    ownerRole: 'Principal IAM Architect',
    lastUpdated: '2026-09-28',
    reviewCadence: 'Quarterly (90 Days)',
    estimatedReadTime: '8 min read',
    tier: 'Tier 1',
    popular: true,
    featured: true,
    tags: ['IAM', 'SSO', 'SAML', 'OIDC', 'MFA', 'FastPass', 'Okta', 'Security'],
    prerequisites: ['Active Directory Admin Privileges', 'Okta Org Master Admin'],
    content: `# Okta SSO & Identity Federation

!!! info "Single Source of Truth Notice"
    This document is the authoritative reference for enterprise Okta SSO configurations, SCIM provisioning mappings, and token lifecycle SLAs. For step-by-step password resets or user offboarding, refer to [SOP: User Administration](../sops/user-administration).

## Overview
Okta serves as the central Identity Provider (IdP) for all corporate SaaS and internal systems, handling authentication for **28,000+ active enterprise identities** across corporate, contractor, and service account tiers.

### System Architecture & Data Flow

\`\`\`
+------------------+         Sync (LDAP/Graph)         +----------------------+
| Active Directory | --------------------------------> | Okta Universal Dir   |
|   (On-Premises)  |                                   |  (Cloud Master IdP)  |
+------------------+                                   +----------------------+
                                                                   |
                                    +------------------------------+------------------------------+
                                    |                              |                              |
                             SAML 2.0 Assertion             OIDC / JWT Bearer              SCIM 2.0 API
                                    v                              v                              v
                           +------------------+           +------------------+           +------------------+
                           |  ServiceNow ITSM |           | AWS IAM Identity |           | Google Workspace |
                           |  (Tier 1 Core)   |           |  (Cloud Infra)   |           | (Productivity)   |
                           +------------------+           +------------------+           +------------------+
\`\`\`

## Access Models & Group Governance

| Group Name Pattern | Purpose | Provisioning Mechanism | Approval Required |
| :--- | :--- | :--- | :--- |
| \`grp_app_<appname>_users\` | Standard end-user access | Automated via Workday Role | Manager Auto-Approval |
| \`grp_app_<appname>_admins\` | Administrative console access | SailPoint IdentityNow Request | SecOps + App Owner |
| \`grp_sec_mfa_exempt\` | Break-glass emergency bypass | Temporary 4-hour elevation | VP Infrastructure |

## Conditional Access Policies

!!! warning "Strict Zero-Trust Requirement"
    All authentications from non-managed endpoints (devices lacking CrowdStrike Falcon sensor or Intune compliance certificates) are strictly routed to **Step-Up FastPass + WebAuthn FIDO2** verification or denied.

1. **Managed Corporate Laptop**: Silent certificate challenge + Okta FastPass (biometric).
2. **BYOD / Mobile Web**: Okta Verify Push with Number Matching required.
3. **High-Risk Network / Untrusted ASN**: Blocked by default. Must route through Cloudflare ZTNA WARP client.

## Common Troubleshooting & Known Errors

### 1. Error 400: SAML Response Mismatch
- **Cause**: User's Primary \`mail\` attribute in Active Directory does not match the \`userPrincipalName\` in Okta profile.
- **Diagnostic Command**:
\`\`\`bash
# Run via ITSD PowerShell Diagnostic Module
Test-OktaUserSync -UserPrincipalName "d.gooding@company.com" -Verbose
\`\`\`
- **Resolution**:
  1. Trigger delta AD Agent synchronization.
  2. Verify Okta Profile Editor mapping rule: \`user.email == source.userPrincipalName\`.

### 2. FastPass Certificate Revocation False Positive
- **Cause**: Local macOS Keychain certificate expired or Intune device status out-of-sync.
- **Immediate Fix**: Run local terminal remediation script \`itsd-repair-okta-cert.sh\`.

## Support Escalations & Contacts
- **Primary Slack Channel**: \`#team-iam-escalations\`
- **Secondary On-Call**: Tier 3 Infrastructure On-Call (PagerDuty: \`ITSD-IAM-PRIMARY\`)
- **Vendor Support Tier**: Okta Platinum Premier Support Case Portal`
  },
  {
    id: 'app-servicenow-core',
    slug: 'applications/servicenow/architecture-and-specs',
    title: 'ServiceNow ITSM & ITAM Architecture',
    category: 'applications',
    subcategory: 'ITSM Core',
    folderPath: 'docs/applications/servicenow/index.md',
    description: 'Configuration Management Database (CMDB), Incident/Change workflows, mid-server architecture, and REST API integration endpoints.',
    owner: 'ITSM Platform Engineering',
    ownerRole: 'ServiceNow Platform Lead',
    lastUpdated: '2026-10-01',
    reviewCadence: 'Monthly',
    estimatedReadTime: '6 min read',
    tier: 'Tier 1',
    popular: true,
    tags: ['ServiceNow', 'ITSM', 'CMDB', 'Change Management', 'Incident', 'REST API'],
    content: `# ServiceNow ITSM & ITAM Architecture

!!! note "Core Platform Role"
    ServiceNow is the system of record for all tickets, changes, configuration items (CIs), and automated asset assignments across the enterprise.

## Platform Topology

\`\`\`
[ User Browser / Portal ] <---> [ Cloudflare WAF / CDN ]
                                          |
                                          v
                              [ ServiceNow Production Node ]
                                     (Instance: prod.service-now.com)
                                          |
                        +-----------------+-----------------+
                        |                                   |
                        v                                   v
             [ Internal MID Server Cluster ]       [ External REST Integrations ]
             - Subnet: 10.240.12.0/24               - Jira Cloud Webhooks
             - Discovery & AD Sync                  - Slack Notifications Bot
             - SCCM Hardware Scans                  - PagerDuty On-Call Sync
\`\`\`

## Key Integration Endpoints

| Service | Protocol | Endpoint Path | Authentication |
| :--- | :--- | :--- | :--- |
| **PagerDuty Sync** | REST / Webhook | \`/api/now/table/incident\` | OAuth 2.0 Token Bearer |
| **Jira Cloud Bridge** | Two-way REST | \`/api/x_corp_jira_int/issue_sync\` | Mutual TLS + API Key |
| **CMDB Auto-Discovery** | SNMP / WMI | MID Server Pool 01-04 | Service Account \`svc_snow_mid\` |

## Support Contacts
- **Team**: ITSM Operations (\`#itsm-platform\`)
- **Escalation SLA**: 15 minutes for P1 outage, 1 business day for catalog changes.`
  },
  {
    id: 'app-m365-exchange',
    slug: 'applications/m365/exchange-teams-spec',
    title: 'Microsoft 365: Exchange Online & Teams',
    category: 'applications',
    subcategory: 'Productivity & Collaboration',
    folderPath: 'docs/applications/m365/exchange-teams.md',
    description: 'Mail routing connectors, shared mailbox policies, Microsoft Teams voice gateways, DLP retention rules, and Exchange PowerShell runbooks.',
    owner: 'Collaboration Systems Team',
    ownerRole: 'Senior M365 Systems Engineer',
    lastUpdated: '2026-09-15',
    reviewCadence: 'Quarterly',
    estimatedReadTime: '7 min read',
    tier: 'Tier 1',
    tags: ['M365', 'Exchange', 'Teams', 'DLP', 'Shared Mailbox', 'PowerShell'],
    content: `# Microsoft 365: Exchange Online & Teams

## Architecture & Mail Flow
All inbound mail routes through Proofpoint Targeted Attack Protection (TAP) before reaching Exchange Online MX records.

\`\`\`
[ Sender ] --> [ Proofpoint MX: mx1.corp.pphosted.com ] --> [ Exchange Online EOP ] --> [ User Inbox ]
\`\`\`

## Shared Mailbox Governance
1. Mailboxes under 50 GB do not require an active license.
2. Auto-mapping is enabled by default via \`Add-MailboxPermission -AccessRights FullAccess\`.
3. Send-As rights must be explicitly granted by the mailbox custodian.

## Diagnostic PowerShell Commands
\`\`\`powershell
# Check transport rule matches on quarantine
Get-MessageTrace -RecipientAddress "vip.executive@company.com" -StartDate (Get-Date).AddDays(-1)
\`\`\``
  },

  // ==========================================
  // SOPS
  // ==========================================
  {
    id: 'sop-major-incident',
    slug: 'sops/incident-management/major-incident-p1-p2',
    title: 'SOP: P1 & P2 Major Incident Response',
    category: 'sops',
    subcategory: 'Incident Management',
    folderPath: 'docs/sops/incident-management/sop-major-incident-p1-p2.md',
    description: 'Standard operational protocol for declaring, mobilizing, communicating, and resolving Priority 1 (Outage) and Priority 2 (Severe Degradation) incidents.',
    owner: 'IT Operations Management (ITOM)',
    ownerRole: 'Incident Commander Lead',
    lastUpdated: '2026-10-02',
    reviewCadence: 'Bi-Monthly',
    estimatedReadTime: '5 min read',
    tier: 'P1/P2',
    popular: true,
    featured: true,
    tags: ['SOP', 'P1', 'P2', 'Major Incident', 'Outage', 'Bridge', 'PagerDuty', 'StatusPage'],
    prerequisites: ['Incident Commander Certification', 'Access to StatusPage.io Admin', 'Bridge Host Rights'],
    content: `# SOP: P1 & P2 Major Incident Response

!!! danger "P1 Definition"
    A **Priority 1 (P1)** incident is defined as a total loss of a critical business service (e.g., Core ERP down, SSO offline, customer checkout failing, enterprise VPN inaccessible) with NO immediate workaround affecting >500 users or business revenue.

## Role Ownership & Responsibilities

| Role | Assigned To | Primary Mandate |
| :--- | :--- | :--- |
| **Incident Commander (IC)** | On-Duty ITOM Lead | Directs triage, controls bridge hygiene, authorizes failovers |
| **Communications Lead** | ITSD Shift Lead | Updates StatusPage, executive broadcasts every 20 minutes |
| **Technical Scribe** | Junior Engineer | Records timeline events, diagnostic findings, and action logs |
| **Lead Technical Resolver** | Domain Architect | Drives root cause diagnostics and remediation commands |

## Step-by-Step Execution Protocol

### Step 1: Declaration & War Room Mobilization (Within 5 Minutes)
- [ ] Confirm alert criteria meets P1 or P2 thresholds.
- [ ] In ServiceNow, elevate ticket severity to **1 - Critical** and click \`Initiate Major Incident Workbench\`.
- [ ] Trigger the automated PagerDuty Major Incident Escalation Policy.
- [ ] Join the auto-provisioned Zoom War Room: \`https://company.zoom.us/j/itsd-war-room\`.

### Step 2: Executive Broadcast & Status Page (Within 15 Minutes)
Post the initial holding statement to \`status.internal.company.com\`:
\`\`\`markdown
[INVESTIGATING] We are currently investigating an issue impacting [Service Name].
Our engineering response team is actively engaged. Next update in 20 minutes.
\`\`\`

### Step 3: Triage & Root Cause Analysis
- IC establishes single-speaker protocol.
- Resolver reviews change freeze overrides and recent deployment pipelines.
- Verify whether recent Cloudflare, AWS, or Okta upstream outages are occurring.

### Step 4: Resolution & Post-Incident Review (PIR)
- [ ] Validate service restoration with synthetic health checks.
- [ ] Broadcast [RESOLVED] communication on StatusPage.
- [ ] Schedule mandatory PIR within 48 hours in Jira Service Management.`
  },
  {
    id: 'sop-employee-lifecycle',
    slug: 'sops/user-administration/employee-onboarding-offboarding',
    title: 'SOP: Employee IT Provisioning & Offboarding',
    category: 'sops',
    subcategory: 'User Administration',
    folderPath: 'docs/sops/user-administration/sop-employee-lifecycle.md',
    description: 'End-to-end operational procedure for hardware dispatch, Day 1 account provisioning, security baselining, and immediate offboarding revocation.',
    owner: 'IT Client Services',
    ownerRole: 'ITSD Operations Supervisor',
    lastUpdated: '2026-09-20',
    reviewCadence: 'Quarterly',
    estimatedReadTime: '6 min read',
    tier: 'Tier 2',
    popular: true,
    tags: ['SOP', 'Onboarding', 'Offboarding', 'Hardware', 'Intune', 'Deprovisioning'],
    content: `# SOP: Employee IT Provisioning & Offboarding

## 1. Onboarding Timeline

\`\`\`
[ Day -7 ] Workday Stage --> Auto-create Okta Staged Account
[ Day -4 ] Hardware Dispatch --> Pre-configured via Apple ADE / Windows Autopilot
[ Day -1 ] Welcome Email --> Sent to personal email with temporary activation token
[ Day  0 ] First Login --> Forced FastPass enrollment + YubiKey binding
\`\`\`

## 2. Emergency Terminations Protocol (Immediate Action)
When an **Emergency Involuntary Termination** ticket is received:

1. **Active Session Revocation**:
   \`\`\`bash
   # Revoke all Okta sessions and tokens immediately
   Invoke-OktaSessionRevoke -UserId "usr_99812401" -ClearRememberedDevice $true
   \`\`\`
2. **Disable Active Directory Account & Move OU**:
   Move user object to \`OU=Disabled_Users,DC=corp,DC=internal\`.
3. **Trigger Intune Remote Wipe / Lock**:
   Issue corporate data wipe on all registered MDM endpoints.`
  },
  {
    id: 'sop-vip-escalation',
    slug: 'sops/escalations/vip-executive-support',
    title: 'SOP: VIP & C-Suite Priority Support',
    category: 'sops',
    subcategory: 'Escalations',
    folderPath: 'docs/sops/escalations/sop-vip-support.md',
    description: 'White-glove escalation pathway for Board Members, Executives, and high-visibility corporate events.',
    owner: 'Executive IT Support Team',
    ownerRole: 'VIP Desk Manager',
    lastUpdated: '2026-09-10',
    reviewCadence: 'Quarterly',
    estimatedReadTime: '4 min read',
    tier: 'Global',
    tags: ['VIP', 'Executive', 'SLA', 'White Glove', 'Escalation'],
    content: `# SOP: VIP & C-Suite Priority Support

!!! tip "Response SLA Guarantee"
    All tickets flagged with the \`VIP_Executive\` metadata badge receive an immediate response within **< 5 minutes** 24/7/365.

## Engagement Channels
- **Dedicated Concierge Phone**: Ext: \`5555\` (Direct to Tier 3 Executive Tech)
- **Private Teams Chat**: \`#executive-support-priority\`
- **On-Site Dispatch**: Floor 14 Executive Suite Tech Station`
  },

  // ==========================================
  // OPERATIONS
  // ==========================================
  {
    id: 'ops-batch-nightly-sync',
    slug: 'operations/batch-jobs/nightly-identity-and-asset-sync',
    title: 'Runbook: Nightly Identity & Asset Batch Jobs',
    category: 'operations',
    subcategory: 'Batch Jobs & Schedules',
    folderPath: 'docs/operations/batch-jobs/nightly-identity-sync.md',
    description: 'Operational schedule, failure alerting thresholds, manual restart sequences, and retry idempotency for automated nightly data pipelines.',
    owner: 'Platform Operations (PlatOps)',
    ownerRole: 'Senior Site Reliability Engineer',
    lastUpdated: '2026-09-29',
    reviewCadence: 'Monthly',
    estimatedReadTime: '5 min read',
    tier: 'Tier 1',
    popular: false,
    tags: ['Runbook', 'Batch Jobs', 'Cron', 'ETL', 'Workday', 'CMDB', 'Data Pipelines'],
    content: `# Runbook: Nightly Identity & Asset Batch Jobs

## Schedule & Runtime Overview

| Job Name | Trigger Time (UTC) | Frequency | Max Duration | Failure Alert Webhook |
| :--- | :--- | :--- | :--- | :--- |
| \`job-workday-to-okta-delta\` | \`01:00 UTC\` | Daily | 18 mins | \`#alerts-identity-batch\` |
| \`job-crowdstrike-to-cmdb\` | \`02:30 UTC\` | Daily | 35 mins | \`#alerts-cmdb-sync\` |
| \`job-jamf-intune-reconcile\` | \`03:45 UTC\` | Daily | 12 mins | \`#alerts-endpoint-batch\` |

## Failure Remediation Procedure
1. Check Airflow / AWS Step Functions execution DAG status.
2. If deadlock is reported on table \`dim_user_assets\`:
\`\`\`sql
-- Clear transient lock state
SELECT pg_cancel_backend(pid) FROM pg_stat_activity 
WHERE query LIKE '%job_crowdstrike_to_cmdb%' AND state = 'idle in transaction';
\`\`\`
3. Trigger manual rerun via CLI: \`itsd-ops job run --id job-workday-to-okta-delta --force-retry\``
  },
  {
    id: 'ops-service-health-monitoring',
    slug: 'operations/monitoring/service-health-and-telemetry',
    title: 'Operations: Core Service Health & Monitoring Dashboards',
    category: 'operations',
    subcategory: 'Monitoring & Health',
    folderPath: 'docs/operations/monitoring/service-health-dashboards.md',
    description: 'Synthetic endpoint probe configurations, Datadog ITSD health monitors, alert thresholds, and SLA metric tracking.',
    owner: 'Monitoring & Observability Team',
    ownerRole: 'Lead Observability Engineer',
    lastUpdated: '2026-10-03',
    reviewCadence: 'Quarterly',
    estimatedReadTime: '5 min read',
    tier: 'Tier 1',
    tags: ['Monitoring', 'Datadog', 'Synthetic Probes', 'SLA', 'Service Health', 'Telemetry'],
    content: `# Operations: Core Service Health & Monitoring

## Synthetic Probe Targets

\`\`\`
[ US-East Synthetics ] ---> [ Okta SSO Check: https://sso.corp.com/health ] (Every 60s)
[ EU-West Synthetics ] ---> [ ServiceNow API: https://corp.service-now.com ] (Every 60s)
[ AP-South Synthetics ] ---> [ GlobalProtect Gateway: vpn.corp.com:443 ] (Every 120s)
\`\`\`

## Alert Severity Matrix

- **Critical (P1 Trigger)**: 3 consecutive probe failures across $\ge 2$ regions.
- **Warning**: Latency $> 1,800\text{ms}$ on 95th percentile over 5-minute rolling window.`
  },

  // ==========================================
  // KNOWLEDGE BASE (KB) & TROUBLESHOOTING
  // ==========================================
  {
    id: 'kb-error-502-bad-gateway',
    slug: 'kb/troubleshooting/502-bad-gateway-internal-apps',
    title: 'KB: Resolving 502 Bad Gateway on Internal Web Services',
    category: 'kb',
    subcategory: 'Troubleshooting & Errors',
    folderPath: 'docs/kb/troubleshooting/kb-502-bad-gateway.md',
    description: 'Diagnostic flow chart, Cloudflare edge logs interpretation, Nginx upstream socket timeouts, and internal load balancer troubleshooting.',
    owner: 'Tier 2 ITSD Escalations',
    ownerRole: 'Senior Support Analyst',
    lastUpdated: '2026-09-25',
    reviewCadence: 'Monthly',
    estimatedReadTime: '4 min read',
    tier: 'Tier 2',
    popular: true,
    featured: true,
    tags: ['KB', '502 Bad Gateway', 'Cloudflare', 'ALB', 'Nginx', 'HTTP 502', 'Troubleshooting'],
    content: `# KB: Resolving 502 Bad Gateway on Internal Web Services

## Quick Diagnosis Flow

\`\`\`
User sees 502 Bad Gateway
           |
           v
Is the error page branded "Cloudflare"?
    ├── YES --> Upstream origin server is unreachable or timed out (>30s). Check internal ALB targets.
    └── NO  --> Nginx / Reverse Proxy locally died on host. Restart service.
\`\`\`

## Step-by-Step Fixes

### 1. Cloudflare Ray ID Trace
Request the user's Ray ID shown at the bottom of the screen (e.g. \`Ray ID: 89ab32c918ef0021\`).
Search in Cloudflare Analytics under **Security > Events > Ray ID Lookup**.

### 2. Verify AWS Target Group Health
\`\`\`bash
# Query AWS CLI for unhealthy targets
aws elbv2 describe-target-health \
  --target-group-arn "arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/tg-internal-app/ab12cd34" \
  --query "TargetHealthDescriptions[?TargetHealth.State!='healthy']"
\`\`\`

### 3. Restart Container Pool (If Stuck)
\`\`\`bash
kubectl rollout restart deployment/internal-portal-backend -n core-services
\`\`\``
  },
  {
    id: 'kb-vpn-tunnel-handshake-failure',
    slug: 'kb/troubleshooting/vpn-tunnel-handshake-failure',
    title: 'KB: Zero-Trust VPN Handshake & Certificate Failures',
    category: 'kb',
    subcategory: 'Network & Connectivity',
    folderPath: 'docs/kb/troubleshooting/kb-vpn-handshake-error.md',
    description: 'Diagnosing IPsec/WireGuard/ZTNA client handshake drops, MTU blackholes, and device posture telemetry mismatches.',
    owner: 'Network Engineering',
    ownerRole: 'Network Operations Specialist',
    lastUpdated: '2026-09-18',
    reviewCadence: 'Quarterly',
    estimatedReadTime: '4 min read',
    tier: 'Tier 1',
    popular: true,
    tags: ['VPN', 'Zero Trust', 'WARP', 'ZTNA', 'Network', 'MTU', 'Handshake'],
    content: `# KB: Zero-Trust VPN Handshake & Certificate Failures

## Symptoms
- Client displays \`Status: Reconnecting... Handshake timed out\`.
- User is connected to home Wi-Fi or tethered mobile network.

## Common Root Causes & Immediate Fixes

| Cause | Indicator | Resolution |
| :--- | :--- | :--- |
| **MTU Packet Fragmentation** | Ping with \`size 1500\` fails | Lower client MTU to \`1360\` via Settings > Advanced > MTU |
| **Expired Client Posture Cert** | Error code \`SEC_ERR_POSTURE_STALE\` | Trigger manual re-enrollment in Cloudflare WARP client |
| **Hotel / Captive Portal Block** | DNS query timeout to \`1.1.1.1\` | Toggle \`Pause Zero-Trust for 10 Minutes\` to accept captive agreement |`
  },

  // ==========================================
  // NEW HIRE HUB & ONBOARDING
  // ==========================================
  {
    id: 'onboarding-first-30-days',
    slug: 'onboarding/new-hire-pathway-first-30-days',
    title: 'New Hire Hub: First 30 Days IT Engineer Pathway',
    category: 'onboarding',
    subcategory: 'Engineer Onboarding',
    folderPath: 'docs/onboarding/first-30-days.md',
    description: 'Structured onboarding checklist, sandbox environment provisioning, core ticketing rituals, and shadow schedule for new ITSD technicians.',
    owner: 'IT Talent & Enablement',
    ownerRole: 'ITSD Training & Quality Lead',
    lastUpdated: '2026-10-04',
    reviewCadence: 'Monthly',
    estimatedReadTime: '7 min read',
    tier: 'Global',
    popular: true,
    featured: true,
    tags: ['New Hire', 'Onboarding', 'Training', 'First 30 Days', 'Playbook', 'Shadowing'],
    content: `# New Hire Hub: First 30 Days IT Engineer Pathway

Welcome to the IT Service Desk team! This structured pathway ensures you gain system mastery, tool access, and confidence during your first month.

## Phase 1: Week 1 — Access, Environment & Baseline Tools
- [ ] Complete Workday IT Security Compliance course.
- [ ] Set up Hardware YubiKey and Okta Verify biometric FastPass.
- [ ] Access ServiceNow Sandbox: \`https://company-dev.service-now.com\`.
- [ ] Join team Slack channels: \`#itsd-team\`, \`#itsd-war-room\`, \`#itsd-escalations\`.
- [ ] Read [SOP: P1 & P2 Major Incident Response](../sops/incident-management/sop-major-incident-p1-p2.md).

## Phase 2: Week 2 — Shadowing & Ticket Handling
- [ ] Shadow 10 Tier 1 access request tickets with your assigned mentor.
- [ ] Perform 3 passwordless resets in the staging sandbox.
- [ ] Master the [Content Placement Rules](../architecture/content-placement-rules) for submitting knowledge fixes.

## Phase 3: Weeks 3 & 4 — Independent Queue Ownership
- [ ] Handle primary incoming queue under async mentor supervision.
- [ ] Participate as scribe in at least one scheduled disaster recovery drill.
- [ ] Author or update your first knowledge base article in MkDocs!`
  },

  // ==========================================
  // ARCHITECTURE & GOVERNANCE STANDARDS
  // ==========================================
  {
    id: 'arch-content-placement-rules',
    slug: 'architecture/standards/content-placement-and-taxonomy-rules',
    title: 'Architecture & Governance: Content Placement Rules',
    category: 'architecture',
    subcategory: 'Standards & Governance',
    folderPath: 'docs/architecture/standards/content-placement-rules.md',
    description: 'Mandatory rules defining exactly which document belongs in Applications vs SOPs vs Operations vs KB vs User Guides to prevent duplicate content.',
    owner: 'Enterprise Documentation Guild',
    ownerRole: 'Principal Information Architect',
    lastUpdated: '2026-10-04',
    reviewCadence: 'Quarterly',
    estimatedReadTime: '6 min read',
    tier: 'Global',
    popular: true,
    featured: true,
    tags: ['Governance', 'Information Architecture', 'Taxonomy', 'Placement Rules', 'MkDocs', 'SST'],
    content: `# Architecture & Governance: Content Placement Rules

!!! info "The Single Source of Truth (SSoT) Law"
    **Never duplicate operational steps across multiple documents.** Every document type has a strict boundary. When one document references steps defined elsewhere, it MUST use a canonical relative link rather than copy-pasting text.

## Boundary Matrix: What Belongs Where

\`\`\`
+--------------------------------------------------------------------------------------------------+
|                                    INFORMATION ARCHITECTURE MATRIX                              |
+-------------------+----------------------------------------------------+-------------------------+
| Category          | Primary Question Answered                          | Target Audience         |
+-------------------+----------------------------------------------------+-------------------------+
| Applications/     | "How is this application built and integrated?"   | Engineers / Admins      |
| SOPs/             | "How do I perform this exact procedural workflow?" | Tier 1/2/3 Technicians  |
| Operations/       | "How do we monitor, run, and maintain it daily?"  | SREs / SysAdmins / Ops  |
| KB/               | "How do I diagnose and fix this specific error?"   | Resolvers / Help Desk   |
| User Guides/      | "How does an employee use this software feature?"  | End-Users / Staff       |
| Architecture/     | "What standard or ADR governed this design?"       | Architects / Guilds     |
+-------------------+----------------------------------------------------+-------------------------+
\`\`\`

## Strict Placement Enforcement Rules

### 1. Applications (\`docs/applications/<app-name>/\`)
- **BELONGS**: Architecture diagrams, data flow schemas, SAML/OIDC SSO configurations, API endpoints, system owner contacts, hardware/cloud dependencies.
- **DOES NOT BELONG**: Step-by-step incident response scripts (Put in **SOPs**) or single error code diagnostics (Put in **KB**).

### 2. SOPs (\`docs/sops/<domain>/\`)
- **BELONGS**: Sequential, numbered procedural workflows with explicit role ownership, prerequisites, SLAs, and verification checklists (e.g. Major Incident response, Onboarding, Privileged Access grant).
- **DOES NOT BELONG**: Technical specs of the underlying database or server configuration.

### 3. Operations (\`docs/operations/<type>/\`)
- **BELONGS**: Daily schedules, batch cron jobs, runbooks for service restarts, Datadog metric alert thresholds, backup verification schedules.
- **DOES NOT BELONG**: End-user setup guides.

### 4. Knowledge Base (\`docs/kb/<category>/\`)
- **BELONGS**: Troubleshooting flowcharts, specific HTTP / OS error codes, quick symptom-to-solution matrices, hardware diagnostic fixes.
- **DOES NOT BELONG**: Comprehensive architectural specs or 10-page onboarding courses.`
  },
  {
    id: 'arch-adr-004-mkdocs-material',
    slug: 'architecture/adr/adr-004-material-for-mkdocs-platform',
    title: 'ADR-004: Adoption of Material for MkDocs as Single Portal',
    category: 'architecture',
    subcategory: 'Architecture Decision Records (ADRs)',
    folderPath: 'docs/architecture/adr/adr-004-material-for-mkdocs.md',
    description: 'Architectural Decision Record documenting the technical evaluation and consensus to migrate from Confluence/SharePoint to Git-backed Material for MkDocs.',
    owner: 'Enterprise Architecture Board',
    ownerRole: 'Chief Architect',
    lastUpdated: '2026-08-14',
    reviewCadence: 'Annual',
    estimatedReadTime: '5 min read',
    tier: 'Global',
    tags: ['ADR', 'MkDocs', 'Architecture', 'Documentation', 'GitOps', 'Decisions'],
    content: `# ADR-004: Adoption of Material for MkDocs as Single Portal

## Context & Problem Statement
Historical documentation was fragmented across 14 SharePoint folder shares, 3 Confluence spaces, and local network drives. This resulted in:
1. Average search time of 6.2 minutes per ticket.
2. 42% of documents being stale / unmaintained with no clear ownership.
3. Lack of PR-based change reviews, leading to conflicting SOP steps.

## Decision Outcome
**Adopt Material for MkDocs with Git-backed version control (GitLab CI/CD) and automated Lunr.js search indexing.**

### Positive Consequences
- Instant sub-50ms search retrieval via offline Lunr.js worker.
- Markdown in Git allows branch previews, pull request reviews, and CODEOWNERS enforcement.
- Single unified portal deployed directly to internal CDN.`
  }
];
