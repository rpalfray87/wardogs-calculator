import { describe, expect, it } from 'vitest';
import { isBlank, parseCoord, parsePair } from './parse';

describe('parseCoord', () => {
  it('accepts an integer', () => {
    expect(parseCoord('1234')).toBe(1234);
  });

  it('accepts a decimal point', () => {
    expect(parseCoord('131.33')).toBe(131.33);
  });

  it('accepts a decimal comma', () => {
    expect(parseCoord('131,33')).toBe(131.33);
  });

  it('never inserts a separator into a long number', () => {
    expect(parseCoord('13133')).toBe(13133);
  });

  it('tolerates surrounding whitespace', () => {
    expect(parseCoord('  45.6  ')).toBe(45.6);
  });

  it('accepts a negative value', () => {
    expect(parseCoord('-12.5')).toBe(-12.5);
  });

  it('rejects blanks, letters and malformed numbers', () => {
    expect(parseCoord('')).toBeNull();
    expect(parseCoord('abc')).toBeNull();
    expect(parseCoord('12.')).toBeNull();
    expect(parseCoord('1.2.3')).toBeNull();
    expect(parseCoord('12 34')).toBeNull();
  });
});

describe('isBlank', () => {
  it('tells an empty field apart from an invalid one', () => {
    expect(isBlank('   ')).toBe(true);
    expect(isBlank('abc')).toBe(false);
  });
});

describe('parsePair', () => {
  it('splits on a space', () => {
    expect(parsePair('131.33 45.6')).toEqual({ x: 131.33, y: 45.6 });
  });

  it('accepts a comma followed by a space as the pair separator', () => {
    expect(parsePair('131.33, 45.6')).toEqual({ x: 131.33, y: 45.6 });
  });

  it('keeps the decimal comma when it sits between digits', () => {
    expect(parsePair('131,33 45,6')).toEqual({ x: 131.33, y: 45.6 });
  });

  it('accepts a semicolon and a slash', () => {
    expect(parsePair('131.33;45.6')).toEqual({ x: 131.33, y: 45.6 });
    expect(parsePair('131.33/45.6')).toEqual({ x: 131.33, y: 45.6 });
  });

  it('resolves "131.33,45.6" thanks to the dots already present', () => {
    expect(parsePair('131.33,45.6')).toEqual({ x: 131.33, y: 45.6 });
  });

  it('rejects a lone number, decimal comma included', () => {
    expect(parsePair('131.33')).toBeNull();
    expect(parsePair('131,33')).toBeNull();
  });

  it('rejects three values', () => {
    expect(parsePair('1 2 3')).toBeNull();
  });
});
