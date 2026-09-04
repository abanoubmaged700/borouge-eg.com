import React, { useState } from 'react';
import { Product, LanguageMode, CompanyDetails } from '../types';
import { ProductVisual } from './ProductVisual';
import { CheckCircle2, Snowflake, Package, ShieldCheck, Copy, Check, MessageSquare } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  languageMode: LanguageMode;
  company: CompanyDetails;
  onOpenSpecModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  languageMode,
  company,
  onOpenSpecModal,
}) => {
  const [copied, setCopied] = useState(false);

  // Helper texts according to language
  const getName = () => {
    switch (languageMode) {
      case 'de':
        return product.nameDe || product.nameEn;
      case 'ar':
        return product.nameAr;
      default:
        return product.nameEn;
    }
  };

  const getCategory = () => {
    switch (languageMode) {
      case 'de':
        return product.categoryDe || product.categoryEn;
      case 'ar':
        return product.categoryAr;
      default:
        return product.categoryEn;
    }
  };

  const getBadge = () => {
    switch (languageMode) {
      case 'de':
        return product.badgeDe || product.badgeEn;
      case 'ar':
        return product.badgeAr;
      default:
        return product.badgeEn;
    }
  };

  const getHighlights = () => {
    switch (languageMode) {
      case 'de':
        return product.keyHighlightsDe || product.keyHighlightsEn;
      case 'ar':
        return product.keyHighlightsAr;
      default:
        return product.keyHighlightsEn;
    }
  };

  const getSize = () => {
    switch (languageMode) {
      case 'de':
        return product.technicalSpecs.sizeDe || product.technicalSpecs.sizeEn;
      case 'ar':
        return product.technicalSpecs.sizeAr;
      default:
        return product.technicalSpecs.sizeEn;
    }
  };

  const getProcessing = () => {
    switch (languageMode) {
      case 'de':
        return product.technicalSpecs.processingTypeDe || product.technicalSpecs.processingTypeEn;
      case 'ar':
        return product.technicalSpecs.processingTypeAr;
      default:
        return product.technicalSpecs.processingTypeEn;
    }
  };

  const getOrigin = () => {
    switch (languageMode) {
      case 'de':
        return product.technicalSpecs.originDe || product.technicalSpecs.originEn;
      case 'ar':
        return product.technicalSpecs.originAr;
      default:
        return product.technicalSpecs.originEn;
    }
  };

  const getHarvest = () => {
    switch (languageMode) {
      case 'de':
        return product.technicalSpecs.harvestSeasonDe || product.technicalSpecs.harvestSeasonEn;
      case 'ar':
        return product.technicalSpecs.harvestSeasonAr;
      default:
        return product.technicalSpecs.harvestSeasonEn;
    }
  };

  const getColor = () => {
    switch (languageMode) {
      case 'de':
        return product.qualityStandards.colorDe || product.qualityStandards.colorEn;
      case 'ar':
        return product.qualityStandards.colorAr;
      default:
        return product.qualityStandards.colorEn;
    }
  };

  const getTexture = () => {
    switch (languageMode) {
      case 'de':
        return product.qualityStandards.textureDe || product.qualityStandards.textureEn;
      case 'ar':
        return product.qualityStandards.textureAr;
      default:
        return product.qualityStandards.textureEn;
    }
  };

  const getDefects = () => {
    switch (languageMode) {
      case 'de':
        return product.qualityStandards.defectToleranceDe || product.qualityStandards.defectToleranceEn;
      case 'ar':
        return product.qualityStandards.defectToleranceAr;
      default:
        return product.qualityStandards.defectToleranceEn;
    }
  };

  const getRetailPack = () => {
    switch (languageMode) {
      case 'de':
        return product.packaging.retailDe || product.packaging.retailEn;
      case 'ar':
        return product.packaging.retailAr;
      default:
        return product.packaging.retailEn;
    }
  };

  const getFoodServicePack = () => {
    switch (languageMode) {
      case 'de':
        return product.packaging.foodServiceDe || product.packaging.foodServiceEn;
      case 'ar':
        return product.packaging.foodServiceAr;
      default:
        return product.packaging.foodServiceEn;
    }
  };

  const getBulkPack = () => {
    switch (languageMode) {
      case 'de':
        return product.packaging.bulkDe || product.packaging.bulkEn;
      case 'ar':
        return product.packaging.bulkAr;
      default:
        return product.packaging.bulkEn;
    }
  };

  const handleCopySummary = () => {
    let textToCopy = '';
    if (languageMode === 'ar') {
      textToCopy = `*${product.nameAr}*
المصنع: ${company.nameAr}
نوع التجهيز: ${product.technicalSpecs.processingTypeAr}
الكاليبر: ${product.technicalSpecs.sizeAr}
الجودة: ${product.qualityStandards.colorAr} | ${product.qualityStandards.textureAr}
التعبئة: ${product.packaging.retailAr} | ${product.packaging.bulkAr}
بلد المنشأ: مصر | الحفظ: -18 مئوية
واتساب: ${company.whatsapp}`;
    } else if (languageMode === 'de') {
      textToCopy = `*${product.nameDe || product.nameEn}*
Hersteller: ${company.nameDe || company.nameEn}
Verarbeitung: ${product.technicalSpecs.processingTypeDe || product.technicalSpecs.processingTypeEn}
Kaliber: ${product.technicalSpecs.sizeDe || product.technicalSpecs.sizeEn}
Qualität: ${product.qualityStandards.colorDe || product.qualityStandards.colorEn}
Verpackung: ${product.packaging.retailDe || product.packaging.retailEn} | ${product.packaging.bulkDe || product.packaging.bulkEn}
Lagerung: -18°C | Haltbarkeit: 18 Monate
Export & WhatsApp: ${company.whatsapp}`;
    } else {
      textToCopy = `*${product.nameEn}*
Manufacturer: ${company.nameEn}
Processing: ${product.technicalSpecs.processingTypeEn}
Caliber: ${product.technicalSpecs.sizeEn}
Quality: ${product.qualityStandards.colorEn} | ${product.qualityStandards.textureEn}
Packing: ${product.packaging.retailEn} | ${product.packaging.bulkEn}
Origin: Egypt | Storage: -18°C | Shelf Life: 18 Months
WhatsApp Trade Desk: ${company.whatsapp}`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInquireWhatsApp = () => {
    const productName = languageMode === 'ar' ? product.nameAr : languageMode === 'de' ? (product.nameDe || product.nameEn) : product.nameEn;
    const greeting = languageMode === 'ar'
      ? `مرحباً ${company.nameAr}، أرغب في الاستفسار والحصول على عرض سعر تصديري لمنتج: ${productName}. يُرجى موافاتنا بقائمة الأسعار الحالية وجداول الشحن.`
      : languageMode === 'de'
      ? `Guten Tag ${company.nameDe || company.nameEn}, wir interessieren uns für ein B2B-Exportangebot für: ${productName}. Bitte senden Sie uns Spezifikationen und aktuelle FOB/CIF-Preise.`
      : `Hello ${company.nameEn}, I am requesting a B2B export quotation for: ${productName}. Please share your current FOB/CIF price list and container shipment schedule.`;

    window.open(`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(greeting)}`, '_blank');
  };

  return (
    <div
      id={`product-${product.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden avoid-break"
    >
      {/* Top Banner & Category */}
      <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800">
            <Snowflake className="w-3 h-3 text-emerald-600" />
            IQF GRADE A
          </span>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            {getCategory()}
          </span>
        </div>
        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
          {getBadge()}
        </span>
      </div>

      {/* Main Grid: Visual Showcase & Core Data */}
      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Artwork & Quick Highlights */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <ProductVisual productId={product.id} name={product.nameEn} size="md" />

          {/* Key Feature Tags */}
          <div className="flex flex-wrap gap-1.5">
            {getHighlights().map((highlight, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-slate-100/90 px-2.5 py-1 rounded-md"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Descriptions & Detailed Specs */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Header Title */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {getName()}
              </h2>
              {languageMode === 'bilingual' && (
                <span className="text-lg sm:text-xl font-bold text-emerald-800 font-arabic">
                  {product.nameAr}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {languageMode === 'ar'
                ? `المنشأ: ${getOrigin()} • موسم الحصاد: ${getHarvest()}`
                : languageMode === 'de'
                ? `Herkunft: ${getOrigin()} • Erntezeit: ${getHarvest()}`
                : `Origin: ${getOrigin()} • Harvest Season: ${getHarvest()}`}
            </p>
          </div>

          {/* Marketing Description */}
          <div className="space-y-2.5 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
            {languageMode === 'ar' ? (
              <p dir="rtl" className="text-emerald-950 text-sm leading-relaxed font-arabic font-normal">
                {product.marketingDescAr}
              </p>
            ) : languageMode === 'de' ? (
              <p className="text-slate-700 text-sm leading-relaxed font-normal">
                {product.marketingDescDe || product.marketingDescEn}
              </p>
            ) : languageMode === 'bilingual' ? (
              <>
                <p className="text-slate-700 text-sm leading-relaxed font-normal">
                  {product.marketingDescEn}
                </p>
                <p dir="rtl" className="text-emerald-950 text-sm leading-relaxed font-arabic font-normal border-t border-slate-200/60 pt-2.5">
                  {product.marketingDescAr}
                </p>
              </>
            ) : (
              <p className="text-slate-700 text-sm leading-relaxed font-normal">
                {product.marketingDescEn}
              </p>
            )}
          </div>

          {/* Technical Specifications Table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-slate-100/80 px-3.5 py-2 font-bold text-slate-800 flex items-center justify-between border-b border-slate-200">
              <span className="flex items-center gap-1.5">
                <Snowflake className="w-3.5 h-3.5 text-emerald-600" />
                {languageMode === 'ar'
                  ? 'المواصفات الفنية والتصنيعية'
                  : languageMode === 'de'
                  ? 'Technische Spezifikationen'
                  : 'Technical Specifications'}
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                {languageMode === 'ar'
                  ? 'مطابق لمواصفات التصدير'
                  : languageMode === 'de'
                  ? 'Export-Standard'
                  : 'Export Grade Standard'}
              </span>
            </div>

            <div className="divide-y divide-slate-100 bg-white">
              {/* Size / Caliber */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-2.5 gap-1">
                <span className="font-semibold text-slate-500">
                  {languageMode === 'ar' ? 'المقاس / الكاليبر:' : languageMode === 'de' ? 'Kaliber / Größe:' : 'Caliber / Size:'}
                </span>
                <span className="sm:col-span-2 text-slate-900 font-medium">
                  {getSize()}
                  {languageMode === 'bilingual' && (
                    <span className="block text-[11px] text-slate-500 font-arabic mt-0.5">
                      {product.technicalSpecs.sizeAr}
                    </span>
                  )}
                </span>
              </div>

              {/* Processing Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-2.5 gap-1 bg-slate-50/50">
                <span className="font-semibold text-slate-500">
                  {languageMode === 'ar' ? 'طريقة المعالجة والتجهيز:' : languageMode === 'de' ? 'Verarbeitungsart:' : 'Processing Type:'}
                </span>
                <span className="sm:col-span-2 text-slate-900 font-medium">
                  {getProcessing()}
                  {languageMode === 'bilingual' && (
                    <span className="block text-[11px] text-slate-500 font-arabic mt-0.5">
                      {product.technicalSpecs.processingTypeAr}
                    </span>
                  )}
                </span>
              </div>

              {/* Freezing Temperatures */}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-2.5 gap-1">
                <span className="font-semibold text-slate-500">
                  {languageMode === 'ar' ? 'درجات التجميد:' : languageMode === 'de' ? 'Schockfrost-Temp:' : 'Freezing Temps:'}
                </span>
                <span className="sm:col-span-2 text-slate-900 font-mono font-medium text-[11.5px]">
                  {product.technicalSpecs.freezingTemp}
                </span>
              </div>
            </div>
          </div>

          {/* Quality Standards & Purity */}
          <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-emerald-50/70 px-3.5 py-2 font-bold text-emerald-900 flex items-center justify-between border-b border-emerald-100">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                {languageMode === 'ar'
                  ? 'معايير الجودة والنقاوة'
                  : languageMode === 'de'
                  ? 'Qualitätsstandards & Toleranzen'
                  : 'Quality Standards & Tolerances'}
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-white/80 px-2 py-0.5 rounded">
                {languageMode === 'ar' ? 'نقاوة: ≥ 99.8%' : 'Purity: ≥ 99.8%'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white">
              {/* Color */}
              <div className="p-3">
                <span className="block font-semibold text-slate-500 mb-0.5">
                  {languageMode === 'ar' ? 'اللون والصبغة الطبيعية:' : languageMode === 'de' ? 'Farbe:' : 'Natural Color:'}
                </span>
                <p className="text-slate-800">
                  {getColor()}
                </p>
                {languageMode === 'bilingual' && (
                  <p className="text-[11px] text-slate-500 font-arabic mt-1" dir="rtl">
                    {product.qualityStandards.colorAr}
                  </p>
                )}
              </div>

              {/* Texture & Firmness */}
              <div className="p-3">
                <span className="block font-semibold text-slate-500 mb-0.5">
                  {languageMode === 'ar' ? 'القوام والملمس:' : languageMode === 'de' ? 'Textur & Knackigkeit:' : 'Texture & Crispness:'}
                </span>
                <p className="text-slate-800">
                  {getTexture()}
                </p>
                {languageMode === 'bilingual' && (
                  <p className="text-[11px] text-slate-500 font-arabic mt-1" dir="rtl">
                    {product.qualityStandards.textureAr}
                  </p>
                )}
              </div>
            </div>

            {/* Defect Tolerance Bar */}
            <div className="bg-slate-50/70 px-3 py-2 border-t border-slate-100 text-[11px] text-slate-600 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span>
                <strong>{languageMode === 'ar' ? 'حدود العيوب والشوائب: ' : languageMode === 'de' ? 'Toleranzgrenzen: ' : 'Defect Limits: '}</strong>
                {getDefects()}
              </span>
              <span className="text-emerald-700 font-semibold font-mono">
                {languageMode === 'ar' ? 'النقاوة ≥ 99.8%' : 'Purity: ≥ 99.8%'}
              </span>
            </div>
          </div>

          {/* Packaging Formats */}
          <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/80 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-2">
              <Package className="w-3.5 h-3.5 text-slate-600" />
              <span>
                {languageMode === 'ar'
                  ? 'خيارات التعبئة المتاحة للمنتج:'
                  : languageMode === 'de'
                  ? 'Verfügbare Verpackungsformate:'
                  : 'Available Packaging Formats:'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="bg-white p-2 rounded-lg border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-600 block">
                  {languageMode === 'ar' ? 'عبوات التجزئة' : languageMode === 'de' ? 'Einzelhandel' : 'Retail Pack'}
                </span>
                <span className="text-slate-800 font-medium text-[11px]">
                  {getRetailPack()}
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-600 block">
                  {languageMode === 'ar' ? 'قطاع الفنادق والمطاعم' : languageMode === 'de' ? 'Gastronomie (HoReCa)' : 'Food Service / HoReCa'}
                </span>
                <span className="text-slate-800 font-medium text-[11px]">
                  {getFoodServicePack()}
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200/70">
                <span className="text-[10px] uppercase font-bold text-slate-600 block">
                  {languageMode === 'ar' ? 'تصدير صب (Bulk)' : languageMode === 'de' ? 'Industrie-Großgebinde' : 'Bulk Export'}
                </span>
                <span className="text-slate-800 font-medium text-[11px]">
                  {getBulkPack()}
                </span>
              </div>
            </div>
          </div>

          {/* Card Footer Actions (Hidden on Print) */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5 no-print">
            <button
              onClick={() => onOpenSpecModal(product)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1"
            >
              {languageMode === 'ar'
                ? 'عرض بطاقة المواصفات الكاملة ←'
                : languageMode === 'de'
                ? 'Vollständiges Datenblatt anzeigen →'
                : 'View Full Technical Sheet →'}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                title="Copy product specifications summary to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">
                      {languageMode === 'ar' ? 'تم النسخ!' : languageMode === 'de' ? 'Kopiert!' : 'Copied!'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      {languageMode === 'ar' ? 'نسخ البيانات' : languageMode === 'de' ? 'Daten kopieren' : 'Copy Specs'}
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={handleInquireWhatsApp}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                title="Inquire about this product on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>
                  {languageMode === 'ar' ? 'طلب عرض سعر' : languageMode === 'de' ? 'Angebot anfordern' : 'Get Quote'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
