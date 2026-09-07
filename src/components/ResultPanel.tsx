import { useEffect, useState } from 'react';
import {
  formatAngle,
  formatDistance,
  toDisplayAngle,
  type AngleSettings,
  type AngleUnit,
  type Solution,
} from '../core/ballistics';
import { copyText } from '../core/clipboard';

interface ResultPanelProps {
  solution: Solution | null;
  settings: AngleSettings;
  onUnitChange: (unit: AngleUnit) => void;
  hint: string;
}

const UNITS: { unit: AngleUnit; label: string }[] = [
  { unit: 'deg', label: 'DEG' },
  { unit: 'mil', label: 'MIL' },
];

export function ResultPanel({ solution, settings, onUnitChange, hint }: ResultPanelProps) {
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (copied === null) return;
    const timer = window.setTimeout(() => setCopied(null), 1400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const angle = solution ? toDisplayAngle(solution.azimuth, settings) : null;

  async function copy(label: string, value: string) {
    const ok = await copyText(value);
    setCopied(ok ? `${label} copié` : 'copie impossible');
  }

  return (
    <section className="result">
      <div className="result__head">
        <h2 className="result__label">Azimut</h2>
        <div className="seg" role="group" aria-label="Unité d'angle">
          {UNITS.map(({ unit, label }) => (
            <button
              key={unit}
              type="button"
              aria-pressed={settings.angleUnit === unit}
              onClick={() => onUnitChange(unit)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={`readout readout--azimuth${angle ? '' : ' readout--empty'}`}
        title="Cliquer pour copier"
        disabled={!angle}
        onClick={() => angle && copy('Azimut', formatAngle(angle).replace(/[   ]/g, ''))}
      >
        {angle ? formatAngle(angle) : '—'}
        {angle && <span className="readout__unit">{angle.suffix}</span>}
      </button>

      <p className="result__sub">Distance</p>

      <button
        type="button"
        className={`readout readout--distance${solution ? '' : ' readout--empty'}`}
        title="Cliquer pour copier"
        disabled={!solution}
        onClick={() =>
          solution && copy('Distance', String(Math.round(solution.distance)))
        }
      >
        {solution ? formatDistance(solution.distance) : '—'}
        {solution && <span className="readout__unit">m</span>}
      </button>

      <p className={`result__hint${copied ? ' result__hint--ok' : ''}`}>{copied ?? hint}</p>
    </section>
  );
}
