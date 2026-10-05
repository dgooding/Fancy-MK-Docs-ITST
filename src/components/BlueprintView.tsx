import React, { useState } from 'react';
import {
  Layers,
  Compass,
  FolderTree,
  Search,
  CheckCircle2,
  Shield,
  Zap,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Monitor,
  ClipboardList,
  Cpu,
  GraduationCap
} from 'lucide-react';

interface BlueprintViewProps {
  onNavigateTab: (tab: string) => void;
}

export const BlueprintView: React.FC<BlueprintViewProps> = ({ onNavigateTab }) => {
  const [activeSection, setActiveSection] = useState<'sitemap' | 'material' | 'scaling' | 'comparison'>('sitemap');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-blue-200">
          <Layers className="w-4 h-4" />
          <span>Information Architecture & Engineering Spec</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          Enterprise ITSD Documentation Blueprint
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Architectural specification for a unified, Git-backed MkDocs knowledge platform designed to support 1,000+ enterprise documents with zero structural rot and sub-second retrieval.
        </p>

        {/* Segmented view navigation buttons */}
        <div className="flex items-center gap-2 mt-6 p-1.5 bg-slate-100 border border-slate-200 rounded-xl w-fit overflow-x-auto shadow-2xs">
          <button
            onClick={() => setActiveSection('sitemap')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeSection === 'sitemap'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200/50'
            }`}
          >
            Site Map & Navigation Hierarchy
          </button>
          <button
            onClick={() => setActiveSection('material')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeSection === 'material'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200/50'
            }`}
          >
            Material for MkDocs Features
          </button>
          <button
            onClick={() => setActiveSection('scaling')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeSection === 'scaling'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200/50'
            }`}
          >
            Scaling to 1,000+ Docs Strategy
          </button>
          <button
            onClick={() => setActiveSection('comparison')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeSection === 'comparison'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200/50'
            }`}
          >
            Industry Benchmark Platforms
          </button>
        </div>
      </div>

      {/* SECTION 1: Site Map & Navigation Hierarchy */}
      {activeSection === 'sitemap' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              The 5 Primary Pillar Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To eliminate cognitive friction for both new hires and experienced Tier 3 engineers, the top-level navigation is constrained to <strong>5 primary domain cards</strong>. Everything in the enterprise maps directly into one of these five pillars, backed by an Architecture & Standards governance layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1: Applications */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">1. Applications</h3>
                    <span className="text-[11px] text-blue-600 font-mono font-semibold">docs/applications/</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-4 font-normal">
                  Authoritative architectural specifications and access models organized strictly by <strong>Application Name → Documentation Type</strong>.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-slate-500 font-semibold">Sub-structure:</div>
                  <div>├── application-overviews.md</div>
                  <div>├── architecture-and-dataflow.md</div>
                  <div>├── integrations-and-apis.md</div>
                  <div>├── access-models-and-rbac.md</div>
                  <div>├── dependencies-and-slas.md</div>
                  <div>└── support-contacts.md</div>
                </div>
              </div>
            </div>

            {/* Pillar 2: SOPs */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">2. SOPs</h3>
                    <span className="text-[11px] text-emerald-600 font-mono font-semibold">docs/sops/</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-4 font-normal">
                  Step-by-step procedural workflows with explicit time-to-complete estimates, role ownership, prerequisites, and checklists.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-slate-500 font-semibold">Sub-structure:</div>
                  <div>├── incident-management/</div>
                  <div>├── access-management/</div>
                  <div>├── user-administration/</div>
                  <div>├── escalations/</div>
                  <div>├── maintenance-activities/</div>
                  <div>└── compliance-and-audit/</div>
                </div>
              </div>
            </div>

            {/* Pillar 3: Operations */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600 border border-purple-100">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">3. Operations</h3>
                    <span className="text-[11px] text-purple-600 font-mono font-semibold">docs/operations/</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-4 font-normal">
                  Daily operations support, batch job schedules, synthetic monitoring probes, and production support runbooks.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-slate-500 font-semibold">Sub-structure:</div>
                  <div>├── runbooks/</div>
                  <div>├── monitoring-and-telemetry/</div>
                  <div>├── batch-jobs-and-cron/</div>
                  <div>├── service-health/</div>
                  <div>└── production-support/</div>
                </div>
              </div>
            </div>

            {/* Pillar 4: Knowledge Base */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">4. Troubleshooting & KB</h3>
                    <span className="text-[11px] text-amber-600 font-mono font-semibold">docs/kb/</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-4 font-normal">
                  Rapid symptom-to-solution diagnostic lookup repository, HTTP error codes, common fixes, and diagnostic CLI tools.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-slate-500 font-semibold">Sub-structure:</div>
                  <div>├── troubleshooting-guides/</div>
                  <div>├── common-errors-dictionary/</div>
                  <div>├── faq/</div>
                  <div>└── diagnostic-toolkits/</div>
                </div>
              </div>
            </div>

            {/* Pillar 5: New Hire Hub */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2.5 rounded-lg bg-pink-50 text-pink-600 border border-pink-100">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">5. New Hire Hub</h3>
                    <span className="text-[11px] text-pink-600 font-mono font-semibold">docs/onboarding/</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-4 font-normal">
                  Accelerate new technician time-to-productivity with a structured first 30 days roadmap and sandbox tutorials.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-slate-500 font-semibold">Sub-structure:</div>
                  <div>├── first-30-days.md</div>
                  <div>├── essential-sops.md</div>
                  <div>├── core-applications.md</div>
                  <div>├── sandbox-environments.md</div>
                  <div>└── team-glossary.md</div>
                </div>
              </div>
            </div>

            {/* Governance: Architecture & Standards */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-500 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Governance & ADRs</h3>
                    <span className="text-[11px] text-blue-700 font-mono font-semibold">docs/architecture/</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-4 font-normal">
                  Standards, Architectural Decision Records (ADRs), naming conventions, and markdown authoring templates.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-slate-500 font-semibold">Sub-structure:</div>
                  <div>├── adr/ (ADR-001, ADR-002...)</div>
                  <div>├── standards/ (placement rules)</div>
                  <div>├── templates/ (app, sop, kb)</div>
                  <div>└── taxonomy/ (tags schema)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Material for MkDocs Feature Recommendations */}
      {activeSection === 'material' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Why Material for MkDocs Powers Enterprise Documentation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Material for MkDocs provides an unmatched combination of client-side performance, instant offline search, and developer-friendly Markdown syntax.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                <Zap className="w-4 h-4" />
                <span>navigation.instant & Link Prefetching</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Transforms static HTML into a Single Page Application (SPA). Page transitions happen in &lt;10ms with zero browser reloading, preserving scroll positions and search state.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                <Search className="w-4 h-4" />
                <span>Offline Web Worker Search with Lunr.js</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Generates a pre-built search index at build time. Search executes in a dedicated Web Worker with query suggestions, keyword highlighting, and tag scoring without hitting a backend database.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                <Shield className="w-4 h-4" />
                <span>Rich Admonitions & Content Tabs</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Standardizes visual callouts for <code>!!! note</code>, <code>!!! tip</code>, <code>!!! warning</code>, and <code>!!! danger</code>, ensuring technicians never miss critical compliance or safety prerequisites.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                <FolderTree className="w-4 h-4" />
                <span>git-revision-date-localized & git-authors</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Automatically extracts author attribution and last-commit timestamps from Git history, eliminating manual "last updated" maintenance and enforcing transparency.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Scaling Strategy for 1,000+ Documents */}
      {activeSection === 'scaling' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Scaling Architecture for 1,000+ Documents
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              When internal documentation exceeds 1,000 articles, traditional folder structures collapse into chaos. Here is our 4-pillar scaling strategy:
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                1. Directory Partitioning & Strict Nesting Limit (&le; 3 Levels)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Never allow directory hierarchies deeper than <code>docs/category/subcategory/document.md</code>. Deeply nested trees create orphan documents and degrade navigation scannability.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                2. Automated Frontmatter Schema Validation via CI/CD
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Enforce a mandatory YAML frontmatter schema on every PR: <code>owner</code>, <code>owner_role</code>, <code>category</code>, <code>review_cadence</code>, and <code>tier</code>. Pull requests without valid metadata are automatically blocked.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                3. Automated 90-Day Stale Document Detection Bot
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                A scheduled GitHub/GitLab Action checks document commit dates. If an article reaches its <code>review_cadence</code> threshold without an update, an automated review ticket is created in Jira and assigned to the document owner.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                4. Monorepo GitOps with CODEOWNERS File
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Use a <code>.github/CODEOWNERS</code> or <code>.gitlab/CODEOWNERS</code> file to route pull request reviews directly to the respective team lead:
                <br />
                <code className="text-[11px] text-blue-700 font-mono mt-1 inline-block bg-blue-50 px-2 py-1 rounded border border-blue-200">
                  docs/applications/okta-sso/ @iam-team
                  <br />
                  docs/sops/incident-management/ @incident-commanders
                </code>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: Comparison with Industry Platforms */}
      {activeSection === 'comparison' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Modern Knowledge Platform Benchmarks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our ITSD design draws from the highest-performing engineering portals in the industry:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="text-sm font-bold text-slate-900">Microsoft Learn</div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                <strong>What we adopted</strong>: The 3-column layout (Left navigation tree, center reading pane with actionable checklists, right TOC scroll-spy) and role-specific metadata headers.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="text-sm font-bold text-slate-900">Stripe Documentation</div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                <strong>What we adopted</strong>: Minimalist typographic hierarchy, interactive copyable code snippets, and inline admonition callouts.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="text-sm font-bold text-slate-900">Spotify Backstage.io</div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                <strong>What we adopted</strong>: Application catalog architecture, system ownership directory, and clear separation between infrastructure specs and operational playbooks.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="text-sm font-bold text-slate-900">Material for MkDocs</div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                <strong>What we adopted</strong>: Instant SPA loading, client-side Web Worker search with Lunr.js, and dark mode palette synchronization.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
