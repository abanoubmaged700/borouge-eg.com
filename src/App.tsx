import React, { useState, useMemo } from 'react';
import { productsList, defaultCompanyDetails } from './data/products';
import { Product, CompanyDetails, LanguageMode } from './types';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { GeneralSpecsSection } from './components/GeneralSpecsSection';
import { LinkedInPitchModal } from './components/LinkedInPitchModal';
import { CompanyEditModal } from './components/CompanyEditModal';
import { SpecSheetModal } from './components/SpecSheetModal';
import { CatalogPdfView } from './components/CatalogPdfView';
import { AiPdfStudioModal } from './components/AiPdfStudioModal';
import { preloadAllImages } from './utils/imagePreloader';
import { DEFAULT_PRODUCT_IMAGES } from './data/productImages';
import {
  Search,
  Printer,
  Share2,
  Snowflake,
  ShieldCheck,
  Ship,
  Sparkles,
  ArrowUp,
  MessageCircle,
  Award,
  Layers,
  FileSpreadsheet,
  Bot
} from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(productsList);
  const [company, setCompany] = useState<CompanyDetails>(defaultCompanyDetails);
  const [languageMode, setLanguageMode] = useState<LanguageMode>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'vegetables' | 'specialties' | 'fruits'>('all');
  
  // Modals state
  const [selectedProductForSpec, setSelectedProductForSpec] = useState<Product | null>(null);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isPdfStudioOpen, setIsPdfStudioOpen] = useState(false);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      let matchesCat = true;
      if (selectedCategory === 'vegetables') {
        matchesCat = ['okra', 'green-peas', 'green-beans', 'broccoli-cauliflower', 'diced-carrots', 'mixed-vegetables', 'diced-onions'].includes(item.id);
      } else if (selectedCategory === 'specialties') {
        matchesCat = ['artichoke-bottoms', 'peeled-garlic', 'frozen-falafel', 'french-fries'].includes(item.id);
      } else if (selectedCategory === 'fruits') {
        matchesCat = ['whole-strawberries', 'pomegranate-seeds'].includes(item.id);
      }

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.nameEn.toLowerCase().includes(q) ||
        (item.nameDe && item.nameDe.toLowerCase().includes(q)) ||
        item.nameAr.includes(q) ||
        item.categoryEn.toLowerCase().includes(q) ||
        item.technicalSpecs.sizeEn.toLowerCase().includes(q) ||
        item.marketingDescEn.toLowerCase().includes(q) ||
        item.marketingDescAr.includes(q);

      return matchesCat && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handlePrintPdf = async () => {
    // Preload and decode all images into browser cache before print
    const urls = products.map((p) => DEFAULT_PRODUCT_IMAGES[p.id] || `/images/products/${p.id}.jpg`);
    await preloadAllImages(urls);
    window.print();
  };

  const isAr = languageMode === 'ar';
  const isDe = languageMode === 'de';
  const isBilingual = languageMode === 'bilingual';

  // Localized texts for App UI
  const getHeroBadge = () => {
    if (isAr) return 'كتالوج التصدير المعتمد من المصنع • إصدار 2025 / 2026';
    if (isDe) return 'B2B-Exportkatalog • Ausgabe 2025/2026 • Direkt ab Werk';
    return 'B2B Factory Export Catalog • 2025/2026 Edition';
  };

  const getHeroTitleLine1 = () => {
    if (isAr) return 'خضروات وفواكه مجمدة فاخرة';
    if (isDe) return 'Premium IQF Schockgefrostetes';
    return 'Premium IQF Frozen';
  };

  const getHeroTitleLine2 = () => {
    if (isAr) return 'تجميد سريع IQF درجة أولى للتصدير الدولي';
    if (isDe) return 'Gemüse & Früchte für den EU-Markt';
    return 'Vegetables & Fruits';
  };

  const getHeroDesc = () => {
    if (isAr) {
      return 'المواصفات الفنية القياسية المعتمدة لـ ١٢ صنفاً من الخضروات، الفواكه، والمحاصيل المصرية المجهزة بأحدث تقنيات التجميد السريع IQF في مصنع بوروج. مخصص للمستوردين، كبرى سلاسل التوزيع، وقطاع التصنيع الغذائي في جميع أنحاء العالم.';
    }
    if (isDe) {
      return 'Offizielle B2B-Exportspezifikationen für 12 erntefrische ägyptische IQF-Gemüse-, Obst- und Spezialitätensorten aus unserem hochmodernen Verarbeitungswerk. Konzipiert für europäische Importeure, Großhändler und die Lebensmittelindustrie mit lückenlos überwachter Tiefkühlkette (-18°C).';
    }
    return 'Official B2B export specifications for 12 harvest-fresh Egyptian IQF vegetables, specialty crops, and fruits processed in our modern IQF facility. Tailored for food importers, retail distributors, and HoReCa buyers seeking Grade-A quality and certified -18°C continuous cold chain integrity.';
  };

  const getSearchPlaceholder = () => {
    if (isAr) return 'ابحث باسم المنتج، الصنف، أو المواصفة (مثال: بامية، فراولة، IQF)...';
    if (isDe) return 'Produkte durchsuchen (z.B. Okra, Erdbeeren, Erbsen, IQF)...';
    return 'Search products by name, caliber, or specs (e.g., Okra, Strawberries, IQF)...';
  };

  const getCategoryTitle = () => {
    if (isAr) {
      if (selectedCategory === 'vegetables') return '٠١. خضروات رئيسية (درجة أولى IQF)';
      if (selectedCategory === 'specialties') return '٠٢. أصناف خاصة وتراثية';
      if (selectedCategory === 'fruits') return '٠٣. فواكه وحبوب مجمدة';
      return `قائمة التصدير الكاملة لمصنع بروج (${products.length} صنفاً)`;
    }
    if (isDe) {
      if (selectedCategory === 'vegetables') return '01. Premium-Gemüse (IQF Klasse A)';
      if (selectedCategory === 'specialties') return '02. Spezialitäten & Traditionelle Beilagen';
      if (selectedCategory === 'fruits') return '03. Tiefkühlfrüchte & Granatapfelkerne';
      return `Komplettes B2B-Exportportfolio (${products.length} IQF-Sorten)`;
    }
    if (selectedCategory === 'vegetables') return '01. Premium Vegetables (IQF Grade A)';
    if (selectedCategory === 'specialties') return '02. Specialties & Heritage Sides';
    if (selectedCategory === 'fruits') return '03. Frozen Fruits & Ruby Arils';
    return `Complete B2B Export Portfolio (${products.length} IQF Items)`;
  };

  const getWhyChooseTitle = () => {
    if (isAr) return 'لماذا مصنع بوروج للتجميد السريع (IQF)؟';
    if (isDe) return 'Warum das Borouge IQF-Verarbeitungswerk?';
    return 'Why Borouge IQF Processing Factory?';
  };

  const getWhyChooseText = () => {
    if (isAr) {
      return 'نحن مصنع متخصص في التجميد السريع الفردي (IQF) بأحدث خطوط المعالجة السويسرية والأوروبية، حيث يتم فرز وغسيل وتجميد الحاصلات الزراعية المصرية الممتازة في غضون ساعات معدودة من حصادها، لضمان أعلى معايير النقاء، اللون الطبيعي الزاهي، والملمس المقرمش الطازج لشركائنا التجاريين حول العالم.';
    }
    if (isDe) {
      return 'Als hochspezialisiertes IQF-Verarbeitungswerk in Ägypten verarbeiten und schockfrosten wir erstklassige agrarische Rohwaren binnen weniger Stunden nach der Feldente. Modernste Wirbelschicht-Gefrieranlagen garantieren vollständigen Nährstofferhalt, strahlende Naturfarben und knackige Zellstrukturen nach strengen europäischen Standards.';
    }
    return 'As a dedicated Egyptian IQF processing factory, we bridge the harvest fields to international markets through cutting-edge fluidized-bed freezing technology. Every crop is graded, washed, and flash-frozen within hours of harvest to lock in authentic flavors, vital nutrients, and crisp cell structures for our global B2B procurement partners.';
  };

  const getInquiryBannerTitle = () => {
    if (isAr) return 'جاهزون لتلقي طلباتكم وعقود التوريد السنوية';
    if (isDe) return 'Bereit für Ihre B2B-Bestellungen & Lieferkontrakte?';
    return 'Ready to Procure Grade-A Egyptian IQF Produce?';
  };

  const getInquiryBannerDesc = () => {
    if (isAr) {
      return 'تواصل مباشرة مع إدارة التصدير بمصنع بوروج لطلب عروض الأسعار التصديرية (FOB / CIF)، العينات، شهادات التحليل المخبري، أو إمكانية التعبئة بالعلامة التجارية الخاصة (Private Label).';
    }
    if (isDe) {
      return 'Kontaktieren Sie unser internationales Exportbüro für individuelle FOB/CIF-Angebote, Musteranforderungen, Analysenzertifikate oder Private-Label-Verpackungslösungen für den europäischen Markt.';
    }
    return 'Contact the Borouge commercial export desk to request customized FOB/CIF price quotes, sample shipments, certificates of analysis, or Private Label (OEM) packaging proposals.';
  };

  return (
    <div className={`min-h-screen bg-slate-50/70 text-slate-900 ${isAr ? 'font-arabic' : 'font-sans'}`}>
      {/* Printable View (Rendered only on media print) */}
      <CatalogPdfView
        products={products}
        company={company}
        languageMode={languageMode}
      />

      {/* Screen View */}
      <div className="no-print">
        {/* Navigation & Brand Header */}
        <Header
          company={company}
          languageMode={languageMode}
          onLanguageChange={setLanguageMode}
          onOpenPdf={() => setIsPdfStudioOpen(true)}
          onOpenLinkedInModal={() => setIsLinkedInModalOpen(true)}
          onOpenCompanyModal={() => setIsCompanyModalOpen(true)}
        />

        {/* Hero Section */}
        <div className="bg-emerald-950 text-white border-b-4 border-emerald-500 relative overflow-hidden">
          {/* Ambient Radial Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-900/80 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4">
                <Snowflake className="w-3.5 h-3.5 text-emerald-400" />
                <span>{getHeroBadge()}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white leading-tight mb-3">
                {getHeroTitleLine1()}{' '}
                <span className="font-light text-emerald-300">{getHeroTitleLine2()}</span>
              </h1>

              {/* Arabic Headline if bilingual */}
              {isBilingual && (
                <h2 className="text-lg sm:text-2xl font-bold font-arabic text-emerald-200 mb-5" dir="rtl">
                  كتالوج تصدير الخضروات والفواكه المجمدة IQF فائقة الجودة للتصدير الدولي
                </h2>
              )}

              {/* Description */}
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6">
                {getHeroDesc()}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsPdfStudioOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all ring-2 ring-emerald-300/60"
                >
                  <Bot className="w-4 h-4" />
                  <span>
                    {isAr
                      ? 'استوديو وفحص PDF بالذكاء الاصطناعي'
                      : isDe
                      ? 'KI-PDF-Studio & Export'
                      : 'AI PDF Studio & Export'}
                  </span>
                  <span className="px-1.5 py-0.5 bg-emerald-900 text-emerald-200 rounded text-[10px] font-mono">
                    AI
                  </span>
                </button>

                <button
                  onClick={handlePrintPdf}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all"
                  title="طباعة فورية مباشرة"
                >
                  <Printer className="w-4 h-4 text-emerald-300" />
                  <span>{isAr ? 'طباعة مباشرة' : 'Direct Print'}</span>
                </button>

                <button
                  onClick={() => setIsLinkedInModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all"
                >
                  <Share2 className="w-4 h-4 text-emerald-300" />
                  <span>
                    {isAr
                      ? 'منشور لينكدإن ومحتوى المشترين'
                      : isDe
                      ? 'LinkedIn & B2B-Anschreiben'
                      : 'LinkedIn Pitch & Buyer Copy'}
                  </span>
                </button>

                <a
                  href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-emerald-900 hover:bg-emerald-800 border border-emerald-700 text-emerald-100 font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>
                    {isAr
                      ? 'تواصل مع إدارة التصدير'
                      : isDe
                      ? 'Exportbüro (WhatsApp)'
                      : 'Export Desk (WhatsApp)'}
                  </span>
                </a>
              </div>
            </div>

            {/* Quick Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-8 pt-6 border-t border-emerald-800/80 text-xs">
              <div className="bg-emerald-900/60 p-3.5 rounded border border-emerald-800">
                <span className="text-emerald-300 uppercase tracking-wider text-[11px] block font-bold">
                  {isAr ? 'قائمة المنتجات' : isDe ? 'Exportportfolio' : 'Export Portfolio'}
                </span>
                <span className="text-white font-mono font-bold text-lg">
                  {isAr ? '١٢ صنفاً IQF' : '12 IQF Products'}
                </span>
              </div>
              <div className="bg-emerald-900/60 p-3.5 rounded border border-emerald-800">
                <span className="text-emerald-300 uppercase tracking-wider text-[11px] block font-bold">
                  {isAr ? 'التخزين والتجميد' : isDe ? 'Tiefkühllagerung' : 'Cold Storage'}
                </span>
                <span className="text-emerald-400 font-mono font-bold text-lg">-18°C Controlled</span>
              </div>
              <div className="bg-emerald-900/60 p-3.5 rounded border border-emerald-800">
                <span className="text-emerald-300 uppercase tracking-wider text-[11px] block font-bold">
                  {isAr ? 'فترة الصلاحية' : isDe ? 'Mindesthaltbarkeit' : 'Shelf Life'}
                </span>
                <span className="text-white font-mono font-bold text-lg">
                  {isAr ? '١٨ شهراً' : isDe ? '18 Monate' : '18 Months'}
                </span>
              </div>
              <div className="bg-emerald-900/60 p-3.5 rounded border border-emerald-800">
                <span className="text-emerald-300 uppercase tracking-wider text-[11px] block font-bold">
                  {isAr ? 'حمولة الحاوية 40 قدم' : isDe ? 'Container-Nutzlast' : '40ft Reefer Load'}
                </span>
                <span className="text-white font-mono font-bold text-lg">24 – 26 MT Net</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Controls Bar: Search & Category Filter Pills */}
          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={getSearchPlaceholder()}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  {isAr ? 'مسح' : isDe ? 'Zurücksetzen' : 'Clear'}
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {isAr ? `جميع المنتجات (${products.length})` : isDe ? `Alle Produkte (${products.length})` : `All Products (${products.length})`}
              </button>
              <button
                onClick={() => setSelectedCategory('vegetables')}
                className={`px-3 py-1.5 rounded font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === 'vegetables'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {isAr ? '01. خضروات رئيسية' : isDe ? '01. Hauptgemüse' : '01. Vegetables'}
              </button>
              <button
                onClick={() => setSelectedCategory('specialties')}
                className={`px-3 py-1.5 rounded font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === 'specialties'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {isAr ? '02. أصناف خاصة' : isDe ? '02. Spezialitäten' : '02. Specialties'}
              </button>
              <button
                onClick={() => setSelectedCategory('fruits')}
                className={`px-3 py-1.5 rounded font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === 'fruits'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {isAr ? '03. فواكه مجمدة' : isDe ? '03. Gefrorene Früchte' : '03. Fruits'}
              </button>
            </div>
          </div>

          {/* Category Section Header Banner */}
          <div className="mb-6">
            <h2 className="text-emerald-800 border-b-2 border-emerald-100 pb-2 flex justify-between items-baseline">
              <span className="font-bold uppercase tracking-tight text-lg">
                {getCategoryTitle()}
              </span>
              {isBilingual && (
                <span className="text-xs font-bold font-arabic text-emerald-800" dir="rtl">
                  {selectedCategory === 'all'
                    ? 'قائمة التصدير الكاملة - ١٢ صنفاً فائق الجودة'
                    : selectedCategory === 'vegetables'
                    ? '٠١. خضروات ممتازة ومجمدة سريعاً'
                    : selectedCategory === 'specialties'
                    ? '٠٢. أصناف خاصة وتراثية'
                    : '٠٣. فواكه وحبوب مجمدة'}
                </span>
              )}
            </h2>
          </div>

          {/* Product Cards Stack */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center border border-slate-200">
              <Snowflake className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold uppercase tracking-wider text-slate-800 mb-1">
                {isAr
                  ? 'لا توجد منتجات مطابقة للبحث'
                  : isDe
                  ? 'Keine passenden Produkte gefunden'
                  : 'No matching products found'}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {isAr
                  ? 'يرجى تجربة كلمة بحث أخرى أو مسح فلتر الفئات.'
                  : isDe
                  ? 'Bitte versuchen Sie andere Suchbegriffe oder setzen Sie den Filter zurück.'
                  : 'Try adjusting your search keywords or resetting the category filter.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider"
              >
                {isAr ? 'إعادة ضبط الفلاتر' : isDe ? 'Filter zurücksetzen' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  languageMode={languageMode}
                  company={company}
                  onOpenSpecModal={setSelectedProductForSpec}
                />
              ))}
            </div>
          )}

          {/* Why Choose Borouge Callout Card */}
          <div className="my-8 p-5 bg-emerald-50 rounded-lg border border-emerald-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">
              {getWhyChooseTitle()}
            </h3>
            <p className="text-xs leading-relaxed text-emerald-800">
              {getWhyChooseText()}
            </p>
          </div>

          {/* General Specifications Section */}
          <GeneralSpecsSection
            languageMode={languageMode}
            company={company}
          />

          {/* Direct B2B Inquiry Banner */}
          <div className="my-10 bg-emerald-900 text-white rounded-xl p-8 sm:p-10 shadow-md border-2 border-emerald-600 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                {isAr ? 'توريد وتصدير مباشر B2B' : isDe ? 'Direkter B2B-Werksbezug & Private Label' : 'Direct B2B Procurement & Contract Packing'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                {getInquiryBannerTitle()}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                {getInquiryBannerDesc()}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${company.email}?subject=B2B Export Quotation Request - Borouge IQF Frozen Produce`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-colors whitespace-nowrap"
              >
                <span>{isAr ? 'طلب عرض سعر (إيميل)' : isDe ? 'Angebot anfordern (E-Mail)' : 'Request Quotation (Email)'}</span>
              </a>
              <button
                onClick={handlePrintPdf}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm border border-emerald-600 uppercase tracking-wider transition-colors whitespace-nowrap"
              >
                <Printer className="w-4 h-4" />
                <span>{isAr ? 'حفظ كتالوج PDF' : isDe ? 'PDF-Katalog speichern' : 'Save as PDF Catalog'}</span>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-50 p-6 border-t border-slate-200 text-slate-800 no-print">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                {isAr ? 'الحفظ والصلاحية' : isDe ? 'Lagerung & Haltbarkeit' : 'Storage & Life'}
              </p>
              <p className="text-xs font-medium text-slate-700">
                {isAr ? 'الحفظ: -18 مئوية ثابتة' : isDe ? 'Temperatur: -18°C kontinuierlich' : 'Temp: -18°C (Stable Cold Chain)'}
              </p>
              <p className="text-xs font-medium text-slate-700">
                {isAr ? 'الصلاحية: 18 شهراً مضمونة' : isDe ? 'Haltbarkeit: 18 Monate garantiert' : 'Shelf Life: 18 Months Guaranteed'}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                {isAr ? 'خيارات التعبئة' : isDe ? 'Verpackungsoptionen' : 'Packaging Options'}
              </p>
              <p className="text-xs font-medium text-slate-700">
                {isAr ? 'تجزئة: 400 جم / 1 كجم / 2.5 كجم' : isDe ? 'Handel: 400g / 1kg / 2,5kg' : 'Retail: 400g / 1kg / 2.5kg'}
              </p>
              <p className="text-xs font-medium text-slate-700">
                {isAr ? 'تصدير صب: كرتون 10 كجم مبطن' : isDe ? 'Industrie: 10kg Großgebinde mit Inliner' : 'Industrial: 10kg Bulk Export Liner'}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                {isAr ? 'شهادات الجودة' : isDe ? 'Zertifizierungen' : 'Certifications'}
              </p>
              <div className="flex flex-wrap gap-1.5 items-center pt-0.5">
                <span className="px-1.5 py-0.5 border border-slate-300 text-[9px] font-bold text-slate-700 rounded bg-white">
                  ISO 22000
                </span>
                <span className="px-1.5 py-0.5 border border-slate-300 text-[9px] font-bold text-slate-700 rounded bg-white">
                  HACCP
                </span>
                <span className="px-1.5 py-0.5 border border-slate-300 text-[9px] font-bold text-slate-700 rounded bg-white">
                  ISO 9001
                </span>
                <span className="px-1.5 py-0.5 border border-slate-300 text-[9px] font-bold text-slate-700 rounded bg-white">
                  HALAL
                </span>
              </div>
            </div>

            <div className="text-left lg:text-right space-y-1">
              <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                {isAr ? 'مصنع بوروج للتجميد السريع' : isDe ? 'Borouge IQF-Verarbeitungswerk' : 'Borouge IQF Processing Factory'}
              </p>
              <p className="text-[10px] text-slate-600 leading-tight">
                {isAr
                  ? 'موانئ الشحن: الإسكندرية / دمياط / بورسعيد - مصر'
                  : isDe
                  ? `Verschiffungshäfen: ${company.portOfLoadingDe || company.portOfLoadingEn}`
                  : `Loading Ports: ${company.portOfLoadingEn}`}
              </p>
              <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider pt-1 font-mono">
                {company.website} • {company.whatsapp}
              </p>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <LinkedInPitchModal
          isOpen={isLinkedInModalOpen}
          onClose={() => setIsLinkedInModalOpen(false)}
          company={company}
          languageMode={languageMode}
        />

        <CompanyEditModal
          isOpen={isCompanyModalOpen}
          onClose={() => setIsCompanyModalOpen(false)}
          company={company}
          onSave={setCompany}
        />

        <SpecSheetModal
          product={selectedProductForSpec}
          onClose={() => setSelectedProductForSpec(null)}
          languageMode={languageMode}
          company={company}
        />

        <AiPdfStudioModal
          isOpen={isPdfStudioOpen}
          onClose={() => setIsPdfStudioOpen(false)}
          products={products}
          company={company}
          currentLanguage={languageMode}
          onPrint={handlePrintPdf}
          onLanguageChange={setLanguageMode}
        />
      </div>
    </div>
  );
}
