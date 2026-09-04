import React, { useState, useEffect, useRef } from 'react';
import { Camera, ZoomIn, Upload, RotateCcw, Check, Sparkles, X } from 'lucide-react';
import { DEFAULT_PRODUCT_IMAGES, PRODUCT_VARIETIES, getCustomPhoto, setCustomPhoto, resetCustomPhoto } from '../data/productImages';

interface ProductVisualProps {
  productId: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  allowUpload?: boolean;
  showBadge?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  productId,
  name,
  size = 'md',
  className = '',
  allowUpload = true,
  showBadge = true,
}) => {
  const [photoUrl, setPhotoUrl] = useState<string>(
    () => getCustomPhoto(productId) || DEFAULT_PRODUCT_IMAGES[productId] || '/images/products/okra.jpg'
  );
  const [isCustom, setIsCustom] = useState<boolean>(() => !!getCustomPhoto(productId));
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeVariety, setActiveVariety] = useState<string>('');
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state if custom photo changed via event
  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ productId: string; dataUrl: string | null }>;
      if (customEvent.detail.productId === productId) {
        if (customEvent.detail.dataUrl) {
          setPhotoUrl(customEvent.detail.dataUrl);
          setIsCustom(true);
        } else {
          setPhotoUrl(DEFAULT_PRODUCT_IMAGES[productId] || '/images/products/okra.jpg');
          setIsCustom(false);
        }
      }
    };

    window.addEventListener('borouge-photo-updated', handleUpdate);
    return () => window.removeEventListener('borouge-photo-updated', handleUpdate);
  }, [productId]);

  // Handle local file upload (e.g. user WhatsApp photo)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('يُرجى اختيار ملف صورة صالح (JPEG أو PNG)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCustomPhoto(productId, result);
        setPhotoUrl(result);
        setIsCustom(true);
        setUploadFeedback('تم تحديث الصورة الحقيقية بنجاح!');
        setTimeout(() => setUploadFeedback(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetCustomPhoto(productId);
    setPhotoUrl(DEFAULT_PRODUCT_IMAGES[productId] || '/images/products/okra.jpg');
    setIsCustom(false);
    setUploadFeedback('تمت استعادة الصورة الأصلية');
    setTimeout(() => setUploadFeedback(null), 2500);
  };

  const varieties = PRODUCT_VARIETIES[productId] || [];

  const containerSizes = {
    sm: 'w-16 h-16 min-h-[4rem]',
    md: 'w-full h-56 min-h-[14rem]',
    lg: 'w-full h-72 min-h-[18rem]',
    full: 'w-full h-full min-h-[10rem]',
  };

  if (size === 'sm') {
    return (
      <div className={`relative overflow-hidden rounded-lg bg-slate-900 shadow-2xs ${containerSizes[size]} ${className}`}>
        <img
          src={photoUrl}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg pointer-events-none" />
      </div>
    );
  }

  return (
    <>
      <div
        id={`product-visual-${productId}`}
        className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-slate-900 border border-slate-200/80 shadow-xs ${containerSizes[size]} ${className}`}
      >
        {/* Real Product Photo */}
        <img
          src={photoUrl}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle Dark Vignette gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Real Photo Authentic Badge */}
        {showBadge && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-emerald-500/40 text-white text-[10.5px] font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium tracking-wide">
              {isCustom ? 'صورة مرفوعة حقيقية' : 'صورة طبيعية حقيقية'}
            </span>
            <span className="text-emerald-400 text-[10px] hidden sm:inline">100% Real</span>
          </div>
        )}

        {/* Temp & Flash Frozen badge */}
        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold">
          -18°C IQF
        </div>

        {/* Feedback message banner */}
        {uploadFeedback && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 px-3 py-1 bg-emerald-700 text-white rounded-md text-xs font-bold shadow-lg flex items-center gap-1.5 animate-bounce">
            <Check className="w-3.5 h-3.5" />
            <span>{uploadFeedback}</span>
          </div>
        )}

        {/* Variety Sub-Chips if available */}
        {varieties.length > 0 && size !== 'sm' && (
          <div className="absolute bottom-11 left-3 right-3 z-10 flex flex-wrap gap-1">
            {varieties.map((v) => (
              <button
                key={v.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveVariety(v.id);
                  setPhotoUrl(v.image);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold backdrop-blur-md border transition-all ${
                  activeVariety === v.id
                    ? 'bg-emerald-500 text-white border-emerald-300'
                    : 'bg-black/60 text-slate-200 border-white/20 hover:bg-black/80'
                }`}
              >
                {v.labelAr}
              </button>
            ))}
          </div>
        )}

        {/* Bottom Action Controls on Hover / Touch */}
        <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-between gap-1">
          {/* Zoom Lightbox Trigger */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/90 hover:bg-white text-slate-900 rounded-md text-xs font-semibold shadow-md transition-all active:scale-95"
            title="تكبير وفحص الحبات وجودة التجميد"
          >
            <ZoomIn className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-[11px]">فحص وتكبير</span>
          </button>

          {/* Upload and Reset Actions */}
          {allowUpload && (
            <div className="flex items-center gap-1">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-md text-xs font-semibold shadow-md transition-all active:scale-95"
                title="اضغط لرفع صورتك الحقيقية من الموبايل أو الواتساب"
              >
                <Upload className="w-3 h-3" />
                <span className="text-[11px] hidden sm:inline">رفع صورة للمنتج</span>
                <span className="text-[11px] sm:hidden">رفع</span>
              </button>

              {isCustom && (
                <button
                  onClick={handleReset}
                  className="p-1 bg-black/60 hover:bg-black text-slate-300 hover:text-white rounded-md transition-colors"
                  title="استعادة الصورة الافتراضية"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox High-Resolution Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="إغلاق المعاينة"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Header */}
          <div
            className="absolute top-4 left-4 z-50 flex items-center gap-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600/80 text-xs font-bold font-arabic">
              <Sparkles className="w-4 h-4" />
              <span>فحص جودة الحبات والتجميد IQF</span>
            </div>
            <span className="text-sm font-bold">{name}</span>
          </div>

          {/* Image Canvas in Lightbox */}
          <div
            className="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photoUrl}
              alt={name}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[80vh] object-contain select-none"
            />
          </div>

          {/* Modal Bottom Tool Bar */}
          <div
            className="mt-4 flex items-center gap-3 text-white text-xs bg-slate-900/80 px-4 py-2 rounded-xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-arabic text-emerald-400 font-bold">
              درجة التجميد: -18 مئوية • نقاوة: ≥ 99.8% • خالية من المواد الحافظة
            </span>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-white font-bold transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>تغيير هذه الصورة بصورة من هاتفك</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
