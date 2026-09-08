/**
 * Les 20 langues les plus parlees dans le monde, dans cet ordre.
 * `locale` sert au formatage des nombres (Intl), `dir` a l'orientation du texte.
 */
export const LANGUAGES = [
  { code: 'en', name: 'English', locale: 'en-US', dir: 'ltr' },
  { code: 'zh', name: '中文', locale: 'zh-CN', dir: 'ltr' },
  { code: 'hi', name: 'हिन्दी', locale: 'hi-IN', dir: 'ltr' },
  { code: 'es', name: 'Español', locale: 'es-ES', dir: 'ltr' },
  { code: 'fr', name: 'Français', locale: 'fr-FR', dir: 'ltr' },
  { code: 'ar', name: 'العربية', locale: 'ar', dir: 'rtl' },
  { code: 'bn', name: 'বাংলা', locale: 'bn-BD', dir: 'ltr' },
  { code: 'pt', name: 'Português', locale: 'pt-BR', dir: 'ltr' },
  { code: 'ru', name: 'Русский', locale: 'ru-RU', dir: 'ltr' },
  { code: 'ur', name: 'اردو', locale: 'ur-PK', dir: 'rtl' },
  { code: 'id', name: 'Bahasa Indonesia', locale: 'id-ID', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', locale: 'de-DE', dir: 'ltr' },
  { code: 'ja', name: '日本語', locale: 'ja-JP', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', locale: 'tr-TR', dir: 'ltr' },
  { code: 'ko', name: '한국어', locale: 'ko-KR', dir: 'ltr' },
  { code: 'vi', name: 'Tiếng Việt', locale: 'vi-VN', dir: 'ltr' },
  { code: 'it', name: 'Italiano', locale: 'it-IT', dir: 'ltr' },
  { code: 'th', name: 'ไทย', locale: 'th-TH', dir: 'ltr' },
  { code: 'pl', name: 'Polski', locale: 'pl-PL', dir: 'ltr' },
  { code: 'nl', name: 'Nederlands', locale: 'nl-NL', dir: 'ltr' },
] as const;

export type Language = (typeof LANGUAGES)[number]['code'];

export const DEFAULT_LANGUAGE: Language = 'en';

const BY_CODE = new Map(LANGUAGES.map((entry) => [entry.code, entry]));

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && BY_CODE.has(value as Language);
}

export function languageInfo(code: Language) {
  return BY_CODE.get(code) ?? LANGUAGES[0];
}
