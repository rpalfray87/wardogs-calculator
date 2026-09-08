import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useState persisted to localStorage. Tolerates private browsing and blocked
 * storage: on failure it simply falls back to in-memory state.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return initial;
      const parsed = JSON.parse(raw) as T;
      // Shallow merge: a setting added in a later version keeps its default.
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
      // storage unavailable: carry on without persistence
    }
  }, [value]);

  const reset = useCallback(() => setValue(initial), [initial]);

  return [value, setValue, reset] as const;
}
