import { describe, expect, it } from 'vitest';
import { DICTS, translate } from './index';
import { LANGUAGES } from './languages';
import { en } from './locales/en';

const KEYS = Object.keys(en) as (keyof typeof en)[];

function placeholders(template: string): string[] {
  return (template.match(/\{\w+\}/g) ?? []).sort();
}

describe('dictionnaires', () => {
  it('couvre les 20 langues', () => {
    expect(Object.keys(DICTS)).toHaveLength(20);
    expect(Object.keys(DICTS).sort()).toEqual(LANGUAGES.map((l) => l.code).sort());
  });

  for (const { code, name } of LANGUAGES) {
    // Les cles manquantes sont deja rejetees par le type Dict ; ce qui se glisse
    // silencieusement, ce sont les {marqueurs} traduits par erreur.
    it(`${name} (${code}) garde les memes marqueurs que l'anglais`, () => {
      for (const key of KEYS) {
        expect(placeholders(DICTS[code][key]), `${code} / ${key}`).toEqual(
          placeholders(en[key]),
        );
      }
    });
  }
});

describe('translate', () => {
  it('substitue les variables', () => {
    expect(translate('en', 'history.deleteAria', { label: '12 / 34' })).toBe(
      'Delete target 12 / 34',
    );
  });

  it('laisse le marqueur en place si la variable manque', () => {
    expect(translate('en', 'history.deleteAria')).toContain('{label}');
  });

  it("retombe sur l'anglais pour une langue inconnue", () => {
    // @ts-expect-error langue volontairement hors liste
    expect(translate('xx', 'result.distance')).toBe(en['result.distance']);
  });
});
