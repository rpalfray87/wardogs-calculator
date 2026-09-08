import { en } from './locales/en';

export type TranslationKey = keyof typeof en;

/** Every translation must cover exactly the keys of `en`. */
export type Dict = Record<TranslationKey, string>;
