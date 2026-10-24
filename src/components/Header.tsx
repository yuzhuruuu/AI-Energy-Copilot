import React, { useState } from 'react';
import { Zap, Download, Menu, X, Building2, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onDownloadReport: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onDownloadReport,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'ringkasan', label: 'Ringkasan' },
    { id: 'input-data', label: 'Input Harian' },
    { id: 'analisis-beban', label: 'Analisis Beban' },
    { id: 'rekomendasi-ai', label: 'Rekomendasi AI' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand title, single line */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <a
              href="#ringkasan"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('ringkasan');
              }}
              className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap hover:text-blue-600 transition-colors"
            >
              AI Energy Copilot
            </a>
          </div>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`cursor-pointer whitespace-nowrap transition-colors pb-1 text-sm ${
                    isActive
                      ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onDownloadReport}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              title="Unduh ringkasan efisiensi energi bulan ini"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Ringkasan</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown nav */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeSection === link.id
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  onDownloadReport();
                  setMobileMenuOpen(false);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Ringkasan</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
