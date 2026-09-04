import React from 'react';
import { Product, CompanyDetails, LanguageMode } from '../types';
import { generalSpecifications } from '../data/products';
import { DEFAULT_PRODUCT_IMAGES, getCustomPhoto } from '../data/productImages';
import { Snowflake, ShieldCheck, Award, Package, Calendar, ThermometerSnowflake, Ship, Phone, Mail, Globe, MapPin } from 'lucide-react';

interface CatalogPdfViewProps {
  products: Product[];
  company: CompanyDetails;
  languageMode: LanguageMode;
}

// Concise, non-truncated export display titles for the cover grid
const SHORT_COVER_NAMES: Record<string, { en: string; de: string; ar: string }> = {
  'okra': { en: 'Okra Zero / Exc.', de: 'Okraschoten', ar: 'بامية زيرو وممتازة' },
  'green-peas': { en: 'Sweet Green Peas', de: 'Gartenerbsen', ar: 'بسلة سكرية' },
  'green-beans': { en: 'Green Beans', de: 'Grüne Bohnen', ar: 'فاصوليا خضراء' },
  'broccoli-cauliflower': { en: 'Broccoli & Cauli.', de: 'Brokkoli & Blumenk.', ar: 'بروكلي وقرنبيط' },
  'diced-carrots': { en: 'Diced Carrots', de: 'Karottenwürfel', ar: 'جزر مكعبات' },
  'mixed-vegetables': { en: 'Mixed Vegetables', de: 'Vierer-Mischgemüse', ar: 'خضار مشكل' },
  'artichoke-bottoms': { en: 'Artichoke Bottoms', de: 'Artischocken', ar: 'قلوب الخرشوف' },
  'peeled-garlic': { en: 'Peeled Garlic', de: 'Knoblauchzehen', ar: 'ثوم مقشر' },
  'frozen-falafel': { en: 'Egyptian Falafel', de: 'Falafel (Taameya)', ar: 'فلافل مصرية' },
  'french-fries': { en: 'French Fries 9x9', de: 'Pommes Frites', ar: 'أصابع بطاطس' },
  'whole-strawberries': { en: 'Strawberries', de: 'Ganze Erdbeeren', ar: 'فراولة كاملة' },
  'pomegranate-seeds': { en: 'Ruby Pomegranate', de: 'Granatapfelkerne', ar: 'حبوب رمان' },
  'diced-onions': { en: 'Diced Onions', de: 'Zwiebelwürfel', ar: 'بصل مكعبات' },
};

