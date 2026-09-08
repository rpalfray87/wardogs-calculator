import { useEffect, useState } from 'react';
import {
  formatAngle,
  formatDistance,
  stripGrouping,
  toDisplayAngle,
  type AngleSettings,
  type Solution,
} from '../core/ballistics';
import { copyText } from '../core/clipboard';
import { useI18n } from '../i18n';

interface ResultPanelProps {
  solution: Solution | null;
  settings: AngleSettings;
  /** Transient message pushed by the app (target saved, and so on). */
  flash: string | null;
  hint: string;
}

export function ResultPanel({ solution, settings, flash, hint }: ResultPanelProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (copied === null) return;
    const timer = window.setTimeout(() => setCopied(null), 1400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const angle = solution ? toDisplayAngle(solution.azimuth, settings) : null;
  const message = copied ?? flash;

  async function copy(label: string, value: string) {
    const ok = await copyText(value);
    setCopied(ok ? t('result.copied', { label }) : t('result.copyFailed'));
  }

  return (
    <section className="result">
      <h2 className="result__label">{t('result.azimuth')}</h2>

      <button
        type="button"
        className={`readout readout--azimuth${angle ? '' : ' readout--empty'}`}
        title={t('result.copyTitle')}
        disabled={!angle}
        onClick={() =>
          angle &&
          // Copy the bare value: the thousands separator must not travel to the
          // clipboard, where it would break any field it is pasted into.
          copy(t('result.azimuth'), stripGrouping(formatAngle(angle)))
        }
      >
        {angle ? formatAngle(angle) : '—'}
        {angle && <span className="readout__unit">{angle.suffix}</span>}
      </button>

      <h2 className="result__label result__label--sub">{t('result.distance')}</h2>

      <button
        type="button"
        className={`readout readout--distance${solution ? '' : ' readout--empty'}`}
        title={t('result.copyTitle')}
        disabled={!solution}
        onClick={() =>
          solution && copy(t('result.distance'), String(Math.round(solution.distance)))
        }
      >
        {solution ? formatDistance(solution.distance) : '—'}
        {solution && <span className="readout__unit">m</span>}
      </button>

      <p className={`result__hint${message ? ' result__hint--ok' : ''}`}>{message ?? hint}</p>
    </section>
  );
}
