import React from 'react';
import { generalSpecifications } from '../data/products';
import { LanguageMode, CompanyDetails } from '../types';
import { ThermometerSnowflake, Calendar, PackageCheck, Award, Ship, ShieldCheck, Layers } from 'lucide-react';

interface GeneralSpecsSectionProps {
  languageMode: LanguageMode;
  company: CompanyDetails;
}

export const GeneralSpecsSection: React.FC<GeneralSpecsSectionProps> = ({
  languageMode,
  company,
}) => {
  const isAr = languageMode === 'ar';
  const isDe = languageMode === 'de';
  const isBilingual = languageMode === 'bilingual';

  const getSectionBadge = () => {
    if (isAr) return 'المواصفات القياسية العامة للتصدير';
    if (isDe) return 'Allgemeine Export-Standardspezifikationen';
    return 'General Export Specifications';
  };

  const getSectionTitle = () => {
    if (isAr) return 'المعايير العامة، التخزين واللوجستيات';
    if (isDe) return 'Allgemeine Spezifikationen, Lagerung & Logistik';
    return 'General Specifications, Storage & Logistics';
  };

  const getStorageDesc = () => {
    if (isAr) return generalSpecifications.storage.ar;
    if (isDe) return generalSpecifications.storage.de || generalSpecifications.storage.en;
    return generalSpecifications.storage.en;
  };

  const getShelfLifeDesc = () => {
    if (isAr) return generalSpecifications.shelfLife.ar;
    if (isDe) return generalSpecifications.shelfLife.de || generalSpecifications.shelfLife.en;
    return generalSpecifications.shelfLife.en;
  };

  const getShelfLifeValue = () => {
    if (isAr) return '18 شهراً';
    if (isDe) return '18 Monate';
    return '18 Months';
  };

  const getReeferDesc = () => {
    if (isAr) return generalSpecifications.shippingAndLogistics.payloadCapacityAr;
    if (isDe) return generalSpecifications.shippingAndLogistics.payloadCapacityDe || generalSpecifications.shippingAndLogistics.payloadCapacityEn;
    return generalSpecifications.shippingAndLogistics.payloadCapacityEn;
  };

  const getPortDesc = () => {
    if (isAr) return company.portOfLoadingAr;
    if (isDe) return company.portOfLoadingDe || company.portOfLoadingEn;
    return company.portOfLoadingEn;
  };

  const getPackagingList = () => {
    if (isAr) return generalSpecifications.packagingOptions.ar;
    if (isDe) return generalSpecifications.packagingOptions.de || generalSpecifications.packagingOptions.en;
    return generalSpecifications.packagingOptions.en;
  };

  return (
    <section id="general-specifications" className="my-12 avoid-break">
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-10 shadow-lg border-2 border-emerald-800">
        {/* Section Header */}
        <div className="border-b-2 border-emerald-800/80 pb-6 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-bold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {getSectionBadge()}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
              {getSectionTitle()}
            </h2>
            {isBilingual && (
              <p className="text-sm font-arabic text-emerald-300 font-medium mt-1">
                المعايير الدولية للتخزين، التعبئة، شهادات الجودة والشحن المبرد
              </p>
            )}
          </div>
          <div className="text-xs text-emerald-400 font-mono tracking-widest uppercase">
            <span>STANDARD: B2B-EXP-EGY-REV4</span>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Pillar 1: Temperature & Storage */}
          <div className="bg-slate-950/70 rounded-lg p-5 border border-slate-800 hover:border-emerald-500 transition-colors">
            <div className="w-10 h-10 rounded bg-emerald-900/60 border border-emerald-700 text-emerald-300 flex items-center justify-center mb-4">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-1">
              {isAr ? 'درجة حرارة التخزين' : isDe ? 'Lagertemperatur' : 'Storage Temperature'}
            </h3>
            <div className="text-2xl font-bold text-white font-mono mb-2">
              -18°C <span className="text-xs font-sans font-normal text-slate-400">(-0.4°F)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {getStorageDesc()}
            </p>
            {isBilingual && (
              <p className="text-[11px] text-emerald-200/80 font-arabic mt-2 pt-2 border-t border-slate-800" dir="rtl">
                {generalSpecifications.storage.ar}
              </p>
            )}
          </div>

          {/* Pillar 2: Shelf Life */}
          <div className="bg-slate-950/70 rounded-lg p-5 border border-slate-800 hover:border-emerald-500 transition-colors">
            <div className="w-10 h-10 rounded bg-emerald-900/60 border border-emerald-700 text-emerald-300 flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-1">
              {isAr ? 'فترة الصلاحية' : isDe ? 'Mindesthaltbarkeit' : 'Guaranteed Shelf Life'}
            </h3>
            <div className="text-2xl font-bold text-white font-mono mb-2">
              {getShelfLifeValue()}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {getShelfLifeDesc()}
            </p>
            {isBilingual && (
              <p className="text-[11px] text-emerald-200/80 font-arabic mt-2 pt-2 border-t border-slate-800" dir="rtl">
                {generalSpecifications.shelfLife.ar}
              </p>
            )}
          </div>

          {/* Pillar 3: Container Capacity */}
          <div className="bg-slate-950/70 rounded-lg p-5 border border-slate-800 hover:border-emerald-500 transition-colors">
            <div className="w-10 h-10 rounded bg-emerald-900/60 border border-emerald-700 text-emerald-300 flex items-center justify-center mb-4">
              <Ship className="w-5 h-5" />
            </div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-1">
              {isAr ? 'حمولة الحاوية 40 قدم' : isDe ? '40-Fuß-Kühlcontainer' : '40ft Reefer Capacity'}
            </h3>
            <div className="text-2xl font-bold text-white font-mono mb-2">
              24 – 26 MT <span className="text-xs font-sans font-normal text-slate-400">Net</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {getReeferDesc()}
            </p>
            {isBilingual && (
              <p className="text-[11px] text-emerald-200/80 font-arabic mt-2 pt-2 border-t border-slate-800" dir="rtl">
                {generalSpecifications.shippingAndLogistics.payloadCapacityAr}
              </p>
            )}
          </div>

          {/* Pillar 4: Ports of Loading */}
          <div className="bg-slate-950/70 rounded-lg p-5 border border-slate-800 hover:border-emerald-500 transition-colors">
            <div className="w-10 h-10 rounded bg-emerald-900/60 border border-emerald-700 text-emerald-300 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-1">
              {isAr ? 'ميناء الشحن والمنشأ' : isDe ? 'Verladehafen & Ursprung' : 'Loading Port & Origin'}
            </h3>
            <div className="text-xl font-bold text-white mb-2 truncate">
              {isAr ? company.countryAr : isDe ? (company.countryDe || company.countryEn) : company.countryEn}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {getPortDesc()}
            </p>
            {isBilingual && (
              <p className="text-[11px] text-emerald-200/80 font-arabic mt-2 pt-2 border-t border-slate-800" dir="rtl">
                {company.portOfLoadingAr}
              </p>
            )}
          </div>
        </div>

        {/* Packaging Formats Detailed Table */}
        <div className="mb-10 bg-slate-950/50 rounded-lg p-6 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <PackageCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold uppercase tracking-wider text-white">
              {isAr
                ? 'خيارات التعبئة والتغليف المعتمدة'
                : isDe
                ? 'Zertifizierte Verpackungsoptionen'
                : 'Standard Export Packaging Options'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getPackagingList().map((pkg, index) => (
              <div key={index} className="bg-slate-900 rounded p-4 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-slate-950 bg-emerald-400 px-2 py-0.5 rounded inline-block mb-2 uppercase">
                    {pkg.size}
                  </div>
                  <div className="text-sm font-bold text-white mb-1.5">{pkg.type}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{pkg.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {isBilingual && (
            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="font-arabic" dir="rtl">
                * جميع العبوات الكرتونية مصنعة من 5 طبقات مقاومة للرطوبة ومبطنة بأكياس بولي إيثيلين زرقاء مطابقة للمعايير الغذائية الدولية.
              </span>
              <span>* All cartons are 5-ply heavy-duty moisture resistant with food-safe blue PE liners.</span>
            </div>
          )}
        </div>

        {/* Certifications Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold uppercase tracking-wider text-white">
              {isAr
                ? 'شهادات الجودة والاعتمادات الدولية'
                : isDe
                ? 'Qualitätszertifikate & EU-Konformität'
                : 'Quality Certifications & Export Compliance'}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {generalSpecifications.certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-slate-950/60 rounded p-4 border border-slate-800 hover:border-emerald-500/60 transition-all flex items-start gap-3.5"
              >
                <div className="px-2 py-1 rounded bg-emerald-950 border border-emerald-600 text-emerald-300 font-mono font-bold text-xs flex-shrink-0 mt-0.5">
                  {cert.badge.split(' ')[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white uppercase">{cert.name}</span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-400 mb-1">
                    {isAr ? cert.titleAr : isDe ? (cert.titleDe || cert.titleEn) : cert.titleEn}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isAr ? cert.descAr : isDe ? (cert.descDe || cert.descEn) : cert.descEn}
                  </p>
                  {isBilingual && (
                    <p className="text-[11px] text-emerald-300/80 font-arabic mt-1" dir="rtl">
                      {cert.descAr}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
