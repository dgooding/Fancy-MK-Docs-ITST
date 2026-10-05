import React, { useState } from 'react';
import {
  FileCode2,
  Copy,
  Check,
  Download,
  FolderTree,
  Terminal,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { mkdocsYmlContent } from '../data/blueprintData';

export const MkDocsConfigView: React.FC = () => {
  const [copiedYaml, setCopiedYaml] = useState(false);

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(mkdocsYmlContent);
    setCopiedYaml(true);
    setTimeout(() => setCopiedYaml(false), 2000);
  };

  const handleDownloadYaml = () => {
    const blob = new Blob([mkdocsYmlContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mkdocs.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const folderStructureTree = `docs/
│
├── index.md                                  # Homepage with 5 primary cards & hero search
│
├── applications/                             # Technical application specifications
│   ├── index.md                              # Application directory overview & tier matrix
│   ├── okta-sso/                             # Okta SSO & Identity Federation
│   │   ├── index.md                          # Architecture, SAML/OIDC endpoints, group mappings
│   │   └── troubleshooting.md                # FastPass & SAML Error 400 diagnostics
│   ├── servicenow/                           # ServiceNow ITSM, CMDB, and Mid-Server topology
│   │   └── index.md
│   ├── m365/                                 # Exchange Online & Teams voice gateways
│   │   └── exchange-teams.md
│   └── templates/                            # Standard application technical template
│       └── app-spec-template.md
│
├── sops/                                     # Step-by-step Standard Operating Procedures
│   ├── index.md                              # SOP catalog & search index
│   ├── incident-management/                  # P1/P2 Major Incident & Security escalation protocols
│   │   ├── sop-major-incident-p1-p2.md
│   │   └── sop-security-incident-containment.md
│   ├── access-management/                    # PAM & elevation workflows
│   │   └── sop-privileged-access-request.md
│   ├── user-administration/                  # Joiner / Mover / Leaver protocols
│   │   └── sop-employee-lifecycle.md
│   └── escalations/                          # White-glove VIP and on-call handovers
│       └── sop-vip-support.md
│
├── operations/                               # Daily operations, telemetry & runbooks
│   ├── index.md                              # Operations landing page
│   ├── runbooks/                             # Restart & failover procedures
│   │   └── okta-ad-agent-failover.md
│   ├── batch-jobs/                           # Nightly ETL & asset sync jobs
│   │   └── nightly-identity-sync.md
│   ├── monitoring/                           # Datadog synthetic probe configurations
│   │   └── service-health-dashboards.md
│   └── schedules/                            # Change freeze windows & patch schedules
│       └── change-freeze-calendar.md
│
├── kb/                                       # Troubleshooting repository & error dictionary
│   ├── index.md                              # KB symptom-to-solution fast search
│   ├── troubleshooting/                      # Specific error fixes (502 Bad Gateway, VPN Handshake)
│   │   ├── kb-502-bad-gateway.md
│   │   └── kb-vpn-handshake-error.md
│   ├── common-errors/                        # Error code dictionary
│   │   └── error-code-directory.md
│   ├── faq/                                  # Common technician questions
│   │   └── faq-passwordless-fido2.md
│   └── tools/                                # PowerShell & Bash diagnostic modules
│       └── cli-diagnostic-toolkit.md
│
├── user-guides/                              # End-user customer facing self-service guides
│   ├── index.md
│   ├── workplace/
│   │   └── guide-setting-up-okta-fastpass.md
│   └── hardware/
│       └── guide-dual-monitor-dock-setup.md
│
├── onboarding/                               # New Hire Hub (Accelerated 30-day pathway)
│   ├── index.md                              # New hire roadmap landing page
│   ├── first-30-days.md                      # Week 1-4 milestone checklist
│   ├── essential-sops.md                     # Curated core procedures
│   ├── sandbox-environments.md               # Dev instance credentials & access
│   └── glossary.md                           # ITSD acronyms & terms
│
├── architecture/                             # Governance, standards & ADRs
│   ├── index.md
│   ├── adr/                                  # Architectural Decision Records
│   │   ├── adr-004-material-for-mkdocs.md
│   │   └── adr-003-passwordless-fido2.md
│   ├── standards/                            # Content placement rules, taxonomy, review SLAs
│   │   ├── content-placement-rules.md
│   │   └── tagging-taxonomy.md
│   └── templates/                            # Central template repository
│       └── index.md
│
└── assets/                                   # Media, images & architecture diagrams
    ├── images/
    └── diagrams/`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-blue-200">
          <FileCode2 className="w-4 h-4" />
          <span>Production Infrastructure Config</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          MkDocs Configuration & Folder Structure
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Production-grade <code>mkdocs.yml</code> configuration and clean <code>docs/</code> folder tree ready to deploy directly into GitLab CI/CD or GitHub Actions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: mkdocs.yml configuration viewer */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono font-bold text-white">mkdocs.yml</span>
                <span className="text-[11px] font-mono text-slate-400">Material for MkDocs</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyYaml}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  {copiedYaml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedYaml ? 'Copied' : 'Copy YAML'}</span>
                </button>
                <button
                  onClick={handleDownloadYaml}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto max-h-[600px] leading-relaxed bg-slate-900">
              <code>{mkdocsYmlContent}</code>
            </pre>
          </div>

          {/* Quick Start CLI */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Quick Start Local Development CLI
              </h3>
            </div>
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-slate-200 space-y-2">
              <div className="text-slate-400"># 1. Install Material for MkDocs and required plugins</div>
              <div className="text-blue-300">pip install mkdocs-material mkdocs-git-revision-date-localized-plugin mkdocs-git-authors-plugin mkdocs-minify-plugin</div>
              <div className="text-slate-400 mt-2"># 2. Start local live-reload dev server</div>
              <div className="text-blue-300">mkdocs serve</div>
              <div className="text-slate-400 mt-2"># 3. Build optimized static production bundle to site/</div>
              <div className="text-blue-300">mkdocs build --strict</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Folder Structure Tree */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Recommended Folder Hierarchy
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold text-blue-700">docs/</span>
            </div>

            <div className="p-4 bg-slate-50 text-slate-800 font-mono text-xs overflow-x-auto max-h-[600px] leading-relaxed">
              <pre className="text-slate-800 font-mono whitespace-pre">{folderStructureTree}</pre>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-xs text-slate-600 space-y-2">
            <div className="font-bold text-slate-900">Why This Structure Scales:</div>
            <p className="leading-relaxed font-normal">
              Each top-level directory corresponds directly to a top tab in <code>mkdocs.yml</code>. Subdirectories never exceed 2 levels of nesting, preventing hidden orphan files while easily accommodating 1,000+ documents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
