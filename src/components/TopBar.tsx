import React from 'react';
import { Search, BookOpen } from 'lucide-react';

interface TopBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenSearch: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ activeTab, onTabChange, onOpenSearch }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16 max-w-7xl mx-auto">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                ITSD <span className="text-blue-600">DocPortal</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-600">
          <button
            onClick={() => onTabChange('home')}
            className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'home'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Portal Home
          </button>
          <button
            onClick={() => onTabChange('docs')}
            className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'docs'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Browse Docs
          </button>
          <button
            onClick={() => onTabChange('blueprint')}
            className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'blueprint'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Architecture Blueprint
          </button>
          <button
            onClick={() => onTabChange('wizard')}
            className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'wizard'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Placement Wizard
          </button>
          <button
            onClick={() => onTabChange('mkdocs')}
            className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'mkdocs'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            MkDocs Config
          </button>
          <button
            onClick={() => onTabChange('templates')}
            className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'templates'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => onTabChange('directory')}
            className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'directory'
                ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Owners Directory
          </button>
        </nav>

        {/* Zone 3: Search and Primary Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/90 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs transition-all shadow-xs group"
            title="Search documents (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="hidden sm:inline font-normal">Search ITSD Docs...</span>
            <span className="sm:hidden">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded text-slate-500 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => onTabChange('docs')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shadow-xs flex items-center gap-1.5"
          >
            <span>Open Docs</span>
          </button>
        </div>
      </div>

      {/* Mobile subnav */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 border-t border-slate-200 bg-slate-50/80 overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => onTabChange('home')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'home' ? 'bg-blue-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onTabChange('docs')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'docs' ? 'bg-blue-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Docs
        </button>
        <button
          onClick={() => onTabChange('blueprint')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'blueprint' ? 'bg-blue-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Blueprint
        </button>
        <button
          onClick={() => onTabChange('wizard')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'wizard' ? 'bg-blue-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Placement
        </button>
        <button
          onClick={() => onTabChange('mkdocs')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'mkdocs' ? 'bg-blue-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          MkDocs
        </button>
        <button
          onClick={() => onTabChange('templates')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'templates' ? 'bg-blue-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Templates
        </button>
        <button
          onClick={() => onTabChange('directory')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'directory' ? 'bg-blue-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Directory
        </button>
      </div>
    </header>
  );
};
