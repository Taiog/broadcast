import { useObservable } from "../../core/hooks/use-observable";
import { getContacts$, type Contact } from "./contacts.model";

export function useContacts(clientId: string, connectionId: string) {
  return useObservable<Contact>(() => getContacts$(clientId, connectionId), [connectionId]);
}
