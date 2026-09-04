export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  nameDe: string;
  categoryEn: 'Vegetables' | 'Fruits' | 'Specialties';
  categoryAr: 'خضروات' | 'فواكه' | 'أطباق خاصة';
  categoryDe: 'Gemüse' | 'Früchte' | 'Spezialitäten';
  badgeEn: string;
  badgeAr: string;
  badgeDe: string;
  marketingDescEn: string;
  marketingDescAr: string;
  marketingDescDe: string;
  technicalSpecs: {
    sizeEn: string;
    sizeAr: string;
    sizeDe: string;
    processingTypeEn: string;
    processingTypeAr: string;
    processingTypeDe: string;
    freezingTemp: string;
    originEn: string;
    originAr: string;
    originDe: string;
    harvestSeasonEn: string;
    harvestSeasonAr: string;
    harvestSeasonDe: string;
  };
  qualityStandards: {
    colorEn: string;
    colorAr: string;
    colorDe: string;
    textureEn: string;
    textureAr: string;
    textureDe: string;
    purityEn: string;
    purityAr: string;
    purityDe: string;
    defectToleranceEn: string;
    defectToleranceAr: string;
    defectToleranceDe: string;
  };
  packaging: {
    retailEn: string;
    retailAr: string;
    retailDe: string;
    foodServiceEn: string;
    foodServiceAr: string;
    foodServiceDe: string;
    bulkEn: string;
    bulkAr: string;
    bulkDe: string;
  };
  primaryColor: string;
  accentColor: string;
  iconType: string;
  imageUrl?: string;
  varietyPhotos?: { labelAr: string; labelEn: string; url: string }[];
  keyHighlightsEn: string[];
  keyHighlightsAr: string[];
  keyHighlightsDe: string[];
}

export interface CompanyDetails {
  nameEn: string;
  nameAr: string;
  nameDe: string;
  sloganEn: string;
  sloganAr: string;
  sloganDe: string;
  facilityTypeEn: string;
  facilityTypeAr: string;
  facilityTypeDe: string;
  contactPerson: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  linkedin: string;
  portOfLoadingEn: string;
  portOfLoadingAr: string;
  portOfLoadingDe: string;
  countryEn: string;
  countryAr: string;
  countryDe: string;
  addressEn: string;
  addressAr: string;
  addressDe: string;
}

export type LanguageMode = 'en' | 'de' | 'ar' | 'bilingual';
