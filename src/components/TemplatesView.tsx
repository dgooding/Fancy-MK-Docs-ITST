import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  FileCode2,
  Sparkles,
  Layers,
  Monitor,
  ClipboardList,
  Cpu,
  Search
} from 'lucide-react';
import { docTemplates } from '../data/blueprintData';
import { DocTemplate } from '../types/docs';

export const TemplatesView: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(docTemplates[0].id);
  const [copied, setCopied] = useState(false);

  const selectedTemplate = docTemplates.find(t => t.id === selectedTemplateId) || docTemplates[0];

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(selectedTemplate.markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTemplate = () => {
    const fileName = selectedTemplate.targetFileName.split('/').pop() || 'template.md';
    const blob = new Blob([selectedTemplate.markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-blue-200">
          <FileText className="w-4 h-4" />
          <span>Standardized Documentation Authoring</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          Authoring Templates Library
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Standardized Markdown templates equipped with enterprise YAML frontmatter, Material for MkDocs admonitions, checklist structures, and single source of truth references.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Template Selector Cards */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
            Available Templates ({docTemplates.length})
          </div>

          {docTemplates.map(tpl => {
            const isSelected = tpl.id === selectedTemplate.id;
            return (
              <div
                key={tpl.id}
                onClick={() => setSelectedTemplateId(tpl.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border text-left ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-600 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono font-bold text-blue-700 uppercase">
                    {tpl.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-semibold">.md</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {tpl.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 font-normal">
                  {tpl.description}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500 truncate font-medium">
                  {tpl.targetFileName}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Template Code & Preview */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex-wrap gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                  {selectedTemplate.title}
                </h2>
                <span className="text-xs font-mono font-semibold text-blue-700">
                  Target: {selectedTemplate.targetFileName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
                </button>
                <button
                  onClick={handleDownloadTemplate}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>
              </div>
            </div>

            <pre className="p-5 font-mono text-xs text-slate-800 overflow-x-auto max-h-[600px] leading-relaxed bg-white">
              <code>{selectedTemplate.markdownContent}</code>
            </pre>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-xs text-slate-600 space-y-2">
            <div className="font-bold text-slate-900">Frontmatter Schema Compliance:</div>
            <p className="leading-relaxed font-normal">
              Every template includes standard YAML frontmatter fields (<code>title</code>, <code>description</code>, <code>category</code>, <code>owner</code>, <code>review_cadence</code>, <code>estimated_read_time</code>, <code>tier</code>) required by our automated CI/CD documentation linter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
