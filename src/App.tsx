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

/** Message differe : on stocke la cle, pas le texte, pour qu'il suive la langue. */
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
  // La position du mortier est persistee : on ne la retape pas entre deux tirs.
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

  // Remise a zero : la langue survit. Sinon l'interface repasserait en anglais
  // sous les yeux de quelqu'un qui ne le lit pas, sans moyen evident de revenir.
  const resetSettings = useCallback(
    () => setSettings((previous) => ({ ...DEFAULT_SETTINGS, language: previous.language })),
    [setSettings],
  );

  // Entree memorise depuis n'importe ou, pas seulement depuis un champ : en pleine
  // partie on n'a pas forcement le curseur dans un input.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Enter' || event.repeat) return;
      const element = event.target as HTMLElement | null;
      // Les boutons et le panneau de reglages gardent leur comportement natif.
      if (element?.tagName === 'BUTTON' || element?.closest('.sheet')) return;
      event.preventDefault();
      memorize();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [memorize]);

  // ---- integration overlay Electron ------------------------------------------

  useEffect(() => {
    document.body.dataset.electron = String(isElectron);
  }, []);

  useEffect(() => {
    if (!bridge) return;
    // A chaque ouverture par le raccourci global : curseur pret sur la cible.
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
      // Echap ferme d'abord les reglages, puis seulement l'overlay.
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
    // Capture locale : TS ne garde pas le narrowing de bridge dans le callback du timer.
    const api = bridge;
    if (!api) return;
    // Debounce : le champ raccourci est edite caractere par caractere.
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
 * Pied de page de l'overlay. Les deux touches sont habillees en <kbd>, donc on
 * decoupe le gabarit traduit autour de ses marqueurs au lieu d'injecter du HTML.
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
