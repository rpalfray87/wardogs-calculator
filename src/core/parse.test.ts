import { describe, expect, it } from 'vitest';
import { isBlank, parseCoord, parsePair } from './parse';

describe('parseCoord', () => {
  it('accepte un entier', () => {
    expect(parseCoord('1234')).toBe(1234);
  });

  it('accepte le point decimal', () => {
    expect(parseCoord('131.33')).toBe(131.33);
  });

  it('accepte la virgule decimale', () => {
    expect(parseCoord('131,33')).toBe(131.33);
  });

  it("n'insere aucune virgule dans un nombre long", () => {
    expect(parseCoord('13133')).toBe(13133);
  });

  it('tolere les espaces autour', () => {
    expect(parseCoord('  45.6  ')).toBe(45.6);
  });

  it('accepte le negatif', () => {
    expect(parseCoord('-12.5')).toBe(-12.5);
  });

  it('refuse le vide, les lettres et les nombres mal formes', () => {
    expect(parseCoord('')).toBeNull();
    expect(parseCoord('abc')).toBeNull();
    expect(parseCoord('12.')).toBeNull();
    expect(parseCoord('1.2.3')).toBeNull();
    expect(parseCoord('12 34')).toBeNull();
  });
});

describe('isBlank', () => {
  it('distingue un champ vide d un champ invalide', () => {
    expect(isBlank('   ')).toBe(true);
    expect(isBlank('abc')).toBe(false);
  });
});

describe('parsePair', () => {
  it('separe a l espace', () => {
    expect(parsePair('131.33 45.6')).toEqual({ x: 131.33, y: 45.6 });
  });

  it('accepte la virgule suivie d un espace comme separateur de paire', () => {
    expect(parsePair('131.33, 45.6')).toEqual({ x: 131.33, y: 45.6 });
  });

  it('garde la virgule decimale quand elle est collee aux chiffres', () => {
    expect(parsePair('131,33 45,6')).toEqual({ x: 131.33, y: 45.6 });
  });

  it('accepte le point-virgule et le slash', () => {
    expect(parsePair('131.33;45.6')).toEqual({ x: 131.33, y: 45.6 });
    expect(parsePair('131.33/45.6')).toEqual({ x: 131.33, y: 45.6 });
  });

  it('resout "131.33,45.6" grace aux points decimaux presents', () => {
    expect(parsePair('131.33,45.6')).toEqual({ x: 131.33, y: 45.6 });
  });

  it('refuse un nombre seul, y compris a virgule decimale', () => {
    expect(parsePair('131.33')).toBeNull();
    expect(parsePair('131,33')).toBeNull();
  });

  it('refuse trois valeurs', () => {
    expect(parsePair('1 2 3')).toBeNull();
  });
});
