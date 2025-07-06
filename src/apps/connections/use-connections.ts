import { useState, useEffect } from "react";
import { type Connection } from "./connections.model";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";
import type { Subscription } from "rxjs";
import { collectionData } from "rxfire/firestore";

export function useConnections(clientId: string) {
  const [connections, setConnections] = useState<Connection[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) return;

    setLoading(true);
    setError(null);

    const ref = collection(db, "clients", clientId, "connections");

    const connectionQuery = query(ref, orderBy("createdAt", "desc"));

    const sub: Subscription = collectionData(connectionQuery, { idField: "id" }).subscribe({
      next: (data) => {
        setConnections(data as Connection[]);
        setLoading(false);
      },
      error: (err) => {
        console.error(err);
        setError("Erro ao carregar conexões");
        setLoading(false);
      },
    });

    return () => sub.unsubscribe();
  }, [clientId]);

  return { connections, loading, error };
}
