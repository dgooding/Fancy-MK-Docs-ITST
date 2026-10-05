import React, { useState, useEffect } from 'react';
import { mockDocs } from './data/mockDocs';
import { DocItem, DocCategory } from './types/docs';
import { TopBar } from './components/TopBar';
import { HomeView } from './components/HomeView';
import { DocsView } from './components/DocsView';
import { BlueprintView } from './components/BlueprintView';
import { PlacementWizard } from './components/PlacementWizard';
import { MkDocsConfigView } from './components/MkDocsConfigView';
import { TemplatesView } from './components/TemplatesView';
import { DirectoryView } from './components/DirectoryView';
import { SearchModal } from './components/SearchModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedDocId, setSelectedDocId] = useState<string>(mockDocs[0].id);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');

  // Global keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectDoc = (doc: DocItem) => {
    setSelectedDocId(doc.id);
    setActiveTab('docs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (category: DocCategory) => {
    const firstDocInCategory = mockDocs.find(d => d.category === category);
    if (firstDocInCategory) {
      setSelectedDocId(firstDocInCategory.id);
    }
    setActiveTab('docs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSearch = (initialQuery = '') => {
    setSearchInitialQuery(initialQuery);
    setIsSearchOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Bar Header */}
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSearch={() => handleOpenSearch('')}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            docs={mockDocs}
            onSelectDoc={handleSelectDoc}
            onSelectCategory={handleSelectCategory}
            onOpenSearch={handleOpenSearch}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'docs' && (
          <DocsView
            docs={mockDocs}
            selectedDocId={selectedDocId}
            onSelectDoc={handleSelectDoc}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'blueprint' && (
          <BlueprintView onNavigateTab={setActiveTab} />
        )}

        {activeTab === 'wizard' && (
          <PlacementWizard
            onSelectCategory={handleSelectCategory}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'mkdocs' && <MkDocsConfigView />}

        {activeTab === 'templates' && <TemplatesView />}

        {activeTab === 'directory' && <DirectoryView />}
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        docs={mockDocs}
        onSelectDoc={handleSelectDoc}
        initialQuery={searchInitialQuery}
      />

      {/* Quiet Global Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-slate-800">ITSD <span className="text-blue-600">DocPortal</span></span>
            <span aria-hidden="true">·</span>
            <span>Enterprise Single Source of Truth</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <button onClick={() => setActiveTab('blueprint')} className="hover:text-blue-600 transition-colors">
              Architecture Blueprint
            </button>
            <button onClick={() => setActiveTab('wizard')} className="hover:text-blue-600 transition-colors">
              Placement Rules
            </button>
            <button onClick={() => setActiveTab('mkdocs')} className="hover:text-blue-600 transition-colors">
              MkDocs YAML
            </button>
            <button onClick={() => setActiveTab('templates')} className="hover:text-blue-600 transition-colors">
              Templates
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
