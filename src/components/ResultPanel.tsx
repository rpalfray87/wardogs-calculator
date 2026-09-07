import { useEffect, useState } from 'react';
import {
  formatAngle,
  formatDistance,
  toDisplayAngle,
  type AngleSettings,
  type Solution,
} from '../core/ballistics';
import { copyText } from '../core/clipboard';

interface ResultPanelProps {
  solution: Solution | null;
  settings: AngleSettings;
  /** Message ephemere pousse par l'app (cible memorisee...). */
  flash: string | null;
  hint: string;
}

export function ResultPanel({ solution, settings, flash, hint }: ResultPanelProps) {
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
    setCopied(ok ? `${label} copié` : 'copie impossible');
  }

  return (
    <section className="result">
      <h2 className="result__label">Azimut</h2>

      <button
        type="button"
        className={`readout readout--azimuth${angle ? '' : ' readout--empty'}`}
        title="Cliquer pour copier"
        disabled={!angle}
        onClick={() => angle && copy('Azimut', formatAngle(angle).replace(/[   ]/g, ''))}
      >
        {angle ? formatAngle(angle) : '—'}
        {angle && <span className="readout__unit">{angle.suffix}</span>}
      </button>

      <h2 className="result__label result__label--sub">Distance</h2>

      <button
        type="button"
        className={`readout readout--distance${solution ? '' : ' readout--empty'}`}
        title="Cliquer pour copier"
        disabled={!solution}
        onClick={() => solution && copy('Distance', String(Math.round(solution.distance)))}
      >
        {solution ? formatDistance(solution.distance) : '—'}
        {solution && <span className="readout__unit">m</span>}
      </button>

      <p className={`result__hint${message ? ' result__hint--ok' : ''}`}>{message ?? hint}</p>
    </section>
  );
}
