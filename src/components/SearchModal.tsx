import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FileText, Monitor, ClipboardList, Cpu, GraduationCap, Layers } from 'lucide-react';
import { DocItem, DocCategory } from '../types/docs';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  docs: DocItem[];
  onSelectDoc: (doc: DocItem) => void;
  initialQuery?: string;
}

const CATEGORY_ICONS: Record<DocCategory, React.ReactNode> = {
  applications: <Monitor className="w-4 h-4 text-blue-600" />,
  sops: <ClipboardList className="w-4 h-4 text-emerald-600" />,
  operations: <Cpu className="w-4 h-4 text-purple-600" />,
  kb: <Search className="w-4 h-4 text-amber-600" />,
  'user-guides': <FileText className="w-4 h-4 text-cyan-600" />,
  architecture: <Layers className="w-4 h-4 text-blue-700" />,
  onboarding: <GraduationCap className="w-4 h-4 text-pink-600" />
};

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  docs,
  onSelectDoc,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDocs = docs.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase();
    const titleMatch = doc.title.toLowerCase().includes(q);
    const descMatch = doc.description.toLowerCase().includes(q);
    const tagMatch = doc.tags.some(t => t.toLowerCase().includes(q));
    const ownerMatch = doc.owner.toLowerCase().includes(q);
    const slugMatch = doc.slug.toLowerCase().includes(q);
    const contentMatch = doc.content.toLowerCase().includes(q);

    return titleMatch || descMatch || tagMatch || ownerMatch || slugMatch || contentMatch;
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredDocs.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredDocs[selectedIndex]) {
        onSelectDoc(filteredDocs[selectedIndex]);
        onClose();
      }
    }
  };

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Docs' },
    { id: 'applications', label: 'Applications' },
    { id: 'sops', label: 'SOPs' },
    { id: 'operations', label: 'Operations' },
    { id: 'kb', label: 'Troubleshooting / KB' },
    { id: 'onboarding', label: 'New Hire Hub' },
    { id: 'architecture', label: 'Architecture' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation by title, error code, keyword, or owner..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-slate-500 hover:text-slate-900 bg-slate-100 rounded border border-slate-200 transition-colors font-semibold"
          >
            ESC
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-100">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={doc.id}
                  onClick={() => {
                    onSelectDoc(doc);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-50/80 border border-blue-300 shadow-2xs'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="mt-1 shrink-0 p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                      {CATEGORY_ICONS[doc.category] || <FileText className="w-4 h-4 text-slate-500" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900 tracking-tight truncate">
                          {doc.title}
                        </h4>
                        {doc.tier && (
                          <span className="text-[11px] font-mono font-semibold text-blue-700 bg-blue-100/70 px-1.5 py-0.2 rounded">
                            {doc.tier}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5 font-normal">
                        {doc.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500 font-medium">
                        <span className="capitalize font-semibold text-blue-600">{doc.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{doc.ownerRole}</span>
                        <span aria-hidden="true">·</span>
                        <span>{doc.estimatedReadTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 mt-2 text-slate-400">
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-blue-600 translate-x-0.5' : ''}`} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No matching documentation found</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for "Okta", "SOP", "502", "Onboarding", or "ServiceNow"
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-slate-700 shadow-2xs">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-slate-700 shadow-2xs">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-slate-700 shadow-2xs">Enter</kbd> to select</span>
          </div>
          <span className="tabular-nums font-mono font-semibold text-slate-700">
            {filteredDocs.length} {filteredDocs.length === 1 ? 'result' : 'results'}
          </span>
        </div>
      </div>
    </div>
  );
};
