import type { AngleUnit, MilStandard, YAxis } from '../core/ballistics';
import type { Settings } from '../core/settings';

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
  return (
    <div className="sheet" role="dialog" aria-label="Réglages et calibration">
      <header className="titlebar">
        <span className="titlebar__mark" aria-hidden="true" />
        <h2 className="titlebar__title">Réglages · calibration</h2>
        <button type="button" className="icon-btn" onClick={onClose} title="Fermer">
          ✕
        </button>
      </header>

      <div className="sheet__body">
        <div className="setting">
          <label className="setting__label" htmlFor="set-scale">
            Mètres par point de coordonnée
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
          <p className="setting__help">
            Hypothèse de départ : 10 points = 1000 m, soit 100 m par point. Si la distance
            annoncée est proportionnellement fausse en jeu, c'est ici qu'on corrige.
          </p>
        </div>

        <div className="setting">
          <label className="setting__label" htmlFor="set-yaxis">
            Sens de l'axe Y
          </label>
          <select
            id="set-yaxis"
            value={settings.yAxis}
            onChange={(event) => onChange({ yAxis: event.target.value as YAxis })}
          >
            <option value="north-up">Y augmente vers le Nord</option>
            <option value="north-down">Y augmente vers le Sud</option>
          </select>
          <p className="setting__help">
            Si l'azimut affiché est décalé de 180° en jeu, c'est ce réglage qu'il faut basculer.
          </p>
        </div>

        <div className="setting">
          <label className="setting__label" htmlFor="set-unit">
            Unité de l'azimut
          </label>
          <select
            id="set-unit"
            value={settings.angleUnit}
            onChange={(event) => onChange({ angleUnit: event.target.value as AngleUnit })}
          >
            <option value="deg">Degrés (0-360)</option>
            <option value="mil">Millièmes</option>
          </select>
          <p className="setting__help">
            À laisser en degrés tant que la boussole du jeu n'a pas été vérifiée. Les millièmes
            du viseur servent à l'élévation du tube, pas à la direction.
          </p>
        </div>

        {settings.angleUnit === 'mil' && (
          <div className="setting">
            <label className="setting__label" htmlFor="set-mil">
              Standard des millièmes
            </label>
            <select
              id="set-mil"
              value={settings.milStandard}
              onChange={(event) =>
                onChange({ milStandard: Number(event.target.value) as MilStandard })
              }
            >
              <option value={6400}>6400 — OTAN</option>
              <option value={6000}>6000 — ex-Pacte de Varsovie</option>
            </select>
          </div>
        )}

        {showOverlayOptions && (
          <>
            <div className="setting">
              <label className="setting__label" htmlFor="set-hotkey">
                Raccourci global
              </label>
              <input
                id="set-hotkey"
                type="text"
                autoComplete="off"
                spellCheck={false}
                value={settings.hotkey}
                onChange={(event) => onChange({ hotkey: event.target.value })}
              />
              <p className="setting__help">
                {hotkeyError ?? (
                  <>
                    Syntaxe Electron : <code>Alt+M</code>, <code>Ctrl+Shift+A</code>,{' '}
                    <code>F8</code>. Affiche et masque l'overlay.
                  </>
                )}
              </p>
            </div>

            <div className="setting">
              <label className="setting__label" htmlFor="set-opacity">
                Opacité de l'overlay — {Math.round(settings.opacity * 100)} %
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
            Réinitialiser les réglages
          </button>
        </div>
      </div>
    </div>
  );
}
