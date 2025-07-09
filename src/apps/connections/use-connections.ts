import { useQueryData } from "../../core/hooks/use-query-data";
import { type Connection } from "./connections.model";
import { orderBy, where } from "firebase/firestore";

export function useConnections(clientId: string) {
  const {
    state: connections,
    loading,
    error,
  } = useQueryData<Connection>(
    `connections`,
    [clientId],
    [where("clientId", "==", clientId), orderBy("createdAt", "desc")]
  );

  return { connections, loading, error };
}
