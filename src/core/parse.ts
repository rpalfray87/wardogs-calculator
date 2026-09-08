import type { Point } from './ballistics';

const NUMBER_RE = /^-?\d+(?:\.\d+)?$/;

/**
 * Reads a coordinate exactly as the game displays it.
 *
 * Hard rule: NEVER insert, move or guess a decimal separator. Coordinates vary
 * in length (131.33, 45.6, 1234), so any automatic formatting would produce
 * wrong coordinates. We simply accept a dot or a comma as the decimal mark and
 * reject everything else.
 */
export function parseCoord(raw: string): number | null {
  const text = raw.trim().replace(',', '.');
  if (!NUMBER_RE.test(text)) return null;
  const value = Number.parseFloat(text);
  return Number.isFinite(value) ? value : null;
}

/** True when the field is empty: neither valid nor in error, just not filled yet. */
export function isBlank(raw: string): boolean {
  return raw.trim() === '';
}

/**
 * Reads an "X Y" pair pasted in one go, used when pasting into the X field.
 * Accepted separators: space, semicolon, slash. A bare comma is never treated
 * as a pair separator, being far too ambiguous with the decimal mark.
 */
export function parsePair(raw: string): Point | null {
  const text = raw.trim().replace(/,\s/g, ' ');
  if (text === '') return null;

  let parts = text.split(/[\s;/]+/).filter(Boolean);

  // Case "131.33,45.6": the dots are already the decimal marks, so the
  // remaining comma can only be the pair separator.
  if (parts.length === 1 && text.includes('.') && text.includes(',')) {
    parts = text.split(',').filter(Boolean);
  }

  if (parts.length !== 2) return null;

  const x = parseCoord(parts[0]!);
  const y = parseCoord(parts[1]!);
  if (x === null || y === null) return null;

  return { x, y };
}
