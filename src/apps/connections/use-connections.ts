import { useObservable } from "../../core/hooks/use-observable";
import { getClientConnections$, type Connection } from "./connections.model";

export function useConnections(clientId: string) {
  return useObservable<Connection>(() => getClientConnections$(clientId), [clientId]);
}
