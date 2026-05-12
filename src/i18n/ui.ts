// Shared UI translations for chrome (Header, Footer, language switcher).
// Page-level content is translated inline in each /en/*.astro file.

import type { Lang } from './routes';

export const ui = {
  de: {
    'nav.filmstil': 'Filmstil',
    'nav.euer-tag': 'Euer Tag',
    'nav.ueber-mich': 'Über uns',
    'nav.investition': 'Investition',
    'nav.kontakt': 'Kontakt',
    'nav.menu-open': 'Menü öffnen',
    'footer.tagline': 'Cinematische Hochzeitsfilme, die Emotionen bewahren.',
    'footer.nav-heading': 'Navigation',
    'footer.contact-heading': 'Kontakt',
    'footer.legal-heading': 'Rechtliches',
    'footer.legal-imprint': 'Impressum',
    'footer.legal-privacy': 'Datenschutz',
    'footer.location': 'Deutschland',
    'footer.brand-link-prefix': 'Ein Angebot von',
    'lang.switcher-aria': 'Sprache wechseln',
    'lang.de': 'DE',
    'lang.en': 'EN',
  },
  en: {
    'nav.filmstil': 'Film style',
    'nav.euer-tag': 'Your day',
    'nav.ueber-mich': 'About',
    'nav.investition': 'Investment',
    'nav.kontakt': 'Contact',
    'nav.menu-open': 'Open menu',
    'footer.tagline': 'Cinematic wedding films that preserve real emotions.',
    'footer.nav-heading': 'Navigation',
    'footer.contact-heading': 'Contact',
    'footer.legal-heading': 'Legal',
    'footer.legal-imprint': 'Imprint',
    'footer.legal-privacy': 'Privacy',
    'footer.location': 'Germany',
    'footer.brand-link-prefix': 'Part of',
    'lang.switcher-aria': 'Switch language',
    'lang.de': 'DE',
    'lang.en': 'EN',
  },
} as const;

export type UIKey = keyof typeof ui.de;

/**
 * Look up a translation key. Falls back to German if a key is missing in English (should not happen if both maps are complete).
 */
export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key] ?? ui.de[key];
}
