import { en } from './locales/en';

export type TranslationKey = keyof typeof en;

/** Toute traduction doit couvrir exactement les cles de `en`. */
export type Dict = Record<TranslationKey, string>;
