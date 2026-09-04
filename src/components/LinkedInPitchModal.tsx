import React, { useState } from 'react';
import { CompanyDetails, LanguageMode } from '../types';
import { X, Copy, Check, Linkedin, MessageSquare, Mail, Sparkles } from 'lucide-react';

interface LinkedInPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyDetails;
  languageMode: LanguageMode;
}

export const LinkedInPitchModal: React.FC<LinkedInPitchModalProps> = ({
  isOpen,
  onClose,
  company,
  languageMode,
}) => {
  const [activeTab, setActiveTab] = useState<'linkedin-en' | 'linkedin-de' | 'linkedin-ar' | 'direct-buyer' | 'buyer-de'>('linkedin-en');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const templates = {
    'linkedin-en': `❄️ PREMIUM IQF FROZEN VEGETABLES & FRUITS | EGYPTIAN EXPORT CATALOG 🇪🇬

Are you sourcing Grade-A IQF vegetables and fruits for retail distribution, HoReCa, or food manufacturing in Europe, the GCC, or North America?

${company.nameEn} is pleased to present our official B2B Export Product Catalog, featuring harvest-fresh, flash-frozen Egyptian produce processed in our certified IQF facility under rigorous ISO 22000, HACCP & ISO 9001 standards:

🥦 Featured IQF Portfolio:
• IQF Okra (Zero: 3-5cm, Extra: 5-7cm, Excellent: 7-9cm)
• IQF Green Peas & Green Beans (Whole & Cut 2-4cm)
• IQF Broccoli & Cauliflower Florets (20-40mm & 40-60mm)
• IQF Diced Carrots (10x10mm) & 4-Way Mixed Vegetables
• IQF Artichoke Bottoms (Baladi calibrated 5-7cm cups)
• IQF Peeled Garlic Cloves (100% natural, sorted)
• Traditional Egyptian Falafel (Ta'ameya - Ready-to-fry)
• IQF 9x9mm French Fries (Grade A export quality)
• IQF Whole Sweet Strawberries (Stemless, calibrated)
• IQF Ruby Red Pomegranate Seeds (Wonderful, Brix ≥ 14%)

📦 Technical & Logistics Specifications:
- Processing: Individually Quick Frozen (IQF) fluidized bed
- Storage: -18°C continuous cold chain
- Shelf Life: 18 Months guaranteed
- Packaging: 400g, 1kg, 2.5kg & 10kg heavy-duty bulk export cartons
- Private Label (OEM) packaging supported
- Loading Port: Alexandria / Damietta / Port Said, Egypt
- 40ft Reefer Capacity: 24 - 26 MT Net Weight

📩 Importers, food distributors, and procurement managers: Connect via WhatsApp at ${company.whatsapp} or email ${company.email} to receive our latest CIF/FOB price list and container shipping schedule.
Website: ${company.website}

#FrozenFood #IQF #AgroExport #FoodProcurement #B2BFood #EgyptExports #VegetableImport #PrivateLabel #ISO22000`,

    'linkedin-de': `❄️ PREMIUM IQF TIEFGEKÜHLTES GEMÜSE & FRÜCHTE AUS ÄGYPTEN 🇪🇬 | B2B EXPORTKATALOG FÜR EUROPA 🇩🇪 🇦🇹 🇨🇭

Suchen Sie zertifizierte IQF-Klasse-A Tiefkühlprodukte für den Lebensmittelgroßhandel, den LEH, die Gastronomie (HoReCa) oder industrielle Weiterverarbeitung?

Das Verarbeitungswerk von ${company.nameDe || company.nameEn} präsentiert den offiziellen B2B-Exportkatalog mit erntefrisch schockgefrostetem Gemüse und Früchten aus Ägypten – verarbeitet nach strengsten europäischen Qualitätsnormen (ISO 22000, HACCP, ISO 9001):

🥦 Unser IQF-Sortiment:
• IQF Okra (Zero 3-5cm, Extra 5-7cm, Excellent 7-9cm)
• IQF Grüne Erbsen (zartsüß) & Grüne Bohnen (Ganz & Schnitt)
• IQF Brokkoli- & Blumenkohlröschen (20-40mm & 40-60mm)
• IQF Karottenwürfel (10x10mm) & 4-Komponenten-Mischgemüse
• IQF Artischockenböden (5-7cm kalibriert)
• IQF Geschälter Knoblauch (naturbelassen, gereinigt)
• Ägyptische Falafel (Traditionelle Rezeptur, frittierfertig)
• IQF Pommes Frites (9x9mm Schnitt)
• IQF Ganze Erdbeeren (entstielt, sortiert)
• IQF Granatapfelkerne (Sorte Wonderful, tiefrot, Brix ≥ 14%)

📦 Spezifikationen & Logistik:
- Schockfrostung: Modernste IQF-Wirbelschichttechnik
- Lagertemperatur: Durchgehend -18°C Tiefkühlkette
- Mindesthaltbarkeit: 18 Monate garantiert
- Gebindegrößen: 400g, 1kg, 2,5kg & 10kg Industrie-Exportkartons mit PE-Inliner
- Private Label (Handelsmarken / OEM) flexibel realisierbar
- Verladung: Alexandria & Damietta, Ägypten (kurze Seewege nach Südeuropa & Hamburg/Rotterdam)
- Container-Kapazität: 24 - 26 MT netto im 40-Fuß-Kühlcontainer

📩 Für Einkäufer und Importeure: Fordern Sie noch heute unsere aktuellen Spezifikationsdatenblätter und FOB/CIF-Angebote an.
WhatsApp: ${company.whatsapp} | E-Mail: ${company.email}
Web: ${company.website}

#Tiefkuehlkost #IQF #Lebensmittelgrosshandel #AgroExport #B2B #Handelsmarke #Fruchtimport #Gemueseimport`,

    'linkedin-ar': `❄️ كتالوج تصدير الخضروات والفواكه المجمدة IQF المصرية | جودة تصدير نخب أول 🇪🇬

يسر مصنع ${company.nameAr} (${company.nameEn}) المتخصص في التجميد السريع IQF للحاصلات الزراعية أن يعلن لشركائه التجاريين والمستوردين في دول الخليج العربي وأوروبا عن توفر تشكيلتنا الكاملة لموسم 2025/2026:

🌱 قائمة المنتجات التصديرية:
• بامية مجمدة فاخرة (زيرو 3-5سم، إكسترا 5-7سم، ممتازة 7-9سم)
• بسلة خضراء سكرية نقية وفاصوليا خضراء (كاملة ومقطعة)
• زهرات البروكلي والقرنبيط المتماسكة
• جزر مكعبات 10×10 مم وخضار مشكل 4 أصناف
• قيعان خرشوف مصري بلدي مقور ومفرز بعناية
• ثوم مقشر مجمد طبيعي 100%
• فلافل مصرية تقليدية جاهزة للقلي
• أصابع بطاطس نصف مقلية 9×9 مم
• فراولة كاملة مجمدة منزوعة العنق
• حبوب رمان مصري ياقوتي أحمر مفرز

📋 المعايير والمواصفات العامة:
- تكنولوجيا التجميد: تجميد فردي سريع IQF بأحدث خطوط الإنتاج
- الحفظ والتخزين: -18 درجة مئوية مستمرة
- الصلاحية: 18 شهراً من تاريخ التعبئة
- التعبئة: 400 جم، 1 كجم، 2.5 كجم، 10 كجم كرتون تصدير صب
- إمكانية التعبئة بالعلامة التجارية الخاصة للمستورد (Private Label)
- الشهادات: ISO 22000, HACCP, ISO 9001, Halal
- موانئ الشحن: الإسكندرية / دمياط / بورسعيد - مصر
- حمولة الحاوية المبردة 40 قدم: 24 إلى 26 طن صافي

📞 للتواصل مع إدارة التصدير وعروض الأسعار (FOB / CIF):
واتساب: ${company.whatsapp}
البريد الإلكتروني: ${company.email}
الموقع الإلكتروني: ${company.website}

#تصدير_مصري #خضروات_مجمدة #مصنع_تجميد #IQF #تجارة_دولية #مصر_للتصدير`,

    'direct-buyer': `Subject: Direct IQF Frozen Produce Export Supply Offer - ${company.nameEn} (Egypt)

Dear Procurement & Sourcing Team,

I hope this email finds you well.

I am contacting you on behalf of ${company.nameEn}, an established Egyptian IQF processing factory specializing in Grade-A individually quick frozen vegetables and fruits.

Our production plant operates under strict European food-grade standards (ISO 22000, HACCP, and ISO 9001 certified).

Core Export Portfolio:
1. IQF Okra (Zero: 3-5cm, Extra: 5-7cm, Excellent: 7-9cm)
2. IQF Green Peas (Sweet variety, 8-10mm) & Green Beans (Cut 2-4cm / Whole)
3. IQF Broccoli & Cauliflower Florets (20-40mm & 40-60mm)
4. IQF Diced Carrots (10x10mm) & 4-Way Mixed Vegetables
5. IQF Artichoke Bottoms (Calibrated 5-7cm cups)
6. IQF Peeled Garlic Cloves (Clean, ready to use)
7. Traditional Egyptian Falafel (Authentic Egyptian fava bean recipe)
8. IQF French Fries (9x9mm premium cut)
9. IQF Whole Strawberries (Selected Egyptian varieties, stemless)
10. IQF Ruby Pomegranate Seeds (Wonderful variety, Brix ≥ 14%)

Key Export & Contract Terms:
- Cold Chain: Continuous -18°C temperature monitoring
- Shelf Life: Guaranteed 18 Months
- Packaging: Retail (400g/1kg), Food Service (2.5kg), and Bulk (10kg export cartons with blue food-grade PE liner)
- OEM & Private Label branding options available
- Port of Loading: Alexandria / Damietta, Egypt (40ft Reefer: 24 - 26 MT Net)

Please let us know your required product specifications and target volume for your upcoming procurement cycles. We would be delighted to provide full technical specification sheets (TDS), certificates of analysis (COA), and our competitive FOB / CIF quotations.

Best regards,

Export Sales Department
${company.nameEn}
WhatsApp / Phone: ${company.whatsapp}
Email: ${company.email}
Website: ${company.website}`,

    'buyer-de': `Betreff: B2B-Lieferangebot: Hochwertige IQF-Tiefkühlprodukte aus Ägypten - ${company.nameDe || company.nameEn}

Sehr geehrte Damen und Herren der Einkaufsabteilung,

wir kontaktieren Sie im Namen von ${company.nameDe || company.nameEn}, einem zertifizierten ägyptischen IQF-Verarbeitungswerk für schockgefrostetes Obst und Gemüse.

Unsere Produktion erfüllt höchste europäische Lebensmittelsicherheits- und Qualitätsstandards (zertifiziert nach ISO 22000, HACCP und ISO 9001).

Kernsortiment für den europäischen Markt:
1. IQF Okra (Kaliber Zero: 3-5cm, Extra: 5-7cm, Excellent: 7-9cm)
2. IQF Grüne Erbsen (süß, zart) & Grüne Bohnen (Schnitt 2-4cm & Ganz)
3. IQF Brokkoli- & Blumenkohlröschen (20-40mm & 40-60mm)
4. IQF Karottenwürfel (10x10mm) & 4-fach Mischgemüse
5. IQF Artischockenböden (kalibriert 5-7cm)
6. IQF Geschälter Knoblauch (100% sortenrein)
7. Ägyptische Falafel (Traditionelle Rezeptur)
8. IQF Pommes Frites (9x9mm)
9. IQF Ganze Erdbeeren (entstielt, handverlesen)
10. IQF Granatapfelkerne (Sorte Wonderful, tiefrot, Brix ≥ 14%)

Rahmendaten & Logistik:
- Tiefkühlkette: Durchgehend -18°C
- Haltbarkeit: Mindestens 18 Monate ab Produktion
- Verpackung: Einzelhandel (400g/1kg), HoReCa (2,5kg) sowie 10kg Industrie-Großgebinde mit PE-Schutzinliner
- Private Label / Eigenmarken für den Handel problemlos umsetzbar
- Verladung: Alexandria & Damietta, Ägypten (40ft Kühlcontainer: 24 - 26 Tonnen netto)

Gerne stellen wir Ihnen detaillierte technische Datenblätter (TDS), Prüfberichte und wettbewerbsfähige CIF-Angebote (z.B. CIF Hamburg / Rotterdam / Genua / Triest) zur Verfügung.

Mit freundlichen Grüßen,

Exportleitung
${company.nameDe || company.nameEn}
WhatsApp: ${company.whatsapp}
E-Mail: ${company.email}
Web: ${company.website}`
  };

  const activeContent = templates[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Linkedin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {languageMode === 'ar' ? 'نصوص تسويقية لينكدإن ورسائل المشترين' : languageMode === 'de' ? 'LinkedIn & B2B-Anschreiben Vorlagen' : 'LinkedIn & B2B Buyer Pitch Copy'}
              </h2>
              <p className="text-xs text-slate-500">
                {languageMode === 'ar' ? 'منشورات جاهزة للنشر على لينكدإن ورسائل مباشرة لمسؤولي المشتريات والتصدير' : languageMode === 'de' ? 'Veröffentlichungsreife LinkedIn-Beiträge & B2B-Einkäufer-Mails für den EU-Markt' : 'Ready-to-publish social media announcements & direct buyer introduction emails'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-slate-200 flex gap-2 overflow-x-auto bg-slate-50">
          <button
            onClick={() => setActiveTab('linkedin-en')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'linkedin-en'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            LinkedIn (English)
          </button>
          <button
            onClick={() => setActiveTab('linkedin-de')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'linkedin-de'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            LinkedIn (Deutsch)
          </button>
          <button
            onClick={() => setActiveTab('buyer-de')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'buyer-de'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            B2B Einkäufer-Mail (DE)
          </button>
          <button
            onClick={() => setActiveTab('direct-buyer')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'direct-buyer'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Buyer Email (EN)
          </button>
          <button
            onClick={() => setActiveTab('linkedin-ar')}
            className={`px-3 py-2 text-xs font-bold border-b-2 font-arabic transition-all whitespace-nowrap ${
              activeTab === 'linkedin-ar'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            منشور لينكدإن (عربي)
          </button>
        </div>

        {/* Modal Body / Textarea */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="relative">
            <textarea
              readOnly
              value={activeContent}
              dir={activeTab === 'linkedin-ar' ? 'rtl' : 'ltr'}
              rows={14}
              className={`w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs sm:text-sm font-mono leading-relaxed focus:outline-hidden resize-none ${
                activeTab === 'linkedin-ar' ? 'font-arabic text-right' : ''
              }`}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {languageMode === 'ar' ? 'انسخ النص والصقه مباشرة في لينكدإن أو بريدك الإلكتروني.' : languageMode === 'de' ? 'Klicken Sie auf Kopieren und fügen Sie den Text in LinkedIn oder Ihr E-Mail-Programm ein.' : 'Click copy, then paste directly into LinkedIn or your email client.'}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium"
            >
              {languageMode === 'ar' ? 'إغلاق' : languageMode === 'de' ? 'Schließen' : 'Close'}
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{languageMode === 'ar' ? 'تم النسخ للحافظة!' : languageMode === 'de' ? 'In Zwischenablage kopiert!' : 'Copied to Clipboard!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{languageMode === 'ar' ? 'نسخ النص' : languageMode === 'de' ? 'Text kopieren' : 'Copy Text'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
