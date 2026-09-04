// Default real photographic product assets for Borouge IQF Factory
export const DEFAULT_PRODUCT_IMAGES: Record<string, string> = {
  'okra': '/images/products/okra.jpg',
  'green-peas': '/images/products/green-peas.jpg',
  'green-beans': '/images/products/green-beans.jpg',
  'broccoli-cauliflower': '/images/products/broccoli-cauliflower.jpg',
  'diced-carrots': '/images/products/diced-carrots.jpg',
  'mixed-vegetables': '/images/products/mixed-vegetables.jpg',
  'artichoke-bottoms': '/images/products/artichoke-bottoms.jpg',
  'peeled-garlic': '/images/products/peeled-garlic.jpg',
  'frozen-falafel': '/images/products/frozen-falafel.jpg',
  'french-fries': '/images/products/french-fries.jpg',
  'whole-strawberries': '/images/products/whole-strawberries.jpg',
  'pomegranate-seeds': '/images/products/pomegranate-seeds.jpg',
  'diced-onions': '/images/products/diced-onions.jpg',
};

// Variety gallery options matching the user's real factory packaging photos
export const PRODUCT_VARIETIES: Record<string, { id: string; labelAr: string; labelEn: string; image: string }[]> = {
  'okra': [
    { id: 'okra-zero', labelAr: 'بامية زيرو فاخرة (3-5 سم)', labelEn: 'Okra Zero (3-5 cm)', image: '/images/products/okra.jpg' },
    { id: 'okra-excellent', labelAr: 'بامية ممتازة نخب أول', labelEn: 'Okra Excellent Grade 1', image: '/images/products/okra.jpg' },
  ],
  'green-peas': [
    { id: 'peas-sack', labelAr: 'بسلة سكرية معبأة شيكارة', labelEn: 'Sweet Peas in Sack', image: '/images/products/green-peas.jpg' },
    { id: 'peas-liner', labelAr: 'بسلة فرز كرتون تصدير', labelEn: 'Sweet Peas Export Carton', image: '/images/products/green-peas.jpg' },
  ],
  'green-beans': [
    { id: 'beans-cut', labelAr: 'فاصوليا مقطعة 2-4 سم', labelEn: 'Cut Green Beans 2-4 cm', image: '/images/products/green-beans.jpg' },
    { id: 'beans-whole', labelAr: 'فاصوليا كاملة رفيعة', labelEn: 'Whole Fine Green Beans', image: '/images/products/green-beans.jpg' },
  ],
  'broccoli-cauliflower': [
    { id: 'broccoli-florets', labelAr: 'زهرات بروكلي خضراء', labelEn: 'Broccoli Florets', image: '/images/products/broccoli-cauliflower.jpg' },
    { id: 'cauliflower-florets', labelAr: 'زهرات قرنبيط عاجية', labelEn: 'Cauliflower Florets', image: '/images/products/broccoli-cauliflower.jpg' },
  ],
  'mixed-vegetables': [
    { id: 'mix-3way', labelAr: 'مشكل 3 أصناف (بسلة وجزر وفاصوليا)', labelEn: '3-Way Mix (Peas, Carrots, Beans)', image: '/images/products/mixed-vegetables.jpg' },
    { id: 'mix-4way', labelAr: 'مشكل 4 أصناف مع ذرة سكرية', labelEn: '4-Way Mix with Sweet Corn', image: '/images/products/mixed-vegetables.jpg' },
  ],
};

const STORAGE_KEY = 'borouge_custom_product_photos';

export function getCustomPhoto(productId: string): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw);
    return map[productId] || null;
  } catch {
    return null;
  }
}

export function setCustomPhoto(productId: string, dataUrl: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const map = raw ? JSON.parse(raw) : {};
    map[productId] = dataUrl;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent('borouge-photo-updated', { detail: { productId, dataUrl } }));
  } catch (e) {
    console.error('Failed to store custom photo', e);
  }
}

export function resetCustomPhoto(productId: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const map = JSON.parse(raw);
    delete map[productId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent('borouge-photo-updated', { detail: { productId, dataUrl: null } }));
  } catch (e) {
    console.error('Failed to remove custom photo', e);
  }
}
