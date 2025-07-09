import { orderBy, where } from "firebase/firestore";
import type { Contact } from "./contacts.model";
import { useQueryData } from "../../core/hooks/use-query-data";

export function useContacts(clientId: string, connectionId: string) {
  const {
    state: contacts,
    loading,
    error,
  } = useQueryData<Contact>(
    `contacts`,
    [connectionId],
    [
      where("connectionId", "==", connectionId),
      where("clientId", "==", clientId),
      orderBy("createdAt", "desc"),
    ]
  );

  return { contacts, loading, error };
}
