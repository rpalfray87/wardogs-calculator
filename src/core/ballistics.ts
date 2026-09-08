export interface Point {
  x: number;
  y: number;
}

/** Direction of the game grid's Y axis. Getting this wrong offsets every azimuth by 180 degrees. */
export type YAxis = 'north-up' | 'north-down';

/** 6400 = NATO standard, 6000 = former Warsaw Pact standard. */
export type MilStandard = 6400 | 6000;

export type AngleUnit = 'deg' | 'mil';

export interface GeometrySettings {
  /** Metres per coordinate point. Working assumption: 10 points = 1000 m, so 100. */
  metersPerUnit: number;
  yAxis: YAxis;
}

export interface AngleSettings {
  angleUnit: AngleUnit;
  milStandard: MilStandard;
}

export interface Solution {
  /** Azimuth in degrees within [0, 360), 0 = North, clockwise. */
  azimuth: number;
  /** Ground distance in metres. */
  distance: number;
}

/**
 * The whole calculation. Always returns degrees: converting to mils is a
 * display concern, not a geometric one.
 */
export function solve(from: Point, to: Point, s: GeometrySettings): Solution {
  const dx = to.x - from.x;
  const dyRaw = to.y - from.y;
  const dy = s.yAxis === 'north-up' ? dyRaw : -dyRaw;

  const distance = Math.hypot(dx, dy) * s.metersPerUnit;

  // atan2(dx, dy) rather than atan2(dy, dx): we want 0 at North, turning clockwise.
  let azimuth = (Math.atan2(dx, dy) * 180) / Math.PI;
  if (azimuth < 0) azimuth += 360;

  return { azimuth, distance };
}

export interface DisplayAngle {
  value: number;
  decimals: number;
  suffix: string;
}

/** Converts an azimuth in degrees to the chosen display unit. */
export function toDisplayAngle(degrees: number, s: AngleSettings): DisplayAngle {
  if (s.angleUnit === 'mil') {
    return { value: (degrees / 360) * s.milStandard, decimals: 0, suffix: 'mil' };
  }
  return { value: degrees, decimals: 1, suffix: '°' };
}

/**
 * Thousands separator, identical in every language: a narrow no-break space.
 *
 * Locale-aware grouping is a trap here. English writes 1000 as "1,000" and
 * German as "1.000", while the azimuth legitimately uses a dot for its decimal
 * ("90.0"). Someone reading "1.000 m" next to "90.0" has no way to tell a
 * grouping mark from a decimal point, on a screen where misreading a number
 * means dropping a shell in the wrong place. A space can be mistaken for
 * neither, which is precisely why ISO 80000-1 recommends it.
 */
const GROUP_SEPARATOR = '\u202F';

function group(digits: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, GROUP_SEPARATOR);
}

/**
 * Formatting is deliberately hand-rolled rather than delegated to Intl.
 * Beyond the separator above, toFixed always emits Latin digits, whereas Intl
 * would switch to local numerals in Arabic or Bengali — unreadable to anyone
 * copying the value back into the game.
 */
function formatNumber(value: number, decimals: number): string {
  const fixed = Math.abs(value).toFixed(decimals);
  const [whole = '', fraction] = fixed.split('.');
  const sign = value < 0 ? '-' : '';
  // Decimal point, never a localised comma: the same character players type
  // into the coordinate fields.
  return fraction ? `${sign}${group(whole)}.${fraction}` : `${sign}${group(whole)}`;
}

export function formatAngle(a: DisplayAngle): string {
  return formatNumber(a.value, a.decimals);
}

export function formatDistance(meters: number): string {
  return formatNumber(Math.round(meters), 0);
}

/** Strips the grouping so a copied value pastes back as plain digits. */
export function stripGrouping(text: string): string {
  return text.split(GROUP_SEPARATOR).join('');
}
