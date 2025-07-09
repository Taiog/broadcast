import { QueryConstraint, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { collectionData } from "rxfire/firestore";
import { collection } from "../services/firestore";

export function useQueryData<T extends { id?: string }>(
  path: string,
  deps: React.DependencyList,
  options: QueryConstraint[] = [orderBy("createdAt", "desc")]
) {
  const [state, setState] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!path) return;

    setLoading(true);
    setError(null);

    const ref = collection<T>(path);

    const queryData = query(ref, ...options);

    const sub = collectionData(queryData, { idField: "id" }).subscribe({
      next: (data) => {
        setState(data);
        setLoading(false);
      },
      error: (err) => {
        console.error(err);
        setError("Erro ao carregar");
        setLoading(false);
      },
    });

    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  return { state, loading, error };
}
