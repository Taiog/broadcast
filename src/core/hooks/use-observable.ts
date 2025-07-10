import { useState, useEffect, type DependencyList } from "react";
import { Observable } from "rxjs";

export function useObservable<T>(
  observableFn: () => Observable<T[]>,
  deps: DependencyList
): {
  state: T[];
  loading: boolean;
  error: string | null;
};

export function useObservable<T, K>(
  observableFn: () => Observable<K[]>,
  deps: DependencyList,
  mapFn: (item: T) => K
): {
  state: K[];
  loading: boolean;
  error: string | null;
};

export function useObservable<T extends { id?: string }, K>(
  observableFn: () => Observable<K[]>,
  deps: DependencyList,
  mapFn?: (item: K) => T
) {
  const [state, setState] = useState<(T | K)[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const subscription = observableFn().subscribe({
      next: (data) => {
        const mapped = mapFn ? data.map(mapFn) : data;
        setState(mapped);
        setLoading(false);
      },
      error: (err) => {
        console.error(err);
        setError("Erro ao carregar");
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, deps);

  return { state, loading, error };
}
