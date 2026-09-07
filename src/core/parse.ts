import type { Point } from './ballistics';

const NUMBER_RE = /^-?\d+(?:\.\d+)?$/;

/**
 * Lit une coordonnee telle qu'affichee par le jeu.
 *
 * Regle absolue : on n'insere, ne deplace et ne devine JAMAIS une virgule.
 * Le nombre de chiffres est variable (131.33, 45.6, 1234) donc tout formatage
 * automatique produirait des coordonnees fausses. On accepte simplement le point
 * ou la virgule comme separateur decimal, et on refuse le reste.
 */
export function parseCoord(raw: string): number | null {
  const text = raw.trim().replace(',', '.');
  if (!NUMBER_RE.test(text)) return null;
  const value = Number.parseFloat(text);
  return Number.isFinite(value) ? value : null;
}

/** true si le champ est vide (ni valide ni en erreur : juste pas encore rempli). */
export function isBlank(raw: string): boolean {
  return raw.trim() === '';
}

/**
 * Lit une paire "X Y" collee d'un coup. Sert au collage dans le champ X.
 * Separateurs acceptes : espace, point-virgule, slash. La virgule seule n'est
 * jamais un separateur de paire, elle est trop ambigue avec le separateur decimal.
 */
export function parsePair(raw: string): Point | null {
  const text = raw.trim().replace(/,\s/g, ' ');
  if (text === '') return null;

  let parts = text.split(/[\s;/]+/).filter(Boolean);

  // Cas "131.33,45.6" : les points sont deja les separateurs decimaux,
  // donc la virgule restante ne peut etre que le separateur de paire.
  if (parts.length === 1 && text.includes('.') && text.includes(',')) {
    parts = text.split(',').filter(Boolean);
  }

  if (parts.length !== 2) return null;

  const x = parseCoord(parts[0]!);
  const y = parseCoord(parts[1]!);
  if (x === null || y === null) return null;

  return { x, y };
}
