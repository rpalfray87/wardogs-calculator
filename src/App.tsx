import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { bridge, isElectron } from './bridge';
import { solve, type Solution } from './core/ballistics';
import { parseCoord } from './core/parse';
import {
  DEFAULT_SETTINGS,
  STORAGE_KEYS,
  pushTarget,
  type HistoryEntry,
  type Settings,
} from './core/settings';
import { useLocalStorage } from './hooks/useLocalStorage';
import { EMPTY_FIELDS, PointBlock, type CoordFields } from './components/PointBlock';
import { ResultPanel } from './components/ResultPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { TargetHistory } from './components/TargetHistory';
import { IconClose, IconSettings } from './components/icons';
import { I18nProvider, useI18n, type TranslationKey, type Vars } from './i18n';

function newId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Deferred message: we store the key, not the text, so it follows the language. */
interface Message {
  key: TranslationKey;
  vars?: Vars;
}

export default function App() {
  const [settings, setSettings] = useLocalStorage<Settings>(
    STORAGE_KEYS.settings,
    DEFAULT_SETTINGS,
  );

  return (
    <I18nProvider language={settings.language}>
      <Calculator settings={settings} setSettings={setSettings} />
    </I18nProvider>
  );
}

interface CalculatorProps {
  settings: Settings;
  setSettings: (update: (previous: Settings) => Settings) => void;
}

