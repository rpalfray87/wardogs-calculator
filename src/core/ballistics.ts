export interface Point {
  x: number;
  y: number;
}

/** Sens de l'axe Y sur la grille du jeu. A confirmer en jeu : une erreur ici decale l'azimut de 180 deg. */
export type YAxis = 'north-up' | 'north-down';

/** 6400 = standard OTAN, 6000 = standard ex-Pacte de Varsovie. */
export type MilStandard = 6400 | 6000;

export type AngleUnit = 'deg' | 'mil';

export interface GeometrySettings {
  /** Metres represents par 1 point de coordonnee. Hypothese : 10 points = 1000 m, donc 100. */
  metersPerUnit: number;
  yAxis: YAxis;
}

export interface AngleSettings {
  angleUnit: AngleUnit;
  milStandard: MilStandard;
}

export interface Solution {
  /** Azimut en degres dans [0, 360), 0 = Nord, sens horaire. */
  azimuth: number;
  /** Distance au sol en metres. */
  distance: number;
}

/**
 * Coeur du calcul. Renvoie toujours des degres : la conversion en millienes
 * est une affaire d'affichage, pas de geometrie.
 */
export function solve(from: Point, to: Point, s: GeometrySettings): Solution {
  const dx = to.x - from.x;
  const dyRaw = to.y - from.y;
  const dy = s.yAxis === 'north-up' ? dyRaw : -dyRaw;

  const distance = Math.hypot(dx, dy) * s.metersPerUnit;

  // atan2(dx, dy) et non atan2(dy, dx) : on veut 0 au Nord et une rotation horaire.
  let azimuth = (Math.atan2(dx, dy) * 180) / Math.PI;
  if (azimuth < 0) azimuth += 360;

  return { azimuth, distance };
}

export interface DisplayAngle {
  value: number;
  decimals: number;
  suffix: string;
}

/** Convertit l'azimut en degres vers l'unite d'affichage choisie. */
export function toDisplayAngle(degrees: number, s: AngleSettings): DisplayAngle {
  if (s.angleUnit === 'mil') {
    return { value: (degrees / 360) * s.milStandard, decimals: 0, suffix: 'mil' };
  }
  return { value: degrees, decimals: 1, suffix: '°' };
}

const numberFormats = new Map<string, Intl.NumberFormat>();

function formatNumber(value: number, decimals: number, locale: string): string {
  const cacheKey = `${locale}:${decimals}`;
  let fmt = numberFormats.get(cacheKey);
  if (!fmt) {
    fmt = new Intl.NumberFormat(locale, {
      // Chiffres latins imposes : en arabe ou en bengali, Intl passerait sinon
      // aux chiffres locaux, illisibles a recopier dans le jeu.
      numberingSystem: 'latn',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    numberFormats.set(cacheKey, fmt);
  }
  // Intl insere une espace insecable etroite : on la remplace par une insecable
  // simple, plus lisible en fonte monospace.
  return fmt.format(value).replace(/ /g, ' ');
}

/** Locale par defaut : l'interface demarre en anglais. */
const DEFAULT_LOCALE = 'en-US';

export function formatAngle(a: DisplayAngle, locale: string = DEFAULT_LOCALE): string {
  // Point decimal et non separateur localise pour les decimales : coherent avec
  // la facon dont on saisit les coordonnees, et sans ambiguite a la recopie.
  return a.decimals === 0 ? formatNumber(a.value, 0, locale) : a.value.toFixed(a.decimals);
}

export function formatDistance(meters: number, locale: string = DEFAULT_LOCALE): string {
  return formatNumber(Math.round(meters), 0, locale);
}
