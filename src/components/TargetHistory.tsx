import {
  formatAngle,
  formatDistance,
  toDisplayAngle,
  type AngleSettings,
} from '../core/ballistics';
import type { HistoryEntry } from '../core/settings';

interface TargetHistoryProps {
  entries: HistoryEntry[];
  settings: AngleSettings;
  onSelect: (entry: HistoryEntry) => void;
  onClear: () => void;
}

export function TargetHistory({ entries, settings, onSelect, onClear }: TargetHistoryProps) {
  return (
    <section className="history">
      <div className="block__head">
        <h2 className="block__title">Historique</h2>
        {entries.length > 0 && (
          <button type="button" className="icon-btn" onClick={onClear} title="Vider l'historique">
            Vider
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="empty">
          <kbd>Entrée</kbd> mémorise la cible en cours.
        </p>
      ) : (
        <ul className="history__list">
          {entries.map((entry) => {
            const angle = toDisplayAngle(entry.azimuth, settings);
            return (
              <li key={entry.id}>
                <button
                  type="button"
                  className="history__row"
                  onClick={() => onSelect(entry)}
                  title="Recharger cette cible"
                >
                  <span className="history__coords">
                    {entry.x} / {entry.y}
                  </span>
                  <span className="history__azimuth">
                    {formatAngle(angle)}
                    {angle.suffix === '°' ? '°' : ' mil'}
                  </span>
                  <span className="history__distance">{formatDistance(entry.distance)} m</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
