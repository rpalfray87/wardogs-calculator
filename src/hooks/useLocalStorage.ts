import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useState persiste dans localStorage. Tolerant aux navigations privees et aux
 * stockages bloques : en cas d'echec on retombe simplement sur un etat en memoire.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return initial;
      const parsed = JSON.parse(raw) as T;
      // Fusion peu profonde : un reglage ajoute plus tard garde sa valeur par defaut.
      if (
        parsed !== null &&
        typeof parsed === 'object' &&
        !Array.isArray(parsed) &&
        typeof initial === 'object' &&
        initial !== null &&
        !Array.isArray(initial)
      ) {
        return { ...initial, ...parsed };
      }
      return parsed;
    } catch {
      return initial;
    }
  });

  const keyRef = useRef(key);
  keyRef.current = key;

  useEffect(() => {
    try {
      window.localStorage.setItem(keyRef.current, JSON.stringify(value));
    } catch {
      // stockage indisponible : on continue sans persistance
    }
  }, [value]);

  const reset = useCallback(() => setValue(initial), [initial]);

  return [value, setValue, reset] as const;
}
