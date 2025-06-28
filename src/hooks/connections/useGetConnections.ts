import { useState, useEffect } from "react";
import * as connectionService from "../../services/connectionService";
import type { Connection } from "../../types/types";

export function useGetConnections(clientId: string) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchConnections() {
    setLoading(true);
    setError(null);
    try {
      const data = await connectionService.getConnections(clientId);
      setConnections(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar conexões");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (clientId) {
      fetchConnections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  return { connections, loading, error, fetchConnections };
}
