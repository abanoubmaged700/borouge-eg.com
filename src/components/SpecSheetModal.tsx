import React from 'react';
import { Product, LanguageMode, CompanyDetails } from '../types';
import { ProductVisual } from './ProductVisual';
import { X, Printer, Copy, Check, Snowflake, ShieldCheck, Package } from 'lucide-react';

interface SpecSheetModalProps {
  product: Product | null;
  onClose: () => void;
  languageMode: LanguageMode;
  company: CompanyDetails;
}

export const SpecSheetModal: React.FC<SpecSheetModalProps> = ({
  product,
  onClose,
  languageMode,
  company,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!product) return null;

  const isAr = languageMode === 'ar';
  const isDe = languageMode === 'de';
  const isBilingual = languageMode === 'bilingual';

  const getProductName = () => {
    if (isAr) return product.nameAr;
    if (isDe) return product.nameDe || product.nameEn;
    return product.nameEn;
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

  const getSize = () => {
    if (isAr) return product.technicalSpecs.sizeAr;
    if (isDe) return product.technicalSpecs.sizeDe || product.technicalSpecs.sizeEn;
    return product.technicalSpecs.sizeEn;
  };

  const getProcessing = () => {
    if (isAr) return product.technicalSpecs.processingTypeAr;
    if (isDe) return product.technicalSpecs.processingTypeDe || product.technicalSpecs.processingTypeEn;
    return product.technicalSpecs.processingTypeEn;
  };

  const getColor = () => {
    if (isAr) return product.qualityStandards.colorAr;
    if (isDe) return product.qualityStandards.colorDe || product.qualityStandards.colorEn;
    return product.qualityStandards.colorEn;
  };

  const getTexture = () => {
    if (isAr) return product.qualityStandards.textureAr;
    if (isDe) return product.qualityStandards.textureDe || product.qualityStandards.textureEn;
    return product.qualityStandards.textureEn;
  };

  const getDefects = () => {
    if (isAr) return product.qualityStandards.defectToleranceAr;
    if (isDe) return product.qualityStandards.defectToleranceDe || product.qualityStandards.defectToleranceEn;
    return product.qualityStandards.defectToleranceEn;
  };

  const handleCopy = () => {
    let text = '';
    if (isAr) {
      text = `بطاقة المواصفات الفنية القياسية
المنتج: ${product.nameAr}
المصنع: ${company.nameAr}
المقاس / الكاليبر: ${product.technicalSpecs.sizeAr}
المعالجة: ${product.technicalSpecs.processingTypeAr}
اللون: ${product.qualityStandards.colorAr}
القوام: ${product.qualityStandards.textureAr}
النقاوة: ${product.qualityStandards.purityAr || '≥ 99.8%'}
التعبئة: ${product.packaging.retailAr} | ${product.packaging.bulkAr}
الحفظ: -18 مئوية مستمرة
واتساب: ${company.whatsapp}`;
    } else if (isDe) {
      text = `PRODUKTSPEZIFIKATIONSDATENBLATT
Produkt: ${product.nameDe || product.nameEn}
Hersteller: ${company.nameDe || company.nameEn}
Kaliber/Größe: ${product.technicalSpecs.sizeDe || product.technicalSpecs.sizeEn}
Verarbeitung: ${product.technicalSpecs.processingTypeDe || product.technicalSpecs.processingTypeEn}
Ursprung: Ägypten
Lagerung: -18°C kontinuierlich
Farbe: ${product.qualityStandards.colorDe || product.qualityStandards.colorEn}
Textur: ${product.qualityStandards.textureDe || product.qualityStandards.textureEn}
Reinheit: ≥ 99.8%
Verpackung: ${product.packaging.retailDe || product.packaging.retailEn} | ${product.packaging.bulkDe || product.packaging.bulkEn}
Zertifizierungen: ISO 22000, HACCP, ISO 9001
Kontakt / WhatsApp: ${company.whatsapp}`;
    } else {
      text = `PRODUCT SPECIFICATION DATA SHEET
Product: ${product.nameEn}
Manufacturer: ${company.nameEn}
Caliber/Size: ${product.technicalSpecs.sizeEn}
Processing: ${product.technicalSpecs.processingTypeEn}
Origin: Egypt
Storage: -18°C constant
Shelf Life: 18 Months
Color Standard: ${product.qualityStandards.colorEn}
Texture Standard: ${product.qualityStandards.textureEn}
Purity: ${product.qualityStandards.purityEn}
Packaging: ${product.packaging.retailEn} | ${product.packaging.bulkEn}
Certifications: ISO 22000, HACCP, ISO 9001
Export Desk / WhatsApp: ${company.whatsapp}`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                {isAr ? 'بطاقة المواصفات الفنية' : isDe ? 'Technisches Datenblatt (TDS)' : 'Technical Data Sheet (TDS)'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                REF: TDS-EGY-{product.id.toUpperCase()}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              {getProductName()}
              {isBilingual && (
                <span className="text-emerald-700 font-arabic text-base ml-2">({product.nameAr})</span>
              )}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Top Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div className="h-44 rounded-xl overflow-hidden shadow-xs">
              <ProductVisual productId={product.id} name={product.nameEn} size="full" />
            </div>
            <div className="md:col-span-2 space-y-2">
              {isAr ? (
                <p className="text-emerald-950 font-arabic font-medium leading-relaxed" dir="rtl">
                  {product.marketingDescAr}
                </p>
              ) : isDe ? (
                <p className="text-slate-700 font-medium leading-relaxed">
                  {product.marketingDescDe || product.marketingDescEn}
                </p>
              ) : isBilingual ? (
                <>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {product.marketingDescEn}
                  </p>
                  <p className="text-emerald-900 font-arabic font-medium leading-relaxed border-t border-slate-200 pt-2" dir="rtl">
                    {product.marketingDescAr}
                  </p>
                </>
              ) : (
                <p className="text-slate-700 font-medium leading-relaxed">
                  {product.marketingDescEn}
                </p>
              )}
            </div>
          </div>

          {/* Detailed Specifications Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-900 text-white px-4 py-2.5 font-bold flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <Snowflake className="w-4 h-4 text-emerald-400" />
                {isAr ? 'المحددات الفنية والفيزيائية' : isDe ? 'Physikalische & Technische Parameter' : 'Physical & Technical Parameters'}
              </span>
              <span className="text-slate-400">
                {isAr ? 'مواصفة تصديرية' : isDe ? 'Exportstandard' : 'Export Standard'}
              </span>
            </div>
            <table className="w-full text-left border-collapse text-xs">
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="p-3 font-semibold text-slate-600 w-1/3">
                    {isAr ? 'المقاس / الكاليبر' : isDe ? 'Kaliber / Größe' : 'Caliber / Size'}
                  </td>
                  <td className="p-3 text-slate-900 font-medium">
                    {getSize()}
                    {isBilingual && (
                      <span className="block text-slate-500 font-arabic mt-0.5">{product.technicalSpecs.sizeAr}</span>
                    )}
                  </td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="p-3 font-semibold text-slate-600">
                    {isAr ? 'طريقة التجهيز والمعالجة' : isDe ? 'Verarbeitungsmethode' : 'Processing Method'}
                  </td>
                  <td className="p-3 text-slate-900 font-medium">
                    {getProcessing()}
                    {isBilingual && (
                      <span className="block text-slate-500 font-arabic mt-0.5">{product.technicalSpecs.processingTypeAr}</span>
                    )}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-semibold text-slate-600">
                    {isAr ? 'بيانات التجميد' : isDe ? 'Tiefkühlprofil' : 'Freezing Profile'}
                  </td>
                  <td className="p-3 text-slate-900 font-mono">
                    {product.technicalSpecs.freezingTemp}
                  </td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="p-3 font-semibold text-slate-600">
                    {isAr ? 'المنشأ وموسم الحصاد' : isDe ? 'Ursprung & Saison' : 'Origin & Season'}
                  </td>
                  <td className="p-3 text-slate-900 font-medium">
                    {isAr
                      ? `مصر (${product.technicalSpecs.originAr}) • الحصاد: ${product.technicalSpecs.harvestSeasonAr}`
                      : isDe
                      ? `Ägypten • Erntezeit: ${product.technicalSpecs.harvestSeasonDe || product.technicalSpecs.harvestSeasonEn}`
                      : `${product.technicalSpecs.originEn} (Egypt) • Harvest: ${product.technicalSpecs.harvestSeasonEn}`}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-semibold text-slate-600">
                    {isAr ? 'معيار اللون' : isDe ? 'Farbprofil' : 'Color Profile'}
                  </td>
                  <td className="p-3 text-slate-900">
                    {getColor()}
                    {isBilingual && (
                      <span className="block text-slate-500 font-arabic mt-0.5" dir="rtl">{product.qualityStandards.colorAr}</span>
                    )}
                  </td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="p-3 font-semibold text-slate-600">
                    {isAr ? 'القوام والملمس' : isDe ? 'Textur & Knackigkeit' : 'Texture & Firmness'}
                  </td>
                  <td className="p-3 text-slate-900">
                    {getTexture()}
                    {isBilingual && (
                      <span className="block text-slate-500 font-arabic mt-0.5" dir="rtl">{product.qualityStandards.textureAr}</span>
                    )}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-semibold text-slate-600">
                    {isAr ? 'النقاوة والنظافة' : isDe ? 'Reinheit' : 'Purity & Cleanliness'}
                  </td>
                  <td className="p-3 text-emerald-800 font-semibold">
                    {isAr ? (product.qualityStandards.purityAr || '≥ 99.8%') : product.qualityStandards.purityEn}
                  </td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="p-3 font-semibold text-slate-600">
                    {isAr ? 'حدود العيوب والشوائب' : isDe ? 'Fehlertoleranz' : 'Defect Limits'}
                  </td>
                  <td className="p-3 text-slate-900">
                    {getDefects()}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-semibold text-slate-600">
                    {isAr ? 'الحفظ والصلاحية' : isDe ? 'Lagerung & Haltbarkeit' : 'Storage & Shelf Life'}
                  </td>
                  <td className="p-3 text-slate-900 font-medium">
                    {isAr
                      ? '-18 مئوية سلسلة تبريد مستمرة • 18 شهراً صلاحية مضمونة'
                      : isDe
                      ? '-18°C kontinuierliche Tiefkühlkette • Mindestens 18 Monate Haltbarkeit'
                      : '-18°C continuous cold chain • 18 Months minimum shelf-life'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Supplier Stamp */}
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">
                {isAr ? 'مصنع الإنتاج والتصدير:' : isDe ? 'Herstellerwerk / Exporteur:' : 'Export Factory & Supplier:'}
              </span>
              <span className="text-slate-900 font-black text-sm">
                {getCompanyName()}
                {isBilingual && <span className="ml-1 text-emerald-800">({company.nameAr})</span>}
              </span>
              <span className="text-slate-600 block mt-0.5">{getCompanyAddress()}</span>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-slate-500 block">
                {isAr ? 'التواصل المباشر:' : isDe ? 'Direktkontakt:' : 'Direct Inquiries:'}
              </span>
              <span className="text-emerald-700 font-bold font-mono">{company.whatsapp}</span>
              <span className="text-slate-600 block">{company.email}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between rounded-b-2xl">
          <span className="text-xs text-slate-400 font-mono">
            {isAr ? 'مواصفة تصديرية درجة أولى IQF' : isDe ? 'Ägyptischer IQF Klasse-A Exportstandard' : 'Grade-A Egyptian IQF Export Specification'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isAr ? 'تم النسخ!' : isDe ? 'Kopiert!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isAr ? 'نسخ المواصفة' : isDe ? 'Daten kopieren' : 'Copy Spec Data'}</span>
                </>
              )}
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isAr ? 'طباعة الكتالوج' : isDe ? 'Katalog drucken' : 'Print Catalog'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
