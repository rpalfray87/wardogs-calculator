import { describe, expect, it } from 'vitest';
import {
  formatAngle,
  formatDistance,
  solve,
  stripGrouping,
  toDisplayAngle,
  type GeometrySettings,
} from './ballistics';

const NORTH_UP: GeometrySettings = { metersPerUnit: 100, yAxis: 'north-up' };
const NORTH_DOWN: GeometrySettings = { metersPerUnit: 100, yAxis: 'north-down' };
const me = { x: 100, y: 100 };

/** Narrow no-break space: the one grouping mark used in every language. */
const NNBSP = 0x202f;

describe('solve - azimuth at the four cardinals', () => {
  it('target due North -> 0 deg', () => {
    expect(solve(me, { x: 100, y: 110 }, NORTH_UP).azimuth).toBeCloseTo(0, 6);
  });

  it('target due East -> 90 deg', () => {
    expect(solve(me, { x: 110, y: 100 }, NORTH_UP).azimuth).toBeCloseTo(90, 6);
  });

  it('target due South -> 180 deg', () => {
    expect(solve(me, { x: 100, y: 90 }, NORTH_UP).azimuth).toBeCloseTo(180, 6);
  });

  it('target due West -> 270 deg, never negative', () => {
    expect(solve(me, { x: 90, y: 100 }, NORTH_UP).azimuth).toBeCloseTo(270, 6);
  });

  it('north-east -> 45 deg', () => {
    expect(solve(me, { x: 110, y: 110 }, NORTH_UP).azimuth).toBeCloseTo(45, 6);
  });
});

describe('solve - scale', () => {
  it('the 10 points = 1000 m assumption', () => {
    expect(solve(me, { x: 100, y: 110 }, NORTH_UP).distance).toBeCloseTo(1000, 6);
  });

  it('diagonal of 10 by 10 points', () => {
    expect(solve(me, { x: 110, y: 110 }, NORTH_UP).distance).toBeCloseTo(1414.2136, 3);
  });

  it('the scale is adjustable without touching the code', () => {
    const custom = { metersPerUnit: 250, yAxis: 'north-up' } as const;
    expect(solve(me, { x: 100, y: 110 }, custom).distance).toBeCloseTo(2500, 6);
  });

  it('coordinates with two decimals', () => {
    const s = solve({ x: 131.33, y: 45.6 }, { x: 141.33, y: 45.6 }, NORTH_UP);
    expect(s.distance).toBeCloseTo(1000, 6);
    expect(s.azimuth).toBeCloseTo(90, 6);
  });
});

describe('solve - Y axis direction', () => {
  it('flipping the axis offsets the azimuth by 180 deg', () => {
    const up = solve(me, { x: 100, y: 110 }, NORTH_UP).azimuth;
    const down = solve(me, { x: 100, y: 110 }, NORTH_DOWN).azimuth;
    expect(up).toBeCloseTo(0, 6);
    expect(down).toBeCloseTo(180, 6);
  });

  it('distance does not depend on the axis direction', () => {
    const up = solve(me, { x: 107, y: 113 }, NORTH_UP).distance;
    const down = solve(me, { x: 107, y: 113 }, NORTH_DOWN).distance;
    expect(up).toBeCloseTo(down, 6);
  });
});

describe('solve - degenerate case', () => {
  it('two identical points give a zero distance', () => {
    expect(solve(me, me, NORTH_UP).distance).toBe(0);
  });
});

describe('toDisplayAngle', () => {
  it('degrees: one decimal', () => {
    const a = toDisplayAngle(143.25, { angleUnit: 'deg', milStandard: 6400 });
    expect(a.value).toBeCloseTo(143.25, 6);
    expect(a.decimals).toBe(1);
    expect(a.suffix).toBe('°');
  });

  it('NATO mils: 90 deg -> 1600 mil', () => {
    const a = toDisplayAngle(90, { angleUnit: 'mil', milStandard: 6400 });
    expect(a.value).toBeCloseTo(1600, 6);
    expect(a.decimals).toBe(0);
  });

  it('6000 mils: 90 deg -> 1500 mil', () => {
    const a = toDisplayAngle(90, { angleUnit: 'mil', milStandard: 6000 });
    expect(a.value).toBeCloseTo(1500, 6);
  });

  it('a full turn is worth the chosen standard', () => {
    expect(toDisplayAngle(359.999, { angleUnit: 'mil', milStandard: 6400 }).value).toBeLessThan(
      6400,
    );
  });
});

describe('number formatting', () => {
  it('rounds distances to the metre', () => {
    expect(formatDistance(1414.2136).replace(/[^0-9]/g, '')).toBe('1414');
  });

  // The point of the whole exercise: a grouping mark that cannot be misread as
  // a decimal separator in any language. "1,000" (English) and "1.000" (German)
  // both can; a space cannot.
  it('groups thousands with a narrow no-break space', () => {
    expect(formatDistance(1000).charCodeAt(1)).toBe(NNBSP);
  });

  it('never emits a comma or a dot in a distance', () => {
    expect(formatDistance(1234567)).not.toMatch(/[.,]/);
  });

  it('leaves numbers below a thousand ungrouped', () => {
    expect(formatDistance(999)).toBe('999');
  });

  it('groups every three digits', () => {
    expect(formatDistance(1234567).replace(/[^0-9]/g, '')).toBe('1234567');
    expect(formatDistance(1234567).length).toBe(9);
  });

  it('uses a dot for the azimuth decimal, like the coordinate fields', () => {
    expect(formatAngle({ value: 90, decimals: 1, suffix: '°' })).toBe('90.0');
  });

  it('emits Latin digits', () => {
    expect(formatAngle({ value: 341.7, decimals: 1, suffix: '°' })).toBe('341.7');
  });

  it('stripGrouping gives back something safe to paste', () => {
    expect(stripGrouping(formatDistance(1414))).toBe('1414');
  });
});
