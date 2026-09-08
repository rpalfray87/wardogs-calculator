import type { AngleUnit, MilStandard, YAxis } from '../core/ballistics';
import type { Settings } from '../core/settings';
import { LANGUAGES, useI18n, type Language } from '../i18n';
import { IconBack } from './icons';

interface SettingsPanelProps {
  settings: Settings;
  onChange: (patch: Partial<Settings>) => void;
  onReset: () => void;
  onClose: () => void;
  showOverlayOptions: boolean;
  hotkeyError: string | null;
}

export function SettingsPanel({
  settings,
  onChange,
  onReset,
  onClose,
  showOverlayOptions,
  hotkeyError,
}: SettingsPanelProps) {
  const { t } = useI18n();

  return (
    <div className="sheet" role="dialog" aria-label={t('titlebar.settings')}>
      <header className="titlebar">
        <button
          type="button"
          className="icon-btn icon-btn--back"
          onClick={onClose}
          title={t('titlebar.back')}
          aria-label={t('titlebar.back')}
        >
          <IconBack />
        </button>
        <h2 className="titlebar__title">{t('settings.title')}</h2>
      </header>

      <div className="sheet__body">
        <div className="setting">
          <label className="setting__label" htmlFor="set-language">
            {t('set.language.label')}
          </label>
          <select
            id="set-language"
            value={settings.language}
            onChange={(event) => onChange({ language: event.target.value as Language })}
          >
            {LANGUAGES.map((language) => (
              // Each language is shown in its own script, so it stays
              // recognisable even when the interface is in one you cannot read.
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
          <p className="setting__help">{t('set.language.help')}</p>
        </div>

        <div className="setting">
          <label className="setting__label" htmlFor="set-scale">
            {t('set.scale.label')}
          </label>
          <input
            id="set-scale"
            type="number"
            min={1}
            step={1}
            value={settings.metersPerUnit}
            onChange={(event) => {
              const next = Number.parseFloat(event.target.value);
              if (Number.isFinite(next) && next > 0) onChange({ metersPerUnit: next });
            }}
          />
          <p className="setting__help">{t('set.scale.help')}</p>
        </div>

        <div className="setting">
          <label className="setting__label" htmlFor="set-yaxis">
            {t('set.yaxis.label')}
          </label>
          <select
            id="set-yaxis"
            value={settings.yAxis}
            onChange={(event) => onChange({ yAxis: event.target.value as YAxis })}
          >
            <option value="north-up">{t('set.yaxis.up')}</option>
            <option value="north-down">{t('set.yaxis.down')}</option>
          </select>
          <p className="setting__help">{t('set.yaxis.help')}</p>
        </div>

        <div className="setting">
          <label className="setting__label" htmlFor="set-unit">
            {t('set.unit.label')}
          </label>
          <select
            id="set-unit"
            value={settings.angleUnit}
            onChange={(event) => onChange({ angleUnit: event.target.value as AngleUnit })}
          >
            <option value="deg">{t('set.unit.deg')}</option>
            <option value="mil">{t('set.unit.mil')}</option>
          </select>
          <p className="setting__help">{t('set.unit.help')}</p>
        </div>

        {settings.angleUnit === 'mil' && (
          <div className="setting">
            <label className="setting__label" htmlFor="set-mil">
              {t('set.mil.label')}
            </label>
            <select
              id="set-mil"
              value={settings.milStandard}
              onChange={(event) =>
                onChange({ milStandard: Number(event.target.value) as MilStandard })
              }
            >
              <option value={6400}>{t('set.mil.nato')}</option>
              <option value={6000}>{t('set.mil.warsaw')}</option>
            </select>
          </div>
        )}

        {showOverlayOptions && (
          <>
            <div className="setting">
              <label className="setting__label" htmlFor="set-hotkey">
                {t('set.hotkey.label')}
              </label>
              <input
                id="set-hotkey"
                type="text"
                autoComplete="off"
                spellCheck={false}
                value={settings.hotkey}
                onChange={(event) => onChange({ hotkey: event.target.value })}
              />
              <p className="setting__help">{hotkeyError ?? t('set.hotkey.help')}</p>
            </div>

            <div className="setting">
              <label className="setting__label" htmlFor="set-opacity">
                {t('set.opacity.label', { percent: Math.round(settings.opacity * 100) })}
              </label>
              <input
                id="set-opacity"
                type="range"
                min={0.3}
                max={1}
                step={0.05}
                value={settings.opacity}
                onChange={(event) => onChange({ opacity: Number(event.target.value) })}
              />
            </div>
          </>
        )}

        <div className="setting">
          <button type="button" className="icon-btn" onClick={onReset}>
            {t('set.reset')}
          </button>
        </div>
      </div>
    </div>
  );
}
