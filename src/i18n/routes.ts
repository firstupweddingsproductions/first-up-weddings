// Route mapping between German (default) and English versions of the site.
// Used by the language switcher and hreflang alternates.

export type Lang = 'de' | 'en';

export type PageKey =
  | 'home'
  | 'filmstil'
  | 'euer-tag'
  | 'investition'
  | 'ueber-mich'
  | 'kontakt'
  | 'impressum'
  | 'datenschutz';

export const routes: Record<Lang, Record<PageKey, string>> = {
  de: {
    home: '/',
    filmstil: '/filmstil',
    'euer-tag': '/euer-tag',
    investition: '/investition',
    'ueber-mich': '/ueber-mich',
    kontakt: '/kontakt',
    impressum: '/impressum',
    datenschutz: '/datenschutz',
  },
  en: {
    home: '/en',
    filmstil: '/en/style',
    'euer-tag': '/en/your-day',
    investition: '/en/investment',
    'ueber-mich': '/en/about',
    kontakt: '/en/contact',
    impressum: '/en/imprint',
    datenschutz: '/en/privacy',
  },
};

/**
 * Detect the active language from a pathname.
 * Any path starting with /en (with or without trailing slash) is English; everything else is German.
 */
export function detectLang(pathname: string): Lang {
  const p = pathname.replace(/\/+$/, '');
  if (p === '/en' || p.startsWith('/en/')) return 'en';
  return 'de';
}

/**
 * Normalize a pathname for comparison (strip trailing slash but keep root "/").
 */
function normalize(pathname: string): string {
  const p = pathname.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

/**
 * Given the current pathname and language, returns the equivalent path in the other language.
 * Falls back to the home page of the other language if no exact mapping exists.
 */
export function getAlternateLocaleUrl(currentPath: string, currentLang: Lang): string {
  const normalized = normalize(currentPath);
  const otherLang: Lang = currentLang === 'de' ? 'en' : 'de';

  const current = routes[currentLang];
  const other = routes[otherLang];

  for (const key of Object.keys(current) as PageKey[]) {
    if (current[key] === normalized) {
      return other[key];
    }
  }

  return otherLang === 'en' ? '/en' : '/';
}
