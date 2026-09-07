import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { bridge, isElectron } from './bridge';
import { solve, type Solution } from './core/ballistics';
import { parseCoord } from './core/parse';
import {
  DEFAULT_SETTINGS,
  HISTORY_LIMIT,
  STORAGE_KEYS,
  type HistoryEntry,
  type Settings,
} from './core/settings';
import { useLocalStorage } from './hooks/useLocalStorage';
import { EMPTY_FIELDS, PointBlock, type CoordFields } from './components/PointBlock';
import { ResultPanel } from './components/ResultPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { TargetHistory } from './components/TargetHistory';

function newId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function App() {
  const [settings, setSettings, resetSettings] = useLocalStorage<Settings>(
    STORAGE_KEYS.settings,
    DEFAULT_SETTINGS,
  );
  // La position du mortier est persistee : on ne la retape pas entre deux tirs.
  const [origin, setOrigin] = useLocalStorage<CoordFields>(STORAGE_KEYS.origin, EMPTY_FIELDS);
  const [target, setTarget] = useState<CoordFields>(EMPTY_FIELDS);
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>(STORAGE_KEYS.history, []);
  const [hotkeyError, setHotkeyError] = useState<string | null>(null);

  const targetXRef = useRef<HTMLInputElement>(null);

  const solution: Solution | null = useMemo(() => {
    const ox = parseCoord(origin.x);
    const oy = parseCoord(origin.y);
    const tx = parseCoord(target.x);
    const ty = parseCoord(target.y);
    if (ox === null || oy === null || tx === null || ty === null) return null;
    return solve({ x: ox, y: oy }, { x: tx, y: ty }, settings);
  }, [origin, target, settings]);

  const memorize = useCallback(() => {
    const tx = parseCoord(target.x);
    const ty = parseCoord(target.y);
    if (!solution || tx === null || ty === null) return;
    setHistory((previous) =>
      [
        { id: newId(), x: tx, y: ty, azimuth: solution.azimuth, distance: solution.distance },
        ...previous.filter((entry) => entry.x !== tx || entry.y !== ty),
      ].slice(0, HISTORY_LIMIT),
    );
  }, [solution, target, setHistory]);

  const patchSettings = useCallback(
    (patch: Partial<Settings>) => setSettings((previous) => ({ ...previous, ...patch })),
    [setSettings],
  );

  // ---- integration overlay Electron ------------------------------------------

  useEffect(() => {
    document.body.dataset.electron = String(isElectron);
  }, []);

  useEffect(() => {
    if (!bridge) return;
    // A chaque ouverture par le raccourci global : curseur pret sur la cible.
    return bridge.onShown(() => {
      setTarget(EMPTY_FIELDS);
      window.requestAnimationFrame(() => targetXRef.current?.focus());
    });
  }, []);

  useEffect(() => {
    if (!bridge) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') bridge?.hide();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    bridge?.setOpacity(settings.opacity);
  }, [settings.opacity]);

  useEffect(() => {
    // Capture locale : TS ne garde pas le narrowing de bridge dans le callback du timer.
    const api = bridge;
    if (!api) return;
    // Debounce : le champ raccourci est edite caractere par caractere.
    const timer = window.setTimeout(() => {
      api
        .setHotkey(settings.hotkey)
        .then(({ ok }) =>
          setHotkeyError(ok ? null : `Raccourci « ${settings.hotkey} » refusé ou déjà pris.`),
        )
        .catch(() => setHotkeyError('Raccourci non applicable.'));
    }, 500);
    return () => window.clearTimeout(timer);
  }, [settings.hotkey]);

  // ---------------------------------------------------------------------------

  const hint = solution
    ? 'Entrée mémorise · clic sur un chiffre le copie'
    : 'Renseigne les quatre coordonnées.';

  return (
    <div className="app">
      <header className="titlebar">
        <span className="titlebar__mark" aria-hidden="true" />
        <h1 className="titlebar__title">Wardogs · Mortier</h1>
        {isElectron && (
          <button
            type="button"
            className="icon-btn"
            title="Masquer l'overlay (Échap)"
            onClick={() => bridge?.hide()}
          >
            ✕
          </button>
        )}
      </header>

      <PointBlock
        idPrefix="origin"
        title="Ma position"
        value={origin}
        onChange={setOrigin}
        onEnter={memorize}
        action={
          (origin.x || origin.y) && (
            <button
              type="button"
              className="icon-btn"
              title="Effacer ma position"
              onClick={() => setOrigin(EMPTY_FIELDS)}
            >
              Effacer
            </button>
          )
        }
      />

      <PointBlock
        idPrefix="target"
        title="Cible"
        value={target}
        onChange={setTarget}
        onEnter={memorize}
        xRef={targetXRef}
        action={
          (target.x || target.y) && (
            <button
              type="button"
              className="icon-btn"
              title="Effacer la cible"
              onClick={() => setTarget(EMPTY_FIELDS)}
            >
              Effacer
            </button>
          )
        }
      />

      <ResultPanel
        solution={solution}
        settings={settings}
        onUnitChange={(angleUnit) => patchSettings({ angleUnit })}
        hint={hint}
      />

      <TargetHistory
        entries={history}
        settings={settings}
        onSelect={(entry) => setTarget({ x: String(entry.x), y: String(entry.y) })}
        onClear={() => setHistory([])}
      />

      <SettingsPanel
        settings={settings}
        onChange={patchSettings}
        onReset={resetSettings}
        showOverlayOptions={isElectron}
        hotkeyError={hotkeyError}
      />

      <p className="footer">
        {isElectron ? (
          <>
            <kbd>{settings.hotkey}</kbd> affiche / masque · <kbd>Échap</kbd> rend la main au jeu
          </>
        ) : (
          <>Azimut 0° = Nord, rotation horaire.</>
        )}
      </p>
    </div>
  );
}
