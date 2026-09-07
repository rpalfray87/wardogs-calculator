import { describe, expect, it } from 'vitest';
import {
  formatDistance,
  solve,
  toDisplayAngle,
  type GeometrySettings,
} from './ballistics';

const NORTH_UP: GeometrySettings = { metersPerUnit: 100, yAxis: 'north-up' };
const NORTH_DOWN: GeometrySettings = { metersPerUnit: 100, yAxis: 'north-down' };
const me = { x: 100, y: 100 };

describe('solve - azimut aux quatre cardinaux', () => {
  it('cible plein Nord -> 0 deg', () => {
    expect(solve(me, { x: 100, y: 110 }, NORTH_UP).azimuth).toBeCloseTo(0, 6);
  });

  it('cible plein Est -> 90 deg', () => {
    expect(solve(me, { x: 110, y: 100 }, NORTH_UP).azimuth).toBeCloseTo(90, 6);
  });

  it('cible plein Sud -> 180 deg', () => {
    expect(solve(me, { x: 100, y: 90 }, NORTH_UP).azimuth).toBeCloseTo(180, 6);
  });

  it('cible plein Ouest -> 270 deg (jamais de negatif)', () => {
    expect(solve(me, { x: 90, y: 100 }, NORTH_UP).azimuth).toBeCloseTo(270, 6);
  });

  it('nord-est -> 45 deg', () => {
    expect(solve(me, { x: 110, y: 110 }, NORTH_UP).azimuth).toBeCloseTo(45, 6);
  });
});

describe('solve - echelle', () => {
  it("l'hypothese 10 points = 1000 m", () => {
    expect(solve(me, { x: 100, y: 110 }, NORTH_UP).distance).toBeCloseTo(1000, 6);
  });

  it('diagonale de 10 x 10 points', () => {
    expect(solve(me, { x: 110, y: 110 }, NORTH_UP).distance).toBeCloseTo(1414.2136, 3);
  });

  it("l'echelle est reglable sans toucher au code", () => {
    const custom = { metersPerUnit: 250, yAxis: 'north-up' } as const;
    expect(solve(me, { x: 100, y: 110 }, custom).distance).toBeCloseTo(2500, 6);
  });

  it('coordonnees a deux decimales', () => {
    const s = solve({ x: 131.33, y: 45.6 }, { x: 141.33, y: 45.6 }, NORTH_UP);
    expect(s.distance).toBeCloseTo(1000, 6);
    expect(s.azimuth).toBeCloseTo(90, 6);
  });
});

describe("solve - sens de l'axe Y", () => {
  it("inverser l'axe decale l'azimut de 180 deg", () => {
    const up = solve(me, { x: 100, y: 110 }, NORTH_UP).azimuth;
    const down = solve(me, { x: 100, y: 110 }, NORTH_DOWN).azimuth;
    expect(up).toBeCloseTo(0, 6);
    expect(down).toBeCloseTo(180, 6);
  });

  it('la distance ne depend pas du sens de l axe', () => {
    const up = solve(me, { x: 107, y: 113 }, NORTH_UP).distance;
    const down = solve(me, { x: 107, y: 113 }, NORTH_DOWN).distance;
    expect(up).toBeCloseTo(down, 6);
  });
});

describe('solve - cas degenere', () => {
  it('deux points identiques donnent une distance nulle', () => {
    expect(solve(me, me, NORTH_UP).distance).toBe(0);
  });
});

describe('toDisplayAngle', () => {
  it('degres : une decimale', () => {
    const a = toDisplayAngle(143.25, { angleUnit: 'deg', milStandard: 6400 });
    expect(a.value).toBeCloseTo(143.25, 6);
    expect(a.decimals).toBe(1);
    expect(a.suffix).toBe('°');
  });

  it('millienes OTAN : 90 deg -> 1600 mil', () => {
    const a = toDisplayAngle(90, { angleUnit: 'mil', milStandard: 6400 });
    expect(a.value).toBeCloseTo(1600, 6);
    expect(a.decimals).toBe(0);
  });

  it('millienes 6000 : 90 deg -> 1500 mil', () => {
    const a = toDisplayAngle(90, { angleUnit: 'mil', milStandard: 6000 });
    expect(a.value).toBeCloseTo(1500, 6);
  });

  it('le tour complet vaut le standard choisi', () => {
    expect(toDisplayAngle(359.999, { angleUnit: 'mil', milStandard: 6400 }).value).toBeLessThan(6400);
  });
});

describe('formatDistance', () => {
  it('arrondit au metre', () => {
    expect(formatDistance(1414.2136).replace(/[^0-9]/g, '')).toBe('1414');
  });
});
