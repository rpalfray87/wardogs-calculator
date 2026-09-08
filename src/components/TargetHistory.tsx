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
  const { t } = useI18n();
  // The hint sentence contains a key to wrap in <kbd>: split the translated
  // template around the placeholder rather than injecting HTML.
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
              // A row is no longer a single button: it holds two, one to reload
              // the target and one to delete it.
              <li key={entry.id} className="history__row">
                <button
                  type="button"
                  className="history__load"
                  onClick={() => onSelect(entry)}
                  title={t('history.load')}
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
