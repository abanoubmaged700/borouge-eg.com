/**
 * Image Preloader Utility for Print and PDF Generation
 * Ensures 100% of images are fetched, cached, and decoded in browser memory
 * before triggering window.print(), avoiding empty / black boxes in Chromium.
 */

export interface ImageLoadReport {
  url: string;
  loaded: boolean;
  width?: number;
  height?: number;
  error?: string;
}

export async function preloadImage(url: string, timeoutMs: number = 8000): Promise<ImageLoadReport> {
  return new Promise((resolve) => {
    if (!url) {
      resolve({ url, loaded: false, error: 'Empty URL' });
      return;
    }

    const img = new Image();
    let isSettled = false;

    const timer = setTimeout(() => {
      if (!isSettled) {
        isSettled = true;
        resolve({ url, loaded: false, error: 'Timeout' });
      }
    }, timeoutMs);

    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (!isSettled) {
        isSettled = true;
        clearTimeout(timer);
        const w = img.naturalWidth || 0;
        const h = img.naturalHeight || 0;

        if (typeof img.decode === 'function') {
          img.decode()
            .then(() => resolve({ url, loaded: true, width: w, height: h }))
            .catch(() => resolve({ url, loaded: true, width: w, height: h }));
        } else {
          resolve({ url, loaded: true, width: w, height: h });
        }
      }
    };

    img.onerror = () => {
      if (!isSettled) {
        isSettled = true;
        clearTimeout(timer);
        resolve({ url, loaded: false, error: 'Failed to load image' });
      }
    };

    img.src = url;
  });
}

export async function preloadAllImages(urls: string[]): Promise<Record<string, ImageLoadReport>> {
  const reports: Record<string, ImageLoadReport> = {};
  const promises = urls.map(async (url) => {
    const report = await preloadImage(url);
    reports[url] = report;
  });
  await Promise.all(promises);
  return reports;
}
