import type { AngleUnit, MilStandard, YAxis } from './ballistics';

export interface Settings {
  /** Metres par point de coordonnee. Hypothese de depart : 10 points = 1000 m. */
  metersPerUnit: number;
  yAxis: YAxis;
  angleUnit: AngleUnit;
  milStandard: MilStandard;
  /** Accelerateur global Electron, syntaxe Electron ("Alt+M", "F8"...). */
  hotkey: string;
  /** Opacite de l'overlay, 0.3 a 1. */
  opacity: number;
}

export const DEFAULT_SETTINGS: Settings = {
  metersPerUnit: 100,
  yAxis: 'north-up',
  angleUnit: 'deg',
  milStandard: 6400,
  hotkey: 'Alt+M',
  opacity: 1,
};

export const STORAGE_KEYS = {
  settings: 'wd-artillery.settings',
  origin: 'wd-artillery.origin',
  history: 'wd-artillery.history',
} as const;

export interface HistoryEntry {
  id: string;
  x: number;
  y: number;
  /** Azimut en degres, recalcule a l'affichage si les reglages changent. */
  azimuth: number;
  distance: number;
}

export const HISTORY_LIMIT = 5;

/**
 * Ajoute une cible en tete d'historique.
 *
 * Deux garde-fous : marteler Entree sur la meme cible ne cree pas cinquante
 * lignes (elle est deja en tete, on ne touche a rien), et re-tirer sur une
 * cible plus ancienne la remonte au lieu de la dupliquer.
 */
export function pushTarget(history: HistoryEntry[], entry: HistoryEntry): HistoryEntry[] {
  const [first] = history;
  if (first && first.x === entry.x && first.y === entry.y) return history;
  return [entry, ...history.filter((e) => e.x !== entry.x || e.y !== entry.y)].slice(
    0,
    HISTORY_LIMIT,
  );
}
