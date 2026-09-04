import React, { useState } from 'react';
import { CompanyDetails } from '../types';
import { X, Building2, Save, RotateCcw } from 'lucide-react';
import { defaultCompanyDetails } from '../data/products';

interface CompanyEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyDetails;
  onSave: (updated: CompanyDetails) => void;
}

export const CompanyEditModal: React.FC<CompanyEditModalProps> = ({
  isOpen,
  onClose,
  company,
  onSave,
}) => {
  const [formData, setFormData] = useState<CompanyDetails>({ ...company });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({ ...defaultCompanyDetails });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                IQF Processing Factory Profile & Contact Details
              </h2>
              <p className="text-xs text-slate-500">
                Manage factory name, German/English/Arabic information, and export desk contacts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Factory Name (English)</label>
              <input
                type="text"
                name="nameEn"
                value={formData.nameEn}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Werkname (Deutsch)</label>
              <input
                type="text"
                name="nameDe"
                value={formData.nameDe || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1 font-arabic">اسم المصنع (عربي)</label>
              <input
                type="text"
                name="nameAr"
                value={formData.nameAr}
                onChange={handleChange}
                dir="rtl"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-arabic font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Slogan (English)</label>
              <input
                type="text"
                name="sloganEn"
                value={formData.sloganEn}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Slogan (Deutsch)</label>
              <input
                type="text"
                name="sloganDe"
                value={formData.sloganDe || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1 font-arabic">الشعار (عربي)</label>
              <input
                type="text"
                name="sloganAr"
                value={formData.sloganAr}
                onChange={handleChange}
                dir="rtl"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-arabic focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Export Desk</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Export Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Ports of Loading (EN)</label>
              <input
                type="text"
                name="portOfLoadingEn"
                value={formData.portOfLoadingEn}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Verschiffungshäfen (DE)</label>
              <input
                type="text"
                name="portOfLoadingDe"
                value={formData.portOfLoadingDe || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1 font-arabic">موانئ الشحن (عربي)</label>
              <input
                type="text"
                name="portOfLoadingAr"
                value={formData.portOfLoadingAr}
                onChange={handleChange}
                dir="rtl"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-arabic focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Plant Location (EN)</label>
              <input
                type="text"
                name="addressEn"
                value={formData.addressEn}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Werksstandort (DE)</label>
              <input
                type="text"
                name="addressDe"
                value={formData.addressDe || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1 font-arabic">موقع المصنع (عربي)</label>
              <input
                type="text"
                name="addressAr"
                value={formData.addressAr}
                onChange={handleChange}
                dir="rtl"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-arabic focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Defaults
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                Save & Apply to Catalog
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
