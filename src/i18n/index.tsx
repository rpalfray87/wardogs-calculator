import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import type { Dict, TranslationKey } from './dict';
import { DEFAULT_LANGUAGE, languageInfo, type Language } from './languages';
import { ar } from './locales/ar';
import { bn } from './locales/bn';
import { de } from './locales/de';
import { en } from './locales/en';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { hi } from './locales/hi';
import { id } from './locales/id';
import { it } from './locales/it';
import { ja } from './locales/ja';
import { ko } from './locales/ko';
import { nl } from './locales/nl';
import { pl } from './locales/pl';
import { pt } from './locales/pt';
import { ru } from './locales/ru';
import { th } from './locales/th';
import { tr } from './locales/tr';
import { ur } from './locales/ur';
import { vi } from './locales/vi';
import { zh } from './locales/zh';

export { DEFAULT_LANGUAGE, LANGUAGES, isLanguage, languageInfo } from './languages';
export type { Language } from './languages';
export type { TranslationKey } from './dict';

/**
 * Every translation ships with the app: it has to keep working offline
 * (Electron overlay, PWA) and the amount of text is far too small to justify
 * lazy loading.
 */
export const DICTS: Record<Language, Dict> = {
  en,
  zh,
  hi,
  es,
  fr,
  ar,
  bn,
  pt,
  ru,
  ur,
  id,
  de,
  ja,
  tr,
  ko,
  vi,
  it,
  th,
  pl,
  nl,
};

export type Vars = Record<string, string | number>;

/** Translation function: `t('history.deleteAria', { label })`. */
export type Translate = (key: TranslationKey, vars?: Vars) => string;

export function translate(language: Language, key: TranslationKey, vars?: Vars): string {
  // Fall back to English: a missing key shows readable text, not the key itself.
  const template = DICTS[language]?.[key] ?? en[key] ?? key;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
}

interface I18nValue {
  language: Language;
  dir: 'ltr' | 'rtl';
  t: Translate;
}

const I18nContext = createContext<I18nValue>({
  language: DEFAULT_LANGUAGE,
  dir: 'ltr',
  t: (key, vars) => translate(DEFAULT_LANGUAGE, key, vars),
});

export function I18nProvider({
  language,
  children,
}: {
  language: Language;
  children: ReactNode;
}) {
  const value = useMemo<I18nValue>(() => {
    const info = languageInfo(language);
    return {
      language,
      dir: info.dir,
      t: (key, vars) => translate(language, key, vars),
    };
  }, [language]);

  // The document itself has to follow: screen readers, hyphenation, and
  // reading direction for Arabic and Urdu.
  useEffect(() => {
    document.documentElement.lang = value.language;
    document.documentElement.dir = value.dir;
  }, [value]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  return useContext(I18nContext);
}
