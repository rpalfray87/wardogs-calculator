import {
  formatAngle,
  formatDistance,
  toDisplayAngle,
  type AngleSettings,
} from '../core/ballistics';
import type { HistoryEntry } from '../core/settings';
import { IconTrash } from './icons';

interface TargetHistoryProps {
  entries: HistoryEntry[];
  settings: AngleSettings;
  onSelect: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

export function TargetHistory({
  entries,
  settings,
  onSelect,
  onDelete,
  onClear,
}: TargetHistoryProps) {
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
            const label = `${entry.x} / ${entry.y}`;
            return (
              // La ligne n'est plus un bouton unique : elle en contient deux,
              // charger la cible et la supprimer.
              <li key={entry.id} className="history__row">
                <button
                  type="button"
                  className="history__load"
                  onClick={() => onSelect(entry)}
                  title="Recharger cette cible"
                >
                  <span className="history__coords">{label}</span>
                  <span className="history__azimuth">
                    {formatAngle(angle)}
                    {angle.suffix === '°' ? '°' : ' mil'}
                  </span>
                  <span className="history__distance">{formatDistance(entry.distance)} m</span>
                </button>
                <button
                  type="button"
                  className="history__delete"
                  onClick={() => onDelete(entry.id)}
                  title="Supprimer cette cible"
                  aria-label={`Supprimer la cible ${label}`}
                >
                  <IconTrash size={14} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
