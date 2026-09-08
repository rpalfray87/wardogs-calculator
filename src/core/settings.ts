import type { AngleUnit, MilStandard, YAxis } from './ballistics';
import { DEFAULT_LANGUAGE, type Language } from '../i18n/languages';

export interface Settings {
  /** Interface language. English is the default. */
  language: Language;
  /** Metres per coordinate point. Working assumption: 10 points = 1000 m. */
  metersPerUnit: number;
  yAxis: YAxis;
  angleUnit: AngleUnit;
  milStandard: MilStandard;
  /** Global accelerator, in Electron syntax ("Alt+M", "F8"...). */
  hotkey: string;
  /** Overlay opacity, 0.3 to 1. */
  opacity: number;
}

export const DEFAULT_SETTINGS: Settings = {
  language: DEFAULT_LANGUAGE,
  metersPerUnit: 100,
  yAxis: 'north-up',
  angleUnit: 'deg',
  milStandard: 6400,
  hotkey: 'Alt+M',
  opacity: 1,
};

export const STORAGE_KEYS = {
  settings: 'wardogs-calculator.settings',
  origin: 'wardogs-calculator.origin',
  history: 'wardogs-calculator.history',
} as const;

export interface HistoryEntry {
  id: string;
  x: number;
  y: number;
  /** Azimuth in degrees, re-rendered if the display settings change. */
  azimuth: number;
  distance: number;
}

export const HISTORY_LIMIT = 5;

/**
 * Adds a target at the top of the history.
 *
 * Two safeguards: hammering Enter on the same target does not create fifty
 * rows (it is already on top, so nothing changes), and firing again at an
 * older target moves it back up instead of duplicating it.
 */
export function pushTarget(history: HistoryEntry[], entry: HistoryEntry): HistoryEntry[] {
  const [first] = history;
  if (first && first.x === entry.x && first.y === entry.y) return history;
  return [entry, ...history.filter((e) => e.x !== entry.x || e.y !== entry.y)].slice(
    0,
    HISTORY_LIMIT,
  );
}
