import React from 'react';
import { Product, CompanyDetails, LanguageMode } from '../types';
import { generalSpecifications } from '../data/products';
import { ProductVisual } from './ProductVisual';
import { Snowflake, ShieldCheck, Award, Package, Calendar, ThermometerSnowflake, Ship, Phone, Mail, Globe, MapPin } from 'lucide-react';

interface CatalogPdfViewProps {
  products: Product[];
  company: CompanyDetails;
  languageMode: LanguageMode;
}

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
      <div className="a4-page flex flex-col justify-between p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white relative overflow-hidden">
        {/* Background Graphic Accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        {/* Cover Header: Accreditation Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/30 pb-6">
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
        <div className="relative z-10 my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider mb-6">
            <Snowflake className="w-3.5 h-3.5" />
            <span>{getCoverBadge()}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-4">
            {getCoverTitleLine1()}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              {getCoverTitleLine2()}
            </span>
          </h2>

          {isBilingual && (
            <h3 className="text-2xl font-black font-arabic text-emerald-300 mb-6" dir="rtl">
              كتالوج تصدير الخضروات والفواكه المجمدة IQF عالية الجودة
            </h3>
          )}

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed mb-4">
            {getCoverDescription()}
          </p>

          {isBilingual && (
            <p className="text-xs text-emerald-300/80 font-arabic max-w-2xl leading-relaxed" dir="rtl">
              دليل المواصفات القياسية الفنية المعتمدة للمستوردين والشركاء التجاريين حول العالم من مصنع بوروج للصناعات الغذائية والتجميد السريع.
            </p>
          )}
        </div>

        {/* Cover Highlight Thumbnails (12 Products Mini-Grid) */}
        <div className="relative z-10 grid grid-cols-6 gap-2 my-4 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
          {products.map((p) => (
            <div key={p.id} className="bg-slate-800/80 p-2 rounded-xl text-center flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <ProductVisual productId={p.id} name={p.nameEn} size="sm" allowUpload={false} showBadge={false} />
              </div>
              <span className="text-[9px] font-bold text-slate-200 truncate w-full">
                {getProductName(p)}
              </span>
              {isBilingual && (
                <span className="text-[8px] font-arabic text-emerald-400 truncate w-full">{p.nameAr}</span>
              )}
            </div>
          ))}
        </div>

        {/* Cover Footer: Certifications & Contact Summary */}
        <div className="relative z-10 border-t border-emerald-500/30 pt-6 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
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
      {/* PAGES: PRODUCT DETAILS (2 PRODUCTS PER A4 PAGE FOR CLEAN PRINT DENSITY) */}
      {/* ========================================================================= */}
      {Array.from({ length: Math.ceil(products.length / 2) }).map((_, pageIdx) => {
        const pageProducts = products.slice(pageIdx * 2, pageIdx * 2 + 2);

        return (
          <div key={pageIdx} className="a4-page p-10 flex flex-col justify-between bg-white text-slate-900">
            {/* Page Running Header */}
            <div className="border-b border-slate-200 pb-3 mb-6 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900">{getCompanyName()}</span>
                {isBilingual && (
                  <>
                    <span className="text-slate-400">|</span>
                    <span className="text-emerald-700 font-arabic font-bold">{company.nameAr}</span>
                  </>
                )}
              </div>
              <div className="text-slate-500 font-medium">
                {isAr
                  ? `كتالوج التصدير • صفحة ${pageIdx + 2} من ${Math.ceil(products.length / 2) + 2}`
                  : isDe
                  ? `B2B-Exportkatalog • Seite ${pageIdx + 2} von ${Math.ceil(products.length / 2) + 2}`
                  : `Export Product Catalog • Page ${pageIdx + 2} of ${Math.ceil(products.length / 2) + 2}`}
              </div>
            </div>

            {/* Products on this page */}
            <div className="flex-1 flex flex-col gap-6 justify-around">
              {pageProducts.map((p) => (
                <div key={p.id} className="border border-slate-200 rounded-2xl p-5 bg-slate-50/40">
                  {/* Product Title Bar */}
                  <div className="flex items-baseline justify-between border-b border-slate-200/80 pb-2 mb-3">
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-xl font-black text-slate-900 tracking-tight">
                        {getProductName(p)}
                      </h4>
                      {isBilingual && (
                        <span className="text-base font-bold font-arabic text-emerald-800">{p.nameAr}</span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md">
                      {getBadge(p)}
                    </span>
                  </div>

                  {/* Body Grid: Visual + Content */}
                  <div className="grid grid-cols-12 gap-5 items-start">
                    {/* Visual */}
                    <div className="col-span-4 bg-white p-2 rounded-xl border border-slate-200/80">
                      <div className="h-36 rounded-lg overflow-hidden">
                        <ProductVisual productId={p.id} name={p.nameEn} size="full" allowUpload={false} showBadge={false} />
                      </div>
                      <div className="mt-2 text-center">
                        <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded block">
                          -18°C IQF GRADE A
                        </span>
                      </div>
                    </div>

                    {/* Content & Specs */}
                    <div className="col-span-8 space-y-2.5 text-xs">
                      <p className="text-slate-700 leading-relaxed">
                        {getMarketingDesc(p)}
                      </p>
                      {isBilingual && (
                        <p className="text-emerald-950 font-arabic leading-relaxed text-[11px]" dir="rtl">
                          {p.marketingDescAr}
                        </p>
                      )}

                      {/* Specs Table */}
                      <table className="w-full text-left border-collapse border border-slate-200 rounded-lg text-[11px] mt-2">
                        <tbody>
                          <tr className="border-b border-slate-200 bg-white">
                            <td className="p-1.5 font-bold text-slate-500 w-1/3">
                              {isAr ? 'المقاس / الكاليبر' : isDe ? 'Kaliber / Größe' : 'Size / Caliber'}
                            </td>
                            <td className="p-1.5 font-medium text-slate-900">{getSize(p)}</td>
                          </tr>
                          <tr className="border-b border-slate-200 bg-slate-50/60">
                            <td className="p-1.5 font-bold text-slate-500">
                              {isAr ? 'نوع المعالجة' : isDe ? 'Verarbeitungsart' : 'Processing'}
                            </td>
                            <td className="p-1.5 font-medium text-slate-900">{getProcessing(p)}</td>
                          </tr>
                          <tr className="border-b border-slate-200 bg-white">
                            <td className="p-1.5 font-bold text-slate-500">
                              {isAr ? 'اللون والقوام' : isDe ? 'Farbe & Textur' : 'Color & Texture'}
                            </td>
                            <td className="p-1.5 text-slate-900">
                              {getColor(p)} • {getTexture(p)}
                            </td>
                          </tr>
                          <tr className="border-b border-slate-200 bg-slate-50/60">
                            <td className="p-1.5 font-bold text-slate-500">
                              {isAr ? 'النقاوة' : isDe ? 'Reinheit' : 'Purity'}
                            </td>
                            <td className="p-1.5 text-emerald-800 font-semibold">≥ 99.8% ({getDefects(p)})</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="p-1.5 font-bold text-slate-500">
                              {isAr ? 'خيارات التعبئة' : isDe ? 'Verpackungsformate' : 'Packaging Formats'}
                            </td>
                            <td className="p-1.5 text-slate-800">
                              {getRetail(p)} | {getFoodService(p)} | {getBulk(p)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Page Running Footer */}
            <div className="border-t border-slate-200 pt-3 mt-4 flex items-center justify-between text-[10px] text-slate-500">
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
        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">
              {isAr
                ? 'معايير التصدير واللوجستيات'
                : isDe
                ? 'EXPORTKONFORMITÄT & LOGISTIK'
                : 'EXPORT COMPLIANCE & LOGISTICS'}
            </span>
            <h3 className="text-2xl font-black text-white">
              {isAr
                ? 'المواصفات العامة المعتمدة للتصدير'
                : isDe
                ? 'ALLGEMEINE EXPORTSPEZIFIKATIONEN'
                : 'GENERAL EXPORT SPECIFICATIONS'}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">B2B CONTRACT STANDARD</span>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
              {isAr ? 'درجة حرارة التخزين' : isDe ? 'Lagertemperatur' : 'Storage Temperature'}
            </span>
            <div className="text-2xl font-black text-white font-mono mb-1">-18°C (-0.4°F)</div>
            <p className="text-xs text-slate-300">
              {isAr ? generalSpecifications.storage.ar : isDe ? (generalSpecifications.storage.de || generalSpecifications.storage.en) : generalSpecifications.storage.en}
            </p>
            {isBilingual && (
              <p className="text-[10px] text-slate-400 font-arabic mt-1" dir="rtl">
                {generalSpecifications.storage.ar}
              </p>
            )}
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
              {isAr ? 'فترة الصلاحية المضمونة' : isDe ? 'Mindesthaltbarkeit' : 'Guaranteed Shelf Life'}
            </span>
            <div className="text-2xl font-black text-white font-mono mb-1">
              {isAr ? '18 شهراً' : isDe ? '18 Monate' : '18 Months'}
            </div>
            <p className="text-xs text-slate-300">
              {isAr ? generalSpecifications.shelfLife.ar : isDe ? (generalSpecifications.shelfLife.de || generalSpecifications.shelfLife.en) : generalSpecifications.shelfLife.en}
            </p>
            {isBilingual && (
              <p className="text-[10px] text-slate-400 font-arabic mt-1" dir="rtl">
                {generalSpecifications.shelfLife.ar}
              </p>
            )}
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
              {isAr ? 'حمولة الحاوية 40 قدم' : isDe ? 'Container-Nutzlast' : 'Container Load Capacity'}
            </span>
            <div className="text-2xl font-black text-white font-mono mb-1">24 – 26 MT Net</div>
            <p className="text-xs text-slate-300">
              {isAr
                ? generalSpecifications.shippingAndLogistics.payloadCapacityAr
                : isDe
                ? (generalSpecifications.shippingAndLogistics.payloadCapacityDe || generalSpecifications.shippingAndLogistics.payloadCapacityEn)
                : generalSpecifications.shippingAndLogistics.payloadCapacityEn}
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase block mb-1">
              {isAr ? 'موانئ الشحن والمنشأ' : isDe ? 'Verladehafen & Ursprung' : 'Port of Loading & Origin'}
            </span>
            <div className="text-xl font-black text-white mb-1">
              {isAr ? company.countryAr : isDe ? (company.countryDe || company.countryEn) : company.countryEn}
            </div>
            <p className="text-xs text-slate-300">
              {isAr ? company.portOfLoadingAr : isDe ? (company.portOfLoadingDe || company.portOfLoadingEn) : company.portOfLoadingEn}
            </p>
          </div>
        </div>

        {/* Packaging Formats Table */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 my-2">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            {isAr
              ? 'مواصفات التعبئة والتغليف (400جم، 1كجم، 2.5كجم، 10كجم صب)'
              : isDe
              ? 'Verpackungsspezifikationen (400g, 1kg, 2,5kg & 10kg Großgebinde)'
              : 'Approved Packaging Specifications (400g, 1kg, 2.5kg & 10kg Bulk)'}
          </h4>
          <div className="grid grid-cols-4 gap-2 text-[11px]">
            {(isAr
              ? generalSpecifications.packagingOptions.ar
              : isDe
              ? (generalSpecifications.packagingOptions.de || generalSpecifications.packagingOptions.en)
              : generalSpecifications.packagingOptions.en
            ).map((opt, i) => (
              <div key={i} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="font-mono font-bold text-emerald-400 block">{opt.size}</span>
                <span className="text-white font-semibold block">{opt.type}</span>
                <span className="text-slate-400 text-[10px] block mt-1">{opt.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Box */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 my-2">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            {isAr
              ? 'شهادات الجودة وسلامة الغذاء العالمية'
              : isDe
              ? 'Qualitätszertifikate & Lebensmittelsicherheit'
              : 'Quality Certifications & Safety Audits'}
          </h4>
          <div className="grid grid-cols-3 gap-3 text-xs">
            {generalSpecifications.certifications.slice(0, 3).map((cert, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                  {cert.badge}
                </span>
                <div>
                  <span className="text-white font-bold block text-[11px]">{cert.name}</span>
                  <span className="text-slate-400 text-[10px]">
                    {isAr ? cert.descAr : isDe ? (cert.descDe || cert.descEn) : cert.descEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Formal Back Cover & Seal */}
        <div className="border-t border-slate-800 pt-6 mt-4 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-black text-white">{getCompanyName()}</h4>
            {isBilingual && (
              <p className="text-xs font-arabic text-emerald-400 mb-2">{company.nameAr}</p>
            )}
            <p className="text-xs text-slate-400">{getCompanyAddress()}</p>
          </div>

          <div className="text-right text-xs space-y-1">
            <div className="text-slate-300">
              {isAr ? 'مكتب التصدير المباشر: ' : isDe ? 'Exportbüro Direktkontakt: ' : 'Direct Export Desk: '}
              <span className="text-emerald-400 font-mono font-bold">{company.whatsapp}</span>
            </div>
            <div className="text-slate-300">
              Email: <span className="text-white font-medium">{company.email}</span>
            </div>
            <div className="text-slate-400">
              Website: <span className="text-slate-300">{company.website}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
