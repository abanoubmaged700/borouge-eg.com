import React from 'react';
import { CompanyDetails, LanguageMode } from '../types';
import { Printer, Share2, Building2, Globe2, Sparkles } from 'lucide-react';

interface HeaderProps {
  company: CompanyDetails;
  languageMode: LanguageMode;
  onLanguageChange: (mode: LanguageMode) => void;
  onOpenPdf: () => void;
  onOpenLinkedInModal: () => void;
  onOpenCompanyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  company,
  languageMode,
  onLanguageChange,
  onOpenPdf,
  onOpenLinkedInModal,
  onOpenCompanyModal,
}) => {
  const getTopNotice = () => {
    switch (languageMode) {
      case 'de':
        return 'Zertifiziertes ägyptisches IQF-Verarbeitungswerk';
      case 'ar':
        return 'مصنع تجميد زراعي مصري معتمد IQF';
      default:
        return 'Certified Egyptian IQF Processing Factory';
    }
  };

  const getPortNotice = () => {
    switch (languageMode) {
      case 'de':
        return `Verschiffungshäfen: ${company.portOfLoadingDe || company.portOfLoadingEn}`;
      case 'ar':
        return `موانئ الشحن: ${company.portOfLoadingAr}`;
      default:
        return `Ports of Loading: ${company.portOfLoadingEn}`;
    }
  };

  const getColdChainNotice = () => {
    switch (languageMode) {
      case 'de':
        return 'Tiefkühlkette: Durchgehend -18°C';
      case 'ar':
        return 'سلسلة تبريد مستمرة -18°C';
      default:
        return 'Cold Chain: -18°C Const.';
    }
  };

  const getCompanyName = () => {
    switch (languageMode) {
      case 'de':
        return company.nameDe || company.nameEn;
      case 'ar':
        return company.nameAr;
      default:
        return company.nameEn;
    }
  };

  const getSlogan = () => {
    switch (languageMode) {
      case 'de':
        return company.sloganDe || company.sloganEn;
      case 'ar':
        return company.sloganAr;
      default:
        return company.sloganEn;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-emerald-900 text-white border-b-4 border-emerald-500 shadow-md no-print">
      {/* Top International Trade Notice Bar */}
      <div className="bg-emerald-950/80 text-emerald-200 text-xs px-4 py-1.5 font-medium flex items-center justify-between border-b border-emerald-800/60">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold tracking-wide uppercase text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {getTopNotice()}
          </span>
          <span className="hidden md:inline text-emerald-700">|</span>
          <span className="hidden md:inline text-emerald-200/90 text-[11px] uppercase tracking-wider">
            {getPortNotice()}
          </span>
        </div>
        <div className="flex items-center gap-4 text-emerald-200">
          <span className="hidden sm:inline text-[11px] uppercase tracking-wider">
            {getColdChainNotice()}
          </span>
          <span className="text-emerald-300 font-mono font-bold text-[11px] tracking-widest">
            ISO 22000 • HACCP • ISO 9001 • HALAL
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Company Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-lg bg-emerald-800 text-white flex flex-col items-center justify-center font-bold shadow-inner border border-emerald-600 flex-shrink-0">
            <span className="text-lg leading-tight">IQF</span>
            <span className="text-[9px] uppercase tracking-widest text-emerald-300 font-mono">PLANT</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight uppercase text-white">
                {getCompanyName()}
              </h1>
              {languageMode === 'bilingual' && (
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-800/80 text-emerald-200 font-semibold border border-emerald-700">
                  {company.nameAr}
                </span>
              )}
            </div>
            <p className="text-xs text-emerald-300 font-medium tracking-wide">
              {getSlogan()}
            </p>
          </div>
        </div>

        {/* Header Controls & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Language Mode Toggle */}
          <div className="inline-flex rounded-md bg-emerald-950/80 p-0.5 border border-emerald-700/80 text-xs font-semibold">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1.5 rounded transition-all ${
                languageMode === 'en'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
              title="English (Export Catalog)"
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange('de')}
              className={`px-2.5 py-1.5 rounded transition-all ${
                languageMode === 'de'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
              title="Deutsch (EU-Exportkatalog)"
            >
              Deutsch
            </button>
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-2.5 py-1.5 rounded transition-all font-arabic ${
                languageMode === 'ar'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
              title="العربية (كتالوج باللغة العربية)"
            >
              العربية
            </button>
            <button
              onClick={() => onLanguageChange('bilingual')}
              className={`px-2.5 py-1.5 rounded transition-all ${
                languageMode === 'bilingual'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
              title="Bilingual EN / AR"
            >
              <Globe2 className="w-3 h-3 inline mr-1" />
              EN / AR
            </button>
          </div>

          {/* Official Website Link */}
          <a
            href={`https://${company.website.replace(/^https?:\/\//, '')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-emerald-700 bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800 hover:text-white text-xs font-semibold transition-colors"
            title="Visit official website (borouge-eg.com)"
          >
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline font-mono">{company.website}</span>
          </a>

          {/* Edit Factory Info Button */}
          <button
            onClick={onOpenCompanyModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-emerald-700 bg-emerald-800/80 text-emerald-100 hover:bg-emerald-700 hover:text-white text-xs font-semibold transition-colors"
            title="Edit plant specs and contact coordinates"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-300" />
            <span className="hidden sm:inline">
              {languageMode === 'ar' ? 'بيانات المصنع' : languageMode === 'de' ? 'Werksdaten' : 'Plant Info'}
            </span>
          </button>

          {/* LinkedIn & Pitch Copy Button */}
          <button
            onClick={onOpenLinkedInModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-800 border border-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold transition-colors shadow-xs"
            title="Generate & copy LinkedIn B2B posts and Buyer messages"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>
              {languageMode === 'ar' ? 'تسويق لينكدإن' : languageMode === 'de' ? 'B2B Pitch' : 'LinkedIn Pitch'}
            </span>
          </button>

          {/* PDF Download / Print Button */}
          <button
            onClick={onOpenPdf}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:bg-emerald-600 text-xs font-bold tracking-wide uppercase shadow-sm transition-all"
            title="Download or Print full A4 B2B Catalog PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>
              {languageMode === 'ar'
                ? 'طباعة PDF'
                : languageMode === 'de'
                ? 'Katalog PDF'
                : 'Export PDF'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
