import { describe, expect, it } from 'vitest';
import { HISTORY_LIMIT, pushTarget, type HistoryEntry } from './settings';

function entry(x: number, y: number): HistoryEntry {
  return { id: `${x}:${y}`, x, y, azimuth: 90, distance: 1000 };
}

describe('pushTarget', () => {
  it('ajoute la cible en tete', () => {
    const result = pushTarget([entry(1, 1)], entry(2, 2));
    expect(result.map((e) => e.x)).toEqual([2, 1]);
  });

  it('marteler Entree sur la meme cible ne cree pas de doublon', () => {
    let history = pushTarget([], entry(131.33, 45.6));
    for (let i = 0; i < 50; i += 1) history = pushTarget(history, entry(131.33, 45.6));
    expect(history).toHaveLength(1);
  });

  it('renvoie le meme tableau si la cible est deja en tete', () => {
    const history = [entry(1, 1)];
    expect(pushTarget(history, entry(1, 1))).toBe(history);
  });

  it('remonte une cible plus ancienne au lieu de la dupliquer', () => {
    const history = [entry(3, 3), entry(2, 2), entry(1, 1)];
    const result = pushTarget(history, entry(1, 1));
    expect(result.map((e) => e.x)).toEqual([1, 3, 2]);
    expect(result).toHaveLength(3);
  });

  it('plafonne la liste', () => {
    let history: HistoryEntry[] = [];
    for (let i = 0; i < 12; i += 1) history = pushTarget(history, entry(i, i));
    expect(history).toHaveLength(HISTORY_LIMIT);
    expect(history[0]?.x).toBe(11);
  });
});
