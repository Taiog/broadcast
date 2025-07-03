import { useState, useEffect } from "react";
import { getConnections, type Connection } from "./connections.model";

export function useGetConnections(clientId: string) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) return;

    setLoading(true);
    setError(null);

    const unsubscribe = getConnections(clientId, (data) => {
      setConnections(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [clientId]);

  return { connections, loading, error };
}
