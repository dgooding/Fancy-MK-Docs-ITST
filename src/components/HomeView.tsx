import React from 'react';
import {
  Search,
  Monitor,
  ClipboardList,
  Cpu,
  GraduationCap,
  Layers,
  ArrowRight,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sparkles,
  ExternalLink,
  BookMarked,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { DocItem, DocCategory } from '../types/docs';

interface HomeViewProps {
  onSelectCategory: (category: DocCategory) => void;
  onSelectDoc: (doc: DocItem) => void;
  onOpenSearch: (initialQuery?: string) => void;
  onNavigateTab: (tab: string) => void;
  docs: DocItem[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectCategory,
  onSelectDoc,
  onOpenSearch,
  onNavigateTab,
  docs
}) => {
  const popularDocs = docs.filter(d => d.popular).slice(0, 4);
  const recentDocs = docs.slice(0, 4);

  const primaryCards = [
    {
      category: 'applications' as DocCategory,
      title: 'Applications',
      subtitle: 'Technical Architecture & Access Models',
      description: 'System specifications, SAML/OIDC SSO, data flows, integration APIs, dependencies, and escalation tiers.',
      icon: Monitor,
      count: '42 Core Apps',
      accent: 'hover:border-blue-500 hover:shadow-md'
    },
    {
      category: 'sops' as DocCategory,
      title: 'SOPs',
      subtitle: 'Step-by-Step Operational Procedures',
      description: 'P1/P2 Major Incident response, user provisioning, privilege elevation, and time-bound compliance workflows.',
      icon: ClipboardList,
      count: '118 Procedures',
      accent: 'hover:border-blue-500 hover:shadow-md'
    },
    {
      category: 'operations' as DocCategory,
      title: 'Operations',
      subtitle: 'Runbooks, Batch Jobs & Monitoring',
      description: 'Production runbooks, nightly cron schedules, synthetic Datadog probes, and service health telemetry.',
      icon: Cpu,
      count: '64 Runbooks',
      accent: 'hover:border-blue-500 hover:shadow-md'
    },
    {
      category: 'kb' as DocCategory,
      title: 'Troubleshooting / KB',
      subtitle: 'Known Issues & Error Dictionary',
      description: 'Fast symptom-to-solution guides, HTTP error fixes, VPN diagnostics, and technician FAQs.',
      icon: Search,
      count: '340+ KB Articles',
      accent: 'hover:border-blue-500 hover:shadow-md'
    },
    {
      category: 'onboarding' as DocCategory,
      title: 'New Hire Hub',
      subtitle: 'Accelerated Onboarding Pathway',
      description: 'First 30 Days roadmap, essential SOPs, sandbox access, shadow schedules, and technician glossary.',
      icon: GraduationCap,
      count: '14 Modules',
      accent: 'hover:border-blue-500 hover:shadow-md'
    }
  ];

  return (
    <div className="min-h-full pb-16">
      {/* Hero Section (Progressive Blue & White) */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-gradient-to-b from-blue-50/70 via-white to-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-100/60 px-3 py-1 rounded-full mb-4 tracking-wide border border-blue-200">
            <span>Enterprise IT Service Desk</span>
            <span aria-hidden="true">·</span>
            <span>Single Source of Truth Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4 max-w-3xl mx-auto leading-tight" style={{ textWrap: 'balance' }}>
            Fast, verified documentation for IT Service Desk operations
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-8 font-normal">
            Designed for minimal clicks, sub-second search retrieval, and zero-ambiguity procedural governance across Tier 1, 2, and 3 engineering teams.
          </p>

          {/* Large Hero Search Box */}
          <div className="max-w-2xl mx-auto mb-6">
            <div
              onClick={() => onOpenSearch()}
              className="group relative flex items-center w-full px-4 py-3.5 bg-white hover:bg-slate-50/80 border-2 border-blue-600 hover:border-blue-700 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-200"
            >
              <Search className="w-5 h-5 text-blue-600 mr-3 shrink-0 transition-colors" />
              <span className="text-sm text-slate-500 group-hover:text-slate-700 text-left flex-1 font-normal">
                Search all ITSD Documentation (e.g. "Okta SSO", "P1 SOP", "HTTP 502", "New Hire")...
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono bg-slate-100 border border-slate-300 rounded text-slate-600 font-semibold shadow-2xs">
                  Ctrl + K
                </kbd>
              </div>
            </div>
          </div>

          {/* Quick Action Chips */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-slate-600">
            <span className="text-slate-500 font-medium">Quick searches:</span>
            <button
              onClick={() => onOpenSearch('Okta SSO')}
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
            >
              Okta SSO
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <button
              onClick={() => onOpenSearch('Major Incident')}
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
            >
              P1 Incident SOP
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <button
              onClick={() => onOpenSearch('502 Bad Gateway')}
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
            >
              502 Bad Gateway
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <button
              onClick={() => onOpenSearch('Onboarding')}
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
            >
              First 30 Days
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <button
              onClick={() => onOpenSearch('ServiceNow')}
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
            >
              ServiceNow CIs
            </button>
          </div>
        </div>
      </section>

      {/* Primary 5 Pillar Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {primaryCards.map(card => {
            const Icon = card.icon;
            return (
              <button
                key={card.category}
                onClick={() => onSelectCategory(card.category)}
                className={`group relative text-left p-5 rounded-xl bg-white border border-slate-200/90 shadow-sm transition-all duration-200 flex flex-col justify-between ${card.accent}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold tabular-nums">
                      {card.count}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors mb-1">
                    {card.title}
                  </h3>
                  <div className="text-[11px] font-medium text-blue-600 mb-2">
                    {card.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-3">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                  <span>Explore section</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Platform Health & Governance Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Enterprise SSoT Documentation Governance
              </div>
              <div className="text-[11px] text-slate-600">
                100% of articles mapped to designated owners with automated 90-day review cycles.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-700 divide-x divide-slate-200">
            <div>
              <div className="text-sm font-bold text-slate-900 font-mono tabular-nums">1,248</div>
              <div className="text-[11px] text-slate-500">Indexed Docs</div>
            </div>
            <div className="pl-6">
              <div className="text-sm font-bold text-emerald-600 font-mono tabular-nums">99.4%</div>
              <div className="text-[11px] text-slate-500">Freshness SLA</div>
            </div>
            <div className="pl-6">
              <div className="text-sm font-bold text-blue-600 font-mono tabular-nums">&lt; 4.2m</div>
              <div className="text-[11px] text-slate-500">MTTR Drop</div>
            </div>
            <div className="pl-6 hidden md:block">
              <button
                onClick={() => onNavigateTab('blueprint')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors"
              >
                <span>View Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular & Recently Updated Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Popular Documents */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Most Accessed Resources
                </h2>
              </div>
              <button
                onClick={() => onNavigateTab('docs')}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {popularDocs.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => onSelectDoc(doc)}
                  className="group p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 cursor-pointer transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                          {doc.category}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500">{doc.estimatedReadTime}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {doc.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Owner: {doc.owner}</span>
                    <span className="font-mono">{doc.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Recently Updated */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Recently Updated Documentation
                </h2>
              </div>
              <button
                onClick={() => onNavigateTab('docs')}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                View changelog
              </button>
            </div>

            <div className="space-y-3">
              {recentDocs.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => onSelectDoc(doc)}
                  className="group p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 cursor-pointer transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                          Updated
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-xs text-slate-600 font-mono font-medium">{doc.lastUpdated}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {doc.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{doc.ownerRole}</span>
                    <span>Review Cadence: {doc.reviewCadence}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture & Governance Gateway */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>Enterprise Knowledge Architecture</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              Need to create new documentation or check placement rules?
            </h3>
            <p className="text-sm text-blue-100 font-normal leading-relaxed">
              Use our interactive Placement Wizard to prevent duplicate content, inspect the full MkDocs directory tree, or download pre-formatted Markdown templates with standardized YAML frontmatter.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onNavigateTab('wizard')}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-blue-900 bg-white hover:bg-blue-50 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Placement Wizard</span>
            </button>
            <button
              onClick={() => onNavigateTab('templates')}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-white bg-blue-700/60 hover:bg-blue-700 border border-blue-400/40 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Browse Templates</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
