import React, { useState } from 'react';
import {
  Monitor,
  ClipboardList,
  Cpu,
  Search,
  GraduationCap,
  Layers,
  ChevronRight,
  ChevronDown,
  FileText,
  Copy,
  Check,
  Share2,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Clock,
  User,
  Shield,
  Tag,
  AlertCircle,
  HelpCircle,
  AlertTriangle,
  Info,
  Flame,
  ArrowRight,
  CheckCircle2,
  Filter,
  MessageSquare
} from 'lucide-react';
import { DocItem, DocCategory } from '../types/docs';

interface DocsViewProps {
  docs: DocItem[];
  selectedDocId: string;
  onSelectDoc: (doc: DocItem) => void;
  onNavigateTab: (tab: string) => void;
}

export const DocsView: React.FC<DocsViewProps> = ({
  docs,
  selectedDocId,
  onSelectDoc,
  onNavigateTab
}) => {
  const currentDoc = docs.find(d => d.id === selectedDocId) || docs[0];
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    applications: true,
    sops: true,
    operations: true,
    kb: true,
    onboarding: true,
    architecture: true
  });

  // Toggle category expansion in sidebar
  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(currentDoc.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleTask = (taskId: string) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Group docs by category
  const categories: { id: DocCategory; title: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'applications', title: 'Applications', icon: Monitor },
    { id: 'sops', title: 'SOPs', icon: ClipboardList },
    { id: 'operations', title: 'Operations', icon: Cpu },
    { id: 'kb', title: 'Troubleshooting / KB', icon: Search },
    { id: 'onboarding', title: 'New Hire Hub', icon: GraduationCap },
    { id: 'architecture', title: 'Architecture & Standards', icon: Layers }
  ];

  // Parse markdown headings for right sidebar TOC
  const headings = React.useMemo(() => {
    const lines = currentDoc.content.split('\n');
    const result: { id: string; text: string; level: number }[] = [];
    lines.forEach(line => {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);
      if (h2Match) {
        const text = h2Match[1].replace(/[`*]/g, '');
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        result.push({ id, text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].replace(/[`*]/g, '');
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        result.push({ id, text, level: 3 });
      }
    });
    return result;
  }, [currentDoc]);

  // Render Material for MkDocs syntax helper (Admonitions, checklists, code blocks)
  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeBuffer: string[] = [];
    let inAdmonition = false;
    let admonitionType = 'info';
    let admonitionTitle = '';
    let admonitionBuffer: string[] = [];
    let taskCounter = 0;

    const flushCodeBlock = (key: string) => {
      if (codeBuffer.length > 0) {
        const codeText = codeBuffer.join('\n');
        elements.push(
          <div key={key} className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 text-slate-400 text-[11px]">
              <span className="font-semibold text-blue-400 uppercase tracking-wider">{codeLanguage || 'text'}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(codeText);
                }}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                title="Copy code"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed font-mono">
              <code>{codeText}</code>
            </pre>
          </div>
        );
        codeBuffer = [];
      }
    };

    const flushAdmonition = (key: string) => {
      if (admonitionBuffer.length > 0) {
        const admText = admonitionBuffer.join('\n');
        let icon = <Info className="w-4 h-4 text-blue-600 shrink-0" />;
        let borderClass = 'border-l-4 border-blue-600 bg-blue-50/80 border-t border-r border-b border-blue-200 text-slate-800';
        let titleClass = 'text-blue-800 font-bold';

        if (admonitionType === 'tip') {
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
          borderClass = 'border-l-4 border-emerald-600 bg-emerald-50/80 border-t border-r border-b border-emerald-200 text-slate-800';
          titleClass = 'text-emerald-800 font-bold';
        } else if (admonitionType === 'warning') {
          icon = <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />;
          borderClass = 'border-l-4 border-amber-600 bg-amber-50/80 border-t border-r border-b border-amber-200 text-slate-800';
          titleClass = 'text-amber-800 font-bold';
        } else if (admonitionType === 'danger') {
          icon = <Flame className="w-4 h-4 text-rose-600 shrink-0" />;
          borderClass = 'border-l-4 border-rose-600 bg-rose-50/80 border-t border-r border-b border-rose-200 text-slate-800';
          titleClass = 'text-rose-800 font-bold';
        }

        elements.push(
          <div key={key} className={`my-4 p-4 rounded-xl shadow-xs ${borderClass}`}>
            <div className={`flex items-center gap-2 text-xs uppercase tracking-wider mb-1.5 ${titleClass}`}>
              {icon}
              <span>{admonitionTitle || admonitionType}</span>
            </div>
            <div className="text-xs text-slate-700 leading-relaxed font-normal">
              {admText}
            </div>
          </div>
        );
        admonitionBuffer = [];
      }
    };

    lines.forEach((line, idx) => {
      const key = `line-${idx}`;

      // Code block start/end
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          inCodeBlock = false;
          flushCodeBlock(key);
        } else {
          if (inAdmonition) {
            inAdmonition = false;
            flushAdmonition(key + '-adm');
          }
          inCodeBlock = true;
          codeLanguage = line.replace('```', '').trim();
          codeBuffer = [];
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Admonition start
      const admonitionMatch = line.match(/^!!!\s+(\w+)(?:\s+"([^"]+)")?/);
      if (admonitionMatch) {
        if (inAdmonition) {
          flushAdmonition(key + '-prev');
        }
        inAdmonition = true;
        admonitionType = admonitionMatch[1].toLowerCase();
        admonitionTitle = admonitionMatch[2] || admonitionMatch[1].toUpperCase();
        admonitionBuffer = [];
        return;
      }

      // Inside Admonition
      if (inAdmonition) {
        if (line.startsWith('    ') || line.startsWith('\t')) {
          admonitionBuffer.push(line.replace(/^( {4}|\t)/, ''));
          return;
        } else if (line.trim() === '') {
          admonitionBuffer.push('');
          return;
        } else {
          inAdmonition = false;
          flushAdmonition(key + '-flush');
        }
      }

      // Headings
      if (line.startsWith('# ')) {
        return;
      }

      if (line.startsWith('## ')) {
        const headingText = line.replace('## ', '');
        const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        elements.push(
          <h2 id={id} key={key} className="text-lg font-bold text-slate-900 tracking-tight mt-8 mb-3 pb-2 border-b border-slate-200 scroll-mt-20">
            {headingText}
          </h2>
        );
        return;
      }

      if (line.startsWith('### ')) {
        const headingText = line.replace('### ', '');
        const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        elements.push(
          <h3 id={id} key={key} className="text-sm font-bold text-blue-700 tracking-tight mt-5 mb-2 scroll-mt-20">
            {headingText}
          </h3>
        );
        return;
      }

      // Interactive Checklist items
      const taskMatch = line.match(/^-\s+\[([ xX])\]\s+(.+)$/);
      if (taskMatch) {
        taskCounter++;
        const taskId = `${currentDoc.id}-task-${taskCounter}`;
        const isDefaultChecked = taskMatch[1].toLowerCase() === 'x';
        const isChecked = checkedTasks[taskId] !== undefined ? checkedTasks[taskId] : isDefaultChecked;
        const taskLabel = taskMatch[2];

        elements.push(
          <div
            key={key}
            onClick={() => toggleTask(taskId)}
            className="flex items-start gap-3 my-2 p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50/50 border border-slate-200 cursor-pointer transition-colors shadow-2xs"
          >
            <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center transition-colors ${isChecked ? 'bg-blue-600 text-white' : 'border-2 border-slate-400 bg-white'}`}>
              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className={`text-xs select-none ${isChecked ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
              {taskLabel}
            </span>
          </div>
        );
        return;
      }

      // Bullet list items
      if (line.startsWith('- ')) {
        elements.push(
          <li key={key} className="text-xs text-slate-700 ml-4 list-disc leading-relaxed my-1">
            {line.replace('- ', '')}
          </li>
        );
        return;
      }

      // Ordered list items
      const orderedMatch = line.match(/^(\d+)\.\s+(.+)$/);
      if (orderedMatch) {
        elements.push(
          <div key={key} className="text-xs text-slate-700 flex items-start gap-2 my-1.5 leading-relaxed">
            <span className="font-mono text-blue-600 font-bold shrink-0">{orderedMatch[1]}.</span>
            <span>{orderedMatch[2]}</span>
          </div>
        );
        return;
      }

      // Table rows
      if (line.startsWith('|')) {
        elements.push(
          <div key={key} className="text-xs font-mono text-slate-700 overflow-x-auto my-0.5 py-1 px-2 bg-slate-100 rounded border border-slate-200">
            {line}
          </div>
        );
        return;
      }

      // Regular paragraph
      if (line.trim() !== '') {
        elements.push(
          <p key={key} className="text-xs text-slate-700 leading-relaxed my-2.5 font-normal">
            {line}
          </p>
        );
      }
    });

    if (inCodeBlock) flushCodeBlock('end-code');
    if (inAdmonition) flushAdmonition('end-adm');

    return elements;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Collapsible Multi-Level Navigation Tree      */}
        {/* ========================================================= */}
        <aside className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto shadow-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Documentation Tree
            </h3>
            <span className="text-[11px] font-mono text-slate-500 font-semibold tabular-nums">
              {docs.length} Articles
            </span>
          </div>

          {/* Quick filter in sidebar */}
          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={navSearchQuery}
              onChange={e => setNavSearchQuery(e.target.value)}
              placeholder="Filter tree..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
            />
          </div>

          {/* Category Tree Nodes */}
          <nav className="space-y-2">
            {categories.map(cat => {
              const catDocs = docs.filter(
                d =>
                  d.category === cat.id &&
                  (!navSearchQuery ||
                    d.title.toLowerCase().includes(navSearchQuery.toLowerCase()) ||
                    d.description.toLowerCase().includes(navSearchQuery.toLowerCase()))
              );

              if (catDocs.length === 0 && navSearchQuery) return null;

              const isExpanded = expandedCategories[cat.id] ?? true;
              const Icon = cat.icon;

              return (
                <div key={cat.id} className="space-y-1">
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-bold text-slate-800 hover:text-blue-600 hover:bg-blue-50 transition-colors group text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate">{cat.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
                      <span className="text-[10px] font-mono tabular-nums font-semibold">{catDocs.length}</span>
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="pl-3.5 space-y-0.5 border-l border-slate-200 ml-3 mt-1">
                      {catDocs.map(doc => {
                        const isActive = doc.id === currentDoc.id;
                        return (
                          <button
                            key={doc.id}
                            onClick={() => onSelectDoc(doc)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-all flex items-start justify-between gap-2 ${
                              isActive
                                ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 -ml-[1px]'
                                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                            }`}
                          >
                            <span className="truncate">{doc.title}</span>
                            {doc.tier && (
                              <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                {doc.tier}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="mt-6 pt-3 border-t border-slate-200">
            <button
              onClick={() => onNavigateTab('wizard')}
              className="w-full py-2 px-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[11px] font-bold text-blue-700 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>Where does my doc go?</span>
            </button>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* CENTER COLUMN: Document Reading Canvas                    */}
        {/* ========================================================= */}
        <main className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          {/* Breadcrumb Trail */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 flex-wrap">
            <span className="hover:text-blue-600 cursor-pointer font-medium" onClick={() => onNavigateTab('home')}>
              Home
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="capitalize font-medium">{currentDoc.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold truncate">{currentDoc.subcategory}</span>
          </div>

          {/* Document Header */}
          <div className="mb-6 pb-6 border-b border-slate-200">
            <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
                {currentDoc.title}
              </h1>
              {currentDoc.tier && (
                <span className="text-xs font-mono font-bold text-blue-700 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-md">
                  {currentDoc.tier}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {currentDoc.description}
            </p>

            {/* Metadata Badges (Zero-Pill Typography) */}
            <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap font-medium">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-slate-800 font-semibold">{currentDoc.owner}</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Updated: {currentDoc.lastUpdated}</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{currentDoc.estimatedReadTime}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-400 font-mono text-[11px] truncate max-w-[200px]">
                {currentDoc.folderPath}
              </span>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={handleCopyMarkdown}
                className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share</span>
              </button>
              <button
                onClick={() => onNavigateTab('templates')}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>View Template</span>
              </button>
            </div>
          </div>

          {/* Rendered Document Body */}
          <div className="prose prose-slate max-w-none">
            {renderMarkdown(currentDoc.content)}
          </div>

          {/* Document Feedback Box */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600 font-medium">
              Was this documentation helpful for your incident or workflow?
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFeedback('yes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs ${
                  feedback === 'yes'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Yes, resolved my issue</span>
              </button>
              <button
                onClick={() => setFeedback('no')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs ${
                  feedback === 'no'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>Needs update</span>
              </button>
            </div>
          </div>
        </main>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: On This Page TOC & Escalation Card         */}
        {/* ========================================================= */}
        <aside className="lg:col-span-3 space-y-6 sticky top-20">
          {/* On This Page TOC */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              On This Page
            </h4>
            {headings.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-slate-600 border-l border-slate-200 pl-3">
                {headings.map(h => (
                  <li key={h.id} className={h.level === 3 ? 'pl-2 text-slate-500' : ''}>
                    <a
                      href={`#${h.id}`}
                      className="hover:text-blue-600 font-medium transition-colors block truncate"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No sub-sections</p>
            )}
          </div>

          {/* Ownership & Escalation Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Support & Governance
              </h4>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-[11px] text-slate-500 block">Owner / Author</span>
                <span className="text-slate-900 font-bold">{currentDoc.owner}</span>
                <span className="text-slate-500 block text-[11px] font-medium">{currentDoc.ownerRole}</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 block">Review Cadence</span>
                <span className="text-slate-700 font-mono font-semibold text-[11px]">{currentDoc.reviewCadence}</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 block">Slack Support Channel</span>
                <a
                  href="#slack"
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>#team-iam-escalations</span>
                </a>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => onNavigateTab('directory')}
                className="w-full py-1 text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors text-left flex items-center justify-between"
              >
                <span>View Full Owner Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-slate-400" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Document Tags
              </h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentDoc.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[11px] font-mono font-medium text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 hover:border-blue-300 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