export const CatalogPdfView: React.FC<CatalogPdfViewProps> = ({
  products,
  company,
  languageMode,
}) => {
  const isAr = languageMode === 'ar';
  const isDe = languageMode === 'de';
  const isBilingual = languageMode === 'bilingual';

  // Helper strings for Cover
  const getCoverBadge = () => {
    if (isAr) return 'منتجات تجميد سريع IQF درجة أولى • المنشأ: جمهورية مصر العربية';
    if (isDe) return 'Klasse-A IQF-Produkte • Ursprung: Ägypten';
    return 'Grade-A IQF Produce • Origin: Egypt';
  };

  const getCoverTitleLine1 = () => {
    if (isAr) return 'خضروات وفواكه';
    if (isDe) return 'PREMIUM IQF';
    return 'PREMIUM IQF FROZEN';
  };

  const getCoverTitleLine2 = () => {
    if (isAr) return 'مجمدة سريعة IQF فاخرة';
    if (isDe) return 'TIEFGEKÜHLTES GEMÜSE & FRÜCHTE';
    return 'VEGETABLES & FRUITS';
  };

  const getCoverDescription = () => {
    if (isAr) {
      return 'دليل المواصفات الفنية القياسية المعتمدة للمستوردين والشركاء التجاريين حول العالم. منتجات مصنع بوروج لتجميد الحاصلات الزراعية، مطابقة لأعلى معايير سلامة الغذاء العالمية (ISO 22000، HACCP، ISO 9001).';
    }
    if (isDe) {
      return 'Vollständiger technischer B2B-Exportkatalog für europäische Importeure, Großhändler und die Lebensmittelindustrie. Hergestellt im nach ISO 22000, HACCP und ISO 9001 zertifizierten Borouge IQF-Verarbeitungswerk.';
    }
    return 'Comprehensive technical export catalog and specifications guide for international importers, food distributors, and industrial food processors worldwide. Processed under ISO 22000, HACCP, and ISO 9001 quality standards.';
  };

  const getProductName = (p: Product) => {
    if (isAr) return p.nameAr;
    if (isDe) return p.nameDe || p.nameEn;
    return p.nameEn;
  };

  const getShortName = (p: Product) => {
    const entry = SHORT_COVER_NAMES[p.id];
    if (entry) {
      if (isAr) return entry.ar;
      if (isDe) return entry.de;
      return entry.en;
    }
    return getProductName(p).split('(')[0].trim();
  };

  const getProductImage = (p: Product) => {
    return getCustomPhoto(p.id) || DEFAULT_PRODUCT_IMAGES[p.id] || `/images/products/${p.id}.jpg`;
  };

  const getCompanyName = () => {
    if (isAr) return company.nameAr;
    if (isDe) return company.nameDe || company.nameEn;
    return company.nameEn;
  };

  const getCompanyAddress = () => {
    if (isAr) return company.addressAr;
    if (isDe) return company.addressDe || company.addressEn;
    return company.addressEn;
  };

  const getMarketingDesc = (p: Product) => {
    if (isAr) return p.marketingDescAr;
    if (isDe) return p.marketingDescDe || p.marketingDescEn;
    return p.marketingDescEn;
  };

  const getSize = (p: Product) => {
    if (isAr) return p.technicalSpecs.sizeAr;
    if (isDe) return p.technicalSpecs.sizeDe || p.technicalSpecs.sizeEn;
    return p.technicalSpecs.sizeEn;
  };

  const getProcessing = (p: Product) => {
    if (isAr) return p.technicalSpecs.processingTypeAr;
    if (isDe) return p.technicalSpecs.processingTypeDe || p.technicalSpecs.processingTypeEn;
    return p.technicalSpecs.processingTypeEn;
  };

  const getColor = (p: Product) => {
    if (isAr) return p.qualityStandards.colorAr;
    if (isDe) return p.qualityStandards.colorDe || p.qualityStandards.colorEn;
    return p.qualityStandards.colorEn;
  };

  const getTexture = (p: Product) => {
    if (isAr) return p.qualityStandards.textureAr;
    if (isDe) return p.qualityStandards.textureDe || p.qualityStandards.textureEn;
    return p.qualityStandards.textureEn;
  };

  const getDefects = (p: Product) => {
    if (isAr) return p.qualityStandards.defectToleranceAr;
    if (isDe) return p.qualityStandards.defectToleranceDe || p.qualityStandards.defectToleranceEn;
    return p.qualityStandards.defectToleranceEn;
  };

  const getRetail = (p: Product) => {
    if (isAr) return p.packaging.retailAr;
    if (isDe) return p.packaging.retailDe || p.packaging.retailEn;
    return p.packaging.retailEn;
  };

  const getFoodService = (p: Product) => {
    if (isAr) return p.packaging.foodServiceAr;
    if (isDe) return p.packaging.foodServiceDe || p.packaging.foodServiceEn;
    return p.packaging.foodServiceEn;
  };

  const getBulk = (p: Product) => {
    if (isAr) return p.packaging.bulkAr;
    if (isDe) return p.packaging.bulkDe || p.packaging.bulkEn;
    return p.packaging.bulkEn;
  };

  const getBadge = (p: Product) => {
    if (isAr) return p.badgeAr;
    if (isDe) return p.badgeDe || p.badgeEn;
    return p.badgeEn;
  };

  return (
    <div className="print-only font-sans text-slate-900 bg-white">
      {/* ========================================================================= */}
      {/* PAGE 1: FORMAL B2B EXPORT CATALOG COVER PAGE */}
      {/* ========================================================================= */}
      <div className="a4-page flex flex-col justify-between p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white relative overflow-hidden">
        {/* Background Graphic Accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        {/* Cover Header: Accreditation Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-lg ring-2 ring-emerald-400/40">
              IQF
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white">{getCompanyName()}</h1>
              {isBilingual && (
                <p className="text-xs font-arabic text-emerald-400 font-semibold">{company.nameAr}</p>
              )}
              <p className="text-[11px] text-emerald-300 font-mono">borouge-eg.com</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] tracking-widest uppercase font-mono text-emerald-400 block">
              {isAr ? 'الكتالوج التصديري الرسمي' : isDe ? 'OFFIZIELLER EXPORTKATALOG' : 'OFFICIAL B2B CATALOG'}
            </span>
            <span className="text-xs text-slate-300 font-bold">2025 / 2026 EXPORT EDITION</span>
          </div>
        </div>

        {/* Cover Main Title */}
        <div className="relative z-10 my-auto py-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider mb-4">
            <Snowflake className="w-3.5 h-3.5" />
            <span>{getCoverBadge()}</span>
          </div>

          <h2 className="text-4xl font-black tracking-tight uppercase leading-tight mb-2 text-white">
            {getCoverTitleLine1()}
            <br />
            <span className="text-emerald-400 font-extrabold">{getCoverTitleLine2()}</span>
          </h2>

          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed mb-3">
            {getCoverDescription()}
          </p>

          {isBilingual && (
            <p className="text-[11px] text-emerald-300/90 font-arabic max-w-2xl leading-relaxed" dir="rtl">
              دليل المواصفات القياسية الفنية المعتمدة للمستوردين والشركاء التجاريين حول العالم من مصنع بوروج للصناعات الغذائية والتجميد السريع.
            </p>
          )}
        </div>

        {/* Cover Highlight Thumbnails (Balanced 13 Products Showcase with verified images & concise labels) */}
        <div className="relative z-10 my-2 bg-slate-900/80 p-3 rounded-2xl border border-slate-700/80 shadow-lg">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
              {isAr ? `تشكيلة المحاصيل المعتمدة للتصدير (${products.length} صنفاً)` : isDe ? `Zertifiziertes Exportportfolio (${products.length} Sorten)` : `Certified Export Portfolio (${products.length} Items)`}
            </span>
            <span className="text-[10px] font-mono text-slate-400">-18°C IQF CONSTANT</span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-5 gap-2">
            {products.map((p) => {
              const imgUrl = getProductImage(p);
              const shortName = getShortName(p);

              return (
                <div
                  key={p.id}
                  className="bg-slate-800/90 p-1.5 rounded-xl text-center flex flex-col items-center border border-slate-700/50 shadow-xs"
                >
                  <div className="w-12 h-12 mb-1.5 rounded-lg overflow-hidden bg-slate-700 relative flex-shrink-0 border border-slate-600/60">
                    <img
                      src={imgUrl}
                      alt={p.nameEn}
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <span className="text-[9.5px] font-bold text-slate-200 leading-tight line-clamp-2 w-full">
                    {shortName}
                  </span>
                  {isBilingual && (
                    <span className="text-[8px] font-arabic text-emerald-400 truncate w-full mt-0.5">
                      {SHORT_COVER_NAMES[p.id]?.ar || p.nameAr}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Cover Footer: Certifications & Contact Summary */}
        <div className="relative z-10 border-t border-emerald-500/30 pt-4 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-mono text-emerald-400 font-bold">ISO 22000</span>
            <span>•</span>
            <span className="font-mono text-emerald-400 font-bold">HACCP</span>
            <span>•</span>
            <span className="font-mono text-emerald-400 font-bold">ISO 9001</span>
            <span>•</span>
            <span className="font-mono text-emerald-400 font-bold">HALAL</span>
          </div>
          <div className="text-right">
            <span className="text-slate-300 font-semibold">{company.email}</span>
            <span className="mx-2">|</span>
            <span className="text-emerald-400 font-mono">{company.whatsapp}</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGES: PRODUCT DETAILS (EXACTLY 2 PRODUCTS PER A4 PAGE WITH STRICT ISOLATION) */}
      {/* ========================================================================= */}
      {Array.from({ length: Math.ceil(products.length / 2) }).map((_, pageIdx) => {
        const pageProducts = products.slice(pageIdx * 2, pageIdx * 2 + 2);
        const totalPages = Math.ceil(products.length / 2) + 2; // cover + products + back cover

        return (
          <div
            key={pageIdx}
            className="a4-page p-8 flex flex-col justify-between bg-white text-slate-900 border-b border-slate-100"
          >
            {/* Page Running Header */}
            <div className="border-b border-slate-200 pb-2 mb-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900">{getCompanyName()}</span>
                {isBilingual && (
                  <>
                    <span className="text-slate-400">|</span>
                    <span className="text-emerald-700 font-arabic font-bold">{company.nameAr}</span>
                  </>
                )}
              </div>
              <div className="text-slate-500 font-medium font-mono text-[11px]">
                {isAr
                  ? `كتالوج التصدير • صفحة ${pageIdx + 2} من ${totalPages}`
                  : isDe
                  ? `B2B-Exportkatalog • Seite ${pageIdx + 2} von ${totalPages}`
                  : `Export Product Catalog • Page ${pageIdx + 2} of ${totalPages}`}
              </div>
            </div>

            {/* Products on this page (Constrained height to ensure 2 products fit effortlessly) */}
            <div className="flex-1 flex flex-col justify-between gap-4 py-1">
              {pageProducts.map((p) => {
                const imgUrl = getProductImage(p);

                return (
                  <div
                    key={p.id}
                    className="product-card-print avoid-break border border-slate-200/90 rounded-xl p-3.5 bg-slate-50/40 shadow-none"
                  >
                    {/* Product Title Bar */}
                    <div className="flex items-baseline justify-between border-b border-slate-200 pb-1.5 mb-2.5">
                      <div className="flex items-baseline gap-2">
                        <h4 className="text-lg font-black text-slate-900 tracking-tight">
                          {getProductName(p)}
                        </h4>
                        {isBilingual && (
                          <span className="text-sm font-bold font-arabic text-emerald-800">{p.nameAr}</span>
                        )}
                      </div>
                      <span className="text-[9.5px] font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded">
                        {getBadge(p)}
                      </span>
                    </div>

                    {/* Body Grid: Visual + Content */}
                    <div className="grid grid-cols-12 gap-4 items-start">
                      {/* Real Image Visual Container */}
                      <div className="col-span-4 bg-white p-2 rounded-xl border border-slate-200">
                        <div className="h-32 rounded-lg overflow-hidden bg-slate-100 relative shadow-2xs">
                          <img
                            src={imgUrl}
                            alt={p.nameEn}
                            crossOrigin="anonymous"
                            className="w-full h-full object-cover object-center"
                            loading="eager"
                          />
                        </div>
                        <div className="mt-1.5 text-center">
                          <span className="text-[9.5px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded block">
                            -18°C IQF GRADE A
                          </span>
                        </div>
                      </div>

                      {/* Content & Specs */}
                      <div className="col-span-8 space-y-1.5 text-[11px]">
                        <p className="text-slate-700 leading-snug line-clamp-2">
                          {getMarketingDesc(p)}
                        </p>
                        {isBilingual && (
                          <p className="text-emerald-950 font-arabic leading-snug text-[10.5px] line-clamp-2" dir="rtl">
                            {p.marketingDescAr}
                          </p>
                        )}

                        {/* Specs Table */}
                        <table className="w-full text-left border-collapse border border-slate-200 rounded-md text-[10px] mt-1">
                          <tbody>
                            <tr className="border-b border-slate-200 bg-white">
                              <td className="p-1 font-bold text-slate-500 w-1/3">
                                {isAr ? 'المقاس / الكاليبر' : isDe ? 'Kaliber / Größe' : 'Size / Caliber'}
                              </td>
                              <td className="p-1 font-medium text-slate-900">{getSize(p)}</td>
                            </tr>
                            <tr className="border-b border-slate-200 bg-slate-50/70">
                              <td className="p-1 font-bold text-slate-500">
                                {isAr ? 'نوع المعالجة' : isDe ? 'Verarbeitungsart' : 'Processing'}
                              </td>
                              <td className="p-1 font-medium text-slate-900">{getProcessing(p)}</td>
                            </tr>
                            <tr className="border-b border-slate-200 bg-white">
                              <td className="p-1 font-bold text-slate-500">
                                {isAr ? 'اللون والقوام' : isDe ? 'Farbe & Textur' : 'Color & Texture'}
                              </td>
                              <td className="p-1 text-slate-900 truncate">
                                {getColor(p)} • {getTexture(p)}
                              </td>
                            </tr>
                            <tr className="border-b border-slate-200 bg-slate-50/70">
                              <td className="p-1 font-bold text-slate-500">
                                {isAr ? 'النقاوة' : isDe ? 'Reinheit' : 'Purity'}
                              </td>
                              <td className="p-1 text-emerald-800 font-semibold">≥ 99.8% ({getDefects(p)})</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="p-1 font-bold text-slate-500">
                                {isAr ? 'خيارات التعبئة' : isDe ? 'Verpackungsformate' : 'Packaging'}
                              </td>
                              <td className="p-1 text-slate-800">
                                {getRetail(p)} | {getFoodService(p)} | {getBulk(p)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Page Running Footer */}
            <div className="border-t border-slate-200 pt-2 mt-2 flex items-center justify-between text-[9.5px] text-slate-500">
              <span>
                {isAr
                  ? 'المنشأ: جمهورية مصر العربية • سلسلة تبريد مستمرة -18°C'
                  : isDe
                  ? 'Ursprung: Ägypten • Tiefkühlkette -18°C'
                  : 'Origin: Arab Republic of Egypt • Cold Chain -18°C'}
              </span>
              <span>
                {company.email} • WhatsApp: {company.whatsapp}
              </span>
            </div>
          </div>
        );
      })}

      {/* ========================================================================= */}
      {/* FINAL PAGE: GENERAL EXPORT SPECIFICATIONS & FORMAL BACK COVER */}
      {/* ========================================================================= */}
      <div className="a4-page p-10 flex flex-col justify-between bg-slate-950 text-white">
        {/* Header */}
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold block">
              {isAr
                ? 'معايير التصدير واللوجستيات'
                : isDe
                ? 'EXPORTKONFORMITÄT & LOGISTIK'
                : 'EXPORT COMPLIANCE & LOGISTICS'}
            </span>
            <h3 className="text-xl font-black text-white">
              {isAr
                ? 'المواصفات العامة المعتمدة للتصدير'
                : isDe
                ? 'ALLGEMEINE EXPORTSPEZIFIKATIONEN'
                : 'GENERAL EXPORT SPECIFICATIONS'}
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">B2B CONTRACT STANDARD</span>
        </div>

        {/* Specs Grid: 4 Core Modules */}
        <div className="grid grid-cols-2 gap-4 my-auto py-2">
          {/* 1. Storage & Cold Chain */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase mb-1">
              <ThermometerSnowflake className="w-4 h-4" />
              <span>{isAr ? 'درجة حرارة التخزين' : isDe ? 'Lagertemperatur' : 'Storage Temperature'}</span>
            </div>
            <p className="text-xl font-black font-mono text-white mb-1">-18°C (-0.4°F)</p>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {isAr ? generalSpecifications.storage.ar : isDe ? generalSpecifications.storage.de : generalSpecifications.storage.en}
            </p>
          </div>

          {/* 2. Shelf Life */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase mb-1">
              <Calendar className="w-4 h-4" />
              <span>{isAr ? 'فترة الصلاحية' : isDe ? 'Mindesthaltbarkeit' : 'Shelf Life'}</span>
            </div>
            <p className="text-xl font-black font-mono text-white mb-1">
              {isAr ? '18 شهراً' : isDe ? '18 Monate' : '18 Months'}
            </p>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {isAr ? generalSpecifications.shelfLife.ar : isDe ? generalSpecifications.shelfLife.de : generalSpecifications.shelfLife.en}
            </p>
          </div>

          {/* 3. Container Payload */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase mb-1">
              <Ship className="w-4 h-4" />
              <span>{isAr ? 'حمولة الحاوية المبردة' : isDe ? 'Container-Nutzlast' : 'Reefer Container Payload'}</span>
            </div>
            <p className="text-xl font-black font-mono text-white mb-1">24 – 26 MT Net</p>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {isAr ? generalSpecifications.shippingAndLogistics.payloadCapacityAr : isDe ? generalSpecifications.shippingAndLogistics.payloadCapacityDe : generalSpecifications.shippingAndLogistics.payloadCapacityEn}
            </p>
          </div>

          {/* 4. Ports of Loading */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase mb-1">
              <MapPin className="w-4 h-4" />
              <span>{isAr ? 'موانئ الشحن والمنشأ' : isDe ? 'Verladehäfen & Ursprung' : 'Ports of Loading'}</span>
            </div>
            <p className="text-xl font-black font-mono text-white mb-1">
              {isAr ? 'مصر (A.R.E.)' : isDe ? 'Ägypten (A.R.E.)' : 'Egypt (A.R.E.)'}
            </p>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {isAr
                ? `موانئ الإسكندرية / بورسعيد / دمياط. شروط التسليم FOB / CIF.`
                : isDe
                ? `Hafen Alexandria / Port Said / Damietta, Ägypten. FOB / CIF.`
                : `Alexandria / Port Said / Damietta ports. Available FOB & CIF.`}
            </p>
          </div>
        </div>

        {/* Packaging Specs (Retail, HoReCa, Industrial) */}
        <div className="border border-slate-800 rounded-xl p-3.5 bg-slate-900/60 my-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-2">
            {isAr
              ? 'مواصفات التعبئة القياسية (400 جم، 1 كجم، 2.5 كجم، 10 كجم صب)'
              : isDe
              ? 'VERPACKUNGSSPEZIFIKATIONEN (400G, 1KG, 2,5KG & 10KG GROSSGEBINDE)'
              : 'STANDARD PACKAGING SPECIFICATIONS (400G, 1KG, 2.5KG & 10KG BULK)'}
          </span>
          <div className="grid grid-cols-4 gap-2 text-[10px]">
            {(isAr ? generalSpecifications.packagingOptions.ar : isDe ? generalSpecifications.packagingOptions.de : generalSpecifications.packagingOptions.en).map((pkg, idx) => (
              <div key={idx} className="border-l-2 border-emerald-500 pl-2">
                <span className="font-bold text-emerald-300 block">{pkg.size}</span>
                <span className="text-white font-medium block">{pkg.type}</span>
                <p className="text-slate-400 text-[9px] line-clamp-2">{pkg.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Bar */}
        <div className="border border-slate-800 rounded-xl p-3 bg-slate-900/40">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1.5">
            {isAr ? 'شهادات الجودة وسلامة الغذاء' : isDe ? 'QUALITÄTSZERTIFIKATE & LEBENSMITTELSICHERHEIT' : 'FOOD SAFETY & QUALITY ACCREDITATIONS'}
          </span>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            {generalSpecifications.certifications.slice(0, 3).map((cert, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <span className="font-mono text-emerald-400 font-bold">{cert.badge}</span>
                <span className="text-slate-300 text-[9.5px]">
                  {isAr ? cert.titleAr : isDe ? cert.titleDe : cert.titleEn}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Back Cover Contact Footer */}
        <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs">
          <div>
            <h4 className="font-black text-white text-sm">{getCompanyName()}</h4>
            <p className="text-[10px] text-slate-400">{getCompanyAddress()}</p>
          </div>
          <div className="text-right text-[11px]">
            <span className="text-emerald-400 font-bold block">
              {isAr ? 'مكتب التصدير المباشر:' : isDe ? 'Exportbüro Direktkontakt:' : 'Direct Export Desk:'} {company.phone}
            </span>
            <span className="text-slate-300 font-mono">{company.email} • {company.website}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
