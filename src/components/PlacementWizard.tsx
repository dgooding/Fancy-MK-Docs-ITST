import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileCode2,
  Copy,
  Check,
  FolderTree,
  Monitor,
  ClipboardList,
  Cpu,
  Search,
  BookOpen,
  Layers,
  GraduationCap
} from 'lucide-react';
import { placementRules } from '../data/blueprintData';
import { DocCategory } from '../types/docs';

interface PlacementWizardProps {
  onSelectCategory: (category: DocCategory) => void;
  onNavigateTab: (tab: string) => void;
}

export const PlacementWizard: React.FC<PlacementWizardProps> = ({ onSelectCategory, onNavigateTab }) => {
  const [docTypeQuestion, setDocTypeQuestion] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [activeRuleTab, setActiveRuleTab] = useState<DocCategory>('applications');

  const getRecommendation = () => {
    if (!docTypeQuestion) return null;

    if (docTypeQuestion === 'app_architecture') {
      return {
        category: 'applications' as DocCategory,
        title: 'Applications Directory',
        folderPath: 'docs/applications/<app-name>/index.md',
        reason: 'This document details the architectural topology, integration endpoints, or access models of a specific software platform.',
        ssoRule: 'Canonical architecture must live here. SOPs and Runbooks link to this file instead of re-explaining architecture.'
      };
    }

    if (docTypeQuestion === 'step_procedure') {
      return {
        category: 'sops' as DocCategory,
        title: 'Standard Operating Procedures (SOPs)',
        folderPath: 'docs/sops/<domain>/sop-<procedure-name>.md',
        reason: 'This document contains sequential, numbered operational steps, prerequisites, and verification checkboxes with audit requirements.',
        ssoRule: 'All procedural steps live in SOPs. Never duplicate steps in application specs.'
      };
    }

    if (docTypeQuestion === 'ops_runbook') {
      return {
        category: 'operations' as DocCategory,
        title: 'Operations & Runbooks',
        folderPath: 'docs/operations/runbooks/<service>-runbook.md',
        reason: 'This document provides maintenance routines, batch schedules, service health metrics, or restart procedures for operational teams.',
        ssoRule: 'Operations docs focus on system maintenance and telemetry commands.'
      };
    }

    if (docTypeQuestion === 'error_fix') {
      return {
        category: 'kb' as DocCategory,
        title: 'Knowledge Base (KB) & Troubleshooting',
        folderPath: 'docs/kb/troubleshooting/kb-<error-or-symptom>.md',
        reason: 'This document is a rapid diagnostic card for a specific error code, HTTP status, or localized hardware symptom.',
        ssoRule: 'Keep KB articles atomic and fast to scan. If remediation requires executing an entire workflow, link to the SOP.'
      };
    }

    if (docTypeQuestion === 'onboarding') {
      return {
        category: 'onboarding' as DocCategory,
        title: 'New Hire Hub',
        folderPath: 'docs/onboarding/<phase>.md',
        reason: 'This document is structured to accelerate new technician training, sandbox provisioning, and learning roadmaps.',
        ssoRule: 'New hire hub acts as a curated gateway linking directly to existing SOPs and Application specs.'
      };
    }

    return {
      category: 'architecture' as DocCategory,
      title: 'Architecture & Standards',
      folderPath: 'docs/architecture/standards/<standard-name>.md',
      reason: 'This document establishes governance, Architectural Decision Records (ADRs), or documentation quality standards.',
      ssoRule: 'Standards govern the portal and global enterprise policies.'
    };
  };

  const recommendation = getRecommendation();

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentRule = placementRules.find(r => r.category === activeRuleTab) || placementRules[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-blue-200">
          <Compass className="w-4 h-4" />
          <span>Interactive Content Placement Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          Where Does My Document Belong?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Prevent duplicate documentation and preserve our Single Source of Truth (SSoT) by using our interactive placement engine or reviewing the placement rules matrix.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Interactive Placement Wizard */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Placement Decision Wizard</span>
            </h2>

            {/* Question 1 */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                1. What is the primary purpose of your document?
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: 'app_architecture',
                    label: 'Application Technical Spec / Architecture / Integrations',
                    desc: 'Details system topology, SAML/OIDC SSO, data flows, APIs, or access groups for a specific tool.'
                  },
                  {
                    id: 'step_procedure',
                    label: 'Step-by-Step Procedural Workflow / SOP',
                    desc: 'Numbered operational instructions with explicit roles, SLAs, checklists, and compliance requirements.'
                  },
                  {
                    id: 'ops_runbook',
                    label: 'Operations Runbook / Batch Schedule / Monitoring Telemetry',
                    desc: 'Daily maintenance, restart commands, synthetic probe configs, or cron job schedules.'
                  },
                  {
                    id: 'error_fix',
                    label: 'Specific Error Code / Fast Symptom Troubleshooting',
                    desc: 'Quick diagnostic lookups for error codes (e.g. 502 Bad Gateway, SAML 400, VPN timeout).'
                  },
                  {
                    id: 'onboarding',
                    label: 'New Hire Training / 30-Day Learning Path / Sandbox Setup',
                    desc: 'Accelerating onboarding for incoming technicians with curated reading and sandbox access.'
                  },
                  {
                    id: 'standards',
                    label: 'Governance / Architecture Decision Record (ADR) / Standards',
                    desc: 'Global standards, naming rules, ADR decisions, or template definitions.'
                  }
                ].map(opt => (
                  <label
                    key={opt.id}
                    onClick={() => setDocTypeQuestion(opt.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                      docTypeQuestion === opt.id
                        ? 'bg-blue-50/80 border-blue-600 text-slate-900 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-blue-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="docType"
                      checked={docTypeQuestion === opt.id}
                      onChange={() => setDocTypeQuestion(opt.id)}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{opt.label}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Recommendation Output Card */}
            {recommendation ? (
              <div className="mt-6 p-5 rounded-xl bg-blue-50/60 border-2 border-blue-600 shadow-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Target Destination: {recommendation.title}</span>
                </div>

                <div className="p-3 bg-white border border-blue-200 rounded-lg flex items-center justify-between gap-3 font-mono text-xs text-blue-800 font-semibold mb-3 shadow-2xs">
                  <span className="truncate">{recommendation.folderPath}</span>
                  <button
                    onClick={() => handleCopyPath(recommendation.folderPath)}
                    className="p-1 text-slate-500 hover:text-blue-600 rounded transition-colors shrink-0"
                    title="Copy path"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="text-xs text-slate-700 leading-relaxed mb-3">
                  <strong>Why it belongs here</strong>: {recommendation.reason}
                </div>

                <div className="p-3 rounded-lg bg-blue-100/70 border border-blue-200 text-xs text-blue-900 mb-4">
                  <strong>Single Source of Truth Rule</strong>: {recommendation.ssoRule}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigateTab('templates')}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <span>Get Template for this Doc</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectCategory(recommendation.category)}
                    className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg text-xs font-semibold transition-colors shadow-2xs"
                  >
                    Browse Existing Docs
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 font-medium">
                Select a content purpose above to see its destination folder, naming standard, and template.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Placement Rules Matrix */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-blue-600" />
              <span>Placement Rules Matrix</span>
            </h2>
            <p className="text-xs text-slate-600 mb-4">
              Select a category to inspect its definitive boundaries and prevent duplicate information.
            </p>

            {/* Category Selector Buttons */}
            <div className="grid grid-cols-2 gap-1.5 mb-5">
              {placementRules.map(rule => (
                <button
                  key={rule.category}
                  onClick={() => setActiveRuleTab(rule.category)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors truncate ${
                    activeRuleTab === rule.category
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 border border-slate-200'
                  }`}
                >
                  {rule.categoryName}
                </button>
              ))}
            </div>

            {/* Active Rule Details */}
            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200">
                <div className="text-blue-800 font-bold mb-1">Primary Mandate</div>
                <div className="text-slate-700">{currentRule.primaryPurpose}</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>What BELONGS Here</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 pl-4 list-disc">
                  {currentRule.whatBelongs.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-rose-700 font-bold mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>What DOES NOT Belong Here</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 pl-4 list-disc">
                  {currentRule.whatDoesNotBelong.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <div className="text-slate-500 text-[11px] font-semibold mb-1">Recommended File Path Pattern:</div>
                <code className="text-blue-700 font-mono text-[11px] block bg-slate-50 p-2.5 rounded border border-slate-200 break-all font-bold">
                  {currentRule.recommendedNaming}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
