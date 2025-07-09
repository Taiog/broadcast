import { useQueryData } from "../../core/hooks/use-query-data";
import { useAuth } from "../auth/hooks/use-auth";
import { type Connection } from "./connections.model";
import { orderBy, where } from "firebase/firestore";

export function useConnections() {
  const { user } = useAuth();

  const {
    state: connections,
    loading,
    error,
  } = useQueryData<Connection>(
    `connections`,
    [user?.uid],
    [where("clientId", "==", user?.uid), orderBy("createdAt", "desc")]
  );

  return { connections, loading, error };
}
