import { useState, useEffect } from "react";
import * as connectionService from "../../services/connectionService";
import type { Connection } from "../../types/types";

export function useGetConnections(clientId: string) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) return;

    setLoading(true);
    setError(null);

    const unsubscribe = connectionService.getConnections(clientId, (data) => {
      setConnections(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [clientId]);

  return { connections, loading, error };
}