function Calculator({ settings, setSettings }: CalculatorProps) {
  const { t } = useI18n();
  // The mortar position is persisted: no retyping it between two shots.
  const [origin, setOrigin] = useLocalStorage<CoordFields>(STORAGE_KEYS.origin, EMPTY_FIELDS);
  const [target, setTarget] = useState<CoordFields>(EMPTY_FIELDS);
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>(STORAGE_KEYS.history, []);
  const [hotkeyError, setHotkeyError] = useState<Message | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [flash, setFlash] = useState<Message | null>(null);

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
      pushTarget(previous, {
        id: newId(),
        x: tx,
        y: ty,
        azimuth: solution.azimuth,
        distance: solution.distance,
      }),
    );
    setFlash({ key: 'result.saved' });
  }, [solution, target, setHistory]);

  useEffect(() => {
    if (flash === null) return;
    const timer = window.setTimeout(() => setFlash(null), 1400);
    return () => window.clearTimeout(timer);
  }, [flash]);

  const patchSettings = useCallback(
    (patch: Partial<Settings>) => setSettings((previous) => ({ ...previous, ...patch })),
    [setSettings],
  );

  // Reset keeps the language. Otherwise the interface would flip back to
  // English in front of someone who cannot read it, with no obvious way back.
  const resetSettings = useCallback(
    () => setSettings((previous) => ({ ...DEFAULT_SETTINGS, language: previous.language })),
    [setSettings],
  );

  // Enter saves from anywhere, not just from a field: mid-game the caret is
  // not necessarily sitting in an input.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Enter' || event.repeat) return;
      const element = event.target as HTMLElement | null;
      // Buttons and the settings sheet keep their native behaviour.
      if (element?.tagName === 'BUTTON' || element?.closest('.sheet')) return;
      event.preventDefault();
      memorize();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [memorize]);

  // ---- Electron overlay integration -------------------------------------------

  useEffect(() => {
    document.body.dataset.electron = String(isElectron);
  }, []);

  useEffect(() => {
    if (!bridge) return;
    // On every open via the global hotkey: caret ready on the target.
    return bridge.onShown(() => {
      setTarget(EMPTY_FIELDS);
      setSettingsOpen(false);
      window.requestAnimationFrame(() => targetXRef.current?.focus());
    });
  }, []);

  useEffect(() => {
    if (!bridge) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      // Escape closes the settings first, and only then the overlay.
      setSettingsOpen((open) => {
        if (open) return false;
        bridge?.hide();
        return open;
      });
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    bridge?.setOpacity(settings.opacity);
  }, [settings.opacity]);

  useEffect(() => {
    // Local capture: TS does not keep the narrowing of bridge inside the timer callback.
    const api = bridge;
    if (!api) return;
    // Debounced: the hotkey field is edited one character at a time.
    const timer = window.setTimeout(() => {
      api
        .setHotkey(settings.hotkey)
        .then(({ ok }) =>
          setHotkeyError(
            ok ? null : { key: 'set.hotkey.error', vars: { key: settings.hotkey } },
          ),
        )
        .catch(() => setHotkeyError({ key: 'set.hotkey.errorGeneric' }));
    }, 500);
    return () => window.clearTimeout(timer);
  }, [settings.hotkey]);

  // ---------------------------------------------------------------------------

  const say = (message: Message | null) => (message ? t(message.key, message.vars) : null);
  const hint = solution ? t('hint.ready') : t('hint.incomplete');

  return (
    <div className="app">
      <header className="titlebar">
        <span className="titlebar__mark" aria-hidden="true" />
        <h1 className="titlebar__title">Wardogs Calculator</h1>
        <button
          type="button"
          className="icon-btn"
          onClick={() => setSettingsOpen(true)}
          title={t('titlebar.settings')}
          aria-label={t('titlebar.settings')}
        >
          <IconSettings />
        </button>
        {isElectron && (
          <button
            type="button"
            className="icon-btn"
            title={t('titlebar.hide')}
            aria-label={t('titlebar.hide')}
            onClick={() => bridge?.hide()}
          >
            <IconClose />
          </button>
        )}
      </header>

      <div className="app__body">
        <PointBlock
          idPrefix="origin"
          title={t('point.origin')}
          value={origin}
          onChange={setOrigin}
          action={
            (origin.x || origin.y) && (
              <button
                type="button"
                className="icon-btn"
                title={t('point.clearOrigin')}
                onClick={() => setOrigin(EMPTY_FIELDS)}
              >
                {t('point.clear')}
              </button>
            )
          }
        />

        <PointBlock
          idPrefix="target"
          title={t('point.target')}
          value={target}
          onChange={setTarget}
          xRef={targetXRef}
          action={
            (target.x || target.y) && (
              <button
                type="button"
                className="icon-btn"
                title={t('point.clearTarget')}
                onClick={() => setTarget(EMPTY_FIELDS)}
              >
                {t('point.clear')}
              </button>
            )
          }
        />

        <ResultPanel solution={solution} settings={settings} flash={say(flash)} hint={hint} />

        <TargetHistory
          entries={history}
          settings={settings}
          onSelect={(entry) => setTarget({ x: String(entry.x), y: String(entry.y) })}
          onDelete={(id) => setHistory((previous) => previous.filter((e) => e.id !== id))}
          onClear={() => setHistory([])}
        />
      </div>

      <p className="footer">
        {isElectron ? (
          <FooterHotkeys hotkey={settings.hotkey} />
        ) : (
          <>{t('footer.web')}</>
        )}
      </p>

      {settingsOpen && (
        <SettingsPanel
          settings={settings}
          onChange={patchSettings}
          onReset={resetSettings}
          onClose={() => setSettingsOpen(false)}
          showOverlayOptions={isElectron}
          hotkeyError={say(hotkeyError)}
        />
      )}
    </div>
  );
}

/**
 * Overlay footer. Both keys are wrapped in <kbd>, so the translated template is
 * split around its placeholders rather than injected as HTML.
 */
function FooterHotkeys({ hotkey }: { hotkey: string }) {
  const { t } = useI18n();
  const parts = t('footer.overlay').split(/(\{hotkey\}|\{esc\})/);
  return (
    <>
      {parts.map((part, index) => {
        if (part === '{hotkey}') return <kbd key={index}>{hotkey}</kbd>;
        if (part === '{esc}') return <kbd key={index}>{t('key.esc')}</kbd>;
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
