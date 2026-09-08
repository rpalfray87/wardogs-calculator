import {
  formatAngle,
  formatDistance,
  toDisplayAngle,
  type AngleSettings,
} from '../core/ballistics';
import type { HistoryEntry } from '../core/settings';
import { useI18n } from '../i18n';
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
  const { t, locale } = useI18n();
  // La phrase d'aide contient une touche a habiller en <kbd> : on decoupe le
  // gabarit traduit autour du marqueur plutot que d'injecter du HTML.
  const [emptyBefore, emptyAfter] = t('history.empty').split('{key}');

  return (
    <section className="history">
      <div className="block__head">
        <h2 className="block__title">{t('history.title')}</h2>
        {entries.length > 0 && (
          <button
            type="button"
            className="icon-btn"
            onClick={onClear}
            title={t('history.clearTitle')}
          >
            {t('history.clearAction')}
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="empty">
          {emptyBefore}
          <kbd>{t('key.enter')}</kbd>
          {emptyAfter}
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
                  title={t('history.load')}
                >
                  <span className="history__coords">{label}</span>
                  <span className="history__azimuth">
                    {formatAngle(angle, locale)}
                    {angle.suffix === '°' ? '°' : ' mil'}
                  </span>
                  <span className="history__distance">
                    {formatDistance(entry.distance, locale)} m
                  </span>
                </button>
                <button
                  type="button"
                  className="history__delete"
                  onClick={() => onDelete(entry.id)}
                  title={t('history.delete')}
                  aria-label={t('history.deleteAria', { label })}
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
