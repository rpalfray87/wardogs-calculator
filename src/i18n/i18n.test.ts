import { describe, expect, it } from 'vitest';
import { DICTS, translate } from './index';
import { LANGUAGES } from './languages';
import { en } from './locales/en';

const KEYS = Object.keys(en) as (keyof typeof en)[];

function placeholders(template: string): string[] {
  return (template.match(/\{\w+\}/g) ?? []).sort();
}

describe('dictionaries', () => {
  it('covers all 20 languages', () => {
    expect(Object.keys(DICTS)).toHaveLength(20);
    expect(Object.keys(DICTS).sort()).toEqual(LANGUAGES.map((l) => l.code).sort());
  });

  for (const { code, name } of LANGUAGES) {
    // Missing keys are already rejected by the Dict type. What slips through
    // silently is a {placeholder} that got translated by mistake.
    it(`${name} (${code}) keeps the same placeholders as English`, () => {
      for (const key of KEYS) {
        expect(placeholders(DICTS[code][key]), `${code} / ${key}`).toEqual(
          placeholders(en[key]),
        );
      }
    });
  }
});

describe('translate', () => {
  it('substitutes variables', () => {
    expect(translate('en', 'history.deleteAria', { label: '12 / 34' })).toBe(
      'Delete target 12 / 34',
    );
  });

  it('leaves the placeholder in place when the variable is missing', () => {
    expect(translate('en', 'history.deleteAria')).toContain('{label}');
  });

  it('falls back to English for an unknown language', () => {
    // @ts-expect-error language deliberately outside the list
    expect(translate('xx', 'result.distance')).toBe(en['result.distance']);
  });
});
